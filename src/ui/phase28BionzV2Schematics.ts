import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 28B Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (30 diagrams):
 *   - BIONZ XR / XR2 V2 Ultra-Microscopic 2nm GAA / A16 BSPDN & 2026 Silicon Core (X2-01 – X2-30)
 * Every visual element and text line is calibrated strictly inside x ∈ [6, 314].
 */
export function renderPhase28BionzV2SchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    case 'xv2_soic_hybrid_bond_3d':
      return wrapSvg(`
        <rect x="20" y="18" width="94" height="22" rx="3" fill="#4f46e5"/>
        <text x="67" y="32" text-anchor="middle" font-size="6.4" fill="#fff">上チップ(AI / 3D SRAM)</text>
        ${[34, 56, 78, 100].map((x) => `<rect x="${x - 5}" y="40" width="10" height="14" fill="#d97736"/>`).join('')}
        <rect x="20" y="54" width="94" height="22" rx="3" fill="#0f766e"/>
        <text x="67" y="68" text-anchor="middle" font-size="6.4" fill="#fff">下チップ(BIONZ コア)</text>
        <text x="67" y="88" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#b45309">はんだ0! サブ10μm銅直結</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fff7ed" stroke="#d97736"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#9a3412">X2-01 TSMC SoIC 3D銅直結</text>
        <text x="140" y="43" font-size="6.9" fill="#7c2d12">・はんだ全廃で銅原子同士を直接融合</text>
        <text x="140" y="56" font-size="6.9" fill="#7c2d12">・接続密度10〜100倍＆電力1/10以下</text>
        <text x="140" y="69" font-size="6.9" fill="#7c2d12">・2枚のチップが1つの脳のように動作</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#9a3412">サブ10μmピッチの銅直結でAIとキャッシュを縦に一体化させる2026年3D合体技</text>
      `);

    case 'xv2_cowos_l_active_lsi':
      return wrapSvg(`
        <rect x="16" y="22" width="44" height="28" rx="3" fill="#0f766e"/>
        <text x="38" y="39" text-anchor="middle" font-size="6.3" fill="#fff">ISPダイ</text>
        <rect x="74" y="22" width="44" height="28" rx="3" fill="#6366f1"/>
        <text x="96" y="39" text-anchor="middle" font-size="6.3" fill="#fff">AIダイ</text>
        <rect x="34" y="54" width="66" height="24" rx="3" fill="#0284c7" stroke="#0369a1" stroke-width="1.5"/>
        <text x="67" y="65" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">Active LSI橋</text>
        <text x="67" y="74" text-anchor="middle" font-size="5.8" fill="#fef08a">内蔵リピータ増幅!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0369a1">X2-02 CoWoS-L Active LSI</text>
        <text x="140" y="43" font-size="6.9" fill="#0c4a6e">・境界下に局所シリコンの橋を埋設</text>
        <text x="140" y="56" font-size="6.9" fill="#0c4a6e">・橋内部に増幅リピータ内蔵(ISSCC26)</text>
        <text x="140" y="69" font-size="6.9" fill="#0c4a6e">・UCIe-S 2/2μm配線で毎秒数TB直結</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#0369a1">チップ間をつなぐ極小シリコンの橋の中に増幅器まで仕込み、超高速で協調動作</text>
      `);

    case 'xv2_lpddr6_1c_phy':
      return wrapSvg(`
        <rect x="16" y="20" width="46" height="36" rx="3" fill="#2563eb"/>
        <text x="39" y="36" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#fff">Sub-Ch A</text>
        <text x="39" y="48" text-anchor="middle" font-size="5.8" fill="#dbeafe">14.4Gb/s</text>
        <rect x="70" y="20" width="46" height="36" rx="3" fill="#94a3b8" stroke="#475569" stroke-dasharray="3 2"/>
        <text x="93" y="36" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#fff">Sub-Ch B</text>
        <text x="93" y="48" text-anchor="middle" font-size="5.8" fill="#fef08a">待機時休止</text>
        <rect x="16" y="62" width="100" height="20" rx="3" fill="#1e3a8a"/>
        <text x="66" y="75" text-anchor="middle" font-size="6.3" fill="#fff">2nm SF2 LPDDR6 PHY</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#1e40af">X2-03 ISSCC26 LPDDR6 PHY</text>
        <text x="140" y="43" font-size="6.9" fill="#1e3a8a">・1c世代 14.4Gb/s(LPDDR5X比+35%)</text>
        <text x="140" y="56" font-size="6.9" fill="#1e3a8a">・補助車線の時計停止で電力最大-50%</text>
        <text x="140" y="69" font-size="6.9" fill="#1e3a8a">・Paper 15.7/37.3 2026年最新発表</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#1e40af">超高速2車線とエコ休止モードを自在切替し、30fps連写と長い電池寿命を両立</text>
      `);

    case 'xv2_glass_core_tgv':
      return wrapSvg(`
        <rect x="16" y="28" width="100" height="44" rx="3" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
        ${[36, 66, 96]
          .map(
            (x) =>
              `<polygon points="${x - 8},28 ${x + 8},28 ${x + 4},50 ${x + 8},72 ${x - 8},72 ${x - 4},50" fill="#d97736" stroke="#92400e"/>`
          )
          .join('')}
        <text x="66" y="22" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#0369a1">超平坦ガラスコア ＋ 砂時計TGV</text>
        <text x="66" y="84" text-anchor="middle" font-size="6.2" fill="#0c4a6e">熱反りゼロ＆高周波ロス激減!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0f9ff" stroke="#38bdf8"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0369a1">X2-04 ガラスコア基板＆TGV</text>
        <text x="140" y="43" font-size="6.9" fill="#0c4a6e">・樹脂の代わりに特殊ガラスを芯に採用</text>
        <text x="140" y="56" font-size="6.9" fill="#0c4a6e">・レーザー改質で砂時計型の銅貫通穴</text>
        <text x="140" y="69" font-size="6.9" fill="#0c4a6e">・シリコンと膨張率一致で大型化自在</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#0369a1">超平坦なガラス板に数万本の銅柱を通すことで、反りゼロと超微細配線を実現</text>
      `);

    case 'xv2_electro_optical_cpo':
      return wrapSvg(`
        <rect x="16" y="20" width="100" height="60" rx="4" fill="#1e293b"/>
        <path d="M22 38 H110 M22 62 H110" stroke="#38bdf8" stroke-width="2.2"/>
        <circle cx="52" cy="50" r="9" fill="none" stroke="#ec4899" stroke-width="2"/>
        <circle cx="82" cy="50" r="9" fill="none" stroke="#f59e0b" stroke-width="2"/>
        <text x="66" y="31" text-anchor="middle" font-size="6.1" fill="#f472b6">18ns 光電ルーター(DWDM)</text>
        <text x="66" y="75" text-anchor="middle" font-size="6" fill="#bae6fd">Si光導波路 1310nm</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fdf2f8" stroke="#ec4899"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#9d174d">X2-05 ISSCC26 光インターポーザ</text>
        <text x="140" y="43" font-size="6.9" fill="#831843">・電気の代わりにレーザー光でチップ間通信</text>
        <text x="140" y="56" font-size="6.9" fill="#831843">・光リング共振器で18ナノ秒の高速切替</text>
        <text x="140" y="69" font-size="6.9" fill="#831843">・銅線の発熱・抵抗ロスを光通信で突破</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#9d174d">チップ土台に極細の光の道とマイクロリングを刻み、光の速さでデータを超省エネ伝送</text>
      `);

    case 'xv2_slvsec_pam4_cdr':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="4" fill="#0f172a"/>
        <path d="M24 72 Q42 56 60 72 Q78 56 96 72" fill="none" stroke="#38bdf8" stroke-width="1.6"/>
        <path d="M24 56 Q42 40 60 56 Q78 40 96 56" fill="none" stroke="#22c55e" stroke-width="1.6"/>
        <path d="M24 40 Q42 24 60 40 Q78 24 96 40" fill="none" stroke="#f59e0b" stroke-width="1.6"/>
        <text x="104" y="34" font-size="5.8" fill="#f59e0b">11</text>
        <text x="104" y="48" font-size="5.8" fill="#22c55e">10</text>
        <text x="104" y="62" font-size="5.8" fill="#38bdf8">01</text>
        <text x="104" y="75" font-size="5.8" fill="#94a3b8">00</text>
        <text x="66" y="92" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0284c7">PAM4(4値) 3つの目＋CDR復元</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0e7490">X2-06 SLVS-EC / PAM4 SerDes</text>
        <text x="140" y="43" font-size="6.9" fill="#155e75">・4段階電圧で1本の線に2倍のRAW伝送</text>
        <text x="140" y="56" font-size="6.9" fill="#155e75">・Tコイル＋CTLE/DFEで波形を復元</text>
        <text x="140" y="69" font-size="6.9" fill="#155e75">・埋込クロックでIBIS揺れでもスキュー0</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#0e7490">4段階の電圧の波とデジタル波形復元により、毎秒数十GBのRAWを無誤差で受信</text>
      `);

    case 'xv2_beol_airgap_ulk':
      return wrapSvg(`
        <rect x="16" y="24" width="100" height="54" rx="3" fill="#f1f5f9" stroke="#94a3b8"/>
        <rect x="22" y="32" width="18" height="36" rx="2" fill="#d97736"/>
        <rect x="57" y="32" width="18" height="36" rx="2" fill="#d97736"/>
        <rect x="92" y="32" width="18" height="36" rx="2" fill="#d97736"/>
        <rect x="42" y="34" width="13" height="32" rx="2" fill="#ffffff" stroke="#0284c7" stroke-dasharray="2 2"/>
        <rect x="77" y="34" width="13" height="32" rx="2" fill="#ffffff" stroke="#0284c7" stroke-dasharray="2 2"/>
        <text x="48.5" y="52" text-anchor="middle" font-size="5.5" fill="#0284c7">空気</text>
        <text x="83.5" y="52" text-anchor="middle" font-size="5.5" fill="#0284c7">空気</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#9a3412">X2-07 BEOL空気溝＋ULK絶縁</text>
        <text x="140" y="43" font-size="6.9" fill="#7c2d12">・極細配線の間を空気空洞(k=1.0)化</text>
        <text x="140" y="56" font-size="6.9" fill="#7c2d12">・隣り配線間の電気ブレーキ容量-30%</text>
        <text x="140" y="69" font-size="6.9" fill="#7c2d12">・高クロック動作と省電力を同時改善</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#9a3412">びっしり並んだ電線の間に空気の溝を彫り、信号の遅れと無駄な消費電力を削減</text>
      `);

    case 'xv2_ru_mo_m0_tracks':
      return wrapSvg(`
        <rect x="18" y="22" width="38" height="52" rx="3" fill="#475569"/>
        <rect x="26" y="30" width="22" height="36" rx="1" fill="#d97736"/>
        <text x="37" y="50" text-anchor="middle" font-size="6" fill="#fff">旧Cu+膜</text>
        <text x="37" y="84" text-anchor="middle" font-size="5.8" fill="#64748b">バリア厚い</text>
        <rect x="74" y="22" width="38" height="52" rx="3" fill="#94a3b8" stroke="#334155" stroke-width="1.6"/>
        <text x="93" y="50" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#0f172a">新Ru/Mo</text>
        <text x="93" y="84" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0284c7">バリア不要!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0f172a">X2-08 21nm ルテニウムM0配線</text>
        <text x="140" y="43" font-size="6.9" fill="#334155">・線幅15nm以下で銅より低抵抗なRu</text>
        <text x="140" y="56" font-size="6.9" fill="#334155">・バリア膜なしで導体断面積を最大化</text>
        <text x="140" y="69" font-size="6.9" fill="#334155">・融点2,300℃超で断線(EM)耐性抜群</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#334155">極細で詰まる銅の弱点を、保護膜不要の希少金属ルテニウム＆モリブデンで突破</text>
      `);

    case 'xv2_beol_metal_temp_sensor':
      return wrapSvg(`
        <rect x="20" y="18" width="94" height="58" rx="4" fill="#fef2f2" stroke="#dc2626"/>
        <path d="M30 28 H104 V38 H30 V48 H104 V58 H30 V66 H104" fill="none" stroke="#dc2626" stroke-width="2.6"/>
        <text x="67" y="88" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#991b1b">抵抗518倍・面積1%の空中体温計</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#991b1b">X2-09 ISSCC26 BEOL温度計</text>
        <text x="140" y="43" font-size="6.9" fill="#7f1d1d">・Samsung SF2発表の上層金属抵抗型</text>
        <text x="140" y="56" font-size="6.9" fill="#7f1d1d">・下層のトランジスタ面積を一切奪わない</text>
        <text x="140" y="69" font-size="6.9" fill="#7f1d1d">・AI/動画の熱い場所を多数点で監視</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#991b1b">配線層のスキマに極小の蛇行金属線を忍ばせ、8K録画中の局所発熱を精密監視</text>
      `);

    case 'xv2_shpmim_decap':
      return wrapSvg(`
        <rect x="20" y="20" width="94" height="10" rx="2" fill="#d97736"/>
        ${[30, 44, 58, 72, 86, 100]
          .map(
            (x, i) =>
              `<rect x="${x - 3}" y="30" width="6" height="40" fill="${i % 2 === 0 ? '#7c3aed' : '#eab308'}"/>`
          )
          .join('')}
        <rect x="20" y="70" width="94" height="10" rx="2" fill="#475569"/>
        <text x="67" y="92" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#6d28d9">3Dひだ状SHPMIM 電気貯水ダム</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f5f3ff" stroke="#8b5cf6"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#5b21b6">X2-10 TSMC N2P SHPMIM容量</text>
        <text x="140" y="43" font-size="6.9" fill="#4c1d95">・3D高誘電ひだ構造で単位容量2倍超</text>
        <text x="140" y="56" font-size="6.9" fill="#4c1d95">・AI起動の瞬間電圧落ちを1nsで補給</text>
        <text x="140" y="69" font-size="6.9" fill="#4c1d95">・余分な安全電圧マージンを削り省エネ</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#5b21b6">トランジスタの真上に超高速の電気ダムを置き、瞬間大電流の電圧落ち込みを防止</text>
      `);

    case 'xv2_em_reservoir_via':
      return wrapSvg(`
        <rect x="20" y="24" width="94" height="8" rx="1.5" fill="#06b6d4"/>
        <text x="67" y="21" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0e7490">コバルト(Co)原子流出防止キャップ</text>
        <rect x="20" y="32" width="94" height="18" rx="2" fill="#d97736"/>
        <text x="67" y="44" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">大電流 Cu配線</text>
        <rect x="38" y="50" width="12" height="26" fill="#b45309"/>
        <rect x="56" y="50" width="12" height="26" fill="#b45309"/>
        <text x="67" y="88" text-anchor="middle" font-size="6.2" fill="#92400e">冗長ダブルビアで断線寿命10〜50倍!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#92400e">X2-11 Coキャップ＆冗長ビア</text>
        <text x="140" y="43" font-size="6.9" fill="#78350f">・電子の風で銅が流されるEM劣化を防止</text>
        <text x="140" y="56" font-size="6.9" fill="#78350f">・1〜2nm Co蓋で銅原子の移動を封鎖</text>
        <text x="140" y="69" font-size="6.9" fill="#78350f">・2本並列ビアでプロ機の10年耐久保証</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">激しい電流で銅原子が流されて断線するのを、コバルトの蓋と予備の橋で完全防止</text>
      `);

    case 'xv2_gaa_si_nanosheets':
      return wrapSvg(`
        <rect x="16" y="20" width="22" height="62" rx="3" fill="#0f766e"/>
        <text x="27" y="54" text-anchor="middle" font-size="6.4" fill="#fff">S</text>
        <rect x="96" y="20" width="22" height="62" rx="3" fill="#1d4ed8"/>
        <text x="107" y="54" text-anchor="middle" font-size="6.4" fill="#fff">D</text>
        ${[25, 39, 53, 67]
          .map((y) => `<rect x="38" y="${y}" width="58" height="8" rx="1.5" fill="#38bdf8" stroke="#0284c7"/>`)
          .join('')}
        <text x="67" y="15" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#0369a1">4段水平シリコン・ナノシート(5nm)</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0369a1">X2-12 2nm 4段GAAナノシート</text>
        <text x="140" y="43" font-size="6.9" fill="#0c4a6e">・TSMC N2 / Intel 18A / SF2の主役</text>
        <text x="140" y="56" font-size="6.9" fill="#0c4a6e">・厚さ5nmの橋を4階建てで水平積層</text>
        <text x="140" y="69" font-size="6.9" fill="#0c4a6e">・同速度で電力-25〜36%の革命進化</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#0369a1">縦の板FinFETから横4階建ての極薄シリコンシートへ進化し、爆速と省エネを両立</text>
      `);

    case 'xv2_hkmg_all_around':
      return wrapSvg(`
        <rect x="30" y="18" width="74" height="64" rx="5" fill="#64748b"/>
        ${[28, 46, 64]
          .map(
            (y) =>
              `<rect x="42" y="${y - 6}" width="50" height="12" rx="2" fill="#f59e0b"/><rect x="46" y="${y - 4}" width="42" height="8" rx="1.5" fill="#38bdf8"/><rect x="50" y="${y - 2.5}" width="34" height="5" rx="1" fill="#0f172a"/>`
          )
          .join('')}
        <text x="67" y="92" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#b45309">360°全周 HfO₂＋仕事関数メタル</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#92400e">X2-13 360°全周包み込みHKMG</text>
        <text x="140" y="43" font-size="6.9" fill="#78350f">・全シートの上下左右360°を完全包囲</text>
        <text x="140" y="56" font-size="6.9" fill="#78350f">・1.5nm HfO₂＋ALD仕事関数メタル</text>
        <text x="140" y="69" font-size="6.9" fill="#78350f">・0.65V低電圧でも漏れゼロの切れ味</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">ホースの全周360°を握るようにシートを包み、弱い電圧でもピタッと電気を止める</text>
      `);

    case 'xv2_hk_dipole_vth':
      return wrapSvg(`
        <rect x="26" y="24" width="82" height="16" rx="2" fill="#f59e0b"/>
        <text x="67" y="35" text-anchor="middle" font-size="6.2" fill="#fff">メタルゲート</text>
        <rect x="26" y="42" width="82" height="12" rx="2" fill="#a855f7"/>
        <text x="67" y="51" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#fff">La / Al 原子1層ダイポール</text>
        <rect x="26" y="56" width="82" height="18" rx="2" fill="#0ea5e9"/>
        <text x="67" y="68" text-anchor="middle" font-size="6.2" fill="#fff">Si ナノシート</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#faf5ff" stroke="#a855f7"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#6b21a8">X2-14 原子1層La/Alダイポール</text>
        <text x="140" y="43" font-size="6.9" fill="#581c87">・厚さ0.3nmの原子1層でVth自在調整</text>
        <text x="140" y="56" font-size="6.9" fill="#581c87">・狭い8nm隙間に厚い金属を使わず対応</text>
        <text x="140" y="69" font-size="6.9" fill="#581c87">・爆速コアと超節電コアを1枚に混載</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#6b21a8">たった原子1枚分の金属を忍ばせるだけで、スイッチの軽さを6〜8段階に作り分ける</text>
      `);

    case 'xv2_sige_inner_spacer':
      return wrapSvg(`
        <rect x="46" y="18" width="42" height="64" fill="#f59e0b"/>
        <rect x="16" y="20" width="22" height="60" fill="#0f766e"/>
        <rect x="96" y="20" width="22" height="60" fill="#1d4ed8"/>
        ${[34, 50, 66]
          .map(
            (y) =>
              `<rect x="38" y="${y - 4}" width="8" height="8" rx="2" fill="#6366f1"/><rect x="88" y="${y - 4}" width="8" height="8" rx="2" fill="#6366f1"/>`
          )
          .join('')}
        <text x="67" y="92" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#4338ca">紫: シート間三日月SiBCNパッキン</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#3730a3">X2-15 GAAインナースペーサー</text>
        <text x="140" y="43" font-size="6.9" fill="#312e81">・シート隙間に詰めた5nm低k絶縁壁</text>
        <text x="140" y="56" font-size="6.9" fill="#312e81">・金属ゲートとS/Dのショート＆容量遮断</text>
        <text x="140" y="69" font-size="6.9" fill="#312e81">・±0.5nm精度が2nm歩留まりの要!</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#3730a3">4枚のシートの隙間に三日月型の絶縁パッキンを完璧に詰め、高速動作と高信頼を両立</text>
      `);

    case 'xv2_sd_epi_strain':
      return wrapSvg(`
        <polygon points="18,36 32,20 46,36 46,66 32,82 18,66" fill="#0d9488" stroke="#115e59" stroke-width="1.5"/>
        <text x="32" y="54" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">SiGe</text>
        <polygon points="88,36 102,20 116,36 116,66 102,82 88,66" fill="#2563eb" stroke="#1e40af" stroke-width="1.5"/>
        <text x="102" y="54" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">SiP</text>
        <rect x="46" y="42" width="42" height="18" fill="#38bdf8"/>
        <text x="67" y="53" text-anchor="middle" font-size="6" font-weight="bold" fill="#0c4a6e">→歪み←</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#115e59">X2-16 SiGe/SiP 歪みS/D結晶</text>
        <text x="140" y="43" font-size="6.9" fill="#134e4a">・{111}ダイヤモンド面エピタキシャル成長</text>
        <text x="140" y="56" font-size="6.9" fill="#134e4a">・SiGe圧縮＆SiP引張で1GPa結晶ひずみ</text>
        <text x="140" y="69" font-size="6.9" fill="#134e4a">・電子＆正孔が身軽になり移動度2倍級</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#115e59">シリコン原子を両端からわざと押したり引っ張ったりして、電子を2倍速く走らせる</text>
      `);

    case 'xv2_mol_silicide_contact':
      return wrapSvg(`
        <rect x="48" y="16" width="38" height="24" rx="2" fill="#64748b"/>
        <text x="67" y="31" text-anchor="middle" font-size="6.3" fill="#fff">Co/W 柱</text>
        <path d="M36 42 H98 V68 H86 V52 H48 V68 H36 Z" fill="#eab308" stroke="#a16207"/>
        <rect x="48" y="52" width="38" height="28" rx="2" fill="#0f766e"/>
        <text x="67" y="68" text-anchor="middle" font-size="6.3" fill="#fff">S/D結晶</text>
        <text x="67" y="92" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#854d0e">3面ぐるりラップアラウンド合金</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0f172a">X2-17 MOLシリサイド接続柱</text>
        <text x="140" y="43" font-size="6.9" fill="#334155">・TiSi₂/NiPtSiで結晶の3面を合金包み</text>
        <text x="140" y="56" font-size="6.9" fill="#334155">・接触面積3倍で玄関口の抵抗＆発熱激減</text>
        <text x="140" y="69" font-size="6.9" fill="#334155">・Co/Moトレンチ柱でM0配線へ直結</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#334155">半導体と金属のつなぎ目を3面ぐるっと合金で包み、電気の渋滞と発熱を徹底解消</text>
      `);

    case 'xv2_monolithic_cfet':
      return wrapSvg(`
        <rect x="26" y="18" width="82" height="22" rx="3" fill="#2563eb"/>
        <text x="67" y="32" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#fff">2階: nMOSシート</text>
        <rect x="22" y="43" width="90" height="8" rx="1.5" fill="#a855f7"/>
        <text x="67" y="49.5" text-anchor="middle" font-size="5.6" fill="#fff">中間絶縁壁(MDI)</text>
        <rect x="26" y="54" width="82" height="22" rx="3" fill="#0d9488"/>
        <text x="67" y="68" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#fff">1階: pMOSシート</text>
        <text x="67" y="89" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#6d28d9">縦2階建てで面積 最大-50%!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#5b21b6">X2-18 モノリシックCFET(2階建)</text>
        <text x="140" y="43" font-size="6.9" fill="#4c1d95">・VLSI 2026(45nm) / IEDM 2025実証</text>
        <text x="140" y="56" font-size="6.9" fill="#4c1d95">・nMOSとpMOSを縦に重ね面積半減</text>
        <text x="140" y="69" font-size="6.9" fill="#4c1d95">・表BEOL＋裏BSPDNの両面配線で成立</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#5b21b6">横並びだったペアのスイッチを上下2階建てに重ね、同じ面積に2倍の頭脳を詰める</text>
      `);

    case 'xv2_xbit_sram_cell':
      return wrapSvg(`
        <rect x="20" y="20" width="44" height="54" rx="3" fill="#2563eb"/>
        <text x="42" y="44" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">4n + 6p</text>
        <text x="42" y="56" text-anchor="middle" font-size="5.8" fill="#dbeafe">Bit 0</text>
        <rect x="68" y="20" width="44" height="54" rx="3" fill="#f59e0b"/>
        <text x="90" y="44" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">6n + 4p</text>
        <text x="90" y="56" text-anchor="middle" font-size="5.8" fill="#fef3c7">Bit 1</text>
        <text x="66" y="88" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#1d4ed8">対称20T/2bit 密度+63%!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#1e40af">X2-19 ISSCC26 xBIT SRAM</text>
        <text x="140" y="43" font-size="6.9" fill="#1e3a8a">・MediaTek ISSCC26発表 10T新ビットセル</text>
        <text x="140" y="56" font-size="6.9" fill="#1e3a8a">・N/P数アンバランスを解消し密度+63%</text>
        <text x="140" y="69" font-size="6.9" fill="#1e3a8a">・電力-30%＆0.35V超低電圧動作対応</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#1e40af">NとPをパズルのように隙間なく噛み合わせ、止まっていたSRAM微細化の壁を突破</text>
      `);

    case 'xv2_npu_systolic_mac':
      return wrapSvg(`
        ${[0, 1, 2]
          .flatMap((r) =>
            [0, 1, 2].map((c) => {
              const zero = (r + c) === 2;
              return `<rect x="${24 + c * 30}" y="${20 + r * 20}" width="24" height="15" rx="2" fill="${zero ? '#334155' : '#7c3aed'}"/><text x="${36 + c * 30}" y="${30 + r * 20}" text-anchor="middle" font-size="5.8" fill="${zero ? '#94a3b8' : '#fff'}">${zero ? '0休止' : 'MAC'}</text>`;
            })
          )
          .join('')}
        <text x="66" y="90" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#6d28d9">波状バケツリレー＋0スキップ</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f5f3ff" stroke="#8b5cf6"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#5b21b6">X2-20 BIONZ XR2 統合AI NPU</text>
        <text x="140" y="43" font-size="6.9" fill="#4c1d95">・α7 V/α7R VIでワンチップ完全統合</text>
        <text x="140" y="56" font-size="6.9" fill="#4c1d95">・INT4/INT8/FP8並列シストリック配列</text>
        <text x="140" y="69" font-size="6.9" fill="#4c1d95">・0計算スキップで毎秒60回骨格AI認識</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#5b21b6">格子状のAIそろばん軍団が0の無駄計算を省きながら、人・鳥・昆虫を瞬時に追尾</text>
      `);

    case 'xv2_ai_awb_spectral_dsp':
      return wrapSvg(`
        <rect x="20" y="40" width="16" height="36" rx="2" fill="#ef4444"/>
        <rect x="40" y="24" width="16" height="52" rx="2" fill="#22c55e"/>
        <rect x="60" y="34" width="16" height="42" rx="2" fill="#3b82f6"/>
        <rect x="80" y="48" width="16" height="28" rx="2" fill="#be123c"/>
        <text x="28" y="86" text-anchor="middle" font-size="6" fill="#dc2626">R</text>
        <text x="48" y="86" text-anchor="middle" font-size="6" fill="#16a34a">G</text>
        <text x="68" y="86" text-anchor="middle" font-size="6" fill="#2563eb">B</text>
        <text x="88" y="86" text-anchor="middle" font-size="6" fill="#be123c">IR</text>
        <rect x="100" y="24" width="16" height="52" rx="2" fill="#eab308"/>
        <text x="108" y="53" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#422006">AI</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#065f46">X2-21 α7 V/R VI AI-AWB回路</text>
        <text x="140" y="43" font-size="6.9" fill="#064e3b">・被写体の意味＋分光情報から光源推定</text>
        <text x="140" y="56" font-size="6.9" fill="#064e3b">・電球＋日陰のミックス光でも自然な白</text>
        <text x="140" y="69" font-size="6.9" fill="#064e3b">・3×3 CCM＋3D-LUTを毎フレーム更新</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#065f46">AIが顔や空や照明を見分けて本当の白を計算するため、どんな光でも肌色が美しい</text>
      `);

    case 'xv2_demosaic_ring_buffer':
      return wrapSvg(`
        <rect x="18" y="20" width="40" height="54" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="38" y="43" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0369a1">16bit RAW</text>
        <text x="38" y="56" text-anchor="middle" font-size="5.8" fill="#0369a1">7K/8K全画素</text>
        <path d="M58 47 H74" stroke="#0284c7" stroke-width="2.2"/>
        <rect x="74" y="20" width="44" height="54" rx="3" fill="#0284c7"/>
        <text x="96" y="43" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">方向適応</text>
        <text x="96" y="55" text-anchor="middle" font-size="5.8" fill="#fef08a">4K60p/8K</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0369a1">X2-22 16bitデモザイク＆7K→4K</text>
        <text x="140" y="43" font-size="6.9" fill="#0c4a6e">・エッジの向きを判定し偽色・モアレ消去</text>
        <text x="140" y="56" font-size="6.9" fill="#0c4a6e">・7K全画素オーバーサンプリング4K60p</text>
        <text x="140" y="69" font-size="6.9" fill="#0c4a6e">・F16絞りの回折ボケも16bit復元</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#0369a1">線の向きを見分けて色を復元し、7K分の贅沢な情報からカミソリ解像の4Kを削り出す</text>
      `);

    case 'xv2_ibis_kalman_accelerator':
      return wrapSvg(`
        <rect x="16" y="20" width="40" height="22" rx="3" fill="#f97316"/>
        <text x="36" y="34" text-anchor="middle" font-size="6.1" fill="#fff">6軸ジャイロ</text>
        <rect x="16" y="54" width="40" height="22" rx="3" fill="#0ea5e9"/>
        <text x="36" y="68" text-anchor="middle" font-size="6.1" fill="#fff">映像フロー</text>
        <path d="M56 31 L74 48 M56 65 L74 48" stroke="#ea580c" stroke-width="2"/>
        <rect x="74" y="26" width="44" height="44" rx="4" fill="#c2410c"/>
        <text x="96" y="46" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">カルマン</text>
        <text x="96" y="58" text-anchor="middle" font-size="6" fill="#fef08a">最大8.5段!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#9a3412">X2-23 8.5段IBISカルマン演算器</text>
        <text x="140" y="43" font-size="6.9" fill="#7c2d12">・ジャイロ＋映像ズレを毎秒数千回融合</text>
        <text x="140" y="56" font-size="6.9" fill="#7c2d12">・α7R VI中央8.5段/α7 V 7.5段静止</text>
        <text x="140" y="69" font-size="6.9" fill="#7c2d12">・遅延0.2ms未満でレンズOSSと協調</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#9a3412">揺れセンサーと映像の動きを瞬時に突き合わせ、手持ちでも三脚級の静止を実現</text>
      `);

    case 'xv2_c2pa_puf_ecdsa_core':
      return wrapSvg(`
        <rect x="22" y="18" width="90" height="62" rx="5" fill="#0f172a" stroke="#eab308" stroke-width="2"/>
        <path d="M26 26 H108 M26 72 H108" stroke="#eab308" stroke-width="1" stroke-dasharray="3 2"/>
        <text x="67" y="42" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#38bdf8">C2PA 秘密金庫</text>
        <text x="67" y="55" text-anchor="middle" font-size="6.1" fill="#fef08a">PUF鍵＋ECDSA/SHA</text>
        <text x="67" y="66" text-anchor="middle" font-size="5.8" fill="#cbd5e1">3D深度ごと0.001秒署名</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0369a1">X2-24 C2PA真正性暗号金庫</text>
        <text x="140" y="43" font-size="6.9" fill="#0c4a6e">・α7 V/α7R VI対応カメラ真正性基盤</text>
        <text x="140" y="56" font-size="6.9" fill="#0c4a6e">・写真＋3D深度を撮影瞬間に電子署名</text>
        <text x="140" y="69" font-size="6.9" fill="#0c4a6e">・耐タンパー金メッシュで秘密鍵を死守</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#0369a1">撮影0.001秒後に絶対に偽造できない電子のハンコを押し、AIフェイクと完全区別</text>
      `);

    case 'xv2_bpr_buried_rail':
      return wrapSvg(`
        <rect x="18" y="18" width="98" height="22" rx="2" fill="#0ea5e9"/>
        <text x="67" y="32" text-anchor="middle" font-size="6.4" fill="#fff">表側: 信号配線＆ナノシート</text>
        <rect x="18" y="44" width="98" height="36" rx="2" fill="#e2e8f0" stroke="#64748b"/>
        <rect x="28" y="50" width="28" height="22" rx="2" fill="#d97736"/>
        <text x="42" y="64" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">VDD</text>
        <rect x="78" y="50" width="28" height="22" rx="2" fill="#475569"/>
        <text x="92" y="64" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">VSS</text>
        <text x="67" y="91" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#92400e">床下STI溝の地下電源トンネル</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#92400e">X2-25 地下埋設パワーレール(BPR)</text>
        <text x="140" y="43" font-size="6.9" fill="#78350f">・トランジスタ床下のSTI溝へRu電源埋設</text>
        <text x="140" y="56" font-size="6.9" fill="#78350f">・表側の狭い信号線渋滞をスッキリ解放</text>
        <text x="140" y="69" font-size="6.9" fill="#78350f">・スタンダードセル面積を最大-17%圧縮</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">太い電源線を床下の地下トンネルへ逃がし、表側をデータ信号専用に広々解放する</text>
      `);

    case 'xv2_a16_spr_vb_contact':
      return wrapSvg(`
        <rect x="20" y="16" width="94" height="18" rx="2" fill="#0ea5e9"/>
        <text x="67" y="28" text-anchor="middle" font-size="6.2" fill="#fff">GAAソース/ドレイン</text>
        <polygon points="38,34 48,34 52,64 34,64" fill="#f59e0b" stroke="#b45309"/>
        <polygon points="86,34 96,34 100,64 82,64" fill="#d97736" stroke="#92400e"/>
        <path d="M43 60 V38 M91 60 V38" stroke="#fff" stroke-width="1.8"/>
        <rect x="20" y="64" width="94" height="18" rx="2" fill="#1e293b"/>
        <text x="67" y="76" text-anchor="middle" font-size="6.3" fill="#fef08a">裏面 Super Power Rail</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#92400e">X2-26 TSMC A16 SPR直接柱</text>
        <text x="140" y="43" font-size="6.9" fill="#78350f">・VLSI 2026 T1.5: 裏からS/Dへ直結</text>
        <text x="140" y="56" font-size="6.9" fill="#78350f">・Siを50nmまで削り極低温DRIEで開口</text>
        <text x="140" y="69" font-size="6.9" fill="#78350f">・N2P比 電力-15〜20%・速度+8〜10%</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">ウェハーを裏返して極薄に削り、裏側からトランジスタの足元へ直接電気を差し込む</text>
      `);

    case 'xv2_backside_pdn_grid':
      return wrapSvg(`
        <rect x="18" y="16" width="98" height="16" rx="2" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="67" y="26.5" text-anchor="middle" font-size="6.1" fill="#0369a1">表: 100%データ信号専用</text>
        <rect x="18" y="36" width="98" height="12" rx="2" fill="#0f766e"/>
        <text x="67" y="44.5" text-anchor="middle" font-size="6" fill="#fff">極薄50nm GAA層</text>
        <rect x="18" y="52" width="98" height="28" rx="2" fill="#92400e"/>
        <rect x="24" y="56" width="86" height="8" fill="#f59e0b"/>
        <rect x="24" y="68" width="86" height="8" fill="#94a3b8"/>
        <text x="67" y="90" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#b45309">裏: 極太電源網→電圧落ち1/10!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fff7ed" stroke="#b45309"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#92400e">X2-27 裏面極太電源グリッド</text>
        <text x="140" y="43" font-size="6.9" fill="#78350f">・信号ゼロの裏側へ極太電源道路を敷設</text>
        <text x="140" y="56" font-size="6.9" fill="#78350f">・VLSI26実証: 動的電圧ドループ 1/10</text>
        <text x="140" y="69" font-size="6.9" fill="#78350f">・0.5V低電圧時の動作周波数が+30%!</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">表を信号専用・裏を極太電源専用に完全分離し、電圧ロスと発熱を根底から解決</text>
      `);

    case 'xv2_backside_clock_tree':
      return wrapSvg(`
        <rect x="18" y="18" width="98" height="62" rx="4" fill="#1e293b"/>
        <path d="M36 49 H98 M36 28 V70 M98 28 V70 M26 28 H46 M26 70 H46 M88 28 H108 M88 70 H108" fill="none" stroke="#eab308" stroke-width="2.4"/>
        <circle cx="67" cy="49" r="5" fill="#38bdf8"/>
        <text x="67" y="91" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#854d0e">裏面等長Hツリー＋裏面MIM容量</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#854d0e">X2-28 裏面Hツリー・クロック網</text>
        <text x="140" y="43" font-size="6.9" fill="#713f12">・メトロノーム信号まで静かな裏側へ</text>
        <text x="140" y="56" font-size="6.9" fill="#713f12">・完全対称H型で到着ズレ&lt;2ピコ秒</text>
        <text x="140" y="69" font-size="6.9" fill="#713f12">・表データ線との混信ジッタを根絶</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#854d0e">チップ全体を揃えるメトロノーム配線を裏面のH型道路へ移し、ズレも混信もゼロ</text>
      `);

    case 'xv2_selfheating_phonon_via':
      return wrapSvg(`
        <rect x="18" y="18" width="98" height="16" rx="2" fill="#ef4444"/>
        <text x="67" y="29" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#fff">極薄GAA発熱ホットスポット</text>
        <rect x="18" y="34" width="98" height="28" fill="#cbd5e1"/>
        ${[34, 67, 100].map((x) => `<rect x="${x - 5}" y="34" width="10" height="28" fill="#d97736"/>`).join('')}
        <text x="67" y="51" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0f172a">熱専用ビア</text>
        <rect x="18" y="62" width="98" height="18" rx="2" fill="#38bdf8" stroke="#0284c7"/>
        <text x="67" y="74" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#0c4a6e">CVDダイヤモンド層(k≈1800)</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#991b1b">X2-29 自己発熱フォノン放熱柱</text>
        <text x="140" y="43" font-size="6.9" fill="#7f1d1d">・極薄Siの「熱こもりパラドックス」対策</text>
        <text x="140" y="56" font-size="6.9" fill="#7f1d1d">・熱専用の銅柱で絶縁膜の壁をバイパス</text>
        <text x="140" y="69" font-size="6.9" fill="#7f1d1d">・銅の4.5倍冷える人工ダイヤ膜で拡散</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#991b1b">絶縁膜に閉じ込められた熱を「熱専用の銅柱＋ダイヤモンド膜」で一気に外へ逃がす</text>
      `);

    case 'xv2_unified_memory_noc':
      return wrapSvg(`
        <circle cx="67" cy="49" r="24" fill="none" stroke="#14b8a6" stroke-width="4"/>
        <circle cx="67" cy="25" r="8" fill="#2563eb"/><text x="67" y="27.5" text-anchor="middle" font-size="5.5" fill="#fff">CPU</text>
        <circle cx="91" cy="49" r="8" fill="#8b5cf6"/><text x="91" y="51.5" text-anchor="middle" font-size="5.5" fill="#fff">AI</text>
        <circle cx="67" cy="73" r="8" fill="#0f766e"/><text x="67" y="75.5" text-anchor="middle" font-size="5.5" fill="#fff">ISP</text>
        <circle cx="43" cy="49" r="8" fill="#ea580c"/><text x="43" y="51.5" text-anchor="middle" font-size="5.5" fill="#fff">8K</text>
        <text x="67" y="51" text-anchor="middle" font-size="6" font-weight="bold" fill="#0f766e">ゼロコピー</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#115e59">X2-30 統合メモリNoC＆μs断電</text>
        <text x="140" y="43" font-size="6.9" fill="#134e4a">・全エンジンがコピーせず同じメモリ共有</text>
        <text x="140" y="56" font-size="6.9" fill="#134e4a">・休止ブロックの電源を1μsで完全遮断</text>
        <text x="140" y="69" font-size="6.9" fill="#134e4a">・α7 V 750枚スタミナ＆低発熱の秘密</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#115e59">無駄なデータコピーをゼロにし、使わない回路をこまめに消灯して驚異の電池持ちを実現</text>
      `);

    default:
      return null;
  }
}
