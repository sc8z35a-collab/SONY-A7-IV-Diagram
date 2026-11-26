import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 36 Part A — Full-Width 320x118 Scientific Cutaway Schematics (MC111–MC130).
 */
export function renderPhase36MicUltraSchematicSvgA(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    case 'mc_jk1028_audio_jack_flex':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#1c1205" stroke="#f59e0b" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#fde68a">MC111 Sony純正 JK-1028 (A5022316A / Ref.206) デュアルジャックFPC</text>
        <rect x="14" y="25" width="212" height="64" rx="4" fill="#78350f" stroke="#f59e0b"/>
        <rect x="22" y="32" width="66" height="22" rx="3" fill="#111827" stroke="#ef4444" stroke-width="1.4"/>
        <text x="55" y="45" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fca5a5">MIC 3.5mm</text>
        <rect x="22" y="60" width="66" height="22" rx="3" fill="#111827" stroke="#22c55e" stroke-width="1.4"/>
        <text x="55" y="73" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#86efac">HP 3.5mm</text>
        <path d="M88 43 L165 43 L185 52 L226 52 M88 71 L165 71 L185 62 L226 62" fill="none" stroke="#facc15" stroke-width="1.8"/>
        <rect x="226" y="34" width="76" height="46" rx="3" fill="#0f172a" stroke="#eab308"/>
        <text x="264" y="50" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fef08a">ENIG ZIFテール</text>
        <text x="264" y="62" text-anchor="middle" font-size="4.8" fill="#cbd5e1">SY-1122 へ直結</text>
        <text x="264" y="73" text-anchor="middle" font-size="4.8" fill="#34d399">応力吸収率 &gt;90%</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">プラグ抜き差しの衝撃を黄色FPCが吸収し、高価なメイン基板を守る独立モジュラー構造</text>
      `);

    case 'mc_jk_holder_89100':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#64748b" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#e2e8f0">MC112 Sony純正 JK HOLDER (89100 / Ref.205 / 502789601)</text>
        <rect x="16" y="25" width="150" height="64" rx="4" fill="#1e293b" stroke="#94a3b8"/>
        <path d="M32 68 A20 20 0 0 1 72 68" fill="none" stroke="#ef4444" stroke-width="3"/>
        <path d="M98 68 A20 20 0 0 1 138 68" fill="none" stroke="#22c55e" stroke-width="3"/>
        <circle cx="28" cy="37" r="5" fill="#eab308"/><circle cx="152" cy="37" r="5" fill="#eab308"/><circle cx="90" cy="80" r="5" fill="#eab308"/>
        <text x="90" y="45" text-anchor="middle" font-size="5.2" fill="#cbd5e1">&gt;PC-GF30&lt; 3点ビス締結</text>
        <rect x="174" y="25" width="130" height="64" rx="4" fill="#111827" stroke="#38bdf8"/>
        <text x="239" y="40" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#7dd3fc">挿抜トルク分散</text>
        <text x="239" y="54" text-anchor="middle" font-size="5.0" fill="#e2e8f0">・ツイン円弧サドル拘束</text>
        <text x="239" y="66" text-anchor="middle" font-size="5.0" fill="#e2e8f0">・M1.7×3本フレーム固定</text>
        <text x="239" y="79" text-anchor="middle" font-size="5.0" fill="#34d399">・10,000回挿抜もクラック0</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">30%ガラス繊維強化クレードルが外部ケーブルのこじり荷重を骨格へ逃がす</text>
      `);

    case 'mc_jack_plate_89100':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#94a3b8" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#f1f5f9">MC113 Sony純正 JACK PLATE (89100 / Ref.353 / 502789401)</text>
        <rect x="18" y="26" width="168" height="62" rx="4" fill="#334155" stroke="#cbd5e1" stroke-width="1.5"/>
        <circle cx="64" cy="57" r="17" fill="#020617" stroke="#ef4444" stroke-width="2.5"/>
        <circle cx="136" cy="57" r="17" fill="#020617" stroke="#22c55e" stroke-width="2.5"/>
        <text x="64" y="59" text-anchor="middle" font-size="5.2" fill="#fca5a5">MIC</text>
        <text x="136" y="59" text-anchor="middle" font-size="5.2" fill="#86efac">HP</text>
        <rect x="196" y="26" width="108" height="62" rx="4" fill="#1e293b" stroke="#facc15"/>
        <text x="250" y="40" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fde047">SUS304＋BeCu接地</text>
        <text x="250" y="55" text-anchor="middle" font-size="5.0" fill="#e2e8f0">静電気 ±15 kV ESD</text>
        <text x="250" y="67" text-anchor="middle" font-size="5.0" fill="#38bdf8">→ Z_gnd &lt; 50 mΩ</text>
        <text x="250" y="79" text-anchor="middle" font-size="5.0" fill="#34d399">マグネシウム骨格へ分流</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">ステンレス補強板とバネ接地片が端子強度と静電気逃がしを両立</text>
      `);

    case 'mc_mb_jack_shield_block':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#f8fafc">MC114 Sony純正 MB JACK SHIELD BLOCK (5800 / Ref.564 / 500972301)</text>
        <rect x="16" y="26" width="108" height="62" rx="4" fill="#1e293b" stroke="#ef4444"/>
        <text x="70" y="48" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fca5a5">GHzデジタル放射</text>
        <text x="70" y="62" text-anchor="middle" font-size="4.9" fill="#cbd5e1">BIONZ / HDMI / DRAM</text>
        <rect x="132" y="24" width="44" height="66" rx="3" fill="#94a3b8" stroke="#facc15" stroke-width="1.8"/>
        <text x="154" y="55" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0f172a">金属</text>
        <text x="154" y="65" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0f172a">防壁</text>
        <rect x="184" y="26" width="120" height="62" rx="4" fill="#064e3b" stroke="#34d399"/>
        <text x="244" y="46" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#6ee7b7">静寂アナログ端子室</text>
        <text x="244" y="60" text-anchor="middle" font-size="5.0" fill="#e2e8f0">遮蔽減衰 &gt; 60 dB</text>
        <text x="244" y="73" text-anchor="middle" font-size="4.8" fill="#a7f3d0">フェライト吸収シート付</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">金属ファラデー隔壁＋BeCuフィンガーが高速デジタル放射から3.5mm入力を隔離</text>
      `);

    case 'mc_magnetic_field_cut_plate':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#bae6fd">MC115 Sony純正 MAGNETIC FIELD CUT PLATE (891 / Ref.352 / 502789501)</text>
        <rect x="18" y="34" width="70" height="44" rx="4" fill="#7f1d1d" stroke="#ef4444"/>
        <text x="53" y="54" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fecaca">IBIS VCM</text>
        <text x="53" y="66" text-anchor="middle" font-size="4.8" fill="#fca5a5">強磁束 Φ(t)</text>
        <rect x="128" y="25" width="32" height="64" rx="3" fill="#475569" stroke="#38bdf8" stroke-width="2"/>
        <text x="144" y="58" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#e0f2fe">高μ板</text>
        <path d="M88 45 Q116 32 134 27 M88 65 Q116 78 134 86" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="3 2"/>
        <rect x="188" y="30" width="114" height="54" rx="4" fill="#052e16" stroke="#22c55e"/>
        <text x="245" y="49" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#86efac">音声アナログ保護域</text>
        <text x="245" y="63" text-anchor="middle" font-size="4.9" fill="#dcfce7">磁束迂回 → V = −dΦ/dt ≈ 0</text>
        <text x="245" y="75" text-anchor="middle" font-size="4.8" fill="#a7f3d0">誘導ハム雑音を物理封殺</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">高透磁率パーマロイ板が手ブレ補正磁石の磁力線を吸い込んで迂回させる</text>
      `);

    case 'mc_mis2006_shoe_contact_fpc':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#eab308" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#fef08a">MC116 Sony純正 MIS-2006 (A5001908A) 21ピン接点FPC ＆ 防滴ゴム (501695501)</text>
        <rect x="16" y="26" width="288" height="40" rx="4" fill="#1e293b" stroke="#64748b"/>
        ${Array.from({ length: 21 }, (_, i) => {
          const x = 24 + i * 13;
          const dig = i >= 7 && i <= 11;
          return `<rect x="${x}" y="32" width="9" height="24" rx="1" fill="${dig ? '#38bdf8' : '#facc15'}"/>`;
        }).join('')}
        <rect x="113" y="28" width="66" height="32" rx="2" fill="none" stroke="#38bdf8" stroke-width="1.3"/>
        <rect x="16" y="70" width="144" height="20" rx="3" fill="#0c4a6e" stroke="#38bdf8"/>
        <text x="88" y="83" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#e0f2fe">Pin 8-12: 4ch 24bit/32bit I2S</text>
        <rect x="168" y="70" width="136" height="20" rx="3" fill="#1f2937" stroke="#94a3b8"/>
        <text x="236" y="83" text-anchor="middle" font-size="5.2" fill="#e2e8f0">Ref.324 防滴ゴムブーツ密閉</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">0.5 mmピッチ硬質金21ピン接点＋防滴ラバーでケーブルレス高音質デジタル直結</text>
      `);

    case 'mc_mi_shoe_shell_spring_cap':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#f1f5f9">MC117 純正 MI SHOE SHELL / SPRING PLATE / SHOE CAP (Ref.327/331/9)</text>
        <rect x="20" y="56" width="140" height="28" rx="3" fill="#475569" stroke="#cbd5e1"/>
        <path d="M36 56 L36 38 L58 38 M144 56 L144 38 L122 38" fill="none" stroke="#e2e8f0" stroke-width="4"/>
        <path d="M52 56 Q90 42 128 56" fill="none" stroke="#f59e0b" stroke-width="2.6"/>
        <text x="90" y="74" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fef08a">Ref.331 予圧板バネ</text>
        <rect x="174" y="26" width="130" height="62" rx="4" fill="#1e293b" stroke="#38bdf8"/>
        <text x="239" y="41" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#7dd3fc">無ガタ固定＆防塵構造</text>
        <text x="239" y="55" text-anchor="middle" font-size="5.0" fill="#e2e8f0">・板バネ常時上向き予圧</text>
        <text x="239" y="67" text-anchor="middle" font-size="5.0" fill="#34d399">・歩行カタカタ雑音ゼロ</text>
        <text x="239" y="79" text-anchor="middle" font-size="5.0" fill="#cbd5e1">・Ref.9 キャップで接点保護</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">ステンレスレールと2点板バネの常時予圧で重いXLR機器も無音ロック固定</text>
      `);

    case 'mc_side_jack_cover_door':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#ef4444" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#fecaca">MC118 純正 側面3重リップ防滴 MIC / HP 端子カバー扉 (Ref.8 / X50022801)</text>
        <rect x="18" y="26" width="136" height="62" rx="5" fill="#1f2937" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="26" y="34" width="120" height="46" rx="4" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="3 2"/>
        <circle cx="58" cy="57" r="14" fill="#0f172a" stroke="#ef4444" stroke-width="2.4"/>
        <circle cx="114" cy="57" r="14" fill="#0f172a" stroke="#22c55e" stroke-width="2.4"/>
        <text x="58" y="59" text-anchor="middle" font-size="5.2" fill="#fca5a5">MIC</text>
        <text x="114" y="59" text-anchor="middle" font-size="5.2" fill="#86efac">HP</text>
        <rect x="166" y="26" width="138" height="62" rx="4" fill="#111827" stroke="#22c55e"/>
        <text x="235" y="41" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#86efac">独立ヒンジ＆3重防滴栓</text>
        <text x="235" y="55" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・バリアングル液晶非干渉</text>
        <text x="235" y="67" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・EPDM 25%圧縮3重リップ</text>
        <text x="235" y="79" text-anchor="middle" font-size="4.9" fill="#7dd3fc">・HDMI/USB閉鎖ままMIC接続</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">独立開閉ヒンジと3重ゴム栓で屋外の雨天撮影でも端子内部を完全密閉</text>
      `);

    case 'mc_sp901_monitor_speaker_gnd':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#f97316" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#fed7aa">MC119 純正 SP901 φ1.0 cm スピーカー (185921011) ＋ GND/絶縁シート</text>
        <ellipse cx="82" cy="46" rx="46" ry="14" fill="#334155" stroke="#f97316" stroke-width="1.6"/>
        <ellipse cx="82" cy="44" rx="28" ry="8" fill="#ea580c" opacity="0.6"/>
        <rect x="34" y="64" width="96" height="8" rx="2" fill="#d97706"/>
        <text x="82" y="70" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">Ref.414 銅GNDシート</text>
        <rect x="34" y="76" width="96" height="8" rx="2" fill="#475569"/>
        <text x="82" y="82" text-anchor="middle" font-size="4.6" fill="#e2e8f0">Ref.415 絶縁シート</text>
        <rect x="150" y="26" width="154" height="62" rx="4" fill="#1e293b" stroke="#fb923c"/>
        <text x="227" y="41" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fdba74">再生確認＆録画時完全隔離</text>
        <text x="227" y="55" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・N52磁石＋PEIドーム振動板</text>
        <text x="227" y="67" text-anchor="middle" font-size="4.9" fill="#34d399">・録画中 出力段HW完全ミュート</text>
        <text x="227" y="79" text-anchor="middle" font-size="4.9" fill="#cbd5e1">・ハウリング＆リーク &lt; -100 dB</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">銅GND箔と絶縁シートの2重隔離＋録画中ハード遮断でマイクへの逆流雑音ゼロ</text>
      `);

    case 'mc_rear_muffle_cushion_insul':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#64748b" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#e2e8f0">MC120 純正 REAR MUFFLE CUSHION A/B ＋ SH-1035 SUS304補強板</text>
        <rect x="18" y="28" width="136" height="22" rx="3" fill="#334155" stroke="#94a3b8"/>
        <text x="86" y="41" text-anchor="middle" font-size="5.2" fill="#e2e8f0">502863201/301 消音スポンジA/B</text>
        <rect x="18" y="54" width="136" height="12" rx="2" fill="#b45309"/>
        <text x="86" y="62" text-anchor="middle" font-size="4.8" fill="#fef3c7">SH-1035 フレキ基板</text>
        <rect x="18" y="70" width="136" height="14" rx="2" fill="#cbd5e1" stroke="#38bdf8"/>
        <text x="86" y="79" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#0f172a">0.20 mm SUS304 鋼鉄添え木</text>
        <rect x="166" y="26" width="138" height="62" rx="4" fill="#111827" stroke="#38bdf8"/>
        <text x="235" y="41" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#7dd3fc">反響吸収 × 平面剛性確保</text>
        <text x="235" y="55" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・2-10 kHz 筐体空洞定在波減衰</text>
        <text x="235" y="67" text-anchor="middle" font-size="4.9" fill="#34d399">・FPC反りによる感度狂い防止</text>
        <text x="235" y="79" text-anchor="middle" font-size="4.9" fill="#fde047">・SUS板接地で底面RF遮蔽</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">消音クッションと0.2 mmステンレス補強板が筐体鳴きとMEMS歪みを同時抑止</text>
      `);

    case 'mc_bottom_port_solder_ring_nsmd':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#052e16" stroke="#10b981" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#6ee7b7">MC121 MEMS底面音孔 360°環状SAC305気密はんだシール＆4分割NSMDパッド</text>
        <circle cx="88" cy="57" r="28" fill="none" stroke="#eab308" stroke-width="1.5" stroke-dasharray="3 3"/>
        <circle cx="88" cy="57" r="20" fill="none" stroke="#e2e8f0" stroke-width="7" stroke-dasharray="28 3.5"/>
        <circle cx="88" cy="57" r="10" fill="#020617" stroke="#f59e0b" stroke-width="1.8"/>
        <text x="88" y="60" text-anchor="middle" font-size="4.6" fill="#fef08a">φ0.8</text>
        <rect x="150" y="26" width="154" height="62" rx="4" fill="#064e3b" stroke="#34d399"/>
        <text x="227" y="40" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#a7f3d0">Infineon AN557 / WAN0284</text>
        <text x="227" y="54" text-anchor="middle" font-size="4.9" fill="#ecfdf5">・4分割開口ステンシルで気泡0</text>
        <text x="227" y="66" text-anchor="middle" font-size="4.9" fill="#fde047">・360°連続リング＝音響パッキン</text>
        <text x="227" y="78" text-anchor="middle" font-size="4.9" fill="#7dd3fc">・低域音漏れショート完全防止</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">音孔を囲むボイド皆無の360°環状はんだが低音抜けとRF混入を同時ブロック</text>
      `);

    case 'mc_pcb_stress_relief_slots':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#052e16" stroke="#22c55e" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#86efac">MC122 MEMS実装部 U字型ミルドPCB応力緩和スリット（浮島構造）</text>
        <rect x="24" y="26" width="124" height="62" rx="4" fill="#065f46" stroke="#34d399"/>
        <path d="M48 76 L48 36 L124 36 L124 76" fill="none" stroke="#020617" stroke-width="6"/>
        <rect x="58" y="44" width="56" height="34" rx="3" fill="#10b981" stroke="#fef08a"/>
        <text x="86" y="63" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#020617">MEMS浮島</text>
        <rect x="162" y="26" width="142" height="62" rx="4" fill="#0f172a" stroke="#34d399"/>
        <text x="233" y="41" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#6ee7b7">基板ねじれ伝達 95%遮断</text>
        <text x="233" y="55" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・3辺ルーター貫通スリット</text>
        <text x="233" y="67" text-anchor="middle" font-size="4.9" fill="#fde047">・260℃リフロー熱反りを遮断</text>
        <text x="233" y="79" text-anchor="middle" font-size="4.9" fill="#7dd3fc">・±3 dB 感度ドリフトゼロ化</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">3辺を切り抜いた片持ち浮島構造で、筐体を強く握ってもMEMS鼓膜が歪まない</text>
      `);

    case 'mc_asic_black_globtop_lightshield':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#09090b" stroke="#38bdf8" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#e2e8f0">MC123 MEMS内蔵ASIC 遮光ブラックエポキシ・グロブトップ（光電雑音防止）</text>
        <rect x="20" y="68" width="136" height="16" rx="2" fill="#475569"/>
        <rect x="30" y="54" width="38" height="14" rx="1" fill="#38bdf8"/>
        <text x="49" y="63" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#020617">MEMS</text>
        <path d="M84 68 Q114 30 144 68 Z" fill="#18181b" stroke="#94a3b8" stroke-width="1.6"/>
        <rect x="98" y="56" width="32" height="12" rx="1" fill="#f59e0b"/>
        <text x="114" y="64" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#020617">ASIC</text>
        <path d="M102 26 L112 40 M120 24 L118 39" stroke="#fef08a" stroke-width="1.6"/>
        <text x="114" y="34" text-anchor="middle" font-size="4.6" fill="#fde047">閃光反射!</text>
        <rect x="168" y="26" width="136" height="62" rx="4" fill="#18181b" stroke="#f59e0b"/>
        <text x="236" y="41" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fde047">光学濃度 OD &gt; 6.0 遮光</text>
        <text x="236" y="55" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・透過率 100万分の1未満</text>
        <text x="236" y="67" text-anchor="middle" font-size="4.9" fill="#38bdf8">・ストロボ光電ポップ音ゼロ</text>
        <text x="236" y="79" text-anchor="middle" font-size="4.9" fill="#a7f3d0">・金ワイヤー振動も樹脂固定</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">音孔から入るストロボ閃光やLED光によるシリコン光電発電ノイズを完全遮断</text>
      `);

    case 'mc_sdm_ausn_getter_vacuum_seal':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#fde68a">MC124 SDM密閉二重膜 AuSn共晶気密枠 ＆ Ti/Zr/V NEGゲッター真空維持膜</text>
        <rect x="20" y="28" width="134" height="58" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="3.2"/>
        <rect x="34" y="40" width="106" height="34" rx="2" fill="#020617" stroke="#38bdf8"/>
        <text x="87" y="54" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#7dd3fc">低圧真空 &lt; 20 mbar</text>
        <text x="87" y="67" text-anchor="middle" font-size="4.8" fill="#fde047">Ti/Zr/V NEG 吸着膜</text>
        <rect x="166" y="26" width="138" height="62" rx="4" fill="#1e293b" stroke="#38bdf8"/>
        <text x="235" y="41" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fef08a">15年真空維持の2重技術</text>
        <text x="235" y="55" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・Au80Sn20 280℃共晶溶接</text>
        <text x="235" y="67" text-anchor="middle" font-size="4.9" fill="#7dd3fc">・放出ガスH₂/O₂を化学吸着</text>
        <text x="235" y="79" text-anchor="middle" font-size="4.9" fill="#34d399">・粘性熱雑音消去→73dB SNR</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">金スズ溶接と「気体を食べる金属膜」で二重振動膜間の真空を十数年キープ</text>
      `);

    case 'mc_mems_ubm_passivation_stack':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#fbbf24" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#fde68a">MC125 MEMSダイ Si₃N₄パッシベーション ＆ Ti/Pt/Au UBM耐パープルプレーグ積層</text>
        <rect x="20" y="74" width="132" height="14" fill="#334155"/>
        <rect x="20" y="58" width="34" height="16" fill="#1e40af"/>
        <rect x="118" y="58" width="34" height="16" fill="#1e40af"/>
        <rect x="54" y="66" width="64" height="8" fill="#64748b"/>
        <rect x="54" y="58" width="64" height="8" fill="#cbd5e1"/>
        <rect x="54" y="48" width="64" height="10" fill="#facc15"/>
        <circle cx="86" cy="40" r="8" fill="#fde047" stroke="#b45309"/>
        <text x="86" y="55" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#0f172a">Au / Pt / Ti UBM</text>
        <rect x="166" y="26" width="138" height="62" rx="4" fill="#1e293b" stroke="#fbbf24"/>
        <text x="235" y="41" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fef08a">3層貴金属バリヤー構造</text>
        <text x="235" y="55" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・Au-Au接合→AuAl₂腐食0</text>
        <text x="235" y="67" text-anchor="middle" font-size="4.9" fill="#7dd3fc">・PECVD Si₃N₄ 耐湿保護膜</text>
        <text x="235" y="79" text-anchor="middle" font-size="4.9" fill="#34d399">・85℃/85% RH 1000h合格</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">プラチナ拡散防壁が金とアルミの腐食変質を防ぎ、過酷な熱帯ロケでも断線ゼロ</text>
      `);

    case 'mc_mems_bist_electrostatic_test':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#082f49" stroke="#06b6d4" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#67e8f9">MC126 MEMS内蔵セルフテスト(BIST) 静電加振 ＆ 音孔目詰まり自己診断</text>
        <rect x="18" y="26" width="138" height="62" rx="4" fill="#0f172a" stroke="#22d3ee"/>
        <path d="M28 58 Q48 34 68 58 T108 58 T144 58" fill="none" stroke="#34d399" stroke-width="1.8"/>
        <path d="M28 66 Q58 56 88 66 T144 66" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 2"/>
        <text x="87" y="38" text-anchor="middle" font-size="4.9" fill="#6ee7b7">正常: 鋭い振動応答</text>
        <text x="87" y="81" text-anchor="middle" font-size="4.9" fill="#fca5a5">水滴詰まり: 過減衰検知!</text>
        <rect x="168" y="26" width="136" height="62" rx="4" fill="#0f172a" stroke="#38bdf8"/>
        <text x="236" y="41" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#7dd3fc">10 ms 自動健康診断</text>
        <text x="236" y="55" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・静電パルスで膜を微加振</text>
        <text x="236" y="67" text-anchor="middle" font-size="4.9" fill="#fde047">・ΔC減衰から詰まり判定</text>
        <text x="236" y="79" text-anchor="middle" font-size="4.9" fill="#34d399">・EVF警告＆正常chへ回避</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">静電気で自分の鼓膜をそっと揺らして跳ね返りを測り、音孔詰まりを自動検知</text>
      `);

    case 'mc_pdm_lr_edge_mux_tristate':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#7dd3fc">MC127 PDMステレオ L/Rセレクト 立ち上がり/立ち下がりエッジ時分割多重</text>
        <rect x="16" y="25" width="288" height="64" rx="4" fill="#020617" stroke="#1e40af"/>
        <text x="24" y="42" font-size="5.2" fill="#94a3b8">CLK</text>
        <path d="M52 44 L52 32 L84 32 L84 44 L116 44 L116 32 L148 32 L148 44 L180 44 L180 32 L212 32 L212 44 L244 44 L244 32 L276 32 L276 44" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
        <text x="24" y="72" font-size="5.2" fill="#fde047">DATA</text>
        <rect x="54" y="58" width="28" height="18" rx="2" fill="#0284c7"/><text x="68" y="69" text-anchor="middle" font-size="5.0" fill="#fff">L1</text>
        <rect x="86" y="58" width="28" height="18" rx="2" fill="#dc2626"/><text x="100" y="69" text-anchor="middle" font-size="5.0" fill="#fff">R1</text>
        <rect x="118" y="58" width="28" height="18" rx="2" fill="#0284c7"/><text x="132" y="69" text-anchor="middle" font-size="5.0" fill="#fff">L2</text>
        <rect x="150" y="58" width="28" height="18" rx="2" fill="#dc2626"/><text x="164" y="69" text-anchor="middle" font-size="5.0" fill="#fff">R2</text>
        <rect x="182" y="58" width="28" height="18" rx="2" fill="#0284c7"/><text x="196" y="69" text-anchor="middle" font-size="5.0" fill="#fff">L3</text>
        <rect x="214" y="58" width="28" height="18" rx="2" fill="#dc2626"/><text x="228" y="69" text-anchor="middle" font-size="5.0" fill="#fff">R3</text>
        <text x="272" y="69" text-anchor="middle" font-size="4.8" fill="#fde047">Hi-Z&lt;90ns</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">クロック上がり目で左、下がり目で右が交互に送信し、たった1本の線でステレオ伝送</text>
      `);

    case 'mc_3m_9495le_diecut_psa_ring':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#1c1917" stroke="#a8a29e" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#e7e5e4">MC128 3M 9495LE (0.17 mm 300LSE) 音響気密PSAリング ＆ 導電EMI布ガスケット</text>
        <rect x="20" y="28" width="134" height="12" rx="2" fill="#fde047"/><text x="87" y="36" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0f172a">300LSE粘着 0.071 mm</text>
        <rect x="20" y="42" width="134" height="8" rx="1" fill="#38bdf8"/><text x="87" y="48" text-anchor="middle" font-size="4.5" fill="#0f172a">PET基材 0.013 mm</text>
        <rect x="20" y="52" width="134" height="12" rx="2" fill="#facc15"/><text x="87" y="60" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0f172a">300LSE粘着 0.086 mm</text>
        <rect x="20" y="68" width="134" height="18" rx="3" fill="#64748b" stroke="#cbd5e1"/><text x="87" y="79" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#f8fafc">Ni/Cu導電布フォームガスケット</text>
        <rect x="166" y="26" width="138" height="62" rx="4" fill="#0f172a" stroke="#facc15"/>
        <text x="235" y="41" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fef08a">LSE塗装面への完全気密貼合</text>
        <text x="235" y="55" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・総厚 0.170 mm レーザー型抜</text>
        <text x="235" y="67" text-anchor="middle" font-size="4.9" fill="#34d399">・ePTFE防水膜を音漏れゼロ封止</text>
        <text x="235" y="79" text-anchor="middle" font-size="4.9" fill="#7dd3fc">・導電布面抵抗 &lt; 0.05 Ω/sq</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">低表面エネルギー塗装マグネシウムへ強力密着する0.17 mm気密リングと導電アース布</text>
      `);

    case 'mc_ecm_front_acoustic_cloth_crimp':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#94a3b8" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#f1f5f9">MC129 ECM前面 黒色不織布音響抵抗クロス ＆ 360°アルミかしめフランジ</text>
        <rect x="24" y="26" width="128" height="8" rx="2" fill="#27272a" stroke="#a1a1aa"/>
        <text x="88" y="32" text-anchor="middle" font-size="4.5" fill="#e4e4e7">黒色音響抵抗クロス (Ra)</text>
        <path d="M26 36 L26 84 L46 84 M150 36 L150 84 L130 84" fill="none" stroke="#cbd5e1" stroke-width="4"/>
        <rect x="40" y="46" width="96" height="10" fill="#facc15"/><text x="88" y="53" text-anchor="middle" font-size="4.5" fill="#0f172a">振動膜＋スペーサー＋極板</text>
        <rect x="40" y="68" width="96" height="12" fill="#15803d"/><text x="88" y="76" text-anchor="middle" font-size="4.5" fill="#dcfce7">JFET基板 (360°かしめ接地)</text>
        <rect x="166" y="26" width="138" height="62" rx="4" fill="#1e293b" stroke="#38bdf8"/>
        <text x="235" y="41" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#7dd3fc">高域ダンプ × 360°機械封止</text>
        <text x="235" y="55" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・不織布抵抗で高音ピーク平坦化</text>
        <text x="235" y="67" text-anchor="middle" font-size="4.9" fill="#fde047">・アルミ外周を内巻きロール締結</text>
        <text x="235" y="79" text-anchor="middle" font-size="4.9" fill="#34d399">・銀ペースト併用で完全シールド</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">前面の黒い不織布で高音共振を整え、背面の360°アルミかしめで全層を精密固定</text>
      `);

    case 'mc_ecm_solderless_contact_parylene':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#facc15" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#fef08a">MC130 ECM無はんだ金圧縮コンタクトリング ＆ パリレンC防湿コート</text>
        <rect x="24" y="28" width="124" height="12" rx="2" fill="#ca8a04"/><text x="86" y="36" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0f172a">真鍮バックプレート (FEP保護)</text>
        <path d="M40 44 L54 58 L70 44 L86 58 L102 44 L118 58 L132 44" fill="none" stroke="#facc15" stroke-width="2.6"/>
        <rect x="24" y="62" width="124" height="22" rx="3" fill="#14532d" stroke="#38bdf8" stroke-width="1.8"/>
        <text x="86" y="72" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#bae6fd">CVD パリレンC防湿膜 (&gt;10¹⁴Ω)</text>
        <text x="86" y="81" text-anchor="middle" font-size="4.5" fill="#86efac">1 GΩ JFET ゲート入力保護</text>
        <rect x="164" y="26" width="140" height="62" rx="4" fill="#1e293b" stroke="#facc15"/>
        <text x="234" y="41" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fef08a">非加熱接続 × 密林防湿バリア</text>
        <text x="234" y="55" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・ハンダ熱(&gt;120℃)による脱分極回避</text>
        <text x="234" y="67" text-anchor="middle" font-size="4.9" fill="#7dd3fc">・6爪金バネで無はんだ低抵抗圧接</text>
        <text x="234" y="79" text-anchor="middle" font-size="4.9" fill="#34d399">・95% RHでもバリバリ漏電雑音0</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">熱を使わず金バネで電極を押し当て、パリレンC極薄膜で雨季の湿気雑音を完全封鎖</text>
      `);

    default:
      return null;
  }
}
