import { PartExplanation } from '../types';

/**
 * Phase 28B — BIONZ XR / BIONZ XR2 V2 Ultra-Microscopic 2nm GAA / A16 BSPDN & 2026 Silicon Core
 * Explanations (30 Parts: X2-01 – X2-30).
 * Zooms 100,000x deeper inside the silicon transistor & 2026 advanced packaging core of Sony's BIONZ XR2
 * (α7 V Dec 2025, α7R VI June 2026, FX5 2026) and 2026 sub-2nm semiconductor frontiers:
 * TSMC N2 / A16 Super Power Rail (VLSI 2026 Paper T1.5), Intel 18A PowerVia/RibbonFET/CFET (VLSI 2026),
 * Samsung SF2 / BEOL Metal Temp Sensor (ISSCC 2026), SK Hynix & Samsung 1c LPDDR6 14.4Gb/s (ISSCC 2026
 * Paper 15.7/37.3), MediaTek xBIT 10T Logic-Based SRAM (ISSCC 2026), TSMC CoWoS-L Active LSI & SoIC,
 * Borosilicate Glass Core TGV, CEA-Leti / NVIDIA Electro-Optical CPO (ISSCC 2026), and Sony C2PA / AI-AWB / IBIS.
 * Written in ultra-clear, jargon-free Japanese with vivid everyday analogies for complete beginners!
 */
export const BIONZ_V2_EXPLANATIONS: Record<string, PartExplanation> = {
  'xv2-soic-hybrid-bond-3d': {
    title: 'X2-01. TSMC SoIC 3Dチップ積層「サブ10μmピッチ Cu-Cu直接ハイブリッドボンディング微細界面」',
    subtitle: 'TSMC SoIC 3D Chip-Stacking Sub-10um Pitch Direct Cu-Cu Hybrid Bonding Interface (2026 Volume)',
    category: 'BIONZ XR 極超解剖図 V2 X2-01 — 2つの頭脳チップを「はんだゼロ・銅原子どうし直結」で1つに合体させる2026年3D合体技',
    plainAnalogy:
      'これまで複数のチップを繋ぐときは、小さな「はんだの粒」を挟んで溶かしていましたが、はんだの粒は大きすぎて本数を増やせず、電気もそこで詰まって熱が出ていました。2026年量産のTSMC SoIC 3Dハイブリッド接合は、はんだを一切使わず、0.01ミリ未満の極小銅パッド同士を鏡面に磨いて直接くっつけます！2枚のチップが外から見ても電気的にも「たった1枚の巨大チップ」のように一体化する夢の3D合体技術です！',
    summary:
      'TSMCのフロントエンド3D積層技術「SoIC（System on Integrated Chips）」によるサブ10 μmピッチのウェハー対ウェハー／チップ対ウェハー直接Cu-Cuハイブリッドボンディング界面。キャッシュSRAMやAIアクセラレータをBIONZ演算コアの真上へ縦積みし、配線遅延と電力を桁違いに削減します。',
    opticsAndPhysics: [
      '従来のマイクロバンプ（ピッチ 25〜40 μm）に比べて接続密度が10〜100倍以上（1 mm²あたり数万〜数十万本）へ跳ね上がり、上下チップ間を1ビットあたりわずか数十分の1ピコジュールという超省エネでデータが駆け抜けます。',
      'ISOクラス1〜2の究極のクリーンルームで、100 nm未満の位置合わせ精度（オーバーレイ）で絶縁膜（SiO₂/SiCN）同士を常温接着した後、熱アニールで銅パッド同士を結晶融合させます。',
      '2025–2026年には3 nm / N2クラスのロジック同士や大容量L3 SRAMキャッシュの3D積層が量産フェーズへ入り、α7R VI級の66.8MP 30fps処理やAI認識で巨大メモリをチップ直上へ抱え込む次世代基盤となっています。',
    ],
    formula: {
      expression: 'バンプ高さ: 25 μm → 0 μm（直接Cu-Cu） ⇒  接合容量・抵抗を 1/10 以下・帯域密度 10〜100倍！',
      description: 'はんだの粒をゼロにして銅同士を直接つなぐことで、上下のチップが1つの脳のように遅延ゼロで会話できる',
    },
    nextGenInnovation:
      '2026年のTSMC技術シンポジウムでは、N2同士のSoICからさらに次世代A14同士のSoIC（I/O密度1.8倍）へのロードマップが示され、カメラ用SoCでも「ISP＋AI NPU＋超大容量3Dキャッシュ」の一体化が進みます。',
    specs: [
      { label: '積層技術', value: 'TSMC SoIC（フロントエンド3D直接Cu-Cuハイブリッド接合）' },
      { label: 'バンプピッチ', value: 'サブ 10 μm（9 μm → 6 μm → 4.5 μm 世代微細化）' },
      { label: '位置合わせ精度', value: '< 100 nm（ISO Class 1–2 無塵クリーン環境）' },
      { label: '効果', value: 'ダイ間I/O電力 1/10以下・超低遅延3Dキャッシュ直結' },
    ],
    diagramType: 'xv2_soic_hybrid_bond_3d',
  },

  'xv2-cowos-l-active-lsi': {
    title: 'X2-02. CoWoS-L ＆ ISSCC 2026「能動シリコンブリッジ（Active LSI）内蔵リピータ＆UCIe-S配線」',
    subtitle: 'CoWoS-L Active Local Silicon Interconnect (Active LSI) Bridge with Embedded Repeaters (ISSCC 2026)',
    category: 'BIONZ XR 極超解剖図 V2 X2-02 — チップ同士をつなぐ極小シリコンの橋の中に「信号ブースター」まで埋め込んだ2026年の高速道路',
    plainAnalogy:
      '1枚の巨大なチップを作るのは高すぎて不良も増えるため、2026年の最先端頭脳は「画像処理チップ」と「AIチップ」などを小さく分けて作り、小さなシリコンの橋（LSIブリッジ）で横につなぎます（CoWoS-L）。さらにISSCC 2026で注目された「Active LSI」は、ただの電線の橋ではなく、橋の中に電気信号を元気よく増幅する「中継ブースター回路（リピータ）」まで内蔵！離れていても毎秒何テラバイトものデータを劣化ゼロで運べます！',
    summary:
      '2026年量産拡大中の2.5Dパッケージ「CoWoS-L（有機RDL＋局所シリコンブリッジLSI）」およびISSCC 2026発表の「TSMC Active LSI（能動回路内蔵シリコンブリッジ）」。標準規格UCIe-Sで複数チップレットを毎秒数TB級の超広帯域で結びます。',
    opticsAndPhysics: [
      'チップ全面の下に巨大なシリコン板を敷く従来のCoWoS-Sと違い、CoWoS-Lは「チップ同士が会話する境界の真下だけ」に超微細な局所シリコンブリッジ（LSI）を埋め込み、残りを低コスト・低反りの有機再配線層（RDL）で構成します。',
      '配線幅／間隔わずか 2 μm / 2 μm の超微細銅配線が何千本も並びますが、距離が伸びると信号が弱まるため、Active LSIではブリッジ用シリコン内部に極小のCMOSリピータ（信号増幅・波形整形器）やデカップリング容量を直接作り込んでいます。',
      'これにより、BIONZ XRのメインISPとコンパニオンAI/コプロセッサを別々の最適プロセス（例：2nm AI＋4nm ISP）で製造しても、まるで1チップ内部の配線と変わらない速度と低消費電力で協調動作できます。',
    ],
    formula: {
      expression: '配線密度: 2/2 μm RDL × 複数層 ＋ 内蔵Activeリピータ ⇒ 帯域密度 > 1〜2 Tbps/mm（UCIe-S）',
      description: '髪の毛の40分の1の極細配線を束ねて途中に増幅器を置くことで、別チップ間でも1本の脳のように超高速通信',
    },
    nextGenInnovation:
      '2026年はCoWoS-Lが世界最先端AI/HPCパッケージの主役（月産12〜14万ウェハー規模へ急拡大）となり、Active LSIとUCIe-Sの組み合わせが2026年以降のチップレット設計の標準になっています。',
    specs: [
      { label: 'パッケージ方式', value: 'CoWoS-L ＋ ISSCC 2026 TSMC Active LSI（能動シリコンブリッジ）' },
      { label: 'ブリッジ配線', value: 'L/S = 2 μm / 2 μm 超微細多層銅RDL ＋ 内蔵CMOSリピータ' },
      { label: '標準プロトコル', value: 'UCIe-S（Universal Chiplet Interconnect Express）' },
      { label: '利点', value: '異種プロセスチップレットの超低遅延・低反り・高歩留まり統合' },
    ],
    diagramType: 'xv2_cowos_l_active_lsi',
  },

  'xv2-lpddr6-1c-phy': {
    title: 'X2-03. ISSCC 2026最先端「1c nm LPDDR6（14.4 Gb/s）デュアルサブチャネルPHY＆省電力制御」',
    subtitle: 'ISSCC 2026 1c-Node LPDDR6 (14.4 Gb/s) Dual Sub-Channel High-Speed PHY & Clock-Gating (Paper 15.7/37.3)',
    category: 'BIONZ XR 極超解剖図 V2 X2-03 — 1ピンあたり毎秒144億ビットの超高速通信と、使わない車線を瞬時に眠らせる2026年次世代メモリ玄関',
    plainAnalogy:
      '高画素の8K動画や30コマ/秒RAW連写では、頭脳とメモリの間で毎秒何百ギガバイトもの写真が猛スピードで往復します。2026年のISSCCでSamsungとSK Hynixが発表した次世代メモリ「LPDDR6」と2nm用PHYは、LPDDR5Xより一気に35%速い14.4 Gb/sへ進化！しかも道路を2車線（サブチャネル）に分け、普段の撮影時は片方の車線の時計（クロック）をピタッと止める「エコモード」で消費電力を最大半分もカットできるのです！',
    summary:
      'ISSCC 2026（Paper 15.7 SK Hynix 1c LPDDR6 ／ Paper 37.3 Samsung SF2 2nm LPDDR6 PHY）で公開された次世代モバイル・カメラ向け超広帯域メモリインターフェース。14.4 Gb/s/pinの超高速と、非アクティブ補助サブチャネルのクロックゲーティングによる最大50%の劇的省電力を両立します。',
    opticsAndPhysics: [
      '先端1c nm DRAM世代と2nm GAAロジックPHYの組み合わせにより、海岸線（ダイ外周）わずか 2.32 mm・面積 0.695 mm²という極小スペースから、16.6 Gb/s/mm もの圧倒的帯域密度を叩き出します。',
      '通常モード（フル14.4 Gb/s・1.025 V）と高効率モード（単一サブチャネル 12.8 Gb/s・0.97 V）を動的に切り替え、使っていない補助サブチャネルの高速クロック経路を遮断（クロックゲーティング）することで、読み書き電力を最大約50%、待機電力を41%も削減します。',
      'カメラ実戦では、30fpsプリキャプチャ連写や8K RAW収録時だけフルスロットルで全車線を開き、ファインダー構図決め中はエコモードへ瞬時移行することで、α7 V / α7R VI世代以降の驚異的なバッテリー寿命と低発熱を支えます。',
    ],
    formula: {
      expression: '速度 14.4 Gb/s/pin（LPDDR5X比 +35%）＋ 補助チャネル・クロック遮断 ⇒ 電力最大 −50%！',
      description: '超高速と極省エネの2モードを瞬時に切り替え、連写の爆速とバッテリー長持ちを両方叶える2026年メモリ玄関',
    },
    nextGenInnovation:
      'ISSCC 2026で実証されたLPDDR6 14.4 Gb/s PHYは、AI推論の重み読み込みと66.8MP〜100MP級RAWフレームバッファを同時にさばく次世代BIONZの最強パートナーになります。',
    specs: [
      { label: '最新学会出典', value: 'ISSCC 2026 Paper 15.7（SK Hynix 1c）＆ Paper 37.3（Samsung SF2 PHY）' },
      { label: '最大データ速度', value: '14.4 Gb/s/pin（従来LPDDR5X最速比 +35% 高速化）' },
      { label: '省電力機能', value: 'Efficiency Mode ＋ 補助サブチャネル高速クロック遮断（電力−50%）' },
      { label: 'PHY面積・密度', value: '0.695 mm² ／ 海岸線帯域密度 16.6 Gb/s/mm' },
    ],
    diagramType: 'xv2_lpddr6_1c_phy',
  },

  'xv2-glass-core-tgv': {
    title: 'X2-04. 次世代ガラスコアパッケージ基板 ＆ レーザー改質貫通ガラスビア（TGV：Through-Glass Via）',
    subtitle: 'Next-Gen Borosilicate Glass Core Package Substrate & Laser-Modified Hourglass TGV (2026)',
    category: 'BIONZ XR 極超解剖図 V2 X2-04 — チップの土台を樹脂から「超平坦な魔法のガラス板」へ変え、反りゼロ＆超高周波ロス激減を実現',
    plainAnalogy:
      '今のチップパッケージの土台（コア基板）はプラスチック樹脂とガラス繊維でできていますが、熱でわずかに曲がったり（反り）、表面がデコボコしているため極細の配線を引くのに限界が来ています。そこで2026年最先端のパッケージでは、土台の芯をツルツルで超硬い「1枚の特殊ガラス板」に交換！特殊なレーザーでガラスに砂時計型の極小穴（TGV）を何万個も開けて銅を詰めることで、反りゼロ・電波ロス激減の究極の土台が完成します！',
    summary:
      '従来の有機BTレジン／ガラスエポキシコアを置き換える、超平坦ホウケイ酸ガラスコア基板およびレーザー改質エッチング（LIDE）貫通ガラスビア（TGV：Through-Glass Via）。2026年以降の高密度チップレット・高速I/Oパッケージの大本命です。',
    opticsAndPhysics: [
      'ガラスは有機樹脂より圧倒的に平坦（表面粗さが数nm級）で剛性が高く、熱膨張係数（CTE ≈ 3〜4 ppm/K）をシリコン（2.6 ppm/K）にピッタリ近づけて調合できるため、大型パッケージでも高温リフロー時の反りが劇的に減少します。',
      '超短パルスレーザーでガラス内部の結晶結合を局所改質したあと薬液エッチングする（LIDE法）ことで、ひび割れ（マイクロクラック）ゼロの美しい砂時計型貫通穴（TGV、ピッチ 50〜100 μm）を一括形成し、内壁へ銅めっきを施します。',
      'しかもガラスは誘電正接（tan δ）が樹脂より圧倒的に小さいため、数十GHzの超高速信号（PCIe Gen5/6・HDMI 2.1・SLVS-EC）が通っても熱になって消える信号劣化（挿入損失）が激減します。',
    ],
    formula: {
      expression: 'CTE_glass ≈ 3.2 ppm/K ≈ CTE_Si（2.6 ppm/K）  ＆  高周波誘電損失 tan δ ≪ 有機樹脂！',
      description: 'シリコンと同じ伸び縮みをする超平坦ガラスを土台にすることで、歪みも高周波ノイズロスも根こそぎ解消する',
    },
    nextGenInnovation:
      'Intel・TSMC・DNP・イビデン・Absolicsらが2025–2026年にかけてパイロット量産と材料検証を加速させており、将来のカメラ用大型チップレットSoCや光電融合パッケージの土台となります。',
    specs: [
      { label: 'コア母材', value: '低損失・超平坦ホウケイ酸ガラス（CTE整合 3.2 ppm/K）' },
      { label: '貫通ビア構造', value: 'LIDEレーザー改質 砂時計型TGV（直径 20–50 μm / 銅めっき充填）' },
      { label: '配線微細度', value: '有機基板比で平坦度桁違い → L/S 2/2 μm 級微細RDL対応' },
      { label: '高周波メリット', value: '高速SerDes・ミリ波・光電融合（CPO）の信号減衰を大幅削減' },
    ],
    diagramType: 'xv2_glass_core_tgv',
  },

  'xv2-electro-optical-cpo': {
    title: 'X2-05. ISSCC 2026最先端「シリコンフォトニクス光電ルーター＆超高速光インターポーザ（18ns切替）」',
    subtitle: 'ISSCC 2026 Silicon Photonics Electro-Optical Router & MZM/DWDM Optical Interposer (18ns Switch)',
    category: 'BIONZ XR 極超解剖図 V2 X2-05 — 電気の代わりに「ミクロのレーザー光線」でチップ間データを飛ばし、発熱と遅延を吹き飛ばす未来の光配線',
    plainAnalogy:
      '銅線に1秒間何百億回も電気信号を流すと、電線が熱くなってバッテリーを食いつぶし、遠くへ届かなくなります。2026年のISSCCでCEA-LetiやNVIDIA/Broadcomが実証した「光インターポーザ＆光電ルーター」は、チップの土台の中に極細の「光の通り道（シリコン光導波路）」と「小さな光の指輪（マイクロリング共振器）」を彫り込み、電気信号をレーザー光へ変えて18ナノ秒で進路を切り替えながら超省エネでデータを光の速さで運びます！',
    summary:
      'ISSCC 2026で発表されたCEA-Letiの28nm CMOS統合「光電ルーター（光路切替18 ns）」およびNVIDIA/BroadcomのDWDM／MZMコパッケージドオプティクス（CPO）光エンジン構造。電気配線の物理限界（RC遅延と発熱）を光通信で突破する次世代インターコネクトです。',
    opticsAndPhysics: [
      'シリコン（屈折率 n ≈ 3.48）をSiO₂（n ≈ 1.46）で包んだ幅わずか約450 nmの極細光導波路は、赤外レーザー光（1,310 nm Oバンド）を完全に閉じ込めて急カーブでも曲げて運べます。',
      '2本の光路へ分けて片方だけ電圧で屈折率を変える「マッハ・ツェンダー変調器（MZM）」や、特定の色（波長）の光だけをすくい上げる「マイクロリング共振器（DWDM 8波長多重）」により、1本の極細光路で数百Gbps〜数Tbpsを同時に送れます。',
      'ISSCC 2026の発表では、チップレット間を光で結ぶ際にフレーム単位で18ナノ秒という超高速で光の行き先を動的に切り替え、消費電力を数ピコジュール/ビット級へ抑える実用化への大きな一歩が示されました。',
    ],
    formula: {
      expression: 'E_optical ≈ 1〜3.7 pJ/bit  ＆  光路切替 18 ns（銅線の表皮効果・抵抗発熱ゼロ！）',
      description: '電気の代わりに複数色のレーザー光を極細シリコン路へ通すことで、発熱なしで圧倒的なデータ量を瞬時に運ぶ',
    },
    nextGenInnovation:
      '将来の超高画素（400MP〜1000MP級）イメージセンサーと次世代BIONZを結ぶ超高速光バスや、マルチチップレットAIカメラの配線革命を見据えた2026年最先端フォトニクス技術です。',
    specs: [
      { label: '最新学会出典', value: 'ISSCC 2026（CEA-Leti 18ns光電ルーター / NVIDIA DWDM / Broadcom CPO）' },
      { label: '光デバイス要素', value: 'Si光導波路（幅450nm）・MZM変調器・DWDMマイクロリング共振器' },
      { label: '動作波長', value: '低分散 Oバンド（1,310 nm 近赤外シリコン透過帯）' },
      { label: '究極目標', value: 'チップ間データ伝送の電気抵抗発熱・クロストーク完全解消' },
    ],
    diagramType: 'xv2_electro_optical_cpo',
  },

  'xv2-slvsec-pam4-cdr': {
    title: 'X2-06. 次世代センサー直結「SLVS-EC v3.0 / PAM4多値変調 SerDes受信器＆DSPクロック復元（CDR）」',
    subtitle: 'Next-Gen SLVS-EC v3.0 / PAM4 Multi-Level SerDes Receiver, T-Coil ESD & DSP-CDR Engine',
    category: 'BIONZ XR 極超解剖図 V2 X2-06 — 0と1だけでなく「4段階の高さ」で1本の線に2倍の映像を詰め込んで受け取る超高速レシーバー',
    plainAnalogy:
      '普通のデジタル通信は「低い＝0、高い＝1」の2種類だけで1回に1ビット送りますが、α7R VIの66.8MP 30fpsや8K RAWになると信号が速すぎて電線が追いつきません。そこで電圧を「0・1・2・3」の4段階（PAM4）に分けると、同じスピードの波で一度に2ビット（2倍のデータ！）を運べます！さらに受信側の渦巻きコイル（Tコイル）とデジタル復元回路（DSP-CDR）が、なまった波形を瞬時にピシッと四角く戻して完璧に読み取ります！',
    summary:
      'ソニー独自の高速センサーI/F「SLVS-EC」の次世代拡張および高速SerDes受信回路（PAM4 4値変調＋誘導性Tコイル広帯域ESD保護＋デジタルイコライザCTLE/DFE＆クロックデータ復元DSP-CDR）。センサーからの毎秒数十〜百Gbps超の生RAWストリームを1ビットの誤りもなく受信します。',
    opticsAndPhysics: [
      'SLVS-EC（Scalable Low-Voltage Signaling with Embedded Clock）はデータ信号の中にクロック（リズム）を埋め込んで送るため、カメラ内部のフレキシブル基板（FPC）がIBIS手ブレ補正で激しく揺れて配線長が微妙に変わっても、レーン間のタイミングズレ（スキュー）が起きません。',
      '入力端にはナノスケールの平面渦巻きインダクタ「Tコイル（T-Coil）」を配置し、ESD保護ダイオードの寄生容量を打ち消して数十GHzの超高周波まで波形をくっきり通します。',
      '受信した波形がフレキ基板の損失で丸くなっても、内部の適応型CTLE（連続時間線形等化器）とDFE（判定帰還等化器）が「アイ・ダイアグラム（目の開き）」を自動で大きくこじ開け、ビット誤り率 10⁻¹⁵ 未満の完璧な画質を守ります。',
    ],
    formula: {
      expression: 'PAM4: 2 bits / symbol（NRZ比 帯域効率 2倍）＋ 埋込クロックCDR ⇒ IBIS揺れでもスキューゼロ！',
      description: '4段階の電圧で2倍の映像を運びつつ、信号からリズムを自動復元するので手ブレ補正で基板が動いても映像が乱れない',
    },
    nextGenInnovation:
      'α7 Vの33MP 30fpsやα7R VIの66.8MP 30fps 14bit RAW（毎秒30GB超の膨大な生データ）を、細いフレキケーブル数本だけで安定受信できる秘密がこの超高速SerDes受信部に詰まっています。',
    specs: [
      { label: '通信規格', value: 'Sony SLVS-EC v2.0/v3.0 ＆ 次世代 PAM4 高速SerDes PHY' },
      { label: '波形整形回路', value: 'T-Coil広帯域ESD ＋ 適応型CTLE/DFE等化器 ＋ 位相補間DSP-CDR' },
      { label: 'クロック方式', value: 'エンベデッドクロック（IBIS可動フレキでのスキュー耐性抜群）' },
      { label: '信頼性', value: 'ビット誤り率 BER < 10⁻¹⁵（1ピクセルの欠損も許さない高信頼）' },
    ],
    diagramType: 'xv2_slvsec_pam4_cdr',
  },

  // =========================================================================
  // ZONE B — 2026 SUB-2nm BEOL NANO-INTERCONNECTS & ON-DIE SENSORS (X2-07 – X2-11)
  // =========================================================================

  'xv2-beol-airgap-ulk': {
    title: 'X2-07. 上層BEOL「ナノ・エアギャップ（空気絶縁すき間）＆超低誘電率SiCOH（k<2.2）多層配線」',
    subtitle: 'Upper BEOL Nanoscale Air-Gap Trenches & Ultra-Low-k Porous SiCOH (k < 2.2) Interconnects',
    category: 'BIONZ XR 極超解剖図 V2 X2-07 — 極細電線のあいだを「空気の溝」にして電気のブレーキを3割カットする高速配線スタック',
    plainAnalogy:
      '何百億個ものトランジスタをつなぐ極細の電線がびっしり隣り合うと、隣りの電線同士がコンデンサのように電気を引き合ってしまい、信号に強力なブレーキ（寄生容量）がかかって速度が落ち、電気もムダ食いします。そこで一番渋滞しやすい配線層のあいだの絶縁体をわざとくり抜いて「極小の空気の溝（エアギャップ）」と「泡だらけの超軽スポンジ絶縁膜（ULK）」にすることで、信号のブレーキを一気に30%も軽くしています！',
    summary:
      '先端ロジックSoCの中間〜上層BEOL（M3–M8）に導入される、多孔質超低誘電率膜（Porous SiCOH ULK, k ≈ 2.0–2.4）および選択的エアギャップ（k = 1.0）複合絶縁マンハッタン配線構造。高速データバスのRC遅延と動的消費電力（P = C·V²·f）を大幅に削減します。',
    opticsAndPhysics: [
      '配線間の静電容量 C は間を埋める絶縁体の比誘電率 k に比例します。通常の酸化膜（SiO₂, k=3.9）をナノサイズの微細気孔を含む多孔質SiCOH（k ≈ 2.2）へ変え、さらに最も線間が狭い箇所を完全な空気空洞（Air-Gap, k=1.0）にすることで実効誘電率を劇的に下げます。',
      'X方向配線（偶数層）とZ方向配線（奇数層）を直交させる「マンハッタン・ルーティング」とデュアルダマシン銅ビアを組み合わせ、14〜16層の超高層立体道路網を形成します。',
      '動的消費電力 P = α·C·V²·f は容量 C に正比例するため、エアギャップで配線容量を25〜30%削るだけで、同じ処理速度のままバッテリー消費と発熱が直接減る大きな恩恵があります。',
    ],
    formula: {
      expression: 'P_dynamic = α · C_wire · V² · f   （k: 3.9 → 1.8 で配線容量 C と消費電力が劇的低下！）',
      description: '電線と電線のあいだに空気のすき間を作るだけで、電気信号が軽くなりスピードUPと省エネを同時に達成',
    },
    nextGenInnovation:
      '機械的強度を保つため「必要な高速信号線だけ局所的にエアギャップを作る」選択エアギャップ技術が2nm/A16世代で成熟し、BIONZ XR2クラスの高クロック動作と低発熱の両立に貢献しています。',
    specs: [
      { label: '絶縁構造', value: '多孔質ULK SiCOH（k ≈ 2.2）＋ 局所選択ナノ・エアギャップ（k = 1.0）' },
      { label: '配線構成', value: '直交マンハッタン多層デュアルダマシン銅配線（M3–M8帯）' },
      { label: '効果', value: '線間寄生容量 −25〜35% ／ RC信号遅延・クロストーク大幅削減' },
      { label: '省電力寄与', value: '高クロックISP・AIデータバス駆動電力を直接低減' },
    ],
    diagramType: 'xv2_beol_airgap_ulk',
  },

  'xv2-ru-mo-m0-tracks': {
    title: 'X2-08. 最下層M0/M1極細21nmピッチ「ルテニウム（Ru）／モリブデン（Mo）バリアレス金属配線」',
    subtitle: '21nm-Pitch M0/M1 Barrierless Ruthenium (Ru) & Molybdenum (Mo) Sub-2nm Local Interconnects (2026)',
    category: 'BIONZ XR 極超解剖図 V2 X2-08 — 細すぎると急に電気が流れなくなる銅の限界を、電子がぶつかりにくい希少金属ルテニウムで突破！',
    plainAnalogy:
      'ずっと半導体の主役だった銅ですが、2nm世代の「幅わずか10ナノメートル（原子数十個分！）」まで細くすると、銅の中を走る電子が壁にガンガンぶつかって急に電気が流れにくくなり、しかも銅の漏れ止めカバー（バリア膜）だけで道幅の半分が埋まってしまいます。そこで2026年の最先端2nm/A16では、カバー不要で狭い道でも電子がスイスイ走れる希少金属「ルテニウム（Ru）」や「モリブデン（Mo）」へ主役交代が進んでいるのです！',
    summary:
      '2026年の2nm〜1.6nm（A16/18A）世代における最下層ローカル配線（M0/M1、最小メタルピッチ 21 nm 級）の切り札となる、バリアレス・ルテニウム（Ru）およびモリブデン（Mo）金属配線構造。銅のサイズ効果（電子散乱による抵抗急増）を根本解決します。',
    opticsAndPhysics: [
      '室温での電子の平均自由行程（電子がぶつからずにまっすぐ進める距離）は銅が約39 nmなのに対し、ルテニウムは約6.6 nm、モリブデンは約11.2 nmと非常に短いため、幅10〜15 nmの超極細配線では銅よりも圧倒的に低い実効抵抗を示します。',
      'しかも銅は周囲の絶縁膜へ染み出してショートを起こすため厚さ2〜3 nmのTaNバリア膜が必須でしたが、Ru/Moは拡散しにくく「バリアレス（保護膜なし）」で溝いっぱいに導体を詰め込めます。',
      'さらに銅よりも融点がはるかに高く（Ru: 2,334℃、Mo: 2,623℃ vs Cu: 1,085℃）、激しい電流密度でも金属原子が流されて断線するエレクトロマイグレーション耐性が桁違いに優れています。',
    ],
    formula: {
      expression: 'λ_mfp(Cu) ≈ 39 nm ≫ λ_mfp(Ru) ≈ 6.6 nm  ⇒  線幅 < 15 nm では Ru/Mo が銅を逆転して低抵抗！',
      description: '極細のトンネルでは電子が壁に当たりにくいルテニウムのほうが銅より電気がスイスイ流れ、断線にも圧倒的に強い',
    },
    nextGenInnovation:
      '2026年の最新サブ2nm物理レビューでも、M0ピッチ21nm領域での抵抗爆発と電圧降下を防ぐ最重要材料革新としてRu/Moのサブトラクティブ直接エッチング配線が位置づけられています。',
    specs: [
      { label: '最小配線ピッチ', value: 'M0 最小メタルピッチ 約 21 nm（幅約 10 nm 級）' },
      { label: '次世代導体金属', value: 'バリアレス ルテニウム（Ru）＆ モリブデン（Mo）' },
      { label: '物理的優位', value: '電子平均自由行程が短く、極細線でのサイズ効果抵抗増を回避' },
      { label: '信頼性', value: '高融点（>2,300℃）によりエレクトロマイグレーション耐性抜群' },
    ],
    diagramType: 'xv2_ru_mo_m0_tracks',
  },

  'xv2-beol-metal-temp-sensor': {
    title: 'X2-09. ISSCC 2026 Samsung SF2技術「BEOL上層金属抵抗式・超小型オンダイ温度センサー（面積1%・518倍高抵抗）」',
    subtitle: 'ISSCC 2026 Compact BEOL Metal-Resistor On-Die Temperature Sensor (518x Sheet Resistance, 1% Area)',
    category: 'BIONZ XR 極超解剖図 V2 X2-09 — トランジスタの大切な土地を一切奪わず、上の配線層のスキマに忍び込む極小の「金属体温計」',
    plainAnalogy:
      'カメラで8K動画を撮ると、チップの中の「AI部分」や「動画圧縮部分」などピンポイントで熱い場所（ホットスポット）ができます。これまではシリコンの床に大きなトランジスタ体温計（BJT）を置くため貴重な面積を食っていましたが、ISSCC 2026で発表された最新技術は、なんと上空の配線層の中に「通常の518倍も電気抵抗が高い特殊な極細ヘビ型金属線」を面積わずか1%の極小サイズで配置！下の回路を一切邪魔せず、チップ中の温度を正確に監視できます！',
    summary:
      'ISSCC 2026でSamsungがSF2（2nm GAA）ノードで実証した、従来のバイポーラトランジスタ（BJT）温度計を置き換えるBEOL上層金属抵抗式・超小型オンダイ温度センサー。同等配線の518倍のシート抵抗を持ち、占有面積を約1%へ劇的圧縮します。',
    opticsAndPhysics: [
      '金属の電気抵抗は温度が上がると直線的に増える性質（正の温度係数 TCR）を持ちます。上層BEOLの高抵抗金属薄膜をミクロな蛇行（サーペンタイン）パターンに彫り、4端子ケルビン測定で電圧降下を読むだけで局所温度を即座に測定できます。',
      '従来のBJT方式はFEOL（最下層のトランジスタ層）の貴重なアクティブシリコン面積を占有し、しかも2nm GAAノードでは寄生BJTの特性バラつきが大きくなる弱点がありました。',
      'BEOL上層に浮かせて配置できるため、発熱源であるAI NPUや動画コーデックの「まさに真上」へ何十個も高密度にばら撒くことができ、熱暴走を防ぐ精密なクロック制御（DVFS）が可能になります。',
    ],
    formula: {
      expression: 'R(T) = R₀ · [1 + α_TCR · (T − T₀)]   （シート抵抗 518×・FEOL占有面積 0% の空中温度計！）',
      description: '下のトランジスタ面積をまったく使わず、上空の極小金属ヘビ線の抵抗変化だけでチップの発熱をピンポイント監視',
    },
    nextGenInnovation:
      'ファンレス防塵防滴のα7 V / α7R VIで90分超の4K/8K連続録画を安定させるには、こうした「チップ内数十箇所のリアルタイム温度マップ」に基づく緻密な電力制御が不可欠です。',
    specs: [
      { label: '最新学会出典', value: 'ISSCC 2026（Samsung SF2 2nm BEOL金属抵抗温度センサー）' },
      { label: '抵抗・面積比', value: 'シート抵抗 518倍 ／ 従来配線抵抗比 面積約 1%（FEOL面積ゼロ）' },
      { label: '計測方式', value: 'サーペンタイン高抵抗金属薄膜 ＋ 4端子ケルビン精密センシング' },
      { label: 'カメラ貢献', value: 'AI/動画ホットスポットの超高速検知＆熱停止の限界延長' },
    ],
    diagramType: 'xv2_beol_metal_temp_sensor',
  },

  'xv2-shpmim-decap': {
    title: 'X2-10. TSMC N2P採用「超高密度3DトレンチSHPMIM（Super-High-Performance MIM）電源安定コンデンサ」',
    subtitle: 'TSMC N2P Super-High-Performance 3D Trench MIM (SHPMIM) On-Die Power-Integrity Decoupling Bank',
    category: 'BIONZ XR 極超解剖図 V2 X2-10 — AI処理が一瞬でフル稼働した瞬間の「電圧ガク落ち」を10億分の1秒で助けるチップ内ダム',
    plainAnalogy:
      '家の蛇口を一気に全部開けると一瞬だけ水圧がガクッと落ちますよね。BIONZ XR2でも、シャッターを半押ししてAI被写体認識と30fps連写が一斉に動き出した瞬間、何億個ものスイッチが同時に電気を吸い込んで電圧が一瞬ガクッと落ちます（電圧ドループ）。そこでTSMC N2/N2Pでは、配線層のすぐ近くに「超高密度の極細ひだ状コンデンサ（SHPMIM）」という超高速の電気貯水ダムを敷き詰め、1ナノ秒以内に電気を補給してフリーズやエラーを防ぎます！',
    summary:
      'TSMC N2／N2Pプロセスで電源品質（パワーインテグリティ）の要として導入された、超高密度3Dひだ状・金属-高誘電体-金属コンデンサ「SHPMIM（Super-High-Performance MIM）」。瞬間大電流スパイク（di/dtノイズ）をナノ秒未満で吸収します。',
    opticsAndPhysics: [
      '基板上の外付けMLCCコンデンサは数ミリ離れているため、GHz帯の超高速電流スパイクには配線のインダクタンスが邪魔して間に合いません。オンダイのSHPMIMはトランジスタのわずか数マイクロメートル真上に位置します。',
      '従来の平面MIMキャパシタに比べて、多層ひだ構造と超高誘電率HfO₂/ZrO₂複合膜により単位面積あたりの静電容量を2倍以上へ引き上げ、電圧降下（動的ドループ）を大幅に抑え込みます。',
      '電圧の落ち込みが減るおかげで、あらかじめ安全マージンとして余分に高くかけていた動作電圧（ガードバンド）を下げられ、結果としてチップ全体の消費電力削減（バッテリー持ち向上）に直結します！',
    ],
    formula: {
      expression: 'ΔV_droop = L · (di/dt) − Q_SHPMIM / C_eff  ⇒  電圧マージン削減で動作電力 P ∝ V² を大幅低減！',
      description: 'チップの中に超高速の電気ダムを置くことで電圧の落ち込みを防ぎ、低い電圧のまま安定して省エネ動作できる',
    },
    nextGenInnovation:
      'TSMCの2025–2026年N2/N2P世代では、裏面電源（A16）へ移行する前のフロントサイド電源網において、このSHPMIMコンデンサが周波数向上と電圧マージン削減の切り札となっています。',
    specs: [
      { label: '採用プロセス', value: 'TSMC N2 / N2P（フロントサイド電源網パワーインテグリティ核）' },
      { label: 'コンデンサ構造', value: '3D多層ひだ状 超高密度金属-高誘電体-金属（SHPMIM）' },
      { label: '応答速度', value: 'サブナノ秒（GHz帯の瞬間電流スパイクを即座に平滑化）' },
      { label: 'システム効果', value: '動作電圧ガードバンド低減 → 低発熱・バッテリー長寿命化' },
    ],
    diagramType: 'xv2_shpmim_decap',
  },

  'xv2-em-reservoir-via': {
    title: 'X2-11. エレクトロマイグレーション（EM）防止「コバルト（Co）キャップ層＆冗長ダブルビア銅ストッパー」',
    subtitle: 'Electromigration-Immune Cobalt (Co) Self-Aligned Cap Layer & Redundant Double-Via Copper Reservoir',
    category: 'BIONZ XR 極超解剖図 V2 X2-11 — 激しい電気の川に銅原子が押し流されて断線するのを防ぐ「コバルトの蓋と予備の橋」',
    plainAnalogy:
      '川に激しい水が何年も流れ続けると、川底の砂がどんどん下流へ流されて穴が開いてしまいます。半導体の極細銅配線でも同じことが起きます！猛スピードで走る電子の風に銅原子が少しずつ吹き飛ばされて「空洞（ボイド）」ができ、いつか電線が切れてしまう現象を「エレクトロマイグレーション（EM）」と言います。そこで銅配線の上面を頑丈な「コバルト（Co）の蓋」で覆い、さらに接続柱（ビア）を2本並べて予備の銅タンクを付けることで、10年以上壊れない高信頼性を守っているのです！',
    summary:
      '先端ノードの大電流密度（>1 MA/cm²）環境下で銅配線の断線寿命を10倍以上へ延ばす、自己整合コバルト（Co）キャッピング層と冗長ダブルビア／銅リザーバー構造。長時間の8K動画撮影や高温環境でもチップの経年劣化を防ぎます。',
    opticsAndPhysics: [
      '銅配線の側面と底面はTaNバリア膜で固められていますが、上面は絶縁膜と接するため銅原子が一番滑りやすい弱点でした。銅の上面だけに選択CVD法でわずか1〜2 nmのコバルト（Co）金属キャップを被せると、銅とコバルトの強い結合力によって表面拡散の活性化エネルギーが跳ね上がり、EM寿命が10〜50倍に伸びます。',
      '電流が縦の柱（ビア）を曲がる場所では電流集中（カレントクラウディング）が起きて空洞ができやすいため、重要な電源・クロック線では必ず「ダブルビア（2本以上の並列ビア）」と端部にわずかな銅の余白（リザーバー）を設計します。',
      '仮に長年の酷使で片側のビア下に微細なボイドが生じても、もう1本のビアとコバルトキャップのシャント経路が電気を通し続けるため、プロ用カメラの過酷な現場でも突然死を防ぎます。',
    ],
    formula: {
      expression: 'MTTF（平均故障時間）= A · J⁻ⁿ · exp(E_a / k_B T)   （Coキャップで活性化エネルギー E_a 急増！）',
      description: 'コバルトの極薄キャップで銅原子が流されないようしっかり押さえ、10年以上のプロ機耐久性を保証する',
    },
    nextGenInnovation:
      '2nm以下の配線では電流密度がさらに跳ね上がるため、Coキャップ＋Ru/Mo配線＋裏面電源（BSPDN）の3段構えでエレクトロマイグレーション限界を克服しています。',
    specs: [
      { label: '保護キャップ', value: '選択CVD 1〜2 nm コバルト（Co）自己整合キャップ膜' },
      { label: '冗長設計', value: 'ダブルビア／マルチビア配列 ＋ 端部銅原子リザーバー' },
      { label: '寿命向上', value: '従来銅配線比でEM断線寿命（MTTF）10〜50倍以上へ延伸' },
      { label: '対象負荷', value: '大電流AI NPU・動画コーデック電源線の高温連続動作保護' },
    ],
    diagramType: 'xv2_em_reservoir_via',
  },

  // =========================================================================
  // ZONE C — ATOMIC HEART: 2026 TSMC N2 / A16 GAA NANOSHEET & MONOLITHIC CFET CORE (X2-12 – X2-18)
  // =========================================================================

  'xv2-gaa-si-nanosheets': {
    title: 'X2-12. 2nm / A16世代「4段水平積層シリコン・ナノシート（GAAチャネル：厚さ約5nmの極薄電子ハイウェイ）」',
    subtitle: '2nm / A16 4-Stack Horizontal Silicon Nanosheet Channels (Gate-All-Around RibbonFET / N2 / SF2)',
    category: 'BIONZ XR 極超解剖図 V2 X2-12 — 縦の板(FinFET)から「横に4階建てで浮かぶ極薄シリコンの橋」へ進化した2026年トランジスタの主役',
    plainAnalogy:
      'これまで10年間使われてきた「FinFET」は、魚の背ビレのようにシリコンの板を縦に立てて3方向から挟むスイッチでしたが、細くしすぎると底のすき間から電気がジワジワ漏れて限界が来ました。2025年末〜2026年にTSMC N2・Intel 18A・Samsung SF2でついに実用化された「GAAナノシート」は、厚さわずか5ナノメートル（原子20個分！）の極薄シリコンの板を4階建ての橋のように水平に積み重ねた構造！しかも橋の「横幅」を場所ごとに自在に変えて、爆速コアも超省エネコアも1枚のチップに思い通り作れるのです！',
    summary:
      'TSMC N2（2025年Q4量産開始）／A16、Intel 18A（RibbonFET）、Samsung SF2（MBCFET）の心臓部である、4段水平積層単結晶シリコン・ナノシートチャネル。超格子（Si/SiGe）エピタキシャル成長後にSiGeだけを選択エッチングして宙に浮かせた、2026年最先端トランジスタの核です。',
    opticsAndPhysics: [
      '従来のFinFETは背ビレ（Fin）を「1本・2本・3本…」と整数本単位でしか増やせませんでしたが、GAAナノシートは水平シートの幅 W_eff をリソグラフィで連続的に変えられる（TSMC NanoFlex技術！）ため、AI高速コアは幅広シート、待機省エネ回路は細幅シートと精密に最適化できます。',
      '4段のシートを縦に重ねることで、同じフットプリント（床面積）のまま電子が通る実効チャネル幅（W_eff）を大幅に増やしつつ、ゲートが上下左右4面すべてを完全に握れるためリーク電流が劇的に減ります。',
      'TSMCの公表データでは、N2（N2P）世代はN3E比で同一消費電力なら最大18%高速化、同一速度ならなんと25〜36%もの消費電力削減＋1.2倍のロジック高密度化を実現しています！',
    ],
    formula: {
      expression: 'W_eff = 2 · N_sheets · (W_sheet + T_sheet)   （4段積層で省面積のまま大電流＆リーク極小！）',
      description: '極薄の電子ハイウェイを縦に4階建てで重ねることで、狭い土地でも圧倒的なパワーと省エネを両立する',
    },
    nextGenInnovation:
      '2025年末〜2026年にかけてついに世界の最先端SoCがFinFETからGAAナノシートへ完全移行。次世代BIONZ XRシリーズの「8K動画＋リアルタイムAIを長時間ファンレス駆動する」夢を現実にする歴史的転換点です。',
    specs: [
      { label: '2026年先端ノード', value: 'TSMC N2 / A16 ・ Intel 18A (RibbonFET) ・ Samsung SF2' },
      { label: 'ナノシート寸法', value: 'シート厚約 5 nm × 3〜4段水平積層（ゲート長 L_g ≈ 12 nm）' },
      { label: '性能・電力向上', value: 'N3E比：同電力で速度 +15〜18% ／ 同速度で電力 −25〜36%' },
      { label: '設計自由度', value: 'シート幅連続可変（NanoFlex）で高速・省エネセルを自在混載' },
    ],
    diagramType: 'xv2_gaa_si_nanosheets',
  },

  'xv2-hkmg-all-around': {
    title: 'X2-13. 360°全周包み込み「High-k ハフニウム酸化膜（HfO₂ 1.5nm）＆ TiN/TiAl 仕事関数メタルゲート（HKMG）」',
    subtitle: '360° Gate-All-Around High-k HfO2 (1.5nm) & Multi-Work-Function TiN/TiAl Metal Gate Stack (HKMG)',
    category: 'BIONZ XR 極超解剖図 V2 X2-13 — 4枚の極薄シリコンシートを「上下左右360°ぐるり」と握りしめて電気をピタッと止める魔法の蛇口',
    plainAnalogy:
      'ホースの水を止めるとき、上から押さえるだけだと少し水が漏れますが、ホースの全周360°をぐるっと手で握りしめればピタッと1滴も漏れずに止まりますよね！これが「Gate-All-Around（GAA＝全周ゲート）」の名前の由来です。4枚のシリコンシートのわずかなスキマの奥まで、厚さ1.5ナノメートルの高性能絶縁膜（ハフニウム酸化膜）と金属ゲートを原子層堆積（ALD）でびっしり巻き付け、わずか0.65ボルトの弱い電池電圧でも完璧にON/OFFを切り替えます！',
    summary:
      '4段シリコンナノシートの表・裏・左右の全4面を360°完全包囲する、0.8 nm SiO₂界面層＋1.5 nm High-k ハフニウム酸化膜（HfO₂）＋TiN/TiAl仕事関数調整メタル＋タングステン/コバルト低抵抗ゲート電極の多層同心スタック。',
    opticsAndPhysics: [
      'シート同士の狭いすき間（高さわずか約 8〜10 nm！）の奥まで均一に金属を詰めるため、CVDやスパッタではなく原子1層ずつ化学反応で回り込むALD（原子層堆積）プロセスでHKMGを形成します。',
      '4面すべてから電界でチャネルを締め上げるため、サブスレッショルド係数（SS：スイッチの切れ味の鋭さ）が室温の物理理論限界（60 mV/dec）へ肉薄し、OFF時の漏れ電流（待機電力）を大幅に削減できます。',
      'ゲート電圧をわずか0.5〜0.7 Vまで下げても鋭くONになるため、動的電力 P = C·V²·f の二乗効果で劇的な省エネを達成し、カメラの連続撮影枚数や4K録画時間を飛躍的に延ばします。',
    ],
    formula: {
      expression: 'SS = (k_B T / q) · ln(10) · (1 + C_dep / C_ox) → 理論限界 ≈ 60 mV/dec（究極の切れ味！）',
      description: '360°全周から握るため、ほんのわずかな電圧変化でスイッチがスパッと完全に切れ、ムダな漏れ電気が消える',
    },
    nextGenInnovation:
      '3次元カットアウェイモデルで見ると一目瞭然の通り、ナノシートの隙間に織り込まれた同心円状のHfO₂（水色）＋仕事関数メタル（金色）＋タングステン充填こそが2026年2nm半導体の造形美そのものです。',
    specs: [
      { label: 'ゲート絶縁膜', value: '0.8 nm SiO₂界面層 ＋ 1.5 nm High-k HfO₂（比誘電率 k ≈ 20）' },
      { label: '仕事関数メタル', value: 'ALD成膜 TiN / TiAlC / TiAl 多層仕事関数制御スリーブ' },
      { label: '電気的切れ味', value: 'サブスレッショルドスイング SS ≈ 62〜66 mV/dec（理論限界級）' },
      { label: '駆動電圧', value: 'V_dd ≈ 0.55 〜 0.75 V 超低電圧・超低リーク動作' },
    ],
    diagramType: 'xv2_hkmg_all_around',
  },

  'xv2-hk-dipole-vth': {
    title: 'X2-14. 原子1層「ランタン（La）／アルミニウム（Al）界面ダイポール膜（マルチしきい値電圧 Vth チューニング）」',
    subtitle: 'Atomic-Monolayer Lanthanum (La) / Aluminum (Al) Interface Dipole Multi-Vth Tuning Layer',
    category: 'BIONZ XR 極超解剖図 V2 X2-14 — わずか原子1個分の金属を忍ばせて「爆速スイッチ」と「超節電スイッチ」を作り分ける神ワザ',
    plainAnalogy:
      'チップの中には「多少電気を食ってもいいから超爆速で動きたいAIや動画回路」と、「ゆっくりでもいいから電気を1滴も漏らしたくない待機回路」の両方が必要です。昔のFinFETは金属ゲートの「厚さ」を変えてスイッチの軽さ（しきい値電圧 Vth）を調整していましたが、GAAのナノシート間は狭すぎて厚い金属が入りません！そこで2026年の2nm世代は、HfO₂の境目にわずか「原子1層分のランタンやアルミ」を仕込むことで、厚みをゼロのままスイッチの軽さを自由自在に調整するのです！',
    summary:
      'GAAナノシート間の極狭スペース（約8〜10 nm）で厚い仕事関数金属（WFM）を使わずに複数段階のしきい値電圧（uLVT / LVT / SVT / HVT）を作り分ける、ALD単原子層ランタン酸化物（La₂O₃：nMOS低Vth化）およびアルミ酸化物（Al₂O₃：pMOS低Vth化）界面ダイポール技術。',
    opticsAndPhysics: [
      'HfO₂とSiO₂の境目にわずか数オングストローム（原子1〜2層分！）のLaまたはAlを挟んで熱拡散させると、電気陰性度と酸素密度の差から界面に極薄の「電気双極子シート（ダイポール層）」が生まれます。',
      'この原子1層のダイポールがフラットバンド電圧（V_fb）を ±100〜300 mV も綺麗にシフトさせるため、物理的にかさばる厚膜WFMを何種類もパターニングせずに最大6〜8種類の異なるスイッチ特性（マルチVth）を1チップ上に混載できます！',
      'BIONZ XR2のチップ上でも、クリティカルパス（最速が必要な回路）だけ超低Vth（uLVT）にし、残りの90%を高Vth（HVT）で漏れ電流を封印することで、圧倒的な処理能力と長いバッテリー寿命を両立しています。',
    ],
    formula: {
      expression: 'ΔV_th = ±(N_dipole · p_dipole) / ε_interface ≈ ±100〜300 mV（膜厚増加 ≈ 0.3 nmのみ！）',
      description: '原子たった1枚の電気の偏り（ダイポール）だけで、スペースを使わずにスイッチのONのしやすさを自在に調節',
    },
    nextGenInnovation:
      '「ダイポールファースト（Dipole-First）プロセス」はTSMC N2・Samsung SF2・Intel 18Aのすべてに共通する2026年GAA量産の絶対必須プロセス技術です。',
    specs: [
      { label: 'ダイポール元素', value: 'nMOS側：La₂O₃（ランタン） ／ pMOS側：Al₂O₃・ZnO（アルミ等）' },
      { label: '成膜厚み', value: 'わずか 0.2 〜 0.5 nm（ALD 1〜3原子単分子層レベル！）' },
      { label: 'Vth調整幅', value: '±100 〜 300 mV（最大6〜8段階のマルチVthを同一チップ混載）' },
      { label: '採用理由', value: 'ナノシート間の8nm極狭空間で厚膜メタル不使用のVth制御' },
    ],
    diagramType: 'xv2_hk_dipole_vth',
  },

  'xv2-sige-inner-spacer': {
    title: 'X2-15. GAA必須の極微細部品「三日月型 窒化ケイ素（SiN/SiBCN）インナースペーサー」',
    subtitle: 'GAA Nanosheet Scalloped Low-k SiN / SiBCN Inner Spacer Plugs (Inter-Sheet Isolation)',
    category: 'BIONZ XR 極超解剖図 V2 X2-15 — 4枚のシートの隙間にピッタリ嵌め込まれた、電気の近道漏れを防ぐ「ナノサイズの三日月パッキン」',
    plainAnalogy:
      '4段重ねのナノシートの間には金属ゲートが奥まで入り込みますが、そのすぐ横（わずか数ナノメートル隣り！）にはソースとドレインの結晶が迫っています。もし間に仕切りがなければ、ゲートとソース/ドレインがくっついてショートしたり激しい電気ブレーキ（寄生容量）が起きて動きません！そこで製造途中でシートの隙間を横から三日月型に少しだけ削り、そこへ低誘電率の絶縁パッキン（インナースペーサー）をピタッと詰め込むのが、GAAで一番難しい職人技なのです！',
    summary:
      'GAAナノシート構造で初めて必須となった、上下ナノシート間の横方向くぼみ（SiGeキャビティ）へ精密充填された低誘電率SiBCN／SiOCNインナースペーサー。金属ゲートとエピタキシャル・ソース／ドレイン間の電気的短絡と寄生フリンジ容量を遮断します。',
    opticsAndPhysics: [
      '製造工程では①Si/SiGe超格子を積層→②SiGe層だけを横から数nmだけ精密に削る（インデント・エッチ）→③そこへ低誘電率SiBCN絶縁膜を埋め戻して余分を削る→④ソース/ドレイン結晶を成長→⑤残りのSiGeを抜いて金属ゲートを詰める、という原子精度の彫刻を行います。',
      'インナースペーサーの厚みがわずか1 nmズレただけで、薄すぎればゲートとS/Dがショートし、厚すぎればチャネル抵抗が増えてスピードが落ちるため、2nm歩留まりを左右する最難関パーツの一つです。',
      '通常のSi₃N₄（k ≈ 7.0）より誘電率の低いSiBCN／SiOCN（k ≈ 4.5〜5.0）を採用することで、GAA最大の弱点だったゲート–S/D間寄生容量（C_ov）を大幅に減らし、高クロック動作を実現しています。',
    ],
    formula: {
      expression: 'C_parasitic ∝ k_spacer / t_inner  （低k SiBCN ＋ 最適厚約 5 nm でGHz帯スイッチ高速化！）',
      description: '4枚のシートの隙間に数nmの絶縁パッキンを完璧に詰めることで、ショートを防ぎながらスイッチ速度を最大化',
    },
    nextGenInnovation:
      '2025–2026年のTSMC N2・Intel 18A・Samsung SF2の量産立ち上げにおいて、等方性原子層エッチング（ALE）によるインナースペーサーの三日月形状の均一化が歩留まり突破の決め手になりました。',
    specs: [
      { label: '構成材料', value: '低誘電率 SiBCN / SiOCN（k ≈ 4.5〜5.0）絶縁スペーサー' },
      { label: '幅・位置精度', value: '幅約 4 〜 6 nm（シート間くぼみ精度 ±0.5 nm 以内）' },
      { label: '形成プロセス', value: 'SiGe選択横方向エッチング ＋ ALDコンフォーマル充填エッチバック' },
      { label: '必須役割', value: '金属ゲートとS/D結晶の短絡防止＆ゲート寄生容量の大幅低減' },
    ],
    diagramType: 'xv2_sige_inner_spacer',
  },

  'xv2-sd-epi-strain': {
    title: 'X2-16. 結晶ひずみエンジニアリング「{111}ダイヤモンド面 SiGe（pMOS圧縮）／SiP（nMOS引張）エピタキシャル S/D」',
    subtitle: 'Crystal-Faceted {111} Diamond-Shaped Epitaxial SiGe (pMOS Compressive) & SiP (nMOS Tensile) S/D Stressors',
    category: 'BIONZ XR 極超解剖図 V2 X2-16 — シリコンの原子間隔をわざと少し押したり引っ張ったりして、電子を2倍速く走らせる量子の魔法！',
    plainAnalogy:
      '4枚のナノシートの両端をガッチリ掴んでいるダイヤモンド型の結晶ブロック（ソースとドレイン）には、驚くべき秘密があります！プラスの粒（正孔）を流すpMOS側には少し大きめのゲルマニウム原子を混ぜた結晶（SiGe）を育ててシートをギュッと「押し縮め」、マイナスの電子を流すnMOS側には小さめのリン原子を混ぜた結晶（SiP）でシートをグッと「引っ張る」のです。すると不思議なことに、シリコンの中で電子や正孔の「重さ（有効質量）」が軽くなり、走るスピードがぐんと速くなるのです！',
    summary:
      'GAAナノシートの両端から選択エピタキシャル成長させた、美しい{111}結晶ファセット（ダイヤモンド断面）を持つ高濃度SiGe（pMOS圧縮歪み源）およびSiP（nMOS引張歪み源）ソース／ドレイン結晶構造。チャネル歪みエンジニアリングと極低接触抵抗を両立します。',
    opticsAndPhysics: [
      'ゲルマニウム（Ge）はシリコン（Si）より原子半径が約4.2%大きいため、SiGe結晶を両端に育てると間のシリコンナノシートへ1 GPaを超える強烈な一軸圧縮応力がかかり、価電子帯の歪み分裂によって正孔（ホール）の移動度が2倍近く跳ね上がります。',
      '逆にnMOS側では高濃度リン（P）をドープしたSiP／Si:CPエピタキシャル結晶がチャネルへ引張応力を与え、電子の有効質量を軽くしてオン電流（I_on）を大幅に押し上げます。',
      'さらに下側へ「底面誘電体分離（BDI：Bottom Dielectric Isolation）」を設けることで、エピタキシャルS/Dの底からシリコン基板側へ電流が逃げるパンチスルー・リークを完全に断ち切っています。',
    ],
    formula: {
      expression: 'μ_carrier = q · τ / m*(ε_strain)   （1 GPa級結晶ひずみで有効質量 m* が低下 → 電流爆増！）',
      description: '原子の並びを数%だけ意図的に押したり引いたりすると、電子が身軽になってスイッチのスピードが跳ね上がる',
    },
    nextGenInnovation:
      '2026年2nm/A16ノードでは、このダイヤモンド断面S/D結晶の「裏側（底面）」へ直接裏面電源コンタクト（Super Power Rail）を接続する設計へ進化しています。',
    specs: [
      { label: 'pMOS結晶', value: '選択エピタキシャル Si₁₋ₓGeₓ（Ge 40–55%・圧縮応力 > 1 GPa）' },
      { label: 'nMOS結晶', value: '選択エピタキシャル Si:P / Si:CP（高濃度リン・引張応力源）' },
      { label: '結晶形状', value: '自発形成 {111} ファセット・ダイヤモンド／八角断面構造' },
      { label: '効果', value: 'キャリア移動度＆オン電流大幅増 ＋ BDI基板リーク完全遮断' },
    ],
    diagramType: 'xv2_sd_epi_strain',
  },

  'xv2-mol-silicide-contact': {
    title: 'X2-17. MOL（ミドル・オブ・ライン）極低抵抗「ラップアラウンド TiSi₂ / NiPtSi シリサイド＆Co/Wトレンチコンタクト」',
    subtitle: 'Middle-of-Line (MOL) Wrap-Around TiSi2/NiPtSi Silicide & Cobalt/Tungsten Trench Contact (M0A/CA)',
    category: 'BIONZ XR 極超解剖図 V2 X2-17 — 半導体と金属電線のつなぎ目を原子レベルで合金化し、電気の渋滞と発熱を消す玄関口',
    plainAnalogy:
      'どんなに高速なトランジスタと極太の電線を作っても、半導体（シリコン）と金属（電線）がくっつく「玄関口」は電気が通りにくい高い壁（ショットキー障壁）になりやすく、2nm世代ではここで電気の3割近くが熱になってムダになってしまいます。そこでS/D結晶の表面ぐるりをチタンやニッケル白金と反応させて「シリサイド」という魔法の金属合金で包み込み（ラップアラウンド）、その上へコバルトの極小トレンチ柱を立てて電気の玄関を広くスムーズに開通させています！',
    summary:
      'FEOL（トランジスタ）とBEOL（配線）をつなぐMOL（Middle-of-Line）層の最重要構造。エピタキシャルS/D結晶の3面を包み込むラップアラウンド・シリサイド（TiSi₂ / NiPtSi）界面と、低抵抗コバルト（Co）／タングステン（W）自己整合トレンチコンタクト（CA / M0A）で構成されます。',
    opticsAndPhysics: [
      '従来の「上面だけ」の点接触では接触面積が小さすぎて抵抗（R_csd）が爆発するため、エピタキシャルS/Dの上面だけでなく左右の斜め結晶面までぐるっと合金化する「ラップアラウンド・コンタクト（WAC）」により接触面積を2〜3倍へ拡大しています。',
      'さらに接触界面へ極微量のイッテルビウムやセレン等の界面双極子・超高活性化レーザーアニール（ミリ秒アニール）を組み合わせ、比接触抵抗率 ρ_c < 1×10⁻⁹ Ω·cm² という極限の低抵抗を達成しています。',
      'トレンチ柱の充填金属には、狭い穴でもフッ素ダメージや空洞なしに綺麗に埋まるコバルト（Co）またはフッ素フリー・タングステン（FFW）／モリブデン（Mo）が採用されています。',
    ],
    formula: {
      expression: 'R_contact = ρ_c / A_wrap   （ラップアラウンド全面合金化で面積 A を3倍・抵抗を 1/3 へ削減！）',
      description: '結晶の頭だけでなく横腹までぐるっと合金で包むことで、電気の玄関口を3倍に広げて発熱とロスを激減させる',
    },
    nextGenInnovation:
      '2nm/A16世代ではトランジスタ本体の抵抗よりもこのMOL接触抵抗の比重が圧倒的に高くなるため、ラップアラウンド・シリサイドと裏面直接コンタクトの両輪が性能向上の鍵を握っています。',
    specs: [
      { label: 'オーミック合金', value: 'ラップアラウンド TiSi₂（nMOS）／ NiPtSi（pMOS）シリサイド' },
      { label: '比接触抵抗率', value: 'ρ_c < 1 × 10⁻⁹ Ω·cm² 級（レーザーミリ秒活性化）' },
      { label: 'コンタクト柱', value: '自己整合コバルト（Co）／モリブデン（Mo）トレンチバー（CA）' },
      { label: '役割', value: 'FEOLトランジスタとBEOL配線のボトルネック抵抗・発熱を解消' },
    ],
    diagramType: 'xv2_mol_silicide_contact',
  },

  'xv2-monolithic-cfet': {
    title: 'X2-18. 次世代究極トランジスタ「モノリシックCFET（nMOSをpMOSの真上へ2階建て積層・45nmピッチ）」',
    subtitle: 'Monolithic Complementary FET (CFET): Vertically Stacked nMOS-Over-pMOS at 45nm Pitch (IEDM 2025 / VLSI 2026)',
    category: 'BIONZ XR 極超解剖図 V2 X2-18 — これまで横並びだったN型とP型スイッチを「上下の2階建て」に重ね、チップ面積を一気に半分にする未来の切り札',
    plainAnalogy:
      'デジタル回路の基本パーツ（インバータなど）は、必ず「nMOS」と「pMOS」という2種類のトランジスタをペアにして使います。今までは地面の上に「左にnMOS、右にpMOS」と横並びにしていたため、どうしても間のスキマが場所を取っていました。IEDM 2025やVLSI 2026（Intel 45nmピッチ実証・imec等）で一気に実用化へ近づいた「モノリシックCFET」は、なんとpMOSの真上へ絶縁壁を挟んでnMOSをそのまま2階建てに積み上げ、1本の縦ゲートで両方まとめて操作！回路面積を一気に最大50%も小さくする究極の立体トランジスタです！',
    summary:
      'GAAナノシートの次を担う究極の3Dトランジスタ構造「モノリシックCFET（Complementary FET）」。Intel（VLSI 2026 45nmピッチCFETインバータ実証）やimec（IEDM 2025 ハイブリッド結晶面(110)/(100) CFET）が競う、nFET/pFET垂直積層＋デュアル仕事関数スプリットゲート＋裏面電源必須構造です。',
    opticsAndPhysics: [
      '横方向のN-P分離間隔（N-to-P spacing）が物理的にゼロになるため、論理スタンダードセルおよびSRAMの面積を理論上最大40〜50%も一気に縮小でき、ムーアの法則を2030年代へ延命します。',
      '1本の共通ゲート柱の中で、下半分（pMOS周り）にはp型仕事関数メタル、上半分（nMOS周り）にはn型仕事関数メタルを精密に塗り分ける「デュアルWF置換メタルゲート（RMG）」と中間絶縁壁（Middle Dielectric Isolation）が心臓部です。',
      '上下2階建てにすると表側から両方の電源を引く場所が完全になくなるため、「下階はウェハー裏面のBSPDNから、上階は表側のBEOLから配線する」裏面電源網（BSPDN）とセットで初めて成立する革命技術です！',
    ],
    formula: {
      expression: 'N-P横分離距離 → 0 nm（縦2階建て統合） ⇒  スタンダードセル面積 最大 −50% 圧縮！',
      description: '横並びだったペアのスイッチを上下2階建てに重ねることで、同じチップサイズに約2倍もの頭脳を詰め込める',
    },
    nextGenInnovation:
      'VLSI 2026（2026年6月）でIntel Foundryが45nmゲートピッチのCFETインバータ動作を発表し、IEDM 2025でimecがハイブリッド結晶面CFETを実証するなど、1.4nm〜A10世代へ向けたポストGAAの本命が現実の形になっています。',
    specs: [
      { label: '最新学会実績', value: 'VLSI 2026（45nmピッチCFET）／ IEDM 2025（imec Hybrid CFET）' },
      { label: '立体構成', value: '1階：pMOSナノシート ／ 中間SiO₂絶縁壁 ／ 2階：nMOSナノシート' },
      { label: 'ゲート構造', value: '共通1本柱・上下デュアル仕事関数メタルゲート（Dual-WF RMG）' },
      { label: '必須連携技術', value: '裏面電源網（BSPDN）による上下両面独立パワー＆信号配線' },
    ],
    diagramType: 'xv2_monolithic_cfet',
  },

  // =========================================================================
  // ZONE D — BIONZ XR2 SPECIALIZED SILICON MICRO-ARCHITECTURE CELLS (X2-19 – X2-24)
  // =========================================================================

  'xv2-xbit-sram-cell': {
    title: 'X2-19. ISSCC 2026 MediaTek「xBIT 10Tロジック型高密度SRAMビットセル＆0.0175μm² N2超高密度SRAM」',
    subtitle: 'ISSCC 2026 MediaTek xBIT 10T Logic-Based SRAM Bitcell & TSMC N2 0.0175um^2 High-Density SRAM',
    category: 'BIONZ XR 極超解剖図 V2 X2-19 — 微細化が止まっていたオンチップ超高速メモリの壁を破り、密度+63%・電力-30%を達成した2026年新セル',
    plainAnalogy:
      '頭脳チップの中で一番面積を食っているのが、計算途中の写真やAIデータを一瞬で出し入れする「超高速メモ帳（SRAM）」です。ところが通常の6トランジスタ（6T）や8TのSRAMは「N型とP型の数がアンバランス」なせいで隙間だらけになり、最近ついに縮小が止まっていました。そこでISSCC 2026で発表された新発想「xBIT」は、N型4個＋P型6個と逆のペアをパズルのように四角く噛み合わせて2ビット分をギュッと圧縮！密度を最大63%も高めつつ電気を3割も節約し、わずか0.35Vの超低電圧でも動きます！',
    summary:
      'ISSCC 2026で大きな話題を呼んだMediaTekのロジック型高密度ビットセル「xBIT（10T対称ペア20T/2bit）」およびTSMC N2の超高密度SRAM（0.0175 μm² / 約38 Mb/mm²）。画像ラインバッファとAI重みキャッシュの面積・電力ボトルネックを突破します。',
    opticsAndPhysics: [
      '従来の6T SRAM（4n + 2p）や8T SRAM（6n + 2p）はN領域とP領域の比率が偏っているため、最先端GAAノードの厳格な規則配列ルール下ではデッドスペースが激増し、N5→N3E間で事実上縮小が停止していました。',
      'xBITは「4n+6p」セルと「6n+4p」セルを相補ペアで組み合わせた20トランジスタ＝2ビットの完全長方形ブロックを構成し、標準ロジック規則にそのまま綺麗にはまるため、8T SRAM比で密度+22%〜63%、平均読み書き電力−30%超、0.5 V待機リーク−29%を達成しました。',
      '0.35 V（100 MHz待機）から0.95 V（4 GHz爆速動作）まで広い電圧レンジで安定動作するため、待機と連写バーストを瞬時に行き来するカメラSoCのオンダイキャッシュに理想的な特性を備えています。',
    ],
    formula: {
      expression: 'xBIT(20T/2bit): 面積密度 +22〜63%（vs 8T）＆ 電力 −30%超（0.35V〜0.95V広域動作！）',
      description: 'N型とP型をパズルのように隙間なく噛み合わせる発想の転換で、止まっていたSRAM微細化の壁を打ち破った',
    },
    nextGenInnovation:
      'ISSCC 2026ではさらにTSMC N16デュアルポートSTT-eMRAM（0.0249 μm²、51.2 Gb/s交錯読み出し）も発表されており、揮発性xBIT SRAMと不揮発性eMRAMの融合が次世代カメラSoCのメモリ階層を刷新します。',
    specs: [
      { label: '最新学会出典', value: 'ISSCC 2026（MediaTek xBIT 10T）／ TSMC N2（0.0175 μm² 6T）' },
      { label: '密度・電力改善', value: '標準8T比 密度 +22〜63% ／ 読み書き電力 −30%超 ／ リーク −29%' },
      { label: '動作電圧幅', value: '0.35 V（100 MHz超省電力）〜 0.95 V（4 GHz高速）' },
      { label: 'カメラ用途', value: '8K RAWラインバッファ・AI NPUウェイト常駐L1/L2キャッシュ' },
    ],
    diagramType: 'xv2_xbit_sram_cell',
  },

  'xv2-npu-systolic-mac': {
    title: 'X2-20. BIONZ XR2統合AI処理ユニット「INT4/INT8/FP8 混合精度シストリック行列乗算器（MAC）＆ゼロスキップ回路」',
    subtitle: 'BIONZ XR2 Integrated AI Processing Unit: Mixed-Precision Systolic Tensor MAC Array & Zero-Skip Sparsity',
    category: 'BIONZ XR 極超解剖図 V2 X2-20 — 人の骨格・鳥の瞳・昆虫の羽まで毎秒60回見分ける「AIの超並列そろばん軍団」',
    plainAnalogy:
      'α7 Vやα7R VIに初搭載された「BIONZ XR2」最大の進化は、これまで別チップだったAI頭脳（AIプロセッシングユニット）が1つのチップの中へ完全合体したこと！その心臓部には、何百個もの小さな掛け算・足し算マシン（MAC）が格子状に並び、心臓の鼓動（シストリック）のようにデータを隣りへバケツリレーしながら一斉にAI計算をこなします。しかも「0を掛けても答えは0」な無駄計算を自動で見抜いて休ませる「ゼロスキップ回路」付きなので、電池を食わずに人物の後ろ姿や飛ぶ小鳥の瞳をピタッと追い続けられるのです！',
    summary:
      'ソニーα7 V（2025年12月発表）・α7R VI（2026年6月発表）・FX5（2026年）のBIONZ XR2チップ内へ直接統合された専用AIプロセッシングユニット（NPU）の中核シストリック行列演算アレイ。INT4/INT8/FP8混合精度と構造化スパース（ゼロスキップ）演算で、認識性能+30%と大幅な低消費電力を両立します。',
    opticsAndPhysics: [
      'シストリックアレイ（Systolic Array）では、入力画像特徴を左から右へ、重みを上から下へ規則正しく流しながら全PE（演算要素）が毎クロック同時に積和演算（a×b+c）を行うため、メモリへのアクセス回数を劇的に減らせます。',
      'ディープラーニングの途中計算（ReLU活性化後など）では数値の50〜70%が「0」になります。ゼロスキップ回路が0入力を検知した瞬間にそのPEの乗算器のクロックを1サイクル単位で遮断するため、消費電力を半分近くまで削れます。',
      'α7R V時代の外付けAIチップ構成からBIONZ XR2のワンチップ統合へ進化したことで、ISPのRAW特徴とAI骨格姿勢推定（人間・動物・鳥・昆虫・車・電車・飛行機）のやり取りが外部基板を通らずチップ内バスで直結され、認識精度向上（約+30%）と電池持ち大幅アップを実現しました！',
    ],
    formula: {
      expression: 'Y_ij = Σ (W_ik · X_kj)（N×N並列シストリック ＋ 0スキップで実効電力効率 3〜5倍！）',
      description: '格子状の計算マシン軍団がバケツリレーで一斉計算し、答えが0になる無駄計算は自動でサボって省エネを極める',
    },
    nextGenInnovation:
      '2026年のα7 V・α7R VIでは「Real-time Recognition AF+」として毎秒60回のAF/AE演算と複数被写体の同時姿勢予測を行い、顔が後ろを向いた人物でも頭や胴体の骨格からピントを外しません。',
    specs: [
      { label: '実機搭載世代', value: 'Sony BIONZ XR2（α7 V / α7R VI / FX5：ワンチップAI統合）' },
      { label: '演算精度', value: 'INT4 / INT8 / BF16・FP8 混合精度シストリックMACアレイ' },
      { label: '省電力機能', value: 'ゼロスキップ（Zero-Skip Sparsity）＆ 演算単位クロックゲーティング' },
      { label: '実戦性能', value: 'AF認識精度 約+30%向上 ／ 毎秒60回 AF/AE＆骨格姿勢推定' },
    ],
    diagramType: 'xv2_npu_systolic_mac',
  },

  'xv2-ai-awb-spectral-dsp': {
    title: 'X2-21. α7 V / α7R VI新搭載「AIオートホワイトバランス（AI-AWB）ディープラーニング光源推定回路」',
    subtitle: 'Sony α7 V / α7R VI AI Auto White Balance (AI-AWB) Deep-Learning Spectral Illuminant Estimator',
    category: 'BIONZ XR 極超解剖図 V2 X2-21 — 蛍光灯・夕日・日陰が混ざる難しい部屋でも「本当の白と自然な肌色」を一瞬で見抜くAI色覚回路',
    plainAnalogy:
      '白いTシャツを夕日の下で撮るとオレンジに、日陰で撮ると青っぽく写ってしまいますよね。従来のカメラは画面全体の色平均から「なんとなくこれくらいかな？」と色補正していましたが、赤い服の人が大きく写ると全体が緑に転んでしまう弱点がありました。2025–2026年のBIONZ XR2（α7 V / α7R VI）に新搭載された「AI-AWB」専用回路は、画面に写っている「人の肌・空・木・電球・窓の光」をAIが意味レベルで見分け、異なる光源が混ざった部屋でも人間の目が見た通りの自然な色へ瞬時に整えます！',
    summary:
      'ソニーα7 Vおよびα7R VIのBIONZ XR2統合AI処理ユニットが新たに実現した「AIベース・オートホワイトバランス（AI-AWB）」専用分光推定＆色空間変換ハードウェアパイプライン。',
    opticsAndPhysics: [
      '前面の可視光＋IRセンサー（AWB測光センサー）から届く分光データと、イメージセンサーのRAW画像からNPUが抽出した「被写体セマンティック領域（顔・空・植物・人工照明など）」を融合して、シーン内の複数光源の色温度（ケルビン）と緑/マゼンタ偏差（Tint）をピクセル領域ごとに推定します。',
      '推定結果をもとに、3×3色補正マトリクス（CCM）と高精度3D-LUT（3次元ルックアップテーブル）の係数を1フレームごとに滑らかに補間更新するため、動画撮影中に屋内から屋外へ歩き出しても色がカクッと不自然に急変しません。',
      '従来の単純な灰色世界仮説（Gray World）や白色点推定では攻略できなかった「緑の芝生の上のポートレート」や「暖色電球＋青い窓光のミックス光」で圧倒的な一貫性を発揮します。',
    ],
    formula: {
      expression: '[R,G,B]_true = M_CCM(L_AI) · diag(g_R, 1, g_B) · [R,G,B]_RAW   （AI光源推定 L_AI で色転び根絶！）',
      description: '写っているものの意味と光の種類をAIが見抜いて色バランスを計算するため、難しいミックス光でも肌が美しく写る',
    },
    nextGenInnovation:
      '2025年末のα7 V・2026年のα7R VIで初導入されたBIONZ XR2世代の象徴的な新画質エンジンであり、JPEG撮って出しやS-Cinetone動画の現場ワークフローを劇的に楽にしています。',
    specs: [
      { label: '初搭載機種', value: 'Sony α7 V（2025年末）／ α7R VI（2026年6月）BIONZ XR2' },
      { label: '推定入力', value: 'RAW空間セマンティック特徴 ＋ 可視光/IR分光センサー融合' },
      { label: '処理出力', value: '高精度適応型 3×3 CCM ＆ 3D-LUT 色温度・偏差リアルタイム補正' },
      { label: '画質効果', value: 'ミックス光源・単色背景での色転び防止＆肌色再現性大幅向上' },
    ],
    diagramType: 'xv2_ai_awb_spectral_dsp',
  },

  'xv2-demosaic-ring-buffer': {
    title: 'X2-22. 16bitリニアRAW「リアルタイム方向適応デモザイク＆7K→4K オーバーサンプリング縮小フィルタバンク」',
    subtitle: '16-Bit Linear RAW Directional Edge-Adaptive Demosaic & 7K-to-4K Oversampling Polyphase Filter Bank',
    category: 'BIONZ XR 極超解剖図 V2 X2-22 — 赤・緑・青バラバラの点から「輪郭の向き」を読み取り、カミソリのように鋭い4K/8K映像を紡ぐ職人回路',
    plainAnalogy:
      'イメージセンサーの1つ1つの画素は、実は「赤・緑・青のどれか1色」しか測っていません！足りない2色を隣りから計算してフルカラー写真を作る作業が「デモザイク」です。適当に混ぜると建物の格子に虹色のニセ模様（モアレ）が出てしまいますが、この専用ハードウェアは数行分の画素を内部メモリ（ラインバッファ）にため込み、「縦じまか？横じまか？斜めか？」を1画素ごとに瞬時に見分けて色をつなぎ、さらに7K分の超高精細映像から贅沢に4K60pを削り出します！',
    summary:
      'BIONZ XR / XR2の16ビットリニアRAWパイプライン中核をなす、マルチラインSRAMバッファ付き方向適応デモザイク演算器＆多相（ポリフェーズ）7K/8K→4Kオーバーサンプリング縮小フィルタバンク。',
    opticsAndPhysics: [
      '内部の超低遅延SRAMラインバッファに常に5〜9行分の生RAWデータを保持し、画素の周囲の輝度勾配（縦・横・斜め45°/135°）からエッジ方向を検出。エッジをまたがず「エッジに沿った方向だけ」で欠落色を補間することで、偽色とジッパーノイズを徹底抑制します。',
      'さらにレンズと絞り値（F値）の光学データからリアルタイムに回折ボケ（点像分布関数 PSF）を逆算して復元する「回折低減処理」を16bitリニア空間で適用するため、F11〜F16まで絞っても解像感が落ちません。',
      'α7 Vのノンクロップ4K 60p（7Kオーバーサンプリング）やα7R VIの8K 30p／4K 120pでは、全画素の情報から高次多相ローパスフィルタで丁寧に縮小することで、エリアシング（ギザギザ）のない映画級の立体感を生み出します。',
    ],
    formula: {
      expression: 'I_4K(x,y) = Σ_{m,n} h_poly(m,n) · Demosaic_16bit(RAW_{7K}(x+m, y+n))   （偽色・モアレ極小！）',
      description: '線の向きを見分けて16bit精度で色を復元し、7Kの膨大な情報から贅沢に4Kを削り出すから圧倒的にシャープ',
    },
    nextGenInnovation:
      'BIONZ XR2では部分積層（α7 V）やフル積層（α7R VI）センサーからの超高速読み出しを全画素ノンクロップのままリアルタイム7K/8Kパイプラインでさばき切ります。',
    specs: [
      { label: '内部演算精度', value: '16-bit リニア RAW 空間（階調潰れ・丸め誤差ゼロ）' },
      { label: 'デモザイク方式', value: '多方向エッジ適応補間 ＋ 光学回折/倍率色収差リアルタイム補正' },
      { label: '動画縮小処理', value: '7Kオーバーサンプリング ノンクロップ4K60p ／ 8K30p対応' },
      { label: '専用バッファ', value: 'オンダイ多行SRAMラインバッファ（外部DRAM往復ゼロ）' },
    ],
    diagramType: 'xv2_demosaic_ring_buffer',
  },

  'xv2-ibis-kalman-accelerator': {
    title: 'X2-23. 8.5段手ブレ補正（α7R VI）対応「6軸ジャイロ＋映像オプティカルフロー融合カルマンフィルタ専用演算器」',
    subtitle: '8.5-Stop IBIS 6-Axis Gyro + Visual Optical-Flow Sensor-Fusion Kalman Filter Accelerator (α7R VI)',
    category: 'BIONZ XR 極超解剖図 V2 X2-23 — 手の揺れセンサーと「映像のズレ」を毎秒数千回突き合わせ、望遠でも三脚みたいにピタッと止める頭脳',
    plainAnalogy:
      '手ブレ補正を効かせるにはカメラの揺れを素早く測る必要がありますが、ジャイロセンサー（揺れ計）だけだと「わずかな温度ズレや回転の誤差」が少しずつ溜まってしまいます。そこでα7 V（7.5段）やα7R VI（驚異の8.5段！）のBIONZ XR2内部には、ジャイロの揺れデータと、センサー映像自体がどっちへ動いたか（オプティカルフロー）を1秒間に何千回も合体して「本当の手ブレ量」を予測する専用計算回路（カルマンフィルタ）が組み込まれており、ボディとレンズを1ミリ秒未満で息ぴったりに動かします！',
    summary:
      'α7R VIの最大8.5段（中央）／7.0段（周辺）、α7 Vの7.5段という世界最高峰のボディ内5軸手ブレ補正＋レンズ協調制御を司る、専用ハードウェア拡張カルマンフィルタ（EKF）＆オプティカルフロー融合演算コア。',
    opticsAndPhysics: [
      '6軸IMU（3軸ジャイロ＋3軸加速度計）からの毎秒数千Hzの慣性データと、撮像面から抽出するピクセル単位のオプティカルフロー動きベクトルを、行列演算器（拡張カルマンフィルタ）でリアルタイム融合し、ジャイロの低周波ドリフトと手ブレの並進（シフト）成分を精密分離します。',
      'さらにマウント通信ピン経由でレンズ内手ブレ補正（OSS）の制御状態と焦点距離・被写体距離を同期させ、ボディ側IBISとレンズ側OSSが互いに喧嘩せず最も得意な揺れ（角度ブレ vs 回転・シフトブレ）を分担します。',
      '高画素66.8MPのα7R VIではわずか数マイクロメートルの手ブレでも解像が落ちるため、ハードウェア専用の超低遅延フィードバックループ（レイテンシ < 0.2 ms）で1画素単位の微小制御を実現しています。',
    ],
    formula: {
      expression: 'x̂_k = x̂_{k|k-1} + K_k · (z_flow − H · x̂_{k|k-1})   （ジャイロ＋映像融合で8.5段静止！）',
      description: 'ジャイロの素早さと映像ズレの正確さを数式で毎秒数千回合体させ、1画素レベルの微細な揺れまでピタッと相殺',
    },
    nextGenInnovation:
      '2026年1月にソニーが単体手ブレ補正制御チップの新製品を発表するなど、慣性センサー×AI被写体追尾×映像解析の協調手ブレ補正はα7 V / α7R VIで8.5段という前人未到の領域へ到達しました。',
    specs: [
      { label: '最新実機性能', value: 'Sony α7R VI：中央8.5段・周辺7.0段 ／ α7 V：中央7.5段' },
      { label: '融合センサー', value: '6軸IMU（ジャイロ＋加速度）＋ 撮像オプティカルフロー ＋ レンズOSS' },
      { label: '専用回路', value: 'ハードウェア拡張カルマンフィルタ（EKF）＆ 協調PIDサーボDSP' },
      { label: '制御ループ遅延', value: '< 0.2 ms（1画素数マイクロメートル精度の超高速フィードバック）' },
    ],
    diagramType: 'xv2_ibis_kalman_accelerator',
  },

  'xv2-c2pa-puf-ecdsa-core': {
    title: 'X2-24. ソニー「カメラ真正性ソリューション（C2PA）」専用 SRAM-PUF鍵生成＆ECDSA/SHA-384ハードウェア署名コア',
    subtitle: 'Sony Camera Authenticity Solution (C2PA) SRAM-PUF Key Engine & ECDSA/SHA-384 Hardware Enclave',
    category: 'BIONZ XR 極超解剖図 V2 X2-24 — シャッターを切った0.001秒後に「本物の現場写真だ」と絶対に偽造できないハンコを押す秘密の金庫',
    plainAnalogy:
      'AIが何でも偽造できる2026年、ニュースや証拠写真が「本当にカメラで撮られた本物」だと証明する仕組み（C2PA）が不可欠になっています。BIONZ XR2の中には、上を金色の探知メッシュで厳重にガードされた「秘密の暗号金庫」があり、シャッターを切ったわずか0.001秒後に、画素の3D奥行き情報（位相差データ）と写真データ全体へ絶対に真似できない電子のハンコ（ECDSA署名）を焼き付けます！もし誰かがAIで写真の一部を1ミリでも書き換えたら一発でバレるのです！',
    summary:
      'ソニーα7 V・α7R VI・α1 II・α9 IIIが対応する「Camera Authenticity Solution（C2PA規格準拠）」の中核ハードウェアセキュリティエンクレーブ。SRAM-PUF秘密鍵保護・SHA-384ハッシュ加速器・楕円曲線暗号ECDSA署名エンジンを耐タンパーメッシュ内に隔離統合しています。',
    opticsAndPhysics: [
      '通常のソフトウェア署名と異なり、秘密鍵はチップ外部へ1ビットも出力されない「隔離ハードウェア金庫（HSM / Root of Trust）」の内部でSRAM-PUF（電源ON時の固有バラつき鍵）により保護されます。',
      'シャッター露光直後に画像データだけでなく、イメージセンサーの像面位相差情報から得た「3D深度マップ（平面モニターを撮ったニセ写真ではない証拠！）」まで含めてSHA-384ハッシュ化し、ECDSAで電子署名（マニフェスト埋め込み）します。',
      'チップ表面の上層配線には微細な「アクティブ・タンパー検知メッシュ」が張り巡らされており、物理的にパッケージを削って秘密鍵を覗こうと針（プローブ）を当てた瞬間に回路が異常を検知して鍵を自動消去します。',
    ],
    formula: {
      expression: 'Sig_C2PA = ECDSA_Sign(K_priv_PUF, SHA384(Image || 3D_Depth || Time))   （改ざん検出率 100%）',
      description: '写真と3D奥行き情報を秘密の金庫で瞬時に暗号署名するため、1ピクセルでも加工すれば即座に見破れる',
    },
    nextGenInnovation:
      '2025–2026年は静止画だけでなく動画（MP4）へのリアルタイムC2PAフレーム署名や報道機関向け検証ポータル連携が拡大し、α7 V / α7R VIのBIONZ XR2はそのハードウェア基盤を標準搭載しています。',
    specs: [
      { label: '対応標準規格', value: 'C2PA（Content Credentials）＋ ソニー独自3D深度真正性証明' },
      { label: '暗号ハードウェア', value: '専用 SHA-384 ハッシュ器 ＋ 楕円曲線 ECDSA P-384 署名コア' },
      { label: '物理防御', value: 'SRAM-PUF鍵隔離保護 ＋ 上層アクティブ耐タンパー検知メッシュ' },
      { label: '対応最新機', value: 'Sony α7 V / α7R VI / α1 II / α9 III（Camera Authenticity対応）' },
    ],
    diagramType: 'xv2_c2pa_puf_ecdsa_core',
  },

  // =========================================================================
  // ZONE E — 2026 TSMC A16 SUPER POWER RAIL (BSPDN) & ATOMIC THERMAL ESCAPE (X2-25 – X2-30)
  // =========================================================================

  'xv2-bpr-buried-rail': {
    title: 'X2-25. トランジスタ地下埋設「ベリード・パワーレール（BPR：浅溝分離STI内部ルテニウム電源レール）」',
    subtitle: 'Buried Power Rails (BPR): Deep Ru/W Power Distribution Tunnels Embedded Inside STI Oxide',
    category: 'BIONZ XR 極超解剖図 V2 X2-25 — 信号の電線と渋滞しないよう、トランジスタのすぐ床下に掘った「電源専用の地下トンネル」',
    plainAnalogy:
      'これまでのチップは、地上（表側）の狭い同じ道路に「データ信号の車」と「電気を運ぶ巨大な電源トラック」の両方を無理やり走らせていたため、2nm世代で完全に大渋滞が起きてしまいました！そこで生まれたのが、トランジスタ同士を隔てる絶縁溝（STI）の奥深くを掘って「電源専用の太い地下トンネル（ベリード・パワーレール）」を埋め込む発想！地上がデータ信号専用にスッキリ空いて、チップを小さく速くできるのです！',
    summary:
      '裏面電源網（BSPDN）の重要な構成要素である、浅溝分離（STI）酸化膜の深部へ埋め込まれたルテニウム（Ru）またはタングステン（W）製のローカル電源線「ベリード・パワーレール（BPR）」。表側M0/M1トラックの配線渋滞を劇的に解放します。',
    opticsAndPhysics: [
      'トランジスタのアクティブ領域のすぐ横・床下のSTI酸化膜へ深い溝を掘り、TiN拡散バリアライナーを敷いたあと高融点金属（ルテニウムやタングステン）を充填して、トランジスタ形成前の初期工程（FEOL）で地下電源レールを完成させます。',
      '従来はセルの高さの約30〜40%を電源線（VDD/VSS）の確保に奪われていましたが、電源を地下へ移すことでスタンダードセルの高さを5T〜6Tから3T〜4T級へ大幅に圧縮できます。',
      'さらに裏側から貫通してくるナノTSV（PowerVia / BSPDN）とこのBPRを接続することで、グローバルな電源供給とローカルな省面積化を完璧に両立する（Samsung SF2Z等で採用）道が開かれます。',
    ],
    formula: {
      expression: 'セル高さ: 5T/6T → 3T/4T（表側M0電源線ゼロ化） ⇒  回路面積 約 −15〜17% 圧縮！',
      description: '太い電源線を床下の地下トンネルへ逃がすことで、表側の狭い配線スペースがまるごとデータ専用に生まれ変わる',
    },
    nextGenInnovation:
      '2026–2027年のSamsung SF2ZやimecのCFETロードマップでは、この地下埋設BPRと裏面nTSVの組み合わせが次世代超密度ロジックの標準土台となっています。',
    specs: [
      { label: '埋設位置', value: 'トランジスタ隣接 浅溝分離（STI）酸化膜の地下深部トレンチ' },
      { label: 'レール金属', value: '高融点 ルテニウム（Ru）またはタングステン（W）＋ TiNバリア' },
      { label: '面積削減効果', value: 'スタンダードセル高さを大幅縮小（最大 −15〜17% 面積削減）' },
      { label: '配線効果', value: '表側M0/M1の電源渋滞を解消し信号RC遅延を低減' },
    ],
    diagramType: 'xv2_bpr_buried_rail',
  },

  'xv2-a16-spr-vb-contact': {
    title: 'X2-26. TSMC A16（VLSI 2026 Paper T1.5）「Super Power Rail（SPR）裏面直接S/D垂直コンタクト（VB / nTSV）」',
    subtitle: 'TSMC A16 Super Power Rail (SPR) Direct Backside Source/Drain Vertical Contact (VB / nTSV, VLSI 2026 T1.5)',
    category: 'BIONZ XR 極超解剖図 V2 X2-26 — シリコン板を180°裏返して極薄に削り、裏側からトランジスタの足元へ直接電気を差し込む2026年最大の革命！',
    plainAnalogy:
      'これまでのチップは、上空の15階建て配線迷路をくぐり抜けてやっと1階のトランジスタへ電気を届けていたため、途中で電圧の2割近くが消えて熱になっていました。2026年最大の半導体革命「TSMC A16 Super Power Rail（およびIntel 18A PowerVia）」は、なんとウェハーを180°ひっくり返して裏側のシリコンを髪の毛の1,000分の1（50ナノメートル！）まで削り落とし、裏側からトランジスタの足元（ソース／ドレイン）へ極太の電源パイプをズドンと直結！電気ロスを一気に10分の1へ減らしたのです！',
    summary:
      '2026年6月のIEEE VLSIシンポジウム（Paper T1.5）で詳細が発表されたTSMC「A16（1.6nm）」の核心技術「Super Power Rail（SPR）」裏面直接垂直コンタクト（VB）、およびIntel 18AのPowerViaナノTSV。表側の設計資産を保ったまま、裏面からソース／ドレインへ最短距離で電源を供給します。',
    opticsAndPhysics: [
      '表側の信号配線（BEOL）を完成させた後、キャリアウェハーを貼り付けて180°反転し、元は775 μmあったシリコン基板を機械研削→CMP→選択ウェットエッチングでなんと 50〜100 nm 以下まで極限薄化します！',
      '赤外透過顕微鏡と空間位相再構成アライメントで裏側から表側のソース／ドレイン位置をサブナノメートル精度で見抜き、−100℃以下の極低温DRIEで垂直穴を彫ってALDバリア＋Cu/Ru/Mo金属を充填（Direct Vertical Backside Contact: VB）。',
      'TSMCのVLSI 2026発表（Paper T1.5）では、同じGAAナノシートのN2P比で「同電力で速度 +8〜10%」「同速度で消費電力 −15〜20%」「チップ密度 +8〜10%」を達成し、2026年Q4製造準備完了・量産フェーズへ突入します！',
    ],
    formula: {
      expression: 'TSMC A16(SPR) vs N2P：速度 +8〜10% ／ 電力 −15〜20% ／ 密度 +8〜10%（VLSI 2026 T1.5）',
      description: '裏側から最短距離で直接電気を注ぎ込むだけで、同じトランジスタのまま一気に15〜20%も省エネ・高速化する',
    },
    nextGenInnovation:
      'Intel 18A（2025–2026年Panther Lake/Clearwater ForestでPowerVia量産先行）とTSMC A16（2026年準備完了・Super Power Rail）が切り拓いた裏面電源時代は、将来のAIカメラSoCの熱と電池の壁を根底から変えます。',
    specs: [
      { label: '2026年最新出典', value: 'TSMC VLSI 2026 Paper T1.5（A16 SPR）／ Intel 18A PowerVia' },
      { label: '薄化シリコン厚', value: '775 μm → 50〜100 nm 以下へ極限薄化（180°反転加工）' },
      { label: '加工技術', value: '赤外透過サブnm位置合わせ ＋ 極低温（<−100℃）DRIE垂直穴' },
      { label: 'PPA向上実績', value: 'N2P比 電力−15〜20%・速度+8〜10%・動的電圧降下 1/10（18A）' },
    ],
    diagramType: 'xv2_a16_spr_vb_contact',
  },

  'xv2-backside-pdn-grid': {
    title: 'X2-27. ウェハー裏面「極低抵抗・極太バックサイド電源グリッド（BM0–BM4）＆動的電圧降下1/10抑制網」',
    subtitle: 'Flipped-Wafer Heavy Backside Metal Power Grid (BM0–BM4) & 10x Dynamic Droop-Reduction PDN (2026)',
    category: 'BIONZ XR 極超解剖図 V2 X2-27 — 表側をデータ専用、裏側を「電源専用の極太アウトバーン」に完全分離する2026年の立体道路網',
    plainAnalogy:
      '表側には細い信号線がたくさん通っているため、電源線も細くせざるを得ませんでした。ところがウェハーの「裏側」にはデータ信号が1本もないので、電源だけのために信じられないほど太くて分厚い銅の高速道路（BM0〜BM4）を広々と敷き詰められます！電気抵抗が激減するため、AIがフルパワーで動き出しても電圧の落ち込み（ドループ）がなんと10分の1へ激減し、チップのポテンシャルを100%引き出せるのです！',
    summary:
      '裏面電源供給ネットワーク（BSPDN）の背骨をなす、ウェハー裏面へ形成された極太・低抵抗の多層裏面メタル電源グリッド（BM0〜BM4）および裏面パワーバンプ直結網。VLSI 2026では動的電圧降下10分の1・配線面積11%削減が実証されています。',
    opticsAndPhysics: [
      '従来の表側電源網では、パッケージのバンプから15層の細かい配線（M15→M0）をジグザグに降りていく間に、配線の細さによる抵抗で供給電圧（V_dd）の15〜20%も失われていました（IRドロップ）。',
      '裏面電源グリッドでは、データ信号配線と一切競合しないため最下層のBM0からいきなり数倍太い極厚銅／ルテニウム道路を敷け、わずか3〜4層の極太スタックでパッケージバンプから全トランジスタへ最短・極低抵抗で電力を運びます。',
      'IntelのVLSI 2026公開データではPowerVia裏面電源網により「動的電圧降下（ダイナミック・ドループ）を10分の1へ削減」「配線面積11%削減」「0.5 V付近の低電圧動作周波数を約30%向上」という劇的な実測結果が示されました！',
    ],
    formula: {
      expression: 'IRドロップ 15〜20% → < 2%（動的ドループ 1/10！） ⇒  0.5V低電圧時の動作速度 +30%！',
      description: '裏面の極太電源道路で電気ロスの渋滞を完全に消すことで、低い電池電圧でも驚くほどキビキビ高速動作する',
    },
    nextGenInnovation:
      '「表は100%信号、裏は100%電源」という3次元チップの役割分担は、FinFETからGAAへの移行と並ぶ2026年半導体史上の二大構造革命です。',
    specs: [
      { label: '裏面配線層', value: '極太・低抵抗 バックサイドメタル 3〜5層（BM0–BM4）' },
      { label: 'VLSI 2026実測', value: '動的電圧ドループ 1/10 ／ 配線面積 −11% ／ 0.5V周波数 +30%' },
      { label: '構造特徴', value: '信号線ゼロの専用空間により超低IRドロップ＆高EM耐性を実現' },
      { label: '接続相手', value: 'パッケージC4バンプ／ハイブリッド接合から最短直結' },
    ],
    diagramType: 'xv2_backside_pdn_grid',
  },

  'xv2-backside-clock-tree': {
    title: 'X2-28. 次世代裏面グローバルクロック分配網（ルテニウム低スキューHツリー）＆裏面MIMデカップリング層',
    subtitle: 'Next-Gen Backside Low-Skew Ruthenium Global H-Tree Clock Network & Backside MIM Decoupling (2026)',
    category: 'BIONZ XR 極超解剖図 V2 X2-28 — チップ全体のリズムを刻む「指揮者のメトロノーム信号」まで裏側へ移し、ノイズ混信を断つ次世代構造',
    plainAnalogy:
      'チップの中の何十億個もの回路は、1秒間に何十億回も鳴る「指揮者のメトロノーム（グローバルクロック）」に合わせて一斉に動きます。このメトロノーム信号は表側の騒がしいデータ線と隣り合うとノイズでリズムが狂い（ジッタ）、しかも全体の電気の3割近くを食う大飯食らいでした。2026年の次世代BSPDN拡張では、この大切なメトロノーム道路（H型フラクタルツリー）と電気貯水コンデンサ（MIM）まで静かな裏側へ引っ越し、ズレゼロ＆超省エネでチップ全体を指揮します！',
    summary:
      '2026年最新のBSPDN拡張研究で進展している、裏面メタル層を活用した「裏面グローバルクロック分配網（低抵抗ルテニウム／極太銅Hツリー）」およびトランジスタ直下マイクロメートル距離に配置された「裏面超高密度MIMデカップリング容量」。',
    opticsAndPhysics: [
      'Hの文字が入れ子になった対称フラクタル形状「Hツリー（H-Tree）」を使うことで、チップ中央のPLL発振器から四隅の端っこまで配線距離が1マイクロメートル単位で完全に同じになり、クロック到着時刻のズレ（クロックスキュー）をピコ秒未満へ抑えます。',
      '高周波で激しい電磁波を出すクロック配線を、表側の繊細なデータ信号線群から物理的に反対側（裏面）へ隔離することで、相互ノイズ干渉（クロストークジッタ）が激減します。',
      'さらに裏面の空いた面積全体へ超高密度MIMデカップリングコンデンサを敷き詰めることで、トランジスタの真下わずか数マイクロメートルから超低インダクタンスで瞬時電流を供給できます。',
    ],
    formula: {
      expression: 'P_clock = C_tree · V² · f_clk   （裏面極太Hツリー＋隔離シールドでジッタ＆クロック電力大幅削減）',
      description: 'ノイズに弱いメトロノーム信号を静かな裏面の完全対称H型道路へ移し、全回路を1兆分の1秒単位でピタッと揃える',
    },
    nextGenInnovation:
      '2026年9月のサブ2nm BSPDN総説でも、「静的電源（VDD/VSS）の次に来る裏面活用の第2波」として裏面グローバルクロック網と裏面MIMキャパシタ統合が最注目技術に挙げられています。',
    specs: [
      { label: 'クロック構造', value: '完全等長フラクタル Hツリー（スキュー < 2 ps 級）' },
      { label: '導体・配置', value: 'ウェハー裏面 低抵抗銅／ルテニウム専用シールド層' },
      { label: '統合受動素子', value: '裏面超高密度 MIM デカップリング容量（トランジスタ直下数μm）' },
      { label: '効果', value: '表側データ線とのノイズ干渉根絶＆クロック消費電力削減' },
    ],
    diagramType: 'xv2_backside_clock_tree',
  },

  'xv2-selfheating-phonon-via': {
    title: 'X2-29. BSPDN「自己発熱パラドックス」対策：熱フォノン散逸用ダミーサーマルビア＆CVDダイヤモンド熱拡散層',
    subtitle: 'BSPDN Self-Heating Paradox Mitigation: Thermal-Dummy Phonon-Escape Vias & CVD Diamond Spreader (2026)',
    category: 'BIONZ XR 極超解剖図 V2 X2-29 — シリコンを極薄に削ると熱がこもる「2nmの弱点」を、熱逃がしの銅柱と人工ダイヤモンド膜で解決！',
    plainAnalogy:
      '裏面電源（BSPDN）のためにシリコン基板を髪の毛の1,000分の1まで薄く削ると、実は思いがけない弱点が出ます！分厚いシリコン自体がもともと優秀な「熱の逃がし板」だったのに、それが消えて上下を断熱材みたいな絶縁膜で挟まれるため、ナノシートの熱が逃げ場を失って熱くなりやすいのです（自己発熱パラドックス！）。そこで2026年の最新熱対策では、電気を流さない「熱逃がし専用の銅柱（ダミーサーマルビア）」と、銅の4倍以上も熱を通す「人工ダイヤモンド薄膜」で熱の振動（フォノン）を一気に外へ逃がします！',
    summary:
      '2026年のサブ2nm BSPDN研究で最重要課題とされる「自己発熱パラドックス（Self-Heating Paradox）」を解決する、非電気的サーマルダミービア柱群および高熱伝導CVDナノ結晶ダイヤモンド／SiC横方向熱拡散層。',
    opticsAndPhysics: [
      '従来の775 μm厚バルクシリコン基板（熱伝導率 k ≈ 150 W/m·K）が50 nmまで削られ、熱伝導率わずか 0.5〜1.4 W/m·K のLow-k絶縁膜・SiO₂に上下を挟まれると、ナノシートの局所チャネル温度が急上昇してキャリア移動度低下や経年劣化（BTI/HCI）を招きます。',
      'そこで回路の空き領域へ電気的に絶縁された高熱伝導の「サーマルダミービア（熱専用バイパス柱）」を多数打ち込み、ナノシートから発生する結晶格子の熱振動（フォノン）を絶縁膜の壁を飛び越えて金属放熱層へ直通させます。',
      'さらにキャリアウェハー接合界面や裏面へ熱伝導率 1,500〜2,000 W/m·K（銅の4〜5倍！）を誇るCVD合成ダイヤモンドやSiC熱拡散膜を導入する研究が2026年に急速進展し、ファンレス8Kカメラの熱限界を打破しようとしています。',
    ],
    formula: {
      expression: 'k_diamond(≈1,800) ≫ k_Cu(398) ≫ k_Si(150) ≫ k_ULK(<0.5 W/m·K)  （熱バイパスで局所ΔTを劇減！）',
      description: '絶縁膜に閉じ込められた熱の振動を「熱専用の銅柱＋ダイヤモンド膜」で一気に逃がし、2nmチップを冷やし切る',
    },
    nextGenInnovation:
      '2026年9月の最先端サブ2nm GAA＋BSPDN材料科学論文でも、電気設計と熱フォノン輸送設計を同時最適化する「電気-熱協調設計（Electro-Thermal Co-Design）」がA16/18A以降の成否を分ける鍵とされています。',
    specs: [
      { label: '解決する課題', value: '極薄50nm BSPDN構造における「自己発熱パラドックス」' },
      { label: '熱逃がし柱', value: '非電気的サーマルダミー銅/タングステン・フォノンバイパスビア' },
      { label: '次世代拡散膜', value: 'CVDナノ結晶ダイヤモンド（k ≈ 1,500–2,000 W/m·K）／ SiC' },
      { label: 'カメラ恩恵', value: '高温8K動画・AI連続推論時のサーマルスロットリング＆劣化抑制' },
    ],
    diagramType: 'xv2_selfheating_phonon_via',
  },

  'xv2-unified-memory-noc': {
    title: 'X2-30. BIONZ XR2省電力の要「コヒーレント統合メモリNoC（Network-on-Chip）＆細粒度パワーゲーティング環」',
    subtitle: 'BIONZ XR2 Coherent Unified Memory Network-on-Chip (NoC) Ring & Microsecond Power-Gating Islands',
    category: 'BIONZ XR 極超解剖図 V2 X2-30 — データを何度もコピーせず全員で1つのメモリを共有し、休んでいる回路の電源を100万分の1秒で切るエコ司令塔',
    plainAnalogy:
      '前の世代（α7 IVやα7R V）のように「画像処理チップ」と「AIチップ」が別々だと、写真を何度もコピーして移動させるだけで大量の電気と熱をムダにしていました。CP+ 2026のインタビューでもα7 Vの圧倒的なバッテリー長持ち（LCD 750枚・EVF 630枚！）の秘密として注目されたのが、BIONZ XR2の「統合メモリ（Unified Memory）＆リング状チップ内高速道路（NoC）」！CPU・ISP・AI・動画エンコーダがデータをコピーせず同じメモリを共有し、仕事が終わったブロックの電源を100万分の1秒でパチッと切るから、驚くほど熱くならず電池が長持ちするのです！',
    summary:
      'ソニーα7 V／α7R VIのBIONZ XR2が達成した劇的な省電力・低発熱化の中核アーキテクチャ。キャッシュコヒーレント統合メモリ・ネットワークオンチップ（NoC）リングバスと、数百の回路ブロック単位で1マイクロ秒未満に電源を完全遮断できる細粒度パワーゲーティング・ヘッダースイッチ網。',
    opticsAndPhysics: [
      'ISPで現像途中の特徴マップをそのままゼロコピー（ポインタ渡しのみ）で統合AI NPUや動画コーデックが参照できるコヒーレント統合メモリ構造により、外部DRAMへの無駄な読み書きトラフィックを最大40〜60%削減します。',
      'リングバスの周囲に配置された「パワーゲーティング・ヘッダースイッチ（高Vth極低リークGAAトランジスタ群）」が、静止画撮影中は動画コーデックを、待機中はAI推論アレイの一部を、わずか数マイクロ秒で完全断電（漏れ電流ほぼゼロ）にします。',
      'その結果、α7 Vでは従来α7 IVを大幅に上回る処理性能（30fps連写＋AI統合＋4K60pノンクロップ）を持ちながら、バッテリー撮影枚数が約630枚（EVF）／約750枚（LCD）、25℃で4K 90分連続録画という驚異のスタミナを達成しました！',
    ],
    formula: {
      expression: 'E_total = E_compute + E_data_move   （ゼロコピー統合メモリNoC ＋ μs断電で総消費電力を劇減！）',
      description: '一番電気を食う「データの引っ越し」をゼロにし、使わない部屋のこまめな消灯で驚異のバッテリー持ちを実現',
    },
    nextGenInnovation:
      '2026年のCP+でソニー開発陣も「BIONZ XR2の最大の現場メリットは電池持ちと放熱性の劇的進化」と明言しており、先端プロセス＋ワンチップAI統合＋統合メモリNoCの三位一体がα第5・6世代の革新を支えています。',
    specs: [
      { label: '実機達成実績', value: 'Sony α7 V：EVF 630枚 / LCD 750枚・4K連続90分（25℃）' },
      { label: 'チップ内バス', value: 'キャッシュコヒーレント統合メモリ NoC（ゼロコピー共有）' },
      { label: '細粒度節電', value: 'マイクロ秒単位 電源アイランド完全遮断（Power-Gating）' },
      { label: '設計思想', value: 'CPU・ISP・AI NPU・Codec・DMAの無駄なデータ往復を根絶' },
    ],
    diagramType: 'xv2_unified_memory_noc',
  },
};
