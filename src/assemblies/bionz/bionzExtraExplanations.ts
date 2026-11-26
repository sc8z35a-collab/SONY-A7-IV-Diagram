import { PartExplanation } from '../types';

/**
 * Phase 33 — Sony BIONZ XR / XR2 Deep-Package & SY-1122 Mainboard Companion Expansion (24 Parts: XR47–XR70).
 * Grounded in Sony α7 IV (ILCE-7M4 SY-1122 / 1-009-592-41), α7R V (ILCE-7RM5 Dedicated AI Processing Unit + 2GB LPDDR4),
 * OpenMemories verified chips (Renesas R2J30503LG "Bonobo", ST STM32F031E6 "Genlock", always-on RTC Power IC),
 * and real datasheets: Murata Wi-Fi 6E LGA SiP, TI TPS65987D/TUSB1044/BQ25713/TPS25982/DRV8837/BQ27441-G1/TMP117/TPS3808,
 * Renesas 9FGV0241, Diodes PI3PCIE3412, Murata DLM0NSN900HY2, AKM AK4619VN, Epson XV7011BB & FC-135, Seiko MS621FE.
 */
export const BIONZ_EXTRA_EXPLANATIONS: Record<string, PartExplanation> = {
  'xr-die-io-esd-ring': {
    title: 'XR47. ダイ外周 HBM/CDM 静電気保護（ESD）クランプダイオード ＆ I/Oパッドリング',
    subtitle: 'Die-Perimeter HBM ±2 kV / CDM ±500 V ESD Double-Diode Clamp & I/O Pad Ring',
    category: 'BIONZ XRパッケージ内部超解剖 XR47 — 数千ボルトの静電気を1ナノ秒未満で逃がす「シリコン外周の避雷針リング」',
    plainAnalogy:
      '冬の乾燥した日にドアノブで「バチッ！」とくる静電気は数千ボルトもあります。わずか数ナノメートルの微細なトランジスタが詰まったBIONZ XRの内部へその電撃が一瞬でも入ると即死してしまうため、シリコンチップのぐるり一周に「避雷針（ESDクランプダイオード）」をびっしり並べて、異常な高電圧だけをアースへ逃がして頭脳を守っています。',
    summary:
      'BIONZ XRシリコンダイの4辺全周を囲むI/Oセルと二重ダイオード／大型Big-FET静電気保護（ESD）クランプリング。人体帯電モデル（HBM ±2 kV）やデバイス帯電モデル（CDM ±500 V）の超高速サージ電流を、コア論理回路へ到達する前に電源・GNDレールへバイパスします。',
    opticsAndPhysics: [
      '各信号I/Oパッドの直下にP+/N-wellおよびN+/P-subの二重クランプダイオードを配置し、通常の信号電圧（1.8 V / 1.1 V）では完全に絶縁しながら、サージ発生時のみ数Ωの低抵抗でオンになります。',
      '四隅にはRCトリガ付き大型Big-FETレールクランプを配置し、電源レール（VDD_IO）と接地レール（VSS_ESD）の間を1 ns未満で短絡させて過電圧スパイクを吸収します。',
      '10 GbpsクラスのSLVS-ECやPCIe高速ピンでは、保護ダイオードの寄生容量を 0.15 pF 以下に極小化する低容量SCR（サイリスタ）構造を採用し、高速波形のなまりを防いでいます。',
    ],
    formula: {
      expression: 'I_peak(HBM 2kV) ≈ V_ESD / 1.5 kΩ ≈ 1.33 A（t_rise ≈ 2–10 ns を1 ns未満でクランプ）',
      description: '数ナノ秒で立ち上がるアンペア級の静電気電流を、微細トランジスタのゲート酸化膜（耐圧数V）が破れる前にバイパス',
    },
    nextGenInnovation:
      'BIONZ XR2世代の微細プロセス（5 nm / 4 nm級）ではゲート絶縁膜がさらに薄く壊れやすくなるため、高速SerDesの寄生容量を増やさずにCDM ±500 V耐性を満たす多段SCRクランプ設計が不可欠です。',
    specs: [
      { label: '静電気保護耐圧', value: 'HBM ±2,000 V ／ CDM ±500 V（JEDEC JS-001/002準拠）' },
      { label: 'クランプ応答速度', value: '< 1 ns（Big-FET RCトリガ電源レールクランプ）' },
      { label: '高速ピン寄生容量', value: '≤ 0.15 pF（10 Gbps超の信号劣化を防止）' },
      { label: '配置位置', value: 'シリコンダイ外周 360° パッドリング（168+ I/Oセル）' },
    ],
    diagramType: 'xr_die_io_esd_ring',
  },

  'xr-mtcmos-power-gate-ring': {
    title: 'XR48. MTCMOS 多電源ドメイン・スリープ電源遮断（パワーゲーティング）ヘッダーリング',
    subtitle: 'Fine-Grain MTCMOS High-Vt pMOS Power-Gating Header Switch Ring',
    category: 'BIONZ XRパッケージ内部超解剖 XR48 — 使っていない回路のブレーカーを40ナノ秒で切れる「超高速スマート節電スイッチ網」',
    plainAnalogy:
      '誰もいない部屋の電気やエアコンをつけっぱなしにすると電気代がかさむのと同じで、静止画撮影中は動画エンコーダ（HEVC）を使っていません。このMTCMOSリングは、BIONZ XR内部を12個以上の細かい部屋（ドメイン）に分け、使っていない部屋の電気を「400億分の1秒」レベルでパチッと切って、バッテリー持ちと発熱抑制を劇的に改善するスマートブレーカーです。',
    summary:
      'チップ内部のAI NPU・HEVC動画コーデック・HDMI出力・ISPなどの各機能ブロック外周を取り囲む、高しきい値（High-Vt）pMOSパワーゲーティング・ヘッダースイッチリング。待機中のサブスレッショルド漏れ電流を最大96%カットします。',
    opticsAndPhysics: [
      '演算用の高速・低しきい値（Low-Vt）トランジスタは高速ですが電源を繋いだままだと微弱な漏れ電流（リーク電流）が流れ続けます。電源線との間にHigh-Vt pMOSスイッチを直列挿入し、未使用ドメインの仮想電源（VVDD）を物理的に遮断します。',
      '電源復帰時に突入電流（ラッシュカレント）で隣接ドメインの電圧が落ちないよう、デイジーチェーン型の段階的ウェイクアップ制御により約 30〜40 ns で安全に再起動します。',
      'リテンション・フリップフロップ（記憶保持回路）と組み合わせることで、OSや設定レジスタの状態を消さずに待機消費電力をミリワット級へ落とせます。',
    ],
    formula: {
      expression: 'P_leak = V_DD · I_sub0 · 10^(-V_th / S)   （High-Vt 遮断で待機リーク電流を約 1/25 以下へ削減）',
      description: 'しきい値電圧 V_th が高いスイッチで電源を根元から断つことで、指数関数的に増える微細チップの待機漏れ電力を劇的にカット',
    },
    nextGenInnovation:
      'α7 IVの電源OFF→撮影可能の高速起動や、動画撮影待機時の発熱低減、さらにBIONZ XR2で巨大化したAI NPUを非認識フレーム間で瞬時に休眠させる省電力技術の要です。',
    specs: [
      { label: 'スイッチ素子構造', value: 'High-Vt FinFET pMOS ヘッダースイッチ配列' },
      { label: '独立電源ドメイン数', value: '12+ 独立パワーアイランド（ISP / NPU / HEVC / PCIe等）' },
      { label: 'リーク電流削減率', value: '最大 96% 削減（アイドル時仮想電源 VVDD 遮断）' },
      { label: '復帰レイテンシ', value: '< 40 ns（デイジーチェーン突入電流制御付き）' },
    ],
    diagramType: 'xr_mtcmos_power_gate_ring',
  },

  'xr-mbist-dummy-si-spacer': {
    title: 'XR49. 左翼シリコンダミー放熱スペーサー ＆ オンダイ MBIST / IJTAG 自己診断コントローラ',
    subtitle: 'Left-Flank Silicon Thermal Dummy Spacer & IEEE 1687 IJTAG MBIST DFT Block',
    category: 'BIONZ XRパッケージ内部超解剖 XR49 — チップの反りを防ぐ「左右対称のシリコン重り」＋出荷前メモリ全数検査官',
    plainAnalogy:
      '右側にだけサブチップ（Cetus）が乗っていると、やじろべえのようにバランスが崩れ、高温になったときにパッケージ全体が「への字」に反ってハンダが割れてしまいます。そこで反対の左側にも同じシリコン素材の「ダミー・スペーサー」を置いて左右の熱膨張バランスを完璧に揃え、同時に内部SRAMに不良がないか自動チェックする検査機能（MBIST）も担っています。',
    summary:
      '右側面のCXD90058（Cetus）チップレットと左右対称（x = -13.2 mm）に配置された単結晶シリコン製ダミー放熱・反り抑制スペーサー、およびIEEE 1687（IJTAG）準拠のメモリ自己診断（MBIST）テスト構造。',
    opticsAndPhysics: [
      '単結晶シリコン（熱膨張係数 CTE ≈ 2.6 ppm/K・熱伝導率 ≈ 148 W/m·K）を左翼の空きキャビティへ配置することで、銅IHSとABF基板の間で発生する熱応力とパッケージ反り（Warpage）を左右対称に打ち消します。',
      '下面の40本以上の銅サーマルビア・スタブを通じてABF基板のグラウンド層へ熱を逃がす補助放熱パスとしても機能します。',
      'オンダイMBISTエンジンは工場テスト時に「March-C+」アルゴリズムで数千万ビットのオンチップSRAMセルを全数チェックし、欠陥列があれば自動的に冗長スペア列へ切り替えて歩留まりを飛躍的に高めます。',
    ],
    formula: {
      expression: 'ΔW_warp ∝ (α_sub − α_Si) · ΔT · L² / h   （左右対称シリコン充填で非対称反りを約 45% 低減）',
      description: 'パッケージ内のシリコン体積比を左右均等にすることで、リフローはんだ付け時（250℃）や録画発熱時のねじれ反りを防止',
    },
    nextGenInnovation:
      '複数チップレットを1つのパッケージに混載する2.5D/PoPパッケージでは「構造の対称性＝長期信頼性」です。ダミーシリコン＋IJTAGテスト網が、プロ機としての何年もの現場稼働を支えます。',
    specs: [
      { label: '母材・熱膨張係数', value: '単結晶シリコン（CTE 2.6 ppm/K、k ≈ 148 W/m·K）' },
      { label: '配置位置', value: 'パッケージ左翼（右側 Cetus チップレットと完全対称配置）' },
      { label: '自己診断規格', value: 'IEEE 1687 IJTAG ／ March-C+ SRAM MBIST ＆ 冗長救済' },
      { label: '熱ビア構造', value: '下面 4×10 銅サーマル・ダミービア配列' },
    ],
    diagramType: 'xr_mbist_dummy_si_spacer',
  },

  'xr-mg-chassis-tim3-sink': {
    title: 'XR50. マグネシウム合金ダイカスト筐体・放熱ペデスタル（AZ91D）＆ 圧縮TIM3パテ',
    subtitle: 'AZ91D Magnesium-Alloy Chassis Thermal Pedestal & Compressible 4.5 W/m·K TIM3 Putty',
    category: 'BIONZ XRパッケージ内部超解剖 XR50 — チップの熱をカメラの「頑丈な金属骨格」全体へ逃がす最終放熱ブリッジ',
    plainAnalogy:
      'どんなに優秀な銅のフタやグラファイトシートがあっても、熱の「最終的な捨て場所」がなければ温度は上がり続けます。このマグネシウム合金ペデスタルは、柔らかい放熱パテ（TIM3）を介してBIONZ XRの熱をカメラ本体の頑丈な金属骨格（マグネシウムフレーム）全体へ吸い上げ、ボディ表面から自然に空気中へ逃がす巨大なヒートシンクの役割を果たします。',
    summary:
      'α7 IVボディ骨格を形成するAZ91Dマグネシウム合金ダイカストシャーシのBIONZ XR直上放熱台座（ペデスタル）と、公差を吸収しながら密着する高熱伝導シリコーン・ギャップフィラー（TIM3）パッド。',
    opticsAndPhysics: [
      'AZ91Dマグネシウム合金（熱伝導率約 72 W/m·K、比重わずか 1.81 g/cm³）は、アルミの約2/3の軽さで高い剛性と大きな熱容量を兼ね備え、長回し録画時の熱バッファとして機能します。',
      '基板実装高さのばらつき（±0.25 mm）を吸収しつつBIONZ XRへ過大な圧力を掛けないよう、硬度 Shore 00-40 級の柔らかい圧縮性TIM3シリコーンパッド（4.5 W/m·K）を挟み込みます。',
      '四隅のM1.7真鍮インサートと精密なトルク管理（0.14 N·m）により、落下の衝撃を受けてもサーマルパッドの密着圧力が一定に保たれます。',
    ],
    formula: {
      expression: 'C_th = m_Mg · c_p ≈ 0.14 kg × 1,050 J/(kg·K) ≈ 147 J/K（ボディ骨格全体で熱エネルギーを吸収）',
      description: 'マグネシウム骨格の大きな熱容量が「熱のダム」として働き、4K60p連続録画時の温度上昇スピードを緩やかに抑える',
    },
    nextGenInnovation:
      'α7 IVのΣ字グラファイト構造と組み合わせることで、冷却ファンを持たない完全防塵防滴ボディのまま、4K 60p 10-bit 4:2:2の長時間連続収録を実現しています。',
    specs: [
      { label: '筐体合金材質', value: 'AZ91D マグネシウム合金ダイカスト（k ≈ 72 W/m·K）' },
      { label: '界面熱パテ（TIM3）', value: '高圧縮シリコーン・ギャップフィラー（4.5 W/m·K）' },
      { label: '固定締結構造', value: 'M1.7 精密ねじ ×4（真鍮インサート・締付 0.14 N·m）' },
      { label: '放熱経路', value: 'IHS(XR02) → Σグラファイト(XR40) → TIM3 → Mg骨格(XR50)' },
    ],
    diagramType: 'xr_mg_chassis_tim3_sink',
  },

  'xr-sy1122-hdi-mainboard': {
    title: 'XR51. Sony α7 IV 純正メイン基板「SY-1122（1-009-592-41）」12層 Any-Layer HDI ボード',
    subtitle: 'Sony ILCE-7M4 Genuine SY-1122 (1-009-592-41) 12-Layer Any-Layer HDI Motherboard',
    category: 'BIONZ XRパッケージ内部超解剖 XR51 — カメラ中の全ICを12階建ての極細配線ビルで繋ぐ「α7 IV本物の母艦基板」',
    plainAnalogy:
      'BIONZ XRという大統領を支える全省庁（センサー・メモリカード・Wi-Fi・手ブレ補正・音声・USB）がすべてこの1枚の緑色の板の上に載っています。しかも厚さはわずか1ミリちょっとのに、内部はレーザーで穴を掘った「12階建ての立体高速道路（Any-Layer HDI）」になっていて、何百本もの超高速信号線がぶつからずに交差しています！',
    summary:
      'Sony α7 IV（ILCE-7M4）の実機部品番号「SY-1122 / 1-009-592-41」として確認されている12層高密度相互接続（Any-Layer HDI）メイン基板。中央のENIG金めっきBGAランドにBIONZ XRを実装し、周辺全サブシステムをインピーダンス整合配線で統合します。',
    opticsAndPhysics: [
      '任意の層間を直径 50〜75 μm のレーザー・マイクロビアで垂直に貫通接続できる「Any-Layer HDI（全層IVH）」工法を採用し、0.4 mmピッチの高密度BGAボール直下から全信号を最短距離で引き出します。',
      'SLVS-EC・PCIe Gen4・USB 10Gbps・HDMI 2.1といった数GHz〜数十GHz級の差動ペア配線は、誘電正接の低い低損失FR-4/樹脂基材と厳密な85 Ω / 90 Ω / 100 Ωインピーダンス管理で設計されています。',
      '四隅の無電解ニッケル／金めっき（ENIG）花弁状グラウンドランドがマグネシウム筐体と360°低インピーダンスでネジ締結され、基板全体の電位基準を安定化します。',
    ],
    formula: {
      expression: 'Z_diff ≈ 2·Z₀·(1 − 0.48·e^(-0.96·s/h)) = 85 Ω / 90 Ω / 100 Ω（±7% 厳密整合）',
      description: '12層内部の銅箔幅・間隔・絶縁厚をミクロン単位で管理し、超高速データ信号の反射や文字化けを完全に防ぐ',
    },
    nextGenInnovation:
      'α7 IVのSY-1122からα7 V（AT&S製高多層基板）へと進化するにつれ、さらなる低損失樹脂と微細ライン＆スペース（30/30 μm級）により、BIONZ XR2の超広帯域バスをコンパクトなフルサイズボディへ収めています。',
    specs: [
      { label: '実機部品番号', value: 'Sony SY-1122（1-009-592-41 / A-5038-714-A）' },
      { label: '積層構造', value: '12層 Any-Layer HDI（レーザー充填マイクロビア構造）' },
      { label: '表面処理', value: '無電解ニッケル／金めっき（ENIG）＋ マットエメラルドSR' },
      { label: 'インピーダンス管理', value: '85 Ω（PCIe）/ 90 Ω（USB）/ 100 Ω（SLVS-EC・HDMI・MIPI）' },
    ],
    diagramType: 'xr_sy1122_hdi_mainboard',
  },

  'xr-backside-mlcc-emi-cage': {
    title: 'XR52. 基板裏面 BGA直下 01005超小型MLCC群 ＆ SUS304プレス背面EMIファラデーシールド缶',
    subtitle: 'Backside BGA-Shadow 01005 MLCC Decoupling Courtyard & Stamped SUS304 EMI Shield Cage',
    category: 'BIONZ XRパッケージ内部超解剖 XR52 — チップの真裏に80個の超極小コンデンサを敷き詰め、鉄壁の金属カバーで封印',
    plainAnalogy:
      'BIONZ XRが1秒間に何十億回も計算すると、一瞬だけ大量の電気をゴクッと飲み込みます。電源ICから少し離れた場所では間に合わないため、基板の「真裏（BGAの真下）」にゴマ粒より小さい01005コンデンサを80個もびっしり並べて即座に電気を補給し、さらにその上からステンレスの金属フタをパチンと被せて電波ノイズ漏れを完全封印しています。',
    summary:
      'SY-1122メイン基板のBIONZ XR直下裏面に配置された80個以上の01005/0201超低ESL積層セラミックコンデンサ（MLCC）デカップリング群と、洋白（C7521）フェンス＋SUS304スナップイン蓋による背面EMIファラデーケージ。',
    opticsAndPhysics: [
      '01005サイズ（わずか 0.4×0.2 mm）のMLCCをBGA電源・GNDボールの真裏へ垂直マイクロビア直結で配置することで、配線ループインダクタンスを 0.15 nH 以下に抑え、数百MHz帯の電源リップルを瞬時に吸収します。',
      '外周を囲う洋白（銅・ニッケル・亜鉛合金 C7521）フレームとディンプル嵌合するSUS304ステンレス蓋が、基板裏面からの不要輻射を最大 -58 dB 遮蔽します。',
      '蓋に開けられた小孔群は遮断周波数（カットオフ波長）以下の微細径に設計されており、GHz帯電波は一切通さずに内部の熱気だけを逃がす「導波管カットオフ換気孔」になっています。',
    ],
    formula: {
      expression: 'f_cutoff = c / (3.41 · d_hole)   （孔径 d = 1.5 mm → 58 GHz 以下の電波を完全に遮断！）',
      description: '丸い換気穴でも直径が電波の波長よりずっと小さければ、熱は通してもWi-Fiやノイズ電波は一切通り抜けられない',
    },
    nextGenInnovation:
      '表と裏の両面からコンフォーマル膜（XR01）＋背面シールド缶（XR52）でサンドイッチ遮蔽することで、高感度ISO 51200以上の撮影でも基板デジタルノイズの混入をゼロレベルへ抑え込んでいます。',
    specs: [
      { label: '裏面デカップリング', value: '01005 / 0201 超低ESL MLCC ×80個（BGA直下配置）' },
      { label: 'ループインダクタンス', value: '≤ 0.15 nH（垂直ビア直結・高周波ノイズ吸収）' },
      { label: 'シールド缶材質', value: 'C7521 洋白フレーム ＋ SUS304 スナップイン蓋（0.20 mm厚）' },
      { label: '電磁遮蔽性能', value: '約 -58 dB（1〜6 GHz帯・導波管カットオフ換気孔付き）' },
    ],
    diagramType: 'xr_backside_mlcc_emi_cage',
  },

  'xr-dedicated-ai-coproc': {
    title: 'XR53. 専用AIプロセッシングユニット外付けBGA（α7R V / α9 III世代比較ベイ）＆ 専用2GB LPDDR4',
    subtitle: 'Dedicated AI Processing Unit Companion BGA (α7R V / α9 III Architecture) & 2 GB LPDDR4',
    category: 'BIONZ XRパッケージ内部超解剖 XR53 — 骨格姿勢推定AFを生んだ「外付けAI相棒チップ」（XR2統合前世代との対比）',
    plainAnalogy:
      'α7R Vやα9 IIIで世界を驚かせた「人間が後ろを向いても骨格で瞳を見失わないAIオートフォーカス」は、BIONZ XRのすぐ横に置かれたこの「AI専門の相棒チップ」と専用2GBメモリが担当していました！そして次世代BIONZ XR2（α7 V）では、この丸ごと1個のAIチップとメモリがメインパッケージの中へ合体したのです。並べて見ると進化が一目瞭然です。',
    summary:
      'Sony α7R V（ILCE-7RM5）およびα9 IIIでBIONZ XRの隣接コンパニオンとして搭載された専用AIプロセッシングユニット（ディープラーニング推論専用BGA）と、学習済みモデル展開用の専用2 GB LPDDR4メモリモジュール。',
    opticsAndPhysics: [
      '人物の骨格・関節姿勢推定（Pose Estimation）や動物・鳥・昆虫・車・列車・飛行機の7種被写体認識CNN/Transformerモデルを専用NPUで並列実行し、BIONZ XR本体へ認識座標のみを高速伝送します。',
      'メインのLPDDR5X帯域を圧迫しないよう、隣接配置された専用の2 GB LPDDR4-3733 DRAMに重み係数と中間特徴マップを常駐させます。',
      '2025–2026年のBIONZ XR2（α7 V）では本チップのAI演算器がメインダイ内のXR14統合NPUへモノリシック統合され、基板面積削減・通信レイテンシ半減・さらなる省電力化を達成しました。',
    ],
    formula: {
      expression: '遅延削減 Δt_AI = t_offchip_bus(BIONZ XR + 外付けAI) → t_onchip_NoC(BIONZ XR2) ≈ 1/4 以下',
      description: '外付け相棒チップで確立したAI姿勢推定を、次世代XR2では1チップ内部へ直結統合して反応速度と省電力を飛躍的に向上',
    },
    nextGenInnovation:
      '「BIONZ XR＋外付けAIユニット（α7R V / α9 III）」から「AI完全統合BIONZ XR2（α7 V）」への歴史的アーキテクチャ進化を、同一メイン基板上で立体比較できる展示ベイです。',
    specs: [
      { label: '搭載実機世代', value: 'Sony α7R V / α9 III / α1 II（BIONZ XR コンパニオン構成）' },
      { label: '専用メモリ構成', value: '隣接 2 GB LPDDR4-3733 DRAM（AI重み係数専用）' },
      { label: '認識被写体', value: '人物骨格姿勢・動物・鳥・昆虫・車・列車・飛行機（7種）' },
      { label: 'XR2での進化', value: 'メインダイ内 XR14 統合NPU へ完全ワンチップ化' },
    ],
    diagramType: 'xr_dedicated_ai_coproc',
  },

  'xr-wifi6e-bt-sip-module': {
    title: 'XR54. 村田製作所 Wi-Fi 6E（2×2 MIMO）＆ Bluetooth 5.3 シールドLGA SiP無線モジュール',
    subtitle: 'Murata Shielded Wi-Fi 6E (2×2 MIMO) & Bluetooth 5.3 LGA SiP Module + Dual MHF4 Coax',
    category: 'BIONZ XRパッケージ内部超解剖 XR54 — 撮影した写真や動画をスマホ・クラウドへ爆速転送する「銀色の超小型無線基地」',
    plainAnalogy:
      'カメラで撮ったばかりの高画質写真を一瞬でスマホ（Creators’ App）や報道局のFTPサーバーへ飛ばし、さらにBluetoothでGPS位置情報やワイヤレスリモコンも同時に繋ぐ「小さなスマホ無線局」です。金属の銀色カバー（シールドSiP）の中に無線チップと超精密フィルタがぎっしり封入され、2本の金メッキ同軸コネクタ（MHF4）からアンテナ基板（AN-1043）へ電波を送ります。',
    summary:
      '2.4 GHz / 5 GHz / 6 GHz（Wi-Fi 6E 802.11ax 2×2 MIMO）およびBluetooth 5.3を1パッケージに封止した村田製作所系シールドLGA SiPモジュールと、2基のI-PEX MHF4金メッキ極細同軸アンテナジャック。',
    opticsAndPhysics: [
      '2×2 MIMO（送信2本・受信2本の空間多重）により、2本の独立したMHF4マイクロ同軸ケーブル経由でα7 IVのAN-1043アンテナ基板へ接続し、最大 1.2 Gbps 級の高速Wi-Fi転送を実現します。',
      'モジュール表面のニッケル銀（Ni-Ag）コンフォーマルシールドとセラミック帯域通過ダイプレクサが、無線送信電力（最大 +18 dBm）のBIONZ XRやセンサーへの回り込みを徹底遮断します。',
      'Bluetooth Low Energy（BLE）チャネルは電源OFFに近い低消費電力でも位置情報リンクやスマホからのリモート電源ON（Wake-on-BLE）を維持します。',
    ],
    formula: {
      expression: 'C_MIMO = N_stream · B · log₂(1 + SNR)   （2×2 MIMO 空間多重でスループットを最大約 2 倍化）',
      description: '2本のアンテナで同時に別々のデータ波を送受信することで、重いRAWファイルや4Kプロキシ動画のFTP転送時間を半減',
    },
    nextGenInnovation:
      '最新のα7 V / BIONZ XR2世代では6 GHz帯Wi-Fi 6E対応とUSB-Cテザーの併用により、スポーツ報道の現場からシャッター数秒後には編集部へJPEG/RAWが届くワークフローを支えています。',
    specs: [
      { label: 'モジュール構造', value: '村田製作所系 シールドLGA SiP（2.4 / 5 / 6 GHz + BT 5.3）' },
      { label: 'アンテナ空間多重', value: '2×2 MIMO（I-PEX MHF4 50 Ω 金メッキ同軸 ×2 → AN-1043）' },
      { label: '物理層最大速度', value: '最大 1.2 Gbps 級（802.11ac/ax 80 MHz 帯域幅）' },
      { label: 'ホスト接続バス', value: 'SDIO 3.0 / PCIe ＋ 高速UART（Bluetooth HCI）' },
    ],
    diagramType: 'xr_wifi6e_bt_sip_module',
  },

  'xr-usbc-pd-10g-redriver': {
    title: 'XR55. USB Type-C PD 3.1コントローラ（TI TPS65987D）＆ 10 Gbps リドライバ（TI TUSB1044）',
    subtitle: 'TI TPS65987D USB-C PD Controller & TI TUSB1044 10 Gbps SuperSpeed+ Reversible Redriver',
    category: 'BIONZ XRパッケージ内部超解剖 XR55 — 表裏リバーシブルUSB-Cで「急速充電」と「10Gbps超高速配信」を同時処理する司令塔',
    plainAnalogy:
      'USB-Cケーブルは上下どちら向きに挿しても使え、しかも「9V/15Vの急速充電」と「4Kライブ配信＆10Gbpsデータ転送」を1本でこなします。それを裏で支えているのがこの2つのTI製チップ。TPS65987Dが「ケーブルの向きと充電器の実力」を会話して交渉し、TUSB1044が弱くなった10Gbps超高速信号に元気を注入して（イコライザ増幅）PCへ届けます。',
    summary:
      'USB Type-C 24ピン・レセプタクルの接続方向検出・USB Power Delivery（PD）電力ネゴシエーションを担うTI TPS65987D（QFN-56）と、10 Gbps（USB 3.2 Gen2）双方向線形リドライバ＆クロスポイントスイッチのTI TUSB1044（WQFN-40）。',
    opticsAndPhysics: [
      'TPS65987DはCC1/CC2ピンを通じてUSB-PD充電器とデジタル通信（BMC符号化）を行い、5 V / 9 V / 15 V・最大27〜45 Wの最適な給電プロファイルを安全に交渉・切替します。',
      '10 Gbps（ナイキスト周波数 5 GHz）の超高速信号は数cmの基板配線とコネクタを通るだけで減衰しますが、TUSB1044のCTLE（連続時間線形イコライザ）が最大 +14 dB の高域補償を行い、アイパターンをくっきり復活させます。',
      'プラグの表裏反転に応じて4レーンのTX/RX差動ペアを内部クロスポイントスイッチで瞬時に切り替え、UVC/UAC 4Kウェブカメラ配信や高速テザー撮影を途切れさせません。',
    ],
    formula: {
      expression: 'Loss_ch(5 GHz) ≈ −8 dB  +  Gain_CTLE(TUSB1044) ≈ +8 dB  →  平坦な広帯域 10 Gbps 伝送！',
      description: '高速になるほど減りやすい高周波成分だけをリドライバがピンポイントで持ち上げ、長いUSB-Cケーブルでもエラーゼロを実現',
    },
    nextGenInnovation:
      'α7 IVの10 Gbps USB-C（UVC/UAC 4K配信対応）に続き、α7 V世代ではデュアルUSB-Cポート構成へと進化し、給電と高速データ転送／外部SSD収録を完全分離できるプロ仕様へ発展しています。',
    specs: [
      { label: 'PDコントローラIC', value: 'Texas Instruments TPS65987D（USB Type-C & PD 電源スイッチ内蔵）' },
      { label: '10GリドライバIC', value: 'Texas Instruments TUSB1044（10 Gbps 双方向線形リドライバ）' },
      { label: '対応データ速度', value: 'USB 3.2 Gen2 10 Gbps（UVC/UAC 4Kストリーミング・テザー）' },
      { label: '配線インピーダンス', value: '90 Ω 差動ペア ＋ 0201 TX ACカップリングコンデンサ ×4' },
    ],
    diagramType: 'xr_usbc_pd_10g_redriver',
  },

  'xr-usbc-charger-efuse': {
    title: 'XR56. USB-C PD 昇降圧バッテリー充電器（TI BQ25713）＆ 15A スマートeFuse（TI TPS25982）',
    subtitle: 'TI BQ25713 NVDC Buck-Boost USB-PD Charger & TI TPS25982 2.7 mΩ 15 A Smart eFuse',
    category: 'BIONZ XRパッケージ内部超解剖 XR56 — どんなUSB充電器からも安全に7.2V電池を充電し、異常時は即座に遮断する「電子ヒューズ＆変圧器」',
    plainAnalogy:
      'USB充電器は「5V」だったり「9V」「15V」だったり電圧がバラバラですが、カメラのNP-FZ100電池は「7.2V（満充電8.4V）」です。BQ25713は5Vが来たら自動で電圧を上げ（昇圧）、15Vが来たら下げる（降圧）賢い変圧器！さらにTPS25982は、もし粗悪ケーブルで異常な大電流や高電圧が流れた瞬間にマイクロ秒で電気を止める「何度でも復活できる電子ヒューズ」です。',
    summary:
      'USB-C PD入力（3.5 V〜24 V）から2直列リチウムイオン電池（NP-FZ100：公称 7.2 V / 満充電 8.4 V）をシームレスに昇降圧充電・システム同時給電するTI BQ25713（WQFN-32）と、オン抵抗わずか 2.7 mΩ のTI TPS25982スマートeFuse。',
    opticsAndPhysics: [
      '4石の同期整流MOSFETと大型4.7 μHメタルアロイ・インダクタによるHブリッジ昇降圧（Buck-Boost）トポロジで、入力電圧が電池電圧より低くても（5 V）高くても（9 V / 15 V）途切れなく95%以上の高効率で電力変換します。',
      'Narrow VDC（NVDC）パワーパス制御により、バッテリーが空の状態でもUSB-PDを挿した瞬間にカメラシステム（BIONZ XR）へ優先給電して即座に撮影を開始できます。',
      'TI TPS25982スマートeFuseはわずか 2.7 mΩ の極低損失で最大 15 A を通しつつ、30 Vサージや短絡（ショート）を検知すると瞬時にゲートを遮断し、メイン基板SY-1122の焼損を未然に防ぎます。',
    ],
    formula: {
      expression: 'P_loss(eFuse) = I² · R_ON = (5 A)² × 0.0027 Ω ≈ 0.068 W（発熱ほぼゼロで 15 A 級を完全監視）',
      description: '極めて抵抗の低い半導体スイッチを電子ヒューズとして使うことで、通常時は熱を出さず異常時だけ一瞬で回路を遮断',
    },
    nextGenInnovation:
      '長時間のライブ配信や星景タイムラプス撮影中にモバイルバッテリーからUSB-PD給電し続けられる「安心の無限撮影パワーパス」の心臓部です。',
    specs: [
      { label: '昇降圧充電IC', value: 'Texas Instruments BQ25713（WQFN-32 / I²C NVDC 1–4セル）' },
      { label: 'スマートeFuse IC', value: 'Texas Instruments TPS25982（2.7–24 V、R_ON 2.7 mΩ、最大 15 A）' },
      { label: '電力インダクタ', value: '4.7 μH 大電流シールド合金インダクタ ＋ 10 mΩ 電流検出シャント' },
      { label: '対応充電入力', value: 'USB-PD 5 V / 9 V / 15 V / 20 V 自動シームレス昇降圧' },
    ],
    diagramType: 'xr_usbc_charger_efuse',
  },

  'xr-pcie-cfx-clock-mux': {
    title: 'XR57. 100 MHz PCIe Gen4 HCSLクロック生成器（Renesas 9FGV0241）＆ CFx/UHS-II 高速MUX（PI3PCIE3412）',
    subtitle: 'Renesas 9FGV0241 100 MHz PCIe Gen4 HCSL Clock Gen & Diodes PI3PCIE3412 Combo Slot MUX',
    category: 'BIONZ XRパッケージ内部超解剖 XR57 — 「CFexpress Type A」と「SD UHS-II」両方が挿さる魔法のコンボスロット切替器',
    plainAnalogy:
      'α7 IVのカードスロット1は、超高速な「CFexpress Type A」も、定番の「SDカード」も同じ1つの穴に挿して使える便利なコンボスロットです！その裏では、Diodes製の超高速電子スイッチ（MUX）が挿さったカードの種類を瞬時に見分けてPCIe高速道路とSD道路を切り替え、Renesas製100 MHz超高精度クロックが800 MB/s超の連写書き込みのリズムを正確に刻んでいます。',
    summary:
      'PCIe Gen1〜Gen4対応の超低ジッタ100 MHz HCSL差動クロック生成器（Renesas 9FGV0241、VFQFPN-24、100 Ω終端内蔵）と、CFexpress Type A（PCIe）およびSDXC UHS-IIの高速差動レーンを自動切替するDiodes PI3PCIE3412（42ピンTQFN）マルチプレクサ。',
    opticsAndPhysics: [
      'Renesas 9FGV0241は25 MHz基準水晶から0.7 V低電力HCSL（High-Speed Current Steering Logic）方式の100.000 MHz差動クロックを生成し、BIONZ XR内部のPCIeコントローラとCFexpressカード側をフェムト秒級ジッタで同期させます。',
      'Diodes PI3PCIE3412 / PI3DBS16413は2:1の超広帯域アナログMUXスイッチで、挿入検出ピンに応じてPCIe Gen3/Gen4（8〜16 GT/s）とSD UHS-II LVDSレーンを極めて低い挿入損失（< 1.0 dB）で切り替えます。',
      '基板上では85 Ω差動ペアのP/N間スキューを 0.1 mm 以内に揃える蛇行（サーペンタイン）等長配線が施されています。',
    ],
    formula: {
      expression: 'Jitter_RMS(PCIe Gen4) < 0.5 ps   ＋   差動インピーダンス Z_diff = 85 Ω（等長公差 ±0.1 mm）',
      description: '1兆分の0.5秒以下の正確なリズムと等長配線により、RAW無限連写や4K All-I動画の書き込みエラーをゼロに保つ',
    },
    nextGenInnovation:
      '次世代CFexpress 4.0（PCIe Gen4 x1：最大2 GB/s級）を見据えた100 MHz超低ジッタ基準クロックと超広帯域MUX設計により、バッファ解放時間を数秒レベルへ短縮します。',
    specs: [
      { label: 'PCIeクロックIC', value: 'Renesas 9FGV0241（1.8 V 100 MHz HCSL、Zo=100 Ω 終端内蔵）' },
      { label: '高速レーンMUX', value: 'Diodes PI3PCIE3412 / PI3DBS16413（42ピン TQFN 2:1 スイッチ）' },
      { label: '対応カード規格', value: 'CFexpress Type A（PCIe Gen3/4）⇔ SDXC UHS-II 自動切替' },
      { label: '差動配線設計', value: '85 Ω 蛇行等長マイクロストリップ ＋ 0201 AC結合コンデンサ' },
    ],
    diagramType: 'xr_pcie_cfx_clock_mux',
  },

  'xr-mipi-evf-lcd-bridge': {
    title: 'XR58. デュアルMIPI-DSI 240Hz EVF・バリアングル液晶ブリッジ ＆ 村田 DLM0NSN コモンモードチョーク群',
    subtitle: 'Dual-Stream MIPI-DSI 240Hz EVF & Articulating LCD Bridge + Murata DLM0NSN900HY2 Choke Bank',
    category: 'BIONZ XRパッケージ内部超解剖 XR58 — 滑らかなファインダー映像と液晶を同時に送りつつ、フレキケーブルからの電波漏れを食い止める関所',
    plainAnalogy:
      'ファインダー（EVF）を覗けば120fpsの超滑らか映像、背面を開けばバリアングル液晶が即座に映ります。ただ、液晶へ伸びる長いヒンジケーブルは放っておくと「ノイズを撒き散らすアンテナ」になってWi-Fi受信を邪魔してしまいます。そこで5個の超極小コイル（村田DLM0NSN）が、映像信号だけは素通ししてノイズ電波だけをピタッとブロックしています！',
    summary:
      'BIONZ XRのディスプレイ出力から有機ELファインダー（369万〜944万ドット・最大120/240 Hz）およびバリアングル液晶へMIPI-DSI差動映像を分配駆動するブリッジICと、村田製作所DLM0NSN900HY2コモンモードチョークコイル群。',
    opticsAndPhysics: [
      '4本のデータ差動レーン＋1本のクロック差動レーン（計5ペア、100 Ω差動）のそれぞれに村田DLM0NSN900HY2（コモンモードインピーダンス 90 Ω @ 100 MHz）を直列挿入しています。',
      '互いに逆位相で流れる正常な映像信号（ディファレンシャルモード）は磁束が打ち消し合って無減衰で通過させ、同位相で乗ってくる放射ノイズ（コモンモード）だけを高インピーダンスで強力に減衰させます。',
      '0.35 mmピッチの超狭ピッチ40ピンB2B/FPCコネクタ2基により、EVFモジュールとヒンジ経由のバリアングル液晶同軸ハーネスへ確実に信号とバックライト電源を供給します。',
    ],
    formula: {
      expression: 'Z_cm(100 MHz) = 90 Ω（ノイズ強力遮断）  ／  Z_diff = 100 Ω（MIPI D-PHY 2.5 Gbps/lane 無損失通過）',
      description: '正しい映像信号には透明な窓として振る舞い、Wi-Fiやセンサーを邪魔する同相ノイズだけを選んで吸い取る磁気フィルタ',
    },
    nextGenInnovation:
      'ブラックアウトフリー連写（最大30〜120コマ/秒）と遅延を感じさせない高リフレッシュEVF表示を、一切のWi-Fi感度低下なしに両立するEMC（電磁両立性）技術の結晶です。',
    specs: [
      { label: 'ノイズフィルタ', value: '村田製作所 DLM0NSN900HY2 ×5（MIPI D-PHY/M-PHY用 CMチョーク）' },
      { label: '対応表示系統', value: 'Quad-VGA / QXGA OLED EVF（120/240 Hz）＋ バリアングルLCD' },
      { label: '出力インターフェース', value: '4-Lane MIPI-DSI ＋ Clock（100 Ω 差動・40ピン狭ピッチFPC ×2）' },
      { label: 'EMC保護対象', value: '2.4 GHz / 5 GHz Wi-Fi 受信感度劣化（デセンス）防止' },
    ],
    diagramType: 'xr_mipi_evf_lcd_bridge',
  },

  'xr-akm-audio-codec-afe': {
    title: 'XR59. 高音質4ch 24/32-bit オーディオCODEC（AKM AK4619VN）＆ 低ノイズ・マイクプリアンプ',
    subtitle: 'AKM AK4619VN 32-QFN 4-Ch 24/32-Bit 192 kHz Audio CODEC & Split-Ground Analog Front-End',
    category: 'BIONZ XRパッケージ内部超解剖 XR59 — 「サーッ」という雑音を極限まで消し、スタジオ級のクリアな音を録音する専用音響スタジオ',
    plainAnalogy:
      'マイクが拾う声の電気信号はほんの数ミリボルトと極小なので、すぐ隣にいるBIONZ XRの激しいデジタル雑音が少しでも混ざると「サーッ」「ジーッ」と台無しになります。そこで基板上に金色の「お堀（AGND/DGND分離スリット）」を掘ってデジタル雑音を遮断し、旭化成（AKM）製の高音質オーディオ専用チップで24bit/32bitのクリアな音へと変換しています。',
    summary:
      '旭化成エレクトロニクス（AKM）の32ピンQFN（5×5 mm）4チャンネル高解像度オーディオCODEC「AK4619VN」と、デュアル低雑音差動マイクプリアンプ・アナログ／デジタル分離グラウンドアイランド。',
    opticsAndPhysics: [
      'AK4619VNは差動入力対応の4ch 24-bit ADC（S/N比 106 dB）と4ch 32-bit DAC（最大192 kHz）を内蔵し、内蔵ステレオマイク・外部3.5 mmマイク入力・ヘッドホンモニタ出力を1チップで高品位処理します。',
      '基板銅箔上に明確な「AGND（アナログ接地）とDGND（デジタル接地）の分離モート（お堀）」を設け、デジタル電源のリターン電流が微弱なマイク増幅段へ流れ込まないよう物理隔離しています。',
      'I²S / TDMデジタル音声シリアルバスでBIONZ XRの音声DSP（XR18）へ直結され、風切り音低減やレンズ駆動音キャンセルとシームレスに連携します。',
    ],
    formula: {
      expression: 'SNR = 106 dB  →  ダイナミックレンジ約 200,000 : 1（ささやき声から轟音まで歪みゼロで収録）',
      description: '分割グラウンド設計と低ノイズLDO・C0G音響コンデンサの組み合わせにより、動画収録時のフロアノイズを極限まで低減',
    },
    nextGenInnovation:
      '内蔵3.5 mmアナログ入力の高音質化に加え、マルチインターフェースシュー（XR60）経由の4ch 24-bitデジタル音声入力と組み合わせたプロフェッショナル動画音声収録を支えます。',
    specs: [
      { label: 'オーディオCODEC', value: '旭化成エレクトロニクス AKM AK4619VN（32-QFN 5×5 mm）' },
      { label: '量子化・サンプリング', value: '4ch 24-bit ADC / 32-bit DAC（最大 192 kHz、I²S / TDM）' },
      { label: 'ダイナミックレンジ', value: 'S/N比 106 dB（差動マイク入力アンプ内蔵）' },
      { label: 'ノイズ隔離設計', value: 'AGND / DGND 物理分離モート ＋ 専用低ノイズLDO・C0Gコンデンサ' },
    ],
    diagramType: 'xr_akm_audio_codec_afe',
  },

  'xr-mishoe-digital-if': {
    title: 'XR60. マルチインターフェースシュー（MIS-2006）デジタル音声I²Sアイソレータ ＆ 高耐圧ストロボ同期保護',
    subtitle: 'Sony MIS-2006 21-Pin Digital Audio Serial Isolator & 250 V IGBT Flash-Sync Guard',
    category: 'BIONZ XRパッケージ内部超解剖 XR60 — ケーブル無しでデジタルマイクや大光量ストロボを繋ぎ、高電圧の逆流から頭脳を守る関所',
    plainAnalogy:
      'ソニーαのホットシュー（頭の上の金具）には、実は奥に「21本の極小ピン」が並んでおり、マイクを挿すだけでケーブルも電池も無しに純粋なデジタル音声が録音できます。一方で古い大型スタジオストロボを繋ぐと一瞬だけ数百ボルトの高電圧が返ってくることがあるため、250V耐圧の保護スイッチ（IGBT）と信号アイソレータでBIONZ XRを鉄壁に守っています。',
    summary:
      'α7 IV実機基板「MIS-2006」の21ピン・マルチインターフェース（MI）シューとSY-1122メイン基板を繋ぐ、デジタル音声I²Sアイソレーションバッファおよび250 V高耐圧IGBTフラッシュシンクロ駆動・TVSサージ保護インターフェース。',
    opticsAndPhysics: [
      'ECM-B1Mなどのデジタルショットガンマイクから届くデジタル音声（I²Sクロック・データ）をアナログ変換を一切経ずにアイソレーションバッファ経由でBIONZ XRへ直接入力し、ケーブル由来のノイズ混入を根絶します。',
      'X接点（ストロボ発光同期）ラインには耐圧 250 V 以上の高速IGBTスイッチとTVSダイオードを配置し、外部ストロボ側の高圧トリガ電圧や静電気放電が1.8 VロジックのBIONZ XRへ侵入するのを完全に阻止します。',
      'アクセサリー給電用の電流制限スイッチを備え、雨滴によるシュー端子間の微小リークや短絡が発生しても即座に給電を保護遮断します。',
    ],
    formula: {
      expression: 'V_sync_rating ≥ 250 V（IGBT耐圧）  ⇔  V_core(BIONZ XR) = 0.75 V（330倍の電圧差を安全に隔離）',
      description: '外部アクセサリーからの高圧サージや雨滴ショートを入口で完全に受け止め、精密なBIONZ XRを1ミリも傷つけない',
    },
    nextGenInnovation:
      '4チャンネル24-bitデジタル音声収録（XLR-K3M等）と完全ワイヤレスな外部マイク・フラッシュ・タイムコード連携を、1つの21ピン・インターフェースで統合しています。',
    specs: [
      { label: '対応実機サブ基板', value: 'Sony MIS-2006（21ピン マルチインターフェース・ホットシュー）' },
      { label: 'デジタル音声経路', value: 'ケーブルレス I²S デジタルオーディオ直結（4ch 24-bit対応）' },
      { label: 'フラッシュ同期保護', value: '250 V 高耐圧 IGBT シンクロトリガ ＋ 静電気TVSクランプ' },
      { label: '電源保護', value: 'アクセサリー給電 電流制限ロードスイッチ内蔵' },
    ],
    diagramType: 'xr_mishoe_digital_if',
  },

  'xr-emount-lens-comm-if': {
    title: 'XR61. 高速Eマウントレンズ通信バス（EBL 10ピン SPI/UARTレベルシフタ ＆ 8.4V XDリニア電源）',
    subtitle: 'E-Mount EBL 10-Pin High-Speed Lens Bus Level-Shifter & 8.4 V XD-Linear Actuator Power Switch',
    category: 'BIONZ XRパッケージ内部超解剖 XR61 — カメラとレンズが1秒間に120回ピント作戦会議をし、強力モーターへ電気を送る10本の動脈',
    plainAnalogy:
      '高速AFのG Masterレンズでは、カメラの頭脳（BIONZ XR）が「あと0.02ミリ前へ動け！」と1秒間に何十回〜120回もレンズへ命令を飛ばし、レンズ側も「今ここです！手ブレ補正も連動します！」と返事します。この回路は、1.8Vで話すBIONZ XRと3.3Vで話すレンズの通訳（レベルシフタ）をしつつ、大口径レンズのXDリニアモーターを動かす強力な8.4V電源も安全に供給します。',
    summary:
      'α7 IV実機のレンズ接点ストリップ「EBL（10ピン）」へ直結する、1.8 V⇔3.3 V高速双方向SPI/UARTレベルシフタ（TXB0108系）と、大電流XDリニアモーター駆動用 5.0 V / 8.4 V パワーロードスイッチ＋タンタル・エネルギーリザーバ。',
    opticsAndPhysics: [
      '10本の金メッキ接点を通じ、高速クロック同期シリアル（SPI/UART）でフォーカス位置・絞り値・収差補正プロファイル・ブリージング補正係数・レンズ内OSS手ブレ補正データを毎フレーム双方向通信します。',
      '50mm F1.2 GMや望遠GMレンズに搭載された複数基のXDリニアモーターが瞬発的に大きな起動電流を要求する際、大容量POSCAPタンタルコンデンサが電圧ドロップを防ぎながら 8.4 V（電池直結系）を供給します。',
      'レンズ着脱時の「活線挿抜（ホットプラグ）」による接点バウンスや誤ショートを検知し、ロックピン連動スイッチと協調して確実に電源シーケンスを遮断・再投入します。',
    ],
    formula: {
      expression: 'AF閉ループ制御周期 T_AF = 1 / 60 s 〜 1 / 120 s（像面位相差算出 → EBL高速送信 → XDリニア駆動）',
      description: 'BIONZ XRの像面位相差演算結果を遅延ほぼゼロでレンズのXDリニアモーターへ届け、瞳をミリ単位で追い続ける',
    },
    nextGenInnovation:
      'ボディ側5軸IBISとレンズ側OSSのリアルタイム協調制御や、動画時のフォーカスブリージング補正を成立させる「ボディ⇔レンズ神経接続」の中核インターフェースです。',
    specs: [
      { label: '対応実機インターフェース', value: 'Sony EBL 10ピン Eマウントレンズ接点フレックスバス' },
      { label: '電圧レベル変換', value: '1.8 V（BIONZ XR）⇔ 3.3 V（レンズMCU）双方向高速シフタ' },
      { label: 'レンズ駆動電源', value: 'ロジック 3.3–5.0 V ＋ アクチュエータ 8.4 V 大電流ロードスイッチ' },
      { label: '瞬発電流対策', value: '低ESR POSCAP タンタル・バルクコンデンサ直近配置' },
    ],
    diagramType: 'xr_emount_lens_comm_if',
  },

  'xr-genlock-timecode-mcu': {
    title: 'XR62. 高精度タイムコード / Genlock 同期サブMCU（ST STM32F031E6 Cortex-M0 ＆ 27MHz VCXO）',
    subtitle: 'STMicroelectronics STM32F031E6 ("Genlock") ARM Cortex-M0 Timecode & Multi-Cam Sync MCU',
    category: 'BIONZ XRパッケージ内部超解剖 XR62 — 複数カメラのシャッターと映像の「1フレームのズレ」も許さない映画現場のタイムキーパー',
    plainAnalogy:
      'ライブ会場や映画撮影でカメラを5台並べて同時に撮るとき、それぞれの時計がほんの少しでもズレると編集で音と映像が合わなくなります。OpenMemoriesの解析でも存在が確認されているこのSTマイクロ製サブマイコン（通称Genlock）は、27 MHzの精密な可変水晶を使って外部タイムコードとピタリと歩調を合わせる「専属タイムキーパー」です。',
    summary:
      'OpenMemories実機解析で確認されたSTMicroelectronics製ARM Cortex-M0サブマイコン「STM32F031E6（コードネーム：Genlock）」と、27.000 MHz電圧制御水晶発振器（VCXO）・LTC差動タイムコード入出力バッファ。',
    opticsAndPhysics: [
      '48 MHz動作の超低消費電力32-bit ARM Cortex-M0コアが、BIONZ XRの重いOS処理から完全に独立したハードウェアタイマーでSMPTEタイムコード（23.976 / 24 / 25 / 29.97 / 59.94 fps）とDrop-Frameカウントを正確に刻みます。',
      '外部のマスタークロック（LTC/Genlock）との微小な位相ズレを検知すると、27.000 MHz VCXOの制御電圧を微調整して映像フレーム境界をマイクロ秒精度でロックします。',
      '撮影中だけでなくスタンバイ中もフレームカウントを保持し、マルチカメラ収録・バーチャルプロダクション（LEDウォール同期）でのフリッカーや音ズレを完全に防ぎます。',
    ],
    formula: {
      expression: '同期ドリフト Δt < ±1 ppm  →  1時間連続撮影してもズレはわずか 3.6 ms（0.1フレーム未満！）',
      description: '専用Cortex-M0と27 MHz VCXOの閉ループ位相制御により、複数台カメラの映像と音声を長時間ピタリと一致させる',
    },
    nextGenInnovation:
      'α7 IVからCinema Line（FX3 / FX30 / FX6）まで共通のタイムコード同期・マルチカム連携エコシステムを下支えする、プロ映像制作必須の縁の下の力持ちです。',
    specs: [
      { label: '搭載サブMCU', value: 'STMicroelectronics STM32F031E6（ARM Cortex-M0・コード名 Genlock）' },
      { label: '基準発振器', value: '27.000 MHz 映像フレーム同期用 VCXO 水晶発振器' },
      { label: '対応フレームレート', value: '23.976 / 24 / 25 / 29.97 / 50 / 59.94 fps（DF / NDF）' },
      { label: '役割', value: 'マルチカメラ SMPTE タイムコード同期 ＆ 露光タイミング管理' },
    ],
    diagramType: 'xr_genlock_timecode_mcu',
  },

  'xr-ibis-servo-mcu': {
    title: 'XR63. 5軸ボディ内手ブレ補正（IBIS）専用サーボMCU（Renesas R2J30503LG "Bonobo"）＆ ホールADC',
    subtitle: 'Renesas R2J30503LG ("Bonobo") Dedicated 5-Axis SteadyShot IBIS Servo MCU & 3-Axis Hall ADC',
    category: 'BIONZ XRパッケージ内部超解剖 XR63 — 1秒間に1,000回センサーを宙に浮かせてピタッと止める「5軸手ブレ補正の専属操縦士」',
    plainAnalogy:
      '写真や動画を撮るとき、人の手は自分でも気づかないほど小刻みに震えています。もしBIONZ XRが画像処理の片手間で手ブレ補正をやると一瞬の遅れでブレてしまいます。そこでOpenMemoriesでも確認されたルネサス製の専用サーボマイコン「Bonobo（R2J30503LG）」が、センサーの位置を1秒間に1,000回監視しながら磁石でピタッと逆向きに動かして静止させます！',
    summary:
      'OpenMemories実機解析で確認されたルネサス エレクトロニクス製5軸光学式手ブレ補正専用サーボコントローラ「R2J30503LG（コードネーム：Bonobo）」と、3軸ホール素子位置検出フロントエンドADCおよびIBIS TEX-5810フレックス接続部。',
    opticsAndPhysics: [
      'ジャイロ（XR64）から届くピッチ・ヨー・ロール角速度と3軸加速度データ、さらにセンサーユニット側の3個のホール磁気センサーから返る「現在のセンサー座標（サブミクロン精度）」を1 kHz以上の高速サンプリングで取り込みます。',
      '専用ハードウェアPIDフィルタがリアルタイムに逆位相の目標座標を計算し、IBIS TEX-5810フレキシブル基板経由でX/Y/回転の3系統ボイスコイルモーター（VCM）へPWM駆動指令を送ります。',
      'BIONZ XRからは撮影中の焦点距離（mm）とフォーカス距離（撮影倍率）を常時受け取り、広角から超望遠・マクロまで5軸すべての補正ゲインを最適化します。',
    ],
    formula: {
      expression: 'u(t) = K_p·e(t) + K_i∫e(t)dt + K_d·de(t)/dt   （1 kHz 超高速閉ループでセンサーをサブミクロン静止！）',
      description: 'ジャイロの揺れ予測（フィードフォワード）とホール素子の実位置（フィードバック）を1ミリ秒ごとに計算して手ブレを打ち消す',
    },
    nextGenInnovation:
      'α7 IVの5.5段補正から、α7R V・α7 V世代の8.0段級IBIS＋ピクセルシフトマルチ撮影（1画素・0.5画素単位の超精密ステップ移動）までを可能にする、超精密サーボ制御の中核ICです。',
    specs: [
      { label: 'IBISサーボIC', value: 'Renesas R2J30503LG（OpenMemories確認・コード名 Bonobo）' },
      { label: 'センサー接続部', value: 'Sony IBIS TEX-5810 フレックスコネクタ（VCM駆動＋ホール帰還）' },
      { label: '位置検出精度', value: '3軸16-bit ホール素子位置ADC（サブミクロン分解能）' },
      { label: '制御ループ周期', value: '≥ 1 kHz リアルタイムPIDサーボ（5軸補正＋ピクセルシフト）' },
    ],
    diagramType: 'xr_ibis_servo_mcu',
  },

  'xr-epson-quartz-gyro-imu': {
    title: 'XR64. 高精度・直交デュアル水晶ジャイロ（Epson XV7011BB ×2）＆ 3軸加速度IMUモジュール',
    subtitle: 'Dual Orthogonal Epson XV7011BB Quartz Angular-Rate Gyros (5.0×3.2 mm) & 3-Axis Accel IMU',
    category: 'BIONZ XRパッケージ内部超解剖 XR64 — 「縦の揺れ」と「横の揺れ」を水晶の音叉で0.001度レベルで見抜く超精密三半規管',
    plainAnalogy:
      '人間の耳の奥にある「三半規管」と同じで、カメラがどっちへどれだけ傾いたかを一瞬で見抜くセンサーです！スマホ用の安価なシリコンMEMSだけでなく、セイコーエプソン製の「水晶（クォーツ）ジャイロ XV7011BB」をわざわざ90度直角に2個並べることで、温度が変わってもゼロ点が狂わず、1秒間の手持ち夜景でも星が点に写るほどの超高精度を実現しています。',
    summary:
      'セイコーエプソン製ダブルT型水晶振動子ジャイロセンサー「XV7011BB（5.0×3.2×1.3 mm、金シーム封止セラミックパッケージ）」をピッチ（0°）・ヨー（90°）へ直交配置した角速度検出部と、並進シフト（X/Y/Z）検出用3軸MEMS加速度IMU。',
    opticsAndPhysics: [
      'エプソン独自の「ダブルT型単結晶水晶振動子」は、シリコンMEMSに比べて温度ドリフト（ゼロ点バイアス ±1 °/s typ.）や振動耐性が圧倒的に優れており、長時間露光や動画パンニング時のふらつきを劇的に抑えます。',
      'コリオリの力（F_c = -2m(ω × v)）によって生じる極微弱な圧電電荷を内部の24-bit ΔΣ ADCでデジタル化し、高速SPIバス経由でIBISサーボMCU（XR63）へ遅延なく伝送します。',
      '基板上では周囲のシャッター衝撃共振を避けるため、2個の直交ジャイロの周囲に防振スリットと専用グラウンドガードを配置した「低共振アイランド設計」を採用しています。',
    ],
    formula: {
      expression: 'F_Coriolis = −2 m (ω × v)   （水晶音叉の振動 v に角速度 ω が掛かると直角方向にコリオリ力が発生）',
      description: '時計の心臓にも使われる超高安定な単結晶水晶のコリオリ力を測ることで、手のわずかな震えをノイズなく抽出',
    },
    nextGenInnovation:
      '本モジュールが記録した高周波ジャイロ・メタデータは動画ファイル内にも同期記録され、撮影後にSony Catalyst Browseでジンバル並みの超滑らかな後処理手ブレ補正を実現します。',
    specs: [
      { label: '搭載水晶ジャイロ', value: 'セイコーエプソン XV7011BB ×2（0°ピッチ / 90°ヨー直交実装）' },
      { label: 'パッケージ寸法', value: '5.0 × 3.2 × 1.3 mm（気密セラミック＋金めっきリッド）' },
      { label: 'ゼロ点安定性', value: 'ゼロレートバイアス ±1 °/s typ.（@+25℃・低ノイズ水晶）' },
      { label: '並進シフト検出', value: '隣接 3軸MEMS加速度IMU（マクロ撮影のX/Yシフトブレ対応）' },
    ],
    diagramType: 'xr_epson_quartz_gyro_imu',
  },

  'xr-shutter-hbridge-driver': {
    title: 'XR65. フォーカルプレーン・メカシャッター ＆ 絞り駆動デュアルHブリッジ（TI DRV8837 ×2）',
    subtitle: 'Dual TI DRV8837 WSON-8 (1.8 A) H-Bridge Mechanical Shutter Curtain & Cocking Motor Drivers',
    category: 'BIONZ XRパッケージ内部超解剖 XR65 — 1/8000秒でシャッター幕を正確に弾き飛ばし、次の一瞬で巻き上げる「双方向パワー筋肉ドライバ」',
    plainAnalogy:
      '「カシャッ！」と鳴るメカシャッターの先幕・後幕や巻き上げモーターは、正回転にも逆回転にも大きな電流をパッと一瞬だけ流す必要があります。この2mm角の超小型TI製チップ（DRV8837）2個が、内部の4つのスイッチ（Hブリッジ）を巧みに切り替えて大電流1.8Aを正確に流し、1/8000秒という目にも留まらぬ高速シャッター幕の走行を狂いなく制御しています。',
    summary:
      'フォーカルプレーンシャッターの先幕・後幕ソレノイドおよびチャージ（巻き上げ）モーターを双方向PWM駆動する、2基のTexas Instruments「DRV8837」（2.0×2.0 mm WSON-8、1.8 A、オン抵抗 280 mΩ）低電圧Hブリッジドライバと100 μFパルス電力リザーバ。',
    opticsAndPhysics: [
      '各DRV8837は4個の低抵抗NチャネルMOSFET（ハイサイド＋ローサイド合計 280 mΩ）でHブリッジを構成し、正転・逆転・ブレーキ・低消費電力スリープ（< 120 nA）をマイクロ秒応答で切り替えます。',
      '10コマ/秒のメカ連写時にシャッターチャージモーターが瞬間的にピーク電流を引いてもメイン電源が揺れないよう、直近に100 μFの低ESRタンタル・エネルギーリザーバを配置しています。',
      'シャッターユニット側のフォトインタラプタ（幕走行終了センサー）のパルスをBIONZ XRへフィードバックし、何万回切っても1/8000秒の露光時間精度を自動キャリブレーションします。',
    ],
    formula: {
      expression: 'P_cond = I_drive² · R_DS(on) = (1.5 A)² × 0.28 Ω ≈ 0.63 W（極小 2×2 mm で高速幕を瞬時駆動）',
      description: 'わずか2mm四方の超小型チップに4個の低抵抗パワースイッチを集約し、連写時のシャッター幕タイミングを精密制御',
    },
    nextGenInnovation:
      '電子先幕シャッター・完全サイレント電子シャッターとのシームレスな切替に加え、α7 IVでは電源OFF時の「ダスト対策シャッター閉鎖」制御も本ドライバが担っています。',
    specs: [
      { label: 'Hブリッジドライバ', value: 'Texas Instruments DRV8837 ×2（WSON-8 2.0×2.0 mm、1.8 A）' },
      { label: 'オン抵抗・耐圧', value: 'R_DS(on) = 280 mΩ（HS+LS合計）／ 動作電圧 0–11 V' },
      { label: '保護機能', value: '過電流保護（OCP）・過熱シャットダウン（TSD）・低電圧誤動作防止' },
      { label: '電力リザーバ', value: '100 μF 低ESR POSCAP タンタルコンデンサ ＋ 幕位置帰還FPC' },
    ],
    diagramType: 'xr_shutter_hbridge_driver',
  },

  'xr-rtc-power-seq-backup': {
    title: 'XR66. 常時稼働RTC電源シーケンサIC（Power IC）＆ 32.768 kHz 水晶（Epson FC-135）＋ 二次コイン電池（Seiko MS621FE）',
    subtitle: 'Always-On RTC Power-Sequencer IC, Epson FC-135 32.768 kHz Crystal & Seiko MS621FE 3 V Coin Cell',
    category: 'BIONZ XRパッケージ内部超解剖 XR66 — バッテリーを抜いても日付が消えず、電源ONでBIONZ XRを正しい順番で起こす「不眠不休の目覚まし時計」',
    plainAnalogy:
      'カメラからバッテリーを抜いて交換しても、撮影日時（時計）がリセットされませんよね？それは基板の隅にある銀色の極小充電式コイン電池（セイコーMS621FE）と、腕時計と同じ「1秒に32,768回震えるエプソン水晶（FC-135）」がずっと動き続けているからです！さらに電源スイッチをONにすると、このPower ICが真っ先に目を覚ましてBIONZ XRを起こします。',
    summary:
      'OpenMemoriesでも確認されている常時稼働パワーシーケンサ＆リアルタイムクロック（RTC）用Power IC、セイコーエプソン製32.768 kHz音叉型水晶振動子「FC-135（3.2×1.5 mm）」、およびセイコーインスツル製充電式マンガンリチウム二次電池「MS621FE（3.0 V / 5.5 mAh）」。',
    opticsAndPhysics: [
      '32,768 Hz（= 2¹⁵ Hz）は2進カウンタで15回半分にするだけで正確に「1.000秒」を作れる時計用黄金周波数。Epson FC-135は ±20 ppm の高精度と超低駆動電力で常時発振し続けます。',
      'Seiko MS621FE（直径 6.8 mm × 厚さ 2.1 mm、容量 5.5 mAh）はメイン電池装着中に微弱電流で自動充電され、メイン電池を抜いた状態でも数週間にわたり時計と設定バックアップを維持します。',
      '電源レバーONの瞬間、Power ICがBIONZ XRのコア電源→DDR電源→I/O電源の厳密な立ち上げ順序（パワーシーケンス）をミリ秒単位で制御し、ラッチアップを防ぎながら高速起動を実現します。',
    ],
    formula: {
      expression: 'f_RTC / 2¹⁵ = 32,768 Hz / 32,768 = 1.0000 Hz（誤差 ±20 ppm ≈ 月差 ±50 秒以内）',
      description: 'わずか数マイクロワットの極小電力で正確な1秒を刻み続け、写真EXIFの正確な撮影時刻と確実な起動シーケンスを保証',
    },
    nextGenInnovation:
      'スマホのBluetooth時刻自動補正と常時RTCバックアップが連携し、海外ロケでタイムゾーンを跨いでも全RAW/動画ファイルへミリ秒精度の撮影時刻を刻印し続けます。',
    specs: [
      { label: 'RTCバックアップ電池', value: 'セイコーインスツル MS621FE（3.0 V / 5.5 mAh 充電式Li-MnO₂）' },
      { label: '時計用水晶振動子', value: 'セイコーエプソン FC-135（32.768 kHz、3.2×1.5 mm、±20 ppm）' },
      { label: '電源起動コントローラ', value: '常時稼働 RTC / パワーシーケンサ Power IC（OpenMemories確認）' },
      { label: '待機消費電流', value: '約 1〜2 μA 級（バッテリー抜去後も数週間時刻を保持）' },
    ],
    diagramType: 'xr_rtc_power_seq_backup',
  },

  'xr-battery-fuel-auth-if': {
    title: 'XR67. 高精度バッテリー残量ゲージ（TI BQ27441-G1）＆ NP-FZ100 InfoLITHIUM 認証I²Cインターフェース',
    subtitle: 'TI BQ27441-G1 Impedance Track™ Fuel Gauge & NP-FZ100 InfoLITHIUM SMBus Auth Interface',
    category: 'BIONZ XRパッケージ内部超解剖 XR67 — 電池の残り寿命を「1%刻み」で正確に当て、安全な純正バッテリーを見分ける残量鑑定士',
    plainAnalogy:
      '昔のカメラは電池マークが「3本→2本→いきなり電源OFF」になりがちでしたが、ソニーαは「残り37%」と1%単位で正確に分かり安心ですよね。それはこのTI製燃料計チップ（BQ27441-G1）が、10mΩの精密抵抗で電池から出た電気の粒を1粒残らず数え、さらに電池の温度や経年劣化まで計算して残量を予測しているからです！',
    summary:
      'NP-FZ100（InfoLITHIUM Zシリーズ）バッテリーパックと4極金メッキ端子で接続し、Impedance Track™残量予測を行うTI BQ27441-G1（12ピンSON、2.5×4.0 mm）および10 mΩケルビン電流検出シャント＋認証I²C通信インターフェース。',
    opticsAndPhysics: [
      'バッテリーの「B+（電源+）」「T/TH（内蔵サーミスタ温度）」「C（認証・通信）」「B-（電源-）」の4極接点を受け、10 mΩ（0.01 Ω）の精密シャント抵抗の両端電圧から充放電電流をリアルタイム積算（クーロンカウント）します。',
      'TI独自のImpedance Track™アルゴリズムは、電池の内部抵抗（インピーダンス）の増加と温度変化を常時学習し、氷点下の雪山や4K録画の高負荷時でも残量パーセント表示の誤差を 1% 級に抑え込みます。',
      '400 kHz I²C / SMBus 経由でバッテリー内部の認証ICと通信し、安全な充電電流上限やセル異常の保護フラグをBIONZ XRへ報告します。',
    ],
    formula: {
      expression: 'SoC(t) = SoC₀ − (1 / Q_max) ∫ I_bat(t) dt   （温度・内部抵抗 R_int の劣化を自動補正！）',
      description: '単なる電圧測定ではなく「流れた電気量の精密積算＋内部抵抗の学習」により、寒冷地や連写中でも1%単位の正確な残量を表示',
    },
    nextGenInnovation:
      'バッテリー劣化度（満充電容量の健全性）や動画残り撮影可能分数（分単位）の正確予測により、ワンオペ動画現場での「突然の電源落ちによるファイル破損」を徹底防止します。',
    specs: [
      { label: '残量ゲージIC', value: 'Texas Instruments BQ27441-G1（12-SON 2.5×4.0 mm / Impedance Track）' },
      { label: '電流検出シャント', value: '10 mΩ 精密4端子ケルビン電流検出抵抗' },
      { label: '端子構成', value: 'NP-FZ100 4極金メッキ端子（B+ / TH温度 / C認証通信 / B-）' },
      { label: 'ホストバス', value: '400 kHz I²C / SMBus テレメトリ ＆ ハードウェア認証' },
    ],
    diagramType: 'xr_battery_fuel_auth_if',
  },

  'xr-thermal-ntc-telemetry-hub': {
    title: 'XR68. 多点高精度 I²C 温度テレメトリハブ（TI TMP117 ±0.1°C）＆ リモートNTCサーミスタ網',
    subtitle: 'Multi-Zone TI TMP117 (±0.1 °C) I²C Digital Thermal Hub & Remote NTC Thermistor Array',
    category: 'BIONZ XRパッケージ内部超解剖 XR68 — 基板・グリップ・カードスロットの4箇所を「±0.1℃」の体温計で同時監視する熱の見張り番',
    plainAnalogy:
      'BIONZ XRの内部温度（XR44）だけでなく、「カメラを持つ手が熱くないか（グリップ）」「SD/CFexpressカードが熱くなりすぎていないか（カード室）」「手ブレ補正ユニットは大丈夫か」までカメラ全体を見守る必要があります。医療用体温計並みの±0.1℃精度を持つTI TMP117と4系統のNTC温度センサーが、低温やけどや録画停止を未然に制御しています。',
    summary:
      '医療計測グレードの精度（±0.1 °C）を誇るデジタル温度センサー「TI TMP117（WSON-6）」および、メイン基板・グリップ・カードベイ・IBIS周辺へ配線された4系統10 kΩ NTCサーミスタ温度監視ハブ。',
    opticsAndPhysics: [
      'TI TMP117は工場出荷時キャリブレーション済みの16-bit温度デジタル変換器（分解能 0.0078 °C）を内蔵し、I²C / SMBus 上で最大4箇所のアドレスを連結監視できます。',
      '4本の銅サーマルフィンガーに直結した10 kΩ NTC（負温度係数）サーミスタが、CFexpressカードの書き込み発熱・グリップ表面温度・IBISコイル温度を同時に電圧分圧で読み取ります。',
      'BIONZ XRのサーマルマネージャーはこれらの多点温度を統合判断し、「自動電源OFF温度：高」モードでも外装の低温やけど安全基準（IEC 62368-1）を守りつつ録画時間を最大化します。',
    ],
    formula: {
      expression: 'R_NTC(T) = R₀ · exp[ B · (1/T − 1/T₀) ]   ＋   TMP117 絶対精度 ±0.1 °C（分解能 0.0078 °C）',
      description: 'カメラ内部の複数エリアの熱マップをリアルタイムに把握し、突然のシャットダウン前に段階的警告と安全なファイル保存を実行',
    },
    nextGenInnovation:
      'シリコンダイ直下のXR44ダイオードと基板多点のXR68ハブを組み合わせた「3D熱モデル予測制御」により、夏の炎天下でも安心して4K動画を回し続けられる信頼性を獲得しています。',
    specs: [
      { label: '高精度デジタル温度IC', value: 'Texas Instruments TMP117（±0.1 °C 精度、16-bit、I²C/SMBus）' },
      { label: 'リモート温度点', value: '10 kΩ 精密NTCサーミスタ ×4（MB / GRIP / CARD / IBIS）' },
      { label: '温度分解能', value: '0.0078125 °C / LSB（超微細な温度上昇トレンドを検知）' },
      { label: '安全連携', value: 'IEC 62368-1 筐体表面温度管理 ＋ 録画ファイル安全クローズ' },
    ],
    diagramType: 'xr_thermal_ntc_telemetry_hub',
  },

  'xr-watchdog-pg-supervisor': {
    title: 'XR69. 精密電圧監視・ブラウンアウト・ウォッチドッグIC（TI TPS3808）＆ パワーグッド確認ラダー',
    subtitle: 'TI TPS3808 Precision Voltage Supervisor, Watchdog Reset IC & 4-Rail Power-Good Ladder',
    category: 'BIONZ XRパッケージ内部超解剖 XR69 — 電池切れ寸前のフリーズや記録データ破損を絶対に防ぐ「最終安全リセット番犬」',
    plainAnalogy:
      'SDカードへ大切な写真を書き込んでいる最中に電池電圧がガクッと落ちると、データ全体が壊れて読めなくなる恐れがあります。この「番犬（ウォッチドッグ＆電圧監視IC）」は、4本の重要電源の電圧をミリボルト単位で見張り続け、もし電圧が不安定になったり頭脳がフリーズしたら即座に安全なリセットを掛けてカメラを保護します。',
    summary:
      'BIONZ XRのコア・LPDDR5X・I/O・ストレージ各電源レールの電圧健全性（Power-Good）を0.5%精度で常時監視するTI TPS3808（SOT-23）電圧スーパーバイザ、パワーグッド順序ラダー、およびハードウェア・ウォッチドッグタイマー。',
    opticsAndPhysics: [
      'コア電圧（0.75 V）・メモリ電圧（1.05 V）・I/O電圧（1.8 V / 3.3 V）の4本すべてのPower-Good信号が規定範囲内に揃った後、設定遅延時間（コンデンサ設定 1.25 ms〜10 s）を経てから初めてBIONZ XRのnRST（リセット解除）を立ち上げます。',
      '寒冷地での急激な電圧降下（ブラウンアウト）を検知した瞬間、フラッシュメモリやCFexpressへの誤書き込みが起きる前にマイクロ秒オーダーで書き込み禁止と安全リセットを発動します。',
      'BIONZ XRからの定期的な「生存パルス（ハートビート）」が万が一途絶えた場合、ハードウェア・ウォッチドッグが自動再起動を行い、現場でのフリーズから即座に復帰させます。',
    ],
    formula: {
      expression: 'V_IT 精度 ±0.5%  ／  nRST 遅延 t_d = C_T · 1.75 × 10⁶ s/F（全電源安定確認後に確実リセット解除）',
      description: '全電源レールが100%安定した瞬間を見極めてから頭脳を起動し、電圧低下によるデータ化けやフリーズを根本防止',
    },
    nextGenInnovation:
      '電源異常・宇宙線ソフトエラー・低温バッテリー低下などあらゆる過酷環境でも「撮った写真を絶対に壊さない」プロカメラのフェイルセーフ設計の最後の砦です。',
    specs: [
      { label: '電圧監視IC', value: 'Texas Instruments TPS3808（±0.5% 精度、プログラム可能遅延）' },
      { label: '監視対象レール', value: '4系統パワーグッド・ラダー（PG_CORE / PG_DDR / PG_IO / nRST）' },
      { label: '消費電流', value: 'わずか 2.4 μA typ.（常時監視によるバッテリー影響ゼロ）' },
      { label: '保護機能', value: 'ブラウンアウト誤書込防止 ＋ ハードウェア・ウォッチドッグ復帰' },
    ],
    diagramType: 'xr_watchdog_pg_supervisor',
  },

  'xr-active-vapor-ground-if': {
    title: 'XR70. Cinema Line拡張 焼結銅ベイパーチャンバー着座パッド ＆ ベリリウム銅EMI接地スプリングガスケット',
    subtitle: 'Sintered-Copper Micro Vapor-Chamber Thermal Dock & Beryllium-Copper EMI Spring Gasket',
    category: 'BIONZ XRパッケージ内部超解剖 XR70 — FX3の冷却ファンや次世代ベイパーチャンバーへ直結できる「銅の放熱ドック＆金ばねアース」',
    plainAnalogy:
      '同じBIONZ XR頭脳を積むシネマカメラ（FX3や次世代機）では、さらに長時間の8K/4K収録に耐えるため「ベイパーチャンバー（魔法の蒸気放熱板）」や小型冷却ファンへ熱を直接渡す仕組みが使われます。この銅の着座ドックは熱の高速道路の出口であり、横に並ぶ6本の金色の極小バネ（ベリリウム銅ガスケット）が背面金属カバーとピタッと触れて電波ノイズを確実に地面へ逃がします。',
    summary:
      'SY-1122メイン基板外周に配置された焼結銅マイクロ・ベイパーチャンバー熱結合ドック、相変化グラファイト・マトリックス熱界面パッド（PCM）、および6連ベリリウム銅（BeCu）EMI接地スプリングガスケット。',
    opticsAndPhysics: [
      '相変化熱界面材（PCM：約 45 °C で軟化流動）は通常時はシート状で扱いやすく、4K/8K録画でチップが温まるとミクロの隙間へ溶け込んで界面熱抵抗を劇的に下げます。',
      '焼結銅ドックは面内実効熱伝導率 1,500〜3,000 W/m·K 級の薄型ベイパーチャンバーやFX3系アクティブファンダクトと真鍮ボス（M1.4ねじ）で強固に熱結合できます。',
      '6本のベリリウム銅スプリングフィンガーはバネ弾性と極めて低い接触抵抗（< 10 mΩ）を両立し、背面シールドプレートへマルチポイント接地することで高周波シャーシ共振を抑制します。',
    ],
    formula: {
      expression: 'R_contact(BeCu Spring) < 10 mΩ  ＆  k_eff(Vapor Chamber) ≈ 2,000 W/m·K（純銅の約 5 倍の熱輸送力！）',
      description: '相変化サーマルパッドと蒸気サイクル放熱ドック＋多点ばね接地の合わせ技で、次世代8K長回しと低ノイズを同時達成',
    },
    nextGenInnovation:
      'α7 IV（ファンレスΣグラファイト）とCinema Line FX3 / FX30 / FX5（アクティブ冷却＋ベイパーチャンバー）が共通のBIONZ XRプラットフォーム上で熱設計をスケールできる理由を象徴するインターフェースです。',
    specs: [
      { label: '熱結合ドック', value: '焼結銅（C1100/C1020）マイクロ・ベイパーチャンバー着座プレート' },
      { label: '界面パッド', value: '相変化グラファイト・マトリックス（PCM、軟化点 約 45 °C）' },
      { label: 'EMI接地ばね', value: '6連ベリリウム銅（BeCu）金めっきスプリングガスケット（< 10 mΩ）' },
      { label: '締結構造', value: '真鍮熱クランプボス ＋ M1.4 精密固定ねじ' },
    ],
    diagramType: 'xr_active_vapor_ground_if',
  },
};
