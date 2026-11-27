import { PartExplanation } from '../../assemblies/types';
import {
  MiraiHdSpec,
  miraiKpi,
  miraiPin,
  renderMiraiMonographSvg,
} from './shared';

const FH25_TAG = 'FH25 3万nit EVF · 84/100点';

const FH25_SPECS: Partial<Record<PartExplanation['diagramType'], MiraiHdSpec>> = {
  mirai_fh25_ergonomic_eyecup: {
    badge: 'FH25-01',
    fhTag: FH25_TAG,
    zone: 'optic',
    title: '軟質フルオロエラストマー遮光アイカップ＆着脱ラッチ',
    analogy: 'まぶしい屋外の外光をピタッと遮り、眼鏡をかけたままでも30,000ニットのHDR映像に没入できる柔らかクッション枠',
    metric: 'ハイアイポイント 25 mm',
    scaleLabel: 'ERGONOMIC FLUOROELASTOMER EYECUP · 44×34mm',
    accent: '#334155',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <rect x="92" y="114" width="220" height="180" rx="42" fill="url(#${p}_si)" stroke="#475569" stroke-width="2"/>
      <rect x="132" y="146" width="140" height="116" rx="28" fill="#ffffff" stroke="#0f766e" stroke-width="2"/>
      <text x="202" y="200" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0f172a">倍率 0.90× 広視野</text>
      <text x="202" y="218" text-anchor="middle" font-size="8.4" font-weight="700" fill="#0f766e">アイレリーフ 25 mm</text>
      ${miraiPin(108, 160, 344, 134, 1, '軟質フルオロエラストマー', '皮脂・日焼け止めでベタつかず長寿命', '#334155', 'start')}
      ${miraiPin(268, 250, 344, 198, 2, 'スライドロック着脱爪', '大型深型カップへワンタッチ換装', '#0f766e', 'start')}
      ${miraiKpi(350, 238, 334, 68, '屋外HDR視認性', '外光遮断 ＋ 実効 4,000+ nit', '真夏の雪原・逆光でも肉眼OVF超えのダイナミックレンジ', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '25mmアイレリーフ対応のワイド遮光エラストマー枠', line2: '高耐久フルオロエラストマーで経年劣化・ホコリ付着防止' },
      { label: '撮影メリット', line1: '眼鏡装着でも四隅の撮影情報までケラれず一望', line2: '外光を遮り30,000ニットHDRの黒とハイライトを際立たせる' },
      { label: '設計スペック', line1: '外形 44.4×34.4mm / ワンタッチ着脱スライドロック', line2: '抗菌・耐皮脂マット表面処理' },
    ],
  },
  mirai_fh25_antifog_coverglass: {
    badge: 'FH25-02',
    fhTag: FH25_TAG,
    zone: 'optic',
    title: '親水防曇・撥油マルチAR接眼保護ガラス＆SUSベゼル',
    analogy: '冬の吐息や雨でも曇りにくく、まつ毛の脂もサッと拭き取れる超透明な最前面ガード窓',
    metric: '透過率 ≥ 99.4% · 防曇',
    scaleLabel: 'ANTI-FOG MULTI-AR COVER GLASS · SUS BEZEL',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <rect x="92" y="138" width="290" height="44" rx="8" fill="url(#${p}_glass)" stroke="#0284c7" stroke-width="2"/>
      <rect x="92" y="138" width="290" height="8" rx="4" fill="#38bdf8"/>
      <text x="237" y="165" text-anchor="middle" font-size="9.4" font-weight="900" fill="#1e3a8a">多層AR ＋ 親水防曇ハイブリッドコート（400–960nm透過）</text>
      <!-- Visible + 940nm NIR both passing -->
      <line x1="168" y1="92" x2="168" y2="236" stroke="#059669" stroke-width="2.6" marker-end="url(#${p}_arr_g)"/>
      <text x="168" y="252" text-anchor="middle" font-size="8.6" font-weight="800" fill="#047857">可視光 99.4%透過</text>
      <line x1="306" y1="92" x2="306" y2="236" stroke="#e11d48" stroke-width="2.4" stroke-dasharray="4 2" marker-end="url(#${p}_arr_r)"/>
      <text x="306" y="252" text-anchor="middle" font-size="8.6" font-weight="800" fill="#be123c">940nm視線IR透過</text>
      ${miraiKpi(412, 120, 272, 84, '広帯域AR設計', '可視＋940nm デュアルAR', '視線追跡の近赤外光も反射せず高S/N通光', '#0284c7')}
      ${miraiKpi(412, 218, 272, 84, '全天候シーリング', 'SUS押さえ枠＋EPDM封止', '接眼部からの湿気・曇り侵入を完全ブロック', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '可視400–700nmと視線追跡940nmを同時透過する広帯域AR', line2: '防曇・撥油コート＋SUSベゼル気密シールで内部結露ゼロ' },
      { label: '撮影メリット', line1: '厳寒期の撮影でも息でファインダーが白く曇らない', line2: '指紋や皮脂がついてもひと拭きでクリアな視界復活' },
      { label: '設計スペック', line1: '26.2×20.2mm / 反射率 < 0.3%（両面AR）', line2: '耐擦傷ハードコート＋SUS304気密ベゼル' },
    ],
  },
  mirai_fh25_gaze_ir_ring: {
    badge: 'FH25-03',
    fhTag: FH25_TAG,
    zone: 'active',
    title: '240Hz視線追尾・8灯940nm近赤外LED照明リング',
    analogy: '目には見えない優しい赤外線ライトを8方向から瞳に当て、あなたが今見ている被写体を瞬時に読み取るリング',
    metric: '8灯 940nm · 240Hz同期',
    scaleLabel: '8× 940nm NIR LED RING · EYE-CONTROL AF',
    accent: '#e11d48',
    accentSoft: '#fff1f2',
    art: (p) => `
      <circle cx="212" cy="212" r="90" fill="none" stroke="url(#${p}_cu)" stroke-width="18"/>
      <circle cx="212" cy="212" r="68" fill="#f8fafc" stroke="#cbd5e1" stroke-dasharray="4 3"/>
      <!-- 8 crimson 940nm IR LEDs -->
      <g fill="#e11d48" stroke="#facc15" stroke-width="1.8">
        <circle cx="212" cy="122" r="7"/><circle cx="276" cy="148" r="7"/><circle cx="302" cy="212" r="7"/><circle cx="276" cy="276" r="7"/>
        <circle cx="212" cy="302" r="7"/><circle cx="148" cy="276" r="7"/><circle cx="122" cy="212" r="7"/><circle cx="148" cy="148" r="7"/>
      </g>
      <!-- Eye iris icon in center -->
      <ellipse cx="212" cy="212" rx="34" ry="20" fill="#ffffff" stroke="#334155" stroke-width="1.8"/>
      <circle cx="212" cy="212" r="12" fill="#0f172a"/>
      <circle cx="217" cy="208" r="2.6" fill="#fb7185"/>
      <text x="212" y="252" text-anchor="middle" font-size="8.4" font-weight="800" fill="#be123c">角膜プルキンエ反射点取得</text>
      ${miraiKpi(346, 114, 336, 86, '240Hz 高速視線追尾AF', '応答遅延 < 4.2 ms', '8灯の角膜反射幾何計算により\n眼鏡・コンタクト装着でも±0.5°高精度追尾', '#e11d48')}
      ${miraiKpi(346, 214, 336, 86, 'アイセーフ完全準拠', '940nm 不可視パルス照明', '赤光りゼロ・IEC 62471 Class 1安全基準内', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '8灯940nm近赤外LEDが角膜上に基準反射点を生成', line2: '240Hzパルス駆動で低消費電力と高精度視線演算を両立' },
      { label: '撮影メリット', line1: '撮りたい被写体を見るだけでAF枠が瞬時にロック', line2: '裸眼だけでなく眼鏡・コンタクト越しの追尾精度も向上' },
      { label: '設計スペック', line1: '波長 940nm（完全不可視）× 8基 / 金反射カップ', line2: '環状ポリイミドFPC / IEC安全規格 Class 1' },
    ],
  },
  mirai_fh25_dichroic_mirror: {
    badge: 'FH25-04',
    fhTag: FH25_TAG,
    zone: 'optic',
    title: '45°ダイクロイック視線追跡ホットミラー（ビームスプリッタ）',
    analogy: '映像の可視光は真っすぐ素通しし、目から跳ね返った赤外線だけを45°横の視線カメラへ曲げる魔法のマジックミラー',
    metric: '可視透過 / 940nm反射',
    scaleLabel: '45° DICHROIC HOT MIRROR · IR BEAM SPLITTER',
    accent: '#db2777',
    accentSoft: '#fdf2f8',
    art: (p) => `
      <!-- 45-degree tilted hot mirror separating Visible straight (+Z) and 940nm IR (-X) -->
      <line x1="176" y1="286" x2="316" y2="146" stroke="url(#${p}_violet)" stroke-width="10" stroke-linecap="round"/>
      <line x1="176" y1="286" x2="316" y2="146" stroke="#f472b6" stroke-width="3"/>
      <!-- Visible EVF image passing straight right -> left -->
      <line x1="88" y1="216" x2="394" y2="216" stroke="#059669" stroke-width="3" marker-end="url(#${p}_arr_g)"/>
      <text x="132" y="204" font-size="8.6" font-weight="900" fill="#047857">EVF映像（可視光98%透過）</text>
      <!-- 940nm IR returning from eye and bouncing 90 deg UP to NIR camera -->
      <polyline points="384,230 246,230 246,102" fill="none" stroke="#e11d48" stroke-width="2.6" stroke-dasharray="5 3" marker-end="url(#${p}_arr_r)"/>
      <text x="314" y="114" font-size="8.6" font-weight="900" fill="#be123c">940nm視線IRを90°反射 → 側方NIRカメラへ</text>
      ${miraiKpi(430, 144, 254, 152, '光路共用による薄型化', '多層誘電体ダイクロイック', '・400〜700nm 可視光：透過 >98%\n・940nm 近赤外線：反射 >96%\n接眼レンズの視界を一切邪魔せず\n同軸視線トラッキングを実現', '#db2777')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '多層誘電体干渉膜が可視光を透過し940nm IRのみ90°反射', line2: '光軸同軸で視線検出できるため視差エラーが極小' },
      { label: '撮影メリット', line1: '画面の端を見た時でも正確な視線入力AFが機能', line2: 'ファインダー映像の明るさや色味に一切影響しない' },
      { label: '設計スペック', line1: '傾斜角 45.0°±0.05° / チタン精密保持枠', line2: '可視透過 ≥98% / 940nm反射 ≥96%' },
    ],
  },
  mirai_fh25_gaze_nir_sensor: {
    badge: 'FH25-05',
    fhTag: FH25_TAG,
    zone: 'active',
    title: '240Hzグローバルシャッター視線追尾NIRカメラモジュール',
    analogy: '45°ミラーから届いた瞳の動きを1秒に240回もの超高速で読み取り、視線先を即座に計算する極小カメラ',
    metric: '240Hz グローバルシャッター',
    scaleLabel: '940nm NIR GAZE CAMERA · ORTHOGONAL BAY',
    accent: '#be123c',
    accentSoft: '#fff1f2',
    art: (p) => `
      <rect x="88" y="148" width="96" height="128" rx="8" fill="url(#${p}_green)" stroke="#065f46" stroke-width="1.8"/>
      <rect x="116" y="176" width="40" height="72" rx="4" fill="url(#${p}_si)" stroke="#38bdf8"/>
      <text x="136" y="216" text-anchor="middle" font-size="8.2" font-weight="900" fill="#bae6fd">NIR\nDIE</text>
      <!-- Mini lens barrel pointing right -->
      <rect x="184" y="172" width="88" height="80" rx="6" fill="url(#${p}_metal)" stroke="#334155"/>
      <rect x="262" y="182" width="12" height="60" rx="3" fill="#be123c"/>
      <path d="M 278 184 Q 298 212 278 240 Z" fill="url(#${p}_glass)" stroke="#0284c7"/>
      <!-- Incoming reflected IR bundle -->
      <line x1="382" y1="194" x2="294" y2="202" stroke="#e11d48" stroke-width="2.2" marker-end="url(#${p}_arr_r)"/>
      <line x1="382" y1="230" x2="294" y2="222" stroke="#e11d48" stroke-width="2.2" marker-end="url(#${p}_arr_r)"/>
      <text x="338" y="178" text-anchor="middle" font-size="8.4" font-weight="800" fill="#be123c">45°ミラー反射光</text>
      ${miraiKpi(412, 120, 272, 86, '歪みゼロ高速撮像', '240Hz グローバルシャッター', '高速眼球運動(サッカード)をブレなく捉え\n視線移動から4ms以内にAF追従', '#be123c')}
      ${miraiKpi(412, 220, 272, 86, '太陽光ノイズ遮断', '940nm 狭帯域フィルタ', '強い外光下でも瞳孔エッジを確実に抽出', '#334155')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '側方直交ポート配置の240Hz NIRグローバルシャッター', line2: '940nm狭帯域バンドパスフィルタで可視迷光を完全遮断' },
      { label: '撮影メリット', line1: 'スポーツ選手の急な動きを目で追うだけでピントが合う', line2: 'EVFの240Hzリフレッシュと完全同期した無遅延操作' },
      { label: '設計スペック', line1: 'フレームレート 240Hz / 波長 940±15nm', line2: '小型NIR光学筒＋EMIシールド背面カバー' },
    ],
  },
  mirai_fh25_ed_eyepiece_lens: {
    badge: 'FH25-06',
    fhTag: FH25_TAG,
    zone: 'optic',
    title: '第1接眼群：大口径ED低分散メニスカスレンズ',
    analogy: '3,000万ドットの極小画面を目の前で大きく鮮明に広げ、端っこの文字まで色滲みさせない高級接眼ガラス',
    metric: 'Ø26.4 mm ED接眼',
    scaleLabel: 'ED LOW-DISPERSION EYEPIECE · 25mm ER',
    accent: '#059669',
    accentSoft: '#ecfdf5',
    art: (p) => `
      <path d="M 196 116 Q 252 212 196 308 L 234 298 Q 262 212 234 126 Z" fill="url(#${p}_green)" fill-opacity="0.38" stroke="#059669" stroke-width="2.2"/>
      <line x1="94" y1="154" x2="366" y2="178" stroke="#2563eb" stroke-width="2" marker-end="url(#${p}_arr_b)"/>
      <line x1="94" y1="212" x2="366" y2="212" stroke="#059669" stroke-width="2" marker-end="url(#${p}_arr_g)"/>
      <line x1="94" y1="270" x2="366" y2="246" stroke="#dc2626" stroke-width="2" marker-end="url(#${p}_arr_r)"/>
      <text x="142" y="138" font-size="8.6" font-weight="800" fill="#047857">パンケーキ折返し光束</text>
      <text x="326" y="162" font-size="8.6" font-weight="800" fill="#1e3a8a">瞳へ平行射出</text>
      ${miraiKpi(412, 120, 272, 86, '倍率色収差ゼロ志向', '特殊低分散 ED硝材', '画面四隅のシャッター速度・ヒストグラム文字まで\n色ズレなしでシャープに描写', '#059669')}
      ${miraiKpi(412, 220, 272, 86, '広アイボックス', 'Ø26.4mm 大口径設計', '少し目がズレても画面がケラれない快適視界', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'ED低分散メニスカスで接眼系の周辺色収差を低減', line2: 'Ø26.4mm大口径で広いアイボックスと25mmアイレリーフ' },
      { label: '撮影メリット', line1: '3,000万ドットの隅々まで文字やピント山がクッキリ', line2: '長時間の撮影でも目が疲れにくい歪曲ゼロ設計' },
      { label: '設計スペック', line1: '外径 Ø26.4mm / 非球面ED硝子 / 0.90×倍率系', line2: '黒色アルマイト鏡枠＋エメラルドED識別帯' },
    ],
  },
  mirai_fh25_pancake_pbs_film: {
    badge: 'FH25-07',
    fhTag: FH25_TAG,
    zone: 'optic',
    title: 'パンケーキ光学：反射偏光板（PBS）＆1/4波長板（QWP）',
    analogy: '光の向き（偏光）を巧みに切り替えて狭い鏡筒の中で光を3回折り返し、長い望遠鏡を薄く畳む魔法のシート',
    metric: '光路3回折返し薄型化',
    scaleLabel: 'REFLECTIVE PBS + QWP · 3-FOLD PANCAKE',
    accent: '#6366f1',
    accentSoft: '#eef2ff',
    art: (p) => `
      <!-- 3-fold pancake optical path diagram -->
      <rect x="92" y="138" width="16" height="148" rx="3" fill="url(#${p}_green)"/>
      <text x="100" y="304" text-anchor="middle" font-size="8" font-weight="800" fill="#047857">OLED</text>
      <path d="M 196 126 Q 176 212 196 298" fill="none" stroke="#8b5cf6" stroke-width="5"/>
      <text x="192" y="314" text-anchor="middle" font-size="8" font-weight="800" fill="#6d28d9">曲面ハーフミラー</text>
      <rect x="308" y="126" width="14" height="172" rx="3" fill="url(#${p}_violet)"/>
      <text x="315" y="314" text-anchor="middle" font-size="8" font-weight="800" fill="#4338ca">PBS + QWP</text>
      <!-- 3-fold ray path -->
      <polyline points="110,186 306,186 188,214 390,214" fill="none" stroke="#0284c7" stroke-width="2.6" marker-end="url(#${p}_arr_b)"/>
      <text x="248" y="176" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0369a1">① 透過→PBSで反射</text>
      <text x="248" y="205" text-anchor="middle" font-size="8.2" font-weight="800" fill="#7c3aed">② QWP往復で偏光90°回転</text>
      <text x="364" y="204" text-anchor="middle" font-size="8.2" font-weight="900" fill="#059669">③ 透過し瞳へ</text>
      ${miraiKpi(426, 114, 258, 92, 'なぜ30,000ニットが必要？', 'パンケーキ透過率 ~15%', '3回折返しで光学損失が約85%生じるが\n30,000ニットの超高輝度パネルにより\n実効 4,000+ nit の圧倒的HDRを達成！', '#6366f1')}
      ${miraiKpi(426, 220, 258, 86, '軍艦部の極薄コンパクト化', '光路長 -45% 短縮', '高倍率0.90×を維持しつつ出っ張りを激減', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'PBS反射偏光＋QWP1/4波長板で光路を3回折返し', line2: 'XRパンケーキ光学をカメラEVFへ最適化転用' },
      { label: '撮影メリット', line1: '30,000ニットの高輝度がパンケーキ損失を補い実効4,000+nit', line2: 'カメラ背面へのEVF突き出しを劇的に薄型化' },
      { label: '設計スペック', line1: '広帯域ワイヤーグリッドPBS＋無色差QWP積層膜', line2: '真鍮45°遅相軸位置決めキー環' },
    ],
  },
  mirai_fh25_pancake_halfmirror: {
    badge: 'FH25-08',
    fhTag: FH25_TAG,
    zone: 'optic',
    title: 'パンケーキ光学：曲面ハーフミラー凹面レンズ',
    analogy: '半分通して半分反射するカーブ鏡が、小さなパネルの映像を一気に巨大な映画館サイズへ拡大する核心レンズ',
    metric: '50/50 凹面折返し鏡',
    scaleLabel: 'CONCAVE HALF-MIRROR · 0.90× MAGNIFICATION',
    accent: '#8b5cf6',
    accentSoft: '#f5f3ff',
    art: (p) => `
      <path d="M 190 120 Q 158 212 190 304 L 222 296 Q 194 212 222 128 Z" fill="url(#${p}_violet)" fill-opacity="0.34" stroke="#7c3aed" stroke-width="2.4"/>
      <!-- Expanding folded reflection -->
      <polyline points="92,188 180,188 334,154" fill="none" stroke="#2563eb" stroke-width="2.2" marker-end="url(#${p}_arr_b)"/>
      <polyline points="92,236 180,236 334,270" fill="none" stroke="#dc2626" stroke-width="2.2" marker-end="url(#${p}_arr_r)"/>
      <text x="272" y="216" text-anchor="middle" font-size="9.4" font-weight="900" fill="#5b21b6">凹面反射パワーで\n色収差ゼロの拡大結像！</text>
      ${miraiKpi(416, 120, 268, 86, '反射鏡ならではの強み', '原理的に色収差 0', '屈折レンズと違い反射は波長で角度が変わらず\n高倍率でも周辺解像が極めて高い', '#7c3aed')}
      ${miraiKpi(416, 220, 268, 86, '軽量カーボン保持枠', '移動視度調整が軽快', '曲面ハーフミラー＋軽量低複屈折基材', '#334155')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '凹面ハーフミラー反射は色収差を生まない理想拡大系', line2: '低複屈折光学基材で偏光崩れによるゴーストを防止' },
      { label: '撮影メリット', line1: '画面中央から最周辺までピントの山が一発で掴める', line2: '小型ボディに大迫力0.90×クラスのファインダーを搭載' },
      { label: '設計スペック', line1: 'Ø25.2mm 非球面凹面ハーフミラー（R:T = 50:50）', line2: 'カーボン複合軽量鏡枠・ゴースト抑制コート' },
    ],
  },
  mirai_fh25_diopter_helicoid: {
    badge: 'FH25-09',
    fhTag: FH25_TAG,
    zone: 'link',
    title: '−4〜+3D 視度調整ヘリコイド＆2軸SUSガイドレール',
    analogy: '近視でも遠視でも裸眼でクッキリ見えるように、2本の精密レール上で接眼レンズを滑らかに動かすダイヤル機構',
    metric: '−4.0 〜 +3.0 D 対応',
    scaleLabel: 'TWIN SUS RAILS + BRASS SLEEVE + KNURLED DIAL',
    accent: '#d97706',
    accentSoft: '#fffbeb',
    art: (p) => `
      <line x1="92" y1="138" x2="342" y2="138" stroke="#64748b" stroke-width="5"/>
      <line x1="92" y1="286" x2="342" y2="286" stroke="#64748b" stroke-width="5"/>
      <rect x="192" y="128" width="46" height="20" rx="4" fill="url(#${p}_gold)"/>
      <rect x="192" y="276" width="46" height="20" rx="4" fill="url(#${p}_gold)"/>
      <rect x="206" y="148" width="18" height="128" rx="4" fill="url(#${p}_metal)"/>
      <!-- External knurled diopter wheel -->
      <circle cx="348" cy="212" r="36" fill="url(#${p}_si)" stroke="#10b981" stroke-width="3" stroke-dasharray="6 3"/>
      <circle cx="348" cy="212" r="14" fill="#10b981"/>
      <text x="348" y="264" text-anchor="middle" font-size="8.6" font-weight="900" fill="#0f172a">ローレット視度ダイヤル</text>
      <line x1="122" y1="212" x2="294" y2="212" stroke="#d97706" stroke-width="2.4" marker-start="url(#${p}_arr)" marker-end="url(#${p}_arr)"/>
      <text x="208" y="198" text-anchor="middle" font-size="9.4" font-weight="900" fill="#b45309">光軸ブレゼロ直進ストローク</text>
      ${miraiKpi(420, 120, 264, 86, '3,000万ドット対応精度', '倒れ角 ≤ 0.02°', '2軸SUS研磨レール＋真鍮摺動スリーブが\n視度調整時の片ボケを完全に防止', '#d97706')}
      ${miraiKpi(420, 220, 264, 86, 'ワイド調整レンジ', '−4.0 〜 +3.0 m⁻¹', 'プルロック式誤操作防止ダイヤル構造', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '2本SUS研磨ガイド軸＋真鍮スリーブで直進精度確保', line2: 'リードスクリュー連動の32山ローレット視度ダイヤル' },
      { label: '撮影メリット', line1: '裸眼でも細かいピントの山をストレスなく視認可能', line2: 'バッグ出し入れ時の視度ズレを防ぐクリックロック機構' },
      { label: '設計スペック', line1: '視度範囲 −4.0〜+3.0D / SUS304ガイド軸×2', line2: '外径 Ø11.2mm CNCローレットダイヤル' },
    ],
  },
  mirai_fh25_mla_extraction_dome: {
    badge: 'FH25-10',
    fhTag: FH25_TAG,
    zone: 'optic',
    title: '384個ギャップレスMLA光抽出マイクロレンズ配列',
    analogy: 'パネル内部で横へ逃げてしまう光を全部正面へ向け直し、消費電力そのままに明るさを+40%底上げする極小ドーム群',
    metric: '光抽出効率 +40%',
    scaleLabel: '384 GAPLESS MLA EXTRACTION DOMES',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <!-- Row of gapless MLA domes extracting trapped TIR light forward -->
      <rect x="86" y="226" width="320" height="44" rx="4" fill="url(#${p}_si)"/>
      <text x="246" y="252" text-anchor="middle" font-size="9.2" font-weight="900" fill="#34d399">True-RGB タンデム発光層（3.0–4.0 μmピッチ）</text>
      <g fill="url(#${p}_glass)" stroke="#0284c7" stroke-width="1.6">
        <path d="M 96 226 A 30 24 0 0 1 156 226 Z"/><path d="M 156 226 A 30 24 0 0 1 216 226 Z"/>
        <path d="M 216 226 A 30 24 0 0 1 276 226 Z"/><path d="M 276 226 A 30 24 0 0 1 336 226 Z"/>
        <path d="M 336 226 A 30 24 0 0 1 396 226 Z"/>
      </g>
      <!-- Rays redirected vertically forward -->
      <polyline points="126,226 112,208 122,116" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#${p}_arr_b)"/>
      <polyline points="246,226 246,116" fill="none" stroke="#059669" stroke-width="2.4" marker-end="url(#${p}_arr_g)"/>
      <polyline points="366,226 380,208 370,116" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#${p}_arr_r)"/>
      <text x="246" y="102" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0369a1">全反射ロスを正面アイボックスへ高効率抽出！</text>
      ${miraiKpi(430, 114, 254, 86, '低発熱・長寿命への貢献', '同輝度で電流 -30%', '発光電流を減らせるため30,000ニット時の\n焼き付きと眉間部発熱を同時に低減', '#0284c7')}
      ${miraiKpi(430, 214, 254, 86, '網目感(SDE)完全ゼロ', '3,000万ドット＋MLA', 'サブピクセル境界を光学的に滑らか化', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'パネル内部の全反射(TIR)光をドーム曲面で正面へ抽出', line2: 'パンケーキ光学の受光角へ配光を最適化し効率+40%' },
      { label: '撮影メリット', line1: '同じ電力・低発熱のまま圧倒的なピーク輝度を実現', line2: 'ピクセルの格子感（網目）が肉眼で完全消滅' },
      { label: '設計スペック', line1: '高屈折率ギャップレスMLA配列（384個代表表現）', line2: '0.64型 3.0–4.0μmピッチ直上アライメント' },
    ],
  },
  mirai_fh25_true_rgb_tandem: {
    badge: 'FH25-11',
    fhTag: FH25_TAG,
    zone: 'active',
    title: '核心：30,000ニット True-RGB 2–3層タンデム発光ダイ',
    analogy: '光を7割捨てる色セロハンを廃止し、赤・緑・青の極小ライト自体を2〜3段重ねて光らせる太陽並みの極小スクリーン',
    metric: '15,000–30,000 nit',
    scaleLabel: 'FILTERLESS TRUE-RGB 3-TANDEM · 30M DOTS',
    accent: '#059669',
    accentSoft: '#ecfdf5',
    art: (p) => `
      <!-- 3-Stack Tandem Direct RGB Emitter vs 2026 WOLED+CF -->
      <rect x="82" y="106" width="144" height="174" rx="8" fill="#f1f5f9" stroke="#94a3b8"/>
      <text x="154" y="128" text-anchor="middle" font-size="9" font-weight="800" fill="#475569">2026 WOLED + CF</text>
      <rect x="100" y="142" width="108" height="22" rx="3" fill="#fca5a5"/><text x="154" y="157" text-anchor="middle" font-size="8" font-weight="800" fill="#991b1b">CFで70%光廃棄</text>
      <rect x="100" y="182" width="108" height="36" rx="4" fill="#cbd5e1"/><text x="154" y="204" text-anchor="middle" font-size="8.4" font-weight="800" fill="#334155">単層白色発光</text>
      <text x="154" y="256" text-anchor="middle" font-size="10" font-weight="900" fill="#64748b">1,000〜3,000 nit</text>
      <!-- 2028 True-RGB 3-Layer Tandem -->
      <rect x="242" y="106" width="174" height="174" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.8"/>
      <text x="329" y="128" text-anchor="middle" font-size="9.2" font-weight="900" fill="#065f46">2028 True-RGB タンデム</text>
      <!-- 3 stacked RGB layers with CGL -->
      <g>
        <rect x="258" y="140" width="44" height="18" fill="url(#${p}_red)"/><rect x="307" y="140" width="44" height="18" fill="url(#${p}_green)"/><rect x="356" y="140" width="44" height="18" fill="url(#${p}_blue)"/>
        <rect x="258" y="166" width="44" height="18" fill="url(#${p}_red)"/><rect x="307" y="166" width="44" height="18" fill="url(#${p}_green)"/><rect x="356" y="166" width="44" height="18" fill="url(#${p}_blue)"/>
        <rect x="258" y="192" width="44" height="18" fill="url(#${p}_red)"/><rect x="307" y="192" width="44" height="18" fill="url(#${p}_green)"/><rect x="356" y="192" width="44" height="18" fill="url(#${p}_blue)"/>
      </g>
      <text x="329" y="232" text-anchor="middle" font-size="8.2" font-weight="800" fill="#047857">CF撤廃＋電荷発生層(CGL)直列3層</text>
      <text x="329" y="258" text-anchor="middle" font-size="10.4" font-weight="900" fill="#065f46">15,000〜30,000 nit</text>
      ${miraiKpi(436, 110, 248, 86, '色域＆輝度の同時革命', 'BT.2020 > 95% 級', 'カラーフィルター損失ゼロで\n鮮烈なHDRハイライトと深い黒を再現', '#059669')}
      ${miraiKpi(436, 210, 248, 86, '焼き付き寿命 4×超', '低電流タンデム＋MicroLED道筋', '将来は完全無機モノリシックMicroLEDへ発展', '#2563eb')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'CF撤廃の直接RGB発光をCGL電荷発生層で2〜3層直列積層', line2: 'Sigmaintell/The Elec 2028ロードマップ準拠の3万ニット級' },
      { label: '撮影メリット', line1: 'F1.0–1.2の極薄ピントもピーキング不要で肉眼感覚視認', line2: '太陽光の反射や逆光ハイライトがOVF並みにリアル' },
      { label: '設計スペック', line1: '約1,000万画素（約3,000万ドット）/ 3.0–4.0μmピッチ', line2: 'ピーク15,000–30,000 nit / 実効4,000+ nit HDR' },
    ],
  },
  mirai_fh25_cmos_backplane: {
    badge: 'FH25-12',
    fhTag: FH25_TAG,
    zone: 'active',
    title: '12インチ互換 3,000万ドット・240Hz BFI Si-CMOSバックプレーン',
    analogy: '3,000万個の極小ライトを1秒間に240回も一瞬で点滅・黒挿入し、素早く振っても残像ゼロにする半導体駆動土台',
    metric: '240Hz ＋ 低デューティBFI',
    scaleLabel: '12-INCH Si-CMOS BACKPLANE · ON-CHIP MURA',
    accent: '#2563eb',
    accentSoft: '#eff6ff',
    art: (p) => `
      <!-- BFI impulse waveform vs sample-and-hold blur -->
      <rect x="82" y="106" width="332" height="176" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="248" y="128" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0f172a">残像ゼロの秘密：240Hz 低デューティBFI（黒挿入）駆動</text>
      <text x="96" y="156" font-size="8.4" font-weight="800" fill="#64748b">2026 60–120Hz ホールド駆動（流し撮りで網膜残像）</text>
      <rect x="96" y="164" width="300" height="20" rx="3" fill="#94a3b8"/>
      <text x="96" y="212" font-size="8.4" font-weight="800" fill="#2563eb">2028 FH25：240Hz・20%デューティ BFI駆動（30,000nit活用！）</text>
      <g fill="url(#${p}_blue)">
        <rect x="96" y="220" width="22" height="32" rx="2"/><rect x="172" y="220" width="22" height="32" rx="2"/>
        <rect x="248" y="220" width="22" height="32" rx="2"/><rect x="324" y="220" width="22" height="32" rx="2"/>
      </g>
      <text x="248" y="272" text-anchor="middle" font-size="8.2" font-weight="700" fill="#1e3a8a">超高ピーク輝度があるから80%黒挿入しても明るく、OVF並みの無残像パン！</text>
      ${miraiKpi(434, 114, 250, 82, '12インチウェーハ量産', 'XR投資の民主化波及', '300mmファブで3〜4μm画素ドライバを低コスト量産', '#2563eb')}
      ${miraiKpi(434, 210, 250, 82, 'オンチップMura補正', 'ASI画素個体キャリブ', '3,000万ドットの輝度・色度バラつきをリアルタイム補償', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '単結晶Si-CMOSバックプレーンが3,000万ドットを240Hz駆動', line2: '高ピーク輝度を活かした低デューティBFIでホールド残像を解消' },
      { label: '撮影メリット', line1: '野鳥・モータースポーツの高速流し撮りが一眼レフOVF並みに自然', line2: 'Mura補正回路で暗部グラデーションのザラつきゼロ' },
      { label: '設計スペック', line1: '12インチCMOS互換 / 144–240Hz + BFI', line2: 'オンチップ画素輝度・温度劣化リアルタイム補償' },
    ],
  },
  mirai_fh25_ceramic_alignment: {
    badge: 'FH25-13',
    fhTag: FH25_TAG,
    zone: 'pkg',
    title: 'セラミック位置決めキャリア＆3点真鍮チルト調整板',
    analogy: '3,000万ドットの極小画面が熱で1ミクロンも歪まないように支える、焼き物（セラミック）の精密台座',
    metric: '平面度 ≤ 2 μm',
    scaleLabel: 'ALUMINA CARRIER · 3-POINT BRASS TILT SHIMS',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <rect x="94" y="122" width="296" height="168" rx="14" fill="#f8fafc" stroke="#475569" stroke-width="2.2"/>
      <rect x="134" y="150" width="216" height="112" rx="6" fill="url(#${p}_gold)" opacity="0.28" stroke="#ca8a04" stroke-width="1.8"/>
      <text x="242" y="210" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0f172a">高剛性アルミナセラミック台座</text>
      <!-- 3-point brass tilt shims -->
      <circle cx="122" cy="148" r="11" fill="url(#${p}_gold)" stroke="#92400e"/>
      <circle cx="362" cy="148" r="11" fill="url(#${p}_gold)" stroke="#92400e"/>
      <circle cx="242" cy="270" r="11" fill="url(#${p}_gold)" stroke="#92400e"/>
      ${miraiKpi(418, 122, 266, 80, '3点キネマティック調整', 'チルト誤差 ≤ 0.01°', '工場レーザー干渉計でパンケーキ像面と完全平行出し', '#ca8a04')}
      ${miraiKpi(418, 214, 266, 80, '熱膨張マッチング', 'CTE ≈ 6.5 ppm/K', '30,000ニット駆動時の熱反りによる周辺ボケを根絶', '#475569')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '低熱膨張アルミナセラミックがCMOSダイを無歪み支持', line2: '120°配置の3点エッチング真鍮シムで光軸平行度を微調整' },
      { label: '撮影メリット', line1: '3,000万ドットの四隅まで均等なピントと視認性', line2: '高輝度連続使用で温まっても画面の端がボケない' },
      { label: '設計スペック', line1: '26.4×21.2mm Al₂O₃セラミック＋金配線棚', line2: '3点レーザーエッチング真鍮チルトシム' },
    ],
  },
  mirai_fh25_tcon_driver_pcb: {
    badge: 'FH25-14',
    fhTag: FH25_TAG,
    zone: 'link',
    title: '240Hz超低遅延T-CON・BFI制御基板＆EMIシールド缶',
    analogy: 'カメラの頭脳から届く映像データを1ミリ秒未満で画面に映し出す、電波漏れ対策バッチリの超高速司令塔',
    metric: '表示遅延 < 2.5 ms',
    scaleLabel: '240Hz T-CON + BFI ASIC · EMI SHIELD CAN',
    accent: '#059669',
    accentSoft: '#ecfdf5',
    art: (p) => `
      <rect x="86" y="116" width="318" height="174" rx="12" fill="url(#${p}_green)" stroke="#065f46" stroke-width="2"/>
      <rect x="108" y="138" width="154" height="114" rx="8" fill="url(#${p}_metal)" stroke="#334155" stroke-width="1.8"/>
      <text x="185" y="190" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0f172a">EMI金属シールド缶</text>
      <text x="185" y="208" text-anchor="middle" font-size="8" font-weight="700" fill="#334155">4レーン MIPI-DSI ＋ BFI</text>
      <rect x="284" y="148" width="94" height="72" rx="6" fill="url(#${p}_si)" stroke="#38bdf8"/>
      <text x="331" y="182" text-anchor="middle" font-size="8.4" font-weight="900" fill="#bae6fd">Mura補正\n高速SRAM</text>
      <text x="245" y="274" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ecfdf5">上下20個 SMD MLCC 高周波デカップリングバンク</text>
      ${miraiKpi(430, 120, 254, 82, 'ゼロ遅延ブラックアウトフリー', 'ガラス〜ガラス < 2.5 ms', '240Hz直結パイプラインで連写中の被写体飛びなし', '#059669')}
      ${miraiKpi(430, 216, 254, 82, '電磁ノイズ完全封じ込め', '洋白EMIシールド缶', '近接するWi-Fi/GNSS・音声回路への干渉を遮断', '#475569')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '4レーン高速MIPI-DSI受信T-CONが240Hz BFIを厳密同期', line2: '洋白EMIシールド缶＋20個MLCCで高速クロック放射を抑制' },
      { label: '撮影メリット', line1: 'シャッターチャンスを逃さない肉眼レベルの極低遅延', line2: 'Mura補正用SRAMでパネル経年変化も自動リフレッシュ' },
      { label: '設計スペック', line1: '30.4×24.4mm 多層HDI / EMI缶 / Mura SRAM', line2: '10bit HDR + 240Hz BFI タイミング制御' },
    ],
  },
  mirai_fh25_mipi_fpc_tail: {
    badge: 'FH25-15',
    fhTag: FH25_TAG,
    zone: 'link',
    title: '240Hz高速シールドMIPI-DSI S字FPCケーブル',
    analogy: '毎秒数十ギガビットもの超高精細映像データを、ノイズに邪魔されずメイン基板から届ける高速道路リボン',
    metric: '40+ Gbps 差動伝送',
    scaleLabel: '24-PIN ZIF · 100Ω DIFF MIPI-DSI FPC',
    accent: '#d97706',
    accentSoft: '#fffbeb',
    art: (p) => `
      <path d="M 196 106 L 196 160 C 196 204 282 204 282 248 L 282 288" fill="none" stroke="url(#${p}_cu)" stroke-width="32" stroke-linecap="round"/>
      <path d="M 186 116 L 186 160 C 186 204 272 204 272 248 L 272 278" fill="none" stroke="#334155" stroke-width="6" stroke-dasharray="6 3"/>
      <rect x="242" y="276" width="80" height="28" rx="4" fill="#f8fafc" stroke="#ca8a04" stroke-width="2"/>
      <text x="282" y="294" text-anchor="middle" font-size="8.4" font-weight="900" fill="#854d0e">24極 金ZIF</text>
      ${miraiKpi(368, 118, 314, 84, '超広帯域ディスプレイ伝送', '10MP × 240Hz × 10bit', 'DSC軽量圧縮＋100Ω差動インピーダンス整合\nシールド銀メッシュで信号アイ開口を維持', '#d97706')}
      ${miraiKpi(368, 216, 314, 84, 'メイン基板直結', 'S字応力リリーフ構造', '軍艦部EVFから2nm BIONZ SoCへ最短ルーティング', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '100Ω差動インピーダンス整合の4レーンMIPI-DSI配線', line2: '背面導電銀メッシュが高速差動信号のクロストークを遮断' },
      { label: '撮影メリット', line1: '3,000万ドット・240Hz・HDRの色階調を一切劣化させず伝送', line2: 'コンパクトなS字配線で軍艦部の薄型化に貢献' },
      { label: '設計スペック', line1: '24極金ZIFコネクタ / LCP低誘電FPC基材', line2: 'DSC 3:1 視覚無損失 240Hz 伝送対応' },
    ],
  },
  mirai_fh25_copper_heatsink: {
    badge: 'FH25-16',
    fhTag: FH25_TAG,
    zone: 'cool',
    title: '30,000ニット高輝度放熱・純銅ヒートスプレッダ＆14枚フィン',
    analogy: '太陽のように明るく光る極小スクリーンの熱を素早く逃がし、画面の焼き付きと眉間の熱さを防ぐ純銅の放熱剣山',
    metric: '14枚純銅フィン放熱',
    scaleLabel: 'C1100 COPPER SPREADER + 14 SKIVED FINS',
    accent: '#ea580c',
    accentSoft: '#fff7ed',
    art: (p) => `
      <!-- Copper spreader + 14 rear fins cross-section -->
      <rect x="92" y="136" width="18" height="148" rx="4" fill="#f472b6"/>
      <text x="82" y="210" text-anchor="middle" font-size="8" font-weight="800" fill="#be123c" transform="rotate(-90 82 210)">ピンクTIM</text>
      <rect x="112" y="126" width="26" height="168" rx="4" fill="url(#${p}_cu)"/>
      <!-- 14 copper fins extending right -->
      <g fill="url(#${p}_cu)">
        <rect x="138" y="132" width="136" height="6"/><rect x="138" y="146" width="136" height="6"/>
        <rect x="138" y="160" width="136" height="6"/><rect x="138" y="174" width="136" height="6"/>
        <rect x="138" y="188" width="136" height="6"/><rect x="138" y="202" width="136" height="6"/>
        <rect x="138" y="216" width="136" height="6"/><rect x="138" y="230" width="136" height="6"/>
        <rect x="138" y="244" width="136" height="6"/><rect x="138" y="258" width="136" height="6"/>
        <rect x="138" y="272" width="136" height="6"/><rect x="138" y="284" width="136" height="6"/>
      </g>
      <line x1="294" y1="168" x2="366" y2="168" stroke="#dc2626" stroke-width="2.4" marker-end="url(#${p}_arr_r)"/>
      <line x1="294" y1="210" x2="366" y2="210" stroke="#dc2626" stroke-width="2.4" marker-end="url(#${p}_arr_r)"/>
      <line x1="294" y1="252" x2="366" y2="252" stroke="#dc2626" stroke-width="2.4" marker-end="url(#${p}_arr_r)"/>
      <text x="334" y="148" text-anchor="middle" font-size="8.6" font-weight="900" fill="#dc2626">ボディ骨格へ放散</text>
      ${miraiKpi(404, 120, 280, 84, 'FH25最大の難所対策', '眉間部の発熱抑制', '30,000ニット駆動時のOLED発熱を\n背面純銅14フィン→マグネシウム骨格へ逃がす', '#ea580c')}
      ${miraiKpi(404, 218, 280, 84, '有機EL焼き付き抑止', 'パネル温度 ≤ 42℃維持', '低温維持で青色発光層の劣化速度を大幅遅延', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'ピンクTIM→C1100純銅スプレッダ→14枚フィンで背面抜熱', line2: 'パネル温度上昇を抑えOLED劣化と接眼部熱感を防ぐ' },
      { label: '撮影メリット', line1: '真夏の屋外でもHDR高輝度表示を長時間キープ', line2: '撮影情報UI（白文字枠）の焼き付きリスクを激減' },
      { label: '設計スペック', line1: 'C1100純銅（398 W/m·K）一体スカイブ14枚フィン', line2: '面積 32.0×25.4mm / 高追従TIMシート直結' },
    ],
  },
  mirai_fh25_mg_optical_housing: {
    badge: 'FH25-17',
    fhTag: FH25_TAG,
    zone: 'pkg',
    title: '防塵防滴CNCマグネシウム光学主鏡筒（側面カット透視窓付）',
    analogy: '45°ミラー・パンケーキ光学・視線カメラを狂いなく包み込み、ホコリを寄せ付けない超精密な金属の箱',
    metric: '48×38×46 mm 高剛性',
    scaleLabel: 'CNC Mg OPTICAL TUNNEL · GAZE PORT',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <rect x="86" y="116" width="320" height="176" rx="14" fill="url(#${p}_si)" stroke="#334155" stroke-width="2"/>
      <rect x="108" y="138" width="276" height="132" rx="8" fill="#ffffff" stroke="#94a3b8"/>
      <!-- Internal optical architecture schematic inside housing -->
      <rect x="122" y="160" width="14" height="88" fill="#059669"/>
      <path d="M 168 154 Q 152 204 168 254" fill="none" stroke="#8b5cf6" stroke-width="4"/>
      <rect x="206" y="154" width="10" height="100" fill="#6366f1"/>
      <path d="M 248 152 Q 268 204 248 256" fill="none" stroke="#10b981" stroke-width="4"/>
      <line x1="292" y1="248" x2="352" y2="160" stroke="#db2777" stroke-width="5"/>
      <text x="246" y="132" text-anchor="middle" font-size="8.4" font-weight="900" fill="#f8fafc">側面透視ウィンドウ：全光路を0%組立から一望</text>
      ${miraiKpi(430, 120, 254, 84, '同軸・直交マルチ統合', '左壁NIR視線ポート一体加工', '主光軸と直交視線カメラの位置精度を±10μmで一体保持', '#475569')}
      ${miraiKpi(430, 218, 254, 84, '放熱＆防塵防滴', 'マグネシウムCNC筐体', '内部迷光吸収コート＋防塵気密シール溝', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '左壁NIRポート一体加工のCNCマグネシウム主鏡筒', line2: '3Dモデルでは右側面カットで45°ミラー＆パンケーキを透視' },
      { label: '撮影メリット', line1: 'EVF内部へホコリが入り込まない完全密閉光学トンネル', line2: '落下衝撃でも視度レールや45°ミラーがズレない高剛性' },
      { label: '設計スペック', line1: '主筐体 36×30×30mm / AZ91Dマグネシウム合金', line2: 'チタン縁取り窓枠＋上面MIRAI識別バー' },
    ],
  },
  mirai_fh25_mount_bolts_bracket: {
    badge: 'FH25-18',
    fhTag: FH25_TAG,
    zone: 'pkg',
    title: 'カメラ軍艦部3点基準ブラケット＆M1.4精密トルクスボルト×6',
    analogy: 'EVFユニット全体をカメラの頭頂部（軍艦部）へガタなく固定する3点支持の精密土台',
    metric: '3点キネマティック固定',
    scaleLabel: '3-POINT DATUM BRACKET · 6× M1.4 TORX',
    accent: '#64748b',
    accentSoft: '#f8fafc',
    art: (p) => `
      <rect x="92" y="122" width="308" height="168" rx="16" fill="url(#${p}_metal)" stroke="#475569" stroke-width="2"/>
      <rect x="142" y="156" width="208" height="100" rx="10" fill="#ffffff" stroke="#64748b"/>
      <text x="246" y="210" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0f172a">MIPI-DSI 配線貫通開口</text>
      <!-- 6 bolts + 3 datum bosses -->
      <g fill="#334155" stroke="#e2e8f0" stroke-width="1.5">
        <circle cx="122" cy="148" r="7"/><circle cx="370" cy="148" r="7"/>
        <circle cx="122" cy="206" r="7"/><circle cx="370" cy="206" r="7"/>
        <circle cx="122" cy="264" r="7"/><circle cx="370" cy="264" r="7"/>
      </g>
      ${miraiKpi(426, 122, 258, 82, '光軸水平基準の厳守', '3点チタン基準パッド', 'センサー面とEVF視軸の水平・傾きを±0.05°以内で固定', '#475569')}
      ${miraiKpi(426, 216, 258, 82, '高信頼メカニカル締結', 'M1.4 SUSトルクス ×6本', 'プロ現場の連続振動でも緩まない座金一体締結', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '3点チタン基準台座がカメラ軍艦部シャーシへ水平固定', line2: '中央開口が240Hz MIPI-DSI FPCを最短距離で通過させる' },
      { label: '撮影メリット', line1: 'EVFを覗いた際のわずかな傾き違和感を完全に排除', line2: 'ユニット単位での迅速なサービス交換性にも配慮' },
      { label: '設計スペック', line1: '42×32mm マグネシウム枠＋チタン3点基準パッド', line2: 'M1.4精密トルクスボルト ×6本締結' },
    ],
  },
};

export function renderFh25HdSchematicSvg(type: PartExplanation['diagramType']): string | null {
  const spec = FH25_SPECS[type];
  return spec ? renderMiraiMonographSvg(spec) : null;
}
