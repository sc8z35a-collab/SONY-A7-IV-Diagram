import { PartExplanation } from '../assemblies/types';
import {
  comparePill,
  loupeRing,
  renderBionzDiagram,
  stepBadge,
} from './bionzSchematicsShared';

/**
 * High-precision, beginner-friendly 560x400 SVG schematics for BIONZ XR (XR16–XR31).
 */
export function renderBionzMidSvg(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // =========================================================================
    // XR16. Sony Proprietary 32-bit SA DSP ("sabin") & 60Hz AF/IBIS Servo Core
    // =========================================================================
    case 'xr_sa_dsp_af_core':
      return renderBionzDiagram({
        code: 'xr16',
        badge: 'XR16',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        accentDark: '#92400e',
        title: 'ソニー独自 SA DSP ("sabin") AF/IBIS核',
        metric: '毎秒60〜120回 ピント演算',
        analogyLine1: '飛ぶ野鳥の距離計算と手ブレ打ち消しを同時に解く「ソニー秘伝の算術エンジン」です。',
        analogyLine2: '人の脳より何十倍も速くレンズモーターと5軸手ブレ補正へ指令を出します。',
        chipHow: '32bit独自DSP＋位相差相関器',
        chipBenefit: '動体ガチピン＆8.0段手ブレ補正',
        chipSpec: '759点PDAF / 60–120Hz制御',
        art: (p) => `
          <!-- Left: Left/Right Phase-Detection Waveforms (PDAF) -->
          <rect x="22" y="66" width="166" height="202" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="105" y="86" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0f172a">① 左右の像のズレ検出</text>
          <!-- Wave Box -->
          <rect x="32" y="96" width="146" height="84" rx="6" fill="#0f172a"/>
          <path d="M 42 156 Q 62 156 72 114 Q 82 156 102 156" fill="none" stroke="#38bdf8" stroke-width="2.4"/>
          <path d="M 74 156 Q 94 156 104 114 Q 114 156 134 156" fill="none" stroke="#fb923c" stroke-width="2.4"/>
          <line x1="72" y1="108" x2="104" y2="108" stroke="#facc15" stroke-width="1.8" marker-start="url(#${p}_arr_gold)" marker-end="url(#${p}_arr_gold)"/>
          <text x="88" y="104" text-anchor="middle" font-size="8.5" font-weight="800" fill="#facc15">ズレ量 Δ</text>
          <text x="64" y="172" text-anchor="middle" font-size="8.5" font-weight="700" fill="#38bdf8">左画素</text>
          <text x="122" y="172" text-anchor="middle" font-size="8.5" font-weight="700" fill="#fb923c">右画素</text>
          <!-- Gyro Input -->
          <rect x="32" y="190" width="146" height="66" rx="6" fill="#fffbeb" stroke="#f59e0b"/>
          <text x="105" y="208" text-anchor="middle" font-size="9.6" font-weight="800" fill="#92400e">＋ 高速ジャイロセンサー</text>
          <text x="105" y="224" text-anchor="middle" font-size="9" fill="#78350f">カメラの上下・左右・回転</text>
          <text x="105" y="238" text-anchor="middle" font-size="9" fill="#78350f">手ブレ角度を1秒1000回測定</text>
          ${stepBadge(30, 74, '1', '#0284c7')}

          <!-- Arrow 1 -> 2 -->
          <line x1="190" y1="164" x2="214" y2="164" stroke="#d97706" stroke-width="2.8" marker-end="url(#${p}_arr_gold)"/>

          <!-- Center: Sony SA DSP "sabin" Real-Time Core -->
          <rect x="218" y="84" width="136" height="162" rx="10" fill="url(#${p}_cu)" stroke="#7c2d12" stroke-width="1.8" filter="url(#${p}_shadow)"/>
          <text x="286" y="110" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">SA DSP</text>
          <text x="286" y="126" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fef08a">"sabin" 32bit</text>
          <rect x="230" y="138" width="112" height="42" rx="5" fill="#7c2d12" opacity="0.6"/>
          <text x="286" y="155" text-anchor="middle" font-size="9.2" font-weight="700" fill="#ffffff">759点 位相差相関</text>
          <text x="286" y="170" text-anchor="middle" font-size="9.2" font-weight="700" fill="#fef08a">距離＆未来位置予測</text>
          <rect x="230" y="188" width="112" height="44" rx="5" fill="#7c2d12" opacity="0.6"/>
          <text x="286" y="206" text-anchor="middle" font-size="9.2" font-weight="700" fill="#ffffff">5軸 PIDサーボ計算</text>
          <text x="286" y="221" text-anchor="middle" font-size="9" fill="#ffedd5">毎秒60〜120回同時指令!</text>
          ${stepBadge(226, 92, '2', '#92400e')}

          <!-- Arrows 2 -> 3A & 3B -->
          <path d="M 356 138 L 382 122 M 356 194 L 382 212" stroke="#d97706" stroke-width="2.6" marker-end="url(#${p}_arr_gold)"/>

          <!-- Right Top: XD Linear Motor AF Drive -->
          <rect x="386" y="68" width="152" height="94" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>
          <text x="462" y="88" text-anchor="middle" font-size="10.5" font-weight="800" fill="#1e40af">③ レンズAF即座駆動</text>
          <rect x="404" y="98" width="116" height="24" rx="12" fill="#dbeafe" stroke="#2563eb"/>
          <ellipse cx="462" cy="110" rx="10" ry="12" fill="#38bdf8" stroke="#1e40af" stroke-width="1.4"/>
          <line x1="416" y1="110" x2="444" y2="110" stroke="#2563eb" stroke-width="2" marker-end="url(#${p}_arr_blue)"/>
          <line x1="508" y1="110" x2="480" y2="110" stroke="#2563eb" stroke-width="2" marker-end="url(#${p}_arr_blue)"/>
          <text x="462" y="139" text-anchor="middle" font-size="9.2" font-weight="700" fill="#1e3a8a">ズレ量から移動量を1発算出</text>
          <text x="462" y="153" text-anchor="middle" font-size="9" fill="#334155">迷いゼロでピタッと合焦!</text>

          <!-- Right Bottom: 5-Axis IBIS Sensor Shift -->
          <rect x="386" y="172" width="152" height="96" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.4"/>
          <text x="462" y="192" text-anchor="middle" font-size="10.5" font-weight="800" fill="#166534">④ 5軸IBIS 逆向き補正</text>
          <rect x="434" y="202" width="56" height="32" rx="4" fill="url(#${p}_teal)" stroke="#0f766e"/>
          <text x="462" y="221" text-anchor="middle" font-size="9" font-weight="800" fill="#fff">センサー</text>
          <path d="M 416 218 H 430 M 508 218 H 494 M 462 195 V 200 M 462 241 V 236" stroke="#16a34a" stroke-width="2"/>
          <text x="462" y="256" text-anchor="middle" font-size="9.2" font-weight="800" fill="#15803d">手ブレと真逆へ1μm制御</text>
        `,
      });

    // =========================================================================
    // XR17. 8K30p / 4K120p 10-bit 4:2:2 Hardware HEVC/H.265 Video Codec
    // =========================================================================
    case 'xr_video_codec_hevc':
      return renderBionzDiagram({
        code: 'xr17',
        badge: 'XR17',
        accent: '#e11d48',
        accentSoft: '#fff1f2',
        accentDark: '#9f1239',
        title: '8K/4K 10bit 4:2:2 動画HEVC圧縮エンジン',
        metric: '画質維持で 約1/30圧縮',
        analogyLine1: '巨大な生動画を、見た目の美しさを保ったまま1/30へ畳む「超高速・自動圧縮工場」です。',
        analogyLine2: '専用ハード回路が担当するため、CPUが熱くならず長時間の4K/8K録画ができます。',
        chipHow: 'CTU四分木＋動き予測＋CABAC',
        chipBenefit: '低発熱・長時間4K60p/8K収録',
        chipSpec: 'HEVC 10bit 4:2:2 / 600Mbps',
        art: (p) => `
          <!-- Step 1: Giant Uncompressed Video Stream -->
          <rect x="22" y="76" width="112" height="178" rx="8" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="78" y="96" text-anchor="middle" font-size="10.2" font-weight="800" fill="#1e40af">① 巨大な生映像</text>
          ${[0, 1, 2, 3, 4]
            .map(
              (i) =>
                `<rect x="${34 + i * 3}" y="${108 + i * 16}" width="76" height="22" rx="3" fill="#2563eb" opacity="${0.55 + i * 0.1}" stroke="#ffffff"/>`
            )
            .join('')}
          <text x="78" y="208" text-anchor="middle" font-size="10" font-weight="800" fill="#dc2626">約 12 Gbps超!</text>
          <text x="78" y="224" text-anchor="middle" font-size="9" fill="#334155">そのまま保存すると</text>
          <text x="78" y="238" text-anchor="middle" font-size="9" fill="#334155">1分でカードが満杯!</text>
          ${stepBadge(30, 84, '1', '#2563eb')}

          <line x1="136" y1="164" x2="158" y2="164" stroke="#e11d48" stroke-width="2.6" marker-end="url(#${p}_arr_red)"/>

          <!-- Step 2: HEVC Recursive CTU Quadtree + Motion Estimation + CABAC -->
          <rect x="162" y="64" width="224" height="206" rx="8" fill="#fff1f2" stroke="#e11d48" stroke-width="1.6"/>
          <text x="274" y="84" text-anchor="middle" font-size="11" font-weight="800" fill="#9f1239">② HEVC 専用圧縮回路（賢く間引く）</text>
          <!-- Visual Recursive CTU Quadtree Grid (64 -> 32 -> 16 -> 8) -->
          <rect x="176" y="94" width="108" height="108" rx="4" fill="#0f172a" stroke="#e11d48" stroke-width="1.6"/>
          <!-- Big 64x64 Quiet Sky Block -->
          <rect x="178" y="96" width="52" height="52" fill="#0284c7" opacity="0.7" stroke="#facc15" stroke-width="1.2"/>
          <text x="204" y="120" text-anchor="middle" font-size="8.5" font-weight="800" fill="#fff">平坦な空</text>
          <text x="204" y="132" text-anchor="middle" font-size="8" fill="#fef08a">大きく64×64</text>
          <!-- Medium 32x32 Blocks -->
          <rect x="230" y="96" width="52" height="26" fill="#0d9488" opacity="0.7" stroke="#facc15" stroke-width="1"/>
          <rect x="178" y="148" width="52" height="52" fill="#475569" opacity="0.7" stroke="#facc15" stroke-width="1"/>
          <!-- Fine 16x16 & 8x8 Detailed Face/Moving Subject Blocks -->
          ${[0, 1]
            .flatMap((r) =>
              [0, 1].map(
                (c) =>
                  `<rect x="${230 + c * 26}" y="${122 + r * 26}" width="26" height="26" fill="#e11d48" opacity="0.78" stroke="#facc15" stroke-width="1"/>`
              )
            )
            .join('')}
          ${[0, 1, 2, 3]
            .flatMap((r) =>
              [0, 1, 2, 3].map(
                (c) =>
                  `<rect x="${230 + c * 13}" y="${174 + r * 6.5}" width="13" height="6.5" fill="#fb7185" stroke="#fef08a" stroke-width="0.6"/>`
              )
            )
            .join('')}
          <text x="256" y="152" text-anchor="middle" font-size="8" font-weight="800" fill="#fff">動く顔は</text>
          <text x="256" y="164" text-anchor="middle" font-size="8" font-weight="800" fill="#fef08a">細かく分割!</text>

          <!-- Right Sub-steps inside Codec -->
          <rect x="292" y="96" width="84" height="48" rx="5" fill="#ffffff" stroke="#fb7185"/>
          <text x="334" y="113" text-anchor="middle" font-size="9.4" font-weight="800" fill="#9f1239">動き予測(ME)</text>
          <text x="334" y="127" text-anchor="middle" font-size="8.4" fill="#475569">前コマとの</text>
          <text x="334" y="138" text-anchor="middle" font-size="8.4" fill="#475569">差分だけ記録</text>

          <rect x="292" y="152" width="84" height="50" rx="5" fill="#be123c"/>
          <text x="334" y="170" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">CABAC圧縮</text>
          <text x="334" y="184" text-anchor="middle" font-size="8.4" fill="#ffe4e6">統計記号化で</text>
          <text x="334" y="196" text-anchor="middle" font-size="8.4" fill="#fef08a">ムダを極限削減</text>

          <text x="274" y="226" text-anchor="middle" font-size="9.6" font-weight="800" fill="#9f1239">CPUを使わず専用シリコン回路だけで処理!</text>
          <text x="274" y="242" text-anchor="middle" font-size="9.2" fill="#475569">→ 消費電力と発熱を劇的にカット</text>
          <text x="274" y="258" text-anchor="middle" font-size="9.2" font-weight="700" fill="#0f766e">10bit 4:2:2 豊かな色情報も劣化なし</text>
          ${stepBadge(170, 72, '2', '#e11d48')}

          <line x1="388" y1="164" x2="408" y2="164" stroke="#16a34a" stroke-width="2.6" marker-end="url(#${p}_arr_green)"/>

          <!-- Step 3: Compact Pro XAVC Output -->
          <rect x="412" y="76" width="126" height="178" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.4"/>
          <text x="475" y="96" text-anchor="middle" font-size="10.2" font-weight="800" fill="#166534">③ 高画質ファイル</text>
          <rect x="426" y="110" width="98" height="40" rx="6" fill="#be123c"/>
          <text x="475" y="128" text-anchor="middle" font-size="10.2" font-weight="800" fill="#fff">XAVC HS</text>
          <text x="475" y="142" text-anchor="middle" font-size="8.6" fill="#ffe4e6">高効率 HEVC/H.265</text>
          <rect x="426" y="158" width="98" height="40" rx="6" fill="#d97706"/>
          <text x="475" y="176" text-anchor="middle" font-size="10.2" font-weight="800" fill="#fff">XAVC S-I</text>
          <text x="475" y="190" text-anchor="middle" font-size="8.6" fill="#fef3c7">All-Intra 600Mbps</text>
          <text x="475" y="218" text-anchor="middle" font-size="9.5" font-weight="800" fill="#166534">編集もサクサク</text>
          <text x="475" y="234" text-anchor="middle" font-size="9.2" fill="#14532d">カードへ余裕保存!</text>
          ${stepBadge(420, 84, '3', '#16a34a')}
        `,
      });

    // =========================================================================
    // XR18. 4-Channel 24bit / 32-bit Float Audio DSP & AI Noise-Cut Engine
    // =========================================================================
    case 'xr_audio_dsp_noisecut':
      return renderBionzDiagram({
        code: 'xr18',
        badge: 'XR18',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        accentDark: '#155e75',
        title: '4ch音声DSP ＆ AI風切り音ノイズ除去',
        metric: '4ch / 32bit Float対応',
        analogyLine1: '風音やレンズ駆動音だけを見分けて消し、声だけを浮かび上がらせる「内蔵音響ミキサー」です。',
        analogyLine2: '映像フレームと同じ時計で録音するため、長時間撮影でも音ズレしません。',
        chipHow: 'FFT周波数分離＋AIノイズ低減',
        chipBenefit: '屋外ロケでも声クリア・音割れ無',
        chipSpec: '4ch 24bit/32bit Float',
        art: (p) => `
          <!-- Step 1: Noisy Mic Input Waveform -->
          <rect x="22" y="70" width="144" height="194" rx="8" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="94" y="90" text-anchor="middle" font-size="10.2" font-weight="800" fill="#991b1b">① マイク入力（雑音混在）</text>
          <rect x="32" y="100" width="124" height="76" rx="6" fill="#0f172a"/>
          <!-- Red Wind Rumble + Cyan Voice Wave Combined -->
          <path d="M 38 138 Q 48 106 58 138 T 78 138 T 98 138 T 118 138 T 148 138" fill="none" stroke="#f87171" stroke-width="1.8" stroke-dasharray="3 2"/>
          <path d="M 38 138 L 44 126 L 50 152 L 56 112 L 64 162 L 72 118 L 80 154 L 88 122 L 96 158 L 104 114 L 112 152 L 122 128 L 132 148 L 146 138" fill="none" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="94" y="194" text-anchor="middle" font-size="9.4" font-weight="700" fill="#dc2626">× 風のボボボ音</text>
          <text x="94" y="210" text-anchor="middle" font-size="9.4" font-weight="700" fill="#dc2626">× ズーム/AF駆動音</text>
          <text x="94" y="226" text-anchor="middle" font-size="9.4" font-weight="700" fill="#0369a1">＋ 人の話し声（4ch）</text>
          <text x="94" y="248" text-anchor="middle" font-size="8.8" fill="#475569">MIシュー直接デジタル入力</text>
          ${stepBadge(30, 78, '1', '#dc2626')}

          <line x1="168" y1="158" x2="188" y2="158" stroke="#0891b2" stroke-width="2.6" marker-end="url(#${p}_arr_blue)"/>

          <!-- Step 2: 8-Band FFT AI Spectral Subtraction Equalizer -->
          <rect x="192" y="64" width="184" height="206" rx="8" fill="#ecfeff" stroke="#0891b2" stroke-width="1.5"/>
          <text x="284" y="84" text-anchor="middle" font-size="10.6" font-weight="800" fill="#155e75">② 音声DSP（AI周波数分離）</text>
          <rect x="204" y="94" width="160" height="96" rx="6" fill="#0f172a"/>
          <!-- 8 FFT Bars: Low wind cut (red crossed), Mid voice preserved (emerald/cyan), High hiss cut -->
          ${[
            [24, '#ef4444', '風', true],
            [20, '#ef4444', '揺', true],
            [56, '#22c55e', '声', false],
            [70, '#22c55e', '声', false],
            [62, '#22c55e', '声', false],
            [48, '#38bdf8', '倍', false],
            [24, '#f97316', 'モ', true],
            [18, '#ef4444', '雑', true],
          ]
            .map(([h, col, lbl, cut], i) => {
              const bx = 212 + i * 18.5;
              const bh = Number(h);
              return `
                <rect x="${bx}" y="${174 - bh}" width="13" height="${bh}" rx="2" fill="${col}" opacity="${cut ? 0.38 : 0.95}"/>
                ${cut ? `<line x1="${bx}" y1="${174 - bh}" x2="${bx + 13}" y2="174" stroke="#fca5a5" stroke-width="1.5"/>` : ''}
                <text x="${bx + 6.5}" y="185" text-anchor="middle" font-size="7.6" font-weight="700" fill="#e2e8f0">${lbl}</text>
              `;
            })
            .join('')}
          <text x="284" y="210" text-anchor="middle" font-size="9.6" font-weight="800" fill="#155e75">AIが雑音帯域だけリアルタイム削減!</text>
          <text x="284" y="227" text-anchor="middle" font-size="9.2" font-weight="700" fill="#0f766e">32bit Float演算で急な大声も音割れゼロ</text>
          <text x="284" y="246" text-anchor="middle" font-size="9.2" fill="#334155">映像フレームと完全リップシンク同期</text>
          ${stepBadge(200, 72, '2', '#0891b2')}

          <line x1="378" y1="158" x2="398" y2="158" stroke="#16a34a" stroke-width="2.6" marker-end="url(#${p}_arr_green)"/>

          <!-- Step 3: Clean Lip-Synced 4-Ch Output -->
          <rect x="402" y="70" width="136" height="194" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.4"/>
          <text x="470" y="90" text-anchor="middle" font-size="10.2" font-weight="800" fill="#166534">③ クリアな音声完成</text>
          <rect x="412" y="100" width="116" height="76" rx="6" fill="#0f172a"/>
          <path d="M 418 138 Q 432 138 442 122 Q 452 154 462 114 Q 472 162 482 122 Q 492 152 502 136 Q 512 138 522 138" fill="none" stroke="#4ade80" stroke-width="2.4"/>
          <text x="470" y="196" text-anchor="middle" font-size="9.8" font-weight="800" fill="#166534">声だけクッキリ抽出!</text>
          <text x="470" y="214" text-anchor="middle" font-size="9" fill="#14532d">CH1–2：メイン指向性</text>
          <text x="470" y="229" text-anchor="middle" font-size="9" fill="#14532d">CH3–4：環境音/保険</text>
          <text x="470" y="248" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">後編集いらずのプロ音質</text>
          ${stepBadge(410, 78, '3', '#16a34a')}
        `,
      });

    // =========================================================================
    // XR19. On-Die Shared L2/L3 6T-SRAM Cache & ISP Line-Buffer Array
    // =========================================================================
    case 'xr_sram_linebuffer':
      return renderBionzDiagram({
        code: 'xr19',
        badge: 'XR19',
        accent: '#0284c7',
        accentSoft: '#f0f9ff',
        accentDark: '#0369a1',
        title: 'オンダイ超高速 6T-SRAM ラインバッファ',
        metric: '応答 <1ns / 消費電力1/10',
        analogyLine1: '料理人のすぐ手元にある「超高速・食材トレイ」です。',
        analogyLine2: 'いちいち冷蔵庫(外部DRAM)へ取りに行かず、目の前で連続調理するため爆速＆省エネ!',
        chipHow: '6トランジスタSRAM 並列配列',
        chipBenefit: '電池長持ち＆低遅延ISP処理',
        chipSpec: '遅延 <1ns / ECC誤り訂正付',
        art: (p) => `
          <!-- Top: Fast On-Die SRAM Loop (1ns, Low Power) -->
          <rect x="22" y="64" width="320" height="114" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
          <text x="182" y="83" text-anchor="middle" font-size="11" font-weight="800" fill="#166534">① チップ内蔵 SRAM（目の前の手元トレイ）</text>
          <rect x="36" y="94" width="96" height="58" rx="6" fill="url(#${p}_teal)"/>
          <text x="84" y="118" text-anchor="middle" font-size="10.2" font-weight="800" fill="#fff">ISP / AI NPU</text>
          <text x="84" y="134" text-anchor="middle" font-size="9" fill="#ccfbf1">計算中の画素</text>
          <path d="M 134 114 H 188" stroke="#16a34a" stroke-width="2.8" marker-end="url(#${p}_arr_green)"/>
          <path d="M 188 134 H 134" stroke="#16a34a" stroke-width="2.8" marker-end="url(#${p}_arr_green)"/>
          <text x="161" y="108" text-anchor="middle" font-size="9.5" font-weight="800" fill="#15803d">&lt; 1 ns!</text>
          <!-- 8-Bank Butterfly SRAM Array Visual -->
          <rect x="192" y="94" width="136" height="58" rx="6" fill="#0284c7" stroke="#0369a1" stroke-width="1.4"/>
          ${[0, 1, 2, 3]
            .map(
              (r) =>
                `<rect x="200" y="${100 + r * 12}" width="54" height="9" rx="2" fill="#7dd3fc"/><rect x="266" y="${100 + r * 12}" width="54" height="9" rx="2" fill="#7dd3fc"/>`
            )
            .join('')}
          <rect x="257" y="98" width="6" height="49" fill="#facc15"/>
          <text x="182" y="168" text-anchor="middle" font-size="9.8" font-weight="800" fill="#15803d">外へ出ずに超高速往復 → 往復電力 1/10 以下!</text>

          <!-- Bottom: Slow External DRAM Comparison -->
          <rect x="22" y="186" width="320" height="86" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.2"/>
          <text x="182" y="205" text-anchor="middle" font-size="10.5" font-weight="800" fill="#991b1b">比較：毎回 外部DRAM(2階)へ往復すると…</text>
          <rect x="36" y="215" width="76" height="32" rx="5" fill="#64748b"/>
          <text x="74" y="235" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">計算回路</text>
          <path d="M 114 231 H 236" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="5 3" marker-start="url(#${p}_arr_red)" marker-end="url(#${p}_arr_red)"/>
          <text x="175" y="224" text-anchor="middle" font-size="9.2" font-weight="800" fill="#dc2626">待ち時間 約30倍・発熱大!</text>
          <rect x="240" y="215" width="88" height="32" rx="5" fill="#1e40af"/>
          <text x="284" y="235" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">外部DRAM</text>
          <text x="182" y="263" text-anchor="middle" font-size="9.2" fill="#7f1d1d">だから処理途中の行データ(ライン)は必ず内蔵SRAMに置く!</text>

          <!-- Right: 6T-SRAM Cell & Line-Buffer Window Illustration -->
          <rect x="354" y="64" width="184" height="208" rx="8" fill="#f0f9ff" stroke="#38bdf8" stroke-width="1.4"/>
          <text x="446" y="84" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0369a1">② ラインバッファの働き</text>
          <!-- Image Sensor Scanning Lines -->
          <rect x="368" y="96" width="156" height="72" rx="5" fill="#0f172a"/>
          ${[0, 1, 2, 3, 4]
            .map(
              (r) =>
                `<rect x="376" y="${104 + r * 12}" width="140" height="8" rx="2" fill="${r >= 1 && r <= 3 ? '#38bdf8' : '#334155'}"/>`
            )
            .join('')}
          <rect x="373" y="114" width="146" height="36" rx="3" fill="none" stroke="#facc15" stroke-width="1.8"/>
          <rect x="392" y="123" width="108" height="17" rx="4" fill="#0f172a" opacity="0.88"/>
          <text x="446" y="135" text-anchor="middle" font-size="9" font-weight="800" fill="#fef08a">上下数行を同時保持!</text>
          <text x="446" y="186" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0c4a6e">上下左右の画素を同時に参照</text>
          <text x="446" y="202" text-anchor="middle" font-size="9" fill="#334155">デモザイク・ノイズ除去・</text>
          <text x="446" y="216" text-anchor="middle" font-size="9" fill="#334155">AI畳み込みを1回で一気に計算!</text>
          <rect x="368" y="228" width="156" height="34" rx="5" fill="#ffffff" stroke="#0284c7"/>
          <text x="446" y="243" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0369a1">6トランジスタ(6T)セル構造</text>
          <text x="446" y="256" text-anchor="middle" font-size="8.6" fill="#475569">リフレッシュ不要＆ECC自動修復</text>
        `,
      });

    // =========================================================================
    // XR20. 256-Bit LPDDR5X Memory Controller & Pre-Capture Ring-Buffer Arbiter
    // =========================================================================
    case 'xr_ddr_mem_controller':
      return renderBionzDiagram({
        code: 'xr20',
        badge: 'XR20',
        accent: '#1d4ed8',
        accentSoft: '#eff6ff',
        accentDark: '#1e3a8a',
        title: '256bit メモリ制御＆プリ連写リング調停',
        metric: 'QoS優先制御 / 256bit幅',
        analogyLine1: 'EVF・連写・AI・8Kが同時にメモリを使っても渋滞させない「凄腕の交通整理員」です。',
        analogyLine2: 'シャッター半押し中の1秒間を常時ループ録画する“プリ撮影”もここが管理します。',
        chipHow: '優先度QoS調停＋リングバッファ',
        chipBenefit: '連写中もEVF滑らか＆プリ連写',
        chipSpec: '256bit幅 / 8533 MT/s PHY',
        art: (p) => `
          <!-- Left: 4 Competing High-Speed Clients -->
          <text x="86" y="72" text-anchor="middle" font-size="10.5" font-weight="800" fill="#1e3a8a">① 同時に押し寄せる4要求</text>
          ${[
            ['最優先! EVF表示', '#dc2626', '#fef2f2', '途切れ絶対NG'],
            ['高優先 RAW連写', '#d97706', '#fffbeb', '30コマ/秒書込'],
            ['中優先 AI NPU', '#7c3aed', '#f5f3ff', '骨格・瞳推論'],
            ['通常 8K動画保存', '#0284c7', '#f0f9ff', 'カードへ順次'],
          ]
            .map(
              ([lbl, col, bg, sub], i) => `
                <rect x="20" y="${82 + i * 47}" width="134" height="39" rx="6" fill="${bg}" stroke="${col}" stroke-width="1.4"/>
                <text x="87" y="${99 + i * 47}" text-anchor="middle" font-size="9.6" font-weight="800" fill="${col}">${lbl}</text>
                <text x="87" y="${113 + i * 47}" text-anchor="middle" font-size="8.4" fill="#475569">${sub}</text>
                <line x1="156" y1="${101 + i * 47}" x2="196" y2="154" stroke="${col}" stroke-width="2" marker-end="url(#${p}_arr_blue)"/>
              `
            )
            .join('')}

          <!-- Center: QoS Traffic Arbiter + Pre-Capture Circular Ring-Buffer Wheel -->
          <rect x="200" y="68" width="184" height="202" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>
          <text x="292" y="88" text-anchor="middle" font-size="10.8" font-weight="800" fill="#1e40af">② QoS信号機＆リング保存</text>
          <!-- Pre-Capture Circular Ring Buffer Illustration -->
          <circle cx="292" cy="152" r="46" fill="#ffffff" stroke="#cbd5e1" stroke-width="10"/>
          <path d="M 292 106 A 46 46 0 1 1 250 172" fill="none" stroke="#2563eb" stroke-width="10" stroke-linecap="round"/>
          <circle cx="292" cy="152" r="24" fill="#1e40af"/>
          <text x="292" y="149" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fff">QoS</text>
          <text x="292" y="162" text-anchor="middle" font-size="8.4" fill="#fde047">交通整理</text>
          <text x="292" y="102" text-anchor="middle" font-size="8.2" font-weight="800" fill="#1d4ed8">最新コマ上書↻</text>
          <!-- Pre-Capture Explanation -->
          <rect x="212" y="210" width="160" height="50" rx="6" fill="#ffffff" stroke="#93c5fd"/>
          <text x="292" y="226" text-anchor="middle" font-size="9.5" font-weight="800" fill="#1e40af">プリ撮影リングバッファ</text>
          <text x="292" y="240" text-anchor="middle" font-size="8.6" fill="#334155">全押しする最大1秒前の瞬間も</text>
          <text x="292" y="253" text-anchor="middle" font-size="8.6" font-weight="700" fill="#0d9488">輪っか状メモリから遡って記録!</text>
          ${stepBadge(208, 76, '2', '#2563eb')}

          <!-- Right: 4x64bit (=256bit) LPDDR5X PHY Lanes to PoP Memory -->
          ${[112, 146, 180, 214]
            .map(
              (y) =>
                `<line x1="386" y1="${y}" x2="420" y2="${y}" stroke="#1d4ed8" stroke-width="2.8" marker-start="url(#${p}_arr_blue)" marker-end="url(#${p}_arr_blue)"/><text x="403" y="${y - 5}" text-anchor="middle" font-size="7.8" font-weight="800" fill="#1e3a8a">64b</text>`
            )
            .join('')}
          <rect x="424" y="76" width="114" height="186" rx="8" fill="url(#${p}_dram)" stroke="#1e3a8a" stroke-width="1.5"/>
          <text x="481" y="102" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">③ LPDDR5X</text>
          <text x="481" y="118" text-anchor="middle" font-size="9.4" fill="#dbeafe">PoP 4段DRAM</text>
          <rect x="436" y="132" width="90" height="50" rx="5" fill="#ffffff" opacity="0.16"/>
          <text x="481" y="152" text-anchor="middle" font-size="10.2" font-weight="800" fill="#fef08a">256bit 並列</text>
          <text x="481" y="168" text-anchor="middle" font-size="9" fill="#ffffff">8533 MT/s 駆動</text>
          <text x="481" y="206" text-anchor="middle" font-size="9.2" font-weight="700" fill="#ffffff">EVFを最優先して</text>
          <text x="481" y="222" text-anchor="middle" font-size="9.2" font-weight="700" fill="#fef08a">カクつきゼロ保証!</text>
          <text x="481" y="246" text-anchor="middle" font-size="8.6" fill="#bfdbfe">省電力モード自動切替</text>
          ${stepBadge(432, 84, '3', '#1e3a8a')}
        `,
      });

    // =========================================================================
    // XR21. C2PA Hardware Root-of-Trust & Active-Shield Tamper Vault
    // =========================================================================
    case 'xr_c2pa_crypto_enclave':
      return renderBionzDiagram({
        code: 'xr21',
        badge: 'XR21',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        accentDark: '#92400e',
        title: 'C2PA 真正性・ハードウェア暗号金庫',
        metric: '改ざん不能 電子署名刻印',
        analogyLine1: '「AI偽造ではなくカメラで撮った本物の写真だ」と証明するチップ内蔵の鉄壁金庫です。',
        analogyLine2: 'もし誰かがチップを削って鍵を盗もうとすると、金線の網が切れて鍵を瞬時消去します。',
        chipHow: '秘密鍵金庫＋蛇行タンパー網',
        chipBenefit: '報道・作品の「本物証明」対応',
        chipSpec: 'C2PA / ECDSA + SHA-256',
        art: (p) => `
          <!-- Step 1: Real Camera Capture -->
          <rect x="20" y="80" width="114" height="170" rx="8" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="77" y="100" text-anchor="middle" font-size="10.2" font-weight="800" fill="#1e293b">① 撮影の瞬間</text>
          <!-- Camera Icon -->
          <rect x="42" y="118" width="70" height="48" rx="7" fill="#334155"/>
          <rect x="58" y="110" width="24" height="10" rx="2" fill="#475569"/>
          <circle cx="77" cy="142" r="15" fill="#0ea5e9" stroke="#e2e8f0" stroke-width="2.5"/>
          <circle cx="77" cy="142" r="7" fill="#0f172a"/>
          <text x="77" y="188" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">撮った瞬間の</text>
          <text x="77" y="203" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">RAW画素＋3D深度</text>
          <text x="77" y="220" text-anchor="middle" font-size="9" fill="#0369a1">ハッシュ指紋を作成</text>
          ${stepBadge(28, 88, '1', '#475569')}

          <line x1="136" y1="164" x2="160" y2="164" stroke="#d97706" stroke-width="2.6" marker-end="url(#${p}_arr_gold)"/>

          <!-- Step 2: Octagonal Crypto Vault Armored with Serpentine Active-Shield Mesh -->
          <rect x="164" y="64" width="218" height="206" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="1.6"/>
          <text x="273" y="83" text-anchor="middle" font-size="10.8" font-weight="800" fill="#92400e">② チップ内蔵・耐タンパー金庫</text>
          <!-- Octagonal Fortress -->
          <polygon points="236,96 310,96 344,126 344,180 310,210 236,210 202,180 202,126" fill="#1e293b" stroke="url(#${p}_gold)" stroke-width="3.2"/>
          <!-- Continuous Gold Serpentine Active-Shield Mesh Over Vault -->
          <path d="M 218 122 H 328 V 134 H 218 V 146 H 328 V 158 H 218 V 170 H 328 V 182 H 218" fill="none" stroke="#eab308" stroke-width="1.5" opacity="0.55"/>
          <!-- Central Key & Lock Icon -->
          <rect x="242" y="128" width="62" height="52" rx="7" fill="#0f172a" stroke="#facc15" stroke-width="1.8"/>
          <circle cx="273" cy="147" r="9" fill="none" stroke="#facc15" stroke-width="2.4"/>
          <rect x="263" y="153" width="20" height="17" rx="3" fill="#facc15"/>
          <text x="273" y="198" text-anchor="middle" font-size="9" font-weight="800" fill="#fde047">個体秘密鍵（外部不出!）</text>
          <text x="273" y="230" text-anchor="middle" font-size="9.5" font-weight="800" fill="#92400e">金色の蛇行メッシュで厳重ガード</text>
          <text x="273" y="246" text-anchor="middle" font-size="9" fill="#78350f">物理ハッキングを検知すると鍵を自動消去!</text>
          <text x="273" y="261" text-anchor="middle" font-size="8.8" font-weight="700" fill="#b45309">工場の最終出荷時に署名鍵を焼き込み</text>
          ${stepBadge(172, 72, '2', '#d97706')}

          <line x1="384" y1="164" x2="408" y2="164" stroke="#16a34a" stroke-width="2.6" marker-end="url(#${p}_arr_green)"/>

          <!-- Step 3: C2PA Certified Authentic Image -->
          <rect x="412" y="72" width="126" height="186" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
          <text x="475" y="92" text-anchor="middle" font-size="10.2" font-weight="800" fill="#166534">③ 本物の写真証明</text>
          <!-- Photo Card with Verified C2PA Seal -->
          <rect x="426" y="104" width="98" height="72" rx="6" fill="#ffffff" stroke="#22c55e" stroke-width="1.5"/>
          <rect x="434" y="112" width="82" height="36" rx="3" fill="#bae6fd"/>
          <path d="M 434 148 L 460 126 L 480 140 L 496 128 L 516 148 Z" fill="#0f766e"/>
          <circle cx="508" cy="162" r="14" fill="#16a34a" stroke="#ffffff" stroke-width="2"/>
          <text x="508" y="166" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">✓</text>
          <text x="462" y="165" text-anchor="middle" font-size="8.6" font-weight="800" fill="#15803d">C2PA署名済</text>
          <text x="475" y="198" text-anchor="middle" font-size="9.4" font-weight="800" fill="#166534">1ピクセルでも改ざん</text>
          <text x="475" y="213" text-anchor="middle" font-size="9.4" font-weight="800" fill="#dc2626">→ 即座に見抜ける!</text>
          <text x="475" y="236" text-anchor="middle" font-size="8.8" fill="#14532d">生成AIフェイク対策の</text>
          <text x="475" y="249" text-anchor="middle" font-size="8.8" fill="#14532d">国際標準「出生証明書」</text>
          ${stepBadge(420, 80, '3', '#16a34a')}
        `,
      });

    // =========================================================================
    // XR22. PCIe Gen4 CFexpress Type A NVMe DMA & Dual-Slot Storage Engine
    // =========================================================================
    case 'xr_pcie_cfx_dma':
      return renderBionzDiagram({
        code: 'xr22',
        badge: 'XR22',
        accent: '#ea580c',
        accentSoft: '#fff7ed',
        accentDark: '#9a3412',
        title: 'PCIe Gen4 CFexpress DMA 爆速書出',
        metric: '最大1.6GB/s / 同時2枚記録',
        analogyLine1: 'CPUの手を借りずに連写データをカードへ直送する「全自動・高速ベルトコンベア」です。',
        analogyLine2: '書き込み中でもカメラ操作やAFが一切重くならず、2枚同時バックアップも余裕です。',
        chipHow: 'CPU迂回DMA＋NVMe並列制御',
        chipBenefit: '連写後の待ち時間ほぼゼロ!',
        chipSpec: 'PCIe Gen4 / UHS-II 同時対応',
        art: (p) => `
          <!-- Top Comparison: BAD (CPU Copying Manually) -->
          <rect x="22" y="64" width="516" height="66" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.2"/>
          ${comparePill(32, 72, 168, false, 'もしCPUが自分で運ぶと…')}
          <rect x="212" y="74" width="66" height="24" rx="4" fill="#1d4ed8"/>
          <text x="245" y="90" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fff">DRAM</text>
          <line x1="280" y1="86" x2="314" y2="86" stroke="#dc2626" stroke-width="2" marker-end="url(#${p}_arr_red)"/>
          <rect x="318" y="74" width="76" height="24" rx="4" fill="#dc2626"/>
          <text x="356" y="90" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fff">CPUパンク!</text>
          <line x1="396" y1="86" x2="430" y2="86" stroke="#dc2626" stroke-width="2" marker-end="url(#${p}_arr_red)"/>
          <rect x="434" y="74" width="90" height="24" rx="4" fill="#64748b"/>
          <text x="479" y="90" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">カード書込</text>
          <text x="280" y="118" text-anchor="middle" font-size="9.6" font-weight="700" fill="#991b1b">書き込み中にメニューが固まったり、次のシャッターが切れなくなってしまう!</text>

          <!-- Bottom: GOOD (Dedicated PCIe Gen4 DMA Conveyor Bypassing CPU!) -->
          <rect x="22" y="138" width="516" height="134" rx="8" fill="#fff7ed" stroke="#ea580c" stroke-width="1.6"/>
          ${comparePill(32, 146, 224, true, 'BIONZ XR 専用DMA直通コンベア')}
          <!-- Free CPU Resting Up Top -->
          <rect x="278" y="146" width="122" height="26" rx="5" fill="#dcfce7" stroke="#16a34a"/>
          <text x="339" y="163" text-anchor="middle" font-size="9.5" font-weight="800" fill="#166534">ARM CPU：手ぶらで自由!</text>

          <!-- DRAM Buffer -> DMA Conveyor -> Dual Slots -->
          <rect x="34" y="188" width="96" height="54" rx="6" fill="url(#${p}_dram)"/>
          <text x="82" y="211" text-anchor="middle" font-size="10.2" font-weight="800" fill="#fff">LPDDR5X</text>
          <text x="82" y="227" text-anchor="middle" font-size="8.8" fill="#dbeafe">連写バッファ</text>

          <!-- Belt Conveyor DMA Engine -->
          <rect x="158" y="190" width="166" height="50" rx="8" fill="url(#${p}_cu)" stroke="#9a3412" stroke-width="1.5"/>
          <text x="241" y="211" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">専用DMA 爆速直送回路</text>
          <text x="241" y="227" text-anchor="middle" font-size="9" fill="#fef08a">CPUを通らず自動リレー転送!</text>
          <line x1="132" y1="215" x2="154" y2="215" stroke="#ea580c" stroke-width="3" marker-end="url(#${p}_arr_gold)"/>

          <!-- Fork to Dual Card Slots -->
          <path d="M 326 205 L 360 192 M 326 226 L 360 240" stroke="#ea580c" stroke-width="2.6" marker-end="url(#${p}_arr_gold)"/>

          <!-- Slot 1: CFexpress Type A -->
          <rect x="366" y="176" width="158" height="36" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.4"/>
          <text x="445" y="192" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9a3412">Slot 1：CFexpress Type A</text>
          <text x="445" y="205" text-anchor="middle" font-size="8.6" font-weight="700" fill="#c2410c">PCIe Gen4 NVMe / 1.6GB/s級</text>

          <!-- Slot 2: SDXC UHS-II -->
          <rect x="366" y="220" width="158" height="36" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.4"/>
          <text x="445" y="236" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0369a1">Slot 2：SDXC UHS-II</text>
          <text x="445" y="249" text-anchor="middle" font-size="8.6" font-weight="700" fill="#0284c7">ハードウェア同時ミラー保存!</text>

          ${stepBadge(166, 196, '1', '#9a3412')}
          <text x="194" y="261" text-anchor="middle" font-size="9.4" font-weight="800" fill="#9a3412">① 1000枚超の連続撮影でもバッファ詰まりなし!</text>
        `,
      });

    // =========================================================================
    // XR23. Dual-Stream Display Engine (240Hz OLED EVF, LCD, 48Gbps HDMI 2.1)
    // =========================================================================
    case 'xr_display_evf_hdmi_tx':
      return renderBionzDiagram({
        code: 'xr23',
        badge: 'XR23',
        accent: '#0284c7',
        accentSoft: '#eff6ff',
        accentDark: '#1d4ed8',
        title: 'EVF・液晶・HDMI 3画面同時出力エンジン',
        metric: '240fps EVF＋16bit RAW',
        analogyLine1: 'ファインダー・背面液晶・外部モニターの3画面へ同時に映像を届ける「放送局スイッチャー」です。',
        analogyLine2: '緑のAF枠や水準器も遅延ゼロで重ね描きし、肉眼のように滑らかに見せます。',
        chipHow: 'OSD合成＋3系統独立TX出力',
        chipBenefit: 'ブラックアウト無の連写＆RAW出力',
        chipSpec: 'MIPI-DSI 240Hz / HDMI 48G',
        art: (p) => `
          <!-- Left: Processed Image + Zero-Latency Hardware OSD Layer -->
          <rect x="22" y="72" width="128" height="190" rx="8" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="86" y="92" text-anchor="middle" font-size="10.2" font-weight="800" fill="#1e293b">① 映像＋OSD合成</text>
          <!-- Layer 1: Live Video -->
          <rect x="34" y="104" width="104" height="52" rx="5" fill="#0284c7"/>
          <text x="86" y="128" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fff">ライブ撮影映像</text>
          <text x="86" y="143" text-anchor="middle" font-size="8.4" fill="#bae6fd">10bit HDR 映像</text>
          <!-- Plus Sign -->
          <text x="86" y="172" text-anchor="middle" font-size="13" font-weight="800" fill="#0284c7">＋</text>
          <!-- Layer 2: Hardware OSD Graphics -->
          <rect x="34" y="178" width="104" height="52" rx="5" fill="#0f172a" stroke="#22c55e" stroke-width="1.3"/>
          <rect x="52" y="188" width="24" height="20" fill="none" stroke="#4ade80" stroke-width="1.6"/>
          <line x1="88" y1="198" x2="124" y2="198" stroke="#facc15" stroke-width="1.5"/>
          <text x="86" y="222" text-anchor="middle" font-size="8.4" font-weight="700" fill="#4ade80">AF枠・ゼブラ・水準器</text>
          <text x="86" y="250" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">遅延ゼロで重畳!</text>
          ${stepBadge(30, 80, '1', '#0284c7')}

          <line x1="152" y1="166" x2="178" y2="166" stroke="#2563eb" stroke-width="2.6" marker-end="url(#${p}_arr_blue)"/>

          <!-- Center: Multi-Stream Display Compositor -->
          <rect x="182" y="110" width="106" height="112" rx="10" fill="url(#${p}_si_blue)" stroke="#1e3a8a" stroke-width="1.6"/>
          <text x="235" y="142" text-anchor="middle" font-size="10.8" font-weight="800" fill="#ffffff">② 3系統同時</text>
          <text x="235" y="159" text-anchor="middle" font-size="10.8" font-weight="800" fill="#ffffff">映像分配器</text>
          <text x="235" y="182" text-anchor="middle" font-size="8.8" fill="#fef08a">色空間・解像度を</text>
          <text x="235" y="196" text-anchor="middle" font-size="8.8" fill="#fef08a">画面ごとに自動最適</text>
          ${stepBadge(190, 118, '2', '#1e40af')}

          <!-- Fan-out to 3 Screens -->
          <path d="M 290 136 L 328 100 M 290 166 L 328 166 M 290 196 L 328 232" stroke="#2563eb" stroke-width="2.4" marker-end="url(#${p}_arr_blue)"/>

          <!-- Screen 1: 9.44M OLED EVF -->
          <rect x="334" y="66" width="204" height="62" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>
          <rect x="342" y="75" width="54" height="44" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.6"/>
          <circle cx="369" cy="97" r="13" fill="#0284c7"/>
          <text x="369" y="100" text-anchor="middle" font-size="8.4" font-weight="800" fill="#fff">EVF</text>
          <text x="404" y="90" font-size="10.2" font-weight="800" fill="#1e40af">944万ドット OLED EVF</text>
          <text x="404" y="106" font-size="9" fill="#334155">MIPI-DSI 最大240Hz駆動</text>
          <text x="404" y="119" font-size="8.8" font-weight="700" fill="#0d9488">連写時も画面真っ暗にならない!</text>

          <!-- Screen 2: 4-Axis Rear LCD -->
          <rect x="334" y="136" width="204" height="62" rx="8" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.4"/>
          <rect x="342" y="145" width="54" height="44" rx="5" fill="#115e59" stroke="#5eead4" stroke-width="1.4"/>
          <text x="369" y="171" text-anchor="middle" font-size="8.8" font-weight="800" fill="#fff">背面LCD</text>
          <text x="404" y="160" font-size="10.2" font-weight="800" fill="#115e59">バリアングル背面液晶</text>
          <text x="404" y="176" font-size="9" fill="#334155">タッチAF・メニューUI連携</text>
          <text x="404" y="189" font-size="8.8" font-weight="700" fill="#0f766e">屋外でも見やすい高輝度表示</text>

          <!-- Screen 3: Full-Size HDMI 2.1 -->
          <rect x="334" y="206" width="204" height="62" rx="8" fill="#fff7ed" stroke="#d97706" stroke-width="1.4"/>
          <rect x="342" y="215" width="54" height="44" rx="5" fill="#9a3412" stroke="#fbbf24" stroke-width="1.4"/>
          <text x="369" y="241" text-anchor="middle" font-size="8.8" font-weight="800" fill="#fff">HDMI</text>
          <text x="404" y="230" font-size="10.2" font-weight="800" fill="#9a3412">フルサイズ HDMI 2.1 出力</text>
          <text x="404" y="246" font-size="9" fill="#334155">最大48Gbps / 16bit RAW対応</text>
          <text x="404" y="259" font-size="8.8" font-weight="700" fill="#b45309">外部プロレコーダーへ直接収録</text>
        `,
      });

    // =========================================================================
    // XR24. USB 3.2 Gen2 10Gbps UVC/UAC & Wi-Fi 6E 2x2 MIMO I/O Hub
    // =========================================================================
    case 'xr_usb_network_hub':
      return renderBionzDiagram({
        code: 'xr24',
        badge: 'XR24',
        accent: '#6366f1',
        accentSoft: '#eef2ff',
        accentDark: '#3730a3',
        title: 'USB 10Gbps ＆ Wi-Fi 6E 外交通信ハブ',
        metric: '4K60p配信＋高速無線転送',
        analogyLine1: 'PC・スマホ・クラウドとカメラを繋ぐ「超高速・総合外交窓口」です。',
        analogyLine2: 'USBケーブル1本で4K高画質Webカメラになり、撮った写真も即スマホへ飛びます。',
        chipHow: 'UVC配信MAC＋RFスパイラル整合',
        chipBenefit: '4Kライブ配信＆即時クラウド共有',
        chipSpec: 'USB 10Gbps / Wi-Fi 6E 2×2',
        art: (p) => `
          <!-- Left: BIONZ XR Internal RF Balun Coils + USB 10Gbps MAC -->
          <rect x="22" y="68" width="194" height="198" rx="8" fill="#eef2ff" stroke="#6366f1" stroke-width="1.5"/>
          <text x="119" y="88" text-anchor="middle" font-size="10.5" font-weight="800" fill="#3730a3">① チップ内蔵 通信エンジン</text>
          <!-- Twin Octagonal RF Spiral Balun Coils -->
          ${[76, 162]
            .map(
              (cx) => `
                <polygon points="${cx - 26},110 ${cx - 12},98 ${cx + 12},98 ${cx + 26},110 ${cx + 26},134 ${cx + 12},146 ${cx - 12},146 ${cx - 26},134" fill="#1e293b" stroke="#eab308" stroke-width="2.2"/>
                <polygon points="${cx - 18},114 ${cx - 8},105 ${cx + 8},105 ${cx + 18},114 ${cx + 18},130 ${cx + 8},139 ${cx - 8},139 ${cx - 18},130" fill="none" stroke="#facc15" stroke-width="1.8"/>
                <polygon points="${cx - 10},118 ${cx - 4},113 ${cx + 4},113 ${cx + 10},118 ${cx + 10},126 ${cx + 4},131 ${cx - 4},131 ${cx - 10},126" fill="none" stroke="#fb923c" stroke-width="1.5"/>
              `
            )
            .join('')}
          <text x="119" y="162" text-anchor="middle" font-size="9.2" font-weight="800" fill="#854d0e">双発 八角形RFスパイラルコイル</text>
          <text x="119" y="175" text-anchor="middle" font-size="8.4" fill="#475569">（6GHz電波をノイズなく送受信）</text>
          <!-- USB 3.2 Gen2 10G MAC -->
          <rect x="36" y="186" width="166" height="68" rx="6" fill="#3730a3"/>
          <text x="119" y="206" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">USB 3.2 Gen2 (10Gbps)</text>
          <text x="119" y="222" text-anchor="middle" font-size="9" fill="#c7d2fe">UVC / UAC 規格内蔵</text>
          <text x="119" y="238" text-anchor="middle" font-size="8.6" fill="#fef08a">変換機なしで4K配信OK!</text>
          ${stepBadge(30, 76, '1', '#4f46e5')}

          <!-- Connection Arrows -->
          <path d="M 218 118 L 266 100 M 218 168 L 266 168 M 218 220 L 266 234" stroke="#6366f1" stroke-width="2.4" marker-end="url(#${p}_arr_purple)"/>

          <!-- Right: 3 External Workflows -->
          <!-- Channel 1: USB-C 4K60p Live Streaming -->
          <rect x="272" y="66" width="264" height="62" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.4"/>
          <rect x="282" y="76" width="76" height="42" rx="6" fill="#16a34a"/>
          <text x="320" y="95" text-anchor="middle" font-size="9.8" font-weight="800" fill="#fff">USB-C</text>
          <text x="320" y="109" text-anchor="middle" font-size="8.6" fill="#dcfce7">10Gbps</text>
          <text x="366" y="91" font-size="9.8" font-weight="800" fill="#166534">② ケーブル1本で4K60p配信</text>
          <text x="366" y="106" font-size="8.5" fill="#334155">PC接続で即Webカメラ＆高音質化</text>
          <text x="366" y="119" font-size="8.5" fill="#15803d">テザー撮影・USB給電PDにも対応</text>

          <!-- Channel 2: Wi-Fi 6E 2x2 MIMO -->
          <rect x="272" y="136" width="264" height="62" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>
          <rect x="282" y="146" width="76" height="42" rx="6" fill="#2563eb"/>
          <text x="320" y="165" text-anchor="middle" font-size="9.8" font-weight="800" fill="#fff">Wi-Fi 6E</text>
          <text x="320" y="179" text-anchor="middle" font-size="8.6" fill="#dbeafe">2×2 MIMO</text>
          <text x="366" y="161" font-size="9.8" font-weight="800" fill="#1e40af">③ スマホ＆クラウド爆速転送</text>
          <text x="366" y="176" font-size="8.5" fill="#334155">撮影しながら自動でRAWをFTP送信</text>
          <text x="366" y="189" font-size="8.5" fill="#1d4ed8">5Gスマホ連動で報道現場から即納品!</text>

          <!-- Channel 3: E-Mount & MI-Shoe Fast Bus -->
          <rect x="272" y="206" width="264" height="62" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="1.4"/>
          <rect x="282" y="216" width="76" height="42" rx="6" fill="#d97706"/>
          <text x="320" y="235" text-anchor="middle" font-size="9.8" font-weight="800" fill="#fff">周辺I/O</text>
          <text x="320" y="249" text-anchor="middle" font-size="8.6" fill="#fef3c7">LAN / SPI</text>
          <text x="366" y="231" font-size="9.8" font-weight="800" fill="#92400e">④ 2.5GbE有線LAN＆レンズ通信</text>
          <text x="366" y="246" font-size="8.5" fill="#334155">EマウントレンズやMIシュー機器を</text>
          <text x="366" y="259" font-size="8.5" fill="#b45309">低遅延シリアルバスで一括統合制御</text>
        `,
      });

    // =========================================================================
    // XR25. Multi-Domain Fractional-N PLL & DVFS Power-Gating Ring
    // =========================================================================
    case 'xr_pll_clock_dvfs_ring':
      return renderBionzDiagram({
        code: 'xr25',
        badge: 'XR25',
        accent: '#db2777',
        accentSoft: '#fdf2f8',
        accentDark: '#9d174d',
        title: '多系統PLLクロック網 ＆ DVFS省電力制御',
        metric: '電池持ち約25%UPの秘密',
        analogyLine1: '全力疾走と省エネ休憩を0.001秒単位で切り替える「チップの心臓ペースメーカー」です。',
        analogyLine2: '使っていない回路は電気をパチッと止め、シャッターの瞬間だけ一気に全開にします。',
        chipHow: 'H-Tree同期網＋動的DVFS制御',
        chipBenefit: '撮影枚数大幅UP＆発熱低減',
        chipSpec: '0.55V休止 ⇔ 0.82V全開',
        art: (_p) => `
          <!-- Left: LC-Tank VCO Spiral & Fractal H-Tree Zero-Skew Clock Distribution -->
          <rect x="22" y="66" width="212" height="202" rx="8" fill="#fdf2f8" stroke="#ec4899" stroke-width="1.4"/>
          <text x="128" y="86" text-anchor="middle" font-size="10.5" font-weight="800" fill="#9d174d">① H-Tree 等長クロック配線</text>
          <!-- True Symmetric Fractal H-Tree Visual -->
          <rect x="40" y="96" width="176" height="114" rx="7" fill="#0f172a"/>
          <!-- Main H -->
          <line x1="76" y1="153" x2="180" y2="153" stroke="#facc15" stroke-width="3"/>
          <line x1="76" y1="120" x2="76" y2="186" stroke="#facc15" stroke-width="2.6"/>
          <line x1="180" y1="120" x2="180" y2="186" stroke="#facc15" stroke-width="2.6"/>
          <!-- Sub-H Leaves -->
          ${[
            [56, 120],
            [96, 120],
            [56, 186],
            [96, 186],
            [160, 120],
            [200, 120],
            [160, 186],
            [200, 186],
          ]
            .map(
              ([lx, ly]) =>
                `<line x1="${lx < 128 ? 76 : 180}" y1="${ly}" x2="${lx}" y2="${ly}" stroke="#38bdf8" stroke-width="1.8"/><circle cx="${lx}" cy="${ly}" r="4.5" fill="#ec4899" stroke="#fff" stroke-width="1"/>`
            )
            .join('')}
          <!-- Central VCO PLL Hub -->
          <circle cx="128" cy="153" r="14" fill="#db2777" stroke="#fde047" stroke-width="2"/>
          <text x="128" y="156.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#fff">PLL</text>
          <text x="128" y="228" text-anchor="middle" font-size="9.5" font-weight="800" fill="#9d174d">H字を枝分かれさせて距離を完全一致!</text>
          <text x="128" y="244" text-anchor="middle" font-size="9" fill="#475569">全16区画へ1兆分の1秒のズレなく</text>
          <text x="128" y="258" text-anchor="middle" font-size="9" fill="#475569">数GHzのリズムが同時到着します</text>
          ${stepBadge(30, 74, '1', '#db2777')}

          <!-- Right: DVFS Real-Time Voltage & Clock Waveform Timeline -->
          <rect x="246" y="66" width="292" height="202" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>
          <text x="392" y="86" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">② DVFS：瞬間切替の省エネ波形</text>
          <!-- Graph Axes -->
          <rect x="262" y="96" width="262" height="106" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
          <line x1="276" y1="186" x2="514" y2="186" stroke="#64748b" stroke-width="1.4"/>
          <line x1="276" y1="106" x2="276" y2="186" stroke="#64748b" stroke-width="1.4"/>
          <!-- Idle -> Burst Spike -> Idle Step Curve -->
          <path d="M 278 174 L 344 174 L 352 114 L 444 114 L 452 174 L 512 174" fill="none" stroke="#db2777" stroke-width="3"/>
          <path d="M 278 174 L 344 174 L 352 114 L 444 114 L 452 174 L 512 174 L 512 186 L 278 186 Z" fill="#ec4899" opacity="0.14"/>
          <!-- Annotations on Graph -->
          <text x="311" y="166" text-anchor="middle" font-size="8.8" font-weight="800" fill="#15803d">構図決め</text>
          <text x="311" y="154" text-anchor="middle" font-size="8.4" fill="#16a34a">0.55V 省エネ</text>
          <rect x="356" y="122" width="84" height="32" rx="5" fill="#be123c"/>
          <text x="398" y="136" text-anchor="middle" font-size="8.8" font-weight="800" fill="#fff">連写・AI全開!</text>
          <text x="398" y="148" text-anchor="middle" font-size="8.4" fill="#fef08a">0.82V / 最高速</text>
          <text x="484" y="166" text-anchor="middle" font-size="8.8" font-weight="800" fill="#15803d">即スリープ</text>
          <text x="484" y="154" text-anchor="middle" font-size="8.4" fill="#16a34a">不用回路OFF</text>
          <!-- Bottom Power-Gating Benefit -->
          <rect x="262" y="210" width="262" height="48" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
          <text x="393" y="228" text-anchor="middle" font-size="10" font-weight="800" fill="#166534">パワーゲーティング（部分電源遮断）</text>
          <text x="393" y="245" text-anchor="middle" font-size="9.2" fill="#14532d">静止画撮影中は動画コーデックを完全OFF→電池長持ち!</text>
          ${stepBadge(254, 74, '2', '#be123c')}
        `,
      });

    // =========================================================================
    // XR26. FEOL 4nm/5nm FinFET / GAA Nanosheet Transistor Layer & HKMG
    // =========================================================================
    case 'xr_feol_finfet_gaa':
      return renderBionzDiagram({
        code: 'xr26',
        badge: 'XR26',
        accent: '#0284c7',
        accentSoft: '#f0f9ff',
        accentDark: '#0c4a6e',
        title: 'FEOL 最先端4nm 立体トランジスタ層',
        metric: '数十億スイッチ / 髪の1/20,000',
        analogyLine1: '1秒間に何十億回もON/OFFする「超ミクロの電気の水道蛇口」が数十億個並んでいます。',
        analogyLine2: '水流(電子)を3面・全周からギュッと包み込む立体構造で、水漏れ(ムダ発熱)を防ぎます。',
        chipHow: 'FinFET/GAA＋High-kメタルゲート',
        chipBenefit: '驚異の演算力と低発熱を両立',
        chipSpec: '4nm EUV / HfO₂+TiN HKMG',
        art: (p) => `
          <!-- Left: BAD (Old Planar 2D Transistor Leaks Current!) -->
          <rect x="22" y="64" width="214" height="206" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.2"/>
          ${comparePill(32, 72, 194, false, '昔の平面トランジスタ')}
          <rect x="44" y="158" width="170" height="40" rx="3" fill="#475569"/>
          <rect x="92" y="138" width="74" height="20" rx="3" fill="#eab308" stroke="#854d0e"/>
          <text x="129" y="152" text-anchor="middle" font-size="9" font-weight="800" fill="#422006">上から1面だけ押す</text>
          <!-- Leaking Electrons Below Gate -->
          <path d="M 52 178 Q 129 194 206 178" fill="none" stroke="#ef4444" stroke-width="2.6" stroke-dasharray="4 3" marker-end="url(#${p}_arr_red)"/>
          <text x="129" y="174" text-anchor="middle" font-size="8.8" font-weight="800" fill="#fca5a5">OFFでも下から電流が漏れる!</text>
          <text x="129" y="224" text-anchor="middle" font-size="9.8" font-weight="800" fill="#991b1b">微細化すると蛇口が閉まらず</text>
          <text x="129" y="240" text-anchor="middle" font-size="9.8" font-weight="700" fill="#991b1b">待機中も電池消費＆猛発熱!</text>

          <!-- Right: GOOD (4nm 3D FinFET / GAA Nanosheet Wrapping All Around!) -->
          <rect x="248" y="64" width="290" height="206" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.6"/>
          ${comparePill(258, 72, 270, true, '4nm FinFET / GAA 立体ゲート構造')}

          <!-- 3D Perspective Diagram of Silicon Fin/Nanosheets Wrapped by HKMG Gate -->
          <!-- Silicon Base -->
          <polygon points="268,204 518,204 504,220 254,220" fill="#334155"/>
          <!-- Source (Left) & Drain (Right) Diamond Epitaxial SiGe -->
          <polygon points="274,174 304,154 334,174 304,194" fill="#94a3b8" stroke="#334155" stroke-width="1.4"/>
          <text x="304" y="178" text-anchor="middle" font-size="8.5" font-weight="800" fill="#0f172a">ソース</text>
          <polygon points="450,174 480,154 510,174 480,194" fill="#94a3b8" stroke="#334155" stroke-width="1.4"/>
          <text x="480" y="178" text-anchor="middle" font-size="8.5" font-weight="800" fill="#0f172a">ドレイン</text>

          <!-- 3 Stacked Horizontal Silicon Nanosheet Channels (Turquoise) -->
          ${[142, 162, 182]
            .map(
              (y) =>
                `<rect x="322" y="${y}" width="140" height="11" rx="3" fill="#0ea5e9" stroke="#0369a1" stroke-width="1.2"/>`
            )
            .join('')}

          <!-- High-k HfO2 + TiN Metal Gate Wrapping 360° Around Channels -->
          <rect x="364" y="122" width="56" height="84" rx="6" fill="url(#${p}_gold)" opacity="0.86" stroke="#854d0e" stroke-width="1.8"/>
          <text x="392" y="142" text-anchor="middle" font-size="9.5" font-weight="800" fill="#422006">HKMG</text>
          <text x="392" y="156" text-anchor="middle" font-size="8.4" font-weight="800" fill="#422006">立体ゲート</text>
          <text x="392" y="176" text-anchor="middle" font-size="8.2" font-weight="800" fill="#713f12">全周を包み</text>
          <text x="392" y="188" text-anchor="middle" font-size="8.2" font-weight="800" fill="#713f12">漏れゼロ!</text>

          <!-- Electron Flow Arrow Through Channel -->
          <line x1="316" y1="168" x2="462" y2="168" stroke="#ffffff" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#${p}_arr_blue)"/>
          ${stepBadge(392, 114, '1', '#ca8a04')}
          ${stepBadge(334, 146, '2', '#0284c7')}

          <text x="393" y="242" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0c4a6e">① 金属ゲート(HfO₂+TiN)が立体的に電子通路を完全制御</text>
          <text x="393" y="258" text-anchor="middle" font-size="9.4" font-weight="700" fill="#0369a1">② 4nm極微構造（髪の毛の2万分の1）で爆速＆超省エネ!</text>
        `,
      });

    // =========================================================================
    // XR27. BEOL 14-Layer Dual-Damascene Copper Interconnect Stack (M1–M14)
    // =========================================================================
    case 'xr_beol_cu_metals':
      return renderBionzDiagram({
        code: 'xr27',
        badge: 'XR27',
        accent: '#c2410c',
        accentSoft: '#fff7ed',
        accentDark: '#7c2d12',
        title: 'BEOL 14層 銅ダマシン微細配線スタック',
        metric: '14階建て 立体銅高速道路',
        analogyLine1: '数十億のトランジスタ同士を立体的に結ぶ「14階建ての超緻密・銅高速道路網」です。',
        analogyLine2: '下階は20nmの極細路地、上階は極太の電源ハイウェイという完璧な階層設計です。',
        chipHow: 'M1–M14 銅ダマシン＋ULK膜',
        chipBenefit: '高速信号遅延ゼロ＆電源安定',
        chipSpec: '14層Cu / TaNバリア / SiOC',
        art: (p) => `
          <!-- Left: 14-Floor Cross-Section Pyramid of Copper Wires (Bottom Fine -> Top Thick) -->
          <rect x="22" y="64" width="318" height="206" rx="8" fill="#0f172a" stroke="#475569" stroke-width="1.4"/>
          <text x="181" y="83" text-anchor="middle" font-size="10.8" font-weight="800" fill="#f8fafc">BEOL 断面図：下は極細路地 → 上は極太幹線</text>

          <!-- Top Thick Power Mesh (M13-M14 AP) -->
          <rect x="38" y="94" width="128" height="22" rx="3" fill="url(#${p}_gold)" stroke="#854d0e"/>
          <rect x="196" y="94" width="128" height="22" rx="3" fill="url(#${p}_gold)" stroke="#854d0e"/>
          <text x="102" y="109" text-anchor="middle" font-size="9" font-weight="800" fill="#422006">M14 極太電源メッシュ</text>
          <text x="260" y="109" text-anchor="middle" font-size="9" font-weight="800" fill="#422006">大電流＆クロック幹線</text>

          <!-- Upper Global Interconnect (M10-M12) -->
          ${[48, 128, 208, 276]
            .map((x) => `<rect x="${x}" y="130" width="46" height="14" rx="2" fill="url(#${p}_cu)"/>`)
            .join('')}
          <!-- Mid Semi-Global Interconnect (M5-M9) -->
          ${[42, 86, 130, 174, 218, 262, 300]
            .map((x) => `<rect x="${x}" y="158" width="26" height="10" rx="2" fill="#f59e0b"/>`)
            .join('')}
          <!-- Lower Local Interconnect (M1-M4 Fine 20nm) -->
          ${Array.from({ length: 14 })
            .map((_, i) => `<rect x="${42 + i * 20.5}" y="182" width="11" height="7" rx="1" fill="#fde047"/>`)
            .join('')}
          ${Array.from({ length: 14 })
            .map((_, i) => `<rect x="${46 + i * 20.5}" y="198" width="9" height="5" rx="1" fill="#38bdf8"/>`)
            .join('')}

          <!-- Vertical Copper Vias Linking Floors -->
          ${[72, 150, 230, 298]
            .map(
              (x) =>
                `<line x1="${x}" y1="116" x2="${x}" y2="198" stroke="#fb923c" stroke-width="2.6" stroke-dasharray="9 3"/>`
            )
            .join('')}

          <!-- Bottom FEOL Silicon Transistors -->
          <rect x="34" y="214" width="294" height="22" rx="3" fill="#0284c7"/>
          <text x="181" y="229" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">底面：FEOL 4nm トランジスタ層（XR26）</text>
          <text x="181" y="256" text-anchor="middle" font-size="9.5" font-weight="700" fill="#94a3b8">隙間は多孔質 SiOC 絶縁膜（ULK）で満たし信号ノイズ防止</text>

          <!-- Right: 3-Tier Explanatory Legend Cards -->
          <rect x="352" y="66" width="186" height="62" rx="7" fill="#fefce8" stroke="#ca8a04" stroke-width="1.3"/>
          <text x="364" y="84" font-size="10" font-weight="800" fill="#854d0e">① 上層（M10〜M14）</text>
          <text x="364" y="100" font-size="9" fill="#475569">太い銅幹線でチップ隅々まで</text>
          <text x="364" y="114" font-size="9" font-weight="700" fill="#92400e">電圧降下ゼロで大電流を配送</text>

          <rect x="352" y="136" width="186" height="62" rx="7" fill="#fff7ed" stroke="#ea580c" stroke-width="1.3"/>
          <text x="364" y="154" font-size="10" font-weight="800" fill="#9a3412">② 中層（M5〜M9）</text>
          <text x="364" y="170" font-size="9" fill="#475569">ISP・AI・動画など16区画を</text>
          <text x="364" y="184" font-size="9" font-weight="700" fill="#c2410c">立体交差ビアで最短連結</text>

          <rect x="352" y="206" width="186" height="62" rx="7" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.3"/>
          <text x="364" y="224" font-size="10" font-weight="800" fill="#0369a1">③ 下層（M1〜M4）</text>
          <text x="364" y="240" font-size="9" fill="#475569">幅わずか20nmの超極細銅線</text>
          <text x="364" y="254" font-size="9" font-weight="700" fill="#0c4a6e">TaN膜が銅のしみ出しを防止</text>
        `,
      });

    // =========================================================================
    // XR28. Secondary Image Processor Co-Processor Chiplet (CXD90058 "Cetus")
    // =========================================================================
    case 'xr_secondary_cetus_chiplet':
      return renderBionzDiagram({
        code: 'xr28',
        badge: 'XR28',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        accentDark: '#5b21b6',
        title: '副プロセッサ・チップレット CXD90058',
        metric: '通称 "Cetus" 4コア副頭脳',
        analogyLine1: '主頭脳“Mira”のすぐ隣で雑務と高速制御を引き受ける「頼れる相棒チップ」です。',
        analogyLine2: '2つの頭脳で役割分担することで、撮影レスポンスと多機能処理を両立します。',
        chipHow: 'Mira＋Cetus 2チップレット協調',
        chipBenefit: '操作サクサク＆高速連写応答',
        chipSpec: 'CXD90058 / 4×Cortex-A35',
        art: (p) => `
          <!-- Left: Main SoC CXD90057 "Mira" -->
          <rect x="24" y="72" width="194" height="190" rx="10" fill="url(#${p}_teal)" stroke="#0f766e" stroke-width="1.8"/>
          <text x="121" y="96" text-anchor="middle" font-size="11.5" font-weight="800" fill="#ffffff">主頭脳 CXD90057</text>
          <text x="121" y="112" text-anchor="middle" font-size="10" font-weight="700" fill="#fef08a">"Mira" メインダイ</text>
          <rect x="38" y="124" width="166" height="122" rx="6" fill="#0f172a" opacity="0.34"/>
          <text x="121" y="146" text-anchor="middle" font-size="9.8" font-weight="800" fill="#ffffff">超ヘビー計算に専念!</text>
          <text x="121" y="168" text-anchor="middle" font-size="9.4" fill="#ccfbf1">・33〜66MP RAW現像</text>
          <text x="121" y="186" text-anchor="middle" font-size="9.4" fill="#ccfbf1">・AI NPU 骨格/瞳認識</text>
          <text x="121" y="204" text-anchor="middle" font-size="9.4" fill="#ccfbf1">・8K/4K 動画HEVC圧縮</text>
          <text x="121" y="228" text-anchor="middle" font-size="9.2" font-weight="700" fill="#fef08a">重い処理を邪魔されない!</text>

          <!-- Center: Ultra-Short High-Speed D2D Interconnect Bridge -->
          <rect x="224" y="130" width="90" height="72" rx="6" fill="#ecfeff" stroke="#0891b2" stroke-width="1.5"/>
          ${[146, 158, 170, 182]
            .map(
              (y) =>
                `<line x1="218" y1="${y}" x2="320" y2="${y}" stroke="#06b6d4" stroke-width="2.2" marker-start="url(#${p}_arr_blue)" marker-end="url(#${p}_arr_blue)"/>`
            )
            .join('')}
          <text x="269" y="124" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0e7490">D2D 直結橋</text>
          <text x="269" y="218" text-anchor="middle" font-size="8.8" font-weight="700" fill="#155e75">22本超並列バス</text>

          <!-- Right: Companion Chiplet CXD90058 "Cetus" -->
          <rect x="320" y="72" width="216" height="190" rx="10" fill="url(#${p}_violet)" stroke="#4c1d95" stroke-width="1.8" filter="url(#${p}_shadow)"/>
          <text x="428" y="96" text-anchor="middle" font-size="11.5" font-weight="800" fill="#ffffff">副頭脳 CXD90058</text>
          <text x="428" y="112" text-anchor="middle" font-size="10" font-weight="700" fill="#fde047">"Cetus" チップレット</text>
          <!-- 4 Sculpted Cortex-A35 Cores Inside Cetus -->
          ${[0, 1, 2, 3]
            .map(
              (k) => `
                <rect x="${334 + (k % 2) * 96}" y="${124 + Math.floor(k / 2) * 44}" width="88" height="36" rx="5" fill="#ffffff" opacity="0.92"/>
                <text x="${378 + (k % 2) * 96}" y="${140 + Math.floor(k / 2) * 44}" text-anchor="middle" font-size="9.2" font-weight="800" fill="#4c1d95">A35 Core ${k}</text>
                <text x="${378 + (k % 2) * 96}" y="${153 + Math.floor(k / 2) * 44}" text-anchor="middle" font-size="8" fill="#6d28d9">L1キャッシュ付</text>
              `
            )
            .join('')}
          <rect x="334" y="216" width="188" height="36" rx="5" fill="#4c1d95"/>
          <text x="428" y="232" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fef08a">補助ISP・高速I/O・リアルタイム監視</text>
          <text x="428" y="245" text-anchor="middle" font-size="8.6" fill="#ede9fe">主頭脳の負担を肩代わりし応答性UP!</text>
          ${stepBadge(328, 80, '★', '#eab308')}
        `,
      });

    // =========================================================================
    // XR29. 2.5D Local Silicon Interconnect (LSI) Bridge & Fine Cu-RDL
    // =========================================================================
    case 'xr_silicon_bridge_lsi':
      return renderBionzDiagram({
        code: 'xr29',
        badge: 'XR29',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        accentDark: '#155e75',
        title: '2.5D 高密度シリコンブリッジ（LSI/RDL）',
        metric: '極細 2μm配線 / 6倍高密度',
        analogyLine1: '隣り合う2つのチップの足元に埋めた「超極細・シリコン製の専用高速橋」です。',
        analogyLine2: '普通の基板より6倍も細かい配線を数千本通せ、2つが1つの頭脳のように動きます。',
        chipHow: 'CoWoS-L / 埋込Si橋＋eDTC',
        chipBenefit: 'チップ間通信の超省電力＆爆速',
        chipSpec: '線幅/間隔 2/2μm Cu-RDL',
        art: (p) => `
          <!-- Cross-Section of 2.5D LSI Silicon Bridge Connecting Main Die & Cetus Chiplet -->
          <text x="280" y="72" text-anchor="middle" font-size="11.2" font-weight="800" fill="#155e75">横断面：基板の中に埋め込んだ「極細シリコン橋」</text>
          <!-- Left Die: Main BIONZ -->
          <rect x="40" y="86" width="188" height="44" rx="6" fill="url(#${p}_teal)" stroke="#0f766e" stroke-width="1.5"/>
          <text x="134" y="106" text-anchor="middle" font-size="10.8" font-weight="800" fill="#fff">メインダイ（Mira）</text>
          <text x="134" y="121" text-anchor="middle" font-size="8.8" fill="#ccfbf1">主画像処理エンジン</text>
          <!-- Right Die: Cetus Chiplet -->
          <rect x="332" y="86" width="188" height="44" rx="6" fill="url(#${p}_violet)" stroke="#4c1d95" stroke-width="1.5"/>
          <text x="426" y="106" text-anchor="middle" font-size="10.8" font-weight="800" fill="#fff">副チップレット（Cetus）</text>
          <text x="426" y="121" text-anchor="middle" font-size="8.8" fill="#ede9fe">コプロセッサ</text>

          <!-- Fine 35um Micro-Bumps Over Bridge + Coarser C4 Bumps Outside -->
          ${[68, 102, 136, 424, 458, 492]
            .map((x) => `<circle cx="${x}" cy="138" r="6" fill="url(#${p}_cu)"/>`)
            .join('')}
          ${[184, 196, 208, 220, 340, 352, 364, 376]
            .map((x) => `<circle cx="${x}" cy="136" r="3.4" fill="url(#${p}_gold)" stroke="#854d0e" stroke-width="0.7"/>`)
            .join('')}

          <!-- Organic ABF Substrate Hosting Embedded LSI Silicon Bridge -->
          <rect x="28" y="144" width="504" height="62" rx="6" fill="url(#${p}_pcb)" stroke="#14532d" stroke-width="1.4"/>
          <text x="96" y="180" text-anchor="middle" font-size="9.2" font-weight="700" fill="#dcfce7">有機ABF基板</text>
          <text x="464" y="180" text-anchor="middle" font-size="9.2" font-weight="700" fill="#dcfce7">（粗い配線 12μm）</text>

          <!-- Embedded LSI Silicon Bridge Die in Center -->
          <rect x="172" y="142" width="216" height="50" rx="5" fill="#0f172a" stroke="#38bdf8" stroke-width="2.2"/>
          ${[152, 160, 168, 176]
            .map((y) => `<line x1="184" y1="${y}" x2="376" y2="${y}" stroke="${y % 16 === 0 ? '#facc15' : '#38bdf8'}" stroke-width="2"/>`)
            .join('')}
          <text x="280" y="188" text-anchor="middle" font-size="9" font-weight="800" fill="#67e8f9">2.5D LSI シリコン橋（極細 2μm Cu-RDL）</text>
          ${stepBadge(178, 146, '1', '#0891b2')}
          ${stepBadge(280, 146, '2', '#ca8a04')}

          <!-- Bottom Line-Width Comparison & Benefits -->
          <rect x="28" y="214" width="248" height="58" rx="7" fill="#ecfeff" stroke="#06b6d4"/>
          <text x="152" y="232" text-anchor="middle" font-size="9.8" font-weight="800" fill="#155e75">① 配線密度が基板の約6倍!</text>
          <text x="152" y="248" text-anchor="middle" font-size="9" fill="#164e63">数千本の極細銅線を短い橋に束ね</text>
          <text x="152" y="262" text-anchor="middle" font-size="9" font-weight="700" fill="#0e7490">1ビット送信の消費電力を極小化</text>

          <rect x="284" y="214" width="248" height="58" rx="7" fill="#fffbeb" stroke="#f59e0b"/>
          <text x="408" y="232" text-anchor="middle" font-size="9.8" font-weight="800" fill="#92400e">② 大きな1枚ダイより低コスト＆高歩留</text>
          <text x="408" y="248" text-anchor="middle" font-size="9" fill="#78350f">高価な全面インターポーザを使わず</text>
          <text x="408" y="262" text-anchor="middle" font-size="9" font-weight="700" fill="#b45309">必要な連結部だけにSi橋＋eDTC埋込!</text>
        `,
      });

    // =========================================================================
    // XR30. Flip-Chip C4 Copper-Pillar Micro-Bump Array
    // =========================================================================
    case 'xr_c4_copper_bumps':
      return renderBionzDiagram({
        code: 'xr30',
        badge: 'XR30',
        accent: '#d97706',
        accentSoft: '#fff7ed',
        accentDark: '#9a3412',
        title: 'フリップチップ C4 銅ピラー・マイクロバンプ',
        metric: '約10,000+本 / 50μm間隔',
        analogyLine1: 'チップを裏返して底面全面に立てた「1万本以上の極小・銅の足」です。',
        analogyLine2: '古い外周ワイヤー方式より桁違いに多くの信号と大電流を最短距離で流せます。',
        chipHow: 'Cu柱＋IMC合金＋SnAg球',
        chipBenefit: '大電流供給＆高速信号の劣化防止',
        chipSpec: 'ピッチ50–110μm / 3ゾーン',
        art: (p) => `
          <!-- Left: Flip-Chip 3-Zone Overview -->
          <text x="172" y="72" text-anchor="middle" font-size="11" font-weight="800" fill="#9a3412">回路面を下にして直接つなぐフリップチップ</text>
          <!-- Silicon Die (Face Down!) -->
          <rect x="30" y="88" width="284" height="36" rx="5" fill="url(#${p}_teal)" stroke="#0f766e" stroke-width="1.4"/>
          <text x="172" y="106" text-anchor="middle" font-size="10.5" font-weight="800" fill="#fff">BIONZ XR ダイ（回路面を下向き実装）</text>
          <text x="172" y="119" text-anchor="middle" font-size="8.6" fill="#ccfbf1">全面から電気・信号・熱を一気に下へ流す</text>

          <!-- Array of Copper Pillars + SnAg Caps -->
          ${Array.from({ length: 11 })
            .map((_, i) => {
              const x = 48 + i * 24.8;
              return `
                <rect x="${x - 5}" y="124" width="10" height="4" fill="url(#${p}_gold)"/>
                <rect x="${x - 4.5}" y="128" width="9" height="22" fill="url(#${p}_cu)"/>
                <circle cx="${x}" cy="156" r="6" fill="url(#${p}_solder)" stroke="#475569" stroke-width="0.9"/>
                <rect x="${x - 6}" y="162" width="12" height="4" fill="url(#${p}_gold)"/>
              `;
            })
            .join('')}

          <!-- ABF Substrate Below -->
          <rect x="30" y="166" width="284" height="26" rx="4" fill="url(#${p}_pcb)"/>
          <text x="172" y="183" text-anchor="middle" font-size="10" font-weight="700" fill="#dcfce7">ABF ビルドアップ基板トップ電極</text>

          <!-- Highlight Circle to Loupe -->
          <circle cx="296" cy="144" r="14" fill="none" stroke="#d97706" stroke-width="1.8" stroke-dasharray="3 2"/>
          <line x1="310" y1="144" x2="362" y2="144" stroke="#d97706" stroke-width="1.6" stroke-dasharray="4 3"/>

          <!-- 3 Roles Box -->
          <rect x="28" y="202" width="288" height="68" rx="7" fill="#fff7ed" stroke="#fdba74"/>
          <text x="172" y="219" text-anchor="middle" font-size="10" font-weight="800" fill="#9a3412">1万本の銅の足が担う3つの仕事</text>
          <text x="40" y="236" font-size="9.2" font-weight="700" fill="#7c2d12">① 信号：SLVS/DDRの超高速データを最短伝送</text>
          <text x="40" y="250" font-size="9.2" font-weight="700" fill="#7c2d12">② 電源：AI全開時の大電流を低抵抗で供給</text>
          <text x="40" y="264" font-size="9.2" font-weight="700" fill="#7c2d12">③ 放熱：ダイ下面からも基板側へ熱を逃がす</text>

          <!-- Right: Microscope Loupe of Single C4 Pillar 5-Layer Metallurgy -->
          <clipPath id="${p}_loupe"><circle cx="436" cy="166" r="68"/></clipPath>
          <circle cx="436" cy="166" r="68" fill="#f8fafc"/>
          <g clip-path="url(#${p}_loupe)">
            <rect x="366" y="96" width="140" height="16" fill="url(#${p}_si)"/>
            <!-- UBM -->
            <rect x="402" y="112" width="68" height="9" fill="url(#${p}_gold)"/>
            <text x="436" y="119.5" text-anchor="middle" font-size="7.6" font-weight="800" fill="#422006">Ti/Cu UBM下地</text>
            <!-- Cu Pillar -->
            <rect x="408" y="121" width="56" height="44" fill="url(#${p}_cu)"/>
            <text x="436" y="142" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">純銅ピラー</text>
            <text x="436" y="155" text-anchor="middle" font-size="8.4" fill="#ffedd5">潰れず高密度!</text>
            <!-- Cu6Sn5 IMC -->
            <rect x="408" y="165" width="56" height="9" fill="#94a3b8"/>
            <text x="436" y="172.5" text-anchor="middle" font-size="7.4" font-weight="800" fill="#0f172a">Cu₆Sn₅合金層</text>
            <!-- SnAg Dome -->
            <ellipse cx="436" cy="192" rx="30" ry="18" fill="url(#${p}_solder)" stroke="#475569" stroke-width="1.2"/>
            <text x="436" y="195" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f172a">SnAgはんだ</text>
            <!-- Substrate Pad -->
            <rect x="366" y="208" width="140" height="28" fill="url(#${p}_pcb)"/>
            <rect x="404" y="206" width="64" height="6" fill="url(#${p}_gold)"/>
          </g>
          ${loupeRing(436, 166, 68, '拡大：1本のC4銅柱', '#d97706')}
          <text x="436" y="254" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9a3412">丸はんだ球だけより横に広がらず</text>
          <text x="436" y="269" text-anchor="middle" font-size="9.4" fill="#7c2d12">50μmの超極小ピッチを実現!</text>
        `,
      });

    // =========================================================================
    // XR31. Capillary Underfill (CUF) Silica-Filled Epoxy Layer
    // =========================================================================
    case 'xr_capillary_underfill':
      return renderBionzDiagram({
        code: 'xr31',
        badge: 'XR31',
        accent: '#e11d48',
        accentSoft: '#fff1f2',
        accentDark: '#9f1239',
        title: '毛細管アンダーフィル（CUF保護樹脂）',
        metric: '熱疲労寿命 約10倍UP!',
        analogyLine1: '1万本の極小ハンダの足のすき間へ染み込んで固める「超強力・耐震クッション糊」です。',
        analogyLine2: '撮影の熱と冷えを繰り返しても、足元がねじ切れないよう丸ごと一体化します。',
        chipHow: '毛細管浸透＋65%シリカ樹脂',
        chipBenefit: '長年の寒暖差でも断線ゼロ',
        chipSpec: '隙間30μm浸透 / 側面フィレット',
        art: (p) => `
          <!-- Left: BAD (No Underfill -> Thermal Mismatch Snaps Corner Bumps!) -->
          <rect x="22" y="64" width="228" height="206" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.2"/>
          ${comparePill(32, 72, 208, false, 'アンダーフィルなしの場合')}
          <rect x="48" y="110" width="176" height="26" rx="4" fill="url(#${p}_teal)"/>
          <text x="136" y="127" text-anchor="middle" font-size="9.6" font-weight="800" fill="#fff">Siダイ（あまり伸びない 3ppm）</text>
          <!-- Sheared / Cracked C4 Bumps -->
          ${[66, 94, 122, 150, 178, 206]
            .map((x, idx) => {
              const broken = idx === 0 || idx === 5;
              return `<circle cx="${x}" cy="150" r="6" fill="${broken ? '#ef4444' : '#d97706'}"/>${broken ? `<path d="M ${x - 7} 145 L ${x + 7} 155" stroke="#ffffff" stroke-width="2.2"/>` : ''}`;
            })
            .join('')}
          <rect x="34" y="160" width="204" height="24" rx="4" fill="url(#${p}_pcb)"/>
          <text x="136" y="176" text-anchor="middle" font-size="9.2" font-weight="700" fill="#dcfce7">基板（熱で大きく伸びる 17ppm）</text>
          <!-- Expansion Mismatch Arrows -->
          <line x1="72" y1="194" x2="38" y2="194" stroke="#dc2626" stroke-width="2.2" marker-end="url(#${p}_arr_red)"/>
          <line x1="200" y1="194" x2="234" y2="194" stroke="#dc2626" stroke-width="2.2" marker-end="url(#${p}_arr_red)"/>
          <text x="136" y="198" text-anchor="middle" font-size="8.8" font-weight="800" fill="#dc2626">伸び差でねじ切れ!</text>
          <text x="136" y="224" text-anchor="middle" font-size="9.8" font-weight="800" fill="#991b1b">撮影ON/OFFの熱伸縮が</text>
          <text x="136" y="240" text-anchor="middle" font-size="9.8" font-weight="700" fill="#991b1b">細いハンダに集中し破断!</text>

          <!-- Right: GOOD (Capillary Underfill Injection + Hardened Meniscus Fillet) -->
          <rect x="262" y="64" width="276" height="206" rx="8" fill="#fff1f2" stroke="#e11d48" stroke-width="1.5"/>
          ${comparePill(272, 72, 256, true, '毛細管アンダーフィル(CUF)充填')}
          <!-- Dispense Needle on Left Edge -->
          <polygon points="274,100 286,100 296,134 288,136" fill="#64748b" stroke="#0f172a"/>
          <text x="284" y="96" text-anchor="middle" font-size="8.6" font-weight="800" fill="#9f1239">ノズル注入</text>
          <!-- Sloped Concave Meniscus Fillet + Under-Die Epoxy Cushion -->
          <path d="M 284 166 Q 302 154 310 116 L 494 116 Q 502 154 520 166 Z" fill="#f43f5e" opacity="0.34" stroke="#e11d48" stroke-width="1.6"/>
          <!-- Silicon Die -->
          <rect x="310" y="110" width="184" height="26" rx="4" fill="url(#${p}_teal)"/>
          <text x="402" y="127" text-anchor="middle" font-size="9.8" font-weight="800" fill="#fff">BIONZ XR ダイ</text>
          <!-- Protected C4 Bumps + Capillary Flow Arrow -->
          ${[328, 356, 384, 412, 440, 468]
            .map((x) => `<circle cx="${x}" cy="150" r="6" fill="url(#${p}_cu)" stroke="#ffffff" stroke-width="1"/>`)
            .join('')}
          <line x1="298" y1="150" x2="500" y2="150" stroke="#e11d48" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#${p}_arr_red)"/>
          <!-- ABF Substrate -->
          <rect x="276" y="166" width="252" height="24" rx="4" fill="url(#${p}_pcb)"/>
          <text x="402" y="182" text-anchor="middle" font-size="9.5" font-weight="700" fill="#dcfce7">ABF 基板（全面で応力を均一分散!）</text>
          ${stepBadge(294, 146, '1', '#e11d48')}
          ${stepBadge(508, 150, '2', '#be123c')}
          <text x="400" y="212" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">① ストローの毛細管現象で隙間へ自然浸透</text>
          <text x="400" y="229" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">② 側面の緩やかなフィレットが端の欠け防止</text>
          <text x="400" y="248" text-anchor="middle" font-size="9.5" font-weight="700" fill="#15803d">65wt%シリカ硬化で接続信頼性 10倍以上!</text>
        `,
      });

    default:
      return null;
  }
}
