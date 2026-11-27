import { PartExplanation } from '../../assemblies/types';
import {
  MiraiHdSpec,
  miraiKpi,
  renderMiraiMonographSvg,
} from './shared';

const FH17_TAG = 'FH17 磁気IBIS · 73/100点';

const FH17_SPECS: Partial<Record<PartExplanation['diagramType'], MiraiHdSpec>> = {
  mirai_fh17_dust_shield_bezel: {
    badge: 'FH17-01',
    fhTag: FH17_TAG,
    zone: 'optic',
    title: '前面遮光マスク＆超音波防塵（ARコート光学ローパスレス）保護枠',
    analogy: '宙に浮かぶフルサイズセンサーの正面を守り、付いたホコリを超音波振動で弾き飛ばす透明シールド付きマスクです',
    metric: '36×24mm 開口 · 透過99.5%',
    scaleLabel: 'FRONT AR DUST-SHIELD BEZEL · 54×42mm',
    accent: '#0f766e',
    accentSoft: '#ccfbf1',
    art: (p) => `
      <rect x="92" y="114" width="234" height="174" rx="16" fill="#1e293b" stroke="#475569" stroke-width="2"/>
      <rect x="122" y="138" width="174" height="126" rx="8" fill="url(#${p}_glass)" stroke="#10b981" stroke-width="2.5"/>
      <text x="209" y="196" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0f172a">36×24 mm 光学開口</text>
      <text x="209" y="216" text-anchor="middle" font-size="8.4" font-weight="700" fill="#0f766e">超音波防塵＋帯電防止マルチAR</text>
      ${miraiKpi(346, 118, 336, 78, '超低反射＆ダストフリー', '表面反射 < 0.3% · 100kHz超音波除塵', 'レンズ交換時のホコリ付着を弾きセンサー清掃頻度を激減', '#0f766e')}
      ${miraiKpi(346, 208, 336, 76, '大ストローク非接触クリアランス', 'CIPA 10–11段補正時もケラレゼロ', '最大シフト＆±2°チルト可動域を確保した広角開口設計', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '帯電防止マルチAR光学ガラス＋超音波振動ダストシェイカー', line2: '磁気浮上IBISの±2°チルト＆大シフト時でも光束を遮らない開口' },
      { label: '撮影メリット', line1: 'ローパスフィルターレスで高画素・メタレンズの解像を100%発揮', line2: '屋外レンズ交換でもゴミ写り込みを最小化' },
      { label: '設計スペック', line1: '外寸 54×42mm / 有効開口 37.6×25.6mm', line2: 'エメラルドMIRAI基準環＋マット黒色迷光防止処理' },
    ],
  },
  mirai_fh17_ff_sensor_die: {
    badge: 'FH17-02',
    fhTag: FH17_TAG,
    zone: 'active',
    title: '浮上搭載フルサイズ 36×24 mm 次世代積層シリコンセンサーダイ',
    analogy: 'カメラの「眼」そのものが磁気の力で空中にフワッと浮き、撮影者の手ブレも地球の自転もすべて打ち消して静止します',
    metric: '36×24mm · 視覚閉ループ対応',
    scaleLabel: 'MAGLEV-SUSPENDED FULL-FRAME 36×24mm SENSOR DIE',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: () => `
      <rect x="92" y="122" width="234" height="160" rx="10" fill="#1e293b" stroke="#e2b648" stroke-width="2.4"/>
      <rect x="114" y="142" width="190" height="120" rx="6" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
      <text x="209" y="196" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">フルサイズ 36×24 mm</text>
      <text x="209" y="216" text-anchor="middle" font-size="8.4" font-weight="700" fill="#bae6fd">像面リアルタイム視覚モーション検出</text>
      ${miraiKpi(346, 120, 336, 78, '視覚フィードバック閉ループ', 'ジャイロ＋撮像面フレーム間微動検出', '長秒露光時のジャイロドリフトを撮像素子自身の像移動で補正', '#0284c7')}
      ${miraiKpi(346, 210, 336, 74, 'FH01/FH02/FH13 完全互換', '軽量薄化パッケージで慣性質量を最小化', '高速10kHz磁気浮上サーボの応答帯域を最大化', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'アルミナセラミック超軽量パッケージ＋金ワイヤボンディング', line2: '画素層からの視覚モーション情報を10kHz IBISサーボへ融合' },
      { label: '撮影メリット', line1: '手持ち広角で数秒〜十数秒の夜景・滝のスローシャッターがブレない', line2: '星空の微細な星像点像化（地球自転追尾）を三脚レスで支援' },
      { label: '設計スペック', line1: '撮像面 36.0×24.0mm / パッケージ 43.0×31.0mm', line2: '慣性低減薄型積層ウェハ構造' },
    ],
  },
  mirai_fh17_ti_floating_cradle: {
    badge: 'FH17-03',
    fhTag: FH17_TAG,
    zone: 'pkg',
    title: '超軽量トポロジー肉抜き チタン合金 6-DOF 浮上キャリッジ',
    analogy: 'センサーと4つの銅コイルを1つの軽いチタンのゆりかごにまとめ、羽のように素早く正確に空中制御する可動フレームです',
    metric: '非磁性Ti-6Al-4V · 低慣性',
    scaleLabel: '6-DOF TITANIUM FLOATING CRADLE · 56×44mm',
    accent: '#64748b',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <rect x="94" y="120" width="228" height="162" rx="14" fill="url(#${p}_si)" stroke="#475569" stroke-width="2.2"/>
      <rect x="132" y="150" width="152" height="102" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="1.6"/>
      <text x="208" y="198" text-anchor="middle" font-size="9.5" font-weight="900" fill="#0f172a">センサー収容窓</text>
      <text x="208" y="216" text-anchor="middle" font-size="8" font-weight="700" fill="#475569">4辺コイル翼＋背面3点チルト座</text>
      ${miraiKpi(342, 120, 340, 78, '非磁性＆高比剛性', 'Ti-6Al-4V（強磁場でも渦電流極小）', 'アルミと違いハルバッハ磁場移動時の渦電流ブレーキを抑制', '#475569')}
      ${miraiKpi(342, 210, 340, 74, '3点精密真鍮チルト座', '120°対称3点で±1〜2°チルト受圧', 'シャインプルーフ傾斜時も平面歪み0.5μm未満を維持', '#d97706')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '高比強度・高電気抵抗率チタンにより軽量剛性と低渦電流を両立', line2: '背面3点の研削真鍮パッドが積層ピエゾの先端球を正確支持' },
      { label: '撮影メリット', line1: '可動質量の最小化により高速手ブレ・微振動へ遅延ゼロ追従', line2: 'シャインプルーフ傾斜中も撮像面の平坦性を完璧に保持' },
      { label: '設計スペック', line1: '主枠 56×44mm / 厚 1.25mm CNC一体肉抜き加工', line2: '6自由度（X/Y/Z/Roll/Pitch/Yaw）完全可動キャリッジ' },
    ],
  },
  mirai_fh17_front_halbach_yoke: {
    badge: 'FH17-04',
    fhTag: FH17_TAG,
    zone: 'pkg',
    title: '前面 軟鉄磁気ヨーク＆4辺ハルバッハ配列 N52ネオジム磁石群',
    analogy: '磁石のN極とS極を90度ずつ回転させて並べる「ハルバッハ配列」で、コイル側だけに磁力を1.4倍集中させる強力磁石枠です',
    metric: 'ハルバッハ配列 · 磁束+40%',
    scaleLabel: 'FRONT HALBACH N52 MAGNET ARRAY + SOFT-IRON YOKE',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: () => `
      <rect x="86" y="114" width="248" height="174" rx="14" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <rect x="116" y="140" width="188" height="122" rx="8" fill="#ffffff" stroke="#0f766e" stroke-width="1.6"/>
      ${[126, 178, 230].map((x, idx) => `<rect x="${x}" y="119" width="44" height="16" rx="3" fill="${idx === 1 ? '#e2e8f0' : '#94a3b8'}" stroke="#f59e0b" stroke-width="1.2"/>`).join('')}
      <text x="210" y="196" text-anchor="middle" font-size="10" font-weight="900" fill="#0f172a">ハルバッハ磁束集中</text>
      <text x="210" y="216" text-anchor="middle" font-size="8.4" font-weight="700" fill="#d97706">→ ↑ ← （片側強磁場・反対側ゼロ漏洩）</text>
      ${miraiKpi(352, 118, 330, 78, '常時浮上電力の大幅削減', '磁束密度 B 約1.4倍 → 発熱 約1/2', 'ローレンツ力 F = BIL のBを高めることでコイル発熱を抑制', '#475569')}
      ${miraiKpi(352, 208, 330, 76, '漏洩磁束の完全封じ込め', '軟鉄閉磁路ヨークで周辺電子回路保護', '電子コンパスや隣接メモリへの磁気干渉を極小化', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '磁化方向を90°回転配置するハルバッハ配列で空隙側へ磁束集中', line2: '背面ヨークとの閉磁路構造で強力かつ均一な磁場ギャップを形成' },
      { label: '撮影メリット', line1: 'フルサイズセンサーの常時磁気浮上に必要な電流と発熱を約半減', line2: '大振幅の手ブレにも負けない高推力アクチュエーションを実現' },
      { label: '設計スペック', line1: 'N52高温グレードネオジム 4辺×3分割配列', line2: '外形 72×60mm / 56.5×44.5mm 中央開口' },
    ],
  },
  mirai_fh17_xy_levitation_coils: {
    badge: 'FH17-05',
    fhTag: FH17_TAG,
    zone: 'pkg',
    title: 'X/Y/Roll 3軸平面駆動・高密度矩形巻線純銅ボイスコイル（×4基）',
    analogy: '鉄心を持たない4つの銅線コイルへ精密な電流を流し、引っかかり（コギング）ゼロで滑らかにセンサーを前後左右へ操ります',
    metric: 'コギング 0 · 応答 < 0.1ms',
    scaleLabel: '4× CORE-LESS FLAT-WIRE COPPER X/Y/ROLL VOICE COILS',
    accent: '#d97706',
    accentSoft: '#fef3c7',
    art: (p) => `
      <rect x="132" y="114" width="152" height="32" rx="8" fill="url(#${p}_cu)" stroke="#92400e" stroke-width="1.8"/>
      <rect x="132" y="254" width="152" height="32" rx="8" fill="url(#${p}_cu)" stroke="#92400e" stroke-width="1.8"/>
      <rect x="86" y="150" width="38" height="100" rx="8" fill="url(#${p}_cu)" stroke="#92400e" stroke-width="1.8"/>
      <rect x="292" y="150" width="38" height="100" rx="8" fill="url(#${p}_cu)" stroke="#92400e" stroke-width="1.8"/>
      <text x="208" y="198" text-anchor="middle" font-size="10" font-weight="900" fill="#0f172a">X / Y / Roll 平面3軸</text>
      <text x="208" y="216" text-anchor="middle" font-size="8.4" font-weight="700" fill="#b45309">上下2基の差動電流でRoll回転制御</text>
      ${miraiKpi(350, 118, 332, 78, '高占積率・平角銅線巻線', '銅充填率 82%超（丸線比 +25%推力）', '同一体積で低抵抗・高推力・低発熱を同時達成', '#d97706')}
      ${miraiKpi(350, 208, 332, 76, '完全無鉄心・ゼロヒステリシス', '磁気ヒステリシス・バックラッシ 0', '0.1μm級の超微細ピクセルシフト撮影にもそのまま対応', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '4辺対称配置の空心平角銅線ボイスコイルがローレンツ力を発生', line2: '上下2基の推力差でRoll軸回転、左右2基でX軸並進を独立制御' },
      { label: '撮影メリット', line1: 'CIPA 10〜11段の超強力手ブレ補正＋無ハルシネーション超解像に直結', line2: '機械ギヤや摺動音ゼロで動画撮影中も完全無音' },
      { label: '設計スペック', line1: '上下25×6.2mm×2 / 左右6.2×23mm×2 / 平角純銅線', line2: '駆動周波数 10 kHz サーボ閉ループ対応' },
    ],
  },
  mirai_fh17_z_maglev_coils: {
    badge: 'FH17-06',
    fhTag: FH17_TAG,
    zone: 'pkg',
    title: '非接触磁気浮上（Z軸リフト＆ピッチ／ヨー）平面浮上コイル（×3基）',
    analogy: '従来の「セラミック玉の上を転がる摩擦」すら無くすため、3つのコイルでセンサーを空中に浮かせる磁気リフターです',
    metric: '転がり摩擦 0 · 完全浮上',
    scaleLabel: '3-POINT PLANAR Z-AXIS MAGNETIC LEVITATION COILS',
    accent: '#ea580c',
    accentSoft: '#ffedd5',
    art: (p) => `
      <rect x="92" y="122" width="104" height="58" rx="10" fill="url(#${p}_cu)" stroke="#9a3412" stroke-width="2"/>
      <text x="144" y="155" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">浮上コイル #1</text>
      <rect x="220" y="122" width="104" height="58" rx="10" fill="url(#${p}_cu)" stroke="#9a3412" stroke-width="2"/>
      <text x="272" y="155" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">浮上コイル #2</text>
      <rect x="156" y="216" width="104" height="58" rx="10" fill="url(#${p}_cu)" stroke="#9a3412" stroke-width="2"/>
      <text x="208" y="249" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">浮上コイル #3</text>
      <text x="208" y="202" text-anchor="middle" font-size="8.6" font-weight="800" fill="#c2410c">120° 3点リフト → Z並進＋Pitch/Yaw姿勢制御</text>
      ${miraiKpi(346, 120, 336, 78, '静摩擦ゼロのブレイクスルー', '極微小手ブレ（0.2μm）の張り付き解消', 'セラミック球の転がり抵抗・微小段差引っかかりを根絶', '#ea580c')}
      ${miraiKpi(346, 210, 336, 74, '省電力ハイブリッド運用', '撮影待機時は低電流・露光時フル浮上', '常時浮上による発熱増を賢く抑える適応制御', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '120°三角形配置の3基平面浮上コイルがZ方向電磁反発力を制御', line2: '3点浮上量の独立制御でZ軸フランジ調整と微姿勢安定化を兼務' },
      { label: '撮影メリット', line1: '高画素センサーで目立つ「極小ブレの張り付き残り」を完全解消', line2: 'シャッターショック後の収束時間を現行IBIS比1/3へ短縮' },
      { label: '設計スペック', line1: '3基120°トライアド配置 / 浮上ギャップ 0.15 mm', line2: '適応スタンバイ制御＋背面銅放熱直結' },
    ],
  },
  mirai_fh17_piezo_tilt_triad: {
    badge: 'FH17-07',
    fhTag: FH17_TAG,
    zone: 'pkg',
    title: '核心①：±1〜2° 微小チルト（シャインプルーフ／片ボケ補正）3点ピエゾ脚',
    analogy: '3本のミクロン精度の圧電柱がセンサーを最大2度だけ斜めに傾け、料理やマクロ撮影で奥までピントを合わせたりレンズの片ボケを直します',
    metric: '±1〜2° 微小チルト制御',
    scaleLabel: '3-POINT STACKED PZT PIEZO MICRO-TILT ACTUATORS',
    accent: '#d97706',
    accentSoft: '#fef3c7',
    art: () => `
      <line x1="94" y1="224" x2="324" y2="174" stroke="#0284c7" stroke-width="5"/>
      <text x="209" y="156" text-anchor="middle" font-size="9.5" font-weight="900" fill="#0369a1">傾斜センサー面（±1〜2° シャインプルーフ）</text>
      <rect x="108" y="226" width="28" height="46" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
      <rect x="282" y="176" width="28" height="96" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
      <circle cx="122" cy="222" r="6" fill="#e11d48"/>
      <circle cx="296" cy="172" r="6" fill="#e11d48"/>
      <text x="209" y="286" text-anchor="middle" font-size="8.4" font-weight="800" fill="#b45309">3点積層PZTピエゾ柱 ＋ ルビー球支点（±0.7 mmストローク）</text>
      ${miraiKpi(346, 114, 336, 84, 'シャインプルーフ＆片ボケ補正', '絞り込まずに手前〜奥まで合焦', '料理・花マクロの被写界深度制御＋レンズ個体偏心を自動矯正', '#d97706')}
      ${miraiKpi(346, 210, 336, 80, '物理限界の誠実な明記', '建築垂直シフトは専用TSレンズ必須', 'フルサイズマウント内径の制約上、±1–2°チルトへ特化最適化', '#475569')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '120°配置の3本積層PZTセラミック圧電柱がnm精度で伸縮', line2: 'ルビー球支点×真鍮座によりセンサー面を±1〜2°精密傾斜' },
      { label: '撮影メリット', line1: '開放F1.4のままテーブルフォト手前〜奥へピント面を傾けられる', line2: 'オールドレンズやズームのわずかな片ボケをカメラ側で自動校正' },
      { label: '設計スペック', line1: '最大チルト角 ±1〜2° / 分解能 < 0.0005°', line2: 'ゼロ電力保持（圧電容量保持）で静止傾斜時の発熱極小' },
    ],
  },
  mirai_fh17_ceramic_landing_pads: {
    badge: 'FH17-08',
    fhTag: FH17_TAG,
    zone: 'pkg',
    title: '電源オフ時着座用 Si₃N₄超硬マイクロボール＆電磁パークロック',
    analogy: 'カメラの電源を切ったりバッグの中で揺られたりした時、浮かんでいたセンサーを安全に受け止めてロックする着陸脚です',
    metric: '無通電保護 · 耐衝撃着座',
    scaleLabel: 'SI3N4 CERAMIC FAIL-SAFE LANDING PADS + PARK LOCK',
    accent: '#334155',
    accentSoft: '#f1f5f9',
    art: () => `
      ${[124, 208, 292].map((x) => `
        <path d="M ${x - 24} 236 L ${x} 214 L ${x + 24} 236 Z" fill="#cbd5e1" stroke="#475569" stroke-width="1.8"/>
        <circle cx="${x}" cy="196" r="18" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
        <circle cx="${x - 5}" cy="190" r="4" fill="#64748b"/>
      `).join('')}
      <rect x="138" y="122" width="140" height="36" rx="8" fill="#d97706" stroke="#92400e" stroke-width="2"/>
      <text x="208" y="144" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">電磁パークロック機構</text>
      <text x="208" y="268" text-anchor="middle" font-size="8.6" font-weight="800" fill="#334155">窒化ケイ素（Si₃N₄）超硬球 ×3 ＋ チタンV溝座</text>
      ${miraiKpi(346, 118, 336, 78, '無通電＆落下フェイルセーフ', '電源OFF時は3点V溝へ機械ロック', '運搬中の衝撃で浮上キャリッジが暴れて破損するのを完全防止', '#334155')}
      ${miraiKpi(346, 208, 336, 76, '超低摩耗セラミック球', 'モース硬度9級・非磁性・無潤滑', '電源ON/OFFを数十万回繰り返しても微粉塵ゼロ', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '電源遮断と同時に電磁ソレノイドが解放され3点V溝へ着座固定', line2: '非磁性・絶縁性の窒化ケイ素（Si₃N₄）精密球が磁場を乱さない' },
      { label: '撮影メリット', line1: '磁気浮上機構でありながらカメラバッグ運搬・飛行機移動も安心', line2: '起動0.08秒で即座にロック解除＆浮上スタンバイ完了' },
      { label: '設計スペック', line1: 'Si₃N₄ 真球度 G5 マイクロボール ×3 / チタンV座', line2: '耐衝撃定格 > 100 G（電源OFFロック時）' },
    ],
  },
  mirai_fh17_hall_optical_encoders: {
    badge: 'FH17-09',
    fhTag: FH17_TAG,
    zone: 'link',
    title: 'サブミクロン 6-DOF 非接触ホール＆光干渉位置センサーアレイ（×6点）',
    analogy: '宙に浮いたセンサーが上下左右・傾きに1ミクロンの10分の1でも動いたら即座に見抜く、6つの超精密ものさしです',
    metric: '分解能 0.1 μm / 0.0005°',
    scaleLabel: '6-DOF NON-CONTACT HALL + OPTICAL INTERFEROMETER ARRAY',
    accent: '#d97706',
    accentSoft: '#fef3c7',
    art: () => `
      <rect x="112" y="114" width="64" height="176" rx="10" fill="#c26d38" stroke="#9a3412" stroke-width="2"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="124" y="${124 + i * 27}" width="40" height="19" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.2"/>`).join('')}
      <text x="250" y="156" text-anchor="middle" font-size="9.5" font-weight="900" fill="#0f172a">6軸同時リアルタイム検出</text>
      <text x="250" y="178" text-anchor="middle" font-size="8.6" font-weight="700" fill="#b45309">X / Y / Z（0.1 μm精度）</text>
      <text x="250" y="198" text-anchor="middle" font-size="8.6" font-weight="700" fill="#0f766e">Roll / Pitch / Yaw（0.0005°）</text>
      <text x="250" y="230" text-anchor="middle" font-size="8.2" font-weight="700" fill="#475569">サンプルレート 20 kHz</text>
      ${miraiKpi(346, 118, 336, 78, '非接触ハイブリッド測位', 'ホール素子（広域）＋光干渉（超微細）', '大振幅の手ブレ追跡とサブミクロン静止を同時に実現', '#d97706')}
      ${miraiKpi(346, 208, 336, 76, '温度ドリフト自動補償', '差動ブリッジ構成＋オンチップ温度計', '極寒地から炎天下までチルト原点ズレゼロ', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '6点のホール＆光学干渉ヘッドがキャリッジ6自由度を20kHz監視', line2: 'サーボDSPへサブミクロン位置誤差を遅延50μs未満で供給' },
      { label: '撮影メリット', line1: '10〜11段手ブレ補正＋6,000万画素超の極微細ピッチに完全対応', line2: 'ピント面の±2°チルト角度を0.0005°単位で正確再現' },
      { label: '設計スペック', line1: '6チャネルQFNセンサアレイ＋フレキシブル基板', line2: '位置分解能 0.1 μm / 角度分解能 0.0005°' },
    ],
  },
  mirai_fh17_earth_rotation_imu: {
    badge: 'FH17-10',
    fhTag: FH17_TAG,
    zone: 'link',
    title: '核心②：地球自転補正（15.04"/s）高精度MEMSジャイロ＋GNSS IMU基板',
    analogy: '「手ブレ」と「地球が回る動き（毎秒15.04秒角）」を緯度と方角から計算して見分ける、カメラ専用の小型宇宙羅針盤です',
    metric: 'Ω_E = 15.04"/s 減算',
    scaleLabel: 'EARTH-ROTATION COMPENSATION IMU · GNSS + 3-AXIS GYRO',
    accent: '#059669',
    accentSoft: '#d1fae5',
    art: () => `
      <circle cx="196" cy="198" r="78" fill="#064e3b" stroke="#34d399" stroke-width="2.5"/>
      <ellipse cx="196" cy="198" rx="76" ry="26" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 3"/>
      <line x1="196" y1="110" x2="196" y2="286" stroke="#38bdf8" stroke-width="2.2"/>
      <text x="196" y="192" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">地球自転 Ω_E</text>
      <text x="196" y="212" text-anchor="middle" font-size="9.5" font-weight="900" fill="#6ee7b7">15.04 秒角 / 秒</text>
      ${miraiKpi(306, 114, 376, 84, 'なぜ現行IBISは6〜8段で頭打ちか？', '地球自転を「手ブレ」と誤認し逆補正ドリフト', 'GNSS緯度φ＋方位θから自転成分 Ω_E·cosφ 等を精密減算', '#059669')}
      ${miraiKpi(306, 210, 376, 80, 'Hasselblad X2D II 100C の先行実証', '中判10段の先例をフルサイズ10–11段へ民主化', '撮像面視覚フィードバックと融合し手持ち数秒〜十数秒を実現', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '低バイアス不安定度MEMSジャイロ＋電子コンパス＋GNSS緯度情報', line2: '観測地の地球自転ベクトル（15.04"/s）をジャイロ出力からリアルタイム減算' },
      { label: '撮影メリット', line1: '5.7〜6.3段超の壁を突破しCIPA 10〜11段の異次元手持ち安定性', line2: '星景モード時は逆に地球自転へ同期追尾し三脚のみで星を点像撮影' },
      { label: '設計スペック', line1: '基板 16×42mm / 金GNSS同軸端子＋ファラデー遮蔽缶', line2: 'ジャイロバイアス安定性 < 0.5°/hr 級' },
    ],
  },
  mirai_fh17_dual_floating_fpc: {
    badge: 'FH17-11',
    fhTag: FH17_TAG,
    zone: 'pkg',
    title: '低反発アーチ型 浮上センサー用デュアルS字ポリイミド高速FPC',
    analogy: '空中に浮かんだセンサーへ電気と高速映像データを送りながら、配線の硬さで浮上の邪魔をしない柔らかなS字リボンです',
    metric: 'ばね定数 −65% 極薄設計',
    scaleLabel: 'DUAL LOW-STIFFNESS S-CURVE FLOATING POLYIMIDE FPC',
    accent: '#d97706',
    accentSoft: '#fef3c7',
    art: () => `
      <path d="M 136 120 C 136 168, 98 178, 128 214 C 156 248, 122 262, 136 280" fill="none" stroke="#d97706" stroke-width="12" stroke-linecap="round"/>
      <path d="M 244 120 C 244 168, 282 178, 252 214 C 224 248, 258 262, 244 280" fill="none" stroke="#d97706" stroke-width="12" stroke-linecap="round"/>
      <text x="190" y="204" text-anchor="middle" font-size="9.5" font-weight="900" fill="#92400e">左右対称S字アーチ</text>
      ${miraiKpi(326, 118, 356, 78, '左右対称の反力キャンセル', '2本対称配置で可動時の回転モーメント相殺', '磁気浮上サーボの消費電流と姿勢外乱を最小化', '#d97706')}
      ${miraiKpi(326, 208, 356, 76, '100万回屈曲耐性ポリイミド', '厚さ25μm極薄＋銀メッシュEMIシールド', '120fpsフルサイズ高速差動信号をノイズゼロ伝送', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '左右対称S字アーチ形状により屈曲反力を相互に打ち消し合い', line2: '極薄ポリイミド基材＋圧延焼鈍銅箔で高耐久・超低剛性を実現' },
      { label: '撮影メリット', line1: '磁気浮上時の姿勢歪みを防ぎ10–11段補正精度を隅々まで維持', line2: '高周波シールドにより長秒露光でも通信ノイズが画像に乗らない' },
      { label: '設計スペック', line1: 'デュアル14mm幅 S字FPC ＋ 24ピン金ZIFコネクタ ×2', line2: '屈曲寿命 > 1,000万サイクル' },
    ],
  },
  mirai_fh17_rear_halbach_yoke: {
    badge: 'FH17-12',
    fhTag: FH17_TAG,
    zone: 'pkg',
    title: '背面 対向ハルバッハ N52磁気回路プレート＆閉磁路バックヨーク',
    analogy: '前面の磁石とペアで銅コイルをサンドイッチのように挟み込み、強い磁力を外へ漏らさず閉じ込める背面の鉄板ヨークです',
    metric: '対向閉磁路 · 高効率ギャップ',
    scaleLabel: 'REAR OPPOSING HALBACH N52 CIRCUIT + CLOSED BACK YOKE',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <rect x="92" y="118" width="234" height="32" rx="6" fill="#475569"/>
      <text x="209" y="138" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">前面ハルバッハ磁石＆ヨーク</text>
      <rect x="116" y="176" width="186" height="36" rx="8" fill="url(#${p}_cu)" stroke="#b45309" stroke-width="2"/>
      <text x="209" y="198" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">浮上ボイスコイル空隙（強磁場）</text>
      <rect x="92" y="238" width="234" height="36" rx="6" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <text x="209" y="260" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">背面対向ハルバッハ N52＋軟鉄バックヨーク</text>
      ${miraiKpi(346, 120, 336, 78, '均一高磁場ギャップ形成', '磁束密度 > 0.75 T（空隙中央）', '前後対向配列によりZ変位しても推力定数Ktが変動しにくい', '#475569')}
      ${miraiKpi(346, 210, 336, 74, '背後サーボ基板への磁気遮蔽', '高透磁率軟鉄プレートで磁束を完全帰還', '背面のサーボDSP・Hブリッジ回路の誤動作を防止', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '前面ヨークと対向する背面ハルバッハ磁石で双方向閉磁路を形成', line2: 'コイル全域へ均一磁束を通過させリニアな推力応答を実現' },
      { label: '撮影メリット', line1: 'どのシフト位置・チルト角度でも補正スピードと精度が均一', line2: '外部漏洩磁場を遮断しカメラ内部電子基板を保護' },
      { label: '設計スペック', line1: '外形 72×60mm / 30×18mm中央放熱開口', line2: '高透磁率軟鉄＋N52ネオジム対向配列' },
    ],
  },
  mirai_fh17_flexible_graphite_strap: {
    badge: 'FH17-13',
    fhTag: FH17_TAG,
    zone: 'cool',
    title: '非拘束・極薄グラファイト熱輸送ストラップ（センサー＆浮上除熱）',
    analogy: '宙に浮かぶセンサーの熱を、動きを邪魔しない柔らかい蛇腹の炭素シートでそっと背面の放熱板へ逃がす熱の架け橋です',
    metric: '面内熱伝導 1,500 W/m·K',
    scaleLabel: 'FLEXIBLE PYROLYTIC GRAPHITE THERMAL STRAP BRIDGE',
    accent: '#334155',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <rect x="92" y="124" width="234" height="32" rx="6" fill="#0369a1"/>
      <text x="209" y="144" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">浮上センサー＆コイル熱源</text>
      ${[122, 168, 214, 260].map((x) => `<path d="M ${x} 156 Q ${x + 16} 178 ${x} 196 Q ${x - 16} 214 ${x} 236" fill="none" stroke="#1e293b" stroke-width="7"/>`).join('')}
      <rect x="92" y="236" width="234" height="36" rx="6" fill="url(#${p}_cu)"/>
      <text x="209" y="258" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">背面 純銅ベースプレート（→ FH32空冷）</text>
      ${miraiKpi(346, 120, 336, 78, '銅の約4倍の面内熱輸送', '熱分解グラファイト k ≈ 1,500 W/m·K', '浮上構造の弱点「熱の逃げ場不足」を極薄蛇腹で鮮やかに解決', '#334155')}
      ${miraiKpi(346, 210, 336, 74, '機械的剛性ゼロ近傍', '厚さ25μm柔軟シート×4並列蛇腹', '6-DOF磁気浮上の微細動作へ機械抵抗を与えない', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '面内熱伝導1,500 W/m·Kの熱分解グラファイト＋極薄銅ラミネート', line2: '4本の蛇腹フレクシャ構造が浮上変位を無抵抗で吸収しつつ除熱' },
      { label: '撮影メリット', line1: '磁気浮上IBIS＋8K連続撮影時でもセンサー暗電流ノイズ上昇を抑制', line2: '長秒星景撮影時の熱かぶり（アンプグロー）を劇減' },
      { label: '設計スペック', line1: '46×32mm 柔軟熱橋 / 4並列蛇腹ストラップ', line2: '熱抵抗 < 1.2 K/W（センサー〜銅ベース間）' },
    ],
  },
  mirai_fh17_servo_driver_pcb: {
    badge: 'FH17-14',
    fhTag: FH17_TAG,
    zone: 'pkg',
    title: '10 kHz 6-DOF 磁気浮上クローズドループ・サーボDSP＆Hブリッジ基板',
    analogy: '毎秒1万回のスピードで6つのコイルの電流を計算・調整し、宙に浮いたセンサーを1ミクロンもブレさせない超高速制御頭脳です',
    metric: '10 kHz 6軸PID＋状態空間制御',
    scaleLabel: '10kHz 6-DOF MAGLEV SERVO DSP + 6-CH H-BRIDGE PCB',
    accent: '#059669',
    accentSoft: '#d1fae5',
    art: () => `
      <rect x="88" y="114" width="244" height="176" rx="12" fill="#065f46" stroke="#10b981" stroke-width="2"/>
      <rect x="166" y="158" width="88" height="88" rx="8" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
      <text x="210" y="198" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">6-DOF DSP</text>
      <text x="210" y="216" text-anchor="middle" font-size="8" font-weight="700" fill="#34d399">10 kHz 制御</text>
      ${[106, 274].map((x) => [130, 186, 240].map((y) => `<rect x="${x}" y="${y}" width="40" height="28" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2"/>`).join('')).join('')}
      ${miraiKpi(352, 118, 330, 78, '6チャネル高効率Hブリッジ', 'GaN/低Rds(on) MOSFET 100kHz PWM', 'スイッチング損失を極小化し常時浮上時の発熱を抑制', '#059669')}
      ${miraiKpi(352, 208, 330, 76, '地球自転＋視覚融合フィルタ', 'カルマンフィルタでIMU＋像面情報を統合', '広角10–11段＆望遠OIS協調補正を滑らかに調停', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '10 kHz閉ループサーボDSPが6軸位置センサーとIMU出力を同時演算', line2: '6チャネル低オン抵抗Hブリッジが高精度PWM電流を各コイルへ供給' },
      { label: '撮影メリット', line1: '歩き撮り動画の大きな揺れからシャッター微振動まで完全制振', line2: 'レンズOISとの協調制御で超望遠域でも安定したファインダー像' },
      { label: '設計スペック', line1: '基板 66×52mm / 6ch Hブリッジ＋24× MLCCフィルタ', line2: '制御ループ遅延 < 100 μs' },
    ],
  },
  mirai_fh17_copper_heat_backplate: {
    badge: 'FH17-15',
    fhTag: FH17_TAG,
    zone: 'cool',
    title: '背面 C1100 純銅サーマルベースプレート＆FH32空冷接触パッド',
    analogy: 'センサーと浮上コイルとサーボ基板の熱をすべて1枚の純銅板へ集め、隣のFH32超音波MEMS空冷へ確実に逃がす放熱基盤です',
    metric: 'C1100 純銅 · 8条放熱リブ',
    scaleLabel: 'REAR C1100 PURE-COPPER THERMAL BASEPLATE · 68×54mm',
    accent: '#c26d38',
    accentSoft: '#ffedd5',
    art: (p) => `
      <rect x="88" y="118" width="244" height="168" rx="14" fill="url(#${p}_cu)" stroke="#9a3412" stroke-width="2.2"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="108" y="${136 + i * 24}" width="204" height="10" rx="3" fill="#fed7aa" opacity="0.65"/>`).join('')}
      <text x="210" y="210" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">C1100 純銅ベース（k = 398 W/m·K）</text>
      ${miraiKpi(352, 120, 330, 78, '常時浮上発熱の解決策', 'コイル発熱＋センサー熱を全面均熱化', 'ピンクTIMシート経由でサーボ基板と熱密着', '#c26d38')}
      ${miraiKpi(352, 210, 330, 74, 'FH32 MEMS空冷へシームレス接続', '10–15W機体熱収支の重要放熱ハブ', '背面8条リブが機体内部熱パスと広い接触面積を確保', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '純銅C1100 1.15mm厚板＋ピンク高柔軟TIMシート＋背面8条リブ', line2: '磁気浮上機構の課題である連続通電発熱をシステム全体へ拡散' },
      { label: '撮影メリット', line1: '炎天下での長時間手持ち動画撮影でもIBIS熱保護停止を回避', line2: 'センサー温度上昇を抑えて暗所高感度ノイズを極小維持' },
      { label: '設計スペック', line1: '外形 68×54mm / 純銅厚 1.15mm ＋ TIM 0.55mm', line2: '熱伝導率 398 W/m·K' },
    ],
  },
  mirai_fh17_mg_outer_chassis: {
    badge: 'FH17-16',
    fhTag: FH17_TAG,
    zone: 'pkg',
    title: '高剛性 CNCマグネシウム外郭フレーム＆3点マウント基準ボス',
    analogy: '強大な磁石の引き合う力を受け止めながら、レンズマウントとの光軸の平行度をミクロン単位で支える頑丈な外枠です',
    metric: 'AZ91D Mg · 3点基準ボス',
    scaleLabel: 'CNC MAGNESIUM OUTER GIMBAL CHASSIS · 76×64mm',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <rect x="92" y="118" width="234" height="164" rx="16" fill="url(#${p}_si)" stroke="#475569" stroke-width="2.4"/>
      <rect x="118" y="142" width="182" height="116" rx="10" fill="#ffffff" stroke="#0f766e" stroke-width="1.6"/>
      <circle cx="96" cy="134" r="10" fill="#334155"/><circle cx="322" cy="134" r="10" fill="#334155"/><circle cx="209" cy="284" r="10" fill="#334155"/>
      <text x="209" y="204" text-anchor="middle" font-size="9.5" font-weight="900" fill="#0f172a">3点光学基準マウントボス</text>
      ${miraiKpi(346, 120, 336, 78, '高減衰AZ91Dマグネシウム', 'アルミ比 30%軽量＋高振動減衰能', '10kHzサーボの微小共振を構造体内部で速やかに減衰', '#475569')}
      ${miraiKpi(346, 210, 336, 74, 'キネマティック3点支持', '3点平面決定でボディ歪みの転写ゼロ', '大型望遠レンズ装着時のマウント応力からセンサーを隔離', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'AZ91Dマグネシウム合金の一体CNCフレーム＋3点基準ボス', line2: '前後ハルバッハヨーク間の強い磁気吸引力を変形ゼロで支持' },
      { label: '撮影メリット', line1: 'ボディに荷重が掛かってもセンサーのフランジ平行度が狂わない', line2: '軽量・高減衰で800g級未来ボディの軽快さに貢献' },
      { label: '設計スペック', line1: '外寸 76×64mm / 深さ 7.6mm / 3点基準マウント耳', line2: '平面直角度公差 < ±5 μm' },
    ],
  },
  mirai_fh17_tilt_calibration_shims: {
    badge: 'FH17-17',
    fhTag: FH17_TAG,
    zone: 'pkg',
    title: '光軸フランジ平行度 工場3点レーザー校正用 精密真鍮シム＆ばね',
    analogy: '工場出荷時にレーザーで測りながら3箇所の薄い真鍮スペーサとばねで調整し、レンズとの完璧な平行を作る仕上げ部品です',
    metric: '工場レーザー校正 ±2 μm',
    scaleLabel: '3-POINT LASER FLANGE CALIBRATION BRASS SHIMS + SPRINGS',
    accent: '#eab308',
    accentSoft: '#fef9c3',
    art: () => `
      ${[124, 208, 292].map((x, idx) => `
        <rect x="${x - 22}" y="138" width="44" height="14" rx="4" fill="#eab308" stroke="#a16207" stroke-width="1.6"/>
        <path d="M ${x - 14} 160 L ${x + 14} 174 L ${x - 14} 188 L ${x + 14} 202 L ${x - 14} 216 L ${x + 14} 230" fill="none" stroke="#64748b" stroke-width="4"/>
        <text x="${x}" y="256" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0f172a">校正点 #${idx + 1}</text>
      `).join('')}
      ${miraiKpi(346, 120, 336, 78, 'F1.4時代のアオリ原点保証', '工場フランジ平行度 ±2 μm追い込み', '50mm F1.4開放の極薄焦点深度でも四隅均質なシャープネス', '#a16207')}
      ${miraiKpi(346, 210, 336, 74, 'プリロード予圧ばね機構', 'バックラッシゼロで長期経年安定', 'チルト機構の原点（0.000°）を全生涯にわたり正確保持', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '5μm刻みのエッチング真鍮シム＋ステンレス予圧コイルばね×3点', line2: 'レーザー干渉計測定に基づき工場で全個体の光軸直角度を校正' },
      { label: '撮影メリット', line1: '大口径F1.4やメタ光学レンズでも個体差による片ボケを根絶', line2: '±2°微小チルト機能の正確なゼロ基準面を保証' },
      { label: '設計スペック', line1: '3点トライアド校正座 / 真鍮シム 5μmステップ選定', line2: 'フランジバック精度 ±2 μm 以内' },
    ],
  },
  mirai_fh17_titanium_mount_bolts: {
    badge: 'FH17-18',
    fhTag: FH17_TAG,
    zone: 'pkg',
    title: '非磁性チタン M1.6 精密トルクス固定ボルト ×8＆耐震ブッシュ',
    analogy: '磁石にくっつかない特殊なチタン製の8本の精密ねじで、強力な磁気回路を乱すことなくユニット全体を締結します',
    metric: '非磁性Ti M1.6 ×8本',
    scaleLabel: '8× NON-MAGNETIC TITANIUM M1.6 TORX FASTENERS',
    accent: '#64748b',
    accentSoft: '#f1f5f9',
    art: () => `
      ${[0, 1, 2, 3].map((i) => `
        <rect x="${104 + i * 56}" y="138" width="26" height="16" rx="4" fill="#cbd5e1" stroke="#475569" stroke-width="1.6"/>
        <rect x="${111 + i * 56}" y="154" width="12" height="86" rx="2" fill="#94a3b8" stroke="#475569" stroke-width="1.4"/>
      `).join('')}
      <text x="206" y="268" text-anchor="middle" font-size="9" font-weight="800" fill="#334155">比透磁率 μ_r ≈ 1.0002（完全非磁性チタンねじ ×8）</text>
      ${miraiKpi(346, 120, 336, 78, '磁場対称性の厳格保全', '鉄系ねじによる磁束偏りをゼロ化', 'ハルバッハ配列と6軸ホールセンサーの精度を一切乱さない', '#475569')}
      ${miraiKpi(346, 210, 336, 74, '高効率1ドローコール描画', '8本精密ボルトを単一InstancedMesh化', '緩み止め樹脂コート付で激しい振動環境にも高信頼', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '完全非磁性チタン合金 M1.6トルクス締結具×8本', line2: '周辺ハルバッハ磁場へ寄生磁気力を生じさせず対称性を保持' },
      { label: '撮影メリット', line1: '磁気浮上サーボのキャリブレーション精度と長期信頼性を担保', line2: '軽量チタン化によりIBISユニット総重量をさらに数グラム削減' },
      { label: '設計スペック', line1: 'M1.6 × 3.8 mm 非磁性チタン / 8本全周均等締結', line2: 'ナイロンパッチ緩み止め処理済' },
    ],
  },
};

export function renderFh17HdSchematicSvg(type: PartExplanation['diagramType']): string | null {
  const spec = FH17_SPECS[type];
  return spec ? renderMiraiMonographSvg(spec) : null;
}
