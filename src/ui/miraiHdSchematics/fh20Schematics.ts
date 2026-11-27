import { PartExplanation } from '../../assemblies/types';
import {
  MiraiHdSpec,
  miraiKpi,
  miraiPin,
  renderMiraiMonographSvg,
} from './shared';

const FH20_TAG = 'FH20 2nm頭脳 · 85/100点';

const FH20_SPECS: Partial<Record<PartExplanation['diagramType'], MiraiHdSpec>> = {
  mirai_fh20_cutaway_ihs_lid: {
    badge: 'FH20-01',
    fhTag: FH20_TAG,
    zone: 'cool',
    title: 'ニッケル銅カットアウトIHSヒートスプレッダ蓋＆レーザー銘板',
    analogy: '発熱箇所の異なる4つの未来チップの高さを均一にならし、熱を一気に空冷側へ橋渡しする精密金属カバー',
    metric: '5〜8 W 持続熱均一化',
    scaleLabel: 'NICKEL-PLATED COPPER CUTAWAY IHS · 40.2×40.2mm',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <rect x="84" y="106" width="248" height="190" rx="18" fill="url(#${p}_si)" stroke="#475569" stroke-width="2"/>
      <rect x="196" y="190" width="136" height="106" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="2" stroke-dasharray="5 3"/>
      <text x="264" y="236" text-anchor="middle" font-size="9.5" font-weight="900" fill="#34d399">右前カット透視窓</text>
      <text x="264" y="254" text-anchor="middle" font-size="8.2" font-weight="700" fill="#cbd5e1">2nm GAA・BSPDN・光I/O</text>
      <rect x="104" y="124" width="166" height="26" rx="6" fill="#0f766e"/>
      <text x="187" y="141" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">BIONZ MIRAI · 2nm/A16</text>
      ${miraiPin(142, 178, 356, 128, 1, '段差研磨Cu-Ni蓋', '異高4チップレットの熱抵抗を最小化', '#334155', 'start')}
      ${miraiPin(264, 212, 356, 190, 2, '0%組立透視カット', '内部チップレット＆光ファイバーを視認', '#0f766e', 'start')}
      ${miraiKpi(356, 232, 326, 72, '熱設計枠（TDP）整合', '持続 5〜8 W（最大15W機体枠内）', '局所ホットスポットを40mm全面へ拡散しFH32空冷へ接続', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '無酸素銅C1100＋ニッケルめっきによる低熱抵抗蓋', line2: 'チップ高さ公差±15μmをステップ加工で吸収し均一接触' },
      { label: '設計メリット', line1: 'NPU局所ピーク熱をISP・メモリ側へ水平拡散', line2: '耐食ニッケル表面が液体金属インジウムの合金化を防止' },
      { label: '設計スペック', line1: '外形 40.2×40.2mm / 厚さ 0.95mm 精密CNC蓋', line2: 'ピン1金基準マーク＋スティフナー全周シール' },
    ],
  },
  mirai_fh20_liquid_metal_tim: {
    badge: 'FH20-02',
    fhTag: FH20_TAG,
    zone: 'cool',
    title: 'インジウム／液体金属TIM熱界面シート＆流出防止ダム',
    analogy: 'チップと金属カバーのミクロの隙間を金属の熱橋で埋め、熱の通り道を通常のグリスの10倍近く広くする界面層',
    metric: '熱伝導 70〜80 W/m·K',
    scaleLabel: 'INDIUM / LIQUID-METAL TIM + SILICONE DAM',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <rect x="86" y="114" width="246" height="40" rx="6" fill="url(#${p}_si)" stroke="#475569" stroke-width="1.8"/>
      <text x="209" y="138" text-anchor="middle" font-size="9.5" font-weight="900" fill="#0f172a">ニッケル銅 IHS 蓋</text>
      <rect x="106" y="158" width="206" height="22" rx="4" fill="url(#${p}_glass)" stroke="#0284c7" stroke-width="2"/>
      <text x="209" y="173" text-anchor="middle" font-size="9" font-weight="900" fill="#0369a1">インジウム／液体金属 TIM（k ≈ 75 W/m·K）</text>
      <rect x="86" y="156" width="18" height="28" rx="4" fill="#1e293b"/>
      <rect x="314" y="156" width="18" height="28" rx="4" fill="#1e293b"/>
      <rect x="106" y="184" width="96" height="36" rx="5" fill="#1e3a8a"/>
      <text x="154" y="206" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ffffff">2nm GAA NPU</text>
      <rect x="216" y="184" width="96" height="36" rx="5" fill="#0369a1"/>
      <text x="264" y="206" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ffffff">5nm ISP/Codec</text>
      ${miraiKpi(356, 114, 326, 86, '従来グリス比の熱抵抗低減', '75 W/m·K vs 従来 6〜10 W/m·K', '2nm高密度NPUの瞬間ピーク温度ΔTを12〜18℃低減', '#0284c7')}
      ${miraiKpi(356, 214, 326, 86, '流出・短絡フェイルセーフ', '全周EPDMシリコン防液ダム', '振動・縦位置撮影でも周辺MLCCへの漏洩を物理遮断', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '金属結合フォノン・自由電子熱輸送で接触熱抵抗を極小化', line2: '周辺35.8mm全周シリコンダムがMLCC短絡リスクを封止' },
      { label: '撮影メリット', line1: '8K/12K RAW＋AI推論同時実行時のサーマルスロットリング回避', line2: '経年ポンプアウト（グリス乾き）が起きず10年級安定放熱' },
      { label: '設計スペック', line1: '主要5ダイ個別精密パターン / 膜厚 0.22 mm', line2: '接触熱抵抗 R_th < 0.04 K·cm²/W' },
    ],
  },
  mirai_fh20_gaa_npu_die: {
    badge: 'FH20-03',
    fhTag: FH20_TAG,
    zone: 'active',
    title: '核心①：2nm/A16 GAAナノシート 1,000 TOPS NPU主計算ダイ',
    analogy: '電流の通り道を4方向から完全に包み込む極小ナノシート・トランジスタを敷き詰めた、毎秒最大1,000兆回計算の頭脳核',
    metric: 'ピーク 500〜1,000 TOPS',
    scaleLabel: '2nm/A16 GAA NANOSHEET SYSTOLIC NPU · 13.6×13.6mm',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: () => `
      <rect x="86" y="108" width="234" height="190" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="2.2"/>
      ${[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${102 + c * 52}" y="${122 + r * 36}" width="44" height="28" rx="4" fill="${(r + c) % 2 === 0 ? '#1d4ed8' : '#0f766e'}" stroke="#7dd3fc" stroke-width="1"/>`).join('')).join('')}
      <text x="203" y="284" text-anchor="middle" font-size="9.5" font-weight="900" fill="#34d399">16基 シストリック・テンソルアレイ（INT8 / 1.58-bit）</text>
      ${miraiKpi(340, 108, 342, 88, '現実的5〜8W枠の演算性能', 'デンス 100〜250 / ピーク 500〜1,000 TOPS', 'INT8密演算＋スパース/1.58-bit積和最適化で省電力達成', '#0284c7')}
      ${miraiKpi(340, 208, 342, 90, 'GAAナノシート立体ゲート', '3〜4段水平チャネルを360°包囲', 'リーク電流を劇減し低電圧0.6V動作で省電力駆動', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '2nm/A16 GAA（Gate-All-Around）がチャネル4面を制御', line2: 'NPU先端ダイのみ2nmへ集中しISP等は成熟チップレットへ分離' },
      { label: '撮影メリット', line1: '0.5秒先読みAF・物理RAW超解像・120fps被写体認識を同時実行', line2: '現行BIONZ（10–60 TOPS）比 10〜20倍超のAI推論余裕' },
      { label: '設計スペック', line1: 'ダイ寸法 13.6×13.6mm / 動作枠 5〜8 W', line2: 'TSMC N2/A16・Intel 18A・Samsung SF2 クラス準拠' },
    ],
  },
  mirai_fh20_bspdn_power_rails: {
    badge: 'FH20-04',
    fhTag: FH20_TAG,
    zone: 'link',
    title: '核心②：BSPDN（背面電源供給：PowerVia/SPR級）純銅パワーレール',
    analogy: '信号線とごちゃ混ぜだった電気の配線をチップの「裏側」へ引っ越しさせ、極太の銅ハイウェイでロスなく電気を届ける革命構造',
    metric: 'IRドロップ −30% · +6%高速',
    scaleLabel: 'BACKSIDE POWER DELIVERY NETWORK (BSPDN) · NANO-TSV',
    accent: '#d97706',
    accentSoft: '#fef3c7',
    art: (p) => `
      <rect x="86" y="106" width="256" height="44" rx="6" fill="#1e3a8a" stroke="#38bdf8" stroke-width="1.8"/>
      <text x="214" y="132" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">表面：信号配線専用 BEOL（混雑解消）</text>
      <rect x="86" y="156" width="256" height="36" rx="6" fill="#0f766e" stroke="#34d399" stroke-width="1.8"/>
      <text x="214" y="178" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">2nm GAA トランジスタ活性層（極薄Si）</text>
      ${[114, 154, 194, 234, 274, 314].map((x) => `<line x1="${x}" y1="192" x2="${x}" y2="232" stroke="#f59e0b" stroke-width="4"/>`).join('')}
      <rect x="86" y="232" width="256" height="54" rx="8" fill="url(#${p}_cu)" stroke="#b45309" stroke-width="2"/>
      <text x="214" y="256" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">裏面：BSPDN 極太純銅パワーレール</text>
      <text x="214" y="274" text-anchor="middle" font-size="8.4" font-weight="700" fill="#fef3c7">Nano-TSV / Super Power Rail 直接給電</text>
      ${miraiKpi(360, 108, 322, 86, '実測クリアリング済み効果', '電圧降下 −30% → 周波数 +6%', '同クロック比で消費電力を約5〜10%削減・セル利用率+5〜10%', '#d97706')}
      ${miraiKpi(360, 206, 322, 82, '2026–2028導入ノード', 'Intel 18A / TSMC A16 / SF2Z', '電源と信号の物理分離で2nm微細化の配線の壁を突破', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '信号配線（表面）と電源レール（裏面）をウェーハ両面へ分離', line2: 'Nano-TSV／背面コンタクトで直上から大電流を低抵抗供給' },
      { label: '撮影メリット', line1: '電圧降下30%減により高負荷AI連写時も低発熱・高クロック維持', line2: 'ダイ面積のセル利用率5〜10%向上でコストと電池消費を圧縮' },
      { label: '設計スペック', line1: 'Intel 18A PowerVia / TSMC A16 SPR クラス準拠', line2: 'IRドロップ −30% / 同クロック電力 −5〜10%' },
    ],
  },
  mirai_fh20_vwm_ternary_tile: {
    badge: 'FH20-05',
    fhTag: FH20_TAG,
    zone: 'link',
    title: 'FH23連動：1.58-bit 視覚世界モデル（VWM）専用3値演算タイル',
    analogy: '重い掛け算をやめて「＋1・0・−1」の足し算だけで場面の意味や次の動きを理解する、超省エネの知能チップ',
    metric: '1.58-bit · 2B〜3Bモデル',
    scaleLabel: 'FH23 1.58-BIT TERNARY VISUAL WORLD MODEL TILE',
    accent: '#7c3aed',
    accentSoft: '#f3e8ff',
    art: () => `
      <rect x="86" y="114" width="248" height="176" rx="12" fill="#2e1065" stroke="#a78bfa" stroke-width="2"/>
      <rect x="102" y="130" width="124" height="106" rx="8" fill="#4c1d95" stroke="#c4b5fd" stroke-width="1.5"/>
      <text x="164" y="162" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">1.58-bit VWM</text>
      <text x="164" y="182" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ddd6fe">重み {-1, 0, +1}</text>
      <text x="164" y="202" text-anchor="middle" font-size="8.2" font-weight="700" fill="#6ee7b7">1〜5 Hz 非同期ディレクター</text>
      <rect x="236" y="130" width="84" height="106" rx="8" fill="#065f46" stroke="#34d399" stroke-width="1.5"/>
      <text x="278" y="172" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">軽量追尾</text>
      <text x="278" y="192" text-anchor="middle" font-size="8.2" font-weight="700" fill="#a7f3d0">60–120 fps</text>
      <text x="210" y="268" text-anchor="middle" font-size="9" font-weight="800" fill="#e9d5ff">乗算ゼロ→加算器化でエネルギー効率劇的向上</text>
      ${miraiKpi(354, 114, 328, 84, '2階層AI熱・帯域整合', '1.5〜2 GB RAM · 50〜100 tok/s', 'VWMは1–5Hzで状況判断、高速追尾は専用コアが分担', '#7c3aed')}
      ${miraiKpi(354, 210, 328, 80, '革新性スコア 88/100（FH23）', 'オフライン完結・クラウド不要', '「鳥が飛び立つ瞬間」を物理理解し予知AF/構図支援', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'BitNet系1.58-bit量子化で浮動小数点乗算を加減算へ置換', line2: '非同期1–5Hz高次推論と60–120fps高速追尾の2階層分離' },
      { label: '撮影メリット', line1: '2B–3B規模の視覚世界モデルをカメラ内1.5–2GB RAMで完結', line2: '被写体の意図・行動を0.5秒先読みし決定的瞬間を捕捉' },
      { label: '設計スペック', line1: 'ダイ寸法 9.8×7.6mm / FH23 革新性 88点連動', line2: 'スループット 50〜100 tok/s（オフライン機内完結）' },
    ],
  },
  mirai_fh20_isp_video_chiplet: {
    badge: 'FH20-06',
    fhTag: FH20_TAG,
    zone: 'link',
    title: '成熟5nm/7nm 8K/12K RAW ISP・動画コーデック＆センサーI/Oダイ',
    analogy: '高価な最先端工場に全部詰め込まず、歩留まりの良い成熟プロセスでRAW現像や動画圧縮を安く確実にこなす職人チップ',
    metric: '原価最適化 5nm/7nm分離',
    scaleLabel: 'MATURE-NODE 5nm/7nm ISP + CODEC CHIPLET · 10.2×12.8mm',
    accent: '#0369a1',
    accentSoft: '#e0f2fe',
    art: () => `
      <rect x="88" y="114" width="246" height="176" rx="12" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
      <rect x="104" y="130" width="214" height="62" rx="8" fill="#1e3a8a" stroke="#7dd3fc" stroke-width="1.4"/>
      <text x="211" y="158" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">16-bit RAW ISP ＋ 3層RGB/SPAD現像</text>
      <text x="211" y="176" text-anchor="middle" font-size="8.2" font-weight="700" fill="#bae6fd">SLVS-EC / MIPI C-PHY 120fps 並列受信</text>
      <rect x="104" y="204" width="214" height="66" rx="8" fill="#b45309" stroke="#fcd34d" stroke-width="1.4"/>
      <text x="211" y="232" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">8K/12K ProRes・Neural Physics RAW</text>
      <text x="211" y="252" text-anchor="middle" font-size="8.2" font-weight="700" fill="#fef3c7">ハードウェア専用圧縮エンジン（低消費電力）</text>
      ${miraiKpi(354, 114, 328, 84, 'チップレット経済学', '成熟ノード分離でウェーハ歩留まり劇増', 'アナログI/Oは微細化しても縮小しないため5/7nmが最適解', '#0369a1')}
      ${miraiKpi(354, 210, 328, 80, '機種展開の柔軟性', '同一NPU＋ISP組合せで入門〜プロ機共通化', '開発期間・マスク原価を圧縮し30万円台民主化を後押し', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '縮小しにくいアナログI/O・ハード動画圧縮を成熟5/7nmへ分離', line2: 'UCIe 2.0ブリッジ経由で2nm NPUダイと超低遅延直結' },
      { label: '撮影メリット', line1: '120fpsフルサイズRAW・8K/12K動画処理を省電力で持続', line2: '歩留まり向上により次世代1,000 TOPS SoCの価格高騰を抑制' },
      { label: '設計スペック', line1: 'ダイ寸法 10.2×12.8mm / 16-bitパイプライン', line2: 'FH01 SPAD・FH02 3層RGB両センサーの共通受信対応' },
    ],
  },
  mirai_fh20_pqc_puf_enclave: {
    badge: 'FH20-07',
    fhTag: FH20_TAG,
    zone: 'link',
    title: 'FH39連動：耐量子暗号（ML-DSA）＋PUF物理複製不能エンクレーブ',
    analogy: '量子コンピュータでも破れない署名と、工場でも二度と同じものが作れない半導体の「指紋鍵」を閉じ込めた金庫チップ',
    metric: '革新性 88/100 · 無償標準',
    scaleLabel: 'FH39 PQC (ML-DSA) + PUF HARDWARE ROOT OF TRUST',
    accent: '#059669',
    accentSoft: '#d1fae5',
    art: () => `
      <rect x="92" y="114" width="234" height="176" rx="14" fill="#064e3b" stroke="#f59e0b" stroke-width="3"/>
      <rect x="112" y="134" width="194" height="136" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
      <text x="209" y="168" text-anchor="middle" font-size="11" font-weight="900" fill="#34d399">PUF 物理複製不能鍵</text>
      <text x="209" y="188" text-anchor="middle" font-size="8.6" font-weight="700" fill="#cbd5e1">ナノ単位トランジスタ個体差から生成</text>
      <line x1="132" y1="204" x2="286" y2="204" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="209" y="226" text-anchor="middle" font-size="10.5" font-weight="900" fill="#fbbf24">NIST標準 ML-DSA（耐量子署名）</text>
      <text x="209" y="246" text-anchor="middle" font-size="8.4" font-weight="700" fill="#a7f3d0">静止画＆動画 ms級オンダイ C2PA 2.x署名</text>
      ${miraiKpi(346, 114, 336, 84, 'ディープフェイク時代の盾', '0.2〜1.0 mm² 極小回路で全機種標準', 'センサー直結3D深度検証＋オープンC2PA 2.xを無償実装', '#059669')}
      ${miraiKpi(346, 210, 336, 80, '物理タンパー耐性', '金ファラデー保護メッシュ外周封止', 'プローブ解読を試みると即座に揮発鍵をゼロ化防御', '#d97706')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '製造ばらつき由来のPUF秘密鍵＋NIST ML-DSA耐量子暗号エンジン', line2: '撮像直後の生データ＋像面3D深度ハッシュへms級ハード署名' },
      { label: '撮影メリット', line1: '生成AI偽造やモニター再撮影詐欺をオープンC2PA 2.xで即検証', line2: '有償限定だった真正性証明を入門機から動画まで無償標準化' },
      { label: '設計スペック', line1: 'FH39 革新性 88/100点 / 署名遅延 < 2 ms', line2: '金アンチタンパー遮蔽枠＋ゼロ化保護回路内蔵' },
    ],
  },
  mirai_fh20_hbm_memory_stack_a: {
    badge: 'FH20-08',
    fhTag: FH20_TAG,
    zone: 'link',
    title: '広帯域 4段積層 LPDDR6 / HBM メモリキューブ（Bank A）',
    analogy: 'メモリを4階建てのマンションのように縦積みし、数千本の極小エレベーター（TSV）でAIへ超高速にデータを渡す記憶塔',
    metric: '広帯域 120–256 GB/s+',
    scaleLabel: '4-HIGH STACKED LPDDR6 / HBM CUBE (BANK A) · TSV',
    accent: '#2563eb',
    accentSoft: '#dbeafe',
    art: () => `
      ${[0, 1, 2, 3].map((i) => `
        <rect x="92" y="${116 + i * 32}" width="234" height="22" rx="4" fill="${i % 2 === 0 ? '#1d4ed8' : '#1e40af'}" stroke="#93c5fd" stroke-width="1.4"/>
        <text x="209" y="${131 + i * 32}" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ffffff">DRAM層 #${4 - i}（極薄30μm Si ＋ TSV貫通ビア）</text>
        <rect x="108" y="${138 + i * 32}" width="202" height="6" rx="2" fill="#f59e0b"/>
      `).join('')}
      <rect x="86" y="246" width="246" height="36" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8"/>
      <text x="209" y="268" text-anchor="middle" font-size="9.4" font-weight="900" fill="#38bdf8">ベースロジック・広帯域I/Oバッファダイ</text>
      ${miraiKpi(352, 116, 330, 82, 'AIメモリ帯域ボトルネック解消', '1.58-bit VWM 50〜100 tok/s 維持', '2B–3Bモデルの重み読出しと120fps RAWを同時並列供給', '#2563eb')}
      ${miraiKpi(352, 210, 330, 74, '超短距離 2.5D パッケージ統合', '基板外配線比 消費電力 −45%', '信号長を数cm→数mmへ短縮し高速連写時の電池消費を抑制', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '4枚の薄化DRAMウェーハをTSV（貫通シリコンビア）で垂直結合', line2: '1,024-bit級の超並列インターフェースをインターポーザ上に直結' },
      { label: '撮影メリット', line1: '0.5秒予知リングバッファ＋120fps RAW連写の詰まりを根絶', line2: 'AI視覚世界モデルのトークン生成遅延を劇的に短縮' },
      { label: '設計スペック', line1: 'Bank A 11.4×6.8mm / 4段積層＋ベースロジックダイ', line2: '帯域幅 120〜256 GB/s級（Bank A+B デュアルチャネル）' },
    ],
  },
  mirai_fh20_hbm_memory_stack_b: {
    badge: 'FH20-09',
    fhTag: FH20_TAG,
    zone: 'link',
    title: '広帯域 4段積層 LPDDR6 / HBM メモリキューブ（Bank B）',
    analogy: 'Bank Aと対を成すもう1基の4階建て記憶塔。ISP動画ストリームとAI世界モデルの帯域を左右に振り分け渋滞ゼロにします',
    metric: 'デュアル対称チャネル構成',
    scaleLabel: '4-HIGH STACKED LPDDR6 / HBM CUBE (BANK B) · DUAL-CH',
    accent: '#1d4ed8',
    accentSoft: '#dbeafe',
    art: () => `
      <rect x="86" y="122" width="112" height="148" rx="10" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.8"/>
      <text x="142" y="182" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">Bank A</text>
      <text x="142" y="200" text-anchor="middle" font-size="8" font-weight="700" fill="#bfdbfe">NPU / VWM 優先</text>
      <rect x="220" y="122" width="112" height="148" rx="10" fill="#0369a1" stroke="#38bdf8" stroke-width="2.2"/>
      <text x="276" y="182" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">Bank B (本パーツ)</text>
      <text x="276" y="200" text-anchor="middle" font-size="8" font-weight="700" fill="#bae6fd">8K/12K ISP・リングBUF</text>
      <line x1="198" y1="196" x2="220" y2="196" stroke="#f59e0b" stroke-width="4"/>
      ${miraiKpi(352, 122, 330, 74, 'QoS 帯域アイソレーション', 'ISP録画とAI推論の帯域干渉ゼロ', '120fps撮影中にAIが走ってもフレームドロップを起こさない', '#1d4ed8')}
      ${miraiKpi(352, 208, 330, 74, '熱対称レイアウト', '発熱源をパッケージ左右へ均等分散', '局所過熱を防ぎIHS全体で効率的に排熱', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'Bank Aと対称配置された独立チャネル4段積層DRAMスタック', line2: 'ISP側直近へ配置しRAWフレームバッファの転送距離を最短化' },
      { label: '撮影メリット', line1: '8K/12K長時間収録とリアルタイム被写体認識の完全無干渉両立', line2: '左右均等な熱分布により高負荷時の安定性を最大化' },
      { label: '設計スペック', line1: 'Bank B 11.4×6.8mm / ECCエラー訂正内蔵', line2: '独立デュアルチャネルQoS調停対応' },
    ],
  },
  mirai_fh20_ucie_silicon_bridges: {
    badge: 'FH20-10',
    fhTag: FH20_TAG,
    zone: 'link',
    title: 'UCIe 2.0 超高密度ローカル・シリコン・ブリッジ（LSI/EMIB級 ×6）',
    analogy: 'バラバラの小さなチップ同士を髪の毛の100分の1の細さの配線で結び、まるで1枚の巨大チップのように会話させる光の橋',
    metric: '< 0.5 pJ/bit · 2 Tbps/mm',
    scaleLabel: 'UCIE 2.0 LOCAL SILICON INTERCONNECT BRIDGES ×6',
    accent: '#d97706',
    accentSoft: '#fef3c7',
    art: (p) => `
      <rect x="86" y="118" width="114" height="72" rx="8" fill="#1e3a8a" stroke="#38bdf8" stroke-width="1.8"/>
      <text x="143" y="158" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">2nm GAA NPU</text>
      <rect x="220" y="118" width="114" height="72" rx="8" fill="#0369a1" stroke="#7dd3fc" stroke-width="1.8"/>
      <text x="277" y="158" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">5nm ISP/Codec</text>
      <rect x="164" y="196" width="92" height="32" rx="5" fill="url(#${p}_cu)" stroke="#f59e0b" stroke-width="2"/>
      <text x="210" y="216" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">UCIe 2.0 Siブリッジ</text>
      <path d="M 180 190 L 180 196 M 240 190 L 240 196" stroke="#f59e0b" stroke-width="4"/>
      <rect x="86" y="236" width="248" height="44" rx="6" fill="#0f172a" stroke="#475569" stroke-width="1.4"/>
      <text x="210" y="262" text-anchor="middle" font-size="8.8" font-weight="800" fill="#cbd5e1">有機RDLインターポーザ内 埋込シリコン橋 ×6箇所</text>
      ${miraiKpi(352, 118, 330, 76, '超低電力ダイ間通信', '< 0.5 pJ/bit（従来基板配線の1/10）', 'チップレット分割の通信オーバーヘッドをほぼゼロ化', '#d97706')}
      ${miraiKpi(352, 206, 330, 74, 'オープン規格 UCIe 2.0', '異社・異ノードチップの自在な結合', 'カメラメーカー独自ISP＋最先端AI NPUの最適組合せを実現', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'ダイ境界直下へ超微細ピッチ（<2μm）銅配線シリコン橋を埋込', line2: '大型高価な全面シリコンインターポーザ無しで超高密度配線' },
      { label: '撮影メリット', line1: 'RAWデータとAI推論結果のチップ間往復遅延を数ナノ秒へ圧縮', line2: '大型単一ダイ比でパッケージ製造原価を大幅低減' },
      { label: '設計スペック', line1: '6箇所ブリッジ配置 / 配線密度 > 1,000 本/mm', line2: 'UCIe 2.0 標準プロトコル準拠・ビット誤り率 < 10⁻¹⁵' },
    ],
  },
  mirai_fh20_optical_io_chiplet: {
    badge: 'FH20-11',
    fhTag: FH20_TAG,
    zone: 'optic',
    title: 'FH21連動：MicroLED並列光リンク／SiPh 光I/O＆8芯ガラス導波路',
    analogy: '銅線では熱くなりすぎる超高速データを、8本の極細ガラス光ファイバーへ乗せてノイズゼロで飛ばす未来の光高速道路',
    metric: '100+ Gbps 並列光I/O',
    scaleLabel: 'FH21 MICROLED / SIPH OPTICAL I/O + 8-FIBER RIBBON',
    accent: '#0891b2',
    accentSoft: '#cffafe',
    art: () => `
      <rect x="86" y="132" width="114" height="128" rx="10" fill="#164e63" stroke="#06b6d4" stroke-width="2"/>
      <text x="143" y="186" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">MicroLED / SiPh</text>
      <text x="143" y="206" text-anchor="middle" font-size="8.2" font-weight="700" fill="#a5f3fc">光トランシーバダイ</text>
      <rect x="200" y="152" width="26" height="88" rx="4" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<line x1="226" y1="${160 + i * 10}" x2="344" y2="${160 + i * 10}" stroke="#06b6d4" stroke-width="2.6"/>`).join('')}
      <text x="285" y="264" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0e7490">8芯 並列ガラス光導波路リボン</text>
      ${miraiKpi(360, 118, 322, 78, '銅線の限界を超える光配線', 'EMI電波ノイズ 0 · 損失極小', 'センサー〜SoC・分離シネマヘッド間を100Gbps超で無損失伝送', '#0891b2')}
      ${miraiKpi(360, 208, 322, 76, 'FH21 実用化ロードマップ', '短距離=MicroLED / 分離=SiPh CPO', '熱・レーザーコストを抑えたカメラ最適解の段階導入', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '機内超短距離は低消費電力MicroLED並列光、長距離はSiPh CPO', line2: 'MT光学フェルールで8本の石英導波路を一括着脱結合' },
      { label: '撮影メリット', line1: '高画素120fps生データの高速伝送でもRF/音声回路へノイズ混入ゼロ', line2: '分離カメラヘッド・外部8K/12Kレコーダーへの光直結に対応' },
      { label: '設計スペック', line1: '8レーン並列光リボン / 伝送効率 < 1.5 pJ/bit', line2: 'ダイ寸法 8.2×9.0mm ＋ MTマイクロフェルール' },
    ],
  },
  mirai_fh20_cowos_interposer: {
    badge: 'FH20-12',
    fhTag: FH20_TAG,
    zone: 'link',
    title: '2.5D 大判有機RDL／CoWoS-L 再配線インターポーザ基板',
    analogy: '6つのチップとメモリと光I/Oを1枚の舞台へ載せ、ミクロン幅の多層銅配線で寸分の狂いなく繋ぎ合わせる精密ステージ',
    metric: '34.6×34.6mm · 2.5D統合',
    scaleLabel: '2.5D COWOS-L ORGANIC RDL INTERPOSER · 34.6mm SQ',
    accent: '#1d4ed8',
    accentSoft: '#dbeafe',
    art: () => `
      <rect x="88" y="114" width="244" height="176" rx="12" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2.2"/>
      <rect x="102" y="128" width="216" height="148" rx="8" fill="none" stroke="#d97706" stroke-width="2.5" stroke-dasharray="6 3"/>
      <text x="210" y="190" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">CoWoS-L 再配線層（RDL）</text>
      <text x="210" y="212" text-anchor="middle" font-size="8.6" font-weight="700" fill="#bfdbfe">6チップレット＋6 LSIブリッジ一括実装舞台</text>
      ${miraiKpi(352, 114, 330, 82, '全面Si比の劇的低コスト', '有機RDL＋局所Siブリッジ混合', 'レチクル限界を超える大面積を安価・高歩留まりに量産', '#1d4ed8')}
      ${miraiKpi(352, 208, 330, 82, 'サブミクロン配線平坦度', 'L/S = 1.5 / 1.5 μm 多層再配線', '高速差動信号のインピーダンスとスキューを完全整合', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '有機再配線層（RDL）内部へLSIブリッジをモールド一体成形', line2: '全チップ間の高速データ線とBSPDN大電流電源網を同時配線' },
      { label: '撮影メリット', line1: 'カメラの小型メイン基板面積へデスクトップ級AI演算を凝縮', line2: 'モジュール構成変更が容易で世代進化サイクルを短縮' },
      { label: '設計スペック', line1: '外形 34.6×34.6mm / 厚さ 0.46mm 2.5D層', line2: 'CoWoS-L / EMIB-RDL クラス量産パッケージ' },
    ],
  },
  mirai_fh20_microbump_tsv_array: {
    badge: 'FH20-13',
    fhTag: FH20_TAG,
    zone: 'link',
    title: '微細ピッチ C4銅ピラーマイクロバンプ＆TSV接合層（196代表列）',
    analogy: 'インターポーザと基板の間を無数の極小の銅の柱で繋ぎ、大電流と超高速信号を一切の抵抗ロスなく通す金属の剣山',
    metric: '低抵抗 Cuピラー C4接合',
    scaleLabel: 'FINE-PITCH C4 COPPER MICRO-PILLAR ARRAY',
    accent: '#c26d38',
    accentSoft: '#ffedd5',
    art: (p) => `
      <rect x="86" y="128" width="248" height="28" rx="5" fill="#1e3a8a"/>
      <text x="210" y="146" text-anchor="middle" font-size="8.8" font-weight="800" fill="#ffffff">2.5D CoWoS-L インターポーザ</text>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `
        <rect x="${98 + i * 24}" y="160" width="12" height="58" rx="3" fill="url(#${p}_cu)" stroke="#9a3412" stroke-width="1"/>
        <circle cx="${104 + i * 24}" cy="222" r="6" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>
      `).join('')}
      <rect x="86" y="232" width="248" height="32" rx="5" fill="#065f46"/>
      <text x="210" y="252" text-anchor="middle" font-size="8.8" font-weight="800" fill="#ffffff">16層 ABF 高密度有機基板</text>
      ${miraiKpi(354, 124, 328, 74, 'エレクトロマイグレーション耐性', '純銅ピラー構造で高電流密度対応', 'BSPDN大電流給電時のバンプ劣化・破断を防止', '#c26d38')}
      ${miraiKpi(354, 210, 328, 74, '低寄生インダクタンス', '極短高さ 0.36mm ピラー配列', '高周波電源ノイズ（di/dt）を極小化', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'はんだ球ではなく剛性の高い純銅ピラー＋SnAgキャップで微細接合', line2: 'アンダーフィル樹脂充填で熱膨張差ストレスを均等吸収' },
      { label: '撮影メリット', line1: '極寒〜炎天下の激しい温度サイクルでも接合クラックゼロ', line2: 'InstancedMesh 1ドローコールで196本を高精細描画' },
      { label: '設計スペック', line1: '14×14代表配列（実機数万C4ピラー構造を象徴造形）', line2: '接合抵抗 < 2 mΩ/bump' },
    ],
  },
  mirai_fh20_abf_organic_substrate: {
    badge: 'FH20-14',
    fhTag: FH20_TAG,
    zone: 'pkg',
    title: '16層ビルドアップ ABF（味の素ビルドアップフィルム）有機基板',
    analogy: '日本の素材技術が生んだ超平滑絶縁フィルムを16層も重ね、チップの電源と信号を外のカメラ基板へ綺麗に広げる土台です',
    metric: '16層 ABF · 42×42mm',
    scaleLabel: '16-LAYER BUILD-UP ABF ORGANIC SUBSTRATE · 42mm SQ',
    accent: '#065f46',
    accentSoft: '#d1fae5',
    art: () => `
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="88" y="${124 + i * 16}" width="244" height="10" rx="2" fill="${i % 2 === 0 ? '#059669' : '#d97706'}"/>`).join('')}
      <rect x="86" y="206" width="248" height="24" rx="4" fill="#92400e" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="210" y="222" text-anchor="middle" font-size="8.8" font-weight="900" fill="#fef3c7">低CTE ガラスコア層（熱反り抑制）</text>
      ${[0, 1, 2].map((i) => `<rect x="88" y="${234 + i * 16}" width="244" height="10" rx="2" fill="${i % 2 === 0 ? '#059669' : '#d97706'}"/>`).join('')}
      ${miraiKpi(352, 122, 330, 78, '低誘電損失 ABF絶縁膜', 'Df < 0.004 · レーザー微細ビア対応', 'PCIe 5.0/6.0・120fpsセンサー高速差動線を低損失ファンアウト', '#065f46')}
      ${miraiKpi(352, 212, 330, 74, '大電流銅プレーン内蔵', 'BSPDN給電の低インピーダンス母線', '外周48個MLCCへ最短距離で直結', '#d97706')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '極平滑ABF絶縁樹脂とレーザー穴あけマイクロビアの16層積層', line2: '中央の低熱膨張コアが42mm大判パッケージの反りを抑制' },
      { label: '撮影メリット', line1: '高速インターフェース信号の劣化を防ぎ安定した連写・動画記録', line2: '電源ノイズを抑え高感度撮像時の横縞ノイズ混入を遮断' },
      { label: '設計スペック', line1: '外形 42.0×42.0mm / 総厚 1.12mm（16層ビルドアップ）', line2: 'Pin-1金三角位置決めマーキング付' },
    ],
  },
  mirai_fh20_mlcc_decoupling_ring: {
    badge: 'FH20-15',
    fhTag: FH20_TAG,
    zone: 'pkg',
    title: '周辺48個 0201超小型積層セラミックコンデンサ（MLCC）配列',
    analogy: 'AIチップが100万分の1秒だけ急に大電気を欲しがった時、間髪入れず横から電気を注ぎ込む48個の極小ダムです',
    metric: '48× 0201 低ESL MLCC',
    scaleLabel: '48× PERIMETER 0201 HIGH-DI/DT MLCC DECOUPLING RING',
    accent: '#b45309',
    accentSoft: '#fef3c7',
    art: () => `
      <rect x="96" y="118" width="224" height="164" rx="12" fill="#065f46" stroke="#10b981" stroke-width="1.8"/>
      <rect x="132" y="150" width="152" height="100" rx="8" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="208" y="204" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">2.5D チップレット群</text>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `
        <rect x="${112 + i * 24}" y="128" width="14" height="8" rx="1.5" fill="#d97706" stroke="#fde68a" stroke-width="0.8"/>
        <rect x="${112 + i * 24}" y="264" width="14" height="8" rx="1.5" fill="#d97706" stroke="#fde68a" stroke-width="0.8"/>
      `).join('')}
      ${miraiKpi(342, 118, 340, 78, '瞬間大電流（di/dt）吸収', '超低ESL < 60 pH · GHz帯ノイズ除去', '1,000 TOPS NPU起動時の瞬間電圧ディップをゼロ化', '#b45309')}
      ${miraiKpi(342, 208, 340, 76, '高効率1ドローコール描画', '48個全量を単一InstancedMesh化', '4辺対称リング配置でBSPDN裏面電源と協調安定化', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'チタン酸バリウム強誘電体とニッケル電極を数百層積層した極小容量', line2: 'ダイ至近4辺配置によりループインダクタンスを極限削減' },
      { label: '撮影メリット', line1: 'シャッター半押し時のAI急起動でも電源電圧揺らぎゼロ', line2: '高周波スイッチングノイズの撮像センサー側への漏れを防止' },
      { label: '設計スペック', line1: '0201極小サイズ 48個 / 温度特性 X6S（−55〜+105℃）', line2: 'BSPDN電源網と直結する局所デカップリング層' },
    ],
  },
  mirai_fh20_stiffener_ring: {
    badge: 'FH20-16',
    fhTag: FH20_TAG,
    zone: 'pkg',
    title: '反り防止 CNCステンレス補強スティフナーフレーム',
    analogy: '薄い基板が熱で反ってしまわないよう、外周を硬いステンレスの額縁でガッチリ挟み込む精密補強枠です',
    metric: '熱反り < 25 μm 厳守',
    scaleLabel: 'CNC STAINLESS ANTI-WARPAGE STIFFENER · 41.6mm SQ',
    accent: '#64748b',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <rect x="92" y="116" width="232" height="168" rx="14" fill="url(#${p}_si)" stroke="#475569" stroke-width="2.4"/>
      <rect x="122" y="142" width="172" height="116" rx="8" fill="#ffffff" stroke="#0f766e" stroke-width="1.8"/>
      <text x="208" y="196" text-anchor="middle" font-size="10" font-weight="900" fill="#0f172a">35.6×35.6mm 中央開口</text>
      <text x="208" y="214" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">CoWoS-Lインターポーザ完全収容</text>
      ${miraiKpi(344, 118, 338, 78, 'リフロー＆運用時反り抑制', '平面度誤差 < 25 μm（全温度帯）', '256球BGAのはんだクラックとIHS接触不良を防止', '#475569')}
      ${miraiKpi(344, 208, 338, 76, '機械的実装保護', '冷却ユニット加圧を全周均等分散', '極薄シリコンダイへ過剰な局所応力が掛かるのを防ぐ', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '高剛性SUS304一体CNC枠をABF外周へ構造接着', line2: 'シリコンと有機基板の熱膨張率差（CTEミスマッチ）を拘束' },
      { label: '撮影メリット', line1: '寒冷地ロケと真夏8K連続収録を繰り返してもはんだ疲労ゼロ', line2: 'IHS蓋との精密高さ基準を規定し冷却効率を維持' },
      { label: '設計スペック', line1: '外形 41.6×41.6mm / 内開口 35.6×35.6mm / 厚 0.85mm', line2: '非磁性オーステナイト系SUS精密研削品' },
    ],
  },
  mirai_fh20_bga_solder_array: {
    badge: 'FH20-17',
    fhTag: FH20_TAG,
    zone: 'pkg',
    title: '底面 256球 無鉛SAC305 BGA はんだボールグリッドアレイ',
    analogy: 'チップ全体の裏側に綺麗に並んだ256個の小さな銀色の玉が、カメラのメイン基板と電源・信号・熱を一気に結びます',
    metric: '16×16 SAC305 鉛フリー',
    scaleLabel: '256-BALL LEAD-FREE SAC305 BGA ARRAY · 37.5mm SPAN',
    accent: '#64748b',
    accentSoft: '#f1f5f9',
    art: () => `
      <rect x="92" y="114" width="232" height="176" rx="12" fill="#064e3b" stroke="#10b981" stroke-width="1.8"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map((r) => [0, 1, 2, 3, 4, 5, 6, 7].map((c) => `<circle cx="${118 + c * 26}" cy="${134 + r * 20}" r="5.5" fill="#e2e8f0" stroke="#64748b" stroke-width="1"/>`).join('')).join('')}
      ${miraiKpi(344, 118, 338, 78, '中央サーマル＆GNDクラスタ', '電源・GNDを中央へ高密度集約', '大電流を最短経路でBSPDNへ供給しつつ底面放熱も確保', '#475569')}
      ${miraiKpi(344, 208, 338, 76, '高速差動ペアシールド配置', '外周列にPCIe 5.0 / USB4 / MIPI配置', '各差動ペアをGNDボールで挟みクロストークを遮断', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'Sn-3.0Ag-0.5Cu無鉛はんだ球による自己整合リフロー面実装', line2: '中央電源/GNDクラスタ＋外周高速差動線の最適ボールマップ' },
      { label: '撮影メリット', line1: 'カメラ落下衝撃にも耐える高信頼パッケージ実装', line2: '高速CFexpress 5.0・240Hz EVF出力を低ノイズで伝送' },
      { label: '設計スペック', line1: '16×16 = 256球代表配列（InstancedMesh 1dc統合）', line2: 'RoHS準拠 SAC305 / 球径 0.92 mm' },
    ],
  },
  mirai_fh20_vapor_coldplate_base: {
    badge: 'FH20-18',
    fhTag: FH20_TAG,
    zone: 'cool',
    title: 'カメラ側インターフェース：FH32 MEMS空冷直結 銅ヒートパイプ橋',
    analogy: '頭脳チップの5〜8Wの熱を2本の平たい純銅パイプで素早く運び出し、隣のFH32超音波MEMS空冷へ手渡す専用放熱橋です',
    metric: '5〜8W → FH32 直結排熱',
    scaleLabel: 'PURE-COPPER VAPOR COLDPLATE + DUAL HEAT-PIPE BRIDGE',
    accent: '#ea580c',
    accentSoft: '#ffedd5',
    art: (p) => `
      <rect x="156" y="124" width="166" height="150" rx="14" fill="url(#${p}_cu)" stroke="#c2410c" stroke-width="2.2"/>
      <rect x="176" y="144" width="126" height="110" rx="8" fill="#fda4af" stroke="#e11d48" stroke-width="1.5"/>
      <text x="239" y="196" text-anchor="middle" font-size="9.5" font-weight="900" fill="#881337">高熱伝導TIMパッド</text>
      <text x="239" y="214" text-anchor="middle" font-size="8.2" font-weight="700" fill="#9f1239">SoC 5〜8W 受熱面</text>
      <rect x="78" y="152" width="84" height="24" rx="6" fill="#d97706" stroke="#92400e" stroke-width="1.6"/>
      <rect x="78" y="218" width="84" height="24" rx="6" fill="#d97706" stroke="#92400e" stroke-width="1.6"/>
      <text x="116" y="202" text-anchor="middle" font-size="8.2" font-weight="900" fill="#c2410c">→ FH32 MEMS空冷</text>
      ${miraiKpi(344, 122, 338, 78, '熱収支システム統合', 'SoC 5–8W ＋ センサー → 計10–15W枠', 'FH32水密空冷との直結で炎天下8K連続収録でも熱停止ゼロ', '#ea580c')}
      ${miraiKpi(344, 212, 338, 74, 'C1100 純銅＋4点ばね座', 'k ≈ 398 W/m·K · 均等面圧締結', '落下・振動でもTIM密着圧力を一定に維持', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '純銅コールドプレート＋2本扁平ヒートパイプで相変化熱輸送', line2: '4隅チタンばね座でSoCパッケージへ均等な最適面圧を印加' },
      { label: '撮影メリット', line1: '1,000 TOPS AI＋8K/12K動画を時間無制限で安定稼働', line2: 'FH20（頭脳）とFH32（肺）を繋ぐ2028年熱設計の架け橋' },
      { label: '設計スペック', line1: '受熱板 43.6×43.6mm / デュアル扁平銅パイプ幅 4.4mm×2', line2: 'ピンク高柔軟TIMパッド（0.42mm）付属' },
    ],
  },
};

export function renderFh20HdSchematicSvg(type: PartExplanation['diagramType']): string | null {
  const spec = FH20_SPECS[type];
  return spec ? renderMiraiMonographSvg(spec) : null;
}
