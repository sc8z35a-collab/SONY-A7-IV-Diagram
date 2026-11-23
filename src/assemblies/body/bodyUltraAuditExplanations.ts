import { PartExplanation } from '../types';

/**
 * Phase 16C: 16 Standalone-Only Deep-Audit Camera Body Missing OEM & Mechanical Micro-Parts (B61–B76).
 * Sony ILCE-7M4 公式サービスマニュアル（OVERALL / CABINET REAR-1,2 / CABINET TOP-1,2 / BATTERY HOLDER SECTION）および
 * フラッグシップボディ実機分解（A7R V / A1 II / A7 V）の再精査で特定した未実装・省略部品を、
 * 初心者・素人の方でも直感的にわかる日常のたとえ（やさしい解説）と正確なOEM仕様の両立で完全実装します。
 */
export const BODY_ULTRA_AUDIT_EXPLANATIONS: Record<string, PartExplanation> = {
  'body-dl1008-rtc-flex': {
    category: '個別微細層 B61 — メイン電池を抜いても時計と設定を忘れない「電池室脇のミニ充電池ユニット」',
    title: 'B61. Sony純正 DL-1008 サブフレキ（Ref.411）・着脱不可ソケット BH0001 ＆ 二次リチウム電池 BT0001',
    subtitle: 'Sony OEM Battery-Bay DL-1008 Flex Board (Ref.411), One-Time Socket BH0001 & Secondary Li-Mn Cell BT0001',
    plainAnalogy:
      '撮影中にメインのバッテリーを交換しても、カメラの日付や時刻・カスタム設定がリセットされませんよね？実はバッテリー室のすぐ脇に、小さなボタン型の「バックアップ用充電池（BT0001）」が専用フレキ基板（DL-1008）に乗せて隠されているのです！しかもSony公式マニュアルには「一度外した電池ソケット（BH0001）は再利用禁止！」と明記されているほど、接触信頼性にこだわったプロ仕様部品です。',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル BATTERY HOLDER SECTION Ref.410（500708501: ADHESIVE DL TOP）、Ref.411（A5033446A: DL-1008 FLEXIBLE BOARD）、BH0001（125192821: SOCKET, BATTERY）および BT0001（A175613418: 二次リチウム電池）の純正バックアップ電源アセンブリです。',
    opticsAndPhysics: [
      'メインのNP-FZ100バッテリーを入れている間に数マイクロアンペアの極微弱電流で自動充電され、メイン電池を完全に抜いた状態でも数か月間にわたりリアルタイムクロック（RTC）と揮発性設定メモリを保持し続けます。',
      'サービスマニュアル Note 2 には「DL-1008上の二次リチウム電池（BT0001）を交換する際は、必ずソケット（BH0001）も新品へ同時交換すること（一度外したソケットはバネ圧低下のため再利用不可）」と厳格に規定されています。',
      'メイン基板ではなくバッテリーホルダー外周（BTH ASSY側）に独立配置することで、メイン基板の超高密度化と整備時の電池交換安全性を両立しています。',
    ],
    nextGenInnovation:
      '超低自己放電型のマンガンリチウム二次コイン電池（3V級）と専用両面粘着シート（ADHESIVE DL TOP）の採用により、長期間の防湿庫保管後も時計リセットが起きにくい信頼性を実現しています。',
    formula: {
      expression: 't_hold = Q_cell / I_RTC ≈ 3 mAh / 1.5 μA ≈ 2,000時間（約3か月無給電保持）',
      description: '超省電力な時計回路（1.5マイクロアンペア）と小型充電池の組み合わせで、メイン電池なしでも数か月間時刻を守ります。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.411: A5033446A (DL-1008 FLEXIBLE BOARD) / Ref.410: 500708501' },
      { label: 'Sony純正品番②', value: 'BH0001: 125192821 (電池ソケット・再利用不可) / BT0001: A175613418' },
      { label: '配置位置', value: 'バッテリーホルダー（BTH ASSY Ref.406）外壁 専用ポケット' },
      { label: '役割', value: 'メイン電池交換・長期保管時の日付時刻（RTC）およびカメラ設定保持' },
    ],
    diagramType: 'body_dl1008_rtc_flex',
  },

  'body-bt2033-power-fpc': {
    category: '個別微細層 B62 — バッテリー端子からカメラ心臓部へ大電流を運ぶSony純正「極太給電ハーネス」',
    title: 'B62. Sony純正 BT_SOLDER / BT-2033 大電流バッテリー給電フレキ（Ref.401）＆ 内部電源ケーブル（Ref.413）',
    subtitle: 'Sony OEM High-Current Battery Power Flex BT-2033 (Ref.401: A5023247A) & Power Harness Cable (Ref.413)',
    plainAnalogy:
      'バッテリーを差し込む奥の金メッキ端子とメイン基板の間は、カメラ全体で一番大きな電流（最大6アンペア以上！）が流れる「大動脈」です。普通の薄いリボンだと電気が詰まって発熱してしまうため、Sony純正では分厚い銅箔をはんだ接合した専用の給電フレキ（BT-2033）と太めの電源ケーブル（Ref.413）、さらに耐熱テープ（Ref.402）でガッチリつないでいます！',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル BATTERY HOLDER SECTION Ref.401（A5023247A: BT_SOLDER including BT-2033 flexible board）、Ref.402（750000493: TAPE 631S #25）および Ref.413（184678731: CABLE）からなる主電源供給ハーネスです。',
    opticsAndPhysics: [
      'BT-2033 フレキシブル基板は、一般の信号用FPC（銅厚12〜18μm）の2〜3倍にあたる厚銅箔（35〜70μm）を使用し、電池室奥の4極端子ブロック（B14）に直接強固にはんだ付け（BT_SOLDER）されています。',
      '正極（+7.2V）・負極（GND）の主電源ラインに加えて、NP-FZ100の残量％を正確に読み取るインフォリチウム通信線（T端子・ID端子）を同一フレキで最短ルーティングしています。',
      '8K動画収録や超望遠レンズのXDリニアモーターAF駆動時に瞬間的な大電流が流れても、電圧降下による「バッテリー残量急落表示」や強制シャットダウンを防ぎます。',
    ],
    nextGenInnovation:
      '縦位置グリップ（VG-C4EM/C5）接続用フレキ（VG-1007 / B56）と電池室底部で並列合流できる立体レイアウトにより、グリップ装着時のデュアルバッテリー無停電切替も低損失で行えます。',
    formula: {
      expression: 'ΔV_drop = I_peak · R_BT2033 < 0.05 V   (厚銅箔で瞬間大電流でも電圧低下を防止)',
      description: '分厚い銅の電気道（BT-2033）で抵抗を極限まで下げることで、連写の瞬間でも電池のパワーを100%引き出します。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.401 / Part No. A5023247A (BT_SOLDER / BT-2033 FLEXIBLE BOARD)' },
      { label: 'Sony純正品番②', value: 'Ref.413: 184678731 (CABLE) / Ref.402: 750000493 (TAPE 631S #25)' },
      { label: '導体仕様', value: '大電流対応 2oz厚銅ポリイミドFPC＋電池端子ダイレクトはんだ接合' },
      { label: '信号構成', value: '7.2V主電源（+ / −）＋インフォリチウム残量通信・温度検知線' },
    ],
    diagramType: 'body_bt2033_power_fpc',
  },

  'body-rs1024-rear-bus': {
    category: '個別微細層 B63 — 背面ボタン全部を1本にまとめず「4つに分けて修理しやすくした」純正フレキ網',
    title: 'B63. Sony純正 背面4分割モジュラー制御フレキ群（RS-1024 / SW-1041 / JS-1012 / KY-1035）',
    subtitle: 'Sony OEM 4-Branch Modular Rear Control Flex Harness (Ref.55 RS-1024, Ref.62 SW-1041, Ref.63 JS-1012, Ref.105 KY-1035)',
    plainAnalogy:
      'カメラの裏フタを開けると、背面ボタンの配線は1枚の巨大な板ではなく、実は「4つの小さなリボン基板」に賢く分かれています！①全部をまとめてメイン基板へつなぐ大幹線の「RS-1024」、②再生・ゴミ箱・Fn用の「SW-1041」、③グリグリ動かすジョイスティック専用の「JS-1012」、④上のMENU・AF-ON用の「KY-1035」。おかげでジョイスティックだけ壊れても、そこだけ安く交換できるのです！',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET REAR SECTION-1 & 2 に実在する4系統の純正フレキ基板（Ref.55: RS-1024 / Ref.62: SW-1041 / Ref.63: JS-1012 / Ref.105: KY-1035）のモジュラー配線ネットワークです。',
    opticsAndPhysics: [
      '裏カバー（CAB REAR ASSY）を外す際にメイン基板から切り離す「1本の太い幹線リボン」が RS-1024（Ref.55: A5033449A）であり、裏カバー側の集約ハブとして各サブスイッチフレキとコントロールホイール（Ref.64）を統合します。',
      '使用頻度が極めて高いAFジョイスティック（JS-1012: A5001912A）、下部ボタン（SW-1041: A5033451A）、上部AF-ON/MENU（KY-1035: 100999311）を別パーツ化することで、立体的な背面曲面への貼付精度と部分修理性を大幅に高めています。',
      '各ボタン直下にはクリック感の明瞭なステンレス・スナップドーム（作動荷重約2.0〜2.8N）が保護PETフィルム下に密閉配置され、湿気による接点酸化を防ぎます。',
    ],
    nextGenInnovation:
      'カメラ背面をわずか1本のRS-1024幹線コネクタで本体と分離できる設計にしたことで、センサー清掃やメイン基板交換の整備時間が旧世代比で半分近くに短縮されました。',
    formula: {
      expression: 'RS-1024 (幹線1本) ⇐ { SW-1041 ＋ JS-1012 ＋ KY-1035 ＋ Wheel }',
      description: '4つの小基板を1本の幹線リボン（RS-1024）にまとめることで、故障した部分だけをピンポイントで交換できる親切設計です。',
    },
    specs: [
      { label: '幹線ハブフレキ', value: 'Ref.55 / A5033449A (RS-1024 FLEXIBLE BOARD, COMPLETE)' },
      { label: '下部ボタン系', value: 'Ref.62 / A5033451A (SW-1041 FLEXIBLE BOARD, COMPLETE)' },
      { label: 'ジョイスティック', value: 'Ref.63 / A5001912A (JS-1012 FLEXIBLE BOARD, COMPLETE)' },
      { label: '上部ボタン系', value: 'Ref.105 / 100999311 (KY-1035 FLEXIBLE BOARD)' },
    ],
    diagramType: 'body_rs1024_rear_bus',
  },

  'body-rl1071-shutter-fpc': {
    category: '個別微細層 B64 — 何十万回ものシャッター押しと前ダイヤルの力を支える「グリップ頂上の土台」',
    title: 'B64. Sony純正 RL-1071 レリーズフレキ（Ref.257）・RL FPC BASE（Ref.251）＆ 前ダイヤル保持板（Ref.256）',
    subtitle: 'Sony OEM Shutter Release RL-1071 Flex (Ref.257), Molded RL FPC Base (Ref.251) & Front Dial Plate (Ref.256)',
    plainAnalogy:
      '人差し指で一番よく押すシャッターボタンと、そのすぐ前のクルクル回す前ダイヤル。何十万回押してもフニャフニャしない秘密は、裏側に隠された専用の樹脂台座（RL FPC BASE）と頑丈な金属押さえ板（CNT D F HOLDER PLATE）！その上にシャッター専用フレキ（RL-1071）とスイッチブロック（Ref.258）をガッチリ載せて、プロ好みのカチッとした押し心地を作っています！',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET TOP SECTION-1 Ref.251（502790701: RL FPC BASE）、Ref.255（X50025381: CNT DIAL F ASSY）、Ref.256（500382401: CNT D F HOLDER PLATE）、Ref.257（A5036663A: RL-1071 FLEXIBLE BOARD）および Ref.258（100203812: SWITCH BLOCK）のグリップ頂上操作ユニットです。',
    opticsAndPhysics: [
      'シャッター半押し（AF/AEロック）から全押し（レリーズ）までのわずか0.35mmのストローク差を指先に明瞭に伝えるため、RL-1071フレキの裏側を剛性の高い樹脂キャリア（RL FPC BASE）で面支持し、たわみ（空走感）を排除しています。',
      '前電子ダイヤル（CNT DIAL F ASSY）は人差し指で斜め上から強い回転・押し込み荷重を受けるため、専用の金属ホルダープレート（CNT D F HOLDER PLATE）でトップカバーへ強固に固定され、軸ブレを防ぎます。',
      'RL-1071のスイッチ部には2段同心ドーム接点と電源スイッチ接点が一体集約され、防水シール下の狭小グリップ頂上に納まっています。',
    ],
    nextGenInnovation:
      'シャッターボタンと前ダイヤル周りを独立キャリア（RL FPC BASE）にユニット化したことで、酷使される報道プロカメラマンのシャッタースイッチ交換整備も短時間・高精度で行えます。',
    formula: {
      expression: 'F_half ≈ 1.4 N → F_full ≈ 3.2 N   (剛性ベース支持で 0.35 mm 2段感触を鮮明化)',
      description: '裏側から硬い土台と金属板でしっかり支えることで、「半押し→全押し」の絶妙な2段階のクリック感がぼやけません。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.257: A5036663A (RL-1071) / Ref.251: 502790701 (RL FPC BASE)' },
      { label: 'Sony純正品番②', value: 'Ref.256: 500382401 (CNT D F HOLDER PLATE) / Ref.258: 100203812' },
      { label: '対応操作部', value: '2段シャッターレリーズ・同軸電源スイッチ・前面コマンドダイヤル' },
      { label: '耐久性', value: '半押し／全押し数十万回操作に耐える高剛性ベース支持設計' },
    ],
    diagramType: 'body_rl1071_shutter_fpc',
  },

  'body-sh1035-top-connect': {
    category: '個別微細層 B65 — 重い望遠レンズを首から下げても「肩」が歪まない金属つなぎ板＆トップ幹線フレキ',
    title: 'B65. Sony純正 SH-1035 トップメインフレキ（Ref.307）・左肩連結補強板（Ref.313）＆ 右肩ストラップ連結板（Ref.261）',
    subtitle: 'Sony OEM Top Main Flex SH-1035 (Ref.307), Top Connect Plate L (Ref.313) & Eyelet Plate G (Ref.261)',
    plainAnalogy:
      'カメラに1kg以上の重い望遠レンズを付けてストラップで首からぶら下げると、左右の「肩のつなぎ目」にものすごい引っ張り力がかかります！もし外装のフタだけだとパカッと開いたり歪んだりしてしまいます。そこでカメラの左右の肩の内側に、屋根と骨格をガッチリ縫い合わせる頑丈なステンレスの「つなぎ補強板（Ref.313 / Ref.261）」を入れ、さらに上面の電気をまとめる幹線フレキ（SH-1035）を通しています！',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET TOP SECTION-1/2 Ref.307（A5033450A: SH-1035 FLEXIBLE BOARD）、Ref.313（502790501: TOP CONNECT PLATE L）および Ref.261（502790601: EYELET PLATE G）によるトップ骨格連結＆制御幹線セットです。',
    opticsAndPhysics: [
      '左肩の TOP CONNECT PLATE L（Ref.313）と右肩グリップ側の EYELET PLATE G（Ref.261）は、ストラップ吊り金具（EYELET L/G Ref.316/317）にかかる数kgの動的衝撃荷重（歩行・走行時のG荷重）をトップマグネシウムカバーとメイン内部骨格（Ref.362）の両方へ分散伝達します。',
      '特殊な長尺高張力ねじ（Ref.259/312: M1.7 SG SPIN L=5.5mm）で強固に締結され、長期間の携行でも外装のきしみや防水パッキンのズレを防ぎます。',
      'SH-1035 フレキシブル基板（Ref.307）は、トップデッキ上のモードダイヤル・露出補正ダイヤル・マイク・MIシューからの信号を束ねてメイン基板へ橋渡しする上部中枢ハーネスです。',
    ],
    nextGenInnovation:
      '外装パネルを単なる「覆い」ではなく、左右の連結プレート（Ref.313/261）で内部フレームと一体モノコック化することで、軽量ながらプロ用望遠ズームに耐えるねじり剛性を生み出しています。',
    formula: {
      expression: 'F_strap_drop = m · (1 + a/g) · g  →  連結プレート L/G で主骨格へ荷重分散',
      description: '歩いたり走ったりするときにストラップにかかる強い衝撃力を、左右の鉄のつなぎ板がボディ全体の骨組みへ逃がします。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.307 / Part No. A5033450A (SH-1035 FLEXIBLE BOARD, COMPLETE)' },
      { label: 'Sony純正品番②', value: 'Ref.313: 502790501 (TOP CONNECT PLATE L) / Ref.261: 502790601 (EYELET PLATE G)' },
      { label: '締結ビス', value: 'Ref.259 / Ref.312: 418654511 (SCREW 0+Z M1.7 SG SPIN L=5.5mm)' },
      { label: '役割', value: '左右ストラップ高荷重の骨格分散＆トップデッキ全スイッチ集約中継' },
    ],
    diagramType: 'body_sh1035_top_connect',
  },

  'body-rear-thumb-grip': {
    category: '個別微細層 B66 — 片手でもカメラがスッと吸い付く「背面の親指引っ掛けゴム＆裏側補強板」',
    title: 'B66. 背面エルゴノミクス親指レスト滑り止めエラストマー＆内部背面補強板 REAR PLATE（Ref.77: 502794501）',
    subtitle: 'Ergonomic Rear Thumb-Rest High-Friction Elastomer Overmold & Internal Rear Plate (Ref.77: 502794501)',
    plainAnalogy:
      'カメラを右手でギュッと握ったとき、前側のグリップだけでなく「後ろ側の親指が当たる出っ張り（サムレスト）」に指がピタッと引っかかるから片手でも落ちないのです！この部品は汗をかいても滑りにくい専用シボ加工の親指ゴムと、親指で強く押し込んでも裏フタがペコペコ凹まないよう裏側から支える金属の補強板（REAR PLATE Ref.77）のコンビです！',
    summary:
      '背面右肩の親指掛かり部（サムレスト）の高摩擦シボ加工エラストマーパッドと、Sony ILCE-7M4 CABINET REAR SECTION-1 Ref.77（502794501: REAR PLATE 89100）に対応する背面構造補強インナープレートです。',
    opticsAndPhysics: [
      '片手保持時には、前グリップを握る4本指の力と、背面サムレストの張り出し（オーバーハング角約28°）に掛ける親指の反力が偶力（トルク）を作ってレンズ重量を安定支持します。',
      '表面には耐皮脂・耐UV性に優れた熱可塑性エラストマー（TPE）＋微細シボ加工を施し、雨天や手汗で濡れた状態でも高い静止摩擦係数（μ > 0.9）を保ちます。',
      '裏側に配置された REAR PLATE（Ref.77）が親指からの強い握り込み荷重と背面コントロールホイール操作荷重を受け止め、すぐ裏のメイン基板やカードスロットへのたわみ伝達を防ぎます。',
    ],
    nextGenInnovation:
      'α7 IV / α7R V / α1 II 世代では、サムレストの張り出し形状とAF-ON／背面ダイヤルの位置関係を人間工学的に最適化し、親指をわずか数ミリ動かすだけで全撮影操作が完結するよう進化しています。',
    formula: {
      expression: 'F_hold = μ_TPE · N_thumb + N_thumb · tan(28°)   (摩擦＋段差引っ掛かりで安定保持)',
      description: '滑りにくいゴムの摩擦と28°の絶妙な出っ張り段差の合わせ技で、力を入れすぎなくてもカメラが手に吸い付きます。',
    },
    specs: [
      { label: 'Sony純正品番', value: 'Ref.77 / Part No. 502794501 (REAR PLATE 89100)＋背面サムレストゴム' },
      { label: '表皮材質', value: '耐皮脂・耐候性高摩擦エラストマー（TPE / シボ加工 μ > 0.9）' },
      { label: '人間工学形状', value: '親指掛かり約28°オーバーハング段差＋背面ホイール操作逃げ形状' },
      { label: '構造補強', value: 'REAR PLATE による握り込み荷重分散＆背面シェルたわみ防止' },
    ],
    diagramType: 'body_rear_thumb_grip',
  },

  'body-io-port-flap-seals': {
    category: '個別微細層 B67 — 昔みたいにプラプラしない！バネ蝶番＆4連シリコーン防水リップ付き端子扉メカ',
    title: 'B67. 左側面4連ヒンジ式I/Oポート扉・ステンレス蝶番スプリング軸＆成型シリコーン防水リップシール群',
    subtitle: 'Hinged Left-Flank I/O Door Stainless Spring-Hinge Pins & Molded 4-Bay Silicone Lip-Seal Rings',
    plainAnalogy:
      '昔のカメラの端子フタは柔らかいゴムの栓で、開けるとプラプラしてケーブルの邪魔になったり千切れたりしました。最新カメラは「小さなドア（ヒンジ式ハード扉）」に進化！ドアの内側に小さなステンレスの蝶番（ちょうつがい）とバネ、さらに4つの端子口それぞれにピタッと食い込む「柔らかいシリコーンの防水パッキン輪っか」が一体成型されていて、開け閉めが気持ちよく雨も通しません！',
    summary:
      '左側面I/Oドア（B11）の裏側に内蔵された、マイク・ヘッドホン・HDMI・USB-C各ポート独立開閉用のステンレスヒンジ軸・トーションバネ・および各ポート開口に嵌合する4連一体成型シリコーン圧縮リップシール群です。',
    opticsAndPhysics: [
      '4つのポート室ごとに独立したシリコーンゴム製リップシール（周回突起リブ）が、扉を閉じた瞬間にサイドキャビネット（B40）の開口フランジへ約0.4mm弾性圧入され、横殴りの雨や水しぶきの浸入を遮断します。',
      'ステンレス製の極細ヒンジ軸と小型クリックバネが扉を約110°〜135°の開放位置で保持するため、ケーブル挿抜時にフタが勝手に閉まって指やプラグに当たるストレスがありません。',
      'また外部マイクやHDMIケーブルだけを挿して使うときも、使わないUSB-Cやヘッドホン端子の扉は閉じたままにでき、動画撮影時の防塵防滴性を保てます。',
    ],
    nextGenInnovation:
      '従来のTPE一体ヒンジ（折り曲げ疲労で数年後にちぎれる弱点）から、硬質樹脂ドア＋金属ピン蝶番＋独立シリコーンパッキンへ進化し、数万回の開閉耐久性を獲得しました。',
    formula: {
      expression: 'δ_lip ≈ 0.4 mm (弾性圧入)  ⇒  全4ポート独立防滴シール＆10,000回開閉耐久',
      description: 'ドア裏の柔らかいシリコーン突起が枠に0.4mmギュッと密着して水を止め、金属の蝶番で千切れず何万回も開け閉めできます。',
    },
    specs: [
      { label: 'シール構造', value: '4ポート独立周回シリコーンゴム圧縮リップシール（マイク/HP/HDMI/USB-C）' },
      { label: 'ヒンジ機構', value: 'φ1.0 mm ステンレス蝶番ピン＋開放保持クリックバネ' },
      { label: '開閉耐久', value: '従来の軟質ゴム一体ヒンジ比で耐久性を大幅向上（> 10,000回）' },
      { label: '現場メリット', value: '必要ポートのみ個別開放可能・ケーブル干渉ゼロ・防滴維持' },
    ],
    diagramType: 'body_io_port_flap_seals',
  },

  'body-bottom-gasket-bot-s': {
    category: '個別微細層 B68 — 濡れた地面や三脚の雲台から水が這い上がるのを防ぐ「底面の防水堤防」',
    title: 'B68. Sony純正 GASKET BOT S（Ref.56: 503623301）底面背面合わせ目防水ガスケット＆ビス座Oリング群',
    subtitle: 'Sony OEM Bottom-Rear Seam Weather-Seal Gasket (Ref.56: GASKET BOT S) & Baseplate Boss O-Rings',
    plainAnalogy:
      '雨上がりの地面や濡れた岩・ベンチにカメラをちょっと置いたとき、じつは一番危ないのが「底面のスキマ」から毛細管現象で水がジワジワ吸い上がること！そこでSony純正では底面と背面カバーの合わせ目に細長い専用の防水パッキン（GASKET BOT S Ref.56）を敷き、さらに底面のネジ穴周りにも防水処理を施して、下からの水攻めをブロックする「防水堤防」を作っています！',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET REAR SECTION-1 Ref.56（503623301: GASKET BOT S 89100）に対応する底面・背面接合ライン専用防水ガスケット、および底面ベースプレート固定ビス座の防水シーリングリング群です。',
    opticsAndPhysics: [
      'カメラ底面は三脚クイックリリースプレートとの間に雨水が溜まりやすく、わずかな隙間があると毛細管現象で重力に逆らって水が内部へ吸い上げられます。',
      'GASKET BOT S（Ref.56）は背面キャビネット最下辺とボトムカバー（Ref.15）の接合溝へ精密配置され、底面周囲のラビリンス段差と連携して水の吸い上げを物理遮断します。',
      'さらに底面の複数本の固定ビス座には撥水シールリングとねじ込み面シール材を配し、ネジ山を伝って底面から水が侵入するルートも封鎖します。',
    ],
    nextGenInnovation:
      '底面のポッティング防水ユニット（Ref.17）とこの GASKET BOT S（Ref.56）を組み合わせることで、地面スレスレのローアングル撮影や雨天三脚撮影での信頼性を飛躍的に高めています。',
    formula: {
      expression: 'h_cap = 2σ·cosθ / (ρ·g·d)  →  GASKET BOT S で隙間 d を密閉し毛細管浸水を遮断',
      description: '細いスキマがあると水は下から上へ吸い上がってしまいます。底面専用ガスケットでスキマを潰し、水の吸い上げを止めます。',
    },
    specs: [
      { label: 'Sony純正品番', value: 'Ref.56 / Part No. 503623301 (GASKET BOT S 89100)' },
      { label: '材質', value: '耐圧縮永久歪み EPDM独立気泡防水エラストマーガスケット' },
      { label: '併用シール', value: '底面ベースプレート固定ビス座 撥水Oリング＆ラビリンス排水溝' },
      { label: '保護シーン', value: '濡れた地面・三脚雲台上の水溜まりからの毛細管浸水防止' },
    ],
    diagramType: 'body_bottom_gasket_bot_s',
  },

  'body-media-lid-base-seal': {
    category: '個別微細層 B69 — 撮影データが詰まったカード室を「2重の防水パッキン」で守る専用土台枠',
    title: 'B69. Sony純正 MEDIA LID BASE（Ref.60）・GASKET MED（Ref.61）＆ MEDIA LID WP CUSHION（Ref.122）',
    subtitle: 'Sony OEM Media-Bay Subframe MEDIA LID BASE (Ref.60), GASKET MED (Ref.61) & WP Cushion (Ref.122)',
    plainAnalogy:
      'メモリーカードが入っている右側面のフタは、カメラを握る右手の手のひらが常にベッタリ当たる場所！だから手汗や雨粒が一番入りやすい危険地帯でもあります。大切な写真データを守るため、Sony純正ではカード室の入口に専用の受け枠（MEDIA LID BASE）を設け、なんと「枠側（GASKET MED）」と「フタ側（WP CUSHION）」の2重の防水パッキンでピタッと密閉しています！',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET REAR SECTION-1/2 Ref.60（502794801: MEDIA LID BASE）、Ref.61（502863501: GASKET MED）および Ref.122（502862701: MEDIA LID WP CUSHION）からなるデュアルカードスロット2重防滴構造です。',
    opticsAndPhysics: [
      'MEDIA LID BASE（Ref.60）は背面キャビネット内側からカード扉開口の剛性を補強し、スライドロック扉（B21）を閉じた際に周囲全周へ均等なパッキン圧縮圧がかかる基準受け面を形成します。',
      '外周溝に貼られる GASKET MED（Ref.61）と、扉内側に配される MEDIA LID WP CUSHION（Ref.122）の2段構えにより、握り込んだ右手から伝う汗や雨水がCFexpress/SDスロットの金メッキ端子を腐食させるのを防ぎます。',
      '同時に扉の閉まりすぎやガタつきを吸収するクッションストッパーとしても働き、握ったときにカード扉が「ギシギシ鳴る」不快な軋み音を消します。',
    ],
    nextGenInnovation:
      'スライド＋ヒンジ開放の2アクションロック機構と2重防水ガスケットの組み合わせにより、カバンの中での誤開放ゼロと雨天でのデータ保全を両立しています。',
    formula: {
      expression: 'Seal_card = GASKET MED (枠側) ＋ WP CUSHION (扉側) ⇒ 二重防汗・防滴密閉',
      description: '枠とフタのそれぞれに防水パッキンを配置した2重ロックで、手のひらの汗や雨粒から大事なメモリーカードを守ります。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.60: 502794801 (MEDIA LID BASE 89100)' },
      { label: 'Sony純正品番②', value: 'Ref.61: 502863501 (GASKET MED) / Ref.122: 502862701 (WP CUSHION)' },
      { label: '保護対象', value: 'デュアルCFexpress / SDカードスロット＆電気接点・収録データ' },
      { label: '副次効果', value: '右手グリップ握り込み時のカード扉ガタつき・軋み音防止' },
    ],
    diagramType: 'body_media_lid_base_seal',
  },

  'body-backlit-button-leds': {
    category: '個別微細層 B70 — 真っ暗な星空・夜景撮影でもボタンがフワッと光って迷わない内蔵イルミネーション',
    title: 'B70. 暗所撮影用ボタンバックライト 0402極小LEDアレイ＆レーザー導光シリコーンシート',
    subtitle: 'Night-Shooting Illuminated Button 0402 Micro-LED Array & Laser-Etched Silicone Light-Guide Film',
    plainAnalogy:
      '星空や夜景、暗いライブ会場で撮影するとき、「あれ、MENUボタンや再生ボタンどこだっけ？」と手探りで迷ったことはありませんか？最新フラッグシップボディのボタンの裏には、米粒の1/20サイズの極小LEDと、光を均一に運ぶ薄い「光ファイバーみたいなシリコーン導光シート」が仕込まれており、電源レバーをひねるだけでボタンの文字が目に優しい明るさでポワッと浮かび上がります！',
    summary:
      '夜間・暗所撮影時の操作性を飛躍的に高める、背面・上面主要ボタン（MENU / PLAY / DELETE / AF-ON / Fn / DISP等）直下の0402サイドビュー微細LEDアレイ、レーザー微細ドット加工シリコーン導光シート、および二色成型透光キーキャップ群です。',
    opticsAndPhysics: [
      '消費電力わずか数mWの高効率0402白色／アンバー色LEDの光を、厚さ約0.2mmの光学シリコーン導光フィルム内部で全反射（TIR）させて各ボタン裏まで均一に導きます。',
      'ボタン裏の真下だけレーザー微細ドットで光を上方向へ散乱取り出しすることで、少ないLED個数（4〜6個）でも全ボタンのアイコンがムラなく均一に発光します。',
      '星景写真家の暗順応（暗闇に慣れた瞳）を壊さないよう輝度は極めて繊細にPWM調光され、ファインダーや背面モニターへ光が漏れないよう周囲を黒色遮光シートで囲っています。',
    ],
    nextGenInnovation:
      '従来は大型一体型プロ機（Nikon Z9 / Canon R1系）だけの特権だったイルミネーションボタンが、超薄型導光シート技術の進歩によりコンパクトなフルサイズボディにも搭載可能になりました。',
    formula: {
      expression: 'P_LED < 15 mW (PWM調光),   全反射導光フィルムで全ボタンを均一照明',
      description: '超省エネな極小LEDの光を薄い透明シートで全ボタンへ均等に配り、電池をほとんど減らさず暗闇での押し間違いをなくします。',
    },
    specs: [
      { label: '光源素子', value: 'EIA 0402 サイドビュー極小白色/暖色LED × 6灯（PWM輝度制御）' },
      { label: '導光構造', value: 't = 0.20 mm レーザーマイクロドット加工 光学シリコーン導光シート' },
      { label: 'キーキャップ', value: 'レーザー刻印・二色成型透光耐摩耗樹脂（文字消えゼロ）' },
      { label: '撮影メリット', value: '星景・夜景・舞台撮影での暗所ブラインド操作ミスを大幅低減' },
    ],
    diagramType: 'body_backlit_button_leds',
  },

  'body-tally-lamp-diffuser': {
    category: '個別微細層 B71 — 「今、録画中だよ！」を前からも後ろからも一目で伝える赤色タリー＆AF補助光レンズ',
    title: 'B71. 前面・背面デュアル録画タリーランプ（高輝度赤LED＆プリズム拡散レンズ）＆ AF補助光フレネルレンズ',
    subtitle: 'Dual Front/Rear Video Recording Tally LEDs with Prism Diffusers & Front AF-Assist Fresnel Lens',
    plainAnalogy:
      '動画撮影で一番悲しい失敗は「撮れていると思ったら録画ボタンが押せていなかった！」こと。そこでボディの前側（映る人側）と後ろ側（撮る人側）の両方に、録画中に赤くクッキリ光る「タリーランプ」を装備！しかもただの裸のLEDではなく、どの角度から見ても均一に光る小さなプリズム拡散レンズと、暗闇でピントを助ける前側のフレネル集光レンズが組み込まれています！',
    summary:
      '動画収録中ステータスを被写体側（前面）および撮影者側（背面）へ同時通知する高視認性赤色タリーLED＋フロストポリカーボネート拡散プリズム、および前面暗所AF補助光用フレネル集光レンズモジュールです。',
    opticsAndPhysics: [
      '前面タリー／セルフタイマーランプは、高輝度赤色LEDの点光源を微細プリズム拡散レンズで広角（±70°以上）へ均一拡散させ、自撮りやインタビュー時の被写体が離れた位置からでも録画中をひと目で確認できます。',
      '背面タリーランプはファインダーやモニターの周辺視野に入る位置へ配置され、撮影者が画面の細部を見ながらでも「録画中（REC）」を無意識に確信できます。',
      '併設のAF補助光（オレンジ・赤色LED）は薄型フレネルレンズで前方約3m先へ光を効率よく集光し、真っ暗な室内でのコントラストAF・顔検出を強力にアシストします。',
    ],
    nextGenInnovation:
      '最新ハイブリッド機では、前面・背面のタリーランプをメニューから個別にON/OFF可能とし、野生動物撮影や舞台撮影では完全消灯しつつ、ワンマンYouTube/シネマ撮影では確実なREC確認を行えます。',
    formula: {
      expression: 'FOV_tally > 140° (プリズム広角拡散)  ＋  I_AF_assist = G_Fresnel · I_LED',
      description: 'タリーランプはプリズムで広く見やすく広げ、AF補助光はフレネルレンズで遠くまで明るく届ける正反対の光学設計です。',
    },
    specs: [
      { label: 'タリー配置', value: '前面（被写体向け）＋背面（撮影者向け）デュアル高輝度赤色LED' },
      { label: '光学カバー', value: '耐候フロストPC広角拡散プリズム＋防水Oリング密閉ベゼル' },
      { label: 'AF補助光', value: '薄型光学フレネル集光レンズ（暗所約 0.3〜3.0 m 照射）' },
      { label: '誤撮防止', value: 'ワンマン動画・インタビュー撮影での「押し忘れ」事故をゼロに' },
    ],
    diagramType: 'body_tally_lamp_diffuser',
  },

  'body-exp-dial-lock-btn': {
    category: '個別微細層 B72 — カバンの中で露出が勝手にズレる悲劇をワンタッチで防ぐ「ノック式ロック機構」',
    title: 'B72. 露出補正／カスタムRダイヤル・中央プッシュトグルロック機構（ハートカムプランジャー＆バネ）',
    subtitle: 'Exposure / Custom-R Dial Center Push-Toggle Lock Button, Heart-Cam Plunger & Return Spring',
    plainAnalogy:
      'カメラを肩に掛けて歩いていたら、服に擦れて露出補正ダイヤルがいつの間にか「+2.0」に回って写真が真っ白になっていた…カメラ好きなら誰もが一度は経験する悲劇です！Sony α7 IV以降のRダイヤルは中央に「ノック式ボールペンと同じ仕組みのロックボタン」を内蔵！1回カチッと押すとロック、もう1回押すと解除でき、親指1本で勝手に回る悲劇を完全に防げます！',
    summary:
      'トップデッキ右後方の露出補正／カスタムRダイヤル中央に内蔵された、プッシュ・プッシュ（オルタネート動作）式ハートカムロックプランジャー、ステンレス係合ロックピン、および復帰コイルバネ機構です。',
    opticsAndPhysics: [
      'ボールペンのノック機構と同じ「ハート型カム溝（ハートカム）」＋追従ピンを直径わずか数ミリのダイヤル軸中心に超小型化して組み込み、押すたびに「押し込みロック（回転固定）」と「ポップアップ解除（自由回転）」を交互に切り替えられます。',
      'ロック時はプランジャー下端のステンレス係合歯がボディ側の固定セレーションへ噛み合い、カバンや衣服との強い擦れトルクでもダイヤルが1クリックたりとも動きません。',
      'ボタン周囲には極小のシリコーン防塵Oリングを備え、ダイヤル中心の押しボタン隙間からの雨水浸入も防いでいます。',
    ],
    nextGenInnovation:
      'α7 IVから従来の「±3刻印入り固定露出ダイヤル」が無刻印＋プッシュロック付きカスタムRダイヤルへ進化し、ISO感度やWB変更など好きな機能を誤操作ゼロで割り当てられるようになりました。',
    formula: {
      expression: 'State_{n+1} = Toggle(State_n)   (ハートカムで 1プッシュ＝ロック／解除を交互切替)',
      description: 'ボールペンと同じハート型の溝の仕掛けで、押すたびに「回らないロック状態」と「回る状態」を片手で切り替えられます。',
    },
    specs: [
      { label: '切替方式', value: 'オルタネート動作（プッシュ・プッシュ）超小型ハートカム機構' },
      { label: '構成部品', value: '中央プッシュボタン・ハートカム軸・SUS係合ロック爪・復帰コイルバネ' },
      { label: '防水対策', value: 'ボタン軸周回 極小シリコーンOリング防滴シール' },
      { label: '実用効果', value: '携行・衣服擦れによる意図しない露出／ISOズレ事故を完全防止' },
    ],
    diagramType: 'body_exp_dial_lock_btn',
  },

  'body-sv-dial-fpc-cover': {
    category: '個別微細層 B73 — モードダイヤルの真下で雨水とホコリをブロックする「防滴ドーム＆密閉ロータリー部」',
    title: 'B73. Sony純正 SV DIAL FPC COVER（Ref.310: A5038708A）＆ モードダイヤルブロック MD DIAL BLOCK ASSY（Ref.323）',
    subtitle: 'Sony OEM Splash-Proof SV Dial FPC Cover (Ref.310) & Sealed Mode Dial Block Assy (Ref.323)',
    plainAnalogy:
      'カメラの上面にあるモードダイヤル（M・A・S・Pなど）は、上から降ってくる雨がまっすぐ当たる場所です。しかもダイヤルはクルクル回るためどうしてもわずかなスキマができます。そこでSony純正では、ダイヤルの下にある電気スイッチ本体（MD DIAL BLOCK）の周りに専用の「傘みたいな防滴カバー（SV DIAL FPC COVER）」を被せて、万一水が入っても電気回路にかからないように守っています！',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET TOP SECTION-2 Ref.310（A5038708A: SV DIAL FPC COVER）および Ref.323（A5033617A: MD DIAL BLOCK ASSY）に対応する、トップモードダイヤル直下の密閉ロータリースイッチ＆防滴保護カバーです。',
    opticsAndPhysics: [
      'MD DIAL BLOCK ASSY（Ref.323）は、多極金メッキ摺動接点ブラシとグレイコード接点パターンをコンパクトな密閉ドラムへ収めた高信頼ロータリーエンコーダモジュールで、電源OFF中でも物理的なモード位置を確実に記憶します。',
      'その直下・側方を覆う SV DIAL FPC COVER（Ref.310）が、ダイヤル隙間を通過した微細な水滴やホコリからFPC配線および接点部を保護する防滴シールド（スプラッシュガード）として機能します。',
      '静止画／動画／S&Q切替リング（B45）の防水クッション（Ref.322）と組み合わさることで、上面最大の回転操作部でも高い防塵防滴信頼性を達成しています。',
    ],
    nextGenInnovation:
      'モードダイヤルと下段の静止画／動画／S&Q切替ダイヤルを同軸2重構造にしながら、電気接点ブロックと防滴カバーをユニット化したことで、狭い軍艦部スペースに多機能を凝縮しています。',
    formula: {
      expression: 'Gray Code 4-bit (隣接変化1bitのみ)  ⇒  モード切替時の誤認識（グリッチ）ゼロ',
      description: '回したときに隣り合うモード同士で信号が1か所しか変わらない工夫（グレイコード）で、素早く回しても絶対に誤作動しません。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.310 / Part No. A5038708A (SV DIAL FPC COVER 891 S)' },
      { label: 'Sony純正品番②', value: 'Ref.323 / Part No. A5033617A (MD DIAL BLOCK ASSY 89100)' },
      { label: '検出方式', value: '密閉ドラム型 多極金メッキ接点グレイコード・ロータリースイッチ' },
      { label: '保護機能', value: '上面モードダイヤル隙間からの雨滴・砂埃スプラッシュ遮断' },
    ],
    diagramType: 'body_sv_dial_fpc_cover',
  },

  'body-rear-ftb-wp-cushions': {
    category: '個別微細層 B74 — 外装の「3枚がぶつかる角っこ」の極小スキマを塞ぐSony純正・防水ダム群',
    title: 'B74. Sony純正 3面合わせ目防水クッション群（Ref.51 REAR FRONT WP / Ref.74 REAR FTB WP / Ref.254 AF CUSHION）',
    subtitle: 'Sony OEM 3-Way Shell Junction Waterproof Foam Dams (Ref.51, Ref.74 & Ref.254 Cushions)',
    plainAnalogy:
      'カメラの外装は「前フタ」「上フタ」「後ろフタ」の3つの大きなパーツが組み合わさっています。まっすぐな辺はゴムパッキンで塞げますが、実は一番水が漏れやすいのが「3枚のフタがT字にぶつかる角っこ（三叉路）」なのです！そこでSony純正では、その角っこ専用の特注サイズ防水スポンジ（Ref.51 / 74 / 254）をピンポイントで詰め込み、360度スキマなしの防塵防滴を完成させています！',
    summary:
      'Sony ILCE-7M4 公式サービスマニュアル CABINET REAR-1 Ref.51（501034701: REAR FRONT WP CUSHION）、Ref.74（502862901: REAR FTB WP CUSHION）および CABINET TOP-1 Ref.254（501141301: AF CUSHION）に対応する、外装三叉路接合部の専用防水圧縮ダム群です。',
    opticsAndPhysics: [
      'フロント・トップ・リアの各マグネシウム外装カバーが交わる3面接合部（Tジャンクション）は、通常の線状ガスケットだけではコーナー部に0.2mmほどの微小な三角隙間（ピンホール）が生じやすい構造的弱点です。',
      '独立気泡EPDM／高密度ウレタン防水クッションを3か所の接合要所に40%圧縮で充填配置することで、ピンホールを完全に塞ぎつつ外装カバー同士の微細なカタつきも抑えます。',
      'Kolari Vision等の分解でも「裏パネルやトップカバーのフチ沿いに細かく貼られた黒い防水シーリング材」として確認される、まさに防塵防滴の影の立役者です。',
    ],
    nextGenInnovation:
      '各接合部の隙間幅（0.5〜1.5mm）に合わせて厚みや発泡硬度を個別に変えた多点ダイカットクッション設計により、ねじ締めトルクを上げずに高い防水シール性を実現しています。',
    formula: {
      expression: 'T-Junction Gap (0.2 mm)  +  Compressed Closed-Cell Foam (40%)  ⇒  ピンホール 0',
      description: '3枚のカバーがぶつかる角の極小スキマを、水を吸わない独立気泡スポンジでギュッと埋めて完全封鎖します。',
    },
    specs: [
      { label: 'Sony純正品番①', value: 'Ref.51: 501034701 (REAR FRONT WP CUSHION 850)' },
      { label: 'Sony純正品番②', value: 'Ref.74: 502862901 (REAR FTB WP CUSHION 89100)' },
      { label: 'Sony純正品番③', value: 'Ref.254: 501141301 (AF CUSHION 850)' },
      { label: '役割', value: '前・上・後外装カバー3面T字接合部の微小ピンホール防水封鎖' },
    ],
    diagramType: 'body_rear_ftb_wp_cushions',
  },

  'body-battery-cell-safety': {
    category: '個別微細層 B75 — バッテリーの中身を解剖！発火やショートを4重に防ぐ小さな安全装置たち',
    title: 'B75. リチウムイオン電池パック内部・PTC過電流遮断素子・CID圧力安全弁＆セル壁NTC温度保護基板',
    subtitle: 'NP-FZ100 Internal 2S1P Li-Ion Safety Architecture (PTC Thermal Fuse, CID Vent, Cell NTC & Dual-MOSFET BMS)',
    plainAnalogy:
      'NP-FZ100バッテリーの黒いケースの中には、単3電池を少し大きくしたような高性能リチウムイオン電池が2本直列に入っています。小さな電池にスマホ並みの大エネルギーが詰まっているため、安全対策はなんと4重！①異常な大電流で熱くなると自動で電気を止める「PTC温度ヒューズ」、②内圧が上がると物理的に回路を切り離す「CID安全弁」、③電池にベタ付けの「温度センサー（NTC）」、④過充電・過放電を監視する「デュアルMOSFET保護基板」が毎日あなたを守っています！',
    summary:
      '7.2V / 2280mAh（16.4Wh）直列2セル（2S1P）リチウムイオンバッテリー（B01）の内部に組み込まれた、スポット溶接ニッケル接続タブ、復帰型PTC過電流保護素子、内圧遮断CID安全ベント、セル壁密着NTCサーミスタ、およびデュアルN-MOSFETセルバランス保護基板です。',
    opticsAndPhysics: [
      '2本の3.6Vリチウムイオンセルを純ニッケル（Ni）スポット溶接タブで直列接続し、中央電位（3.6V）をBMS保護基板へ引き出すことで、2本の電池の充電バラツキを常時監視（セルバランス保護）しています。',
      '万一端子ショート等で過電流や異常発熱が起きた場合、①電子保護（デュアルMOSFET遮断：数ミリ秒）→ ②熱保護（PTC素子の抵抗急増による電流制限）→ ③物理保護（セル内圧上昇でCID電流遮断ディスクが反転切離し＋ガス開放ベント）の多段フェイルセーフが作動します。',
      'セル側面に耐熱テープで密着したNTCサーミスタが電池内部温度をカメラ本体へ常時報告し、0℃未満でのリチウム析出危険充電や45℃超での高温充電を自動停止します。',
    ],
    nextGenInnovation:
      '純正インフォリチウム電池は残量1%刻み演算用のクーロンカウンター（電流積算IC）と暗号認証チップを同一BMS基板に搭載し、極寒環境でも残り撮影可能枚数を正確に予測できます。',
    formula: {
      expression: '4重保護 = MOSFET電子遮断 → PTC熱遮断 → NTC温度監視 → CID物理圧力切離し',
      description: '電気・熱・温度・圧力の4つの異なる仕組みで何重にも見張っているため、高出力バッテリーでも安心して毎日使えます。',
    },
    specs: [
      { label: 'セル構成', value: '3.6V 高エネルギー密度リチウムイオンセル × 2直列（2S1P 7.2V / 16.4Wh）' },
      { label: '保護素子①', value: 'デュアル低オン抵抗MOSFET（過充電・過放電・短絡 瞬間遮断）' },
      { label: '保護素子②', value: '復帰型PTCサーマルヒューズ ＋ セル内蔵CID内圧遮断安全ベント' },
      { label: '温度・残量管理', value: 'セル壁密着NTCサーミスタ ＋ 1%精度クーロンカウンターBMS基板' },
    ],
    diagramType: 'body_battery_cell_safety',
  },

  'body-anti-twist-tripod-pin': {
    category: '個別微細層 B76 — 雲台やケージの「クルッと緩み」を防ぐ底面ガイド＆シリアル銘板・滑り止めパッド',
    title: 'B76. 底面ビデオ雲台回り止めボス・凹型シリアル／技適QR銘板プレート＆微細テクスチャ防滑ベースパッド',
    subtitle: 'Bottom Baseplate Anti-Twist Alignment Pocket, Recessed Model/Serial/QR Nameplate & Anti-Slip Pad',
    plainAnalogy:
      'カメラを三脚や動画用ケージにネジ1本だけで留めると、縦位置に傾けた瞬間に重さでカメラが「クルッ！」とお辞儀して緩むことがありますよね。カメラの底面には三脚ネジ穴のすぐ隣に雲台のピンがハマる回り止めガイド＆滑り止めパッドがあり、さらに底面を傷つけにくい一段凹んだ位置にモデル名・製造番号・技適マーク・QRコードが刻まれた銘板プレートが美しく収まっています！',
    summary:
      'ボトムカバー（B12）底面の1/4-20 UNC三脚ネジ穴周辺に配された、ビデオ雲台／ケージ用回り止め位置決めガイド面、微細シボ防滑プロテクターパッド、および一段凹型（リセス）アルミ／難燃ラベル銘板（モデル名・シリアル番号・電波認証・修理QR）です。',
    opticsAndPhysics: [
      'カメラ底面の接触座面を三脚ネジ軸に対して極めて高い平面度（< 0.05 mm）で機械加工し、周囲に高摩擦・耐摩耗の微細テクスチャ防滑座を設けることで、クイックリリースプレート装着時の金属同士の焼き付き傷と回転緩みを防ぎます。',
      '銘板プレートは底面外周より約0.4mm一段低く凹ませたポケット（リセス）へ貼付されており、テーブルや三脚プレートに何千回置いてもシリアル番号や技適・FCC/CE認証表示、製造トレーサビリティQRコードが擦れて消えません。',
      '三脚穴周囲の肉厚座面がそのままメイン基板ヒートパイプ末端（M38）からの最終放熱面にもなっています。',
    ],
    nextGenInnovation:
      '最新世代のボディでは、三脚ネジ穴周辺のフラット座面を広げつつ電池扉との干渉距離を最適化し、アルカスイス互換プレートを付けっぱなしでもバッテリー交換ができる実用配慮が施されています。',
    formula: {
      expression: 'T_resist = μ_pad · F_bolt · r_eff + F_pin · L_pin   (摩擦＋回り止めピンで回転緩みゼロ)',
      description: 'ネジの締め付け摩擦と回り止めガイドの組み合わせで、重いレンズを縦向きにしても三脚の上でカメラが回りません。',
    },
    specs: [
      { label: '座面構造', value: '高平面度三脚フランジ座＋ビデオ雲台回り止め位置決めガイド＆防滑パッド' },
      { label: '銘板保護', value: '0.4 mm 凹型リセス（擦れ防止）アルミ蒸着シリアル・技適・QR銘板' },
      { label: '実用配慮', value: '大型クイックリリースプレート装着時の傷防止・回転緩み低減' },
      { label: '位置関係', value: '光軸直下 1/4-20 UNC 三脚座（B12/B35）隣接底面エリア' },
    ],
    diagramType: 'body_anti_twist_tripod_pin',
  },
};
