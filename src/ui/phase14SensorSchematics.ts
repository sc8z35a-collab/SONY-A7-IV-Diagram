import { PartExplanation } from '../assemblies/types';

/**
 * 36 bespoke technical + beginner-friendly SVG schematics (320x118) for Phase 14:
 *  - Full-Frame Sensor & 5-Axis IBIS Standalone Micro (+24: S41–S64)
 *  - Micro Pixel Ultra-Nano Semiconductor Cross-Section (+12: M16–M27)
 */
export function renderPhase14SensorSchematicSvg(
  type: PartExplanation['diagramType'],
  wrap: (body: string) => string
): string | null {
  switch (type) {
    // =========================================================================
    // SENSOR STANDALONE MICRO (+24: S41–S64)
    // =========================================================================
    case 'sensor_glass_retainer_plate':
      return wrap(`
        <rect x="20" y="54" width="96" height="16" rx="2" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.4"/>
        <path d="M16 40 L34 40 L40 53 M120 40 L102 40 L96 53" fill="none" stroke="#334155" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M40 30 L40 48 M96 30 L96 48" stroke="#0d5bd9" stroke-width="1.8" stroke-dasharray="2 2"/>
        <polygon points="40,51 36,44 44,44" fill="#0d5bd9"/>
        <polygon points="96,51 92,44 100,44" fill="#0d5bd9"/>
        <rect x="24" y="72" width="88" height="12" rx="2" fill="#475569"/>
        <text x="45" y="65" font-size="7" font-weight="bold" fill="#0369a1">光学フィルター</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">Ref.502 SUS301バネ押圧(約4.5N): ガラス歪みゼロ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">フィルター押さえバネ板 (Ref.502)</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・写真立てのツメのように4辺を均一保持</text>
        <text x="144" y="61" font-size="6.5" fill="#334155">・ネジ直締めによるガラス歪み(複屈折)防止</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・IBIS急加速でも1μmもガタつかない</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・つや消し黒処理で斜め光の反射を抑制</text>
      `);

    case 'sensor_im_mask_plate':
      return wrap(`
        <rect x="20" y="24" width="96" height="66" rx="3" fill="#0f172a"/>
        <rect x="38" y="38" width="60" height="38" rx="1" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.2"/>
        <line x1="18" y1="20" x2="34" y2="33" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="3 2"/>
        <line x1="34" y1="33" x2="26" y2="38" stroke="#ef4444" stroke-width="1.4"/>
        <line x1="68" y1="16" x2="68" y2="57" stroke="#2563eb" stroke-width="2"/>
        <polygon points="68,61 64,53 72,53" fill="#2563eb"/>
        <text x="45" y="61" font-size="7" font-weight="bold" fill="#0369a1">36×24mm</text>
        <text x="12" y="112" font-size="7.1" fill="#1e293b">Ref.503 極薄遮光額縁(OD&gt;5): 端面ゴースト根絶</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#1e293b"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">極薄黒色遮光マスク (Ref.503)</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・映画館の黒縁のように不要光をピシャリ遮断</text>
        <text x="144" y="61" font-size="6.5" fill="#dc2626">・ガラス切断面で跳ねる赤スジ迷光を防止</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・厚さ0.12mmでフチ自体の回折反射を極小化</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・透過率10万分の1以下の真っ黒遮光仕様</text>
      `);

    case 'sensor_dust_catcher_tape':
      return wrap(`
        <rect x="24" y="20" width="88" height="36" rx="2" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.4"/>
        <path d="M30 34 Q48 26 68 34 T106 34" fill="none" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3 2"/>
        <path d="M48 56 L48 76 M70 56 L70 76 M92 56 L92 76" stroke="#64748b" stroke-width="1.3" stroke-dasharray="2 2"/>
        <rect x="22" y="78" width="92" height="14" rx="3" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
        <circle cx="48" cy="83" r="2.6" fill="#334155"/><circle cx="70" cy="84" r="3.1" fill="#334155"/><circle cx="92" cy="82" r="2.2" fill="#334155"/>
        <text x="36" y="48" font-size="7" fill="#0369a1">超音波振動(数千G)</text>
        <text x="12" y="112" font-size="7.1" fill="#854d0e">無揮発シリコーン粘着帯: 落ちたゴミを永久捕獲</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#713f12">落下ホコリ捕獲・粘着トラップ</text>
        <text x="144" y="47" font-size="6.5" fill="#854d0e">・超音波で振り落としたホコリの専用ゴミ箱</text>
        <text x="144" y="61" font-size="6.5" fill="#854d0e">・一度付いた塵は縦位置でも再浮遊しない</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・ガスを出さない特殊光学ゲル(曇りゼロ)</text>
        <text x="144" y="89" font-size="6.5" fill="#713f12">・3〜200μmの花粉・繊維を10年以上保持</text>
      `);

    case 'sensor_optical_cement_layers':
      return wrap(`
        <rect x="22" y="22" width="92" height="16" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="22" y="38" width="92" height="5" fill="#fde047" stroke="#eab308"/>
        <rect x="22" y="43" width="92" height="16" fill="#a7f3d0" stroke="#059669"/>
        <rect x="22" y="59" width="92" height="5" fill="#fde047" stroke="#eab308"/>
        <rect x="22" y="64" width="92" height="16" fill="#fbcfe8" stroke="#db2777"/>
        <line x1="68" y1="14" x2="68" y2="90" stroke="#2563eb" stroke-width="2.4"/>
        <polygon points="68,94 64,86 72,86" fill="#2563eb"/>
        <text x="26" y="33" font-size="6.6" fill="#0369a1">水晶 n≈1.52</text>
        <text x="26" y="54" font-size="6.6" fill="#065f46">1/4波長板</text>
        <text x="26" y="75" font-size="6.6" fill="#9d174d">IRカット</text>
        <text x="12" y="112" font-size="7.1" fill="#0369a1">n≈1.52屈折率整合UV光学ノリ: 界面反射&lt;0.01%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0c4a6e">UV光学セメント3層貼合 (OCA)</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・空気層をなくし3枚を光学的に1枚化</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・ガラスと同じ屈折率で界面ゴースト消滅</text>
        <text x="144" y="75" font-size="6.5" fill="#334155">・厚さ18μm・真空脱泡で気泡ゼロ硬化</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・-20℃〜+60℃の熱膨張差もしなやかに吸収</text>
      `);

    case 'sensor_filter_spacer_sheet':
      return wrap(`
        <rect x="22" y="24" width="92" height="14" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="22" y="38" width="14" height="24" fill="#334155"/>
        <rect x="100" y="38" width="14" height="24" fill="#334155"/>
        <rect x="22" y="62" width="92" height="14" fill="#e0f2fe" stroke="#0369a1"/>
        <rect x="34" y="78" width="68" height="12" fill="#1d6d7c"/>
        <circle cx="66" cy="22" r="2.8" fill="#ef4444"/>
        <path d="M66 24 L54 78 M66 24 L78 78" stroke="#ef4444" stroke-width="1" stroke-dasharray="2 2"/>
        <text x="44" y="53" font-size="6.8" fill="#334155">密閉聖域ギャップ</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">Ref.505 防塵スペーサー枠(t=0.35mm±10μm)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">防塵ギャップスペーサー (Ref.505)</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・二重サッシ枠のようにガラス間を360°密閉</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・適度な距離で表面ゴミの影をボカす効果</text>
        <text x="144" y="75" font-size="6.5" fill="#334155">・掃除できない内側の隙間に塵を絶対入れない</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・厚み公差±10μmでフランジ光学長を厳守</text>
      `);

    case 'sensor_piezo_drive_fpc':
      return wrap(`
        <rect x="18" y="24" width="26" height="58" rx="3" fill="#e2dac8" stroke="#78716c" stroke-width="1.4"/>
        <text x="23" y="56" font-size="7.5" font-weight="bold" fill="#44403c">PZT</text>
        <path d="M44 40 C66 40, 68 24, 92 24 L116 24" fill="none" stroke="#ea580c" stroke-width="5.5" stroke-linecap="round"/>
        <path d="M44 40 C66 40, 68 24, 92 24 L116 24" fill="none" stroke="#fef08a" stroke-width="1.5" stroke-dasharray="4 3"/>
        <path d="M48 70 Q58 60 68 70 T88 70 T108 70" fill="none" stroke="#dc2626" stroke-width="1.8"/>
        <text x="52" y="86" font-size="6.8" fill="#b91c1c">30–60Vpp / 50kHz</text>
        <text x="12" y="112" font-size="7.1" fill="#9a3412">高電圧2極独立FPC: 画像信号線へのノイズ遮断</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#7c2d12">超音波PZT専用・高電圧給電リボン</text>
        <text x="144" y="47" font-size="6.5" fill="#9a3412">・毎秒5万回の高圧交流を圧電バーへ直給電</text>
        <text x="144" y="61" font-size="6.5" fill="#9a3412">・繊細なSLVS画像ケーブルと完全別ルート</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・極薄25μmポリイミドで振動・IBISを無阻害</text>
        <text x="144" y="89" font-size="6.5" fill="#7c2d12">・耐屈曲圧延銅箔で数万回クリーニング対応</text>
      `);

    case 'sensor_hermetic_frit_n2':
      return wrap(`
        <rect x="20" y="24" width="96" height="12" rx="2" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.4"/>
        <rect x="20" y="36" width="12" height="34" fill="#94a3b8" stroke="#475569"/>
        <rect x="104" y="36" width="12" height="34" fill="#94a3b8" stroke="#475569"/>
        <rect x="20" y="70" width="96" height="16" rx="2" fill="#334155"/>
        <rect x="40" y="56" width="56" height="14" fill="#1d6d7c"/>
        <rect x="32" y="36" width="72" height="20" fill="#dbeafe" opacity="0.6"/>
        <text x="46" y="49" font-size="7.4" font-weight="bold" fill="#1d4ed8">Dry N₂ 密閉</text>
        <text x="12" y="112" font-size="7.1" fill="#1d4ed8">乾燥窒素封入＆ガラスフリット気密: 露点&lt;−50℃</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#1e3a8a">気密フリット封止＆乾燥窒素室</text>
        <text x="144" y="47" font-size="6.5" fill="#1e40af">・缶詰のように完全密閉し湿気ゼロN₂を封入</text>
        <text x="144" y="61" font-size="6.5" fill="#1e40af">・露点−50℃以下で真冬の急温度変化も無結露</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・有機RGBフィルターと金線の酸化劣化を防止</text>
        <text x="144" y="89" font-size="6.5" fill="#334155">・熱膨張整合ガラスフリットで歪み・剥離ゼロ</text>
      `);

    case 'sensor_ob_shield_border':
      return wrap(`
        <rect x="18" y="20" width="100" height="70" rx="3" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
        <rect x="32" y="32" width="72" height="46" rx="1" fill="#1d6d7c" stroke="#38bdf8" stroke-width="1.2"/>
        <text x="48" y="58" font-size="7.2" font-weight="bold" fill="#ffffff">有効画素</text>
        <text x="34" y="29" font-size="6.4" fill="#facc15">OB完全遮光帯 (黒=0基準)</text>
        <text x="30" y="86" font-size="6.4" fill="#cbd5e1">総画素 − 有効画素 ≈ 110万</text>
        <text x="12" y="112" font-size="7.1" fill="#1e293b">OBクランプ: S_clean = S_raw − Mean(OB暗電流)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">オプティカルブラック (OB) 基準帯</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・はかりの「0(風袋引き)」を行う真っ暗画素</text>
        <text x="144" y="61" font-size="6.5" fill="#334155">・外周を金属膜で遮光し熱ノイズ量だけ計測</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・毎フレーム自動引き算で黒浮き・横縞消去</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・カタログの総画素と有効画素の差の正体！</text>
      `);

    case 'sensor_lga_solder_underfill':
      return wrap(`
        <rect x="20" y="24" width="96" height="22" rx="2" fill="#475569" stroke="#1e293b"/>
        <rect x="20" y="66" width="96" height="20" rx="2" fill="#1b5649" stroke="#0f3d33"/>
        ${[34, 48, 62, 76, 90, 102].map((cx) => `<circle cx="${cx}" cy="56" r="5" fill="#cbd5e1" stroke="#475569"/>`).join('')}
        <path d="M20 46 L31 46 L31 66 L20 66 Z" fill="#f59e0b" opacity="0.85"/>
        <path d="M105 46 L116 46 L116 66 L105 66 Z" fill="#f59e0b" opacity="0.85"/>
        <text x="41" y="38" font-size="7" fill="#ffffff">HTCC 筐体</text>
        <text x="43" y="79" font-size="7" fill="#a7f3d0">センサー基板</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">320ピンLGAハンダ球(L≈0.15nH)＋4隅耐衝撃樹脂</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#78350f">320ピンLGAハンダ＆補強樹脂</text>
        <text x="144" y="47" font-size="6.5" fill="#78350f">・300本超の極短金属球で電気と熱を一括直結</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・高さ0.25mmで12.5Gbps高速通信を無劣化</text>
        <text x="144" y="75" font-size="6.5" fill="#78350f">・四隅をエポキシ補強し落下・IBIS亀裂を防止</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・中央大面積パッドがチップの熱を基板へ放出</text>
      `);

    case 'sensor_mlcc_decoupling_bank':
      return wrap(`
        <rect x="18" y="20" width="100" height="16" rx="2" fill="#1d6d7c"/>
        <text x="42" y="31" font-size="7" fill="#ffffff">CMOS 撮像ダイ</text>
        <rect x="18" y="42" width="100" height="14" rx="2" fill="#1b5649"/>
        ${[26, 40, 54, 68, 82, 96].map((x) => `<rect x="${x}" y="60" width="10" height="8" rx="1" fill="#d97706" stroke="#92400e"/>`).join('')}
        ${[26, 40, 54, 68, 82, 96].map((x) => `<rect x="${x}" y="72" width="10" height="8" rx="1" fill="#eab308" stroke="#854d0e"/>`).join('')}
        <path d="M31 60 L31 36 M68 60 L68 36 M101 60 L101 36" stroke="#38bdf8" stroke-width="1.3" stroke-dasharray="2 2"/>
        <text x="12" y="112" font-size="7.1" fill="#92400e">ダイ真裏48連MLCCタンク: 瞬間電圧ブレ &lt; 2 mV</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#78350f">基板裏48連MLCC電源タンク群</text>
        <text x="144" y="47" font-size="6.5" fill="#78350f">・マンション屋上の給水タンクの超ミニ電気版</text>
        <text x="144" y="61" font-size="6.5" fill="#78350f">・120fps同時動作の大電流スパイクを即吸収</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・ダイ真裏1mm以内に配置し電源リップル消去</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・2.8V/1.05V/1.8Vの3系統を独立安定化</text>
      `);

    case 'sensor_isl_fpc':
      return wrap(`
        <rect x="18" y="24" width="32" height="26" rx="3" fill="#16a34a" stroke="#14532d"/>
        <text x="23" y="40" font-size="7" font-weight="bold" fill="#ffffff">Hall</text>
        <path d="M50 37 C72 37, 72 68, 94 68 L116 68" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/>
        <path d="M50 37 C72 37, 72 68, 94 68 L116 68" fill="none" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="3 2"/>
        <rect x="18" y="64" width="44" height="18" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-dasharray="2 2"/>
        <text x="22" y="76" font-size="6.4" fill="#b91c1c">ISD電力線分離</text>
        <text x="12" y="112" font-size="7.1" fill="#b45309">Ref.506 ISL-2009: 0.2μm分解能の専用位置配線</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#78350f">IBIS位置検知フレキ (ISL-2009)</text>
        <text x="144" y="47" font-size="6.5" fill="#78350f">・センサー位置の小さな声を聴く専用ケーブル</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・大電流モーター線と別経路で雑音混入ゼロ</text>
        <text x="144" y="75" font-size="6.5" fill="#78350f">・髪の毛の300分の1以下のズレを10kHz計測</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・柔らかS字ループで1億回の微動に耐久</text>
      `);

    case 'sensor_isd_fpc':
      return wrap(`
        <rect x="18" y="24" width="34" height="28" rx="3" fill="#c86432" stroke="#7c2d12"/>
        <text x="23" y="41" font-size="7" font-weight="bold" fill="#ffffff">VCM</text>
        <path d="M52 38 L86 38 C108 38, 108 74, 86 74 L24 74" fill="none" stroke="#ea580c" stroke-width="8" stroke-linecap="round"/>
        <path d="M56 38 L84 38 C102 38, 102 74, 84 74 L32 74" fill="none" stroke="#fde047" stroke-width="2" stroke-dasharray="5 3"/>
        <text x="24" y="90" font-size="6.8" fill="#9a3412">最大 1.5A PWM (R &lt; 0.15Ω)</text>
        <text x="12" y="112" font-size="7.1" fill="#9a3412">Ref.507 ISD-2002: 低抵抗・無反力U字パワー配線</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#7c2d12">IBISモーター駆動フレキ (ISD-2002)</text>
        <text x="144" y="47" font-size="6.5" fill="#9a3412">・手ブレ補正の筋肉を動かす太銅パワー線</text>
        <text x="144" y="61" font-size="6.5" fill="#9a3412">・3軸コイルへ最大1.5Aを低ロス・低発熱供給</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・ゼロテンションU字カーブで±3mm滑らか追従</text>
        <text x="144" y="89" font-size="6.5" fill="#7c2d12">・ISL-2009と分離し電流スパイクノイズ防止</text>
      `);

    case 'sensor_tex_module':
      return wrap(`
        <rect x="20" y="20" width="96" height="72" rx="6" fill="#cbd5e1" stroke="#334155" stroke-width="1.8"/>
        <rect x="38" y="34" width="60" height="44" rx="3" fill="#ffffff" stroke="#475569" stroke-width="1.2"/>
        <circle cx="68" cy="27" r="3.5" fill="#1e293b"/>
        <circle cx="30" cy="79" r="3.5" fill="#1e293b"/>
        <circle cx="106" cy="79" r="3.5" fill="#1e293b"/>
        <rect x="44" y="79" width="22" height="8" rx="1" fill="#3b82f6"/>
        <rect x="70" y="79" width="22" height="8" rx="1" fill="#3b82f6"/>
        <text x="48" y="59" font-size="7.2" font-weight="bold" fill="#0f172a">TEX-5810</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">Ref.510 TEX-5810: 全可動域で像面平行度&lt;10μm</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">IBIS統合骨格ユニット (TEX-5810)</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・磁石・球・案内溝をまとめる時計の地板</text>
        <text x="144" y="61" font-size="6.5" fill="#334155">・10N超の磁気吸引力でも歪まない高剛性枠</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・センサーが端まで動いても傾き0.01°未満</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・工場で単体検査・交換可能な中枢ブロック</text>
      `);

    case 'sensor_imager_fix_shafts':
      return wrap(`
        <polygon points="68,20 26,82 110,82" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="3 2"/>
        ${[
          [68, 26],
          [32, 78],
          [104, 78],
        ]
          .map(
            ([x, y]) =>
              `<circle cx="${x}" cy="${y}" r="8" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="3.5" fill="#f59e0b"/>`
          )
          .join('')}
        <text x="48" y="62" font-size="7" font-weight="bold" fill="#b91c1c">非再利用指定</text>
        <text x="12" y="112" font-size="7.1" fill="#b91c1c">Ref.501 3点段付き固定軸(±3μm): 片ボケ防止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#7f1d1d">非再利用 芯出し固定軸 (Ref.501)</text>
        <text x="144" y="47" font-size="6.5" fill="#7f1d1d">・公式SMで「外したら新品交換必須」の3本柱</text>
        <text x="144" y="61" font-size="6.5" fill="#334155">・3点支持でガタなくセンサー平面を一発決定</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・段差精度±3μmでF1.2の片ボケを完全防止</text>
        <text x="144" y="89" font-size="6.5" fill="#7f1d1d">・微細ななじみ変形で0.005mmの遊びも殺す</text>
      `);

    case 'sensor_ball_retainer_cage':
      return wrap(`
        <rect x="20" y="20" width="96" height="72" rx="8" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
        <rect x="38" y="34" width="60" height="44" rx="4" fill="#ffffff" stroke="#94a3b8"/>
        ${[
          [68, 27],
          [31, 78],
          [105, 78],
        ]
          .map(
            ([x, y]) =>
              `<circle cx="${x}" cy="${y}" r="6.5" fill="#fef9c3" stroke="#ca8a04"/><circle cx="${x}" cy="${y}" r="3.8" fill="#1e293b"/>`
          )
          .join('')}
        <text x="45" y="59" font-size="6.8" fill="#334155">x_ball = ½ x_stage</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">POM 3球同期ケージ＋PFPEグリス: μ ≈ 0.0015</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">セラミック球リテーナーケージ板</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・3つのセラミック玉が迷子にならない案内枠</text>
        <text x="144" y="61" font-size="6.5" fill="#334155">・ステージの半分の移動距離を3球同時同期</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・無揮発フッ素グリス溜めで−30℃でも滑らか</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・転がり摩擦0.0015で羽根のように軽く動作</text>
      `);

    case 'sensor_vcm_coil_bobbins':
      return wrap(`
        <rect x="20" y="26" width="96" height="48" rx="14" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
        <rect x="28" y="34" width="80" height="32" rx="9" fill="none" stroke="#c86432" stroke-width="5"/>
        <rect x="38" y="43" width="60" height="14" rx="4" fill="#ffffff" stroke="#b45309"/>
        <rect x="102" y="68" width="16" height="12" rx="2" fill="#eab308" stroke="#854d0e"/>
        <line x1="94" y1="66" x2="106" y2="74" stroke="#c86432" stroke-width="2"/>
        <text x="45" y="53" font-size="6.6" font-weight="bold" fill="#7c2d12">LCP 260℃</text>
        <text x="12" y="112" font-size="7.1" fill="#9a3412">極薄0.2mm耐熱ボビン×3: 整列巻き占積率78%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#c86432"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#7c2d12">VCMコイル耐熱ボビン＆中継端子</text>
        <text x="144" y="47" font-size="6.5" fill="#9a3412">・極細φ0.1mm銅線を整列保持する糸巻き枠</text>
        <text x="144" y="61" font-size="6.5" fill="#9a3412">・耐熱260℃のLCP樹脂でコイル膨張を防止</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・隙間なく巻き推力を約15%底上げ(占積78%)</text>
        <text x="144" y="89" font-size="6.5" fill="#7c2d12">・金メッキ中継端子で付け根の振動断線を防止</text>
      `);

    case 'sensor_hall_bias_magnets':
      return wrap(`
        <rect x="20" y="24" width="44" height="20" fill="#dbeafe" stroke="#2563eb" stroke-width="1.4"/>
        <rect x="64" y="24" width="44" height="20" fill="#fee2e2" stroke="#dc2626" stroke-width="1.4"/>
        <text x="38" y="37" font-size="8.5" font-weight="bold" fill="#1d4ed8">N</text>
        <text x="82" y="37" font-size="8.5" font-weight="bold" fill="#b91c1c">S</text>
        <rect x="16" y="18" width="96" height="5" fill="#475569"/>
        <rect x="54" y="54" width="20" height="12" rx="2" fill="#16a34a"/>
        <line x1="26" y1="86" x2="104" y2="70" stroke="#0284c7" stroke-width="2"/>
        <text x="40" y="92" font-size="6.8" fill="#0369a1">V_Hall ∝ x (直線誤差&lt;0.2%)</text>
        <text x="12" y="112" font-size="7.1" fill="#1d4ed8">3軸専用リニア磁気ものさし: 位置分解能 &lt;0.2μm</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#1e3a8a">ホール専用サブ磁石＆磁気仕切り</text>
        <text x="144" y="47" font-size="6.5" fill="#1e40af">・暗闇で現在地を0.2μm精度で測る磁気尺</text>
        <text x="144" y="61" font-size="6.5" fill="#1e40af">・パーマロイ仕切りでVCMコイル磁場を遮断</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・温度変化に強いSmCo系で基準点がズレない</text>
        <text x="144" y="89" font-size="6.5" fill="#334155">・16枚ピクセルシフト0.5画素移動の命綱！</text>
      `);

    case 'sensor_im_radiation_sheet_b':
      return wrap(`
        <rect x="20" y="24" width="96" height="58" rx="4" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
        <circle cx="68" cy="53" r="14" fill="#ef4444" opacity="0.85"/>
        <path d="M52 53 L28 53 M84 53 L108 53 M68 38 L68 28 M68 68 L68 78" stroke="#f97316" stroke-width="2.2"/>
        <polygon points="26,53 33,49 33,57" fill="#f97316"/>
        <polygon points="110,53 103,49 103,57" fill="#f97316"/>
        <text x="56" y="56" font-size="6.8" font-weight="bold" fill="#ffffff">HOT</text>
        <text x="12" y="112" font-size="7.1" fill="#c2410c">Ref.508 グラファイトB: 熱伝導1300W/m·K(銅3倍)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#7c2d12">主放熱グラファイトB (Ref.508)</text>
        <text x="144" y="47" font-size="6.5" fill="#9a3412">・センサー背中に貼る「銅の3倍速い冷えピタ」</text>
        <text x="144" y="61" font-size="6.5" fill="#9a3412">・4K60pの局所ホットスポットを瞬時に拡散</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・厚さ0.08mm・0.3gでIBISの重荷ゼロ</text>
        <text x="144" y="89" font-size="6.5" fill="#7c2d12">・両面絶縁PET保護で基板ショートを完全防止</text>
      `);

    case 'sensor_im_radiation_sheet_d':
      return wrap(`
        <rect x="20" y="32" width="36" height="44" rx="3" fill="#1d6d7c"/>
        <text x="24" y="57" font-size="6.8" fill="#ffffff">センサー</text>
        <path d="M56 44 C70 44, 70 62, 86 62" fill="none" stroke="#1e293b" stroke-width="7" stroke-linecap="round"/>
        <path d="M58 44 C70 44, 70 62, 84 62" fill="none" stroke="#f97316" stroke-width="2" stroke-dasharray="3 2"/>
        <rect x="86" y="26" width="30" height="58" rx="3" fill="#64748b"/>
        <text x="90" y="57" font-size="6.6" fill="#ffffff">Mg骨格</text>
        <text x="12" y="112" font-size="7.1" fill="#c2410c">Ref.509 側面放熱シートD: 6℃冷却で暗電流半減</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#7c2d12">側面放熱ブリッジD (Ref.509)</text>
        <text x="144" y="47" font-size="6.5" fill="#9a3412">・センサー横っ腹から金属ボディへ熱を橋渡し</text>
        <text x="144" y="61" font-size="6.5" fill="#9a3412">・しなやかにたわみIBIS±3mm動作を無阻害</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・6℃冷やすだけで暗所熱ノイズが半分に激減</text>
        <text x="144" y="89" font-size="6.5" fill="#7c2d12">・背面Bと連携しファンレス長時間録画を実現</text>
      `);

    case 'sensor_as_heat_plate_top':
      return wrap(`
        <rect x="22" y="20" width="92" height="10" rx="2" fill="#1e293b"/>
        <rect x="22" y="32" width="92" height="16" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <rect x="28" y="50" width="80" height="10" rx="2" fill="#38bdf8" opacity="0.6" stroke="#0284c7"/>
        <rect x="22" y="64" width="92" height="22" rx="3" fill="#64748b"/>
        <path d="M46 64 L46 22 M68 64 L68 22 M90 64 L90 22" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="2 2"/>
        <text x="42" y="43" font-size="6.8" font-weight="bold" fill="#0f172a">Al板 (Ref.453)</text>
        <text x="42" y="78" font-size="6.8" fill="#ffffff">IBISユニット上部</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">Ref.453/454/470 3層上部放熱: 軍艦部へ熱を煙突排出</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">上部3層放熱ブリッジ (Ref.453〜)</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・上へ昇る熱をカメラ天井へ逃がす放熱フタ</text>
        <text x="144" y="61" font-size="6.5" fill="#334155">・アルミ板＋黒グラファイト＋スペーサー3層</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・センサーだけでなくIBISコイル発熱も同時冷却</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・可動枠と非接触を保ちつつ上方向放熱を増設</text>
      `);

    case 'sensor_new_truster_screws':
      return wrap(`
        <path d="M52 24 C70 20, 88 38, 84 56 C80 74, 54 84, 38 74 C22 64, 34 28, 52 24 Z" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
        <circle cx="58" cy="54" r="24" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 2"/>
        <circle cx="56" cy="24" r="3" fill="#dc2626"/>
        <circle cx="84" cy="56" r="3" fill="#dc2626"/>
        <circle cx="38" cy="74" r="3" fill="#dc2626"/>
        <text x="41" y="56" font-size="6.8" font-weight="bold" fill="#0f172a">3葉おにぎり</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">Ref.511 M1.7×2.5 NEW TRUSTER: 無接着・耐振ロック</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">緩み止め特殊ねじ (Ref.511)</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・断面がおにぎり型で3方向から強く噛み合う</text>
        <text x="144" y="61" font-size="6.5" fill="#dc2626">・超音波・IBIS・シャッター衝撃でも緩みゼロ</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・液体接着剤を使わずセンサー曇りガスゼロ！</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・金属粉が出にくいクリーン塑性転造ねじ山</text>
      `);

    case 'sensor_esd_ground_leaf':
      return wrap(`
        <rect x="18" y="24" width="38" height="24" rx="3" fill="#94a3b8" stroke="#334155"/>
        <text x="22" y="39" font-size="6.6" fill="#0f172a">可動枠</text>
        <circle cx="37" cy="58" r="7" fill="#1e293b"/>
        <text x="20" y="77" font-size="6.2" fill="#475569">絶縁セラミック球</text>
        <rect x="18" y="80" width="98" height="12" rx="2" fill="#475569"/>
        <path d="M56 36 C78 36, 70 58, 92 58 C108 58, 108 78, 96 80" fill="none" stroke="#eab308" stroke-width="3.2"/>
        <path d="M88 46 L96 54 L90 54 L97 64" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <text x="12" y="112" font-size="7.1" fill="#854d0e">t=0.04mm CuBe2極薄アース: R&lt;20mΩ / k&lt;0.05N/mm</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#713f12">IBIS浮遊ステージ ESD接地バネ</text>
        <text x="144" y="47" font-size="6.5" fill="#854d0e">・絶縁玉で宙に浮いた枠の静電気を逃がす</text>
        <text x="144" y="61" font-size="6.5" fill="#854d0e">・0.04mm極薄S字で動きを一切邪魔しない</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・接地抵抗20mΩ以下でノイズ線・放電破壊防止</text>
        <text x="144" y="89" font-size="6.5" fill="#713f12">・ベリリウム銅金メッキで1億回変位に耐久</text>
      `);

    case 'sensor_dra_qr_plate':
      return wrap(`
        <rect x="28" y="18" width="76" height="72" rx="4" fill="#ffffff" stroke="#334155" stroke-width="1.6"/>
        <rect x="36" y="26" width="16" height="16" fill="none" stroke="#0f172a" stroke-width="3"/>
        <rect x="41" y="31" width="6" height="6" fill="#0f172a"/>
        <rect x="80" y="26" width="16" height="16" fill="none" stroke="#0f172a" stroke-width="3"/>
        <rect x="85" y="31" width="6" height="6" fill="#0f172a"/>
        <rect x="36" y="66" width="16" height="16" fill="none" stroke="#0f172a" stroke-width="3"/>
        <rect x="41" y="71" width="6" height="6" fill="#0f172a"/>
        <rect x="58" y="32" width="6" height="6" fill="#0f172a"/><rect x="68" y="42" width="6" height="6" fill="#0f172a"/>
        <rect x="58" y="50" width="8" height="8" fill="#0284c7"/><rect x="74" y="56" width="6" height="6" fill="#0f172a"/>
        <rect x="62" y="68" width="10" height="6" fill="#0f172a"/><rect x="84" y="68" width="10" height="10" fill="#0f172a"/>
        <text x="12" y="112" font-size="7.1" fill="#0f172a">Sony Imager DRA Data QR: 個体別カルテ自動補正</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">工場個体校正QRタグ (DRA Data)</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・1枚ごとの画素のクセを記した「専用カルテ」</text>
        <text x="144" y="61" font-size="6.5" fill="#334155">・欠陥画素・感度ムラ・色被り係数を紐付け</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・BIONZがリアルタイム補正し完璧な画質に</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・修理でセンサー交換時に治具で読込書込</text>
      `);

    case 'sensor_pcb_emi_shield_can':
      return wrap(`
        <rect x="20" y="64" width="96" height="18" rx="2" fill="#1b5649"/>
        <rect x="44" y="52" width="48" height="12" rx="1" fill="#22252b"/>
        <path d="M28 64 L28 32 L108 32 L108 64" fill="#cbd5e1" fill-opacity="0.35" stroke="#475569" stroke-width="2.5"/>
        <path d="M56 46 Q68 38 80 46" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="2 2"/>
        <path d="M98 20 L114 20" stroke="#3b82f6" stroke-width="2"/>
        <text x="48" y="26" font-size="6.8" font-weight="bold" fill="#1d4ed8">非磁性 μr≈1.0</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">洋白(ニッケル銀)0.15mm缶: 磁石無干渉・EMI−35dB</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">非磁性・洋白EMIシールド缶</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・高速SLVS通信の電波ノイズを閉じ込めるフタ</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・磁石にくっつかない洋白製でIBIS無干渉！</text>
        <text x="144" y="75" font-size="6.5" fill="#334155">・100MHz〜10GHzの邪魔な電波を98%超遮断</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・厚さ0.15mm・約0.6gの超軽量絞り加工</text>
      `);

    // =========================================================================
    // MICRO PIXEL ULTRA-NANO SEMICONDUCTOR (+12: M16–M27)
    // =========================================================================
    case 'micro_pdaf_ocl_mask':
      return wrap(`
        <path d="M24 38 Q68 12 112 38 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.6"/>
        <rect x="24" y="54" width="42" height="28" rx="2" fill="#3b82f6" opacity="0.75"/>
        <rect x="70" y="54" width="42" height="28" rx="2" fill="#10b981" opacity="0.75"/>
        <line x1="34" y1="14" x2="88" y2="66" stroke="#2563eb" stroke-width="1.8"/>
        <line x1="102" y1="14" x2="48" y2="66" stroke="#059669" stroke-width="1.8"/>
        <text x="37" y="71" font-size="7.2" font-weight="bold" fill="#ffffff">左目 L</text>
        <text x="82" y="71" font-size="7.2" font-weight="bold" fill="#ffffff">右目 R</text>
        <text x="12" y="112" font-size="7.1" fill="#0369a1">2×1共有OCL像面位相差AF: ズレΔxから合焦を一発計算</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0c4a6e">像面位相差AF 共有OCL＆遮光</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・画素の中に「左目・右目」を仕込む構造</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・左右像のズレ幅からピント位置を0.02秒算出</text>
        <text x="144" y="75" font-size="6.5" fill="#334155">・2×1共有レンズで光を捨てずEV−4暗所対応</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・759点が画面の94%をカバーし瞳をロック</text>
      `);

    case 'micro_sin_etch_stop':
      return wrap(`
        <rect x="20" y="20" width="96" height="20" fill="#86efac" stroke="#16a34a"/>
        <rect x="20" y="42" width="96" height="12" fill="#a855f7" stroke="#6b21a8"/>
        <rect x="20" y="56" width="96" height="28" fill="#3b82f6" stroke="#1d4ed8"/>
        <line x1="88" y1="14" x2="88" y2="88" stroke="#facc15" stroke-width="2.4"/>
        <text x="26" y="33" font-size="6.6" fill="#14532d">CFA n≈1.55</text>
        <text x="24" y="51" font-size="6.6" font-weight="bold" fill="#ffffff">SiN 25nm n≈2.0</text>
        <text x="26" y="73" font-size="6.8" fill="#ffffff">Si n≈3.9</text>
        <text x="12" y="112" font-size="7.1" fill="#6b21a8">n_SiN≈√(n₁n₂): 中間スロープ膜で反射損失を消去</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#581c87">SiN 25nm整合＆保護ストップ膜</text>
        <text x="144" y="47" font-size="6.5" fill="#581c87">・CFA(1.5)とSi(3.9)の中間(2.0)を繋ぐスロープ</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・境目の光の跳ね返りを打ち消し透過率98%超</text>
        <text x="144" y="75" font-size="6.5" fill="#581c87">・微細加工時にシリコンを守る工場のまな板</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・有機色素からの水分・不純物侵入もブロック</text>
      `);

    case 'micro_neg_fixed_charge':
      return wrap(`
        <rect x="20" y="24" width="96" height="18" fill="#0ea5e9" stroke="#0369a1"/>
        <rect x="20" y="42" width="96" height="14" fill="#fde047" opacity="0.8"/>
        <rect x="20" y="56" width="96" height="30" fill="#1e3a8a"/>
        <text x="26" y="36" font-size="7.4" font-weight="bold" fill="#ffffff">− − − − − Al₂O₃/HfO₂</text>
        <text x="25" y="52" font-size="7.2" font-weight="bold" fill="#854d0e">+ + + + + 正孔バリア</text>
        <text x="34" y="75" font-size="7" fill="#93c5fd">暗電流ノイズ封鎖！</text>
        <text x="12" y="112" font-size="7.1" fill="#0369a1">ALD 5nm固定負電荷膜: 高温60℃でも暗電流&lt;2e⁻/s</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0c4a6e">5nm固定負電荷膜 (Al₂O₃/HfO₂)</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・永久にマイナス帯電した原子層堆積5nm膜</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・表面にプラスの粒(正孔)を集めてバリア化</text>
        <text x="144" y="75" font-size="6.5" fill="#334155">・夜景のザラザラ白点(暗電流)を1/10以下に</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・Sony Exmor R/RS驚異の低ノイズの秘密！</text>
      `);

    case 'micro_p_well_pinning':
      return wrap(`
        <rect x="20" y="22" width="96" height="14" fill="#f43f5e" stroke="#be123c"/>
        <rect x="28" y="36" width="80" height="34" rx="8" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="20" y="70" width="96" height="16" fill="#64748b"/>
        <circle cx="52" cy="54" r="3.5" fill="#fef08a"/><circle cx="68" cy="56" r="3.5" fill="#fef08a"/><circle cx="84" cy="52" r="3.5" fill="#fef08a"/>
        <text x="34" y="32" font-size="6.8" font-weight="bold" fill="#ffffff">P++ 表面ピニング蓋</text>
        <text x="38" y="47" font-size="6.6" fill="#0c4a6e">N型 埋め込み電子井戸</text>
        <text x="12" y="112" font-size="7.1" fill="#be123c">PPD(HAD)構造: 完全空乏転送(CTE&gt;99.99%)残像ゼロ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#881337">埋め込みPD 表面P++ピニング層</text>
        <text x="144" y="47" font-size="6.5" fill="#881337">・電子バケツを地中に埋めてP++の蓋をする</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・1粒も残さず完全転送でき残像が完全ゼロ</text>
        <text x="144" y="75" font-size="6.5" fill="#881337">・真のCDS動作を可能にしリセット雑音を消去</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・日本発の偉大な発明(寺西氏/Sony HAD)</text>
      `);

    case 'micro_anti_blooming_ofd':
      return wrap(`
        <path d="M20 30 L20 82 L76 82 L76 46 L94 46 L94 82 L114 82" fill="none" stroke="#1e293b" stroke-width="2.2"/>
        <rect x="22" y="48" width="52" height="32" fill="#38bdf8" opacity="0.65"/>
        <path d="M64 48 Q84 36 102 64" fill="none" stroke="#f59e0b" stroke-width="2.4"/>
        <polygon points="104,68 97,62 106,59" fill="#f59e0b"/>
        <text x="29" y="68" font-size="7" font-weight="bold" fill="#0c4a6e">満タンPD</text>
        <text x="76" y="41" font-size="6.5" font-weight="bold" fill="#b45309">ABG堰</text>
        <text x="96" y="78" font-size="6.5" font-weight="bold" fill="#dc2626">VDD</text>
        <text x="12" y="112" font-size="7.1" fill="#b45309">アンチブルーミングOFD: 1000倍強光でも滲み&lt;0.1%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#78350f">非常放水路 OFD / ABG障壁</text>
        <text x="144" y="47" font-size="6.5" fill="#78350f">・ダムの非常放水路のように溢れた電子を排水</text>
        <text x="144" y="61" font-size="6.5" fill="#78350f">・太陽撮影でも隣の画素への白滲みを防止</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・電子シャッターの一括リセット口としても活躍</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・LOFICでは捨てずに大容量タンクへ貯蓄！</text>
      `);

    case 'micro_fd_dcg_switch':
      return wrap(`
        <rect x="24" y="30" width="24" height="52" rx="3" fill="#dbeafe" stroke="#2563eb" stroke-width="1.6"/>
        <rect x="26" y="40" width="20" height="40" fill="#2563eb" opacity="0.65"/>
        <text x="24" y="25" font-size="6.6" font-weight="bold" fill="#1d4ed8">HCG(暗)</text>
        <rect x="52" y="52" width="18" height="10" rx="2" fill="#f59e0b" stroke="#92400e"/>
        <text x="53" y="49" font-size="6.2" font-weight="bold" fill="#92400e">DCG</text>
        <rect x="74" y="30" width="42" height="52" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
        <rect x="76" y="60" width="38" height="20" fill="#f59e0b" opacity="0.65"/>
        <text x="76" y="25" font-size="6.6" font-weight="bold" fill="#b45309">LCG(明)</text>
        <text x="12" y="112" font-size="7.1" fill="#1d4ed8">デュアル変換ゲイン: ΔV=Q/C_FD (HCG 4×感度切替)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#1e3a8a">FD計量節＆DCG切替スイッチ</text>
        <text x="144" y="47" font-size="6.5" fill="#1e40af">・デュアルネイティブISOの物理的な正体！</text>
        <text x="144" y="61" font-size="6.5" fill="#1e40af">・暗所は細い試験管(HCG)で1電子を大電圧化</text>
        <text x="144" y="75" font-size="6.5" fill="#b45309">・明所は太いコップ(LCG)に繋ぎ白飛び防止</text>
        <text x="144" y="89" font-size="6.5" fill="#334155">・暗所読出ノイズ&lt;1.0e⁻で光子1粒を識別</text>
      `);

    case 'micro_bsc_vertical_via':
      return wrap(`
        <rect x="20" y="20" width="96" height="22" rx="2" fill="#3b82f6"/>
        <rect x="20" y="42" width="96" height="18" fill="#e2e8f0"/>
        <rect x="20" y="60" width="96" height="24" rx="2" fill="#d97706"/>
        <rect x="44" y="28" width="9" height="46" rx="1" fill="#facc15" stroke="#854d0e" stroke-width="1.3"/>
        <rect x="82" y="28" width="9" height="46" rx="1" fill="#facc15" stroke="#854d0e" stroke-width="1.3"/>
        <text x="58" y="34" font-size="6.6" font-weight="bold" fill="#ffffff">1階: PD</text>
        <text x="56" y="75" font-size="6.6" font-weight="bold" fill="#ffffff">2階: AMP</text>
        <text x="12" y="112" font-size="7.1" fill="#854d0e">BSC 0.46μm縦貫通柱: 寄生容量激減→感度+25%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#713f12">2層画素 BSC垂直エレベーター柱</text>
        <text x="144" y="47" font-size="6.5" fill="#854d0e">・1階(光受光)と2階(増幅)を最短直結する柱</text>
        <text x="144" y="61" font-size="6.5" fill="#854d0e">・世界最小級0.46μmピッチで真下へ突き刺す</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・長い横配線を廃止し電圧ロスを減らし高感度</text>
        <text x="144" y="89" font-size="6.5" fill="#713f12">・1000℃の2階製造工程に耐える高耐熱プラグ</text>
      `);

    case 'micro_finfet_amp_rst_sel':
      return wrap(`
        <rect x="18" y="66" width="100" height="18" rx="2" fill="#94a3b8"/>
        <rect x="36" y="36" width="12" height="30" rx="2" fill="#38bdf8" stroke="#0369a1" stroke-width="1.4"/>
        <rect x="64" y="36" width="12" height="30" rx="2" fill="#38bdf8" stroke="#0369a1" stroke-width="1.4"/>
        <rect x="92" y="36" width="12" height="30" rx="2" fill="#38bdf8" stroke="#0369a1" stroke-width="1.4"/>
        <path d="M26 48 L36 48 L36 28 L48 28 L48 48 L64 48 L64 28 L76 28 L76 48 L92 48 L92 28 L104 28 L104 48 L112 48" fill="none" stroke="#eab308" stroke-width="3.2"/>
        <text x="32" y="22" font-size="6.8" font-weight="bold" fill="#854d0e">3面ゲート包囲 FinFET</text>
        <text x="12" y="112" font-size="7.1" fill="#0369a1">2階巨大SOI FinFET: v_n∝1/√(WL) → 雑音&lt;1.0e⁻</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0c4a6e">第2層 3D SOI FinFET増幅群</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・2階へお引っ越しし巨大化した信号メガホン</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・魚の背びれ(Fin)を3方向から包み超高効率</text>
        <text x="144" y="75" font-size="6.5" fill="#334155">・夜景の1/fノイズとチカチカRTSノイズを激減</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・SF増幅・RSTリセット・SEL選択の3大素子</text>
      `);

    case 'micro_sio2_sicn_barrier':
      return wrap(`
        <rect x="18" y="22" width="100" height="28" fill="#cbd5e1" stroke="#64748b"/>
        <rect x="18" y="54" width="100" height="28" fill="#cbd5e1" stroke="#64748b"/>
        <rect x="18" y="49" width="100" height="6" fill="#06b6d4"/>
        <rect x="44" y="24" width="48" height="25" fill="#d97706" stroke="#334155" stroke-width="3"/>
        <rect x="44" y="55" width="48" height="25" fill="#d97706" stroke="#334155" stroke-width="3"/>
        <text x="58" y="40" font-size="7" font-weight="bold" fill="#ffffff">Cu</text>
        <text x="58" y="71" font-size="7" font-weight="bold" fill="#ffffff">Cu</text>
        <text x="20" y="92" font-size="6.4" fill="#0e7490">SiO₂直接接合 + TaN/SiCN鎧壁</text>
        <text x="12" y="112" font-size="7.1" fill="#0e7490">R_q&lt;0.2nm SiO₂分子融合＋TaN/SiCN銅拡散封止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#164e63">SiO₂融合膜＆TaN/SiCN銅バリア</text>
        <text x="144" y="47" font-size="6.5" fill="#155e75">・Siに猛毒(白傷)となる銅の漏れを鎧壁で封鎖</text>
        <text x="144" y="61" font-size="6.5" fill="#155e75">・鏡より1000倍滑らかなガラス面を常温融合</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・250℃熱処理で銅パッドが膨張し結晶合体</text>
        <text x="144" y="89" font-size="6.5" fill="#334155">・数千万接点のバンプレス接合を永久保護</text>
      `);

    case 'micro_analog_digital_shield':
      return wrap(`
        <rect x="20" y="18" width="96" height="24" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <text x="29" y="33" font-size="6.8" font-weight="bold" fill="#1e3a8a">上: 静かな画素アナログ</text>
        <rect x="16" y="46" width="104" height="10" rx="2" fill="#ea580c" stroke="#7c2d12" stroke-width="1.4"/>
        <text x="24" y="54" font-size="6.6" font-weight="bold" fill="#ffffff">0V GND 防音＆遮光床</text>
        <rect x="20" y="60" width="96" height="24" rx="3" fill="#fee2e2" stroke="#dc2626"/>
        <text x="26" y="75" font-size="6.8" font-weight="bold" fill="#991b1b">下: GHzデジタル/ADC</text>
        <text x="12" y="112" font-size="7.1" fill="#9a3412">M5ファラデー接地シールド: 結合雑音−40dB＆迷光遮断</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#7c2d12">層間アナログ/デジタル遮蔽床</text>
        <text x="144" y="47" font-size="6.5" fill="#9a3412">・静かな図書館と下の工事工場を隔てる防音床</text>
        <text x="144" y="61" font-size="6.5" fill="#9a3412">・デジタル高速スイッチング雑音を40dB超遮断</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・下層の微弱発光(アンプグロー)も物理遮光</text>
        <text x="144" y="89" font-size="6.5" fill="#7c2d12">・高ISO・長時間露光の横ジマ＆紫カブリ防止</text>
      `);

    case 'micro_nir_reflector_grid':
      return wrap(`
        <rect x="20" y="22" width="96" height="50" fill="#1e3a8a" opacity="0.85"/>
        <path d="M20 72 L32 66 L44 72 L56 66 L68 72 L80 66 L92 72 L104 66 L116 72 L116 82 L20 82 Z" fill="#f59e0b" stroke="#b45309"/>
        <line x1="48" y1="14" x2="64" y2="68" stroke="#ef4444" stroke-width="2.4"/>
        <line x1="64" y1="68" x2="92" y2="28" stroke="#ef4444" stroke-width="2.4" stroke-dasharray="4 2"/>
        <polygon points="94,25 87,28 92,33" fill="#ef4444"/>
        <text x="26" y="36" font-size="6.8" fill="#fca5a5">赤/IR 透過光</text>
        <text x="34" y="80" font-size="6.4" font-weight="bold" fill="#78350f">底面ナノ反射ミラー</text>
        <text x="12" y="112" font-size="7.1" fill="#dc2626">底面回折ミラー: 光路長2倍化→赤/IR量子効率+25%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#7f1d1d">長波長光・底面反射再利用層</text>
        <text x="144" y="47" font-size="6.5" fill="#7f1d1d">・薄いSiを抜けやすい赤い光を底の鏡で跳ね返す</text>
        <text x="144" y="61" font-size="6.5" fill="#7f1d1d">・シリコン内を2往復させ「おかわり受光」</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・夕焼けや人肌の赤色感度(QE)を15〜30%向上</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・下層への光漏れ＆隣の画素への赤混色も防止</text>
      `);

    case 'micro_ondie_decap_esd':
      return wrap(`
        <rect x="18" y="20" width="98" height="68" rx="4" fill="#1e293b" stroke="#0f172a"/>
        <rect x="26" y="28" width="82" height="52" rx="2" fill="none" stroke="#eab308" stroke-width="2.5" stroke-dasharray="5 2"/>
        <rect x="42" y="38" width="20" height="32" fill="#06b6d4" stroke="#cffafe"/>
        <rect x="70" y="38" width="20" height="32" fill="#06b6d4" stroke="#cffafe"/>
        <path d="M104 20 L110 28 L104 28 L112 38" fill="none" stroke="#ef4444" stroke-width="2"/>
        <text x="45" y="57" font-size="6.6" font-weight="bold" fill="#083344">MIM</text>
        <text x="72" y="57" font-size="6.6" font-weight="bold" fill="#083344">DeCap</text>
        <text x="12" y="112" font-size="7.1" fill="#0891b2">チップ内蔵ps応答DeCap＋1ns避雷針ESDクランプ環</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#164e63">内蔵MIM DeCap＆ESD保護環</text>
        <text x="144" y="47" font-size="6.5" fill="#155e75">・10億分の1秒の電気の波を吸収する内蔵タンク</text>
        <text x="144" y="61" font-size="6.5" fill="#155e75">・数千個の並列ADC同時動作でも電源がブレない</text>
        <text x="144" y="75" font-size="6.5" fill="#dc2626">・外周ESD避雷針が2000V静電気を1nsで逃がす</text>
        <text x="144" y="89" font-size="6.5" fill="#334155">・数nmの極薄FinFET酸化膜を静電破壊から保護</text>
      `);

    default:
      return null;
  }
}
