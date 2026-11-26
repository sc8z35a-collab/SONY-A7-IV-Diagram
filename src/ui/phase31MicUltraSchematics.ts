import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/** Generate exact smooth Archimedean spiral polyline points for acoustic metamaterial diagrams */
function buildSpiralPoints(cx: number, cy: number, rStart: number, rEnd: number, turns: number, steps = 96): string {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * Math.PI * 2 * turns - Math.PI / 2;
    const r = rStart + (rEnd - rStart) * t;
    pts.push(`${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
  }
  return pts.join(' ');
}

/**
 * Phase 31B Ultra-Detailed Full-Width 320x118 Scientific Cutaway Schematic SVGs (MC81–MC110).
 * Every single diagram uses the full 320x118 canvas with multi-layer SEM/MEMS cross-sections,
 * photonic interference cavities, real Archimedean spirals, frequency/waveform plots, and zero-overlap Japanese callouts.
 */
export function renderPhase31MicUltraSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    // =========================================================================
    // GROUP 1: MC81–MC90 — 2026 2D GRAPHENE, PHOTONICS, 3D-TSV & MEMS NANOPHYSICS
    // =========================================================================

    case 'mc_graphene_2d_membrane_2026':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#091324" stroke="#38bdf8" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#7dd3fc">MC81 2026 原子数層 2Dグラフェン超極薄ハニカム音響振動膜</text>
        <!-- Left sp2 hexagonal atomic honeycomb lattice -->
        <rect x="14" y="24" width="142" height="66" rx="4" fill="#0f172a" stroke="#1e40af"/>
        <polygon points="44,44 58,44 65,56 58,68 44,68 37,56" fill="none" stroke="#38bdf8" stroke-width="1.6"/>
        <polygon points="65,32 79,32 86,44 79,56 65,56 58,44" fill="none" stroke="#14b8a6" stroke-width="1.6"/>
        <polygon points="65,56 79,56 86,68 79,80 65,80 58,68" fill="none" stroke="#a855f7" stroke-width="1.6"/>
        <polygon points="86,44 100,44 107,56 100,68 86,68 79,56" fill="none" stroke="#38bdf8" stroke-width="1.6"/>
        <polygon points="107,32 121,32 128,44 121,56 107,56 100,44" fill="none" stroke="#14b8a6" stroke-width="1.6"/>
        <polygon points="107,56 121,56 128,68 121,80 107,80 100,68" fill="none" stroke="#a855f7" stroke-width="1.6"/>
        <circle cx="58" cy="44" r="2.2" fill="#fff"/>
        <circle cx="86" cy="44" r="2.2" fill="#fff"/>
        <circle cx="79" cy="56" r="2.2" fill="#fff"/>
        <circle cx="107" cy="56" r="2.2" fill="#fff"/>
        <text x="85" y="87" text-anchor="middle" font-size="5.0" fill="#bae6fd">sp2 炭素原子シート（ヤング率 ≈ 1 TPa）</text>
        <!-- Right thickness & response comparison -->
        <rect x="164" y="24" width="142" height="66" rx="4" fill="#0f172a" stroke="#38bdf8"/>
        <text x="235" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fde047">膜厚＆周波数応答の次元比較</text>
        <rect x="172" y="40" width="126" height="12" rx="2" fill="#475569"/>
        <text x="235" y="48.5" text-anchor="middle" font-size="5.2" fill="#e2e8f0">従来ポリSi膜：約 1,000 nm</text>
        <rect x="172" y="57" width="126" height="4" rx="1" fill="#38bdf8"/>
        <text x="235" y="69" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#38bdf8">2Dグラフェン：数 nm（重さ数十分の1!）</text>
        <text x="235" y="83" text-anchor="middle" font-size="5.2" fill="#34d399">鋼鉄200倍の強度 × 可聴〜超音波フラット</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">鋼鉄より強くて羽根より軽い原子シート！ささやきも超音波も慣性遅れゼロで震え切る</text>
      `);

    case 'mc_fabry_perot_fiber_cavity':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#171230" stroke="#f43f5e" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#fda4af">MC82 2026 ファブリー・ペロー光微小共振器 ＆ 光ファイバー無誘導マイク</text>
        <!-- Left optical cavity cutaway -->
        <rect x="14" y="24" width="160" height="66" rx="4" fill="#1e1b4b" stroke="#fb7185"/>
        <!-- Sound wave entering top cleanly above label -->
        <path d="M68 27 Q94 31 120 27" fill="none" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="94" y="38" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#bae6fd">声でピコm揺れる振動ミラー</text>
        <!-- Upper vibrating mirror -->
        <rect x="30" y="41" width="128" height="5.5" rx="2" fill="#38bdf8"/>
        <!-- Multi-bounce Fabry-Perot standing laser light -->
        <path d="M52 65 L64 46.5 L76 65 L88 46.5 L100 65 L112 46.5 L124 65 L136 46.5" fill="none" stroke="#fb7185" stroke-width="2"/>
        <!-- Lower fixed mirror & silica fiber -->
        <rect x="30" y="65" width="128" height="5.5" rx="2" fill="#94a3b8"/>
        <rect x="86" y="70.5" width="16" height="15.5" fill="#0ea5e9"/>
        <text x="54" y="82" text-anchor="middle" font-size="5.0" fill="#cbd5e1">固定鏡</text>
        <text x="132" y="82" text-anchor="middle" font-size="5.0" fill="#7dd3fc">光ファイバー</text>
        <!-- Right optical interference curve -->
        <rect x="182" y="24" width="124" height="66" rx="4" fill="#0f172a" stroke="#f43f5e"/>
        <text x="244" y="35" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fecdd3">多重干渉で変位を数十倍増幅</text>
        <line x1="192" y1="68" x2="296" y2="68" stroke="#64748b" stroke-width="1"/>
        <path d="M194 67 H212 Q220 38 228 67 H256 Q264 38 272 67 H294" fill="none" stroke="#fb7185" stroke-width="2.2"/>
        <circle cx="224" cy="49" r="3" fill="#fde047"/>
        <text x="244" y="80" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#34d399">先端無通電 → 電波EMI 100%ゼロ</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">電気を一切使わず「合わせ鏡で跳ね返る光の干渉」で声を測るから、Wi-Fi/IBISノイズ完全ゼロ！</text>
      `);

    case 'mc_silicon_photonics_waveguide':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#160c2e" stroke="#a855f7" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#e9d5ff">MC83 2026 シリコンフォトニクス マッハ・ツェンダー（MZI）光導波路変調チップ</text>
        <!-- Left MZI photonic waveguide layout -->
        <rect x="14" y="24" width="186" height="66" rx="4" fill="#1e1035" stroke="#9333ea"/>
        <!-- Input laser -->
        <rect x="20" y="51" width="24" height="12" rx="2" fill="#f43f5e"/>
        <text x="32" y="59" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">Laser</text>
        <!-- Upper arm (acoustic strain modulated) -->
        <path d="M44 57 H56 Q78 36 106 36 Q134 36 156 57 H168" fill="none" stroke="#f43f5e" stroke-width="2.4"/>
        <!-- Lower reference arm -->
        <path d="M44 57 H56 Q78 78 106 78 Q134 78 156 57 H168" fill="none" stroke="#38bdf8" stroke-width="2.4"/>
        <!-- Acoustic diaphragm stressing upper arm -->
        <ellipse cx="106" cy="36" rx="22" ry="8" fill="#fbbf24" opacity="0.88" stroke="#fef08a"/>
        <text x="106" y="38.5" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#451a03">声で伸び縮み</text>
        <text x="106" y="72" text-anchor="middle" font-size="5.0" fill="#7dd3fc">基準光ルート（一定）</text>
        <!-- Output Photodiode -->
        <rect x="168" y="51" width="26" height="12" rx="2" fill="#10b981"/>
        <text x="181" y="59" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">PD読出</text>
        <!-- Right physics callout -->
        <rect x="208" y="24" width="98" height="66" rx="4" fill="#0f172a" stroke="#a855f7"/>
        <text x="257" y="36" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#e9d5ff">二股光レース干渉</text>
        <text x="257" y="51" text-anchor="middle" font-size="5.2" fill="#fde047">Δφ = (2π/λ)·Δ(nL)</text>
        <text x="257" y="65" text-anchor="middle" font-size="5.0" fill="#bae6fd">CMOS工場で量産互換</text>
        <text x="257" y="79" text-anchor="middle" font-size="5.0" fill="#34d399">寄生容量・1/f雑音ゼロ</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">チップ上のレーザーを2本に分けて声の振動でゴール差を測る、超低雑音シリコン光マイク！</text>
      `);

    case 'mc_3d_tsv_mems_cmos_stack':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fffbeb" stroke="#d97706" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#78350f">MC84 2026 ウェハレベル 3D-TSV 垂直貫通ビア MEMS-on-CMOS 気密積層</text>
        <!-- Left: old side-by-side wirebond -->
        <rect x="14" y="24" width="136" height="66" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
        <text x="82" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#991b1b">従来：横並び＋長い金ワイヤー</text>
        <rect x="22" y="54" width="46" height="20" rx="2" fill="#0284c7"/>
        <text x="45" y="66" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">MEMS</text>
        <rect x="96" y="54" width="46" height="20" rx="2" fill="#4f46e5"/>
        <text x="119" y="66" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">ASIC</text>
        <path d="M58 54 Q82 34 106 54" fill="none" stroke="#eab308" stroke-width="2"/>
        <text x="82" y="84" text-anchor="middle" font-size="5.0" fill="#dc2626">配線が長く寄生容量ロス＆面積大</text>
        <!-- Arrow -->
        <path d="M153 57 H165" stroke="#d97706" stroke-width="2.2"/>
        <polygon points="167,57 161,53 161,61" fill="#d97706"/>
        <!-- Right: 2026 3D-TSV vertical stack -->
        <rect x="170" y="24" width="136" height="66" rx="4" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="238" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#166534">2026：2階建て 3D-TSV 直結!</text>
        <rect x="190" y="39" width="96" height="15" rx="2" fill="#0284c7"/>
        <text x="238" y="49" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">2階：MEMS振動膜ダイ</text>
        <rect x="204" y="54" width="5" height="12" fill="#ea580c"/>
        <rect x="224" y="54" width="5" height="12" fill="#ea580c"/>
        <rect x="246" y="54" width="5" height="12" fill="#ea580c"/>
        <rect x="266" y="54" width="5" height="12" fill="#ea580c"/>
        <rect x="190" y="66" width="96" height="15" rx="2" fill="#4f46e5"/>
        <text x="238" y="76" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">1階：CMOS読出ASIC</text>
        <text x="238" y="88" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#15803d">面積半減 ＋ S/N比 +1〜3 dB向上</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">長い金ワイヤーを廃止し真下の銅エレベーターで直結！小型化と音質S/N向上を同時達成</text>
      `);

    case 'mc_wake_on_sound_5ua_aad':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#ecfdf5" stroke="#10b981" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#065f46">MC85 2026 超低消費 5 μA 常時待機ウェイク・オン・サウンド（AAD）スマートMEMS</text>
        <!-- Full timeline waveform -->
        <rect x="14" y="24" width="292" height="66" rx="4" fill="#fff" stroke="#6ee7b7"/>
        <!-- Sleep zone shading -->
        <rect x="16" y="26" width="114" height="62" rx="3" fill="#f0fdf4"/>
        <text x="73" y="38" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#15803d">超省エネ聞き耳待機</text>
        <text x="73" y="50" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#059669">わずか 5 μA</text>
        <text x="73" y="61" text-anchor="middle" font-size="5.0" fill="#047857">（通常録音時の 約1/100）</text>
        <!-- Divider & trigger line -->
        <line x1="132" y1="26" x2="132" y2="88" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3 2"/>
        <rect x="138" y="28" width="76" height="14" rx="3" fill="#fef3c7" stroke="#f59e0b"/>
        <text x="176" y="37.5" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#b45309">声検知 → &lt;100μs起動!</text>
        <!-- Active voice recording zone -->
        <line x1="22" y1="74" x2="130" y2="74" stroke="#94a3b8" stroke-width="1.6"/>
        <path d="M132 74 L142 52 L150 82 L160 48 L170 84 L182 50 L194 82 L206 54 L218 78 L232 52 L246 80 L260 56 L274 76 L294 68" fill="none" stroke="#0284c7" stroke-width="2"/>
        <rect x="220" y="28" width="80" height="14" rx="3" fill="#0284c7"/>
        <text x="260" y="37.5" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">フル高S/N録音モード</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">普段はほぼ電池を使わず居眠りし、人の声を感じた0.1ミリ秒後に飛び起きて頭切れゼロ録音！</text>
      `);

    case 'mc_pmut_ultrasonic_range_2026':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#164e63">MC86 2026 PMUT 圧電マイクロ超音波（30–60 kHz）室内反射・話者測距コセンサー</text>
        <!-- Left sonar chamber diagram -->
        <rect x="14" y="24" width="178" height="66" rx="4" fill="#fff" stroke="#22d3ee"/>
        <rect x="22" y="40" width="26" height="34" rx="4" fill="#0e7490"/>
        <text x="35" y="55" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">PMUT</text>
        <text x="35" y="65" text-anchor="middle" font-size="4.6" fill="#a5f3fc">45kHz</text>
        <!-- Outgoing ultrasonic ping -->
        <path d="M56 44 A16 16 0 0 1 56 70" fill="none" stroke="#0284c7" stroke-width="2"/>
        <path d="M70 38 A24 24 0 0 1 70 76" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <path d="M86 34 A30 30 0 0 1 86 80" fill="none" stroke="#06b6d4" stroke-width="1.6" stroke-dasharray="3 2"/>
        <!-- Subject & Room Wall -->
        <circle cx="122" cy="54" r="10" fill="#f59e0b"/>
        <text x="122" y="56" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fff">話者</text>
        <text x="122" y="75" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#b45309">距離 d 測定</text>
        <rect x="172" y="28" width="12" height="58" rx="2" fill="#475569"/>
        <text x="154" y="42" text-anchor="middle" font-size="4.8" fill="#334155">壁反射</text>
        <path d="M170 48 L136 52" stroke="#ec4899" stroke-width="1.4" stroke-dasharray="2 2"/>
        <!-- Right DSP auto-tuning -->
        <rect x="200" y="24" width="106" height="66" rx="4" fill="#0e7490"/>
        <text x="253" y="37" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fde047">録る前に自動最適化</text>
        <text x="253" y="51" text-anchor="middle" font-size="5.2" fill="#fff">・指向性焦点を話者へロック</text>
        <text x="253" y="64" text-anchor="middle" font-size="5.2" fill="#fff">・近接低音モコモコ自動補正</text>
        <text x="253" y="77" text-anchor="middle" font-size="5.2" fill="#a5f3fc">・非可聴なので録音は無音!</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">コウモリみたいに聞こえない超音波で話者距離と壁の響きを先読みし、録音設定を自動最適化！</text>
      `);

    case 'mc_corrugated_poly_si_rings':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f0f9ff" stroke="#0ea5e9" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#0c4a6e">MC87 同心円コルゲート（波板状）ポリシリコン振動膜・応力分散構造</text>
        <!-- Full cutaway showing corrugated suspension + flat central piston -->
        <rect x="14" y="24" width="194" height="66" rx="4" fill="#fff" stroke="#38bdf8"/>
        <!-- Left & right silicon anchors -->
        <rect x="20" y="56" width="16" height="24" fill="#475569"/>
        <rect x="186" y="56" width="16" height="24" fill="#475569"/>
        <!-- Corrugated polysilicon profile -->
        <path d="M36 58 Q43 44 50 58 Q57 70 64 58 Q71 44 78 58 H144 Q151 44 158 58 Q165 70 172 58 Q179 44 186 58" fill="none" stroke="#0284c7" stroke-width="2.8"/>
        <!-- Up/down piston arrows in center -->
        <path d="M111 50 V34" stroke="#f59e0b" stroke-width="2"/>
        <polygon points="111,32 107,38 115,38" fill="#f59e0b"/>
        <path d="M111 64 V78" stroke="#f59e0b" stroke-width="2"/>
        <polygon points="111,80 107,74 115,74" fill="#f59e0b"/>
        <text x="111" y="54" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0369a1">中央は平らにピストン振動</text>
        <text x="58" y="38" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#0284c7">波紋が応力解放</text>
        <!-- Right specs -->
        <rect x="216" y="24" width="90" height="66" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="261" y="38" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0c4a6e">コルゲート効果</text>
        <text x="261" y="53" text-anchor="middle" font-size="5.2" fill="#0369a1">コンプライアンス 5倍</text>
        <text x="261" y="66" text-anchor="middle" font-size="5.2" fill="#0369a1">135dBでも歪み &lt;1%</text>
        <text x="261" y="79" text-anchor="middle" font-size="5.2" fill="#0369a1">温度変化で音色不変</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">スピーカーの蛇腹を髪の毛1/100サイズでシリコンに刻み、つっぱりを逃がして超低歪み振動！</text>
      `);

    case 'mc_sio2_sacrificial_etch_stops':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#eef2ff" stroke="#6366f1" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#312e81">MC88 気相フッ酸（Vapor-HF）SiO2犠牲層ドライ解放 ＆ Si3N4柱アンカー</text>
        <!-- Step 1: Before etch (filled with SiO2 sacrificial glass) -->
        <rect x="14" y="24" width="132" height="66" rx="4" fill="#fff" stroke="#a5b4fc"/>
        <text x="80" y="34" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#4338ca">1. 解放前：SiO2ガラス足場</text>
        <rect x="22" y="41" width="116" height="8" rx="1" fill="#0284c7"/>
        <rect x="26" y="49" width="12" height="22" fill="#4f46e5"/>
        <rect x="122" y="49" width="12" height="22" fill="#4f46e5"/>
        <rect x="38" y="49" width="84" height="22" fill="#fde68a" stroke="#d97706"/>
        <text x="80" y="62" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#92400e">SiO2 犠牲層(1.5μm)</text>
        <rect x="22" y="71" width="116" height="10" rx="1" fill="#475569"/>
        <!-- Arrow -->
        <path d="M149 57 H165" stroke="#dc2626" stroke-width="2.2"/>
        <polygon points="167,57 161,53 161,61" fill="#dc2626"/>
        <text x="157" y="48" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#dc2626">HF気体</text>
        <!-- Step 2: Released air gap -->
        <rect x="170" y="24" width="136" height="66" rx="4" fill="#fff" stroke="#4f46e5"/>
        <text x="238" y="34" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#059669">2. 無水ガス解放 → 空中振動膜!</text>
        <rect x="178" y="41" width="120" height="8" rx="1" fill="#0284c7"/>
        <rect x="182" y="49" width="12" height="22" fill="#4f46e5"/>
        <rect x="282" y="49" width="12" height="22" fill="#4f46e5"/>
        <text x="238" y="60" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#16a34a">← 1.5μm 空中すき間 →</text>
        <text x="238" y="69" text-anchor="middle" font-size="4.8" fill="#4338ca">Si3N4耐薬品柱が寸法ロック</text>
        <rect x="178" y="71" width="120" height="10" rx="1" fill="#475569"/>
        <text x="238" y="87" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#312e81">液体ゼロ乾燥 → 張り付き故障ゼロ!</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">ガスで溶けるガラス足場と溶けない窒化シリコン柱の彫刻術で、花粉1/10の空中すき間を実現！</text>
      `);

    case 'mc_drie_bosch_scallop_wall':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f1f5f9" stroke="#475569" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#0f172a">MC89 ボッシュDRIE垂直深掘りシリコン・スキャロップ壁 ＆ 背面大音響室</text>
        <!-- Left cutaway deep cavity -->
        <rect x="14" y="24" width="154" height="66" rx="4" fill="#fff" stroke="#64748b"/>
        <!-- Top MEMS membrane -->
        <rect x="24" y="30" width="134" height="6" rx="1" fill="#0284c7"/>
        <text x="91" y="29" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#0369a1">振動膜</text>
        <!-- Silicon walls with Bosch scallop profile -->
        <rect x="24" y="36" width="28" height="48" fill="#475569"/>
        <rect x="130" y="36" width="28" height="48" fill="#475569"/>
        <path d="M52 36 Q56 41 52 46 Q56 51 52 56 Q56 61 52 66 Q56 71 52 76 Q56 80 52 84" fill="none" stroke="#0ea5e9" stroke-width="2"/>
        <path d="M130 36 Q126 41 130 46 Q126 51 130 56 Q126 61 130 66 Q126 71 130 76 Q126 80 130 84" fill="none" stroke="#0ea5e9" stroke-width="2"/>
        <text x="91" y="57" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0f172a">大容積裏部屋</text>
        <text x="91" y="68" text-anchor="middle" font-size="5.2" fill="#0369a1">垂直度 89.5°±0.5°</text>
        <text x="91" y="79" text-anchor="middle" font-size="4.8" fill="#475569">アスペクト比 &gt; 20:1</text>
        <!-- Right Bosch cycle explanation -->
        <rect x="176" y="24" width="130" height="66" rx="4" fill="#fff" stroke="#0284c7"/>
        <text x="241" y="35" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0c4a6e">ボッシュ法 2工程超高速反復</text>
        <rect x="184" y="41" width="114" height="17" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="241" y="51.5" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0369a1">① SF6プラズマで真下へ掘削</text>
        <rect x="184" y="62" width="114" height="17" rx="3" fill="#fef3c7" stroke="#d97706"/>
        <text x="241" y="72.5" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#92400e">② C4F8テフロン膜で側壁保護</text>
        <text x="241" y="87" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#15803d">空気バネ軟化 → 低音＆S/N向上!</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">「掘る→壁を守る」を何百回も反復し、極小チップの裏に深い低音の響き部屋をくり抜く！</text>
      `);

    case 'mc_metal_lid_solder_ring_seal':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fefce8" stroke="#ca8a04" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#713f12">MC90 LGA金属リッド 360°全周連続はんだリング気密 ＆ 6 GHzファラデー封止</text>
        <!-- Left cutaway cross-section -->
        <rect x="14" y="24" width="166" height="66" rx="4" fill="#fff" stroke="#eab308"/>
        <!-- Metal Faraday lid dome -->
        <path d="M36 68 V36 H158 V68" fill="none" stroke="#475569" stroke-width="4"/>
        <!-- 360 continuous solder fillets -->
        <rect x="30" y="65" width="12" height="8" rx="2" fill="#eab308" stroke="#854d0e"/>
        <rect x="152" y="65" width="12" height="8" rx="2" fill="#eab308" stroke="#854d0e"/>
        <!-- PCB substrate -->
        <rect x="22" y="73" width="150" height="11" rx="2" fill="#065f46"/>
        <text x="97" y="81" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">GNDプレーン付 LGA基板</text>
        <!-- Inside acoustic chamber -->
        <rect x="64" y="54" width="66" height="16" rx="2" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="97" y="64" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0369a1">MEMS+ASIC 気密室</text>
        <!-- Bounced RF waves -->
        <path d="M18 46 L28 46 L22 40 M176 46 L166 46 L172 40" fill="none" stroke="#dc2626" stroke-width="1.8"/>
        <text x="97" y="47" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#dc2626">Wi-Fi / 5G 6GHz電波を跳ね返す!</text>
        <!-- Right specs -->
        <rect x="188" y="24" width="118" height="20" rx="3" fill="#ca8a04"/>
        <text x="247" y="36" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">隙間 0.0mm 全周溶接</text>
        <rect x="188" y="47" width="118" height="20" rx="3" fill="#dc2626"/>
        <text x="247" y="59" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">6 GHz 電波 &gt;60 dB遮断</text>
        <rect x="188" y="70" width="118" height="20" rx="3" fill="#0284c7"/>
        <text x="247" y="82" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">低音リーク完全ゼロ化</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">お城のお堀のようにフタ全周を隙間なくはんだ溶接！音漏れもWi-Fi雑音も一切入れない</text>
      `);

    // =========================================================================
    // GROUP 2: MC91–MC100 — 2026 ACOUSTIC METAMATERIALS & WIND/SPL ACOUSTIC PRECISION
    // =========================================================================

    case 'mc_spiral_helmholtz_metamaterial': {
      const spiralPts = buildSpiralPoints(76, 57, 4.5, 27.5, 3.3, 120);
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#141821" stroke="#f59e0b" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#fde68a">MC91 2026 渦巻きネック空間折畳みヘルムホルツ音響メタマテリアル風切り罠</text>
        <!-- Left TRUE smooth Archimedean coiled acoustic waveguide -->
        <rect x="14" y="24" width="124" height="66" rx="4" fill="#0b0f17" stroke="#b45309"/>
        <circle cx="76" cy="57" r="29" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polyline points="${spiralPts}" fill="none" stroke="#f59e0b" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="76" cy="57" r="4.2" fill="#38bdf8" stroke="#fff" stroke-width="1"/>
        <text x="118" y="34" text-anchor="middle" font-size="4.8" fill="#fbbf24">風圧入口</text>
        <text x="116" y="84" text-anchor="middle" font-size="4.8" fill="#7dd3fc">実効長10倍!</text>
        <!-- Right selective wind absorption curve -->
        <rect x="146" y="24" width="160" height="66" rx="4" fill="#0f172a" stroke="#f59e0b"/>
        <text x="226" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fde047">数mm厚で風ボボボ帯域だけ狙い撃ち吸収</text>
        <line x1="156" y1="74" x2="296" y2="74" stroke="#64748b" stroke-width="1"/>
        <!-- Selective dip at 80-350Hz, flat voice passband -->
        <path d="M158 46 Q178 46 190 70 Q202 46 218 44 H294" fill="none" stroke="#38bdf8" stroke-width="2.4"/>
        <rect x="172" y="42" width="36" height="31" fill="#f59e0b" opacity="0.24" stroke="#f59e0b" stroke-dasharray="2 2"/>
        <text x="190" y="84" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fbbf24">80–350Hz 風消去</text>
        <text x="256" y="57" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#34d399">人の声(500Hz〜)透過!</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">長い音の迷路をカタツムリ型に数ミリへ折り畳み、風のボボボ音だけを熱へ変えて消し去る！</text>
      `);
    }

    case 'mc_tubular_front_cavity_wind':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#0c4a6e">MC92 2026 CFD最適化 チューブラ（並列細管）前面音響キャビティ防風ポート</text>
        <!-- Left cutaway showing wind gust sliding across twin tubes -->
        <rect x="14" y="24" width="166" height="66" rx="4" fill="#fff" stroke="#38bdf8"/>
        <!-- Cross-wind stream across top -->
        <path d="M20 34 H170" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 3"/>
        <polygon points="172,34 165,30 165,38" fill="#ef4444"/>
        <text x="95" y="31" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#dc2626">横風 5–10 m/s（細かい渦が入口で砕ける）</text>
        <!-- Twin tuned vertical acoustic tubes -->
        <rect x="44" y="40" width="24" height="34" rx="2" fill="#64748b"/>
        <rect x="49" y="40" width="14" height="34" fill="#e0f2fe"/>
        <rect x="122" y="40" width="24" height="34" rx="2" fill="#64748b"/>
        <rect x="127" y="40" width="14" height="34" fill="#e0f2fe"/>
        <!-- Voice waves passing cleanly in phase -->
        <path d="M56 42 V72 M134 42 V72" stroke="#16a34a" stroke-width="2.2"/>
        <rect x="36" y="74" width="118" height="12" rx="2" fill="#0284c7"/>
        <text x="95" y="82.5" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">MEMS音孔：渦ノイズ相殺・声は同相合算</text>
        <!-- Right physics panel -->
        <rect x="188" y="24" width="118" height="66" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="247" y="36" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0c4a6e">サイズ差で風と声を選別</text>
        <text x="247" y="51" text-anchor="middle" font-size="5.2" fill="#dc2626">風の渦(mm級) → 位相バラバラ</text>
        <text x="247" y="64" text-anchor="middle" font-size="5.2" fill="#15803d">人の声(cm級) → 同相でクリア</text>
        <text x="247" y="80" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">物理風音 -10〜18 dB!</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">2026年CFD流体計算の並列細管ポートが横風のうず巻きを入口で砕き、屋外録音を劇的に静粛化！</text>
      `);

    case 'mc_lowfreq_metamaterial_booster':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f0fdfa" stroke="#14b8a6" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#115e59">MC93 2026 低域音響メタマテリアル 音圧集束・極小MEMS低音感度レンズ</text>
        <!-- Left GRIN concentric funnel -->
        <rect x="14" y="24" width="150" height="66" rx="4" fill="#fff" stroke="#14b8a6"/>
        <circle cx="89" cy="57" r="27" fill="none" stroke="#99f6e4" stroke-width="4"/>
        <circle cx="89" cy="57" r="20" fill="none" stroke="#2dd4bf" stroke-width="3.5"/>
        <circle cx="89" cy="57" r="13" fill="none" stroke="#0d9488" stroke-width="3"/>
        <circle cx="89" cy="57" r="6" fill="#0284c7"/>
        <!-- Focusing arrows -->
        <path d="M24 57 H54" stroke="#f59e0b" stroke-width="2.2"/>
        <polygon points="56,57 50,53 50,61" fill="#f59e0b"/>
        <path d="M154 57 H124" stroke="#f59e0b" stroke-width="2.2"/>
        <polygon points="122,57 128,53 128,61" fill="#f59e0b"/>
        <text x="36" y="48" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#b45309">広い低音波</text>
        <text x="142" y="48" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#b45309">中心集束!</text>
        <!-- Right passive gain explanation -->
        <rect x="172" y="24" width="134" height="66" rx="4" fill="#ccfbf1" stroke="#0d9488"/>
        <text x="239" y="36" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#115e59">電気EQとの決定的ちがい</text>
        <text x="239" y="51" text-anchor="middle" font-size="5.2" fill="#dc2626">電気ブースト：雑音も一緒に増大</text>
        <text x="239" y="64" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#047857">物理レンズ：声の音圧だけ増幅!</text>
        <text x="239" y="79" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0f766e">消費電力 0 mW · 低域S/N大幅UP</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">虫眼鏡が光を集めるように低音の空気圧を極小穴へ集束！豆粒マイクでも豊かな映画級の声に</text>
      `);

    case 'mc_acoustic_edge_diffraction_chamfer':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f8fafc" stroke="#64748b" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#0f172a">MC94 天面マイクロ面取り（チャンファー）音響ホーン＆エッジ回折抑制</text>
        <!-- Left: sharp 90deg edge diffraction -->
        <rect x="14" y="24" width="138" height="66" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
        <text x="83" y="34" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#991b1b">従来：直角エッジ（乱反射うねり）</text>
        <path d="M22 50 H60 V74 H106 V50 H144" fill="none" stroke="#334155" stroke-width="3"/>
        <path d="M52 40 L60 50 L48 56 M114 40 L106 50 L118 56" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <text x="83" y="85" text-anchor="middle" font-size="5.0" fill="#dc2626">二次回折波 → 4–16kHz 金属的クセ</text>
        <!-- Arrow -->
        <path d="M155 57 H165" stroke="#0284c7" stroke-width="2"/>
        <polygon points="167,57 161,53 161,61" fill="#0284c7"/>
        <!-- Right: exponential flared micro-chamfer -->
        <rect x="170" y="24" width="136" height="66" rx="4" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="238" y="34" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#0c4a6e">2026：指数関数マイクロ面取りホーン</text>
        <path d="M178 50 H204 Q218 50 220 74 H256 Q258 50 272 50 H298" fill="none" stroke="#334155" stroke-width="3"/>
        <path d="M196 40 Q218 44 228 68 M280 40 Q258 44 248 68" fill="none" stroke="#0284c7" stroke-width="2"/>
        <text x="238" y="85" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#0369a1">滑らか連続曲率 → 抜けの良い自然な声</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">穴のフチを0.5mmの滑らかなラッパ曲面に削り出し、角の乱反射で声が濁る現象を根絶！</text>
      `);

    case 'mc_dual_layer_wind_boundary_mesh':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f8fafc" stroke="#475569" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#0f172a">MC95 2段ピッチ音響インピーダンス整合・風境界層スプリッター複層メッシュ</text>
        <!-- Left 2-stage layered cross-section -->
        <rect x="14" y="24" width="184" height="66" rx="4" fill="#fff" stroke="#94a3b8"/>
        <text x="106" y="33" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#dc2626">強風 ＆ 「パピプペポ」息吹かれ ↓</text>
        <rect x="24" y="38" width="164" height="12" rx="2" fill="#94a3b8" stroke="#334155" stroke-dasharray="5 3"/>
        <text x="106" y="46.5" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0f172a">1層目：粗ピッチ SUS 織網（強風を細分化）</text>
        <rect x="24" y="51" width="164" height="11" fill="#e0f2fe"/>
        <text x="106" y="59" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#0369a1">1 mm 空気バッファ層（渦エネルギーを粘性減衰）</text>
        <rect x="24" y="63" width="164" height="12" rx="2" fill="#334155"/>
        <text x="106" y="71.5" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">2層目：極細校正音響抵抗網（そよ風を鎮静）</text>
        <text x="106" y="86" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#16a34a">クリアな声の高域 (〜20 kHz) だけ無減衰通過!</text>
        <!-- Right impedance badge -->
        <rect x="206" y="24" width="100" height="66" rx="4" fill="#f1f5f9" stroke="#64748b"/>
        <text x="256" y="38" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0f172a">2段整合スペック</text>
        <text x="256" y="53" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#0284c7">30–80 Rayls</text>
        <text x="256" y="66" text-anchor="middle" font-size="5.0" fill="#334155">風笛鳴り防止</text>
        <text x="256" y="79" text-anchor="middle" font-size="5.0" fill="#334155">高域こもりゼロ</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">粗網で強風を砕き、空気クッションを挟んで細網で鎮めるプロ音響のダブル防風カーテン！</text>
      `);

    case 'mc_hydrophobic_oleophobic_mesh':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#164e63">MC96 撥水 ＋ 撥油（皮脂・日焼け止め・雨滴）ハイブリッド防汚ナノ保護膜</text>
        <!-- Left cutaway showing both water AND oil beading up while sound passes through -->
        <rect x="14" y="24" width="176" height="66" rx="4" fill="#fff" stroke="#22d3ee"/>
        <circle cx="56" cy="43" r="12" fill="#38bdf8" stroke="#0284c7" stroke-width="1.4"/>
        <text x="56" y="45" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">雨滴</text>
        <circle cx="106" cy="44" r="11" fill="#fbbf24" stroke="#b45309" stroke-width="1.4"/>
        <text x="106" y="46" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#78350f">皮脂油</text>
        <rect x="22" y="56" width="160" height="10" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="102" y="63" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0f172a">低表面エネルギー多孔 ePTFE 膜 (γ &lt; 15mN/m)</text>
        <!-- Sound arrow passing through -->
        <path d="M154 32 V82" stroke="#16a34a" stroke-width="2.2" stroke-dasharray="3 2"/>
        <polygon points="154,84 150,77 158,77" fill="#16a34a"/>
        <text x="154" y="30" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#15803d">音波通過</text>
        <text x="82" y="81" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0e7490">撥水IPX ＋ 撥油等級6–8で目詰まり0</text>
        <!-- Right longevity cards -->
        <rect x="198" y="24" width="108" height="30" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="252" y="36" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0369a1">皮脂による音こもり防止</text>
        <text x="252" y="48" text-anchor="middle" font-size="5.0" fill="#0c4a6e">油の毛細管侵入をシャットアウト</text>
        <rect x="198" y="59" width="108" height="31" rx="4" fill="#ecfdf5" stroke="#10b981"/>
        <text x="252" y="71" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#065f46">音響挿入ロス &lt; 1.0 dB</text>
        <text x="252" y="83" text-anchor="middle" font-size="5.0" fill="#047857">何年使っても新品初日の抜け</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">雨だけでなく「指のアブラや汗」まで玉にして弾き、経年の音こもりを防ぐ防汚ナノ保護膜！</text>
      `);

    case 'mc_proximity_effect_eq_baffle':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fffbeb" stroke="#d97706" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#78350f">MC97 近接効果（至近距離の低音モコモコ）自動バランス圧力傾度EQ音道</text>
        <!-- Left frequency response comparison -->
        <rect x="14" y="24" width="156" height="66" rx="4" fill="#fff" stroke="#fbbf24"/>
        <text x="92" y="34" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#b45309">至近距離(15cm) 周波数カーブ比較</text>
        <line x1="24" y1="76" x2="160" y2="76" stroke="#94a3b8" stroke-width="1"/>
        <line x1="24" y1="39" x2="24" y2="76" stroke="#94a3b8" stroke-width="1"/>
        <path d="M26 42 Q56 44 82 60 T158 62" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="3 2"/>
        <path d="M26 62 Q72 60 158 62" fill="none" stroke="#16a34a" stroke-width="2.4"/>
        <text x="72" y="45" font-size="5.0" fill="#dc2626">従来: +12dB低音ボワ!</text>
        <text x="122" y="56" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#15803d">EQ音道: フラット!</text>
        <text x="38" y="85" font-size="4.8" fill="#475569">100Hz</text>
        <text x="142" y="85" font-size="4.8" fill="#475569">10kHz</text>
        <!-- Right rear dual-delay port structure -->
        <rect x="178" y="24" width="128" height="66" rx="4" fill="#fef3c7" stroke="#d97706"/>
        <text x="242" y="36" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#92400e">背面2段遅延ポート構造</text>
        <rect x="188" y="42" width="46" height="18" rx="3" fill="#0284c7"/>
        <text x="211" y="53" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fff">高域近ポート</text>
        <rect x="250" y="42" width="46" height="18" rx="3" fill="#d97706"/>
        <text x="273" y="53" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fff">低域遠ポート</text>
        <path d="M234 51 H250" stroke="#78350f" stroke-width="2"/>
        <text x="242" y="73" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#78350f">ミニチュア・バリアブルD思想</text>
        <text x="242" y="84" text-anchor="middle" font-size="5.0" fill="#92400e">自撮りVlog距離でも声クリア!</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">口を近づけると低音が膨らむ物理のクセを背面2段音道が自動で整え、自撮り声を聴きやすく！</text>
      `);

    case 'mc_acoustic_crosstalk_barrier':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f1f5f9" stroke="#334155" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#0f172a">MC98 左・右・後部3カプセル内部キャビティ シリコーン音響クロストーク遮断隔壁</text>
        <!-- Left top-down Y-bulkhead layout -->
        <rect x="14" y="24" width="166" height="66" rx="4" fill="#fff" stroke="#475569"/>
        <rect x="22" y="29" width="68" height="26" rx="3" fill="#bae6fd" stroke="#0284c7"/>
        <text x="56" y="44" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0c4a6e">左 L 独立音響室</text>
        <rect x="104" y="29" width="68" height="26" rx="3" fill="#fde68a" stroke="#d97706"/>
        <text x="138" y="44" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#78350f">右 R 独立音響室</text>
        <rect x="34" y="64" width="126" height="20" rx="3" fill="#ccfbf1" stroke="#0d9488"/>
        <text x="97" y="76.5" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#115e59">後部 第3指向性カプセル独立室</text>
        <!-- Bold silicone Y-bulkhead clearly in the corridor between rooms -->
        <rect x="93" y="29" width="8" height="32" rx="2" fill="#1e293b"/>
        <rect x="22" y="57" width="150" height="5" rx="2" fill="#1e293b"/>
        <!-- Right isolation benefit panel -->
        <rect x="188" y="24" width="118" height="66" rx="4" fill="#1e293b"/>
        <text x="247" y="38" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fde047">高比重シリコーン防音壁</text>
        <text x="247" y="54" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#34d399">クロストーク &lt; -40 dB</text>
        <text x="247" y="68" text-anchor="middle" font-size="5.0" fill="#e2e8f0">・左右ステレオの立体定位向上</text>
        <text x="247" y="80" text-anchor="middle" font-size="5.0" fill="#e2e8f0">・3カプセル指向性の切れ最大化</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">3つのマイク個室を厚いシリコーン防音壁で完全隔離！隣の部屋からの音漏れを断ち切る</text>
      `);

    case 'mc_high_spl_membrane_vent_flap':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fef2f2" stroke="#ef4444" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#7f1d1d">MC99 148 dB 爆音・突風衝撃波リリーフ 極小スリット振動膜安全フラップ弁</text>
        <!-- Left: Normal sound (flap sealed) -->
        <rect x="14" y="24" width="136" height="66" rx="4" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="82" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#166534">通常時 (〜125 dB)：ピタッと閉鎖</text>
        <line x1="24" y1="58" x2="64" y2="58" stroke="#334155" stroke-width="3"/>
        <line x1="65" y1="58" x2="100" y2="58" stroke="#eab308" stroke-width="3"/>
        <line x1="101" y1="58" x2="140" y2="58" stroke="#334155" stroke-width="3"/>
        <text x="82" y="75" text-anchor="middle" font-size="5.2" fill="#15803d">密閉維持 → 繊細な低音・高S/N</text>
        <!-- Arrow -->
        <path d="M153 57 H165" stroke="#dc2626" stroke-width="2.2"/>
        <polygon points="167,57 161,53 161,61" fill="#dc2626"/>
        <!-- Right: 148 dB shock wave (flap hinges open) -->
        <rect x="170" y="24" width="136" height="66" rx="4" fill="#fff" stroke="#dc2626"/>
        <text x="238" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#dc2626">148 dB 花火・爆圧：瞬間開放!</text>
        <path d="M238 38 V52" stroke="#dc2626" stroke-width="2.4"/>
        <polygon points="238,54 233,47 243,47" fill="#dc2626"/>
        <line x1="180" y1="60" x2="220" y2="60" stroke="#334155" stroke-width="3"/>
        <line x1="220" y1="60" x2="252" y2="75" stroke="#eab308" stroke-width="3"/>
        <line x1="258" y1="60" x2="298" y2="60" stroke="#334155" stroke-width="3"/>
        <text x="238" y="85" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#991b1b">過圧を裏へ逃がし数msで弾性復帰</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">普段は閉じて高音質を守り、爆音衝撃の瞬間だけ扉が開いて極薄鼓膜の破断を防ぐ安全弁！</text>
      `);

    case 'mc_sibilance_acoustic_diffuser':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fdf2f8" stroke="#ec4899" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#831843">MC100 6–9 kHz 歯擦音（サ行の刺さり）ピーク緩和 マイクロ音響ディフューザー格子</text>
        <!-- Left QRD multi-height pillar array -->
        <rect x="14" y="24" width="144" height="66" rx="4" fill="#fff" stroke="#f472b6"/>
        <text x="86" y="34" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#be185d">2次剰余（QRD）多段ピラー格子</text>
        <rect x="26" y="64" width="12" height="16" fill="#d97706"/>
        <rect x="42" y="48" width="12" height="32" fill="#d97706"/>
        <rect x="58" y="56" width="12" height="24" fill="#d97706"/>
        <rect x="74" y="42" width="12" height="38" fill="#d97706"/>
        <rect x="90" y="58" width="12" height="22" fill="#d97706"/>
        <rect x="106" y="46" width="12" height="34" fill="#d97706"/>
        <rect x="122" y="62" width="12" height="18" fill="#d97706"/>
        <rect x="138" y="52" width="12" height="28" fill="#d97706"/>
        <text x="86" y="87" text-anchor="middle" font-size="4.8" fill="#9d174d">尖った反射波を位相拡散して丸める</text>
        <!-- Right 6-9kHz peak smoothing curve -->
        <rect x="166" y="24" width="140" height="66" rx="4" fill="#fff" stroke="#ec4899"/>
        <text x="236" y="34" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#9d174d">6–9 kHz サ行共鳴ピーク緩和</text>
        <line x1="176" y1="74" x2="296" y2="74" stroke="#94a3b8" stroke-width="1"/>
        <path d="M178 60 H218 L236 38 L254 60 H294" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 2"/>
        <path d="M178 60 H218 Q236 55 254 60 H294" fill="none" stroke="#16a34a" stroke-width="2.4"/>
        <text x="272" y="45" text-anchor="middle" font-size="4.8" fill="#dc2626">従来:+6dB刺さり</text>
        <text x="236" y="69" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#15803d">拡散後: 滑らか!</text>
        <text x="236" y="85" text-anchor="middle" font-size="4.8" fill="#475569">物理調整だから声の艶を損なわない</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">高級コンサートの音響拡散壁を極小再現！耳にツンと刺さるサ行を物理的に優しく整える</text>
      `);

    // =========================================================================
    // GROUP 3: MC101–MC110 — 2026 AI DEREVERB, MULTI-SPEAKER, UWB RX & 3D HRTF BINAURAL
    // =========================================================================

    case 'mc_ai_dereverb_room_cancel_2026':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#4c1d95">MC101 2026 リアルタイムAI残響除去（デリーバーブ）＆ 室内反響キャンセルNPU</text>
        <!-- Left room echo impulse -->
        <rect x="14" y="24" width="114" height="66" rx="4" fill="#fff" stroke="#c4b5fd"/>
        <text x="71" y="34" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#6d28d9">会議室・ホテルのワンワン声</text>
        <rect x="24" y="42" width="16" height="34" rx="2" fill="#7c3aed"/>
        <rect x="44" y="48" width="12" height="28" rx="2" fill="#ddd6fe" stroke="#dc2626" stroke-dasharray="2 1"/>
        <rect x="60" y="54" width="12" height="22" rx="2" fill="#ddd6fe" stroke="#dc2626" stroke-dasharray="2 1"/>
        <rect x="76" y="60" width="12" height="16" rx="2" fill="#ede9fe" stroke="#dc2626" stroke-dasharray="2 1"/>
        <rect x="92" y="66" width="12" height="10" rx="2" fill="#ede9fe" stroke="#dc2626" stroke-dasharray="2 1"/>
        <text x="71" y="86" text-anchor="middle" font-size="5.0" fill="#dc2626">直接音 ＋ 遅れて届く壁残響尾</text>
        <!-- Center AI NPU -->
        <path d="M130 57 H140" stroke="#7c3aed" stroke-width="2"/>
        <polygon points="142,57 136,53 136,61" fill="#7c3aed"/>
        <rect x="144" y="30" width="64" height="54" rx="4" fill="#6d28d9"/>
        <text x="176" y="46" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">Edge-NPU</text>
        <text x="176" y="58" text-anchor="middle" font-size="5.2" fill="#ede9fe">残響テールだけ</text>
        <text x="176" y="69" text-anchor="middle" font-size="5.2" fill="#ede9fe">実時間剥離</text>
        <text x="176" y="80" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fde047">遅延 &lt;10 ms</text>
        <path d="M210 57 H220" stroke="#16a34a" stroke-width="2"/>
        <polygon points="222,57 216,53 216,61" fill="#16a34a"/>
        <!-- Right studio clean direct voice -->
        <rect x="224" y="24" width="82" height="66" rx="4" fill="#ecfdf5" stroke="#10b981"/>
        <text x="265" y="35" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#065f46">防音スタジオ品質!</text>
        <rect x="255" y="42" width="20" height="34" rx="2" fill="#10b981"/>
        <text x="265" y="85" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#047857">芯ある直接音のみ</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">声の裏に重なる壁のワンワン反響だけを0.01秒未満で剥がし取り、普通の部屋をスタジオ化！</text>
      `);

    case 'mc_speaker_diarization_track_2026':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#0c4a6e">MC102 2026 リアルタイム多話者声紋分離（ダイアリゼーション）＆ 独立トラック化</text>
        <!-- Left overlapping conversation + Eye-AF -->
        <rect x="14" y="24" width="94" height="66" rx="4" fill="#fff" stroke="#38bdf8"/>
        <text x="61" y="34" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#0369a1">対談で声が同時に重複!</text>
        <circle cx="44" cy="54" r="11" fill="#0ea5e9" opacity="0.85"/>
        <text x="44" y="56" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">Aさん</text>
        <circle cx="76" cy="54" r="11" fill="#f59e0b" opacity="0.85"/>
        <text x="76" y="56" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">Bさん</text>
        <text x="61" y="79" text-anchor="middle" font-size="4.8" fill="#475569">瞳AF顔座標 ＋ 声紋入力</text>
        <!-- Center AI separator -->
        <path d="M110 57 H122" stroke="#0284c7" stroke-width="2"/>
        <polygon points="124,57 118,53 118,61" fill="#0284c7"/>
        <rect x="126" y="30" width="66" height="54" rx="4" fill="#4f46e5"/>
        <text x="159" y="46" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">視聴覚AI分離</text>
        <text x="159" y="59" text-anchor="middle" font-size="5.0" fill="#c7d2fe">到来方向 DOA</text>
        <text x="159" y="71" text-anchor="middle" font-size="5.0" fill="#c7d2fe">× 個人声紋抽出</text>
        <!-- Split arrows to CH1 & CH2 -->
        <path d="M192 48 L210 40 M192 66 L210 74" stroke="#0284c7" stroke-width="2"/>
        <rect x="212" y="26" width="94" height="28" rx="4" fill="#0ea5e9"/>
        <text x="259" y="38" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">CH1：Aさん単独声</text>
        <text x="259" y="49" text-anchor="middle" font-size="4.8" fill="#e0f2fe">独立トラック・文字起こし最適</text>
        <rect x="212" y="60" width="94" height="28" rx="4" fill="#f59e0b"/>
        <text x="259" y="72" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">CH2：Bさん単独声</text>
        <text x="259" y="83" text-anchor="middle" font-size="4.8" fill="#fef3c7">ピンマイク2本並みに分離!</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">カメラの瞳AF顔座標と声紋AIが合体！2人が同時に話してもCH1・CH2へ綺麗に分離録音</text>
      `);

    case 'mc_uwb_24g_lossless_rx_2026':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f0fdfa" stroke="#14b8a6" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#115e59">MC103 2026 超低遅延 &lt;2 ms ロスレス 2.4 GHz / UWB 無線ダイバーシティ受信IF</text>
        <!-- Left wireless mic Tx -->
        <rect x="14" y="32" width="58" height="50" rx="4" fill="#0f766e"/>
        <text x="43" y="49" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">無線マイク</text>
        <text x="43" y="61" text-anchor="middle" font-size="5.0" fill="#99f6e4">非圧縮24/32b</text>
        <text x="43" y="73" text-anchor="middle" font-size="4.8" fill="#fde047">UWB / 2.4G</text>
        <!-- Dual radio waves -->
        <path d="M74 44 Q102 34 128 42" fill="none" stroke="#14b8a6" stroke-width="2" stroke-dasharray="4 2"/>
        <path d="M74 70 Q102 80 128 72" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="102" y="59" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#0f766e">遅延 &lt;2 ms!</text>
        <!-- Center orthogonal dual diversity antennas -->
        <rect x="130" y="24" width="90" height="66" rx="4" fill="#fff" stroke="#14b8a6"/>
        <text x="175" y="34" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#0f766e">90°直交2アンテナ</text>
        <rect x="140" y="40" width="44" height="11" rx="2" fill="#0d9488"/>
        <text x="162" y="48" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fff">水平 Ant-A</text>
        <rect x="196" y="40" width="12" height="36" rx="2" fill="#0284c7"/>
        <text x="162" y="64" text-anchor="middle" font-size="5.0" fill="#0369a1">毎瞬強い電波を</text>
        <text x="162" y="74" text-anchor="middle" font-size="5.0" fill="#0369a1">自動シームレス選択</text>
        <text x="175" y="86" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#15803d">人体遮蔽の音切れゼロ</text>
        <!-- Right camera digital direct -->
        <path d="M222 57 H234" stroke="#0284c7" stroke-width="2"/>
        <polygon points="236,57 230,53 230,61" fill="#0284c7"/>
        <rect x="238" y="30" width="68" height="54" rx="4" fill="#0284c7"/>
        <text x="272" y="47" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">MIシュー直結</text>
        <text x="272" y="60" text-anchor="middle" font-size="5.0" fill="#e0f2fe">A/D二重劣化0</text>
        <text x="272" y="73" text-anchor="middle" font-size="5.0" fill="#fde047">完全リップシンク</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">直交2アンテナで電波切れを防ぎ、0.002秒未満の超速＆非圧縮デジタル直結で有線級の音質！</text>
      `);

    case 'mc_safety_track_minus20db_mux':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#14532d">MC104 Sony ECM-M1思想 4chセーフティトラック（-20 dB控え＆全指向同時記録）</text>
        <!-- 4 synchronized tracks -->
        <rect x="14" y="24" width="184" height="20" rx="3" fill="#16a34a"/>
        <text x="22" y="36" font-size="5.6" font-weight="bold" fill="#fff">CH1/2 指向性メイン (0 dB)</text>
        <path d="M128 34 L134 26 H148 L154 42 H166 L172 34 H192" fill="none" stroke="#fef08a" stroke-width="1.8"/>
        <rect x="14" y="47" width="184" height="20" rx="3" fill="#0ea5e9"/>
        <text x="22" y="59" font-size="5.6" font-weight="bold" fill="#fff">CH3 全指向バックアップ (向きミス救済)</text>
        <rect x="14" y="70" width="184" height="20" rx="3" fill="#f59e0b"/>
        <text x="22" y="82" font-size="5.6" font-weight="bold" fill="#fff">CH4 -20 dB セーフティ控え</text>
        <path d="M128 80 L136 74 L144 85 L154 75 L164 84 L174 80 H192" fill="none" stroke="#fff" stroke-width="1.8"/>
        <!-- Right rescue callout -->
        <rect x="206" y="24" width="100" height="66" rx="4" fill="#fff" stroke="#16a34a"/>
        <text x="256" y="36" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#dc2626">突発の大爆笑でも!</text>
        <text x="256" y="50" text-anchor="middle" font-size="5.0" fill="#dc2626">CH1が天井張り付き</text>
        <path d="M256 54 V64" stroke="#16a34a" stroke-width="2"/>
        <polygon points="256,66 252,60 260,60" fill="#16a34a"/>
        <text x="256" y="76" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#15803d">CH4(-20dB)は無傷!</text>
        <text x="256" y="86" text-anchor="middle" font-size="4.8" fill="#166534">差替えで100%救済</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">突然の大声で音割れしても、裏側で1/10音量同時録音した予備CHが100%無傷で命を救う！</text>
      `);

    case 'mc_lufs_broadcast_loudness_dsp':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#78350f">MC105 放送・YouTube基準（-14 / -24 LUFS）K特性ラウドネス自動整音DSP</text>
        <!-- Left raw uneven loudness bars -->
        <rect x="14" y="24" width="118" height="66" rx="4" fill="#fff" stroke="#fca5a5"/>
        <text x="73" y="34" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#991b1b">整音前：大きすぎ・小さすぎ</text>
        <rect x="24" y="64" width="14" height="16" fill="#94a3b8"/>
        <rect x="44" y="38" width="14" height="42" fill="#ef4444"/>
        <rect x="64" y="68" width="14" height="12" fill="#94a3b8"/>
        <rect x="84" y="40" width="14" height="40" fill="#ef4444"/>
        <rect x="104" y="60" width="14" height="20" fill="#f59e0b"/>
        <text x="73" y="87" text-anchor="middle" font-size="4.8" fill="#dc2626">視聴者が毎回音量操作で疲れ</text>
        <!-- Arrow -->
        <path d="M135 57 H147" stroke="#f59e0b" stroke-width="2.2"/>
        <polygon points="149,57 143,53 143,61" fill="#f59e0b"/>
        <!-- Right normalized K-weighted LUFS bars -->
        <rect x="152" y="24" width="154" height="66" rx="4" fill="#fff" stroke="#16a34a"/>
        <text x="229" y="34" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#166534">K特性自動整音後：常に心地よい音量!</text>
        <line x1="160" y1="48" x2="298" y2="48" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="4 2"/>
        <rect x="166" y="49" width="16" height="29" fill="#22c55e"/>
        <rect x="190" y="48" width="16" height="30" fill="#22c55e"/>
        <rect x="214" y="50" width="16" height="28" fill="#22c55e"/>
        <rect x="238" y="48" width="16" height="30" fill="#22c55e"/>
        <rect x="262" y="49" width="16" height="29" fill="#22c55e"/>
        <text x="230" y="45" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0369a1">YouTube -14 / TV放送 -24 LUFS 基準線</text>
        <text x="229" y="86" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#15803d">無音ノイズは持ち上げず撮って出し即公開!</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">人の耳の感覚に近いK特性フィルタで体感音量を自動整音！撮ってそのままプロ番組並み</text>
      `);

    case 'mc_ultrasonic_shutter_vcm_filter':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fff7ed" stroke="#ea580c" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#7c2d12">MC106 30–100 kHz IBIS・VCM超音波PWM折り返し雑音 急峻アンチエイリアスフィルタ</text>
        <!-- Full frequency plot showing 20Hz-20kHz flat passband + steep cliff blocking 30-100kHz fold-back -->
        <rect x="14" y="24" width="292" height="66" rx="4" fill="#fff" stroke="#fb923c"/>
        <line x1="24" y1="78" x2="296" y2="78" stroke="#94a3b8" stroke-width="1"/>
        <!-- Passband shading -->
        <rect x="26" y="34" width="120" height="44" fill="#dcfce7" opacity="0.5"/>
        <!-- Stopband shading -->
        <rect x="166" y="34" width="128" height="44" fill="#fee2e2" opacity="0.5"/>
        <!-- Steep brick-wall filter response -->
        <path d="M26 38 H144 L164 76 H294" fill="none" stroke="#ea580c" stroke-width="2.6"/>
        <!-- Nyquist vertical line -->
        <line x1="154" y1="28" x2="154" y2="78" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="3 2"/>
        <text x="86" y="54" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#15803d">可聴帯域 20Hz–20kHz</text>
        <text x="86" y="65" text-anchor="middle" font-size="5.2" fill="#166534">±0.1 dB 完全フラット保護</text>
        <!-- Blocked ultrasonic motor spikes cleanly on far right -->
        <line x1="274" y1="75" x2="274" y2="38" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="2 2"/>
        <line x1="286" y1="75" x2="286" y2="46" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="2 2"/>
        <circle cx="274" cy="38" r="2.2" fill="#dc2626"/>
        <text x="218" y="47" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#b91c1c">IBIS / VCM 40–100kHz超音波</text>
        <text x="218" y="59" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#dc2626">-60 dB 超でバッサリ遮断!</text>
        <text x="218" y="70" text-anchor="middle" font-size="4.8" fill="#7f1d1d">ADC折り返し「キーン音」化ゼロ</text>
        <text x="154" y="86" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#dc2626">24kHz ナイキスト境界</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">見えないモーター超音波が「聞こえるキーン雑音」へ化ける折り返し現象を入口で完全遮断！</text>
      `);

    case 'mc_dc_servo_subsonic_integrator':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fefce8" stroke="#ca8a04" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#713f12">MC107 0.5 Hz未満 超低域DCオフセット自動除去サーボ積分回路（音の水平器）</text>
        <!-- Left drifted waveform clipping ceiling -->
        <rect x="14" y="24" width="134" height="66" rx="4" fill="#fff" stroke="#fca5a5"/>
        <text x="81" y="34" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#dc2626">DCズレ有：上天井にすぐ音割れ!</text>
        <line x1="22" y1="42" x2="140" y2="42" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="2 2"/>
        <line x1="22" y1="62" x2="140" y2="62" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 2"/>
        <path d="M24 50 Q36 38 48 50 T72 50 T96 50 T120 50 T138 46" fill="none" stroke="#ef4444" stroke-width="2"/>
        <text x="81" y="78" text-anchor="middle" font-size="5.0" fill="#991b1b">中心が+側へズレ → 編集でプチッ音</text>
        <!-- Arrow -->
        <path d="M151 57 H163" stroke="#ca8a04" stroke-width="2.2"/>
        <polygon points="165,57 159,53 159,61" fill="#ca8a04"/>
        <!-- Right centered waveform -->
        <rect x="168" y="24" width="138" height="66" rx="4" fill="#fff" stroke="#16a34a"/>
        <text x="237" y="34" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#15803d">DCサーボ後：0.00V ど真ん中水平!</text>
        <line x1="176" y1="60" x2="298" y2="60" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="3 2"/>
        <path d="M178 60 Q190 44 202 60 T226 60 T250 60 T274 60 T296 60" fill="none" stroke="#16a34a" stroke-width="2.4"/>
        <text x="237" y="84" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#166534">&lt;0.5Hzのみ除去・上下ヘッドルーム最大</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">音の波をいつも0.00Vのど真ん中に保つ水平器！音割れ余裕を最大化し編集時のプチッ音も消す</text>
      `);

    case 'mc_pdm_tdm_clk_spread_spectrum':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#164e63">MC108 スペクトラム拡散（SSCG）PDM/TDM音声クロック（高ISO横縞干渉ゼロ化）</text>
        <!-- Left EMI spectrum comparison -->
        <rect x="14" y="24" width="174" height="66" rx="4" fill="#fff" stroke="#22d3ee"/>
        <line x1="24" y1="78" x2="178" y2="78" stroke="#94a3b8" stroke-width="1"/>
        <!-- Sharp EMI spike (old clock) -->
        <path d="M28 77 H92 L101 32 L110 77 H174" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 2"/>
        <!-- Spread low broad hump (SSCG) -->
        <path d="M28 77 H48 Q101 58 154 77 H174" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
        <text x="146" y="40" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#dc2626">従来: 鋭い電波トゲ</text>
        <rect x="67" y="64" width="68" height="10" rx="2.5" fill="#0369a1"/>
        <text x="101" y="71" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#ffffff">拡散で -12 dB 低減</text>
        <text x="101" y="86" text-anchor="middle" font-size="4.8" fill="#475569">3.072 MHz PDM クロック高調波スペクトル</text>
        <!-- Right photo+audio harmony -->
        <rect x="196" y="24" width="110" height="66" rx="4" fill="#0c4a6e"/>
        <text x="251" y="38" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fde047">音と高ISO画質の両立</text>
        <text x="251" y="53" text-anchor="middle" font-size="5.2" fill="#fff">・ISO 51200暗所横縞ゼロ</text>
        <text x="251" y="66" text-anchor="middle" font-size="5.2" fill="#fff">・Audioジッター &lt;50 ps</text>
        <text x="251" y="79" text-anchor="middle" font-size="5.2" fill="#7dd3fc">・センサーH-Sync同期制御</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">マイクの時計電波のトゲを滑らかに散らし、ハイレゾ音質も超高感度写真の画質も両方守る！</text>
      `);

    case 'mc_headphone_sidetone_eq_monitor':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#ecfdf5" stroke="#10b981" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#065f46">MC109 リアルタイム音声異常アラート（風吹かれ・音割れ・断線検知）＆ EVF監視</text>
        <!-- EVF Live HUD mockup -->
        <rect x="14" y="24" width="184" height="66" rx="5" fill="#0f172a" stroke="#334155"/>
        <text x="106" y="35" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#94a3b8">EVF / モニター リアルタイム音声警告HUD</text>
        <!-- 3 clear alert cards inside EVF -->
        <rect x="22" y="41" width="52" height="30" rx="3" fill="#064e3b" stroke="#22c55e"/>
        <circle cx="48" cy="51" r="4.5" fill="#22c55e"/>
        <text x="48" y="65" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#86efac">正常収録</text>
        <rect x="80" y="41" width="52" height="30" rx="3" fill="#451a03" stroke="#f59e0b"/>
        <circle cx="106" cy="51" r="4.5" fill="#f59e0b"/>
        <text x="106" y="65" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fde68a">風検知!</text>
        <rect x="138" y="41" width="52" height="30" rx="3" fill="#450a0a" stroke="#ef4444"/>
        <circle cx="164" cy="51" r="4.5" fill="#ef4444"/>
        <text x="164" y="65" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fca5a5">半挿/音割</text>
        <text x="106" y="83" text-anchor="middle" font-size="4.8" fill="#cbd5e1">L/R低域相関解析 &lt;0.2秒 ＋ バイアス断線監視</text>
        <!-- Right headphone sidetone card -->
        <rect x="206" y="24" width="100" height="66" rx="4" fill="#fff" stroke="#10b981"/>
        <text x="256" y="38" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#065f46">現場で即リカバリ</text>
        <text x="256" y="53" text-anchor="middle" font-size="5.2" fill="#334155">遅延 &lt;1ms 耳モニター</text>
        <text x="256" y="66" text-anchor="middle" font-size="5.2" fill="#334155">無音トラブル撮影前警告</text>
        <text x="256" y="79" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#15803d">帰宅後の絶望をゼロに</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">「今、風が入ってる！」「プラグ半分抜けてる！」を撮影中にファインダーへ即知らせる音響ナビ！</text>
      `);

    case 'mc_anechoic_3d_hrtf_binaural_2026':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fdf4ff" stroke="#c026d3" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#701a75">MC110 2026 リアルタイムHRTF（頭部伝達関数）3D立体バイノーラルレンダラー</text>
        <!-- Left 3D spatial sound sphere around listener head -->
        <rect x="14" y="24" width="144" height="66" rx="4" fill="#fff" stroke="#e879f9"/>
        <ellipse cx="86" cy="57" rx="46" ry="15" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <ellipse cx="86" cy="57" rx="19" ry="26" fill="none" stroke="#f59e0b" stroke-width="1.6"/>
        <circle cx="86" cy="57" r="10" fill="#a21caf"/>
        <text x="86" y="59.5" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">頭部</text>
        <!-- 3D sound source nodes clearly positioned on rings without colliding with header -->
        <circle cx="131" cy="55" r="4" fill="#10b981"/>
        <text x="145" y="57" font-size="4.8" font-weight="bold" fill="#047857">右</text>
        <circle cx="41" cy="55" r="4" fill="#0284c7"/>
        <text x="27" y="57" font-size="4.8" font-weight="bold" fill="#0369a1">左</text>
        <circle cx="86" cy="31" r="4" fill="#ef4444"/>
        <text x="108" y="33" font-size="4.8" font-weight="bold" fill="#dc2626">頭上</text>
        <text x="86" y="87" text-anchor="middle" font-size="4.8" fill="#86198f">水平360° ＋ 上下仰角 ＋ 奥行き定位</text>
        <!-- Right HRTF convolution flow -->
        <rect x="166" y="24" width="140" height="66" rx="4" fill="#fae8ff" stroke="#c026d3"/>
        <text x="236" y="36" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#701a75">耳たぶと頭の影を実時間計算</text>
        <text x="236" y="50" text-anchor="middle" font-size="5.2" fill="#4a044e">・両耳時間差 (ITD) ＋ 音圧差 (ILD)</text>
        <text x="236" y="63" text-anchor="middle" font-size="5.2" fill="#4a044e">・耳介スペクトル変化をFFT畳み込み</text>
        <text x="236" y="78" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#a21caf">普通のイヤホンで360°現場没入!</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">耳たぶと頭の音響反射（HRTF）をリアルタイム計算し、普通のイヤホンだけで360°立体音場へ！</text>
      `);

    default:
      return null;
  }
}
