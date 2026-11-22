import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createHelicalSpringGeometry,
  createOpticalLensGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  createSpurGearGeometry,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { EVF_EXPLANATIONS } from './evfExplanations';

/** Shared EVF optical axis vertical elevation (sits cleanly atop Shutter/Sensor/Mainboard) */
export const EVF_OPTICAL_Y = 39.5;

export interface EvfDynamicRig {
  edLensPart: CadPart;
  diopterDialGroup: THREE.Group;
  leadScrewGroup: THREE.Group;
  irLedMeshes: THREE.Mesh[];
  oledScreenMesh: THREE.Mesh;
  applyDynamics: (elapsed: number, physicsActive: boolean, explodeFactor: number, integrated: boolean) => void;
}

function finalizeEvfPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  integratedExplodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.24
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, edgeOpacity);

  return {
    id,
    subsystem: 'evf',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: EVF_EXPLANATIONS[id],
  };
}

/**
 * Helper to create a precision stepped anodized lens retainer ring around an optical element.
 */
function createLensRetainerCell(
  innerR: number,
  outerR: number,
  depth: number,
  mat: THREE.Material
): THREE.Mesh {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const geo = extrudeCentered(shape, depth, 0.14, 0.14, 40);
  return new THREE.Mesh(geo, mat);
}

/**
 * Build all 18 ultra-detailed CAD sub-assemblies of a 2024-2026 Flagship Mirrorless
 * Electronic Viewfinder (EVF) + Eye-Control AF optical & precision mechanical module
 * positioned directly on top of the Shutter/Sensor/Mainboard optical core
 * (optical axis x = 0, y = 39.5 mm).
 *
 * +Z = camera front (OLED thermal sink & TCON), -Z = camera rear (photographer's eye).
 */
export function buildEvfParts(mats: MaterialLibrary): { parts: CadPart[]; rig: EvfDynamicRig } {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const irLedMeshes: THREE.Mesh[] = [];
  const helicoidSleeveGroup = new THREE.Group();

  // =========================================================================
  // E01: Ergonomic Deep Anti-Glare Silicone Eyecup & Quick-Release Bayonet
  // =========================================================================
  const eyecupGroup = new THREE.Group();
  {
    // Base bayonet mounting plate (mating against rear camera housing)
    const baseShape = createFrameShape(31.0, 24.4, 5.2, 22.8, 17.6, 3.6);
    const baseMesh = new THREE.Mesh(
      extrudeCentered(baseShape, 2.2, 0.25, 0.2, 28),
      mats.matteBlackAnodized
    );
    baseMesh.position.z = 2.0;
    eyecupGroup.add(baseMesh);

    // Quick-release bayonet slide rails (left & right vertical locking guides)
    for (const sx of [-1, 1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(1.6, 15.0, 1.4), mats.stainlessMachined);
      rail.position.set(sx * 14.4, 0, 2.8);
      eyecupGroup.add(rail);

      const lockTab = new THREE.Mesh(new THREE.BoxGeometry(2.0, 3.2, 1.2), mats.matteBlackAnodized);
      lockTab.position.set(sx * 15.6, -4.5, 2.0);
      eyecupGroup.add(lockTab);
    }

    // Soft sculpted ergonomic silicone shade shroud (flaring rearward toward photographer's eye)
    const midShade = createFrameShape(33.4, 26.8, 7.2, 24.4, 18.8, 4.6);
    const midMesh = new THREE.Mesh(
      extrudeCentered(midShade, 3.6, 0.4, 0.4, 32),
      mats.evfEyecupRubber
    );
    midMesh.position.z = -0.8;
    eyecupGroup.add(midMesh);

    // Deep rear cushioned eye-brow flange (ergonomic brow & temple wrap)
    const lipShade = createFrameShape(36.2, 29.4, 9.2, 25.4, 19.6, 5.4);
    const lipMesh = new THREE.Mesh(
      extrudeCentered(lipShade, 3.2, 0.85, 0.85, 32),
      mats.evfEyecupRubber
    );
    lipMesh.position.z = -3.8;
    eyecupGroup.add(lipMesh);

    // Upper anti-glare sun brow visor extension
    const browShape = createRoundedRectShape(26.0, 4.6, 2.0);
    const brow = new THREE.Mesh(
      extrudeCentered(browShape, 2.4, 0.45, 0.45, 20),
      mats.evfEyecupRubber
    );
    brow.position.set(0, 13.4, -5.0);
    brow.rotation.x = 0.22;
    eyecupGroup.add(brow);
  }
  parts.push(
    finalizeEvfPart(
      'evf-eyecup',
      1,
      '#2c313a',
      eyecupGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -37.2),
      new THREE.Vector3(0, 0, -56),
      new THREE.Vector3(0, 34, -36),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E02: Quick-Release Stainless Eyecup Slide-Lock Rails & Spring Latches
  // =========================================================================
  const eyecupLatchGroup = new THREE.Group();
  {
    // Thin stainless steel bayonet carrier frame nested flush against EVF rear collar
    const carrierShape = createFrameShape(29.8, 23.4, 4.6, 24.4, 18.6, 3.4);
    const carrier = new THREE.Mesh(
      extrudeCentered(carrierShape, 1.1, 0.08, 0.08, 24),
      mats.mountStainlessFlange
    );
    eyecupLatchGroup.add(carrier);

    // Left & right dovetail slide rails + spring-loaded detent latch claws + return coil springs
    for (const sx of [-1, 1]) {
      const dovetail = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 16.2, 1.5),
        mats.stainlessMachined
      );
      dovetail.position.set(sx * 13.4, 0.4, -0.35);
      eyecupLatchGroup.add(dovetail);

      // Pivoting stainless spring-lock catch tooth
      const claw = new THREE.Mesh(new THREE.BoxGeometry(2.4, 4.2, 1.2), mats.mountSpringSteel);
      claw.position.set(sx * 14.8, -4.4, -0.4);
      eyecupLatchGroup.add(claw);

      // Miniature helical preload compression spring biasing the lock claw outward
      const spring = new THREE.Mesh(
        createHelicalSpringGeometry(0.65, 3.2, 6, 0.14).rotateY(Math.PI / 2),
        mats.brassGear
      );
      spring.position.set(sx * 13.1, -4.4, 0.35);
      spring.userData.noEdges = true;
      eyecupLatchGroup.add(spring);

      // Top & bottom micro M1.2 mounting screws anchoring latch frame to EVF magnesium collar
      for (const sy of [-8.8, 8.8]) {
        const scr = createPrecisionScrew(0.55, 0.28, 1.0, mats.stainlessMachined);
        scr.position.set(sx * 11.4, sy, -0.55);
        eyecupLatchGroup.add(scr);
      }
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-eyecup-latch',
      2,
      '#94a3b8',
      eyecupLatchGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -34.6),
      new THREE.Vector3(-6, -24, -48),
      new THREE.Vector3(-26, 22, -32),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E02: Anti-Fog Airtight Double-Pane Fluorine-Coated Eyepiece Glass Window
  // =========================================================================
  const antifogGroup = new THREE.Group();
  {
    // Precision machined outer bezel frame
    const bezelShape = createFrameShape(28.2, 22.4, 4.2, 22.8, 17.4, 3.2);
    const bezel = new THREE.Mesh(
      extrudeCentered(bezelShape, 3.4, 0.2, 0.2, 28),
      mats.matteBlackAnodized
    );
    antifogGroup.add(bezel);

    // EPDM Airtight Sealing O-Ring perimeter gasket (prevents moist air ingress!)
    const sealShape = createFrameShape(29.0, 23.2, 4.6, 27.6, 21.8, 3.9);
    const seal = new THREE.Mesh(
      extrudeCentered(sealShape, 1.0, 0.12, 0.12, 28),
      mats.epdmGasket
    );
    seal.position.z = 0.6;
    antifogGroup.add(seal);

    // Inner metallic thermal air-gap spacer ring (creates the 1.6 mm dry-air insulating chamber)
    const spacerShape = createFrameShape(24.0, 18.6, 3.4, 22.4, 17.0, 3.0);
    const spacer = new THREE.Mesh(
      extrudeCentered(spacerShape, 1.4, 0.06, 0.06, 24),
      mats.stainlessMachined
    );
    antifogGroup.add(spacer);

    // Outer Fluorine-Coated Protective Glass Pane (-Z side facing eye)
    const outerGlassGeo = extrudeCentered(createRoundedRectShape(23.2, 17.8, 3.0), 0.75, 0.04, 0.04, 24);
    const outerGlass = new THREE.Mesh(outerGlassGeo, mats.evfAntiFogGlass);
    outerGlass.position.z = -1.15;
    outerGlass.userData.edgeOpacity = 0.36;
    antifogGroup.add(outerGlass);

    // Inner Sealed Anti-Fog Glass Pane (+Z side facing EVF optics)
    const innerGlass = new THREE.Mesh(outerGlassGeo.clone(), mats.evfAntiFogGlass);
    innerGlass.position.z = 1.15;
    innerGlass.userData.edgeOpacity = 0.36;
    antifogGroup.add(innerGlass);

    // Crisp ground-glass edge highlight strips along the sealed panes
    const rimShape = createFrameShape(23.4, 18.0, 3.1, 22.6, 17.2, 2.9);
    const rimFront = new THREE.Mesh(extrudeCentered(rimShape, 0.7, 0, 0, 24), mats.evfGlassEdgeRim);
    rimFront.position.z = -1.15;
    const rimBack = new THREE.Mesh(extrudeCentered(rimShape, 0.7, 0, 0, 24), mats.evfGlassEdgeRim);
    rimBack.position.z = 1.15;
    antifogGroup.add(rimFront, rimBack);
  }
  parts.push(
    finalizeEvfPart(
      'evf-antifog-window',
      3,
      '#38bdf8',
      antifogGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -32.2),
      new THREE.Vector3(0, 0, -44),
      new THREE.Vector3(0, 34, -26),
      cp,
      0.26
    )
  );

  // =========================================================================
  // E03: ToF IR Proximity Eye Sensor & Ambient EVF Brightness Sensor
  // =========================================================================
  const eyeSensorGroup = new THREE.Group();
  {
    // Compact dark sensor shroud directly under the rear eyepiece window
    const housing = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(15.2, 5.2, 1.4), 2.4, 0.14, 0.14, 16),
      mats.matteBlackAnodized
    );
    eyeSensorGroup.add(housing);

    // Emerald rigid sensor carrier PCB behind shroud
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(16.4, 4.4, 0.8), mats.sensorPcb);
    pcb.position.z = 1.4;
    eyeSensorGroup.add(pcb);

    // Twin optical windows facing -Z: 940nm VCSEL IR emitter (left) + SPAD ToF receiver (right)
    for (const sx of [-3.4, 0.6]) {
      const bezel = new THREE.Mesh(
        new THREE.CylinderGeometry(1.55, 1.55, 0.8, 20).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      bezel.position.set(sx, 0, -1.05);
      eyeSensorGroup.add(bezel);

      const lens = new THREE.Mesh(
        new THREE.SphereGeometry(1.15, 18, 12),
        sx < 0 ? mats.irLedLens : mats.siliconSensorDie
      );
      lens.scale.set(1, 1, 0.45);
      lens.position.set(sx, 0, -1.25);
      lens.userData.noEdges = true;
      eyeSensorGroup.add(lens);
    }

    // Miniature Ambient Brightness Photodiode (rightmost square window)
    const ambFrame = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 0.7), mats.silverElectrode);
    ambFrame.position.set(4.8, 0, -1.08);
    const ambDie = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 0.4), mats.evfLensAspheric);
    ambDie.position.set(4.8, 0, -1.32);
    eyeSensorGroup.add(ambFrame, ambDie);

    // Amber Kapton FPC tail routing up/forward toward EVF TCON
    const fpc = new THREE.Mesh(new THREE.BoxGeometry(4.2, 5.4, 0.22), mats.polyimideFpc);
    fpc.position.set(0, 4.2, 1.7);
    eyeSensorGroup.add(fpc);

    // Two micro M1.2 mounting screws
    for (const sx of [-6.8, 6.8]) {
      const scr = createPrecisionScrew(0.62, 0.35, 1.2, mats.stainlessMachined);
      scr.position.set(sx, 0, 1.8);
      eyeSensorGroup.add(scr);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-eye-sensor',
      4,
      '#0ea5e9',
      eyeSensorGroup,
      new THREE.Vector3(0, 28.4, -30.6),
      new THREE.Vector3(0, -15, -34),
      new THREE.Vector3(0, 22, -22),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E04: Eye-Control AF 850nm Infrared Illumination Ring LED Array (×8)
  // =========================================================================
  const irLedsGroup = new THREE.Group();
  {
    // Precision black/emerald annular rigid-flex LED carrier ring surrounding optical aperture
    const ringShape = createFrameShape(27.8, 22.8, 7.6, 21.6, 16.8, 5.4);
    const ringBoard = new THREE.Mesh(
      extrudeCentered(ringShape, 1.1, 0.08, 0.08, 32),
      mats.hdiMainboardPcb
    );
    irLedsGroup.add(ringBoard);

    // Gold power distribution ring trace around the LED perimeter
    const goldTraceShape = createFrameShape(26.4, 21.4, 7.0, 25.4, 20.4, 6.6);
    const goldTrace = new THREE.Mesh(
      extrudeCentered(goldTraceShape, 0.14, 0, 0, 32),
      mats.goldPlating
    );
    goldTrace.position.z = -0.58;
    irLedsGroup.add(goldTrace);

    // 8 High-Efficiency 850nm Ruby-Red GaAlAs IR LED Emitters arrayed around the eye-box!
    const ledPositions: Array<[number, number]> = [
      [-10.8, 6.8],
      [-4.2, 9.8],
      [4.2, 9.8],
      [10.8, 6.8],
      [10.8, -6.8],
      [4.2, -9.8],
      [-4.2, -9.8],
      [-10.8, -6.8],
    ];

    for (const [lx, ly] of ledPositions) {
      // Ceramic SMD LED package + gold reflector cup
      const pkg = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.9, 0.8), mats.ceramicAlumina);
      pkg.position.set(lx, ly, -0.78);
      irLedsGroup.add(pkg);

      const cup = new THREE.Mesh(
        new THREE.CylinderGeometry(0.82, 0.92, 0.35, 16).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      cup.position.set(lx, ly, -1.16);
      irLedsGroup.add(cup);

      // Ruby optical dome emitter (pulsed during physics simulation!)
      const dome = new THREE.Mesh(
        new THREE.SphereGeometry(0.76, 16, 12),
        mats.evfIrEmitter.clone()
      );
      dome.scale.set(1, 1, 0.72);
      dome.position.set(lx, ly, -1.32);
      dome.userData.noEdges = true;
      irLedsGroup.add(dome);
      irLedMeshes.push(dome);
    }

    // Side polyimide driver flex tail connecting down to Eye-Control camera board
    const flexTail = new THREE.Mesh(new THREE.BoxGeometry(3.4, 9.5, 0.22), mats.polyimideFpc);
    flexTail.position.set(12.2, -8.8, 0.45);
    irLedsGroup.add(flexTail);
  }
  parts.push(
    finalizeEvfPart(
      'evf-ir-leds',
      5,
      '#e11d48',
      irLedsGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -28.0),
      new THREE.Vector3(0, 0, -30),
      new THREE.Vector3(0, 34, -16),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E05: 45° Dichroic Hot-Mirror Optical Beam Splitter
  // =========================================================================
  const dichroicGroup = new THREE.Group();
  {
    // Tilted holder sub-assembly at EXACTLY -45° around X so eye IR (+Z) reflects straight DOWN (-Y)!
    const mirrorTilt = new THREE.Group();
    mirrorTilt.rotation.x = -Math.PI / 4;

    // Precision machined anodized aluminum 45° mirror bezel (open aperture 19.6 x 21.8 mm)
    const frameShape = createFrameShape(23.4, 25.4, 1.8, 19.6, 21.6, 1.2);
    const frame = new THREE.Mesh(
      extrudeCentered(frameShape, 1.5, 0.14, 0.14, 16),
      mats.matteBlackAnodized
    );
    mirrorTilt.add(frame);

    // 4 precision spring retention clips holding the thin optical mirror glass stress-free
    for (const [cx, cy] of [
      [-10.8, 7.5],
      [10.8, 7.5],
      [-10.8, -7.5],
      [10.8, -7.5],
    ]) {
      const clip = new THREE.Mesh(new THREE.BoxGeometry(1.8, 3.0, 0.35), mats.brassGear);
      clip.position.set(cx, cy, -0.82);
      mirrorTilt.add(clip);
    }

    // Ultra-thin multi-layer dielectric Dichroic Hot Mirror glass plate (magenta-gold sheen!)
    const plate = new THREE.Mesh(new THREE.BoxGeometry(20.4, 22.4, 0.72), mats.evfDichroicMirror);
    plate.userData.edgeOpacity = 0.48;
    mirrorTilt.add(plate);

    // Polished dielectric edge rim
    const edgeRim = new THREE.Mesh(
      extrudeCentered(createFrameShape(20.6, 22.6, 0.8, 19.8, 21.8, 0.6), 0.76, 0, 0, 12),
      mats.evfGlassEdgeRim
    );
    mirrorTilt.add(edgeRim);

    dichroicGroup.add(mirrorTilt);

    // Left & right precision alignment pivot trunnions locking the 45.0° angle inside barrel
    for (const sx of [-1, 1]) {
      const trunnion = new THREE.Mesh(
        new THREE.CylinderGeometry(1.1, 1.1, 2.2, 16).rotateZ(Math.PI / 2),
        mats.stainlessMachined
      );
      trunnion.position.set(sx * 12.6, 0, 0);
      dichroicGroup.add(trunnion);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-dichroic-mirror',
      6,
      '#db2777',
      dichroicGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -22.2),
      new THREE.Vector3(0, 0, -16),
      new THREE.Vector3(0, 34, -6),
      cp,
      0.28
    )
  );

  // =========================================================================
  // E06: Eye-Control AF 307K-Pixel NIR Gaze Camera & Aspheric IR Relay Lens
  //      (Mounted straight below E05 inside Mainboard top-center EVF notch!)
  // =========================================================================
  const gazeCamGroup = new THREE.Group();
  {
    // Emerald mini HDI camera carrier PCB facing +Y (looking straight UP into 45° Dichroic Mirror!)
    const camPcb = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.6, 12.8, 1.6), 1.0, 0.08, 0.08, 16).rotateX(
        Math.PI / 2
      ),
      mats.hdiMainboardPcb
    );
    camPcb.position.y = -2.2;
    gazeCamGroup.add(camPcb);

    // Ceramic NIR CMOS package + gleaming 307K-pixel silicon sensor die looking +Y
    const pkg = new THREE.Mesh(new THREE.BoxGeometry(9.6, 1.0, 8.2), mats.ceramicAlumina);
    pkg.position.y = -1.2;
    gazeCamGroup.add(pkg);

    const nirDie = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.35, 5.0), mats.siliconSensorDie);
    nirDie.position.y = -0.6;
    gazeCamGroup.add(nirDie);

    // Gold perimeter bond pad ring around NIR die
    const padRing = new THREE.Mesh(
      extrudeCentered(createFrameShape(8.0, 6.6, 0.4, 6.8, 5.4, 0.2), 0.16, 0, 0, 8).rotateX(
        Math.PI / 2
      ),
      mats.goldPlating
    );
    padRing.position.y = -0.62;
    gazeCamGroup.add(padRing);

    // Matte-black precision stepped IR imaging lens barrel extending upward (+Y)
    const barrelOuter = new THREE.Mesh(
      new THREE.CylinderGeometry(5.2, 5.6, 3.8, 32),
      mats.matteBlackAnodized
    );
    barrelOuter.position.y = 1.1;
    gazeCamGroup.add(barrelOuter);

    // Cutaway-top anodized lens bezel ring
    const bezel = new THREE.Mesh(
      new THREE.TorusGeometry(4.4, 0.55, 12, 32).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    bezel.position.y = 3.05;
    gazeCamGroup.add(bezel);

    // 850nm Ruby Narrow-Bandpass Filter disc inside barrel
    const bpf = new THREE.Mesh(
      new THREE.CylinderGeometry(4.1, 4.1, 0.45, 28),
      mats.evfDichroicMirror
    );
    bpf.position.y = 1.65;
    gazeCamGroup.add(bpf);

    // Top Aspheric IR Relay Lens dome capturing the 90°-reflected eyeball image!
    const relayLens = new THREE.Mesh(
      createOpticalLensGeometry(4.2, 0.9, 1.15, 0.45, -0.2, 0, 14, 32).rotateX(-Math.PI / 2),
      mats.evfLensAspheric
    );
    relayLens.position.y = 2.95;
    gazeCamGroup.add(relayLens);

    // Micro B2B gold connector & shielded orange FPC tail feeding AI Accelerator on Mainboard
    const b2b = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.9, 2.2), mats.zifIvoryPlastic);
    b2b.position.set(0, -3.0, -3.8);
    const fpc = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.24, 5.2), mats.polyimideFpc);
    fpc.position.set(0, -3.1, -6.4);
    gazeCamGroup.add(b2b, fpc);

    // Corner mounting screws
    for (const [sx, sz] of [
      [-6.8, -4.8],
      [6.8, -4.8],
      [-6.8, 4.8],
      [6.8, 4.8],
    ]) {
      const scr = createPrecisionScrew(0.55, 0.3, 1.0, mats.stainlessMachined);
      scr.rotation.x = -Math.PI / 2;
      scr.position.set(sx, -1.65, sz);
      gazeCamGroup.add(scr);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-gaze-camera',
      7,
      '#9333ea',
      gazeCamGroup,
      new THREE.Vector3(0, 25.4, -22.2),
      new THREE.Vector3(0, -18, -16),
      new THREE.Vector3(0, 12, -6),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E07: Rear Large-Aperture Double-Sided Aspheric Eyepiece Lens (G4)
  // =========================================================================
  const lensRearGroup = new THREE.Group();
  {
    // Precision curved double-convex glass-molded (GMo) aspheric eyepiece lens (φ22.8 mm)
    const glassGeo = createOpticalLensGeometry(11.4, 2.0, 2.55, 2.15, -0.62, 0.42, 22, 48);
    const glass = new THREE.Mesh(glassGeo, mats.evfLensAspheric);
    glass.userData.edgeOpacity = 0.34;
    lensRearGroup.add(glass);

    // Frosted ground-glass outer edge rim for crisp optical definition on #FFFFFF
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(11.4, 0.34, 12, 48),
      mats.evfGlassEdgeRim
    );
    rim.userData.noEdges = true;
    lensRearGroup.add(rim);

    // Stepped matte-black anodized aluminum lens mounting cell + brass retaining ring
    const cell = createLensRetainerCell(11.2, 13.0, 3.8, mats.matteBlackAnodized);
    lensRearGroup.add(cell);

    const retainRing = createLensRetainerCell(10.8, 12.1, 0.7, mats.brassGear);
    retainRing.position.z = -1.95;
    lensRearGroup.add(retainRing);

    // 4 spanner-wrench assembly notches on retaining ring
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      const notch = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.65, 0.45), mats.matteBlackAnodized);
      notch.position.set(Math.cos(a) * 11.45, Math.sin(a) * 11.45, -2.28);
      notch.rotation.z = a;
      lensRearGroup.add(notch);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-lens-rear',
      8,
      '#0284c7',
      lensRearGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -15.4),
      new THREE.Vector3(0, 0, -2),
      new THREE.Vector3(0, 34, 4),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E08: Movable Diopter Focus Group — ED + High-Index Lanthanum Cemented Doublet (G2/G3)
  // =========================================================================
  const lensEdGroup = new THREE.Group();
  {
    // Element G3 (rear/-Z side): Positive biconvex ED Low-Dispersion Crown glass (emerald sheen!)
    const edCrownGeo = createOpticalLensGeometry(10.2, 1.6, 2.35, 1.85, -0.32, 0.25, 20, 48);
    const edCrown = new THREE.Mesh(edCrownGeo, mats.evfLensEd);
    edCrown.position.z = -1.1;
    edCrown.userData.edgeOpacity = 0.34;
    lensEdGroup.add(edCrown);

    // Element G2 (front/+Z side): High-Index High-Dispersion Lanthanum Negative Concave Flint
    // Cemented flush onto G3's front convex face!
    const flintGeo = createOpticalLensGeometry(10.2, 2.8, -0.4, -2.15, 0.12, 0.28, 20, 48);
    const flint = new THREE.Mesh(flintGeo, mats.evfLensField);
    flint.position.z = 1.45;
    flint.userData.edgeOpacity = 0.34;
    lensEdGroup.add(flint);

    // Cemented doublet perimeter glass highlight band
    const glassBand = new THREE.Mesh(
      new THREE.CylinderGeometry(10.28, 10.28, 4.4, 44, 1, true).rotateX(Math.PI / 2),
      mats.evfGlassEdgeRim
    );
    glassBand.position.z = 0.2;
    glassBand.userData.noEdges = true;
    lensEdGroup.add(glassBand);

    // Machined Magnesium Sliding Diopter Focus Carriage encircling the cemented doublet
    const carriage = createLensRetainerCell(10.1, 11.9, 5.2, mats.magnesiumCast);
    carriage.position.z = 0.2;
    lensEdGroup.add(carriage);

    // Right-side lead-screw drive lug & brass nut bushing engaging E09's helical screw
    const driveArm = new THREE.Mesh(new THREE.BoxGeometry(5.0, 4.4, 3.8), mats.magnesiumCast);
    driveArm.position.set(13.2, 0, 0.2);
    lensEdGroup.add(driveArm);

    const leadNut = new THREE.Mesh(
      new THREE.CylinderGeometry(1.75, 1.75, 4.4, 20).rotateX(Math.PI / 2),
      mats.brassGear
    );
    leadNut.position.set(14.8, 0, 0.2);
    lensEdGroup.add(leadNut);

    // Upper & lower stainless guide-rod linear sliding sleeves (prevents optical tilt!)
    for (const [gx, gy] of [
      [11.8, 7.6],
      [-11.8, -6.8],
    ]) {
      const sleeve = new THREE.Mesh(
        new THREE.CylinderGeometry(1.35, 1.35, 5.8, 18).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      sleeve.position.set(gx, gy, 0.2);
      lensEdGroup.add(sleeve);
    }
  }
  const edLensPart = finalizeEvfPart(
    'evf-lens-ed-doublet',
    9,
    '#10b981',
    lensEdGroup,
    new THREE.Vector3(0, EVF_OPTICAL_Y, -9.2),
    new THREE.Vector3(0, 0, 12),
    new THREE.Vector3(0, 34, 14),
    cp,
    0.24
  );
  parts.push(edLensPart);

  // =========================================================================
  // E10: Centerless-Ground Twin Stainless Diopter Guide Rods & Preload Springs
  // =========================================================================
  const diopterRailsGroup = new THREE.Group();
  {
    // Diagonal kinematic pair matching E09 ED-doublet linear sleeves at (+11.8, +7.6) & (-11.8, -6.8)
    const rodCoords: Array<[number, number]> = [
      [11.8, 7.6],
      [-11.8, -6.8],
    ];
    for (const [rx, ry] of rodCoords) {
      // Centerless-ground hardened stainless linear guide shaft
      const shaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.74, 0.74, 20.4, 18).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      shaft.position.set(rx, ry, 0);
      diopterRailsGroup.add(shaft);

      // Anti-backlash phosphor-bronze helical preload spring seated on each guide rod
      const preloadSpring = new THREE.Mesh(
        createHelicalSpringGeometry(1.22, 5.8, 7, 0.18),
        mats.brassGear
      );
      preloadSpring.position.set(rx, ry, 5.2);
      preloadSpring.userData.noEdges = true;
      diopterRailsGroup.add(preloadSpring);

      // Front & rear PTFE self-lubricating flange end-mounts + circlips
      for (const sz of [-9.8, 9.8]) {
        const endMount = new THREE.Mesh(
          new THREE.CylinderGeometry(1.45, 1.45, 1.3, 18).rotateX(Math.PI / 2),
          mats.pomGear
        );
        endMount.position.set(rx, ry, sz);
        diopterRailsGroup.add(endMount);

        const circlip = new THREE.Mesh(
          new THREE.TorusGeometry(1.05, 0.18, 8, 20),
          mats.mountSpringSteel
        );
        circlip.position.set(rx, ry, sz + (sz > 0 ? -0.85 : 0.85));
        circlip.userData.noEdges = true;
        diopterRailsGroup.add(circlip);
      }
    }

    // Thin anodized front & rear cross-tie alignment bridge straps linking both guide ends
    for (const sz of [-9.8, 9.8]) {
      const bridge = new THREE.Mesh(
        extrudeCentered(createFrameShape(26.4, 18.4, 3.8, 23.2, 15.2, 2.8), 0.85, 0.06, 0.06, 20),
        mats.matteBlackAnodized
      );
      bridge.position.z = sz;
      diopterRailsGroup.add(bridge);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-diopter-rails',
      10,
      '#64748b',
      diopterRailsGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -9.2),
      new THREE.Vector3(-28, -14, 12),
      new THREE.Vector3(-26, 20, 14),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E11: Helical Spiral-Cam Diopter Barrel Sleeve & Brass Sector Pinion
  // =========================================================================
  const helicoidGroup = new THREE.Group();
  {
    // Concentric CNC-machined helicoid cam barrel encircling the movable ED doublet (R = 12.1..13.2)
    const barrelShell = createLensRetainerCell(12.0, 13.1, 10.6, mats.matteBlackAnodized);
    helicoidSleeveGroup.add(barrelShell);

    // Front & rear gleaming anodized bearing rings
    for (const sz of [-5.2, 5.2]) {
      const ring = createLensRetainerCell(11.95, 13.35, 0.8, mats.stainlessMachined);
      ring.position.z = sz;
      helicoidSleeveGroup.add(ring);
    }

    // 3x 120°-spaced spiral cam-slot ribs & stainless cam-follower guide pins around perimeter
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3 + 0.35;
      const slotTrack = new THREE.Group();
      slotTrack.rotation.z = angle;

      const camRib = new THREE.Mesh(
        new THREE.BoxGeometry(0.95, 1.15, 7.6),
        mats.brassGear
      );
      camRib.position.set(13.25, 0, 0);
      camRib.rotation.x = 0.28; // Helical cam lead angle β!
      slotTrack.add(camRib);

      // Stainless cylindrical cam-follower pin riding inside the spiral slot
      const follower = new THREE.Mesh(
        new THREE.CylinderGeometry(0.68, 0.68, 2.2, 14).rotateZ(Math.PI / 2),
        mats.stainlessMachined
      );
      follower.position.set(12.6, 0, 0);
      slotTrack.add(follower);

      helicoidSleeveGroup.add(slotTrack);
    }

    // Brass radial sector gear arc on +X flank meshing cleanly with the diopter drive pinion
    for (let t = -4; t <= 4; t++) {
      const a = t * 0.095;
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.52, 2.2), mats.brassGear);
      tooth.position.set(Math.cos(a) * 13.6, Math.sin(a) * 13.6, -3.4);
      tooth.rotation.z = a;
      tooth.userData.noEdges = true;
      helicoidSleeveGroup.add(tooth);
    }

    helicoidGroup.add(helicoidSleeveGroup);
  }
  parts.push(
    finalizeEvfPart(
      'evf-diopter-helicoid',
      11,
      '#ca8a04',
      helicoidGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -9.2),
      new THREE.Vector3(30, 8, 12),
      new THREE.Vector3(28, 46, 14),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E12: Precision Helical Diopter Dial & Brass Lead Screw Mechanism
  // =========================================================================
  const diopterGroup = new THREE.Group();
  const diopterDialGroup = new THREE.Group();
  const leadScrewGroup = new THREE.Group();
  {
    // Anchor bracket frame on right flank of EVF optical barrel (local x = 0 => world x = +15.0)
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(2.6, 17.5, 18.0), mats.matteBlackAnodized);
    bracket.scale.set(0.55, 0.22, 1.0);
    bracket.position.set(2.8, 8.2, 0);
    diopterGroup.add(bracket);

    // Precision machined front & rear bearing pillow blocks supporting the lead screw
    for (const sz of [-8.2, 8.2]) {
      const block = new THREE.Mesh(new THREE.BoxGeometry(4.4, 5.2, 1.6), mats.magnesiumCast);
      block.position.set(0.2, 0, sz);
      diopterGroup.add(block);
    }

    // Gleaming Precision Brass Helical Lead Screw (rotates live in sync with E09!)
    const screwCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.95, 17.6, 20).rotateX(Math.PI / 2),
      mats.brassGear
    );
    leadScrewGroup.add(screwCore);

    // Fine helical thread ridges along the brass lead screw
    const threadHelix = new THREE.Mesh(
      createHelicalSpringGeometry(1.12, 14.4, 12, 0.16),
      mats.brassGear
    );
    threadHelix.userData.noEdges = true;
    leadScrewGroup.add(threadHelix);

    // Rear brass spur drive pinion driven by the pop-out diopter dial
    const screwGear = new THREE.Mesh(
      createSpurGearGeometry(16, 2.3, 1.4, 0.8),
      mats.brassGear
    );
    screwGear.position.z = -6.4;
    leadScrewGroup.add(screwGear);
    leadScrewGroup.position.set(-0.2, 0, 0);
    diopterGroup.add(leadScrewGroup);

    // External Knurled Push-Lock Diopter Adjustment Dial (protruding right at +X for thumb control!)
    diopterDialGroup.position.set(4.6, 0, -6.4);
    const dialShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(1.1, 1.1, 4.2, 18).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    dialShaft.position.x = -1.6;
    diopterDialGroup.add(dialShaft);

    // Mating POM bevel/spur gear on dial shaft
    const dialGear = new THREE.Mesh(
      createSpurGearGeometry(14, 2.1, 1.4, 0.7).rotateY(Math.PI / 2),
      mats.pomGear
    );
    dialGear.position.x = -2.2;
    diopterDialGroup.add(dialGear);

    // Double EPDM weather-seal O-ring on dial shaft
    const oRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.28, 10, 24).rotateY(Math.PI / 2),
      mats.epdmGasket
    );
    oRing.position.x = -0.3;
    oRing.userData.noEdges = true;
    diopterDialGroup.add(oRing);

    // Main knurled matte-black aluminum thumbwheel drum
    const drum = new THREE.Mesh(
      new THREE.CylinderGeometry(4.4, 4.4, 3.6, 32).rotateZ(Math.PI / 2),
      mats.matteBlackAnodized
    );
    drum.position.x = 1.6;
    diopterDialGroup.add(drum);

    // 24 crisp tactile knurling flutes around the thumbwheel rim
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const flute = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.38, 0.38), mats.evfHousingMg);
      flute.position.set(1.6, Math.cos(a) * 4.42, Math.sin(a) * 4.42);
      flute.rotation.x = a;
      flute.userData.noEdges = true;
      diopterDialGroup.add(flute);
    }

    // Polished machined aluminum end-cap ring & white geometric zero-index dot (zero text!)
    const capRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.3, 10, 32).rotateY(Math.PI / 2),
      mats.stainlessMachined
    );
    capRing.position.x = 3.45;
    diopterDialGroup.add(capRing);

    const indexDot = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 10), mats.goldPlating);
    indexDot.position.set(3.55, 2.3, 0);
    indexDot.userData.noEdges = true;
    diopterDialGroup.add(indexDot);

    diopterGroup.add(diopterDialGroup);
  }
  parts.push(
    finalizeEvfPart(
      'evf-diopter-mech',
      12,
      '#d97706',
      diopterGroup,
      new THREE.Vector3(15.0, EVF_OPTICAL_Y, -9.2),
      new THREE.Vector3(16, -24, 12),
      new THREE.Vector3(24, 24, 14),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E10: Front Aspheric Field-Flattener Condenser Lens (G1)
  // =========================================================================
  const lensFieldGroup = new THREE.Group();
  {
    // Positive meniscus aspheric condenser lens facing OLED (+Z concave, -Z strongly convex)
    const fieldGlassGeo = createOpticalLensGeometry(9.6, 1.7, -0.45, 2.25, 0.14, -0.38, 20, 48);
    const fieldGlass = new THREE.Mesh(fieldGlassGeo, mats.evfLensField);
    fieldGlass.userData.edgeOpacity = 0.34;
    lensFieldGroup.add(fieldGlass);

    // Polished rim bevel
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(9.6, 0.3, 12, 48),
      mats.evfGlassEdgeRim
    );
    rim.userData.noEdges = true;
    lensFieldGroup.add(rim);

    // Anodized optical field-stop frame with precision 4:3 OLED aperture mask
    const maskShape = createFrameShape(23.2, 19.6, 3.0, 14.4, 11.0, 0.6);
    const mask = new THREE.Mesh(
      extrudeCentered(maskShape, 1.4, 0.12, 0.12, 24),
      mats.matteBlackAnodized
    );
    mask.position.z = 1.1;
    lensFieldGroup.add(mask);

    // Cylindrical glass retaining ring
    const cell = createLensRetainerCell(9.45, 11.1, 2.4, mats.matteBlackAnodized);
    lensFieldGroup.add(cell);
  }
  parts.push(
    finalizeEvfPart(
      'evf-lens-field',
      13,
      '#4f46e5',
      lensFieldGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -2.4),
      new THREE.Vector3(0, 0, 26),
      new THREE.Vector3(0, 34, 24),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E14: 0.64-inch 9.44M-Dot Quad-XGA 2-Stack Tandem Micro-OLED (OLEDoS)
  // =========================================================================
  const oledGroup = new THREE.Group();
  let oledScreenMesh!: THREE.Mesh;
  {
    // Precision Kovar / Ceramic Microdisplay Carrier Package
    const carrier = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(23.0, 18.8, 1.8), 1.6, 0.14, 0.14, 18),
      mats.ceramicAlumina
    );
    carrier.position.z = 0.55;
    oledGroup.add(carrier);

    // Single-Crystal CMOS Silicon Backplane Substrate (18.6 x 14.4 mm)
    const siBackplane = new THREE.Mesh(new THREE.BoxGeometry(18.6, 14.4, 0.9), mats.siliconBulk);
    siBackplane.position.z = -0.2;
    oledGroup.add(siBackplane);

    // Gold Perimeter Wire-Bond & Hermetic Seal Ring framing the 0.64" OLED active area
    const sealRing = new THREE.Mesh(
      extrudeCentered(createFrameShape(17.6, 13.6, 0.6, 14.4, 10.8, 0.3), 0.32, 0.04, 0.04, 12),
      mats.goldPlating
    );
    sealRing.position.z = -0.68;
    oledGroup.add(sealRing);

    // Active 0.64-inch (13.4 x 10.1 mm) 9.44M-Dot Tandem Micro-OLED Emissive Display
    // Faces -Z (directly toward the EVF lens train & photographer's eye!)
    oledScreenMesh = new THREE.Mesh(new THREE.PlaneGeometry(13.8, 10.4), mats.evfOledActive);
    oledScreenMesh.position.z = -0.78;
    oledScreenMesh.rotation.y = Math.PI;
    oledScreenMesh.userData.noEdges = true;
    oledGroup.add(oledScreenMesh);

    // Ultra-thin protective encapsulation glass + On-Chip MLA optical surface directly over OLED
    const mlaGlass = new THREE.Mesh(new THREE.BoxGeometry(15.2, 11.6, 0.36), mats.coverGlass);
    mlaGlass.position.z = -1.04;
    mlaGlass.userData.edgeOpacity = 0.32;
    oledGroup.add(mlaGlass);

    // Rear thermal contact copper pad on +Z back of silicon package (mates with E17 TIM)
    const rearPad = new THREE.Mesh(new THREE.BoxGeometry(15.6, 11.8, 0.25), mats.goldPlating);
    rearPad.position.z = 1.42;
    oledGroup.add(rearPad);

    // Precision optical registration alignment pins (left & right flanges)
    for (const sx of [-1, 1]) {
      const ear = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(3.6, 6.2, 1.2), 1.2, 0.08, 0.08, 12),
        mats.kovarSeal
      );
      ear.position.set(sx * 12.6, 0, 0.55);
      oledGroup.add(ear);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-oled-panel',
      14,
      '#2563eb',
      oledGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 3.6),
      new THREE.Vector3(0, 0, 40),
      new THREE.Vector3(0, 34, 34),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E15: Micro-OLED 3-Point Micron Optical Tilt & Centering Calibration Chassis
  // =========================================================================
  const oledAlignGroup = new THREE.Group();
  {
    // Low-CTE Kovar kinematic registration frame directly behind the Micro-OLED package
    const kovarFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(25.2, 20.2, 2.2, 17.8, 13.8, 1.2), 1.2, 0.08, 0.08, 18),
      mats.kovarSeal
    );
    oledAlignGroup.add(kovarFrame);

    // 3 Kinematic triangular leveling points: fine-pitch brass calibration screws + ceramic pivot balls + leaf clips
    const triPts: Array<[number, number]> = [
      [0, 8.6],
      [-10.4, -7.8],
      [10.4, -7.8],
    ];
    for (const [tx, ty] of triPts) {
      // Brass threaded calibration collar + ultra-fine pitch M1.4×P0.20 leveling screw
      const collar = new THREE.Mesh(
        new THREE.CylinderGeometry(1.75, 1.75, 1.8, 18).rotateX(Math.PI / 2),
        mats.brassGear
      );
      collar.position.set(tx, ty, 0.2);
      oledAlignGroup.add(collar);

      const calScrew = createPrecisionScrew(1.05, 0.48, 2.4, mats.brassGear);
      calScrew.position.set(tx, ty, 0.9);
      oledAlignGroup.add(calScrew);

      // Ceramic spherical kinematic datum ball on -Z face touching OLED carrier
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.65, 12, 10), mats.ceramicAlumina);
      ball.position.set(tx, ty, -0.85);
      ball.userData.noEdges = true;
      oledAlignGroup.add(ball);

      // Stainless preload leaf-spring tension clip keeping OLED seated zero-stress
      const clip = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.4, 0.35), mats.mountSpringSteel);
      clip.position.set(tx * 0.85, ty * 0.85, -0.75);
      oledAlignGroup.add(clip);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-oled-alignment',
      15,
      '#b45309',
      oledAlignGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 5.2),
      new THREE.Vector3(28, 0, 46),
      new THREE.Vector3(26, 34, 39),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E16: 240Hz MIPI-DSI Display Driver / TCON PCB & Shielded Dual-Stream FPC
  // =========================================================================
  const tconGroup = new THREE.Group();
  {
    // High-density emerald rigid TCON driver PCB behind OLED
    const pcb = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(24.6, 19.2, 1.8), 1.1, 0.08, 0.08, 16),
      mats.hdiMainboardPcb
    );
    tconGroup.add(pcb);

    // Central 240Hz MIPI-DSI / VESA DSC Timing Controller (TCON) QFN ASIC on +Z rear face
    const tconIc = new THREE.Mesh(new THREE.BoxGeometry(7.6, 7.6, 0.95), mats.icEpoxy);
    tconIc.position.set(-2.2, 1.2, 0.95);
    tconGroup.add(tconIc);

    // OLED Dual-Rail ELVDD/ELVSS Boost PMIC + Ferrite Inductors + Yellow Tantalum Caps
    const pmic = new THREE.Mesh(new THREE.BoxGeometry(4.4, 4.4, 0.85), mats.icEpoxy);
    pmic.position.set(6.2, 3.0, 0.9);
    tconGroup.add(pmic);

    for (const [ix, iy] of [
      [5.0, -3.2],
      [8.2, -3.2],
    ]) {
      const ind = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 1.1), mats.ferriteInductor);
      ind.position.set(ix, iy, 1.0);
      tconGroup.add(ind);
    }
    for (const [cx, cy] of [
      [-8.6, 4.6],
      [-8.6, 1.6],
      [-8.6, -1.6],
      [-8.6, -4.6],
    ]) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.2, 0.85), mats.tantalumCapYellow);
      cap.position.set(cx, cy, 0.92);
      tconGroup.add(cap);
    }

    // 240Hz Precision Crystal Oscillator (metallic silver can)
    const xtal = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.0, 0.7), mats.stainlessMachined);
    xtal.position.set(-2.4, -5.8, 0.86);
    tconGroup.add(xtal);

    // Bottom Ivory Flip-Lock ZIF Connector + Shielded High-Speed Dual-Stream FPC Cable!
    const zif = new THREE.Mesh(new THREE.BoxGeometry(11.6, 2.4, 1.05), mats.zifIvoryPlastic);
    zif.position.set(0, -7.8, 0.98);
    tconGroup.add(zif);

    // Sculpted EMI-shielded polyimide FPC sweeping gracefully downward (-Y) toward Mainboard ZIF!
    const fpcDrop = new THREE.Mesh(new THREE.BoxGeometry(9.8, 12.6, 0.28), mats.polyimideFpc);
    fpcDrop.position.set(0, -14.2, 0.55);
    tconGroup.add(fpcDrop);

    const fpcEmiOverlay = new THREE.Mesh(new THREE.BoxGeometry(8.6, 9.2, 0.32), mats.emiShieldFilm);
    fpcEmiOverlay.position.set(0, -13.6, 0.56);
    tconGroup.add(fpcEmiOverlay);

    const goldFingers = new THREE.Mesh(new THREE.BoxGeometry(9.4, 1.8, 0.34), mats.goldPlating);
    goldFingers.position.set(0, -20.0, 0.55);
    tconGroup.add(goldFingers);
  }
  parts.push(
    finalizeEvfPart(
      'evf-tcon-pcb',
      16,
      '#059669',
      tconGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 6.8),
      new THREE.Vector3(0, 0, 52),
      new THREE.Vector3(0, 34, 44),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E17: Micro-OLED Rear Copper/Aluminum Thermal Sink & High-k Silicone TIM
  // =========================================================================
  const heatsinkGroup = new THREE.Group();
  {
    // High-k Sky-Blue Silicone Thermal Pad (TIM) bridging TCON/OLED to copper plate
    const tim = new THREE.Mesh(new THREE.BoxGeometry(17.8, 13.4, 0.8), mats.thermalPadBlue);
    tim.position.z = -1.1;
    heatsinkGroup.add(tim);

    // Oxygen-free pure copper heat spreader baseplate
    const cuBase = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(25.2, 19.6, 2.0), 1.1, 0.1, 0.1, 18),
      mats.copperHeatSpreader
    );
    cuBase.position.z = -0.15;
    heatsinkGroup.add(cuBase);

    // CNC dark-anodized aluminum micro-fin cooling array (9 crisp vertical fins on +Z front face)
    const finBack = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(23.8, 18.2, 1.6), 0.7, 0.08, 0.08, 16),
      mats.matteBlackAnodized
    );
    finBack.position.z = 0.72;
    heatsinkGroup.add(finBack);

    for (let i = -4; i <= 4; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(1.15, 16.4, 2.3), mats.matteBlackAnodized);
      fin.position.set(i * 2.55, 0, 2.0);
      heatsinkGroup.add(fin);
    }

    // Left & right stainless chassis thermal-bridge mounting ears with M1.4 precision screws
    for (const sx of [-1, 1]) {
      const ear = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(4.4, 7.6, 1.4), 1.1, 0.08, 0.08, 12),
        mats.copperHeatSpreader
      );
      ear.position.set(sx * 14.2, 0, -0.15);
      heatsinkGroup.add(ear);

      const scr = createPrecisionScrew(0.9, 0.55, 2.2, mats.stainlessMachined);
      scr.position.set(sx * 14.4, 0, 0.45);
      heatsinkGroup.add(scr);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-thermal-sink',
      17,
      '#c25e28',
      heatsinkGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 10.2),
      new THREE.Vector3(0, 0, 64),
      new THREE.Vector3(0, 34, 54),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E18: Weather-Sealed Magnesium-Aluminum EVF Optical Barrel & Baffles
  //      (Authentic architectural -X CAD cutaway window so internal lenses,
  //       45° dichroic mirror & Micro-OLED gleam cleanly even when assembled!)
  // =========================================================================
  const housingGroup = new THREE.Group();
  {
    const barrelLen = 44.6; // local z = -22.3 .. +22.3 -> world z = -34.8 .. +9.8

    // Sculpted Pentaprism-Style Upper Arch Roof (classic flagship camera EVF hump silhouette!)
    // Built as a C-section cutaway: Top arched roof + Right wall (+X) + Partial Bottom deck
    // leaving the Left (-X) viewing flank cleanly cut open for unobstructed optical inspection!
    const roofProfile = new THREE.Shape();
    // Outer contour (clockwise starting top-left cutaway edge -> arched crest -> right wall -> bottom right -> bottom center)
    roofProfile.moveTo(-8.5, 13.0);
    roofProfile.lineTo(-4.0, 15.6);
    roofProfile.lineTo(4.0, 15.6);
    roofProfile.lineTo(13.8, 12.2);
    roofProfile.lineTo(15.2, 9.6);
    roofProfile.lineTo(15.2, -10.8);
    roofProfile.lineTo(12.2, -12.8);
    roofProfile.lineTo(-10.5, -12.8);
    roofProfile.lineTo(-12.2, -10.8);
    roofProfile.lineTo(-12.2, -8.8);
    // Inner contour returning back up inside the optical barrel
    roofProfile.lineTo(-9.4, -10.6);
    roofProfile.lineTo(11.4, -10.6);
    roofProfile.lineTo(13.0, -9.2);
    roofProfile.lineTo(13.0, 8.8);
    roofProfile.lineTo(11.6, 10.6);
    roofProfile.lineTo(3.4, 13.4);
    roofProfile.lineTo(-3.4, 13.4);
    roofProfile.lineTo(-8.5, 10.8);
    roofProfile.closePath();

    const shellGeo = extrudeCentered(roofProfile, barrelLen, 0.28, 0.28, 16);
    const shell = new THREE.Mesh(shellGeo, mats.evfHousingMg);
    housingGroup.add(shell);

    // Cut-open rear optical baffle portal on bottom floor (around local z = -9.7 => world z = -22.2)
    // Framed by a crisp machined aluminum ring showing where the 90° IR gaze ray exits downward!
    const irPortRing = new THREE.Mesh(
      new THREE.TorusGeometry(6.6, 0.55, 10, 32).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    irPortRing.position.set(0, -11.9, -9.7);
    housingGroup.add(irPortRing);

    // Top-deck Accessory Hot-Shoe Mount Rail Bosses on the pentaprism crown!
    const shoeDeck = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(18.6, 19.4, 1.4), 1.4, 0.14, 0.14, 14).rotateX(
        Math.PI / 2
      ),
      mats.matteBlackAnodized
    );
    shoeDeck.position.set(0, 16.0, 4.2);
    housingGroup.add(shoeDeck);

    for (const sx of [-7.6, 7.6]) {
      const shoeRail = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.2, 16.4), mats.stainlessMachined);
      shoeRail.position.set(sx, 17.0, 4.2);
      housingGroup.add(shoeRail);
    }

    // 7 Internal Knife-Edge Matte-Black Anti-Reflection Baffle Ridges lining the barrel ceiling & right wall!
    for (let i = 0; i < 7; i++) {
      const bz = -17.0 + i * 5.2;
      // Upper baffle fin
      const topRib = new THREE.Mesh(new THREE.BoxGeometry(16.8, 1.35, 0.45), mats.matteBlackAnodized);
      topRib.position.set(2.2, 11.4, bz);
      housingGroup.add(topRib);

      // Right-wall baffle fin
      const sideRib = new THREE.Mesh(new THREE.BoxGeometry(1.35, 18.0, 0.45), mats.matteBlackAnodized);
      sideRib.position.set(12.1, -0.4, bz);
      housingGroup.add(sideRib);
    }

    // Front (+Z) and Rear (-Z) Weather-Seal EPDM Flange Gaskets & Machined Collar Frames
    const collarShape = createFrameShape(30.4, 24.4, 4.8, 25.0, 19.2, 3.6);
    const rearCollar = new THREE.Mesh(
      extrudeCentered(collarShape, 1.8, 0.18, 0.18, 24),
      mats.evfHousingMg
    );
    rearCollar.position.z = -barrelLen * 0.5 + 0.9;
    housingGroup.add(rearCollar);

    const rearSeal = new THREE.Mesh(
      extrudeCentered(createFrameShape(31.2, 25.2, 5.1, 29.8, 23.8, 4.4), 0.7, 0.08, 0.08, 24),
      mats.epdmGasket
    );
    rearSeal.position.z = -barrelLen * 0.5 - 0.1;
    housingGroup.add(rearSeal);

    const frontCollar = new THREE.Mesh(
      extrudeCentered(createFrameShape(28.4, 22.8, 3.6, 23.6, 18.2, 2.2), 1.8, 0.16, 0.16, 22),
      mats.evfHousingMg
    );
    frontCollar.position.z = barrelLen * 0.5 - 0.9;
    housingGroup.add(frontCollar);

    // 4 Lower Magnesium Chassis Mounting Flanges + Stainless Hex Bolts
    for (const [mx, mz] of [
      [-13.6, -15.5],
      [16.4, -15.5],
      [-13.6, 14.5],
      [16.4, 14.5],
    ]) {
      const boss = new THREE.Mesh(
        new THREE.CylinderGeometry(2.1, 2.4, 2.8, 18),
        mats.evfHousingMg
      );
      boss.position.set(mx, -11.4, mz);
      housingGroup.add(boss);

      const bolt = createPrecisionScrew(1.0, 0.5, 1.8, mats.stainlessMachined);
      bolt.rotation.x = -Math.PI / 2;
      bolt.position.set(mx, -9.8, mz);
      housingGroup.add(bolt);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-magnesium-housing',
      18,
      '#4b5563',
      housingGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -12.5),
      new THREE.Vector3(0, 29, 4),
      new THREE.Vector3(0, 62, 6),
      cp,
      0.26
    )
  );

  // =========================================================================
  // Live Kinematic Rig: Smooth Diopter Focus Drive + Helicoid + 850nm IR Ring Pulse
  // =========================================================================
  const applyDynamics = (
    elapsed: number,
    physicsActive: boolean,
    explodeFactor: number,
    integrated: boolean
  ) => {
    const offset =
      integrated && edLensPart.integratedExplodeOffset
        ? edLensPart.integratedExplodeOffset
        : edLensPart.explodeOffset;

    if (!physicsActive) {
      diopterDialGroup.rotation.x = 0;
      leadScrewGroup.rotation.z = 0;
      helicoidSleeveGroup.rotation.z = 0;
      for (const led of irLedMeshes) {
        (led.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.55;
      }
      return;
    }

    // Smooth -4.0 to +3.0 m⁻¹ diopter focus oscillation (±2.0 mm optical Z stroke!)
    const diopterWave = Math.sin(elapsed * 1.45);
    const zShift = diopterWave * 2.0;

    edLensPart.group.position.set(
      edLensPart.assembledPos.x + offset.x * explodeFactor,
      edLensPart.assembledPos.y + offset.y * explodeFactor,
      edLensPart.assembledPos.z + offset.z * explodeFactor + zShift
    );

    // Synchronized rotation of the knurled diopter dial, brass helical lead screw & helicoid cam sleeve!
    diopterDialGroup.rotation.x = diopterWave * 2.6;
    leadScrewGroup.rotation.z = diopterWave * 5.2;
    helicoidSleeveGroup.rotation.z = diopterWave * 0.42;

    // Sequential 8-LED Eye-Control AF IR corneal-reflection illumination shimmer
    irLedMeshes.forEach((led, idx) => {
      const pulse = 0.45 + 0.95 * (0.5 + 0.5 * Math.sin(elapsed * 6.5 - idx * (Math.PI / 4)));
      (led.material as THREE.MeshPhysicalMaterial).emissiveIntensity = pulse;
    });
  };

  return {
    parts,
    rig: {
      edLensPart,
      diopterDialGroup,
      leadScrewGroup,
      irLedMeshes,
      oledScreenMesh,
      applyDynamics,
    },
  };
}
