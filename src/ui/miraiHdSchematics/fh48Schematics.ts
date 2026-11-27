import { PartExplanation } from '../../assemblies/types';
import {
  MiraiHdSpec,
  miraiKpi,
  renderMiraiMonographSvg,
} from './shared';

const FH48_TAG = 'FH48 2028統合機 · 87/100点';

const FH48_SPECS: Partial<Record<PartExplanation['diagramType'], MiraiHdSpec>> = {
  mirai_fh48_contactless_mount: {
    badge: 'FH48-01',
    fhTag: FH48_TAG,
    zone: 'pkg',
    title: 'FH34統合：60GHzミリ波＋磁気共振給電・完全無接点IP68チタンマウント',
    analogy: '壊れたり錆びたりしやすい金属ピンを完全に無くし、サファイア窓越しの60GHz電波とワイヤレス給電でレンズを繋ぐ未来マウントです',
    metric: '6.25–20 Gbps · 露出ピン 0',
    scaleLabel: 'FH34 CONTACTLESS 60GHz + MAG-RESONANCE IP68 MOUNT',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <circle cx="204" cy="198" r="82" fill="url(#${p}_si)" stroke="#475569" stroke-width="2.4"/>
      <circle cx="204" cy="198" r="62" fill="#ffffff" stroke="#d97706" stroke-width="6"/>
      <rect x="160" y="248" width="88" height="18" rx="5" fill="#06b6d4" stroke="#0369a1" stroke-width="1.6"/>
      <text x="204" y="194" text-anchor="middle" font-size="9.5" font-weight="900" fill="#0f172a">無接点Eマウント</text>
      <text x="204" y="212" text-anchor="middle" font-size="8.2" font-weight="700" fill="#b45309">内周：磁気共振給電コイル</text>
      <text x="204" y="261" text-anchor="middle" font-size="8" font-weight="900" fill="#ffffff">60GHz ST60窓</text>
      ${miraiKpi(316, 114, 366, 84, '従来UARTの最大4,000倍帯域', '単体 6.25 Gbps / 複数 10–20 Gbps · 7ns', 'ST60級ミリ波非接触リンクでレンズ内OIS/AF/メタ情報を即時同期', '#0284c7')}
      ${miraiKpi(316, 210, 366, 80, '腐食・折損ゼロ＆IP68防水', '金属露出接点 0（セラミック／サファイア封止）', '海辺の潮風や豪雨でもレンズ未認識エラーを根絶', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '60GHz非免許Vバンド無接触通信（ST60級）＋同心円磁気共振給電', line2: '露出金属ピンを全廃しセラミック/サファイア隔壁でIP68密閉' },
      { label: '撮影メリット', line1: '雨・汗・塩害による接点腐食やピン折損トラブルを完全根絶', line2: '超高速7ns遅延通信でレンズ内電子フィルターやOISと超精密協調' },
      { label: '設計スペック', line1: 'チタンバヨネット外径 Ø57mm / 給電電力 15–25W対応', line2: '移行期は従来ピン互換アダプタで既存Eマウント資産も継続利用可' },
    ],
  },
  mirai_fh48_meta_lens_collar: {
    badge: 'FH48-02',
    fhTag: FH48_TAG,
    zone: 'optic',
    title: 'FH08/FH10統合：超薄メタ光学パンケーキ＆ライトフィールド接続環',
    analogy: '厚さわずか28mm・180gの超知能メタレンズや、撮影後にピントやボケ味を変えられるライトフィールドレンズを迎え入れる光の入口です',
    metric: '総重量 約800g（レンズ込）',
    scaleLabel: 'FH08 / FH10 META-OPTICS & LIGHTFIELD INTERFACE COLLAR',
    accent: '#0f766e',
    accentSoft: '#ccfbf1',
    art: (p) => `
      <circle cx="204" cy="198" r="82" fill="#1e293b" stroke="#10b981" stroke-width="4"/>
      <circle cx="204" cy="198" r="58" fill="url(#${p}_glass)" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="204" cy="126" r="6" fill="#dc2626"/>
      <text x="204" y="196" text-anchor="middle" font-size="9.8" font-weight="900" fill="#0f172a">28mm メタ光学対応</text>
      <text x="204" y="214" text-anchor="middle" font-size="8.2" font-weight="700" fill="#0f766e">550g本体＋250gレンズ≒800g</text>
      ${miraiKpi(316, 114, 366, 84, 'システム総重量 1/3〜1/4革命', '従来2.5–3.5kg → 約770〜830g', '大口径F1.4や高倍率ズームをポケット級へ圧縮したASI逆設計成果', '#0f766e')}
      ${miraiKpi(316, 210, 366, 80, 'FH10 ライトフィールド拡張対応', '撮影後のF値・焦点面・視点再構成', '物理入射瞳径（エタンデュ保存則）を守り抜く本物の光学進化', '#7c3aed')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'エタンデュ保存則を遵守しつつASI逆設計メタ光学レンズを直結', line2: 'ショートフランジ18mmとAR保護インターフェースで迷光抑制' },
      { label: '撮影メリット', line1: '本体約550g＋レンズ約250g＝約800gで現行プロ機超えの描写', line2: '一日中首から下げても疲れない新次元の機動力' },
      { label: '設計スペック', line1: 'エメラルドMIRAI識別環＋ルビー装着指標ドット', line2: 'FH08 50mm F1.4 / FH10 ライトフィールド両対応' },
    ],
  },
  mirai_fh48_cfrp_front_shell: {
    badge: 'FH48-03',
    fhTag: FH48_TAG,
    zone: 'pkg',
    title: 'FH33/FH36統合：綾織CFRPフロント外装＆常温自己修復グリップ外皮',
    analogy: '軽くて強い航空機カーボン外装と、小傷が常温で元に戻るしなやかな手形フィットグリップを組み合わせた未来ボディの顔です',
    metric: '外装軽量化 −35% · 自己修復',
    scaleLabel: 'FH33 TWILL CFRP SHELL + FH36 SELF-HEALING GRIP',
    accent: '#1e293b',
    accentSoft: '#f1f5f9',
    art: () => `
      <rect x="86" y="122" width="248" height="156" rx="18" fill="#1e293b" stroke="#475569" stroke-width="2.2"/>
      <rect x="88" y="126" width="52" height="148" rx="14" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
      <text x="114" y="204" text-anchor="middle" font-size="8.2" font-weight="800" fill="#34d399">自己修復グリップ</text>
      <circle cx="212" cy="200" r="48" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
      <rect x="278" y="142" width="44" height="116" rx="6" fill="#334155" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 2"/>
      <text x="300" y="202" text-anchor="middle" font-size="7.6" font-weight="900" fill="#e2e8f0">格子透視窓</text>
      ${miraiKpi(354, 118, 328, 78, 'CFRP＋PEO絶縁ガルバニック対策', '炭素とチタン間の電食（異種金属腐食）ゼロ', 'プラズマ電解酸化（PEO）絶縁層で長期耐候性を確保', '#1e293b')}
      ${miraiKpi(354, 208, 328, 76, 'FH36 常温自己修復エラストマー', '擦り傷の自動回復＆手形適合グリップ', '動的共有結合ポリマーにより長年使っても新品の握り心地', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '2×2綾織CFRP（炭素繊維強化樹脂）＋PEO絶縁界面で軽量高剛性', line2: '動的共有結合エラストマー外皮が常温で微細擦り傷を自己修復' },
      { label: '撮影メリット', line1: '寒冷地でも金属のように手が凍えにくく、かつ圧倒的に軽量', line2: '右側カットアウト窓から内部のASI中空格子チタン骨格を一望' },
      { label: '設計スペック', line1: 'フロント幅 118×74mm / 人間工学ディープグリップ一体成形', line2: '前面電子コマンドダイヤル＋エメラルド識別ライン' },
    ],
  },
  mirai_fh48_ti_lattice_skeleton: {
    badge: 'FH48-04',
    fhTag: FH48_TAG,
    zone: 'pkg',
    title: '核心①（FH33）：ASIトポロジー最適化×金属AM「中空格子チタン主骨格」',
    analogy: '鳥の骨のように中が空洞の立体格子を金属3Dプリントで作り、マグネシウムの約2/3の軽さで超望遠レンズにも耐える鉄壁骨格です',
    metric: 'シャーシ質量 −35% · 高剛性',
    scaleLabel: 'FH33 ASI TOPOLOGY HOLLOW-LATTICE TITANIUM SKELETON',
    accent: '#64748b',
    accentSoft: '#f1f5f9',
    art: () => `
      <rect x="88" y="122" width="244" height="158" rx="12" fill="none" stroke="#64748b" stroke-width="5"/>
      ${[0, 1, 2, 3, 4].map((i) => `<line x1="${102 + i * 44}" y1="126" x2="${146 + i * 44}" y2="276" stroke="#94a3b8" stroke-width="3"/><line x1="${146 + i * 44}" y1="126" x2="${102 + i * 44}" y2="276" stroke="#cbd5e1" stroke-width="3"/>`).join('')}
      <rect x="148" y="158" width="124" height="86" rx="8" fill="#ffffff" stroke="#0f766e" stroke-width="2"/>
      <text x="210" y="198" text-anchor="middle" font-size="9.5" font-weight="900" fill="#0f172a">中空格子チタン骨格</text>
      <text x="210" y="216" text-anchor="middle" font-size="8" font-weight="700" fill="#0f766e">ジャイロイド／トラス最適化</text>
      ${miraiKpi(352, 118, 330, 78, '550g級フルサイズ本体の秘密', '従来Mgダイカスト比 シャーシ35%軽量化', '荷重経路のみ金属を残すASIトポロジー最適化×金属AM造形', '#475569')}
      ${miraiKpi(352, 208, 330, 76, '内部空間の最大有効活用', '中空格子が衝撃吸収と配線経路を兼務', 'センサー・SoC・空冷・全固体電池を最短距離で高密度収容', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'Ti-6Al-4V粉末レーザー積層造形による中空ジャイロイド／トラス格子', line2: 'マウント〜三脚座間の主応力線を最短結節しねじり剛性を向上' },
      { label: '撮影メリット', line1: 'フルサイズ本体約550gの驚異的軽さとプロ機級の耐落下強度を両立', line2: '超望遠レンズ装着時のマウントたわみをミクロン単位で防止' },
      { label: '設計スペック', line1: '骨格寸法 112×66×24mm / 36本格子ストラット（InstancedMesh）', line2: 'FH33 革新性 77点 / 電食防止PEO絶縁界面採用' },
    ],
  },
  mirai_fh48_sensor_maglev_core: {
    badge: 'FH48-05',
    fhTag: FH48_TAG,
    zone: 'active',
    title: 'FH01/02/13/17統合：SPAD／3層RGB＋磁気浮上10段IBIS撮像コア',
    analogy: '暗闇ISO 400万や光利用率200%超の次世代センサーを磁気で宙に浮かせ、20〜23段の圧倒的ダイナミックレンジを1枚で記録する心臓部です',
    metric: '20〜23段DR · 10–11段IBIS',
    scaleLabel: 'FH01/02/17 FULL-FRAME STACKED SENSOR + MAGLEV CORE',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: () => `
      <rect x="92" y="122" width="234" height="158" rx="14" fill="#334155" stroke="#d97706" stroke-width="3"/>
      <rect x="126" y="148" width="166" height="106" rx="8" fill="#0369a1" stroke="#38bdf8" stroke-width="2.2"/>
      <text x="209" y="196" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">36×24mm 未来センサー</text>
      <text x="209" y="216" text-anchor="middle" font-size="8.2" font-weight="700" fill="#bae6fd">SPAD / 3層RGB / イベント積層</text>
      ${miraiKpi(346, 118, 336, 78, '物理情報の丸ごと捕獲', '20–23段DR・動き軌跡・近中距離3D深度', '白飛び・黒つぶれ・ブレという写真の物理失敗を構造的に解消', '#0284c7')}
      ${miraiKpi(346, 208, 336, 76, '地球自転補正＆±2°チルト統合', 'FH17 磁気浮上IBISへ一体搭載', '三脚なしで数秒の手持ち撮影＆シャインプルーフ制御を実現', '#d97706')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'FH01 SPAD・FH02 3層RGB・FH05 22段LOFICの成果を36×24mmへ集約', line2: 'FH17ハルバッハ磁気浮上6-DOFジンバルが光軸中央に非接触支持' },
      { label: '撮影メリット', line1: '肉眼を超える20–23段DRと暗所カラー撮像で撮影チャンスを無限拡大', line2: '露出ミスや微ブレを恐れない新時代の撮像体験' },
      { label: '設計スペック', line1: '撮像面 36×24mm / 4辺銅コイル＆N52磁気浮上枠一体', line2: 'FH39 センサー直結PQC真正性署名連携' },
    ],
  },
  mirai_fh48_2nm_soc_mainboard: {
    badge: 'FH48-06',
    fhTag: FH48_TAG,
    zone: 'pkg',
    title: 'FH20/23/39統合：2nm/A16 GAA＋BSPDN 1,000 TOPS チップレットメイン基板',
    analogy: 'センサーのすぐ裏に直結された頭脳基板。毎秒1,000兆回のAI計算・世界モデル理解・破られない耐量子署名をすべて5〜8Wでこなします',
    metric: '1,000 TOPS · 5〜8 W枠',
    scaleLabel: 'FH20/23/39 2nm GAA CHIPLET MAINBOARD + PQC ENCLAVE',
    accent: '#059669',
    accentSoft: '#d1fae5',
    art: () => `
      <rect x="88" y="116" width="244" height="170" rx="12" fill="#065f46" stroke="#10b981" stroke-width="2"/>
      <rect x="108" y="142" width="112" height="112" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
      <text x="164" y="194" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">2nm/A16 SoC</text>
      <text x="164" y="212" text-anchor="middle" font-size="8" font-weight="700" fill="#34d399">1,000 TOPS</text>
      <rect x="234" y="142" width="80" height="48" rx="6" fill="#d97706"/>
      <text x="274" y="170" text-anchor="middle" font-size="8.4" font-weight="900" fill="#ffffff">PQC / PUF</text>
      <rect x="234" y="202" width="80" height="52" rx="6" fill="#0284c7"/>
      <text x="274" y="232" text-anchor="middle" font-size="8.4" font-weight="900" fill="#ffffff">光I/O・RAM</text>
      ${miraiKpi(352, 118, 330, 78, 'Neural Physics RAW＋VWM実行', '2層物理RAW＋1.58-bit視覚世界モデル', '撮影後リライティング・0.5秒予知AF・無ハルシネーション超解像', '#059669')}
      ${miraiKpi(352, 208, 330, 76, 'FH39 耐量子C2PA 2.x標準内蔵', '静止画・動画すべてへ自動オンダイ署名', 'AI偽造が氾濫する2028年に「本物の証」を無償提供', '#d97706')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '2nm/A16 GAA＋BSPDNチップレットSoCをセンサー直後へ超短配線実装', line2: 'PQC/PUF耐量子金庫・LPDDR6・光I/Oインターフェースを1枚に集約' },
      { label: '撮影メリット', line1: 'カメラ単体・オフラインで映画級のAI予測AFと物理RAW処理を実行', line2: '背面全面でFH32空冷と熱密着し5〜8W枠で持続フル性能' },
      { label: '設計スペック', line1: '基板 76×56mm 多層HDI / 持続電力枠 5〜8 W', line2: 'FH20(85点)・FH23(88点)・FH39(88点) 三位一体基板' },
    ],
  },
  mirai_fh48_mems_cooling_spine: {
    badge: 'FH48-07',
    fhTag: FH48_TAG,
    zone: 'cool',
    title: '核心②（FH32）：持続10〜15W対応 IP68水密隔離・超音波MEMS空冷スパイン',
    analogy: 'ファンも軸受けもない厚さ数ミリの超音波シリコン空冷が、メイン基板とセンサーの熱を無音＆IP68完全防水のまま外へ逃がします',
    metric: '持続 10〜15 W · IP68防水',
    scaleLabel: 'FH32 SUSTAINED 10-15W HERMETIC MEMS COOLING SPINE',
    accent: '#ea580c',
    accentSoft: '#ffedd5',
    art: (p) => `
      <rect x="86" y="124" width="234" height="152" rx="14" fill="url(#${p}_cu)" stroke="#c2410c" stroke-width="2.2"/>
      <rect x="108" y="144" width="190" height="112" rx="8" fill="#0f172a" stroke="#34d399" stroke-width="2"/>
      <text x="203" y="194" text-anchor="middle" font-size="10.2" font-weight="900" fill="#34d399">2×3 超音波MEMS空冷</text>
      <text x="203" y="214" text-anchor="middle" font-size="8.4" font-weight="700" fill="#cbd5e1">IP68 無孔SUS隔離隔壁（水没保護）</text>
      ${miraiKpi(340, 118, 342, 80, '熱力学の厳格クリアリング整合', '炎天下8K 20分熱停止 → 持続10–15W連続', '受動放熱の物理限界を無音・無振動の固体空冷で突破', '#ea580c')}
      ${miraiKpi(340, 210, 342, 76, 'カメラ背面スパイン配置', '熱源（センサー＋SoC）の直背へ一括密着', '左側面ラビリンス排気口から撮影者の手を避けて排熱', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'ベイパーチャンバー＋無孔レーザー溶接SUS隔壁＋超音波MEMS圧電膜', line2: '空冷湿室と電子乾室を完全遮断しIP68水没耐性と大風量を両立' },
      { label: '撮影メリット', line1: '真夏の8K/12K動画収録や長時間AI連写でも熱停止リスクを大幅解消', line2: '羽根なし21dBA以下・振動ゼロで内蔵空間マイクにも無影響' },
      { label: '設計スペック', line1: '銅スパイン 64×44mm / 持続排熱能力 10〜15 W', line2: 'FH32 革新性 84点（AirJet Mini Sport級アーキテクチャ）' },
    ],
  },
  mirai_fh48_pancake_evf_hump: {
    badge: 'FH48-08',
    fhTag: FH48_TAG,
    zone: 'optic',
    title: 'FH25/27統合：軍艦部 30,000nit・240Hz True-RGB パンケーキEVF',
    analogy: '真夏の太陽の下でも肉眼の光学ファインダーより明るく滑らかに見え、240Hzの視線追跡で「見た場所」に即ピントが合う窓です',
    metric: '30,000 nit · 240Hz 視線AF',
    scaleLabel: 'FH25/27 30,000-NIT PANCAKE EVF PENTAPRISM HUMP',
    accent: '#334155',
    accentSoft: '#f1f5f9',
    art: () => `
      <rect x="92" y="122" width="234" height="156" rx="22" fill="#1e293b" stroke="#475569" stroke-width="2.2"/>
      <rect x="132" y="150" width="154" height="100" rx="12" fill="#0f766e" stroke="#34d399" stroke-width="2.2"/>
      <text x="209" y="196" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">30,000 nit HDR</text>
      <text x="209" y="216" text-anchor="middle" font-size="8.4" font-weight="700" fill="#d1fae5">240Hz BFI · 3,000万ドット</text>
      ${miraiKpi(346, 118, 336, 78, 'パンケーキ折り返し光学で超小型化', '軍艦部出っ張りを最小化し800g筐体へ融合', 'カラーフィルターレスTrue-RGBタンデムで高効率・高色域', '#0f766e')}
      ${miraiKpi(346, 208, 336, 76, '240Hz 同軸視線追跡AF内蔵', '見た瞳・被写体へ瞬時にフォーカスロック', 'FH28 運動意図先読みUIの要となる超低遅延ビューファインダー', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '3回折り返しパンケーキ光学＋30,000nit True-RGBタンデム発光ダイ', line2: '940nm同軸視線追跡ミラーにより240Hzで撮影者の視線を追尾' },
      { label: '撮影メリット', line1: '逆光の雪原や白雲でも22段DRのハイライト階調をリアル確認', line2: '240Hz＋黒挿入（BFI）により高速パンでも残像ゼロのOVF感覚' },
      { label: '設計スペック', line1: '軍艦部 44×21×36mm / 接眼アイカップ一体設計', line2: 'FH25 革新性 84点 / 遅延 < 2.5 ms' },
    ],
  },
  mirai_fh48_contactless_mishoe: {
    badge: 'FH48-09',
    fhTag: FH48_TAG,
    zone: 'pkg',
    title: 'FH34統合：完全無接点 60GHzミリ波＋磁気給電 IP68ホットシュー',
    analogy: '雨で錆びたりストロボの抜き差しで曲がりやすかった21本の極小ピンを全廃した、フラットで頑丈な完全防水アクセサリシューです',
    metric: '21ピン全廃 · IP68完全防水',
    scaleLabel: 'FH34 CONTACTLESS 60GHz + WIRELESS POWER MI SHOE',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <rect x="116" y="128" width="186" height="144" rx="14" fill="url(#${p}_si)" stroke="#475569" stroke-width="2.2"/>
      <rect x="148" y="152" width="122" height="96" rx="10" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
      <text x="209" y="196" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">60GHz＋磁気給電窓</text>
      <text x="209" y="216" text-anchor="middle" font-size="8" font-weight="700" fill="#e0f2fe">露出ピン 0 · フラット封止</text>
      ${miraiKpi(326, 120, 356, 78, '故障率No.1箇所の構造根絶', '現行21ピン極小端子の折損・水没ゼロ', '外部デジタルマイク・大型ストロボ・XLRアダプタを高速無接点結合', '#0284c7')}
      ${miraiKpi(326, 210, 356, 74, '最大 6.25 Gbps＋ワイヤレス給電', '非圧縮32-bit float多ch音声＆外部モニター直結', 'シューカバーを付け忘れて豪雨に打たれても浸水ゼロ', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'チタンCレール中央へ60GHz ST60アンテナと磁気共振給電パッドを封止', line2: '物理的電気接点を完全に排除し上部トップカバーの水密性を完成' },
      { label: '撮影メリット', line1: '過酷な雨天取材でもホットシューからの浸水エラーを完全防止', line2: '高速無線データ結合でデジタル音声・ストロボ高速同調を遅延ゼロ制御' },
      { label: '設計スペック', line1: '外寸 23×22mm / 通信 6.25 Gbps / 非接触給電 10W+', line2: 'FH34 量産民主化モデル（IP68規格）' },
    ],
  },
  mirai_fh48_piezo_haptic_dials: {
    badge: 'FH48-10',
    fhTag: FH48_TAG,
    zone: 'pkg',
    title: 'FH29統合：ピエゾ固定シャッター＆磁気カップリング可変触覚ダイヤル',
    analogy: 'ボディに穴を開けずに磁石の力で回転を読み取り、動画では無音スムース・写真ではカチカチと手応えを変えられる完全防水ダイヤルです',
    metric: '軸穴 0 · 可変クリック触覚',
    scaleLabel: 'FH29 SOLID-STATE PIEZO + MAGNETIC HAPTIC TOP DIALS',
    accent: '#0f766e',
    accentSoft: '#ccfbf1',
    art: () => `
      <circle cx="152" cy="196" r="52" fill="#1e293b" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="6 3"/>
      <text x="152" y="192" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">磁気触覚</text>
      <text x="152" y="208" text-anchor="middle" font-size="8" font-weight="700" fill="#34d399">可変デテント</text>
      <circle cx="268" cy="196" r="38" fill="#0f766e" stroke="#34d399" stroke-width="3"/>
      <text x="268" y="192" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">ピエゾ</text>
      <text x="268" y="208" text-anchor="middle" font-size="7.6" font-weight="700" fill="#d1fae5">半押し/全押し</text>
      ${miraiKpi(330, 118, 352, 78, '静止画⇄動画で手応えを自在変化', '1/3段クリック ↔ 無段階シネマ操作', '電磁コイルで回転抵抗とクリック感をリアルタイムに書き換え', '#0f766e')}
      ${miraiKpi(330, 208, 352, 76, '貫通軸穴ゼロのIP68完全防水', 'ボタン隙間からの砂・塩水侵入を物理遮断', 'ピエゾ圧電検知で手袋越しでも正確な半押し感触を再現', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '非貫通の磁気カップリング回転検出＋電磁可変デテント（ハプティクス）', line2: 'ピエゾ圧電歪み検知シャッターが半押し・全押し圧力を自在カスタム' },
      { label: '撮影メリット', line1: 'ダイヤルのガタつき・チャタリング摩耗・浸水故障を永久追放', line2: '動画モード切替と同時にダイヤルが無音・無段階感触へ自動変化' },
      { label: '設計スペック', line1: 'トップ肩部 40×28mm / 2磁気ダイヤル＋ピエゾシャッター＋REC', line2: 'FH29 革新性 79点 / IP68非貫通防水構造' },
    ],
  },
  mirai_fh48_assb_battery_pack: {
    badge: 'FH48-11',
    fhTag: FH48_TAG,
    zone: 'cool',
    title: '核心③（FH31）：高濃度Si-C半固体／硫化物全固体電池（ASSB・24Wh級）',
    analogy: '従来の同じ大きさのまま容量1.4倍、15〜20分で80%まで超急速充電でき、燃える液体を一切使わない安全な未来バッテリーです',
    metric: '20〜24 Wh · 15–20分80%充電',
    scaleLabel: 'FH31 SI-C SEMI-SOLID & SULFIDE ALL-SOLID-STATE BATTERY',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: () => `
      <rect x="108" y="114" width="196" height="174" rx="16" fill="#1e293b" stroke="#0284c7" stroke-width="2.4"/>
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="124" y="${130 + i * 28}" width="164" height="20" rx="4" fill="${i % 2 === 0 ? '#0284c7' : '#10b981'}"/>`).join('')}
      <text x="206" y="276" text-anchor="middle" font-size="8.6" font-weight="900" fill="#e0f2fe">バイポーラ全固体セル積層（900 Wh/L級）</text>
      ${miraiKpi(326, 114, 356, 84, 'NP-FZ100同寸で最大1.45倍容量', '現行16.4 Wh → 約20〜24 Wh（800–900 Wh/L）', '持続10–15Wの未来カメラを1.5〜2時間超フル稼働させる心臓', '#0284c7')}
      ${miraiKpi(326, 210, 356, 80, '3C〜4C 超急速充電＆不燃安全', '15〜20分で80%回復（USB-PD 65–100W）', '可燃性電解液ゼロで真夏の高温ロケ・航空輸送の熱暴走リスク劇減', '#059669')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '第1段：高濃度Si-C半固体（800Wh/L）→ 第2段：硫化物ASSB（900Wh/L超）', line2: '固体電解質によるデンドライト抑止とバイポーラ積層で高電圧低抵抗化' },
      { label: '撮影メリット', line1: '休憩15〜20分のUSB-PD充電でほぼ満タン復帰、予備電池携行を半減', line2: '極寒地・炎天下でも安全性と出力安定性が劇的に向上' },
      { label: '設計スペック', line1: '右グリップ内蔵 20×52×28mm / 容量 20〜24 Wh', line2: 'FH31 革新性 82点 / 金4ピン大電流急速充電端子' },
    ],
  },
  mirai_fh48_cfexpress_mram_bay: {
    badge: 'FH48-12',
    fhTag: FH48_TAG,
    zone: 'pkg',
    title: 'FH37統合：PCIe 5.0/6.0 CFexpress（7〜10 GB/s）＋不揮発STT-MRAMベイ',
    analogy: '毎秒7〜10GBという桁違いの速さで12K RAWを書き込み、万一バッテリーが抜けても直前の写真を磁石の記憶（MRAM）で守る記録庫です',
    metric: '7–10 GB/s · 電源断保護MRAM',
    scaleLabel: 'FH37 PCIE 5.0/6.0 CFEXPRESS + NON-VOLATILE STT-MRAM',
    accent: '#d97706',
    accentSoft: '#fef3c7',
    art: () => `
      <rect x="92" y="122" width="124" height="156" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="2.2"/>
      <text x="154" y="192" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">CFexpress 5.0</text>
      <text x="154" y="212" text-anchor="middle" font-size="8.4" font-weight="700" fill="#34d399">400層CBA NAND</text>
      <rect x="230" y="148" width="96" height="104" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="2.2"/>
      <text x="278" y="194" text-anchor="middle" font-size="9.2" font-weight="900" fill="#fbbf24">STT-MRAM</text>
      <text x="278" y="214" text-anchor="middle" font-size="7.8" font-weight="700" fill="#fde68a">128–512MB 不揮発</text>
      ${miraiKpi(346, 118, 336, 78, 'PCIeレーン物理帯域厳密整合', 'Type B(x2): 7 GB/s（Gen6で10–14 GB/s）', 'Type A(x1)も3.5 GB/s超へ倍増し120fps無限連写を解放', '#d97706')}
      ${miraiKpi(346, 208, 336, 76, 'スピントロニクス緊急退避キャッシュ', '突然の電池断・カード抜去でもデータ無損', 'ファイル管理領域と直前フレームを不揮発磁気トンネル接合へ即退避', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '332〜400層CBA 3D NAND＋PCIe 5.0/6.0コントローラによる超高速書込', line2: '不揮発STT-MRAM（128–512MB）が揮発DRAMの弱点である停電破損を保護' },
      { label: '撮影メリット', line1: '8K/12K RAW・120fps連写でもバッファ詰まりゼロでシャッターが止まらない', line2: '報道・ウェディング現場での致命的なカードファイル破損事故を根絶' },
      { label: '設計スペック', line1: 'デュアルシールドベイ / Type B 6.8–7.2 GB/s（Gen6 10+ GB/s）', line2: 'FH37 革新性 84点 / VPG Profile 5.0 準拠' },
    ],
  },
  mirai_fh48_wifi8_ntn_antenna: {
    badge: 'FH48-13',
    fhTag: FH48_TAG,
    zone: 'pkg',
    title: 'FH38統合：Wi-Fi 8（802.11bn）＋3GPP Rel-19低軌道衛星（NTN）複合アンテナ',
    analogy: '競技場では1秒でRAWをクラウドへ送り、携帯の電波が一切届かないヒマラヤや砂漠でも宇宙の衛星へ直接写真を飛ばすアンテナです',
    metric: 'Wi-Fi 8 + 衛星NTN直接発信',
    scaleLabel: 'FH38 WI-FI 8 (802.11bn) + 3GPP REL-19 LEO NTN ANTENNA',
    accent: '#eab308',
    accentSoft: '#fef9c3',
    art: () => `
      <rect x="92" y="124" width="234" height="154" rx="14" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
      ${[0, 1].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${112 + c * 50}" y="${144 + r * 62}" width="38" height="48" rx="5" fill="#eab308" stroke="#a16207" stroke-width="1.5"/>`).join('')).join('')}
      <text x="209" y="266" text-anchor="middle" font-size="8.6" font-weight="900" fill="#0f172a">4×2 金フェーズドアレイ衛星パッチ＆Wi-Fi 8</text>
      ${miraiKpi(346, 118, 336, 78, 'Wi-Fi 8（802.11bn）超高信頼伝送', '混雑スタジアムでもRAW 1秒同期', 'マルチAP協調と超低遅延化で報道現場の無線詰まりを打破', '#a16207')}
      ${miraiKpi(346, 208, 336, 76, '3GPP Rel-19 低軌道衛星（NTN）', '圏外ゼロ・極地からプロキシ数秒発信', 'CFRP非導電セラミック窓直下に配置し衛星リンクバジェットを確保', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '電波を通すアルミナセラミック上肩部窓＋4×2金パッチフェーズドアレイ', line2: 'Wi-Fi 8（マルチAP協調）と3GPP Release 19 LEO NTN衛星通信を統合' },
      { label: '撮影メリット', line1: '撮った瞬間にC2PA耐量子署名済み写真が編集部・クラウドへ到達', line2: '山岳・海洋・災害現場でも圏外を気にせず即時発信・緊急連絡可能' },
      { label: '設計スペック', line1: '左肩セラミックレドーム 28×26mm / 8素子パッチアレイ', line2: 'FH38 革新性 84点 / 衛星プロキシ即時伝送対応' },
    ],
  },
  mirai_fh48_spatial_mic_array: {
    badge: 'FH48-14',
    fhTag: FH48_TAG,
    zone: 'optic',
    title: 'FH40統合：静電容量＋無膜光干渉MEMS ハイブリッド4カプセル空間マイク',
    analogy: 'ささやき声は超低ノイズで、ジェット機やライブの爆音は「レーザーの干渉」で歪みゼロに録り、AIがピントの合った人だけ声を引き上げます',
    metric: '150+ dB SPL 無歪み · AI連動',
    scaleLabel: 'FH40 CAPACITIVE + OPTICAL-MEMS 4-MIC SPATIAL ARRAY',
    accent: '#d97706',
    accentSoft: '#fef3c7',
    art: (p) => `
      <rect x="88" y="156" width="244" height="72" rx="16" fill="url(#${p}_si)" stroke="#475569" stroke-width="2.2"/>
      ${[126, 180, 236, 290].map((x, idx) => `
        <circle cx="${x}" cy="192" r="18" fill="${idx % 2 === 0 ? '#eab308' : '#0284c7'}" stroke="#0f172a" stroke-width="1.8"/>
        <text x="${x}" y="196" text-anchor="middle" font-size="8" font-weight="900" fill="#ffffff">${idx % 2 === 0 ? '静電' : '光MEMS'}</text>
      `).join('')}
      <text x="210" y="256" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">4基ハイブリッド配列 → 視聴覚AI焦点連動ビームフォーミング</text>
      ${miraiKpi(352, 118, 330, 78, '膜なし光干渉MEMSの衝撃', '爆音150dBでも物理音割れゼロ', '静電容量MEMS（極静寂）と光MEMS（爆音）をシームレス合成', '#d97706')}
      ${miraiKpi(352, 208, 330, 76, '映像AF・深度と連動する空間集音', 'ピントの合った話者の声だけを立体抽出', '外部ガンマイク無しでプロ級インタビュー・ライブ収録を実現', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '超低ノイズ静電容量MEMS×2＋無膜光干渉（レーザー）MEMS×2', line2: '映像のAF対象・dToF距離情報と連動した視聴覚AIビームフォーミング' },
      { label: '撮影メリット', line1: 'ささやき声からロックフェス・モータースポーツ爆音まで1台で完璧収録', line2: 'FH32無音空冷と組み合わさり、内蔵マイクの収録品位が劇的向上' },
      { label: '設計スペック', line1: '軍艦部前面 38×5.2mm 4カプセルチタンバー', line2: 'FH40 革新性 76点 / 32-bit float空間音声対応' },
    ],
  },
  mirai_fh48_io_usb4_optical_port: {
    badge: 'FH48-15',
    fhTag: FH48_TAG,
    zone: 'pkg',
    title: '左側面 IP68防水 USB4 v2（80Gbps）＋光ファイバー外部I/Oブロック',
    analogy: 'USB4の超高速ケーブルに加えて、シネマ用光ファイバーも直接差せる、雨天でも安心のフル装備インターフェース棟です',
    metric: 'USB4 v2 80Gbps + CPO光出力',
    scaleLabel: 'IP68 USB4 V2 (80Gbps) + HDMI 2.1B + OPTICAL CPO PORT',
    accent: '#0891b2',
    accentSoft: '#cffafe',
    art: () => `
      <rect x="136" y="114" width="142" height="176" rx="16" fill="#1e293b" stroke="#475569" stroke-width="2.2"/>
      <rect x="166" y="130" width="82" height="22" rx="9" fill="#cbd5e1"/><text x="207" y="145" text-anchor="middle" font-size="8.2" font-weight="900" fill="#0f172a">USB4 v2 (80G)</text>
      <rect x="166" y="164" width="82" height="22" rx="9" fill="#cbd5e1"/><text x="207" y="179" text-anchor="middle" font-size="8.2" font-weight="900" fill="#0f172a">PD 100W 充電</text>
      <rect x="166" y="198" width="82" height="22" rx="4" fill="#94a3b8"/><text x="207" y="213" text-anchor="middle" font-size="8.2" font-weight="900" fill="#0f172a">HDMI 2.1b</text>
      <circle cx="207" cy="256" r="19" fill="#06b6d4" stroke="#cffafe" stroke-width="2"/><text x="207" y="260" text-anchor="middle" font-size="8" font-weight="900" fill="#ffffff">光CPO</text>
      ${miraiKpi(306, 118, 376, 78, '80 Gbps＋100W超急速給電', 'FH31全固体電池を15–20分で80%充電', '外部SSDダイレクト12K RAW収録＆テザー撮影をケーブル1本で完結', '#0891b2')}
      ${miraiKpi(306, 208, 376, 76, 'FH21 分離シネマ光出力ポート', '長距離無損失 100+ Gbps 光ファイバー直結', '放送・映画セットのリモートヘッド運用へ即座に対応', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'デュアルUSB4 v2（80Gbps・PD 100W）＋HDMI 2.1b＋光CPO端子', line2: '端子内部防水Oリング＆ステンレス補強枠によるIP68耐候設計' },
      { label: '撮影メリット', line1: 'PCや外部レコーダーへの12K RAW転送が瞬時に完了', line2: 'モバイルバッテリーからの100W急速給電で現場充電を革命化' },
      { label: '設計スペック', line1: '左側面タワー 7.5×48×22mm / 非接触光フェルール内蔵', line2: 'タイムコード同期・外部ゲンロック対応' },
    ],
  },
  mirai_fh48_rear_3d_display: {
    badge: 'FH48-16',
    fhTag: FH48_TAG,
    zone: 'optic',
    title: 'FH26/30統合：青色PHOLED高輝度＋メタサーフェス裸眼3D背面液晶',
    analogy: '真夏の直射日光下でもくっきり見え、しかもメガネ無しで撮影直後の立体空間（ライトフィールド）を100度の広視野で覗き込める背面画面です',
    metric: '直射日光HDR · 100°裸眼3D',
    scaleLabel: 'FH26 BLUE-PHOLED + FH30 METASURFACE NAKED-EYE 3D SCREEN',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: () => `
      <rect x="88" y="122" width="244" height="156" rx="14" fill="#0f172a" stroke="#38bdf8" stroke-width="2.4"/>
      <rect x="102" y="136" width="216" height="128" rx="8" fill="#0c4a6e"/>
      <text x="210" y="182" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">青色PHOLED ＋ 裸眼3D</text>
      <text x="210" y="204" text-anchor="middle" font-size="8.6" font-weight="700" fill="#34d399">C2PA PQC · 11.8W/15W · 22段DR</text>
      <text x="210" y="228" text-anchor="middle" font-size="8" font-weight="700" fill="#bae6fd">2D通常表示は解像劣化ゼロで瞬時切替</text>
      ${miraiKpi(352, 118, 330, 78, 'FH26 青色リン光PHOLED＋LTPO', '発光効率4倍で直射日光下HDR＆超省電力', '1–120Hz可変リフレッシュで待機電力を極小化', '#0284c7')}
      ${miraiKpi(352, 208, 330, 76, 'FH30 メタサーフェス100°裸眼3D', '複数人で同時に立体プレビュー確認可能', '3D深度・ライトフィールドの立体感を現場で即座にジャッジ', '#7c3aed')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '高効率青色PHOLEDタンデム＋LTPO背面駆動＋切替式メタ光学指向層', line2: '通常2D撮影時は解像劣化ゼロ、再生時は100°広視野裸眼3Dへ切替' },
      { label: '撮影メリット', line1: '真夏の屋外でもフード無しで22段HDR階調とピントを正確確認', line2: '空間写真・近中距離3D深度の立体奥行きをメガネ無しで即チェック' },
      { label: '設計スペック', line1: '3.2型 76×52×3.0mm チタン枠＋2軸バリアングルヒンジ', line2: 'FH26(78点)・FH30(82点) 統合ディスプレイ' },
    ],
  },
  mirai_fh48_rear_cfrp_shell: {
    badge: 'FH48-17',
    fhTag: FH48_TAG,
    zone: 'pkg',
    title: '背面 CFRP防塵防滴リアカバー＆ピエゾ密閉マルチセレクタ操作群',
    analogy: 'カメラの背中をぐるっと1周の防水ゴムで密閉し、親指で操るジョイスティックやホイールも隙間ゼロの未来感圧構造に仕上げた背面装甲です',
    metric: '全周IP68 EPDM · ピエゾ操作',
    scaleLabel: 'REAR CFRP WEATHER-SEALED SHELL + PIEZO THUMB CONTROLS',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: () => `
      <rect x="88" y="122" width="244" height="156" rx="16" fill="#1e293b" stroke="#10b981" stroke-width="2.4"/>
      <rect x="104" y="138" width="144" height="124" rx="8" fill="#ffffff" stroke="#64748b" stroke-width="1.6"/>
      <text x="176" y="204" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0f172a">3D液晶収容ポケット</text>
      <circle cx="288" cy="170" r="14" fill="#10b981"/>
      <circle cx="288" cy="226" r="24" fill="#334155" stroke="#cbd5e1" stroke-width="2"/>
      <text x="288" y="230" text-anchor="middle" font-size="7.6" font-weight="900" fill="#ffffff">ホイール</text>
      ${miraiKpi(352, 118, 330, 78, 'エルゴノミクス親指集中配置', '右手親指だけでジョイスティック＆ホイール操作', 'FH29ピエゾ非貫通構造で背面の防水弱点を完全克服', '#475569')}
      ${miraiKpi(352, 208, 330, 76, '全周切れ目ないEPDM防塵防滴', 'IP68耐候シームが内部ドライ電子室を死守', '豪雨・砂嵐・極地取材でも安心してシャッターを切り続けられる', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'CFRP背面カバー＋全周一体成形EPDM防水ガスケット', line2: '右手親指側のジョイスティック＆背面ホイールを磁気・ピエゾ非貫通化' },
      { label: '撮影メリット', line1: '液晶を閉じた際にボディと完全にツライチになる薄型保護構造', line2: '過酷な屋外環境下でもボタンの固着や浸水を徹底防御' },
      { label: '設計スペック', line1: '外寸 118×74×5.4mm / 液晶収納凹部 74×50mm', line2: 'IP68準拠耐候シーム＋エメラルドAF-ONジョイスティック' },
    ],
  },
  mirai_fh48_titanium_baseplate: {
    badge: 'FH48-18',
    fhTag: FH48_TAG,
    zone: 'pkg',
    title: '底面 CNCチタン三脚ベースプレート（アルカスイス直結溝＆電池防水蓋）',
    analogy: '別途プレートを買い足さずにそのまま三脚へガッチリ装着でき、底面から全固体電池を素早く交換できる高剛性チタンの土台です',
    metric: 'アルカスイス直結 · 総質量800g',
    scaleLabel: 'CNC TITANIUM ARCA-SWISS BASEPLATE + IP68 BATTERY DOOR',
    accent: '#64748b',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <rect x="86" y="138" width="248" height="122" rx="18" fill="url(#${p}_si)" stroke="#475569" stroke-width="2.2"/>
      <rect x="164" y="152" width="112" height="94" rx="8" fill="#1e293b" stroke="#0f766e" stroke-width="2"/>
      <circle cx="220" cy="199" r="14" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
      <text x="220" y="236" text-anchor="middle" font-size="8" font-weight="900" fill="#34d399">アルカスイス溝一体</text>
      <rect x="98" y="156" width="52" height="86" rx="8" fill="#334155" stroke="#38bdf8" stroke-width="1.8"/>
      <text x="124" y="203" text-anchor="middle" font-size="7.8" font-weight="900" fill="#bae6fd">ASSB蓋</text>
      ${miraiKpi(352, 118, 330, 78, '2028年12月到達点の総決算', '約770〜830g（本体550g＋レンズ250g）', '30〜50万円帯の民主化価格で全48技術の結晶をすべての人へ', '#0f766e')}
      ${miraiKpi(352, 208, 330, 76, '光軸直下の高剛性三脚基準', 'アルカスイス直結＋1/4"-20ステンレス座', '中空格子チタン骨格と10本ボルトで直結しブレゼロ固定', '#475569')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'CNC削り出しチタン底板へアルカスイス互換ダブテール溝を一体加工', line2: '10本ステンレス締結具で中空格子チタン骨格と一体化し剛性基準を形成' },
      { label: '撮影メリット', line1: 'クイックリリースプレート不要で軽量化＆三脚装着時のズレを根絶', line2: 'IP68ラッチ式底面蓋から24Wh全固体電池を数秒でワンタッチ交換' },
      { label: '設計スペック', line1: '底板 120×44×4.6mm / 光軸直下 1/4"-20 ステンレス三脚座', line2: 'FH48 革新性 87点（2028年ポスト・カメラ統合機）' },
    ],
  },
};

export function renderFh48HdSchematicSvg(type: PartExplanation['diagramType']): string | null {
  const spec = FH48_SPECS[type];
  return spec ? renderMiraiMonographSvg(spec) : null;
}
