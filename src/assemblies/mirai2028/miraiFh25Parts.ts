import * as THREE from 'three';
import { CadPart } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import {
  createFrameShape,
  createRoundedRectShape,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import {
  addKnurledRingToGroup,
  addTorxBolts,
  buildCurvedFpcRibbon,
  buildMeniscusLensGeo,
  finalizeMiraiPart,
  InstanceTransform,
  makeMiraiInstanced,
  makeZAxisCncRing,
} from './miraiShared';

/**
 * FH25 Structure #5 — 30,000-nit · 240Hz True-RGB Tandem Micro-OLED / MicroLED Pancake EVF Unit
 * 18 Watchmaker-Grade Explodable 3D CAD Parts (`miraiSubView = 5`, order 69..86).
 *
 * True-Scale Optical Architecture (48.0 x 38.0 x 46.0 mm):
 *   - Eyepiece optical axis along +Z (Ergonomic fluoroelastomer eyecup at +23mm -> Pure-copper
 *     14-fin rear burn-in-prevention heatsink at -23mm).
 *   - Right-side (+X) sculpted architectural cutaway window in the CNC magnesium housing reveals the
 *     entire internal optical train even at 0% Assembled: 8× 940nm gaze-tracking IR LEDs, shimmering
 *     45° dichroic hot mirror reflecting NIR to the orthogonal 240Hz gaze camera (-X), folded pancake
 *     ED + PBS/QWP + concave half-mirror optics, twin SUS diopter guide rails, 384 MLA light-extraction
 *     domes, and the vivid 30,000-nit color-filterless True-RGB Tandem emitter die!
 */
export function buildMiraiFh25Parts(mats: V2MaterialLibrary): CadPart[] {
  const cp: THREE.Plane[] = mats.clippingPlanes;
  const parts: CadPart[] = [];

  // =========================================================================
  // FH25-01: Soft Fluoroelastomer Ergonomic Light-Shield Eyecup & Latch Clips
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sculpted Sony α-style rounded-rectangular eyecup base frame
    const baseFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(42.0, 32.0, 7.2, 26.8, 20.6, 5.2), 3.6, 0.55, 0.55, 2, 24),
      mats.evfEyecupRubber
    );
    baseFrame.position.z = -1.6;
    g.add(baseFrame);

    // Flared ergonomic contoured eye-cushion hood protruding toward photographer (+Z)
    const cushionHood = new THREE.Mesh(
      extrudeHiRes(createFrameShape(44.4, 34.4, 8.8, 29.2, 22.8, 6.2), 4.6, 1.05, 0.95, 2, 28),
      mats.evfEyecupRubber
    );
    cushionHood.position.z = 2.0;
    g.add(cushionHood);

    // Rigid polycarbonate slide-lock mounting rail & dual release latch tabs on rear
    const slideMount = new THREE.Mesh(
      extrudeHiRes(createFrameShape(36.4, 27.6, 3.6, 28.0, 20.4, 2.4), 1.6, 0.14, 0.14, 1, 18),
      mats.welcomeCoreSlate
    );
    slideMount.position.z = -3.8;
    g.add(slideMount);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-ergonomic-eyecup',
        5,
        69,
        '#1f2937',
        g,
        new THREE.Vector3(0, 0, 20.5),
        new THREE.Vector3(0, 0, 58.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH25-02: Hydrophilic Anti-Fog & Multi-AR Protective Eyepiece Cover Glass
  // =========================================================================
  {
    const g = new THREE.Group();
    const glass = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(26.2, 20.2, 3.4), 0.95, 0.12, 0.12, 2, 18),
      mats.opticalCementClear
    );
    glass.userData.noEdges = true;
    g.add(glass);

    // Brushed stainless oval retaining bezel & waterproof EPDM seal ring
    const bezel = new THREE.Mesh(
      extrudeHiRes(createFrameShape(29.8, 23.8, 4.2, 25.0, 19.0, 3.0), 1.25, 0.14, 0.14, 2, 22),
      mats.stainlessMachined
    );
    g.add(bezel);

    const arTrim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(26.4, 20.4, 3.2, 25.2, 19.2, 2.9), 0.20, 0.03, 0.03, 1, 16),
      mats.arItoFilm
    );
    arTrim.position.z = 0.56;
    g.add(arTrim);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-antifog-coverglass',
        5,
        70,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 15.2),
        new THREE.Vector3(0, 0, 48.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // FH25-03: 240Hz Gaze-Tracking 8× 940nm Near-Infrared LED Illumination Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-thin dark annular flex PCB carrier ring surrounding eyepiece aperture
    const fpcRing = makeZAxisCncRing(15.2, 12.2, 0.52, mats.polyimideFpc, {
      bevel: 0.05,
      bevelSegs: 1,
      curveSegs: 36,
    });
    g.add(fpcRing);

    // 8× glowing crimson 940nm gaze-tracking IR emitter LEDs + micro gold reflector cups
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      const cx = Math.cos(a) * 13.7;
      const cy = Math.sin(a) * 13.7;

      const cup = new THREE.Mesh(hiResCyl(1.05, 1.15, 0.48, 12), mats.goldPlating);
      cup.rotation.x = Math.PI / 2;
      cup.position.set(cx, cy, 0.36);
      cup.userData.noEdges = true;
      g.add(cup);

      const led = new THREE.Mesh(hiResSphere(0.74, 10, 8), mats.evfIrEmitter);
      led.scale.set(1, 1, 0.65);
      led.position.set(cx, cy, 0.62);
      led.userData.noEdges = true;
      g.add(led);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-gaze-ir-ring',
        5,
        71,
        '#e11d48',
        g,
        new THREE.Vector3(0, 0, 13.0),
        new THREE.Vector3(0, 0, 40.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH25-04: CORE — 45° Dichroic Gaze-Tracking Hot Mirror (IR Reflect / Visible Pass)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sub-group rotated precisely 45° around Y axis so +Z corneal IR reflection deflects cleanly into -X NIR camera!
    const tilted = new THREE.Group();
    tilted.rotation.y = -Math.PI / 4;

    // Clear visible-passing substrate glass plate (sized cleanly to fit 45° inside Z=+3.4..+13.0 bay!)
    const plateGeo = extrudeHiRes(createRoundedRectShape(12.2, 16.8, 1.0), 0.65, 0.06, 0.06, 1, 14);
    const glassPlate = new THREE.Mesh(plateGeo, mats.opticalCementClear);
    glassPlate.userData.noEdges = true;
    tilted.add(glassPlate);

    // Signature magenta-rose dichroic hot-mirror dielectric coating border rim
    const dichroicRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(13.2, 17.8, 1.2, 11.0, 15.6, 0.9), 0.90, 0.06, 0.06, 1, 16),
      mats.evfDichroicMirror
    );
    tilted.add(dichroicRim);

    // Precision machined titanium optical frame
    const tiFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.8, 19.4, 1.5, 12.8, 17.4, 1.1), 1.25, 0.10, 0.10, 2, 16),
      mats.welcomeTitaniumFace
    );
    tilted.add(tiFrame);
    g.add(tilted);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-dichroic-mirror',
        5,
        72,
        '#ec4899',
        g,
        new THREE.Vector3(0, 0, 8.4),
        new THREE.Vector3(0, 18.0, 30.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH25-05: 240Hz Global-Shutter Gaze-Tracking NIR Micro-Camera Module
  // =========================================================================
  {
    const g = new THREE.Group();
    // Miniature NIR optical lens barrel pointing along +X toward the 45° dichroic mirror
    const barrel = new THREE.Mesh(hiResCyl(4.4, 4.8, 6.2, 24), mats.welcomeCoreSlate);
    barrel.rotation.z = -Math.PI / 2;
    barrel.position.x = 1.6;
    g.add(barrel);

    // Miniature NIR curved focusing lens at front (+X)
    const miniLens = new THREE.Mesh(buildMeniscusLensGeo(6.4, 1.0, 0.9, -0.2, 0, 0, 24), mats.opticalCementClear);
    miniLens.rotation.y = Math.PI / 2;
    miniLens.position.x = 4.6;
    miniLens.userData.noEdges = true;
    g.add(miniLens);

    // Ruby 940nm bandpass filter collar
    const irRing = new THREE.Mesh(hiResCyl(3.8, 3.8, 0.6, 20), mats.evfIrEmitter);
    irRing.rotation.z = -Math.PI / 2;
    irRing.position.x = 4.3;
    g.add(irRing);

    // 240Hz global-shutter NIR silicon sensor die + miniature emerald PCB
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(1.1, 12.0, 12.0, 0.35, 0.08, 'z'),
      mats.sensorPcb
    );
    pcb.position.x = -2.2;
    g.add(pcb);

    const nirDie = new THREE.Mesh(
      createChamferedBoxGeo(0.65, 5.4, 5.4, 0.22, 0.05, 'z'),
      mats.siliconLogicLayer
    );
    nirDie.position.x = -1.45;
    g.add(nirDie);

    // Gold shield cap on back (-X)
    const shieldBack = new THREE.Mesh(
      createChamferedBoxGeo(1.2, 8.6, 8.6, 0.32, 0.08, 'z'),
      mats.emiShieldCan
    );
    shieldBack.position.x = -3.2;
    g.add(shieldBack);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-gaze-nir-sensor',
        5,
        73,
        '#be123c',
        g,
        new THREE.Vector3(-19.5, 0, 8.2),
        new THREE.Vector3(-34.0, 10.0, 22.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH25-06: 1st Eyepiece Element — Large-Aperture ED Low-Dispersion Meniscus Lens
  // =========================================================================
  {
    const g = new THREE.Group();
    const edLens = new THREE.Mesh(
      buildMeniscusLensGeo(26.4, 2.0, 2.25, -0.55, 0.20, 0, 48),
      mats.opticalCementClear
    );
    edLens.userData.noEdges = true;
    g.add(edLens);

    // Signature emerald ED rim highlight + black anodized cell ring
    const edTrim = makeZAxisCncRing(13.8, 13.1, 1.55, mats.evfLensEd, {
      bevel: 0.07,
      bevelSegs: 1,
      curveSegs: 36,
    });
    g.add(edTrim);

    const cell = makeZAxisCncRing(15.6, 13.6, 2.2, mats.welcomeCoreSlate, {
      bevel: 0.12,
      bevelSegs: 2,
      curveSegs: 36,
    });
    g.add(cell);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-ed-eyepiece-lens',
        5,
        74,
        '#10b981',
        g,
        new THREE.Vector3(0, 0, 2.2),
        new THREE.Vector3(0, 0, 18.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // FH25-07: CORE Pancake Optics — Reflective Polarizer (PBS) & Quarter-Wave Plate (QWP)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-thin birefringent PBS + QWP optical film stack (transparent center + iridescent indigo rim)
    const filmDisc = new THREE.Mesh(
      buildMeniscusLensGeo(24.0, 0.55, 0.08, 0.08, 0, 0, 40),
      mats.opticalCementClear
    );
    filmDisc.userData.noEdges = true;
    g.add(filmDisc);

    // Iridescent dichroic optical retardation border band indicating circular polarization folding
    const qwpBand = makeZAxisCncRing(12.6, 11.4, 0.42, mats.lcdDbefIridescent, {
      bevel: 0.04,
      bevelSegs: 1,
      curveSegs: 36,
    });
    qwpBand.position.z = 0.22;
    g.add(qwpBand);

    // Precision golden-brass polarization axis alignment ring (strict 45° fast-axis index lugs)
    const brassRing = makeZAxisCncRing(15.2, 12.2, 0.92, mats.brassPrecision, {
      bevel: 0.08,
      bevelSegs: 1,
      curveSegs: 36,
    });
    g.add(brassRing);

    for (const ang of [Math.PI / 4, -Math.PI * 0.75]) {
      const lug = new THREE.Mesh(createChamferedBoxGeo(2.0, 1.4, 0.92, 0.15, 0.05, 'z'), mats.goldPlating);
      lug.position.set(Math.cos(ang) * 15.6, Math.sin(ang) * 15.6, 0);
      lug.rotation.z = ang;
      g.add(lug);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-pancake-pbs-film',
        5,
        75,
        '#6366f1',
        g,
        new THREE.Vector3(0, 0, -1.6),
        new THREE.Vector3(0, 0, 9.0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // FH25-08: CORE Pancake Optics — Concave Curved Half-Mirror Folded Lens
  // =========================================================================
  {
    const g = new THREE.Group();
    // Strongly curved concave-meniscus half-mirror optic folding the optical path 3×!
    const halfMirror = new THREE.Mesh(
      buildMeniscusLensGeo(25.2, 1.65, -1.35, 1.85, -0.18, 0.24, 48),
      mats.opticalCementClear
    );
    halfMirror.userData.noEdges = true;
    g.add(halfMirror);

    // Semi-reflective titanium-violet edge collar & lightweight carbon-composite carrier ring
    const mirrorCoatRim = makeZAxisCncRing(13.1, 12.4, 1.25, mats.paryleneVioletGlaze, {
      bevel: 0.06,
      bevelSegs: 1,
      curveSegs: 36,
    });
    g.add(mirrorCoatRim);

    const carrier = makeZAxisCncRing(15.2, 13.0, 2.0, mats.carbonFiberBlade, {
      bevel: 0.12,
      bevelSegs: 2,
      curveSegs: 36,
    });
    g.add(carrier);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-pancake-halfmirror',
        5,
        76,
        '#8b5cf6',
        g,
        new THREE.Vector3(0, 0, -5.0),
        new THREE.Vector3(0, 0, 0.0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // FH25-09: −4..+3D Diopter Adjustment Helicoid, Dual SUS Guide Rails & Knurled Dial
  // =========================================================================
  {
    const g = new THREE.Group();
    // Twin polished SUS304 precision optical-axis guide rails (top & bottom)
    for (const sy of [-12.4, 12.4]) {
      const rail = new THREE.Mesh(hiResCyl(1.05, 1.05, 18.6, 16), mats.stainlessMachined);
      rail.rotation.x = Math.PI / 2;
      rail.position.set(11.6, sy, 0.4);
      g.add(rail);

      // Brass sliding helicoid guide sleeve riding on each rail
      const sleeve = new THREE.Mesh(hiResCyl(1.75, 1.75, 4.6, 16), mats.brassPrecision);
      sleeve.rotation.x = Math.PI / 2;
      sleeve.position.set(11.6, sy, 1.2);
      g.add(sleeve);
    }

    // Slim machined connecting tie bar linking the brass sleeves near the front edge of the cutaway
    const yokeBar = new THREE.Mesh(
      createChamferedBoxGeo(1.4, 25.4, 1.8, 0.25, 0.08, 'z'),
      mats.welcomeTitaniumFace
    );
    yokeBar.position.set(13.6, 0, 5.2);
    g.add(yokeBar);

    // External precision knurled diopter adjustment dial wheel positioned upper-front-right (+X, +Y)
    // so the right cutaway window remains 100% unobstructed into the 45° mirror & True-RGB tandem panel!
    const dialGroup = new THREE.Group();
    addKnurledRingToGroup(
      dialGroup,
      4.6,
      1.8,
      2.8,
      32,
      mats.lensBarrelAnodized,
      mats.welcomeTitaniumFace,
      2.1,
      0
    );
    // Brass threaded lead screw shaft driving the upper diopter rail
    const leadScrew = new THREE.Mesh(hiResCyl(1.15, 1.15, 4.8, 14), mats.brassPrecision);
    leadScrew.rotation.x = Math.PI / 2;
    leadScrew.position.z = -2.4;
    dialGroup.add(leadScrew);

    // Emerald center cap on diopter dial
    const dialCap = new THREE.Mesh(hiResCyl(1.85, 1.85, 0.52, 18), mats.mofEmerald);
    dialCap.rotation.x = Math.PI / 2;
    dialCap.position.z = 1.45;
    dialGroup.add(dialCap);

    dialGroup.rotation.y = Math.PI / 2;
    dialGroup.position.set(18.6, 10.6, 5.2);
    g.add(dialGroup);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-diopter-helicoid',
        5,
        77,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, -2.0),
        new THREE.Vector3(34.0, 26.0, 8.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH25-10: 384 Gapless MLA Light-Extraction Microlens Dome Array (+40% Brightness)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Perimeter titanium optical seal frame surrounding the 0.64-type display active window
    const frame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(19.6, 15.0, 0.8, 17.6, 13.0, 0.5), 0.44, 0.04, 0.04, 1, 14),
      mats.quartzEdge
    );
    g.add(frame);

    // 24 x 16 = 384 crystal-clear forward light-extraction MLA domes (1 InstancedMesh!)
    const cols = 24;
    const rows = 16;
    const pitchX = 16.8 / cols;
    const pitchY = 12.2 / rows;
    const domeGeo = hiResSphere(
      Math.min(pitchX, pitchY) * 0.47,
      8,
      6,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.5
    );
    domeGeo.rotateX(Math.PI / 2); // Dome apex pointing toward +Z eyepiece!
    domeGeo.scale(1.0, 1.0, 0.62);
    const domeTransforms: InstanceTransform[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        domeTransforms.push({
          pos: [
            (c - (cols - 1) * 0.5) * pitchX,
            (r - (rows - 1) * 0.5) * pitchY,
            0.05,
          ],
        });
      }
    }
    g.add(makeMiraiInstanced(domeGeo, mats.opticalCementClear, domeTransforms, true));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-mla-extraction-dome',
        5,
        78,
        '#7dd3fc',
        g,
        new THREE.Vector3(0, 0, -9.8),
        new THREE.Vector3(0, 0, -14.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // FH25-11: CORE — 30,000-nit 2-3 Layer True-RGB Tandem Micro-OLED / MicroLED Die
  // =========================================================================
  {
    const g = new THREE.Group();
    // Tandem micro-cavity substrate block
    const sub = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(19.2, 14.6, 0.55), 0.68, 0.06, 0.06, 1, 14),
      mats.siliconBulk
    );
    g.add(sub);

    // High-DPI 1024px Color-Filterless Direct True-RGB Tandem Emitter Face (+Z)
    const activeGeo = extrudeHiRes(createRoundedRectShape(18.4, 13.8, 0.40), 0.14, 0.02, 0.02, 1, 12);
    applyPlanarUVs(activeGeo, 18.4, 13.8, 'xy');
    const activeFace = new THREE.Mesh(activeGeo, mats.fh25TandemOledMap);
    activeFace.position.z = 0.36;
    activeFace.userData.noEdges = true;
    g.add(activeFace);

    // Gold perimeter common-cathode contact guard frame
    const cathodeFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(19.8, 15.2, 0.65, 18.2, 13.6, 0.4), 0.24, 0.03, 0.03, 1, 14),
      mats.goldPlating
    );
    cathodeFrame.position.z = 0.22;
    g.add(cathodeFrame);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-true-rgb-tandem',
        5,
        79,
        '#10b981',
        g,
        new THREE.Vector3(0, 0, -11.4),
        new THREE.Vector3(0, 0, -24.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH25-12: 12-inch Wafer 30M-Dot · 240Hz BFI Si-CMOS Active-Matrix Backplane
  // =========================================================================
  {
    const g = new THREE.Group();
    const waferBase = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(21.6, 16.8, 0.55), 0.72, 0.07, 0.07, 2, 14),
      mats.siliconLogicLayer
    );
    g.add(waferBase);

    // 1024px Si-CMOS 240Hz column DAC + BFI backplane floorplan (+Z face)
    const cmosGeo = extrudeHiRes(createRoundedRectShape(21.0, 16.2, 0.45), 0.12, 0.02, 0.02, 1, 12);
    applyPlanarUVs(cmosGeo, 21.0, 16.2, 'xy');
    const cmosFace = new THREE.Mesh(cmosGeo, mats.fh25EvfReticleMap);
    cmosFace.position.z = 0.38;
    cmosFace.userData.noEdges = true;
    g.add(cmosFace);

    // Copper-gold perimeter power/clock ring
    const cuBus = new THREE.Mesh(
      extrudeHiRes(createFrameShape(22.0, 17.2, 0.6, 20.6, 15.8, 0.4), 0.22, 0.02, 0.02, 1, 12),
      mats.copperHybridBond
    );
    cuBus.position.z = -0.32;
    g.add(cuBus);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-cmos-backplane',
        5,
        80,
        '#2563eb',
        g,
        new THREE.Vector3(0, 0, -12.6),
        new THREE.Vector3(0, 0, -34.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH25-13: High-Rigidity Alumina Ceramic Alignment Carrier & 3-Point Tilt Shims
  // =========================================================================
  {
    const g = new THREE.Group();
    const carrier = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(26.4, 21.2, 1.4), 1.15, 0.10, 0.10, 2, 16),
      mats.aluminaCeramic
    );
    g.add(carrier);

    // Gold wirebond shelf border on front (+Z)
    const goldShelf = new THREE.Mesh(
      extrudeHiRes(createFrameShape(24.8, 19.6, 1.0, 21.6, 16.6, 0.7), 0.18, 0.02, 0.02, 1, 14),
      mats.goldPlating
    );
    goldShelf.position.z = 0.60;
    g.add(goldShelf);

    // 3 precision laser-etched brass optical tilt calibration shims (120° triad)
    for (const [sx, sy] of [
      [-11.4, 8.8],
      [11.4, 8.8],
      [0, -9.2],
    ]) {
      const shim = new THREE.Mesh(hiResCyl(2.2, 2.2, 0.42, 16), mats.brassPrecision);
      shim.rotation.x = Math.PI / 2;
      shim.position.set(sx, sy, -0.72);
      g.add(shim);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-ceramic-alignment',
        5,
        81,
        '#e2e8f0',
        g,
        new THREE.Vector3(0, 0, -14.2),
        new THREE.Vector3(0, 0, -44.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH25-14: 240Hz Ultra-Low-Latency T-CON & BFI Driver PCB + EMI Shield Can
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(30.4, 24.4, 1.6), 0.95, 0.08, 0.08, 1, 16),
      mats.hdiMainboardPcb
    );
    g.add(pcb);

    // Brushed metallic EMI shield can over 4-lane high-speed MIPI-DSI & BFI timing controller ASIC
    const emiCan = new THREE.Mesh(
      createChamferedBoxGeo(14.8, 11.4, 1.5, 0.65, 0.12, 'z'),
      mats.emiShieldCan
    );
    emiCan.position.set(-2.4, 1.2, -0.95);
    g.add(emiCan);

    // Companion PMIC / Mura-correction SRAM QFN package
    const muraIc = buildChipPackage({
      w: 5.2,
      d: 5.2,
      h: 0.9,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    muraIc.rotation.x = -Math.PI / 2;
    muraIc.position.set(9.4, 1.8, -0.88);
    g.add(muraIc);

    // 20 SMD MLCC capacitors arrayed along top/bottom PCB perimeter (1 InstancedMesh!)
    const capGeo = markHiRes(new THREE.BoxGeometry(1.2, 0.62, 0.56));
    const capTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 10; i++) {
      const x = -11.5 + (23.0 * i) / 9;
      capTransforms.push({ pos: [x, 10.2, -0.76] });
      capTransforms.push({ pos: [x, -10.2, -0.76] });
    }
    g.add(makeMiraiInstanced(capGeo, mats.smdCeramic, capTransforms, true));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-tcon-driver-pcb',
        5,
        82,
        '#059669',
        g,
        new THREE.Vector3(0, 0, -16.2),
        new THREE.Vector3(0, 0, -54.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH25-15: 240Hz Shielded MIPI-DSI High-Speed S-Curve FPC Cable
  // =========================================================================
  {
    const g = new THREE.Group();
    // S-curve polyimide flex exiting downward (-Y) from T-CON PCB into camera mainboard bay
    const pts: ReadonlyArray<readonly [number, number]> = [
      [0, 5.5],
      [0.4, 1.8],
      [-1.8, -1.6],
      [-1.8, -5.8],
      [1.2, -8.2],
    ];
    const ribbonGeo = buildCurvedFpcRibbon(pts, 0.28, 15.6);
    ribbonGeo.rotateY(Math.PI / 2);
    g.add(new THREE.Mesh(ribbonGeo, mats.polyimideFpc));

    // Offset conductive silver-mesh EMI shield backing
    const emiPts: ReadonlyArray<readonly [number, number]> = [
      [-0.22, 4.4],
      [0.18, 1.8],
      [-2.02, -1.6],
      [-2.02, -5.6],
      [0.35, -7.6],
    ];
    const emiGeo = buildCurvedFpcRibbon(emiPts, 0.08, 14.2);
    emiGeo.rotateY(Math.PI / 2);
    const emiMesh = new THREE.Mesh(emiGeo, mats.emiShieldFilm);
    emiMesh.userData.noEdges = true;
    g.add(emiMesh);

    // 24-pin ivory & gold high-speed ZIF board connector at bottom end
    const zif = new THREE.Mesh(
      createChamferedBoxGeo(16.8, 1.45, 3.8, 0.25, 0.08, 'y'),
      mats.zifIvoryPlastic
    );
    zif.position.set(0, -8.4, -1.2);
    g.add(zif);

    const contacts = new THREE.Mesh(
      createChamferedBoxGeo(14.8, 0.22, 1.2, 0.08, 0.03, 'y'),
      mats.goldPlating
    );
    contacts.position.set(0, -7.62, -1.6);
    g.add(contacts);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-mipi-fpc-tail',
        5,
        83,
        '#d97706',
        g,
        new THREE.Vector3(0, -16.5, -16.2),
        new THREE.Vector3(0, -30.0, -54.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH25-16: 30,000-nit High-Brightness Pure Copper Spreader & 14-Fin Heatsink
  // =========================================================================
  {
    const g = new THREE.Group();
    // Coral-pink silicone TIM thermal pad interfacing T-CON & CMOS backplane heat into pure copper
    const timPad = new THREE.Mesh(
      createChamferedBoxGeo(26.0, 20.6, 0.72, 1.2, 0.10, 'z'),
      mats.thermalPadPink
    );
    timPad.position.z = 1.65;
    g.add(timPad);

    // Solid pure-copper (C1100) rear baseplate thermal spreader
    const spreader = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(32.0, 25.4, 2.0), 1.35, 0.14, 0.14, 2, 18),
      mats.copperHeatSpreader
    );
    spreader.position.z = 0.55;
    g.add(spreader);

    // 14 vertical precision-skived pure copper radiator cooling fins pointing rearward (-Z) (1 InstancedMesh!)
    const finGeo = markHiRes(new THREE.BoxGeometry(0.68, 22.8, 3.6));
    const finTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 14; i++) {
      const t = i / 13 - 0.5;
      finTransforms.push({
        pos: [t * 28.4, 0, -1.85],
      });
    }
    g.add(makeMiraiInstanced(finGeo, mats.vaporChamberCopper, finTransforms, true));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-copper-heatsink',
        5,
        84,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, -19.8),
        new THREE.Vector3(0, 0, -65.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH25-17: Weather-Sealed CNC Magnesium Optical Housing (Right-Side Cutaway Window!)
  // =========================================================================
  {
    const g = new THREE.Group();
    // U-shaped sculpted CNC magnesium optical tunnel (open on +X right side so the 45° dichroic mirror,
    // pancake PBS/QWP, half-mirror, & 30,000-nit True-RGB tandem panel are gloriously visible at 0% Assembled!)
    // Top roof wall (+Y)
    const topWall = new THREE.Mesh(
      createChamferedBoxGeo(35.0, 2.8, 29.6, 1.2, 0.22, 'y'),
      mats.welcomeCoreSlate
    );
    topWall.position.set(-0.5, 14.8, 0);
    g.add(topWall);

    // Bottom floor wall (-Y)
    const botWall = new THREE.Mesh(
      createChamferedBoxGeo(35.0, 2.6, 29.6, 1.2, 0.22, 'y'),
      mats.welcomeCoreSlate
    );
    botWall.position.set(-0.5, -14.6, 0);
    g.add(botWall);

    // Left wall (-X) with circular optical port aperture for the 240Hz NIR Gaze Camera!
    const leftWallShape = createRoundedRectShape(29.6, 28.0, 1.6);
    const gazePort = new THREE.Path();
    // rotateY(+PI/2) maps 2D x -> -z, so x = -6.7 places the port at local z = +6.7 (world z = +8.2)!
    gazePort.absarc(-6.7, 0, 5.2, 0, Math.PI * 2, true);
    leftWallShape.holes.push(gazePort);
    const leftWallGeo = extrudeHiRes(leftWallShape, 2.4, 0.16, 0.16, 2, 20);
    leftWallGeo.rotateY(Math.PI / 2);
    applyBoxUVs(leftWallGeo, 14.0);
    const leftWall = new THREE.Mesh(leftWallGeo, mats.evfHousingMg);
    leftWall.position.set(-16.8, 0, 0);
    g.add(leftWall);

    // Front (+Z) precision eyepiece bulkhead frame (keeps structural rigidity while +X cutaway stays open)
    const frontBulkhead = new THREE.Mesh(
      extrudeHiRes(createFrameShape(36.0, 31.6, 2.8, 26.8, 21.0, 3.2), 2.2, 0.18, 0.18, 2, 22),
      mats.welcomeCoreSlate
    );
    frontBulkhead.position.z = 13.7;
    g.add(frontBulkhead);

    // Rear (-Z) optical chassis back collar
    const rearCollar = new THREE.Mesh(
      extrudeHiRes(createFrameShape(35.6, 30.8, 2.4, 27.6, 22.0, 1.8), 2.0, 0.16, 0.16, 2, 20),
      mats.welcomeCoreMid
    );
    rearCollar.position.z = -14.0;
    g.add(rearCollar);

    // Crisp machined titanium cutaway-frame trim ribs along the +X window top & bottom edges
    for (const sy of [13.5, -13.4]) {
      const trim = new THREE.Mesh(
        createChamferedBoxGeo(1.0, 0.75, 25.8, 0.15, 0.05, 'z'),
        mats.welcomeTitaniumFace
      );
      trim.position.set(16.6, sy, 0);
      g.add(trim);
    }

    // Top MIRAI 2028 emerald & titanium badge bar
    const badge = new THREE.Mesh(
      createChamferedBoxGeo(18.0, 0.28, 3.2, 0.4, 0.06, 'y'),
      mats.mofEmerald
    );
    badge.position.set(0, 16.25, 4.0);
    g.add(badge);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-mg-optical-housing',
        5,
        85,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 1.5),
        new THREE.Vector3(0, 44.0, 0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // FH25-18: Camera Pentaprism-Bay 3-Point Mounting Bracket & 6× M1.4 Torx Bolts
  // =========================================================================
  {
    const g = new THREE.Group();
    const plateShape = createFrameShape(42.0, 32.0, 2.8, 26.0, 18.0, 1.8);
    const plateGeo = extrudeHiRes(plateShape, 1.45, 0.14, 0.14, 2, 18);
    plateGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(plateGeo, 12.0);
    g.add(new THREE.Mesh(plateGeo, mats.magnesiumCast));

    // 3 precision ground optical-axis titanium datum mounting pads
    for (const [dx, dz] of [
      [-18.0, 12.0],
      [18.0, 12.0],
      [0, -13.0],
    ]) {
      const pad = new THREE.Mesh(hiResCyl(2.4, 2.6, 0.55, 16), mats.welcomeTitaniumFace);
      pad.position.set(dx, -0.92, dz);
      g.add(pad);
    }

    // 6× M1.4 stainless precision Torx bolts & titanium seal washers
    addTorxBolts(
      g,
      [
        [-18.0, 0.9, 12.0],
        [18.0, 0.9, 12.0],
        [-18.0, 0.9, -12.0],
        [18.0, 0.9, -12.0],
        [-18.0, 0.9, 0],
        [18.0, 0.9, 0],
      ],
      mats,
      1.15,
      2.6
    );

    parts.push(
      finalizeMiraiPart(
        'mirai-fh25-mount-bolts-bracket',
        5,
        86,
        '#94a3b8',
        g,
        new THREE.Vector3(0, -15.6, 0.5),
        new THREE.Vector3(0, -24.0, 0),
        cp,
        0.26
      )
    );
  }

  return parts;
}
