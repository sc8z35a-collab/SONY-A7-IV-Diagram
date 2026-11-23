import { PartExplanation } from '../types';

/**
 * Phase 13 Standalone-Only Ultra-Micro Dissection Explanations for the 55mm Lens Mount (M27–M42).
 * Grounded in Sony ILCE-7M4/7M4K Service Manual (MB N FRAME UNIT / SELECTION PARTS),
 * Sony ILCE-7SM2 Level 2 SM, and US10831084B2 / US4637704A bayonet mount patents.
 */
export const MOUNT_MICRO_EXPLANATIONS: Record<string, PartExplanation> = {
  'mount-cinnabar-ring': {
    title: 'M27. シナバー（αオレンジ）化粧ベゼルリング ＆ マウント外周段差トリム環',
    subtitle: 'Signature Anodized Cinnabar Aluminum Mount Accent Bezel & Gap-Masking Trim Collar',
    category: '個別微細層 M27 — マウント外周アルマイト装飾環＆防塵段差トリム',
    plainAnalogy:
      'αシリーズを正面から見たときに光るオレンジ色の輪っかです。ただの飾りではなく、銀色のステンレスマウントと黒いマグネシウム外装の「すき間」をぴったり塞いで水滴やホコリの侵入を防ぐ、精度の高いアルミの化粧リングです。',
    summary:
      'ステンレスバヨネットフランジ（M01）の外周段差に精密嵌合する、硬質アルマイト染色（シナバー／カッパーオレンジ）CNC削り出しアルミニウム化粧ベゼルリング。フロント外装シェル開口縁とのクリアランスを0.1 mm以下に均一化し、毛細管現象による雨水侵入を抑制します。',
    opticsAndPhysics: [
      'マグネシウム鋳造フロント外装の開口公差（±0.15 mm）と、高精度旋盤加工されたステンレスフランジ（±0.01 mm）の異材質境界を、弾性圧入されたアルミトリム環で美しく橋渡しします。',
      '外周に設けた微細テーパー段差が、レンズ側マウントゴムガスケット外縁とラビリンス（迷路）構造を形成し、正面からの飛沫を直接内部へ到達させません。',
    ],
    formula: {
      expression: 'r_trim = 34.4–36.2 mm,   界面クリアランス δ ≤ 0.10 mm  (A6061 硬質アルマイト膜厚 15 μm)',
      description: '異種金属境界の段差と隙間を精密閉塞し、外観アイコン性と防滴ラビリンス性能を両立。',
    },
    nextGenInnovation:
      '単なる塗装ではなく15 μmの硬質陽極酸化（アルマイト）皮膜に染料を封孔しているため、数万回のレンズ着脱でレンズ後端が擦れても退色・剥離しにくい耐摩耗性を持ちます。',
    specs: [
      { label: '材質・表面', value: 'A6061-T6 CNC旋盤アルミ ＋ 硬質アルマイト（シナバーオレンジ）' },
      { label: '装着位置', value: 'M01 ステンレスフランジ外周段差（R = 34.4–36.2 mm）' },
      { label: '防滴役割', value: '外装開口〜フランジ間の隙間閉塞・外周ラビリンス前段形成' },
      { label: '実機出典', value: 'Sony α7 IV (ILCE-7M4) / α1 II CABINET F マウントベゼル構造' },
    ],
    diagramType: 'mount_cinnabar_ring',
  },

  'mount-index-inlay': {
    title: 'M28. 白色セラミック樹脂マウント装着指標インレイ ＆ 精密圧入カラー',
    subtitle: 'High-Contrast Ceramic-Polymer Lens Mounting Index Stud & Anti-Rotation Press Sleeve',
    category: '個別微細層 M28 — 暗所レンズ装着基準点・別体圧入指標ピン',
    plainAnalogy:
      'レンズをはめるときの目印になる「白い丸ポチ」です。ペンキで塗っただけではレンズと擦れてすぐ消えてしまうため、真っ白な硬い樹脂ピンをステンレスの穴にギュッと打ち込んで絶対に消えないように作られています。',
    summary:
      'ステンレスフランジ（M01）上部の精密座ぐり孔に背面から圧入・かしめ固定された、高視認性セラミック充填白色ポリマー製マウント装着指標インレイと回り止めDカットスリーブ。',
    opticsAndPhysics: [
      '塗装や印刷マークは数千回のバヨネット着脱で摩耗・剥離しますが、深さ1.8 mmの貫通ソリッドインレイ構造により、表面がわずかに擦れても一生涯くっきりとした視認性を保ちます。',
      '表面高さをフランジ基準面より 0.08 mm だけわずかに高く（または指先で触覚識別可能な微細ドーム形状に）成形することで、真っ暗な夜間撮影でも指先の触覚だけでレンズ装着位置を探り当てられます。',
    ],
    formula: {
      expression: 'φ_stud = 2.20 mm (圧入締代 +18 μm),   視認コントラスト比 > 18:1 (暗所触覚識別対応)',
      description: 'ステンレス母材への締まりばめ圧入により、摩耗・溶剤・極寒環境でも剥落ゼロを実現。',
    },
    nextGenInnovation:
      'プロ機の一部では蓄光顔料または微弱LEDバックライト導光を組み合わせ、暗室・天体撮影時のブラインドレンズ交換を高速化する設計も展開されています。',
    specs: [
      { label: '構造方式', value: 'ソリッド白色セラミック樹脂スタッド（背面フランジ付Dカット圧入）' },
      { label: '配置角度', value: 'マウント上部装着基準角（レンズ側指標と0.2°以内で一致）' },
      { label: '耐摩耗性', value: '貫通ソリッド材のため塗装剥がれ・溶剤劣化ゼロ' },
      { label: '実機出典', value: 'Sony ILCE-7M4 Help Guide「Mounting index」実体パーツ構造' },
    ],
    diagramType: 'mount_index_inlay',
  },

  'mount-split-leaf-sp2': {
    title: 'M29. 補助分割板バネ MB N PLATE SP2 ＆ 異厚バイアス予圧シム群',
    subtitle: 'Asymmetric Split Secondary Bayonet Leaf Spring Plate (MB N PLATE SP2) & Bias Shims',
    category: '個別微細層 M29 — 実機2分割バヨネット板バネ・片持ち荷重バランス制御',
    plainAnalogy:
      '実機のソニーEマウントを分解すると、レンズを押し付ける板バネは1枚の丸い輪ではなく「SP1とSP2」という2つに分かれた特殊な形のバネになっています。ロックピンや電子接点を上手によけつつ、重いレンズのお辞儀を防ぐ工夫です。',
    summary:
      'Sony ILCE-7M4サービスマニュアル（Ref.554/555: MB N PLATE SP1 / SP2）で採用される、非対称2分割ステンレスばね鋼（SUS301-CSP）製サブクランプ板バネユニット。主板バネと補完配置され、接点ブロックやロックピン機構を回避しつつ360°均等な軸方向引き込み力を形成します。',
    opticsAndPhysics: [
      '大口径レンズを装着したカメラでは、重力によりレンズ下部がボディ側へ押され、上部が浮き上がる「片持ちモーメント（傾き）」が発生します。',
      '2分割されたSP1（下部・側面側）とSP2（上部高予圧側）で板厚・たわみ剛性を最適化することで、重量級テレフォト装着時のフランジ浮き上がりを数ミクロン未満に抑え込みます。',
    ],
    formula: {
      expression: 'F_clamp(SP1 + SP2) = k₁·δ₁ + k₂·δ₂ ≈ 38 N   (上部高剛性バイアス比 k₂/k₁ = 1.25)',
      description: '2分割非対称ばね定数設計により、接点開口スペース確保と重量レンズのお辞儀防止を両立。',
    },
    nextGenInnovation:
      '一体リング型バネに比べて材料歩留まりと局部応力分散に優れ、5万回着脱後のへたり（永久ひずみ）を大幅に低減した実機量産ならではの洗練設計です。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.554 (474836301 SP1) / Ref.555 (474836401 MB N PLATE SP2)' },
      { label: 'ばね材質', value: 'SUS301-CSP 調質ステンレスばね鋼（t = 0.45 mm / 0.50 mm）' },
      { label: '配置構成', value: 'ロックピン・12ピン接点回避型 非対称2分割アーク板バネ' },
      { label: '予圧機能', value: '重力モーメント相殺・軸方向ガタ（バックラッシュ）完全除去' },
    ],
    diagramType: 'mount_split_leaf_sp2',
  },

  'mount-locating-pin-h': {
    title: 'M30. 高精度光学芯出しノックピン MB N PIN (H) ＆ 圧入基準ブッシュ',
    subtitle: 'Precision Concentricity Locating Dowel Pin (MB N PIN H) & Hardened Datum Sleeve',
    category: '個別微細層 M30 — ±5μm光軸センタリング基準ノックピン',
    plainAnalogy:
      '6本のネジ穴には、ネジを通すためのわずかな遊び（すき間）があります。そこでネジとは別に「ミクロン単位で精密に削った鋼鉄の基準ピン」を差し込み、マウントの中心と回転角度を0.005mmの精度でビシッと決めています。',
    summary:
      'Sony ILCE-7M4サービスマニュアル（Ref.558: 444353001 MB N PIN (H)）およびILCE-7SM2分解手順で「紛失厳禁」と特記される、高硬度研削ステンレス製位置決めノックピンと圧入基準スリーブ。',
    opticsAndPhysics: [
      '締結ボルト（M02）の通し穴には必ず約0.1〜0.2 mmのクリアランスが存在するため、ボルトだけではマウントと撮像素子の中心軸（光軸）および回転角が微妙にズレてしまいます。',
      '公差h6（±4 μm）でセンタレス研削されたノックピン（MB N PIN H）をフランジとマグネシウム骨格のリーマ孔へ嵌合させることで、サービス交換後も工場出荷と同一の光軸芯出し精度を再現できます。',
    ],
    formula: {
      expression: 'Δr_axis ≤ ±5 μm  (JIS h6 研削ピン × H7 リーマ基準孔・回転角誤差 < 0.01°)',
      description: 'ボルト締結力と位置決め基準を完全分離する「運動学的基準設計（Kinematic Locating）」。',
    },
    nextGenInnovation:
      '接点ブロックの樹脂ホルダーとフランジの相対位置もこのピン系統で規制されるため、12本の極小ポゴピンがレンズ側接点パッドの中央0.1 mm以内へ確実に着地します。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.558: 444353001 MB N PIN (H)（サービスマニュアル紛失厳禁部品）' },
      { label: '加工精度', value: 'SUS440C 焼入れセンタレス研削（外径公差 ±4 μm / HRC 58）' },
      { label: '光学役割', value: 'フランジ〜マグネシウム骨格〜接点ブロックの同軸・回転角基準' },
      { label: '整備性', value: 'マウント交換時に再調整なしで光軸中心をサブ5 μm再現' },
    ],
    diagramType: 'mount_locating_pin_h',
  },

  'mount-contact-holder-ab': {
    title: 'M31. 接点ブロック上下噛合樹脂ホルダー MB N HOLDER A / B ＆ 係止爪',
    subtitle: 'Interlocking Twin-Shell LCP Contact Carrier (MB N HOLDER A & B) with Snap Claws',
    category: '個別微細層 M31 — 12ピンポゴ端子精密絶縁キャリア＆スナップ爪',
    plainAnalogy:
      '12本の金メッキ電子接点ピンを、1本ずつ隣のピンとショートしないように正確に並べて挟み込んでいる「黒い精密樹脂の二枚貝ケース」です。上側パーツAと下側パーツBが爪でパチンと噛み合ってピンを守っています。',
    summary:
      'Sony ILCE-7SM2/7M4のMB N CONTACT UNIT内部を構成する、ガラス繊維強化LCP（液晶ポリマー）製の上下二分割精密接点キャリア（MB N HOLDER A ＆ HOLDER B）と一体成形スナップ係止爪。',
    opticsAndPhysics: [
      '12本のポゴピンはわずか1.65 mmピッチで円弧状に配列されており、レンズ回転時に横方向のせん断摩擦力を繰り返し受けます。',
      '高耐熱・超高寸法安定性（線膨張係数 12 ppm/K）のLCP樹脂キャリアA/Bがピンの摺動ガイド穴を±0.02 mm精度で保持し、横倒れによる隣接ピン間ショート（特にVBAT 7.2Vと3.3V論理線の短絡）を確実に防止します。',
    ],
    formula: {
      expression: 'ピン配列ピッチ P = 1.65 mm ± 0.02 mm,   絶縁耐圧 > 500 V_DC (LCP GF30%)',
      description: '上下二分割のLCPスナップホルダーにより、12本ポゴピンの円弧整列精度と電気絶縁を長期保持。',
    },
    nextGenInnovation:
      'Canon RF（US10831084B2）やSony Eマウントでは、キャリア先端のガイド穴口元に微小な面取りと防塵ラビリンスを設け、レンズ着脱時のピン引っ掛かりとゴミ噛み込みを防いでいます。',
    specs: [
      { label: '実機部品', value: 'Sony MB N HOLDER A / MB N HOLDER B（456/5510 接点キャリア二分割殻）' },
      { label: '成形材質', value: '30%ガラス繊維強化 LCP（液晶ポリマー・超低吸水・高摺動性）' },
      { label: '結合方式', value: '一体弾性スナップ係止爪 ＋ 位置決めガイドボス' },
      { label: '参照特許', value: 'US10831084B2 / Sony ILCE-7SM2 Level 2 SM 接点ブロック分解構造' },
    ],
    diagramType: 'mount_contact_holder_ab',
  },

  'mount-contact-screws': {
    title: 'M32. 接点ブロック専用固定小ねじ M1.7×4.0 ＆ 導電接地スプリング端子',
    subtitle: 'Contact Block Precision M1.7×4.0 Mounting Screws & Anti-Latch-Up ESD Ground Spring',
    category: '個別微細層 M32 — 接点キャリア締結小ねじ＆CMOSラッチアップ防止接地ばね',
    plainAnalogy:
      '電子接点ケースをマウントに留める2本の極小ネジと、その溝に忍ばせた「静電気を逃がす小さな金属バネ」です。冬場にバチッと静電気が起きても、レンズの頭脳チップが壊れる前に金属マウントへ一瞬で電気を逃がします。',
    summary:
      'Sony ILCE-7M4サービスマニュアル（Ref.556: 309148131 SCREW M1.7×4.0）の接点ユニット固定用精密小ねじ2本、および特許US4637704Aに示される接点キャリア溝内組込型の導電ESD接地スプリング端子。',
    opticsAndPhysics: [
      '乾燥した環境で撮影者がレンズ鏡筒に触れると数kV〜15kVの静電気がマウントへ流入します。もし接点GNDとマウント金属環の電位差が開くと、レンズ内CMOSマイコンにサイリスタ寄生導通（ラッチアップ破壊）が生じます。',
      '絶縁ホルダーの専用溝に組み込まれた導電接地スプリングが、接点ブロックのDGND/PGND端子を直接ステンレスマウント環と同電位結合することで、静電サージ電流をCMOS回路から完全にバイパスします。',
    ],
    formula: {
      expression: 'R_esd_bond < 0.05 Ω   →   ΔV_latchup = I_esd · R_esd_bond < 0.8 V (CMOS安全域)',
      description: '接点GNDと金属マウントを極低抵抗スプリングで直結し、活線着脱・静電サージ破壊を根本阻止。',
    },
    nextGenInnovation:
      'ネジ締結と同時にスプリングが自動圧接されるため、ハンダ付け不要で組付け再現性とサービス分解性を両立しています。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.556: 309148131 SCREW (M1.7 × 4.0) × 2本' },
      { label: '接地ばね', value: 'ニッケル／金めっき リン青銅・導電ESDバイパススプリング' },
      { label: '保護機能', value: 'レンズCMOS回路ラッチアップ破壊防止（特許 US4637704A準拠）' },
      { label: '締付規格', value: '規定トルク 0.14 N·m（LCP樹脂ボス割れ防止トルク管理）' },
    ],
    diagramType: 'mount_contact_screws',
  },

  'mount-ll-button-spring': {
    title: 'M33. レンズ解除ボタン独立復帰コイルバネ MB LL BUTTON SPRING ＆ 摺動スリーブ',
    subtitle: 'Independent Lens-Release Button Return Spring (MB LL BUTTON SPRING) & Guide Sleeve',
    category: '個別微細層 M33 — ロックピンと独立したボタン専用復帰バネ（ガタ皆無設計）',
    plainAnalogy:
      'レンズを外すボタンを押すとき、実は中にはバネが「2本」入っています。ロックピンを押し出す硬いバネとは別に、ボタン自身を押し戻す専用のバネを入れることで、ボタンを押した時の「カチッ」とした上質な手応えとガタつきゼロを両立しています。',
    summary:
      'Sony ILCE-7M4サービスマニュアル（Ref.562: 474836701 MB LL BUTTON SPRING (5600)）として、ロックピン用スプリング（Ref.563: MB LENS LOCK SPRING）から完全独立設計された解除ボタン専用復帰コイルバネと低摩擦POM摺動ガイドスリーブ。',
    opticsAndPhysics: [
      '単一バネ方式では、重いレンズの回転摩擦でロックピンがわずかに引っ掛かった際に外装ボタンがペコペコ浮いたりカタついたりする欠点があります。',
      'ボタン復帰バネ（ばね定数 k_btn ≈ 1.8 N/mm）とロックピン突出バネ（k_pin ≈ 3.4 N/mm）を機械的に分離し、ロッカーリンク経由で連動させることで、常に一定の操作荷重（約4.5 N）と無音・無ガタなボタン感触を実現します。',
    ],
    formula: {
      expression: 'F_press = F_btn(1.6 N) + η·F_pin(2.9 N) ≈ 4.5 N  (独立2ばね・ボタン遊隙 = 0.00 mm)',
      description: 'ボタン復帰系とロックピン突出系を独立2ばね化することで、誤解除防止と極上操作フィールを両立。',
    },
    nextGenInnovation:
      'POM樹脂ガイドスリーブの内周に微細なフッ素グリス溜まり溝を設け、氷点下−20℃でもボタン戻りが鈍らない寒冷地仕様となっています。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.562: 474836701 MB LL BUTTON SPRING (5600)（Ref.563と別体）' },
      { label: 'バネ仕様', value: 'SUS304-WPB ピアノ線コイルバネ（線径 0.35 mm・有効巻数 6.5）' },
      { label: 'ガイド構造', value: '低摩擦ポリアセタール（POM）円筒摺動スリーブ' },
      { label: '操作荷重', value: '解除押下力 約 4.5 N（誤押し防止と片手操作性の最適バランス）' },
    ],
    diagramType: 'mount_ll_button_spring',
  },

  'mount-lock-eclip-retainer': {
    title: 'M34. ロックピン脱落防止Eリング（止め輪）＆ 防塵フェルトワイパー環',
    subtitle: 'Hardened Lock-Pin Retention E-Clip Circlip & Oil-Impregnated Dust Wiper Felt Ring',
    category: '個別微細層 M34 — レンズロックピン抜け止めC/E止め輪＆砂塵掻き取りシール',
    plainAnalogy:
      'レンズを固定するロックピンがバネの勢いで外へ飛び出してしまわないように、軸の溝にパチンとはめた極小の「Eの字型ストッパー金具」と、ピンが出入りする穴から砂埃が入るのを拭き取る「極小フェルトの靴底マット」です。',
    summary:
      '硬化ステンレス製レンズロックピン（MB LL PIN / M06）の軸径溝に嵌着されるJIS規格SUS304極小E形止め輪（E-Clip）と、ガイドブッシュ外端に配された高密度含油フェルト／PTFE防塵ワイパーリング。',
    opticsAndPhysics: [
      'レンズ装着時、ロックピンはレンズ側バヨネット裏面に押されて2.8 mm後退し、回転終端で穴へ一気に飛び出します。この衝撃を5万回受け止めて前面への飛び出しを阻止するのがE形止め輪とスラストワッシャーです。',
      '砂漠や海辺の撮影ではフランジ表面の微細な砂粒がロックピン穴へ侵入してピン固着（レンズが外れなくなる致命トラブル）を起こすため、ピン外周に密着する防塵ワイパー環が往復動作のたびに異物を掻き落とします。',
    ],
    formula: {
      expression: 'F_shear_clip > 280 N (E-2.0 SUS304),   ピン突出規制公差 ±0.05 mm',
      description: '微小な止め輪1枚でロックピンの軸方向ストッパーと分解整備性を同時に確保。',
    },
    nextGenInnovation:
      'フェルトワイパーへ極微量のフッ素系不揮発潤滑油を含浸させることで、砂塵遮断と同時にロックピン摺動面の長期無給油潤滑も兼ねています。',
    specs: [
      { label: '止め輪規格', value: 'JIS B 2805 準拠 SUS304 精密E形止め輪（呼び径 2.0 mm・t = 0.4 mm）' },
      { label: '防塵要素', value: 'フッ素オイル含浸 高密度マイクロフェルト・ダストワイパー環' },
      { label: '安全機能', value: 'レンズ非装着時のロックピン飛び出し防止 ＆ 砂噛み固着の阻止' },
      { label: '連携部品', value: 'M06 硬化鋼レンズロックピン（Sony Ref.561 MB LL PIN）軸後端溝' },
    ],
    diagramType: 'mount_lock_eclip_retainer',
  },

  'mount-jack-shield-block': {
    title: 'M35. マウント側面電磁遮蔽ブロック MB JACK SHIELD BLOCK ＆ 接地クリップ',
    subtitle: 'Mount-Flank EMI Shield Block (MB JACK SHIELD BLOCK 5800) & Grounding Clips',
    category: '個別微細層 M35 — マウント〜左側面I/Oジャック間 鉄壁EMI隔壁',
    plainAnalogy:
      'マウントのすぐ横にはHDMIやマイク・ヘッドホンの差し込み口が並んでいます。そこにレンズモーターやセンサーの電波ノイズが飛び火して「音声にジーッという雑音」が入らないよう、金属の衝立（ついたて）でしっかり仕切っています。',
    summary:
      'Sony ILCE-7M4サービスマニュアル（Ref.564: 500972301 MB JACK SHIELD BLOCK (5800) / Ref.565: M1.7×3.5固定ねじ）に実在する、マウントボックス左側面（+X側）にボルト締結される専用金属EMI電磁遮蔽ブロック。',
    opticsAndPhysics: [
      'ミラーレスカメラの極小ボディでは、大電流PWMで駆動されるレンズAFモーター線・シャッター電磁石と、超高感度な3.5mm外部マイクプリアンプおよび48Gbps HDMIジャックがわずか数ミリしか離れていません。',
      'マウントフレームと一体接地された金属製ジャックシールドブロックが電磁界の近傍結合（磁界・電界カップリング）を物理的に遮断し、動画収録時の音声ノイズフロアを−95 dBV以下へ守り抜きます。',
    ],
    formula: {
      expression: 'SE_EM(10 MHz–2 GHz) ≥ 34 dB   (マウント側PWMノイズ → 音声/HDMIジャック隔離)',
      description: 'マウントボックスと左側面ジャック群の境界に金属遮蔽壁を直結し、音声ハムやHDMIジッタを排除。',
    },
    nextGenInnovation:
      '単なるシールド板にとどまらず、フロントシェル〜マウント骨格〜側面ジャック枠のねじれ剛性を高める構造ガセットの役割も兼ねています。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.564: 500972301 MB JACK SHIELD BLOCK (5800) ＋ Ref.565 ねじ' },
      { label: '材質・構造', value: 'ニッケルめっき 洋白／SUS304 プレス一体成形EMI隔壁ブロック' },
      { label: '保護対象', value: '左側面 3.5mmマイク・ヘッドホン音声線 ＆ フルサイズHDMI 2.1端子' },
      { label: '遮蔽効果', value: '近傍電磁結合ノイズ −34 dB 以上減衰（24bitデジタル音声保護）' },
    ],
    diagramType: 'mount_jack_shield_block',
  },

  'mount-mask-sheet-tape': {
    title: 'M36. マウント背面遮光マスクシート MB MASK SHEET ＆ 両面遮光粘着テープ',
    subtitle: 'Rear Mount Light-Tight Polycarbonate Mask Sheet (MB MASK SHEET 5510) & Adhesive Tape',
    category: '個別微細層 M36 — マウント〜シャッター間 マイクロ光漏れ完全封止フィルム',
    plainAnalogy:
      '星空を何分もかけて長時間露光すると、レンズ解除ボタンのすき間からほんのわずかな光が漏れただけで写真が赤くカブって台無しになります。マウントの裏側に貼った「真っ黒な極薄遮光シートと専用テープ」が光の一粒も通しません。',
    summary:
      'Sony ILCE-7M4サービスマニュアル（Ref.567: 502816301 MB MASK SHEET (5510) / Ref.566: 502816401 MB MASK SHEET TAPE (5510)）に実在する、マウントフレーム背面に貼着される超低反射マット黒ポリカーボネート遮光マスクシートとダイカット両面遮光粘着テープ。',
    opticsAndPhysics: [
      'マグネシウム鋳造マウントボックスには、ロックピン逃げ穴・接点FPC引き出しスリット・締結ねじ逃げ穴など複数の貫通開口が不可避に存在します。',
      '光学濃度 OD > 6.0（光透過率 0.0001%未満）のカーボン練り込み黒色フィルムを専用粘着テープで背面全域に密着させることで、ISO 102400・30秒バルブ露光でも外部からの迷光リークを完全ゼロにします。',
    ],
    formula: {
      expression: 'OD = −log₁₀(T) > 6.0   (T < 10⁻⁶・t = 0.12 mm 極薄カーボン黒PCシート)',
      description: '極薄0.12 mmフィルムで全貫通スリットの迷光経路を封止し、超高感度・長時間露光の黒締まりを保証。',
    },
    nextGenInnovation:
      'シート表面には微細シボ（サンドブラスト調艶消し）加工が施されており、遮光だけでなくシャッター前面からの再反射フレア吸収も同時に果たします。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.567 (502816301 MB MASK SHEET) ＋ Ref.566 (502816401 TAPE)' },
      { label: '材質・厚み', value: 'カーボン充填マットブラックPCフィルム（t = 0.12 mm）＋ 遮光両面テープ' },
      { label: '遮光性能', value: '光学濃度 OD > 6.0（バルブ長時間露光時の光漏れカブリ完全ゼロ）' },
      { label: '封止箇所', value: 'レンズ解除機構スリット・接点FPC通過孔・背面締結ボス周辺' },
    ],
    diagramType: 'mount_mask_sheet_tape',
  },

  'mount-bl-fpc-adhesive': {
    title: 'M37. マウント通信BLフレキ絶縁補強シート ＆ ガイドボス固定テープ',
    subtitle: 'Mount Bus (BL) Flexible Board Adhesive Stiffener Sheet & Black Routing Retention Tape',
    category: '個別微細層 M37 — マウント通信FPC密着固定・シャッター干渉防止配線止め',
    plainAnalogy:
      'レンズ接点から伸びるリボンケーブル（BLフレキ）が中でブラブラすると、すぐ後ろの高速シャッターやレンズ後玉に擦れて断線してしまいます。マウントのカーブに沿って「黒い専用固定テープと補強シート」でピタッと張り付けて誘導します。',
    summary:
      'Sony ILCE-7SM2/7M4サービスマニュアル（BL Flexible Board adhesive joint / Ref.468: 750000493 TAPE 631S #25 BLK）で規定される、マウント下部接点からメイン基板へ走るBLフレキシブル基板の局所FR-4補強板、ガイドボス位置決め穴、および黒色遮光ポリエステル固定テープ。',
    opticsAndPhysics: [
      'マウント下部6時方向から引き出された12ピン通信FPCは、マグネシウムマウントボックスの曲面をタイトに回り込んでシャッター下側をくぐり、メイン基板（SY-1122）下部ZIFコネクタへ接続されます。',
      '専用接着シートと耐熱黒色ポリエステルテープ（Sony 631S #25）で曲面へ完全密着固定することで、FPCの浮き上がりによるシャッター干渉・レンズ後玉接触・振動断線を未然に防ぎます。',
    ],
    formula: {
      expression: '剥離接着力 ≥ 8.5 N/25mm (85℃耐熱),   最小曲げ半径 R_min = 1.2 mm ガイド保持',
      description: '極狭クリアランス空間でBLフレキをミリ未満精度で沿面固定し、機械干渉とEMC放射を同時抑制。',
    },
    nextGenInnovation:
      '黒色不透明テープを採用することで、ポリイミドFPC特有の鮮やかなオレンジ銅色がマウント内面から反射して撮像フレアを生むのを防ぐ光学配慮も織り込まれています。',
    specs: [
      { label: '実機部品', value: 'Sony BL Flexible Board Adhesive Joint ＋ Ref.468 TAPE (631S #25 BLK)' },
      { label: '構成部材', value: '黒色艶消しポリエステル固定テープ ＋ FR-4 ZIF端補強スティフナー' },
      { label: '位置決め', value: 'マウントボックス一体ガイドボス嵌合孔 × 2点' },
      { label: '保護役割', value: 'FPC浮き上がり防止・シャッター/レンズ干渉回避・内部反射遮断' },
    ],
    diagramType: 'mount_bl_fpc_adhesive',
  },

  'mount-bayonet-drain-channel': {
    title: 'M38. マウント外周ラビリンス排水溝リング ＆ 毛細管遮断スポンジシール',
    subtitle: 'Perimeter Labyrinth Capillary-Break Drainage Channel & Closed-Cell Micro-Foam Seal',
    category: '個別微細層 M38 — 雨天撮影・毛細管現象による雨水吸い込み完全遮断溝',
    plainAnalogy:
      '雨が降っているとき、狭いすき間があると水は勝手に奥へ吸い込まれてしまいます（毛細管現象）。マウントのすぐ裏に「わざと空間を広げる排水ミゾと撥水スポンジの堤防」を作って、雨水がカメラの奥へ入り込むのをせき止めて外へ流します。',
    summary:
      'ステンレスフランジ（M01）背面とマグネシウムフロント骨格の間に組み込まれた、毛細管現象遮断（Capillary-Break）用多段ラビリンス排水溝リングおよび独立気泡撥水マイクロフォーム（PORON系）補助シール。',
    opticsAndPhysics: [
      'レンズ側マウントゴムガスケットを突破したわずかな水滴は、金属同士の0.05 mm未満の極狭ギャップに触れるとラプラス圧（ΔP = 2γ cosθ / d）によって重力に逆らって内部へ吸い込まれます。',
      '意図的に隙間を1.2 mm以上に拡張する「毛細管ブレイク溝」と撥水独立気泡スポンジをフランジ外周全周に設けることで、吸い込み圧力を1/20以下へ急落させ、下部ドレン逃がし部へ安全に排出します。',
    ],
    formula: {
      expression: 'ΔP_cap = (2γ·cosθ) / d   ⇒   溝幅 d: 0.05 mm → 1.2 mm で毛細管吸込圧 −96%',
      description: '物理的な隙間拡張（ラビリンス溝）と撥水フォームの二段構えで、豪雨下でもマウント浸水を阻止。',
    },
    nextGenInnovation:
      'Lensrentals等の防滴分解検証で重視される「パッキンに頼り切らない構造的毛細管遮断」を体現したプロ仕様ウェザーシーリングです。',
    specs: [
      { label: '防水原理', value: '多段ラビリンス毛細管ブレイク排水溝 ＋ 独立気泡撥水マイクロフォーム' },
      { label: 'シール材', value: '超高圧縮回復 独立気泡ウレタン／EPDMフォーム（t = 0.8 mm）' },
      { label: '配置位置', value: 'M01 フランジ外周裏面 〜 フロントマグネシウム外装接合界面' },
      { label: '耐環境性', value: '強雨・飛沫・塩水ミスト環境でのマウント界面浸水経路遮断' },
    ],
    diagramType: 'mount_bayonet_drain_channel',
  },

  'mount-im-adjust-washer': {
    title: 'M39. マウント〜撮像骨格間 フランジバック微調セレクションワッシャー（25〜600μm）',
    subtitle: 'Factory Selection Flange-Focal Adjustment Washer Set (IM ADJUST WASHER D: 25–600 μm)',
    category: '個別微細層 M39 — 実機12段階セレクションシム・18.000mmフランジバック校正',
    plainAnalogy:
      'カメラの心臓部であるマウントとセンサーの距離は「18.000mm」と髪の毛より遥かに精密です。工場で1台ずつレーザー計測し、25μmから600μmまで12種類の厚みの極薄金属ワッシャー（刻印10〜60）を3カ所に入れ替えて完璧なピント面を追い込みます。',
    summary:
      'Sony ILCE-7M4サービスマニュアル「SELECTION PARTS」（Ref.456: IM ADJUST WASHER D (5000)、Part No. 455838701〜468772712）に明記された、25 μm〜600 μmの12段階厚みグレードを持つ工場校正用精密ステンレス・セレクションワッシャー群（3点支持）。',
    opticsAndPhysics: [
      'フルサイズ50mm F1.2開放の焦点深度（許容錯乱円 15 μm基準）はわずか ±18 μm しかなく、マウント面と撮像素子面の平行度がわずか0.02 mm傾いただけで画面の片側がボケる「片ボケ」が発生します。',
      'マウント骨格背面の3点基準ボスに、刻印「10 (100μm)」「15 (150μm)」…「60 (600μm)」と識別された12種＋25μm微調ワッシャーを組み合わせて挿入することで、距離精度とチルト平行度を±3 μm以内へ完全校正します。',
    ],
    formula: {
      expression: 'FFD = 18.000 ± 0.003 mm   (12種セレクション板厚: 25, 100, 150, …, 600 μm レーザー刻印)',
      description: '3点独立のセレクションシム組合せにより、Z距離（無限遠）とXY傾き（片ボケ）を同時に極限校正。',
    },
    nextGenInnovation:
      'サービス拠点でのセンサー・マウント交換時にも、元のワッシャー刻印番号を記録・再計算することで工場出荷と同一の光学解像性能を復元できます。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.456: IM ADJUST WASHER D (455838701〜468772712 全12種)' },
      { label: '厚み展開', value: '25 μm（無印）＋ 100〜600 μm（50 μm刻み・刻印 10〜60）' },
      { label: '支持構成', value: 'マウント骨格〜センサーユニット間 3点運動学的基準ボス配置' },
      { label: '校正精度', value: 'フランジバック 18.000 mm ± 3 μm / 面平行度 < 0.008°' },
    ],
    diagramType: 'mount_im_adjust_washer',
  },

  'mount-optical-black-coating': {
    title: 'M40. マウント内筒 植毛静電遮光ライナー ＆ マイクロセレーション反射吸収帯',
    subtitle: 'Inner Mount-Throat Electrostatic Velvet Flock Liner & Micro-Serrated Light-Trap Band',
    category: '個別微細層 M40 — レンズ後玉〜シャッター間 かすめ角ゴースト完全抹消内張り',
    plainAnalogy:
      '大口径レンズの後ろ玉は、マウントのすぐ内側に大きく迫っています。マウントの筒の内側が少しでも光を跳ね返すと画面の端が白っぽく濁るため、細かいノコギリ歯と真っ黒なベルベット起毛シートを全周に貼り込んで迷光を飲み込みます。',
    summary:
      '大口径マウントボックス（M11）の円筒内壁全周に貼着された、静電植毛マットブラック遮光ライナーおよび微細ピッチ（0.25 mm）鋸歯状マイクロセレーション光吸収帯。',
    opticsAndPhysics: [
      'フランジバック18 mmのミラーレス機では、F1.2や超広角レンズの後玉から射出されたイメージサークル外の不要光が、マウント内筒壁に75°〜85°のかすめ角（Grazing Angle）で入射します。',
      '通常の黒アルマイト塗装でもかすめ角では反射率が20%超へ跳ね上がりますが、ランダム配向の極細カーボン繊維による静電植毛ライナー（深さ0.4 mm）と鋸歯段差により、多重吸収させて反射率を0.08%未満に封じ込めます。',
    ],
    formula: {
      expression: 'R_grazing(θ = 80°) < 0.08 %   (通常黒塗装 22% に対し迷光強度 −24 dB 削減)',
      description: '静電植毛ファイバーの微細空洞トラップが斜め入射光を内部多重反射で熱エネルギーへ完全吸収。',
    },
    nextGenInnovation:
      '脱落繊維がイメージセンサーのゴミにならないよう、静電植毛後に高圧イオンエアー洗浄と特殊バインダー熱硬化処理を施した光学カメラ専用ダストフリー仕様です。',
    specs: [
      { label: '表面構造', value: 'ダストフリー熱硬化 静電植毛カーボンベルベット ＋ 0.25 mm鋸歯帯' },
      { label: '光学反射率', value: '可視光 400–700 nm 全域 < 0.08%（80°かすめ角入射時）' },
      { label: '配置位置', value: 'M11 マウント内筒円周内壁（バヨネット爪〜M09バッフル間）' },
      { label: '画質効果', value: '逆光・点光源（夜景街灯・太陽）撮影時の画面周辺ベールフレア根絶' },
    ],
    diagramType: 'mount_optical_black_coating',
  },

  'mount-contact-dust-lip': {
    title: 'M41. 接点ブロック外周 防塵シリコーンリップパッキン ＆ 結露遮断バリア',
    subtitle: 'Contact-Block Perimeter Silicone Dust-Lip Seal & Condensation Short-Circuit Barrier',
    category: '個別微細層 M41 — 12ピン高電圧VBAT/通信端子 防滴・結露リーク防護リップ',
    plainAnalogy:
      'マウントの中でいちばん水や結露に弱いのが「電気が通る12本の接点」です。接点ブロックの周囲をぐるりと囲む極小のシリコーンゴムの防波堤が、万が一マウント内に入った湿気や水滴でショートするのを防ぎます。',
    summary:
      '12ピン接点ブロック（M07 / M31）の円弧状外周に沿って装着される、低圧縮永久ひずみ液状シリコーンゴム（LSR）一体成形の極小防塵リップパッキンと結露沿面距離拡張バリア。',
    opticsAndPhysics: [
      'レンズ交換を雨天や寒冷地〜暖かい室内の温度差環境で行うと、マウント内径下部の接点ブロック周辺に微小な水滴や結露が溜まりやすくなります。',
      '接点ブロック外周を360°取り囲むシリコーンリップがマウントフランジ内壁へ密着し、さらにピン間の樹脂リブが沿面距離を稼ぐことで、7.2 V給電ピンと高速通信ピン間の電解腐食・リーク電流を遮断します。',
    ],
    formula: {
      expression: '硬度 40 Shore A (LSR),   封止圧縮率 22%,   絶縁抵抗 R_iso > 100 MΩ @ 95% RH',
      description: '接点キャリア周囲の局所気密化により、結露・湿気環境下でのレンズ認識エラーと端子腐食を防止。',
    },
    nextGenInnovation:
      '撥水フッ素コートをシリコーン表面へ施すことで、水滴がピン側へ濡れ広がるのを物理的に弾き返します。',
    specs: [
      { label: 'シール材質', value: '撥水処理 液状シリコーンゴム（LSR・硬度 40 Shore A）' },
      { label: '配置形状', value: '6時方向 12ピン接点ブロック円弧外周 360°連続リップパッキン' },
      { label: '保護機能', value: '7.2 V電源ピン〜通信線間の結露リーク・電解腐食・微細粉塵侵入防止' },
      { label: '動作温度', value: '−30℃〜+85℃（極寒下でも弾性追従性を維持）' },
    ],
    diagramType: 'mount_contact_dust_lip',
  },

  'mount-body-cap-interface': {
    title: 'M42. 防塵バヨネット・ボディキャップ（ALC-B1EM）＆ 密閉Oリング座面',
    subtitle: 'Dust-Sealed 3-Lug Bayonet Protective Body Cap (Sony Ref.551 CAP, BODY) & Labyrinth Rim',
    category: '個別微細層 M42 — レンズ非装着時の撮像室・マウント密閉保護キャップ',
    plainAnalogy:
      'レンズを外してカメラを保管・持ち運びするときにマウントへパチッと回して蓋をする専用ボディキャップです。単なるプラスチックの蓋ではなく、内側のリブと外周の段差でホコリの侵入と落下時のマウント傷を防ぎます。',
    summary:
      'Sony ILCE-7M4サービスマニュアル（Ref.551: 418853601 CAP, BODY）にマウントユニット最前面部品として記載される、高耐衝撃ABS/PC製3枚爪バヨネットボディキャップ。外周防塵ラビリンス縁、ローレット握りリブ、および内面ダストトラップ補強リブを備えます。',
    opticsAndPhysics: [
      'レンズを外した瞬間、ミラーレスカメラの精密なシャッター幕とイメージセンサーはわずか18 mm奥に無防備に露出します。',
      'バヨネット爪を60°回転させて板バネ（M04/M29）の予圧でフランジ基準面へ密着させることで、カメラバッグ内の繊維クズ・砂塵・指の誤接触から撮像室を完全隔離します。',
    ],
    formula: {
      expression: '係合回転角 θ = 60° (3爪バヨネット),   内面ダストトラップ容積 + 外周ラビリンス封止',
      description: 'マウントフランジ基準面と板バネ予圧を利用し、工具不要で確実な防塵密閉とフランジ端面保護を実現。',
    },
    nextGenInnovation:
      '最新プロ向け防塵ボディキャップでは、フランジ当たり面にEPDM薄型Oリングを内蔵して豪雨時の移動中でも撮像室への湿気侵入を完全遮断する構造も採用されています。',
    specs: [
      { label: '実機品番', value: 'Sony Ref.551: 418853601 CAP, BODY（ALC-B1EM 相当）' },
      { label: '材質・構造', value: '帯電防止処理 ガラス強化ABS/PC ＋ 3枚バヨネット爪＆外周防塵縁' },
      { label: '保護対象', value: 'ステンレスフランジ基準面・12ピン接点・シャッター幕・イメージセンサー' },
      { label: '操作性', value: '外周18条ノンスリップローレット ＋ 白色装着指標マーク付' },
    ],
    diagramType: 'mount_body_cap_interface',
  },
};
