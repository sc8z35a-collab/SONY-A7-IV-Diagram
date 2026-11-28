//@FLOW_MAP|file=src/assemblies/welcome/welcomeGlyphWaveDParts.ts|unit=welcome|lines=478|exports=WELCOME_GLYPH_WAVE_D_DEFS,buildWelcomeGlyphWaveDParts
import * as THREE from 'three';
import { CadPart } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import { scaleRadialSegmentsForQuality as qRadialSegs } from '../../core/geometry_quality';
import { CX_KO, CX_SO, CX_U, CX_YO, qualityLevel } from './welcomeGeometry';
import { WelcomeExpansionPartDef, buildExpansionCadParts } from './welcomeGlyphPrecisionParts';

// ============================================================================
// Wave D Glyph Expansion Parts (8 Parts: W406 - W413, +2 per glyph -> 62p each!)
//   glyph_yo: +2 (W406 - W407) -> 60 + 2 = 62
//   glyph_u : +2 (W408 - W409) -> 60 + 2 = 62
//   glyph_ko: +2 (W410 - W411) -> 60 + 2 = 62
//   glyph_so: +2 (W412 - W413) -> 60 + 2 = 62
// ============================================================================
export const WELCOME_GLYPH_WAVE_D_DEFS: readonly WelcomeExpansionPartDef[] = [
  // --- 「よ」 Wave D (+2: W406 - W407) ---
  {
    id: 'welcome-yo-circular-polarizer-film',
    code: 'W406',
    order: 406,
    groupKey: 'glyph_yo',
    title: 'W406. 「よ」前面外光反射抑圧 Nitto NPF™ 円偏光(直線偏光+λ/4位相差)コントラスト光学フィルム',
    subtitle: 'Glyph "よ" Ambient Reflection Suppressing Nitto NPF™ Circular Polarizer (Linear + λ/4 QWP) Film',
    category: '「よ」モジュール / 円偏光コントラスト向上',
    swatchColor: '#3b6796',
    assembledPos: [CX_YO, 4, 0],
    explodeOffset: [-27.5, 8, 40],
    plainAnalogy: '明るい美術館で外光が文字の内部で反射して白っぽくなるのを防ぐ「光の片道トラップ」フィルムです。入った外光は内部反射で回転方向が逆になり、出るときに98%以上ブロックされます。',
    summary: '「よ」主幹前面光学域（X=+0.8, Y=+2.5, Z=+4.16）へ積層された Nitto Denko NPF™ 円偏光光学フィルム（ヨウ素系直線偏光子＋広帯域 λ/4 位相差板）。外光鏡面反射を 98% 超吸収し明室コントラスト比を 10 倍以上改善します。',
    opticsAndPhysics: [
      '外光は往路で直線偏光→λ/4 板で右円偏光へ変換され、内部アルミ MCPCB/反射面で鏡面反射すると左円偏光へ反転。復路で λ/4 板を再通過すると直線偏光軸と 90°直交するため完全吸収される。',
      '非偏光LED発光はそのまま透過するため、直射照明下の展示室でも漆黒の非発光部と鮮烈な立体発光を両立。',
    ],
    formula: {
      expression: 'R_amb = R_surf + T² · R_int · cos²(90°) ≈ R_surf  (内部鏡面反射抑圧 > 98%, コントラスト 10×)',
      description: '直線偏光＋λ/4 位相差板の片道光学トラップにより内部鏡面反射を 98% 超消去。',
    },
    nextGenInnovation: 'ハイエンド OLED ディスプレイ反射防止標準 Nitto NPF™ 円偏光スタックの立体文字導入。',
    specs: [
      { label: '光学フィルム', value: 'Nitto Denko NPF™ 円偏光積層膜 (直線偏光子 + 広帯域 λ/4 QWP)' },
      { label: '反射抑圧', value: '内部鏡面反射 > 98% 吸収 (明室コントラスト 10×)' },
      { label: '配置位置', value: 'YO_STEM 前面光学域 (X=+0.8, Y=+2.5, Z=+4.16)' },
    ],
    references: [
      'Nitto Denko Corp., "NPF™ Polarizing & Circular Polarizing Optical Films for OLED/Display Contrast Enhancement"',
      'Hecht, E., "Optics", 5th Ed., Ch. 8 (Circular Polarizers & Quarter-Wave Retardation Glare Traps)',
      'SID Display Metrology Standard (IDMS) Ambient Contrast Ratio (ACR) Measurement Methodology',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const film = new THREE.Mesh(new THREE.BoxGeometry(3.8, 5.6, 0.06), m.lcdPolarizerFilm);
      film.position.set(0.8, 2.5, 4.15);
      g.add(film);
      if (ql >= 1) {
        const qwp = new THREE.Mesh(new THREE.BoxGeometry(3.5, 5.3, 0.04), m.nanoArIridescent);
        qwp.position.set(0.8, 2.5, 4.19);
        g.add(qwp);
      }
      if (ql >= 2) {
        const frameL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 5.6, 0.08), m.matteBlackAnodized);
        frameL.position.set(-1.18, 2.5, 4.16);
        const frameR = frameL.clone();
        frameR.position.set(2.78, 2.5, 4.16);
        g.add(frameL, frameR);
      }
      return g;
    },
  },
  {
    id: 'welcome-yo-helicoil-m2-inserts',
    code: 'W407',
    order: 407,
    groupKey: 'glyph_yo',
    title: 'W407. 「よ」主骨格A6061ねじ座 Heli-Coil® DIN 8140 / NASM21209 焼付防止SUS304ワイヤーインサート群',
    subtitle: 'Glyph "よ" A6061 Chassis Tapped Bosses Heli-Coil® DIN 8140 / NASM21209 SUS304 Wire Thread Inserts',
    category: '「よ」モジュール / 航空規格ねじ座補強',
    swatchColor: '#98a2b0',
    assembledPos: [CX_YO, 4, 0],
    explodeOffset: [-28, 6, -34],
    plainAnalogy: 'アルミのネジ穴へ硬いステンレスボルトを何度も締め直すとネジ山が削れてしまいます。菱形断面の高張力ステンレスコイルを埋め込み、航空機並みの3倍強度と焼付防止を実現します。',
    summary: '「よ」主骨格 A6061-T6 の主要4締結ねじ座（W26/W34 対応内部ボス、Z=-5.84）へ圧入された Böllhoff HELICOIL® Plus（DIN 8140 / NASM21209, M2×0.4 2D, 18-8 SUS304 菱形断面＋ドライフィルム MoS₂ 潤滑）焼付防止ワイヤーねじインサート群。',
    opticsAndPhysics: [
      '冷間圧延菱形断面 SUS304 ワイヤーコイルがアルミ母材のピッチ・フランク角誤差を弾性吸収し、荷重を全ねじ山へ均等分散して引き抜き剪断強度を約 3 倍へ増強。',
      'NASM21209 ドライフィルム MoS₂ 潤滑被膜により、SUS ボルト（W26/W34）との同種金属カジリ（galling）を 1,000 回着脱でもゼロ化。',
    ],
    formula: {
      expression: 'F_pullout(HELICOIL 2D) ≈ 3.0 · F_tap(A6061),   σ_t(wire) > 1,400 MPa (DIN 8140 / NASM21209)',
      description: '航空規格 NASM21209 ワイヤーインサートによりアルミ母材 M2 ねじ座の耐摩耗・剪断強度を 3 倍化。',
    },
    nextGenInnovation: '航空宇宙規格 NASM21209 / DIN 8140 ドライ潤滑 2D ワイヤーねじインサート。',
    specs: [
      { label: '準拠規格', value: 'Böllhoff HELICOIL® Plus / DIN 8140 / NASM21209 (M2×0.4 2D)' },
      { label: '線材・被膜', value: '18-8 SUS304 菱形冷間圧延線 (>1400 MPa) + MoS₂ 焼付防止膜' },
      { label: '配置点数', value: '「よ」主骨格・横枝・ループ4締結座 (Z=-5.84 mm)' },
    ],
    references: [
      'DIN 8140-1:2018 Wire Thread Inserts for ISO Metric Screw Threads — Dimensions & Technical Delivery Conditions',
      'SAE / DoD NASM21209 (formerly MS21209) Screw Thread Inserts, Coarse & Fine Thread, Corrosion-Resistant Steel',
      'Böllhoff GmbH, "HELICOIL® Plus Engineering Handbook — Fatigue Strength & Anti-Galling in Aluminum Alloys"',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(16, 12));
      const coilGeo = new THREE.TorusGeometry(0.68, 0.14, 6, seg);
      const bossGeo = new THREE.CylinderGeometry(0.86, 0.86, 0.16, seg).rotateX(Math.PI * 0.5);
      const pts: ReadonlyArray<readonly [number, number]> = [
        [0.6, 13.0],
        [13.8, 12.0],
        [-6.2, -3.2],
        [6.2, -5.2],
      ];
      for (const [px, py] of pts) {
        const b = new THREE.Mesh(bossGeo, m.hardenedSteelHrc60);
        b.position.set(px, py, -5.74);
        const c1 = new THREE.Mesh(coilGeo, m.stainlessMachined);
        c1.position.set(px, py, -5.88);
        g.add(b, c1);
        if (ql >= 1) {
          const c2 = new THREE.Mesh(coilGeo, m.sintered316L);
          c2.position.set(px, py, -5.98);
          g.add(c2);
        }
      }
      return g;
    },
  },

  // --- 「う」 Wave D (+2: W408 - W409) ---
  {
    id: 'welcome-u-luminit-lsd-diffuser',
    code: 'W408',
    order: 408,
    groupKey: 'glyph_u',
    title: 'W408. 「う」主弧〜上部点 Luminit LSD® 楕円ホログラフィック・マイクロ配光ディフューザ膜 (92%透過)',
    subtitle: 'Glyph "う" Main Arc Luminit LSD® Elliptical Holographic Light Shaping Diffuser Film (92% Transmittance)',
    category: '「う」モジュール / ホログラフィック楕円配光',
    swatchColor: '#e2f1ff',
    assembledPos: [CX_U, 4, 0],
    explodeOffset: [-9, 8, 40],
    plainAnalogy: '通常のすりガラス拡散板は光が後ろへ跳ね返って暗くなりますが、非周期ホログラム微細レンズ構造なら92%もの光を通しつつ、左右は広く上下は絞った美しい配光を作り出します。',
    summary: '「う」主弧前面光学域（X=-5.4, Y=+12.2, Z=+4.18）へ配した Luminit Light Shaping Diffuser®（LSD®）非周期ホログラフィック表面レリーフ配光フィルム（透過率 85–92%, 300–1500 nm, 水平 60°×垂直 20°楕円 FWHM 配光）。',
    opticsAndPhysics: [
      '体積散乱粒子を使わず表面ランダム化マイクロレリーフ構造の純粋屈折のみで光を整形するため、後方散乱損失を劇的に抑えて透過率最大 92%（透明ポリカーボネート 89% 超）を達成。',
      '展示室床・天井方向への無駄な光漏れを抑えつつ鑑賞者目線方向（水平 60°）へ輝度を集中させ、湾曲「う」主弧のホットスポットを完全平滑化。',
    ],
    formula: {
      expression: 'T_LSD = 92% (vs Bulk Diffuser 65–72%),   FWHM = 60°(H) × 20°(V) 楕円ホログラフィック配光',
      description: 'Luminit LSD® 非周期表面レリーフ光学により 92% 高透過と楕円配光制御を両立。',
    },
    nextGenInnovation: '車載 LiDAR・高級光学計器標準の Luminit LSD® ホログラフィック表面レリーフ配光膜。',
    specs: [
      { label: '光学膜', value: 'Luminit Light Shaping Diffuser® (LSD®) ホログラフィック膜' },
      { label: '透過率・配光', value: '透過率 85–92% (300–1500 nm) / 楕円 FWHM 60°×20°' },
      { label: '配置位置', value: 'U_ARC 左上前面光学縁 (X=-5.4, Y=+12.2, Z=+4.18)' },
    ],
    references: [
      'Luminit LLC, "Light Shaping Diffusers® (LSD®) Technical Data Sheet — Holographic Surface Relief Micro-Optics"',
      'Petersen, J. et al., "High-Efficiency Beam Homogenization Using Non-Periodic Holographic Diffusers", Proc. SPIE',
      'ISO 13696 Optics and Photonics — Measurement of Total Scattering by Optical Components',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const h = new THREE.Group();
      h.position.set(-5.4, 12.2, 4.18);
      h.rotation.z = 0.36;
      const film = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.4, 0.06), m.lcdDbefIridescent);
      h.add(film);
      if (ql >= 1) {
        const microGeo = new THREE.BoxGeometry(0.12, 1.25, 0.04);
        for (let i = -2; i <= 2; i++) {
          const r = new THREE.Mesh(microGeo, m.loweGlassClear);
          r.position.set(i * 0.56, 0, 0.04);
          h.add(r);
        }
      }
      g.add(h);
      return g;
    },
  },
  {
    id: 'welcome-u-index-matching-gel-pad',
    code: 'W409',
    order: 409,
    groupKey: 'glyph_u',
    title: 'W409. 「う」石英支柱(W79)両端光学界面 Nye SmartGel® OCK-451 (n=1.46) 屈折率整合光結合クッション対',
    subtitle: 'Glyph "う" Quartz Pillar Ends Nye SmartGel® OCK-451 (n=1.46) Refractive Index-Matching Coupling Pads',
    category: '「う」モジュール / 屈折率整合光結合',
    swatchColor: '#a5f3fc',
    assembledPos: [CX_U, 4, 0],
    explodeOffset: [-6, 18, -34],
    plainAnalogy: '透明な石英ガラスの端にわずかな空気の隙間があると光が反射してにじみます。石英ガラスとぴったり同じ屈折率（n=1.46）の光学シリコーンゲルを挟むことで、境目の反射をほぼゼロに消します。',
    summary: '溶融石英支柱（W79, n_d = 1.4585）両端の光学界面部（X=-2.5, Y=+14.8 / X=+3.5, Y=+17.9, Z=-5.78）へ装填された Nye Lubricants SmartGel® OCK-451 光学屈折率整合シリコーンゲル結合パッド対（n_D = 1.46）。フレネル反射損失を -14 dB → < -40 dB へ低減します。',
    opticsAndPhysics: [
      '空気ギャップ（n = 1.0）では石英端面ごとに R = ((1.458-1)/(1.458+1))² = 3.47%（往復 2 界面計 ~7%, -14.6 dB）のフレネル反射迷光が発生するが、n = 1.460 の SmartGel® OCK-451 で置換すると R < 0.0001%（-60 dB 級）へ激減。',
      '非流動性チキソトロピー・シリコーンゲルは熱サイクル下でも気泡侵入・流出を起こさず長期光結合を保持。',
    ],
    formula: {
      expression: 'R = ((n_SiO2 - n_gel)/(n_SiO2 + n_gel))² = ((1.4585 - 1.460)/(2.9185))² = 2.6×10⁻⁷ (< -40 dB Return Loss)',
      description: 'n = 1.46 屈折率整合ゲルにより石英端面のフレネル反射と迷光ハローを -14 dB から -40 dB 以下へ低減。',
    },
    nextGenInnovation: '光ファイバスプライス・高出力レーザー結晶結合標準の Nye SmartGel® OCK-451 導入。',
    specs: [
      { label: '整合ゲル', value: 'Nye Lubricants SmartGel® OCK-451 (n_D = 1.460 @ 589 nm)' },
      { label: '反射低減', value: 'フレネル反射損失 -14 dB → < -40 dB (非流動・低脱ガス)' },
      { label: '配置位置', value: '石英支柱 W79 上下光学界面対 (X=-2.5,Y=+14.8 / X=+3.5,Y=+17.9, Z=-5.78)' },
    ],
    references: [
      'Nye Lubricants (Fuchs), "SmartGel® OCK-451 Optical Index-Matching Silicone Gel Technical Data Sheet (n=1.46)"',
      'Corning HPFS® 7980 Fused Silica Refractive Index Dispersion (n_d = 1.45846) Data Sheet',
      'Hecht, E., "Optics", 5th Ed. (Fresnel Equations & Index-Matched Optical Interfaces)',
    ],
    diagramType: 'welcome_quartz_bridge',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const padGeo = new THREE.BoxGeometry(2.1, 1.5, 0.18);
      const ringGeo = new THREE.BoxGeometry(2.4, 1.8, 0.14);
      const pts: ReadonlyArray<readonly [number, number]> = [
        [-2.5, 14.8],
        [3.5, 17.9],
      ];
      for (const [px, py] of pts) {
        const frame = new THREE.Mesh(ringGeo, m.ptfeCleanWhite);
        frame.position.set(px, py, -5.74);
        const gel = new THREE.Mesh(padGeo, m.opticalCementClear);
        gel.position.set(px, py, -5.84);
        g.add(frame, gel);
        if (ql >= 1) {
          const cap = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.1, 0.06), m.loweGlassClear);
          cap.position.set(px, py, -5.92);
          g.add(cap);
        }
      }
      return g;
    },
  },

  // --- 「こ」 Wave D (+2: W410 - W411) ---
  {
    id: 'welcome-ko-3m-alcf-microlouver',
    code: 'W410',
    order: 410,
    groupKey: 'glyph_ko',
    title: 'W410. 「こ」上下水平画 昼光コントラスト向上 3M Vikuiti™ ALCF マイクロルーバー遮光制御フィルム対',
    subtitle: 'Glyph "こ" Horizontal Strokes Daylight-Contrast 3M Vikuiti™ ALCF Micro-Louver Control Film Pair',
    category: '「こ」モジュール / 天井グレア遮断ルーバー',
    swatchColor: '#1e242d',
    assembledPos: [CX_KO, 4, 0],
    explodeOffset: [10, 12, 42],
    plainAnalogy: '窓のブラインドを顕微鏡サイズまで縮小した特殊フィルムです。美術館の天井スポットライトが斜め上から照りつけてもブラインドの羽根が外光を遮り、正面の鑑賞者にはクッキリと発光文字を届けます。',
    summary: '水平2本の長いバー構造「こ」の上画（X=-0.5, Y=+15.5, Z=+4.06）および下画（X=-2.4, Y=-11.8, Z=+4.18）前面へ装着された 3M™ Advanced Light Control Film（Vikuiti™ ALCF-P）マイクロルーバー遮光制御フィルム対。天井高仰角グレアを物理遮蔽し正面コントラストを 4 倍改善します。',
    opticsAndPhysics: [
      'ピッチ 60–100 μm の黒色微細ルーバー（遮光角 ±30° 垂直）が、天井ダウンライト（仰角 45–70°）からの直達外光を幾何学的に遮断しつつ正面 0° 発光を高透過。',
      '水平面積が大きく上向き反射しやすい「こ」上下バーの白飛びを防止し、4 文字全体の視認コントラストを均質化。',
    ],
    formula: {
      expression: 'θ_cutoff = arctan(p_louver / h_louver) = ±30°(V)  ⇒  天井45°グレア遮蔽 99%, ACR × 4.0',
      description: '3M ALCF マイクロルーバー幾何遮光により天井ダウンライト反射を遮断し正面コントラストを 4 倍化。',
    },
    nextGenInnovation: '車載ヘッドアップ・航空計器標準の 3M Vikuiti™ ALCF-P マイクロルーバー光学制御膜。',
    specs: [
      { label: '光学膜', value: '3M™ Vikuiti™ Advanced Light Control Film (ALCF-P)' },
      { label: '遮光性能', value: '垂直視野カットオフ ±30° / 天井グレア遮断 / ACR 4×' },
      { label: '配置位置', value: 'KO_TOP (Z=+4.06) & KO_BOT (Z=+4.18) 前面光学縁対' },
    ],
    references: [
      '3M Optical Systems Division, "3M™ Advanced Light Control Film (ALCF-P) Technical Data Sheet"',
      'SAE ARP4256 / MIL-L-85762 Sunlight Readability & Micro-Louver Glare Control Standards',
      'ISO 9241-307 Electronic Visual Displays — Ambient Glare Mitigation & Contrast Ratio',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const strips: ReadonlyArray<readonly [number, number, number, number, number]> = [
        [-0.5, 15.5, 4.06, 15.2, 1.8],
        [-2.4, -11.8, 4.18, 9.4, 1.35],
      ];
      for (const [sx, sy, sz, sw, sh] of strips) {
        const base = new THREE.Mesh(new THREE.BoxGeometry(sw, sh, 0.06), m.lcdPolarizerFilm);
        base.position.set(sx, sy, sz);
        g.add(base);
        if (ql >= 1) {
          const slatGeo = new THREE.BoxGeometry(sw - 0.3, 0.08, 0.04);
          for (const f of [-0.34, -0.11, 0.11, 0.34]) {
            const slat = new THREE.Mesh(slatGeo, m.matteBlackAnodized);
            slat.position.set(sx, sy + sh * f, sz + 0.04);
            g.add(slat);
          }
        }
      }
      return g;
    },
  },
  {
    id: 'welcome-ko-pokayoke-key-pins',
    code: 'W411',
    order: 411,
    groupKey: 'glyph_ko',
    title: 'W411. 「こ」ドック誤装着防止 非対称ポカヨケ焼入SUS440C極性位置決めピン対',
    subtitle: 'Glyph "こ" Dock Anti-Misinsertion Asymmetric Poka-Yoke Hardened SUS440C Polarity Key Pin Pair',
    category: '「こ」モジュール / 非対称ポカヨケ誤挿防止',
    swatchColor: '#475569',
    assembledPos: [CX_KO, 4, 0],
    explodeOffset: [10, -10, -34],
    plainAnalogy: '4つの文字ドックはどれも同じアリ溝形状ですが、左右非対称の硬いステンレス製キーピンを2本配置することで、暗い会場でも「こ」を逆向きや別の場所へ絶対に誤装着できないようにします。',
    summary: '「こ」ダブテール背面座（Y=-15.2, 非対称オフセット X=-4.6 / +2.8, Z=-5.84）へ圧入された焼入マルテンサイト系 SUS440C（HRC 58, JIS B 1359 h6 公差）Ø1.5 mm 非対称ポカヨケ（Poka-Yoke）極性位置決めキーピン対。',
    opticsAndPhysics: [
      '中心対称軸から意図的に 1.8 mm ズラした非対称二ピン配置（-4.6 mm / +2.8 mm）により、180°逆挿入および他文字スロットへの誤挿入をポゴピン接触前に物理阻止。',
      'HRC 58 焼入 SUS440C 表面硬化と 30° リードイン面取りにより、10 万回着脱でも摩耗ガタ 5 μm 未満を維持。',
    ],
    formula: {
      expression: 'Δx_asym = |x_L| - |x_R| = 4.6 - 2.8 = 1.8 mm ≠ 0  ⇒  P_misinsertion = 0 (HRC 58, ISO h6)',
      description: '1.8 mm 非対称オフセット焼入ピン対により逆向き・他文字誤装着を機械的に完全禁止。',
    },
    nextGenInnovation: 'トヨタ生産方式ポカヨケ×JIS B 1359 h6 焼入キーピンによる無誤挿光学ドック結合。',
    specs: [
      { label: 'ピン材・硬度', value: 'SUS440C 焼入ステンレス (HRC 58 / JIS B 1359 h6 公差)' },
      { label: '非対称配置', value: 'Ø1.5 mm × 2本 (X = -4.6 mm / +2.8 mm, 非対称差 1.8 mm)' },
      { label: '配置位置', value: '「こ」ダブテール背面座 (Y=-15.2, Z=-5.84)' },
    ],
    references: [
      'Shingo, S. (1986), "Zero Quality Control: Source Inspection and the Poka-Yoke System", Productivity Press',
      'JIS B 1359 / ISO 8734 Hardened Parallel Dowel Pins (SUS440C Martensitic Stainless, HRC 58)',
      'ISO 286-2 Precision Limits and Fits (h6 Pin / H7 Receiver Keyway Mechanical Coding)',
    ],
    diagramType: 'welcome_dock_pogo',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(16, 12));
      const pinGeo = new THREE.CylinderGeometry(0.68, 0.74, 0.36, seg).rotateX(Math.PI * 0.5);
      const collarGeo = new THREE.CylinderGeometry(0.96, 0.96, 0.16, seg).rotateX(Math.PI * 0.5);
      for (const px of [-4.6, 2.8]) {
        const collar = new THREE.Mesh(collarGeo, m.brassPrecision);
        collar.position.set(px, -15.2, -5.72);
        const pin = new THREE.Mesh(pinGeo, m.hardenedSteelHrc60);
        pin.position.set(px, -15.2, -5.88);
        g.add(collar, pin);
        if (ql >= 1) {
          const tip = new THREE.Mesh(
            new THREE.CylinderGeometry(0.46, 0.68, 0.12, seg).rotateX(Math.PI * 0.5),
            m.stainlessMachined
          );
          tip.position.set(px, -15.2, -6.08);
          g.add(tip);
        }
      }
      return g;
    },
  },

  // --- 「そ」 Wave D (+2: W412 - W413) ---
  {
    id: 'welcome-so-acktar-velvet-trap',
    code: 'W412',
    order: 412,
    groupKey: 'glyph_so',
    title: 'W412. 「そ」Z字45°プリズム(W167/W168)周囲 宇宙規格 Acktar Metal Velvet™ 超黒体迷光トラップフォイル',
    subtitle: 'Glyph "そ" Z-Prism Perimeter Space-Qualified Acktar Metal Velvet™ 99.9% Ultra-Black Stray-Light Trap Foil',
    category: '「そ」モジュール / 宇宙規格99.9%超黒体遮光',
    swatchColor: '#090b0f',
    assembledPos: [CX_SO, 4, 0],
    explodeOffset: [28, 18, -34],
    plainAnalogy: '通常の黒塗装は斜めの光を5〜8%も反射して二重写り（ゴースト）を起こします。宇宙望遠鏡にも使われる「99.9%の光を飲み込む超黒色フォイル」で「そ」の急カーブの迷光を完全に吸い取ります。',
    summary: '「そ」Z 字上部バー背面（X∈[-9.6..-2.2] & [+2.4..+6.8], Y=+21.1, Z=-5.82）へ貼設された Acktar Metal Velvet™ 宇宙適格・完全無機超黒体アルミフォイル（EUV–FIR 鏡面吸収率 99.9%, 膜厚 3–8 μm, 脱ガス CVCM < 0.001, −250〜+350°C）。',
    opticsAndPhysics: [
      'ナノポーラス無機黒体樹枝状微細構造が斜め入射迷光を多重内部吸収し、黒アルマイト（R ≈ 5–8%）比で 50 倍以上低い鏡面反射率 R < 0.1% を実現。',
      'ASTM E595 適合の完全無機低脱ガス（CVCM < 0.001）のため、密閉 IP65 光学室内のサファイア窓や 45°プリズム表面を曇らせない。',
    ],
    formula: {
      expression: 'A_spec(Acktar Metal Velvet) = 99.9% (R < 0.1%, EUV–FIR),   CVCM < 0.001 (ASTM E595)',
      description: '宇宙規格 99.9% 超黒体迷光トラップにより Z 字 2 回急折返し部のゴースト二重発光を根絶。',
    },
    nextGenInnovation: '宇宙望遠鏡バッフル標準 Acktar Metal Velvet™（99.9% 吸収・無機低脱ガス）の文字光学室導入。',
    specs: [
      { label: '超黒体材', value: 'Acktar Metal Velvet™ 完全無機アルミフォイル (厚 3–8 μm)' },
      { label: '吸収率・脱ガス', value: '鏡面吸収率 99.9% (EUV–FIR) / CVCM < 0.001 / ISO 5' },
      { label: '配置位置', value: 'SO_Z1 背面キャビティ縁2分割 (Y=+21.1, Z=-5.82)' },
    ],
    references: [
      'Acktar Ltd., "Metal Velvet™ Ultra-Diffusive Wideband Light-Absorbing Foil Datasheet (99.9% Absorptance)"',
      'ASTM E595 Standard Test Method for Total Mass Loss and Collected Volatile Condensable Materials (CVCM < 0.001)',
      'Pompea, S. M. & Breault, R. P., "Black Surfaces for Optical Systems", Handbook of Optics, Vol. IV',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const panels: ReadonlyArray<readonly [number, number]> = [
        [-5.9, 7.0],
        [4.6, 4.2],
      ];
      for (const [px, pw] of panels) {
        const foil = new THREE.Mesh(new THREE.BoxGeometry(pw, 2.3, 0.16), m.flockedMatteBlack);
        foil.position.set(px, 21.1, -5.80);
        g.add(foil);
        if (ql >= 1) {
          const vaneGeo = new THREE.BoxGeometry(0.14, 2.1, 0.12);
          const steps = Math.max(3, Math.floor(pw / 1.4));
          for (let i = 0; i < steps; i++) {
            const v = new THREE.Mesh(vaneGeo, m.velvetFlockTrap);
            v.position.set(px - pw * 0.4 + (i / Math.max(1, steps - 1)) * pw * 0.8, 21.1, -5.92);
            g.add(v);
          }
        }
      }
      return g;
    },
  },
  {
    id: 'welcome-so-susumu-rg1005-ref',
    code: 'W413',
    order: 413,
    groupKey: 'glyph_so',
    title: 'W413. 「そ」16bit定電流基準 Susumu RG1005 (±0.05% / ±5 ppm/°C) 精密薄膜抵抗アレイ＆金テストパッド帯',
    subtitle: 'Glyph "そ" 16-bit Constant-Current Reference Susumu RG1005 (±0.05%, ±5 ppm/°C) Thin-Film Array & Gold Pads',
    category: '「そ」モジュール / 超精密定電流基準',
    swatchColor: '#e2b648',
    assembledPos: [CX_SO, 4, 0],
    explodeOffset: [29, 4, -34],
    plainAnalogy: '一番LED数が多く温まりやすい「そ」の明るさを決める「基準抵抗」に、温度が40℃変わっても0.02%しかズレない日本製超精密金属薄膜抵抗を採用し、4文字の明るさを完璧に揃えます。',
    summary: '「そ」椀部背面ドライバー近傍（X=-5.4, Y=+0.2, Z=-5.84）へ実装された Susumu RG1005 シリーズ金属薄膜精密チップ抵抗アレイ（0402, 公差 ±0.05%, TCR ±5 ppm/°C, 耐硫化・非磁性 NiCr）＆ 4 端子ケルビン金テストパッド帯。',
    opticsAndPhysics: [
      '一般厚膜抵抗（±1%, ±100 ppm/°C）では 40 K 昇温時に定電流値が 0.4% ドリフトするが、Susumu RG1005（±5 ppm/°C）なら 0.02%（200 ppm）へ 1/20 低減し 16-bit 調光階調の再現性を維持。',
      '非磁性 NiCr 薄膜＋耐硫化構造により、美術館空気中の微量硫化水素ガスによる長期抵抗値ドリフトと断線を防止。',
    ],
    formula: {
      expression: 'ΔI_LED / I_LED = -TCR · ΔT = ±5 ppm/°C × 40°C = ±0.02%  (Susumu RG1005 ±0.05%)',
      description: '±5 ppm/°C 精密金属薄膜基準抵抗アレイにより発熱最大の「そ」でも 4 文字間輝度差を 0.02% 以内へ固定。',
    },
    nextGenInnovation: '精密計測器標準 Susumu RG1005（±0.05% / ±5 ppm/°C）耐硫化薄膜基準抵抗アレイ。',
    specs: [
      { label: '基準抵抗', value: 'Susumu RG1005 シリーズ (0402 / ±0.05% / ±5 ppm/°C / -55〜+155°C)' },
      { label: '信頼性', value: '耐硫化構造 (ASTM B809) / 非磁性 / 4端子ケルビン金テストパッド' },
      { label: '配置位置', value: 'SO_BOWL 上部左背面 (X=-5.4, Y=+0.2, Z=-5.84)' },
    ],
    references: [
      'Susumu Co., Ltd. (Japan), "RG Series Precision Thin Film Chip Resistors Datasheet (±0.05%, ±5 ppm/°C)"',
      'ASTM B809 Standard Test Method for Porosity in Metallic Coatings by Humid Sulfur Vapor (Anti-Sulfuration)',
      'AEC-Q200 Stress Test Qualification for Passive Electronic Components (Thin-Film Stability)',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const pcb = new THREE.Mesh(new THREE.BoxGeometry(4.0, 2.4, 0.16), m.pcbEmeraldDark);
      pcb.position.set(-5.4, 0.2, -5.74);
      g.add(pcb);
      const resGeo = new THREE.BoxGeometry(0.66, 0.36, 0.14);
      const padGeo = new THREE.BoxGeometry(0.24, 0.38, 0.12);
      const count = ql >= 1 ? 4 : 2;
      for (let i = 0; i < count; i++) {
        const rx = -6.75 + i * 0.90;
        const r = new THREE.Mesh(resGeo, m.icEpoxy);
        r.position.set(rx, 0.55, -5.88);
        g.add(r);
        if (ql >= 1) {
          const kPad = new THREE.Mesh(padGeo, m.goldPlating);
          kPad.position.set(rx, -0.45, -5.86);
          g.add(kPad);
        }
      }
      return g;
    },
  },
];

export function buildWelcomeGlyphWaveDParts(mats: V2MaterialLibrary): CadPart[] {
  return buildExpansionCadParts(WELCOME_GLYPH_WAVE_D_DEFS, mats);
}
