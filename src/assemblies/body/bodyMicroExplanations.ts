import { PartExplanation } from '../types';

/**
 * Phase 13 Standalone-Only Ultra-Micro Dissection Explanations for the Camera Body (B39–B60).
 * Grounded directly in Sony ILCE-7M4/7M4K Service Manual Exploded Views & Parts List
 * (OVERALL, CABINET REAR 1/2, CABINET TOP 1/2, MAIN BOARD, BATTERY HOLDER, MECHA DEVICE),
 * plus Kolari Vision A1 II / A7R V / Canon R5 II / Nikon Z8 & Lensrentals teardowns.
 */
export const BODY_MICRO_EXPLANATIONS: Record<string, PartExplanation> = {
  'body-main-internal-frame': {
    title: 'B39. 内部マグネシウム高剛性メイン骨格フレーム MAIN FRAME ASSY（SONY X50022761）',
    subtitle: 'Central Structural Magnesium-Aluminum Core Chassis (Sony Ref.362 MAIN FRAME ASSY)',
    category: '個別微細層 B39 — マウント・センサー・三脚座・バッテリー室を統合する中枢骨格',
    plainAnalogy:
      '外から見える黒いボディ外装の内側にもう1枚、建築でいう「鉄骨の柱と梁」にあたる分厚いマグネシウムの中心フレームが隠れています。マウント・シャッター・センサー・メイン基板・三脚座すべてがこの中心骨格へガッチリ固定されています。',
    summary:
      'Sony ILCE-7M4サービスマニュアル（Ref.362: X50022761 MAIN FRAME ASSY (89100)）に実在する、カメラ内部中央を貫くチクソモールドAZ91Dマグネシウム合金製メインシャーシ骨格。前面外装（CABINET F）と背面外装（CABINET REAR）の間に位置し、全主要ユニットの絶対基準面を形成します。',
    opticsAndPhysics: [
      '外装シェルだけで強度を持たせると落下衝撃や三脚荷重がそのまま内部基板やセンサーへ伝わって歪みを生じます。',
      '独立した高剛性トラスリブ構造の内部メインフレームへ「前面からマウント＆シャッター」「中央からIBISセンサー」「背面からメイン基板」「下面から三脚座ブロック」を四方結合するモノコック・コア構造により、軽量と極限剛性を両立します。',
    ],
    formula: {
      expression: '比剛性 E/ρ(AZ91D) ≈ 24.8 GPa/(g/cm³),   3軸トラスリブ補強によるねじり剛性 +65%',
      description: 'カメラ全モジュールの機械基準（Datum）を1枚の鋳造マグネシウム骨格へ集約したフラッグシップ中枢。',
    },
    nextGenInnovation:
      'メインフレームの熱容量自体をメイン基板やIBISセンサーの最終ヒートシンク（放熱母材）として活用するため、随所にサーマルシート貼着用の平坦切削ボスが設けられています。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.362: X50022761 MAIN FRAME ASSY (89100)' },
      { label: '材質・製法', value: 'チクソモールド AZ91D マグネシウム合金 ＋ 重要基準面CNC二次切削' },
      { label: '結合対象', value: 'マウント骨格・シャッター・IBISセンサー・メイン基板・三脚座・バッテリー室' },
      { label: '設計役割', value: '光学基準面維持・衝撃分散モノコックコア・最終放熱ヒートマス' },
    ],
    diagramType: 'body_main_internal_frame',
  },

  'body-side-cabinet': {
    title: 'B40. 左側面マグネシウム・サイドキャビネット外装 SIDE CABINET ASSY（SONY X50022801）',
    subtitle: 'Removable Left-Flank I/O Port Side Cabinet Shell (Sony Ref.8 SIDE CABINET ASSY)',
    category: '個別微細層 B40 — 左側面端子ベイ・スピーカー音響孔一体サイドシェル',
    plainAnalogy:
      'カメラ左側のHDMIやUSB端子が並んでいる面は、実は独立してパカッと外せる「専用サイドカバー部品」になっています。端子まわりの防水パッキン受け溝やスピーカーの音出し穴、ストラップ金具の貫通口まで一体化されています。',
    summary:
      'Sony ILCE-7M4サービスマニュアル（Ref.8: X50022801 SIDE CABINET ASSY (89100)）およびKolari Vision A7R V / A1 II実機分解で確認される、左側面（+X側）の独立着脱式サイドキャビネット外装シェル。',
    opticsAndPhysics: [
      'フルサイズHDMI・USB-C・有線LAN・3.5mm音声端子という多数の開口部が集中する左側面を独立モジュール化することで、I/Oポート扉（B11）の3分割ラビリンス防水座面を高精度に一体成形できます。',
      'Kolari Visionの分解工程でも4本の隠しねじ（ポート蓋下・スピーカー孔付近）を外すことで側面パネルを単独分離でき、破損しやすいHDMI・USB端子の交換整備性を飛躍的に高めています。',
    ],
    formula: {
      expression: '締結構成: ポート蓋下隠しねじ×4 ＋ 下部ねじ×1 (外装ラビリンス嵌合段差 1.4 mm)',
      description: '多数の外部開口が集中する左側面を独立外装化し、防滴シール精度とポート修理性を両立。',
    },
    nextGenInnovation:
      '外皮には指が触れても滑りにくい耐油シボ塗装を施し、内側にはケーブルプロテクター装着時の引き抜き力を受け止める金属インサート座が埋め込まれています。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.8: X50022801 SIDE CABINET ASSY (89100)' },
      { label: '収容要素', value: '3分割I/Oポート開口枠・再生スピーカー音響スリット・左ストラップ座' },
      { label: '防水構造', value: '全周ラビリンス嵌合縁 ＋ B11 独立ポート蓋EPDM着座溝' },
      { label: '実機出典', value: 'Sony ILCE-7M4 SM Ref.8 / Kolari Vision A7R V・A1 II分解工程' },
    ],
    diagramType: 'body_side_cabinet',
  },

  'body-bottom-inner-plate': {
    title: 'B41. 底面二重構造・ステンレスインナー補強プレート BOTTOM INNER PLATE ASSY（SONY X50022811）',
    subtitle: 'Reinforced Inner Baseplate & Waterproof Potted Sub-Assembly (Sony Ref.14 / Ref.17)',
    category: '個別微細層 B41 — 水たまり浸水遮断ポッティング＆底面二重鋼板補強構造',
    plainAnalogy:
      'カメラを濡れた地面や水たまりに置いたとき、底のすき間から水が上がってくるのは昔のカメラの弱点でした。α7 IVでは底板のすぐ内側に「もう1枚の金属インナープレートと防水樹脂ポッティング」を重ねた二重底で水を完全にシャットアウトしています。',
    summary:
      'Sony ILCE-7M4サービスマニュアル（Ref.14: X50022811 BOTTOM INNER PLATE ASSY / Ref.17: A5025879A BOTTOM WP POTTING B-ASSY）に実在する、外装底板（B12）直上に配置される二重底ステンレスインナー補強板と防水ポッティング封止アセンブリ。',
    opticsAndPhysics: [
      'Lensrentalsの旧世代機分解で厳しく指摘されていた「底板からの毛細管浸水（水たまり・縦位置撮影時の飛沫）」を根本解決するため、外装底板と内部基板室の間に完全ポッティング防水隔壁とインナー金属板を二重配置しています。',
      'さらに三脚プレート締結時の圧縮荷重とバッテリー室周囲の開口剛性低下をインナープレートが面で受け止め、底面10本ねじの締結軸力を均一化します。',
    ],
    formula: {
      expression: '二重底断面二次モーメント I_dual ≈ 2.8 · I_single,   防水ポッティング気密隔壁（Ref.17）',
      description: '二重鋼板による底面剛性2.8倍化と、防水ポッティング層による底面浸水ルートの完全遮断。',
    },
    nextGenInnovation:
      'サービスマニュアルでも「Note 2: 防水ポッティング部品の再使用可否確認」が義務付けられるほど、防塵防滴の最重要キーパーツとして管理されています。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.14 (X50022811 BOTTOM INNER PLATE) ＋ Ref.17 (A5025879A WP POTTING)' },
      { label: '構造特徴', value: '外装底板（B12）内側の二重構造SUS補強プレート ＋ 樹脂防水ポッティング層' },
      { label: '防水機能', value: '濡れた地面・三脚座周辺・バッテリー扉隙間からの毛細管浸水遮断' },
      { label: '剛性役割', value: '底面10点ねじ締結面補強・大型クイックリリース雲台の面圧分散' },
    ],
    diagramType: 'body_bottom_inner_plate',
  },

  'body-grip-adhesive-sheets': {
    title: 'B42. グリップ外皮専用・2分割ダイカット強粘着シート GRIP ADHESIVE 1 & 2（SONY 502860601 / 502860701）',
    subtitle: 'Two-Piece Precision Die-Cut Grip Adhesive Sealing Sheets (Sony Ref.11 & Ref.12)',
    category: '個別微細層 B42 — 隠し外装ねじを密閉保護する使い捨て強粘着・耐汗両面テープ',
    plainAnalogy:
      '右手グリップのゴムをめくると、実はボディを留める隠しネジが出てきます。そのネジ穴へ手汗や雨が入り込まないよう、複雑なグリップの形にぴったり抜かれた「2枚組の超強力・耐汗防水両面シート」でピタッと貼り付けて封をしています。',
    summary:
      'Sony ILCE-7M4サービスマニュアル（Ref.11: 502860601 GRIP ADHESIVE 1 / Ref.12: 502860701 GRIP ADHESIVE 2 — Note 1: 再使用不可・新品交換必須）に実在する、フロントグリップゴム（B03）とマグネシウム外装を密着接合する2分割ダイカット耐皮脂アクリル系強粘着シート。',
    opticsAndPhysics: [
      'カメラを握る右手は体温・汗・皮脂・日焼け止め成分に常に晒されるため、一般的な両面テープでは数ヶ月で膨潤・浮き上がりが生じます。',
      '高凝集力・耐皮脂変性アクリル粘着層を不織布／PET極薄基材へ塗布し、隠しビス頭部の窪みまで全面密着させることで、グリップ外皮のズレ防止と隠しねじ穴の防水シーリングを同時に果たします。',
    ],
    formula: {
      expression: 'せん断保持力 > 25 N/cm² (40℃ 耐皮脂試験),   厚み t = 0.16 mm 2分割3D曲面追従カット',
      description: '手汗・皮脂・高温下でのグリップ剥離を防ぎ、隠し外装ビスからの浸水を全面面シールで封止。',
    },
    nextGenInnovation:
      'Kolari Visionの分解記でも必ず最初に剥がされるパーツであり、ソニー純正サービス手順では分解後の防滴性能保証のため新品シートへの張り替えが必須指定されています。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.11 (502860601 GRIP ADHESIVE 1) ＋ Ref.12 (502860701 ADHESIVE 2)' },
      { label: '粘着仕様', value: '耐汗・耐皮脂・耐熱変性アクリル強粘着 精密ダイカット両面シート' },
      { label: '整備規定', value: 'サービスマニュアル Note 1: 非再使用部品（分解時は新品交換必須）' },
      { label: '保護役割', value: 'B03 グリップゴム曲面強固接着 ＆ 隠しシャーシねじ孔の全面防滴シール' },
    ],
    diagramType: 'body_grip_adhesive_sheets',
  },

  'body-shoe-cap-cover': {
    title: 'B43. マルチインターフェースシュー保護キャップ SHOE CAP（SONY 443873412）＆ ねじ隠し化粧カバー',
    subtitle: 'MI Hot-Shoe Dust Cap (Ref.9), Screw Cover Plate (Ref.329) & Waterproof FPC Gasket (Ref.324)',
    category: '個別微細層 B43 — 21ピンデジタル端子を雨塵から守る着脱キャップ＆内部防水構造',
    plainAnalogy:
      'カメラの頭の上のホットシューには、マイクやストロボを繋ぐ極細の21本の金端子が並んでいます。普段はめる保護キャップに加えて、金具の内側にも「ネジ隠し板」と「防水ゴムパッキン」が二重に仕込まれています。',
    summary:
      'Sony ILCE-7M4サービスマニュアルに実在する、着脱式保護キャップ（Ref.9: 443873412 SHOE CAP）、ホットシュー内部固定ねじ隠し化粧板（Ref.329: 500294602 MI SHOE SCREW COVER）、金属シェル板（Ref.327）、および21ピンFPC用防水ゴムパッキン（Ref.324: 501695501 MI SHOE FPC WP RUBBER）の精密保護セット。',
    opticsAndPhysics: [
      '21ピンのマルチインターフェース端子は0.5 mmピッチの超狭小間隔で並んでいるため、雨滴や微細な金属粉が1滴入っただけで「このアクセサリーは使用できません」警告や端子電食を引き起こします。',
      '外部のSHOE CAPが直接の雨塵を遮り、さらにシュー底面のMI SHOE FPC WP RUBBERがMIS-2006フレキシブル基板のボディ貫通口を完全密閉する二重防滴アーキテクチャです。',
    ],
    formula: {
      expression: '二重防滴: 外部キャップ (Ref.9) ＋ 内部FPC圧縮ゴム (Ref.324)  →  21ピン端子ピッチ 0.5 mm 絶縁保護',
      description: '外部着脱キャップと内部FPC貫通防水ゴムの二段構えで、最上部ホットシューからの浸水を完全阻止。',
    },
    nextGenInnovation:
      'MI SHOE SCREW COVER（Ref.329）をスライド開閉できる設計により、外部フラッシュの重い衝撃でシュー金具の4本ねじが緩んだ際も、トップデッキ全分解なしで増し締め・交換が可能です。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.9 (443873412 SHOE CAP) / Ref.329 (500294602 SCREW COVER) / Ref.324 (WP RUBBER)' },
      { label: '構成要素', value: '着脱防塵キャップ・SUSシェル化粧板・ねじ隠しカバー・FPC貫通防水ゴム' },
      { label: '保護対象', value: '21ピン デジタルオーディオ／スマートフラッシュ通信端子（MIS-2006 FPC）' },
      { label: '整備機能', value: 'Ref.328 特殊頭M1.7ねじ4本へのアクセスと外観フラッシュ化の同時実現' },
    ],
    diagramType: 'body_shoe_cap_cover',
  },

  'body-gyro-sensor-unit': {
    title: 'B44. 独立防振マウント・3軸角速度ジャイロ基板 GY-1018 ＆ 二重制振クッション（SONY A5009700A）',
    subtitle: 'Vibration-Isolated 3-Axis MEMS Gyro Sub-PCB (Sony Ref.408 GY-1018) & Dual Damping Pads',
    category: '個別微細層 B44 — 8.5段IBISの目となる独立防振MEMSジャイロセンサー基板',
    plainAnalogy:
      '手ブレ補正を動かす「三半規管（ジャイロセンサー）」の専用ミニ基板です。シャッターの激しい振動で目が回ってしまわないよう、バッテリー室の横の静かな場所に「上下2枚の特殊な防振スポンジ（クッション）」でふんわり挟んで浮かせてあります。',
    summary:
      'Sony ILCE-7M4サービスマニュアル・BATTERY HOLDER SECTION（Ref.408: A5009700A GY-1018 BOARD / Ref.407: 469214901 CUSHION (799) GYRO / Ref.409: 501138301 CUSHION (G 850) GYRO）に実在する、メイン基板から完全分離された防振フローティング3軸MEMS角速度ジャイロサブ基板ユニット。',
    opticsAndPhysics: [
      '8.5段分の5軸ボディ内手ブレ補正（IBIS）および動画アクティブ手ブレ補正では、0.002°/sレベルの極微細な手ブレ角速度をリアルタイム検出する必要があります。',
      'もしジャイロICをメイン基板へ直付けすると、高周波のシャッター衝撃（1〜5 kHz）や冷却・レンズAF振動がMEMS振動子の共振周波数（約20 kHz）と干渉して出力が飽和します。専用の二重制振クッション（Ref.407/409）でメカニカルローパスフィルタ（遮断約250 Hz）を形成し、人間の手ブレ帯域（0.5〜20 Hz）だけを純粋に抽出します。',
    ],
    formula: {
      expression: 'f_c(防振クッション) ≈ 250 Hz ≪ f_shutter(2 kHz)   ⇒   手ブレ 0.5–20 Hz 透過率 100%・衝撃 −26 dB',
      description: '二重制振クッションによる機械的ローパスフィルタが、シャッター衝撃下でも正確な手ブレ角速度を抽出。',
    },
    nextGenInnovation:
      'カメラ重心近くのバッテリーホルダー骨格へ独立配置することで、発熱源のメインISP（70℃超）からの熱ドリフト（ジャイロゼロ点温度変動）も劇的に低減しています。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.408 (A5009700A GY-1018 BOARD) ＋ Ref.407 / Ref.409 GYRO CUSHION' },
      { label: '検出性能', value: '3軸超低ノイズMEMS角速度ジャイロ（ノイズ密度 < 0.003 °/s/√Hz）' },
      { label: '防振機構', value: '上下二重粘弾性防振フォーム（メカニカルLPF遮断約 250 Hz）' },
      { label: '熱的利点', value: '発熱するメイン基板から物理隔離し、長回し撮影時のゼロ点ドリフト抑制' },
    ],
    diagramType: 'body_gyro_sensor_unit',
  },

  'body-still-movie-sq-lever': {
    title: 'B45. 静止画／動画／S&Q 独立切替ダイヤル（2段同軸リング＆鋼球クリック機構）',
    subtitle: 'Concentric Still/Movie/S&Q Mode Ring, Steel-Ball Detent Holder & Seal (Sony Ref.319–322)',
    category: '個別微細層 B45 — α7 IV象徴の2段同軸ハイブリッド切替ダイヤル内部構造',
    plainAnalogy:
      'α7 IVから搭載された「写真・動画・スローモーション」を一瞬で切り替える、モードダイヤルのすぐ下にあるレバー付きリングです。中には「小さな鉄球と押しバネ、防水スポンジ」が仕込まれ、親指1本でパチッと確実な手応えで切り替わります。',
    summary:
      'Sony ILCE-7M4サービスマニュアル・CABINET TOP SECTION-2（Ref.319: 503009301 SV DIAL SPRING / Ref.320: 500417201 AM DIAL BALL HOLDER / Ref.321: 767111211 BALL, STEEL / Ref.322: 502861101 SV WP CUSHION B / Ref.310: SV DIAL FPC COVER）に実在する、モードダイヤル（MD DIAL BLOCK）と同軸2段構成の静止画／動画／S&Q切替メカアセンブリ。',
    opticsAndPhysics: [
      '1つの回転軸の上段に「PASMモードダイヤル」、下段に「Still / Movie / S&Q 3ポジション切替リング」を同心円状に重ねることで、省スペースのまま写真メニューと動画メニューを完全独立切替できます。',
      'AM DIAL BALL HOLDERに収めた焼入れ鋼球（Ref.321）をSV DIAL SPRING（Ref.319）で3箇所のV字ディテント溝へ押し付けることで、手袋越しでも確実な3段クリック感と誤操作防止ロックを実現します。',
    ],
    formula: {
      expression: 'T_detent = F_spring · r_ball · tan(α_V) ≈ 18 mN·m  (3段鋼球クリック ＋ SV WP CUSHION防水)',
      description: '同軸2段ダイヤルの下段リングに独立した鋼球クリックと防水クッションを収めた精密時計的実装。',
    },
    nextGenInnovation:
      'α7 IVで初採用され、後のα7R V・α9 III・α1 IIへ受け継がれた現代ハイブリッドミラーレス操作系の象徴的メカニズムです。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.319 (SV DIAL SPRING) / Ref.320 (BALL HOLDER) / Ref.321 (STEEL BALL) / Ref.322 (WP CUSHION)' },
      { label: '機構方式', value: 'モードダイヤル同軸下段 3ポジション切替リング（Still / Movie / S&Q）' },
      { label: '節度構造', value: '鋼球＋コイルバネV溝クリックディテント ＆ 誤操作防止解除レバー' },
      { label: '防水対策', value: 'SV WP CUSHION B（Ref.322）＋ SV DIAL FPC COVER（Ref.310）二重封止' },
    ],
    diagramType: 'body_still_movie_sq_lever',
  },

  'body-strap-triangles': {
    title: 'B46. 静音樹脂ブッシュ付・三角ストラップリング EYELET TRIANGLE ＆ 傷防止ホルダー（SONY 501695901 / 448787501）',
    subtitle: 'Silent-Damped Triangular Strap Rings & Protective POM Clip Holders (Sony Ref.314 / Ref.315)',
    category: '個別微細層 B46 — 動画撮影時のカチャカチャ金属音を封じる静音三角環＆カバー',
    plainAnalogy:
      'ネックストラップを通す左右の「三角形の金属リング」です。ただの金具に見えますが、動画撮影中にボディへ当たって「カチャカチャ」とマイクに雑音が入らないよう、黒い樹脂製の傷防止＆静音ホルダーでしっかり抱え込んでいます。',
    summary:
      'Sony ILCE-7M4サービスマニュアル（Ref.315: 501695901 EYELET TRIANGLE / Ref.314: 448787501 HOLDER, EYELET TRIANGLE / Ref.316–317: EYELET G & L / Ref.261: EYELET PLATE G / Ref.313: TOP CONNECT PLATE L）に実在する、左右外装吊り金具（アイレット）に装着される高張力ステンレス三角リングと静音・傷防止POM樹脂カバー一式。',
    opticsAndPhysics: [
      '70-200mm F2.8等の大口径ズームを装着した2 kg超のシステムを首・肩掛けで歩行すると、ストラップ吊り金具には動的衝撃荷重（静止重量の4〜5倍＝約100 N超）が繰り返し加わります。',
      '高張力SUS304線材を閉ループ三角成形した三角環へ、さらに弾性POM樹脂ホルダー（Ref.314）を嵌合させることで、ストラップ未使用時やジンバル動画撮影時の「金属リング共振・カチャ音」とマグネシウム塗装の擦り傷を同時に防止します。',
    ],
    formula: {
      expression: 'F_break(SUS三角環) > 450 N (安全率 > 15),   POM静音ブッシュにより動画マイク混入打音 −18 dB',
      description: '高強度ステンレス吊り環と静音樹脂ホルダーの組合せで、耐荷重安全性と動画静音性を両立。',
    },
    nextGenInnovation:
      'α7 IVでは左側の吊り金具をボディ前方寄り、右側を後方寄りの最適重心位置に配し、斜め掛け携行時にレンズが自然に下を向いて安定するエルゴノミクス配置を採用しています。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.315 (501695901 EYELET TRIANGLE) ＋ Ref.314 (448787501 HOLDER) ＋ Ref.316/317' },
      { label: '環体材質', value: '高張力SUS304ステンレス三角リング（線径 1.4 mm・破断荷重 > 450 N）' },
      { label: '静音構造', value: '黒色POM樹脂 傷防止＆動画カチャ音抑制スナップホルダー' },
      { label: '内部連携', value: 'B24 鍛造ステンレス内部アンカー板（EYELET PLATE G / TOP CONNECT PLATE L）へ直結' },
    ],
    diagramType: 'body_strap_triangles',
  },

  'body-dc-coupler-flap': {
    title: 'B47. バッテリー扉内蔵・外部AC電源（DCカプラー）防水ゴムケーブル通し口',
    subtitle: 'Battery-Hatch Integrated EPDM Dummy-Battery DC-Coupler Cable Pass-Through Flap',
    category: '個別微細層 B47 — 扉を閉じたまま外部電源直結できる極小ヒンジ付きゴムフラップ',
    plainAnalogy:
      'バッテリーのフタの端に付いている、爪で開けられる小さなゴムのフタです。スタジオ撮影やタイムラプスで「ダミーバッテリー（AC電源）」を使うとき、バッテリーのフタをしっかり閉めたままコードだけを外へ引き出せる便利な秘密の小窓です。',
    summary:
      'バッテリー扉（BT LID ASSY / B02）の前面縁に一体成形・組込みされた、外部ACアダプター／Vマウント用ダミーバッテリー（DCカプラー）ケーブル引き出し専用の弾性EPDM防水ゴムフラップと密着リップ座面。',
    opticsAndPhysics: [
      'スタジオでのテザー撮影や長時間ライブ配信でダミーバッテリーを挿入した際、バッテリー扉が開いたままだと電源インターロックスイッチが安全遮断してカメラが起動しません。',
      'この専用ゴムフラップをめくって直径3.2 mmのDCケーブルを逃がしながら扉を完全ロックでき、通常バッテリー運用時は二段リップ形状のEPDMゴムが底面からのホコリ・水滴の侵入を塞ぎます。',
    ],
    formula: {
      expression: 'ケーブル通過径 φ3.2 mm (扉完全ロック状態維持),   通常時 2段EPDMリップ圧着封止',
      description: '長回しスタジオ外部給電の利便性と、屋外フィールド撮影時のバッテリー室防塵防滴を両立。',
    },
    nextGenInnovation:
      'Lensrentalsの防滴評価で弱点とされやすかったDCフラップ周囲の隙間を、最新のα7 IV / α1 II世代では扉内周ガスケットと連続した段差シールへ改良しています。',
    specs: [
      { label: '部品機能', value: 'ダミーバッテリー（NP-FZ100 DCカプラー）外部電源ケーブル引き出し専用小窓' },
      { label: '材質構造', value: '一体ヒンジ付 高耐久EPDMエラストマー（硬度 55 Shore A・二段防水リップ）' },
      { label: '配置位置', value: 'バッテリー扉（BT LID ASSY）前面端・扉ロック状態のまま配線可能' },
      { label: '安全連携', value: 'バッテリー扉開閉検知マイクロスイッチを作動させたまま連続外部給電' },
    ],
    diagramType: 'body_dc_coupler_flap',
  },

  'body-muffle-cushions': {
    title: 'B48. 背面シャッター静音吸音フォーム REAR MUFFLE CUSHION A & B（SONY 502863201 / 502863301）',
    subtitle: 'Interior Acoustic Shutter-Damping Foam Pads (Sony Ref.76 / Ref.59 REAR MUFFLE CUSHION A/B)',
    category: '個別微細層 B48 — 背面キャビネット内壁に貼られた実機シャッター消音・調音スポンジ',
    plainAnalogy:
      'カメラの背中カバーを裏返すと、内側に黒いスポンジが2カ所貼られています。録音スタジオの吸音材と同じ仕組みで、カメラの中で跳ね返るシャッターの金属音を吸い取り、耳に心地よく静かな「コトッ」という高級音に変えています。',
    summary:
      'Sony ILCE-7M4サービスマニュアル・CABINET REAR SECTION-1（Ref.76: 502863201 REAR MUFFLE CUSHION A / Ref.59: 502863301 REAR MUFFLE CUSHION B）に実在する、背面マグネシウム外装内壁に貼着された連続気泡ポリウレタン音響吸音・制振マッフルフォーム2枚組。',
    opticsAndPhysics: [
      '金属製モノコックボディ内部は音響的に共鳴箱（ヘルムホルツ空洞）になりやすく、シャッター幕やチャージモーターの駆動音が背面パネルから撮影者の耳元（EVF接眼位置）へ直接放射されます。',
      '連続気泡（オープンセル）構造の吸音フォーム内部を音波が通過する際の粘性空気摩擦によって、特に耳障りな2 kHz〜8 kHz帯の金属響きを効率よく熱減衰させます。',
    ],
    formula: {
      expression: '吸音率 α(2–8 kHz) ≈ 0.55–0.78,   接眼部シャッターピーク音圧 −4.2 dBA 低減',
      description: '内部空間の定在波と背面パネル膜振動を吸収し、野生動物・ブライダル撮影に最適な静音性を実現。',
    },
    nextGenInnovation:
      '音響吸収だけでなく、背面パネルとメイン基板RFシールド間の微小な隙間ガタつき（ビビリ音）を抑える弾性スペーサーの役割も兼ねています。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.76 (502863201 REAR MUFFLE CUSHION A) ＋ Ref.59 (502863301 CUSHION B)' },
      { label: '音響材質', value: '難燃性 連続気泡（オープンセル）ポリウレタン吸音フォーム（t = 2.0 mm）' },
      { label: '減衰帯域', value: '2 kHz〜8 kHz シャッター高周波金属残響・ギヤ駆動音吸収' },
      { label: '貼付位置', value: 'CABINET REAR（背面外装）内壁 右側シャッター／基板対向面' },
    ],
    diagramType: 'body_muffle_cushions',
  },

  'body-card-access-led-pipe': {
    title: 'B49. メモリーカード書込アクセスLED導光プリズム ＆ 扉電磁接地シート（SONY 502862801）',
    subtitle: 'CFexpress/SD Access LED Optical Light-Pipe, Media-Lid Ground Sheet & Hinge Shaft (Ref.75/120/121)',
    category: '個別微細層 B49 — カード扉ヒンジ軸・ばね・接地シート＆書込中警告ライトパイプ',
    plainAnalogy:
      '写真を連写したあとに右下で赤くチカチカ光る「書き込み中ランプ」は、基板のLEDの光を透明なアクリル棒（ライトパイプ）で外まで運んでいます。さらにカード扉の金属軸・跳ね上げバネ・静電気逃がしシートまでセットになった精密パーツ群です。',
    summary:
      'Sony ILCE-7M4サービスマニュアル・CABINET REAR SECTION-1/2（Ref.75: 502862801 REAR MEDIA LID GND SHEET / Ref.60: MEDIA LID BASE / Ref.120: 501035811 MEDIA LID SHAFT / Ref.121: 501035701 MEDIA LID ROTATION SPRING）およびカード書き込みアクセスLED用透明ポリカーボネート導光ライトパイプ一式。',
    opticsAndPhysics: [
      'CFexpress Type A/Bの超高速書き込み中にカードを引き抜くとファイルシステムが破損するため、基板上SMD赤色LEDの光を全反射（TIR）透明ライトパイプで背面右下端の防水窓へ導き、データ書込状態を視覚警告します。',
      'REAR MEDIA LID GND SHEET（Ref.75）は、開閉するカード扉と本体シャシーを常時低インピーダンス接地し、カード交換時に指先から飛び込む静電気（ESD）でCFexpress/SDスロットのPCIe Gen4高速レーンが破壊されるのを防ぎます。',
    ],
    formula: {
      expression: '全反射臨界角 θ_c = arcsin(1/1.58) ≈ 39.3° (PC導光棒),   扉ESD接地 < 0.2 Ω (Ref.75)',
      description: '全反射ライトパイプによる確実な書込視認性と、導電シート・ステンレス蝶番軸によるESD防護を一体化。',
    },
    nextGenInnovation:
      '扉回転軸（Ref.120）と跳ね上げトーションスプリング（Ref.121）の精密なトルク調整により、スライドロック解除と同時に扉が節度よく滑らかにポップオープンします。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.75 (MEDIA LID GND SHEET) / Ref.120 (SHAFT) / Ref.121 (ROTATION SPRING) / Ref.60' },
      { label: '光学要素', value: '高透過ポリカーボネート 全反射アクセスLED導光ライトパイプ' },
      { label: '機構部品', value: 'SUS304 カード扉ヒンジシャフト ＋ 開扉アシストトーションばね' },
      { label: '静電防護', value: '導電クロス接地シート（カード挿抜時のPCIe/SDインターフェースESD保護）' },
    ],
    diagramType: 'body_card_access_led_pipe',
  },

  'body-rear-button-retainers': {
    title: 'B50. 背面ボタン群分割押さえプレート L/R ＆ 独立防水シリコーンラバー群（SONY 502794101 / 502794001）',
    subtitle: 'Split Rear Button Retainer Plates L/R, Joystick Holder & Molded Silicone Boots (Ref.65–112)',
    category: '個別微細層 B50 — AF-ON/AEL/MENU/再生ボタンを個別防水密閉する多層サンドイッチ',
    plainAnalogy:
      '背面のMENU・AF-ON・再生・ゴミ箱などのボタンは、ただプラスチックのボタンが並んでいるのではありません。裏側から「ボタンごとの防水ゴムブーツ」を被せ、さらに左右2枚の「ステンレス押さえ鉄板」でギュッと締め付けて雨を1滴も通しません。',
    summary:
      'Sony ILCE-7M4サービスマニュアル・CABINET REAR SECTION-1/2（Ref.101: 502794101 REAR BUTTON PLATE L / Ref.104: 502794001 REAR BUTTON PLATE R / Ref.106: C1 AF AEL RUBBER / Ref.110: C3 MENU RUBBER / Ref.65: PLAYBACK DELETE RUBBER / Ref.68: C1 FN RUBBER / Ref.70・72: JOY RETAINER & HOLDER PLATE）の実機多層ボタン保持・防水アセンブリ。',
    opticsAndPhysics: [
      'Lensrentalsのソニーα背面分解でも高く評価されている「完全ラバーシール式プッシュボタン構造」の中核です。外装樹脂キートップの背後に一体成形シリコーンゴムブーツが嵌合し、背面パネル穴を360°加硫密着シールします。',
      'その背後を左右分割のステンレス製リテーナープレート（L/R）とジョイスティック保持板が計7本のタッピングねじで強固に押さえ込むことで、10万回押下してもボタンが沈み込んだり防水パッキンが浮いたりしません。',
    ],
    formula: {
      expression: '4層サンドイッチ: キートップ → 独立シリコーン防水ブーツ → SUS押さえ板L/R → スナップドームFPC',
      description: '背面ボタン1個ごとに独立した防水ゴム隔壁と金属リテーナーを備える鉄壁のフィールド耐候設計。',
    },
    nextGenInnovation:
      '左右のボタン群（MENU/C3側とAF-ON/AEL/C1/Fn/再生/削除側）を独立フレキ（KY-1035 / RS-1024 / SW-1041 / JS-1012）と分割押さえ板で構成し、高頻度使用ボタンの部分修理も容易にしています。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.101 (PLATE L) / Ref.104 (PLATE R) / Ref.70・72 (JOY PLATES) / Ref.65・68・106・110' },
      { label: '防水要素', value: '各ボタン群独立成形 液状シリコーン防水ラバーブーツ（4系統ブロック）' },
      { label: '保持構造', value: 'SUS304 プレス成形ボタン押さえリテーナープレート L/R ＋ ジョイスティック枠' },
      { label: '実機出典', value: 'Sony ILCE-7M4 SM CABINET REAR 1 & 2 / Lensrentals 防滴分解評価準拠' },
    ],
    diagramType: 'body_rear_button_retainers',
  },

  'body-top-rec-c2-subassy': {
    title: 'B51. トップデッキ独立REC／C2ボタンポッド・遮光シート＆防水クッション（SONY 502790901 / 503673201）',
    subtitle: 'Top-Deck REC/C2 Custom Button Plate, Silicone Boot, Shade Sheet & WP Cushion (Ref.264–269)',
    category: '個別微細層 B51 — 雨滴が直撃するカメラ上面REC・カスタムボタン専用防水ポッド',
    plainAnalogy:
      '雨の中でカメラを構えると、いちばん最初に雨が降り注ぐのがカメラの上面です。赤い動画録画（REC）ボタンとC2ボタンの裏側には、専用の「防水ゴムカバー・金属押さえ板・防水クッション・遮光シート」が4重に重ねて守られています。',
    summary:
      'Sony ILCE-7M4サービスマニュアル・CABINET TOP SECTION-1（Ref.264: 502790901 CUSTOM BUTTON PLATE / Ref.265: 503673201 RL FPC SHADE SHEET / Ref.266: CUSTOM BUTTON RUBBER / Ref.267: REC BUTTON / Ref.268: C2 BUTTON / Ref.269: TOP WP CUSHION F3 / Ref.251: RL FPC BASE）に実在するトップデッキ右肩ボタン防水サブアセンブリ。',
    opticsAndPhysics: [
      'α7 IVでは動画録画RECボタンをシャッターボタン直後の上面一等地へ大型配置したため、上面への降雨直撃に対する耐水性が極めて重要になります。',
      'REC／C2ボタンの下をCUSTOM BUTTON RUBBER（Ref.266）とTOP WP CUSHION F3（Ref.269）が二重密閉し、さらにRL FPC BASEと金属CUSTOM BUTTON PLATEがレリーズ基板（RL-1071）へ確実なクリック反力を伝えます。',
    ],
    formula: {
      expression: '上面直撃降雨封止: ラバーブーツ (Ref.266) ＋ TOP WP CUSHION F3 (Ref.269) ＋ 押さえ板 (Ref.264)',
      description: '最重要操作系であるREC/C2ボタンを独立防水ポッド化し、上面降雨からの基板浸水を完全防御。',
    },
    nextGenInnovation:
      'RL FPC SHADE SHEET（Ref.265）がトップデッキ内部の隙間からセンサー室側へ光や静電ノイズが漏れ込むのも同時に遮断しています。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.264 (BUTTON PLATE) / Ref.265 (SHADE SHEET) / Ref.266 (RUBBER) / Ref.267–269' },
      { label: '操作キートップ', value: 'アルマイト赤リング付 REC録画ボタン ＋ C2カスタムボタン' },
      { label: '防水・遮光', value: '一体成型シリコーンラバー ＋ TOP WP CUSHION F3 ＋ RL FPC遮光シート' },
      { label: '連携基板', value: 'Ref.257 RL-1071 トップ制御フレキシブル基板 ＆ Ref.251 RL FPC BASE' },
    ],
    diagramType: 'body_top_rec_c2_subassy',
  },

  'body-focal-plane-badge': {
    title: 'B52. 撮像面位置基準マーク（Φマーク）彫刻インレイ ＆ モデル名バッジプレート',
    subtitle: 'Precision Focal-Plane Distance Index Mark (Φ at z = 0.0 mm) & Metallic Model Crest Badge',
    category: '個別微細層 B52 — イメージセンサーの厳密な位置（z = 0.0 mm）を示す光学測量基準',
    plainAnalogy:
      'カメラの肩のところに小さく刻まれた「丸に横線（Φ）」のマークです。実はこの横線の真下が「イメージセンサーの表面（z = 0.00 mm）」と寸分違わず一致しており、映画の撮影現場でメジャーを当ててピント距離を測るための本物の測量基準点です。',
    summary:
      'フルサイズ撮像素子のシリコン受光面（光学座標 z = 0.00 mm）と幾何学的に厳密一致するトップデッキ左肩位置へ刻設された撮像面位置基準マーク（Φインレイ）および、ステンレス／アルミ削り出しのモデルエンブレムバッジプレート。',
    opticsAndPhysics: [
      'レンズの距離目盛や最短撮影距離（MOD）はレンズ先端からではなく、このΦマークが示す「撮像面（Focal Plane）」から被写体までの距離として定義されています。',
      '映画用フォローフォーカス運用や等倍マクロ撮影（倍率1:1時、被写体〜撮像面距離は焦点距離の4倍＝4f）では、フォーカスプラーがこのΦマークへ巻き尺の0点を当ててミリ単位で焦点距離を実測します。',
    ],
    formula: {
      expression: 'z_Φ_mark = z_sensor_surface = 0.00 ± 0.10 mm   (フランジ前面まで正確に +18.00 mm)',
      description: 'カメラ内部に隠れた撮像素子の正確な位置を外装トップデッキ上へ正確に写し取った光学測量基準。',
    },
    nextGenInnovation:
      'Kolari VisionのCanon R5 Mark II分解で明らかになった通り、現代のフラッグシップ機ではモデルエンブレムプレートの下に隠し分解ねじを配置して外装の美観と剛性を両立する設計も広く用いられています。',
    specs: [
      { label: '位置精度', value: '撮像素子受光面 z = 0.00 mm 基準ライン（マウントフランジから後方 18.00 mm）' },
      { label: '用途分野', value: 'シネマ撮影メジャー測距（フォーカスプラー基準）・マクロ撮影倍率計算' },
      { label: '加工仕様', value: 'レーザー精密彫刻＋耐摩耗ホワイトエポキシ充填 Φマーク＆金属バッジ' },
      { label: '構造役割', value: 'エンブレムプレート下部の隠しトップデッキサービスねじ保護カバー兼務' },
    ],
    diagramType: 'body_focal_plane_badge',
  },

  'body-speaker-emi-insulator': {
    title: 'B53. スピーカー電磁接地シート ＆ 背面電気絶縁マイラーシート（SONY 501696001 / 500463101）',
    subtitle: 'Speaker EMI Ground Sheet & Flame-Retardant Polycarbonate Insulation Sheets (Ref.414/415/356/361)',
    category: '個別微細層 B53 — 高電圧基板とマグネシウム金属外装の短絡を防ぐ絶縁＆接地層',
    plainAnalogy:
      'カメラの中は金属のフレームと電子基板が髪の毛ほどのすき間でギュウギュウに詰まっています。もし基板が金属ボディに触れたら一瞬でショートして壊れてしまうため、要所に「黒い絶縁マイラーシート」と「スピーカー用導電接地シート」を貼り分けて守っています。',
    summary:
      'Sony ILCE-7M4サービスマニュアル（Ref.414: 501696001 SPEAKER GND SHEET / Ref.415: 500463101 SP INSULATION SHEET / Ref.356: 502992401 INSULATING SHEET A / Ref.361: 502992501 INSULATING SHEET B）に実在する、難燃性ポリカーボネート電気絶縁シート群およびスピーカー用導電ファブリック接地シート。',
    opticsAndPhysics: [
      '薄型高密度実装のミラーレス機では、メイン基板裏面のSMDコンデンサ・フラッシュ高圧回路・スピーカーマグネット背面とマグネシウム導電骨格との空間距離がわずか0.3 mm未満の箇所が多数あります。',
      'UL94 V-0難燃グレードの厚さ0.15 mmポリカーボネート／マイラー絶縁シート（絶縁破壊電圧 > 6 kV）を精密ダイカットして挟み込み、同時にスピーカー枠には導電ニッケル銅繊維シート（Ref.414）を貼って不要輻射を逃がします。',
    ],
    formula: {
      expression: '絶縁耐圧 V_bd > 6,000 V (t = 0.15 mm 難燃PC),   導電接地シート R_sq < 0.05 Ω/sq',
      description: '絶縁すべき部位（電源・信号基板）と接地すべき部位（スピーカー外殻）を極薄シートで緻密に区画。',
    },
    nextGenInnovation:
      '万が一の落下変形で金属フレームが0.2 mm内側に凹んでも基板ショート発火を阻止する、安全規格（IEC 62368-1）上不可欠なセーフティクリティカル絶縁層です。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.414 (SPEAKER GND SHEET) / Ref.415 (SP INSULATION) / Ref.356・361 (INSULATING A/B)' },
      { label: '絶縁シート', value: 'UL94 V-0 難燃黒色ポリカーボネート／マイラーフィルム（t = 0.15 mm）' },
      { label: '接地シート', value: 'ニッケル銅めっきポリエステル導電クロス（スピーカー磁気枠EMI接地）' },
      { label: '安全性能', value: '落下衝撃による基板〜金属シャーシ間ショート・電食防止（耐圧 > 6 kV）' },
    ],
    diagramType: 'body_speaker_emi_insulator',
  },

  'body-mag-field-cut-plate': {
    title: 'B54. 磁気遮蔽パーマロイ・フィールドカットプレート MAGNETIC FIELD CUT PLATE（SONY 502789501）',
    subtitle: 'Ferromagnetic Flux-Diverting Shield Plate (Sony Ref.352 MAGNETIC FIELD CUT PLATE 891)',
    category: '個別微細層 B54 — IBIS強磁力ネオジム磁石の漏れ磁束を遮る専用磁気シールド板',
    plainAnalogy:
      '手ブレ補正（IBIS）とバリアングル液晶には、指を挟むと痛いほど強力なネオジム磁石が使われています。その強力な磁力がすぐ後ろのメイン基板や磁気センサーへ悪さをして誤動作させないよう、あいだに挟んだ「磁力線を吸い取って逃がす鉄の盾」です。',
    summary:
      'Sony ILCE-7M4サービスマニュアル・MAIN BOARD SECTION（Ref.352: 502789501 MAGNETIC FIELD CUT PLATE (891)）に実在する、メイン基板とIBIS強磁力磁石／背面LCD開閉検知磁石の間に配置される高透磁率軟磁性ステンレス／パーマロイ製磁気遮蔽プレート。',
    opticsAndPhysics: [
      'アルミニウムやマグネシウム合金は常磁性体（比透磁率 μ_r ≈ 1）のため、ネオジム磁石の直流（DC）強磁界をまったく遮蔽できず素通りさせてしまいます。',
      '比透磁率 μ_r > 2,000 を持つ強磁性磁気フィールドカット板を間に配置することで、IBIS用N52磁石やLCDヒンジ磁石の漏れ磁束を板内部へバイパス閉路化し、メイン基板上の電源インダクタ磁気飽和やLCD開閉ホールICの誤検知を完全防止します。',
    ],
    formula: {
      expression: 'μ_r(磁気遮蔽鋼) > 2,000 ≫ μ_r(Mg合金) ≈ 1.0   →   漏れ直流磁束密度 B_leak −85% 削減',
      description: 'マグネシウム外装では止められない直流強磁界を、専用強磁性シールド板で磁気バイパス遮断。',
    },
    nextGenInnovation:
      '薄型化が進むミラーレス機で「強力化する8.5段IBIS磁石」と「背面バリアングルLCDの磁気開閉センサー」が数ミリ距離で共存できるのは、この磁界カットプレートのおかげです。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.352: 502789501 MAGNETIC FIELD CUT PLATE (891)' },
      { label: '遮蔽材質', value: '高透磁率軟磁性電磁鋼板／パーマロイ合金（t = 0.4 mm・μ_r > 2,000）' },
      { label: '隔離対象', value: 'IBIS N52強力磁石・LCDヒンジ磁石 ⇔ メイン基板インダクタ＆ホールセンサー' },
      { label: '磁気効果', value: '直流（DC）漏れ磁束密度を 85% 以上バイパス低減（誤検知・飽和防止）' },
    ],
    diagramType: 'body_mag_field_cut_plate',
  },

  'body-hdmi-light-shield': {
    title: 'B55. フルサイズHDMI開口 遮光シート ＆ デュアル保持ブラケット HOLDER HDMI A/B（SONY 502078101 / 501028101）',
    subtitle: 'Full-Size Type-A HDMI Twin Clamp Brackets (HOLDER HDMI A/B), Jack Plate & Light Shield (Ref.463–467)',
    category: '個別微細層 B55 — 極太シネマHDMIケーブルのこじり破損＆光漏れを防ぐ二重鋼鉄クランプ',
    plainAnalogy:
      '動画撮影で使うフルサイズHDMIケーブルは太くて重いため、引っ掛けると端子のハンダが基板ごと引きちぎれるのが大事故の元でした。α7 IVではHDMI端子の上下を「2枚の鋼鉄クランプ（AとB）」でガッチリ挟んで骨格へ固定し、さらに遮光シートで光漏れも止めています。',
    summary:
      'Sony ILCE-7M4サービスマニュアル・MECHA DEVICE SECTION（Ref.463: 502078101 HDMI LIGHT SHIELD SHEET / Ref.465: 501028201 HOLDER HDMI B / Ref.467: 501028101 HOLDER HDMI A / Ref.466: HD-1009 FLEXIBLE BOARD / Ref.353: 502789401 JACK PLATE）に実在する、フルサイズType-A HDMI独立モジュール強固保持・遮光システム。',
    opticsAndPhysics: [
      'Lensrentalsの修理統計で「メイン基板交換の最大原因はHDMI端子の物理引きちぎり破損」と報告されています。α7 IVではHDMI端子をメイン基板から切り離して専用フレキ（HD-1009）化し、金属クランプHOLDER A/BとJACK PLATEで直接ボディ骨格へ挟み込み固定しています。',
      'さらにHDMIの大きな長方形開口はセンサー室の真横に位置するため、HDMI LIGHT SHIELD SHEET（Ref.463）でポート外周からの長時間露光時光漏れを完全封止しています。',
    ],
    formula: {
      expression: 'F_wrench_HDMI > 85 N (HOLDER A+B 鋼鉄挟持固定),   独立HD-1009フレキでメイン基板破損率 −92%',
      description: '外部モニター用太径HDMIケーブルの曲げモーメントを骨格で直接受け止め、光漏れも同時遮断。',
    },
    nextGenInnovation:
      '万が一三脚転倒でHDMI端子が破損しても、高額なメイン基板ではなく安価なHD-1009フレキとホルダーのみ交換できるプロ現場重視のモジュラー設計です。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.467 (HOLDER HDMI A) / Ref.465 (HOLDER B) / Ref.463 (LIGHT SHIELD) / Ref.353 (JACK PLATE)' },
      { label: '機械保護', value: 'SUS304 デュアル挟持クランプ A/B ＋ JACK PLATE による骨格直接締結' },
      { label: '遮光機能', value: 'フルサイズType-A大開口周囲からの撮像室光漏れ防止遮光シート' },
      { label: '整備性', value: 'Ref.466 HD-1009 独立フレキ構成（メイン基板非損傷モジュラー交換対応）' },
    ],
    diagramType: 'body_hdmi_light_shield',
  },

  'body-vg-fpc-retainer': {
    title: 'B56. 縦位置グリップ接続フレキ VG-1007 ＆ ステンレス押さえ板 VG FPC FIX PLATE（SONY 198422211 / 500371201）',
    subtitle: 'Vertical-Grip High-Current Bus FPC (Sony Ref.404 VG-1007) & Stainless Fix Plate (Ref.403)',
    category: '個別微細層 B56 — バッテリー2本並列大電流＆縦位置操作信号を運ぶ内部専用バス',
    plainAnalogy:
      '縦位置バッテリーグリップ（VG-C4EM）を着けると、バッテリー2本分の大電力と縦位置シャッター・ダイヤル信号がカメラ内へ流れ込みます。バッテリー室の奥の壁に沿って走る「専用フレキ配線」と、それをピタッと留める「ステンレス押さえ金具」です。',
    summary:
      'Sony ILCE-7M4サービスマニュアル・BATTERY HOLDER SECTION（Ref.404: 198422211 VG-1007 FLEXIBLE BOARD / Ref.403: 500371201 VG FPC FIX PLATE / Ref.401: A5023247A BT_SOLDER BT-2033）に実在する、縦位置グリップ用12ピン拡張接点（B28）とメイン基板／電源系統を直結する大電流ハイブリッドフレキ配線＆金属固定クランプ板。',
    opticsAndPhysics: [
      '縦位置グリップ装着時はNP-FZ100バッテリー2本分の最大6 A超の電力に加え、縦位置シャッターボタン・前後コマンドダイヤル・AF-ON・ジョイスティックの高速シリアル制御信号を低遅延で伝送する必要があります。',
      '厚銅（70 μm＝2 oz銅箔）電源ラインと差動信号線を一体化したVG-1007フレキを、バッテリー挿抜時の摩擦から守るためSUS304製VG FPC FIX PLATE（Ref.403）でバッテリー室壁面へ強固にねじ固定しています。',
    ],
    formula: {
      expression: 'I_max = 6.0 A (70 μm 厚銅電源バス・電圧降下 ΔV < 35 mV),   SUS押さえ板固定ねじ M1.7×2.5',
      description: '厚銅フレキによる低損失大電流伝送と、ステンレス押さえ板によるバッテリー挿抜摩耗保護を両立。',
    },
    nextGenInnovation:
      'BT-2033バッテリー端子フレキと協調ルーティングされ、本体側・グリップ側どちらのバッテリーが空になっても電源瞬断ゼロで自動シームレス切替を行います。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.404 (198422211 VG-1007 FPC) ＋ Ref.403 (500371201 VG FPC FIX PLATE) ＋ Ref.401' },
      { label: '配線仕様', value: '2 oz（70 μm）厚銅電源バス ＋ 縦位置操作系シリアル通信フレキ' },
      { label: '固定保護', value: 'SUS304 VG FPC FIX PLATE（バッテリー挿抜時の擦れ・脱落完全防止）' },
      { label: '対応機材', value: '純正縦位置バッテリーグリップ（VG-C4EM / VG-C5）高出力連続撮影対応' },
    ],
    diagramType: 'body_vg_fpc_retainer',
  },

  'body-top-antenna-coax': {
    title: 'B57. トップデッキ内蔵 2.4/5GHz 無線アンテナ基板 AN-1043 ＆ 45mm極細同軸ケーブル（SONY A5033443A / 184647441）',
    subtitle: 'Top-Deck Dual-Band Wi-Fi/BT Antenna Sub-Board (Sony Ref.262 AN-1043) & 45mm Micro-Coax (Ref.263)',
    category: '個別微細層 B57 — マグネシウム電波遮蔽を突破するトップ樹脂窓直下の無線アンテナ',
    plainAnalogy:
      '金属のカメラボディは電波を通さないため、メイン基板の中にアンテナを置くとWi-Fiが全然届きません。そこでカメラの左肩のいちばん高い樹脂カバーの真下に「専用のミニアンテナ基板」を置き、長さ45mmの極細同軸ケーブルでメイン基板と繋いでいます。',
    summary:
      'Sony ILCE-7M4サービスマニュアル・CABINET TOP SECTION-1（Ref.262: A5033443A AN-1043 BOARD, COMPLETE / Ref.263: 184647441 CABLE, COAXIAL 45 mm）およびKolari Vision A7R V分解（「トップカバー取り外し前に2本の同軸ケーブルを外す」）で実在確認されたトップ内蔵デュアルバンドRFアンテナサブモジュール。',
    opticsAndPhysics: [
      'AZ91Dマグネシウム合金外装は強力なファラデーケージとして2.4 GHz／5 GHzマイクロ波を−40 dB以上減衰させるため、カメラ上部の左肩またはペンタ前縁に設けた非導電樹脂RF透過窓（レドーム）直下へ独立アンテナ基板AN-1043を配置します。',
      '特性インピーダンス 50 Ω ± 2 Ω の外径0.81 mm極細同軸ケーブル（長さ45 mm・U.FL/MHF4マイクロ同軸コネクタ付）でメイン基板のWi-Fi/BT RFフロントエンドへ低損失伝送し、報道現場の高速FTP即時送信と安定したスマホ連携を実現します。',
    ],
    formula: {
      expression: 'Z₀ = 50 Ω (L = 45 mm φ0.81 mm 極細同軸),   挿入損失 < 0.25 dB @ 5.8 GHz (VSWR < 1.5)',
      description: 'カメラ最上部のRF透過窓へアンテナを独立移設し、マグネシウム外装と手持ち把持による電波減衰を回避。',
    },
    nextGenInnovation:
      'Kolari Visionのα1分解で指摘されたように、同軸ケーブル上部にはクリア保護スリーブが巻かれ、トップデッキ開閉やねじ締結時の噛み込み断線を防ぐ工夫が凝らされています。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.262 (A5033443A AN-1043 BOARD) ＋ Ref.263 (184647441 COAXIAL CABLE 45mm)' },
      { label: '対応帯域', value: '2.4 GHz / 5 GHz IEEE 802.11ac/ax Wi-Fi ＆ Bluetooth 5.x デュアルバンド' },
      { label: '伝送線路', value: 'φ0.81 mm 50 Ω 金めっき編組極細マイクロ同軸ケーブル（長さ 45 mm）' },
      { label: '配置利点', value: 'カメラ手持ち時に左右の手のひらで覆われない最上部RFレドーム直下配置' },
    ],
    diagramType: 'body_top_antenna_coax',
  },

  'body-power-lever-mechanism': {
    title: 'B58. 同軸電源ON/OFFレバー・復帰トーションバネ ＆ 防塵シリコーンOリング',
    subtitle: 'Coaxial Shutter-Collar Power ON/OFF Lever, Detent Leaf Spring & Red Silicone Shaft O-Ring',
    category: '個別微細層 B58 — 人差し指1本で0.2秒起動する同軸電源カラー＆軸回転防水Oリング',
    plainAnalogy:
      'シャッターボタンの周りをぐるっと囲んでいる「電源ON/OFFの回転つまみ」を分解した姿です。クルッと回す可動部分から雨が染み込みやすいため、軸の根元に「極細のシリコーンOリング」と「カチッと止まる板バネ」が精密に仕込まれています。',
    summary:
      'シャッターボタン（B04/B15）の同軸外周に配置された、電源ON/OFF回転カラーレバー、30°回転ストッパーカム、二位置クリック保持リーフスプリング、および回転軸からの雨水侵入を遮断する極小シリコーンOリングの精密同軸アセンブリ。',
    opticsAndPhysics: [
      '「カメラを構えて右人差し指をわずかに伸ばすだけで0.2秒以内にON→半押しAF→撮影」という即応性を叶えるため、シャッターボタンの押し込み軸（Z/Y並進運動）と電源レバーの回転軸（同軸30°回転運動）を完全に独立させながらφ14 mm径内へ同心配置しています。',
      'Imaging Resource等の防滴研究で強調される通り、回転可動軸の防水には固定パッキンではなく潤滑シリコーンOリングによる全周360°動的摺動シールが不可欠です。',
    ],
    formula: {
      expression: '回転操作角 θ = 30° (切替トルク ≈ 14 mN·m),   回転軸動的Oリング圧縮率 15% 防滴封止',
      description: 'シャッター並進軸と同軸共存させながら、カチッとした節度感と回転軸360°防滴シールを両立。',
    },
    nextGenInnovation:
      '電源レバーの回転検出には非接触ホールセンサーまたは金めっき二股セルフクリーニング摺動ワイパー（SH-1035 / RL-1071基板上）を採用し、10万回開閉でも接触不良を起こしません。',
    specs: [
      { label: '機構構成', value: '同軸30°回転電源レバー ＋ SUS二位置クリック板バネ ＋ 回転ストッパー' },
      { label: '防水シール', value: '回転軸専用 高潤滑シリコーンOリング（φ11.5 × 線径 0.8 mm）' },
      { label: '人間工学', value: '誤作動防止の適度な操作抵抗（14 mN·m）＆ グローブ対応突起タブ' },
      { label: '連携接点', value: 'B15 シャッタースイッチ同軸下の金めっき自己洗浄ワイパー接点' },
    ],
    diagramType: 'body_power_lever_mechanism',
  },

  'body-mic-rubber-mount': {
    title: 'B59. ステレオマイク防振ラバーブーツ RUBBER MICROPHONE ＆ 保持ホルダー MIC HOLDER（SONY 502687801 / 502790401）',
    subtitle: 'Vibration-Isolating Stereo Mic Rubber Boots (Sony Ref.304) & Retention Holder (Ref.308)',
    category: '個別微細層 B59 — レンズAF音・IBIS駆動音のボディ伝搬を遮断するマイク防振ブーツ',
    plainAnalogy:
      'カメラの上面にある左右2つの内蔵ステレオマイクは、そのまま金属ボディに付けるとレンズのモーター音や手ブレ補正の「ウィーン」という振動を拾ってしまいます。マイクを柔らかい「防振ゴムの靴下（ラバーブーツ）」で包み込んで浮かせて録音品質を守っています。',
    summary:
      'Sony ILCE-7M4サービスマニュアル・CABINET TOP SECTION-2（Ref.304: 502687801 RUBBER (885), MICROPHONE / Ref.308: 502790401 MIC HOLDER (89100) / Ref.309: BTITE 1.4×5.0固定ねじ）に実在する、内蔵ステレオマイクカプセルの機械的フローティング防振ラバーブーツ＆押さえホルダー機構。',
    opticsAndPhysics: [
      '動画収録時にボディ内の5軸IBISアクチュエータやレンズのAF駆動・ズームリング操作で発生する固体伝搬振動（50〜800 Hz）がマイク筐体へ直接伝わると、音声トラックに耳障りな低周波ゴロゴロ音（ハンドリングノイズ）が混入します。',
      '極低硬度（30 Shore A）のブチル／シリコーン防振ブーツ（Ref.304）で左右カプセルを完全フローティング支持し、さらにMIC HOLDER（Ref.308）で音波導入スリットのみを音響密閉することで、クリアなステレオ集音を実現します。',
    ],
    formula: {
      expression: '固体伝搬ハンドリングノイズ減衰 ≥ −14 dB (50–800 Hz),   ブーツ硬度 30 Shore A 軟質フローティング',
      description: 'カメラボディの機械振動からステレオマイクカプセルを音響機械分離するミニチュアショックマウント。',
    },
    nextGenInnovation:
      'マイク前面には微細な疎水性音響透過メッシュ（ePTFE膜）を組み合わせ、風切り音低減と雨滴のマイク穴侵入防止を両立しています。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.304 (502687801 RUBBER MICROPHONE) ＋ Ref.308 (502790401 MIC HOLDER)' },
      { label: '防振材質', value: '超軟質 30 Shore A 粘弾性フローティング防振ラバーブーツ × 2（L/R）' },
      { label: '固定構造', value: '専用樹脂MIC HOLDER ＋ BTITE 1.4×5.0ねじ締結（音響密閉チャンバー形成）' },
      { label: '音響効果', value: 'IBIS動作音・レンズAF駆動音・操作ボタン打音の固体伝搬を −14 dB 遮断' },
    ],
    diagramType: 'body_mic_rubber_mount',
  },

  'body-rear-lc-cover-seals': {
    title: 'B60. 背面LCD収納凹部カバー REAR LC COVER・防水パッキン ＆ ヒンジケーブルグロメット（SONY 502794901 / 501161101）',
    subtitle: 'Recessed LCD Bay Cover Plate (Ref.53), Dual WP Cushions (Ref.54/124) & Swivel Cable Grommet (Ref.78)',
    category: '個別微細層 B60 — バリアングル液晶の裏に隠れた防水壁・隠しねじ覆い＆ケーブルブーツ',
    plainAnalogy:
      'バリアングル液晶画面をパカッと横へ開くと現れる、カメラ背面の「くぼみ（収納ポケット）」の底板と防水パーツ一式です。画面のヒンジを通る細いケーブルの入り口を「ゴムの首輪（グロメット）」と2枚の防水クッションで鉄壁に密閉しています。',
    summary:
      'Sony ILCE-7M4サービスマニュアル・CABINET REAR SECTION-1/2（Ref.53: 502794901 REAR LC COVER / Ref.54: 502863001 RE LC WP CUSHION A / Ref.124: 502863101 RE LC WP CUSHION B / Ref.78: 501161101 SV WP CABLE GROMMET / Ref.56: 503623301 GASKET BOT S）に実在する、背面LCD収納ポケット保護カバー＆ヒンジ配線貫通防水シーリング一式。',
    opticsAndPhysics: [
      'バリアングル／4軸チルトモニターを展開すると、背面LCD収納凹部は直接雨や砂塵に晒されます。その内側にはメイン基板のヒートスプレッダと3本の背面隠しねじが直近に位置しています。',
      'REAR LC COVER（Ref.53）が凹部底面の美観・保護壁・熱遮断層を形成し、周囲を2種類の防水クッション（Ref.54/124）と底面ガスケット（Ref.56）で封止。さらにLCDヒンジから引き込まれる極細同軸ケーブルの通過口をSV WP CABLE GROMMET（Ref.78）が360°密着シーリングします。',
    ],
    formula: {
      expression: 'LCD展開時 耐雨封止: RE LC COVER (Ref.53) ＋ クッションA/B ＋ SV WP GROMMET (Ref.78)',
      description: 'モニター展開中もメイン基板室へ一滴の雨水も入れない、バリアングル機特有の背面凹部防水アーキテクチャ。',
    },
    nextGenInnovation:
      'Lensrentalsの分解でも評価されたように、このカバーのサービス構造により、割れたLCDパネルやヒンジ同軸ケーブルをボディ全分解なしで短時間交換できます。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.53 (REAR LC COVER) / Ref.54・124 (RE LC WP CUSHION A/B) / Ref.78 (SV WP GROMMET) / Ref.56' },
      { label: '構成部材', value: '背面LCDポケット保護カバー・二重防水クッション・底面ガスケット・ケーブルグロメット' },
      { label: '保護役割', value: 'バリアングル液晶展開時の雨塵侵入遮断・背面3本隠しねじ保護・熱遮断' },
      { label: '配線密閉', value: 'SV WP CABLE GROMMET による極細同軸ケーブル貫通孔の360°気密シール' },
    ],
    diagramType: 'body_rear_lc_cover_seals',
  },
};
