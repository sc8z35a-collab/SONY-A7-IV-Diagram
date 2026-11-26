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
 * Group E — Hinge Strain-Relief, ePTFE Vent, Glare Loupe, Display Power/Signal Electronics
 * & 2026+ Post-LCD Emissive Frontier (D131–D150, 20 parts).
 */
export function renderLcdHdGroupE(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // -------------------------------------------------------------------------
    // D131: Hinge-Exit Micro-Coax Anti-Kink Silicone Strain-Relief Sleeve
    // -------------------------------------------------------------------------
    case 'lcd_coax_strain_sleeve':
      return wrapLcdHdSvg({
        badge: 'D131',
        title: 'ヒンジ出口 細線同軸アンチキンク（折損防止）シリコーンスリーブ＆保持クリップ',
        analogy: '充電ケーブルの根元折れを防ぐ「蛇腹保護ブーツ」を4軸ヒンジ出口へ完全実装',
        accent: '#f97316',
        accentSoft: '#fff7ed',
        body: `
          ${drawPanelBox(24, 80, 326, 254, '❌ スリーブなし（金属エッジでキンク折損）', '#e11d48', '#fff1f2')}
          <rect x="44" y="138" width="94" height="102" rx="6" fill="url(#d131-mg)" stroke="#0f172a" stroke-width="1.8"/>
          <text x="91" y="193" text-anchor="middle" font-size="9.6" font-weight="800" fill="#f8fafc">金属ヒンジ穴</text>
          <!-- Sharp kink bend -->
          <path d="M 138 188 L 154 188 L 166 246 L 310 246" fill="none" stroke="#ea580c" stroke-width="6" stroke-linejoin="miter"/>
          <circle cx="154" cy="196" r="14" fill="none" stroke="#e11d48" stroke-width="2.4" stroke-dasharray="3 2"/>
          <text x="234" y="162" text-anchor="middle" font-size="10" font-weight="900" fill="#be123c">曲げ半径 R &lt; 1.0 mm!</text>
          <text x="234" y="182" text-anchor="middle" font-size="9.2" font-weight="700" fill="#9f1239">AWG44極細素線が応力集中で破断</text>
          ${drawStatusPill(44, 294, 286, '角度によって画面チラつき・ブラックアウト故障', false)}

          ${drawPanelBox(366, 80, 330, 254, '✅ 8段テーパー蛇腹シリコーン＋SUS Cクリップ', '#ea580c', '#ffffff')}
          <rect x="386" y="138" width="76" height="102" rx="6" fill="url(#d131-mg)" stroke="#0f172a" stroke-width="1.8"/>
          <text x="424" y="193" text-anchor="middle" font-size="9.2" font-weight="800" fill="#f8fafc">ヒンジ肩</text>
          <!-- SUS C-clip lock -->
          <rect x="458" y="162" width="12" height="52" rx="3" fill="url(#d131-steel)" stroke="#334155" stroke-width="1.6"/>
          <!-- Corrugated tapered anti-kink silicone sleeve -->
          ${[0, 1, 2, 3, 4, 5, 6]
            .map(
              (i) =>
                `<rect x="${474 + i * 14}" y="${168 + i * 2.5}" width="10" height="${42 - i * 3.5}" rx="4" fill="#fb923c" stroke="#c2410c" stroke-width="1.3"/>`
            )
            .join('')}
          <!-- Smooth wide bend radius coax exiting sleeve -->
          <path d="M 462 188 L 570 188 Q 624 188 648 238 L 678 248" fill="none" stroke="#d97706" stroke-width="5.5" stroke-linecap="round"/>
          ${drawCallout(464, 162, 488, 122, 1, 'SUS C型抜け止めクリップ', '引張応力をコネクタへ伝えない', '#475569')}
          ${drawCallout(540, 178, 520, 256, 2, '最小曲げ半径 R ≥ 3.0 mm 保証', '金属疲労歪み ε ≤ 0.3% に抑制', '#c2410c')}
          ${drawStatusPill(386, 294, 290, '40芯極細同軸 50,000回 4軸屈曲断線ゼロ！', true)}
        `,
        cards: [
          { label: '段階テーパー蛇腹', line1: '根元から先端へ徐々に柔らかくなる構造で', line2: '曲げ剛性を連続変化させキンク折れを分散' },
          { label: 'SUS C保持クリップ', line1: '180°バリアングル回転時のケーブル引張りを', line2: 'ヒンジ肩で受け止めB2Bコネクタ脱落を防止' },
          { label: '長期断線プロテクト', line1: 'AWG44（φ50μm）極細導体を弾性域に保ち', line2: '何年使い込んでも映像途切れゼロを維持' },
        ],
      });

    // -------------------------------------------------------------------------
    // D132: Rear Bay Waterproof Breathable ePTFE Pressure-Equalization Vent
    // -------------------------------------------------------------------------
    case 'lcd_rear_bay_eptfe_vent':
      return wrapLcdHdSvg({
        badge: 'D132',
        title: '背面ベイ防水透湿 ePTFE 圧力平衡ベント膜（IP68結露・気圧差対策）',
        analogy: '雨粒は100%弾き、空気と水蒸気だけ通す「ゴアテックス式カメラ呼吸窓」',
        accent: '#06b6d4',
        accentSoft: '#ecfeff',
        body: `
          ${drawPanelBox(24, 80, 412, 254, '孔径 0.2 μm 延伸ePTFE 3D微多孔膜の分子サイズ選別原理', '#0891b2', '#ffffff')}
          <!-- External rain & dust side -->
          <rect x="40" y="114" width="122" height="162" rx="6" fill="#e0f2fe" stroke="#38bdf8"/>
          <text x="101" y="132" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0369a1">屋外（雨・気圧変化）</text>
          ${drawRaindrop(84, 178, 1.5)}
          ${drawRaindrop(126, 212, 1.2)}
          <text x="101" y="256" text-anchor="middle" font-size="9" font-weight="800" fill="#0284c7">水滴 φ100–2000 μm</text>

          <!-- Microporous ePTFE membrane slab in center -->
          <rect x="172" y="114" width="112" height="162" rx="6" fill="#f8fafc" stroke="#0891b2" stroke-width="2.4"/>
          <!-- 3D PTFE fibril web -->
          <g stroke="#0891b2" stroke-width="1.4" opacity="0.65">
            <line x1="180" y1="130" x2="276" y2="152"/><line x1="180" y1="156" x2="276" y2="132"/>
            <line x1="180" y1="176" x2="276" y2="198"/><line x1="180" y1="202" x2="276" y2="178"/>
            <line x1="180" y1="222" x2="276" y2="244"/><line x1="180" y1="248" x2="276" y2="224"/>
          </g>
          <text x="228" y="268" text-anchor="middle" font-size="9.2" font-weight="900" fill="#155e75">ePTFE 孔径 ~0.2μm</text>

          <!-- Air & Vapor molecules passing freely both ways -->
          <line x1="146" y1="150" x2="314" y2="150" stroke="#059669" stroke-width="2.6" marker-end="url(#d132-arrGreen)"/>
          <line x1="314" y1="224" x2="146" y2="224" stroke="#059669" stroke-width="2.6" marker-end="url(#d132-arrGreen)"/>
          <!-- Water drop bounced back -->
          <path d="M 140 190 L 170 190 L 148 206" fill="none" stroke="#e11d48" stroke-width="2.4" marker-end="url(#d132-arrRed)"/>

          <!-- Camera internal dry chamber -->
          <rect x="294" y="114" width="124" height="162" rx="6" fill="#ecfdf5" stroke="#10b981"/>
          <text x="356" y="132" text-anchor="middle" font-size="9.6" font-weight="800" fill="#065f46">カメラ背面ベイ内部</text>
          <text x="356" y="176" text-anchor="middle" font-size="9.5" font-weight="800" fill="#047857">空気・水蒸気</text>
          <text x="356" y="194" text-anchor="middle" font-size="9.2" font-weight="700" fill="#047857">(φ 0.0004 μm)</text>
          <text x="356" y="216" text-anchor="middle" font-size="9.8" font-weight="900" fill="#059669">双方向フリー通過!</text>
          ${drawStatusPill(44, 294, 372, 'IP67/IP68防水（侵入圧&gt;100 kPa）＋ 通気量 2,000 mL/min/cm²', true)}

          ${drawPanelBox(452, 80, 244, 254, 'ベント膜がないと起きる「負圧吸い込み」', '#e11d48', '#fff1f2')}
          <rect x="468" y="116" width="212" height="72" rx="8" fill="#ffffff" stroke="#fda4af"/>
          <text x="480" y="136" font-size="9.8" font-weight="800" fill="#be123c">🔥 炎天下60℃ → 🌧 急な夕立15℃</text>
          <text x="480" y="156" font-size="9.2" font-weight="700" fill="#334155">内部空気収縮で −15 kPa の負圧発生！</text>
          <text x="480" y="174" font-size="9.2" font-weight="700" fill="#be123c">パッキン隙間から雨水を吸い込む危険</text>

          <rect x="468" y="198" width="212" height="78" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.6"/>
          <text x="480" y="218" font-size="9.8" font-weight="800" fill="#065f46">✅ ePTFE瞬時圧力平衡</text>
          <text x="480" y="238" font-size="9.2" font-weight="700" fill="#047857">飛行機・高山・急冷でも内外気圧差ゼロ</text>
          <text x="480" y="256" font-size="9.2" font-weight="700" fill="#047857">撥油コート付で皮脂目詰まりも防止</text>
          ${drawStatusPill(466, 294, 216, '防塵防滴シールの寿命と結露ゼロを死守', true)}
        `,
        cards: [
          { label: '0.2μm超疎水孔', line1: '雨滴(100μm以上)は100kPaでも完全遮断し', line2: '気体分子(0.0004μm)だけを瞬時に透過' },
          { label: '負圧のワナを防ぐ', line1: '急な夕立や飛行機移動の気圧差を逃がし', line2: 'パッキンからの雨水吸い込み事故を根絶' },
          { label: '結露＆カビ対策', line1: '内部湿気の滞留を透湿排出するため', line2: '背面基板や液晶裏の結露・腐食を抑制' },
        ],
      });

    // -------------------------------------------------------------------------
    // D133: External Magnetic 3.2" Outdoor Glare Hood / ±3D Loupe Mount IF
    // -------------------------------------------------------------------------
    case 'lcd_magnetic_glare_loupe':
      return wrapLcdHdSvg({
        badge: 'D133',
        title: 'マグネット着脱式 3.2型屋外サンシェード遮光フード／±3D光学ルーペIF',
        analogy: '画面を塞がない極薄磁石フレームで「1秒着脱の暗室フード／3倍ルーペ」を実現',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(24, 80, 396, 254, '4隅N52ネオジム磁気フレーム ⇄ 遮光フード／3倍±3Dルーペ', '#334155', '#ffffff')}
          ${drawSunIcon(68, 124, 12)}
          <line x1="88" y1="128" x2="152" y2="152" stroke="#f59e0b" stroke-width="2.8" marker-end="url(#d133-arrAmber)"/>
          <text x="114" y="114" text-anchor="middle" font-size="9.2" font-weight="800" fill="#d97706">直射日光 10万lux</text>
          <!-- Monitor with magnetic open bezel + snap-on velvet hood -->
          <rect x="262" y="130" width="24" height="134" rx="4" fill="url(#d133-mg)" stroke="#0f172a" stroke-width="1.8"/>
          <text x="274" y="200" text-anchor="middle" font-size="9" font-weight="800" fill="#f8fafc" transform="rotate(-90 274 200)">3.2型LCD</text>
          <!-- Open-aperture N52 magnetic frame -->
          <rect x="248" y="130" width="12" height="24" rx="2" fill="#38bdf8" stroke="#0284c7" stroke-width="1.4"/>
          <rect x="248" y="240" width="12" height="24" rx="2" fill="#38bdf8" stroke="#0284c7" stroke-width="1.4"/>
          <!-- Collapsible velvet glare hood / ±3D optical loupe funnel -->
          <polygon points="154,148 246,130 246,264 154,246" fill="#0f172a" stroke="#475569" stroke-width="2"/>
          <ellipse cx="152" cy="197" rx="10" ry="48" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
          <text x="200" y="192" text-anchor="middle" font-size="9.6" font-weight="900" fill="#f8fafc">植毛ベルベット</text>
          <text x="200" y="208" text-anchor="middle" font-size="9" font-weight="700" fill="#7dd3fc">反射率 &lt; 0.4%</text>
          <!-- Eye viewing cleanly through 3x ±3D loupe -->
          <ellipse cx="86" cy="197" rx="22" ry="12" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
          <circle cx="92" cy="197" r="6" fill="#0284c7"/>
          <line x1="112" y1="197" x2="140" y2="197" stroke="#059669" stroke-width="2.4" marker-end="url(#d133-arrGreen)"/>
          <text x="86" y="224" text-anchor="middle" font-size="9.2" font-weight="800" fill="#065f46">3倍拡大・±3D視度</text>
          ${drawCallout(254, 142, 310, 126, 1, '4隅N52磁石枠', '表示領域100%非遮蔽', '#0284c7')}
          ${drawStatusPill(44, 294, 356, '外光を98%物理遮断 → 炎天下でも暗室並みの映像確認！', true)}

          ${drawPanelBox(436, 80, 260, 254, '炎天下（10万lux）実効コントラスト ACR比較', '#059669', '#f8fafc')}
          <!-- Bar chart comparing bare 1000-nit vs Hooded ACR -->
          <rect x="466" y="218" width="66" height="44" rx="5" fill="#fda4af" stroke="#e11d48" stroke-width="1.6"/>
          <text x="499" y="208" text-anchor="middle" font-size="11" font-weight="900" fill="#be123c">約 4 : 1</text>
          <text x="499" y="276" text-anchor="middle" font-size="9.2" font-weight="800" fill="#9f1239">裸画面 (1000nit)</text>

          <rect x="576" y="124" width="66" height="138" rx="5" fill="#34d399" stroke="#059669" stroke-width="1.8"/>
          <text x="609" y="116" text-anchor="middle" font-size="11.5" font-weight="900" fill="#065f46">&gt; 150 : 1</text>
          <text x="609" y="276" text-anchor="middle" font-size="9.2" font-weight="800" fill="#065f46">磁気フード/ルーペ</text>
          ${drawStatusPill(452, 294, 228, '電池消耗ゼロで真夏のMFピント精度激増', true)}
        `,
        cards: [
          { label: '物理遮光の威力', line1: '直射日光10万luxの反射光(318nit)を遮り', line2: '実効コントラストを4:1→150:1超へ回復' },
          { label: '1秒マグネット着脱', line1: '4隅N52磁石枠は画面を一切隠さず', line2: '磁気シールド連携で反転センサ誤動作ゼロ' },
          { label: '動画・風景プロの必需品', line1: '3倍±3DルーペでシネマMFやS-Log露出を', line2: '真夏の雪原・ビーチでも暗室並みに確認' },
        ],
      });

    // -------------------------------------------------------------------------
    // D134: Hybrid Mutual + Self-Capacitance Wet-Finger & Winter-Glove Touch AFE
    // -------------------------------------------------------------------------
    case 'lcd_hybrid_wet_touch_afe':
      return wrapLcdHdSvg({
        badge: 'D134',
        title: '相互容量＋自己容量ハイブリッド 濡れ指＆冬グローブ対応タッチAFE',
        analogy: '2種の静電スキャンを瞬時切替「雨粒は完全無視、手袋越しの指はバッチリ反応」',
        accent: '#0ea5e9',
        accentSoft: '#f0f9ff',
        body: `
          ${drawPanelBox(24, 80, 326, 254, '① 雨粒誤動作の完全却下（符号判別物理）', '#0284c7', '#ffffff')}
          <!-- Raindrop (floating conductor -> +ΔCm) vs Grounded Finger (-ΔCm) -->
          <rect x="44" y="206" width="286" height="22" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
          <text x="187" y="221" text-anchor="middle" font-size="9.5" font-weight="800" fill="#075985">X / Y ITOタッチ電極マトリクス</text>
          <!-- Raindrop left -->
          ${drawRaindrop(112, 182, 1.5)}
          <text x="112" y="142" text-anchor="middle" font-size="9.8" font-weight="900" fill="#0284c7">雨粒（非接地）</text>
          <text x="112" y="158" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0369a1">結合増加：+ΔC_m</text>
          <text x="112" y="248" text-anchor="middle" font-size="9.5" font-weight="900" fill="#e11d48">→ 自動無視（却下）</text>

          <!-- Finger right -->
          <rect x="236" y="140" width="38" height="62" rx="18" fill="#fed7aa" stroke="#ea580c" stroke-width="1.8"/>
          <text x="255" y="128" text-anchor="middle" font-size="9.8" font-weight="900" fill="#c2410c">人体指（GND接地）</text>
          <text x="255" y="248" text-anchor="middle" font-size="9.5" font-weight="900" fill="#059669">電界吸収：−ΔC_m → 有効！</text>
          ${drawStatusPill(44, 294, 286, '豪雨ロケでも水滴による勝手な設定変更ゼロ', true)}

          ${drawPanelBox(366, 80, 330, 254, '② 冬用厚手グローブ対応（自己容量＋負性容量AFE）', '#059669', '#f8fafc')}
          <!-- Thick glove over glass -> weak signal boosted to SNR > 43.2 dB -->
          <rect x="386" y="124" width="128" height="44" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1.8"/>
          <text x="450" y="144" text-anchor="middle" font-size="9.8" font-weight="800" fill="#f8fafc">冬用厚手グローブ</text>
          <text x="450" y="160" text-anchor="middle" font-size="8.8" font-weight="700" fill="#cbd5e1">厚さ 1.5〜3.0 mm (ΔC 1/10)</text>

          <line x1="518" y1="146" x2="548" y2="146" stroke="#059669" stroke-width="2.4" marker-end="url(#d134-arrGreen)"/>
          <rect x="552" y="116" width="128" height="62" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
          <text x="616" y="138" text-anchor="middle" font-size="9.6" font-weight="900" fill="#065f46">負性容量補償AFE</text>
          <text x="616" y="156" text-anchor="middle" font-size="9.2" font-weight="800" fill="#047857">Self-Cap高感度切替</text>
          <text x="616" y="172" text-anchor="middle" font-size="9" font-weight="800" fill="#059669">SNR &gt; 43.2 dB!</text>

          <rect x="386" y="198" width="294" height="74" rx="8" fill="#ffffff" stroke="#bae6fd"/>
          <text x="400" y="218" font-size="9.8" font-weight="800" fill="#0f172a">周波数ホッピングノイズ回避スキャン：</text>
          <text x="400" y="238" font-size="9.2" font-weight="600" fill="#334155">LCD VCOM反転・PWMノイズ帯を避け 120–240 Hz 駆動</text>
          <text x="400" y="256" font-size="9.2" font-weight="700" fill="#0284c7">EVF覗き中の「タッチパッドAF」でもジッター皆無</text>
          ${drawStatusPill(386, 294, 290, '雪山グローブ装着のままタッチトラッキングAF自在', true)}
        `,
        cards: [
          { label: '雨粒vs指の物理判別', line1: '非接地の水滴は+ΔC、接地の指は−ΔCと', line2: '容量変化の符号差＋自己容量で99.9%識別' },
          { label: '厚手グローブ高SNR', line1: '負性容量AFEと高電圧Txマルチ積算で', line2: 'SNR 43.2 dB超・3mm厚グローブ越しでも反応' },
          { label: '過酷ロケ操作性', line1: '氷点下の雪山や雨天スポーツ撮影でも', line2: '手袋を外さず瞬時にAF枠移動・設定変更' },
        ],
      });

    // -------------------------------------------------------------------------
    // D135: Mainboard-Side Display eFuse Power Load-Switch (OVP/OCP/SCP)
    // -------------------------------------------------------------------------
    case 'lcd_efuse_ovp_ocp_switch':
      return wrapLcdHdSvg({
        badge: 'D135',
        title: 'メイン基板側 表示電源スマート eFuse（OVP/OCP/SCP マイクロ秒遮断）',
        analogy: 'ヒンジ配線ショートを100万分の1秒で切り離し、カメラ本体と記録データを救う電子ブレーカー',
        accent: '#f43f5e',
        accentSoft: '#fff1f2',
        body: `
          ${drawPanelBox(24, 80, 672, 254, '3段階ハードウェア瞬断保護アーキテクチャ（検知 → &lt;2μs MOSFET遮断 → 本体救済）', '#e11d48', '#ffffff')}
          <!-- Battery / Mainboard power rail left -->
          <rect x="44" y="138" width="128" height="114" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
          <text x="108" y="176" text-anchor="middle" font-size="10.5" font-weight="900" fill="#065f46">本体メイン電源</text>
          <text x="108" y="196" text-anchor="middle" font-size="9.4" font-weight="700" fill="#047857">3.3V / 5.0V レール</text>
          <text x="108" y="218" text-anchor="middle" font-size="9" font-weight="800" fill="#059669">BIONZ / EVF / CFx</text>
          <text x="108" y="236" text-anchor="middle" font-size="9.2" font-weight="900" fill="#047857">🛡 電圧降下ゼロ保護</text>

          <line x1="174" y1="194" x2="218" y2="194" stroke="#059669" stroke-width="3" marker-end="url(#d135-arrGreen)"/>

          <!-- Smart eFuse IC core -->
          <rect x="224" y="116" width="244" height="156" rx="10" fill="#1e293b" stroke="#f43f5e" stroke-width="2.4"/>
          <text x="346" y="138" text-anchor="middle" font-size="11.5" font-weight="900" fill="#fda4af">スマート eFuse ロードスイッチIC</text>
          <!-- Internal sub-blocks -->
          <rect x="240" y="150" width="98" height="44" rx="5" fill="#334155" stroke="#38bdf8"/>
          <text x="289" y="169" text-anchor="middle" font-size="9.2" font-weight="800" fill="#7dd3fc">低R_DS(on) MOSFET</text>
          <text x="289" y="185" text-anchor="middle" font-size="8.6" font-weight="700" fill="#e2e8f0">35–80 mΩ / ソフト開始</text>

          <rect x="352" y="150" width="100" height="44" rx="5" fill="#334155" stroke="#fbbf24"/>
          <text x="402" y="169" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fde047">OVP / OCP / SCP</text>
          <text x="402" y="185" text-anchor="middle" font-size="8.6" font-weight="700" fill="#e2e8f0">1.6×I_LIM 即時比較</text>

          <rect x="240" y="206" width="212" height="52" rx="6" fill="#881337" stroke="#fb7185"/>
          <text x="346" y="227" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">⚡ 短絡検知 → &lt; 2 μs ゲート遮断!</text>
          <text x="346" y="246" text-anchor="middle" font-size="8.8" font-weight="700" fill="#fecdd3">従来溶断ヒューズの1,000倍高速・逆流防止内蔵</text>

          <!-- Severed output to faulted hinge cable -->
          <line x1="470" y1="194" x2="528" y2="194" stroke="#e11d48" stroke-width="3" stroke-dasharray="5 3"/>
          <text x="499" y="182" text-anchor="middle" font-size="12" font-weight="900" fill="#e11d48">✂ 遮断</text>

          <rect x="532" y="138" width="144" height="114" rx="10" fill="#fff1f2" stroke="#e11d48" stroke-width="2"/>
          <text x="604" y="176" text-anchor="middle" font-size="10.2" font-weight="900" fill="#be123c">異常発生：LCD側</text>
          <text x="604" y="198" text-anchor="middle" font-size="9.2" font-weight="700" fill="#9f1239">ヒンジ衝撃ショート</text>
          <text x="604" y="218" text-anchor="middle" font-size="9.2" font-weight="700" fill="#9f1239">または水濡れ漏電</text>
          <text x="604" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#e11d48">安全に完全切り離し</text>

          ${drawStatusPill(102, 294, 516, '万が一モニター配線が短絡してもEVFで撮影続行＆録画中ファイル破損ゼロ！', true)}
        `,
        cards: [
          { label: '2μs超高速遮断', line1: '定格1.6倍超の短絡電流を検知した瞬間', line2: '2マイクロ秒未満でMOSFETを完全オフ' },
          { label: 'ソフトスタート保護', line1: 'dv/dtスルーレート制御で起動時の', line2: 'コンデンサ突入電流と電圧ディップを抑制' },
          { label: '撮影データ救済', line1: 'メイン基板・バッテリー・CFexpressを無傷保護', line2: '緊急時はEVFのみで撮影を最後まで完遂可能' },
        ],
      });

    // -------------------------------------------------------------------------
    // D136: 2.5 Gbps MIPI D-PHY 1.2 Signal ReDriver & Pre-Emphasis Equalizer
    // -------------------------------------------------------------------------
    case 'lcd_mipi_redriver_eq':
      return wrapLcdHdSvg({
        badge: 'D136',
        title: '2.5 Gbps MIPI D-PHY 1.2 シグナルリドライバ＆プリエンファシス等化IC',
        analogy: '長いヒンジ細線同軸で丸まった超高速映像波形をシャキッと研ぎ澄ます再生アンプ',
        accent: '#6366f1',
        accentSoft: '#eef2ff',
        body: `
          ${drawPanelBox(24, 80, 672, 254, '4レーン×2.5 Gbps（計10 Gbps級）アイパターン回復メカニズム', '#4f46e5', '#ffffff')}
          <!-- Closed eye diagram before ReDriver -->
          <rect x="42" y="116" width="166" height="148" rx="8" fill="#fff1f2" stroke="#fda4af" stroke-width="1.6"/>
          <text x="125" y="135" text-anchor="middle" font-size="9.6" font-weight="800" fill="#be123c">リドライバ前（同軸減衰）</text>
          <!-- Smeared closed eye -->
          <path d="M 60 194 Q 125 166 190 194 Q 125 222 60 194" fill="#fecdd3" stroke="#e11d48" stroke-width="2.2"/>
          <path d="M 60 194 Q 125 182 190 194 Q 125 206 60 194" fill="none" stroke="#9f1239" stroke-width="1.4" stroke-dasharray="3 2"/>
          <text x="125" y="246" text-anchor="middle" font-size="9.2" font-weight="800" fill="#be123c">符号間干渉(ISI)でアイ閉塞</text>

          <line x1="212" y1="190" x2="254" y2="190" stroke="#4f46e5" stroke-width="2.8" marker-end="url(#d136-arrPurple)"/>

          <!-- PI2MEQX2505Q-class ReDriver IC block -->
          <rect x="260" y="116" width="200" height="148" rx="10" fill="#1e1b4b" stroke="#6366f1" stroke-width="2.2"/>
          <text x="360" y="138" text-anchor="middle" font-size="10.4" font-weight="900" fill="#c7d2fe">MIPI D-PHY 1.2 ReDriver</text>
          <rect x="276" y="150" width="76" height="46" rx="5" fill="#312e81" stroke="#818cf8"/>
          <text x="314" y="170" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">Rx CTLE</text>
          <text x="314" y="186" text-anchor="middle" font-size="8.4" font-weight="700" fill="#a5b4fc">高域ブーストEQ</text>
          <line x1="354" y1="173" x2="366" y2="173" stroke="#38bdf8" stroke-width="2"/>
          <rect x="368" y="150" width="76" height="46" rx="5" fill="#312e81" stroke="#38bdf8"/>
          <text x="406" y="170" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">Tx Pre-Emp</text>
          <text x="406" y="186" text-anchor="middle" font-size="8.4" font-weight="700" fill="#7dd3fc">エッジ強調出力</text>
          <rect x="276" y="208" width="168" height="42" rx="5" fill="#0f172a" stroke="#10b981"/>
          <text x="360" y="226" text-anchor="middle" font-size="9" font-weight="800" fill="#34d399">ULPS / LP 自動省電力遷移</text>
          <text x="360" y="242" text-anchor="middle" font-size="8.4" font-weight="700" fill="#a7f3d0">100Ω差動CML 4Data + 1Clk</text>

          <line x1="464" y1="190" x2="506" y2="190" stroke="#059669" stroke-width="2.8" marker-end="url(#d136-arrGreen)"/>

          <!-- Wide open clean eye diagram after ReDriver -->
          <rect x="512" y="116" width="166" height="148" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.8"/>
          <text x="595" y="135" text-anchor="middle" font-size="9.6" font-weight="800" fill="#065f46">リドライバ後（完全再生）</text>
          <path d="M 528 194 Q 595 144 662 194 Q 595 244 528 194" fill="#d1fae5" stroke="#059669" stroke-width="2.8"/>
          <circle cx="595" cy="194" r="14" fill="none" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="3 2"/>
          <text x="595" y="197.5" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0369a1">WIDE EYE</text>
          <text x="595" y="248" text-anchor="middle" font-size="9.2" font-weight="800" fill="#047857">BER &lt; 10⁻¹² 砂嵐ゼロ!</text>

          ${drawStatusPill(114, 294, 492, '4軸ヒンジ長尺AWG44細線同軸経由でも 120 fps 10-bit 映像を完全無劣化伝送', true)}
        `,
        cards: [
          { label: 'なぜ必要？', line1: '4軸ヒンジの長い極細同軸と2コネクタで', line2: '2.5Gbps高周波エッジが丸まりエラー増' },
          { label: 'Rx等化＋Tx強調', line1: '受信CTLEで減衰高域を持ち上げ、送信', line2: 'プリエンファシスで次段損失を先読み補償' },
          { label: '省電力ULPS対応', line1: 'MIPI LP/ULPSスリープを自動検知して', line2: '待機時はマイクロワット級へ自動節電' },
        ],
      });

    // -------------------------------------------------------------------------
    // D137: Real-Time Sunlight Readability Enhancement (SRE) Local Tone-Mapping
    // -------------------------------------------------------------------------
    case 'lcd_sre_sunlight_engine':
      return wrapLcdHdSvg({
        badge: 'D137',
        title: 'リアルタイム太陽光視認性強化（SRE）局所トーンマッピング＆ヒステリシス制御',
        analogy: '炎天下で潰れる暗部だけ「人間の視覚関数（DICOM）」に合わせて瞬間救出する頭脳',
        accent: '#f59e0b',
        accentSoft: '#fffbeb',
        body: `
          ${drawPanelBox(24, 80, 354, 254, '外光照度連動 動的ガンマ適応カーブ（γ 2.2 → 1.58）', '#d97706', '#ffffff')}
          <!-- Gamma curve graph -->
          <line x1="66" y1="256" x2="350" y2="256" stroke="#475569" stroke-width="1.6"/>
          <line x1="66" y1="118" x2="66" y2="256" stroke="#475569" stroke-width="1.6"/>
          <!-- Standard Gamma 2.2 (crushed under sunlight) -->
          <path d="M 66 256 Q 220 250 344 126" fill="none" stroke="#94a3b8" stroke-width="2.4" stroke-dasharray="5 3"/>
          <text x="278" y="232" text-anchor="middle" font-size="9.4" font-weight="800" fill="#64748b">室内標準 γ = 2.2</text>
          <!-- Sunlight SRE Gamma 1.58 (lifted dark detail) -->
          <path d="M 66 256 Q 166 208 344 126" fill="none" stroke="#f59e0b" stroke-width="3.4"/>
          <text x="174" y="166" text-anchor="middle" font-size="10.2" font-weight="900" fill="#d97706">炎天下SRE γ ≈ 1.58</text>
          <!-- Highlight arrow lifting dark shadow region above JND floor -->
          <rect x="68" y="222" width="106" height="32" fill="#fee2e2" opacity="0.7"/>
          <text x="121" y="242" text-anchor="middle" font-size="8.6" font-weight="800" fill="#b91c1c">太陽反射で潰れる帯域</text>
          <line x1="142" y1="224" x2="142" y2="196" stroke="#059669" stroke-width="2.6" marker-end="url(#d137-arrGreen)"/>
          <text x="208" y="274" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">入力階調（0:黒 → 255:白）</text>
          ${drawStatusPill(44, 294, 314, '電力ゼロ増で直射日光10万lux下の暗部JNDを確保！', true)}

          ${drawPanelBox(394, 80, 302, 254, '木漏れ日ちらつき防止：外光ヒステリシス制御', '#0284c7', '#f8fafc')}
          ${drawSunIcon(434, 132, 11)}
          <text x="562" y="130" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0369a1">環境光センサ（D24）→ 遅延1フレーム未満(&lt;8ms)</text>
          <!-- Hysteresis loop diagram -->
          <rect x="424" y="156" width="244" height="114" rx="8" fill="#ffffff" stroke="#bae6fd"/>
          <path d="M 446 244 L 544 244 L 598 180 L 650 180" fill="none" stroke="#ea580c" stroke-width="2.8"/>
          <path d="M 650 180 L 548 180 L 494 244 L 446 244" fill="none" stroke="#0284c7" stroke-width="2.8"/>
          <text x="588" y="228" font-size="8.8" font-weight="800" fill="#c2410c">暗→明（高速応答）</text>
          <text x="488" y="176" font-size="8.8" font-weight="800" fill="#0369a1">明→暗（緩やか復帰）</text>
          <text x="546" y="214" text-anchor="middle" font-size="9.4" font-weight="900" fill="#475569">不感帯ヒステリシス</text>
          ${drawStatusPill(414, 294, 262, '雲・木陰の通過で画面がチカチカ暴れない', true)}
        `,
        cards: [
          { label: 'DICOM視覚補正', line1: '10万lux下で潰れる低階調をγ2.2→1.58へ', line2: '動的リフトして暗部ディテールを視認可能に' },
          { label: '省電力の切り札', line1: 'バックライト出力を無理に上げず視認性UP', line2: '炎天下の発熱抑制とバッテリー延長に貢献' },
          { label: 'ヒステリシス平滑', line1: '上昇は素早く・下降は滑らかな非対称応答で', line2: '木漏れ日や手影による煩わしい明滅を防止' },
        ],
      });

    // -------------------------------------------------------------------------
    // D138: Panel Self-Refresh (PSR) Remote Frame Buffer & Power Gating
    // -------------------------------------------------------------------------
    case 'lcd_psr_frame_buffer':
      return wrapLcdHdSvg({
        badge: 'D138',
        title: 'パネルセルフリフレッシュ（PSR）内蔵SRAMフレームバッファ＆電源ゲーティング',
        analogy: '静止画確認・メニュー中はパネル記憶メモリへ任せ、本体送信回路を丸ごと昼寝させる！',
        accent: '#22c55e',
        accentSoft: '#f0fdf4',
        body: `
          ${drawPanelBox(24, 80, 672, 254, 'PSR動作モード比較：通常動画ライブビュー vs 静止画面（メニュー／再生確認）節電', '#16a34a', '#ffffff')}
          <!-- Top row: Active Video mode -->
          <rect x="42" y="114" width="636" height="72" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="54" y="132" font-size="9.8" font-weight="800" fill="#334155">▶ 動画／ライブビュー中（60/120 fps 連続送信）</text>
          <rect x="56" y="140" width="124" height="36" rx="6" fill="#0284c7"/>
          <text x="118" y="162" text-anchor="middle" font-size="9.6" font-weight="800" fill="#ffffff">BIONZ DMA 稼働</text>
          <line x1="184" y1="158" x2="292" y2="158" stroke="#0284c7" stroke-width="3" marker-end="url(#d138-arrBlue)"/>
          <text x="238" y="150" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0369a1">MIPI HS フル転送</text>
          <rect x="298" y="140" width="146" height="36" rx="6" fill="#0284c7"/>
          <text x="371" y="162" text-anchor="middle" font-size="9.6" font-weight="800" fill="#ffffff">DDIC 直結パススルー</text>
          <line x1="448" y1="158" x2="508" y2="158" stroke="#0284c7" stroke-width="3" marker-end="url(#d138-arrBlue)"/>
          <rect x="514" y="140" width="148" height="36" rx="6" fill="#0f172a"/>
          <text x="588" y="162" text-anchor="middle" font-size="9.6" font-weight="800" fill="#38bdf8">LCD 60–120Hz表示</text>

          <!-- Bottom row: PSR Power-Gating sleep mode -->
          <rect x="42" y="196" width="636" height="84" rx="8" fill="#ecfdf5" stroke="#16a34a" stroke-width="2"/>
          <text x="54" y="214" font-size="10" font-weight="900" fill="#065f46">💤 静止表示（再生確認・メニュー）：PSR自律リフレッシュ発動！</text>
          <rect x="56" y="224" width="124" height="44" rx="6" fill="#94a3b8"/>
          <text x="118" y="244" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">ホストDMA 停止</text>
          <text x="118" y="260" text-anchor="middle" font-size="8.4" font-weight="700" fill="#f1f5f9">電源ゲーティング OFF</text>

          <line x1="184" y1="246" x2="292" y2="246" stroke="#94a3b8" stroke-width="2.4" stroke-dasharray="4 4"/>
          <text x="238" y="238" text-anchor="middle" font-size="9" font-weight="900" fill="#15803d">MIPI ULPS スリープ</text>

          <rect x="298" y="224" width="166" height="44" rx="6" fill="#16a34a" stroke="#065f46" stroke-width="1.6"/>
          <text x="381" y="243" text-anchor="middle" font-size="9.6" font-weight="900" fill="#ffffff">内蔵SRAM RFB (4–6MB)</text>
          <text x="381" y="259" text-anchor="middle" font-size="8.4" font-weight="700" fill="#dcfce7">キャッシュから自律再描画!</text>

          <line x1="468" y1="246" x2="508" y2="246" stroke="#16a34a" stroke-width="3" marker-end="url(#d138-arrGreen)"/>
          <rect x="514" y="224" width="148" height="44" rx="6" fill="#064e3b"/>
          <text x="588" y="243" text-anchor="middle" font-size="9.6" font-weight="800" fill="#ffffff">LCD 10–60Hz自律維持</text>
          <text x="588" y="259" text-anchor="middle" font-size="8.4" font-weight="700" fill="#a7f3d0">操作検知 &lt;8ms即復帰</text>

          ${drawStatusPill(126, 294, 468, '静止表示時の表示システム消費電力を 35〜55% 劇的削減＆発熱低減！', true)}
        `,
        cards: [
          { label: '内蔵SRAMキャッシュ', line1: 'DDIC内の4〜6MB高速フレームバッファ(RFB)に', line2: '最新の1枚を保持しパネル自身で再描画' },
          { label: 'リンク丸ごと休止', line1: 'BIONZ側DMA・MIPI PHY・リドライバを', line2: 'ULPS電源ゲーティングして−35〜55%節電' },
          { label: '違和感ゼロの即復帰', line1: 'シャッター半押し・ダイヤル操作から', line2: '1フレーム(&lt;8ms)未満で通常駆動へ瞬間復帰' },
        ],
      });

    // -------------------------------------------------------------------------
    // D139: Multi-Point NTC Network & Cold-Weather (-20 °C) LC Overdrive LUT
    // -------------------------------------------------------------------------
    case 'lcd_cold_od_thermal_lut':
      return wrapLcdHdSvg({
        badge: 'D139',
        title: '多点NTC温度センサ網＆極寒−20℃液晶オーバードライブ（OD）動的LUT',
        analogy: '雪山でハチミツのように硬くなった液晶へ「最初の1コマだけ強電圧キック」で残像撃退！',
        accent: '#38bdf8',
        accentSoft: '#f0f9ff',
        body: `
          ${drawPanelBox(24, 80, 326, 254, '① 3点分散NTC温度監視＆アレニウス粘度急増', '#0284c7', '#ffffff')}
          <!-- Panel outline with 3 distributed NTC points -->
          <rect x="52" y="118" width="270" height="148" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
          <circle cx="90" cy="146" r="10" fill="#f43f5e" stroke="#ffffff" stroke-width="2"/>
          <text x="150" y="150" font-size="9.2" font-weight="800" fill="#be123c">NTC1: DDIC近傍</text>
          <circle cx="186" cy="190" r="10" fill="#0284c7" stroke="#ffffff" stroke-width="2"/>
          <text x="186" y="214" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0369a1">NTC2: セル中央 (実効温度 T)</text>
          <circle cx="282" cy="242" r="10" fill="#f59e0b" stroke="#ffffff" stroke-width="2"/>
          <text x="210" y="246" text-anchor="end" font-size="9.2" font-weight="800" fill="#b45309">NTC3: LEDバー端</text>
          ${drawStatusPill(44, 294, 286, '−10℃で液晶粘度は常温の約10倍 → 温度連動必須', true)}

          ${drawPanelBox(366, 80, 330, 254, '② 低温オーバードライブ（OD）電圧キック波形', '#059669', '#f8fafc')}
          <!-- Step response comparison -->
          <line x1="394" y1="242" x2="676" y2="242" stroke="#475569" stroke-width="1.4"/>
          <line x1="394" y1="122" x2="394" y2="242" stroke="#475569" stroke-width="1.4"/>
          <!-- Target luminance level -->
          <line x1="394" y1="168" x2="672" y2="168" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="4 3"/>
          <text x="646" y="160" text-anchor="middle" font-size="8.6" font-weight="800" fill="#475569">目標階調</text>
          <!-- Overdrive Voltage Kick Pulse (Frame 1) -->
          <polyline points="424,242 424,126 476,126 476,168 672,168" fill="none" stroke="#f59e0b" stroke-width="2.4" stroke-dasharray="4 2"/>
          <text x="450" y="120" text-anchor="middle" font-size="9" font-weight="900" fill="#d97706">1フレーム強電圧キック!</text>
          <!-- Fast OD optical response -->
          <path d="M 424 242 C 446 210 462 170 492 168 L 672 168" fill="none" stroke="#059669" stroke-width="3.2"/>
          <text x="540" y="154" text-anchor="middle" font-size="9.6" font-weight="900" fill="#065f46">✅ OD有 (~28 ms)</text>
          <!-- Sluggish non-OD cold response -->
          <path d="M 424 242 C 488 236 560 202 668 174" fill="none" stroke="#e11d48" stroke-width="2.4"/>
          <text x="574" y="222" text-anchor="middle" font-size="9.4" font-weight="800" fill="#be123c">❌ OD無 (&gt;100 ms 残像)</text>
          ${drawStatusPill(386, 294, 290, '高温時はODを自動ゼロ復帰 → 逆残像も完全回避', true)}
        `,
        cards: [
          { label: '極寒の物理の壁', line1: '25℃→−10℃で液晶粘度γ₁が約10倍に増え', line2: '通常駆動では応答100ms超の激しい残像に' },
          { label: '3D温度連動OD-LUT', line1: '前階調×目標階調×温度Tから最適キック電圧', line2: 'V_ODを1フレーム印加し応答を約1/4へ短縮' },
          { label: '厳冬ロケの戦力', line1: '雪山スポーツ・オーロラ・冬野鳥撮影でも', line2: '動き回る被写体をクッキリ追尾可能' },
        ],
      });

    // -------------------------------------------------------------------------
    // D140: Display EDID / Factory 3x3 Color Calibration Matrix & Security Handshake
    // -------------------------------------------------------------------------
    case 'lcd_edid_color_handshake':
      return wrapLcdHdSvg({
        badge: 'D140',
        title: 'パネル個体識別EDID／工場3×3色校正マトリクス＆セキュリティ認証IF',
        analogy: '工場で1台ずつ測った「その画面だけの色補正レシピ」を起動時に自動ロード！',
        accent: '#a855f7',
        accentSoft: '#faf5ff',
        body: `
          ${drawPanelBox(24, 80, 672, 254, '電源ON起動シーケンス：個体EEPROM色行列＆パネル安全認証ハンドシェイク', '#7c3aed', '#ffffff')}
          <!-- Panel EEPROM / OTP block left -->
          <rect x="44" y="122" width="212" height="146" rx="10" fill="#f5f3ff" stroke="#7c3aed" stroke-width="2"/>
          <text x="150" y="144" text-anchor="middle" font-size="10.6" font-weight="900" fill="#5b21b6">LCM内蔵 OTP / EEPROM</text>
          <rect x="60" y="156" width="180" height="28" rx="5" fill="#ffffff" stroke="#c4b5fd"/>
          <text x="150" y="174" text-anchor="middle" font-size="9.2" font-weight="800" fill="#4c1d95">① EDID解像度・電圧プロファイル</text>
          <rect x="60" y="190" width="180" height="28" rx="5" fill="#ffffff" stroke="#c4b5fd"/>
          <text x="150" y="208" text-anchor="middle" font-size="9.2" font-weight="800" fill="#4c1d95">② 工場実測 D65白点＆3×3色行列</text>
          <rect x="60" y="224" width="180" height="28" rx="5" fill="#ffffff" stroke="#c4b5fd"/>
          <text x="150" y="242" text-anchor="middle" font-size="9.2" font-weight="800" fill="#4c1d95">③ 純正シリアル暗号認証鍵</text>

          <!-- Handshake bidirectional arrows -->
          <line x1="262" y1="176" x2="354" y2="176" stroke="#7c3aed" stroke-width="2.6" marker-end="url(#d140-arrPurple)"/>
          <line x1="354" y1="214" x2="262" y2="214" stroke="#0284c7" stroke-width="2.6" marker-end="url(#d140-arrBlue)"/>
          <text x="308" y="166" text-anchor="middle" font-size="8.8" font-weight="800" fill="#6d28d9">I²C / MIPI LP読出</text>
          <text x="308" y="232" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">安全電圧確定OK</text>

          <!-- BIONZ XR 3D LUT Color Engine right -->
          <rect x="360" y="122" width="316" height="146" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <text x="518" y="144" text-anchor="middle" font-size="10.8" font-weight="900" fill="#7dd3fc">BIONZ XR リアルタイム3D-LUT色変換</text>
          <rect x="378" y="158" width="280" height="44" rx="6" fill="#1e293b" stroke="#6366f1"/>
          <text x="518" y="177" text-anchor="middle" font-size="10" font-weight="800" fill="#f8fafc">[R_cal, G_cal, B_cal]ᵀ = M₃ₓ₃(SN) · [R, G, B]ᵀ</text>
          <text x="518" y="194" text-anchor="middle" font-size="8.8" font-weight="700" fill="#c7d2fe">LED蛍光体・CFロットの色度クセ (±0.008) をゼロ化</text>
          <rect x="378" y="212" width="132" height="40" rx="6" fill="#064e3b" stroke="#10b981"/>
          <text x="444" y="230" text-anchor="middle" font-size="9.4" font-weight="900" fill="#6ee7b7">EVF ↔ LCD色一致</text>
          <text x="444" y="245" text-anchor="middle" font-size="8.6" font-weight="700" fill="#d1fae5">ΔE₂₀₀₀ &lt; 1.5 達成</text>
          <rect x="524" y="212" width="134" height="40" rx="6" fill="#1e3a8a" stroke="#38bdf8"/>
          <text x="591" y="230" text-anchor="middle" font-size="9.4" font-weight="900" fill="#bae6fd">誤駆動プロテクト</text>
          <text x="591" y="245" text-anchor="middle" font-size="8.6" font-weight="700" fill="#e0f2fe">最適VGH/VGL自動設定</text>

          ${drawStatusPill(120, 294, 480, '全数工場キャリブレーションでEVFと背面LCDの肌色・S-Log発色が完全一致！', true)}
        `,
        cards: [
          { label: '個体別3×3色行列', line1: '1台ずつ工場測色したD65白点・色行列を', line2: 'パネル内メモリへ焼き込み起動時に適用' },
          { label: 'EVF↔LCD色統一', line1: 'ファインダーと背面モニターを行き来しても', line2: 'ΔE&lt;1.5の高精度で肌色・WBがズレない' },
          { label: '安全シーケンス認証', line1: 'パネル世代と駆動電圧プロファイルを自動照合', line2: '誤電圧印加による液晶セル破壊を完全防止' },
        ],
      });

    // -------------------------------------------------------------------------
    // D141: 2026 Pol-Less OLED COE (Color Filter on Encapsulation + Black PDL)
    // -------------------------------------------------------------------------
    case 'lcd_coe_polless_oled':
      return wrapLcdHdSvg({
        badge: 'D141',
        title: '【2026+】偏光板レスOLED COE（封止上カラーフィルタ＋黒色PDL）',
        analogy: '光の55%を捨てる円偏光板を全廃！画素の間に真っ黒な壁を立てて光量を+33%爆増',
        accent: '#ec4899',
        accentSoft: '#fdf2f8',
        body: `
          ${drawPanelBox(24, 80, 326, 254, '❌ 従来OLED（円偏光板が光の55%を吸収ロス）', '#64748b', '#f8fafc')}
          <rect x="44" y="122" width="286" height="32" rx="4" fill="#334155" stroke="#0f172a"/>
          <text x="187" y="142" text-anchor="middle" font-size="9.8" font-weight="800" fill="#fde047">円偏光板＋PSA (~120μm) → 透過率 44%!</text>
          <rect x="44" y="164" width="286" height="22" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
          <text x="187" y="179" text-anchor="middle" font-size="9.2" font-weight="800" fill="#075985">TFE 薄膜封止</text>
          <rect x="44" y="196" width="286" height="44" rx="4" fill="#1e293b"/>
          <rect x="64" y="206" width="58" height="24" rx="4" fill="#ef4444"/>
          <rect x="158" y="206" width="58" height="24" rx="4" fill="#22c55e"/>
          <rect x="252" y="206" width="58" height="24" rx="4" fill="#3b82f6"/>
          <text x="187" y="260" text-anchor="middle" font-size="9.5" font-weight="800" fill="#be123c">作った光の半分以上が熱に消えて大損！</text>
          ${drawStatusPill(44, 294, 286, '高発熱・電池消耗・厚み増のボトルネック', false)}

          ${drawPanelBox(366, 80, 330, 254, '✅ 2026 偏光板レス COE（BPDL＋封止上CF）', '#db2777', '#ffffff')}
          <!-- No polarizer! Direct RGB CF + Pitch-Black PDL on TFE -->
          <rect x="386" y="124" width="290" height="34" rx="4" fill="#090d16" stroke="#ec4899" stroke-width="1.8"/>
          <rect x="404" y="130" width="60" height="22" rx="4" fill="#ef4444"/>
          <rect x="500" y="130" width="60" height="22" rx="4" fill="#22c55e"/>
          <rect x="596" y="130" width="60" height="22" rx="4" fill="#3b82f6"/>
          <text x="531" y="116" text-anchor="middle" font-size="9.6" font-weight="900" fill="#be185d">円偏光板全廃！封止上RGB CF ＋ 漆黒BPDL</text>
          <rect x="386" y="164" width="290" height="20" rx="3" fill="#bae6fd" stroke="#0284c7"/>
          <text x="531" y="178" text-anchor="middle" font-size="9" font-weight="800" fill="#075985">TFE 多層薄膜封止（D142）</text>
          <rect x="386" y="190" width="290" height="44" rx="4" fill="#05070b"/>
          <rect x="404" y="200" width="60" height="24" rx="4" fill="#ef4444"/>
          <rect x="500" y="200" width="60" height="24" rx="4" fill="#22c55e"/>
          <rect x="596" y="200" width="60" height="24" rx="4" fill="#3b82f6"/>
          <!-- High throughput upward arrows -->
          <line x1="434" y1="200" x2="434" y2="104" stroke="#ef4444" stroke-width="2.6" marker-end="url(#d141-arrRed)"/>
          <line x1="530" y1="200" x2="530" y2="104" stroke="#16a34a" stroke-width="2.6" marker-end="url(#d141-arrGreen)"/>
          <line x1="626" y1="200" x2="626" y2="104" stroke="#0284c7" stroke-width="2.6" marker-end="url(#d141-arrBlue)"/>
          <text x="531" y="256" text-anchor="middle" font-size="9.8" font-weight="900" fill="#047857">透過率 +33% / 消費電力 −25% / 厚さ −20%！</text>
          ${drawStatusPill(386, 294, 290, '真夏2,000nit OLEDを低発熱＆長寿命で実現', true)}
        `,
        cards: [
          { label: '円偏光板を全廃', line1: '透過率44%の偏光板を外し、TFE直上に', line2: 'RGBカラーフィルタ＋漆黒BPDLを形成' },
          { label: '外光反射も低反射', line1: '非発光部を黒BPDLで埋め、各色CFが', line2: '異色の外光を吸収して鏡面反射を抑制' },
          { label: 'カメラの3大恩恵', line1: '輝度効率+33%・消費電力−25%・薄さ−20%', line2: 'OLEDの焼付き寿命も大幅に延長' },
        ],
      });

    // -------------------------------------------------------------------------
    // D142: 2026 OLED Multi-Barrier Thin-Film Encapsulation TFE (WVTR < 10^-6)
    // -------------------------------------------------------------------------
    case 'lcd_tfe_ald_barrier':
      return wrapLcdHdSvg({
        badge: 'D142',
        title: '【2026+】OLED多層薄膜封止 TFE（ALD Al₂O₃/SiNₓ＋有機・WVTR &lt; 10⁻⁶）',
        analogy: '原子1層ずつの無機鎧＋有機クッションのミルフィーユで水分を10年間1滴も通さない',
        accent: '#06b6d4',
        accentSoft: '#ecfeff',
        body: `
          ${drawPanelBox(24, 80, 424, 254, '総厚わずか 10 μm：無機/有機/無機 3層デカップリング防湿断面', '#0891b2', '#ffffff')}
          ${drawRaindrop(96, 114, 1.0)}
          ${drawRaindrop(230, 114, 1.0)}
          ${drawRaindrop(364, 114, 1.0)}
          <text x="230" y="138" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0284c7">水蒸気 H₂O / 酸素 O₂（OLEDの大敵）</text>

          <!-- Upper Inorganic ALD Al2O3/SiNx Barrier #2 -->
          <rect x="44" y="146" width="384" height="22" rx="3" fill="#0284c7" stroke="#0c4a6e" stroke-width="1.5"/>
          <text x="236" y="161" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">無機バリア層②：ALD Al₂O₃ / PECVD SiNₓ（緻密 0.8 μm）</text>

          <!-- Organic IJP Acrylic Planarization Layer encapsulating a dust particle! -->
          <rect x="44" y="168" width="384" height="44" fill="#dbeafe" stroke="#38bdf8" stroke-width="1.4"/>
          <circle cx="154" cy="198" r="11" fill="#475569" stroke="#0f172a" stroke-width="1.5"/>
          <text x="276" y="194" text-anchor="middle" font-size="9.6" font-weight="800" fill="#1e40af">有機IJPアクリル平坦化層（5–8 μm）</text>
          <text x="276" y="207" text-anchor="middle" font-size="8.6" font-weight="700" fill="#0369a1">← 1μm微細異物を丸ごと埋め殺し平坦化！</text>

          <!-- Lower Inorganic Barrier #1 -->
          <rect x="44" y="212" width="384" height="22" rx="3" fill="#0891b2" stroke="#164e63" stroke-width="1.5"/>
          <text x="236" y="227" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">無機バリア層①：低温 (&lt;85℃) ALD Al₂O₃ / SiNₓ</text>

          <!-- OLED emitter stack protected underneath -->
          <rect x="44" y="238" width="384" height="32" rx="4" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.6"/>
          <text x="236" y="258" text-anchor="middle" font-size="10" font-weight="800" fill="#fde047">タンデムOLED有機発光層（10年間ダークスポットゼロ！）</text>
          ${drawStatusPill(44, 294, 384, 'WVTR &lt; 10⁻⁶ g/m²/day（厚さガラス封止の 1/50）', true)}

          ${drawPanelBox(464, 80, 232, 254, 'TFEが切り拓く2026次世代構造', '#7c3aed', '#f8fafc')}
          <rect x="480" y="116" width="200" height="46" rx="7" fill="#ffffff" stroke="#ddd6fe"/>
          <text x="580" y="135" text-anchor="middle" font-size="9.6" font-weight="800" fill="#5b21b6">① 上にCOE(D141)を直描可能</text>
          <text x="580" y="152" text-anchor="middle" font-size="8.6" font-weight="600" fill="#475569">偏光板レスの土台となる平坦面</text>

          <rect x="480" y="172" width="200" height="46" rx="7" fill="#ffffff" stroke="#bae6fd"/>
          <text x="580" y="191" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0369a1">② 上にY-OCTA(D148)を直描</text>
          <text x="580" y="208" text-anchor="middle" font-size="8.6" font-weight="600" fill="#475569">外付けタッチ板が丸ごと不要に</text>

          <rect x="480" y="228" width="200" height="48" rx="7" fill="#ecfdf5" stroke="#10b981"/>
          <text x="580" y="248" text-anchor="middle" font-size="9.6" font-weight="800" fill="#065f46">③ 低温Spatial ALD (&lt;85℃)</text>
          <text x="580" y="265" text-anchor="middle" font-size="8.6" font-weight="600" fill="#047857">下層の有機ELを熱劣化ゼロで封止</text>
          ${drawStatusPill(478, 294, 204, '極薄・耐衝撃・10年超防湿気密', true)}
        `,
        cards: [
          { label: '10⁻⁶の超気密', line1: '1m²に1日100万分の1g未満しか水を通さず', line2: 'ガラス瓶並みの防湿をわずか10μmで達成' },
          { label: 'ピンホール封殺', line1: '有機IJP層が微細ゴミを完全に埋め込み', line2: '上下ALD無機膜で水分侵入経路を完全遮断' },
          { label: '次世代統合の要', line1: 'この極薄TFEの真上へCOE色フィルタや', line2: 'Y-OCTAタッチ電極を直接積層できる' },
        ],
      });

    // -------------------------------------------------------------------------
    // D143: 2026 OLED Micro-Lens Array (MLA) Trapped-Photon Extraction Layer
    // -------------------------------------------------------------------------
    case 'lcd_mla_dome_extractor':
      return wrapLcdHdSvg({
        badge: 'D143',
        title: '【2026+】OLED マイクロレンズアレイ MLA 光取り出しドーム層（+30%高輝度）',
        analogy: 'ガラス内に閉じ込められていた75%の迷子光を「ミクロの凸レンズ海」で一斉救出！',
        accent: '#38bdf8',
        accentSoft: '#f0f9ff',
        body: `
          ${drawPanelBox(24, 80, 326, 254, '❌ 平坦OLED（70–80%の光が内部全反射で消滅）', '#e11d48', '#fff1f2')}
          <rect x="44" y="168" width="286" height="46" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
          <rect x="44" y="214" width="286" height="28" rx="4" fill="#1e1b4b"/>
          <text x="187" y="232" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fde047">OLED発光層（n ≈ 1.75）</text>
          <!-- Only steep center ray escapes -->
          <line x1="187" y1="212" x2="187" y2="116" stroke="#059669" stroke-width="2.6" marker-end="url(#d143-arrGreen)"/>
          <text x="187" y="112" text-anchor="middle" font-size="9.2" font-weight="800" fill="#059669">脱出わずか 22%!</text>
          <!-- Oblique rays trapped by TIR -->
          <polyline points="187,212 126,168 78,212" fill="none" stroke="#e11d48" stroke-width="2.4" marker-end="url(#d143-arrRed)"/>
          <polyline points="187,212 248,168 296,212" fill="none" stroke="#e11d48" stroke-width="2.4" marker-end="url(#d143-arrRed)"/>
          <text x="187" y="264" text-anchor="middle" font-size="9.4" font-weight="800" fill="#be123c">臨界角超えの斜め光が横へ全反射消滅</text>
          ${drawStatusPill(44, 294, 286, '外部光取り出し効率 η_out ≈ 20〜25% 止まり', false)}

          ${drawPanelBox(366, 80, 330, 254, '✅ 2026 MLA 凸型マイクロレンズドーム配列', '#0284c7', '#ffffff')}
          <!-- Row of convex micro-lens domes on top of substrate -->
          <path d="M 386 176 Q 410 144 434 176 Q 458 144 482 176 Q 506 144 530 176 Q 554 144 578 176 Q 602 144 626 176 Q 650 144 676 176 L 676 214 L 386 214 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
          <rect x="386" y="214" width="290" height="28" rx="4" fill="#1e1b4b"/>
          <text x="531" y="232" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fde047">OLED発光層（同じ電流・同じ発熱！）</text>
          <!-- Previously trapped oblique rays now exit cleanly upward! -->
          <polyline points="530,212 458,158 446,112" fill="none" stroke="#0284c7" stroke-width="2.6" marker-end="url(#d143-arrBlue)"/>
          <line x1="530" y1="212" x2="530" y2="110" stroke="#059669" stroke-width="2.8" marker-end="url(#d143-arrGreen)"/>
          <polyline points="530,212 602,158 614,112" fill="none" stroke="#0284c7" stroke-width="2.6" marker-end="url(#d143-arrBlue)"/>
          <text x="531" y="264" text-anchor="middle" font-size="9.8" font-weight="900" fill="#0369a1">全反射光を救出 → 電力ゼロ増で +30% 高輝度！</text>
          ${drawStatusPill(386, 294, 290, 'ピーク輝度 +30% ＆ 斜め視野角 +30% 同時達成', true)}
        `,
        cards: [
          { label: '75%の光ロス救出', line1: '平坦OLEDでは大半の光が全反射で消滅', line2: '曲面ドームが臨界角未満に変えて外へ放出' },
          { label: '電力・熱ゼロ増', line1: '電流を増やさず光学構造だけで明るくするため', line2: 'バッテリー持ちもOLED焼付き寿命も悪化しない' },
          { label: '視野角も+30%拡大', line1: '六方最密の極小ドーム群（MLP/META）が', line2: '4軸斜め視角での明るさと色を美しく維持' },
        ],
      });

    // -------------------------------------------------------------------------
    // D144: 2026 Blue Phosphorescent (PHOLED) / MR-TADF Hyperfluorescence
    // -------------------------------------------------------------------------
    case 'lcd_blue_pholed_hf':
      return wrapLcdHdSvg({
        badge: 'D144',
        title: '【2026+】青色燐光 PHOLED／MR-TADF ハイパーフルオレッセンス 100% IQE',
        analogy: 'OLED最後の壁「青色25%効率」を打ち破り、三重項75%も全部光に変える量子革命！',
        accent: '#3b82f6',
        accentSoft: '#eff6ff',
        body: `
          ${drawPanelBox(24, 80, 326, 254, '❌ 従来の青色蛍光OLED（IQE 25%の壁）', '#64748b', '#f8fafc')}
          <!-- Singlet 25% -> Blue Photon; Triplet 75% -> Waste Heat -->
          <rect x="48" y="122" width="118" height="46" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>
          <text x="107" y="142" text-anchor="middle" font-size="10" font-weight="900" fill="#1d4ed8">一重項 S₁ (25%)</text>
          <text x="107" y="159" text-anchor="middle" font-size="9" font-weight="800" fill="#2563eb">→ 🔵 青色発光</text>

          <rect x="184" y="122" width="144" height="122" rx="8" fill="#fee2e2" stroke="#e11d48" stroke-width="1.8"/>
          <text x="256" y="158" text-anchor="middle" font-size="11" font-weight="900" fill="#be123c">三重項 T₁ (75%)</text>
          <text x="256" y="182" text-anchor="middle" font-size="10" font-weight="800" fill="#9f1239">🔥 すべて熱へ消滅!</text>
          <text x="256" y="204" text-anchor="middle" font-size="8.8" font-weight="700" fill="#be123c">大電流必須→青色焼付き</text>
          <text x="256" y="224" text-anchor="middle" font-size="8.8" font-weight="700" fill="#be123c">黄変・高発熱の元凶</text>
          ${drawStatusPill(44, 294, 286, '赤・緑は100%なのに青だけ25%の宿命', false)}

          ${drawPanelBox(366, 80, 330, 254, '✅ 2026 青色PHOLED / MR-TADF ハイパー蛍光', '#2563eb', '#ffffff')}
          <!-- Jablonski RISC + FRET to narrowband ν-DABNA emitter -->
          <rect x="386" y="122" width="128" height="46" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
          <text x="450" y="142" text-anchor="middle" font-size="9.8" font-weight="900" fill="#1e40af">一重項 S₁ (25%)</text>
          <text x="450" y="158" text-anchor="middle" font-size="8.6" font-weight="700" fill="#1d4ed8">TADFアシストホスト</text>

          <rect x="386" y="206" width="128" height="46" rx="8" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
          <text x="450" y="226" text-anchor="middle" font-size="9.8" font-weight="900" fill="#5b21b6">三重項 T₁ (75%)</text>
          <text x="450" y="242" text-anchor="middle" font-size="8.6" font-weight="700" fill="#6d28d9">熱活性化RISC汲上!</text>

          <!-- Upward RISC arrow -->
          <line x1="450" y1="204" x2="450" y2="172" stroke="#7c3aed" stroke-width="3" marker-end="url(#d144-arrPurple)"/>
          <text x="488" y="191" font-size="8.8" font-weight="900" fill="#6d28d9">RISC 100%</text>

          <!-- FRET arrow to ν-DABNA deep blue emitter -->
          <line x1="518" y1="145" x2="554" y2="168" stroke="#0284c7" stroke-width="2.8" marker-end="url(#d144-arrBlue)"/>
          <rect x="558" y="132" width="122" height="106" rx="10" fill="#1d4ed8" stroke="#38bdf8" stroke-width="2.2"/>
          <text x="619" y="160" text-anchor="middle" font-size="10.4" font-weight="900" fill="#ffffff">純青 462 nm</text>
          <text x="619" y="180" text-anchor="middle" font-size="9.2" font-weight="800" fill="#bae6fd">ν-DABNA / Ir錯体</text>
          <text x="619" y="200" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fde047">IQE ≈ 100%!</text>
          <text x="619" y="220" text-anchor="middle" font-size="8.4" font-weight="700" fill="#dbeafe">FWHM &lt; 20 nm 広色域</text>

          ${drawStatusPill(386, 294, 290, '青色効率最大4倍 → 白UI・青空焼付き＆発熱を根絶', true)}
        `,
        cards: [
          { label: '75%の三重項を収穫', line1: 'これまで熱になっていた三重項励起子を', line2: 'Ir/Pt燐光やTADFのRISCで光へ完全変換' },
          { label: '純青FWHM&lt;20nm', line1: 'ハイパーフルオレッセンス(ν-DABNA)なら', line2: 'BT.2020級の鋭い純青色と高効率を両立' },
          { label: 'OLED弱点の克服', line1: '白文字UIや青空ライブビュー長時間表示の', line2: '青色劣化・消費電力を劇的に引き下げる' },
        ],
      });

    // -------------------------------------------------------------------------
    // D145: 2026 Inorganic GaN RGB MicroLED Mass-Transfer Subpixel Array
    // -------------------------------------------------------------------------
    case 'lcd_microled_gan_array':
      return wrapLcdHdSvg({
        badge: 'D145',
        title: '【2026+】無機 GaN RGB MicroLED マストランスファー画素アレイ',
        analogy: '髪の毛1/10（10μm）の本物の無機LEDを数百万粒並べた「焼付き永久ゼロ・3,000nit究極画面」',
        accent: '#f43f5e',
        accentSoft: '#fff1f2',
        body: `
          ${drawPanelBox(24, 80, 412, 254, '10 μm無機単結晶RGB MicroLEDチップ配列（開口10%・漆黒BM 90%）', '#e11d48', '#05080f')}
          <!-- Pitch-black light-absorbing matrix with glowing micro RGB chips -->
          ${[0, 1, 2]
            .map((r) =>
              [0, 1, 2, 3]
                .map((c) => {
                  const ox = 56 + c * 92;
                  const oy = 122 + r * 54;
                  return `
                    <rect x="${ox}" y="${oy}" width="76" height="40" rx="5" fill="#0f172a" stroke="#334155" stroke-width="1"/>
                    <rect x="${ox + 12}" y="${oy + 10}" width="12" height="20" rx="2" fill="#fb7185"/>
                    <rect x="${ox + 32}" y="${oy + 10}" width="12" height="20" rx="2" fill="#34d399"/>
                    <rect x="${ox + 52}" y="${oy + 10}" width="12" height="20" rx="2" fill="#38bdf8"/>
                    <rect x="${ox + 15}" y="${oy + 15}" width="6" height="10" fill="#ffffff" opacity="0.7"/>
                    <rect x="${ox + 35}" y="${oy + 15}" width="6" height="10" fill="#ffffff" opacity="0.7"/>
                    <rect x="${ox + 55}" y="${oy + 15}" width="6" height="10" fill="#ffffff" opacity="0.7"/>
                  `;
                })
                .join('')
            )
            .join('')}
          <text x="230" y="286" text-anchor="middle" font-size="9.4" font-weight="800" fill="#fde047">周囲90%が超低反射ブラックマトリクス → 炎天下でも驚異の黒締まり!</text>
          ${drawStatusPill(44, 298, 372, 'バックライト不要・液晶不要・有機劣化ゼロの最終形態', true)}

          ${drawPanelBox(452, 80, 244, 254, 'LCD vs OLED vs 2026 MicroLED', '#0284c7', '#f8fafc')}
          <rect x="468" y="114" width="212" height="36" rx="6" fill="#ffffff" stroke="#e2e8f0"/>
          <text x="478" y="130" font-size="9.2" font-weight="800" fill="#0f172a">ピーク輝度：&gt; 3,000–5,000 nit</text>
          <text x="478" y="144" font-size="8.4" font-weight="600" fill="#475569">真夏の直射日光を圧倒するHDR輝度</text>

          <rect x="468" y="156" width="212" height="36" rx="6" fill="#ffffff" stroke="#e2e8f0"/>
          <text x="478" y="172" font-size="9.2" font-weight="800" fill="#0f172a">応答速度：&lt; 10 ナノ秒 (ns)</text>
          <text x="478" y="186" font-size="8.4" font-weight="600" fill="#475569">液晶の100万倍高速・−40℃残像ゼロ</text>

          <rect x="468" y="198" width="212" height="36" rx="6" fill="#ffffff" stroke="#e2e8f0"/>
          <text x="478" y="214" font-size="9.2" font-weight="800" fill="#0f172a">焼付き耐性：無機GaN 永久ゼロ</text>
          <text x="478" y="228" font-size="8.4" font-weight="600" fill="#475569">固定UI・ヒストグラム10万時間表示OK</text>

          <rect x="468" y="240" width="212" height="36" rx="6" fill="#ecfdf5" stroke="#10b981"/>
          <text x="478" y="256" font-size="9.2" font-weight="800" fill="#065f46">転写技術：LIFTレーザー一括転写</text>
          <text x="478" y="270" font-size="8.4" font-weight="600" fill="#047857">毎秒数万チップを超精密マストランスファー</text>
          ${drawStatusPill(466, 294, 216, 'カメラ用リアモニターの到達点', true)}
        `,
        cards: [
          { label: '無機半導体の最強性能', line1: '単結晶GaN/AlGaInP 10μm自発光チップで', line2: '3,000 nit超輝度・∞:1黒・10ns応答を実現' },
          { label: '焼付き永久ゼロ', line1: '有機材料を使わないため固定カメラUIや', line2: 'グリッド線を何万時間出しても劣化なし' },
          { label: '極限環境オール対応', line1: '−40℃〜+100℃の広温度動作と90%黒枠で', line2: '極寒雪山から真夏砂漠まで完璧な視認性' },
        ],
      });

    // -------------------------------------------------------------------------
    // D146: 2026 Pixel-Level Cu-Cu Hybrid-Bonded MicroLED-to-CMOS Interconnect
    // -------------------------------------------------------------------------
    case 'lcd_microled_cucu_bond':
      return wrapLcdHdSvg({
        badge: 'D146',
        title: '【2026+】MicroLED画素直結 Cu-Cu ハイブリッドボンディング接続層',
        analogy: 'ハンダを使わず銅と銅を原子レベルで直接くっつける「ソニーセンサー直伝の2μm直結」',
        accent: '#ea580c',
        accentSoft: '#fff7ed',
        body: `
          ${drawPanelBox(24, 80, 424, 254, '2–5 μm ピッチ Cu-Cu 直接拡散ハイブリッド接合断面（ハンダ完全レス）', '#ea580c', '#ffffff')}
          <!-- Upper GaN MicroLED die wafer -->
          <rect x="44" y="114" width="384" height="44" rx="5" fill="#1e293b" stroke="#0f172a" stroke-width="1.8"/>
          <text x="236" y="133" text-anchor="middle" font-size="10.2" font-weight="900" fill="#f8fafc">GaN MicroLED 発光ダイ層（R / G / B サブ画素）</text>
          <text x="236" y="149" text-anchor="middle" font-size="8.8" font-weight="700" fill="#7dd3fc">各サブ画素直下に超平坦 CMP 銅マイクロパッド</text>

          <!-- Upper SiO2 dielectric + Cu pads -->
          <rect x="44" y="158" width="384" height="24" fill="#e0f2fe" stroke="#0284c7"/>
          <!-- Bonding seam dashed line -->
          <line x1="36" y1="182" x2="436" y2="182" stroke="#e11d48" stroke-width="2" stroke-dasharray="6 3"/>
          <text x="412" y="176" text-anchor="end" font-size="8.6" font-weight="900" fill="#e11d48">接合界面</text>
          <!-- Lower SiO2 dielectric -->
          <rect x="44" y="182" width="384" height="24" fill="#dbeafe" stroke="#0284c7"/>

          <!-- Direct Cu-Cu bonded pillars spanning across seam! -->
          ${[90, 152, 214, 276, 338]
            .map(
              (x) => `
              <rect x="${x}" y="158" width="28" height="48" rx="2" fill="url(#d146-copper)" stroke="#9a3412" stroke-width="1.5"/>
              <line x1="${x + 14}" y1="164" x2="${x + 14}" y2="200" stroke="#fef3c7" stroke-width="1.4" stroke-dasharray="2 2"/>
            `
            )
            .join('')}

          <!-- Lower CMOS / LTPS Backplane -->
          <rect x="44" y="206" width="384" height="50" rx="5" fill="#064e3b" stroke="#10b981" stroke-width="1.8"/>
          <text x="236" y="228" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">CMOS / LTPS 画素駆動バックプレーン回路</text>
          <text x="236" y="246" text-anchor="middle" font-size="8.8" font-weight="700" fill="#a7f3d0">抵抗 &lt; 0.1 Ω / 銅直結熱伝導 κ ≈ 400 W/(m·K)</text>
          ${drawStatusPill(44, 294, 384, 'ハンダ流出ショートを原理根絶 → 高PPI 3.2型MicroLEDを実現', true)}

          ${drawPanelBox(464, 80, 232, 254, '2ステップ低温接合プロセス', '#0284c7', '#f8fafc')}
          <rect x="480" y="116" width="200" height="62" rx="7" fill="#ffffff" stroke="#bae6fd"/>
          <text x="492" y="135" font-size="9.6" font-weight="800" fill="#0369a1">Step 1：常温 SiO₂ 親水接合</text>
          <text x="492" y="152" font-size="8.6" font-weight="600" fill="#334155">CMP原子平坦化した絶縁膜同士を</text>
          <text x="492" y="167" font-size="8.6" font-weight="600" fill="#334155">常温で隙間ゼロ仮固定</text>

          <rect x="480" y="188" width="200" height="62" rx="7" fill="#fff7ed" stroke="#f97316"/>
          <text x="492" y="207" font-size="9.6" font-weight="800" fill="#c2410c">Step 2：200℃ Cu膨張拡散結合</text>
          <text x="492" y="224" font-size="8.6" font-weight="600" fill="#334155">熱膨張したCuパッド同士が接触し</text>
          <text x="492" y="239" font-size="8.6" font-weight="600" fill="#334155">一体の単一銅配線へ完全金属融合</text>
          <text x="580" y="274" text-anchor="middle" font-size="8.8" font-weight="800" fill="#065f46">Exmor T積層センサー技術の水平展開</text>
          ${drawStatusPill(478, 294, 204, '2μm超微細ピッチ＆最強放熱パス', true)}
        `,
        cards: [
          { label: 'なぜハンダ不可？', line1: '2–5μmピッチではリフローハンダやACFが', line2: '隣へ流れ出してブリッジ短絡してしまう' },
          { label: 'Cu-Cu原子融合', line1: 'SiO₂常温接合＋200℃Cu膨張拡散で', line2: 'ハンダゼロ・抵抗0.1Ω未満の一括直結' },
          { label: 'ソニー技術の強み', line1: 'Exmor RS/Tイメージセンサー量産で培った', line2: 'Cu-Cuハイブリッド接合をディスプレイへ応用' },
        ],
      });

    // -------------------------------------------------------------------------
    // D147: 2026 Chip-on-Plastic (COP) 180°-Folded Polyimide Zero-Chin Bezel
    // -------------------------------------------------------------------------
    case 'lcd_cop_folded_bezel':
      return wrapLcdHdSvg({
        badge: 'D147',
        title: '【2026+】COP（Chip-on-Plastic）180°折返しポリイミド極狭ベゼル・ゼロ顎実装',
        analogy: '画面下端の太い黒いフチ（顎）を「180°裏へクルッと折り畳んで隠す」全画面マジック！',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        body: `
          ${drawPanelBox(24, 80, 326, 254, '❌ 従来ガラスCOG（硬く曲がらず顎5mm残存）', '#64748b', '#f8fafc')}
          <!-- Rigid flat glass with bottom DDIC chin -->
          <rect x="48" y="168" width="276" height="24" rx="3" fill="url(#d147-glass)" stroke="#0284c7" stroke-width="1.6"/>
          <rect x="54" y="152" width="170" height="16" rx="2" fill="#0f172a"/>
          <text x="139" y="163" text-anchor="middle" font-size="8.6" font-weight="800" fill="#38bdf8">有効表示エリア</text>
          <rect x="242" y="148" width="66" height="20" rx="3" fill="#334155" stroke="#0f172a"/>
          <text x="275" y="161" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fde047">DDIC</text>
          <!-- Dimension bracket showing 5mm wasted chin -->
          <line x1="226" y1="210" x2="322" y2="210" stroke="#e11d48" stroke-width="2.4" marker-start="url(#d147-arrRed)" marker-end="url(#d147-arrRed)"/>
          <text x="274" y="230" text-anchor="middle" font-size="10" font-weight="900" fill="#be123c">太い下辺顎 ~5.0 mm</text>
          <text x="187" y="258" text-anchor="middle" font-size="9.2" font-weight="700" fill="#475569">ボディ寸法の制約で3.2型以上に広げにくい</text>
          ${drawStatusPill(44, 294, 286, '硬質ガラスは曲げられず非表示領域が前面に露出', false)}

          ${drawPanelBox(366, 80, 330, 254, '✅ 2026 COP（ポリイミド180°U字折返し）', '#d97706', '#ffffff')}
          <!-- Active screen all the way to the right edge + 180° U-bend tucking DDIC behind! -->
          <rect x="392" y="132" width="234" height="20" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1.6"/>
          <text x="509" y="145.5" text-anchor="middle" font-size="9.2" font-weight="900" fill="#38bdf8">画面表示が端ギリギリまで拡大 (+20%!)</text>
          <!-- Flexible polyimide substrate U-bend (R=0.6mm) -->
          <path d="M 392 156 L 634 156 A 24 24 0 0 1 634 204 L 460 204" fill="none" stroke="#d97706" stroke-width="7" stroke-linecap="round"/>
          <!-- BPL Neutral-plane stress coat along bend -->
          <path d="M 634 150 A 30 30 0 0 1 634 210" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="4 2"/>
          <!-- COP DDIC tucked cleanly behind display -->
          <rect x="478" y="208" width="92" height="24" rx="4" fill="#1e293b" stroke="#0f172a" stroke-width="1.6"/>
          <text x="524" y="224" text-anchor="middle" font-size="9.2" font-weight="900" fill="#fde047">DDICを背面隠蔽!</text>
          ${drawCallout(658, 180, 560, 258, 1, '曲げ半径 R ≈ 0.6 mm', 'BPL中立面樹脂で断線ゼロ', '#059669')}
          <text x="646" y="124" text-anchor="middle" font-size="9.4" font-weight="900" fill="#059669">極狭額縁 1.3mm</text>
          ${drawStatusPill(386, 294, 290, '同じカメラ外寸のまま 3.2型 → 3.5型級へ大画面化！', true)}
        `,
        cards: [
          { label: '180°背面折りたたみ', line1: '柔軟なポリイミド基板にDDICを直載し', line2: '曲げ半径0.6mmで画面裏側へU字格納' },
          { label: '中立面BPL保護', line1: '曲げ応力ゼロの中立面に金属配線を合わせ', line2: '極小曲率でもクラック・断線を完全防止' },
          { label: '大画面カメラへの道', line1: '下辺ベゼルを5mm→1.3mmへ極限圧縮', line2: '同ボディ寸法のまま表示面積を約+20%拡大' },
        ],
      });

    // -------------------------------------------------------------------------
    // D148: 2026 On-Encapsulation Direct Touch (Y-OCTA / TOE Metal-Mesh)
    // -------------------------------------------------------------------------
    case 'lcd_yocta_toe_mesh':
      return wrapLcdHdSvg({
        badge: 'D148',
        title: '【2026+】封止上直描 Y-OCTA / TOE 薄膜メタルメッシュ・タッチ一体構造',
        analogy: '外付けタッチ板と糊を丸ごと捨て、封止膜の真上へ極細金属網を直接描く究極薄型化！',
        accent: '#14b8a6',
        accentSoft: '#f0fdfa',
        body: `
          ${drawPanelBox(24, 80, 326, 254, '❌ 従来外付け（Add-on）タッチ積層（厚く重い）', '#64748b', '#f8fafc')}
          <rect x="46" y="118" width="282" height="24" rx="4" fill="url(#d148-glass)" stroke="#0284c7"/>
          <text x="187" y="134" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0c4a6e">カバーガラス</text>
          <rect x="46" y="146" width="282" height="20" rx="3" fill="#fef3c7" stroke="#d97706"/>
          <text x="187" y="160" text-anchor="middle" font-size="8.8" font-weight="800" fill="#92400e">光学OCA糊① (50–100μm)</text>
          <rect x="46" y="170" width="282" height="26" rx="3" fill="#fee2e2" stroke="#e11d48" stroke-width="1.5"/>
          <text x="187" y="187" text-anchor="middle" font-size="9.2" font-weight="800" fill="#be123c">別体ITOタッチ基板フィルム (~100μm)</text>
          <rect x="46" y="200" width="282" height="20" rx="3" fill="#fef3c7" stroke="#d97706"/>
          <text x="187" y="214" text-anchor="middle" font-size="8.8" font-weight="800" fill="#92400e">光学OCA糊② (50μm)</text>
          <rect x="46" y="224" width="282" height="32" rx="4" fill="#1e293b"/>
          <text x="187" y="244" text-anchor="middle" font-size="9.5" font-weight="800" fill="#f8fafc">OLED + TFE 薄膜封止</text>
          ${drawStatusPill(44, 294, 286, '余分な支持板＆OCA 2層で +150〜200μm 厚い', false)}

          ${drawPanelBox(366, 80, 330, 254, '✅ 2026 Y-OCTA / TOE（TFE直上メタルメッシュ）', '#0d9488', '#ffffff')}
          <rect x="388" y="134" width="286" height="24" rx="4" fill="url(#d148-glass)" stroke="#0284c7"/>
          <text x="531" y="150" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0c4a6e">カバーガラス ＋ OCA 1層のみ！</text>
          <!-- Direct Ti/Al/Ti metal mesh patterned right onto TFE -->
          <rect x="388" y="166" width="286" height="26" rx="4" fill="#ccfbf1" stroke="#0d9488" stroke-width="2"/>
          <text x="531" y="183" text-anchor="middle" font-size="9.6" font-weight="900" fill="#115e59">⚡ Ti/Al/Ti極細メタルメッシュ直描（&lt;5Ω/□）</text>
          <rect x="388" y="196" width="286" height="22" rx="3" fill="#bae6fd" stroke="#0284c7"/>
          <text x="531" y="211" text-anchor="middle" font-size="9" font-weight="800" fill="#075985">TFE 薄膜封止（10 μm）</text>
          <rect x="388" y="222" width="286" height="32" rx="4" fill="#1e293b"/>
          <text x="531" y="242" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fde047">OLED発光層（画素間BPDL真上にメッシュ整列）</text>
          <text x="531" y="274" text-anchor="middle" font-size="9.4" font-weight="900" fill="#047857">積層厚 −150 μm / コスト −30% / 開口率損失 0%!</text>
          ${drawStatusPill(386, 294, 290, '低抵抗メッシュで240Hz高速タッチ＆軽量4軸化', true)}
        `,
        cards: [
          { label: '外付けタッチ全廃', line1: 'TFE薄膜封止の真上へ直接タッチ回路を形成', line2: 'タッチ支持フィルムとOCA層を丸ごと削減' },
          { label: 'Ti/Al/Ti極細金属網', line1: 'シート抵抗&lt;5Ω/□（ITOの1/25以下）で', line2: '画素の隙間BPDL上を通るため光遮断ゼロ' },
          { label: '軽量・高画質化', line1: '総厚−150μm・コスト−30%・界面反射減で', line2: '4軸ヒンジ負担軽減とクリアな表示を両立' },
        ],
      });

    // -------------------------------------------------------------------------
    // D149: 2026 Solid-State Piezo Localized Haptic Feedback Actuator
    // -------------------------------------------------------------------------
    case 'lcd_piezo_local_haptics':
      return wrapLcdHdSvg({
        badge: 'D149',
        title: '【2026+】画面裏 圧電（ピエゾ）局所ハプティクス触覚アクチュエータ',
        analogy: 'タッチした指先だけに1ミリ秒で「物理ボタンのカチッ！」を返す極薄セラミック振動板',
        accent: '#eab308',
        accentSoft: '#fefce8',
        body: `
          ${drawPanelBox(24, 80, 396, 254, '画面裏ツイン積層PZT＋真鍮シンバル変位拡大構造（PowerHap級）', '#ca8a04', '#ffffff')}
          <!-- Glass screen top -->
          <rect x="44" y="138" width="356" height="22" rx="4" fill="url(#d149-glass)" stroke="#0284c7" stroke-width="1.6"/>
          <text x="222" y="153" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0c4a6e">タッチパネル＋OLED表示面（局所曲げ振動伝播）</text>
          <!-- Finger touching left button zone -->
          <rect x="114" y="96" width="28" height="40" rx="14" fill="#fed7aa" stroke="#ea580c" stroke-width="1.8"/>
          <text x="194" y="120" font-size="9.6" font-weight="900" fill="#c2410c">👆 「カチッ！」1ms 鋭いクリック感</text>
          <!-- Brass cymbal dome amplifying PZT lateral contraction into crisp Z click -->
          <polygon points="84,196 108,164 152,164 176,196" fill="url(#d149-gold)" stroke="#a16207" stroke-width="1.8"/>
          <rect x="92" y="196" width="76" height="24" rx="3" fill="#475569" stroke="#0f172a" stroke-width="1.5"/>
          <text x="130" y="212" text-anchor="middle" font-size="9" font-weight="800" fill="#fef08a">積層PZT①</text>

          <polygon points="244,196 268,164 312,164 336,196" fill="url(#d149-gold)" stroke="#a16207" stroke-width="1.8"/>
          <rect x="252" y="196" width="76" height="24" rx="3" fill="#475569" stroke="#0f172a" stroke-width="1.5"/>
          <text x="290" y="212" text-anchor="middle" font-size="9" font-weight="800" fill="#fef08a">積層PZT②</text>

          <!-- Stainless carrier plate -->
          <rect x="44" y="224" width="356" height="18" rx="3" fill="url(#d149-steel)" stroke="#475569"/>
          <text x="222" y="236.5" text-anchor="middle" font-size="8.8" font-weight="800" fill="#1e293b">ステンレス反力ベースキャリア ＋ 60V昇圧ピエゾドライバ</text>
          <text x="222" y="264" text-anchor="middle" font-size="9.4" font-weight="800" fill="#854d0e">逆圧電：触覚返答（&lt;1ms） ＆ 正圧電：強押し感圧センサ兼用!</text>
          ${drawStatusPill(44, 294, 356, '変位 10–35 μm / 発生力 &gt; 5 N / 静音無音ロケ対応', true)}

          ${drawPanelBox(436, 80, 260, 254, '応答波形：従来LRA vs ピエゾ(PZT)', '#0284c7', '#f8fafc')}
          <line x1="454" y1="168" x2="678" y2="168" stroke="#94a3b8" stroke-width="1.2"/>
          <!-- Sluggish LRA motor ringing -->
          <path d="M 458 168 L 486 168 Q 502 150 516 184 Q 530 144 546 190 Q 562 152 578 182 Q 594 160 610 174 L 668 168" fill="none" stroke="#94a3b8" stroke-width="2.2" stroke-dasharray="4 2"/>
          <text x="580" y="136" text-anchor="middle" font-size="9.2" font-weight="800" fill="#64748b">従来LRA：立ち上がり 20ms（鈍い）</text>
          <!-- Crisp 1ms Piezo click pulse -->
          <polyline points="458,236 490,236 496,192 504,264 512,236 668,236" fill="none" stroke="#ca8a04" stroke-width="3.2"/>
          <text x="586" y="218" text-anchor="middle" font-size="9.8" font-weight="900" fill="#a16207">✅ ピエゾ：&lt;1.0 ms 単発クリック!</text>
          <text x="566" y="274" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">1/3 EVスライダー＆2段タッチシャッター</text>
          ${drawStatusPill(452, 294, 228, '暗所でも画面を見ず確かな指先クリック', true)}
        `,
        cards: [
          { label: '1msの超俊敏クリック', line1: '従来モーター(20ms)の15倍速い1ms応答で', line2: '本物の物理スイッチそっくりの単発クリック感' },
          { label: '感圧＋触覚の1台2役', line1: 'ピエゾ素子が押す力(正圧電)も同時検知し', line2: '誤タッチ防止の「強押しシャッター」を実現' },
          { label: 'カメラ操作の革新', line1: 'ISO/絞りタッチスライダーの1/3EV刻み感や', line2: '無音動画収録中の確かな操作フィードバック' },
        ],
      });

    // -------------------------------------------------------------------------
    // D150: 2026 Switchable Electronic Privacy / Narrow-Angle LC Louver Layer
    // -------------------------------------------------------------------------
    case 'lcd_switchable_privacy_lc':
      return wrapLcdHdSvg({
        badge: 'D150',
        title: '【2026+】電子視野角切替（ステルス／プライバシー ⇔ ワイド178°）液晶シャッター',
        analogy: 'ボタン1つで「透明ブラインド」が立ち、正面だけ鮮明・左右からは真っ暗になるステルス画面！',
        accent: '#8b5cf6',
        accentSoft: '#f5f3ff',
        body: `
          ${drawPanelBox(24, 80, 326, 254, '0 V OFF：ワイド共有モード（178° 広視野角）', '#0284c7', '#ffffff')}
          <!-- Display panel emitting wide 178° rays -->
          <rect x="52" y="226" width="270" height="22" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.6"/>
          <text x="187" y="241" text-anchor="middle" font-size="9.4" font-weight="800" fill="#7dd3fc">表示パネル本体</text>
          <!-- Transparent 0V LC louver layer -->
          <rect x="52" y="198" width="270" height="24" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
          <text x="187" y="214" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0369a1">0V 液晶ルーバー（完全透明・無損失透過）</text>
          <!-- Wide emission fan arrows -->
          <line x1="187" y1="196" x2="78" y2="122" stroke="#0284c7" stroke-width="2.4" marker-end="url(#d150-arrBlue)"/>
          <line x1="187" y1="196" x2="187" y2="112" stroke="#0284c7" stroke-width="3" marker-end="url(#d150-arrBlue)"/>
          <line x1="187" y1="196" x2="296" y2="122" stroke="#0284c7" stroke-width="2.4" marker-end="url(#d150-arrBlue)"/>
          <text x="187" y="106" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0369a1">178° 全員で構図・色確認OK</text>
          ${drawStatusPill(44, 294, 286, 'クライアント立会い・ハイ/ローアングル共有モード', true)}

          ${drawPanelBox(366, 80, 330, 254, '5 V ON：ステルス／プライバシーモード（±30°限定）', '#7c3aed', '#ffffff')}
          <rect x="394" y="226" width="274" height="22" rx="4" fill="#0f172a" stroke="#a855f7" stroke-width="1.6"/>
          <text x="531" y="241" text-anchor="middle" font-size="9.4" font-weight="800" fill="#d8b4fe">表示パネル本体</text>
          <!-- Active 5V dark vertical LC louver blades -->
          <rect x="394" y="198" width="274" height="24" rx="4" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.8"/>
          ${[414, 438, 462, 486, 510, 534, 558, 582, 606, 630, 650]
            .map((lx) => `<rect x="${lx}" y="199" width="6" height="22" fill="#3b0764"/>`)
            .join('')}
          <!-- Center passes cleanly; oblique ±45° rays blocked <2%! -->
          <line x1="531" y1="196" x2="531" y2="112" stroke="#7c3aed" stroke-width="3.2" marker-end="url(#d150-arrPurple)"/>
          <text x="531" y="106" text-anchor="middle" font-size="9.8" font-weight="900" fill="#5b21b6">正面の撮影者のみ鮮明 (±30°)</text>
          <line x1="486" y1="196" x2="436" y2="156" stroke="#e11d48" stroke-width="2" stroke-dasharray="3 2"/>
          <text x="424" y="148" text-anchor="middle" font-size="9.2" font-weight="900" fill="#be123c">✕ 45°遮断(&lt;2%)</text>
          <line x1="576" y1="196" x2="626" y2="156" stroke="#e11d48" stroke-width="2" stroke-dasharray="3 2"/>
          <text x="638" y="148" text-anchor="middle" font-size="9.2" font-weight="900" fill="#be123c">✕ 45°遮断(&lt;2%)</text>
          ${drawStatusPill(386, 294, 290, '切替 &lt;20ms：暗い劇場・舞台・夜間野生撮影の光漏れ撲滅', true)}
        `,
        cards: [
          { label: '0V⇔5V電子切替', line1: '通常は完全透明で178°画質をそのまま通し', line2: '5V印加で20ms未満に縦液晶ルーバー起動' },
          { label: '斜め45°輝度&lt;2%', line1: '暗いコンサート・舞台・夜間動物撮影で', line2: '横の観客や動物へ漏れる画面光を完全遮断' },
          { label: '貼るフィルタ不要', line1: '物理覗き見防止シートの常時暗さから解放', line2: 'カスタムボタン1押しでプロ現場へ即応' },
        ],
      });

    default:
      return null;
  }
}
