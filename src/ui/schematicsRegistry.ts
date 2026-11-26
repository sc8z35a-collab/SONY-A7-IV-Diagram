import { PartExplanation } from '../assemblies/types';
import { renderUltraLensSchematicSvg } from './lensUltraSchematics';
import { renderPhase11BodySchematicSvg } from './phase11BodySchematics';
import { renderPhase11OpticsSchematicSvg } from './phase11OpticsSchematics';
import { renderPhase12MainBodySchematicSvg } from './phase12MainBodySchematics';
import { renderPhase12SubsystemsSchematicSvg } from './phase12SubsystemsSchematics';
import { renderPhase13MountShutterSchematicSvg } from './phase13MountShutterSchematics';
import { renderPhase13BodySchematicSvg } from './phase13BodySchematics';
import { renderPhase14SensorSchematicSvg } from './phase14SensorSchematics';
import { renderPhase15LcdSchematicSvg } from './phase15LcdSchematics';
import { renderPhase16MainboardSchematicSvg } from './phase16MainboardSchematics';
import { renderPhase16EvfSchematicSvg } from './phase16EvfSchematics';
import { renderPhase16BodyAuditSchematicSvg } from './phase16BodyAuditSchematics';
import { renderPhase17ShutterAuditSchematicSvg } from './phase17ShutterAuditSchematics';
import { renderPhase18LensMountSchematicSvg } from './phase18LensMountSchematics';
import { renderPhase19UltraAnatomySchematicSvg } from './phase19UltraAnatomySchematics';
import { renderPhase20MicroMountSchematicSvg } from './phase20MicroMountSchematics';
import { renderPhase23MicroNextGenSchematicSvg } from './phase23MicroNextGenSchematics';
import { renderPhase24BodyNextGenSchematicSvg } from './phase24BodyNextGenSchematics';
import { renderPhase25SensorBodySchematicSvg } from './phase25SensorBodySchematics';
import { renderPhase26BatterySchematicSvg } from './phase26BatterySchematics';
import { renderPhase26CfexpressSchematicSvg } from './phase26CfexpressSchematics';
import { renderPhase25BionzSchematicSvg } from './phase25BionzSchematics';
import { renderPhase25MiShoeSchematicSvg } from './phase25MiShoeSchematics';
import { renderPhase25MicSchematicSvg } from './phase25MicSchematics';
import { renderPhase27BatteryUltraSchematicSvg } from './phase27BatteryUltraSchematics';
import { renderPhase27CfexpressUltraSchematicSvg } from './phase27CfexpressUltraSchematics';
import { renderPhase28CfexpressUltraSchematicSvg } from './phase28CfexpressUltraSchematics';
import { renderPhase29CfexpressUltraSchematicSvg } from './phase29CfexpressUltraSchematics';
import { renderPhase28PixelV2SchematicSvg } from './phase28PixelV2Schematics';
import { renderPhase28BionzV2SchematicSvg } from './phase28BionzV2Schematics';
import { renderPhase29PixelV2DeepSchematicSvg } from './phase29PixelV2DeepSchematics';
import { renderPhase29BionzV2DeepSchematicSvg } from './phase29BionzV2DeepSchematics';
import { renderPhase30BatteryUltraSchematicSvg } from './phase30BatteryUltraSchematics';
import { renderPhase30MicUltraSchematicSvg } from './phase30MicUltraSchematics';
import { renderPhase31BatteryUltraSchematicSvg } from './phase31BatteryUltraSchematics';
import { renderPhase31MicUltraSchematicSvg } from './phase31MicUltraSchematics';
import { renderPhase30SensorFabSchematicSvg } from './phase30SensorFabSchematics';
import { renderPhase31SensorFabVol1SchematicSvg } from './phase31SensorFabVol1Schematics';
import { renderPhase32SensorFabVol2SchematicSvg } from './phase32SensorFabVol2Schematics';
import { renderPhase33SensorFabVol3SchematicSvg } from './fabVol3HdSchematics';
import { renderPhase34SensorFabVol4SchematicSvg } from './fabVol4HdSchematics';
import { renderPhase35SensorFabVol5SchematicSvg } from './fabVol5HdSchematics';
import { renderEvfHdSchematicSvg } from './evfHdSchematics';
import { renderPhase32SensorUltraSchematicA } from './phase32SensorUltraSchematicsA';
import { renderPhase32SensorUltraSchematicB } from './phase32SensorUltraSchematicsB';
import { renderPhase32SensorUltraSchematicC } from './phase32SensorUltraSchematicsC';

/**
 * Generate bespoke technical physics/optics schematic SVG inside the explanation card.
 */
export function renderSchematicSvg(type: PartExplanation['diagramType']): string {
  const phase32SensorSvg =
    renderPhase32SensorUltraSchematicA(type) ??
    renderPhase32SensorUltraSchematicB(type) ??
    renderPhase32SensorUltraSchematicC(type);
  if (phase32SensorSvg) return phase32SensorSvg;

  const evfHdSvg = renderEvfHdSchematicSvg(type);
  if (evfHdSvg) return evfHdSvg;

  const phase33SensorFabVol3Svg = renderPhase33SensorFabVol3SchematicSvg(type);
  if (phase33SensorFabVol3Svg) return phase33SensorFabVol3Svg;

  const phase34SensorFabVol4Svg = renderPhase34SensorFabVol4SchematicSvg(type);
  if (phase34SensorFabVol4Svg) return phase34SensorFabVol4Svg;

  const phase35SensorFabVol5Svg = renderPhase35SensorFabVol5SchematicSvg(type);
  if (phase35SensorFabVol5Svg) return phase35SensorFabVol5Svg;

  const wrap = (body: string) =>
    `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${body}</svg>`;

  const ultraLensSvg = renderUltraLensSchematicSvg(type, wrap);
  if (ultraLensSvg) return ultraLensSvg;

  const phase11BodySvg = renderPhase11BodySchematicSvg(type, wrap);
  if (phase11BodySvg) return phase11BodySvg;

  const phase11OpticsSvg = renderPhase11OpticsSchematicSvg(type, wrap);
  if (phase11OpticsSvg) return phase11OpticsSvg;

  const phase12MainBodySvg = renderPhase12MainBodySchematicSvg(type, wrap);
  if (phase12MainBodySvg) return phase12MainBodySvg;

  const phase12SubsystemsSvg = renderPhase12SubsystemsSchematicSvg(type, wrap);
  if (phase12SubsystemsSvg) return phase12SubsystemsSvg;

  const phase13MountShutterSvg = renderPhase13MountShutterSchematicSvg(type, wrap);
  if (phase13MountShutterSvg) return phase13MountShutterSvg;

  const phase13BodySvg = renderPhase13BodySchematicSvg(type, wrap);
  if (phase13BodySvg) return phase13BodySvg;

  const phase14SensorSvg = renderPhase14SensorSchematicSvg(type, wrap);
  if (phase14SensorSvg) return phase14SensorSvg;

  const phase15LcdSvg = renderPhase15LcdSchematicSvg(type, wrap);
  if (phase15LcdSvg) return phase15LcdSvg;

  const phase16MainboardSvg = renderPhase16MainboardSchematicSvg(type, wrap);
  if (phase16MainboardSvg) return phase16MainboardSvg;

  const phase16EvfSvg = renderPhase16EvfSchematicSvg(type, wrap);
  if (phase16EvfSvg) return phase16EvfSvg;

  const phase16BodyAuditSvg = renderPhase16BodyAuditSchematicSvg(type, wrap);
  if (phase16BodyAuditSvg) return phase16BodyAuditSvg;

  const phase17ShutterAuditSvg = renderPhase17ShutterAuditSchematicSvg(type, wrap);
  if (phase17ShutterAuditSvg) return phase17ShutterAuditSvg;

  const phase18LensMountSvg = renderPhase18LensMountSchematicSvg(type, wrap);
  if (phase18LensMountSvg) return phase18LensMountSvg;

  const phase19UltraSvg = renderPhase19UltraAnatomySchematicSvg(type, wrap);
  if (phase19UltraSvg) return phase19UltraSvg;

  const phase20MicroMountSvg = renderPhase20MicroMountSchematicSvg(type);
  if (phase20MicroMountSvg) return phase20MicroMountSvg;

  const phase23MicroNextGenSvg = renderPhase23MicroNextGenSchematicSvg(type);
  if (phase23MicroNextGenSvg) return phase23MicroNextGenSvg;

  const phase24BodyNextGenSvg = renderPhase24BodyNextGenSchematicSvg(type);
  if (phase24BodyNextGenSvg) return phase24BodyNextGenSvg;

  const phase25SensorBodySvg = renderPhase25SensorBodySchematicSvg(type);
  if (phase25SensorBodySvg) return phase25SensorBodySvg;

  const phase26BatterySvg = renderPhase26BatterySchematicSvg(type);
  if (phase26BatterySvg) return phase26BatterySvg;

  const phase26CfexpressSvg = renderPhase26CfexpressSchematicSvg(type);
  if (phase26CfexpressSvg) return phase26CfexpressSvg;

  const phase25BionzSvg = renderPhase25BionzSchematicSvg(type);
  if (phase25BionzSvg) return phase25BionzSvg;

  const phase25MiShoeSvg = renderPhase25MiShoeSchematicSvg(type);
  if (phase25MiShoeSvg) return phase25MiShoeSvg;

  const phase25MicSvg = renderPhase25MicSchematicSvg(type);
  if (phase25MicSvg) return phase25MicSvg;

  const phase27BatteryUltraSvg = renderPhase27BatteryUltraSchematicSvg(type);
  if (phase27BatteryUltraSvg) return phase27BatteryUltraSvg;

  const phase27CfexpressUltraSvg = renderPhase27CfexpressUltraSchematicSvg(type);
  if (phase27CfexpressUltraSvg) return phase27CfexpressUltraSvg;

  const phase28CfexpressUltraSvg = renderPhase28CfexpressUltraSchematicSvg(type);
  if (phase28CfexpressUltraSvg) return phase28CfexpressUltraSvg;

  const phase29CfexpressUltraSvg = renderPhase29CfexpressUltraSchematicSvg(type);
  if (phase29CfexpressUltraSvg) return phase29CfexpressUltraSvg;

  const phase28PixelV2Svg = renderPhase28PixelV2SchematicSvg(type);
  if (phase28PixelV2Svg) return phase28PixelV2Svg;

  const phase28BionzV2Svg = renderPhase28BionzV2SchematicSvg(type);
  if (phase28BionzV2Svg) return phase28BionzV2Svg;

  const phase29PixelV2DeepSvg = renderPhase29PixelV2DeepSchematicSvg(type);
  if (phase29PixelV2DeepSvg) return phase29PixelV2DeepSvg;

  const phase29BionzV2DeepSvg = renderPhase29BionzV2DeepSchematicSvg(type);
  if (phase29BionzV2DeepSvg) return phase29BionzV2DeepSvg;

  const phase30BatteryUltraSvg = renderPhase30BatteryUltraSchematicSvg(type);
  if (phase30BatteryUltraSvg) return phase30BatteryUltraSvg;

  const phase30MicUltraSvg = renderPhase30MicUltraSchematicSvg(type);
  if (phase30MicUltraSvg) return phase30MicUltraSvg;

  const phase31BatteryUltraSvg = renderPhase31BatteryUltraSchematicSvg(type);
  if (phase31BatteryUltraSvg) return phase31BatteryUltraSvg;

  const phase31MicUltraSvg = renderPhase31MicUltraSchematicSvg(type);
  if (phase31MicUltraSvg) return phase31MicUltraSvg;

  const phase30SensorFabSvg = renderPhase30SensorFabSchematicSvg(type);
  if (phase30SensorFabSvg) return phase30SensorFabSvg;

  const phase31SensorFabVol1Svg = renderPhase31SensorFabVol1SchematicSvg(type);
  if (phase31SensorFabVol1Svg) return phase31SensorFabVol1Svg;

  const phase32SensorFabVol2Svg = renderPhase32SensorFabVol2SchematicSvg(type);
  if (phase32SensorFabVol2Svg) return phase32SensorFabVol2Svg;

  switch (type) {
    case 'baffle':
      return wrap(`
        <rect x="24" y="18" width="272" height="82" rx="4" fill="#ffffff" stroke="#d8dde6"/>
        <polygon points="90,26 115,26 106,44 90,44" fill="#232730"/>
        <polygon points="90,92 115,92 106,74 90,74" fill="#232730"/>
        <line x1="36" y1="59" x2="275" y2="59" stroke="#2563eb" stroke-width="1.8"/>
        <line x1="36" y1="30" x2="103" y2="38" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="3 2"/>
        <line x1="103" y1="38" x2="96" y2="31" stroke="#dc2626" stroke-width="1" opacity="0.5"/>
        <rect x="248" y="34" width="10" height="50" fill="#1d6d7c"/>
        <text x="124" y="34" font-size="9" fill="#525a69">ナイフエッジ遮光壁（迷光吸収）</text>
        <text x="148" y="54" font-size="9" fill="#2563eb">有効結像光束</text>
        <text x="225" y="94" font-size="8.5" fill="#1d6d7c">36×24 mm 像面</text>
      `);

    case 'sswf':
      return wrap(`
        <rect x="20" y="76" width="54" height="16" rx="2" fill="#e2dac8" stroke="#7c7566"/>
        <text x="35" y="87" font-size="8.5" fill="#222">PZT</text>
        <path d="M74 68 Q114 48 154 68 T234 68 T300 68" fill="none" stroke="#0284c7" stroke-width="2.2"/>
        <path d="M74 68 Q114 88 154 68 T234 68 T300 68" fill="none" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.55"/>
        <circle cx="154" cy="44" r="3" fill="#475569"/>
        <path d="M154 41 L162 24" stroke="#dc2626" stroke-width="1.4"/>
        <polygon points="162,24 157,28 164,30" fill="#dc2626"/>
        <circle cx="215" cy="36" r="2.3" fill="#475569"/>
        <path d="M215 33 L222 18" stroke="#dc2626" stroke-width="1.3"/>
        <text x="112" y="21" font-size="9" fill="#1e293b">30–70 kHz 超音波定在波 (a &gt; 10⁴ G)</text>
        <text x="180" y="103" font-size="8.5" fill="#0284c7">屈曲共振モード振動ガラス</text>
      `);

    case 'olpf16':
      return wrap(`
        <!-- 16-point Gaussian PSF cluster -->
        <rect x="16" y="14" width="90" height="90" rx="6" fill="#ffffff" stroke="#dbe2eb"/>
        ${[-22, -8, 8, 22]
          .flatMap((dx, ix) =>
            [-22, -8, 8, 22].map((dy, iy) => {
              const dist = Math.hypot(ix - 1.5, iy - 1.5);
              const r = Math.max(2.1, 4.3 - dist * 0.9);
              const op = Math.max(0.32, 0.95 - dist * 0.25).toFixed(2);
              return `<circle cx="${61 + dx}" cy="${59 + dy}" r="${r.toFixed(1)}" fill="#0d5bd9" opacity="${op}"/>`;
            })
          )
          .join('')}
        <text x="27" y="114" font-size="8.5" fill="#475569">16点ガウス分離 PSF</text>
        <!-- MTF Comparison curve -->
        <line x1="132" y1="96" x2="304" y2="96" stroke="#94a3b8" stroke-width="1"/>
        <line x1="132" y1="18" x2="132" y2="96" stroke="#94a3b8" stroke-width="1"/>
        <line x1="205" y1="18" x2="205" y2="96" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 2"/>
        <path d="M132 24 C165 26, 190 50, 215 80 C235 94, 265 95, 300 95" fill="none" stroke="#0d5bd9" stroke-width="2.2"/>
        <path d="M132 24 C162 28, 185 68, 205 95 C225 65, 248 56, 268 88 C282 78, 294 74, 300 84" fill="none" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="3 2"/>
        <text x="196" y="108" font-size="8.5" fill="#475569">f_N (Nyquist)</text>
        <text x="218" y="30" font-size="8.5" fill="#0d5bd9">16点 LPF (サイドローブ抑制)</text>
        <text x="218" y="42" font-size="8" fill="#64748b">破線: 従来4点 LPF</text>
      `);

    case 'ircut':
      return wrap(`
        <line x1="28" y1="94" x2="302" y2="94" stroke="#94a3b8" stroke-width="1"/>
        <line x1="28" y1="14" x2="28" y2="94" stroke="#94a3b8" stroke-width="1"/>
        <!-- Visible spectrum band -->
        <rect x="64" y="16" width="110" height="78" fill="url(#visGrad)" opacity="0.22"/>
        <defs>
          <linearGradient id="visGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stop-color="#6366f1"/>
            <stop offset="30%" stop-color="#06b6d4"/>
            <stop offset="55%" stop-color="#22c55e"/>
            <stop offset="80%" stop-color="#eab308"/>
            <stop offset="100%" stop-color="#ef4444"/>
          </linearGradient>
        </defs>
        <!-- Silicon native sensitivity curve (extends to 1107nm) -->
        <path d="M40 92 Q125 18 195 36 Q250 56 294 92" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="3 2"/>
        <!-- Hybrid IR/UV cut filter transmittance -->
        <path d="M36 93 L58 92 L68 22 L166 22 L180 92 L296 93" fill="none" stroke="#0284c7" stroke-width="2.3"/>
        <text x="58" y="106" font-size="8" fill="#475569">400nm</text>
        <text x="160" y="106" font-size="8" fill="#475569">650nm</text>
        <text x="266" y="106" font-size="8" fill="#475569">1107nm</text>
        <text x="192" y="34" font-size="8.5" fill="#64748b">Si 原感度 (1.12 eV)</text>
        <text x="80" y="34" font-size="8.5" fill="#0284c7">ハイブリッド透過帯</text>
        <text x="196" y="84" font-size="8.5" fill="#be185d">NIR 遮断 (OD&gt;4)</text>
      `);

    case 'coverglass':
      return wrap(`
        <rect x="44" y="28" width="232" height="14" rx="2" fill="#e0f2fe" stroke="#0284c7"/>
        <rect x="44" y="42" width="24" height="28" fill="#94a3b8"/>
        <rect x="252" y="42" width="24" height="28" fill="#94a3b8"/>
        <rect x="44" y="70" width="232" height="20" fill="#334155"/>
        <rect x="92" y="58" width="136" height="12" fill="#1d6d7c"/>
        <text x="116" y="22" font-size="8.5" fill="#0369a1">低α線ARカバーガラス (&gt;99.2%)</text>
        <text x="122" y="53" font-size="8.5" fill="#475569">乾燥窒素 N₂ 気密室</text>
        <text x="10" y="60" font-size="8" fill="#475569">Kovar</text>
        <text x="116" y="84" font-size="8.5" fill="#f8fafc">Al₂O₃ セラミック筐体</text>
      `);

    case 'stacked_die':
      return wrap(`
        <rect x="50" y="14" width="220" height="22" rx="3" fill="#1d6d7c"/>
        <text x="78" y="28" font-size="9" fill="#ffffff">1層目: BSI 2層トランジスタ画素 (PD+MEM)</text>
        <rect x="50" y="39" width="220" height="7" fill="#d97736"/>
        <text x="86" y="45" font-size="7.5" fill="#ffffff">Cu-Cu ダイレクトハイブリッド接合</text>
        <rect x="50" y="49" width="220" height="24" rx="3" fill="#2d4868"/>
        <text x="84" y="64" font-size="9" fill="#ffffff">2層目: 列並列 CDS / ADC ＆ GS制御</text>
        <rect x="50" y="77" width="220" height="24" rx="3" fill="#1e293b"/>
        <text x="84" y="92" font-size="9" fill="#e2e8f0">3層目: 超広帯域 DRAM バッファ (120fps)</text>
      `);

    case 'wirebond':
      return wrap(`
        <rect x="26" y="72" width="110" height="22" fill="#1d6d7c"/>
        <rect x="136" y="64" width="158" height="30" fill="#334155"/>
        <rect x="108" y="69" width="16" height="4" fill="#eab308"/>
        <rect x="182" y="61" width="22" height="4" fill="#eab308"/>
        <path d="M116 69 C118 32, 160 32, 193 61" fill="none" stroke="#eab308" stroke-width="2.4"/>
        <line x1="154" y1="40" x2="154" y2="69" stroke="#64748b" stroke-width="1" stroke-dasharray="2 2"/>
        <text x="160" y="34" font-size="8.5" fill="#92400e">低ループ 4N Au (55–80 μm)</text>
        <text x="48" y="86" font-size="8.5" fill="#fff">Si ダイ電極</text>
        <text x="174" y="84" font-size="8.5" fill="#e2e8f0">HTCC セラミック段棚</text>
      `);

    case 'ceramic_pkg':
      return wrap(`
        <rect x="34" y="24" width="252" height="62" rx="3" fill="#334155"/>
        <rect x="64" y="24" width="192" height="34" fill="#ffffff"/>
        <rect x="84" y="38" width="152" height="18" fill="#1d6d7c"/>
        <rect x="84" y="58" width="152" height="28" fill="#a16244"/>
        ${[48, 70, 250, 272].map((x) => `<rect x="${x - 6}" y="86" width="12" height="6" fill="#eab308"/>`).join('')}
        <text x="115" y="50" font-size="8.5" fill="#fff">36×24 mm 撮像ダイ</text>
        <text x="102" y="75" font-size="8.5" fill="#fff">CuW 高熱伝導スラグ</text>
        <text x="86" y="106" font-size="8.5" fill="#475569">12層 HTCC 高平坦焼成 (&lt;5 μm) + 金LGA電極</text>
      `);

    case 'sensor_pcb':
      return wrap(`
        <rect x="24" y="24" width="272" height="72" rx="4" fill="#14332d"/>
        <rect x="42" y="38" width="54" height="44" rx="2" fill="#22252b" stroke="#94a3b8"/>
        <text x="49" y="58" font-size="8" fill="#e2e8f0">Analog</text>
        <text x="53" y="70" font-size="8" fill="#38bdf8">LDO 2.8V</text>
        <rect x="224" y="38" width="54" height="44" rx="2" fill="#22252b" stroke="#94a3b8"/>
        <text x="232" y="58" font-size="8" fill="#e2e8f0">Digital</text>
        <text x="233" y="70" font-size="8" fill="#facc15">PMIC 1.2V</text>
        <path d="M110 46 L132 46 L138 38 L146 54 L154 38 L162 54 L170 46 L208 46" fill="none" stroke="#4ade80" stroke-width="1.8"/>
        <path d="M110 70 L208 70" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="4 2"/>
        <text x="114" y="33" font-size="8" fill="#86efac">100Ω 差動等長メアンダ配線</text>
        <text x="114" y="86" font-size="8" fill="#cbd5e1">アナログ/デジタル電源完全分離</text>
      `);

    case 'slvs_fpc':
      return wrap(`
        <!-- Eye diagram + U-loop flexure -->
        <rect x="22" y="18" width="128" height="80" rx="5" fill="#ffffff" stroke="#d8dde6"/>
        <path d="M32 34 C58 34, 68 82, 86 82 C104 82, 114 34, 140 34" fill="none" stroke="#0d5bd9" stroke-width="1.8"/>
        <path d="M32 82 C58 82, 68 34, 86 34 C104 34, 114 82, 140 82" fill="none" stroke="#0d5bd9" stroke-width="1.8"/>
        <text x="48" y="61" font-size="8.5" fill="#0d5bd9">200mV Eye</text>
        <text x="26" y="110" font-size="8.5" fill="#475569">SLVS-EC v3 (10 Gbps/lane)</text>
        <path d="M180 34 L256 34 C290 34, 290 84, 256 84 L196 84" fill="none" stroke="#c96b1c" stroke-width="6" stroke-linecap="round"/>
        <text x="176" y="24" font-size="8.5" fill="#9a3412">IBIS低剛性 U字ループ</text>
        <text x="196" y="63" font-size="8" fill="#64748b">EMI遮蔽 + 差動伝送</text>
      `);

    case 'ibis_vcm':
      return wrap(`
        <rect x="96" y="22" width="128" height="74" rx="5" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/>
        <rect x="114" y="34" width="92" height="50" fill="#1d6d7c" opacity="0.22" stroke="#1d6d7c"/>
        <rect x="112" y="84" width="38" height="10" rx="4" fill="#c86432"/>
        <rect x="170" y="84" width="38" height="10" rx="4" fill="#c86432"/>
        <rect x="218" y="38" width="10" height="42" rx="4" fill="#c86432"/>
        <line x1="131" y1="84" x2="131" y2="68" stroke="#0d5bd9" stroke-width="2"/>
        <line x1="189" y1="84" x2="189" y2="68" stroke="#0d5bd9" stroke-width="2"/>
        <line x1="228" y1="59" x2="254" y2="59" stroke="#d9480f" stroke-width="2"/>
        <text x="140" y="58" font-size="9" fill="#0f172a">X / Y / Roll</text>
        <text x="234" y="52" font-size="8.5" fill="#d9480f">F_x</text>
        <text x="115" y="109" font-size="8.5" fill="#0d5bd9">Y1・Y2 逆相で Roll 補正（ローレンツ力）</text>
      `);

    case 'ceramic_balls':
      return wrap(`
        <rect x="34" y="26" width="252" height="14" rx="2" fill="#cbd5e1" stroke="#64748b"/>
        <rect x="34" y="76" width="252" height="14" rx="2" fill="#94a3b8" stroke="#475569"/>
        <circle cx="84" cy="58" r="14" fill="#1e293b"/>
        <circle cx="236" cy="58" r="14" fill="#1e293b"/>
        <circle cx="80" cy="53" r="3.5" fill="#ffffff" opacity="0.35"/>
        <circle cx="232" cy="53" r="3.5" fill="#ffffff" opacity="0.35"/>
        <path d="M160 40 L160 72" stroke="#0d5bd9" stroke-width="2" stroke-dasharray="3 2"/>
        <polygon points="160,74 155,66 165,66" fill="#0d5bd9"/>
        <text x="112" y="19" font-size="8.5" fill="#334155">可動キャリア (ΔZ チルト = 0)</text>
        <text x="122" y="56" font-size="8.5" fill="#0d5bd9">磁気予圧 F_preload</text>
        <text x="72" y="106" font-size="8.5" fill="#334155">3点 Si₃N₄ 非磁性セラミック球（キネマティック支持）</text>
      `);

    case 'magnet_yoke':
      return wrap(`
        <rect x="44" y="72" width="232" height="16" fill="#64748b"/>
        <rect x="66" y="48" width="84" height="24" fill="#dbeafe" stroke="#2563eb"/>
        <rect x="170" y="48" width="84" height="24" fill="#fee2e2" stroke="#dc2626"/>
        <text x="102" y="64" font-size="11" font-weight="bold" fill="#1d4ed8">N</text>
        <text x="206" y="64" font-size="11" font-weight="bold" fill="#b91c1c">S</text>
        <path d="M108 48 C108 16, 212 16, 212 48" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 2"/>
        <rect x="94" y="24" width="132" height="10" rx="3" fill="#c86432" opacity="0.85"/>
        <text x="120" y="16" font-size="8.5" fill="#0369a1">閉磁気回路磁束 B (~1.4 T)</text>
        <text x="98" y="102" font-size="8.5" fill="#334155">N52 ネオジム磁石 + 軟鉄バックヨーク</text>
      `);

    case 'sigma_graphite':
      return wrap(`
        <rect x="26" y="22" width="54" height="72" rx="3" fill="#14332d"/>
        <text x="34" y="61" font-size="8.5" fill="#fff">可動PCB</text>
        <rect x="80" y="34" width="14" height="48" fill="#7aa4b8"/>
        <path d="M94 58 L120 58 L164 26 L196 58 L156 90 L226 58 L244 58" fill="none" stroke="#1e293b" stroke-width="5" stroke-linejoin="round"/>
        <path d="M94 58 L120 58 L164 26 L196 58 L156 90 L226 58 L244 58" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="4 3"/>
        <rect x="244" y="22" width="48" height="72" rx="3" fill="#d07447"/>
        <text x="252" y="61" font-size="8.5" fill="#fff">銅放熱板</text>
        <text x="104" y="108" font-size="8.5" fill="#1e293b">Σ字型グラファイト (k ≈ 1600 W/m·K)</text>
      `);

    case 'microlens':
      return wrap(`
        <path d="M44 56 Q102 14 160 56 Q218 14 276 56" fill="#dff2ff" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="78" y1="8" x2="78" y2="38" stroke="#dc2626" stroke-width="1.5"/>
        <line x1="78" y1="38" x2="96" y2="92" stroke="#dc2626" stroke-width="1.5"/>
        <line x1="126" y1="8" x2="126" y2="38" stroke="#dc2626" stroke-width="1.5"/>
        <line x1="126" y1="38" x2="108" y2="92" stroke="#dc2626" stroke-width="1.5"/>
        <rect x="74" y="88" width="56" height="16" fill="#3b638f"/>
        <text x="168" y="82" font-size="8.5" fill="#0369a1">ギャップレス非球面集光</text>
        <text x="168" y="96" font-size="8.5" fill="#475569">実効開口率 ≈ 100%</text>
      `);

    case 'bayer_cfa':
      return wrap(`
        <rect x="34" y="28" width="58" height="44" fill="#dc3a44" opacity="0.82"/>
        <rect x="98" y="28" width="58" height="44" fill="#2ca861" opacity="0.82"/>
        <rect x="162" y="28" width="58" height="44" fill="#2ca861" opacity="0.82"/>
        <rect x="226" y="28" width="58" height="44" fill="#2a6ee0" opacity="0.82"/>
        <rect x="92" y="24" width="6" height="54" fill="#334155"/>
        <rect x="156" y="24" width="6" height="54" fill="#334155"/>
        <rect x="220" y="24" width="6" height="54" fill="#334155"/>
        <text x="58" y="54" font-size="11" font-weight="bold" fill="#fff">R</text>
        <text x="120" y="54" font-size="11" font-weight="bold" fill="#fff">G1</text>
        <text x="184" y="54" font-size="11" font-weight="bold" fill="#fff">G2</text>
        <text x="250" y="54" font-size="11" font-weight="bold" fill="#fff">B</text>
        <text x="72" y="98" font-size="8.5" fill="#334155">タングステン光導波路隔壁で斜め混色を遮断</text>
      `);

    case 'bsi_ar':
      return wrap(`
        <polygon points="36,84 56,42 76,84 96,42 116,84 136,42 156,84 176,42 196,84 216,42 236,84 256,42 276,84" fill="#3b638f" stroke="#1e3a5f"/>
        <rect x="36" y="84" width="240" height="20" fill="#2b4c70"/>
        <line x1="116" y1="12" x2="108" y2="56" stroke="#eab308" stroke-width="1.8"/>
        <line x1="108" y1="56" x2="128" y2="96" stroke="#eab308" stroke-width="1.8"/>
        <text x="148" y="26" font-size="8.5" fill="#1e293b">モスアイ・ピラミッドナノ凹凸</text>
        <text x="148" y="38" font-size="8" fill="#0369a1">傾斜屈折率で反射率 24% → &lt;1%</text>
      `);

    case 'cross_pd':
      return wrap(`
        <!-- Left/Right Split (Vertical line AF) -->
        <rect x="34" y="22" width="46" height="58" rx="3" fill="#5c96d6" stroke="#1d4ed8"/>
        <rect x="84" y="22" width="46" height="58" rx="3" fill="#5c96d6" stroke="#1d4ed8"/>
        <text x="53" y="55" font-size="10" font-weight="bold" fill="#fff">A</text>
        <text x="103" y="55" font-size="10" font-weight="bold" fill="#fff">B</text>
        <text x="38" y="96" font-size="8.5" fill="#334155">左右分割（縦線測距）</text>
        <!-- Top/Bottom Split (Horizontal line AF) -->
        <rect x="184" y="22" width="96" height="27" rx="3" fill="#38bdf8" stroke="#0369a1"/>
        <rect x="184" y="53" width="96" height="27" rx="3" fill="#38bdf8" stroke="#0369a1"/>
        <text x="228" y="39" font-size="10" font-weight="bold" fill="#fff">C</text>
        <text x="228" y="70" font-size="10" font-weight="bold" fill="#fff">D</text>
        <text x="184" y="96" font-size="8.5" fill="#334155">上下分割（横線測距）</text>
        <text x="114" y="112" font-size="8.5" fill="#0d5bd9">Cross-Type Dual Pixel 全画素測距</text>
      `);

    case 'two_layer_gs':
      return wrap(`
        <rect x="36" y="14" width="248" height="28" rx="3" fill="#3b638f"/>
        <text x="86" y="31" font-size="9" fill="#fff">上層: 全面フォトダイオード (FWC 2×)</text>
        <rect x="104" y="42" width="16" height="16" fill="#d99b38"/>
        <text x="126" y="53" font-size="8" fill="#92400e">SVG 垂直転送ゲート</text>
        <rect x="36" y="58" width="84" height="32" rx="3" fill="#1e293b"/>
        <text x="46" y="77" font-size="8.5" fill="#38bdf8">GS遮光メモリ</text>
        <rect x="126" y="58" width="76" height="32" rx="3" fill="#c86b3c"/>
        <text x="136" y="77" font-size="8.5" fill="#fff">LOFIC 容量</text>
        <rect x="208" y="58" width="76" height="32" rx="3" fill="#475569"/>
        <text x="214" y="77" font-size="8.5" fill="#fde047">大型Amp Tr</text>
        <text x="64" y="106" font-size="8.5" fill="#334155">下層: 独立トランジスタ層（低RTN・DR &gt; 100 dB）</text>
      `);

    case 'cucu_bond':
      return wrap(`
        <rect x="36" y="16" width="248" height="26" fill="#4b5568"/>
        <text x="106" y="33" font-size="9" fill="#fff">画素ウェハー (Pixel Wafer)</text>
        <rect x="36" y="42" width="248" height="28" fill="#e2effa"/>
        ${[68, 128, 188, 248]
          .map(
            (x) =>
              `<rect x="${x - 10}" y="42" width="20" height="13" fill="#d87342"/><rect x="${x - 10}" y="57" width="20" height="13" fill="#c45c2a"/><line x1="${x - 13}" y1="56" x2="${x + 13}" y2="56" stroke="#1e293b" stroke-width="1"/>`
          )
          .join('')}
        <rect x="36" y="70" width="248" height="26" fill="#2d4868"/>
        <text x="100" y="87" font-size="9" fill="#fff">ロジックウェハー (Logic Wafer)</text>
        <text x="72" y="110" font-size="8.5" fill="#9a3412">画素直下 Cu-Cu 直接分子接合（ピッチ 1.5–4 μm）</text>
      `);

    case 'adc_dram':
      return wrap(`
        <rect x="26" y="20" width="72" height="36" rx="4" fill="#f1f5f9" stroke="#64748b"/>
        <text x="36" y="36" font-size="8.5" fill="#0f172a">CDS 差分</text>
        <text x="35" y="48" font-size="7.5" fill="#475569">kTCノイズ消去</text>
        <path d="M98 38 L120 38" stroke="#0d5bd9" stroke-width="1.8"/>
        <rect x="120" y="20" width="76" height="36" rx="4" fill="#dbeafe" stroke="#2563eb"/>
        <text x="128" y="36" font-size="8.5" fill="#1d4ed8">列並列 ADC</text>
        <text x="131" y="48" font-size="7.5" fill="#1e40af">14/16-bit 量子化</text>
        <path d="M196 38 L218 38" stroke="#0d5bd9" stroke-width="1.8"/>
        <rect x="218" y="20" width="76" height="36" rx="4" fill="#1e293b"/>
        <text x="234" y="36" font-size="8.5" fill="#38bdf8">DRAM</text>
        <text x="228" y="48" font-size="7.5" fill="#cbd5e1">120fps 一時保持</text>
        <text x="58" y="84" font-size="8.5" fill="#334155">V_CDS = (V_sig + V_kTC) − (V_rst + V_kTC)</text>
        <text x="80" y="99" font-size="8" fill="#64748b">読み出しノイズ &lt; 1.0 e⁻ RMS（HCG時）</text>
      `);

    case 'shutter_cover':
      return wrap(`
        <rect x="20" y="14" width="280" height="90" rx="5" fill="#ffffff" stroke="#dbe2eb"/>
        <!-- Front cover wall -->
        <rect x="82" y="20" width="12" height="24" fill="#1e293b"/>
        <rect x="82" y="74" width="12" height="24" fill="#1e293b"/>
        <!-- Narrow blade chamber -->
        <rect x="104" y="22" width="4" height="74" fill="#334155"/>
        <rect x="116" y="20" width="10" height="24" fill="#475569"/>
        <rect x="116" y="74" width="10" height="24" fill="#475569"/>
        <!-- Rays -->
        <line x1="28" y1="59" x2="225" y2="59" stroke="#2563eb" stroke-width="2"/>
        <line x1="28" y1="26" x2="82" y2="34" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="3 2"/>
        <rect x="218" y="34" width="8" height="50" fill="#1d6d7c"/>
        <text x="135" y="32" font-size="8.5" fill="#0f172a">すき間 δ ≈ 0.2 mm（羽根室）</text>
        <text x="135" y="46" font-size="8" fill="#dc2626">斜め迷光を艶消し枠で吸収</text>
        <text x="135" y="76" font-size="8" fill="#2563eb">空気バタつき（フラッター）抑制</text>
        <text x="233" y="62" font-size="8.5" fill="#1d6d7c">センサー面</text>
      `);

    case 'shutter_shield':
      return wrap(`
        <!-- Left: Power OFF (Closed Shield) -->
        <rect x="16" y="14" width="134" height="92" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="34" y="34" width="98" height="14" fill="#475569" stroke="#1e293b" stroke-width="0.8"/>
        <rect x="34" y="48" width="98" height="14" fill="#64748b" stroke="#1e293b" stroke-width="0.8"/>
        <rect x="34" y="62" width="98" height="14" fill="#475569" stroke="#1e293b" stroke-width="0.8"/>
        <circle cx="62" cy="24" r="2.2" fill="#dc2626"/>
        <circle cx="96" cy="21" r="1.8" fill="#dc2626"/>
        <path d="M62 26 L62 32 M96 23 L96 32" stroke="#dc2626" stroke-width="1.2"/>
        <text x="30" y="94" font-size="8.5" font-weight="bold" fill="#0f172a">電源OFF：自動閉鎖（防塵）</text>
        <!-- Right: Power ON (Retracted) -->
        <rect x="170" y="14" width="134" height="92" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
        <rect x="188" y="22" width="98" height="10" fill="#475569" stroke="#1e293b" stroke-width="0.8"/>
        <rect x="188" y="36" width="98" height="40" fill="#e0f2fe" stroke="#0284c7" stroke-dasharray="3 2"/>
        <text x="212" y="59" font-size="9" fill="#0369a1">撮影ウィンドウ</text>
        <text x="184" y="94" font-size="8.5" font-weight="bold" fill="#0369a1">電源ON：上部ポケット退避</text>
      `);

    case 'shutter_curtain1':
      return wrap(`
        <!-- Expanded 4 blades -->
        <rect x="24" y="16" width="100" height="74" rx="3" fill="#f8fafc" stroke="#94a3b8"/>
        <rect x="30" y="20" width="88" height="16" fill="#1f242d" stroke="#64748b" stroke-width="0.7"/>
        <rect x="30" y="37" width="88" height="16" fill="#2b313c" stroke="#64748b" stroke-width="0.7"/>
        <rect x="30" y="54" width="88" height="16" fill="#1f242d" stroke="#64748b" stroke-width="0.7"/>
        <rect x="30" y="71" width="88" height="15" fill="#2b313c" stroke="#64748b" stroke-width="0.7"/>
        <text x="42" y="105" font-size="8.5" fill="#334155">閉鎖時（縦 24 mm）</text>
        <!-- Arrow -->
        <path d="M134 52 L172 52" stroke="#0d5bd9" stroke-width="2.4"/>
        <polygon points="176,52 167,46 167,58" fill="#0d5bd9"/>
        <text x="132" y="42" font-size="8.5" font-weight="bold" fill="#0d5bd9">約 2.2 ms</text>
        <text x="133" y="68" font-size="8" fill="#475569">時速 40 km!</text>
        <!-- Folded into bottom pocket -->
        <rect x="186" y="16" width="110" height="74" rx="3" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="206" y="48" font-size="9.5" font-weight="bold" fill="#b45309">光がセンサーへ!</text>
        <rect x="192" y="74" width="98" height="14" fill="#1f242d" stroke="#eab308" stroke-width="0.9"/>
        <text x="191" y="105" font-size="8.5" fill="#334155">4枚折り畳み収納（幅 7 mm）</text>
      `);

    case 'shutter_link1':
      return wrap(`
        <!-- Parallelogram 4-bar linkage geometry -->
        <rect x="20" y="14" width="280" height="90" rx="5" fill="#ffffff" stroke="#dbe2eb"/>
        <!-- Horizontal blade -->
        <rect x="38" y="34" width="118" height="14" rx="1" fill="#1f242d"/>
        <rect x="38" y="64" width="118" height="14" rx="1" fill="#64748b" opacity="0.45" stroke="#475569" stroke-dasharray="3 2"/>
        <!-- Upper & lower parallel arms -->
        <line x1="146" y1="38" x2="230" y2="28" stroke="#0d5bd9" stroke-width="3.2" stroke-linecap="round"/>
        <line x1="146" y1="45" x2="230" y2="35" stroke="#0284c7" stroke-width="2.4" stroke-linecap="round"/>
        <!-- Lower position ghost arms -->
        <line x1="146" y1="68" x2="230" y2="28" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="3 2"/>
        <line x1="146" y1="75" x2="230" y2="35" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2"/>
        <!-- Stationary pivots -->
        <circle cx="230" cy="28" r="3.6" fill="#d4a948" stroke="#1e293b"/>
        <circle cx="230" cy="35" r="3.6" fill="#d4a948" stroke="#1e293b"/>
        <circle cx="146" cy="38" r="2.6" fill="#facc15"/>
        <circle cx="146" cy="45" r="2.6" fill="#facc15"/>
        <text x="42" y="27" font-size="8.5" fill="#0f172a">常に「水平 0°」をキープ!</text>
        <text x="192" y="62" font-size="8" fill="#0d5bd9">平行4節リンク</text>
        <text x="192" y="74" font-size="8" fill="#475569">半径 r₁&gt;r₂&gt;r₃&gt;r₄</text>
        <text x="192" y="86" font-size="8" fill="#475569">4枚同時に折り畳み</text>
      `);

    case 'shutter_midplate':
      return wrap(`
        <rect x="20" y="14" width="280" height="90" rx="5" fill="#ffffff" stroke="#dbe2eb"/>
        <!-- Left: 1st curtain chamber -->
        <rect x="44" y="24" width="70" height="68" rx="3" fill="#eff6ff" stroke="#93c5fd"/>
        <rect x="72" y="34" width="12" height="48" fill="#1f242d"/>
        <text x="53" y="102" font-size="8.5" fill="#1d4ed8">先幕の部屋</text>
        <!-- Center: Ultra-thin mid-plate -->
        <rect x="128" y="20" width="8" height="76" fill="#475569"/>
        <text x="108" y="16" font-size="8.5" font-weight="bold" fill="#0f172a">極薄中板 0.15 mm</text>
        <!-- Right: 2nd curtain chamber -->
        <rect x="150" y="24" width="70" height="68" rx="3" fill="#fefce8" stroke="#fde047"/>
        <rect x="178" y="34" width="12" height="48" fill="#56657c"/>
        <text x="160" y="102" font-size="8.5" fill="#a16207">後幕の部屋</text>
        <!-- Notes -->
        <text x="228" y="42" font-size="8" fill="#334155">時速40 kmの</text>
        <text x="228" y="54" font-size="8" fill="#334155">すれ違い衝突</text>
        <text x="228" y="66" font-size="8" fill="#dc2626">＆空気渦を遮断</text>
        <text x="228" y="82" font-size="8" fill="#0284c7">間隔 Δz≈0.5mm</text>
      `);

    case 'shutter_curtain2':
      return wrap(`
        <!-- 3-step visual of 1/8000s Slit Exposure! -->
        <!-- Step 1 -->
        <rect x="14" y="18" width="64" height="66" rx="3" fill="#fffbeb" stroke="#cbd5e1"/>
        <rect x="16" y="34" width="60" height="48" fill="#1f242d"/>
        <rect x="16" y="20" width="60" height="6" fill="#56657c"/>
        <rect x="16" y="26" width="60" height="8" fill="#fbbf24" opacity="0.75"/>
        <text x="24" y="13" font-size="8" fill="#334155">① 上端スキャン</text>
        <!-- Step 2 -->
        <rect x="92" y="18" width="64" height="66" rx="3" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.3"/>
        <rect x="94" y="20" width="60" height="26" fill="#56657c"/>
        <rect x="94" y="55" width="60" height="27" fill="#1f242d"/>
        <rect x="94" y="46" width="60" height="9" fill="#fbbf24" opacity="0.9"/>
        <text x="100" y="13" font-size="8" font-weight="bold" fill="#b45309">② 光のスリット</text>
        <!-- Step 3 -->
        <rect x="170" y="18" width="64" height="66" rx="3" fill="#fffbeb" stroke="#cbd5e1"/>
        <rect x="172" y="20" width="60" height="48" fill="#56657c"/>
        <rect x="172" y="76" width="60" height="6" fill="#1f242d"/>
        <rect x="172" y="68" width="60" height="8" fill="#fbbf24" opacity="0.75"/>
        <text x="179" y="13" font-size="8" fill="#334155">③ 下端で完了</text>
        <!-- Right callout -->
        <text x="242" y="34" font-size="8.5" font-weight="bold" fill="#b45309">1/8000秒時</text>
        <text x="242" y="48" font-size="8.5" fill="#0f172a">すき間幅</text>
        <text x="242" y="61" font-size="9.5" font-weight="bold" fill="#0d5bd9">約 1.3 mm!</text>
        <text x="242" y="76" font-size="7.5" fill="#475569">後幕が0.125ms後</text>
        <text x="242" y="86" font-size="7.5" fill="#475569">を全力追跡</text>
        <text x="16" y="102" font-size="8" fill="#475569">全開フラッシュ同調は最速1/400秒まで・メカ前後幕ならF1.2丸ボケも欠けない!</text>
      `);

    case 'shutter_link2':
      return wrap(`
        <!-- Synchronized travel curve graph: Curtain 1 & Curtain 2 parallel trajectories -->
        <line x1="34" y1="92" x2="296" y2="92" stroke="#94a3b8" stroke-width="1"/>
        <line x1="34" y1="16" x2="34" y2="92" stroke="#94a3b8" stroke-width="1"/>
        <!-- Curtain 1 curve -->
        <path d="M52 22 C82 22, 118 84, 152 86" fill="none" stroke="#1f242d" stroke-width="2.4"/>
        <!-- Curtain 2 parallel curve shifted by Δt -->
        <path d="M108 22 C138 22, 174 84, 208 86" fill="none" stroke="#0d5bd9" stroke-width="2.4"/>
        <!-- Constant Δt arrows -->
        <line x1="88" y1="42" x2="144" y2="42" stroke="#f59e0b" stroke-width="2"/>
        <line x1="114" y1="68" x2="170" y2="68" stroke="#f59e0b" stroke-width="2"/>
        <text x="150" y="45" font-size="8.5" font-weight="bold" fill="#b45309">Δt 一定（上端）</text>
        <text x="176" y="71" font-size="8.5" font-weight="bold" fill="#b45309">Δt 一定（下端）</text>
        <text x="42" y="106" font-size="8.5" fill="#334155">時間 t →（速度カーブ完全一致 ＝ 画面全域で明るさムラゼロ）</text>
        <text x="8" y="30" font-size="8" fill="#475569">上</text>
        <text x="8" y="84" font-size="8" fill="#475569">下</text>
      `);

    case 'shutter_dual_drive':
      return wrap(`
        <!-- Hybrid Spring + Electromagnetic Booster Diagram -->
        <rect x="18" y="20" width="96" height="58" rx="6" fill="#f8fafc" stroke="#64748b"/>
        <text x="32" y="41" font-size="9" font-weight="bold" fill="#0f172a">高張力バネ</text>
        <text x="27" y="56" font-size="8" fill="#475569">軽快・50万回耐久</text>
        <text x="34" y="69" font-size="8" fill="#475569">通常ベース動力</text>
        <text x="122" y="55" font-size="16" font-weight="bold" fill="#0d5bd9">+</text>
        <rect x="140" y="20" width="96" height="58" rx="6" fill="#eff6ff" stroke="#2563eb"/>
        <text x="150" y="41" font-size="9" font-weight="bold" fill="#1d4ed8">電磁ブースター</text>
        <text x="148" y="56" font-size="8" fill="#1e40af">銅コイル＋磁石</text>
        <text x="148" y="69" font-size="8" fill="#1e40af">ローレンツ力加速</text>
        <path d="M240 49 L258 49" stroke="#d97706" stroke-width="2.4"/>
        <polygon points="262,49 254,44 254,54" fill="#d97706"/>
        <rect x="262" y="22" width="46" height="54" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="268" y="45" font-size="9" font-weight="bold" fill="#b45309">1/400</text>
        <text x="272" y="60" font-size="8" fill="#b45309">秒同調</text>
        <text x="58" y="102" font-size="8.5" fill="#334155">デュアル駆動：普段は優しく長寿命、必要時はターボ加速!</text>
      `);

    case 'shutter_magnets':
      return wrap(`
        <!-- Electronic Solenoid Pulse Timing Diagram -->
        <text x="18" y="34" font-size="8.5" font-weight="bold" fill="#1f242d">先幕電磁石</text>
        <path d="M84 22 L138 22 L138 42 L292 42" fill="none" stroke="#1f242d" stroke-width="2.2"/>
        <text x="90" y="18" font-size="7.5" fill="#0284c7">通電ON（保持）</text>
        <text x="144" y="36" font-size="7.5" fill="#dc2626">OFF → 発射!</text>

        <text x="18" y="76" font-size="8.5" font-weight="bold" fill="#0d5bd9">後幕電磁石</text>
        <path d="M84 62 L212 62 L212 82 L292 82" fill="none" stroke="#0d5bd9" stroke-width="2.2"/>
        <text x="128" y="58" font-size="7.5" fill="#0284c7">通電ON（保持）</text>
        <text x="218" y="76" font-size="7.5" fill="#dc2626">OFF → 追跡!</text>

        <!-- Δt timing bracket -->
        <line x1="138" y1="42" x2="138" y2="96" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 2"/>
        <line x1="212" y1="82" x2="212" y2="96" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 2"/>
        <line x1="140" y1="94" x2="210" y2="94" stroke="#f59e0b" stroke-width="2.2"/>
        <text x="108" y="108" font-size="8.5" font-weight="bold" fill="#b45309">Δt = シャッター速度（1/8000s = 125 μs）</text>
      `);

    case 'shutter_charge_motor':
      return wrap(`
        <rect x="18" y="24" width="68" height="48" rx="6" fill="#f1f5f9" stroke="#64748b"/>
        <text x="26" y="44" font-size="8.5" font-weight="bold" fill="#0f172a">コアレスDC</text>
        <text x="31" y="58" font-size="8" fill="#475569">超高速起動</text>
        <path d="M88 48 L108 48" stroke="#0d5bd9" stroke-width="2"/>
        <circle cx="132" cy="48" r="18" fill="#fef3c7" stroke="#d97706" stroke-width="2" stroke-dasharray="4 2"/>
        <circle cx="164" cy="48" r="13" fill="#e2e8f0" stroke="#475569" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="118" y="84" font-size="8" fill="#92400e">減速ギア (30:1)</text>
        <path d="M180 48 L202 48" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="204" y="24" width="98" height="48" rx="6" fill="#eff6ff" stroke="#2563eb"/>
        <text x="216" y="44" font-size="8.5" font-weight="bold" fill="#1d4ed8">偏心チャージカム</text>
        <text x="213" y="58" font-size="8" fill="#1e40af">約0.03秒でバネ再装填</text>
        <text x="48" y="104" font-size="8.5" fill="#334155">1枚撮るたびに自動巻き上げ → 秒間 10–15 コマ連写を実現!</text>
      `);

    case 'shutter_opt_sensor':
      return wrap(`
        <!-- IR Photo-Interrupter Closed-Loop Calibration -->
        <rect x="22" y="22" width="44" height="52" rx="4" fill="#1e293b"/>
        <text x="29" y="44" font-size="8" fill="#fda4af">940nm</text>
        <text x="30" y="56" font-size="8" fill="#fff">IR LED</text>
        <!-- IR beam -->
        <line x1="66" y1="48" x2="132" y2="48" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 2"/>
        <!-- Curtain passing through beam -->
        <rect x="94" y="20" width="10" height="58" fill="#334155" stroke="#eab308"/>
        <rect x="132" y="22" width="44" height="52" rx="4" fill="#334155"/>
        <text x="138" y="45" font-size="8" fill="#e2e8f0">受光素子</text>
        <text x="142" y="58" font-size="8" fill="#38bdf8">時刻計測</text>
        <!-- Feedback arrow to CPU -->
        <path d="M176 48 L204 48" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="206" y="22" width="96" height="52" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="216" y="42" font-size="8.5" font-weight="bold" fill="#1d4ed8">自動補正 CPU</text>
        <text x="214" y="56" font-size="7.5" fill="#1e40af">寒冷・摩耗ズレを</text>
        <text x="214" y="67" font-size="7.5" fill="#1e40af">毎回 μs 単位修正!</text>
        <text x="34" y="100" font-size="8.5" fill="#be123c">羽根が赤外線を遮る時刻を実測 → 50万回まで精度維持</text>
      `);

    case 'shutter_damper':
      return wrap(`
        <!-- Left: Rebound Brake Damper -->
        <rect x="16" y="16" width="136" height="86" rx="5" fill="#fff5f5" stroke="#fecaca"/>
        <rect x="30" y="34" width="52" height="12" fill="#1f242d"/>
        <path d="M84 40 L106 40" stroke="#dc2626" stroke-width="2"/>
        <polygon points="110,40 102,35 102,45" fill="#dc2626"/>
        <rect x="112" y="24" width="24" height="44" rx="4" fill="#c44536"/>
        <text x="28" y="64" font-size="8" fill="#7f1d1d">時速40kmを跳ね返り</text>
        <text x="28" y="76" font-size="8" font-weight="bold" fill="#b91c1c">ゼロで吸収（e → 0）</text>
        <text x="28" y="94" font-size="8.5" font-weight="bold" fill="#991b1b">バウンド防止ブレーキ</text>
        <!-- Right: Floating Anti-Vib Silicone Mount -->
        <rect x="168" y="16" width="136" height="86" rx="5" fill="#eff6ff" stroke="#bfdbfe"/>
        <rect x="182" y="30" width="108" height="36" rx="4" fill="#334155"/>
        <circle cx="192" cy="40" r="6" fill="#2563eb"/>
        <circle cx="280" cy="40" r="6" fill="#2563eb"/>
        <circle cx="192" cy="56" r="6" fill="#2563eb"/>
        <circle cx="280" cy="56" r="6" fill="#2563eb"/>
        <text x="206" y="51" font-size="8" fill="#ffffff">ゴム懸架で絶縁</text>
        <text x="180" y="82" font-size="8" fill="#1e40af">IBIS・ボディへの微ブレ遮断</text>
        <text x="178" y="94" font-size="8.5" font-weight="bold" fill="#1d4ed8">4点フローティング防振</text>
      `);

    case 'mb_vapor':
      return wrap(`
        <!-- Two-Phase Copper Vapor Chamber Cross-Section -->
        <rect x="22" y="18" width="276" height="44" rx="5" fill="#fff7ed" stroke="#c2410c" stroke-width="2"/>
        <!-- Capillary copper wick lining -->
        <rect x="26" y="54" width="268" height="5" fill="#ea580c" opacity="0.45"/>
        <rect x="26" y="21" width="268" height="4" fill="#ea580c" opacity="0.35"/>
        <!-- Vapor arrows rising from hot ISP center to cool ends -->
        <path d="M160 52 L160 32 L54 32 M160 32 L266 32" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 2"/>
        <polygon points="50,32 58,28 58,36" fill="#dc2626"/>
        <polygon points="270,32 262,28 262,36" fill="#dc2626"/>
        <!-- Liquid return along wick -->
        <path d="M44 56 L146 56 M276 56 L174 56" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <!-- TIM pad & 4nm ISP beneath -->
        <rect x="116" y="62" width="88" height="10" fill="#f472b6"/>
        <rect x="122" y="72" width="76" height="20" rx="2" fill="#0f766e"/>
        <text x="130" y="85" font-size="8.5" font-weight="bold" fill="#fff">4nm ISP 発熱源</text>
        <text x="68" y="29" font-size="8" font-weight="bold" fill="#b91c1c">蒸気（高速拡散）</text>
        <text x="192" y="29" font-size="8" font-weight="bold" fill="#b91c1c">潜熱輸送 k≈10,000</text>
        <text x="48" y="49" font-size="7.5" fill="#0369a1">凝縮液→毛細管還流</text>
        <text x="210" y="71" font-size="7.5" fill="#be185d">ピンク TIM パッド</text>
        <text x="58" y="108" font-size="8.5" fill="#334155">密閉二相蒸発サイクル：ファンレスで 8K60p 連続放熱!</text>
      `);

    case 'mb_emi':
      return wrap(`
        <!-- Multi-Compartment Faraday Cage -->
        <rect x="24" y="22" width="272" height="62" rx="4" fill="#f8fafc" stroke="#475569" stroke-width="2.4"/>
        <line x1="114" y1="22" x2="114" y2="84" stroke="#475569" stroke-width="2.4"/>
        <line x1="206" y1="22" x2="206" y2="84" stroke="#475569" stroke-width="2.4"/>
        <rect x="44" y="48" width="50" height="26" rx="2" fill="#0f766e"/>
        <text x="54" y="64" font-size="8.5" fill="#fff">ISP SoC</text>
        <rect x="136" y="48" width="50" height="26" rx="2" fill="#6d28d9"/>
        <text x="147" y="64" font-size="8.5" fill="#fff">AI NPU</text>
        <rect x="226" y="48" width="50" height="26" rx="2" fill="#0284c7"/>
        <text x="234" y="64" font-size="8.5" fill="#fff">Wi-Fi 6E</text>
        <!-- EMI waves bounced back by walls -->
        <path d="M96 42 Q103 36 110 42" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <path d="M222 42 Q215 36 209 42" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <!-- Ground pins -->
        <rect x="24" y="84" width="272" height="8" fill="#e2b648"/>
        <text x="96" y="91" font-size="7.5" font-weight="bold" fill="#1e293b">低インピーダンス多点グラウンド接地 (GND)</text>
        <text x="54" y="108" font-size="8.5" fill="#334155">洋白金属ファラデーケージ：高周波ノイズを 60 dB 以上遮断</text>
      `);

    case 'mb_ihs':
      return wrap(`
        <!-- Hotspot Heat Spreading through Copper IHS -->
        <rect x="40" y="18" width="240" height="22" rx="3" fill="#d97d4e" stroke="#9a3412"/>
        <text x="86" y="33" font-size="9" font-weight="bold" fill="#fff">ニッケルメッキ銅 IHS（広域熱拡散）</text>
        <rect x="96" y="40" width="128" height="8" fill="#62a8d8"/>
        <rect x="104" y="48" width="112" height="26" rx="2" fill="#0f766e"/>
        <rect x="142" y="52" width="36" height="18" rx="2" fill="#ef4444" opacity="0.85"/>
        <text x="146" y="64" font-size="8" font-weight="bold" fill="#fff">局所熱</text>
        <!-- Spreading arrows -->
        <path d="M160 50 L160 36 M160 36 L82 22 M160 36 L238 22" fill="none" stroke="#fef08a" stroke-width="2"/>
        <rect x="64" y="74" width="192" height="12" fill="#164a41"/>
        <text x="98" y="83" font-size="7.5" fill="#d1fae5">FC-BGA パッケージ基板</text>
        <text x="48" y="104" font-size="8.5" fill="#334155">局所 50 W/cm² 超の熱を銅蓋で水平拡散＆ダイ割れ防止</text>
      `);

    case 'mb_isp_die':
      return wrap(`
        <!-- Dual-Stream 16-bit Linear RAW ISP Pipeline -->
        <rect x="12" y="36" width="52" height="40" rx="4" fill="#cffafe" stroke="#0891b2"/>
        <text x="17" y="53" font-size="8" font-weight="bold" fill="#155e75">SLVS-EC</text>
        <text x="17" y="65" font-size="7.5" fill="#0e7490">160 Gbps</text>
        <path d="M64 56 L82 56" stroke="#0891b2" stroke-width="2"/>
        <rect x="82" y="28" width="76" height="56" rx="5" fill="#0f766e"/>
        <text x="91" y="45" font-size="8.5" font-weight="bold" fill="#fff">16-bit RAW</text>
        <text x="90" y="58" font-size="7.5" fill="#ccfbf1">デモザイク</text>
        <text x="90" y="70" font-size="7.5" fill="#ccfbf1">3D-LUT 色変換</text>
        <!-- Dual Stream Split -->
        <path d="M158 44 L184 32 M158 68 L184 80" stroke="#0d5bd9" stroke-width="2.2"/>
        <rect x="184" y="16" width="122" height="32" rx="4" fill="#1d4ed8"/>
        <text x="192" y="30" font-size="8" font-weight="bold" fill="#fff">① 記録ストリーム</text>
        <text x="192" y="42" font-size="7.5" fill="#dbeafe">8K60p / 120fps RAW</text>
        <rect x="184" y="62" width="122" height="32" rx="4" fill="#0284c7"/>
        <text x="192" y="76" font-size="8" font-weight="bold" fill="#fff">② EVF専用ストリーム</text>
        <text x="192" y="88" font-size="7.5" fill="#e0f2fe">遅延ゼロ・暗転なし表示!</text>
        <text x="48" y="109" font-size="8.5" fill="#334155">デュアルストリーム構造で連写中も完全ブラックアウトフリー</text>
      `);

    case 'mb_interposer':
      return wrap(`
        <!-- Flip-Chip BGA Cross Section -->
        <rect x="76" y="14" width="168" height="20" rx="2" fill="#0f766e"/>
        <text x="112" y="27" font-size="8.5" font-weight="bold" fill="#fff">4nm ISP シリコンダイ</text>
        <!-- Underfill + Cu Pillar Micro-Bumps -->
        <rect x="72" y="34" width="176" height="14" fill="#334155" opacity="0.35"/>
        ${[88, 106, 124, 142, 160, 178, 196, 214, 232]
          .map((x) => `<rect x="${x - 3}" y="34" width="6" height="14" fill="#d87342"/>`)
          .join('')}
        <text x="252" y="44" font-size="7.5" fill="#9a3412">Cuマイクロ</text>
        <!-- ABF RDL Interposer Substrate -->
        <rect x="44" y="48" width="232" height="22" rx="2" fill="#164a41"/>
        <text x="80" y="62" font-size="8.5" fill="#d1fae5">多層 ABF ビルドアップ再配線基板 (RDL)</text>
        <!-- SnAgCu Solder Balls -->
        ${[64, 96, 128, 160, 192, 224, 256]
          .map((x) => `<circle cx="${x}" cy="78" r="6.5" fill="#cbd5e1" stroke="#475569"/>`)
          .join('')}
        <!-- HDI Mainboard -->
        <rect x="24" y="86" width="272" height="14" rx="2" fill="#0e5a44"/>
        <text x="72" y="96" font-size="8" fill="#fef08a">12層 HDI メインマザーボード (0.4 mm ピッチ)</text>
        <text x="68" y="112" font-size="8" fill="#334155">直下接続で寄生インダクタンス約 1/10・アンダーフィル保護</text>
      `);

    case 'mb_ai_npu':
      return wrap(`
        <!-- 2D Systolic Array MAC Grid -->
        <rect x="18" y="16" width="124" height="78" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        ${[0, 1, 2, 3]
          .flatMap((r) =>
            [0, 1, 2, 3].map(
              (c) =>
                `<rect x="${30 + c * 26}" y="${24 + r * 16}" width="20" height="12" rx="2" fill="#6d28d9" opacity="${(0.55 + ((r + c) % 4) * 0.14).toFixed(2)}"/>`
            )
          )
          .join('')}
        <text x="24" y="106" font-size="8.5" font-weight="bold" fill="#5b21b6">2D シストリックアレイ (MAC)</text>
        <!-- Flow arrows into AI outputs -->
        <path d="M146 54 L168 54" stroke="#7c3aed" stroke-width="2.4"/>
        <polygon points="172,54 164,49 164,59" fill="#7c3aed"/>
        <rect x="174" y="16" width="130" height="24" rx="4" fill="#ede9fe" stroke="#8b5cf6"/>
        <text x="184" y="31" font-size="8.5" font-weight="bold" fill="#4c1d95">骨格姿勢推定 AF (120Hz)</text>
        <rect x="174" y="44" width="130" height="24" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="184" y="59" font-size="8.5" font-weight="bold" fill="#075985">カメラ内 AI ノイズ低減</text>
        <rect x="174" y="72" width="130" height="24" rx="4" fill="#fef3c7" stroke="#d97706"/>
        <text x="184" y="87" font-size="8.5" font-weight="bold" fill="#92400e">カメラ内 4× 超解像 (96MP)</text>
        <text x="176" y="108" font-size="7.5" fill="#475569">INT8 量子化推論で高効率・超低遅延</text>
      `);

    case 'mb_lpddr5x':
      return wrap(`
        <!-- Pre-Capture Ring Buffer Diagram -->
        <circle cx="88" cy="54" r="32" fill="none" stroke="#cbd5e1" stroke-width="10"/>
        <path d="M88 22 A32 32 0 1 1 58 66" fill="none" stroke="#2563eb" stroke-width="10" stroke-linecap="round"/>
        <text x="64" y="51" font-size="8.5" font-weight="bold" fill="#1d4ed8">リング</text>
        <text x="62" y="63" font-size="8" fill="#1e40af">バッファ</text>
        <text x="34" y="104" font-size="8.5" fill="#1d4ed8">LPDDR5X (68 GB/s)</text>
        <!-- Arrow to CFexpress on shutter press -->
        <path d="M126 54 L172 54" stroke="#d97706" stroke-width="2.4"/>
        <polygon points="176,54 168,49 168,59" fill="#d97706"/>
        <text x="128" y="44" font-size="8" font-weight="bold" fill="#b45309">全押し!</text>
        <rect x="178" y="20" width="126" height="68" rx="6" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="188" y="38" font-size="9" font-weight="bold" fill="#92400e">プリ撮影タイムマシン</text>
        <text x="188" y="54" font-size="8" fill="#334155">半押し中に最新1秒分の</text>
        <text x="188" y="66" font-size="8" fill="#334155">RAWを常時メモリ保持し</text>
        <text x="188" y="78" font-size="8" font-weight="bold" fill="#b45309">最大1秒前まで遡及保存!</text>
      `);

    case 'mb_pmic':
      return wrap(`
        <!-- Multi-Phase Buck Ripple Cancellation -->
        <rect x="16" y="20" width="60" height="58" rx="4" fill="#fef3c7" stroke="#d97706"/>
        <text x="24" y="44" font-size="8.5" font-weight="bold" fill="#92400e">電池</text>
        <text x="24" y="58" font-size="9" font-weight="bold" fill="#b45309">7.2 V</text>
        <path d="M76 49 L98 49" stroke="#475569" stroke-width="2"/>
        <!-- 4-phase shifted waves -->
        <rect x="100" y="18" width="118" height="62" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <path d="M106 42 L120 26 L134 42 L148 26 L162 42 L176 26 L190 42 L204 26" fill="none" stroke="#93c5fd" stroke-width="1.4"/>
        <path d="M106 26 L120 42 L134 26 L148 42 L162 26 L176 42 L190 26 L204 42" fill="none" stroke="#60a5fa" stroke-width="1.4"/>
        <line x1="106" y1="62" x2="210" y2="62" stroke="#0d5bd9" stroke-width="2.6"/>
        <text x="112" y="74" font-size="7.5" font-weight="bold" fill="#0d5bd9">合成出力：リップル &lt;10mV!</text>
        <path d="M218 49 L238 49" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="240" y="20" width="66" height="58" rx="4" fill="#eff6ff" stroke="#2563eb"/>
        <text x="248" y="42" font-size="8.5" font-weight="bold" fill="#1d4ed8">4nm ISP</text>
        <text x="248" y="57" font-size="9" font-weight="bold" fill="#0f172a">0.75 V</text>
        <text x="250" y="69" font-size="7.5" fill="#1e40af">効率 95%</text>
        <text x="36" y="102" font-size="8.5" fill="#334155">多相同期整流（90°位相差）で波を相殺し鏡のように安定した給電</text>
      `);

    case 'mb_cfexpress':
      return wrap(`
        <!-- Storage Bandwidth Bar Comparison -->
        <text x="18" y="28" font-size="8.5" fill="#475569">SD UHS-II</text>
        <rect x="108" y="18" width="22" height="14" rx="2" fill="#94a3b8"/>
        <text x="136" y="29" font-size="8.5" fill="#475569">312 MB/s</text>

        <text x="18" y="54" font-size="8.5" fill="#334155">CFexpress 2.0 B</text>
        <rect x="108" y="44" width="96" height="14" rx="2" fill="#0284c7"/>
        <text x="210" y="55" font-size="8.5" fill="#0369a1">2,000 MB/s</text>

        <text x="18" y="80" font-size="8.5" font-weight="bold" fill="#b45309">CFexpress 4.0 B</text>
        <rect x="108" y="70" width="192" height="16" rx="3" fill="#f59e0b"/>
        <text x="172" y="81" font-size="8.5" font-weight="bold" fill="#fff">4,000 MB/s (12.8×!)</text>

        <text x="26" y="104" font-size="8.5" fill="#334155">PCIe Gen4 ×2 / NVMe 1.4c 直結 → 8K60p RAW ＆ 120fps無限連写</text>
      `);

    case 'mb_imu_mcu':
      return wrap(`
        <!-- 6-Axis Quartz IMU + Coordinated 8.5-Stop IBIS/OIS -->
        <rect x="16" y="24" width="84" height="58" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="24" y="42" font-size="8.5" font-weight="bold" fill="#854d0e">6軸水晶IMU</text>
        <text x="24" y="56" font-size="7.5" fill="#713f12">コリオリ力検出</text>
        <text x="24" y="69" font-size="8" font-weight="bold" fill="#a16207">2,000 Hz計測</text>
        <path d="M100 53 L122 53" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="122" y="28" width="64" height="50" rx="5" fill="#1e293b"/>
        <text x="131" y="48" font-size="8.5" font-weight="bold" fill="#38bdf8">制御MCU</text>
        <text x="130" y="63" font-size="7.5" fill="#e2e8f0">PID最適配分</text>
        <path d="M186 42 L208 32 M186 64 L208 74" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="210" y="16" width="96" height="30" rx="4" fill="#dbeafe" stroke="#2563eb"/>
        <text x="218" y="34" font-size="8.5" font-weight="bold" fill="#1d4ed8">ボディ 5軸IBIS</text>
        <rect x="210" y="58" width="96" height="30" rx="4" fill="#dcfce7" stroke="#16a34a"/>
        <text x="218" y="76" font-size="8.5" font-weight="bold" fill="#15803d">レンズ側 OIS</text>
        <text x="48" y="106" font-size="8.5" fill="#334155">ボディ＋レンズ協調制御で最大 8.5 段の手ブレ補正を実現!</text>
      `);

    case 'mb_security_clock':
      return wrap(`
        <!-- Left: C2PA Cryptographic Signing -->
        <rect x="14" y="16" width="144" height="86" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="24" y="33" font-size="8.5" font-weight="bold" fill="#166534">C2PA 真正性署名チップ</text>
        <rect x="24" y="42" width="44" height="24" rx="3" fill="#1e293b"/>
        <text x="31" y="57" font-size="8" fill="#fff">RAW</text>
        <path d="M68 54 L86 54" stroke="#16a34a" stroke-width="2"/>
        <rect x="86" y="42" width="62" height="24" rx="3" fill="#16a34a"/>
        <text x="92" y="57" font-size="8" font-weight="bold" fill="#fff">ECDSA署名</text>
        <text x="22" y="82" font-size="7.5" fill="#15803d">撮影瞬間に秘密鍵で電子印</text>
        <text x="22" y="94" font-size="7.5" fill="#15803d">AI偽造・改ざんを即検出!</text>
        <!-- Right: TCXO ±0.5 ppm Clock -->
        <rect x="166" y="16" width="140" height="86" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="176" y="33" font-size="8.5" font-weight="bold" fill="#92400e">TCXO ±0.5 ppm 水晶</text>
        <path d="M178 72 Q218 42 292 78" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="3 2"/>
        <line x1="178" y1="58" x2="292" y2="58" stroke="#d97706" stroke-width="2.4"/>
        <text x="180" y="51" font-size="7.5" font-weight="bold" fill="#b45309">温度補償で周波数フラット!</text>
        <text x="176" y="93" font-size="7.5" fill="#78350f">8K長時間収録も音ズレゼロ</text>
      `);

    case 'mb_io_ports':
      return wrap(`
        <!-- External High-Speed I/O + ESD TVS Protection -->
        <rect x="18" y="14" width="96" height="20" rx="3" fill="#334155"/>
        <text x="26" y="27" font-size="8" fill="#fff">2.5GBASE-T LAN</text>
        <rect x="18" y="38" width="96" height="20" rx="3" fill="#1d4ed8"/>
        <text x="26" y="51" font-size="8" fill="#fff">HDMI 2.1 (48Gbps)</text>
        <rect x="18" y="62" width="96" height="20" rx="3" fill="#0f766e"/>
        <text x="26" y="75" font-size="8" fill="#fff">USB-C 10Gbps PD</text>
        <rect x="18" y="86" width="96" height="20" rx="3" fill="#b45309"/>
        <text x="26" y="99" font-size="8" fill="#fff">3.5mm 24bit 音声</text>
        <!-- ESD Surge Shield Wall -->
        <line x1="114" y1="48" x2="218" y2="48" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="136" y="18" width="56" height="84" rx="4" fill="#fef2f2" stroke="#dc2626" stroke-dasharray="3 2"/>
        <text x="142" y="42" font-size="8" font-weight="bold" fill="#b91c1c">TVS避雷</text>
        <text x="144" y="55" font-size="7.5" fill="#dc2626">±15 kV</text>
        <text x="142" y="67" font-size="7.5" fill="#dc2626">静電気を</text>
        <text x="143" y="79" font-size="7.5" fill="#dc2626">GNDへ逃す</text>
        <rect x="218" y="26" width="84" height="60" rx="5" fill="#0f766e"/>
        <text x="234" y="52" font-size="9" font-weight="bold" fill="#fff">4nm ISP</text>
        <text x="232" y="67" font-size="8" fill="#ccfbf1">安全に保護!</text>
      `);

    case 'mb_rf_wifi':
      return wrap(`
        <!-- 2x2 MIMO Tri-Band Wi-Fi 6E/7 Coax Antenna Architecture -->
        <rect x="18" y="24" width="86" height="62" rx="5" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="28" y="44" font-size="8.5" font-weight="bold" fill="#0369a1">Wi-Fi 6E/7</text>
        <text x="28" y="58" font-size="8" fill="#075985">2.4/5/6 GHz</text>
        <text x="28" y="72" font-size="8" fill="#075985">+ BT 5.3 SiP</text>
        <!-- Dual 50-ohm Coax Cables -->
        <path d="M104 40 C138 40, 146 28, 182 28" fill="none" stroke="#d27a44" stroke-width="3"/>
        <path d="M104 70 C138 70, 146 82, 182 82" fill="none" stroke="#d27a44" stroke-width="3"/>
        <text x="116" y="58" font-size="7.5" font-weight="bold" fill="#9a3412">50Ω同軸×2</text>
        <!-- Dual MIMO Antennas -->
        <rect x="182" y="18" width="44" height="22" rx="3" fill="#1e293b"/>
        <text x="189" y="32" font-size="8" fill="#38bdf8">ANT 1</text>
        <rect x="182" y="70" width="44" height="22" rx="3" fill="#1e293b"/>
        <text x="189" y="84" font-size="8" fill="#38bdf8">ANT 2</text>
        <!-- 2x2 MIMO Waves -->
        <path d="M236 22 Q246 29 236 36 M244 18 Q258 29 244 40" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <path d="M236 74 Q246 81 236 88 M244 70 Q258 81 244 92" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <text x="256" y="54" font-size="8.5" font-weight="bold" fill="#0369a1">2×2 MIMO</text>
        <text x="256" y="67" font-size="7.5" fill="#475569">高速FTP送信</text>
        <text x="28" y="106" font-size="8" fill="#334155">金属ボディ外側の樹脂窓アンテナへ同軸給電し電波を空間多重</text>
      `);

    case 'mb_hdi_pcb':
      return wrap(`
        <!-- 12-Layer Any-Layer HDI Microvia Cross Section -->
        <rect x="24" y="16" width="272" height="72" rx="3" fill="#124939" stroke="#0e3b2e"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
          .map((i) => {
            const y = 21 + i * 5.6;
            const col = i === 1 || i === 4 || i === 7 || i === 10 ? '#eab308' : '#d97742';
            return `<rect x="28" y="${y.toFixed(1)}" width="264" height="2.2" fill="${col}"/>`;
          })
          .join('')}
        <!-- Stacked UV Laser Copper-Filled Microvias (Any-Layer!) -->
        <rect x="86" y="21" width="7" height="24" fill="#facc15" stroke="#1e293b" stroke-width="0.6"/>
        <rect x="136" y="38" width="7" height="28" fill="#facc15" stroke="#1e293b" stroke-width="0.6"/>
        <rect x="212" y="21" width="7" height="62" fill="#facc15" stroke="#1e293b" stroke-width="0.6"/>
        <text x="26" y="101" font-size="8.5" font-weight="bold" fill="#0e5a44">12層エニーレイヤーHDI：直径50μmレーザー銅充填ビアで任意層直結</text>
        <text x="58" y="113" font-size="8" fill="#475569">SLVS-EC 100Ω ＆ PCIe Gen4 85Ω 等長差動インピーダンス整合</text>
      `);

    case 'mb_b2b':
      return wrap(`
        <!-- G-S-S-G Differential Shielded Pinout + ZIF Flip-Lock -->
        <rect x="16" y="18" width="144" height="78" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="26" y="34" font-size="8.5" font-weight="bold" fill="#0f172a">80ピン G-S-S-G 差動配列</text>
        ${['G', 'S+', 'S−', 'G', 'S+', 'S−', 'G']
          .map((lbl, idx) => {
            const x = 24 + idx * 19;
            const fill = lbl === 'G' ? '#475569' : '#0284c7';
            return `<rect x="${x}" y="44" width="15" height="24" rx="2" fill="${fill}"/><text x="${x + 3}" y="59" font-size="7.5" fill="#fff">${lbl}</text>`;
          })
          .join('')}
        <text x="24" y="85" font-size="7.5" fill="#475569">信号対をGNDで挟み160Gbps保護</text>
        <!-- Right: ZIF Flip Lock -->
        <rect x="170" y="18" width="136" height="78" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="180" y="34" font-size="8.5" font-weight="bold" fill="#92400e">ZIF フリップロック</text>
        <rect x="184" y="62" width="108" height="10" fill="#c76414"/>
        <rect x="206" y="46" width="64" height="16" rx="2" fill="#1e293b"/>
        <text x="215" y="57" font-size="7.5" fill="#fde047">押え蓋ロック</text>
        <text x="180" y="86" font-size="7.5" fill="#78350f">EVF/LCD/レンズ等 全12系統</text>
        <text x="64" y="110" font-size="8" fill="#334155">0.3mm狭ピッチ金端子でカメラ全身の神経リボンを確実圧接</text>
      `);

    case 'mb_chassis':
      return wrap(`
        <!-- Thermal Isolation Wall between Sensor Bay and ISP Bay -->
        <rect x="16" y="20" width="96" height="72" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="26" y="40" font-size="8.5" font-weight="bold" fill="#1d4ed8">前面：センサー室</text>
        <text x="26" y="55" font-size="7.5" fill="#1e40af">低温維持が命!</text>
        <text x="26" y="68" font-size="7.5" fill="#dc2626">+7℃で暗電流2倍</text>
        <text x="26" y="82" font-size="7.5" fill="#1e40af">前面へ独立放熱</text>
        <!-- Magnesium Mid-Frame Barrier -->
        <rect x="126" y="14" width="24" height="84" rx="3" fill="#64748b" stroke="#1e293b"/>
        <text x="133" y="44" font-size="8" font-weight="bold" fill="#fff" writing-mode="tb">マグネシウム遮熱壁</text>
        <!-- Rear ISP Bay -->
        <rect x="164" y="20" width="140" height="72" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="174" y="40" font-size="8.5" font-weight="bold" fill="#c2410c">背面：ISPメイン基板室</text>
        <text x="174" y="55" font-size="7.5" fill="#9a3412">8K処理で高温 (60–85℃)</text>
        <path d="M180 72 L288 72" stroke="#ea580c" stroke-width="2.2"/>
        <polygon points="292,72 284,67 284,77" fill="#ea580c"/>
        <text x="178" y="85" font-size="7.5" font-weight="bold" fill="#c2410c">背面ベイパーチャンバーへ逃がす!</text>
        <text x="48" y="110" font-size="8" fill="#334155">高剛性マグネシウム骨格＋熱分離構造で高画質と8K連続収録を両立</text>
      `);

    // =========================================================================
    // EVF Optical & Eye-Tracking Anatomy Schematics (14 bespoke diagrams)
    // =========================================================================
    case 'evf_eyecup':
      return wrap(`
        <!-- Eyepiece Lens + Silicone Eyecup + 25mm High Eyepoint + Spectacles -->
        <rect x="24" y="28" width="16" height="58" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="1.4"/>
        <text x="16" y="98" font-size="7.5" fill="#0369a1">接眼最終面</text>
        <!-- Deep Eyecup Shroud -->
        <path d="M40 24 L82 14 L82 26 L48 34 Z" fill="#334155"/>
        <path d="M40 90 L82 100 L82 88 L48 80 Z" fill="#334155"/>
        <text x="50" y="12" font-size="8" font-weight="bold" fill="#1e293b">深型遮光カップ</text>
        <!-- Stray sunlight blocked -->
        <path d="M98 10 L74 20" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="98" y="16" font-size="7.5" fill="#d97706">外光遮断!</text>
        <!-- 41° FoV Ray Cone -->
        <polygon points="40,36 40,78 196,57" fill="rgba(14,165,233,0.16)" stroke="#0284c7" stroke-width="1.3"/>
        <line x1="40" y1="88" x2="196" y2="88" stroke="#0f172a" stroke-width="1.2" stroke-dasharray="3 2"/>
        <text x="88" y="84" font-size="8.5" font-weight="bold" fill="#0f172a">ハイアイポイント 25 mm</text>
        <!-- Eyeglasses + Human Eye -->
        <line x1="158" y1="26" x2="158" y2="86" stroke="#64748b" stroke-width="2.4"/>
        <text x="148" y="22" font-size="7.5" fill="#475569">眼鏡OK</text>
        <path d="M196 57 Q226 30 264 57 Q226 84 196 57 Z" fill="#f8fafc" stroke="#1e293b" stroke-width="1.6"/>
        <circle cx="212" cy="57" r="9" fill="#0284c7" opacity="0.75"/>
        <circle cx="210" cy="57" r="4" fill="#0f172a"/>
        <text x="198" y="99" font-size="8" font-weight="bold" fill="#0284c7">射出瞳・対角視野角 41°</text>
        <text x="56" y="114" font-size="8" fill="#334155">眼鏡着用でも四隅までケラレない25mmアイポイント＆迷光完全遮断</text>
      `);

    case 'evf_antifog':
      return wrap(`
        <!-- Cold Outside Air vs Warm Camera Interior with Airtight Dry-Air Gap -->
        <rect x="14" y="16" width="84" height="76" rx="5" fill="#eff6ff" stroke="#38bdf8"/>
        <text x="26" y="34" font-size="8.5" font-weight="bold" fill="#0369a1">外気 (極寒/多湿)</text>
        <text x="26" y="50" font-size="8" fill="#0284c7">−10℃ / 呼気</text>
        <text x="24" y="76" font-size="7.5" fill="#0369a1">フッ素撥水・撥油膜</text>
        <!-- Outer Glass -->
        <rect x="104" y="16" width="16" height="76" rx="2" fill="#7dd3fc" stroke="#0284c7" stroke-width="1.3"/>
        <!-- Airtight Dry Air Chamber -->
        <rect x="120" y="22" width="44" height="64" fill="#f8fafc" stroke="#64748b" stroke-dasharray="3 2"/>
        <rect x="120" y="16" width="44" height="6" fill="#1e293b"/>
        <rect x="120" y="86" width="44" height="6" fill="#1e293b"/>
        <text x="124" y="50" font-size="8" font-weight="bold" fill="#0f172a">乾燥空気</text>
        <text x="125" y="63" font-size="7.5" fill="#475569">密閉断熱</text>
        <!-- Inner Glass -->
        <rect x="164" y="16" width="16" height="76" rx="2" fill="#bae6fd" stroke="#0284c7" stroke-width="1.3"/>
        <!-- Camera EVF Optics Side -->
        <rect x="186" y="16" width="118" height="76" rx="5" fill="#fff7ed" stroke="#fb923c"/>
        <text x="196" y="36" font-size="8.5" font-weight="bold" fill="#c2410c">EVF光学室 (+30℃)</text>
        <text x="196" y="53" font-size="8" fill="#9a3412">内面温度 &gt; 露点温度</text>
        <text x="196" y="70" font-size="8.5" font-weight="bold" fill="#16a34a">⇒ 結露・曇りゼロ!</text>
        <text x="196" y="84" font-size="7.5" fill="#64748b">可視光＋850nm NIR透過</text>
        <text x="48" y="110" font-size="8" fill="#334155">断熱ペアガラス構造＋Oリング気密封止で寒冷地・雨天でも曇らない</text>
      `);

    case 'evf_eye_sensor':
      return wrap(`
        <!-- 940nm VCSEL ToF Proximity + Ambient Sensor -->
        <rect x="18" y="24" width="76" height="62" rx="6" fill="#1e293b"/>
        <circle cx="40" cy="46" r="9" fill="#e11d48" stroke="#facc15" stroke-width="1.4"/>
        <text x="27" y="66" font-size="7.5" fill="#fda4af">940nm発光</text>
        <circle cx="72" cy="46" r="9" fill="#0284c7" stroke="#facc15" stroke-width="1.4"/>
        <text x="60" y="66" font-size="7.5" fill="#7dd3fc">SPAD受光</text>
        <!-- Outgoing & Returning ToF Pulses -->
        <path d="M94 42 L182 42" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5 3"/>
        <polygon points="186,42 178,38 178,46" fill="#f43f5e"/>
        <path d="M182 58 L98 58" stroke="#0284c7" stroke-width="2" stroke-dasharray="5 3"/>
        <polygon points="94,58 102,54 102,62" fill="#0284c7"/>
        <text x="108" y="34" font-size="8" font-weight="bold" fill="#be123c">往復時間 Δt 測距</text>
        <text x="104" y="74" font-size="8" fill="#0369a1">距離 d &lt; 25mm で瞬時切替</text>
        <!-- Eye / Face Profile + Auto Brightness Badge -->
        <path d="M192 32 Q216 50 192 68" fill="none" stroke="#1e293b" stroke-width="2.2"/>
        <circle cx="198" cy="50" r="6" fill="#38bdf8"/>
        <rect x="220" y="22" width="88" height="66" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="228" y="40" font-size="8.5" font-weight="bold" fill="#166534">応答 &lt; 40 ms</text>
        <text x="228" y="55" font-size="7.5" fill="#15803d">EVF ON / LCD OFF</text>
        <text x="228" y="70" font-size="7.5" fill="#0369a1">環境照度センサーで</text>
        <text x="228" y="81" font-size="7.5" fill="#0369a1">4,000nit自動調光</text>
        <text x="48" y="110" font-size="8" fill="#334155">850nm視線AFと干渉しない940nm帯ToF測距＋周囲明るさ自動順応</text>
      `);

    case 'evf_ir_leds':
      return wrap(`
        <!-- 8-LED Ring Left + Corneal Purkinje Reflection Geometry Right -->
        <ellipse cx="78" cy="56" rx="50" ry="38" fill="#0f172a" stroke="#334155" stroke-width="2"/>
        <ellipse cx="78" cy="56" rx="34" ry="24" fill="#eff6ff" stroke="#94a3b8"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7]
          .map((i) => {
            const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
            const cx = (78 + Math.cos(a) * 42).toFixed(1);
            const cy = (56 + Math.sin(a) * 31).toFixed(1);
            return `<circle cx="${cx}" cy="${cy}" r="4.2" fill="#e11d48" stroke="#fde047" stroke-width="1"/>`;
          })
          .join('')}
        <text x="53" y="59" font-size="8" font-weight="bold" fill="#0369a1">850nm × 8灯</text>
        <!-- Right: Pupil Center vs Purkinje Glint Vector -->
        <rect x="148" y="14" width="156" height="82" rx="6" fill="#fff1f2" stroke="#fda4af"/>
        <circle cx="224" cy="52" r="24" fill="#fff" stroke="#1e293b" stroke-width="1.6"/>
        <circle cx="231" cy="49" r="10" fill="#0f172a"/>
        <circle cx="218" cy="53" r="3.4" fill="#e11d48"/>
        <line x1="218" y1="53" x2="231" y2="49" stroke="#f59e0b" stroke-width="2"/>
        <text x="156" y="28" font-size="8" font-weight="bold" fill="#be123c">角膜反射法 (PCCR)</text>
        <text x="156" y="86" font-size="7.5" fill="#9f1239">黒目中心と角膜反射点(赤)のズレ→視線!</text>
        <text x="54" y="111" font-size="8" fill="#334155">8方向からの安全850nm近赤外光で眼鏡越しでも瞳孔と角膜反射を捕捉</text>
      `);

    case 'evf_dichroic':
      return wrap(`
        <!-- 45° Dichroic Hot Mirror: Visible Straight Through, 850nm IR 90° Down! -->
        <!-- OLED Left -->
        <rect x="14" y="34" width="32" height="40" rx="3" fill="#2563eb"/>
        <text x="17" y="57" font-size="8" font-weight="bold" fill="#fff">OLED</text>
        <!-- Visible Light Passing Straight Through (Cyan/Gold) -->
        <line x1="46" y1="50" x2="256" y2="50" stroke="#0284c7" stroke-width="2.6"/>
        <polygon points="260,50 251,45 251,55" fill="#0284c7"/>
        <text x="50" y="38" font-size="8" font-weight="bold" fill="#0369a1">可視光 98.5% 透過</text>
        <!-- 45° Dichroic Mirror Glass -->
        <line x1="146" y1="22" x2="200" y2="76" stroke="#db2777" stroke-width="5" stroke-linecap="round"/>
        <line x1="146" y1="22" x2="200" y2="76" stroke="#fbcfe8" stroke-width="1.5"/>
        <text x="176" y="21" font-size="8" font-weight="bold" fill="#be185d">45° 誘電体多層膜</text>
        <!-- Eye on Right -->
        <path d="M266 54 Q284 38 304 54 Q284 70 266 54 Z" fill="#f8fafc" stroke="#1e293b" stroke-width="1.5"/>
        <circle cx="277" cy="54" r="5.5" fill="#0284c7"/>
        <!-- 850nm IR Reflecting 90° Downward! -->
        <line x1="264" y1="60" x2="178" y2="60" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 2"/>
        <line x1="178" y1="60" x2="178" y2="94" stroke="#e11d48" stroke-width="2.6"/>
        <polygon points="178,99 173,90 183,90" fill="#e11d48"/>
        <text x="188" y="88" font-size="8" font-weight="bold" fill="#be123c">850nm赤外線 95% 反射</text>
        <rect x="152" y="99" width="52" height="14" rx="2" fill="#7e22ce"/>
        <text x="157" y="109" font-size="7.5" fill="#fff">視線CMOSへ</text>
        <text x="14" y="108" font-size="7.5" fill="#475569">画質劣化ゼロで光路分離</text>
      `);

    case 'evf_gaze_cam':
      return wrap(`
        <!-- Vertical Cross-Section: 90° IR Beam -> Aspheric Relay Lens -> 850nm BPF -> 307K NIR CMOS -> AI NPU -->
        <line x1="68" y1="10" x2="68" y2="30" stroke="#e11d48" stroke-width="2.4"/>
        <polygon points="68,34 63,26 73,26" fill="#e11d48"/>
        <text x="82" y="24" font-size="8" font-weight="bold" fill="#be123c">90°反射された眼球赤外像</text>
        <!-- Relay Lens -->
        <ellipse cx="68" cy="44" rx="24" ry="7" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <text x="100" y="47" font-size="8" fill="#0369a1">非球面IRリレーレンズ</text>
        <!-- 850nm Bandpass Filter -->
        <rect x="44" y="58" width="48" height="7" rx="2" fill="#f43f5e" opacity="0.78"/>
        <text x="100" y="65" font-size="8" fill="#be123c">850nm狭帯域フィルター (外光遮断)</text>
        <!-- 307K-px NIR CMOS -->
        <rect x="38" y="74" width="60" height="14" rx="2" fill="#1e1b4b" stroke="#eab308" stroke-width="1.4"/>
        <text x="44" y="84" font-size="7.5" fill="#fde047">30.7万画素CMOS</text>
        <!-- Arrow to AI NPU -->
        <path d="M104 81 L176 81" stroke="#7c3aed" stroke-width="2.2"/>
        <polygon points="181,81 173,76 173,86" fill="#7c3aed"/>
        <rect x="184" y="68" width="122" height="28" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="192" y="80" font-size="8" font-weight="bold" fill="#5b21b6">AIアクセラレーター解析</text>
        <text x="192" y="91" font-size="7.5" fill="#6d28d9">2倍速でAF枠を視線先へ!</text>
        <text x="38" y="110" font-size="8" fill="#334155">メイン基板上端のEVF専用ノッチへ収容し、見るだけでピント位置を移動</text>
      `);

    case 'evf_lens_rear':
      return wrap(`
        <!-- Spherical vs Double-Aspheric Comparison (Distortion & Astigmatism) -->
        <rect x="16" y="16" width="126" height="76" rx="5" fill="#fff1f2" stroke="#fda4af"/>
        <text x="26" y="31" font-size="8" font-weight="bold" fill="#be123c">一般球面レンズ (周辺歪み)</text>
        <path d="M40 42 Q78 52 116 42 M40 80 Q78 70 116 80 M40 42 Q50 61 40 80 M116 42 Q106 61 116 80" fill="none" stroke="#e11d48" stroke-width="1.5"/>
        <text x="34" y="88" font-size="7.5" fill="#9f1239">糸巻き歪み・視線移動で像揺れ</text>
        <!-- Right: Double-Sided Aspheric G4 -->
        <rect x="156" y="16" width="150" height="76" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="166" y="31" font-size="8" font-weight="bold" fill="#0369a1">G4 大口径両面非球面 (GMo)</text>
        <rect x="182" y="42" width="96" height="36" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="214" y1="42" x2="214" y2="78" stroke="#38bdf8" stroke-width="1"/>
        <line x1="246" y1="42" x2="246" y2="78" stroke="#38bdf8" stroke-width="1"/>
        <text x="168" y="88" font-size="7.5" fill="#0369a1">視野角41°全域で直進・像揺れゼロ!</text>
        <text x="44" y="110" font-size="8" fill="#334155">高次非球面＋超低反射T*級コートにより0.90×大倍率と端までの切れを両立</text>
      `);

    case 'evf_lens_ed':
      return wrap(`
        <!-- Cemented ED Crown + High-Index Flint Doublet + Diopter Slide Arrows -->
        <!-- Left Doublet Cross Section -->
        <path d="M54 22 Q74 22 74 56 Q74 90 54 90 L44 90 Q54 56 44 22 Z" fill="#a5b4fc" stroke="#4f46e5" stroke-width="1.4"/>
        <path d="M74 22 Q98 56 74 90 Q82 56 74 22 Z" fill="#6ee7b7" stroke="#059669" stroke-width="1.4"/>
        <text x="26" y="16" font-size="7.5" font-weight="bold" fill="#4338ca">高分散凹(G2)</text>
        <text x="76" y="16" font-size="7.5" font-weight="bold" fill="#047857">ED低分散凸(G3)</text>
        <!-- R/G/B Rays Converging to Single Sharp Point (Zero Chromatic Aberration!) -->
        <line x1="94" y1="36" x2="216" y2="56" stroke="#ef4444" stroke-width="1.7"/>
        <line x1="96" y1="56" x2="216" y2="56" stroke="#10b981" stroke-width="1.7"/>
        <line x1="94" y1="76" x2="216" y2="56" stroke="#2563eb" stroke-width="1.7"/>
        <circle cx="216" cy="56" r="4.5" fill="#facc15" stroke="#0f172a" stroke-width="1.2"/>
        <text x="148" y="34" font-size="8" font-weight="bold" fill="#047857">R/G/B 完全一致(色収差ゼロ)</text>
        <!-- Diopter Movement Indicator -->
        <path d="M36 98 L104 98" stroke="#d97706" stroke-width="2.2"/>
        <polygon points="32,98 40,94 40,102" fill="#d97706"/>
        <polygon points="108,98 100,94 100,102" fill="#d97706"/>
        <text x="116" y="101" font-size="8" font-weight="bold" fill="#b45309">前後3.4mm移動 ⇒ 視度 −4.0 〜 +3.0 m⁻¹</text>
        <rect x="228" y="38" width="76" height="36" rx="4" fill="#fefce8" stroke="#eab308"/>
        <text x="234" y="53" font-size="7.5" font-weight="bold" fill="#854d0e">Δz = −f²·ΔD</text>
        <text x="234" y="66" font-size="7.5" fill="#a16207">裸眼くっきり</text>
      `);

    case 'evf_diopter':
      return wrap(`
        <!-- Pop-out Knurled Dial -> Gears -> Brass Lead Screw + Guide Rod + Anti-Backlash Spring -->
        <rect x="18" y="36" width="38" height="40" rx="5" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
        <line x1="26" y1="36" x2="26" y2="76" stroke="#94a3b8" stroke-width="1.2"/>
        <line x1="36" y1="36" x2="36" y2="76" stroke="#94a3b8" stroke-width="1.2"/>
        <line x1="46" y1="36" x2="46" y2="76" stroke="#94a3b8" stroke-width="1.2"/>
        <text x="16" y="90" font-size="7.5" font-weight="bold" fill="#1e293b">引出しロック</text>
        <!-- Lead Screw -->
        <rect x="56" y="51" width="144" height="10" rx="2" fill="#f59e0b" stroke="#b45309"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8]
          .map((i) => `<line x1="${66 + i * 15}" y1="51" x2="${72 + i * 15}" y2="61" stroke="#78350f" stroke-width="1.4"/>`)
          .join('')}
        <text x="86" y="44" font-size="8" font-weight="bold" fill="#b45309">真鍮リードスクリュー</text>
        <!-- Sliding Lens Carriage Nut + Anti-Backlash Spring -->
        <rect x="136" y="38" width="24" height="36" rx="3" fill="#64748b" stroke="#0f172a"/>
        <path d="M160 56 L168 48 L174 64 L180 48 L186 64 L194 56" fill="none" stroke="#0284c7" stroke-width="2"/>
        <text x="154" y="88" font-size="7.5" font-weight="bold" fill="#0369a1">予圧バネ(ガタ0)</text>
        <!-- Guide Rod -->
        <rect x="86" y="22" width="194" height="6" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="208" y="44" font-size="8" fill="#334155">2軸ガイドレール</text>
        <text x="208" y="58" font-size="7.5" fill="#475569">チルト公差 &lt; 0.02°</text>
        <text x="46" y="110" font-size="8" fill="#334155">回転をサブmm直進へ変換し、予圧スプリングとOリングでズレと水滴を防止</text>
      `);

    case 'evf_lens_field':
      return wrap(`
        <!-- Flat OLED -> Curved Petzval Error vs Flattened by G1 Field Flattener -->
        <rect x="20" y="24" width="12" height="62" rx="2" fill="#2563eb"/>
        <text x="12" y="98" font-size="7.5" font-weight="bold" fill="#1d4ed8">平面OLED</text>
        <!-- G1 Positive Meniscus Lens -->
        <path d="M68 20 Q84 55 68 90 Q96 55 68 20 Z" fill="#a5b4fc" stroke="#4f46e5" stroke-width="1.6"/>
        <text x="58" y="14" font-size="8" font-weight="bold" fill="#4338ca">G1 フィールドフラットナー</text>
        <!-- Telecentric Rays -->
        <path d="M32 32 L74 30 L178 24" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <path d="M32 55 L78 55 L178 55" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <path d="M32 78 L74 80 L178 86" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <!-- Uncorrected Curved Image Plane (dashed red) vs Corrected Flat Plane (solid green) -->
        <path d="M196 22 Q164 55 196 88" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 2"/>
        <text x="198" y="34" font-size="7.5" fill="#dc2626">像面湾曲 (端ボケ)</text>
        <line x1="218" y1="22" x2="218" y2="88" stroke="#16a34a" stroke-width="2.6"/>
        <text x="224" y="54" font-size="8" font-weight="bold" fill="#15803d">平坦結像!</text>
        <text x="224" y="68" font-size="7.5" fill="#166534">画面四隅まで</text>
        <text x="224" y="79" font-size="7.5" fill="#166534">シャープ</text>
        <text x="44" y="112" font-size="8" fill="#334155">ペッツバール和を補正し、OLEDのMLA指向光束を隅までムラなく集光</text>
      `);

    case 'evf_oled':
      return wrap(`
        <!-- Nano-Scale Cross-Section of 2-Stack Tandem WOLED on Silicon (OLEDoS) + Micro-Cavity + MLA! -->
        <!-- Bottom: Single-Crystal CMOS Silicon Backplane -->
        <rect x="24" y="84" width="272" height="15" rx="2" fill="#334155"/>
        <text x="64" y="95" font-size="8" font-weight="bold" fill="#f8fafc">単結晶シリコンCMOSバックプレーン (3,900 PPI駆動回路)</text>
        <!-- Reflective Al Anode -->
        <rect x="24" y="79" width="272" height="4" fill="#cbd5e1"/>
        <!-- 2-Stack Tandem OLED + CGL -->
        <rect x="24" y="61" width="272" height="17" fill="#fef3c7" stroke="#d97706" stroke-width="0.9"/>
        <text x="46" y="72.5" font-size="7.8" font-weight="bold" fill="#92400e">2スタック・タンデムWOLED ＋ 電荷発生層(CGL) 2倍効率</text>
        <!-- RGB Color Filter + Micro-Cavity Resonance -->
        <rect x="24" y="45" width="90" height="15" fill="#ef4444" opacity="0.88"/>
        <rect x="115" y="45" width="90" height="15" fill="#10b981" opacity="0.88"/>
        <rect x="206" y="45" width="90" height="15" fill="#3b82f6" opacity="0.88"/>
        <text x="46" y="56" font-size="8" font-weight="bold" fill="#fff">R 共振器</text>
        <text x="137" y="56" font-size="8" font-weight="bold" fill="#fff">G 共振器</text>
        <text x="228" y="56" font-size="8" font-weight="bold" fill="#fff">B 共振器</text>
        <!-- On-Chip Microlens Array (MLA) domes -->
        <path d="M24 45 Q69 24 114 45 M115 45 Q160 24 205 45 M206 45 Q251 24 296 45" fill="#bae6fd" opacity="0.72" stroke="#0284c7" stroke-width="1.4"/>
        <text x="50" y="20" font-size="8.5" font-weight="bold" fill="#0369a1">オンチップMLA (光取出し1.8倍 ⇒ 4,000 cd/m² &amp; DCI-P3)</text>
        <text x="46" y="112" font-size="8" fill="#334155">2階建て発光層＋波長別マイクロキャビティ＋極小レンズの三位一体構造</text>
      `);

    case 'evf_tcon':
      return wrap(`
        <!-- Dual-Stream Blackout-Free Pipeline: ISP -> Shielded FPC -> TCON Demura -> 240Hz OLED -->
        <rect x="14" y="28" width="64" height="52" rx="5" fill="#1d4ed8"/>
        <text x="24" y="50" font-size="8" font-weight="bold" fill="#fff">4nm ISP</text>
        <text x="20" y="64" font-size="7" fill="#bfdbfe">デュアル系統</text>
        <!-- Shielded FPC MIPI-DSI -->
        <path d="M78 54 L120 54" stroke="#d97706" stroke-width="6"/>
        <polygon points="124,54 116,48 116,60" fill="#b45309"/>
        <text x="80" y="42" font-size="7.5" font-weight="bold" fill="#b45309">22.6 Gbps</text>
        <text x="82" y="72" font-size="7" fill="#78350f">MIPI-DSI</text>
        <!-- TCON Board -->
        <rect x="126" y="22" width="96" height="64" rx="5" fill="#065f46" stroke="#10b981"/>
        <text x="136" y="40" font-size="8.5" font-weight="bold" fill="#fff">240Hz TCON</text>
        <text x="134" y="54" font-size="7.5" fill="#a7f3d0">・10bit HDR-PQ変換</text>
        <text x="134" y="66" font-size="7.5" fill="#a7f3d0">・944万画素Demura</text>
        <text x="134" y="78" font-size="7.5" fill="#fde047">・ELVDD/ELVSS電源</text>
        <!-- Output to OLED -->
        <path d="M222 54 L248 54" stroke="#0284c7" stroke-width="3"/>
        <polygon points="252,54 244,49 244,59" fill="#0284c7"/>
        <rect x="254" y="28" width="52" height="52" rx="5" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="261" y="50" font-size="8" font-weight="bold" fill="#38bdf8">240 fps</text>
        <text x="260" y="65" font-size="7" fill="#e2e8f0">暗転ゼロ</text>
        <text x="40" y="109" font-size="8" fill="#334155">連写中も一切ブラックアウトしない専用超低遅延パイプライン(&lt;5ms)</text>
      `);

    case 'evf_heatsink':
      return wrap(`
        <!-- Micro-OLED Rear Thermal Conduction Path: Si Wafer -> TIM -> Cu Plate -> Aluminum Fins -->
        <rect x="20" y="24" width="52" height="60" rx="4" fill="#1e3a8a"/>
        <text x="26" y="50" font-size="8" font-weight="bold" fill="#fff">OLED</text>
        <text x="26" y="64" font-size="7" fill="#bfdbfe">Si基板発熱</text>
        <!-- TIM Pad -->
        <rect x="76" y="28" width="18" height="52" rx="2" fill="#38bdf8"/>
        <text x="72" y="94" font-size="7.5" fill="#0369a1">TIMパッド</text>
        <!-- Copper Spreader -->
        <rect x="98" y="24" width="22" height="60" rx="2" fill="#d97742" stroke="#9a3412"/>
        <text x="98" y="18" font-size="7.5" font-weight="bold" fill="#c2410c">純銅板</text>
        <!-- Aluminum Cooling Fins -->
        ${[0, 1, 2, 3, 4]
          .map((i) => `<rect x="120" y="${26 + i * 12}" width="32" height="7" rx="1" fill="#475569"/>`)
          .join('')}
        <!-- Heat Flow Arrows -->
        <path d="M162 40 L196 40 M162 54 L196 54 M162 68 L196 68" stroke="#ea580c" stroke-width="2"/>
        <polygon points="200,54 192,49 192,59" fill="#ea580c"/>
        <!-- Benefit Box -->
        <rect x="206" y="22" width="100" height="64" rx="5" fill="#fff7ed" stroke="#fb923c"/>
        <text x="214" y="39" font-size="8" font-weight="bold" fill="#c2410c">ΔT = −15℃ 冷却</text>
        <text x="214" y="54" font-size="7.5" fill="#9a3412">・OLED寿命 約3倍</text>
        <text x="214" y="67" font-size="7.5" fill="#9a3412">・焼き付き防止</text>
        <text x="214" y="80" font-size="7.5" fill="#9a3412">・DCI-P3色温度安定</text>
        <text x="48" y="111" font-size="8" fill="#334155">4,000 cd/m²超高輝度駆動の発熱を純銅＆フィンで逃がし劣化を防止</text>
      `);

    case 'evf_housing':
      return wrap(`
        <!-- Sawtooth Internal Anti-Reflection Baffle Ridges Trapping Stray Light -->
        <rect x="22" y="16" width="276" height="10" fill="#4b5563"/>
        <rect x="22" y="84" width="276" height="10" fill="#4b5563"/>
        <!-- Knife-edge sawtooth baffles top & bottom -->
        ${[0, 1, 2, 3, 4, 5, 6]
          .map((i) => {
            const bx = 46 + i * 36;
            return `<polygon points="${bx},26 ${bx + 10},26 ${bx + 4},37" fill="#111827"/>
                    <polygon points="${bx},84 ${bx + 10},84 ${bx + 4},73" fill="#111827"/>`;
          })
          .join('')}
        <!-- Clean Central Optical Beam -->
        <line x1="26" y1="55" x2="292" y2="55" stroke="#0284c7" stroke-width="2.5"/>
        <text x="116" y="51" font-size="8.5" font-weight="bold" fill="#0369a1">正規映像光路 (偏心 ±10μm)</text>
        <!-- Stray light ray getting trapped & killed by sawtooth baffles -->
        <polyline points="38,44 84,32 94,26 116,35" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="3 2"/>
        <circle cx="116" cy="35" r="3.5" fill="#dc2626"/>
        <text x="124" y="38" font-size="7.5" font-weight="bold" fill="#b45309">迷光を多重反射で完全吸収!</text>
        <text x="36" y="111" font-size="8" fill="#334155">AZ91Dマグネシウム鏡筒＋鋸歯状遮光バッフルで黒浮きゼロ＆防塵防滴</text>
      `);

    // =========================================================================
    // Large-Diameter Mirrorless Lens Mount Schematics (12 bespoke diagrams)
    // =========================================================================
    case 'mount_flange':
      return wrap(`
        <!-- Legacy Narrow Long-Flange DSLR vs 55mm Large-Diameter Short-Flange Mirrorless -->
        <rect x="14" y="14" width="136" height="80" rx="5" fill="#fff1f2" stroke="#fda4af"/>
        <text x="22" y="28" font-size="8" font-weight="bold" fill="#be123c">旧一眼レフ (小径・長フランジ)</text>
        <line x1="36" y1="36" x2="36" y2="80" stroke="#64748b" stroke-width="3"/>
        <line x1="126" y1="44" x2="126" y2="72" stroke="#1e293b" stroke-width="3"/>
        <path d="M36 44 L126 44 M36 72 L126 72 M42 40 L126 44 M42 76 L126 72" stroke="#e11d48" stroke-width="1.3"/>
        <text x="48" y="88" font-size="7.5" fill="#9f1239">44mm / 46.5mm (斜入射大)</text>
        <!-- Right: 55mm Large Diameter Short Flange -->
        <rect x="160" y="14" width="146" height="80" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="168" y="28" font-size="8" font-weight="bold" fill="#0369a1">最新55mm大口径・短フランジ</text>
        <line x1="218" y1="34" x2="218" y2="82" stroke="#0284c7" stroke-width="3.5"/>
        <line x1="274" y1="42" x2="274" y2="74" stroke="#0f172a" stroke-width="3"/>
        <line x1="218" y1="44" x2="274" y2="44" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="218" y1="58" x2="274" y2="58" stroke="#f59e0b" stroke-width="1.8"/>
        <line x1="218" y1="72" x2="274" y2="72" stroke="#0284c7" stroke-width="1.8"/>
        <text x="168" y="88" font-size="7.5" font-weight="bold" fill="#0369a1">55mm / 16–20mm ⇒ 周辺直進＆F0.95!</text>
        <text x="42" y="110" font-size="8" fill="#334155">センサー対角43.3mmを呑み込む55mm大口径と±2μm平面度基準面</text>
      `);

    case 'mount_bolts':
      return wrap(`
        <!-- Cantilever Telephoto Bending Moment vs 6-Bolt High-Tensile Reinforcement -->
        <!-- Camera Mount Ring with 6 Bolts -->
        <circle cx="74" cy="54" r="34" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
        <circle cx="74" cy="54" r="24" fill="#fff" stroke="#64748b" stroke-width="1.4"/>
        ${[0, 60, 120, 180, 240, 300]
          .map((deg) => {
            const r = (deg * Math.PI) / 180;
            const cx = (74 + Math.cos(r) * 29).toFixed(1);
            const cy = (54 + Math.sin(r) * 29).toFixed(1);
            return `<circle cx="${cx}" cy="${cy}" r="3.6" fill="#0284c7" stroke="#0f172a" stroke-width="0.9"/>`;
          })
          .join('')}
        <text x="53" y="57" font-size="8" font-weight="bold" fill="#0f172a">6点均等</text>
        <!-- Right: Cantilever Moment Force Diagram -->
        <rect x="134" y="28" width="18" height="52" rx="2" fill="#64748b"/>
        <rect x="152" y="34" width="118" height="40" rx="4" fill="#cbd5e1" stroke="#334155"/>
        <text x="166" y="57" font-size="8.5" font-weight="bold" fill="#0f172a">600mm F4 (3kg超)</text>
        <path d="M224 76 L224 94" stroke="#dc2626" stroke-width="2.4"/>
        <polygon points="224,98 219,90 229,90" fill="#dc2626"/>
        <path d="M134 34 L118 34" stroke="#0284c7" stroke-width="2.4"/>
        <polygon points="114,34 122,29 122,39" fill="#0284c7"/>
        <text x="148" y="24" font-size="8" font-weight="bold" fill="#0369a1">上部ボルト引張応力を6点分散＋緩み止め</text>
        <text x="160" y="111" text-anchor="middle" font-size="7.4" fill="#334155">片持ち曲げモーメントによるフランジ浮き(片ボケ)を6点高剛性締結で防止</text>
      `);

    case 'mount_gasket':
      return wrap(`
        <!-- Dual-Lip Labyrinth EPDM Gasket Blocking Rain & Dust -->
        <rect x="20" y="22" width="100" height="68" rx="4" fill="#e2e8f0" stroke="#64748b"/>
        <text x="38" y="52" font-size="8.5" font-weight="bold" fill="#334155">レンズ側フランジ</text>
        <text x="38" y="66" font-size="7.5" fill="#475569">防滴ゴムスカート</text>
        <!-- Dual-Lip EPDM Seal Cross-Section -->
        <path d="M120 28 Q138 36 120 46 Q138 56 120 66 L146 66 L146 28 Z" fill="#1e293b" stroke="#0f172a"/>
        <text x="116" y="84" font-size="7.5" font-weight="bold" fill="#0f172a">二重リップEPDM</text>
        <!-- Rain Drops Deflected -->
        <path d="M124 8 L124 24" stroke="#0284c7" stroke-width="2.2" stroke-dasharray="3 2"/>
        <circle cx="114" cy="16" r="3" fill="#38bdf8"/>
        <circle cx="134" cy="14" r="3" fill="#38bdf8"/>
        <text x="146" y="18" font-size="8" font-weight="bold" fill="#0284c7">雨水・砂塵を2段で遮断!</text>
        <!-- Camera Sensor Chamber Protected -->
        <rect x="150" y="22" width="152" height="68" rx="4" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="172" y="48" font-size="8.5" font-weight="bold" fill="#166534">カメラ内部（センサー室）</text>
        <text x="172" y="64" font-size="7.5" fill="#15803d">毛細管現象による浸水ゼロ</text>
        <text x="172" y="78" font-size="7.5" fill="#15803d">−20℃氷点下でも弾性維持</text>
        <text x="48" y="110" font-size="8" fill="#334155">全周360°の二重リップラビリンス構造で過酷な雨天・砂塵から内部を保護</text>
      `);

    case 'mount_leaf_springs':
      return wrap(`
        <!-- Bayonet Lug + Arched Bronze Leaf Spring Clamping Lens Flush to Datum Plane -->
        <rect x="26" y="24" width="22" height="66" rx="2" fill="#cbd5e1" stroke="#475569" stroke-width="1.4"/>
        <text x="16" y="18" font-size="7.5" font-weight="bold" fill="#334155">レンズ基準面</text>
        <rect x="48" y="24" width="24" height="66" rx="2" fill="#94a3b8" stroke="#1e293b" stroke-width="1.4"/>
        <text x="68" y="18" font-size="7.5" font-weight="bold" fill="#0f172a">ステンレス基準面(±2μm)</text>
        <!-- Lens Lug Hooked Behind Body Flange -->
        <rect x="72" y="42" width="26" height="24" rx="2" fill="#64748b"/>
        <text x="74" y="57" font-size="7" fill="#fff">爪</text>
        <!-- Bowed Leaf Spring Pushing Lens Lug Rearward (-Z) -> Pulling Flange Flush! -->
        <path d="M98 32 Q122 54 98 76" fill="none" stroke="#d97706" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M126 54 L106 54" stroke="#dc2626" stroke-width="2.4"/>
        <polygon points="102,54 110,49 110,59" fill="#dc2626"/>
        <rect x="134" y="28" width="168" height="58" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="142" y="46" font-size="8.5" font-weight="bold" fill="#b45309">4枚バネ予圧：約 32 N</text>
        <text x="142" y="61" font-size="7.5" fill="#92400e">・軸方向ガタ(遊び) ⇒ 0 μm</text>
        <text x="142" y="75" font-size="7.5" fill="#92400e">・4点均等圧着で片ボケ防止</text>
        <text x="48" y="110" font-size="8" fill="#334155">裏側からレンズ爪を強力に引き寄せ、基準面へミクロン単位で密着固定</text>
      `);

    case 'mount_shims':
      return wrap(`
        <!-- Sub-Micron Color-Coded Shim Stack Calibrating Depth of Focus ±8.9μm -->
        <rect x="20" y="24" width="38" height="62" rx="3" fill="#cbd5e1" stroke="#475569"/>
        <text x="23" y="58" font-size="7.5" font-weight="bold" fill="#0f172a">フランジ</text>
        <!-- 3 Color-Coded Shims -->
        <rect x="64" y="22" width="10" height="66" fill="#94a3b8" stroke="#334155"/>
        <rect x="78" y="22" width="12" height="66" fill="#f59e0b" stroke="#b45309"/>
        <rect x="94" y="22" width="14" height="66" fill="#2563eb" stroke="#1e40af"/>
        <text x="58" y="16" font-size="7.5" font-weight="bold" fill="#1e40af">0.01 / 0.025 / 0.05 mm</text>
        <!-- Magnesium Throat -->
        <rect x="114" y="24" width="40" height="62" rx="3" fill="#64748b"/>
        <text x="118" y="58" font-size="7.5" font-weight="bold" fill="#fff">Mg骨格</text>
        <!-- Right: F1.2 Depth of Focus Formula Card -->
        <rect x="166" y="20" width="138" height="70" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="174" y="37" font-size="8.5" font-weight="bold" fill="#1d4ed8">F1.2 許容焦点深度</text>
        <text x="174" y="54" font-size="9" font-weight="bold" fill="#dc2626">Δz = ±8.9 μm!</text>
        <text x="174" y="70" font-size="7.5" fill="#1e40af">工場レーザー干渉計計測で</text>
        <text x="174" y="82" font-size="7.5" fill="#1e40af">傾き &lt; 0.005° へ全数調整</text>
        <text x="48" y="110" font-size="8" fill="#334155">10μm刻みの極薄シム調整により無限遠精度と画面四隅の均一解像を保証</text>
      `);

    case 'mount_lock_pin':
      return wrap(`
        <!-- Release Button -> Rocker Lever -> Hardened Lock Pin + Spring -->
        <!-- Release Button Top-Left -->
        <rect x="22" y="26" width="38" height="24" rx="4" fill="#475569" stroke="#0f172a"/>
        <text x="27" y="41" font-size="7.5" font-weight="bold" fill="#fff">解除ボタン</text>
        <path d="M41 10 L41 23" stroke="#dc2626" stroke-width="2"/>
        <polygon points="41,26 36,19 46,19" fill="#dc2626"/>
        <!-- Rocker Lever + Pivot -->
        <line x1="41" y1="54" x2="144" y2="54" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>
        <circle cx="92" cy="54" r="5" fill="#f59e0b" stroke="#0f172a"/>
        <text x="72" y="72" font-size="7.5" font-weight="bold" fill="#92400e">支点ロッカー</text>
        <!-- Hardened Lock Pin + Spring -->
        <rect x="136" y="22" width="16" height="44" rx="2" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.4"/>
        <path d="M144 66 L138 72 L150 78 L138 84 L150 90" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <text x="160" y="34" font-size="8" font-weight="bold" fill="#0f172a">硬化鋼ロックピン (HRC55+)</text>
        <text x="160" y="50" font-size="7.5" fill="#0369a1">・装着時：バネで自動「カチッ」</text>
        <text x="160" y="64" font-size="7.5" fill="#be123c">・ロック時せん断耐力 &gt; 500 N</text>
        <text x="160" y="78" font-size="7.5" fill="#475569">・解除ボタン軸に防水Oリング</text>
        <text x="48" y="110" font-size="8" fill="#334155">機械式フェイルセーフロックで重量級レンズの回転脱落を完全防止</text>
      `);

    case 'mount_contacts':
      return wrap(`
        <!-- 12-Pin Arc Contact Layout: Power / Ground / Ultra-High-Speed Bidirectional Bus -->
        <rect x="16" y="20" width="288" height="58" rx="6" fill="#1e293b"/>
        ${Array.from({ length: 12 })
          .map((_, i) => {
            const x = 30 + i * 22.8;
            const col = i <= 2 ? '#f59e0b' : i >= 10 ? '#38bdf8' : '#10b981';
            const h = i === 0 ? 28 : i === 11 ? 20 : 24;
            return `<rect x="${x.toFixed(1)}" y="${(48 - h / 2).toFixed(1)}" width="12" height="${h}" rx="5" fill="#facc15" stroke="${col}" stroke-width="1.6"/>`;
          })
          .join('')}
        <text x="26" y="16" font-size="7.5" font-weight="bold" fill="#b45309">大電力V_MOT (3A)</text>
        <text x="116" y="16" font-size="7.5" font-weight="bold" fill="#047857">高速双方向SPI/UART (40倍帯域)</text>
        <text x="244" y="16" font-size="7.5" font-weight="bold" fill="#0369a1">装着検知</text>
        <text x="160" y="92" text-anchor="middle" font-size="6.9" font-weight="bold" fill="#0f172a">独立スプリング内蔵・厚金めっき (&lt;20mΩ) ＋ GND先行ホットスワップ安全設計</text>
        <text x="160" y="109" text-anchor="middle" font-size="7.1" fill="#334155">OIS×5軸IBIS 1,000Hz協調・120fps AF・DLO光学補正をリアルタイム伝送</text>
      `);

    case 'mount_contact_pcb':
      return wrap(`
        <!-- 12 Pogo Pins -> ±15kV ESD TVS Clamp -> High-Side Power Switch -> Shielded FPC -> 4nm ISP -->
        <rect x="14" y="34" width="44" height="40" rx="4" fill="#facc15" stroke="#b45309"/>
        <text x="19" y="57" font-size="8" font-weight="bold" fill="#78350f">12ピン</text>
        <path d="M58 54 L82 54" stroke="#0f172a" stroke-width="2"/>
        <!-- ESD Surge Spark Clamped to GND -->
        <rect x="82" y="24" width="74" height="58" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="89" y="42" font-size="8" font-weight="bold" fill="#b91c1c">±15kV ESD</text>
        <text x="89" y="55" font-size="7.5" fill="#991b1b">TVSダイオード</text>
        <text x="89" y="68" font-size="7.5" font-weight="bold" fill="#dc2626">&lt; 1 ns 逃がす!</text>
        <path d="M119 82 L119 95" stroke="#dc2626" stroke-width="2"/>
        <line x1="108" y1="95" x2="130" y2="95" stroke="#0f172a" stroke-width="2"/>
        <!-- Shielded FPC -> Mainboard -->
        <path d="M156 54 L196 54" stroke="#d97706" stroke-width="6"/>
        <polygon points="200,54 192,48 192,60" fill="#b45309"/>
        <text x="158" y="44" font-size="7.5" font-weight="bold" fill="#92400e">EMIシールド</text>
        <rect x="202" y="28" width="102" height="50" rx="5" fill="#065f46" stroke="#10b981"/>
        <text x="210" y="48" font-size="8" font-weight="bold" fill="#fff">メイン基板 4nm ISP</text>
        <text x="210" y="63" font-size="7.5" fill="#a7f3d0">＆ 2,000Hz サーボMCU</text>
        <text x="48" y="112" font-size="8" fill="#334155">レンズ交換時の静電気サージ・過電流から心臓部ICをナノ秒保護</text>
      `);

    case 'mount_baffle':
      return wrap(`
        <!-- 5-Step Sawtooth Knife-Edge Light Trap Extinguishing Oblique Stray Rays -->
        <rect x="20" y="16" width="280" height="10" fill="#18181b"/>
        <rect x="20" y="84" width="280" height="10" fill="#18181b"/>
        ${[0, 1, 2, 3, 4]
          .map((i) => {
            const bx = 56 + i * 44;
            return `<polygon points="${bx},26 ${bx + 14},26 ${bx + 5},39" fill="#09090b"/>
                    <polygon points="${bx},84 ${bx + 14},84 ${bx + 5},71" fill="#09090b"/>`;
          })
          .join('')}
        <!-- Clean Imaging Light -->
        <line x1="24" y1="55" x2="294" y2="55" stroke="#0284c7" stroke-width="2.6"/>
        <text x="116" y="50" font-size="8.5" font-weight="bold" fill="#0369a1">正規結像光線 (55mm大口径)</text>
        <!-- Stray light trapped in V-groove -->
        <polyline points="26,42 98,28 112,38 124,27" fill="none" stroke="#ea580c" stroke-width="1.9" stroke-dasharray="3 2"/>
        <circle cx="124" cy="27" r="3.8" fill="#dc2626"/>
        <text x="132" y="37" font-size="7.5" font-weight="bold" fill="#b45309">ρ &lt; 0.8% × 3回反射 ⇒ 迷光 0.00005%!</text>
        <text x="42" y="111" font-size="8" fill="#334155">5段ナイフエッジ鋸歯状ライトトラップが逆光時の内壁フレアを完全吸収</text>
      `);

    case 'mount_flare_mask':
      return wrap(`
        <!-- Circular 43.3mm Image Circle Trimmed to 36x24mm Full-Frame Rectangle -->
        <circle cx="88" cy="54" r="38" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="4 2"/>
        <rect x="57" y="33" width="62" height="42" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
        <text x="64" y="57" font-size="8" font-weight="bold" fill="#1e3a8a">36×24 mm</text>
        <text x="66" y="28" font-size="7" font-weight="bold" fill="#b45309">余剰光カット</text>
        <!-- Right Explanation Box -->
        <rect x="144" y="18" width="160" height="72" rx="5" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="152" y="36" font-size="8.5" font-weight="bold" fill="#0f172a">丸い光束 → 3:2 矩形整形</text>
        <text x="152" y="52" font-size="7.5" fill="#475569">・イメージサークル面積：1,472 mm²</text>
        <text x="152" y="65" font-size="7.5" fill="#1d4ed8">・有効センサー面積：864 mm²</text>
        <text x="152" y="79" font-size="7.8" font-weight="bold" fill="#dc2626">⇒ 不要な41%の光を直前遮断!</text>
        <text x="160" y="110" text-anchor="middle" font-size="7.4" fill="#334155">シャッター室での二次乱反射を防ぎ16ストップHDRの漆黒コントラストを死守</text>
      `);

    case 'mount_mg_throat':
      return wrap(`
        <!-- Thixomolded AZ91D Magnesium Bulkhead + Radial Load-Transfer Ribs + Helicoils -->
        <rect x="20" y="18" width="128" height="74" rx="10" fill="#64748b" stroke="#1e293b" stroke-width="1.8"/>
        <circle cx="84" cy="55" r="24" fill="#fff" stroke="#0f172a" stroke-width="1.6"/>
        <!-- Radial Ribs -->
        <line x1="32" y1="30" x2="64" y2="42" stroke="#cbd5e1" stroke-width="3"/>
        <line x1="136" y1="30" x2="104" y2="42" stroke="#cbd5e1" stroke-width="3"/>
        <line x1="32" y1="80" x2="64" y2="68" stroke="#cbd5e1" stroke-width="3"/>
        <line x1="136" y1="80" x2="104" y2="68" stroke="#cbd5e1" stroke-width="3"/>
        <text x="68" y="58" font-size="8" font-weight="bold" fill="#0f172a">φ55.6</text>
        <!-- Spec Box Right -->
        <rect x="160" y="18" width="144" height="74" rx="5" fill="#f1f5f9" stroke="#64748b"/>
        <text x="168" y="36" font-size="8.5" font-weight="bold" fill="#0f172a">AZ91D マグネシウム骨格</text>
        <text x="168" y="51" font-size="7.5" fill="#334155">・比重 1.81 (超軽量・高剛性)</text>
        <text x="168" y="64" font-size="7.5" fill="#334155">・6か所SUSヘリサート内蔵</text>
        <text x="168" y="77" font-size="7.5" fill="#334155">・高い内部振動減衰能</text>
        <text x="160" y="110" text-anchor="middle" font-size="7.3" fill="#334155">放射状ガセットリブで断面二次モーメントを高め重量級レンズのたわみを抑制</text>
      `);

    case 'mount_chassis_if':
      return wrap(`
        <!-- Load Path Bypass Diagram: Heavy Lens -> Mount -> Lower Gussets -> Tripod Socket (Skipping IBIS!) -->
        <rect x="16" y="28" width="54" height="44" rx="4" fill="#cbd5e1" stroke="#334155"/>
        <text x="23" y="53" font-size="8" font-weight="bold" fill="#0f172a">マウント</text>
        <!-- Protected Optical Core (Shutter + IBIS) -->
        <rect x="108" y="20" width="96" height="42" rx="5" fill="#eff6ff" stroke="#3b82f6" stroke-dasharray="3 2"/>
        <text x="116" y="39" font-size="8" font-weight="bold" fill="#1d4ed8">シャッター＆IBIS</text>
        <text x="122" y="53" font-size="7.5" fill="#1e40af">歪み応力ゼロ保護!</text>
        <!-- Bypass Load Path Underneath -->
        <path d="M70 64 L96 82 L226 82" fill="none" stroke="#dc2626" stroke-width="3.2"/>
        <polygon points="232,82 222,76 222,88" fill="#dc2626"/>
        <text x="98" y="76" font-size="8" font-weight="bold" fill="#b91c1c">下部ガセット荷重バイパス</text>
        <!-- Tripod Base -->
        <rect x="234" y="62" width="70" height="30" rx="4" fill="#334155"/>
        <text x="242" y="80" font-size="8" font-weight="bold" fill="#fde047">底面三脚座</text>
        <text x="44" y="111" font-size="8" fill="#334155">4点ダウエルピン＋全周防塵シール＋荷重バイパスで光学精度を永続保護</text>
      `);

    // =========================================================================
    // 50mm F1.2 Prime Lens & Quad XD Linear AF Motors Schematics (10 diagrams)
    // =========================================================================
    case 'lens_hood':
      return wrap(`
        <!-- Lens Hood Cutoff Angle vs Stray Sunlight -->
        <rect x="24" y="24" width="70" height="64" rx="4" fill="#334155" stroke="#0f172a"/>
        <rect x="94" y="16" width="56" height="80" rx="3" fill="#1e293b"/>
        <line x1="102" y1="22" x2="144" y2="22" stroke="#64748b" stroke-dasharray="3 2"/>
        <line x1="102" y1="90" x2="144" y2="90" stroke="#64748b" stroke-dasharray="3 2"/>
        <path d="M90 26 Q104 56 90 86" fill="#7dd3fc" stroke="#0284c7" stroke-width="1.5"/>
        <!-- Valid 47° FOV Cone -->
        <polygon points="94,34 94,78 286,18 286,94" fill="rgba(14,165,233,0.14)" stroke="#0284c7" stroke-width="1.3"/>
        <text x="172" y="59" font-size="8.5" font-weight="bold" fill="#0369a1">有効画角 47° (ケラレなし)</text>
        <!-- Stray Oblique Sunlight Blocked! -->
        <line x1="210" y1="6" x2="132" y2="18" stroke="#f59e0b" stroke-width="2.4"/>
        <text x="216" y="14" font-size="8" font-weight="bold" fill="#d97706">斜め太陽光ブロック!</text>
        <text x="34" y="111" font-size="8" fill="#334155">内壁の同心遮光リブが画角外の斜光を吸収し、フレア・白浮きを完全防止</text>
      `);

    case 'lens_front_xa':
      return wrap(`
        <!-- Normal Aspheric (Onion-Ring Bokeh) vs 0.01um XA Extreme Aspheric (Creamy Smooth Bokeh) -->
        <rect x="16" y="14" width="132" height="80" rx="5" fill="#fff1f2" stroke="#fda4af"/>
        <text x="24" y="29" font-size="8" font-weight="bold" fill="#be123c">通常非球面 (年輪ボケ)</text>
        <circle cx="82" cy="60" r="22" fill="#fecdd3" stroke="#e11d48" stroke-width="1.4"/>
        <circle cx="82" cy="60" r="15" fill="none" stroke="#e11d48" stroke-width="1.1" stroke-dasharray="3 2"/>
        <circle cx="82" cy="60" r="8" fill="none" stroke="#e11d48" stroke-width="1.1"/>
        <!-- Right: 0.01um XA -->
        <rect x="162" y="14" width="144" height="80" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="170" y="29" font-size="8" font-weight="bold" fill="#0369a1">XA 0.01μm研磨 + Nano AR II</text>
        <circle cx="234" cy="60" r="22" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <circle cx="234" cy="60" r="14" fill="#e0f2fe" opacity="0.65"/>
        <text x="206" y="63" font-size="8" font-weight="bold" fill="#0369a1">滑らか丸ボケ!</text>
        <text x="34" y="111" font-size="8" fill="#334155">10nm精度XA研磨＋フッ素撥油＋Nano AR IIコートでF1.2開放から極上描写</text>
      `);

    case 'lens_ed_doublet':
      return wrap(`
        <!-- Chromatic Aberration Correction: Super-ED Positive + Flint Negative Doublet -->
        <path d="M58 20 Q82 54 58 88 Q46 54 58 20 Z" fill="#6ee7b7" stroke="#059669" stroke-width="1.5"/>
        <path d="M74 20 Q92 54 74 88 L88 88 Q80 54 88 20 Z" fill="#a5b4fc" stroke="#4f46e5" stroke-width="1.5"/>
        <text x="24" y="14" font-size="7.5" font-weight="bold" fill="#047857">スーパーED(凸)</text>
        <text x="82" y="14" font-size="7.5" font-weight="bold" fill="#4338ca">高分散フリント(凹)</text>
        <!-- R/G/B converging to one exact focal point -->
        <line x1="88" y1="34" x2="220" y2="54" stroke="#ef4444" stroke-width="1.8"/>
        <line x1="88" y1="54" x2="220" y2="54" stroke="#10b981" stroke-width="1.8"/>
        <line x1="88" y1="74" x2="220" y2="54" stroke="#2563eb" stroke-width="1.8"/>
        <circle cx="220" cy="54" r="5" fill="#facc15" stroke="#0f172a" stroke-width="1.2"/>
        <rect x="232" y="34" width="72" height="40" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="238" y="50" font-size="8" font-weight="bold" fill="#047857">RGB一致!</text>
        <text x="238" y="64" font-size="7.5" fill="#065f46">紫にじみ 0</text>
        <text x="160" y="110" text-anchor="middle" font-size="7.4" fill="#334155">φ₁/ν₁ + φ₂/ν₂ = 0 の色消し接合でF1.2開放の軸上色収差を徹底除去</text>
      `);

    case 'lens_iris_11':
      return wrap(`
        <!-- 11-Blade Circular Iris Open (F1.2) vs Stopped Down (F5.6) -->
        <circle cx="82" cy="54" r="34" fill="#1e293b" stroke="#0f172a" stroke-width="1.8"/>
        <circle cx="82" cy="54" r="24" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <text x="66" y="57" font-size="9" font-weight="bold" fill="#0369a1">F1.2</text>
        <text x="48" y="98" font-size="7.5" fill="#0369a1">φ41.7mm 超大口径</text>
        <!-- Arrow -->
        <path d="M126 54 L164 54" stroke="#d97706" stroke-width="2.2"/>
        <polygon points="169,54 160,49 160,59" fill="#d97706"/>
        <text x="128" y="45" font-size="7.5" font-weight="bold" fill="#b45309">11枚同期</text>
        <!-- Stopped down circular 11-blade iris -->
        <circle cx="226" cy="54" r="34" fill="#1e293b" stroke="#0f172a" stroke-width="1.8"/>
        <circle cx="226" cy="54" r="11" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.4"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          .map((i) => {
            const a = (i / 11) * Math.PI * 2;
            const x1 = (226 + Math.cos(a) * 11).toFixed(1);
            const y1 = (54 + Math.sin(a) * 11).toFixed(1);
            const x2 = (226 + Math.cos(a + 0.52) * 33).toFixed(1);
            const y2 = (54 + Math.sin(a + 0.52) * 33).toFixed(1);
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#64748b" stroke-width="1.1"/>`;
          })
          .join('')}
        <text x="190" y="98" font-size="7.5" fill="#334155">真円維持＋22本光芒</text>
        <text x="42" y="112" font-size="8" fill="#334155">11枚羽根の電磁ステッピング制御で美しい丸ボケと静音動画絞りを両立</text>
      `);

    case 'lens_focus_a':
      return wrap(`
        <!-- Floating Focus Group A Moving Along Linear Rails -->
        <rect x="24" y="24" width="268" height="6" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <rect x="24" y="82" width="268" height="6" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <!-- Group A Lens Carrier -->
        <rect x="92" y="22" width="38" height="68" rx="4" fill="#0ea5e9" opacity="0.22" stroke="#0284c7" stroke-width="1.6"/>
        <ellipse cx="111" cy="56" rx="10" ry="26" fill="#7dd3fc" stroke="#0284c7" stroke-width="1.5"/>
        <text x="86" y="16" font-size="8" font-weight="bold" fill="#0369a1">前側フォーカス群 A</text>
        <!-- Bidirectional Linear Stroke Arrows -->
        <path d="M56 56 L86 56 M136 56 L170 56" stroke="#d97706" stroke-width="2.4"/>
        <polygon points="52,56 60,51 60,61" fill="#d97706"/>
        <polygon points="174,56 166,51 166,61" fill="#d97706"/>
        <!-- Group B Reference -->
        <rect x="210" y="28" width="28" height="56" rx="4" fill="#10b981" opacity="0.2" stroke="#059669" stroke-dasharray="3 2"/>
        <text x="200" y="16" font-size="7.5" fill="#047857">後群Bと独立移動</text>
        <text x="34" y="110" font-size="8" fill="#334155">軽量鏡枠＋2基XDモーター直動により最短0.40m〜∞まで収差ゼロ合焦</text>
      `);

    case 'lens_xd_motors':
      return wrap(`
        <!-- Quad XD Linear Motor Cross-Section: N52 Magnet Stator + Copper Coil Mover + MR Scale -->
        <rect x="22" y="18" width="184" height="14" rx="2" fill="#475569" stroke="#0f172a"/>
        <text x="58" y="28" font-size="7.5" font-weight="bold" fill="#f8fafc">N52 ネオジム磁石ステーター</text>
        <!-- Copper Coil Mover -->
        <rect x="86" y="38" width="56" height="24" rx="3" fill="#d97706" stroke="#92400e" stroke-width="1.5"/>
        <text x="92" y="53" font-size="7.5" font-weight="bold" fill="#fff">銅コイル可動子</text>
        <!-- Guide Shaft & MR Magnetic Scale -->
        <rect x="22" y="68" width="184" height="8" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <rect x="22" y="82" width="184" height="10" rx="2" fill="#065f46"/>
        <text x="48" y="90" font-size="7.5" fill="#fde047">0.1μm MR磁気スケールセンサー ×4</text>
        <!-- Thrust Vectors -->
        <path d="M40 50 L80 50 M148 50 L188 50" stroke="#dc2626" stroke-width="2.5"/>
        <polygon points="36,50 44,45 44,55" fill="#dc2626"/>
        <polygon points="192,50 184,45 184,55" fill="#dc2626"/>
        <!-- Right Badge -->
        <rect x="218" y="20" width="88" height="70" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="226" y="38" font-size="8.5" font-weight="bold" fill="#b45309">4基対称配置</text>
        <text x="226" y="53" font-size="7.5" fill="#78350f">F = 4·N·B·I·L</text>
        <text x="226" y="67" font-size="7.5" fill="#78350f">歯車ゼロ・無音</text>
        <text x="226" y="80" font-size="7.5" fill="#78350f">120fps AI追従</text>
        <text x="42" y="111" font-size="8" fill="#334155">45°対称4基リニアモーターが重いF1.2フォーカス群を瞬間・無音駆動</text>
      `);

    case 'lens_focus_b':
      return wrap(`
        <!-- Differential Floating Curve: Distance vs Group A / Group B Spacing d(s) -->
        <rect x="18" y="16" width="144" height="76" rx="5" fill="#f0fdf4" stroke="#10b981"/>
        <text x="26" y="30" font-size="8" font-weight="bold" fill="#047857">電子カム差動フローティング</text>
        <ellipse cx="62" cy="60" rx="8" ry="20" fill="#7dd3fc" stroke="#0284c7"/>
        <ellipse cx="114" cy="60" rx="8" ry="20" fill="#6ee7b7" stroke="#059669"/>
        <path d="M72 60 L104 60" stroke="#0f172a" stroke-width="1.8"/>
        <text x="76" y="54" font-size="8" font-weight="bold" fill="#0f172a">d(s)</text>
        <text x="38" y="87" font-size="7.5" fill="#065f46">距離に応じ間隔を自動変化</text>
        <!-- Right: Low Breathing & Flat Field -->
        <rect x="174" y="16" width="132" height="76" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="182" y="33" font-size="8" font-weight="bold" fill="#1d4ed8">後群B 独立補正効果</text>
        <text x="182" y="50" font-size="7.5" fill="#1e40af">・像面湾曲 → 平坦化</text>
        <text x="182" y="64" font-size="7.5" fill="#1e40af">・周辺コマ収差 → 抑制</text>
        <text x="182" y="78" font-size="7.5" fill="#1e40af">・動画ブリージング最小</text>
        <text x="38" y="111" font-size="8" fill="#334155">前群A＋後群Bの2組独立リニア駆動により近接から無限遠まで隅々シャープ</text>
      `);

    case 'lens_rear_hero':
      return wrap(`
        <!-- Large Rear Hero Element Right Ahead of 55mm Mount & Full-Frame Sensor -->
        <path d="M74 16 Q96 54 74 92 Q112 54 74 16 Z" fill="#a5b4fc" stroke="#4f46e5" stroke-width="1.8"/>
        <text x="36" y="13" font-size="8" font-weight="bold" fill="#4338ca">φ44mm 大口径後玉</text>
        <!-- 55mm Mount Plane -->
        <line x1="132" y1="14" x2="132" y2="94" stroke="#64748b" stroke-width="2.2" stroke-dasharray="4 2"/>
        <text x="112" y="102" font-size="7.5" fill="#475569">55mmマウント</text>
        <!-- Shallow Chief Ray Angle to Full-Frame Sensor -->
        <line x1="94" y1="24" x2="218" y2="28" stroke="#0284c7" stroke-width="2"/>
        <line x1="96" y1="54" x2="218" y2="54" stroke="#f59e0b" stroke-width="2"/>
        <line x1="94" y1="84" x2="218" y2="80" stroke="#0284c7" stroke-width="2"/>
        <rect x="218" y="22" width="12" height="64" rx="2" fill="#0f766e" stroke="#0f172a"/>
        <text x="236" y="48" font-size="8" font-weight="bold" fill="#0f766e">CRA ≤ 14°</text>
        <text x="236" y="62" font-size="7.5" fill="#334155">四隅まで明るく</text>
        <text x="236" y="74" font-size="7.5" fill="#334155">高解像!</text>
        <text x="42" y="114" font-size="8" fill="#334155">ショートフランジ専用の大口径後玉が周辺減光と四隅の像流れを根絶</text>
      `);

    case 'lens_control_rings':
      return wrap(`
        <!-- Linear-Response MF Graph (Constant Slope) + De-Clickable Iris Detent -->
        <rect x="16" y="16" width="140" height="78" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="24" y="30" font-size="8" font-weight="bold" fill="#0f172a">リニアレスポンスMF</text>
        <line x1="30" y1="80" x2="142" y2="80" stroke="#334155"/>
        <line x1="30" y1="80" x2="30" y2="38" stroke="#334155"/>
        <line x1="30" y1="80" x2="136" y2="40" stroke="#0284c7" stroke-width="2.4"/>
        <text x="60" y="54" font-size="7.5" font-weight="bold" fill="#0284c7">Δz ∝ Δθ (完全比例)</text>
        <text x="58" y="90" font-size="7" fill="#475569">回転角 Δθ →</text>
        <!-- Right: Click ON / OFF Iris Switch -->
        <rect x="168" y="16" width="138" height="78" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="176" y="31" font-size="8" font-weight="bold" fill="#92400e">絞りリング クリック切替</text>
        <rect x="180" y="42" width="114" height="18" rx="3" fill="#fef3c7" stroke="#d97706"/>
        <text x="186" y="54" font-size="7.5" fill="#78350f">CLICK ON : 静止画 1/3段</text>
        <rect x="180" y="66" width="114" height="18" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="186" y="78" font-size="7.5" fill="#0369a1">CLICK OFF : 動画 無音連続</text>
        <text x="38" y="111" font-size="8" fill="#334155">高分解能非接触エンコーダー＋ラビリンス防塵パッキンで極上の操作感</text>
      `);

    case 'lens_barrel':
      return wrap(`
        <!-- Weather-Sealed Barrel Cutaway & Load Path to 55mm Mount -->
        <rect x="20" y="24" width="188" height="62" rx="8" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
        <rect x="64" y="24" width="96" height="26" rx="2" fill="#e0f2fe" stroke="#0284c7" stroke-dasharray="3 2"/>
        <text x="72" y="40" font-size="7.5" font-weight="bold" fill="#0369a1">上部カット窓(内部視認)</text>
        <rect x="208" y="28" width="12" height="54" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <rect x="220" y="24" width="6" height="62" rx="1" fill="#0f172a"/>
        <text x="232" y="44" font-size="8" font-weight="bold" fill="#0f172a">SUSバヨネット</text>
        <text x="232" y="58" font-size="7.5" fill="#0369a1">＋ゴム防水リング</text>
        <text x="232" y="72" font-size="7.5" fill="#d97706">＋12ピン金接点</text>
        <text x="40" y="110" font-size="8" fill="#334155">高剛性マグネシウム・アルミ鏡筒＋全周シーリングで55mmマウントへ直結</text>
      `);

    // =========================================================================
    // 4-Axis Multi-Angle Rear LCD Monitor Schematics (6 diagrams)
    // =========================================================================
    case 'lcd_touch_glass':
      return wrap(`
        <!-- Air Gap Reflection (4.1%) vs OCA Optical Bonding (0.004%) -->
        <rect x="16" y="16" width="136" height="76" rx="5" fill="#fff1f2" stroke="#fda4af"/>
        <text x="24" y="30" font-size="8" font-weight="bold" fill="#be123c">従来：空気層あり</text>
        <rect x="28" y="38" width="112" height="10" fill="#bae6fd" stroke="#0284c7"/>
        <text x="58" y="58" font-size="7.5" fill="#dc2626">空気層で反射4.1%!</text>
        <rect x="28" y="64" width="112" height="12" fill="#334155"/>
        <text x="40" y="87" font-size="7.5" fill="#9f1239">屋外で白っぽく見にくい</text>
        <!-- Right: OCA Direct Bonding -->
        <rect x="164" y="16" width="142" height="76" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="172" y="30" font-size="8" font-weight="bold" fill="#0369a1">OCA光学接着 + PCAPタッチ</text>
        <rect x="176" y="40" width="118" height="10" fill="#7dd3fc" stroke="#0284c7"/>
        <rect x="176" y="50" width="118" height="8" fill="#bae6fd"/>
        <rect x="176" y="58" width="118" height="12" fill="#0f766e"/>
        <text x="180" y="84" font-size="7.5" font-weight="bold" fill="#0369a1">内部反射 0.004% ⇒ 炎天下クッキリ</text>
        <text x="38" y="110" font-size="8" fill="#334155">屈折率整合OCA樹脂＋ITO静電容量タッチ格子で高視認性と直感AF操作を両立</text>
      `);

    case 'lcd_ips_cell':
      return wrap(`
        <!-- IPS In-Plane Liquid Crystal Switching Cross-Section -->
        <rect x="22" y="20" width="14" height="68" rx="2" fill="#334155"/>
        <text x="14" y="99" font-size="7" fill="#334155">偏光板1</text>
        <!-- Parallel Rotating LC Molecules -->
        <rect x="44" y="20" width="76" height="68" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <ellipse cx="66" cy="40" rx="10" ry="3.5" fill="#0284c7" transform="rotate(-25 66 40)"/>
        <ellipse cx="98" cy="40" rx="10" ry="3.5" fill="#0284c7" transform="rotate(-25 98 40)"/>
        <ellipse cx="66" cy="68" rx="10" ry="3.5" fill="#0284c7" transform="rotate(25 66 68)"/>
        <ellipse cx="98" cy="68" rx="10" ry="3.5" fill="#0284c7" transform="rotate(25 98 68)"/>
        <text x="52" y="16" font-size="7.5" font-weight="bold" fill="#0369a1">IPS面内回転液晶</text>
        <!-- RGB Color Filter -->
        <rect x="126" y="20" width="12" height="22" fill="#ef4444"/>
        <rect x="126" y="43" width="12" height="22" fill="#10b981"/>
        <rect x="126" y="66" width="12" height="22" fill="#2563eb"/>
        <rect x="144" y="20" width="14" height="68" rx="2" fill="#334155"/>
        <!-- 178° Wide Viewing Angle Cone -->
        <path d="M164 54 L260 22 M164 54 L260 54 M164 54 L260 86" stroke="#0ea5e9" stroke-width="1.8"/>
        <text x="206" y="48" font-size="8.5" font-weight="bold" fill="#0369a1">視野角 178°</text>
        <text x="202" y="64" font-size="7.5" fill="#334155">斜めでも色転びなし!</text>
        <text x="42" y="112" font-size="8" fill="#334155">3.2型210万ドットIPS液晶＋COFドライバで正確なピントと発色を確認</text>
      `);

    case 'lcd_backlight':
      return wrap(`
        <!-- Edge LED -> Acrylic LGP (TIR) -> Dual Crossed BEF Prisms -> Bright Collimated Light -->
        <rect x="20" y="66" width="14" height="22" rx="2" fill="#facc15" stroke="#ca8a04"/>
        <text x="12" y="99" font-size="7.5" font-weight="bold" fill="#a16207">LED×10</text>
        <!-- LGP Acrylic Light Guide -->
        <rect x="38" y="68" width="144" height="18" rx="2" fill="#bae6fd" stroke="#0284c7"/>
        <path d="M38 77 L68 70 L102 84 L138 70 L172 82" fill="none" stroke="#0369a1" stroke-width="1.4" stroke-dasharray="3 2"/>
        <text x="78" y="80" font-size="7.5" font-weight="bold" fill="#0c4a6e">導光板(全反射均一化)</text>
        <!-- Dual BEF Micro-Prism Sawtooth -->
        <path d="M38 56 L50 44 L62 56 L74 44 L86 56 L98 44 L110 56 L122 44 L134 56 L146 44 L158 56 L170 44 L182 56 Z" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="192" y="54" font-size="8" font-weight="bold" fill="#0369a1">直交デュアルBEF</text>
        <text x="192" y="68" font-size="8" font-weight="bold" fill="#0284c7">正面輝度 約1.9倍!</text>
        <!-- Upward Bright Arrows -->
        <path d="M70 40 L70 18 M110 40 L110 18 M150 40 L150 18" stroke="#0ea5e9" stroke-width="2.2"/>
        <polygon points="70,13 65,21 75,21" fill="#0ea5e9"/>
        <polygon points="110,13 105,21 115,21" fill="#0ea5e9"/>
        <polygon points="150,13 145,21 155,21" fill="#0ea5e9"/>
        <text x="40" y="112" font-size="8" fill="#334155">1.2mm超薄型エッジLED＋直交マイクロプリズム集光で省電力・高輝度を実現</text>
      `);

    case 'lcd_shell':
      return wrap(`
        <!-- Slim Metal Rear Tray + Graphite Thermal Foil + Hall Magnet Stow Detection -->
        <rect x="24" y="20" width="166" height="70" rx="6" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
        <rect x="38" y="30" width="122" height="50" rx="3" fill="#475569" stroke="#94a3b8"/>
        <text x="52" y="53" font-size="8" font-weight="bold" fill="#f8fafc">薄肉Mg/Al剛性トレイ</text>
        <text x="50" y="67" font-size="7.5" fill="#cbd5e1">＋グラファイト放熱＋EMI遮蔽</text>
        <!-- Hinge Boss & Hall Magnet -->
        <rect x="174" y="34" width="14" height="42" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <rect x="34" y="76" width="16" height="8" rx="1" fill="#38bdf8"/>
        <!-- Specs Right -->
        <rect x="202" y="20" width="104" height="70" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="210" y="37" font-size="8" font-weight="bold" fill="#0f172a">片持ちねじれ防止</text>
        <text x="210" y="52" font-size="7.5" fill="#334155">・0.6mm薄肉リブ</text>
        <text x="210" y="66" font-size="7.5" fill="#334155">・磁石格納自動消灯</text>
        <text x="210" y="80" font-size="7.5" fill="#334155">・外周防水シール</text>
        <text x="44" y="110" font-size="8" fill="#334155">バリアングル展開時のタッチ操作でも歪まない高ねじり剛性金属外装</text>
      `);

    case 'lcd_swivel_hinge':
      return wrap(`
        <!-- Dual-Axis 176° Open + 270° Swivel Friction Hinge & Coiled FPC -->
        <rect x="52" y="18" width="18" height="72" rx="4" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>
        <rect x="46" y="42" width="66" height="24" rx="4" fill="#334155"/>
        <rect x="112" y="46" width="38" height="16" rx="3" fill="#cbd5e1" stroke="#334155"/>
        <!-- Coiled Orange FPC inside hollow shaft -->
        <path d="M61 24 C74 34, 48 44, 61 54 C74 64, 96 54, 146 54" fill="none" stroke="#f59e0b" stroke-width="2.4"/>
        <!-- Rotation Arcs -->
        <path d="M36 22 Q20 54 36 86" fill="none" stroke="#0284c7" stroke-width="2"/>
        <text x="10" y="56" font-size="8" font-weight="bold" fill="#0284c7">176°</text>
        <path d="M126 30 Q144 54 126 78" fill="none" stroke="#d97706" stroke-width="2"/>
        <text x="148" y="34" font-size="8" font-weight="bold" fill="#b45309">270°回転</text>
        <!-- Right Info -->
        <rect x="188" y="20" width="118" height="70" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="196" y="37" font-size="8" font-weight="bold" fill="#92400e">皿ばね摩擦ヒンジ</text>
        <text x="196" y="52" font-size="7.5" fill="#78350f">・任意角度ピタッと保持</text>
        <text x="196" y="66" font-size="7.5" fill="#78350f">・中空軸に高屈曲FPC</text>
        <text x="196" y="80" font-size="7.5" fill="#78350f">・10万回開閉耐久設計</text>
        <text x="42" y="110" font-size="8" fill="#334155">カメラ左側面(+X)へ展開し、縦位置ローアングルや自撮りへ自由変形</text>
      `);

    case 'lcd_tilt_cradle':
      return wrap(`
        <!-- 4-Axis Magic: Optical-Axis Tilt (Left) + Side Vari-Angle Cable Bypass (Right) -->
        <rect x="16" y="16" width="136" height="78" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="24" y="30" font-size="8" font-weight="bold" fill="#0369a1">軸1・2：光軸上チルト</text>
        <rect x="34" y="42" width="14" height="40" fill="#334155"/>
        <line x1="48" y1="54" x2="80" y2="62" stroke="#64748b" stroke-width="2.6"/>
        <line x1="48" y1="72" x2="78" y2="78" stroke="#f59e0b" stroke-width="2.2"/>
        <rect x="78" y="44" width="10" height="38" rx="2" fill="#0284c7" transform="rotate(-32 83 63)"/>
        <text x="96" y="56" font-size="7.5" font-weight="bold" fill="#0369a1">上98°/下40°</text>
        <text x="96" y="70" font-size="7.5" fill="#0369a1">ワンアクション!</text>
        <!-- Right: Axis 3-4 Vari-Angle clearing cables -->
        <rect x="162" y="16" width="144" height="78" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="170" y="30" font-size="8" font-weight="bold" fill="#166534">軸3・4：後方引出バリアングル</text>
        <rect x="176" y="44" width="46" height="26" rx="3" fill="#334155"/>
        <line x1="176" y1="54" x2="164" y2="54" stroke="#dc2626" stroke-width="2.5"/>
        <rect x="234" y="48" width="52" height="30" rx="3" fill="#0ea5e9" opacity="0.28" stroke="#0284c7" stroke-width="1.5"/>
        <text x="238" y="66" font-size="7.5" font-weight="bold" fill="#0369a1">ケーブル回避</text>
        <text x="172" y="88" font-size="7.5" fill="#15803d">HDMI/マイク挿したまま全開!</text>
        <text x="42" y="111" font-size="8" fill="#334155">チルトの速写性とバリアングルの自由度を融合した最新フラッグシップ4軸機構</text>
      `);

    // =========================================================================
    // Complete Camera Body, 7.2V Battery, Hot Shoe & Dials Schematics (12 diagrams)
    // =========================================================================
    case 'body_battery':
      return wrap(`
        <!-- 2S1P Dual-Cell 7.2V / 6.0A High-Drain Battery Cutaway -->
        <rect x="20" y="18" width="114" height="74" rx="6" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
        <rect x="30" y="36" width="38" height="48" rx="5" fill="#0284c7" stroke="#bae6fd" stroke-width="1.2"/>
        <rect x="86" y="36" width="38" height="48" rx="5" fill="#0284c7" stroke="#bae6fd" stroke-width="1.2"/>
        <text x="36" y="63" font-size="8" font-weight="bold" fill="#fff">3.6V</text>
        <text x="92" y="63" font-size="8" font-weight="bold" fill="#fff">3.6V</text>
        <rect x="28" y="22" width="98" height="10" rx="2" fill="#10b981"/>
        <text x="40" y="30" font-size="7" font-weight="bold" fill="#fff">スマートBMS残量・認証基板</text>
        <!-- Right Output Specs -->
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#1d4ed8">7.2V × 6.0A = 43.2W 供給</text>
        <text x="156" y="51" font-size="7.5" fill="#1e40af">・2直列で配線損失 I²R を1/4に</text>
        <text x="156" y="65" font-size="7.5" fill="#1e40af">・AI NPU + 8K RAW + 4基XD駆動</text>
        <text x="156" y="79" font-size="7.5" fill="#1e40af">・1%単位残量＆USB-PD急速充電</text>
        <text x="44" y="110" font-size="8" fill="#334155">高出力2セル直列＋スマートBMSで最新フラッグシップの大電流負荷を支える</text>
      `);

    case 'body_batt_chamber':
      return wrap(`
        <!-- Sealed Chamber + Gold Twin-Leaf Terminals + Eject Spring + EPDM Hatch -->
        <rect x="34" y="18" width="98" height="68" rx="4" fill="#f1f5f9" stroke="#475569" stroke-width="1.8"/>
        <!-- 4 Gold Twin-Contacts at Ceiling -->
        ${[0, 1, 2, 3].map((i) => `<rect x="${48 + i * 20}" y="20" width="8" height="10" rx="1" fill="#eab308" stroke="#a16207"/>`).join('')}
        <text x="44" y="45" font-size="7.5" font-weight="bold" fill="#92400e">金メッキ二股4極端子</text>
        <text x="48" y="58" font-size="7.5" fill="#334155">接触抵抗 &lt; 5 mΩ</text>
        <!-- Bottom Sealed Door & Blue Catch -->
        <rect x="28" y="84" width="110" height="9" rx="2" fill="#1e293b"/>
        <rect x="38" y="78" width="14" height="6" rx="1" fill="#0284c7"/>
        <text x="150" y="34" font-size="8.5" font-weight="bold" fill="#0f172a">防水バッテリー室</text>
        <text x="150" y="50" font-size="7.5" fill="#334155">・＋ / − / NTC温度 / 通信</text>
        <text x="150" y="64" font-size="7.5" fill="#334155">・脱落防止青色ラッチ爪</text>
        <text x="150" y="78" font-size="7.5" fill="#0284c7">・全周EPDM防水パッキン扉</text>
        <text x="42" y="111" font-size="8" fill="#334155">6A連続通電時の電圧降下と雨天時の浸水を同時に防ぐ高信頼給電ベイ</text>
      `);

    case 'body_grip':
      return wrap(`
        <!-- Top-Down Cross Section of Deep Ergonomic Grip & Lens Clearance -->
        <path d="M52 24 L150 24 L150 84 L52 84 C26 84 22 60 32 36 C38 22 46 20 52 24 Z" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
        <ellipse cx="62" cy="54" rx="18" ry="22" fill="#0284c7" opacity="0.35" stroke="#38bdf8" stroke-dasharray="3 2"/>
        <text x="46" y="57" font-size="7.5" font-weight="bold" fill="#fff">電池内蔵</text>
        <!-- Deep Finger Undercut Arrow -->
        <path d="M120 18 Q106 38 124 44" fill="none" stroke="#dc2626" stroke-width="2.4"/>
        <text x="166" y="34" font-size="8.5" font-weight="bold" fill="#0f172a">深型中指フック構造</text>
        <text x="166" y="50" font-size="7.5" fill="#334155">・シボ加工高摩擦エラストマー</text>
        <text x="166" y="64" font-size="7.5" fill="#334155">・F1.2鏡筒との指隙間を確保</text>
        <text x="166" y="78" font-size="7.5" fill="#dc2626">・前荷重モーメントを掌へ分散</text>
        <text x="44" y="110" font-size="8" fill="#334155">人間工学3D曲面＋シボ革調グリップで重量級大口径レンズも片手で安定保持</text>
      `);

    case 'body_shutter_dials':
      return wrap(`
        <!-- 2-Stage Metal Snap-Dome Force Curve + Front/Rear Optical Encoder Dials -->
        <rect x="16" y="16" width="144" height="76" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="24" y="30" font-size="8" font-weight="bold" fill="#0f172a">2段スナップドーム荷重曲線</text>
        <path d="M28 80 L58 64 L74 70 L108 38 L138 38" fill="none" stroke="#dc2626" stroke-width="2.2"/>
        <circle cx="58" cy="64" r="3.5" fill="#0284c7"/>
        <text x="36" y="58" font-size="7.5" font-weight="bold" fill="#0369a1">半押し1.2N</text>
        <circle cx="108" cy="38" r="3.5" fill="#dc2626"/>
        <text x="86" y="53" font-size="7.5" font-weight="bold" fill="#dc2626">全押し2.8N</text>
        <!-- Right: Quadrature Optical Dial -->
        <rect x="170" y="16" width="136" height="76" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="178" y="31" font-size="8" font-weight="bold" fill="#1d4ed8">前後コマンドダイヤル</text>
        <path d="M182 52 L194 52 L194 42 L208 42 L208 52 L222 52 L222 42 L236 42" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <path d="M188 70 L200 70 L200 60 L214 60 L214 70 L228 70 L228 60 L242 60" fill="none" stroke="#10b981" stroke-width="1.8"/>
        <text x="248" y="50" font-size="7.5" fill="#0369a1">A相</text>
        <text x="248" y="68" font-size="7.5" fill="#047857">B相(90°)</text>
        <text x="178" y="85" font-size="7.5" fill="#1e40af">非接触エンコーダー＋防塵軸</text>
        <text x="44" y="111" font-size="8" fill="#334155">前傾28°シャッター＋前後2ダイヤル＋独立RECボタンで指先直感操作</text>
      `);

    case 'body_top_dials':
      return wrap(`
        <!-- Center Push-Lock Dial Mechanism + Top Status Sub-OLED -->
        <rect x="20" y="20" width="126" height="72" rx="5" fill="#f8fafc" stroke="#475569"/>
        <rect x="44" y="42" width="78" height="32" rx="4" fill="#334155"/>
        <rect x="70" y="28" width="26" height="16" rx="3" fill="#cbd5e1" stroke="#334155"/>
        <path d="M83 18 L83 26" stroke="#dc2626" stroke-width="2"/>
        <text x="36" y="86" font-size="7.5" font-weight="bold" fill="#0f172a">中央プッシュロック解除</text>
        <!-- Right: Top Shoulder Graphical Sub-OLED -->
        <rect x="158" y="20" width="146" height="72" rx="5" fill="#0f172a" stroke="#334155" stroke-width="1.8"/>
        <rect x="170" y="34" width="122" height="10" rx="2" fill="#38bdf8" opacity="0.8"/>
        <rect x="170" y="52" width="54" height="12" rx="2" fill="#10b981"/>
        <circle cx="268" cy="58" r="10" fill="none" stroke="#f8fafc" stroke-width="1.6"/>
        <text x="170" y="82" font-size="7.5" fill="#cbd5e1">省電力・高コントラスト肩部OLED</text>
        <text x="40" y="110" font-size="8" fill="#334155">アルミ削り出しロック付きダイヤル群＋反射透過肩部OLEDで即座に設定確認</text>
      `);

    case 'body_hotshoe':
      return wrap(`
        <!-- 21-Pin Digital Audio Multi-Interface Hot Shoe -->
        <rect x="20" y="20" width="118" height="70" rx="5" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>
        <rect x="34" y="26" width="90" height="12" rx="2" fill="#1e293b"/>
        ${Array.from({ length: 12 }, (_, i) => `<rect x="${38 + i * 7}" y="29" width="3.5" height="6" fill="#facc15"/>`).join('')}
        <circle cx="79" cy="60" r="8" fill="#eab308" stroke="#a16207"/>
        <text x="42" y="84" font-size="7.5" font-weight="bold" fill="#0f172a">先端21ピン高速デジタル接点</text>
        <!-- Right: Digital Audio & Global Flash Sync -->
        <rect x="150" y="20" width="154" height="70" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="158" y="37" font-size="8.5" font-weight="bold" fill="#166534">ケーブルレス直結I/F</text>
        <text x="158" y="53" font-size="7.5" fill="#15803d">・24bit/48kHz 4chデジタル音声</text>
        <text x="158" y="67" font-size="7.5" fill="#15803d">・1/80,000s全速同調通信</text>
        <text x="158" y="81" font-size="7.5" fill="#15803d">・マイク給電＆防水ブーツ対応</text>
        <text x="42" y="110" font-size="8" fill="#334155">高剛性ステンレスシュー＋21ピンI2Sデジタル伝送でノイズゼロ音声収録</text>
      `);

    case 'body_front_shell':
      return wrap(`
        <!-- Thixomolded AZ91D Magnesium Monocoque Front Shell -->
        <rect x="22" y="18" width="132" height="74" rx="8" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
        <circle cx="88" cy="55" r="26" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
        <text x="70" y="58" font-size="8" font-weight="bold" fill="#0f172a">φ69.4</text>
        <circle cx="38" cy="30" r="3.5" fill="#dc2626"/>
        <circle cx="136" cy="68" r="4" fill="#94a3b8"/>
        <!-- Right: Material Properties -->
        <rect x="166" y="18" width="138" height="74" rx="5" fill="#f1f5f9" stroke="#64748b"/>
        <text x="174" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">AZ91D マグネシウム外殻</text>
        <text x="174" y="51" font-size="7.5" fill="#334155">・比重 1.81 (アルミの2/3)</text>
        <text x="174" y="65" font-size="7.5" fill="#334155">・高い比剛性＆振動減衰</text>
        <text x="174" y="79" font-size="7.5" fill="#334155">・強力なEMI電磁波シールド</text>
        <text x="42" y="110" font-size="8" fill="#334155">チクソモールド一体モノコック外装が55mm大口径マウントを強固に保持</text>
      `);

    case 'body_top_deck':
      return wrap(`
        <!-- Sculpted Top Deck & EVF Pentaprism Dome Seal -->
        <path d="M24 72 L94 72 L116 26 L194 26 L216 72 L292 72 L292 86 L24 86 Z" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
        <rect x="128" y="38" width="54" height="30" rx="3" fill="#bae6fd" stroke="#0284c7" stroke-dasharray="3 2"/>
        <text x="135" y="56" font-size="8" font-weight="bold" fill="#0369a1">EVF光学室</text>
        <rect x="132" y="18" width="46" height="8" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <text x="124" y="14" font-size="7.5" font-weight="bold" fill="#0f172a">21ピンホットシュー</text>
        <!-- Waterproof Seal Line -->
        <line x1="24" y1="88" x2="292" y2="88" stroke="#0ea5e9" stroke-width="2.5" stroke-dasharray="5 2"/>
        <text x="90" y="99" font-size="7.5" font-weight="bold" fill="#0369a1">全周シリコン防塵防滴ガスケット接合</text>
        <text x="44" y="112" font-size="8" fill="#334155">マグネシウム一体トップ屋根がEVF保護・放熱・撥水マイク収音を統合</text>
      `);

    case 'body_rear_controls':
      return wrap(`
        <!-- Rear Blind-Touch Ergonomics: LCD Window + Thumb Rest + AF Joystick + Control Wheel -->
        <rect x="18" y="16" width="156" height="76" rx="6" fill="#334155" stroke="#0f172a"/>
        <rect x="28" y="28" width="84" height="54" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="48" y="58" font-size="8" font-weight="bold" fill="#0369a1">4軸LCD窓</text>
        <rect x="124" y="22" width="38" height="12" rx="4" fill="#1e293b"/>
        <circle cx="136" cy="48" r="7" fill="#0ea5e9" stroke="#fff" stroke-width="1.2"/>
        <circle cx="142" cy="72" r="11" fill="none" stroke="#cbd5e1" stroke-width="3"/>
        <!-- Right Description -->
        <rect x="186" y="16" width="120" height="76" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="194" y="34" font-size="8" font-weight="bold" fill="#0f172a">親指ブラインド操作系</text>
        <text x="194" y="49" font-size="7.5" fill="#0369a1">・8方向AFジョイスティック</text>
        <text x="194" y="63" font-size="7.5" fill="#334155">・独立親指AF-ONボタン</text>
        <text x="194" y="77" font-size="7.5" fill="#334155">・回転＋4方向ホイール</text>
        <text x="42" y="111" font-size="8" fill="#334155">ファインダーから目を離さず指先の触覚だけで瞳AFと露出を自在に操作</text>
      `);

    case 'body_card_door':
      return wrap(`
        <!-- 2-Action Slide-Lock Dual CFexpress/SD Door -->
        <rect x="24" y="18" width="96" height="74" rx="5" fill="#1e293b" stroke="#0f172a"/>
        <rect x="38" y="30" width="16" height="22" rx="2" fill="#cbd5e1"/>
        <path d="M46 56 L46 72" stroke="#f59e0b" stroke-width="2.4"/>
        <polygon points="46,76 41,68 51,68" fill="#f59e0b"/>
        <rect x="78" y="24" width="34" height="62" rx="3" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 2"/>
        <!-- Right Info -->
        <rect x="134" y="18" width="170" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="142" y="35" font-size="8.5" font-weight="bold" fill="#92400e">二重スライドロック防水扉</text>
        <text x="142" y="51" font-size="7.5" fill="#78350f">・撮影中の手のひら誤開放を防止</text>
        <text x="142" y="65" font-size="7.5" fill="#78350f">・開放検知スイッチでデータ保護</text>
        <text x="142" y="79" font-size="7.5" fill="#78350f">・CFexpress発熱の補助放熱＆防水</text>
        <text x="42" y="111" font-size="8" fill="#334155">2,000MB/s級超高速メディアを雨塵と誤開放から守る高信頼カードドア</text>
      `);

    case 'body_io_doors':
      return wrap(`
        <!-- 3-Way Split Independent Weather-Sealed I/O Port Doors -->
        <rect x="26" y="16" width="84" height="22" rx="4" fill="#334155" stroke="#0ea5e9" stroke-width="1.5"/>
        <text x="36" y="30" font-size="7.5" font-weight="bold" fill="#fff">① 音声(Mic/HP)</text>
        <rect x="26" y="42" width="84" height="24" rx="4" fill="#0284c7" stroke="#0f172a" stroke-width="1.5"/>
        <text x="32" y="57" font-size="7.5" font-weight="bold" fill="#fff">② HDMI / USB-C</text>
        <rect x="26" y="70" width="84" height="22" rx="4" fill="#334155" stroke="#64748b" stroke-width="1.5"/>
        <text x="34" y="84" font-size="7.5" font-weight="bold" fill="#fff">③ 2.5GbE LAN</text>
        <!-- Right Benefit -->
        <rect x="128" y="18" width="176" height="72" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="36" font-size="8.5" font-weight="bold" fill="#0369a1">3分割独立カバーの利点</text>
        <text x="136" y="52" font-size="7.5" fill="#0c4a6e">・使う端子だけ開け他を防水保護</text>
        <text x="136" y="66" font-size="7.5" fill="#0c4a6e">・硬質外皮＋軟質パッキン2色成形</text>
        <text x="136" y="80" font-size="7.5" fill="#0c4a6e">・4軸LCD展開や動画リグに非干渉</text>
        <text x="42" y="111" font-size="8" fill="#334155">露出開口面積を66%削減し、雨天のライブ配信・音声収録でも安心</text>
      `);

    case 'body_baseplate':
      return wrap(`
        <!-- Optical-Axis Aligned 1/4-20 UNC Stainless Tripod Load Socket -->
        <rect x="20" y="26" width="166" height="58" rx="7" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
        <!-- Optical Axis Dashed Line -->
        <line x1="103" y1="12" x2="103" y2="96" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="4 2"/>
        <circle cx="103" cy="55" r="14" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.5"/>
        <circle cx="103" cy="55" r="5.5" fill="#0f172a"/>
        <circle cx="103" cy="35" r="3" fill="#0f172a"/>
        <rect x="30" y="36" width="34" height="38" rx="3" fill="#475569" stroke="#94a3b8"/>
        <text x="34" y="58" font-size="7" fill="#e2e8f0">電池蓋</text>
        <!-- Right Spec -->
        <rect x="198" y="20" width="108" height="70" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="206" y="36" font-size="8" font-weight="bold" fill="#dc2626">光軸直下 (x = 0)</text>
        <text x="206" y="51" font-size="7.5" fill="#334155">・SUS 1/4-20 UNC</text>
        <text x="206" y="65" font-size="7.5" fill="#334155">・動画回り止めピン穴</text>
        <text x="206" y="79" font-size="7.5" fill="#334155">・引抜耐荷重 &gt;1500N</text>
        <text x="42" y="111" font-size="8" fill="#334155">レンズ光軸直下の高荷重ステンレス三脚座が三脚・ジンバルでブレを根絶</text>
      `);

    // =========================================================================
    // Phase 7 Super-Dissection: 50mm F1.2 Prime Lens (+12 New Schematics)
    // =========================================================================
    case 'lens_filter_ring':
      return wrap(`
        <!-- φ72mm Fine Pitch Filter Thread & Spanner Retainer Ring Cross Section -->
        <rect x="20" y="20" width="124" height="72" rx="6" fill="#f8fafc" stroke="#475569"/>
        <circle cx="82" cy="56" r="28" fill="none" stroke="#1e293b" stroke-width="5"/>
        <circle cx="82" cy="56" r="23" fill="none" stroke="#d97706" stroke-width="2.5"/>
        <circle cx="82" cy="56" r="19" fill="#e0f2fe" stroke="#64748b" stroke-dasharray="3 2"/>
        <!-- 4 Spanner Notches -->
        <rect x="65" y="38" width="5" height="3" fill="#94a3b8" transform="rotate(45 67 40)"/>
        <rect x="94" y="38" width="5" height="3" fill="#94a3b8" transform="rotate(-45 96 40)"/>
        <rect x="65" y="71" width="5" height="3" fill="#94a3b8" transform="rotate(-45 67 72)"/>
        <rect x="94" y="71" width="5" height="3" fill="#94a3b8" transform="rotate(45 96 72)"/>
        <text x="64" y="59" font-size="8" font-weight="bold" fill="#0369a1">φ72mm</text>
        <rect x="156" y="20" width="148" height="72" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="164" y="37" font-size="8.5" font-weight="bold" fill="#92400e">M72×0.75mm 精密ねじ枠</text>
        <text x="164" y="52" font-size="7.5" fill="#78350f">・ND/PLフィルターを水平装着</text>
        <text x="164" y="66" font-size="7.5" fill="#78350f">・4点スパナ溝で前玉を均等固定</text>
        <text x="164" y="80" font-size="7.5" fill="#78350f">・衝撃から大口径XA前玉を保護</text>
        <text x="36" y="111" font-size="8" fill="#334155">0.75mm細目ねじで保護フィルターや可変NDを着脱しつつ前玉の偏心を防止</text>
      `);

    case 'lens_front_meniscus':
      return wrap(`
        <!-- Group 2 High-Index Positive Meniscus & Micron Brass Air-Gap Spacer -->
        <path d="M58 20 Q82 56 58 92 L74 92 Q96 56 74 20 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.6"/>
        <rect x="86" y="20" width="6" height="14" rx="1" fill="#eab308" stroke="#a16207"/>
        <rect x="86" y="78" width="6" height="14" rx="1" fill="#eab308" stroke="#a16207"/>
        <line x1="20" y1="36" x2="68" y2="36" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="68" y1="36" x2="128" y2="48" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="20" y1="76" x2="68" y2="76" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="68" y1="76" x2="128" y2="64" stroke="#0284c7" stroke-width="1.8"/>
        <text x="74" y="16" font-size="7.5" font-weight="bold" fill="#b45309">真鍮スペーサー(±1μm)</text>
        <rect x="142" y="20" width="164" height="72" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="150" y="37" font-size="8.5" font-weight="bold" fill="#0369a1">高屈折ランタン系正メニスカス</text>
        <text x="150" y="52" font-size="7.5" fill="#0c4a6e">・屈折率 n &gt; 1.85 で緩やかに集光</text>
        <text x="150" y="66" font-size="7.5" fill="#0c4a6e">・F1.2の球面収差を段階的に抑制</text>
        <text x="150" y="80" font-size="7.5" fill="#b45309">・真鍮リングで空気間隔をミクロン管理</text>
        <text x="34" y="111" font-size="8" fill="#334155">前玉からの大光束を優しく内側へ曲げ、後段EDレンズへ渡す第2集光群</text>
      `);

    case 'lens_iris_cam':
      return wrap(`
        <!-- 11-Slot Non-Linear Iris Cam Actuating Ring -->
        <circle cx="84" cy="55" r="34" fill="#cbd5e1" stroke="#334155" stroke-width="1.8"/>
        <circle cx="84" cy="55" r="20" fill="#ffffff" stroke="#475569" stroke-width="1.4"/>
        ${Array.from({ length: 11 }, (_, i) => {
          const a = (i / 11) * Math.PI * 2;
          const x1 = 84 + Math.cos(a) * 23;
          const y1 = 55 + Math.sin(a) * 23;
          const x2 = 84 + Math.cos(a + 0.34) * 31;
          const y2 = 55 + Math.sin(a + 0.34) * 31;
          return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#0f172a" stroke-width="2.2" stroke-linecap="round"/>`;
        }).join('')}
        <path d="M115 70 A34 34 0 0 1 98 88" fill="none" stroke="#eab308" stroke-width="4.5"/>
        <rect x="142" y="18" width="164" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="150" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">11本非線形カム溝リング</text>
        <text x="150" y="51" font-size="7.5" fill="#334155">・11枚の絞り羽根ピンを同時案内</text>
        <text x="150" y="65" font-size="7.5" fill="#334155">・F1.2〜F16の1/3段面積を均等化</text>
        <text x="150" y="79" font-size="7.5" fill="#b45309">・外周の真鍮セクターギアで駆動</text>
        <text x="36" y="111" font-size="8" fill="#334155">リングが数度回るだけで11枚の羽根が同期開閉し美しい円形ボケを維持</text>
      `);

    case 'lens_iris_stepper':
      return wrap(`
        <!-- 1/64 Micro-Stepping Iris Motor + POM Gear + Home Photo-Interrupter -->
        <rect x="20" y="34" width="44" height="40" rx="5" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>
        <text x="27" y="57" font-size="7.5" font-weight="bold" fill="#fff">Stepper</text>
        <circle cx="82" cy="54" r="14" fill="#eab308" stroke="#a16207" stroke-width="1.5"/>
        <circle cx="110" cy="44" r="18" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" stroke-dasharray="3 2"/>
        <rect x="112" y="68" width="22" height="14" rx="2" fill="#1e293b"/>
        <text x="115" y="78" font-size="6.5" fill="#38bdf8">原点</text>
        <rect x="146" y="18" width="160" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="154" y="35" font-size="8.5" font-weight="bold" fill="#92400e">1/64 静音マイクロステップ駆動</text>
        <text x="154" y="51" font-size="7.5" fill="#78350f">・正弦波電流で動画録音でも無音</text>
        <text x="154" y="65" font-size="7.5" fill="#78350f">・POM樹脂静音減速ギアでガタ抑制</text>
        <text x="154" y="79" font-size="7.5" fill="#0369a1">・光学フォトインタラプタ原点検出</text>
        <text x="34" y="111" font-size="8" fill="#334155">動画撮影中の滑らかなシームレス露出変化と120fps高速絞り追従を両立</text>
      `);

    case 'lens_xd_stators':
      return wrap(`
        <!-- Quad XD Linear Motor Stator: N52 Magnet Bars + Soft-Iron Flux Return Yoke -->
        <rect x="20" y="20" width="120" height="72" rx="5" fill="#f8fafc" stroke="#475569"/>
        <rect x="30" y="28" width="100" height="10" rx="2" fill="#64748b"/>
        <rect x="34" y="38" width="44" height="12" rx="2" fill="#dc2626"/>
        <rect x="82" y="38" width="44" height="12" rx="2" fill="#2563eb"/>
        <text x="52" y="47" font-size="8" font-weight="bold" fill="#fff">N</text>
        <text x="100" y="47" font-size="8" font-weight="bold" fill="#fff">S</text>
        <!-- Magnetic Flux Loop -->
        <path d="M56 50 C56 68, 104 68, 104 50" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="3 2"/>
        <rect x="52" y="62" width="56" height="16" rx="3" fill="#d97706" opacity="0.85"/>
        <text x="64" y="73" font-size="7.5" font-weight="bold" fill="#fff">可動コイル</text>
        <rect x="152" y="20" width="154" height="72" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="160" y="37" font-size="8.5" font-weight="bold" fill="#1d4ed8">N52磁石×8＋軟鉄ヨーク</text>
        <text x="160" y="52" font-size="7.5" fill="#1e40af">・鏡筒周囲4方向(45°対称)配置</text>
        <text x="160" y="66" font-size="7.5" fill="#1e40af">・閉磁気回路で磁束を空隙へ集中</text>
        <text x="160" y="80" font-size="7.5" fill="#1e40af">・漏洩磁束を防ぎF = I(L×B)最大化</text>
        <text x="36" y="111" font-size="8" fill="#334155">強力な固定磁場が重いF1.2ガラス群をギア無しで爆速かつ無音に加速</text>
      `);

    case 'lens_guide_shafts':
      return wrap(`
        <!-- 4x Centerless-Ground Titanium Guide Shafts & End-Ring Cage -->
        <rect x="24" y="22" width="12" height="68" rx="3" fill="#64748b"/>
        <rect x="128" y="22" width="12" height="68" rx="3" fill="#64748b"/>
        <rect x="36" y="30" width="92" height="6" fill="#cbd5e1" stroke="#334155"/>
        <rect x="36" y="76" width="92" height="6" fill="#cbd5e1" stroke="#334155"/>
        <rect x="64" y="25" width="22" height="16" rx="2" fill="#eab308" stroke="#a16207"/>
        <rect x="78" y="71" width="22" height="16" rx="2" fill="#eab308" stroke="#a16207"/>
        <path d="M52 56 L112 56" stroke="#0284c7" stroke-width="2.2"/>
        <polygon points="116,56 108,52 108,60" fill="#0284c7"/>
        <polygon points="48,56 56,52 56,60" fill="#0284c7"/>
        <rect x="152" y="20" width="154" height="72" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="160" y="37" font-size="8.5" font-weight="bold" fill="#0f172a">超真直チタン軸×4本ケージ</text>
        <text x="160" y="52" font-size="7.5" fill="#334155">・真直度 &lt; 1.0 μm の無心研磨</text>
        <text x="160" y="66" font-size="7.5" fill="#334155">・対角2軸支持でチルト・こじり零</text>
        <text x="160" y="80" font-size="7.5" fill="#334155">・自己潤滑ブッシュで超低摩擦滑走</text>
        <text x="36" y="111" font-size="8" fill="#334155">F1.2の極薄ピント面を1ミクロンも傾けず前後のAFレンズ群を直進案内</text>
      `);

    case 'lens_mr_encoders':
      return wrap(`
        <!-- Sub-Micron MR Magnetoresistive Linear Scale & Read Head -->
        <rect x="20" y="58" width="124" height="14" rx="2" fill="#1e293b"/>
        ${Array.from({ length: 12 }, (_, i) => `<rect x="${24 + i * 10}" y="60" width="5" height="10" fill="${i % 2 === 0 ? '#ef4444' : '#3b82f6'}"/>`).join('')}
        <rect x="66" y="34" width="32" height="16" rx="3" fill="#eab308" stroke="#a16207"/>
        <text x="72" y="45" font-size="7.5" font-weight="bold" fill="#1e293b">MR IC</text>
        <path d="M24 26 Q40 16, 56 26 T88 26 T120 26" fill="none" stroke="#16a34a" stroke-width="1.8"/>
        <rect x="154" y="18" width="152" height="74" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="162" y="35" font-size="8.5" font-weight="bold" fill="#166534">0.1 μm MR磁気スケール</text>
        <text x="162" y="51" font-size="7.5" fill="#15803d">・N/S微細着磁のsin/cos波形読取</text>
        <text x="162" y="65" font-size="7.5" fill="#15803d">・非接触・摩耗ゼロで絶対位置監視</text>
        <text x="162" y="79" font-size="7.5" fill="#15803d">・毎秒数千回のPID帰還でピタ止め</text>
        <text x="32" y="111" font-size="8" fill="#334155">目に見えない磁気ものさしがAFレンズの位置を0.0001mm単位で報告</text>
      `);

    case 'lens_rear_convex':
      return wrap(`
        <!-- Group 8 High-Index Sagittal Coma & Field Curvature Corrector -->
        <path d="M56 22 Q74 56 56 90 L72 90 Q88 56 72 22 Z" fill="#c7d2fe" stroke="#4f46e5" stroke-width="1.6"/>
        <line x1="20" y1="30" x2="66" y2="38" stroke="#6366f1" stroke-width="1.6"/>
        <line x1="66" y1="38" x2="126" y2="48" stroke="#6366f1" stroke-width="1.6"/>
        <line x1="20" y1="82" x2="66" y2="74" stroke="#6366f1" stroke-width="1.6"/>
        <line x1="66" y1="74" x2="126" y2="64" stroke="#6366f1" stroke-width="1.6"/>
        <circle cx="128" cy="56" r="4" fill="#4f46e5"/>
        <rect x="148" y="20" width="158" height="72" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="156" y="37" font-size="8.5" font-weight="bold" fill="#3730a3">第8群 サジタルコマ補正凸玉</text>
        <text x="156" y="52" font-size="7.5" fill="#312e81">・夜景の点光源が鳥状に崩れるのを防ぐ</text>
        <text x="156" y="66" font-size="7.5" fill="#312e81">・周辺像面湾曲の最終フラット補正</text>
        <text x="156" y="80" font-size="7.5" fill="#312e81">・高屈折ランタンガラスで薄型化</text>
        <text x="36" y="111" font-size="8" fill="#334155">F1.2開放の星空・イルミネーションでも画面四隅まで点光源を丸く結像</text>
      `);

    case 'lens_mcu_pcb':
      return wrap(`
        <!-- Circular Donut HDI Ring PCB: 32-bit AF MCU + 4x H-Bridge MOSFET Drivers -->
        <circle cx="80" cy="55" r="34" fill="#15803d" stroke="#14532d" stroke-width="1.8"/>
        <circle cx="80" cy="55" r="19" fill="#ffffff" stroke="#166534" stroke-width="1.5"/>
        <rect x="73" y="24" width="14" height="10" rx="2" fill="#1e293b"/>
        <rect x="98" y="35" width="9" height="9" rx="1" fill="#facc15"/>
        <rect x="98" y="66" width="9" height="9" rx="1" fill="#facc15"/>
        <rect x="53" y="35" width="9" height="9" rx="1" fill="#facc15"/>
        <rect x="53" y="66" width="9" height="9" rx="1" fill="#facc15"/>
        <text x="66" y="58" font-size="7.5" font-weight="bold" fill="#166534">光路貫通</text>
        <rect x="136" y="18" width="170" height="74" rx="5" fill="#f0fdf4" stroke="#15803d"/>
        <text x="144" y="35" font-size="8.5" font-weight="bold" fill="#166534">ドーナツ型HDI制御基板</text>
        <text x="144" y="51" font-size="7.5" fill="#15803d">・32bitリアルタイムAF専用マイコン</text>
        <text x="144" y="65" font-size="7.5" fill="#15803d">・4ch大電流HブリッジMOSFETドライバ</text>
        <text x="144" y="79" font-size="7.5" fill="#15803d">・ボディと120Hz超高速シリアル通信</text>
        <text x="34" y="111" font-size="8" fill="#334155">光路を囲む環状基板が4基のXDモーターと絞り・MFリングを一括頭脳制御</text>
      `);

    case 'lens_mf_encoder':
      return wrap(`
        <!-- Non-Contact Optical Slotted Quadrature MF Ring Encoder Wheel -->
        <circle cx="80" cy="55" r="32" fill="none" stroke="#eab308" stroke-width="6"/>
        <circle cx="80" cy="55" r="32" fill="none" stroke="#1e293b" stroke-width="6" stroke-dasharray="3 3"/>
        <rect x="68" y="80" width="24" height="12" rx="2" fill="#1e293b"/>
        <text x="71" y="89" font-size="6.5" fill="#38bdf8">光検出</text>
        <rect x="136" y="18" width="170" height="74" rx="5" fill="#fffbeb" stroke="#eab308"/>
        <text x="144" y="35" font-size="8.5" font-weight="bold" fill="#92400e">リニア・レスポンスMF検出</text>
        <path d="M148 54 L160 54 L160 44 L172 44 L172 54 L184 54 L184 44 L196 44" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <path d="M154 68 L166 68 L166 58 L178 58 L178 68 L190 68 L190 58 L202 58" fill="none" stroke="#16a34a" stroke-width="1.6"/>
        <text x="210" y="54" font-size="7.5" fill="#0369a1">2,048 PPR</text>
        <text x="210" y="68" font-size="7.5" fill="#15803d">回転角に比例</text>
        <text x="144" y="84" font-size="7.5" fill="#78350f">再現性100%の映画向けMF操作感</text>
        <text x="34" y="111" font-size="8" fill="#334155">光のスリット通過を2相読取し、回す速さによらず常に同じ角度で合焦</text>
      `);

    case 'lens_click_detent':
      return wrap(`
        <!-- Switchable Steel-Ball Spring Click / De-Click Aperture Detent Cam -->
        <rect x="18" y="18" width="136" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="26" y="32" font-size="8" font-weight="bold" fill="#0f172a">CLICK ON (写真用 1/3段)</text>
        <path d="M26 52 L44 52 L52 60 L60 52 L78 52 L86 60 L94 52 L112 52 L120 60 L128 52 L144 52" fill="none" stroke="#334155" stroke-width="2"/>
        <circle cx="86" cy="54" r="5.5" fill="#94a3b8" stroke="#0f172a"/>
        <path d="M86 36 L86 48" stroke="#d97706" stroke-width="2.5" stroke-dasharray="2 1.5"/>
        <text x="34" y="79" font-size="7.5" fill="#475569">鋼球がV溝にはまりカチカチ感</text>
        <rect x="164" y="18" width="142" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="172" y="32" font-size="8" font-weight="bold" fill="#92400e">CLICK OFF (動画用 無段階)</text>
        <path d="M174 62 L294 62" stroke="#334155" stroke-width="2"/>
        <circle cx="234" cy="46" r="5.5" fill="#94a3b8" stroke="#0f172a"/>
        <rect x="218" y="36" width="32" height="6" rx="2" fill="#f59e0b"/>
        <text x="174" y="80" font-size="7.5" fill="#78350f">カムが鋼球を持ち上げ完全無音!</text>
        <text x="34" y="111" font-size="8" fill="#334155">スイッチ1つで静止画のカチカチ操作と動画の無音無段階操作を物理切替</text>
      `);

    case 'lens_rear_bayonet':
      return wrap(`
        <!-- Hardened Stainless 4-Lug Rear Lens Bayonet + 12-Pin Gold Contacts + Seal -->
        <circle cx="82" cy="55" r="34" fill="#cbd5e1" stroke="#334155" stroke-width="1.8"/>
        <circle cx="82" cy="55" r="22" fill="#ffffff" stroke="#475569" stroke-width="1.5"/>
        <circle cx="82" cy="55" r="36" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-dasharray="5 2"/>
        ${Array.from({ length: 10 }, (_, i) => {
          const a = Math.PI * 0.28 + (i / 9) * (Math.PI * 0.44);
          const x = 82 + Math.cos(a) * 24;
          const y = 55 + Math.sin(a) * 24;
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2" fill="#eab308"/>`;
        }).join('')}
        <text x="64" y="58" font-size="8" font-weight="bold" fill="#0f172a">4爪バヨネット</text>
        <rect x="138" y="18" width="168" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="146" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">レンズ側ステンレスマウント</text>
        <text x="146" y="51" font-size="7.5" fill="#334155">・平面度 &lt; 3 μm 鏡面ラップ加工</text>
        <text x="146" y="65" font-size="7.5" fill="#b45309">・12極金メッキ高速通信＆給電接点</text>
        <text x="146" y="79" font-size="7.5" fill="#0284c7">・全周EPDM防水ゴムリップ密着</text>
        <text x="34" y="111" font-size="8" fill="#334155">ボディ側マウント(M01)と強固に噛み合い光軸精度・防水・大電流伝送を完結</text>
      `);

    // =========================================================================
    // Phase 7 Super-Dissection: Sensor & 8.5-Stop 5-Axis IBIS (+12 New Schematics)
    // =========================================================================
    case 'sensor_pzt_bar':
      return wrap(`
        <!-- Multi-Layer PZT Piezoelectric Ultrasonic Bar Flexural Standing Wave -->
        <rect x="20" y="28" width="122" height="16" rx="3" fill="#bae6fd" stroke="#0284c7" stroke-width="1.4"/>
        <path d="M22 36 Q42 24, 62 36 T102 36 T140 36" fill="none" stroke="#0284c7" stroke-width="2"/>
        <rect x="30" y="48" width="102" height="16" rx="2" fill="#eab308" stroke="#a16207" stroke-width="1.4"/>
        <rect x="34" y="51" width="44" height="10" fill="#e2e8f0"/>
        <rect x="84" y="51" width="44" height="10" fill="#e2e8f0"/>
        <text x="50" y="59" font-size="7" font-weight="bold" fill="#1e293b">Ag＋</text>
        <text x="100" y="59" font-size="7" font-weight="bold" fill="#1e293b">Ag−</text>
        <path d="M52 24 L46 14 M82 24 L82 12 M112 24 L118 14" stroke="#dc2626" stroke-width="1.8"/>
        <text x="34" y="82" font-size="7.5" font-weight="bold" fill="#b45309">30〜70kHz 交流電圧 → 逆圧電伸縮</text>
        <rect x="156" y="18" width="150" height="74" rx="5" fill="#fffbeb" stroke="#eab308"/>
        <text x="164" y="35" font-size="8.5" font-weight="bold" fill="#92400e">積層PZT超音波バー</text>
        <text x="164" y="51" font-size="7.5" fill="#78350f">・左右2分割電極で複数モード励起</text>
        <text x="164" y="65" font-size="7.5" fill="#78350f">・3〜5万Gの剥離加速度を発生</text>
        <text x="164" y="79" font-size="7.5" fill="#78350f">・共振周波数を自動位相追尾</text>
        <text x="34" y="111" font-size="8" fill="#334155">毎秒数万回の超高速伸縮が防塵ガラス上のミクロのホコリを瞬時に弾き飛ばす</text>
      `);

    case 'sensor_qwp_plate':
      return wrap(`
        <!-- Zero-Order λ/4 Quarter-Wave Depolarizer + Rear V-Split Quartz OLPF -->
        <line x1="16" y1="54" x2="48" y2="54" stroke="#0284c7" stroke-width="2.2"/>
        <line x1="30" y1="40" x2="30" y2="68" stroke="#dc2626" stroke-width="1.8"/>
        <text x="16" y="34" font-size="7" fill="#dc2626">直線偏光</text>
        <rect x="52" y="22" width="18" height="64" rx="3" fill="#e9d5ff" stroke="#9333ea" stroke-width="1.6"/>
        <text x="54" y="57" font-size="7.5" font-weight="bold" fill="#6b21a8">λ/4</text>
        <!-- Circular Polarization Helix -->
        <ellipse cx="92" cy="54" rx="8" ry="14" fill="none" stroke="#9333ea" stroke-width="1.8"/>
        <text x="76" y="34" font-size="7" fill="#7e22ce">円偏光化</text>
        <!-- Rear V-Split Quartz -->
        <rect x="112" y="22" width="18" height="64" rx="3" fill="#bae6fd" stroke="#0284c7" stroke-width="1.6"/>
        <line x1="130" y1="46" x2="152" y2="38" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="130" y1="62" x2="152" y2="70" stroke="#0284c7" stroke-width="1.8"/>
        <rect x="160" y="18" width="146" height="74" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <text x="168" y="35" font-size="8.5" font-weight="bold" fill="#6b21a8">1/4波長板＋垂直水晶</text>
        <text x="168" y="51" font-size="7.5" fill="#581c87">・位相差 π/2 で円偏光へ変換</text>
        <text x="168" y="65" font-size="7.5" fill="#581c87">・CPLフィルター装着でも均等分離</text>
        <text x="168" y="79" font-size="7.5" fill="#0369a1">・S04と合わせて16点ガウス完成</text>
        <text x="34" y="111" font-size="8" fill="#334155">偏光状態を均等リセットすることで水面反射やPL撮影でも偽色を完全抑制</text>
      `);

    case 'sensor_cucu_layer':
      return wrap(`
        <!-- 3μm-Pitch Wafer-on-Wafer Cu-Cu Bumpless Direct Hybrid Bonding -->
        <rect x="20" y="18" width="128" height="20" rx="2" fill="#0ea5e9" opacity="0.25" stroke="#0284c7"/>
        <text x="36" y="31" font-size="7.5" font-weight="bold" fill="#0369a1">第1ウェハー (BSI画素層)</text>
        <!-- Oxide + Direct Copper-to-Copper Pads -->
        <rect x="20" y="38" width="128" height="24" fill="#f1f5f9" stroke="#64748b"/>
        ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${28 + i * 20}" y="38" width="10" height="24" fill="#d97706" stroke="#92400e"/>`).join('')}
        <line x1="20" y1="50" x2="148" y2="50" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="3 2"/>
        <rect x="20" y="62" width="128" height="20" rx="2" fill="#6366f1" opacity="0.25" stroke="#4f46e5"/>
        <text x="34" y="75" font-size="7.5" font-weight="bold" fill="#3730a3">第2ウェハー (4nm ADC層)</text>
        <rect x="160" y="18" width="146" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="168" y="35" font-size="8.5" font-weight="bold" fill="#92400e">バンプレスCu-Cu直接接合</text>
        <text x="168" y="51" font-size="7.5" fill="#78350f">・ピッチ 2〜3 μm で数百万本直結</text>
        <text x="168" y="65" font-size="7.5" fill="#78350f">・はんだ不要・遅延1/100以下</text>
        <text x="168" y="79" font-size="7.5" fill="#dc2626">・垂直銅柱が熱抵抗も約20%低減</text>
        <text x="30" y="111" font-size="8" fill="#334155">原子レベル研磨(CMP)と低温拡散で画素直下から爆速並列データ転送を実現</text>
      `);

    case 'sensor_logic_dram':
      return wrap(`
        <!-- Wafer 2 (Column-Parallel CDS/ADC) + Wafer 3 (120fps Stacked DRAM) -->
        <rect x="20" y="18" width="128" height="32" rx="4" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.5"/>
        <text x="30" y="31" font-size="8" font-weight="bold" fill="#3730a3">Wafer 2: 列並列 CDS / ADC</text>
        ${Array.from({ length: 8 }, (_, i) => `<rect x="${28 + i * 14}" y="36" width="9" height="10" rx="1" fill="#eab308"/>`).join('')}
        <rect x="20" y="56" width="128" height="32" rx="4" fill="#ecfeff" stroke="#0891b2" stroke-width="1.5"/>
        <text x="30" y="70" font-size="8" font-weight="bold" fill="#155e75">Wafer 3: 超高速積層DRAM</text>
        <text x="32" y="82" font-size="7.5" fill="#0e7490">120fps RAW 一時超広帯域保持</text>
        <rect x="160" y="18" width="146" height="74" rx="5" fill="#f8fafc" stroke="#4f46e5"/>
        <text x="168" y="35" font-size="8.5" font-weight="bold" fill="#3730a3">異種プロセス3D統合</text>
        <text x="168" y="51" font-size="7.5" fill="#312e81">・CDS差分で熱雑音を相殺除去</text>
        <text x="168" y="65" font-size="7.5" fill="#312e81">・数千列同時14〜16bit A/D変換</text>
        <text x="168" y="79" font-size="7.5" fill="#0e7490">・DRAMがGS全画素同時出力を吸収</text>
        <text x="32" y="111" font-size="8" fill="#334155">アナログ翻訳(ADC)と巨大メモリ(DRAM)を画素直下に貼り合わせた爆速構造</text>
      `);

    case 'sensor_vcm_coils':
      return wrap(`
        <!-- 3x Independent Air-Core Flat VCM Coils: Y1 + Y2 (Y & Roll) + X1 (X) -->
        <rect x="20" y="18" width="128" height="74" rx="6" fill="#f1f5f9" stroke="#64748b"/>
        <!-- Y1 & Y2 Bottom Coils -->
        <rect x="30" y="66" width="42" height="18" rx="4" fill="none" stroke="#c86432" stroke-width="4.5"/>
        <rect x="82" y="66" width="42" height="18" rx="4" fill="none" stroke="#c86432" stroke-width="4.5"/>
        <!-- X1 Right Coil -->
        <rect x="122" y="24" width="18" height="38" rx="4" fill="none" stroke="#c86432" stroke-width="4.5"/>
        <!-- Force Arrows -->
        <path d="M51 62 L51 48" stroke="#0284c7" stroke-width="2"/>
        <path d="M103 48 L103 62" stroke="#0284c7" stroke-width="2"/>
        <path d="M116 43 L102 43" stroke="#dc2626" stroke-width="2"/>
        <text x="38" y="45" font-size="7.5" font-weight="bold" fill="#0369a1">Y1/Y2 → Y＆Roll</text>
        <rect x="160" y="18" width="146" height="74" rx="5" fill="#fff7ed" stroke="#c86432"/>
        <text x="168" y="35" font-size="8.5" font-weight="bold" fill="#9a3412">空芯平面ボイスコイル×3</text>
        <text x="168" y="51" font-size="7.5" fill="#7c2d12">・鉄芯無しでコギング・ガタ零</text>
        <text x="168" y="65" font-size="7.5" fill="#7c2d12">・同相=上下 / 逆相=回転(Roll)</text>
        <text x="168" y="79" font-size="7.5" fill="#0369a1">・最大8.5段 5軸手ぶれ補正</text>
        <text x="34" y="111" font-size="8" fill="#334155">ローレンツ力 F = N·I·(L×B) が歯車なしでセンサーをミリ秒未満で制御</text>
      `);

    case 'sensor_hall_pcb':
      return wrap(`
        <!-- 3-Axis Sub-Micron Hall-Effect Position Sensor inside Air-Core Coils -->
        <rect x="20" y="56" width="58" height="16" rx="2" fill="#dc2626"/>
        <rect x="82" y="56" width="58" height="16" rx="2" fill="#2563eb"/>
        <text x="44" y="67" font-size="8" font-weight="bold" fill="#fff">N極</text>
        <text x="106" y="67" font-size="8" font-weight="bold" fill="#fff">S極</text>
        <!-- Hall IC hovering over N/S zero-crossing -->
        <rect x="66" y="26" width="28" height="16" rx="3" fill="#16a34a" stroke="#14532d" stroke-width="1.4"/>
        <text x="70" y="37" font-size="7" font-weight="bold" fill="#fff">Hall IC</text>
        <line x1="80" y1="42" x2="80" y2="56" stroke="#eab308" stroke-width="2" stroke-dasharray="2 2"/>
        <path d="M56 34 L42 34 M104 34 L118 34" stroke="#0284c7" stroke-width="1.8"/>
        <text x="34" y="86" font-size="7.5" font-weight="bold" fill="#166534">N/S境界の急勾配磁場を0.1μm読取</text>
        <rect x="154" y="18" width="152" height="74" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="162" y="35" font-size="8.5" font-weight="bold" fill="#166534">3軸ホール効果位置センサー</text>
        <text x="162" y="51" font-size="7.5" fill="#15803d">・分解能 &lt; 0.1 μm (0.006° 検出)</text>
        <text x="162" y="65" font-size="7.5" fill="#15803d">・完全非接触で摩耗・遅延ゼロ</text>
        <text x="162" y="79" font-size="7.5" fill="#15803d">・毎秒数千回のPID帰還サーボ</text>
        <text x="30" y="111" font-size="8" fill="#334155">磁石の境界を横切る微小な磁束変化を電圧変換しセンサー位置を精密監視</text>
      `);

    case 'sensor_preload_plates':
      return wrap(`
        <!-- Magnetic Preload Ferromagnetic Plates + CuW Center-of-Gravity Counterweight -->
        <rect x="22" y="24" width="118" height="14" rx="3" fill="#94a3b8" stroke="#334155"/>
        <text x="48" y="34" font-size="7.5" font-weight="bold" fill="#0f172a">可動ステージ</text>
        <rect x="34" y="38" width="38" height="7" fill="#475569"/>
        <rect x="86" y="38" width="38" height="7" fill="#475569"/>
        <circle cx="80" cy="54" r="7" fill="#1e293b"/>
        <!-- Attraction arrows pulling downward cleanly onto ceramic sphere -->
        <path d="M53 47 L53 66 M105 47 L105 66" stroke="#dc2626" stroke-width="2.2"/>
        <polygon points="53,69 49,62 57,62" fill="#dc2626"/>
        <polygon points="105,69 101,62 109,62" fill="#dc2626"/>
        <rect x="22" y="70" width="118" height="14" rx="3" fill="#3b82f6" opacity="0.3" stroke="#1d4ed8"/>
        <text x="44" y="80" font-size="7.5" font-weight="bold" fill="#1e3a8a">固定N52ネオジム磁石</text>
        <rect x="154" y="18" width="152" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="162" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">磁気予圧＋重心ウェイト</text>
        <text x="162" y="51" font-size="7.5" fill="#dc2626">・磁力でZ軸ガタ・片ボケをゼロ化</text>
        <text x="162" y="65" font-size="7.5" fill="#334155">・バネ無しのため横移動抵抗極小</text>
        <text x="162" y="79" font-size="7.5" fill="#334155">・CuWおもりで重心を光学中心へ</text>
        <text x="34" y="111" font-size="8" fill="#334155">真下向き撮影でもセンサーが垂れ下がらずセラミック球にピタリと密着</text>
      `);

    case 'sensor_ibis_lock':
      return wrap(`
        <!-- Power-Off Mechanical IBIS Park-Lock Solenoid & Tapered Latch Pin -->
        <rect x="20" y="34" width="38" height="36" rx="4" fill="#d97706" stroke="#78350f"/>
        <text x="24" y="55" font-size="7" font-weight="bold" fill="#fff">ソレノイド</text>
        <line x1="58" y1="52" x2="96" y2="52" stroke="#94a3b8" stroke-width="5"/>
        <polygon points="96,46 114,50 114,54 96,58" fill="#eab308" stroke="#a16207"/>
        <rect x="112" y="24" width="24" height="58" rx="3" fill="#cbd5e1" stroke="#334155"/>
        <polygon points="112,45 124,49 124,55 112,59" fill="#ffffff" stroke="#0f172a"/>
        <text x="26" y="84" font-size="7.5" font-weight="bold" fill="#b45309">電源OFF → テーパーピン自動挿入</text>
        <rect x="150" y="18" width="156" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="158" y="35" font-size="8.5" font-weight="bold" fill="#92400e">メカニカルIBISロック</text>
        <text x="158" y="51" font-size="7.5" fill="#78350f">・電源OFF時の消費電力 0 mW</text>
        <text x="158" y="65" font-size="7.5" fill="#78350f">・移動中の落下・振動衝撃を遮断</text>
        <text x="158" y="79" font-size="7.5" fill="#0369a1">・電源ON後 &lt;15ms で瞬時解放</text>
        <text x="34" y="111" font-size="8" fill="#334155">宙に浮く繊細なIBISステージを電源OFFの瞬間に中央固定する駐車ブレーキ</text>
      `);

    case 'sensor_n52_magnets':
      return wrap(`
        <!-- Dual-Pole N52 NdFeB Magnet Array & High-Permeability Soft-Iron Back Yoke -->
        <rect x="22" y="68" width="118" height="14" rx="2" fill="#475569" stroke="#1e293b"/>
        <text x="42" y="78" font-size="7.5" font-weight="bold" fill="#fff">軟磁性軟鉄バックヨーク</text>
        <rect x="26" y="48" width="52" height="20" rx="2" fill="#dc2626"/>
        <rect x="84" y="48" width="52" height="20" rx="2" fill="#2563eb"/>
        <text x="46" y="61" font-size="9" font-weight="bold" fill="#fff">N52</text>
        <text x="104" y="61" font-size="9" font-weight="bold" fill="#fff">S52</text>
        <path d="M52 48 C52 20, 110 20, 110 48" fill="none" stroke="#0284c7" stroke-width="2.2" stroke-dasharray="4 2"/>
        <rect x="46" y="26" width="70" height="12" rx="3" fill="#c86432" opacity="0.88"/>
        <text x="64" y="35" font-size="7" font-weight="bold" fill="#fff">VCMコイル</text>
        <rect x="154" y="18" width="152" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="162" y="35" font-size="8.5" font-weight="bold" fill="#1d4ed8">N52 閉磁気回路アレイ</text>
        <text x="162" y="51" font-size="7.5" fill="#1e40af">・残留磁束密度 ~1.43 T 希土類</text>
        <text x="162" y="65" font-size="7.5" fill="#1e40af">・N/S往復導体で推力を2倍加算</text>
        <text x="162" y="79" font-size="7.5" fill="#1e40af">・背面ヨークが漏洩磁束を遮蔽</text>
        <text x="34" y="111" font-size="8" fill="#334155">世界最強クラスの2極磁石と鉄ヨークが薄型ボディで最大級の推力を生成</text>
      `);

    case 'sensor_tilt_springs':
      return wrap(`
        <!-- 3-Point Micron Flange-Back & Optical Plane Tilt Calibration Springs/Bolts -->
        <rect x="20" y="20" width="124" height="72" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <!-- 3 Tripod Calibration Springs -->
        <circle cx="44" cy="36" r="9" fill="#fef08a" stroke="#ca8a04" stroke-width="1.8"/>
        <circle cx="120" cy="36" r="9" fill="#fef08a" stroke="#ca8a04" stroke-width="1.8"/>
        <circle cx="82" cy="76" r="9" fill="#fef08a" stroke="#ca8a04" stroke-width="1.8"/>
        <polygon points="44,36 120,36 82,76" fill="none" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3 2"/>
        <text x="41" y="39" font-size="7" font-weight="bold" fill="#854d0e">1</text>
        <text x="117" y="39" font-size="7" font-weight="bold" fill="#854d0e">2</text>
        <text x="79" y="79" font-size="7" font-weight="bold" fill="#854d0e">3</text>
        <text x="64" y="55" font-size="7.5" font-weight="bold" fill="#0369a1">Z + チルト</text>
        <rect x="156" y="20" width="150" height="72" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="164" y="37" font-size="8.5" font-weight="bold" fill="#854d0e">3点像面ミクロン校正</text>
        <text x="164" y="52" font-size="7.5" fill="#713f12">・圧縮ばねでねじ遊びを完全除去</text>
        <text x="164" y="66" font-size="7.5" fill="#713f12">・1°回転で約1μmの超微細Z送り</text>
        <text x="164" y="80" font-size="7.5" fill="#0369a1">・工場レーザー干渉計で片ボケ零</text>
        <text x="34" y="111" font-size="8" fill="#334155">F1.2極薄ピントでも画面四隅まで均等に解像させる3点キネマティック調整</text>
      `);

    case 'sensor_tim_pad':
      return wrap(`
        <!-- Micro-Surface Air-Gap Filling by Compliant High-k Silicone TIM Pad -->
        <rect x="20" y="20" width="124" height="18" rx="2" fill="#15803d"/>
        <text x="36" y="32" font-size="7.5" font-weight="bold" fill="#fff">センサーPCB (発熱源)</text>
        <path d="M20 38 L32 42 L44 37 L56 43 L68 38 L80 42 L92 37 L104 42 L116 38 L128 42 L144 38 L144 64 L20 64 Z" fill="#93c5fd" stroke="#2563eb"/>
        <text x="34" y="56" font-size="8" font-weight="bold" fill="#1e3a8a">柔軟高熱伝導TIMパッド</text>
        <rect x="20" y="64" width="124" height="18" rx="2" fill="#334155"/>
        <text x="34" y="76" font-size="7.5" font-weight="bold" fill="#fff">Σ字グラファイト熱橋へ</text>
        <rect x="156" y="18" width="150" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="164" y="35" font-size="8.5" font-weight="bold" fill="#1d4ed8">接触熱抵抗を1/10以下へ</text>
        <text x="164" y="51" font-size="7.5" fill="#1e40af">・空気層(0.026)をTIM(10W/mK)置換</text>
        <text x="164" y="65" font-size="7.5" fill="#1e40af">・低硬度で基板への反発力極小</text>
        <text x="164" y="79" font-size="7.5" fill="#1e40af">・高電気絶縁＆低アウトガス配合</text>
        <text x="34" y="111" font-size="8" fill="#334155">目に見えない表面凹凸を密着充填しセンサーの熱を逃がす伝熱の要</text>
      `);

    case 'sensor_copper_sink':
      return wrap(`
        <!-- Rear Pure-Copper Micro-Fin Heatsink & Graphite Spreading Plate -->
        <rect x="20" y="26" width="124" height="8" rx="1" fill="#334155"/>
        <text x="38" y="23" font-size="7" font-weight="bold" fill="#334155">前面グラファイト拡散箔</text>
        <rect x="20" y="34" width="124" height="16" rx="2" fill="#c86b3c" stroke="#7c2d12"/>
        <text x="42" y="45" font-size="7.5" font-weight="bold" fill="#fff">無酸素純銅プレート</text>
        ${Array.from({ length: 11 }, (_, i) => `<rect x="${24 + i * 11}" y="50" width="5" height="16" fill="#c86b3c" stroke="#7c2d12"/>`).join('')}
        <path d="M40 72 L40 84 M82 72 L82 84 M124 72 L124 84" stroke="#dc2626" stroke-width="1.8"/>
        <text x="30" y="93" font-size="7.5" font-weight="bold" fill="#dc2626">17条マイクロフィン → 外装へ放熱</text>
        <rect x="156" y="18" width="150" height="74" rx="5" fill="#fff7ed" stroke="#c86b3c"/>
        <text x="164" y="35" font-size="8.5" font-weight="bold" fill="#9a3412">最終放熱ラジエーター</text>
        <text x="164" y="51" font-size="7.5" fill="#7c2d12">・純銅 k ≈ 398 W/(m·K) 高熱容量</text>
        <text x="164" y="65" font-size="7.5" fill="#7c2d12">・マイクロフィンで放熱面積 2.4倍</text>
        <text x="164" y="79" font-size="7.5" fill="#dc2626">・8K/4K120pの連続録画時間を延伸</text>
        <text x="34" y="111" font-size="8" fill="#334155">Σ熱橋から運ばれた熱を瞬時に広げて吸収しファンレス長時間収録を支える</text>
      `);

    // =========================================================================
    // Phase 8 Ultra-40-Part 50mm F1.2 Lens Dissection (+18 New Schematics)
    // =========================================================================
    case 'lens_front_eccentric':
      return wrap(`
        <!-- 3-Point Eccentric Centering & Optical Tilt Calibration Collar (120 deg) -->
        <circle cx="80" cy="54" r="32" fill="none" stroke="#334155" stroke-width="5"/>
        <circle cx="80" cy="54" r="22" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3 2"/>
        <!-- 3 Eccentric POM Cams with Offset Screw Holes -->
        <circle cx="80" cy="22" r="7" fill="#f1f5f9" stroke="#0f172a" stroke-width="1.4"/>
        <circle cx="82.5" cy="21" r="2.2" fill="#2563eb"/>
        <circle cx="52" cy="70" r="7" fill="#f1f5f9" stroke="#0f172a" stroke-width="1.4"/>
        <circle cx="50" cy="72" r="2.2" fill="#2563eb"/>
        <circle cx="108" cy="70" r="7" fill="#f1f5f9" stroke="#0f172a" stroke-width="1.4"/>
        <circle cx="110" cy="68.5" r="2.2" fill="#2563eb"/>
        <path d="M72 54 L88 54 M80 46 L80 62" stroke="#dc2626" stroke-width="1.5"/>
        <rect x="136" y="18" width="170" height="74" rx="5" fill="#eff6ff" stroke="#0284c7"/>
        <text x="144" y="35" font-size="8.5" font-weight="bold" fill="#0369a1">3点偏心コロ 工場光軸調整</text>
        <text x="144" y="51" font-size="7.5" fill="#0c4a6e">・穴を0.15mmズラした偏心カム×3</text>
        <text x="144" y="65" font-size="7.5" fill="#0c4a6e">・1°回転で約2.6μmの超高分解能調芯</text>
        <text x="144" y="79" font-size="7.5" fill="#1d4ed8">・MTF検査後に低収縮UV樹脂ロック</text>
        <text x="32" y="111" font-size="8" fill="#334155">前玉のわずかな中心ズレ・片ボケを1ミクロン単位で追い込む魔法の微調環</text>
      `);

    case 'lens_flint_cemented':
      return wrap(`
        <!-- Apochromatic Cemented Doublet: Super-ED Convex + UV Optical Cement + Flint Concave -->
        <path d="M40 22 Q68 54 40 86 L58 86 Q72 54 58 22 Z" fill="#a7f3d0" stroke="#059669" stroke-width="1.5"/>
        <!-- Thin UV Optical Cement Seam -->
        <path d="M58 22 Q72 54 58 86" fill="none" stroke="#f59e0b" stroke-width="3.2"/>
        <path d="M60 22 Q74 54 60 86 L82 86 Q76 54 82 22 Z" fill="#c7d2fe" stroke="#4f46e5" stroke-width="1.5"/>
        <!-- RGB Rays Converging to Single Focal Point -->
        <line x1="16" y1="36" x2="54" y2="36" stroke="#dc2626" stroke-width="1.4"/>
        <line x1="54" y1="36" x2="128" y2="54" stroke="#dc2626" stroke-width="1.4"/>
        <line x1="16" y1="40" x2="54" y2="40" stroke="#2563eb" stroke-width="1.4"/>
        <line x1="54" y1="40" x2="128" y2="54" stroke="#2563eb" stroke-width="1.4"/>
        <circle cx="128" cy="54" r="4" fill="#10b981"/>
        <text x="38" y="16" font-size="7" font-weight="bold" fill="#059669">ED凸</text>
        <text x="66" y="16" font-size="7" font-weight="bold" fill="#4f46e5">フリント凹</text>
        <rect x="142" y="18" width="164" height="74" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <text x="150" y="35" font-size="8.5" font-weight="bold" fill="#065f46">高分散フリント＋UV接合層</text>
        <text x="150" y="51" font-size="7.5" fill="#047857">・ED凸の色分散を逆符号で完全相殺</text>
        <text x="150" y="65" font-size="7.5" fill="#b45309">・屈折率整合UVセメントで反射0.01%</text>
        <text x="150" y="79" font-size="7.5" fill="#3730a3">・レーザー調芯で2枚偏心 &lt; 1.0 μm</text>
        <text x="30" y="111" font-size="8" fill="#334155">隙間ゼロで貼り合わせた2枚の異種ガラスがF1.2の紫フリンジを根絶</text>
      `);

    case 'lens_g4_negative':
      return wrap(`
        <!-- Pre-Iris Biconcave Petzval Field-Curvature Flattening Lens -->
        <path d="M52 20 L80 20 Q66 54 80 88 L52 88 Q66 54 52 20 Z" fill="#99f6e4" stroke="#0d9488" stroke-width="1.6"/>
        <!-- Curved vs Flattened Image Plane -->
        <path d="M106 24 Q94 54 106 84" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 2"/>
        <line x1="124" y1="22" x2="124" y2="86" stroke="#10b981" stroke-width="2.4"/>
        <path d="M106 54 L120 54" stroke="#0d9488" stroke-width="1.8"/>
        <polygon points="122,54 116,50 116,58" fill="#0d9488"/>
        <text x="90" y="17" font-size="7" fill="#dc2626">湾曲</text>
        <text x="115" y="17" font-size="7" font-weight="bold" fill="#059669">平坦</text>
        <rect x="142" y="18" width="164" height="74" rx="5" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="150" y="35" font-size="8.5" font-weight="bold" fill="#115e59">絞り直前 両凹ペッツバール補正</text>
        <text x="150" y="51" font-size="7.5" fill="#134e4a">・強い負パワーで像面湾曲を相殺</text>
        <text x="150" y="65" font-size="7.5" fill="#134e4a">・Σ(φ/n) → 0 でセンサー全面結像</text>
        <text x="150" y="79" font-size="7.5" fill="#134e4a">・絞り直前で全画角を均等に整える</text>
        <text x="32" y="111" font-size="8" fill="#334155">お椀状に曲がりやすい大口径のピント面を真っ平らへ押し戻す中核の凹玉</text>
      `);

    case 'lens_iris_base':
      return wrap(`
        <!-- Stationary Iris Pivot-Pin Base Plate & Stray-Light Knife-Edge Shield -->
        <circle cx="80" cy="54" r="34" fill="#475569" stroke="#1e293b" stroke-width="1.8"/>
        <circle cx="80" cy="54" r="21" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
        ${Array.from({ length: 11 }, (_, i) => {
          const a = (i / 11) * Math.PI * 2;
          const x = 80 + Math.cos(a) * 27.5;
          const y = 54 + Math.sin(a) * 27.5;
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2" fill="#eab308" stroke="#713f12" stroke-width="0.6"/>`;
        }).join('')}
        <text x="64" y="57" font-size="7.5" font-weight="bold" fill="#0f172a">遮光エッジ</text>
        <rect x="138" y="18" width="168" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="146" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">11等分ピボット固定ベース</text>
        <text x="146" y="51" font-size="7.5" fill="#334155">・32.727°間隔 ±5μm 精密支点穴</text>
        <text x="146" y="65" font-size="7.5" fill="#334155">・羽根室厚 0.45mm で絡み完全ゼロ</text>
        <text x="146" y="79" font-size="7.5" fill="#b45309">・内周ナイフエッジで絞り外迷光遮断</text>
        <text x="34" y="111" font-size="8" fill="#334155">11枚のカーボン羽根の支点を保持し密閉モジュール化する絞りユニット土台</text>
      `);

    case 'lens_focus_a_front':
      return wrap(`
        <!-- Floating Focus Group A Front Biconvex Element (E06) -->
        <path d="M58 20 Q80 54 58 88 Q42 54 58 20 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.6"/>
        <rect x="44" y="16" width="56" height="76" rx="4" fill="none" stroke="#0ea5e9" stroke-width="1.4" stroke-dasharray="4 2"/>
        <path d="M22 54 L42 54 M102 54 L126 54" stroke="#0284c7" stroke-width="2"/>
        <polygon points="128,54 120,50 120,58" fill="#0284c7"/>
        <polygon points="20,54 28,50 28,58" fill="#0284c7"/>
        <text x="50" y="13" font-size="7.5" font-weight="bold" fill="#0369a1">前衛AF3枚組の先頭</text>
        <rect x="140" y="18" width="166" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="148" y="35" font-size="8.5" font-weight="bold" fill="#0369a1">第6枚(G5a) 両凸AF前玉</text>
        <text x="148" y="51" font-size="7.5" fill="#0c4a6e">・絞り直後の小径空間で軽量高速化</text>
        <text x="148" y="65" font-size="7.5" fill="#0c4a6e">・全長不変インナーフォーカスを実現</text>
        <text x="148" y="79" font-size="7.5" fill="#0c4a6e">・L14/L15と3枚一体でリニア駆動</text>
        <text x="34" y="111" font-size="8" fill="#334155">高屈折・軽量な両凸ガラスが短い移動量で無限遠〜0.4mを瞬時に合焦</text>
      `);

    case 'lens_focus_a_rear':
      return wrap(`
        <!-- Floating Focus Group A Rear Negative Self-Achromatizing Meniscus (E08) -->
        <path d="M32 24 Q44 54 32 84 Q24 54 32 24 Z" fill="#bae6fd" opacity="0.55" stroke="#94a3b8"/>
        <path d="M56 22 Q68 54 56 86 Q46 54 56 22 Z" fill="#38bdf8" opacity="0.55" stroke="#94a3b8"/>
        <path d="M84 22 L98 22 Q88 54 98 86 L84 86 Q78 54 84 22 Z" fill="#c7d2fe" stroke="#4f46e5" stroke-width="1.8"/>
        <text x="77" y="16" font-size="7.5" font-weight="bold" fill="#3730a3">E08 自己色消し</text>
        <rect x="136" y="18" width="170" height="74" rx="5" fill="#eef2ff" stroke="#4f46e5"/>
        <text x="144" y="35" font-size="8.5" font-weight="bold" fill="#3730a3">第8枚(G5c) 移動群自己色消し</text>
        <text x="144" y="51" font-size="7.5" fill="#312e81">・近接ピント移動時の色収差発生を零化</text>
        <text x="144" y="65" font-size="7.5" fill="#312e81">・Group A 3枚内部で収差を完結補正</text>
        <text x="144" y="79" font-size="7.5" fill="#312e81">・最短0.40mでも開放F1.2がシャープ</text>
        <text x="32" y="111" font-size="8" fill="#334155">前衛フォーカス群の出口で色とコマ収差を整えて後衛群へクリーンに伝達</text>
      `);

    case 'lens_xd_dampers':
      return wrap(`
        <!-- XD Linear Rail Silicone End-Stop Dampers + Bronze Preload Spring + POM Shoe -->
        <rect x="22" y="49" width="118" height="7" fill="#cbd5e1" stroke="#334155"/>
        <!-- Dual Silicone End-Dampers -->
        <rect x="22" y="42" width="10" height="21" rx="3" fill="#ec4899" stroke="#9d174d"/>
        <rect x="130" y="42" width="10" height="21" rx="3" fill="#ec4899" stroke="#9d174d"/>
        <!-- Helical Bronze Preload Spring -->
        <path d="M36 45 L42 60 L48 45 L54 60 L60 45 L66 60" fill="none" stroke="#eab308" stroke-width="2.2"/>
        <!-- POM Anti-Rotation Slider -->
        <rect x="74" y="38" width="28" height="28" rx="3" fill="#f8fafc" stroke="#0f172a" stroke-width="1.4"/>
        <text x="79" y="55" font-size="7.5" font-weight="bold" fill="#0f172a">POM</text>
        <text x="20" y="34" font-size="7" font-weight="bold" fill="#be185d">シリコン緩衝</text>
        <rect x="150" y="18" width="156" height="74" rx="5" fill="#fdf2f8" stroke="#ec4899"/>
        <text x="158" y="35" font-size="8.5" font-weight="bold" fill="#9d174d">予圧バネ＆端面衝撃ダンパー</text>
        <text x="158" y="51" font-size="7.5" fill="#831843">・電源OFF時のカチカチ衝突音を吸収</text>
        <text x="158" y="65" font-size="7.5" fill="#b45309">・リン青銅ばねでミクロン予圧保持</text>
        <text x="158" y="79" font-size="7.5" fill="#334155">・低摩擦POMシューで回り止め案内</text>
        <text x="32" y="111" font-size="8" fill="#334155">高速AFの急制動と携帯時の振動衝撃からリニア移動群を静かに守る緩衝系</text>
      `);

    case 'lens_inner_chassis':
      return wrap(`
        <!-- Internal Fixed TSC/Magnesium Structural Skeleton Barrel -->
        <rect x="24" y="20" width="114" height="70" rx="6" fill="none" stroke="#475569" stroke-width="4"/>
        <rect x="36" y="20" width="10" height="70" fill="#94a3b8"/>
        <rect x="116" y="20" width="10" height="70" fill="#94a3b8"/>
        <line x1="24" y1="36" x2="138" y2="36" stroke="#334155" stroke-width="2.5"/>
        <line x1="24" y1="74" x2="138" y2="74" stroke="#334155" stroke-width="2.5"/>
        <text x="54" y="57" font-size="8" font-weight="bold" fill="#0f172a">二重鏡筒骨格</text>
        <rect x="150" y="18" width="156" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="158" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">TSC/Mg 固定内部骨格バレル</text>
        <text x="158" y="51" font-size="7.5" fill="#334155">・熱膨張係数がアルミ同等の安定材</text>
        <text x="158" y="65" font-size="7.5" fill="#334155">・14枚レンズ＆4モーターの剛性基準</text>
        <text x="158" y="79" font-size="7.5" fill="#334155">・外装(L38)と分離し衝撃伝達を緩和</text>
        <text x="34" y="111" font-size="8" fill="#334155">外殻の内側に潜む精密な背骨がF1.2の重いガラス群の光軸を永遠に死守</text>
      `);

    case 'lens_focus_b_front':
      return wrap(`
        <!-- Floating Focus Group B Front ED Positive Element (E09) -->
        <path d="M52 22 Q74 54 52 86 Q38 54 52 22 Z" fill="#99f6e4" stroke="#0d9488" stroke-width="1.6"/>
        <path d="M84 22 Q72 54 84 86 L98 86 Q106 54 98 22 Z" fill="#5eead4" opacity="0.5" stroke="#14b8a6" stroke-dasharray="3 2"/>
        <path d="M24 54 L44 54 M108 54 L128 54" stroke="#14b8a6" stroke-width="2"/>
        <polygon points="22,54 30,50 30,58" fill="#14b8a6"/>
        <polygon points="130,54 122,50 122,58" fill="#14b8a6"/>
        <text x="38" y="16" font-size="7.5" font-weight="bold" fill="#0f766e">後衛AFペア前玉(E09)</text>
        <rect x="142" y="18" width="164" height="74" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="150" y="35" font-size="8.5" font-weight="bold" fill="#0f766e">第9枚(G6a) 後衛EDフォーカス</text>
        <text x="150" y="51" font-size="7.5" fill="#115e59">・L13-15前衛と差動移動(フローティング)</text>
        <text x="150" y="65" font-size="7.5" fill="#115e59">・フォーカスブリージングを劇的抑制</text>
        <text x="150" y="79" font-size="7.5" fill="#115e59">・動画のピント送りでも画角が安定</text>
        <text x="32" y="111" font-size="8" fill="#334155">前衛群と呼吸を合わせて逆位相移動し、近距離の画角変化と収差を封じ込む</text>
      `);

    case 'lens_g7_flattener':
      return wrap(`
        <!-- Group 7 Rear Negative Field-Curvature Flattener (E11) -->
        <path d="M56 22 L80 22 Q68 54 80 86 L56 86 Q68 54 56 22 Z" fill="#cffafe" stroke="#0891b2" stroke-width="1.6"/>
        <line x1="20" y1="30" x2="64" y2="40" stroke="#0891b2" stroke-width="1.6"/>
        <line x1="64" y1="40" x2="128" y2="34" stroke="#0891b2" stroke-width="1.6"/>
        <line x1="20" y1="78" x2="64" y2="68" stroke="#0891b2" stroke-width="1.6"/>
        <line x1="64" y1="68" x2="128" y2="74" stroke="#0891b2" stroke-width="1.6"/>
        <rect x="142" y="18" width="164" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="150" y="35" font-size="8.5" font-weight="bold" fill="#155e75">第11枚(G7) 後群フィールドフラットナー</text>
        <text x="150" y="51" font-size="7.5" fill="#0e7490">・センサー周辺部の非点隔差を平坦化</text>
        <text x="150" y="65" font-size="7.5" fill="#0e7490">・後群の広い大口径光束を無理なく拡大</text>
        <text x="150" y="79" font-size="7.5" fill="#0e7490">・高解像センサー四隅まで鋭利に結像</text>
        <text x="34" y="111" font-size="8" fill="#334155">後衛AF群を通過した光を画面四隅まで均等なピント面へ整える固定凹玉</text>
      `);

    case 'lens_rear_telecentric':
      return wrap(`
        <!-- Group 9 Large-Diameter Rear Telecentric Meniscus (E13): Reducing CRA -->
        <path d="M56 18 Q76 54 56 90 L74 90 Q86 54 74 18 Z" fill="#ddd6fe" stroke="#7c3aed" stroke-width="1.6"/>
        <!-- Rays Straightened Near-Perpendicular onto Sensor Microlenses -->
        <line x1="20" y1="24" x2="64" y2="32" stroke="#7c3aed" stroke-width="1.8"/>
        <line x1="64" y1="32" x2="122" y2="34" stroke="#16a34a" stroke-width="2"/>
        <line x1="20" y1="84" x2="64" y2="76" stroke="#7c3aed" stroke-width="1.8"/>
        <line x1="64" y1="76" x2="122" y2="74" stroke="#16a34a" stroke-width="2"/>
        <rect x="122" y="20" width="8" height="68" fill="#0f172a"/>
        <text x="84" y="26" font-size="7" font-weight="bold" fill="#15803d">垂直入射(CRA低減)</text>
        <rect x="142" y="18" width="164" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="150" y="35" font-size="8.5" font-weight="bold" fill="#5b21b6">第13枚(G9) φ45mmテレセントリック</text>
        <text x="150" y="51" font-size="7.5" fill="#4c1d95">・センサー四隅への斜め入射角を大幅低減</text>
        <text x="150" y="65" font-size="7.5" fill="#4c1d95">・周辺減光と色シェーディングを防止</text>
        <text x="150" y="79" font-size="7.5" fill="#15803d">・ショートフランジだからこそ置ける大玉</text>
        <text x="160" y="111" text-anchor="middle" font-size="7.2" fill="#334155">斜め光をほぼ垂直へ起こして画素の奥まで効率よく届ける大口径テレセントリック玉</text>
      `);

    case 'lens_rear_baffle':
      return wrap(`
        <!-- Rear 3:2 Rectangular Stray-Light Flare Mask Cutting 41% Unused Circle Light -->
        <circle cx="80" cy="54" r="34" fill="#1e293b" stroke="#0f172a" stroke-width="1.8"/>
        <circle cx="80" cy="54" r="30" fill="#fee2e2" opacity="0.25" stroke="#ef4444" stroke-dasharray="3 2"/>
        <rect x="56" y="38" width="48" height="32" rx="2" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
        <text x="69" y="57" font-size="8" font-weight="bold" fill="#0369a1">3 : 2</text>
        <rect x="138" y="18" width="168" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="146" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">3:2 矩形フレアカットマスク</text>
        <text x="146" y="51" font-size="7.5" fill="#dc2626">・画面外の不要光 41% を入口で遮断</text>
        <text x="146" y="65" font-size="7.5" fill="#334155">・マウント内壁の乱反射フレアを根絶</text>
        <text x="146" y="79" font-size="7.5" fill="#334155">・最終後玉(L27)の接触保護も兼任</text>
        <text x="34" y="111" font-size="8" fill="#334155">丸い光から3:2の長方形だけを鋭く切り抜き逆光の漆黒コントラストを守る</text>
      `);

    case 'lens_thermistor':
      return wrap(`
        <!-- Internal NTC Thermistor dn/dT Thermal Focus-Shift Compensation -->
        <rect x="20" y="20" width="122" height="72" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <!-- NTC R(T) Exponential Curve -->
        <line x1="34" y1="78" x2="128" y2="78" stroke="#64748b" stroke-width="1.2"/>
        <line x1="34" y1="28" x2="34" y2="78" stroke="#64748b" stroke-width="1.2"/>
        <path d="M38 32 Q62 66, 126 74" fill="none" stroke="#dc2626" stroke-width="2.2"/>
        <text x="42" y="38" font-size="7.5" font-weight="bold" fill="#b91c1c">R(T) 低下</text>
        <text x="86" y="87" font-size="7" fill="#475569">温度 T (℃) →</text>
        <rect x="154" y="18" width="152" height="74" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="162" y="35" font-size="8.5" font-weight="bold" fill="#9a3412">NTC熱フォーカス補償</text>
        <text x="162" y="51" font-size="7.5" fill="#7c2d12">・0.1℃分解能で鏡筒温度を常時監視</text>
        <text x="162" y="65" font-size="7.5" fill="#7c2d12">・ED硝材のdn/dTピントズレを自動補正</text>
        <text x="162" y="79" font-size="7.5" fill="#dc2626">・真冬の星空無限遠も完璧に合焦維持</text>
        <text x="34" y="111" font-size="8" fill="#334155">温度変化によるガラス屈折率と鏡筒伸縮を電子AFでリアルタイム相殺</text>
      `);

    case 'lens_fpc_harness':
      return wrap(`
        <!-- Multi-Branch High-Flex Polyimide FPC Harness with EMI Ground Shielding -->
        <rect x="20" y="44" width="124" height="16" rx="3" fill="#f97316" stroke="#9a3412"/>
        <rect x="44" y="47" width="76" height="10" rx="2" fill="#94a3b8" stroke="#475569"/>
        <path d="M40 44 L40 24 L62 24" fill="none" stroke="#f97316" stroke-width="4"/>
        <path d="M84 44 L84 22 L112 22" fill="none" stroke="#f97316" stroke-width="4"/>
        <path d="M58 60 L58 80 L94 80" fill="none" stroke="#f97316" stroke-width="4"/>
        <rect x="60" y="20" width="8" height="8" fill="#eab308"/>
        <rect x="110" y="18" width="8" height="8" fill="#eab308"/>
        <rect x="92" y="76" width="8" height="8" fill="#eab308"/>
        <text x="58" y="55" font-size="7" font-weight="bold" fill="#0f172a">EMIシールド</text>
        <rect x="154" y="18" width="152" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="162" y="35" font-size="8.5" font-weight="bold" fill="#9a3412">多分岐ポリイミドFPC神経網</text>
        <text x="162" y="51" font-size="7.5" fill="#7c2d12">・圧延焼鈍銅で1,000万回往復屈曲耐性</text>
        <text x="162" y="65" font-size="7.5" fill="#7c2d12">・大電流PWM線と微小センサー線を分離</text>
        <text x="162" y="79" font-size="7.5" fill="#b45309">・全端金メッキZIFコネクタ着脱式</text>
        <text x="34" y="111" font-size="8" fill="#334155">鏡筒内周のわずかな隙間を縫って全アクチュエータとセンサーを結ぶ立体配線</text>
      `);

    case 'lens_aperture_sensor':
      return wrap(`
        <!-- Aperture Ring Non-Contact Multi-Pole Magnetic Rotor + Dual Hall-Effect Sensor -->
        <circle cx="80" cy="54" r="30" fill="none" stroke="#475569" stroke-width="7"/>
        <circle cx="80" cy="54" r="30" fill="none" stroke="#dc2626" stroke-width="5" stroke-dasharray="5 5"/>
        <circle cx="80" cy="54" r="30" fill="none" stroke="#2563eb" stroke-width="5" stroke-dasharray="5 5" stroke-dashoffset="5"/>
        <rect x="108" y="42" width="22" height="24" rx="3" fill="#15803d" stroke="#14532d"/>
        <text x="111" y="57" font-size="6.5" font-weight="bold" fill="#fff">Hall</text>
        <text x="64" y="57" font-size="7.5" font-weight="bold" fill="#5b21b6">多極着磁環</text>
        <rect x="142" y="18" width="164" height="74" rx="5" fill="#f5f3ff" stroke="#8b5cf6"/>
        <text x="150" y="35" font-size="8.5" font-weight="bold" fill="#5b21b6">絞りリング非接触磁気センサー</text>
        <text x="150" y="51" font-size="7.5" fill="#4c1d95">・sin/cos 2軸ホールICで絶対角を検出</text>
        <text x="150" y="65" font-size="7.5" fill="#4c1d95">・動画デクリック無段階操作に完全追従</text>
        <text x="150" y="79" font-size="7.5" fill="#4c1d95">・ブラシレス非接触で摩耗・接触不良零</text>
        <text x="32" y="111" font-size="8" fill="#334155">絞りリングの微小な傾きを磁力で読み取りF1.2〜F16を滑らかにシネマ制御</text>
      `);

    case 'lens_switch_pcb':
      return wrap(`
        <!-- Weather-Sealed Side Switch Pod PCB + Silicone Diaphragm -->
        <rect x="24" y="22" width="112" height="66" rx="5" fill="#15803d" stroke="#14532d" stroke-width="1.6"/>
        <circle cx="52" cy="42" r="10" fill="#facc15" stroke="#854d0e" stroke-width="1.5"/>
        <circle cx="88" cy="42" r="10" fill="#facc15" stroke="#854d0e" stroke-width="1.5"/>
        <rect x="44" y="62" width="52" height="16" rx="3" fill="#cbd5e1" stroke="#334155"/>
        <rect x="52" y="65" width="18" height="10" rx="2" fill="#0f172a"/>
        <!-- Silicone Waterproof Membrane Overlay -->
        <rect x="20" y="18" width="120" height="74" rx="7" fill="#38bdf8" opacity="0.22" stroke="#0284c7" stroke-dasharray="4 2"/>
        <text x="42" y="15" font-size="7" font-weight="bold" fill="#0369a1">シリコン防水膜</text>
        <rect x="150" y="18" width="156" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="158" y="35" font-size="8.5" font-weight="bold" fill="#065f46">側面防水スイッチサブ基板</text>
        <text x="158" y="51" font-size="7.5" fill="#047857">・横/縦2か所のカスタムホールドボタン</text>
        <text x="158" y="65" font-size="7.5" fill="#047857">・金めっきメタルドーム(作動2.2N)</text>
        <text x="158" y="79" font-size="7.5" fill="#0369a1">・一体シリコン膜で雨天連打も完全防水</text>
        <text x="34" y="111" font-size="8" fill="#334155">縦位置撮影でも親指が自然に届く2ボタン＆AF/MF切替を防水密閉実装</text>
      `);

    case 'lens_weather_seals':
      return wrap(`
        <!-- 6-Stage Weather-Sealing EPDM O-Rings & Wiper Lips Along Barrel -->
        <rect x="20" y="32" width="122" height="44" rx="5" fill="#e2e8f0" stroke="#475569"/>
        ${[28, 44, 68, 92, 110, 134].map((x, i) => `
          <rect x="${x}" y="26" width="5" height="56" rx="2.5" fill="${i % 2 === 0 ? '#1e293b' : '#0284c7'}"/>
        `).join('')}
        <!-- Raindrops Bouncing Off -->
        <path d="M52 16 L56 24 M84 14 L88 22 M112 16 L116 24" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round"/>
        <text x="40" y="92" font-size="7.5" font-weight="bold" fill="#0369a1">6か所 全周EPDM防水リップ</text>
        <rect x="152" y="18" width="154" height="74" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="160" y="35" font-size="8.5" font-weight="bold" fill="#0369a1">6重防塵防滴シーリング群</text>
        <text x="160" y="51" font-size="7.5" fill="#0c4a6e">・前枠/MF前後/絞り前後/マウント全封止</text>
        <text x="160" y="65" font-size="7.5" fill="#0c4a6e">・低摩擦フッ素処理ワイパーリップ</text>
        <text x="160" y="79" font-size="7.5" fill="#0c4a6e">・全長不変IF構造でホコリ吸込を遮断</text>
        <text x="160" y="111" text-anchor="middle" font-size="7.3" fill="#334155">回転リングの隙間まで6重ゴムパッキンで塞ぎ土砂降りや砂塵から光学系を死守</text>
      `);

    case 'lens_bayonet_shims':
      return wrap(`
        <!-- Infinity-Focus Micron Brass & Stainless Mount Calibration Shim Stack -->
        <rect x="22" y="24" width="16" height="60" rx="2" fill="#475569"/>
        <text x="24" y="57" font-size="6.5" fill="#fff">骨格</text>
        <!-- Color-coded stacked micron shims -->
        <rect x="46" y="26" width="8" height="56" rx="1" fill="#cbd5e1" stroke="#334155"/>
        <rect x="58" y="26" width="6" height="56" rx="1" fill="#eab308" stroke="#a16207"/>
        <rect x="68" y="26" width="5" height="56" rx="1" fill="#38bdf8" stroke="#0284c7"/>
        <rect x="77" y="26" width="4" height="28" rx="1" fill="#f97316"/>
        <rect x="92" y="24" width="20" height="60" rx="2" fill="#94a3b8" stroke="#1e293b"/>
        <text x="94" y="57" font-size="6.5" font-weight="bold" fill="#0f172a">爪環</text>
        <text x="42" y="94" font-size="7" font-weight="bold" fill="#b45309">50 / 20 / 10μm 積層</text>
        <rect x="128" y="18" width="178" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="136" y="35" font-size="8.5" font-weight="bold" fill="#854d0e">無限遠ミクロン校正シム群</text>
        <text x="136" y="51" font-size="7.5" fill="#713f12">・10/20/50/100μm圧延真鍮＆SUSシム</text>
        <text x="136" y="65" font-size="7.5" fill="#713f12">・14枚レンズの公差累積を±3μm以内へ</text>
        <text x="136" y="79" font-size="7.5" fill="#c2410c">・部分弧シムで個体別チルト(片ボケ)零</text>
        <text x="32" y="111" font-size="8" fill="#334155">マウント直下の極薄シム選定が全個体で当たり玉級の無限遠・四隅解像を保証</text>
      `);

    // =========================================================================
    // Phase 9: Ultra-Dissected Shutter Internal Mechanics Schematics (+14)
    // =========================================================================
    case 'shutter_shield_actuator':
      return wrap(`
        <!-- Power-Off Sensor Dust Shield Rotary Actuator & Safety Slip Clutch -->
        <circle cx="58" cy="54" r="24" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>
        <circle cx="58" cy="54" r="10" fill="#d97706" stroke="#92400e"/>
        <text x="38" y="88" font-size="7.5" font-weight="bold" fill="#334155">小型駆動モーター</text>
        <path d="M84 54 L122 54" stroke="#0284c7" stroke-width="2.4"/>
        <polygon points="127,54 118,49 118,59" fill="#0284c7"/>
        <text x="86" y="46" font-size="7" font-weight="bold" fill="#0369a1">スリップクラッチ</text>
        <!-- Protective Curtain Closed -->
        <rect x="132" y="20" width="52" height="68" rx="4" fill="#1e293b" stroke="#0f172a"/>
        <line x1="134" y1="36" x2="182" y2="36" stroke="#64748b"/>
        <line x1="134" y1="54" x2="182" y2="54" stroke="#64748b"/>
        <line x1="134" y1="72" x2="182" y2="72" stroke="#64748b"/>
        <text x="139" y="57" font-size="8" font-weight="bold" fill="#38bdf8">防塵シャッター</text>
        <rect x="196" y="18" width="110" height="72" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="204" y="36" font-size="8" font-weight="bold" fill="#0369a1">電源OFF自動閉鎖</text>
        <text x="204" y="51" font-size="7.5" fill="#334155">・レンズ交換時のホコリ遮断</text>
        <text x="204" y="65" font-size="7.5" fill="#334155">・指接触時は空転保護</text>
        <text x="204" y="79" font-size="7.5" fill="#0284c7">・自己保持ギアで無電力維持</text>
        <text x="36" y="111" font-size="8" fill="#334155">電源OFF連動アクチュエーターがセンサー前の保護幕を安全確実に開閉</text>
      `);

    case 'shutter_curtain1_guide':
      return wrap(`
        <!-- Front Curtain Slit Guide Rails & PTFE Micro-Clearance -->
        <rect x="24" y="16" width="12" height="78" rx="2" fill="#475569" stroke="#0f172a"/>
        <rect x="120" y="16" width="12" height="78" rx="2" fill="#475569" stroke="#0f172a"/>
        <!-- Curtain 1 Carbon Blades Sliding Inside 0.35mm Track -->
        <rect x="38" y="24" width="80" height="14" rx="1.5" fill="#0ea5e9" stroke="#0369a1"/>
        <rect x="38" y="42" width="80" height="14" rx="1.5" fill="#38bdf8" stroke="#0369a1"/>
        <rect x="38" y="60" width="80" height="14" rx="1.5" fill="#7dd3fc" stroke="#0369a1"/>
        <path d="M78 78 L78 92" stroke="#dc2626" stroke-width="2.4"/>
        <polygon points="78,95 73,87 83,87" fill="#dc2626"/>
        <text x="14" y="102" font-size="7" font-weight="bold" fill="#334155">0.35mm精密溝</text>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#1d4ed8">先幕専用 遮光ガイドレール</text>
        <text x="156" y="51" font-size="7.5" fill="#1e3a8a">・PTFE低摩擦コーティング内壁</text>
        <text x="156" y="65" font-size="7.5" fill="#1e3a8a">・時速35km超でも羽根のバタつきゼロ</text>
        <text x="156" y="79" font-size="7.5" fill="#dc2626">・0.1mm段差迷路で側面光漏れ遮断</text>
        <text x="34" y="111" font-size="8" fill="#334155">わずか0.35mmの超精密ガイド溝が高速走行する先幕羽根の直進性を死守</text>
      `);

    case 'shutter_pivot_jewels':
      return wrap(`
        <!-- Watchmaker Parallel Linkage Pivot Pins, Bushings & Low-Friction Bearings -->
        <line x1="36" y1="30" x2="122" y2="30" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
        <line x1="36" y1="74" x2="122" y2="74" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
        <line x1="56" y1="26" x2="56" y2="78" stroke="#0284c7" stroke-width="4"/>
        <line x1="106" y1="26" x2="106" y2="78" stroke="#0284c7" stroke-width="4"/>
        <!-- Precision Jewels/Bushings -->
        <circle cx="56" cy="30" r="6" fill="#f59e0b" stroke="#92400e" stroke-width="1.6"/>
        <circle cx="56" cy="74" r="6" fill="#f59e0b" stroke="#92400e" stroke-width="1.6"/>
        <circle cx="106" cy="30" r="6" fill="#f59e0b" stroke="#92400e" stroke-width="1.6"/>
        <circle cx="106" cy="74" r="6" fill="#f59e0b" stroke="#92400e" stroke-width="1.6"/>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#b45309">50万回耐摩耗ピボット軸受</text>
        <text x="156" y="51" font-size="7.5" fill="#78350f">・DLC硬質炭素コート焼入れピン</text>
        <text x="156" y="65" font-size="7.5" fill="#78350f">・無給油自己潤滑リングブッシュ</text>
        <text x="156" y="79" font-size="7.5" fill="#dc2626">・μ &lt; 0.08 ⇒ 500G加減速も滑らか</text>
        <text x="34" y="111" font-size="8" fill="#334155">高級機械式時計のルビー軸受思想でリンク関節の摩耗と摩擦損失を極小化</text>
      `);

    case 'shutter_curtain2_guide':
      return wrap(`
        <!-- Rear Curtain Independent Guide Rail & Optical Slit Separation -->
        <rect x="26" y="18" width="44" height="74" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <text x="34" y="56" font-size="8" font-weight="bold" fill="#1d4ed8">先幕室</text>
        <!-- Middle Partition Divider -->
        <rect x="74" y="16" width="10" height="78" fill="#1e293b"/>
        <text x="58" y="13" font-size="7" font-weight="bold" fill="#dc2626">中仕切り遮光板</text>
        <!-- Rear Curtain Track -->
        <rect x="88" y="18" width="44" height="74" rx="3" fill="#fef3c7" stroke="#d97706"/>
        <text x="96" y="56" font-size="8" font-weight="bold" fill="#b45309">後幕室</text>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#854d0e">後幕専用 独立レール溝</text>
        <text x="156" y="51" font-size="7.5" fill="#713f12">・1/8000s時の0.8mm極細スリット維持</text>
        <text x="156" y="65" font-size="7.5" fill="#713f12">・先幕との高速すれ違い接触を完全防止</text>
        <text x="156" y="79" font-size="7.5" fill="#c2410c">・画面上下の露出ムラを±0.05 EV以下へ</text>
        <text x="34" y="111" font-size="8" fill="#334155">先幕と後幕を独立レーンで隔離し1/8000秒の極細スリット幅を完全一定化</text>
      `);

    case 'shutter_tension_drums':
      return wrap(`
        <!-- Dual Torsion Spring Tension Drums & Worm-Gear Factory Timing Calibration -->
        <circle cx="56" cy="54" r="24" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <circle cx="56" cy="54" r="14" fill="none" stroke="#92400e" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="41" y="57" font-size="8" font-weight="bold" fill="#92400e">先幕バネ</text>
        <circle cx="118" cy="54" r="24" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
        <circle cx="118" cy="54" r="14" fill="none" stroke="#1e40af" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="103" y="57" font-size="8" font-weight="bold" fill="#1e40af">後幕バネ</text>
        <!-- Calibration Worm -->
        <rect x="158" y="18" width="148" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="166" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">幕速マイクロ秒調律ドラム</text>
        <text x="166" y="51" font-size="7.5" fill="#334155">・先幕/後幕トーションバネ張力調整</text>
        <text x="166" y="65" font-size="7.5" fill="#334155">・走行時間 2.2 ms ± 0.02 ms 精密同調</text>
        <text x="166" y="79" font-size="7.5" fill="#dc2626">・1/400秒ストロボ同調の心臓部</text>
        <text x="32" y="111" font-size="8" fill="#334155">工場でウォームギアを回して先幕と後幕の走行カーブをマイクロ秒単位で一致</text>
      `);

    case 'shutter_counterweight':
      return wrap(`
        <!-- Counter-Phase Tungsten Balancer Mass Cancelling Curtain Recoil Momentum -->
        <rect x="24" y="20" width="54" height="24" rx="3" fill="#0ea5e9" stroke="#0369a1"/>
        <text x="31" y="35" font-size="7.5" font-weight="bold" fill="#fff">幕 m₁ (下走)</text>
        <path d="M51 48 L51 82" stroke="#0284c7" stroke-width="2.6"/>
        <polygon points="51,87 46,78 56,78" fill="#0284c7"/>
        <!-- Opposite Balancer Mass -->
        <rect x="96" y="64" width="58" height="24" rx="3" fill="#b45309" stroke="#78350f"/>
        <text x="101" y="79" font-size="7.5" font-weight="bold" fill="#fef3c7">重り m₂ (上走)</text>
        <path d="M125 60 L125 26" stroke="#dc2626" stroke-width="2.6"/>
        <polygon points="125,21 120,30 130,30" fill="#dc2626"/>
        <rect x="170" y="18" width="136" height="74" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="178" y="36" font-size="8.5" font-weight="bold" fill="#c2410c">逆位相運動量キャンセル</text>
        <text x="178" y="52" font-size="8" font-weight="bold" fill="#9a3412">m₁·v₁ + m₂·v₂ ≈ 0</text>
        <text x="178" y="67" font-size="7.5" fill="#7c2d12">・高密度タングステン銅重り</text>
        <text x="178" y="80" font-size="7.5" fill="#7c2d12">・微ブレ(シャッターショック)激減</text>
        <text x="34" y="111" font-size="8" fill="#334155">羽根と反対向きに重りを動かすことで高画素機の微細なシャッターブレを相殺</text>
      `);

    case 'shutter_armature_levers':
      return wrap(`
        <!-- Electromagnet Armature Latch Release Levers (10us Precision Drop) -->
        <rect x="20" y="24" width="44" height="32" rx="4" fill="#d97706" stroke="#92400e"/>
        <text x="27" y="43" font-size="7.5" font-weight="bold" fill="#fff">電磁石</text>
        <!-- Pivoting Armature Lever -->
        <line x1="66" y1="40" x2="132" y2="54" stroke="#475569" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="98" cy="47" r="5" fill="#eab308" stroke="#854d0e"/>
        <text x="68" y="26" font-size="7" font-weight="bold" fill="#dc2626">電流OFF → 10μsで開放!</text>
        <path d="M132 54 L132 76" stroke="#dc2626" stroke-width="2.2"/>
        <polygon points="132,81 127,73 137,73" fill="#dc2626"/>
        <rect x="152" y="18" width="154" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="160" y="35" font-size="8.5" font-weight="bold" fill="#b91c1c">パーマロイ吸着レバー ×2</text>
        <text x="160" y="51" font-size="7.5" fill="#7f1d1d">・鏡面研磨の磁性アーマチュア面</text>
        <text x="160" y="65" font-size="7.5" fill="#7f1d1d">・残留磁気ゼロの高透磁率合金</text>
        <text x="160" y="79" font-size="7.5" fill="#dc2626">・遅延 Δt &lt; 10 μs で1/8000s成立</text>
        <text x="34" y="111" font-size="8" fill="#334155">電磁石を切った瞬間に10マイクロ秒以内で幕を解き放つ超精密トリガーレバー</text>
      `);

    case 'shutter_charge_gears':
      return wrap(`
        <!-- Multi-Stage POM/Brass Reduction Charge Gear Train -->
        <circle cx="46" cy="54" r="14" fill="#d97706" stroke="#78350f" stroke-width="1.6"/>
        <circle cx="80" cy="54" r="20" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>
        <circle cx="122" cy="54" r="24" fill="#94a3b8" stroke="#1e293b" stroke-width="1.6"/>
        <text x="38" y="57" font-size="7" font-weight="bold" fill="#fff">M</text>
        <text x="72" y="57" font-size="7.5" font-weight="bold" fill="#0f172a">×4</text>
        <text x="110" y="57" font-size="7.5" font-weight="bold" fill="#fff">×28</text>
        <rect x="160" y="18" width="146" height="74" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="168" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">4段遊星・平歯車減速列</text>
        <text x="168" y="51" font-size="7.5" fill="#334155">・減速比 1:28 で強力バネを瞬時巻上</text>
        <text x="168" y="65" font-size="7.5" fill="#334155">・POM樹脂×真鍮の異材静音噛み合い</text>
        <text x="168" y="79" font-size="7.5" fill="#0284c7">・毎秒15コマ連写の連続チャージ対応</text>
        <text x="34" y="111" font-size="8" fill="#334155">超高速モーターの回転を4段歯車で強力トルクに変換し50ms未満でバネ巻上げ</text>
      `);

    case 'shutter_cocking_cam':
      return wrap(`
        <!-- Asymmetric Eccentric Cocking Cam & Roller Follower Arm -->
        <ellipse cx="66" cy="54" rx="28" ry="20" transform="rotate(-22 66 54)" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.8"/>
        <circle cx="58" cy="54" r="6" fill="#475569"/>
        <!-- Roller Follower Pushing Lever -->
        <circle cx="99" cy="45" r="7" fill="#f59e0b" stroke="#92400e" stroke-width="1.6"/>
        <line x1="99" y1="45" x2="140" y2="28" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
        <text x="42" y="88" font-size="7.5" font-weight="bold" fill="#334155">非対称偏心カム</text>
        <rect x="156" y="18" width="150" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="164" y="35" font-size="8.5" font-weight="bold" fill="#92400e">低衝撃サイクロイド巻上カム</text>
        <text x="164" y="51" font-size="7.5" fill="#78350f">・ローラーフォロワーで滑り摩擦を転がり化</text>
        <text x="164" y="65" font-size="7.5" fill="#78350f">・先幕/後幕を時間差なく同時チャージ</text>
        <text x="164" y="79" font-size="7.5" fill="#b45309">・巻上完了後は退避して走行妨害ゼロ</text>
        <text x="34" y="111" font-size="8" fill="#334155">滑らかなカム曲線と転がりローラーで静音・低消費電力の高速シャッター巻上げ</text>
      `);

    case 'shutter_cam_switch':
      return wrap(`
        <!-- Cam Phase Rotary Encoder & Optical Curtain-Travel Monitor -->
        <circle cx="64" cy="54" r="24" fill="#065f46" stroke="#064e3b" stroke-width="1.6"/>
        <path d="M64 54 L64 32 A22 22 0 0 1 85 60 Z" fill="#facc15"/>
        <line x1="64" y1="54" x2="80" y2="42" stroke="#fff" stroke-width="2.2"/>
        <text x="32" y="89" font-size="7.5" font-weight="bold" fill="#065f46">カム位相ワイパー</text>
        <rect x="108" y="28" width="44" height="52" rx="4" fill="#1e293b"/>
        <line x1="114" y1="54" x2="146" y2="54" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="112" y="23" font-size="7" font-weight="bold" fill="#dc2626">光速度計</text>
        <rect x="164" y="18" width="142" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="172" y="35" font-size="8.5" font-weight="bold" fill="#047857">自己診断＆巻上完了検知</text>
        <text x="172" y="51" font-size="7.5" fill="#065f46">・カム回転角を金メッキ接点で監視</text>
        <text x="172" y="65" font-size="7.5" fill="#065f46">・実幕速を毎ショット光学計測</text>
        <text x="172" y="79" font-size="7.5" fill="#059669">・経年変化を自動補正し露出高精度維持</text>
        <text x="32" y="111" font-size="8" fill="#334155">巻上げ位置と毎回の幕走行時間をリアルタイム監視してシャッター精度を自動校正</text>
      `);

    case 'shutter_blade_brakes':
      return wrap(`
        <!-- Elastomer & Spring Bounce-Elimination Curtain Terminal Brakes -->
        <rect x="20" y="32" width="46" height="14" rx="2" fill="#0ea5e9"/>
        <path d="M70 39 L106 39" stroke="#dc2626" stroke-width="2.4"/>
        <polygon points="111,39 102,34 102,44" fill="#dc2626"/>
        <text x="20" y="26" font-size="7.5" font-weight="bold" fill="#0369a1">超高速羽根到着</text>
        <!-- Multi-Stage Urethane + Friction Brake Pad -->
        <rect x="114" y="20" width="18" height="68" rx="4" fill="#0f766e" stroke="#134e4a" stroke-width="1.6"/>
        <rect x="134" y="24" width="10" height="60" rx="2" fill="#94a3b8"/>
        <text x="98" y="96" font-size="7.5" font-weight="bold" fill="#0f766e">高減衰ブレーキ</text>
        <rect x="158" y="18" width="148" height="74" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="166" y="35" font-size="8.5" font-weight="bold" fill="#0f766e">跳ね返り(バウンド)ゼロ制動</text>
        <text x="166" y="51" font-size="7.5" fill="#115e59">・高ヒステリシス・ウレタン緩衝材</text>
        <text x="166" y="65" font-size="7.5" fill="#115e59">・2次跳ね返りによる再露出ムラ防止</text>
        <text x="166" y="79" font-size="7.5" fill="#0d9488">・金属打撃音を静音マイルド化</text>
        <text x="34" y="111" font-size="8" fill="#334155">終端へ突入する羽根の運動エネルギーを瞬時に熱へ変換し跳ね返りを完全封殺</text>
      `);

    case 'shutter_shock_piston':
      return wrap(`
        <!-- Hydraulic/Pneumatic Micro-Piston & Friction Clutch End-Stop Damper -->
        <rect x="22" y="36" width="82" height="36" rx="5" fill="#e2e8f0" stroke="#334155" stroke-width="1.6"/>
        <rect x="66" y="40" width="16" height="28" rx="2" fill="#d97706" stroke="#92400e"/>
        <line x1="82" y1="54" x2="128" y2="54" stroke="#475569" stroke-width="5"/>
        <!-- Damping Curve Arrow -->
        <path d="M108 32 Q122 44 108 54" fill="none" stroke="#dc2626" stroke-width="2"/>
        <text x="28" y="86" font-size="7.5" font-weight="bold" fill="#334155">マイクロ減衰ピストン</text>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">駆動アーム終端ショックアブソーバー</text>
        <text x="156" y="51" font-size="7.5" fill="#334155">・高粘度シリコーン粘性減衰＋コイルバネ</text>
        <text x="156" y="65" font-size="7.5" fill="#334155">・F_damp = −c·v で終端衝撃ピーク半減</text>
        <text x="156" y="79" font-size="7.5" fill="#0284c7">・50万回連写のリンク疲労破損を防止</text>
        <text x="36" y="111" font-size="8" fill="#334155">高速駆動レバーの停止衝撃を自動車のサスペンションのように滑らかに吸収</text>
      `);

    case 'shutter_fpc_driver':
      return wrap(`
        <!-- High-Current Shutter FPC & H-Bridge Electromagnet/Motor Driver -->
        <rect x="20" y="22" width="110" height="68" rx="5" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
        <rect x="36" y="34" width="34" height="24" rx="2" fill="#1e293b"/>
        <text x="40" y="49" font-size="7" font-weight="bold" fill="#fde047">H-Bridge</text>
        <rect x="82" y="32" width="36" height="12" rx="2" fill="#065f46"/>
        <rect x="82" y="50" width="36" height="12" rx="2" fill="#065f46"/>
        <rect x="34" y="68" width="84" height="12" rx="2" fill="#eab308"/>
        <text x="48" y="77" font-size="7" font-weight="bold" fill="#451a03">メイン基板 ZIF直結</text>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#b45309">シャッター専用フレキ＆駆動回路</text>
        <text x="156" y="51" font-size="7.5" fill="#78350f">・先幕/後幕マグネットのμs逆電流消磁</text>
        <text x="156" y="65" font-size="7.5" fill="#78350f">・巻上モーターの高速PWM制動制御</text>
        <text x="156" y="79" font-size="7.5" fill="#dc2626">・大電流ノイズをEMIシールド遮蔽</text>
        <text x="34" y="111" font-size="8" fill="#334155">電磁石の瞬時消磁パルスとモーター駆動電流を低インピーダンスで一括伝送</text>
      `);

    case 'shutter_floating_grommets':
      return wrap(`
        <!-- 4-Point Elastomer Floating Mount Isolating Shutter Shock from IBIS -->
        <rect x="24" y="20" width="112" height="70" rx="6" fill="#f1f5f9" stroke="#334155" stroke-width="1.6"/>
        <text x="52" y="58" font-size="8.5" font-weight="bold" fill="#0f172a">シャッター本体</text>
        <!-- 4 Corner Floating Elastomer Grommets -->
        <circle cx="32" cy="28" r="7" fill="#0d9488" stroke="#115e59" stroke-width="1.5"/>
        <circle cx="128" cy="28" r="7" fill="#0d9488" stroke="#115e59" stroke-width="1.5"/>
        <circle cx="32" cy="82" r="7" fill="#0d9488" stroke="#115e59" stroke-width="1.5"/>
        <circle cx="128" cy="82" r="7" fill="#0d9488" stroke="#115e59" stroke-width="1.5"/>
        <rect x="152" y="18" width="154" height="74" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="160" y="35" font-size="8.5" font-weight="bold" fill="#0f766e">4点フローティング防振マウント</text>
        <text x="160" y="51" font-size="7.5" fill="#115e59">・段付カラー＋低硬度ブチルゴム4点</text>
        <text x="160" y="65" font-size="7.5" fill="#115e59">・高周波シャッター衝撃を−14 dB遮断</text>
        <text x="160" y="79" font-size="7.5" fill="#0284c7">・IBISジャイロ誤検知＆微ブレを根絶</text>
        <text x="32" y="111" font-size="8" fill="#334155">シャッター全体をゴムの座布団4点で浮かせてボディ・センサーへの振動伝達を遮断</text>
      `);

    // =========================================================================
    // Phase 9: Ultra-Dissected EVF Internal Mechanics Schematics (+4)
    // =========================================================================
    case 'evf_eyecup_latch':
      return wrap(`
        <!-- Dual Stainless Quick-Release Eyecup Slide-Lock Rails & Springs -->
        <rect x="28" y="20" width="96" height="70" rx="8" fill="none" stroke="#475569" stroke-width="6"/>
        <rect x="18" y="58" width="14" height="18" rx="2" fill="#0284c7" stroke="#0369a1"/>
        <rect x="120" y="58" width="14" height="18" rx="2" fill="#0284c7" stroke="#0369a1"/>
        <path d="M14 67 L4 67 M138 67 L148 67" stroke="#d97706" stroke-width="2"/>
        <text x="50" y="58" font-size="8" font-weight="bold" fill="#334155">双葉ロック爪</text>
        <rect x="156" y="18" width="150" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="164" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">誤脱落防止スライドロック</text>
        <text x="164" y="51" font-size="7.5" fill="#334155">・左右対称SUSロック爪＋圧縮バネ×2</text>
        <text x="164" y="65" font-size="7.5" fill="#334155">・両側同時摘みで1秒クイック交換</text>
        <text x="164" y="79" font-size="7.5" fill="#0284c7">・耐誤脱落保持力 &gt; 18 N 達成</text>
        <text x="36" y="111" font-size="8" fill="#334155">標準型と深型遮光アイカップを現場で素早く確実に交換できるステンレス鎖錠</text>
      `);

    case 'evf_diopter_rails':
      return wrap(`
        <!-- Centerless-Ground Twin Stainless Diopter Guide Rods & Anti-Backlash Springs -->
        <line x1="22" y1="30" x2="146" y2="30" stroke="#64748b" stroke-width="4"/>
        <line x1="22" y1="78" x2="146" y2="78" stroke="#64748b" stroke-width="4"/>
        <!-- Movable ED Lens Sled -->
        <rect x="64" y="22" width="32" height="64" rx="4" fill="#d1fae5" stroke="#059669" stroke-width="1.6"/>
        <ellipse cx="80" cy="54" rx="8" ry="20" fill="#6ee7b7" stroke="#047857"/>
        <!-- Preload Coil Springs -->
        <path d="M98 30 L106 25 L112 35 L118 25 L124 35 L132 30" fill="none" stroke="#d97706" stroke-width="2"/>
        <path d="M98 78 L106 73 L112 83 L118 73 L124 83 L132 78" fill="none" stroke="#d97706" stroke-width="2"/>
        <rect x="158" y="18" width="148" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="166" y="35" font-size="8.5" font-weight="bold" fill="#047857">2軸キネマティック案内軸</text>
        <text x="166" y="51" font-size="7.5" fill="#065f46">・真直度1μmセンタレス研磨SUS軸</text>
        <text x="166" y="65" font-size="7.5" fill="#065f46">・対角2軸で光軸傾き0.019°以下</text>
        <text x="166" y="79" font-size="7.5" fill="#b45309">・予圧コイルバネでバックラッシュ零</text>
        <text x="34" y="111" font-size="8" fill="#334155">2本の鏡面ガイド軸と予圧バネが視度可動レンズの片ボケと遊びを完全追放</text>
      `);

    case 'evf_diopter_helicoid':
      return wrap(`
        <!-- 3-Track Helical Spiral-Cam Barrel Sleeve & Brass Sector Pinion -->
        <rect x="28" y="22" width="104" height="64" rx="8" fill="#334155" stroke="#0f172a" stroke-width="1.8"/>
        <path d="M40 32 L116 46 M40 54 L116 68" stroke="#facc15" stroke-width="4" stroke-linecap="round"/>
        <circle cx="78" cy="39" r="4.5" fill="#f8fafc" stroke="#0f172a"/>
        <circle cx="78" cy="61" r="4.5" fill="#f8fafc" stroke="#0f172a"/>
        <text x="36" y="96" font-size="7.5" font-weight="bold" fill="#b45309">120°×3条スパイラル溝</text>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#fffbeb" stroke="#eab308"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#854d0e">3点均等推力ヘリコイド鏡筒</text>
        <text x="156" y="51" font-size="7.5" fill="#713f12">・回転角 φ → 3点同軸Z推力へ変換</text>
        <text x="156" y="65" font-size="7.5" fill="#713f12">・リード角 6.8° ⇒ 衝撃逆転ゼロ</text>
        <text x="156" y="79" font-size="7.5" fill="#c2410c">・繰り返し位置精度 ±5 μm 達成</text>
        <text x="32" y="111" font-size="8" fill="#334155">交換レンズ直系の3条らせんカム溝で大型ED接眼群をこじれゼロで前後駆動</text>
      `);

    case 'evf_oled_alignment':
      return wrap(`
        <!-- 3-Point Kinematic Micron Tilt & Centering OLED Calibration Frame -->
        <rect x="28" y="22" width="102" height="66" rx="5" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>
        <rect x="44" y="34" width="70" height="42" rx="2" fill="#2563eb"/>
        <text x="58" y="58" font-size="8" font-weight="bold" fill="#fff">944万OLED</text>
        <!-- 3 Triangular Brass Calibration Screws -->
        <circle cx="79" cy="24" r="6" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>
        <circle cx="36" cy="84" r="6" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>
        <circle cx="122" cy="84" r="6" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>
        <polygon points="79,24 36,84 122,84" fill="none" stroke="#b45309" stroke-dasharray="3 2"/>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#1d4ed8">3点μm光軸チルト調芯枠</text>
        <text x="156" y="51" font-size="7.5" fill="#1e3a8a">・極細P0.2mm真鍮レベリングネジ×3</text>
        <text x="156" y="65" font-size="7.5" fill="#1e3a8a">・低膨張コバール枠＋セラミック球座</text>
        <text x="156" y="79" font-size="7.5" fill="#dc2626">・像面チルト ±0.03°以内へ工場校正</text>
        <text x="34" y="111" font-size="8" fill="#334155">3本の極細真鍮ネジで6.4μm画素の平面度を追い込み四隅まで完璧な解像を実現</text>
      `);

    // =========================================================================
    // Phase 9: Ultra-Dissected 4-Axis LCD Hinge Mechanics Schematics (+8)
    // =========================================================================
    case 'lcd_orientation_hall':
      return wrap(`
        <!-- 3D Hall-Effect Magnetic Orientation Sensor & Neodymium Magnets -->
        <rect x="24" y="24" width="48" height="62" rx="4" fill="#1e293b" stroke="#0f172a"/>
        <rect x="58" y="38" width="10" height="28" rx="2" fill="#dc2626"/>
        <text x="27" y="56" font-size="7.5" font-weight="bold" fill="#f8fafc">磁石</text>
        <!-- Magnetic Flux Arcs -->
        <path d="M72 44 Q94 34 114 48" fill="none" stroke="#3b82f6" stroke-width="1.6" stroke-dasharray="3 2"/>
        <path d="M72 60 Q94 70 114 56" fill="none" stroke="#3b82f6" stroke-width="1.6" stroke-dasharray="3 2"/>
        <rect x="114" y="42" width="24" height="24" rx="3" fill="#065f46" stroke="#10b981"/>
        <text x="117" y="57" font-size="7" font-weight="bold" fill="#fde047">Hall</text>
        <rect x="154" y="18" width="152" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="162" y="35" font-size="8.5" font-weight="bold" fill="#047857">非接触3Dホール反転検知</text>
        <text x="162" y="51" font-size="7.5" fill="#065f46">・180°自撮り展開で自動ミラー反転</text>
        <text x="162" y="65" font-size="7.5" fill="#065f46">・画面裏返し収納で自動消灯節電</text>
        <text x="162" y="79" font-size="7.5" fill="#0284c7">・接点摩耗ゼロ＆防塵防滴に有利</text>
        <text x="34" y="111" font-size="8" fill="#334155">極小磁石の磁界変化をホールICが非接触検知し画面反転と省電力を自動制御</text>
      `);

    case 'lcd_swivel_clutch':
      return wrap(`
        <!-- Stacked Belleville Disc-Spring Friction Torque Clutch (2-Axis Swivel) -->
        <line x1="20" y1="54" x2="146" y2="54" stroke="#475569" stroke-width="7"/>
        <!-- Belleville Disc Springs (< > < >) -->
        <path d="M44 36 L52 54 L44 72 M62 36 L54 54 L62 72 M72 36 L80 54 L72 72 M90 36 L82 54 L90 72" fill="none" stroke="#d97706" stroke-width="2.6"/>
        <rect x="104" y="34" width="24" height="40" rx="3" fill="#94a3b8" stroke="#1e293b"/>
        <text x="36" y="88" font-size="7.5" font-weight="bold" fill="#b45309">皿バネ積層クラッチ</text>
        <rect x="156" y="18" width="150" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="164" y="35" font-size="8.5" font-weight="bold" fill="#92400e">フリーストップ皿バネ機構</text>
        <text x="164" y="51" font-size="7.5" fill="#78350f">・SUS301皿バネを交互積層し定圧保持</text>
        <text x="164" y="65" font-size="7.5" fill="#78350f">・静止トルク ≈ 0.35 N·m (10万回維持)</text>
        <text x="164" y="79" font-size="7.5" fill="#dc2626">・指1本で動き任意角度でピタッと静止</text>
        <text x="34" y="111" font-size="8" fill="#334155">6枚の皿バネが摩擦板を挟み込み10万回開閉しても緩まない上質なトルクを実現</text>
      `);

    case 'lcd_detent_stops':
      return wrap(`
        <!-- 0° / 180° / 270° Hardened Cam Detent Stops & End-Limit Bumpers -->
        <circle cx="76" cy="54" r="30" fill="#e2e8f0" stroke="#334155" stroke-width="1.8"/>
        <circle cx="76" cy="24" r="4.5" fill="#dc2626"/>
        <circle cx="106" cy="54" r="4.5" fill="#0284c7"/>
        <circle cx="76" cy="84" r="4.5" fill="#10b981"/>
        <text x="66" y="17" font-size="7" font-weight="bold" fill="#dc2626">180°自撮り</text>
        <text x="112" y="57" font-size="7" font-weight="bold" fill="#0284c7">0°収納</text>
        <text x="62" y="96" font-size="7" font-weight="bold" fill="#047857">−90°下向</text>
        <rect x="156" y="18" width="150" height="74" rx="5" fill="#f1f5f9" stroke="#64748b"/>
        <text x="164" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">角度クリック＆過回転ストッパー</text>
        <text x="164" y="51" font-size="7.5" fill="#334155">・0°/180°位置で鋼球がカチッと係合</text>
        <text x="164" y="65" font-size="7.5" fill="#334155">・焼入れ鋼ストッパーで270°以上を阻止</text>
        <text x="164" y="79" font-size="7.5" fill="#dc2626">・内部フレキ断線を物理的に100%防止</text>
        <text x="34" y="111" font-size="8" fill="#334155">決まった角度の心地よいクリック感と内部ケーブルねじ切れ防止の頑丈な終端止め</text>
      `);

    case 'lcd_coaxial_fpc':
      return wrap(`
        <!-- Helical Coaxial / Rolled Polyimide Flex Harness Inside Hollow Hinge Shaft -->
        <rect x="20" y="32" width="124" height="44" rx="22" fill="none" stroke="#475569" stroke-width="4"/>
        <!-- Helical Flex Ribbon Passing Through Center -->
        <path d="M16 54 Q42 38 66 54 T114 54 T152 54" fill="none" stroke="#f59e0b" stroke-width="5"/>
        <path d="M16 54 Q42 38 66 54 T114 54 T152 54" fill="none" stroke="#78350f" stroke-width="1.2" stroke-dasharray="4 3"/>
        <text x="36" y="92" font-size="7.5" font-weight="bold" fill="#b45309">中空軸内 らせん貫通配線</text>
        <rect x="160" y="18" width="146" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="168" y="35" font-size="8.5" font-weight="bold" fill="#92400e">10万回屈曲耐性らせんFPC</text>
        <text x="168" y="51" font-size="7.5" fill="#78350f">・圧延焼鈍銅箔(RA銅)で疲労断線ゼロ</text>
        <text x="168" y="65" font-size="7.5" fill="#78350f">・270°回転をらせん伸縮へ逃がす構造</text>
        <text x="168" y="79" font-size="7.5" fill="#0284c7">・MIPI映像＋タッチ＋電源を一括伝送</text>
        <text x="32" y="111" font-size="8" fill="#334155">ヒンジの空洞をらせん状に巻いて通すことで開閉と回転の捻れ応力を極小化</text>
      `);

    case 'lcd_pantograph_links':
      return wrap(`
        <!-- 4-Bar Pantograph Parallel Rear Tilt Linkage Arms -->
        <rect x="24" y="22" width="14" height="66" rx="2" fill="#475569"/>
        <line x1="38" y1="32" x2="108" y2="44" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>
        <line x1="38" y1="74" x2="108" y2="86" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>
        <rect x="108" y="36" width="14" height="56" rx="2" fill="#0ea5e9"/>
        <circle cx="38" cy="32" r="4" fill="#facc15"/><circle cx="108" cy="44" r="4" fill="#facc15"/>
        <circle cx="38" cy="74" r="4" fill="#facc15"/><circle cx="108" cy="86" r="4" fill="#facc15"/>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#0369a1">4節パンタグラフチルトリンク</text>
        <text x="156" y="51" font-size="7.5" fill="#075985">・画面を後方へ引き出してから上98°チルト</text>
        <text x="156" y="65" font-size="7.5" fill="#075985">・EVFアイカップとぶつからない軌跡設計</text>
        <text x="156" y="79" font-size="7.5" fill="#0284c7">・光軸の真後ろでローアングル撮影可能</text>
        <text x="34" y="111" font-size="8" fill="#334155">4本のステンレス平行リンクがEVFを避けつつ光軸直後の素早い上下チルトを実現</text>
      `);

    case 'lcd_tilt_torque_cams':
      return wrap(`
        <!-- Asymmetric Gravity-Compensating Tilt Friction Torque Cams -->
        <rect x="26" y="24" width="108" height="62" rx="6" fill="#f8fafc" stroke="#64748b"/>
        <!-- Angle vs Torque Curve -->
        <path d="M36 74 Q74 34 124 44" fill="none" stroke="#dc2626" stroke-width="2.6"/>
        <line x1="36" y1="78" x2="128" y2="78" stroke="#334155"/>
        <line x1="36" y1="30" x2="36" y2="78" stroke="#334155"/>
        <text x="44" y="38" font-size="7.5" font-weight="bold" fill="#dc2626">水平45°で保持力UP!</text>
        <text x="52" y="84" font-size="7" fill="#475569">チルト角度 (0° → 98°)</text>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#b91c1c">重力補償非対称トルクカム</text>
        <text x="156" y="51" font-size="7.5" fill="#7f1d1d">・液晶の自重が最大になる角度で自動増圧</text>
        <text x="156" y="65" font-size="7.5" fill="#7f1d1d">・引き始めは軽く、止めたい位置で高剛性</text>
        <text x="156" y="79" font-size="7.5" fill="#dc2626">・タッチ操作で画面が押されても下がらない</text>
        <text x="32" y="111" font-size="8" fill="#334155">カム形状でバネ圧を角度制御しタッチ操作してもお辞儀しない絶妙な保持感</text>
      `);

    case 'lcd_tilt_slide_rails':
      return wrap(`
        <!-- Twin Stainless Linear Slide Rails & PTFE Glider Shoes -->
        <rect x="22" y="24" width="122" height="10" rx="2" fill="#94a3b8" stroke="#334155"/>
        <rect x="22" y="74" width="122" height="10" rx="2" fill="#94a3b8" stroke="#334155"/>
        <rect x="64" y="20" width="36" height="18" rx="3" fill="#0ea5e9" stroke="#0369a1"/>
        <rect x="64" y="70" width="36" height="18" rx="3" fill="#0ea5e9" stroke="#0369a1"/>
        <path d="M40 54 L124 54" stroke="#d97706" stroke-width="2.4"/>
        <polygon points="128,54 120,49 120,59" fill="#d97706"/>
        <polygon points="36,54 44,49 44,59" fill="#d97706"/>
        <text x="48" y="49" font-size="7.5" font-weight="bold" fill="#b45309">22 mm 水平スライド</text>
        <rect x="156" y="18" width="150" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="164" y="35" font-size="8.5" font-weight="bold" fill="#0369a1">上下ステンレス摺動レール</text>
        <text x="164" y="51" font-size="7.5" fill="#075985">・PTFE低摩擦シューでガタつきゼロ</text>
        <text x="164" y="65" font-size="7.5" fill="#075985">・側面ケーブル(HDMI/マイク)回避</text>
        <text x="164" y="79" font-size="7.5" fill="#0284c7">・チルト＋バリアングル両立の要</text>
        <text x="34" y="111" font-size="8" fill="#334155">クレードル内を滑らかにスライドして側面ケーブルとの干渉を鮮やかに回避</text>
      `);

    case 'lcd_cradle_locks':
      return wrap(`
        <!-- Rear Cradle Magnetic & Spring Parking Locks + Vibration Pads -->
        <rect x="24" y="20" width="110" height="70" rx="6" fill="none" stroke="#334155" stroke-width="4"/>
        <!-- 4 Corner Elastomer Cushion & Latch Clips -->
        <rect x="22" y="18" width="16" height="10" rx="2" fill="#dc2626"/>
        <rect x="120" y="18" width="16" height="10" rx="2" fill="#dc2626"/>
        <rect x="22" y="82" width="16" height="10" rx="2" fill="#0d9488"/>
        <rect x="120" y="82" width="16" height="10" rx="2" fill="#0d9488"/>
        <text x="46" y="58" font-size="8" font-weight="bold" fill="#334155">収納ロック4点</text>
        <rect x="152" y="18" width="154" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="160" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">ガタつき防止ドッキング爪</text>
        <text x="160" y="51" font-size="7.5" fill="#334155">・収納時に磁石＋板バネ爪で完全密着</text>
        <text x="160" y="65" font-size="7.5" fill="#334155">・4隅エラストマー座で衝撃・ビビり吸収</text>
        <text x="160" y="79" font-size="7.5" fill="#0f766e">・固定式モニター同等のボディ一体感</text>
        <text x="34" y="111" font-size="8" fill="#334155">モニターを閉じた瞬間に4点クリップと磁石でボディ背面へピタッと隙間なく固定</text>
      `);

    // =========================================================================
    // Phase 9: Ultra-Dissected Body Internal Electromechanical Schematics (+14)
    // =========================================================================
    case 'body_battery_ejector':
      return wrap(`
        <!-- Battery Retention Claw, 45deg Auto-Lock Cam & Torsion Spring -->
        <rect x="28" y="16" width="52" height="58" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="1.6"/>
        <text x="34" y="48" font-size="8" font-weight="bold" fill="#fff">バッテリー</text>
        <!-- Blue Retention Claw Locking Under Corner -->
        <polygon points="64,74 106,74 106,86 72,86" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.5"/>
        <circle cx="100" cy="80" r="6" fill="#facc15" stroke="#92400e"/>
        <path d="M54 88 L54 78" stroke="#dc2626" stroke-width="2.2"/>
        <text x="86" y="68" font-size="7.5" font-weight="bold" fill="#1d4ed8">青色ロック爪</text>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#1d4ed8">二重安全 脱落防止ラッチ</text>
        <text x="156" y="51" font-size="7.5" fill="#1e3a8a">・45°斜面で押込だけで自動カチッと係合</text>
        <text x="156" y="65" font-size="7.5" fill="#1e3a8a">・底蓋を開けても電池落下を完全阻止</text>
        <text x="156" y="79" font-size="7.5" fill="#0284c7">・解除と同時に排出バネが8mm押出し</text>
        <text x="34" y="111" font-size="8" fill="#334155">トーションバネ付勢の青いストッパー爪が高価なバッテリーの誤落下を防止</text>
      `);

    case 'body_battery_terminals':
      return wrap(`
        <!-- 4-Pin Gold Twin-Contact Leaf Springs & 2oz Heavy-Copper Power FPC -->
        <rect x="20" y="20" width="114" height="22" rx="3" fill="#334155"/>
        ${[34, 58, 82, 106]
          .map(
            (x) =>
              `<rect x="${x}" y="42" width="4" height="22" rx="1" fill="#eab308"/><rect x="${x + 6}" y="42" width="4" height="22" rx="1" fill="#facc15"/>`
          )
          .join('')}
        <rect x="28" y="72" width="96" height="16" rx="3" fill="#f59e0b" stroke="#92400e"/>
        <text x="42" y="83" font-size="7.5" font-weight="bold" fill="#fff">2oz 厚銅パワーFPC</text>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#854d0e">6A大電流 金メッキ二股端子</text>
        <text x="156" y="51" font-size="7.5" fill="#713f12">・1極2本バネ冗長接触で瞬断ゼロ</text>
        <text x="156" y="65" font-size="7.5" fill="#713f12">・接触抵抗 &lt; 5 mΩ (発熱わずか0.14W)</text>
        <text x="156" y="79" font-size="7.5" fill="#c2410c">・+7.2V / GND / 温度 / BMS通信 4極</text>
        <text x="32" y="111" font-size="8" fill="#334155">二股リン青銅金メッキ接点が激しい連写振動下でも6A大電流を途切れず供給</text>
      `);

    case 'body_shutter_switch':
      return wrap(`
        <!-- 2-Stage Coaxial Stainless Snap-Dome Shutter Release Force Curve -->
        <path d="M24 80 L48 56 L62 64 L88 32 L106 44 L132 28" fill="none" stroke="#dc2626" stroke-width="2.4"/>
        <line x1="20" y1="84" x2="138" y2="84" stroke="#334155"/>
        <line x1="20" y1="20" x2="20" y2="84" stroke="#334155"/>
        <circle cx="48" cy="56" r="4" fill="#f59e0b"/>
        <circle cx="88" cy="32" r="4" fill="#dc2626"/>
        <text x="26" y="48" font-size="7" font-weight="bold" fill="#b45309">S1半押 1.2N</text>
        <text x="78" y="24" font-size="7" font-weight="bold" fill="#dc2626">S2全押 2.8N</text>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#b45309">2段SUSスナップドーム接点</text>
        <text x="156" y="51" font-size="7.5" fill="#78350f">・スナップ比35%の明確な2段クリック</text>
        <text x="156" y="65" font-size="7.5" fill="#78350f">・バウンス時間 &lt; 1ms の高速レリーズ</text>
        <text x="156" y="79" font-size="7.5" fill="#dc2626">・50万回耐久＋同軸電源ワイパー一体</text>
        <text x="34" y="111" font-size="8" fill="#334155">2枚重ねの極小金属ドームが指先だけで半押しと全押しをミリ秒判別する感触</text>
      `);

    case 'body_command_encoders':
      return wrap(`
        <!-- Non-Contact Optical Slotted Chopper Wheel & Steel Ball Detent -->
        <circle cx="68" cy="54" r="28" fill="#cbd5e1" stroke="#334155" stroke-width="2" stroke-dasharray="6 4"/>
        <circle cx="68" cy="54" r="10" fill="#d97706"/>
        <!-- Photo Interrupter Fork -->
        <rect x="92" y="44" width="24" height="20" rx="3" fill="#1e293b"/>
        <text x="95" y="57" font-size="7" font-weight="bold" fill="#38bdf8">A/B</text>
        <!-- Steel Ball + Spring -->
        <circle cx="38" cy="54" r="5" fill="#f8fafc" stroke="#334155" stroke-width="1.5"/>
        <path d="M16 54 L22 49 L26 59 L32 54" fill="none" stroke="#d97706" stroke-width="2"/>
        <rect x="136" y="18" width="170" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="35" font-size="8.5" font-weight="bold" fill="#0369a1">非接触光学エンコーダー＆鋼球</text>
        <text x="144" y="51" font-size="7.5" fill="#075985">・A/B 90°位相差パルスで回転方向検出</text>
        <text x="144" y="65" font-size="7.5" fill="#075985">・摩耗・接点飛び(チャタリング)完全零</text>
        <text x="144" y="79" font-size="7.5" fill="#b45309">・焼入れ鋼球＋バネで小気味よいクリック</text>
        <text x="34" y="111" font-size="8" fill="#334155">光のスリット検出と独立鋼球クリック機構で10万回回しても新品同様の操作感</text>
      `);

    case 'body_mode_lock_ratchet':
      return wrap(`
        <!-- Center-Push Mode Lock Ratchet & Dual-Deck Concentric Hollow Shaft -->
        <circle cx="56" cy="54" r="24" fill="#cbd5e1" stroke="#334155" stroke-width="2" stroke-dasharray="5 3"/>
        <rect x="78" y="48" width="18" height="12" rx="2" fill="#dc2626"/>
        <text x="36" y="88" font-size="7.5" font-weight="bold" fill="#dc2626">ロック解除爪</text>
        <!-- Concentric Dual Shaft Cross Section -->
        <rect x="114" y="24" width="18" height="60" rx="3" fill="#d97706" stroke="#78350f"/>
        <rect x="119" y="16" width="8" height="74" rx="2" fill="#94a3b8" stroke="#1e293b"/>
        <text x="106" y="96" font-size="7" font-weight="bold" fill="#78350f">二重同軸</text>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#92400e">遊星ラチェット＆2段同軸軸</text>
        <text x="156" y="51" font-size="7.5" fill="#78350f">・中央押下時のみロック爪が退避回転</text>
        <text x="156" y="65" font-size="7.5" fill="#78350f">・耐誤操作トルク &gt; 1.5 N·m の絶対安全</text>
        <text x="156" y="79" font-size="7.5" fill="#0284c7">・中空外軸(AF)＋中芯軸(連写)独立駆動</text>
        <text x="34" y="111" font-size="8" fill="#334155">プッシュ解除ラチェットと二重同軸シャフトがバッグ内誤操作をゼロにする</text>
      `);

    case 'body_top_switch_fpc':
      return wrap(`
        <!-- U-Shaped Top-Deck Rigid-Flex Harness Wrapping Around EVF + Gray-Code Rings -->
        <path d="M26 24 H56 V78 H26 Z M106 24 H136 V78 H106 Z" fill="#065f46" stroke="#064e3b" stroke-width="1.5"/>
        <rect x="52" y="22" width="58" height="14" rx="2" fill="#f59e0b" stroke="#92400e"/>
        <text x="64" y="62" font-size="7.5" font-weight="bold" fill="#64748b">EVF回避</text>
        <circle cx="41" cy="52" r="10" fill="none" stroke="#facc15" stroke-width="2.5" stroke-dasharray="4 2"/>
        <circle cx="121" cy="52" r="10" fill="none" stroke="#facc15" stroke-width="2.5" stroke-dasharray="4 2"/>
        <rect x="150" y="18" width="156" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="158" y="35" font-size="8.5" font-weight="bold" fill="#047857">U字リジッドフレキ＆グレイコード</text>
        <text x="158" y="51" font-size="7.5" fill="#065f46">・EVF鏡筒を迂回する一体U字配線</text>
        <text x="158" y="65" font-size="7.5" fill="#065f46">・1bit変化グレイコードで誤読完全零</text>
        <text x="158" y="79" font-size="7.5" fill="#dc2626">・±15kV静電気保護TVSを直近実装</text>
        <text x="32" y="111" font-size="8" fill="#334155">肩部ダイヤル・RECボタン・Sub-OLEDをEVF回避U字シートへ高密度統合</text>
      `);

    case 'body_hotshoe_springs':
      return wrap(`
        <!-- Hot-Shoe Dual Cantilever Leaf Springs + Silicone Rain-Seal Skirt + 21-Pin FPC -->
        <rect x="24" y="28" width="108" height="10" rx="2" fill="#94a3b8" stroke="#334155"/>
        <path d="M36 44 Q78 34 120 44" fill="none" stroke="#d97706" stroke-width="3.2"/>
        <path d="M78 44 L78 24" stroke="#dc2626" stroke-width="2.2"/>
        <polygon points="78,19 73,27 83,27" fill="#dc2626"/>
        <text x="48" y="56" font-size="7.5" font-weight="bold" fill="#b45309">12 N 上向き板バネ圧着</text>
        <rect x="28" y="64" width="100" height="10" rx="3" fill="#0f766e"/>
        <rect x="52" y="76" width="52" height="12" rx="2" fill="#f59e0b"/>
        <text x="58" y="85" font-size="7" font-weight="bold" fill="#fff">21ピンFPC</text>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">双葉板バネ＆21ピン防水FPC</text>
        <text x="156" y="51" font-size="7.5" fill="#334155">・ストロボ脚のガタ除去＆確実GND接地</text>
        <text x="156" y="65" font-size="7.5" fill="#334155">・成型シリコーンスカートで屋根浸水防止</text>
        <text x="156" y="79" font-size="7.5" fill="#0284c7">・EMI遮蔽FPCで24bitデジタル音声直結</text>
        <text x="34" y="111" font-size="8" fill="#334155">ステンレス板バネのガタ止めと防水スカートが雨天ストロボ＆マイク収録を死守</text>
      `);

    case 'body_card_ejectors':
      return wrap(`
        <!-- Push-Push Mechanical Heart-Cam Closed Loop Track Diagram -->
        <rect x="22" y="18" width="112" height="74" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
        <!-- Iconic Heart-Cam Closed Loop Path! -->
        <path d="M78 82 L108 46 Q108 26 90 30 L78 44 L66 30 Q48 26 48 46 Z" fill="none" stroke="#1e293b" stroke-width="3.2"/>
        <circle cx="78" cy="44" r="5" fill="#dc2626"/>
        <text x="64" y="60" font-size="7.5" font-weight="bold" fill="#dc2626">ロック谷</text>
        <text x="34" y="86" font-size="7" font-weight="bold" fill="#92400e">押す→ロック / 再押→排出</text>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#b45309">ハートカム双安定排出メカ</text>
        <text x="156" y="51" font-size="7.5" fill="#78350f">・電力不要の純機械式プッシュ・プッシュ</text>
        <text x="156" y="65" font-size="7.5" fill="#78350f">・一方向段差溝＋線ばねピンで逆流零</text>
        <text x="156" y="79" font-size="7.5" fill="#0284c7">・CFexpress/SD 5万回挿抜＋検知SW</text>
        <text x="32" y="111" font-size="8" fill="#334155">ボールペンと同じハート型の迷路溝がカードを確実にロックしワンプッシュ排出</text>
      `);

    case 'body_card_door_latch':
      return wrap(`
        <!-- Card Door Dual-Hook Slide Lock & Sub-25ms Data-Safety Interlock Switch -->
        <rect x="24" y="20" width="22" height="70" rx="3" fill="#475569"/>
        <rect x="46" y="28" width="16" height="10" rx="2" fill="#94a3b8"/>
        <rect x="46" y="70" width="16" height="10" rx="2" fill="#94a3b8"/>
        <!-- Safety Interlock Micro-Switch -->
        <rect x="80" y="62" width="46" height="24" rx="3" fill="#f8fafc" stroke="#334155" stroke-width="1.4"/>
        <rect x="68" y="70" width="12" height="8" rx="1" fill="#dc2626"/>
        <text x="86" y="77" font-size="7.5" font-weight="bold" fill="#dc2626">安全SW</text>
        <text x="64" y="36" font-size="7.5" font-weight="bold" fill="#0f766e">2フック防水圧着</text>
        <rect x="144" y="18" width="162" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="152" y="35" font-size="8.5" font-weight="bold" fill="#b91c1c">データ破損防止インターロック</text>
        <text x="152" y="51" font-size="7.5" fill="#7f1d1d">・0.5mm開扉で即座にハード割り込み</text>
        <text x="152" y="65" font-size="7.5" fill="#7f1d1d">・25ms未満で8K書込キャッシュ退避</text>
        <text x="152" y="79" font-size="7.5" fill="#0f766e">・2フックでパッキン25%均一防水圧縮</text>
        <text x="34" y="111" font-size="8" fill="#334155">指がカードに触れるより早く開扉を検知して8K記録中のデータ破損を完全阻止</text>
      `);

    case 'body_joystick_gimbal':
      return wrap(`
        <!-- 8-Way AF Joystick 4-Axis Cross-Gimbal & 5-Dome Tactile PCB -->
        <circle cx="76" cy="54" r="32" fill="#ecfdf5" stroke="#10b981" stroke-width="1.6"/>
        <!-- Cross Gimbal Bars -->
        <rect x="46" y="49" width="60" height="10" rx="2" fill="#94a3b8" stroke="#334155"/>
        <rect x="71" y="24" width="10" height="60" rx="2" fill="#94a3b8" stroke="#334155"/>
        <!-- 5 Gold Snap Domes -->
        <circle cx="76" cy="54" r="5" fill="#eab308" stroke="#854d0e"/>
        <circle cx="76" cy="30" r="4.5" fill="#eab308"/>
        <circle cx="76" cy="78" r="4.5" fill="#eab308"/>
        <circle cx="52" cy="54" r="4.5" fill="#eab308"/>
        <circle cx="100" cy="54" r="4.5" fill="#eab308"/>
        <rect x="136" y="18" width="170" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="144" y="35" font-size="8.5" font-weight="bold" fill="#047857">4軸ジンバル＆5接点ドーム</text>
        <text x="144" y="51" font-size="7.5" fill="#065f46">・±12°極短ストロークで8方向瞬時応答</text>
        <text x="144" y="65" font-size="7.5" fill="#065f46">・斜め45°は隣接2ドームを均等同時押下</text>
        <text x="144" y="79" font-size="7.5" fill="#0f766e">・シリコーン蛇腹シールで全天候防水</text>
        <text x="34" y="111" font-size="8" fill="#334155">十字ジンバルと5つの金メッキ極小ドームでファインダーを覗いたまま自在AF操作</text>
      `);

    case 'body_rear_wheel_encoder':
      return wrap(`
        <!-- Hollow-Center 36-Pulse Optical Ring Encoder + 4-Way Cardinal Domes -->
        <circle cx="76" cy="54" r="32" fill="none" stroke="#475569" stroke-width="8" stroke-dasharray="5 3"/>
        <circle cx="76" cy="54" r="18" fill="#eef2ff" stroke="#6366f1" stroke-width="1.5"/>
        <circle cx="76" cy="54" r="6" fill="#eab308"/>
        <circle cx="76" cy="36" r="3.5" fill="#eab308"/><circle cx="76" cy="72" r="3.5" fill="#eab308"/>
        <circle cx="58" cy="54" r="3.5" fill="#eab308"/><circle cx="94" cy="54" r="3.5" fill="#eab308"/>
        <rect x="136" y="18" width="170" height="74" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="144" y="35" font-size="8.5" font-weight="bold" fill="#4338ca">中空3機能同軸エンコーダー</text>
        <text x="144" y="51" font-size="7.5" fill="#312e81">・外周：36パルス非接触リング光学読取</text>
        <text x="144" y="65" font-size="7.5" fill="#312e81">・内周：4方向＋中央決定 5点ドーム</text>
        <text x="144" y="79" font-size="7.5" fill="#dc2626">・厚さわずか3.8mmの極薄積層メカ</text>
        <text x="34" y="111" font-size="8" fill="#334155">真ん中が空洞のドーナツ型光学リングが回転・4方向・中央押下を極薄で一体化</text>
      `);

    case 'body_strap_anchors':
      return wrap(`
        <!-- Forged Stainless Tri-Bolt Internal Strap Lug Reinforcement Plate -->
        <rect x="24" y="20" width="40" height="70" rx="4" fill="#cbd5e1" stroke="#334155" stroke-width="1.8"/>
        <circle cx="44" cy="34" r="5" fill="#475569"/><circle cx="34" cy="70" r="5" fill="#475569"/><circle cx="54" cy="70" r="5" fill="#475569"/>
        <!-- External Strap Loop Pulling Load -->
        <circle cx="94" cy="54" r="14" fill="none" stroke="#64748b" stroke-width="5"/>
        <path d="M110 54 L134 54" stroke="#dc2626" stroke-width="2.6"/>
        <polygon points="139,54 130,49 130,59" fill="#dc2626"/>
        <text x="86" y="84" font-size="7.5" font-weight="bold" fill="#dc2626">500 N 引張保証</text>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">鍛造SUS 3点トライボルト裏板</text>
        <text x="156" y="51" font-size="7.5" fill="#334155">・重い大口径レンズ携行時の動的衝撃吸収</text>
        <text x="156" y="65" font-size="7.5" fill="#334155">・3点三角M2.0ボルトで緩み・外装割れ零</text>
        <text x="156" y="79" font-size="7.5" fill="#0f766e">・EPDM防水グロメットで貫通部完全封止</text>
        <text x="34" y="111" font-size="8" fill="#334155">約50kgの引張にも耐える鍛造ステンレス裏板がカメラ落下を内側から絶対阻止</text>
      `);

    case 'body_acoustic_breather':
      return wrap(`
        <!-- Hydrophobic ePTFE Membrane Blocking Raindrops While Passing Sound & Air -->
        <rect x="20" y="46" width="118" height="10" rx="2" fill="#e2e8f0" stroke="#0284c7" stroke-width="1.6"/>
        <text x="36" y="54" font-size="7" font-weight="bold" fill="#0369a1">ePTFE 0.2μm細孔膜</text>
        <!-- Water Droplet Bounced Off Top -->
        <circle cx="46" cy="30" r="10" fill="#38bdf8" stroke="#0284c7"/>
        <text x="26" y="16" font-size="7" font-weight="bold" fill="#0369a1">水滴ブロック!</text>
        <!-- Sound Waves & Air Passing Freely -->
        <path d="M98 20 Q108 32 98 44 M98 58 Q108 72 98 84" fill="none" stroke="#10b981" stroke-width="2.2"/>
        <text x="84" y="94" font-size="7.5" font-weight="bold" fill="#047857">音・気圧のみ透過</text>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#0e7490">防水マイク・ブザー＆通気弁</text>
        <text x="156" y="51" font-size="7.5" fill="#155e75">・耐水圧 &gt; 30 kPa で豪雨侵入を遮断</text>
        <text x="156" y="65" font-size="7.5" fill="#155e75">・シリコーン防振室でAFモーター音−15dB</text>
        <text x="156" y="79" font-size="7.5" fill="#0284c7">・飛行機や高山での内圧差を自動イコライズ</text>
        <text x="34" y="111" font-size="8" fill="#334155">水滴を弾きつつ音波と空気だけを通すePTFE膜で防水収録と気圧調整を両立</text>
      `);

    case 'body_chassis_gaskets':
      return wrap(`
        <!-- Labyrinth Step Joint + 25% Compressed 3D Silicone Perimeter Gasket -->
        <path d="M22 36 H68 V54 H128" fill="none" stroke="#334155" stroke-width="6"/>
        <path d="M22 68 H68 V84 H128" fill="none" stroke="#64748b" stroke-width="6"/>
        <!-- Compressed Silicone Gasket in Groove -->
        <ellipse cx="96" cy="69" rx="14" ry="8" fill="#0f766e" stroke="#134e4a" stroke-width="1.6"/>
        <text x="72" y="28" font-size="7.5" font-weight="bold" fill="#0284c7">段差ラビリンス迷路</text>
        <text x="68" y="96" font-size="7.5" font-weight="bold" fill="#0f766e">圧縮率 25% 気密シール</text>
        <rect x="148" y="18" width="158" height="74" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="156" y="35" font-size="8.5" font-weight="bold" fill="#0f766e">3D全周防塵防滴ガスケット網</text>
        <text x="156" y="51" font-size="7.5" fill="#115e59">・前後上下外装＆マウント周りを立体封止</text>
        <text x="156" y="65" font-size="7.5" fill="#115e59">・ラビリンス段差＋25%圧縮の二重防壁</text>
        <text x="156" y="79" font-size="7.5" fill="#0d9488">・−20℃の極寒でも硬化しない高弾性ゴム</text>
        <text x="34" y="111" font-size="8" fill="#334155">ボディのすべての継ぎ目を立体ゴムパッキン網で囲み豪雨や砂嵐から内部を守る</text>
      `);

    default:
      return wrap('');
  }
}
