import { PartExplanation } from '../assemblies/types';

/**
 * 30 bespoke beginner-friendly technical SVG schematics (320x118, strictly zero overflow) for Phase 18:
 *  - Phase 18A: 50mm F1.2 GM Prime Lens Standalone-Only Micro (+24: L75–L98)
 *  - Phase 18B: 55mm Large-Diameter Lens Mount Deep-Audit Completion (+6: M43–M48)
 */
export function renderPhase18LensMountSchematicSvg(
  type: PartExplanation['diagramType'],
  wrap: (body: string) => string
): string | null {
  switch (type) {
    // =========================================================================
    // PHASE 18A: 50mm F1.2 GM PRIME LENS (L75–L98)
    // =========================================================================
    case 'lens_fluorine_topcoat':
      return wrap(`
        <rect x="18" y="62" width="108" height="28" rx="3" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="18" y="55" width="108" height="7" rx="1" fill="#06b6d4"/>
        <circle cx="48" cy="43" r="11" fill="#38bdf8" stroke="#0369a1" stroke-width="1.5"/>
        <circle cx="90" cy="46" r="8" fill="#7dd3fc" stroke="#0369a1" stroke-width="1.5"/>
        <text x="26" y="79" font-size="6.0" fill="#0369a1">第1 XAガラス</text>
        <text x="22" y="28" font-size="6.0" fill="#0e7490">接触角 &gt;110° 超撥水</text>
        <text x="12" y="112" font-size="6.7" fill="#0369a1">15nm PFPEフッ素膜が水滴・皮脂を玉にして弾く</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#06b6d4"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0e7490">最前面フッ素防汚ナノコート</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・膜厚わずか15nm(可視光の1/30)</text>
        <text x="144" y="60" font-size="6.3" fill="#0284c7">・雨粒も指紋油もサッと一拭き除去</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・下地ARの透過率99.8%を乱さない</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・シラン化学結合で数千回拭き耐久</text>
      `);

    case 'lens_nano_ar_ii_layer':
      return wrap(`
        <rect x="18" y="64" width="108" height="26" rx="2" fill="#93c5fd" stroke="#2563eb"/>
        <polyline points="20,64 26,46 32,64 38,46 44,64 50,46 56,64 62,46 68,64 74,46 80,64 86,46 92,64 98,46 104,64 110,46 116,64 122,46" fill="#0ea5e9" stroke="#0369a1" stroke-width="1"/>
        <line x1="48" y1="20" x2="64" y2="86" stroke="#f59e0b" stroke-width="2.2"/>
        <line x1="60" y1="48" x2="80" y2="28" stroke="#ef4444" stroke-width="1.2" stroke-dasharray="2 2" opacity="0.5"/>
        <text x="20" y="32" font-size="5.9" fill="#0369a1">&lt;200nm多孔構造</text>
        <text x="80" y="32" font-size="5.7" fill="#dc2626">反射&lt;0.08%</text>
        <text x="12" y="112" font-size="6.7" fill="#1d4ed8">蛾の目構造で屈折率を連続傾斜させ逆光ゴースト消滅</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#1e40af">ナノARコーティングII</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・サブ波長多孔シリカで反射&lt;0.08%</text>
        <text x="144" y="60" font-size="6.3" fill="#1d4ed8">・急曲率の大口径XA全面へ均一成膜</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・強い太陽逆光や夜景ゴーストを撃退</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・第2世代で周辺斜光もヌケ抜群</text>
      `);

    case 'lens_edge_sumi_blackening':
      return wrap(`
        <path d="M36,24 Q72,18 108,24 L108,84 Q72,90 36,84 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.4"/>
        <rect x="30" y="24" width="6" height="60" fill="#0f172a"/>
        <rect x="108" y="24" width="6" height="60" fill="#0f172a"/>
        <line x1="56" y1="22" x2="108" y2="52" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="3 2"/>
        <circle cx="108" cy="52" r="3.5" fill="#dc2626"/>
        <text x="48" y="56" font-size="6.0" fill="#0369a1">ガラス内部</text>
        <text x="18" y="97" font-size="5.8" fill="#0f172a">コバ墨塗り(黒)</text>
        <text x="12" y="112" font-size="6.7" fill="#0f172a">全14枚外周コバ面を光学専用墨で塗り側面反射−95%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#1e293b"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0f172a">全14枚「コバ墨塗り」遮光</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・ガラス側面での迷光全反射を吸収</text>
        <text x="144" y="60" font-size="6.3" fill="#dc2626">・高屈折率整合バインダー専用墨塗料</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・膜厚15μm均一塗布で枠歪みゼロ</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・F1.2開放の黒締まりとコントラスト向上</text>
      `);

    case 'lens_uv_cement_bond':
      return wrap(`
        <path d="M24,22 Q54,18 68,28 L68,82 Q54,92 24,88 Z" fill="#6ee7b7" stroke="#059669" stroke-width="1.5"/>
        <rect x="68" y="28" width="5" height="54" fill="#fde047"/>
        <path d="M73,28 L114,22 L114,88 L73,82 Z" fill="#34d399" stroke="#047857" stroke-width="1.5"/>
        <line x1="18" y1="55" x2="122" y2="55" stroke="#2563eb" stroke-width="2"/>
        <text x="27" y="48" font-size="5.8" fill="#065f46">Super ED</text>
        <text x="80" y="48" font-size="5.8" fill="#065f46">高分散凹</text>
        <text x="48" y="97" font-size="5.8" fill="#a16207">15μm UVバルサム</text>
        <text x="12" y="112" font-size="6.7" fill="#047857">空気ゼロ密着接合で2面分のゴースト反射を完全消去</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#065f46">15μm UV光学バルサム接合</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・L10(ED)＋L11(フリント)を1体化</text>
        <text x="144" y="60" font-size="6.3" fill="#047857">・屈折率n=1.56整合で界面反射&lt;0.05%</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・レーザー調芯しつつUV瞬時硬化</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・黄変や剥離のない高耐候光学樹脂</text>
      `);

    case 'lens_uv_potting_wells':
      return wrap(`
        <circle cx="72" cy="54" r="34" fill="#475569"/>
        <circle cx="72" cy="54" r="25" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <circle cx="72" cy="24" r="5" fill="#f59e0b"/>
        <circle cx="46" cy="69" r="5" fill="#f59e0b"/>
        <circle cx="98" cy="69" r="5" fill="#f59e0b"/>
        <text x="53" y="57" font-size="6.0" fill="#0369a1">光学ガラス</text>
        <text x="20" y="22" font-size="5.8" fill="#b45309">120° 3点UV弾性溜まり</text>
        <text x="12" y="112" font-size="6.7" fill="#b45309">−20℃金属収縮でもガラスを歪ませない3点弾性接着</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#92400e">3点UV弾性ポッティング</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・120°対称3箇所の弾性シリコーン固定</text>
        <text x="144" y="60" font-size="6.3" fill="#b45309">・アルミ枠とガラスの熱膨張差を吸収</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・低温収縮による非点収差を完全回避</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・低アウトガス仕様でレンズ曇りゼロ</text>
      `);

    case 'lens_phase_align_marks':
      return wrap(`
        <rect x="20" y="22" width="104" height="18" rx="3" fill="#64748b"/>
        <rect x="20" y="44" width="104" height="18" rx="3" fill="#475569"/>
        <rect x="20" y="66" width="104" height="18" rx="3" fill="#334155"/>
        <polygon points="72,26 67,36 77,36" fill="#facc15"/>
        <polygon points="72,48 67,58 77,58" fill="#facc15"/>
        <polygon points="72,70 67,80 77,80" fill="#facc15"/>
        <line x1="72" y1="18" x2="72" y2="90" stroke="#facc15" stroke-width="1.2" stroke-dasharray="2 2"/>
        <text x="82" y="34" font-size="5.6" fill="#fff">前群枠</text>
        <text x="82" y="56" font-size="5.6" fill="#fff">AF枠</text>
        <text x="82" y="78" font-size="5.6" fill="#fff">主鏡筒</text>
        <text x="12" y="112" font-size="6.7" fill="#a16207">全階層の▲基準マーク一致で偏芯相殺位相を100%復元</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#854d0e">光学位相合わせ▲マーク</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・Lensrentals絶賛のGM整備性設計</text>
        <text x="144" y="60" font-size="6.3" fill="#a16207">・レンズ間の微偏芯相殺角を刻印記録</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・前群チルトシム方位もズレなく復元</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・分解整備後も工場出荷解像を維持</text>
      `);

    case 'lens_filter_bayonet_slots':
      return wrap(`
        <circle cx="72" cy="54" r="34" fill="none" stroke="#475569" stroke-width="8"/>
        <path d="M72 20 A34 34 0 0 1 96 30" fill="none" stroke="#f59e0b" stroke-width="8"/>
        <path d="M101 71 A34 34 0 0 1 78 87" fill="none" stroke="#f59e0b" stroke-width="8"/>
        <path d="M43 71 A34 34 0 0 1 43 37" fill="none" stroke="#f59e0b" stroke-width="8"/>
        <text x="53" y="52" font-size="6.2" fill="#b45309">1/8回転</text>
        <text x="54" y="63" font-size="6.0" fill="#334155">(45°着脱)</text>
        <text x="12" y="112" font-size="6.7" fill="#b45309">3爪バヨネット＋隠しロックねじでフィルター枠単独交換</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#92400e">1/8回転バヨネット枠爪</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・3箇所の45°バヨネット爪で高強度支持</text>
        <text x="144" y="60" font-size="6.3" fill="#b45309">・先端打痕時に枠だけ安く部分交換可</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・隠しサービス穴経由で外観ネジなし</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・前玉への衝突衝撃波及も緩和</text>
      `);

    case 'lens_mf_fluorogrease_film':
      return wrap(`
        <rect x="18" y="24" width="108" height="16" rx="2" fill="#334155"/>
        <rect x="18" y="41" width="108" height="10" rx="1" fill="#38bdf8"/>
        <rect x="18" y="52" width="108" height="22" rx="2" fill="#64748b"/>
        <polygon points="24,52 30,62 36,52" fill="#0f172a"/>
        <polygon points="108,52 114,62 120,52" fill="#0f172a"/>
        <text x="34" y="35" font-size="5.8" fill="#fff">MFフォーカスリング</text>
        <text x="32" y="48" font-size="5.6" fill="#0c4a6e">40μm PFPEグリス膜</text>
        <text x="48" y="86" font-size="5.8" fill="#334155">両端ラビリンス油止め溝</text>
        <text x="12" y="112" font-size="6.7" fill="#0369a1">非揮発PFPEグリス剪断抵抗で22mN·mの至高操作感</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#075985">MFダンピンググリス油膜</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・電子MF環にしっとり粘性抵抗付与</text>
        <text x="144" y="60" font-size="6.3" fill="#0284c7">・−30℃〜+80℃で重さ変化を極小化</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・非揮発PFPEでレンズ内曇りゼロ</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・両端油止め溝で油垂れを完全遮断</text>
      `);

    case 'lens_iris_blade_pins_ptfe':
      return wrap(`
        <circle cx="72" cy="54" r="33" fill="#334155" stroke="#0f172a"/>
        <circle cx="72" cy="54" r="18" fill="#ffffff"/>
        <circle cx="72" cy="26" r="2.6" fill="#facc15"/>
        <circle cx="96" cy="40" r="2.6" fill="#facc15"/>
        <circle cx="96" cy="68" r="2.6" fill="#facc15"/>
        <circle cx="72" cy="82" r="2.6" fill="#facc15"/>
        <circle cx="48" cy="68" r="2.6" fill="#facc15"/>
        <circle cx="48" cy="40" r="2.6" fill="#facc15"/>
        <circle cx="72" cy="54" r="25" fill="none" stroke="#f8fafc" stroke-width="1.6" stroke-dasharray="3 2"/>
        <text x="58" y="56" font-size="5.8" fill="#0f172a">22ピン</text>
        <text x="12" y="112" font-size="6.7" fill="#334155">DLC22本ピン＋30μm PTFEシートで完全無油サイレント</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0f172a">絞り22ピン＆PTFEシート</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・11枚羽根×各2本(φ0.65mm DLCピン)</text>
        <text x="144" y="60" font-size="6.3" fill="#b45309">・30μm PTFE乾式シートで無油動作</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・絞り油粘り故障を永久に根絶</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・動画無段階AE・120fps追従に対応</text>
      `);

    case 'lens_xd_sintered_bushings':
      return wrap(`
        <rect x="18" y="48" width="108" height="12" rx="3" fill="#cbd5e1" stroke="#64748b"/>
        <rect x="38" y="38" width="68" height="32" rx="4" fill="#b45309" stroke="#78350f"/>
        <rect x="38" y="45" width="68" height="18" fill="#1e293b"/>
        <rect x="38" y="48" width="68" height="12" fill="#cbd5e1"/>
        <text x="42" y="32" font-size="5.8" fill="#92400e">焼結含油ブロンズ</text>
        <text x="42" y="83" font-size="5.8" fill="#334155">隙間3–5μm 無音摺動</text>
        <text x="12" y="112" font-size="6.7" fill="#92400e">焼結含油＆グラファイト軸受×8でボール音ゼロ静音AF</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#b45309"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#7c2d12">焼結含油リニアスリーブ軸受</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・チタン軸と3–5μm精密クリアランス</text>
        <text x="144" y="60" font-size="6.3" fill="#b45309">・自己潤滑でスティックスリップ皆無</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・ボール転がり音ゼロで映画収録対応</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・重いF1.2ガラス群をA/B計8個で支持</text>
      `);

    case 'lens_xd_magnetic_park_brake':
      return wrap(`
        <rect x="20" y="28" width="38" height="52" rx="3" fill="#dc2626"/>
        <rect x="58" y="28" width="8" height="52" rx="1" fill="#38bdf8"/>
        <rect x="66" y="34" width="22" height="40" rx="2" fill="#64748b"/>
        <rect x="92" y="34" width="28" height="40" rx="3" fill="#0ea5e9"/>
        <text x="25" y="56" font-size="5.8" fill="#fff">磁石端</text>
        <text x="69" y="56" font-size="5.5" fill="#fff">軟鉄</text>
        <text x="95" y="56" font-size="5.6" fill="#fff">AF群</text>
        <text x="24" y="92" font-size="5.8" fill="#0369a1">電源OFF: 2N磁気吸着</text>
        <text x="12" y="112" font-size="6.7" fill="#b91c1c">電源OFF時に軟鉄片を磁気吸着しガラスのガタつき防止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#991b1b">無通電磁気パークブレーキ</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・電源OFF時のAF群コトコト衝突防止</text>
        <text x="144" y="60" font-size="6.3" fill="#dc2626">・待機端の軟鉄片が約2Nで穏やか保持</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・0.25mm緩衝シートで着座音ゼロ</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・電源ON時はXD推力12Nで瞬時離脱</text>
      `);

    case 'lens_focus_front_lightfoil':
      return wrap(`
        <circle cx="72" cy="54" r="34" fill="#0f172a"/>
        <circle cx="72" cy="54" r="21" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <circle cx="72" cy="54" r="28" fill="none" stroke="#64748b" stroke-width="1" stroke-dasharray="3 2"/>
        <text x="56" y="56" font-size="5.8" fill="#0369a1">AF有効径</text>
        <text x="26" y="96" font-size="5.8" fill="#0f172a">50μm極薄黒遮光箔</text>
        <text x="12" y="112" font-size="6.7" fill="#0f172a">質量0.05g未満の極薄黒箔でAF群周辺の迷光漏れ遮断</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#1e293b"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0f172a">AF群前面・粘着遮光箔</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・Lensrentals GM分解で確認の黒箔</text>
        <text x="144" y="60" font-size="6.3" fill="#1e293b">・可動枠と接着ポケットの光沢を隠蔽</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・0.05g未満でXD高速AFへの負荷0</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・反射率&lt;0.4%でリングゴースト撲滅</text>
      `);

    case 'lens_mr_gap_calib_shims':
      return wrap(`
        <rect x="20" y="24" width="104" height="16" rx="2" fill="#0284c7"/>
        <rect x="20" y="48" width="104" height="14" rx="2" fill="#16a34a"/>
        <rect x="20" y="64" width="104" height="8" rx="1" fill="#94a3b8"/>
        <rect x="20" y="74" width="104" height="12" rx="2" fill="#475569"/>
        <line x1="72" y1="40" x2="72" y2="48" stroke="#dc2626" stroke-width="2"/>
        <text x="28" y="35" font-size="5.8" fill="#fff">200μm磁気スケール</text>
        <text x="76" y="46" font-size="5.6" fill="#dc2626">80μm隙間</text>
        <text x="36" y="57" font-size="5.6" fill="#fff">MRセンサー</text>
        <text x="30" y="70" font-size="5.4" fill="#0f172a">非磁性SUS316シム</text>
        <text x="12" y="112" font-size="6.7" fill="#15803d">非磁性SUS316シムで80±10μmギャップを厳密保持</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#166534">MRギャップ校正シム</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・磁気信号は距離で指数関数減衰</text>
        <text x="144" y="60" font-size="6.3" fill="#15803d">・80±10μm維持で分解能&lt;0.5μm</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・非磁性SUS316で磁束歪みゼロ</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・F1.2極薄ピントを120fps追従</text>
      `);

    case 'lens_inner_thread_baffles':
      return wrap(`
        <rect x="18" y="20" width="108" height="72" rx="4" fill="#0f172a"/>
        <polyline points="22,26 28,34 34,26 40,34 46,26 52,34 58,26 64,34 70,26 76,34 82,26 88,34 94,26 100,34 106,26 112,34 118,26" fill="none" stroke="#94a3b8" stroke-width="1.6"/>
        <polyline points="22,86 28,78 34,86 40,78 46,86 52,78 58,86 64,78 70,86 76,78 82,86 88,78 94,86 100,78 106,86 112,78 118,86" fill="none" stroke="#94a3b8" stroke-width="1.6"/>
        <line x1="22" y1="56" x2="120" y2="56" stroke="#38bdf8" stroke-width="2"/>
        <line x1="24" y1="42" x2="54" y2="30" stroke="#ef4444" stroke-width="1.4" stroke-dasharray="2 2"/>
        <text x="34" y="50" font-size="5.8" fill="#e2e8f0">0.3mm V溝セレーション</text>
        <text x="12" y="112" font-size="6.7" fill="#0f172a">60°V溝ねじ切り内壁でかすめ角反射率を1/300へ削減</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0f172a">内壁0.3mm V溝遮光セレーション</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・鏡筒内壁へ連続60°V溝をCNC切削</text>
        <text x="144" y="60" font-size="6.3" fill="#dc2626">・斜め迷光を溝内で多重反射吸収</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・かすめ角反射率 30%→&lt;0.10%</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・逆光撮影時の黒浮きを徹底抑制</text>
      `);

    case 'lens_aberration_lut_eeprom':
      return wrap(`
        <rect x="22" y="28" width="44" height="44" rx="4" fill="#1e293b" stroke="#0ea5e9" stroke-width="1.8"/>
        <text x="29" y="48" font-size="5.8" fill="#38bdf8">64Mb</text>
        <text x="27" y="59" font-size="5.6" fill="#fff">LUT ROM</text>
        <line x1="68" y1="50" x2="90" y2="50" stroke="#0284c7" stroke-width="2"/>
        <polygon points="88,47 94,50 88,53" fill="#0284c7"/>
        <rect x="94" y="28" width="32" height="44" rx="3" fill="#0f766e"/>
        <text x="97" y="48" font-size="5.5" fill="#fff">BIONZ</text>
        <text x="103" y="59" font-size="5.5" fill="#fff">XR</text>
        <text x="22" y="88" font-size="5.8" fill="#0369a1">装着&lt;15msで補正表転送</text>
        <text x="12" y="112" font-size="6.7" fill="#0369a1">歪曲・倍率色収差・ブリージングLUTをレンズ内蔵</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#075985">収差・ブリージングLUT ROM</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・歪曲/周辺光量/色収差の多次元表</text>
        <text x="144" y="60" font-size="6.3" fill="#0284c7">・動画ブリージング補正係数も格納</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・装着15ms未満でカメラへ自動送信</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・ボディ経由ファーム更新にも対応</text>
      `);

    case 'lens_mcu_emi_absorber':
      return wrap(`
        <rect x="20" y="60" width="104" height="24" rx="3" fill="#15803d"/>
        <rect x="26" y="44" width="92" height="14" rx="2" fill="#334155" stroke="#0f172a"/>
        <rect x="34" y="30" width="24" height="12" rx="2" fill="#94a3b8"/>
        <rect x="86" y="30" width="24" height="12" rx="2" fill="#94a3b8"/>
        <path d="M58 60 Q68 50 78 60" fill="none" stroke="#ef4444" stroke-width="1.6"/>
        <text x="34" y="53" font-size="5.6" fill="#f8fafc">軟磁性フェライト吸収シート</text>
        <text x="38" y="74" font-size="5.8" fill="#fff">4ch XDドライバPCB</text>
        <text x="12" y="112" font-size="6.7" fill="#334155">フェライト吸収シート＋導電ガスケットでPWM雑音−20dB</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0f172a">XD PWMノイズ吸収シート</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・4基XDモーター高周波雑音を熱変換</text>
        <text x="144" y="60" font-size="6.3" fill="#dc2626">・30MHz–1GHz放射を−20dB以上抑圧</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・Ni/Cu導電ガスケットで360°接地</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・高感度画質と無線マイク干渉を保護</text>
      `);

    case 'lens_contact_esd_tvs':
      return wrap(`
        <rect x="18" y="32" width="22" height="44" rx="2" fill="#eab308"/>
        <line x1="40" y1="54" x2="100" y2="54" stroke="#0284c7" stroke-width="2.2"/>
        <polygon points="62,54 72,66 52,66" fill="#dc2626"/>
        <line x1="52" y1="68" x2="72" y2="68" stroke="#dc2626" stroke-width="2"/>
        <line x1="62" y1="68" x2="62" y2="86" stroke="#334155" stroke-width="2"/>
        <line x1="52" y1="86" x2="72" y2="86" stroke="#334155" stroke-width="2"/>
        <rect x="98" y="34" width="28" height="40" rx="3" fill="#1e293b"/>
        <text x="20" y="56" font-size="5.4" fill="#422006">12Pin</text>
        <text x="103" y="56" font-size="5.6" fill="#fff">MCU</text>
        <text x="42" y="28" font-size="5.8" fill="#dc2626">±15kV→GND逃し</text>
        <text x="12" y="112" font-size="6.7" fill="#dc2626">0.3pF超高速TVS(0.5ns)＋突入電流ソフトスタート段</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#991b1b">接点±15kV ESD TVS保護</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・冬場の静電気スパークを0.5ns遮断</text>
        <text x="144" y="60" font-size="6.3" fill="#dc2626">・0.3pF極低容量で高速AF通信無劣化</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・装着時の突入電流を2ms緩やか充電</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・12極接点直裏の最短保護レイアウト</text>
      `);

    case 'lens_xa_aspheric_profile':
      return wrap(`
        <path d="M26,22 Q54,54 26,86" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3 2"/>
        <path d="M36,22 C66,34 66,74 36,86" fill="none" stroke="#0284c7" stroke-width="3"/>
        <circle cx="96" cy="54" r="22" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
        <circle cx="96" cy="54" r="14" fill="#bae6fd"/>
        <text x="20" y="96" font-size="5.6" fill="#0369a1">XA変曲カーブ</text>
        <text x="77" y="88" font-size="5.6" fill="#0369a1">年輪なし玉ボケ</text>
        <text x="12" y="112" font-size="6.7" fill="#0284c7">0.01μm(10nm)超精密XA面が年輪ボケを完全撲滅</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#075985">0.01μm XA非球面プロファイル</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・光の波長の1/55以下の超平滑研磨</text>
        <text x="144" y="60" font-size="6.3" fill="#0284c7">・玉ボケの汚い玉ねぎ模様を完全消去</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・前玉/AF群/後玉へ贅沢に3枚投入</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・F1.2開放の隅解像とボケを究極両立</text>
      `);

    case 'lens_barrel_breather_vent':
      return wrap(`
        <rect x="18" y="24" width="108" height="64" rx="4" fill="#f1f5f9" stroke="#64748b"/>
        <rect x="58" y="24" width="14" height="64" fill="#ffffff" stroke="#0ea5e9" stroke-width="1.6" stroke-dasharray="3 2"/>
        <line x1="24" y1="48" x2="118" y2="48" stroke="#0284c7" stroke-width="1.8"/>
        <polygon points="114,45 120,48 114,51" fill="#0284c7"/>
        <circle cx="96" cy="68" r="3" fill="#92400e"/>
        <line x1="90" y1="68" x2="74" y2="68" stroke="#dc2626" stroke-width="1.4"/>
        <text x="22" y="39" font-size="5.6" fill="#0369a1">空気のみ通過</text>
        <text x="76" y="80" font-size="5.6" fill="#b91c1c">0.3μm塵遮断</text>
        <text x="12" y="112" font-size="6.7" fill="#0369a1">疎水ePTFE防塵呼吸弁でAF空気移動と標高差圧を均等化</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#075985">鏡筒ePTFE防塵呼吸ベント</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・高速AF移動時の内部気圧差を解放</text>
        <text x="144" y="60" font-size="6.3" fill="#0284c7">・0.3μm疎水膜でチリ99.97%ブロック</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・飛行機や高山移動での結露も抑止</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・XDモーターの空気抵抗負荷も低減</text>
      `);

    case 'lens_aperture_f12_lock_pin':
      return wrap(`
        <rect x="18" y="44" width="108" height="24" rx="3" fill="#334155"/>
        <polygon points="34,44 39,50 44,44" fill="#ffffff"/>
        <polygon points="54,44 59,50 64,44" fill="#ffffff"/>
        <polygon points="82,44 90,56 98,44" fill="#ef4444"/>
        <rect x="86" y="22" width="8" height="28" rx="2" fill="#cbd5e1" stroke="#dc2626" stroke-width="1.4"/>
        <text x="28" y="63" font-size="5.8" fill="#e2e8f0">F1.2..F16</text>
        <text x="102" y="63" font-size="6.2" font-weight="bold" fill="#facc15">A</text>
        <text x="22" y="30" font-size="5.6" fill="#dc2626">深溝2×抵抗＋ロックピン</text>
        <text x="12" y="112" font-size="6.7" fill="#dc2626">F16↔A境界の深掘り溝＋焼入れ鋼ピンで誤操作ゼロ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#991b1b">A位置デテント＆ロックピン</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・A境界のみ溝2倍深さで指先判別</text>
        <text x="144" y="60" font-size="6.3" fill="#dc2626">・IRIS LOCKで鋼ピン1.2mm突入固定</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・動画デクリック中もA飛び出し防止</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・プロ現場のブラインド操作を支える</text>
      `);

    case 'lens_xd_lorentz_backiron':
      return wrap(`
        <rect x="20" y="24" width="22" height="62" rx="2" fill="#c86432"/>
        <rect x="48" y="24" width="26" height="62" rx="2" fill="#64748b"/>
        <rect x="78" y="24" width="6" height="62" fill="#334155"/>
        <rect x="86" y="24" width="6" height="62" fill="#475569"/>
        <rect x="94" y="24" width="6" height="62" fill="#334155"/>
        <rect x="102" y="24" width="6" height="62" fill="#475569"/>
        <text x="22" y="56" font-size="5.4" fill="#fff">コイル</text>
        <text x="52" y="56" font-size="5.6" fill="#fff">N52</text>
        <text x="76" y="96" font-size="5.6" fill="#334155">0.35mm積層鉄心</text>
        <text x="12" y="112" font-size="6.7" fill="#334155">積層ケイ素鋼バックヨークで磁束+40%＆渦電流損−90%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0f172a">XD積層ケイ素鋼バックヨーク</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・0.35mm電磁鋼板の絶縁積層構造</text>
        <text x="144" y="60" font-size="6.3" fill="#1d4ed8">・漏れ磁束を還流し推力効率+40%</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・高速往復時の渦電流ブレーキ90%減</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・コイル熱を鏡筒へ逃がす放熱座兼任</text>
      `);

    case 'lens_rear_filter_holder_tabs':
      return wrap(`
        <path d="M36,24 Q72,42 108,24 L108,70 Q72,82 36,70 Z" fill="#a5b4fc" stroke="#4f46e5" stroke-width="1.5"/>
        <rect x="20" y="22" width="16" height="64" rx="2" fill="#1e293b"/>
        <rect x="108" y="22" width="16" height="64" rx="2" fill="#1e293b"/>
        <line x1="20" y1="86" x2="124" y2="86" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="3 2"/>
        <text x="48" y="54" font-size="5.8" fill="#312e81">φ44mm後玉XA</text>
        <text x="40" y="96" font-size="5.6" fill="#dc2626">+1.2mm 物理保護リム</text>
        <text x="12" y="112" font-size="6.7" fill="#4338ca">マウント直前の巨大後玉を指接触と像円外迷光から保護</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eef2ff" stroke="#4f46e5"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#312e81">後玉保護カラー＆迷光リム</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・後玉頂点より+1.2mm突出ガード</text>
        <text x="144" y="60" font-size="6.3" fill="#4338ca">・レンズ交換時の指触れ・机傷を防止</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・30°ナイフエッジで像円外迷光遮断</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・リアキャップと防塵ラビリンス形成</text>
      `);

    case 'lens_hood_velvet_lining':
      return wrap(`
        <rect x="18" y="22" width="108" height="68" rx="4" fill="#334155"/>
        <rect x="24" y="28" width="96" height="10" fill="#020617"/>
        <rect x="24" y="74" width="96" height="10" fill="#020617"/>
        <line x1="26" y1="38" x2="118" y2="38" stroke="#64748b" stroke-width="2" stroke-dasharray="1 2"/>
        <line x1="26" y1="74" x2="118" y2="74" stroke="#64748b" stroke-width="2" stroke-dasharray="1 2"/>
        <line x1="24" y1="56" x2="118" y2="56" stroke="#38bdf8" stroke-width="2"/>
        <line x1="28" y1="48" x2="64" y2="38" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
        <text x="34" y="68" font-size="5.8" fill="#e2e8f0">0.4mm静電植毛ベルベット</text>
        <text x="12" y="112" font-size="6.7" fill="#0f172a">ALC-SH163内壁の極黒起毛が斜め逆光を99.8%吸収</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#1e293b"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0f172a">フード内壁・静電植毛ベルベット</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・0.4mm極細黒繊維を数百万本植毛</text>
        <text x="144" y="60" font-size="6.3" fill="#b45309">・斜入射反射率&lt;0.20%(樹脂比1/8)</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・携行用の逆付けバヨネット溝対応</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・高耐久バインダーで毛抜け防止</text>
      `);

    case 'lens_front_rear_caps':
      return wrap(`
        <circle cx="52" cy="54" r="28" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
        <rect x="34" y="46" width="14" height="16" rx="2" fill="#94a3b8"/>
        <rect x="56" y="46" width="14" height="16" rx="2" fill="#94a3b8"/>
        <line x1="48" y1="54" x2="56" y2="54" stroke="#facc15" stroke-width="2"/>
        <circle cx="104" cy="54" r="19" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
        <text x="27" y="92" font-size="5.6" fill="#334155">ALC-F72S</text>
        <text x="84" y="92" font-size="5.6" fill="#334155">ALC-R1EM</text>
        <text x="12" y="112" font-size="6.7" fill="#334155">中央つまみ内蔵SUSばね×2＋防塵3爪リアキャップ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0f172a">前後保護キャップ機構</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・ALC-F72S: フード装着のまま片手脱着</text>
        <text x="144" y="60" font-size="6.3" fill="#b45309">・内蔵2本ばね＆M72鋸歯で脱落防止</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・ALC-R1EM: 3爪バヨネットで接点保護</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・前玉コート＆後玉XAを守る日常の盾</text>
      `);

    // =========================================================================
    // PHASE 18B: 55mm LARGE-DIAMETER LENS MOUNT DEEP AUDIT (M43–M48)
    // =========================================================================
    case 'mount_bayonet_leadin_dlc':
      return wrap(`
        <rect x="18" y="48" width="108" height="32" rx="3" fill="#94a3b8" stroke="#475569"/>
        <polygon points="18,48 48,48 64,34 126,34 126,48" fill="#cbd5e1" stroke="#334155"/>
        <line x1="48" y1="48" x2="64" y2="34" stroke="#0284c7" stroke-width="3.2"/>
        <text x="20" y="31" font-size="5.9" fill="#0369a1">12°導入スロープ＋DLC膜</text>
        <text x="36" y="68" font-size="5.9" fill="#0f172a">HV2500 μ=0.08</text>
        <text x="12" y="112" font-size="6.7" fill="#0369a1">12°導入面取り＋DLC硬質層でステンレスかじり粉ゼロ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#075985">12°導入スロープ＆DLC層</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・重い望遠レンズを滑らかに爪へ案内</text>
        <text x="144" y="60" font-size="6.3" fill="#0284c7">・HV2500 DLCで凝着かじり＆粉ゼロ</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・動摩擦係数 0.45→0.08へ劇減</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・3万回超のプロ着脱サイクル耐久</text>
      `);

    case 'mount_power_load_switch':
      return wrap(`
        <rect x="18" y="34" width="32" height="40" rx="3" fill="#15803d"/>
        <rect x="56" y="28" width="34" height="52" rx="4" fill="#dc2626"/>
        <rect x="96" y="34" width="30" height="40" rx="3" fill="#eab308"/>
        <text x="21" y="56" font-size="5.5" fill="#fff">基板電源</text>
        <text x="61" y="52" font-size="5.8" fill="#fff">eFuse</text>
        <text x="60" y="64" font-size="5.4" fill="#fde047">&lt;50μs</text>
        <text x="100" y="56" font-size="5.5" fill="#422006">12Pin</text>
        <text x="12" y="112" font-size="6.7" fill="#dc2626">スマートeFuse(&lt;50μs遮断)＋ロック連動OFFで基板保護</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#991b1b">給電eFuse＆ホットスワップ保護</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・雨滴ショート過電流を50μs自動遮断</text>
        <text x="144" y="60" font-size="6.3" fill="#dc2626">・解除ボタン連動&lt;1msで安全給電OFF</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・±15kV TVSで静電破壊も完全防護</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・ヒューズ切れ不要の自動復帰設計</text>
      `);

    case 'mount_flange_datum_pads':
      return wrap(`
        <circle cx="72" cy="54" r="33" fill="none" stroke="#64748b" stroke-width="6"/>
        <circle cx="72" cy="21" r="6" fill="#0ea5e9" stroke="#0369a1" stroke-width="1.5"/>
        <circle cx="43" cy="70" r="6" fill="#0ea5e9" stroke="#0369a1" stroke-width="1.5"/>
        <circle cx="101" cy="70" r="6" fill="#0ea5e9" stroke="#0369a1" stroke-width="1.5"/>
        <polygon points="72,21 43,70 101,70" fill="none" stroke="#0284c7" stroke-width="1.4" stroke-dasharray="3 2"/>
        <text x="51" y="57" font-size="5.8" fill="#0369a1">18.000mm</text>
        <text x="12" y="112" font-size="6.7" fill="#0369a1">120° 3点ラップ基準台座で対センサー平行度±3μm</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#075985">3点フランジ基準データム座</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・3点決定原理でガタつきゼロ平面</text>
        <text x="144" y="60" font-size="6.3" fill="#0284c7">・18.000±0.005mm基準をCNC加工</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・工場レーザー干渉計で全数平行検査</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・F1.2開放の四隅片ボケを根本防止</text>
      `);

    case 'mount_release_wp_boot':
      return wrap(`
        <rect x="22" y="32" width="24" height="44" rx="4" fill="#94a3b8"/>
        <path d="M46,34 L54,28 L62,36 L70,28 L78,36 L86,32 L86,76 L78,72 L70,80 L62,72 L54,80 L46,74 Z" fill="#0ea5e9" opacity="0.85" stroke="#0369a1" stroke-width="1.5"/>
        <rect x="86" y="24" width="34" height="60" rx="3" fill="#334155"/>
        <text x="24" y="56" font-size="5.5" fill="#0f172a">ボタン</text>
        <text x="90" y="56" font-size="5.6" fill="#fff">内部室</text>
        <text x="48" y="94" font-size="5.8" fill="#0369a1">3段防水蛇腹ブーツ</text>
        <text x="12" y="112" font-size="6.7" fill="#0369a1">無摺動3段シリコーン蛇腹で軽快操作＆雨水侵入ゼロ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#075985">解除ボタン防水蛇腹ブーツ</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・0.35mm薄肉アコーディオン防水構造</text>
        <text x="144" y="60" font-size="6.3" fill="#0284c7">・Oリングと違い摺動摩擦ゼロの軽快感</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・レンズ伝いの雨水・砂塵を完全封鎖</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・氷点下でも硬化しない耐候シリコーン</text>
      `);

    case 'mount_overtravel_bumper':
      return wrap(`
        <rect x="20" y="34" width="44" height="36" rx="3" fill="#94a3b8"/>
        <rect x="68" y="26" width="16" height="52" rx="3" fill="#b45309"/>
        <rect x="86" y="24" width="34" height="56" rx="3" fill="#334155"/>
        <line x1="28" y1="52" x2="62" y2="52" stroke="#dc2626" stroke-width="2.2"/>
        <polygon points="60,48 67,52 60,56" fill="#dc2626"/>
        <text x="23" y="46" font-size="5.6" fill="#0f172a">60°回転爪</text>
        <text x="89" y="54" font-size="5.6" fill="#fff">ストッパ</text>
        <text x="58" y="94" font-size="5.6" fill="#92400e">HNBR緩衝材</text>
        <text x="12" y="112" font-size="6.7" fill="#92400e">高減衰HNBR緩衝パッドで装着バウンド0＆ピン保護</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#b45309"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#7c2d12">60°装着終端衝撃クッション</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・反発係数&lt;0.15の高減衰HNBR材</text>
        <text x="144" y="60" font-size="6.3" fill="#b45309">・跳ね返りを消し半ロック脱落を予防</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・過大トルクからロックピンを保護</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・引き締まった上質な装着音を実現</text>
      `);

    case 'mount_thermal_emi_fingers':
      return wrap(`
        <circle cx="72" cy="54" r="32" fill="none" stroke="#475569" stroke-width="6"/>
        <circle cx="72" cy="54" r="26" fill="none" stroke="#eab308" stroke-width="3.5" stroke-dasharray="6 6"/>
        <circle cx="72" cy="54" r="18" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="53" y="52" font-size="5.8" fill="#854d0e">8点CuBe2</text>
        <text x="54" y="62" font-size="5.6" fill="#334155">&lt;5mΩ接地</text>
        <text x="12" y="112" font-size="6.7" fill="#a16207">円周8点金めっきCuBe2指でEMI−35dB＆補助放熱</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#854d0e">8点ベリリウム銅EMI接地指</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・レンズ金属胴とボディを360°導通</text>
        <text x="144" y="60" font-size="6.3" fill="#a16207">・マウント隙間RFノイズを−35dB遮蔽</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・並列接触抵抗&lt;5mΩの超低インピーダンス</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・ボディ熱を鏡筒側へ逃がす補助経路</text>
      `);

    default:
      return null;
  }
}
