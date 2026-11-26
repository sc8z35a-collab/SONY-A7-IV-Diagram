import { PartExplanation } from '../types';

/**
 * Phase 36 Part A — Detailed Explanations for MC111–MC130:
 *  - GROUP 1 (MC111–MC120): Sony ILCE-7M4 Service Manual Official Omitted OEM Hardware
 *  - GROUP 2 (MC121–MC130): MEMS Die-Packaging, Solder-Seal, Light-Block, Getter, UBM, BIST & ECM Internals
 */
export const MIC_ULTRA36_EXPLANATIONS_A: Record<string, PartExplanation> = {
  // =========================================================================
  // GROUP 1: MC111–MC120 — SONY ILCE-7M4 SERVICE MANUAL OEM HARDWARE
  // =========================================================================

  'mc-jk1028-audio-jack-flex': {
    title: 'MC111. 純正 JK-1028 音声入出力デュアルジャック・フレキシブル基板（Ref.206 / A5022316A）',
    subtitle: 'Sony OEM JK-1028 Audio MIC/HP Jack Flexible Sub-Board (ILCE-7M4 Ref. 206 / A-5022-316-A)',
    category: '赤いマイク端子と緑のヘッドホン端子を背負う純正FPC MC111 — α7 IV / α7S III / α7R V / α1 共通の心臓サブ基板！',
    plainAnalogy:
      'カメラ左側面の「赤い3.5mmマイク端子」と「ヘッドホン端子」は、じつはメイン基板へ直接ハンダ付けされているのではありません。抜き差しの強い力がメイン基板を壊さないように、Sony純正の黄色いポリイミド・フレキシブル基板「JK-1028」という独立した専用クッション基板に載せてから、細い金めっきリボンケーブルでメイン基板へ橋渡ししているのです！',
    summary:
      'Sony ILCE-7M4公式サービスマニュアル（VF Block Section Ref.206）に規定された純正音声I/Oサブ基板 A5022316A（JK-1028-11）。3.5mmプラグインパワー対応MIC端子と監視用ヘッドホン端子、ESD保護素子、ZIFテールを一体化しています。',
    opticsAndPhysics: [
      'α7 IV（ILCE-7M4）だけでなく α1・α7S III・α7R V・α7 V でも共通採用される Sony α世代標準の独立モジュラー音声I/Oユニットです。',
      '外部ケーブルを引っ掛けた際の曲げモーメントを柔軟なポリイミドFPCが吸収し、高価な SY-1122 メイン基板のパターン剥離を防ぎます。',
      'FPC内部にハッチング銅グランドシールド層を内蔵し、隣接するEVFブロックやHDMI高速信号からのクロストークを遮断します。',
    ],
    formula: {
      expression: 'Z_diff(JK-1028) ≈ 100 Ω（差動シールドFPC）＋ 機械応力遮断率 > 90%',
      description: 'プラグ抜き差しの機械ショックをメイン基板に伝えず、微弱なマイク信号を低損失で伝送します',
    },
    nextGenInnovation:
      '修理性（モジュラー交換）と防滴シーリングを両立する現代ミラーレスの標準設計であり、α7 V 世代にも継承されています。',
    specs: [
      { label: 'Sony純正品番', value: 'A-5022-316-A（Ref.206 / JK-1028-11）' },
      { label: '搭載端子', value: '3.5 mm TRS マイク入力（赤）＋ 3.5 mm ヘッドホン出力（緑）' },
      { label: '基板構造', value: '黄色ポリイミド多層シールドFPC ＋ ENIG金めっきZIFテール' },
      { label: '対応機種', value: 'ILCE-7M4 / ILCE-7SM3 / ILCE-7RM5 / ILCE-1 / ILCE-7M5' },
    ],
    diagramType: 'mc_jk1028_audio_jack_flex',
  },

  'mc-jk-holder-89100': {
    title: 'MC112. 純正 JK HOLDER (89100) 音声ジャック耐トルク固定ホルダー（Ref.205 / 502789601）',
    subtitle: 'Sony OEM JK HOLDER (89100) Structural Audio Jack Carrier Bracket (Ref. 205 / 502789601)',
    category: '何千回のプラグ抜き差しを受け止める頑丈な背骨 MC112 — 30%ガラス繊維強化樹脂で端子グラつきゼロ！',
    plainAnalogy:
      '外部マイクの太いケーブルを差してカメラを振り回すと、3.5mmジャックの根元にはテコの原理で強いこじり力が掛かります。JK-1028 の柔らかいフレキ基板だけでは支え切れないので、背後からガッチリ抱え込んでシャーシへ固定するのが純正パーツ「JK HOLDER (89100)」というガラス繊維入り強化樹脂の専用ゆりかご（クレードル）です！',
    summary:
      'ILCE-7M4 サービスマニュアル Ref.205（502789601）のガラス繊維強化ポリカーボネート製ジャックキャリア。JK-1028の2つの3.5mmバレルを上下・側方から拘束し、プラグ挿抜せん断荷重をマグネシウム骨格へ逃がします。',
    opticsAndPhysics: [
      '2つの円弧サドルリブが3.5mmジャック外筒を密着支持し、10,000回以上の挿抜試験でもハンダ付けランドに亀裂が入らない構造を実現します。',
      '3箇所のM1.7締結ボス（Ref.204/207/208ネジ対応）に真鍮インサート／高精度座面を設け、EVFブロック近傍での寸法公差±0.05 mmを維持します。',
      '型番末尾の (89100) は α7 IV の社内開発コード CX89100 に由来する専用設計金型パーツであることを示します。',
    ],
    formula: {
      expression: 'M_torque = F_plug · L_lever  →  JK HOLDER 3点ビス締結でメインフレームへ直接分散',
      description: 'ケーブルの引っ張りトルクを樹脂フレームと3点ネジで逃がし、接触不良やガリ音を防ぎます',
    },
    nextGenInnovation:
      'フルサイズHDMI端子や3.5mm端子へのケージ／クランプ装着が一般化した現代の動画機では、こうした専用インナーホルダーの剛性が信頼性の生命線です。',
    specs: [
      { label: 'Sony純正品番', value: '502789601（Ref.205 / JK HOLDER (89100)）' },
      { label: '材質', value: '高剛性ガラス繊維強化エンジニアリング樹脂（>PC-GF30<）' },
      { label: '固定方式', value: 'M1.7 精密ネジ 3点締結 ＋ ツイン半円サドルリブ' },
      { label: '役割', value: 'JK-1028 へのプラグ挿抜トルク・こじり応力の完全遮断' },
    ],
    diagramType: 'mc_jk_holder_89100',
  },

  'mc-jack-plate-89100': {
    title: 'MC113. 純正 JACK PLATE (89100) 側面ステンレス補強＆接地プレート（Ref.353 / 502789401）',
    subtitle: 'Sony OEM JACK PLATE (89100) Stainless Side Reinforcement & Grounding Plate (Ref. 353 / 502789401)',
    category: '端子の外周を金属鎧で固めて静電気を逃がす板金 MC113 — 3.5mmプラグの静電気パチッを瞬時にアースへ！',
    plainAnalogy:
      '冬の乾燥した日に外部マイクの金属プラグを差し込む瞬間、指先の静電気が端子に触れて「パチッ！」と飛びます。この純正ステンレス板金「JACK PLATE (89100)」は、3.5mm穴の周囲をぐるりと囲む金属の盾となって端子のグラつきを補強しつつ、飛び込んだ静電気や外来電波を最短距離でカメラのマグネシウム骨格（シャーシGND）へ逃がすアース橋渡し役なのです！',
    summary:
      'ILCE-7M4 サービスマニュアル Main Board Section Ref.353（502789401）の精密プレス加工SUS304ステンレス補強接地プレート。Ref.354（M1.7×3.0mm）ネジで本体骨格へ低インピーダンス接続されます。',
    opticsAndPhysics: [
      'ジャック開口部を貫通する金属フランジと板バネ接地フィンガーにより、3.5mmスリーブ電極とマグネシウム筐体間の高周波インピーダンスを数十mΩ以下に抑えます。',
      '外部ケーブル経由の±15 kV 静電気放電（ESD）や RF コモンモード電流を、オーディオコーデックICへ到達する前に筐体へ分流します。',
      '側面端子ドア（Ref.8）閉鎖時のパッキン当たり面精度も担保し、防塵防滴シールの圧縮率を均一化します。',
    ],
    formula: {
      expression: 'Z_chassis_gnd < 50 mΩ @ 100 MHz（板バネ多点接地による最短リターン経路）',
      description: '外部マイクプラグの静電気と高周波ノイズを基板に入る前にカメラ骨格へ逃がします',
    },
    nextGenInnovation:
      'SUS304＋ベリリウム銅フィンガーの複合接地構造により、無線機やスマホ近接下でも放送機並みの耐RF性能を実現します。',
    specs: [
      { label: 'Sony純正品番', value: '502789401（Ref.353 / JACK PLATE (89100)）' },
      { label: '材質', value: '精密プレス SUS304 ステンレス鋼 ＋ 接地バネフィンガー' },
      { label: '固定ネジ', value: 'Ref.354 / 259947521（M1.7 × L=3.0 mm）' },
      { label: '機能', value: '側面3.5mmジャック機械補強・低抵抗シャーシ接地・ESD分流' },
    ],
    diagramType: 'mc_jack_plate_89100',
  },

  'mc-mb-jack-shield-block': {
    title: 'MC114. 純正 MB JACK SHIELD BLOCK (5800) 音声ジャック部 EMI金属シールドブロック（Ref.564 / 500972301）',
    subtitle: 'Sony OEM MB JACK SHIELD BLOCK (5800) Audio Jack EMI Faraday Block (Ref. 564 / 500972301)',
    category: 'アナログ端子室をデジタルの嵐から隔離する金属防壁 MC114 — ギガヘルツ帯のCPU雑音を60 dB以上シャットアウト！',
    plainAnalogy:
      'カメラ内部では、3.5mmマイク端子のすぐ数ミリ隣に、毎秒何十億回も高速スイッチングする画像処理エンジンやHDMI・メモリカード回路がひしめいています。例えるなら「ささやき声を聴く録音ブースの真横に高速道路が走っている」状態！純正「MB JACK SHIELD BLOCK (5800)」は、ジャック室を分厚い金属の防音・電磁遮蔽壁ですっぽり囲んでデジタル雑音の飛び込みをシャットアウトする専用シールドです！',
    summary:
      'ILCE-7M4 サービスマニュアル MB N Frame Section Ref.564（500972301）に採用されている金属EMIシールドブロック。メイン基板側の高周波デジタル放射から側面3.5mmアナログ音声ジャック領域を空間的に隔離します。',
    opticsAndPhysics: [
      '導電性金属隔壁と底面ベリリウム銅EMIフィンガーが連続ファラデーケージを形成し、100 MHz〜6 GHz帯の電界ノイズ結合を大幅に低減します。',
      '上面に貼付したフェライト系電波吸収シートにより、シールド内部での定在波反射（キャビティ共振）も熱変換して減衰させます。',
      'Ref.565（M1.7×3.5mmネジ）でメインフレームへ直接締結され、高ゲイン（+50 dB超）の外部マイク入力でもジージーというデジタルクロック混入を防ぎます。',
    ],
    formula: {
      expression: 'SE_dB = R_reflection + A_absorption > 60 dB（導体反射＋フェライト吸収の複合遮蔽）',
      description: '金属の壁で電波を跳ね返し、内側の吸収シートで残りの雑音も消し去ります',
    },
    nextGenInnovation:
      'α7 IV・α7S III・α1 共通プラットフォーム（5800系フレーム）で徹底されたアナログ/デジタル空間分離思想の象徴的パーツです。',
    specs: [
      { label: 'Sony純正品番', value: '500972301（Ref.564 / MB JACK SHIELD BLOCK (5800)）' },
      { label: '構造', value: '金属EMI隔壁ブロック ＋ 内部仕切り壁 ＋ BeCu接地フィンガー' },
      { label: '固定ネジ', value: 'Ref.565 / 428743601（M1.7 × L=3.5 mm）' },
      { label: '遮蔽効果', value: 'メイン基板GHzデジタル放射から3.5mmアナログ系を空間隔離' },
    ],
    diagramType: 'mc_mb_jack_shield_block',
  },

  'mc-magnetic-field-cut-plate': {
    title: 'MC115. 純正 MAGNETIC FIELD CUT PLATE (891) 高透磁率・磁気遮蔽プレート（Ref.352 / 502789501）',
    subtitle: 'Sony OEM MAGNETIC FIELD CUT PLATE (891) High-Permeability Permalloy Flux Shield (Ref. 352 / 502789501)',
    category: '手ブレ補正の超強力ネオジム磁石から音を守る磁気の盾 MC115 — 低周波磁束バイパスで「ブーン」雑音を封殺！',
    plainAnalogy:
      '普通のアルミや銅のシールドは電波（電界）は防げても、手ブレ補正（IBIS）の超強力ネオジム磁石やシャッター電磁石が発する「磁力線」は素通りしてしまいます。磁力線がマイク配線ループを横切ると、発電機と同じ原理で「ブーン」「ジー」という誘導ノイズが発生します。純正「MAGNETIC FIELD CUT PLATE」は、磁力線を吸い込んで脇へそらす高透磁率パーマロイ合金の「磁気バイパス道路」なのです！',
    summary:
      'ILCE-7M4 サービスマニュアル Main Board Section Ref.352（502789501）の磁気シールド板。5軸ボディ内手ブレ補正（TEX-5810）のVCM磁石やシャッター駆動ソレノイドからの漏洩磁束を迂回させ、SY-1122音声アナログ回路への電磁誘導を遮断します。',
    opticsAndPhysics: [
      '比透磁率 μ_r が極めて高い高透磁率磁性鋼／パーマロイ系合金を用い、漏洩磁束 Φ を高透磁率プレート内部へ集中・バイパスさせる磁気シャント効果を発揮します。',
      'ファラデーの電磁誘導の法則 V_noise = −dΦ/dt による低周波ハムやVCM PWM駆動音の誘導起電力を劇的に抑制します。',
      '背面に銅箔層を複合させることで、低周波磁界（磁性体）と高周波渦電流（銅）の双方を1枚でカバーするハイブリッド構造です。',
    ],
    formula: {
      expression: 'V_induced = −N · dΦ/dt   （高透磁率 μ_r バイパスで音声ループ貫通磁束 Φ を激減！）',
      description: '磁力線を金属板の中へ吸い込んで迂回させ、マイク配線にノイズ電圧が生まれるのを防ぎます',
    },
    nextGenInnovation:
      '8段分もの強力手ブレ補正を搭載する最新ミラーレスでは、VCM駆動電流の増大に伴い磁気遮蔽板の役割がますます重要になっています。',
    specs: [
      { label: 'Sony純正品番', value: '502789501（Ref.352 / MAGNETIC FIELD CUT PLATE (891)）' },
      { label: '材質', value: '高透磁率パーマロイ／ケイ素鋼系 磁気遮蔽シート' },
      { label: '遮断対象', value: '5軸IBIS（TEX-5810）VCM磁石・シャッター駆動漏洩磁束' },
      { label: '配置', value: 'SY-1122 メイン基板とメカ・IBISブロックの境界部' },
    ],
    diagramType: 'mc_magnetic_field_cut_plate',
  },

  'mc-mis2006-shoe-contact-fpc': {
    title: 'MC116. 純正 MIS-2006 21ピン MIシューデジタル音声接点FPC ＆ 防滴ラバー（Ref.325 / 324）',
    subtitle: 'Sony OEM MIS-2006 21-Pin MI-Shoe Digital Contact Flex (A5001908A) & WP Rubber (501695501)',
    category: 'ケーブル不要で4ch 24-bitデジタル音声を通す21本の黄金の舌 MC116 — 雨の侵入も専用防滴ブーツで完全ガード！',
    plainAnalogy:
      'Sony αシリーズ最大の武器である「ケーブルレス・デジタルマイク接続（ECM-M1 / ECM-B1M / XLR-K3M）」を物理的に支えているのが、ホットシュー奥に隠れた21本の極細金めっき接点「MIS-2006」です。0.5 mm間隔の狭い隙間に24-bit 4chの高速デジタル音声信号と給電ラインを通しつつ、すぐ下の専用防水ゴムブーツ（Ref.324）が雨粒のカメラ内部侵入をピタッと食い止めています！',
    summary:
      'ILCE-7M4 サービスマニュアル Cabinet Top Section-2 Ref.325（A5001908A：MIS-2006 FLEXIBLE BOARD）と Ref.324（501695501：MI SHOE FPC WP RUBBER）。21ピンのうちデジタルオーディオ専用I²S/TDMピン群と給電線をカメラ内部へ直結します。',
    opticsAndPhysics: [
      '21本の接点表面に耐摩耗性の高い硬質金めっき（約0.5 μm）を施し、大型XLRアダプターやマイクの着脱摩耗に耐える低接触抵抗を維持します。',
      'Pin 08〜12 付近に配置された高速デジタル音声バスにより、マイク側でA/D変換した24-bit / 48 kHz（または次世代32-bit Float / 96 kHz）信号をアナログ劣化ゼロのままBIONZへ伝送します。',
      'Ref.324 防滴ラバーガスケットがFPC貫通スリットを360°弾性密閉し、シューの奥から水滴がトップ基板へ垂れるのを防ぎます。',
    ],
    formula: {
      expression: '21-Pin Hard-Au Edge Array → 4ch × 24-bit × 48 kHz = 4.608 Mbps 劣化ゼロ直接伝送',
      description: 'カメラのanalog入力を一切通さず、マイク内部のデジタルデータをそのまま黄金接点で受け取ります',
    },
    nextGenInnovation:
      '2026年の Sony XLR-A4 では同じMIシューデジタルインターフェース経由で 32-bit Float / 96 kHz 4ch伝送まで拡張されています。',
    specs: [
      { label: 'Sony純正品番', value: 'A5001908A（Ref.325 MIS-2006）＋ 501695501（Ref.324 WP RUBBER）' },
      { label: '接点構造', value: '21ピン 0.5 mmピッチ 硬質金めっきエッジ接点アレイ' },
      { label: '伝送信号', value: 'デジタル音声 I²S/TDM 4ch ＋ +5V/電源 ＋ UART制御' },
      { label: '防滴構造', value: '専用一体成形 MI SHOE FPC WP RUBBER 弾性シール' },
    ],
    diagramType: 'mc_mis2006_shoe_contact_fpc',
  },

  'mc-mi-shoe-shell-spring-cap': {
    title: 'MC117. 純正 MIシュー・シェルプレート / スプリングプレート / シューキャップ（Ref.327 / 331 / 9）',
    subtitle: 'Sony OEM MI SHOE SHELL PLATE (500294302), SPRING PLATE (500294502) & SHOE CAP (443873412)',
    category: 'マイクのガタつき・カタカタ音を封じる精密バネ拘束レール MC117 — 0.1 mmの遊びも許さない無音クランプ！',
    plainAnalogy:
      'カメラの上にマイクを載せて歩くと、もし取付台に0.1ミリでもガタつきがあれば「カタカタ…ゴトゴト…」という致命的な接触音がマイクへ直接伝わってしまいます。Sony純正のMIシューは、頑丈なステンレスレール（SHELL PLATE）の内側に弾力のある「板バネ（SPRING PLATE）」を仕込んでマイクの足を上向きにギュッと押し上げ、さらに未使用時は専用シューキャップで21ピン接点を雨ホコリから守る3重構造なのです！',
    summary:
      'ILCE-7M4 サービスマニュアル Ref.327（500294302 MI SHOE SHELL PLATE）、Ref.331（500294502 MI SHOE SPRING PLATE）、Ref.9（443873412 SHOE CAP）によるMIシュー機械締結・防振・防塵アセンブリ。',
    opticsAndPhysics: [
      'Ref.327 高剛性ステンレスシェルが Ref.328 特殊頭M1.7×3.3mmネジ4本でトップ骨格（MI SHOE FIX PLATE Ref.311）へ強固に固定され、重いXLR-K3M装着時のたわみを防ぎます。',
      'Ref.331 スプリングプレートの2本爪板バネがアクセサリー脚を常時予圧（プリロード）保持することで、歩行振動によるカタカタ機械雑音と21ピン接点の瞬断（マイクロフレッティング）を防止します。',
      '非装着時は Ref.9 シューキャップが21ピン接点列を覆い、雨滴によるピン間ショートや腐食を阻止します。',
    ],
    formula: {
      expression: 'F_preload(Spring) > m_mic · a_shock   （常時予圧保持 → 接点瞬断・カタカタ雑音ゼロ！）',
      description: '板バネがマイクの足を常時押し上げることで、歩いても揺れてもガタつき音を出しません',
    },
    nextGenInnovation:
      '近年の α7 IV 以降では金属ベース固定を強化し、外部マイクやXLRユニット直付けでの過酷な現場運用に耐える高信頼設計となっています。',
    specs: [
      { label: 'Sony純正品番', value: '500294302（SHELL）/ 500294502（SPRING）/ 443873412（CAP）' },
      { label: '固定ネジ', value: 'Ref.328 / 500294701（M1.7 SPECIAL HEAD L=3.3 mm × 4）' },
      { label: 'バネ機能', value: '2点予圧リーフスプリングによる無ガタ固定＆接点圧安定化' },
      { label: '防塵防滴', value: '専用シューキャップによる21ピン金接点の保護' },
    ],
    diagramType: 'mc_mi_shoe_shell_spring_cap',
  },

  'mc-side-jack-cover-door': {
    title: 'MC118. 純正 側面キャビネット 3重リップ防滴 MIC / HP 端子カバー扉（Ref.8 / X50022801）',
    subtitle: 'Sony OEM SIDE CABINET Triple-Lip Hinged Weatherproof MIC/HP Jack Cover Door (Ref. 8 / X50022801)',
    category: 'マイク端子を横殴りの雨から守る独立開閉ヒンジ扉 MC118 — 開けてもバリアングル液晶に干渉しない新設計！',
    plainAnalogy:
      '昔のカメラはゴム蓋がブラブラして液晶モニターにぶつかっていましたが、α7 IV の側面端子カバーは「赤いマイク端子」と「ヘッドホン端子」をそれぞれ独立した硬質ヒンジ扉（内側エラストマー3重リップ付き）で密閉する本格仕様！閉めると内側の円柱ゴム栓がジャック穴のフチをギュッと塞ぎ、開けたときもカチッと横へ退避して外部マイクケーブルと液晶の干渉を防ぎます！',
    summary:
      'ILCE-7M4 サービスマニュアル Overall Section Ref.8（X50022801 SIDE CABINET ASSY）に統合された防塵防滴側面端子カバー扉。3.5mm MIC（赤リング表示）と HP（緑リング表示）を個別に封止します。',
    opticsAndPhysics: [
      '扉裏面に一体成形されたエラストマー3重ラビリンスリップと円筒プラグボスが、閉扉時に JACK PLATE 外周へ圧縮密着して毛細管現象による雨水浸入を阻止します。',
      'MIC端子を最上段独立扉へ配置することで、外部マイクを常時接続した状態でも下段のHDMI・USB-C扉を閉じたまま防滴性を保てます。',
      '金属ヒンジ軸と適度な開閉クリックトルクにより、長年の開閉でもちぎれにくい高耐久構造を備えます。',
    ],
    formula: {
      expression: 'ΔP_water_seal = 3段ラビリンス圧縮リップ（25%潰し代）→ 屋外雨天撮影での端子浸水防止',
      description: '3重のゴムの堤防と穴塞ぎ栓で、外部マイクを使わない時の端子内部への雨水・砂塵をシャットアウトします',
    },
    nextGenInnovation:
      'α7 IV で刷新された「独立ヒンジ式カバー」は、外部マイク運用が前提の動画ハイブリッド機におけるユーザビリティと耐候性の決定版です。',
    specs: [
      { label: 'Sony純正品番', value: 'X50022801（Ref.8 SIDE CABINET ASSY 搭載端子カバー）' },
      { label: '識別表示', value: '赤リング（3.5mm MIC入力）／ 緑リング（3.5mm HP出力）' },
      { label: 'シール構造', value: '二色成形 3重リップEPDMパッキン ＋ 円筒プラグボス' },
      { label: '開閉機構', value: '金属ピン軸ヒンジ式（バリアングル液晶非干渉配置）' },
    ],
    diagramType: 'mc_side_jack_cover_door',
  },

  'mc-sp901-monitor-speaker-gnd': {
    title: 'MC119. 純正 SP901 1.0 cm 内蔵モニタースピーカー ＆ 接地/絶縁シート（Ref.SP901 / 414 / 415）',
    subtitle: 'Sony OEM SP901 1.0 cm Monitor Loudspeaker (185921011), SPEAKER GND SHEET (501696001) & SP INSULATION SHEET (500463101)',
    category: '録音確認の相棒かつ「ハウリング防止」で厳重隔離される1cmスピーカー MC119 — 銅箔と絶縁シートの二重装甲！',
    plainAnalogy:
      'カメラの中でマイクと「表裏一体」なのが、録った声をその場で確認できる直径わずか1.0 cmの超小型モニタースピーカー（SP901）です。同じオーディオコーデックICの内蔵1Wアンプで鳴らしますが、強力なネオジム磁石と駆動電流がマイク回路へ漏れるとノイズ源になるため、裏側に専用の「銅GNDシールドシート（Ref.414）」と「絶縁シート（Ref.415）」を2枚重ねで貼り、録音中は完全ミュートで遮断しています！',
    summary:
      'ILCE-7M4 サービスマニュアル Battery Holder Section Ref.SP901（185921011：LOUDSPEAKER 1.0 cm）、Ref.414（501696001：SPEAKER GND SHEET）、Ref.415（500463101：SP INSULATION SHEET）から成る内蔵音響再生＆遮蔽ユニット。',
    opticsAndPhysics: [
      '直径10 mmの超薄型ダイナミックドライバーに高磁束密度N52ネオジム磁石と極薄PEIドーム振動板を搭載し、現場での音声プレビューやAF合焦電子音を明瞭に再生します。',
      'Ref.414 銅系 SPEAKER GND SHEET がスピーカー駆動PWM電流とボイスコイルの放射EMIをアースへ吸収し、Ref.415 SP INSULATION SHEET が隣接基板との電気的短絡と筐体ビビりを防止します。',
      '動画録画開始と同時にオーディオコーデック（AK4951/AK4954A系）がスピーカー出力段をハードウェア・パワーダウンし、音響フィードバック（ハウリング）と消費電流ノイズをゼロにします。',
    ],
    formula: {
      expression: 'P_spk ≈ 0.5–1.0 W（再生時）  →  録画中 Hardware Mute（リーク < −100 dB）',
      description: '再生時はクリアに鳴り、録画の瞬間に電源ごと静かに眠らせてマイクへの雑音混入をゼロにします',
    },
    nextGenInnovation:
      '再生プレビュー時の4chトラック選択監視（CH1/2・CH3/4・MIX切替）にも連動し、ヘッドホン無しでも現場で録音を素早く点検できます。',
    specs: [
      { label: 'Sony純正品番', value: '185921011（SP901）/ 501696001（GND）/ 500463101（INSUL）' },
      { label: 'ドライバー径', value: 'φ10 mm（1.0 cm）超薄型ネオジム・ダイナミック型' },
      { label: 'シールド構造', value: 'SPEAKER GND SHEET（銅箔）＋ SP INSULATION SHEET（絶縁）' },
      { label: '録音時制御', value: 'ハードウェア完全シャットダウンによるハウリング・EMI遮断' },
    ],
    diagramType: 'mc_sp901_monitor_speaker_gnd',
  },

  'mc-rear-muffle-cushion-insul': {
    title: 'MC120. 純正 REAR MUFFLE CUSHION A/B（502863201/301）＆ SH-1035 SUS304 MEMS補強板',
    subtitle: 'Sony OEM REAR MUFFLE CUSHION A/B (502863201/502863301) & SH-1035 0.2 mm SUS304 Stiffener',
    category: '筐体内部の反響音を吸う純正消音スポンジ＆フレキ裏の鋼鉄添え木 MC120 — 0.2 mmステンレス板がMEMSの歪みを阻止！',
    plainAnalogy:
      'カメラ内部の空洞は、何もしないとギターの胴体みたいに「ボワン…」とシャッター音やボタン操作音を響かせてしまいます。そこで Sony は内部の要所に「REAR MUFFLE CUSHION A/B」という専用消音スポンジを貼り詰めて反響を吸い取り、さらに柔らかいマイク基板（SH-1035）の裏側には厚さわずか0.2 mmのステンレス製「添え木（スティフナー）」を貼って、MEMSチップが曲がって感度が狂うのを防いでいます！',
    summary:
      'ILCE-7M4 サービスマニュアル Ref.59/76（502863301 / 502863201 REAR MUFFLE CUSHION A/B）の筐体内消音吸音材と、SH-1035 フレキシブル基板のMEMS実装領域裏面に貼合される0.2 mm SUS304ステンレス・スティフナー補強板。',
    opticsAndPhysics: [
      'MEMSマイクはシリコン振動膜の張力が極めて繊細なため、実装先のフレキ基板（FPC）がわずか数十μm反っただけでも感度が±2〜3 dB変動します。0.2 mm SUS304スティフナーが局所曲げ剛性を数百倍に高めます。',
      'REAR MUFFLE CUSHION A/B の連続気泡ウレタン吸音層が、カメラ背面〜天面内部空間における2〜10 kHz帯の空洞定在波とメカニカル操作音の回り込みを減衰させます。',
      '同時に SUS304 補強板をグランドへ導通させることで、MEMS底面側の追加RFシールドとしても機能します。',
    ],
    formula: {
      expression: 'EI_stiffener ∝ E_SUS · t³   （0.2 mm SUS304貼合でFPC反りによるMEMS感度シフトを防止！）',
      description: '柔らかい配線シートのマイク部分だけに薄いステンレスの添え木を貼り、歪みゼロの平面を保ちます',
    },
    nextGenInnovation:
      '薄型化するカメラ天面でFPC実装MEMSの音響性能をリジッド基板並みに引き上げる、量産設計の隠れた必須ノウハウです。',
    specs: [
      { label: 'Sony純正品番', value: '502863201（MUFFLE A）/ 502863301（MUFFLE B）' },
      { label: 'FPC補強板', value: '厚さ 0.20 mm SUS304 ステンレス製 MEMS領域スティフナー' },
      { label: '吸音特性', value: '筐体内部 2–10 kHz 定在波・操作クリック反響の減衰' },
      { label: '副次効果', value: 'MEMS底面GND補強 ＋ 音孔アライメント平面度の確保' },
    ],
    diagramType: 'mc_rear_muffle_cushion_insul',
  },

  // =========================================================================
  // GROUP 2: MC121–MC130 — MEMS PACKAGING, SOLDER, LIGHT-BLOCK, GETTER & ECM
  // =========================================================================

  'mc-bottom-port-solder-ring-nsmd': {
    title: 'MC121. MEMS底面音孔 360°環状SAC305気密はんだシール＆4分割NSMDステンシルパッド（AN557 / WAN0284）',
    subtitle: 'MEMS Bottom-Port 360° Annular SAC305 Acoustic Seal Ring & 4-Aperture NSMD Pad (Infineon AN557 / Cirrus WAN0284)',
    category: 'はんだ自体を「音漏れゼロのパッキン」にする職人ランド設計 MC121 — わずか0.1 mmの隙間でも低音が消える！',
    plainAnalogy:
      'ボトムポート型MEMSマイクは、基板に開けた直径0.8 mmの極小トンネルから音を取り込みます。もしマイクの底面と基板の間に0.1ミリでも「はんだの抜け（ボイド）」があると、そこから音が裏側へ逃げてしまい（音響ショート）、低音がスッカスカになります！そこで Infineon AN557 や Cirrus Logic WAN0284 の設計指針どおり、音孔の周囲を「4分割スリット付き環状はんだステンシル」で印刷し、リフローで360°スキマ皆無の気密はんだリングを作り上げるのです！',
    summary:
      'Infineon AN557・IM72D128V01・Cirrus Logic WAN0284 に規定されたボトムポートMEMS用 NSMD（Non-Solder-Mask-Defined）環状音響シールランドと4分割ガス抜きステンシル構造。',
    opticsAndPhysics: [
      '基板側の貫通音孔径（推奨 φ0.80 mm）はMEMSパッケージ音孔径よりわずかに大きく、環状はんだリング内径より小さく設計し、はんだフラックスが音孔へ流れ込むのを防ぎます。',
      'はんだペースト印刷ステンシルを4分割アパーチャ（微小リリーフ隙間付き）にすることで、260℃リフロー時のフラックスガス抜けと表面張力による360°連続気密リング形成を両立します。',
      '外周を囲む16〜24本のグランドステッチングビアが、音響気密と同時にGHz帯RFノイズの侵入も遮断します。',
    ],
    formula: {
      expression: 'D_mems_port < D_pcb_hole (0.80 mm) < D_solder_ring_ID   （音響リークゼロ＆はんだ流入ゼロ！）',
      description: 'はんだリングそのものを気密パッキン兼アース壁として使い、豊かな低音と高SNRを守り抜きます',
    },
    nextGenInnovation:
      '超小型 2.75×1.85 mm MEMS パッケージ時代において、ボイド率 0% の環状音響はんだ接合は量産歩留まりを左右する最重要プロセスです。',
    specs: [
      { label: '準拠規格', value: 'Infineon AN557 / IM72D128V01 / Cirrus Logic WAN0284' },
      { label: '推奨基板音孔径', value: 'φ0.80 mm（r = 0.40 mm、非めっきまたはENIG端面）' },
      { label: 'ランド設計', value: 'NSMD 360°環状GNDリング ＋ 4分割ガス抜きステンシル開口' },
      { label: 'はんだ合金', value: 'SAC305（Sn-3.0Ag-0.5Cu）鉛フリー・260℃リフロー気密接合' },
    ],
    diagramType: 'mc_bottom_port_solder_ring_nsmd',
  },

  'mc-pcb-stress-relief-slots': {
    title: 'MC122. MEMS実装部 U字型ミルドPCB応力緩和スリット（熱反り・筐体ねじれ遮断アイランド）',
    subtitle: 'MEMS Footprint U-Shaped Milled PCB Stress-Relief Routing Slots (Thermal & Flex Isolation Peninsula)',
    category: '基板に「コの字の溝」を掘ってマイクだけを浮島にする裏ワザ MC122 — 筐体を握る力による±3 dB感度狂いを撃退！',
    plainAnalogy:
      '望遠レンズを付けてカメラを強く握ったり、真冬の屋外から暖かい室内へ入ると、内部の基板は目に見えないレベルでわずかにたわみます。すると基板にハンダ付けされたMEMSマイクの極薄シリコン鼓膜が引っ張られ、音質や感度が±3 dBもズレてしまいます！そこで基板のマイクの周囲3辺をルーターで「U字型の溝（スリット）」として切り抜き、細い1本の首だけで繋いだ「浮島（ペニンシュラ）」にすることで、基板のねじれを完全に遮断するのです！',
    summary:
      'ST TN1383 / Knowles SiSonic / Infineon 実装ガイドラインで推奨されるMEMS周囲のU字型応力緩和ルーティングスリット。リフロー熱応力やネジ締結・筐体曲げ歪みからMEMSパッケージを機械的に切り離します。',
    opticsAndPhysics: [
      '3辺を幅0.8〜1.0 mmの貫通スリットで開放し1辺の細いブリッジのみで支持する片持ち梁構造により、親基板の曲げモーメント伝達が1/20以下に激減します。',
      'MEMSパッケージの4隅に集中しがちな260℃リフロー冷却時のCTE（熱膨張係数）ミスマッチ応力を逃がし、ペアマイク間の感度・位相マッチング（±1 dB以内）を長期維持します。',
      'ブリッジ部に差動音声配線とグランドリターンを最短幅で通すことで、電気的インピーダンスと機械的アイソレーションを両立します。',
    ],
    formula: {
      expression: 'ΔS_mems ∝ σ_substrate  →  U字スリットで基板伝達ひずみ σ を 95%以上カット！',
      description: 'マイクの下の基板だけを切り抜いて「浮島」にすることで、カメラのねじれや熱反りの影響を受けなくします',
    },
    nextGenInnovation:
      'ビームフォーミング用アレイマイクではわずかな位相ズレが指向性を崩すため、複数MEMSそれぞれを応力緩和アイランドへ分離する設計が広がっています。',
    specs: [
      { label: 'スリット形状', value: '3辺開放 U字型CNCルーター貫通溝（幅 0.8–1.0 mm）' },
      { label: '遮断対象', value: '260℃リフロー残留歪み・ネジ締結応力・グリップ曲げ歪み' },
      { label: '防止効果', value: '応力起因の感度ドリフト（最大 ±3 dB）＆位相ズレの防止' },
      { label: '配線経路', value: '単一スリット橋渡しブリッジ経由の差動ガード配線' },
    ],
    diagramType: 'mc_pcb_stress_relief_slots',
  },

  'mc-asic-black-globtop-lightshield': {
    title: 'MC123. MEMS内蔵ASIC 遮光ブラックエポキシ・グロブトップ＆光電ポップ雑音防止層',
    subtitle: 'MEMS ASIC Opaque Black Epoxy Glob-Top & Top-Metal Photoelectric Light-Shield (Flash/Sunlight Noise Blocker)',
    category: 'ストロボの閃光がマイクの音に化ける怪奇現象を止める真っ黒ドーム MC123 — 光学濃度OD>6で光電ノイズを完全封鎖！',
    plainAnalogy:
      'じつは半導体チップ（ASIC）は太陽電池と同じシリコンでできているため、マイクの音孔から強烈なストロボの光や直射日光が差し込むと、チップが勝手に発電して「ボッ！」「ジジッ！」という謎のノイズ（光電効果ノイズ）を出してしまいます！これを防ぐため、MEMSパッケージ内のASICチップ全体と金ワイヤーを、光を100万分の1以下に遮る真っ黒なカーボン入りエポキシ樹脂「グロブトップ」ですっぽり覆い隠しているのです！',
    summary:
      'Knowles・Infineon MEMSパッケージ内部のASICダイを覆うカーボンブラック充填不透明エポキシ・グロブトップ封止層。音孔経由のストロボ光・LEDフリッカー光による光起電力ノイズと金ワイヤー振動を同時に防止します。',
    opticsAndPhysics: [
      'ASIC内部の100 GΩ級超高インピーダンス入力ノード（疑似抵抗・初段アンプ）に可視〜近赤外光が当たると、光生成キャリア（電子・正孔対）がpA級のリーク電流パルスとなり、可聴域のポップ音や50/60 Hz LEDフリッカー雑音を引き起こします。',
      '光学濃度 OD > 6.0（透過率 10⁻⁶ 未満）のカーボンブラック・シリカ充填エポキシをディスペンス硬化させ、さらにASIC最上層メタルによる遮光シールドと二重で光侵入を断ちます。',
      '同時にφ20 μm金ワイヤーボンドの根元を樹脂固定し、135 dB SPL強音圧下でのワイヤー共振や衝撃断線も防ぎます。',
    ],
    formula: {
      expression: 'I_photo = η · (q / hν) · P_opt · 10^(−OD)   （OD > 6.0 で光電流リークをフェムトアンペア以下へ！）',
      description: 'カメラのストロボ閃光が音孔から入っても、真っ黒な樹脂ドームがASICへの光発電ノイズを完全に防ぎます',
    },
    nextGenInnovation:
      '高出力スピードライトや高速LED照明下での動画撮影において、カメラ内蔵MEMSの「光感度（Light Sensitivity）」ゼロ化は必須品質基準です。',
    specs: [
      { label: '封止材', value: 'カーボンブラック高充填・低応力不透明エポキシ（Glob-Top）' },
      { label: '遮光性能', value: '光学濃度 OD > 6.0（可視光〜近赤外 400–1100 nm完全遮断）' },
      { label: '防止現象', value: 'ストロボ閃光ポップ音・LED照明フリッカー光電ハム雑音' },
      { label: '副次効果', value: 'ASIC表面の吸湿保護＆金ワイヤーボンド機械的補強' },
    ],
    diagramType: 'mc_asic_black_globtop_lightshield',
  },

  'mc-sdm-ausn-getter-vacuum-seal': {
    title: 'MC124. SDM密閉二重膜 AuSn共晶気密シール枠 ＆ Ti/Zr/V非蒸発型ゲッター（NEG）真空維持膜',
    subtitle: 'SDM Wafer-Level AuSn Eutectic Hermetic Seal Frame & Ti/Zr/V Non-Evaporable Getter (NEG) Film',
    category: '15年間ミクロの真空を保ち続ける「気体を食べる金属膜」 MC124 — Infineon 73 dB(A) 超低雑音の本当の秘密！',
    plainAnalogy:
      'Infineon XENSIV IM73A135 が驚異の73 dB(A) 超高S/N比とIP57防水を両立できるのは、2枚の鼓膜の間を「真空（低圧）」に閉じ込めて空気の抵抗ノイズを消しているからです。でも小さな隙間は長い年月で壁から微量なガスが染み出して真空が崩れがち。そこで外周を金・スズ共晶ハンダ（AuSn）で完全溶接し、さらに内壁に染み出たガス分子を片っ端から化学吸着して食べ尽くす「Ti/Zr/V ゲッター薄膜」を仕込んでいるのです！',
    summary:
      'Infineon Sealed Dual Membrane（SDM）等の真空・低圧封止MEMSキャビティを支えるウェハレベル Au80/Sn20 共晶気密接合フレームと、残留アウトガス分子を化学吸収する Ti/Zr/V 非蒸発型ゲッター（NEG）薄膜。',
    opticsAndPhysics: [
      '280℃付近の Au80Sn20 共晶ウェハボンディング（または AlGe 接合）により、Heリーク率 10⁻¹² atm·cm³/s 以下の完全気密リングをウェハ単位で一括形成します。',
      '約300℃の活性化ベークを施したナノ多孔質 Ti/Zr/V NEG薄膜が、封止後に内壁から放出される H₂・O₂・CO・N₂・H₂O 分子を化学結合で永久固定し、キャビティ圧力を20 mbar未満の低圧に15年以上維持します。',
      '二重膜間の空気分子密度を極限まで下げることで、スクイーズフィルム粘性ダンピング由来の熱雑音を数dB劇的に削減できます。',
    ],
    formula: {
      expression: 'P_cavity(15 yr) < 20 mbar（AuSn気密封止 ＋ Ti/Zr/V NEG化学吸着ポンプ効果）',
      description: '金属同士の完全溶接と「ガスを食べるナノ金属膜」のタッグで、超静かな真空室を十数年キープします',
    },
    nextGenInnovation:
      '真空封止＋NEGゲッター技術は、超高SNRマイクだけでなく次世代慣性センサー（ジャイロ）や光MEMS共振器にも横展開される基盤技術です。',
    specs: [
      { label: '気密接合材', value: 'Au80/Sn20 共晶ハンダ枠（融点 280℃、ウェハレベル封止）' },
      { label: 'ゲッター膜', value: 'ナノ多孔質 Ti / Zr / V 非蒸発型ゲッター（NEG）薄膜' },
      { label: '維持圧力', value: '低圧・準真空（< 20 mbar）を15年以上安定維持' },
      { label: '音響効果', value: '粘性空気ダンピング熱雑音低減 → 73 dB(A) SNR＆IP57達成' },
    ],
    diagramType: 'mc_sdm_ausn_getter_vacuum_seal',
  },

  'mc-mems-ubm-passivation-stack': {
    title: 'MC125. MEMSダイ Si₃N₄パッシベーション ＆ Ti/Pt/Au UBM耐パープルプレーグ電極パッド積層',
    subtitle: 'MEMS Die Si3N4 Passivation & Ti/Pt/Au Under-Bump Metallurgy (UBM) Anti-Purple-Plague Pad Stack',
    category: '金ワイヤーの根元を腐食「紫の病」から守る3層貴金属バリヤー MC125 — 過酷な熱帯ロケでも断線ゼロの信頼性！',
    plainAnalogy:
      'MEMSチップの電極に普通のアルミを使うと、金ワイヤーを繋いだ境界で高温多湿の環境下で「金とアルミが混ざって紫色のボロボロの化合物（パープルプレーグ）」に変化し、やがて音がプツッと途切れる故障が起きます。そこで電極開口部を窒化シリコン（Si₃N₄）の鎧で保護し、チタン（密着）→プラチナ（拡散防止壁）→金（接合）という3層の貴金属サンドイッチ（UBM）を積んで、何年経ってもビクともしない信頼性を実現しているのです！',
    summary:
      'MEMSシリコンダイ表面を保護するPECVD窒化シリコン（Si₃N₄）パッシベーション膜と、金ワイヤーボンド直下に形成される Ti / Pt / Au（または Ni/Au）アンダーバンプメタライゼーション（UBM）拡散バリア積層。',
    opticsAndPhysics: [
      'AlパッドとAuワイヤーの直接接合では AuAl₂ 等の脆い金属間化合物（パープルプレーグ）とカーケンダルボイドが成長し接触抵抗が急増します。',
      'Ti（下地酸化膜との強固な密着層）／Pt（金と下地金属の相互拡散を止める高融点バリア層）／Au（酸化せず低抵抗な表面接合層）の3層構造により、Au-Au同種金属接合を実現します。',
      '周囲を緻密な Si₃N₄ 耐湿パッシベーション膜で被覆することで、音孔経由の塩分・湿気・大気硫黄ガスによる電極腐食を阻止し、JEDEC47/IEC 60749信頼性試験をクリアします。',
    ],
    formula: {
      expression: 'SiO₂ / Si₃N₄ 窓開け → Ti (50 nm) / Pt (100 nm) / Au (300 nm)  ⇒  Au–Au 金属間化合物ゼロ！',
      description: 'チタンとプラチナの「防壁層」を挟んで金同士を繋ぐことで、高温多湿でも一生サビない配線口を作ります',
    },
    nextGenInnovation:
      '自動車・アウトドアカメラ向けMEMSでは、IEC 60749 85℃/85% RH 1,000時間連続通電試験を無劣化で通過するための標準電極プロセスです。',
    specs: [
      { label: '表面保護膜', value: '緻密 PECVD 窒化シリコン（Si₃N₄）耐湿・耐イオンパッシベーション' },
      { label: 'UBM積層', value: 'Ti（密着層）/ Pt（拡散障壁）/ Au（ワイヤーボンド接合面）' },
      { label: '防止故障', value: 'AuAl₂ パープルプレーグ・カーケンダルボイド・湿気腐食' },
      { label: '信頼性規格', value: 'JEDEC JESD47 / IEC 60749（85℃ / 85% RH 耐久）準拠' },
    ],
    diagramType: 'mc_mems_ubm_passivation_stack',
  },

  'mc-mems-bist-electrostatic-test': {
    title: 'MC126. MEMS内蔵セルフテスト（BIST）静電加振 ＆ 音孔目詰まり自己診断回路',
    subtitle: 'MEMS Built-In Self-Test (BIST) Electrostatic Actuation & Blocked-Port Impedance Health Monitor',
    category: 'マイクが自分で鼓膜を揺らして健康診断する自己点検メカ MC126 — 水滴詰まりや感度劣化を瞬時に自動検知！',
    plainAnalogy:
      '雨の中で撮影した後、防水膜に水滴やホコリが詰まって音がこもっていても、録り終わるまで気づかないと大惨事になります。そこで最新MEMS ASICに組み込まれているのが「BIST（内蔵セルフテスト）」！電極に一瞬だけ極小の静電気パルスを掛けて鼓膜を自分でチョンと引っ張り、その跳ね返り方（静電容量の変化と減衰の仕方）を測ることで、音孔の詰まりや膜の異常を0.01秒で自己診断できるのです！',
    summary:
      'MEMS固定電極へ既知の静電加振テスト電圧を印加し、振動膜の変位応答とプルイン電圧近傍の静電容量曲線から機械的コンプライアンス・音孔閉塞・感度ドリフトを自動診断するBIST/BISR回路。',
    opticsAndPhysics: [
      'コンデンサーMEMSは可逆トランスデューサであり、静電力 F_e = ½ (εA / d²) V_test² で膜を数ナノメートル加振すると、音響負荷インピーダンス（音孔の詰まり具合）に応じて共振ピークとダンピング比が顕著に変化します。',
      '電源投入時や無音待機中に可聴域外または超微弱テスト信号を印加し、出荷時の基準シグネチャと比較することで水滴付着・膜固着・感度低下を即座に検出します。',
      'さらにバイアス電圧 V_bias を微調整して経年感度ドリフトを自動再校正する BISR（Built-In Self-Repair）制御への発展も研究されています。',
    ],
    formula: {
      expression: 'F_BIST = (ε₀ · A / 2 d²) · V_test²   →   ΔC(t) 減衰波形から音孔閉塞＆膜剛性を診断！',
      description: '電気の力で鼓膜をそっと揺らして戻りの速さを測り、音孔に水やホコリが詰まっていないか自分で点検します',
    },
    nextGenInnovation:
      'マルチマイク・ビームフォーミング機では1個でも音孔が詰まると指向性が崩れるため、BIST診断結果で自動的に正常カプセルへ重み付けを逃がすフェイルセーフが実用化されています。',
    specs: [
      { label: '診断方式', value: '静電アクチュエーション加振 ＋ ΔC/プルイン特性解析（BIST）' },
      { label: '検知項目', value: '防水膜水滴詰まり・異物固着・膜破損・感度ドリフト' },
      { label: '診断所要時間', value: '< 10 ms（電源ON時または無音インターバルで自動実行）' },
      { label: '連携機能', value: 'EVF異常警告・ビームフォーマー自動フェイルセーフ切替' },
    ],
    diagramType: 'mc_mems_bist_electrostatic_test',
  },

  'mc-pdm-lr-edge-mux-tristate': {
    title: 'MC127. PDMステレオ L/Rセレクト 立ち上がり／立ち下がりエッジ・トライステート多重化回路',
    subtitle: 'PDM Stereo L/R-Select Rising/Falling-Edge Tri-State Output Multiplexer (2-Mic 1-Wire Time-Division Bus)',
    category: '左右2個のマイクを「たった1本のデータ線」で交互に送る早業 MC127 — クロックの上がり目と下がり目で時分割！',
    plainAnalogy:
      '狭いカメラの天面に左右ステレオマイクを並べるとき、配線は1本でも減らしたいもの。デジタルPDMマイクには「L/Rセレクトピン」という賢い切替端子があり、左マイクはGND、右マイクはVDDへ繋いでおきます。すると左マイクはクロックの「上がり目」だけ喋ってすぐ沈黙（ハイインピーダンス）、右マイクは「下がり目」だけ喋るという息ピッタリの交代制で、たった1本のDATA線を2個でシェアできるのです！',
    summary:
      'Infineon AN558・IM66D130M・Knowles・ST MP45DT02 等のデジタルPDM MEMSマイクに内蔵される L/R チャネル選択ラッチおよび高速トライステート出力ドライバ（T_dis < 90 ns）。',
    opticsAndPhysics: [
      'PDM_CLK（例：2.4 MHz / 3.072 MHz）の1周期の前半（L/R=0：立ち上がりエッジ駆動）で左マイクがDATA線をドライブし、後半は出力段をハイインピーダンス（Hi-Z）へ切り離します。',
      '同時に右マイク（L/R=1：立ち下がりエッジ駆動）が後半半周期だけDATA線へ1-bit ΔΣストリームを乗せることで、衝突ゼロの完全ステレオ時分割多重（TDM）を2線（CLK＋DATA）のみで実現します。',
      'トップデッキの狭い SH-1035 フレキ配線の本数を半減できるため、配線幅縮小とクロック放射EMI低減に大きく貢献します。',
    ],
    formula: {
      expression: 'f_CLK = 3.072 MHz  →  Rising Edge = Left CH / Falling Edge = Right CH（T_dis < 90 ns Hi-Z切替）',
      description: 'クロックの上がり目で左、下がり目で右が交互に1ビットずつ出力し、1本の線でステレオ音声を運びます',
    },
    nextGenInnovation:
      '4〜8カプセルのマルチマイクアレイでも、わずか2〜4本のDATA線と共通CLK1本で全カプセルのサンプル完全位相同期が実現できます。',
    specs: [
      { label: '選択ピン', value: 'L/R SELECT（GND接続：左／立ち上がり、VDD接続：右／立ち下がり）' },
      { label: '出力段', value: '高速トライステート（Hi-Z切替時間 T_dis ≈ 70–90 ns）' },
      { label: 'クロック帯域', value: '1.024–4.8 MHz 共通PDM_CLK（標準 3.072 MHz = 64×48 kHz）' },
      { label: '配線削減', value: 'ステレオ2chを DATA 1本＋CLK 1本で完全同期伝送' },
    ],
    diagramType: 'mc_pdm_lr_edge_mux_tristate',
  },

  'mc-3m-9495le-diecut-psa-ring': {
    title: 'MC128. レーザー型抜き 3M 9495LE（300LSE / 0.17 mm）音響気密PSAリング ＆ 導電Ni/Cu EMIファブリックガスケット',
    subtitle: 'Laser Die-Cut 3M 9495LE (300LSE, 0.17 mm) Acoustic PSA Sealing Ring & Conductive Ni/Cu EMI Fabric Gasket',
    category: '塗装マグネシウム天面に防水膜をピタッと密着させる0.17 mm特殊テープ MC128 — 導電布クッションでアースも同時確保！',
    plainAnalogy:
      'カメラ天面の塗装されたマグネシウムや撥水ePTFE膜は、普通の両面テープではツルツル滑って剥がれてしまいます。そこで実際の量産カメラでは、低表面エネルギー（LSE）素材にも強力に貼り付く 3M 9495LE（300LSEアクリル粘着・厚さわずか0.17 mm）をレーザーでドーナツ型に型抜きした音響気密シールリングを使い、さらに隣にニッケル銅めっき導電布ガスケットを挟んで音漏れと電波漏れを同時封鎖しているのです！',
    summary:
      '厚さ0.17 mm（PET基材0.013 mm＋300LSEアクリル粘着両面）の3M 9495LEレーザー型抜き音響シーリングリングと、天面筐体‐シールド間を低抵抗導通させるNi/Cuめっき導電ファブリック・フォームガスケット。',
    opticsAndPhysics: [
      '3M 9495LE の 300LSE アクリル粘着剤は、粉体塗装マグネシウムやPP・ePTFE外周枠のような低表面エネルギー（LSE）基材に対しても時間とともに粘着力が向上し、気密音道の剥離（音響ショート）を長期防止します。',
      '中心に0.013 mm（0.5 mil）のPETフィルムキャリアを挟むため、ロボット自動貼合や位置決めプルタブ付き型抜きでも寸法伸びが起きず、φ1 mm級音孔のズレを防ぎます。',
      '下層の導電性Ni/Cuめっき導電布オーバーPUフォームガスケットが、圧縮率30〜50%で筐体とオーディオシールド間を面抵抗 < 0.05 Ω/sq で連続接地します。',
    ],
    formula: {
      expression: 't_PSA = 0.071 + 0.013(PET) + 0.086 = 0.170 mm（300LSE高密着・音道バイパスリークゼロ！）',
      description: 'ツルツル塗装面にもガッチリ付く0.17 mm極薄両面シールと導電布クッションで、音漏れと電波ノイズを同時に防ぎます',
    },
    nextGenInnovation:
      '高耐熱・低アウトガス型抜きPSAと導電ガスケットの複合積層は、IP68級カメラ・スマホの音響ポート量産を支える陰の主役です。',
    specs: [
      { label: '音響粘着リング', value: '3M 9495LE（300LSE 低表面エネルギー用、総厚 0.17 mm）' },
      { label: '基材構成', value: 'PETキャリア 0.013 mm ＋ 表裏300LSEアクリル粘着層' },
      { label: 'EMIガスケット', value: 'Ni/Cuめっき導電ファブリック・オーバーPUフォーム（< 0.05 Ω/sq）' },
      { label: '加工精度', value: '位置決めプルタブ付きレーザー精密型抜き（公差 ±0.05 mm）' },
    ],
    diagramType: 'mc_3m_9495le_diecut_psa_ring',
  },

  'mc-ecm-front-acoustic-cloth-crimp': {
    title: 'MC129. ECMカプセル前面 黒色不織布音響抵抗クロス ＆ 360°アルミかしめロックフランジ',
    subtitle: 'ECM Capsule Front Woven Black Acoustic Cloth Screen Disc & 360° Rolled-Aluminum Crimp-Lock Flange',
    category: 'ECMマイクの顔にある「黒いフェルト円盤」と裏の「360°かしめ」 MC129 — ホコリ止めと高音ピーク調整の二刀流！',
    plainAnalogy:
      'コンデンサーマイク（ECM）の銀色カプセルを正面から見ると、必ず黒い薄い布シールが貼ってあります。あれは単なるホコリ除けではなく、空気の通る抵抗（音響抵抗）を絶妙にコントロールして「高音のキンキンした共振」を滑らかに整える音響フィルターなのです！さらにカプセル背面では、アルミ筒のフチを360°グルリと内側に丸め込む「かしめ加工（クリンプ）」で内部部品を一定圧力で押し固め、ケース全体のアース接続まで完了させます！',
    summary:
      'Same Sky・Primo・TI SNAA114 等の実機ECMカプセル構造に不可欠な、前面音響抵抗不織布スクリーンディスクと、背面360°ロールかしめ（スウェージング）＋導電銀ペースト接地フランジ。',
    opticsAndPhysics: [
      '前面の黒色不織布（ポリエステル／シルク系マイクロファイバー）は所定の音響抵抗 R_a（Rayl値）を持ち、前室ヘルムホルツ共振のQ値を適度にダンプして10–18 kHzの高域ピークを平坦化します。',
      '同時に2.5 μm極薄振動膜へ砂塵・金属粉が吸い込まれるのを防ぐ一次ダストスクリーンとして機能します。',
      '背面のアルミケース外周を精密ダイスで360°内巻きかしめすることで、振動膜・25 μmスペーサー・バックプレート・絶縁カップ・JFET基板の5層スタックへ正確な軸方向予圧を与え、JFET基板外周GNDリングとアルミ殻を全周電気接続します。',
    ],
    formula: {
      expression: 'Q_front = (1 / R_cloth) · √(M_port / C_cavity)   （不織布抵抗 R_cloth で高域共振ピークを平坦化！）',
      description: '黒い不織布の適度な通気抵抗で高音の暴れを抑え、アルミの360°丸め込みかしめで全パーツを密着固定します',
    },
    nextGenInnovation:
      'ECMの個体差を±1 dB以内へ追い込むには、不織布の通気度管理とかしめ圧力の自動サーボプレス制御が鍵を握ります。',
    specs: [
      { label: '前面スクリーン', value: '音響抵抗管理 黒色不織布クロス（防塵＋高域Q値ダンピング）' },
      { label: '封止締結', value: 'アルミケース背面 360°精密ロールかしめ（スウェージング）' },
      { label: '接地構造', value: 'かしめ接触＋導電銀ペーストによる360°ファラデー接地' },
      { label: '対象サイズ', value: 'φ4.0〜6.0 mm 小型カメラ用バックエレクトレットECM' },
    ],
    diagramType: 'mc_ecm_front_acoustic_cloth_crimp',
  },

  'mc-ecm-solderless-contact-parylene': {
    title: 'MC130. ECM無はんだ金めっき圧縮コンタクトリング ＆ JFET基板パリレンC防湿ナノコーティング',
    subtitle: 'ECM Solderless Gold Backplate-to-JFET Compression Contact Ring & Parylene-C Humidity Barrier Coat',
    category: '熱に弱いエレクトレットを「ハンダ無し」で繋ぐ黄金バネ環 MC130 — 密林95%湿度でもバリバリ雑音を出さない防湿コート！',
    plainAnalogy:
      'ECMマイク内部の「永久帯電FEPフィルム」は120℃以上の熱を当てると電気の記憶が消えてしまうため、バックプレート電極とJFET基板をハンダ付けすることができません！そこでハンダの代わりに「金めっきのバネリング」を間に挟んで押し付ける無はんだ接触を採用しています。さらに10億オーム（1 GΩ）という超繊細なJFET入力が雨季の湿気で漏電して「サーッ・バリバリ」と鳴らないよう、真空蒸着の極薄防湿膜「パリレンC」で基板を丸ごと封じ込めているのです！',
    summary:
      'ECM内部の真鍮バックプレート電極とJFETゲートを非加熱接続する金めっきリン青銅ウェーブスプリング接触リング、および1 GΩ高インピーダンスノードを結露リークから守るCVDパリレンC防湿コンフォーマルコート。',
    opticsAndPhysics: [
      'FEP（四フッ化エチレン・六フッ化プロピレン共重合体）エレクトレット層は200℃超のリフロー熱で空間電荷トラップが急速に脱分極するため、カプセル内部電極接続には非加熱の弾性圧縮コンタクトリングが不可欠です。',
      'JFET（2SK596系）のゲート抵抗は 1 GΩ（10⁹ Ω）級と極めて高く、結露により基板表面抵抗が100 MΩへ低下しただけで低域ロールオフと激しいランダム・ポッピング（湿気雑音）が発生します。',
      '室温気相重合（CVD）で成膜するパリレンCは、ピンホール皆無・水蒸気透過率極小のサブミクロン絶縁皮膜をJFET足元の隙間まで均一形成し、湿度95% RHの熱帯雨林撮影でも静寂を保ちます。',
    ],
    formula: {
      expression: 'R_surface(Parylene-C) > 10¹⁴ Ω/sq  ≫  R_gate (10⁹ Ω)   （高湿下でもリーク雑音ゼロ！）',
      description: '熱を使わない金バネ接触で帯電を守り、ピンホール皆無のパリレンC防湿膜で雨季のバリバリ漏電ノイズを封じます',
    },
    nextGenInnovation:
      'ECMの弱点だった「高温多湿環境でのクラックル雑音」を克服し、放送・ネイチャー撮影向けコンデンサーマイクの信頼性を飛躍させました。',
    specs: [
      { label: '無はんだ接点', value: '金めっきリン青銅 6爪ウェーブスプリング圧縮コンタクトリング' },
      { label: '熱保護上限', value: '非加熱圧接（FEPエレクトレット脱分極温度 < 120℃ を完全回避）' },
      { label: '防湿コート', value: '室温気相重合（CVD）Parylene-C 極薄ピンホールレス絶縁膜' },
      { label: '絶縁抵抗', value: '> 10¹⁴ Ω/sq（95% RH 結露環境下での1 GΩゲートリーク防止）' },
    ],
    diagramType: 'mc_ecm_solderless_contact_parylene',
  },
};
