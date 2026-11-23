import { PartExplanation } from '../types';

/**
 * Phase 19D — Vapor Chamber & Flagship Mainboard Deep-Audit Explanations (+6: M55–M60 -> 60 total).
 * Grounded in Kolari Vision Sony A1 II / A7R V / A7R VI teardowns & Sony ILCE-7M4 OEM Service Manual.
 * ALL 6 parts carry `standaloneOnly: true` (omitted in Complete Camera 305 & Body 231 views).
 */
export const MAINBOARD_ULTRA_AUDIT_EXPLANATIONS: Record<string, PartExplanation> = {
  'mb-rf-shield-4screws': {
    title: 'M55. ソニー純正RFシールド構造締結4点精密ねじ＆多点EMIグラウンドボス座（Kolari分解確認）',
    subtitle: 'Sony OEM RF-Shield Structural Retention Screws (4x) & Multi-Point EMI Grounding Bosses',
    category: '個別微細層 M55 — メイン基板とRFシールド枠を4隅でガッチリ接地固定する「電磁シールドねじ」',
    plainAnalogy:
      '電子レンジの扉がスキマなく閉まって電波を漏らさないように、カメラの頭脳（BIONZ XR）を包む金属シールドカバーも4本の専用ねじで基板の金属グラウンド座（ボス）へギュッと締め付けて、高周波ノイズが外へ逃げない「完璧な電波の檻」を完成させています。',
    summary:
      'Kolari VisionのSony A1 IIおよびA7R VI分解記事で「RFシールドブラケット周囲4箇所のねじと基板固定4箇所のねじ」として明記された、RFシールド枠と12層メイン基板・マグネシウム骨格を貫通締結する4本のM1.7精密グラウンドねじと金めっきEMIボス座。',
    opticsAndPhysics: [
      'Wi-Fi 6E/7（6 GHz帯）やLPDDR5X（8533 MT/s）の超高周波ノイズは、シールド枠の接地間隔が波長 λ/10（約5 mm〜20 mm）を超えると隙間からスロットアンテナのように放射してしまいます。',
      '4隅＋周辺グラウンドボスへ精密M1.7ねじで確実に機械締結することで、電気的な接地インピーダンスと熱伝導接触抵抗の両方を極小化します。',
      '基板自身の反り（BGAクラックの原因）を防ぐ構造アンカーとしても機能します。',
    ],
    formula: {
      expression: 'R_gnd(screw_boss) < 2 mΩ  (4点締結＋金めっきスルーホールボスで6 GHz帯EMIを -40 dB遮蔽)',
      description: '機械固定・放熱圧着・高周波多点アースの3役を同時に担うフラッグシップ基板の要',
    },
    nextGenInnovation:
      'サービス分解時に識別しやすい色分け・段付きJIS精密ねじ頭により、高密度基板上での誤組付けやパターン損傷を防止。',
    specs: [
      { label: '締結本数', value: 'M1.7 精密グラウンドねじ × 4本（＋4ボス座）' },
      { label: 'ボス表面', value: 'ENIG 金めっき多層ビア直結グラウンド座' },
      { label: 'EMI遮蔽効果', value: '6 GHz 帯で -40 dB 以上' },
      { label: '出典知見', value: 'Kolari Vision Sony A1 II / A7R VI分解' },
    ],
    diagramType: 'mb_rf_shield_4screws',
  },

  'mb-card-detect-heartcam': {
    title: 'M56. CFexpress / SDデュアルスロット・カード検出マイクロSW、書込保護接点＆ハートカム排出機構',
    subtitle: 'CFexpress Type B / SD Combo Card-Detect Switches, Write-Protect Leaf & Push-Push Heart-Cam Ejector',
    category: '個別微細層 M56 — カードを「カチッと押し込み、もう一度押すと飛び出す」魔法のハート型迷路',
    plainAnalogy:
      'ノック式ボールペンの先端が押すたびに「出る・引っ込む」を切り替えるのとそっくりの「ハート型の溝（ハートカム）」と小さなバネがカードスロットの横に隠れています。さらにカードが入った瞬間やSDカードのロック爪を検知する極細の金めっきスイッチも内蔵されています。',
    summary:
      'デュアルCFexpress 4.0 / SD UHS-IIメモリーカードスロット（M05）の側面レールに内蔵された、プッシュ・プッシュ式ステンレス・ハートカム排出機構（排出スプリング＋案内ピン）、カード挿入検出マイクロスイッチ、およびSD書込禁止（Write-Protect）検出リーフ接点。',
    opticsAndPhysics: [
      'カードを奥まで押し込むと、ステンレス製ガイドピンがハート型カム溝のくぼみに引っ掛かってロックされ、もう一度軽く押すと溝の上側を通ってコイルばねの力でカードが取り出しやすい位置まで飛び出します。',
      'カード検出スイッチ（CD）が抜去の瞬間を高速信号ピンより数ミリ秒早く検知して電源を落とす（ホットプラグ保護）ことで、録画中のうっかり引き抜きによるファイル破損や静電破壊を軽減します。',
      'CFexpressの高速PCIe Gen4通信時はカード自体が70°C近く発熱するため、耐熱LCP樹脂スライダーとステンレスばねで長期耐久性を確保しています。',
    ],
    formula: {
      expression: 't_CD_early = ΔL_pin / v_eject ≈ 1.5 mm / 0.3 m/s ≈ 5 ms  (電源切断に十分な先行検知マージン)',
      description: '信号ピン離脱より数ミリ秒早く抜去を検知する段差接点シーケンスでデータとインターフェースを保護',
    },
    nextGenInnovation:
      '10万回以上の抜き差しに耐えるステンレス一体プレス・ハートカムと防塵接点ワイパーにより、プロ現場での頻繁なカード交換に完全対応。',
    specs: [
      { label: '排出機構', value: 'プッシュ・プッシュ式ハートカム＋コイルばね' },
      { label: '内蔵検出接点', value: 'カード検出（CD）＋SDライトプロテクト（WP）' },
      { label: '挿抜耐久', value: '10,000 〜 50,000 サイクル以上' },
      { label: '対応規格', value: 'CFexpress 4.0 / SDXC UHS-II コンボ' },
    ],
    diagramType: 'mb_card_detect_heartcam',
  },

  'mb-io-lowcap-esd-chokes': {
    title: 'M57. HDMI 2.1（48Gbps）＆USB-C（10Gbps）差動高速ライン超低容量0.2pF ESD保護＆コモンモードチョーク',
    subtitle: 'HDMI 2.1 (48 Gbps) & USB-C (10 Gbps) Ultra-Low-Cap (0.2 pF) ESD TVS Array & Common-Mode Chokes',
    category: '個別微細層 M57 — 外部ケーブルからの静電気雷撃を止めつつ48Gbps映像を1ビットも崩さない関所',
    plainAnalogy:
      '冬にHDMIケーブルやUSB-Cケーブルを挿した瞬間にパチッと飛ぶ静電気は、カメラの頭脳を一撃で壊す「小さな雷」です。かといって普通の保護部品だと超高速8K映像の波形が鈍ってしまいます。この0.2pFという極小容量のESDチップと極小コイルが、映像信号は素通りさせつつ静電気とノイズだけを瞬時に弾き飛ばします。',
    summary:
      'フルサイズHDMI 2.1（48 Gbps FRL）およびUSB-C 10Gbpsポート直近の差動90Ω／100Ωペア配線上に実装される、端子間容量わずか0.2 pF以下の超高速ESD保護TVSアレイと、薄膜セラミック製コモンモードノイズフィルタ（チョーク）群。',
    opticsAndPhysics: [
      'HDMI 2.1の1レーン12 Gbps（FRL）超高速差動信号では、保護素子の寄生容量がわずか1 pF増えただけでアイパターン（信号波形）が閉じて映像が途切れてしまいます。そのため超低容量（≤0.2 pF）フロースルー型TVSアレイを採用しています。',
      '対になる薄膜コモンモードチョークは、本来の逆位相高速信号（ディファレンシャルモード）は損失ほぼゼロで通し、ケーブルから放射される同位相電磁ノイズ（コモンモード）だけを2.4/5 GHz Wi-Fi帯で-25 dB以上カットします。',
      'これにより8K外部モニター収録とWi-Fi FTP転送を同時実行しても電波干渉が起きません。',
    ],
    formula: {
      expression: 'f_−3dB = 1 / (2π · Z₀ · C_ESD) ≈ 1 / (2π × 50 Ω × 0.2 pF) ≈ 15.9 GHz  (48 Gbps FRLを余裕通過)',
      description: '0.2 pF超低寄生容量により15 GHz超の通過帯域を確保しつつ、IEC 61000-4-2 ±15 kV気中放電を安全吸収',
    },
    nextGenInnovation:
      '差動ペア配線を曲げずにそのままチップ下を通過させる「フロースルー（直線通過）パッケージ」により、100Ω特性インピーダンスの不連続を完全解消。',
    specs: [
      { label: 'TVS寄生容量', value: '0.20 pF 以下（15 GHz 超広帯域）' },
      { label: '静電耐量', value: 'IEC 61000-4-2 接触±8 kV / 気中±15 kV' },
      { label: 'フィルタ素子', value: '薄膜差動コモンモードチョーク（90/100 Ω）' },
      { label: '保護ポート', value: 'HDMI 2.1（48Gbps）/ USB-C（10Gbps）' },
    ],
    diagramType: 'mb_io_lowcap_esd_chokes',
  },

  'mb-bga-underfill-fiducials': {
    title: 'M58. BIONZ XR / LPDDR5X BGA外周キャピラリー・アンダーフィル樹脂＆AOI金フィデューシャル基準マーク',
    subtitle: 'BIONZ XR / LPDDR5X BGA Capillary Underfill Epoxy Fillet & Gold AOI Fiducial Alignment Marks',
    category: '個別微細層 M58 — カメラを落としても頭脳チップのはんだ粒が割れない「流し込み補強ボンド＆ロボットの目印」',
    plainAnalogy:
      'BIONZ XRチップの裏側には千個以上の極小はんだ粒（BGA）が並んでいますが、カメラを落として基板がたわむとはんだにヒビが入る危険があります。そこでチップの隙間に毛細管現象で特殊な補強ボンド（アンダーフィル）を流し込んで一体化し、さらに基板の隅に実装ロボット用の「金の的（フィデューシャル）」を刻んでいます。',
    summary:
      'BIONZ XR画像エンジン（M02）および高速LPDDR5X DRAM（M03）パッケージの底面・四辺を補強する低熱膨張シリカ充填キャピラリー・アンダーフィル樹脂フィレットと、SMT高速チップマウンタ＆AOI自動光学検査用の基板基準マーク（金めっきフィデューシャル）。',
    opticsAndPhysics: [
      '0.35 mmピッチの超微細BGAはんだボールは、落下衝撃による基板の曲げ応力や、長年の8K録画のオン・オフ熱サイクル（シリコン CTE 3 ppm/°C vs 基板 14 ppm/°C）で角のボールから疲労クラックが発生しやすい弱点があります。',
      '毛細管現象でチップ底面へ完全充填・熱硬化させたアンダーフィル樹脂が熱応力をチップ全面へ分散し、落下耐久性と熱サイクル寿命を約10倍へ飛躍させます。',
      '基板対角に配置された直径1.0 mmの裸金円形フィデューシャルマークは、0201サイズ（0.6×0.3 mm）の極小チップコンデンサを±15 μm精度で自動実装するための座標原点です。',
    ],
    formula: {
      expression: 'N_f(thermal_cycles) ∝ (Δε_solder)^−2  (アンダーフィル補強で角ボールひずみ Δε を約1/3 → 寿命 ~9倍)',
      description: '熱膨張ミスマッチ応力をチップ全域の樹脂層で受け止め、プロ機の長期連続高負荷運用でもはんだ割れを根絶',
    },
    nextGenInnovation:
      'リワーク（修理交換）対応の熱可塑性・低応力グレードアンダーフィルにより、高信頼性と工場再生性を高度に両立。',
    specs: [
      { label: '補強方式', value: 'シリカ充填キャピラリー・アンダーフィル' },
      { label: '対象パッケージ', value: 'BIONZ XR SoC / NPU / LPDDR5X BGA' },
      { label: '位置基準マーク', value: 'φ1.0 mm ENIG金 AOIフィデューシャル × 3点' },
      { label: '落下・熱寿命', value: '非補強比 約 8〜10 倍のBGA信頼性' },
    ],
    diagramType: 'mb_bga_underfill_fiducials',
  },

  'mb-ina-fuel-gauge-ic': {
    title: 'M59. 4ch精密電流検出INAシャントアンプ＆NP-FZ100残量1%計測インテリジェント・フューエルゲージIC',
    subtitle: '4-Channel Precision Current-Sense INA Shunt Amplifiers & 1%-Resolution Battery Fuel-Gauge IC',
    category: '個別微細層 M59 — バッテリー残量を「あと何%！」と1%刻みで正確に計算する「電気の流量計」',
    plainAnalogy:
      '自動車の「正確なガソリン残量計＆瞬間燃費計」にあたる頭脳チップです。NP-FZ100バッテリーから今何アンペアの電気が流れているかを極小の計測抵抗（シャント）で1秒に何百回も測り、温度や電池の劣化具合まで計算して画面右上に「残量 47%」と正確に教えてくれます。',
    summary:
      'バッテリー入力段および主要電力レール（BIONZ XR / レンズ / IBIS / センサー）の消費電流をリアルタイム監視する4ch精密差動電流検出アンプ（INA系）と、クーロンカウンタ＋開回路電圧（OCV）学習モデルを統合したインテリジェント・バッテリー残量計（Fuel Gauge）IC。',
    opticsAndPhysics: [
      'リチウムイオン電池（NP-FZ100：7.2 V / 2,280 mAh）は放電中盤の電圧変化が極めて平坦なため、単純な電圧測定だけでは正確な残量%が分かりません。',
      '5 mΩ〜10 mΩの超低抵抗マンガン銅シャント抵抗の両端に発生する微小電圧（V = I · R）を精密INAアンプで増幅し、流入・流出電荷量（∫I dt：クーロンカウント）を時間積分することで1%刻みの高精度残量表示を実現します。',
      'さらにレンズ側やセンサー側の異常過電流をマイクロ秒で検知し、電源管理PMICへ緊急シャットダウン指令を送る安全監視も兼ねます。',
    ],
    formula: {
      expression: 'SoC(t) = SoC₀ − (1 / Q_full(T)) · ∫₀ᵗ I_bat(τ) dτ  (クーロン積算＋温度依存OCV補正で誤差 < 1%)',
      description: '電流積分とバッテリー内部インピーダンス・温度補正の融合により氷点下でも正確な1%残量表示を実現',
    },
    nextGenInnovation:
      'NP-FZ100内部の情報通信端子（T/Sピン）と連携し、充電サイクル数・電池健康度・USB-PD充電電流までリアルタイム最適制御。',
    specs: [
      { label: '計測精度', value: '残量表示 1% 刻み（電流誤差 < ±0.5%）' },
      { label: '検出抵抗', value: '5 mΩ 精密低温度係数シャント抵抗' },
      { label: '監視系統', value: 'Battery / ISP / Lens / IBIS 4系統' },
      { label: '対応電池', value: 'InfoLITHIUM NP-FZ100（16.4 Wh）' },
    ],
    diagramType: 'mb_ina_fuel_gauge_ic',
  },

  'mb-5a-fuse-rev-mosfet': {
    title: 'M60. NP-FZ100主電源・高速遮断5Aセラミックチップヒューズ＆逆接続保護P-MOSFET遮断段',
    subtitle: 'NP-FZ100 Main Input 5A Fast-Blow Ceramic Chip Fuse & Reverse-Polarity Protection MOSFET Stage',
    category: '個別微細層 M60 — 万が一のショートや異常電源から高級カメラ全体を命がけで守る「最後の安全ブレーカー」',
    plainAnalogy:
      'お家の玄関にある「メインの電気ブレーカー」です。もし外部ダミーバッテリーの配線を間違えたり、内部に水が入ってショートした瞬間、この小さな白い5Aヒューズと保護トランジスタが1ミリ秒未満で電気をパチンと遮断し、何十万円もするセンサーや頭脳チップが焼け焦げるのを食い止めます。',
    summary:
      'バッテリー給電フレキ（B62: BT-2033）がメイン基板へ着地した直後に配置される、5A定格の高速溶断セラミック表面実装チップヒューズと、逆極性・過電圧サージを遮断する低オン抵抗（< 10 mΩ）バックツーバック保護MOSFET安全入力段。',
    opticsAndPhysics: [
      'リチウムイオン電池（NP-FZ100）は内部抵抗が極めて低く、万が一基板が短絡すると数十アンペアの短絡電流が瞬時に流れて発煙・焼損する危険があります。',
      'アルミナセラミック封止の5A高速遮断ヒューズ（I²t 溶断特性管理）が異常大電流時に確実かつ安全にアーク消弧しながら回路を物理切断します。',
      '直列の理想ダイオード／逆接続保護MOSFET段は通常動作時の電圧ロスをわずか数十mV（効率 > 99.5%）に抑えつつ、社外DCカプラーの極性逆接続時には即座にゲートを遮断して基板を守ります。',
    ],
    formula: {
      expression: 'P_loss(MOSFET) = I² · R_DS(on) = (3 A)² × 0.008 Ω = 72 mW  (高効率99.7%と完全保護を両立)',
      description: '通常時の電力ロスを極小化しつつ、短絡・逆極性・過電圧事故からカメラ全基板をミリ秒未満で防護',
    },
    nextGenInnovation:
      'USB-PD 45W給電ラインとNP-FZ100バッテリーラインのシームレス電源パス切替（Power-Path OR-ing）を無瞬断で制御。',
    specs: [
      { label: '主保護ヒューズ', value: '5.0 A 高速溶断セラミックチップヒューズ' },
      { label: '逆極性保護', value: 'R_DS(on) < 8 mΩ バックツーバックMOSFET' },
      { label: '遮断応答', value: '< 50 μs（電子遮断） / < 1 ms（溶断）' },
      { label: '配置位置', value: 'メイン基板 バッテリー給電入力直近' },
    ],
    diagramType: 'mb_5a_fuse_rev_mosfet',
  },
};
