import { PartExplanation } from '../types';

/**
 * Phase 36 Part B — Detailed Explanations for MC131–MC150:
 *  - GROUP 3 (MC131–MC140): SY-1122 Mainboard Audio AFE, Anti-Microphonic Passives, Power Tree & C7701 EMI Shield
 *  - GROUP 4 (MC141–MC150): Sony ECM-M1, XLR-K3M / XLR-A4, ECM-W3, HDMI ACR, USB-C UAC 2.0, XAVC DMA & Shutter Sync
 */
export const MIC_ULTRA36_EXPLANATIONS_B: Record<string, PartExplanation> = {
  // =========================================================================
  // GROUP 3: MC131–MC140 — SY-1122 AUDIO AFE, POWER TREE, EMI CAN & PASSIVES
  // =========================================================================

  'mc-c0g-antimicrophonic-coupling-cap': {
    title: 'MC131. ノンマイクロフォニック C0G/NP0 ＆ 金属ブラケット防振・音声ACカップリングコンデンサ対',
    subtitle: 'Anti-Microphonic C0G/NP0 & Metal-Bracket Soft-Termination Input AC-Coupling Capacitor Pair',
    category: 'シャッター衝撃でコンデンサ自体が「歌う」のを止める防振素子 MC131 — X7Rの圧電雑音500 μVをゼロ化！',
    plainAnalogy:
      'じつは普通のセラミックコンデンサ（X7Rなど）は「圧電効果」を持っていて、カメラのシャッター振動やレンズのモーター振動が基板を揺らすと、コンデンサ自身が勝手に電圧を出して第2のマイクみたいに「コンッ！ジーッ！」と鳴ってしまう（マイクロフォニック現象）弱点があります！だからプロのマイク入力回路では、圧電効果が物理的にゼロの「C0G/NP0セラミック」や、金属の足（ブラケット）で基板から浮かせて振動を逃がす特殊防振コンデンサを使うのです！',
    summary:
      'マイク信号経路の直流バイアス遮断（ACカップリング）に用いる非強誘電体 C0G（NP0）Class-1 セラミックおよび金属Jリード防振ブラケット付きソフトターミネーションMLCC対。',
    opticsAndPhysics: [
      '一般的な高誘電率BaTiO₃系（X7R / X5R）MLCCは強誘電体ゆえに逆圧電効果を持ち、基板たわみだけで最大500 μVもの偽信号パルスを発生させ、高ゲインのマイク初段で致命的な雑音になります。',
      'C0G（NP0）常誘電体セラミックは圧電性ゼロ・直流バイアス容量低下ゼロ・THD < −120 dB（1 ppm未満）という理想に近い直線性を発揮します。',
      '大容量が必要な低域カップリング部では、金属フレーム脚（Jリード・ブラケット）＋柔軟銀エポキシ端子でMLCC本体を基板から浮かせることで、基板振動伝達を20 dB以上遮断します。',
    ],
    formula: {
      expression: 'd₃₃(C0G/NP0) ≈ 0 pC/N  vs  X7R強誘電体圧電雑音（~500 μV） → 振動由来ノイズ完全排除！',
      description: '振動しても電圧を出さないC0G素材と「浮かせ金属脚」により、シャッター衝撃が音に化けるのを防ぎます',
    },
    nextGenInnovation:
      '動画機でのメカシャッター／IBIS／ズーム操作中の無音収録には、音響信号路からの高誘電率MLCC完全排除がプロの鉄則です。',
    specs: [
      { label: '誘電体クラス', value: 'Class 1 常誘電体 C0G / NP0（温度係数 0 ± 30 ppm/°C）' },
      { label: '歪み率', value: 'THD < −120 dB（電圧依存性・圧電マイクロフォニクス皆無）' },
      { label: '防振構造', value: 'ソフトターミネーション樹脂層 ＋ 金属Jリード浮かせブラケット' },
      { label: '配置箇所', value: 'マイク初段入力・MICBIAS基準線・高インピーダンス信号路' },
    ],
    diagramType: 'mc_c0g_antimicrophonic_coupling_cap',
  },

  'mc-thinfilm-005pct-gain-network': {
    title: 'MC132. 超低電流雑音 Susumu RG ±0.05% / ±5 ppm/°C 金属薄膜NiCr差動プリアンプ抵抗アレイ',
    subtitle: 'Ultra-Low-Current-Noise Susumu RG ±0.05% / ±5 ppm/°C Thin-Film NiCr Matched Preamp Gain Resistor Array',
    category: '抵抗器の「電子の渋滞ノイズ」を消す精密レーザートリミング薄膜 MC132 — +60 dB増幅でもCMRR > 80 dBを堅持！',
    plainAnalogy:
      '安価な「厚膜チップ抵抗」は金属の粒をガラス糊で固めたザラザラ構造なので、微弱な音声電流が通ると粒の境目で電子が渋滞して「サーッ」という余計な雑音（過剰電流雑音）が出ます。対して Susumu RG シリーズのような「金属薄膜（NiCr）抵抗」は、ナノレベルの滑らかな金属鏡面をレーザーで0.05%精度まで削り出した超高級品！差動ペアのズレを極限までなくすことで、外来ノイズ打ち消し能力（CMRR）を80 dB以上に引き上げます！',
    summary:
      'マイク差動プリアンプの帰還・入力インピーダンス整合に用いる進工業（Susumu）RG系相当の ±0.05%・±5 ppm/°C 無機パッシベーションNiCr金属薄膜抵抗ネットワーク。',
    opticsAndPhysics: [
      '厚膜抵抗の過剰電流雑音指数（CNI）が −10〜0 dB に達するのに対し、スパッタ成膜された均質なNiCr金属薄膜抵抗は −40 dB 以下と桁違いに静かで、−129 dBu EIN級プリアンプの静粛性を支えます。',
      '差動入力抵抗ペアのマッチング誤差 ΔR/R が 0.05% 以内であれば、理論上の同相信号除去比 CMRR ≈ 20 log₁₀(1 / (ΔR/R)) により 66〜80 dB超の高い外来ノイズキャンセル性能を維持できます。',
      '4本を同一アルミナ基板／等温銅ブリッジ近傍へ対称配置することで、カメラ発熱時の温度差によるペア崩れ（±5 ppm/°C）を防ぎます。',
    ],
    formula: {
      expression: 'CMRR_dB ≈ 20 · log₁₀(Gain / (ΔR/R))   （ΔR/R = ±0.05% ＋ CNI < −40 dB → 超静寂・高同相除去！）',
      description: '左右ペアの抵抗値を0.05%の超高精度で揃えることで、配線に乗った外来雑音だけを綺麗に引き算消去します',
    },
    nextGenInnovation:
      '無機パッシベーションによる耐硫化・10,000時間ドリフト ±0.1%未満の長期安定性が、放送・シネマカメラの10年品質を保証します。',
    specs: [
      { label: '代表品種', value: 'Susumu RG1608 / Vishay TNPW 系 NiCr 金属薄膜抵抗' },
      { label: '抵抗許容差', value: '±0.05%（レーザーLカット精密トリミング）' },
      { label: '温度係数（TCR）', value: '±5 ppm/°C（無機パッシベーション・耐硫化構造）' },
      { label: '電流雑音指数', value: 'CNI < −40 dB（厚膜比 30 dB以上の超低 1/f 雑音）' },
    ],
    diagramType: 'mc_thinfilm_005pct_gain_network',
  },

  'mc-capless-hp-chargepump-rail': {
    title: 'MC133. AK4954A / AK4951 反転チャージポンプ負電源（−AVDD）＆ 2.2 μF フライングコンデンサ（キャップレスHPアンプ）',
    subtitle: 'AK4954A / AK4951 Inverting Charge-Pump Negative Rail (-AVDD) & 2.2 uF Flying Cap (True Ground-Centered Capless HP Amp)',
    category: '巨大な出力コンデンサを消して重低音10 Hzまで真っ直ぐ出す魔法 MC133 — カメラの中でマイナス電源を自家発電！',
    plainAnalogy:
      '昔の小型カメラのヘッドホン出力は、プラス電源しかなかったため出力に巨大な220 μFコンデンサが必要で、しかも低音が痩せて電源ON時に「ボツッ！」と音が鳴っていました。ところが Sony や AKM（AK4954A / AK4951）の最新コーデックは、わずか2.2 μFの小さなフライングコンデンサを高速スイッチングして内部で「マイナス電源（−1.8 V）」を自家発電！出力の中心をピッタリ0 V（グランド）に据えることで、巨大コンデンサ無しで10 Hzの重低音までクリアにモニターできるのです！',
    summary:
      'AK4951 / AK4954A 等のカメラ用オーディオコーデックに内蔵される反転型チャージポンプ負電源回路（VEE = −AVDD）および外付け 2.2 μF CFLY / CVEE 低ESRセラミックコンデンサ対。',
    opticsAndPhysics: [
      '単一正電源（+1.8 V）から 2.2 μF フライングコンデンサ（CFLY）へ充電し、極性を反転して負電源コンデンサ（CVEE）へ転送することで、対称な ±1.8 V 両電源レールをチップ直近で生成します。',
      'ヘッドホン出力のDC電位を真の 0 V（Ground-Centered）にできるため、従来必須だった 100〜220 μF 出力DCカット電解コンデンサを完全撤廃（Capless化）できます。',
      '結果として 16 Ω〜32 Ωの低インピーダンス・スタジオモニターイヤホンでも低域カットオフ（HPFロールオフ）が消失し、現場での風切り音や空調ランブルの聴き分け精度が劇的に向上します。',
    ],
    formula: {
      expression: 'V_out_DC = 0.00 V（±AVDD 両電源駆動）  ⇒  f_low_cutoff = DC（出力大型カップリングコンデンサ不要！）',
      description: '小さなコンデンサ1個でマイナス電源を作って出力を0 V中心に保ち、低音痩せも電源ポップ音もゼロにします',
    },
    nextGenInnovation:
      '出力振幅に応じて負電源電圧を自動追従させる Class-G 適応レールと組み合わせ、高音質と省電力を両立しています。',
    specs: [
      { label: '対応コーデック', value: 'AKM AK4954A / AK4951 級 32-QFN カメラ用オーディオコーデック' },
      { label: '外付け部品', value: 'CFLY = 2.2 μF ＋ CVEE = 2.2 μF 低ESRセラミックコンデンサ' },
      { label: '出力方式', value: 'Ground-Centered Capless（0 V DC基準・ポップ雑音レス）' },
      { label: '低域特性', value: '10 Hz〜20 kHz フラット（16 Ω / 32 Ω モニター負荷対応）' },
    ],
    diagramType: 'mc_capless_hp_chargepump_rail',
  },

  'mc-vcom-vref-bandgap-bypass': {
    title: 'MC134. 超低雑音 VREF / VCOM 1.25 V バンドギャップ基準電圧バッファ ＆ 10 μF 低ESRバイパスバンク',
    subtitle: 'Ultra-Low-Noise VREF / VCOM 1.25 V Bandgap Voltage Reference Buffer & 10 uF Low-ESR Bypass Bank',
    category: '24-bit / 32-bit ADCの「音のモノサシ」を微動だにさせない基準台 MC134 — 10 μV揺れただけで録音全体が濁る！',
    plainAnalogy:
      'マイクの音をデジタル数値へ変換するADCにとって、内部の「基準電圧（VREF / VCOM）」は長さを測るための「黄金のモノサシ」です。もしこのモノサシ自体がノイズでブルブル震えていたら、どんなに高級なマイクを繋いでも数値が全部ガタガタに汚れてしまいます！そこで温度が変わっても電圧がピクリとも動かない「バンドギャップ基準回路」を金ガードリングで囲み、すぐ隣に10 μF低ESRタンタル＋0.1 μF C0Gの二重防振タンクを直結しているのです！',
    summary:
      'オーディオADC/DACの絶対変換精度とダイナミックレンジ上限を決定する1.25 V（または AVDD/2）VREF/VCOM 低雑音バンドギャップ基準電圧バッファ、ケルビン・ガードリング、10 μF＋0.1 μF バイパス回路。',
    opticsAndPhysics: [
      '24-bit（1 LSB ≈ 0.1 μV）級ΔΣ ADCでは、VREFノードに乗る数μVのノイズがそのまま出力信号へ乗算変調（モジュレーションノイズ）され、無音時のノイズフロアを悪化させます。',
      '10 μF 低ESR導電性ポリマー・タンタルコンデンサが可聴帯域（20 Hz〜20 kHz）の低インピーダンス基準タンクとして働き、並列の0.1 μF C0GがMHz帯のスイッチドキャパシタサンプリング電流スパイクを吸収します。',
      'VCOM/VREF配線をアナロググランドのケルビンガードリングで囲み、デジタル電流のリターン経路と物理的に分離します。',
    ],
    formula: {
      expression: 'D_out = (V_mic / V_REF) · 2^(24)   （V_REF の揺れ＝そのまま全サンプルの雑音フロアに直結！）',
      description: '音の大きさを測る「基準のモノサシ（VREF）」を超低雑音バッファと大容量タンクで岩のように安定させます',
    },
    nextGenInnovation:
      '32-bit Float デュアルADC世代では、高ゲインADCと低ゲインADCが同一の高精度VREFを共有することで、つなぎ目のゲイン誤差0.01 dB以下を実現しています。',
    specs: [
      { label: '基準電圧', value: 'VREF = 1.25 V（バンドギャップ）／ VCOM = AVDD / 2 バッファ出力' },
      { label: 'バイパス構成', value: '10 μF 低ESRポリマー・タンタル ＋ 0.1 μF C0G 最短直結' },
      { label: '雑音密度', value: '< 10 nV/√Hz（20 Hz〜20 kHz 帯域内ノイズ < 1.5 μVrms）' },
      { label: '配線保護', value: 'アナログGNDケルビン・ガードリング完全包囲' },
    ],
    diagramType: 'mc_vcom_vref_bandgap_bypass',
  },

  'mc-avdd-dvdd-ferrite-powertree': {
    title: 'MC135. 4系統オーディオ電源分離ツリー（AVDD / DVDD / CPVDD / MICBIAS フェライトπブリッジ＆ポリマー電源群）',
    subtitle: '4-Domain Audio Power-Rail Isolation Tree (AVDD / DVDD / CPVDD / MICBIAS Ferrite-Bead Pi Bridges & Bulk Polymer Caps)',
    category: 'デジタル電源の汚れた波をアナログへ1滴も流さない4車線分離道路 MC135 — 基板スリットとフェライトで完全絶縁！',
    plainAnalogy:
      'オーディオコーデックICは1つの小さなチップの中に「繊細なアナログ耳（AVDD）」「高速デジタル計算機（DVDD）」「チャージポンプ電源（CPVDD）」「マイク給電（MICBIAS）」の4つの部屋が同居しています。もし同じ電源パイプで繋ぐと、デジタル部屋の激しい電気の波がアナログ耳へ逆流してしまいます！そこで4系統をそれぞれ専用のフェライトビーズと低ESRコンデンサでπ（パイ）型防波堤に分け、基板にも切り込み堀を掘って完全分離しているのです！',
    summary:
      'SY-1122 メイン基板上のオーディオコーデック周辺における4系統電源ドメイン（AVDD・DVDD・CPVDD・MICBIAS）分離ツリー。高周波フェライトビーズ＋導電性ポリマー・タンタルバルクコンデンサによるπ型フィルタ網。',
    opticsAndPhysics: [
      'DVDD（I²S/TDM入出力バッファ）の高速スイッチング電流を専用フェライトビーズ（例：600 Ω @ 100 MHz）と0.1 μF＋10 μFデカップリングで局所閉ループ化し、AVDDへの回り込みを > 50 dB阻止します。',
      'CPVDD（チャージポンプ切替電流）の200〜500 kHzリプルがアナログΔΣ変調器へ飛び込むのを防ぐため、専用バルクタンクと独立配線で給電します。',
      'AVDDとDVDDの間の銅プレーンに分離堀（スプリット溝）を設け、一点スターグラウンド（MC71）でのみ合流させることで電源帰還ループの共通インピーダンス結合をゼロ化します。',
    ],
    formula: {
      expression: 'PSRR_total = PSRR_IC(85 dB) + IL_ferrite_pi(35 dB) > 120 dB（電池DCDC雑音を完全無音化！）',
      description: '4つの電源ルートを個別のフェライト防波堤と蓄電タンクで隔離し、カメラ内部の電源雑音を無音レベルまで消します',
    },
    nextGenInnovation:
      '高効率スイッチングPMICが主流の最新ミラーレスでも、この4ドメイン分離電源ツリーによりスタジオ専用機並みの静寂ノイズフロアを実現しています。',
    specs: [
      { label: '分離ドメイン', value: 'AVDD（アナログ）/ DVDD（デジタル）/ CPVDD（昇圧）/ MICBIAS' },
      { label: '隔離素子', value: 'オーディオ用低DCRフェライトビーズ（600 Ω @ 100 MHz）× 4' },
      { label: 'バルク容量', value: '低ESR導電性ポリマー・タンタル 10–22 μF ＋ 0.1 μF 並列' },
      { label: '目標PSRR', value: 'システム総合電源除去比 > 110–120 dB（全可聴帯域）' },
    ],
    diagramType: 'mc_avdd_dvdd_ferrite_powertree',
  },

  'mc-c7701-audio-emi-shield-can': {
    title: 'MC136. SY-1122 オーディオ島専用 2ピース C7701洋白（CuNi18Zn20）着脱式EMIファラデーシールド缶',
    subtitle: 'Mainboard SY-1122 Audio-Island Two-Piece C7701 Nickel-Silver (CuNi18Zn20) Snap-On EMI Faraday Shield Can',
    category: 'メイン基板の音声回路だけを銀色の要塞で閉じ込める2ピース缶 MC136 — 修理時はフタだけパチンと外せる本格設計！',
    plainAnalogy:
      'メイン基板の上では、オーディオコーデックやプリアンプのすぐ横にWi-Fi 5GHzアンテナやCFexpress高速バスがひしめいています。そこで音声回路の区画だけをぐるりと囲む「銀色の金属の壁（フレーム）」を基板へハンダ付けし、その上からディンプル突起でパチンと噛み合う「着脱式の金属フタ（リッド）」を被せる2ピース型EMIシールド缶で完全密閉！ハンダ付け性に優れサビない洋白（C7701）素材が60 dB以上の電波鉄壁を作ります！',
    summary:
      'SY-1122 メイン基板のオーディオAFE区画を丸ごと包囲する厚さ0.2 mm 洋白（C7701：CuNi18Zn20）製2ピース着脱式EMIシールドフレーム＋スナップオン・リッド。',
    opticsAndPhysics: [
      '洋白（ニッケルシルバー C7701：銅64%・ニッケル18%・亜鉛18%）はメッキ不要でそのまま良好な鉛フリーはんだ濡れ性を持ち、耐食性・スプリング弾性・GHz帯シールド効果のバランスが最高峰です。',
      'フレームを全周360°グランドパッドへ連続リフローし、上蓋の8箇所ロックディンプルがフレーム壁へ弾性圧接することで、2.4 GHz / 5 GHz Wi-Fi・Bluetooth電波を > 60 dB減衰させます。',
      '2ピース構造のため、工場での音響デバッグやサービス修理時に熱風で基板を痛めずに蓋だけ取り外してプローブ計測が可能です。',
    ],
    formula: {
      expression: 'λ/20 = 6.2 mm @ 2.4 GHz  ⇒  全周ディンプル間隔 < 5 mm でGHzスロット漏れを完全封止！',
      description: '電波の波長より十分細かい間隔で金属のフタをロックし、Wi-Fiやスマホ電波の飛び込みを60 dB以上遮断します',
    },
    nextGenInnovation:
      'さらに内壁へ極薄磁気吸収シートを貼合することで、シールド缶内部のコーデック自身のMCLK高調波共振も抑制します。',
    specs: [
      { label: '材質', value: 'C7701 洋白（CuNi18Zn20 ニッケルシルバー合金、板厚 0.20 mm）' },
      { label: '構造', value: '2ピース方式（基板リフロー固定フレーム ＋ スナップ着脱リッド）' },
      { label: '遮蔽減衰量', value: '> 60 dB（100 MHz〜6 GHz Wi-Fi / 5G / Bluetooth 帯域）' },
      { label: '保護対象', value: 'SY-1122 オーディオコーデック・PGA・VREF・薄膜抵抗島' },
    ],
    diagramType: 'mc_c7701_audio_emi_shield_can',
  },

  'mc-i2s-33ohm-series-termination': {
    title: 'MC137. I²S / TDM8 シリアル音声バス 33 Ω ソース直列ダンピング抵抗アレイ（MCLK / BCLK / LRCLK / SDOUT）',
    subtitle: 'I2S / TDM8 Serial Audio Bus 33-Ohm Source-Series Damping Resistor Array (MCLK / BCLK / LRCLK / SDOUT)',
    category: 'デジタル音声クロックの「リンギング電波漏れ」を鎮める33 Ωのブレーキ MC137 — 24.576 MHz配線の暴走をピタリと整波！',
    plainAnalogy:
      'オーディオチップと画像処理エンジン（BIONZ）を結ぶデジタル音声線（I²S / TDM）には、1秒間に2,457万回もON/OFFする鋭い四角波クロック（MCLK 24.576 MHz）が走っています。そのまま流すと配線の端で電気が跳ね返って「ギザギザの暴れ波（リンギング）」になり、強力なノイズ電波を撒き散らします！そこで送信側の出口直後に「33 Ωの小さな直列抵抗」を4本並べてショックアブソーバー代わりに挟み、波形をシルクのように滑らかに整えているのです！',
    summary:
      'MCLK（24.576 MHz）・BCLK（3.072 / 12.288 MHz）・LRCLK（48 kHz）・SDOUT の4線 I²S/TDM8 バス出力端直近に配置する 33 Ω（22–47 Ω）ソース直列終端ダンピング抵抗アレイ。',
    opticsAndPhysics: [
      '最新CMOSドライバーの出力立ち上がり時間 t_r は1〜2 nsと極めて急峻なため、数cmの配線でも伝送線路反射によるオーバーシュートと数百MHzの高調波放射が発生します。',
      'ドライバー出力インピーダンス R_out（約15–20 Ω）＋直列終端抵抗 R_s（33 Ω）≈ 50 Ω を基板配線特性インピーダンス Z₀（50 Ω）へ整合させることで、反射波を送信側で完全吸収します。',
      'さらに各クロック線の間にコプレーナ・グランドガード配線を並走させ、隣接するマイクアナログ入力やWi-Fi/GNSS受信部へのクロック高調波結合を10〜15 dB低減します。',
    ],
    formula: {
      expression: 'R_driver (~17 Ω) + R_series (33 Ω) = Z₀ (50 Ω)   ⇒   反射係数 Γ = (Z_s − Z₀)/(Z_s + Z₀) ≈ 0',
      description: '送信口に33 Ωの抵抗を直列に入れて配線の抵抗値50 Ωにピッタリ合わせ、電気の跳ね返りと電波ノイズを消します',
    },
    nextGenInnovation:
      '高チャンネル化（TDM8 / 96 kHz）でBCLKが24.576 MHzへ高速化する2026年カメラ基板では、ソース直列終端と等長配線がジッター最小化の必須条件です。',
    specs: [
      { label: '終端抵抗値', value: '33 Ω ±1%（0402 / 0201 チップ抵抗 × 4線 または 4連アレイ）' },
      { label: '対象信号', value: 'MCLK（24.576 MHz）/ BCLK / LRCLK（WS）/ SDOUT（SDATA）' },
      { label: '整合目標', value: 'R_driver + R_series ≈ 50 Ω マイクロストリップ特性インピーダンス' },
      { label: 'EMI効果', value: 'クロック高調波放射 10–15 dB低減 ＋ ジッター（THD+N悪化）抑制' },
    ],
    diagramType: 'mc_i2s_33ohm_series_termination',
  },

  'mc-dlw21-jack-cm-choke': {
    title: 'MC138. 3.5 mm外部マイク端子直結 Murata DLW21 巻線コモンモードRFチョーク（120–180 Ω @ 100 MHz）',
    subtitle: '3.5 mm External Mic Jack Murata DLW21 Wirewound Common-Mode RF Choke (120–180 Ohm @ 100 MHz)',
    category: '1.5 mのピンマイクケーブルが「スマホ電波アンテナ」になるのを防ぐ双子コイル MC138 — 声だけ通してLTE/5G雑音を門前払い！',
    plainAnalogy:
      '外部ピンマイクの長い1.5 mケーブルは、じつは携帯電話のLTE/5G電波やWi-Fiを受信するのに絶好の「アンテナ」になってしまいます。そこで3.5 mmジャックのすぐ裏に配置されるのが、村田製作所「DLW21」のような極小の巻線コモンモードチョーク！2本の銅線をフェライトの芯に同じ向きで仲良く巻き付けることで、反対向きに流れる「声の信号」はスルーさせ、同じ向きに飛び込んでくる「スマホ電波ノイズ」だけを強力な磁力の壁でブロックするのです！',
    summary:
      '外部3.5 mm TRSマイク入力ライン直後に実装される Murata DLW21HN121SQ2L / DLW21HN181SQ2L 級 2.0×1.2 mm バイファイラ巻線フェライト・コモンモードチョークコイル。',
    opticsAndPhysics: [
      '差動（ディファレンシャル）オーディオ信号は2線間で互いに磁束を打ち消し合うためインダクタンスほぼゼロで無歪み通過し、DCRもわずか0.3–0.4 Ωと超低損失です。',
      '一方、長い外部ケーブルが拾ったFM/VHF/LTE/5G（700 MHz〜3.5 GHz）の同相（コモンモード）RF電流に対しては、フェライト磁芯の磁束が足し合わさり 120–180 Ω @ 100 MHz 以上の高インピーダンス遮蔽壁となります。',
      'これにより、スマホをポケットに入れた演者のピンマイク収録で起きやすい「ジジジ…ブツブツ（TDMA 217 Hz復調雑音）」を根元で断ち切ります。',
    ],
    formula: {
      expression: 'Z_diff(20 Hz–20 kHz) ≈ 0.35 Ω（無劣化通過）  vs  Z_cm(100 MHz–2 GHz) ≥ 180 Ω（RF同相遮断！）',
      description: '2本を仲良く巻いたフェライトコイルが「声の電気」は素通しし、「ケーブルが拾ったスマホ電波」だけを跳ね返します',
    },
    nextGenInnovation:
      '5Gミリ波・Sub6基地局が林立する都市ロケ環境において、外部3.5 mmジャック直近の巻線コモンモードチョーク＋C0G RFシャントはプロ動画機の必須防御壁です。',
    specs: [
      { label: '代表品種', value: 'Murata DLW21HN121SQ2L / DLW21HN181SQ2L（2012サイズ）' },
      { label: '外形寸法', value: '2.0 mm × 1.2 mm × 0.9–1.2 mm（バイファイラ巻線フェライト）' },
      { label: 'コモンモード抵抗', value: '120–180 Ω @ 100 MHz（定格 50 V / DCR ≤ 0.38 Ω）' },
      { label: '防止ノイズ', value: '外部マイクケーブル経由のLTE/5G/Wi-Fi/GSM 217 Hz復調雑音' },
    ],
    diagramType: 'mc_dlw21_jack_cm_choke',
  },

  'mc-mic-line-attenuator-cmos-mux': {
    title: 'MC139. ハードウェア 0 / −10 / −20 dB Uパッド減衰器 ＆ 2.2 kΩマイク / 47 kΩライン切替低オン抵抗CMOSスイッチ',
    subtitle: 'Hardware 0 / -10 / -20 dB U-Pad Attenuator & 2.2 kOhm Mic / 47 kOhm Line Low-Ron CMOS Switch Matrix',
    category: '大音量のミキサー出力やライブ爆音も安全に受け止める「音の減速ギア」 MC139 — 入力初段の手前で確実に保護！',
    plainAnalogy:
      'カメラの音声入力には、ささやき声のように極小な「マイク信号（数mV）」だけでなく、会場PAミキサーからの巨大な「ライン出力（数V＝マイクの約1,000倍！）」が繋がれることもあります。デジタル音量で下げても、入り口のアナログ回路が先にパンクしたら音割れは直りません！そこで入り口直前に高精度抵抗の「Uパッド減衰器（0/−10/−20 dB）」と超低歪みCMOSスイッチを置き、信号の大きさに合わせて瞬時にインピーダンス（2.2 kΩ ↔ 47 kΩ）と減衰量を切り替えるのです！',
    summary:
      'マイクレベル入力（約−50 dBV / 2.2 kΩ）とプロ用ライン入力（+4 dBu / 47 kΩ）および 0/−10/−20 dB アッテネーターを無歪み切替する平衡Uパッド抵抗網＋低オン抵抗（R_on < 2 Ω）CMOSアナログスイッチマトリクス。',
    opticsAndPhysics: [
      'アナログプリアンプの入力クリップ（過負荷飽和）は後段のデジタル処理では絶対に復元できないため、初段オペアンプの手前に物理的なパッシブ抵抗アッテネーター（Uパッド）を配置することが不可欠です。',
      '超低オン抵抗・低平坦抵抗変化（ΔR_on < 0.3 Ω）の最新オーディオ用CMOSアナログスイッチ（TMUX1119級）により、接点歪み THD < −110 dB のままマイコン制御で瞬時切替を行います。',
      '同時にライン選択時はプラグインパワー（2.8 V）や+48 Vファンタム電源をハードウェア連動で自動遮断し、外部ミキサー機器の故障を防止します。',
    ],
    formula: {
      expression: 'Att_dB = 20 · log₁₀(R_shunt / (2 R_series + R_shunt))  ∈ {0, −10, −20 dB}（アナログ初段クリップ防止！）',
      description: '大きすぎる音がアンプに入る前に精密抵抗で1/3や1/10に優しく減速し、マイクとライン入力を安全に両立します',
    },
    nextGenInnovation:
      'ECM-M1 や XLR-K3M / XLR-A4 の物理ATTスイッチ（0/10/20 dB）とカメラ内自動レンジ切替の双方を支える中核フロントエンド回路です。',
    specs: [
      { label: '減衰ステップ', value: '0 dB（スルー）／ −10 dB ／ −20 dB 平衡Uパッド抵抗網' },
      { label: '入力インピーダンス', value: 'MIC：2.2 kΩ（PIP対応） ／ LINE：47 kΩ（+4 dBu対応）' },
      { label: '切替素子', value: '低オン抵抗 CMOSアナログスイッチ（R_on < 2 Ω、THD < −110 dB）' },
      { label: '保護連動', value: 'LINE選択時の +2.8 V PIP / +48 V ファンタム自動遮断インターロック' },
    ],
    diagramType: 'mc_mic_line_attenuator_cmos_mux',
  },

  'mc-05db-r2r-volume-headphone-stage': {
    title: 'MC140. 0.5 dBステップ デジタル制御アナログ抵抗ラダー音量減衰器 ＆ Class-G適応電源ヘッドホン出力段',
    subtitle: '0.5 dB-Step Digitally Controlled Analog Resistor-Ladder Volume Attenuator & Class-G Headphone Output Stage',
    category: '音量を回しても「プチプチ」鳴らないゼロクロス0.5 dB階段 MC140 — Class-G省電力で長時間モニターも安心！',
    plainAnalogy:
      '録画中にヘッドホンの音量を上げ下げしたとき、波形の途中で急に音量が変わると「プチッ、プチッ」と嫌なジッパーノイズが出ます。そこで最新オーディオコーデックは、精密な抵抗のはしご（R-2Rラダー）を0.5 dB刻みの滑らかな階段に組み、音声波形がちょうど「0 Vの水平線」を横切る一瞬（ゼロクロス）だけを狙ってステップを切り替えます！さらに出力段は音の大きさに合わせて電源電圧を自動節約するClass-G方式でバッテリーも長持ちさせます！',
    summary:
      'ゼロクロス検出付き0.5 dB刻み対数アナログ抵抗ラダー減衰器（PGA / モニターボリューム）と、信号包絡線に応じて電源レールを段階切替する高効率Class-Gヘッドホンパワーアンプ出力段。',
    opticsAndPhysics: [
      'アナログ領域で対数重み付け抵抗ラダーを0.5 dBステップ切替することで、デジタル減衰時に起こりがちなビット落ち（量子化ノイズ上昇）を回避し、小音量モニター時でも高いS/N比を保ちます。',
      'ゼロクロス検出器（ZCD）が波形が0 Vを通過する瞬間（最大タイムアウト約20 ms）に同期してスイッチを切り替えるため、急な音量操作でもジッパーノイズ・クリック音が皆無です。',
      'Class-Gヘッドホンアンプは小〜中音量時は低い電源レール（例：±0.9 V）で駆動し、大音量ピーク時のみ高レール（±1.8 V）へ瞬時昇圧することで、Class-AB並みの低歪み（THD+N < 0.01%）と約50%の省電力を両立します。',
    ],
    formula: {
      expression: 'ΔG = 0.5 dB/step @ V_audio(t) = 0（ゼロクロス切替）＋ Class-G 動的レール効率 η 向上',
      description: '波がちょうどゼロを横切る瞬間に0.5 dBずつ階段を切り替えるため、音量調整しても雑音が一切鳴りません',
    },
    nextGenInnovation:
      'カメラのバッテリー消費がシビアな4K60長回し撮影で、高インピーダンスなスタジオモニターヘッドホンを一日中駆動するための要となる省電力出力技術です。',
    specs: [
      { label: '減衰分解能', value: '0.5 dB 精密対数ステップ（R-2Rアナログ抵抗ラダー方式）' },
      { label: 'ノイズ対策', value: 'ハードウェア・ゼロクロス検出（ZCD）ジッパー雑音ゼロ切替' },
      { label: '出力方式', value: 'Class-G 適応両電源レール（±0.9 V / ±1.8 V 自動切替）' },
      { label: '歪み特性', value: 'THD+N < 0.01%（32 Ω負荷、1 kHz、10 mW 出力時）' },
    ],
    diagramType: 'mc_05db_r2r_volume_headphone_stage',
  },

  // =========================================================================
  // GROUP 4: MC141–MC150 — PRO ECOSYSTEM (ECM-M1, XLR-K3M/A4, ECM-W3, HDMI/UAC)
  // =========================================================================

  'mc-ecmm1-4cap-diamond-array': {
    title: 'MC141. Sony ECM-M1 4カプセル・ダイヤモンド配列バックエレクトレット ＆ 8モード音響干渉管アレイ',
    subtitle: 'Sony ECM-M1 4-Capsule Back-Electret Diamond Array & Waveguide Beamforming Architecture',
    category: 'たった6.4 cmに4個のマイクをひし形配置した世界初の8指向性頭脳 MC141 — 前も後ろもステレオも1台で自在に狙い撃ち！',
    plainAnalogy:
      '普通、超鋭指向性（ショットガン）マイクは長い筒が必要で、ステレオ録音には別のマイクへ付け替える必要がありました。ところが Sony ECM-M1 は、全長わずか64.4 mmの超コンパクトな頭に「前・後・左・右のひし形（ダイヤモンド配列）」で4個の高性能バックエレクトレットカプセルを配置！4個に届く音のわずかな時間差をリアルタイム計算することで、1本のマイクが「超鋭指向・単一・全指向・後方・前後同時・前後分離・ステレオ・ウルトラ鋭指向」の8役を完璧にこなすのです！',
    summary:
      'Sony ECM-M1（40 Hz〜20 kHz・固有雑音14 dB SPL以下・ダイナミックレンジ106 dB以上・重量65 g）の核心である4カプセル・ダイヤモンド幾何配置と適応デジタルビームフォーミング音響構造。',
    opticsAndPhysics: [
      '前後2カプセルと左右2カプセルを直交ダイヤモンド（ひし形）配置とすることで、前後の軸上シャープビーム（1次・2次微分ビームフォーミング）と左右の空間ステレオ位相差を1つの小型アレイから同時に合成できます。',
      '超指向（Ultra-Directional）モードでは、正面30°以内の目的話者以外からの側方・後方環境音をリアルタイム適応ヌル形成で強烈に抑圧します。',
      '前後分離（Front+Rear Separate）モードでは、カメラ前の演者をCH1、カメラ後ろの撮影者の声をCH2へ独立収録しつつ、CH3/CH4へ全指向バックアップ（MC104）を同時記録可能です。',
    ],
    formula: {
      expression: 'y(t) = Σ_{k=1..4} w_k(θ, ω) · x_k(t − τ_k)   （4カプセルひし形位相合成 → 8指向性モード！）',
      description: 'ひし形に並べた4つの耳に届く時間差を自在に足し引きして、音のスポットライトの形を8通りに変形させます',
    },
    nextGenInnovation:
      '全長わずか64.4 mmで従来の大型ガンマイクに迫る鋭指向性を達成し、ジンバル・Vlog・取材撮影の標準スタイルを塗り替えました。',
    specs: [
      { label: '実機モデル', value: 'Sony ECM-M1（全長 64.4 mm × 幅 40 mm × 高 72.2 mm / 65 g）' },
      { label: 'カプセル配置', value: 'バックエレクトレット・コンデンサ 4基 ダイヤモンド配列' },
      { label: '音響性能', value: '40 Hz–20 kHz / 固有雑音 ≤ 14 dB SPL / 最大入力 ≥ 120 dB SPL' },
      { label: '収録モード', value: '8種（超鋭・単一・全指向・後・前後・前後分離・ステレオ・ウルトラ）' },
    ],
    diagramType: 'mc_ecmm1_4cap_diamond_array',
  },

  'mc-ecmm1-8mode-dial-switches': {
    title: 'MC142. Sony ECM-M1 ロック機構付き8モード指向性ロータリーダイヤル ＆ ATT / NC・LC / DIG・ANA 物理スイッチ群',
    subtitle: 'Sony ECM-M1 Lockable 8-Mode Rotary Directivity Dial + ATT (0/10/20 dB) / NC-LC / DIGITAL-ANALOG Switch Bank',
    category: 'カメラのメニューを開かずに親指1本で音を変える背面操作盤 MC142 — 中央ロックボタンで誤操作もゼロ！',
    plainAnalogy:
      '撮影現場で急にインタビューが始まったり爆音の救急車が近づいたとき、カメラの液晶メニューを何階層も潜っていたら決定的瞬間を逃します！ECM-M1 の背面には、中央のロックボタンを押しながらカチカチ回す「8モード指向性ロータリーダイヤル」と、減衰量（0/10/20 dB）・ノイズカット/ローカット・デジタル/アナログ切替の防塵防滴スライドスイッチ群が集約されていて、ファインダーから目を離さず瞬時に音響設定を切り替えられるのです！',
    summary:
      'Sony ECM-M1 背面に集約されたセンターロック付き8ポジション光学／機械式ロータリーエンコーダーダイヤル、および 0/10/20 dB ATT・NC/LC/OFF フィルタ・DIGITAL/ANALOG 切替防滴スライドスイッチ群。',
    opticsAndPhysics: [
      '中央のプッシュロック解除機構付き8接点ロータリーダイヤルにより、バッグ出し入れ時や移動中の不意な指向性モード切り替わり（背面モード誤設定など）を物理的に防止します。',
      'NC（ノイズカット：定常背景雑音DSP除去）／LC（ローカット：風切り・空調低域遮断）／OFF の3段スライドスイッチが、録音段階でのリアルタイムDSPフィルタをゼロ遅延で制御します。',
      'DIGITAL / ANALOG 物理切替スイッチにより、デジタルMIシュー対応の α7 IV 等では劣化ゼロ伝送を、旧型アナログMIシュー機でも下位互換動作を可能にします。',
    ],
    formula: {
      expression: '8-Pos Rotary Encoder（Lock付）＋ 3×3-Pos Sealed Slide Switches → 現場ワンアクション音響制御',
      description: '中央ロック付きダイヤルと防滴スライドスイッチで、液晶メニューを開かず一瞬で音の狙い方を切り替えられます',
    },
    nextGenInnovation:
      '現場の撮影ミス（意図しないモードズレや過大入力クリップ）をハードウェアUIとロック機構で徹底予防するプロ仕様エルゴノミクスです。',
    specs: [
      { label: '指向性ダイヤル', value: '8モード切替ロータリーダイヤル（中央誤操作防止ロックボタン付）' },
      { label: 'アッテネーター', value: '物理3段スライドスイッチ（0 dB / 10 dB / 20 dB）' },
      { label: 'フィルタ切替', value: 'NC（デジタルノイズカット）/ LC（ローカット）/ OFF' },
      { label: 'インターフェース', value: 'DIGITAL / ANALOG 物理切替スイッチ ＋ 防塵防滴パッキン' },
    ],
    diagramType: 'mc_ecmm1_8mode_dial_switches',
  },

  'mc-ecmm1-shock-suspension-cradle': {
    title: 'MC143. Sony ECM-M1 / ECM-B1M 内蔵2軸シリコーン・ショックマウント防振サスペンション機構',
    subtitle: 'Sony ECM-M1 / ECM-B1M Internal Dual-Axis Silicone Shock-Mount Suspension Stalk (Anti-Vibration Cradle)',
    category: '外付けゴムバンド不要でレンズの駆動音を消す「内蔵サスペンション首」 MC143 — ケーブルレス＋浮遊構造の極み！',
    plainAnalogy:
      '従来の外付けガンマイクは、カメラのズーム音や手のゴソゴソ音が伝わらないように、クモの巣みたいな巨大なゴムバンド（ショックマウント）で宙吊りにする必要がありました。でも Sony ECM-M1 / ECM-B1M は、MIシューのすぐ上の「首の内部」に4本の柔らかいシリコーン防振ダンパーと弛ませた極細フレキ配線を内蔵！外見はスッキリ一体型なのに、中身は車のサスペンションのようにマイク頭部がフワッと宙に浮いて低周波振動を吸収しているのです！',
    summary:
      'Sony ECM-B1M / ECM-M1 のMIシュー接合ネック内部に組み込まれた特許系ショック・振動抑制機構。4軸傾斜エラストマー・ダンパーストラットと無張力S字ループFPCにより、ケーブルレスと高防振性能を両立します。',
    opticsAndPhysics: [
      'MIシュー固定ベースと4カプセル／8カプセル収納ヘッドを剛結せず、低硬度シリコーンエラストマー（Shore 30A–40A）の4本傾斜ダンパーでフローティング支持し、固有振動数 f₀ を可聴低域下限付近（~20–35 Hz）へ設定します。',
      '機械的振動伝達率 T(f) は f > √2·f₀ の帯域で急峻に低下し、レンズのステッピング／リニアAFモーター振動・手ブレ補正・ズームリング操作のハンドリング雑音を大きく減衰します。',
      'さらにケーブルを一切使わないMIシュー直結構造のため、3.5 mmケーブルがボディに擦れて生じるタッチノイズ自体が物理的に存在しません。',
    ],
    formula: {
      expression: 'T(f) = 1 / √((1 − (f/f₀)²)² + (2ζ f/f₀)²)   （f₀ ≈ 25 Hz 設計で 60 Hz以上の操作振動を大幅遮断！）',
      description: '首の内部に4本の柔らかシリコーン脚とたるませた配線を隠し、外付けショックマウント並みの防振をスマートに実現します',
    },
    nextGenInnovation:
      'ジンバル搭載時にも重心が低く引っかかりのないスマート防振構造として、Sony デジタルMIシューマイク群の象徴的メカとなっています。',
    specs: [
      { label: '防振機構', value: 'ネック内蔵 4点傾斜シリコーン・フローティングサスペンション' },
      { label: 'エラストマー', value: '低反発・高減衰シリコーンダンパー（Shore 30A–40A）' },
      { label: '内部配線', value: '無張力S字スラック・ポリイミドFPC（機械剛性バイパスゼロ）' },
      { label: '抑制対象', value: 'ハンドリング雑音・AF/ズーム駆動振動・ケーブル接触雑音' },
    ],
    diagramType: 'mc_ecmm1_shock_suspension_cradle',
  },

  'mc-xlrk3m-phantom48v-681k-pair': {
    title: 'MC144. Sony XLR-K3M / XLR-A4 IEC 61938 ＋48 V 絶縁昇圧電源 ＆ ±0.1%整合 6.81 kΩ ファンタム抵抗対・ロックXLR端子',
    subtitle: 'Sony XLR-K3M / XLR-A4 IEC 61938 +48 V Boost DC-DC & ±0.1% Matched 6.81 kOhm Phantom Pair + Locking XLR/TRS Jack',
    category: 'プロ用コンデンサーマイクへ「+48 V」を安全に送る国際規格回路 MC144 — 2本の6.81 kΩ抵抗を0.1%精度で揃える理由！',
    plainAnalogy:
      '映画やテレビの現場で使う本格的なXLRコンデンサーマイクは「+48 V（ファンタム電源）」という高い電圧が必要です。Sony XLR-K3M や最新 XLR-A4 は、カメラのMIシューから貰ったたった5 Vの電気を絶縁昇圧コイルで静かに+48 Vへ引き上げ、国際規格 IEC 61938 で定められた「ぴったり6.81 kΩ（誤差±0.1%！）」の双子抵抗を通して2番ピンと3番ピンへ均等に供給！もしケーブルがショートしても電流を14.1 mA以下に制限してカメラもマイクも守り抜きます！',
    summary:
      'IEC 61938（P48）規格準拠の +48 V ±4 V 絶縁DC-DCブースト電源、±0.1%高精度マッチング 6.81 kΩ 薄膜ファンタム給電抵抗対、63 V耐圧DC阻止フィルムコンデンサ、およびNeutrik系3ピンロック付XLR/TRSコンボジャック。',
    opticsAndPhysics: [
      'IEC 61938 規格は P48 ファンタム電源を「48 V ± 4 V、ホット（Pin 2）およびコールド（Pin 3）へそれぞれ 6.81 kΩ を介して印加（最大短絡電流 48 V / 3.405 kΩ ≈ 14.1 mA）」と厳密に規定しています。',
      'Pin 2側とPin 3側の 6.81 kΩ 抵抗のペア誤差が0.1%を超えると、+48 V電源ラインのリプルが差動信号へ変換されてハムノイズやCMRR悪化を招くため、±0.1%精密薄膜抵抗対が不可欠です。',
      'XLR-K3M / XLR-A4 は電池不要でMIシューからの電源だけで2系統の+48 Vコンデンサーマイク＋3.5 mm PIPマイク（計最大4ch）を安定駆動します。',
    ],
    formula: {
      expression: 'I_short_max = 48 V / (6.81 kΩ ∥ 6.81 kΩ) = 14.1 mA   （IEC 61938 P48 安全電流制限＆高CMRR給電！）',
      description: 'カメラの5 Vから+48 Vを作り、0.1%精度の6.81 kΩ双子抵抗で左右均等に送ることでノイズも短絡事故も防ぎます',
    },
    nextGenInnovation:
      '業務用XLRキャノン端子とカメラMIシューをケーブルレス統合したことで、ワンマンシネマ撮影の音質を放送局レベルへ引き上げました。',
    specs: [
      { label: '準拠規格', value: 'IEC 61938 P48（+48 V ± 4 V、短絡保護最大 14.1 mA）' },
      { label: '給電抵抗', value: '6.81 kΩ ±0.1% 精密整合 薄膜抵抗ペア（Pin 2 / Pin 3 平衡給電）' },
      { label: '入力端子', value: 'ロック機構付 3ピン XLR / 6.35 mm TRS コンボジャック × 2' },
      { label: '対応機器', value: 'Sony XLR-K3M（24-bit/48 kHz）／ XLR-A4（32-bit Float/96 kHz）' },
    ],
    diagramType: 'mc_xlrk3m_phantom48v_681k_pair',
  },

  'mc-xlra4-2026-32bit-96k-bridge': {
    title: 'MC145. 【2026最新】Sony XLR-A4 4ch 32-bit Float / 96 kHz デュアルADC・デジタルMIシューアダプター',
    subtitle: '2026 Sony XLR-A4 4-Channel 32-Bit Float / 96 kHz Dual-ADC Digital MI-Shoe Adapter & USB-C Direct Bridge',
    category: 'α7 V世代の頂点「音割れ絶対ゼロ × ハイレゾ96 kHz × 4ch」 MC145 — ゲイン調整ミスを歴史の過去にする次世代XLR！',
    plainAnalogy:
      'これまでのカメラ録音では、急に演者が叫ぶと音が割れるため、現場で常に録音レベルのツマミを睨み続ける必要がありました。2026年世代の最新デジタルXLRアダプター「Sony XLR-A4」は、低ゲイン用と高ゲイン用の2つのADCを同時稼働させて「32-bit Float / 96 kHz ハイレゾ」で4chダイレクト収録！ささやき声からジェット機の轟音まで一切音割れせず、しかも低重心ボディ＋60 cm延長ケーブル＋USB-C直結まで備えた夢のプロ機材です！',
    summary:
      'α7 V 以降対応の低背・リグ対応 Sony XLR-A4 デジタルXLRアダプター（W 113.2×H 99.8×D 80.0 mm / 198 g）。デュアルADC 32-bit Float / 96 kHz 4ch MIシューデジタル直結とUSB-C PC直接録音を搭載。',
    opticsAndPhysics: [
      '小信号用の高ゲインADCと大音量用の低ゲインADCを並列サンプリングしてIEEE 754 32-bit浮動小数点（理論DR > 1,500 dB、実効アナログDR ~136 dB）へリアルタイム合成し、現場でのクリップ破綻を完全に解消します。',
      'サンプリング周波数を従来の48 kHzから倍の96 kHzへ引き上げたことで、可聴域上限20 kHz付近のアンチエイリアスフィルタ位相歪みを追放し、スローモーション編集時の音響解像度も確保します。',
      'カメラケージやジンバル運用を見据えた低重心ロープロファイル筐体に加え、60 cm MIシュー延長ケーブルとUSB-Cインターフェース機能まで内蔵しています。',
    ],
    formula: {
      expression: '4ch × 32-bit Float × 96 kHz = 12.288 Mbps（Dual-ADC 合成 → ゲイン失敗ゼロ＆96 kHzハイレゾ！）',
      description: '小声用と爆音用の2つのADCを同時録音して32-bit浮動小数点で合体し、96 kHzの超高精細でカメラへ直結します',
    },
    nextGenInnovation:
      '外付けフィールドレコーダー（Zoom F3/MixPre等）と同期タイムコードの手間を丸ごと不要にする、2026年カメラ音声ワークフローの到達点です。',
    specs: [
      { label: '実機モデル', value: 'Sony XLR-A4（113.2 × 99.8 × 80.0 mm / 約198 g、α7 V〜対応）' },
      { label: '収録形式', value: '32-bit Float / 96 kHz デュアルADC 4ch デジタルMIシュー直結' },
      { label: '入力構成', value: 'XLR/TRS（+48V）× 2 ＋ 3.5 mm ステレオPIP × 1 ＋ USB-C出力' },
      { label: '運用設計', value: 'リグ・ケージ対応ロープロファイル ＋ 60 cm延長ケーブル付属' },
    ],
    diagramType: 'mc_xlra4_2026_32bit_96k_bridge',
  },

  'mc-ecmw3-bt53-lc3plus-rf': {
    title: 'MC146. Sony ECM-W3 Bluetooth 5.3 LC3plus 低遅延2chデジタルワイヤレスRF・セラミックアンテナ＆SAWフィルタ',
    subtitle: 'Sony ECM-W3 Bluetooth 5.3 LC3plus Digital Wireless RF Module, Ceramic Chip Antenna & 2.4 GHz SAW Filter',
    category: '150 m先の2人の声をデジタル劣化ゼロでMIシューへ届ける最新無線 MC146 — 省電力・低遅延LC3plusとSAW電波選別！',
    plainAnalogy:
      'カメラから遠く離れた演者の胸元に付けるワイヤレスピンマイク（Sony ECM-W3）は、従来のアナログFM無線と違って「Bluetooth 5.3 ＋ LC3plus」という超低遅延・高音質デジタル無線を使います！レシーバー内部では、極小のセラミックチップアンテナが150 m先からの微弱な2.4 GHz電波をキャッチし、弾性表面波（SAW）フィルタで隣のWi-Fi混信を切り落として、そのままMIシューのデジタル接点へ劣化ゼロで流し込むのです！',
    summary:
      'Sony ECM-W3（2chクリップオン送信機＋MIシュー直結受信機、見通し最大150 m、20 Hz–20 kHz）のワイヤレス音声RFフロントエンド。Bluetooth 5.3 LC3plus コーデック、2.4 GHz積層セラミックアンテナ、SAW帯域通過フィルタで構成。',
    opticsAndPhysics: [
      'ETSI標準の次世代オーディオコーデック LC3plus（Low Complexity Communication Codec Plus）により、従来のSBC/AACより圧倒的に低い遅延（数ms〜10 ms級）と高いパケットエラー耐性、最大6時間駆動の省電力を両立します。',
      '2.400〜2.4835 GHz 帯域だけを通過させる圧電結晶 SAW（Surface Acoustic Wave）バンドパスフィルタが、カメラ自身の5 GHz Wi-Fiや携帯電話帯域の強大な帯域外妨害波を > 35 dB遮断します。',
      '送信機側に高SNRデジタルMEMSマイク＋NC/LCフィルタ＋0/10/20 dBアッテネーターを搭載し、受信機からカメラへもMIシューデジタル直結することでA/D・D/A再変換劣化を完全に排除します。',
    ],
    formula: {
      expression: 'Bluetooth 5.3 LE + LC3plus（2.4 GHz / 最大150 m）→ MIシュー直接デジタル入力（再変換ゼロ！）',
      description: '150 m先の声も高音質・低遅延デジタル無線で受け取り、SAWフィルタで雑電波を振るい落としてカメラへ直結します',
    },
    nextGenInnovation:
      '受信機にUSB-Cオーディオ出力と3.5 mm出力も併載し、カメラからPC・スマホまで1台でシームレスに使える2026年標準ワイヤレス設計です。',
    specs: [
      { label: '実機モデル', value: 'Sony ECM-W3（送信機 17 g × 2、受信機 25 g、充電ケース付）' },
      { label: '無線方式', value: 'Bluetooth 5.3 ＋ LC3plus 低遅延・高音質デジタル音声コーデック' },
      { label: '最大通信距離', value: '見通し最大 150 m（492 ft）／ 20 Hz–20 kHz 2ch同時収録' },
      { label: 'RFフロントエンド', value: '2.4 GHz 積層セラミックチップアンテナ ＋ 圧電SAWフィルタ' },
    ],
    diagramType: 'mc_ecmw3_bt53_lc3plus_rf',
  },

  'mc-hdmi-acr-n6144-lpcm-tx': {
    title: 'MC147. フルサイズHDMI Type-A 4ch 24-bit/48 kHz LPCMパケタイザ ＆ ACR（N=6144 / CTS）音声クロック再生エンジン',
    subtitle: 'HDMI Type-A 4-Channel 24-Bit/48 kHz LPCM Audio Packetizer & ACR (N = 6144 / CTS) Clock Regeneration Engine',
    category: '4K60映像の隙間に4ch無圧縮音声をピッタリ同期埋め込み MC147 — N=6144とCTSの暗号で外部レコーダーと1サンプルもズレない！',
    plainAnalogy:
      'α7 IV のフルサイズHDMI端子から外部モニターレコーダー（Atomos Ninja等）へ4K60映像を送るとき、じつはHDMIケーブルの中に専用の音声線はありません！映像フレームの「見えない余白時間（ブランキング期間）」に4ch 24-bit無圧縮音声の小さな小包（データアイランド）を滑り込ませ、さらに「N = 6144」と「CTS」という2つの精密な時計合わせ数値（ACRパケット）を毎秒1,000回送ることで、映像と音声のリップシンクを1サンプルも狂わせずに再現するのです！',
    summary:
      'Sony α7 IV のフルサイズHDMI Type-A 4ch LPCM出力を支えるデータアイランド・パケタイザおよび HDMI仕様準拠 ACR（Audio Clock Regeneration）20-bit N / CTS パラメータ生成エンジン。',
    opticsAndPhysics: [
      'HDMI仕様では 48 kHz サンプリング音声に対し標準分周値 N = 6,144（128 × f_s / N = 6.144 MHz / 6144 = 1.000 kHz）を設定し、この 1 ms 期間にカウントされたTMDSピクセルクロック数（例：148.5 MHz なら CTS = 148,500）を20-bit ACRパケットとして送信します。',
      '受信側レコーダーは f_audio = (f_TMDS × N) / (128 × CTS) の式でカメラ内部の水晶精度そのままの 48 kHz オーディオクロックをPLL再生でき、長回し収録でも音ズレ（ドリフト）がゼロになります。',
      'α7 IV ではメニュー「HDMI出力設定 → 4chオーディオ出力」から CH1/2・CH3/4 の組み合わせ指定や 4ch 24-bit LPCM 埋め込み出力に対応しています。',
    ],
    formula: {
      expression: '128 · f_s = f_TMDS · (N / CTS)   （f_s = 48 kHz → N = 6144, CTS = 148,500 @ 148.5 MHz）',
      description: '映像クロック数（CTS）と標準値（N=6144）を一緒に送ることで、外部レコーダー側でもカメラと寸分違わぬ音時計を再現します',
    },
    nextGenInnovation:
      'フルサイズHDMI Type-Aの頑丈な物理コネクタと4ch 24-bit LPCM同期出力の組み合わせは、外部ProRes RAW収録現場の必須機能です。',
    specs: [
      { label: '出力端子', value: 'フルサイズ HDMI Type-A（19ピン金めっき・高耐久シェル）' },
      { label: '音声フォーマット', value: '無圧縮 LPCM 2ch / 4ch（24-bit / 48 kHz、CH選択出力対応）' },
      { label: 'クロック同期', value: 'HDMI ACR パケット（20-bit N = 6144 / CTS 自動計測送信）' },
      { label: '伝送方式', value: '映像ブランキング区間 Data Island パケット多重化' },
    ],
    diagramType: 'mc_hdmi_acr_n6144_lpcm_tx',
  },

  'mc-uac2-usb-c-async-bridge': {
    title: 'MC148. USB-C UAC 2.0 非同期アイソクロナス音声配信ブリッジ ＆ 明示的フィードバック同期エンジン',
    subtitle: 'USB-C UAC 2.0 Asynchronous Isochronous Audio Streaming Bridge & Explicit Feedback Rate-Matcher (UVC+UAC)',
    category: 'キャプチャーボード不要でUSB-C 1本から高音質ライブ配信 MC148 — カメラ側の高精度水晶を主役にする非同期フィードバック！',
    plainAnalogy:
      'α7 IV の人気機能「USBストリーミング」は、パソコンへUSB-Cケーブルを1本挿すだけで最高画質のカメラ映像と高音質マイク音声をそのままZoomやYouTubeライブへ送れます！ここで地味にスゴいのが「UAC非同期アイソクロナス伝送」。パソコン側の雑なUSB時計に合わせると音がプチプチ途切れたりジッターで濁るため、カメラ内部の超正確な水晶時計を基準にして「今のペースはこれくらいだよ」とPCへフィードバック通知し、滑らかな48 kHz配信と本体同時録画を両立しているのです！',
    summary:
      'Sony α7 IV の USB Type-C UVC＋UAC（USB Audio Class）同時ライブストリーミング（48 kHz 16-bit LPCM 2ch ＋ 本体内同時記録）を実現する非同期アイソクロナス・エンドポイント＆レート整合ブリッジ。',
    opticsAndPhysics: [
      'USBアイソクロナス転送は帯域を予約して低遅延リアルタイム伝送を行いますが、ホストPCの125 μsマイクロフレーム時計とカメラの24.576 MHzオーディオ水晶には常に数十ppmの周波数差が存在します。',
      '非同期（Asynchronous）モード＋明示的フィードバック（Explicit Feedback）エンドポイントを用いることで、カメラ側の低ジッター水晶をマスター時計に保ったまま、1パケットあたりのサンプル数（例：48サンプル ± 1）を精密調整してバッファ枯渇／溢れ（プチプチ音）を防ぎます。',
      '本体内部でのXAVC同時録画とUSB-C経由のライブ配信音声を同一クロックドメインで分岐出力できるのが α7 IV の大きな強みです。',
    ],
    formula: {
      expression: 'Rate_FB = f_local_xtal / f_SOF_USB  →  パケット毎サンプル微調整（ジッター遮断＆ドロップゼロ！）',
      description: 'カメラ側の高精度水晶を時計の親玉に据え、PCへペース調整信号を返すことで途切れも濁りもないUSBライブ音声を届けます',
    },
    nextGenInnovation:
      '次世代機では UAC 2.0 による 24-bit / 48–96 kHz・マルチチャンネルUSB直接収録（XLR-A4 の USB-C オーディオ対応含む）へ進化しています。',
    specs: [
      { label: '対応規格', value: 'USB Video Class（UVC）＋ USB Audio Class（UAC）ケーブル1本配信' },
      { label: '配信音声形式', value: 'LPCM 2ch（48 kHz / 16-bit、α7 IV 仕様・本体同時記録対応）' },
      { label: '同期方式', value: '非同期アイソクロナス転送 ＋ 明示的レートフィードバック制御' },
      { label: '物理端子', value: 'USB Type-C（SuperSpeed 5 Gbps / USB PD 給電同時動作対応）' },
    ],
    diagramType: 'mc_uac2_usb_c_async_bridge',
  },

  'mc-xavc-audio-dma-ringbuffer': {
    title: 'MC149. XAVC-S / XAVC-HS ハードウェア音声エンコーダー（LPCM 4ch / AAC-LC）＆ 無欠損DMAリングバッファ',
    subtitle: 'XAVC-S / XAVC-HS Hardware Audio Encoder (LPCM 4ch / AAC-LC) & Zero-Drop SDRAM Ping-Pong DMA Ring-Buffer',
    category: '毎秒600 Mbpsの4K動画書き込み中でも音を1ミリ秒も落とさない貯水池 MC149 — ピンポンDMAでCFexpressへ確実多重化！',
    plainAnalogy:
      '4K60 10-bit 4:2:2 という巨大な映像データをSDカードやCFexpressへ書き込み続ける最中、メモリーカードは一瞬だけ整理整頓（ガベージコレクション）で書き込みが詰まる瞬間があります。もし音声が直接カードへ書かれていたらその瞬間に音がブツッと欠けて大惨事！そこで BIONZ 内部に専用の「ピンポンDMAリングバッファ（円形の音声貯水池）」とハードウェア多重化エンジンを備え、LPCM 4ch 24-bitやAAC-LCを1サンプルも取りこぼさずMP4動画ファイルへ綺麗に縫い込んでいるのです！',
    summary:
      'Sony α7 IV の XAVC S / XAVC HS / XAVC S-I 収録フォーマット（LPCM 2ch 16/24-bit・LPCM 4ch 24-bit 48 kHz・MPEG-4 AAC-LC 2ch）を担うハードウェア音声エンコーダー＆ピンポンSDRAM DMAリングバッファ制御部。',
    opticsAndPhysics: [
      'オーディオコーデック／MIシューからの4ch 24-bit PCMストリームは、CPU割り込み負荷を最小化する専用散在収集（Scatter-Gather）ピンポンDMAにより、SDRAM上の円形リングバッファへ連続格納されます。',
      'メモリーカード（Slot 1 CFexpress Type A / Slot 2 SD UHS-II）のフラッシュ書込遅延スパイク（数十〜数百ms）をリングバッファが完全吸収し、音声フレーム欠損（ドロップアウト）とA/V非同期をゼロ化します。',
      'MP4コンテナの stts / stco サンプルテーブルへ映像GOP単位でインターリーブ多重化（Muxing）を行い、編集ソフト（Premiere / DaVinci Resolve）でのフレーム精度タイムライン再生を保証します。',
    ],
    formula: {
      expression: 'T_buffer = B_ring / (4 ch × 3 B × 48,000 Hz)  ≫  T_card_GC_stall   （書込詰まりでも音欠けゼロ！）',
      description: '円形の専用メモリ貯水池に音を絶えず溜めながらピンポン転送することで、高ビットレート4K録画中も音切れをゼロにします',
    },
    nextGenInnovation:
      'シャッターを押す数秒前から音声と映像をさかのぼって記録する「プリ録画（Pre-Recording）」機能も、この常時回転DMAリングバッファの応用です。',
    specs: [
      { label: '対応形式', value: 'LPCM 2ch（16/24-bit）/ LPCM 4ch（24-bit 48 kHz）/ AAC-LC 2ch' },
      { label: '転送制御', value: '専用ピンポン SDRAM DMA リングバッファ（CPU負荷ほぼゼロ）' },
      { label: 'コンテナ多重', value: 'XAVC S / XAVC HS / XAVC S-I（MP4 フレーム同期インターリーブ）' },
      { label: '記録メディア', value: 'CFexpress Type A / SD UHS-II 2スロット同時記録（Simult. Rec）対応' },
    ],
    diagramType: 'mc_xavc_audio_dma_ringbuffer',
  },

  'mc-shutter-click-transient-inpainter': {
    title: 'MC150. メカシャッター幕・レンズ絞り羽根トリガー同期 衝撃クリックゲート ＆ ニューラル波形補間（インペインティング）',
    subtitle: 'Mechanical Shutter-Curtain & Aperture-Blade Trigger-Synced Impulsive Click Gate & Neural Transient Inpainter',
    category: '「カシャッ！」「カチッ！」の瞬間だけを予知して声を塗り直すAI修復 MC150 — ハードウェア同期でセリフは一切途切れない！',
    plainAnalogy:
      '動画撮影中に絞り（F値）を変えたり静止画を切り出したりすると、レンズの絞り羽根やメカシャッターの「カチッ！」「カシャッ！」という鋭い衝撃音（10ミリ秒ほど）が録音へ飛び込みます。普通のノイズ低減はエアコンのような一定音しか消せません。そこでカメラ内部のシャッター（AFE-3360）やレンズ駆動の電気トリガー信号と直結し、「今から12ミリ秒だけ衝撃が来る！」と事前に知ってその一瞬のクリックだけを切り取り、前後の声からAIニューラル補間で自然に描き直す（インペインティング）のです！',
    summary:
      'カメラ内部のメカシャッター（AFE-3360）およびレンズ絞り／AFステップ駆動のハードウェア・タイミングパルスと直接同期し、15 ms未満の突発的インパルス雑音だけを時間‐周波数領域で外科的に置換・修復するニューラル・オーディオインペインティング段。',
    opticsAndPhysics: [
      '従来の事後クリック検出と異なり、カメラ自身が発するシャッター開／閉パルスおよびレンズ絞りステップ駆動コマンドをマイクロ秒精度で音声DSPへ先行通知（Feed-Forward Trigger）するため、誤検出（破裂音「パ・タ・カ」を誤って消す失敗）が原理的にゼロです。',
      'トリガーから約 2〜15 ms の衝撃窓区間だけをマスクし、前後のスペクトル包絡・基本周波数（ピッチ）・位相連続性から軽量ニューラル線形予測／自己回帰モデルで欠損波形を高精度に再合成（Audio Inpainting）します。',
      '単なるミュート（無音穴あき）と異なり、話し声やBGMのまっただ中でシャッターや操作ダイヤルが鳴っても聴感上まったく途切れを感じさせません。',
    ],
    formula: {
      expression: 'x̂[n] = Inpaint_NN(x[n−L..n−1], x[n+W..n+W+L] | Trig_shutter = 1, W < 15 ms)',
      description: 'シャッターや絞りが動く「正確な瞬間」をカメラ自身の合図で先読みし、クリック音だけを消して前後の声で自然に描き直します',
    },
    nextGenInnovation:
      'カメラ本体のメカ制御系と音声AI NPUが同一チップ上でマイクロ秒同期できる「カメラメーカー純正統合設計」ならではの究極の無音収録テクノロジーです。',
    specs: [
      { label: '同期トリガー', value: 'AFE-3360 シャッター幕＆レンズ絞り/AF駆動ハードウェア同期パルス' },
      { label: '修復窓幅', value: '突発インパルス区間 2–15 ms を外科的マスク（誤検出ゼロ）' },
      { label: '修復方式', value: '位相連続ニューラル波形インペインティング（無音穴あき皆無）' },
      { label: '保護対象', value: '人の声の破裂音（p/t/k）を傷つけずメカ衝撃音のみピンポイント除去' },
    ],
    diagramType: 'mc_shutter_click_transient_inpainter',
  },
};
