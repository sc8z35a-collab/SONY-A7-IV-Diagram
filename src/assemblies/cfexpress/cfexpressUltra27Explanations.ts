import { PartExplanation } from '../types';

/**
 * Phase 27B — Standalone CFexpress 4.0 Card Ultra-Deep Expansion (+30 Parts C31–C60 -> 60 Total).
 * Beginner-friendly Japanese explanations with vivid everyday analogies (zero raw markdown asterisks).
 * Covers CFA 4.0 mechanical/connector details, PCIe Gen4 SI PCB, 16-die BGA packaging & Kioxia BiCS8–10 CBA 3D NAND!
 */
export const CFEXPRESS_ULTRA27_EXPLANATIONS: Record<string, PartExplanation> = {
  // =========================================================================
  // C31. 20°–30° Leading-Edge PCB Chamfer Bevel (10,000-Cycle Smooth Insertion)
  // =========================================================================
  'cfe-edge-bevel-chamfer': {
    title: 'C31. 20°〜30° エッジコネクタ先端面取り（1万回挿抜スムーズガイド）',
    subtitle: 'CNC 20°–30° Gold-Finger Leading-Edge PCB Bevel Chamfer',
    category: '先端のスロープ加工 C31 — カメラの繊細な金属バネを傷めずスルッと滑り込ませる「滑り台」',
    plainAnalogy:
      'カードをカメラのスロットへ押し込むとき、カードの先端が四角く角張っていたら、カメラ側の細い金属バネにゴンッと引っかかって曲げてしまいますよね。そこで先端のフチを20〜30度のなだらかな滑り台（面取り）に削って、1万回抜き差ししてもバネが優しく乗り上がるようにしているんです！',
    summary:
      '21ピン硬質金メッキ端子（C05）の先端エッジに施された精密CNC面取り（20°〜30°ベベル加工）。カメラ側スロットのコンタクトスプリングを無理なく押し広げ、銅箔のめくれ（ピーリング）とピン折れを防止します。',
    opticsAndPhysics: [
      'ガラスエポキシ基板（FR-4 / 低誘電材）の角を斜めに研磨することで、挿入力のピーク値を約40%低減し、スムーズなクリック挿入感を実現します。',
      '面取りのすぐ後ろから金メッキ接点が始まる「セットバック距離」を精密管理し、挿入の衝撃で金箔の端がめくれ上がる事故を防ぎます。',
      '断面には微細なバリ取り（デバリング）と防湿シーリングを施し、ガラス繊維の微粉がスロット内へ落ちるのを防いでいます。',
    ],
    formula: {
      expression: '面取り角 θ = 20°〜30° ／ 挿抜耐久 > 10,000 サイクル（金箔めくれ 0）',
      description: 'カメラ側の精密ピンを守りながら、高速連写の現場での素早いカード交換を支える微細加工',
    },
    nextGenInnovation:
      'PCIe Gen4（16 GT/s）では先端の余分な銅箔スタブを極限まで削り落とすことで、コネクタ境界での高周波インピーダンス乱れも抑えています。',
    specs: [
      { label: '面取り角度', value: '20°〜30° 精密CNCダイヤモンド研磨' },
      { label: '金箔セットバック', value: '先端から 0.25〜0.35 mm（剥がれ防止）' },
      { label: '挿抜寿命', value: '10,000回以上（CFA機械仕様準拠）' },
      { label: '防塵加工', value: 'ガラス繊維バリ除去＆エッジ平滑仕上げ' },
    ],
    diagramType: 'cfe_edge_bevel_chamfer',
  },

  // =========================================================================
  // C32. Staggered Hot-Plug Contact Pins (First-Make GND/+3V3, Last-Make INS#)
  // =========================================================================
  'cfe-staggered-hotplug-pins': {
    title: 'C32. 先行接触GND・電源＆遅延接触INS#カード検知スタガーピン構造',
    subtitle: 'CFA Staggered Hot-Plug Finger Geometry (First-Make GND/+3V3 & Last-Make INS#)',
    category: '時間差タッチの工夫 C32 — アース→電源→信号→装着完了の順につなぐ「安全な握手の順番」',
    plainAnalogy:
      '21本の金色の指をよく見ると、じつは長さがわずかに段違い（スタガー）になっています！カードを挿した瞬間、まず長いアースと電源の指が先に触れて電気を落ち着かせ、奥まで完全に入った最後に一番短い「入ったよ！ピン（INS#）」が触れてから高速データ通信を始める安全な仕組みなんです。',
    summary:
      'CompactFlash Association（CFA）規格で定められた段差長（スタガー）エッジ端子構造。GND（Pin 1/15/18/21）と+3.3 V（Pin 10）が先行接触（First-Make / Last-Break）し、カード検知ピン`INS#`（Pin 12）が最後に導通します。',
    opticsAndPhysics: [
      '最初にGNDピンが接触してカメラとカードの電位差（静電気）を瞬時にゼロへ揃え、続いて+3.3 V電源、次にPCIe高速差動信号線（PET/PER/REFCLK）がつながります。',
      '一番短い`INS#`ピン（カード内部でGND直結、ホスト側で100〜200 kΩプルアップ）がローになった瞬間に初めてカメラが「装着完了」と認識し、PCIeリセット（PERST#）を解除します。',
      '逆にカードを抜きかけた瞬間は`INS#`が真っ先に切れるため、電源や信号が物理的に離れる前にカメラへ緊急停止を知らせることができます。',
    ],
    formula: {
      expression: '接触順序：GND → +3.3 V → PCIe信号 → INS#（遅延検知・引き抜き時は逆順）',
      description: '活線挿抜（ホットプラグ）時の電気火花・ラッチアップ・データ破損を防ぐ物理シーケンス',
    },
    nextGenInnovation:
      'CFexpress 4.0（PCIe Gen4）でもCFexpress 2.0と完全なピン長・ピン配列互換を維持し、旧カメラでも安全に動作する後方互換性を実現。',
    specs: [
      { label: '先行ピン', value: 'GND（Pin 1,15,18,21）＆ +3V3（Pin 10）' },
      { label: '遅延検知ピン', value: 'INS#（Pin 12・Active Low・カード内GND接続）' },
      { label: '安全効果', value: '静電気先逃がし＋活線抜去の先行検知' },
      { label: '準拠規格', value: 'CFA CFexpress Type A 2.0 / 4.0 共通配列' },
    ],
    diagramType: 'cfe_staggered_hotplug_pins',
  },

  // =========================================================================
  // C33. Asymmetric Side Guide Rails & Push-Push Eject Lock Detent Notch
  // =========================================================================
  'cfe-side-guide-rails-notch': {
    title: 'C33. 非対称サイドガイドレール＆プッシュロック固定ノッチ溝',
    subtitle: 'Asymmetric Side Alignment Rails & Push-Push Camera Slot Retention Detent Notch',
    category: 'カチッと固定の溝 C33 — 裏表を絶対間違えず、押すと「カチッ」と止まる側面のくぼみ',
    plainAnalogy:
      'CFexpress Type Aカードをカメラに入れるとき、指でグッと押すと「カチッ」と止まり、もう一度押すと「ポンッ」と出てきますよね。その秘密がカード側面の細いレールと小さな「くぼみ（ノッチ）」！裏返しに挿そうとするとレールが止めてくれて、正しい向きならくぼみにバネ爪がピタッと掛かるんです。',
    summary:
      'CFexpress Type A規格（20.0 × 28.0 × 2.8 mm）の両側面に精密成形された左右非対称のガイドレールと、カメラ側プッシュ・プッシュ機構のロック爪が係合するサイドリテンションノッチ溝です。',
    opticsAndPhysics: [
      '片側サイドに段差レールを設けることで、暗い現場で裏表を逆にして押し込んでもコネクタ端子へ届く前に物理的にブロックします。',
      'ソニーαシリーズのデュアルスロット（SDカード／CFexpress Type A両用スロット）内で、わずかにサイズの異なる両カードを正確に中心位置決めする基準面にもなります。',
      '振動や落下衝撃を受けてもカードがスロットから浮き上がらないよう、サイドノッチにカメラ側ロックピンが一定の保持力で係合します。',
    ],
    formula: {
      expression: 'Type A 外形 20.0 × 28.0 × 2.8 mm（公差 ±0.10 mm）＋ サイドノッチ保持 > 10 N',
      description: 'SD/CFexpress Type A 兼用ハイブリッドスロットでも確実に位置決め・固定する精密側壁',
    },
    nextGenInnovation:
      'ソニーTOUGHなどの一体成形カードでは、割れやすい別パーツのレールを廃止し高強度樹脂モノコックと一体化することで折損事故を激減。',
    specs: [
      { label: 'ガイド構造', value: '左右非対称ポカヨケ・サイドガイドレール' },
      { label: '固定ノッチ', value: 'プッシュ・プッシュ式イジェクト爪用凹部' },
      { label: '対応スロット', value: 'CFexpress Type A 専用 / SD兼用デュアルスロット' },
      { label: '寸法公差', value: '幅 20.0 ± 0.1 mm ／ 厚さ 2.8 ± 0.1 mm' },
    ],
    diagramType: 'cfe_side_guide_rails_notch',
  },

  // =========================================================================
  // C34. Top/Bottom Metal Armor Laser Spot-Welds & Torsion Stiffening Seam
  // =========================================================================
  'cfe-armor-laser-welds': {
    title: 'C34. 上下メタルアーマー微細レーザー溶接＆剛性クリンプシーム',
    subtitle: 'Perimeter Micro-Laser Spot Welds & Mechanical Interlock Crimp Tabs',
    category: '鉄壁の縫い目 C34 — 上下の金属板を点レーザーでガッチリ縫い合わせ、曲げや落下に負けない箱に',
    plainAnalogy:
      '2枚の薄い金属板も、フチ同士がバラバラだとペラペラ曲がってしまいます。上下の金属アーマーの周りを精密なレーザー光線で何十か所も「ジジッ」と溶接し爪で噛み合わせることで、15キロの力で曲げても7.5メートルから落としても壊れない、頑丈なミニ金庫の箱に生まれ変わるんです！',
    summary:
      '上面メタルアーマー（C01）と下面ベースシェル（C02）の接合縁に施されたパルスファイバーレーザー微細スポット溶接と、折り返しインターロック爪（クリンプシーム）構造です。',
    opticsAndPhysics: [
      '上下の金属シェルを箱型閉断面（ボックスビーム構造）として剛結することで、単純な2枚重ねに比べて曲げ剛性とねじり剛性が飛躍的に向上します。',
      'ソニーCEA-G TOUGH規格では曲げ強度150 N（約15 kgf、規格比10倍）、落下耐性7.5 m（規格比5倍）という圧倒的な機械強度をこの接合構造と一体樹脂が支えます。',
      '溶接熱が内部の3D NANDや防水シール（C04）へ伝わらないよう、ミリ秒単位の極短パルスレーザーで接合点のみを局所溶融させます。',
    ],
    formula: {
      expression: '曲げ耐力 150 N（規格比 10×） ／ 落下耐性 7.5 m（閉断面ボックス剛性）',
      description: '薄さわずか2.8 mmの極薄カードに、踏まれても折れにくい圧倒的な構造強度を付与',
    },
    nextGenInnovation:
      '2025〜2026年のプロ用カード（Angelbird / Sony TOUGH / ProGrade Iridium）では、金属シェル全面をヒートシンク兼用にする連続レーザー接合が拡大。',
    specs: [
      { label: '接合工法', value: 'パルスファイバーレーザー微細スポット溶接＋爪カシメ' },
      { label: '曲げ強度', value: '最大 150 N（CFexpress標準規格の約10倍）' },
      { label: '耐落下衝撃', value: '最大 7.5 m（コンクリート面落下試験）' },
      { label: '構造効果', value: '基板の反り防止によるBGAハンダクラック抑止' },
    ],
    diagramType: 'cfe_armor_laser_welds',
  },

  // =========================================================================
  // C35. Shell-to-PCB EMI Grounding Spring Clips & Conductive Fabric Gasket
  // =========================================================================
  'cfe-emi-ground-spring-clips': {
    title: 'C35. シェル導通EMIグラウンドスプリングクリップ＆導電ガスケット',
    subtitle: 'Beryllium-Copper PCB-to-Shell EMI Grounding Clips & Conductive Gasket',
    category: '電波を逃がすアース橋 C35 — 金属の殻と基板のアースをつなぎ、超高速ノイズを閉じ込める',
    plainAnalogy:
      'CFexpress 4.0の中では1秒間に160億回もの超高速な電気信号が飛び交っているので、放っておくとカメラのWi-Fiやマイクに「ジーッ」とノイズが漏れてしまいます。基板のアースと外側の金属カバーをこの小さなバネクリップで直接つなぐことで、金属ケース全体が完璧な電波バリアになるんです！',
    summary:
      '8層HDI基板（C07）外周のグラウンドパッドと上下メタルアーマー（C01/C02）を低インピーダンスで直結するベリリウム銅製ミニスプリングクリップと導電性Ni-Cuファブリックガスケットです。',
    opticsAndPhysics: [
      '金属外装が電気的に宙に浮いている（フローティング状態）と逆にアンテナ化してノイズを放射してしまいます。複数点のアースクリップでGNDへ落とすことで真のファラデーケージが完成します。',
      'PCIe Gen4（基本波8 GHz・高調波16〜24 GHz）の放射EMIを20 dB以上減衰させ、カメラ内蔵のWi-Fi 6E／Bluetooth／GNSSアンテナ感度低下を防ぎます。',
      '外部からカード表面へ静電気が飛んだ際も、内部チップを通さず金属シェル→アースクリップ→GNDピンへと安全に逃がすESDバイパス経路になります。',
    ],
    formula: {
      expression: 'シェル接地インピーダンス Z_gnd < 50 mΩ ／ 放射EMI低減 > 20 dB（〜16 GHz）',
      description: '金属外装を完全なシールド筐体として機能させ、カメラ無線・音声へのノイズ干渉を遮断',
    },
    nextGenInnovation:
      'CFexpress 4.0世代では8 GHz帯の波長（約37 mm）がカード長（28 mm）に近づくため、外周4〜6点の多点グラウンド接続による共振防止が不可欠。',
    specs: [
      { label: 'クリップ材質', value: '金メッキ・ベリリウム銅マイクロ板バネ' },
      { label: '補助シール', value: 'Ni-Cuメッキ導電ファブリックガスケット' },
      { label: '接地点数', value: '基板外周 4〜6点 低インピーダンス多点接地' },
      { label: 'シールド帯域', value: '100 MHz 〜 16 GHz（PCIe Gen4高調波対応）' },
    ],
    diagramType: 'cfe_emi_ground_spring_clips',
  },

  // =========================================================================
  // C36. Next-Gen Ultra-Thin Micro-Vapor Spreader / Thermal Fin Plate (CFexpress 4.0)
  // =========================================================================
  'cfe-micro-vapor-fin-plate': {
    title: 'C36. 次世代超薄型マイクロ放熱フィン＆ヒートスプレッダ熱拡散層',
    subtitle: 'CFexpress 4.0 Sustained-Write Micro-Grooved Thermal Fin / Vapor-Spreader Layer',
    category: '熱の高速道路 C36 — 8K RAW録画で燃えるように熱いチップの熱をカード全面へ一気に逃がす',
    plainAnalogy:
      'CFexpress 4.0は1秒間に約2GBもの動画データを休みなく書き込むので、小さなコントローラチップが小さなカイロみたいにアツアツになります。放っておくと熱暴走を避けるため速度が落ちてしまいますが、この微細な溝（フィン）付きの金属熱拡散板が熱をカード全体へサッと散らして冷やし続けるんです！',
    summary:
      'CFexpress 4.0（VPG800・連続書込1,600〜1,900 MB/s）の3〜5 Wピーク発熱を処理するため、上面アーマー内面に統合された極薄マイクログルーブ熱拡散／次世代超薄型ベイパーヒートプレート層です。',
    opticsAndPhysics: [
      'コントローラSoC（C08）のわずか数mm四方に集中する高密度な熱流束（ヒートフラックス）を、面内熱伝導率の高い構造で20×28 mmの全面へ瞬時に拡散します。',
      '熱をカード全体へ均等に広げることで、カメラ側スロットの金属ガイドレールやサーマルシートへの放熱面積を最大化し、サーマルスロットリング（速度低下）発動を大幅に遅らせます。',
      '2025〜2026年のフラッグシップカード（Sony CEA-G 4.0 / Nextorage NX-A2PRO / ProGrade Iridium等）では、7 nm低電力コントローラとこの熱拡散構造の併用で8K X-OCNやRAWの長時間連続収録を実現しています。',
    ],
    formula: {
      expression: '連続放熱許容 P_th ≈ 3.5〜4.8 W ／ チップ〜外装温度差 ΔT 約 35% 低減',
      description: '小さなType AカードでVPG800（最低800 MB/s保証）の長時間連続録画を支える熱設計',
    },
    nextGenInnovation:
      '2026年以降の次世代Type A/Bカードでは厚さ0.25 mm級の極薄銅メッシュ・マイクロベイパーチャンバー（二相冷却板）の内蔵研究が進展。',
    specs: [
      { label: '構造仕様', value: '極薄 0.25〜0.30 mm マイクロ溝熱拡散プレート' },
      { label: '対応発熱量', value: '3.5 〜 5.0 W（PCIe Gen4連続8K録画負荷）' },
      { label: '熱結合経路', value: 'SoC → グラフェンTIM → 熱拡散層 → メタル外装' },
      { label: '持続性能', value: 'VPG400 / VPG800 サーマルスロットリング抑制' },
    ],
    diagramType: 'cfe_micro_vapor_fin_plate',
  },

  // =========================================================================
  // C37. High-Emissivity Thermal Coating & Laser-Etched VPG800 / Serial Badge
  // =========================================================================
  'cfe-vpg800-laser-serial': {
    title: 'C37. 高放射率マット黒放熱塗装＆レーザー刻印VPG800／シリアル銘板',
    subtitle: 'High-Emissivity Thermal Radiation Back Coating & Permanent Laser VPG800 / Serial Mark',
    category: '赤外線放熱＆プロ保証刻印 C37 — 実は「黒いツヤ消し」は熱を外へ逃がしやすくする科学のワザ！',
    plainAnalogy:
      'カードの裏面がツヤ消しの黒っぽい塗装になっているのには、見た目のカッコよさ以上の秘密があります！ツヤ消しの黒い金属はピカピカの銀色より「赤外線」として熱を何倍も遠くへ逃がせる（熱放射率が高い）んです。さらに絶対に消えないレーザーでVPG800の保証マークと番号も刻まれています。',
    summary:
      'カード裏面メタルシェルに施された高赤外線放射率（ε ≈ 0.85〜0.92）のセラミック系マットブラック放熱コーティングと、永久レーザー刻印されたVPG400/VPG800動画性能保証ロゴ・個別シリアル番号です。',
    opticsAndPhysics: [
      'ステファン・ボルツマンの法則（Q = εσAT⁴）により、裸のステンレス（放射率ε≈0.15）に比べ、マット黒放射コート（ε≈0.90）は狭いカードスロット内での赤外線放射放熱を約5〜6倍に高めます。',
      'VPG800（Video Performance Guarantee 800）ロゴは、カード全域で最低800 MB/sの連続書き込みを1フレームも落とさず維持できる厳格なCFA公式認証を取得した証です。',
      '裏面の個別シリアルコードと製造バッチ番号はレーザー刻印されており、データ復旧サービスや保証交換時の個体識別に使われます。',
    ],
    formula: {
      expression: '赤外線熱放射 P_rad = ε · σ · A · (T⁴ − T₀⁴) ／ 放射率 ε ≈ 0.15 → 0.90（約6倍）',
      description: 'ファンレス密閉スロット内でも赤外線放射でカード温度を下げる表面熱工学＋VPG800認証刻印',
    },
    nextGenInnovation:
      '2025〜2026年のCFexpress 4.0 Type A（Nextorage NX-A2PRO / ProGrade Iridium / Angelbird AV PRO v4等）でVPG800認証取得カードが一気に普及。',
    specs: [
      { label: '表面処理', value: '高熱放射セラミック系マットブラック塗装（ε≈0.90）' },
      { label: '認証マーク', value: 'CFA VPG400 / VPG800（最低保証 400〜800 MB/s）' },
      { label: '刻印方式', value: '耐摩耗レーザーマーキング（シリアル＆QR追跡）' },
      { label: '副次効果', value: '指紋汚れ防止＋耐擦傷＋赤外線放熱促進' },
    ],
    diagramType: 'cfe_vpg800_laser_serial',
  },

  // =========================================================================
  // C38. PCIe Gen4 85-Ohm Impedance-Matched Differential Pair & Serpentine Traces
  // =========================================================================
  'cfe-diff-85ohm-serpentine': {
    title: 'C38. PCIe Gen4 85Ω整合差動ペア＆蛇行等長配線（サーペンタイン）',
    subtitle: 'PCIe Gen4 16 GT/s 85-Ohm Controlled-Impedance Differential Pairs & Length-Matched Serpentines',
    category: '電気のゴール同時到着レース C38 — クネクネ道を作って2本の信号が1兆分の1秒もズレずにゴール！',
    plainAnalogy:
      '基板をよく見ると、2本組の銅の線がわざとクネクネ蛇行（サーペンタイン）している場所があります。カーブでは内側のレーンのほうが距離が短くて早く着いてしまうので、内側の線に小さなクネクネ遠回りを作って、1秒間に160億回走るプラスとマイナスの信号がピッタリ同時にゴールできるように揃えているんです！',
    summary:
      '21ピン端子からコントローラSoC（C08）までを接続する、特性インピーダンス85 Ω±5%厳密管理のPCIe Gen4差動伝送ペア（PETp0/n0・PERp0/n0・REFCLK±）とピコ秒精度の蛇行等長配線です。',
    opticsAndPhysics: [
      'PCIe Gen4（16 GT/s）では1ビットの幅がわずか62.5ピコ秒（光がたった1.8 cmしか進まない時間！）しかないため、ペア間の配線長差を0.125 mm（5 mil）以内に抑える必要があります。',
      'プラス線とマイナス線を逆位相で並走させる差動伝送により、外部ノイズを互いに打ち消し合い、85 Ω整合で信号の跳ね返り（反射）を防止します。',
      'ガラス繊維の織り目のスキマで伝搬速度が変わる「ファイバーウィーブ効果」を避けるため、配線をわずかに斜め（ジグザグ約10°）に走らせる最新基板設計も使われます。',
    ],
    formula: {
      expression: 'Z_diff = 85 Ω ± 5% ／ ペア内配線長誤差 ΔL < 0.125 mm（Δt < 0.8 ps）',
      description: '16 GT/s超高速PCIe Gen4のアイパターンをくっきり開かせるミクロン精度の高周波銅配線',
    },
    nextGenInnovation:
      'CFexpress 4.0（16 GT/s）から将来のPCIe Gen5（32 GT/s）世代では、低粗度HVLP銅箔とスプレッドガラス基板による表皮効果損失低減が鍵。',
    specs: [
      { label: '特性インピーダンス', value: '差動 85 Ω ± 5%（PCIe Gen3/4標準）' },
      { label: '等長マッチング', value: 'ペア内スキュー < 0.125 mm（サーペンタイン補正）' },
      { label: '信号速度', value: '16 GT/s（Type A x1 ＝ 理論約 2 GB/s）' },
      { label: '銅箔仕様', value: '超平滑 HVLP 銅箔（高周波表皮損失を抑制）' },
    ],
    diagramType: 'cfe_diff_85ohm_serpentine',
  },

  // =========================================================================
  // C39. Laser Blind Micro-Vias & Stub-Free Back-Drilled High-Speed Vias
  // =========================================================================
  'cfe-backdrilled-microvias': {
    title: 'C39. レーザー極細マイクロビア＆バックドリル高速貫通ビア',
    subtitle: 'Stacked Laser Blind Micro-Vias (<75 μm) & Stub-Free Back-Drilled PCIe Vias',
    category: '基板の垂直エレベーター C39 — 8階建て基板のフロア間を最短で結び、信号の「行き止まり」を削り取る',
    plainAnalogy:
      '8層基板（C07）は8階建てのビルのようなもので、電気信号が上の階と下の階を行き来するには「ビア」という銅の縦穴エレベーターを使います。超高速なPCIe 4.0では、使わない階まで穴が突き抜けていると「行き止まりの袋小路」で電波が反響してしまうので、レーザーで必要な階だけ掘ったり余分な先を削り取るんです！',
    summary:
      '8層0.5 mm極薄HDI基板の内部で層間接続を担う直径50〜75 μmのレーザーブラインドマイクロビアと、高周波信号反射の原因となる余剰ビアスタブを除去するバックドリル／任意層（Any-Layer）ビア構造です。',
    opticsAndPhysics: [
      'BGAパッケージ（0.35〜0.4 mmボールピッチ）の真下に直接銅充填ビアを配置する「Via-in-Pad（VIPPO）」構造により、極小Type A基板上にコントローラ・DRAM・NANDを高密度実装できます。',
      '貫通ビアに余分な銅筒（スタブ）が残ると特定周波数で共振ノッチが生じ、16 GT/s信号の波形が潰れてしまいます。必要な層間のみをつなぐマイクロビア／バックドリルでスタブ長をほぼゼロにします。',
      'コントローラやPMIC直下には数十本のサーマルビア（熱エレベーター）を密に並べて、チップの熱を基板裏面の銅プレーンへ素早く逃がしています。',
    ],
    formula: {
      expression: 'ビア径 φ50〜75 μm（UVレーザー穿孔） ／ 残存スタブ長 < 0.10 mm（反射抑止）',
      description: '極薄0.5 mm基板の8層立体配線と、16 GT/s超高速信号の無反射伝送を両立する微細縦穴',
    },
    nextGenInnovation:
      '2025〜2026年の2 TB〜4 TB級超大容量Type Aカードでは全層レーザー接続のAny-Layer HDI基板と銅めっき充填ビアが標準化。',
    specs: [
      { label: 'ビア加工法', value: 'UVレーザーブラインドマイクロビア＋銅フィルVIPPO' },
      { label: '最小穴径', value: '50 〜 75 μm（髪の毛と同等の極細縦配線）' },
      { label: '高周波対策', value: 'スタブレス構造＋周囲GNDステッチビア囲い' },
      { label: '放熱機能', value: 'コントローラ直下サーマルビアアレイで裏面排熱' },
    ],
    diagramType: 'cfe_backdrilled_microvias',
  },

  // =========================================================================
  // C40. Integrated eFuse & Soft-Start Inrush-Limiting Hot-Plug Load Switch
  // =========================================================================
  'cfe-efuse-hotplug-switch': {
    title: 'C40. eFuse電子ヒューズ＆突入電流ソフトスタート・ロードスイッチIC',
    subtitle: 'Integrated 3.3 V eFuse Electronic Protection & Slew-Rate Soft-Start Load Switch',
    category: '電気のソフトドアマン C40 — カードを挿した瞬間の「電気のドッと流れ込み」を優しく抑えて守る',
    plainAnalogy:
      'カードをカメラに挿した瞬間、カード内部の空っぽなコンデンサへ一気に大電流が「ドバッ！」と流れ込むと、カメラ本体の電源が一瞬ガクッと落ちてフリーズすることがあります。この電子ヒューズ（eFuse）は水道蛇口をゆっくり開けるように電気を流し、異常な高電圧やショートが起きたら100万分の1秒で止めるんです！',
    summary:
      'Pin 10（+3.3 V）入力のすぐ後ろに配置されたスマート電子ヒューズ（eFuse）＆突入電流制御ロードスイッチIC。ソフトスタート、過電圧クランプ（OVP）、過電流遮断（OCP）、逆流防止を1チップで担います。',
    opticsAndPhysics: [
      'カード挿入直後に電源立ち上がりスルーレートを約0.5〜2 msかけて滑らかに上昇させ、PLPコンデンサ（C19）等への突入電流（インラッシュ）を抑えてカメラ本体の電圧ドロップを防ぎます。',
      '粗悪なカードリーダーから誤って5 V過電圧が印加された場合でも、約3.8 Vで即座に入力を遮断（OVP）して貴重な撮影データが入ったNANDとSoCを焼損から守ります。',
      '物理ヒューズと違って一度切れても壊れず、異常が取り除かれれば自動復帰するスマート保護機能を備えます。',
    ],
    formula: {
      expression: '突入電流制限 I_inrush < 1.5 A ／ OVP高速遮断 t_off < 2 μs（V_ov ≈ 3.8 V）',
      description: 'カメラ電源の瞬断トラブルと、故障リーダーによるカード焼損を未然に防ぐ入力守護神',
    },
    nextGenInnovation:
      '2025〜2026年世代ではPLP停電保護時にカード側コンデンサの電荷がカメラ側へ逆流するのを瞬時に防ぐ「真逆流遮断（True Reverse Current Blocking）」機能が必須。',
    specs: [
      { label: '定格入力', value: '+3.3 V ± 5%（オン抵抗 R_on ≈ 25 mΩ）' },
      { label: 'ソフトスタート', value: '出力立ち上がり制御による突入電流抑制' },
      { label: '保護機能', value: 'OVP過電圧・OCP過電流・サーマル・逆流遮断' },
      { label: 'パッケージ', value: '極小 WLCSP / DFN-6（1.5 × 1.5 mm）' },
    ],
    diagramType: 'cfe_efuse_hotplug_switch',
  },

  // =========================================================================
  // C41. Multi-Rail Power Ferrite Beads & High-Frequency Common-Mode Noise Filters
  // =========================================================================
  'cfe-ferrite-cm-choke': {
    title: 'C41. 電源系統別フェライトビーズ＆高周波ノイズ遮断フィルタ群',
    subtitle: 'Power-Domain Isolating Ferrite Beads & High-Frequency Analog PHY Noise Filters',
    category: '電源の防音カーテン C41 — デジタル回路の激しい雑音が繊細な高速通信へ漏れないよう仕切る',
    plainAnalogy:
      'カードの中では「NANDに書き込む力仕事（1.8V/3.3V）」「頭脳チップの計算（0.8V）」「カメラと超高速通信する繊細な耳（1.2V）」が同じ電気を分け合っています。力仕事の振動が繊細な耳に響かないよう、電気の通りの途中に「フェライト」という特殊な磁性体の防音カーテンを挟んで静かにしているんです。',
    summary:
      'PMIC（C17）から各ブロックへ分岐する電源レール間に挿入された0402/0201多層チップフェライトビーズ群。デジタル負荷のスイッチングリップルを遮断し、PCIe Gen4アナログPHYとPLLクロック（C22）へ超クリーンな電源を供給します。',
    opticsAndPhysics: [
      'フェライトビーズは直流（DC）に対しては数十mΩの低い抵抗で電気をロスなく通す一方、100 MHz〜数GHzの高周波ノイズに対しては数百Ωの高い抵抗成分に変わり、雑音を熱へ変えて消し去ります。',
      'PCIe Gen4の16 GT/s送受信回路（SerDes PHY）や100 MHz PLLの電源にノイズが乗るとジッター（時間ブレ）が増えて通信エラーになるため、専用のフェライト＋コンデンサπ型フィルタで徹底的に浄化します。',
      'NANDの瞬間的な同時書き込み（ページプログラム）時の電源揺れがコントローラ側へ逆流するのを防ぐアイソレーションの役割も果たします。',
    ],
    formula: {
      expression: 'DC抵抗 R_DC < 0.05 Ω ／ 高周波インピーダンス Z ≈ 220–600 Ω @ 100 MHz〜1 GHz',
      description: '直流パワーはロスなく通し、GHz帯のデジタル電源ノイズだけを吸収する電源分離フィルタ',
    },
    nextGenInnovation:
      'CFexpress 4.0世代ではPCIe 4.0の8 GHz帯までインピーダンスが落ちにくいGHz特化型ニッケル亜鉛フェライトビーズが採用されています。',
    specs: [
      { label: '素子種別', value: '多層チップフェライトビーズ（0402 / 0201サイズ）' },
      { label: '分離電源域', value: 'PCIe PHY 1.2 V・PLL 1.8 V・NAND VCCQ 1.2/1.8 V' },
      { label: 'フィルタ構成', value: 'フェライト＋極小MLCCによるπ型ローパスフィルタ' },
      { label: '効果指標', value: 'ジッター低減＆電源クロストーク > 30 dB 抑制' },
    ],
    diagramType: 'cfe_ferrite_cm_choke',
  },

  // =========================================================================
  // C42. PCIe Sideband Control Logic (PERST# Reset & CLKREQ# L1.2 Power Saving)
  // =========================================================================
  'cfe-pcie-sideband-logic': {
    title: 'C42. PERST#リセット／CLKREQ#省電力（L1.2）サイドバンド制御回路',
    subtitle: 'PCIe Sideband Signal Conditioning (PERST# Reset, CLKREQ# L1.2 Substate & Pull-Ups)',
    category: '省エネお昼寝スイッチ C42 — 撮影していないスキマ時間に0.005Wへ眠らせカメラの電池を長持ち！',
    plainAnalogy:
      'CFexpressカードはパソコンの超高速SSDと同じ中身なので、ずっと全力運転しているとカメラのバッテリーをあっという間に食べてしまいます。そこでカメラと合図し合う専用ピン（CLKREQ#）を使い、シャッターを押していない一瞬の合間にカードを「深いお昼寝（L1.2省電力）」へ切り替えて電池を守っているんです！',
    summary:
      'CFA 21ピン端子の制御信号ピン`PERST#`（Pin 9：リセット）および`CLKREQ#`（Pin 11：クロック要求／L1.2省電力制御）のプルアップ／プルダウン抵抗・レベルシフト・ノイズフィルタ回路群です。',
    opticsAndPhysics: [
      '撮影待機中、コントローラが`CLKREQ#`を解放すると、カメラは100 MHz基準クロック（REFCLK）まで完全に停止する「PCIe L1.2サブステート」へ移行し、カード消費電力を数Wからわずか約5 mW以下（約1/500！）へ削減します。',
      'シャッター半押しや録画ボタンを押した瞬間、わずか数十マイクロ秒で`CLKREQ#`を再アサートして16 GT/sフルスピードへ瞬時復帰します。',
      '`PERST#`信号は電源安定後にコントローラとNANDをクリーンに起動・再初期化するハードウエアリセット線で、誤動作防止のシュミットトリガ／RCフィルタを通ります。',
    ],
    formula: {
      expression: 'アクティブ約 2.5–4.0 W ↔ L1.2スリープ約 5 mW（待機電力 99.8% 削減！）',
      description: 'カメラのバッテリー撮影枚数を犠牲にせず、PCIe Gen4の爆速転送を両立する省電力通信制御',
    },
    nextGenInnovation:
      'CFexpress 4.0コントローラ（7 nm / 6 nm級）はNVMe APST（自律電源状態遷移）とL1.2サブステートを細かく連携させ、発熱も劇的に低減。',
    specs: [
      { label: '制御ピン', value: 'PERST#（Pin 9）・CLKREQ#（Pin 11）・REFCLK±（Pin 13/14）' },
      { label: '省電力規格', value: 'PCIe ASPM L1.1 / L1.2 サブステート＋NVMe APST' },
      { label: '復帰時間', value: '数十 μs（シャッタータイムラグへの影響ゼロ）' },
      { label: '待機電力', value: '約 3〜10 mW（撮影待機時の発熱と電池消費を抑制）' },
    ],
    diagramType: 'cfe_pcie_sideband_logic',
  },

  // =========================================================================
  // C43. PLP Hold-Up Capacitor Health Monitor MCU & Bleed-Check Circuit
  // =========================================================================
  'cfe-plp-cap-health-mcu': {
    title: 'C43. PLP停電保護コンデンサ健全性監視回路＆放電自己診断部',
    subtitle: 'Power-Loss-Protection (PLP) Tantalum Capacitor Capacitance Self-Test & Monitor',
    category: '非常用バッテリーの点検係 C43 — いざという時本当にデータが救えるか、毎回電源ONでテスト！',
    plainAnalogy:
      '撮影中にうっかり電池が切れても動画を壊さず保存してくれる非常用コンデンサ（C19）ですが、何年も使うと少しずつ体力が弱ることがあります。そこで2025〜2026年のプロ用カードは、カメラの電源を入れるたびにこの点検係が非常用コンデンサの元気さを自動テストして、弱っていたら早めに教えてくれるんです！',
    summary:
      '停電保護用タンタルコンデンサバンク（C19）の静電容量とESR（内部抵抗）を起動時および運用中に定期テストするPLPキャパシタ健全性監視回路（放電チェック抵抗＋電圧傾き測定ADC）です。',
    opticsAndPhysics: [
      '起動時に一瞬だけコンデンサへの充電を止め、既知の微弱テスト負荷抵抗へ放電させた際の電圧降下速度（dV/dt = I/C）から残存静電容量を正確に算出します。',
      'もし経年劣化や高温で静電容量が規定値を下回り、DRAMキャッシュ（C16）のフラッシュに必要なエネルギー（E = ½CV²）を満たせなくなると、S.M.A.R.T.警告を発行します。',
      '同時にコントローラはライトキャッシュポリシーを安全な直書きモードへ自動切替し、データ破損リスクを未然に回避します。',
    ],
    formula: {
      expression: '蓄積エネルギー E = ½ · C · (V_charge² − V_min²) ／ 実測容量 C = I_test / (dV/dt)',
      description: '非常用PLPコンデンサの寿命を毎回自動検査し、プロ現場の「いざという時のデータ消失」を防止',
    },
    nextGenInnovation:
      '2026年の産業用・シネマ用NVMe / CFexpress（ATP / Exascend等）で採用が広がるPLPキャパシタヘルスモニタリング機能。',
    specs: [
      { label: '診断方式', value: '起動時＆定期放電スロープ測定（C / ESR同時判定）' },
      { label: '対象部品', value: 'PLP停電保護タンタルコンデンサバンク（C19）' },
      { label: '安全動作', value: '劣化検知時にS.M.A.R.T.通知＆安全書込モード移行' },
      { label: '信頼性効果', value: '突然の電池切れ・カード誤抜去時のファイル破損防止' },
    ],
    diagramType: 'cfe_plp_cap_health_mcu',
  },

  // =========================================================================
  // C44. Factory JTAG / UART / ROM-Recovery Micro Test Pads
  // =========================================================================
  'cfe-jtag-uart-test-pads': {
    title: 'C44. 工場診断・ファーム書込用JTAG / UART / ROMリカバリテストパッド',
    subtitle: 'Factory Debug JTAG / UART Serial Telemetry & Emergency ROM-Mode Test Pads',
    category: '工場専用の秘密の診察口 C44 — 出荷前の厳しい検査や緊急データ復旧のときだけ使う隠し端子',
    plainAnalogy:
      '外装の金属ケースを開けると、基板の隅っこに小さな金色の丸い点（テストパッド）が並んでいます。これは病院の聴診器を当てる場所のような「工場とデータ復旧の専門家専用の秘密の診察口」！ここで初期プログラムを書き込んだり、NANDの全ブロックに不良がないか検査してから出荷しているんです。',
    summary:
      '基板端に配置されたENIG金メッキのマイクロテストパッド群（UARTシリアルログ、JTAGデバッグ、ROMモード強制ショート用ジャンパパッド）。工場のNAND全数スクリーニングとファームウエア書き込みに使用されます。',
    opticsAndPhysics: [
      '工場のRDT（Reliability Demonstration Test）工程で、カード全領域へ高温下でテストパターンを繰り返し書き込み、不良ブロック（バッドブロック）を自動登録して出荷します。',
      'ファームウエア破損などでPCIe認識不能になった際、ROMモードパッドを短絡して起動することでコントローラを直接診断・修復できるエンジニアリング導線になっています。',
      '量産出荷時はセキュアブート（C11）と連動してJTAG外部読み出しを無効化（ヒューズロック）し、ユーザーのデータが不正ダンプされないよう保護します。',
    ],
    formula: {
      expression: '工場全数 RDT 検査（NAND全ブロック品質選別）＋ 出荷後 JTAG ロック保護',
      description: '1ビットの初期不良も逃さない工場検査と、出荷後の強固なセキュリティを両立する診断接点',
    },
    nextGenInnovation:
      'データ復旧ラボ（Sony File Rescue / プロ向け物理復旧）でも、障害発生時のコントローラ状態解析にこの内部診断アーキテクチャが重要な役割を果たします。',
    specs: [
      { label: 'テスト系統', value: 'UARTログ・JTAG/SWD・ROMブートピン・電源測定' },
      { label: 'パッド寸法', value: 'φ0.5 〜 0.8 mm 金メッキマイクロパッド' },
      { label: '工場用途', value: '初期FW書込・全ブロックRDT選別・LDPC最適値学習' },
      { label: 'セキュリティ', value: '製品出荷時にデバッグアクセスを暗号ロック' },
    ],
    diagramType: 'cfe_jtag_uart_test_pads',
  },

  // =========================================================================
  // C45. SMT Optical Alignment Fiducial Marks (Pick-and-Place Robot Bullseyes)
  // =========================================================================
  'cfe-optical-fiducials': {
    title: 'C45. SMT自動実装ロボット用・光学アライメント基準マーク（フィデューシャル）',
    subtitle: 'Bare-Copper Gold-Flashed SMT Pick-and-Place Optical Fiducial Targets',
    category: 'ロボットの的あて目印 C45 — 砂粒サイズの部品を100分の1ミリ精度で置くための「金の二重丸」',
    plainAnalogy:
      'カード基板の対角のすみっこに、小さな「金色の二重丸（的）」がぽつんと印刷されています。じつはこれ、工場の超高速ロボットがカメラで見て「基板がコンマ何ミリずれて置かれたか」を一瞬で見抜き、砂粒より小さい0201コンデンサやBGAチップをピタッと寸分違わず載せるための基準マークなんです！',
    summary:
      '基板対角の2〜3か所およびファインピッチBGAチップ近傍に配置された直径1.0 mmのソルダーレジスト抜き金メッキ円形ターゲット（グローバル／ローカル・フィデューシャルマーク）。',
    opticsAndPhysics: [
      '基板は製造時の熱でミクロン単位にわずかに伸縮するため、チップマウンタのマシンビジョンカメラが対角のフィデューシャル中心を認識してX・Y・回転θと伸縮率をリアルタイム補正します。',
      'ハンダペースト印刷機（ステンシルアライメント）と3D SPI/AOI自動外観検査機も同じ基準マークを参照し、0.35 mmピッチのBGAボールのハンダブリッジ不良をゼロに近づけます。',
      '周囲を幅1 mmのクリアランス（レジスト無し銅抜きリング）で囲うことで、照明反射コントラストを最大化してカメラ誤認識を防いでいます。',
    ],
    formula: {
      expression: '実装位置決め精度 ±15 μm（3σ） ／ ターゲット径 φ1.0 mm ＋ クリアランス φ2.0 mm',
      description: '極小Type A基板上へ百数十個の微細部品を超高歩留まりで自動実装するマシンビジョン基準点',
    },
    nextGenInnovation:
      '2025〜2026年のAI光学検査（AOI）＋X線3D検査ラインでは、フィデューシャル座標と紐づけた全ハンダ接合部のデジタルツイン品質管理を実施。',
    specs: [
      { label: '形状仕様', value: 'φ1.0 mm 円形銅箔（ENIG金メッキ）＋クリアランス環' },
      { label: '配置位置', value: '基板対角グローバル×3 ＋ コントローラ近傍ローカル×2' },
      { label: 'ロボット精度', value: '±15 μm 位置・回転・熱伸縮リアルタイム補正' },
      { label: '対応工程', value: 'クリームハンダ印刷・高速チップ実装・3D AOI検査' },
    ],
    diagramType: 'cfe_optical_fiducials',
  },

  // =========================================================================
  // C46. Plasma Hydrophobic Nano-Coating (Anti-Condensation & Salt-Mist Barrier)
  // =========================================================================
  'cfe-conformal-nano-coat': {
    title: 'C46. 基板全体プラズマ撥水ナノコーティング（耐塩害・耐結露保護膜）',
    subtitle: 'Sub-500 nm Plasma-Deposited Fluoropolymer Hydrophobic Nano-Coating',
    category: '目に見えない超撥水バリア C46 — 万一湿気が入り込んでも水滴をコロッと弾きサビさせない魔法の膜',
    plainAnalogy:
      'カードの外側にはIP57防水シール（C04）がありますが、嵐の海辺や真冬の雪山ではわずかな湿気が入り込むこともあります。そこで基板とチップのすみずみまで、ハスの葉みたいに水をコロコロ弾く「厚さ髪の毛の200分の1の透明な撥水膜」をプラズマで焼き付けて、サビとショートを二重に防いでいるんです！',
    summary:
      '実装済みPCBと全電子部品の表面を厚さ100〜500 nmの極薄フッ素系撥水ポリマーで覆うプラズマCVDナノコーティング被膜。結露や潮風によるイオンマイグレーション（腐食ショート）を徹底抑止します。',
    opticsAndPhysics: [
      '真空チャンバー内でプラズマ重合により気相成膜するため、BGAチップ下の狭いスキマや0201コンデンサ側面までピンホールなしで回り込みます。',
      '水接触角が110°以上の超撥水性を持ちながら、厚さが0.5 μm未満と極薄なのでコントローラやNANDの放熱をまったく妨げません。',
      '21ピン金メッキ端子だけはマスキングして通電性を100%保ちつつ、内部回路全域に耐湿・耐塩水噴霧プロテクションを与えます。',
    ],
    formula: {
      expression: 'ナノ被膜厚 t ≈ 200〜500 nm ／ 撥水接触角 θ > 110°（熱抵抗増加 ≈ 0）',
      description: '防水シールのさらに内側で結露・潮風・腐食から大切な撮影データを守る最終防湿バリア',
    },
    nextGenInnovation:
      '2025〜2026年のプロ用タフカードでは、外装IP57密閉＋内部プラズマ撥水コート＋BGAアンダーフィルの「3重環境耐性」が最高峰スペック。',
    specs: [
      { label: '成膜工法', value: '真空プラズマ気相重合（PECVD）フッ素系ナノ膜' },
      { label: '膜厚仕様', value: '100 〜 500 nm（放熱阻害ゼロ・超軽量）' },
      { label: '撥水性能', value: '水接触角 110°以上（結露水滴の膜化を防止）' },
      { label: '防御対象', value: '海辺塩害・熱帯高湿・急激温度差の結露ショート' },
    ],
    diagramType: 'cfe_conformal_nano_coat',
  },

  // =========================================================================
  // C47. Low-Dk / Low-Df Dielectric Solder Mask & Solid Copper Reference GND Plane
  // =========================================================================
  'cfe-solder-mask-silkscreen': {
    title: 'C47. 低誘電率（Low-Dk）ソルダーレジスト＆全面銅リファレンスGND層',
    subtitle: 'Ultra-Low-Loss Dielectric Prepreg, Solder Mask & Continuous Solid Copper GND Plane',
    category: '高速信号の舗装道路 C47 — 普通の基板だとGHz信号が途中で消えてしまうので特別な低損失材を採用',
    plainAnalogy:
      'F1カーが砂利道では走れないように、PCIe Gen4（毎秒160億回）の超高速信号も普通の安い基板の上では途中でエネルギーを吸い取られて弱ってしまいます。そこで電波を吸いにくい特別な低誘電率（Low-Dk）素材と、真下に敷き詰めた一枚板の銅アース（GND層）でツルツルの専用サーキットを作っているんです！',
    summary:
      '8層HDI基板（C07）のPCIe Gen4信号層を挟み込む低誘電正接（Low-Df）絶縁プリプレグ／ソルダーレジスト、および信号帰還電流の最短経路となる切れ目のない全面銅リファレンスGNDプレーンです。',
    opticsAndPhysics: [
      'GHz帯の誘電体損失（α_d ∝ f · √Dk · Df）を最小化するため、一般FR-4（Df≈0.020）より遥かに低損失なMegtron系／低誘電ガラスクロス材（Df < 0.006）を採用します。',
      '高速差動配線の直下層に一切のスリット（切れ目）がない一枚板の銅GNDプレーンを敷くことで、帰還電流が最小ループで戻り、インピーダンス85 Ωの均一性と低EMIを両立します。',
      'ソルダーレジストの厚みを±5 μmで均一管理し、表面マイクロストリップ配線の誘電率バラつきによる信号反射を防いでいます。',
    ],
    formula: {
      expression: '誘電損失 α_d ∝ f · √Dk · Df（Low-Df < 0.006 ＋ 連続銅GND基準面）',
      description: '16 GT/sの高周波信号減衰とクロストークを抑え、エラーゼロの超高速転送を支える基板材料工学',
    },
    nextGenInnovation:
      '2025〜2026年のCFexpress 4.0（将来5.0見据え）では、低損失材と超低粗度銅箔の組み合わせが高速安定性の隠れた決め手です。',
    specs: [
      { label: '絶縁基材', value: '低誘電率（Dk≈3.4）・低誘電正接（Df<0.006）高速材' },
      { label: '基準プレーン', value: '切れ目なし全面1 oz銅リファレンスGND層（2〜3層）' },
      { label: 'レジスト管理', value: '低誘電ソルダーレジスト厚 ±5 μm 高精度塗布' },
      { label: '電気効果', value: '16 GT/s挿入損失低減＆隣接レーンクロストーク遮断' },
    ],
    diagramType: 'cfe_solder_mask_silkscreen',
  },

  // =========================================================================
  // C48. Controller SoC Flip-Chip C4 Solder Bumps & Copper Pillar Array
  // =========================================================================
  'cfe-flipchip-c4-bumps': {
    title: 'C48. コントローラSoCフリップチップC4ハンダバンプ＆銅ピラー接続アレイ',
    subtitle: '7 nm/12 nm Controller Silicon Die Flip-Chip C4 Solder & C2 Copper-Pillar Micro-Bumps',
    category: 'チップをひっくり返して直結！C48 — 細い糸の代わりに数百個の極小ハンダ粒で最短直結する爆速実装',
    plainAnalogy:
      '昔のチップは周りから細い金の糸（ワイヤー）を伸ばしてつないでいましたが、糸が長いと毎秒160億回の信号が詰まってしまいます。そこでコントローラのシリコン頭脳を「うつぶせ（フリップチップ）」にひっくり返し、お腹に並べた数百個の極小銅柱・ハンダ粒（C4バンプ）で基板へ最短直結しているんです！',
    summary:
      '7 nm / 12 nm PCIe Gen4コントローラSoC（C08）のパッケージ内部で、シリコンダイの能動面を下向きにしてパッケージ基板へ直接接合するフリップチップC4ハンダバンプ／C2銅ピラー（マイクロバンプ）格子です。',
    opticsAndPhysics: [
      '従来のワイヤーボンディング（接続長1〜3 mm）に比べ、フリップチップのC4/C2バンプは接続長がわずか30〜80 μm（約1/30！）で寄生インダクタンスが極小になるため、PCIe Gen4（16 GT/s）や3,600 MT/s NANDバスが安定動作します。',
      'シリコンチップの中央部にも電源・GNDバンプを直接配置できる（エリアアレイ接続）ため、数Aの瞬時電力も電圧ドロップ（IRドロップ）なく均等に供給できます。',
      'チップの背中（シリコン裏面）が上を向く構造なので、すぐ上のグラフェンTIM（C26）や銅ヒートスプレッダー（C25）へ熱をダイレクトに逃がせる放熱上の大メリットもあります。',
    ],
    formula: {
      expression: 'バンプ高さ ≈ 40〜70 μm ／ 寄生インダクタンス L < 0.05 nH（ワイヤー比 1/20以下）',
      description: '超高速PCIe Gen4信号品質と裏面ダイレクト放熱を同時に叶える先端チップ接続技術',
    },
    nextGenInnovation:
      '最新の6 nm / 7 nm NVMeコントローラ（SM2504XT / Phison次世代等）ではピッチ40 μm級のC2銅ピラー＋SnAgキャップ微細バンプが主流。',
    specs: [
      { label: '実装方式', value: 'フリップチップ（FC-CSP / FC-BGA）フェースダウン接合' },
      { label: 'バンプ構造', value: 'C4 SnAgハンダバンプ / C2 銅ピラーマイクロバンプ' },
      { label: '接続ピッチ', value: '約 50 〜 90 μm（数百ピン高密度エリアアレイ）' },
      { label: '放熱利点', value: 'シリコンダイ裏面を上向き露出させ上面熱拡散板へ直結' },
    ],
    diagramType: 'cfe_flipchip_c4_bumps',
  },

  // =========================================================================
  // C49. Multi-Layer ABF / BT Package Interposer Substrate & RDL Fan-Out
  // =========================================================================
  'cfe-abf-package-substrate': {
    title: 'C49. 多層ABF / BTパッケージ基板＆RDL極細再配線層',
    subtitle: 'High-Density Multi-Layer ABF / BT Package Substrate & Redistribution Layer (RDL)',
    category: 'ミクロとマクロの変換インターチェンジ C49 — 50μmの超極細配線から0.4mmの基板端子へ広げる翻訳板',
    plainAnalogy:
      'コントローラのシリコンチップの端子は髪の毛より狭い0.05ミリ間隔で並んでいますが、カードの8層基板のハンダ粒は0.4ミリ間隔です。そのままでは細かすぎてつなげないので、パッケージの中に「ABF（味の素ビルドアップフィルム）」という日本のスゴイ材料のミニ多層基板を挟んで、配線をきれいに扇状に広げているんです！',
    summary:
      'コントローラSoC（C08）パッケージの土台となる極薄4〜6層ABF／BT樹脂ビルドアップ基板と、マイクロバンプ間隔（~50 μm）をBGAハンダボール間隔（0.4 mm）へ変換するRDL（再配線層）です。',
    opticsAndPhysics: [
      '日本の味の素ファインテクノが生み出した絶縁フィルム（ABF）上へレーザー加工とセミアディティブ銅めっきで線幅／線間10 μm級の超微細配線を多層形成します。',
      '薄型CFexpressカード（全厚2.8 mm）へ収めるため、パッケージ基板自体の厚さはわずか100〜150 μm（コピー用紙1.5枚分！）まで極薄化されています。',
      '内部に専用の電源プレーンとGNDシールド層を持ち、ダイ直下のインピーダンス整合と同時スイッチングノイズ（SSN）の吸収を行います。',
    ],
    formula: {
      expression: '線幅/線間 L/S ≈ 10/10 μm（ピッチ 50 μm → 400 μm へ 8倍ファンアウト展開）',
      description: '先端7 nmシリコンとカード側HDI基板を繋ぐ、超高密度・極薄半導体パッケージインターポーザ',
    },
    nextGenInnovation:
      '2025〜2026年の超小型CFexpress Type A向けパッケージでは、薄型コアレス基板やファンアウト・ウェハレベルパッケージ（FOWLP）でさらなる薄型・低損失化が進行。',
    specs: [
      { label: '基板材料', value: 'ABF（Ajinomoto Build-up Film） / 高剛性BTレジン' },
      { label: '配線微細度', value: '最小線幅 8〜12 μm（レーザーマイクロビア積層）' },
      { label: '基板厚さ', value: '約 0.12 〜 0.18 mm（超薄型FC-CSPパッケージ）' },
      { label: '役割機能', value: 'C4バンプ→BGAボール配線変換＋電源デカップリング' },
    ],
    diagramType: 'cfe_abf_package_substrate',
  },

  // =========================================================================
  // C50. 16-Die Staggered Offset Stacked 3D NAND Dies (16DP) & Dummy Spacer Die
  // =========================================================================
  'cfe-nand-staggered-16die': {
    title: 'C50. 16段階段状オフセット積層NANDダイ（16DP）＆ダミースペーサー',
    subtitle: '16-Die Vertically Staggered 3D NAND Silicon Stack (30 μm Ultra-Thin Dies) & Dummy Spacer',
    category: '1ミリの中に16階建てのシリコン階段！C50 — 髪の毛の半分の薄さに削った記憶チップを16枚重ねる神業',
    plainAnalogy:
      '切手より小さい黒いNANDチップ（C12）の中に、どうして1テラバイト〜2テラバイトもの動画が入るのでしょう？なんとシリコンの板を「髪の毛の半分以下（0.03ミリ）」までペラペラに削り、トランプを少しずつズラして階段状に16枚も積み重ねているんです！端っこをズラすことで全部の層へ金の糸をつなげるんですよ。',
    summary:
      '1 TB〜2 TB級の超高密度3D NAND BGAパッケージ（C12/C13）の内部で、厚さ約25〜35 μmまで裏面研削（バックグラインド）した最大16枚のNANDシリコンダイを階段状（スタッガード）に積層した16DP構造です。',
    opticsAndPhysics: [
      '1枚のダイ（512 Gb〜1 Tb容量）をそのまま真上に重ねると下段の電極パッドが隠れてしまうため、各段を0.3〜0.5 mmずつズラす「階段オフセット積層」またはジグザグ積層を採用します。',
      '16枚もの極薄シリコンが熱で反り返る（ウォーページ）のを防ぎ、ワイヤーを張る空間を確保するため、途中に配線のない「ダミーシリコンスペーサー」を挟んで機械バランスを整えます。',
      'チップイネーブル（CE）ピンで16枚のダイを独立制御し、コントローラが複数ダイへ同時並列書き込み（ダイ・インターリーブ）を行うことで1,700〜1,900 MB/sの爆速を実現します。',
    ],
    formula: {
      expression: '16ダイ × 1 Tb/ダイ ＝ 2 TB/パッケージ（単ダイ厚 ≈ 30 μm・総高 < 0.85 mm！）',
      description: '切手大の極薄Type Aカードへ1〜2 TBの大容量と並列超高速転送を詰め込む3D積層パッケージ技術',
    },
    nextGenInnovation:
      '2025〜2026年のBiCS8世代では2 Tbダイや16〜32ダイ積層（32DP）により、極小Type Aカードでも2 TB〜4 TB時代へ突入しています。',
    specs: [
      { label: '積層段数', value: '8DP / 16DP（最大16枚の超薄シリコンダイ階段積層）' },
      { label: '単ダイ厚さ', value: '約 25 〜 35 μm（人間の髪の毛 約70 μm の半分以下）' },
      { label: '反り対策', value: 'ダミーシリコンスペーサー挿入＋低応力積層制御' },
      { label: '並列動作', value: 'マルチCE並列インターリーブで連続1,700+ MB/s達成' },
    ],
    diagramType: 'cfe_nand_staggered_16die',
  },

  // =========================================================================
  // C51. Die Attach Film (DAF) & Multi-Tier Ultra-Fine Gold/Copper Bond Wires
  // =========================================================================
  'cfe-nand-daf-gold-wires': {
    title: 'C51. ダイアタッチフィルム（DAF）接着層＆多段アーチ極細ボンディングワイヤー',
    subtitle: '10 μm Thermal Die-Attach Film (DAF / FOW) & Multi-Tier Low-Loop Au/Cu Bond Wires',
    category: '16段をつなぐ極細の金の橋 C51 — 0.01ミリの特殊テープで貼り合わせ、何百本もの極細ワイヤーで配線',
    plainAnalogy:
      'ペラペラに削った16枚のNANDチップ同士を普通の液体のりで貼ると、はみ出して電極を汚してしまいます。そこで厚さわずか0.01ミリの両面テープ「DAF」でピタッと貼り、階段のように並んだ16枚の端っこから基板へ、クモの糸より細い金や銅のワイヤーを何百本もアーチ状に渡しているんです！',
    summary:
      '階段積層された各NANDダイ間に挟まる厚さ5〜10 μmの固体接着シート「DAF（Die Attach Film / ワイヤー埋込型FOW）」と、多段ダイの電極パッドをパッケージ基板へ結ぶ直径15〜20 μmの低ループ多段ボンディングワイヤー群です。',
    opticsAndPhysics: [
      '従来の液状ペーストと違い、固体フィルムのDAFはウエハの裏面へ事前に貼って一緒にダイシング（切断）するため、接着厚みが完全に均一で電極パッドへのはみ出し（ブリード）が起きません。',
      '下段ワイヤーの真上に次のダイを載せる際は、熱で軟化してワイヤーを優しく包み込む「FOW（Film Over Wire）」フィルムを使い、ワイヤー同士の接触ショートを防ぎます。',
      '超低ループ・チェーンボンディング技術により、16段もの高層スタックでありながら最上段ワイヤーの天井高を極限まで低く抑え、薄さ0.85 mmのBGAへ収めています。',
    ],
    formula: {
      expression: 'DAFフィルム厚 5〜10 μm ／ ワイヤー径 φ15〜20 μm（多段ロー・ループ配線）',
      description: '16枚もの極薄シリコンダイを破損させず電気的・機械的に高密度結線する半導体後工程の結晶',
    },
    nextGenInnovation:
      '高速Toggle 5.0 / ONFI 5.1（3,600 MT/s）対応ではワイヤーのインダクタンス低減と、次世代TSV（シリコン貫通電極）によるワイヤーレス積層も研究が進んでいます。',
    specs: [
      { label: '接着シート', value: 'DAF / FOW（厚さ 5〜10 μm 高熱伝導絶縁フィルム）' },
      { label: 'ワイヤー材質', value: 'φ15〜20 μm 高純度金（Au）またはPdコート銅（PCC）' },
      { label: '配線技術', value: '多段チェーンボンディング＆スタンドオフステッチ（SOS）' },
      { label: '耐振保護', value: 'EMC樹脂モールド封止でワイヤー揺れを完全固定' },
    ],
    diagramType: 'cfe_nand_daf_gold_wires',
  },

  // =========================================================================
  // C52. High-Thermal-Conductivity EMC Mold Resin & SAC305 Lead-Free BGA Solder Balls
  // =========================================================================
  'cfe-nand-emc-mold-balls': {
    title: 'C52. 高熱伝導エポキシモールド樹脂（EMC）＆SAC305鉛フリーBGAハンダボール',
    subtitle: 'Silica-Filled Epoxy Molding Compound (EMC) & SAC305 Lead-Free BGA Solder Ball Grid',
    category: 'チップを守る黒い鎧と数百個のハンダの足 C52 — 中の極細ワイヤーを固めて守り、基板と繋ぐ銀色の粒',
    plainAnalogy:
      'メモリカードを開けると見える黒い四角いチップの表面は、じつはシリカの微粒子を85%以上も混ぜた超頑丈な黒い樹脂（EMC）で中の繊細なチップと金の糸を丸ごと固めた「保護カプセル」なんです！そして裏側には、基板とつながる何百個もの小さな銀色のハンダの粒（BGAボール）が碁盤の目のように並んでいます。',
    summary:
      'NAND積層ダイとボンディングワイヤーを外部衝撃・湿気から封止する高シリカ充填エポキシモールド樹脂（EMC）、およびパッケージ底面に格子配列された鉛フリーSAC305（Sn-3.0Ag-0.5Cu）BGAハンダボール群です。',
    opticsAndPhysics: [
      'EMC樹脂には球状シリカフィラーを85〜90 wt%高充填し、熱膨張係数（CTE）をシリコンや基板へ近づけることで、-40 ℃〜+85 ℃の激しい温度サイクルでも内部ワイヤーが断線するのを防ぎます。',
      'トランスファー成形時の樹脂流れで極細ワイヤーが流されない（ワイヤースイープ防止）よう、低粘度かつ高熱伝導な最新モールドコンパウンドが使われます。',
      '底面のSAC305鉛フリーBGAハンダボール（直径約0.20〜0.25 mm・132/152ボール等）はリフロー炉の自己整列（セルフアライメント）効果で基板パッドへ一斉接合され、周囲をアンダーフィル（C28）で補強します。',
    ],
    formula: {
      expression: 'EMC シリカ充填率 ≈ 88 wt%（低CTE） ／ BGA 132〜152ボール（SAC305 融点 217 °C）',
      description: '繊細な16層シリコンを7.5 m落下や真夏の車内高温から守り抜く堅牢封止と高密度面実装',
    },
    nextGenInnovation:
      '2025〜2026年の高発熱CFexpress 4.0では、アルミナ／窒化ホウ素フィラー配合の超高熱伝導EMC樹脂でNANDパッケージからの放熱効率も向上。',
    specs: [
      { label: '封止樹脂', value: '低応力・高シリカ充填エポキシモールド樹脂（EMC）' },
      { label: 'ハンダ合金', value: 'SAC305 鉛フリー（Sn96.5 / Ag3.0 / Cu0.5・RoHS適合）' },
      { label: 'BGA格子', value: '132 / 152 / 252 ボール（ピッチ 0.4〜0.5 mm）' },
      { label: '信頼性試験', value: '温度衝撃 -40〜+85 °C 1,000サイクル＋落下耐性' },
    ],
    diagramType: 'cfe_nand_emc_mold_balls',
  },

  // =========================================================================
  // C53. Controller On-Die High-Speed SRAM Buffer & NVMe HMB DMA Engine
  // =========================================================================
  'cfe-hmb-sram-controller-buf': {
    title: 'C53. コントローラ内蔵高速SRAMバッファ＆HMB（Host Memory Buffer）DMAエンジン',
    subtitle: 'On-Die High-Speed SRAM Write-Coalescing Buffer & NVMe HMB DMA Engine',
    category: '超速の一時メモ帳 C53 — 1ミリ秒も待たせずにデータを受け止め、DRAMなし設計でも爆速をキープ！',
    plainAnalogy:
      'CFexpress Type Aは切手サイズで超狭いので、外付けのDRAMチップ（C16）を載せず省電力にする「DRAMレス型（Phison E27T / SM2269XT系）」も大活躍しています！その秘密が頭脳チップ内蔵の超高速メモ帳（SRAM）と、カメラ側のメモリを少し間借りする「HMB」という賢い仕組みなんです。',
    summary:
      'コントローラSoCのシリコン内部に統合された低遅延SRAMキャッシュ（FTLホットマッピング＆ライト結合バッファ）と、NVMe仕様のHMB（Host Memory Buffer）でホスト側RAMをPCIe DMA活用する高速メモリエンジンです。',
    opticsAndPhysics: [
      '外付けDRAMを省略した小型・低消費電力CFexpress 4.0カードでも、内蔵SRAMへ頻繁に使うアドレス変換表（L2Pテーブル）と書き込み結合バッファを保持して連写バーストを受け止めます。',
      'さらにPCカードリーダーやHMB対応ホストへ接続時は、PCIe Gen4経由でホスト側DRAMの数十MBを直接借りる（HMB）ことで、ランダムアクセス性能をDRAM搭載機に迫る水準へ引き上げます。',
      '専用ハードウエアDMAエンジンがCPU（C09）を介さずPCIe⇔SRAM⇔LDPC⇔NAND間でデータをゼロコピー直送し、電力1 Wあたりの転送速度（MB/s/W）を最大化します。',
    ],
    formula: {
      expression: 'オンダイSRAMアクセス遅延 < 2 ns ＋ NVMe HMB DMA（消費電力最大 30% 低減）',
      description: '省電力・低発熱が命の小型Type Aカードで爆速連写と長時間8K録画を両立するメモリアーキテクチャ',
    },
    nextGenInnovation:
      '2025〜2026年のCFexpress 4.0主力コントローラ（Phison PS5027-E27T / PS5029-E29T、Silicon Motion SM2269XT / SM2504XT）が採用する最先端低発熱設計。',
    specs: [
      { label: '内蔵メモリ', value: 'コントローラ直内蔵 マルチバンク高速SRAMバッファ' },
      { label: '拡張機能', value: 'NVMe 2.0 HMB（Host Memory Buffer）DMA対応' },
      { label: '代表採用IC', value: 'Phison E27T / E29T・SMI SM2269XT / SM2504XT系' },
      { label: '熱的利点', value: '外付けDRAM省電力化によりType Aのサーマル余裕拡大' },
    ],
    diagramType: 'cfe_hmb_sram_controller_buf',
  },

  // =========================================================================
  // C54. Next-Gen CBA Wafer-to-Wafer Cu-Cu Hybrid Bonding (Kioxia BiCS8–10 / Xtacking)
  // =========================================================================
  'cfe-cba-cu-hybrid-bond': {
    title: 'C54. 次世代CBAウェハ直接接合＆Cu-Cuハイブリッドボンディング（BiCS8–10技術）',
    subtitle: '2025–2026 CMOS Directly Bonded to Array (CBA) Wafer-to-Wafer Cu-Cu Hybrid Bonding',
    category: '別々に作って合体させる2025–2026最大の革新！C54 — 記憶層と高速回路を最強の工場で作り銅で直接合体',
    plainAnalogy:
      '従来の3D NANDは「管理人室（制御回路）」の上に「200階建てマンション（記憶セル）」を同じ工場で高温焼き上げしていたので、管理人室が熱で痛んでスピードが出ませんでした。2025〜2026年主役の「CBA技術（BiCS8等）」は、マンションと管理人室を別々の最強工場で作ってから、数百万個の極小の銅パッドでピタッと直接合体させる革命なんです！',
    summary:
      'キオクシア／サンディスク「BiCS FLASH 第8〜10世代（BiCS8–10）」等で2025〜2026年に本格量産されているCBA（CMOS directly Bonded to Array）構造。メモリセルウェハと高速CMOSウェハを別工程で最適製造し、数百万点のミクロン級Cu-Cu銅ハイブリッド接合で直接貼り合わせます。',
    opticsAndPhysics: [
      'セル形成時の超高温熱処理からCMOSトランジスタを切り離せるため、低電圧・超高速な先端CMOSロジックを使え、NANDのI/O速度を3,600 MT/s超へ引き上げつつ書き込み電力効率を約70%も改善しました。',
      '2枚の300 mmシリコンウェハ表面を原子レベルに平坦化（CMP）し、酸化膜同士の分子結合＋銅パッド同士の直接拡散接合（Cu-Cu Hybrid Bonding）で隙間なく一体化します。',
      '2026年10月にはメモリセル配列同士もCuハイブリッド接合で多段化する「MSA-CBA（1,000層超への道）」まで発表され、将来の超高容量CFexpressカードへの展開が始まっています。',
    ],
    formula: {
      expression: 'BiCS8 CBA：ビット密度 2.3× ／ 書込電力効率 +70% ／ I/O速度 3,600+ MT/s',
      description: '「積む」から「別々に作って銅で直接貼る」へ進化した、2025–2026年3D NAND最大のブレイクスルー',
    },
    nextGenInnovation:
      '2026年度末にはキオクシア出荷の約80%がCBA採用のBiCS8以降へ移行するとされ、最新CFexpress 4.0カードの低発熱・大容量化を直撃しています。',
    specs: [
      { label: '技術名称', value: 'CBA（CMOS directly Bonded to Array）ウェハ直接接合' },
      { label: '接合界面', value: '数百万点 Cu-Cu 銅ハイブリッドボンディング（サブμm精度）' },
      { label: '性能飛躍', value: 'I/O速度 3,600+ MT/s・書込効率約70%向上・小型化' },
      { label: '次世代発展', value: 'BiCS9 / BiCS10 / MSA-CBA（1,000層超ロードマップ）' },
    ],
    diagramType: 'cfe_cba_cu_hybrid_bond',
  },

  // =========================================================================
  // C55. Crossed Bit Line (CBL) & CMOS-under-Array (CuA) Peripheral Circuit Floor
  // =========================================================================
  'cfe-crossed-bitline-cbl': {
    title: 'C55. クロスビットライン（CBL）＆CMOS直下周辺回路（CuA）フロア',
    subtitle: 'Crossed Bit Line (CBL) Routing & Underneath CMOS Peripheral Circuit Layer (CuA / CBA)',
    category: 'マンションの真下に管理人室を収納 C55 — 回路を記憶セルの真下へしまい込み、チップ面積をムダなく活用！',
    plainAnalogy:
      '昔のフラッシュメモリは記憶セルの「横」に管理人室（読み書き回路）を並べていたので土地がもったいなかったんです。現代の3D NANDは管理人室をマンションの「1階・地下（真下）」へすっぽり収納（CuA / CBA）し、さらに2025〜2026年の最新「クロスビットライン（CBL）」配線で信号の渋滞まで解消しているんです！',
    summary:
      'メモリセルアレイの直下（あるいはCBA接合面の下側）にページバッファ・デコーダ・センスアンプを集約したCuA／CBA周辺回路フロアと、キオクシアBiCS8で導入された新配線構造「CBL（Crossed Bit Line）」です。',
    opticsAndPhysics: [
      '周辺CMOS回路をセルアレイの直下へ立体配置することで、シリコンチップ全体の面積効率（アレイ占有率）を約60%から85〜90%近くまで大幅に向上させます。',
      '2025年発表のCBL（Crossed Bit Line）アーキテクチャは、ビット線とセンスアンプの接続トポロジを立体交差最適化することで配線の寄生容量を削り、読み出し速度と消費電力を同時改善します。',
      '1つのダイ内部を4〜6プレーン（独立した記憶ブロック群）に分割し、直下の周辺回路が並列同時アクセスすることで高スループットを生み出します。',
    ],
    formula: {
      expression: 'アレイ面積効率 ~60% → ~88% ＋ CBL立体交差配線によるビット線容量＆電力削減',
      description: '切手サイズに数TBを収め、1秒間に数ギガバイトを並列読み書きする最新チップ平面設計',
    },
    nextGenInnovation:
      '2025〜2026年のBiCS8 / BiCS10（ISSCC発表）でCBL＋CBAの組み合わせにより4-plane / 6-plane超並列動作が実用化。',
    specs: [
      { label: '立体配置', value: 'CuA（CMOS under Array）/ CBA 周辺回路直下構造' },
      { label: '最新配線', value: 'CBL（Crossed Bit Line）低容量立体交差ビット線' },
      { label: '内蔵ブロック', value: '行／列デコーダ・ページバッファ・センスアンプ・制御ロジック' },
      { label: '並列構成', value: '4〜6独立プレーン並列読み書き（高速連写に直結）' },
    ],
    diagramType: 'cfe_crossed_bitline_cbl',
  },

  // =========================================================================
  // C56. Atomic-Scale ONO Charge-Trap Stack (Tunnel Oxide / Si₃N₄ / Al₂O₃ Blocking)
  // =========================================================================
  'cfe-ono-charge-trap-stack': {
    title: 'C56. 原子レベルONO絶縁積層（トンネル酸化膜／Si₃N₄捕獲層／アルミナ遮断膜）',
    subtitle: 'Nanometer ONO Charge-Trap Film Stack (Tunnel SiO₂ / Si₃N₄ Charge Trap / Al₂O₃ Blocking)',
    category: '電子を閉じ込めるナノの金庫壁 C56 — 電源を切っても10年データが消えない秘密の「3重サンドイッチ膜」',
    plainAnalogy:
      'カメラからカードを抜いて机に1年置いても、なぜ写真データが消えないのでしょう？それは1つ1つの記憶セルの中にある、わずか数ナノメートルの「3重の魔法の壁（ONO膜）」のおかげ！書き込みの時だけ電子がトンネルをくぐって真ん中の「窒化シリコン捕獲室」へ入り、電源を切ると両側の絶縁壁が電子をガッチリ閉じ込めて逃がさないんです！',
    summary:
      '3D NANDの垂直メモリストリング（C15）の壁面に原子層堆積（ALD）で形成された、トンネル酸化膜（SiO₂）・電荷捕獲層（Si₃N₄）・ブロック絶縁膜（SiO₂＋高誘電Al₂O₃）の3層ナノ構造（CTF：Charge Trap Flash）です。',
    opticsAndPhysics: [
      '書込時に約20 Vの強い電界をかけると、中央のポリシリコンチャネルから電子が量子力学的な「ファウラー・ノルドハイム（FN）トンネリング」で薄いトンネル酸化膜（約4〜6 nm）をすり抜け、Si₃N₄層内の欠陥トラップへ捕獲されます。',
      '外側のブロック酸化膜＋高誘電アルミナ（Al₂O₃）層は電子がゲート電極へ逃げ出す（バックトンネリング）のを阻止し、無電源でも数年間データを保持します。',
      '昔の2Dフローティングゲート（導体）と違い絶縁体のSi₃N₄へ電子を離散的に捕獲するため、膜に小さな欠陥ができても電子が一気に全部漏れず、300層超の微細化でも高信頼性を保てます。',
    ],
    formula: {
      expression: 'ONO構造：SiO₂（~5 nm）｜ Si₃N₄捕獲層（~6 nm）｜ Al₂O₃/SiO₂遮断層（~10 nm）',
      description: '量子トンネル効果で電子を出し入れし、無電源で写真・動画を長期保存する不揮発メモリの核心',
    },
    nextGenInnovation:
      '2025〜2026年の次世代研究では高誘電（High-k）ハフニア／強誘電体膜による低電圧書込や、300〜400層超でも均一成膜できる極精密ALDプロセスが進展。',
    specs: [
      { label: 'トンネル層', value: '極薄 SiO₂ / 酸窒化膜（約 4〜6 nm・量子トンネル通路）' },
      { label: '電荷捕獲層', value: '窒化シリコン Si₃N₄（約 5〜7 nm・電子を長期トラップ）' },
      { label: 'ブロック層', value: 'SiO₂ ＋ アルミナ Al₂O₃ 高誘電遮断膜（リーク阻止）' },
      { label: '成膜技術', value: '原子1層ずつ積む ALD（原子層堆積）超精密プロセス' },
    ],
    diagramType: 'cfe_ono_charge_trap_stack',
  },

  // =========================================================================
  // C57. Tungsten / Molybdenum Wordline Staircase Decoder Contact Structure
  // =========================================================================
  'cfe-wordline-staircase': {
    title: 'C57. タングステン／モリブデン・ワード線階段（ステアケース）連絡構造',
    subtitle: '232–300+ Layer Tungsten / Molybdenum Wordline Staircase Contact Array',
    category: '300階建てマンションの外階段！C57 — 積み上げた300層それぞれのフロアへ電気をつなぐピラミッド構造',
    plainAnalogy:
      '3D NANDは232〜300階もの記憶フロアを真上に積み上げていますが、全部のフロアをバラバラに呼び出すにはどうやって電線をつなぐのでしょう？なんとチップの端っこを「マヤ文明のピラミッドみたいな巨大な階段（ステアケース）」状に削り、1階から300階まで各段の上から金属の柱をズラッと垂直に降ろして配線しているんです！',
    summary:
      '232〜300層以上の水平ゲート電極（ワード線：タングステンW、最新世代ではさらに低抵抗なモリブデンMo）の各層へ独立して電圧を印加するため、アレイ端部を階段状にエッチング加工し垂直コンタクト柱を接続したステアケース連絡部です。',
    opticsAndPhysics: [
      'ワード線は記憶セルのゲート電極（スイッチの開閉つまみ）として機能し、書込時は選択した1層だけに20 V、他の299層には約8〜10 Vのパス電圧を精密に印加します。',
      '200層を超えると階段の面積だけでチップが大きくなりすぎるため、1段のテラスを4方向・多段階に折り返す「3Dマルチステップ階段」で面積を劇的に圧縮しています。',
      '2025〜2026年の300層超世代では、従来のタングステン（W）＋TiNバリア膜から、バリアレスで電気抵抗が約半分になる新金属「モリブデン（Mo）」ワード線への大転換が進んでいます。',
    ],
    formula: {
      expression: '積層ワード線 N = 218〜321層 ／ 新世代 Mo 金属化によりワード線RC遅延 最大 40% 低減',
      description: '数百階建ての3D記憶層を1層ずつ独立制御する、半導体微細加工の芸術品「ナノ階段構造」',
    },
    nextGenInnovation:
      '2025〜2026年にKioxia / Micron / SK hynix / Samsung各社が300層超世代でモリブデン（Mo）ワード線導入を加速し、さらなる高速化を実現。',
    specs: [
      { label: '電極金属', value: 'タングステン（W/TiN）→ 次世代低抵抗モリブデン（Mo）' },
      { label: '階段構造', value: '232〜300+段 立体マルチステップ・ステアケース' },
      { label: '接続方法', value: '各段テラスへの垂直高アスペクト比コンタクト柱' },
      { label: '役割機能', value: '行デコーダから全300層のゲート電圧を個別駆動' },
    ],
    diagramType: 'cfe_wordline_staircase',
  },

  // =========================================================================
  // C58. On-Die High-Voltage Charge Pump (20 V ISPP Program / Erase Pulse Generator)
  // =========================================================================
  'cfe-nand-charge-pump': {
    title: 'C58. オンダイ高電圧チャージポンプ（20V書込／消去パルス昇圧回路）',
    subtitle: 'On-Die Multi-Stage Dickson High-Voltage Charge Pump (18–22 V ISPP Pulse Generator)',
    category: 'チップの中の昇圧ポンプ C58 — 3.3Vの電源から瞬間的に20Vを生み出し電子を記憶室へ押し込む！',
    plainAnalogy:
      'カメラからカードへ届く電気はたった3.3ボルトですが、記憶セルの絶縁壁（C56）へ電子をギュッと押し込んだり消したりするには約20ボルトもの高い電圧が必要です！そこでNANDチップの中にコンデンサとスイッチを何段も並べた「電気のバケツリレー昇圧ポンプ」が内蔵されていて、3.3Vを20Vまで一気に持ち上げているんです！',
    summary:
      '3D NANDシリコンダイの周辺回路に内蔵された多段ディクソン（Dickson）型チャージポンプ昇圧回路。外部の1.8 V / 3.3 V電源から、書き込み・消去に必要な18〜22 Vの高電圧パルスを精密生成します。',
    opticsAndPhysics: [
      'TLC（1セルに3ビット＝8段階の電荷量）を正確に書き込むため、いきなり20 Vをかけるのではなく「ISPP（段階的昇圧パルス書込）」で14 V→14.3 V→14.6 V…と少しずつ電圧を上げながら毎回目標電圧を確認します。',
      'データを書き換える前のブロック消去時には、基板チャネル側へ約20 Vの逆電界パルスをかけてSi₃N₄捕獲層から電子を一斉に引き抜き、全ビットを「1」へリセットします。',
      '高電圧はワード線の配線容量を充放電する大電流を伴うため、CBA世代（C54）では高耐圧MOSFETと省電力ポンプ制御で書き込み消費電力を大幅削減しています。',
    ],
    formula: {
      expression: '入力 3.3 V → 昇圧 V_pgm ≈ 18〜22 V（ISPPステップ ΔV ≈ 0.2〜0.5 V 精密制御）',
      description: '外部電源3.3 Vだけで量子トンネル書き込み・消去を実行するNANDチップ内蔵の高電圧発生器',
    },
    nextGenInnovation:
      '2025〜2026年の高速3D NANDでは、複数プレーン独立チャージポンプと高速放電リカバリ回路で1秒間1,800 MB超の連続書き込みを支えます。',
    specs: [
      { label: '昇圧方式', value: 'オンダイ多段ディクソン・スイッチトキャパシタ昇圧' },
      { label: '生成電圧', value: '書込 V_pgm ≈ 18〜22 V ／ パス V_pass ≈ 8〜10 V' },
      { label: '書込制御', value: 'ISPP（Incremental Step Pulse Programming）微細段階パルス' },
      { label: '安全分離', value: '高耐圧トランジスタによる低電圧ロジック保護' },
    ],
    diagramType: 'cfe_nand_charge_pump',
  },

  // =========================================================================
  // C59. High-Speed Page Buffer & Multi-Level Sense Amplifier (TLC 8-Level Detector)
  // =========================================================================
  'cfe-sense-amp-page-buf': {
    title: 'C59. 高速ページバッファ＆マルチレベルセンスアンプ（TLC 8段階電圧判定器）',
    subtitle: '16 KB On-Die Page Buffer Latches & 8-Level TLC Threshold-Voltage Sense Amplifiers',
    category: 'ナノ電流を聞き分ける超精密な耳 C59 — たった1つの記憶セルから「8段階の微妙な電圧差」を読み取る！',
    plainAnalogy:
      '現代のTLC 3D NANDは、1つの極小セルの中に電子の量を「空っぽ〜満タンまで8段階（000〜111の3ビット分）」に分けて覚えています！読み出すときは、ビット線を流れるごくわずかなナノアンペアの電流を何万個もの「超精密な耳（センスアンプ）」が一斉に聞き分けて、16キロバイト分の0と1を一瞬で取り出しているんです！',
    summary:
      '各ビット線（数万本並列）の直下に配置された超高感度センスアンプアレイと16 KBページバッファSRAMラッチ。1セルあたり8つのしきい値電圧（Vth）分布をマイクロ秒で判別し、ソフト判定情報も出力します。',
    opticsAndPhysics: [
      'TLCセルでは8つの電圧状態（ER, P1〜P7）の間隔がわずか0.3〜0.5 Vほどしかなく、経年変化や温度で電子が少し漏れると境界が曖昧になります。',
      '通常の「ハード読み出し」でエラーが多い場合、センスアンプは基準電圧をわずかにズラして何度も測る「ソフトセンス（LLR対数尤度比）」を出力し、LDPC誤り訂正エンジン（C10）へ渡して完璧に復元します。',
      '1ページ（16 KB＋ECC冗長部）分のデータを丸ごと並列ラッチしてキャッシュパイプライン動作させるため、次のページを読みながら前のページを3,600 MT/sでコントローラへ転送できます。',
    ],
    formula: {
      expression: '1セル＝2³＝8電圧レベル（TLC 3 bit/cell） ／ 16 KB並列一括センス tR ≈ 30〜45 μs',
      description: '極微弱なセル電流から8段階のデジタルビットと信頼度情報を並列抽出するNANDの聴覚器官',
    },
    nextGenInnovation:
      'BiCS8 CBL/CBA世代ではセンスアンプを直下ウェハの最新CMOSで作れるため、読み出しレイテンシ（tR）とページキャッシュ転送速度が劇的に向上。',
    specs: [
      { label: '判定階調', value: 'TLC 8レベル（3 bit/cell）・pSLC時 2レベル高速判定' },
      { label: '並列幅', value: '16 KB＋ECCパリティ（約14万ビット一括並列センス）' },
      { label: 'ECC連携', value: 'ハード判定＋多段階ソフト判定（LDPC LLR生成）' },
      { label: '読み出し時間', value: 'tR 約 30〜45 μs（キャッシュリードで連続高スループット）' },
    ],
    diagramType: 'cfe_sense_amp_page_buf',
  },

  // =========================================================================
  // C60. Proactive Read-Reclaim, Early-Move & Background Data Retention Scrubber
  // =========================================================================
  'cfe-read-reclaim-scrub': {
    title: 'C60. リードディスターブ対策（Early-Move / Read-Reclaim＆自動巡回データ修復）',
    subtitle: 'Proactive Early-Move, Read-Reclaim & Background Charge-Drift Data Scrubber Engine',
    category: 'データの見回り修復パトロール C60 — 読みすぎや時間経過で薄れかけた記録を、消える前に新しい部屋へお引越し！',
    plainAnalogy:
      'フラッシュメモリは同じ場所を何万回も読み出したり、夏場の暑い車内に置いたりすると、閉じ込めた電子が少しずつ薄れてしまう弱点（リードディスターブ／データ保持劣化）があります。そこで2025〜2026年のプロ用カードは、エラーが増え始める前に「お引越しパトロール」が自動で新しい部屋へ書き直してデータを永遠に守るんです！',
    summary:
      '2025〜2026年のプロ用シネマCFexpress・産業用NVMe（ATP / Sony / ProGrade Refresh Pro等）に搭載される、リードディスターブ検知（Read-Reclaim）・早期退避（Early-Move）・バックグラウンド巡回リフレッシュ機構です。',
    opticsAndPhysics: [
      'あるブロックのデータを何度も再生・プレビューすると、隣のセルにかかる読み出しパス電圧の影響で徐々に電子が紛れ込みます（リードディスターブ）。読出回数がしきい値に達すると自動で別ブロックへ移し替えて清浄化します（Read-Reclaim）。',
      'LDPC誤り訂正エンジン（C10）が訂正ビット数の微増を検知した瞬間、エラーが訂正不能になるずっと手前で「Early-Move（予防的再配置）」を発動し、新鮮な強い電荷で書き直します。',
      '撮影の合間のアイドル時間やPCでのリフレッシュ実行時に全領域の電荷保持状態（Data Retention）を巡回診断し、8K収録ファイルの長期信頼性を保証します。',
    ],
    formula: {
      expression: '訂正ビット数 N_err > 予防しきい値 N_early → 自動フレッシュブロック再書込（BER < 10⁻¹⁷維持）',
      description: '電子の自然流出や読み込みストレスによるデータ消失を「壊れる前に自動修復」するプロ仕様の守護機能',
    },
    nextGenInnovation:
      '2026年最新ファームウエアでは温度履歴（高温放置ほど電子漏れが速いアレニウス則）も加味して巡回リフレッシュ間隔をAI的に最適化。',
    specs: [
      { label: '予防機構', value: 'Early-Move（エラー予兆検知時の自動ブロック退避）' },
      { label: '読出保護', value: 'Read-Reclaim（リードディスターブ蓄積ブロック自動更新）' },
      { label: '長期保持', value: 'バックグラウンド巡回スクラビング＆温度補償リフレッシュ' },
      { label: 'データ信頼性', value: '訂正不能エラー率 UBER < 10⁻¹⁷（シネマ収録基準）' },
    ],
    diagramType: 'cfe_read_reclaim_scrub',
  },
};

