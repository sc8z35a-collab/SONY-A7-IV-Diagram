import { PartExplanation } from '../types';

export const MAINBOARD_EXPLANATIONS: Record<string, PartExplanation> = {
  'mb-vapor-chamber': {
    title: '超薄型ベイパーチャンバー ＆ グラファイト複合放熱モジュール',
    subtitle: 'Two-Phase Copper Vapor Chamber, Heat Pipe & Pyrolytic Graphite Sheet',
    category: 'M01 / 熱流体・相変化放熱システム',
    plainAnalogy:
      'ひとことで言うと「カメラの頭脳を冷やす『超うす型の水冷クーラー板』」。8K動画や秒間120コマ連写でチンチンに発熱するチップの熱を、内部の密閉された純水の“蒸発と結露のサイクル”で一瞬のうちにボディ全体へ逃がします！',
    summary:
      'メイン基板の背面最外層を覆う極薄二相式銅ベイパーチャンバー（厚さ約1 mm）、高熱伝導パイロリティックグラファイトシート（PGS）、およびピンク／ブルーの高熱伝導シリコン熱伝導パッド（TIM）から成る次世代パッシブ放熱アセンブリ。',
    opticsAndPhysics: [
      '二相変化の熱輸送原理：ベイパーチャンバー内部は減圧された極薄の真空銅室で、微細な銅ウィック（毛細管構造）と少量の純水が封入されています。ISPチップ直上の熱で水が沸騰・気化し、音速に近い速さで冷たい端へ移動して液体に戻り、毛細管現象で還流します。潜熱を利用するため、実効熱伝導率は純銅（400 W/m·K）の20〜50倍にも達します！',
      '熱界面材料（TIM）の役割：半導体表面と放熱板の間には目に見えないミクロン単位の空気層（空気は熱を通しにくい断熱材）が存在します。柔軟な高熱伝導シリコンパッド（12–15 W/m·K）で密着させて接触熱抵抗を劇的に低減します。',
      'パイロリティックグラファイト（面内 k ≈ 1,600 W/m·K）と延長ヒートパイプが、三脚座やマグネシウム外装フレームへ熱を分散し、防塵防滴の密閉ボディでも長時間の8K60p RAW連続収録を可能にします。',
    ],
    formula: {
      expression: 'q = −k_eff · A · (dT / dx)   （ベイパーチャンバー実効 k_eff ≈ 8,000 – 20,000 W/m·K）',
      description: '相変化の蒸発潜熱（2,260 kJ/kg）を利用することで、わずかな温度差 ΔT で大電力を高速輸送します。',
    },
    nextGenInnovation:
      '2024〜2026年のフラッグシップミラーレスでは、防塵防滴シールを破る冷却ファンを使わずに8K60p RAWや4K120pを長時間記録するため、メイン基板背面全面に広がるベイパーチャンバー＋多層グラファイト＋マグネシウム筐体熱結合設計が標準化しています。',
    specs: [
      { label: '放熱構造', value: '極薄銅ベイパーチャンバー ＋ グラファイトシート' },
      { label: '実効熱伝導率', value: '約 10,000 W/m·K（面内熱拡散）' },
      { label: 'TIM熱伝導パッド', value: '高柔軟シリコン 12 W/m·K（ISP/NPU/DRAM密着）' },
      { label: '熱設計電力 (TDP)', value: 'ピーク 12 – 18 W 連続放熱（8K60p対応）' },
    ],
    diagramType: 'mb_vapor',
  },

  'mb-emi-shield': {
    title: 'マルチ区画EMI高周波シールド缶 ＆ 導電性ガスケット',
    subtitle: 'Multi-Compartment Nickel-Silver RF/EMI Shielding Frame & Grounding Clips',
    category: 'M02 / 電磁両立性 (EMC)・ファラデーケージ',
    plainAnalogy:
      'ひとことで言うと「チップ同士が“電波のケンカ”をしないように囲う金属の防音室」。毎秒何十億回もスイッチが切り替わる超高速チップからは強力なノイズ電波が出るため、金属の壁で覆って写真に横縞ノイズが乗るのを防ぎます！',
    summary:
      'ISPエンジン・AI NPU・LPDDR5X・Wi-Fi RFモジュール・電源VRMの各エリアを精密に仕切る洋白（Cu-Ni-Zn合金）製の多区画EMIシールドフレーム。各コンパートメントが独立したファラデーケージとして機能します。',
    opticsAndPhysics: [
      'ファラデーケージと表皮効果：高周波電磁波（数百MHz〜数GHz）が導電性金属壁に入射すると、表面に渦電流が誘起されて入射波を打ち消します。金属内部の表皮深さ δ = √(2 / ωμσ) は1 GHzで数ミクロンしかないため、厚さ 0.15 mm の金属板でも 60 dB（ノイズ強度 1/1000）以上の遮蔽効果を発揮します。',
      'なぜ部屋を細かく仕切るの？：大電流を高速スイッチングする電源回路（VRM）や 6 GHz の Wi-Fi 電波が、すぐ隣の微弱な音声回路や高感度センサー読み出し信号へ飛び込む「クロストーク」を完全に封じ込めるためです。',
      '周囲の金メッキ・ベリリウム銅スプリングクリップが基板のグラウンド層と低インピーダンスで多点接地され、金属箱自体がアンテナ化（共振）するのを防ぎます。',
    ],
    formula: {
      expression: 'SE (dB) = R + A + B   /   δ = √(2 / (2πf · μ · σ))',
      description: 'シールド効果 SE は反射損失 R・吸収損失 A の和で決まり、高周波ほど表皮深さ δ が浅く強力に遮断されます。',
    },
    nextGenInnovation:
      '最新世代では2ピース着脱式シールドフレーム（ハンダ付け枠＋点検スナップ蓋）と熱伝導パッド貫通ウィンドウを組み合わせ、電磁遮蔽とベイパーチャンバーへの直接放熱を両立しています。',
    specs: [
      { label: '材質・板厚', value: '洋白合金 (Cu-Ni-Zn) / 約 0.15 – 0.20 mm' },
      { label: '電磁遮蔽性能', value: '> 60 dB（100 MHz – 10 GHz 帯域）' },
      { label: '区画構造', value: 'ISP・NPU・DRAM・RF 独立マルチコンパートメント' },
      { label: '接地方式', value: '全周低インピーダンス多点グラウンドクリップ' },
    ],
    diagramType: 'mb_emi',
  },

  'mb-isp-ihs': {
    title: 'ISPメインエンジン・ニッケルメッキ銅ヒートスプレッダ蓋 (IHS)',
    subtitle: 'Nickel-Plated Copper Integrated Heat Spreader (IHS) & Thermal Gel Layer',
    category: 'M03 / チップ保護・局所ホットスポット拡散',
    plainAnalogy:
      'ひとことで言うと「デリケートな半導体シリコンを守る金属のヘルメット兼・熱広げプレート」。爪ほどのシリコンの1点に集中する猛烈な熱を、広い面積に均一に広げて上のクーラーへ渡します。',
    summary:
      '4nm ISPメインSoCシリコンダイの直上を覆う精密鍛造ニッケルメッキ銅製ヒートスプレッダ（IHS）と、極薄の高熱伝導サーマルインターフェースゲル層。本ビューワーではこの蓋を外す（非表示にする）ことで、直下のベアシリコン回路パターンを直接観察できます。',
    opticsAndPhysics: [
      'ホットスポット熱拡散（Spreading Resistance低減）：4nmチップ内部では、8K動画エンコーダや16bit現像パイプラインなど一部の回路に熱流束が集中します（局所 > 50 W/cm²）。熱伝導率 398 W/m·K の銅蓋が熱を横方向へ素早く広げ、シリコンの局所過熱（サーマルスロットリング）を防ぎます。',
      '機械的応力保護：厚さ 0.7 mm の単結晶シリコンダイはガラスのように脆く、放熱板のネジ締め圧力が一点に偏ると割れてしまいます（ダイクラック）。剛性の高い銅IHSが圧力を均一に分散し、チップを保護します。',
      '表面のニッケルメッキは銅の酸化腐食を防ぎ、長年にわたりサーマルグリスやTIMパッドとの密着性を維持します。',
    ],
    formula: {
      expression: 'R_total = R_TIM1 + R_IHS + R_TIM2   （熱抵抗 K/W を最小化して ΔT = P · R_total を抑制）',
      description: 'チップ接合部温度 T_j = T_amb + P × R_total を常に安全上限（約 95–105 ℃）以下に保ちます。',
    },
    nextGenInnovation:
      '一部最新パッケージでは、IHS内面とシリコンダイの間にインジウム系金属ハンダ（STIM）や超高熱伝導ナノ粒子ゲルを採用し、従来の樹脂グリス比で接合部温度を 5〜8 ℃ 低下させています。',
    specs: [
      { label: '材質・表面処理', value: '無酸素銅 (C1020) ＋ 無電解ニッケルメッキ' },
      { label: '熱伝導率', value: '約 390 W/m·K' },
      { label: '内部TIM層', value: '高熱伝導相変化サーマルゲル（膜厚 < 50 μm）' },
      { label: '役割', value: '局所ホットスポット拡散・シリコンダイ破断保護' },
    ],
    diagramType: 'mb_ihs',
  },

  'mb-isp-die': {
    title: '次世代4nm メイン撮像処理エンジン SoC シリコンダイ（デュアルストリームISP）',
    subtitle: '4nm Flagship Image Signal Processor (ISP) Bare Silicon Die — Dual-Stream Architecture',
    category: 'M04 / カメラの中枢頭脳・専用画像処理半導体',
    plainAnalogy:
      'ひとことで言うと「1秒間に数十億個の光の粒を一瞬で美しい写真や8K動画に仕上げる“超天才・現像工場チップ”」。1枚の小さなシリコンの中に、色を作る工場・ノイズを消す工場・8K動画を圧縮する工場・ファインダーを途切れさせない専用レーンまで全部ギュッと詰め込まれています！',
    summary:
      '先端4nm級FinFET/GAAプロセスで製造されたカメラ専用カスタムSoC（BIONZ XR / DIGIC X / EXPEED 7次世代系譜）。数億〜数十億個のトランジスタを集積し、センサーからの超高速RAWデータを遅延ほぼゼロで処理します。',
    opticsAndPhysics: [
      '16-bit リニアRAW現像パイプライン：①黒レベル・欠陥画素補正 → ②シェーディング（周辺減光）・レンズ収差リアルタイム補正 → ③ベイヤー配列（R/G/B単色画素）から全画素フルカラーを復元する高度デモザイキング → ④高精度3×3色変換行列＆3D-LUTによるカラーサイエンス → ⑤局所トーンマッピング（HDR/Log階調設計）をすべて専用ハードウェア回路で並列実行します。',
      'デュアルストリーム（ブラックアウトフリー）機構：センサーから届く膨大なデータをチップ入口で即座に「記録用高画質パイプライン」と「EVF表示用超低遅延パイプライン（120Hz/240Hz）」の2系統へ同時分岐。秒間120コマ連写中でもファインダーが一瞬たりとも暗転（ブラックアウト）しません！',
      '専用8K60pハードウェアコーデック：CPUで計算すると発熱と電池切れを起こす 8K RAW / 10-bit 4:2:2 HEVC / ProRes 圧縮を専用ASIC回路で極小消費電力のままリアルタイムエンコードします。',
    ],
    formula: {
      expression: '処理スループット R_pix = 50 MP × 30 fps = 1.5 Gigapixels/s （16bit時 ≈ 24 Gbps 内部パイプライン）',
      description: '専用パイプラインASICにより、汎用PCのCPUでは不可能な超低遅延・省電力リアルタイム現像を達成します。',
    },
    nextGenInnovation:
      '最新世代のISPは従来の4〜10倍の演算帯域を備え、秒間120回のAF/AE演算、120fpsグローバルシャッターRAW連写、8K60p内部RAW収録、そして次層の専用AI NPUとの超広帯域ダイ間連携を実現しています。',
    specs: [
      { label: '製造プロセス', value: '先端 4 nm / 5 nm クラス CMOS ロジック' },
      { label: '内部演算精度', value: '16-bit リニアパイプライン ＋ 3D-LUT 色空間' },
      { label: '主要ハードウェアIP', value: 'Dual-Stream ISP / 8K60p Codec / 8コアARM / SRAM' },
      { label: '最大処理性能', value: '最大 120 fps RAW連写・ブラックアウトフリー表示' },
    ],
    diagramType: 'mb_isp_die',
  },

  'mb-isp-interposer': {
    title: 'フリップチップBGA 有機サブストレート ＆ Cuピラー・マイクロバンプ層',
    subtitle: 'Flip-Chip BGA ABF Interposer Substrate, Cu Pillar Micro-Bumps & Solder Ball Grid',
    category: 'M05 / 先端半導体パッケージング',
    plainAnalogy:
      'ひとことで言うと「極小のチップと大きなマザーボードを数千本の電気の足でつなぐ“超精密な変換アダプタ”」。昔のチップのように横に細い線を張る代わりに、チップをひっくり返してお腹の下一面から数千個の小さなハンダの粒で直結します！',
    summary:
      '4nm ISPシリコンダイの微細な電極ピッチ（数十ミクロン）を、メインマザーボードの配線ピッチ（0.4 mm）へと段階的にファンアウト（再配線：RDL）する多層ABF（味の素ビルドアップフィルム）有機パッケージ基板とフリップチップ接合層。',
    opticsAndPhysics: [
      'フリップチップ（Flip-Chip）接合の物理学：従来の金線ワイヤーボンディングは長いループの寄生インダクタンス（L）が数GHzの高速信号を劣化させます。シリコンダイを裏返して銅ピラー・マイクロバンプで直下接続することで、配線長を数十ミクロンへ短縮し、LPDDR5XやSLVS-ECの超高速信号品質を劇的に向上させます。',
      'アンダーフィル樹脂の熱力学：シリコン（熱膨張係数 CTE ≈ 2.6 ppm/K）と有機基板（CTE ≈ 15 ppm/K）では温まったときの伸び方が約6倍違います。マイクロバンプのすき間にシリカ充填エポキシ樹脂（アンダーフィル）を毛細管現象で流し込んで固めることで、8K撮影時の加熱・冷却サイクルによるハンダ疲労破断を防ぎます。',
      'パッケージ上面（ダイのすぐ周囲）に極小01005サイズのシリコン・デカップリングコンデンサを配置し、ナノ秒単位の急激な電流変動（di/dt）へ瞬時に電荷を供給します。',
    ],
    formula: {
      expression: 'V_droop = L_loop · (di / dt)   （フリップチップで寄生インダクタンス L_loop を約 1/10 に削減）',
      description: 'チップ直下の最短経路接続により、GHz動作時の電源電圧降下と信号リンギングを劇的に抑えます。',
    },
    nextGenInnovation:
      '1,000〜2,000ピン級の高密度FC-BGAパッケージでは、10層以上の極薄ABFビルドアップ再配線層（RDL）と銅ピラーマイクロバンプにより、SoCの超広帯域メモリバスと高速シリアルI/Oを最小面積へ凝縮しています。',
    specs: [
      { label: 'パッケージ形式', value: 'FC-BGA（フリップチップ・ボールグリッドアレイ）' },
      { label: '基板絶縁材料', value: '多層 ABF ビルドアップ再配線層 (RDL)' },
      { label: '接合方式', value: 'Cuピラー・マイクロバンプ ＋ エポキシアンダーフィル' },
      { label: '外部端子数', value: '約 1,200 – 1,800 ピン（SnAgCu 無鉛ハンダボール）' },
    ],
    diagramType: 'mb_interposer',
  },

  'mb-ai-npu': {
    title: '専用AIプロセッシングユニット / NPU（シストリックアレイ深層学習エンジン）',
    subtitle: 'Dedicated AI / Deep-Learning Accelerator SoC (2D Systolic Array NPU)',
    category: 'M06 / リアルタイムAI認識・コンピュテーショナル撮影',
    plainAnalogy:
      'ひとことで言うと「写真に写る人間・動物・鳥・車の動きを“脳のように理解する”AI専門の相棒チップ！」。人間の骨格（頭・肩・肘・腰）を瞬時に見抜くので、後ろを向いたりヘルメットを被っていても瞳の位置を予測してピントを合わせ続けます！',
    summary:
      'メインISPとは独立して搭載された深層学習（ディープラーニング）専用アクセラレータ（Canon DIGIC Accelerator / Sony AIプロセッシングユニット系譜）。数千個の積和演算器（MAC）を格子状に並べた「シストリックアレイ」により、ニューラルネットワーク推論をミリ秒以下で実行します。',
    opticsAndPhysics: [
      'シストリックアレイ（Systolic Array）の秘密：AIの計算の9割以上は巨大な行列のかけ算・足し算（MAC：C += A × B）です。心臓の鼓動（Systole）のように、入力特徴マップとINT8量子化重みを格子状の演算ユニット（PE）間で隣へ隣へとバケツリレーしながら一斉計算することで、電力食いのDRAMアクセスを極限まで減らし、圧倒的なワット当たり演算性能（TOPS/W）を生み出します。',
      '姿勢推定（Pose Estimation）＆アクション優先AF：単なる「顔の色や形」ではなく、深層CNN/Transformerモデルが人体の骨格関節やスポーツの動き（サッカーのシュート・バスケのジャンプなど）を3次元的にリアルタイム解析。逆光・マスク・後ろ姿・手前を人が横切る場面でも主被写体を一切見失いません。',
      'カメラ内ディープラーニング画質革新：従来の数式フィルタでは解像感まで潰れていた高感度ノイズをAIが学習済みノイズ分布から分離除去する「ニューラルネットワークノイズ低減」や、24MP画像をカメラ内でディテール補完し96MP化する「カメラ内アップスケーリング」もこのNPUが実行します！',
    ],
    formula: {
      expression: 'NPU 演算性能 = 2 × N_MAC × f_clk   （INT8 量子化推論により FP32 比 4× 高速・低消費電力）',
      description: '重みをオンチップSRAMに常駐させ、シストリックアレイ全PEを毎クロック100%稼働させます。',
    },
    nextGenInnovation:
      '2024〜2026年の最大ブレイクスルーが「メインISP＋専用AIコプロセッサの2チップ協調アーキテクチャ」です。AF被写体認識（人・動物・鳥・昆虫・飛行機・列車・車）だけでなく、露出・ホワイトバランス推定やカメラ内AI超解像までAI化が進んでいます。',
    specs: [
      { label: '演算コア構造', value: '2D シストリックアレイ MAC エンジン ＋ オンチップSRAM' },
      { label: '推論データ形式', value: 'INT8 / BF16 量子化ニューラルネットワーク推論' },
      { label: 'AF/AE推論周期', value: '最大 60 – 120 Hz（リアルタイム骨格姿勢推定）' },
      { label: '応用機能', value: '姿勢推定AF・アクション優先・AIノイズ低減・4倍超解像' },
    ],
    diagramType: 'mb_ai_npu',
  },

  'mb-lpddr5x': {
    title: 'クワッドチャネル LPDDR5X-8533 超高速フレームバッファDRAM × 2基',
    subtitle: 'Dual Stacked LPDDR5X-8533 High-Bandwidth Burst & Pre-Capture Buffer DRAM',
    category: 'M07 / 超広帯域リングバッファメモリ',
    plainAnalogy:
      'ひとことで言うと「シャッターを押し続ける間、何百枚もの写真データを一時的に置いておく“超巨大な作業机”」。さらに『シャッターを全押しする1秒前の瞬間』までさかのぼって記録できる“プリ撮影（タイムマシン機能）”もこのメモリのおかげです！',
    summary:
      'ISPエンジンとAI NPUのすぐ隣（配線長わずか数 mm）に配置された2基の高密度マルチダイ積層LPDDR5X SDRAMパッケージ（合計 8〜16 GB 級）。毎秒60〜85 GBもの圧倒的なメモリ帯域で、120fps高速連写・プリ撮影リングバッファ・8K動画フレーム処理を支えます。',
    opticsAndPhysics: [
      'なぜカメラに巨大な超高速RAMが要るの？：5000万画素RAWを秒間30コマ撮ると、毎秒 1.5〜3.0 GB ものデータが一気に押し寄せます。メモリーカードへの書き込みが追いつくまでの間、このLPDDR5Xバッファが高速でデータを受け止めることで、連写速度を落とさず数百〜1,000枚以上の連続撮影が可能になります。',
      'プリ撮影（Pre-Capture）の仕組み：シャッター半押し中、LPDDR5X上に作られた「リングバッファ（ぐるぐる回る上書きメモリ）」へ常に最新0.5〜1.0秒分のRAW画像を記録し続けます。鳥が飛び立ったのを見てから全押しした瞬間、リングバッファに保存されていた“過去1秒間の決定的な瞬間”をカードへ永久保存します！',
      '16バンク並列＆低電圧駆動（0.5 V I/O）：LPDDR5Xはピン当たり最大 8.533〜10.7 Gbps の超高速伝送を極低消費電力で実現。基板上の等長蛇行配線（メアンダ）により、64bitデータ線の到着タイミング誤差をピコ秒単位で揃えています。',
    ],
    formula: {
      expression: 'メモリ帯域 BW = 8.533 Gbps/pin × 64 bit / 8 ≈ 68.3 GB/s   （8K60p + 120fps同時処理に余裕）',
      description: '超広帯域クワッドチャネル構成により、ISP現像・NPU推論・RAWバッファ保存が帯域競合せず並列動作します。',
    },
    nextGenInnovation:
      '2024〜2026年のプロ機では、LPDDR5/5Xの大容量化と高帯域化により、14-bit RAWでのプリ撮影（最大1秒前まで遡及）や、AIノイズ低減用の中間特徴マップ保持が実用化されています。',
    specs: [
      { label: 'メモリ規格', value: 'LPDDR5X-8533（マルチダイ積層 FBGA × 2）' },
      { label: '総メモリ帯域', value: '約 68.3 – 85.3 GB/s（クワッドチャネル）' },
      { label: '搭載容量（代表）', value: '8 GB – 16 GB（連写1,000枚＋プリ撮影リングバッファ）' },
      { label: '動作電圧', value: 'VDDQ 0.5 V 超低電圧・高効率駆動' },
    ],
    diagramType: 'mb_lpddr5x',
  },

  'mb-pmic-vrm': {
    title: '多相同期整流PMIC ＆ 大電流VRM電源供給網 (PDN)',
    subtitle: 'Multi-Phase Synchronous Buck PMIC, Ferrite Power Inductors & PDN Decoupling Bank',
    category: 'M08 / パワーエレクトロニクス・超低ノイズ電源',
    plainAnalogy:
      'ひとことで言うと「電池の電気を、それぞれのチップが欲しがるピッタリな電圧へ変身させる“超精密な変電所”」。7.2 Vのバッテリー電源を、チップ用の 0.75 V やレンズ用の 5 V など十数種類に一瞬で効率95%変換します！',
    summary:
      'メインPMIC（電源管理IC）、複数相の同期整流降圧（バック）コンバータ用DrMOS、6基の大型シールド・フェライトパワーインダクタ（チョークコイル）、および黄色ポリマー・タンタルコンデンサ＆MLCC群で構成されるメインボードの電力心臓部。',
    opticsAndPhysics: [
      '同期整流降圧（Synchronous Buck）の原理：バッテリーの 7.2 V を抵抗で下げると大半が熱になって無駄になります。そこで毎秒数百万回（1〜3 MHz）の超高速でMOSFETスイッチをON/OFFし、インダクタ（コイル）の磁気エネルギー蓄積とコンデンサの平滑化を使って、効率 92〜96% で 0.75 V / 15 A 級の大電流を作り出します。',
      'なぜ複数のコイル（多相：Multi-Phase）に分けるの？：4相のスイッチングタイミングを 90° ずつズラして運転すると、電流の波（リップル）が互いに打ち消し合い、4nmチップへ供給される電圧の揺れを 10 mV 未満の鏡のようなフラットさに安定化できます！',
      '動的電圧・周波数スケーリング（DVFS）：待機中はSoC電圧を 0.6 V へ下げてバッテリーを節約し、シャッター半押しや8K録画開始と同時にマイクロ秒で 0.85 V へブーストする賢い省電力制御を行います。',
    ],
    formula: {
      expression: 'V_out = D · V_in   （D = t_ON / T_sw：デューティ比、多相化で出力リップル ΔI 激減）',
      description: '例：V_in = 7.2 V から 4nm SoCコア電圧 V_out = 0.75 V を得る場合、D ≈ 10.4% を MHz 周期で精密PWM制御。',
    },
    nextGenInnovation:
      'USB-PD（Power Delivery）急速給電コントローラと統合され、外部モバイルバッテリーからの直接給電撮影と、電池残量低下時でもAFモーターや高速連写が落ちない高負荷過渡応答性を実現しています。',
    specs: [
      { label: '変換方式', value: '多相同期整流ステップダウン（Buck）DC-DC ＋ LDO' },
      { label: 'スイッチング周波数', value: '1.5 – 3.0 MHz（小型シールドフェライト採用）' },
      { label: '変換効率', value: 'ピーク 94 – 96%（低発熱設計）' },
      { label: '生成電源系統', value: '0.75V(SoC) / 0.5V(DRAM) / 1.8V / 3.3V / レンズ駆動電源' },
    ],
    diagramType: 'mb_pmic',
  },

  'mb-cfexpress': {
    title: 'デュアル CFexpress 4.0 Type B（PCIe Gen4 ×2）＆ SD UHS-II ストレージスロット',
    subtitle: 'Dual CFexpress 4.0 Type B (PCIe Gen4 x2 / NVMe 1.4c) & SDXC UHS-II Card Cage',
    category: 'M09 / 超高速NVMe不揮発性ストレージ',
    plainAnalogy:
      'ひとことで言うと「パソコンの超高速SSDをそのままカメラに差し込める“4GB/秒の超特急カード差し込み口”」。8K RAW動画や120コマ連写の莫大なデータを、まるで水道管全開のように一瞬で保存します！',
    summary:
      '基板右側面に実装された精密ステンレス鋼製デュアル・メモリーカードケージ。メインスロットにはPCIe Gen4 ×2レーン直結の **CFexpress 4.0 Type B**（理論最大 4,000 MB/s）、サブスロットには汎用性の高い **SDXC UHS-II**（またはデュアルCFexpress）を装備しています。',
    opticsAndPhysics: [
      'PCIe Gen4 + NVMe 1.4c プロトコルの威力：従来のSDカード（UHS-II、最大約312 MB/s）と違い、CFexpressはパソコンのNVMe SSDと完全に同じ **PCI Express Gen4** 高速シリアルバスでISPと直結しています。1レーンあたり 2 GB/s、Type Bの2レーンで理論 **4,000 MB/s（実測書込 3,400 MB/s超）** を叩き出します！',
      'なぜ 8K60p 12-bit RAW に必須なの？：8K60p RAW動画は1秒間だけで約 400〜700 MB（1分で約30〜40 GB！）ものデータを生み出し続けます。持続書き込み保証（VPG400 / VPG800 / VPG1600）に対応したCFexpressなら、コマ落ちゼロで無限に記録し続けられます。',
      'カード自体の発熱対策：CFexpress 4.0カードは最大 3 A 近く消費して発熱するため、ステンレス鋼ケージ全体がヒートスプレッダおよびEMIシールドを兼ねており、カード表面の熱をカメラフレーム側へ逃がします。',
    ],
    formula: {
      expression: 'PCIe Gen4 ×2 帯域 = 16 GT/s × 2 lanes × (128/130) / 8 ≈ 3.94 GB/s （SD UHS-II の約 12.6 倍!）',
      description: '128b/130b 高効率符号化と 85 Ω 差動インピーダンス整合配線により超高速・低エラー書込を実現。',
    },
    nextGenInnovation:
      'CFexpress 4.0規格ではPCIe Gen3→Gen4およびNVMe 1.3→1.4cへの刷新により、転送速度が2.0世代の2倍へ飛躍。連写後のバッファ解放待ち時間を事実上ゼロにし、撮影現場からPCへのデータ吸い上げ時間も半減します。',
    specs: [
      { label: 'スロット1規格', value: 'CFexpress 4.0 Type B（PCIe Gen4 ×2 / NVMe 1.4c）' },
      { label: '最大転送速度', value: '理論 4,000 MB/s（実測読込 ~3,700 / 書込 ~3,400 MB/s）' },
      { label: 'スロット2規格', value: 'SDXC UHS-II（最大 312 MB/s・同時バックアップ対応）' },
      { label: '信号整合', value: '85 Ω 差動ペア ＋ PCIe リドライバIC ＋ 放熱ケージ' },
    ],
    diagramType: 'mb_cfexpress',
  },

  'mb-imu-mcu': {
    title: '6軸水晶MEMSジャイロ/加速度IMU ＆ リアルタイムIBIS/レンズ協調制御MCU',
    subtitle: '6-Axis Quartz MEMS Gyro/Accelerometer IMU & Real-Time IBIS / Lens Servo MCU',
    category: 'M10 / 慣性計測・8.5段協調手ブレ補正制御',
    plainAnalogy:
      'ひとことで言うと「人間の手では絶対気づかないミクロな揺れを1秒間に2,000回も見張る“三半規管センサー＆運動神経チップ”」。手の震えを瞬時に計算し、ボディ内のセンサーとレンズ内の手ブレ補正を息ピッタリに動かしてピタッと止めます！',
    summary:
      'メイン基板上の防振スリット付きアイランドに実装された高精度6軸水晶MEMS慣性計測ユニット（3軸角速度ジャイロ＋3軸加速度計）と、5軸IBIS・レンズOIS・高速AFモーターをマイクロ秒応答で統括する専用リアルタイム制御マイコン（MCU）。',
    opticsAndPhysics: [
      'コリオリの力による角速度検出：MEMSジャイロの内部では、髪の毛より細い水晶／シリコンの音叉（振動子）が毎秒数万回振動しています。カメラが手ブレで回転（角速度 ω）すると、振動子に直角方向の **コリオリの力 F_c = −2m(ω × v)** が働き、その極微な静電容量・圧電変化から 0.001 度レベルの微小な傾きを検出します！',
      '6軸センサフュージョン＆2,000 Hz 閉ループPID制御：回転ブレ（Pitch / Yaw / Roll）を3軸ジャイロで、マクロ撮影時に効く平行移動ブレ（シフト X / Y）を3軸加速度計で同時検出し、カルマンフィルタで統合。毎秒2,000回の高速フィードバック制御で5軸IBISボイスコイルを駆動します。',
      'ボディ＋レンズ協調手ブレ補正（最大 8.5 段）：専用リアルタイムMCUがマウント電子接点を通じてレンズ側マイコンと高速通信し、「広角側の回転・シフトはボディ側IBIS、望遠側の大きな角度ブレはレンズ側OIS」へリアルタイムで最適分担します！',
    ],
    formula: {
      expression: 'F_coriolis = −2 m (ω × v)   ⇒   手ブレ補正量 Δx = f · tan(∫ ω dt) （最大 8.5 段補正）',
      description: '焦点距離 f が長い望遠レンズほどわずかな角度 ω で像が大きく動くため、IMU＋レンズ協調制御が不可欠です。',
    },
    nextGenInnovation:
      '最新フラッグシップでは、メインIMUの角速度情報だけでなく「撮像センサーの画像解析による動きベクトル」と「AI被写体位置（中央以外の隅にいる瞳）」を組み合わせ、画面周辺部の回転ブレまで抑え込む周辺協調IBIS（最大8.5段）を実現しています。',
    specs: [
      { label: '慣性センサー構成', value: '3軸水晶MEMSジャイロ ＋ 3軸低ノイズ加速度計 (6-DoF)' },
      { label: '制御ループ周期', value: '1,000 – 2,000 Hz（リアルタイムPID＋カルマンフィルタ）' },
      { label: '手ブレ補正性能', value: 'ボディ＋レンズ協調 最大 8.5 段（CIPA 2024規格）' },
      { label: '副次機能', value: '電子水準器・縦横自動回転・動画手ブレ補正メタデータ記録' },
    ],
    diagramType: 'mb_imu_mcu',
  },

  'mb-security-clock': {
    title: 'C2PA暗号署名セキュリティチップ（来歴証明）＆ 温度補償水晶発振器 (TCXO)',
    subtitle: 'C2PA Hardware Security Element (Content Credentials) & ±0.5 ppm TCXO Master Clock',
    category: 'M11 / 真正性暗号証明・超高精度クロック同期',
    plainAnalogy:
      'ひとことで言うと「『これはAI生成ではなく本当にカメラで撮った本物の写真です！』と撮影の瞬間に消えない電子ハンコを押す“金庫チップ”と、1年経ってもほぼ狂わない“超高精度な原子時計級メトロノーム”」です！',
    summary:
      '生成AI時代の報道・プロ撮影に不可欠となった **C2PA（Content Credentials）ハードウェア暗号署名セキュリティチップ** と、カメラ全体の動画フレーム・音声・高速通信の基準リズムを刻む **±0.5 ppm 温度補償水晶発振器（TCXO）** ＋バックアップスーパーキャパシタ。',
    opticsAndPhysics: [
      'C2PA ハードウェア来歴証明（暗号工学）：シャッターを切った直後、撮像データの暗号学的ハッシュ値（SHA-256）と撮影日時・機種・3D深度情報などを、耐タンパー性セキュリティチップ（HSE）内部の決して外へ取り出せない秘密鍵で **ECDSAデジタル署名** します。後から1ピクセルでも改ざん・AI合成されるとハッシュ値が不一致になり、瞬時に見抜けます！',
      'TCXO（温度補償水晶発振器）の物理学：普通の水晶振動子は気温が真冬（-10℃）から真夏（+50℃）へ変わると振動数が数十ppmズレてしまい、複数カメラで長時間収録した8K動画と外部レコーダーの音声が徐々にズレて（音ズレして）しまいます。TCXOは内部の温度センサーと可変容量ダイオードで周波数を自動補正し、誤差を **±0.5 ppm（1日動かしても 0.04 秒未満！）** に抑えます。',
      '低位相雑音（低ジッター）クロックは、SLVS-EC 10GbpsやHDMI 48Gbpsのアイパターン開口を広げ、高速データ通信のビットエラーを防ぐ縁の下の力持ちです。',
    ],
    formula: {
      expression: 'Sig = Sign_ECDSA(K_priv, SHA256(RAW || Meta))   /   |Δf / f₀| ≤ ±0.5 × 10⁻⁶ (TCXO)',
      description: 'ハードウェア隔離された秘密鍵 K_priv による撮影瞬間署名と、50万分の1以下の超高精度クロック安定度。',
    },
    nextGenInnovation:
      '2024〜2026年はC2PAハードウェア署名元年となり、Sony α1 II / α9 III、Canon EOS R1 / R5 II、Nikon Z系、Leica M11-Pなど主要フラッグシップがカメラ内電子署名に対応し、報道機関の真正性検証ワークフローへ直結しています。',
    specs: [
      { label: 'セキュリティ規格', value: 'C2PA Content Credentials / 耐タンパーHSE暗号IC' },
      { label: '暗号方式', value: 'ハードウェア隔離 ECDSA 秘密鍵 ＋ SHA-256 署名' },
      { label: 'マスタークロック', value: '±0.5 ppm 高安定 TCXO（位相雑音 -160 dBc/Hz）' },
      { label: 'RTCバックアップ', value: '高耐久電気二重層スーパーキャパシタ内蔵' },
    ],
    diagramType: 'mb_security_clock',
  },

  'mb-io-ports': {
    title: 'プロフェッショナル高速I/Oポート群（HDMI 2.1 / USB-C 10Gbps / 2.5GbE LAN / 音声）',
    subtitle: 'Full-Size HDMI 2.1 Type A, USB-C 10Gbps PD, 2.5GBASE-T Ethernet & 24-bit Audio I/O',
    category: 'M12 / 外部高速インターフェース・静電気保護',
    plainAnalogy:
      'ひとことで言うと「撮った写真や8K映像をテレビ・パソコン・報道局のサーバーへ一瞬で送り出す“高速インターチェンジ”」。雷や静電気のビリッ！から繊細なメインチップを守る避雷針（ESD保護）まで並んでいます！',
    summary:
      'メイン基板の左側面（グリップ反対側）に集約されたプロ仕様外部入出力ポート群。フルサイズ **HDMI 2.1 Type A**、**USB-C 3.2 Gen 2 (10 Gbps + USB-PD)**、報道現場向け **2.5GBASE-T 有線LAN（RJ45）**、金メッキ3.5 mmマイク／ヘッドホン端子と24-bit/96kHz低ノイズ音声コーデックICで構成されます。',
    opticsAndPhysics: [
      'HDMI 2.1 FRL（Fixed Rate Link）48 Gbps：従来のTMDS伝送を超え、4レーン×12 Gbps の超高速伝送で 8K60p や 16-bit RAW 映像を外部シネマモニター／レコーダーへ非圧縮出力。折れにくく確実なフルサイズType A端子を金属シェルで強固に基板固定しています。',
      '2.5GBASE-T 有線LAN ＆ 絶縁パルストランス：スポーツ報道や五輪会場では、撮った1秒後に世界中の通信社へFTP送信する即時性が命。RJ45内部の微小な磁気トランス（パルストランス）がカメラ本体と外部LANケーブルを電気的に絶縁（ガルバニック絶縁）し、ノイズや雷サージを遮断しながら毎秒2.5ギガビットで転送します。',
      'ESD（静電気放電）TVSダイオード保護：冬場にケーブルを挿す瞬間、指先から数千〜15,000 Vもの静電気が端子へ飛び込みます。各コネクタのわずか1 mm内側に超高速応答のTVS保護ダイオードを配置し、ナノ秒以下で静電気をグラウンドへ逃がして4nm ISPを守ります。',
    ],
    formula: {
      expression: 'HDMI 2.1 最大帯域 = 4 lanes × 12 Gbps = 48 Gbps   /   ESD 保護耐圧 ±15 kV (IEC 61000-4-2)',
      description: '超高速シリアル伝送と静電気サージ防護を両立するため、極低静電容量（< 0.3 pF）のTVS素子を使用。',
    },
    nextGenInnovation:
      'Canon EOS R5 IIの分解調査でも確認された通り、最新のフラッグシップでは破損しやすいHDMIポート周辺をサブボード化／強化ブラケット固定し、USB-C 10Gbpsテザー撮影＋USB-PD給電＋2.5GbE有線LANのトリプル高速接続を標準化しています。',
    specs: [
      { label: '映像出力', value: 'フルサイズ HDMI 2.1 Type A（最大 48 Gbps / 16-bit RAW出力）' },
      { label: 'データ・給電', value: 'USB Type-C 3.2 Gen 2（10 Gbps ＋ USB-PD 急速給電）' },
      { label: '有線ネットワーク', value: '2.5GBASE-T RJ45（絶縁パルストランス内蔵・高速FTP）' },
      { label: '音声入出力', value: '3.5 mm マイク/ヘッドホン ＋ 24-bit/96kHz 音声DAC/ADC' },
    ],
    diagramType: 'mb_io_ports',
  },

  'mb-rf-wifi': {
    title: 'Wi-Fi 6E / Wi-Fi 7 (2×2 MIMO) ＆ Bluetooth 5.3 無線RFモジュール・同軸給電',
    subtitle: 'Shielded Tri-Band Wi-Fi 6E/7 (2x2 MIMO) & Bluetooth 5.3 RF SiP Module with Coax Feed',
    category: 'M13 / 高周波無線通信 (RF)・MIMOアンテナ給電',
    plainAnalogy:
      'ひとことで言うと「撮ったその場でスマホやクラウドへ高画質写真を飛ばす“超高速ミニWi-Fiルーター”」。金属のカメラボディは電波を遮ってしまうため、極細の同軸ケーブルでボディ上部の窓（アンテナ）まで丁寧に電波を運びます！',
    summary:
      '6 GHz / 5 GHz / 2.4 GHz トライバンド **Wi-Fi 6E / Wi-Fi 7（2×2 MIMO）** および省電力 **Bluetooth 5.3** を極小シールドパッケージ（SiP）へ統合した高周波RFモジュールと、50 Ω 精密マイクロ同軸ケーブル（U.FL / IPEX金メッキコネクタ）。',
    opticsAndPhysics: [
      '2×2 MIMO（空間多重）と 6 GHz 帯の高速性：2本の独立アンテナから同時に異なるデータストリームを送信する 2×2 MIMO 技術と、電波混雑の少ない 6 GHz 帯（160 MHz / 320 MHz 広帯域チャネル）により、無線でも実効 1 Gbps 超の爆速RAW転送やライブ配信を実現します。',
      '50 Ω 特性インピーダンス整合とマイクロ同軸給電：カメラ筐体はマグネシウム合金（金属）で覆われているため、基板上では電波が外へ出られません。特性インピーダンスを厳密に 50 Ω に整合した極細同軸ケーブルを使い、反射損失（VSWR）を最小限に抑えながらグリップ部やペンタ部の樹脂ウィンドウ裏アンテナへ給電します。',
      'カメラ内ノイズとの共存：Bluetooth 5.3 は消費電力数ミリワットでスマホと常時接続し、GPS位置情報の自動記録や電源OFF時の画像自動転送ウェイクアップを担います。',
    ],
    formula: {
      expression: 'C = M · B · log₂(1 + SNR)   （2×2 MIMO：M=2 空間ストリームで無線容量を最大2倍化）',
      description: 'シャノン＝ハートレーの定理に基づき、広帯域 B（160/320 MHz）と空間多重 M=2 で無線伝送速度を最大化。',
    },
    nextGenInnovation:
      '最新世代（EOS R1 / R5 II / α1 II 世代）ではWi-Fi 6E（6 GHz帯）対応と2×2 MIMOデュアルアンテナにより、スタジアムやスタジオの混雑した電波環境下でも安定した高速FTP／クラウド直接アップロードを実現しています。',
    specs: [
      { label: '無線LAN規格', value: 'Wi-Fi 6E / Wi-Fi 7（2.4 / 5 / 6 GHz・2×2 MIMO）' },
      { label: '近距離無線', value: 'Bluetooth 5.3 LE（常時GPS連携・リモート起動）' },
      { label: '給電ライン', value: '50 Ω マイクロ同軸ケーブル × 2（U.FL / IPEX 金端子）' },
      { label: 'RF濾波回路', value: 'セラミック SAW / BAW バンドパスフィルタ内蔵' },
    ],
    diagramType: 'mb_rf_wifi',
  },

  'mb-hdi-pcb': {
    title: '12層エニーレイヤーHDIメインマザーボード基板（レーザーマイクロビア＆インピーダンス整合）',
    subtitle: '12-Layer Any-Layer HDI Motherboard PCB — Laser Microvias & Controlled Impedance',
    category: 'M14 / 超高密度多層プリント配線板',
    plainAnalogy:
      'ひとことで言うと「たった1.5 mmの板の中に12階建ての高速道路とエレベーターがぎっしり詰まった“カメラの神経ネットワーク都市”」。すべてのチップと部品を数千本の銅線とレーザーで開けた極小トンネルでつなぎます！',
    summary:
      'EVF光学トンネルや三脚座を避ける複雑な異形シルエットに設計された、カメラ全体の電子神経網である12層エニーレイヤーHDI（高密度相互接続）多層プリント基板。端面には12層の銅箔と低誘電損失樹脂（Low-Df）の積層構造が見えます。',
    opticsAndPhysics: [
      'エニーレイヤーHDI（Any-Layer High-Density Interconnect）とは？：通常の安価な基板はドリルで上から下まで貫通穴を開けるため、配線の邪魔になります。最新カメラのHDI基板は1層ごとにUVレーザーで直径わずか 50〜75 μm の極小穴（マイクロビア）を開けて銅メッキで埋め、好きな階同士を最短距離でつなぐ“12階建て直通エレベーター構造”により、1,500ピンのBGAチップを極小面積に収めています！',
      '特性インピーダンス整合（100 Ω / 85 Ω）とメアンダ等長配線：SLVS-EC（10 Gbps）やPCIe Gen4（16 GT/s）の信号はもはや電気というより“マイクロ波の波”として銅線を伝わります。配線幅・誘電率 Dk・グラウンド層までの距離をミクロン精度で管理して反射を防ぎ、基板上に描かれた波型（メアンダ）配線で複数レーンの到着時刻をピコ秒単位でピッタリ揃えています。',
      '低誘電損失材料（Low-Dk / Low-Df）：高周波信号が絶縁樹脂の中で熱になって減衰する誘電損失（tan δ）を抑えるため、Df ≈ 0.002–0.004 級の先端ハイスピード基板材料が採用されます。',
    ],
    formula: {
      expression: 'Z_diff ≈ (87 / √(ε_r + 1.41)) · ln(5.98 h / (0.8 w + t)) · (1 − 0.48 e^(−0.96 s/h))',
      description: '差動配線インピーダンス Z_diff を SLVS-EC=100 Ω ±5%、PCIe Gen4=85 Ω ±5% に厳密整合します。',
    },
    nextGenInnovation:
      '10〜14層エニーレイヤーHDI＋無電解ニッケル置換金（ENIG）表面処理＋0201/01005超微小チップ部品の両面高密度実装により、プロ用シネマカメラ並みの8K60p処理能力を小型ミラーレスの薄型ボディへ凝縮しています。',
    specs: [
      { label: '積層構造', value: '12層 エニーレイヤーHDI（逐次積層・低損失材料）' },
      { label: 'ビア加工', value: 'UVレーザー銅充填マイクロビア（径 50 – 75 μm）' },
      { label: 'インピーダンス管理', value: '100 Ω (SLVS-EC/HDMI) / 85 Ω (PCIe Gen4) ±5%' },
      { label: '基板厚・表面処理', value: '約 1.4 – 1.5 mm / 無電解金メッキ (ENIG)' },
    ],
    diagramType: 'mb_hdi_pcb',
  },

  'mb-b2b-connectors': {
    title: '高密度ボード間コネクタ ＆ ZIFフレキ群（SLVS-EC / EVF / LCD / レンズ / 上面ダイヤル）',
    subtitle: 'High-Density Board-to-Board SLVS-EC Mezzanine & ZIF FPC Connector Harness (12 Ports)',
    category: 'M15 / 体内高速神経ハーネス接続群',
    plainAnalogy:
      'ひとことで言うと「センサー・ファインダー・液晶画面・シャッター・レンズ・ダイヤルとメイン基板をつなぐ“十数か所の超精密コンセント”」。爪先より小さな白いロックレバーで、紙のように薄いオレンジ色の配線リボンをガッチリ挟み込みます！',
    summary:
      '実機分解調査（Canon R5 II / Sony α1 II等）でも約12系統確認される、カメラ全身のサブモジュールをメイン基板へ集約する0.3〜0.4 mm超狭ピッチB2Bメザニンコネクタ＆ZIF（ゼロ挿入力）フレキシブル基板コネクタ群。',
    opticsAndPhysics: [
      '80ピン・シールドSLVS-ECメザニンコネクタ：前面の5軸IBISイメージセンサーから折り返して届くU字型フレキを受け止める最重要コネクタ。両端と差動ペア間にグラウンドピンを交互配置（G-S-S-G配列）し、最大 160 Gbps 超のRAWデータ伝送でもクロストークを極小化します。',
      'ZIF（Zero Insertion Force）フリップロック機構：厚さわずか 0.1 mm の薄いポリイミドフレキをそのまま押し込むと曲がって断線します。白いLCP樹脂の精密アクチュエータ（蓋）を倒すことで、力を入れずに数十本の金メッキ端子を均一圧接するプロ仕様構造です。',
      'システム全身の神経結節点：944万ドット120Hz OLEDファインダー（EVF用MIPI-DSI）、背面バリアングル液晶、レンズマウント12ピン高速通信、シャッター駆動＆赤外線センサー、上面操作ダイヤル、バッテリー接点すべてがここへ集結します。',
    ],
    formula: {
      expression: 'G-S-S-G 差動コネクタ配列  ⇒  隣接ペア間クロストーク NEXT < −35 dB (@ 5 GHz)',
      description: '信号ペアの両脇をグラウンド端子で挟み込むことで、高密度コネクタ内でも綺麗なアイパターンを維持します。',
    },
    nextGenInnovation:
      '最新世代では金属EMIシールドシェル一体型の超低背（高さ 0.6–0.8 mm）ボード間コネクタが普及し、耐衝撃性（落下時のコネクタ外れ防止）と 10 Gbps/lane 超高速伝送を両立しています。',
    specs: [
      { label: '総接続ポート数', value: '12系統（SLVS-EC / EVF / LCD / レンズ / シャッター等）' },
      { label: '端子ピッチ', value: '0.30 – 0.40 mm 超狭ピッチ（金メッキ接触子）' },
      { label: 'センサー接続', value: '80ピン金属シールド高速B2Bメザニン（G-S-S-G配列）' },
      { label: 'ロック機構', value: 'バックフリップ式 ZIF 高耐熱LCP樹脂アクチュエータ' },
    ],
    diagramType: 'mb_b2b',
  },

  'mb-chassis-frame': {
    title: '前面熱分離マグネシウム構造フレーム ＆ グラウンド・シールドブラケット',
    subtitle: 'Front Thermal-Isolation Magnesium Structural Mid-Frame & EMI Grounding Bracket',
    category: 'M16 / 筐体骨格・センサー／基板間熱遮断壁',
    plainAnalogy:
      'ひとことで言うと「センサーの部屋とメイン基板の部屋を隔てる“丈夫な金属の壁”」。熱いメイン基板の熱が前のイメージセンサーへ伝わって写真にノイズが増えないように遮りつつ、カメラ全体が歪まないようガッチリ支えます！',
    summary:
      'イメージセンサー／5軸IBISユニット（前面）とメインマザーボード（背面）の間に挟み込まれる高剛性ダイカスト・マグネシウム合金製ミッドフレーム。構造支持・熱経路分離・EMI基準グラウンドの3役を担います。',
    opticsAndPhysics: [
      'センサー熱汚染の遮断（ダークノイズ防止）：イメージセンサーの暗電流ノイズは温度が約 6〜8 ℃ 上がるごとに2倍へ急増します！8K処理で高温になるメイン基板の熱がセンサー側へ逆流しないよう、この構造壁とエアギャップ・熱分離経路で「センサーの熱は前面・側面へ、ISPの熱は背面ベイパーチャンバーへ」と放熱ルートを分離設計します。',
      'マグネシウム合金（AZ91D等）の物性：アルミより約35%軽く、プラスチックより圧倒的に剛性・振動減衰能・熱伝導率（~70 W/m·K）・電磁遮蔽性が高いため、プロ用一眼カメラの内部骨格に最適です。',
      '中央の精密開口スリットはセンサーのU字型SLVS-ECフレキを通す最短通路であり、周囲の5点ステンレス・スタンドオフねじ座がメイン基板の反り（BGAハンダクラック原因）をゼロに抑えます。',
    ],
    formula: {
      expression: 'I_dark(T) ∝ T^(3/2) · exp(−E_g / 2 k_B T)   （センサー温度 +7 ℃ ごとに暗電流ノイズ約 2×）',
      description: 'ISPの発熱を構造壁でセンサーから熱分離することが、長時間露光や高感度撮影の画質を守る鍵になります。',
    },
    nextGenInnovation:
      '最新のハイブリッド動画・静止画フラッグシップでは、ミッドフレーム内部に銅インサートや三脚座直結の放熱ボスを一体成形し、ボディ剛性と8K60p連続撮影時の熱キャパシティを同時に最大化しています。',
    specs: [
      { label: '構造材質', value: 'チクソモールド／ダイカスト マグネシウム合金 (AZ91D)' },
      { label: '固定方式', value: '5点精密M1.6ステンレス・スタンドオフ ＋ EMI接地バネ' },
      { label: '重要機能', value: 'センサー／ISP間 熱逆流遮断・基準GND・基板反り防止' },
      { label: '中央スリット', value: 'SLVS-EC センサーフレキ最短通過ウィンドウ' },
    ],
    diagramType: 'mb_chassis',
  },

  // =========================================================================
  // Phase 12 Ultra-HD Mainboard Sub-Assemblies (M17–M30)
  // =========================================================================
  'mb-vapor-wick-core': {
    title: 'M17. ベイパーチャンバー内蔵・焼結多孔質銅毛細管ウィック＆凝縮柱マトリクス',
    subtitle: 'Internal Sintered Porous Copper Capillary Wick & Micro-Support Pillar Matrix',
    category: 'M17 / 二相気液循環・毛細管還流コア',
    plainAnalogy:
      'ベイパーチャンバーの銅板の中に隠れている「スポンジ状の極細銅パウダー層」です。熱いISPの上で蒸発して端っこで冷えて水に戻った液体を、重力に逆らって毛細管現象で再びISPの真上へ自動で吸い戻します。',
    summary:
      '薄型二相ベイパーチャンバー（M01）の真空密閉内部に収まる焼結銅パウダー多孔質ウィック層と微細銅支柱ピラー群。カメラを縦位置・逆さ持ちで撮影しても途切れない毛細管圧力により、8K60p連続発熱を面内全域へ超高速輸送します。',
    opticsAndPhysics: [
      '毛細管限界 ΔP_cap = 2σ·cos(θ)/r_eff により、粒径40〜70 μmの焼結銅粒子間隙が強力な液還流ポンプとして機能し、あらゆる姿勢角でドライアウトを防止。',
      '等間隔の銅マイクロ支柱ピラーが大気圧による真空容器の凹み（座屈）を防ぎつつ、蒸発面と凝縮面の熱伝導バイパスを形成します。',
      '内部封入された極微量の純水作動流体は減圧下で45〜55℃付近から相変化蒸発を開始し、単体銅板の約8〜12倍の実効熱拡散率を発揮します。',
    ],
    formula: {
      expression: 'ΔP_cap = 2σ·cosθ / r_pore ≥ ΔP_vapor + ΔP_liquid + ρgH  (k_eff ≈ 3,500–5,000 W/m·K)',
      description: '焼結銅毛細管ウィックの吸引圧が蒸気・液体圧力損失と重力を上回り、全姿勢で二相熱循環を維持。',
    },
    nextGenInnovation:
      '2024–2026年の超薄型0.45mm級マルチメッシュ＋焼結銅ハイブリッドウィック技術により、薄型ミラーレスボディでも8K RAW長回しを支える熱拡散容量を実現しています。',
    specs: [
      { label: 'ウィック構造', value: '焼結微細銅パウダー（粒径 40–70 μm）＋支持マイクロピラー' },
      { label: '作動流体', value: '減圧封入・超高純度脱気純水（二相気液相変化循環）' },
      { label: '実効熱伝導', value: '約 3,500〜5,000 W/m·K（無垢銅の約10倍）' },
      { label: '姿勢依存性', value: '全360°チルト・縦位置撮影対応（アンチグラビティ還流）' },
    ],
    diagramType: 'mb_vapor_wick_core',
  },

  'mb-rf-shield-bracket': {
    title: 'M18. 背面RFシールド構造ブラケット＆貫通型グラファイト熱転写テープ',
    subtitle: 'Rear RF Shield Structural Retaining Bracket & Threaded Heat-Transfer Tape',
    category: 'M18 / 電磁遮蔽・基板放熱＆背面構造保護',
    plainAnalogy:
      'Kolari VisionのSony A1 II・A7R VI分解でも最初にお目見えする「メイン基板を丸ごと押さえる大きな金属シールド枠」と、その枠のすき間を縫い通して熱を背面へ逃がす「黒い放熱テープ」です。',
    summary:
      'Sony A1 II／A7R VIの実際の分解調査で特徴的に確認された、メイン基板背面を4本の精密ねじで覆う高剛性ステンレスRFシールドブラケットと、ブラケット開口を通して熱を背面外装へ導く貫通型グラファイト熱転写テープ。',
    opticsAndPhysics: [
      '背面LCDモニター（M01背後）とメイン基板の間に金属ファラデーシールド壁を形成し、高速MIPI/LPDDR5Xのクロック放射ノイズがLCDタッチパネルやWi-Fiへ干渉するのを阻止します。',
      'ブラケットのスリットに熱転写テープを縫い通す構造により、振動でテープが剥がれても放熱経路が断たれず、背面マグネシウム筐体へ確実に熱を逃がします。',
      '4点締め付けにより、落下衝撃時のメイン基板たわみ（BGAクラック）を抑制する構造補強梁を兼ねています。',
    ],
    formula: {
      expression: 'SE_shield(1GHz) > 42 dB   ＋   R_th(PCB→RearFrame) < 1.8 K/W',
      description: '背面LCD〜メイン基板間の電磁隔離と機械補強・放熱橋渡しを1枚の精密プレス骨格で同時達成。',
    },
    nextGenInnovation:
      '最新世代のSonyフラッグシップでは、複数枚の分割シールドブラケットと多層熱転写テープを組み合わせ、整備性（モジュラー分解）と高密度放熱を両立しています。',
    specs: [
      { label: '材質構造', value: 'SUS304精密プレス RF遮蔽ブラケット（4点ねじ締結）' },
      { label: '放熱経路', value: 'ブラケット貫通型・高熱伝導グラファイト熱転写テープ' },
      { label: '遮蔽効果', value: '> 42 dB（LCDタッチノイズ＆RF放射相互干渉防止）' },
      { label: '実機出典', value: 'Sony A1 II / A7R VI 分解構造（Kolari Vision調査準拠）' },
    ],
    diagramType: 'mb_rf_shield_bracket',
  },

  'mb-hdmi-daughterboard': {
    title: 'M19. モジュラー独立HDMI 2.1（48Gbps FRL）ドーターボード＆リドライバIC',
    subtitle: 'Modular Removable HDMI 2.1 (48 Gbps FRL) Daughterboard, Redriver IC & ZIF Flex',
    category: 'M19 / 独立交換型・超高帯域映像出力モジュール',
    plainAnalogy:
      '動画撮影で一番抜き差しが多くて壊れやすいフルサイズHDMI端子を、メイン基板から切り離して「2本のネジだけで交換できる小さな独立基板」にしたプロ仕様の整備設計です。',
    summary:
      'Canon EOS R5 Mark IIの実機分解（Kolari Vision調査）で高く評価された、メイン基板と別体化された独立型フルサイズHDMI 2.1（Type A）ドーターボード。48 Gbps FRL信号波形を整える専用リドライバIC・TVS保護アレイ・2点固定ねじ・高速シールドFPCで構成されます。',
    opticsAndPhysics: [
      '外部モニターやリグ配線で強いこじり荷重がかかりやすいHDMIポートを独立ドーターボード化することで、万一の端子破損時でも高価なメインマザーボード全交換を回避できます。',
      '8K60p RAWや4K120p 12bit出力では1レーン12 Gbps×4の超高周波信号が走るため、端子直近にイコライザ内蔵リドライバICを配置し、長いHDMIケーブルでもアイ開口を確保します。',
      '超低容量（<0.25 pF）TVSダイオードアレイがホットプラグ時の静電気サージから4nm ISPのHDMI PHYを保護します。',
    ],
    formula: {
      expression: 'BW_FRL = 4 lanes × 12 Gbps = 48 Gbps   (C_TVS < 0.25 pF, 差動100Ω ±5%)',
      description: '独立ドーターボード構造で機械的保守性を確保しつつ、リドライバICで48Gbps FRL波形品位を維持。',
    },
    nextGenInnovation:
      '近年の動画ハイブリッド機では、故障リスクの高いフルサイズHDMI Type A端子をメイン基板から分離モジュラー化する設計がプロ現場のダウンタイム削減に大きく貢献しています。',
    specs: [
      { label: '規格帯域', value: 'フルサイズ HDMI 2.1 Type A（48 Gbps FRL / 8K RAW出力）' },
      { label: '信号整形', value: '内蔵EQ 4ch 12Gbps HDMI 2.1 リドライバIC ＋ 低容量TVS' },
      { label: '固定方式', value: '独立2点ステンレスねじ ＋ 差動インピーダンス制御FPC' },
      { label: '保守性', value: 'メイン基板非交換でのポート単体リペア対応' },
    ],
    diagramType: 'mb_hdmi_daughterboard',
  },

  'mb-audio-jack-board': {
    title: 'M20. 独立3.5mm音声ジャック＆24bit/96kHz オーディオADC/DACサブ基板',
    subtitle: 'Shielded 3.5mm Mic/Headphone TRS Jack Sub-Board, 24-Bit Codec & Cover Bracket',
    category: 'M20 / 低ノイズ分離アナログ音声インターフェース',
    plainAnalogy:
      'マイクとヘッドホンの丸い差し込み口を、ノイズの多いデジタル脳みそ（ISP）から離して金属カバーで囲った「静かな独立サウンド基板」です。サーッという雑音（ホワイトノイズ）を徹底的に減らします。',
    summary:
      'Sony A7R VI分解で確認された2点固定金属カバー付き独立音声ジャックユニット。金メッキ3.5mm TRSマイク入力（プラグインパワー対応）＆ヘッドホンモニター出力、専用24-bit/96kHz低ノイズオーディオADC/DACコーデック、およびアナログ専用グラウンド分離フィルタを実装します。',
    opticsAndPhysics: [
      'マイク入力は数ミリボルト（mV）の極微弱アナログ信号であるため、高速デジタル処理を行うメイン基板から物理分離＆金属シールドすることで電源リップルやクロック飛び込みを−100 dB以下へ抑えます。',
      'プラグインパワー供給回路には超低ノイズLDOとインラッシュ制限回路を備え、コンデンサーマイク着脱時のポップノイズを防止。',
      '高出力ヘッドホンアンプは収録現場の騒音下でも32Ωモニターヘッドホンを低歪み（THD+N < 0.003%）で駆動します。',
    ],
    formula: {
      expression: 'DR_audio = 20·log₁₀(2²⁴) → 実測 SNR ≥ 104 dB (A-weighted),  THD+N < 0.003%',
      description: 'デジタル基板からの物理分離と専用金属シールドにより、収録レベルの低フロアノイズ音声入力を実現。',
    },
    nextGenInnovation:
      'マルチインターフェースシュー経由のデジタル4ch音声（24bit）と、独立サブ基板の低ノイズ3.5mmアナログ入力のハイブリッド運用により、外部レコーダー不要のシネマ収録を支えます。',
    specs: [
      { label: '入出力端子', value: '金メッキ 3.5mm ステレオマイク（PIP対応）＋ ヘッドホン出力' },
      { label: '変換精度', value: '専用 24-bit / 96 kHz 低ノイズ オーディオADC/DAC コーデック' },
      { label: 'ノイズ対策', value: '2点固定ステンレス遮蔽カバー ＋ 分離アナログGNDプレーン' },
      { label: 'ダイナミックレンジ', value: 'SNR ≥ 104 dB（A特性・超低フロアノイズプリアンプ）' },
    ],
    diagramType: 'mb_audio_jack_board',
  },

  'mb-wifi-mimo-antennas': {
    title: 'M21. Wi-Fi 6E/7（2×2 MIMO）セラミックパッチアンテナ＆金編組極細同軸群',
    subtitle: 'Dual-Band 2.4/5/6 GHz Ceramic MIMO Patch Antennas & Gold-Braided U.FL Coax Cables',
    category: 'M21 / 空間ダイバーシティ・超高速無線伝送アンテナ',
    plainAnalogy:
      'マグネシウムの金属ボディは電波を遮ってしまうため、電波が通り抜けやすいカメラ上部の樹脂窓まで「極細の金色ケーブル」で2本の高性能セラミックアンテナを伸ばして、写真を秒速でスマホやFTPへ飛ばします。',
    summary:
      'M13のWi-Fi 6E/7 RF SiPからU.FLコネクタ経由でボディ上部の非金属RF透過ウィンドウへ配線された2系統（2×2 MIMO）高誘電セラミックパッチアンテナと、特性インピーダンス50Ωの極細金編組マイクロ同軸ケーブル群。',
    opticsAndPhysics: [
      'マグネシウム合金外装は完全な電磁遮蔽体（ファラデーケージ）となるため、アンテナ素子をトップデッキ裏の電波透過樹脂窓へ分離配置し、極細50Ω同軸ケーブルでRF基板と低損失接続します。',
      '2本のアンテナを直交偏波＆波長間隔（λ/2以上）で離して配置する2×2 MIMO空間ダイバーシティにより、スタジアムや報道現場のマルチパス環境でも安定したGbps級FTP伝送を維持。',
      '金メッキ編組シールド同軸（外径0.81 mm）が6 GHz帯の伝送損失を最小化しつつ、メイン基板のデジタルノイズ拾い込みを完全に防ぎます。',
    ],
    formula: {
      expression: 'Z₀ = 50 Ω ± 2 Ω,   C_MIMO = N_stream · B · log₂(1 + SNR)  (最大 2.4 Gbps 級)',
      description: '直交配置2×2 MIMOアンテナと50Ω低損失マイクロ同軸により、報道現場での高速RAW即時送信を実現。',
    },
    nextGenInnovation:
      'Sony A7R V/A1 II等の実機分解でもトップパネル着脱時に必ず現れる2本の極細同軸ケーブルを忠実に再現し、金属筐体カメラにおけるRFアンテナ設計の妙を可視化しています。',
    specs: [
      { label: '対応帯域', value: '2.4 GHz / 5 GHz / 6 GHz トライバンド（Wi-Fi 6E/7 ＋ BT 5.3）' },
      { label: 'アンテナ素子', value: '高誘電セラミックチップ＋LDS樹脂一体パッチアンテナ × 2基' },
      { label: '給電線', value: '外径0.81 mm 50Ω 金編組マイクロ同軸 ＋ U.FL/IPEX端子' },
      { label: 'ダイバーシティ', value: '2×2 MIMO 直交偏波配置（マルチパス耐性強化）' },
    ],
    diagramType: 'mb_wifi_mimo_antennas',
  },

  'mb-nfc-coil': {
    title: 'M22. 13.56 MHz NFC（Type-3）平面銅コイルアンテナ＆フェライト磁性シート',
    subtitle: '13.56 MHz NFC Planar Copper Coil Antenna & High-Permeability Ferrite Backing Sheet',
    category: 'M22 / ワンタッチ近距離無線ペアリング機構',
    plainAnalogy:
      'スマートフォンをカメラのグリップ横にポンとかざすだけでWi-Fi接続や画像転送が始まる「うず巻き状の銅コイル」と、後ろの金属ボディに磁力が吸い取られないよう跳ね返す「黒いフェライト磁石シート」です。',
    summary:
      'グリップ側面外皮直下に配置される13.56 MHz NFC（FeliCa／NFC-A/B対応）多層プリント銅コイルと、高透磁率アモルファス・フェライト磁性シールドシート。',
    opticsAndPhysics: [
      '金属（マグネシウム筐体）のすぐ近くに13.56 MHzループコイルを置くと渦電流損失で共振が崩れ通信不能になります。高透磁率フェライトシート（μ_r ≈ 120）を背面に貼ることで磁束を金属から迂回させ、確実な誘導結合を実現します。',
      'LC並列共振回路のQ値と共振周波数（13.56 MHz ± 50 kHz）をトリミングし、スマホ側リーダーからの微弱磁界で無給電起動・ペアリング情報をやり取りします。',
    ],
    formula: {
      expression: 'f_0 = 1 / (2π√(L·C)) = 13.56 MHz,   Φ_link = μ_eff · N · I · A / l',
      description: 'フェライト背面シートでマグネシウム筐体の渦電流を遮断し、13.56 MHzの確実なワンタッチ結合を確保。',
    },
    nextGenInnovation:
      'BLE常時低消費電力ペアリングと併用することで、現場でのスマートフォン連携・タイムコード同期・カメラ設定クローニングを一瞬で完了できます。',
    specs: [
      { label: '動作周波数', value: '13.56 MHz（ISO/IEC 14443 / 18092 / NFC Forum Type 3）' },
      { label: 'コイル構造', value: 'フレキシブル基板エッチング 6ターン平面銅スパイラルコイル' },
      { label: '磁性遮蔽', value: '高透磁率シンタード・フェライト背面シート（渦電流防止）' },
      { label: '配置位置', value: '右手グリップ／カードドア側面（非金属エラストマー直下）' },
    ],
    diagramType: 'mb_nfc_coil',
  },

  'mb-usb-pd-ctrl': {
    title: 'M23. USB-PD 3.1（45W EPR）電力制御IC＆双方向保護ロードスイッチ回路',
    subtitle: 'USB Power Delivery 3.1 Controller IC, Dual Back-to-Back MOSFETs & CC Protection',
    category: 'M23 / 高速充電・外部給電インテリジェント制御',
    plainAnalogy:
      'モバイルバッテリーやACアダプタをUSB-Cにつないだ瞬間、「何ボルト・何アンペアまで安全に受け取れるか」を相手と高速交渉し、電圧異常があれば0.001秒で電気を遮断する「電気の関所」です。',
    summary:
      'USB Type-Cポート直近に実装されるUSB-PD 3.1（Programmable Power Supply対応）プロトコルコントローラIC、逆流防止バック・トゥ・バックPower MOSFET対、および過電圧・過電流保護（OVP/OCP）ロードスイッチ群。',
    opticsAndPhysics: [
      'CC1/CC2通信ライン上でBMC（Bi-phase Mark Coding）パケットをやり取りし、5V〜15V/3A（最大45W級）の最適プロファイルを動的にネゴシエーション。撮影しながらのバッテリー急速充電と外部給電連続8K収録をシームレスに切り替えます。',
      '2個の低オン抵抗（R_DS(on) < 12 mΩ）MOSFETを背中合わせに直列配置することで、バッテリー側からUSB-Cポートへの逆流放電と、粗悪充電器接続時の24V過電圧印加を確実にブロックします。',
    ],
    formula: {
      expression: 'P_PD = V_bus × I_bus ≤ 15 V × 3 A = 45 W,   P_loss = I² · 2·R_DS(on) < 0.22 W',
      description: '超低損失MOSFETとインテリジェントPDネゴシエーションにより、発熱を抑えつつ大電力外部給電を実現。',
    },
    nextGenInnovation:
      '最新フラッグシップではUSB-PDによる外部給電＋10 Gbps UVC/UACストリーミング＋Ethernetテザリングを1本のUSB-Cケーブルで同時動作させる電源管理が標準化しています。',
    specs: [
      { label: '対応規格', value: 'USB Power Delivery 3.1 + PPS（5V/9V/12V/15V 動的交渉）' },
      { label: '保護素子', value: '双方向逆流防止 Dual N-MOSFET（R_DS(on) < 12 mΩ）' },
      { label: '安全機能', value: 'OVP（過電圧）/ OCP（過電流）/ OTP（過熱）マイクロ秒遮断' },
      { label: '通信線保護', value: 'CC1/CC2 24V耐圧・VBUSショート保護IC' },
    ],
    diagramType: 'mb_usb_pd_ctrl',
  },

  'mb-nor-flash-eeprom': {
    title: 'M24. 512Mb Octal-SPI NORファームウェアFlash＆個体別校正データEEPROM',
    subtitle: '512 Mb Octal-SPI NOR Boot Firmware Flash & Factory Calibration Serial EEPROM',
    category: 'M24 / 超高速ブートOS＆工場光学・画素欠陥校正ROM',
    plainAnalogy:
      '電源を入れた瞬間に0.4秒でカメラを目覚めさせる「OS記憶チップ（NORフラッシュ）」と、工場で1台ずつ測定した「センサーのクセ・シャッター速度微調整・手ブレ補正の基準値」を永久保存している専用カルテ（EEPROM）です。',
    summary:
      'メインISPの即時XIP（Execute-In-Place）起動を担う512 Mb Octal-SPI（200 MHz DDR）高速NORフラッシュメモリと、撮像素子の画素欠陥マップ・色温度基準・IBISゲイン・シャッター幕速補正テーブルを不揮発保持する高信頼シリアルEEPROMのデュアルROM構成。',
    opticsAndPhysics: [
      'NANDフラッシュと異なりランダム読出レイテンシが極めて小さいOctal-SPI NORフラッシュ（400 MB/s）を採用することで、電源ONから初回レリーズまで約0.4秒というプロ必須の超高速起動を達成します。',
      '工場出荷時に全数測定された撮像センサー個別のダークシェーディング・位相AFピクセル位置・シャッター幕速バラツキ係数はEEPROMへ暗号化格納され、20年以上のデータ保持信頼性を持ちます。',
    ],
    formula: {
      expression: 'BW_OctalSPI = 8 bit × 200 MHz × 2 (DDR) = 400 MB/s  →  起動時間 t_boot ≈ 0.4 s',
      description: '400 MB/sのDDR Octal-SPIブートと個体別工場校正ROMにより、瞬時起動と出荷時精度の長期維持を保証。',
    },
    nextGenInnovation:
      'デュアルバンクA/Bパーティション構造を備え、ファームウェア更新中に万一バッテリーが抜けても自動で旧バンクへフェイルセーフ復帰するプロ仕様の耐障害性を実装しています。',
    specs: [
      { label: '主記憶ROM', value: '512 Mb Octal-SPI DDR NOR Flash（400 MB/s・A/B冗長構成）' },
      { label: '校正ROM', value: '高耐久 1 Mb シリアルEEPROM（書換100万回・データ保持40年）' },
      { label: '格納データ', value: 'RTOSファーム・AI認識重み・画素欠陥＆シャッター個体校正値' },
      { label: 'パッケージ', value: '耐振動・低背 WSON-8 / BGA-24 高信頼パッケージ' },
    ],
    diagramType: 'mb_nor_flash_eeprom',
  },

  'mb-rtc-coin-cell': {
    title: 'M25. 内蔵ML414充電式RTCバックアップボタン電池＆金メッキ保持バネ',
    subtitle: 'Rechargeable ML414 Lithium-Manganese RTC Backup Coin Cell & Gold Spring Holder',
    category: 'M25 / 電源断時の時計・設定・タイムコード保持電源',
    plainAnalogy:
      'メインのバッテリーを抜いて何週間しまっておいても、日付や時刻・カスタム設定が消えないようにメイン基板の上で静かに電気を蓄え続けている「直径4mmの極小充電式ボタン電池」です。',
    summary:
      'M11の±0.5 ppm TCXO（水晶発振器）およびリアルタイムクロック（RTC）回路へ常時マイクロアンペアの待機電力を供給し続ける、耐熱リフロー対応ML414二次リチウムマンガンボタン電池・金メッキ弾性保持ホルダー・トリクル充電抵抗回路。',
    opticsAndPhysics: [
      'メインバッテリー装着時に約3.0 Vへ微弱電流（数10 μA）でトリクル充電され、メインバッテリーを取り外した後もRTC消費電流（< 0.5 μA）のみで約3〜6か月間にわたり正確な年月日・撮影時刻・カスタムメニュー設定を維持します。',
      '複数台カメラのタイムコード同期収録やC2PA撮影時刻の真正性担保（改ざん防止メタデータ）において、時刻飛びを防ぐ不可欠のバックアップ電源です。',
    ],
    formula: {
      expression: 't_hold = Q_ML414 / I_RTC ≈ 1.2 mAh / 0.5 μA ≈ 2,400 hours (約100日以上)',
      description: 'わずか直径4.8mmの二次電池と0.5μA超低消費RTCの組合せで、バッテリー無装着でも長期間時刻を保持。',
    },
    nextGenInnovation:
      '鉛フリー高温リフロー対応セルと高耐食金メッキ接点クリップにより、寒冷地から高温多湿環境まで10年超のカメラ寿命に寄り添う信頼性を実現しています。',
    specs: [
      { label: '電池規格', value: 'ML414 充電式リチウムマンガン二酸化物セル（3.0 V / 1.2 mAh）' },
      { label: '消費電流', value: 'RTC待機時 < 0.5 μA（バッテリー抜去後 約3か月以上保持）' },
      { label: '保持構造', value: '金メッキリン青銅スプリングホルダー ＋ 逆流防止ダイオード' },
      { label: '役割', value: '日時・カスタム設定・C2PA電子署名タイムスタンプ基準維持' },
    ],
    diagramType: 'mb_rtc_coin_cell',
  },

  'mb-motor-driver-soc': {
    title: 'M26. 6chフルブリッジ統合モータードライバーSoC＆電流検出シャント抵抗群',
    subtitle: '6-Channel Full-Bridge IBIS/Shutter/Lens Power Driver SoC & Current-Sense Shunts',
    category: 'M26 / 電磁アクチュエータ高効率PWM大電流駆動',
    plainAnalogy:
      '5軸手ブレ補正の磁石コイルやシャッター巻き上げモーターへ、毎秒数万回の超細かいパルス電気を送り込んで「0.001mm単位の力加減」を操る、カメラ内の筋肉コントローラICです。',
    summary:
      '5軸IBIS（X/Y/Roll 3ch VCMコイル）・シャッターチャージDCモーター・電磁ブースト＆パークロックソレノイドを1チップで高効率PWM駆動する6ch統合HブリッジドライバーSoCと、±0.5%精度の低抵抗マンガン銅電流検出シャント抵抗アレイ。',
    opticsAndPhysics: [
      '100 kHz超の超音波域PWMキャリア周波数でVCMコイルを電流帰還制御（クローズドループ）することで、動画収録時にマイクへ乗るコイル鳴き（可聴域スイッチング音）を完全に排除します。',
      '20 mΩの精密金属箔シャント抵抗で各チャンネルの実電流をリアルタイム測定し、コイル発熱による抵抗増加（銅温度係数 +0.39%/K）を即座補償して8.5段IBISの推力直線性を維持します。',
    ],
    formula: {
      expression: 'F_Lorentz = B · L · I_sense   (I_sense = V_shunt / 20 mΩ,  f_PWM > 100 kHz 無音域)',
      description: 'シャント電流帰還と超音波PWMにより、無音かつ温度ドリフトゼロの電磁推力制御を達成。',
    },
    nextGenInnovation:
      '低抵抗DMOSパワートランジスタを熱露出パッド（Exposed Thermal Pad）経由でメイン基板の内層銅ベタへ直結し、連写・長回し動画でも熱暴走しない大電流駆動を実現しています。',
    specs: [
      { label: '駆動出力', value: '6ch 独立フルHブリッジ（最大 3.5 A/ch ピークパルス対応）' },
      { label: '制御方式', value: '100 kHz超 超音波無音PWM ＋ 電流帰還サーボ制御' },
      { label: '電流検出', value: '20 mΩ ±0.5% 低TCR金属箔シャント抵抗アレイ' },
      { label: '駆動対象', value: '5軸IBIS VCM × 3ch ＋ シャッターチャージ・ロック機構' },
    ],
    diagramType: 'mb_motor_driver_soc',
  },

  'mb-cfx-heat-plate': {
    title: 'M27. CFexpress 4.0専用・銅製放熱スプレッダー板＆高熱伝導シリコーンパッド',
    subtitle: 'Dedicated CFexpress 4.0 NVMe Copper Thermal Spreader Plate & High-k Silicone Pad',
    category: 'M27 / 8K RAW連続書込・メディア過熱サーマルスロットリング防止',
    plainAnalogy:
      '8K動画をすごいスピードで書き込み続けるとメモリーカード自体がホカホカに熱くなるため、カードスロットの真上に「銅の冷えピタ板」を貼り付けて、カードの熱をボディへ逃がして書き込み速度低下を防ぐパーツです。',
    summary:
      'PCIe Gen4 ×2（最大4 GB/s）で8K RAW／120fps連写を連続記録するCFexpress 4.0 Type Bカードケージ（M09）背面へ密着する専用C1100銅製放熱プレートと、6.0 W/m·K柔軟シリコーン熱界面パッド。',
    opticsAndPhysics: [
      'CFexpress Type Bカード内蔵のNVMeコントローラは連続4 GB/s書込時に約3〜4 W発熱し、カード温度が70℃を超えるとサーマルスロットリングが発動して録画が途切れます。',
      'ステンレス製カードケージ上面に高熱伝導パッド経由で銅スプレッダーを圧着し、熱をグリップ側のマグネシウムフレームへ分散させることでカード温度を約10〜14℃低減します。',
    ],
    formula: {
      expression: 'ΔT_card = P_NVMe · (t_pad / (k_pad · A) + R_Cu)  →  カード表面温度 −12 ℃ 改善',
      description: 'NVMeカードの発熱を専用銅スプレッダーでボディ側へ逃がし、8K RAWの連続記録耐性を飛躍的に向上。',
    },
    nextGenInnovation:
      'CFexpress 4.0時代に入りカード自体が小型SSD並みの発熱源となったため、最新フラッグシップではISPだけでなくカードスロット専用の熱設計が必須パーツとなっています。',
    specs: [
      { label: '放熱板', value: 'C1100無酸素銅 プレス成形スプレッダープレート（t = 0.5 mm）' },
      { label: '熱界面材', value: '柔軟高熱伝導シリコーンTIMパッド（6.0 W/m·K）' },
      { label: '冷却効果', value: '8K RAW連続書込時のCFexpressカード温度を約10–14℃低減' },
      { label: '配置位置', value: 'M09 CFexpress 4.0 Type B ケージ直上（背面側）' },
    ],
    diagramType: 'mb_cfx_heat_plate',
  },

  'mb-power-inductor-bank': {
    title: 'M28. 基板前面（+Z面）大電流6相モールド合金パワーインダクタ＆MLCCバンク',
    subtitle: 'Front-Side 6-Phase Molded-Alloy Power Inductor & Low-ESR Bulk Capacitor Bank',
    category: 'M28 / 両面高密度実装・大電流瞬時応答電源フィルタ',
    plainAnalogy:
      '120コマ連写や4基のリニアモーターが一斉に動いた瞬間に電気が一瞬足りなくならないよう、基板の表側（センサー側）にずらっと並べられた「電気の貯水タンク（コンデンサ）と整流コイル（インダクタ）」の列です。',
    summary:
      '12層Any-Layer HDIメイン基板（M14）の前面側（+Z面）へ高密度実装される6相メタルコンポジットパワーインダクタ群と、超低ESR導電性高分子タンタル＋積層セラミックコンデンサ（MLCC）バルクデカップリングバンク。',
    opticsAndPhysics: [
      '4nm ISP＋AI NPUは120fps処理のフレーム境界で数マイクロ秒の間に消費電流が1 Aから12 A超へ急変（di/dt > 20 A/μs）します。メイン基板裏表の直下ビア経由で低ESLコンデンサバンクを配置することで電源電圧ドロップ（ΔV = L·di/dt）を±15 mV以内へ抑えます。',
      '鉄系アモルファス合金粉でコイル巻線を完全モールド封止した磁気シールド型インダクタを採用し、すぐ前にあるイメージセンサーへの磁束漏洩を極限まで低減しています。',
    ],
    formula: {
      expression: 'ΔV_droop = L_loop · (di/dt) + ESR · ΔI < 15 mV   (10 A/μs 過渡応答)',
      description: 'ISP直下の裏面バルクフィルタ配置と閉磁路インダクタにより、電圧降下と磁気ノイズを同時封殺。',
    },
    nextGenInnovation:
      '両面高密度実装（背面SoC＋前面直下電源フィルタ）により、極小カメラボディにノートPC級の多相電源インテグリティ（PI）を凝縮しています。',
    specs: [
      { label: 'インダクタ', value: '閉磁路メタルコンポジット パワーインダクタ（0.47 μH / 12 A）× 6相' },
      { label: '平滑容量', value: '低ESR高分子タンタル（100 μF）＋ 高耐圧0402 MLCCアレイ' },
      { label: '配置戦略', value: 'M14 HDI基板前面側（ISP・NPU直裏最短ビア直結）' },
      { label: '磁気対策', value: '完全シールドモールド構造（撮像素子への漏洩磁界抑制）' },
    ],
    diagramType: 'mb_power_inductor_bank',
  },

  'mb-perimeter-ribbons': {
    title: 'M29. メイン基板外周12系統＆基板裏面回り込みシールドFPCリボンハーネス群',
    subtitle: '12-Branch Mainboard Perimeter & Under-Board Wrap-Around Shielded FPC Ribbon Harness',
    category: 'M29 / 全サブシステム統合神経網（A1 II / R5 II実機構造）',
    plainAnalogy:
      'カメラを分解するとメイン基板の四方八方（さらに基板の裏側まで回り込んで！）にびっしり繋がっている「12本の極薄オレンジ色リボン神経網」。EVF・背面ボタン・ダイヤル・シャッター・マウントの全情報をメイン基板へ集約します。',
    summary:
      'Kolari VisionのSony A1 IIおよびCanon R5 Mark II実機分解で詳細に報告された、メイン基板周囲および背面下へ回り込んで接続される12系統の高密度ポリイミドFPCリボンケーブル集合体。EMI遮蔽フィルム付き高速差動リボンと屈曲耐性ポリイミド帯で構成されます。',
    opticsAndPhysics: [
      '基板外周の四辺（上：EVF・トップダイヤル、右：I/O・マウント、左：カードドア・グリップ、下：背面パネル・LCD）と裏面回り込みルートへ立体的かつ最短で配線することで、12層基板の面積を極小化します。',
      '各リボン先端にはレーザー加工の位置決め耳タブと0.3 mmピッチ金メッキ接触指を備え、M15のZIFコネクタへ一発ロック挿入されます。',
      '高速信号リボン（EVF/LCD/HDMI）表面には銀インク電磁遮蔽層（EMIシールドフィルム）がラミネートされ、近接配線間のクロストークを−30 dB以下に抑えます。',
    ],
    formula: {
      expression: 'Z_diff(FPC) = 100 Ω ± 7%,   ピッチ p = 0.30 mm × 12系統 (総信号線 > 380本)',
      description: '380本超の制御・映像・給電ラインを立体FPC配線網へ集約し、超コンパクトなボディ容積を実現。',
    },
    nextGenInnovation:
      'Sony A1 II分解でも話題になった「メイン基板裏側へ回り込むセンサー／ボディ連携フレキ」まで含め、現代ミラーレスの超高密度立体実装をリアルに表現しています。',
    specs: [
      { label: '系統数', value: '12系統（EVF・トップ・リア・マウント・シャッター・グリップ・HDMI等）' },
      { label: '構造仕様', value: '0.3 mmピッチ金端子 ポリイミドFPC ＋ 銀ペーストEMI遮蔽層' },
      { label: '立体配線', value: '外周四辺接続 ＋ 基板裏面（+Z側）回り込みショートカット経路' },
      { label: '実機出典', value: 'Sony A1 II / Canon R5 Mark II 分解調査（Kolari Vision）' },
    ],
    diagramType: 'mb_perimeter_ribbons',
  },

  'mb-evf-cavity-bracket': {
    title: 'M30. EVFキャビティ内FPC押さえクランプ＆2点ねじ構造タイブラケット',
    subtitle: 'EVF Cavity Internal Ribbon Retention Clamp & 2-Screw Structural Tie Bracket',
    category: 'M30 / ファインダー〜メイン基板間・耐衝撃配線ロック＆剛性架橋',
    plainAnalogy:
      'ファインダーを外した奥のくぼみの中に隠れている「2本ネジの小さな金属押さえプレート」です。ファインダーへ繋がる繊細なフラットケーブルが衝撃で抜けないよう上からそっと押さえ、上部の骨格もつなぎ止めます。',
    summary:
      'Kolari VisionのSony A1 IIおよびA7R VI分解で必ず取り外しが必要と報告された、EVF収納キャビティ直下（メイン基板上部ノッチ内）を2本のM1.4精密ねじで締結するステンレス製リボン保持＆構造タイブラケット。',
    opticsAndPhysics: [
      'EVFユニット（240Hz MIPI-DSI）とメイン基板を結ぶ高密度ZIFコネクタ直上に弾性スポンジ付き金属クランプを被せることで、激しい落下衝撃や輸送振動でもコネクタ浮き（EVFブラックアウト障害）を100%防ぎます。',
      'EVFノッチ（凹み）はメイン基板とミッドフレームの剛性が最も低下しやすい弱点部であるため、この金属タイブラケットが左右のフレーム肩部を橋渡ししてねじり剛性を補強します。',
    ],
    formula: {
      expression: 'F_clamp_ZIF ≈ 4.5 N (弾性クッション均一圧着)   ＋   ノッチ部ねじり剛性 +28%',
      description: 'EVF高速通信コネクタの耐衝撃抜け止めと、基板上部ノッチ部の構造補強を兼務する隠れた重要部品。',
    },
    nextGenInnovation:
      'サービス分解時にも2本のねじを外すだけでEVFユニットを独立換装できるモジュラー整備設計と、プロ機必須の耐衝撃性を両立しています。',
    specs: [
      { label: '構造材質', value: 'SUS304精密プレス成形 橋渡しブラケット ＋ ウレタン押さえパッド' },
      { label: '固定方式', value: 'EVFキャビティ内 2点精密M1.4ステンレスねじ締結' },
      { label: '保護対象', value: '240Hz EVF MIPI-DSI ZIFコネクタ ＆ トップデッキ連絡リボン' },
      { label: '実機出典', value: 'Sony A1 II / A7R VI EVFキャビティ分解構造（Kolari Vision）' },
    ],
    diagramType: 'mb_evf_cavity_bracket',
  },
};

