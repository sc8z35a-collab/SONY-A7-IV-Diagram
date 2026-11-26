import { PartExplanation } from '../../assemblies/types';
import { pill, shutterFrame } from './shared';

/**
 * Phase 34 Ultra-Detailed Shutter Technical Schematics — Group B (SH96–SH113, 18 schematics).
 */
export function renderShutterHdGroupB(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    case 'shutter_bronze_bearings':
      return shutterFrame({
        code: 'SH96',
        title: '含油焼結青銅ブッシュ＆PTFEスラスト座金',
        viewTag: '自己給油',
        accent: '#b45309',
        headerBg: '#fffbeb',
        body: `
          <!-- Porous sintered bronze oil circulation -->
          <rect x="16" y="32" width="166" height="110" rx="5" fill="#fffbeb" stroke="#fcd34d"/>
          <rect x="26" y="54" width="146" height="18" fill="#d97706" opacity="0.75" stroke="#92400e"/>
          ${[38, 56, 74, 92, 110, 128, 146, 160]
            .map((cx) => `<circle cx="${cx}" cy="63" r="2.2" fill="#fef3c7"/>`)
            .join('')}
          <!-- Oil film wedge -->
          <rect x="26" y="72" width="146" height="7" fill="#38bdf8" opacity="0.7"/>
          <rect x="26" y="79" width="146" height="22" fill="#94a3b8" stroke="#475569"/>
          <text x="99" y="48" text-anchor="middle" font-size="6.8" font-weight="700" fill="#92400e">焼結青銅（気孔率 20% 含油）</text>
          <text x="99" y="93" text-anchor="middle" font-size="7" font-weight="700" fill="#0f172a">高速回転ギア軸 (SUS304)</text>
          <text x="99" y="118" text-anchor="middle" font-size="6.6" fill="#0284c7" font-weight="700">回転時: 毛管滲出 → 停止時: 再吸収</text>
          <text x="99" y="131" text-anchor="middle" font-size="6.5" fill="#475569">余分な油が外へ飛び散らない!</text>
          <!-- Right summary -->
          <rect x="190" y="32" width="156" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="268" y="48" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">オイライト軸受の利点</text>
          ${pill(268, 68, 136, 17, '50万回 メンテナンスフリー', '#fef3c7', '#d97706', '#92400e', 6.8)}
          ${pill(268, 92, 136, 17, 'PTFEスラスト座金で軸ガタ静音', '#e0f2fe', '#0284c7', '#0369a1', 6.6)}
          ${pill(268, 116, 136, 17, '撮像面クリーン・油飛散ゼロ', '#dcfce7', '#16a34a', '#166534', 6.8)}
        `,
        caption: '多孔質焼結青銅のミクロ気孔が油を出し入れ循環させ、無飛散で50万回チャージを支える',
      });

    case 'shutter_cam_roller':
      return shutterFrame({
        code: 'SH97',
        title: '偏心チャージカム低摩擦カムフォロアローラ',
        viewTag: '転がり接触',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- Cam pushing rolling follower -->
          <rect x="16" y="32" width="180" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <ellipse cx="74" cy="96" rx="34" ry="24" transform="rotate(-22 74 96)" fill="#475569" stroke="#1e293b"/>
          <circle cx="64" cy="100" r="6" fill="#cbd5e1"/>
          <!-- Rolling needle follower -->
          <circle cx="116" cy="70" r="15" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>
          <circle cx="116" cy="70" r="7" fill="#e2e8f0" stroke="#334155"/>
          <rect x="116" y="64" width="66" height="12" rx="4" fill="#64748b"/>
          <circle cx="174" cy="70" r="4" fill="#eab308"/>
          <path d="M52,70 A26,26 0 0,1 86,62" fill="none" stroke="#2563eb" stroke-width="1.6" marker-end="url(#a-SH97-blue)"/>
          <text x="104" y="133" text-anchor="middle" font-size="6.7" fill="#334155">青銅外輪＋ニードル転がり接触</text>
          <!-- Friction bar comparison -->
          <rect x="204" y="32" width="142" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="275" y="48" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">摩擦損失比較 (μ)</text>
          <text x="214" y="68" font-size="6.6" fill="#b91c1c">すべり接触</text>
          <rect x="214" y="72" width="114" height="12" rx="2" fill="#fca5a5" stroke="#dc2626"/>
          <text x="271" y="81" text-anchor="middle" font-size="6.6" font-weight="700" fill="#7f1d1d">μ_s ≈ 0.20</text>
          <text x="214" y="100" font-size="6.6" fill="#15803d" font-weight="700">転がりローラ</text>
          <rect x="214" y="104" width="24" height="12" rx="2" fill="#86efac" stroke="#16a34a"/>
          <text x="276" y="113" font-size="6.8" font-weight="700" fill="#15803d">μ_r ≈ 0.015 (約1/10!)</text>
          <text x="275" y="134" text-anchor="middle" font-size="6.6" fill="#0284c7" font-weight="700">チャージ電流 約30%削減</text>
        `,
        caption: '高荷重カム接触を「すべり」から「転がり」へ変換し、チャージ電流約30%削減と静音化を実現',
      });

    case 'shutter_datum_dowels':
      return shutterFrame({
        code: 'SH98',
        title: 'H7公差 基準ノックピン（丸ピン＋ダイヤピン）',
        viewTag: '精密位置決め',
        accent: '#475569',
        headerBg: '#f1f5f9',
        body: `
          <!-- Two-datum kinematic locating schematic -->
          <rect x="16" y="32" width="328" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="34" y="50" width="292" height="58" rx="6" fill="#ffffff" stroke="#64748b" stroke-width="1.4"/>
          <!-- Left: Round primary pin (X, Y) -->
          <circle cx="88" cy="79" r="16" fill="#dbeafe" stroke="#2563eb" stroke-width="1.6"/>
          <circle cx="88" cy="79" r="12" fill="#94a3b8" stroke="#1e293b"/>
          <text x="88" y="45" text-anchor="middle" font-size="7" font-weight="700" fill="#1d4ed8">① 主基準：丸ピン (X, Y 拘束)</text>
          <!-- Right: Diamond secondary pin (Theta only) -->
          <circle cx="272" cy="79" r="16" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
          <polygon points="272,65 280,79 272,93 264,79" fill="#94a3b8" stroke="#1e293b"/>
          <line x1="252" y1="79" x2="292" y2="79" stroke="#d97706" stroke-width="1.2" stroke-dasharray="2 2"/>
          <text x="272" y="45" text-anchor="middle" font-size="7" font-weight="700" fill="#b45309">② 副基準：ダイヤピン (θ のみ拘束)</text>
          <!-- Baseline distance arrow -->
          <line x1="106" y1="79" x2="254" y2="79" stroke="#059669" stroke-width="1.4" marker-start="url(#a-SH98-green)" marker-end="url(#a-SH98-green)"/>
          ${pill(180, 79, 98, 16, 'L ≈ 48mm → Δθ < 0.05°', '#dcfce7', '#16a34a', '#166534', 6.8)}
          <text x="180" y="128" text-anchor="middle" font-size="6.9" fill="#334155">熱膨張でも過拘束歪みゼロ・EFCS画素行と機械幕の完全平行を保証</text>
        `,
        caption: '丸ピン＋ダイヤピンの2点H7基準により、熱膨張歪みを逃がしつつ角度誤差±0.05°以内で固定',
      });

    case 'shutter_interlock_sw':
      return shutterFrame({
        code: 'SH99',
        title: '露光完了インターロック安全接点スイッチ',
        viewTag: 'フェイルセーフ',
        accent: '#ca8a04',
        headerBg: '#fefce8',
        body: `
          <!-- Dual verification AND logic + bifurcated leaf switch -->
          <rect x="16" y="34" width="152" height="106" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="24" y="64" width="38" height="44" rx="3" fill="#334155"/>
          <line x1="62" y1="76" x2="144" y2="78" stroke="#eab308" stroke-width="2.4"/>
          <line x1="62" y1="96" x2="144" y2="88" stroke="#d97706" stroke-width="2.4"/>
          <circle cx="136" cy="83" r="4.5" fill="#facc15" stroke="#854d0e"/>
          <line x1="116" y1="46" x2="116" y2="70" stroke="#dc2626" stroke-width="2" marker-end="url(#a-SH99-red)"/>
          <text x="116" y="42" text-anchor="middle" font-size="6.7" font-weight="700" fill="#dc2626">後幕完了カム</text>
          <text x="92" y="128" text-anchor="middle" font-size="6.7" fill="#334155">金めっき二股リーフ接点</text>
          <!-- Right: Dual safety AND gate -->
          <rect x="176" y="34" width="170" height="106" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="261" y="48" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">二重安全チャージ許可ロジック</text>
          ${pill(226, 68, 86, 16, '光学PI: 完了検知', '#e0f2fe', '#0284c7', '#0369a1', 6.5)}
          ${pill(226, 94, 86, 16, '機械SW: 閉路検知', '#fef3c7', '#d97706', '#92400e', 6.5)}
          <line x1="270" y1="68" x2="292" y2="80" stroke="#475569" stroke-width="1.3"/>
          <line x1="270" y1="94" x2="292" y2="82" stroke="#475569" stroke-width="1.3"/>
          <rect x="292" y="70" width="44" height="22" rx="4" fill="#16a34a"/>
          <text x="314" y="84" text-anchor="middle" font-size="7.2" font-weight="800" fill="#fff">AND</text>
          <text x="261" y="120" text-anchor="middle" font-size="6.7" fill="#15803d" font-weight="700">両方一致でチャージ許可</text>
          <text x="261" y="132" text-anchor="middle" font-size="6.5" fill="#dc2626">異常時は即停止→羽根衝突を防止</text>
        `,
        caption: '光学PIと金接点リーフスイッチの二重AND監視により、電磁石異常時の誤チャージ破壊を防止',
      });

    case 'shutter_coax_brake':
      return shutterFrame({
        code: 'SH100',
        title: '同軸8点積層「トルク調整フリクションブレーキ」',
        viewTag: '特許断面',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- Coaxial 8-part stack along shaft 1f (JP2010-008647A) -->
          <rect x="14" y="30" width="332" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Central shaft 1f -->
          <rect x="26" y="79" width="304" height="10" fill="#64748b"/>
          <!-- 4: Brake lever -->
          <rect x="42" y="54" width="16" height="60" rx="2" fill="#1e293b"/>
          <!-- 5: Friction ring -->
          <rect x="64" y="60" width="12" height="48" rx="2" fill="#475569"/>
          <!-- 7: Washer -->
          <rect x="82" y="62" width="8" height="44" fill="#94a3b8"/>
          <!-- 6: Sleeve + 9: Inner spring + 10: Outer spring -->
          <rect x="98" y="68" width="96" height="32" fill="#d97706" opacity="0.35" stroke="#b45309"/>
          <path d="M104,76 L114,92 L124,76 L134,92 L144,76 L154,92 L164,76 L174,92 L184,76" fill="none" stroke="#334155" stroke-width="1.5"/>
          <path d="M102,56 Q116,48 130,56 T158,56 T186,56" fill="none" stroke="#d97706" stroke-width="2.2"/>
          <path d="M102,112 Q116,120 130,112 T158,112 T186,112" fill="none" stroke="#d97706" stroke-width="2.2"/>
          <!-- 8: Leaf spring -->
          <path d="M204,58 Q214,84 204,110" fill="none" stroke="#eab308" stroke-width="3.2"/>
          <!-- 11: Calibration Hex Nut -->
          <rect x="224" y="64" width="22" height="40" rx="3" fill="#eab308" stroke="#854d0e"/>
          <!-- Labels -->
          <text x="50" y="46" text-anchor="middle" font-size="6.4" font-weight="700" fill="#0f172a">④レバー</text>
          <text x="72" y="122" text-anchor="middle" font-size="6.4" font-weight="700" fill="#334155">⑤摩擦環</text>
          <text x="142" y="44" text-anchor="middle" font-size="6.3" font-weight="700" fill="#b45309">⑩外戻しばね・⑥スリーブ・⑨内ばね</text>
          <text x="205" y="122" text-anchor="middle" font-size="6.4" font-weight="700" fill="#a16207">⑧板ばね</text>
          <text x="236" y="48" text-anchor="middle" font-size="6.4" font-weight="700" fill="#854d0e">⑪調整ナット</text>
          ${pill(296, 84, 78, 34, 'JP2010-008647A', '#fef3c7', '#d97706', '#92400e', 6.4)}
          <text x="180" y="137" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">½mv² の運動エネルギーを摩擦熱へ穏やかに変換＆ナットで制動力を校正</text>
        `,
        caption: '同軸8部品の加圧ディスクブレーキが3,000 G幕の衝撃を吸収し羽根破断とバウンドを防止',
      });

    case 'shutter_ortho_buffer':
      return shutterFrame({
        code: 'SH101',
        title: '面外直交たわみ式ギャップ支持緩衝部材',
        viewTag: '特許機構',
        accent: '#0d9488',
        headerBg: '#f0fdfa',
        body: `
          <!-- Left: Gap-mounted elastomer bending out of plane -->
          <rect x="16" y="32" width="184" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="34" y="96" width="146" height="14" fill="#475569"/>
          <!-- Pillar boss -->
          <rect x="52" y="54" width="16" height="42" fill="#94a3b8" stroke="#334155"/>
          <!-- Gap-mounted buffer flexing orthogonally upward (Z) -->
          <path d="M44,86 C44,64 76,64 76,86 L150,74 C162,72 162,90 150,92 L76,92 Z" fill="#14b8a6" opacity="0.72" stroke="#0f766e" stroke-width="1.5"/>
          <!-- Intentional radial gap arrow -->
          <text x="60" y="48" text-anchor="middle" font-size="6.6" font-weight="700" fill="#dc2626">意図的ギャップ!</text>
          <!-- Impact arrow (horizontal) -> Orthogonal Z flex arrow -->
          <line x1="184" y1="83" x2="162" y2="83" stroke="#dc2626" stroke-width="2" marker-end="url(#a-SH101-red)"/>
          <line x1="120" y1="78" x2="120" y2="54" stroke="#0d9488" stroke-width="2" marker-end="url(#a-SH101-cyan)"/>
          <text x="120" y="48" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0f766e">Z方向へ直交たわみ</text>
          <text x="108" y="132" text-anchor="middle" font-size="6.6" fill="#334155">JP2016-218101A（緩衝部材73）</text>
          <!-- Right physics -->
          <rect x="208" y="32" width="138" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="277" y="48" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">反発激減のメカニズム</text>
          <text x="277" y="66" text-anchor="middle" font-size="6.7" fill="#dc2626">通常圧縮: 跳ね返り大</text>
          <text x="277" y="82" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0f766e">面外せん断: 高ヒステリシス</text>
          ${pill(277, 106, 120, 18, '反発係数 e < 0.15 達成', '#ccfbf1', '#0d9488', '#115e59', 6.8)}
          <text x="277" y="131" text-anchor="middle" font-size="6.5" fill="#475569">95%以上を1撃で熱散逸</text>
        `,
        caption: '支柱との意図的ギャップにより衝撃をZ方向たわみへ逃がし、跳ね返り係数0.15未満を達成',
      });

    case 'shutter_dual_duro':
      return shutterFrame({
        code: 'SH102',
        title: '二層硬度（Shore 35A＋75A）衝撃ストッパー',
        viewTag: '非線形制動',
        accent: '#db2777',
        headerBg: '#fdf2f8',
        body: `
          <!-- Left: 2-layer cushion stack -->
          <rect x="16" y="32" width="152" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <line x1="92" y1="40" x2="92" y2="56" stroke="#dc2626" stroke-width="2" marker-end="url(#a-SH102-red)"/>
          <text x="92" y="38" text-anchor="middle" font-size="6.5" fill="#dc2626" font-weight="700">幕衝突</text>
          <!-- Micro ribs + Shore 35A soft layer -->
          ${[42, 58, 74, 90, 106, 122, 138]
            .map((x) => `<circle cx="${x}" cy="64" r="4" fill="#f472b6"/>`)
            .join('')}
          <rect x="34" y="64" width="116" height="18" rx="3" fill="#f9a8d4" stroke="#db2777"/>
          <text x="92" y="76" text-anchor="middle" font-size="6.8" font-weight="700" fill="#831843">表層 Shore 35A（軟質）</text>
          <!-- Shore 75A firm core -->
          <rect x="34" y="84" width="116" height="24" rx="2" fill="#475569" stroke="#1e293b"/>
          <text x="92" y="99" text-anchor="middle" font-size="6.8" font-weight="700" fill="#ffffff">内層 Shore 75A（硬質芯）</text>
          <rect x="28" y="108" width="128" height="12" fill="#1e293b"/>
          <text x="92" y="134" text-anchor="middle" font-size="6.6" fill="#475569">二色一体成形ストッパー</text>
          <!-- Right: Progressive force-displacement curve -->
          <rect x="176" y="32" width="170" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="261" y="46" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">プログレッシブ剛性 F(x)=k₁x+k₃x³</text>
          <line x1="194" y1="120" x2="334" y2="120" stroke="#94a3b8"/>
          <line x1="194" y1="54" x2="194" y2="120" stroke="#94a3b8"/>
          <path d="M194,120 Q256,118 282,92 T324,56" fill="none" stroke="#db2777" stroke-width="2.4"/>
          <text x="234" y="108" font-size="6.5" fill="#db2777" font-weight="700">① 静音ソフト接触</text>
          <text x="268" y="68" font-size="6.5" fill="#1e293b" font-weight="700">② 0.3mmで確実停止</text>
          <text x="264" y="135" text-anchor="middle" font-size="6.6" fill="#059669" font-weight="700">高周波音ピーク 6–9 dB カット</text>
        `,
        caption: '軟質Shore 35A表層で高周波打音を消し、硬質Shore 75A芯で0.3 mm内にピタッと停止',
      });

    case 'shutter_3em_softstop':
      return shutterFrame({
        code: 'SH103',
        title: '3電磁石アクティブ減速ソフトストップ',
        viewTag: '次世代制動',
        accent: '#c2410c',
        headerBg: '#fff7ed',
        body: `
          <!-- Velocity vs position curve showing active EM braking zone -->
          <rect x="16" y="30" width="212" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <line x1="32" y1="124" x2="216" y2="124" stroke="#94a3b8"/>
          <line x1="32" y1="42" x2="32" y2="124" stroke="#94a3b8"/>
          <!-- Active braking zone highlight -->
          <rect x="156" y="42" width="52" height="82" fill="#ffedd5"/>
          <!-- Without EM brake (hard hit) -->
          <path d="M34,122 Q86,52 156,50 L206,50 L208,124" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2"/>
          <!-- With 3-EM soft-stop -->
          <path d="M34,122 Q86,52 156,50 Q186,62 206,96 L208,124" fill="none" stroke="#c2410c" stroke-width="2.4"/>
          <text x="94" y="48" text-anchor="middle" font-size="6.7" fill="#334155">露光区間 (24 mm 等速)</text>
          <text x="182" y="54" text-anchor="middle" font-size="6.5" font-weight="700" fill="#c2410c">逆磁力</text>
          <text x="182" y="64" text-anchor="middle" font-size="6.5" font-weight="700" fill="#c2410c">ブレーキ</text>
          <text x="124" y="137" text-anchor="middle" font-size="6.6" fill="#475569">幕位置 y →（終端 2–3mm で速度半減!）</text>
          <!-- Right impact energy card -->
          <rect x="236" y="30" width="110" height="114" rx="5" fill="#fff7ed" stroke="#fdba74"/>
          <text x="291" y="46" text-anchor="middle" font-size="7" font-weight="700" fill="#9a3412">JP2022-039332A</text>
          <text x="291" y="66" text-anchor="middle" font-size="7" fill="#334155">着地速度 0.5× で</text>
          <text x="291" y="84" text-anchor="middle" font-size="9.5" font-weight="800" fill="#c2410c">衝撃 −75%!</text>
          <text x="291" y="98" text-anchor="middle" font-size="6.5" fill="#475569">E = ½mv² → ¼E₀</text>
          ${pill(291, 122, 96, 16, '高画素微ブレ抑止', '#ffedd5', '#ea580c', '#9a3412', 6.7)}
        `,
        caption: '開口通過直後の終端2–3 mmで第3電磁石が逆制動を掛け、衝突エネルギーを最大75%削減',
      });

    case 'shutter_float_cradle':
      return shutterFrame({
        code: 'SH104',
        title: 'スプリング付勢フローティング免震クレードル',
        viewTag: '免震構造',
        accent: '#475569',
        headerBg: '#f1f5f9',
        body: `
          <!-- Floating cradle suspended by 3 springs + 2 dampers -->
          <rect x="16" y="30" width="194" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Outer body frame -->
          <rect x="26" y="38" width="174" height="98" rx="6" fill="none" stroke="#334155" stroke-width="2" stroke-dasharray="4 2"/>
          <!-- Floating cradle 120 -->
          <rect x="52" y="54" width="122" height="66" rx="5" fill="#e2e8f0" stroke="#475569" stroke-width="1.6"/>
          <rect x="74" y="68" width="78" height="38" rx="2" fill="#ffffff" stroke="#94a3b8"/>
          <text x="113" y="90" text-anchor="middle" font-size="7" font-weight="700" fill="#0f172a">保持部材 120</text>
          <!-- 3 urging springs 402a-c -->
          <path d="M68,38 L68,54 M158,38 L158,54 M113,120 L113,136" stroke="#d97706" stroke-width="3" stroke-dasharray="2 2"/>
          <!-- 2 side dampers 404a-b -->
          <rect x="34" y="74" width="16" height="26" rx="3" fill="#0d9488"/>
          <rect x="176" y="74" width="16" height="26" rx="3" fill="#0d9488"/>
          <text x="113" y="49" text-anchor="middle" font-size="6.4" fill="#b45309" font-weight="700">3点付勢ばね 402a–c</text>
          <!-- Right transmissibility -->
          <rect x="218" y="30" width="128" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="282" y="46" text-anchor="middle" font-size="7" font-weight="700" fill="#0f172a">振動伝達遮断特性</text>
          <text x="282" y="64" text-anchor="middle" font-size="6.7" fill="#0d9488" font-weight="700">側方せん断ダンパ 404</text>
          <text x="282" y="80" text-anchor="middle" font-size="6.7" fill="#334155">固有共振 f_n ≈ 100 Hz</text>
          <text x="282" y="94" text-anchor="middle" font-size="6.7" fill="#dc2626">衝撃帯域 1–4 kHz</text>
          ${pill(282, 118, 112, 18, 'IBISジャイロ干渉ゼロ', '#dcfce7', '#16a34a', '#166534', 6.7)}
        `,
        caption: '3点スプリングと側方ダンパーでユニット全体を浮かせ、ボディ・IBISへの衝撃伝達を遮断',
      });

    case 'shutter_rebound_latch':
      return shutterFrame({
        code: 'SH105',
        title: '幕端バウンド防止ワンウェイキャッチフック',
        viewTag: '逆止機構',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- One-way ratchet hook catching arm at end of stroke -->
          <rect x="16" y="32" width="194" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Moving arm arriving -->
          <rect x="28" y="54" width="60" height="16" rx="3" fill="#2563eb"/>
          <text x="58" y="65" text-anchor="middle" font-size="6.8" font-weight="700" fill="#fff">駆動アーム</text>
          <line x1="90" y1="62" x2="122" y2="62" stroke="#2563eb" stroke-width="1.8" marker-end="url(#a-SH105-blue)"/>
          <!-- Ratchet catch hook -->
          <path d="M128,84 L128,50 L150,64 L138,68 L138,98 L178,98 L178,112 L128,112 Z" fill="#475569" stroke="#0f172a"/>
          <circle cx="168" cy="105" r="4.5" fill="#eab308"/>
          <path d="M128,118 Q152,126 176,118" fill="none" stroke="#d97706" stroke-width="2"/>
          <text x="152" y="134" text-anchor="middle" font-size="6.6" fill="#b45309" font-weight="700">BeCu 戻し板ばね</text>
          <!-- Rebound blocked X -->
          <text x="154" y="48" font-size="7" font-weight="800" fill="#dc2626">← 逆行不可!</text>
          <!-- Right effect card -->
          <rect x="218" y="32" width="128" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="282" y="48" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">バウンドカブリ根絶</text>
          <text x="282" y="68" text-anchor="middle" font-size="6.7" fill="#334155">終端通過で自動ロック</text>
          <text x="282" y="84" text-anchor="middle" font-size="7.5" font-weight="800" fill="#059669">跳ね返り &lt; 0.05 mm</text>
          <text x="282" y="102" text-anchor="middle" font-size="6.6" fill="#475569">次チャージ初期に</text>
          <text x="282" y="112" text-anchor="middle" font-size="6.6" fill="#475569">カムで無抵抗解除</text>
          ${pill(282, 130, 110, 14, '1/8000s 画面端ムラ0', '#fef3c7', '#d97706', '#92400e', 6.5)}
        `,
        caption: '終端到達したアームを一方向フックで即座に捕捉し、跳ね返りによる画面端二重露光を根絶',
      });

    case 'shutter_viscous_damper':
      return shutterFrame({
        code: 'SH106',
        title: 'シリコーン油ロータリ流体ダンパーカプセル',
        viewTag: '流体減衰',
        accent: '#0891b2',
        headerBg: '#ecfeff',
        body: `
          <!-- Cutaway 4-vane fluid rotor -->
          <rect x="16" y="32" width="154" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <circle cx="93" cy="86" r="40" fill="#1e293b"/>
          <circle cx="93" cy="86" r="34" fill="#a5f3fc" stroke="#0891b2" stroke-width="1.5"/>
          <circle cx="93" cy="86" r="10" fill="#64748b" stroke="#0f172a"/>
          ${[0, 90, 180, 270]
            .map(
              (deg) =>
                `<rect x="90" y="54" width="6" height="24" rx="1" fill="#d97706" transform="rotate(${deg} 93 86)"/>`
            )
            .join('')}
          <text x="93" y="137" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0e7490">高粘度シリコーン油＋4枚ベーン</text>
          <!-- Velocity-proportional damping graph -->
          <rect x="178" y="32" width="168" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="262" y="46" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">速度比例粘性トルク τ = c·ω</text>
          <line x1="196" y1="112" x2="332" y2="112" stroke="#94a3b8"/>
          <line x1="196" y1="54" x2="196" y2="112" stroke="#94a3b8"/>
          <line x1="196" y1="112" x2="322" y2="60" stroke="#0891b2" stroke-width="2.4"/>
          <text x="266" y="76" font-size="6.7" fill="#0e7490" font-weight="700">高速→強ブレーキ</text>
          <text x="206" y="105" font-size="6.5" fill="#059669" font-weight="700">停止直前→無衝撃着地</text>
          ${pill(262, 129, 146, 15, 'Viton Oリング完全密封・静音モード', '#cffafe', '#0891b2', '#155e75', 6.5)}
        `,
        caption: 'シリコーン油のせん断粘性抵抗（τ = c·ω）が金属打音を出さずに滑らかな静音制動を実現',
      });

    case 'shutter_passive_barrier':
      return shutterFrame({
        code: 'SH107',
        title: 'レンズ着脱連動・無電力メカニカル防塵リンク',
        viewTag: '無電力機構',
        accent: '#64748b',
        headerBg: '#f8fafc',
        body: `
          <!-- Flow: Lens twist 60 deg -> Bayonet cam ring -> Bell crank -> Dust barrier closes -->
          <rect x="14" y="34" width="332" height="106" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="24" y="54" width="76" height="54" rx="5" fill="#eff6ff" stroke="#2563eb"/>
          <text x="62" y="73" text-anchor="middle" font-size="7.2" font-weight="700" fill="#1d4ed8">レンズ取外し</text>
          <text x="62" y="86" text-anchor="middle" font-size="7" fill="#1e40af">約 60° 回転</text>
          <text x="62" y="99" text-anchor="middle" font-size="6.4" fill="#475569">手の回転トルク</text>

          <line x1="100" y1="81" x2="122" y2="81" stroke="#2563eb" stroke-width="1.8" marker-end="url(#a-SH107-blue)"/>

          <rect x="124" y="54" width="90" height="54" rx="5" fill="#fef3c7" stroke="#d97706"/>
          <text x="169" y="73" text-anchor="middle" font-size="7.2" font-weight="700" fill="#92400e">円弧カムリング</text>
          <text x="169" y="86" text-anchor="middle" font-size="7" fill="#b45309">＋ベルクランク</text>
          <text x="169" y="99" text-anchor="middle" font-size="6.4" fill="#78350f">JP2019-234718A</text>

          <line x1="214" y1="81" x2="236" y2="81" stroke="#d97706" stroke-width="1.8" marker-end="url(#a-SH107-amber)"/>

          <rect x="238" y="54" width="98" height="54" rx="5" fill="#dcfce7" stroke="#16a34a"/>
          <text x="287" y="73" text-anchor="middle" font-size="7.2" font-weight="700" fill="#166534">防塵バリア自動閉鎖</text>
          <text x="287" y="87" text-anchor="middle" font-size="7.8" font-weight="800" fill="#15803d">消費電力 0 mW!</text>
          <text x="287" y="99" text-anchor="middle" font-size="6.3" fill="#166534">電池空でも100%防護</text>

          <text x="180" y="128" text-anchor="middle" font-size="6.8" fill="#334155">レンズ再装着で機械的に自動退避（撮影ラグ＆待機電力ゼロ）</text>
        `,
        caption: 'レンズ着脱の回転トルクをそのまま保護幕開閉に伝え、バッテリー残量ゼロでもセンサーを防護',
      });

    case 'shutter_acoustic_liner':
      return shutterFrame({
        code: 'SH108',
        title: '駆動室3層音響減衰フォーム＆拘束制振ライナー',
        viewTag: '音響設計',
        accent: '#334155',
        headerBg: '#f1f5f9',
        body: `
          <!-- 3-layer CLD + anechoic pyramid cutaway -->
          <rect x="16" y="32" width="176" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="28" y="114" width="152" height="10" fill="#94a3b8" stroke="#334155"/>
          <text x="104" y="122" text-anchor="middle" font-size="6.2" font-weight="700" fill="#0f172a">① アルミ箔拘束層 (CLD)</text>
          <rect x="28" y="98" width="152" height="16" fill="#334155"/>
          <text x="104" y="109" text-anchor="middle" font-size="6.5" fill="#f8fafc">② ブチル粘弾性制振層</text>
          <rect x="28" y="80" width="152" height="18" fill="#64748b"/>
          <polygon points="32,80 46,60 60,80 74,60 88,80 102,60 116,80 130,60 144,80 158,60 172,80" fill="#1e293b"/>
          <text x="104" y="52" text-anchor="middle" font-size="6.8" font-weight="700" fill="#dc2626">③ マイクロ多孔吸音フォーム（4–10kHz吸収）</text>
          <!-- Right acoustic spectrum -->
          <rect x="200" y="32" width="146" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="273" y="46" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">シャッター音スペクトル改善</text>
          <line x1="212" y1="114" x2="336" y2="114" stroke="#94a3b8"/>
          <!-- Raw harsh peak -->
          <path d="M214,108 Q242,74 274,60 T330,94" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2"/>
          <!-- Damped pleasant sound -->
          <path d="M214,108 Q242,84 274,94 T330,110" fill="none" stroke="#059669" stroke-width="2.2"/>
          <text x="292" y="64" font-size="6.4" fill="#64748b">無対策(金属音)</text>
          <text x="292" y="86" font-size="6.6" fill="#059669" font-weight="700">−5 dBA 調律</text>
          ${pill(273, 130, 128, 14, '低く締まった高級シャッター音', '#dcfce7', '#16a34a', '#166534', 6.5)}
        `,
        caption: 'アルミ拘束制振＋ブチル層＋多孔フォームの3層構造が金属反響を吸い、音質を高級機らしく調律',
      });

    case 'shutter_unconn_stator':
      return shutterFrame({
        code: 'SH109',
        title: '独立2巻線・非接続ステータ電磁アクチュエータ',
        viewTag: '特許磁気回路',
        accent: '#ea580c',
        headerBg: '#fff7ed',
        body: `
          <!-- Laminated H-stator with 2 electrically isolated coils -->
          <rect x="16" y="32" width="194" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- H-core laminated -->
          <path d="M48,46 L176,46 L176,66 L124,66 L124,104 L176,104 L176,124 L48,124 L48,104 L100,104 L100,66 L48,66 Z" fill="#64748b" stroke="#334155"/>
          <!-- Coil 1 (upper) -->
          <rect x="74" y="42" width="76" height="28" rx="4" fill="#ea580c" stroke="#9a3412"/>
          <text x="112" y="59" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">第1コイル (独立回路A)</text>
          <!-- Coil 2 (lower) -->
          <rect x="74" y="100" width="76" height="28" rx="4" fill="#2563eb" stroke="#1e40af"/>
          <text x="112" y="117" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">第2コイル (独立回路B)</text>
          <text x="112" y="88" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0f172a">完全非接続・5層積層コア</text>
          <!-- Right panel -->
          <rect x="218" y="32" width="128" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="282" y="47" text-anchor="middle" font-size="7.1" font-weight="700" fill="#0f172a">JP2015-111219A</text>
          <text x="282" y="65" text-anchor="middle" font-size="6.7" fill="#ea580c" font-weight="700">逆起電力の回り込みゼロ</text>
          <text x="282" y="81" text-anchor="middle" font-size="6.6" fill="#334155">薄板5層積層で</text>
          <text x="282" y="93" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0284c7">渦電流損 P ∝ t² を激減</text>
          ${pill(282, 120, 114, 18, '露出バラツキ極小化', '#ffedd5', '#ea580c', '#9a3412', 6.8)}
        `,
        caption: '積層ステータに電気的絶縁された独立2コイルを巻き、逆起電力干渉と渦電流遅延を同時抑止',
      });

    case 'shutter_demag_mosfet':
      return shutterFrame({
        code: 'SH110',
        title: '磁束キャンセル＆逆通電消磁(デマグ)MOSFET段',
        viewTag: '波形・磁気',
        accent: '#16a34a',
        headerBg: '#f0fdf4',
        body: `
          <!-- Current & Flux decay comparison waveform -->
          <rect x="16" y="30" width="206" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <line x1="32" y1="96" x2="212" y2="96" stroke="#94a3b8"/>
          <line x1="32" y1="42" x2="32" y2="132" stroke="#94a3b8"/>
          <!-- Normal decay with residual magnetism tail -->
          <path d="M36,56 L104,56 Q128,88 202,90" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="3 2"/>
          <text x="164" y="84" font-size="6.4" fill="#64748b">残留磁気 B_r (遅延)</text>
          <!-- Active reverse-demag pulse -> instant zero -->
          <path d="M36,56 L104,56 L104,124 L124,124 L124,96 L204,96" fill="none" stroke="#16a34a" stroke-width="2.4"/>
          <text x="70" y="51" text-anchor="middle" font-size="6.6" font-weight="700" fill="#15803d">保持通電</text>
          <text x="118" y="137" text-anchor="middle" font-size="6.6" font-weight="700" fill="#dc2626">逆消磁パルス (数μs)</text>
          <!-- Right summary -->
          <rect x="230" y="30" width="116" height="114" rx="5" fill="#f0fdf4" stroke="#86efac"/>
          <text x="288" y="46" text-anchor="middle" font-size="7.1" font-weight="700" fill="#166534">TDK 磁束キャンセル</text>
          <text x="288" y="64" text-anchor="middle" font-size="6.6" fill="#334155">Φ_PM − Φ_coil → 0</text>
          <text x="288" y="79" text-anchor="middle" font-size="6.6" fill="#334155">B-Hヒステリシスを</text>
          <text x="288" y="90" text-anchor="middle" font-size="6.6" fill="#334155">強制的に原点へ戻す</text>
          ${pill(288, 118, 102, 18, '離脱ジッタ < ±3 μs', '#dcfce7', '#16a34a', '#166534', 6.8)}
        `,
        caption: 'OFF直後に数µsの逆励磁パルスを打って残留磁気を瞬時消去し、離脱ジッタ±3 µs以内を達成',
      });

    case 'shutter_armature_seat':
      return shutterFrame({
        code: 'SH111',
        title: '鉄片円錐セルフ調心座＆マイクロCリング',
        viewTag: '精密断面',
        accent: '#64748b',
        headerBg: '#f8fafc',
        body: `
          <!-- Gimbaled armature aligning flush against yoke poles -->
          <rect x="16" y="32" width="190" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Yoke face -->
          <rect x="26" y="48" width="24" height="76" rx="2" fill="#475569"/>
          <text x="38" y="88" text-anchor="middle" font-size="6.5" fill="#fff" font-weight="700">ヨーク</text>
          <!-- Pure iron armature flat against yoke -->
          <rect x="53" y="54" width="14" height="64" rx="2" fill="#94a3b8" stroke="#1e293b"/>
          <!-- Conical seat + Si3N4 gimbal ball + stem + flange + C-ring -->
          <polygon points="67,72 90,64 90,108 67,100" fill="#eab308" stroke="#854d0e"/>
          <circle cx="96" cy="86" r="9" fill="#1e293b"/>
          <rect x="67" y="82" width="102" height="8" fill="#cbd5e1" stroke="#475569"/>
          <rect x="128" y="68" width="10" height="36" rx="2" fill="#64748b"/>
          <rect x="156" y="72" width="6" height="28" fill="#dc2626"/>
          <!-- Self-align tilt arrows -->
          <path d="M58,44 Q68,48 76,54" fill="none" stroke="#2563eb" stroke-width="1.5" marker-start="url(#a-SH111-blue)" marker-end="url(#a-SH111-blue)"/>
          <text x="116" y="47" font-size="6.6" fill="#1d4ed8" font-weight="700">±1.5° 自動首振り密着</text>
          <text x="158" y="114" text-anchor="middle" font-size="6.3" fill="#dc2626" font-weight="700">Cリング</text>
          <text x="132" y="118" text-anchor="middle" font-size="6.2" fill="#334155">規制鍔</text>
          <!-- Right formula -->
          <rect x="214" y="32" width="132" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="280" y="48" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">吸着力とギャップ法則</text>
          <text x="280" y="68" text-anchor="middle" font-size="7.8" font-weight="800" fill="#2563eb">F ∝ 1 / g²</text>
          <text x="280" y="86" text-anchor="middle" font-size="6.6" fill="#334155">わずか0.3°の片当たりで</text>
          <text x="280" y="97" text-anchor="middle" font-size="6.6" fill="#dc2626">吸着力半減→幕落ち事故</text>
          ${pill(280, 122, 118, 17, '全面密着 g < 0.5 μm 保証', '#dcfce7', '#16a34a', '#166534', 6.6)}
        `,
        caption: '円錐座＋セラミック球面ジンバルが毎回自動首振り密着し、0.5 µm以下の高信頼吸着を維持',
      });

    case 'shutter_ntc_thermistor':
      return shutterFrame({
        code: 'SH112',
        title: '極寒 −10°C 補償用・駆動室NTCサーミスタ',
        viewTag: '温度補償',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- NTC curve + Cold-weather compensation flow -->
          <rect x="16" y="30" width="166" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="99" y="44" text-anchor="middle" font-size="7" font-weight="700" fill="#0369a1">NTC抵抗 R(T) vs 温度 T</text>
          <line x1="32" y1="122" x2="168" y2="122" stroke="#94a3b8"/>
          <line x1="32" y1="50" x2="32" y2="122" stroke="#94a3b8"/>
          <path d="M40,56 Q68,104 162,118" fill="none" stroke="#0284c7" stroke-width="2.4"/>
          <circle cx="48" cy="68" r="3.5" fill="#2563eb"/>
          <text x="72" y="68" font-size="6.6" font-weight="700" fill="#1d4ed8">−10 °C (高抵抗)</text>
          <circle cx="136" cy="113" r="3.5" fill="#dc2626"/>
          <text x="132" y="106" text-anchor="middle" font-size="6.4" fill="#dc2626">+45 °C</text>
          <text x="100" y="136" text-anchor="middle" font-size="6.5" fill="#475569">±0.3 °C リアルタイム温度検知</text>
          <!-- Right feed-forward compensation -->
          <rect x="190" y="30" width="156" height="114" rx="5" fill="#f0f9ff" stroke="#7dd3fc"/>
          <text x="268" y="46" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">1枚目からの先読み補正</text>
          ${pill(268, 66, 136, 16, '① 低温グリース粘性増を予測', '#e0f2fe', '#0284c7', '#0369a1', 6.5)}
          ${pill(268, 88, 136, 16, '② 銅コイル抵抗 ±20% 補正', '#fef3c7', '#d97706', '#92400e', 6.5)}
          ${pill(268, 110, 136, 16, '③ 連写ソレノイド過熱監視', '#fee2e2', '#dc2626', '#991b1b', 6.5)}
          <text x="268" y="135" text-anchor="middle" font-size="6.6" font-weight="700" fill="#059669">雪山1発目から適正露出!</text>
        `,
        caption: '駆動室直近のNTCサーミスタが低温粘性増と銅コイル抵抗変動を撮影前に先読み補正',
      });

    case 'shutter_ir_comparator':
      return shutterFrame({
        code: 'SH113',
        title: '940 nm 赤外PI波形整形シュミットコンパレータ',
        viewTag: '信号処理',
        accent: '#059669',
        headerBg: '#ecfdf5',
        body: `
          <!-- Left: Noisy slow analog phototransistor wave -->
          <rect x="14" y="32" width="144" height="110" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="86" y="45" text-anchor="middle" font-size="7" font-weight="700" fill="#b91c1c">入力：なまった光電流＋ノイズ</text>
          <line x1="24" y1="74" x2="148" y2="74" stroke="#2563eb" stroke-width="1" stroke-dasharray="3 2"/>
          <line x1="24" y1="96" x2="148" y2="96" stroke="#d97706" stroke-width="1" stroke-dasharray="3 2"/>
          <text x="134" y="71" font-size="6.2" fill="#1d4ed8">V_TH+</text>
          <text x="134" y="104" font-size="6.2" fill="#b45309">V_TH−</text>
          <path d="M24,116 L44,114 L52,102 L58,107 L66,86 L72,91 L82,66 L90,71 L104,58 L146,58" fill="none" stroke="#dc2626" stroke-width="1.8"/>
          <text x="86" y="134" text-anchor="middle" font-size="6.5" fill="#991b1b">単純比較では誤チャタリング!</text>
          <!-- Arrow -->
          <line x1="160" y1="86" x2="184" y2="86" stroke="#059669" stroke-width="2" marker-end="url(#a-SH113-green)"/>
          <!-- Right: Crisp Schmitt digital edge -->
          <rect x="188" y="32" width="158" height="110" rx="5" fill="#f0fdf4" stroke="#86efac"/>
          <text x="267" y="45" text-anchor="middle" font-size="7" font-weight="700" fill="#15803d">出力：10 ns 超急峻デジタル矩形波</text>
          <path d="M200,114 L256,114 L256,58 L334,58" fill="none" stroke="#059669" stroke-width="2.5"/>
          <circle cx="256" cy="86" r="4" fill="#059669"/>
          ${pill(267, 130, 140, 15, 'ヒステリシス窓 ΔV で誤検知ゼロ', '#dcfce7', '#16a34a', '#166534', 6.5)}
        `,
        caption: 'ヒステリシス幅を持つシュミットコンパレータがノイズを弾き、10 ns精度のエッジを生成',
      });

    default:
      return null;
  }
}
