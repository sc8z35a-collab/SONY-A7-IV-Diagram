import { PartExplanation } from '../../assemblies/types';
import {
  drawCallout,
  drawPanelBox,
  drawStatusPill,
  wrapLcdHdSvg,
} from './shared';

/**
 * Phase 34 Ultra-HD 720x470 LCD Technical Infographic Schematics — Group B (D70–D89).
 * Covers IPS Cell Sub-Micron Glass/TFT/Seal (D70–D76), BLU Separation (D77–D81),
 * and In-Monitor Power/Signal/DDIC/Micro-Coax Electronics (D82–D89).
 */
export function renderLcdHdGroupB(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    case 'lcd_cf_eagle_xg_glass':
      return wrapLcdHdSvg({
        badge: 'D70',
        title: '上部カラーフィルタ側 無アルカリ超薄ガラス基板（0.25mm）',
        analogy: '不純物ゼロ・凹凸0.2nm未満の原子級フラットさでRGBを支える「上の極薄ハイテクガラス」',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'オーバーフローフュージョン製法＋ケミカルスリミング断面', '#0284c7')}
          <!-- Upper CF Glass (highlighted) -->
          <rect x="58" y="132" width="352" height="44" rx="4" fill="url(#d70-glass)" stroke="#0284c7" stroke-width="2.2"/>
          <text x="234" y="158" text-anchor="middle" font-size="11.2" font-weight="900" fill="#0c4a6e">★ D70 上部CF 無アルカリガラス (t = 0.25 mm / Ra &lt; 0.2 nm)</text>
          <!-- BM + RGB below -->
          <rect x="74" y="176" width="320" height="20" fill="url(#d70-rgb)" opacity="0.82"/>
          <text x="234" y="190" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">ブラックマトリクス(BM)＋RGBカラーフィルタ</text>
          <!-- Liquid crystal 3.2 um gap -->
          <rect x="74" y="196" width="320" height="24" fill="#e0f2fe" stroke="#38bdf8" stroke-dasharray="4 2"/>
          <text x="234" y="212" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0369a1">IPS液晶層 (セルギャップ 3.20 ± 0.05 μm)</text>
          <!-- Lower TFT glass -->
          <rect x="58" y="220" width="352" height="36" rx="4" fill="#cbd5e1" stroke="#64748b" stroke-width="1.4"/>
          <text x="234" y="242" text-anchor="middle" font-size="10.2" font-weight="800" fill="#334155">D71 下部TFT 無アルカリガラス基板</text>
          <!-- Fiducial mark callout -->
          <path d="M 74 146 L 86 146 M 80 140 L 80 152" stroke="#eab308" stroke-width="2.4"/>
          <text x="234" y="294" text-anchor="middle" font-size="10.4" font-weight="800" fill="#0284c7">四隅レーザーフィデューシャルマークで上下基板を ±1 μm 精度貼合！</text>
          ${drawPanelBox(456, 82, 236, 248, 'なぜ「無アルカリ」必須？', '#0f766e')}
          ${drawStatusPill(470, 122, 208, '普通窓ガラス: Na⁺イオン溶出', false)}
          <text x="474" y="164" font-size="9.6" font-weight="600" fill="#881337">ナトリウム不純物が液晶へ溶け</text>
          <text x="474" y="180" font-size="9.6" font-weight="600" fill="#881337">電圧保持率低下・焼き付き発生</text>
          ${drawStatusPill(470, 202, 208, 'EAGLE XG Slim: 不純物ゼロ', true)}
          <text x="474" y="244" font-size="9.8" font-weight="700" fill="#065f46">• CTE = 3.2 ppm/K（反りなし）</text>
          <text x="474" y="262" font-size="9.8" font-weight="700" fill="#065f46">• 表面粗さ Ra &lt; 0.2 nm（無研磨）</text>
          <text x="474" y="280" font-size="9.8" font-weight="700" fill="#065f46">• 化学スリミングで 0.25mm極薄</text>
        `,
        cards: [
          { label: 'どんな基板？', line1: 'Corning EAGLE XG Slim級の', line2: '0.25mm無アルカリ・アルミノホウケイ酸' },
          { label: 'スゴい工夫', line1: '溶融ダウンドロー法で研磨不要の', line2: '原子級平滑面(Ra<0.2nm)を実現' },
          { label: '撮影メリット', line1: '画面の端まで色ムラ・黒浮きゼロ', line2: 'かつ4軸モニターの大幅軽量化' },
        ],
      });

    case 'lcd_tft_eagle_xg_glass':
      return wrapLcdHdSvg({
        badge: 'D71',
        title: '下部TFT無アルカリガラス基板＆COGドライバー実装レッジ',
        analogy: '上のガラスより3mm長く突き出した「縁側」に極細チップを直載する下の基板',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '段差テラス（COG実装レッジ）断面構造', '#0284c7')}
          <!-- Upper CF glass shorter -->
          <rect x="52" y="138" width="236" height="36" rx="4" fill="url(#d71-glass)" stroke="#0284c7" stroke-width="1.5"/>
          <text x="170" y="160" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0c4a6e">上部CFガラス (表示エリア)</text>
          <!-- LC layer -->
          <rect x="64" y="174" width="212" height="18" fill="#bae6fd" stroke="#0284c7" stroke-dasharray="3 2"/>
          <!-- Lower TFT glass extending right to form COG ledge! -->
          <rect x="52" y="192" width="366" height="40" rx="4" fill="url(#d71-steel)" stroke="#0284c7" stroke-width="2.2"/>
          <text x="180" y="216" text-anchor="middle" font-size="10.8" font-weight="900" fill="#0f172a">★ D71 下部TFT無アルカリガラス (0.25mm)</text>
          <!-- Extended COG Ledge area -->
          <rect x="292" y="182" width="122" height="10" fill="url(#d71-gold)"/>
          <!-- COG DDIC chip sitting right on ledge! -->
          <rect x="304" y="156" width="56" height="26" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.6"/>
          <text x="332" y="173" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fde047">COG DDIC</text>
          <!-- FPC attached at far right edge -->
          <rect x="366" y="172" width="52" height="10" rx="2" fill="url(#d71-kapton)"/>
          ${drawCallout(332, 156, 260, 114, 1, 'COG実装レッジ (約3.0mm突出)', '2,000本超のファンアウト配線を集約', '#d97706')}
          ${drawCallout(390, 178, 310, 274, 2, 'Tuffy防湿UV樹脂コート', '単板露出部の割れ・腐食を保護', '#059669')}
          ${drawPanelBox(456, 82, 236, 248, 'ELAレーザー耐熱スペック', '#6366f1')}
          <text x="472" y="132" font-size="10.8" font-weight="800" fill="#0f172a">歪点 T_strain &gt; 660 ℃</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• LTPS多結晶シリコン形成時の</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  エキシマレーザー瞬間1,000℃超</text>
          <text x="472" y="188" font-size="9.8" font-weight="600" fill="#334155">  アニールでも寸法収縮極小！</text>
          <text x="472" y="218" font-size="9.8" font-weight="600" fill="#4338ca">• 下端テラスへICを直接ACF圧着し</text>
          <text x="472" y="234" font-size="9.8" font-weight="600" fill="#4338ca">  超狭額縁の3.2型大画面を実現</text>
          ${drawStatusPill(470, 280, 208, '高耐熱LTPS母材＋狭額縁COG土台', true)}
        `,
        cards: [
          { label: '特徴構造', line1: '上ガラスより下端が約3mm長い', line2: 'COGドライバー直載テラス基板' },
          { label: 'スゴい工夫', line1: '歪点660℃超の高耐熱ガラスが', line2: 'LTPSレーザー結晶化プロセスに耐える' },
          { label: '撮影メリット', line1: 'ドライバーICをガラスへ直結し', line2: 'カメラ背面の限られた枠で画面最大化' },
        ],
      });

    case 'lcd_cf_acrylic_overcoat':
      return wrapLcdHdSvg({
        badge: 'D72',
        title: 'カラーフィルタ平坦化アクリルオーバーコート層（OC膜 1.8μm）',
        analogy: 'RGB顔料のデコボコ段差を鏡のように真っ平らに均す「透明クリアニス層」',
        accent: '#db2777',
        accentSoft: '#fce7f3',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'RGB段差 0.8 μm → 0.05 μm 平坦化プロセス断面', '#db2777')}
          <!-- Top CF Glass -->
          <rect x="54" y="118" width="360" height="24" fill="url(#d72-glass)" stroke="#0284c7"/>
          <text x="234" y="134" text-anchor="middle" font-size="10" font-weight="800" fill="#0c4a6e">D70 上部CFガラス基板</text>
          <!-- Uneven BM + R/G/B resist steps -->
          <rect x="64" y="142" width="22" height="28" fill="#0f172a"/>
          <rect x="86" y="142" width="84" height="44" fill="#ef4444" fill-opacity="0.85"/>
          <text x="128" y="168" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">R</text>
          <rect x="170" y="142" width="22" height="28" fill="#0f172a"/>
          <rect x="192" y="142" width="84" height="36" fill="#22c55e" fill-opacity="0.85"/>
          <text x="234" y="164" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">G</text>
          <rect x="276" y="142" width="22" height="28" fill="#0f172a"/>
          <rect x="298" y="142" width="84" height="48" fill="#3b82f6" fill-opacity="0.85"/>
          <text x="340" y="170" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">B</text>
          <rect x="382" y="142" width="22" height="28" fill="#0f172a"/>
          <!-- Transparent Acrylic OC layer filling all steps flat! -->
          <path d="M 64 170 L 86 170 L 86 186 L 170 186 L 170 170 L 192 170 L 192 178 L 276 178 L 276 170 L 298 170 L 298 190 L 382 190 L 382 170 L 404 170 L 404 224 L 64 224 Z" fill="#f472b6" fill-opacity="0.32" stroke="#db2777" stroke-width="2"/>
          <text x="234" y="212" text-anchor="middle" font-size="10.8" font-weight="900" fill="#9d174d">★ D72 アクリルOC平坦化層 (1.8 μm) — 下面フラット度 &lt; 0.05 μm！</text>
          <!-- PI alignment & LC below -->
          <rect x="64" y="224" width="340" height="16" fill="#fef08a" stroke="#ca8a04"/>
          <text x="234" y="236" text-anchor="middle" font-size="9.5" font-weight="800" fill="#854d0e">D35 ポリイミド配向膜（均一密着）＋ 均一ギャップIPS液晶層</text>
          <text x="234" y="276" text-anchor="middle" font-size="10.4" font-weight="800" fill="#059669">イオン不純物ブロック壁：RGB顔料から液晶への汚染・焼き付きを完全封止！</text>
          ${drawPanelBox(456, 82, 236, 248, '平坦化率 &gt; 93% の恩恵', '#0284c7')}
          <text x="472" y="132" font-size="10.8" font-weight="800" fill="#0f172a">IPS液晶は段差に超シビア</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• セルギャップが0.1μm狂うと</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  黒表示が白っぽく光漏れする</text>
          <text x="472" y="198" font-size="9.8" font-weight="600" fill="#059669">• 1.8μmのOC膜がRGB段差を</text>
          <text x="472" y="214" font-size="9.8" font-weight="600" fill="#059669">  0.05μm未満へ平滑化して解決！</text>
          <text x="472" y="242" font-size="9.8" font-weight="600" fill="#db2777">• 透過率 &gt; 98.5% / 耐熱無黄変</text>
          ${drawStatusPill(470, 282, 208, '均一黒締まり＋焼き付き防止層', true)}
        `,
        cards: [
          { label: 'どんな層？', line1: 'RGBカラーフィルタ全面を覆う', line2: '厚さ1.8μmの透明アクリル平坦化膜' },
          { label: 'スゴい工夫', line1: 'RGB段差を93%以上平滑化しつつ', line2: '顔料イオンの液晶汚染も完全遮断' },
          { label: '撮影メリット', line1: '暗部の黒浮きムラ・色ムラがなく', line2: '長年の高輝度使用でも黄変しない' },
        ],
      });

    case 'lcd_tft_gate_gi_stack':
      return wrapLcdHdSvg({
        badge: 'D73',
        title: 'TFTゲート金属配線（Mo/Al/Mo）＆PECVDゲート絶縁膜（GI）',
        analogy: '数百万画素を1行ずつ開閉する「3層サンドイッチ金属配線」と「0.2μm最強絶縁シート」',
        accent: '#0ea5e9',
        accentSoft: '#e0f2fe',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'ボトムゲートTFT積層断面（Mo/Al/Mo ＋ PECVD SiNx/SiO₂）', '#0ea5e9')}
          <!-- TFT Glass -->
          <rect x="54" y="256" width="360" height="32" rx="4" fill="#cbd5e1" stroke="#64748b"/>
          <text x="234" y="276" text-anchor="middle" font-size="10.2" font-weight="800" fill="#334155">下部無アルカリTFTガラス基板</text>
          <!-- Mo/Al/Mo 3-layer gate stack -->
          <rect x="136" y="244" width="196" height="12" fill="#475569"/>
          <rect x="136" y="220" width="196" height="24" fill="url(#d73-steel)" stroke="#334155"/>
          <rect x="136" y="208" width="196" height="12" fill="#475569"/>
          <text x="234" y="236" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0f172a">Mo / Al / Mo 3層低抵抗ゲート電極</text>
          <!-- PECVD SiNx / SiO2 Gate Insulator conformal arch -->
          <path d="M 54 242 L 122 242 L 136 184 L 332 184 L 346 242 L 414 242 L 414 256 L 334 256 L 320 208 L 148 208 L 134 256 L 54 256 Z" fill="#38bdf8" fill-opacity="0.45" stroke="#0284c7" stroke-width="2"/>
          <text x="234" y="199" text-anchor="middle" font-size="9.8" font-weight="900" fill="#0c4a6e">PECVD SiNx / SiO₂ ゲート絶縁膜 GI (200 nm / 耐圧 &gt; 8 MV/cm)</text>
          <!-- Gate pulse waveform on top -->
          <polyline points="64,146 116,146 116,118 164,118 164,146 240,146 240,118 288,118 288,146 396,146" fill="none" stroke="#e11d48" stroke-width="2.4"/>
          <text x="140" y="112" text-anchor="middle" font-size="9.8" font-weight="800" fill="#e11d48">VGH +18V (ON)</text>
          <text x="210" y="160" text-anchor="middle" font-size="9.8" font-weight="800" fill="#475569">VGL −9V (OFF)</text>
          ${drawPanelBox(456, 82, 236, 248, '狭額縁の秘密: GOA内蔵', '#6366f1')}
          <text x="472" y="132" font-size="10.8" font-weight="800" fill="#0f172a">左右端へ走査回路を直接印刷</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• 外付けゲートドライバICを廃止し</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  ガラス左右端にGOA回路を形成</text>
          <text x="472" y="198" font-size="9.8" font-weight="600" fill="#0284c7">• MoキャップがAlのヒロック突起</text>
          <text x="472" y="214" font-size="9.8" font-weight="600" fill="#0284c7">  (絶縁破壊)を完全ブロック！</text>
          <text x="472" y="242" font-size="9.8" font-weight="600" fill="#059669">• 27V振幅パルスをリークゼロ駆動</text>
          ${drawStatusPill(470, 282, 208, '200nm高耐圧GI＋狭額縁GOA', true)}
        `,
        cards: [
          { label: 'どんな層？', line1: 'Mo/Al/Mo 3層走査ゲート線と', line2: 'PECVD SiNx/SiO₂ 200nm絶縁層' },
          { label: 'スゴい工夫', line1: 'AlをMoで挟み突起破壊を防ぎつつ', line2: '左右枠へGOA走査回路を一体形成' },
          { label: '撮影メリット', line1: '120Hz高速スキャンでも遅延ゼロ', line2: '＆左右ベゼル幅を極限まで細線化' },
        ],
      });

    case 'lcd_ltps_active_sd_metal':
      return wrapLcdHdSvg({
        badge: 'D74',
        title: 'LTPS多結晶シリコンチャネル・S/D配線＆画素保持容量 C_s',
        analogy: '1画素ごとの「超極小電子蛇口（LTPS）」と明るさを記憶する「電気貯水タンク（Cs）」',
        accent: '#4f46e5',
        accentSoft: '#eef2ff',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '1サブピクセル内部のLTPS-TFT＋保持容量 C_s 等価＆断面図', '#4f46e5')}
          <!-- LTPS Poly-Si active island + Source/Drain contacts -->
          <rect x="112" y="206" width="204" height="30" rx="5" fill="#6366f1" stroke="#312e81" stroke-width="1.8"/>
          <text x="214" y="225" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">LTPS多結晶Siチャネル (μ ≈ 100 cm²/Vs)</text>
          <!-- Source & Drain metal bridges -->
          <rect x="64" y="152" width="76" height="24" rx="4" fill="url(#d74-copper)" stroke="#7c2d12" stroke-width="1.5"/>
          <text x="102" y="168" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">Source(データ線)</text>
          <rect x="116" y="176" width="16" height="30" fill="#eab308"/>
          <rect x="288" y="152" width="88" height="24" rx="4" fill="url(#d74-copper)" stroke="#7c2d12" stroke-width="1.5"/>
          <text x="332" y="168" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">Drain(画素側)</text>
          <rect x="296" y="176" width="16" height="30" fill="#eab308"/>
          <!-- Gate below -->
          <rect x="166" y="248" width="96" height="20" rx="3" fill="#475569"/>
          <text x="214" y="262" text-anchor="middle" font-size="9.5" font-weight="800" fill="#f8fafc">Gate走査線</text>
          <!-- Storage Capacitor Cs on right -->
          <rect x="356" y="198" width="66" height="66" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="1.6"/>
          <line x1="374" y1="224" x2="404" y2="224" stroke="#1d4ed8" stroke-width="3"/>
          <line x1="374" y1="234" x2="404" y2="234" stroke="#1d4ed8" stroke-width="3"/>
          <text x="389" y="216" text-anchor="middle" font-size="9.5" font-weight="900" fill="#1e40af">保持容量 C_s</text>
          <text x="389" y="254" text-anchor="middle" font-size="8.8" font-weight="700" fill="#1e3a8a">階調電圧を保持</text>
          <!-- Electron flow arrow -->
          <path d="M 140 221 L 284 221" stroke="#fde047" stroke-width="2.5" stroke-dasharray="5 3" marker-end="url(#d74-arrAmber)"/>
          ${drawPanelBox(456, 82, 236, 248, 'a-Si vs LTPS 200倍の差', '#0284c7')}
          <text x="472" y="130" font-size="10.2" font-weight="800" fill="#64748b">従来 a-Si (移動度 0.5)</text>
          <rect x="472" y="138" width="20" height="16" rx="3" fill="#94a3b8"/>
          <text x="498" y="150" font-size="9.5" font-weight="700" fill="#64748b">TFTが大きく開口率が低い</text>
          <text x="472" y="182" font-size="10.2" font-weight="800" fill="#4f46e5">最新 LTPS (移動度 100!)</text>
          <rect x="472" y="190" width="196" height="18" rx="4" fill="#6366f1"/>
          <text x="570" y="203" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">約 200 倍高速 → TFT超極小！</text>
          <text x="472" y="232" font-size="9.8" font-weight="600" fill="#334155">• 400+ ppi の3.2型210万ドットでも</text>
          <text x="472" y="248" font-size="9.8" font-weight="600" fill="#334155">  光を通す窓(開口率)を広く確保！</text>
          ${drawStatusPill(470, 282, 208, '高開口率×高精細210万ドット', true)}
        `,
        cards: [
          { label: 'どんな素子？', line1: 'ELAレーザー結晶化LTPS半導体と', line2: 'S/Dデータ線・補助保持容量 C_s' },
          { label: 'スゴい工夫', line1: '移動度200倍でTFTサイズを極小化', line2: '遮光金属で1,000nit光リークも防止' },
          { label: '撮影メリット', line1: '高精細な210万ドット画面でも', line2: '明るく滑らかな120Hz表示を実現' },
        ],
      });

    case 'lcd_passivation_pln_vias':
      return wrapLcdHdSvg({
        badge: 'D75',
        title: 'SiNxパッシベーション＋有機平坦化膜（PLN）＆コンタクトビア',
        analogy: '配線ノイズを遮断する「厚い透明絶縁マット」と電気を通す「ミクロの縦穴マンホール」',
        accent: '#7c3aed',
        accentSoft: '#f3e8ff',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '低誘電率PLN層(2.5 μm)＋径3 μmテーパーコンタクトビア断面', '#7c3aed')}
          <!-- Lower S/D Metal & Drain -->
          <rect x="58" y="252" width="120" height="24" rx="3" fill="url(#d75-copper)"/>
          <text x="118" y="268" text-anchor="middle" font-size="9.8" font-weight="800" fill="#ffffff">データ配線 (Data)</text>
          <rect x="218" y="252" width="184" height="24" rx="3" fill="url(#d75-gold)"/>
          <text x="310" y="268" text-anchor="middle" font-size="9.8" font-weight="800" fill="#451a03">TFTドレイン電極</text>
          <!-- SiNx Passivation -->
          <rect x="58" y="236" width="222" height="16" fill="#0284c7" fill-opacity="0.55"/>
          <rect x="336" y="236" width="66" height="16" fill="#0284c7" fill-opacity="0.55"/>
          <!-- Thick Low-k Organic PLN layer with tapered Contact Via opening -->
          <path d="M 58 158 L 258 158 L 280 236 L 58 236 Z" fill="#a855f7" fill-opacity="0.28" stroke="#7c3aed" stroke-width="1.8"/>
          <path d="M 358 158 L 402 158 L 402 236 L 336 236 Z" fill="#a855f7" fill-opacity="0.28" stroke="#7c3aed" stroke-width="1.8"/>
          <text x="158" y="198" text-anchor="middle" font-size="10.5" font-weight="900" fill="#581c87">有機PLN膜 (t=2.5μm / ε=3.0)</text>
          <text x="158" y="214" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6b21a8">データ線との寄生容量を 1/6 へ！</text>
          <!-- Top IPS ITO electrode descending cleanly into tapered via! -->
          <path d="M 58 148 L 254 148 L 284 246 L 332 246 L 362 148 L 402 148" fill="none" stroke="#059669" stroke-width="7" stroke-linejoin="round"/>
          <text x="234" y="136" text-anchor="middle" font-size="10.5" font-weight="900" fill="#065f46">上部IPS透明ITOくし歯電極（データ線の上まで拡大＝高開口率！）</text>
          ${drawCallout(308, 224, 308, 112, 1, 'コンタクトビア (径3μm)', 'テーパー形状でITO段切れ防止', '#059669', 'middle')}
          ${drawPanelBox(456, 82, 236, 248, '2重絶縁が画質を変える理由', '#0284c7')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">① SiNx無機膜 (250nm)</text>
          <text x="472" y="150" font-size="9.6" font-weight="600" fill="#334155">有機層からの水分・ガスを遮断し</text>
          <text x="472" y="166" font-size="9.6" font-weight="600" fill="#334155">LTPSトランジスタ劣化を防止</text>
          <text x="472" y="196" font-size="10.5" font-weight="800" fill="#7c3aed">② 厚膜有機PLN (2.5μm)</text>
          <text x="472" y="214" font-size="9.6" font-weight="600" fill="#334155">低誘電率＋厚膜で配線ノイズ結合を</text>
          <text x="472" y="230" font-size="9.6" font-weight="600" fill="#334155">1/6に減らし縦クロストーク解消！</text>
          ${drawStatusPill(470, 282, 208, '高開口率×低消費電力×無ムラ', true)}
        `,
        cards: [
          { label: 'どんな層？', line1: 'SiNx防湿膜＋低誘電率2.5μm有機PLN', line2: '＋径3μm ITO導通コンタクトビア' },
          { label: 'スゴい工夫', line1: '配線との寄生容量を1/6へ激減させ', line2: 'データ線の上まで画素電極を拡大' },
          { label: '撮影メリット', line1: '縦スジのクロストークが消え', line2: '同じ電力でも画面がいっそう明るい' },
        ],
      });

    case 'lcd_ag_common_odf_seal':
      return wrapLcdHdSvg({
        badge: 'D76',
        title: '上下基板間 Ag共通電極トランスファー＆ODF UV封止シール',
        analogy: '液晶を閉じ込める「UV硬化ダム」と4隅で上下の静電気を繋ぐ「金粒入りの銀の柱」',
        accent: '#9333ea',
        accentSoft: '#f3e8ff',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'ODF真空液晶封止外周壁＆4隅銀トランスファードット断面', '#9333ea')}
          <!-- Top CF Glass with backside ITO ESD coating -->
          <rect x="52" y="128" width="364" height="24" rx="3" fill="url(#d76-glass)" stroke="#0284c7"/>
          <line x1="52" y1="126" x2="416" y2="126" stroke="#14b8a6" stroke-width="3.5"/>
          <text x="234" y="118" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0f766e">CFガラス裏面 帯電防止ITO膜（静電気を逃がす必要あり）</text>
          <!-- Perimeter UV Main Seal Wall with glass fiber spacers -->
          <rect x="116" y="152" width="46" height="72" fill="#a855f7" stroke="#6b21a8" stroke-width="1.6"/>
          <circle cx="139" cy="188" r="10" fill="#f8fafc" stroke="#475569"/>
          <text x="139" y="191" text-anchor="middle" font-size="7.5" font-weight="800" fill="#0f172a">3.2μm</text>
          <!-- Conductive Ag Transfer Dot outside seal wall bridging CF -> TFT GND! -->
          <rect x="64" y="152" width="38" height="72" rx="14" fill="url(#d76-steel)" stroke="#475569" stroke-width="1.6"/>
          <circle cx="76" cy="174" r="4.5" fill="#eab308"/>
          <circle cx="90" cy="192" r="4.5" fill="#eab308"/>
          <circle cx="78" cy="210" r="4.5" fill="#eab308"/>
          <!-- Liquid crystal pool inside right -->
          <rect x="162" y="152" width="244" height="72" fill="#e0f2fe"/>
          <text x="284" y="192" text-anchor="middle" font-size="11.5" font-weight="900" fill="#0369a1">ODF滴下注入 IPS液晶層（完全真空密閉）</text>
          <!-- Bottom TFT Glass -->
          <rect x="52" y="224" width="364" height="26" rx="3" fill="#cbd5e1" stroke="#64748b"/>
          <text x="234" y="241" text-anchor="middle" font-size="10" font-weight="800" fill="#1e293b">下部TFTガラス基板（カメラ基準GND電位）</text>
          ${drawCallout(83, 188, 134, 286, 1, 'Agトランスファードット(4隅)', 'Au微粒子でCF↔TFTを<10Ω導通', '#0f766e')}
          ${drawCallout(139, 156, 260, 286, 2, 'ODF UVメインシール', '防湿気密＋3.2μmギャップ固定', '#7c3aed')}
          ${drawPanelBox(456, 82, 236, 248, 'なぜ四隅の銀ドットが重要？', '#0284c7')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">指の静電気による画面乱れ防止</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• 上部ガラスが浮遊電位だと</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  冬の静電気で画面が白化乱調</text>
          <text x="472" y="198" font-size="9.8" font-weight="600" fill="#059669">• 4隅の金メッキ球入り銀柱が</text>
          <text x="472" y="214" font-size="9.8" font-weight="600" fill="#059669">  10Ω未満で即座にアース逃がし</text>
          <text x="472" y="242" font-size="9.8" font-weight="600" fill="#7c3aed">• 85℃/85%RH 1,000時間耐湿</text>
          ${drawStatusPill(470, 282, 208, '気密液晶封止＋ESD帯電ゼロ', true)}
        `,
        cards: [
          { label: 'どんな構造？', line1: 'ODF真空滴下UVメインシール壁と', line2: '4隅の導電性銀トランスファードット' },
          { label: 'スゴい工夫', line1: '3.2μmファイバースペーサー混入＆', line2: 'Au導電微粒子で上下ガラスを低抵抗接続' },
          { label: '撮影メリット', line1: '真冬の乾燥した指先で触れても', line2: '静電気ムラが起きず長期気密も万全' },
        ],
      });

    case 'lcd_upper_diffuser_film':
      return wrapLcdHdSvg({
        badge: 'D77',
        title: '上部光学拡散保護シート（トップディフューザー）',
        analogy: '尖ったプリズムの山を守りシマシマ干渉（モアレ）を消す「優しいすりガラスベール」',
        accent: '#64748b',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '上部ディフューザー(D77) vs 下部ディフューザー(D39) の決定的な違い', '#475569')}
          <!-- Stack showing D39 Bottom -> V-BEF/H-BEF -> D77 Top Diffuser -> IPS -->
          <rect x="64" y="114" width="340" height="28" rx="4" fill="#1e293b"/>
          <text x="234" y="132" text-anchor="middle" font-size="10.2" font-weight="800" fill="#f8fafc">IPS液晶セル＋背面偏光板 / DBEF</text>
          <!-- Highlighted D77 Top Diffuser -->
          <rect x="64" y="152" width="340" height="36" rx="5" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.4"/>
          <text x="234" y="168" text-anchor="middle" font-size="10.8" font-weight="900" fill="#0369a1">★ D77 上部トップディフューザー（低ヘイズ 25〜45% / 透過&gt;90%）</text>
          <text x="234" y="182" text-anchor="middle" font-size="9.2" font-weight="700" fill="#0284c7">微細ビーズ保護層：プリズム頂点の傷防止＋画素モアレ消去</text>
          <!-- Delicate 90-deg Prism peaks below -->
          <path d="M 64 218 L 80 194 L 96 218 L 112 194 L 128 218 L 144 194 L 160 218 L 176 194 L 192 218 L 208 194 L 224 218 L 240 194 L 256 218 L 272 194 L 288 218 L 304 194 L 320 218 L 336 194 L 352 218 L 368 194 L 384 218 L 404 194" fill="none" stroke="#f59e0b" stroke-width="2.2"/>
          <text x="234" y="236" text-anchor="middle" font-size="10" font-weight="800" fill="#b45309">D78/D79 V-BEF・H-BEF 尖った90°プリズム頂点（傷に超弱い）</text>
          <!-- D39 Bottom Diffuser -->
          <rect x="64" y="250" width="340" height="30" rx="4" fill="#cbd5e1" stroke="#64748b"/>
          <text x="234" y="269" text-anchor="middle" font-size="10" font-weight="800" fill="#334155">D39 下部ディフューザー（高ヘイズ 85〜95%：導光板ドット隠し）</text>
          ${drawPanelBox(456, 82, 236, 248, 'なぜ上下2枚必要なの？', '#0284c7')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">役割が180°異なる2枚の拡散板</text>
          <text x="472" y="156" font-size="9.8" font-weight="700" fill="#475569">• 下部(D39): 強力拡散でLGPの</text>
          <text x="472" y="172" font-size="9.8" font-weight="700" fill="#475569">  印刷ドット粒を完全にぼかす</text>
          <text x="472" y="198" font-size="9.8" font-weight="700" fill="#0284c7">• 上部(D77): 弱い拡散でBEFの</text>
          <text x="472" y="214" font-size="9.8" font-weight="700" fill="#0284c7">  正面輝度を殺さず傷＆モアレ除去</text>
          <text x="472" y="242" font-size="9.8" font-weight="600" fill="#059669">• 斜め45°の輝度急落も滑らか化</text>
          ${drawStatusPill(470, 282, 208, 'プリズム保護＋モアレ完全ゼロ', true)}
        `,
        cards: [
          { label: 'どんなシート？', line1: 'BEFプリズム直上に重ねる', line2: '低ヘイズ(25-45%)上部拡散保護膜' },
          { label: 'スゴい工夫', line1: '下部拡散板(D39)より光を散らさず', line2: '集光輝度を保ちつつモアレと傷を防ぐ' },
          { label: '撮影メリット', line1: '画面を強くタッチしても白点傷が', line2: 'つかず斜め視野の明るさも自然' },
        ],
      });

    case 'lcd_v_bef_prism_film':
      return wrapLcdHdSvg({
        badge: 'D78',
        title: '垂直軸マイクロプリズム集光フィルム（V-BEF：頂角90°・24μm）',
        analogy: '上下に逃げる光を正面へギュッと集め直す「上下方向の光のメガホン」',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '頂角90°三角プリズム 屈折集光＋全反射(TIR)リサイクル光学図', '#d97706')}
          <!-- Enlarged 90-deg prism teeth cross-section -->
          <polygon points="64,250 144,170 224,250 304,170 384,250" fill="#fef08a" fill-opacity="0.72" stroke="#d97706" stroke-width="2.2"/>
          <rect x="64" y="250" width="320" height="20" fill="#fde68a" stroke="#d97706"/>
          <text x="224" y="264" text-anchor="middle" font-size="9.8" font-weight="800" fill="#92400e">PETベース基材（ピッチ 24 μm / n ≈ 1.59 高屈折アクリルプリズム）</text>
          <!-- Ray 1: Within +-35 deg -> refracted straight up to viewer! -->
          <polyline points="116,304 128,224 144,114" fill="none" stroke="#059669" stroke-width="2.6" marker-end="url(#d78-arrGreen)"/>
          <text x="144" y="108" text-anchor="middle" font-size="10.2" font-weight="900" fill="#059669">正面へ集束！ (+55–60%)</text>
          <!-- Ray 2: Steep off-axis ray -> TIR double bounce back down to ESR mirror and recycled! -->
          <polyline points="264,304 286,216 322,216 336,304" fill="none" stroke="#e11d48" stroke-width="2.4" stroke-dasharray="5 3" marker-end="url(#d78-arrRed)"/>
          <text x="342" y="156" text-anchor="middle" font-size="9.8" font-weight="800" fill="#be123c">90°頂角で2回全反射(TIR)</text>
          <text x="342" y="170" text-anchor="middle" font-size="9.2" font-weight="700" fill="#be123c">→ 下のESR鏡へ戻し再循環！</text>
          <!-- ESR reflector line at bottom -->
          <line x1="64" y1="308" x2="384" y2="308" stroke="#64748b" stroke-width="4"/>
          <text x="224" y="322" text-anchor="middle" font-size="9.5" font-weight="800" fill="#475569">下部 ESR高反射ミラー（角度を変えて何度でも正面へリサイクル）</text>
          ${drawPanelBox(456, 82, 236, 248, 'V-BEF 単層ゲインの威力', '#0284c7')}
          <text x="472" y="132" font-size="10.8" font-weight="800" fill="#0f172a">3.2型短辺に約 1,900 本の稜線</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• 水平方向に走る微細プリズムが</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  上下方向の逃散光を±35°へ集光</text>
          <rect x="472" y="194" width="204" height="68" rx="8" fill="#fef3c7" stroke="#d97706"/>
          <text x="574" y="218" text-anchor="middle" font-size="12" font-weight="900" fill="#b45309">単層ゲイン ≈ 1.58×</text>
          <text x="574" y="238" text-anchor="middle" font-size="9.8" font-weight="700" fill="#92400e">電力そのまま明るさ +58%！</text>
          <text x="574" y="254" text-anchor="middle" font-size="9.2" font-weight="600" fill="#78350f">先端微細R加工で欠け耐性も強化</text>
          ${drawStatusPill(470, 282, 208, '上下方向の無電力・光学輝度増幅', true)}
        `,
        cards: [
          { label: 'どんなフィルム？', line1: '頂角90°・24μmピッチの水平配列', line2: '垂直軸集光マイクロプリズム(V-BEF)' },
          { label: 'スゴい工夫', line1: '正面光は屈折集束し斜め光は', line2: '90°全反射でESR鏡へ戻し再循環' },
          { label: '撮影メリット', line1: '1枚で正面輝度が約1.6倍に向上', line2: 'バッテリー消費ゼロ増で屋外鮮明' },
        ],
      });

    case 'lcd_h_bef_prism_film':
      return wrapLcdHdSvg({
        badge: 'D79',
        title: '水平軸直交マイクロプリズムフィルム（H-BEF：クロス+115%）',
        analogy: 'V-BEFと90°十字に重ねて上下左右すべての光を正面へ集め「明るさ2.15倍」にする相棒',
        accent: '#ea580c',
        accentSoft: '#ffedd5',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'V-BEF × H-BEF 90°直交（Crossed BEF）2軸輝度ブースト図', '#ea580c')}
          <!-- Bottom V-BEF horizontal ridges -->
          <rect x="64" y="232" width="160" height="72" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
          ${[246, 258, 270, 282, 294].map((y) => `<line x1="72" y1="${y}" x2="216" y2="${y}" stroke="#d97706" stroke-width="2"/>`).join('')}
          <text x="144" y="224" text-anchor="middle" font-size="10.2" font-weight="800" fill="#b45309">D78 V-BEF (横稜線＝上下集光)</text>
          <!-- Plus sign -->
          <text x="242" y="274" text-anchor="middle" font-size="22" font-weight="900" fill="#ea580c">×</text>
          <!-- Top H-BEF vertical ridges -->
          <rect x="260" y="232" width="160" height="72" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.8"/>
          ${[278, 296, 314, 332, 350, 368, 386, 404].map((x) => `<line x1="${x}" y1="240" x2="${x}" y2="296" stroke="#ea580c" stroke-width="2"/>`).join('')}
          <text x="340" y="224" text-anchor="middle" font-size="10.2" font-weight="900" fill="#c2410c">★ D79 H-BEF (縦稜線＝左右集光)</text>
          <!-- Combined luminance bar comparison -->
          <text x="64" y="132" font-size="10.2" font-weight="800" fill="#475569">LED単体 (1.00×)</text>
          <rect x="190" y="120" width="66" height="16" rx="4" fill="#94a3b8"/>
          <text x="64" y="158" font-size="10.2" font-weight="800" fill="#d97706">V-BEF 1枚 (1.58×)</text>
          <rect x="190" y="146" width="104" height="16" rx="4" fill="#f59e0b"/>
          <text x="64" y="184" font-size="10.2" font-weight="900" fill="#ea580c">V+H クロス (2.15×!)</text>
          <rect x="190" y="172" width="144" height="16" rx="4" fill="#ea580c"/>
          <text x="342" y="184" font-size="10.5" font-weight="900" fill="#ea580c">+115%!</text>
          ${drawPanelBox(456, 82, 236, 248, 'DBEF(D38)との3段掛け算', '#0284c7')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">合計 3.4倍超の光学リサイクル！</text>
          <text x="472" y="158" font-size="10" font-weight="700" fill="#b45309">V-BEF (1.55×) × H-BEF (1.40×)</text>
          <text x="472" y="176" font-size="10" font-weight="700" fill="#4f46e5">× DBEF偏光再生 (1.60×)</text>
          <text x="472" y="200" font-size="12.5" font-weight="900" fill="#059669">= 実効輝度 約 3.47 倍！</text>
          <text x="472" y="232" font-size="9.6" font-weight="600" fill="#334155">裏面アンチウェットアウト処理で</text>
          <text x="472" y="248" font-size="9.6" font-weight="600" fill="#334155">2枚間のニュートンリングも防止</text>
          ${drawStatusPill(470, 282, 208, '屋外晴天1,000nitを省電力実現', true)}
        `,
        cards: [
          { label: 'どんなフィルム？', line1: 'V-BEFと90°直交積層する', line2: '水平軸集光マイクロプリズム(H-BEF)' },
          { label: 'スゴい工夫', line1: '2枚クロスで+115%増幅し、さらに', line2: 'DBEFと合算し実効輝度3.4倍超' },
          { label: '撮影メリット', line1: 'NP-FZ100の電池消費を半減しつつ', line2: '真夏ピーカンでもクッキリ確認' },
        ],
      });

    case 'lcd_lgp_vgroove_edge_tape':
      return wrapLcdHdSvg({
        badge: 'D80',
        title: '導光板(LGP)入光端マイクロV溝＆3辺白色高反射エッジテープ',
        analogy: 'LEDの粒ムラを入り口のギザギザ溝で混ぜ合わせ、端の白い鏡テープで光を逃がさない構造',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'PMMA導光板 平面光学ミキシング＆3辺リターン反射図', '#0284c7')}
          <!-- 3-side White TiO2 Reflective Tape border -->
          <rect x="74" y="114" width="320" height="12" fill="#ffffff" stroke="#0284c7" stroke-width="1.8"/>
          <rect x="74" y="114" width="12" height="156" fill="#ffffff" stroke="#0284c7" stroke-width="1.8"/>
          <rect x="382" y="114" width="12" height="156" fill="#ffffff" stroke="#0284c7" stroke-width="1.8"/>
          <text x="234" y="108" text-anchor="middle" font-size="10" font-weight="900" fill="#0284c7">3辺高反射白色エッジテープ（R &gt; 97%：端から逃げる光を全折り返し）</text>
          <!-- PMMA LGP active region -->
          <rect x="86" y="126" width="296" height="134" fill="#e0f2fe" fill-opacity="0.55" stroke="#7dd3fc"/>
          <!-- Micro-V-Groove serrated light-incident bottom edge -->
          <path d="M 86 260 L 98 272 L 110 260 L 122 272 L 134 260 L 146 272 L 158 260 L 170 272 L 182 260 L 194 272 L 206 260 L 218 272 L 230 260 L 242 272 L 254 260 L 266 272 L 278 260 L 290 272 L 302 260 L 314 272 L 326 260 L 338 272 L 350 260 L 362 272 L 382 260" fill="#bae6fd" stroke="#0284c7" stroke-width="1.8"/>
          <!-- Side-view LEDs beneath V-groove -->
          ${[122, 194, 266, 338]
            .map(
              (lx) => `
            <rect x="${lx - 12}" y="284" width="24" height="14" rx="2" fill="#f59e0b" stroke="#92400e"/>
            <line x1="${lx}" y1="282" x2="${lx - 26}" y2="210" stroke="#f59e0b" stroke-width="1.8" marker-end="url(#d80-arrAmber)"/>
            <line x1="${lx}" y1="282" x2="${lx + 26}" y2="210" stroke="#f59e0b" stroke-width="1.8" marker-end="url(#d80-arrAmber)"/>`
            )
            .join('')}
          <!-- Ray bouncing off top & right edge tapes -->
          <polyline points="292,208 380,156 318,128 242,172" fill="none" stroke="#059669" stroke-width="2" stroke-dasharray="4 2" marker-end="url(#d80-arrGreen)"/>
          <text x="234" y="316" text-anchor="middle" font-size="10.2" font-weight="800" fill="#b45309">入光端マイクロV溝がLED間(6mmピッチ)の光を瞬時に横拡散ミキシング！</text>
          ${drawPanelBox(456, 82, 236, 248, 'ホットスポット解消効果', '#059669')}
          ${drawStatusPill(470, 122, 208, '平滑端面: 下端に明暗の粒ムラ', false)}
          <text x="474" y="164" font-size="9.6" font-weight="600" fill="#881337">LEDの真正面だけ明るく間が暗い</text>
          <text x="474" y="180" font-size="9.6" font-weight="600" fill="#881337">ホットスポットが画面下端に出現</text>
          ${drawStatusPill(470, 202, 208, 'V溝＋3辺鏡: ミキシング<2.5mm', true)}
          <text x="474" y="244" font-size="9.8" font-weight="700" fill="#065f46">• 入光効率 η &gt; 88%</text>
          <text x="474" y="262" font-size="9.8" font-weight="700" fill="#065f46">• 端からの光漏れ(ライトブリード)</text>
          <text x="474" y="278" font-size="9.8" font-weight="700" fill="#065f46">  もゼロで狭額縁全面が均一発光！</text>
        `,
        cards: [
          { label: 'どんな細部？', line1: 'LGP入光端の微細V溝セレーションと', line2: '残り3辺を囲む反射率97%白色テープ' },
          { label: 'スゴい工夫', line1: '2.5mm以内でLED粒ムラを均一化し', line2: '端面抜け光を内部へ徹底折り返し' },
          { label: '撮影メリット', line1: '画面の四隅や下端がムラなく均一', line2: 'ベゼル際からの白浮き光漏れゼロ' },
        ],
      });

    case 'lcd_blu_metal_back_bezel':
      return wrapLcdHdSvg({
        badge: 'D81',
        title: 'プレス成形ステンレスBLUバックシャーシ＆ESR鏡面固定粘着層',
        analogy: 'バックライト光学シート全部を1枚にまとめて爪でロックする「ステンレス製お盆トレー」',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'LCM独立モジュール保持構造（0.25mm SUS304＋折曲げ爪×6）', '#475569')}
          <!-- U-shaped stamped SUS304 metal tray wrapping white mold frame & optical stack -->
          <path d="M 64 148 L 80 148 L 80 264 L 388 264 L 388 148 L 404 148 L 404 282 L 64 282 Z" fill="url(#d81-steel)" stroke="#334155" stroke-width="2"/>
          <!-- Fold-over locking clips at top left & right -->
          <rect x="64" y="138" width="28" height="12" rx="2" fill="#475569"/>
          <rect x="376" y="138" width="28" height="12" rx="2" fill="#475569"/>
          <!-- White mold frame inside walls -->
          <rect x="82" y="152" width="18" height="108" fill="#f8fafc" stroke="#94a3b8"/>
          <rect x="368" y="152" width="18" height="108" fill="#f8fafc" stroke="#94a3b8"/>
          <!-- Optical stack inside tray -->
          <rect x="102" y="160" width="264" height="24" fill="#fef3c7" stroke="#d97706"/>
          <text x="234" y="176" text-anchor="middle" font-size="9.8" font-weight="800" fill="#92400e">DBEF / 上部拡散 / V-BEF / H-BEF / 下部拡散</text>
          <rect x="102" y="190" width="264" height="32" fill="#e0f2fe" stroke="#0284c7"/>
          <text x="234" y="210" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0369a1">PMMA導光板(LGP) ＋ LEDバー熱接触</text>
          <rect x="102" y="228" width="264" height="18" fill="#ffffff" stroke="#64748b"/>
          <text x="234" y="241" text-anchor="middle" font-size="9.5" font-weight="800" fill="#334155">3M ESR 高反射多層ポリマーミラー (R=98.5%)</text>
          <!-- ESR double-sided perimeter PSA -->
          <rect x="102" y="250" width="264" height="12" fill="#fcd34d" stroke="#b45309"/>
          <text x="234" y="259" text-anchor="middle" font-size="8.8" font-weight="900" fill="#78350f">ESR固定用 無黄変両面PSA粘着フレーム（浮き・シワ防止）</text>
          <text x="234" y="302" text-anchor="middle" font-size="10.4" font-weight="900" fill="#1e293b">SUS304 0.25mm プレス底面トレー（平面度 &lt; 0.08 mm 維持）</text>
          ${drawPanelBox(456, 82, 236, 248, '1枚で3役のマルチ構造体', '#0284c7')}
          <rect x="470" y="122" width="208" height="48" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="482" y="142" font-size="10.5" font-weight="800" fill="#0f172a">① 光学シート一体ロック</text>
          <text x="482" y="160" font-size="9.5" font-weight="600" fill="#334155">6か所の折曲げ爪でズレ・浮きゼロ</text>
          <rect x="470" y="180" width="208" height="48" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="482" y="200" font-size="10.5" font-weight="800" fill="#ea580c">② LED一次放熱ヒートスプレッダ</text>
          <text x="482" y="218" font-size="9.5" font-weight="600" fill="#334155">LEDバーの熱を背面全面へ即拡散</text>
          <rect x="470" y="238" width="208" height="48" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="482" y="258" font-size="10.5" font-weight="800" fill="#0284c7">③ EMI金属ファラデーシールド</text>
          <text x="482" y="276" font-size="9.5" font-weight="600" fill="#334155">背面基板ノイズからIPSセルを遮蔽</text>
        `,
        cards: [
          { label: 'どんな部品？', line1: '0.25mm厚SUS304プレス絞り成形の', line2: 'BLU金属バックトレー＆ESR粘着層' },
          { label: 'スゴい工夫', line1: '平面度0.08mm未満の剛性保持と', line2: 'LED放熱・EMI遮蔽を1枚で兼任' },
          { label: '撮影メリット', line1: '長年の振動でも光学シートがズレず', line2: '画面中央の輝度ムラやノイズを防止' },
        ],
      });

    case 'lcd_led_mcpcb_ntc':
      return wrapLcdHdSvg({
        badge: 'D82',
        title: 'LEDバー高熱伝導アルミMCPCB・バランス抵抗＆NTCサーミスタ',
        analogy: '真夏1,000nitのLED発熱をアルミ板で逃がしつつ中央の「温度計チップ」で守る仕組み',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'アルミ金属コア基板(MCPCB)＋NTCサーマルフォールドバック回路', '#d97706')}
          <!-- Aluminum MCPCB cross-section bar -->
          <rect x="52" y="206" width="364" height="30" rx="4" fill="url(#d82-steel)" stroke="#475569" stroke-width="1.6"/>
          <text x="234" y="225" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0f172a">高熱伝導アルミニウム金属コア板 (k &gt; 2.0 W/mK → BLU枠へ即放熱)</text>
          <rect x="52" y="192" width="364" height="14" fill="#ffffff" stroke="#cbd5e1"/>
          <!-- 8 Side-view LEDs + Balance resistors + Center red NTC thermistor -->
          ${[76, 118, 160, 202, 266, 308, 350, 392]
            .map(
              (x) => `
            <rect x="${x - 10}" y="172" width="20" height="20" rx="3" fill="#fef08a" stroke="#ca8a04" stroke-width="1.4"/>
            <line x1="${x}" y1="168" x2="${x}" y2="146" stroke="#f59e0b" stroke-width="2" marker-end="url(#d82-arrAmber)"/>`
            )
            .join('')}
          <!-- Center NTC thermistor -->
          <rect x="220" y="168" width="28" height="24" rx="4" fill="#ef4444" stroke="#991b1b" stroke-width="1.8"/>
          <text x="234" y="184" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">NTC</text>
          ${drawCallout(234, 168, 234, 122, 1, '10kΩ NTCサーミスタ', 'T_j > 85℃で自動電流保護', '#e11d48', 'middle')}
          <!-- Thermal flow arrows downward -->
          ${[110, 234, 358]
            .map((x) => `<line x1="${x}" y1="238" x2="${x}" y2="274" stroke="#ea580c" stroke-width="2.4" marker-end="url(#d82-arrRed)"/>`)
            .join('')}
          <text x="234" y="294" text-anchor="middle" font-size="10.4" font-weight="800" fill="#c2410c">熱をSUSバックシャーシへ逃がしKSF赤蛍光体の温度消光（色ズレ）を防止！</text>
          ${drawPanelBox(456, 82, 236, 248, '温度保護カーブ（フォールドバック）', '#e11d48')}
          <!-- Graph axes -->
          <line x1="484" y1="254" x2="670" y2="254" stroke="#64748b" stroke-width="1.4"/>
          <line x1="484" y1="132" x2="484" y2="254" stroke="#64748b" stroke-width="1.4"/>
          <text x="577" y="272" text-anchor="middle" font-size="9.5" font-weight="700" fill="#475569">LED温度 T_j (℃) →</text>
          <text x="476" y="192" text-anchor="middle" font-size="9.5" font-weight="700" fill="#475569" transform="rotate(-90 476 192)">LED電流 %</text>
          <!-- Foldback knee curve -->
          <polyline points="484,152 586,152 658,232" fill="none" stroke="#ea580c" stroke-width="3"/>
          <line x1="586" y1="132" x2="586" y2="254" stroke="#e11d48" stroke-dasharray="3 2"/>
          <text x="586" y="128" text-anchor="middle" font-size="9.5" font-weight="800" fill="#e11d48">85℃保護開始</text>
          <text x="536" y="146" text-anchor="middle" font-size="9.5" font-weight="800" fill="#059669">100% フル発光</text>
          ${drawStatusPill(470, 286, 208, '白点6500K維持＋熱劣化ガード', true)}
        `,
        cards: [
          { label: 'どんな部品？', line1: 'アルミ金属基板MCPCBに並んだLEDと', line2: '均光バランス抵抗＋10kΩ NTC温度計' },
          { label: 'スゴい工夫', line1: '金属コアで熱を逃がしつつ85℃超で', line2: '自動フォールドバックし色ズレを防止' },
          { label: '撮影メリット', line1: '真夏の炎天下に高輝度モードで', line2: '撮り続けても画面色がズレず長寿命' },
        ],
      });

    case 'lcd_boost_schottky_rset':
      return wrapLcdHdSvg({
        badge: 'D83',
        title: '28V LED昇圧コンバータ（40V MOSFET・ショットキー・R_set）',
        analogy: '7.2V電池を1秒に120万回汲み上げて28V定電流を作る「超音波・電気ポンプ」',
        accent: '#ea580c',
        accentSoft: '#ffedd5',
        body: `
          ${drawPanelBox(28, 82, 424, 248, 'TPS61165級 1.2 MHz 定電流LEDブースト回路ブロック図', '#ea580c')}
          <!-- Circuit schematic: Vin -> Inductor L -> Diode D -> 10x LED string -> Rset -> GND -->
          <rect x="46" y="144" width="54" height="32" rx="6" fill="#0284c7"/>
          <text x="73" y="164" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">電池7.2V</text>
          <!-- Inductor coils -->
          <path d="M 100 160 L 116 160 Q 124 142 132 160 Q 140 142 148 160 Q 156 142 164 160 L 182 160" fill="none" stroke="#475569" stroke-width="3"/>
          <text x="140" y="138" text-anchor="middle" font-size="9.5" font-weight="800" fill="#334155">L (10–22μH)</text>
          <!-- 40V MOSFET switch to GND -->
          <rect x="166" y="206" width="68" height="44" rx="6" fill="#1e293b" stroke="#ea580c" stroke-width="1.8"/>
          <text x="200" y="226" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fdba74">40V MOSFET</text>
          <text x="200" y="241" text-anchor="middle" font-size="8.8" font-weight="700" fill="#f8fafc">1.2 MHz SW</text>
          <line x1="182" y1="160" x2="182" y2="206" stroke="#ea580c" stroke-width="2.2"/>
          <!-- Fast Schottky Diode -->
          <polygon points="214,148 214,172 238,160" fill="#ea580c"/>
          <path d="M 238 148 L 238 172 L 244 172 M 238 148 L 232 148" fill="none" stroke="#9a3412" stroke-width="2.4"/>
          <text x="228" y="138" text-anchor="middle" font-size="9.2" font-weight="800" fill="#c2410c">40Vショットキー</text>
          <line x1="182" y1="160" x2="214" y2="160" stroke="#475569" stroke-width="2.2"/>
          <line x1="238" y1="160" x2="296" y2="160" stroke="#ea580c" stroke-width="2.4"/>
          <text x="274" y="150" text-anchor="middle" font-size="10.2" font-weight="900" fill="#e11d48">28 V!</text>
          <!-- 10-LED series string -->
          <rect x="296" y="136" width="132" height="48" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
          <text x="362" y="158" text-anchor="middle" font-size="10.2" font-weight="900" fill="#b45309">直列 LED 8〜10灯</text>
          <text x="362" y="174" text-anchor="middle" font-size="9.2" font-weight="700" fill="#92400e">(定電流 I_LED 駆動)</text>
          <!-- Precision Rset shunt feedback -->
          <line x1="362" y1="184" x2="362" y2="220" stroke="#059669" stroke-width="2.2"/>
          <rect x="318" y="220" width="88" height="30" rx="5" fill="#dcfce7" stroke="#059669" stroke-width="1.8"/>
          <text x="362" y="239" text-anchor="middle" font-size="10" font-weight="900" fill="#065f46">R_set (200 mV)</text>
          <!-- Feedback line back to Boost IC -->
          <polyline points="318,235 234,235" fill="none" stroke="#059669" stroke-width="2" stroke-dasharray="4 2" marker-end="url(#d83-arrGreen)"/>
          <text x="276" y="274" text-anchor="middle" font-size="10" font-weight="800" fill="#059669">FB = 200 mV 精密帰還 → 電池残量が変わっても明るさ一定！</text>
          <text x="234" y="308" text-anchor="middle" font-size="9.8" font-weight="700" fill="#475569">38V OVP（オープンLED過電圧保護）内蔵で断線時も安全停止</text>
          ${drawPanelBox(466, 82, 226, 248, '1.2 MHz超音波駆動の意味', '#0284c7')}
          <text x="480" y="132" font-size="10.5" font-weight="800" fill="#0f172a">動画マイクへノイズを入れない！</text>
          <text x="480" y="158" font-size="9.8" font-weight="600" fill="#334155">• 人の耳・マイクの可聴域(20kHz)を</text>
          <text x="480" y="174" font-size="9.8" font-weight="600" fill="#334155">  はるかに超える1.2MHz駆動で</text>
          <text x="480" y="190" font-size="9.8" font-weight="600" fill="#334155">  「キーン」というコイル鳴きゼロ</text>
          <text x="480" y="220" font-size="9.8" font-weight="700" fill="#ea580c">• I_LED = 0.200 V / R_set</text>
          <text x="480" y="238" font-size="9.6" font-weight="600" fill="#334155">  極低200mV検出で電力ロス極小</text>
          ${drawStatusPill(478, 282, 202, '効率90%超＋完全無音昇圧', true)}
        `,
        cards: [
          { label: 'どんな回路？', line1: '7.2V電池から28V直列LEDを駆動する', line2: 'TPS61165級 1.2MHz定電流昇圧回路' },
          { label: 'スゴい工夫', line1: '200mV低損失R_set電流帰還＋', line2: '38V OVP保護＋超音波無音駆動' },
          { label: '撮影メリット', line1: '電池が減っても画面の明るさが安定', line2: '＆動画収録マイクにコイル鳴きゼロ' },
        ],
      });

    case 'lcd_tft_bias_pmic':
      return wrapLcdHdSvg({
        badge: 'D84',
        title: 'TFT液晶多系統バイアス電源PMIC＆チャージポンプMLCC群',
        analogy: '電池1つから4種類の正負高電圧を完璧な順番で作る「液晶電源の司令塔」',
        accent: '#059669',
        accentSoft: '#d1fae5',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '4系統バイアス電圧生成＆厳密電源投入シーケンス（TPS65148級）', '#059669')}
          <!-- Center PMIC chip -->
          <rect x="64" y="160" width="96" height="96" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
          <text x="112" y="200" text-anchor="middle" font-size="11.5" font-weight="900" fill="#ffffff">TFT BIAS</text>
          <text x="112" y="218" text-anchor="middle" font-size="11" font-weight="800" fill="#6ee7b7">PMIC</text>
          <text x="112" y="236" text-anchor="middle" font-size="8.8" font-weight="700" fill="#a7f3d0">QFN-32</text>
          <!-- 4 Output Rails with sequenced step numbers -->
          ${[
            [126, '② AVDD +10 V', 'ソース駆動アナログ電源', '#0284c7'],
            [168, '② VNEG −7 V', '負極性ソース電源', '#4f46e5'],
            [210, '③ VGL −9 V', 'TFTゲート完全OFF負圧', '#7c3aed'],
            [252, '④ VGH +18 V', 'TFTゲート高速ON高圧', '#e11d48'],
          ]
            .map(
              ([y, label, sub, col]) => `
            <line x1="160" y1="${Number(y) + 12}" x2="216" y2="${Number(y) + 12}" stroke="${col}" stroke-width="2.4" marker-end="url(#d84-arrSlate)"/>
            <rect x="220" y="${y}" width="204" height="30" rx="6" fill="#ffffff" stroke="${col}" stroke-width="1.6"/>
            <text x="230" y="${Number(y) + 14}" font-size="10.2" font-weight="900" fill="${col}">${label}</text>
            <text x="230" y="${Number(y) + 25}" font-size="8.8" font-weight="600" fill="#475569">${sub}</text>`
            )
            .join('')}
          <text x="234" y="308" text-anchor="middle" font-size="10" font-weight="800" fill="#065f46">起動順序: ①DVDD(1.8V) → ②AVDD/VNEG → ③VGL → ④VGH（逆順禁止！）</text>
          ${drawPanelBox(456, 82, 236, 248, 'チャージポンプ＋XAO残像消去', '#0284c7')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">フライングMLCC昇圧・反転</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• 4個のセラミックコンデンサで</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  コイル不要のまま+18V/−9V生成</text>
          <text x="472" y="200" font-size="10.5" font-weight="800" fill="#e11d48">電源OFF時 XAO急速放電</text>
          <text x="472" y="220" font-size="9.8" font-weight="600" fill="#334155">• 電源を切った瞬間に全ゲートを</text>
          <text x="472" y="236" font-size="9.8" font-weight="600" fill="#334155">  全開にして画素の残留電荷を</text>
          <text x="472" y="252" font-size="9.8" font-weight="600" fill="#334155">  瞬時ゼロ化（消灯フラッシュ防止）</text>
          ${drawStatusPill(470, 282, 208, '4電源シーケンス＋残像消去', true)}
        `,
        cards: [
          { label: 'どんなIC？', line1: 'AVDD/VNEG/VGH/VGLの4系統を', line2: '1チップ生成するTFTバイアスPMIC' },
          { label: 'スゴい工夫', line1: '厳格な起動順序制御と電源断時の', line2: 'XAO急速放電でパネル破壊・残像防止' },
          { label: '撮影メリット', line1: '電源ON/OFF時に画面が白く光らず', line2: '暗部階調も低リップルで美しい' },
        ],
      });

    case 'lcd_vcom_calibrator_dac':
      return wrapLcdHdSvg({
        badge: 'D85',
        title: 'デジタルVCOM共通電圧キャリブレーターDAC＆フリッカー除去',
        analogy: '＋電圧と−電圧のど真ん中を0.005V刻みで合わせてチラつきを消す「精密ゼロ調整つまみ」',
        accent: '#0891b2',
        accentSoft: '#cffafe',
        body: `
          ${drawPanelBox(28, 82, 326, 248, '❌ VCOMズレ（キックバック未補正）', '#e11d48', '#fff1f2')}
          <!-- Asymmetric + / - pixel voltage around wrong VCOM -->
          <line x1="56" y1="200" x2="328" y2="200" stroke="#e11d48" stroke-width="2" stroke-dasharray="5 3"/>
          <text x="192" y="192" text-anchor="middle" font-size="9.8" font-weight="800" fill="#be123c">ズレた VCOM 中心線</text>
          <rect x="78" y="138" width="90" height="62" fill="#fb7185" fill-opacity="0.45" stroke="#e11d48" stroke-width="1.6"/>
          <text x="123" y="174" text-anchor="middle" font-size="10" font-weight="800" fill="#881337">+フレーム大</text>
          <rect x="206" y="200" width="90" height="36" fill="#38bdf8" fill-opacity="0.45" stroke="#0284c7" stroke-width="1.6"/>
          <text x="251" y="222" text-anchor="middle" font-size="10" font-weight="800" fill="#0c4a6e">−フレーム小</text>
          <text x="192" y="264" text-anchor="middle" font-size="10" font-weight="800" fill="#be123c">明るさ差＝チラつき＆DC焼き付き発生！</text>
          ${drawStatusPill(66, 284, 250, 'フリッカー・残像の原因', false)}

          ${drawPanelBox(368, 82, 324, 248, '✅ 10-bit デジタルVCOM校正済（5mV刻み）', '#0891b2', '#ecfeff')}
          <line x1="396" y1="196" x2="668" y2="196" stroke="#059669" stroke-width="2.4"/>
          <text x="532" y="188" text-anchor="middle" font-size="9.8" font-weight="900" fill="#065f46">最適 VCOM_opt = V_mid − ΔV_kickback</text>
          <rect x="418" y="148" width="90" height="48" fill="#34d399" fill-opacity="0.45" stroke="#059669" stroke-width="1.6"/>
          <text x="463" y="176" text-anchor="middle" font-size="10" font-weight="800" fill="#065f46">+フレーム等価</text>
          <rect x="546" y="196" width="90" height="48" fill="#38bdf8" fill-opacity="0.45" stroke="#0284c7" stroke-width="1.6"/>
          <text x="591" y="224" text-anchor="middle" font-size="10" font-weight="800" fill="#0c4a6e">−フレーム等価</text>
          <text x="532" y="264" text-anchor="middle" font-size="10" font-weight="800" fill="#0f766e">±300mA高速バッファで水平クロストークゼロ！</text>
          ${drawStatusPill(406, 284, 250, 'チラつきゼロ＆DC焼き付き防止', true)}
        `,
        cards: [
          { label: 'どんな回路？', line1: '10-bit I²C校正DAC＋不揮発メモリ＋', line2: '±300mA大電流VCOM基準バッファ' },
          { label: 'スゴい工夫', line1: '工場で1台ずつ5mV精度で校正し', line2: 'TFTキックバック電圧低下を完全相殺' },
          { label: '撮影メリット', line1: '長時間のピント確認でも目が疲れず', line2: 'メニュー表示の焼き付きも防ぐ' },
        ],
      });

    case 'lcd_gamma_lut_eeprom':
      return wrapLcdHdSvg({
        badge: 'D86',
        title: '工場個別校正 10-bitガンマLUT＆D65色域補正EEPROM IC',
        analogy: '出荷前に1枚ずつ測った「その個体だけの色のカルテ」を記憶している小さなメモリ',
        accent: '#7c3aed',
        accentSoft: '#f3e8ff',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '個体別 10-bit V-Tガンマ補正カーブ＆EVF色整合フロー', '#7c3aed')}
          <!-- Gamma correction graph -->
          <line x1="66" y1="274" x2="262" y2="274" stroke="#64748b" stroke-width="1.5"/>
          <line x1="66" y1="126" x2="66" y2="274" stroke="#64748b" stroke-width="1.5"/>
          <text x="164" y="294" text-anchor="middle" font-size="9.5" font-weight="700" fill="#475569">入力階調コード (10-bit 0..1023)</text>
          <!-- Raw non-linear S-curve -->
          <path d="M 66 274 C 122 270 156 164 256 132" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
          <text x="118" y="198" font-size="9" font-weight="700" fill="#64748b">未校正パネル特性</text>
          <!-- Calibrated ideal Gamma 2.2 / S-Log3 curve -->
          <path d="M 66 274 Q 178 242 256 132" fill="none" stroke="#7c3aed" stroke-width="3"/>
          <text x="198" y="232" font-size="9.8" font-weight="900" fill="#7c3aed">10-bit LUT校正後</text>
          <!-- Right side chip + I2C link to BIONZ XR -->
          <rect x="292" y="128" width="128" height="64" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.8"/>
          <text x="356" y="154" text-anchor="middle" font-size="10.8" font-weight="900" fill="#f8fafc">EEPROM / OTP</text>
          <text x="356" y="172" text-anchor="middle" font-size="9.2" font-weight="700" fill="#c4b5fd">D65 / DCI-P3 / LUT</text>
          <line x1="356" y1="194" x2="356" y2="232" stroke="#0284c7" stroke-width="2.4" marker-end="url(#d86-arrBlue)"/>
          <rect x="292" y="236" width="128" height="46" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
          <text x="356" y="256" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0369a1">BIONZ XR / T-CON</text>
          <text x="356" y="272" text-anchor="middle" font-size="9" font-weight="700" fill="#0284c7">起動時に自動読込</text>
          ${drawPanelBox(456, 82, 236, 248, 'プロ基準の色一致 ΔE &lt; 2.0', '#059669')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">EVFと背面LCDの色がピタリ一致</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• ファインダーを覗いた色と</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  背面モニターの色ズレを解消</text>
          <text x="472" y="198" font-size="9.8" font-weight="600" fill="#7c3aed">• RGB独立14〜22点のガンマ基準</text>
          <text x="472" y="214" font-size="9.8" font-weight="600" fill="#7c3aed">  電圧で人肌・青空も自然階調</text>
          <text x="472" y="242" font-size="9.8" font-weight="600" fill="#059669">• 修理交換時も個体データ付属</text>
          ${drawStatusPill(470, 282, 208, '工場全数キャリブレーション済', true)}
        `,
        cards: [
          { label: 'どんなメモリ？', line1: 'パネル個別の色座標・10-bitガンマを', line2: '記憶するシリアルEEPROM/OTP IC' },
          { label: 'スゴい工夫', line1: '起動時にBIONZ XRがI²C読込し', line2: 'EVFと背面LCDの色差をΔE<2.0に整合' },
          { label: '撮影メリット', line1: '現場で正しいホワイトバランスと', line2: 'S-Log3ガンマアシストを信頼できる' },
        ],
      });

    case 'lcd_mipi_cmc_choke':
      return wrapLcdHdSvg({
        badge: 'D87',
        title: 'MIPI-DSI 90Ω差動コモンモードチョークフィルタアレイ',
        analogy: '正しい映像信号だけをスッと通し、Wi-Fi妨害ノイズだけを磁石で止める「電波の関所」',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'Murata DLM0NS / TDK TCM06U級 薄膜CMC動作原理（5ペア実装）', '#0284c7')}
          <!-- Differential Signal (Opposite polarity) -> Flux cancels -> Passes cleanly! -->
          <rect x="46" y="118" width="376" height="86" rx="8" fill="#dcfce7" fill-opacity="0.55" stroke="#16a34a" stroke-width="1.5"/>
          <text x="60" y="136" font-size="10.5" font-weight="900" fill="#14532d">① 正規MIPI映像信号（差動 ± 逆向き）→ 磁束打消しで無劣化通過！(Z=90Ω)</text>
          <line x1="60" y1="158" x2="178" y2="158" stroke="#0284c7" stroke-width="2.4" marker-end="url(#d87-arrBlue)"/>
          <line x1="178" y1="184" x2="60" y2="184" stroke="#0284c7" stroke-width="2.4" marker-end="url(#d87-arrBlue)"/>
          <rect x="184" y="144" width="96" height="52" rx="6" fill="#334155" stroke="#0284c7" stroke-width="1.6"/>
          <text x="232" y="174" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">90Ω CMC</text>
          <line x1="284" y1="158" x2="404" y2="158" stroke="#059669" stroke-width="2.8" marker-end="url(#d87-arrGreen)"/>
          <line x1="404" y1="184" x2="284" y2="184" stroke="#059669" stroke-width="2.8" marker-end="url(#d87-arrGreen)"/>
          <!-- Common-mode Noise (Same polarity) -> Flux adds -> Blocked! -->
          <rect x="46" y="216" width="376" height="94" rx="8" fill="#fff1f2" stroke="#e11d48" stroke-width="1.5"/>
          <text x="60" y="234" font-size="10.5" font-weight="900" fill="#9f1239">② 不要放射ノイズ（同相 同じ向き）→ 磁束強め合いで強力遮断！(−20dB超)</text>
          <line x1="60" y1="258" x2="176" y2="258" stroke="#e11d48" stroke-width="2.6" marker-end="url(#d87-arrRed)"/>
          <line x1="60" y1="284" x2="176" y2="284" stroke="#e11d48" stroke-width="2.6" marker-end="url(#d87-arrRed)"/>
          <rect x="184" y="246" width="96" height="52" rx="6" fill="#334155" stroke="#e11d48" stroke-width="1.8"/>
          <text x="232" y="276" text-anchor="middle" font-size="10" font-weight="900" fill="#fda4af">高抵抗ブロック</text>
          <text x="344" y="276" text-anchor="middle" font-size="11" font-weight="900" fill="#059669">Wi-Fi帯ノイズ消滅！</text>
          ${drawPanelBox(456, 82, 236, 248, '5ペア一括EMI対策', '#4f46e5')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">データ4本＋クロック1本</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• 2.5 Gbps超の高速映像線が</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  ヒンジ部でアンテナ化するのを防ぐ</text>
          <text x="472" y="198" font-size="9.8" font-weight="700" fill="#0284c7">• 差動通過帯域 f_c &gt; 5 GHz</text>
          <text x="472" y="216" font-size="9.8" font-weight="700" fill="#e11d48">• 2.4/5 GHz同相減衰 &gt; 20 dB</text>
          <text x="472" y="242" font-size="9.6" font-weight="600" fill="#334155">• スマホ転送Wi-Fiや無線マイクの</text>
          <text x="472" y="258" font-size="9.6" font-weight="600" fill="#334155">  感度低下(デセンス)を徹底回避</text>
          ${drawStatusPill(470, 282, 208, '高速映像無劣化＋Wi-Fi快適通信', true)}
        `,
        cards: [
          { label: 'どんな部品？', line1: 'MIPI 5ペアに直列配置された', line2: '90Ω薄膜コモンモードチョーク' },
          { label: 'スゴい工夫', line1: '逆向き差動映像は透過(5GHz超)し', line2: '同相のGHz放射ノイズだけ−20dB減衰' },
          { label: '撮影メリット', line1: 'ライブビュー表示中でもWi-Fi転送や', line2: 'ワイヤレスマイク受信が途切れない' },
        ],
      });

    case 'lcd_ddic_silicon_arch':
      return wrapLcdHdSvg({
        badge: 'D88',
        title: 'COGディスプレイ駆動IC（T-CON/DDIC）内部シリコン機能図',
        analogy: 'ガラス下端の細長いチップに詰まった「映像受信→メモ帳→色変換→2,000本出力工場」',
        accent: '#2563eb',
        accentSoft: '#dbeafe',
        body: `
          ${drawPanelBox(28, 82, 664, 248, '細長ベアシリコンダイ（約 22×2.5 mm）内部機能アーキテクチャ＆金バンプ2,000+配列', '#2563eb')}
          <!-- Top Au bump row (2000+ Source outputs to IPS panel) -->
          ${Array.from({ length: 28 })
            .map((_, i) => `<rect x="${56 + i * 22}" y="122" width="12" height="14" rx="2" fill="#eab308"/>`)
            .join('')}
          <text x="360" y="116" text-anchor="middle" font-size="10" font-weight="900" fill="#b45309">▲ IPSパネル列へ直結する Au金バンプ 2,000+ チャネル（ピッチ 15〜20 μm） ▲</text>
          <!-- Silicon die body with 5 clear color-coded blocks -->
          <rect x="44" y="140" width="632" height="130" rx="8" fill="#0f172a" stroke="#2563eb" stroke-width="2"/>
          ${[
            [56, 114, '#1d4ed8', '① MIPI D-PHY', '4-Lane 2.5Gbps', '高速シリアル受信'],
            [180, 122, '#0f766e', '② SRAM GRAM', '内蔵フレームBUF', 'PSR静止省電力'],
            [312, 118, '#6d28d9', '③ 10-bit LUT', '抵抗ラダーDAC', '+FRC滑らか階調'],
            [440, 108, '#b45309', '④ CABC / SRE', '屋外視認性強調', '輝度協調DSP'],
            [558, 106, '#be123c', '⑤ 2,000ch Amp', '高速ソース駆動', 'セトリング&lt;1μs'],
          ]
            .map(
              ([x, w, col, t1, t2, t3]) => `
            <rect x="${x}" y="152" width="${w}" height="106" rx="6" fill="${col}" fill-opacity="0.88" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="${Number(x) + Number(w) / 2}" y="182" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">${t1}</text>
            <text x="${Number(x) + Number(w) / 2}" y="206" text-anchor="middle" font-size="9.4" font-weight="700" fill="#e2e8f0">${t2}</text>
            <text x="${Number(x) + Number(w) / 2}" y="228" text-anchor="middle" font-size="9" font-weight="700" fill="#fde047">${t3}</text>`
            )
            .join('')}
          <!-- Flow arrows between blocks -->
          ${[170, 302, 430, 548]
            .map((x) => `<line x1="${x}" y1="205" x2="${x + 10}" y2="205" stroke="#ffffff" stroke-width="2.4"/>`)
            .join('')}
          <text x="360" y="302" text-anchor="middle" font-size="10.8" font-weight="800" fill="#1e3a8a">毎秒 2.58 Gbps（1024×700×RGB×10bit×120Hz）を1μs未満で全列アナログ電圧変換！</text>
        `,
        cards: [
          { label: 'どんなチップ？', line1: 'TFTガラス下端へ直載される', line2: '22mm細長ベアシリコン駆動IC' },
          { label: 'スゴい工夫', line1: '内蔵GRAMで静止時の本体負荷を削減', line2: 'FRCディザリングで10-bit相当階調' },
          { label: '撮影メリット', line1: '青空のグラデーションに縞が出ず', line2: '120Hz高速連写も遅延なく追従' },
        ],
      });

    case 'lcd_micro_coax_4layer':
      return wrapLcdHdSvg({
        badge: 'D89',
        title: 'AWG44–46 極細同軸4層同心構造＆I-PEX一括グランドバー',
        analogy: '直径わずか0.2mmの中に4層構造が全部詰まった「超ミクロのテレビアンテナ線」',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          ${drawPanelBox(28, 82, 424, 248, 'AWG44（外径 0.20 mm）4層ステップ剥離断面＆CABLINE-CX II終端', '#d97706')}
          <!-- Stepped concentric cutaway of a micro-coaxial cable -->
          <!-- Layer 4: Outer FEP Jacket -->
          <rect x="48" y="156" width="110" height="72" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="1.6"/>
          <text x="103" y="196" text-anchor="middle" font-size="10" font-weight="800" fill="#f8fafc">④ FEP外被</text>
          <!-- Layer 3: >=90% Spiral Copper Shield -->
          <rect x="158" y="166" width="96" height="52" fill="url(#d89-copper)" stroke="#7c2d12" stroke-width="1.5"/>
          <text x="206" y="196" text-anchor="middle" font-size="9.6" font-weight="900" fill="#ffffff">③ 銅横巻シールド</text>
          <!-- Layer 2: PFA Fluoropolymer Dielectric -->
          <rect x="254" y="176" width="76" height="32" fill="#e2e8f0" stroke="#64748b" stroke-width="1.4"/>
          <text x="292" y="196" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">② PFA絶縁</text>
          <!-- Layer 1: Silver-Plated Copper Alloy Center Conductor -->
          <rect x="330" y="185" width="78" height="14" fill="url(#d89-steel)" stroke="#334155" stroke-width="1.3"/>
          <!-- I-PEX Laser-soldered Ground Bar & 0.25mm Pitch Plug -->
          <rect x="184" y="132" width="44" height="34" rx="4" fill="url(#d89-gold)" stroke="#92400e" stroke-width="1.5"/>
          <text x="206" y="124" text-anchor="middle" font-size="9.5" font-weight="900" fill="#b45309">レーザー溶接一括GNDバー</text>
          <rect x="394" y="148" width="42" height="88" rx="6" fill="#334155" stroke="#eab308" stroke-width="2"/>
          <text x="415" y="196" text-anchor="middle" font-size="9.2" font-weight="900" fill="#fde047" transform="rotate(-90 415 196)">I-PEX 0.25mm</text>
          ${drawCallout(368, 192, 326, 280, 1, '① 銀メッキ銅合金芯線', 'AWG44 7本撚り(0.05mm)高耐屈曲', '#334155', 'middle')}
          ${drawPanelBox(466, 82, 226, 248, 'なぜFPCより極細同軸？', '#0284c7')}
          <text x="480" y="132" font-size="10.5" font-weight="800" fill="#0f172a">360°捻じれ＋完全50Ω整合</text>
          <text x="480" y="156" font-size="9.6" font-weight="600" fill="#334155">• 270°捻じれ回転するヒンジ軸に</text>
          <text x="480" y="172" font-size="9.6" font-weight="600" fill="#334155">  36本束ねて通しても断線しない</text>
          <text x="480" y="198" font-size="9.6" font-weight="700" fill="#d97706">• PFA低誘電(ε=2.1)＋90%シールド</text>
          <text x="480" y="214" font-size="9.6" font-weight="700" fill="#d97706">  でGHz映像のクロストーク極小</text>
          <text x="480" y="242" font-size="9.6" font-weight="600" fill="#059669">• 跳ね上げ式メカニカルロックバー</text>
          <text x="480" y="258" font-size="9.6" font-weight="600" fill="#059669">  で落下時のコネクタ抜けを防止</text>
          ${drawStatusPill(478, 282, 202, '10万回捻じれ＋完全EMI遮蔽', true)}
        `,
        cards: [
          { label: '線材4層構造', line1: '銀メッキ芯線/PFA/銅横巻シールド/', line2: 'FEP外被が外径0.2mmに凝縮' },
          { label: 'スゴい工夫', line1: 'I-PEX CABLINE-CX IIで全36本の', line2: 'シールドを一括GNDバー＆ロック' },
          { label: '撮影メリット', line1: '10万回の自撮り回転でも切れず', line2: '高速映像とWi-Fiを完全分離' },
        ],
      });

    default:
      return null;
  }
}
