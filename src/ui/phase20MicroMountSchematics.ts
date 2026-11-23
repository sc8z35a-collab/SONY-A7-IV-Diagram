import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 20 Bespoke 320x118 Japanese Technical Schematic SVGs (27 diagrams):
 *   - Phase 20A: Micro Pixel Semiconductor Deep-Audit (+15: M36–M50)
 *   - Phase 20B: 55mm Large-Diameter Lens Mount Deep-Audit (+12: M49–M60)
 * Every text element is strictly calibrated inside x ∈ [6, 310] (zero overflow!).
 */
export function renderPhase20MicroMountSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    // =========================================================================
    // PHASE 20A — MICRO PIXEL SEMICONDUCTOR (M36–M50)
    // =========================================================================
    case 'micro_dsa_phrf_film':
      return wrapSvg(`
        <rect x="12" y="16" width="122" height="18" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="73" y="28" text-anchor="middle" font-size="7.2" fill="#0369a1">カラーフィルター (n≈1.6)</text>
        <rect x="12" y="36" width="122" height="22" rx="3" fill="#cffafe" stroke="#0891b2" stroke-width="1.4"/>
        <circle cx="28" cy="47" r="4" fill="#fff" stroke="#0891b2"/><circle cx="46" cy="47" r="4" fill="#fff" stroke="#0891b2"/>
        <circle cx="64" cy="47" r="4" fill="#fff" stroke="#0891b2"/><circle cx="82" cy="47" r="4" fill="#fff" stroke="#0891b2"/>
        <circle cx="100" cy="47" r="4" fill="#fff" stroke="#0891b2"/><circle cx="118" cy="47" r="4" fill="#fff" stroke="#0891b2"/>
        <rect x="12" y="60" width="122" height="24" rx="3" fill="#1e293b" stroke="#0f172a"/>
        <text x="73" y="75" text-anchor="middle" font-size="7.4" fill="#38bdf8">Si フォトダイオード (n≈4.6)</text>
        <path d="M55 8 L55 68 M90 8 L90 68" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="3 2"/>
        <rect x="144" y="14" width="166" height="72" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="152" y="30" font-size="8" font-weight="bold" fill="#0e7490">DSA擬似高屈折率膜 (pHRF)</text>
        <text x="152" y="44" font-size="7.2" fill="#155e75">・分子自己組織化で20〜40nm孔形成</text>
        <text x="152" y="57" font-size="7.2" fill="#155e75">・有効屈折率 n_eff ≈ 2.65 整合</text>
        <text x="152" y="70" font-size="7.2" fill="#155e75">・400〜550nm青緑光の反射ロス激減</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0e7490">ナノ多孔スポンジ層が青色光の跳ね返りを吸い込み量子効率を向上</text>
      `);

    case 'micro_ob_dark_clamp':
      return wrapSvg(`
        <rect x="12" y="18" width="56" height="10" rx="2" fill="#1e293b" stroke="#0f172a"/>
        <text x="40" y="26" text-anchor="middle" font-size="6.8" fill="#f8fafc">厚肉W遮光膜</text>
        <rect x="16" y="30" width="48" height="44" rx="3" fill="#334155" stroke="#0f172a"/>
        <text x="40" y="52" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#f8fafc">OB画素</text>
        <text x="40" y="64" text-anchor="middle" font-size="6.8" fill="#cbd5e1">光=0 / 熱のみ</text>
        <rect x="78" y="30" width="54" height="44" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="105" y="52" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#0369a1">有効画素</text>
        <text x="105" y="64" text-anchor="middle" font-size="6.8" fill="#0369a1">光＋熱雑音</text>
        <path d="M105 10 L105 28" stroke="#f59e0b" stroke-width="2"/>
        <text x="71" y="56" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">−</text>
        <rect x="142" y="14" width="168" height="72" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="150" y="30" font-size="8" font-weight="bold" fill="#0f172a">OB自動黒レベルクランプ</text>
        <text x="150" y="44" font-size="7.2" fill="#334155">・OD&gt;6タングステン蓋で完全暗室化</text>
        <text x="150" y="57" font-size="7.2" fill="#334155">・毎コマ/毎行の暗電流を実測減算</text>
        <text x="150" y="70" font-size="7.2" fill="#334155">・長時間8K収録でも黒浮き&lt;0.2LSB</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#334155">暗室OB画素で温度由来の暗電流を毎コマ引き算し漆黒基準を維持</text>
      `);

    case 'micro_inter_polysi_wiring':
      return wrapSvg(`
        <rect x="14" y="14" width="116" height="22" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <text x="72" y="28" text-anchor="middle" font-size="7.3" font-weight="bold" fill="#1d4ed8">第1層：フォトダイオード</text>
        <rect x="14" y="40" width="116" height="16" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
        <text x="72" y="51" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#b45309">中間ポリSi配線 (&gt;950℃耐熱)</text>
        <rect x="14" y="60" width="116" height="22" rx="3" fill="#e0e7ff" stroke="#4f46e5"/>
        <text x="72" y="74" text-anchor="middle" font-size="7.3" font-weight="bold" fill="#3730a3">第2層：画素トランジスタ</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#92400e">IEDM 2024 中間ポリSi配線</text>
        <text x="148" y="44" font-size="7.2" fill="#78350f">・高温アニールに耐える非金属配線</text>
        <text x="148" y="57" font-size="7.2" fill="#78350f">・2層デュアル画素の配線混雑を解消</text>
        <text x="148" y="70" font-size="7.2" fill="#78350f">・0.8μmでRN 1.3e⁻＆8.5ke⁻両立</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#92400e">1,000℃の2層目焼成にも溶けない耐熱ポリSi電線で極小2層画素を実現</text>
      `);

    case 'micro_soi_box_finfet':
      return wrapSvg(`
        <rect x="16" y="56" width="112" height="14" rx="2" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <text x="72" y="66" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#0369a1">SOI埋込酸化膜 (BOX)</text>
        <rect x="16" y="72" width="112" height="12" rx="2" fill="#cbd5e1" stroke="#64748b"/>
        <text x="72" y="81" text-anchor="middle" font-size="6.8" fill="#334155">下層基板・第1層PD側</text>
        <rect x="34" y="28" width="14" height="28" rx="2" fill="#6366f1"/>
        <rect x="65" y="28" width="14" height="28" rx="2" fill="#6366f1"/>
        <rect x="96" y="28" width="14" height="28" rx="2" fill="#6366f1"/>
        <path d="M26 36 H118 V22 H26 Z" fill="#f59e0b" opacity="0.45" stroke="#d97706"/>
        <text x="72" y="32" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#92400e">3面ゲート SOI FinFET</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#0369a1">IEDM 2025 SOI画素FinFET</text>
        <text x="148" y="44" font-size="7.2" fill="#0c4a6e">・BOX絶縁床で接合寄生容量を極小化</text>
        <text x="148" y="57" font-size="7.2" fill="#0c4a6e">・変換効率CG↑＆暗所RTS雑音激減</text>
        <text x="148" y="70" font-size="7.2" fill="#0c4a6e">・2層画素の超高感度画質を新次元へ</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0369a1">超薄ガラス絶縁マット(BOX)上の3D FinFETで暗部チラつきノイズを遮断</text>
      `);

    case 'micro_h2_fga_passivation':
      return wrapSvg(`
        <rect x="14" y="16" width="114" height="26" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="71" y="32" text-anchor="middle" font-size="7.2" fill="#0369a1">SiO₂ 酸化膜 (H₂拡散)</text>
        <line x1="14" y1="46" x2="128" y2="46" stroke="#0d9488" stroke-width="2.2"/>
        <circle cx="30" cy="46" r="5" fill="#14b8a6"/><text x="30" y="48.5" text-anchor="middle" font-size="6.5" fill="#fff">H</text>
        <circle cx="56" cy="46" r="5" fill="#14b8a6"/><text x="56" y="48.5" text-anchor="middle" font-size="6.5" fill="#fff">H</text>
        <circle cx="82" cy="46" r="5" fill="#14b8a6"/><text x="82" y="48.5" text-anchor="middle" font-size="6.5" fill="#fff">H</text>
        <circle cx="108" cy="46" r="5" fill="#14b8a6"/><text x="108" y="48.5" text-anchor="middle" font-size="6.5" fill="#fff">H</text>
        <rect x="14" y="52" width="114" height="32" rx="3" fill="#334155" stroke="#0f172a"/>
        <text x="71" y="71" text-anchor="middle" font-size="7.3" fill="#f8fafc">Si結晶 (Si−H 終端済)</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#0f766e">水素アニール界面修復 (FGA)</text>
        <text x="148" y="44" font-size="7.2" fill="#115e59">・420℃ N₂+H₂ガスで原子状水素供給</text>
        <text x="148" y="57" font-size="7.2" fill="#115e59">・未結合手Si•をSi−H結合で不活性化</text>
        <text x="148" y="70" font-size="7.2" fill="#115e59">・界面準位D_it 1/100＆白点ノイズ激減</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0f766e">シリコン界面の原子のささくれを水素の絆創膏で塞ぎ暗電流を1/10以下へ</text>
      `);

    case 'micro_sab_salicide_block':
      return wrapSvg(`
        <rect x="14" y="42" width="66" height="38" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <text x="47" y="64" text-anchor="middle" font-size="7.3" font-weight="bold" fill="#1d4ed8">フォトダイオード</text>
        <rect x="14" y="30" width="66" height="10" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="1.4"/>
        <text x="47" y="37.5" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#854d0e">SAB保護マスク</text>
        <rect x="86" y="42" width="44" height="38" rx="3" fill="#e2e8f0" stroke="#475569"/>
        <text x="108" y="64" text-anchor="middle" font-size="7.1" fill="#1e293b">画素Tr部</text>
        <rect x="88" y="32" width="40" height="9" rx="2" fill="#94a3b8" stroke="#334155"/>
        <text x="108" y="39" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#fff">NiSi 4Ω/□</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#0f172a">SABマスク ＆ 局所NiSi</text>
        <text x="148" y="44" font-size="7.2" fill="#334155">・受光面はSABで金属拡散を完全阻止</text>
        <text x="148" y="57" font-size="7.2" fill="#334155">・重金属白点(Blemish)を根絶</text>
        <text x="148" y="70" font-size="7.2" fill="#334155">・Tr端子のみNiSi形成で抵抗1/50</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#334155">受光面をマスキングで守りつつ配線端子だけ低抵抗シリサイド化する塗り分け</text>
      `);

    case 'micro_sti_ldd_spacer':
      return wrapSvg(`
        <rect x="12" y="48" width="118" height="36" rx="3" fill="#e2e8f0" stroke="#64748b"/>
        <polygon points="16,48 30,48 26,76 20,76" fill="#bae6fd" stroke="#0284c7"/>
        <text x="23" y="66" text-anchor="middle" font-size="6.4" fill="#0369a1">STI</text>
        <rect x="58" y="24" width="24" height="22" rx="2" fill="#f59e0b" stroke="#b45309"/>
        <text x="70" y="38" text-anchor="middle" font-size="7" font-weight="bold" fill="#fff">Gate</text>
        <path d="M58 26 Q50 35 50 48 H58 Z M82 26 Q90 35 90 48 H82 Z" fill="#818cf8"/>
        <rect x="44" y="48" width="12" height="10" rx="1" fill="#60a5fa"/><rect x="84" y="48" width="12" height="10" rx="1" fill="#60a5fa"/>
        <text x="70" y="70" text-anchor="middle" font-size="6.8" fill="#1e293b">LDD電界緩和スロープ</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#3730a3">STI分離 ＆ 側壁LDD構造</text>
        <text x="148" y="44" font-size="7.2" fill="#312e81">・STI浅溝酸化膜で画素Tr間を絶縁</text>
        <text x="148" y="57" font-size="7.2" fill="#312e81">・Si₃N₄側壁スペーサーでLDD形成</text>
        <text x="148" y="70" font-size="7.2" fill="#312e81">・最大電界40%減→GIDL暗電流激減</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#3730a3">ゲート両端のLDD減速スロープが電界集中を和らげFDリーク雑音を抑制</text>
      `);

    case 'micro_cu_tan_barrier':
      return wrapSvg(`
        <rect x="18" y="18" width="106" height="24" rx="3" fill="#475569" stroke="#0f172a"/>
        <rect x="23" y="22" width="96" height="16" rx="2" fill="#ea580c" stroke="#9a3412"/>
        <text x="71" y="33" text-anchor="middle" font-size="7.4" font-weight="bold" fill="#fff">Cu 配線 (TaN 5nm包囲)</text>
        <rect x="44" y="42" width="12" height="24" fill="#334155" stroke="#0f172a"/>
        <rect x="86" y="42" width="12" height="24" fill="#334155" stroke="#0f172a"/>
        <text x="71" y="57" text-anchor="middle" font-size="6.8" fill="#334155">Wプラグ</text>
        <rect x="18" y="66" width="106" height="18" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <text x="71" y="78" text-anchor="middle" font-size="7.2" fill="#1d4ed8">シリコン結晶 (Cu汚染ゼロ)</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#9a3412">Ta/TaNバリア ＆ Wプラグ</text>
        <text x="148" y="44" font-size="7.2" fill="#7c2d12">・極薄5nm TaN膜が銅原子拡散を遮断</text>
        <text x="148" y="57" font-size="7.2" fill="#7c2d12">・CVDタングステン杭でTrとM1接続</text>
        <text x="148" y="70" font-size="7.2" fill="#7c2d12">・白点欠陥防止＆断線耐性を確保</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#9a3412">銅の毒がシリコンへ染み出さないよう全配線を極薄TaNラップで完全被覆</text>
      `);

    case 'micro_row_vdriver_levelshift':
      return wrapSvg(`
        <rect x="14" y="18" width="44" height="62" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="36" y="38" text-anchor="middle" font-size="7.4" font-weight="bold" fill="#0369a1">行ドライバ</text>
        <text x="36" y="52" text-anchor="middle" font-size="6.8" fill="#0369a1">負電源CP</text>
        <text x="36" y="66" text-anchor="middle" font-size="6.8" fill="#dc2626">−1.2V↔+3V</text>
        <path d="M58 48 H76 V28 H100 V68 H128" fill="none" stroke="#0284c7" stroke-width="2"/>
        <line x1="60" y1="54" x2="132" y2="54" stroke="#94a3b8" stroke-dasharray="3 2"/>
        <text x="90" y="24" text-anchor="middle" font-size="6.8" fill="#0369a1">+3.0V 転送</text>
        <text x="114" y="79" text-anchor="middle" font-size="6.8" fill="#dc2626">−1.2V 保持</text>
        <rect x="142" y="14" width="168" height="72" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="150" y="30" font-size="8" font-weight="bold" fill="#0369a1">負バイアスTG駆動バス</text>
        <text x="150" y="44" font-size="7.2" fill="#0c4a6e">・露光待機中はTGへ−1.2V逆印加</text>
        <text x="150" y="57" font-size="7.2" fill="#0c4a6e">・ゲート下に正孔蓄積ピニング形成</text>
        <text x="150" y="70" font-size="7.2" fill="#0c4a6e">・長秒露光のTG暗電流を−20dB抑制</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0369a1">待機中にマイナスの電気鍵をかける負電圧駆動で転送ゲートの暗電流を封印</text>
      `);

    case 'micro_col_bias_cascode':
      return wrapSvg(`
        <circle cx="36" cy="30" r="12" fill="#fef08a" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="36" y="33" text-anchor="middle" font-size="7" font-weight="bold" fill="#b45309">直射太陽</text>
        <path d="M50 30 H72" stroke="#ef4444" stroke-width="1.8"/>
        <rect x="72" y="18" width="58" height="24" rx="4" fill="#fee2e2" stroke="#dc2626"/>
        <text x="101" y="33" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#991b1b">クランプ保護</text>
        <rect x="72" y="52" width="58" height="28" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="101" y="69" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#0369a1">定電流源 5μA</text>
        <line x1="101" y1="42" x2="101" y2="52" stroke="#475569" stroke-width="1.5"/>
        <rect x="142" y="14" width="168" height="72" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="150" y="30" font-size="8" font-weight="bold" fill="#9f1239">定電流負荷＆黒太陽防止</text>
        <text x="150" y="44" font-size="7.2" fill="#881337">・過大光時のV_rst崩壊を自動クランプ</text>
        <text x="150" y="57" font-size="7.2" fill="#881337">・太陽光中心が黒く反転する現象阻止</text>
        <text x="150" y="70" font-size="7.2" fill="#881337">・高PSRR定電流源で縦スジ雑音排除</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#9f1239">強逆光時のリセット電圧崩壊を安全弁で止め自然な白飛び描写を守る</text>
      `);

    case 'micro_inpixel_dram_gs':
      return wrapSvg(`
        <rect x="16" y="14" width="110" height="20" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <text x="71" y="27" text-anchor="middle" font-size="7.3" font-weight="bold" fill="#1d4ed8">第1層：全画素同時露光 PD</text>
        <line x1="71" y1="34" x2="71" y2="46" stroke="#ea580c" stroke-width="2"/>
        <text x="102" y="43" font-size="6.6" fill="#c2410c">Cu-Cu直結</text>
        <rect x="18" y="46" width="48" height="36" rx="4" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="42" y="62" text-anchor="middle" font-size="7.3" font-weight="bold" fill="#5b21b6">C_S1</text>
        <text x="42" y="74" text-anchor="middle" font-size="6.5" fill="#6d28d9">基準電圧保持</text>
        <rect x="76" y="46" width="48" height="36" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
        <text x="100" y="62" text-anchor="middle" font-size="7.3" font-weight="bold" fill="#92400e">C_S2</text>
        <text x="100" y="74" text-anchor="middle" font-size="6.5" fill="#b45309">光信号保持</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#5b21b6">電圧ドメインGS記憶セル</text>
        <text x="148" y="44" font-size="7.2" fill="#4c1d95">・全画素直下にC_S1/C_S2対を内蔵</text>
        <text x="148" y="57" font-size="7.2" fill="#4c1d95">・歪み0.00ms＆最高1/80,000秒露光</text>
        <text x="148" y="70" font-size="7.2" fill="#4c1d95">・α9 III (IMX810) 級GSの中核技術</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#5b21b6">全画素直下の瞬間冷凍キャパシタ対が基準と光を同時保存し歪みゼロを実現</text>
      `);

    case 'micro_pga_dual_gain_bus':
      return wrapSvg(`
        <rect x="12" y="18" width="46" height="24" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <text x="35" y="33" text-anchor="middle" font-size="7" font-weight="bold" fill="#1d4ed8">LCG 低ISO</text>
        <rect x="12" y="52" width="46" height="24" rx="3" fill="#dcfce7" stroke="#16a34a"/>
        <text x="35" y="67" text-anchor="middle" font-size="7" font-weight="bold" fill="#15803d">HCG 高ISO</text>
        <polygon points="74,20 74,76 126,48" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
        <text x="94" y="46" text-anchor="middle" font-size="7.4" font-weight="bold" fill="#0369a1">PGA</text>
        <text x="94" y="57" text-anchor="middle" font-size="6.6" fill="#0369a1">×1〜×32</text>
        <line x1="58" y1="30" x2="74" y2="38" stroke="#2563eb" stroke-width="1.5"/>
        <line x1="58" y1="64" x2="74" y2="56" stroke="#16a34a" stroke-width="1.5"/>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#0369a1">デュアルISO ＆ カラムPGA</text>
        <text x="148" y="44" font-size="7.2" fill="#0c4a6e">・画素HCG/LCGと列PGAを自動協調</text>
        <text x="148" y="57" font-size="7.2" fill="#0c4a6e">・ADC前段で増幅し量子化雑音を圧縮</text>
        <text x="148" y="70" font-size="7.2" fill="#0c4a6e">・高ベースISOでノイズが劇的に低下</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0369a1">画素変換効率切替とアナログ可変アンプの二段構えで高感度ノイズを極小化</text>
      `);

    case 'micro_onchip_temp_diode':
      return wrapSvg(`
        <rect x="16" y="18" width="110" height="64" rx="5" fill="#1e293b" stroke="#475569"/>
        <circle cx="40" cy="36" r="8" fill="#ef4444" stroke="#fca5a5"/>
        <circle cx="71" cy="50" r="8" fill="#ef4444" stroke="#fca5a5"/>
        <circle cx="102" cy="64" r="8" fill="#ef4444" stroke="#fca5a5"/>
        <text x="71" y="29" text-anchor="middle" font-size="6.8" fill="#94a3b8">第2ロジック層 3点温度ダイオード</text>
        <text x="71" y="77" text-anchor="middle" font-size="7" font-weight="bold" fill="#fca5a5">ΔV_BE ∝ T_die (±0.2℃)</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#991b1b">オンダイPN温度センサー</text>
        <text x="148" y="44" font-size="7.2" fill="#7f1d1d">・シリコン内部接合温度を±0.2℃直測</text>
        <text x="148" y="57" font-size="7.2" fill="#7f1d1d">・8K収録時の温度勾配マップを算出</text>
        <text x="148" y="70" font-size="7.2" fill="#7f1d1d">・熱カブリ＆暗電流を毎コマ自動補正</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#991b1b">チップ内部に焼き込んだ超ミクロ体温計がリアルタイム熱雑音補正を駆動</text>
      `);

    case 'micro_emram_otp_fuse':
      return wrapSvg(`
        <rect x="14" y="16" width="114" height="36" rx="4" fill="#f3e8ff" stroke="#9333ea" stroke-width="1.4"/>
        <text x="71" y="31" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#6b21a8">組込 STT-eMRAM (不揮発)</text>
        <text x="71" y="44" text-anchor="middle" font-size="6.8" fill="#7e22ce">6T-SRAM比 1/3未満の極小面積</text>
        <rect x="14" y="58" width="114" height="24" rx="4" fill="#fef3c7" stroke="#d97706"/>
        <text x="71" y="73" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#92400e">OTP eFuse 個体校正マップ</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#6b21a8">IEDM 2025 eMRAM / eFuse</text>
        <text x="148" y="44" font-size="7.2" fill="#581c87">・欠陥画素座標＆PRNU係数を永久記憶</text>
        <text x="148" y="57" font-size="7.2" fill="#581c87">・電源OFFでも10年超データ保持</text>
        <text x="148" y="70" font-size="7.2" fill="#581c87">・電源ON即座に均一画質＆AI推論起動</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#6b21a8">センサー1枚ごとの個性カルテを電源OFFでも記憶する超小型内蔵メモ帳</text>
      `);

    case 'micro_rear_bump_sealring':
      return wrapSvg(`
        <rect x="14" y="14" width="114" height="70" rx="5" fill="#fed7aa" stroke="#ea580c" stroke-width="2.5"/>
        <rect x="22" y="22" width="98" height="54" rx="3" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>
        <rect x="32" y="30" width="78" height="38" rx="2" fill="#dbeafe" stroke="#2563eb"/>
        <text x="71" y="48" text-anchor="middle" font-size="7.4" font-weight="bold" fill="#1d4ed8">有効画素アレイ</text>
        <text x="71" y="60" text-anchor="middle" font-size="6.6" fill="#0369a1">湿気・亀裂 100%遮断</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#fff7ed" stroke="#d97706"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#9a3412">2重防湿シールリング＆パッド</text>
        <text x="148" y="44" font-size="7.2" fill="#7c2d12">・全層貫通Cu/W金属壁がチップを包囲</text>
        <text x="148" y="57" font-size="7.2" fill="#7c2d12">・ダイシング微細亀裂の進展を阻止</text>
        <text x="148" y="70" font-size="7.2" fill="#7c2d12">・Al-Cu外周パッドから3系統電源供給</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#9a3412">お城の石垣のような2重金属壁が切り出し時の亀裂と湿気侵入を完全阻止</text>
      `);

    // =========================================================================
    // PHASE 20B — 55mm LARGE-DIAMETER LENS MOUNT (M49–M60)
    // =========================================================================
    case 'mount_screw_orange_orings':
      return wrapSvg(`
        <rect x="16" y="44" width="110" height="28" rx="3" fill="#cbd5e1" stroke="#475569"/>
        <text x="71" y="62" text-anchor="middle" font-size="7" fill="#334155">ステンレスマウント座面</text>
        <polygon points="50,24 92,24 80,44 62,44" fill="#94a3b8" stroke="#1e293b"/>
        <rect x="64" y="44" width="14" height="36" fill="#94a3b8" stroke="#1e293b"/>
        <circle cx="59" cy="43" r="5" fill="#f97316" stroke="#c2410c" stroke-width="1.2"/>
        <circle cx="83" cy="43" r="5" fill="#f97316" stroke="#c2410c" stroke-width="1.2"/>
        <text x="71" y="20" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#ea580c">赤オレンジOリング ×6</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#9a3412">純正6本ねじ防水Oリング</text>
        <text x="148" y="44" font-size="7.2" fill="#7c2d12">・α1/α7R IV/α7 IV純正ねじ専用装備</text>
        <text x="148" y="57" font-size="7.2" fill="#7c2d12">・皿頭下の約22%圧縮で毛細管浸水遮断</text>
        <text x="148" y="70" font-size="7.2" fill="#7c2d12">・整備時の紛失を防ぐ高視認オレンジ色</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#9a3412">6本のマウント締結ねじそれぞれの首元に仕込まれた極小オレンジ防水パッキン</text>
      `);

    case 'mount_sh1035_shield_board':
      return wrapSvg(`
        <path d="M22 70 A52 52 0 0 1 118 70" fill="none" stroke="#d97706" stroke-width="14" stroke-linecap="round"/>
        <path d="M36 62 A40 40 0 0 1 104 62" fill="none" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/>
        <text x="70" y="46" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#92400e">SH-1035 フレキ基板</text>
        <text x="70" y="60" text-anchor="middle" font-size="6.8" fill="#1e293b">銀色EMIシールド＋保護膜</text>
        <text x="70" y="82" text-anchor="middle" font-size="6.8" fill="#64748b">A-5033-450-A / 5-036-060-01</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#92400e">純正 SH-1035/1036 基板</text>
        <text x="148" y="44" font-size="7.2" fill="#78350f">・ILCE-7M4/7RM5純正マウント中継板</text>
        <text x="148" y="57" font-size="7.2" fill="#78350f">・銀色金属板がEMI遮蔽＆局所放熱</text>
        <text x="148" y="70" font-size="7.2" fill="#78350f">・専用保護シートで筐体エッジ擦れ防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#92400e">マウント裏の信号交差点でノイズ遮蔽と放熱を両立するソニー純正中継基板</text>
      `);

    case 'mount_sw1041_front_subboard':
      return wrapSvg(`
        <path d="M28 24 A44 44 0 0 1 110 74" fill="none" stroke="#f59e0b" stroke-width="11" stroke-linecap="round"/>
        <rect x="64" y="34" width="22" height="22" rx="4" fill="#1e293b" stroke="#0f172a"/>
        <circle cx="75" cy="45" r="5" fill="#cbd5e1"/>
        <text x="58" y="76" text-anchor="middle" font-size="7" font-weight="bold" fill="#92400e">SW-1041 + 絶縁膜</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#92400e">純正 SW-1041 側面フレキ</text>
        <text x="148" y="44" font-size="7.2" fill="#78350f">・品番 A-5033-451-A (厚さ0.15mm)</text>
        <text x="148" y="57" font-size="7.2" fill="#78350f">・保護シート 5-036-042-01 で1kV絶縁</text>
        <text x="148" y="70" font-size="7.2" fill="#78350f">・1.2mmの極狭外周隙間へ立体収納</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#92400e">マウント外周の極狭隙間に沿って着脱・前面スイッチ信号を伝える極薄フレキ</text>
      `);

    case 'mount_sandwich_inner_collar':
      return wrapSvg(`
        <rect x="16" y="18" width="110" height="16" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="71" y="29" text-anchor="middle" font-size="7" font-weight="bold" fill="#1e293b">1. 前面ステンレスフランジ</text>
        <rect x="16" y="38" width="110" height="20" rx="2" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
        <text x="71" y="51" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#f8fafc">2. GF-PPS 中間スペーサー環</text>
        <rect x="16" y="62" width="110" height="16" rx="2" fill="#94a3b8" stroke="#334155"/>
        <text x="71" y="73" text-anchor="middle" font-size="7" font-weight="bold" fill="#fff">3. 背面バヨネット板バネ</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#0f172a">3層サンドイッチ中間カラー</text>
        <text x="148" y="44" font-size="7.2" fill="#334155">・GF40%強化PPS(熱膨張≈ステンレス)</text>
        <text x="148" y="57" font-size="7.2" fill="#334155">・板バネの適正たわみ空間を精密確保</text>
        <text x="148" y="70" font-size="7.2" fill="#334155">・内周艶消し黒で金属端面の迷光遮断</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#334155">金属環と板バネの間に挟まり芯出し・遮光・バネ空間を一括形成する中間環</text>
      `);

    case 'mount_3point_sensor_pillars':
      return wrapSvg(`
        <rect x="18" y="18" width="18" height="64" rx="2" fill="#94a3b8" stroke="#334155"/>
        <text x="27" y="53" text-anchor="middle" font-size="6.6" fill="#fff">マウント</text>
        <rect x="36" y="24" width="52" height="12" rx="2" fill="#64748b" stroke="#1e293b"/>
        <rect x="36" y="64" width="52" height="12" rx="2" fill="#64748b" stroke="#1e293b"/>
        <text x="62" y="52" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#0f172a">同一CNC基準柱</text>
        <rect x="88" y="23" width="6" height="14" fill="#eab308"/>
        <rect x="88" y="63" width="6" height="14" fill="#eab308"/>
        <rect x="94" y="18" width="22" height="64" rx="2" fill="#0284c7" stroke="#0369a1"/>
        <text x="105" y="53" text-anchor="middle" font-size="6.6" fill="#fff">センサー</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#854d0e">表裏一体・3点基準ピラー</text>
        <text x="148" y="44" font-size="7.2" fill="#713f12">・表＝マウント / 裏＝センサーを直結</text>
        <text x="148" y="57" font-size="7.2" fill="#713f12">・シャッター枠を介さず公差累積ゼロ</text>
        <text x="148" y="70" font-size="7.2" fill="#713f12">・真鍮シム座で対角平行度&lt;5μm実現</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#854d0e">1枚の金属骨格の表と裏にレンズとセンサーを背中合わせ直結し片ボケを根絶</text>
      `);

    case 'mount_self_tap_bosses':
      return wrapSvg(`
        <rect x="20" y="22" width="38" height="58" rx="3" fill="#e2e8f0" stroke="#64748b"/>
        <path d="M32 28 L46 32 L32 36 L46 40 L32 44 L46 48 L32 52 L46 56" fill="none" stroke="#64748b" stroke-width="1.2"/>
        <text x="39" y="74" text-anchor="middle" font-size="6.6" fill="#475569">並目 0.35mm</text>
        <rect x="74" y="22" width="46" height="58" rx="3" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
        <path d="M84 26 L110 34 L84 42 L110 50 L84 58 L110 66" fill="none" stroke="#1d4ed8" stroke-width="2"/>
        <text x="97" y="76" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#1d4ed8">専用 0.65mm!</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#0f172a">Mg専用 0.65mm粗ピッチ</text>
        <text x="148" y="44" font-size="7.2" fill="#334155">・標準M1.6比 約1.86倍の広いねじ山</text>
        <text x="148" y="57" font-size="7.2" fill="#334155">・肉厚円筒ボス＋6方向放射ガセット</text>
        <text x="148" y="70" font-size="7.2" fill="#334155">・600mm F4片持ち引抜でもストリップ0</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#334155">軽量マグネシウムでもネジ山がナメないソニー専用ワイドピッチ締結ボス</text>
      `);

    case 'mount_pin1_pin10_short_loop':
      return wrapSvg(`
        <rect x="14" y="22" width="114" height="22" rx="3" fill="#fef3c7" stroke="#d97706"/>
        <circle cx="24" cy="33" r="4.5" fill="#dc2626"/><text x="24" y="35.5" text-anchor="middle" font-size="6" fill="#fff">1</text>
        <circle cx="44" cy="33" r="3" fill="#eab308"/><circle cx="58" cy="33" r="3" fill="#eab308"/>
        <circle cx="72" cy="33" r="3" fill="#eab308"/><circle cx="86" cy="33" r="3" fill="#eab308"/>
        <circle cx="100" cy="33" r="3" fill="#eab308"/>
        <circle cx="118" cy="33" r="4.5" fill="#dc2626"/><text x="118" y="35.5" text-anchor="middle" font-size="5.5" fill="#fff">10</text>
        <path d="M24 38 V68 H118 V38" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="71" y="62" text-anchor="middle" font-size="7" font-weight="bold" fill="#b91c1c">完全装着時のみ短絡ループON</text>
        <text x="71" y="79" text-anchor="middle" font-size="6.8" fill="#334155">+ 33Ω SPI終端抵抗アレイ</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#854d0e">Pin1–10 活線安全ループ</text>
        <text x="148" y="44" font-size="7.2" fill="#713f12">・回転着脱中の誤接触ショートを根絶</text>
        <text x="148" y="57" font-size="7.2" fill="#713f12">・解除押下50μs以内でVBUS緊急遮断</text>
        <text x="148" y="70" font-size="7.2" fill="#713f12">・33Ω抵抗が高速SPI波形反射を整形</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#854d0e">両端ピンの短絡合言葉と機械スイッチの二重確認で安全な活線レンズ交換</text>
      `);

    case 'mount_snap_ground_wire':
      return wrapSvg(`
        <circle cx="30" cy="34" r="11" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
        <circle cx="30" cy="34" r="4.5" fill="#fff"/>
        <text x="30" y="55" text-anchor="middle" font-size="6.8" fill="#854d0e">圧着ラグ</text>
        <path d="M41 34 Q72 24 84 52 T106 66" fill="none" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>
        <rect x="100" y="58" width="24" height="18" rx="3" fill="#f1f5f9" stroke="#475569"/>
        <text x="112" y="70" text-anchor="middle" font-size="6.4" fill="#0f172a">スナップ</text>
        <text x="72" y="25" text-anchor="middle" font-size="7" font-weight="bold" fill="#0369a1">青色ETFE接地線</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#0369a1">ワンタッチ青色アース線</text>
        <text x="148" y="44" font-size="7.2" fill="#0c4a6e">・±15kV静電気をBIONZ XR迂回放電</text>
        <text x="148" y="57" font-size="7.2" fill="#0c4a6e">・直流抵抗&lt;8mΩ / インダクタンス&lt;12nH</text>
        <text x="148" y="70" font-size="7.2" fill="#0c4a6e">・ハンダ不要スナップ端子で整備性抜群</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0369a1">金属望遠レンズからの静電気ショックを安全に基板GNDへ逃がす専用アース</text>
      `);

    case 'mount_rocker_pivot_shaft':
      return wrapSvg(`
        <rect x="16" y="20" width="28" height="22" rx="3" fill="#475569" stroke="#0f172a"/>
        <text x="30" y="34" text-anchor="middle" font-size="6.8" fill="#fff">ボタン</text>
        <path d="M30 44 V56" stroke="#0284c7" stroke-width="2"/>
        <polygon points="24,52 36,52 30,60" fill="#0284c7"/>
        <line x1="28" y1="62" x2="108" y2="48" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>
        <circle cx="68" cy="55" r="7" fill="#eab308" stroke="#a16207" stroke-width="1.5"/>
        <text x="68" y="75" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#854d0e">SUS支点軸＋POMカム</text>
        <rect x="96" y="20" width="22" height="24" rx="2" fill="#94a3b8" stroke="#1e293b"/>
        <text x="107" y="35" text-anchor="middle" font-size="6.6" fill="#fff">ピン</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#0369a1">支点軸 ＆ 傾斜カム摺動</text>
        <text x="148" y="44" font-size="7.2" fill="#0c4a6e">・研削SUS303支点軸でガタ・こじれ0</text>
        <text x="148" y="57" font-size="7.2" fill="#0c4a6e">・MoS₂配合POMカムで摩擦係数0.08</text>
        <text x="148" y="70" font-size="7.2" fill="#0c4a6e">・約3.0Nの軽快な力でピン2.2mm後退</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0369a1">精密シーソー軸と低摩擦カムが何万回押しても滑らかなレンズ解除感を実現</text>
      `);

    case 'mount_631s_lightseal_tape':
      return wrapSvg(`
        <rect x="16" y="20" width="48" height="26" rx="2" fill="#94a3b8" stroke="#334155"/>
        <rect x="76" y="20" width="48" height="26" rx="2" fill="#94a3b8" stroke="#334155"/>
        <text x="70" y="36" text-anchor="middle" font-size="6.5" fill="#dc2626">0.05mm</text>
        <rect x="28" y="46" width="84" height="12" rx="2" fill="#0f172a" stroke="#334155"/>
        <text x="70" y="54.5" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#f8fafc">631S #25 遮光テープ (OD&gt;4.5)</text>
        <path d="M70 10 V45" stroke="#facc15" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="70" y="75" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#15803d">センサー側 光漏れ 0.00%</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#f8fafc" stroke="#1e293b"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#0f172a">純正 631S #25 遮光テープ</text>
        <text x="148" y="44" font-size="7.2" fill="#334155">・純正品番 7-500-004-93 (厚0.08mm)</text>
        <text x="148" y="57" font-size="7.2" fill="#334155">・FPC通過スリット＆合わせ目を暗室化</text>
        <text x="148" y="70" font-size="7.2" fill="#334155">・ND1000・60秒露光でも光カブリゼロ</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#334155">極薄マットブラック純正遮光テープが長時間露光の微細な光漏れを完全封鎖</text>
      `);

    case 'mount_bayonet_anti_galvanic':
      return wrapSvg(`
        <rect x="16" y="18" width="110" height="20" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="71" y="31" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#1e293b">SUS304 ステンレス (−0.1V)</text>
        <rect x="16" y="40" width="110" height="12" rx="2" fill="#99f6e4" stroke="#0d9488" stroke-width="1.5"/>
        <text x="71" y="48.5" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#115e59">0.05mm絶縁バリア＋化成皮膜</text>
        <rect x="16" y="54" width="110" height="22" rx="2" fill="#475569" stroke="#0f172a"/>
        <text x="71" y="68" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#f8fafc">AZ91D マグネシウム (−1.6V)</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#0f766e">異種金属ガルバニック防食</text>
        <text x="148" y="44" font-size="7.2" fill="#115e59">・電位差1.5Vによる塩水腐食を遮断</text>
        <text x="148" y="57" font-size="7.2" fill="#115e59">・絶縁抵抗&gt;10¹¹Ωで腐食電流ゼロ化</text>
        <text x="148" y="70" font-size="7.2" fill="#115e59">・微動摩耗(フレッティング)も同時防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0f766e">海辺の潮風でステンレスとマグネシウムが電池のように錆び合うのを防ぐ絶縁膜</text>
      `);

    case 'mount_baffle_clip_tabs':
      return wrapSvg(`
        <rect x="16" y="18" width="110" height="62" rx="5" fill="#1e293b" stroke="#0f172a"/>
        <rect x="34" y="30" width="74" height="38" rx="2" fill="#ffffff" stroke="#475569"/>
        <rect x="61" y="21" width="20" height="7" rx="1.5" fill="#38bdf8"/>
        <rect x="61" y="70" width="20" height="7" rx="1.5" fill="#38bdf8"/>
        <rect x="20" y="42" width="11" height="14" rx="1.5" fill="#f59e0b"/>
        <rect x="111" y="42" width="11" height="14" rx="1.5" fill="#f59e0b"/>
        <text x="71" y="48" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#0f172a">前面ねじ 0本</text>
        <text x="71" y="59" text-anchor="middle" font-size="6.5" fill="#475569">4点フック＋PORON</text>
        <rect x="140" y="14" width="170" height="72" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="148" y="30" font-size="8" font-weight="bold" fill="#0f172a">無ねじフック＆PORON緩衝</text>
        <text x="148" y="44" font-size="7.2" fill="#334155">・光路内から反射源の金属ねじを排除</text>
        <text x="148" y="57" font-size="7.2" fill="#334155">・0.4mm極薄PORONが30%圧縮予圧</text>
        <text x="148" y="70" font-size="7.2" fill="#334155">・高速連写の共振ビビリ＆発塵ゼロ</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#334155">隠しスナップ爪と極薄PORON緩衝帯で逆光ゴーストとビビリ音を同時解消</text>
      `);

    default:
      return null;
  }
}
