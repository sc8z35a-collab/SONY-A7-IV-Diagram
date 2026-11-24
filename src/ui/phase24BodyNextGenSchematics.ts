import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 24 Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (25 diagrams):
 *   - Next-Gen Flagship Camera Body & Sony OEM Deep-Audit Parts (B77–B101 -> 101 total body parts)
 * Every text element is strictly calibrated inside x ∈ [6, 310] (zero overflow!).
 */
export function renderPhase24BodyNextGenSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    case 'body_vl_ir_awb_sensor':
      return wrapSvg(`
        <path d="M18 24 L52 34" stroke="#f59e0b" stroke-width="2"/>
        <path d="M18 54 L52 54" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="26" y="18" text-anchor="middle" font-size="6.2" fill="#b45309">可視光RGB</text>
        <text x="26" y="68" text-anchor="middle" font-size="6.2" fill="#b91c1c">赤外線IR</text>
        <rect x="52" y="20" width="24" height="54" rx="3" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.4"/>
        <text x="64" y="45" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#0369a1">VL+IR</text>
        <text x="64" y="56" text-anchor="middle" font-size="5.8" fill="#0369a1">センサー</text>
        <path d="M76 47 H90" stroke="#2563eb" stroke-width="2"/>
        <rect x="90" y="26" width="34" height="42" rx="4" fill="#ede9fe" stroke="#7c3aed"/>
        <text x="107" y="45" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#5b21b6">AI色</text>
        <text x="107" y="56" text-anchor="middle" font-size="6.2" fill="#5b21b6">補正</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#0369a1">B77 前面VL+IR色温度センサー</text>
        <text x="142" y="43" font-size="7.1" fill="#0c4a6e">・目に見える光＋赤外線の比率を測定</text>
        <text x="142" y="56" font-size="7.1" fill="#0c4a6e">・太陽光か室内LEDかを瞬時に判別</text>
        <text x="142" y="69" font-size="7.1" fill="#0c4a6e">・日陰や逆光でも自然な肌色(α7R VI)</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0369a1">カメラ正面の「光の色のソムリエ」がAIと協力し、どんな照明でも白い物を白く写す</text>
      `);

    case 'body_front_ir_remote_window':
      return wrapSvg(`
        <rect x="14" y="34" width="24" height="32" rx="3" fill="#334155" stroke="#0f172a"/>
        <text x="26" y="53" text-anchor="middle" font-size="6.4" fill="#f8fafc">リモコン</text>
        <path d="M40 46 Q54 38 64 46 M40 54 Q54 62 64 54" fill="none" stroke="#e11d48" stroke-width="1.8"/>
        <text x="53" y="32" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#be123c">940nm IR</text>
        <rect x="68" y="22" width="14" height="56" rx="2" fill="#4c0519" stroke="#9f1239" stroke-width="1.5"/>
        <text x="75" y="88" text-anchor="middle" font-size="6" fill="#9f1239">IR通過窓</text>
        <rect x="86" y="28" width="38" height="44" rx="3" fill="#fef2f2" stroke="#dc2626"/>
        <text x="105" y="48" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#991b1b">40kHz</text>
        <text x="105" y="60" text-anchor="middle" font-size="6.2" fill="#991b1b">復調IC</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#9f1239">B78 前面赤外線リモート受光窓</text>
        <text x="142" y="43" font-size="7.1" fill="#881337">・可視光を遮断し赤外線だけ通す黒赤窓</text>
        <text x="142" y="56" font-size="7.1" fill="#881337">・40kHzの合言葉で太陽光の誤動作防止</text>
        <text x="142" y="69" font-size="7.1" fill="#881337">・三脚撮影でカメラに触れずブレゼロ!</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#9f1239">グリップ前面の赤外線専用窓がリモコンの合図を受け取り、手ブレなしでシャッターを切る</text>
      `);

    case 'body_bodycap_alc_b1em':
      return wrapSvg(`
        <circle cx="52" cy="50" r="28" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
        <circle cx="52" cy="50" r="19" fill="#334155" stroke="#64748b"/>
        <rect x="46" y="18" width="12" height="5" rx="1" fill="#f8fafc"/>
        <rect x="20" y="60" width="10" height="5" rx="1" fill="#f8fafc" transform="rotate(-60 25 62)"/>
        <rect x="74" y="60" width="10" height="5" rx="1" fill="#f8fafc" transform="rotate(60 79 62)"/>
        <text x="52" y="52" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#f8fafc">3爪ロック</text>
        <path d="M84 50 H122" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2"/>
        <rect x="108" y="24" width="14" height="52" rx="2" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="115" y="53" text-anchor="middle" font-size="5.8" fill="#0369a1">CMOS</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#0f172a">B79 純正ボディキャップ(Ref.551)</text>
        <text x="142" y="43" font-size="7.1" fill="#334155">・純正418853601 / ALC-B1EM 3爪構造</text>
        <text x="142" y="56" font-size="7.1" fill="#334155">・60°回転でカチッと固定し脱落防止</text>
        <text x="142" y="69" font-size="7.1" fill="#334155">・帯電防止樹脂でホコリ付着をブロック</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#334155">レンズを外したカメラの心臓部(センサーとシャッター幕)をホコリと衝撃から守る専用のフタ</text>
      `);

    case 'body_sorplas_sereebo_liner':
      return wrapSvg(`
        <rect x="16" y="18" width="106" height="18" rx="3" fill="#475569" stroke="#1e293b"/>
        <text x="69" y="30" text-anchor="middle" font-size="6.7" font-weight="bold" fill="#f8fafc">前面: Mg合金(高剛性)</text>
        <rect x="16" y="40" width="106" height="22" rx="3" fill="#dcfce7" stroke="#16a34a" stroke-width="1.6"/>
        <text x="69" y="54" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#166534">内部: SORPLAS再生難燃材</text>
        <rect x="16" y="66" width="106" height="18" rx="3" fill="#e2e8f0" stroke="#334155"/>
        <text x="69" y="78" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#0f172a">外周: CFRP Sereebo複合</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#166534">B80 SORPLAS＆CFRP複合殻</text>
        <text x="142" y="43" font-size="7.1" fill="#14532d">・最大99%再生材でCO₂排出72%削減</text>
        <text x="142" y="56" font-size="7.1" fill="#14532d">・新品同等の強度＆燃えにくい難燃性</text>
        <text x="142" y="69" font-size="7.1" fill="#14532d">・軽量化＋手の熱遮断＋電波透過性↑</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#166534">強度の要はマグネシウム、内部と外周はエコ再生材＆カーボン複合で軽さと環境性能を両立</text>
      `);

    case 'body_front_grip_thumb_insert':
      return wrapSvg(`
        <path d="M26 20 Q16 50 28 82 H94 Q112 66 106 44 Q98 22 76 20 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.6"/>
        <line x1="30" y1="36" x2="96" y2="36" stroke="#0284c7" stroke-width="2"/>
        <line x1="26" y1="52" x2="102" y2="52" stroke="#0284c7" stroke-width="2"/>
        <line x1="28" y1="68" x2="96" y2="68" stroke="#0284c7" stroke-width="2"/>
        <text x="64" y="47" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#0369a1">格子補強リブ</text>
        <path d="M108 32 Q118 42 108 52" fill="none" stroke="#dc2626" stroke-width="2"/>
        <text x="116" y="26" text-anchor="middle" font-size="6" fill="#b91c1c">中指フック</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#0f172a">B81 ディープグリップ内部骨格</text>
        <text x="142" y="43" font-size="7.1" fill="#334155">・中指が深く掛かるエルゴ形状(α9 III/α1 II)</text>
        <text x="142" y="56" font-size="7.1" fill="#334155">・内部の格子リブが望遠レンズ荷重を支持</text>
        <text x="142" y="69" font-size="7.1" fill="#334155">・衝撃から内部バッテリーを守る緩衝壁</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#334155">ゴムの下に詰まった格子状の骨組みが、重い望遠レンズでも疲れない握り心地を生む</text>
      `);

    case 'body_deep_eyecup_ep21':
      return wrapSvg(`
        <rect x="20" y="22" width="18" height="56" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="29" y="53" text-anchor="middle" font-size="6.2" fill="#0f172a">EVF</text>
        <path d="M38 22 L84 14 L84 86 L38 78 Z" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
        <text x="61" y="53" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#f8fafc">深型ゴム</text>
        <circle cx="104" cy="50" r="14" fill="#fef3c7" stroke="#d97706"/>
        <circle cx="96" cy="50" r="4" fill="#1e293b"/>
        <path d="M90 12 L78 24" stroke="#f59e0b" stroke-width="2"/>
        <text x="106" y="16" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#b45309">横光を遮断!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#0f172a">B82 深型アイピース(FDA-EP21)</text>
        <text x="142" y="43" font-size="7.1" fill="#334155">・純正Ref.5 X50009261 / 深型EP21</text>
        <text x="142" y="56" font-size="7.1" fill="#334155">・柔らかい遮光ゴムが横の太陽光を遮断</text>
        <text x="142" y="69" font-size="7.1" fill="#334155">・スライド＆ダブル爪で着脱・交換簡単</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#334155">目元に密着する深型ひさしで直射日光をカットし、映画館のようにクリアなファインダーへ</text>
      `);

    case 'body_diopter_dial_wp':
      return wrapSvg(`
        <rect x="16" y="34" width="22" height="32" rx="3" fill="#334155" stroke="#0f172a"/>
        <text x="27" y="53" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#f8fafc">ツマミ</text>
        <rect x="40" y="24" width="10" height="52" rx="2" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
        <text x="45" y="86" text-anchor="middle" font-size="5.8" fill="#b45309">防水シート</text>
        <line x1="38" y1="50" x2="86" y2="50" stroke="#64748b" stroke-width="4"/>
        <ellipse cx="96" cy="50" rx="10" ry="24" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <path d="M84 18 H108" stroke="#2563eb" stroke-width="1.6"/>
        <text x="96" y="14" text-anchor="middle" font-size="6.2" fill="#1d4ed8">前後微動</text>
        <text x="96" y="84" text-anchor="middle" font-size="6.1" fill="#0369a1">−4〜+3m⁻¹</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#92400e">B83 視度調整ダイヤル＆防水膜</text>
        <text x="142" y="43" font-size="7.1" fill="#78350f">・純正Ref.2(500367201)+Ref.301防水</text>
        <text x="142" y="56" font-size="7.1" fill="#78350f">・裸眼の近視/老眼に合わせピント調整</text>
        <text x="142" y="69" font-size="7.1" fill="#78350f">・貫通軸Oリング＋専用シートで雨遮断</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#92400e">ファインダー横のツマミを回すだけで、自分の視力にピッタリ合わせて文字をくっきり表示</text>
      `);

    case 'body_evf_eye_sensor_bezel':
      return wrapSvg(`
        <rect x="18" y="24" width="24" height="52" rx="3" fill="#1e293b" stroke="#0f172a"/>
        <text x="30" y="48" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#c084fc">IR窓</text>
        <text x="30" y="60" text-anchor="middle" font-size="5.6" fill="#cbd5e1">ES1008</text>
        <path d="M44 42 L84 42" stroke="#a855f7" stroke-width="1.8"/>
        <path d="M84 56 L44 56" stroke="#ec4899" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="64" y="36" text-anchor="middle" font-size="6" fill="#7e22ce">見えない赤外線</text>
        <text x="64" y="68" text-anchor="middle" font-size="6" fill="#be185d">顔で反射!</text>
        <circle cx="102" cy="50" r="16" fill="#fed7aa" stroke="#ea580c"/>
        <text x="102" y="53" text-anchor="middle" font-size="7" font-weight="bold" fill="#9a3412">顔接近</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#faf5ff" stroke="#7c3aed"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#5b21b6">B84 EVFアイセンサー(Ref.116/117)</text>
        <text x="142" y="43" font-size="7.1" fill="#4c1d95">・顔接近3cm未満を0.05秒以下で感知</text>
        <text x="142" y="56" font-size="7.1" fill="#4c1d95">・自動で背面LCD消灯→EVF点灯(節電)</text>
        <text x="142" y="69" font-size="7.1" fill="#4c1d95">・二重防水クッション＋ESD接地シート</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#5b21b6">ファインダー下の赤外線の見張り番が顔を察知し、瞬時に液晶とファインダーを自動切替</text>
      `);

    case 'body_voice_memo_mic':
      return wrapSvg(`
        <circle cx="34" cy="50" r="15" fill="#fed7aa" stroke="#ea580c"/>
        <text x="34" y="53" text-anchor="middle" font-size="7" font-weight="bold" fill="#9a3412">口元</text>
        <path d="M54 42 Q64 50 54 58 M62 36 Q76 50 62 64" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <text x="63" y="26" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0369a1">至近15cm</text>
        <rect x="78" y="26" width="44" height="48" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
        <text x="100" y="46" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#0369a1">背面専用</text>
        <text x="100" y="58" text-anchor="middle" font-size="6.4" fill="#0c4a6e">メモマイク</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#0369a1">B85 背面ボイスメモマイク</text>
        <text x="142" y="43" font-size="7.1" fill="#0c4a6e">・口元直近の専用マイク(α9 III / α1 II)</text>
        <text x="142" y="56" font-size="7.1" fill="#0c4a6e">・大歓声の競技場でも声だけを鮮明録音</text>
        <text x="142" y="69" font-size="7.1" fill="#0c4a6e">・自動文字起こし＆写真と同時FTP送信</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0369a1">背面パネルに新設された口元専用マイクで、撮った直後の写真へ音声メモをくっきり添付</text>
      `);

    case 'body_joy_retainer_stack':
      return wrapSvg(`
        <rect x="18" y="16" width="104" height="14" rx="3" fill="#334155"/>
        <text x="70" y="25.5" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#f8fafc">① JOY KNOB (ギザギザ親指)</text>
        <rect x="18" y="34" width="104" height="14" rx="3" fill="#fed7aa" stroke="#ea580c"/>
        <text x="70" y="43.5" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#9a3412">② JOY RUBBER (蛇腹防水)</text>
        <rect x="18" y="52" width="104" height="14" rx="3" fill="#e2e8f0" stroke="#475569"/>
        <text x="70" y="61.5" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#0f172a">③ RETAINER (SUS押さえ板)</text>
        <rect x="18" y="70" width="104" height="14" rx="3" fill="#cbd5e1" stroke="#334155"/>
        <text x="70" y="79.5" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#1e293b">④ HOLDER (土台プレート)</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#0f172a">B86 スティック4層防水スタック</text>
        <text x="142" y="43" font-size="7.1" fill="#334155">・純正Ref.70〜73の4層密着構造</text>
        <text x="142" y="56" font-size="7.1" fill="#334155">・伸び縮みする蛇腹ゴムが水と砂を遮断</text>
        <text x="142" y="69" font-size="7.1" fill="#334155">・上下金属板で挟み何十万回もズレ無し</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#334155">360度グリグリ動かせるのに雨や砂を一切入れない、蛇腹ゴム＋金属板の4重サンドイッチ</text>
      `);

    case 'body_media_lid_hinge_spring':
      return wrapSvg(`
        <rect x="34" y="16" width="10" height="68" rx="3" fill="#94a3b8" stroke="#334155"/>
        <text x="39" y="92" text-anchor="middle" font-size="6" fill="#334155">SUS心棒</text>
        <path d="M28 32 H50 M28 40 H50 M28 48 H50 M28 56 H50" stroke="#d97706" stroke-width="2.2"/>
        <path d="M46 44 L104 22" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
        <path d="M84 64 Q102 48 98 30" fill="none" stroke="#dc2626" stroke-width="2"/>
        <polygon points="98,28 93,35 102,35" fill="#dc2626"/>
        <text x="88" y="76" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#b91c1c">バネで自動95°開放!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#92400e">B87 カード扉軸＆自動バネ</text>
        <text x="142" y="43" font-size="7.1" fill="#78350f">・純正Ref.120軸 ＋ Ref.121ねじりバネ</text>
        <text x="142" y="56" font-size="7.1" fill="#78350f">・ロックを外した瞬間にスッと自動オープン</text>
        <text x="142" y="69" font-size="7.1" fill="#78350f">・金属軸が防水パッキンを均等に圧着</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#92400e">極細ステンレス心棒とねじりバネの力で、片手でも素早くガタつきゼロのカード交換を実現</text>
      `);

    case 'body_active_cooling_fan_duct':
      return wrapSvg(`
        <rect x="14" y="18" width="112" height="28" rx="3" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
        <circle cx="38" cy="32" r="10" fill="#38bdf8" stroke="#0369a1"/>
        <text x="38" y="34.5" text-anchor="middle" font-size="6" font-weight="bold" fill="#fff">FAN</text>
        <path d="M52 32 H118" stroke="#0284c7" stroke-width="2.2"/>
        <polygon points="120,32 112,28 112,36" fill="#0284c7"/>
        <text x="86" y="27" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0369a1">密閉アルミ風道(水OK)</text>
        <line x1="14" y1="50" x2="126" y2="50" stroke="#ea580c" stroke-width="3"/>
        <text x="70" y="58" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#c2410c">完全防水隔壁(熱だけ移動)</text>
        <rect x="14" y="61" width="112" height="24" rx="3" fill="#1e293b"/>
        <text x="70" y="76" text-anchor="middle" font-size="6.6" fill="#fef08a">電子基板(水も塵も侵入0!)</text>
        <rect x="136" y="14" width="174" height="74" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="144" y="29" font-size="7.8" font-weight="bold" fill="#0e7490">B88 防滴・独立空冷ファン</text>
        <text x="144" y="43" font-size="7.1" fill="#155e75">・電子室と風のトンネルを金属壁で隔離</text>
        <text x="144" y="56" font-size="7.1" fill="#155e75">・18〜22dB超静音マイクロブロワー</text>
        <text x="144" y="69" font-size="7.1" fill="#155e75">・8K/4K 120pを熱停止なしで無制限収録</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0e7490">雨もホコリも電子回路へ一滴も入れず、熱だけを風のトンネルへ移して追い出す独立エアコン</text>
      `);

    case 'body_sigma_graphite_heatplate':
      return wrapSvg(`
        <rect x="16" y="16" width="108" height="14" rx="2" fill="#1e293b"/>
        <text x="70" y="25.5" text-anchor="middle" font-size="6.4" fill="#f8fafc">BIONZ XR 発熱チップ</text>
        <rect x="16" y="32" width="108" height="10" rx="2" fill="#fbcfe8" stroke="#db2777"/>
        <text x="70" y="39.5" text-anchor="middle" font-size="6" font-weight="bold" fill="#9d174d">熱伝導シートA (空気層ゼロ)</text>
        <rect x="16" y="44" width="108" height="14" rx="2" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5"/>
        <text x="70" y="53.5" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#9a3412">HEAT_PLATE (アルミ銅板)</text>
        <rect x="16" y="60" width="108" height="10" rx="2" fill="#fef08a" stroke="#ca8a04"/>
        <text x="70" y="67.5" text-anchor="middle" font-size="6" font-weight="bold" fill="#854d0e">絶縁シートA/B (ショート防止)</text>
        <rect x="16" y="72" width="108" height="12" rx="2" fill="#64748b"/>
        <text x="70" y="80.5" text-anchor="middle" font-size="6.2" fill="#fff">Σグラファイト→Mg外装放熱</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#9a3412">B89 純正放熱サンドイッチ</text>
        <text x="142" y="43" font-size="7.1" fill="#7c2d12">・Ref.355放熱板＋Ref.357熱伝導シート</text>
        <text x="142" y="56" font-size="7.1" fill="#7c2d12">・Ref.356/361絶縁膜で電気ショート遮断</text>
        <text x="142" y="69" font-size="7.1" fill="#7c2d12">・ファン無しで長時間4K/8K収録を実現</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#9a3412">空気の隙間を熱伝導シートで埋め、ショートを防ぎつつ頭脳の熱をボディ全体へ素早く逃がす</text>
      `);

    case 'body_cfexpress_thermal_bridge':
      return wrapSvg(`
        <rect x="16" y="20" width="38" height="62" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
        <text x="35" y="46" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#92400e">CFexpress</text>
        <text x="35" y="58" text-anchor="middle" font-size="6" fill="#b45309">75°C発熱!</text>
        <rect x="56" y="24" width="16" height="54" rx="2" fill="#93c5fd" stroke="#2563eb"/>
        <text x="64" y="53" text-anchor="middle" font-size="6" font-weight="bold" fill="#1e3a8a">Pad</text>
        <rect x="74" y="20" width="48" height="62" rx="3" fill="#475569" stroke="#1e293b"/>
        <text x="98" y="48" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#f8fafc">Mg骨格へ</text>
        <text x="98" y="60" text-anchor="middle" font-size="6.2" fill="#38bdf8">−15°C放熱!</text>
        <path d="M48 50 H80" stroke="#ef4444" stroke-width="2.2"/>
        <polygon points="82,50 75,46 75,54" fill="#ef4444"/>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#1d4ed8">B90 CFexpress放熱ブリッジ</text>
        <text x="142" y="43" font-size="7.1" fill="#1e3a8a">・8K連写で高温になるカードの熱を吸収</text>
        <text x="142" y="56" font-size="7.1" fill="#1e3a8a">・柔らかいギャップパッドでMg骨格へ橋渡し</text>
        <text x="142" y="69" font-size="7.1" fill="#1e3a8a">・カードの高温速度低下(停止)を防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#1d4ed8">超高速メモリーカードの熱を柔らかい冷却クッションで金属ボディへ逃がし連写を守る</text>
      `);

    case 'body_external_cooling_vent_port':
      return wrapSvg(`
        <rect x="20" y="16" width="96" height="44" rx="4" fill="#e2e8f0" stroke="#334155"/>
        <text x="68" y="34" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#0f172a">ボディ内部独立ダクト</text>
        <path d="M52 84 V44 H110" fill="none" stroke="#0284c7" stroke-width="2.4"/>
        <polygon points="114,44 106,40 106,48" fill="#0284c7"/>
        <rect x="26" y="64" width="84" height="22" rx="3" fill="#dbeafe" stroke="#2563eb" stroke-dasharray="3 2"/>
        <text x="68" y="78" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#1d4ed8">冷却グリップ(着脱可)</text>
        <text x="90" y="56" text-anchor="middle" font-size="5.8" fill="#0369a1">撥水メッシュ</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#0369a1">B91 外部冷却グリップ連動口</text>
        <text x="142" y="43" font-size="7.1" fill="#0c4a6e">・普段は雨を弾きつつ自然対流で放熱</text>
        <text x="142" y="56" font-size="7.1" fill="#0c4a6e">・底面へ冷却グリップ装着でターボ送風</text>
        <text x="142" y="69" font-size="7.1" fill="#0c4a6e">・EOS R5 Mark II世代の二刀流冷却</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0369a1">普段は薄型軽量のまま、本気の8K撮影時だけ底の通気口からファンで強力冷却できる構造</text>
      `);

    case 'body_cable_protector_clamp':
      return wrapSvg(`
        <rect x="16" y="18" width="32" height="66" rx="3" fill="#475569" stroke="#1e293b"/>
        <text x="32" y="53" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#f8fafc">ボディ枠</text>
        <rect x="48" y="26" width="24" height="50" rx="3" fill="#1e293b" stroke="#0f172a"/>
        <text x="60" y="53" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fde047">固定具</text>
        <line x1="48" y1="38" x2="118" y2="38" stroke="#0284c7" stroke-width="3.5"/>
        <line x1="48" y1="64" x2="118" y2="64" stroke="#f59e0b" stroke-width="3.5"/>
        <text x="96" y="33" text-anchor="middle" font-size="6.2" fill="#0369a1">HDMIケーブル</text>
        <text x="96" y="76" text-anchor="middle" font-size="6.2" fill="#b45309">USB-Cケーブル</text>
        <path d="M98 50 H118" stroke="#dc2626" stroke-width="1.8"/>
        <text x="106" y="56" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#dc2626">引っ張っても安全!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#0f172a">B92 純正ケーブルプロテクター</text>
        <text x="142" y="43" font-size="7.1" fill="#334155">・HDMI＆USB-Cの根元をガッチリ挟む</text>
        <text x="142" y="56" font-size="7.1" fill="#334155">・足を引っかけても力をボディ側で吸収</text>
        <text x="142" y="69" font-size="7.1" fill="#334155">・高価な基板端子の根元破損をゼロに!</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#334155">ケーブルが抜けて配信が止まったり、端子がバキッと折れる事故を防ぐ命綱クランプ</text>
      `);

    case 'body_dual_usbc_25g_lan_bay':
      return wrapSvg(`
        <rect x="16" y="16" width="106" height="19" rx="4" fill="#dbeafe" stroke="#2563eb"/>
        <text x="69" y="28" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#1d4ed8">USB-C① 10Gbps転送/TC</text>
        <rect x="16" y="40" width="106" height="19" rx="4" fill="#fef3c7" stroke="#d97706"/>
        <text x="69" y="52" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#b45309">USB-C② 100W PD給電</text>
        <rect x="16" y="64" width="106" height="22" rx="3" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
        <text x="69" y="78" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#15803d">2.5GBASE-T 有線LAN</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#1d4ed8">B93 2026プロI/Oベイ(2×USB-C)</text>
        <text x="142" y="43" font-size="7.1" fill="#1e3a8a">・充電と高速データ転送を2口で同時実行</text>
        <text x="142" y="56" font-size="7.1" fill="#1e3a8a">・2.5G有線LANで67MP RAWも1秒即納</text>
        <text x="142" y="69" font-size="7.1" fill="#1e3a8a">・Sony α7R VI / FX5 / α1 II 最新規格</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#1d4ed8">「充電しながらデータ送信」できるUSB-C 2口と光回線級の2.5G有線LANを一挙集約</text>
      `);

    case 'body_audio_jack_jk1028':
      return wrapSvg(`
        <circle cx="32" cy="34" r="10" fill="#fee2e2" stroke="#dc2626" stroke-width="1.8"/>
        <text x="32" y="36.5" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#b91c1c">MIC</text>
        <circle cx="32" cy="66" r="10" fill="#dcfce7" stroke="#16a34a" stroke-width="1.8"/>
        <text x="32" y="68.5" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#15803d">HP</text>
        <rect x="48" y="20" width="32" height="62" rx="3" fill="#e2e8f0" stroke="#475569"/>
        <text x="64" y="48" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#0f172a">JK保持</text>
        <text x="64" y="59" text-anchor="middle" font-size="5.8" fill="#334155">金属枠</text>
        <path d="M80 51 H96" stroke="#f59e0b" stroke-width="3"/>
        <rect x="96" y="26" width="28" height="50" rx="3" fill="#fef3c7" stroke="#d97706"/>
        <text x="110" y="49" text-anchor="middle" font-size="6" font-weight="bold" fill="#92400e">独立</text>
        <text x="110" y="59" text-anchor="middle" font-size="5.6" fill="#92400e">JK-1028</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#991b1b">B94 3.5mm音声独立ブロック</text>
        <text x="142" y="43" font-size="7.1" fill="#7f1d1d">・Ref.205保持枠＋Ref.206独立フレキ</text>
        <text x="142" y="56" font-size="7.1" fill="#7f1d1d">・メイン基板から分離しデジタル雑音遮断</text>
        <text x="142" y="69" font-size="7.1" fill="#7f1d1d">・端子破損時もメイン基板を守り単体交換</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#991b1b">マイクとイヤホンの差し込み口を独立ブロックで守り、クリアな音質と修理性を両立</text>
      `);

    case 'body_mimo_wifi6e_nfc_coil':
      return wrapSvg(`
        <rect x="16" y="16" width="44" height="24" rx="3" fill="#fef3c7" stroke="#d97706"/>
        <text x="38" y="31" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#92400e">主アンテナ①</text>
        <rect x="76" y="16" width="46" height="24" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <text x="99" y="31" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#1d4ed8">第2 MIMO②</text>
        <text x="69" y="50" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#16a34a">2車線通信でWi-Fi 2倍速!</text>
        <rect x="20" y="58" width="98" height="26" rx="3" fill="#334155"/>
        <rect x="26" y="62" width="86" height="18" rx="2" fill="none" stroke="#f59e0b" stroke-width="2"/>
        <text x="69" y="73.5" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#fde047">フェライト＋NFC銅コイル</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#854d0e">B95 2×2 MIMO＆NFCコイル</text>
        <text x="142" y="43" font-size="7.1" fill="#713f12">・2本の離れたアンテナで電波の死角ゼロ</text>
        <text x="142" y="56" font-size="7.1" fill="#713f12">・5/6GHz高速転送(α1 II / α7 V対応)</text>
        <text x="142" y="69" font-size="7.1" fill="#713f12">・磁性フェライトで金属殻でもNFC反応</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#854d0e">2本目のWi-Fiアンテナで転送速度を倍増し、フェライト裏打ちNFCコイルでスマホと瞬時連携</text>
      `);

    case 'body_bottom_wp_potting':
      return wrapSvg(`
        <rect x="16" y="20" width="106" height="30" rx="3" fill="#475569" stroke="#1e293b"/>
        <text x="69" y="38" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#f8fafc">カメラ底面・縦グリ通線部</text>
        <rect x="16" y="50" width="106" height="14" rx="2" fill="#c4b5fd" stroke="#7c3aed" stroke-width="1.6"/>
        <text x="69" y="59.5" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#4c1d95">防水ポッティング樹脂充填</text>
        <path d="M22 76 Q44 68 68 76 T116 76" fill="none" stroke="#0284c7" stroke-width="2.2"/>
        <text x="69" y="86" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0369a1">濡れた地面・雪の浸水ブロック!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#5b21b6">B96 底面防水ポッティング</text>
        <text x="142" y="43" font-size="7.1" fill="#4c1d95">・純正Ref.17(A5025879A)防水樹脂封止</text>
        <text x="142" y="56" font-size="7.1" fill="#4c1d95">・パッキンで塞げない極小角部を樹脂充填</text>
        <text x="142" y="69" font-size="7.1" fill="#4c1d95">・雪上や雨上がりの路面直置きも安心</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#5b21b6">底面の複雑なすき間を工場で防水シリコーン樹脂で完全に埋め、下からの浸水をシャットアウト</text>
      `);

    case 'body_cinema_cage_threads':
      return wrapSvg(`
        <rect x="18" y="34" width="102" height="46" rx="4" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>
        <rect x="28" y="24" width="16" height="18" rx="2" fill="#475569"/>
        <rect x="61" y="24" width="16" height="18" rx="2" fill="#475569"/>
        <rect x="94" y="24" width="16" height="18" rx="2" fill="#475569"/>
        <text x="69" y="18" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0f172a">1/4-20 SUSネジ座 ×5箇所</text>
        <text x="69" y="58" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#1e293b">底の閉じた「袋穴」設計</text>
        <text x="69" y="70" text-anchor="middle" font-size="6.1" fill="#dc2626">基板突き抜け・浸水ゼロ!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#0f172a">B97 ケージ不要5点リグネジ座</text>
        <text x="142" y="43" font-size="7.1" fill="#334155">・天面3点＋左右2点へSUSインサート埋込</text>
        <text x="142" y="56" font-size="7.1" fill="#334155">・重い金属ケージなしでモニター等直付け</text>
        <text x="142" y="69" font-size="7.1" fill="#334155">・Sony FX3 / FX5(2026)シネマ標準</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#334155">ボディ自体に5つの頑丈な金属ネジ穴を直結し、ケージ不要で軽快にプロ機材を装着可能</text>
      `);

    case 'body_mi_shoe_fix_wp_stack':
      return wrapSvg(`
        <rect x="26" y="16" width="84" height="13" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <text x="68" y="25" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#0f172a">① SHELL PLATE (上部台座)</text>
        <rect x="18" y="33" width="100" height="12" rx="2" fill="#475569"/>
        <text x="68" y="41.5" text-anchor="middle" font-size="6.2" fill="#f8fafc">マグネシウム天井ルーフ</text>
        <rect x="24" y="49" width="88" height="13" rx="2" fill="#fef3c7" stroke="#d97706"/>
        <text x="68" y="58" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#92400e">② FIX PLATE (裏面当て板)</text>
        <rect x="34" y="66" width="68" height="16" rx="2" fill="#dbeafe" stroke="#2563eb"/>
        <text x="68" y="76.5" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#1d4ed8">③ 防水ブーツ＋MIS-2006</text>
        <line x1="36" y1="16" x2="36" y2="62" stroke="#dc2626" stroke-width="2"/>
        <line x1="100" y1="16" x2="100" y2="62" stroke="#dc2626" stroke-width="2"/>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#92400e">B98 ホットシュー4点防水構造</text>
        <text x="142" y="43" font-size="7.1" fill="#78350f">・Ref.311/324/325/327純正スタック</text>
        <text x="142" y="56" font-size="7.1" fill="#78350f">・天井を金属板で挟み重いストロボを支持</text>
        <text x="142" y="69" font-size="7.1" fill="#78350f">・21ピン端子を専用ゴムブーツで完全防水</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#92400e">天井の上下から金属板で挟んで強度を高め、デジタル音声端子の隙間をゴムブーツで防水</text>
      `);

    case 'body_top_wp_cushions_sv':
      return wrapSvg(`
        <rect x="16" y="18" width="106" height="66" rx="4" fill="#f1f5f9" stroke="#64748b"/>
        <rect x="24" y="24" width="42" height="10" rx="2" fill="#0284c7"/>
        <text x="45" y="31.5" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">TOP F3</text>
        <circle cx="94" cy="34" r="10" fill="none" stroke="#ea580c" stroke-width="3"/>
        <text x="94" y="36" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#c2410c">SV B</text>
        <rect x="24" y="46" width="54" height="32" rx="2" fill="none" stroke="#16a34a" stroke-width="3"/>
        <text x="51" y="64" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#15803d">RE LC A/B</text>
        <text x="98" y="66" text-anchor="middle" font-size="6" fill="#334155">独立気泡</text>
        <text x="98" y="75" text-anchor="middle" font-size="6" fill="#0369a1">止水堤防!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#0369a1">B99 4箇所防水クッション堤防</text>
        <text x="142" y="43" font-size="7.1" fill="#0c4a6e">・Ref.269 / 322 / 54 / 124 純正フォーム</text>
        <text x="142" y="56" font-size="7.1" fill="#0c4a6e">・水を吸わない独立気泡ウレタンで止水</text>
        <text x="142" y="69" font-size="7.1" fill="#0c4a6e">・外装合わせ目の浸水とビビり音を防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0369a1">外からは見えない段差やLCD凹部の裏に防水スポンジの堤防を巡らせ雨の侵入を食い止める</text>
      `);

    case 'body_np_sa100_dc_c2_pd':
      return wrapSvg(`
        <rect x="16" y="20" width="46" height="62" rx="4" fill="#dcfce7" stroke="#16a34a" stroke-width="1.6"/>
        <text x="39" y="39" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#166534">NP-SA100</text>
        <text x="39" y="52" text-anchor="middle" font-size="6.3" fill="#15803d">2670 mAh</text>
        <text x="39" y="64" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#15803d">1.3倍容量!</text>
        <text x="39" y="75" text-anchor="middle" font-size="5.6" fill="#166534">劣化診断付</text>
        <rect x="70" y="20" width="52" height="44" rx="4" fill="#fff7ed" stroke="#ea580c" stroke-width="1.6"/>
        <text x="96" y="38" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#9a3412">DC-C2</text>
        <text x="96" y="51" text-anchor="middle" font-size="6.2" fill="#c2410c">100W PD</text>
        <path d="M96 64 V84" stroke="#0284c7" stroke-width="2.6"/>
        <text x="96" y="92" text-anchor="middle" font-size="6" font-weight="bold" fill="#0369a1">無限連続給電</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#9a3412">B100 2026最新SA電源＆DC-C2</text>
        <text x="142" y="43" font-size="7.1" fill="#7c2d12">・新電池NP-SA100はFZ100比1.3倍長持ち</text>
        <text x="142" y="56" font-size="7.1" fill="#7c2d12">・カメラ画面で電池の健康度(劣化)を確認</text>
        <text x="142" y="69" font-size="7.1" fill="#7c2d12">・100W USB-PDカプラーで電池交換ゼロ</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#9a3412">2026年登場の1.3倍大容量バッテリーと100W直結カプラーで、長丁場の8K収録も安心</text>
      `);

    case 'body_c2pa_security_kensington':
      return wrapSvg(`
        <rect x="16" y="20" width="44" height="62" rx="4" fill="#e2e8f0" stroke="#334155"/>
        <rect x="28" y="38" width="20" height="10" rx="2" fill="#0f172a"/>
        <text x="38" y="32" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0f172a">盗難防止</text>
        <text x="38" y="62" text-anchor="middle" font-size="6" fill="#334155">ワイヤー錠</text>
        <text x="38" y="72" text-anchor="middle" font-size="5.8" fill="#475569">SUS裏当て</text>
        <rect x="68" y="20" width="54" height="62" rx="4" fill="#dbeafe" stroke="#2563eb" stroke-width="1.6"/>
        <text x="95" y="38" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#1d4ed8">C2PA HSM</text>
        <text x="95" y="52" text-anchor="middle" font-size="6.2" fill="#1e40af">秘密鍵署名</text>
        <text x="95" y="66" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#16a34a">本物証明!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#1d4ed8">B101 防犯スロット＆C2PA署名</text>
        <text x="142" y="43" font-size="7.1" fill="#1e3a8a">・遠隔カメラの盗難を防ぐ頑丈なワイヤー座</text>
        <text x="142" y="56" font-size="7.1" fill="#1e3a8a">・撮影瞬間にデジタル実印(C2PA)を刻印</text>
        <text x="142" y="69" font-size="7.1" fill="#1e3a8a">・AI偽造でない本物の写真・動画と証明</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#1d4ed8">物理的な盗難防止スロットと改ざん不可のデジタル実印チップで、機材と真実の両方を守る</text>
      `);

    default:
      return null;
  }
}
