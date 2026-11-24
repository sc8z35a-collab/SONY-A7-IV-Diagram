import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 25B Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (32 diagrams):
 *   - Sony Multi Interface (MI) Shoe Ultra-Dissection (MI01–MI32)
 */
export function renderPhase25MiShoeSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    case 'mi_shoe_cap_875':
      return wrapSvg(`
        <rect x="22" y="28" width="66" height="24" rx="4" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
        <text x="55" y="43" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#f8fafc">SHOE CAP 875</text>
        <path d="M90 40 H112" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2"/>
        <rect x="96" y="54" width="24" height="18" rx="2" fill="#eab308"/>
        <text x="108" y="66" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#1e293b">21極</text>
        <text x="55" y="70" text-anchor="middle" font-size="6.2" fill="#475569">雨・砂・静電気ブロック</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MI01 純正シューキャップ(Ref.9)</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・純正443873412 非導電保護樹脂</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・未使用時の奥21極を雨やゴミから保護</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・弾性突起でバッグ内の不意な脱落防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">使わない時にスッと挿しておくだけで21本の精密端子をホコリや静電気から守る専用帽子</text>
      `);

    case 'mi_accessory_wp_skirt':
      return wrapSvg(`
        <rect x="34" y="20" width="68" height="22" rx="3" fill="#475569"/>
        <text x="68" y="34" text-anchor="middle" font-size="6.4" fill="#fff">ストロボ / マイク</text>
        <path d="M24 42 L34 42 L34 58 L20 64 Z M112 42 L102 42 L102 58 L116 64 Z" fill="#1e293b" stroke="#0f172a"/>
        <rect x="38" y="48" width="60" height="16" rx="2" fill="#94a3b8"/>
        <text x="68" y="59" text-anchor="middle" font-size="6.0" fill="#0f172a">MIシュー内部</text>
        <path d="M18 26 L26 42 M118 26 L110 42" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="2 2"/>
        <text x="68" y="80" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0369a1">360°シリコーン防水傘!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0369a1">MI02 アクセサリー防水スカート</text>
        <text x="142" y="43" font-size="7.0" fill="#0c4a6e">・HVL-F60RM2 / ECM-M1等の柔軟リップ</text>
        <text x="142" y="56" font-size="7.0" fill="#0c4a6e">・装着時にカメラ天面へ全周360°圧着</text>
        <text x="142" y="69" font-size="7.0" fill="#0c4a6e">・雨天でもケーブルレス防滴収録を実現</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">アクセサリー側の柔らかいゴム傘がシューの縁をぐるりと覆い、雨粒の侵入を止める</text>
      `);

    case 'mi_shoe_shell_plate':
      return wrapSvg(`
        <path d="M22 66 V26 H50 V34 H32 V58 H104 V34 H86 V26 H114 V66 Z" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>
        <line x1="32" y1="74" x2="104" y2="74" stroke="#0284c7" stroke-width="1.4"/>
        <text x="68" y="84" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0369a1">ISO 518 内幅 18.6 mm</text>
        <line x1="50" y1="20" x2="86" y2="20" stroke="#dc2626" stroke-width="1.4"/>
        <text x="68" y="16" text-anchor="middle" font-size="6.0" fill="#b91c1c">開口 12.5 mm</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MI03 シェルプレート(Ref.327)</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・純正500294302 高剛性SUS U字レール</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・世界規格ISO 518完全準拠で汎用互換</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・前方ひさしが奥の21極端子を徹底保護</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">世界標準ホットシューの形を守りつつ重いストロボやXLRを支える頑丈なステンレスレール</text>
      `);

    case 'mi_lock_pin_recesses':
      return wrapSvg(`
        <rect x="22" y="48" width="92" height="22" rx="3" fill="#cbd5e1" stroke="#475569"/>
        <rect x="60" y="48" width="16" height="14" rx="2" fill="#1e293b"/>
        <rect x="63" y="20" width="10" height="36" rx="2" fill="#eab308" stroke="#92400e"/>
        <path d="M68 12 V20" stroke="#dc2626" stroke-width="2"/>
        <text x="68" y="83" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#92400e">ロックピンがカチッと嵌合!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#92400e">MI04 3点ロックピン嵌合穴</text>
        <text x="142" y="43" font-size="7.0" fill="#78350f">・ロック締付で飛び出すカンヌキを受け止め</text>
        <text x="142" y="56" font-size="7.0" fill="#78350f">・前後ズレ±0.15mm以内に抑え通信安定</text>
        <text x="142" y="69" font-size="7.0" fill="#78350f">・走っても逆さでも高価な機材が脱落ゼロ</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">アクセサリーの鍵(ピン)がハマる凹みと前方ストッパーが、21極のズレと落下を完全防止</text>
      `);

    case 'mi_shoe_screw_cover':
      return wrapSvg(`
        <rect x="22" y="24" width="92" height="18" rx="3" fill="#1e293b" stroke="#64748b"/>
        <text x="68" y="36" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#f8fafc">スクリューカバー(蓋)</text>
        <path d="M22 33 H10" stroke="#0284c7" stroke-width="2"/>
        <rect x="24" y="52" width="88" height="22" rx="3" fill="#e2e8f0" stroke="#475569"/>
        ${[36, 56, 80, 100].map((x) => `<circle cx="${x}" cy="63" r="4" fill="#94a3b8" stroke="#334155"/>`).join('')}
        <text x="68" y="86" text-anchor="middle" font-size="6.0" fill="#334155">下の4本固定ネジを保護</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MI05 スクリューカバー(Ref.329)</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・純正500294602 化粧兼ゴミ防止蓋</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・平らな床面でストロボ挿入が引っ掛からず</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・後端M1.4ネジ1本で外せ修理も超簡単</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">4本の主固定ネジを上から隠すフラットな床板。防塵・外観・修理のしやすさを一挙実現</text>
      `);

    case 'mi_m14_europe_screw':
      return wrapSvg(`
        <rect x="44" y="26" width="48" height="10" rx="3" fill="#334155" stroke="#0f172a"/>
        <rect x="59" y="36" width="18" height="30" rx="2" fill="#94a3b8" stroke="#475569"/>
        ${[42, 49, 56, 62].map((y) => `<line x1="59" y1="${y}" x2="77" y2="${y - 2}" stroke="#334155" stroke-width="1.4"/>`).join('')}
        <text x="68" y="80" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0f172a">M1.4 × L = 1.4 mm!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MI06 M1.4極小ネジ(Ref.330)</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・純正428743511 EUROPE TYPE</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・ゴマ粒大の超低頭で挿入時に干渉ゼロ</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・スクリューカバー後端を1点で確実ロック</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">腕時計並みの極小ネジ1本がシューの床蓋を止め、普段の滑らかさと整備性を両立</text>
      `);

    case 'mi_shoe_spring_plate':
      return wrapSvg(`
        <rect x="20" y="22" width="96" height="14" rx="2" fill="#475569"/>
        <text x="68" y="32" text-anchor="middle" font-size="6.3" fill="#fff">アクセサリー金属足</text>
        <path d="M24 64 L48 64 Q68 38 88 64 L112 64" fill="none" stroke="#d97706" stroke-width="3"/>
        <path d="M68 54 V38" stroke="#dc2626" stroke-width="2.2"/>
        <polygon points="68,36 63,43 73,43" fill="#dc2626"/>
        <text x="68" y="80" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#b45309">上へ押し上げガタゼロ!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#92400e">MI07 スプリング板(Ref.331)</text>
        <text x="142" y="43" font-size="7.0" fill="#78350f">・純正500294502 SUS301 2翼板バネ</text>
        <text x="142" y="56" font-size="7.0" fill="#78350f">・足を天井レールへ押し当てガタつき消去</text>
        <text x="142" y="69" font-size="7.0" fill="#78350f">・同時にGND電気接触抵抗を安定低抵抗化</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">床に隠れた2枚羽根バネが下からグッと押し上げ、グラつき防止とアース接続を一石二鳥解決</text>
      `);

    case 'mi_special_head_screws':
      return wrapSvg(`
        <rect x="22" y="24" width="92" height="10" rx="2" fill="#94a3b8"/>
        <rect x="22" y="38" width="92" height="10" rx="2" fill="#334155"/>
        <rect x="22" y="52" width="92" height="10" rx="2" fill="#475569"/>
        <rect x="22" y="66" width="92" height="10" rx="2" fill="#cbd5e1"/>
        ${[36, 100].map((x) => `<rect x="${x - 3}" y="18" width="6" height="62" rx="1" fill="#eab308" stroke="#854d0e"/>`).join('')}
        <text x="68" y="88" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#854d0e">4本で全層サンドイッチ締結</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MI08 特殊頭M1.7ネジ×4(Ref.328)</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・純正500294701 L=3.3mm 4隅締結</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・上シェル〜防水ゴム〜裏補強板を串刺し</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・均等トルクで防水ラバーを全周圧縮</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">4本の頑丈な特殊頭ボルトがシューの全層を串刺し固定し、重い機材と雨滴に耐える</text>
      `);

    case 'mi_frame_ground_rails':
      return wrapSvg(`
        <rect x="20" y="22" width="14" height="44" rx="2" fill="#64748b" stroke="#0f172a"/>
        <rect x="102" y="22" width="14" height="44" rx="2" fill="#64748b" stroke="#0f172a"/>
        <circle cx="68" cy="44" r="11" fill="#eab308" stroke="#92400e"/>
        <text x="68" y="47" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#1e293b">X(+)</text>
        <text x="27" y="78" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#334155">Pin23</text>
        <text x="109" y="78" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#334155">Pin24</text>
        <text x="68" y="88" text-anchor="middle" font-size="6.0" fill="#0369a1">左右レール ＝ GND(−)</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MI09 左右フレームGND(Pin23/24)</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・ISO_SHOE_FG 汎用フラッシュ帰路</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・Pin7/15および金属ボディ骨格へ直結</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・アクセサリー筐体の静電気＆EMI逃がし</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">左右のステンレスレール自体が電気のマイナス側(アース)になり汎用ストロボ発光と遮蔽を担う</text>
      `);

    case 'mi_center_xsync_contact':
      return wrapSvg(`
        <circle cx="68" cy="46" r="22" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
        <circle cx="68" cy="46" r="14" fill="#eab308" stroke="#92400e" stroke-width="1.8"/>
        <text x="68" y="49" text-anchor="middle" font-size="7.0" font-weight="bold" fill="#1e293b">Pin 22</text>
        <path d="M92 26 L108 18 L102 32 L116 26" fill="none" stroke="#f59e0b" stroke-width="2"/>
        <text x="68" y="82" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#b45309">シャッター全開でGND短絡!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#854d0e">MI10 中央X-Sync接点(Pin 22)</text>
        <text x="142" y="43" font-size="7.0" fill="#713f12">・ISO 518世界共通のど真ん中金色丸接点</text>
        <text x="142" y="56" font-size="7.0" fill="#713f12">・シャッター全開の瞬間にIGBTで発光指令</text>
        <text x="142" y="69" font-size="7.0" fill="#713f12">・他社製マニュアルストロボ＆電波発信対応</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#854d0e">「今だ光れ！」とシャッター全開の瞬間にスイッチを閉じる、世界中のカメラ共通の発光ボタン</text>
      `);

    case 'mi_front_21pin_shroud':
      return wrapSvg(`
        <rect x="16" y="28" width="104" height="36" rx="4" fill="#1e293b" stroke="#0f172a"/>
        ${Array.from({ length: 14 }, (_, i) => `<rect x="${22 + i * 6.8}" y="38" width="3.5" height="16" rx="1" fill="#eab308"/>`).join('')}
        <text x="68" y="22" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#334155">ひさし裏に隠れた21極!</text>
        <text x="68" y="78" text-anchor="middle" font-size="6.2" fill="#475569">0.8mmピッチ LCP櫛歯絶縁壁</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MI11 前方21極シュラウド</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・0.8mm間隔21本をLCP樹脂の櫛歯で分離</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・屋根の奥へ引っ込め汎用足の衝突を回避</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・両端ガイドで斜め差しも正確芯出し</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">屋根の裏に21本の端子を隠すことで、標準ホットシュー互換と超多機能拡張を両立した</text>
      `);

    case 'mi_pins_1to3_id':
      return wrapSvg(`
        ${[1, 2, 3].map((p, i) => `<rect x="${22 + i * 32}" y="22" width="24" height="24" rx="3" fill="#10b981" stroke="#047857"/><text x="${34 + i * 32}" y="37" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#fff">ID${4 - p}</text>`).join('')}
        <path d="M34 46 V60 H100 V46 M66 46 V68" fill="none" stroke="#059669" stroke-width="1.8"/>
        <text x="68" y="82" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#047857">6段階×3本 ＝ 216通り自動識別</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#065f46">MI12 Pin 1–3 ID自動識別端子</text>
        <text x="142" y="43" font-size="7.0" fill="#064e3b">・0/22k/56k/150k/470k/Open 6値判定</text>
        <text x="142" y="56" font-size="7.0" fill="#064e3b">・マイク・ストロボ・XLRを挿すだけで判別</text>
        <text x="142" y="69" font-size="7.0" fill="#064e3b">・確認後に安全給電し誤動作ショート防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#065f46">アクセサリーの名札(抵抗値)を3本のピンで読み取り、最適な電源と通信を自動起動する</text>
      `);

    case 'mi_pins_4to6_analog_mic':
      return wrapSvg(`
        <rect x="18" y="22" width="30" height="26" rx="3" fill="#64748b"/>
        <text x="33" y="38" text-anchor="middle" font-size="6.1" fill="#fff">P4 GND</text>
        <rect x="52" y="22" width="30" height="26" rx="3" fill="#f59e0b"/>
        <text x="67" y="38" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#fff">P5 L音</text>
        <rect x="86" y="22" width="30" height="26" rx="3" fill="#d97706"/>
        <text x="101" y="38" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#fff">P6 R音</text>
        <path d="M26 66 Q46 52 68 66 T110 66" fill="none" stroke="#d97706" stroke-width="2.2"/>
        <text x="68" y="84" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#92400e">ケーブル不要アナログステレオ!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#92400e">MI13 Pin 4–6 アナログマイク</text>
        <text x="142" y="43" font-size="7.0" fill="#78350f">・MIC_GND/L/R ケーブルレスステレオ入力</text>
        <text x="142" y="56" font-size="7.0" fill="#78350f">・音声専用GND分離でモーター雑音抑止</text>
        <text x="142" y="69" font-size="7.0" fill="#78350f">・外付けEVF用GVIF高速差動データ兼用</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">3.5mmケーブルを繋ぐ手間なく、シュー底から左右ステレオ音声を本体へ直接届ける</text>
      `);

    case 'mi_pins_7_15_reg_gnd':
      return wrapSvg(`
        <rect x="18" y="24" width="22" height="44" rx="3" fill="#475569"/>
        <text x="29" y="49" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">P7</text>
        <rect x="44" y="30" width="48" height="32" rx="3" fill="#cffafe" stroke="#06b6d4"/>
        <text x="68" y="49" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#155e75">高速デジタル</text>
        <rect x="96" y="24" width="22" height="44" rx="3" fill="#475569"/>
        <text x="107" y="49" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">P15</text>
        <text x="68" y="82" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#334155">両脇を0V基準GNDで挟み守護!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MI14 Pin 7＆15 ロジックGND</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・デジタル音声レーンを左右から挟み込み</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・大電流PGND(Pin21)とは別レーン分離</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・クロストーク＆電波ノイズ放射を最小化</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">デリケートなデジタル音声線の両側を静かな基準アースでガードし、クリアな通信を守る</text>
      `);

    case 'mi_pins_8to12_digital_audio':
      return wrapSvg(`
        <rect x="16" y="22" width="38" height="46" rx="3" fill="#0891b2"/>
        <text x="35" y="41" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#fff">ECM-M1</text>
        <text x="35" y="53" text-anchor="middle" font-size="5.6" fill="#cffafe">XLR-A4</text>
        <path d="M54 34 H80 M54 45 H80 M54 56 H80" stroke="#06b6d4" stroke-width="2.2"/>
        <text x="67" y="28" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0e7490">0101直送</text>
        <rect x="80" y="22" width="44" height="46" rx="3" fill="#0f766e"/>
        <text x="102" y="40" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#fff">BIONZ</text>
        <text x="102" y="52" text-anchor="middle" font-size="5.6" fill="#ccfbf1">劣化ゼロ!</text>
        <text x="68" y="82" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0e7490">4ch 24bit / 2026年 32bit Float!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#155e75">MI15 Pin 8–12 デジタル音声4ch</text>
        <text x="142" y="43" font-size="7.0" fill="#164e63">・マイク内でデジタル化しI2S/TDM直送</text>
        <text x="142" y="56" font-size="7.0" fill="#164e63">・2026年XLR-A4は96kHz/32bit Float!</text>
        <text x="142" y="69" font-size="7.0" fill="#164e63">・ケーブル不要で音割れ・ノイズ完全ゼロ</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#155e75">ソニーMIシュー最大の武器！マイクの中で0と1に変えてカメラへ直接流し込む無劣化音響レーン</text>
      `);

    case 'mi_pin_13_logic_vdd':
      return wrapSvg(`
        <rect x="18" y="26" width="38" height="38" rx="3" fill="#2563eb"/>
        <text x="37" y="43" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">LDO</text>
        <text x="37" y="55" text-anchor="middle" font-size="6.0" fill="#dbeafe">3.15V</text>
        <path d="M56 45 H80" stroke="#3b82f6" stroke-width="2.6"/>
        <rect x="80" y="26" width="44" height="38" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <text x="102" y="43" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#1e40af">マイクDSP</text>
        <text x="102" y="55" text-anchor="middle" font-size="5.8" fill="#1e40af">電池不要!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#1d4ed8">MI16 Pin 13 3.15Vロジック電源</text>
        <text x="142" y="43" font-size="7.0" fill="#1e3a8a">・ノイズ除去された安定DC 3.15Vを供給</text>
        <text x="142" y="56" font-size="7.0" fill="#1e3a8a">・ID確認時のみON(未装着時は0V安全)</text>
        <text x="142" y="69" font-size="7.0" fill="#1e3a8a">・ECM-M1の電池ゼロ動作を支える電源</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#1d4ed8">アクセサリー内の繊細なデジタル変換チップへ、揺れの少ないきれいな3.15V電気を届ける</text>
      `);

    case 'mi_pins_14_16_aux_audio':
      return wrapSvg(`
        <rect x="18" y="24" width="44" height="44" rx="3" fill="#0d9488"/>
        <text x="40" y="43" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#fff">Pin 14</text>
        <text x="40" y="56" text-anchor="middle" font-size="5.6" fill="#ccfbf1">Center / L</text>
        <rect x="74" y="24" width="46" height="44" rx="3" fill="#14b8a6"/>
        <text x="97" y="43" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#fff">Pin 16</text>
        <text x="97" y="56" text-anchor="middle" font-size="5.6" fill="#ccfbf1">R / RESET</text>
        <text x="68" y="82" text-anchor="middle" font-size="6.1" fill="#115e59">5.1ch音声 ＆ 再起動リセット</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#115e59">MI17 Pin 14＆16 補助音声/制御</text>
        <text x="142" y="43" font-size="7.0" fill="#134e4a">・5.1chサラウンドマイク中央系統に対応</text>
        <text x="142" y="56" font-size="7.0" fill="#134e4a">・電源ON時のハードウェアRESET同期</text>
        <text x="142" y="69" font-size="7.0" fill="#134e4a">・α/Cinema/VLOGCAM全体で規格統一</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#115e59">サラウンド音声や機器の再起動合図までこなす、ソニー全映像機器共通の多才なサポート端子</text>
      `);

    case 'mi_pin_17_unreg_power':
      return wrapSvg(`
        <rect x="14" y="24" width="38" height="44" rx="3" fill="#ea580c"/>
        <text x="33" y="42" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#fff">NP-FZ100</text>
        <text x="33" y="55" text-anchor="middle" font-size="5.8" fill="#ffedd5">6.1–8.4V</text>
        <path d="M52 46 H78" stroke="#ea580c" stroke-width="3.2"/>
        <text x="65" y="38" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#c2410c">1.6A</text>
        <rect x="78" y="24" width="46" height="44" rx="3" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5"/>
        <text x="101" y="42" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#9a3412">+48V昇圧</text>
        <text x="101" y="55" text-anchor="middle" font-size="5.8" fill="#9a3412">XLR給電!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#9a3412">MI18 Pin 17 大電力UNREG(1.6A)</text>
        <text x="142" y="43" font-size="7.0" fill="#7c2d12">・カメラ電池直結 最大約13Wの大電力</text>
        <text x="142" y="56" font-size="7.0" fill="#7c2d12">・XLRの48Vファンタムも電池なしで駆動</text>
        <text x="142" y="69" font-size="7.0" fill="#7c2d12">・1.6A保護ヒューズ付きでショート時も安心</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9a3412">カメラの大容量バッテリーから直通給電し、プロ用48Vマイクやライトを電池ゼロで動かす</text>
      `);

    case 'mi_pins_18to20_ttl_flash':
      return wrapSvg(`
        <rect x="14" y="24" width="38" height="44" rx="3" fill="#1e293b"/>
        <text x="33" y="43" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#fff">カメラAI</text>
        <text x="33" y="55" text-anchor="middle" font-size="5.6" fill="#cbd5e1">顔＆距離</text>
        <path d="M52 36 H80 M80 54 H52" stroke="#ef4444" stroke-width="2"/>
        <text x="66" y="48" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#dc2626">F1/F2/F3</text>
        <rect x="80" y="24" width="44" height="44" rx="3" fill="#fee2e2" stroke="#dc2626"/>
        <text x="102" y="42" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#991b1b">TTL/HSS</text>
        <text x="102" y="55" text-anchor="middle" font-size="5.8" fill="#991b1b">1/8000s</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#991b1b">MI19 Pin 18–20 双方向フラッシュ</text>
        <text x="142" y="43" font-size="7.0" fill="#7f1d1d">・P-TTL / ADI距離連動 / 顔優先AWB調光</text>
        <text x="142" y="56" font-size="7.0" fill="#7f1d1d">・1/8000秒ハイスピードシンクロ精密同期</text>
        <text x="142" y="69" font-size="7.0" fill="#7f1d1d">・カメラ画面から電波多灯ストロボを操作</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#991b1b">カメラとストロボが被写体の顔や距離を1/1000秒で打ち合わせ、白飛びゼロの最適発光へ</text>
      `);

    case 'mi_pin_21_pgnd_detect':
      return wrapSvg(`
        <rect x="18" y="22" width="40" height="20" rx="2" fill="#ea580c"/>
        <text x="38" y="35" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">P17 往路</text>
        <path d="M58 32 H98 V56 H58" fill="none" stroke="#334155" stroke-width="2.2"/>
        <rect x="18" y="46" width="40" height="20" rx="2" fill="#334155"/>
        <text x="38" y="59" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">P21 帰路</text>
        <text x="68" y="82" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#334155">音声GNDと分離でハム雑音ゼロ!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MI20 Pin 21 大電流PGND/検知</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・1.6A UNREG専用の太いパワー帰り道</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・繊細な音声GNDから独立し電源ハム抑止</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・直付けストロボ装着(ADI)確認にも使用</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">力仕事の大電流をマイク音声とは別の専用レーンで電池へ戻し、静かな録音を維持する</text>
      `);

    case 'mi_cantilever_gold_beams':
      return wrapSvg(`
        <rect x="20" y="24" width="60" height="12" rx="2" fill="#475569"/>
        <text x="50" y="33" text-anchor="middle" font-size="6.0" fill="#fff">相手側端子</text>
        <path d="M104 60 L66 60 Q48 60 44 40 Q42 36 52 38" fill="none" stroke="#eab308" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M44 46 H74" stroke="#0284c7" stroke-width="1.6" stroke-dasharray="2 2"/>
        <text x="68" y="78" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#92400e">毎回キュッと擦って自動清掃!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#854d0e">MI21 21連金めっきバネ接点</text>
        <text x="142" y="43" font-size="7.0" fill="#713f12">・りん青銅バネ＋Ni下地＋厚膜ハード金</text>
        <text x="142" y="56" font-size="7.0" fill="#713f12">・挿抜の度に酸化膜を拭うワイピング効果</text>
        <text x="142" y="69" font-size="7.0" fill="#713f12">・0.5N/極の適正荷重で数万回着脱耐久</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#854d0e">21本の金のバネ指が差し込むたびに表面を軽くこすってピカピカに保ち、接触不良を防ぐ</text>
      `);

    case 'mi_mis2006_flex_board':
      return wrapSvg(`
        <path d="M20 26 H86 Q104 26 104 44 V60 Q104 72 86 72 H52" fill="none" stroke="#d97706" stroke-width="8" stroke-linecap="round"/>
        <path d="M20 26 H86 Q104 26 104 44 V60 Q104 72 86 72 H52" fill="none" stroke="#fef08a" stroke-width="1.5" stroke-dasharray="4 3"/>
        <text x="58" y="48" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#92400e">MIS-2006</text>
        <text x="58" y="59" text-anchor="middle" font-size="5.8" fill="#78350f">A5001908A</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#92400e">MI22 純正MIS-2006フレキ</text>
        <text x="142" y="43" font-size="7.0" fill="#78350f">・Ref.325 A5001908A / A5054227A</text>
        <text x="142" y="56" font-size="7.0" fill="#78350f">・α7 IV/V/α1/α7R V/ZV-E1共通の名作FPC</text>
        <text x="142" y="69" font-size="7.0" fill="#78350f">・21極＋X接点をS字屈曲でメイン基板へ</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">全21極とX接点の神経を1枚のしなやかなオレンジリボンに束ね、狭いペンタ部を抜けて運ぶ</text>
      `);

    case 'mi_fpc_wp_rubber':
      return wrapSvg(`
        <rect x="20" y="22" width="96" height="14" rx="2" fill="#94a3b8"/>
        <rect x="20" y="38" width="96" height="18" rx="4" fill="#1e293b" stroke="#f43f5e" stroke-width="1.6"/>
        <text x="68" y="50" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#f8fafc">圧縮防水ラバー(850)</text>
        <rect x="20" y="58" width="96" height="14" rx="2" fill="#475569"/>
        <text x="68" y="84" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#be123c">FPC貫通穴＆4ネジ穴を全周封止</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff1f2" stroke="#f43f5e"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#9f1239">MI23 FPC防水ラバー(Ref.324)</text>
        <text x="142" y="43" font-size="7.0" fill="#881337">・純正501695501 シリコーン圧縮パッキン</text>
        <text x="142" y="56" font-size="7.0" fill="#881337">・4本ネジ締付で20〜30%均一圧縮密閉</text>
        <text x="142" y="69" font-size="7.0" fill="#881337">・ケーブル通し穴からの雨水滴下を封印</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9f1239">ケーブルを通す天井の穴を柔らかいゴムパッキンでギュッと潰し、雨粒の侵入を完全に止める</text>
      `);

    case 'mi_top_deck_boss_seat':
      return wrapSvg(`
        <path d="M16 54 H34 V64 H44 V42 H54 V54 H82 V42 H92 V64 H102 V54 H120 V74 H16 Z" fill="#475569" stroke="#0f172a" stroke-width="1.4"/>
        <circle cx="39" cy="58" r="3" fill="#0284c7"/>
        <circle cx="97" cy="58" r="3" fill="#0284c7"/>
        <text x="68" y="34" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#0f172a">立ち上げ堰(ダム)＋外周排水溝</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MI24 Mg天面台座＆排水溝</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・AZ91Dマグネシウム合金CNC平坦基準面</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・FPC穴周囲を盛り上げ雨水の落ち込み防止</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・外周ドレインモートで雨水を外へ重力排水</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">穴の縁をダムのように高くし周りに排水溝を掘る建築の防水の知恵をマグネシウム天面へ応用</text>
      `);

    case 'mi_shoe_fix_plate':
      return wrapSvg(`
        <rect x="26" y="20" width="84" height="12" rx="2" fill="#94a3b8"/>
        <text x="68" y="29" text-anchor="middle" font-size="5.9" fill="#0f172a">上: SUSシェル</text>
        <rect x="18" y="35" width="100" height="16" rx="2" fill="#475569"/>
        <text x="68" y="46" text-anchor="middle" font-size="6.0" fill="#fff">中: Mg天面カバー</text>
        <rect x="24" y="54" width="88" height="14" rx="2" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.6"/>
        <text x="68" y="64" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#0f172a">下: SUS裏当て補強板</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MI25 裏側フィックス板(Ref.311)</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・純正500395901 高強度ステンレス裏板</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・上下ステンレスで天板を挟む3層剛性構造</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・バーリングメネジで引抜強度を飛躍的向上</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">天井の裏側から頑丈なステンレス当て板で挟み込むため、重いストロボをぶつけてもモゲない</text>
      `);

    case 'mi_underdeck_tie_screws':
      return wrapSvg(`
        <rect x="20" y="24" width="96" height="16" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="68" y="35" text-anchor="middle" font-size="6.2" fill="#0f172a">裏側フィックス板</text>
        ${[42, 94].map((x) => `<rect x="${x - 4}" y="40" width="8" height="24" rx="1" fill="#ca8a04"/><rect x="${x - 8}" y="62" width="16" height="7" rx="2" fill="#eab308"/>`).join('')}
        <text x="68" y="82" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#854d0e">骨格結合＋低抵抗アース接続</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#854d0e">MI26 裏側結合ネジ(Ref.312/326)</text>
        <text x="142" y="43" font-size="7.0" fill="#713f12">・418654511 (5.5mm) ＆ 259947521 (3.0mm)</text>
        <text x="142" y="56" font-size="7.0" fill="#713f12">・裏補強板を内部骨格＆アースへ強固締結</text>
        <text x="142" y="69" font-size="7.0" fill="#713f12">・緩み防止スピン座面＆EVF非干渉長管理</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#854d0e">見えない天井裏で補強板とカメラ骨格を力学的にも電気的にも1つに繋ぎ止める精密ネジ</text>
      `);

    case 'mi_esd_tvs_protection':
      return wrapSvg(`
        <path d="M18 32 L30 22 L26 36 L40 28" fill="none" stroke="#eab308" stroke-width="2.2"/>
        <text x="30" y="50" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#b45309">±15kV静電</text>
        <path d="M44 42 H70 V68" fill="none" stroke="#f43f5e" stroke-width="2"/>
        <polygon points="70,68 62,56 78,56" fill="#f43f5e"/>
        <line x1="60" y1="68" x2="80" y2="68" stroke="#1e293b" stroke-width="2"/>
        <rect x="86" y="30" width="34" height="24" rx="3" fill="#0f766e"/>
        <text x="103" y="45" text-anchor="middle" font-size="6.0" fill="#fff">頭脳保護</text>
        <text x="70" y="82" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#be123c">1nsでGNDへ逃がす</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff1f2" stroke="#f43f5e"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#9f1239">MI27 21極TVS避雷針＆1.6A保護</text>
        <text x="142" y="43" font-size="7.0" fill="#881337">・全21極に＜0.5pF超低容量ESD保護配置</text>
        <text x="142" y="56" font-size="7.0" fill="#881337">・±15kV静電気を10億分の1秒で地面へ逃がす</text>
        <text x="142" y="69" font-size="7.0" fill="#881337">・1.6Aヒューズ＆eFuseで端子ショート遮断</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9f1239">冬のパチッという静電気や雨のショートからカメラの頭脳を守る21本の避雷針とブレーカー</text>
      `);

    case 'mi_xsync_igbt_isolator':
      return wrapSvg(`
        <rect x="16" y="26" width="38" height="40" rx="3" fill="#0f766e"/>
        <text x="35" y="44" text-anchor="middle" font-size="6.1" fill="#fff">カメラ</text>
        <text x="35" y="56" text-anchor="middle" font-size="6.0" fill="#ccfbf1">3.3V側</text>
        <rect x="58" y="22" width="18" height="48" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
        <text x="67" y="49" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#92400e">絶縁</text>
        <rect x="80" y="26" width="42" height="40" rx="3" fill="#fee2e2" stroke="#dc2626"/>
        <text x="101" y="44" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#991b1b">IGBT</text>
        <text x="101" y="56" text-anchor="middle" font-size="5.8" fill="#991b1b">高耐圧SW</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#991b1b">MI28 X-Sync高耐圧IGBT絶縁回路</text>
        <text x="142" y="43" font-size="7.0" fill="#7f1d1d">・無接点半導体スイッチで火花・摩耗ゼロ</text>
        <text x="142" y="56" font-size="7.0" fill="#7f1d1d">・外部高電圧を絶縁しカメラ内部3Vを防護</text>
        <text x="142" y="69" font-size="7.0" fill="#7f1d1d">・遅延ジッター＜5μsで精密シンクロ発光</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#991b1b">他社ストロボの高い電圧から本体を守りつつ1万分の1秒の正確さで光らせる防弾スイッチ</text>
      `);

    case 'mi_id_resistor_adc_net':
      return wrapSvg(`
        <text x="38" y="20" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#065f46">3.15V</text>
        <line x1="38" y1="23" x2="38" y2="32" stroke="#059669" stroke-width="2"/>
        <rect x="28" y="32" width="20" height="14" rx="2" fill="#dcfce7" stroke="#16a34a"/>
        <text x="38" y="41" text-anchor="middle" font-size="5.6" fill="#166534">100kΩ</text>
        <line x1="38" y1="46" x2="38" y2="56" stroke="#059669" stroke-width="2"/>
        <rect x="28" y="56" width="20" height="14" rx="2" fill="#fef3c7" stroke="#d97706"/>
        <text x="38" y="65" text-anchor="middle" font-size="5.6" fill="#92400e">R_acc</text>
        <path d="M38 51 H72" stroke="#0284c7" stroke-width="2"/>
        <rect x="72" y="34" width="48" height="34" rx="4" fill="#dbeafe" stroke="#2563eb"/>
        <text x="96" y="49" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#1d4ed8">6値 ADC</text>
        <text x="96" y="60" text-anchor="middle" font-size="5.6" fill="#1e40af">NVRAM校正</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#065f46">MI29 ID 100kΩ分圧＆6値ADC</text>
        <text x="142" y="43" font-size="7.0" fill="#064e3b">・3.15V×100kΩ±1%高精度抵抗で分圧計測</text>
        <text x="142" y="56" font-size="7.0" fill="#064e3b">・工場NVRAM校正で極寒〜猛暑も誤判定なし</text>
        <text x="142" y="69" font-size="7.0" fill="#064e3b">・挿込安定後に給電ONする安全タイマー付</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#065f46">3本のIDピンのわずかな電圧差を精密に測り、何が付いたかを瞬時に見抜く電子鑑定士</text>
      `);

    case 'mi_audio_mux_emi_choke':
      return wrapSvg(`
        <rect x="14" y="18" width="38" height="16" rx="2" fill="#06b6d4"/>
        <text x="33" y="29" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">MI音声</text>
        <rect x="14" y="40" width="38" height="16" rx="2" fill="#64748b"/>
        <text x="33" y="51" text-anchor="middle" font-size="5.8" fill="#fff">内蔵MIC</text>
        <rect x="14" y="62" width="38" height="16" rx="2" fill="#475569"/>
        <text x="33" y="73" text-anchor="middle" font-size="5.8" fill="#fff">3.5mm</text>
        <path d="M52 26 L74 44 M52 48 L74 48 M52 70 L74 52" stroke="#0891b2" stroke-width="1.8"/>
        <rect x="74" y="28" width="48" height="40" rx="4" fill="#cffafe" stroke="#0891b2"/>
        <text x="98" y="45" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#155e75">切替MUX</text>
        <text x="98" y="58" text-anchor="middle" font-size="5.7" fill="#155e75">＋EMIコイル</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#155e75">MI30 音声切替MUX＆EMIチョーク</text>
        <text x="142" y="43" font-size="7.0" fill="#164e63">・EXT_LINE_SELで3つのマイクを自動切替</text>
        <text x="142" y="56" font-size="7.0" fill="#164e63">・デジタルMI装着時は無劣化ルートへ直結</text>
        <text x="142" y="69" font-size="7.0" fill="#164e63">・コモンモードコイルがWi-Fi電波雑音を遮断</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#155e75">マイクを載せた瞬間に自動で最高音質ルートへ切り替え、電波ノイズも漉し取る音響ミキサー</text>
      `);

    case 'mi_emi_copper_shield':
      return wrapSvg(`
        <rect x="20" y="18" width="96" height="18" rx="3" fill="#fee2e2" stroke="#dc2626"/>
        <text x="68" y="30" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#991b1b">上: ストロボ強烈EMP</text>
        <rect x="16" y="42" width="104" height="12" rx="2" fill="#d97706" stroke="#92400e" stroke-width="1.5"/>
        <text x="68" y="51" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">35μm銅箔＋導電ガスケット</text>
        <rect x="20" y="60" width="96" height="18" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <text x="68" y="72" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#1e40af">下: EVF＆BIONZ頭脳</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff7ed" stroke="#d97706"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#9a3412">MI31 直下銅箔EMIシールド層</text>
        <text x="142" y="43" font-size="7.0" fill="#7c2d12">・ストロボ閃光ノイズのEVF侵入を遮断</text>
        <text x="142" y="56" font-size="7.0" fill="#7c2d12">・逆にBIONZノイズのマイク混入も防止</text>
        <text x="142" y="69" font-size="7.0" fill="#7c2d12">・Ni-Cu導電スポンジで金属骨格へ多点接地</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9a3412">すぐ下に住むEVFやBIONZと電波がケンカしないよう間に挟む「双方向の銅の防音カーテン」</text>
      `);

    case 'mi_mainboard_zif_connector':
      return wrapSvg(`
        <rect x="34" y="16" width="68" height="18" rx="2" fill="#d97706"/>
        <text x="68" y="28" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">MIS-2006 終端</text>
        <path d="M68 34 V46" stroke="#0f766e" stroke-width="2.4"/>
        <rect x="20" y="46" width="96" height="24" rx="3" fill="#fef3c7" stroke="#0f766e" stroke-width="1.8"/>
        <text x="68" y="61" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0f766e">24極 0.4mm ZIF終着駅</text>
        <text x="68" y="83" text-anchor="middle" font-size="6.0" fill="#334155">音声・制御・給電の3大幹線へ</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0fdfa" stroke="#0f766e"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#115e59">MI32 24極メイン基板ZIF終端</text>
        <text x="142" y="43" font-size="7.0" fill="#134e4a">・0.4mmピッチ24極フリップロック固定</text>
        <text x="142" y="56" font-size="7.0" fill="#134e4a">・BIONZ音声/SYSCON/PMICの3幹線へ分岐</text>
        <text x="142" y="69" font-size="7.0" fill="#134e4a">・コネクタ1本脱着でシュー単独交換OK</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#115e59">頭上から届いた全24本の神経をパチンと1発でメイン基板へ繋ぐ、整備性抜群の終着駅</text>
      `);

    default:
      return null;
  }
}
