import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 25C Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (32 diagrams):
 *   - Internal Stereo / 3-Capsule MEMS & ECM Microphone Ultra-Dissection (MC01–MC32)
 */
export function renderPhase25MicSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    case 'mc_deadcat_windscreen':
      return wrapSvg(`
        <path d="M14 34 Q28 24 40 34 M14 48 Q28 38 40 48" fill="none" stroke="#dc2626" stroke-width="2"/>
        <text x="27" y="22" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#b91c1c">強風乱流</text>
        <path d="M44 68 Q74 16 106 68 Z" fill="#cbd5e1" stroke="#475569" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="75" y="54" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0f172a">モフモフ毛</text>
        <path d="M75 68 V82" stroke="#0284c7" stroke-width="2.2"/>
        <text x="75" y="90" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">声だけ透過!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MC01 防風ウインドスクリーン</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・数万本の人工ファーが強風渦を細かく砕く</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・風切り音−15〜25dB低減(音割れ前防止)</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・人の声の音波は損失1dB未満でクリア透過</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">強風のボボボ音だけをモフモフの毛でそよ風へ分解し、人間の声だけ優しく通す防風コート</text>
      `);

    case 'mc_top_grille_holes':
      return wrapSvg(`
        <rect x="18" y="24" width="100" height="44" rx="5" fill="#334155" stroke="#0f172a"/>
        ${[-26, 26].flatMap((ox) => [-7, 0, 7].flatMap((dx) => [-7, 0, 7].map((dz) => `<circle cx="${68 + ox + dx}" cy="${46 + dz}" r="2.2" fill="#0f172a"/>`))).join('')}
        <text x="42" y="80" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0284c7">左 L ポート</text>
        <text x="94" y="80" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#d97706">右 R ポート</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MC02 天面左右ステレオグリル孔</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・左右に離れたL/R微細孔で立体音場を収録</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・φ0.6〜0.8mm穴で表面張力による小雨防御</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・穴縁の面取りで横風の笛鳴り共鳴を抑制</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">カメラの屋根に空いた「左右の耳の穴」。小さな穴の集合で音は通しゴミと水しぶきを防ぐ</text>
      `);

    case 'mc_stainless_micro_mesh':
      return wrapSvg(`
        <rect x="24" y="20" width="88" height="54" rx="4" fill="#f1f5f9" stroke="#475569" stroke-width="1.6"/>
        ${[36, 48, 60, 72, 84, 96].map((x) => `<line x1="${x}" y1="22" x2="${x}" y2="72" stroke="#64748b" stroke-width="1.2"/>`).join('')}
        ${[30, 42, 54, 66].map((y) => `<line x1="26" y1="${y}" x2="110" y2="${y}" stroke="#64748b" stroke-width="1.2"/>`).join('')}
        <circle cx="48" cy="20" r="3" fill="#b45309"/>
        <text x="68" y="86" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#334155">50μm砂塵阻止＋音響ダンピング</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MC03 極細ステンレス音響メッシュ</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・SUS316超極細金網が砂粒・虫をブロック</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・適度な音響抵抗でキンキン響く共鳴を平坦化</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・下のePTFE薄膜の破れ＆静電気侵入を防御</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">グリル裏の超極細茶こし網がゴミを止めつつ、音の通り道を素直で聞きやすい響きへ整える</text>
      `);

    case 'mc_eptfe_waterproof_membrane':
      return wrapSvg(`
        <circle cx="42" cy="24" r="9" fill="#38bdf8" stroke="#0284c7"/>
        <text x="42" y="27" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">水滴</text>
        <path d="M42 33 L42 42 L30 36" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <rect x="18" y="44" width="100" height="12" rx="2" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>
        <text x="68" y="53" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#0f172a">撥水 ePTFE 膜 (0.5μm孔)</text>
        <path d="M88 20 Q96 32 88 44 Q80 58 88 76" fill="none" stroke="#10b981" stroke-width="2.4"/>
        <text x="98" y="72" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#047857">音は透過!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0369a1">MC04 撥水多孔質ePTFE防水膜</text>
        <text x="142" y="43" font-size="7.0" fill="#0c4a6e">・ゴアテックスと同じ撥水角＞120°フッ素膜</text>
        <text x="142" y="56" font-size="7.0" fill="#0c4a6e">・0.2〜1μm極微孔で雨粒を表面張力で完全遮断</text>
        <text x="142" y="69" font-size="7.0" fill="#0c4a6e">・30μm超薄膜が軽やかに振動し音損失＜1.5dB</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">水は1滴も通さず音の振動だけスッと通す、高級レインウェアと同じ原理の白い魔法の膜</text>
      `);

    case 'mc_acoustic_drain_labyrinth':
      return wrapSvg(`
        <path d="M24 20 V68 H44 V42 H98 V74" fill="none" stroke="#475569" stroke-width="12" stroke-linejoin="round"/>
        <path d="M24 18 V44 H94 V72" fill="none" stroke="#10b981" stroke-width="2.2"/>
        <circle cx="24" cy="64" r="5" fill="#0284c7"/>
        <text x="36" y="84" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">水は溝へ落下</text>
        <text x="96" y="86" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#047857">音は90°曲がる!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#ecfeff" stroke="#0284c7"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0369a1">MC05 オフセット音響迷路＆排水溝</text>
        <text x="142" y="43" font-size="7.0" fill="#0c4a6e">・音の波長は長いため90°クランクを回折透過</text>
        <text x="142" y="56" font-size="7.0" fill="#0c4a6e">・直進する水滴・ゴミだけ深さ＞1mm溝へ回収</text>
        <text x="142" y="69" font-size="7.0" fill="#0c4a6e">・防水特許IL239134A準拠の刺突＆突風対策</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">「音は角を曲がれるが水滴は曲がれない」物理の違いで雨やゴミだけを溝へ落とす賢い迷路</text>
      `);

    case 'mc_helmholtz_front_chamber':
      return wrapSvg(`
        <path d="M54 20 V38 H28 V68 H108 V38 H82 V20" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
        <path d="M68 14 V54" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="68" y="58" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#1d4ed8">前室 V 最小化</text>
        <text x="68" y="82" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#1e40af">1〜8 kHz 人の声クッキリ!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#1e40af">MC06 ヘルムホルツ前室共鳴室</text>
        <text x="142" y="43" font-size="7.0" fill="#1e3a8a">・前室体積を極限最小化し共鳴を16kHz超へ</text>
        <text x="142" y="56" font-size="7.0" fill="#1e3a8a">・缶詰のような不自然なこもり音を完全解消</text>
        <text x="142" y="69" font-size="7.0" fill="#1e3a8a">・左右対称容積でステレオ音色と位相を一致</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#1e40af">空き瓶の共鳴と同じ物理を計算して小部屋の大きさを調整し、人の声を明瞭に録る</text>
      `);

    case 'mc_silicone_acoustic_gasket':
      return wrapSvg(`
        <rect x="24" y="18" width="88" height="14" rx="2" fill="#475569"/>
        <rect x="44" y="32" width="12" height="24" rx="3" fill="#f43f5e"/>
        <rect x="80" y="32" width="12" height="24" rx="3" fill="#f43f5e"/>
        <path d="M68 24 V66" stroke="#10b981" stroke-width="2.4"/>
        <path d="M24 44 H42 M112 44 H94" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 2"/>
        <rect x="34" y="56" width="68" height="16" rx="2" fill="#0ea5e9"/>
        <text x="68" y="67" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">マイク音孔</text>
        <text x="68" y="85" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#be123c">内部モーター音の横漏れ遮断!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff1f2" stroke="#f43f5e"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#9f1239">MC07 音響カップリングゴム筒</text>
        <text x="142" y="43" font-size="7.0" fill="#881337">・天面ポートとマイク音孔を100%気密連結</text>
        <text x="142" y="56" font-size="7.0" fill="#881337">・カメラ内IBIS・AF駆動音の侵入を20dB遮断</text>
        <text x="142" y="69" font-size="7.0" fill="#881337">・低音逃げ(音響ショート)＆タッチ音防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9f1239">外の声だけをマイクへ案内し、カメラ内部の機械音が横から漏れるのを防ぐゴムの気密トンネル</text>
      `);

    case 'mc_oem_rubber_boot':
      return wrapSvg(`
        <rect x="24" y="20" width="88" height="52" rx="10" fill="#334155" stroke="#0f172a" stroke-width="2"/>
        <rect x="42" y="32" width="52" height="28" rx="4" fill="#0ea5e9"/>
        <text x="68" y="49" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#fff">マイク宙吊り</text>
        <path d="M12 46 H22 M114 46 H124" stroke="#dc2626" stroke-width="2" stroke-dasharray="2 2"/>
        <text x="68" y="84" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#334155">純正502687801 防振ブーツ</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MC08 純正防振ブーツ(Ref.304)</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・純正502687801 RUBBER (885) 防振靴下</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・金属ボディと非接触のミニショックマウント</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・レンズAF・ダイヤル操作の固体伝搬音吸収</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">マイクをふかふかの純正ゴム靴下で包み、ボディのコツン音やモーター振動から宙に浮かせる</text>
      `);

    case 'mc_oem_mic_holder':
      return wrapSvg(`
        <path d="M20 56 V26 H34 V46 H102 V26 H116 V56 H76 V68 H60 V56 Z" fill="#1e293b" stroke="#0f172a"/>
        <rect x="38" y="28" width="24" height="16" rx="3" fill="#0ea5e9"/>
        <rect x="74" y="28" width="24" height="16" rx="3" fill="#eab308"/>
        <text x="68" y="82" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0f172a">左右カプセルを規定圧で保持</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MC09 純正ホルダー(Ref.308)</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・純正502790401 MIC HOLDER (89100)</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・防振ブーツを背後から適正圧縮量で支持</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・左右位置決め精度UP＋ケーブル断線防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">ゴムに包んだマイクを後ろから優しく抱え、音の入り口へピタッと押し当て続けるゆりかご枠</text>
      `);

    case 'mc_oem_btite_screw':
      return wrapSvg(`
        <rect x="46" y="56" width="44" height="10" rx="3" fill="#cbd5e1" stroke="#475569"/>
        <rect x="60" y="20" width="16" height="36" rx="2" fill="#94a3b8" stroke="#334155"/>
        ${[25, 32, 39, 46, 52].map((y) => `<line x1="58" y1="${y}" x2="78" y2="${y - 2}" stroke="#1e293b" stroke-width="1.5"/>`).join('')}
        <text x="68" y="82" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#334155">BTITE 1.4 × 5.0 mm</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MC10 純正Bタイトネジ(Ref.309)</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・純正430010611 樹脂ボス専用タッピン</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・樹脂を割らず振動で緩まない鋭角ネジ山</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・マイクホルダーの圧縮圧を何年も維持</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">何十万回のシャッター振動でも緩まずマイクの気密圧を守り続ける直径1.4mmの純正精密ネジ</text>
      `);

    case 'mc_oem_631s_sealing_tape':
      return wrapSvg(`
        <rect x="18" y="34" width="100" height="24" rx="2" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
        <text x="68" y="49" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#f8fafc">631S #25 黒遮音テープ</text>
        <text x="68" y="74" text-anchor="middle" font-size="6.2" fill="#334155">厚さわずか 25 μm (幅 7 mm)</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MC11 純正631S黒テープ(Ref.306)</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・純正750000493 極薄25μm高耐熱テープ</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・フレキのカタカタ振動ノイズを密着固定</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・背面の音漏れ・EVF光漏れ・絶縁を一括対策</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">サービスマニュアルでミリ単位指定されるプロ用黒テープが、配線のビビり音と音漏れを封じる</text>
      `);

    case 'mc_chassis_vib_absorber':
      return wrapSvg(`
        <rect x="18" y="26" width="100" height="38" rx="4" fill="#64748b" stroke="#334155"/>
        ${[28, 44, 60, 76, 92, 106].map((x) => `<circle cx="${x}" cy="40" r="3" fill="#94a3b8"/><circle cx="${x - 4}" cy="52" r="2.5" fill="#cbd5e1"/>`).join('')}
        <text x="68" y="80" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#334155">微細気泡で衝撃80%を熱へ吸収</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MC12 Poron系防振吸音フォーム</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・マイクロセル・ウレタン高減衰クッション</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・ボディ内で跳ね返る中高音ノイズを吸音</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・長期間へたらない低圧縮永久歪み素材</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">防音スタジオの壁のようにカメラ内の不要な反響音と衝撃を吸い込む高機能ミニスポンジ</text>
      `);

    case 'mc_mems_faraday_lid':
      return wrapSvg(`
        <path d="M22 68 V24 H56 M80 24 H114 V68 Z" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
        <path d="M68 12 V32" stroke="#0284c7" stroke-width="2.2"/>
        <text x="68" y="50" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#0f172a">3.5×2.6mm</text>
        <text x="68" y="61" text-anchor="middle" font-size="5.8" fill="#334155">金属シールド蓋</text>
        <path d="M16 36 Q10 42 16 48" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <text x="68" y="82" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#dc2626">Wi-Fi/5G電波を60dB遮断!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MC13 MEMS金属ファラデー蓋</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・左ch: 輪切りシリコンMEMSの最外殻</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・360°GND接地で電波ノイズを完全遮蔽</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・260℃リフロー実装耐性＆高精度均一品質</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">米粒大の金属ドームが外部の電波を弾き返し、中央の小さな音孔から声だけを招き入れる</text>
      `);

    case 'mc_mems_si_diaphragm':
      return wrapSvg(`
        <path d="M18 46 Q28 38 38 46 Q68 28 98 46 Q108 38 118 46" fill="none" stroke="#0ea5e9" stroke-width="3"/>
        <path d="M18 46 Q28 54 38 46 Q68 64 98 46 Q108 54 118 46" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3 2"/>
        <text x="68" y="24" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0369a1">厚さ 0.8 μm シリコン鼓膜!</text>
        <text x="68" y="78" text-anchor="middle" font-size="6.2" fill="#0c4a6e">1nmの揺れを静電容量で検出</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0369a1">MC14 0.8μmポリシリコン振動膜</text>
        <text x="142" y="43" font-size="7.0" fill="#0c4a6e">・ラップの1/10以下の超軽量半導体鼓膜</text>
        <text x="142" y="56" font-size="7.0" fill="#0c4a6e">・波型コルゲート溝で130dB爆音でも無歪み</text>
        <text x="142" y="69" font-size="7.0" fill="#0c4a6e">・超軽量ゆえカメラ操作振動ノイズに激強</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">半導体工場で作る極薄シリコンの人工鼓膜が、ささやき声のそよ風でナノメートル単位で震える</text>
      `);

    case 'mc_mems_antistiction_gap':
      return wrapSvg(`
        <rect x="20" y="24" width="96" height="8" rx="2" fill="#0ea5e9"/>
        <text x="68" y="20" text-anchor="middle" font-size="6.0" fill="#0369a1">振動膜</text>
        ${[32, 50, 68, 86, 104].map((x) => `<circle cx="${x}" cy="50" r="3" fill="#1e293b"/>`).join('')}
        <rect x="20" y="52" width="96" height="12" rx="2" fill="#eab308"/>
        <text x="68" y="61" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#1e293b">固定バックプレート</text>
        <text x="68" y="80" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0f172a">2μm隙間＋Si₃N₄張り付き防止突起</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0f9ff" stroke="#38bdf8"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0369a1">MC15 2μm隙間＆固着防止突起</text>
        <text x="142" y="43" font-size="7.0" fill="#0c4a6e">・髪の毛1/40の極狭隙間で超高感度コンデンサ</text>
        <text x="142" y="56" font-size="7.0" fill="#0c4a6e">・絶縁マイクロ点々突起で張り付き故障ゼロ</text>
        <text x="142" y="69" font-size="7.0" fill="#0c4a6e">・ライブ爆音130dBでも瞬時に跳ね返り復帰</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">濡れガラス同士の張り付きを防ぐ小さな点々突起が、2μmの極狭ギャップを高感度と安全へ導く</text>
      `);

    case 'mc_mems_perforated_backplate':
      return wrapSvg(`
        <rect x="20" y="34" width="96" height="22" rx="3" fill="#eab308" stroke="#92400e" stroke-width="1.5"/>
        ${[32, 46, 60, 74, 88, 102].map((x) => `<rect x="${x - 3}" y="32" width="6" height="26" fill="#ffffff"/><path d="M${x} 24 V66" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="2 2"/>`).join('')}
        <text x="68" y="80" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#92400e">無数の貫通孔で空気摩擦ノイズ減!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#854d0e">MC16 多孔シリコン固定電極板</text>
        <text x="142" y="43" font-size="7.0" fill="#713f12">・振動膜と対になる高剛性パーフォレート電極</text>
        <text x="142" y="56" font-size="7.0" fill="#713f12">・ハチの巣状の貫通孔で空気のつっかえ解消</text>
        <text x="142" y="69" font-size="7.0" fill="#713f12">・サーッという熱音響自己雑音を大幅削減</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#854d0e">固定板に無数の穴を開けて空気をスッと逃がすことで、静かな部屋でも雑音少ない録音になる</text>
      `);

    case 'mc_mems_sdm_vacuum_cell':
      return wrapSvg(`
        <rect x="22" y="22" width="92" height="8" rx="2" fill="#0ea5e9"/>
        <rect x="26" y="30" width="84" height="28" fill="#cffafe" stroke="#06b6d4" stroke-dasharray="3 2"/>
        <rect x="30" y="41" width="76" height="6" rx="1" fill="#eab308"/>
        <rect x="22" y="58" width="92" height="8" rx="2" fill="#0ea5e9"/>
        <text x="68" y="39" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#0e7490">低圧ほぼ真空セル</text>
        <text x="68" y="80" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0891b2">72 dB(A) 超高SNR 革新!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#155e75">MC17 次世代SDM密閉二重振動膜</text>
        <text x="142" y="43" font-size="7.0" fill="#164e63">・2枚鼓膜の中を減圧密閉し空気雑音を消去</text>
        <text x="142" y="56" font-size="7.0" fill="#164e63">・差動プッシュプル出力2倍＆歪み相殺</text>
        <text x="142" y="69" font-size="7.0" fill="#164e63">・米粒サイズでプロ級72dB SNR/130dB AOP</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#155e75">2枚の鼓膜の間をほぼ真空に密閉し、空気摩擦ノイズを消し去る最先端MEMSの到達点</text>
      `);

    case 'mc_mems_drie_back_volume':
      return wrapSvg(`
        <rect x="20" y="20" width="96" height="8" rx="2" fill="#0ea5e9"/>
        <path d="M20 28 H38 V72 H98 V28 H116 V76 H20 Z" fill="#334155" stroke="#0f172a"/>
        <text x="68" y="52" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0369a1">DRIE深掘り</text>
        <text x="68" y="63" text-anchor="middle" font-size="6.0" fill="#475569">背面音響室</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MC18 DRIE深掘りシリコン裏室</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・プラズマ垂直エッチングで最大の裏部屋確保</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・裏の空気バネを柔らかくし低音＆感度UP</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・微小気圧逃がしで飛行機・高山でも破損なし</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">太鼓の裏側の胴と同じく、シリコンを垂直に深くくり抜いた裏部屋が豊かな低音と感度を生む</text>
      `);

    case 'mc_mems_readout_asic':
      return wrapSvg(`
        <rect x="14" y="22" width="32" height="46" rx="3" fill="#0ea5e9"/>
        <text x="30" y="48" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#fff">ΔC(fF)</text>
        <path d="M46 45 H58" stroke="#eab308" stroke-width="2"/>
        <rect x="58" y="18" width="66" height="54" rx="4" fill="#6d28d9"/>
        <text x="91" y="34" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fde047">12V昇圧ポンプ</text>
        <text x="91" y="47" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">超低雑音アンプ</text>
        <text x="91" y="60" text-anchor="middle" font-size="6.0" fill="#c4b5fd">4次ΔΣ PDM出力</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#5b21b6">MC19 12V昇圧＆4次ΔΣ ASIC</text>
        <text x="142" y="43" font-size="7.0" fill="#4c1d95">・0.3mm隣のゼロ距離で極微信号を即増幅</text>
        <text x="142" y="56" font-size="7.0" fill="#4c1d95">・1.8Vから無騒音12V分極バイアスを内部生成</text>
        <text x="142" y="69" font-size="7.0" fill="#4c1d95">・3MHz PDMデジタル出力で配線ノイズ完全ゼロ</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#5b21b6">鼓膜のすぐ隣に住む専用頭脳チップが、1000兆分の1ファラドの揺れをその場でデジタル化</text>
      `);

    case 'mc_mems_gold_wirebonds':
      return wrapSvg(`
        <rect x="20" y="36" width="38" height="24" rx="2" fill="#0ea5e9"/>
        <text x="39" y="51" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">MEMS</text>
        <rect x="76" y="36" width="38" height="24" rx="2" fill="#6d28d9"/>
        <text x="95" y="51" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">ASIC</text>
        <path d="M52 36 Q67 14 82 36" fill="none" stroke="#eab308" stroke-width="2.4"/>
        <path d="M56 36 Q67 20 78 36" fill="none" stroke="#f59e0b" stroke-width="1.8"/>
        <rect x="16" y="62" width="104" height="14" rx="2" fill="#14532d"/>
        <text x="68" y="72" text-anchor="middle" font-size="6.1" fill="#fff">多層LGAセラミック基板</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#854d0e">MC20 φ20μm金線＆LGA基板</text>
        <text x="142" y="43" font-size="7.0" fill="#713f12">・4N純金ワイヤー最短アーチで寄生容量極小</text>
        <text x="142" y="56" font-size="7.0" fill="#713f12">・内層GND＆ビアフェンスで360°電磁遮蔽</text>
        <text x="142" y="69" font-size="7.0" fill="#713f12">・底面金LGAパッドでSH-1035フレキへ実装</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#854d0e">髪の毛の1/4の純金アーチが鼓膜チップと頭脳チップを最短接続し、音の電気を外へ届ける</text>
      `);

    case 'mc_ecm_aluminum_case':
      return wrapSvg(`
        <path d="M28 68 V24 H54 M82 24 H108 V68 H96 M28 68 H40" fill="none" stroke="#94a3b8" stroke-width="4" stroke-linejoin="round"/>
        <rect x="38" y="32" width="60" height="8" rx="1" fill="#eab308"/>
        <rect x="38" y="44" width="60" height="8" rx="1" fill="#d97706"/>
        <rect x="38" y="56" width="60" height="10" rx="1" fill="#15803d"/>
        <text x="68" y="83" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#334155">右ch: 円筒アルミ缶ECM解剖!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MC21 ECM円筒アルミシールド缶</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・右chは伝統的コンデンサECMを輪切り比較</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・φ4〜6mm深絞りアルミ缶で後端かしめ固定</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・大口径膜でウォーム＆高感度な自然音色</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">左の最新MEMSと並べて見比べられる、王道エレクトレットマイクの丈夫なアルミ外装缶</text>
      `);

    case 'mc_ecm_electret_diaphragm':
      return wrapSvg(`
        <rect x="20" y="34" width="96" height="14" rx="3" fill="#eab308" stroke="#92400e" stroke-width="1.5"/>
        <text x="36" y="44" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#dc2626">+</text>
        <text x="58" y="44" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#dc2626">+</text>
        <text x="80" y="44" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#dc2626">+</text>
        <text x="102" y="44" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#dc2626">+</text>
        <text x="68" y="25" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#92400e">永久電荷(電気の磁石!)</text>
        <text x="68" y="68" text-anchor="middle" font-size="6.2" fill="#78350f">48V電源不要でコンデンサ動作</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#854d0e">MC22 金蒸着エレクトレット振動膜</text>
        <text x="142" y="43" font-size="7.0" fill="#713f12">・FEPフッ素膜へ150〜300V相当電荷を永久封入</text>
        <text x="142" y="56" font-size="7.0" fill="#713f12">・極薄金蒸着膜が太鼓のように震え電圧発生</text>
        <text x="142" y="69" font-size="7.0" fill="#713f12">・重い48V電源なしで数十年高感度を維持</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#854d0e">「電気の永久磁石」を仕込んだ金色の薄いフィルムだから、カメラの電池だけで高音質録音できる</text>
      `);

    case 'mc_ecm_ptfe_spacer_backplate':
      return wrapSvg(`
        <rect x="22" y="22" width="92" height="8" rx="1" fill="#eab308"/>
        <rect x="22" y="30" width="16" height="8" fill="#ffffff" stroke="#64748b"/>
        <rect x="98" y="30" width="16" height="8" fill="#ffffff" stroke="#64748b"/>
        <text x="68" y="37" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#334155">25μm PTFE隙間</text>
        <rect x="22" y="39" width="92" height="18" rx="2" fill="#d97706" stroke="#92400e"/>
        ${[42, 68, 94].map((x) => `<rect x="${x - 4}" y="39" width="8" height="18" fill="#fff"/>`).join('')}
        <text x="68" y="72" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#92400e">穿孔真鍮バックプレート電極</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#92400e">MC23 25μmスペーサー＆真鍮板</text>
        <text x="142" y="43" font-size="7.0" fill="#78350f">・白いテフロンリングが0.025mm隙間を精密維持</text>
        <text x="142" y="56" font-size="7.0" fill="#78350f">・穴あき真鍮電極が振動膜の揺れを電気受容</text>
        <text x="142" y="69" font-size="7.0" fill="#78350f">・バックエレクトレット方式で高音のキレ向上</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">紙より薄い白いテフロンリングが正確な隙間を作り、穴あき真鍮板が声の電気を受け止める</text>
      `);

    case 'mc_ecm_insulator_cu_ring':
      return wrapSvg(`
        <rect x="18" y="22" width="100" height="48" rx="4" fill="#cbd5e1" stroke="#475569"/>
        <rect x="26" y="28" width="84" height="36" rx="3" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
        <rect x="44" y="38" width="48" height="16" rx="3" fill="#ea580c"/>
        <text x="68" y="49" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">銅圧接リング</text>
        <text x="68" y="82" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#9a3412">絶縁カップでアルミ缶と完全隔離</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#9a3412">MC24 絶縁カップ＆銅連絡リング</text>
        <text x="142" y="43" font-size="7.0" fill="#7c2d12">・体積抵抗＞10¹⁴Ω超高絶縁カップで漏電防止</text>
        <text x="142" y="56" font-size="7.0" fill="#7c2d12">・銅リング圧接でGΩ微弱信号をJFETへ直送</text>
        <text x="142" y="69" font-size="7.0" fill="#7c2d12">・カップ内側がECM背面音響室も兼任</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9a3412">外側の金属缶とショートしないよう白い樹脂カップで守り、銅リングだけで下へ音を繋ぐ</text>
      `);

    case 'mc_ecm_jfet_pcb':
      return wrapSvg(`
        <rect x="14" y="28" width="32" height="34" rx="3" fill="#fef3c7" stroke="#d97706"/>
        <text x="30" y="43" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#92400e">数GΩ</text>
        <text x="30" y="54" text-anchor="middle" font-size="5.6" fill="#92400e">か細い音</text>
        <path d="M46 45 H58" stroke="#16a34a" stroke-width="2"/>
        <rect x="58" y="22" width="32" height="46" rx="4" fill="#15803d"/>
        <text x="74" y="48" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#fff">JFET</text>
        <path d="M90 45 H100" stroke="#16a34a" stroke-width="2.6"/>
        <rect x="100" y="28" width="26" height="34" rx="3" fill="#dcfce7" stroke="#16a34a"/>
        <text x="113" y="43" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#166534">2kΩ</text>
        <text x="113" y="54" text-anchor="middle" font-size="5.4" fill="#166534">タフ!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#166534">MC25 内蔵JFETインピーダンス変換</text>
        <text x="142" y="43" font-size="7.0" fill="#14532d">・数GΩ→2kΩへ100万倍ノイズに強い信号へ</text>
        <text x="142" y="56" font-size="7.0" fill="#14532d">・2線式プラグインパワー2〜3Vで省電力動作</text>
        <text x="142" y="69" font-size="7.0" fill="#14532d">・内蔵10pF/33pFコンデンサで携帯電波防御</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#166534">アルミ缶の底に隠れた極小JFETアンプが、か細い音の電気を長距離伝送できる元気な信号へ変える</text>
      `);

    case 'mc_rear_3rd_voicememo_capsule':
      return wrapSvg(`
        <circle cx="38" cy="30" r="10" fill="#0ea5e9"/>
        <text x="38" y="33" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">L</text>
        <circle cx="98" cy="30" r="10" fill="#eab308"/>
        <text x="98" y="33" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#1e293b">R</text>
        <circle cx="68" cy="64" r="13" fill="#06b6d4" stroke="#0e7490" stroke-width="2"/>
        <text x="68" y="67" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">第3耳</text>
        <polygon points="38,30 98,30 68,64" fill="none" stroke="#0284c7" stroke-width="1.4" stroke-dasharray="3 2"/>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#ecfeff" stroke="#0284c7"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0369a1">MC26 第3カプセル＆背面ボイスメモ</text>
        <text x="142" y="43" font-size="7.0" fill="#0c4a6e">・ZV-E1: 3角アレイで前/後/全方位/オート</text>
        <text x="142" y="56" font-size="7.0" fill="#0c4a6e">・α1 II/α9 III: 背面専用ボイスメモ録音</text>
        <text x="142" y="69" font-size="7.0" fill="#0c4a6e">・報道写真へ音声タグ付与＆即文字起こし!</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">後ろ向きの「3つ目の耳」があるから、カメラマンの声も前方の狙い撃ちも自在にクリア収録</text>
      `);

    case 'mc_sh1035_diff_flex':
      return wrapSvg(`
        <path d="M20 26 H116 M68 26 V72" fill="none" stroke="#d97706" stroke-width="8" stroke-linecap="round"/>
        <path d="M26 26 H110 M68 26 V68" fill="none" stroke="#cbd5e1" stroke-width="2.4" stroke-dasharray="4 2"/>
        <text x="68" y="18" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#92400e">純正 SH-1035 (A5033450A)</text>
        <text x="68" y="84" text-anchor="middle" font-size="6.0" fill="#475569">差動ペア＋EMIシールド膜</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#92400e">MC27 純正SH-1035差動フレキ</text>
        <text x="142" y="43" font-size="7.0" fill="#78350f">・Ref.307 A5033450A トップデッキ配線</text>
        <text x="142" y="56" font-size="7.0" fill="#78350f">・GNDガード差動＋表面導電EMIシールド</text>
        <text x="142" y="69" font-size="7.0" fill="#78350f">・根元の細身柔軟ネックが振動伝搬を遮断</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">L/Rと第3マイクの繊細な音を、ノイズ防止シールド付きの純正オレンジリボンで基板へ運ぶ</text>
      `);

    case 'mc_rf_ferrite_esd_filter':
      return wrapSvg(`
        <rect x="16" y="26" width="38" height="40" rx="3" fill="#475569"/>
        <text x="35" y="44" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#fff">フェライト</text>
        <text x="35" y="56" text-anchor="middle" font-size="5.6" fill="#cbd5e1">1kΩ@GHz</text>
        <path d="M54 36 H76" stroke="#10b981" stroke-width="2.4"/>
        <path d="M54 56 H68" stroke="#dc2626" stroke-width="2" stroke-dasharray="2 2"/>
        <text x="68" y="59" font-size="7.5" font-weight="bold" fill="#dc2626">×</text>
        <rect x="78" y="24" width="44" height="44" rx="3" fill="#dcfce7" stroke="#16a34a"/>
        <text x="100" y="43" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#166534">音だけ</text>
        <text x="100" y="55" text-anchor="middle" font-size="6.0" fill="#166534">素通し!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">MC28 RFフェライト＆C0G保護網</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・可聴音は0.5Ω素通し、Wi-Fi/5Gは1kΩ遮断</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・圧電鳴きゼロC0Gセラミックで歪み根絶</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・グリルからの静電気スパークを入口で防御</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">Wi-Fi 6Eやスマホ電波のジジジ雑音だけを熱に変えて消し、純粋な声だけを通す電波関所</text>
      `);

    case 'mc_audio_codec_adc_pga':
      return wrapSvg(`
        <path d="M16 46 Q26 24 36 46 T56 46" fill="none" stroke="#d97706" stroke-width="2"/>
        <text x="36" y="70" text-anchor="middle" font-size="6.0" fill="#92400e">アナログ音</text>
        <path d="M58 46 H70" stroke="#0284c7" stroke-width="2"/>
        <rect x="70" y="20" width="54" height="52" rx="4" fill="#0284c7"/>
        <text x="97" y="38" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">24-bit</text>
        <text x="97" y="50" text-anchor="middle" font-size="6.2" fill="#e0f2fe">48 kHz</text>
        <text x="97" y="62" text-anchor="middle" font-size="5.6" fill="#bae6fd">1677万段階</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0369a1">MC29 24bit/48kHzコーデック</text>
        <text x="142" y="43" font-size="7.0" fill="#0c4a6e">・低雑音PGAがメニュー0–31で精密レベル調整</text>
        <text x="142" y="56" font-size="7.0" fill="#0c4a6e">・16bitの256倍細かい24bit LPCM高音質記録</text>
        <text x="142" y="69" font-size="7.0" fill="#0c4a6e">・専用低ノイズMICBIAS電源で電源揺れ遮断</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">1秒間に4万8000回、1677万段階ものきめ細かさで音の波をデジタル化するカメラ内蔵スタジオ</text>
      `);

    case 'mc_windcut_hpf_circuit':
      return wrapSvg(`
        <line x1="20" y1="68" x2="118" y2="68" stroke="#64748b" stroke-width="1.2"/>
        <line x1="20" y1="20" x2="20" y2="68" stroke="#64748b" stroke-width="1.2"/>
        <rect x="21" y="22" width="32" height="45" fill="#fee2e2" opacity="0.7"/>
        <text x="37" y="42" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#b91c1c">風低音</text>
        <text x="37" y="53" text-anchor="middle" font-size="5.8" fill="#b91c1c">カット!</text>
        <path d="M22 66 Q44 64 54 32 L114 32" fill="none" stroke="#2563eb" stroke-width="2.6"/>
        <text x="86" y="27" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#1d4ed8">声の帯域は透過</text>
        <text x="68" y="82" text-anchor="middle" font-size="6.0" fill="#334155">100–150 Hz 自動HPF遮断</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#1e40af">MC30 自動「風音低減」HPF回路</text>
        <text x="142" y="43" font-size="7.0" fill="#1e3a8a">・左右マイクの相関から「風」だけを自動検知</text>
        <text x="142" y="56" font-size="7.0" fill="#1e3a8a">・風の低音(150Hz以下)だけを急峻にカット</text>
        <text x="142" y="69" font-size="7.0" fill="#1e3a8a">・無風時は自動解除し豊かな低音をキープ</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#1e40af">音楽の低音は残し、左右バラバラに暴れる風のゴロゴロ音だけを見抜いて切り落とす賢いハサミ</text>
      `);

    case 'mc_beamforming_phase_dsp':
      return wrapSvg(`
        <ellipse cx="68" cy="36" rx="18" ry="22" fill="#cffafe" stroke="#06b6d4" stroke-width="2"/>
        <circle cx="68" cy="58" r="7" fill="#0f766e"/>
        <text x="68" y="34" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0e7490">前方狙い</text>
        <text x="68" y="45" text-anchor="middle" font-size="5.8" fill="#155e75">音のスポット</text>
        <path d="M22 52 L38 52 M114 52 L98 52" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="2 2"/>
        <text x="68" y="82" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0e7490">AI顔認識連動ビーム追尾!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#155e75">MC31 位相差ビームフォーミング</text>
        <text x="142" y="43" font-size="7.0" fill="#164e63">・各カプセル1万分の1秒の時間ズレを合成</text>
        <text x="142" y="56" font-size="7.0" fill="#164e63">・前方/後方/全方位を物理交換なしで切替</text>
        <text x="142" y="69" font-size="7.0" fill="#164e63">・AI顔認識に連動し喋る人へ音を自動追尾!</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#155e75">瞳AFのように「音のスポットライト」もAI顔認識で自動追尾し、狙った人の声だけ浮かび上がらせる</text>
      `);

    case 'mc_ai_noise_cut_agc':
      return wrapSvg(`
        <rect x="14" y="22" width="38" height="46" rx="3" fill="#e2e8f0" stroke="#64748b"/>
        <text x="33" y="40" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#334155">声＋空調</text>
        <text x="33" y="52" text-anchor="middle" font-size="5.6" fill="#dc2626">＋ズーム音</text>
        <path d="M52 45 H64" stroke="#7c3aed" stroke-width="2.2"/>
        <rect x="64" y="20" width="60" height="50" rx="4" fill="#7c3aed"/>
        <text x="94" y="38" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fde047">BIONZ XR2</text>
        <text x="94" y="50" text-anchor="middle" font-size="6.0" fill="#fff">AI音声分離</text>
        <text x="94" y="62" text-anchor="middle" font-size="5.6" fill="#ddd6fe">＋AGC音割れ0</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#5b21b6">MC32 XR2 AIノイズ低減＆AGC</text>
        <text x="142" y="43" font-size="7.0" fill="#4c1d95">・α7 V/α7R VIのAIが声と環境騒音を分離</text>
        <text x="142" y="56" font-size="7.0" fill="#4c1d95">・ズーム駆動指令連動でモーター音も狙い消し</text>
        <text x="142" y="69" font-size="7.0" fill="#4c1d95">・スマートAGC＆ソフトリミッターで音割れゼロ</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#5b21b6">2025–2026年最新AI頭脳が雑音とズーム音だけをリアルタイムに消し、撮った瞬間から聞きやすい音声へ</text>
      `);

    default:
      return null;
  }
}
