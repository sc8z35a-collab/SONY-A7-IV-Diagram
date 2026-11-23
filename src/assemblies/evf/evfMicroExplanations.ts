import { PartExplanation } from '../types';

/**
 * Phase 16B: 24 Standalone-Only Electronic Viewfinder (EVF) & Viewfinder Surroundings OEM/Optical Micro-Parts (E32–E55).
 * 初心者・素人の方でも「なるほど！」と楽しく理解できる日常のたとえ（やさしい解説）と、
 * Sony ILCE-7M4 公式サービスマニュアル（VF BLOCK SECTION Ref.201–208 / LCD902 ECX337AA-1 / CABINET REAR-2 Ref.113–118 / CABINET TOP-2 Ref.301–331）および
 * 2層タンデムOLEDoS・ZEISS T*接眼光学工学の正確な仕様を両立しています。
 */
export const EVF_MICRO_EXPLANATIONS: Record<string, PartExplanation> = {
  // =========================================================================
  // Group 1: Sony OEM VF BLOCK & Eye-Sensor Surroundings (E32–E39)
  // =========================================================================
  'evf-oem-finder-cover': {
    category: '個別微細層 E32 — アイカップを外すと現れる、雨やホコリを迷路で止める「玄関フレーム」',
    title: 'E32. Sony純正 FINDER COVER (89100)（Ref.113: A5038709A）ファインダー背面枠＆防塵ラビリンス縁',
    subtitle: 'Sony OEM Rear Finder Trim Cover Frame (Ref.113: A5038709A) & Dust-Trap Labyrinth Flange',
    plainAnalogy:
      'ゴム製のアイカップ（E01）を上にスライドして外すと、その下に現れる黒い樹脂フレームがこれです。ただの飾り枠ではなく、フチが「迷路のような細かい段差（ラビリンス構造）」になっていて、雨粒や砂ホコリがファインダーの奥やカメラ内部に侵入するのをしっかりせき止める玄関ガードになっています！',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET REAR SECTION-2 Ref.113（Part No. A5038709A: FINDER COVER 89100）に実在する、接眼窓とアイセンサーを一体額縁保持する背面化粧・防塵防滴フレームです。',
    opticsAndPhysics: [
      '背面外装キャビネットとEVF光学鏡筒（E18）の境界を覆い、段差嵌合のラビリンス（迷路）構造で直接の水滴吹き込みや砂塵の侵入経路を遮断します。',
      '下辺にはアイセンサー窓（E33）専用の段付きポケットを精密成型しており、アイカップ着脱時に顔や眼鏡が当たってもアイセンサーへ直接外力が加わらない保護壁になります。',
      '4隅にはサービス分解時に最初にアクセスするEVF固定ネジ（Ref.207）の逃げ座とアイカップ摺動ガイドの受け面が設けられています。',
    ],
    nextGenInnovation:
      'ガラス繊維強化ポリカーボネート（GF-PC）による高寸法安定性成型で、真夏の炎天下から氷点下の雪山まで反りが生じず、アイカップの着脱感と防水密着を長期間保ちます。',
    formula: {
      expression: 'ΔP_labyrinth = Σ (ξ_bend · ½ρv²)   (多段迷路段差で水滴の侵入圧を減衰)',
      description: 'すき間をまっすぐにせず何度も直角に曲げる（ラビリンス構造）ことで、雨粒やホコリが奥まで入り込む勢いを殺します。',
    },
    specs: [
      { label: 'Sony純正品番', value: 'Ref.113 / Part No. A5038709A (FINDER COVER 89100 SERVICE)' },
      { label: '材質', value: '高剛性ガラス繊維強化ポリカーボネート（耐候・耐皮脂シボ仕上）' },
      { label: '防塵防滴機構', value: '全周ラビリンス段差溝＋アイセンサー専用保護ベゼル一体成型' },
      { label: '分解手順', value: 'アイカップ取外し後、周囲4本ネジへのアクセス基準枠' },
    ],
    diagramType: 'evf_oem_finder_cover',
  },

  'evf-oem-eye-sensor-window': {
    category: '個別微細層 E33 — 人間には真っ黒、赤外線だけスッと通す特殊窓＆誤作動防止の仕切り壁',
    title: 'E33. Sony純正 EYE SENSOR WINDOW (850)（Ref.117: 501034401）赤外線透過窓＆発受光遮光隔壁',
    subtitle: 'Sony OEM 940nm IR-Pass Black Acrylic Eye-Sensor Window (Ref.117) & Optical Isolation Septum',
    plainAnalogy:
      'ファインダーのすぐ下に小さな「真っ黒な窓」がありますよね。実はこれ、人間の目に見える太陽の光や部屋の光はサングラスみたいにカットし、目に見えない「赤外線（940nm）」だけをスッと通す特殊な窓です！さらに中の「仕切り壁（セプタム）」が、赤外線ライトの光が横のセンサーに直接漏れて「誰も覗いていないのに画面が消える」誤作動を完全に防いでいます！',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET REAR SECTION-2 Ref.117（501034401: EYE SENSOR WINDOW 850）に対応する、940nm近赤外線透過・可視光遮断アクリル窓と内部発受光クロストーク遮断隔壁（セプタム）です。',
    opticsAndPhysics: [
      '可視光（400〜750nm）を光学濃度 OD > 3 で遮断しつつ、近赤外線（850〜940nm）を約90%透過する赤外線透過黒色樹脂を採用し、強烈な太陽光下でも外乱光ノイズを抑えて正確に顔の接近を検知します。',
      'もし窓の裏側に遮光隔壁がないと、発光LED（VCSEL）から出た940nm光がアクリル板の中を横に伝って（導波クロストーク）すぐ隣の受光素子（SPAD）へ直接届いてしまい、常に「顔が近づいている」と誤判定してしまいます。',
      '表面はハードコート＋撥油処理され、まつ毛や皮脂・雨滴が付いても赤外線の散乱誤検知を最小限に抑えます。',
    ],
    nextGenInnovation:
      '最新世代では窓の裏面中央に黒色不透明の遮光リブ（セプタム）を2色成型で完全に食い込ませることで、指紋汚れが付着した状態でもクロストーク誤作動を劇的に減らしています。',
    formula: {
      expression: 'T(940nm) ≈ 90%,   T(400–700nm) < 0.1%,   Crosstalk < −40 dB',
      description: '目に見える光は99.9%ブロックし、赤外線だけ90%通しながら、仕切り壁で横漏れを1/10,000以下に防ぎます。',
    },
    specs: [
      { label: 'Sony純正品番', value: 'Ref.117 / Part No. 501034401 (EYE SENSOR WINDOW 850)' },
      { label: '光学特性', value: '可視光遮断（< 760 nm）/ 940 nm 近赤外透過率 ≈ 90%' },
      { label: '誤作動防止', value: '発光・受光間 光学遮光隔壁（Optical Isolation Septum）内蔵' },
      { label: '役割', value: '屋外直射日光下でのファインダー／背面モニター自動切替精度維持' },
    ],
    diagramType: 'evf_oem_eye_sensor_window',
  },

  'evf-oem-eye-sensor-cushions': {
    category: '個別微細層 E34 — 顔や汗に一番近いアイセンサーを前後2重パッキン＆静電気シートで完全防衛',
    title: 'E34. Sony純正 EYE SENSOR WP/RETクッション（Ref.114/118）・ES GNDシート（Ref.115）＆ ES-1008フレキ（Ref.116）',
    subtitle: 'Sony OEM Eye-Sensor Dual WP/Retention Cushions (Ref.114/118), ES Ground Sheet (Ref.115) & ES-1008 Flex',
    plainAnalogy:
      'ファインダーをのぞくたび、アイセンサーの周りにはおでこや鼻の汗・雨粒・冬の静電気がダイレクトに押し寄せます。そこでSony純正の内部は驚くほど丁寧！前側に「防水スポンジ（Ref.118）」、後ろ側に「押さえクッション（Ref.114）」を2重に挟み、さらに静電気を逃がす導電シート（Ref.115）と専用の小型基板（ES-1008）でガッチリ守っています。',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET REAR SECTION-2 Ref.114〜118 に実在する、アイセンサー周辺4点の純正保護・配線サブアセンブリ（RET CUSHION / ES GND SHEET / ES-1008 FLEX / WP CUSHION）です。',
    opticsAndPhysics: [
      '前面の EYE SENSOR WP CUSHION（Ref.118: 501034501）は、センサー窓（E33）とセンサー素子の間を360°密閉し、雨や汗の侵入だけでなく横からの迷光漏れ込みも同時に防ぎます。',
      '背面の EYE SENSOR RET CUSHION（Ref.114: 501142001）は、極薄の ES-1008 フレキシブル基板（Ref.116: A5022315A）を適度な弾力で窓へ密着保持し、落下衝撃でもセンサー位置がズレません。',
      'ES GND SHEET（Ref.115: 502997201）は導電性フィルムで、顔や帽子から飛ぶ静電気（ESD）をフレームグランドへ逃がし、ToF近接センサーICの誤動作や破壊を防ぎます。',
    ],
    nextGenInnovation:
      '小さなアイセンサー1つに4点もの専用クッション・接地・フレキ部品を独立設計することで、雨天のスポーツ取材でも「ファインダーが切り替わらない」トラブルを根絶しています。',
    formula: {
      expression: 'Seal = WP Cushion (前面防水) ＋ RET Cushion (背面弾性保持) ＋ ES GND (静電逃がし)',
      description: '防水・衝撃吸収・静電気対策の3つの役割をそれぞれ専用シートに分担させ、過酷な屋外でも確実に動作させます。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.116: A5022315A (ES-1008 FLEXIBLE BOARD, COMPLETE)' },
      { label: 'Sony純正品番②', value: 'Ref.118: 501034501 (WP CUSHION) / Ref.114: 501142001 (RET CUSHION)' },
      { label: 'Sony純正品番③', value: 'Ref.115: 502997201 (ES GND SHEET 89100)' },
      { label: '保護性能', value: '汗・雨滴浸入防止＋静電気ESDバイパス＋光軸クロストーク密閉' },
    ],
    diagramType: 'evf_oem_eye_sensor_cushions',
  },

  'evf-oem-vf-radiation-sheet': {
    category: '個別微細層 E35 — 高輝度OLEDの熱をおでこ側へ逃がさずボディ骨格へ流すSony純正放熱シート',
    title: 'E35. Sony純正 VF SHEET, RADIATION (795)（Ref.203: 457578001）＆ VFフレキ粘着保護シート（Ref.202）',
    subtitle: 'Sony OEM Viewfinder Thermal Radiation Sheet (Ref.203: 457578001) & Anti-Adhesion Flex Sheet (Ref.202)',
    plainAnalogy:
      '944万ドットの超高画質・超高輝度ファインダーは、切手より小さい面積でピカピカ光るため意外と熱を持ちます。そのままではファインダーの周りがポカポカ熱くなったり、OLEDの寿命が縮んだりしてしまいます。そこでSony純正の青い専用放熱シート（Ref.203）が熱をボディの金属骨格へスーッと逃がし、さらに保護シート（Ref.202）がケーブルの貼り付きを防いで修理もしやすくしています！',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル VF BLOCK SECTION Ref.203（457578001: VF SHEET, RADIATION 795）および Ref.202（457581811: SHEET, VF FLEXIBLE ADHESIVE）に対応する、EVF専用熱拡散・フレキ保護シート対です。',
    opticsAndPhysics: [
      '実物の Sony 4-575-780-01（VF SHEET, RADIATION）は青色ベース＋ピンク縁取りを持つ多層熱伝導シリコーン／放熱シートで、OLED背面ヒートシンク（E17）とカメラ上・背面マグネシウム骨格の間を低熱抵抗で橋渡しします。',
      '有機EL（OLED）は温度が10℃上がると輝度半減寿命が約半分に縮む性質があるため、この放熱シートでOLEDチップ温度を低く保つことが数年間の画質維持と焼き付き防止に直結します。',
      'Kolari VisionのSony A1分解レポートでも触れられている通り、旧機種では放熱パッドが裏フタにくっついて分解困難でしたが、Ref.202シート＆カバー板の併用で熱伝達と整備性を両立しています。',
    ],
    nextGenInnovation:
      '最新世代の3倍高輝度（1,000〜3,000 nit級）Micro-OLED EVFでは、光学鏡筒の歪み（熱によるピントズレ）を防ぐためにも、このVF放熱シートによる均熱・低温化が不可欠です。',
    formula: {
      expression: 'L_50(OLED) ∝ exp(E_a / k_B·T)   (OLED温度 T を10℃下げると寿命が約2倍に延長！)',
      description: '有機ELは涼しいほど長持ちします。純正放熱シートで熱を逃がすことで、焼き付きや色ズレを防ぎ寿命を倍増させます。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.203 / Part No. 457578001 (VF SHEET, RADIATION 795)' },
      { label: 'Sony純正品番②', value: 'Ref.202 / Part No. 457581811 (SHEET, VF FLEXIBLE ADHESIVE)' },
      { label: '熱的効果', value: 'ECX337AA-1 / 9.44M OLEDの発熱を上部Mgフレームへ迅速排出' },
      { label: '整備性配慮', value: '背面カバーへの過剰固着防止＆FPC折損保護' },
    ],
    diagramType: 'evf_oem_vf_radiation_sheet',
  },

  'evf-oem-evf-protector': {
    category: '個別微細層 E36 — 重いストロボの衝撃やノイズからファインダーを守る「天井の内装ヘルメット」',
    title: 'E36. Sony純正 EVF PROTECTOR (89100)（Ref.303: 502790801）軍艦部内・ファインダー上部保護シールド',
    subtitle: 'Sony OEM Top-Deck Internal EVF Protector Arch Shield (Ref.303: 502790801)',
    plainAnalogy:
      'ファインダーのすぐ真上（軍艦部の天井）には、重いストロボや大きなガンマイクを載せるホットシューがあります。もしストロボをぶつけた衝撃がそのまま下に伝わったら、繊細なファインダーのレンズや画面が割れてしまいます！このSony純正「EVFプロテクター」は、ファインダーの頭上に被せる“ヘルメットの内装ガード”で、上からの重み・衝撃・電波ノイズを全部受け止めます。',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET TOP SECTION-2 Ref.303（502790801: EVF PROTECTOR 89100）に対応する、EVF光学鏡筒の上面を覆いトップカバー・MIホットシューから隔離保護するアーチ型プロテクターです。',
    opticsAndPhysics: [
      'トップカバー（軍艦部）裏側とEVFマグネシウム鏡筒（E18）の間に一定のクラッシュクリアランスを保ちながら介在し、MIホットシューに大光量クリップオンストロボを装着した際の曲げ・衝撃荷重がEVF光軸を狂わせるのを防ぎます。',
      'またストロボのキセノン管発光時には数kVのトリガー高周波電磁ノイズ（EMI）がホットシュー付近から発生しますが、EVFプロテクター＋シールド層が240Hz OLED駆動回路（E16）への画面乱れ・ノイズ飛び込みを遮断します。',
      '同時に上部ホットシューや太陽光で温まったトップカバー外装の熱がEVF光学室へ直接伝わるのを防ぐ断熱バッフルも兼ねます。',
    ],
    nextGenInnovation:
      '軍艦部高さを抑えつつ高い耐衝撃性を確保するため、EVF光学筒の屋根形状にぴったり沿う薄肉高剛性アーチ断面が精密設計されています。',
    formula: {
      expression: 'F_shoe_impact → EVF Protector & Top Cage → EVF光軸ズレ Δθ ≈ 0°',
      description: '上のホットシューに衝撃が加わっても、プロテクターが力を受け流してファインダーのレンズや画面を傷つけません。',
    },
    specs: [
      { label: 'Sony純正品番', value: 'Ref.303 / Part No. 502790801 (EVF PROTECTOR 89100)' },
      { label: '配置位置', value: 'EVF光学鏡筒（E18）天井とMIホットシュー固定板（E40）の間' },
      { label: '保護機能', value: 'ホットシュー荷重・衝撃隔離／ストロボEMI遮断／上部断熱' },
      { label: '固定', value: 'トップキャビネット内側 M1.7ビス（Ref.302/305）共締め構造' },
    ],
    diagramType: 'evf_oem_evf_protector',
  },

  'evf-oem-diopter-wp-sheet': {
    category: '個別微細層 E37 — 外に飛び出す「視度ダイヤル」のスキマから雨水を入れない専用防水シート',
    title: 'E37. Sony純正 DIOPTER COVER WP SHEET B（Ref.301: 500374001）＆ ダイヤル化粧蓋（Ref.2: 500367201）',
    subtitle: 'Sony OEM Diopter Cover Waterproof Sealing Sheet B (Ref.301) & Exterior Dial Cap (Ref.2)',
    plainAnalogy:
      'メガネなしでもファインダーがくっきり見えるよう回す「視度調整ダイヤル」は、カメラの外に飛び出してクルクル回るため、一番雨やホコリが入りやすい弱点です！そこでダイヤルの根元にSony純正の薄い防水シート（Ref.301）と化粧カバー（Ref.2）を二重に組み合わせ、スムーズな回し心地を保ったまま雨水の侵入ルートをピタッと塞いでいます。',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET TOP SECTION-2 Ref.301（500374001: DIOPTER COVER WP SHEET B）および OVERALL Ref.2（500367201: CV DIOPTER ADJUST DIAL）に対応する、視度調整ダイヤル開口部の防塵防滴封止セットです。',
    opticsAndPhysics: [
      '視度ダイヤルは「引き出して回す・押し込んでロックする（プッシュロック式）」という2軸（回転＋直動）の動きをするため、単純な固定パッキンでは摩擦が重すぎたり隙間が空いたりします。',
      '低摩擦エラストマー＋摺動フィルム複合構造の DIOPTER COVER WP SHEET B（Ref.301）が、ボディ側面の丸穴を内側から全面シールしつつ軸の回転と押し引きに柔軟追従します。',
      '外側の CV DIOPTER ADJUST DIAL（Ref.2）はダイヤル軸固定ビス（分解時に必ず外す1本ネジ）を覆い隠し、外観の美しさと防滴性を仕上げます。',
    ],
    nextGenInnovation:
      'Kolari Visionの各Sony機種分解でも「EVF周り4本＋視度ダイヤル1本」が定番のアクセス点として知られ、このWPシートが毎回防滴の最後の砦として機能しています。',
    formula: {
      expression: 'F_friction = μ_low · N_seal   (防水密着 N_seal を保ちつつ軽い回転トルクを実現)',
      description: '摩擦の少ない専用防水シートを使うことで、「水は通さないのに指先で軽くクルッと回せる」絶妙なバランスを作っています。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.301 / Part No. 500374001 (DIOPTER COVER WP SHEET B 881)' },
      { label: 'Sony純正品番②', value: 'Ref.2 / Part No. 500367201 (CV DIOPTER ADJUST DIAL 88100)' },
      { label: '対応動作', value: '視度調整（−4.0 〜 +3.0 m⁻¹）の回転＋プッシュロック軸方向摺動' },
      { label: '防塵防滴', value: '軍艦部右側開口からの雨水・砂塵・結露水滴の侵入遮断' },
    ],
    diagramType: 'evf_oem_diopter_wp_sheet',
  },

  'evf-oem-jk1028-flex-holder': {
    category: '個別微細層 E38 — ファインダー脇の超狭いスキマでケーブルを優しく守る専用ガイド＆中継基板',
    title: 'E38. Sony純正 JK-1028 フレキ中継基板（Ref.206: A5022316A）＆ JK HOLDER（Ref.205: 502789601）',
    subtitle: 'Sony OEM VF-Flank JK-1028 Flexible Relay Board (Ref.206) & Molded JK Holder (Ref.205)',
    plainAnalogy:
      'ファインダーのすぐ横は、レンズの金属枠・音声端子・メイン基板がぎゅうぎゅうにひしめく超狭い迷路です！そこに通る極薄の電子リボンケーブルが金属の角に擦れて断線しないよう、Sony純正では専用の樹脂ホルダー（JK HOLDER）で道筋をピシッと固定しながら、JK-1028中継フレキを安全に通しています。',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル VF BLOCK SECTION Ref.205（502789601: JK HOLDER 89100）および Ref.206（A5022316A: JK-1028 FLEXIBLE BOARD, COMPLETE）に実在する、VFブロック側面のケーブル保持ホルダー＆フレキ中継ユニットです。',
    opticsAndPhysics: [
      'VFブロック（Ref.201）とボディ左肩ジャック群の狭い隙間に配置され、成形樹脂ホルダー（JK HOLDER）のR面ガイドがFPCの最小曲げ半径（R ≥ 0.8 mm）を機械的に保証して銅箔パターンの疲労断線を防ぎます。',
      '分解・組み立て時にもJK-1028フレキが不用意にネジ穴へ噛み込まない（ピンチ防止）ための位置決めツメを備えています。',
      '表面の保護カバーレイと接地タブにより、すぐ横を通るEVF高速映像信号と音声・制御ライン間のクロストーク干渉を抑制します。',
    ],
    nextGenInnovation:
      '狭小空間の立体配線を「フレキ＋専用ガイドホルダー」でユニット化することで、量産工場での組立バラツキをゼロにし、長年の振動でもケーブル擦れ故障を起こさない高信頼性を実現しています。',
    formula: {
      expression: 'ε_copper = t_Cu / (2 · R_bend) < ε_yield   (ガイドR面で銅配線の折り目破断を防止)',
      description: 'ケーブルが急角度に折れ曲がらないよう丸みのあるホルダーで支えることで、中の極細銅線が切れるのを防ぎます。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.206 / Part No. A5022316A (JK-1028 FLEXIBLE BOARD, COMPLETE)' },
      { label: 'Sony純正品番②', value: 'Ref.205 / Part No. 502789601 (JK HOLDER 89100)' },
      { label: '配置箇所', value: 'VFブロック左側面（-X側）狭小配線コリドー' },
      { label: '役割', value: 'FPC曲げ半径管理・ネジ噛み込み防止・信号中継保護' },
    ],
    diagramType: 'evf_oem_jk1028_flex_holder',
  },

  'evf-oem-vf-mounting-screws': {
    category: '個別微細層 E39 — 場所ごとに0.5mm単位で長さを変えたSony純正VF固定ネジ＆緩み止め座金',
    title: 'E39. Sony純正 VFブロック固定精密ネジ群（Ref.204/207/208: M1.7 L=2.5/3.0/4.0mm）＆ 3点球面バネ座金',
    subtitle: 'Sony OEM VF-Block Precision M1.7 Screw Kit (Ref.204/207/208) & Optical-Axis Wave Washers',
    plainAnalogy:
      'ファインダーをカメラに留めている小さなネジたち、実は全部同じではありません！Sonyの公式整備書を見ると、場所ごとに「長さ2.5mm・3.0mm・4.0mm」と0.5mm刻みで厳密に使い分けられています。もし長いネジを間違った穴に入れると中のレンズや基板を突き破ってしまうため、それぞれの深さにピッタリ合わせた専用ネジと緩み防止の波型ワッシャーで0.01度の狂いなく固定しているのです！',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル VF BLOCK SECTION Ref.204（259947521: M1.7 L=3.0mm）、Ref.207（444694901: M1.7 L=4.0mm）、Ref.208（218734521: M1.7 P2 L=2.5mm）に対応する、VFモジュール固定用精密小ねじ＆光軸支持座金セットです。',
    opticsAndPhysics: [
      '接眼側4点（Ref.207: L=4.0mm）がアイカップ背面からEVFフランジを強固に引き寄せ、底面・側面側（Ref.204: L=3.0mm、Ref.208: P2 L=2.5mm）がメインシャーシへ光学ユニットを3点基準支持します。',
      '座面下のステンレス製ウェーブワッシャー（波座金）が微小な温度膨張差を吸収しつつ、シャッター振動や携行振動でのネジ緩みを防止します。',
      'P2タイプ（Ref.208）は先端テーパー＆微細ピッチにより、マグネシウム／樹脂ボスへの食いつき精度と繰返し整備時のねじ山耐久性を両立しています。',
    ],
    nextGenInnovation:
      'ネジ径をM1.7に統一しつつ長さ・頭部形状・緩み止め剤（マイクロカプセル系）を箇所別に最適化することで、軽量化と光学モジュール交換時のゼロ再調整性を両立しています。',
    formula: {
      expression: 'T_tighten ≈ 0.12 N·m,   L ∈ {2.5, 3.0, 4.0} mm（箇所別適正ねじ込み深さ）',
      description: '締める強さとネジ長さをミリ単位で厳密に管理し、奥の光学部品を傷つけずにファインダーの傾きをピシッと固定します。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.207: 444694901 (M1.7 L=4.0mm 背面4点) / Ref.204: 259947521 (L=3.0mm)' },
      { label: 'Sony純正品番②', value: 'Ref.208: 218734521 (SCREW M1.7 P2 L=2.5mm)' },
      { label: '座金機構', value: 'SUS301 精密ウェーブワッシャー（熱膨張吸収＆緩み防止）' },
      { label: '精度管理', value: 'EVF光軸傾き誤差 < ±0.05° の無調整再現固定' },
    ],
    diagramType: 'evf_oem_vf_mounting_screws',
  },

  // =========================================================================
  // Group 2: Viewfinder Hump Surroundings — MI Hot Shoe & Stereo Mic (E40–E45)
  // =========================================================================
  'evf-surr-mi-shoe-shell': {
    category: '個別微細層 E40 — 重いストロボを載せてももげない！屋根を裏からサンドイッチする金属シュー骨格',
    title: 'E40. ファインダー頭頂・MIシュー外枠 SHELL PLATE（Ref.327）・裏側固定板 FIX PLATE（Ref.311）＆ ネジ隠し板（Ref.329）',
    subtitle: 'EVF-Crown MI Hot-Shoe Shell Plate (Ref.327), Under-Deck Anchor Plate (Ref.311) & Screw Cover (Ref.329)',
    plainAnalogy:
      'ファインダーのてっぺん（軍艦部）にあるストロボやマイクを差し込むレール、外からは薄い金属の枠に見えますよね。でも実は屋根の裏側に「分厚いステンレスの裏当てプレート（FIX PLATE）」が隠れていて、外枠と裏板でカメラの屋根をサンドイッチのように4本の特殊ネジで強力に挟み込んでいます！だから重いストロボを振り回してもびくともしないのです。',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET TOP SECTION-2 Ref.327（500294302: MI SHOE SHELL PLATE）、Ref.311（500395901: MI SHOE FIX PLATE）、Ref.329（500294602: MI SHOE SCREW COVER）および特殊頭M1.7ネジ（Ref.328）からなるホットシュー構造体です。',
    opticsAndPhysics: [
      'ISO 518準拠のステンレス製シューレール（SHELL PLATE）を、トップカバーを挟んで内側の高剛性 FIX PLATE（Ref.311）へ4本の専用低頭M1.7ネジ（Ref.328: L=3.3mm）で締め上げることで、ストロボ装着時の大きな片持ち曲げモーメントを広範囲へ分散します。',
      '4本の固定ネジの頭は、普段は中央にはめ込まれた MI SHOE SCREW COVER（Ref.329）でフラットに隠されており、アクセサリ脱着時の引っかかりと雨水のネジ穴侵入を防ぎます。',
      'レール本体がそのままストロボのグランド基準電極を兼ねるため、塗装ではなく耐摩耗・低接触抵抗の硬質ニッケル／黒クロム表面処理が施されます。',
    ],
    nextGenInnovation:
      '最新αシリーズでは、外部XLRマイクアダプター（XLR-K3M等）や大光量フラッシュの長期装着によるシューのガタつきを防ぐため、4本ネジ座の肉厚とFIX PLATEの剛性が大幅に強化されています。',
    formula: {
      expression: 'M_max = F_flash · L_arm  →  Shell + Roof + Fix Plate の3層サンドイッチで支持',
      description: '上からの枠と裏側からの補強板で屋根を挟み込むことで、重いストロボのテコの力（曲げモーメント）を分散します。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.327: 500294302 (MI SHOE SHELL PLATE) / Ref.311: 500395901 (FIX PLATE)' },
      { label: 'Sony純正品番②', value: 'Ref.329: 500294602 (SCREW COVER) / Ref.328: 500294701 (特殊M1.7 L=3.3)' },
      { label: '耐荷重設計', value: '大光量フラッシュ・XLRハンドル装着時の高曲げ剛性サンドイッチ締結' },
      { label: '規格互換', value: 'ISO 518 機械形状＋Sony Multi Interface（MI）拡張規格' },
    ],
    diagramType: 'evf_surr_mi_shoe_shell',
  },

  'evf-surr-mi-shoe-contacts': {
    category: '個別微細層 E41 — ケーブル0本でプロ用デジタル音声を送れる「21本の極細金メッキ端子」＆防水ブーツ',
    title: 'E41. Sony純正 21ピン デジタルオーディオ対応 MIS-2006 接点基板（Ref.325）＆ 防滴ラバー（Ref.324）',
    subtitle: 'Sony OEM 21-Pin Digital Audio MI-Shoe Contact Block MIS-2006 (Ref.325) & WP Rubber (Ref.324)',
    plainAnalogy:
      'Sonyのホットシューの一番奥をのぞき込むと、ピアノの鍵盤みたいに極細の金色の接点がなんと「21本」も並んでいます！これがスゴイ秘密で、対応マイクをガチャンと差すだけで、ケーブルを1本もつながずに「劣化ゼロのデジタル音声（最大4チャンネル24-bit）」や電源・ストロボ信号をカメラへ直接送れるのです。裏側には雨漏れを防ぐ専用ゴムブーツ（Ref.324）が被さっています！',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET TOP SECTION-2 Ref.325（A5001908A: MIS-2006 FLEXIBLE BOARD, COMPLETE）および Ref.324（501695501: MI SHOE FPC WP RUBBER）に対応する、21ピン前面デジタル接点ブロック＆防水ブーツです。',
    opticsAndPhysics: [
      '21本の狭ピッチ金メッキ接点（0.5mmピッチ級）には、①デジタルオーディオI2S/シリアルデータ（24-bit / 48 kHz、最大4ch）、②アクセサリ駆動電源、③高速TTLフラッシュ通信、④認識・グランド線が割り当てられています。',
      'マイク内部でアナログ音声を即座にデジタル変換（A/D）してから21ピン経由でカメラへ送るため、カメラ内部の強力な電源・映像ノイズがマイク線に乗るアナログノイズ問題を根本から解消します。',
      '接点ブロックのすぐ裏の屋根貫通部には、弾力のある一体成型 EPDMゴムブーツ（MI SHOE FPC WP RUBBER）が密着し、シューの奥から水が基板へ滴り落ちるのを遮断します。',
    ],
    nextGenInnovation:
      'α7S III / α7 IV / α7R V / α7 V 世代の代名詞であるデジタルMIシューにより、ワンマン動画クリエイターでも3.5mmケーブルの抜けやノイズに悩まされないプロ品質収音が実現しました。',
    formula: {
      expression: 'Audio = 24-bit / 48 kHz × 4ch デジタル直結（アナログ伝送ノイズ 0 dB）',
      description: '音声をデジタルの「0と1」のまま21ピン端子で直接受け取るため、雑音が混ざるスキがありません。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.325 / Part No. A5001908A (MIS-2006 FLEXIBLE BOARD, COMPLETE)' },
      { label: 'Sony純正品番②', value: 'Ref.324 / Part No. 501695501 (MI SHOE FPC WP RUBBER 850)' },
      { label: '接点構成', value: '前面21ピン硬質金メッキ多極デジタル接点＋中央フラッシュ接点' },
      { label: 'デジタル機能', value: '4ch 24-bit/48kHz デジタルオーディオ入力・給電・高速TTL通信' },
    ],
    diagramType: 'evf_surr_mi_shoe_contacts',
  },

  'evf-surr-mi-shoe-springs': {
    category: '個別微細層 E42 — ストロボのガタつきを消す「見えない板バネ」＆21ピン端子を守る純正キャップ',
    title: 'E42. Sony純正 MI SHOE SPRING PLATE（Ref.331: 500294502）押圧板バネ＆防塵シューキャップ（Ref.9）',
    subtitle: 'Sony OEM MI-Shoe Stainless Tension Spring Plate (Ref.331) & Protective Dust Cap (Ref.9)',
    plainAnalogy:
      'ストロボやマイクをシューに差し込んだとき、少しでもグラグラすると21本の極細端子（E41）が接触不良になって音が途切れてしまいます。そこでシューの床の下に「見えないステンレスの板バネ（Ref.331）」を仕込み、差し込んだ足を下からグイッと押し上げてガタつきゼロにしています！使わないときは純正の保護キャップ（Ref.9）が繊細な端子をホコリや雨から守ります。',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET TOP SECTION-2 Ref.331（500294502: MI SHOE SPRING PLATE）と OVERALL Ref.9（443873412: SHOE CAP 875）およびM1.4留めネジ（Ref.330）からなるシュー予圧・保護部品です。',
    opticsAndPhysics: [
      'ばね用ステンレス鋼（SUS301-CSP）を精密打ち抜き・曲げ加工した左右一対のカンチレバー板バネが、挿入されたアクセサリ脚を上側のシューレール下面へ常時押し付け（予圧付与）、振動によるカタつきと接点瞬断を防ぎます。',
      '同時に板バネ自体がアクセサリ金属脚との電気的グランド接触点を増やす役割も果たします。',
      '非装着時は SHOE CAP（Ref.9）を奥まで差し込むことで、前面21ピン接点の酸化・ゴミ詰まり・雨滴によるピン間ショート（エラーメッセージ「このアクセサリは使用できません」の原因）を防ぎます。',
    ],
    nextGenInnovation:
      '接点保護キャップの先端には21ピンを傷つけない逃げ形状と適度な抜去抵抗リブが設けられ、カバンの中で自然に外れにくい実用設計になっています。',
    formula: {
      expression: 'F_preload = k_leaf · δ_deflect ≈ 6〜10 N（振動でも接点浮き・ガタゼロ）',
      description: '板バネが下からしっかり押し上げる力（F_preload）で、歩いたり走ったりしてもマイクやストロボがグラつきません。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.331 / Part No. 500294502 (MI SHOE SPRING PLATE 88100)' },
      { label: 'Sony純正品番②', value: 'Ref.9 / Part No. 443873412 (SHOE CAP 875) / Ref.330 (M1.4 L=1.4)' },
      { label: 'バネ材質', value: 'SUS301-CSP ばね用ステンレス鋼（繰返し着脱 10,000回以上耐久）' },
      { label: '効果', value: 'アクセサリのガタ解消・21ピン接触安定化・未使用時の防塵防滴保護' },
    ],
    diagramType: 'evf_surr_mi_shoe_springs',
  },

  'evf-surr-stereo-mics': {
    category: '個別微細層 E43 — ファインダー左右の肩に隠れ、ゴムのハンモックで雑音を断つ内蔵ステレオマイク',
    title: 'E43. ファインダー両脇・内蔵ステレオMEMSマイク＆防振ゴムブーツ（Ref.304）＆保持枠 MIC HOLDER（Ref.308）',
    subtitle: 'EVF-Flank Stereo MEMS Microphone Capsules, Rubber Isolation Boots (Ref.304) & Mic Holder (Ref.308)',
    plainAnalogy:
      'ファインダーの出っ張り（軍艦部）の左右の肩をよく見ると、小さな丸い穴が3つずつ並んでいます。その真下に隠れているのが内蔵ステレオマイク！もしカメラの金属ボディに直接くっつけると、レンズのピント音やボタンを触る「コツコツ」という振動までそのまま録音されてしまいます。そこで柔らかい「ゴムのハンモック（Ref.304）」でフワッと浮かせて、空気の音だけをキレイに拾います！',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET TOP SECTION-2 Ref.304（502687801: RUBBER MICROPHONE）および Ref.308（502790401: MIC HOLDER 89100）に対応する、EVF左右肩部のステレオMEMSマイク防振音響モジュールです。',
    opticsAndPhysics: [
      '左右2基（一部最新機ではノイズキャンセル用リファレンスマイク含む3基）の超高SNRデジタル／アナログMEMSマイクをEVF鏡筒の左右肩へ対称配置し、自然なステレオ音場とクリアな前方指向性を確保します。',
      'ボディ骨格を伝わる固体伝播音（レンズAFモーター駆動音・5軸IBIS微振動・ダイヤル操作音）を遮断するため、マイクカプセル全体を低硬度シリコーンゴムブーツ（Ref.304）でフローティング支持しています。',
      'MIC HOLDER（Ref.308）がゴムブーツの圧縮量を一定に保ちながら音道（音響ダクト）を気密密着させ、カメラ内部の空洞共鳴（こもり音）を防ぎます。',
    ],
    nextGenInnovation:
      'α7 V 世代などでは、この内蔵ステレオマイクに加えてボディ内部ノイズを逆位相キャンセルするリファレンスマイクと高度風切り音低減DSPを組み合わせ、内蔵マイクとは思えないクリアな収音を実現しています。',
    formula: {
      expression: 'SNR > 65 dB(A),   固体振動伝達率 T_vib < −20 dB（防振ゴムブーツ効果）',
      description: '柔らかいゴムブーツでマイクを浮かせることで、ボディを伝わる操作音やモーター音の雑音を1/10以下にカットします。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.304 / Part No. 502687801 (RUBBER 885, MICROPHONE)' },
      { label: 'Sony純正品番②', value: 'Ref.308 / Part No. 502790401 (MIC HOLDER 89100)' },
      { label: 'マイク素子', value: '左右対称ステレオ高SNR MEMSコンデンサマイクカプセル' },
      { label: '制振効果', value: 'AF駆動音・IBIS微振動・ボタン操作音の固体伝播ノイズ遮断' },
    ],
    diagramType: 'evf_surr_stereo_mics',
  },

  'evf-surr-mic-wind-mesh': {
    category: '個別微細層 E44 — マイクの小さな穴の裏に貼られた「音だけ通して水と風を止める不思議な網」',
    title: 'E44. マイク集音口・疎水アコースティック防風ステンレスメッシュ＆ePTFE防滴通気メンブレン',
    subtitle: 'Microphone Port Hydrophobic Acoustic Stainless Micro-Mesh & ePTFE Waterproof Membrane',
    plainAnalogy:
      'カメラのファインダー脇には音を取り込む小さな穴が開いていますが、雨が降ったらそこから水が入らないのでしょうか？実は穴のすぐ裏側に「音（空気の揺れ）はスッと通すのに、水滴はコロッと弾き、風のボボボッという勢いも和らげる」超細かい撥水シート（ePTFEメンブレン）とステンレス網が貼られているのです！',
    summary:
      'EVF左右肩部のステレオマイク音孔直下に貼合される、撥水撥油加工済み微細ステンレス防風メッシュと多孔質ePTFE（延伸ポリテトラフルオロエチレン）防水・音響透過メンブレンの2層音響保護フィルターです。',
    opticsAndPhysics: [
      'ePTFEメンブレンは直径0.2〜1.0μmの超微細孔を持つため、液体の水滴（表面張力で球状になる）や微細な砂埃は完全にシャットアウトしつつ、20 Hz〜20 kHzの音波（空気圧振動）は音響損失 < 1.5 dB で忠実に通過させます。',
      '外側の微細ステンレス織網が風の強い屋外での乱流渦（ボボボッという低周波風切り音の原因）を細かく砕いて整流する一次ウインドスクリーンとして働きます。',
      '万が一水滴が穴の表面に載った場合でも、強い撥水処理で素早く水切れし、音がこもる時間を最小限にします。',
    ],
    nextGenInnovation:
      '防水（IPX相当の防滴耐性）とフラットな高音域周波数特性を両立する極薄高張力ePTFE音響膜により、雨天のドキュメンタリー撮影でも安心して内蔵マイクが使えます。',
    formula: {
      expression: 'd_pore ≈ 0.5 μm ≪ d_droplet,   音響挿入損失 < 1.5 dB (20 Hz–20 kHz)',
      description: '水滴よりずっと小さなミクロの穴（0.5μm）の膜が水を完全に止めつつ、音の波だけをロスなくマイクへ届けます。',
    },
    specs: [
      { label: '構成層', value: '撥水SUS微細防風メッシュ＋多孔質ePTFE防水音響透過メンブレン' },
      { label: '音響特性', value: '挿入損失 < 1.5 dB（20 Hz 〜 20 kHz フラット透過）' },
      { label: '耐水圧', value: '耐水圧 > 30 kPa（雨粒・水しぶきのマイク室浸入を防止）' },
      { label: '配置位置', value: 'EVF左右肩 集音ピンホール直下（E43マイクブーツ前面）' },
    ],
    diagramType: 'evf_surr_mic_wind_mesh',
  },

  'evf-surr-hump-wp-gasket': {
    category: '個別微細層 E45 — ファインダーの出っ張りと本体の境目をぐるっと塞ぐ「防水・遮光パッキン」',
    title: 'E45. ファインダー軍艦部合わせ目・全周防塵防滴スポンジガスケット＆遮光発泡シール枠',
    subtitle: 'EVF-Hump Perimeter Die-Cut Weather-Seal EPDM Sponge Gasket & Light-Leak Cushion Frame',
    plainAnalogy:
      'カメラの中で一番高い山のように飛び出しているファインダー（軍艦部）は、雨や雪が一番最初に当たる場所です。そこでファインダーの根元の合わせ目ぐるっと1周に、家のドアのすき間テープに似た専用の「高密度防水スポンジパッキン」を挟み込んでいます！雨粒やホコリだけでなく、外からの余計な光がスキマから漏れるのも完全にストップします。',
    summary:
      'EVF光学ハウジング（E18）の底面および前後接合フランジ全周をトップカバー・リアキャビネットへ気密圧縮接合する、独立気泡EPDM／PORONダイカット防水・遮光ガスケット枠です。',
    opticsAndPhysics: [
      '独立気泡EPDMスポンジは圧縮率30〜50%で反発力が安定しており、マグネシウム鋳造トップカバーと背面カバーの合わせ目に生じる±0.15mmの微細な公差隙間を連続閉ループで隙間なく埋めます。',
      '同時にファインダー外装の合わせ目から強い太陽光が内部のアイセンサー（E04）や視線入力IRカメラ（E07）付近へ漏れ込む「迷光リーク」を遮断する真っ黒な遮光ダムとしても重要です。',
      '極低温（−20℃）から高温（+80℃）まで硬化・ひび割れしにくい耐候性エラストマーを採用しています。',
    ],
    nextGenInnovation:
      'Sony α7 IV / α7R V / α1 II 世代では、軍艦部合わせ目のシーリング幅を拡大し、背面ラバーやMIシュー防滴ブーツ（E41）と立体的に連続する3D防水バリアを形成しています。',
    formula: {
      expression: 'Compression = 35〜45%  ⇒  連続閉ループ防水・遮光シール（OD > 5）',
      description: 'パッキンを35〜45%ほどギュッと潰して挟み込むことで、雨の侵入経路も光の漏れ道もゼロにします。',
    },
    specs: [
      { label: '材質', value: '独立気泡EPDM／高密度PORON耐候ウレタン発泡ガスケット' },
      { label: '配置', value: 'EVF軍艦部ベース全周＋前後トップ／リアカバー接合フランジ' },
      { label: '機能①', value: '雨天・雪・砂塵からのトップ合わせ目防塵防滴シーリング' },
      { label: '機能②', value: 'アイセンサー・視線入力光学系への外部太陽光リーク遮断' },
    ],
    diagramType: 'evf_surr_hump_wp_gasket',
  },

  // =========================================================================
  // Group 3: Micro-OLED (OLEDoS) Internal Micro-Stack & Eyepiece Optics (E46–E55)
  // =========================================================================
  'evf-oled-tandem-cavity': {
    category: '個別微細層 E46 — 切手より小さい画面で「2階建て発光＆ミクロの鏡」が生む驚異の明るさ！',
    title: 'E46. Micro-OLED（OLEDoS）2層タンデム白色有機EL発光層＆ファブリ・ペロー光共振キャビティ',
    subtitle: '2-Stack Tandem White OLED Emissive Layer, Al/Ag Anode Mirror & MgAg Micro-Cavity Cathode',
    plainAnalogy:
      'ファインダーの中にある0.64インチの画面は、なんと切手より小さいのに944万ドットもの細かさ！しかも真夏の太陽の下でもくっきり明るく見える秘密が「2階建て発光（2層タンデム）」と「ミクロの鏡（光共振）」です。発光する層を2段重ねて2倍の明るさを出しつつ、上下の超薄い鏡の間で光を響き合わせることで、色の純度も寿命も一気に跳ね上げています！',
    summary:
      'Sony Semiconductor製 OLEDoS（ECX337AA-1 / ECX339A / ECX344A世代）の単結晶シリコンCMOS駆動回路上に真空蒸着された、反射アノード（Al/Ag）・2層タンデム白色有機EL＋電荷発生層（CGL）・半透過カソード（MgAg）によるファブリ・ペロー光共振発光スタックです。',
    opticsAndPhysics: [
      '2層タンデム構造では、2つの有機EL発光ユニットを電荷発生層（CGL：Charge Generation Layer）で直列積層するため、同じ電流密度で約2倍の輝度が得られ、逆に同じ輝度なら電流を半減できて発熱と焼き付き寿命を約2〜4倍改善します。',
      '底面の高反射アルミニウム／銀（Al/Ag）画素アノード電極と上面の半透過マグネシウム銀（MgAg）共通カソード電極の距離を可視光の半波長の整数倍にナノメートル精度で調整することで、ファブリ・ペロー光共振（マイクロキャビティ効果）を起こし、正面方向の輝度とDCI-P3広色域の色純度を大幅に高めます。',
      '自発光かつ単結晶シリコン画素スイッチ（応答速度 < 0.01ms）のため、コントラスト比 100,000:1 超の漆黒と残像ゼロの240fps表示を実現します。',
    ],
    nextGenInnovation:
      '最新世代のフラッグシップEVF（α7R VI / EOS R1世代）では、この2層タンデム光共振＋六角マイクロレンズアレイ（E23）の融合により、従来比約3倍の超高輝度HDRビューファインダーを達成しています。',
    formula: {
      expression: '2 · n · d_cavity = m · λ   (ナノ精度の共振間隔 d で正面輝度＆色純度を最大化)',
      description: '上下のミクロな鏡の間隔（d）を光の波長のピッタリ倍数に揃えることで、光が強め合って鮮やかで超高輝度になります。',
    },
    specs: [
      { label: '対応素子', value: 'Sony OLEDoS 世代（ECX337AA-1 / ECX339A / 0.64型 9.44Mドット）' },
      { label: '発光構造', value: '2層タンデム白色OLED＋電荷発生層（CGL）直列積層' },
      { label: '共振キャビティ', value: 'Al/Ag反射アノード ＋ 半透過MgAgカソード（ファブリ・ペロー共振）' },
      { label: '表示性能', value: 'コントラスト > 100,000:1 / 応答 < 0.01 ms / DCI-P3広色域' },
    ],
    diagramType: 'evf_oled_tandem_cavity',
  },

  'evf-oled-bondwires-glob': {
    category: '個別微細層 E47 — 髪の毛より細い「金の糸」と、光の反射を防ぐ真っ黒な樹脂の鎧',
    title: 'E47. Micro-OLED シリコンチップ周辺・極細金ボンディングワイヤ＆黒色エポキシ封止ダム（Glob-Top）',
    subtitle: 'OLEDoS Die-to-Carrier φ20 μm Gold Wire-Bond Array & Matte-Black Epoxy Glob-Top Dam',
    plainAnalogy:
      'Micro-OLEDの中身は、実は超精密なシリコン半導体チップそのもの！そのチップの周囲と土台のセラミック板の間は、髪の毛の1/3以下の細さ（0.02mm）の「純金の糸（ボンディングワイヤ）」で何十本も縫い合わせて電気をつないでいます。そして振動で切れないよう＆金属がピカッと光って映像の邪魔をしないよう、上から真っ黒な樹脂の鎧（グロブトップ）で固めて守っています！',
    summary:
      'OLEDoS単結晶シリコンダイ（E14）の周辺アルミパッドとセラミック／コバールキャリアパッケージを結ぶφ20μm極細金ワイヤボンディング列と、それを保護・遮光する低応力マットブラック・エポキシ樹脂封止ダム（Dam & Fill Glob-Top）です。',
    opticsAndPhysics: [
      '超音波熱圧着でループ形成されたφ20μm金線は、高速MIPI/Sub-LVDS映像データとOLED陽極・陰極電源を単結晶シリコン駆動回路へ低抵抗供給します。',
      '周囲を囲む黒色カーボン充填エポキシ封止ダム（Glob-Top）は、①落下衝撃や振動からのワイヤ断線防止、②湿気からの電極腐食防止、③接眼レンズ側からの逆入射光が金線に反射して画面周囲に迷光ゴーストを出すのを防ぐ光学遮光の3役を同時にこなします。',
      '樹脂の熱膨張係数（CTE）をシリカフィラーでシリコンとセラミックに近づけ、寒冷地と真夏の温度変化で金線が引きちぎられるのを防ぎます。',
    ],
    nextGenInnovation:
      '封止ダムの高さをOLED有効発光面の直上より極限まで低く抑える「低ループ・ダム＆フィル技術」により、視野枠マスク（E52）やG1レンズ（E13）をパネルへ極限まで近づけて大画面・高倍率（0.90×）を実現しています。',
    formula: {
      expression: 'φ_wire ≈ 20 μm (Au),   CTE_epoxy ≈ 15 ppm/K（温度変化でも金線が切れない低応力封止）',
      description: '髪の毛より細い金の糸を、伸び縮みの少ない真っ黒な特殊樹脂で優しく固め、衝撃と光の反射の両方から守ります。',
    },
    specs: [
      { label: '配線材', value: 'φ20 μm 高純度金（Au）超音波熱圧着ボンディングワイヤ群' },
      { label: '封止樹脂', value: '低CTEシリカ・カーボン充填 マットブラック・エポキシ（Glob-Top）' },
      { label: '光学配慮', value: '画面周辺からの金線反射ゴーストを完全吸収（低光沢黒色仕上）' },
      { label: '保護機能', value: '耐衝撃ワイヤ固定・防湿耐腐食保護・低背プロファイル実現' },
    ],
    diagramType: 'evf_oled_bondwires_glob',
  },

  'evf-oled-fpc-decaps': {
    category: '個別微細層 E48 — 画面のチラつきを防ぐ、OLED専用リボン上の「超小型・電気ミニタンク」',
    title: 'E48. OLEDパネル直結フレキ（LCD902 ポリイミドFPC）・0201電源デカップリングコンデンサ群＆SUS補強板',
    subtitle: 'ECX337AA-1 / LCD902 Integrated Polyimide FPC Tail, 0201 MLCC Decoupling Bank & SUS Stiffener',
    plainAnalogy:
      '有機EL（OLED）は画面の明るさが白から黒へ一瞬で変わるとき、電気の消費量もジェットコースターのように急変します。もし電源の電圧がほんの少しフラついただけで、画面に横筋やチラつきが出てしまいます！そこでOLEDパネルから生えている専用リボンケーブルのすぐ根元に、米粒の1/50サイズの超小型コンデンサ（電気のミニ貯水タンク）をズラッと並べて、電圧をピタッと安定させています！',
    summary:
      'Sony純正カラーEVFユニット LCD902（875607419: ECX337AA-1）のキャリアパッケージから直出しされた専用ポリイミドFPC、近傍実装の0201サイズMLCC電源安定化コンデンサ群、およびZIF挿抜用ステンレス補強板（スティフナー）です。',
    opticsAndPhysics: [
      'OLED駆動用の正負電源（ELVDD / ELVSS）やアナログガンマ基準電圧（VREF）のラインに、寄生インダクタンスを極小にするためパネルから数ミリ以内のFPC上に0201セラミックコンデンサ（MLCC）を直接はんだ実装しています。',
      '画面が120/240fpsで激しい明暗変化を繰り返しても、これらの極小コンデンサがナノ秒単位で瞬時電流を供給・吸収し、輝度ムラ（ロードレギュレーション誤差）や色転びを防ぎます。',
      '先端の金メッキ指（ゴールドフィンガー）裏側には厚さ0.2mmのSUS304補強板を貼り、TCON基板（E16）のZIFコネクタへ確実に垂直挿入できる剛性を与えています。',
    ],
    nextGenInnovation:
      'FPC上に極小受動部品とIDメモリ（パネル個体ごとのガンマ・ホワイトバランス補正値）を集約することで、サービス交換時にLCD902ユニット単体を差し替えるだけで正確な発色を再現できます。',
    formula: {
      expression: 'ΔV_ripple = ΔI_OLED · ESR + L · (dI/dt)   (直近MLCCで L を極小化しチラつきゼロ)',
      description: 'OLEDのすぐ横に小さな電気タンク（MLCC）を置くことで、明るさが急変しても電圧の揺れ（ΔV）を抑えてチラつきを消します。',
    },
    specs: [
      { label: 'Sony純正品番', value: 'Ref.LCD902 / Part No. 875607419 (ECX337AA-1 COLOR EVF UNIT 直結FPC)' },
      { label: '実装部品', value: 'EIA 0201（0.6×0.3mm）低ESR MLCCデカップリングコンデンサ群' },
      { label: '先端構造', value: '厚付金メッキZIF端子＋SUS304 0.2mm スティフナー補強板' },
      { label: '効果', value: '240fps明暗急変時の横筋ノイズ・フリッカー防止・正確ガンマ再現' },
    ],
    diagramType: 'evf_oled_fpc_decaps',
  },

  'evf-lens-zeiss-tstar-coat': {
    category: '個別微細層 E49 — 4枚の接眼レンズで光が跳ね返るのを消す「ナノ単位の魔法の反射防止コート」',
    title: 'E49. 接眼レンズ群（G1〜G4）多層誘電体反射防止蒸着膜（ZEISS T* / Nano AR II 超低反射コート）',
    subtitle: '4-Element Eyepiece Multi-Layer Dielectric Anti-Reflective Vapor Coating (ZEISS T* / Nano AR II)',
    plainAnalogy:
      'ファインダーの中には、小さなOLED画面を大迫力（0.90倍）に拡大するための4枚のガラスレンズ（G1〜G4）が入っています。普通のガラスは表面で光が鏡のように跳ね返るため、4枚（表裏8面）もあると画面の中で光がピンポン玉のように何度も反射し、夜景が白っぽくモヤッとしてしまいます！そこで各レンズの表面にナノ単位の透明な薄膜を何層も蒸着し、反射波同士をぶつけて消し去る魔法のコートをかけています！',
    summary:
      '接眼光学系（G1フィールドフラットナー・G2/G3可動EDダブレット・G4両面非球面レンズ）の全空気接触面（6〜8面）に真空蒸着された、多層誘電体反射防止（AR）コーティング膜（ZEISS T* / Sony Nano AR II クラス）です。',
    opticsAndPhysics: [
      '素ガラスは1面あたり約4〜5%のフレネル反射を生じるため、6〜8面無コートでは透過率が約70%まで落ち、残りの約30%が内部迷光ゴーストとなってコントラストを破壊します。',
      '高屈折率材料（TiO₂ / Ta₂O₅ 等）と低屈折率材料（MgF₂ / SiO₂ 等）を可視光波長の1/4厚（約100nm前後）で7〜15層精密積層すると、各境界面からの反射光が逆位相で弱め合い（光の波動干渉）、1面あたりの反射率を 0.2% 未満まで抑え込みます。',
      'その結果、100,000:1を誇るOLEDの漆黒が接眼レンズを通しても濁らず、夜間撮影や逆光シーンでも画面の隅々まで抜けの良いクリアな視界が得られます。',
    ],
    nextGenInnovation:
      'ソニーα1 / α7S III / α7R Vの0.90倍大型ファインダーでは、41°の広視野角でレンズへ斜めに入射する周辺光線に対しても色付き反射（マゼンタ・グリーン偏り）が出ない広入射角最適化ARコートが採用されています。',
    formula: {
      expression: 'n_layer · d = λ / 4   ⇒   1面反射率 R < 0.2%（全8面合成透過率 > 98.5%）',
      description: '光の波長の4分の1の薄さに調整した透明膜を何層も重ね、反射する光の波同士を打ち消し合わせて素通しにします。',
    },
    specs: [
      { label: '成膜工法', value: 'イオンアシスト真空蒸着（IAD）7〜15層多層誘電体ARコート' },
      { label: '片面反射率', value: '< 0.2%（420 〜 680 nm 可視光全域 / 広入射角最適化）' },
      { label: '対象レンズ', value: 'G1（E13）・G2/G3 EDダブレット（E09）・G4両面非球面（E08）全空気面' },
      { label: '視界メリット', value: '夜景・高コントラスト被写体での白浮き・二重ゴースト完全抑制' },
    ],
    diagramType: 'evf_lens_zeiss_tstar_coat',
  },

  'evf-lens-edge-blackening': {
    category: '個別微細層 E50 — レンズのフチの白モヤを消す職人技「墨塗り（すみぬり）」＆防振接着玉',
    title: 'E50. 接眼レンズ外周・光学墨塗り処理（Sumi-Nuri Edge Blackening）＆ 3点光学シリコンポッティング玉',
    subtitle: 'Ground-Glass Lens Rim Sumi-Nuri Optical Edge Blackening & 3-Point Silicone Potting Dots',
    plainAnalogy:
      'ガラスのレンズを横から見ると、丸く削った側面がすりガラスのように白っぽく光ります。もしこのままカメラに入れると、斜めから当たった画面の光がフチで乱反射して、ファインダーの周りが白くボヤッと曇ってしまうのです！そこで高級レンズと同じく、1枚1枚のレンズの側面を真っ黒な特殊インクで丁寧に塗る「墨塗り（すみぬり）」を行い、さらに3点の柔らかいゴム系接着玉で衝撃から守っています！',
    summary:
      '接眼光学系G1・G2/G3・G4の各ガラスレンズ外周研削面（コバ面）に塗布された低反射・屈折率整合型黒色光学インク層（墨塗り）と、レンズセル内周へ応力ゼロで弾性固定する3点光学用シリコーン接着玉（ポッティング）です。',
    opticsAndPhysics: [
      '広角41°のEVF接眼系ではOLED端部の強い光線がレンズ内部を斜めに通過してガラス外周の研削面（コバ）に当たるため、無処理だと全反射・拡散反射した迷光がファインダー周辺部に白っぽいフレアリングを作ります。',
      'ガラスの屈折率（n ≈ 1.5〜1.8）に近いバインダーにカーボンブラックを分散させた専用墨塗り塗料を外周へ塗布することで、コバ面に届いた不要光を99%以上吸収し、画面のフチまで漆黒のコントラストを保ちます。',
      'また金属セルとの熱膨張差でガラスが歪んで複屈折や非点収差が出ないよう、硬いエポキシではなく柔軟な低アウトガス光学シリコーンを120°間隔3点に点付け（ポッティング）して優しく固定します。',
    ],
    nextGenInnovation:
      '低揮発（低シロキサン・アウトガス）グレードの光学用UV/湿気硬化シリコーン接着剤を使うことで、密閉EVF内部で何年たってもレンズ表面に白い曇り（ガス曇り）が一切発生しません。',
    formula: {
      expression: 'n_ink ≈ n_glass  ⇒  コバ界面反射 R_edge < 0.5%（不要迷光を 99%以上吸収）',
      description: 'ガラスと屈折率の近い真っ黒なインクをレンズ側面に塗ることで、フチに当たった余計な光を跳ね返さず吸い込みます。',
    },
    specs: [
      { label: 'コバ処理', value: '屈折率整合・超低反射カーボン光学墨塗り（Sumi-Nuri 全4枚施工）' },
      { label: '接着固定', value: '120°対称3点 低アウトガス光学シリコーン弾性ポッティング玉' },
      { label: 'アウトガス管理', value: '低シロキサン光学規格（密閉鏡筒内でのレンズ白曇りゼロ）' },
      { label: '画質効果', value: '視野外周部のフレア・リング状ゴースト除去・耐衝撃レンズ保護' },
    ],
    diagramType: 'evf_lens_edge_blackening',
  },

  'evf-lens-inter-spacers': {
    category: '個別微細層 E51 — レンズ同士のスキマを「髪の毛の1/10」精度で揃える真鍮リング＆極薄シム',
    title: 'E51. 接眼レンズ間・精密黒染め真鍮スペーサーリング＆5〜20μm光軸間隔調整シム',
    subtitle: 'Precision Blackened-Brass Inter-Lens Spacer Rings & 5–20 μm Axial Air-Gap Calibration Shims',
    plainAnalogy:
      'ファインダーの中の4枚のレンズは、お互いに「ちょうど決められたミリ数」だけ離して並べることで初めて画面の隅々までピントが合います。もし距離が髪の毛1本分ズレただけでも端っこの文字がボケてしまうのです！そこでレンズとレンズの間に、光を反射しない真っ黒な「精密金属スペーサー輪っか」と、厚さわずか0.01mmの極薄真鍮シート（シム）を挟み、寸分の狂いなく距離を揃えています！',
    summary:
      'G4両面非球面レンズ（E08）・G2/G3可動EDダブレット（E09）・G1フィールドフラットナー（E13）間の空気間隔と平行度を±5μm精度で規定・微調整する、つや消し黒染め旋盤加工スペーサーリング＆極薄真鍮／ステンレス調整シム群です。',
    opticsAndPhysics: [
      '0.90倍という超高倍率EVFはわずかなレンズ間隔誤差が倍率色収差や像面湾曲（周辺ボケ）として敏感に目に映るため、各レンズ曲率公差に合わせて5μm / 10μm / 20μm刻みの金属シムを組み合わせて最適空気間隔を追い込みます。',
      'スペーサー内周面には細かい遮光ネジ山（マイクロバッフル溝）とつや消し黒色アルマイト／黒染め処理を施し、間隔保持と迷光吸収リングの2役を同時にこなします。',
      '真鍮・ステンレス金属スペーサーは樹脂と違って吸湿膨張や経年クリープ変形が起きず、長年にわたり隅々までシャープな解像感を維持します。',
    ],
    nextGenInnovation:
      '自動光学検査装置（MTF実測）と連動した工場の精密シム選定により、944万ドットの微小6μm画素を画面中央から四隅の撮影設定アイコンまで均一に解像させます。',
    formula: {
      expression: 'Δd_air ≤ ±5 μm   ⇒   41°広視野の四隅まで像面湾曲ゼロの均一解像',
      description: 'レンズ間の空気のスキマ誤差を±0.005mm以内に揃えることで、画面の真ん中も四隅の文字もくっきりシャープに見えます。',
    },
    specs: [
      { label: 'スペーサー', value: 'CNC精密旋盤加工 つや消し黒染め真鍮／アルミ遮光リング × 2' },
      { label: '調整シム', value: '5 / 10 / 20 μm 刻み 精密エッチング真鍮・SUS間隔調整シム' },
      { label: '間隔精度', value: 'レンズ間空気間隔・平行度公差 ±5 μm 以内' },
      { label: '副次効果', value: '内径ナイフエッジ遮光溝による斜め迷光カット' },
    ],
    diagramType: 'evf_lens_inter_spacers',
  },

  'evf-oled-field-mask': {
    category: '個別微細層 E52 — ファインダーの四辺を映画館のスクリーンのようにスパッと引き締める極薄額縁',
    title: 'E52. Micro-OLED直前・ナイフエッジ矩形視野枠マスク（Precision Field-Stop Aperture Mask）',
    subtitle: 'Photo-Etched 30° Knife-Edge Matte-Black Stainless Rectangular OLED Field-Stop Mask',
    plainAnalogy:
      '映画館のスクリーンの周りには真っ黒な幕が張られていて、画面のフチがクッキリ見えますよね。ファインダーも同じで、実はOLEDパネルのすぐ目の前に、カミソリの刃みたいに薄くて真っ黒な「小さな長方形の額縁（視野枠マスク）」が置かれています！これがあるおかげで、OLEDの端から漏れるぼんやりした光をスパッと切り落とし、のぞいた瞬間に息を呑むほどシャープな四角い枠が見えるのです！',
    summary:
      'Micro-OLED有効表示面（13.8×10.4mm）の直前（z = +1.65mm）に配置された、厚さ0.10mmの精密フォトエッチング黒色酸化ステンレス製ナイフエッジ矩形視野絞り（フィールドストップ）マスクです。',
    opticsAndPhysics: [
      'OLED画素マトリクスの外周には、駆動トランジスタのダミー画素や微細な光漏れ領域が存在します。視野枠マスクの開口をパネル有効領域にミクロン精度で一致させることで、不要なエッジ発光を完全に遮断します。',
      '開口内縁を厚さ0.10mmの極薄ナイフエッジ形状（テーパー角約30°）＋超低反射黒色処理にしているため、壁面での斜め反射（テカリ）が起きず、視野率100%のフレーム境界がカミソリのように鋭く見えます。',
      '光学系の一次像面（OLED発光面近傍）にあるため、視度調整を動かしても枠自体が常にクッキリとしたピントで視認できます。',
    ],
    nextGenInnovation:
      'ステンレス極薄板の両面ハーフェッチング技術により、バリ（微小な金属のささくれ）が1μmも出ない滑らかな直線エッジを実現し、拡大率0.90倍でも枠のギザつきが一切見えません。',
    formula: {
      expression: 'Edge Sharpness = ナイフエッジ厚 t = 0.10 mm（縁反射ゼロ・視野率 100%）',
      description: '刃物のように薄い真っ黒な枠を画面のすぐ前に置くことで、フチの反射ボケをなくし映画館のように美しい四角い視界を作ります。',
    },
    specs: [
      { label: '材質・厚み', value: 'SUS304 精密フォトエッチング薄板（t = 0.10 mm / 30°ナイフエッジ）' },
      { label: '表面処理', value: '超低反射マットブラック黒色酸化＋カーボンコート（反射率 < 1%）' },
      { label: '開口寸法', value: '13.8 × 10.4 mm（0.64型 4:3 OLED有効領域に高精度整合）' },
      { label: '視認効果', value: '視野率100%のシャープな黒枠・周辺ダミー発光漏れ完全遮断' },
    ],
    diagramType: 'evf_oled_field_mask',
  },

  'evf-diopter-antibacklash-nut': {
    category: '個別微細層 E53 — 視度ダイヤルを回し返したときの「空回りガタ」を消す割りナット＆高級グリス',
    title: 'E53. 視度調整・バックラッシュ除去スプリットナット＆低アウトガス光学フッ素ヘリコイドグリス層',
    subtitle: 'Zero-Backlash Spring-Preloaded Split Lead-Screw Nut & Low-Outgassing Optical Damping Grease',
    plainAnalogy:
      '視度調整ダイヤルを右へ回してから左へ回し返したとき、もしネジにわずかな遊び（ガタ＝バックラッシュ）があると、一瞬スカッと空回りしてピント合わせがイライラしますよね。そこでネジを噛むナットをわざと「2つに割ってバネで挟み込む」ことで遊びを完全にゼロにし、さらにレンズを曇らせない超高級な専用グリスを塗って、ヌルッと吸い付くような上質な回し心地を実現しています！',
    summary:
      '視度調整リードスクリュー（E12）とED可動レンズ枠（E09）を連結する、バネ予圧式2分割アンチバックラッシュ・スプリットナット（POM／真鍮）と、超低揮発パーフルオロポリエーテル（PFPE）系光学ダンピンググリス層です。',
    opticsAndPhysics: [
      '通常の1ピースナットは摺動のために0.03〜0.08mmのネジ山クリアランスが必要ですが、スプリットナットは前後2片のナットを小型コイルバネで互いに押し広げてリードスクリューの左右両フランク面へ常時密着させ、反転時のバックラッシュ（空転ガタ）を0.005mm未満に消滅させます。',
      '潤滑剤には一般的な鉱物油ではなく、蒸気圧が極めて低く高温でも絶対に蒸発・油膜曇りしないフッ素系光学ヘリコイドグリス（PFPE＋PTFE増稠剤）を採用しています。',
      'このグリスの適度な粘性せん断抵抗が、高倍率EVFの微細な視度追い込み（−4.0〜+3.0 m⁻¹）時に指先の動きにピタッと追従する高級光学機器特有のしっとりした操作感を生みます。',
    ],
    nextGenInnovation:
      '寒冷地（−20℃）でも硬く固まらず、真夏（+60℃）でもダレて流れ出さない高粘度指数PFPE光学グリスにより、一年中同じシルクのような視度調整フィールを維持します。',
    formula: {
      expression: 'Backlash → 0 mm (F_preload > F_slide),   Outgassing TML < 0.1%（曇りゼロ）',
      description: 'バネで2つ割りのナットをネジ山に押し当ててガタを消し、蒸発しないフッ素グリスでレンズを曇らせず滑らかに動かします。',
    },
    specs: [
      { label: 'ガタ除去機構', value: '2分割POM/真鍮スプリットナット＋軸方向コイルバネ予圧機構' },
      { label: '潤滑グリス', value: '超低アウトガス PFPE/PTFE 光学用ダンピングヘリコイドグリス' },
      { label: '動作温度域', value: '−25 ℃ 〜 +75 ℃（低温固化・高温垂れ・レンズ曇りゼロ）' },
      { label: '操作メリット', value: '反転空回りゼロ・0.05ディオプター級の精密ピント追い込み' },
    ],
    diagramType: 'evf_diopter_antibacklash_nut',
  },

  'evf-diopter-gland-seals': {
    category: '個別微細層 E54 — 回る＆押し引きする視度軸を「2重ゴム輪っか」で守る気密シャフトシール',
    title: 'E54. 視度調整軸・二重リップ防水フッ素ゴムOリンググランド＆低摩擦PTFEバックアップリング',
    subtitle: 'Diopter Shaft Dual-Lip Fluororubber (FKM) Waterproof O-Ring Gland & PTFE Anti-Friction Washer',
    plainAnalogy:
      'ファインダーの中は、冬山でも曇らないように乾燥した空気を閉じ込めた「気密室」になっています。ところが視度ダイヤルの軸だけは、外から中へ貫通していてしかも「回転」と「押し引き」をします！そこで軸受けの穴の中に、耐候性抜群のフッ素ゴムOリングを贅沢に2重に並べ、さらにツルツルのテフロン輪っかを添えて、雨も湿気も入れずに軽く回る完璧な気密軸を作っています！',
    summary:
      'EVFマグネシウム鏡筒（E18）側面の視度ダイヤル貫通ボア内部に組み込まれた、二重フッ素ゴム（FKM）回転・直動両用Oリングシールグランドと低摩擦PTFE（テフロン）バックアップガイドリングです。',
    opticsAndPhysics: [
      '外側（大気側）の1本目Oリングが雨粒・汗・微細な砂塵を掻き落とすダストワイパーとして働き、内側（光学室側）の2本目Oリングが乾燥封入空気の湿気侵入（内部結露の原因）を二重に食い止めます。',
      'Oリングの横に低摩擦PTFEバックアップリングを挟むことで、プッシュロック操作時にゴムがねじれて噛み込む「スパイラル破損」を防ぎ、長寿命の気密性を維持します。',
      'フッ素ゴム（FKM）は皮脂・日焼け止めクリーム・寒暖差に極めて強く、一般的なニトリルゴムのように数年でひび割れて防水が切れる心配がありません。',
    ],
    nextGenInnovation:
      'α7S III / α1 / α7R Vで大きく訴求された「急激な温度変化でも内部結露しにくい高気密EVF」は、接眼2重ガラス（E03）とこの2重軸シールグランドの合わせ技で成り立っています。',
    formula: {
      expression: 'Leakage_moisture ∝ 1 / (N_lip · P_contact)   (2重リップ密閉で内部結露を遮断)',
      description: '2重のゴムリングで外からの湿気をブロックし、寒い雪山から暖かい室内に入ってもファインダーの内側が曇らないように守ります。',
    },
    specs: [
      { label: 'シール材', value: '耐皮脂・耐候性フッ素ゴム（FKM）精密二重Oリング（外ワイパー＋内気密）' },
      { label: 'ガイド補助', value: '低摩擦PTFEバックアップリング（ねじれ噛み込み防止）' },
      { label: '対応運動', value: '連続回転＋プッシュロック直動ストローク複合シール' },
      { label: '効果', value: 'EVF光学室内の乾燥気密維持・内部結露防止・砂塵浸入阻止' },
    ],
    diagramType: 'evf_diopter_gland_seals',
  },

  'evf-mipi-ferrite-shield-fpc': {
    category: '個別微細層 E55 — 240fps高速映像の電波ノイズが下のセンサーへ漏れるのを防ぐ銀シールド＆フェライト',
    title: 'E55. EVF 240Hz MIPI-DSI高周波シールドFPC・フェライトビーズEMIフィルタ＆導電銅接地箔',
    subtitle: '240Hz MIPI-DSI Impedance-Matched Shielded FPC, Common-Mode Ferrite Filter & Copper Ground Foil',
    plainAnalogy:
      'ファインダーへ1秒間に最大240回も超高精細な映像を送るリボンケーブルには、ものすごいスピードの電気信号が流れています。もしむき出しのままだと、ケーブルが強力な電波アンテナになってしまい、すぐ真下にある「イメージセンサー」に横縞ノイズを出しちゃいます！そこでケーブル全面を銀色の電波シールド膜とノイズ吸い取りパーツ（フェライト）で徹底的に覆い、美しい写真画質を守り抜いています！',
    summary:
      'EVF TCON基板（E16）とメイン基板（M15）を結ぶ240Hz MIPI-DSI差動高速リボンにラミネートされた銀ペースト／銅箔EMIシールド層、コモンモード・フェライトビーズノイズフィルタ群、およびシャーシ接地銅箔ストラップです。',
    opticsAndPhysics: [
      '9.44Mドット×120/240fpsの映像伝送は数Gbpsの超高速差動信号（MIPI-DSI）となるため、100Ωの厳密な特性インピーダンス整合と全面シールド（片面／両面銀インクラミネート）がなければ強い高周波EMIを放射します。',
      'すぐ直下わずか十数ミリ先には極めて微弱なアナログ光信号を扱うフルサイズCMOSイメージセンサーとシャッターが鎮座しているため、FPC根元のコモンモードチョーク／フェライトビーズが高周波コモンモード電流を熱に変換して徹底除去します。',
      'さらに両端の導電銅箔接地ストラップ（Cu Ground Foil）をEVFマグネシウム筒とメインフレームへ最短接続し、リターン電流ループ面積を最小化しています。',
    ],
    nextGenInnovation:
      '高ISO（ISO 51200〜409600）の暗所撮影でファインダーを240fps駆動しても写真に一切のバンディングノイズ（横縞）が乗らないのは、この極薄シールド＆フェライト対策の賜物です。',
    formula: {
      expression: 'Z_ferrite(1 GHz) > 600 Ω,   Z_diff = 100 Ω ± 5%（センサーへのノイズ飛び込みゼロ）',
      description: '映像信号はキレイに通しつつ、邪魔な高周波ノイズだけに高い壁（フェライト抵抗）を作って下のセンサーへの悪影響を防ぎます。',
    },
    specs: [
      { label: 'シールド層', value: '極薄銀ペースト／銅箔ラミネートEMIシールド膜（被覆率 > 98%）' },
      { label: 'ノイズフィルタ', value: '高周波コモンモードチョーク＆0402フェライトビーズアレイ' },
      { label: '接地構造', value: '導電粘着付き銅箔シャーシ接地ストラップ（両端低インピーダンス接地）' },
      { label: '画質保護', value: '超高ISO撮影時のEVF由来バンディングノイズ・横縞混入を完全防止' },
    ],
    diagramType: 'evf_mipi_ferrite_shield_fpc',
  },
};
