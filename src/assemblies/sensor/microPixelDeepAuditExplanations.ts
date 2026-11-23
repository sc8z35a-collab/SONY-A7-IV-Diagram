import { PartExplanation } from '../types';

/**
 * Phase 20A — Micro Pixel Semiconductor Cross-Section Deep-Audit Explanations (+15: M36–M50 -> 50 total).
 * Backed by Sony Semiconductor Solutions IEDM 2021–2025 / EDTM / ISSCC / TechInsights publications.
 * ALL 15 parts carry `standaloneOnly: true` (visible ONLY in standalone 'micro' mode; omitted in whole-camera views).
 */
export const MICRO_DEEP_AUDIT_EXPLANATIONS: Record<string, PartExplanation> = {
  'micro-dsa-phrf-film': {
    title: 'M36. DSA自己組織化「擬似高屈折率ナノ多孔膜（pHRF）」反射防止層',
    subtitle: 'Directed Self-Assembly (DSA) Pseudo High Refractive Index Nano-Pore Film (pHRF)',
    category: '個別微細ナノ層 M36 — ナノサイズの蜂の巣の穴で「青い光の跳ね返り」まで吸い込む最先端フィルム',
    plainAnalogy:
      '静かな水面に光を当てると鏡みたいに跳ね返りますが、表面にミクロの「蜂の巣スポンジ」を敷くと光が跳ね返らずにスッと奥へ吸い込まれます。ソニーが世界で初めて実用化したこの層は、分子が勝手に整列する力（自己組織化）で目に見えない極小の穴を並べ、特に反射しやすかった青い光（400〜550nm）の取り込み効率をグンと高めます。',
    summary:
      'ソニーセミコンダクタソリューションズが国際学会IEEE EDTM最優秀論文賞で発表した、ブロック共重合体の指向性自己組織化（DSA：Directed Self-Assembly）プロセスにより形成される「擬似高屈折率ナノ多孔膜（pHRF）」。シリコン裏面とカラーフィルターの間で連続的な屈折率整合を生み出し、青〜緑色光の表面反射ロスを劇的に抑えます。',
    opticsAndPhysics: [
      'シリコンは可視光（特に青色450nm付近）に対して屈折率 n ≈ 4.6 と極端に高く、通常の平坦なSiN膜だけでは界面反射が残り量子効率（QE）の足かせになっていました。',
      '光の波長（400nm）よりはるかに小さい数10nm径の微細孔アレイをDSAで均等配列すると、有効媒質理論により理想的な中間屈折率を持つ「擬似高屈折率膜（pHRF）」として振る舞い、広角度の反射率を極小化します。',
      '物理エッチングによるシリコン結晶ダメージを避けられるため、暗電流を増やさずに400〜550nm帯の感度を向上できる点が革新的です。',
    ],
    formula: {
      expression: 'n_eff = √(f_fill · n_mat² + (1 − f_fill) · n_pore²) ≈ √(n_CFA · n_Si) ≈ 2.65',
      description: 'ナノ多孔の空隙率 f_fill を分子自己組織化で精密制御し、青色光の界面反射を理想的に打ち消す',
    },
    nextGenInnovation:
      'EUV露光に頼らずバッチ処理で27nmピッチ以下の均一ナノ構造を300mmウェハー全面へ一括形成でき、将来の高画素フルサイズ・中判センサーの青色感度向上を支えます。',
    specs: [
      { label: '形成プロセス', value: 'ブロック共重合体 DSA（指向性自己組織化）' },
      { label: '有効波長帯', value: '400 〜 550 nm（青〜緑色光 感度向上）' },
      { label: '孔ピッチ', value: '約 20 〜 40 nm（サブ波長ナノ多孔）' },
      { label: '発表出典', value: 'Sony EDTM Best Paper（Oshiyama et al.）' },
    ],
    diagramType: 'micro_dsa_phrf_film',
  },

  'micro-ob-dark-clamp': {
    title: 'M37. 完全遮光基準画素帯「オプティカルブラック（OB）タングステン遮光膜＆暗電流クランプ」',
    subtitle: 'Optical Black (OB) Reference Pixel Tungsten Light-Shield Band & Auto Black-Level Clamp',
    category: '個別微細ナノ層 M37 — 毎コマ「本当の真っ黒＝0」を測り直す、暗室に閉じ込めた基準画素',
    plainAnalogy:
      '体重計に乗る前にまず「0.0kg」にリセットするのと同じです。センサーは撮影中に温まると、光が当たっていなくても少しだけ電気（暗電流）が湧いて黒が浮いてしまいます。そこでセンサーの端っこに「光が絶対に入らない分厚い金属屋根」をかぶせた見張り画素を並べ、毎コマ自動で「今の本当の真っ黒」を引き算して締まりのある黒を守ります。',
    summary:
      '有効画素アレイの周囲に配置される、厚肉タングステン／アルミ遮光膜で完全密閉されたオプティカルブラック（OB：Optical Black）基準画素帯と、オンチップ自動黒レベルクランプ回路（Auto OB Clamp）。温度変化で変動する暗電流オフセットを毎フレーム・毎行リアルタイムに減算します。',
    opticsAndPhysics: [
      'シリコンの熱励起暗電流は温度が約6〜8°C上がるごとに2倍へ急増するため、長時間の8K動画収録や夏場の連写では無補正だと黒レベル（ペデスタル）が灰緑色に浮き上がります。',
      'OB画素は有効画素とまったく同一のフォトダイオード・転送ゲート構造を持ちながら上空を200nm以上の不透明タングステン遮光膜で覆われているため、「純粋な暗電流＋回路オフセット」だけを高精度に抽出できます。',
      '行ごと（HOB）とフレーム上部（VOB）の両方でデジタル平均化フィードバック（クランプ）をかけることで、120fps連写でも横スジや黒浮きゼロの深い暗部階調を維持します。',
    ],
    formula: {
      expression: 'D_true(x,y) = D_raw(x,y) − Mean(D_OB(T))  (OB平均値減算で温度ドリフト ΔBlack < 0.2 LSB)',
      description: '遮光OB帯の平均暗出力をデジタル減算し、低温から高温まで常に寸分違わぬ漆黒基準を保つ',
    },
    nextGenInnovation:
      '有効画素とOB画素の間にはダミー遷移画素（Dummy Transition Band）と深掘りFDTI壁を多重配置し、強烈な太陽光がOB領域へ斜め漏れする「OBクランプ誤動作（黒沈み）」を根絶しています。',
    specs: [
      { label: '遮光膜材質', value: '厚肉タングステン（W）＋ Al 複合遮光膜' },
      { label: '遮光減衰率', value: 'OD > 6（入射光を100万分の1以下へ遮断）' },
      { label: '配置領域', value: 'VOB（垂直OB帯）＋ HOB（水平行OB帯）' },
      { label: '役割', value: '温度変化による暗電流オフセットの毎コマ自動補正' },
    ],
    diagramType: 'micro_ob_dark_clamp',
  },

  'micro-inter-polysi-wiring': {
    title: 'M38. 2層画素間「耐熱・中間ポリシリコン配線層（Intermediate Poly-Si Wiring）」',
    subtitle: '2-Layer Transistor Pixel Intermediate Polysilicon Routing Layer (Sony IEDM 2024)',
    category: '個別微細ナノ層 M38 — 1,000℃の高温焼き窯にも溶けない「2階建て画素の耐熱バイパス電線」',
    plainAnalogy:
      '2階建ての家（1階が受光部、2階がアンプ）を作るとき、1階と2階をつなぐ配線に普通の銅線を使うと、2階を1,000℃の窯で焼き固める工程でドロドロに溶けてしまいます。そこでソニーは2024年の最新技術で、高温にめっぽう強い「シリコン製の耐熱電線（中間ポリシリコン配線）」を1階と2階の間に通し、超コンパクトな2層画素を完成させました。',
    summary:
      'ソニーがIEDM 2024（Satake / Hirano et al.）で発表した、2層トランジスタ画素（Exmor T系）の第1シリコン層（フォトダイオード）と第2シリコン層（画素トランジスタ）の層間絶縁膜内に埋め込まれる高ドープ中間ポリシリコン配線層（Intermediate Poly-Si Wiring）。',
    opticsAndPhysics: [
      '3D逐次積層（Sequential 3D Integration）でフォトダイオードの上に第2の単結晶シリコン層を貼り合わせてトランジスタを焼き込む際、イオン注入活性化のための高温アニール（約800〜1,000°C）が必須です。',
      '銅（融点1,085°C・拡散開始400°C）やアルミ（融点660°C）は下層配線に使えませんが、リン／ボロン高ドープ多結晶シリコン（ポリSi）は1,000°C超でも安定でシリコン汚染もゼロです。',
      'この中間ポリシリコン配線によって2×1デュアルピクセル共有レイアウトの配線混雑が一気に解消し、0.8 μm極小デュアルピクセルでランダムノイズ 1.3 e⁻ rms と高飽和 8,500 e⁻ を両立しました。',
    ],
    formula: {
      expression: 'T_process(Poly-Si) > 950 °C  ≫  T_limit(Cu/Al ≈ 400 °C)  →  3D逐次積層の中間自由配線を実現',
      description: '高温フロントエンド工程（FEOL）に耐える耐熱導電層により、2層画素のレイアウト自由度を飛躍的拡大',
    },
    nextGenInnovation:
      '中間ポリシリコン配線と埋込サブロカル接続（BSC）の融合により、フルサイズ高画素機でも「全画素デュアルピクセルAF＋2層トランジスタ高ダイナミックレンジ」を面積ロスなく実装可能にします。',
    specs: [
      { label: '配線材質', value: '高濃度リン／ボロン ドープ多結晶シリコン' },
      { label: '耐熱温度', value: '> 950 °C（2層目FEOL高温アニール耐性）' },
      { label: '配置位置', value: '第1層（PD）と第2層（画素Tr）の中間絶縁膜内' },
      { label: '発表出典', value: 'Sony IEDM 2024（Satake & Hirano et al.）' },
    ],
    diagramType: 'micro_inter_polysi_wiring',
  },

  'micro-soi-box-finfet': {
    title: 'M39. 第2画素層 SOI埋込酸化膜（BOX）＆ 3D画素FinFET完全空乏絶縁土台',
    subtitle: '2nd-Layer Silicon-on-Insulator (SOI) Buried Oxide (BOX) Floor for Pixel FinFETs (IEDM 2025)',
    category: '個別微細ナノ層 M39 — 画素アンプの下に敷く「超薄ガラスの絶縁マット」で暗部ノイズを極限カット',
    plainAnalogy:
      'トランポリンの下で誰かが揺らしていると綺麗に跳べないのと同じで、画素アンプ（トランジスタ）の底面がシリコン基板とべったりくっついていると余計な電気容量やノイズが伝わります。ソニーがIEDM 2025で発表したSOI埋込酸化膜は、2階アンプの真下に敷く「超極薄ガラスの絶縁床」で、電気の無駄漏れとチラつきノイズを一掃します。',
    summary:
      'ソニーがIEDM 2025（Hirano et al.）で発表した、2層トランジスタ画素の第2シリコン活性層直下に形成されるSOI（Silicon-on-Insulator）埋込酸化膜（BOX：Buried Oxide）と完全空乏型3D画素FinFETの絶縁土台構造。',
    opticsAndPhysics: [
      '通常のバルクシリコン上にソースフォロワ増幅トランジスタを作ると、ソース／ドレイン拡散層と基板間の接合容量が大きく、変換効率（CG）を低下させるとともに基板電位変動（ボディ効果）の影響を受けます。',
      '極薄SiO₂埋込酸化膜（BOX）の上に極薄シリコンフィンを立てたSOI Pixel FinFET構造では、接合寄生容量がほぼゼロになり、3面ゲートによる強力な電界制御でランダムテレグラフ信号（RTS：暗い場所のチカチカ雑音）を劇的に抑え込みます。',
      '同時にFD（フローティングディフュージョン）共有単位を縮小でき、変換効率（μV/e⁻）が大幅に高まるため、ISO 12800超の超高感度域でも滑らかなグラデーションが得られます。',
    ],
    formula: {
      expression: 'C_j(SOI) ≈ 0  ⇒  CG = q / C_FD ↑,   S_RTS(1/f) ∝ (1 / W·L_eff) ↓  (極限低暗ノイズ)',
      description: '埋込酸化膜による完全絶縁と3D FinFETの広実効チャネル幅により高変換効率・低RTSノイズを同時達成',
    },
    nextGenInnovation:
      '2025年末発表の次世代2層画素コア技術として、スマートフォンからフルサイズフラッグシップ機まで、暗所画質の限界をもう1段押し広げる鍵となります。',
    specs: [
      { label: '絶縁土台', value: '極薄熱酸化 SiO₂ 埋込酸化膜（BOX）' },
      { label: '上部素子', value: '完全空乏 3D SOI Pixel FinFET（AMP/RST/SEL）' },
      { label: 'ノイズ低減', value: 'ランダムテレグラフ雑音（RTS）大幅低減' },
      { label: '発表出典', value: 'Sony IEDM Dec 2025（Hirano et al.）' },
    ],
    diagramType: 'micro_soi_box_finfet',
  },

  'micro-h2-fga-passivation': {
    title: 'M40. 水素フォーミングガスアニール（FGA）Si-H ダングリングボンド界面修復層',
    subtitle: 'Forming Gas Anneal (FGA) Atomic-Hydrogen Si-H Dangling-Bond Interface Passivation',
    category: '個別微細ナノ層 M40 — シリコン表面の「原子のささくれ」を水素の絆創膏で1本ずつ塞ぐ修復層',
    plainAnalogy:
      '木をノコギリで切ると表面に細かい「ささくれ」ができますよね。シリコン結晶の端っこにも「手をつなぎ損ねた原子（ダングリングボンド）」が残り、そこから偽の電気（暗電流＝白いノイズ点）が湧き出ます。仕上げに水素ガスの中で温めて水素原子を送り込み、ささくれを1本ずつ「Si-Hの絆創膏」で塞いで星空を真っ黒に澄ませます。',
    summary:
      'ウェハー製造終盤のフォーミングガスアニール（FGA：N₂＋H₂混合ガス中 400〜450°C熱処理）および水素含有SiNキャップ層からの拡散により、Si/SiO₂界面の未結合手（Pbセンター・ダングリングボンド）を原子状水素（Si-H結合）で終端した界面修復層。',
    opticsAndPhysics: [
      '単結晶シリコンと酸化膜（SiO₂）の境界面には、格子定数の違いにより結合相手を失ったシリコン原子（界面準位 D_it）が存在し、熱エネルギーで電子を生み出す「SRH再結合・生成センター（暗電流と白点欠陥の元凶）」になります。',
      'フォーミングガスアニールで供給された原子状水素（H）は酸化膜中を高速拡散し、未結合手と化学結合（Si• + H → Si-H）して電気的に完全に不活性化します。',
      'これにより界面準位密度 D_it が 10¹² から 10¹⁰ cm⁻²eV⁻¹ 以下へ2桁以上激減し、長時間露光（バルブ星景撮影）でのホットピクセル発生率を劇的に低下させます。',
    ],
    formula: {
      expression: 'Si• (界面欠陥) + H  →  Si−H (電気的不活性)   ⇒   D_it < 10¹⁰ cm⁻²eV⁻¹ (暗電流 1/10 以下)',
      description: '界面トラップ準位を水素終端することで、SRH熱生成暗電流と1/fフリッカーノイズを根本から削減',
    },
    nextGenInnovation:
      '後工程のプラズマ成膜でSi-H結合が切れないよう低温CVDプロセスと重水素（D₂）アニールを組み合わせ、長年の紫外線・放射線曝露でも劣化しない超堅牢界面を実現しています。',
    specs: [
      { label: '処理ガス・温度', value: 'フォーミングガス（N₂ + 3〜5% H₂）/ 約 420 °C' },
      { label: '修復対象', value: 'Si/SiO₂界面 Pbセンター（未結合手）' },
      { label: '低減効果', value: '界面準位 D_it を約 1/100 へ削減' },
      { label: '画質メリット', value: '長時間露光の暗電流・白点ホットピクセル激減' },
    ],
    diagramType: 'micro_h2_fga_passivation',
  },

  'micro-sab-salicide-block': {
    title: 'M41. フォトダイオード「サリサイドブロック（SAB）保護膜」＆ 局所NiSi低抵抗シリサイド層',
    subtitle: 'Photodiode Salicide-Block (SAB) Protective Mask & Selective NiSi / CoSi₂ Ohmic Contacts',
    category: '個別微細ナノ層 M41 — 繊細な受光面はマスキングで守り、配線口だけ超低抵抗にする「精密塗り分け」',
    plainAnalogy:
      'ペンキを塗るとき、汚したくない窓ガラスには「マスキングテープ」を貼りますよね。センサーでも、電気を通しやすくする金属（ニッケル）をトランジスタの接続口だけに塗って「シリサイド」という低抵抗コーティングを作りつつ、金属が1粒でも混ざると白いゴミ点になる受光面には「サリサイドブロック膜」を貼って徹底ガードします。',
    summary:
      '画素トランジスタのゲート・ソース・ドレイン表面だけに低抵抗のニッケルシリサイド（NiSi）またはコバルトシリサイド（CoSi₂）を自己整合形成し、フォトダイオード領域にはSiO₂/SiNのサリサイドブロック（SAB：Salicide Block）マスクを残して金属拡散汚染を完全遮断する精密選択プロセス層。',
    opticsAndPhysics: [
      'ニッケルやコバルトなどの遷移金属原子はシリコン結晶中で深いエネルギー準位（捕獲断面積の大きいGRセンター）を作り、わずか数個の原子がフォトダイオード空乏層へ侵入しただけで強烈な「白点欠陥（Blemish / Hot Pixel）」を引き起こします。',
      'サリサイドブロック膜（厚さ20〜40nmの緻密SiO₂/SiN）でフォトダイオード表面を完全被覆してから金属スパッタ＋アニールを行うことで、金属汚染ゼロと超低暗電流を守り切ります。',
      '一方、SAB開口部のトランジスタ端子・ゲート電極上には比抵抗 ~15 μΩ·cm の極低抵抗NiSiが形成され、120fps高速スイッチング時の寄生直列抵抗を最小化します。',
    ],
    formula: {
      expression: 'R_sheet(NiSi) ≈ 4 Ω/□  ≪  R_sheet(Poly-Si ≈ 200 Ω/□)   ＋   [Metal]_PD < 10⁹ atoms/cm³',
      description: 'トランジスタ端子の配線抵抗を1/50へ下げつつ、フォトダイオードへの重金属拡散汚染をゼロ阻止',
    },
    nextGenInnovation:
      '重金属ゲッタリング（背面カーボン注入トラップ層）とSABマスクの二重防御により、数千万画素のフルサイズチップ全体で欠陥画素率をppmレベル以下へ抑えています。',
    specs: [
      { label: '保護マスク', value: 'SiO₂ / SiN サリサイドブロック（SAB）25 nm' },
      { label: '低抵抗電極', value: '自己整合 NiSi / CoSi₂ シリサイド層' },
      { label: 'シート抵抗', value: '約 3 〜 5 Ω/□（高速スイッチング対応）' },
      { label: '主な役割', value: '金属拡散による白点欠陥（Blemish）完全防止' },
    ],
    diagramType: 'micro_sab_salicide_block',
  },

  'micro-sti-ldd-spacer': {
    title: 'M42. 画素トランジスタ「浅溝分離（STI）」＆ ゲート側壁スペーサー／LDD電界緩和拡散層',
    subtitle: 'Shallow Trench Isolation (STI), Si₃N₄ Gate Sidewall Spacers & Lightly Doped Drain (LDD)',
    category: '個別微細ナノ層 M42 — 急な電気の崖を「ゆるやかな階段」に変えてトランジスタを守る減速スロープ',
    plainAnalogy:
      '高い滝から水が一気に落ちると滝壺が削れて壊れてしまいますが、途中に「ゆるやかな段差（階段）」を作れば勢いが和らぎます。トランジスタの端も電圧の落差が急すぎると電子が暴走してノイズが増えるため、ゲートの左右に「丸い絶縁カーブ（側壁スペーサー）」と「薄い不純物スロープ（LDD）」を作って電子を優しく流します。',
    summary:
      '画素内の隣接トランジスタ同士を絶縁するSiO₂充填の浅溝分離（STI：Shallow Trench Isolation）と、ゲート電極の左右側面に形成したSi₃N₄スペーサーをマスクにして自己整合注入するLDD（Lightly Doped Drain：低濃度ドレイン）電界緩和構造。',
    opticsAndPhysics: [
      'フローティングディフュージョン（FD）やリセットドレイン（RD）周辺に急峻な高濃度N++接合があると、局所的な強電界によって電子がトンネル漏れする「GIDL（ゲート誘起ドレインリーク）」が生じ、待機中の暗電流ノイズを悪化させます。',
      'ゲート側壁スペーサー（幅30〜60nm）を用いてチャネル端へ低濃度LDD領域を段階的に配置することで、最大横方向電界を大幅に緩和し、GIDL暗電流とホットキャリア劣化を同時に抑制します。',
      'STI側壁にも薄い熱酸化ライナー＋P型ボロン注入を施し、トレンチ角の結晶応力による暗電流発生を防いでいます。',
    ],
    formula: {
      expression: 'E_max(LDD) ≈ 0.4 × E_max(Abrupt)  ⇒  I_GIDL ∝ exp(−B / E_max) が数桁激減',
      description: 'LDD電界緩和により強電界バンド間トンネリング漏れ（GIDL）を指数関数的に封じ込める',
    },
    nextGenInnovation:
      '転送ゲート（TG）のFD側だけに最適化された非対称LDDプロファイルを採用することで、「完全電荷転送（残像ゼロ）」と「FD暗電流極小化」という相反課題を両立しています。',
    specs: [
      { label: '分離トレンチ', value: 'HDP-CVD SiO₂ 充填 浅溝分離（STI）深さ ~300 nm' },
      { label: '側壁スペーサー', value: 'SiO₂ / Si₃N₄ 多層オフセットスペーサー' },
      { label: '電界緩和層', value: '低濃度リン注入 LDD（FD/RD GIDL抑制）' },
      { label: '画質効果', value: '長時間露光のFDリーク＆白点ノイズ低減' },
    ],
    diagramType: 'micro_sti_ldd_spacer',
  },

  'micro-cu-tan-barrier': {
    title: 'M43. 銅配線「Ta/TaN 銅拡散防止バリアライナー」＆ タングステン（W）ローカルコンタクトプラグ',
    subtitle: 'Ta/TaN Copper-Diffusion Barrier Liner & Ti/TiN-Lined Tungsten (W) Contact Plugs',
    category: '個別微細ナノ層 M43 — 銅の「毒」がシリコンへ染み出すのを1本ずつ包んで止める極薄ラップ',
    plainAnalogy:
      '銅は電気を最高によく通しますが、実はシリコン半導体にとっては「1粒でも入り込むと画素をダメにする猛毒」です。そこで、すべての銅配線の周りを厚さわずか5nmの「窒化タンタル（TaN）という超極薄ステンレスラップ」で隙間なく包み、さらにシリコンとの接点には絶対に染み出さないタングステン製の小さな金属杭（プラグ）を打ち込んでいます。',
    summary:
      'BEOL多層銅ダマシン配線の全溝内壁を覆う原子層レベルのタンタル／窒化タンタル（Ta/TaN）銅拡散バリアライナーと、シリコン上のNiSi端子と第1銅配線（M1）を垂直接続するTi/TiN密着層付きタングステン（W）コンタクトプラグ群。',
    opticsAndPhysics: [
      '銅（Cu）原子はSiO₂絶縁膜やシリコン結晶中を極めて速く拡散し、フォトダイオードへ達すると強烈な暗電流・白点欠陥を引き起こします。厚さ3〜8nmの緻密なTaN/Ta二層バリアが銅原子の侵入を物理的・化学的に100%ブロックします。',
      'また、高電流密度の120fps駆動時に銅原子が電子流に押されて断線する「エレクトロマイグレーション」を防ぐ強固な外壁（ライナー）としても機能します。',
      '最下層のコンタクトホール（アスペクト比 > 5）は銅ではなく段差被覆性に優れるCVDタングステン（W）プラグで埋め込み、画素トランジスタの微小端子を確実にM1配線へ引き上げます。',
    ],
    formula: {
      expression: 'D_Cu(TaN) ≈ 10⁻¹⁸ × D_Cu(SiO₂)  (わずか 5 nm の TaN 膜で銅原子拡散を事実上ゼロへ遮断)',
      description: '超薄膜TaNバリアとタングステンコンタクトの二段隔離により、銅配線の低抵抗とセンサーの清浄度を両立',
    },
    nextGenInnovation:
      '微細配線世代ではコバルト（Co）またはルテニウム（Ru）ライナーを併用し、バリア膜厚を2nm以下へ薄型化することで銅の有効断面積を広げ配線抵抗をさらに低減しています。',
    specs: [
      { label: 'Cuバリア層', value: 'PVD/ALD TaN + Ta 二層バリア（厚さ 3〜8 nm）' },
      { label: 'ローカル接続', value: 'Ti/TiNライナー付き CVDタングステン（W）プラグ' },
      { label: '信頼性効果', value: 'Cu拡散による白点防止＆エレクトロマイグレーション耐性' },
      { label: '配置領域', value: 'PMDコンタクト層 〜 M1–M4 全銅配線内壁' },
    ],
    diagramType: 'micro_cu_tan_barrier',
  },

  'micro-row-vdriver-levelshift': {
    title: 'M44. 垂直行ドライバ（V-Driver）負電圧レベルシフタ＆転送ゲート負バイアス暗電流抑制バス',
    subtitle: 'Row Vertical Scanner Driver & Negative-Bias Transfer Gate (-1.2 V) Level-Shifter Bus',
    category: '個別微細ナノ層 M44 — 露光中に転送扉へ「マイナスの電気鍵」をかけて隙間ノイズを完全封印',
    plainAnalogy:
      '普通のスイッチはOFFのとき「0ボルト」にしますが、カメラの画素はOFFのときにわざと「マイナス1.2ボルト」の逆電圧をかけます！こうすると、扉（転送ゲート）のすぐ裏側にプラスの電気がびっしり集まって「見えない電気のパッキン」ができ、長い露光中でも扉の隙間からノイズ電子が1粒も湧き出なくなります。',
    summary:
      '画素アレイの左右端（または第2ロジック層直下）に配置される垂直走査ドライバ（Row V-Driver）と、内蔵チャージポンプで生成した負電圧（V_TG_LO ≈ −1.0〜−1.4 V）を全行の転送ゲート配線へ高速供給する高耐圧レベルシフタ回路群。',
    opticsAndPhysics: [
      '露光待機中に転送ゲート（TG）が 0 V だと、ゲート直下のSi/SiO₂界面が空乏化しかけて界面準位からの熱暗電流が発生しやすくなります。',
      'V-Driverのレベルシフタが待機中のTGへ −1.2 V の負バイアスを印加することで、ゲート直下へ正孔（ホール）を高濃度に引き寄せて「正孔蓄積ピニング状態（Hole Accumulation Pinning）」を作り出し、転送ゲート由来の暗電流を1/10以下へ激減させます。',
      '読み出し瞬間には瞬時に +2.8〜+3.3 V へ立ち上げ、立ち上がり波形（スルーレート）を精密制御することでクロックフィードスルー雑音を抑えつつ100%完全電荷転送を行います。',
    ],
    formula: {
      expression: 'V_TG(Hold) = −1.2 V (正孔蓄積ピニング)  ↔  V_TG(Read) = +3.0 V (ナノ秒完全転送)',
      description: '負電源チャージポンプ＋レベルシフタによる両極性ゲート駆動で、暗電流ゼロと完全転送を両立',
    },
    nextGenInnovation:
      '第2ロジック層に分散配置された超低インピーダンス行ドライバにより、フルサイズ36mm幅の横方向配線遅延（RC時定数）を極小化し、全行同時グローバルシャッターのピコ秒同期を支えています。',
    specs: [
      { label: '駆動電圧幅', value: '−1.2 V（露光保持） ↔ ＋3.0 V（電荷転送）' },
      { label: '負電源生成', value: 'オンチップ負電圧チャージポンプ内蔵' },
      { label: '暗電流低減', value: 'TG界面由来の暗電流を −20 dB 以上抑制' },
      { label: '配置位置', value: '第2ウェハー行スキャナ／画素行制御バス' },
    ],
    diagramType: 'micro_row_vdriver_levelshift',
  },

  'micro-col-bias-cascode': {
    title: 'M45. カラム定電流負荷アレイ＆ 太陽光黒潰れ（ブラックサン）防止カスコードクランプ回路',
    subtitle: 'Column Constant-Current Bias Sink Array & Sun-Blackening Prevention Cascode Clamp',
    category: '個別微細ナノ層 M45 — 真夏の太陽を正面から撮っても「太陽の中が真っ黒に反転する怪現象」を防ぐ安全弁',
    plainAnalogy:
      '昔のデジタルカメラで強烈な太陽を撮ると、一番明るいはずの太陽の真ん中がポッカリ真っ黒に抜ける「ブラックサン（黒太陽）現象」が起きることがありました。この回路は、光が強すぎて電圧が異常に下がりすぎた瞬間に「これ以上下げちゃダメ！」と止める電気のストッパーで、太陽や車のヘッドライトも自然な真っ白に保ちます。',
    summary:
      '第2ウェハーの各垂直信号線（VSL）の下端に並列配置される高精度定電流負荷トランジスタ（ソースフォロワ用バイアス電流源）と、極端な過大光入射時にリセットレベル V_rst が崩壊するのを防ぐカスコード電圧クランプ（Anti-Black-Sun Clamp）回路。',
    opticsAndPhysics: [
      '強烈な太陽光が当たると、露光終了前でもフォトダイオードから溢れた大量の電子がフローティングディフュージョン（FD）へ流れ込み、CDSの基準であるはずのリセット電圧 V_rst まで大きく引き下げてしまいます。',
      'その結果、CDS引き算（V_sig − V_rst）の値がゼロ付近になり、本来もっとも明るい太陽中心が真っ黒に反転する「ブラックサン現象（太陽光黒潰れ）」が発生します。',
      'カラム入力段の電圧クランプ（クリッピング）トランジスタが垂直信号線の下限電圧を強制保護し、異常飽和を検知した画素へ即座にフルスケール白（16,383）を出力させることで、いかなる逆光でも破綻しないHDR描写を実現します。',
    ],
    formula: {
      expression: 'If V_rst < V_clamp  ⇒  V_VSL = V_clamp  ⇒  D_out = Full-Scale White (ブラックサン完全防止)',
      description: 'リセット電圧崩壊をアナログ比較クランプで瞬時保護し、直射太陽下の白飛び反転アーティファクトを根絶',
    },
    nextGenInnovation:
      '定電流負荷には高出力抵抗のカスコード構成を採用し、電源電圧のわずかな揺れが縦縞ノイズ（PSRR劣化）として写り込むのを防いでいます。',
    specs: [
      { label: '電流負荷', value: '列並列 2〜8 μA 超低雑音カスコード定電流源' },
      { label: '保護機能', value: 'ブラックサン（太陽光黒反転）防止クランプ回路' },
      { label: '電源除去比', value: 'PSRR > 60 dB（縦スジ固定パターンノイズ抑制）' },
      { label: '配置ウェハー', value: '第2ウェハー（Wafer 2 カラム入力段）' },
    ],
    diagramType: 'micro_col_bias_cascode',
  },

  'micro-inpixel-dram-gs': {
    title: 'M46. グローバルシャッター専用「画素直下・電圧ドメイン二重MIM/DRAM記憶セル」',
    subtitle: 'Voltage-Domain Global Shutter Dual In-Pixel Trench-MIM / DRAM Sample-Hold Cell (α9 III Class)',
    category: '個別微細ナノ層 M46 — 2,460万画素すべての真下に1個ずつ備えた「瞬間冷凍サンプルホールド金庫」',
    plainAnalogy:
      '従来のカメラは上から下へ順番に写真をスキャンするため、速く回るプロペラがグニャリと歪みました。α9 III級の最新グローバルシャッターセンサーは、全2,460万画素の真下に小さな「瞬間冷凍金庫（記憶コンデンサ）」を2個ずつペアで仕込み、1/80,000秒の一瞬で全画素の光と基準電圧を同時に凍らせて保管し、あとから落ち着いて読み出します。',
    summary:
      'ソニーα9 III搭載IMX810AQL等の電圧ドメイン・グローバルシャッター（Voltage-Domain GS）画素において、Cu-Cuハイブリッド接合直下の第2ウェハーに画素1対1対応で集積される、高密度トレンチMIM／DRAM型デュアルサンプルホールド記憶セル（C_S1: リセット保持 / C_S2: 信号保持）。',
    opticsAndPhysics: [
      '従来の電荷ドメインGSはフォトダイオード横に遮光メモリ領域を並べるため受光面積（開口率）が削られましたが、積層型「電圧ドメインGS」では画素アンプ（SF1）の電圧出力を真下の第2ウェハーに設けた高容量MIMキャパシタ対（C_S1, C_S2）へ一斉サンプリングします。',
      'リセット電圧と信号電圧の両方を画素内で同時保持するため、グローバルシャッター動作でも完全な画素内CDS（真の相関二重サンプリング）が成立し、シャッター歪み完全ゼロと低ノイズを両立します。',
      '1/80,000秒の超高速電子シャッター、全シャッター速度でのフラッシュ同調、120fpsブラックアウトフリー連写を実現する究極の3D積層構造です。',
    ],
    formula: {
      expression: 'V_GS_CDS = V(C_S2) − V(C_S1),   t_skew = 0.00 ms (全2,460万画素 完全同時露光・歪みゼロ)',
      description: '画素直下の二重高容量キャパシタへ基準・信号電圧を同時凍結保存し、歪みゼロ＆低雑音CDSを達成',
    },
    nextGenInnovation:
      '高誘電率ZrO₂/Al₂O₃/ZrO₂（ZAZ）3Dシリンダー型DRAMキャパシタ技術を画素直下へ転用することで、狭い画素ピッチでも数十fFの大容量と極低リーク電流を実現しています。',
    specs: [
      { label: '記憶方式', value: '電圧ドメイン 画素内デュアルS/H（C_S1＋C_S2）' },
      { label: 'キャパシタ構造', value: '3D高誘電トレンチ MIM / ZAZ DRAMセル' },
      { label: '露光歪み', value: '完全 0.00 ms（最高 1/80,000 秒・全速ストロボ同調）' },
      { label: '代表実装機', value: 'ソニー α9 III（IMX810AQL 24.6MP積層GS）' },
    ],
    diagramType: 'micro_inpixel_dram_gs',
  },

  'micro-pga-dual-gain-bus': {
    title: 'M47. デュアルネイティブISO対応 カラム可変ゲインアンプ（PGA）＆ HCG/LCG切替制御網',
    subtitle: 'Dual-Native ISO Column Programmable Gain Amplifier (PGA) & HCG/LCG Control Bus',
    category: '個別微細ナノ層 M47 — 暗い夜景のささやき声だけをノイズなしで大きく聞き取る「2段切替マイクアンプ」',
    plainAnalogy:
      '小さい声を録音するとき、あとからパソコンで音量を上げると「サーッ」という雑音まで大きくなりますが、マイクのすぐ横で最初から綺麗に増幅すれば澄んだ音になります。この回路は、ISO感度に応じて画素内の変換効率（HCG/LCG）と列アンプ（PGA）を自動切替し、ISO 800やISO 3200のような高感度でもノイズがストンと落ちる「デュアルベースISO」を生み出します。',
    summary:
      '第2ロジックウェハーのCDS段とADC段の間に配置された高精度スイッチドキャパシタ型カラム可変ゲインアンプ（PGA：Programmable Gain Amplifier）と、全画素のデュアル変換効率スイッチ（M21 DCG）をフレーム単位で同期制御する高・低ゲイン制御バス。',
    opticsAndPhysics: [
      '低ISO域（例：ISO 100〜640）では画素内DCGをON（低変換効率LCG）にして広大なダイナミックレンジとハイライト耐性を確保し、高ISO域（例：ISO 800〜またはS-Log3 ISO 3200）へ切り替えた瞬間にDCGをOFF（高変換効率HCG）＋カラムPGA倍率最適化を行います。',
      'ADCへ入る前のアナログ段階で光信号だけを大きく持ち上げるため、後段のADC量子化雑音や比較器ノイズの入力換算値が 1/Gain へ劇的に圧縮されます。',
      'この物理メカニズムが、最新ソニーα機の動画S-Log3や暗所静止画で「高ベースISOに切り替えた瞬間にノイズが激減する」魔法の正体です。',
    ],
    formula: {
      expression: 'RN_input = √(RN_pixel² + (RN_ADC / (CG · G_PGA))²)  (HCG×PGAで後段ノイズを極小化)',
      description: '画素変換効率CGとカラムPGAの協調増幅により、高ISO時の入力換算読み出しノイズを1.2 e⁻未満へ低減',
    },
    nextGenInnovation:
      '最新世代では1フレーム内でHCGとLCGの両方を同時読み出し合成する「デュアルゲイン出力（DGO / DCG-HDR）」にも対応し、動画でも16ストップ級の滑らかなHDRを実現します。',
    specs: [
      { label: '回路方式', value: 'スイッチドキャパシタ差動PGA（×1 〜 ×32）' },
      { label: '協調機構', value: '画素内HCG/LCG切替＋デュアルベースISO制御' },
      { label: '最小ノイズ', value: '< 1.2 e⁻ rms（高変換効率＋高PGA時）' },
      { label: '配置ウェハー', value: '第2ウェハー（Wafer 2 CDS〜ADC中間段）' },
    ],
    diagramType: 'micro_pga_dual_gain_bus',
  },

  'micro-onchip-temp-diode': {
    title: 'M48. ロジック層内蔵 PN接合オンダイ温度センサー＆リアルタイム熱雑音補正モニター',
    subtitle: 'On-Die PN-Junction Thermal Sensing Diode Array & Real-Time Junction Temp Monitor',
    category: '個別微細ナノ層 M48 — シリコンチップの中に埋め込んだ「±0.2℃精度の超ミクロ体温計」',
    plainAnalogy:
      '外から額を触るだけでは体の中の正確な熱は分かりませんよね。カメラのセンサーも外側の温度計だけでは本当のチップ温度とズレが出ます。そこで第2ロジック層シリコンの内部に、温度が変わると電圧が真っ直ぐ変化する「極小ダイオード体温計」を直接焼き込み、0.2℃刻みで発熱を監視してノイズ補正や熱保護を完璧に制御します。',
    summary:
      '第2ロジックウェハー内の複数箇所（中央・SLVS-EC出力端・ADC群近傍）に分散集積された、寄生バイポーラPN接合ダイオード型オンダイ温度センサー（On-Die Thermal Sensor）と専用10-bit ΔΣ温度A/Dコンバータ。',
    opticsAndPhysics: [
      'シリコンPN接合に異なる2つの定電流比（1:N）を流したときの順方向電圧差 ΔV_BE = (kT/q)·ln(N) は、製造バラつきに依らず絶対温度 T（ケルビン）へ極めて高い直線性で比例します。',
      'センサー外装のNTCサーミスタより数秒〜数十秒も早くシリコン接合部の瞬間温度上昇（8K60p収録時や120fps連写時）を±0.2°C精度でリアルタイム検出できます。',
      '検出温度はBIONZ XRへ毎フレームメタデータとして送られ、暗電流シェーディングマップの温度補間・OBクランプ係数調整・長秒時ノイズリダクション強度制御に活用されます。',
    ],
    formula: {
      expression: 'T_die = (q / (k · ln N)) · ΔV_BE   (精度 ±0.2 °C、シリコン接合部の真の瞬間温度を直測)',
      description: '物理定数 q/k と電流比 N だけで決まる絶対温度計測により、長時間8K動画の画質・熱安全性を担保',
    },
    nextGenInnovation:
      'チップ面内の複数箇所に配置した温度ダイオードから「センサー温度勾配マップ」を算出し、画面端だけ暗電流が高くなる熱カブリ（アンプグロー）をデジタルでゼロ相殺します。',
    specs: [
      { label: '検知素子', value: 'オンダイ寄生PNPバイポーラ ΔV_BE 温度センサー' },
      { label: '測定精度', value: '±0.2 °C（動作範囲 −30 °C 〜 +125 °C）' },
      { label: '用途', value: 'リアルタイム暗電流補正・熱保護・メタデータ出力' },
      { label: '配置ウェハー', value: '第2ウェハー（Wafer 2 多点分散配置）' },
    ],
    diagramType: 'micro_onchip_temp_diode',
  },

  'micro-emram-otp-fuse': {
    title: 'M49. ロジック層内蔵「欠陥画素補正・感度マップ用 eFuse / 不揮発性STT-eMRAMブロック」',
    subtitle: 'On-Die Non-Volatile OTP eFuse & Embedded STT-eMRAM Calibration Memory (Sony IEDM 2025)',
    category: '個別微細ナノ層 M49 — センサー1枚ごとの「個性のカルテと補正表」を電源OFFでも一生忘れない内蔵メモ帳',
    plainAnalogy:
      '数千万個もの画素を作ると、ほんの数個だけ少し敏感すぎたり鈍感だったりする「個性のある画素」がどうしても生まれます。工場出荷時の精密検査で見つけたその1枚だけの「個性のカルテ（補正マップ）」を、電源を切っても消えないチップ内蔵メモ帳（eFuse / 次世代eMRAM）に刻み込み、電源ONの瞬間から完璧な均一画質で写し出します。',
    summary:
      '第2ロジックウェハー（および次世代第3ウェハー）に集積された、工場トリミング・欠陥画素アドレス・感度不均一性（PRNU）補正係数・バンドギャップ調整値を永久記憶するOTP eFuse（ワンタイム電気ヒューズ）およびソニーがIEDM 2025で推進する組込不揮発性STT-eMRAMメモリマクロ。',
    opticsAndPhysics: [
      '工場ウェハーテスト工程で各センサー固有の基準電圧トリミング値、カラムオフセット校正値、欠陥画素座標、およびSLVS-ECインピーダンス調整値を高信頼eFuseアレイへ電気書込みします。',
      'ソニーが2025年IEDM/MRAMフォーラムで発表した組込STT-eMRAM（スピン注入磁気抵抗メモリ）は、従来のSRAMの1/3以下の極小セル面積で不揮発性（電源OFFでもデータ保持）を実現します。',
      'カメラ電源投入後わずか数ミリ秒でセンサー単体のキャリブレーションとAI推論重みロードを完了できるため、瞬間的な起動レスポンス（速写性）に直結します。',
    ],
    formula: {
      expression: 'Area(STT-eMRAM) < (1/3) · Area(6T-SRAM)  ＋  Data Retention > 10 Years @ 85 °C',
      description: '超高密度・不揮発性の磁気抵抗メモリにより、チップ面積を増やさず高度なオンセンサー補正＆AI機能を搭載',
    },
    nextGenInnovation:
      'オンセンサーAI認識（IMX500系発展型）のニューラルネット重みやユーザー現場ピクセルマッピング更新データの不揮発保存先として、次世代積層センサーの頭脳記憶を担います。',
    specs: [
      { label: '記憶素子', value: 'OTP eFuse ＋ 次世代組込不揮発性 STT-eMRAM' },
      { label: '記憶内容', value: '欠陥画素座標・PRNU係数・V_BG/PLLトリム値' },
      { label: 'セル面積', value: '従来6T-SRAM比 1/3 未満（高密度不揮発）' },
      { label: '発表出典', value: 'Sony IEDM / MRAM Forum 2025（eMRAM for CIS）' },
    ],
    diagramType: 'micro_emram_otp_fuse',
  },

  'micro-rear-bump-sealring': {
    title: 'M50. チップ外周「防湿クラックストップ・メタルシールリング」＆ Al/Cu ボンディングパッド枠',
    subtitle: 'Die-Perimeter Hermetic Moisture / Crack-Stop Metal Seal Ring & Al/Cu Wire-Bond Pad Frame',
    category: '個別微細ナノ層 M50 — チップ切り出しのヒビ割れと湿気を外周で食い止める「お城の石垣と堀」',
    plainAnalogy:
      '大きなウェハー円盤から1枚ずつのセンサーをダイヤモンド刃で切り出すとき、端っこに目に見えない小さなヒビが入ることがあります。そのまま中へヒビや湿気が進むと大切な画素が壊れてしまうため、チップの外周ぐるり一周に何重もの銅とタングステンの頑丈な「お城の石垣（シールリング）」を築いて鉄壁防御しています。',
    summary:
      'シリコンダイ最外周（ダイシング・スクライブレーン内側）を全層（M1〜最上層＋Cu-Cu接合層＋TSV）貫通して取り囲む多重金属クラックストップ／防湿シールリング（Guard Seal Ring）と、外部セラミックパッケージ（S14）の金ワイヤーボンドへ接続する周辺アルミ／銅ボンディングパッド枠。',
    opticsAndPhysics: [
      '低誘電率SiOC（Low-k）層間絶縁膜は電気特性に優れる反面、機械的にもろく吸湿しやすい弱点があります。ダイシング時の微細クラックが画素部へ伝播するのを防ぐため、連続した高靭性銅トレンチとビア壁の多重リング（幅15〜30μm）が応力を全周で食い止めます。',
      '同時に、熱帯雨林や高湿環境でもパッケージ微細隙間からの水分イオン（Na⁺/K⁺/OH⁻）侵入を完全に遮断し、10年以上の長期動作でもCu配線腐食ゼロを保証します。',
      'シールリング内側の外周帯には、電源（AVDD 2.8V / DVDD 1.05V / IOVDD 1.8V）と高速SLVS-EC信号をセラミックパッケージへ受け渡す厚肉Al-Cuボンディングパッドが等ピッチ配列されています。',
    ],
    formula: {
      expression: 'K_I(Crack Tip) < K_IC(Cu-Wall Barrier)  ⇒  ダイシング剥離・湿気侵入をチップ外周で100%停止',
      description: '全BEOL層を垂直貫通する連続金属壁が機械的クラック進展と水分拡散の双方を物理封鎖',
    },
    nextGenInnovation:
      'レーザー・ステルスダイシングとデュアル・シールリング（外側犠牲クラックストップ＋内側完全防湿リング）の併用により、フルサイズ大判チップの歩留まりと長期信頼性を極限まで高めています。',
    specs: [
      { label: '防壁構造', value: '全BEOL層垂直貫通 2重Cu/Wメタルシールリング' },
      { label: '外部端子', value: '周辺Al-Cuパッド（AVDD 2.8V / DVDD 1.05V / IO 1.8V）' },
      { label: '主な役割', value: 'ダイシング亀裂進展阻止＆防湿・可動イオン遮断' },
      { label: '配置位置', value: '積層チップ全周エッジ（スクライブレーン内側）' },
    ],
    diagramType: 'micro_rear_bump_sealring',
  },
};
