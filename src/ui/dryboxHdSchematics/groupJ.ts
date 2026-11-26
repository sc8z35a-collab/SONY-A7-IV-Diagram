import { drawCompareFrame, drawKpiBox, drawPill, drawPin, wrapDryboxHdSvg } from './shared';

/**
 * Dry Box Ultra-HD 720x470 Vector Infographics — Group J (10 Parts: DB101–DB110):
 * Cobalt-Free CuCl2 HIC Card, 12-Edge Epoxy Hermetic Seam Fillet, Bayonet Vertical Parking Dock,
 * Leather Strap Hanger Bar + Linen Sleeve, Rail ESD Wiper Brushes, 150μm Interdigital Leak Sensor,
 * PEM α-MnO2 Catalytic O3 Mesh, PEM PTFE Carbon GDL+MPL, 0.5rpm Zr-MOF Planetary Gearmotor,
 * and 270°/90° PTFE-Felt Rotor Sector Wiper Seal.
 */
export function renderDryboxGroupJSvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'db_cobaltfree_hic_card':
      return wrapDryboxHdSvg({
        badge: 'DB101',
        stepTag: 'JEDEC / CoCl₂フリー',
        title: 'EU R49/R46・JEDEC準拠 コバルトフリーCuCl₂湿度カード',
        analogy: '電気もバネも不要！発がん性コバルトを使わずに「茶→青」の色変化だけで湿度を裏付ける化学湿度計',
        accent: '#0f766e',
        accentSoft: '#ccfbf1',
        body: `
          <!-- Left: 3-Spot Cobalt-Free HIC Card & Coordination Chemistry -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">3点可逆 塩化銅(CuCl₂) HICカード（40% RH 最適状態の目視例）</text>
            <!-- Aluminum Viewing Card Holder -->
            <rect x="26" y="38" width="152" height="176" rx="10" fill="url(#db101-steel)" stroke="#475569" stroke-width="1.5"/>
            <rect x="38" y="48" width="128" height="156" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
            <text x="102" y="64" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0f172a">COBALT-FREE HIC</text>
            <!-- Spot 30% (Azure = >30% RH) -->
            <circle cx="72" cy="92" r="17" fill="#0284c7" stroke="#0c4a6e" stroke-width="1.5"/>
            <text x="128" y="90" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0c4a6e">30% RH</text>
            <text x="128" y="102" text-anchor="middle" font-size="7.6" font-weight="700" fill="#0369a1">青（30%超）</text>
            <!-- Spot 40% (Teal transition = 40% RH Sweet Spot) -->
            <circle cx="72" cy="134" r="17" fill="#0f766e" stroke="#134e4a" stroke-width="1.5"/>
            <text x="128" y="132" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0f766e">40% RH</text>
            <text x="128" y="144" text-anchor="middle" font-size="7.6" font-weight="800" fill="#0d9488">青緑（最適！）</text>
            <!-- Spot 50% (Brown = Dry <50% RH) -->
            <circle cx="72" cy="176" r="17" fill="#92400e" stroke="#451a03" stroke-width="1.5"/>
            <text x="128" y="174" text-anchor="middle" font-size="9.4" font-weight="900" fill="#78350f">50% RH</text>
            <text x="128" y="186" text-anchor="middle" font-size="7.6" font-weight="700" fill="#92400e">茶（50%未満）</text>
            <!-- Right Side: Chemistry + Triple Check -->
            <rect x="196" y="42" width="212" height="78" rx="8" fill="#f0fdfa" stroke="#0f766e" stroke-width="1.4"/>
            <text x="302" y="61" text-anchor="middle" font-size="9.2" font-weight="900" fill="#134e4a">可逆配位水和反応（0 W）</text>
            <text x="302" y="81" text-anchor="middle" font-size="8.8" font-weight="800" fill="#92400e">[CuCl₄]²⁻（茶：乾燥）</text>
            <text x="302" y="96" text-anchor="middle" font-size="8.6" font-weight="900" fill="#0f172a">⇅ + 6 H₂O（可逆往復）</text>
            <text x="302" y="111" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0284c7">[Cu(H₂O)₆]²⁺（青：湿潤）</text>
            <rect x="196" y="130" width="212" height="84" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
            <text x="302" y="149" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0f172a">トリプル独立クロスチェック体制</text>
            <text x="208" y="168" font-size="8.4" font-weight="700" fill="#0284c7">① 電子式：SHT45 デジタル（DB09）</text>
            <text x="208" y="185" font-size="8.4" font-weight="700" fill="#475569">② 機械式：合成毛髪指針計（DB56）</text>
            <text x="208" y="202" font-size="8.4" font-weight="900" fill="#0f766e">③ 化学式：CuCl₂ HICカード（DB101）</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">発がん懸念の塩化コバルト(CoCl₂)完全ゼロ！欧州REACH＆半導体JEDEC準拠</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '3点判定精度（23°C）', '±5% RH', '30% / 40% / 50% RH 直読', '#0f766e')}
            ${drawKpiBox(0, 88, 112, 74, '消費電力', '0 W', '停電・故障と無縁', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '環境規制', 'CoCl₂ 0%', 'EU R49/R46適合', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, '半導体JEDEC J-STD-033D基準', '#134e4a', '#f0fdfa')}
            ${drawPill(12, 204, 210, 'CuCl₂式：安全・可逆・何度でも判定', true)}
            ${drawPill(12, 229, 210, '旧CoCl₂式：SVHC懸念物質に指定', false)}
          </g>
        `,
        cards: [
          { label: '化学呈色方式', line1: 'コバルト完全フリー CuCl₂錯体カード', line2: '30 / 40 / 50% RH の3点可逆変色' },
          { label: '物理的メリット', line1: '電子故障や針固着と無縁の熱力学原理', line2: '扉を閉めたまま1秒で湿度を裏付け' },
          { label: 'カメラを守る意味', line1: 'センサーのドリフト異常を即座に発見', line2: '安全物質のみで機材と人体に無害' },
        ],
      });

    case 'db_seam_epoxy_hermetic_caulk':
      return wrapDryboxHdSvg({
        badge: 'DB102',
        stepTag: '12辺全周 / 低VOC',
        title: '庫内12辺全周 低VOCエポキシ／変成シリコーン気密フィレット',
        analogy: '水族館の水槽の角のように、鉄板溶接の極小ピンホールを12辺すべて塗り潰す完全気密目止め',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Isometric 12-Edge Cube + Magnified Weld Corner Fillet -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">筐体12辺連続シーミング ＆ 溶接コーナー R3 mm フィレット断面</text>
            <!-- Wireframe 12-Edge Isometric Cabinet Highlighting Blue Sealed Edges -->
            <g transform="translate(30, 48)">
              <rect x="34" y="16" width="102" height="136" fill="none" stroke="#0284c7" stroke-width="3.2" stroke-dasharray="6 3"/>
              <rect x="10" y="36" width="102" height="136" fill="none" stroke="#0ea5e9" stroke-width="3.8"/>
              <line x1="10" y1="36" x2="34" y2="16" stroke="#0284c7" stroke-width="3.4"/>
              <line x1="112" y1="36" x2="136" y2="16" stroke="#0284c7" stroke-width="3.4"/>
              <line x1="10" y1="172" x2="34" y2="152" stroke="#0284c7" stroke-width="3.4"/>
              <line x1="112" y1="172" x2="136" y2="152" stroke="#0284c7" stroke-width="3.4"/>
              <circle cx="10" cy="36" r="4.5" fill="#0284c7"/>
              <circle cx="112" cy="36" r="4.5" fill="#0284c7"/>
              <circle cx="10" cy="172" r="4.5" fill="#0284c7"/>
              <circle cx="112" cy="172" r="4.5" fill="#0284c7"/>
              <text x="72" y="106" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0c4a6e">全12辺</text>
              <text x="72" y="122" text-anchor="middle" font-size="8.2" font-weight="700" fill="#0369a1">8隅三面交点</text>
              <text x="72" y="136" text-anchor="middle" font-size="8.0" font-weight="700" fill="#0369a1">連続シーム封止</text>
            </g>
            <!-- Right Detail: Magnified Weld Seam Corner -->
            <g transform="translate(206, 46)">
              <rect x="0" y="0" width="202" height="172" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
              <text x="101" y="18" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0f172a">溶接角 拡大断面（R 3.0 mm）</text>
              <!-- Steel plates meeting at 90 deg -->
              <rect x="26" y="34" width="20" height="106" fill="url(#db102-steel)" stroke="#475569"/>
              <rect x="26" y="120" width="144" height="20" fill="url(#db102-steel)" stroke="#475569"/>
              <!-- Smooth Concave MS-Polymer Fillet sealing pinhole -->
              <path d="M 46 80 L 46 120 L 86 120 Q 54 114 46 80 Z" fill="#0ea5e9" stroke="#0369a1" stroke-width="1.5"/>
              <!-- Blocked Moisture Arrow from outside corner -->
              <line x1="10" y1="154" x2="36" y2="132" stroke="#e11d48" stroke-width="2.4" marker-end="url(#db102-arrRed)"/>
              <text x="98" y="158" text-anchor="middle" font-size="8.0" font-weight="800" fill="#be123c">20〜100μm溶接針穴リーク遮断</text>
              <text x="128" y="64" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0284c7">脱シロキサン</text>
              <text x="128" y="79" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0369a1">低VOCフィレット</text>
              <text x="128" y="96" text-anchor="middle" font-size="7.6" font-weight="700" fill="#16a34a">角の拭き掃除も容易</text>
            </g>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">光学クリーンルーム仕様の無酢酸・脱シロキサン処方でレンズ曇りゼロ</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '静的透湿リーク削減', '-60% 以上', '溶接ピンホール毛細管漏れ封止', '#0284c7')}
            ${drawKpiBox(0, 88, 112, 74, 'N₂ガス節約', '-45%', 'パージ気密向上', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, 'シロキサン', '完全ゼロ', '接点曇り防止', '#7c3aed')}
            ${drawCompareFrame(0, 172, 234, 82, '建築用コーキングとの決定的差', '#0c4a6e', '#f0f9ff')}
            ${drawPill(12, 204, 210, '脱シロキサンMS樹脂：光学安全', true)}
            ${drawPill(12, 229, 210, '市販シリコーン：酢酸＆白曇り害', false)}
          </g>
        `,
        cards: [
          { label: '気密施工範囲', line1: 'SPCC筐体 内側12辺＋8隅完全封止', line2: 'R 3 mm凹フィレットでホコリ溜り0' },
          { label: '材料科学', line1: '無溶剤・脱シロキサン低VOC樹脂', line2: '溶接点間の20μm針穴リーク遮断' },
          { label: 'カメラを守る意味', line1: '停電時の湿度キープ時間を大幅延長', line2: '除湿機の稼働率＆消費電力を削減' },
        ],
      });

    case 'db_bayonet_mount_parking_dock':
      return wrapDryboxHdSvg({
        badge: 'DB103',
        stepTag: '耐転倒 0.65 G',
        title: 'シリコーン緩衝POMバヨネット垂直レンズパーキングドック',
        analogy: '単焦点レンズを立てたまま棚を動かしても絶対倒れず、底の通気穴で後玉も乾かす専用台座',
        accent: '#334155',
        accentSoft: '#e2e8f0',
        body: `
          <!-- Left: Vertical Lens Dock Cross-Section with Dry-Air Flow -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">単焦点レンズ垂直ドッキング断面 ＆ 後玉ブリーザー乾燥気流</text>
            <!-- Stylized Upright Prime Lens Silhouette -->
            <rect x="86" y="42" width="84" height="106" rx="8" fill="url(#db103-dark)" stroke="#0f172a" stroke-width="1.6"/>
            <rect x="96" y="48" width="64" height="14" rx="3" fill="url(#db103-glass)" stroke="#0284c7"/>
            <text x="128" y="96" text-anchor="middle" font-size="9.0" font-weight="800" fill="#f8fafc">50mm F1.2 GM</text>
            <text x="128" y="112" text-anchor="middle" font-size="7.8" font-weight="700" fill="#94a3b8">垂直立て置き</text>
            <!-- Rear Mount / Cap sitting inside Dock -->
            <rect x="98" y="148" width="60" height="22" rx="3" fill="url(#db103-steel)" stroke="#475569" stroke-width="1.3"/>
            <!-- Outer POM Guide Collar + Inner Silicone Cushion Ring -->
            <rect x="74" y="142" width="18" height="36" rx="3" fill="#f8fafc" stroke="#475569" stroke-width="1.5"/>
            <rect x="164" y="142" width="18" height="36" rx="3" fill="#f8fafc" stroke="#475569" stroke-width="1.5"/>
            <rect x="90" y="148" width="8" height="24" rx="2" fill="#0ea5e9"/>
            <rect x="158" y="148" width="8" height="24" rx="2" fill="#0ea5e9"/>
            <!-- Base Plate with Central 20mm Dry-Air Breather Aperture -->
            <rect x="52" y="178" width="58" height="16" rx="3" fill="#334155"/>
            <rect x="146" y="178" width="58" height="16" rx="3" fill="#334155"/>
            <!-- Upward Dry Air Stream through Central Aperture -->
            <line x1="128" y1="218" x2="128" y2="174" stroke="#06b6d4" stroke-width="2.8" marker-end="url(#db103-arrBlue)"/>
            <text x="128" y="232" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0284c7">φ20 mm 後玉乾燥ブリーザー孔（DB22連動）</text>
            <!-- Pins -->
            ${drawPin(173, 150, 232, 74, 1, '低摩擦POMガイド環', '鏡筒・塗装へ無傷フィット', '#334155', 'start')}
            ${drawPin(162, 160, 232, 126, 2, 'Shore A 45 シリコーン座', '衝撃吸収＆0.65 G耐転倒', '#0ea5e9', 'start')}
            ${drawPin(128, 190, 232, 178, 3, '中央乾燥気流ブリーザー', '最もカビやすい後玉を通気', '#059669', 'start')}
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '耐転倒水平加速度', '0.65 G+', '裸立て置き比 2.8倍の安定性', '#334155')}
            ${drawKpiBox(0, 88, 112, 74, '収納密度', '約 1.8倍', '単焦点レンズ最適', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '後玉通気', 'φ20 mm孔', '湿気滞留ゼロ', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, '他クッション部品との役割分担', '#1e293b', '#f8fafc')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#1e293b">• DB23波型／DB59 V字：横置きズーム用</text>
            <text x="14" y="238" font-size="8.6" font-weight="800" fill="#0284c7">• DB103垂直ドック：単焦点高密度縦置</text>
          </g>
        `,
        cards: [
          { label: '二層ホールド構造', line1: '自己潤滑POM外輪＋シリコーン内座', line2: '赤色位置合わせ指標ドット付き' },
          { label: '物理的メリット', line1: '0.65 G引き出し衝撃でも転倒ゼロ', line2: 'φ20 mm中央通気孔で後玉防カビ' },
          { label: 'カメラを守る意味', line1: '単焦点レンズの接触・落下事故防止', line2: '限られた棚面積へ1.8倍スマート収納' },
        ],
      });

    case 'db_leather_strap_hanger_bar':
      return wrapDryboxHdSvg({
        badge: 'DB104',
        stepTag: '天然リネン調湿緩衝',
        title: '多孔ステンレス革ストラップハンガー ＋ 50% RHリネンスリーブ',
        analogy: '汗を吸った本革ストラップを吊るして360°通気し、天然リネン布でひび割れも防ぐ専用バー',
        accent: '#92400e',
        accentSoft: '#fef3c7',
        body: `
          <!-- Left: Suspended Perforated Bar + Linen Micro-Climate Buffer -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">360°通気多孔SUS304バー ＆ 天然リネン吸放湿バッファー構造</text>
            <!-- Top Ceiling Brackets -->
            <rect x="52" y="36" width="16" height="44" fill="url(#db104-steel)" stroke="#475569"/>
            <rect x="356" y="36" width="16" height="44" fill="url(#db104-steel)" stroke="#475569"/>
            <!-- Perforated SUS304 Horizontal Pipe -->
            <rect x="44" y="72" width="336" height="22" rx="11" fill="url(#db104-steel)" stroke="#475569" stroke-width="1.5"/>
            <!-- Breathable Natural Linen Sleeve around Center -->
            <rect x="116" y="66" width="192" height="34" rx="8" fill="#d6cfc2" stroke="#92400e" stroke-width="1.6"/>
            <text x="212" y="87" text-anchor="middle" font-size="9.0" font-weight="900" fill="#451a03">無漂白 天然リネン緩衝スリーブ（42〜50% RH）</text>
            <!-- Silicone Spacer Rings -->
            <rect x="102" y="68" width="8" height="30" rx="3" fill="#1e293b"/>
            <rect x="314" y="68" width="8" height="30" rx="3" fill="#1e293b"/>
            <!-- Hanging Leather Camera Straps (Open Loop - Zero Crease!) -->
            <path d="M 152 100 L 152 190 Q 170 206 188 190 L 188 100" fill="none" stroke="#92400e" stroke-width="9" stroke-linecap="round"/>
            <path d="M 236 100 L 236 182 Q 254 198 272 182 L 272 100" fill="none" stroke="#78350f" stroke-width="9" stroke-linecap="round"/>
            <!-- Dry Air Circulation Arrows around Leather -->
            <line x1="76" y1="146" x2="134" y2="146" stroke="#06b6d4" stroke-width="2.2" marker-end="url(#db104-arrBlue)"/>
            <line x1="292" y1="146" x2="352" y2="146" stroke="#06b6d4" stroke-width="2.2" marker-end="url(#db104-arrBlue)"/>
            <text x="86" y="134" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0284c7">360°通気</text>
            <text x="86" y="164" text-anchor="middle" font-size="7.8" font-weight="700" fill="#0369a1">汗水分を速乾</text>
            <text x="340" y="134" text-anchor="middle" font-size="8.2" font-weight="800" fill="#16a34a">折り目カビ0</text>
            <text x="340" y="164" text-anchor="middle" font-size="7.8" font-weight="700" fill="#15803d">過乾燥割れ0</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">革コラーゲンの「カビ(&gt;60%)」と「ひび割れ(&lt;30%)」をリネン界面で同時解決</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'リネン界面 調湿緩衝域', '42〜50% RH', '革の柔軟性を保つ自然ヒステリシス', '#92400e')}
            ${drawKpiBox(0, 88, 112, 74, '折り目接触', '-85% 削減', '吊り下げ開放乾燥', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '耐荷重', '4.0 kg', 'SUS304多孔バー', '#475569')}
            ${drawCompareFrame(0, 172, 234, 82, '本革ストラップ保管の鉄則', '#78350f', '#fffbeb')}
            ${drawPill(12, 204, 210, '吊り下げ＋リネン：カビも割れもゼロ', true)}
            ${drawPill(12, 229, 210, '丸めて放置：折り目に汗カビ大発生', false)}
          </g>
        `,
        cards: [
          { label: '博物館保存設計', line1: 'SUS304 360°多孔通気パイプ', line2: '洗える無漂白100%天然リネン巻' },
          { label: '物理的メリット', line1: '撮影直後の汗湿気を折り目なく放散', line2: '天然繊維が過乾燥ひび割れを緩衝' },
          { label: 'カメラを守る意味', line1: '本革ストラップ・蛇腹・ケース長寿命', line2: 'ボディ吊り環への汗サビ移りを遮断' },
        ],
      });

    case 'db_shelf_esd_wiper_brush':
      return wrapDryboxHdSvg({
        badge: 'DB105',
        stepTag: '1 MΩ 摺動ESD接地',
        title: 'リン青銅バネ式 引き出し棚ESD連続接地ワイパーブラシ',
        analogy: 'グリスで絶縁されがちなスライド棚を、電車のパンタグラフのように常時アースへ繋ぐ金属ブラシ',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          <!-- Left: Ball-Bearing Grease Insulation vs Phosphor-Bronze ESD Wiper -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">ボールレール油膜絶縁をバイパスする 連続ESDワイパー構造</text>
            <!-- Left: Moving Steel Tray (DB22) -->
            <rect x="20" y="48" width="114" height="148" rx="8" fill="#e2e8f0" stroke="#475569" stroke-width="1.6"/>
            <text x="77" y="78" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0f172a">可動スライド棚</text>
            <text x="77" y="96" text-anchor="middle" font-size="8.2" font-weight="700" fill="#334155">DB22 トレイ</text>
            <text x="77" y="122" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0284c7">カメラ着脱時の</text>
            <text x="77" y="138" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0284c7">静電気を逃がす</text>
            <!-- Top Path: Ball Bearing Rail (Insulated by EHL Grease!) -->
            <rect x="160" y="54" width="104" height="44" rx="6" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.4" stroke-dasharray="4 2"/>
            <text x="212" y="72" text-anchor="middle" font-size="8.4" font-weight="900" fill="#9f1239">ボールレール DB21</text>
            <text x="212" y="88" text-anchor="middle" font-size="7.8" font-weight="800" fill="#e11d48">EHLグリス膜 &gt;10¹⁰ Ω</text>
            <!-- Bottom Path: Phosphor-Bronze Dual Leaf Wiper + 1MΩ Resistor -->
            <rect x="148" y="136" width="46" height="32" rx="4" fill="#065f46" stroke="#047857" stroke-width="1.4"/>
            <text x="171" y="156" text-anchor="middle" font-size="8.4" font-weight="900" fill="#ffffff">1 MΩ</text>
            <path d="M 194 146 Q 238 134 282 148" fill="none" stroke="#d97706" stroke-width="4.2" stroke-linecap="round"/>
            <path d="M 194 158 Q 238 170 282 156" fill="none" stroke="#d97706" stroke-width="4.2" stroke-linecap="round"/>
            <circle cx="284" cy="152" r="6" fill="#eab308" stroke="#713f12" stroke-width="1.4"/>
            <line x1="134" y1="152" x2="148" y2="152" stroke="#d97706" stroke-width="3"/>
            <text x="212" y="194" text-anchor="middle" font-size="9.0" font-weight="900" fill="#b45309">リン青銅二股ワイパー ＋ 金めっき摺動接点</text>
            <text x="212" y="210" text-anchor="middle" font-size="8.0" font-weight="700" fill="#78350f">押圧力 0.6 N でピラスター柱へ常時接触（5万回無給油）</text>
            <!-- Right: Grounded Pilaster & ESD Bus -->
            <rect x="290" y="48" width="114" height="148" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.6"/>
            <text x="347" y="78" text-anchor="middle" font-size="9.4" font-weight="900" fill="#14532d">接地ピラスター</text>
            <text x="347" y="98" text-anchor="middle" font-size="8.2" font-weight="800" fill="#15803d">DB57 支柱</text>
            <text x="347" y="118" text-anchor="middle" font-size="8.2" font-weight="800" fill="#15803d">→ DB43 ESDバス</text>
            <text x="347" y="146" text-anchor="middle" font-size="9.2" font-weight="900" fill="#059669">⏚ ソフト除電</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">扉(DB97)＋マット(DB89)＋全3段可動棚(DB105)の切れ目なきEPA環境</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'トレイ散逸接地抵抗', '1.0 MΩ', 'ANSI/ESD S20.20 適正範囲', '#d97706')}
            ${drawKpiBox(0, 88, 112, 74, '設置数', '全 6 箇所', '3段×左右両側', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '摺動耐久', '50,000回', '無給油ドライ接点', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, 'なぜ1 MΩ直列抵抗を入れる？', '#78350f', '#fffbeb')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#78350f">• 0Ω直結だと急激なスパーク放電が発生</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#92400e">• 1MΩが静電気を穏やかに安全ソフト逃がし</text>
          </g>
        `,
        cards: [
          { label: 'バネ接点構造', line1: 'C5191リン青銅二股リーフ＋金接点', line2: '1 MΩ ESDソフトブリード抵抗内蔵' },
          { label: '物理的メリット', line1: 'ベアリング油膜絶縁を確実にバイパス', line2: '引き出し途中でも100%アース維持' },
          { label: 'カメラを守る意味', line1: 'カメラ底面・接点のESD損傷防止', line2: 'クリーンルーム同等EPA保護を完成' },
        ],
      });

    case 'db_interdigital_condensation_strip':
      return wrapDryboxHdSvg({
        badge: 'DB106',
        stepTag: '150μm / 10μL検知',
        title: '金めっき150 μm櫛歯（インターデジタル）PCB結露・漏水検知帯',
        analogy: '冷却板から万一落ちた「たった1滴（0.01 mL）の水滴」を瞬時に捕まえて冷却を止める黄金の櫛',
        accent: '#eab308',
        accentSoft: '#fef9c3',
        body: `
          <!-- Left: Interdigital ENIG Comb Electrodes + 10uL Droplet Trigger -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">ENIG金めっき 150 μm 櫛歯電極 ＋ AC 1 kHz 無腐食漏水検知回路</text>
            <!-- Emerald PCB Substrate -->
            <rect x="26" y="44" width="268" height="126" rx="8" fill="#065f46" stroke="#047857" stroke-width="1.6"/>
            <!-- Top & Bottom Gold Bus Rails -->
            <rect x="42" y="58" width="236" height="9" rx="2" fill="#facc15"/>
            <rect x="42" y="147" width="236" height="9" rx="2" fill="#facc15"/>
            <!-- Interlocking Comb Fingers -->
            <rect x="54" y="67" width="7" height="66" fill="#facc15"/>
            <rect x="74" y="81" width="7" height="66" fill="#facc15"/>
            <rect x="94" y="67" width="7" height="66" fill="#facc15"/>
            <rect x="114" y="81" width="7" height="66" fill="#facc15"/>
            <rect x="134" y="67" width="7" height="66" fill="#facc15"/>
            <rect x="154" y="81" width="7" height="66" fill="#facc15"/>
            <rect x="174" y="67" width="7" height="66" fill="#facc15"/>
            <rect x="194" y="81" width="7" height="66" fill="#facc15"/>
            <rect x="214" y="67" width="7" height="66" fill="#facc15"/>
            <rect x="234" y="81" width="7" height="66" fill="#facc15"/>
            <rect x="254" y="67" width="7" height="66" fill="#facc15"/>
            <!-- Single 10 uL Stray Water Droplet bridging fingers -->
            <circle cx="147" cy="107" r="22" fill="#38bdf8" fill-opacity="0.72" stroke="#0284c7" stroke-width="2.2"/>
            <text x="147" y="104" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">10 μL</text>
            <text x="147" y="117" text-anchor="middle" font-size="7.4" font-weight="800" fill="#e0f2fe">水滴1粒</text>
            <!-- Right Block: AC Comparator & Auto Cutoff -->
            <line x1="294" y1="107" x2="316" y2="107" stroke="#e11d48" stroke-width="2.6" marker-end="url(#db106-arrRed)"/>
            <rect x="320" y="54" width="90" height="106" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.6"/>
            <text x="365" y="76" text-anchor="middle" font-size="8.8" font-weight="900" fill="#9f1239">AC 1kHz</text>
            <text x="365" y="94" text-anchor="middle" font-size="8.2" font-weight="800" fill="#be123c">Z急降下</text>
            <text x="365" y="112" text-anchor="middle" font-size="8.0" font-weight="800" fill="#e11d48">0.2秒検知</text>
            <text x="365" y="132" text-anchor="middle" font-size="7.8" font-weight="700" fill="#881337">TEC即減出力</text>
            <text x="365" y="148" text-anchor="middle" font-size="7.8" font-weight="700" fill="#881337">スマホ通知</text>
            <!-- Bottom annotation -->
            ${drawPin(147, 130, 74, 200, 1, '線間 150 μm 櫛歯', '絶縁100MΩ→数kΩへ一万倍変化', '#0284c7', 'start')}
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">DC印加と違いAC 1 kHz励起のため、濡れても電極が電解腐食せず何度でも動作</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '最小検知水滴体積', '10 μL', '約0.01 mL の単一水滴を即検知', '#d97706')}
            ${drawKpiBox(0, 88, 112, 74, '電極ピッチ', '150 μm', 'ENIG金めっき櫛', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '励起方式', 'AC 1 kHz', '電解腐食ゼロ', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, '配置位置と安全インターロック', '#713f12', '#fefce8')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#713f12">• DB39ペルチェ冷却板ドレン直下へ設置</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#854d0e">• 庫内床へ垂れる前にTECを自動停止</text>
          </g>
        `,
        cards: [
          { label: '高感度電極', line1: '150 μmピッチ ENIG金めっき櫛歯', line2: 'DB39ペルチェ受け直下キャッチ配置' },
          { label: '無腐食センシング', line1: 'AC 1 kHz ±0.5V交流励起比較IC', line2: 'DC電解腐食ゼロで繰り返し使用可能' },
          { label: 'カメラを守る意味', line1: 'たった1滴の異常結露も0.2秒で警報', line2: '庫内水濡れ事故を物理的に過去化' },
        ],
      });

    case 'db_pem_mno2_ozone_catalyst':
      return wrapDryboxHdSvg({
        badge: 'DB107',
        stepTag: '2025年OMS-2触媒',
        title: 'PEMアノード α-MnO₂／Laドープ 触媒オゾン（O₃→O₂）分解網',
        analogy: '電気分解でわずかに生まれるゴム劣化の敵「オゾン」を、電力ゼロで純粋な酸素へ戻すナノ触媒網',
        accent: '#0f766e',
        accentSoft: '#ccfbf1',
        body: `
          <!-- Left: Catalytic Ozone Decomposition Reaction across α-MnO2 Mesh -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">PEMアノード副生オゾン（O₃）の常温・無電力触媒分解メカニズム</text>
            <!-- Left: PEM Anode Output (trace O3) -->
            <rect x="18" y="48" width="108" height="148" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.5"/>
            <text x="72" y="74" text-anchor="middle" font-size="9.2" font-weight="900" fill="#9f1239">PEMアノード側</text>
            <text x="72" y="94" text-anchor="middle" font-size="8.2" font-weight="700" fill="#be123c">DB33/34 副反応</text>
            <circle cx="52" cy="128" r="14" fill="#f43f5e"/>
            <text x="52" y="132" text-anchor="middle" font-size="9.0" font-weight="900" fill="#ffffff">O₃</text>
            <circle cx="90" cy="152" r="14" fill="#f43f5e"/>
            <text x="90" y="156" text-anchor="middle" font-size="9.0" font-weight="900" fill="#ffffff">O₃</text>
            <text x="72" y="184" text-anchor="middle" font-size="7.8" font-weight="800" fill="#881337">微量オゾン発生</text>
            <!-- Arrow into Catalyst Mesh -->
            <line x1="128" y1="122" x2="154" y2="122" stroke="#e11d48" stroke-width="2.6" marker-end="url(#db107-arrRed)"/>
            <!-- Center: La-doped α-MnO2 (OMS-2) Honeycomb Catalyst Mesh -->
            <rect x="158" y="44" width="108" height="156" rx="8" fill="#0f766e" stroke="#134e4a" stroke-width="1.8"/>
            <text x="212" y="68" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">La-α-MnO₂</text>
            <text x="212" y="84" text-anchor="middle" font-size="8.0" font-weight="700" fill="#99f6e4">八面体分子篩 OMS-2</text>
            <!-- Honeycomb lattice lines -->
            <line x1="172" y1="98" x2="252" y2="98" stroke="#5eead4" stroke-width="1.3"/>
            <line x1="172" y1="122" x2="252" y2="122" stroke="#5eead4" stroke-width="1.3"/>
            <line x1="172" y1="146" x2="252" y2="146" stroke="#5eead4" stroke-width="1.3"/>
            <line x1="192" y1="92" x2="192" y2="162" stroke="#5eead4" stroke-width="1.3"/>
            <line x1="232" y1="92" x2="232" y2="162" stroke="#5eead4" stroke-width="1.3"/>
            <text x="212" y="178" text-anchor="middle" font-size="8.2" font-weight="900" fill="#fde047">酸素空孔サイト</text>
            <text x="212" y="192" text-anchor="middle" font-size="7.8" font-weight="700" fill="#ccfbf1">2 O₃ → 3 O₂</text>
            <!-- Arrow to Clean Chamber -->
            <line x1="268" y1="122" x2="294" y2="122" stroke="#16a34a" stroke-width="2.6" marker-end="url(#db107-arrGreen)"/>
            <!-- Right: Pure O2 to Camera Chamber -->
            <rect x="298" y="48" width="108" height="148" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
            <text x="352" y="74" text-anchor="middle" font-size="9.2" font-weight="900" fill="#14532d">庫内カメラ側</text>
            <circle cx="332" cy="116" r="13" fill="#16a34a"/>
            <text x="332" y="120" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">O₂</text>
            <circle cx="372" cy="128" r="13" fill="#16a34a"/>
            <text x="372" y="132" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">O₂</text>
            <circle cx="348" cy="156" r="13" fill="#16a34a"/>
            <text x="348" y="160" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">O₂</text>
            <text x="352" y="185" text-anchor="middle" font-size="8.0" font-weight="900" fill="#15803d">出口 O₃ &lt; 1 ppb</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">2025年最新OMS-2触媒：吸着飽和せず常温0Wで10年連続オゾン無害化</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '常温オゾン分解効率', '99.2%+', '40% RH 動作・出口 &lt; 1 ppb', '#0f766e')}
            ${drawKpiBox(0, 88, 112, 74, '消費電力', '0 W', '完全常温触媒反応', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '触媒技術', 'La-OMS-2', '2025年最新論文', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, 'なぜカメラにオゾン厳禁？', '#9f1239', '#fff1f2')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#9f1239">• O₃はグリップゴム二重結合を切断</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#be123c">• 白化・硬化ひび割れを触媒網で根絶</text>
          </g>
        `,
        cards: [
          { label: '2025年ナノ触媒', line1: 'Laドープ八面体分子篩 α-MnO₂網', line2: '酸素空孔サイトでO–O結合を即解離' },
          { label: '物理的メリット', line1: '0 W常温反応・活性炭と違い飽和極少', line2: '出口オゾン濃度1 ppb未満へ抑制' },
          { label: 'カメラを守る意味', line1: 'グリップ・ズーム環ゴムの劣化ゼロ', line2: '防塵防滴パッキンの弾力を10年維持' },
        ],
      });

    case 'db_pem_carbon_gdl_mpl':
      return wrapDryboxHdSvg({
        badge: 'DB108',
        stepTag: '2026年 GDL+MPL',
        title: 'PEMカソード撥水PTFEカーボン拡散層（GDL）＋ 微細孔層（MPL）',
        analogy: '電気分解膜へ水蒸気を均一に届けつつ、溜まった水玉だけ撥水力で弾き出す2層カーボンろ紙',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Layered PEM + MPL + PTFE Carbon GDL + Kapton Sub-Gasket Cross-Section -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">PEM膜〜MPL（超撥水微細孔）〜GDL（レーザー排水溝）積層断面</text>
            <!-- Layer 1: PEM Nafion Membrane (Left) -->
            <rect x="30" y="44" width="32" height="156" rx="3" fill="url(#db108-pem)" stroke="#0284c7" stroke-width="1.4"/>
            <text x="46" y="122" text-anchor="middle" font-size="8.2" font-weight="900" fill="#ffffff" transform="rotate(-90 46 122)">PEM膜 DB33</text>
            <!-- Layer 2: Pt/Ir Catalyst -->
            <rect x="62" y="54" width="14" height="136" fill="#d97706"/>
            <!-- Layer 3: MPL (40um sub-micron hydrophobic PTFE layer) -->
            <rect x="76" y="54" width="22" height="136" fill="#f8fafc" stroke="#0ea5e9" stroke-width="1.4"/>
            <text x="87" y="122" text-anchor="middle" font-size="8.0" font-weight="900" fill="#0369a1" transform="rotate(-90 87 122)">MPL 40μm</text>
            <!-- Layer 4: PTFE Carbon Fiber Paper GDL (220um) with Laser Micro-Channels -->
            <rect x="98" y="54" width="46" height="136" fill="#1e293b" stroke="#0f172a" stroke-width="1.4"/>
            <text x="121" y="122" text-anchor="middle" font-size="8.2" font-weight="900" fill="#e2e8f0" transform="rotate(-90 121 122)">GDL 220μm</text>
            <!-- Kapton Sub-Gasket Top & Bottom Frame -->
            <rect x="62" y="40" width="82" height="14" rx="2" fill="#d97706" stroke="#78350f"/>
            <rect x="62" y="190" width="82" height="14" rx="2" fill="#d97706" stroke="#78350f"/>
            <!-- Water Expulsion & Electron Flow Arrows -->
            <line x1="146" y1="88" x2="196" y2="88" stroke="#0284c7" stroke-width="2.4" marker-end="url(#db108-arrBlue)"/>
            <line x1="146" y1="156" x2="196" y2="156" stroke="#0284c7" stroke-width="2.4" marker-end="url(#db108-arrBlue)"/>
            <!-- Pins -->
            ${drawPin(87, 74, 218, 66, 1, '超撥水MPL（50〜200nm孔）', '毛細管圧で液水を外へ圧送', '#0284c7', 'start')}
            ${drawPin(121, 122, 218, 122, 2, 'レーザー排水溝付きGDL', '細孔水詰まり(フラッディング)0', '#334155', 'start')}
            ${drawPin(112, 197, 218, 178, 3, 'カプトン保護サブガスケット', 'カーボン毛羽の膜貫通短絡防止', '#d97706', 'start')}
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">2026年Catalysts誌最新知見：水蒸気・液水排水・電子伝導の3経路を非干渉分離</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '梅雨高湿時 除湿レート向上', '+22%', '水フラッディング細孔閉塞を排除', '#0284c7')}
            ${drawKpiBox(0, 88, 112, 74, 'PTFE撥水角', '約 138°', '15 wt% PTFE含浸', '#0ea5e9')}
            ${drawKpiBox(122, 88, 112, 74, '膜短絡防止', '50 μm', 'カプトン縁保護', '#d97706')}
            ${drawCompareFrame(0, 172, 234, 82, 'MPL＋レーザー溝の効果', '#0c4a6e', '#f0f9ff')}
            ${drawPill(12, 204, 210, 'MPL有り：水滴を即排出し効率維持', true)}
            ${drawPill(12, 229, 210, '無し：液水が孔を塞ぎ除湿が停滞', false)}
          </g>
        `,
        cards: [
          { label: '2026年多層拡散材', line1: 'PTFE撥水カーボンペーパー（GDL）', line2: 'サブミクロン超撥水微細孔層（MPL）' },
          { label: '物理的メリット', line1: '毛細管圧勾配で液水フラッディング防止', line2: 'カプトン枠が極薄Nafion膜の短絡阻止' },
          { label: 'カメラを守る意味', line1: '梅雨の連続高湿でも除湿パワー低下0', line2: 'PEMセルの長寿命と省エネを両立' },
        ],
      });

    case 'db_mof_rotor_gear_motor':
      return wrapDryboxHdSvg({
        badge: 'DB109',
        stepTag: '0.5 rpm / &lt;10 dBA',
        title: '0.5 rpm 超静音ブラシレス遊星DCモーター ＋ 光学原点センサー',
        analogy: '除湿ホイールを「2分で1周」の超スロー無音で回し、噛み込み異常も光センサーで見張る心臓部',
        accent: '#475569',
        accentSoft: '#e2e8f0',
        body: `
          <!-- Left: BLDC + Planetary Gearbox + Optical Home-Index Interrupter -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">可変速BLDC遊星駆動トレーン ＆ 光学スロット回転ロック監視図</text>
            <!-- Stage 1: Brushless DC Motor -->
            <rect x="20" y="76" width="84" height="72" rx="8" fill="url(#db109-dark)" stroke="#0f172a" stroke-width="1.5"/>
            <text x="62" y="106" text-anchor="middle" font-size="9.0" font-weight="900" fill="#ffffff">BLDC</text>
            <text x="62" y="124" text-anchor="middle" font-size="7.8" font-weight="700" fill="#94a3b8">ブラシレス</text>
            <text x="62" y="138" text-anchor="middle" font-size="7.6" font-weight="700" fill="#34d399">6万時間寿命</text>
            <!-- Stage 2: Multi-stage Planetary Gearbox -->
            <rect x="106" y="72" width="76" height="80" rx="6" fill="url(#db109-steel)" stroke="#475569" stroke-width="1.5"/>
            <text x="144" y="106" text-anchor="middle" font-size="8.6" font-weight="900" fill="#0f172a">多段遊星</text>
            <text x="144" y="122" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0284c7">減速機</text>
            <text x="144" y="138" text-anchor="middle" font-size="7.6" font-weight="700" fill="#334155">0.3〜0.8 rpm</text>
            <!-- Stage 3: POM Low-Noise Pinion -> Zr-MOF Rotor Rim -->
            <line x1="182" y1="112" x2="210" y2="112" stroke="#475569" stroke-width="5"/>
            <circle cx="228" cy="112" r="20" fill="#f8fafc" stroke="#0284c7" stroke-width="2.2" stroke-dasharray="5 3"/>
            <text x="228" y="115" text-anchor="middle" font-size="8.0" font-weight="900" fill="#0c4a6e">POM</text>
            <!-- Zr-MOF Rotor Wheel Segment -->
            <circle cx="332" cy="112" r="66" fill="url(#db109-mof)" fill-opacity="0.22" stroke="#059669" stroke-width="3.2"/>
            <text x="332" y="106" text-anchor="middle" font-size="9.4" font-weight="900" fill="#065f46">Zr-MOFローター</text>
            <text x="332" y="124" text-anchor="middle" font-size="8.6" font-weight="800" fill="#047857">DB35（0.5 rpm）</text>
            <!-- Optical Slotted Encoder & U-Sensor -->
            <rect x="206" y="156" width="46" height="30" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.4"/>
            <text x="229" y="174" text-anchor="middle" font-size="7.6" font-weight="900" fill="#ffffff">IR光検知</text>
            <line x1="229" y1="132" x2="229" y2="156" stroke="#e11d48" stroke-width="1.8" stroke-dasharray="3 2"/>
            <!-- Pins -->
            ${drawPin(229, 178, 108, 200, 1, '光学ホーム原点監視', 'ロック異常30秒でヒーター停止', '#e11d48', 'middle')}
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">2025年MDPI Processes論文準拠：湿度負荷連動の最適角速度で消費電力−25%</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '定格最適ローター速度', '0.5 rpm', '120秒/周（0.3〜0.8可変）', '#059669')}
            ${drawKpiBox(0, 88, 112, 74, '運転騒音', '&lt; 10 dBA', '暗騒音以下・無音', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '連続寿命', '60,000h+', 'ブラシ摩耗ゼロ', '#334155')}
            ${drawCompareFrame(0, 172, 234, 82, 'なぜ光学回転監視が重要？', '#9f1239', '#fff1f2')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#9f1239">• 万一の固着停止時は1点加熱の危険</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#be123c">• 毎周パルス監視でPTC(DB37)即保護</text>
          </g>
        `,
        cards: [
          { label: '静音駆動機構', line1: 'BLDCモーター＋多段遊星減速機', line2: '潤滑POM低騒音ヘリカルピニオン' },
          { label: '物理的メリット', line1: '湿度負荷連動PWM変速で省エネ25%', line2: '赤外線原点監視でローターロック検知' },
          { label: 'カメラを守る意味', line1: '寝室でも気にならない10 dBA無音', line2: '固着過熱を防ぎ10年安全連続稼働' },
        ],
      });

    case 'db_mof_rotor_sector_seal':
      return wrapDryboxHdSvg({
        badge: 'DB110',
        stepTag: '270°吸着 / 90°再生',
        title: '低摩擦PTFEフェルト 270°吸着／90°再生 セクター仕切りシール',
        analogy: '回転除湿ホイールの「冷たい吸湿ゾーン」と「105℃の熱い排気ゾーン」をピタッと分ける耐熱ワイパー',
        accent: '#059669',
        accentSoft: '#d1fae5',
        body: `
          <!-- Left: 270° Cold Adsorption vs 90° Hot 105°C Regeneration Wheel Seal Diagram -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">Zr-MOF回転ローター 正面セクター分割 ＆ 弾性PTFEワイパー構造</text>
            <!-- Wheel Centered at (142, 134), r=76 -->
            <!-- 270 deg Cold Adsorption Sector (Blue/Emerald) -->
            <circle cx="142" cy="134" r="76" fill="#d1fae5" stroke="#059669" stroke-width="2.2"/>
            <!-- 90 deg Top Hot Regeneration Sector (Red/Orange wedge: -135 deg to -45 deg) -->
            <path d="M 142 134 L 88 80 A 76 76 0 0 1 196 80 Z" fill="#fee2e2" stroke="#dc2626" stroke-width="2.0"/>
            <!-- Outer Circumferential PTFE Perimeter Seal Ring -->
            <circle cx="142" cy="134" r="79" fill="none" stroke="#475569" stroke-width="4.5" stroke-dasharray="10 4"/>
            <!-- Two Radial Silicone-Backed PTFE Wiper Blades -->
            <line x1="142" y1="134" x2="88" y2="80" stroke="#ffffff" stroke-width="6.5" stroke-linecap="round"/>
            <line x1="142" y1="134" x2="88" y2="80" stroke="#dc2626" stroke-width="2.4" stroke-linecap="round"/>
            <line x1="142" y1="134" x2="196" y2="80" stroke="#ffffff" stroke-width="6.5" stroke-linecap="round"/>
            <line x1="142" y1="134" x2="196" y2="80" stroke="#dc2626" stroke-width="2.4" stroke-linecap="round"/>
            <!-- Central PTFE Hub Seal -->
            <circle cx="142" cy="134" r="14" fill="#f8fafc" stroke="#0f172a" stroke-width="2"/>
            <text x="142" y="84" text-anchor="middle" font-size="8.6" font-weight="900" fill="#b91c1c">90°再生</text>
            <text x="142" y="96" text-anchor="middle" font-size="7.8" font-weight="800" fill="#dc2626">105°C熱風</text>
            <text x="142" y="176" text-anchor="middle" font-size="9.4" font-weight="900" fill="#065f46">270°冷間吸着</text>
            <text x="142" y="191" text-anchor="middle" font-size="7.8" font-weight="700" fill="#047857">庫内湿気キャッチ</text>
            <!-- Right Side Pins -->
            ${drawPin(178, 98, 250, 74, 1, '放射PTFEワイパー羽根', '105°C熱気の庫内逆流封止', '#dc2626', 'start')}
            ${drawPin(216, 134, 250, 128, 2, '外周PTFEリムシール', '縁からのバイパス漏れ0%', '#475569', 'start')}
            ${drawPin(150, 142, 250, 182, 3, 'シリコーン弾性裏打ち', '10年摩耗も一定面圧追従', '#059669', 'start')}
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">クロスリーク1.2%未満に封じ込め、除湿再生中も庫内温度を常温±0.3°Cに維持</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'セクター間クロスリーク', '&lt; 1.2%', '熱・湿気キャリーオーバー極小化', '#059669')}
            ${drawKpiBox(0, 88, 112, 74, '動摩擦係数', 'μ ≈ 0.08', '純PTFEフェルト', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '連続耐熱', '260°C', '105°C再生に大余裕', '#dc2626')}
            ${drawCompareFrame(0, 172, 234, 82, 'シール品質が左右する庫内温度', '#065f46', '#ecfdf5')}
            ${drawPill(12, 204, 210, '弾性PTFEシール：庫内温度±0.3°C', true)}
            ${drawPill(12, 229, 210, '隙間漏れ有り：熱風流入で温度上昇', false)}
          </g>
        `,
        cards: [
          { label: '3部位シール構造', line1: '放射ワイパー＋外周リム＋中心ハブ', line2: '純PTFEフェルト＋耐熱シリコーン背材' },
          { label: '物理的メリット', line1: '動摩擦0.08でモーター負荷を極小化', line2: '10年260万回転の摩耗へ自動追従' },
          { label: 'カメラを守る意味', line1: '105°C再生熱気の庫内漏れ込みゼロ', line2: 'レンズグリスに優しい常温除湿維持' },
        ],
      });

    default:
      return null;
  }
}
