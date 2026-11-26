import { PartExplanation } from '../../assemblies/types';
import { FONT_MONO, mountHdFrame, pill } from './shared';

/**
 * Phase 34A — 20 Bespoke Ultra-HD Technical Schematics (M61–M80).
 */
export function renderMountUltra34SchematicGroupA(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    // M61: MB SP (755), N Contact-Holder Zero-Gap Preload Clip
    case 'mount_sp755_contact_clip':
      return mountHdFrame({
        code: 'M61',
        title: 'MB SP (755) 接点ホルダ無隙間予圧クリップ',
        viewTag: '断面力学',
        accent: '#475569',
        headerBg: '#f8fafc',
        body: `
          <!-- Left: Contact Holder A/B + Pogo Force -->
          <rect x="20" y="42" width="110" height="86" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="34" y="64" width="44" height="44" rx="3" fill="#334155" stroke="#0f172a"/>
          <text x="56" y="84" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">HOLDER</text>
          <text x="56" y="95" text-anchor="middle" font-size="6.8" fill="#cbd5e1">A / B</text>
          <!-- Pogo pins pushing back -->
          <line x1="22" y1="74" x2="34" y2="74" stroke="#eab308" stroke-width="2.4"/>
          <line x1="22" y1="86" x2="34" y2="86" stroke="#eab308" stroke-width="2.4"/>
          <line x1="22" y1="98" x2="34" y2="98" stroke="#eab308" stroke-width="2.4"/>
          <!-- MB SP (755) Leaf Spring Clip pushing forward without gap -->
          <path d="M96 52 Q84 86 96 120" fill="none" stroke="#2563eb" stroke-width="3.2" stroke-linecap="round"/>
          <circle cx="96" cy="54" r="3.4" fill="#94a3b8" stroke="#1e293b"/>
          <circle cx="96" cy="118" r="3.4" fill="#94a3b8" stroke="#1e293b"/>
          <line x1="112" y1="86" x2="86" y2="86" stroke="#2563eb" stroke-width="1.8" marker-end="url(#a-M61-blue)"/>
          <text x="112" y="74" text-anchor="middle" font-size="6.8" font-weight="700" fill="#1d4ed8">予圧</text>
          <text x="112" y="102" text-anchor="middle" font-size="6.8" font-weight="700" fill="#1d4ed8">6.5N</text>
          <text x="75" y="140" text-anchor="middle" font-size="7" fill="#334155">隙間ゼロ密着（Ref.559）</text>

          <!-- Right: Force Balance & Service Note -->
          <rect x="148" y="36" width="194" height="104" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
          <text x="245" y="52" text-anchor="middle" font-size="7.8" font-weight="700" fill="#1e3a8a">Sony SM 整備規定：442466701</text>
          ${pill(245, 70, 170, 17, 'F_clip (6.5 N) > ΣF_pogo (4.2 N)', '#ffffff', '#2563eb', '#1d4ed8', 7.2)}
          <text x="160" y="96" font-size="7.1" fill="#0f172a">• 3本指 SUS301-CSP ばね舌片で均等押圧</text>
          <text x="160" y="110" font-size="7.1" fill="#0f172a">• 接点高さ公差 ±0.03 mm ＆ 振動ガタゼロ</text>
          <text x="160" y="124" font-size="7.1" fill="#b91c1c" font-weight="700">• 隙間があると通信瞬断・接触抵抗増大</text>
        `,
        caption: 'ポゴピン反力を上回る3点板バネ予圧で接点ホルダの微小浮きを完全阻止',
      });

    // M62: MB N PLATE A (5300) Inner Bayonet Backing Ring
    case 'mount_plate_a_5300_ring':
      return mountHdFrame({
        code: 'M62',
        title: 'MB N PLATE A (5300) 3層サンドイッチ補強内輪',
        viewTag: '構造剛性',
        accent: '#334155',
        headerBg: '#f8fafc',
        body: `
          <!-- Cross-section of 3-layer bolted sandwich -->
          <rect x="20" y="34" width="166" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="34" y="48" width="16" height="82" rx="2" fill="#cbd5e1" stroke="#475569"/>
          <text x="42" y="43" text-anchor="middle" font-size="6.4" font-weight="700" fill="#334155">M01</text>
          <!-- PLATE A highlighted -->
          <rect x="52" y="52" width="14" height="74" rx="2" fill="#2563eb" stroke="#1e3a8a"/>
          <text x="59" y="138" text-anchor="middle" font-size="6.5" font-weight="700" fill="#1d4ed8">PLATE A</text>
          <!-- Mg Bulkhead -->
          <rect x="68" y="44" width="46" height="90" rx="2" fill="#64748b" stroke="#334155"/>
          <text x="91" y="91" text-anchor="middle" font-size="7.2" font-weight="700" fill="#fff">AZ91D</text>
          <text x="91" y="102" text-anchor="middle" font-size="6.6" fill="#e2e8f0">Mg隔壁</text>
          <!-- Rear Nut Plate M24 -->
          <rect x="116" y="50" width="14" height="78" rx="2" fill="#94a3b8" stroke="#475569"/>
          <text x="123" y="43" text-anchor="middle" font-size="6.4" font-weight="700" fill="#334155">M24</text>
          <!-- Through bolt -->
          <rect x="26" y="64" width="110" height="6" rx="1" fill="#0f172a"/>
          <rect x="26" y="108" width="110" height="6" rx="1" fill="#0f172a"/>
          <!-- Dowel pin -->
          <rect x="44" y="86" width="38" height="4.5" rx="1" fill="#f59e0b"/>
          <text x="157" y="69" text-anchor="middle" font-size="6.5" fill="#0f172a">6本ボルト</text>
          <text x="157" y="90" text-anchor="middle" font-size="6.5" fill="#b45309">ダウエル</text>

          <!-- Right: Rigidity comparison -->
          <rect x="198" y="34" width="146" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="271" y="50" text-anchor="middle" font-size="7.6" font-weight="700" fill="#0f172a">面外曲げ剛性（600mm F4負荷）</text>
          <text x="208" y="72" font-size="6.8" fill="#64748b">単板フランジ</text>
          <rect x="208" y="76" width="54" height="10" rx="2" fill="#cbd5e1"/>
          <text x="268" y="84" font-size="6.8" fill="#64748b">1.0×</text>
          <text x="208" y="102" font-size="6.8" font-weight="700" fill="#1d4ed8">PLATE A サンドイッチ</text>
          <rect x="208" y="106" width="116" height="11" rx="2" fill="#2563eb"/>
          <text x="329" y="114" font-size="7" font-weight="700" fill="#1d4ed8">2.4×</text>
          <text x="271" y="135" text-anchor="middle" font-size="6.8" fill="#475569">Ref.553 / 468819002 精密内輪</text>
        `,
        caption: '表フランジと裏当てPLATE A＋背面ナット板の3層サンドイッチで超望遠荷重を分散',
      });

    // M63: HOLDER, LENS LOCK (3000) Lock-Pin Guide Cartridge
    case 'mount_lens_lock_holder_3000':
      return mountHdFrame({
        code: 'M63',
        title: 'HOLDER, LENS LOCK (3000) ロックピン案内筒',
        viewTag: '軸受構造',
        accent: '#0f766e',
        headerBg: '#f0fdfa',
        body: `
          <!-- Cartridge cutaway -->
          <rect x="22" y="42" width="188" height="92" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Outer POM Cartridge -->
          <rect x="48" y="56" width="116" height="62" rx="5" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
          <!-- Bronze bushing liner -->
          <rect x="54" y="68" width="104" height="38" rx="2" fill="#d97706" opacity="0.28" stroke="#b45309"/>
          <!-- Lock pin shaft -->
          <rect x="28" y="76" width="96" height="22" rx="2" fill="#64748b" stroke="#0f172a"/>
          <polygon points="28,76 28,98 18,90 18,76" fill="#475569" stroke="#0f172a"/>
          <!-- Return spring inside pocket -->
          <path d="M124 87 L130 78 L136 96 L142 78 L148 96 L154 87" fill="none" stroke="#0f766e" stroke-width="2"/>
          <!-- Rear dust cap -->
          <rect x="164" y="64" width="10" height="46" rx="2" fill="#1e293b"/>
          <!-- L/d dimension bracket -->
          <line x1="54" y1="49" x2="158" y2="49" stroke="#0f766e" stroke-width="1.2" marker-start="url(#a-M63-green)" marker-end="url(#a-M63-green)"/>
          <text x="106" y="46" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0f766e">案内長 L / d ≥ 1.85（こじれ防止）</text>
          <text x="169" y="124" text-anchor="middle" font-size="6.4" fill="#334155">防塵キャップ</text>

          <!-- Specs callouts -->
          <rect x="222" y="42" width="124" height="92" rx="6" fill="#f0fdfa" stroke="#5eead4"/>
          <text x="284" y="58" text-anchor="middle" font-size="7.4" font-weight="700" fill="#115e59">部品番号 448435701</text>
          ${pill(284, 76, 108, 16, 'POM外殻＋含油青銅軸受', '#ffffff', '#0f766e', '#0f766e', 6.8)}
          <text x="232" y="102" font-size="6.8" fill="#1e293b">• 偏心荷重時のスティック回避</text>
          <text x="232" y="115" font-size="6.8" fill="#1e293b">• 戻しバネの座屈ガイド内蔵</text>
          <text x="232" y="128" font-size="6.8" fill="#1e293b">• M1.4 ビス2点フランジ締結</text>
        `,
        caption: '十分な軸受案内長と含油青銅スリーブで全温度域の軽快・確実なロック動作を保証',
      });

    // M64: MB CUSHION SHEET (5400) Perimeter Acoustic/WP Gasket
    case 'mount_cushion_sheet_5400':
      return mountHdFrame({
        code: 'M64',
        title: 'MB CUSHION SHEET (5400) 外装境界防滴・制振',
        viewTag: '防滴制振',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Cross section of Front Cabinet - Cushion Sheet - Mg Mount Box -->
          <rect x="22" y="38" width="164" height="100" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="34" y="50" width="32" height="76" rx="3" fill="#334155"/>
          <text x="50" y="90" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">外装</text>
          <text x="50" y="100" text-anchor="middle" font-size="6.3" fill="#cbd5e1">CAB F</text>
          <!-- Compressed PORON sheet -->
          <rect x="70" y="54" width="20" height="68" rx="2" fill="#0284c7" opacity="0.25" stroke="#0284c7" stroke-width="1.3" stroke-dasharray="2 1"/>
          <text x="80" y="91" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0369a1">PORON</text>
          <!-- PSA adhesive layer -->
          <rect x="90" y="54" width="5" height="68" fill="#f59e0b"/>
          <!-- Mg Mount Box -->
          <rect x="96" y="50" width="44" height="76" rx="3" fill="#64748b"/>
          <text x="118" y="90" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">Mg隔壁</text>
          <!-- Rain droplets deflected -->
          <path d="M52 38 Q75 44 76 52" fill="none" stroke="#0284c7" stroke-width="1.6" marker-end="url(#a-M64-cyan)"/>
          <line x1="70" y1="48" x2="90" y2="58" stroke="#dc2626" stroke-width="1.6"/>
          <text x="158" y="68" text-anchor="middle" font-size="6.6" fill="#0369a1">圧縮率</text>
          <text x="158" y="79" text-anchor="middle" font-size="7.4" font-weight="700" fill="#0369a1">30%</text>
          <text x="158" y="104" text-anchor="middle" font-size="6.6" fill="#dc2626">振動減衰</text>
          <text x="158" y="115" text-anchor="middle" font-size="7.2" font-weight="700" fill="#dc2626">-12dB</text>

          <!-- Right contour preview -->
          <rect x="200" y="38" width="144" height="100" rx="5" fill="#f0f9ff" stroke="#bae6fd"/>
          <rect x="224" y="52" width="76" height="58" rx="9" fill="#0284c7" opacity="0.22" stroke="#0284c7" stroke-width="1.3"/>
          <circle cx="262" cy="81" r="21" fill="#ffffff" stroke="#0284c7" stroke-width="1.2"/>
          <circle cx="312" cy="92" r="9" fill="#0284c7" opacity="0.28" stroke="#0284c7" stroke-width="1.2"/>
          <circle cx="312" cy="92" r="4.5" fill="#ffffff" stroke="#0284c7"/>
          <text x="272" y="126" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">Ref.459 / 472900201 一体型抜き</text>
        `,
        caption: '高密度PORONクッションを30%圧縮挟持し、外装継ぎ目からの水滴侵入と振動共鳴を抑止',
      });

    // M65: MB GRAPHITE SHEET TOP A & AS HEAT PLATE TOP
    case 'mount_graphite_heat_top':
      return mountHdFrame({
        code: 'M65',
        title: 'MB GRAPHITE SHEET TOP A ＆ 放熱積層',
        viewTag: '熱輸送工学',
        accent: '#d97706',
        headerBg: '#fffbeb',
        defs: `<linearGradient id="g-M65-hot" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#dc2626"/><stop offset="55%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#0284c7"/></linearGradient>`,
        body: `
          <!-- 3-layer thermal stack cutaway -->
          <rect x="22" y="36" width="316" height="22" rx="4" fill="#1e293b"/>
          <text x="180" y="50" text-anchor="middle" font-size="7.4" font-weight="700" fill="#fde68a">第1層：MB GRAPHITE SHEET TOP A (500490202) — k_∥ ≈ 1600 W/(m·K)</text>
          <rect x="42" y="61" width="276" height="20" rx="3" fill="#d97706" opacity="0.88"/>
          <text x="180" y="74" text-anchor="middle" font-size="7.2" font-weight="700" fill="#ffffff">第2層：AS HEAT PLATE TOP (474824101) 金属ヒートスプレッダ</text>
          <rect x="66" y="84" width="228" height="16" rx="3" fill="#38bdf8" opacity="0.72"/>
          <text x="180" y="95" text-anchor="middle" font-size="7" font-weight="700" fill="#0c4a6e">第3層：AS HEAT PLT SPACER TOP (503058201) 低熱抵抗TIMパッド</text>
          <rect x="86" y="103" width="188" height="18" rx="3" fill="#64748b"/>
          <text x="180" y="115" text-anchor="middle" font-size="7.1" font-weight="700" fill="#f8fafc">マウントボックス上部（センサー／レンズ熱源）</text>
          <!-- Heat flow gradient bar -->
          <rect x="42" y="128" width="276" height="12" rx="6" fill="url(#g-M65-hot)"/>
          <text x="52" y="137" font-size="6.8" font-weight="700" fill="#fff">HOT (センサー側)</text>
          <text x="308" y="137" text-anchor="end" font-size="6.8" font-weight="700" fill="#fff">外殻フレーム放散</text>
        `,
        caption: '純銅の4倍の面内熱伝導率を誇るグラファイト積層で4K60p長時間録画時の熱偏りを解消',
      });

    // M66: MB CH FLOATING SHAFT (5600) Anti-Vib Coupling
    case 'mount_ch_floating_shaft':
      return mountHdFrame({
        code: 'M66',
        title: 'MB CH FLOATING SHAFT (5600) 防振支持軸',
        viewTag: '振動絶縁',
        accent: '#6366f1',
        headerBg: '#eef2ff',
        body: `
          <!-- Floating grommet cutaway -->
          <rect x="20" y="38" width="166" height="100" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="34" y="78" width="136" height="20" rx="3" fill="#94a3b8" stroke="#334155"/>
          <text x="102" y="91" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0f172a">SUS303 浮動シャフト</text>
          <!-- Butyl rubber grommets -->
          <rect x="52" y="54" width="28" height="24" rx="4" fill="#312e81"/>
          <rect x="52" y="98" width="28" height="24" rx="4" fill="#312e81"/>
          <rect x="124" y="54" width="28" height="24" rx="4" fill="#312e81"/>
          <rect x="124" y="98" width="28" height="24" rx="4" fill="#312e81"/>
          <text x="102" y="50" text-anchor="middle" font-size="6.8" font-weight="700" fill="#4338ca">高減衰ブチルグロメット</text>
          <text x="102" y="132" text-anchor="middle" font-size="6.6" fill="#475569">チャージ衝撃 → 粘弾性吸収</text>

          <!-- Transmissibility Curve -->
          <rect x="198" y="38" width="146" height="100" rx="5" fill="#ffffff" stroke="#c7d2fe"/>
          <line x1="216" y1="120" x2="334" y2="120" stroke="#94a3b8" stroke-width="1"/>
          <line x1="216" y1="48" x2="216" y2="120" stroke="#94a3b8" stroke-width="1"/>
          <line x1="216" y1="86" x2="334" y2="86" stroke="#cbd5e1" stroke-dasharray="3 2"/>
          <path d="M216 86 Q244 48 264 86 Q290 112 332 117" fill="none" stroke="#4f46e5" stroke-width="2.2"/>
          <rect x="266" y="88" width="66" height="30" fill="#4f46e5" opacity="0.1"/>
          <text x="299" y="102" text-anchor="middle" font-size="6.8" font-weight="700" fill="#3730a3">絶縁帯域</text>
          <text x="299" y="113" text-anchor="middle" font-size="6.6" fill="#4338ca">T_r &lt; −15 dB</text>
          <text x="275" y="133" text-anchor="middle" font-size="6.5" fill="#475569">周波数比 f / f_n →</text>
        `,
        caption: 'ブチル防振グロメット付き浮動軸でシャッター巻き上げ振動のマウント伝播を遮断',
      });

    // M67: IM IMAGER FIX SHAFT (5300) Non-Reusable 3x
    case 'mount_imager_fix_shafts':
      return mountHdFrame({
        code: 'M67',
        title: 'IM IMAGER FIX SHAFT (5300) 非再使用3点軸',
        viewTag: '光軸直結',
        accent: '#2563eb',
        headerBg: '#eff6ff',
        body: `
          <!-- 3-point triangle geometry -->
          <circle cx="88" cy="88" r="46" fill="#f8fafc" stroke="#cbd5e1" stroke-dasharray="3 2"/>
          <rect x="61" y="70" width="54" height="36" rx="2" fill="#0ea5e9" opacity="0.2" stroke="#0284c7"/>
          <text x="88" y="91" text-anchor="middle" font-size="7" font-weight="700" fill="#0369a1">36×24mm</text>
          <circle cx="88" cy="42" r="6" fill="#2563eb"/><text x="88" y="44.5" text-anchor="middle" font-size="6.5" font-weight="700" fill="#fff">1</text>
          <circle cx="48" cy="111" r="6" fill="#2563eb"/><text x="48" y="113.5" text-anchor="middle" font-size="6.5" font-weight="700" fill="#fff">2</text>
          <circle cx="128" cy="111" r="6" fill="#2563eb"/><text x="128" y="113.5" text-anchor="middle" font-size="6.5" font-weight="700" fill="#fff">3</text>
          <polygon points="88,42 48,111 128,111" fill="none" stroke="#2563eb" stroke-width="1" stroke-dasharray="2 2"/>

          <!-- Shaft Anatomy Detail -->
          <rect x="154" y="36" width="190" height="104" rx="6" fill="#ffffff" stroke="#bfdbfe"/>
          <text x="249" y="51" text-anchor="middle" font-size="7.5" font-weight="700" fill="#1e3a8a">Ref.501 / 459775001（必ず新品交換）</text>
          <!-- Shaft horizontal drawing -->
          <rect x="168" y="68" width="16" height="22" rx="2" fill="#475569"/>
          <rect x="184" y="73" width="44" height="12" fill="#94a3b8"/>
          <rect x="228" y="75.5" width="24" height="7" fill="#64748b"/>
          <rect x="252" y="72.5" width="38" height="13" fill="#2563eb"/>
          <rect x="290" y="74" width="34" height="10" fill="#94a3b8"/>
          <text x="240" y="65" text-anchor="middle" font-size="6.3" fill="#475569">トルクくびれ</text>
          <text x="271" y="100" text-anchor="middle" font-size="6.5" font-weight="700" fill="#1d4ed8">青色嫌気性ロック帯</text>
          ${pill(249, 122, 168, 16, 'Note 1: 取り外し後は再使用禁止', '#fef2f2', '#dc2626', '#b91c1c', 7)}
        `,
        caption: '120°3点の単回使用トルク管理シャフトでセンサー像面チルトを2μm未満に永久固定',
      });

    // M68: MAGNETIC FIELD CUT PLATE (891) Permalloy Shield
    case 'mount_mag_field_cut_plate':
      return mountHdFrame({
        code: 'M68',
        title: 'MAGNETIC FIELD CUT PLATE (891) 磁気遮蔽',
        viewTag: '電磁気学',
        accent: '#6366f1',
        headerBg: '#eef2ff',
        body: `
          <!-- Magnet source -->
          <rect x="24" y="54" width="36" height="32" rx="3" fill="#dc2626"/>
          <rect x="24" y="86" width="36" height="32" rx="3" fill="#2563eb"/>
          <text x="42" y="73" text-anchor="middle" font-size="9" font-weight="800" fill="#fff">N</text>
          <text x="42" y="105" text-anchor="middle" font-size="9" font-weight="800" fill="#fff">S</text>
          <text x="42" y="132" text-anchor="middle" font-size="6.8" fill="#334155">IBIS / XD磁石</text>

          <!-- Permalloy Magnetic Cut Plate -->
          <rect x="136" y="38" width="16" height="96" rx="2" fill="#4f46e5" stroke="#312e81" stroke-width="1.2"/>
          <text x="144" y="144" text-anchor="middle" font-size="6.8" font-weight="700" fill="#3730a3">パーマロイ板</text>

          <!-- Flux lines diverted inside Permalloy! -->
          <path d="M60 64 C96 42, 130 48, 144 58 C148 86, 148 86, 144 114 C130 124, 96 130, 60 108" fill="none" stroke="#6366f1" stroke-width="2" marker-mid="url(#a-M68-purple)"/>
          <path d="M60 72 C92 60, 124 64, 140 70 L140 102 C124 108, 92 112, 60 100" fill="none" stroke="#6366f1" stroke-width="1.6" stroke-dasharray="3 2"/>

          <!-- Protected Mainboard / Hall Sensor zone -->
          <rect x="184" y="42" width="156" height="92" rx="6" fill="#f0fdf4" stroke="#86efac"/>
          <text x="262" y="60" text-anchor="middle" font-size="7.8" font-weight="700" fill="#166534">磁気静穏保護エリア</text>
          ${pill(262, 80, 132, 17, 'μ_r > 10,000 → −26 dB減衰', '#ffffff', '#16a34a', '#15803d', 7)}
          <text x="196" y="106" font-size="6.9" fill="#1e293b">• メイン基板電源・センサー誤動作防止</text>
          <text x="196" y="120" font-size="6.9" fill="#1e293b">• Ref.352 / 部品番号 502789501</text>
        `,
        caption: '高透磁率パーマロイ遮蔽板へ漏洩磁束を吸い込んで迂回させ、電子回路を強磁界から隔離',
      });

    // M69: HDMI LIGHT SHIELD SHEET (850) & MB RING SHEET
    case 'mount_hdmi_light_shield':
      return mountHdFrame({
        code: 'M69',
        title: 'HDMI LIGHT SHIELD SHEET (850) 迷光遮断',
        viewTag: '遮光設計',
        accent: '#1e293b',
        headerBg: '#f8fafc',
        body: `
          <!-- Left: External HDMI Port Opening -->
          <rect x="18" y="46" width="48" height="78" rx="4" fill="#fef3c7" stroke="#f59e0b"/>
          <text x="42" y="76" text-anchor="middle" font-size="7.2" font-weight="700" fill="#92400e">側面I/O</text>
          <text x="42" y="88" text-anchor="middle" font-size="6.6" fill="#b45309">HDMI開口</text>
          <!-- Stray sunlight rays -->
          <line x1="66" y1="68" x2="112" y2="68" stroke="#dc2626" stroke-width="1.8" marker-end="url(#a-M69-red)"/>
          <line x1="66" y1="98" x2="112" y2="86" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="3 2" marker-end="url(#a-M69-red)"/>

          <!-- Folded Labyrinth Blackout Sheet -->
          <path d="M116 42 L116 128 L142 128 L142 114 L126 114 L126 56 L142 56 L142 42 Z" fill="#0f172a"/>
          <path d="M156 50 L156 120" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
          <text x="136" y="142" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0f172a">折返し迷路</text>

          <!-- Absorbed zero-leak optical chamber -->
          <rect x="186" y="42" width="156" height="92" rx="6" fill="#0f172a" stroke="#475569"/>
          <text x="264" y="64" text-anchor="middle" font-size="8" font-weight="700" fill="#f8fafc">暗黒撮像室（ライトリーク 0）</text>
          ${pill(264, 86, 134, 17, '光学濃度 OD ≥ 5.0 (T < 0.001%)', '#1e293b', '#38bdf8', '#7dd3fc', 6.8)}
          <text x="264" y="114" text-anchor="middle" font-size="6.9" fill="#cbd5e1">天体30秒長時間露光・外部HDMI収録対応</text>
          <text x="264" y="126" text-anchor="middle" font-size="6.6" fill="#94a3b8">Ref.463 / 502078101 ＋ MB RING SHEET</text>
        `,
        caption: 'OD≥5.0の折り返し遮光シートで側面HDMI端子からの微細迷光侵入を完全に遮断',
      });

    // M70: CABINET F ASSY Waterproof Potting Seal (Ref.469)
    case 'mount_cabinet_potting_seal':
      return mountHdFrame({
        code: 'M70',
        title: 'CABINET F 防水ポッティング＆前面カラーシール',
        viewTag: '防水封止',
        accent: '#0f766e',
        headerBg: '#f0fdfa',
        body: `
          <!-- Cross section of Front Flange / Cabinet F / Dual-Lip Potting Collar -->
          <rect x="20" y="38" width="176" height="100" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Mount Flange -->
          <rect x="34" y="54" width="38" height="68" rx="3" fill="#cbd5e1" stroke="#475569"/>
          <text x="53" y="91" text-anchor="middle" font-size="7" font-weight="700" fill="#1e293b">フランジ</text>
          <!-- Dual-Lip Potting Seal -->
          <path d="M74 52 C84 52, 86 64, 94 64 L94 112 C86 112, 84 124, 74 124 Z" fill="#0f766e"/>
          <circle cx="80" cy="62" r="4" fill="#14b8a6"/>
          <circle cx="80" cy="114" r="4" fill="#14b8a6"/>
          <!-- Cabinet F -->
          <rect x="96" y="46" width="46" height="84" rx="3" fill="#1e293b"/>
          <text x="119" y="91" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">外装前蓋</text>
          <!-- Rain splash arrow -->
          <path d="M56 38 Q78 42 78 51" fill="none" stroke="#0284c7" stroke-width="1.8" marker-end="url(#a-M70-cyan)"/>
          <path d="M78 51 Q64 46 48 44" fill="none" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="2 2"/>
          <text x="167" y="72" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0f766e">二段リップ</text>
          <text x="167" y="84" text-anchor="middle" font-size="6.6" fill="#0f766e">撥水角&gt;95°</text>
          <text x="167" y="106" text-anchor="middle" font-size="6.6" fill="#475569">解除ボタン</text>
          <text x="167" y="117" text-anchor="middle" font-size="6.6" fill="#475569">一体ブーツ</text>

          <!-- Info card -->
          <rect x="208" y="38" width="136" height="100" rx="5" fill="#f0fdfa" stroke="#5eead4"/>
          <text x="276" y="54" text-anchor="middle" font-size="7.4" font-weight="700" fill="#115e59">Ref.469 工場ポッティング</text>
          ${pill(276, 74, 120, 17, 'WATERPROOF POTTED', '#ffffff', '#0f766e', '#0f766e', 6.8)}
          <text x="218" y="100" font-size="6.8" fill="#1e293b">• マウント外周 φ69–76 mm封止</text>
          <text x="218" y="114" font-size="6.8" fill="#1e293b">• 毛細管水吸い込みを反転阻止</text>
          <text x="218" y="128" font-size="6.8" fill="#1e293b">• ボタン開口まで連続一体成形</text>
        `,
        caption: '前面キャビネットとマウント外周・解除ボタン境界を二段リップ防水ポッティングで連続封止',
      });

    // M71: Front Visible-Light + IR Ambient Spectral AWB & Flicker Sensor
    case 'mount_vl_ir_awb_sensor':
      return mountHdFrame({
        code: 'M71',
        title: '前面 可視光＋IR環境光AWB＆フリッカーセンサー',
        viewTag: '分光計測',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Optical front windows -->
          <rect x="20" y="36" width="124" height="104" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
          <ellipse cx="56" cy="70" rx="18" ry="14" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
          <text x="56" y="72.5" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0369a1">PTFE拡散</text>
          <circle cx="110" cy="70" r="14" fill="#1e1b4b" stroke="#7c3aed" stroke-width="1.5"/>
          <text x="110" y="72.5" text-anchor="middle" font-size="6.5" font-weight="700" fill="#e9d5ff">IR窓</text>
          <rect x="34" y="96" width="96" height="26" rx="3" fill="#0f172a"/>
          <text x="82" y="112" text-anchor="middle" font-size="7" font-weight="700" fill="#38bdf8">RGB + Clear + IR PD</text>
          <line x1="56" y1="84" x2="56" y2="95" stroke="#0284c7" stroke-width="1.4" marker-end="url(#a-M71-cyan)"/>
          <line x1="110" y1="84" x2="110" y2="95" stroke="#7c3aed" stroke-width="1.4" marker-end="url(#a-M71-purple)"/>

          <!-- Right: Sunlight vs LED spectrum comparison -->
          <rect x="156" y="36" width="188" height="104" rx="6" fill="#ffffff" stroke="#bae6fd"/>
          <line x1="174" y1="116" x2="332" y2="116" stroke="#94a3b8" stroke-width="1"/>
          <line x1="174" y1="48" x2="174" y2="116" stroke="#94a3b8" stroke-width="1"/>
          <!-- Sunlight curve (extends into 850nm IR) -->
          <path d="M180 112 Q226 52 270 64 T328 74" fill="none" stroke="#f59e0b" stroke-width="2"/>
          <!-- LED curve (sharp drop before IR!) -->
          <path d="M182 114 L196 64 L208 92 L238 62 L264 114 L328 114" fill="none" stroke="#0284c7" stroke-width="2"/>
          <rect x="278" y="48" width="48" height="68" fill="#7c3aed" opacity="0.1"/>
          <text x="302" y="59" text-anchor="middle" font-size="6.4" font-weight="700" fill="#6d28d9">850nm IR</text>
          <text x="208" y="52" font-size="6.5" font-weight="700" fill="#d97706">太陽光(高IR)</text>
          <text x="218" y="106" font-size="6.5" font-weight="700" fill="#0284c7">LED(低IR)</text>
          <text x="252" y="132" text-anchor="middle" font-size="6.8" fill="#334155">α7R V / α9 III / α1 II 搭載 AI-AWB窓</text>
        `,
        caption: '可視RGBと850nm近赤外比率を独立計測し、太陽光とLED照明の判別・フリッカー検知を高精度化',
      });

    // M72: Front Mount-Flank C5 Custom Tactile Button
    case 'mount_front_c5_button':
      return mountHdFrame({
        code: 'M72',
        title: '前面 C5スピードブースト／防滴タクト機構',
        viewTag: '操作機構',
        accent: '#e11d48',
        headerBg: '#fff1f2',
        body: `
          <!-- Cross section of button -> silicone boot -> metal dome -> PCB -->
          <rect x="20" y="38" width="166" height="100" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="34" y="64" width="26" height="46" rx="4" fill="#1e293b"/>
          <text x="47" y="90" text-anchor="middle" font-size="7.2" font-weight="700" fill="#fff">C5</text>
          <!-- Silicone bellows boot -->
          <path d="M62 60 L72 66 L72 108 L62 114 Z" fill="#0f766e" opacity="0.35" stroke="#0f766e"/>
          <!-- Metal dome tact switch -->
          <path d="M84 68 Q104 87 84 106" fill="none" stroke="#e11d48" stroke-width="2.6"/>
          <rect x="106" y="56" width="12" height="62" rx="2" fill="#14532d"/>
          <rect x="122" y="52" width="10" height="70" rx="2" fill="#94a3b8"/>
          <line x1="22" y1="87" x2="32" y2="87" stroke="#e11d48" stroke-width="1.8" marker-end="url(#a-M72-red)"/>
          <text x="158" y="72" text-anchor="middle" font-size="6.6" fill="#0f766e">防滴ブーツ</text>
          <text x="158" y="88" text-anchor="middle" font-size="6.6" font-weight="700" fill="#be123c">SUSドーム</text>
          <text x="158" y="104" text-anchor="middle" font-size="6.6" fill="#166534">サブ基板</text>

          <!-- Right: Snap-Dome Force-Stroke Curve -->
          <rect x="198" y="38" width="146" height="100" rx="5" fill="#fff1f2" stroke="#fda4af"/>
          <line x1="216" y1="116" x2="332" y2="116" stroke="#94a3b8"/>
          <line x1="216" y1="52" x2="216" y2="116" stroke="#94a3b8"/>
          <path d="M216 116 L264 62 Q276 58 286 90 Q296 96 320 60" fill="none" stroke="#e11d48" stroke-width="2.2"/>
          <circle cx="266" cy="62" r="2.8" fill="#e11d48"/>
          <text x="266" y="55" text-anchor="middle" font-size="6.5" font-weight="700" fill="#be123c">2.4 N</text>
          <text x="288" y="104" text-anchor="middle" font-size="6.5" fill="#881337">スナップ比 45%</text>
          <text x="275" y="131" text-anchor="middle" font-size="6.8" font-weight="700" fill="#9f1239">中指即時 120fps ブースト起動</text>
        `,
        caption: 'グリップ中指直下の防滴メタルドームスイッチでファインダーから目を離さず即時ブースト',
      });

    // M73: 940 nm IR Wireless Remote Receiver
    case 'mount_ir_remote_window':
      return mountHdFrame({
        code: 'M73',
        title: '940 nm 赤外線リモコン受光窓＆38 kHz復調',
        viewTag: '光通信受光',
        accent: '#7c3aed',
        headerBg: '#f5f3ff',
        body: `
          <!-- Optical path -->
          <line x1="18" y1="68" x2="64" y2="68" stroke="#f59e0b" stroke-width="1.6" stroke-dasharray="3 2" marker-end="url(#a-M73-amber)"/>
          <line x1="18" y1="96" x2="72" y2="96" stroke="#7c3aed" stroke-width="2.2" marker-end="url(#a-M73-purple)"/>
          <text x="40" y="61" text-anchor="middle" font-size="6.5" fill="#b45309">可視光(遮断)</text>
          <text x="42" y="110" text-anchor="middle" font-size="6.8" font-weight="700" fill="#6d28d9">940nm IR</text>

          <!-- Bandpass window -->
          <rect x="74" y="48" width="16" height="76" rx="3" fill="#1e1b4b" stroke="#7c3aed"/>
          <text x="82" y="137" text-anchor="middle" font-size="6.4" fill="#4c1d95">暗赤外窓</text>

          <!-- Demodulator block inside EMI shield -->
          <rect x="108" y="44" width="232" height="86" rx="6" fill="#f5f3ff" stroke="#7c3aed" stroke-dasharray="4 2"/>
          <text x="224" y="57" text-anchor="middle" font-size="6.8" font-weight="700" fill="#5b21b6">EMI ファラデー遮蔽缶（BIONZ雑音遮断）</text>
          ${pill(144, 86, 56, 26, 'PIN PD', '#ffffff', '#7c3aed', '#5b21b6', 7)}
          <line x1="172" y1="86" x2="188" y2="86" stroke="#7c3aed" stroke-width="1.6" marker-end="url(#a-M73-purple)"/>
          ${pill(224, 86, 68, 26, '38kHz BPF', '#ffffff', '#2563eb', '#1d4ed8', 7)}
          <line x1="258" y1="86" x2="274" y2="86" stroke="#2563eb" stroke-width="1.6" marker-end="url(#a-M73-blue)"/>
          ${pill(304, 86, 54, 26, 'AGC復調', '#dcfce7', '#16a34a', '#166534', 7)}
          <text x="224" y="120" text-anchor="middle" font-size="6.7" fill="#334155">晴天直射日光下でも 38 kHz 変調パルスを高SNR抽出</text>
        `,
        caption: '940nm光学フィルタと38kHz狭帯域復調・EMI遮蔽缶の三重防護で無振動レリーズを実現',
      });

    // M74: Focal-Plane Index (Φ) Datum Bridge & Cine Hook
    case 'mount_focal_plane_datum':
      return mountHdFrame({
        code: 'M74',
        title: '像面基準マーク（Φ）データム＆巻尺フック',
        viewTag: '幾何基準',
        accent: '#ca8a04',
        headerBg: '#fefce8',
        body: `
          <!-- Side elevation of Flange -> Datum Bridge -> Focal Plane Hook -->
          <rect x="40" y="64" width="14" height="66" rx="2" fill="#94a3b8" stroke="#334155"/>
          <text x="47" y="142" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">フランジ面</text>
          <!-- Datum Bridge Bar -->
          <rect x="46" y="54" width="96" height="14" rx="2" fill="#475569" stroke="#0f172a"/>
          <text x="94" y="63.5" text-anchor="middle" font-size="6.6" font-weight="700" fill="#fde047">18.000 mm 基準橋</text>
          <!-- Focal plane vertical dashed line -->
          <line x1="138" y1="30" x2="138" y2="138" stroke="#ca8a04" stroke-width="1.6" stroke-dasharray="3 2"/>
          <!-- Cine Tape Hook Pin on top -->
          <rect x="132" y="36" width="12" height="18" rx="2" fill="#eab308" stroke="#854d0e"/>
          <circle cx="138" cy="36" r="5" fill="#fef08a" stroke="#854d0e"/>
          <!-- Sensor rectangle at Z=0 -->
          <rect x="134" y="74" width="8" height="46" rx="1" fill="#0284c7"/>
          <text x="164" y="100" font-size="7" font-weight="700" fill="#0369a1">撮像面 (Φ)</text>

          <!-- Dimension line -->
          <line x1="47" y1="118" x2="136" y2="118" stroke="#2563eb" stroke-width="1.5" marker-start="url(#a-M74-blue)" marker-end="url(#a-M74-blue)"/>
          <text x="92" y="113" text-anchor="middle" font-size="7.4" font-weight="700" fill="#1d4ed8">18.000 ± 0.005 mm</text>

          <!-- Tape measure ray to subject -->
          <line x1="132" y1="36" x2="28" y2="36" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="4 2" marker-end="url(#a-M74-red)"/>
          <text x="80" y="32" text-anchor="middle" font-size="6.8" font-weight="700" fill="#b91c1c">1st AC フォーカス巻尺測距</text>

          <!-- Right info box -->
          <rect x="218" y="42" width="126" height="92" rx="6" fill="#fefce8" stroke="#fde047"/>
          <text x="281" y="59" text-anchor="middle" font-size="7.5" font-weight="700" fill="#854d0e">シネマ実測基準 (Φ)</text>
          <text x="228" y="78" font-size="6.8" fill="#1e293b">• T1.4 被写界深度 数mm対応</text>
          <text x="228" y="92" font-size="6.8" fill="#1e293b">• FX9 / BURANO 巻尺ピン</text>
          <text x="228" y="106" font-size="6.8" fill="#1e293b">• LiDAR測距器データム共用</text>
          <text x="228" y="120" font-size="6.8" fill="#854d0e" font-weight="700">• 低熱膨張インバー基準軸</text>
        `,
        caption: 'フランジ面から18.000mm後方の撮像面基準を上面Φマーク＆シネマ巻尺フックへ精密転写',
      });

    // M75: Heavy-Telephoto & Cinema Cage Support Bosses
    case 'mount_cine_support_bosses':
      return mountHdFrame({
        code: 'M75',
        title: '超望遠・シネマ両翼補強ボス＆剪断タイバー',
        viewTag: '荷重分散',
        accent: '#475569',
        headerBg: '#f8fafc',
        body: `
          <!-- Front view of mount with twin side bosses + lower shear bar -->
          <circle cx="102" cy="80" r="34" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
          <circle cx="102" cy="80" r="24" fill="#ffffff" stroke="#94a3b8"/>
          <!-- Left & Right Titanium Support Bosses -->
          <rect x="44" y="80" width="20" height="32" rx="3" fill="#334155"/>
          <circle cx="54" cy="91" r="4" fill="#eab308"/>
          <circle cx="54" cy="103" r="2.2" fill="#cbd5e1"/>
          <rect x="140" y="80" width="20" height="32" rx="3" fill="#334155"/>
          <circle cx="150" cy="91" r="4" fill="#eab308"/>
          <circle cx="150" cy="103" r="2.2" fill="#cbd5e1"/>
          <!-- Lower stainless tie bar -->
          <rect x="48" y="114" width="108" height="10" rx="2" fill="#2563eb"/>
          <text x="102" y="121.5" text-anchor="middle" font-size="6.6" font-weight="700" fill="#fff">SUS304 剪断タイバー</text>
          <text x="54" y="75" text-anchor="middle" font-size="6.4" font-weight="700" fill="#1e293b">1/4-20</text>
          <text x="150" y="75" text-anchor="middle" font-size="6.4" font-weight="700" fill="#1e293b">M4座</text>

          <!-- Right: Load Bypass Diagram -->
          <rect x="180" y="38" width="164" height="100" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
          <text x="262" y="54" text-anchor="middle" font-size="7.5" font-weight="700" fill="#1e3a8a">5 kg 超望遠モーメント分散</text>
          ${pill(262, 74, 144, 17, 'ケージ／15mmロッドへ 78% 逃がし', '#ffffff', '#2563eb', '#1d4ed8', 6.8)}
          <text x="190" y="100" font-size="6.9" fill="#0f172a">• マウント隔壁たわみ −80% 低減</text>
          <text x="190" y="114" font-size="6.9" fill="#0f172a">• ARRI回り止めピン穴でねじれゼロ</text>
          <text x="190" y="128" font-size="6.9" fill="#0f172a">• FIZギア歯飛び・片ボケを根本防止</text>
        `,
        caption: 'マウント両翼のチタンねじ座と下部剪断タイバーで重量レンズの片持ち荷重をリグへ直逃がし',
      });

    // M76: 10/12-Pin Stepped Make-Before-Break & Metallurgy
    case 'mount_mbb_contact_metallurgy':
      return mountHdFrame({
        code: 'M76',
        title: '10ピン段差 MBB接触順序＆Au-Co多層めっき',
        viewTag: '電気冶金',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- Left: Stepped height bar chart of 10 E-mount pins -->
          <rect x="16" y="34" width="194" height="108" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="113" y="47" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">活線保護 Make-Before-Break 突出段差</text>
          ${[
            { n: '1', h: 52, c: '#0f172a', t: 'GND' },
            { n: '2', h: 42, c: '#dc2626', t: 'PWR' },
            { n: '3', h: 52, c: '#0f172a', t: 'GND' },
            { n: '4', h: 34, c: '#0284c7', t: 'VD' },
            { n: '5', h: 42, c: '#f59e0b', t: 'VCC' },
            { n: '6', h: 34, c: '#2563eb', t: 'CS' },
            { n: '7', h: 34, c: '#2563eb', t: 'TX' },
            { n: '8', h: 34, c: '#2563eb', t: 'RX' },
            { n: '9', h: 34, c: '#2563eb', t: 'CS' },
            { n: '10', h: 22, c: '#16a34a', t: 'DET' },
          ]
            .map(
              (p, i) => `
            <rect x="${24 + i * 18}" y="${116 - p.h}" width="12" height="${p.h}" rx="3" fill="${p.c}"/>
            <text x="${30 + i * 18}" y="126" text-anchor="middle" font-size="6" font-weight="700" fill="#334155" style="font-family:${FONT_MONO};">${p.n}</text>
            <text x="${30 + i * 18}" y="135" text-anchor="middle" font-size="5.2" fill="#64748b">${p.t}</text>
          `
            )
            .join('')}
          <text x="48" y="59" font-size="6" font-weight="700" fill="#0f172a">①先行接地</text>
          <text x="191" y="75" text-anchor="middle" font-size="5.8" font-weight="700" fill="#15803d">最終接続</text>
          <line x1="192" y1="78" x2="192" y2="91" stroke="#15803d" stroke-width="1" stroke-dasharray="2 1"/>

          <!-- Right: 3-Layer Plating Stack -->
          <rect x="220" y="34" width="126" height="108" rx="5" fill="#fffbeb" stroke="#fcd34d"/>
          <text x="283" y="48" text-anchor="middle" font-size="7.2" font-weight="700" fill="#92400e">接点3層めっき断面</text>
          <path d="M234 74 Q283 54 332 74 L332 84 L234 84 Z" fill="#eab308" stroke="#a16207"/>
          <text x="283" y="77" text-anchor="middle" font-size="6.4" font-weight="700" fill="#422006">Au-Co 硬化金 0.8μm</text>
          <rect x="234" y="85" width="98" height="17" fill="#cbd5e1" stroke="#64748b"/>
          <text x="283" y="96" text-anchor="middle" font-size="6.3" font-weight="700" fill="#1e293b">Ni / Pd-Ni 障壁 2.0μm</text>
          <rect x="234" y="103" width="98" height="22" fill="#d97706" stroke="#92400e"/>
          <text x="283" y="117" text-anchor="middle" font-size="6.6" font-weight="700" fill="#ffffff">CuBe2 高弾性母材</text>
          <text x="283" y="136" text-anchor="middle" font-size="6.3" fill="#78350f">R_c &lt; 10mΩ・5万回耐摩耗</text>
        `,
        caption: 'GND先行接触・XDETECT最終接続の段差配列とAu-Co硬化金3層めっきで活線交換を保護',
      });

    // M77: Pin 2 LENS_POWER Dual-Rail PMIC & Soft-Start
    case 'mount_lens_power_pmic':
      return mountHdFrame({
        code: 'M77',
        title: 'Pin 2 LENS_POWER 5V/7.4V切替PMIC＆ソフトスタート',
        viewTag: '電源回路',
        accent: '#16a34a',
        headerBg: '#f0fdf4',
        body: `
          <!-- Block Diagram -->
          ${pill(44, 62, 52, 22, 'VBAT 7.4V', '#fee2e2', '#dc2626', '#991b1b', 6.8)}
          ${pill(44, 96, 52, 22, 'REG 5.0V', '#dbeafe', '#2563eb', '#1e40af', 6.8)}
          <line x1="70" y1="62" x2="96" y2="74" stroke="#dc2626" stroke-width="1.5" marker-end="url(#a-M77-red)"/>
          <line x1="70" y1="96" x2="96" y2="84" stroke="#2563eb" stroke-width="1.5" marker-end="url(#a-M77-blue)"/>
          <!-- PMIC Switcher -->
          <rect x="98" y="54" width="76" height="52" rx="5" fill="#1e293b"/>
          <text x="136" y="73" text-anchor="middle" font-size="7.2" font-weight="700" fill="#4ade80">同期PMIC</text>
          <text x="136" y="85" text-anchor="middle" font-size="6.4" fill="#cbd5e1">ソフトスタート</text>
          <text x="136" y="96" text-anchor="middle" font-size="6.4" fill="#fde047">過電流遮断</text>
          <!-- Shunt Resistor -->
          <line x1="174" y1="78" x2="192" y2="78" stroke="#16a34a" stroke-width="2"/>
          ${pill(216, 78, 44, 20, '10 mΩ', '#fef3c7', '#d97706', '#92400e', 6.8)}
          <line x1="238" y1="78" x2="262" y2="78" stroke="#16a34a" stroke-width="2" marker-end="url(#a-M77-green)"/>
          ${pill(302, 78, 70, 26, 'Pin 2 PWR', '#dcfce7', '#16a34a', '#166534', 7.2)}

          <!-- Soft-start voltage ramp chart below -->
          <rect x="20" y="114" width="320" height="32" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
          <path d="M34 140 L76 140 L122 124 L212 124 L244 118 L328 118" fill="none" stroke="#16a34a" stroke-width="2"/>
          <text x="102" y="138" font-size="6.2" fill="#0f766e">スルー制御</text>
          <text x="172" y="136" font-size="6.4" font-weight="700" fill="#1d4ed8">5.0V 通常</text>
          <text x="284" y="134" font-size="6.4" font-weight="700" fill="#dc2626">7.4V XD全力</text>
        `,
        caption: 'ソフトスタート突入抑制と10mΩシャント監視で5V/7.4V二段給電を安全切替',
      });

    // M78: Pin 4 BODY_VD_LENS & 3.15V 1.5Mbaud UART PHY
    case 'mount_vd_sync_uart_phy':
      return mountHdFrame({
        code: 'M78',
        title: 'BODY_VD_LENS 同期＆1.5 Mbaud UART物理層',
        viewTag: 'プロトコル',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Timing Diagram (verified E-mount RE protocol) -->
          <rect x="18" y="34" width="324" height="108" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Pin 4 VD Pulse -->
          <text x="26" y="54" font-size="6.6" font-weight="700" fill="#dc2626" style="font-family:${FONT_MONO};">P4 VD</text>
          <path d="M72 56 L92 56 L92 44 L100 44 L100 56 L196 56 L196 44 L204 44 L204 56 L300 56 L300 44 L308 44 L308 56 L332 56" fill="none" stroke="#dc2626" stroke-width="1.8"/>
          <text x="148" y="48" text-anchor="middle" font-size="6.3" fill="#b91c1c">60 / 120 / 240 Hz 露光フレーム同期</text>

          <!-- Pin 6/9 CS Framing -->
          <text x="26" y="80" font-size="6.6" font-weight="700" fill="#0284c7" style="font-family:${FONT_MONO};">P6 CS</text>
          <path d="M72 72 L106 72 L106 84 L182 84 L182 72 L210 72 L210 84 L286 84 L286 72 L332 72" fill="none" stroke="#0284c7" stroke-width="1.8"/>
          <text x="144" y="81" text-anchor="middle" font-size="6.2" font-weight="700" fill="#0369a1">CS Active</text>

          <!-- Pin 7/8 UART 1.5 Mbaud Packets -->
          <text x="26" y="108" font-size="6.6" font-weight="700" fill="#16a34a" style="font-family:${FONT_MONO};">TX/RX</text>
          <rect x="108" y="96" width="72" height="16" rx="3" fill="#dcfce7" stroke="#16a34a"/>
          <text x="144" y="106.5" text-anchor="middle" font-size="6.3" font-weight="700" fill="#166534">0x01→0x3B 初期化</text>
          <rect x="212" y="96" width="72" height="16" rx="3" fill="#dbeafe" stroke="#2563eb"/>
          <text x="248" y="106.5" text-anchor="middle" font-size="6.3" font-weight="700" fill="#1e40af">AF/IBIS 1.5Mbaud</text>

          <text x="180" y="132" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">Pin 5 LOGIC_VCC = 3.15 V 低雑音LDO ／ 750 kbaud → 1.5 Mbaud 8N1</text>
        `,
        caption: 'Pin 4フレーム同期パルスと3.15V高速1.5Mbaud UARTでAFとIBISの遅延を極小化',
      });

    // M79: Pin 10 LENS_XDETECT 0Ω / 680Ω Sensing Bridge
    case 'mount_xdetect_bridge':
      return mountHdFrame({
        code: 'M79',
        title: 'Pin 10 LENS_XDETECT 0Ω/680Ω 識別ブリッジ',
        viewTag: '検出回路',
        accent: '#ea580c',
        headerBg: '#fff7ed',
        body: `
          <!-- Left: Voltage Divider Schematic -->
          <rect x="18" y="36" width="142" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="58" y="50" text-anchor="middle" font-size="7" font-weight="700" fill="#dc2626">3.15V</text>
          <line x1="58" y1="53" x2="58" y2="64" stroke="#334155" stroke-width="1.4"/>
          <rect x="46" y="64" width="24" height="14" rx="2" fill="#dbeafe" stroke="#2563eb"/>
          <text x="58" y="73.5" text-anchor="middle" font-size="6.2" font-weight="700" fill="#1e40af">R_pu</text>
          <line x1="58" y1="78" x2="58" y2="100" stroke="#334155" stroke-width="1.4"/>
          <circle cx="58" cy="89" r="2.6" fill="#ea580c"/>
          <line x1="58" y1="89" x2="100" y2="89" stroke="#ea580c" stroke-width="1.6" marker-end="url(#a-M79-amber)"/>
          ${pill(128, 89, 52, 22, '比較器IC', '#ffedd5', '#ea580c', '#9a3412', 6.8)}
          <!-- Lens side resistor -->
          <rect x="40" y="100" width="36" height="16" rx="2" fill="#fef3c7" stroke="#d97706"/>
          <text x="58" y="110.5" text-anchor="middle" font-size="6.3" font-weight="700" fill="#92400e">R_lens</text>
          <line x1="58" y1="116" x2="58" y2="127" stroke="#334155" stroke-width="1.4"/>
          <line x1="48" y1="127" x2="68" y2="127" stroke="#334155" stroke-width="1.8"/>
          <text x="58" y="136" text-anchor="middle" font-size="6.3" fill="#475569">Pin 10 → GND</text>

          <!-- Right: 3-State Window Table -->
          <rect x="172" y="36" width="172" height="104" rx="5" fill="#fff7ed" stroke="#fdba74"/>
          <text x="258" y="52" text-anchor="middle" font-size="7.4" font-weight="700" fill="#9a3412">3状態ウィンドウ自動判別</text>
          ${pill(258, 72, 154, 18, '≈ 0 Ω  → 純正 Eマウントレンズ', '#dcfce7', '#16a34a', '#166534', 6.8)}
          ${pill(258, 96, 154, 18, '≈ 680 Ω → 電子マウントアダプター', '#dbeafe', '#2563eb', '#1e40af', 6.8)}
          ${pill(258, 120, 154, 18, 'Open(∞) → 未装着／キャッシュ消去', '#fee2e2', '#dc2626', '#991b1b', 6.8)}
        `,
        caption: 'Pin 10の接地抵抗値（0Ω vs 680Ω vs 開放）で純正・アダプター・脱着リセットを瞬時判定',
      });

    // M80: 16-Pin 0.3mm Back-Flip ZIF Mount-Bus Connector
    case 'mount_zif_mainboard_conn':
      return mountHdFrame({
        code: 'M80',
        title: '16ピン 0.3 mmピッチ バックフリップZIF端子',
        viewTag: '精密実装',
        accent: '#ca8a04',
        headerBg: '#fefce8',
        body: `
          <!-- Side cutaway of Back-Flip ZIF clamping BL-FPC -->
          <rect x="18" y="36" width="194" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Mainboard PCB -->
          <rect x="28" y="114" width="174" height="14" rx="2" fill="#14532d"/>
          <text x="115" y="123.5" text-anchor="middle" font-size="6.5" font-weight="700" fill="#bbf7d0">SY-1122 メイン基板</text>
          <!-- Ivory LCP ZIF Housing -->
          <rect x="66" y="76" width="110" height="36" rx="3" fill="#fef3c7" stroke="#ca8a04" stroke-width="1.2"/>
          <!-- Polyimide BL-FPC inserted from left -->
          <rect x="28" y="90" width="96" height="8" rx="1" fill="#d97706"/>
          <text x="48" y="85" text-anchor="middle" font-size="6.4" font-weight="700" fill="#b45309">BL-FPC</text>
          <!-- Back-Flip hinged black actuator -->
          <path d="M126 78 L166 52 L174 58 L136 86 Z" fill="#1e293b"/>
          <path d="M158 50 Q144 42 132 54" fill="none" stroke="#dc2626" stroke-width="1.4" marker-end="url(#a-M80-red)"/>
          <text x="158" y="46" text-anchor="middle" font-size="6.3" font-weight="700" fill="#dc2626">背面フリップ</text>
          <!-- Dual-row staggered gold contact beam -->
          <path d="M84 112 L84 98 L122 98" fill="none" stroke="#eab308" stroke-width="2.2"/>
          <rect x="80" y="109" width="84" height="5" fill="#64748b"/>

          <!-- Right: Pitch & Spec -->
          <rect x="222" y="36" width="122" height="104" rx="5" fill="#fefce8" stroke="#fde047"/>
          <text x="283" y="52" text-anchor="middle" font-size="7.3" font-weight="700" fill="#854d0e">ZIF 無挿抜力設計</text>
          ${pill(283, 72, 108, 17, '16極 / 0.30 mm ピッチ', '#ffffff', '#ca8a04', '#854d0e', 6.8)}
          <text x="232" y="98" font-size="6.7" fill="#1e293b">• 前後千鳥2列はんだ配列</text>
          <text x="232" y="111" font-size="6.7" fill="#1e293b">• 両端SUS基板固定タブ</text>
          <text x="232" y="124" font-size="6.7" fill="#1e293b">• 底面 Ni-Cu 導電EMI pad</text>
        `,
        caption: '0.3mm極細ピッチBL-FPCを無挿抜力で均一加圧固定し、高速UART信号のEMI漏洩も抑止',
      });

    default:
      return null;
  }
}
