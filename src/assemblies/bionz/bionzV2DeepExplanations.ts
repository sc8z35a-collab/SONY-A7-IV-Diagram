import { PartExplanation } from '../types';

/**
 * Phase 29B — BIONZ XR / XR2 V2 Ångström-Era, 2D TMD Monolayer, CFET, High-NA EUV, AI-CIM & 3.5D Cooling
 * Deep Expansion Explanations (+25 Parts: X2-31 – X2-55 -> 55 Total BIONZ XR V2 Parts).
 *
 * Grounded in verified 2025–2026 breakthroughs:
 * - TSMC VLSI 2026 (T1.5): N2P / A16 NanoFlex asymmetric wide/narrow GAA nanosheets & 3.5D COUPE 4.5um interposer
 * - Intel VLSI 2026 (June 2026): 18A-P "Power Boost" dual frontside+backside contact (<10mV droop, +9% iso-power) & Epi-to-Epi CFET via
 * - imec IEDM 2025 (33-7 / 40-1 / 10-1 / 10-6 / 17-3 / 41-3) & VLSI 2026: 16nm sRu air-gap + FSAV, charge-free O* & H* IL,
 *   monolayer 0.7nm MoS2/WSe2 TMD channels, 5T+1 sCFET SRAM, dual front/back BDI, A7 2:1 M1 gear ratio,
 *   direct-to-silicon microfluidic cooling (140.7°C -> 70.8°C), >110GHz GeSi EAM
 * - TSMC IEDM 2025 (2.5 / 2.2): CFET Nanosheet Cut Isolation (NCI) & Butt Contact (BCT), hybrid-orientation Si(110)/Si(100) CFET
 * - Samsung VLSI 2026 Best Paper: 42nm gate-pitch 3D Stacked FET with triple sheets & eMDI
 * - IEDM 2025 (5.7 / 28.3 / 40-5 / 13-1) & ACS Nano Nov 2026: 3D 2TnF HfZrO2 FeFET CIM, PE-ALD H2-annealed IGZO 2T0C eDRAM,
 *   perpendicular SOT-MRAM MTJ weights, Multi-Shear-Mode Silicon BAW precision clock (102ns/8hr)
 * - Intel/UCSD VLSI 2026: 300mm monolithic GaN nMOS + Si pMOS on-die IVR; ISSCC 2026 UCIe-S 56G & HBM4 2048-bit.
 */
export const BIONZ_V2_DEEP_EXPLANATIONS: Record<string, PartExplanation> = {
  'xv2-nanoflex-width-pair': {
    title: 'X2-31. TSMC N2/A16「NanoFlex 可変シート幅 GAAナノシート対」（40nm高速／15nm超高密度）',
    subtitle: 'TSMC N2/A16 NanoFlex Variable-Width GAA Nanosheet Pair (VLSI 2026 T1.5)',
    category: 'BIONZ XR 極超解剖図 V2 X2-31 — 同じシリコン基板の上で「太い全力スピード用」と「細い超省エネ用」のシート幅を自在に混ぜる魔法',
    plainAnalogy:
      'これまでのFinFETトランジスタは、水道管の太さが1種類に固定されていたので、水量を増やすには管の本数を丸ごと増やすしかありませんでした。ところがTSMCの2nm世代（N2/A16）の目玉技術「NanoFlex」は、水平に重ねたナノシートの「横幅」をチップの同じ区画の中で自由に変えられます！AIの重い計算をする場所だけ幅40nmの極太シートで爆速にし、待機中のSRAMキャッシュは幅15nmのスリムシートで超省電力＆高密度にする、究極のオーダーメイド設計です！',
    summary:
      'TSMC N2 / N2P / A16（VLSI 2026 T1.5）の革新アーキテクチャ「NanoFlex」。単一ウェハー・同一セル列内で極広幅（~40 nm）高駆動ナノシートと極狭幅（~15 nm）低リーク・高密度ナノシートをシームレス混載します。',
    opticsAndPhysics: [
      'GAAナノシートは水平リボン形状のため、リソグラフィのパターニング幅 W_eff を連続的に変えるだけで駆動電流 I_on とリーク電流 I_off のバランスをセル単位で微調整できます。',
      'BIONZ XR2のクリティカルパス（8K/120pデコードや瞳AF推論の直列演算）にはワイドセル（高駆動・短ゲート長）を配置し、周囲の9割の非クリティカル回路はショートセル（超省面積・超低電力）で組むことでチップ全体のPPAを劇的に底上げします。',
      'さらに1つのゲート配線上で異幅セル同士の境界を最小間隔で接続できるため、従来のような大規模ブロック分割ロスが不要になります。',
    ],
    formula: {
      expression: 'I_drive ∝ N_sheets × 2(W_ns + T_ns)（W_ns = 15 nm 〜 40 nm 連続可変最適化）',
      description: 'ナノシート幅 W_ns をセルごとに最適調合し、速度+15%と消費電力−30%の両立（PPA最適化）を実現',
    },
    nextGenInnovation:
      'TSMC VLSI 2026（Paper T1.5）でN2P/A16のNanoFlex量産設計手法が公開され、カメラ用AI-ISP SoCの極限省電力化と高フレームレート処理の両立に直結しています。',
    specs: [
      { label: '可変シート幅範囲', value: '約 15 nm（高密度・低電力）〜 40 nm（超高速HPC）' },
      { label: '適用プロセスノード', value: 'TSMC N2 / N2P / A16（2025–2026年量産立ち上げ）' },
      { label: '効果（PPA改善）', value: '同一ブロック内で高速セルと省エネセルを混載し面積・電力最適化' },
      { label: '最新研究出典', value: 'TSMC VLSI 2026 Paper T1.5（NanoFlex設計最適化）' },
    ],
    diagramType: 'xv2_nanoflex_width_pair',
  },

  'xv2-hybrid-orient-cfet': {
    title: 'X2-32. ハイブリッド結晶方位モノリシックCFET「Si(110) pMOS × Si(100) nMOS」（IEDM 2025 Paper 2.2）',
    subtitle: 'Hybrid-Orientation Monolithic CFET: Si(110) pMOS Stacked Vertically Under Si(100) nMOS (IEDM 2025 2.2)',
    category: 'BIONZ XR 極超解剖図 V2 X2-32 — プラスの粒が得意な「45度ひねり結晶」と、マイナスの電子が得意な「正面結晶」を上下2階建てに貼り合わせる',
    plainAnalogy:
      '実はシリコン結晶の中にも「歩きやすい向き」があります！マイナスの電気（電子）は正面の(100)向きだと猛スピードで走れますが、プラスの電気（正孔）はちょっと苦手。逆に45度ひねった(110)向きにすると正孔のスピードがなんと2.5倍も速くなります！2025年末のIEDM（Paper 2.2）では、1階に正孔が爆速な「(110)向きpMOS」、その真上の2階に電子が爆速な「(100)向きnMOS」を直接ウェハー接合して1つの縦型CFETにまとめる神ワザが実証されました。',
    summary:
      'IEDM 2025（Paper 2.2）等で実証されたハイブリッド結晶方位（Hybrid-Orientation）モノリシック／シーケンシャルCFET。nMOSとpMOSそれぞれに最適なシリコン結晶面方位を上下階層で独立割り当てし、CMOSの駆動力バランスを究極まで揃えます。',
    opticsAndPhysics: [
      '従来の単一ウェハー上のCMOSでは電子の移動度（(100)面が最高）を優先していたため、pMOSの正孔移動度が低く、pMOSを大きくしてバランスを取る必要がありました。',
      'CFETの2階建て構造を活かし、下層pMOSに Si(110)/<110> チャネル（正孔移動度が約2〜2.5倍に跳ね上がる）、上層nMOSに Si(100)/<110> チャネルをダイレクト接合＋極薄酸化膜セパレータで積層します。',
      'これによりn/p対称の超高速スイッチングと、従来比50%近い標準セル面積縮小を同時に達成できます。',
    ],
    formula: {
      expression: 'μ_hole(Si(110)) ≈ 2.5 × μ_hole(Si(100)) ＆ セル面積 ≈ 0.5×（縦積みCFET）',
      description: '電子と正孔それぞれに「最強の結晶の向き」を専用階として与え、pMOSの弱点を物理法則から克服',
    },
    nextGenInnovation:
      'IEDM 2025 Paper 2.2および2026年の1nm未満（A10 / A7）ロードマップで、シリコンCFETの限界性能をさらに20%以上引き上げる切り札として注目されています。',
    specs: [
      { label: '上下結晶面方位', value: '上層 nMOS：Si(100) ／ 下層 pMOS：Si(110) ハイブリッド接合' },
      { label: '正孔移動度向上', value: '約 2.0–2.5倍（n/p駆動電流の完全バランス化）' },
      { label: '層間絶縁シーム', value: '低温ダイレクト接合極薄SiO₂絶縁層' },
      { label: '最新研究出典', value: 'IEDM 2025 Paper 2.2（Hybrid-Orientation Stacked CFET）' },
    ],
    diagramType: 'xv2_hybrid_orient_cfet',
  },

  'xv2-2d-tmd-mos2-channel': {
    title: 'X2-33. 0.7nm原子単層「2D TMD（MoS₂ / WSe₂）蜂の巣チャネルFET」（IEDM 2025 / VLSI 2026）',
    subtitle: '0.7nm Atomic Monolayer 2D Transition-Metal Dichalcogenide (MoS2/WSe2) Channel FET with van der Waals Contacts',
    category: 'BIONZ XR 極超解剖図 V2 X2-33 — シリコンの限界を超える、わずか「原子3個分の厚み（0.7nm）」しかない蜂の巣シートの次世代トランジスタ',
    plainAnalogy:
      'シリコンは5ナノメートルより薄くすると表面がザラついて電子が引っかかり、性能がガタ落ちしてしまう「シリコンの壁」があります。そこで2025–2026年に世界中の研究所（imec・TSMC・東大・NTU）が一斉に突破口を開いたのが、モリブデン（Mo）と硫黄（S）が六角形の蜂の巣状に並んだ「2次元半導体シート（MoS₂ / WSe₂）」！厚さはたった0.7ナノメートル（原子3個分！）なのに表面が鏡のようにツルツルで、電気漏れゼロの究極の極小スイッチが作れます！',
    summary:
      'IEDM 2025（Papers 10-1, 10-6：imec）および2026年VLSI（TSMC/NTU/東大）で急進展した、膜厚わずか0.7 nmの単原子層2D遷移金属ダイカルコゲナイド（MoS₂ nFET / WSe₂ pFET）チャネルと、格子を傷つけない半金属（Bi/Sb）ファンデルワールス上部コンタクト構造。',
    opticsAndPhysics: [
      '2D TMDシートは上下表面に未結合手（ダングリングボンド）が1本も存在しないため、原子3層（0.7 nm）の極限薄さでも電子の散乱が激減し、ゲート長10 nm以下でも短チャネル効果（電流漏れ）が完全に抑えられます。',
      '従来の金属蒸着では熱い金属原子が脆い単層シートを壊して高い接触抵抗が生じていましたが、半金属ビスマス（Bi）やアンチモン（Sb）による選択的ファンデルワールス（vdW）コンタクトでフェルミ準位ピンニングを解消しました。',
      '2026年最新報告では、0.75 V駆動で 800 μA/μm 級の高駆動電流が見通せるレベルへ到達しており、ポストシリコン（A7/A5世代）のBIONZ AIコアの最有力チャネル候補です。',
    ],
    formula: {
      expression: 't_ch(1L-MoS₂) = 0.65–0.70 nm（ダングリングボンド = 0 ⇒ λ_sc < 3 nm）',
      description: '原子3個分の極限薄膜でも高移動度を保ち、ゲート長10 nm以下の「オングストローム時代」を切り拓く',
    },
    nextGenInnovation:
      'imec IEDM 2025（Papers 10-1, 10-6）およびTSMC/NTU/東大 2026年発表で、300mmファブ互換の選択成長・トップコンタクト集積が実証され、実用化が一気に現実味を帯びています。',
    specs: [
      { label: 'チャネル膜厚', value: '約 0.65–0.70 nm（S–Mo–S 原子3層 2H六方晶ハニカム）' },
      { label: 'nFET / pFET材料', value: 'MoS₂ / WS₂（n型）＆ WSe₂（p型）相補2D CMOS' },
      { label: '電極コンタクト', value: '半金属 Bi / Sb ファンデルワールス無損傷トップコンタクト' },
      { label: '最新研究出典', value: 'imec IEDM 2025（10-1, 10-6）＆ TSMC/NTU/UTokyo（2026年）' },
    ],
    diagramType: 'xv2_2d_tmd_mos2_channel',
  },

  'xv2-radical-ox-il-layer': {
    title: 'X2-34. 無電荷「O* / H* ラジカル酸化 0.5nmインターフェース層（IL）」（imec IEDM 2025 Paper 40-1）',
    subtitle: 'Charge-Free O*/H* Radical-Oxidized 0.5nm Interfacial Layer Under HfO2 (imec IEDM 2025 40-1)',
    category: 'BIONZ XR 極超解剖図 V2 X2-34 — 高誘電膜HfO₂とシリコンの間に敷く「原子2個分の超清浄クッション」で、チップの寿命と静粛性を極限へ',
    plainAnalogy:
      '2nmのGAAトランジスタでは、シリコンのシートに直接HfO₂（高誘電絶縁膜）を塗ると相性が悪くて電子が引っかかってしまいます。そこで間にたった0.5ナノメートル（原子2個分！）の極薄ガラス膜（インターフェース層＝IL）をクッションとして挟みます。2025年末のIEDM（Paper 40-1）でimecが発表したO*/H*ラジカル酸化法は、この極薄クッションから「電気のゴミ（固定電荷）」を丸ごと追放し、何年使っても電圧ズレ（NBTI劣化）が起きにくい最強のゲートを実現しました。',
    summary:
      'imecがIEDM 2025（Paper 40-1）で実証した、O*/H*活性ラジカル酸化による0.5 nm無電荷SiO₂インターフェース層（IL）。HfO₂高誘電ゲートスタック下の固定電荷とBTI劣化トラップを極限まで排除します。',
    opticsAndPhysics: [
      'GAAナノシートの全周360°（上面・下面・側面）はそれぞれ結晶面方位が異なるため、通常の酸化法では角や側壁に膜厚ムラと欠陥準位が生じやすい課題がありました。',
      'O*/H*ラジカル酸化は結晶面依存性がほぼゼロの等方性酸化を実現し、0.5 nmの極薄膜（実効酸化膜厚 EOT < 0.7 nm に貢献）でも電気的欠陥や固定電荷を劇的に抑えます。',
      'この結果、高温8K動画処理中の負バイアス温度不安定性（NBTI）および正バイアス温度不安定性（PBTI）のしきい値シフトが最小化され、10年以上の長寿命と低電圧動作マージン拡大をもたらします。',
    ],
    formula: {
      expression: 'EOT = t_IL(0.5 nm) + (ε_SiO2 / ε_HfO2) · t_HfO2 ≈ 0.75 nm（Q_fixed → 0）',
      description: 'わずか0.5 nmの無電荷ラジカルILが、極限ゲート静電制御と超高BTI信頼性を両立する',
    },
    nextGenInnovation:
      'IEDM 2025 Paper 40-1の成果は、TSMC N2/A16・Intel 18A/14A世代のGAAおよびCFETゲートスタックの信頼性壁を打ち破るコアプロセスです。',
    specs: [
      { label: 'インターフェース層厚', value: '約 0.5 nm（SiO₂原子約2層分の極限クッション）' },
      { label: '成膜手法', value: '低温 O* / H* ラジカル等方性プラズマ酸化' },
      { label: '信頼性改善', value: 'NBTI / PBTI しきい値劣化＆固定電荷を極小化' },
      { label: '最新研究出典', value: 'imec IEDM 2025 Paper 40-1（2025年12月）' },
    ],
    diagramType: 'xv2_radical_ox_il_layer',
  },

  'xv2-cfet-nci-butt-contact': {
    title: 'X2-35. CFET「ナノシート切断隔離（NCI）＆ 垂直バットコンタクト（BCT）」（TSMC IEDM 2025 Paper 2.5）',
    subtitle: 'CFET Nanosheet Cut Isolation (NCI) & Vertical Butt Contact (BCT) (TSMC IEDM 2025 2.5)',
    category: 'BIONZ XR 極超解剖図 V2 X2-35 — 隣のシートを絶縁カミソリ壁でスパッと断ち切り、L字型の垂直金属柱で上下トランジスタを最短直結する',
    plainAnalogy:
      '2階建てトランジスタ（CFET）でインバータやSRAMを作るとき、隣のトランジスタ同士がくっつかないように「極薄の絶縁カミソリ壁（NCI）」でスパッと切り離す技と、1階と2階の出力端子を上の配線まで遠回りさせずにその場で縦に直結する「L字型の垂直金属ピン（バットコンタクト＝BCT）」が不可欠です！2025年12月のIEDM（Paper 2.5）でTSMCは、この2つの超微細構造を使って48nmピッチのCFET 6T SRAMと101段リング発振器の完全動作を実証しました！',
    summary:
      'TSMCがIEDM 2025（Paper 2.5）で実証した、48 nmゲートピッチCFET向けの「ナノシート切断隔離（NCI）」と「垂直バットコンタクト（BCT）」。上層nMOSと下層pMOSのドレインをローカルに縦方向短絡し、配線混雑を劇的に解消します。',
    opticsAndPhysics: [
      'NCI（Nanosheet Cut Isolation）は、高アスペクト比の極細トレンチをエッチングして窒化シリコン（SiN）で埋め戻すことで、わずか十数nm隣のナノシート同士を完全に電気絶縁します。',
      'BCT（Butt Contact）は、従来なら上層M0/M1金属配線まで一度上がってから戻ってくる必要があったnFETとpFETのドレイン接続を、セル内部の垂直L字タングステン／モリブデン柱で最短距離（数十nm）で直結します。',
      'これによりSRAMや論理インバータの寄生容量と配線長が劇的に減り、TSMCはIEDM 2025で101段CFETリング発振器（RO）と機能する6T CFET SRAMアレイの動作を報告しました。',
    ],
    formula: {
      expression: '48 nm CPP CFET ＋ NCI絶縁切断 ＋ BCT垂直直結 ⇒ 配線長・寄生容量 ~35% 削減',
      description: '上下トランジスタ間をセル内部で直接つなぐBCTとNCIが、CFETを紙上の夢から動く回路へ変えた',
    },
    nextGenInnovation:
      'TSMC IEDM 2025 Paper 2.5は、次世代A10〜A7世代のBIONZ XR3/XR4に向けたCFET実用化の決定的なシリコン実証です。',
    specs: [
      { label: 'ゲートピッチ（CPP）', value: '48 nm（6T CFET SRAM ＆ 101段リング発振器実証）' },
      { label: '隔離構造（NCI）', value: '高アスペクトSiN極薄ナノシート切断トレンチ' },
      { label: '層間接続（BCT）', value: '垂直L字バットコンタクト（n/pドレイン直接短絡）' },
      { label: '最新研究出典', value: 'TSMC IEDM 2025 Paper 2.5（2025年12月）' },
    ],
    diagramType: 'xv2_cfet_nci_butt_contact',
  },

  'xv2-cfet-epi-via-bdi': {
    title: 'X2-36. CFET「エピ対エピ垂直ビア ＆ 表裏ダブルBDI絶縁壁」（Intel / imec VLSI 2026）',
    subtitle: 'CFET Epi-to-Epi Vertical Via & Dual Front/Back Bottom Dielectric Isolation (VLSI 2026)',
    category: 'BIONZ XR 極超解剖図 V2 X2-36 — 上下の結晶同士をまっすぐ貫く極細ビアと、下層からの電気漏れを塞ぐ表裏ダブル絶縁床で電流を5倍へ',
    plainAnalogy:
      '2階建てCFETの最大の悩みは「1階（下層）のトランジスタが奥底にあるせいで配線の抵抗が大きく、電流がチョロチョロしか流れない＆地面へ電気が漏れる」ことでした。2026年6月のVLSIシンポジウムで、Intelは上下のソース・ドレイン結晶をそのまま貫く「エピ対エピ垂直ビア」を、そしてimecは表と裏の両側から絶縁床を差し込む「デュアルBDI」を発表！下層トランジスタの抵抗が1753から378 Ω·μmへと4分の1以下になり、駆動電流が一気に5倍・歩留まりも45%→85%へ激増しました！',
    summary:
      'Intel（VLSI 2026）の「Epi-to-Epi垂直ビア」と、imec（VLSI 2026）の「表裏デュアル底部誘電体隔離（Dual Front/Back BDI）」を組み合わせた先端CFET接続・隔離構造。下層pFETのアクセス抵抗を激減させます。',
    opticsAndPhysics: [
      '底部誘電体隔離（BDI: Bottom Dielectric Isolation）は、チャネルの下をシリコン基板から窒化シリコン絶縁床で完全分離することで、サブフィン・リーク電流と寄生容量を根絶します。',
      'imec VLSI 2026では表面と裏面からの2段階BDI形成により、下層pFETのアクセス抵抗を 1753 Ω·μm → 378 Ω·μm へ劇的低減し、駆動電流5倍増とウェハー歩留まり 45% → 85% を達成しました。',
      'さらにIntel VLSI 2026のEpi-to-Epi垂直ビアが上下のSiP/SiGeエピタキシャル結晶同士を低抵抗で縦断接続し、2階建てCFETの高速化を完成させます。',
    ],
    formula: {
      expression: 'R_access: 1753 → 378 Ω·μm ／ I_on(Bottom pFET): 5× ／ Yield: 45% → 85%',
      description: '表裏ダブルBDIとエピ対エピ垂直ビアが、CFET下層デバイスの高抵抗ボトルネックを一挙解消',
    },
    nextGenInnovation:
      '2026年6月のVLSIシンポジウムでIntelとimecが同時発表した両技術は、CFET量産化を阻んでいた「下層性能劣化」を突破する歴史的ブレイクスルーです。',
    specs: [
      { label: 'アクセス抵抗低減', value: '1,753 Ω·μm → 378 Ω·μm（約78%削減）' },
      { label: '下層pFET駆動電流', value: '従来構造比 約 5倍（ウェハー歩留まり 45% → 85%）' },
      { label: '隔離・接続構造', value: 'Dual Front/Back BDI絶縁床 ＋ Epi-to-Epi 垂直タングステンビア' },
      { label: '最新研究出典', value: 'Intel / imec VLSI 2026（2026年6月）' },
    ],
    diagramType: 'xv2_cfet_epi_via_bdi',
  },

  'xv2-samsung-42nm-emdi-fet': {
    title: 'X2-37. 42nmゲートピッチ「3+3枚ナノシート＆内蔵eMDI縦積みFET」（Samsung VLSI 2026 Best Paper）',
    subtitle: '42nm Gate-Pitch 3D Stacked FET with Triple Nanosheets per Polarity & Embedded MDI (Samsung VLSI 2026 Best Paper)',
    category: 'BIONZ XR 極超解剖図 V2 X2-37 — わずか42ナノメートルの狭い幅に「下3枚＋絶縁仕切り＋上3枚」の計6段シートを詰め込んだ世界最優秀賞構造',
    plainAnalogy:
      'マンション1部屋分の幅（たった42ナノメートル！）の中に、1階に3枚のp型シート、2階に3枚のn型シートの合計6枚もの極薄シートをぎゅっと縦積みし、ちょうど真ん中に「内蔵の絶縁仕切り板（eMDI）」をピッタリ挟み込みました！2026年6月のVLSIシンポジウムでSamsungが「最優秀論文賞（Best Paper）」を受賞した世界最狭クラスの3D縦積みトランジスタで、将来のカメラ用AIプロセッサを今の半分の面積へ凝縮できる夢の設計図です。',
    summary:
      'Samsung ElectronicsがVLSI 2026で最優秀論文賞（Best Paper）を獲得した、世界最小クラス42 nmゲートピッチ（CPP）の3D縦積みFET。上下各3枚（計6枚）のナノシートの中央に内蔵中間誘電体隔離（eMDI）を組み込んでいます。',
    opticsAndPhysics: [
      '42 nmという極めてタイトなコンタクトポリピッチ（CPP）の中で、下側3枚のpFETシートと上側3枚のnFETシートを同一の垂直軸上に完全自己整合で積み上げています。',
      '中央の組み込み中間誘電体隔離層（eMDI: embedded Middle Dielectric Isolation）が、上層nFETと下層pFETのゲート仕事関数金属（WFM）とソース・ドレイン電界を完全に分離し、クロストークやショートを防ぎます。',
      '1極性あたり3枚ものナノシートを確保しているため、高密度化と大電流駆動（AI行列演算や高速画像パイプライン向け）を妥協なく両立できます。',
    ],
    formula: {
      expression: 'CPP = 42 nm, N_sheets = 3 (nFET) + eMDI + 3 (pFET) = 6 Stacked Channels',
      description: '42nm超狭ピッチと6層トリプルシート＋eMDI内蔵分離により、2026年時点の3D縦積みトランジスタ記録を更新',
    },
    nextGenInnovation:
      'Samsung VLSI 2026 Best Paperの実証により、42nmピッチ世代（1nm級ロジック）の3D縦積みFET量産プロセスが具体的に見えてきました。',
    specs: [
      { label: 'ゲートピッチ（CPP）', value: '42 nm（超狭ピッチ3D縦積みFET）' },
      { label: 'チャネル段数', value: '下層3枚（pFET）＋ eMDI仕切り ＋ 上層3枚（nFET）' },
      { label: '層間分離技術', value: 'eMDI（Embedded Middle Dielectric Isolation）' },
      { label: '最新研究出典', value: 'Samsung Electronics VLSI 2026 Best Paper（2026年6月）' },
    ],
    diagramType: 'xv2_samsung_42nm_emdi_fet',
  },

  // =========================================================================
  // TIER 2 — 18A-P DUAL POWER BOOST, 16nm sRu AIR-GAP, HIGH-NA EUV & BTI (X2-38 – X2-43)
  // =========================================================================

  'xv2-18ap-dual-power-boost': {
    title: 'X2-38. Intel 18A-P「Power Boost 表裏デュアル同時給電コンタクト」（VLSI 2026）',
    subtitle: 'Intel 18A-P Dual-Sided Frontside + Backside PowerVia Contact Architecture (VLSI 2026)',
    category: 'BIONZ XR 極超解剖図 V2 X2-38 — 同じトランジスタの電極へ「表側」と「裏側」の両方から同時に電気を流し込み、電圧降下を10分の1に叩き潰す',
    plainAnalogy:
      'これまでの裏面電源（PowerVia / SPR）は「裏側からだけ」電気を送っていましたが、大勢のAIコアが一斉に動き出す瞬間はそれでも電圧が一瞬ガクッと下がる（ドロップする）ことがありました。そこで2026年6月のVLSIでIntelが発表した「18A-P Power Boost」は、なんと1つのソース・ドレイン結晶に対して「上（表側M0）」と「下（裏側PowerVia）」の両方からサンドイッチ式に同時給電する世界初のデュアルコンタクト！瞬間電圧降下が90mV超→10mV未満へ10分の1になり、低電圧0.5V時のクロックが30%も跳ね上がります！',
    summary:
      'IntelがVLSI 2026（2026年6月18日）で発表した「18A-P Power Boost」表裏両面デュアルコンタクト構造。同一のエピタキシャルS/D結晶へ表側コンタクトと裏面PowerViaを同時接続し、寄生抵抗・電圧降下・放熱性能を一挙革新します。',
    opticsAndPhysics: [
      '表側と裏側の2ルート並列で電流を供給するため、コンタクト抵抗と電源網インピーダンスが劇的に下がり、急峻な負荷変動時の動的電圧ドロップが従来の >90 mV から <10 mV へ約10分の1に激減します。',
      '同一消費電力（0.75 V）で性能が +9% 向上し、バッテリー駆動カメラで多用する超低電圧領域（0.5 V）では動作周波数がなんと +30% も伸びます。',
      'さらに両面の金属柱が熱の逃げ道（サーマルビア）も兼ねるため、トランジスタ直下の熱スタック抵抗が20〜40%も改善し、8K長時間撮影時のサーマルスロットリングを防ぎます。',
    ],
    formula: {
      expression: 'ΔV_droop: >90 mV → <10 mV（1/10） ／ Freq @ 0.5V: +30% ／ R_th: −20〜40%',
      description: '表裏サンドイッチ給電により、電圧マージン削減・超低電圧高速化・放熱強化の三冠を達成',
    },
    nextGenInnovation:
      'VLSI 2026発表の18A-P Power Boostは、裏面給電（BSPDN）を第1世代から「表裏協調ハイブリッド給電」の第2世代へ進化させた象徴的アーキテクチャです。',
    specs: [
      { label: '動的電圧降下（Droop）', value: '< 10 mV（従来表側PDN > 90 mV 比 約10分の1）' },
      { label: '性能／低電圧ブースト', value: '+9% @ 0.75V（同電力）／ +30% 周波数 @ 0.5V' },
      { label: '熱抵抗改善', value: 'スタック熱抵抗 20〜40% 改善（両面放熱パス）' },
      { label: '最新研究出典', value: 'Intel 18A-P Power Boost, VLSI 2026（2026年6月18日）' },
    ],
    diagramType: 'xv2_18ap_dual_power_boost',
  },

  'xv2-sru-16nm-fsav-airgap': {
    title: 'X2-39. 16nmピッチ「減算エッチング・ルテニウム（sRu）空洞配線＆完全自己整合ビア（FSAV）」（IEDM 2025 33-7 / VLSI 2026）',
    subtitle: '16nm-Pitch Subtractive Ruthenium (sRu) Air-Gap Interconnect & Fully Self-Aligned Via (FSAV)',
    category: 'BIONZ XR 極超解剖図 V2 X2-39 — 銅より細くても電気を通す希少金属ルテニウムの配線を「空気の谷間」で浮かべ、ビア突き抜けもゼロにする',
    plainAnalogy:
      'チップの最下層配線が幅8ナノメートル（ピッチ16nm）まで細くなると、定番の「銅（Cu）」は壁のバリア膜ばかり分厚くなって電気が流れなくなってしまいます。そこで2025年末IEDM（Paper 33-7）と2026年VLSIでimec・Intelが実証したのが「減算ルテニウム（sRu）配線＋エアギャップ」！バリア膜いらずの白金族ルテニウムを直接削り出して並べ、配線の間をガラスではなく「空気（誘電率1.0）」のまま空洞にすることで、信号の遅れ（RC遅延）を激減させつつ、上のビア（FSAV）がズレても短絡しない安全構造に仕上げました。',
    summary:
      'imec（IEDM 2025 Paper 33-7）およびIntel（VLSI 2026）が実証した、16 nmピッチ（線幅8 nm／間隔8 nm）の減算エッチング・ルテニウム（sRu）配線、エアギャップ絶縁、および完全自己整合ビア（FSAV）の統合BEOL構造。',
    opticsAndPhysics: [
      'ルテニウム（Ru）は電子の平均自由行程が銅の約6分の1（~6.6 nm）と極短いため、線幅8 nmまで細くしても表面散乱による抵抗上昇が小さく、しかも拡散防止のTaNバリア膜なしで直接配線できます。',
      '従来のダマシン法（溝を掘って埋める）ではなく「減算エッチング（金属を先に敷いて不要部分を削る）」を使うことで、配線の間に自然なエアギャップ空洞（k ≈ 1.0）を容易に形成し、線間容量を30〜40%削減します。',
      '上部ビアがわずかに位置ズレしても下のエアギャップへ突き抜けない「完全自己整合ビア（FSAV）」保護キャップにより、経時絶縁破壊（TDDB）寿命と信頼性が劇的に向上します。',
    ],
    formula: {
      expression: 'Pitch = 16 nm (8 nm Ru Line + 8 nm Air-Gap Space), k_eff → ~1.4（RC遅延激減）',
      description: 'バリアレス減算Ru＋空気の谷間＋FSAV保護により、1nm時代の配線RCボトルネックを打ち破る',
    },
    nextGenInnovation:
      'IEDM 2025 Paper 33-7とIntel VLSI 2026により、銅ダマシン配線30年の歴史を塗り替える「減算ルテニウム＋エアギャップ」が1.4nm〜1nm（14A/A10）世代の本命技術となりました。',
    specs: [
      { label: '最小配線ピッチ', value: '16 nm（金属幅 8 nm ／ エアギャップ間隔 8 nm）' },
      { label: '配線金属・加工法', value: 'バリアレス減算エッチング・ルテニウム（Subtractive Ru）' },
      { label: 'ビア信頼性構造', value: 'FSAV（完全自己整合ビア：エアギャップ突抜け・TDDB防止）' },
      { label: '最新研究出典', value: 'imec IEDM 2025 Paper 33-7 ＆ Intel VLSI 2026' },
    ],
    diagramType: 'xv2_sru_16nm_fsav_airgap',
  },

  'xv2-highna-euv-mor-ler': {
    title: 'X2-40. High-NA EUV（0.55 NA）「アナモルフィック露光 ＆ 金属酸化物レジスト（MOR）LERガード」（2026年量産突入）',
    subtitle: 'High-NA EUV (0.55 NA, 13.5nm) Anamorphic Lithography & Metal-Oxide Resist (MOR) Stochastic LER Guard',
    category: 'BIONZ XR 極超解剖図 V2 X2-40 — 縦横4倍×8倍の特殊ミラーと「スズの金属レジスト」で、光の粒のバラつきを抑えて14nmの超微細回路を1発焼き付け',
    plainAnalogy:
      '2nmより細かい回路を描く「High-NA EUV露光機（開口数0.55）」は、波長13.5nmの極端紫外線を使って、映画のアナモルフィックレンズのように縦と横を4倍・8倍と違う倍率で縮小して1発で焼き付けます！ところが光が細かすぎて、降り注ぐ光子の粒の数がまばらになり、配線のフチがギザギザ（確率的欠陥・LER）になりやすい大問題がありました。2026年に量産100万ウェハーを突破した最新解決策が、EUV光をたっぷり吸収する「スズ系メタルオキサイドレジスト（MOR）」です！',
    summary:
      '2026年9月にIntel Foundryが処理ウェハー100万枚突破を報告した0.55 NA High-NA EUVリソグラフィと、14〜16 nmハーフピッチで確率的ラインエッジラフネス（LER）を抑え込む金属酸化物レジスト（MOR：Wet / Dry）微細加工層。',
    opticsAndPhysics: [
      '0.55 NA（従来0.33 NAから67%増大）の反射光学系は、マスクの影（シャドーイング効果）を避けるためX軸4倍・Y軸8倍の非等方「アナモルフィック縮小投影」を採用し、単一露光で8 nm分解能・14〜16 nmハーフピッチを実現します。',
      '従来の高分子化学増幅レジスト（CAR）ではEUV光子吸収率が低くショットノイズ欠陥が多発しましたが、スズ酸化物クラスター（Sn-oxo）骨格のMORはEUV吸収断面積が数倍高く、20〜40 mJ/cm²の線量でエッジ荒れ（LER ~3 nm台）とナノブリッジ欠陥を激減させます。',
      '2026年5月のJSR/Inpria・Entegris・Lam Research（AetherドライMOR）の協業・和解により、Intel 14AやTSMC A14P/A10向けの次世代MOR量産エコシステムが本格始動しました。',
    ],
    formula: {
      expression: 'CD_min = k₁ · (λ / NA) = 0.30 × (13.5 nm / 0.55) ≈ 7.4 nm（4×/8× アナモルフィック）',
      description: '0.55 NA高開口ミラーと高吸収MORレジストにより、マルチパターニング不要の単一露光極限微細化を実現',
    },
    nextGenInnovation:
      '2026年秋時点でIntelがHigh-NA EUV量産層へ適用開始（累計100万ウェハー超）、Samsungも2nm級で導入開始、TSMCもA14P/A10へ向けたエコシステム整備を加速しています。',
    specs: [
      { label: '露光波長／開口数', value: '13.5 nm EUV ／ 0.55 NA（4× / 8× アナモルフィック光学系）' },
      { label: '次世代レジスト', value: 'スズ系メタルオキサイドレジスト（Wet MOR / Lam Aether Dry MOR）' },
      { label: '解像・LER目安', value: '14–16 nm ハーフピッチ ／ Dose 20–40 mJ/cm² ／ LER ~3 nm台' },
      { label: '2026年量産状況', value: 'Intel High-NA処理ウェハー100万枚突破（2026年9月）' },
    ],
    diagramType: 'xv2_highna_euv_mor_ler',
  },

  'xv2-a7-gear-ratio-m1': {
    title: 'X2-41. A7世代「ギア比 2:1 M0→M1 ピンアクセス配線コム」（imec VLSI 2026）',
    subtitle: 'A7-Node 2:1 Gear-Ratio M0-to-M1 Pin-Access Routing Comb (imec VLSI 2026)',
    category: 'BIONZ XR 極超解剖図 V2 X2-41 — 超細いローカル配線2本ごとに広めの通り1本を規則正しく噛み合わせ、1nm未満チップの「配線渋滞」を解く',
    plainAnalogy:
      'トランジスタがどれほど小さくなっても、そのすぐ上の配線（M0とM1）がゴチャゴチャに渋滞してピンにつながれなければチップは縮まりません！そこでimecが2026年のVLSIで提案したA7（0.7nm級）標準セルの知恵が「ギア比2:1配線コム」— 歯車のように下の極細M0配線2本に対して上のM1配線をちょうど2倍ピッチで規則正しく噛み合わせることで、自動配線ツールが迷わず100%ピンへアクセスでき、チップ面積をムダなく詰め切れます。',
    summary:
      'imecがVLSI 2026で発表したA7（サブ1nm）ロジック向けDTCO（設計・プロセス協調最適化）の核となる、M0〜M1層間「2:1ギア比（Gear Ratio）」ピンアクセス配線構造。',
    opticsAndPhysics: [
      '従来のようにM0とM1のピッチ比が半端（例：1.33:1など）だと、標準セルのピン位置と上層M1トラックがズレて「ピンアクセス不能」な箇所が多発し、セル使用率が低下していました。',
      'M0とM1を厳密な整数比「2:1ギア比」で揃えることで、全セルの入出力ピンが周期的にM1直下へ整列し、ビア配置の自由度と製造マージン（オーバーレイ耐性）が劇的に向上します。',
      '裏面電源（BSPDN）で電源線を下へ追い出したあとの表面配線リソースを100%信号配線へ振り向けることで、BIONZ XR2の巨大なAIニューラル網の配線長も短縮されます。',
    ],
    formula: {
      expression: 'Pitch(M1) / Pitch(M0) = 2 : 1（整数ギア比DTCO ⇒ ピンアクセス衝突ゼロ）',
      description: '極細M0配線とM1幹線を歯車のように2:1同期させることで、A7世代の配線渋滞と面積ロスを解消',
    },
    nextGenInnovation:
      'imec VLSI 2026のA7ロードマップ研究では、CFET・裏面給電・2:1ギア比M1ルーティングの三位一体（DTCO）により4トラック級の極限標準セル高さを実現しています。',
    specs: [
      { label: '配線ピッチ比', value: 'M1 : M0 = 2 : 1 整数ギア比（Gear-Ratio Routing）' },
      { label: '対象世代', value: 'A10〜A7（1.0 nm 〜 0.7 nm 級次世代DTCO標準セル）' },
      { label: '改善効果', value: 'ピンアクセス渋滞解消・ビア重複エラー低減・セル稼働率向上' },
      { label: '最新研究出典', value: 'imec VLSI 2026（A7 Logic DTCO & Pin-Access Roadmap）' },
    ],
    diagramType: 'xv2_a7_gear_ratio_m1',
  },

  'xv2-nbti-pbti-trap-monitor': {
    title: 'X2-42. オンダイ原子水素トラップ「NBTI / PBTI 経年劣化リアルタイム監視カナリアセル」',
    subtitle: 'On-Die Atomic Hydrogen-Trap NBTI/PBTI Aging Canary Ring-Oscillator Monitor Cell',
    category: 'BIONZ XR 極超解剖図 V2 X2-42 — わざとハードに働かせた「おとり回路」の疲れ具合を測り、10年先まで電圧をピッタリ最適化して壊れないようにする',
    plainAnalogy:
      '半導体も人間と同じで、暑い環境で何年も全速力で働き続けると、ゲート絶縁膜の境目から水素原子が少しずつ抜けて動きがわずかに鈍くなります（NBTI/PBTI経年劣化）。昔はそれに備えて新品のときから「余計な高電圧（安全マージン）」をずっと掛けて電気をムダにしていました。そこで最新SoCには、普段休ませている「元気な基準リング」と、わざと酷使する「おとりリング（カナリア）」を並べて置き、2つの速度差からチップの疲れ具合を測って、今ちょうど必要な最小電圧だけを供給する賢い健康診断セルが入っています！',
    summary:
      'ゲート酸化膜界面での水素解離・電子捕獲に伴うしきい値シフト（ΔV_th：NBTI/PBTI劣化）を実働中にリアルタイム計測する、双子リング発振器型オンダイ信頼性カナリアモニタ。適応型電圧スケーリング（AVFS）の安全マージンを削ぎ落とします。',
    opticsAndPhysics: [
      '「基準リング（普段はパワーゲートOFFで劣化ゼロ）」と「ストレス監視リング（実回路と同じか少し厳しいDC/ACバイアスを受け続ける）」の発振周波数差（ビート周波数 Δf）をデジタルカウンタで精密測定します。',
      'Δf から逆算した現在の ΔV_th 劣化量に応じて、チップの新品時は電圧ガードバンドを極限まで下げて大幅省電力化し、数年後にわずかに劣化が進んだ分だけミリボルト単位で自動補償します。',
      'プロカメラマンの過酷な8K長時間連続録画・炎天下撮影環境でも、動作不良（タイミング違反）ゼロとバッテリー持続時間最大化を10年スパンで両立します。',
    ],
    formula: {
      expression: 'Δf_beat / f₀ ≈ −k · ΔV_th(t) / (V_DD − V_th0) ⇒ 適応ガードバンド AVFS制御',
      description: '新品時の過剰な安全電圧マージンを削りつつ、経年変化を自動補正して10年無故障を保証する',
    },
    nextGenInnovation:
      '2025–2026年の2nm GAA SoCでは、自己発熱とBTI劣化が局所的に偏るため、チップ内数十箇所へ超小型カナリアモニタを分散配置してAI電源管理（PMU）へ直結させています。',
    specs: [
      { label: '計測方式', value: '無ストレス基準リング vs 連続ストレス監視リング位相差比較' },
      { label: '検出精度', value: 'しきい値電圧シフト ΔV_th < 1.0 mV 分解能' },
      { label: '省電力効果', value: '静的ガードバンド削減によりチップ消費電力 約 8–15% 節減' },
      { label: '連携機能', value: 'オンダイAVFS（適応型電圧周波数制御）＆ 予防診断テレメトリ' },
    ],
    diagramType: 'xv2_nbti_pbti_trap_monitor',
  },

  'xv2-backside-ntsv-landing': {
    title: 'X2-43. 裏面「ナノTSV シリサイド着地パッド ＆ キャリアウェハー接合シーム」',
    subtitle: 'Backside Nano-TSV Hexagonal Silicide (TiSi2/NiSi) Landing Pad & Carrier Wafer Bond Seam',
    category: 'BIONZ XR 極超解剖図 V2 X2-43 — 1マイクロメートル以下に削り込んだシリコンの裏側から、銅の極細柱を六角形の金属パッドへ一発着地させる',
    plainAnalogy:
      '裏面電源（TSMC A16 SPRやIntel PowerVia）を作る工程は、まさに神業の連続！トランジスタを作ったウェハーを別の支えウェハー（キャリア）にピタッと貼り付けてひっくり返し、裏側のシリコンをなんと「厚さ1マイクロメートル以下（紙の100分の1！）」まで極限研磨します。そこから小さな穴を掘って銅のナノTSVを落とし、トランジスタ直下の六角形シリサイド金属パッドへピタリと着地させて、電気抵抗ほぼゼロの超短距離電源ルートを貫通させます！',
    summary:
      '裏面電源網（BSPDN）と表側FEOLトランジスタを結ぶ、超極薄化シリコン貫通ナノTSV（nTSV）、低抵抗金属シリサイド（TiSi₂ / NiSi / CoSi₂）着地パッド、およびキャリアウェハー酸化膜接合シーム。',
    opticsAndPhysics: [
      'シリコンと金属を直接くっつけるとショットキー障壁で高い接触抵抗が生じますが、着地界面を高温反応させて六角・結晶性シリサイド（TiSi₂ / NiSi）合金層にすることで、比接触抵抗率 ρ_c < 10⁻⁹ Ω·cm² という金属並みのオーミック接触を実現します。',
      'ナノTSVは径100〜200 nmの緩やかなテーパー形状に加工し、内壁をTaN/TiN拡散バリアとSiO₂絶縁ライナーで包むことで、銅原子が敏感なシリコンチャネルへ染み出す（銅汚染）のを完全阻止します。',
      '研磨時のナノメートル級厚み均一性制御（エッチストップ層利用）とキャリアウェハーの無ボイド酸化膜接合が、300mmウェハー全面での高歩留まりを支えます。',
    ],
    formula: {
      expression: 'ρ_c(Silicide Landing) < 1 × 10⁻⁹ Ω·cm², t_Si(Thinned) < 0.5–1.0 μm',
      description: '極薄1μm未満シリコンを貫くテーパー銅ナノTSVとシリサイド着地パッドが究極の低抵抗給電を実現',
    },
    nextGenInnovation:
      '2025–2026年量産開始のIntel 18A PowerViaおよびTSMC A16 Super Power Railの歩留まりとIRドロップ性能を決定づける中核プロセス構造です。',
    specs: [
      { label: '極薄化シリコン厚', value: '< 0.5–1.0 μm（エッチストップ精密裏面研磨）' },
      { label: '着地界面金属', value: '低抵抗シリサイド（TiSi₂ / NiSi：ρ_c < 10⁻⁹ Ω·cm²）' },
      { label: 'ナノTSV構造', value: 'テーパーCuコア ＋ TaNバリア ＋ SiO₂ライナー' },
      { label: '適用ノード', value: 'Intel 18A/18A-P PowerVia ／ TSMC A16 Super Power Rail' },
    ],
    diagramType: 'xv2_backside_ntsv_landing',
  },

  // =========================================================================
  // TIER 3 — 5T+1 sCFET SRAM, 3D FeFET CIM, IGZO 2T0C, SOT-MRAM, GaN IVR & UCIe/HBM4 (X2-44 – X2-50)
  // =========================================================================

  'xv2-scfet-5t1-sram': {
    title: 'X2-44. imec VLSI 2026「5T+1 スプリットゲート sCFET 超高密度SRAMセル」（面積−12.5%）',
    subtitle: 'imec VLSI 2026 5T+1 Split-Gate Sequential CFET SRAM Bitcell (-12.5% Area, +15% Write Speed)',
    category: 'BIONZ XR 極超解剖図 V2 X2-44 — 6個必要だったSRAMのトランジスタを「上下合体の1組パスゲート」へ進化させ、面積を12.5%縮めつつ書き込みも高速化',
    plainAnalogy:
      'BIONZ XRのチップ面積の約3〜4割を占めるのが超高速メモリ「6T SRAM」（1ビット記憶するのにトランジスタを6個使用）。ところが2nm世代からはSRAMの縮小がピタッと止まってしまう壁にぶつかりました。2026年6月のVLSIでimecが発表した「5T+1 sCFET SRAM」は、データを出し入れする2つのドア（パスゲート）を上下に重ねた1つの「n/p合体スプリットゲート」へ統合！面積をさらに12.5%も縮めながら、書き込み速度まで最大15%速くする逆転の発想です！',
    summary:
      'imecがVLSI 2026で発表した次世代「5T+1」スプリットゲートsCFET SRAMビットセル。通常の6T SRAMのデュアルnFETパスゲートを、1つの縦積み相補型CFETトランスミッションゲートへ置き換えることで、極限微細化と書き込みマージン向上を同時達成します。',
    opticsAndPhysics: [
      '従来の6T SRAMは微細化すると「読み出し安定性（SNM）」と「書き込みやすさ（Write Margin）」が真っ向からケンカし、大掛かりなライトアシスト回路が必要でした。',
      '5T+1 sCFET構造では、記憶ラッチ（2組の縦積みCFETインバータ）の片側入口へnMOSとpMOSを縦積みした1組のスプリットゲート・トランスミッションゲートを配し、0も1もフルスイングで力強く書き込めます。',
      'その結果、同ピッチの6T CFET SRAMよりさらにセル面積を12.5%削減しつつ、書き込み速度を +7〜15% 向上させ、BIONZ XR2のラインバッファ＆NPU重みキャッシュ容量を劇的に増やせます。',
    ],
    formula: {
      expression: 'Area(5T+1 sCFET) = 0.875 × Area(6T CFET)（−12.5%） ／ Write Speed: +7〜15%',
      description: '縦積みトランスミッションゲート1組で従来の2個パスゲートを置き換え、SRAMスケーリングの壁を再突破',
    },
    nextGenInnovation:
      'imec VLSI 2026で実証設計が示された5T+1 sCFET SRAMは、A10/A7世代のオンチップ超大容量画像バッファの標準候補です。',
    specs: [
      { label: 'ビットセル構成', value: '5T+1（2組CFETインバータ ＋ 1組縦積みn/pスプリット伝送ゲート）' },
      { label: '面積削減効果', value: '6T CFET比 −12.5%（従来GAA 6T比では約半減）' },
      { label: '書き込み高速化', value: '+7% 〜 +15%（低電圧ライトマージン大幅改善）' },
      { label: '最新研究出典', value: 'imec VLSI 2026（Split-Gate sCFET 5T+1 SRAM）' },
    ],
    diagramType: 'xv2_scfet_5t1_sram',
  },

  'xv2-3d-fefet-2tnf-cim': {
    title: 'X2-45. 3D垂直「2TnF HfZrO₂ 強誘電体ゲインセル AI-Attention CIM」（IEDM 2025 5.7 / 28.3）',
    subtitle: 'Monolithic 3D Vertical 2TnF HfZrO2 Ferroelectric Gain-Cell Compute-in-Memory for Transformer AI (IEDM 2025)',
    category: 'BIONZ XR 極超解剖図 V2 X2-45 — 電源を切っても記憶が消えない「強誘電体の縦長柱」の中で、AIの掛け算そのものを直接やってのける',
    plainAnalogy:
      'カメラのAI被写体認識（人間・動物・鳥・昆虫の瞳認識）が電池を食う一番の理由は、巨大なAIの重みデータを毎回メモリから計算機へ運ぶ「データ移動の電気代」です。2025年末のIEDM（Papers 5.7 & 28.3）でシリコン実証された「3D強誘電体FeFET CIM（インメモリ計算）」は、ハフニウム・ジルコニウム酸化膜（HfZrO₂）の電気の向き（分極）としてAIの重みを縦長メモリ柱に記憶し、そこに電圧をかけるだけでメモリの中から直接「掛け算の答え」が電流として出てくる、データ移動ゼロの革命AIエンジンです！',
    summary:
      'IEDM 2025（Papers 5.7, 28.3：520-kbデュアルマクロ・シリコン実証含む）で発表された、3D垂直2TnF型HfZrO₂（HZO）強誘電体ゲインセルCompute-in-Memory（CIM）。電源OFFでも不揮発にAI重みを保持し、Transformer注意機構の行列積をメモリ内で超低消費電力実行します。',
    opticsAndPhysics: [
      'ゲート絶縁膜に混ぜた極薄のHf₀.₅Zr₀.₅O₂（HZO）結晶は、電圧パルスで内部の酸素イオン位置を上下に反転させ、電源を切っても分極状態（しきい値電圧 V_th の多値レベル）を保ち続ける強誘電体です。',
      '2TnFゲインセル構造と3D垂直シリンダー積層により、高密度と非破壊読み出し・高耐久（>10¹⁰回）を両立し、複数段のワード線へ入力ベクトルを同時印加するとオームの法則＆キルヒホッフの法則で積和演算（MAC）が一瞬で完了します。',
      'カメラの電源を入れた瞬間（0.1秒未満）からAI認識モデルの読み込み待ちゼロで即起動でき、消費電力も従来のSRAM＋別体NPU構成から桁違いに下げられます。',
    ],
    formula: {
      expression: 'I_BL = Σ_i (G_FeFET,i · V_WL,i)（メモリ柱内で物理法則により直接MAC演算完了）',
      description: 'HfZrO₂強誘電体コンダクタンスにAI重みを不揮発格納し、フォンノイマン移動ボトルネックを消滅させる',
    },
    nextGenInnovation:
      'IEDM 2025で520-kbデュアルマクロFeFET CIMチップの実機動作と3D垂直2TnF Transformer加速が実証され、エッジAIカメラSoCの次期本命となっています。',
    specs: [
      { label: '強誘電体材料', value: 'CMOS完全互換 Hf₀.₅Zr₀.₅O₂（HZO）斜方晶強誘電薄膜' },
      { label: 'セル・実装構造', value: '3D垂直2TnFゲインセル（520-kb デュアルマクロ実機検証済）' },
      { label: 'AI演算メリット', value: '電源OFF不揮発保持・データ移動ゼロ・瞬時AI起動' },
      { label: '最新研究出典', value: 'IEDM 2025 Papers 5.7 & 28.3（2025年12月）' },
    ],
    diagramType: 'xv2_3d_fefet_2tnf_cim',
  },

  'xv2-igzo-2t0c-edram': {
    title: 'X2-46. PE-ALD水素アニール「IGZO 2T0C コンデンサレス組込みDRAM」（IEDM 2025 40-5 / ACS Nano 2026）',
    subtitle: 'PE-ALD H2-Annealed Indium-Gallium-Zinc-Oxide (IGZO) 2T0C Capacitorless Embedded DRAM',
    category: 'BIONZ XR 極超解剖図 V2 X2-46 — 巨大なコンデンサなしで6ビット記憶を4000秒以上も保ち、配線層の上に直接積み上げられる「酸化物メモリ」',
    plainAnalogy:
      '普通のDRAMは電気を貯めるために背の高い巨大なコンデンサが必要で、しかも0.06秒ごとに充電し直さないとデータが消えます。ところが2025年末IEDM（40-5）や2026年11月ACS Nanoで驚異の記録を達成した「IGZO 2T0Cメモリ」は、電気漏れがシリコンの「100億分の1以下」という酸化物半導体（IGZO）を書き込みスイッチに使うことで、コンデンサを丸ごと撤去！たった2個のトランジスタだけで6ビットもの情報を4000秒（1時間以上！）も保持でき、しかも300℃以下の低温でロジック配線層の上に何階でも直接積み上げられます！',
    summary:
      'IEDM 2025（Paper 40-5：水素アニールPBTI高信頼化）およびACS Nano（2026年11月：PE-ALD高密度IGZO）で大幅進化した、2トランジスタ・0キャパシタ（2T0C）酸化物半導体組込みeDRAM。BIONZ XR2のBEOL上層へモノリシック3D積層し、AI重みロードを77倍高速化します。',
    opticsAndPhysics: [
      'ワイドバンドギャップ（~3.2 eV）のアモルファスIGZO（In-Ga-Zn-O）はオフ時のリーク電流が 10⁻¹⁹ A/μm オーダーと究極に低いため、次の読み出しトランジスタの極小ゲート容量そのものを記憶キャパシタとして使えます（0C＝コンデンサレス！）。',
      'ACS Nano 2026年11月論文では、300°C未満の最適化PE-ALD法により高電流（Ion = 785 μA/μm）、超低BTIシフト（< 8 mV @ Lc=50nm）、10 ns高速書き込み、6-bit/cell多値動作、保持時間 > 4000秒を達成しました。',
      'システム評価ではモノリシック3D-DRAM構成により、AI推論の重みロード速度が77倍、エネルギー効率が9.6倍向上することが示されています。',
    ],
    formula: {
      expression: 'I_off(IGZO) < 10⁻¹⁹ A/μm ⇒ 保持 > 4,000 s, 書込 10 ns, 6-bit/cell, 77×高速AIロード',
      description: '低温300°C未満でBEOL配線層の上に直接3D積層でき、SRAMより桁違いに高密度な組込みAIメモリを実現',
    },
    nextGenInnovation:
      'IEDM 2025 Paper 40-5の水素アニールPBTI突破（1.2Vオーバードライブ長期信頼性）とACS Nano 2026年11月のPE-ALD高密度化により、3D積層eDRAMの実用化が一気に加速しています。',
    specs: [
      { label: 'チャネル・成膜法', value: 'PE-ALD 緻密IGZO（< 300°C 低温BEOL互換・水素アニール付）' },
      { label: '記憶性能', value: '6-bit / cell 多値記憶・データ保持 > 4,000秒・書込 10 ns' },
      { label: 'トランジスタ特性', value: 'Ion = 785 μA/μm, SS < 70 mV/dec, BTIシフト < 8 mV' },
      { label: '最新研究出典', value: 'IEDM 2025 Paper 40-5 ＆ ACS Nano（2026年11月6日）' },
    ],
    diagramType: 'xv2_igzo_2t0c_edram',
  },

  'xv2-sot-mram-mtj-weights': {
    title: 'X2-47. 垂直磁化「SOT-MRAM スピン軌道トルク MTJ重みナノ柱」（IEDM 2025 実証）',
    subtitle: 'Perpendicular Spin-Orbit Torque (SOT-MRAM) Magnetic Tunnel Junction AI-Weight Pillar (IEDM 2025)',
    category: 'BIONZ XR 極超解剖図 V2 X2-47 — 電子の「自転（スピン）」の横風で極小磁石のN極S極を1ナノ秒未満で反転させ、無限に書き換えられる不揮発キャッシュ',
    plainAnalogy:
      '電子にはマイナスの電気だけでなく、コマのような「自転（スピン）」の性質があります！重金属タングステンの極細レールに横方向へ電気を流すと、スピンを持った電子の風が真上へ吹き上げ（スピンホール効果）、上に乗った極小の磁石（CoFeB）のN極とS極をたった1ナノ秒未満でクルッとひっくり返します。従来のMRAMと違って極薄の絶縁壁（MgO）に大電流を無理やり通さないため、何兆回書き換えても壊れず、カメラの電源を切ってもキャッシュとAI設定を記憶し続けます！',
    summary:
      'IEDM 2025で面外偏極スピン流を用いた4kb垂直SOT-MRAMアレイ等が実証された、次世代不揮発L3キャッシュ／AI重み記憶用スピン軌道トルク磁気トンネル接合（MTJ）ナノピラー。',
    opticsAndPhysics: [
      '下部の重金属トラック（β-W / Pt等）へ書き込み電流を流すと、スピン軌道相互作用（スピンホール効果）により純スピン流が垂直生成され、隣接する自由磁性層（CoFeB）の磁化方向をサブナノ秒（< 1 ns）で反転させます。',
      '読み出し時は1 nm厚のMgO結晶トンネルバリアを通るトンネル磁気抵抗効果（TMR）を使い、自由層と固定層（Pinned CoFeB）の磁化が平行（低抵抗＝0）か反平行（高抵抗＝1）かを高速判定します。',
      '書き込み電流経路（下部レール）と読み出し経路（MTJ縦方向）が物理分離された3端子構造のため、MgO絶縁膜が劣化せず、SRAMに迫る超高速と実質無限（>10¹⁵回）の書き換え寿命を実現します。',
    ],
    formula: {
      expression: 'TMR = (R_AP − R_P) / R_P > 150–200% ／ τ_switch < 1 ns ／ 耐久 > 10¹⁵ cycles',
      description: 'スピンホール効果による3端子分離書き込みで、サブナノ秒・無限耐久・待機電力ゼロの不揮発メモリを実現',
    },
    nextGenInnovation:
      'IEDM 2025で外部磁界不要の面外スピン偏極・垂直SOT-MRAMアレイが実証され、BIONZ XR次世代機の超高速L3キャッシュ・AIモデル常駐メモリとして期待されています。',
    specs: [
      { label: 'MTJ積層構成', value: 'β-W/Ptスピン軌道トラック ／ CoFeB自由層 ／ 1nm MgO ／ CoFeB固定層' },
      { label: 'スイッチング速度', value: '< 1.0 ns（L2/L3キャッシュ級超高速・外部磁界不要）' },
      { label: '書き換え耐久・保持', value: '> 10¹⁵ 回（実質無限）＆ 電源OFF不揮発保持' },
      { label: '最新研究出典', value: 'IEDM 2025（垂直SOT-MRAM 4kbアレイ面外スピン偏極実証）' },
    ],
    diagramType: 'xv2_sot_mram_mtj_weights',
  },

  'xv2-gan-si-monolithic-ivr': {
    title: 'X2-48. 300mmモノリシック「GaN nMOS ＋ Si pMOS オンダイIVR電源ステージ」（Intel / UCSD VLSI 2026）',
    subtitle: '300mm Monolithic GaN nMOS + Si pMOS Integrated Voltage Regulator (IVR) Power Stage (Intel / UCSD VLSI 2026)',
    category: 'BIONZ XR 極超解剖図 V2 X2-48 — 急速充電器の主役「窒化ガリウム（GaN）」をシリコンチップの上に直接合体させ、5ナノ秒で電力を自在に変圧する',
    plainAnalogy:
      '最近の超小型スマホ急速充電器に使われている次世代パワー半導体「窒化ガリウム（GaN）」は、高い電圧をムダなく超高速でスイッチングできる天才素材です。2026年6月のVLSIでIntelとUCSDが発表したのは、なんと直径300mmのシリコンウェハー上に「GaNのn型パワー素子」と「シリコンのp型制御素子」を1枚のチップへモノリシック合体させる驚愕技術！すぐ隣に螺旋マイクロコイルを並べてオンダイ電源（IVR）にすることで、シャッターを押した瞬間に5ナノ秒で電力ギアを全開に切り替えられます！',
    summary:
      'IntelおよびUCSDがVLSI 2026で実証した、300 mmウェハー上のモノリシック集積GaN nMOS＋Si pMOSパワーマネジメント（IVR / PMIC）ステージ。オンチップ螺旋マイクロインダクタと連携し、超高速・高効率な直下変圧（Point-of-Load）を実現します。',
    opticsAndPhysics: [
      '六方晶ウルツ鉱型GaN（窒化ガリウム）はバンドギャップ 3.4 eV とシリコン（1.12 eV）の3倍広く、2次元電子ガス（2DEG）の超高移動度と高耐圧により、100 MHz超の超高周波スイッチングでも損失が極小です。',
      '100 MHz超でスイッチングできるため、通常ならメイン基板上に大きく場所を取る外付けインダクタやコンデンサを、チップ直上の小さな平面スパイラルマイクロコイルへ劇的に小型化できます。',
      'BIONZ XR2のAI NPU・ISP・動画エンコーダの各ドメインごとに独立電圧を数ナノ秒で細かく上げ下げでき、カメラボディ内部の電力変換ロスと発熱を大幅に削減します。',
    ],
    formula: {
      expression: 'f_SW > 100–300 MHz（GaN HEMT + Si CMOS一体統合 ⇒ コイル体積 1/100 縮小）',
      description: '超高周波GaNスイッチングによりオンダイ直下変圧と5 ns未満の超高速DVFS応答を実現',
    },
    nextGenInnovation:
      'Intel / UCSDのVLSI 2026発表は、シリコンと化合物半導体GaNを300mmファブで一体化する「異種モノリシック集積（Heterogeneous Monolithic Integration）」の象徴的成果です。',
    specs: [
      { label: '異種集積構成', value: '300 mm基板上 モノリシック GaN nMOS (HEMT) ＋ Si pMOS' },
      { label: 'スイッチング周波数', value: '100–300 MHz 級（極小オンダイ螺旋インダクタ整合）' },
      { label: '電圧遷移応答', value: '< 5–10 ns（瞬間バースト撮影時の超高速電力供給）' },
      { label: '最新研究出典', value: 'Intel + UCSD VLSI 2026（300mm Monolithic GaN+Si Power IC）' },
    ],
    diagramType: 'xv2_gan_si_monolithic_ivr',
  },

  'xv2-ucie-s-56g-d2d-phy': {
    title: 'X2-49. ISSCC 2026「UCIe-S 56 Gb/s/lane 超高密度チップレットD2D PHY」（>4 Tbps/mm）',
    subtitle: 'ISSCC 2026 UCIe-S 56 Gb/s/lane High-Density Die-to-Die PHY Macro (Paper 8.1)',
    category: 'BIONZ XR 極超解剖図 V2 X2-49 — 1ミリ幅のフチから毎秒4テラビット以上のデータを隣のチップレットへ直通させる超高速マイクロ橋',
    plainAnalogy:
      'BIONZ XR2のように「画像処理チップ」「AI専用チップ」「通信チップ」を複数並べて1つのパッケージに収めるチップレット時代では、チップ同士をつなぐ連絡橋の太さが命です！2026年2月のISSCC（Paper 8.1）で実証された最新UCIe-S規格のPHYは、1レーンあたり毎秒48〜56ギガビットもの超高速信号をわずか数十マイクロメートル間隔の極小バンプでズラリと並べ、チップの縁たった1ミリ幅から毎秒4テラビット超（映画ブルーレイ100本分以上！）を0.3 pJ/bit未満の超省電力でやり取りします。',
    summary:
      'ISSCC 2026（Paper 8.1等）で実証された、48〜56 Gb/s/lane動作の次世代UCIe-S（Universal Chiplet Interconnect Express Standard）ダイ間（D2D）PHYマクロ。フォワーデッドクロック位相補間器とサイドバンド自動較正を備えます。',
    opticsAndPhysics: [
      'データレーン群と一緒にクロック信号を並走させる「フォワーデッドクロック方式」と極細位相補間器（PI）により、各レーンのピコ秒単位のスキュー（到着時刻ズレ）を自動補正します。',
      'パッケージ内の短い有機基板／シリコンブリッジ配線（数mm）に特化して等化器を極限簡素化することで、外部PCIeの数十分の1の消費エネルギー（< 0.35 pJ/bit）と数ナノ秒の超低遅延を達成しています。',
      '万が一マイクロバンプの1本に製造欠陥があっても予備レーンへ自動切替するリペア冗長機構を内蔵し、マルチチップレットSoCの量産歩留まりを99%以上へ引き上げます。',
    ],
    formula: {
      expression: 'Shoreline BW > 4 Tbps / mm（56 Gb/s/lane × 高密度バンプ, Energy < 0.35 pJ/bit）',
      description: 'チップの縁1mmあたり4テラビット超の超高密度・超省電力チップレット間直通リンクを確立',
    },
    nextGenInnovation:
      'ISSCC 2026 Paper 8.1で48–56 Gb/s級UCIe PHYが実証され、次世代αの「ISP＋独立AI-NPU＋積層センサー」チップレット統合の標準バックボーンとなっています。',
    specs: [
      { label: 'レーン伝送速度', value: '48–56 Gb/s / lane（UCIe-S 2.0 / 3.0 世代）' },
      { label: 'エッジ帯域密度', value: '> 4.0 Tbps / mm（超広帯域ダイ間通信）' },
      { label: '電力効率／遅延', value: '< 0.35 pJ/bit ／ 片道遅延 < 2 ns' },
      { label: '最新研究出典', value: 'ISSCC 2026 Paper 8.1（Intel 48–56 Gb/s UCIe D2D PHY）' },
    ],
    diagramType: 'xv2_ucie_s_56g_d2d_phy',
  },

  'xv2-hbm4-2048b-base-die': {
    title: 'X2-50. HBM4「2048ビット超広幅ベースダイ・ロジックインターフェース」（ISSCC 2026 / >2 TB/s）',
    subtitle: 'HBM4 2048-Bit Ultra-Wide Custom Logic Base-Die Interface (ISSCC 2026, >2 TB/s per Stack)',
    category: 'BIONZ XR 極超解剖図 V2 X2-50 — 2048車線もの超ワイド高速道路をメモリの土台ダイに直結し、1スタックだけで毎秒2テラバイト超を流し込む',
    plainAnalogy:
      '8K/120pの非圧縮RAW動画やリアルタイムAI超解像・マルチフレーム合成を同時に走らせると、メモリの通り道が細いとすぐに渋滞します。2026年本格展開の最新メモリ規格「HBM4」は、通り道の車線数を従来の1024本から一気に2倍の「2048ビット幅」へ拡張！しかも最下段の「ベースダイ」を初めて先端ファウンドリのロジックプロセスで作り、そこにECCエラー訂正やAI前処理回路まで直載せして、たった1スタックで毎秒2テラバイト以上という異次元の帯域を低電圧で叩き出します！',
    summary:
      'ISSCC 2026で主要メモリ各社・ファウンドリが展開する次世代HBM4（High Bandwidth Memory 4）の2048-bit超広幅カスタムロジックベースダイ。32個の独立疑似チャネルと先端ロジック制御回路を統合します。',
    opticsAndPhysics: [
      '従来のHBM3E（1024-bit）の2倍となる2048本の超微細マイクロバンプI/Oを備え、1ピンあたりの速度を抑えた省電力動作（~8–10 Gbps/pin）のまま1スタックあたり >2.0 TB/s の圧倒的帯域を実現します。',
      '最下層のベースダイにファウンドリの先端ロジック（TSMC N5/N3系等）を採用することで、SoC側のメモリコントローラPHYやオンダイECC、さらには単純な画像フィルタ・インメモリ前処理までメモリ直下へ統合可能になりました。',
      '4つの独立クワドラント（各512-bit）に分割されたTSV縦貫通バスにより、ISPのRAW書き込みとNPUのAI重み読み出しがぶつからず同時並列アクセスできます。',
    ],
    formula: {
      expression: 'BW_HBM4 = 2048 bit × 8–10 Gbps / 8 = 2.05–2.56 TB/s per Stack',
      description: '2048車線の超並列低速省電力バスとカスタムロジックベースダイで、8K RAW＆AI推論のメモリ壁を撤去',
    },
    nextGenInnovation:
      'ISSCC 2026でHBM4ベースダイとGDDR7 PAM3が同時発表され、ハイエンドシネマカメラや次世代フラッグシップ映像プロセッサの超広帯域メモリ基盤を刷新しています。',
    specs: [
      { label: 'データバス幅', value: '2,048-bit（32独立チャネル：HBM3E比 2倍の車線数）' },
      { label: '帯域幅（1スタック）', value: '> 2.0–2.5 TB/s（低電圧・超省電力動作）' },
      { label: 'ベースダイ構造', value: 'カスタム先端ロジック・ベースダイ（ECC＆前処理統合）' },
      { label: '最新研究出典', value: 'ISSCC 2026（HBM4 2048-bit Base Die & Next-Gen Memory）' },
    ],
    diagramType: 'xv2_hbm4_2048b_base_die',
  },

  // =========================================================================
  // TIER 4 — 110GHz GeSi EAM, MICROFLUIDIC COOLER, BAW CLOCK, SECURITY & 3.5D COUPE (X2-51 – X2-55)
  // =========================================================================

  'xv2-gesi-110ghz-eam-cpo': {
    title: 'X2-51. >110 GHz Cバンド「GeSi電界吸収型光変調器（EAM）＆ Ge受光素子」（imec IEDM 2025 Paper 41-3）',
    subtitle: '>110 GHz C-Band GeSi Electro-Absorption Modulator (EAM) & Ge Photodetector (imec IEDM 2025 41-3)',
    category: 'BIONZ XR 極超解剖図 V2 X2-51 — 電気のON/OFFでレーザー光の通りやすさを1秒に1100億回以上パチパチ切り替え、1本400Gbpsの光通信を実現',
    plainAnalogy:
      '電気のケーブルで超高速データを送ると、少し長いだけで熱とノイズでヘトヘトになってしまいます。そこでチップのすぐ隣で電気を「レーザー光」に変えてしまうのが光電融合（CPO）！2025年12月のIEDM（Paper 41-3）でimecが実証したのは、ゲルマニウム・シリコン（GeSi）の小さな結晶に電圧をかけると光の吸収率が瞬時に変わる「フランツ・ケルディッシュ効果」を使った光シャッター（EAM）。なんと1秒間に1100億回以上（>110 GHz）も超高速開閉でき、光ファイバー1本で400Gbpsもの映像データを熱も出さず瞬時伝送できます！',
    summary:
      'imecがIEDM 2025（Paper 41-3）で実証した、Cバンド（1550 nm帯）対応の超広帯域 >110 GHz GeSi電界吸収型変調器（EAM）および高速Geフォトディテクタ。400G/lane級のコパッケージド・オプティクス（CPO）を実現します。',
    opticsAndPhysics: [
      'GeSiリブ導波路へ逆バイアス電圧を加えるとバンド端がわずかにシフトし（フランツ・ケルディッシュ効果）、Cバンド・レーザー光をフェムトジュール級の極小エネルギーで超高速オン・オフ変調できます。',
      '従来のシリコン・マッハツェンダー変調器（長さ数mm）と比べて全長わずか数十マイクロメートルと100分の1以下の超小型サイズで、しかも温度変化に強くヒーター調整電力も最小限です。',
      '両脇のGSGミリ波金電極で110 GHz超の超高周波駆動信号を導波路へ整合注入し、対向側の高速Geフォトダイオードで再び電気へ戻すことで、次世代放送カメラの非圧縮16K光直結も視野に入ります。',
    ],
    formula: {
      expression: 'f_3dB > 110 GHz（C-Band 1550 nm GeSi EAM）⇒ 400 Gb/s / lane 光電融合伝送',
      description: '全長数十μmの極小GeSi光シャッターで、1レーン400Gbpsの超省電力・低発熱レーザー伝送を達成',
    },
    nextGenInnovation:
      'imec IEDM 2025 Paper 41-3の>110 GHz CバンドGeSi EAMは、2026年以降のシリコンフォトニクスCPOを200Gから400G/laneへ飛躍させる決定打です。',
    specs: [
      { label: '電気-光 3dB帯域', value: '> 110 GHz（400 Gb/s / lane 光変調に対応）' },
      { label: '動作波長帯', value: 'Cバンド（1550 nm帯 低損失標準光ファイバー対応）' },
      { label: '変調原理・受光', value: 'GeSiフランツ・ケルディッシュEAM ＋ 高速Geフォトダイオード' },
      { label: '最新研究出典', value: 'imec IEDM 2025 Paper 41-3（2025年12月）' },
    ],
    diagramType: 'xv2_gesi_110ghz_eam_cpo',
  },

  'xv2-microfluidic-si-cooler': {
    title: 'X2-52. シリコン直彫り「3D ICマイクロ流体・極微ピンフィン液冷マニホールド」（imec IEDM 2025 17-3）',
    subtitle: 'Direct-to-Silicon 3D IC Microfluidic Micro-Channel Pin-Fin Liquid Cooler (imec IEDM 2025 17-3)',
    category: 'BIONZ XR 極超解剖図 V2 X2-52 — チップの裏側のシリコンそのものに極細の「水路」を直接彫り込み、140℃の灼熱ホットスポットを一気に70℃へ半減',
    plainAnalogy:
      'チップを何階建てにも3D積層すると、真ん中に熱が閉じ込められて「熱だまり（ホットスポット）」が140℃を超え、性能を落とさざるを得なくなります。外から銅のヒートシンクを貼るだけではグリスや金属の壁が邪魔して限界！そこで2025年末IEDM（Paper 17-3）でimecが実証したのが「シリコン直彫りマイクロ流体冷却」— チップのシリコン裏面そのものに髪の毛ほどの微細な水路とピンフィンを直接エッチングし、絶縁冷却液を流して発熱源の真下100μmから熱を直吸い！140.7℃の危険温度をわずか70.8℃まで一気に半分へ冷やし切ります！',
    summary:
      'imecがIEDM 2025（Paper 17-3：3D IC Cross-Layer Thermal Co-Optimization / XTCO）で実証した、シリコン基板直彫りマイクロ流体マイクロチャネル液冷マニホールド。3D積層SoCのホットスポットを 140.7°C → 70.8°C へ劇的低減します。',
    opticsAndPhysics: [
      '従来の外付け冷却では「ダイ→TIMグリス→金属蓋(IHS)→TIM2→ヒートシンク」と何枚もの熱抵抗壁を越える必要がありましたが、シリコン内部に直接マイクロチャネルを彫ることで熱抵抗の約80%を消し去ります。',
      '各流路の内部に千鳥配列のシリコン製マイクロピンフィン（乱流促進柱）をエッチングすることで、境界層を破って熱伝達係数 h を劇的に高め、数百 W/cm² の局所熱流束も余裕で奪います。',
      '左側の低温インレット（シアン）から右側の排熱アウトレット（アンバー）へ均一な圧力分布で冷媒を循環させ、3D積層チップ全体の温度勾配と熱応力反りも同時に抑えます。',
    ],
    formula: {
      expression: 'T_hotspot: 140.7°C (空冷/従来) → 70.8°C (シリコン直彫りマイクロ流体冷却, −69.9°C!)',
      description: 'グリスと蓋をバイパスして発熱トランジスタの数十〜数百μm直下から直接液冷する究極の3D放熱解',
    },
    nextGenInnovation:
      'imec IEDM 2025 Paper 17-3（XTCO）のダイレクト液冷技術は、将来の8K/120p長時間連続記録シネマカメラや超高密度3D積層BIONZ XRの「熱停止ゼロ」を実現する切り札です。',
    specs: [
      { label: 'ホットスポット低減', value: '140.7°C → 70.8°C（約 70°C の劇的冷却効果）' },
      { label: 'チャネル構造', value: 'シリコン直彫り並列マイクロ水路 ＋ マイクロピンフィン乱流柱' },
      { label: '設計手法', value: '3D ICクロスレイヤ熱協調最適化（XTCO）' },
      { label: '最新研究出典', value: 'imec IEDM 2025 Paper 17-3（2025年12月）' },
    ],
    diagramType: 'xv2_microfluidic_si_cooler',
  },

  'xv2-si-baw-clock-resonator': {
    title: 'X2-53. マルチせん断モード「シリコンBAW オンダイ超高精度クロック共振器」（IEDM 2025 Paper 13-1）',
    subtitle: 'Multi-Shear-Mode Silicon Bulk Acoustic Wave (BAW) On-Die Precision Clock Resonator (IEDM 2025 13-1)',
    category: 'BIONZ XR 極超解剖図 V2 X2-53 — 外付けの水晶振動子のかわりにチップ内部の「宙吊り六角シリコン音叉」で時を刻み、8時間ズレわずか102ナノ秒',
    plainAnalogy:
      'プロの映画撮影で何台ものカメラの音声と映像をピタッと同期させる（タイムコード／ゲンロック）には、これまで基板上に大きな「水晶振動子（クォーツ）」を別付けするしかありませんでした。ところが2025年12月のIEDM（Paper 13-1）で実証された「シリコンBAW共振器」は、チップ自身のシリコンを六角形の極小音叉のように真空中に宙吊りにして圧電振動させる超小型クロック！複数のせん断振動モードで自分の温度ズレを自動相殺し、8時間連続撮影しても時間のズレがたった102ナノ秒（1000万分の1秒！）という驚異の精度を叩き出します！',
    summary:
      'IEDM 2025（Paper 13-1）で実証された、マルチせん断モード（Multi-Shear-Mode）シリコン・バルク弾性波（BAW）オンダイ精密クロック共振器。外付け水晶発振器を不要にし、8時間あたりわずか102 nsの超低ドリフトを実現します。',
    opticsAndPhysics: [
      '真空キャビティ内に1/4波長テザー梁で宙吊りにした六角形シリコン共振子へ極薄AlScN圧電膜で駆動力を与え、周囲の同心円ブラッグ音響ミラーリングが振動エネルギーの基板漏れを完全反射して超高Q値を生み出します。',
      '温度特性の異なる2つのせん断（Shear）共振モードの周波数比をリアルタイム計測することで、自己発熱による温度変化を0.001°Cレベルで自己検知・完全補償します。',
      'チップ内部に直積できるため、外部水晶からの配線ノイズ・衝撃振動（シャッターショックや落下）によるジッタ悪化がなく、マルチカメラのタイムコード完全同期を単体で維持できます。',
    ],
    formula: {
      expression: 'Time Drift = 102 ns / 8 hours（≈ 3.5 ppb 級超安定・外付け水晶ゼロ）',
      description: 'マルチせん断モード自己温度補償とブラッグ音響ミラーにより、チップ内蔵の極小音叉で原子時計に迫る安定度へ',
    },
    nextGenInnovation:
      'IEDM 2025 Paper 13-1のシリコンBAW精密クロックは、複数台αシネマカメラのワイヤレス・タイムコード同期や超低ジッタSLVS-EC/CPO基準クロックを1チップ化する未来技術です。',
    specs: [
      { label: '長期時間ドリフト', value: '102 ns / 8時間（ppb級・映画タイムコード完全同期）' },
      { label: '共振・封止構造', value: '宙吊り六角Si/AlScN BAW共振子 ＋ 同心ブラッグ音響反射鏡' },
      { label: '温度補償方式', value: 'マルチせん断モード周波数比による自己温度検知補償' },
      { label: '最新研究出典', value: 'IEDM 2025 Paper 13-1（2025年12月）' },
    ],
    diagramType: 'xv2_si_baw_clock_resonator',
  },

  'xv2-sidechannel-ecc-guard': {
    title: 'X2-54. デュアルレール「サイドチャネル電力マスキング ＆ AI重みECC自動修復ガード」（2026年セキュリティ）',
    subtitle: 'Dual-Rail Masked Side-Channel Countermeasure & AI-Weight ECC Scrubbing Guard (2026)',
    category: 'BIONZ XR 極超解剖図 V2 X2-54 — 常に「表と裏のペア」で電気を使って秘密鍵のクセを消し去り、宇宙線によるAIデータの1ビット化けも即修復する守護神',
    plainAnalogy:
      '写真の「本物証明（C2PA電子署名）」に使う秘密鍵は、悪いハッカーがチップの消費電力の微妙な波形（サイドチャネル）を盗み見ると解読される危険があります。そこでこの守護回路は、計算するときに必ず「本物のデータ（0か1）」と「真逆のダミーデータ（1か0）」の2本レールを同時に動かします！すると0を計算しても1を計算しても消費電力が常にまったく同じ真っ平らな線になり、外から覗いても秘密鍵が1ビットも読めません。さらに宇宙線でAIの重みデータが1ビット化けてもECCパリティが即座に直します！',
    summary:
      'BIONZ XR2のC2PAハードウェア署名鍵とAI-AF推論モデルを物理攻撃・放射線エラーから守る、相補デュアルレール電力マスキング論理・ファラデー改ざん検知メッシュ・およびAI重み常時ECCスクラビング保護ブロック。',
    opticsAndPhysics: [
      'デュアルレール・プリチャージ論理（WDDL / マスクド回路）により、すべてのクロックサイクルで「Trueレール」と「Complementレール」のどちらか1本が必ず充電されるため、消費電流波形 I(t) や電磁放射（EM）が秘密鍵ビットに一切依存しなくなります。',
      '上部を覆う銅ファラデー改ざん検知メッシュ（Active Shield）は、マイクロプローブ針で物理的にチップを削って中身を覗こうとした瞬間に断線を検知し、秘密鍵をゼロ消去します。',
      '同時に2nm微細SRAMやAI重みバッファを常時バックグラウンド巡回するSECDED ECC（1ビット訂正・2ビット検出）スクラビングが、高高度（飛行機・高山撮影）での宇宙線ソフトエラーによるAI誤認識や録画フリーズを防ぎます。',
    ],
    formula: {
      expression: 'I_supply(bit=0) ≡ I_supply(bit=1)（DPA相関 → 0） ＆ SECDED ECC 1-bit即時訂正',
      description: '電力波形の情報漏洩を物理的に平坦化しつつ、宇宙線ソフトエラーからAI推論と電子署名を鉄壁防御',
    },
    nextGenInnovation:
      '2026年の報道機関・生成AI偽造対策（C2PA真贋証明）の必須要件として、ハードウェアレベルのサイドチャネル耐性と改ざん検知メッシュがフラッグシップカメラSoCの標準装備になりつつあります。',
    specs: [
      { label: 'サイドチャネル防御', value: '相補デュアルレール電力平坦化＋ランダムマスキング（DPA/EMA対策）' },
      { label: '物理改ざん防御', value: '最上層アクティブ・ファラデー遮蔽メッシュ（プローブ切断即時消去）' },
      { label: '信頼性保護', value: 'AI重み・キャッシュ常時バックグラウンドSECDED ECCスクラブ' },
      { label: '主な保護対象', value: 'C2PA真贋証明ECDSA秘密鍵 ＆ リアルタイムAI被写体認識重み' },
    ],
    diagramType: 'xv2_sidechannel_ecc_guard',
  },

  'xv2-coupe-35d-interposer': {
    title: 'X2-55. TSMC 3.5D「COUPE 4.5μmピッチ光電融合マイクロインターポーザ」（VLSI 2026）',
    subtitle: 'TSMC 3.5D COUPE (Compact Universal Photonic Engine) 4.5um-Pitch SoIC Optical-Electrical Interposer (VLSI 2026)',
    category: 'BIONZ XR 極超解剖図 V2 X2-55 — 電子チップの真上を4.5μm間隔で光エンジンへ直結し、4隅の光ファイバーV溝から毎秒200Gbps超の光を放つ王冠',
    plainAnalogy:
      'BIONZ XR V2のいちばん頂上を飾る「光の王冠」が、TSMCが2026年のVLSIで展開を加速した3.5D光電融合プラットフォーム「COUPE（クーペ）」です！普通の電子チップ（EIC）と光チップ（PIC）を横並びでつなぐのではなく、4.5マイクロメートルという極細のSoIC縦積み接合でピタッと直結し、4つの角に並んだ精密V溝とマイクロレンズから光ファイバーへ毎秒200Gbps超のレーザー光を直送りします。次世代の超高解像度シネマカメラが、電気配線の限界を完全に解き放つ象徴パーツです！',
    summary:
      'TSMC 3DFabric（VLSI 2026）の中核である「3.5D COUPE（Compact Universal Photonic Engine）」。4.5 μmピッチのSoIC-X垂直接合で電子IC（EIC）と光IC（PIC）を直結し、V溝ファイバーアレイとマイクロレンズ結合器で200+ Gb/s/laneの光I/Oを実現します。',
    opticsAndPhysics: [
      '従来の光トランシーバは基板の端まで長い銅配線を引き回す必要があり電力の大半が損失していましたが、COUPEはEIC（65nm/N6ドライバ）をPIC（シリコンフォトニクス光導波路）の真上へ4.5 μmピッチのSoIC-Xで直積するため、寄生容量が激減しエネルギー効率が劇的に向上します。',
      '4隅のエッチングV溝（V-Groove）へ単一モード光ファイバーをミクロン精度で自己整合固定し、極小マイクロレンズで導波路のモード径へ低損失（< 1 dB）結合します。',
      'CoWoSパッケージの周囲を額縁状に囲む3.5D統合により、演算ダイとHBM4と光エンジンが1つの超高速・低遅延システムとして一体化します。',
    ],
    formula: {
      expression: 'SoIC Pitch = 4.5 μm (EIC-on-PIC) ⇒ >200 Gb/s/lane 光直結（電気配線比 電力 1/3〜1/5）',
      description: '電子ダイと光ダイの4.5μm垂直SoIC直結＋V溝マイクロレンズ結合で、銅配線の物理限界を超える',
    },
    nextGenInnovation:
      'TSMC VLSI 2026の3.5D統合ロードマップ（SoIC 4.5μm + CoWoS + COUPE）は、2026–2028年の最先端AI・プロ映像システムの標準光電インターフェースとして実用フェーズに入っています。',
    specs: [
      { label: 'EIC–PIC垂直接合', value: 'TSMC SoIC-X 4.5 μm ピッチ直接ハイブリッド接合' },
      { label: '光伝送速度', value: '> 200 Gb/s / lane（将来1.6T / 3.2T / 6.4T 光エンジン対応）' },
      { label: '光ファイバー結合', value: '4隅異方性エッチングV溝 ＋ 極小マイクロレンズ結合器' },
      { label: '最新研究出典', value: 'TSMC 3DFabric / COUPE 3.5D Integration（VLSI 2026）' },
    ],
    diagramType: 'xv2_coupe_35d_interposer',
  },
};
