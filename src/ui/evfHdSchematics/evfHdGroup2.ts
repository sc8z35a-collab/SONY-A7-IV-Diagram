import { PartExplanation } from '../../assemblies/types';
import {
  drawCallout,
  drawRaindrop,
  drawStatusPill,
  drawSunIcon,
  wrapEvfHdSvg,
} from './shared';

/**
 * Ultra-HD 720x470 Beginner-Friendly Technical Infographics — Group 2 (E19–E35)
 */
export function renderEvfHdGroup2(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // =========================================================================
    // E19. 内蔵アイピース遮光シャッター幕 ＆ サイドスライドレバー機構
    // =========================================================================
    case 'evf_eyepiece_shutter':
      return wrapEvfHdSvg({
        badge: 'E19',
        title: '内蔵アイピース遮光シャッター幕 ＆ サイドスライドレバー',
        analogy: '太陽の虫眼鏡焼けと夜の迷光を一発で防ぐ「ファインダー内蔵の遮光カーテン」',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: OPEN state (normal shooting) -->
          <rect x="24" y="84" width="208" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="128" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#0369a1">通常撮影時：幕オープン</text>
          <rect x="52" y="124" width="152" height="114" rx="10" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
          <rect x="64" y="136" width="128" height="90" rx="6" fill="url(#e19-oled)"/>
          <!-- Retracted left & right blades -->
          <rect x="64" y="136" width="14" height="90" fill="#0f172a"/>
          <rect x="178" y="136" width="14" height="90" fill="#0f172a"/>
          <text x="128" y="186" text-anchor="middle" font-size="12" font-weight="900" fill="#ffffff">全画面クリア!</text>
          <!-- Side lever UP -->
          <rect x="210" y="142" width="12" height="32" rx="4" fill="url(#e19-steel)" stroke="#475569"/>
          <text x="128" y="264" text-anchor="middle" font-size="10.8" font-weight="700" fill="#334155">レバーを上げるだけ</text>
          <text x="128" y="284" text-anchor="middle" font-size="10.2" font-weight="600" fill="#64748b">防曇窓(E03)の直後1.2mmの</text>
          <text x="128" y="302" text-anchor="middle" font-size="10.2" font-weight="600" fill="#64748b">極薄スキマへスッと格納</text>

          <!-- Center arrow -->
          <line x1="238" y1="184" x2="266" y2="184" stroke="#475569" stroke-width="3" marker-end="url(#e19-arrSlate)"/>

          <!-- Center: CLOSED state (1.5mm overlap blackout) -->
          <rect x="272" y="84" width="208" height="248" rx="11" fill="#f8fafc" stroke="#475569" stroke-width="1.4"/>
          <text x="376" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">三脚・放置時：幕クローズ</text>
          <rect x="300" y="124" width="152" height="114" rx="10" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
          <!-- Two matte-black shutter curtains overlapping by 1.5mm at center! -->
          <rect x="312" y="136" width="68" height="90" fill="#0f172a" stroke="#475569" stroke-width="1.2"/>
          <rect x="372" y="136" width="68" height="90" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
          <rect x="372" y="136" width="8" height="90" fill="#eab308" fill-opacity="0.35"/>
          <text x="376" y="180" text-anchor="middle" font-size="11.5" font-weight="900" fill="#f8fafc">完全遮光!</text>
          <text x="376" y="198" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fde047">中央1.5mm重なり</text>
          <!-- Side lever DOWN -->
          <rect x="458" y="194" width="12" height="32" rx="4" fill="#ea580c" stroke="#9a3412"/>
          <text x="376" y="264" text-anchor="middle" font-size="10.8" font-weight="800" fill="#b45309">左右から両開きで密着!</text>
          <text x="376" y="284" text-anchor="middle" font-size="10.2" font-weight="600" fill="#475569">光漏れゼロの重なり構造で</text>
          <text x="376" y="302" text-anchor="middle" font-size="10.2" font-weight="600" fill="#475569">1粒の光も奥へ通さない</text>

          <!-- Right: 2 Critical Real-World Protections -->
          <rect x="494" y="84" width="198" height="118" rx="10" fill="#fff7ed" stroke="#fdba74" stroke-width="1.3"/>
          ${drawSunIcon(522, 114, 9)}
          <text x="544" y="116" font-size="11.5" font-weight="800" fill="#9a3412">太陽の虫眼鏡焼損を防御</text>
          <text x="506" y="146" font-size="10.2" font-weight="600" fill="#334155">接眼レンズが虫眼鏡のように</text>
          <text x="506" y="164" font-size="10.2" font-weight="600" fill="#334155">太陽光を集めてOLEDを焦がす</text>
          <text x="506" y="182" font-size="10.2" font-weight="800" fill="#c2410c">事故をシャッターで100%防止!</text>

          <rect x="494" y="214" width="198" height="118" rx="10" fill="#eef2ff" stroke="#a5b4fc" stroke-width="1.3"/>
          <text x="506" y="238" font-size="11.5" font-weight="800" fill="#312e81">🌌 星空・夜景の長秒露出</text>
          <text x="506" y="264" font-size="10.2" font-weight="600" fill="#334155">三脚で目を離して撮るとき、</text>
          <text x="506" y="282" font-size="10.2" font-weight="600" fill="#334155">後ろの街灯やスマホ光が逆流</text>
          <text x="506" y="300" font-size="10.2" font-weight="800" fill="#4338ca">する露出ムラをピタッと遮断!</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'レバー操作で接眼窓の裏側を閉じる', line2: '両開き式の内蔵ブラックシャッター' },
          { label: 'スゴい工夫・秘密', line1: '隙間1.2mmの薄型空間に収まり', line2: '中央1.5mmオーバーラップで光漏れ0' },
          { label: '撮影でどう嬉しい？', line1: '屋外三脚待機中のOLED太陽焼けや', line2: '天体撮影の迷光カブリを完全防止！' },
        ],
      });

    // =========================================================================
    // E20. 視線入力AF 850nm 狭帯域バンドパスフィルター ＆ 非球面IRリレー結像鏡筒
    // =========================================================================
    case 'evf_gaze_ir_optics':
      return wrapEvfHdSvg({
        badge: 'E20',
        title: '視線入力AF 850nm 狭帯域バンドパスフィルター ＆ IRリレー鏡筒',
        analogy: '太陽の雑音光を99.99%弾き850nmだけ通す「VIP専用の赤外線関所」',
        accent: '#be123c',
        accentSoft: '#fff1f2',
        body: `
          <!-- Left: Spectral Transmittance Graph (400nm - 1000nm) -->
          <rect x="24" y="84" width="372" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="210" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#881337">📊 光の選別グラフ（OD4+ ＝ 不要光を 99.99% カット!）</text>

          <!-- Graph Axes -->
          <line x1="60" y1="274" x2="372" y2="274" stroke="#475569" stroke-width="1.8"/>
          <line x1="60" y1="126" x2="60" y2="274" stroke="#475569" stroke-width="1.8"/>
          <text x="52" y="140" text-anchor="end" font-size="9.5" font-weight="700" fill="#475569">100%</text>
          <text x="52" y="274" text-anchor="end" font-size="9.5" font-weight="700" fill="#475569">0%</text>

          <!-- Visible light sunlight zone (BLOCKED!) -->
          <rect x="64" y="136" width="184" height="136" fill="url(#e20-oled)" fill-opacity="0.16"/>
          <text x="156" y="164" text-anchor="middle" font-size="11" font-weight="800" fill="#64748b">可視光 (400〜700nm)</text>
          <text x="156" y="184" text-anchor="middle" font-size="11" font-weight="900" fill="#e11d48">❌ 99.99% ブロック!</text>

          <!-- Sharp 850nm ± 18nm bandpass spike! -->
          <path d="M 62 272 L 268 272 L 284 136 L 316 136 L 332 272 L 368 272" fill="#fb7185" fill-opacity="0.32" stroke="#e11d48" stroke-width="3" stroke-linejoin="round"/>
          <text x="300" y="130" text-anchor="middle" font-size="11" font-weight="900" fill="#be123c">850nm±18nm だけ通過!</text>

          <!-- X-axis wavelength labels -->
          <text x="72" y="290" font-size="9.5" font-weight="700" fill="#64748b">400</text>
          <text x="154" y="290" font-size="9.5" font-weight="700" fill="#64748b">600</text>
          <text x="234" y="290" font-size="9.5" font-weight="700" fill="#64748b">750</text>
          <text x="300" y="290" text-anchor="middle" font-size="10.5" font-weight="900" fill="#be123c">850nm</text>
          <text x="356" y="290" font-size="9.5" font-weight="700" fill="#64748b">950</text>
          <text x="210" y="316" text-anchor="middle" font-size="10.2" font-weight="700" fill="#334155">アイセンサー(940nm)や太陽光ノイズも完全分離</text>

          <!-- Right: Vertical Optical Cross-Section of BPF + Molded IR Aspheric Relay Barrel -->
          <rect x="412" y="84" width="280" height="248" rx="11" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          <text x="552" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#881337">IRリレー結像鏡筒の断面</text>

          <!-- Mixed sunlight + 850nm IR coming down from top -->
          <line x1="484" y1="118" x2="484" y2="150" stroke="#f59e0b" stroke-width="2.4" marker-end="url(#e20-arrAmber)"/>
          <line x1="552" y1="118" x2="552" y2="152" stroke="#e11d48" stroke-width="2.8" stroke-dasharray="4 2" marker-end="url(#e20-arrRed)"/>
          <text x="456" y="138" text-anchor="middle" font-size="9.5" font-weight="800" fill="#b45309">太陽光❌</text>
          <text x="614" y="138" text-anchor="middle" font-size="9.8" font-weight="800" fill="#be123c">850nm瞳像✅</text>

          <!-- Black optical barrel housing -->
          <rect x="488" y="156" width="128" height="122" rx="10" fill="url(#e20-mg)" stroke="#0f172a" stroke-width="1.8"/>
          <rect x="504" y="160" width="96" height="114" fill="#ffffff"/>
          <!-- Narrowband 850nm BPF filter plate -->
          <rect x="504" y="160" width="96" height="16" fill="#be123c"/>
          <text x="552" y="172" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">850nm BPF (OD4+)</text>
          <!-- Molded aspheric IR lens -->
          <path d="M 510 202 Q 552 182 594 202 Q 552 224 510 202 Z" fill="url(#e20-glass)" stroke="#0284c7" stroke-width="1.8"/>
          <text x="552" y="206" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0c4a6e">非球面IRレンズ</text>
          <!-- Converging 850nm rays onto sensor below -->
          <line x1="524" y1="210" x2="546" y2="270" stroke="#e11d48" stroke-width="2.2"/>
          <line x1="580" y1="210" x2="558" y2="270" stroke="#e11d48" stroke-width="2.2"/>
          <!-- Bottom 307K NIR CMOS sensor -->
          <rect x="514" y="274" width="76" height="24" rx="4" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.6"/>
          <text x="552" y="290" text-anchor="middle" font-size="9.5" font-weight="800" fill="#e0e7ff">視線センサー E07</text>
          <text x="552" y="318" text-anchor="middle" font-size="10.2" font-weight="800" fill="#881337">角膜輝点の検出誤差 &lt; 0.3° を実現!</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '850nm赤外線だけを通過させ、', line2: '瞳の像を視線センサーへくっきり結ぶ' },
          { label: 'スゴい工夫・秘密', line1: 'OD4+(99.99%遮断)の狭帯域フィルタと', line2: '850nm専用設計の非球面リレーレンズ' },
          { label: '撮影でどう嬉しい？', line1: '真夏の強い逆光や屋外でも誤動作せず', line2: '視線入力AFが安定して瞳を追い続ける' },
        ],
      });

    // =========================================================================
    // E21. プッシュロック式 視度調整ダイヤル・スターラチェットクラッチ ＆ ボールデテント機構
    // =========================================================================
    case 'evf_diopter_lock':
      return wrapEvfHdSvg({
        badge: 'E21',
        title: 'プッシュロック式 視度ダイヤル・スターラチェットクラッチ',
        analogy: '引っ張って回し押し込んでロックする「高級腕時計のリューズ安全機構」',
        accent: '#0369a1',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: PUSHED IN (LOCKED state) -->
          <rect x="24" y="84" width="328" height="248" rx="11" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.3"/>
          ${drawStatusPill(42, 94, 214, '押し込み状態（通常撮影＝ロック🔒）', true)}

          <!-- Fixed housing star ratchet teeth (24-tooth) -->
          <path d="M 106 142 L 136 142 L 146 154 L 136 166 L 146 178 L 136 190 L 146 202 L 136 214 L 146 226 L 136 238 L 106 238 Z" fill="url(#e21-steel)" stroke="#475569" stroke-width="1.6"/>
          <!-- Mating dial star ratchet meshed tightly! -->
          <path d="M 148 142 L 138 154 L 148 166 L 138 178 L 148 190 L 138 202 L 148 214 L 138 226 L 148 238 L 222 238 L 222 142 Z" fill="url(#e21-mg)" stroke="#0f172a" stroke-width="1.8" filter="url(#e21-sh)"/>
          <text x="186" y="194" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">完全噛合!</text>
          <text x="186" y="210" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fde047">24歯スターギア</text>
          <!-- Push inward arrow -->
          <line x1="278" y1="190" x2="232" y2="190" stroke="#059669" stroke-width="3" marker-end="url(#e21-arrGreen)"/>
          <text x="284" y="178" text-anchor="middle" font-size="10.5" font-weight="800" fill="#059669">← 押し込む</text>
          <text x="188" y="274" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">物理的に歯が噛み合い回転不能！</text>
          <text x="188" y="296" text-anchor="middle" font-size="10.2" font-weight="600" fill="#475569">バッグの擦れ・首掛け時の接触でも</text>
          <text x="188" y="314" text-anchor="middle" font-size="10.2" font-weight="600" fill="#475569">視度が勝手に動く事故を 0 に防止</text>

          <!-- Right: PULLED OUT (ADJUST state with dual ball detents) -->
          <rect x="368" y="84" width="324" height="248" rx="11" fill="#eff6ff" stroke="#60a5fa" stroke-width="1.4"/>
          ${drawStatusPill(386, 94, 232, '引き出し状態（視度調整＝クリック🔄）', true)}

          <!-- Fixed teeth -->
          <path d="M 398 142 L 428 142 L 438 154 L 428 166 L 438 178 L 428 190 L 438 202 L 428 214 L 438 226 L 428 238 L 398 238 Z" fill="url(#e21-steel)" stroke="#475569" stroke-width="1.6"/>
          <!-- Pulled-out dial disengaged cleanly (gap shown!) -->
          <path d="M 488 142 L 478 154 L 488 166 L 478 178 L 488 190 L 478 202 L 488 214 L 478 226 L 488 238 L 564 238 L 564 142 Z" fill="url(#e21-mg)" stroke="#0284c7" stroke-width="2" filter="url(#e21-sh)"/>
          <!-- Disengagement gap highlight -->
          <line x1="440" y1="190" x2="476" y2="190" stroke="#0284c7" stroke-width="2.2" marker-start="url(#e21-arrBlue)" marker-end="url(#e21-arrBlue)"/>
          <text x="458" y="176" text-anchor="middle" font-size="9.5" font-weight="900" fill="#0369a1">離脱!</text>

          <!-- Dual steel ball detents + CuBe2 springs top & bottom -->
          <circle cx="526" cy="138" r="7" fill="url(#e21-steel)" stroke="#0284c7" stroke-width="1.8"/>
          <circle cx="526" cy="242" r="7" fill="url(#e21-steel)" stroke="#0284c7" stroke-width="1.8"/>
          <text x="620" y="156" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0369a1">対向鋼球デテント</text>
          <text x="620" y="172" text-anchor="middle" font-size="9.5" font-weight="700" fill="#475569">(0.25m⁻¹×全28段)</text>
          <!-- Pull outward & rotate arrow -->
          <line x1="572" y1="194" x2="612" y2="194" stroke="#d97706" stroke-width="3" marker-end="url(#e21-arrAmber)"/>
          <text x="626" y="216" text-anchor="middle" font-size="10.5" font-weight="800" fill="#b45309">引き出して回す →</text>

          <text x="530" y="276" text-anchor="middle" font-size="11" font-weight="800" fill="#1e3a8a">「カチッ、カチッ」と精密クリック！</text>
          <text x="530" y="298" text-anchor="middle" font-size="10.2" font-weight="600" fill="#334155">2点の鋼球とベリリウム銅バネで</text>
          <text x="530" y="316" text-anchor="middle" font-size="10.2" font-weight="600" fill="#334155">0.25ディオプター刻みの極上操作感</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '視度ダイヤルを押し込んで固定し、', line2: '引き出した時だけ回せる安全クラッチ' },
          { label: 'スゴい工夫・秘密', line1: '24歯スターラチェット＋2点鋼球で', line2: '誤回転ゼロと全28段の心地よいクリック' },
          { label: '撮影でどう嬉しい？', line1: '撮影中に服やバッグと擦れても', line2: 'ピントがズレるイライラが完全消滅！' },
        ],
      });

    // =========================================================================
    // E22. 直線偏光板 ＋ λ/4 波長板 コンボ反射防止フィルター（OLED背面ゴースト消去層）
    // =========================================================================
    case 'evf_polarizer_qwp':
      return wrapEvfHdSvg({
        badge: 'E22',
        title: '直線偏光板 ＋ λ/4 波長板 コンボ反射防止フィルター',
        analogy: '外から入った光をUターン出口で完全に閉じ込める「光のマジック一方通行ドア」',
        accent: '#4f46e5',
        accentSoft: '#eef2ff',
        body: `
          <!-- Optical stack left to right: External Light -> Linear Polarizer -> QWP (λ/4) -> OLED Mirror -->
          <text x="360" y="96" text-anchor="middle" font-size="12.2" font-weight="800" fill="#312e81">✨ どうして外光のイヤな反射（ゴースト）が 99.5% 消えるの？</text>

          <!-- Vertical optical layers -->
          <!-- Layer 1: Linear Polarizer (Vertical slit ↕) -->
          <rect x="206" y="114" width="34" height="200" rx="5" fill="#312e81" stroke="#1e1b4b" stroke-width="1.8" filter="url(#e22-sh)"/>
          <text x="223" y="218" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff" transform="rotate(-90, 223, 218)">直線偏光板（縦 ↕ のみ通す）</text>

          <!-- Layer 2: Quarter-Wave Plate (λ/4) -->
          <rect x="358" y="114" width="36" height="200" rx="5" fill="url(#e22-ar)" stroke="#6d28d9" stroke-width="1.8" filter="url(#e22-sh)"/>
          <text x="376" y="218" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff" transform="rotate(-90, 376, 218)">λ/4 波長板（回転へ変換）</text>

          <!-- Layer 3: Reflective OLED Metal Anode -->
          <rect x="526" y="114" width="28" height="200" rx="5" fill="url(#e22-steel)" stroke="#334155" stroke-width="2" filter="url(#e22-sh)"/>
          <text x="540" y="218" text-anchor="middle" font-size="11" font-weight="900" fill="#0f172a" transform="rotate(-90, 540, 218)">OLED 金属反射面</text>

          <!-- INCOMING EXTERNAL STRAY SUNLIGHT (Top Path, moving Right ->) -->
          ${drawSunIcon(54, 152, 11)}
          <text x="54" y="182" text-anchor="middle" font-size="10" font-weight="800" fill="#c2410c">逆流外光</text>
          <line x1="76" y1="152" x2="200" y2="152" stroke="#f59e0b" stroke-width="3" marker-end="url(#e22-arrAmber)"/>
          <text x="140" y="142" text-anchor="middle" font-size="10" font-weight="800" fill="#b45309">① いろんな向きの波</text>

          <!-- After Linear Polarizer -> Vertical ↕ wave -->
          <line x1="244" y1="152" x2="352" y2="152" stroke="#0284c7" stroke-width="3" marker-end="url(#e22-arrBlue)"/>
          <text x="298" y="140" text-anchor="middle" font-size="11" font-weight="900" fill="#0369a1">② 縦波 ↕ だけ通過</text>

          <!-- After λ/4 QWP -> Right-handed circular ↻ wave -->
          <line x1="398" y1="152" x2="520" y2="152" stroke="#7c3aed" stroke-width="3" marker-end="url(#e22-arrPurple)"/>
          <text x="459" y="140" text-anchor="middle" font-size="11" font-weight="900" fill="#6d28d9">③ 右回り ↻ に変化</text>

          <!-- REFLECTION AT OLED MIRROR: Flips rotation ↻ -> ↺ !! -->
          <path d="M 526 154 C 508 178 508 228 526 254" fill="none" stroke="#e11d48" stroke-width="3" marker-end="url(#e22-arrRed)"/>
          <rect x="564" y="176" width="128" height="62" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.4"/>
          <text x="628" y="198" text-anchor="middle" font-size="11" font-weight="900" fill="#9f1239">④ 鏡反射で逆回転!</text>
          <text x="628" y="216" text-anchor="middle" font-size="10" font-weight="700" fill="#881337">右回り ↻ → 左回り ↺</text>
          <text x="628" y="230" text-anchor="middle" font-size="9.5" font-weight="700" fill="#be123c">(ここが最大の魔法!)</text>

          <!-- RETURN PATH (Bottom Path, moving Left <-) -->
          <!-- Left-handed ↺ -> through λ/4 QWP -> becomes HORIZONTAL ↔ !! -->
          <line x1="522" y1="256" x2="400" y2="256" stroke="#e11d48" stroke-width="3" marker-end="url(#e22-arrRed)"/>
          <text x="459" y="276" text-anchor="middle" font-size="11" font-weight="900" fill="#be123c">⑤ 左回り ↺ で戻る</text>

          <line x1="354" y1="256" x2="256" y2="256" stroke="#dc2626" stroke-width="3.2" marker-end="url(#e22-arrRed)"/>
          <text x="305" y="282" text-anchor="middle" font-size="10.5" font-weight="900" fill="#dc2626">⑥ 横波 ↔ に90°回転!</text>

          <!-- BLOCKED at vertical Linear Polarizer! -->
          <circle cx="238" cy="256" r="16" fill="#fee2e2" stroke="#dc2626" stroke-width="2.6"/>
          <text x="238" y="261" text-anchor="middle" font-size="14" font-weight="900" fill="#dc2626">✕</text>
          <rect x="26" y="232" width="168" height="58" rx="9" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
          <text x="110" y="254" text-anchor="middle" font-size="11" font-weight="900" fill="#14532d">✅ 出口で 99.5% ブロック!</text>
          <text x="110" y="274" text-anchor="middle" font-size="10" font-weight="700" fill="#166534">縦の隙間を横波は通れず消滅!</text>
          <text x="110" y="328" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0369a1">※ 一方、OLED本来の映像光は素通り!</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '目の側から逆流した外光がOLEDに', line2: '反射して戻るゴーストを消す円偏光板' },
          { label: 'スゴい工夫・秘密', line1: '反射の瞬間に光の回転が逆転する', line2: '物理法則で外光反射を99.5%以上カット' },
          { label: '撮影でどう嬉しい？', line1: 'メガネ越しや晴天時でも画面が白く', line2: '霞まず、漆黒のコントラストを維持！' },
        ],
      });

    // =========================================================================
    // E23. Micro-OLED オンチップ六角マイクロレンズアレイ (MLA) ＆ 薄膜封止 (TFE) ＋ RGB CF
    // =========================================================================
    case 'evf_oled_mla':
      return wrapEvfHdSvg({
        badge: 'E23',
        title: 'オンチップ六角マイクロレンズアレイ (MLA) ＆ 薄膜封止 (TFE)',
        analogy: '1画素ごとの電球に超極小の虫眼鏡を載せた「2倍明るくする光の集光ドーム」',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: NG Without MLA (wide rays wasted!) vs Center: OK With Hexagonal MLA (2.2x brighter!) -->
          <rect x="24" y="84" width="212" height="248" rx="11" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          ${drawStatusPill(40, 92, 180, 'MLAなし：斜め光が無駄に', false)}
          <!-- Flat top pixel -->
          <rect x="64" y="226" width="132" height="22" rx="3" fill="#22c55e"/>
          <rect x="64" y="250" width="132" height="26" rx="3" fill="#fde047" stroke="#ca8a04"/>
          <text x="130" y="267" text-anchor="middle" font-size="10" font-weight="800" fill="#713f12">OLED 発光画素</text>
          <!-- Rays scattering sideways & lost! -->
          <line x1="130" y1="226" x2="130" y2="146" stroke="#16a34a" stroke-width="2.6" marker-end="url(#e23-arrGreen)"/>
          <line x1="130" y1="226" x2="54" y2="178" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#e23-arrRed)"/>
          <line x1="130" y1="226" x2="206" y2="178" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#e23-arrRed)"/>
          <text x="130" y="302" text-anchor="middle" font-size="10.5" font-weight="800" fill="#9f1239">横へ逃げた光は目に届かず</text>
          <text x="130" y="318" text-anchor="middle" font-size="10.2" font-weight="600" fill="#881337">電池ばかり食って暗い…</text>

          <!-- Center: OK With On-Chip Hexagonal MLA + Symmetrical OCCF + ALD TFE -->
          <rect x="248" y="84" width="256" height="248" rx="11" fill="#f0fdf4" stroke="#86efac" stroke-width="1.4"/>
          ${drawStatusPill(264, 92, 224, 'MLA＋TFE＋OCCF：正面光 2.2倍!', true)}

          <!-- Focused parallel rays straight upward to Eye! -->
          <line x1="340" y1="168" x2="340" y2="122" stroke="#0284c7" stroke-width="2.8" marker-end="url(#e23-arrBlue)"/>
          <line x1="376" y1="160" x2="376" y2="122" stroke="#10b981" stroke-width="3" marker-end="url(#e23-arrGreen)"/>
          <line x1="412" y1="168" x2="412" y2="122" stroke="#0284c7" stroke-width="2.8" marker-end="url(#e23-arrBlue)"/>

          <!-- Sculpted On-Chip Microlens Dome -->
          <path d="M 314 196 Q 376 138 438 196 Z" fill="url(#e23-glass)" stroke="#0284c7" stroke-width="2" filter="url(#e23-sh)"/>
          <text x="376" y="185" text-anchor="middle" font-size="10" font-weight="900" fill="#0c4a6e">オンチップMLA</text>
          <!-- Symmetrical OCCF Color Filter -->
          <rect x="314" y="198" width="124" height="22" rx="3" fill="#22c55e" stroke="#15803d"/>
          <text x="376" y="213" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">対称OCCF カラーフィルタ</text>
          <!-- ALD Inorganic/Organic TFE Hermetic Barrier -->
          <rect x="314" y="222" width="124" height="14" rx="2" fill="#a855f7"/>
          <text x="376" y="233" text-anchor="middle" font-size="8.8" font-weight="800" fill="#ffffff">ALD薄膜封止 (水分0!)</text>
          <!-- OLED Emitter -->
          <rect x="314" y="238" width="124" height="26" rx="3" fill="#fde047" stroke="#ca8a04"/>
          <text x="376" y="255" text-anchor="middle" font-size="10" font-weight="800" fill="#713f12">OLED 発光画素 (6.3μm)</text>
          <!-- Bent wide rays gathered inside dome! -->
          <path d="M 376 238 L 336 186 L 340 168" fill="none" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="3 2"/>
          <path d="M 376 238 L 416 186 L 412 168" fill="none" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="3 2"/>
          <text x="376" y="294" text-anchor="middle" font-size="10.8" font-weight="800" fill="#14532d">斜めの光を正面へギュッと集光!</text>
          <text x="376" y="314" text-anchor="middle" font-size="10.2" font-weight="700" fill="#166534">同じ電力で明るさ 1.8〜2.2倍 ＆ 省エネ!</text>

          <!-- Right: Top-down Hexagonal Close-Packed MLA Honeycomb View -->
          <rect x="518" y="84" width="174" height="248" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="605" y="106" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0369a1">真上から見た六角配列</text>
          <!-- Close-packed RGB hexagonal domes -->
          ${[
            [572, 152, '#ef4444', 'R'],
            [612, 152, '#22c55e', 'G'],
            [652, 152, '#3b82f6', 'B'],
            [552, 186, '#3b82f6', 'B'],
            [592, 186, '#ef4444', 'R'],
            [632, 186, '#22c55e', 'G'],
            [572, 220, '#22c55e', 'G'],
            [612, 220, '#3b82f6', 'B'],
            [652, 220, '#ef4444', 'R'],
          ]
            .map(
              ([cx, cy, col, lbl]) => `
              <circle cx="${cx}" cy="${cy}" r="18" fill="${col}" fill-opacity="0.24" stroke="${col}" stroke-width="1.8"/>
              <circle cx="${Number(cx) - 4}" cy="${Number(cy) - 4}" r="5" fill="#ffffff" opacity="0.8"/>
              <text x="${cx}" y="${Number(cy) + 4}" text-anchor="middle" font-size="10" font-weight="900" fill="${col}">${lbl}</text>`
            )
            .join('')}
          <text x="605" y="268" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0f172a">ハチの巣（六角最密）配置</text>
          <text x="605" y="288" text-anchor="middle" font-size="10" font-weight="600" fill="#475569">隙間を極限まで減らし</text>
          <text x="605" y="306" text-anchor="middle" font-size="10" font-weight="600" fill="#475569">4,000 ppi超＆DCI-P3達成</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '画素1粒ごとに極小レンズを載せ、', line2: '湿気を遮断しつつ光を正面へ集める層' },
          { label: 'スゴい工夫・秘密', line1: '六角最密MLA＋原子層蒸着TFE封止で', line2: '同じ消費電力のまま明るさ最大2.2倍' },
          { label: '撮影でどう嬉しい？', line1: 'バッテリー長持ち＆発熱も少ないのに', line2: '雪原や逆光でもクッキリ高輝度表示！' },
        ],
      });

    // =========================================================================
    // E24. 240Hz MIPI-DSI TCON 専用 RF EMI シールド缶 ＆ ベリリウム銅接地クリップ枠
    // =========================================================================
    case 'evf_tcon_emi':
      return wrapEvfHdSvg({
        badge: 'E24',
        title: '240Hz TCON 専用 RF EMI シールド缶 ＆ 接地クリップ枠',
        analogy: '超高速回路の電波漏れを閉じ込める「電子レンジの金網みたいな金属カバー」',
        accent: '#64748b',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Cross-section of Stamped Cu-Ni-Zn Faraday Cage + Thermal Window + BeCu Ground Clips -->
          <!-- Top protected neighbors (Audio Mic, Wi-Fi 6E / GNSS) -->
          <rect x="44" y="84" width="184" height="44" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.4"/>
          <text x="136" y="104" text-anchor="middle" font-size="11" font-weight="800" fill="#065f46">🎙️ 上部MIシュー音声マイク</text>
          <text x="136" y="120" text-anchor="middle" font-size="9.5" font-weight="700" fill="#047857">ノイズ混入 ゼロ！</text>

          <rect x="246" y="84" width="184" height="44" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.4"/>
          <text x="338" y="104" text-anchor="middle" font-size="11" font-weight="800" fill="#1e40af">📡 Wi-Fi 6E / Bluetooth / GPS</text>
          <text x="338" y="120" text-anchor="middle" font-size="9.5" font-weight="700" fill="#1d4ed8">電波干渉を 35dB 以上遮断！</text>

          <!-- Stamped Nickel-Silver (Cu-Ni-Zn) RF Faraday Shield Can with Thermal Window! -->
          <path d="M 64 268 L 64 156 L 188 156 L 188 168 L 288 168 L 288 156 L 412 156 L 412 268" fill="none" stroke="url(#e24-steel)" stroke-width="14" stroke-linejoin="round" filter="url(#e24-sh)"/>
          <path d="M 64 268 L 64 156 L 188 156 M 288 156 L 412 156 L 412 268" fill="none" stroke="#475569" stroke-width="1.8"/>

          <!-- Thermal TIM Window in center roof letting HEAT escape upward! -->
          <rect x="192" y="152" width="92" height="24" rx="4" fill="#38bdf8" stroke="#0284c7" stroke-width="1.6"/>
          <text x="238" y="168" text-anchor="middle" font-size="9.5" font-weight="900" fill="#0c4a6e">放熱TIM窓</text>
          <line x1="238" y1="194" x2="238" y2="134" stroke="#ea580c" stroke-width="2.6" marker-end="url(#e24-arrAmber)"/>

          <!-- High-speed 240Hz TCON IC emitting trapped RF waves inside can -->
          <rect x="172" y="218" width="132" height="44" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="1.8"/>
          <text x="238" y="244" text-anchor="middle" font-size="11.5" font-weight="900" fill="#38bdf8">240Hz TCON IC</text>

          <!-- Trapped RF waves bouncing back inside Faraday cage -->
          <path d="M 164 226 Q 112 206 86 184 L 116 208" fill="none" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#e24-arrRed)"/>
          <path d="M 312 226 Q 364 206 390 184 L 360 208" fill="none" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#e24-arrRed)"/>
          <text x="122" y="236" text-anchor="middle" font-size="9.8" font-weight="800" fill="#be123c">高周波RFを封じ込め!</text>

          <!-- Emerald PCB base + BeCu grounding clip teeth -->
          <rect x="44" y="268" width="388" height="22" rx="4" fill="url(#e24-pcb)" stroke="#064e3b" stroke-width="1.6"/>
          <rect x="54" y="256" width="20" height="16" rx="3" fill="url(#e24-brass)" stroke="#92400e"/>
          <rect x="402" y="256" width="20" height="16" rx="3" fill="url(#e24-brass)" stroke="#92400e"/>
          <text x="238" y="283" text-anchor="middle" font-size="10" font-weight="800" fill="#d1fae5">TCON 8層基板 ＋ GND接地ライン</text>
          <text x="238" y="314" text-anchor="middle" font-size="10.5" font-weight="800" fill="#92400e">⚡ ベリリウム銅(BeCu)クリップで基板GNDへ逃がす!</text>

          <!-- Right explanation panel -->
          <rect x="454" y="84" width="238" height="248" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="468" y="108" font-size="12" font-weight="800" fill="#0f172a">3つの賢いシールド設計</text>
          ${drawCallout(412, 168, 482, 144, 1, '洋白(Cu-Ni-Zn)シールド缶', '100MHz〜6GHzのノイズを35dB遮蔽', '#475569')}
          ${drawCallout(284, 162, 482, 198, 2, '天井の「放熱専用窓」', '電波は止めつつ熱だけTIMで上へ逃がす', '#0284c7')}
          ${drawCallout(412, 264, 482, 252, 3, 'BeCu接地バネクリップ', '分解修理時にフタをパチンと着脱可', '#d97706')}
          <rect x="468" y="286" width="210" height="34" rx="8" fill="#dbeafe"/>
          <text x="573" y="307" text-anchor="middle" font-size="10.5" font-weight="800" fill="#1e40af">動画の「ジー」という音声ノイズを根絶</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '240Hz高速駆動する基板の電波ノイズ', line2: 'を閉じ込める金属のファラデーケージ' },
          { label: 'スゴい工夫・秘密', line1: '洋白シールド缶で35dB以上減衰しつつ', line2: '中央の放熱窓で冷却性能も犠牲にせず' },
          { label: '撮影でどう嬉しい？', line1: '動画マイクへのノイズ混入やWi-Fiの', line2: '通信低下ゼロで高画質・高音質記録！' },
        ],
      });

    // =========================================================================
    // E25. EVF光学室 密閉防曇Oリングキット・内面植毛遮光バッフル環 ＆ 5点締結ビス群
    // =========================================================================
    case 'evf_baffle_seals':
      return wrapEvfHdSvg({
        badge: 'E25',
        title: 'EVF光学室 密閉防曇Oリング・植毛遮光バッフル環 ＆ 5点ビス群',
        analogy: '潜水艦の防水ゴムパッキン＋暗室の黒ビロード壁を1セットにした「光学防御キット」',
        accent: '#0f172a',
        accentSoft: '#f1f5f9',
        body: `
          <!-- 3-Column Visual Breakdown inside artboard -->
          <!-- Card A: Front & Rear Dual EPDM O-Rings -->
          <rect x="24" y="86" width="214" height="244" rx="11" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.3"/>
          <text x="131" y="110" text-anchor="middle" font-size="11.8" font-weight="800" fill="#1e40af">① 前後2重 EPDM Oリング</text>
          <!-- Barrel with compressed O-rings -->
          <rect x="52" y="132" width="158" height="84" rx="10" fill="url(#e25-mg)" stroke="#0f172a" stroke-width="1.8"/>
          <rect x="74" y="144" width="114" height="60" rx="6" fill="#fefce8"/>
          <text x="131" y="178" text-anchor="middle" font-size="11" font-weight="800" fill="#854d0e">乾燥密閉光学室</text>
          <!-- Glowing blue highlighted O-ring seals -->
          <ellipse cx="64" cy="174" rx="8" ry="34" fill="none" stroke="#38bdf8" stroke-width="6"/>
          <ellipse cx="198" cy="174" rx="8" ry="34" fill="none" stroke="#38bdf8" stroke-width="6"/>
          ${drawRaindrop(36, 174, 0.9)}
          <text x="131" y="246" text-anchor="middle" font-size="10.8" font-weight="800" fill="#1e3a8a">−20℃〜+50℃ 曇りゼロ!</text>
          <text x="131" y="270" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">湿気・砂塵を完全に遮断し</text>
          <text x="131" y="288" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">内部の低露点乾燥空気を保持</text>

          <!-- Card B: 3-Stage Velvet Flocked Micro-Baffle Rings -->
          <rect x="253" y="86" width="214" height="244" rx="11" fill="#f8fafc" stroke="#64748b" stroke-width="1.3"/>
          <text x="360" y="110" text-anchor="middle" font-size="11.8" font-weight="800" fill="#0f172a">② 3段 植毛遮光バッフル環</text>
          <!-- 3 concentric velvet black rings with microscopic flock fibers -->
          <circle cx="360" cy="182" r="54" fill="#0f172a" stroke="#475569" stroke-width="2"/>
          <circle cx="360" cy="182" r="40" fill="#1e293b" stroke="#64748b" stroke-dasharray="2 2"/>
          <circle cx="360" cy="182" r="26" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
          <!-- Stray ray hitting velvet fibers and dying -->
          <line x1="274" y1="142" x2="318" y2="164" stroke="#f59e0b" stroke-width="2.4" marker-end="url(#e25-arrAmber)"/>
          <text x="360" y="186" text-anchor="middle" font-size="10" font-weight="800" fill="#0369a1">有効光路</text>
          <text x="360" y="256" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">極細ビロード繊維で光吸収</text>
          <text x="360" y="278" text-anchor="middle" font-size="10" font-weight="600" fill="#475569">レンズ間の斜め迷光を無数の</text>
          <text x="360" y="296" text-anchor="middle" font-size="10" font-weight="600" fill="#475569">黒い毛足に閉じ込めて消滅</text>

          <!-- Card C: 5 High-Tensile Thread-Locked Stainless Anchor Screws -->
          <rect x="482" y="86" width="210" height="244" rx="11" fill="#fffbeb" stroke="#fcd34d" stroke-width="1.3"/>
          <text x="587" y="110" text-anchor="middle" font-size="11.8" font-weight="800" fill="#92400e">③ 緩み止め付 5点精密ビス</text>
          <!-- Zoomed stainless screw with blue thread-lock patch -->
          <g transform="translate(587, 178)">
            <rect x="-24" y="-44" width="48" height="14" rx="5" fill="url(#e25-steel)" stroke="#475569" stroke-width="1.8"/>
            <line x1="-10" y1="-37" x2="10" y2="-37" stroke="#0f172a" stroke-width="2.2"/>
            <rect x="-10" y="-30" width="20" height="62" rx="3" fill="url(#e25-steel)" stroke="#475569" stroke-width="1.5"/>
            <!-- Blue nylon threadlock band -->
            <rect x="-11" y="-4" width="22" height="22" rx="2" fill="#2563eb" opacity="0.88"/>
            <text x="0" y="10" text-anchor="middle" font-size="8.5" font-weight="800" fill="#ffffff">緩み止</text>
          </g>
          <text x="587" y="246" text-anchor="middle" font-size="10.8" font-weight="800" fill="#92400e">高張力SUS × 5点均等締結</text>
          <text x="587" y="270" text-anchor="middle" font-size="10" font-weight="600" fill="#475569">Oリングを全周均一に潰し</text>
          <text x="587" y="288" text-anchor="middle" font-size="10" font-weight="600" fill="#475569">振動・落下でも気密を保持</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'EVF光学室の防水気密・迷光吸収・', line2: '筐体固定を担う3点セット防御キット' },
          { label: 'スゴい工夫・秘密', line1: '前後EPDM Oリング＋3段植毛リング＋', line2: '緩み止め剤付5点SUSビスで完全密閉' },
          { label: '撮影でどう嬉しい？', line1: '豪雨や氷点下でも曇らずホコリ入らず', line2: '夜景の黒も引き締まった高コントラスト！' },
        ],
      });

    // =========================================================================
    // E26. EVF底面キャビティFPC抜け止めステンレスクランプ＆接地ブリッジ
    // =========================================================================
    case 'evf_cavity_clamp':
      return wrapEvfHdSvg({
        badge: 'E26',
        title: 'EVF底面キャビティFPC抜け止めステンレスクランプ＆接地ブリッジ',
        analogy: '大事な高速ケーブルが絶対に抜けないよう押さえる「シートベルト付き金属ロック」',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Cross-section of ZIF Connector + Urethane Pad + SUS304 Clamp + BeCu Ground Bridge -->
          <text x="360" y="96" text-anchor="middle" font-size="12.2" font-weight="800" fill="#0c4a6e">落下衝撃による「EVF突然ブラックアウト」を 100% 防ぐ圧着構造</text>

          <!-- Mainboard & Magnesium Skeleton base -->
          <rect x="48" y="264" width="424" height="32" rx="6" fill="url(#e26-pcb)" stroke="#064e3b" stroke-width="1.8"/>
          <text x="260" y="285" text-anchor="middle" font-size="11" font-weight="800" fill="#d1fae5">メイン基板 / マグネシウム合金骨格 (GND)</text>

          <!-- ZIF / B2B Connector + High-speed MIPI-DSI & IR Camera FPCs -->
          <rect x="148" y="232" width="128" height="32" rx="4" fill="#1e293b" stroke="#0f172a" stroke-width="1.6"/>
          <text x="212" y="252" text-anchor="middle" font-size="10.2" font-weight="800" fill="#facc15">240Hz MIPI + IR 接続部</text>
          <!-- Amber FPC ribbons coming from EVF -->
          <path d="M 164 232 L 164 218 L 284 218 L 320 232" fill="none" stroke="url(#e26-kapton)" stroke-width="9" stroke-linecap="round"/>

          <!-- Soft Low-Rebound Urethane Compression Pad -->
          <rect x="150" y="198" width="124" height="24" rx="5" fill="#38bdf8" stroke="#0284c7" stroke-width="1.6"/>
          <text x="212" y="214" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0c4a6e">低反発ウレタン圧着パッド</text>

          <!-- Precision-Stamped SUS304 Stainless Clamp Plate bridged with 2 M1.4 screws -->
          <path d="M 88 264 L 88 176 L 348 176 L 348 264 L 324 264 L 324 196 L 112 196 L 112 264 Z" fill="url(#e26-steel)" stroke="#475569" stroke-width="2" filter="url(#e26-sh)"/>
          <text x="218" y="190" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0f172a">SUS304 ステンレスクランプ板</text>

          <!-- 2x M1.4 Stainless Screws -->
          <rect x="93" y="160" width="14" height="22" rx="3" fill="#475569"/>
          <rect x="329" y="160" width="14" height="22" rx="3" fill="#475569"/>
          <text x="100" y="152" text-anchor="middle" font-size="9.5" font-weight="800" fill="#334155">M1.4ビス</text>
          <text x="336" y="152" text-anchor="middle" font-size="9.5" font-weight="800" fill="#334155">M1.4ビス</text>

          <!-- BeCu Spring Grounding Finger Bridge on right -->
          <path d="M 348 206 Q 408 198 418 260" fill="none" stroke="#eab308" stroke-width="5" stroke-linecap="round"/>
          <text x="438" y="226" text-anchor="middle" font-size="9.8" font-weight="800" fill="#b45309">BeCu接地バネ</text>

          <!-- Downward uniform pressure arrows -->
          <line x1="184" y1="132" x2="184" y2="170" stroke="#0284c7" stroke-width="2.4" marker-end="url(#e26-arrBlue)"/>
          <line x1="240" y1="132" x2="240" y2="170" stroke="#0284c7" stroke-width="2.4" marker-end="url(#e26-arrBlue)"/>
          <text x="212" y="124" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0369a1">優しく均一に上からロック!</text>

          <!-- Right summary box -->
          <rect x="492" y="114" width="200" height="214" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="506" y="138" font-size="12" font-weight="800" fill="#0f172a">プロ機（α1 II等）の信頼構造</text>
          <text x="506" y="166" font-size="10.8" font-weight="800" fill="#0369a1">① 抜け止め 100% 保証</text>
          <text x="506" y="184" font-size="10" font-weight="600" fill="#475569">衝撃で極細コネクタが外れる</text>
          <text x="506" y="198" font-size="10" font-weight="600" fill="#475569">トラブルをウレタン圧着で根絶</text>
          <text x="506" y="226" font-size="10.8" font-weight="800" fill="#b45309">② EMIノイズ接地を兼務</text>
          <text x="506" y="244" font-size="10" font-weight="600" fill="#475569">BeCuバネがEVF〜骨格間を接地</text>
          <text x="506" y="272" font-size="10.8" font-weight="800" fill="#059669">③ 整備性も抜群</text>
          <text x="506" y="290" font-size="10" font-weight="600" fill="#475569">ビス2本外すだけでEVF単独</text>
          <text x="506" y="304" font-size="10" font-weight="600" fill="#475569">交換ができるプロサービス設計</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'EVF底面の極細ケーブル接続部を', line2: '上から押さえて抜けを防ぐ固定金具' },
          { label: 'スゴい工夫・秘密', line1: 'SUS押さえ板＋低反発ウレタンで', line2: 'ケーブルを傷めず固定＆EMI接地も兼任' },
          { label: '撮影でどう嬉しい？', line1: '機材をぶつけたり運搬振動が続いても', line2: 'ファインダー暗転トラブルが起きない！' },
        ],
      });

    // =========================================================================
    // E27. 大型ディープアイカップ着脱用 4点ねじステンレス受枠＆スライドロック軌条
    // =========================================================================
    case 'evf_eyecup_subframe':
      return wrapEvfHdSvg({
        badge: 'E27',
        title: '大型ディープアイカップ着脱用 4点ねじステンレス受枠＆軌条',
        analogy: '大型アイカップをガッチリ支える「4点ボルト留めの鋼鉄スライドレール」',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Front-isometric view of 4-screw SUS304 dovetail subframe -->
          <rect x="24" y="84" width="332" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="190" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">SUS304 4点均等締結・アリ溝スライド受枠</text>

          <!-- Stainless Subframe -->
          <rect x="76" y="128" width="228" height="162" rx="14" fill="url(#e27-steel)" stroke="#334155" stroke-width="2" filter="url(#e27-sh)"/>
          <rect x="112" y="152" width="156" height="114" rx="9" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>
          <!-- Left & Right Dovetail Slide Tracks -->
          <rect x="86" y="148" width="18" height="122" rx="3" fill="#334155"/>
          <rect x="276" y="148" width="18" height="122" rx="3" fill="#334155"/>
          <!-- 4 Corner M1.4 Stainless Screws -->
          <circle cx="95" cy="140" r="7" fill="#1e293b" stroke="#f8fafc" stroke-width="1.5"/>
          <circle cx="285" cy="140" r="7" fill="#1e293b" stroke="#f8fafc" stroke-width="1.5"/>
          <circle cx="95" cy="278" r="7" fill="#1e293b" stroke="#f8fafc" stroke-width="1.5"/>
          <circle cx="285" cy="278" r="7" fill="#1e293b" stroke="#f8fafc" stroke-width="1.5"/>
          <!-- Bottom spring positive lock notch -->
          <rect x="164" y="274" width="52" height="14" rx="4" fill="#d97706" stroke="#92400e"/>
          <text x="190" y="285" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">ロック爪</text>
          <text x="190" y="212" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0369a1">標準 / 深型 両対応!</text>
          <!-- Slide-down arrow -->
          <line x1="190" y1="116" x2="190" y2="146" stroke="#059669" stroke-width="3" marker-end="url(#e27-arrGreen)"/>
          <text x="190" y="314" text-anchor="middle" font-size="10.5" font-weight="800" fill="#334155">上からスッと差し込んで「カチッ」とロック</text>

          <!-- Right: Why Dovetail + 4-Screw Stainless matters -->
          <rect x="374" y="84" width="318" height="248" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="390" y="108" font-size="12" font-weight="800" fill="#0f172a">なぜプラスチックでなくSUSステンレス？</text>
          <!-- Cross-section of trapezoidal dovetail rail -->
          <g transform="translate(460, 160)">
            <polygon points="-50,24 -36,-24 36,-24 50,24" fill="url(#e27-steel)" stroke="#334155" stroke-width="1.8"/>
            <polygon points="-32,16 -22,-16 22,-16 32,16" fill="url(#e27-rubber)" stroke="#0f172a" stroke-width="1.5"/>
            <text x="0" y="5" text-anchor="middle" font-size="9.5" font-weight="800" fill="#f8fafc">ハの字(アリ溝)</text>
          </g>
          <text x="530" y="148" font-size="11" font-weight="800" fill="#0f172a">ハの字断面で抜け不能!</text>
          <text x="530" y="168" font-size="10" font-weight="600" fill="#475569">後ろへ引っ張られても</text>
          <text x="530" y="184" font-size="10" font-weight="600" fill="#475569">金属の傾斜がガッチリ噛む</text>

          <rect x="390" y="206" width="286" height="108" rx="9" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="404" y="230" font-size="11" font-weight="800" fill="#0369a1">① 4点M1.4ビスで衝撃を分散</text>
          <text x="404" y="250" font-size="10" font-weight="600" fill="#475569">大型ディープアイカップを強く顔に押し当てても歪まない</text>
          <text x="404" y="276" font-size="11" font-weight="800" fill="#059669">② 樹脂より10倍以上タフな耐久性</text>
          <text x="404" y="296" font-size="10" font-weight="600" fill="#475569">何百回も着脱交換してもレールが摩耗・ガタつかない</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'アイカップをカメラ本体へ確実に取り', line2: '付けるための金属スライドレール枠' },
          { label: 'スゴい工夫・秘密', line1: '4点M1.4ビス留め＋ハの字アリ溝で', line2: '大型ディープカップの負荷も余裕で支持' },
          { label: '撮影でどう嬉しい？', line1: '顔にギュッと押し当てて構えても', line2: 'グラつかず撮影に集中できる堅牢性！' },
        ],
      });

    // =========================================================================
    // E28. 視線入力IRカメラ光軸±5μm校正マイクロシム＆3点アライメントスタッド
    // =========================================================================
    case 'evf_eyeaf_shims':
      return wrapEvfHdSvg({
        badge: 'E28',
        title: '視線入力IRカメラ光軸 ±5μm 校正マイクロシム＆3点スタッド',
        analogy: '視線カメラの狙いを髪の毛の1/15単位で合わせる「極薄スペーサー札」',
        accent: '#ca8a04',
        accentSoft: '#fefce8',
        body: `
          <!-- Left: Stacked 10/20/50μm Micro Shims on 3 Tapered Alignment Studs -->
          <rect x="24" y="84" width="358" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="203" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#713f12">10 / 20 / 50 μm 極薄シムを自在に積層校正！</text>

          <!-- IR Camera baseplate (E07) on top -->
          <rect x="64" y="130" width="278" height="36" rx="7" fill="url(#e28-pcb)" stroke="#064e3b" stroke-width="1.8" filter="url(#e28-sh)"/>
          <text x="203" y="153" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">視線入力 IR カメラ基板 (E07)</text>

          <!-- Stacked micro shims (10μm / 20μm / 50μm) -->
          <rect x="84" y="176" width="238" height="10" rx="2" fill="#e2e8f0" stroke="#64748b"/>
          <text x="334" y="185" font-size="9.5" font-weight="800" fill="#475569">10μm</text>
          <rect x="84" y="192" width="238" height="14" rx="2" fill="url(#e28-brass)" stroke="#92400e"/>
          <text x="334" y="203" font-size="9.5" font-weight="800" fill="#92400e">20μm</text>
          <rect x="84" y="212" width="238" height="22" rx="3" fill="url(#e28-copper)" stroke="#9a3412"/>
          <text x="334" y="227" font-size="9.5" font-weight="800" fill="#9a3412">50μm</text>

          <!-- 3 Precision CNC Tapered Alignment Studs anchoring vertically -->
          ${[112, 203, 294]
            .map(
              (sx) => `
              <path d="M ${sx - 10} 288 L ${sx - 7} 166 L ${sx + 7} 166 L ${sx + 10} 288 Z" fill="url(#e28-steel)" stroke="#334155" stroke-width="1.5"/>`
            )
            .join('')}
          <!-- Mg chassis floor -->
          <rect x="64" y="280" width="278" height="26" rx="5" fill="url(#e28-mg)"/>
          <text x="203" y="297" text-anchor="middle" font-size="10.5" font-weight="800" fill="#f8fafc">3点テーパーアライメントスタッド（±5μm公差）</text>

          <!-- Right: Why ±5μm matters for Eye-Control AF accuracy -->
          <rect x="398" y="84" width="294" height="248" rx="11" fill="#fefce8" stroke="#fde047" stroke-width="1.3"/>
          <text x="414" y="108" font-size="12" font-weight="800" fill="#713f12">🎯 ±5μm（髪の毛の1/15）の威力！</text>
          ${drawStatusPill(414, 122, 240, 'シムなし：視線とAF枠がズレる', false)}
          <text x="416" y="166" font-size="10.5" font-weight="600" fill="#475569">部品のわずかな組立誤差でIRカメラが</text>
          <text x="416" y="184" font-size="10.5" font-weight="600" fill="#475569">0.2°傾くと、見た場所の隣へAFがズレる…</text>

          ${drawStatusPill(414, 204, 248, '3点シム校正：誤差 &lt; 0.03° へ!', true)}
          <text x="416" y="248" font-size="10.8" font-weight="800" fill="#14532d">工場で1台ずつレーザー実測＆調整</text>
          <text x="416" y="270" font-size="10.5" font-weight="600" fill="#334155">・45°ダイクロイックミラーと完全直交</text>
          <text x="416" y="290" font-size="10.5" font-weight="600" fill="#334155">・3本のテーパー軸で衝撃ズレもゼロ</text>
          <text x="416" y="310" font-size="10.5" font-weight="800" fill="#a16207">→ 瞳の狙い通りビタッとAF命中!</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '視線カメラの取り付け高さと傾きを', line2: 'ミクロン単位で合わせる極薄シム組' },
          { label: 'スゴい工夫・秘密', line1: '10/20/50μmの金属箔＋3点テーパー軸', line2: '光学ズレ起因の視線誤差を0.03°未満に' },
          { label: '撮影でどう嬉しい？', line1: '画面の端を見た時でもAF枠がズレず', line2: '狙った被写体の瞳に一発で合焦！' },
        ],
      });

    // =========================================================================
    // E29. 密閉光学室モレキュラーシーブ防曇乾燥剤カートリッジ＆気圧調整弁
    // =========================================================================
    case 'evf_desiccant_breather':
      return wrapEvfHdSvg({
        badge: 'E29',
        title: 'モレキュラーシーブ防曇乾燥剤カートリッジ＆気圧調整弁',
        analogy: '水分子だけ吸い込む「カメラ専用の超高性能シリカゲル＆耳抜きバルブ」',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        body: `
          <!-- Left: Molecular Sieve 3A Pore Zoom (0.3nm pore traps H2O 0.28nm, passes N2/O2!) -->
          <rect x="24" y="84" width="356" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="202" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#155e75">🔬 3A 合成ゼオライトが「水分子だけ」捕獲！</text>

          <!-- Zeolite crystal pore lattice -->
          <rect x="52" y="128" width="160" height="162" rx="12" fill="#e0f2fe" stroke="#0891b2" stroke-width="2"/>
          <!-- Honeycomb spherical zeolite beads -->
          ${[
            [92, 166],
            [132, 166],
            [172, 166],
            [72, 206],
            [112, 206],
            [152, 206],
            [192, 206],
            [92, 246],
            [132, 246],
            [172, 246],
          ]
            .map(
              ([bx, by]) => `
              <circle cx="${bx}" cy="${by}" r="18" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
              <circle cx="${bx}" cy="${by}" r="6" fill="#0284c7" opacity="0.75"/>`
            )
            .join('')}
          <text x="132" y="312" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0e7490">SUSメッシュ保護カートリッジ</text>

          <!-- Molecular size comparison on right half of left panel -->
          <rect x="226" y="132" width="142" height="74" rx="8" fill="#f0f9ff" stroke="#38bdf8"/>
          <circle cx="250" cy="162" r="9" fill="#0284c7"/>
          <text x="250" y="166" text-anchor="middle" font-size="8.5" font-weight="900" fill="#ffffff">H₂O</text>
          <text x="266" y="158" font-size="10.5" font-weight="800" fill="#0369a1">水分子 0.28nm</text>
          <text x="266" y="176" font-size="9.5" font-weight="700" fill="#059669">→ 0.3nm穴に吸着!</text>
          <text x="266" y="194" font-size="9.2" font-weight="700" fill="#475569">湿気を根こそぎ除去</text>

          <rect x="226" y="216" width="142" height="74" rx="8" fill="#f8fafc" stroke="#94a3b8"/>
          <circle cx="250" cy="248" r="13" fill="#94a3b8"/>
          <text x="250" y="252" text-anchor="middle" font-size="8.5" font-weight="900" fill="#ffffff">N₂/O₂</text>
          <text x="268" y="244" font-size="10.5" font-weight="800" fill="#334155">空気 0.36nm</text>
          <text x="268" y="262" font-size="9.5" font-weight="700" fill="#64748b">→ 穴に入らず通過</text>
          <text x="268" y="280" font-size="9.2" font-weight="700" fill="#0284c7">水だけ強力吸着!</text>

          <!-- Right: Hydrophobic ePTFE Pressure Equalizer Valve (Airplane / Mountain!) -->
          <rect x="396" y="84" width="296" height="248" rx="11" fill="#f0fdfa" stroke="#5eead4" stroke-width="1.4"/>
          <text x="544" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#115e59">🏔️ 登山・飛行機でも安心「ePTFE気圧調整弁」</text>

          <!-- ePTFE white porous membrane barrier -->
          <rect x="528" y="128" width="28" height="126" rx="5" fill="#ffffff" stroke="#0d9488" stroke-width="2"/>
          <text x="542" y="192" text-anchor="middle" font-size="9.5" font-weight="900" fill="#0f766e" transform="rotate(-90, 542, 192)">撥水ePTFE微多孔膜</text>

          <!-- Outside: Rain drops bounced back! -->
          ${drawRaindrop(446, 152, 0.95)}
          <line x1="464" y1="158" x2="522" y2="158" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2"/>
          <text x="466" y="182" text-anchor="middle" font-size="10" font-weight="900" fill="#dc2626">雨粒は完全ブロック❌</text>

          <!-- Air pressure equalizing gently both ways -->
          <line x1="442" y1="222" x2="644" y2="222" stroke="#059669" stroke-width="2.8" marker-start="url(#e29-arrGreen)" marker-end="url(#e29-arrGreen)"/>
          <text x="466" y="242" text-anchor="middle" font-size="10" font-weight="800" fill="#065f46">気圧だけ呼吸✅</text>
          <text x="626" y="176" text-anchor="middle" font-size="11" font-weight="800" fill="#0f766e">露点温度</text>
          <text x="626" y="198" text-anchor="middle" font-size="14" font-weight="900" fill="#0369a1">&lt; −25℃</text>

          <rect x="414" y="268" width="260" height="48" rx="8" fill="#ffffff" stroke="#99f6e4"/>
          <text x="544" y="288" text-anchor="middle" font-size="10.5" font-weight="800" fill="#134e4a">高山や飛行機での気圧差によるレンズ歪みを防ぎ</text>
          <text x="544" y="306" text-anchor="middle" font-size="10.5" font-weight="700" fill="#0f766e">極寒の雪山でも内部結露をゼロに維持！</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '密閉EVF内のわずかな湿気を吸い取り', line2: '標高差の気圧も自動調整する防曇装置' },
          { label: 'スゴい工夫・秘密', line1: '3Aゼオライトが水分子だけ選択吸着', line2: '撥水ePTFE膜で雨は止め気圧だけ抜く' },
          { label: '撮影でどう嬉しい？', line1: '真冬の雪山や標高3,000mの登山でも', line2: '内部レンズが曇らずクリアに撮り続けられる' },
        ],
      });

    // =========================================================================
    // E30. EVF自動輝度・色温度適応 周囲光RGBフォトダイオードセンサー
    // =========================================================================
    case 'evf_ambient_photodiode':
      return wrapEvfHdSvg({
        badge: 'E30',
        title: 'EVF自動輝度・色温度適応 周囲光RGBフォトダイオードセンサー',
        analogy: '外の明るさと光の色を読み取って画面を見やすくする「目の瞳孔みたいな自動調光センサー」',
        accent: '#059669',
        accentSoft: '#ecfdf5',
        body: `
          <!-- Left: Starry Night (0.05 lx) -> Center: 4-Quadrant V(λ) RGB+C Die -> Right: Bright Snow/Sun (120,000 lx) -->
          <rect x="24" y="88" width="186" height="238" rx="11" fill="#0f172a" stroke="#334155" stroke-width="1.6"/>
          <text x="117" y="114" text-anchor="middle" font-size="12" font-weight="800" fill="#93c5fd">🌌 星空・暗い室内</text>
          <text x="117" y="134" text-anchor="middle" font-size="11" font-weight="900" fill="#facc15">0.05 lux</text>
          <!-- Subtle gentle EVF screen -->
          <rect x="46" y="152" width="142" height="72" rx="7" fill="#1e293b" stroke="#60a5fa" stroke-width="1.5"/>
          <text x="117" y="184" text-anchor="middle" font-size="11" font-weight="800" fill="#bae6fd">優しく減光表示</text>
          <text x="117" y="204" text-anchor="middle" font-size="9.5" font-weight="700" fill="#94a3b8">(眩しくなく夜目を維持)</text>
          <text x="117" y="256" text-anchor="middle" font-size="10.2" font-weight="700" fill="#cbd5e1">電球下の暖色光も検知し</text>
          <text x="117" y="276" text-anchor="middle" font-size="10.2" font-weight="700" fill="#93c5fd">自然な色温度へ自動調整</text>

          <!-- Center: Zoomed 4-Quadrant V(λ) RGB + Clear Photodiode IC -->
          <rect x="234" y="88" width="252" height="238" rx="11" fill="#ffffff" stroke="#10b981" stroke-width="1.6" filter="url(#e30-sh)"/>
          <text x="360" y="112" text-anchor="middle" font-size="11.8" font-weight="800" fill="#065f46">人間の目 V(λ) に近い 4分割RGBセンサ</text>
          <!-- 4-quadrant die grid -->
          <g transform="translate(292, 128)">
            <rect x="0" y="0" width="64" height="52" rx="5" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
            <text x="32" y="31" text-anchor="middle" font-size="12" font-weight="900" fill="#ffffff">R (赤)</text>
            <rect x="72" y="0" width="64" height="52" rx="5" fill="#22c55e" stroke="#166534" stroke-width="1.5"/>
            <text x="104" y="31" text-anchor="middle" font-size="12" font-weight="900" fill="#ffffff">G (緑)</text>
            <rect x="0" y="60" width="64" height="52" rx="5" fill="#3b82f6" stroke="#1e40af" stroke-width="1.5"/>
            <text x="32" y="91" text-anchor="middle" font-size="12" font-weight="900" fill="#ffffff">B (青)</text>
            <rect x="72" y="60" width="64" height="52" rx="5" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
            <text x="104" y="91" text-anchor="middle" font-size="11.5" font-weight="900" fill="#0f172a">C (明るさ)</text>
          </g>
          <!-- I2C bus link to TCON -->
          <rect x="256" y="256" width="208" height="52" rx="8" fill="#ecfdf5" stroke="#10b981"/>
          <text x="360" y="277" text-anchor="middle" font-size="10.8" font-weight="800" fill="#065f46">16-bit 広ダイナミックレンジ</text>
          <text x="360" y="297" text-anchor="middle" font-size="10.2" font-weight="700" fill="#047857">I²C通信で TCON基板(E16)へ即送信</text>

          <!-- Right: Bright Snowfield / Midday Sun (120,000 lx) -->
          <rect x="510" y="88" width="186" height="238" rx="11" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.6"/>
          ${drawSunIcon(542, 114, 9)}
          <text x="614" y="114" text-anchor="middle" font-size="12" font-weight="800" fill="#92400e">真夏の晴天・雪原</text>
          <text x="603" y="136" text-anchor="middle" font-size="11" font-weight="900" fill="#ea580c">120,000 lux</text>
          <!-- Boosted bright EVF screen -->
          <rect x="532" y="152" width="142" height="72" rx="7" fill="url(#e30-oled)" stroke="#ea580c" stroke-width="2"/>
          <text x="603" y="184" text-anchor="middle" font-size="11.5" font-weight="900" fill="#ffffff">最大輝度ブースト!</text>
          <text x="603" y="204" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fef08a">(4,000 cd/m² 解放!)</text>
          <text x="603" y="256" text-anchor="middle" font-size="10.2" font-weight="700" fill="#78350f">直射日光下でも暗く見えず</text>
          <text x="603" y="276" text-anchor="middle" font-size="10.2" font-weight="700" fill="#b45309">白飛び・ピントを正確に確認</text>

          <!-- Arrows feeding center sensor -->
          <line x1="212" y1="186" x2="232" y2="186" stroke="#3b82f6" stroke-width="2.6" marker-end="url(#e30-arrBlue)"/>
          <line x1="508" y1="186" x2="488" y2="186" stroke="#ea580c" stroke-width="2.6" marker-end="url(#e30-arrAmber)"/>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '周りの明るさと光の色味を測り、', line2: 'EVFの明るさと色温度を自動最適化する' },
          { label: 'スゴい工夫・秘密', line1: '0.05〜120,000 luxまで240万倍の', line2: '明るさ差を4分割RGBダイオードで検知' },
          { label: '撮影でどう嬉しい？', line1: '暗闇では目に優しく、晴天ではクッキリ', line2: '手動設定なしでいつでも見やすい視界！' },
        ],
      });

    // =========================================================================
    // E31. 視度調整ダイヤル 0.1dptクリックディテント板ばね＆ゼロ点基準カム
    // =========================================================================
    case 'evf_diopter_detent':
      return wrapEvfHdSvg({
        badge: 'E31',
        title: '視度調整ダイヤル 0.15dptクリックディテント板ばね＆ゼロ点カム',
        analogy: '目をつぶっていても「ここが標準！」と指先でわかるクリック歯車',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        body: `
          <!-- Left: Zoomed Rotary Brass Cam Wheel (42 teeth + DEEP -1.0 dpt Zero Valley!) -->
          <rect x="24" y="84" width="358" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="203" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#92400e">42段ラチェット輪 ＋ 深い「標準ゼロ点谷」</text>

          <!-- Cam wheel with teeth around perimeter & distinct deep notch at top (12 o'clock) -->
          <g transform="translate(203, 224)">
            <circle cx="0" cy="0" r="76" fill="url(#e31-brass)" stroke="#713f12" stroke-width="2" filter="url(#e31-sh)"/>
            <!-- Small clicks around wheel -->
            ${Array.from({ length: 24 })
              .map((_, i) => {
                const a = (i / 24) * Math.PI * 2;
                if (i === 18) return ''; // 12 o'clock is the DEEP zero notch!
                const x1 = Math.cos(a) * 69;
                const y1 = Math.sin(a) * 69;
                const x2 = Math.cos(a) * 79;
                const y2 = Math.sin(a) * 79;
                return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#713f12" stroke-width="3.2"/>`;
              })
              .join('')}
            <!-- Deep -1.0 dpt Zero Reference Valley at 12 o'clock! -->
            <polygon points="-14,-78 0,-54 14,-78" fill="#ffffff" stroke="#dc2626" stroke-width="2.2"/>
            <circle cx="0" cy="0" r="24" fill="url(#e31-steel)" stroke="#475569" stroke-width="2"/>
            <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="900" fill="#0f172a">軸芯</text>
          </g>

          <!-- BeCu Detent Leaf Spring + Tip Roller engaging the deep zero notch -->
          <path d="M 76 142 Q 140 132 203 160" fill="none" stroke="#ea580c" stroke-width="6" stroke-linecap="round"/>
          <circle cx="203" cy="160" r="7.5" fill="url(#e31-steel)" stroke="#9a3412" stroke-width="2"/>
          <text x="116" y="132" text-anchor="middle" font-size="10.2" font-weight="800" fill="#c2410c">BeCuディテント板ばね</text>
          <text x="292" y="146" text-anchor="middle" font-size="10.5" font-weight="900" fill="#dc2626">← 深い標準ノッチ!</text>
          <text x="292" y="162" text-anchor="middle" font-size="9.5" font-weight="700" fill="#991b1b">(−1.0 dpt 基準点)</text>

          <!-- Right: Tactile torque feel graph -->
          <rect x="398" y="84" width="294" height="248" rx="11" fill="#fffbeb" stroke="#fcd34d" stroke-width="1.3"/>
          <text x="545" y="108" text-anchor="middle" font-size="12" font-weight="800" fill="#92400e">👆 指先に伝わるクリック感の波形</text>
          <!-- Tactile torque wave with deeper valley in middle -->
          <rect x="416" y="124" width="258" height="92" rx="8" fill="#ffffff" stroke="#fde68a"/>
          <path d="M 426 168 L 444 150 L 462 168 L 480 150 L 498 168 L 516 150 L 545 198 L 574 150 L 592 168 L 610 150 L 628 168 L 646 150 L 664 168" fill="none" stroke="#d97706" stroke-width="2.8" stroke-linejoin="round"/>
          <circle cx="545" cy="198" r="6" fill="#dc2626"/>
          <text x="545" y="212" text-anchor="middle" font-size="9.8" font-weight="900" fill="#dc2626">「コクッ!」と深い標準点</text>

          <text x="416" y="246" font-size="11" font-weight="800" fill="#78350f">① 0.15 dpt 刻みの42ステップ</text>
          <text x="416" y="264" font-size="10" font-weight="600" fill="#475569">自分の視力にジャストの位置で止まる</text>
          <text x="416" y="290" font-size="11" font-weight="800" fill="#78350f">② 高耐疲労ベリリウム銅(BeCu)</text>
          <text x="416" y="308" font-size="10" font-weight="600" fill="#475569">何千回回してもバネがヘタらず18mN·m維持</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '視度ダイヤルを回すときの繊細な', line2: '「カチカチ感」と標準位置を作るバネ組' },
          { label: 'スゴい工夫・秘密', line1: '42段真鍮カム輪＋−1.0dptの深い谷と', line2: 'ヘタらないベリリウム銅板ばねを採用' },
          { label: '撮影でどう嬉しい？', line1: '暗い夜間でも画面を見ずに指の感触で', line2: '標準視度へすぐ戻せて操作が超快適！' },
        ],
      });

    // =========================================================================
    // E32. Sony純正 FINDER COVER (89100)（Ref.113: A5038709A）背面枠＆防塵ラビリンス縁
    // =========================================================================
    case 'evf_oem_finder_cover':
      return wrapEvfHdSvg({
        badge: 'E32',
        title: 'Sony純正 FINDER COVER（Ref.113: A5038709A）防塵ラビリンス縁',
        analogy: '雨粒や砂ホコリを階段状の迷路で食い止める「ファインダーの玄関ドア枠」',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Front anatomy of Sony A5038709A Finder Cover -->
          <rect x="24" y="84" width="308" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="178" y="106" text-anchor="middle" font-size="11.8" font-weight="800" fill="#0f172a">アイカップを外すと現れる純正フレーム</text>

          <!-- Main GF-PC >PC-GF20< pebbled bezel -->
          <rect x="64" y="122" width="228" height="170" rx="22" fill="url(#e32-mg)" stroke="#0f172a" stroke-width="2" filter="url(#e32-sh)"/>
          <!-- Eyepiece aperture -->
          <rect x="96" y="142" width="164" height="96" rx="12" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
          <text x="178" y="194" text-anchor="middle" font-size="12" font-weight="800" fill="#0369a1">接眼窓開口</text>
          <!-- Lower Eye Sensor bezel pocket -->
          <rect x="114" y="250" width="128" height="30" rx="6" fill="#0f172a" stroke="#64748b" stroke-width="1.6"/>
          <text x="178" y="269" text-anchor="middle" font-size="10" font-weight="800" fill="#fb7185">アイセンサー専用枠 (E33)</text>
          <!-- 4 hidden corner M1.7 maintenance screw pockets -->
          <circle cx="80" cy="138" r="6" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
          <circle cx="276" cy="138" r="6" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
          <circle cx="80" cy="274" r="6" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
          <circle cx="276" cy="274" r="6" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
          <text x="178" y="314" text-anchor="middle" font-size="10.2" font-weight="800" fill="#475569">四隅の隠しネジ4本へアクセスする基準枠</text>

          <!-- Right: Zoomed Cross-Section of Labyrinth Dust/Water Maze Lip! -->
          <rect x="348" y="84" width="344" height="248" rx="11" fill="#f0f9ff" stroke="#7dd3fc" stroke-width="1.4"/>
          <text x="520" y="108" text-anchor="middle" font-size="12" font-weight="800" fill="#0369a1">🔍 外周「迷路（ラビリンス）段差」拡大断面</text>

          <!-- Stepped interlocking labyrinth walls between Finder Cover & Rear Body -->
          <path d="M 378 144 L 468 144 L 468 188 L 498 188 L 498 158 L 538 158 L 538 206 L 378 206 Z" fill="url(#e32-mg)" stroke="#0f172a" stroke-width="1.8"/>
          <path d="M 556 144 L 556 226 L 450 226 L 450 212 L 542 212 L 542 144 Z" fill="url(#e32-steel)" stroke="#475569" stroke-width="1.8"/>
          <!-- EPDM rubber gasket bead inside labyrinth -->
          <ellipse cx="484" cy="200" rx="10" ry="7" fill="#0f172a" stroke="#38bdf8" stroke-width="1.6"/>

          <!-- Rain & dust blocked along zigzag path -->
          ${drawRaindrop(408, 126, 0.9)}
          <path d="M 418 134 L 458 134 L 458 196 L 474 196" fill="none" stroke="#0284c7" stroke-width="2.4" stroke-dasharray="4 2" marker-end="url(#e32-arrBlue)"/>
          <circle cx="484" cy="196" r="11" fill="none" stroke="#dc2626" stroke-width="2.2"/>
          <text x="484" y="200" text-anchor="middle" font-size="11" font-weight="900" fill="#dc2626">✕</text>
          <text x="620" y="176" text-anchor="middle" font-size="11" font-weight="900" fill="#065f46">EVF内部</text>
          <text x="620" y="196" text-anchor="middle" font-size="10.2" font-weight="800" fill="#059669">カラッと安全!</text>

          <rect x="366" y="242" width="308" height="74" rx="9" fill="#ffffff" stroke="#bae6fd"/>
          <text x="380" y="264" font-size="10.8" font-weight="800" fill="#0f172a">・ガラス繊維入りポリカ（&gt;PC-GF20&lt;）シボ仕上げ</text>
          <text x="380" y="284" font-size="10.5" font-weight="600" fill="#334155">・曲がりくねった段差＋ゴムパッキンで雨粒・砂塵を停止</text>
          <text x="380" y="304" font-size="10.5" font-weight="600" fill="#475569">・Sony純正サービス品番：A5038709A (Ref.113)</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '接眼窓とアイセンサーを一体で囲む', line2: 'Sony純正の背面化粧＆防塵フレーム' },
          { label: 'スゴい工夫・秘密', line1: 'フチが階段状のラビリンス迷路構造', line2: '高剛性ガラス繊維強化樹脂で耐皮脂性◎' },
          { label: '撮影でどう嬉しい？', line1: '雨や砂埃が吹き付ける過酷な環境でも', line2: 'ファインダー内部へ水滴を入れない！' },
        ],
      });

    // =========================================================================
    // E33. Sony純正 EYE SENSOR WINDOW (850)（Ref.117: 501034401）赤外線透過窓＆遮光隔壁
    // =========================================================================
    case 'evf_oem_eye_sensor_window':
      return wrapEvfHdSvg({
        badge: 'E33',
        title: 'Sony純正 EYE SENSOR WINDOW（Ref.117: 501034401）赤外窓＆隔壁',
        analogy: '目には真っ黒なのに赤外線だけ透け、隣へ光が漏れない「仕切り付きサングラス窓」',
        accent: '#be123c',
        accentSoft: '#fff1f2',
        body: `
          <!-- Left: NG Without Optical Isolation Septum (Internal Crosstalk Error!) -->
          <rect x="24" y="84" width="268" height="248" rx="11" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          ${drawStatusPill(42, 94, 212, '仕切り壁なし：横漏れ誤動作！', false)}
          <rect x="52" y="148" width="212" height="22" rx="4" fill="#4c0519" stroke="#be123c" stroke-width="1.6"/>
          <rect x="74" y="218" width="52" height="26" rx="4" fill="#e11d48"/>
          <text x="100" y="235" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">発光LED</text>
          <rect x="190" y="218" width="52" height="26" rx="4" fill="#0284c7"/>
          <text x="216" y="235" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">受光部</text>
          <!-- Bad internal reflection bouncing inside glass straight into receiver! -->
          <path d="M 100 218 L 158 164 L 216 218" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4 2" marker-end="url(#e33-arrAmber)"/>
          <text x="158" y="274" text-anchor="middle" font-size="10.8" font-weight="800" fill="#9f1239">ガラス内部で光が横漏れ!</text>
          <text x="158" y="294" text-anchor="middle" font-size="10" font-weight="600" fill="#881337">顔を離しても「近い」と勘違いして</text>
          <text x="158" y="310" text-anchor="middle" font-size="10" font-weight="600" fill="#881337">背面液晶が真っ暗のままになる…</text>

          <!-- Right: OK Sony 501034401 Two-Shot Opaque Septum + Twin Molded IR Lenslet Domes -->
          <rect x="308" y="84" width="384" height="248" rx="11" fill="#f0fdf4" stroke="#86efac" stroke-width="1.4"/>
          ${drawStatusPill(326, 94, 286, 'Sony純正 2色成形 遮光隔壁＋集光ドーム', true)}

          <!-- Approaching Face/Eye at top -->
          <ellipse cx="484" cy="134" rx="58" ry="12" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5"/>
          <text x="484" y="138" text-anchor="middle" font-size="10" font-weight="800" fill="#9a3412">撮影者の顔・目</text>

          <!-- Deep ruby-black 940nm IR-pass acrylic window with twin inner condenser domes -->
          <rect x="348" y="176" width="298" height="22" rx="4" fill="#4c0519" stroke="#be123c" stroke-width="1.8"/>
          <path d="M 382 198 Q 412 214 442 198 Z" fill="#881337"/>
          <path d="M 508 198 Q 538 214 568 198 Z" fill="#881337"/>
          <!-- CRITICAL Two-Shot Matte-Black Optical Isolation Septum T-Wall! -->
          <rect x="470" y="198" width="18" height="72" rx="2" fill="#0f172a" stroke="#64748b" stroke-width="1.5"/>
          <text x="479" y="284" text-anchor="middle" font-size="9.5" font-weight="900" fill="#0f172a">遮光隔壁</text>

          <!-- Emitter & Receiver separated cleanly by septum -->
          <rect x="384" y="236" width="56" height="26" rx="4" fill="#e11d48"/>
          <text x="412" y="253" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">940nm発光</text>
          <rect x="510" y="236" width="56" height="26" rx="4" fill="#0284c7"/>
          <text x="538" y="253" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">SPAD受光</text>
          <rect x="594" y="236" width="44" height="26" rx="4" fill="#10b981"/>
          <text x="616" y="253" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">環境光</text>

          <!-- Clean reflection path off approaching face! -->
          <path d="M 412 236 L 412 184 L 484 146 L 538 184 L 538 236" fill="none" stroke="#e11d48" stroke-width="2.6" stroke-dasharray="5 3" marker-end="url(#e33-arrRed)"/>

          <text x="500" y="304" text-anchor="middle" font-size="10.5" font-weight="800" fill="#14532d">可視光(太陽光) 99.9%遮断 ／ 940nm赤外線 約90%透過</text>
          <text x="500" y="320" text-anchor="middle" font-size="10" font-weight="700" fill="#166534">中央の黒い隔壁が横漏れを100%防ぎ、真夏の屋外でも誤切替ゼロ！</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'アイセンサー表面を覆う黒い赤外窓と', line2: '発光・受光の間を仕切る遮光隔壁' },
          { label: 'スゴい工夫・秘密', line1: '940nm赤外線だけ90%通す特殊樹脂＋', line2: '2色成形の遮光壁で横漏れクロストーク0' },
          { label: '撮影でどう嬉しい？', line1: '直射日光の下でも「顔の接近」だけを', line2: '正確に検知しEVF/液晶をストレスなく切替' },
        ],
      });

    // =========================================================================
    // E34. Sony純正 EYE SENSOR WP/RETクッション（Ref.114/118）・ES GNDシート＆ES-1008フレキ
    // =========================================================================
    case 'evf_oem_eye_sensor_cushions':
      return wrapEvfHdSvg({
        badge: 'E34',
        title: 'Sony純正 アイセンサー4層保護サンド（WP/RET/GND/ES-1008）',
        analogy: '汗と雨と静電気からセンサーを守る「4層重ねの防水＆アース座布団」',
        accent: '#ea580c',
        accentSoft: '#fff7ed',
        body: `
          <!-- Exploded 4-layer stack left-to-right (Face side -> Camera Inside) -->
          <text x="360" y="96" text-anchor="middle" font-size="12.2" font-weight="800" fill="#9a3412">顔や汗に最も近いセンサーを守る「Sony純正 4層サンドイッチ構造」</text>

          <!-- Sweat / rain droplets blocked on far left -->
          ${drawRaindrop(54, 178, 1.0)}
          ${drawRaindrop(54, 224, 0.85)}
          <text x="54" y="256" text-anchor="middle" font-size="10" font-weight="800" fill="#0369a1">汗・雨滴</text>
          <line x1="72" y1="200" x2="108" y2="200" stroke="#0284c7" stroke-width="2.4" marker-end="url(#e34-arrBlue)"/>

          <!-- Layer 1: Front WP Cushion (Ref.118: 501034501) -->
          <rect x="116" y="122" width="112" height="162" rx="10" fill="url(#e34-rubber)" stroke="#0f172a" stroke-width="2" filter="url(#e34-sh)"/>
          <ellipse cx="152" cy="186" rx="16" ry="22" fill="#ffffff"/>
          <ellipse cx="196" cy="186" rx="18" ry="22" fill="#ffffff"/>
          <rect x="168" y="160" width="10" height="52" fill="#0f172a"/>
          <text x="172" y="144" text-anchor="middle" font-size="10.2" font-weight="900" fill="#38bdf8">① 前面WP防水</text>
          <text x="172" y="242" text-anchor="middle" font-size="9.5" font-weight="700" fill="#e2e8f0">Ref.118 EPDM</text>
          <text x="172" y="260" text-anchor="middle" font-size="9.2" font-weight="700" fill="#fde047">2穴＋中央遮光橋</text>

          <!-- Layer 2: ES-1008 Polyimide Flex Board (Ref.116: A5022315A) -->
          <rect x="248" y="122" width="112" height="162" rx="10" fill="url(#e34-kapton)" stroke="#92400e" stroke-width="2" filter="url(#e34-sh)"/>
          <rect x="272" y="168" width="64" height="44" rx="5" fill="#1e293b" stroke="#facc15"/>
          <text x="304" y="194" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">センサーIC</text>
          <text x="304" y="144" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">② ES-1008フレキ</text>
          <text x="304" y="242" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fef3c7">Ref.116 A5022315A</text>
          <text x="304" y="260" text-anchor="middle" font-size="9.2" font-weight="700" fill="#ffffff">本体へ信号伝達</text>

          <!-- Layer 3: Rear RET Cushion (Ref.114: 501142001) -->
          <rect x="380" y="122" width="112" height="162" rx="10" fill="url(#e34-foam)" stroke="#475569" stroke-width="2" filter="url(#e34-sh)"/>
          <text x="436" y="144" text-anchor="middle" font-size="10.2" font-weight="900" fill="#fde047">③ 背面RET保持</text>
          <text x="436" y="194" text-anchor="middle" font-size="11" font-weight="800" fill="#f8fafc">高反発PORON</text>
          <text x="436" y="214" text-anchor="middle" font-size="9.5" font-weight="700" fill="#cbd5e1">前へ優しく押付け</text>
          <text x="436" y="242" text-anchor="middle" font-size="9.5" font-weight="700" fill="#e2e8f0">Ref.114 501142001</text>
          <text x="436" y="260" text-anchor="middle" font-size="9.2" font-weight="700" fill="#38bdf8">振動・隙間ゼロ!</text>

          <!-- Layer 4: Conductive Ni/Cu ES GND SHEET (Ref.115: 502997201) -->
          <rect x="512" y="122" width="122" height="162" rx="10" fill="url(#e34-mesh)" stroke="#475569" stroke-width="2" filter="url(#e34-sh)"/>
          <rect x="524" y="156" width="98" height="66" rx="7" fill="#ffffff" fill-opacity="0.9"/>
          <text x="573" y="144" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0f172a">④ ES GNDシート</text>
          <text x="573" y="182" text-anchor="middle" font-size="11.5" font-weight="900" fill="#d97706">⚡ 静電気(ESD)</text>
          <text x="573" y="202" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">ボディGNDへ逃がす</text>
          <text x="573" y="242" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0f172a">Ref.115 導電Ni/Cu布</text>
          <text x="573" y="260" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0369a1">冬のパチッを防御!</text>

          <!-- Ground symbol on far right -->
          <line x1="636" y1="202" x2="674" y2="202" stroke="#d97706" stroke-width="2.6" marker-end="url(#e34-arrAmber)"/>
          <text x="676" y="224" text-anchor="middle" font-size="10" font-weight="900" fill="#b45309">接地</text>

          <!-- Bottom caption bar -->
          <rect x="116" y="300" width="518" height="28" rx="14" fill="#fff7ed" stroke="#fdba74"/>
          <text x="375" y="318" text-anchor="middle" font-size="10.8" font-weight="800" fill="#9a3412">前面防水 ＋ 背面密着 ＋ 静電気アースの3重ガードで、雨天や冬場の誤動作を完全防止</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'アイセンサーの表裏を挟んで防水・', line2: '衝撃吸収・静電気対策する純正4点セット' },
          { label: 'スゴい工夫・秘密', line1: '前面EPDM＋背面PORONで密着封止し', line2: '導電Ni/Cuシートが静電気を安全に放電' },
          { label: '撮影でどう嬉しい？', line1: '雨の撮影や冬のセーター静電気でも', line2: 'EVF自動切替が壊れずずっと正確動作！' },
        ],
      });

    // =========================================================================
    // E35. Sony純正 VF SHEET, RADIATION (795)（Ref.203: 457578001）＆ VFフレキ保護シート
    // =========================================================================
    case 'evf_oem_vf_radiation_sheet':
      return wrapEvfHdSvg({
        badge: 'E35',
        title: 'Sony純正 VF放熱シート（Ref.203: 457578001）＆ 粘着保護膜',
        analogy: 'おでこに貼る冷却シートのようにOLEDを冷やす「水色＆ピンクの特製放熱シート」',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Authentic visual of Sony's iconic sky-blue & coral-pink 4-575-780-01 sheet! -->
          <rect x="24" y="84" width="318" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="183" y="106" text-anchor="middle" font-size="11.8" font-weight="800" fill="#0369a1">Sony実機に貼られる特徴的な2色シート</text>

          <!-- Iconic Sky-Blue Thermal Silicone Sheet with top-right index chamfer + Coral-Pink Lower Edge -->
          <path d="M 64 128 L 256 128 L 284 156 L 284 268 L 64 268 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2" filter="url(#e35-sh)"/>
          <rect x="65" y="232" width="218" height="35" fill="#f472b6"/>
          <!-- Registration holes -->
          <circle cx="84" cy="148" r="6" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
          <circle cx="264" cy="249" r="6" fill="#ffffff" stroke="#db2777" stroke-width="1.5"/>
          <text x="172" y="182" text-anchor="middle" font-size="12.5" font-weight="900" fill="#0c4a6e">VF RADIATION SHEET</text>
          <text x="172" y="202" text-anchor="middle" font-size="11" font-weight="800" fill="#0369a1">4-575-780-01 (Ref.203)</text>
          <text x="172" y="254" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">ピンク色の識別＆エッジ補強帯</text>

          <!-- Translucent Ref.202 anti-adhesion PET cover film peeking on right with peel ear -->
          <path d="M 284 146 L 316 146 L 316 172 L 284 176 Z" fill="#fef08a" fill-opacity="0.82" stroke="#eab308" stroke-width="1.5"/>
          <text x="300" y="164" text-anchor="middle" font-size="8.5" font-weight="800" fill="#854d0e">保護膜</text>
          <text x="183" y="302" text-anchor="middle" font-size="10.5" font-weight="800" fill="#334155">Ref.202 (457581811) 固着防止フィルム併用</text>

          <!-- Right: Lifespan & Temperature Impact Visual -->
          <rect x="358" y="84" width="334" height="118" rx="11" fill="#f0f9ff" stroke="#7dd3fc" stroke-width="1.3"/>
          <text x="374" y="108" font-size="12" font-weight="800" fill="#0c4a6e">🌡️ わずか「−10℃」冷やすだけで寿命約2倍！</text>
          <!-- Bar comparison -->
          <text x="374" y="138" font-size="10.5" font-weight="800" fill="#dc2626">放熱なし(高温)</text>
          <rect x="466" y="126" width="102" height="18" rx="4" fill="#fca5a5" stroke="#dc2626"/>
          <text x="576" y="139" font-size="10" font-weight="800" fill="#b91c1c">寿命 1.0×</text>

          <text x="374" y="172" font-size="10.5" font-weight="800" fill="#0284c7">放熱シートあり</text>
          <rect x="466" y="160" width="204" height="18" rx="4" fill="#38bdf8" stroke="#0284c7"/>
          <text x="568" y="173" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">OLED寿命 約 2.0倍 へ延長!</text>

          <rect x="358" y="214" width="334" height="118" rx="11" fill="#fdf2f8" stroke="#f9a8d4" stroke-width="1.3"/>
          <text x="374" y="238" font-size="12" font-weight="800" fill="#9d174d">🔧 なぜ「Ref.202 保護フィルム」も重ねるの？</text>
          <text x="374" y="264" font-size="10.5" font-weight="700" fill="#334155">① 柔らかい放熱シートが裏フタに貼り付くのを防止</text>
          <text x="374" y="286" font-size="10.5" font-weight="700" fill="#334155">② 修理で裏フタを開けた時、大事なフレキが千切れない</text>
          <text x="374" y="308" font-size="10.5" font-weight="800" fill="#be123c">→ 長寿命とメンテナンス性を両立するSonyの職人技!</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'EVF背面に貼り付けてOLEDの熱を', line2: '上部マグネシウム骨格へ逃がす放熱シート' },
          { label: 'スゴい工夫・秘密', line1: '高熱伝導シリコーン＋固着防止PET膜', line2: '温度10℃低減で焼き付き寿命を約2倍に' },
          { label: '撮影でどう嬉しい？', line1: '長時間の屋外連写でもOLEDが劣化せず', line2: '何年使っても発色鮮やかなファインダー！' },
        ],
      });

    default:
      return null;
  }
}
