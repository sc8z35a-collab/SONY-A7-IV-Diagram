import { PartExplanation } from '../../assemblies/types';
import {
  drawCallout,
  drawPanelBox,
  drawRaindrop,
  drawStatusPill,
  drawSunIcon,
  wrapLcdHdSvg,
} from './shared';

/**
 * Phase 35 Ultra-HD 720x470 Beginner-Friendly Technical Infographic SVGs:
 * Group D — Polarizer Core, IPS Compensation, IM-ITO, Panel Reliability, BLU Micro-Optics
 * & α1 II / α9 III Extended 4-Axis OEM Mechanics (D111–D130, 20 parts).
 */
export function renderLcdHdGroupD(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // -------------------------------------------------------------------------
    // D111: Stretched Iodine-Dyed PVA Dichroic Core (~20 μm + Boric Acid)
    // -------------------------------------------------------------------------
    case 'lcd_pva_iodine_core':
      return wrapLcdHdSvg({
        badge: 'D111',
        title: '延伸ヨウ素染色PVA二色性偏光コア層（~20 μm＋ホウ酸架橋）',
        analogy: 'ランダムな光を1方向だけ通す「分子レベルの極細ブラインド（すだれ）」',
        accent: '#4f46e5',
        accentSoft: '#eef2ff',
        body: `
          ${drawPanelBox(24, 80, 326, 254, '① 5〜6倍一軸延伸 PVA鎖 ＋ ポリヨウ素錯体（I₃⁻/I₅⁻）', '#4f46e5', '#f8fafc')}
          <!-- Unpolarized light waves entering from left -->
          <g transform="translate(46, 175)">
            <circle cx="16" cy="0" r="18" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.6"/>
            <line x1="2" y1="0" x2="30" y2="0" stroke="#e11d48" stroke-width="2"/>
            <line x1="16" y1="-14" x2="16" y2="14" stroke="#0284c7" stroke-width="2"/>
            <line x1="6" y1="-10" x2="26" y2="10" stroke="#16a34a" stroke-width="1.5"/>
            <line x1="6" y1="10" x2="26" y2="-10" stroke="#7c3aed" stroke-width="1.5"/>
            <text x="16" y="34" text-anchor="middle" font-size="9.5" font-weight="800" fill="#b45309">自然光（全方向）</text>
          </g>
          <line x1="88" y1="175" x2="124" y2="175" stroke="#f59e0b" stroke-width="2.4" marker-end="url(#d111-arrAmber)"/>
          <!-- Stretched PVA core slab with horizontal iodine absorber rods -->
          <rect x="130" y="116" width="128" height="122" rx="8" fill="#1e1b4b" stroke="#4f46e5" stroke-width="2"/>
          <g stroke="#818cf8" stroke-width="2.2" stroke-linecap="round">
            <line x1="142" y1="132" x2="246" y2="132"/>
            <line x1="142" y1="148" x2="246" y2="148"/>
            <line x1="142" y1="164" x2="246" y2="164"/>
            <line x1="142" y1="180" x2="246" y2="180"/>
            <line x1="142" y1="196" x2="246" y2="196"/>
            <line x1="142" y1="212" x2="246" y2="212"/>
            <line x1="142" y1="226" x2="246" y2="226"/>
          </g>
          <!-- Boric acid cross-link nodes -->
          <g fill="#38bdf8">
            <circle cx="168" cy="140" r="3"/><circle cx="212" cy="156" r="3"/>
            <circle cx="176" cy="172" r="3"/><circle cx="222" cy="188" r="3"/>
            <circle cx="164" cy="204" r="3"/><circle cx="210" cy="220" r="3"/>
          </g>
          <text x="194" y="256" text-anchor="middle" font-size="9.6" font-weight="800" fill="#4f46e5">延伸軸（水平）＝ 吸収軸（99.99%遮断）</text>
          <line x1="264" y1="175" x2="296" y2="175" stroke="#0284c7" stroke-width="2.6" marker-end="url(#d111-arrBlue)"/>
          <!-- Vertically polarized clean output -->
          <g transform="translate(302, 175)">
            <circle cx="18" cy="0" r="18" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>
            <line x1="18" y1="-13" x2="18" y2="13" stroke="#0284c7" stroke-width="3"/>
            <text x="18" y="34" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0369a1">直線偏光</text>
          </g>
          ${drawStatusPill(44, 294, 286, '偏光度 P ≥ 99.98% / コントラスト &gt; 10,000:1', true)}

          ${drawPanelBox(366, 80, 330, 254, '② ホウ酸架橋（Boric Cross-Link）の高温耐熱構造', '#0284c7', '#ffffff')}
          <!-- Cross-linked PVA molecular diagram -->
          <rect x="386" y="116" width="290" height="104" rx="8" fill="#f1f5f9" stroke="#cbd5e1"/>
          <line x1="406" y1="142" x2="656" y2="142" stroke="#4f46e5" stroke-width="3.5"/>
          <line x1="406" y1="194" x2="656" y2="194" stroke="#4f46e5" stroke-width="3.5"/>
          <g stroke="#0284c7" stroke-width="2.2" stroke-dasharray="4 2">
            <line x1="454" y1="142" x2="454" y2="194"/>
            <line x1="532" y1="142" x2="532" y2="194"/>
            <line x1="610" y1="142" x2="610" y2="194"/>
          </g>
          <g fill="#0284c7">
            <circle cx="454" cy="168" r="10"/><circle cx="532" cy="168" r="10"/><circle cx="610" cy="168" r="10"/>
          </g>
          <g fill="#ffffff" font-size="9.5" font-weight="800" text-anchor="middle">
            <text x="454" y="171.5">B</text><text x="532" y="171.5">B</text><text x="610" y="171.5">B</text>
          </g>
          <text x="532" y="132" text-anchor="middle" font-size="9.5" font-weight="800" fill="#312e81">PVA高分子鎖 (–CH₂–CH(OH)–)ₙ</text>
          <text x="532" y="212" text-anchor="middle" font-size="9.2" font-weight="700" fill="#0369a1">ホウ酸イオン架橋が85℃炎天下での熱収縮（黒浮き）を防止</text>
          ${drawCallout(532, 178, 400, 260, 1, '厚さわずか 15–20 μm', '単体透過率 ~43% と深い黒を両立', '#4f46e5')}
          ${drawCallout(610, 194, 400, 304, 2, '85℃ / 85%RH 500h クリア', '熱収縮率 &lt; 0.2% の高耐久架橋網', '#0284c7')}
        `,
        cards: [
          { label: 'どんな仕組み？', line1: 'ヨウ素錯体を染めたPVAを5倍延伸し', line2: '平行な光を吸収・垂直光のみ透過' },
          { label: 'ホウ酸架橋の役割', line1: '分子鎖を網目結合して真夏85℃でも', line2: '偏光板の熱収縮・白抜けを防止' },
          { label: '撮影でのメリット', line1: 'クロス透過率0.005%未満で締まった黒', line2: '夜景の暗部ノイズを正確にチェック' },
        ],
      });

    // -------------------------------------------------------------------------
    // D112: Dual UV-Blocking TAC Support & Optical PSA Adhesive Layer
    // -------------------------------------------------------------------------
    case 'lcd_tac_uv_psa_barrier':
      return wrapLcdHdSvg({
        badge: 'D112',
        title: '両面保護TACフィルム（UV遮断剤入）＆光学アクリルPSA粘着層',
        analogy: '繊細な偏光コアを挟む「日焼け止め付の透明鎧」＋「気泡ゼロの光学両面テープ」',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        body: `
          ${drawPanelBox(24, 80, 412, 254, '偏光板5層サンドイッチ断面（総厚 ~130 μm）', '#7c3aed', '#ffffff')}
          <!-- Sun emitting UV + Visible -->
          ${drawSunIcon(58, 122, 12)}
          <line x1="78" y1="118" x2="140" y2="132" stroke="#7c3aed" stroke-width="2.2" stroke-dasharray="3 2" marker-end="url(#d112-arrPurple)"/>
          <text x="108" y="114" text-anchor="middle" font-size="9" font-weight="800" fill="#7c3aed">UV &lt;380nm</text>
          <line x1="78" y1="130" x2="140" y2="160" stroke="#0284c7" stroke-width="2.2" marker-end="url(#d112-arrBlue)"/>
          <text x="108" y="156" text-anchor="middle" font-size="9" font-weight="800" fill="#0284c7">可視光</text>

          <!-- Sandwich stack -->
          <rect x="148" y="118" width="268" height="32" rx="4" fill="#ddd6fe" stroke="#7c3aed" stroke-width="1.6"/>
          <text x="282" y="138" text-anchor="middle" font-size="10.5" font-weight="800" fill="#4c1d95">前面 UV吸収TAC保護膜（40–60 μm） 🛡 UV 99%カット</text>

          <rect x="148" y="154" width="268" height="24" rx="4" fill="#312e81" stroke="#4f46e5" stroke-width="1.5"/>
          <text x="282" y="170" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">延伸ヨウ素PVAコア（D111：~20 μm）</text>

          <rect x="148" y="182" width="268" height="32" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
          <text x="282" y="202" text-anchor="middle" font-size="10.5" font-weight="800" fill="#075985">背面 ゼロ位相差TAC / COP保護膜（R_e &lt; 2 nm）</text>

          <rect x="148" y="218" width="268" height="28" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
          <text x="282" y="236" text-anchor="middle" font-size="10.2" font-weight="800" fill="#92400e">光学アクリルPSA粘着層（~20 μm・応力緩和クッション）</text>

          <rect x="148" y="250" width="268" height="26" rx="4" fill="url(#d112-glass)" stroke="#0284c7" stroke-width="1.4"/>
          <text x="282" y="267" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0c4a6e">IPS液晶セル CFガラス基板（EAGLE XG）</text>

          ${drawStatusPill(44, 294, 372, 'UV遮断 &gt; 99%（液晶黄変防止）＋ PSA応力緩和（四隅Mura防止）', true)}

          ${drawPanelBox(452, 80, 244, 254, '紫外線遮断スペクトル＆応力緩和', '#059669', '#f8fafc')}
          <!-- UV cutoff curve -->
          <line x1="482" y1="204" x2="676" y2="204" stroke="#475569" stroke-width="1.4"/>
          <line x1="482" y1="124" x2="482" y2="204" stroke="#475569" stroke-width="1.4"/>
          <rect x="483" y="126" width="54" height="77" fill="#ede9fe" opacity="0.8"/>
          <path d="M 484 202 L 530 202 C 538 202 544 134 556 132 L 672 132" fill="none" stroke="#7c3aed" stroke-width="2.8"/>
          <text x="510" y="144" text-anchor="middle" font-size="9" font-weight="800" fill="#6d28d9">UV遮断</text>
          <text x="510" y="156" text-anchor="middle" font-size="8.8" font-weight="700" fill="#6d28d9">&lt;380nm</text>
          <text x="615" y="148" text-anchor="middle" font-size="9.5" font-weight="800" fill="#059669">可視光 透過 &gt;92%</text>
          <text x="578" y="220" text-anchor="middle" font-size="9" font-weight="700" fill="#334155">波長 λ (300 → 700 nm)</text>
          ${drawCallout(540, 180, 478, 258, 1, 'ゼロ複屈折TAC', '偏光軸を乱さず高純度透過', '#7c3aed')}
          ${drawCallout(580, 200, 478, 304, 2, '粘弾性PSA吸収', 'PVAの伸縮応力を四隅で逃がす', '#d97706')}
        `,
        cards: [
          { label: '日焼け止めTAC', line1: '380nm以下の紫外線を99%超カット', line2: '炎天下での液晶分子劣化・黄変を防止' },
          { label: 'ゼロ位相差の秘密', line1: '面内位相差 R_e &lt; 2 nm の等方フィルム', line2: '揃えた偏光を乱さず高コントラスト維持' },
          { label: '光学PSAの役割', line1: '熱によるPVA伸縮応力を粘弾性で吸収', line2: '画面四隅の白浮き（コーナーMura）抑制' },
        ],
      });

    // -------------------------------------------------------------------------
    // D113: IPS +A/+C Biaxial Optical Compensation Film
    // -------------------------------------------------------------------------
    case 'lcd_ips_ac_comp_film':
      return wrapLcdHdSvg({
        badge: 'D113',
        title: 'IPS広視野角 +A/+C 二軸位相差補償フィルム（IPSグロー撲滅）',
        analogy: '斜め45°から覗いた時の「偏光軸のズレ」を逆方向に打ち消す光学メガネ',
        accent: '#06b6d4',
        accentSoft: '#ecfeff',
        body: `
          ${drawPanelBox(24, 80, 326, 254, '❌ 補償なしIPS（斜め45°でIPSグロー発生）', '#e11d48', '#fff1f2')}
          <!-- Crossed axes spread > 90 deg at 45° oblique view -->
          <g transform="translate(186, 190)">
            <circle cx="0" cy="0" r="64" fill="#1e293b" stroke="#fda4af" stroke-width="2"/>
            <!-- Greyish black glow haze -->
            <circle cx="0" cy="0" r="56" fill="#94a3b8" opacity="0.45"/>
            <line x1="-54" y1="-22" x2="54" y2="22" stroke="#f43f5e" stroke-width="2.8"/>
            <line x1="-22" y1="54" x2="22" y2="-54" stroke="#f43f5e" stroke-width="2.8"/>
            <path d="M 16 -12 A 20 20 0 0 1 20 12" fill="none" stroke="#fde047" stroke-width="2.2"/>
            <text x="34" y="4" font-size="10" font-weight="800" fill="#fde047">&gt;90°ズレ!</text>
            <text x="0" y="78" text-anchor="middle" font-size="10" font-weight="800" fill="#be123c">斜め60°・45°方位：黒浮き（CR &lt; 10:1）</text>
          </g>
          ${drawStatusPill(44, 294, 286, '斜め視角で黒が白っぽく光る「IPSグロー」', false)}

          ${drawPanelBox(366, 80, 330, 254, '✅ +A (138nm) ＋ +C (-86nm) 光学補償IPS', '#0891b2', '#ffffff')}
          <!-- Stacked +A and +C films restoring exact 90 deg orthogonality -->
          <rect x="386" y="114" width="128" height="28" rx="5" fill="#cffafe" stroke="#0891b2" stroke-width="1.6"/>
          <text x="450" y="132" text-anchor="middle" font-size="9.8" font-weight="800" fill="#155e75">+A-Plate (138 nm)</text>
          <rect x="386" y="148" width="128" height="28" rx="5" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
          <text x="450" y="166" text-anchor="middle" font-size="9.8" font-weight="800" fill="#075985">+C-Plate (-86 nm)</text>
          <line x1="518" y1="146" x2="554" y2="176" stroke="#0891b2" stroke-width="2.4" marker-end="url(#d113-arrBlue)"/>
          <g transform="translate(616, 190)">
            <circle cx="0" cy="0" r="62" fill="#020617" stroke="#06b6d4" stroke-width="2.2"/>
            <line x1="-52" y1="0" x2="52" y2="0" stroke="#38bdf8" stroke-width="2.6"/>
            <line x1="0" y1="-52" x2="0" y2="52" stroke="#38bdf8" stroke-width="2.6"/>
            <rect x="0" y="-12" width="12" height="12" fill="none" stroke="#34d399" stroke-width="2"/>
            <text x="0" y="76" text-anchor="middle" font-size="10" font-weight="800" fill="#0e7490">厳密90°直交回復!</text>
          </g>
          ${drawCallout(450, 176, 396, 232, 1, '斜めCR 8〜10倍向上', '極角60°でも CR &gt; 80:1–100:1', '#0891b2')}
          ${drawStatusPill(386, 294, 290, '4軸ロー/ハイアングルでも真っ黒を死守！', true)}
        `,
        cards: [
          { label: 'なぜIPSグローが起きる？', line1: '斜め45°から見ると直交偏光板の', line2: '見かけの角度が90°超に開いて光漏れ' },
          { label: '+A/+C補償の原理', line1: '面内+A膜と厚み+C膜でポアンカレ球の', line2: '偏光軌跡を逆回転させて直交点へ復元' },
          { label: '4軸モニターでの威力', line1: 'ローアングル・縦位置ハイアングルでも', line2: '暗部の露出と黒締まりを正確に判断' },
        ],
      });

    // -------------------------------------------------------------------------
    // D114: Index-Matched ITO (IM-ITO: 8.5 nm Nb2O5 + 49 nm SiO2)
    // -------------------------------------------------------------------------
    case 'lcd_im_ito_matching':
      return wrapLcdHdSvg({
        badge: 'D114',
        title: '屈折率整合 IM-ITO 不可視タッチ電極コート（8.5nm Nb₂O₅＋49nm SiO₂）',
        analogy: 'タッチ電極の「ひし形模様（骨見え）」を光干渉マジックで完全透明化',
        accent: '#0ea5e9',
        accentSoft: '#f0f9ff',
        body: `
          ${drawPanelBox(24, 80, 326, 254, '❌ 通常ITO（反射率差5%で「骨見え」発生）', '#e11d48', '#fff1f2')}
          <!-- Standard ITO vs bare glass gap -->
          <rect x="44" y="218" width="286" height="32" rx="4" fill="url(#d114-glass)" stroke="#0284c7"/>
          <text x="187" y="238" text-anchor="middle" font-size="10" font-weight="800" fill="#0c4a6e">タッチ基板ガラス（n = 1.52）</text>
          <rect x="52" y="196" width="118" height="22" rx="3" fill="#bae6fd" stroke="#0284c7" stroke-width="1.6"/>
          <text x="111" y="211" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0369a1">ITO電極 (n=1.95)</text>
          <text x="244" y="211" text-anchor="middle" font-size="9.5" font-weight="700" fill="#64748b">エッチング隙間</text>
          <!-- Unequal reflected rays -->
          <line x1="111" y1="194" x2="111" y2="124" stroke="#e11d48" stroke-width="4.2" marker-end="url(#d114-arrRed)"/>
          <text x="111" y="116" text-anchor="middle" font-size="10.2" font-weight="900" fill="#be123c">強い反射 R ≈ 9%</text>
          <line x1="244" y1="216" x2="244" y2="148" stroke="#64748b" stroke-width="1.8" marker-end="url(#d114-arrSlate)"/>
          <text x="244" y="140" text-anchor="middle" font-size="10" font-weight="800" fill="#475569">弱い反射 R ≈ 4%</text>
          ${drawStatusPill(44, 294, 286, '反射差 ΔR ≈ 5% → 日光下で電極模様が透ける', false)}

          ${drawPanelBox(366, 80, 330, 254, '✅ IM-ITO（Nb₂O₅ 8.5nm ＋ SiO₂ 49nm 整合）', '#0284c7', '#ffffff')}
          <rect x="386" y="232" width="290" height="24" rx="4" fill="url(#d114-glass)" stroke="#0284c7"/>
          <text x="531" y="248" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0c4a6e">ガラス基板（n = 1.52）</text>
          <!-- Optical matching bilayer -->
          <rect x="386" y="216" width="290" height="16" fill="#0ea5e9"/>
          <text x="531" y="227.5" text-anchor="middle" font-size="8.8" font-weight="800" fill="#ffffff">Nb₂O₅ 高屈折率層（8.5 nm, n = 2.32）</text>
          <rect x="386" y="198" width="290" height="18" fill="#e0f2fe" stroke="#38bdf8"/>
          <text x="531" y="210.5" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">SiO₂ 低屈折率バッファ層（49 nm, n = 1.46）</text>
          <rect x="394" y="178" width="122" height="20" rx="3" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
          <text x="455" y="191.5" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0c4a6e">ITO電極 (140Ω/□)</text>
          <!-- Equalized minimal reflections -->
          <line x1="455" y1="176" x2="455" y2="128" stroke="#059669" stroke-width="2.2" marker-end="url(#d114-arrGreen)"/>
          <line x1="596" y1="196" x2="596" y2="128" stroke="#059669" stroke-width="2.2" marker-end="url(#d114-arrGreen)"/>
          <text x="526" y="118" text-anchor="middle" font-size="10.2" font-weight="900" fill="#047857">反射率完全一致！ ΔR &lt; 0.2% / 透過率 97%</text>
          ${drawStatusPill(386, 294, 290, '直射日光下でもタッチ電極パターン完全不可視！', true)}
        `,
        cards: [
          { label: '骨見えの原因', line1: 'ITO電極(n=1.95)と隙間(n=1.52)の', line2: '屈折率差で反射率が5%も違ってしまう' },
          { label: 'ナノ2層整合', line1: '8.5nm Nb₂O₅ と 49nm SiO₂ の多重干渉で', line2: '電極有無の反射率差を0.2%未満に統一' },
          { label: '画質への貢献', line1: '可視光透過率97%・MF拡大時の細部も', line2: '電極の網目ノイズゼロでクリアに視認' },
        ],
      });

    // -------------------------------------------------------------------------
    // D115: Dual-Domain Chevron (±10° V-Bend) IPS Sub-Pixel Slit Geometry
    // -------------------------------------------------------------------------
    case 'lcd_chevron_ips_slit':
      return wrapLcdHdSvg({
        badge: 'D115',
        title: 'デュアルドメイン・シェブロン（±10° くの字）IPSサブ画素スリット電極',
        analogy: '1画素を上下2部屋に折り曲げ「青ズレと黄ズレ」を逆回転で打ち消す仕組み',
        accent: '#ec4899',
        accentSoft: '#fdf2f8',
        body: `
          ${drawPanelBox(24, 80, 396, 254, 'RGB各サブ画素内の ±10° シェブロン（V字屈曲）スリット電極', '#ec4899', '#0f172a')}
          <!-- Three RGB sub-pixel cells with ±10° chevron slits -->
          ${[
            { x: 48, col: '#ef4444', bg: '#450a0a', lbl: 'R' },
            { x: 168, col: '#22c55e', bg: '#052e16', lbl: 'G' },
            { x: 288, col: '#3b82f6', bg: '#172554', lbl: 'B' },
          ]
            .map(
              (s) => `
              <rect x="${s.x}" y="114" width="106" height="178" rx="6" fill="${s.bg}" stroke="${s.col}" stroke-width="1.8"/>
              <text x="${s.x + 53}" y="130" text-anchor="middle" font-size="11" font-weight="900" fill="${s.col}">${s.lbl} サブ画素</text>
              <!-- 4 chevron ITO slits -->
              <g fill="none" stroke="${s.col}" stroke-width="2.6" stroke-linecap="round">
                <polyline points="${s.x + 24},140 ${s.x + 14},204 ${s.x + 24},278"/>
                <polyline points="${s.x + 48},140 ${s.x + 38},204 ${s.x + 48},278"/>
                <polyline points="${s.x + 72},140 ${s.x + 62},204 ${s.x + 72},278"/>
                <polyline points="${s.x + 94},140 ${s.x + 84},204 ${s.x + 94},278"/>
              </g>
              <!-- Domain divider dashed line -->
              <line x1="${s.x + 4}" y1="204" x2="${s.x + 102}" y2="204" stroke="#f8fafc" stroke-width="1" stroke-dasharray="3 2" opacity="0.6"/>
              <text x="${s.x + 53}" y="168" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fde047">Domain 1 (-10°)</text>
              <text x="${s.x + 53}" y="246" text-anchor="middle" font-size="8.6" font-weight="800" fill="#7dd3fc">Domain 2 (+10°)</text>
            `
            )
            .join('')}
          <text x="222" y="318" text-anchor="middle" font-size="9.6" font-weight="800" fill="#f9a8d4">電極幅 w≈3μm / 間隔 g≈4–8μm / プレチルト 2°</text>

          ${drawPanelBox(436, 80, 260, 254, '斜め視角での色シフト相殺メカニズム', '#0284c7', '#ffffff')}
          <!-- Domain 1 blue shift + Domain 2 yellow shift -> neutral white -->
          <rect x="454" y="116" width="106" height="62" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="1.6"/>
          <text x="507" y="138" text-anchor="middle" font-size="10" font-weight="800" fill="#1d4ed8">上半分（時計回り）</text>
          <text x="507" y="158" text-anchor="middle" font-size="9.5" font-weight="700" fill="#1e40af">わずかに青シフト</text>

          <rect x="574" y="116" width="106" height="62" rx="8" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.6"/>
          <text x="627" y="138" text-anchor="middle" font-size="10" font-weight="800" fill="#a16207">下半分（反時計）</text>
          <text x="627" y="158" text-anchor="middle" font-size="9.5" font-weight="700" fill="#854d0e">わずかに黄シフト</text>

          <line x1="507" y1="180" x2="556" y2="214" stroke="#2563eb" stroke-width="2" marker-end="url(#d115-arrBlue)"/>
          <line x1="627" y1="180" x2="578" y2="214" stroke="#d97706" stroke-width="2" marker-end="url(#d115-arrAmber)"/>

          <rect x="466" y="218" width="202" height="54" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
          <text x="567" y="241" text-anchor="middle" font-size="11.5" font-weight="900" fill="#065f46">光学平均で色ズレ完全相殺！</text>
          <text x="567" y="260" text-anchor="middle" font-size="9.5" font-weight="700" fill="#047857">色変化 Δu'v' を1/2〜1/4へ低減</text>

          ${drawStatusPill(452, 294, 228, '178°どの角度でも正確な肌色・白点', true)}
        `,
        cards: [
          { label: 'シェブロン形状とは', line1: 'サブ画素内のITOスリットを中央で', line2: '±10°の「くの字」に折り返した構造' },
          { label: '色ズレ相殺の原理', line1: '上下ドメインで液晶分子が逆向き回転し', line2: '斜め視角の青変と黄変を互いに相殺' },
          { label: '撮影現場のメリット', line1: 'ハイ/ローアングルや複数人での確認でも', line2: 'ポートレート肌色やWBが転ばない' },
        ],
      });

    // -------------------------------------------------------------------------
    // D116: Fluorinated Negative-Δε Nematic LC & Chiral Dopant
    // -------------------------------------------------------------------------
    case 'lcd_neg_nematic_lc':
      return wrapLcdHdSvg({
        badge: 'D116',
        title: '負誘電率異方性（Δε &lt; 0）フッ素系ネマティック液晶＆キラル剤',
        analogy: 'フッ素の耳で分子が「真っ平らに回転」し、明るく速く夏も溶けない液晶',
        accent: '#14b8a6',
        accentSoft: '#f0fdfa',
        body: `
          ${drawPanelBox(24, 80, 326, 254, '分子構造：側方ジフルオロ（-F, -F）負型液晶', '#0d9488', '#ffffff')}
          <!-- Molecular rod with lateral -F, -F dipole arrows -->
          <g transform="translate(186, 174)">
            <!-- Rod backbone (cyclohexane + difluorobenzene rings) -->
            <rect x="-110" y="-16" width="220" height="32" rx="16" fill="#ccfbf1" stroke="#0d9488" stroke-width="2.2"/>
            <polygon points="-64,-12 -46,-12 -38,0 -46,12 -64,12 -72,0" fill="#0d9488" opacity="0.22" stroke="#0f766e" stroke-width="1.6"/>
            <polygon points="-14,-12 4,-12 12,0 4,12 -14,12 -22,0" fill="#0d9488" opacity="0.22" stroke="#0f766e" stroke-width="1.6"/>
            <polygon points="36,-12 54,-12 62,0 54,12 36,12 28,0" fill="#14b8a6" opacity="0.35" stroke="#0f766e" stroke-width="1.8"/>
            <!-- Lateral F atoms creating transverse dipole (Δε = -3.74) -->
            <line x1="40" y1="-12" x2="40" y2="-36" stroke="#e11d48" stroke-width="2.2"/>
            <circle cx="40" cy="-42" r="11" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.8"/>
            <text x="40" y="-38.5" text-anchor="middle" font-size="10.5" font-weight="900" fill="#be123c">F</text>
            <line x1="56" y1="-12" x2="56" y2="-36" stroke="#e11d48" stroke-width="2.2"/>
            <circle cx="56" cy="-42" r="11" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.8"/>
            <text x="56" y="-38.5" text-anchor="middle" font-size="10.5" font-weight="900" fill="#be123c">F</text>
            <text x="48" y="-60" text-anchor="middle" font-size="9.2" font-weight="800" fill="#be123c">横向き双極子（Δε = −3.74）</text>
            <text x="0" y="38" text-anchor="middle" font-size="9.8" font-weight="800" fill="#115e59">電界に対し分子長軸が常に水平維持 → 透過率 +5.5%</text>
          </g>
          ${drawStatusPill(44, 294, 286, '高透明点 T_NI ≈ 93℃（真夏の炎天下黒変防止）', true)}

          ${drawPanelBox(366, 80, 330, 254, '正型（Δε &gt; 0）vs 負型（Δε &lt; 0）FFS挙動比較', '#0284c7', '#f8fafc')}
          <!-- Positive LC tilts up over electrode (light loss) -->
          <rect x="384" y="114" width="294" height="72" rx="8" fill="#fff1f2" stroke="#fda4af"/>
          <text x="396" y="132" font-size="9.8" font-weight="800" fill="#be123c">従来 正型液晶 (Δε &gt; 0)：電極上で斜めに立ち上がる</text>
          <g fill="#f43f5e">
            <rect x="424" y="146" width="24" height="7" rx="3.5" transform="rotate(-38 436 150)"/>
            <rect x="494" y="146" width="24" height="7" rx="3.5" transform="rotate(-48 506 150)"/>
            <rect x="564" y="146" width="24" height="7" rx="3.5" transform="rotate(-38 576 150)"/>
          </g>
          <text x="640" y="160" text-anchor="middle" font-size="9.2" font-weight="800" fill="#be123c">光ロスあり</text>

          <!-- Negative LC stays flat in-plane -->
          <rect x="384" y="196" width="294" height="82" rx="8" fill="#ecfdf5" stroke="#34d399" stroke-width="1.6"/>
          <text x="396" y="214" font-size="9.8" font-weight="800" fill="#065f46">最新 負型液晶 (Δε &lt; 0)：基板平行のまま水平回転！</text>
          <g fill="#0d9488">
            <rect x="420" y="234" width="28" height="8" rx="4"/>
            <rect x="490" y="234" width="28" height="8" rx="4"/>
            <rect x="560" y="234" width="28" height="8" rx="4"/>
          </g>
          <text x="530" y="264" text-anchor="middle" font-size="9.5" font-weight="800" fill="#047857">応答 τ_d ≈ 9.5 ms / フリッカー −17.6→−47.0 改善</text>
          ${drawStatusPill(386, 294, 290, '透過率 +3.1–5.5% ＆ 低イオン高VHR長寿命', true)}
        `,
        cards: [
          { label: 'なぜ負型(Δε&lt;0)？', line1: '電極直上でも液晶分子が縦に立たず', line2: '完全水平回転して光の損失を最小化' },
          { label: '夏も冬も強い化学設計', line1: '透明点 T_NI 85〜95℃で炎天下黒変を防ぎ', line2: '低回転粘度 γ₁ 配合で常温9.5ms応答' },
          { label: '画質・省電力効果', line1: '同バックライトで画面が+5%明るく', line2: '低イオン精製で焼付き・フリッカー極減' },
        ],
      });

    // -------------------------------------------------------------------------
    // D117: Anti-Newton-Ring (ANR) Micro-Spacer Silica Bead Coat
    // -------------------------------------------------------------------------
    case 'lcd_anti_newton_spacer':
      return wrapLcdHdSvg({
        badge: 'D117',
        title: 'アンチニュートンリング（ANR）微細シリカビーズ干渉縞防止コート',
        analogy: '目に見えない透明ビーズで極小の凹凸を作り「油膜のような虹色リング」を消す',
        accent: '#38bdf8',
        accentSoft: '#f0f9ff',
        body: `
          ${drawPanelBox(24, 80, 326, 254, '❌ 平滑面密着（ニュートンリング虹色干渉）', '#e11d48', '#fff1f2')}
          <!-- Concentric rainbow interference rings -->
          <g transform="translate(186, 190)">
            <ellipse cx="0" cy="0" rx="92" ry="52" fill="none" stroke="#ef4444" stroke-width="4" opacity="0.7"/>
            <ellipse cx="0" cy="0" rx="74" ry="41" fill="none" stroke="#f59e0b" stroke-width="4" opacity="0.75"/>
            <ellipse cx="0" cy="0" rx="56" ry="31" fill="none" stroke="#22c55e" stroke-width="4" opacity="0.75"/>
            <ellipse cx="0" cy="0" rx="38" ry="21" fill="none" stroke="#3b82f6" stroke-width="4" opacity="0.75"/>
            <ellipse cx="0" cy="0" rx="20" ry="11" fill="none" stroke="#8b5cf6" stroke-width="4" opacity="0.8"/>
            <text x="0" y="72" text-anchor="middle" font-size="9.6" font-weight="800" fill="#be123c">2·n·t = m·λ の光干渉で虹色ムラ出現！</text>
          </g>
          ${drawStatusPill(44, 294, 286, 'ガラスとフィルムが密着し画面に虹色同心円', false)}

          ${drawPanelBox(366, 80, 330, 254, '✅ ANR微細シリカビーズ分散コート断面', '#0284c7', '#ffffff')}
          <!-- Upper film + ANR resin layer with embedded silica micro-beads + lower glass -->
          <rect x="386" y="128" width="290" height="28" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
          <text x="531" y="146" text-anchor="middle" font-size="10" font-weight="800" fill="#075985">上部光学フィルム／保護ガラス</text>
          <!-- UV Resin binder with dispersed 1-3um silica beads -->
          <rect x="386" y="156" width="290" height="32" fill="#f0f9ff" stroke="#38bdf8"/>
          <g fill="#ffffff" stroke="#0284c7" stroke-width="1.6">
            <circle cx="412" cy="184" r="7"/><circle cx="458" cy="182" r="6"/>
            <circle cx="508" cy="185" r="7.5"/><circle cx="560" cy="183" r="6.5"/>
            <circle cx="608" cy="184" r="7"/><circle cx="652" cy="182" r="6"/>
          </g>
          <rect x="386" y="194" width="290" height="28" rx="4" fill="url(#d117-glass)" stroke="#0284c7" stroke-width="1.5"/>
          <text x="531" y="212" text-anchor="middle" font-size="10" font-weight="800" fill="#0c4a6e">下部ITO基板／光学シート</text>
          ${drawCallout(508, 185, 396, 254, 1, '1–3 μm 球状シリカ微粒子', '空間コヒーレンスを崩し干渉条件を破壊', '#0284c7')}
          ${drawStatusPill(386, 294, 290, 'ヘイズ &lt; 2% で鮮鋭度維持＋ニュートンリングゼロ', true)}
        `,
        cards: [
          { label: '虹色リングの正体', line1: '平坦面同士が光の波長級の隙間で', line2: '接近すると反射光が干渉し虹色縞に' },
          { label: '微細ビーズの技', line1: '1–3 μmシリカ粒子が点接触スペーサとなり', line2: '可干渉な極薄空気層を物理的に解消' },
          { label: 'ピント鮮鋭度も死守', line1: '曇り度（ヘイズ）を1–2%未満に制御し', line2: 'MFピント拡大の微細ディテールを損なわない' },
        ],
      });

    // -------------------------------------------------------------------------
    // D118: COG Glass-Ledge UV Silicone Anti-Corrosion Encapsulation ("Tuffy")
    // -------------------------------------------------------------------------
    case 'lcd_cog_tuffy_resin':
      return wrapLcdHdSvg({
        badge: 'D118',
        title: 'COGガラス張り出し部 UVシリコーン防湿封止（Tuffy耐腐食ビード）',
        analogy: 'むき出しの極細配線を1滴の結露腐食から守る「超高純度防水シリコーン鎧」',
        accent: '#f59e0b',
        accentSoft: '#fffbeb',
        body: `
          ${drawPanelBox(24, 80, 412, 254, 'TFT単板ガラス3mm張り出し部（COG）断面解剖', '#d97706', '#ffffff')}
          <!-- TFT glass ledge -->
          <rect x="42" y="226" width="376" height="30" rx="4" fill="url(#d118-glass)" stroke="#0284c7" stroke-width="1.5"/>
          <text x="230" y="245" text-anchor="middle" font-size="10" font-weight="800" fill="#0c4a6e">TFTアレイ下ガラス基板（CFガラスより約3mm突出）</text>
          <!-- CF Glass on left -->
          <rect x="42" y="176" width="126" height="38" rx="4" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
          <text x="105" y="199" text-anchor="middle" font-size="9.6" font-weight="800" fill="#1e293b">CF上ガラス側</text>
          <!-- Exposed ITO fan-out trace line -->
          <rect x="168" y="218" width="234" height="8" fill="#eab308"/>
          <!-- Bare DDIC chip -->
          <rect x="232" y="184" width="94" height="32" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="1.6"/>
          <text x="279" y="204" text-anchor="middle" font-size="9.5" font-weight="800" fill="#f8fafc">COG DDICダイ</text>
          <!-- FPC on right -->
          <rect x="352" y="206" width="66" height="12" rx="2" fill="url(#d118-kapton)" stroke="#b45309"/>
          <!-- Tuffy UV silicone dome beads covering BOTH gaps -->
          <path d="M 168 218 Q 200 162 232 192 L 232 218 Z" fill="#fde68a" fill-opacity="0.88" stroke="#d97706" stroke-width="2"/>
          <path d="M 326 192 Q 344 168 364 206 L 364 218 L 326 218 Z" fill="#fde68a" fill-opacity="0.88" stroke="#d97706" stroke-width="2"/>
          ${drawRaindrop(196, 134, 1.1)}
          ${drawRaindrop(344, 144, 1.0)}
          <text x="270" y="130" text-anchor="middle" font-size="10" font-weight="900" fill="#0284c7">結露・湿気を完全ブロック！</text>
          ${drawCallout(200, 198, 56, 134, 1, 'Tuffy UVシリコーン封止', 'Na⁺/Cl⁻ &lt; 10ppm 超高純度', '#d97706')}
          ${drawStatusPill(42, 294, 376, '85℃/85%RHでも絶縁 &gt; 10¹² Ω → 電食縦線を根絶', true)}

          ${drawPanelBox(452, 80, 244, 254, '防湿封止がない場合の「電食」故障', '#e11d48', '#fff1f2')}
          <rect x="470" y="118" width="208" height="74" rx="8" fill="#ffffff" stroke="#fda4af"/>
          <line x1="490" y1="138" x2="658" y2="138" stroke="#eab308" stroke-width="4"/>
          <line x1="490" y1="172" x2="658" y2="172" stroke="#eab308" stroke-width="4"/>
          <text x="574" y="159" text-anchor="middle" font-size="9.5" font-weight="800" fill="#e11d48">⚡ 10V電位差 × 結露水 ＝ 陽極酸化溶断!</text>
          <text x="574" y="216" text-anchor="middle" font-size="10" font-weight="800" fill="#9f1239">わずか数時間で画面に</text>
          <text x="574" y="234" text-anchor="middle" font-size="10" font-weight="800" fill="#9f1239">致命的な「縦スジ線」発生</text>
          <rect x="474" y="252" width="200" height="32" rx="6" fill="#ecfdf5" stroke="#10b981"/>
          <text x="574" y="272" text-anchor="middle" font-size="9.6" font-weight="800" fill="#065f46">弾性ゴム状で熱衝撃割れも吸収</text>
          ${drawStatusPill(466, 294, 216, '雨天・雪山ロケの生命線ビード', true)}
        `,
        cards: [
          { label: 'COG張り出しの弱点', line1: 'ソース配線が十数μm間隔でむき出しになり', line2: 'わずかな結露で電食断線しやすい' },
          { label: 'Tuffy封止の条件', line1: '不純物イオン&lt;10ppmのUV硬化シリコーンで', line2: '隙間ゼロに覆い10¹²Ω超の絶縁を維持' },
          { label: '過酷ロケの信頼性', line1: '−20℃〜+70℃の寒暖差結露や雨天撮影でも', line2: '縦線欠陥ゼロの長期耐久を実現' },
        ],
      });

    // -------------------------------------------------------------------------
    // D119: Active-Matrix Perimeter Dummy Pixel Guard Ring
    // -------------------------------------------------------------------------
    case 'lcd_dummy_pixel_ring':
      return wrapLcdHdSvg({
        badge: 'D119',
        title: 'パネル外周ダミー画素ガードリング（非表示4〜8列・画質均一化帯）',
        analogy: '食パンの「耳」のように外周4〜8列をダミーにして端1pxまで中央と同画質化',
        accent: '#64748b',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(24, 80, 396, 254, 'パネル角部拡大マップ：シール剤〜ダミー画素帯〜有効画素', '#475569', '#ffffff')}
          <!-- Outer ODF Seal -->
          <rect x="44" y="114" width="356" height="172" rx="8" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
          <text x="222" y="130" text-anchor="middle" font-size="9.2" font-weight="800" fill="#334155">ODF周辺メインシール剤（端面不純物・セル厚段差領域）</text>
          <!-- Dummy pixel guard ring (BM hidden) -->
          <rect x="64" y="138" width="316" height="132" rx="5" fill="#1e293b" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 3"/>
          <text x="222" y="154" text-anchor="middle" font-size="9.6" font-weight="800" fill="#fde047">非表示ダミー画素ガードリング（全周 4〜8行/列・BM下隠蔽）</text>
          <!-- Active display area -->
          <rect x="94" y="164" width="256" height="88" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
          <text x="222" y="202" text-anchor="middle" font-size="12" font-weight="900" fill="#ffffff">有効表示エリア（3.2型 210万ドット）</text>
          <text x="222" y="224" text-anchor="middle" font-size="9.6" font-weight="700" fill="#e0f2fe">端の1列目から中央まで電界・セル厚 100%均一！</text>
          ${drawStatusPill(44, 294, 356, 'セルギャップ誤差 Δd &lt; ±0.03 μm（フレームMura撲滅）', true)}

          ${drawPanelBox(436, 80, 260, 254, '3つの境界乱れをダミー帯で全吸収', '#0284c7', '#f8fafc')}
          <rect x="454" y="116" width="224" height="48" rx="7" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="466" y="136" font-size="10.2" font-weight="800" fill="#0f172a">① セル厚（ギャップ）遷移吸収</text>
          <text x="466" y="153" font-size="9.2" font-weight="600" fill="#475569">シール際の微小段差を有効画面外へ逃がす</text>

          <rect x="454" y="174" width="224" height="48" rx="7" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="466" y="194" font-size="10.2" font-weight="800" fill="#0f172a">② 寄生容量・電界フリンジ対称化</text>
          <text x="466" y="211" font-size="9.2" font-weight="600" fill="#475569">1列目の画素が隣と全く同じ電気環境になる</text>

          <rect x="454" y="232" width="224" height="48" rx="7" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="466" y="252" font-size="10.2" font-weight="800" fill="#0f172a">③ 微量シール溶出イオン捕獲</text>
          <text x="466" y="269" font-size="9.2" font-weight="600" fill="#475569">VCOM定電位ダミーがイオンを吸着保護</text>
          ${drawStatusPill(452, 294, 228, '画面四隅UI・ヒストグラムも色ムラゼロ', true)}
        `,
        cards: [
          { label: 'なぜダミー画素が必要？', line1: '画面端の1列目はすぐ外がシール剤で', line2: '液晶の厚みと電界が乱れやすいため' },
          { label: 'ブラックマトリクス下', line1: '4〜8列のダミー画素を黒枠の下に隠し', line2: '境界の乱れをすべてダミー側で吸収' },
          { label: '撮影UIでのメリット', line1: '四隅の露出ゲージやヒストグラム際でも', line2: '額縁状の白浮き（フレームMura）が皆無' },
        ],
      });

    // -------------------------------------------------------------------------
    // D120: Fab Redundant Laser-Repair Bus Ring & ESD Shorting Bar
    // -------------------------------------------------------------------------
    case 'lcd_laser_repair_ring':
      return wrapLcdHdSvg({
        badge: 'D120',
        title: '工場歩留まり救済 レーザーリペア冗長バスリング＆ESD短絡バー',
        analogy: '断線した配線を「外周バイパス高速道路」へ顕微鏡レーザーで迂回接続して救済！',
        accent: '#ef4444',
        accentSoft: '#fef2f2',
        body: `
          ${drawPanelBox(24, 80, 412, 254, 'データ線断線を救う 532nmレーザー溶着バイパス迂回', '#ef4444', '#ffffff')}
          <!-- Active matrix box -->
          <rect x="68" y="136" width="324" height="122" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.6"/>
          <!-- Redundant repair ring surrounding active area -->
          <rect x="46" y="116" width="368" height="162" rx="10" fill="none" stroke="#eab308" stroke-width="4"/>
          <text x="230" y="110" text-anchor="middle" font-size="9.6" font-weight="900" fill="#a16207">外周 レーザーリペア冗長バスリング（Mo/Al/Mo）</text>
          <!-- Normal data lines -->
          <g stroke="#64748b" stroke-width="1.4">
            <line x1="112" y1="136" x2="112" y2="258"/><line x1="156" y1="136" x2="156" y2="258"/>
            <line x1="286" y1="136" x2="286" y2="258"/><line x1="336" y1="136" x2="336" y2="258"/>
          </g>
          <!-- Broken data line at x=220 -->
          <line x1="220" y1="116" x2="220" y2="188" stroke="#ef4444" stroke-width="2.8"/>
          <line x1="220" y1="208" x2="220" y2="278" stroke="#ef4444" stroke-width="2.8"/>
          <text x="220" y="202" text-anchor="middle" font-size="11" font-weight="900" fill="#dc2626">✕ 断線</text>
          <!-- Laser weld points at top and bottom crossings -->
          <circle cx="220" cy="116" r="7" fill="#22c55e" stroke="#ffffff" stroke-width="2"/>
          <circle cx="220" cy="278" r="7" fill="#22c55e" stroke="#ffffff" stroke-width="2"/>
          <!-- Detour arrows around right loop -->
          <path d="M 228 116 L 414 116 L 414 278 L 228 278" fill="none" stroke="#16a34a" stroke-width="2.6" stroke-dasharray="6 3" marker-end="url(#d120-arrGreen)"/>
          <text x="342" y="272" text-anchor="middle" font-size="9.2" font-weight="800" fill="#15803d">下端から迂回給電で完全復旧!</text>
          ${drawStatusPill(44, 294, 372, '532nmレーザー溶着でライン欠陥の 90–95%以上を良品救済', true)}

          ${drawPanelBox(452, 80, 244, 254, '355nm暗点修復＆ESD短絡バー', '#7c3aed', '#f8fafc')}
          <rect x="468" y="116" width="212" height="72" rx="8" fill="#ffffff" stroke="#ddd6fe"/>
          <text x="480" y="136" font-size="10.2" font-weight="800" fill="#5b21b6">① 355nm UVレーザー切断</text>
          <text x="480" y="154" font-size="9.2" font-weight="600" fill="#334155">常時点灯する「輝点」TFTを切断し</text>
          <text x="480" y="170" font-size="9.2" font-weight="600" fill="#334155">目立たない暗点へ精密修復</text>

          <rect x="468" y="198" width="212" height="76" rx="8" fill="#ffffff" stroke="#bae6fd"/>
          <text x="480" y="218" font-size="10.2" font-weight="800" fill="#0369a1">② 製造中 ESD短絡バー</text>
          <text x="480" y="236" font-size="9.2" font-weight="600" fill="#334155">数kVの工場静電気から全配線を</text>
          <text x="480" y="252" font-size="9.2" font-weight="600" fill="#334155">等電位保護→分断時に切り離し</text>
          ${drawStatusPill(466, 294, 216, 'αフラッグシップ「無輝点」品質の要', true)}
        `,
        cards: [
          { label: '外周バイパスリング', line1: '2,880本中1本が断線しても外周リングへ', line2: '532nmレーザー溶着して反対側から給電' },
          { label: '輝点ゼロへの執念', line1: '355nm UVレーザーで不良TFTを精密切断', line2: '画面に目立つ常時点灯ドットを撲滅' },
          { label: 'ESD短絡バー', line1: '工程中の静電気からゲート絶縁膜を守り', line2: 'ガラス分断工程で綺麗に切り離す' },
        ],
      });

    // -------------------------------------------------------------------------
    // D121: Side-View 0.4 mm White LED Package Internal Anatomy
    // -------------------------------------------------------------------------
    case 'lcd_side_led_anatomy':
      return wrapLcdHdSvg({
        badge: 'D121',
        title: '0.4 mm超薄サイドビュー白色LED内部解剖（InGaNダイ/金線/EMC/Cuリード）',
        analogy: '名刺2枚分の薄さの中に「青い宝石チップ＋純金線＋白い反射お椀」を封入',
        accent: '#f59e0b',
        accentSoft: '#fffbeb',
        body: `
          ${drawPanelBox(24, 80, 444, 254, '3806型（3.8 × 0.6 × 0.4 mm）サイドビューLED 内部断面拡大', '#d97706', '#ffffff')}
          <!-- Silver-plated Cu leadframe left/right -->
          <rect x="42" y="218" width="90" height="26" rx="3" fill="url(#d121-steel)" stroke="#64748b" stroke-width="1.6"/>
          <text x="87" y="235" text-anchor="middle" font-size="9.2" font-weight="800" fill="#1e293b">Anode Cuリード</text>
          <rect x="358" y="218" width="90" height="26" rx="3" fill="url(#d121-steel)" stroke="#64748b" stroke-width="1.6"/>
          <text x="403" y="235" text-anchor="middle" font-size="9.2" font-weight="800" fill="#1e293b">Cathode Cuリード</text>

          <!-- White EMC reflector cup (high reflectivity >95%) -->
          <path d="M 102 248 L 102 146 L 146 146 L 166 214 L 324 214 L 344 146 L 388 146 L 388 248 Z" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
          <!-- Phosphor silicone cavity fill -->
          <polygon points="148,154 342,154 324,214 166,214" fill="#fde047" fill-opacity="0.72" stroke="#eab308" stroke-width="1.6"/>
          <!-- Red KSF + green β-SiAlON phosphor speckles -->
          <g>
            <circle cx="182" cy="176" r="3.2" fill="#e11d48"/><circle cx="218" cy="168" r="3.0" fill="#16a34a"/>
            <circle cx="246" cy="182" r="3.4" fill="#e11d48"/><circle cx="276" cy="170" r="3.2" fill="#16a34a"/>
            <circle cx="308" cy="178" r="3.2" fill="#e11d48"/><circle cx="198" cy="194" r="3.0" fill="#16a34a"/>
          </g>
          <!-- Dual Blue 450nm InGaN Chips -->
          <rect x="192" y="196" width="36" height="18" rx="2" fill="#2563eb" stroke="#1e3a8a" stroke-width="1.5"/>
          <rect x="262" y="196" width="36" height="18" rx="2" fill="#2563eb" stroke="#1e3a8a" stroke-width="1.5"/>
          <!-- Gold 20um wirebond loops -->
          <path d="M 148 220 Q 168 168 202 196" fill="none" stroke="#eab308" stroke-width="2.2"/>
          <path d="M 224 196 Q 245 170 266 196" fill="none" stroke="#eab308" stroke-width="2.2"/>
          <path d="M 294 196 Q 320 168 342 220" fill="none" stroke="#eab308" stroke-width="2.2"/>

          <!-- Outgoing white light arrows toward LGP edge -->
          <line x1="210" y1="150" x2="188" y2="112" stroke="#0284c7" stroke-width="2.4" marker-end="url(#d121-arrBlue)"/>
          <line x1="245" y1="150" x2="245" y2="110" stroke="#0284c7" stroke-width="2.8" marker-end="url(#d121-arrBlue)"/>
          <line x1="280" y1="150" x2="302" y2="112" stroke="#0284c7" stroke-width="2.4" marker-end="url(#d121-arrBlue)"/>

          ${drawCallout(210, 205, 58, 128, 1, '450nm InGaN青ダイ', '2チップ直列高輝度', '#2563eb')}
          ${drawCallout(346, 178, 356, 126, 2, '白色EMC反射カップ', '反射率&gt;95%・耐黄変', '#475569')}
          ${drawStatusPill(44, 294, 404, '20μm純金線 ＋ β-SiAlON(緑) / KSF(赤) でDCI-P3純白発光', true)}

          ${drawPanelBox(484, 80, 212, 254, 'RGB 3波長スペクトル', '#0284c7', '#f8fafc')}
          <line x1="502" y1="232" x2="678" y2="232" stroke="#475569" stroke-width="1.4"/>
          <!-- Narrow Blue 450nm, Green 535nm, Narrow Red KSF 630nm -->
          <path d="M 508 232 Q 524 232 532 132 Q 540 232 554 232" fill="#3b82f6" fill-opacity="0.35" stroke="#2563eb" stroke-width="2.4"/>
          <path d="M 556 232 Q 576 232 588 158 Q 604 232 622 232" fill="#22c55e" fill-opacity="0.35" stroke="#16a34a" stroke-width="2.4"/>
          <path d="M 626 232 Q 638 232 646 124 Q 654 232 668 232" fill="#ef4444" fill-opacity="0.38" stroke="#e11d48" stroke-width="2.4"/>
          <text x="532" y="248" text-anchor="middle" font-size="8.8" font-weight="800" fill="#1d4ed8">450nm</text>
          <text x="588" y="248" text-anchor="middle" font-size="8.8" font-weight="800" fill="#15803d">535nm</text>
          <text x="646" y="248" text-anchor="middle" font-size="8.8" font-weight="800" fill="#be123c">630nm</text>
          <text x="590" y="272" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">鋭い赤KSFピークで色純度UP</text>
          ${drawStatusPill(498, 294, 184, '厚み0.4mm・指向角120°', true)}
        `,
        cards: [
          { label: '0.4mm極薄構造', line1: '白色EMC高反射お椀の中に450nm青ダイと', line2: '20μm純金ワイヤを収めた精密パッケージ' },
          { label: '耐黄変＆高放熱', line1: '銀メッキ銅リードが熱の90%をMCPCBへ逃がし', line2: 'EMC樹脂で炎天下の色温度ズレを抑制' },
          { label: '広色域スペクトル', line1: 'β-SiAlON緑＋KSF狭帯域赤(630nm)蛍光体で', line2: 'DCI-P3広色域の鮮やかな赤・緑を再現' },
        ],
      });

    // -------------------------------------------------------------------------
    // D122: LGP Bottom-Face Non-Uniform Laser Micro-Dot Gradient Pattern
    // -------------------------------------------------------------------------
    case 'lcd_lgp_dot_gradient':
      return wrapLcdHdSvg({
        badge: 'D122',
        title: '導光板底面 レーザー微細ドット密度勾配パターン（疎 → 密 均光設計）',
        analogy: 'LEDの近くは小ドット疎ら、遠くの上端はデカドット密に彫って全面同じ明るさに！',
        accent: '#0284c7',
        accentSoft: '#f0f9ff',
        body: `
          ${drawPanelBox(24, 80, 424, 254, 'PMMA導光板（n=1.49）側面断面：全反射伝播と疎→密ドット抽出', '#0284c7', '#ffffff')}
          <!-- Side-view LED on left -->
          <rect x="40" y="168" width="24" height="44" rx="4" fill="#fde047" stroke="#ca8a04" stroke-width="1.8"/>
          <text x="52" y="194" text-anchor="middle" font-size="9" font-weight="900" fill="#713f12">LED</text>
          <!-- PMMA LGP slab -->
          <rect x="68" y="166" width="360" height="48" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>
          <!-- Total internal reflection zig-zag ray inside LGP -->
          <polyline points="68,188 122,168 176,210 238,168 298,210 362,168 410,210" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 2"/>
          <!-- Bottom laser micro-dots growing from sparse/tiny on left to dense/large on right -->
          <g fill="#0369a1">
            <circle cx="96" cy="214" r="2.2"/><circle cx="136" cy="214" r="2.8"/>
            <circle cx="176" cy="214" r="3.4"/><circle cx="210" cy="214" r="3.8"/>
            <circle cx="242" cy="214" r="4.2"/><circle cx="272" cy="214" r="4.6"/>
            <circle cx="298" cy="214" r="5.0"/><circle cx="322" cy="214" r="5.3"/>
            <circle cx="344" cy="214" r="5.6"/><circle cx="366" cy="214" r="5.8"/>
            <circle cx="388" cy="214" r="6.0"/><circle cx="410" cy="214" r="6.2"/>
          </g>
          <!-- Uniform upward extracted light arrows! -->
          ${[108, 162, 216, 270, 324, 378]
            .map(
              (x) =>
                `<line x1="${x}" y1="164" x2="${x}" y2="122" stroke="#0284c7" stroke-width="2.6" marker-end="url(#d122-arrBlue)"/>`
            )
            .join('')}
          <text x="248" y="114" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0369a1">正面出射輝度が端から端まで均一！（9点均一性 88–92%）</text>
          <text x="112" y="238" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0369a1">入光側：疎（5–10%）</text>
          <text x="372" y="238" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0369a1">遠端側：密（50–70%）</text>
          <line x1="160" y1="234" x2="318" y2="234" stroke="#0284c7" stroke-width="1.8" marker-end="url(#d122-arrBlue)"/>
          ${drawStatusPill(44, 294, 384, '全反射臨界角 θ_c = 42.1° を微細ドット密度勾配で精密制御', true)}

          ${drawPanelBox(464, 80, 232, 254, '輝度分布：均等化カーブ', '#059669', '#f8fafc')}
          <line x1="484" y1="224" x2="678" y2="224" stroke="#475569" stroke-width="1.4"/>
          <line x1="484" y1="124" x2="484" y2="224" stroke="#475569" stroke-width="1.4"/>
          <!-- Uniform dot decay curve vs density curve -->
          <path d="M 488 134 Q 560 176 672 212" fill="none" stroke="#e11d48" stroke-width="2" stroke-dasharray="4 3"/>
          <text x="536" y="198" font-size="8.8" font-weight="800" fill="#be123c">内部光束（減衰）</text>
          <path d="M 488 214 Q 586 196 672 134" fill="none" stroke="#0284c7" stroke-width="2.2"/>
          <text x="614" y="190" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">ドット密度（増加）</text>
          <line x1="488" y1="146" x2="672" y2="146" stroke="#059669" stroke-width="3.2"/>
          <text x="582" y="138" text-anchor="middle" font-size="9.6" font-weight="900" fill="#065f46">積 ＝ 画面輝度フラット！</text>
          <text x="580" y="248" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">ドット径 20〜120 μm レーザー加工</text>
          ${drawStatusPill(478, 294, 204, '画面上下の露出誤認を防止', true)}
        `,
        cards: [
          { label: 'なぜ疎→密にする？', line1: 'LEDから離れるほど導光板内の光が減衰', line2: '遠端ほどドットを密にして出力を均一化' },
          { label: '全反射(TIR)の破断', line1: '通常は内部で反射し続ける光をドット面で', line2: '臨界角42.1°未満に曲げて正面へ抽出' },
          { label: 'カメラ画質の要', line1: '3.2型全面で88〜92%の輝度均一性', line2: '空と地面の露出判断が画面位置で狂わない' },
        ],
      });

    // -------------------------------------------------------------------------
    // D123: LGP Top-Face Matte Micro-Texture & BLU Anti-Static ESD Coat
    // -------------------------------------------------------------------------
    case 'lcd_lgp_matte_esd':
      return wrapLcdHdSvg({
        badge: 'D123',
        title: '導光板上面ブラスト微細マット処理＆BLU帯電防止（ESD）防塵コート',
        analogy: 'シート同士の「水濡れ張り付き」と「静電気ホコリ黒点」をWブロック！',
        accent: '#64748b',
        accentSoft: '#f8fafc',
        body: `
          ${drawPanelBox(24, 80, 326, 254, '① 微細マット凹凸でウェットアウト（張り付き）防止', '#0284c7', '#ffffff')}
          <rect x="44" y="126" width="286" height="32" rx="4" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/>
          <text x="187" y="146" text-anchor="middle" font-size="10" font-weight="800" fill="#1e293b">下拡散シート（D39：PET樹脂）</text>
          <!-- Micro-textured matte peaks on top of LGP -->
          <path d="M 44 176 L 62 162 L 80 176 L 98 162 L 116 176 L 134 162 L 152 176 L 170 162 L 188 176 L 206 162 L 224 176 L 242 162 L 260 176 L 278 162 L 296 176 L 314 162 L 330 176 L 330 220 L 44 220 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>
          <text x="187" y="204" text-anchor="middle" font-size="10" font-weight="800" fill="#075985">導光板上面 パウダーブラスト微細マット層</text>
          ${drawCallout(134, 162, 58, 256, 1, '点接触エアギャップ維持', '衝撃や高温でも密着シミ（濡れムラ）ゼロ', '#0284c7')}
          ${drawStatusPill(44, 294, 286, '透過損失 &lt; 0.5% でシート張り付きを根絶', true)}

          ${drawPanelBox(366, 80, 330, 254, '② BLU帯電防止（ESD）コートでミクロゴミ遮断', '#059669', '#f8fafc')}
          <!-- Electrostatic charge draining to GND -->
          <rect x="386" y="156" width="240" height="38" rx="6" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
          <text x="506" y="179" text-anchor="middle" font-size="10.2" font-weight="800" fill="#065f46">ESD帯電防止コート（10⁹–10¹⁰ Ω/□）</text>
          <!-- Static charges flowing safely to chassis GND -->
          <text x="412" y="144" font-size="11" font-weight="900" fill="#f59e0b">⚡ + + +</text>
          <line x1="628" y1="175" x2="664" y2="175" stroke="#059669" stroke-width="2.6" marker-end="url(#d123-arrGreen)"/>
          <g transform="translate(674, 175)">
            <line x1="0" y1="-12" x2="0" y2="6" stroke="#0f172a" stroke-width="2.2"/>
            <line x1="-10" y1="6" x2="10" y2="6" stroke="#0f172a" stroke-width="2.2"/>
            <line x1="-6" y1="11" x2="6" y2="11" stroke="#0f172a" stroke-width="2"/>
            <line x1="-2" y1="16" x2="2" y2="16" stroke="#0f172a" stroke-width="1.8"/>
          </g>
          <!-- Dust particle repelled -->
          <circle cx="492" cy="122" r="5" fill="#64748b"/>
          <path d="M 492 128 Q 510 144 536 118" fill="none" stroke="#e11d48" stroke-width="1.8" marker-end="url(#d123-arrRed)"/>
          <text x="572" y="124" font-size="9.5" font-weight="800" fill="#be123c">10μm繊維ゴミ吸着防止！</text>
          <text x="530" y="226" text-anchor="middle" font-size="9.8" font-weight="800" fill="#047857">静電気減衰時間 τ &lt; 0.1 秒</text>
          <text x="530" y="246" text-anchor="middle" font-size="9.4" font-weight="600" fill="#475569">クリーンルーム組立時の黒点異物不良を激減</text>
          ${drawStatusPill(386, 294, 290, '画面内の永久ホコリ黒点＆静電張り付きを防止', true)}
        `,
        cards: [
          { label: 'ウェットアウト防止', line1: '鏡面シート同士が密着する水たまりムラを', line2: 'LGP上面の微細マット点接触で完全防止' },
          { label: '帯電防止コート', line1: '10⁹〜10¹⁰Ω/□の極薄導電コートで', line2: '摩擦帯電を0.1秒未満でフレームGNDへ逃がす' },
          { label: 'クリーンな白画面', line1: 'バックライト内に10μmゴミが吸い付かず', line2: '真っ白な雪原・青空撮影でも黒点ゼロ' },
        ],
      });

    // -------------------------------------------------------------------------
    // D124: Cell-to-BLU Black Perimeter Light-Blocking Shading Tape
    // -------------------------------------------------------------------------
    case 'lcd_lcm_shading_tape':
      return wrapLcdHdSvg({
        badge: 'D124',
        title: '液晶セル〜BLU間 黒色全周遮光両面テープ（白裏反射＋黒表遮光）',
        analogy: '表は真っ黒で光漏れを止め、裏は真っ白で光を中に跳ね返す「二面遮光シール」',
        accent: '#1e293b',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(24, 80, 424, 254, '液晶セル端面〜BLUモールド枠 境界断面構造', '#1e293b', '#ffffff')}
          <!-- IPS Cell on top -->
          <rect x="64" y="114" width="346" height="36" rx="4" fill="url(#d124-glass)" stroke="#0284c7" stroke-width="1.6"/>
          <text x="237" y="136" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0c4a6e">IPS液晶セル（背面偏光板外周）</text>

          <!-- Dual-face Shading Tape (Black top OD>=4 + White bottom R>=85%) -->
          <rect x="48" y="154" width="134" height="18" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
          <text x="115" y="166.5" text-anchor="middle" font-size="8.8" font-weight="800" fill="#f8fafc">黒色遮光層 (OD≥4.0)</text>
          <rect x="48" y="172" width="134" height="14" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.4"/>
          <text x="115" y="182" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0f172a">白色高反射裏層 (R≥85%)</text>

          <!-- BLU White Mold Frame & LGP -->
          <rect x="48" y="190" width="66" height="68" rx="4" fill="#e2e8f0" stroke="#64748b" stroke-width="1.6"/>
          <text x="81" y="226" text-anchor="middle" font-size="9" font-weight="800" fill="#334155">BLU枠</text>
          <rect x="118" y="206" width="292" height="44" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
          <text x="264" y="232" text-anchor="middle" font-size="10" font-weight="800" fill="#075985">導光板（LGP）＋ プリズムシート群</text>

          <!-- Stray light blocked by black top & bounced back by white bottom -->
          <path d="M 152 204 L 146 188 L 198 204" fill="none" stroke="#f59e0b" stroke-width="2.4" marker-end="url(#d124-arrAmber)"/>
          <text x="282" y="182" text-anchor="middle" font-size="9.6" font-weight="800" fill="#d97706">端の迷光を白裏面が内側へリサイクル反射！</text>
          <!-- Blocked light leak arrow -->
          <line x1="94" y1="152" x2="94" y2="112" stroke="#e11d48" stroke-width="2" stroke-dasharray="3 2"/>
          <text x="94" y="106" text-anchor="middle" font-size="9.2" font-weight="900" fill="#e11d48">✕ ベゼル光漏れ 0.01%未満</text>
          ${drawStatusPill(44, 294, 384, '総厚わずか 0.10 mm で遮光・光リサイクル・防塵の1石3鳥', true)}

          ${drawPanelBox(464, 80, 232, 254, 'テープ有無の夜景画面比較', '#0284c7', '#f8fafc')}
          <rect x="482" y="114" width="196" height="66" rx="6" fill="#0f172a" stroke="#fbbf24" stroke-width="3"/>
          <text x="580" y="144" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fde047">❌ 浮き・欠けあり</text>
          <text x="580" y="162" text-anchor="middle" font-size="8.8" font-weight="700" fill="#fef08a">フチから白い光漏れ発生</text>

          <rect x="482" y="196" width="196" height="66" rx="6" fill="#020617" stroke="#334155" stroke-width="2.4"/>
          <text x="580" y="226" text-anchor="middle" font-size="9.8" font-weight="800" fill="#34d399">✅ 全周遮光テープ完全密閉</text>
          <text x="580" y="244" text-anchor="middle" font-size="8.8" font-weight="700" fill="#a7f3d0">夜景・星空撮影も四辺漆黒</text>
          ${drawStatusPill(478, 294, 204, 'BLU内部へのホコリ侵入も封印', true)}
        `,
        cards: [
          { label: '黒白2層PET構造', line1: '表：OD≥4.0の黒色遮光層（漏れ&lt;0.01%）', line2: '裏：反射率≥85%の白色リサイクル層' },
          { label: 'エッジ光漏れ対策', line1: 'LED至近の下辺や四隅の隙間を全周封印し', line2: '夜景ライブビュー時のフチ白光りを撲滅' },
          { label: '防塵・固定の兼務', line1: 'IPSセルとBLU枠を弾性固定しつつ', line2: 'プリズムシートへの微細ホコリ侵入を遮断' },
        ],
      });

    // -------------------------------------------------------------------------
    // D125: LCM Back Chassis Factory Serial QR & AOI Optical Fiducials
    // -------------------------------------------------------------------------
    case 'lcd_lcm_qr_fiducial':
      return wrapLcdHdSvg({
        badge: 'D125',
        title: 'LCM背面 工場トレーサビリティQR銘板＆AOI光学基準マーク',
        analogy: 'パネル1枚ずつの「マイナンバー（色・ロット紐付け）」＋「ロボットの目の的」',
        accent: '#475569',
        accentSoft: '#f8fafc',
        body: `
          ${drawPanelBox(24, 80, 396, 254, 'LCMステンレス背面シャーシ：QR銘板＆4隅フィデューシャル', '#475569', '#ffffff')}
          <!-- Stainless back chassis outline -->
          <rect x="52" y="116" width="340" height="162" rx="10" fill="url(#d125-steel)" stroke="#475569" stroke-width="2"/>
          <!-- 4 Corner gold AOI optical fiducial bullseyes -->
          ${[
            [74, 138],
            [370, 138],
            [74, 256],
            [370, 256],
          ]
            .map(
              ([fx, fy]) => `
              <circle cx="${fx}" cy="${fy}" r="9" fill="#fef08a" stroke="#b45309" stroke-width="1.6"/>
              <circle cx="${fx}" cy="${fy}" r="4" fill="#d97706"/>
              <line x1="${fx - 12}" y1="${fy}" x2="${fx + 12}" y2="${fy}" stroke="#dc2626" stroke-width="1"/>
              <line x1="${fx}" y1="${fy - 12}" x2="${fx}" y2="${fy + 12}" stroke="#dc2626" stroke-width="1"/>
            `
            )
            .join('')}
          <!-- Factory DataMatrix QR Label in center -->
          <rect x="136" y="144" width="172" height="104" rx="6" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>
          <!-- Mini QR Matrix -->
          <rect x="148" y="156" width="52" height="52" fill="#0f172a"/>
          <rect x="154" y="162" width="12" height="12" fill="#ffffff"/><rect x="172" y="168" width="10" height="10" fill="#ffffff"/>
          <rect x="164" y="182" width="14" height="14" fill="#ffffff"/><rect x="184" y="158" width="10" height="16" fill="#ffffff"/>
          <text x="210" y="170" font-size="9.4" font-weight="900" fill="#0f172a">SONY LCM-32H</text>
          <text x="210" y="186" font-size="8.6" font-weight="700" fill="#334155">LOT: G6-2548B</text>
          <text x="210" y="201" font-size="8.6" font-weight="700" fill="#334155">VCOM: 0x4A</text>
          <text x="222" y="232" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0284c7">SN: 8A4F-9021-D65CAL</text>
          ${drawStatusPill(44, 294, 356, '4点光学基準マークでロボットOCA貼合精度 ±10 μm', true)}

          ${drawPanelBox(436, 80, 260, 254, '工場トレーサビリティ連携フロー', '#0284c7', '#f8fafc')}
          <rect x="454" y="116" width="224" height="44" rx="7" fill="#ffffff" stroke="#0284c7"/>
          <text x="566" y="135" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0369a1">1. マザーガラス座標＆ロット記録</text>
          <text x="566" y="151" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">第6世代大判ガラスの切出し位置まで追跡</text>

          <line x1="566" y1="162" x2="566" y2="178" stroke="#0284c7" stroke-width="2" marker-end="url(#d125-arrBlue)"/>
          <rect x="454" y="180" width="224" height="44" rx="7" fill="#ffffff" stroke="#059669"/>
          <text x="566" y="199" text-anchor="middle" font-size="9.8" font-weight="800" fill="#047857">2. 光学検査データ（D65/γ/VCOM）紐付</text>
          <text x="566" y="215" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">個体別色補正値をメイン基板へ自動転送</text>

          <line x1="566" y1="226" x2="566" y2="242" stroke="#059669" stroke-width="2" marker-end="url(#d125-arrGreen)"/>
          <rect x="454" y="244" width="224" height="40" rx="7" fill="#ecfdf5" stroke="#10b981"/>
          <text x="566" y="268" text-anchor="middle" font-size="9.8" font-weight="900" fill="#065f46">3. サービス修理時も色精度を完全継承</text>
          ${drawStatusPill(452, 294, 228, '全数デジタルID管理・高品質保証', true)}
        `,
        cards: [
          { label: '2DシリアルQR', line1: 'マザーガラス切出し座標・ロット・検査値を', line2: '1枚単位で紐付ける工場データベース鍵' },
          { label: '4隅フィデューシャル', line1: 'AOIカメラと貼合ロボットが認識する', line2: '±10μm精度の金色光学アライメント的' },
          { label: '個体差ゼロの秘密', line1: 'QRと色実測テーブルを自動照合し', line2: 'どの個体でも均一なソニー発色を実現' },
        ],
      });

    // -------------------------------------------------------------------------
    // D126: α1 II Upgraded 4-Axis Hinge Core (A-5069-244-A) & α9 III Mold B Rev.2
    // -------------------------------------------------------------------------
    case 'lcd_a1m2_hinge_rev2':
      return wrapLcdHdSvg({
        badge: 'D126',
        title: 'Sony α1 II 強化4軸ヒンジコア（A-5069-244-A）＆α9 III改訂モールドB',
        analogy: '第1世代4軸をプロ連写機向けに鍛え上げた「第2世代・高剛性無音ナックル」',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(24, 80, 412, 254, 'α1 II (ILCE-1M2) / α9 III (ILCE-9M3) 純正4軸ヒンジコア解剖', '#334155', '#ffffff')}
          <!-- Magnesium forged hinge body -->
          <rect x="64" y="122" width="164" height="148" rx="10" fill="url(#d126-mg)" stroke="#0f172a" stroke-width="2"/>
          <text x="146" y="198" text-anchor="middle" font-size="11" font-weight="900" fill="#f8fafc">A-5069-244-A</text>
          <text x="146" y="216" text-anchor="middle" font-size="9.2" font-weight="700" fill="#cbd5e1">α1 II 強化4軸コア</text>
          <!-- Twin reinforced stainless bosses -->
          <circle cx="226" cy="154" r="24" fill="url(#d126-steel)" stroke="#334155" stroke-width="2"/>
          <circle cx="226" cy="154" r="10" fill="#0f172a"/>
          <circle cx="226" cy="238" r="24" fill="url(#d126-steel)" stroke="#334155" stroke-width="2"/>
          <circle cx="226" cy="238" r="10" fill="#0f172a"/>
          <!-- Rev.2 Mold B low-friction GF liner -->
          <rect x="274" y="128" width="136" height="136" rx="8" fill="#dbeafe" stroke="#0284c7" stroke-width="2"/>
          <text x="342" y="168" text-anchor="middle" font-size="10.2" font-weight="900" fill="#075985">5-036-109-02</text>
          <text x="342" y="188" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0369a1">MA HINGE BACK</text>
          <text x="342" y="204" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0369a1">MOLD B (Rev.2)</text>
          <text x="342" y="232" text-anchor="middle" font-size="8.8" font-weight="700" fill="#1e3a8a">POM-GF 低騒音ライナー</text>
          <line x1="252" y1="196" x2="272" y2="196" stroke="#0284c7" stroke-width="2.2" marker-end="url(#d126-arrBlue)"/>
          ${drawStatusPill(44, 294, 372, '50,000回開閉後も初期トルク85%超維持＆無音動作', true)}

          ${drawPanelBox(452, 80, 244, 254, '第1世代(α7R V) → 第2世代進化点', '#059669', '#f8fafc')}
          <rect x="468" y="116" width="212" height="52" rx="7" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="480" y="136" font-size="9.8" font-weight="800" fill="#0f172a">① ツイン軸受け圧入剛性UP</text>
          <text x="480" y="154" font-size="8.8" font-weight="600" fill="#475569">片手タッチ操作時のたわみ・反動を低減</text>

          <rect x="468" y="176" width="212" height="52" rx="7" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="480" y="196" font-size="9.8" font-weight="800" fill="#0f172a">② 改訂モールドB (5-036-109-02)</text>
          <text x="480" y="214" font-size="8.8" font-weight="600" fill="#475569">金属擦れノイズを抑え動画マイク収録対応</text>

          <rect x="468" y="236" width="212" height="46" rx="7" fill="#ecfdf5" stroke="#10b981"/>
          <text x="574" y="256" text-anchor="middle" font-size="9.6" font-weight="800" fill="#065f46">保持トルク ≥ 自重モーメント 1.6倍</text>
          <text x="574" y="272" text-anchor="middle" font-size="8.8" font-weight="700" fill="#047857">超望遠振り回しでも角度ズレゼロ</text>
          ${drawStatusPill(466, 294, 216, '実在Sony純正フラッグシップ品番', true)}
        `,
        cards: [
          { label: '実在OEM品番', line1: 'α1 II純正 A-5069-244-A ヒンジAssyと', line2: 'α9 III改訂 5-036-109-02 モールドB' },
          { label: '剛性＆静音強化', line1: 'ステンレス軸受けボス圧入剛性を高め', line2: 'POM-GFライナーで展開時の擦れ音を除去' },
          { label: 'プロ過酷現場対応', line1: '5万回開閉耐久＆片手タッチでもグラつかず', line2: 'スポーツ・報道連写の激しい動きに耐える' },
        ],
      });

    // -------------------------------------------------------------------------
    // D127: Sony α9 III / α1 II Rear Cabinet LCD Relay Board & Mount (RS-1029 / RS-1026)
    // -------------------------------------------------------------------------
    case 'lcd_rs1029_rear_board':
      return wrapLcdHdSvg({
        badge: 'D127',
        title: 'Sony α9 III / α1 II 背面キャビネット中継基板＆マウント（RS-1029）',
        analogy: 'メイン基板・背面ボタン・4軸液晶ケーブルを整然と繋ぐ「背面駅の乗り換えハブ」',
        accent: '#10b981',
        accentSoft: '#ecfdf5',
        body: `
          ${drawPanelBox(24, 80, 672, 254, 'ボディ内部 信号＆整備経路：メイン基板 ⇄ RS-1029中継基板 ⇄ 4軸モニター', '#059669', '#ffffff')}
          <!-- Mainboard block -->
          <rect x="44" y="138" width="144" height="114" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
          <text x="116" y="182" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">本体メイン基板</text>
          <text x="116" y="202" text-anchor="middle" font-size="9.4" font-weight="700" fill="#a7f3d0">BIONZ XR / 電源</text>
          <text x="116" y="220" text-anchor="middle" font-size="9" font-weight="600" fill="#6ee7b7">MIPI + 電源出力</text>

          <line x1="190" y1="194" x2="246" y2="194" stroke="#059669" stroke-width="3" marker-end="url(#d127-arrGreen)"/>
          <text x="218" y="184" text-anchor="middle" font-size="8.8" font-weight="800" fill="#047857">FPC幹線</text>

          <!-- RS-1029 Relay PCB + Stainless Mount -->
          <rect x="252" y="118" width="214" height="156" rx="10" fill="url(#d127-pcb)" stroke="#047857" stroke-width="2.2"/>
          <rect x="264" y="128" width="190" height="22" rx="4" fill="url(#d127-steel)" stroke="#475569"/>
          <text x="359" y="143" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0f172a">RS-1029 専用ステンレス剛性マウント</text>
          <text x="359" y="176" text-anchor="middle" font-size="12" font-weight="900" fill="#ffffff">RS-1029 / RS-1026</text>
          <text x="359" y="194" text-anchor="middle" font-size="9.4" font-weight="700" fill="#d1fae5">背面キャビネット中継リジッドフレキ</text>
          <!-- Dual 0.35mm B2B connectors -->
          <rect x="272" y="212" width="80" height="26" rx="4" fill="#fef3c7" stroke="#b45309" stroke-width="1.5"/>
          <text x="312" y="229" text-anchor="middle" font-size="8.8" font-weight="800" fill="#78350f">0.35mm B2B</text>
          <rect x="366" y="212" width="80" height="26" rx="4" fill="#fef3c7" stroke="#b45309" stroke-width="1.5"/>
          <text x="406" y="229" text-anchor="middle" font-size="8.8" font-weight="800" fill="#78350f">背面SW/操作系</text>
          <text x="359" y="262" text-anchor="middle" font-size="8.8" font-weight="800" fill="#fef08a">差動100Ω±8% / 損失 &lt; 0.4 dB</text>

          <line x1="468" y1="194" x2="526" y2="194" stroke="#d97706" stroke-width="3" marker-end="url(#d127-arrAmber)"/>
          <text x="497" y="184" text-anchor="middle" font-size="8.8" font-weight="800" fill="#b45309">40芯同軸</text>

          <!-- 4-Axis LCD Monitor -->
          <rect x="532" y="138" width="144" height="114" rx="10" fill="#1e293b" stroke="#0284c7" stroke-width="2"/>
          <text x="604" y="182" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">4軸LCDモニター</text>
          <text x="604" y="202" text-anchor="middle" font-size="9.2" font-weight="700" fill="#7dd3fc">PD-1072 / タッチ</text>
          <text x="604" y="220" text-anchor="middle" font-size="9" font-weight="600" fill="#bae6fd">独立脱着・迅速修理</text>

          ${drawStatusPill(116, 294, 488, '背面カバー分解時にモニター系を安全分離 → 細線同軸破損を防止＆高速整備', true)}
        `,
        cards: [
          { label: '実在Sony純正基板', line1: 'α9 III / α1 IIのリアキャビネット内側', line2: 'RS-1029フレキ＆専用マウント（α7RV:1026）' },
          { label: '信号品質と分離', line1: '0.35mm狭ピッチB2Bで100Ω差動を維持し', line2: '背面操作ボタン群と映像線をノイズ分離' },
          { label: 'プロのサービス整備性', line1: 'メイン基板を触らずリアパネル側だけで', line2: 'LCDヒンジ／モニター交換が安全に完了' },
        ],
      });

    // -------------------------------------------------------------------------
    // D128: Counterbalance Cam-Follower Torsion Assist Spring
    // -------------------------------------------------------------------------
    case 'lcd_torsion_assist_spring':
      return wrapLcdHdSvg({
        badge: 'D128',
        title: '4軸チルト自重キャンセル・カムフォロワ補助トーションスプリング',
        analogy: 'モニターの重さをバネの押し上げ力で相殺し「上下同じ軽さ」で動く魔法バネ',
        accent: '#64748b',
        accentSoft: '#f8fafc',
        body: `
          ${drawPanelBox(24, 80, 346, 254, '重力モーメント vs 補助バネ復元トルクのつり合い', '#475569', '#ffffff')}
          <!-- Pivot & tilted monitor beam -->
          <circle cx="118" cy="210" r="24" fill="url(#d128-steel)" stroke="#334155" stroke-width="2.2"/>
          <circle cx="118" cy="210" r="14" fill="none" stroke="#0284c7" stroke-width="3.2" stroke-dasharray="6 3"/>
          <!-- Monitor arm tilted -->
          <line x1="118" y1="210" x2="294" y2="146" stroke="#1e293b" stroke-width="10" stroke-linecap="round"/>
          <circle cx="230" cy="170" r="7" fill="#ef4444"/>
          <text x="230" y="154" text-anchor="middle" font-size="9.4" font-weight="800" fill="#dc2626">重心 CG (~120g)</text>
          <!-- Downward gravity arrow -->
          <line x1="230" y1="178" x2="230" y2="234" stroke="#e11d48" stroke-width="2.8" marker-end="url(#d128-arrRed)"/>
          <text x="276" y="226" font-size="9.6" font-weight="800" fill="#be123c">重力 m·g·L·cosθ</text>
          <!-- Upward spring assist curved arrow -->
          <path d="M 148 228 A 42 42 0 0 0 166 172" fill="none" stroke="#059669" stroke-width="3.2" marker-end="url(#d128-arrGreen)"/>
          <text x="118" y="256" text-anchor="middle" font-size="9.6" font-weight="900" fill="#047857">トーションバネ上向補助 τ_spring</text>
          ${drawStatusPill(44, 294, 306, '正味トルク τ_net ≈ 0 → 指1本で無重力チルト！', true)}

          ${drawPanelBox(386, 80, 310, 254, 'ツインSUS304-WPBバネ＆0°格納引き込み', '#0284c7', '#f8fafc')}
          <!-- Spring coil schematic -->
          <rect x="410" y="148" width="262" height="14" rx="7" fill="url(#d128-steel)" stroke="#475569"/>
          ${[444, 456, 468, 480, 492, 580, 592, 604, 616, 628]
            .map((cx) => `<rect x="${cx}" y="132" width="7" height="46" rx="3.5" fill="#94a3b8" stroke="#334155" stroke-width="1.3"/>`)
            .join('')}
          <text x="541" y="118" text-anchor="middle" font-size="10" font-weight="800" fill="#0369a1">左右対称ツインねじりコイル（偏荷重ゼロ）</text>
          <rect x="406" y="198" width="270" height="76" rx="8" fill="#ffffff" stroke="#bae6fd"/>
          <text x="420" y="218" font-size="10" font-weight="800" fill="#0f172a">① 上向き／下向きの操作荷重を対称均一化</text>
          <text x="420" y="238" font-size="10" font-weight="800" fill="#0f172a">② 0°格納直前のカム谷で「カチッ」と引き込み</text>
          <text x="420" y="258" font-size="9.2" font-weight="700" fill="#475569">SUS304-WPBばね鋼：10万回開閉高疲労限度</text>
          ${drawStatusPill(406, 294, 270, '軽やかな操作感とピタッと止まる保持力を両立', true)}
        `,
        cards: [
          { label: '重力キャンセル', line1: '120gのモニターが下に垂れる力を', line2: 'ねじりバネの復元トルクで正確に相殺' },
          { label: 'ツイン対称設計', line1: 'ヒンジ軸の左右両端に同軸バネを配置し', line2: '片側だけのこじれや偏摩耗を防止' },
          { label: '高級カメラの触感', line1: '上にも下にも同じ軽さでスッと動き', line2: '閉じる直前は吸い込まれるように格納' },
        ],
      });

    // -------------------------------------------------------------------------
    // D129: Hinge Axial Preload Calibration Shim Washers (0.05-0.10 mm)
    // -------------------------------------------------------------------------
    case 'lcd_torque_preload_shims':
      return wrapLcdHdSvg({
        badge: 'D129',
        title: 'ヒンジ軸方向プリロード微調整シムワッシャー群（0.05–0.10 mm）',
        analogy: '高級腕時計のように「髪の毛1本刻み」でヒンジの開閉トルクを調律するリング',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        body: `
          ${drawPanelBox(24, 80, 424, 254, '選択嵌合スタック断面：皿ばね予圧を 0.05 mm 刻みで精密調律', '#d97706', '#ffffff')}
          <!-- Central shaft -->
          <rect x="44" y="176" width="384" height="32" rx="4" fill="url(#d129-steel)" stroke="#475569" stroke-width="1.6"/>
          <!-- Hinge knuckle left -->
          <rect x="74" y="136" width="54" height="112" rx="6" fill="url(#d129-mg)" stroke="#0f172a" stroke-width="1.6"/>
          <text x="101" y="196" text-anchor="middle" font-size="9" font-weight="800" fill="#f8fafc">ボス</text>
          <!-- Stacked calibration shims (SUS301 + Phosphor Bronze alternating) -->
          <rect x="134" y="144" width="12" height="96" rx="2" fill="#fbbf24" stroke="#b45309" stroke-width="1.4"/>
          <rect x="150" y="144" width="16" height="96" rx="2" fill="#38bdf8" stroke="#0369a1" stroke-width="1.4"/>
          <rect x="170" y="144" width="20" height="96" rx="2" fill="#e2e8f0" stroke="#475569" stroke-width="1.4"/>
          <rect x="194" y="144" width="14" height="96" rx="2" fill="#f59e0b" stroke="#92400e" stroke-width="1.4"/>
          <!-- Disc spring (Belleville) -->
          <polygon points="222,144 246,158 246,226 222,240 232,226 232,158" fill="#64748b" stroke="#0f172a" stroke-width="1.5"/>
          <polygon points="268,144 248,158 248,226 268,240 258,226 258,158" fill="#64748b" stroke="#0f172a" stroke-width="1.5"/>
          <!-- Lock nut on right -->
          <rect x="280" y="144" width="44" height="96" rx="5" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
          <text x="302" y="196" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">締結</text>
          <!-- Compression arrows -->
          <line x1="364" y1="192" x2="328" y2="192" stroke="#dc2626" stroke-width="2.6" marker-end="url(#d129-arrRed)"/>
          <text x="378" y="176" text-anchor="middle" font-size="9.5" font-weight="800" fill="#dc2626">予圧 F_N</text>
          ${drawCallout(158, 144, 152, 114, 1, '0.05 / 0.08 / 0.10 mm 調律シム', 'SUS301＋リン青銅 異種金属交互', '#b45309')}
          ${drawStatusPill(44, 294, 384, '軸クリアランス公差を吸収し全数トルク ±10%以内へ調律', true)}

          ${drawPanelBox(464, 80, 232, 254, 'シム調律による個体差収束', '#059669', '#f8fafc')}
          <!-- Bell curve narrow vs wide -->
          <line x1="480" y1="226" x2="680" y2="226" stroke="#475569" stroke-width="1.4"/>
          <path d="M 484 226 Q 530 220 580 184 Q 630 220 676 226" fill="#fecdd3" fill-opacity="0.55" stroke="#e11d48" stroke-width="2" stroke-dasharray="4 2"/>
          <path d="M 538 226 Q 564 220 580 128 Q 596 220 622 226" fill="#bbf7d0" fill-opacity="0.7" stroke="#059669" stroke-width="2.8"/>
          <text x="580" y="120" text-anchor="middle" font-size="9.6" font-weight="900" fill="#065f46">シム調律後（±10%）</text>
          <text x="524" y="182" text-anchor="middle" font-size="8.6" font-weight="700" fill="#be123c">調律前(±35%)</text>
          <text x="580" y="246" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">目標トルク 0.18 N·m 中央値</text>
          <text x="580" y="268" text-anchor="middle" font-size="8.8" font-weight="700" fill="#0369a1">異種金属で焼き付き・かじり防止</text>
          ${drawStatusPill(478, 294, 204, '硬すぎ・緩すぎの個体ハズレゼロ', true)}
        `,
        cards: [
          { label: '0.05mm刻みの調律', line1: '皿ばねは0.05mmズレると予圧が20%変動', line2: '最適シム枚数を選択挿入して均一トルク化' },
          { label: '異種金属交互スタック', line1: 'SUS301ステンレスとリン青銅を交互配置し', line2: '高面圧下の金属かじり・きしみ音を撲滅' },
          { label: '所有満足の品質', line1: 'どの個体を買っても同じ「しっとり滑らか」な', line2: 'αフラッグシップ基準の開閉フィーリング' },
        ],
      });

    // -------------------------------------------------------------------------
    // D130: 4-Axis Pantograph End-Travel Acoustic Silicone Dampers
    // -------------------------------------------------------------------------
    case 'lcd_pantograph_end_dampers':
      return wrapLcdHdSvg({
        badge: 'D130',
        title: '4軸パンタグラフ終端 静音シリコーンラバーダンパー（打音吸収ストップ）',
        analogy: '動画収録中にモニターを畳んでも「カチン！」と鳴らない高減衰シリコーン座布団',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(24, 80, 346, 254, 'リブ付 Shore 50A シリコーン緩衝クッション断面', '#334155', '#ffffff')}
          <!-- Moving tilt arm approaching damper -->
          <rect x="52" y="118" width="290" height="24" rx="5" fill="url(#d130-mg)" stroke="#0f172a" stroke-width="1.6"/>
          <text x="197" y="134" text-anchor="middle" font-size="9.6" font-weight="800" fill="#f8fafc">4軸パンタグラフ／チルトフレーム終端アーム</text>
          <line x1="197" y1="146" x2="197" y2="176" stroke="#e11d48" stroke-width="2.6" marker-end="url(#d130-arrRed)"/>
          <!-- Progressive ribbed Shore 50A silicone damper pad -->
          <g fill="#475569" stroke="#0f172a" stroke-width="1.5">
            <rect x="86" y="180" width="22" height="22" rx="6"/>
            <rect x="134" y="180" width="22" height="22" rx="6"/>
            <rect x="186" y="180" width="22" height="22" rx="6"/>
            <rect x="238" y="180" width="22" height="22" rx="6"/>
            <rect x="286" y="180" width="22" height="22" rx="6"/>
            <rect x="64" y="198" width="266" height="32" rx="6" fill="#334155"/>
          </g>
          <text x="197" y="218" text-anchor="middle" font-size="9.8" font-weight="800" fill="#f8fafc">高減衰ブチル／シリコーン（Shore 50A, tan δ &gt; 0.35）</text>
          <rect x="52" y="232" width="290" height="24" rx="4" fill="url(#d130-steel)" stroke="#64748b"/>
          <text x="197" y="248" text-anchor="middle" font-size="9.4" font-weight="800" fill="#1e293b">リアボディ・フレーム受け座面（4か所配置）</text>
          ${drawStatusPill(44, 294, 306, '先端リブが衝撃初期をソフト着地 → 確実に停止', true)}

          ${drawPanelBox(386, 80, 310, 254, '動画マイク拾い打音・衝撃波形比較', '#0284c7', '#f8fafc')}
          <!-- Impact vibration trace: metal-on-metal vs silicone damped -->
          <line x1="406" y1="178" x2="678" y2="178" stroke="#94a3b8" stroke-width="1.2"/>
          <!-- Hard metal click spike -->
          <polyline points="412,178 446,178 456,116 468,236 480,136 492,216 506,154 520,198 536,168 552,186 572,178" fill="none" stroke="#e11d48" stroke-width="2.2"/>
          <text x="488" y="114" text-anchor="middle" font-size="9.2" font-weight="900" fill="#be123c">❌ 金属直当たり（コツン打音）</text>
          <!-- Smooth silicone damped curve -->
          <path d="M 412 178 L 570 178 Q 596 154 622 178 Q 642 186 672 178" fill="none" stroke="#059669" stroke-width="3.2"/>
          <text x="614" y="148" text-anchor="middle" font-size="9.6" font-weight="900" fill="#065f46">✅ 静音吸収 (−18 dB)</text>
          <rect x="406" y="244" width="270" height="36" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="541" y="266" text-anchor="middle" font-size="9.4" font-weight="800" fill="#334155">落下・強開閉時の同期ギア（D51）歯欠けも保護</text>
          ${drawStatusPill(406, 294, 270, 'シネマ・野鳥動画収録中の無音チルト操作を実現', true)}
        `,
        cards: [
          { label: '非線形リブ緩衝', line1: '先端リブが最初に柔らかく潰れて減速し', line2: '後半で確実に98°/-40°終端をピタリと止める' },
          { label: 'マイク打音−18dB', line1: '高損失エラストマー（tan δ&gt;0.35）が', line2: '筐体伝搬ノイズを吸収し収録音声を守る' },
          { label: '耐衝撃バンパー', line1: 'バッグ内圧迫や誤操作の強い閉め込みから', line2: 'ギア歯欠けとガラス割れを未然にガード' },
        ],
      });

    default:
      return null;
  }
}
