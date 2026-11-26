import { PartExplanation } from '../types';

/**
 * Phase 34A — Japanese Scientific Explanations for Ultra-HD Mount Parts M61–M80:
 *  - M61–M70: Sony OEM ILCE-7M4 Service Manual MB N FRAME & MECHA DEVICE Hardware
 *  - M71–M75: Front Mount-Surround Sensors, Controls & Structural Interfaces
 *  - M76–M80: E-Mount 10/12-Pin Electrical Physical Layer & Protocol Conditioning
 */
export const MOUNT_ULTRA34_EXPLANATIONS_A: Record<string, PartExplanation> = {
  'mount-sp755-contact-clip': {
    title: 'M61. Sony純正 MB SP (755), N 接点ホルダ無隙間プリロード板バネクリップ',
    subtitle: 'Sony OEM MB SP (755), N (442466701 / Ref.559) Zero-Gap Contact Holder Retention Spring',
    category: 'マウント層 M61 — サービスマニュアル指定・接点ブロック浮きゼロ拘束',
    plainAnalogy:
      'レンズ接点ユニットをマウント内壁にピタッと押し付け続ける「専用の金属ヘアピン」です。整備マニュアルに「隙間なく取り付けること」と明記されるほど、わずかなガタつきすら許さない縁の下の留め具です。',
    summary:
      'Sony ILCE-7M4/7M2公式サービスマニュアルのMB N FRAME UNIT（Ref.559／部品番号 442466701）に記載される専用ステンレス板バネ。MB N HOLDER A/Bの位置決めボスへ無隙間で嵌合し、接点ブロックへ一定方向の予圧を与えます。',
    opticsAndPhysics: [
      '10〜12本のポゴピンがレンズ側フラットパッドを総計3〜5 Nの反力で押し返す際、接点ホルダ側がわずかに後退・傾倒するとピン接触抵抗が増大し、高速AF通信エラーの原因になります。',
      'SUS301-CSP（バネ用ステンレス）製の3本指プリロード舌片でホルダ背面を常時弾性押圧することで、振動・温度変化下でも接点高さ公差 ±0.03 mm以内を維持します。',
    ],
    formula: {
      expression: 'F_preload = 3 · k_leaf · δ ≥ 6.5 N  >  ΣF_pogo (≈ 4.2 N)',
      description: '接点ポゴピン全体の反力を上回る予圧を板バネクリップで常時付与し、接点ホルダの後退・マイクロフレッティングを防止。',
    },
    nextGenInnovation:
      '分解整備時に1枚でも付け忘れたり隙間が空いたりすると接点不良を招くため、現行αシリーズではボス嵌合ハトメ付きの誤組防止形状が採用されています。',
    specs: [
      { label: 'Sony純正品番', value: 'MB SP (755), N（部品番号 442466701 / Ref.559）' },
      { label: '材質・板厚', value: 'SUS301-CSP ばね用ステンレス鋼（t ≈ 0.25–0.30 mm）' },
      { label: '整備規定', value: 'MB N HOLDER ボスへ「隙間ゼロ（Attach without a gap）」嵌合' },
      { label: '機能役割', value: '接点ホルダ背面予圧・ポゴピン反力受け・振動ガタ吸収' },
    ],
    diagramType: 'mount_sp755_contact_clip',
  },

  'mount-plate-a-5300-ring': {
    title: 'M62. Sony純正 MB N PLATE A (5300) バヨネット裏当て補強＆高精度内輪',
    subtitle: 'Sony OEM MB N PLATE A (5300) (468819002 / Ref.553) Inner Bayonet Reinforcement Ring',
    category: 'マウント層 M62 — 6点締結せん断剛性補強・バヨネット内径裏当て輪',
    plainAnalogy:
      '表のステンレスマウントリングとマグネシウム本体の間に挟まれた「頑丈な金属の中敷きリング」です。重い望遠レンズのテコの力を広く受け止め、本体の変形を防ぎます。',
    summary:
      'Sony ILCE-7M4公式サービスマニュアル MB N FRAME UNIT（Ref.553／部品番号 468819002）の主要金属プレート。外周フランジ（M01）の裏側を全面支持し、2本のダウエルピン穴と6本のビス穴で強固な積層サンドイッチ構造を形成します。',
    opticsAndPhysics: [
      '単一のフランジ板だけでは望遠レンズ装着時の曲げモーメント M = W·L によってボルト間に局所的なたわみが生じ、フランジバック（18.000 mm）の面振れを引き起こします。',
      '高剛性SUS304裏当て内輪（PLATE A）をダウエルピン（MB N PIN (H)）で高精度位置決めして重ねることで、面外曲げ剛性 EI を大幅に向上させると同時に、内周3箇所のステップ座でラジアル遊びを抑制します。',
    ],
    formula: {
      expression: 'D_sandwich = E·(h₁³ + h₂³)/12 + E·A·d²   （積層断面二次モーメント増強）',
      description: 'フランジ表板と裏当て内輪を6本ボルト＋ダウエルピンで強結することで、単板比で曲げ剛性と平面安定性を大幅に引き上げる。',
    },
    nextGenInnovation:
      'α7 II世代以降の強化6点Eマウントでは、この裏当てリングと背面ナットリング（M24）でマグネシウム隔壁を挟み込む「3層サンドイッチ剛体化」が標準化されました。',
    specs: [
      { label: 'Sony純正品番', value: 'MB N PLATE A (5300)（部品番号 468819002 / Ref.553）' },
      { label: '位置決め基準', value: '6× 締結ボルト貫通穴 ＋ 2× 高精度ダウエルピン基準穴' },
      { label: '内周補強座', value: '120°等配 3箇所ステップ型ラジアル座面' },
      { label: '材質・仕上げ', value: 'SUS304 精密プレス＋平面ラップ研磨仕上げ' },
    ],
    diagramType: 'mount_plate_a_5300_ring',
  },

  'mount-lens-lock-holder-3000': {
    title: 'M63. Sony純正 HOLDER, LENS LOCK (3000) ロックピン案内カートリッジブロック',
    subtitle: 'Sony OEM HOLDER, LENS LOCK (3000) (448435701) Precision Lock-Pin Guide Cartridge',
    category: 'マウント層 M63 — レンズロック軸受・バネポケット一体成形ハウジング',
    plainAnalogy:
      'レンズをカチッと固定するロックピンが斜めに傾いたり引っ掛かったりしないように、ピンと戻しバネを丸ごと抱え込む「専用のガイド筒カートリッジ」です。',
    summary:
      'Sony Eマウント各機種のサービスマニュアルに規定されるロック機構コア部品（部品番号 448435701）。ロックピン（M08）・戻しコイルバネ・解除ボタン連動部を一体アライメント保持する自己潤滑POM/LCP精密案内ブロックです。',
    opticsAndPhysics: [
      'レンズ装着時、ロックピンは毎秒数十回の着脱衝撃とバヨネット回転方向からの横剪断力を受けます。案内長 L とピン径 d のアスペクト比 L/d > 1.8 を確保しないと、ピンが孔内でこじれて固着（スティック現象）を起こします。',
      '焼結含油ブロンズ内筒を備えたPOM精密カートリッジでピン軸を長く直線支持することで、-10℃〜+40℃の全温度域で軽く節度ある「カチッ」としたロック操作感を維持します。',
    ],
    formula: {
      expression: 'L_guide / d_pin ≥ 1.85   ＆   μ_POM/SUS ≈ 0.12（こじれ限界条件 μ·(2e/L) < 1）',
      description: '十分な軸受案内長と低摩擦POM/含油青銅ライナーにより、偏心押圧時のスティック（引っ掛かり）を物理的に排除。',
    },
    nextGenInnovation:
      '防塵防滴の現行世代では、カートリッジ背面にダストキャップを備えてロックピン孔からの砂塵侵入を二重にブロックする構造へ進化しています。',
    specs: [
      { label: 'Sony純正品番', value: 'HOLDER, LENS LOCK (3000)（部品番号 448435701）' },
      { label: 'ハウジング材質', value: '低摩擦ガラス強化 POM / LCP 精密射出成形＋含油青銅スリーブ' },
      { label: '固定方式', value: '上下ツインフランジ耳＋ M1.4 ステンレス小ねじ2本締結' },
      { label: '内蔵機能', value: 'ロックピン直線案内・戻しバネ収納ポケット・防塵背面キャップ' },
    ],
    diagramType: 'mount_lens_lock_holder_3000',
  },

  'mount-cushion-sheet-5400': {
    title: 'M64. Sony純正 MB CUSHION SHEET (5400) 防滴・制振マウント周囲クッションシート',
    subtitle: 'Sony OEM MB CUSHION SHEET (5400) (472900201 / Ref.459) Perimeter Acoustic & Weather Seal',
    category: 'マウント層 M64 — フロント外装境界・防塵防滴＆シャッター音減衰シート',
    plainAnalogy:
      'マウントとカメラ前カバーの継ぎ目をぐるっと一周ふさぐ「極薄の高性能スポンジ枠」です。雨や砂ぼこりの侵入を防ぎつつ、シャッターの振動音もやさしく吸収します。',
    summary:
      'Sony ILCE-7M4公式サービスマニュアル MECHA DEVICE SECTION（Ref.459／部品番号 472900201）に採用される精密型抜きPORON／EPDMマイクロセル・クッションシート。マウントボックス前面とフロント外装（CABINET F ASSY）の間を気密・制振シールします。',
    opticsAndPhysics: [
      'マグネシウム製マウントボックスと前面キャビネットの合わせ目には、製造公差による 0.1〜0.3 mm の微小間隙が生じます。ここを無対策で放置すると、雨滴の毛細管侵入や高周波シャッター振動音の共振漏れが発生します。',
      '圧縮永久歪みが極めて小さい高密度マイクロセルウレタン（PORON）を圧縮率 25〜35% で挟み込むことで、長期にわたる防滴シールと音響ダンピングを両立します。',
    ],
    formula: {
      expression: 'ε_comp = (t₀ − t_gap) / t₀ ≈ 0.30   →   反発シール面圧 P_seal ≈ 25–45 kPa',
      description: '30%前後の最適圧縮率で長期間へたらない弾性シール面圧を保ち、水滴侵入と外装ビビリ音を同時に抑止。',
    },
    nextGenInnovation:
      'α7 IV／α9 III世代ではレンズ解除ボタン周囲まで一体型抜きした複雑な輪郭シートとアクリル系感圧粘着（PSA）裏打ちで組立気密性を飛躍的に高めています。',
    specs: [
      { label: 'Sony純正品番', value: 'MB CUSHION SHEET (5400)（部品番号 472900201 / Ref.459）' },
      { label: 'シート材質', value: '高密度マイクロセルウレタン（PORON）＋ アクリル系PSA粘着層' },
      { label: '適用境界', value: 'マウントボックス前面〜フロントキャビネット（解除ボタン周囲含む）' },
      { label: '設計厚・圧縮率', value: '公称 t ≈ 0.7 mm（組込時圧縮率 25〜35%）' },
    ],
    diagramType: 'mount_cushion_sheet_5400',
  },

  'mount-graphite-heat-top': {
    title: 'M65. Sony純正 MB GRAPHITE SHEET TOP A (5800) ＆ AS HEAT PLATE TOP 放熱積層',
    subtitle: 'Sony OEM MB GRAPHITE SHEET TOP A (500490202) & AS HEAT PLATE TOP (474824101) Thermal Stack',
    category: 'マウント層 M65 — 4K60p長時間録画・マウント上部ヒートスプレッダ熱輸送',
    plainAnalogy:
      '動画撮影で熱くなったカメラ内部の熱を、銅の10倍も速く熱を運ぶ「黒いスーパーシート（グラファイト）」でマウント天井からボディ上部の金属フレームへ一気に逃がす放熱ロードです。',
    summary:
      'Sony ILCE-7M4公式サービスマニュアル MECHA DEVICE SECTION に連続記載される放熱3層スタック：AS HEAT PLT SPACER TOP（503058201 / Ref.470）、AS HEAT PLATE TOP（474824101 / Ref.453）、MB GRAPHITE SHEET TOP A（500490202 / Ref.454）。',
    opticsAndPhysics: [
      '4K 60p 10-bit動画の連続収録時、イメージセンサーとBIONZ XRおよびレンズ側XDモーターから発生する熱がマウントボックス上部に滞留すると、フランジ周辺の温度勾配によりピントの熱ドリフトが生じます。',
      '面内熱伝導率 k_∥ ≈ 1500〜1600 W/(m·K)（純銅の約4倍）を誇る人造熱分解グラファイトシートを金属ヒートプレートとTIMスペーサーに積層し、熱を素早くボディ外殻へ拡散・均熱化します。',
    ],
    formula: {
      expression: 'q_∥ = −k_graphite · A · (∂T/∂x),   k_∥ ≈ 1600 W/(m·K)  ≫  k_Mg ≈ 72 W/(m·K)',
      description: 'マグネシウム筐体の約22倍の面内熱伝導率で局所ホットスポットを即座に均熱化し、長時間動画録画と光学安定性を両立。',
    },
    nextGenInnovation:
      'α7 IVのΣ型グラファイト放熱設計と連動し、ファンレス小型フルサイズ機でありながら1時間超の4K連続撮影を可能にした熱マネージメントの中核部品です。',
    specs: [
      { label: 'Sony純正品番①', value: 'MB GRAPHITE SHEET TOP A (5800)（500490202 / Ref.454）' },
      { label: 'Sony純正品番②', value: 'AS HEAT PLATE TOP (5800)（474824101 / Ref.453）' },
      { label: 'Sony純正品番③', value: 'AS HEAT PLT SPACER TOP（503058201 / Ref.470）' },
      { label: '面内熱伝導率', value: '熱分解グラファイト層 k_∥ ≈ 1500–1600 W/(m·K)' },
    ],
    diagramType: 'mount_graphite_heat_top',
  },

  'mount-ch-floating-shaft': {
    title: 'M66. Sony純正 MB CH FLOATING SHAFT (5600) シャッターチャージ防振フローティング軸',
    subtitle: 'Sony OEM MB CH FLOATING SHAFT (5600) (474837101 / Ref.457) Floating Anti-Vib Mount',
    category: 'マウント層 M66 — マウント〜シャッター駆動間の機械振動アイソレーション',
    plainAnalogy:
      '連写のたびに勢いよく回るシャッター巻き上げモーターのブルブル振動が、レンズマウントやセンサーへ伝わって写真が微ブレしないよう、ゴムのハンモックで浮かせて支える「防振ピン軸」です。',
    summary:
      'Sony ILCE-7M4公式サービスマニュアル MECHA DEVICE SECTION（Ref.457／部品番号 474837101）の防振支持軸。マウントボックス側面へブチルゴムグロメットと含油ブロンズカラーを介してシャッターチャージユニット（Ref.458）をフローティング懸架します。',
    opticsAndPhysics: [
      'メカシャッター連写時、巻き上げDCモーターと減速ギア列が 100〜600 Hz の周期振動と衝撃パルスを発生します。これをマウントボックスへ剛結すると、超望遠レンズや高画素センサー（61MP）で「微ブレ（シャッターショック）」として解像度が低下します。',
      '高減衰ブチルゴム（損失係数 tan δ ≈ 0.35）を介した段付きフローティング軸で固有振動数 f_n を低く設定し、高周波加振力の伝達率 T_r を −15 dB以上遮断します。',
    ],
    formula: {
      expression: 'T_r = √[ (1 + (2ζr)²) / ((1 − r²)² + (2ζr)²) ]  ≪  1   (r = f / f_n > √2)',
      description: 'ブチル防振グロメットの粘弾性減衰により、チャージモーター由来の衝撃・高周波振動がマウント光学面へ伝わるのを絶縁。',
    },
    nextGenInnovation:
      'α7R IV／α7 IV以降の低振動シャッターシステムでは、シャッター本体だけでなくチャージユニット側も独立フローティング化する二段防振が徹底されています。',
    specs: [
      { label: 'Sony純正品番', value: 'MB CH FLOATING SHAFT (5600)（部品番号 474837101 / Ref.457）' },
      { label: '構成要素', value: 'SUS303段付き軸 × 2 ＋ 高減衰ブチルグロメット ＋ 含油青銅カラー' },
      { label: '振動絶縁対象', value: 'MB CHARGE UNIT（Ref.458）巻き上げ衝撃・ギア噛み合い振動' },
      { label: '保持構造', value: 'Eリング止め輪 ＋ ステンレス連結ブリッジプレート' },
    ],
    diagramType: 'mount_ch_floating_shaft',
  },

  'mount-imager-fix-shafts': {
    title: 'M67. Sony純正 IM IMAGER FIX SHAFT (5300) 撮像素子直結3点締結シャフト（再使用不可）',
    subtitle: 'Sony OEM IM IMAGER FIX SHAFT (5300) (459775001 / Ref.501, Non-Reusable 3x)',
    category: 'マウント層 M67 — マウント基準柱〜IBIS撮像素子ユニット直結・単回使用ボルト',
    plainAnalogy:
      'レンズマウントとイメージセンサーを「18.000 mm」の精密距離でガッチリ繋ぐ3本の命綱ボルトです。一度外すとネジ緩み止めと微細伸びの精度が変わるため、整備時は必ず新品交換する使い切り設計です。',
    summary:
      'Sony ILCE-7M4公式サービスマニュアル ANTI SHAKE UNIT SECTION（Ref.501／部品番号 459775001）に「Note 1: Once removed, discard and replace with new」と明記される非再使用型3点撮像素子締結シャフト。',
    opticsAndPhysics: [
      'マウント背面3点データム柱（M53）とIBISユニットを締結するこの3本のシャフトは、調整ワッシャー（IM ADJUST WASHER D）の厚みを正確に保持し、センサー面の光軸直交度（片ボケ防止）を数μmオーダーで決定します。',
      '軸部にくびれを持つ精密トルク管理シャフトと塗布済みマイクロカプセル嫌気性ネジロック剤により、落下衝撃や温度サイクルでも軸力低下ゼロを保証するため、一度緩めた部品の再使用が禁止されています。',
    ],
    formula: {
      expression: 'F_clamp = T / (K · d)   ＆   Δz_tilt = (ΔL₁ − ΔL₂) · (W_sensor / D_pillar) < 2 μm',
      description: '3本均等の軸力管理と新品ネジロック剤の確定摩擦係数 K により、36×24 mm全面でのマイクロメートル級平面度を維持。',
    },
    nextGenInnovation:
      '工場組立ラインでは3軸同時サーボドライバで軸力と角度を全数ログ記録し、サービス修理時は必ず新品3本＋光学コリメータ調整が必須とされています。',
    specs: [
      { label: 'Sony純正品番', value: 'IM IMAGER FIX SHAFT (5300)（459775001 / Ref.501 × 3本）' },
      { label: '整備重要規定', value: '再使用不可（Non-Reusable：取り外し後は必ず新品交換）' },
      { label: '配置ジオメトリ', value: '120°等配 3点（90° / 210° / 330°・PCD φ65.6 mm）' },
      { label: '緩み止め仕様', value: 'プリコート嫌気性ネジロック帯 ＋ 精密段付きトルク基準軸' },
    ],
    diagramType: 'mount_imager_fix_shafts',
  },

  'mount-mag-field-cut-plate': {
    title: 'M68. Sony純正 MAGNETIC FIELD CUT PLATE (891) 高透磁率パーマロイ磁気遮蔽板',
    subtitle: 'Sony OEM MAGNETIC FIELD CUT PLATE (891) (502789501 / Ref.352) Permalloy Flux Shield',
    category: 'マウント層 M68 — IBIS／XDモーター強磁界バイパス・高精度磁気シールド',
    plainAnalogy:
      '手ブレ補正やレンズの強力なネオジム磁石から漏れる見えない磁力線を、磁石を吸い寄せる特別な金属の壁（パーマロイ）で横へぐるっと迂回させ、電子回路や地磁気・ホール素子への悪影響を防ぐバリアです。',
    summary:
      'Sony ILCE-7M4公式サービスマニュアル MAIN BOARD SECTION（Ref.352／部品番号 502789501）に配置される高透磁率磁気遮蔽プレート。マウント後方のIBIS強力磁石やレンズ側XDリニアモーターからの漏洩磁束を捕捉・迂回します。',
    opticsAndPhysics: [
      'レンズ内4基のXDリニアモーターとボディ内5軸IBISのN52ネオジム磁石は、マウント境界付近で数十mT級の強い静磁界・変動磁界を放射します。これが近傍のホール位置センサー、電子コンパス、電源インダクタへ到達すると誤測位や磁気飽和ノイズを招きます。',
      '比透磁率 μ_r > 10,000 を持つニッケル鉄合金（PCパーマロイ／ミューメタル系）の磁気抵抗 R_m = L/(μA) は空気の数万分の1であるため、漏洩磁束を選択的に板内へ吸い込んで安全な閉ループへ逃がします。',
    ],
    formula: {
      expression: 'S_mag ≈ 1 + (μ_r · t) / (2 · R)   (μ_r ≈ 10⁴–10⁵ → 漏洩磁束 −26 dB以上減衰)',
      description: '高い比透磁率 μ_r による磁気シャント効果で、隣接するIBISホール素子やメイン基板回路を強磁界干渉から保護。',
    },
    nextGenInnovation:
      '大推力XDリニアモーターと8段IBISが15 mm以内で隣り合う最新ミラーレスでは、こうした薄型パーマロイ磁気カット板の配置がAF/IBIS協調精度の生命線になっています。',
    specs: [
      { label: 'Sony純正品番', value: 'MAGNETIC FIELD CUT PLATE (891)（502789501 / Ref.352）' },
      { label: '遮蔽材質', value: '高透磁率パーマロイ / 軟磁性ニッケル鉄合金（t ≈ 0.5 mm）' },
      { label: '遮蔽対象', value: 'レンズXDモーター ＆ 5軸IBIS N52ネオジム磁石からの漏洩磁束' },
      { label: '接地構造', value: '四隅BeCu接地コンタクトタブによる筐体等電位ボンディング' },
    ],
    diagramType: 'mount_mag_field_cut_plate',
  },

  'mount-hdmi-light-shield': {
    title: 'M69. Sony純正 HDMI LIGHT SHIELD SHEET (850) ＆ MB RING SHEET 側面遮光迷路シート',
    subtitle: 'Sony OEM HDMI LIGHT SHIELD SHEET (850) (502078101 / Ref.463) & MB RING SHEET',
    category: 'マウント層 M69 — 長時間露光・側面I/O端子開口からの迷光リーク完全遮断',
    plainAnalogy:
      '星空の30秒長時間露光や高ISO撮影のとき、カメラ横のHDMI端子のすき間から忍び込むごくわずかな外光を、真っ黒な折り紙のような光の迷路シートで完全に吸い取って封じ込める暗幕パーツです。',
    summary:
      'Sony ILCE-7M4公式サービスマニュアル MECHA DEVICE SECTION（Ref.463／部品番号 502078101）の側面遮光シートおよび内輪リングシート。フルサイズHDMI・USB-C端子群とマウント光路室の境界に潜む微小な光漏れ経路を断ちます。',
    opticsAndPhysics: [
      '天体撮影（ISO 6400・30秒〜数分露光）やND1000使用時、有効結像光の100万分の1程度の微小迷光であっても、ボディ側面I/O端子カバーの隙間から撮像室へ回り込むと画面端が紫〜赤にカブる「ライトリーク」が発生します。',
      '光学濃度 OD > 5.0（透過率 0.001%未満）のカーボン分散マットブラック遮光フィルムをL字／コの字の折り返しラビリンス構造で貼り巡らし、さらに内輪リングシートでバヨネット裏の回り込み光も二重遮断します。',
    ],
    formula: {
      expression: 'T_leak = 10^(−OD) < 10⁻⁵  (OD ≥ 5.0)   ＋   ラビリンス多重反射減衰 R^n < 10⁻⁷',
      description: '高光学濃度フィルムと折り返しラビリンスの多重吸収により、極限の暗所長時間露光でも光線カブリをゼロ化。',
    },
    nextGenInnovation:
      '外部モニター収録でHDMI端子カバーを開けっ放しにするプロ動画現場でも、マウント側へ一筋の外光も漏らさないための必須シネマ対応ディテールです。',
    specs: [
      { label: 'Sony純正品番', value: 'HDMI LIGHT SHIELD SHEET (850)（502078101 / Ref.463）' },
      { label: '補助遮光部品', value: 'MB RING SHEET（内周I/O側アーク遮光フィルム）' },
      { label: '光学遮光性能', value: '光学濃度 OD ≥ 5.0（可視〜近赤外域 透過率 < 0.001%）' },
      { label: '配置境界', value: 'マウントボックス −X 側面（フルサイズHDMI / USB-C端子隣接壁）' },
    ],
    diagramType: 'mount_hdmi_light_shield',
  },

  'mount-cabinet-potting-seal': {
    title: 'M70. Sony純正 CABINET F ASSY 防水ポッティング樹脂＆前面マウント防塵カラーシール',
    subtitle: 'Sony OEM CABINET F ASSY Waterproof Potted Collar Seal (Ref.469)',
    category: 'マウント層 M70 — 工場防水ポッティング処理・前面キャビネット開口全周シール',
    plainAnalogy:
      '雨の中で撮影してもマウントの周りやレンズ取り外しボタンのフチから水が浸み込まないよう、カメラの前面パネルとマウントの境界に工場で密着成形された「防水コーキングリング」です。',
    summary:
      'Sony ILCE-7M4公式サービスマニュアル MECHA DEVICE SECTION に「WATERPROOF POTTED COMPONENTS」（Ref.469）として注記されるフロント外装〜マウント外周部の防水ポッティング＆一体成形リップカラーシール。',
    opticsAndPhysics: [
      'レンズ側のマウントゴムシーリング（M03）がフランジ前面を封じても、フランジ外周とカメラ前面外装（CABINET F）の境界やレンズ解除ボタン開口の縁に隙間があれば、雨滴が重力で筐体内部へ浸入します。',
      '二段リップを持つEPDM／液状シリコーン樹脂ポッティングカラーをマウント外径 φ69.3〜76.2 mmおよび解除ボタン周囲へ連続一体成形し、毛細管現象による水引き込みを根本遮断します。',
    ],
    formula: {
      expression: 'ΔP_capillary = (2 γ cos θ) / h  →  疎水二段リップ(θ > 95°)で負圧浸水を反転阻止',
      description: '撥水エラストマーの二段リップ断面とポッティング樹脂充填により、雨天・飛沫下での外装継ぎ目浸水を遮断。',
    },
    nextGenInnovation:
      '近年のα7 IV／α9 III／α1 IIでは、サービスマニュアル上でも「防水ポッティング部品」として専用管理され、交換時の防水性能再現性が厳格化されています。',
    specs: [
      { label: 'サービスマニュアル分類', value: 'WATERPROOF POTTED COMPONENTS（Ref.469 / CABINET F 境界）' },
      { label: 'シール範囲', value: 'マウント外周カラー（φ69.3–76.2 mm）＋ レンズ解除ボタン開口一体ブリッジ' },
      { label: 'シール構造', value: '前後デュアルリップビード ＋ 工場ポッティング防水エラストマー' },
      { label: '対象環境', value: '雨天・雪・海浜飛沫・砂塵環境でのプロフェッショナル防塵防滴' },
    ],
    diagramType: 'mount_cabinet_potting_seal',
  },

  'mount-vl-ir-awb-sensor': {
    title: 'M71. 前面 可視光＋赤外線（RGB+IR）ホワイトバランス＆フリッカー検知センサー',
    subtitle: 'Front Visible-Light + IR Ambient Spectral AWB & Flicker Sensor Module (α7R V / α9 III / α1 II)',
    category: 'マウント層 M71 — マウント左上前面・AIホワイトバランス＆LEDフリッカー計測窓',
    plainAnalogy:
      'マウントのすぐ横についた「光の色と点滅を見抜く小さな目」です。室内灯や日陰、LED看板のちらつきを撮像素子とは別に直接測り、人物の肌色を自然で正確に整えます。',
    summary:
      'α7R V・α9 III・α1 IIでマウント左上（AF補助光窓の隣）に新設された独立型の可視光（RGB）＋近赤外（IR）環境光センサーモジュール。コサイン拡散ドームとIR透過窓を介して光源スペクトルと高周波フリッカーをリアルタイム測定します。',
    opticsAndPhysics: [
      '従来の撮像素子のみによるオートホワイトバランス（AWB）は、緑の芝生や赤い壁など「被写体自体の色」と「照明の色温度」の区別に迷いやすく、特に蛍光灯・LED・日陰のミックス光下で色被りが生じました。',
      'マウント前面のPTFEコサイン拡散窓から環境光のR/G/B/Clear＋IR（850 nm帯）比率を独立計測することで、太陽光（IR豊富）とLED照明（IR欠如）を即座に判別し、さらに高周波サンプリングでスタジアムLEDのフリッカー周期も検知します。',
    ],
    formula: {
      expression: 'Ratio_IR/Vis = I(850nm) / I(550nm)  →  太陽光(高IR) vs LED(低IR) を高精度分離',
      description: '可視RGB比に加えて近赤外比率を同時計測し、AI処理ユニットと連携して日陰・人工光下のAWB精度を劇的に改善。',
    },
    nextGenInnovation:
      'α7R Vで初導入されα9 III・α1 IIへ展開された最新世代の前面マウント脇センサーであり、ディープラーニングAWBとアンチフリッカー撮影の精度を支える重要デバイスです。',
    specs: [
      { label: '搭載世代', value: 'Sony α7R V / α9 III / α1 II 前面マウント左上フランジ脇' },
      { label: '光学窓構成', value: '可視RGB用 PTFEコサイン拡散ドーム ＋ 近赤外バンドパス窓' },
      { label: '受光素子', value: 'マルチチャネル RGB+Clear+IR シリコンフォトダイオード QFN' },
      { label: '応用機能', value: 'AIホワイトバランス光源推定・高周波LEDフリッカー検知' },
    ],
    diagramType: 'mount_vl_ir_awb_sensor',
  },

  'mount-front-c5-button': {
    title: 'M72. マウント右側面 C5スピードブースト／絞り込みカスタムボタン機構',
    subtitle: 'Front Mount-Flank C5 Speed-Boost / DOF-Preview Custom Tactile Button (α9 III / α1 II)',
    category: 'マウント層 M72 — グリップ中指直下・即時連写ブースト＆防滴タクトスイッチ',
    plainAnalogy:
      'カメラを構えた右手の中指が自然に当たるマウント横に設けられた「ターボスイッチ」です。普段の連写中にグッと押し込むだけで、決定的な瞬間だけ一気に120コマ/秒へ加速できます。',
    summary:
      'α9 III・α1 II（およびNikon Z9のFn1/Fn2等）でマウント右側面グリップ谷間に新設された前面カスタムボタン（C5）アセンブリ。CNCアルミキャップ、波形シリコーン防滴ブーツ、高耐久ステンレスドームスイッチとリジッドフレキ基板で構成されます。',
    opticsAndPhysics: [
      'スポーツ・野鳥撮影では構図とシャッター半押しを保ったまま一瞬で連写速度ブーストやプリ撮影、被写界深度プレビューを切り替えたい要求が強く、グリップを握る中指・薬指の自然な可動域（マウント右側面）への配置が人間工学的に最適です。',
      'マウント直近の狭い空間に収めるため、作動ストローク 0.35 mm・作動力 2.4 N の高クリック感ステンレスメタルドームと薄型蛇腹シリコーン防滴ブーツを組み合わせ、50万回以上の押下耐久とIPX相当防滴を両立しています。',
    ],
    formula: {
      expression: 'Click Ratio = (F_peak − F_bottom) / F_peak ≈ 0.45   (F_peak ≈ 2.4 N, ストローク 0.35 mm)',
      description: '手袋着用時でも明確な操作フィードバックを返すスナップ比設計により、ファインダーから目を離さず誤操作なく即時起動。',
    },
    nextGenInnovation:
      'グローバルシャッター機α9 IIIの象徴機能「連写速度ブースト（C5）」のために新設された前面マウント脇インターフェースで、フラッグシップα1 IIにも継承されました。',
    specs: [
      { label: '配置位置', value: 'マウント右側面グリップ谷間（右手の中指・薬指エルゴノミクス位置）' },
      { label: 'スイッチ素子', value: '高耐久ステンレス・スナップドームスイッチ（作動力 2.4 N / 50万回）' },
      { label: '防滴・保護', value: '蛇腹シリコーン防水ブーツ ＋ ESD保護ダイオード搭載サブPCB' },
      { label: '主要割当機能', value: '連写速度ブースト（30→120fps）・プリ撮影・絞り込みプレビュー' },
    ],
    diagramType: 'mount_front_c5_button',
  },

  'mount-ir-remote-window': {
    title: 'M73. 前面マウント横 940 nm 赤外線ワイヤレスリモコン受光窓＆復調モジュール',
    subtitle: 'Front 940 nm IR Wireless Remote Receiver Window & 38 kHz Demodulator Module',
    category: 'マウント層 M73 — 可視光遮断・940 nm近赤外バンドパス受光＆EMI遮蔽缶',
    plainAnalogy:
      'テレビのリモコンと同じ見えない赤外線信号を正面から受け取る「真っ黒な小窓」です。普通の光は通さず赤外線だけを通す特殊レンズの裏に、雑音を取り除く専用ICが収まっています。',
    summary:
      'α7シリーズのフロントグリップ〜マウント右肩部に組み込まれる 940 nm 近赤外線リモコン受光ユニット。可視光を遮断する暗赤色アクリル光学窓、EPDM防滴ガスケット、38 kHz搬送波復調PINフォトダイオードIC、およびEMIシールド缶で構成されます。',
    opticsAndPhysics: [
      '屋外の強い直射日光下では、リモコンの微弱な赤外線パルスよりも数千倍強い環境光が受光窓へ入射します。可視光カット・940 nm透過アクリル窓で不要波長を除去した上で、内部のAGC（自動利得制御）＋ 38 kHz バンドパスフィルタでリモコン変調信号のみを抽出します。',
      'マウント内の高速AF通信やBIONZクロックからの電磁雑音が受光増幅段へ飛び込まないよう、金属製ファラデーシールド缶で背面を完全包囲しています。',
    ],
    formula: {
      expression: 'λ_pass = 940 ± 30 nm   ＆   f_carrier = 38.0 kHz (SNR向上のため狭帯域同期検波)',
      description: '光学波長フィルタと38 kHz電気的バンドパス復調の二重選択により、晴天屋外でも確実な非接触リモートレリーズを実現。',
    },
    nextGenInnovation:
      'Bluetoothリモコン（RMT-P1BT）が主流になった現在でも、スタジオの複数台一斉レリーズや赤外線トリガー互換性のためにマウント前面受光モジュールの実装工学は重要な基準となっています。',
    specs: [
      { label: '光学窓特性', value: '可視光遮断・940 nm 近赤外バンドパス成形アクリルレンズ' },
      { label: '復調IC仕様', value: 'PINフォトダイオード ＋ 38 kHz バンドパスAGC復調パッケージ' },
      { label: 'ノイズ対策', value: '背面プレスEMIシールド缶 ＋ EPDMフラッシュ防滴シール' },
      { label: '用途', value: '無振動長時間露光・天体バルブ撮影・スタジオ多灯／多機同期レリーズ' },
    ],
    diagramType: 'mount_ir_remote_window',
  },

  'mount-focal-plane-datum': {
    title: 'M74. 像面基準マーク（Φ）連動データムブリッジ＆シネマ巻尺フック台座',
    subtitle: 'Focal-Plane Index (Φ) Structural Datum Bridge & Cine Tape-Measure Hook Anchor',
    category: 'マウント層 M74 — フランジ面〜撮像面 18.000 mm 幾何基準＆シネマ測距フック',
    plainAnalogy:
      'カメラ上部にある「〇に横棒（Φ）」のセンサー位置マークとマウント面を正確に18.000 mmで結び付ける「金属のものさし橋」です。映画撮影ではここに巻尺を引っ掛けてピント距離をミリ単位で測ります。',
    summary:
      'レンズマウント前面（Z = +18.000 mm基準）からイメージセンサー撮像面（Z = 0.000 mm）への幾何学的基準をボディ上面の像面マーク（Φ）およびシネマ用巻尺フック（FX9 / BURANO等）へ転写する低熱膨張データムブリッジ。',
    opticsAndPhysics: [
      'レンズの距離目盛り（最短撮影距離やシネレンズのフィート／メートル指標）は、レンズ先端ではなく「イメージセンサー撮像面（Φマーク）」からの厳密な距離で定義されています。',
      '大口径シネレンズ（T1.4等）の被写界深度は数mmしかなく、1st AC（フォーカスプラー）が像面フックに巻尺（または超音波／LiDAR測距器）を掛けて被写体距離を実測する際、マウントフランジとフックピン間の機械的基準誤差がそのままピンボケに直結します。',
    ],
    formula: {
      expression: 'Z_flange − Z_Φ = FFD_E = 18.000 ± 0.005 mm   →   実測距離 D_obj = D_tape',
      description: 'マウントフランジ面から撮像面までの18.000 mm基準をボディ外装のΦ指標・巻尺ピンへ高精度に幾何転写。',
    },
    nextGenInnovation:
      'Sony FX9・BURANO・VENICEなどのCinema Line機では、この像面データム台座に着脱式ステンレス巻尺フックやLiDAR測距ブラケット基準穴が直接統合されています。',
    specs: [
      { label: '基準距離', value: 'フランジ面〜撮像面（Φ）間 18.000 mm 精密データム転写' },
      { label: '構造材質', value: '低熱膨張合金基準バー ＋ SUS303 機械加工巻尺フックピン' },
      { label: '対応実務', value: 'シネマ1st AC巻尺測距・FIZワイヤレスフォローフォーカスキャリブレーション' },
      { label: '基準表示', value: 'ボディ上面 Φ（撮像面基準）マーク直下構造直結' },
    ],
    diagramType: 'mount_focal_plane_datum',
  },

  'mount-cine-support-bosses': {
    title: 'M75. 超望遠・シネマ用 フロントマウント両翼補強M4/1/4-20サポートボス＆タイバー',
    subtitle: 'Heavy-Telephoto & Cinema Cage Dual-Point Auxiliary Support Bosses & Shear Tie-Bar',
    category: 'マウント層 M75 — 超重量レンズ片持ちモーメント直受け・ケージ／ロッド剛結座',
    plainAnalogy:
      '何キロもある巨大なシネマズームや超望遠レンズを支えるとき、マウントの根元にかかる凄まじい折れ曲がり力を左右の頑丈なネジ穴と金属バーで三脚やリグへ逃がす「助っ人フレーム」です。',
    summary:
      'マウントボックス左右下部（±X翼）にチタン製ねじインサートと回り止めピン穴を備え、下部ステンレス剪断タイバーで左右を結ぶ重荷重サポート構造。リグケージや15 mmロッド・レンズサポートとマウント隔壁を直結します。',
    opticsAndPhysics: [
      '400mm F2.8・600mm F4やシネマズーム（質量 3〜5 kg・重心距離 180 mm）を装着すると、マウント根元には 5〜9 N·m の大きな片持ち曲げモーメントと振動衝撃が作用します。',
      'ボディ底面の三脚穴1点だけで支えると、マウントと底板間のマグネシウム枠が弾性変形して微小チルトが生じますが、マウント両翼の補助ボスと下部剪断タイバーを介してケージ／ロッドへ直接荷重をバイパスすることで、マウント面変形を 1/5 以下へ低減します。',
    ],
    formula: {
      expression: 'M_cantilever = m·g·L_cg  →  両翼サポート分担率 η ≈ 78% でフランジ微小チルト Δθ < 5″',
      description: '重量級レンズの片持ち荷重をマウント隔壁直近で外部サポートへバイパスし、光軸傾きとバヨネット疲労を防止。',
    },
    nextGenInnovation:
      'FX3 / FX30 / FX6 / BURANOやプロ用リグ対応スチル機では、マウント直近の複数点ねじ座＋回り止めピンによる「ゼロツイスト剛結」がプロ動画制作の必須要件となっています。',
    specs: [
      { label: '補助ねじ座', value: '左右両翼 チタン製 1/4-20 / M4 インサート ＋ ARRI規格回り止めピン穴' },
      { label: '下部連結', value: 'CNC加工 SUS304 剪断タイバー（左右マウント耳剛結）' },
      { label: '許容片持ち荷重', value: '超望遠・シネマズーム 5 kg超の長時間リグ運用に対応' },
      { label: '効果', value: 'マウント隔壁弾性たわみ −80% ＆ フォローフォーカス歯飛び防止' },
    ],
    diagramType: 'mount_cine_support_bosses',
  },

  'mount-mbb-contact-metallurgy': {
    title: 'M76. 10/12ピン段差 Make-Before-Break 接点プロファイル＆ Au-Co/Pd-Ni 多層めっき冶金',
    subtitle: '10/12-Pin Stepped Make-Before-Break Contact Profile & Au-Co / Pd-Ni Plating Metallurgy',
    category: 'マウント層 M76 — 活線着脱アーク防止・GND先行接触＆5万回耐摩耗多層めっき',
    plainAnalogy:
      '電源を入れたままレンズを交換しても火花（ショート）が飛ばない秘密です。実は10本の金ピンはわずかに長さが違い、必ず「アース（GND）」が最初に触れて最後に離れるよう計算された段差になっています。',
    summary:
      'Sony Eマウント実測プロトコル解析（10ピン電気物理層）に基づく段差接触（Make-Before-Break）設計と3層金属めっき構造。GND（Pin 1/3）が最長で最初に導通し、LENS_XDETECT（Pin 10）が最短で最後に導通・最初に遮断されます。',
    opticsAndPhysics: [
      '電源ONのままレンズを回転装着する際、GNDより先に 5.0V/7.4V のLENS_POWER（Pin 2）や信号線が接触すると、浮遊電位差によるラッチアップやマイクロアーク放電で接点表面が黒化・焼損します。',
      'Pin 1/3（GND）を +0.5 mm 突出させて先行接地し、Pin 10（LENS_XDETECT）を −0.35 mm 引っ込めることで、取り外し時は必ず Pin 10 が最初に離れてボディが瞬時にLENS_POWERを遮断（ホットスワップ保護）します。表面はCuBe2母材上に 2.0 μm ニッケル拡散障壁層＋ 0.8 μm コバルト硬化金（Au-Co, 硬度 160–200 HV）を重ねて銅拡散腐食と摩耗を防ぎます。',
    ],
    formula: {
      expression: 'Z_mate: Pin 1,3 (GND) > Pin 2,5 (PWR/VCC) > Pin 4,6–9 (VD/UART) > Pin 10 (XDETECT)',
      description: '段差接触シーケンスにより、着脱時のアーク放電・ラッチアップを物理的に防止し、接触抵抗 R_c < 15 mΩ を長期維持。',
    },
    nextGenInnovation:
      '高頻度着脱に耐えるPd-Ni（パラジウム・ニッケル）下地＋フラッシュAu-Co硬化金めっきにより、海浜塩害や汗の微粒子下でも極めて低い接触抵抗を維持します。',
    specs: [
      { label: '接触順序設計', value: 'GND(Pin 1,3) 先行接触 → 電源/信号 → LENS_XDETECT(Pin 10) 最終接触' },
      { label: 'めっき3層構造', value: 'CuBe2母材 / Ni拡散防止層(2.0 μm) / Au-Co硬化金(0.8 μm, ~180 HV)' },
      { label: '接触抵抗仕様', value: '初期 R_c < 10 mΩ（5万回摺動後も < 25 mΩ維持）' },
      { label: '先端形状', value: '自己清浄（マイクロワイプ）曲面クラウンドーム先端' },
    ],
    diagramType: 'mount_mbb_contact_metallurgy',
  },

  'mount-lens-power-pmic': {
    title: 'M77. Pin 2 LENS_POWER（5.0 V / 7.4 V VBAT切替）昇降圧PMIC＆ソフトスタート制御段',
    subtitle: 'Pin 2 LENS_POWER (5.0V / 7.4V VBAT Dual-Rail) Switching PMIC & Soft-Start Stage',
    category: 'マウント層 M77 — 4基XDリニアモーター大電力供給・突入電流＆短絡保護回路',
    plainAnalogy:
      'レンズに電気を送る「賢い変電所」です。普段のレンズには5V、大型望遠の爆速モーターが全力疾走するときはバッテリー直結クラスの7.4Vへ自動で切り替えて大パワーを送りつつ、異常時は0.001秒で遮断します。',
    summary:
      'Eマウント Pin 2（LENS_POWER）へ給電する専用デュアルレール電力制御段。通常駆動時の安定化 5.0 V レールと、大口径XDリニアモーター／パワーズーム用の 7.4 V VBAT高電力レールをシームレス切替し、10 mΩシャント抵抗とソフトスタート制御で突入電流を制限します。',
    opticsAndPhysics: [
      'レンズ装着直後、レンズ内の大容量デカップリングコンデンサ（数十〜数百μF）は完全に空（0 V）のため、いきなり電源を繋ぐと十数Aの突入電流（インラッシュ）が流れてカメラ本体が電圧降下リセットしてしまいます。',
      '専用PMICがゲートスルーレート制御によるソフトスタート（立上り数ms）で緩やかに充電し、さらに 10 mΩ 高精度シャント抵抗で常時電流監視して短絡や過電流をマイクロ秒オーダーで遮断します。',
    ],
    formula: {
      expression: 'I_inrush = C_lens · (dV/dt) ≤ 1.5 A   ＆   V_Pin2 ∈ { 0 V (OFF), 5.0 V (Std), 7.4 V (VBAT) }',
      description: '立上り勾配 dV/dt のソフトスタート制御と二段階電圧切替により、本体電圧ドロップなしで大推力レンズを安全駆動。',
    },
    nextGenInnovation:
      '2024–2026年の4基XDリニアモーター＋120fps追従AFレンズでは、ピーク電力 15〜20 W級の瞬発パルス電流を電圧変動 ±2%以内で供給できる同期スイッチングPMICが不可欠です。',
    specs: [
      { label: '対応ピン', value: 'Eマウント Pin 2（LENS_POWER）＆ Pin 1/3（大電流リターンGND）' },
      { label: '出力レール切替', value: '5.0 V 安定化出力 ⇔ 7.4 V VBAT高電力モード動的切替' },
      { label: '電流検出素子', value: '10 mΩ 低TCR精密合金シャント抵抗 ＋ 2.2 μH シールドインダクタ' },
      { label: '保護機能', value: 'ソフトスタート突入制限・過電流遮断・逆流防止・過熱シャットダウン' },
    ],
    diagramType: 'mount_lens_power_pmic',
  },

  'mount-vd-sync-uart-phy': {
    title: 'M78. Pin 4 BODY_VD_LENS（60–240 Hz同期）＆ 3.15 V 1.5 Mbaud 双方向UARTトランシーバ',
    subtitle: 'Pin 4 BODY_VD_LENS Frame-Sync Driver & 3.15V 1.5Mbaud CS-Framed UART PHY',
    category: 'マウント層 M78 — 実測Eマウント通信物理層・フレーム同期＆AF/IBIS超低遅延リンク',
    plainAnalogy:
      'カメラとレンズの間で毎秒150万回もの「ピント合わせ・手ブレ補正・絞り指令」を正確にやり取りする専用通訳チップと、毎秒60〜240回の「せーの！」合図を送るメトロノーム回路です。',
    summary:
      'Sony Eマウント実測リバースエンジニアリングで解明された通信物理層を担う専用フロントエンドIC群。Pin 5（LOGIC_VCC = 3.15 V低雑音LDO）、Pin 4（BODY_VD_LENS 垂直フレーム同期パルス）、および Pin 6–9（TXD/RXD/BODY_CS/LENS_CS）の 750 kbaud→1.5 Mbaud CSフレームUART駆動段を構成します。',
    opticsAndPhysics: [
      '起動直後のEマウント通信は 750 kbaud（8N1・CSチップセレクト区切り）で初期化シーケンス（0x01→0x07→…→0x3B光学補正テーブル読出し）を行い、ネゴシエーション完了後に倍速 1.5 Mbaud の高速動作へ移行します。',
      'Pin 4 の BODY_VD_LENS はイメージセンサーの露光フレーム周期と厳密同期したハードウェア割り込みパルス（60 Hz / 120 Hz / 240 Hz）をレンズMCUへ直送し、AF測距結果・レンズ手ブレ補正（OSS）とボディ5軸IBISの協調演算遅延をサブミリ秒に封じ込めます。',
    ],
    formula: {
      expression: 'f_UART: 750 kbaud → 1.5 Mbaud (8N1, CS-framed)   ＆   f_VD = 60 / 120 / 240 Hz 同期',
      description: 'ハードウェアVD同期パルスと3.15 V低ジッタUARTトランシーバにより、120コマ/秒AFとシンクロISの厳密な時間整合を実現。',
    },
    nextGenInnovation:
      'α7 IV FW 6.02以降のブリージング補正・ダイナミックアクティブ手ブレ補正では、0x3Bページ転送による光学歪曲・焦点距離変化プロファイルの高速同期が鍵を握ります。',
    specs: [
      { label: 'ロジック電源', value: 'Pin 5 LOGIC_VCC = 3.15 V 超低雑音LDOレギュレータ' },
      { label: 'フレーム同期線', value: 'Pin 4 BODY_VD_LENS（60 / 120 / 240 Hz ハードウェア垂直同期）' },
      { label: '双方向通信仕様', value: 'Pin 6–9（BODY_CS / LENS_CS / TXD / RXD）750k → 1.5 Mbaud UART' },
      { label: '整合回路', value: '33 Ω / 100 Ω 精密ダンピング抵抗アレイ ＋ ESDクランプ保護' },
    ],
    diagramType: 'mount_vd_sync_uart_phy',
  },

  'mount-xdetect-bridge': {
    title: 'M79. Pin 10 LENS_XDETECT（0 Ω純正／680 Ωアダプター識別）抵抗ブリッジ＆判定回路',
    subtitle: 'Pin 10 LENS_XDETECT (0 Ω Native vs 680 Ω Adapter) Resistance Sensing Bridge',
    category: 'マウント層 M79 — 純正レンズ／電子マウントアダプター自動判別＆ウェイクキャッシュ制御',
    plainAnalogy:
      '10番目のピンにつながった「電気抵抗の検問所」です。抵抗がほぼ0Ωなら純正Eマウントレンズ、約680ΩならLA-EA5などのマウントアダプター、無限大ならレンズ未装着だと一瞬で見分けて最適な起動手順を選びます。',
    summary:
      'Eマウント最右端の Pin 10（LENS_XDETECT）に接続される精密抵抗分圧ブリッジとウィンドウコンパレータ回路。着脱検知だけでなく、ネイティブEレンズ（0 Ω接地）と電子アダプター（680 Ωプルダウン）の識別、および脱着時のレンズキャッシュリセットを担います。',
    opticsAndPhysics: [
      '実測解析によれば、ボディは Pin 10 を 3.15 V へプルアップして分圧電位を常時監視しています。純正レンズ装着時は Pin 10 が内部で直接 GND へ落ちて 0 V（0 Ω）、電子アダプター経由時は約 680 Ω を介して中間電位となり、ボディ側ファームウェアの通信プロトコル分岐（位相差AFモードやAマウント駆動制御等）を自動で切り替えます。',
      'また、レンズを少し回して Pin 10 が一瞬でもオープン（High）になると、ボディは「レンズ交換発生」と即断して 0x01 完全再初期化フラグを立て、旧レンズの光学補正キャッシュ残留を防ぎます。',
    ],
    formula: {
      expression: 'V_det = 3.15 V · R_lens / (R_pu + R_lens)  ⇒  0 Ω (純正) / 680 Ω (アダプター) / ∞ (未装着)',
      description: '0.1%精度の薄膜抵抗ブリッジとウィンドウ比較器で3状態を誤判定ゼロで弁別し、安全な電源投入・高速復帰を制御。',
    },
    nextGenInnovation:
      'スリープ復帰時の高速起動（キャッシュ利用）と、レンズ交換時の確実な0x01フルハンドシェイク再実行を両立させる、Eマウント特有の賢い物理層ステートマシン入口です。',
    specs: [
      { label: '検出対象ピン', value: 'Eマウント Pin 10（LENS_XDETECT・最短段差ピン）' },
      { label: '識別抵抗閾値', value: '≈ 0 Ω（純正Eレンズ） / ≈ 680 Ω（電子アダプター） / Open（未装着）' },
      { label: '回路構成', value: '0.1% 薄膜分圧抵抗ブリッジ ＋ SOT-23 ウィンドウコンパレータ ＋ ESD TVS' },
      { label: '連動動作', value: 'LENS_POWER投入許可・光学補正キャッシュ消去・0x01再初期化トリガ' },
    ],
    diagramType: 'mount_xdetect_bridge',
  },

  'mount-zif-mainboard-conn': {
    title: 'M80. メイン基板側 16ピン 0.3 mmピッチ バックフリップZIFマウントバスコネクタ',
    subtitle: 'Mainboard-Side 16-Pin 0.3mm-Pitch Back-Flip ZIF Mount-Bus Connector & EMI Pad',
    category: 'マウント層 M80 — SY-1122メイン基板終端・極細ピッチ無挿抜力ロックコネクタ',
    plainAnalogy:
      'マウント接点から伸びてきた薄いオレンジ色のケーブル（BL-FPC）を、カメラの頭脳であるメイン基板へ傷つけずにパチンと挟み込んで繋ぐ、髪の毛3本分の間隔の超精密クリップ端子です。',
    summary:
      'Sony SY-1122メイン基板上において、マウント接点ハーネス（BL-FPC）を終端する 0.3 mm ピッチ・16ピン極薄バックフリップZIF（Zero Insertion Force）コネクタ。アイボリーLCP樹脂ボディ、黒色背面フリップロックレバー、両端ステンレス固定タブ、導電Ni-Cu EMIフォームで構成されます。',
    opticsAndPhysics: [
      '0.3 mm ピッチという極微細間隔のフレキを無理に差し込むと金メッキ電極がめくれて接触不良を起こすため、背面ヒンジ式の「バックフリップ・アクチュエータ」を採用し、挿抜力ゼロで位置決めした後にカムレバーを倒して全16極へ均一な接圧を与えます。',
      '両端のステンレスホールドダウン金具でハンダ剥離を防ぎつつ、コネクタ直下の導電Ni-Cuフォームで高速UART信号のリターン電流経路を最短接地し、BIONZ XR周辺へのEMI輻射を抑えます。',
    ],
    formula: {
      expression: 'Pitch p = 0.30 mm (千鳥2列実装 0.60 mm)   ＆   F_insert ≈ 0 N → F_lock ≈ 0.45 N/pin',
      description: 'ゼロ挿抜力とカム式均一加圧により、薄型0.2 mmフレキの繰返し整備着脱でも高い電気的信頼性を維持。',
    },
    nextGenInnovation:
      'ILCE-7M3/7M4サービスマニュアルでも「バックフリップロックの破損注意」と強調される最精密実装部品で、千鳥配列リードによりはんだブリッジ不良を極小化しています。',
    specs: [
      { label: '極数・ピッチ', value: '16極・0.30 mm 超狭ピッチ（前後千鳥2列はんだリード配列）' },
      { label: 'ロック機構', value: '背面ヒンジ型バックフリップ PPSアクチュエータ（ZIF無挿抜力構造）' },
      { label: 'ハウジング・接点', value: '耐熱アイボリーLCP樹脂 ＋ 金メッキリン青銅デュアル接点' },
      { label: 'EMI・補強対策', value: '両端ステンレス基板固定耳 ＋ 底面 導電Ni-Cu EMIガスケット' },
    ],
    diagramType: 'mount_zif_mainboard_conn',
  },
};
