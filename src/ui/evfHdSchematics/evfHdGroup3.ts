import { PartExplanation } from '../../assemblies/types';
import {
  drawCallout,
  drawRaindrop,
  drawStatusPill,
  wrapEvfHdSvg,
} from './shared';

/**
 * Ultra-HD 720x470 Beginner-Friendly Technical Infographics — Group 3 (E36–E55)
 */
export function renderEvfHdGroup3(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // =========================================================================
    // E36. Sony純正 EVF PROTECTOR (89100)（Ref.303: 502790801）上部保護シールド
    // =========================================================================
    case 'evf_oem_evf_protector':
      return wrapEvfHdSvg({
        badge: 'E36',
        title: 'Sony純正 EVF PROTECTOR（Ref.303: 502790801）上部保護シールド',
        analogy: '重いストロボの衝撃と高圧ノイズからレンズを守る「EVF専用ヘルメット」',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Cross-section of Top Hot-Shoe -> Impact/EMI -> Arched 3-Rib EVF Protector -> Safe EVF Barrel -->
          <!-- Top: Heavy Speedlight Flash mounted on MI Shoe -->
          <rect x="134" y="84" width="176" height="36" rx="7" fill="#1e293b" stroke="#0f172a" stroke-width="1.8" filter="url(#e36-sh)"/>
          <text x="222" y="107" text-anchor="middle" font-size="11.5" font-weight="800" fill="#fde047">⚡ 大光量ストロボ / MIシュー</text>

          <!-- Downward heavy impact force & flash EMI pulse arrows -->
          <line x1="176" y1="122" x2="176" y2="150" stroke="#e11d48" stroke-width="3" marker-end="url(#e36-arrRed)"/>
          <line x1="268" y1="122" x2="268" y2="150" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4 2" marker-end="url(#e36-arrAmber)"/>
          <text x="114" y="142" text-anchor="middle" font-size="10" font-weight="800" fill="#be123c">衝撃荷重↓</text>
          <text x="330" y="142" text-anchor="middle" font-size="10" font-weight="800" fill="#b45309">高圧EMI電波↓</text>

          <!-- Top dielectric Mylar sheet -->
          <rect x="148" y="152" width="148" height="8" rx="3" fill="#fde047" stroke="#ca8a04"/>
          <!-- Sculpted Arched 3-Ribbed EVF Protector Crown Shield (Ref.303: 502790801) -->
          <path d="M 66 244 Q 102 162 222 162 Q 342 162 378 244 L 354 252 Q 326 184 222 184 Q 118 184 90 252 Z" fill="url(#e36-steel)" stroke="#334155" stroke-width="2" filter="url(#e36-sh)"/>
          <!-- Side force-redirection arrows flowing safely AROUND the EVF barrel into camera chassis! -->
          <path d="M 184 172 Q 114 182 84 242" fill="none" stroke="#059669" stroke-width="2.6" marker-end="url(#e36-arrGreen)"/>
          <path d="M 260 172 Q 330 182 360 242" fill="none" stroke="#059669" stroke-width="2.6" marker-end="url(#e36-arrGreen)"/>
          <text x="222" y="177" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0f172a">3本補強リブ付アーチ装甲 (Ref.303)</text>

          <!-- Protected delicate EVF optical barrel safely underneath with air gap! -->
          <rect x="130" y="214" width="184" height="86" rx="14" fill="url(#e36-mg)" stroke="#0f172a" stroke-width="2"/>
          <ellipse cx="222" cy="257" rx="68" ry="26" fill="url(#e36-glass)" stroke="#0284c7" stroke-width="1.6"/>
          <text x="222" y="261" text-anchor="middle" font-size="11.5" font-weight="900" fill="#0c4a6e">EVF 光学レンズ鏡筒</text>
          <text x="222" y="318" text-anchor="middle" font-size="10.8" font-weight="800" fill="#059669">✅ 非接触の安全空間で精密レンズを100%保護！</text>

          <!-- Right Panel: 3 Protective Roles -->
          <rect x="424" y="88" width="268" height="236" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="440" y="112" font-size="12" font-weight="800" fill="#0f172a">天井ヘルメットが守る3つの危険</text>
          <rect x="438" y="128" width="240" height="54" rx="8" fill="#fff1f2" stroke="#fda4af"/>
          <text x="450" y="148" font-size="11" font-weight="800" fill="#9f1239">① ストロボ衝突の衝撃を左右へ逃がす</text>
          <text x="450" y="168" font-size="10" font-weight="600" fill="#475569">アーチ橋構造でEVF鏡筒へ力を伝えない</text>

          <rect x="438" y="192" width="240" height="54" rx="8" fill="#fffbeb" stroke="#fcd34d"/>
          <text x="450" y="212" font-size="11" font-weight="800" fill="#92400e">② 閃光時の数千V電磁ノイズを遮断</text>
          <text x="450" y="232" font-size="10" font-weight="600" fill="#475569">発光瞬間のEVFチラつき・乱れを防止</text>

          <rect x="438" y="256" width="240" height="54" rx="8" fill="#eff6ff" stroke="#93c5fd"/>
          <text x="450" y="276" font-size="11" font-weight="800" fill="#1e40af">③ 上面マイラー膜でショート＆熱遮断</text>
          <text x="450" y="296" font-size="10" font-weight="600" fill="#475569">MIシュー金具との電気絶縁＆上部断熱</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'EVF鏡筒とホットシューの間に挟む', line2: 'アーチ型の金属保護＆電磁シールド' },
          { label: 'スゴい工夫・秘密', line1: '3本補強リブ付きアーチ＋絶縁マイラー', line2: '衝撃荷重とストロボ高圧EMIを同時遮断' },
          { label: '撮影でどう嬉しい？', line1: '重いフラッシュを付けてぶつけても', line2: 'EVFの光軸が狂わず発光中も映像安定！' },
        ],
      });

    // =========================================================================
    // E37. Sony純正 DIOPTER COVER WP SHEET B（Ref.301）＆ ダイヤル化粧蓋（Ref.2）
    // =========================================================================
    case 'evf_oem_diopter_wp_sheet':
      return wrapEvfHdSvg({
        badge: 'E37',
        title: 'Sony純正 視度防水シートB（Ref.301）＆ ダイヤル化粧蓋（Ref.2）',
        analogy: '回って飛び出すダイヤル穴に雨を入れない「つるつる防水パッキン＆目隠し蓋」',
        accent: '#0369a1',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Cross-section of Diopter Shaft passing through Camera Wall + WP Sheet B + Cosmetic Cap + Single Screw -->
          <!-- Camera Top-Cover Outer Wall -->
          <rect x="196" y="96" width="38" height="224" rx="5" fill="url(#e37-mg)" stroke="#0f172a" stroke-width="1.8"/>
          <rect x="196" y="176" width="38" height="62" fill="#ffffff"/>
          <text x="215" y="126" text-anchor="middle" font-size="10" font-weight="800" fill="#f8fafc">ボディ</text>
          <text x="215" y="142" text-anchor="middle" font-size="10" font-weight="800" fill="#f8fafc">外壁</text>

          <!-- Ref.301 DIOPTER COVER WP SHEET B (Elastomer + white PTFE inner sliding collar!) -->
          <rect x="166" y="126" width="28" height="164" rx="5" fill="url(#e37-rubber)" stroke="#0f172a" stroke-width="1.6" filter="url(#e37-sh)"/>
          <rect x="166" y="174" width="28" height="66" rx="3" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
          <text x="148" y="114" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0369a1">Ref.301 防水シートB</text>

          <!-- Diopter Shaft running horizontally through the aperture -->
          <rect x="64" y="190" width="246" height="34" rx="5" fill="url(#e37-steel)" stroke="#475569" stroke-width="1.6"/>
          <text x="108" y="211" text-anchor="middle" font-size="10" font-weight="900" fill="#0f172a">視度軸</text>

          <!-- Outer Diopter Knob + Ref.2 Cosmetic Cap covering the SINGLE center Phillips screw! -->
          <rect x="266" y="148" width="76" height="118" rx="10" fill="url(#e37-rubber)" stroke="#0f172a" stroke-width="2" filter="url(#e37-sh)"/>
          <!-- Center stainless service screw recessed inside -->
          <rect x="298" y="197" width="30" height="20" rx="3" fill="url(#e37-steel)" stroke="#475569"/>
          <!-- Ref.2 Cosmetic Cap with laser-engraved - / 0 / + scale -->
          <rect x="344" y="156" width="22" height="102" rx="6" fill="url(#e37-mg)" stroke="#0284c7" stroke-width="2" filter="url(#e37-sh)"/>
          <text x="355" y="190" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">+</text>
          <text x="355" y="210" text-anchor="middle" font-size="10" font-weight="900" fill="#38bdf8">0</text>
          <text x="355" y="232" text-anchor="middle" font-size="12" font-weight="900" fill="#ffffff">−</text>

          <!-- Rain blocked from outside -->
          ${drawRaindrop(252, 126, 0.95)}
          <path d="M 250 140 L 244 172 L 198 172" fill="none" stroke="#0284c7" stroke-width="2.2" stroke-dasharray="3 2"/>
          <circle cx="192" cy="172" r="10" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
          <text x="192" y="176" text-anchor="middle" font-size="10.5" font-weight="900" fill="#dc2626">✕</text>

          <!-- Dual motion indicators: Rotate + Push/Pull -->
          <line x1="274" y1="286" x2="366" y2="286" stroke="#d97706" stroke-width="2.6" marker-start="url(#e37-arrAmber)" marker-end="url(#e37-arrAmber)"/>
          <text x="320" y="306" text-anchor="middle" font-size="10.5" font-weight="800" fill="#b45309">回転 ＋ 押引ストロークに追従!</text>

          <!-- Right explanation card -->
          <rect x="404" y="88" width="288" height="236" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="420" y="112" font-size="12" font-weight="800" fill="#0f172a">防水と「軽やかな回し心地」の両立</text>
          ${drawCallout(180, 184, 434, 146, 1, 'PTFE低摩擦インナーリング', 'ゴムだけだと重くなる回転をツルツル化', '#0284c7')}
          ${drawCallout(180, 250, 434, 196, 2, 'Ref.301 防水シートB (500374001)', 'ボディ右側のダイヤル穴から雨水を遮断', '#059669')}
          ${drawCallout(356, 208, 434, 246, 3, 'Ref.2 化粧蓋 (500367201)', '中央の固定ビス1本をサビ・汗から保護', '#475569')}
          <rect x="420" y="280" width="256" height="32" rx="8" fill="#e0f2fe"/>
          <text x="548" y="300" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0369a1">−/0/+ レーザー刻印で操作もひと目で分かる</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '軍艦部右側に出る視度ダイヤル穴の', line2: '防水シート＆中心ビスを隠す化粧蓋' },
          { label: 'スゴい工夫・秘密', line1: '弾性ゴム＋低摩擦PTFEの複合構造で', line2: '回転と押引きロックに滑らかに追従' },
          { label: '撮影でどう嬉しい？', line1: '雨の日にダイヤル操作しても浸水せず', line2: 'サビや砂噛みなく滑らかな感触が続く！' },
        ],
      });

    // =========================================================================
    // E38. Sony純正 JK-1028 フレキ中継基板（Ref.206）＆ JK HOLDER（Ref.205）
    // =========================================================================
    case 'evf_oem_jk1028_flex_holder':
      return wrapEvfHdSvg({
        badge: 'E38',
        title: 'Sony純正 JK-1028 フレキ中継基板（Ref.206）＆ JK HOLDER',
        analogy: '狭いスキマで薄い配線を折らずに導く「カーブ定規付きケーブルガイド」',
        accent: '#ea580c',
        accentSoft: '#fff7ed',
        body: `
          <!-- Left: NG Sharp Kink / Screw Pinch vs Right: OK Sony JK HOLDER Smooth R-Guide + Bridged Clamps -->
          <rect x="24" y="84" width="244" height="248" rx="11" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          ${drawStatusPill(40, 94, 198, 'ガイドなし：折れ＆噛み込み!', false)}
          <path d="M 88 142 L 88 202 L 154 202 L 154 268" fill="none" stroke="url(#e38-kapton)" stroke-width="12" stroke-linejoin="miter"/>
          <!-- Crack spark at sharp 90° fold -->
          <circle cx="88" cy="202" r="14" fill="#fee2e2" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2"/>
          <text x="150" y="168" font-size="10.8" font-weight="900" fill="#dc2626">⚡ 急角度で断線!</text>
          <text x="146" y="294" text-anchor="middle" font-size="10.2" font-weight="700" fill="#881337">薄いFPC銅箔は鋭く折ったり</text>
          <text x="146" y="312" text-anchor="middle" font-size="10.2" font-weight="700" fill="#881337">外装ビスで挟むと即故障する…</text>

          <!-- Right: OK Sony JK HOLDER (502789601) + JK-1028 Flex (A5022316A) -->
          <rect x="284" y="84" width="408" height="248" rx="11" fill="#f0fdf4" stroke="#86efac" stroke-width="1.4"/>
          ${drawStatusPill(302, 94, 294, 'Sony純正 JK HOLDER 曲面Rガイド＋押さえ橋', true)}

          <!-- Sculpted PPS JK HOLDER saddle -->
          <path d="M 382 134 L 444 134 L 444 274 L 382 274 Q 352 204 382 134 Z" fill="url(#e38-mg)" stroke="#0f172a" stroke-width="2" filter="url(#e38-sh)"/>
          <text x="408" y="208" text-anchor="middle" font-size="10" font-weight="800" fill="#e2e8f0" transform="rotate(-90, 408, 208)">JK HOLDER (PPS樹脂)</text>

          <!-- Smooth amber Kapton JK-1028 flex ribbon hugging the outer curve cleanly -->
          <path d="M 382 130 Q 340 204 374 282 L 404 316" fill="none" stroke="url(#e38-kapton)" stroke-width="14" stroke-linecap="round"/>
          <!-- Twin dark bridge retention straps clamping flex flat -->
          <rect x="342" y="156" width="38" height="14" rx="4" fill="#1e293b" stroke="#64748b"/>
          <rect x="342" y="238" width="38" height="14" rx="4" fill="#1e293b" stroke="#64748b"/>
          <!-- Tiny 0201 SMD filters on flex + Gold ZIF fingers at bottom -->
          <rect x="347" y="196" width="12" height="8" rx="1" fill="#cbd5e1" stroke="#475569"/>
          <rect x="347" y="210" width="12" height="8" rx="1" fill="#cbd5e1" stroke="#475569"/>
          <rect x="394" y="306" width="26" height="14" rx="2" fill="url(#e38-brass)" stroke="#92400e"/>

          <!-- Callouts on right half -->
          ${drawCallout(358, 162, 486, 154, 1, 'ブリッジ押さえ爪×2', 'フレキ浮き上がり・ネジ噛み防止', '#0f172a')}
          ${drawCallout(354, 204, 486, 206, 2, 'JK-1028 ポリイミドFPC', 'A5022316A・0201ノイズ対策実装', '#ea580c')}
          ${drawCallout(406, 312, 486, 258, 3, 'SUS補強板＋金メッキZIF', '確実な挿抜と高信頼電気接点', '#b45309')}
          <rect x="470" y="286" width="206" height="32" rx="8" fill="#dcfce7"/>
          <text x="573" y="306" text-anchor="middle" font-size="10.2" font-weight="800" fill="#14532d">最小曲げ半径を守り10年断線ゼロ！</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'EVF左脇の極狭すき間を通る中継配線', line2: 'と、それを曲面で保護する樹脂ガイド' },
          { label: 'スゴい工夫・秘密', line1: '滑らかなR曲面＋2本のブリッジ押さえで', line2: '急な折り曲げとビス噛み込みを完全防止' },
          { label: '撮影でどう嬉しい？', line1: '長年の振動や修理の開閉を経ても', line2: '配線断線によるEVF不調が起きない！' },
        ],
      });

    // =========================================================================
    // E39. Sony純正 VFブロック固定精密ネジ群（Ref.204/207/208）＆ ウェーブワッシャー
    // =========================================================================
    case 'evf_oem_vf_mounting_screws':
      return wrapEvfHdSvg({
        badge: 'E39',
        title: 'Sony純正 VF固定精密ネジ群（Ref.204/207/208）＆ 波型座金',
        analogy: '温度変化や衝撃をバネで吸収し絶対緩まない「精密バネ座金付きM1.7ボルト」',
        accent: '#64748b',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: 3 Sony OEM M1.7 Screw Varieties drawn to scale -->
          <rect x="24" y="84" width="334" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="191" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">箇所ごとに使い分ける 3種の純正M1.7ネジ</text>

          <!-- Screw 1: Ref.207 M1.7 L=4.0mm + Wave Washer (Rear 4 corners) -->
          <g transform="translate(82, 188)">
            <rect x="-18" y="-54" width="36" height="12" rx="5" fill="url(#e39-steel)" stroke="#475569" stroke-width="1.6"/>
            <path d="M -22 -36 Q -11 -44 0 -36 Q 11 -28 22 -36" fill="none" stroke="#d97706" stroke-width="4.2" stroke-linecap="round"/>
            <rect x="-8" y="-32" width="16" height="64" rx="2" fill="url(#e39-steel)" stroke="#475569" stroke-width="1.4"/>
            <rect x="-9" y="0" width="18" height="20" fill="#2563eb" opacity="0.85"/>
            <text x="0" y="54" text-anchor="middle" font-size="10.5" font-weight="900" fill="#0f172a">Ref.207 ×4本</text>
            <text x="0" y="70" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0369a1">M1.7 L=4.0mm</text>
            <text x="0" y="84" text-anchor="middle" font-size="9" font-weight="700" fill="#b45309">(背面4隅＋波座金)</text>
          </g>

          <!-- Screw 2: Ref.204 M1.7 L=3.0mm (Lower Chassis Mount) -->
          <g transform="translate(192, 188)">
            <rect x="-16" y="-44" width="32" height="11" rx="4" fill="url(#e39-mg)" stroke="#0f172a" stroke-width="1.6"/>
            <rect x="-20" y="-31" width="40" height="5" rx="2" fill="url(#e39-brass)"/>
            <rect x="-8" y="-26" width="16" height="50" rx="2" fill="url(#e39-steel)" stroke="#475569" stroke-width="1.4"/>
            <text x="0" y="54" text-anchor="middle" font-size="10.5" font-weight="900" fill="#0f172a">Ref.204 ×2本</text>
            <text x="0" y="70" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0369a1">M1.7 L=3.0mm</text>
            <text x="0" y="84" text-anchor="middle" font-size="9" font-weight="700" fill="#475569">(底面シャーシ締結)</text>
          </g>

          <!-- Screw 3: Ref.208 M1.7 P2 L=2.5mm (Self-tapping rear anchor) -->
          <g transform="translate(298, 188)">
            <rect x="-16" y="-36" width="32" height="11" rx="4" fill="#1e293b" stroke="#0f172a" stroke-width="1.6"/>
            <path d="M -8 -25 L 8 -25 L 5 18 L 0 24 L -5 18 Z" fill="url(#e39-mg)" stroke="#0f172a" stroke-width="1.4"/>
            <text x="0" y="54" text-anchor="middle" font-size="10.5" font-weight="900" fill="#0f172a">Ref.208 ×1本</text>
            <text x="0" y="70" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0369a1">M1.7 P2 L=2.5mm</text>
            <text x="0" y="84" text-anchor="middle" font-size="9" font-weight="700" fill="#475569">(後方アンカー締結)</text>
          </g>

          <!-- Right: Zoomed 3-Wave Sinusoidal SUS301 Wave Washer Physics -->
          <rect x="374" y="84" width="318" height="248" rx="11" fill="#fffbeb" stroke="#fcd34d" stroke-width="1.3"/>
          <text x="533" y="108" text-anchor="middle" font-size="12" font-weight="800" fill="#92400e">🌊 なぜ平らでなく「3山ウェーブ座金」？</text>

          <!-- Magnified 3-wave sinusoidal ring -->
          <path d="M 412 164 C 434 134 456 134 478 164 C 500 194 522 194 544 164 C 566 134 588 134 610 164 C 626 184 642 184 656 164" fill="none" stroke="url(#e39-brass)" stroke-width="10" stroke-linecap="round" filter="url(#e39-sh)"/>
          <line x1="445" y1="122" x2="445" y2="140" stroke="#0284c7" stroke-width="2.4" marker-end="url(#e39-arrBlue)"/>
          <line x1="577" y1="122" x2="577" y2="140" stroke="#0284c7" stroke-width="2.4" marker-end="url(#e39-arrBlue)"/>
          <text x="533" y="206" text-anchor="middle" font-size="10.8" font-weight="900" fill="#b45309">SUS301 3山バネが常時テンションを維持!</text>

          <rect x="390" y="220" width="286" height="96" rx="9" fill="#ffffff" stroke="#fde68a"/>
          <text x="404" y="242" font-size="10.8" font-weight="800" fill="#0f172a">① 寒暖差（−20〜+50℃）の膨張を吸収</text>
          <text x="404" y="262" font-size="10.2" font-weight="600" fill="#475569">金属と樹脂の伸び縮み差で緩むのをバネが追従</text>
          <text x="404" y="286" font-size="10.8" font-weight="800" fill="#059669">② 修理再組立でも傾き ±0.05° 以内を再現</text>
          <text x="404" y="304" font-size="10.2" font-weight="600" fill="#475569">青い緩み止め剤＋波座金で無調整の高精度固定</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'EVFブロック全体をカメラ骨格へ', line2: '狂いなく固定する純正M1.7精密ネジ群' },
          { label: 'スゴい工夫・秘密', line1: '3山ウェーブ座金＋緩み止め剤で', line2: '温度膨張と衝撃を吸収し傾き±0.05°以内' },
          { label: '撮影でどう嬉しい？', line1: '長年のハードな現場使用や修理後でも', line2: 'ファインダーの水平・光軸が一切狂わない！' },
        ],
      });

    // =========================================================================
    // E40. ファインダー頭頂・MIシュー外枠 SHELL PLATE・FIX PLATE ＆ ネジ隠し板
    // =========================================================================
    case 'evf_surr_mi_shoe_shell':
      return wrapEvfHdSvg({
        badge: 'E40',
        title: 'MIシュー外枠 SHELL PLATE・裏側FIX PLATE ＆ ネジ隠し板',
        analogy: 'カメラの屋根をステンレス2枚で挟んで大光量フラッシュを支える「鋼鉄サンドイッチ台座」',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Top View of ISO 518 / Sony MI Shoe Shell Plate (3 lock holes + Pin 22 X-sync!) -->
          <rect x="24" y="84" width="276" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="162" y="106" text-anchor="middle" font-size="11.8" font-weight="800" fill="#0f172a">真上から見た SHELL PLATE (500294302)</text>

          <!-- U-shaped ISO 518 overhanging stainless rails -->
          <rect x="68" y="126" width="188" height="162" rx="10" fill="url(#e40-steel)" stroke="#334155" stroke-width="2" filter="url(#e40-sh)"/>
          <rect x="98" y="150" width="128" height="138" rx="4" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
          <!-- Front 21-pin MIS-2006 overhang area -->
          <rect x="94" y="128" width="136" height="24" rx="4" fill="#1e293b"/>
          <text x="162" y="144" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fde047">前面21ピン接点格納庇</text>
          <!-- Center Pin 22 circular X-sync flash contact -->
          <circle cx="162" cy="202" r="15" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
          <circle cx="162" cy="202" r="10" fill="url(#e40-brass)" stroke="#92400e" stroke-width="1.5"/>
          <text x="162" y="206" text-anchor="middle" font-size="8.5" font-weight="900" fill="#713f12">P22</text>
          <!-- 3 Authentic Sony/ISO Locking-Pin Socket Holes -->
          <circle cx="162" cy="252" r="9" fill="#0f172a" stroke="#64748b" stroke-width="1.5"/>
          <circle cx="118" cy="264" r="6" fill="#0f172a" stroke="#64748b" stroke-width="1.5"/>
          <circle cx="206" cy="264" r="6" fill="#0f172a" stroke="#64748b" stroke-width="1.5"/>
          <text x="162" y="314" text-anchor="middle" font-size="10.2" font-weight="800" fill="#334155">中央X接点(Pin22) ＋ 脱落防止ロック穴×3</text>

          <!-- Right: Side Sandwich Cross-Section clamping the Camera Top Roof! -->
          <rect x="316" y="84" width="376" height="248" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="504" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">🔨 なぜ重いXLRハンドルやストロボで折れない？</text>

          <!-- Top L-profile overhanging guide rails + Screw Cover hiding 4 Ref.328 bolts -->
          <path d="M 358 176 L 358 138 L 408 138 L 408 152 L 376 152 L 376 176 Z" fill="url(#e40-steel)" stroke="#334155" stroke-width="1.6"/>
          <path d="M 650 176 L 650 138 L 600 138 L 600 152 L 632 152 L 632 176 Z" fill="url(#e40-steel)" stroke="#334155" stroke-width="1.6"/>
          <rect x="358" y="172" width="292" height="16" rx="3" fill="url(#e40-steel)" stroke="#334155" stroke-width="1.6"/>
          <!-- Slide-in Screw Cover Plate (Ref.329) -->
          <rect x="422" y="162" width="164" height="10" rx="3" fill="#e2e8f0" stroke="#0284c7" stroke-width="1.5"/>
          <text x="504" y="156" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0369a1">ネジ隠し板 (Ref.329)</text>

          <!-- Camera Top Cover Magnesium Roof sandwiched in the middle! -->
          <rect x="336" y="188" width="336" height="32" rx="4" fill="url(#e40-mg)" stroke="#0f172a" stroke-width="1.8"/>
          <!-- Heavy Under-Roof Anchor FIX PLATE (Ref.311: 500395901) -->
          <rect x="352" y="220" width="304" height="22" rx="4" fill="url(#e40-steel)" stroke="#334155" stroke-width="1.8" filter="url(#e40-sh)"/>
          <!-- 4 Special M1.7 L=3.3mm Bolts (Ref.328) passing cleanly through ALL 3 layers (drawn beneath labels)! -->
          ${[376, 412, 596, 632]
            .map((bx) => `<rect x="${bx - 5}" y="172" width="10" height="76" rx="2" fill="#d97706" stroke="#78350f" stroke-width="1.2"/>`)
            .join('')}
          <text x="504" y="208" text-anchor="middle" font-size="10.2" font-weight="800" fill="#f8fafc">カメラ軍艦部（天井）を上下から挟み込み!</text>
          <text x="504" y="235" text-anchor="middle" font-size="9.8" font-weight="900" fill="#0f172a">裏側アンカー固定板 FIX PLATE (Ref.311)</text>

          <rect x="336" y="266" width="336" height="52" rx="8" fill="#e0f2fe" stroke="#0284c7"/>
          <text x="504" y="287" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0369a1">特殊M1.7ボルト4本（Ref.328）で屋根を強固にサンドイッチ締結!</text>
          <text x="504" y="306" text-anchor="middle" font-size="10" font-weight="700" fill="#0c4a6e">ISO 518汎用互換 ＋ Sony独自MIアクセサリの高曲げ剛性を実現</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'ストロボやマイクを装着する金属台座と', line2: '屋根の裏から支える高剛性固定板セット' },
          { label: 'スゴい工夫・秘密', line1: '天井を上下2枚のSUS板＋特殊4ボルトで', line2: '挟み込み、ネジ頭もカバー板で美しく隠す' },
          { label: '撮影でどう嬉しい？', line1: '重い大光量フラッシュやXLRハンドルで', line2: '振り回してもガタつかず安心の堅牢性！' },
        ],
      });

    // =========================================================================
    // E41. Sony純正 21ピン デジタルオーディオ対応 MIS-2006 接点基板＆防滴ラバー
    // =========================================================================
    case 'evf_surr_mi_shoe_contacts':
      return wrapEvfHdSvg({
        badge: 'E41',
        title: 'Sony純正 21ピン デジタルオーディオ MIS-2006 接点＆防滴ラバー',
        analogy: 'ケーブル1本なしで音声・電源・通信を同時に届ける「21車線の超小型高速道路」',
        accent: '#ca8a04',
        accentSoft: '#fefce8',
        body: `
          <!-- Top: Magnified 21-Pin Front Micro-Pitch Gold Contact Comb (Pins 1–21 grouped by function!) -->
          <rect x="24" y="84" width="672" height="128" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="360" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#713f12">シュー先端に隠された「21本独立 金メッキ接点（MIS-2006）」と22枚の絶縁隔壁</text>

          <!-- Black LCP comb housing -->
          <rect x="44" y="118" width="632" height="46" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="1.8" filter="url(#e41-sh)"/>
          <!-- 21 individual cantilevered gold contact fingers + 22 thin LCP divider walls! -->
          ${Array.from({ length: 21 })
            .map((_, i) => {
              const px = 62 + i * 28.8;
              return `
                <rect x="${px.toFixed(1)}" y="126" width="18" height="30" rx="2" fill="url(#e41-brass)" stroke="#92400e" stroke-width="1"/>
                <text x="${(px + 9).toFixed(1)}" y="145" text-anchor="middle" font-size="8.5" font-weight="900" fill="#713f12">${i + 1}</text>
              `;
            })
            .join('')}

          <!-- Function color brackets below the 21 pins -->
          <rect x="58" y="172" width="166" height="28" rx="6" fill="#dbeafe" stroke="#2563eb"/>
          <text x="141" y="190" text-anchor="middle" font-size="10.2" font-weight="800" fill="#1e40af">🎙️ 4ch 24-bitデジタル音声</text>

          <rect x="234" y="172" width="140" height="28" rx="6" fill="#fef3c7" stroke="#d97706"/>
          <text x="304" y="190" text-anchor="middle" font-size="10.2" font-weight="800" fill="#92400e">🔋 バッテリー給電</text>

          <rect x="384" y="172" width="144" height="28" rx="6" fill="#dcfce7" stroke="#16a34a"/>
          <text x="456" y="190" text-anchor="middle" font-size="10.2" font-weight="800" fill="#14532d">⚡ 高速TTL・通信制御</text>

          <rect x="538" y="172" width="136" height="28" rx="6" fill="#f1f5f9" stroke="#64748b"/>
          <text x="606" y="190" text-anchor="middle" font-size="10.2" font-weight="800" fill="#334155">🛡️ GND / 認識ピン</text>

          <!-- Bottom Left: Side cutaway of Waterproof FPC Entry Boot (Ref.324: 501695501) -->
          <rect x="24" y="224" width="328" height="108" rx="11" fill="#f0f9ff" stroke="#7dd3fc" stroke-width="1.3"/>
          <text x="40" y="246" font-size="11.5" font-weight="800" fill="#0369a1">💧 防滴ラバーブーツ（Ref.324: 501695501）</text>
          ${drawRaindrop(54, 282, 0.9)}
          <rect x="82" y="264" width="84" height="44" rx="8" fill="url(#e41-rubber)" stroke="#0f172a" stroke-width="1.6"/>
          <text x="124" y="290" text-anchor="middle" font-size="9.5" font-weight="800" fill="#38bdf8">EPDM防滴ブーツ</text>
          <path d="M 166 286 L 214 286" stroke="url(#e41-kapton)" stroke-width="10"/>
          <text x="278" y="276" text-anchor="middle" font-size="10.2" font-weight="700" fill="#0c4a6e">配線入口を2重リップで</text>
          <text x="278" y="294" text-anchor="middle" font-size="10.2" font-weight="700" fill="#0c4a6e">密閉し雨天浸水を防止!</text>
          <text x="278" y="312" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0284c7">TVS静電気保護ICも搭載</text>

          <!-- Bottom Right: Cable-Free Digital Audio Advantage -->
          <rect x="368" y="224" width="328" height="108" rx="11" fill="#ecfdf5" stroke="#6ee7b7" stroke-width="1.3"/>
          <text x="384" y="246" font-size="11.5" font-weight="800" fill="#065f46">✨ なぜSonyのMIシューは動画撮影で最強？</text>
          <text x="384" y="272" font-size="10.5" font-weight="700" fill="#14532d">① マイクを挿すだけでケーブルレス＆電池不要！</text>
          <text x="384" y="294" font-size="10.5" font-weight="700" fill="#14532d">② アナログ劣化なしの 24-bit/48kHz デジタル直結</text>
          <text x="384" y="314" font-size="10.2" font-weight="600" fill="#047857">※ 22枚のLCP絶縁隔壁でピン同士のショートも完全防止</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'ホットシュー奥に並んだ21本の金接点', line2: '＆雨の侵入を防ぐ防水ラバー配線部' },
          { label: 'スゴい工夫・秘密', line1: '0.5mm級の21接点＋22枚絶縁隔壁で', line2: '4chデジタル音声・給電・制御を一括伝達' },
          { label: '撮影でどう嬉しい？', line1: 'ショットガンマイクやワイヤレス受信機が', line2: 'ケーブルなし＆電池なしで高音質収録！' },
        ],
      });

    // =========================================================================
    // E42. Sony純正 MI SHOE SPRING PLATE（Ref.331）押圧板バネ＆防塵シューキャップ
    // =========================================================================
    case 'evf_surr_mi_shoe_springs':
      return wrapEvfHdSvg({
        badge: 'E42',
        title: 'Sony純正 MIシュー押圧板バネ（Ref.331）＆ 防塵キャップ',
        analogy: 'アクセサリのガタつきを消す「2本アーチ板バネ」と接点を守る「専用レインキャップ」',
        accent: '#1e293b',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Side cutaway of Twin Arched SUS301-CSP Anti-Rattle Leaf Springs (Ref.331) -->
          <rect x="24" y="84" width="332" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="190" y="106" text-anchor="middle" font-size="11.8" font-weight="800" fill="#0f172a">① 2本アーチ板バネ（Ref.331: 500294502）</text>

          <!-- Mounted accessory foot pressed tightly upward against ISO rails -->
          <rect x="74" y="136" width="232" height="44" rx="7" fill="url(#e42-mg)" stroke="#0f172a" stroke-width="1.8" filter="url(#e42-sh)"/>
          <text x="190" y="163" text-anchor="middle" font-size="11" font-weight="800" fill="#f8fafc">ストロボ / マイク装着脚</text>

          <!-- Upward spring preload arrows -->
          <line x1="138" y1="224" x2="138" y2="188" stroke="#059669" stroke-width="3" marker-end="url(#e42-arrGreen)"/>
          <line x1="242" y1="224" x2="242" y2="188" stroke="#059669" stroke-width="3" marker-end="url(#e42-arrGreen)"/>

          <!-- Arched S-curve SUS301-CSP cantilever spring beams + contact domes -->
          <path d="M 68 248 Q 140 198 244 218 Q 282 226 296 244" fill="none" stroke="url(#e42-steel)" stroke-width="8" stroke-linecap="round"/>
          <path d="M 68 248 Q 140 198 244 218 Q 282 226 296 244" fill="none" stroke="#334155" stroke-width="1.8"/>
          <circle cx="138" cy="212" r="7" fill="#eab308" stroke="#713f12" stroke-width="1.5"/>
          <circle cx="242" cy="218" r="7" fill="#eab308" stroke="#713f12" stroke-width="1.5"/>
          <!-- Base deck + Ref.330 screw -->
          <rect x="54" y="246" width="272" height="16" rx="3" fill="#cbd5e1" stroke="#64748b"/>
          <text x="190" y="286" text-anchor="middle" font-size="10.8" font-weight="800" fill="#065f46">上へグッと押し上げてガタつきゼロ!</text>
          <text x="190" y="306" text-anchor="middle" font-size="10" font-weight="600" fill="#475569">SUS301-CSP ばね鋼：着脱 10,000回以上の高耐久</text>
          <text x="190" y="322" text-anchor="middle" font-size="10" font-weight="700" fill="#0369a1">→ 21ピンデジタル接点の接触不良を防止！</text>

          <!-- Right: FA-SHC1M / 443873412 Dust & Rain Shoe Cap Anatomy -->
          <rect x="372" y="84" width="320" height="248" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="532" y="106" text-anchor="middle" font-size="11.8" font-weight="800" fill="#0f172a">② 防塵防滴シューキャップ（FA-SHC1M / Ref.9）</text>

          <!-- Side-3D profile of Sony FA-SHC1M Shoe Cap -->
          <path d="M 412 162 L 626 162 L 626 206 L 598 206 L 598 184 L 412 184 Z" fill="url(#e42-rubber)" stroke="#0f172a" stroke-width="2" filter="url(#e42-sh)"/>
          <!-- 5 Rear Tactile Thumb Grip Ribs on left (-Z) -->
          ${Array.from({ length: 5 })
            .map((_, i) => `<rect x="${424 + i * 10}" y="156" width="5" height="6" rx="1.5" fill="#475569"/>`)
            .join('')}
          <!-- Side guide runner & front 21-pin protective dust hood! -->
          <rect x="444" y="184" width="144" height="16" rx="3" fill="#475569" stroke="#0f172a"/>
          ${drawRaindrop(650, 170, 0.9)}
          <line x1="646" y1="184" x2="628" y2="184" stroke="#0284c7" stroke-width="2" marker-end="url(#e42-arrBlue)"/>

          ${drawCallout(446, 156, 444, 134, 1, '5本指掛かりリブ', '手袋でもスッと引き抜ける', '#475569')}
          ${drawCallout(614, 198, 566, 232, 2, '前面21ピン防塵フード', 'ホコリ・水滴・サビを遮断', '#0284c7', 'end')}

          <rect x="390" y="256" width="284" height="60" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="404" y="276" font-size="10.5" font-weight="800" fill="#0f172a">・20.5×19.7×4.15mm のスリムPC+ABS設計</text>
          <text x="404" y="296" font-size="10.2" font-weight="700" fill="#0369a1">・未使用時に装着すれば21本の精密金接点が長持ち！</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '装着したフラッシュを固定する板バネと', line2: '未使用時に21接点を守る専用キャップ' },
          { label: 'スゴい工夫・秘密', line1: '1万回耐久SUSばね鋼の2本アーチ構造＋', line2: '前面21ピンまで覆う5本リブ付防塵蓋' },
          { label: '撮影でどう嬉しい？', line1: 'マイクのカタカタ音や接点腐食を防ぎ', line2: 'いつでも確実にデジタル通信が安定！' },
        ],
      });

    // =========================================================================
    // E43. ファインダー両脇・内蔵ステレオMEMSマイク＆防振ゴムブーツ＆保持枠
    // =========================================================================
    case 'evf_surr_stereo_mics':
      return wrapEvfHdSvg({
        badge: 'E43',
        title: 'EVF両脇・ステレオMEMSマイク ＆ 蛇腹防振ゴムブーツ',
        analogy: 'ボディの振動ノイズだけを吸収する「サスペンション付き極小マイク部屋」',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        body: `
          <!-- Left: Cross-section of Fluted Silicone Isolation Boot (Ref.304) suspending MEMS Capsule! -->
          <rect x="24" y="84" width="358" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="203" y="106" text-anchor="middle" font-size="11.8" font-weight="800" fill="#92400e">蛇腹ゴムブーツ（Ref.304）によるフローティング防振</text>

          <!-- Clean ambient voice/sound waves entering from top acoustic pinhole -->
          <path d="M 164 126 Q 203 142 242 126" fill="none" stroke="#059669" stroke-width="2.6"/>
          <path d="M 176 140 Q 203 152 230 140" fill="none" stroke="#10b981" stroke-width="2.4"/>
          <text x="203" y="122" text-anchor="middle" font-size="10.2" font-weight="900" fill="#059669">🎵 外部のクリアな音だけ通過 ✅</text>

          <!-- Outer Rigid PPS MIC HOLDER (Ref.308: 502790401) attached to vibrating camera body -->
          <rect x="92" y="168" width="222" height="106" rx="12" fill="url(#e43-mg)" stroke="#0f172a" stroke-width="2"/>
          <rect x="118" y="176" width="170" height="90" rx="8" fill="#f8fafc"/>

          <!-- Fluted Accordion Silicone Rubber Boot (Ref.304: 502687801) absorbing solid-borne noise! -->
          <path d="M 134 176 L 146 190 L 132 204 L 146 218 L 132 232 L 146 246 L 134 264 L 272 264 L 260 246 L 274 232 L 260 218 L 274 204 L 260 190 L 272 176 Z" fill="url(#e43-rubber)" stroke="#0f172a" stroke-width="1.6" filter="url(#e43-sh)"/>

          <!-- Suspended Gold-Shielded MEMS Microphone Capsule floating inside! -->
          <rect x="160" y="192" width="86" height="44" rx="6" fill="url(#e43-brass)" stroke="#713f12" stroke-width="1.8"/>
          <circle cx="203" cy="204" r="5" fill="#0f172a"/>
          <text x="203" y="226" text-anchor="middle" font-size="10.2" font-weight="900" fill="#713f12">MEMSマイク</text>
          <!-- Carrier PCB + Amber Flex tail -->
          <rect x="166" y="238" width="74" height="12" rx="2" fill="url(#e43-pcb)"/>
          <rect x="190" y="250" width="26" height="54" rx="3" fill="url(#e43-kapton)" stroke="#92400e"/>

          <!-- Vibrations from IBIS/Shutter/AF Motor blocked at rubber accordion walls! -->
          <path d="M 38 220 L 48 210 L 58 230 L 68 210 L 78 230 L 88 220" fill="none" stroke="#dc2626" stroke-width="2.6"/>
          <text x="64" y="250" text-anchor="middle" font-size="9.5" font-weight="900" fill="#dc2626">IBIS/AF振動❌</text>
          <path d="M 318 220 L 328 210 L 338 230 L 348 210 L 358 230 L 368 220" fill="none" stroke="#dc2626" stroke-width="2.6"/>
          <text x="342" y="250" text-anchor="middle" font-size="9.5" font-weight="900" fill="#dc2626">操作音振動❌</text>
          <text x="203" y="320" text-anchor="middle" font-size="10.2" font-weight="800" fill="#b45309">柔らかい蛇腹ゴムが機械振動を熱に変えて吸収!</text>

          <!-- Right: Symmetric Left/Right Stereo Layout around EVF Hump -->
          <rect x="398" y="84" width="294" height="248" rx="11" fill="#fffbeb" stroke="#fcd34d" stroke-width="1.3"/>
          <text x="545" y="108" text-anchor="middle" font-size="12" font-weight="800" fill="#92400e">🎧 EVF左右対称ステレオ配置の秘密</text>

          <!-- Top-down mini EVF hump with L & R mics flanking it -->
          <rect x="494" y="132" width="102" height="86" rx="12" fill="url(#e43-mg)" stroke="#0f172a" stroke-width="1.8"/>
          <text x="545" y="180" text-anchor="middle" font-size="11" font-weight="800" fill="#e2e8f0">EVF 軍艦部</text>
          <!-- Left Mic -->
          <circle cx="452" cy="175" r="24" fill="url(#e43-rubber)" stroke="#d97706" stroke-width="2"/>
          <text x="452" y="179" text-anchor="middle" font-size="11.5" font-weight="900" fill="#fde047">L</text>
          <!-- Right Mic -->
          <circle cx="638" cy="175" r="24" fill="url(#e43-rubber)" stroke="#d97706" stroke-width="2"/>
          <text x="638" y="179" text-anchor="middle" font-size="11.5" font-weight="900" fill="#fde047">R</text>

          <rect x="416" y="232" width="258" height="84" rx="9" fill="#ffffff" stroke="#fde68a"/>
          <text x="430" y="254" font-size="10.5" font-weight="800" fill="#0f172a">・左右対称配置で自然なステレオ臨場感</text>
          <text x="430" y="276" font-size="10.5" font-weight="700" fill="#334155">・金メッキファラデー蓋でEVF電波ノイズ遮断</text>
          <text x="430" y="298" font-size="10.2" font-weight="700" fill="#b45309">・Ref.304ゴムブーツ＋Ref.308保持枠の純正設計</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'EVFの左右両脇に収まるステレオ', line2: '内蔵マイクと振動絶縁ゴムブーツ組' },
          { label: 'スゴい工夫・秘密', line1: '蛇腹シリコンゴムでマイクを宙に浮かせ', line2: 'AF音・手ブレ補正振動の固体伝播を遮断' },
          { label: '撮影でどう嬉しい？', line1: '外付けマイクなしの手軽な動画撮影でも', line2: 'カメラの動作音が入らずクリアに録音！' },
        ],
      });

    // =========================================================================
    // E44. マイク集音口・疎水アコースティック防風ステンレスメッシュ＆ePTFE防滴メンブレン
    // =========================================================================
    case 'evf_surr_mic_wind_mesh':
      return wrapEvfHdSvg({
        badge: 'E44',
        title: 'マイク集音口・防風ステンレスメッシュ＆ePTFE防滴メンブレン',
        analogy: '強い風と雨粒だけ弾き、声や音楽だけそのまま通す「ゴアテックス製の防風網戸」',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        body: `
          <!-- Cross-section of 3-Pinhole Top Bezel -> Stainless Wind Mesh -> White Hydrophobic ePTFE Membrane -> Safe Mic -->
          <!-- Top: howling wind + heavy raindrops + clean sound wave -->
          <path d="M 74 114 Q 112 96 150 114 Q 186 132 224 114" fill="none" stroke="#64748b" stroke-width="2.6" stroke-dasharray="5 3" marker-end="url(#e44-arrSlate)"/>
          <text x="148" y="96" text-anchor="middle" font-size="10.5" font-weight="800" fill="#475569">💨 強風の乱気流（ボボボ音）</text>
          ${drawRaindrop(322, 110, 1.05)}
          ${drawRaindrop(364, 118, 0.85)}
          <text x="344" y="96" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0284c7">🌧️ 雨粒（30kPa耐水）</text>

          <!-- Layer 1: Dark Anodized 3-Pinhole Top Bezel -->
          <rect x="64" y="138" width="348" height="22" rx="5" fill="url(#e44-mg)" stroke="#0f172a" stroke-width="1.6"/>
          <rect x="136" y="138" width="16" height="22" fill="#ffffff"/>
          <rect x="230" y="138" width="16" height="22" fill="#ffffff"/>
          <rect x="324" y="138" width="16" height="22" fill="#ffffff"/>

          <!-- Layer 2: Fine Woven Stainless Steel Acoustic Wind-Noise Mesh -->
          <rect x="74" y="168" width="328" height="28" rx="5" fill="url(#e44-mesh)" stroke="#475569" stroke-width="1.8" filter="url(#e44-sh)"/>
          <rect x="164" y="172" width="148" height="20" rx="10" fill="#ffffff" fill-opacity="0.92"/>
          <text x="238" y="186" text-anchor="middle" font-size="10" font-weight="900" fill="#0f172a">① SUS微細防風メッシュ</text>

          <!-- Layer 3: Porous White Hydrophobic ePTFE Waterproof Acoustic Membrane -->
          <rect x="74" y="206" width="328" height="30" rx="5" fill="#ffffff" stroke="#0891b2" stroke-width="2.2" filter="url(#e44-sh)"/>
          <text x="238" y="225" text-anchor="middle" font-size="10.5" font-weight="900" fill="#0e7490">② 撥水多孔質 ePTFE 防水音響メンブレン</text>

          <!-- Water blocked cleanly on top of ePTFE, Sound Wave passing cleanly DOWN to MEMS Mic! -->
          <circle cx="304" cy="198" r="6" fill="#38bdf8" stroke="#0284c7" stroke-width="1.4"/>
          <text x="315" y="201" font-size="9.2" font-weight="900" fill="#dc2626">水は完全遮断❌</text>

          <!-- Sound wave arrow straight down into MEMS Mic -->
          <line x1="238" y1="126" x2="238" y2="274" stroke="#059669" stroke-width="3.2" marker-end="url(#e44-arrGreen)"/>
          <!-- Bottom MEMS Mic Capsule -->
          <rect x="158" y="280" width="160" height="44" rx="8" fill="url(#e44-brass)" stroke="#713f12" stroke-width="1.8"/>
          <text x="238" y="307" text-anchor="middle" font-size="11.5" font-weight="900" fill="#713f12">🎵 MEMSマイク（安全・高音質）</text>

          <!-- Right Specs & Why It Sounds Natural -->
          <rect x="434" y="88" width="258" height="236" rx="11" fill="#ecfeff" stroke="#67e8f9" stroke-width="1.3"/>
          <text x="450" y="112" font-size="12" font-weight="800" fill="#155e75">どうやって水だけ止めて音を通す？</text>
          <rect x="448" y="128" width="230" height="54" rx="8" fill="#ffffff" stroke="#a5f3fc"/>
          <text x="460" y="148" font-size="10.8" font-weight="800" fill="#0f172a">① ステン網が風の渦を細かく砕く</text>
          <text x="460" y="168" font-size="10" font-weight="600" fill="#475569">吹かれ音（ボボボ）の発生を大幅低減</text>

          <rect x="448" y="192" width="230" height="54" rx="8" fill="#ffffff" stroke="#a5f3fc"/>
          <text x="460" y="212" font-size="10.8" font-weight="800" fill="#0e7490">② ePTFE膜の超極細孔（耐水圧&gt;30kPa）</text>
          <text x="460" y="232" font-size="10" font-weight="600" fill="#475569">雨粒より遥かに小さい穴で水を完全遮断</text>

          <rect x="448" y="256" width="230" height="54" rx="8" fill="#dcfce7" stroke="#86efac"/>
          <text x="460" y="276" font-size="10.8" font-weight="800" fill="#14532d">③ 音響ロス 1.5 dB 未満のフラット特性</text>
          <text x="460" y="296" font-size="10" font-weight="600" fill="#166534">20Hz〜20kHzの音楽も声もこもらない！</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'マイク穴のすぐ裏に仕込まれた', line2: '2層構造の防風網＆防水通音フィルター' },
          { label: 'スゴい工夫・秘密', line1: 'SUS防風網＋耐水圧30kPaのePTFE膜で', line2: '雨と風を止め音の劣化は1.5dB未満' },
          { label: '撮影でどう嬉しい？', line1: '雨の屋外ロケでもマイクが水没せず', line2: '風が吹いてもクリアで自然なステレオ録音' },
        ],
      });

    // =========================================================================
    // E45. ファインダー軍艦部合わせ目・全周防塵防滴スポンジガスケット＆遮光シール枠
    // =========================================================================
    case 'evf_surr_hump_wp_gasket':
      return wrapEvfHdSvg({
        badge: 'E45',
        title: 'EVF軍艦部合わせ目・360°防塵防滴ガスケット＆遮光シール枠',
        analogy: 'ボディと軍艦部のスキマを1ミリも残さず塞ぐ「全周ぐるり防水＆遮光パッキン」',
        accent: '#0f172a',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Isometric/Top 360° Perimeter Gasket with 4 Corner Screw Boss Scallops + Front/Rear Foam Dams -->
          <rect x="24" y="84" width="332" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="190" y="106" text-anchor="middle" font-size="11.8" font-weight="800" fill="#0f172a">360°連続リング ＋ 前後遮光ダムの一体構造</text>

          <!-- Continuous 360° closed-cell EPDM perimeter gasket -->
          <rect x="74" y="132" width="232" height="154" rx="22" fill="none" stroke="url(#e45-rubber)" stroke-width="20" filter="url(#e45-sh)"/>
          <!-- Raised inner compression sealing ridge bead -->
          <rect x="74" y="132" width="232" height="154" rx="22" fill="none" stroke="#38bdf8" stroke-width="2.6" stroke-dasharray="6 3"/>
          <!-- 4 corner bolt-boss ear scallops -->
          <circle cx="72" cy="134" r="11" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
          <circle cx="308" cy="134" r="11" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
          <circle cx="72" cy="284" r="11" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
          <circle cx="308" cy="284" r="11" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
          <!-- Front & Rear vertical PORON light-leak blocking foam dams -->
          <rect x="116" y="120" width="148" height="14" rx="4" fill="#ea580c" stroke="#9a3412" stroke-width="1.4"/>
          <rect x="116" y="284" width="148" height="14" rx="4" fill="#ea580c" stroke="#9a3412" stroke-width="1.4"/>
          <text x="190" y="198" text-anchor="middle" font-size="12" font-weight="900" fill="#0f172a">EVF 光学＆電子室</text>
          <text x="190" y="218" text-anchor="middle" font-size="10.2" font-weight="800" fill="#059669">全周360°完全シーリング</text>
          <text x="190" y="318" text-anchor="middle" font-size="10.2" font-weight="800" fill="#c2410c">前後オレンジ帯＝外装継ぎ目の遮光PORONダム</text>

          <!-- Right: Dual Protection Cross-Section (Water/Dust + Stray Sunlight Leak) -->
          <rect x="372" y="84" width="320" height="248" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="532" y="108" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">継ぎ目断面：雨と光の「Wブロック」</text>

          <!-- Top cover & Lower Mg body compressing the gasket bead -->
          <rect x="448" y="130" width="188" height="28" rx="4" fill="url(#e45-mg)" stroke="#0f172a"/>
          <text x="542" y="149" text-anchor="middle" font-size="10" font-weight="800" fill="#f8fafc">トップカバー外装</text>
          <rect x="458" y="158" width="168" height="24" rx="6" fill="url(#e45-foam)" stroke="#38bdf8" stroke-width="2"/>
          <text x="542" y="174" text-anchor="middle" font-size="9.5" font-weight="900" fill="#fef08a">独立気泡EPDM/PORON（圧縮密着）</text>
          <rect x="448" y="182" width="188" height="28" rx="4" fill="url(#e45-steel)" stroke="#475569"/>
          <text x="542" y="201" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">カメラ本体マグネシウム枠</text>

          <!-- Blocked raindrop & stray light hitting left seam -->
          ${drawRaindrop(408, 160, 0.9)}
          <line x1="422" y1="168" x2="452" y2="168" stroke="#0284c7" stroke-width="2.4"/>
          <circle cx="452" cy="168" r="8" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
          <text x="452" y="172" text-anchor="middle" font-size="9.5" font-weight="900" fill="#dc2626">✕</text>

          <rect x="390" y="226" width="284" height="90" rx="9" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="404" y="248" font-size="10.8" font-weight="800" fill="#0369a1">① 独立気泡スポンジ＝水を吸わない！</text>
          <text x="404" y="266" font-size="10" font-weight="600" fill="#475569">泡が繋がっていないので毛細管現象で浸水しない</text>
          <text x="404" y="290" font-size="10.8" font-weight="800" fill="#c2410c">② アイセンサー等への太陽光リーク遮断</text>
          <text x="404" y="308" font-size="10" font-weight="600" fill="#475569">外装の微小な隙間から差し込む迷光を100%封印</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'ファインダー出っ張り部と本体の', line2: '合わせ目を全周で塞ぐ防水・遮光枠' },
          { label: 'スゴい工夫・秘密', line1: '水を吸わない独立気泡EPDM＋PORON', line2: '4隅ネジ穴も丸ごと囲み浸水路ゼロ' },
          { label: '撮影でどう嬉しい？', line1: '吹雪・豪雨・砂漠でも内部へ水が入らず', line2: '外装スキマからの光漏れ誤動作も皆無！' },
        ],
      });

    // =========================================================================
    // E46. Micro-OLED（OLEDoS）2層タンデム白色有機EL発光層＆ファブリ・ペロー光共振キャビティ
    // =========================================================================
    case 'evf_oled_tandem_cavity':
      return wrapEvfHdSvg({
        badge: 'E46',
        title: 'Micro-OLED 2層タンデム白色発光層 ＆ ファブリー・ペロー共振器',
        analogy: '2階建てで発光し、2枚の鏡の間で光の純度を高める「極小レーザー風の光増幅タワー」',
        accent: '#2563eb',
        accentSoft: '#eff6ff',
        body: `
          <!-- Left: 5-Layer Nanoscale Cross-Section of 2-Stack Tandem WOLED + CGL + Fabry-Pérot Micro-Cavity -->
          <rect x="24" y="84" width="388" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="218" y="106" text-anchor="middle" font-size="11.8" font-weight="800" fill="#1e3a8a">🔬 ナノスケール 5層タンデム共振キャビティ断面</text>

          <!-- Upward pure amplified RGB output rays -->
          <line x1="120" y1="138" x2="120" y2="112" stroke="#ef4444" stroke-width="3" marker-end="url(#e46-arrRed)"/>
          <line x1="218" y1="138" x2="218" y2="112" stroke="#10b981" stroke-width="3" marker-end="url(#e46-arrGreen)"/>
          <line x1="316" y1="138" x2="316" y2="112" stroke="#2563eb" stroke-width="3" marker-end="url(#e46-arrBlue)"/>

          <!-- Top Semi-Transparent MgAg Half-Mirror Cathode -->
          <rect x="46" y="142" width="344" height="22" rx="4" fill="url(#e46-ar)" stroke="#4f46e5" stroke-width="1.6"/>
          <text x="218" y="157" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">⑤ 半透過 MgAg カソード（上の鏡・光を取り出す）</text>

          <!-- 2nd Tandem White EL Stack -->
          <rect x="46" y="168" width="344" height="32" rx="4" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
          <text x="218" y="188" text-anchor="middle" font-size="10.8" font-weight="900" fill="#713f12">④ 第2発光層（2階建ての上のライト✨）</text>

          <!-- Charge Generation Layer (CGL) connecting both diodes in series -->
          <rect x="46" y="204" width="344" height="20" rx="3" fill="url(#e46-brass)" stroke="#92400e" stroke-width="1.5"/>
          <text x="218" y="218" text-anchor="middle" font-size="9.8" font-weight="900" fill="#ffffff">③ 電荷発生層 CGL（1つの電流で上下2回光らせる橋！）</text>

          <!-- 1st Tandem White EL Stack -->
          <rect x="46" y="228" width="344" height="32" rx="4" fill="#fde047" stroke="#b45309" stroke-width="1.5"/>
          <text x="218" y="248" text-anchor="middle" font-size="10.8" font-weight="900" fill="#78350f">② 第1発光層（2階建ての下のライト✨）</text>

          <!-- Bottom Reflective Al/Ag Pixel Anode Mirror -->
          <rect x="46" y="264" width="344" height="24" rx="4" fill="url(#e46-steel)" stroke="#334155" stroke-width="1.8"/>
          <text x="218" y="280" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0f172a">① 高反射 Al/Ag アノード（下の鏡・光を跳ね返す）</text>

          <!-- Standing wave resonance indicator arrows bouncing between top & bottom mirrors -->
          <path d="M 68 262 L 68 166" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="3 2" marker-start="url(#e46-arrRed)" marker-end="url(#e46-arrRed)"/>
          <text x="218" y="312" text-anchor="middle" font-size="10.5" font-weight="800" fill="#1e40af">上下2枚の鏡で光を往復共振→色純度＆正面輝度を劇的向上!</text>

          <!-- Right: Why 2-Stack Tandem beats 1-Stack OLED -->
          <rect x="428" y="84" width="264" height="116" rx="10" fill="#fffbeb" stroke="#fcd34d" stroke-width="1.3"/>
          <text x="442" y="108" font-size="11.8" font-weight="800" fill="#92400e">💡 2層タンデムの驚くべき効果</text>
          <text x="442" y="132" font-size="10.5" font-weight="800" fill="#b45309">・同じ電流で明るさが「約2倍」!</text>
          <text x="442" y="154" font-size="10.2" font-weight="600" fill="#475569">・逆に同じ明るさなら負荷が半分になり</text>
          <text x="442" y="174" font-size="10.5" font-weight="800" fill="#059669">　焼き付き耐性＆寿命が飛躍的に向上！</text>

          <rect x="428" y="212" width="264" height="120" rx="10" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.3"/>
          <text x="442" y="236" font-size="11.8" font-weight="800" fill="#1e40af">🎵 楽器のような「光共振キャビティ」</text>
          <text x="442" y="260" font-size="10.2" font-weight="600" fill="#334155">ギターの胴のように、上下の鏡の間隔を</text>
          <text x="442" y="278" font-size="10.2" font-weight="600" fill="#334155">光の波長に合わせて強め合うことで、</text>
          <text x="442" y="300" font-size="10.5" font-weight="800" fill="#1d4ed8">DCI-P3広色域・コントラスト10万:1達成!</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'OLEDパネルの内部で光を2層直列で', line2: '生み出し、鏡の間で強め合う発光心臓部' },
          { label: 'スゴい工夫・秘密', line1: '電荷発生層(CGL)で2層を直列接続し', line2: 'ファブリー・ペロー共振で色純度最大化' },
          { label: '撮影でどう嬉しい？', line1: '10万:1の漆黒とDCI-P3の鮮やかな色彩', line2: '0.01ms応答でスポーツ撮影も残像ゼロ！' },
        ],
      });

    // =========================================================================
    // E47. Micro-OLED シリコンチップ周辺・極細金ボンディングワイヤ＆黒色エポキシ封止ダム
    // =========================================================================
    case 'evf_oled_bondwires_glob':
      return wrapEvfHdSvg({
        badge: 'E47',
        title: 'Micro-OLED 極細φ20μm金ボンディングワイヤ ＆ 黒色封止ダム',
        analogy: '髪の毛1/4の純金アーチを真っ黒な樹脂で固めて守る「極小の金線橋ガード」',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        body: `
          <!-- Left: Microscope Cross-Section of φ20μm Gold Wirebond Arch inside Matte-Black Glob-Top Epoxy -->
          <rect x="24" y="84" width="404" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="226" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#92400e">🔬 チップ外周の顕微鏡断面（φ20μm＝髪の毛の 1/4!）</text>

          <!-- Ceramic package carrier base -->
          <rect x="44" y="266" width="364" height="36" rx="5" fill="#d6d3d1" stroke="#78716c" stroke-width="1.8"/>
          <text x="226" y="289" text-anchor="middle" font-size="10.8" font-weight="800" fill="#44403c">HTCC セラミックパッケージ基板</text>

          <!-- Monocrystalline Silicon OLED Die on left -->
          <rect x="58" y="220" width="166" height="46" rx="4" fill="#1e293b" stroke="#0f172a" stroke-width="1.8"/>
          <rect x="64" y="212" width="112" height="10" rx="2" fill="url(#e47-oled)"/>
          <text x="120" y="248" text-anchor="middle" font-size="10.5" font-weight="800" fill="#e2e8f0">Si CMOS OLEDダイ</text>

          <!-- Translucent cutaway showing Matte-Black Silica/Carbon Glob-Top Epoxy Dam-and-Fill! -->
          <path d="M 184 220 Q 204 134 282 142 Q 370 152 384 266 L 224 266 L 224 220 Z" fill="#0f172a" fill-opacity="0.82" stroke="#334155" stroke-width="2" filter="url(#e47-sh)"/>

          <!-- Gold Die Pad + Ceramic Lead Pad -->
          <rect x="192" y="214" width="24" height="8" rx="1.5" fill="url(#e47-brass)"/>
          <rect x="334" y="258" width="32" height="8" rx="1.5" fill="url(#e47-brass)"/>

          <!-- Authentic Ball-to-Stitch φ20μm Gold Wirebond Loop (Ball -> Vertical Rise -> NEC Kink -> Arc -> Stitch!) -->
          <circle cx="204" cy="212" r="6" fill="#facc15" stroke="#a16207" stroke-width="1.4"/>
          <path d="M 204 212 L 208 164 Q 248 150 294 188 L 348 258" fill="none" stroke="#facc15" stroke-width="4.2" stroke-linecap="round"/>
          <ellipse cx="348" cy="258" rx="7" ry="3.5" fill="#facc15" stroke="#a16207" stroke-width="1.2"/>

          <!-- Callouts inside microscope view -->
          ${drawCallout(264, 166, 232, 130, 1, 'φ20μm 純金ワイヤー', '超音波熱圧着ループ', '#eab308', 'start')}
          ${drawCallout(332, 186, 404, 174, 2, '黒色Glob-Top封止', '', '#0f172a', 'end')}

          <!-- Right: Why Matte-Black Epoxy is ESSENTIAL (Shock + Humidity + Zero Gold Glare!) -->
          <rect x="444" y="84" width="248" height="248" rx="11" fill="#fffbeb" stroke="#fcd34d" stroke-width="1.3"/>
          <text x="458" y="108" font-size="12" font-weight="800" fill="#92400e">なぜ「真っ黒な樹脂」で埋めるの？</text>

          <rect x="458" y="124" width="220" height="60" rx="8" fill="#ffffff" stroke="#fde68a"/>
          <text x="470" y="144" font-size="10.8" font-weight="800" fill="#0f172a">① 金線のキラキラ反射を完全消去</text>
          <text x="470" y="162" font-size="10" font-weight="600" fill="#475569">光沢のある金線をそのままにすると</text>
          <text x="470" y="176" font-size="10" font-weight="600" fill="#dc2626">画面のフチにゴースト光が映り込む!</text>

          <rect x="458" y="194" width="220" height="58" rx="8" fill="#ffffff" stroke="#fde68a"/>
          <text x="470" y="214" font-size="10.8" font-weight="800" fill="#0369a1">② 衝撃・断線＆腐食を完全防御</text>
          <text x="470" y="232" font-size="10" font-weight="600" fill="#475569">髪の1/4の極細金線をシリカ入り</text>
          <text x="470" y="246" font-size="10" font-weight="600" fill="#475569">低膨張エポキシでガッチリ保護</text>

          <rect x="458" y="262" width="220" height="54" rx="8" fill="#dcfce7" stroke="#86efac"/>
          <text x="470" y="282" font-size="10.8" font-weight="800" fill="#14532d">③ 低背ダム成形でレンズ近接を実現</text>
          <text x="470" y="302" font-size="10" font-weight="600" fill="#166534">樹脂が画面へ流れ出ない高精度ダム構造</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'OLEDチップと基板を繋ぐ極細金線群と', line2: 'それを固めて守るつや消し黒樹脂ダム' },
          { label: 'スゴい工夫・秘密', line1: 'φ20μm純金線をカーボン入り黒エポキシで', line2: '保護しつつ金線の反射ゴーストもゼロ化' },
          { label: '撮影でどう嬉しい？', line1: '衝撃や湿気に強く長寿命なうえ、画面の', line2: '周辺に不自然な反射光が一切出ない！' },
        ],
      });

    // =========================================================================
    // E48. OLEDパネル直結フレキ（LCD902）・0201電源デカップリングコンデンサ群＆SUS補強板
    // =========================================================================
    case 'evf_oled_fpc_decaps':
      return wrapEvfHdSvg({
        badge: 'E48',
        title: 'OLED直結フレキ（LCD902）・0201コンデンサ群＆SUS補強板',
        analogy: '画面の急な発光に電気を即補給する「直結ミニ貯水タンク付きリボン配線」',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        body: `
          <!-- Left: Authentic Sony LCD902 (ECX337AA-1) FPC front anatomy -->
          <rect x="24" y="84" width="318" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="183" y="106" text-anchor="middle" font-size="11.8" font-weight="800" fill="#92400e">Sony純正 LCD902 (875607419) 直結FPC</text>

          <!-- Contoured Amber Kapton FPC with ZIF locking ears -->
          <path d="M 94 122 L 272 122 L 272 248 L 288 256 L 288 282 L 266 286 L 266 312 L 100 312 L 100 286 L 78 282 L 78 256 L 94 248 Z" fill="url(#e48-kapton)" stroke="#92400e" stroke-width="2" filter="url(#e48-sh)"/>

          <!-- 2 rows of 6x 0201 (0.6x0.3mm) MLCC Decoupling Capacitors right at OLED root! -->
          ${Array.from({ length: 6 })
            .map((_, i) => {
              const cx = 112 + i * 26;
              return `
                <rect x="${cx}" y="138" width="16" height="10" rx="2" fill="#a8a29e" stroke="#44403c" stroke-width="1"/>
                <rect x="${cx}" y="158" width="16" height="10" rx="2" fill="#a8a29e" stroke="#44403c" stroke-width="1"/>
              `;
            })
            .join('')}
          <text x="183" y="186" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">0201 極小MLCC ×12 (0.6×0.3mm)</text>

          <!-- 8-pin Calibration ID EEPROM IC -->
          <rect x="122" y="198" width="54" height="32" rx="4" fill="#1e293b" stroke="#94a3b8" stroke-width="1.4"/>
          <text x="149" y="218" text-anchor="middle" font-size="9" font-weight="800" fill="#38bdf8">校正ROM</text>
          <!-- Gold test pads -->
          <circle cx="206" cy="214" r="5" fill="#fef08a" stroke="#a16207"/>
          <circle cx="224" cy="214" r="5" fill="#fef08a" stroke="#a16207"/>
          <circle cx="242" cy="214" r="5" fill="#fef08a" stroke="#a16207"/>

          <!-- SUS304 0.2mm Stiffener backing outline & 30 Gold ZIF fingers -->
          <rect x="104" y="264" width="158" height="44" rx="3" fill="#475569" fill-opacity="0.35" stroke="#e2e8f0" stroke-dasharray="3 2"/>
          ${Array.from({ length: 16 })
            .map((_, i) => `<rect x="${110 + i * 9.3}" y="276" width="5.5" height="32" rx="1" fill="#fef08a" stroke="#a16207" stroke-width="0.6"/>`)
            .join('')}
          <text x="183" y="260" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">SUS304補強板(裏) ＋ 厚付金メッキZIF端子</text>

          <!-- Right: Why 0201 Decoupling Caps at OLED Root Eliminate Flicker! -->
          <rect x="358" y="84" width="334" height="118" rx="11" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          ${drawStatusPill(372, 92, 214, '直近コンデンサなし：電圧降下！', false)}
          <path d="M 378 158 L 418 158 L 424 184 L 464 166 L 510 160" fill="none" stroke="#dc2626" stroke-width="2.6"/>
          <text x="526" y="148" font-size="10.8" font-weight="800" fill="#9f1239">白い被写体で電圧がガクッ!</text>
          <text x="526" y="168" font-size="10" font-weight="600" fill="#475569">240fpsの急激な明暗変化で</text>
          <text x="526" y="184" font-size="10" font-weight="600" fill="#475569">横筋ノイズ・チラつきが発生</text>

          <rect x="358" y="214" width="334" height="118" rx="11" fill="#f0fdf4" stroke="#86efac" stroke-width="1.3"/>
          ${drawStatusPill(372, 222, 236, 'OLED直近 0201 MLCC×12 貯水タンク', true)}
          <line x1="378" y1="280" x2="496" y2="280" stroke="#16a34a" stroke-width="3"/>
          <text x="510" y="268" font-size="10.5" font-weight="800" fill="#14532d">電圧ピタッと一直線に安定!</text>
          <text x="510" y="288" font-size="9.6" font-weight="600" fill="#334155">① 瞬間電流を0.1mm先から即補給</text>
          <text x="510" y="305" font-size="9.6" font-weight="600" fill="#334155">② 校正ROMが工場ガンマを保持</text>
          <text x="510" y="322" font-size="9.6" font-weight="600" fill="#334155">③ 0.2mm SUS補強板で折損防止</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'OLEDパネルの根元から直接伸びる', line2: '電源安定コンデンサ内蔵の専用配線' },
          { label: 'スゴい工夫・秘密', line1: '0.6×0.3mmの低ESRコンデンサ12個と', line2: '工場校正メモリ・SUS補強板を一体実装' },
          { label: '撮影でどう嬉しい？', line1: '240fpsで明暗が激しく変わるシーンでも', line2: '横縞やチラつきなく正確な階調を表示！' },
        ],
      });

    // =========================================================================
    // E49. 接眼レンズ群（G1〜G4）多層誘電体反射防止蒸着膜（ZEISS T* / Nano AR II）
    // =========================================================================
    case 'evf_lens_zeiss_tstar_coat':
      return wrapEvfHdSvg({
        badge: 'E49',
        title: '接眼レンズ群 多層誘電体反射防止膜（ZEISS T* / Nano AR II）',
        analogy: 'ノイズキャンセリングのように光の反射波どうしをぶつけて消す「透明な魔法膜」',
        accent: '#059669',
        accentSoft: '#ecfdf5',
        body: `
          <!-- Left: NG Uncoated Glass (4% reflection per surface -> milky glare!) -->
          <rect x="24" y="84" width="248" height="248" rx="11" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          ${drawStatusPill(40, 94, 196, 'コートなし：片面 4% 反射!', false)}
          <rect x="44" y="216" width="208" height="58" rx="6" fill="url(#e49-glass)" stroke="#0284c7" stroke-width="1.8"/>
          <text x="148" y="250" text-anchor="middle" font-size="11" font-weight="800" fill="#0c4a6e">普通の光学ガラス</text>
          <!-- Incident ray + Big bright bounced glare ray -->
          <line x1="72" y1="136" x2="148" y2="214" stroke="#f59e0b" stroke-width="3.2" marker-end="url(#e49-arrAmber)"/>
          <line x1="148" y1="214" x2="224" y2="136" stroke="#e11d48" stroke-width="3.4" marker-end="url(#e49-arrRed)"/>
          <text x="200" y="182" text-anchor="middle" font-size="10.5" font-weight="900" fill="#dc2626">ギラッと反射!</text>
          <text x="148" y="298" text-anchor="middle" font-size="10.2" font-weight="700" fill="#881337">レンズ4枚(6面)で反射が重なり</text>
          <text x="148" y="316" text-anchor="middle" font-size="10.2" font-weight="700" fill="#881337">夜景が白っぽく二重ゴーストに…</text>

          <!-- Right: OK ZEISS T* / Nano AR II Destructive Wave Interference (<0.2%!) -->
          <rect x="288" y="84" width="404" height="248" rx="11" fill="#f0fdf4" stroke="#86efac" stroke-width="1.4"/>
          ${drawStatusPill(306, 94, 304, '7〜15層蒸着膜：波の打ち消しで反射 &lt; 0.2%!', true)}

          <!-- Multi-layer iridescent dielectric film stack atop optical glass -->
          <rect x="314" y="200" width="234" height="16" rx="2" fill="url(#e49-ar)" stroke="#059669" stroke-width="1.4"/>
          <text x="431" y="212" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">7〜15層 ナノ誘電体ARコート膜 (厚み λ/4)</text>
          <rect x="314" y="216" width="234" height="58" rx="6" fill="url(#e49-glass)" stroke="#0284c7" stroke-width="1.8"/>
          <text x="431" y="248" text-anchor="middle" font-size="11" font-weight="800" fill="#0c4a6e">接眼レンズ G1〜G4 全空気面</text>

          <!-- Incident ray -> nearly 99.8% transmits straight through! -->
          <line x1="342" y1="132" x2="404" y2="198" stroke="#f59e0b" stroke-width="3.2" marker-end="url(#e49-arrAmber)"/>
          <line x1="404" y1="198" x2="466" y2="270" stroke="#059669" stroke-width="3.4" marker-end="url(#e49-arrGreen)"/>
          <text x="498" y="264" font-size="10.5" font-weight="900" fill="#065f46">99.8% 透過!</text>

          <!-- Zoomed Wave Cancellation Visual on right side! -->
          <rect x="560" y="128" width="118" height="156" rx="9" fill="#ffffff" stroke="#10b981" stroke-width="1.4"/>
          <text x="619" y="148" text-anchor="middle" font-size="10.2" font-weight="800" fill="#065f46">波の打ち消し原理</text>
          <!-- Wave A (Surface reflection) -->
          <path d="M 572 174 Q 586 158 600 174 Q 614 190 628 174 Q 642 158 656 174" fill="none" stroke="#e11d48" stroke-width="2.2"/>
          <text x="619" y="196" text-anchor="middle" font-size="8.8" font-weight="700" fill="#be123c">表面反射波 (+山)</text>
          <!-- Wave B (Bottom film reflection shifted λ/2!) -->
          <path d="M 572 222 Q 586 238 600 222 Q 614 206 628 222 Q 642 238 656 222" fill="none" stroke="#0284c7" stroke-width="2.2"/>
          <text x="619" y="246" text-anchor="middle" font-size="8.8" font-weight="700" fill="#0369a1">裏面反射波 (−谷)</text>
          <!-- Result: Flat ZERO reflection line! -->
          <line x1="572" y1="266" x2="664" y2="266" stroke="#16a34a" stroke-width="3"/>
          <text x="619" y="279" text-anchor="middle" font-size="9.5" font-weight="900" fill="#14532d">山＋谷 ＝ 反射 0!</text>

          <text x="490" y="308" text-anchor="middle" font-size="10.5" font-weight="800" fill="#14532d">全レンズの表裏6面に真空蒸着し、夜景の街灯も白浮きゼロの極上視界！</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '全接眼レンズの表面に真空蒸着した', line2: '超低反射のナノ多層コーティング膜' },
          { label: 'スゴい工夫・秘密', line1: '7〜15層のナノ膜で反射波の山と谷を', line2: '重ねて打ち消し、反射率0.2%未満に' },
          { label: '撮影でどう嬉しい？', line1: '夜景の強い点光源や逆光の被写体でも', line2: '白浮き・二重ゴーストのない透明視界！' },
        ],
      });

    // =========================================================================
    // E50. 接眼レンズ外周・光学墨塗り処理（Sumi-Nuri）＆ 3点光学シリコンポッティング玉
    // =========================================================================
    case 'evf_lens_edge_blackening':
      return wrapEvfHdSvg({
        badge: 'E50',
        title: '接眼レンズ外周・光学墨塗り（Sumi-Nuri）＆ 3点シリコン接着玉',
        analogy: 'レンズのフチを真っ黒な墨で塗って乱反射を消し、3点の柔らかゴム玉で優しく固定',
        accent: '#0f172a',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: NG Bare Ground Rim (White Ring Flare!) vs Center: OK Carbon Sumi-Nuri Inked Rim -->
          <rect x="24" y="84" width="210" height="248" rx="11" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          ${drawStatusPill(38, 92, 182, '墨塗りなし：フチが光る!', false)}
          <rect x="64" y="136" width="130" height="106" rx="10" fill="url(#e50-glass)" stroke="#94a3b8" stroke-width="3"/>
          <!-- Oblique ray bouncing off bright ground glass side wall into flare -->
          <path d="M 96 240 L 66 184 L 154 140" fill="none" stroke="#f59e0b" stroke-width="2.8" marker-end="url(#e50-arrAmber)"/>
          <circle cx="66" cy="184" r="9" fill="#fde047" stroke="#dc2626" stroke-width="2"/>
          <text x="129" y="274" text-anchor="middle" font-size="10.5" font-weight="800" fill="#9f1239">すりガラスの側面で乱反射!</text>
          <text x="129" y="294" text-anchor="middle" font-size="10" font-weight="600" fill="#881337">視野のフチに白いリング状の</text>
          <text x="129" y="310" text-anchor="middle" font-size="10" font-weight="600" fill="#881337">フレアが浮いてしまう…</text>

          <!-- Center: OK Carbon Sumi-Nuri Blackened Rim -->
          <rect x="246" y="84" width="210" height="248" rx="11" fill="#f0fdf4" stroke="#86efac" stroke-width="1.4"/>
          ${drawStatusPill(260, 92, 182, '光学墨塗り：迷光を吸収!', true)}
          <rect x="286" y="136" width="130" height="106" rx="10" fill="url(#e50-glass)" stroke="#0f172a" stroke-width="7"/>
          <path d="M 318 240 L 288 184" fill="none" stroke="#f59e0b" stroke-width="2.8" marker-end="url(#e50-arrAmber)"/>
          <circle cx="288" cy="184" r="8" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
          <text x="351" y="190" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0c4a6e">屈折率整合</text>
          <text x="351" y="206" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0c4a6e">カーボン墨</text>
          <text x="351" y="274" text-anchor="middle" font-size="10.5" font-weight="800" fill="#14532d">全4枚の外周コバに墨塗り!</text>
          <text x="351" y="294" text-anchor="middle" font-size="10" font-weight="600" fill="#166534">ガラスと同じ屈折率の黒インクが</text>
          <text x="351" y="310" text-anchor="middle" font-size="10" font-weight="600" fill="#166534">フチの乱反射を100%飲み込む</text>

          <!-- Right: Front view of 120° 3-Point Low-Outgas Silicone Potting Beads! -->
          <rect x="468" y="84" width="224" height="248" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="580" y="106" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0f172a">120°対称「3点シリコン玉」固定</text>
          <circle cx="580" cy="190" r="64" fill="url(#e50-mg)" stroke="#0f172a" stroke-width="1.8"/>
          <circle cx="580" cy="190" r="50" fill="url(#e50-glass)" stroke="#0f172a" stroke-width="5"/>
          <!-- 3x 120°-spaced translucent silicone potting dots -->
          <circle cx="580" cy="134" r="9" fill="#38bdf8" stroke="#ffffff" stroke-width="2"/>
          <circle cx="531" cy="218" r="9" fill="#38bdf8" stroke="#ffffff" stroke-width="2"/>
          <circle cx="629" cy="218" r="9" fill="#38bdf8" stroke="#ffffff" stroke-width="2"/>
          <text x="580" y="194" text-anchor="middle" font-size="10.5" font-weight="900" fill="#0c4a6e">無応力固定</text>
          <text x="580" y="280" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0369a1">硬い接着剤だとレンズが歪む!</text>
          <text x="580" y="298" text-anchor="middle" font-size="9.8" font-weight="600" fill="#475569">弾力ある低アウトガス光学シリコン3点で</text>
          <text x="580" y="314" text-anchor="middle" font-size="9.8" font-weight="600" fill="#475569">曇りガスを出さず衝撃から保護</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'レンズ外周の側面に塗る黒い遮光墨と', line2: '鏡筒へ優しく固定する3点のシリコン玉' },
          { label: 'スゴい工夫・秘密', line1: '屈折率整合カーボン墨でフチ反射消去＋', line2: '低シロキサン3点弾性固定で曇りと歪み0' },
          { label: '撮影でどう嬉しい？', line1: '周辺部のリング状フレアが一切出ず', line2: '長年使ってもレンズ内が白く曇らない！' },
        ],
      });

    // =========================================================================
    // E51. 接眼レンズ間・精密黒染め真鍮スペーサーリング＆5〜20μm光軸間隔調整シム
    // =========================================================================
    case 'evf_lens_inter_spacers':
      return wrapEvfHdSvg({
        badge: 'E51',
        title: '接眼レンズ間・黒染め真鍮スペーサー環 ＆ 5〜20μm調整シム',
        analogy: 'レンズ同士の距離を髪の毛の1/15精度で決め迷光も斬る「ギザギザ黒リング＋極薄シム」',
        accent: '#ca8a04',
        accentSoft: '#fefce8',
        body: `
          <!-- Left: Longitudinal Cutaway of Lens G4 -> Knife-Edge Blackened-Brass Spacer + Etched Shim -> Lens G2/G3 -->
          <rect x="24" y="84" width="408" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="228" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#713f12">レンズ間の空気間隔を ±5μm で決める断面図</text>

          <!-- Left Lens (G4) & Right Lens (G2/G3) -->
          <path d="M 76 130 C 56 178 56 242 76 290 L 106 290 C 118 242 118 178 106 130 Z" fill="url(#e51-glass)" stroke="#0284c7" stroke-width="1.8"/>
          <text x="90" y="214" text-anchor="middle" font-size="11" font-weight="900" fill="#0c4a6e">G4</text>

          <path d="M 338 130 C 318 178 318 242 338 290 L 374 290 C 362 242 362 178 374 130 Z" fill="url(#e51-glassEd)" stroke="#0d9488" stroke-width="1.8"/>
          <text x="350" y="214" text-anchor="middle" font-size="10.5" font-weight="900" fill="#134e4a">G2/G3</text>

          <!-- Top & Bottom CNC-Turned Blackened-Brass Inter-Lens Spacer with 3 SAWTOOTH KNIFE-EDGE GROOVES! -->
          <path d="M 114 130 L 304 130 L 304 156 L 278 156 L 264 174 L 248 156 L 222 156 L 208 174 L 192 156 L 166 156 L 152 174 L 136 156 L 114 156 Z" fill="url(#e51-mg)" stroke="#0f172a" stroke-width="1.8" filter="url(#e51-sh)"/>
          <path d="M 114 290 L 304 290 L 304 264 L 278 264 L 264 246 L 248 264 L 222 264 L 208 246 L 192 264 L 166 264 L 152 246 L 136 264 L 114 264 Z" fill="url(#e51-mg)" stroke="#0f172a" stroke-width="1.8" filter="url(#e51-sh)"/>

          <!-- Ultra-thin Photo-Etched Brass Calibration Shim (5/10/20μm) seated right against spacer! -->
          <rect x="306" y="130" width="12" height="32" rx="2" fill="url(#e51-brass)" stroke="#92400e" stroke-width="1.4"/>
          <rect x="306" y="258" width="12" height="32" rx="2" fill="url(#e51-brass)" stroke="#92400e" stroke-width="1.4"/>

          <!-- Stray light ray killed by sawtooth grooves while main image ray passes cleanly -->
          <line x1="114" y1="210" x2="328" y2="210" stroke="#0284c7" stroke-width="2.6" marker-end="url(#e51-arrBlue)"/>
          <line x1="118" y1="186" x2="208" y2="174" stroke="#f59e0b" stroke-width="2.2" marker-end="url(#e51-arrAmber)"/>
          <text x="208" y="196" text-anchor="middle" font-size="9.5" font-weight="900" fill="#dc2626">3条ナイフ溝で迷光遮断!</text>

          <!-- Precision gap bracket -->
          <line x1="112" y1="306" x2="320" y2="306" stroke="#a16207" stroke-width="2" marker-start="url(#e51-arrAmber)" marker-end="url(#e51-arrAmber)"/>
          <text x="216" y="322" text-anchor="middle" font-size="10.5" font-weight="800" fill="#854d0e">空気間隔＆平行度 公差 ±5μm 以内！</text>

          <!-- Right: Front view of Tabbed Photo-Etched Calibration Shim (Thickness Code Tabs!) -->
          <rect x="448" y="84" width="244" height="248" rx="11" fill="#fefce8" stroke="#fde047" stroke-width="1.3"/>
          <text x="570" y="106" text-anchor="middle" font-size="11.5" font-weight="800" fill="#713f12">識別タブ付き極薄エッチングシム</text>

          <!-- Ring shim with 3 protruding outer thickness identification tabs -->
          <g transform="translate(570, 188)">
            <circle cx="0" cy="0" r="54" fill="none" stroke="url(#e51-brass)" stroke-width="16" filter="url(#e51-sh)"/>
            <rect x="52" y="-7" width="16" height="14" rx="2" fill="url(#e51-brass)" stroke="#92400e"/>
            <rect x="-42" y="-58" width="14" height="16" rx="2" fill="url(#e51-brass)" stroke="#92400e" transform="rotate(-35, -35, -50)"/>
            <rect x="-42" y="42" width="14" height="16" rx="2" fill="url(#e51-brass)" stroke="#92400e" transform="rotate(35, -35, 50)"/>
            <text x="0" y="-4" text-anchor="middle" font-size="10.5" font-weight="900" fill="#854d0e">5 / 10 / 20μm</text>
            <text x="0" y="14" text-anchor="middle" font-size="9.5" font-weight="700" fill="#713f12">真鍮・SUS箔</text>
          </g>
          <text x="570" y="268" text-anchor="middle" font-size="10.2" font-weight="800" fill="#92400e">外側の小さな「耳（タブ）」の数で</text>
          <text x="570" y="286" text-anchor="middle" font-size="10" font-weight="600" fill="#475569">工場職人が厚さを瞬時に判別し</text>
          <text x="570" y="304" text-anchor="middle" font-size="10" font-weight="600" fill="#475569">レンズ1本ごとの公差を完璧に微調整！</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'レンズ同士の隙間を正確に保ち、', line2: '間の迷光も消す黒染め環＆極薄シム' },
          { label: 'スゴい工夫・秘密', line1: '旋盤加工3条ナイフ溝＋5〜20μm刻みの', line2: '識別タブ付きシムで平行度±5μm以内' },
          { label: '撮影でどう嬉しい？', line1: '設計図通りの光学性能を100%引き出し', line2: '片ボケやコントラスト低下のない視界！' },
        ],
      });

    // =========================================================================
    // E52. Micro-OLED直前・ナイフエッジ矩形視野枠マスク（Field-Stop Aperture Mask）
    // =========================================================================
    case 'evf_oled_field_mask':
      return wrapEvfHdSvg({
        badge: 'E52',
        title: 'Micro-OLED直前・30°ナイフエッジ矩形視野枠マスク',
        analogy: '映画館スクリーンの黒枠のように映像のフチをビシッと引き締める「極薄の刃枠」',
        accent: '#1e293b',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Front view of 0.10mm Photo-Etched SUS304 Field-Stop Mask (13.8 x 10.4mm aperture) -->
          <rect x="24" y="84" width="298" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="173" y="106" text-anchor="middle" font-size="11.8" font-weight="800" fill="#0f172a">厚みわずか 0.10mm の超黒色シアター枠</text>

          <rect x="52" y="128" width="242" height="156" rx="12" fill="#0f172a" stroke="#334155" stroke-width="2" filter="url(#e52-sh)"/>
          <!-- 4 corner registration pinholes -->
          <circle cx="68" cy="144" r="5" fill="#ffffff"/>
          <circle cx="278" cy="144" r="5" fill="#ffffff"/>
          <circle cx="68" cy="268" r="5" fill="#ffffff"/>
          <circle cx="278" cy="268" r="5" fill="#ffffff"/>
          <!-- Razor-sharp 4:3 OLED aperture window (13.8 x 10.4 mm) -->
          <rect x="86" y="152" width="174" height="108" rx="2" fill="url(#e52-oled)" stroke="#94a3b8" stroke-width="1.4"/>
          <text x="173" y="202" text-anchor="middle" font-size="12" font-weight="900" fill="#ffffff">有効画面 13.8×10.4mm</text>
          <text x="173" y="222" text-anchor="middle" font-size="10" font-weight="800" fill="#fef08a">視野率 100% クッキリ枠</text>
          <text x="173" y="310" text-anchor="middle" font-size="10.2" font-weight="800" fill="#334155">外周ダミー発光や金線漏れをシャットアウト!</text>

          <!-- Right: Microscope Edge Zoom — NG Thick Blunt Edge vs OK 30° Knife-Edge Bevel -->
          <rect x="338" y="84" width="354" height="118" rx="10" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          ${drawStatusPill(352, 92, 214, '普通の直角フチ：断面が光る！', false)}
          <rect x="364" y="138" width="96" height="44" fill="#334155" stroke="#0f172a" stroke-width="1.8"/>
          <line x1="490" y1="186" x2="462" y2="160" stroke="#f59e0b" stroke-width="2.6" marker-end="url(#e52-arrAmber)"/>
          <line x1="462" y1="160" x2="492" y2="132" stroke="#e11d48" stroke-width="2.6" marker-end="url(#e52-arrRed)"/>
          <text x="514" y="150" font-size="11" font-weight="800" fill="#9f1239">壁の厚みに光が反射!</text>
          <text x="514" y="170" font-size="10.2" font-weight="600" fill="#475569">画面のフチが白っぽく光り</text>
          <text x="514" y="186" font-size="10.2" font-weight="600" fill="#475569">輪郭がボヤけて見える…</text>

          <rect x="338" y="214" width="354" height="118" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.4"/>
          ${drawStatusPill(352, 222, 236, '30°ナイフエッジ＋反射率&lt;1%黒酸化', true)}
          <!-- True 30° tapered razor knife-edge cross-section -->
          <polygon points="364,268 440,268 476,308 364,308" fill="#0f172a" stroke="#334155" stroke-width="1.8"/>
          <line x1="498" y1="312" x2="460" y2="290" stroke="#f59e0b" stroke-width="2.4"/>
          <circle cx="460" cy="290" r="6" fill="#10b981"/>
          <text x="496" y="274" font-size="10.8" font-weight="800" fill="#14532d">カミソリ刃状で反射ゼロ!</text>
          <text x="496" y="294" font-size="9.6" font-weight="600" fill="#166534">・厚み0.10mm SUS＋黒色酸化コート</text>
          <text x="496" y="312" font-size="9.6" font-weight="600" fill="#166534">・画面の端がピンッと鋭く引き締まる!</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'OLED画面のすぐ前に置き、有効エリアの', line2: '外側の不要な光を切り取る極薄マスク' },
          { label: 'スゴい工夫・秘密', line1: '0.10mm SUS板を30°ナイフエッジ加工', line2: '反射率1%未満の黒酸化膜でフチ光り0' },
          { label: '撮影でどう嬉しい？', line1: '視野率100%の端までキリッと真っ黒な', line2: '額縁になり構図のギリギリまで見極め可！' },
        ],
      });

    // =========================================================================
    // E53. 視度調整・バックラッシュ除去スプリットナット＆低アウトガス光学フッ素グリス層
    // =========================================================================
    case 'evf_diopter_antibacklash_nut':
      return wrapEvfHdSvg({
        badge: 'E53',
        title: 'バックラッシュ除去スプリットナット ＆ 光学フッ素グリス層',
        analogy: 'ネジの「遊び（空回り）」をバネの力で押し開いてゼロにする「2分割挟み込みナット」',
        accent: '#ca8a04',
        accentSoft: '#fefce8',
        body: `
          <!-- Top: NG Single Ordinary Nut (Play / Backlash Gap!) -->
          <rect x="24" y="84" width="672" height="106" rx="11" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          ${drawStatusPill(40, 94, 218, '普通の1個ナット：ネジに隙間(ガタ)!', false)}
          <!-- Threaded screw rod -->
          <rect x="44" y="150" width="290" height="22" rx="3" fill="url(#e53-steel)" stroke="#475569"/>
          <!-- Nut with visible red gap on left flank -->
          <rect x="148" y="132" width="84" height="20" rx="4" fill="#64748b" stroke="#0f172a"/>
          <rect x="148" y="136" width="12" height="16" fill="#dc2626"/>
          <text x="154" y="128" text-anchor="middle" font-size="9.5" font-weight="900" fill="#dc2626">ガタ隙間!</text>
          <text x="358" y="132" font-size="11.5" font-weight="800" fill="#9f1239">逆回しした瞬間に「スカッ」と空回り！</text>
          <text x="358" y="154" font-size="10.5" font-weight="600" fill="#475569">普通のネジは動きやすくするため必ず隙間があるため、</text>
          <text x="358" y="172" font-size="10.5" font-weight="600" fill="#475569">ピントを微調整しようと戻すと一瞬レンズが動かない…</text>

          <!-- Bottom: OK 2-Piece Interlocking Split Nut (POM + Brass) + Spreading Spring + PFPE Optical Grease! -->
          <rect x="24" y="202" width="672" height="130" rx="11" fill="#f0fdf4" stroke="#86efac" stroke-width="1.4"/>
          ${drawStatusPill(40, 212, 274, '2分割スプリットナット＋バネ予圧＝遊び0!', true)}

          <!-- Lead screw shaft coated in glossy PFPE fluorinated damping grease -->
          <rect x="44" y="274" width="330" height="24" rx="4" fill="url(#e53-steel)" stroke="#475569" stroke-width="1.4"/>
          <rect x="44" y="272" width="330" height="28" rx="5" fill="#38bdf8" fill-opacity="0.24" stroke="#0284c7" stroke-dasharray="4 3"/>

          <!-- Left Half-Nut (Brass) pushed LEFT against left thread flank -->
          <rect x="92" y="246" width="68" height="32" rx="5" fill="url(#e53-brass)" stroke="#713f12" stroke-width="1.8" filter="url(#e53-sh)"/>
          <text x="126" y="266" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">真鍮ナット</text>

          <!-- Helical coil spring pushing BOTH nut halves apart! -->
          <path d="M 164 262 L 174 250 L 184 274 L 194 250 L 204 274 L 214 250 L 224 274 L 234 262" fill="none" stroke="#ea580c" stroke-width="3.2" stroke-linecap="round"/>
          <line x1="192" y1="240" x2="162" y2="240" stroke="#059669" stroke-width="2.4" marker-end="url(#e53-arrGreen)"/>
          <line x1="206" y1="240" x2="236" y2="240" stroke="#059669" stroke-width="2.4" marker-end="url(#e53-arrGreen)"/>

          <!-- Right Half-Nut (Ivory POM) pushed RIGHT against right thread flank -->
          <rect x="238" y="246" width="68" height="32" rx="5" fill="#fefce8" stroke="#64748b" stroke-width="1.8" filter="url(#e53-sh)"/>
          <text x="272" y="266" text-anchor="middle" font-size="10" font-weight="900" fill="#334155">POMナット</text>
          <text x="208" y="318" text-anchor="middle" font-size="10" font-weight="800" fill="#0369a1">PFPEフッ素グリス（−25℃〜+75℃・曇りガス0!）</text>

          <!-- Right-side benefits -->
          <text x="398" y="248" font-size="11.2" font-weight="800" fill="#14532d">① 左右のネジ山をバネで同時に挟み込む!</text>
          <text x="398" y="270" font-size="10.2" font-weight="600" fill="#334155">正転でも逆転でも空回りゼロ（0.05dpt級制御）</text>
          <text x="398" y="294" font-size="11.2" font-weight="800" fill="#0369a1">② 高級光学用 PFPEダンピンググリス</text>
          <text x="398" y="314" font-size="10.2" font-weight="600" fill="#334155">極寒で固まらず高温でレンズを曇らせるガスもゼロ</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '視度調整ネジの「遊び・空回り」を', line2: '物理的に消す2分割ナット＆光学グリス' },
          { label: 'スゴい工夫・秘密', line1: '真鍮＋POMの2個ナットをバネで押し広げ', line2: '−25〜+75℃対応の低アウトガス潤滑' },
          { label: '撮影でどう嬉しい？', line1: 'ダイヤルを戻した瞬間にピタッと反応し', line2: '極上のしっとり感で視力を追い込める！' },
        ],
      });

    // =========================================================================
    // E54. 視度調整軸・二重リップ防水フッ素ゴムOリンググランド＆低摩擦PTFEバックアップリング
    // =========================================================================
    case 'evf_diopter_gland_seals':
      return wrapEvfHdSvg({
        badge: 'E54',
        title: '視度軸・二重リップFKM防水Oリンググランド＆PTFEリング',
        analogy: '2本の防水ゴム輪を白い滑りリングで支える「回転＆出し入れ両用の潜水艦軸シール」',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Large Precision Cross-Section of Stainless Gland Housing + Dual FKM O-Rings + Split-Scarf PTFE Washer -->
          <text x="360" y="96" text-anchor="middle" font-size="12" font-weight="800" fill="#0c4a6e">「回る」＋「前後に動く」過酷な軸を完全に防水する 3重シール構造断面</text>

          <!-- Outside Rain & Skin Oil (Right) vs Dry EVF Interior (Left) -->
          <rect x="26" y="114" width="128" height="202" rx="10" fill="#f0fdf4" stroke="#86efac"/>
          <text x="90" y="144" text-anchor="middle" font-size="11.5" font-weight="900" fill="#14532d">EVF光学室内</text>
          <text x="90" y="164" text-anchor="middle" font-size="10" font-weight="700" fill="#059669">乾燥気密・曇り0!</text>

          <rect x="446" y="114" width="102" height="202" rx="10" fill="#eff6ff" stroke="#93c5fd"/>
          <text x="497" y="140" text-anchor="middle" font-size="11" font-weight="900" fill="#1d4ed8">外気・雨</text>
          ${drawRaindrop(497, 174, 1.0)}
          <text x="497" y="294" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0369a1">皮脂・砂埃</text>

          <!-- CNC-Turned SUS303 Stainless Gland Housing Sleeve (Top & Bottom walls with twin grooves) -->
          <path d="M 164 126 L 434 126 L 434 180 L 388 180 L 388 158 L 352 158 L 352 180 L 246 180 L 246 158 L 210 158 L 210 180 L 164 180 Z" fill="url(#e54-steel)" stroke="#475569" stroke-width="1.8" filter="url(#e54-sh)"/>
          <path d="M 164 304 L 434 304 L 434 250 L 388 250 L 388 272 L 352 272 L 352 250 L 246 250 L 246 272 L 210 272 L 210 250 L 164 250 Z" fill="url(#e54-steel)" stroke="#475569" stroke-width="1.8" filter="url(#e54-sh)"/>

          <!-- Central Rotating & Sliding Diopter Shaft -->
          <rect x="116" y="196" width="388" height="38" rx="6" fill="url(#e54-mg)" stroke="#0f172a" stroke-width="1.8"/>
          <text x="300" y="220" text-anchor="middle" font-size="11" font-weight="800" fill="#f8fafc">視度ダイヤル軸（回転 🔄 ＋ 押引 ↔）</text>

          <!-- Inner FKM O-Ring (Moisture Seal) -->
          <circle cx="228" cy="182" r="14" fill="url(#e54-rubber)" stroke="#38bdf8" stroke-width="2.2"/>
          <circle cx="228" cy="248" r="14" fill="url(#e54-rubber)" stroke="#38bdf8" stroke-width="2.2"/>
          <!-- Center White Split-Scarf PTFE Backup Ring (Anti-Extrusion + Low Friction!) -->
          <rect x="282" y="176" width="34" height="20" rx="4" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
          <rect x="282" y="234" width="34" height="20" rx="4" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
          <!-- Outer FKM O-Ring (Dust & Rain Wiper) -->
          <circle cx="370" cy="182" r="14" fill="url(#e54-rubber)" stroke="#ea580c" stroke-width="2.2"/>
          <circle cx="370" cy="248" r="14" fill="url(#e54-rubber)" stroke="#ea580c" stroke-width="2.2"/>

          <!-- Labels on far right -->
          <rect x="562" y="114" width="134" height="202" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="572" y="138" font-size="10.5" font-weight="900" fill="#ea580c">① 外側FKMリング</text>
          <text x="572" y="156" font-size="9.5" font-weight="600" fill="#475569">雨・砂・皮脂を拭く</text>
          <text x="572" y="170" font-size="9.5" font-weight="600" fill="#475569">耐候ワイパー役</text>

          <text x="572" y="200" font-size="10.5" font-weight="900" fill="#0284c7">② 中央PTFEリング</text>
          <text x="572" y="218" font-size="9.5" font-weight="600" fill="#475569">Oリングのねじれと</text>
          <text x="572" y="232" font-size="9.5" font-weight="600" fill="#475569">噛み込みを防止！</text>

          <text x="572" y="262" font-size="10.5" font-weight="900" fill="#059669">③ 内側FKMリング</text>
          <text x="572" y="280" font-size="9.5" font-weight="600" fill="#475569">乾燥空気を逃がさず</text>
          <text x="572" y="294" font-size="9.5" font-weight="600" fill="#475569">内部結露を完全阻止</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '回転＆押引きする視度軸の隙間から', line2: '雨・皮脂・砂の侵入を防ぐ軸シール組' },
          { label: 'スゴい工夫・秘密', line1: '耐油フッ素ゴム(FKM)の2重Oリングを', line2: '低摩擦PTFEバックアップ輪でねじれ防止' },
          { label: '撮影でどう嬉しい？', line1: '油分や雨がついてもゴムが劣化せず', line2: '何年使っても防曇気密＆滑らか操作維持' },
        ],
      });

    // =========================================================================
    // E55. EVF 240Hz MIPI-DSI高周波シールドFPC・フェライトビーズEMIフィルタ＆導電銅接地箔
    // =========================================================================
    case 'evf_mipi_ferrite_shield_fpc':
      return wrapEvfHdSvg({
        badge: 'E55',
        title: '240Hz MIPI-DSI シールドFPC・フェライトフィルタ＆導電銅箔',
        analogy: '超高速ケーブルの雑音を吸収してアースへ流す「銀シールド鎧＋ノイズ掃除機」',
        accent: '#4f46e5',
        accentSoft: '#eef2ff',
        body: `
          <!-- Left: Anatomy of 100Ω Impedance-Matched Shielded MIPI-DSI FPC + Ferrite Beads + Common-Mode Chokes + C1020 Cu Foil -->
          <rect x="24" y="84" width="348" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="198" y="106" text-anchor="middle" font-size="11.8" font-weight="800" fill="#312e81">3重のノイズ対策を施した 240Hz 高速FPC</text>

          <!-- Amber Kapton core peeking slightly around silver-ink EMI mesh jacket -->
          <rect x="86" y="122" width="224" height="194" rx="10" fill="url(#e55-kapton)" stroke="#92400e" stroke-width="1.6"/>
          <rect x="96" y="128" width="204" height="162" rx="7" fill="url(#e55-mesh)" stroke="#4f46e5" stroke-width="2" filter="url(#e55-sh)"/>

          <!-- 4x 0402 Ferrite Bead EMI Chokes across upper row -->
          ${Array.from({ length: 4 })
            .map(
              (_, i) => `
              <rect x="${112 + i * 46}" y="142" width="34" height="18" rx="3" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5"/>
              <rect x="${112 + i * 46}" y="142" width="6" height="18" fill="#e2e8f0"/>
              <rect x="${140 + i * 46}" y="142" width="6" height="18" fill="#e2e8f0"/>`
            )
            .join('')}
          <rect x="102" y="164" width="192" height="17" rx="8.5" fill="#ffffff" fill-opacity="0.93"/>
          <text x="198" y="176" text-anchor="middle" font-size="9.5" font-weight="900" fill="#0f172a">① 0402 フェライトビーズ×4（高周波吸収）</text>

          <!-- 2x Dual-Lane Differential Common-Mode Choke Coils -->
          <rect x="120" y="188" width="64" height="32" rx="5" fill="#0f172a" stroke="#ea580c" stroke-width="1.8"/>
          <text x="152" y="208" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fdba74">CMCチョーク</text>
          <rect x="212" y="188" width="64" height="32" rx="5" fill="#0f172a" stroke="#ea580c" stroke-width="1.8"/>
          <text x="244" y="208" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fdba74">CMCチョーク</text>

          <!-- C1020 Conductive Electrolytic Copper Grounding Foil Strap wrapping across to chassis screw ears! -->
          <rect x="44" y="236" width="308" height="34" rx="8" fill="url(#e55-copper)" stroke="#9a3412" stroke-width="2" filter="url(#e55-sh)"/>
          <circle cx="64" cy="253" r="7" fill="#ffffff" stroke="#9a3412" stroke-width="1.8"/>
          <circle cx="332" cy="253" r="7" fill="#ffffff" stroke="#9a3412" stroke-width="1.8"/>
          <text x="198" y="257" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">③ C1020 導電銅箔ストラップ（両端ネジ接地!）</text>

          <!-- Distal Gold ZIF fingers -->
          <rect x="116" y="290" width="164" height="20" rx="3" fill="url(#e55-brass)" stroke="#92400e"/>
          <text x="198" y="304" text-anchor="middle" font-size="9.2" font-weight="900" fill="#713f12">100Ω差動 MIPI-DSI 金端子</text>

          <!-- Right: NG High-ISO Banding Noise vs OK Clean Shadow Photo! -->
          <rect x="388" y="84" width="304" height="118" rx="10" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          ${drawStatusPill(402, 92, 224, 'シールドなし：超高ISOに横縞！', false)}
          <!-- Dark photo with ugly horizontal EMI banding lines -->
          <rect x="404" y="126" width="96" height="62" rx="5" fill="#1e293b" stroke="#dc2626" stroke-width="1.6"/>
          ${Array.from({ length: 6 })
            .map((_, i) => `<line x1="406" y1="${136 + i * 9}" x2="498" y2="${136 + i * 9}" stroke="#f43f5e" stroke-width="1.6" opacity="0.65"/>`)
            .join('')}
          <text x="514" y="146" font-size="11" font-weight="800" fill="#9f1239">写真に謎の横縞ノイズ!</text>
          <text x="514" y="166" font-size="10" font-weight="600" fill="#475569">240Hz映像線の高周波電波が</text>
          <text x="514" y="182" font-size="10" font-weight="600" fill="#475569">イメージセンサーへ飛び込む</text>

          <rect x="388" y="214" width="304" height="118" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.4"/>
          ${drawStatusPill(402, 222, 238, '銀シールド＋チョーク＋銅箔＝無雑音', true)}
          <!-- Pure clean dark starry photo -->
          <rect x="404" y="256" width="96" height="62" rx="5" fill="#0f172a" stroke="#16a34a" stroke-width="1.8"/>
          <circle cx="426" cy="274" r="2" fill="#fde047"/>
          <circle cx="468" cy="282" r="2.2" fill="#ffffff"/>
          <circle cx="448" cy="300" r="1.8" fill="#bae6fd"/>
          <text x="514" y="274" font-size="11" font-weight="800" fill="#14532d">暗部も澄み切った極上画質!</text>
          <text x="514" y="294" font-size="10" font-weight="600" fill="#166534">・被覆率98%超の銀シールド膜</text>
          <text x="514" y="312" font-size="10" font-weight="600" fill="#166534">・銅箔で雑音を即Mg骨格へ排出</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '240Hzの高速映像を伝える配線を', line2: '銀膜・ノイズフィルタ・銅箔で包む部' },
          { label: 'スゴい工夫・秘密', line1: '被覆率98%超シールド＋コモンモード', line2: 'チョーク＋両端銅箔接地でRF漏れゼロ' },
          { label: '撮影でどう嬉しい？', line1: 'ISO 51200などの超高感度夜景撮影でも', line2: '写真に横縞ノイズが一切混入しない！' },
        ],
      });

    default:
      return null;
  }
}
