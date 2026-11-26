import { PartExplanation } from '../../assemblies/types';
import {
  drawCallout,
  drawPanelBox,
  drawRaindrop,
  drawStatusPill,
  wrapLcdHdSvg,
} from './shared';

/**
 * Phase 34 Ultra-HD 720x470 LCD Technical Infographic Schematics — Group A (D52–D69).
 * Covers Sony OEM 4-axis/rear-bay hardware (D52–D64) & Cover-glass/QWP/Touch micro-optics (D65–D69).
 */
export function renderLcdHdGroupA(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    case 'lcd_pck_lg3_protector':
      return wrapLcdHdSvg({
        badge: 'D52',
        title: 'Sony PCK-LG3 9H光学ハードガラス保護シート（4層構造）',
        analogy: '本体ガラスの身代わりになって傷と衝撃を受け止める「透明な防弾シールド」',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          ${drawPanelBox(28, 82, 390, 248, '4層ハイブリッド断面構造（総厚 0.60 mm / 73.2×55.9 mm）', '#0284c7')}
          <!-- 4 layers with 2.5D chamfered edge -->
          <path d="M 60 132 Q 60 124 72 124 L 378 124 Q 390 124 390 132 L 390 144 L 60 144 Z" fill="#38bdf8" fill-opacity="0.35" stroke="#0284c7" stroke-width="1.5"/>
          <text x="225" y="138" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0369a1">① フッ素防汚コート (AF) — 指紋・皮脂をサッと弾く</text>
          <rect x="60" y="144" width="330" height="54" fill="url(#d52-glass)" stroke="#0284c7" stroke-width="1.6"/>
          <text x="225" y="175" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0c4a6e">② 9H 化学強化光学ガラス (約 0.40 mm) ＋ 2.5D端面研磨</text>
          <rect x="60" y="198" width="330" height="26" fill="#fef3c7" stroke="#d97706" stroke-width="1.4"/>
          <text x="225" y="215" text-anchor="middle" font-size="10.5" font-weight="800" fill="#92400e">③ 飛散防止PET中間層 — 万が一割れても破片が飛び散らない</text>
          <rect x="60" y="224" width="330" height="24" fill="#dcfce7" stroke="#059669" stroke-width="1.4"/>
          <text x="225" y="240" text-anchor="middle" font-size="10.5" font-weight="800" fill="#065f46">④ 自己吸着シリコン粘着層 — 気泡が自然に抜けて再剥離OK</text>
          <!-- Monitor cover glass underneath -->
          <rect x="52" y="256" width="346" height="44" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.6"/>
          <text x="225" y="282" text-anchor="middle" font-size="11" font-weight="700" fill="#f8fafc">カメラ本体 D01 アルミノシリケートカバーガラス</text>
          <!-- Right panel: 4-axis stow clearance & impact -->
          ${drawPanelBox(434, 82, 258, 248, '純正0.6mm設計の秘密', '#0f766e')}
          <rect x="456" y="124" width="214" height="58" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
          <text x="563" y="145" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">4軸反転収納クリアランス</text>
          <text x="563" y="165" text-anchor="middle" font-size="10" font-weight="600" fill="#059669">0.6mm厚だから裏返し収納も干渉ゼロ！</text>
          <rect x="456" y="196" width="214" height="58" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
          <text x="563" y="217" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">静電容量タッチ感度</text>
          <text x="563" y="237" text-anchor="middle" font-size="10" font-weight="600" fill="#0284c7">ΔC &lt; 3% タッチAF・メニュー応答そのまま</text>
          ${drawStatusPill(458, 278, 210, '9H耐傷＋飛散防止＋純正フィット', true)}
        `,
        cards: [
          { label: 'どんな部品？', line1: 'α3.2型液晶専用のSony純正', line2: '9H光学ハードガラス保護シート' },
          { label: 'スゴい工夫', line1: '0.6mm薄型＋2.5D研磨で4軸裏収納', line2: 'でも干渉せずタッチ感度も維持' },
          { label: '撮影メリット', line1: '三脚金具やストラップ接触から', line2: '本体高価パネルを徹底ガード' },
        ],
      });

    case 'lcd_ma_hinge_back_mg_a':
      return wrapLcdHdSvg({
        badge: 'D53',
        title: 'MA HINGE BACK MO A MG ASSY（A-5057-165-A）',
        analogy: '4軸モニターのねじれ力を全部受け止める「マグネシウム合金製の頑丈な背骨」',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(28, 82, 410, 248, 'AZ91D マグネシウムダイカスト 4軸骨格トラス構造', '#334155')}
          <!-- Cast Mg chassis frame with cross ribs and 4 CNC bosses -->
          <rect x="64" y="126" width="336" height="176" rx="14" fill="url(#d53-mg)" stroke="#0f172a" stroke-width="2"/>
          <rect x="108" y="156" width="248" height="114" rx="8" fill="#f8fafc" stroke="#475569" stroke-width="1.5"/>
          <!-- Internal reinforcement truss ribs -->
          <line x1="108" y1="156" x2="232" y2="270" stroke="#475569" stroke-width="6" opacity="0.45"/>
          <line x1="356" y1="156" x2="232" y2="270" stroke="#475569" stroke-width="6" opacity="0.45"/>
          <rect x="108" y="236" width="248" height="18" fill="#334155" opacity="0.85"/>
          <text x="232" y="249" text-anchor="middle" font-size="9.5" font-weight="800" fill="#e2e8f0">下部補強ウェブ（LC-1058 FPC逃げ切欠き付）</text>
          <!-- 4 CNC Datum Bosses -->
          ${[
            [86, 146],
            [378, 146],
            [86, 282],
            [378, 282],
          ]
            .map(
              ([bx, by]) => `
            <circle cx="${bx}" cy="${by}" r="12" fill="url(#d53-steel)" stroke="#0f172a" stroke-width="1.4"/>
            <circle cx="${bx}" cy="${by}" r="5" fill="#0f172a"/>`
            )
            .join('')}
          ${drawCallout(86, 146, 140, 114, 1, 'CNC基準ボス (±0.02mm)', '平行リンク軸心を高精度決定', '#0284c7')}
          ${drawPanelBox(454, 82, 238, 248, 'なぜ樹脂(Mold B)だけではダメ？', '#dc2626')}
          <text x="470" y="132" font-size="11" font-weight="800" fill="#0f172a">4軸同時展開時の片持ちモーメント</text>
          <line x1="474" y1="158" x2="646" y2="158" stroke="#334155" stroke-width="8" stroke-linecap="round"/>
          <path d="M 636 164 L 636 208" stroke="#dc2626" stroke-width="3" marker-end="url(#d53-arrRed)"/>
          <text x="646" y="192" font-size="10" font-weight="800" fill="#dc2626">液晶自重＋</text>
          <text x="646" y="206" font-size="10" font-weight="800" fill="#dc2626">指タッチ荷重</text>
          <text x="470" y="236" font-size="10.2" font-weight="700" fill="#334155">比剛性 E/ρ ≈ 25 GPa·cm³/g</text>
          <text x="470" y="254" font-size="10.2" font-weight="700" fill="#334155">ねじれ変形 &lt; 0.05° に抑制！</text>
          ${drawStatusPill(466, 280, 214, '高剛性＋軽量＋EMIシールド兼任', true)}
        `,
        cards: [
          { label: 'Sony純正型番', line1: 'A-5057-165-A (α7R V系)', line2: '4軸パンタグラフ背面マグ主骨格' },
          { label: 'スゴい工夫', line1: '薄肉ダイカスト＋CNC後加工で', line2: '4隅ピボットの同軸度を±0.02mm維持' },
          { label: '撮影メリット', line1: '片手でタッチ操作しても画面が', line2: 'グラつかずピシッと止まる安心感' },
        ],
      });

    case 'lcd_ma_hinge_mold_b_plate':
      return wrapLcdHdSvg({
        badge: 'D54',
        title: 'MA HINGE BACK MOLD B 補強スチール板＆防水接着シート',
        analogy: '樹脂カバーの裏から支える「ステンレスの添え木」＋「型抜き防水両面シール」',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '3層サンドイッチ補強構造（5-036-113-01 / 5-036-112-01）', '#475569')}
          <!-- Mold B -> Adhesive Sheet -> SUS304 Steel Plate exploded cross section -->
          <rect x="64" y="128" width="340" height="36" rx="6" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
          <text x="234" y="150" text-anchor="middle" font-size="11" font-weight="800" fill="#f8fafc">D48 樹脂製モールドB (5-036-109-01)</text>
          <rect x="76" y="180" width="316" height="26" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" stroke-dasharray="5 3"/>
          <text x="234" y="197" text-anchor="middle" font-size="10.5" font-weight="800" fill="#92400e">5-036-112-01 ダイカット耐湿アクリル防水接着シート</text>
          <rect x="64" y="222" width="340" height="36" rx="6" fill="url(#d54-steel)" stroke="#475569" stroke-width="1.6"/>
          <text x="234" y="244" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">5-036-113-01 プレス成形SUS304補強板 (t=0.30 mm)</text>
          <!-- Alignment dowels -->
          <line x1="92" y1="164" x2="92" y2="222" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2"/>
          <line x1="376" y1="164" x2="376" y2="222" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2"/>
          <text x="234" y="294" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0284c7">4隅ダボ位置決め（貼りズレ &lt; 0.1 mm）＋ 金属・樹脂の熱膨張差を粘着層が吸収</text>
          ${drawPanelBox(456, 82, 236, 248, '曲げ剛性の劇的アップ', '#0284c7')}
          <text x="472" y="136" font-size="10.5" font-weight="800" fill="#e11d48">樹脂単体（たわみ大）</text>
          <path d="M 476 156 Q 574 180 672 156" fill="none" stroke="#e11d48" stroke-width="4" stroke-linecap="round"/>
          <text x="472" y="206" font-size="10.5" font-weight="800" fill="#059669">SUS 0.3mm貼合（剛性 約4倍！）</text>
          <line x1="476" y1="224" x2="672" y2="224" stroke="#059669" stroke-width="5" stroke-linecap="round"/>
          <text x="472" y="256" font-size="10" font-weight="600" fill="#334155">ヤング率 200 GPa の極薄鋼板が</text>
          <text x="472" y="272" font-size="10" font-weight="600" fill="#334155">バッグ圧迫や指掛け荷重を阻止</text>
          ${drawStatusPill(472, 288, 204, '薄さそのまま・剛性4倍＋防滴', true)}
        `,
        cards: [
          { label: 'Sony純正型番', line1: '5-036-113-01（補強プレート）', line2: '5-036-112-01（防水接着シート）' },
          { label: 'スゴい工夫', line1: 'わずか0.3mmのSUS304板と', line2: '防水シート貼合で剛性約4倍' },
          { label: '撮影メリット', line1: 'カメラバッグ内で圧迫されても', line2: 'ヒンジ背面が歪まず水も通さない' },
        ],
      });

    case 'lcd_ma_hinge_front_plate':
      return wrapLcdHdSvg({
        badge: 'D55',
        title: 'MA HINGE FRONT PLATE＆防滴ADEガスケット',
        analogy: 'チルト時に外気に晒される4軸メカの正面を守る「黒い鎧プレート＋ゴムシール」',
        accent: '#1e293b',
        accentSoft: '#e2e8f0',
        body: `
          ${drawPanelBox(28, 82, 398, 248, '上方98°チルト展開時のフロント保護構造（5-036-138 / 139-01）', '#1e293b')}
          <!-- Tilted monitor side cutaway -->
          <rect x="64" y="130" width="20" height="156" rx="4" fill="#475569"/>
          <text x="54" y="210" text-anchor="middle" font-size="10" font-weight="800" fill="#334155" transform="rotate(-90 54 210)">カメラ本体背面</text>
          <!-- Pantograph arms -->
          <line x1="84" y1="164" x2="188" y2="146" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
          <line x1="84" y1="240" x2="210" y2="220" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
          <!-- Front plate + ADE gasket shielding mechanism -->
          <rect x="170" y="136" width="14" height="128" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1.6"/>
          <rect x="162" y="142" width="7" height="116" rx="2" fill="#10b981"/>
          <!-- Tilted LCD monitor -->
          <g transform="translate(230, 210) rotate(-32)">
            <rect x="0" y="-76" width="18" height="152" rx="4" fill="#1e293b" stroke="#0284c7" stroke-width="2"/>
            <rect x="15" y="-68" width="5" height="136" fill="#38bdf8"/>
          </g>
          ${drawRaindrop(218, 114, 0.85)}
          ${drawRaindrop(192, 108, 0.7)}
          ${drawCallout(177, 152, 260, 116, 1, 'FRONT PLATE (5-036-138-01)', 'マットブラック低反射＋砂塵ガード', '#0f172a')}
          ${drawCallout(165, 232, 250, 286, 2, 'ADE防水シート (5-036-139-01)', '防滴密閉＆ビビり共振吸収', '#059669')}
          ${drawPanelBox(442, 82, 250, 248, '3つの同時ミッション', '#0284c7')}
          <rect x="458" y="122" width="218" height="50" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="470" y="142" font-size="11" font-weight="800" fill="#0284c7">① 露出チルト部の防塵防滴</text>
          <text x="470" y="160" font-size="9.8" font-weight="600" fill="#334155">リンク摺動部への砂粒・水滴侵入を阻止</text>
          <rect x="458" y="182" width="218" height="50" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="470" y="202" font-size="11" font-weight="800" fill="#0f172a">② 迷光防止マットブラック</text>
          <text x="470" y="220" font-size="9.8" font-weight="600" fill="#334155">斜め光の液晶裏面への反射を消去</text>
          <rect x="458" y="242" width="218" height="50" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="470" y="262" font-size="11" font-weight="800" fill="#059669">③ 制振ダンパー効果</text>
          <text x="470" y="280" font-size="9.8" font-weight="600" fill="#334155">ADE粘着ガスケットが金属鳴きを吸収</text>
        `,
        cards: [
          { label: 'Sony純正型番', line1: '5-036-138-01（フロント板）', line2: '5-036-139-01（ADE防滴シート）' },
          { label: 'スゴい工夫', line1: 'チルト時に外気へ露出する正面を', line2: '低反射黒板＋防滴ガスケットで密閉' },
          { label: '撮影メリット', line1: 'ローアングル屋外撮影で砂埃や', line2: '小雨がかかってもリンクが噛まない' },
        ],
      });

    case 'lcd_ma_hinge_cover_ul':
      return wrapLcdHdSvg({
        badge: 'D56',
        title: '4軸専用 MAヒンジ・アッパー＆ロア外装カバー',
        analogy: '4軸ヒンジ関節の上下端をすっぽり覆う「0.2mmラビリンス雨よけキャップ」',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '上下端ダストスカート・ラビリンス断面（5-036-102 / 103-01）', '#475569')}
          <!-- Vertical hinge barrel with upper & lower wrap-around caps -->
          <rect x="174" y="138" width="68" height="134" rx="10" fill="url(#d56-steel)" stroke="#475569" stroke-width="1.6"/>
          <text x="208" y="208" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0f172a">縦176°回転</text>
          <text x="208" y="222" text-anchor="middle" font-size="10" font-weight="700" fill="#334155">ステンレス軸</text>
          <!-- Upper cap with skirt -->
          <path d="M 154 114 Q 154 102 170 102 L 246 102 Q 262 102 262 114 L 262 152 L 246 152 L 246 132 L 170 132 L 170 152 L 154 152 Z" fill="url(#d56-mg)" stroke="#0f172a" stroke-width="1.6"/>
          <!-- Lower cap with skirt -->
          <path d="M 154 296 Q 154 308 170 308 L 246 308 Q 262 308 262 296 L 262 258 L 246 258 L 246 278 L 170 278 L 170 258 L 154 258 Z" fill="url(#d56-mg)" stroke="#0f172a" stroke-width="1.6"/>
          ${drawRaindrop(134, 118, 0.9)}
          <path d="M 142 132 Q 148 148 136 168" fill="none" stroke="#0284c7" stroke-width="2" marker-end="url(#d56-arrBlue)"/>
          ${drawCallout(254, 118, 286, 120, 1, 'UPPER (5-036-102-01)', '上部からの垂れ水滴を外へ弾く', '#0284c7')}
          ${drawCallout(254, 290, 286, 286, 2, 'LOWER (5-036-103-01)', '底面接触傷・砂塵侵入ガード', '#334155')}
          ${drawPanelBox(456, 82, 236, 248, '2軸SVカバー(D47)との違い', '#0f766e')}
          <text x="472" y="132" font-size="11" font-weight="800" fill="#0f172a">4軸専用 複雑な逃げ形状</text>
          <text x="472" y="154" font-size="10" font-weight="600" fill="#334155">• 上下チルト＋横開き176°の</text>
          <text x="472" y="170" font-size="10" font-weight="600" fill="#334155">  両可動軌道に干渉しない曲面</text>
          <text x="472" y="194" font-size="10" font-weight="600" fill="#334155">• 回転軸全周をクリアランス</text>
          <text x="472" y="210" font-size="10" font-weight="600" fill="#334155">  0.2 mmのラビリンス段差で封止</text>
          <text x="472" y="234" font-size="10" font-weight="600" fill="#334155">• スナップ爪＋精密ネジの</text>
          <text x="472" y="250" font-size="10" font-weight="600" fill="#334155">  ハイブリッド保守交換構造</text>
          ${drawStatusPill(470, 282, 208, '全天候4軸ヒンジ上下装甲', true)}
        `,
        cards: [
          { label: 'Sony純正型番', line1: '5-036-102-01（アッパー）', line2: '5-036-103-01（ロア）' },
          { label: 'スゴい工夫', line1: '回転軸を0.2mmラビリンススカートで', line2: '包み込み雨滴の表面張力で止水' },
          { label: '撮影メリット', line1: '雨の日の撮影でもヒンジの縦軸', line2: '隙間から水が浸み込みにくい' },
        ],
      });

    case 'lcd_ma_hinge_cover_fr':
      return wrapLcdHdSvg({
        badge: 'D57',
        title: '4軸専用 MAヒンジ・フロント＆リア外装シェル',
        analogy: 'ヒンジの金属関節を前と後ろから貝殻のようにパチンと挟んで守る「2枚装甲」',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'クラムシェル断面（A-5054-221-A / 5-036-105-01）', '#334155')}
          <!-- Top-down cross section of cylindrical clamshell around coax & shaft -->
          <!-- Front curved shell -->
          <path d="M 136 204 A 82 82 0 0 1 300 204 L 278 204 A 60 60 0 0 0 158 204 Z" fill="url(#d57-mg)" stroke="#0f172a" stroke-width="1.6"/>
          <!-- Rear curved shell -->
          <path d="M 136 218 A 82 82 0 0 0 300 218 L 278 218 A 60 60 0 0 1 158 218 Z" fill="#475569" stroke="#0f172a" stroke-width="1.6"/>
          <!-- EPDM labyrinth ribs at left/right seams -->
          <rect x="136" y="204" width="22" height="14" fill="#10b981" stroke="#065f46" stroke-width="1.2"/>
          <rect x="278" y="204" width="22" height="14" fill="#10b981" stroke="#065f46" stroke-width="1.2"/>
          <!-- Inside shaft + coax bundle -->
          <circle cx="218" cy="211" r="34" fill="url(#d57-steel)" stroke="#475569" stroke-width="1.5"/>
          <circle cx="218" cy="211" r="18" fill="#1e293b"/>
          <circle cx="212" cy="206" r="4" fill="#f59e0b"/>
          <circle cx="224" cy="206" r="4" fill="#f59e0b"/>
          <circle cx="218" cy="218" r="4" fill="#38bdf8"/>
          ${drawCallout(218, 128, 290, 118, 1, 'FRONT (A-5054-221-A)', '滑らかなR曲面で手当たり良好', '#0f172a')}
          ${drawCallout(218, 294, 290, 304, 2, 'REAR (5-036-105-01)', 'ケーブルR規制リブ一体成形', '#334155')}
          ${drawCallout(146, 211, 50, 152, 3, '段付きインロー', 'EPDM防滴リブ密閉', '#059669')}
          ${drawPanelBox(456, 82, 236, 248, 'なぜ4分割（上下＋前後）？', '#0284c7')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">極薄肉厚×複雑な内部ガイド</text>
          <text x="472" y="156" font-size="10" font-weight="600" fill="#334155">1. 上下(D56)＋前後(D57)の4分割で</text>
          <text x="472" y="172" font-size="10" font-weight="600" fill="#334155">   回転クラッチと36本同軸を密着保護</text>
          <text x="472" y="198" font-size="10" font-weight="600" fill="#334155">2. 合わせ目を段付きラビリンス化し</text>
          <text x="472" y="214" font-size="10" font-weight="600" fill="#334155">   横殴りの雨・潮風の直撃を遮断</text>
          <text x="472" y="240" font-size="10" font-weight="600" fill="#334155">3. 内壁リブがケーブル挟み込み防止</text>
          ${drawStatusPill(468, 282, 212, '高気密クラムシェル関節カバー', true)}
        `,
        cards: [
          { label: 'Sony純正型番', line1: 'A-5054-221-A（フロント）', line2: '5-036-105-01（リア）' },
          { label: 'スゴい工夫', line1: '段付きインロー接合＋EPDMリブ＋', line2: '内面ケーブル曲げRガイドを一体成形' },
          { label: '撮影メリット', line1: '横開き時に手や三脚が当たっても', line2: '内部の精密カム・配線を安全保護' },
        ],
      });

    case 'lcd_ma_fpc_retainer_insul':
      return wrapLcdHdSvg({
        badge: 'D58',
        title: 'MA HINGE FPC保持プレート＆カプトン絶縁シート',
        analogy: '動く映像ケーブルが金属に擦れて切れないよう守る「押さえバンド＋絶縁シート」',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'LC-1058チルトFPC 3重保護構造（5-036-096 / 573 / 043-045）', '#d97706')}
          <!-- Metal hinge plate -> Kapton sheet -> LC-1058 FPC -> Retainer Clamp -->
          <rect x="54" y="254" width="360" height="28" rx="4" fill="url(#d58-mg)"/>
          <text x="234" y="272" text-anchor="middle" font-size="10.5" font-weight="800" fill="#f8fafc">4軸マグネシウム／ステンレス金属骨格（エッジ鋭利・導電性）</text>
          <!-- Kapton insulation sheet -->
          <rect x="64" y="236" width="340" height="16" rx="3" fill="url(#d58-kapton)" stroke="#92400e" stroke-width="1.3"/>
          <text x="234" y="248" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">② 5-036-573-01 カプトン/PET絶縁耐摩耗シート（耐圧 &gt; 4kV）</text>
          <!-- Flexible LC-1058 U-loop -->
          <path d="M 74 226 L 176 226 C 236 226 244 148 188 148 L 96 148" fill="none" stroke="#f59e0b" stroke-width="9" stroke-linecap="round"/>
          <path d="M 74 226 L 176 226 C 236 226 244 148 188 148 L 96 148" fill="none" stroke="#fef08a" stroke-width="2" stroke-dasharray="6 4"/>
          <text x="292" y="182" font-size="10.5" font-weight="800" fill="#b45309">最小曲げ半径 R_min 維持</text>
          <text x="292" y="198" font-size="9.5" font-weight="700" fill="#475569">銅箔ひずみ ε &lt; 0.3%</text>
          <!-- Stainless Retainer Plate clamping flat anchor -->
          <rect x="70" y="206" width="84" height="16" rx="3" fill="url(#d58-steel)" stroke="#334155" stroke-width="1.5"/>
          ${drawCallout(112, 206, 134, 118, 1, '保持板 (5-036-096-01)', 'ストレインリリーフ固定', '#334155')}
          ${drawCallout(266, 236, 290, 224, 3, '固定粘着 (5-043-045-01)', '端子への引張力遮断', '#0284c7')}
          ${drawPanelBox(456, 82, 236, 248, '10万回屈曲でも切れない理由', '#059669')}
          ${drawStatusPill(470, 122, 208, '保持なし: エッジ摩耗・短絡', false)}
          <text x="474" y="166" font-size="9.8" font-weight="600" fill="#475569">• 屈曲位置がズレて金属角で断線</text>
          <text x="474" y="182" font-size="9.8" font-weight="600" fill="#475569">• 応力がB2Bコネクタ抜けを誘発</text>
          ${drawStatusPill(470, 206, 208, '3点保護: 10万回ゼロ断線', true)}
          <text x="474" y="250" font-size="9.8" font-weight="600" fill="#065f46">• 常に設計通りのU字ループで滑動</text>
          <text x="474" y="266" font-size="9.8" font-weight="600" fill="#065f46">• 低摩擦カプトンで寒冷地も滑らか</text>
          <text x="474" y="282" font-size="9.8" font-weight="600" fill="#065f46">• 4kV超の二重絶縁で短絡ゼロ</text>
        `,
        cards: [
          { label: 'Sony純正型番', line1: '5-036-096-01 / 5-036-573-01', line2: '5-043-045-01（3点保護一式）' },
          { label: 'スゴい工夫', line1: 'SUS押さえ板＋カプトン絶縁膜で', line2: 'FPC曲げ半径と摺動摩耗を完全制御' },
          { label: '撮影メリット', line1: '毎日何度チルト開閉を繰り返しても', line2: '画面が消えるフレキ断線を防止' },
        ],
      });

    case 'lcd_ma_wp_cable_bushing':
      return wrapLcdHdSvg({
        badge: 'D59',
        title: 'MA/SVヒンジ 防滴二重リップ・ケーブルブッシング',
        analogy: 'メイン基板への配線入り口を3重ゴムヒダで密閉する「潜水艦の防水栓」',
        accent: '#0f766e',
        accentSoft: '#ccfbf1',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'バルクヘッド貫通口 3重リップ防水断面（5-036-101-01 / 501161101）', '#0f766e')}
          <!-- Bulkhead wall top & bottom -->
          <rect x="206" y="114" width="38" height="54" fill="url(#d59-mg)"/>
          <rect x="206" y="256" width="38" height="58" fill="url(#d59-mg)"/>
          <text x="225" y="108" text-anchor="middle" font-size="10" font-weight="800" fill="#334155">カメラ背面隔壁</text>
          <!-- Molded EPDM bushing with 3 sealing lips -->
          <path d="M 164 156 L 286 156 L 286 174 L 252 174 L 252 184 L 274 184 L 274 240 L 252 240 L 252 250 L 286 250 L 286 268 L 164 268 L 164 250 L 198 250 L 198 174 L 164 174 Z" fill="#1e293b" stroke="#0f766e" stroke-width="1.8"/>
          <!-- Triple waterproof ribs -->
          <rect x="202" y="166" width="46" height="6" rx="3" fill="#14b8a6"/>
          <rect x="202" y="252" width="46" height="6" rx="3" fill="#14b8a6"/>
          <!-- Coax cable passing cleanly from outside (-Z) to mainboard (+Z) -->
          <rect x="52" y="200" width="356" height="24" rx="12" fill="url(#d59-copper)" stroke="#7c2d12" stroke-width="1.5"/>
          <text x="116" y="216" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">ヒンジ側(外気)</text>
          <text x="342" y="216" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">メイン基板側(密閉)</text>
          ${drawRaindrop(96, 154, 0.9)}
          ${drawRaindrop(134, 174, 0.75)}
          <line x1="156" y1="142" x2="156" y2="280" stroke="#e11d48" stroke-width="2" stroke-dasharray="4 3"/>
          <text x="112" y="294" text-anchor="middle" font-size="10.5" font-weight="800" fill="#e11d48">水滴ここで完全ストップ！</text>
          ${drawPanelBox(456, 82, 236, 248, '防水ブッシングの極意', '#0284c7')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">3重弾性リップ＋内孔密着</text>
          <text x="472" y="156" font-size="10" font-weight="600" fill="#334155">• 隔壁穴へ全周弾性圧入して</text>
          <text x="472" y="172" font-size="10" font-weight="600" fill="#334155">  毛細管浸水をシャットアウト</text>
          <text x="472" y="198" font-size="10" font-weight="600" fill="#334155">• 配線周囲はストレインリリーフ</text>
          <text x="472" y="214" font-size="10" font-weight="600" fill="#334155">  カラーで被覆傷つきを防止</text>
          <text x="472" y="240" font-size="10" font-weight="600" fill="#334155">• 耐寒EPDM (−30℃〜+100℃)</text>
          ${drawStatusPill(468, 282, 212, 'メイン基板への浸水最終防波堤', true)}
        `,
        cards: [
          { label: 'Sony純正型番', line1: '5-036-101-01（MAヒンジ）', line2: '501161101（SV防水ブッシング）' },
          { label: 'スゴい工夫', line1: '3段の弾性EPDM防水リップが', line2: 'ケーブル穴の内外両側を全周密閉' },
          { label: '撮影メリット', line1: '雨天・雪山・海辺の飛沫下でも', line2: 'メイン基板が濡れず故障しない' },
        ],
      });

    case 'lcd_ma_wp_cushion_fpc_mr':
      return wrapLcdHdSvg({
        badge: 'D60',
        title: 'MAヒンジ3系統防滴クッション群（FPC / MR / Sens C）',
        analogy: 'ヒンジ内の3つの隙間を塞ぐ「水を吸わない独立気泡スポンジ＆防滴雨樋シート」',
        accent: '#0f766e',
        accentSoft: '#ccfbf1',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'Sony OEM 3部位専用防滴シール配置マップ', '#0f766e')}
          <!-- 3 distinct die-cut shapes -->
          <rect x="52" y="122" width="166" height="58" rx="8" fill="url(#d60-foam)" stroke="#0f766e" stroke-width="1.6"/>
          <text x="135" y="146" text-anchor="middle" font-size="10.5" font-weight="800" fill="#f8fafc">① WP CUSHION FPC</text>
          <text x="135" y="164" text-anchor="middle" font-size="9.5" font-weight="700" fill="#5eead4">5-036-097-01 (FPC入口封止)</text>

          <rect x="242" y="122" width="174" height="58" rx="8" fill="#1e293b" stroke="#0284c7" stroke-width="2"/>
          <rect x="274" y="138" width="110" height="26" rx="4" fill="#ffffff"/>
          <text x="329" y="155" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0284c7">MR反転センサー室</text>
          <text x="329" y="196" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0284c7">② WP CUSHION MR (5-036-099-01)</text>

          <rect x="52" y="220" width="364" height="56" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
          <text x="234" y="244" text-anchor="middle" font-size="10.8" font-weight="800" fill="#92400e">③ WP SHEET SENS C（5-036-100-01 撥水PETバリアシート）</text>
          <text x="234" y="264" text-anchor="middle" font-size="9.8" font-weight="700" fill="#b45309">結露水滴を電子接点から外側へ逸らす「雨樋（あまどい）」構造</text>

          ${drawPanelBox(456, 82, 236, 248, '独立気泡フォーム vs 普通スポンジ', '#0284c7')}
          <rect x="470" y="122" width="208" height="72" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.2"/>
          <text x="574" y="144" text-anchor="middle" font-size="10.5" font-weight="800" fill="#9f1239">❌ 普通スポンジ（連続気泡）</text>
          <text x="574" y="164" text-anchor="middle" font-size="9.6" font-weight="600" fill="#881337">穴が繋がっており水を吸い込んで</text>
          <text x="574" y="180" text-anchor="middle" font-size="9.6" font-weight="600" fill="#881337">内部基板をサビさせてしまう</text>
          <rect x="470" y="208" width="208" height="82" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.3"/>
          <text x="574" y="230" text-anchor="middle" font-size="10.5" font-weight="800" fill="#14532d">✅ Poron独立気泡フォーム</text>
          <text x="574" y="250" text-anchor="middle" font-size="9.6" font-weight="600" fill="#166534">1粒ずつ密閉された気泡構造で</text>
          <text x="574" y="266" text-anchor="middle" font-size="9.6" font-weight="600" fill="#166534">水を吸わず35%圧縮で強力止水！</text>
          <text x="574" y="282" text-anchor="middle" font-size="9.6" font-weight="700" fill="#059669">10年経ってもヘタらない低歪み</text>
        `,
        cards: [
          { label: 'Sony純正型番', line1: '5-036-097 / 099 / 100-01', line2: '3部位専用の型抜き防滴材' },
          { label: 'スゴい工夫', line1: '独立気泡Poronフォーム＋導電材＋', line2: '撥水PETシートを適材適所で配置' },
          { label: '撮影メリット', line1: '過酷な雨天・湿潤環境でも', line2: '反転センサーやFPCが誤動作しない' },
        ],
      });

    case 'lcd_rear_lc_cover_cushions':
      return wrapLcdHdSvg({
        badge: 'D61',
        title: '背面モニター収納ポケット LCカバー＆防滴クッションA/B',
        analogy: 'モニターを開いたときに現れる「カメラ背中の防水フタ」と上下の「スポンジ堤防」',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'カメラ背面LCDポケット隔壁構造（502794901 / 502863001 / 502863101）', '#334155')}
          <!-- Rear LC Cover front elevation -->
          <rect x="64" y="122" width="340" height="184" rx="12" fill="url(#d61-mg)" stroke="#0f172a" stroke-width="2"/>
          <!-- Upper WP Cushion A -->
          <rect x="86" y="132" width="296" height="20" rx="6" fill="#0f766e" stroke="#5eead4" stroke-width="1.4"/>
          <text x="234" y="146" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">WP CUSHION A (502863001 Ref.54) 上縁防滴堤防</text>
          <!-- Lower WP Cushion B -->
          <rect x="92" y="274" width="284" height="20" rx="6" fill="#0f766e" stroke="#5eead4" stroke-width="1.4"/>
          <text x="234" y="288" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">WP CUSHION B (502863101 Ref.124) 下縁防滴堤防</text>
          <!-- Center heat-dissipation zone + cable portal -->
          <rect x="88" y="168" width="190" height="90" rx="8" fill="#1e293b" stroke="#64748b" stroke-width="1.3"/>
          <text x="183" y="208" text-anchor="middle" font-size="10.5" font-weight="800" fill="#e2e8f0">REAR LC COVER</text>
          <text x="183" y="226" text-anchor="middle" font-size="9.5" font-weight="700" fill="#94a3b8">(502794901 Ref.53)</text>
          <text x="183" y="244" text-anchor="middle" font-size="9.2" font-weight="700" fill="#38bdf8">直下にメイン基板・放熱板</text>
          <!-- Cable slot with gasket -->
          <rect x="296" y="186" width="84" height="52" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="2.5"/>
          <text x="338" y="216" text-anchor="middle" font-size="9.5" font-weight="800" fill="#34d399">配線口シール</text>
          ${drawPanelBox(456, 82, 236, 248, '展開時の2大メリット', '#0284c7')}
          <rect x="470" y="124" width="208" height="72" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="482" y="146" font-size="10.8" font-weight="800" fill="#0284c7">① 開けっ放し雨天撮影OK</text>
          <text x="482" y="166" font-size="9.8" font-weight="600" fill="#334155">液晶を開いて露出しても上下</text>
          <text x="482" y="182" font-size="9.8" font-weight="600" fill="#334155">クッションA/Bが浸水を阻止</text>
          <rect x="470" y="208" width="208" height="72" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="482" y="230" font-size="10.8" font-weight="800" fill="#ea580c">② 8K収録の自然空冷放熱</text>
          <text x="482" y="250" font-size="9.8" font-weight="600" fill="#334155">モニターを開くと背面カバー全体が</text>
          <text x="482" y="266" font-size="9.8" font-weight="600" fill="#334155">外気に触れて放熱性能が大幅UP！</text>
          ${drawStatusPill(470, 292, 208, '防滴隔壁＋8K放熱パネル兼任', true)}
        `,
        cards: [
          { label: 'Sony純正型番', line1: '502794901（LCカバー）', line2: '502863001(A) / 502863101(B)' },
          { label: 'スゴい工夫', line1: '上下クッションA/Bと立体ゴム枠で', line2: '画面展開時の背面ポケットを完全防滴' },
          { label: '撮影メリット', line1: '動画収録時にモニターを開くと', line2: '防滴を保ったまま本体放熱も向上' },
        ],
      });

    case 'lcd_rear_mg_bay_plate':
      return wrapLcdHdSvg({
        badge: 'D62',
        title: '背面マグネシウム受けプレート・緩衝クッション＆遮光シート',
        analogy: 'モニター収納時の衝撃と本体のねじれを受け止める「3層マグネシウム土台」',
        accent: '#64748b',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '背面ポケット最深部 3層構造（5-036-081 / 082 / 088-01）', '#64748b')}
          <!-- 3 stacked layers -->
          <rect x="58" y="128" width="352" height="40" rx="6" fill="#38bdf8" fill-opacity="0.22" stroke="#0284c7" stroke-width="1.6"/>
          <text x="234" y="152" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0c4a6e">① REAR MG CUSHION (5-036-082-01) 粘弾性衝撃吸収パッド</text>
          <rect x="58" y="182" width="352" height="48" rx="6" fill="url(#d62-steel)" stroke="#334155" stroke-width="1.8"/>
          <text x="234" y="210" text-anchor="middle" font-size="11.2" font-weight="800" fill="#0f172a">② REAR MG PLATE (5-036-081-01) マグネシウム高剛性受け板</text>
          <rect x="58" y="244" width="352" height="34" rx="6" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
          <text x="234" y="265" text-anchor="middle" font-size="10.5" font-weight="800" fill="#e2e8f0">③ REAR FRAME SHEET (5-036-088-01) 遮光・防塵フレームシート</text>
          <!-- Impact force arrows dispersing across plate -->
          <path d="M 234 104 L 234 126" stroke="#e11d48" stroke-width="3" marker-end="url(#d62-arrRed)"/>
          <path d="M 180 230 L 120 242" stroke="#059669" stroke-width="2" marker-end="url(#d62-arrGreen)"/>
          <path d="M 288 230 L 348 242" stroke="#059669" stroke-width="2" marker-end="url(#d62-arrGreen)"/>
          <text x="234" y="306" text-anchor="middle" font-size="10.2" font-weight="700" fill="#059669">局所衝撃を全面へ面分散 → 直下のBIONZ XR基板＆IBISを保護！</text>
          ${drawPanelBox(456, 82, 236, 248, 'ボディ剛性への貢献', '#334155')}
          <text x="472" y="132" font-size="10.8" font-weight="800" fill="#0f172a">背面シアパネル（モノコック補強）</text>
          <text x="472" y="156" font-size="10" font-weight="600" fill="#334155">• 超望遠レンズや三脚装着時の</text>
          <text x="472" y="172" font-size="10" font-weight="600" fill="#334155">  カメラ背面ねじれを抑え込む</text>
          <text x="472" y="198" font-size="10" font-weight="600" fill="#334155">• 収納時の衝撃音を吸収し</text>
          <text x="472" y="214" font-size="10" font-weight="600" fill="#334155">  「コトッ」と上質な閉じ音を実現</text>
          <text x="472" y="240" font-size="10" font-weight="600" fill="#334155">• 内部LED光漏れ・微細塵も遮断</text>
          ${drawStatusPill(470, 282, 208, '衝撃分散＋ボディ高剛性化＋遮光', true)}
        `,
        cards: [
          { label: 'Sony純正型番', line1: '5-036-081-01（MGプレート）', line2: '082-01（緩衝材）/ 088-01（シート）' },
          { label: 'スゴい工夫', line1: 'マグネシウム板で衝撃を面分散し', line2: 'エラストマーと遮光シートで二重保護' },
          { label: '撮影メリット', line1: 'モニターを勢いよく閉じても', line2: '内部基板が傷まず重厚な操作感' },
        ],
      });

    case 'lcd_magnetic_cut_plate':
      return wrapLcdHdSvg({
        badge: 'D63',
        title: 'IBIS磁界干渉遮断プレート＆高耐熱N50Hセンサー磁石',
        analogy: 'モニターの磁石が奥の手ブレ補正（IBIS）を狂わせないための「パーマロイ磁気の盾」',
        accent: '#7c3aed',
        accentSoft: '#f3e8ff',
        body: `
          ${drawPanelBox(28, 82, 420, 248, '磁気シャント遮蔽メカニズム（5-036-036-01 / 1-013-923-11）', '#7c3aed')}
          <!-- N50H Magnet on left -->
          <rect x="54" y="168" width="44" height="68" rx="4" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
          <rect x="98" y="168" width="44" height="68" rx="4" fill="#3b82f6" stroke="#1e40af" stroke-width="1.5"/>
          <text x="76" y="206" text-anchor="middle" font-size="13" font-weight="900" fill="#ffffff">N</text>
          <text x="120" y="206" text-anchor="middle" font-size="13" font-weight="900" fill="#ffffff">S</text>
          <text x="98" y="254" text-anchor="middle" font-size="9.5" font-weight="800" fill="#334155">N50H-MF磁石</text>
          <text x="98" y="268" text-anchor="middle" font-size="9" font-weight="700" fill="#64748b">(1-013-923-11)</text>
          <!-- Magnetic Cut Plate (Permalloy) -->
          <rect x="206" y="124" width="22" height="164" rx="4" fill="url(#d63-steel)" stroke="#7c3aed" stroke-width="2.2"/>
          <text x="217" y="116" text-anchor="middle" font-size="10.2" font-weight="800" fill="#7c3aed">MAGNETIC CUT PLATE</text>
          <!-- Flux lines bending cleanly inside plate instead of reaching IBIS! -->
          <path d="M 142 184 Q 204 176 216 146" fill="none" stroke="#7c3aed" stroke-width="2.2" marker-end="url(#d63-arrPurple)"/>
          <path d="M 216 146 L 216 268" fill="none" stroke="#7c3aed" stroke-width="2.6"/>
          <path d="M 216 268 Q 204 226 142 220" fill="none" stroke="#7c3aed" stroke-width="2.2" marker-end="url(#d63-arrPurple)"/>
          <!-- Protected IBIS VCM on right -->
          <rect x="288" y="142" width="136" height="124" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="1.8"/>
          <text x="356" y="182" text-anchor="middle" font-size="11.5" font-weight="800" fill="#14532d">5軸 IBIS 手ブレ補正</text>
          <text x="356" y="202" text-anchor="middle" font-size="10" font-weight="700" fill="#166534">VCMモーター＆磁気センサー</text>
          <text x="356" y="226" text-anchor="middle" font-size="11" font-weight="900" fill="#059669">漏洩磁束 &lt; 0.1 mT</text>
          <text x="356" y="246" text-anchor="middle" font-size="9.5" font-weight="700" fill="#047857">（磁気干渉ゼロ！）</text>
          ${drawPanelBox(464, 82, 228, 248, 'なぜN50H高耐熱磁石？', '#dc2626')}
          <text x="478" y="132" font-size="10.5" font-weight="800" fill="#0f172a">8K長時間収録の熱に負けない</text>
          <text x="478" y="156" font-size="9.8" font-weight="600" fill="#334155">• 安価なN35磁石は80℃超で</text>
          <text x="478" y="172" font-size="9.8" font-weight="600" fill="#334155">  永久減磁し開閉検知が故障</text>
          <text x="478" y="198" font-size="9.8" font-weight="600" fill="#059669">• 高保磁力 N50H (120℃耐熱)</text>
          <text x="478" y="214" font-size="9.8" font-weight="600" fill="#059669">  なら猛暑8K撮影でも安定動作</text>
          <text x="478" y="242" font-size="9.8" font-weight="600" fill="#7c3aed">• 高透磁率板が磁力線を内部に</text>
          <text x="478" y="258" font-size="9.8" font-weight="600" fill="#7c3aed">  吸い込みIBIS 8.0段精度を死守</text>
          ${drawStatusPill(474, 282, 208, '開閉しても手ブレ補正ゼロ変動', true)}
        `,
        cards: [
          { label: 'Sony純正型番', line1: '5-036-036-01 / 502789501', line2: '磁石: 1-013-923-11 (N50H-MF)' },
          { label: 'スゴい工夫', line1: '高透磁率パーマロイ板が磁束を', line2: 'バイパスしIBISへの干渉を遮断' },
          { label: '撮影メリット', line1: 'モニターを開閉・反転しても', line2: '8.0段手ブレ補正の精度が狂わない' },
        ],
      });

    case 'lcd_front_cab_bezel_frame':
      return wrapLcdHdSvg({
        badge: 'D64',
        title: '液晶モジュール前面キャビネット外枠＆防塵ラビリンス段差',
        analogy: 'ガラスの一番割れやすい「端っこ」を守り手袋でも開きやすい「黒い額縁枠」',
        accent: '#1e293b',
        accentSoft: '#e2e8f0',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '外周エッジガード＋2段防塵ラビリンス断面（A-5054-222-A）', '#1e293b')}
          <!-- Enlarged cross section of bezel lip protecting cover glass edge -->
          <path d="M 76 116 L 138 116 L 138 148 L 194 148 L 194 188 L 246 188 L 246 286 L 76 286 Z" fill="url(#d64-mg)" stroke="#0f172a" stroke-width="2"/>
          <!-- Cover glass recessed by 0.15 mm -->
          <rect x="142" y="130" width="268" height="34" rx="4" fill="url(#d64-glass)" stroke="#0284c7" stroke-width="1.6"/>
          <text x="276" y="151" text-anchor="middle" font-size="11" font-weight="800" fill="#0c4a6e">D01 カバーガラス（枠より 0.15 mm 低く収容）</text>
          <!-- D30 Waterproof PSA tape seated on step -->
          <rect x="142" y="164" width="52" height="16" fill="#10b981" stroke="#065f46" stroke-width="1.2"/>
          <!-- IPS + BLU beneath -->
          <rect x="200" y="172" width="210" height="44" rx="4" fill="#e2e8f0" stroke="#64748b"/>
          <text x="305" y="198" text-anchor="middle" font-size="10.5" font-weight="800" fill="#334155">IPS液晶セル＋BLU積層</text>
          <!-- Table surface test line -->
          <line x1="60" y1="114" x2="412" y2="114" stroke="#e11d48" stroke-width="1.6" stroke-dasharray="5 3"/>
          ${drawCallout(106, 116, 206, 102, 1, '+0.15mm マイクロバンパー', '画面下向きに置いてもガラス非接触', '#e11d48')}
          ${drawCallout(168, 172, 260, 248, 2, '2段防塵ラビリンス段差', '水滴・砂塵の回り込み経路を延長', '#059669')}
          ${drawPanelBox(456, 82, 236, 248, '操作性と狭額縁の両立', '#0284c7')}
          <rect x="472" y="124" width="204" height="68" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="574" y="146" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">下部フィンガースクープ</text>
          <text x="574" y="166" text-anchor="middle" font-size="9.8" font-weight="600" fill="#334155">冬山で厚手の手袋をしたままでも</text>
          <text x="574" y="182" text-anchor="middle" font-size="9.8" font-weight="600" fill="#334155">親指が掛かり一発チルト展開！</text>
          <rect x="472" y="204" width="204" height="62" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="574" y="226" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0284c7">狭額縁 3.2型大画面化</text>
          <text x="574" y="248" text-anchor="middle" font-size="9.8" font-weight="600" fill="#334155">高剛性薄肉枠で外寸を変えず拡大</text>
          ${drawStatusPill(472, 280, 204, '端面割れ防止＋防滴＋手袋操作', true)}
        `,
        cards: [
          { label: 'Sony純正型番', line1: 'A-5054-222-A（α7R V 3.2型）', line2: 'A-5038-710-A（α7 IV 3.0型）' },
          { label: 'スゴい工夫', line1: '0.15mm高のエッジ保護縁取り＋', line2: '2段ラビリンス＋指掛けスクープ' },
          { label: '撮影メリット', line1: '机へ置いてもガラス面が擦れず', line2: '厳冬期の手袋装着時も素早く展開' },
        ],
      });

    case 'lcd_ion_exchange_layer':
      return wrapLcdHdSvg({
        badge: 'D65',
        title: '化学強化イオン交換圧縮応力層（K⁺/Na⁺ DOL 50μm）',
        analogy: '小さな粒を大きな粒へ入れ替えて表面をぎゅうぎゅうに締め付ける「見えないガラスの鎧」',
        accent: '#06b6d4',
        accentSoft: '#cffafe',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '400℃ KNO₃溶融塩浴 イオン交換メカニズム（Gorilla / Dragontrail級）', '#06b6d4')}
          <!-- Glass surface cutaway showing big K+ ions squeezing surface (DOL 50um) -->
          <rect x="52" y="136" width="364" height="58" fill="#06b6d4" fill-opacity="0.22" stroke="#0891b2" stroke-width="1.6"/>
          <rect x="52" y="194" width="364" height="82" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.4"/>
          <text x="234" y="128" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0e7490">表層 DOL ≈ 50 μm：大きなカリウムイオン K⁺ が押し合い圧縮応力 CS ≥ 950 MPa！</text>
          <!-- Large K+ spheres tightly packed in top layer -->
          ${Array.from({ length: 11 })
            .map((_, i) => {
              const cx = 74 + i * 32;
              return `<circle cx="${cx}" cy="165" r="12" fill="#06b6d4" stroke="#0e7490" stroke-width="1.4"/>
              <text x="${cx}" y="169" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">K⁺</text>`;
            })
            .join('')}
          <!-- Small Na+ spheres inside bulk glass -->
          ${Array.from({ length: 11 })
            .map((_, i) => {
              const cx = 74 + i * 32;
              return `<circle cx="${cx}" cy="234" r="7.5" fill="#94a3b8" stroke="#475569" stroke-width="1.2"/>
              <text x="${cx}" y="237" text-anchor="middle" font-size="7.5" font-weight="800" fill="#ffffff">Na⁺</text>`;
            })
            .join('')}
          <!-- Horizontal inward compressive arrows -->
          <line x1="60" y1="146" x2="110" y2="146" stroke="#e11d48" stroke-width="2.2" marker-end="url(#d65-arrRed)"/>
          <line x1="408" y1="146" x2="358" y2="146" stroke="#e11d48" stroke-width="2.2" marker-end="url(#d65-arrRed)"/>
          <text x="234" y="298" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0f172a">小さな傷ができても強い圧縮力が傷口を押し閉じて割れを防ぐ！</text>
          ${drawPanelBox(456, 82, 236, 248, '物理強度データ比較', '#0284c7')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">イオン半径の体積膨張効果</text>
          <text x="472" y="156" font-size="10" font-weight="700" fill="#475569">• Na⁺ 半径: 1.02 Å (元)</text>
          <text x="472" y="174" font-size="10" font-weight="700" fill="#0891b2">• K⁺  半径: 1.38 Å (体積2.5倍)</text>
          <rect x="472" y="194" width="204" height="68" rx="8" fill="#ecfeff" stroke="#06b6d4"/>
          <text x="574" y="216" text-anchor="middle" font-size="11" font-weight="800" fill="#0e7490">圧縮応力 CS ≥ 950 MPa</text>
          <text x="574" y="234" text-anchor="middle" font-size="9.8" font-weight="700" fill="#155e75">（約 9.7 トン/cm² の表面鎧）</text>
          <text x="574" y="252" text-anchor="middle" font-size="9.8" font-weight="700" fill="#059669">0.5mm極薄でも強度 6〜8 倍！</text>
          ${drawStatusPill(472, 280, 204, '薄型カバーガラスの高耐衝撃性', true)}
        `,
        cards: [
          { label: '物理原理', line1: '400℃溶融塩で小さなNa⁺を', line2: '大きなK⁺へ置換する化学強化層' },
          { label: 'スゴい工夫', line1: '表層50μmに約10トン/cm²級の', line2: '圧縮応力を封じ込めヒビ進展を阻止' },
          { label: '撮影メリット', line1: 'わずか0.5mmの薄さと軽さのまま', line2: '現場での打撃・曲げ割れに強い' },
        ],
      });

    case 'lcd_qwp_sunglass_film':
      return wrapLcdHdSvg({
        badge: 'D66',
        title: '広帯域1/4波長位相差フィルム（λ/4 QWP — 偏光サングラス対応）',
        analogy: '一直線のLCD光を「らせん状の円偏光」に変えてサングラス暗転を消す魔法フィルム',
        accent: '#4f46e5',
        accentSoft: '#eef2ff',
        body: `
          ${drawPanelBox(28, 82, 326, 248, '❌ QWPなし（従来の直線偏光LCD）', '#e11d48', '#fff1f2')}
          <!-- Linear vertical wave hitting horizontal polarizer -> blocked! -->
          <rect x="52" y="140" width="44" height="110" rx="6" fill="#334155"/>
          <text x="74" y="198" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">LCD</text>
          <line x1="98" y1="195" x2="196" y2="195" stroke="#e11d48" stroke-width="2.4" marker-end="url(#d66-arrRed)"/>
          <line x1="146" y1="164" x2="146" y2="226" stroke="#e11d48" stroke-width="3"/>
          <text x="146" y="154" text-anchor="middle" font-size="9.5" font-weight="800" fill="#be123c">直線偏光(縦)</text>
          <rect x="206" y="142" width="22" height="106" rx="4" fill="#1e293b"/>
          <text x="217" y="132" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0f172a">偏光サングラス</text>
          <rect x="242" y="162" width="96" height="66" rx="8" fill="#0f172a"/>
          <text x="290" y="192" text-anchor="middle" font-size="11.5" font-weight="900" fill="#fb7185">真っ暗！</text>
          <text x="290" y="210" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fda4af">cos²(90°)=0</text>
          ${drawStatusPill(64, 286, 254, '縦位置にすると画面ブラックアウト', false)}

          ${drawPanelBox(368, 82, 324, 248, '✅ λ/4 QWPフィルム搭載（円偏光出力）', '#4f46e5', '#eef2ff')}
          <rect x="386" y="140" width="38" height="110" rx="6" fill="#334155"/>
          <text x="405" y="198" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">LCD</text>
          <rect x="434" y="136" width="24" height="118" rx="4" fill="#6366f1" stroke="#312e81" stroke-width="1.5"/>
          <text x="446" y="128" text-anchor="middle" font-size="9.5" font-weight="900" fill="#4f46e5">λ/4 QWP</text>
          <!-- Helix circular polarization -->
          <path d="M 462 195 Q 478 164 494 195 T 526 195 T 558 195" fill="none" stroke="#0284c7" stroke-width="2.6"/>
          <ellipse cx="510" cy="195" rx="14" ry="24" fill="none" stroke="#4f46e5" stroke-width="1.8" stroke-dasharray="3 2"/>
          <text x="510" y="156" text-anchor="middle" font-size="9.5" font-weight="800" fill="#4f46e5">円偏光(全方向)</text>
          <rect x="564" y="142" width="20" height="106" rx="4" fill="#1e293b"/>
          <rect x="594" y="162" width="84" height="66" rx="8" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
          <text x="636" y="192" text-anchor="middle" font-size="11.5" font-weight="900" fill="#ffffff">クッキリ！</text>
          <text x="636" y="210" text-anchor="middle" font-size="9.5" font-weight="700" fill="#e0f2fe">縦横どこでも50%</text>
          ${drawStatusPill(400, 286, 260, '縦位置・横位置・4軸回転すべて鮮明', true)}
        `,
        cards: [
          { label: 'どんな層？', line1: '前面偏光板へ45°軸で貼合する', line2: '位相差 R_e≈140nm 広帯域QWP' },
          { label: 'スゴい工夫', line1: '逆波長分散ポリマーでRGB全域を', line2: '着色なく綺麗な円偏光へ変換' },
          { label: '撮影メリット', line1: '海・雪山・釣り・スポーツ現場で', line2: '偏光サングラスのまま縦横撮影OK' },
        ],
      });

    case 'lcd_rear_ito_emi_shield':
      return wrapLcdHdSvg({
        badge: 'D67',
        title: 'タッチ層裏面・透明ITOノイズシールド層',
        analogy: '液晶側の激しい電気ノイズを吸い取って「ゴーストタッチ」を防ぐ透明カーテン',
        accent: '#0d9488',
        accentSoft: '#ccfbf1',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'フルラミネーション内部の静電容量ノイズ遮断断面', '#0d9488')}
          <!-- Finger + Cover glass + Touch ITO -->
          <rect x="64" y="120" width="340" height="32" rx="5" fill="url(#d67-glass)" stroke="#0284c7" stroke-width="1.5"/>
          <text x="234" y="140" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0c4a6e">D01/D31 静電容量タッチセンサー格子 (極微弱 ΔC ≈ 0.5 pF 検出)</text>
          <!-- Rear Anti-EMI Transparent ITO Shield (highlighted!) -->
          <rect x="64" y="168" width="340" height="28" rx="4" fill="#14b8a6" fill-opacity="0.32" stroke="#0f766e" stroke-width="2.2"/>
          <text x="234" y="186" text-anchor="middle" font-size="11" font-weight="900" fill="#115e59">★ D67 全面透明ITOノイズシールド膜（50〜100 Ω/□ / 透過率&gt;90%）</text>
          <!-- Ground wire on right -->
          <polyline points="404,182 426,182 426,222" fill="none" stroke="#0f766e" stroke-width="2.6"/>
          <line x1="416" y1="222" x2="436" y2="222" stroke="#0f766e" stroke-width="2.4"/>
          <line x1="420" y1="227" x2="432" y2="227" stroke="#0f766e" stroke-width="2"/>
          <line x1="423" y1="232" x2="429" y2="232" stroke="#0f766e" stroke-width="1.6"/>
          <text x="418" y="248" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0f766e">GND</text>
          <!-- IPS LCD noisy VCOM source below -->
          <rect x="64" y="236" width="340" height="44" rx="5" fill="#1e293b" stroke="#e11d48" stroke-width="1.8"/>
          <text x="234" y="256" text-anchor="middle" font-size="10.8" font-weight="800" fill="#fda4af">IPS液晶セル VCOM高速極性反転ノイズ源 (60–120Hz)</text>
          <text x="234" y="272" text-anchor="middle" font-size="9.5" font-weight="700" fill="#cbd5e1">距離 &lt; 0.3 mm で強力な容量性ノイズを放射！</text>
          <!-- Noise zigzags blocked at ITO layer -->
          ${[120, 190, 260, 330]
            .map(
              (x) => `<path d="M ${x} 234 L ${x - 6} 218 L ${x + 6} 206 L ${x} 198" fill="none" stroke="#e11d48" stroke-width="2" marker-end="url(#d67-arrRed)"/>`
            )
            .join('')}
          ${drawPanelBox(456, 82, 236, 248, 'ノイズ遮断の効果', '#0284c7')}
          <text x="472" y="132" font-size="10.8" font-weight="800" fill="#0f172a">ノイズ結合を 1/20 以下に圧縮</text>
          <text x="472" y="158" font-size="10" font-weight="600" fill="#334155">• 外周の銀ペースト低抵抗バスと</text>
          <text x="472" y="174" font-size="10" font-weight="600" fill="#334155">  デュアル金GNDタブで最短接地</text>
          <text x="472" y="200" font-size="10" font-weight="600" fill="#334155">• 屈折率整合コートにより肉眼では</text>
          <text x="472" y="216" font-size="10" font-weight="600" fill="#334155">  完全無色透明（透過率 &gt; 90%）</text>
          ${drawStatusPill(470, 278, 208, '誤タッチ・AF枠ブレを完全防止', true)}
        `,
        cards: [
          { label: 'どんな層？', line1: 'タッチ格子とIPS液晶の間に挟む', line2: '全面接地された透明ITOシールド膜' },
          { label: 'スゴい工夫', line1: '距離0.3mmのOCA密着でも', line2: 'VCOM駆動ノイズを1/20以下へ遮蔽' },
          { label: '撮影メリット', line1: 'タッチトラッキングAFの座標ブレや', line2: '勝手な誤タッチを完全に防ぐ' },
        ],
      });

    case 'lcd_silver_bezel_bus':
      return wrapLcdHdSvg({
        badge: 'D68',
        title: '外周30/30μm銀ペースト引き回し配線＆ACF/FOG圧着部',
        analogy: '画面の黒い額縁の裏を走る「髪の毛より細い銀色の数十車線ハイウェイ」',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '黒ベゼル裏面 30/30 μm レーザーエッチング銀配線レイアウト', '#475569')}
          <!-- Black bezel frame -->
          <rect x="64" y="116" width="340" height="196" rx="10" fill="#0f172a" stroke="#334155" stroke-width="2"/>
          <!-- Active transparent ITO touch area -->
          <rect x="116" y="142" width="236" height="132" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2"/>
          <text x="234" y="212" text-anchor="middle" font-size="11" font-weight="800" fill="#7dd3fc">中央 透明ITOセンサー格子</text>
          <!-- Fine silver bus lines running down left & right bezel into bottom ACF -->
          ${Array.from({ length: 6 })
            .map((_, i) => {
              const lx = 74 + i * 6.5;
              const rx = 394 - i * 6.5;
              const by = 282 + i * 3.8;
              return `
                <polyline points="116,${156 + i * 18} ${lx},${156 + i * 18} ${lx},${by} 206,${by}" fill="none" stroke="#cbd5e1" stroke-width="1.6"/>
                <polyline points="352,${156 + i * 18} ${rx},${156 + i * 18} ${rx},${by} 262,${by}" fill="none" stroke="#cbd5e1" stroke-width="1.6"/>`;
            })
            .join('')}
          <!-- Bottom gold ACF/FOG bonding bar -->
          <rect x="196" y="278" width="76" height="28" rx="3" fill="url(#d68-gold)" stroke="#92400e" stroke-width="1.4"/>
          <text x="234" y="296" text-anchor="middle" font-size="9.5" font-weight="900" fill="#451a03">ACF / FOG 圧着</text>
          ${drawPanelBox(456, 82, 236, 248, 'なぜ銀(Ag)へ乗り換える？', '#0284c7')}
          <text x="472" y="132" font-size="10.8" font-weight="800" fill="#0f172a">電気抵抗 約 1/100 へ激減！</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• 透明ITOは抵抗が高いため外周は</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  低抵抗Agペーストへ即切替</text>
          <text x="472" y="198" font-size="9.8" font-weight="600" fill="#334155">• 線幅30μm/間隔30μmの超微細化で</text>
          <text x="472" y="214" font-size="9.8" font-weight="600" fill="#334155">  細い額縁内に40本の線を収容</text>
          <text x="472" y="240" font-size="9.8" font-weight="600" fill="#b45309">• 下端は金メッキ導電粒入りACFで</text>
          <text x="472" y="256" font-size="9.8" font-weight="600" fill="#b45309">  縦だけ導通・横絶縁でFPC圧着</text>
          ${drawStatusPill(470, 282, 208, '狭額縁×高速タッチ応答を実現', true)}
        `,
        cards: [
          { label: 'どんな配線？', line1: '黒ベゼル裏に隠された30/30μm', line2: '超微細銀ペースト引き回しバス' },
          { label: 'スゴい工夫', line1: 'レーザー描画で髪の毛の半分以下に', line2: '細線化しACF熱圧着でFPCへ直結' },
          { label: '撮影メリット', line1: '細いベゼルの大画面と遅延ゼロの', line2: 'タッチAF操作を同時に実現' },
        ],
      });

    case 'lcd_zif_fliplock_stiffener':
      return wrapLcdHdSvg({
        badge: 'D69',
        title: '0.35mmピッチ ZIFフリップロックFPCコネクタ＆補強板',
        analogy: 'ペラペラ配線を傷めずパチンと挟み込む「パタパタ扉の超精密ソケット」',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'バックフリップ式 ZIFカム加圧ロック断面（Pitch 0.35 mm）', '#d97706')}
          <!-- PCB base -->
          <rect x="48" y="264" width="372" height="24" rx="4" fill="url(#d69-pcb)"/>
          <text x="234" y="280" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">PD-1072 ドライバー基板</text>
          <!-- Ivory LCP connector housing -->
          <rect x="92" y="176" width="160" height="88" rx="6" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.8"/>
          <!-- Hinged black flip-lock actuator cam -->
          <path d="M 102 176 L 136 122 L 154 134 L 130 182 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
          <path d="M 148 134 A 42 42 0 0 1 178 164" fill="none" stroke="#e11d48" stroke-width="2.2" marker-end="url(#d69-arrRed)"/>
          <text x="174" y="132" font-size="10" font-weight="800" fill="#e11d48">閉じるだけで均一加圧!</text>
          <!-- Gold contact spring pressing FPC -->
          <path d="M 110 264 L 110 230 L 236 230 L 236 218" fill="none" stroke="#eab308" stroke-width="4.5" stroke-linecap="round"/>
          <!-- Inserted FPC + Blue/Green FR-4 Stiffener -->
          <rect x="148" y="206" width="256" height="12" rx="2" fill="url(#d69-kapton)" stroke="#92400e" stroke-width="1.3"/>
          <rect x="148" y="192" width="186" height="14" rx="2" fill="#059669" stroke="#064e3b" stroke-width="1.3"/>
          ${drawCallout(266, 198, 290, 146, 1, 'FR-4/PI補強板', '総厚 0.20±0.03mm厳密管理', '#059669')}
          ${drawCallout(290, 212, 290, 246, 2, '極薄FPCフレキ', '無挿入力(ZIF)で接点無傷', '#d97706')}
          ${drawPanelBox(456, 82, 236, 248, '0.35mm狭ピッチの信頼性', '#0284c7')}
          <text x="472" y="132" font-size="10.8" font-weight="800" fill="#0f172a">接触抵抗 &lt; 50 mΩ を生涯維持</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• 千鳥配列0.35mmピッチ金メッキ</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  リン青銅バネが均一押圧</text>
          <text x="472" y="198" font-size="9.8" font-weight="600" fill="#334155">• 両端サイドノッチ抜け止め爪が</text>
          <text x="472" y="214" font-size="9.8" font-weight="600" fill="#334155">  落下衝撃による抜け・半挿し防止</text>
          <text x="472" y="240" font-size="9.8" font-weight="600" fill="#334155">• 補強板が曲がりを防ぎ確実嵌合</text>
          ${drawStatusPill(470, 282, 208, '無傷挿入＋振動ゼロ抜け接続', true)}
        `,
        cards: [
          { label: 'どんな部品？', line1: 'タッチ・表示FPCを基板へ繋ぐ', line2: '0.35mm ZIFフリップロック端子' },
          { label: 'スゴい工夫', line1: '挿入時は力ゼロで端子を傷めず', line2: 'レバー閉鎖＋補強板で強固ロック' },
          { label: '撮影メリット', line1: '激しい振動や落下ショックでも', line2: '接触不良・画面ブラックアウトゼロ' },
        ],
      });

    default:
      return null;
  }
}
