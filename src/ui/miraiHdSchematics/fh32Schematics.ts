import { PartExplanation } from '../../assemblies/types';
import {
  miraiComparePill,
  MiraiHdSpec,
  miraiKpi,
  miraiPin,
  renderMiraiMonographSvg,
} from './shared';

const FH32_TAG = 'FH32 IP68 MEMS空冷 · 84/100点';

const FH32_SPECS: Partial<Record<PartExplanation['diagramType'], MiraiHdSpec>> = {
  mirai_fh32_intake_grille: {
    badge: 'FH32-01',
    fhTag: FH32_TAG,
    zone: 'cool',
    title: 'CNC防滴吸気プレナムカバー＆12連傾斜スリットルーバー',
    analogy: '雨粒の直撃を斜めのよろい戸で弾きながら、新鮮な外気だけをスムーズに吸い込む極薄チタン蓋',
    metric: '全厚 9.6 mm 統合',
    scaleLabel: '64.4 × 46.4 mm · 12 ANGLED LOUVERS',
    accent: '#0f766e',
    accentSoft: '#ecfdf5',
    art: (p) => `
      <!-- Angled anti-splash intake louvers cross-section -->
      <rect x="86" y="138" width="320" height="22" rx="4" fill="url(#${p}_si)"/>
      <g fill="url(#${p}_metal)" stroke="#475569">
        <polygon points="122,136 144,136 132,162 110,162"/>
        <polygon points="158,136 180,136 168,162 146,162"/>
        <polygon points="194,136 216,136 204,162 182,162"/>
        <polygon points="230,136 252,136 240,162 218,162"/>
        <polygon points="266,136 288,136 276,162 254,162"/>
        <polygon points="302,136 324,136 312,162 290,162"/>
      </g>
      <!-- Air intake curves vs deflected raindrop -->
      <polyline points="154,94 150,148 164,206" fill="none" stroke="#0284c7" stroke-width="2.2" marker-end="url(#${p}_arr_b)"/>
      <polyline points="226,94 222,148 236,206" fill="none" stroke="#0284c7" stroke-width="2.2" marker-end="url(#${p}_arr_b)"/>
      <polyline points="298,94 304,134 338,108" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2" marker-end="url(#${p}_arr_r)"/>
      <text x="348" y="106" font-size="8.4" font-weight="800" fill="#dc2626">飛沫弾き</text>
      <text x="206" y="232" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0369a1">大流量外気（420 cm³/s級）を低圧損で吸入</text>
      ${miraiComparePill(86, 254, 320, '従来回転ファン吸気口：本体内部へ直通で水没即死', false)}
      ${miraiComparePill(86, 286, 320, 'FH32隔離カプセル吸気：濡れても電子部は100%無傷', true)}
      ${miraiKpi(430, 120, 252, 86, '薄型ボディ統合', 'モジュール総厚 9.6 mm', '従来ファン＋ダクト(15mm超)を大幅薄型化', '#0f766e')}
      ${miraiKpi(430, 220, 252, 86, '開放吸気チャネル設計', '低圧損 12連ルーバー', '静圧1,750 Paをフル活用する最適角度', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '12連傾斜CNCルーバーが雨粒直撃を一次偏向', line2: '下部は水密隔離室のため水侵入時も電子部無傷' },
      { label: '撮影メリット', line1: '回転ファンレスでも炎天下8K連続収録が可能', line2: '薄型スチル機サイズへ能動空冷を完全内蔵' },
      { label: '設計スペック', line1: '外形 64.4 × 46.4 mm / CNCチタン調アルマイト', line2: 'エメラルド＆IP68ブルー識別インレイ付' },
    ],
  },
  mirai_fh32_eptfe_water_mesh: {
    badge: 'FH32-02',
    fhTag: FH32_TAG,
    zone: 'cool',
    title: '開放チャネル疎水SUS防塵メッシュ（ePTFE不可の物理根拠）',
    analogy: '目詰まりする防水シートは使わず、空気をたっぷり通しながら砂や泥だけを弾く極細撥水金網',
    metric: '420 cm³/s 高流量通過',
    scaleLabel: 'OPEN HYDROPHOBIC SUS MESH · ZERO AIR CHOKE',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <!-- Scientific clearing chart: Why sealed ePTFE fails 15W vs Open Hydrophobic Mesh -->
      <rect x="82" y="102" width="334" height="196" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="249" y="124" text-anchor="middle" font-size="9.8" font-weight="900" fill="#0f172a">【科学的クリアリング】15W排熱に必要な空気流量 vs 膜透過量</text>
      <text x="96" y="158" font-size="8.8" font-weight="800" fill="#dc2626">× IP68密閉ePTFE通気膜（@1,750 Pa）</text>
      <rect x="96" y="166" width="12" height="22" rx="3" fill="#dc2626"/>
      <text x="116" y="181" font-size="8.6" font-weight="800" fill="#991b1b">わずか 1〜2 cm³/s（必要量の 0.4% → 物理的に不可能！）</text>
      <text x="96" y="216" font-size="8.8" font-weight="800" fill="#059669">◎ 開放チャネル疎水SUS極細防塵メッシュ（FH32採用）</text>
      <rect x="96" y="224" width="296" height="24" rx="4" fill="url(#${p}_cyan)"/>
      <text x="244" y="240" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">≥ 420 cm³/s（25 L/min）低圧損通過 → 15W連続排熱達成</text>
      <text x="249" y="278" text-anchor="middle" font-size="8.2" font-weight="700" fill="#334155">防水の要は「膜」ではなく下層の無孔SUS隔離隔壁（FH32-08）</text>
      ${miraiKpi(436, 110, 248, 86, '正しいIP68方式', 'アイソレーティング構造', 'AirJet Mini Sport 実証方式：\n水没時はメッシュ通過→隔離室で排水回復', '#0284c7')}
      ${miraiKpi(436, 210, 248, 86, '防塵・清掃メンテ', '着脱式撥水SUS金網', '砂塵・糸くず侵入を防ぎ泥詰まりを水洗い可能', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '15W排熱には420cm³/s必要で密閉ePTFE膜は物理不可', line2: '開放疎水SUS網で高流量と防砂・撥水排水を両立' },
      { label: '撮影メリット', line1: '砂浜や雨天での撮影後、水洗い・自然乾燥で完全復帰', line2: '圧力損失を最小化しMEMSの静音性を最大化' },
      { label: '設計スペック', line1: '疎水フッ素コートSUS極細織網＋白PTFE排水枠', line2: '15W排熱時ΔT=30Kの必要空気流量を完全確保' },
    ],
  },
  mirai_fh32_upper_acoustic_plenum: {
    badge: 'FH32-03',
    fhTag: FH32_TAG,
    zone: 'cool',
    title: '上部ヘルムホルツ共鳴静音チャンバー（14–21 dBA消音）',
    analogy: '車のマフラーのように音の波を打ち消し合い、ささやき声より静かに整える消音室',
    metric: '14–21 dBA 極静音',
    scaleLabel: 'HELMHOLTZ RESONANCE PLENUM · DUAL CHAMBER',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <rect x="86" y="114" width="320" height="108" rx="10" fill="url(#${p}_metal)" stroke="#475569" stroke-width="1.8"/>
      <rect x="104" y="130" width="132" height="76" rx="8" fill="#0f172a"/>
      <rect x="256" y="130" width="132" height="76" rx="8" fill="#0f172a"/>
      <text x="170" y="164" text-anchor="middle" font-size="9.2" font-weight="900" fill="#38bdf8">左室 A（位相差 0°）</text>
      <text x="322" y="164" text-anchor="middle" font-size="9.2" font-weight="900" fill="#34d399">右室 B（逆位相 180°）</text>
      <text x="246" y="194" text-anchor="middle" font-size="8.2" font-weight="700" fill="#e2e8f0">ヘルムホルツ吸音リブ＋逆位相音圧相殺</text>
      ${miraiComparePill(86, 240, 320, '従来回転ファン：約 38 dBA（静寂インタビューで録音混入）', false)}
      ${miraiComparePill(86, 272, 320, 'FH32超音波MEMS：約 14〜21 dBA（完全無音ではないが激減）', true)}
      ${miraiKpi(430, 118, 252, 86, '可聴域外の駆動周波数', '> 40 kHz 超音波振動', '膜振動自体は人間の耳に聞こえず\n気流音のみをプレナムで徹底減衰', '#475569')}
      ${miraiKpi(430, 218, 252, 86, 'IBIS干渉ゼロ', '回転軸ブレ 0 μm', 'ベアリング偏心振動がないため\n超望遠スローシャッターも無影響', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '40kHz超の超音波振動は人間の可聴域(20kHz)外', line2: '左右分割ヘルムホルツ室が気流の微小騒音を消音' },
      { label: '撮影メリット', line1: '38dBA回転ファン比で劇的な静音収録を実現', line2: '軸受振動ゼロでIBIS手ブレ補正へ一切悪影響なし' },
      { label: '設計スペック', line1: 'xMEMS約14 dBA / AirJet Mini G2 <21 dBA 級', line2: '2室分離吸音リブ・極薄0.86mmプレナム' },
    ],
  },
  mirai_fh32_mems_jet_chip_a: {
    badge: 'FH32-04',
    fhTag: FH32_TAG,
    zone: 'active',
    title: '核心：超音波圧電シリコンMEMSジェットチップ A（左）',
    analogy: '羽根もモーターも無く、半導体チップ表面の極薄シリコン膜が1秒に4万回以上震えて強風を生む電子うちわ',
    metric: '厚 1.13–2.65 mm',
    scaleLabel: 'xMEMS XMC-4800 / AirJet Mini G2 CLASS',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <!-- Cross section of ultrasonic silicon MEMS membrane pumping high-backpressure jet -->
      <rect x="86" y="148" width="320" height="32" rx="4" fill="url(#${p}_si)" stroke="#38bdf8" stroke-width="1.6"/>
      <!-- Flexing ultrasonic piezo membrane wave -->
      <path d="M 106 164 Q 152 132 198 164 T 290 164 T 382 164" fill="none" stroke="#facc15" stroke-width="3.2"/>
      <!-- High-velocity micro-jets shooting downward -->
      <line x1="152" y1="184" x2="152" y2="274" stroke="#0284c7" stroke-width="3" marker-end="url(#${p}_arr_b)"/>
      <line x1="244" y1="184" x2="244" y2="274" stroke="#0284c7" stroke-width="3" marker-end="url(#${p}_arr_b)"/>
      <line x1="336" y1="184" x2="336" y2="274" stroke="#0284c7" stroke-width="3" marker-end="url(#${p}_arr_b)"/>
      <rect x="86" y="278" width="320" height="24" rx="4" fill="url(#${p}_cu)"/>
      <text x="246" y="294" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">高速マイクロジェットが温度境界層を破壊して抜熱！</text>
      ${miraiPin(198, 152, 206, 108, 1, 'PZT圧電シリコン振動膜 (>40kHz)', '半導体MEMSウェーハで一括量産', '#d97706', 'start')}
      ${miraiKpi(430, 106, 254, 92, '圧倒的静圧性能', '1,100〜1,750 Pa', '薄型ファンの約10倍の静圧で\n極狭カメラ内部ダクトを貫通', '#0284c7')}
      ${miraiKpi(430, 212, 254, 92, '2026年10月量産開始', 'xMEMS XMC-2400/4800', '厚さ1.13mm・150–240mW・IP58\n温度を10〜25℃劇的低減', '#059669')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'PZT圧電薄膜がシリコン膜を超音波振動させ脈動噴射', line2: '1,100〜1,750Pa超高静圧で狭い流路の圧損を突破' },
      { label: '撮影メリット', line1: 'センサー＆SoC温度を10〜25℃劇的低減し暗電流抑制', line2: '回転軸摩耗ゼロで数万時間のメンテナンスフリー寿命' },
      { label: '設計スペック', line1: '24×18×1.13mm / 4×2 独立超音波セル配列', line2: '消費電力 0.15–1.2W 級（xMEMS/AirJet方式）' },
    ],
  },
  mirai_fh32_mems_jet_chip_b: {
    badge: 'FH32-05',
    fhTag: FH32_TAG,
    zone: 'active',
    title: '核心：逆位相デュアル並列MEMSジェットチップ B（右）',
    analogy: '左チップと反対リズムで振動する双子の空冷チップで、揺れを打ち消しつつ冷却力を2倍にする仕組み',
    metric: '2基並列 10–20W級',
    scaleLabel: 'COUNTER-PHASE DUAL MEMS · 180° CANCEL',
    accent: '#0ea5e9',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <!-- Counter-phase wave cancellation diagram -->
      <rect x="82" y="106" width="152" height="86" rx="8" fill="url(#${p}_si)" stroke="#38bdf8" stroke-width="1.6"/>
      <text x="158" y="132" text-anchor="middle" font-size="9.4" font-weight="900" fill="#bae6fd">CHIP A（左：センサー側）</text>
      <path d="M 100 162 Q 129 140 158 162 T 216 162" fill="none" stroke="#38bdf8" stroke-width="2.6"/>
      <rect x="254" y="106" width="152" height="86" rx="8" fill="url(#${p}_si)" stroke="#34d399" stroke-width="1.6"/>
      <text x="330" y="132" text-anchor="middle" font-size="9.4" font-weight="900" fill="#a7f3d0">CHIP B（右：SoC側）</text>
      <path d="M 272 162 Q 301 184 330 162 T 388 162" fill="none" stroke="#34d399" stroke-width="2.6"/>
      <!-- Sum = 0 vibration, 2x airflow -->
      <rect x="82" y="214" width="324" height="90" rx="10" fill="#f0fdf4" stroke="#10b981" stroke-width="1.4"/>
      <text x="244" y="242" text-anchor="middle" font-size="10.4" font-weight="900" fill="#065f46">180° 逆位相駆動 ＝ 振動反力ゼロ ＋ 排熱能力 2×！</text>
      <text x="244" y="266" text-anchor="middle" font-size="8.6" font-weight="700" fill="#334155">センサー側と2nm BIONZ SoC側を独立PWM制御</text>
      <text x="244" y="286" text-anchor="middle" font-size="8.4" font-weight="600" fill="#475569">スチル時は静音低速・8K RAW時はフルブースト</text>
      ${miraiKpi(430, 114, 254, 86, 'コンパクト機 2–3枚並列', '10〜20 W 連続排熱', 'AirJet Mini G2 (7.5W) × 2基相当\n（シネマ10mm厚PAKは45W級）', '#059669')}
      ${miraiKpi(430, 214, 254, 86, 'インテリジェント分担', '独立ゾーン温度制御', 'SoC熱負荷とセンサー暗電流を個別最適化', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '左右チップを180°逆位相で同期駆動し反力を相殺', line2: '2基並列化で10〜20W級の連続能動排熱を確保' },
      { label: '撮影メリット', line1: '8K60p長時間収録でもサーマルスロットリング回避', line2: '静止画撮影時は省電力・極静音モードへ自動移行' },
      { label: '設計スペック', line1: 'デュアル独立制御 / 総流量 2× スケーリング', line2: 'xMEMS/AirJet共通パッケージ互換レイアウト' },
    ],
  },
  mirai_fh32_pzt_wirebond_bridge: {
    badge: 'FH32-06',
    fhTag: FH32_TAG,
    zone: 'link',
    title: '高耐圧PZT駆動用・32本金リボン＆コバール端子枠',
    analogy: '超音波チップへ高電圧の電気パルスを安全に届ける、水に強い特殊金属と純金の架け橋',
    metric: '32本 Auリード・耐湿封止',
    scaleLabel: '32 GOLD ARCH BONDS · KOVAR HV BUSBAR',
    accent: '#eab308',
    accentSoft: '#fefce8',
    art: (p) => `
      <rect x="86" y="208" width="144" height="44" rx="4" fill="url(#${p}_si)"/>
      <rect x="262" y="208" width="144" height="44" rx="4" fill="url(#${p}_metal)"/>
      <text x="158" y="234" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">MEMSチップパッド</text>
      <text x="334" y="234" text-anchor="middle" font-size="9" font-weight="800" fill="#0f172a">コバール高耐圧端子枠</text>
      <!-- Arched gold wirebond with parylene moisture barrier -->
      <path d="M 196 208 Q 246 118 296 208" fill="none" stroke="url(#${p}_gold)" stroke-width="6" stroke-linecap="round"/>
      <path d="M 196 208 Q 246 118 296 208" fill="none" stroke="#38bdf8" stroke-width="11" stroke-opacity="0.26" stroke-linecap="round"/>
      ${miraiPin(246, 160, 260, 114, 1, 'パリレンC防湿コート金リボン', '湿気・結露下でも30〜60V駆動でマイグレーションゼロ', '#ca8a04', 'start')}
      ${miraiKpi(434, 120, 248, 86, '高圧超音波給電', '32本低インピーダンスAu', '40kHz超の急峻な圧電容量充放電に追従', '#eab308')}
      ${miraiKpi(434, 220, 248, 86, '水没回復耐性', '絶縁コンフォーマル保護', '隔離室内が濡れても乾燥後に完全復帰', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '32本アーチ金リードが圧電MEMSへ高圧パルス給電', line2: '全面パリレン防湿絶縁コートで水没ショート防止' },
      { label: '撮影メリット', line1: '雨中撮影や結露環境でも冷却モジュールが故障しない', line2: '高周波スイッチングノイズの放射を最小化' },
      { label: '設計スペック', line1: 'コバール高耐圧バスバー＋32本Auワイヤー', line2: 'パリレンC耐水コンフォーマル封止' },
    ],
  },
  mirai_fh32_nozzle_impingement: {
    badge: 'FH32-07',
    fhTag: FH32_TAG,
    zone: 'cool',
    title: '96孔レーザー加工・銅マイクロジェット衝突ノズル板',
    analogy: '96個の極小シャワーノズルから超高速の空気を銅板へ垂直に叩きつけ、熱の膜を一気に吹き飛ばす熱交換器',
    metric: '96孔 ジェット衝突抜熱',
    scaleLabel: '96 LASER MICRO-ORIFICES · IMPINGEMENT',
    accent: '#d97706',
    accentSoft: '#fff7ed',
    art: (p) => `
      <!-- Impingement jet breaking stagnant thermal boundary layer -->
      <rect x="86" y="138" width="320" height="24" rx="4" fill="url(#${p}_cu)"/>
      <!-- 6 nozzle throats -->
      <g fill="#ffffff">
        <rect x="116" y="138" width="8" height="24"/><rect x="166" y="138" width="8" height="24"/>
        <rect x="216" y="138" width="8" height="24"/><rect x="266" y="138" width="8" height="24"/>
        <rect x="316" y="138" width="8" height="24"/><rect x="366" y="138" width="8" height="24"/>
      </g>
      <!-- Impinging streamlines spreading sideways along hot wall -->
      <g fill="none" stroke="#0284c7" stroke-width="2" marker-end="url(#${p}_arr_b)">
        <path d="M 120 164 L 120 238 Q 120 250 100 250"/>
        <path d="M 170 164 L 170 238 Q 170 250 192 250"/>
        <path d="M 220 164 L 220 238 Q 220 250 198 250"/>
        <path d="M 270 164 L 270 238 Q 270 250 292 250"/>
        <path d="M 320 164 L 320 238 Q 320 250 298 250"/>
        <path d="M 370 164 L 370 238 Q 370 250 392 250"/>
      </g>
      <rect x="86" y="256" width="320" height="26" rx="4" fill="url(#${p}_metal)"/>
      <text x="246" y="273" text-anchor="middle" font-size="9" font-weight="900" fill="#0f172a">IP68隔離隔壁（上面へ高速噴流が垂直衝突！）</text>
      ${miraiKpi(430, 114, 254, 88, '熱伝達率の劇的向上', 'h = 3〜5× 層流比', '垂直衝突流がよどみ空気層を破壊し\n狭い体積で圧倒的な放熱効率を発揮', '#d97706')}
      ${miraiKpi(430, 216, 254, 88, '96オリフィス精密配列', '48孔 × 2バンク', 'センサー側・SoC側へ均等ジェット噴射', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '96孔マイクロノズルが高速脈動ジェットを垂直噴射', line2: '断熱壁となる温度境界層を突き破り熱伝達3〜5倍' },
      { label: '撮影メリット', line1: '小型ボディでも4K/8Kの連続熱暴走を確実に抑止', line2: '大面積ヒートシンク無しで高密度熱源を瞬時冷却' },
      { label: '設計スペック', line1: 'C1100純銅板 / 96微細レーザーオリフィス', line2: '左右48孔ずつデュアルMEMSチップ直下配置' },
    ],
  },
  mirai_fh32_ip68_isolation_wall: {
    badge: 'FH32-08',
    fhTag: FH32_TAG,
    zone: 'pkg',
    title: '核心：IP68完全水密ステンレス隔離隔壁（電子部⇄空冷室遮断）',
    analogy: '水や砂が通る空冷室と、精密電子回路のあいだを1滴も通さない無孔の金属壁で完全に区切るIP68の心臓部',
    metric: '水深1.5m・30分 IP68',
    scaleLabel: 'SEAMLESS LASER-WELDED SUS304 BARRIER',
    accent: '#0f766e',
    accentSoft: '#ecfdf5',
    art: (p) => `
      <!-- Clear Wet Air Chamber vs Dry Electronics separation diagram -->
      <rect x="84" y="102" width="324" height="72" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
      <text x="246" y="132" text-anchor="middle" font-size="10.4" font-weight="900" fill="#0369a1">【上部：外気・耐水MEMS空冷室（WET ZONE）】</text>
      <text x="246" y="154" text-anchor="middle" font-size="8.6" font-weight="700" fill="#0284c7">高速外気通過・水没時は内部浸水→乾燥後完全回復</text>
      <!-- Impervious SUS304 Laser-Welded Wall -->
      <rect x="76" y="182" width="340" height="32" rx="4" fill="url(#${p}_metal)" stroke="#0f172a" stroke-width="2.2"/>
      <text x="246" y="202" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0f172a">無孔SUS304完全水密隔離隔壁（熱のみ通過・水0滴）</text>
      <!-- Dry Electronics Zone below -->
      <rect x="84" y="222" width="324" height="78" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.6"/>
      <text x="246" y="252" text-anchor="middle" font-size="10.4" font-weight="900" fill="#065f46">【下部：カメラ本体・センサー／SoC電子室（DRY ZONE）】</text>
      <text x="246" y="274" text-anchor="middle" font-size="8.6" font-weight="700" fill="#047857">ベイパーチャンバー＋圧電基板をIP68完全隔離保護</text>
      <!-- Heat arrows crossing UP through solid wall -->
      <line x1="154" y1="224" x2="154" y2="174" stroke="#dc2626" stroke-width="2.6" marker-end="url(#${p}_arr_r)"/>
      <line x1="338" y1="224" x2="338" y2="174" stroke="#dc2626" stroke-width="2.6" marker-end="url(#${p}_arr_r)"/>
      ${miraiKpi(430, 108, 254, 92, 'IP68耐水実証構造', '1.5 m / 30分 水没耐性', 'Frore AirJet Mini Sport 同等の\nアイソレーティング・カプセル隔離設計', '#0f766e')}
      ${miraiKpi(430, 214, 254, 92, '接触熱抵抗最小化', '0.58 mm 薄肉高伝導壁', '外周レーザーシーム溶接＋\n下面VC全面ロウ付け直結', '#d97706')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '空冷室と電子室を無孔SUS304壁で物理完全遮断', line2: '熱伝導だけを通して水・塩分・砂塵を100%遮断' },
      { label: '撮影メリット', line1: '豪雨・砂嵐・水しぶきの中でも能動空冷を継続可能', line2: '万一の水没でもカメラ内部電子基板は1滴も濡れない' },
      { label: '設計スペック', line1: '肉厚 0.58mm SUS304 / 全周レーザーシーム溶接', line2: 'IP68（水深1.5m・30分）対応隔離カプセル骨格' },
    ],
  },
  mirai_fh32_exhaust_duct_manifold: {
    badge: 'FH32-09',
    fhTag: FH32_TAG,
    zone: 'cool',
    title: '側方ラビリンス防水排気マニホールド＆逆流防止排水弁',
    analogy: '温まった空気を6つの出口から一気に逃がし、もし水が入っても迷路構造で外へ自動排出する排水排気口',
    metric: '6連迷路排気・自動排水',
    scaleLabel: '2-STAGE LABYRINTH EXHAUST + DRAIN FLAP',
    accent: '#0ea5e9',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <!-- Labyrinth exhaust cross section -->
      <rect x="86" y="124" width="320" height="148" rx="10" fill="url(#${p}_si)" stroke="#334155" stroke-width="1.8"/>
      <rect x="106" y="142" width="280" height="112" rx="6" fill="#f8fafc"/>
      <!-- Labyrinth baffle walls -->
      <rect x="176" y="142" width="16" height="72" fill="#334155"/>
      <rect x="262" y="182" width="16" height="72" fill="#334155"/>
      <!-- Warm exhaust path snaking out -->
      <polyline points="116,174 156,174 156,232 238,232 238,164 316,164 380,164" fill="none" stroke="#dc2626" stroke-width="3" marker-end="url(#${p}_arr_r)"/>
      <text x="348" y="152" text-anchor="middle" font-size="8.4" font-weight="900" fill="#dc2626">温風排気</text>
      <!-- Water drain trap at bottom -->
      <path d="M 332 234 L 382 246" fill="none" stroke="#0284c7" stroke-width="2.4" marker-end="url(#${p}_arr_b)"/>
      <text x="328" y="226" font-size="8" font-weight="800" fill="#0284c7">水抜きドレイン</text>
      ${miraiKpi(430, 124, 254, 72, '撮影者への熱風回避', '背面・側方分散排気', '右手グリップや顔へ温風が当たらない設計', '#dc2626')}
      ${miraiKpi(430, 208, 254, 72, '撥水逆流防止フラップ', 'シリコーン排水弁×6', '泥水の逆流を抑え水没後の速やかな水抜きを促進', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '2段ラビリンス迷路で排気圧損を抑えつつ水滴分離', line2: '6連ノズル＋撥水フラップで排水と逆流防止を両立' },
      { label: '撮影メリット', line1: 'グリップを持つ手に不快な熱風が当たらない', line2: '雨滴や水しぶきが排気口から入っても即座に排水' },
      { label: '設計スペック', line1: '6連分散排気ノズル / シリコーン排水リップ付', line2: '全幅 54.0 mm 背面マニホールド' },
    ],
  },
  mirai_fh32_perimeter_oring: {
    badge: 'FH32-10',
    fhTag: FH32_TAG,
    zone: 'pkg',
    title: 'IP68二重リップ・フルオロシリコーン水密Oリング',
    analogy: '潜水艦のハッチのように2重のゴムパッキンでカプセル全周をピタリと密閉する耐候リング',
    metric: '二重リップ圧着封止',
    scaleLabel: 'FLUOROSILICONE DUAL-LIP IP68 O-RING',
    accent: '#06b6d4',
    accentSoft: '#ecfeff',
    art: (p) => `
      <rect x="92" y="114" width="308" height="186" rx="22" fill="none" stroke="url(#${p}_cyan)" stroke-width="14"/>
      <rect x="114" y="136" width="264" height="142" rx="14" fill="none" stroke="#334155" stroke-width="7" stroke-dasharray="10 4"/>
      <text x="246" y="198" text-anchor="middle" font-size="11" font-weight="900" fill="#0369a1">二重リップ圧縮シール</text>
      <text x="246" y="220" text-anchor="middle" font-size="8.8" font-weight="700" fill="#475569">−40℃〜+150℃ 弾性維持（フルオロシリコーン）</text>
      ${miraiKpi(430, 120, 254, 82, '圧縮率制御', '適正圧縮 22–28%', '8本トルクスボルトで全周均一圧着', '#0891b2')}
      ${miraiKpi(430, 216, 254, 82, '耐油・耐塩害', 'フッ素変性エラストマー', '皮脂・潮風・極寒環境での硬化劣化を防止', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '外周ブルー＆内周EPDMの2重冗長リップ圧縮封止', line2: '広い温度帯で弾性を失わないフルオロシリコーン材' },
      { label: '撮影メリット', line1: '雪山の氷点下から真夏の炎天下までIP68防水維持', line2: '防塵防滴性能の経年劣化を極限まで抑制' },
      { label: '設計スペック', line1: '外周 62.4×44.4mm / 耐熱 −40〜+150℃', line2: '8点均一圧縮フランジ設計' },
    ],
  },
  mirai_fh32_vc_top_copper: {
    badge: 'FH32-11',
    fhTag: FH32_TAG,
    zone: 'cool',
    title: '極薄銅マイクロ・ベイパーチャンバー天板（部分カット透視）',
    analogy: 'センサーやSoCの局所的な熱を一瞬で全面へ広げる、内部に水蒸気が循環する極薄の銅マジックプレート',
    metric: '等価熱伝導 > 4,000 W/mK',
    scaleLabel: '0.44 mm C1100 COPPER MICRO-VC LID',
    accent: '#ea580c',
    accentSoft: '#fff7ed',
    art: (p) => `
      <!-- Vapor Chamber thermodynamic cycle diagram -->
      <rect x="84" y="118" width="324" height="22" rx="4" fill="url(#${p}_cu)"/>
      <rect x="84" y="256" width="324" height="24" rx="4" fill="url(#${p}_cu)"/>
      <rect x="84" y="140" width="324" height="116" fill="#fff7ed" stroke="#ea580c"/>
      <!-- Rising vapor arrows in center, liquid return along wick -->
      <path d="M 164 246 L 164 152" stroke="#dc2626" stroke-width="2.6" marker-end="url(#${p}_arr_r)"/>
      <path d="M 328 246 L 328 152" stroke="#dc2626" stroke-width="2.6" marker-end="url(#${p}_arr_r)"/>
      <path d="M 164 152 L 246 152 L 246 246" stroke="#0284c7" stroke-width="2.4" stroke-dasharray="4 2" marker-end="url(#${p}_arr_b)"/>
      <text x="164" y="204" text-anchor="middle" font-size="8.4" font-weight="900" fill="#dc2626">蒸発↑</text>
      <text x="246" y="204" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0284c7">凝縮還流↓</text>
      <text x="328" y="204" text-anchor="middle" font-size="8.4" font-weight="900" fill="#dc2626">蒸発↑</text>
      <text x="246" y="298" text-anchor="middle" font-size="9" font-weight="800" fill="#9a3412">左：センサー熱源　／　右：2nm BIONZ SoC熱源を全面均熱</text>
      ${miraiKpi(430, 120, 254, 82, '純銅の10倍超の均熱力', 'k_eff > 4,000 W/m·K', '減圧純水の潜熱相変化でホットスポットを瞬時均平化', '#ea580c')}
      ${miraiKpi(430, 216, 254, 82, '隔離隔壁へ全面放熱', '上下全面サーマル直結', '上面の96孔MEMSジェットへ均等に熱を受け渡す', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '真空純銅室内の純水気化・凝縮サイクルで超高速均熱', line2: '局所ホットスポットを全面へ広げMEMSジェット効率最大化' },
      { label: '撮影メリット', line1: 'センサー中央部だけ高温になる暗電流ムラを防止', line2: '2nm SoCの瞬時AI演算バースト熱を即座に拡散' },
      { label: '設計スペック', line1: '58×40mm C1100純銅 / 減圧純水作動流体', line2: '左端ピンチオフ封止管・3D透視カット付' },
    ],
  },
  mirai_fh32_vc_sintered_wick: {
    badge: 'FH32-12',
    fhTag: FH32_TAG,
    zone: 'cool',
    title: '焼結銅多孔質ウィック＆48本耐圧マイクロ支柱アレイ',
    analogy: 'スポンジのような銅の微細粒が毛細管現象で水を引き戻し、48本の銅の柱が真空の潰れを防ぐ内部骨格',
    metric: '48本銅支柱・毛細管還流',
    scaleLabel: 'SINTERED COPPER WICK + 48 SUPPORT PILLARS',
    accent: '#c2410c',
    accentSoft: '#fff7ed',
    art: (p) => `
      <rect x="86" y="114" width="318" height="176" rx="10" fill="url(#${p}_cu)" opacity="0.22" stroke="#c2410c" stroke-width="1.8"/>
      <!-- 8x4 array of copper pillars + arterial channels -->
      <g fill="url(#${p}_cu)" stroke="#7c2d12" stroke-width="1">
        <circle cx="122" cy="148" r="8"/><circle cx="164" cy="148" r="8"/><circle cx="206" cy="148" r="8"/><circle cx="248" cy="148" r="8"/><circle cx="290" cy="148" r="8"/><circle cx="332" cy="148" r="8"/><circle cx="374" cy="148" r="8"/>
        <circle cx="122" cy="196" r="8"/><circle cx="164" cy="196" r="8"/><circle cx="206" cy="196" r="8"/><circle cx="248" cy="196" r="8"/><circle cx="290" cy="196" r="8"/><circle cx="332" cy="196" r="8"/><circle cx="374" cy="196" r="8"/>
        <circle cx="122" cy="244" r="8"/><circle cx="164" cy="244" r="8"/><circle cx="206" cy="244" r="8"/><circle cx="248" cy="244" r="8"/><circle cx="290" cy="244" r="8"/><circle cx="332" cy="244" r="8"/><circle cx="374" cy="244" r="8"/>
      </g>
      <text x="245" y="280" text-anchor="middle" font-size="9" font-weight="900" fill="#7c2d12">焼結銅粉ウィック ＋ 48本耐圧支柱（縦位置・逆さ撮影対応）</text>
      ${miraiKpi(428, 120, 256, 82, 'あらゆるカメラ姿勢に対応', '抗重力・毛細管ポンプ', '縦位置・俯瞰・仰角撮影でも\n焼結銅の毛細管力でドライアウトゼロ', '#c2410c')}
      ${miraiKpi(428, 216, 256, 82, '極薄1.6mm真空耐圧', '48本マイクロ銅ピラー', '大気圧とボルト締付圧に対する潰れを防止', '#9a3412')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '焼結銅微細多孔質ウィックが重力に逆らい液相還流', line2: '48本の純銅ピラーが減圧チャンバーの座屈を防止' },
      { label: '撮影メリット', line1: '縦位置ポートレートや三脚俯瞰でも冷却性能不変', line2: '長年の振動・温度サイクルに耐える全金属ろう付け' },
      { label: '設計スペック', line1: '焼結銅粒径 45–75μm / 48本支柱グリッド', line2: '動脈状蒸気還流チャネル複合構造' },
    ],
  },
  mirai_fh32_vc_bottom_plate: {
    badge: 'FH32-13',
    fhTag: FH32_TAG,
    zone: 'cool',
    title: 'ベイパーチャンバー底板＆2系統（センサー／SoC）受熱台座',
    analogy: 'カメラの中で一番熱い「センサー」と「頭脳チップ」の2ヶ所から熱を一気に吸い上げる純銅の双子受熱台',
    metric: '2大熱源 一筆書き抜熱',
    scaleLabel: 'DUAL COLD-PLATE BOSSES (SENSOR + 2nm SoC)',
    accent: '#b45309',
    accentSoft: '#fffbeb',
    art: (p) => `
      <rect x="86" y="128" width="320" height="36" rx="6" fill="url(#${p}_cu)"/>
      <text x="246" y="150" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">ベイパーチャンバー蒸発底板（C1100純銅）</text>
      <rect x="104" y="164" width="124" height="58" rx="6" fill="#0284c7" fill-opacity="0.22" stroke="#0284c7" stroke-width="2"/>
      <text x="166" y="190" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0369a1">左ボス：センサー側</text>
      <text x="166" y="208" text-anchor="middle" font-size="8.2" font-weight="700" fill="#475569">FH01/FH02 暗電流低減</text>
      <rect x="264" y="164" width="124" height="58" rx="6" fill="#e11d48" fill-opacity="0.18" stroke="#e11d48" stroke-width="2"/>
      <text x="326" y="190" text-anchor="middle" font-size="9.4" font-weight="900" fill="#be123c">右ボス：2nm SoC側</text>
      <text x="326" y="208" text-anchor="middle" font-size="8.2" font-weight="700" fill="#475569">FH20 + CFexpress 5.0</text>
      <line x1="166" y1="254" x2="166" y2="226" stroke="#0284c7" stroke-width="2.4" marker-end="url(#${p}_arr_b)"/>
      <line x1="326" y1="254" x2="326" y2="226" stroke="#dc2626" stroke-width="2.4" marker-end="url(#${p}_arr_r)"/>
      <text x="246" y="282" text-anchor="middle" font-size="9" font-weight="800" fill="#0f172a">ASI熱流体最適化による「2大熱源同時冷却」</text>
      ${miraiKpi(430, 128, 254, 152, 'トータル熱収支', '10〜20 W 連続処理', '・SoC 8K RAW 演算発熱\n・CFexpress 5.0 書込発熱\n・センサー連続読出発熱\nを単一モジュールで一括回収', '#b45309')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '2系統の段付き純銅受熱ボスが基板開口を貫通密着', line2: 'センサーと2nm SoCの熱を単一VCで一括均熱化' },
      { label: '撮影メリット', line1: '動画熱停止とセンサー暗所ノイズ増大を同時に解決', line2: 'CFexpress 5.0カードスロット近傍の温度も劇的低下' },
      { label: '設計スペック', line1: '受熱ボス 21×24mm ×2系統 / 平面度 ≤ 15μm', line2: 'C1100無酸素銅・デュアルTIM対応' },
    ],
  },
  mirai_fh32_piezo_driver_pcb: {
    badge: 'FH32-14',
    fhTag: FH32_TAG,
    zone: 'link',
    title: '超音波圧電高圧ドライバHDI基板（40 kHz超ブースト駆動）',
    analogy: '電池の低い電圧を一瞬で高電圧の超音波リズムに変換し、2枚の空冷チップを自在に操る専用電子頭脳',
    metric: '40 kHz+ 昇圧駆動',
    scaleLabel: '6-LAYER HDI PCB · 2× HV ASIC · 4× INDUCTOR',
    accent: '#059669',
    accentSoft: '#ecfdf5',
    art: (p) => `
      <rect x="84" y="114" width="324" height="176" rx="10" fill="url(#${p}_green)" stroke="#065f46" stroke-width="2"/>
      <rect x="128" y="152" width="236" height="100" rx="8" fill="#ffffff" stroke="#065f46" stroke-dasharray="4 2"/>
      <text x="246" y="206" text-anchor="middle" font-size="9.4" font-weight="800" fill="#065f46">中央開口（純銅受熱ボス貫通窓）</text>
      <!-- 2 HV ASICs + 4 Boost Inductors -->
      <rect x="116" y="258" width="52" height="22" rx="3" fill="url(#${p}_si)"/><text x="142" y="273" text-anchor="middle" font-size="7.6" font-weight="800" fill="#fff">HV-DRV A</text>
      <rect x="324" y="258" width="52" height="22" rx="3" fill="url(#${p}_si)"/><text x="350" y="273" text-anchor="middle" font-size="7.6" font-weight="800" fill="#fff">HV-DRV B</text>
      <rect x="122" y="122" width="30" height="22" rx="3" fill="#475569"/><rect x="184" y="122" width="30" height="22" rx="3" fill="#475569"/>
      <rect x="278" y="122" width="30" height="22" rx="3" fill="#475569"/><rect x="340" y="122" width="30" height="22" rx="3" fill="#475569"/>
      ${miraiKpi(430, 114, 254, 84, '高効率エネルギー回収', '容量性回生ドライバ', 'PZT圧電素子の無効電力を回生し\n消費電力を 0.3〜2.4 W へ極小化', '#059669')}
      ${miraiKpi(430, 210, 254, 84, '完全ドライ室実装', 'IP68隔壁の下面配置', '高圧回路は100%水密隔離された本体側へ収容', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '4基の昇圧コイル＋2基の高圧ASICで40kHz+駆動', line2: '圧電容量の電荷回生回路で消費電力を大幅節約' },
      { label: '撮影メリット', line1: 'バッテリー持ちを損ねず常時能動冷却を維持', line2: '温度に応じた無段階PWM制御で騒音と省電力を両立' },
      { label: '設計スペック', line1: '6層HDI基板 / HV ASIC×2 / 昇圧コイル×4 / 24 MLCC', line2: 'カメラ側バッテリー電圧(7.2V)から直接昇圧' },
    ],
  },
  mirai_fh32_control_fpc: {
    badge: 'FH32-15',
    fhTag: FH32_TAG,
    zone: 'link',
    title: 'I²C温度テレメトリ＆電源給電S字シールドFPCハーネス',
    analogy: 'カメラ本体の頭脳と冷却モジュールをつなぎ、温度報告と回転指令をやり取りするしなやかな電線リボン',
    metric: 'I²C 閉ループ温度制御',
    scaleLabel: '16-PIN ZIF · EMI-SHIELDED S-CURVE FPC',
    accent: '#d97706',
    accentSoft: '#fffbeb',
    art: (p) => `
      <path d="M 96 154 L 180 154 C 232 154 232 246 286 246 L 376 246" fill="none" stroke="url(#${p}_cu)" stroke-width="26" stroke-linecap="round"/>
      <path d="M 116 146 L 180 146 C 232 146 232 238 286 238 L 356 238" fill="none" stroke="#334155" stroke-width="6" stroke-dasharray="6 3"/>
      <rect x="358" y="228" width="44" height="36" rx="4" fill="#f8fafc" stroke="#ca8a04" stroke-width="2"/>
      <text x="380" y="250" text-anchor="middle" font-size="8.2" font-weight="900" fill="#854d0e">16p ZIF</text>
      ${miraiPin(234, 198, 120, 260, 1, 'EMIシールドS字ポリイミド配線', '40kHz昇圧ノイズが音声マイクへ乗るのを遮蔽', '#d97706', 'start')}
      ${miraiKpi(430, 120, 254, 152, '本体SoCとの協調制御', 'I²C / PWM 双方向通信', '・センサー＆SoC温度を毎秒100回監視\n・動画REC中／音声収録中は静音プロファイル\n・熱停止警告の10秒前に先読みブースト冷却', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '全面導電EMIシールドで高周波駆動ノイズを遮断', line2: 'S字屈曲リリーフで本体組付公差と衝撃を吸収' },
      { label: '撮影メリット', line1: '動画撮影開始と同時に先読み冷却で温度上昇を抑制', line2: 'オーディオ回路への電磁ノイズ飛び込みを防止' },
      { label: '設計スペック', line1: '16極金ZIFコネクタ / I²C + 7.2V給電ライン', line2: 'ポリイミド多層FPC＋銀導電シールド層' },
    ],
  },
  mirai_fh32_thermal_tim_pads: {
    badge: 'FH32-16',
    fhTag: FH32_TAG,
    zone: 'cool',
    title: '高熱伝導デュアルゾーンTIMパッド（センサー＆SoC直結）',
    analogy: '金属同士のミクロな隙間をピタッと埋めて熱の通り道を太くする、青とピンクの超やわらか伝熱クッション',
    metric: '14 W/m·K 超追従TIM',
    scaleLabel: 'DUAL-ZONE SILICONE TIM (BLUE / PINK)',
    accent: '#ec4899',
    accentSoft: '#fdf2f8',
    art: (p) => `
      <rect x="92" y="128" width="144" height="140" rx="14" fill="url(#${p}_cyan)" opacity="0.78" stroke="#0284c7" stroke-width="2"/>
      <text x="164" y="192" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">センサー専用</text>
      <text x="164" y="212" text-anchor="middle" font-size="8.6" font-weight="800" fill="#e0f2fe">ブルー超軟質TIM</text>
      <text x="164" y="232" text-anchor="middle" font-size="7.8" font-weight="700" fill="#f0f9ff">低反力でIBIS/平面保護</text>
      <rect x="256" y="128" width="144" height="140" rx="14" fill="url(#${p}_red)" opacity="0.68" stroke="#db2777" stroke-width="2"/>
      <text x="328" y="192" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">2nm SoC専用</text>
      <text x="328" y="212" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fce7f3">ピンク高熱流束TIM</text>
      <text x="328" y="232" text-anchor="middle" font-size="7.8" font-weight="700" fill="#fff1f2">14 W/m·K 極低熱抵抗</text>
      ${miraiKpi(426, 128, 258, 140, '接触熱抵抗 -60%低減', 'R_th ≤ 0.12 K·cm²/W', 'センサー側とSoC側で最適な硬度と\n熱伝導フィラー配合を分離設計し\n応力歪みゼロと最高抜熱を両立', '#db2777')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'アルミナ・窒化ホウ素高充填シリコーンTIMパッド', line2: '青(低応力センサー側)・ピンク(高熱流SoC側)の最適分離' },
      { label: '撮影メリット', line1: '組立公差の空気ギャップを完全に埋め冷却効率最大化', line2: '衝撃や落下時の半導体チップ割れもクッション保護' },
      { label: '設計スペック', line1: '熱伝導率 14 W/m·K / 厚さ 0.62mm 高追従シート', line2: '20.4 × 23.2 mm × 2ゾーン独立配置' },
    ],
  },
  mirai_fh32_mg_carrier_chassis: {
    badge: 'FH32-17',
    fhTag: FH32_TAG,
    zone: 'pkg',
    title: 'CNCマグネシウム水密カプセル主骨格シャーシ',
    analogy: 'すべての空冷パーツをがっちり支えてカメラ本体へ固定する、軽くて歪まないマグネシウムのゆりかご',
    metric: '66 × 48 mm 軽量骨格',
    scaleLabel: 'AZ91D CNC Mg CRADLE · 8 THREADED BOSSES',
    accent: '#64748b',
    accentSoft: '#f8fafc',
    art: (p) => `
      <rect x="86" y="114" width="320" height="184" rx="14" fill="url(#${p}_metal)" stroke="#475569" stroke-width="2"/>
      <rect x="114" y="142" width="120" height="128" rx="8" fill="#ffffff" stroke="#64748b"/>
      <rect x="258" y="142" width="120" height="128" rx="8" fill="#ffffff" stroke="#64748b"/>
      <text x="174" y="210" text-anchor="middle" font-size="9" font-weight="800" fill="#0369a1">センサー受熱窓</text>
      <text x="318" y="210" text-anchor="middle" font-size="9" font-weight="800" fill="#be123c">SoC受熱窓</text>
      <text x="246" y="132" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0f172a">中央剛性ブリッジ＆8点めねじ締結ボス</text>
      ${miraiKpi(430, 118, 254, 84, '薄型高剛性クレードル', '総質量 < 32 g（ユニット計）', 'マグネシウム肉抜き設計でカメラ総重量増を最小化', '#475569')}
      ${miraiKpi(430, 216, 254, 84, '均等Oリング圧着', '8点全周締結フレーム', 'IP68パッキンの浮き・水漏れを構造的に根絶', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '中央ブリッジ付きCNCマグネシウム高剛性クレードル', line2: '8点均等配置のめねじボスがIP68ガスケットを均一圧着' },
      { label: '撮影メリット', line1: '能動空冷を搭載してもボディの軽快な携行性を維持', line2: '4点SUS基準スタンドオフで本体フレームへ強固固定' },
      { label: '設計スペック', line1: '外形 66.0 × 48.0 mm / AZ91Dマグネシウム合金', line2: '2系統冷板開口＋4点SUS基準スタンドオフ' },
    ],
  },
  mirai_fh32_seal_torx_bolts: {
    badge: 'FH32-18',
    fhTag: FH32_TAG,
    zone: 'pkg',
    title: '防水Oリング付 M1.4 精密トルクス締結ボルト×8',
    analogy: '8本のステンレス精密ねじとチタン座金で全18層を均一に締め上げ、IP68防水を完結させる最後のロック',
    metric: '8点均一トルク締結',
    scaleLabel: '8× M1.4 SUS TORX + TITANIUM SEAL WASHERS',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <!-- Detailed bolt + captive washer cross-section -->
      <rect x="184" y="114" width="124" height="32" rx="6" fill="url(#${p}_metal)" stroke="#334155" stroke-width="2"/>
      <rect x="164" y="146" width="164" height="14" rx="4" fill="url(#${p}_cyan)" stroke="#0284c7"/>
      <rect x="218" y="160" width="56" height="128" rx="4" fill="url(#${p}_metal)" stroke="#475569" stroke-width="1.6"/>
      <g stroke="#475569" stroke-width="1.6">
        <line x1="218" y1="184" x2="274" y2="176"/><line x1="218" y1="204" x2="274" y2="196"/>
        <line x1="218" y1="224" x2="274" y2="216"/><line x1="218" y1="244" x2="274" y2="236"/>
        <line x1="218" y1="264" x2="274" y2="256"/>
      </g>
      ${miraiPin(246, 130, 88, 124, 1, 'T4 トルクス精密頭', 'カムアウトゼロで均一締結', '#334155', 'start')}
      ${miraiPin(324, 153, 356, 152, 2, 'チタン防水シール座金', 'ねじ穴からの毛細管浸水を遮断', '#0284c7', 'start')}
      ${miraiKpi(364, 198, 318, 96, 'IP68締結完了チェック', 'M1.4 × 8本（0.18 N·m）', '外周66×48mmを均等ピッチ締結し\n水深1.5m/30分でもパッキン潰れ代を厳守', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '8本M1.4 SUSトルクスボルトが全周25%圧縮を均等維持', line2: '座下チタン＋シールカラーでねじ山経由の浸水を防止' },
      { label: '撮影メリット', line1: '防塵フィルタ交換や保守点検時も高精度に再組付け可能', line2: '耐塩害SUS316相当処理で海辺・雪中撮影でも錆びない' },
      { label: '設計スペック', line1: 'M1.4×9.2mm SUS精密トルクス ×8本', line2: '規定締付トルク 0.18 N·m / 緩み止め剤付' },
    ],
  },
};

export function renderFh32HdSchematicSvg(type: PartExplanation['diagramType']): string | null {
  const spec = FH32_SPECS[type];
  return spec ? renderMiraiMonographSvg(spec) : null;
}
