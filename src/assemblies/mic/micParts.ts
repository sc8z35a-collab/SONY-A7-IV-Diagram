import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeMicPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.25
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, edgeOpacity);

  return {
    id,
    subsystem: 'mic',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
    standaloneOnly: true,
  };
}

/** Helper to rotate a centered XY-extruded plate so its thickness lies along Y. */
function makeHorizPlate(
  shape: THREE.Shape,
  thickness: number,
  mat: THREE.Material,
  bevel = 0.08,
  curveSegs = 14
): THREE.Mesh {
  const geo = extrudeCentered(shape, thickness, bevel, bevel, curveSegs);
  geo.rotateX(Math.PI / 2);
  return new THREE.Mesh(geo, mat);
}

/** Helper to create a curved gold wirebond arch between two 3D points. */
function makeWirebondArch(
  a: THREE.Vector3,
  b: THREE.Vector3,
  archHeight: number,
  radius: number,
  mat: THREE.Material
): THREE.Mesh {
  const mid1 = new THREE.Vector3().lerpVectors(a, b, 0.25);
  mid1.y += archHeight;
  const mid2 = new THREE.Vector3().lerpVectors(a, b, 0.75);
  mid2.y += archHeight * 0.9;
  const curve = new THREE.CatmullRomCurve3([a, mid1, mid2, b]);
  const geo = new THREE.TubeGeometry(curve, 14, radius, 6, false);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.userData.noEdges = true;
  return mesh;
}

/**
 * Build all 32 sculpted 3D CAD sub-assemblies of the Sony Internal Stereo / 3-Capsule
 * Silicon MEMS + Electret Condenser (ECM) Microphone Ultra-Dissection (MC01–MC32).
 *
 * Magnified ~2.8:1 cutaway CAD scale, centered at (0, 0, 0):
 *  - Top (+Y): Windscreen, Stereo L/R Top-Deck Grille, Micro-Mesh, ePTFE Waterproof Vent,
 *    Offset Drain Labyrinth, Helmholtz Front Chamber, Silicone Acoustic Coupling Gaskets
 *  - Mid-Housing: Sony OEM RUBBER (885), MIC HOLDER (89100), BTITE 1.4x5.0mm, TAPE 631S, Poron Absorber
 *  - Left Channel (-X): 8-Part Silicon MEMS / Sealed-Dual-Membrane (SDM) Cutaway (MC13–MC20)
 *  - Right Channel (+X): 5-Part Cylindrical Electret Condenser (ECM) Cutaway (MC21–MC25)
 *  - Rear Center (-Z): 3rd Dedicated Beamforming / Rear Voice-Memo Capsule (MC26)
 *  - Bottom (-Y): Sony OEM SH-1035 Shielded Flex, RF Ferrite/ESD, 24-bit Codec/PGA, HPF, Beamforming DSP, BIONZ XR2 AI Noise Cut!
 * Strictly visible ONLY in standalone 'mic' mode.
 */
export function buildMicParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  const LX = -14.2; // Left channel (Silicon MEMS / SDM cutaway)
  const RX = 14.2;  // Right channel (Electret Condenser ECM cutaway)
  const FZ = 4.2;   // Front stereo L/R line

  // =========================================================================
  // MC01. Detachable Acoustic Fur Windscreen ("Deadcat" / ZV-Series)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Soft dome base mesh
    const basePlate = makeHorizPlate(createRoundedRectShape(46.0, 20.0, 6.0), 1.1, mats.matteBlackAnodized, 0.1);
    const domeCore = new THREE.Mesh(
      new THREE.SphereGeometry(16.0, 22, 12, 0, Math.PI * 2, 0, Math.PI * 0.5),
      mats.velvetFlockTrap
    );
    domeCore.scale.set(1.42, 0.42, 0.66);
    domeCore.position.y = 0.5;
    domeCore.userData.noEdges = true;

    // Instanced acoustic fur tufts distributing wind turbulence
    const tuftGeo = new THREE.ConeGeometry(0.65, 3.6, 5);
    const tuftCount = 110;
    const tuftInst = new THREE.InstancedMesh(tuftGeo, mats.lensFoamSeal, tuftCount);
    const dm = new THREE.Object3D();
    for (let i = 0; i < tuftCount; i++) {
      const phi = (i * 2.39996) % (Math.PI * 2);
      const rNorm = Math.sqrt((i + 0.5) / tuftCount);
      const ux = Math.cos(phi) * rNorm * 21.0;
      const uz = Math.sin(phi) * rNorm * 9.6;
      const uy = 0.8 + Math.sqrt(Math.max(0.05, 1 - rNorm * rNorm)) * 6.4;
      dm.position.set(ux, uy, uz);
      dm.rotation.set((uz / 12) * 0.65, phi, -(ux / 24) * 0.65);
      dm.updateMatrix();
      tuftInst.setMatrixAt(i, dm.matrix);
    }
    tuftInst.instanceMatrix.needsUpdate = true;
    tuftInst.userData.noEdges = true;

    // Center MI-shoe clip adapter foot underneath
    const shoeFoot = new THREE.Mesh(new THREE.BoxGeometry(10.0, 1.4, 8.0), mats.matteBlackAnodized);
    shoeFoot.position.set(0, -1.0, -3.5);
    g.add(basePlate, domeCore, tuftInst, shoeFoot);

    parts.push(
      finalizeMicPart(
        'mc-deadcat-windscreen',
        1,
        '#64748b',
        g,
        new THREE.Vector3(0, 16.2, FZ),
        new THREE.Vector3(0, 25.0, 2.0),
        cp
      )
    );
  }

  // =========================================================================
  // MC02. Top-Deck Stereo L/R Micro-Perforated Acoustic Port Grille
  // =========================================================================
  {
    const g = new THREE.Group();
    const topDeck = makeHorizPlate(createRoundedRectShape(54.0, 34.0, 4.2), 1.5, mats.bodyMgShell, 0.14);
    // Left, Right & Rear-Center recessed micro-drilled port clusters
    const holeGeo = new THREE.CylinderGeometry(0.68, 0.68, 1.68, 10);
    const holePositions: Array<[number, number]> = [];
    for (const cx of [LX, RX]) {
      for (let ix = -1; ix <= 1; ix++) {
        for (let iz = -1; iz <= 1; iz++) {
          holePositions.push([cx + ix * 2.1, FZ + iz * 2.1]);
        }
      }
    }
    // Rear 3rd Voice-Memo / Beamforming grille cluster (5 holes)
    for (const [dx, dz] of [
      [0, 0],
      [-2.0, 0],
      [2.0, 0],
      [0, -2.0],
      [0, 2.0],
    ]) {
      holePositions.push([dx, -12.5 + dz]);
    }
    const holeInst = new THREE.InstancedMesh(holeGeo, mats.matteBlackAnodized, holePositions.length);
    const dm = new THREE.Object3D();
    holePositions.forEach(([hx, hz], idx) => {
      dm.position.set(hx, 0.02, hz);
      dm.updateMatrix();
      holeInst.setMatrixAt(idx, dm.matrix);
    });
    holeInst.instanceMatrix.needsUpdate = true;
    holeInst.userData.noEdges = true;

    // Subtle recessed chamfer bezels around L/R grilles
    for (const cx of [LX, RX]) {
      const bezel = makeHorizPlate(createFrameShape(9.4, 9.4, 1.8, 7.2, 7.2, 1.2), 0.32, mats.magnesiumCast, 0.04);
      bezel.position.set(cx, 0.78, FZ);
      g.add(bezel);
    }
    g.add(topDeck, holeInst);

    parts.push(
      finalizeMicPart(
        'mc-top-grille-holes',
        2,
        '#334155',
        g,
        new THREE.Vector3(0, 13.0, -1.5),
        new THREE.Vector3(0, 19.8, 0),
        cp
      )
    );
  }

  // =========================================================================
  // MC03. Ultra-Fine Stainless Steel Acoustic Micro-Mesh Debris Screen
  // =========================================================================
  {
    const g = new THREE.Group();
    const buildMeshPatch = (cx: number, cz: number, w: number) => {
      const rim = makeHorizPlate(createFrameShape(w, w, 1.4, w - 1.8, w - 1.8, 0.8), 0.35, mats.stainlessMachined, 0.03);
      rim.position.set(cx, 0, cz);
      const wireCount = 7;
      for (let i = 0; i < wireCount; i++) {
        const off = -w * 0.38 + (i / (wireCount - 1)) * w * 0.76;
        const wx = new THREE.Mesh(new THREE.BoxGeometry(w - 1.6, 0.14, 0.22), mats.silverElectrode);
        wx.position.set(cx, 0, cz + off);
        wx.userData.noEdges = true;
        const wz = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.14, w - 1.6), mats.silverElectrode);
        wz.position.set(cx + off, 0, cz);
        wz.userData.noEdges = true;
        g.add(wx, wz);
      }
      g.add(rim);
    };
    buildMeshPatch(LX, FZ, 9.2);
    buildMeshPatch(RX, FZ, 9.2);
    buildMeshPatch(0, -12.5, 7.6);

    parts.push(
      finalizeMicPart(
        'mc-stainless-micro-mesh',
        3,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 11.4, 0),
        new THREE.Vector3(0, 16.5, 0),
        cp
      )
    );
  }

  // =========================================================================
  // MC04. Hydrophobic Microporous ePTFE Waterproof Acoustic Vent Membrane
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [cx, cz, r] of [
      [LX, FZ, 4.4],
      [RX, FZ, 4.4],
      [0, -12.5, 3.6],
    ] as Array<[number, number, number]>) {
      // Adhesive PSA perimeter ring
      const psa = new THREE.Mesh(new THREE.TorusGeometry(r, 0.55, 10, 24), mats.matteBlackAnodized);
      psa.rotation.x = Math.PI / 2;
      psa.position.set(cx, 0, cz);
      // Iconic crisp white porous ePTFE acoustic vent disk
      const membrane = new THREE.Mesh(new THREE.CylinderGeometry(r - 0.35, r - 0.35, 0.24, 24), mats.ceramicAlumina);
      membrane.position.set(cx, 0.04, cz);
      g.add(psa, membrane);
    }

    parts.push(
      finalizeMicPart(
        'mc-eptfe-waterproof-membrane',
        4,
        '#f8fafc',
        g,
        new THREE.Vector3(0, 10.3, 0),
        new THREE.Vector3(0, 13.8, 0),
        cp
      )
    );
  }

  // =========================================================================
  // MC05. Offset Acoustic Water-Drain Labyrinth & >1 mm Recessed Channel
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const cx of [LX, RX]) {
      // Main stepped offset housing block with 90-degree crank duct
      const block = makeHorizPlate(createRoundedRectShape(13.2, 11.4, 1.6), 1.75, mats.magnesiumCast, 0.08);
      block.position.set(cx, 0, FZ);
      // Recessed deep drainage channel trough along outer side (catching straight-moving water droplets)
      const drainTrough = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 9.2), mats.vcWorkingFluidCyan);
      drainTrough.position.set(cx + (cx < 0 ? -4.4 : 4.4), 0.55, FZ);
      // Internal crank baffle diverting sound 90 degrees away from direct impact line
      const baffle = new THREE.Mesh(new THREE.BoxGeometry(5.6, 1.2, 1.3), mats.matteBlackAnodized);
      baffle.position.set(cx, 0.35, FZ + 1.4);
      g.add(block, drainTrough, baffle);
    }
    // Cross tie bridge connecting L/R ducts cleanly
    const tie = new THREE.Mesh(new THREE.BoxGeometry(16.0, 0.8, 3.0), mats.magnesiumCast);
    tie.position.set(0, 0, FZ);
    g.add(tie);

    parts.push(
      finalizeMicPart(
        'mc-acoustic-drain-labyrinth',
        5,
        '#0284c7',
        g,
        new THREE.Vector3(0, 8.8, 0),
        new THREE.Vector3(0, 11.2, 2.5),
        cp
      )
    );
  }

  // =========================================================================
  // MC06. Helmholtz Front-Port Acoustic Resonance Chamber (Vocal Clarity)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [cx, cz, r] of [
      [LX, FZ, 4.6],
      [RX, FZ, 4.6],
      [0, -12.5, 3.8],
    ] as Array<[number, number, number]>) {
      // Tuned acoustic neck collar + low-volume Helmholtz cavity ring (cut open on +Z front for visibility)
      const chamberWall = new THREE.Mesh(
        new THREE.CylinderGeometry(r, r * 0.92, 1.8, 22, 1, true, Math.PI * 0.3, Math.PI * 1.4),
        mats.mountShimBlue
      );
      chamberWall.position.set(cx, 0, cz);
      const neckRing = new THREE.Mesh(new THREE.TorusGeometry(r * 0.58, 0.48, 10, 20), mats.cfaBlue);
      neckRing.rotation.x = Math.PI / 2;
      neckRing.position.set(cx, 0.9, cz);
      g.add(chamberWall, neckRing);
    }

    parts.push(
      finalizeMicPart(
        'mc-helmholtz-front-chamber',
        6,
        '#3b82f6',
        g,
        new THREE.Vector3(0, 7.1, 0),
        new THREE.Vector3(0, 8.6, 4.0),
        cp
      )
    );
  }

  // =========================================================================
  // MC07. Elastomeric Acoustic Coupling Gaskets (Zero Internal Noise Leak)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [cx, cz, r] of [
      [LX, FZ, 4.5],
      [RX, FZ, 4.5],
      [0, -12.5, 3.7],
    ] as Array<[number, number, number]>) {
      const collar = new THREE.Mesh(new THREE.TorusGeometry(r, 0.88, 12, 24), mats.damperElastomer);
      collar.rotation.x = Math.PI / 2;
      collar.position.set(cx, 0, cz);
      const innerLip = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.72, r * 0.78, 1.35, 20, 1, true), mats.epdmGasket);
      innerLip.position.set(cx, -0.1, cz);
      g.add(collar, innerLip);
    }

    parts.push(
      finalizeMicPart(
        'mc-silicone-acoustic-gasket',
        7,
        '#f43f5e',
        g,
        new THREE.Vector3(0, 5.6, 0),
        new THREE.Vector3(0, 6.2, 5.5),
        cp
      )
    );
  }

  // =========================================================================
  // MC08. Sony OEM Shock-Isolating Microphone Rubber Boot (Ref.304 / 502687801)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Left MEMS boot (open-front cutaway jacket) + Right ECM cylindrical boot (cutaway)
    for (const [cx, isRect] of [
      [LX, true],
      [RX, false],
    ] as Array<[number, boolean]>) {
      if (isRect) {
        // Rectangular shock sleeve with external damping ribs
        const sleeve = makeHorizPlate(
          createFrameShape(13.8, 11.4, 2.0, 10.6, 8.2, 1.2),
          5.8,
          mats.butylDamperRubber,
          0.12
        );
        sleeve.position.set(cx, 0, FZ);
        // External isolation ribs reducing chassis contact area
        for (const ry of [-1.8, 0, 1.8]) {
          const rib = makeHorizPlate(
            createFrameShape(14.8, 12.4, 2.2, 13.4, 11.0, 1.8),
            0.48,
            mats.antiVibRubber,
            0.05
          );
          rib.position.set(cx, ry, FZ);
          g.add(rib);
        }
        g.add(sleeve);
      } else {
        // Cylindrical cutaway rubber boot wrapping ECM capsule
        const cylSleeve = new THREE.Mesh(
          new THREE.CylinderGeometry(6.6, 6.6, 6.2, 24, 1, true, Math.PI * 0.28, Math.PI * 1.44),
          mats.butylDamperRubber
        );
        cylSleeve.position.set(cx, 0, FZ);
        for (const ry of [-1.8, 0, 1.8]) {
          const ring = new THREE.Mesh(new THREE.TorusGeometry(6.85, 0.38, 8, 22, Math.PI * 1.44), mats.antiVibRubber);
          ring.rotation.x = Math.PI / 2;
          ring.rotation.z = -Math.PI * 0.22;
          ring.position.set(cx, ry, FZ);
          g.add(ring);
        }
        g.add(cylSleeve);
      }
    }

    parts.push(
      finalizeMicPart(
        'mc-oem-rubber-boot',
        8,
        '#475569',
        g,
        new THREE.Vector3(0, 1.5, 0),
        new THREE.Vector3(0, 4.5, 11.5),
        cp
      )
    );
  }

  // =========================================================================
  // MC09. Sony OEM MIC HOLDER (89100) Bracket (Ref.308 / 502790401)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Rigid twin-cradle carrier spanning both L & R shock boots + central BTITE screw lug
    const bridge = makeHorizPlate(createRoundedRectShape(43.0, 6.4, 1.6), 1.5, mats.matteBlackAnodized, 0.08);
    bridge.position.set(0, -1.6, FZ - 4.8);
    // Two cradle retention yokes embracing left & right rubber boots from rear
    for (const cx of [LX, RX]) {
      const yokeBack = new THREE.Mesh(new THREE.BoxGeometry(15.0, 6.8, 1.6), mats.matteBlackAnodized);
      yokeBack.position.set(cx, 0.8, FZ - 6.8);
      const yokeBottom = new THREE.Mesh(new THREE.BoxGeometry(15.0, 1.2, 10.6), mats.matteBlackAnodized);
      yokeBottom.position.set(cx, -2.8, FZ - 1.8);
      g.add(yokeBack, yokeBottom);
    }
    // Center mounting boss tab for Ref.309 BTITE screw
    const bossTab = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.5, 2.2, 16), mats.mountPpsInsulator);
    bossTab.position.set(0, -1.4, FZ - 1.0);
    g.add(bridge, bossTab);

    parts.push(
      finalizeMicPart(
        'mc-oem-mic-holder',
        9,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0.2, 0),
        new THREE.Vector3(0, -2.5, -13.0),
        cp
      )
    );
  }

  // =========================================================================
  // MC10. Sony OEM BTITE 1.4×5.0 mm Precision Screw (Ref.309 / 430010611)
  // =========================================================================
  {
    const g = new THREE.Group();
    const head = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.0, 0.85, 16), mats.silverElectrode);
    head.position.y = -0.4;
    const shank = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.82, 8.2, 12), mats.stainlessMachined);
    shank.position.y = 3.8;
    // Spiral thread rings visual detail
    for (let i = 0; i < 6; i++) {
      const th = new THREE.Mesh(new THREE.TorusGeometry(0.98, 0.16, 6, 12), mats.silverElectrode);
      th.rotation.x = Math.PI / 2;
      th.position.y = 1.0 + i * 1.1;
      th.userData.noEdges = true;
      g.add(th);
    }
    g.add(head, shank);

    parts.push(
      finalizeMicPart(
        'mc-oem-btite-screw',
        10,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, -2.4, FZ - 1.0),
        new THREE.Vector3(0, -9.5, -15.5),
        cp
      )
    );
  }

  // =========================================================================
  // MC11. Sony OEM TAPE (631S #25) Acoustic / Light / EMI Black Sealing Tape
  // =========================================================================
  {
    const g = new THREE.Group();
    const strip1 = makeHorizPlate(createRoundedRectShape(38.0, 6.2, 0.4), 0.26, mats.pyroGraphite, 0.02);
    strip1.position.set(0, 0, FZ - 8.2);
    const strip2 = new THREE.Mesh(new THREE.BoxGeometry(10.0, 4.8, 0.24), mats.pyroGraphite);
    strip2.position.set(-7.2, -2.2, FZ - 10.6);
    const strip3 = new THREE.Mesh(new THREE.BoxGeometry(10.0, 4.8, 0.24), mats.pyroGraphite);
    strip3.position.set(7.2, -2.2, FZ - 10.6);
    g.add(strip1, strip2, strip3);

    parts.push(
      finalizeMicPart(
        'mc-oem-631s-sealing-tape',
        11,
        '#0f172a',
        g,
        new THREE.Vector3(0, 3.8, 0),
        new THREE.Vector3(0, 7.5, -18.0),
        cp
      )
    );
  }

  // =========================================================================
  // MC12. High-Damping Poron Micro-Cellular Urethane Vibration Absorber Pad
  // =========================================================================
  {
    const g = new THREE.Group();
    const padMain = makeHorizPlate(
      createFrameShape(44.0, 24.0, 2.4, 14.0, 6.0, 1.2),
      1.35,
      mats.lensFoamSeal,
      0.1
    );
    // Acoustic anechoic wedge texture ribs on underside
    for (let i = -5; i <= 5; i++) {
      const wedge = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.55, 19.0), mats.velvetFlockTrap);
      wedge.position.set(i * 3.6, -0.82, 0);
      wedge.userData.noEdges = true;
      g.add(wedge);
    }
    g.add(padMain);

    parts.push(
      finalizeMicPart(
        'mc-chassis-vib-absorber',
        12,
        '#64748b',
        g,
        new THREE.Vector3(0, -4.4, -1.5),
        new THREE.Vector3(0, -8.5, -5.0),
        cp
      )
    );
  }

  // =========================================================================
  // LEFT CHANNEL CUTAWAY (x = -14.2): SILICON MEMS + SDM (MC13–MC20)
  // =========================================================================

  // MC13. MEMS Faraday-Cage Metal Shield Lid & Top Acoustic Port (Cutaway!)
  {
    const g = new THREE.Group();
    const W = 10.4;
    const D = 8.0;
    const H = 4.6;
    // Top roof with central circular top acoustic port hole
    const roofShape = createRoundedRectShape(W, D, 0.7);
    const portHole = new THREE.Path();
    portHole.absarc(-1.8, 0, 1.55, 0, Math.PI * 2, true);
    roofShape.holes.push(portHole);
    const roof = makeHorizPlate(roofShape, 0.52, mats.emiShieldCan, 0.04);
    roof.position.y = H * 0.5;
    // Left, Right & Back walls (Front +Z left open as CAD cutaway window!)
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(W, H, 0.5), mats.emiShieldCan);
    backWall.position.set(0, 0, -D * 0.5 + 0.25);
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, H, D), mats.emiShieldCan);
    leftWall.position.set(-W * 0.5 + 0.25, 0, 0);
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, H, D), mats.emiShieldCan);
    rightWall.position.set(W * 0.5 - 0.25, 0, 0);
    // Gold perimeter grounding rim
    const gndRim = makeHorizPlate(createFrameShape(W, D, 0.7, W - 1.0, D - 1.0, 0.4), 0.25, mats.goldPlating, 0.02);
    gndRim.position.y = -H * 0.5;
    g.add(roof, backWall, leftWall, rightWall, gndRim);

    parts.push(
      finalizeMicPart(
        'mc-mems-faraday-lid',
        13,
        '#94a3b8',
        g,
        new THREE.Vector3(LX, 2.0, FZ),
        new THREE.Vector3(-12.5, 9.2, 5.5),
        cp
      )
    );
  }

  // MC14. 0.8 μm Corrugated Polysilicon MEMS Diaphragm
  {
    const g = new THREE.Group();
    const membrane = new THREE.Mesh(new THREE.CylinderGeometry(2.65, 2.65, 0.22, 24), mats.siliconSensorDie);
    // Concentric stress-relief corrugation wave rings
    for (const r of [1.45, 2.05, 2.5]) {
      const corr = new THREE.Mesh(new THREE.TorusGeometry(r, 0.14, 8, 24), mats.siliconPhotodiode);
      corr.rotation.x = Math.PI / 2;
      corr.position.y = 0.08;
      g.add(corr);
    }
    const anchorRim = new THREE.Mesh(new THREE.TorusGeometry(2.75, 0.25, 8, 24), mats.goldPlating);
    anchorRim.rotation.x = Math.PI / 2;
    g.add(membrane, anchorRim);

    parts.push(
      finalizeMicPart(
        'mc-mems-si-diaphragm',
        14,
        '#0ea5e9',
        g,
        new THREE.Vector3(LX - 1.8, 3.05, FZ),
        new THREE.Vector3(-15.5, 6.4, 8.5),
        cp
      )
    );
  }

  // MC15. ~2 μm Capacitor Air-Gap & Si₃N₄ Anti-Stiction Micro-Dimples
  {
    const g = new THREE.Group();
    const gapRing = new THREE.Mesh(new THREE.TorusGeometry(2.65, 0.22, 10, 24), mats.opticalCementClear);
    gapRing.rotation.x = Math.PI / 2;
    // 16 instanced Si3N4 anti-stiction micro-dimple bumps preventing membrane stiction
    const dimpleGeo = new THREE.SphereGeometry(0.18, 8, 6);
    const dimpleInst = new THREE.InstancedMesh(dimpleGeo, mats.siliconNitrideBall, 16);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 16; i++) {
      const ang = (i / 16) * Math.PI * 2;
      const r = i % 2 === 0 ? 1.15 : 2.0;
      dm.position.set(Math.cos(ang) * r, 0, Math.sin(ang) * r);
      dm.updateMatrix();
      dimpleInst.setMatrixAt(i, dm.matrix);
    }
    dimpleInst.instanceMatrix.needsUpdate = true;
    dimpleInst.userData.noEdges = true;
    g.add(gapRing, dimpleInst);

    parts.push(
      finalizeMicPart(
        'mc-mems-antistiction-gap',
        15,
        '#38bdf8',
        g,
        new THREE.Vector3(LX - 1.8, 2.55, FZ),
        new THREE.Vector3(-17.0, 4.0, 10.5),
        cp
      )
    );
  }

  // MC16. Perforated Rigid Silicon Backplate Fixed Electrode
  {
    const g = new THREE.Group();
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(2.72, 2.72, 0.42, 24), mats.gatePolysilicon);
    // Honeycomb acoustic ventilation hole dots visually etched on top
    const dotGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.48, 8);
    const dotCoords: Array<[number, number]> = [[0, 0]];
    for (let ring = 1; ring <= 2; ring++) {
      const n = ring * 6;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        dotCoords.push([Math.cos(a) * ring * 0.92, Math.sin(a) * ring * 0.92]);
      }
    }
    const dotInst = new THREE.InstancedMesh(dotGeo, mats.matteBlackAnodized, dotCoords.length);
    const dm = new THREE.Object3D();
    dotCoords.forEach(([dx, dz], idx) => {
      dm.position.set(dx, 0, dz);
      dm.updateMatrix();
      dotInst.setMatrixAt(idx, dm.matrix);
    });
    dotInst.instanceMatrix.needsUpdate = true;
    dotInst.userData.noEdges = true;
    g.add(plate, dotInst);

    parts.push(
      finalizeMicPart(
        'mc-mems-perforated-backplate',
        16,
        '#eab308',
        g,
        new THREE.Vector3(LX - 1.8, 2.0, FZ),
        new THREE.Vector3(-17.5, 1.5, 10.0),
        cp
      )
    );
  }

  // MC17. Next-Gen Sealed-Dual-Membrane (SDM) Low-Pressure Vacuum Cell (72 dB SNR!)
  {
    const g = new THREE.Group();
    // Translucent cyan low-pressure sealed vacuum chamber ring + bottom second diaphragm + coupling pillars
    const vacRing = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 0.65, 22), mats.vcWorkingFluidCyan);
    const lowerDiaph = new THREE.Mesh(new THREE.CylinderGeometry(2.68, 2.68, 0.22, 22), mats.siliconLogicLayer);
    lowerDiaph.position.y = -0.4;
    // 6 mechanical coupling pillars locking upper & lower SDM membranes in push-pull motion
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const pil = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.05, 8), mats.goldPlating);
      pil.position.set(Math.cos(a) * 1.45, 0.1, Math.sin(a) * 1.45);
      pil.userData.noEdges = true;
      g.add(pil);
    }
    g.add(vacRing, lowerDiaph);

    parts.push(
      finalizeMicPart(
        'mc-mems-sdm-vacuum-cell',
        17,
        '#06b6d4',
        g,
        new THREE.Vector3(LX - 1.8, 1.25, FZ),
        new THREE.Vector3(-16.5, -1.2, 9.0),
        cp
      )
    );
  }

  // MC18. DRIE Deep-Etched Silicon Acoustic Back-Volume Cavity
  {
    const g = new THREE.Group();
    // Bulk silicon MEMS die block with vertical Bosch-process deep-etched cavity cutaway
    const dieBlock = makeHorizPlate(
      createFrameShape(5.8, 5.8, 0.4, 3.8, 3.8, 1.8),
      1.55,
      mats.siliconBulk,
      0.04
    );
    // Polished inner DRIE cavity wall liner
    const cavityLiner = new THREE.Mesh(
      new THREE.CylinderGeometry(2.05, 2.05, 1.45, 20, 1, true, Math.PI * 0.25, Math.PI * 1.5),
      mats.siliconDramLayer
    );
    g.add(dieBlock, cavityLiner);

    parts.push(
      finalizeMicPart(
        'mc-mems-drie-back-volume',
        18,
        '#334155',
        g,
        new THREE.Vector3(LX - 1.8, 0.15, FZ),
        new THREE.Vector3(-14.5, -4.0, 6.0),
        cp
      )
    );
  }

  // MC19. Co-Packaged 12 V Charge-Pump & 4th-Order ΔΣ PDM Readout ASIC Die
  {
    const g = new THREE.Group();
    const asicDie = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.15, 4.4), mats.npuSiliconDie);
    // Visible on-die functional micro-blocks: 12V Charge Pump (gold), Preamp (cyan), ΔΣ Modulator (violet)
    const pump = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.16, 1.1), mats.goldPlating);
    pump.position.set(0, 0.64, -1.35);
    const preamp = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.16, 1.1), mats.vcWorkingFluidCyan);
    preamp.position.set(0, 0.64, 0.0);
    const dsm = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.16, 1.1), mats.ispSiliconDie);
    dsm.position.set(0, 0.64, 1.35);
    g.add(asicDie, pump, preamp, dsm);

    parts.push(
      finalizeMicPart(
        'mc-mems-readout-asic',
        19,
        '#8b5cf6',
        g,
        new THREE.Vector3(LX + 2.6, 0.55, FZ),
        new THREE.Vector3(-6.5, 2.2, 10.5),
        cp
      )
    );
  }

  // MC20. φ20 μm Gold Wirebonds & Multi-Layer Ceramic LGA Substrate
  {
    const g = new THREE.Group();
    // Multi-layer ceramic/BT LGA substrate hosting both MEMS die & ASIC die
    const sub = makeHorizPlate(createRoundedRectShape(10.6, 8.2, 0.6), 0.72, mats.abfSubstrate, 0.04);
    sub.position.y = -0.36;
    // Bottom gold LGA solder pads (VDD / GND / OUT / CLK / LR)
    for (let i = -2; i <= 2; i++) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.18, 1.8), mats.goldPlating);
      pad.position.set(i * 1.9, -0.78, 2.4);
      pad.userData.noEdges = true;
      g.add(pad);
    }
    // 5 gleaming φ20 μm gold wirebond arches linking MEMS <-> ASIC <-> LGA pads!
    g.add(
      makeWirebondArch(new THREE.Vector3(-0.3, 1.8, -1.0), new THREE.Vector3(1.4, 1.2, -1.0), 1.4, 0.09, mats.goldPlating),
      makeWirebondArch(new THREE.Vector3(-0.3, 1.8, 0.2), new THREE.Vector3(1.4, 1.2, 0.2), 1.4, 0.09, mats.goldPlating),
      makeWirebondArch(new THREE.Vector3(3.8, 1.2, -1.4), new THREE.Vector3(4.5, 0.1, -2.5), 1.0, 0.09, mats.goldPlating),
      makeWirebondArch(new THREE.Vector3(3.8, 1.2, 0.0), new THREE.Vector3(4.5, 0.1, 0.0), 1.0, 0.09, mats.goldPlating),
      makeWirebondArch(new THREE.Vector3(3.8, 1.2, 1.4), new THREE.Vector3(4.5, 0.1, 2.5), 1.0, 0.09, mats.goldPlating)
    );
    g.add(sub);

    parts.push(
      finalizeMicPart(
        'mc-mems-gold-wirebonds',
        20,
        '#f59e0b',
        g,
        new THREE.Vector3(LX, -0.65, FZ),
        new THREE.Vector3(-12.0, -5.8, 4.5),
        cp
      )
    );
  }

  // =========================================================================
  // RIGHT CHANNEL CUTAWAY (x = +14.2): ELECTRET CONDENSER (ECM) (MC21–MC25)
  // =========================================================================

  // MC21. Crimped Aluminum Faraday Shield Case (240° Cutaway Cylinder!)
  {
    const g = new THREE.Group();
    const R = 5.4;
    const H = 5.2;
    const wall = new THREE.Mesh(
      new THREE.CylinderGeometry(R, R, H, 28, 1, true, Math.PI * 0.28, Math.PI * 1.44),
      mats.silverElectrode
    );
    const topRim = new THREE.Mesh(
      new THREE.RingGeometry(2.6, R, 28, 1, Math.PI * 0.28, Math.PI * 1.44),
      mats.silverElectrode
    );
    topRim.rotation.x = -Math.PI / 2;
    topRim.position.y = H * 0.5;
    // Black acoustic felt fabric behind top port
    const felt = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 0.25, 22), mats.velvetFlockTrap);
    felt.position.y = H * 0.5 - 0.18;
    // Crimped bottom flange lip
    const crimpLip = new THREE.Mesh(new THREE.TorusGeometry(R - 0.2, 0.3, 8, 24, Math.PI * 1.44), mats.stainlessMachined);
    crimpLip.rotation.x = Math.PI / 2;
    crimpLip.rotation.z = -Math.PI * 0.22;
    crimpLip.position.y = -H * 0.5;
    g.add(wall, topRim, felt, crimpLip);

    parts.push(
      finalizeMicPart(
        'mc-ecm-aluminum-case',
        21,
        '#cbd5e1',
        g,
        new THREE.Vector3(RX, 1.8, FZ),
        new THREE.Vector3(12.5, 8.8, 5.5),
        cp
      )
    );
  }

  // MC22. Gold-Sputtered PET/FEP Permanently Polarized Electret Diaphragm
  {
    const g = new THREE.Group();
    // Precision brass tension ring holding the shimmering gold-sputtered electret film
    const brassRing = new THREE.Mesh(new THREE.TorusGeometry(4.65, 0.44, 10, 26), mats.brassGear);
    brassRing.rotation.x = Math.PI / 2;
    const goldFilm = new THREE.Mesh(new THREE.CylinderGeometry(4.55, 4.55, 0.18, 26), mats.goldPlating);
    g.add(brassRing, goldFilm);

    parts.push(
      finalizeMicPart(
        'mc-ecm-electret-diaphragm',
        22,
        '#eab308',
        g,
        new THREE.Vector3(RX, 3.35, FZ),
        new THREE.Vector3(16.0, 5.6, 8.5),
        cp
      )
    );
  }

  // MC23. 25 μm White PTFE Spacer Ring & Perforated Brass Backplate
  {
    const g = new THREE.Group();
    // Crisp white 25 μm PTFE spacer ring
    const ptfeSpacer = new THREE.Mesh(new THREE.TorusGeometry(4.55, 0.34, 10, 26), mats.ceramicAlumina);
    ptfeSpacer.rotation.x = Math.PI / 2;
    ptfeSpacer.position.y = 0.38;
    // Rigid perforated brass backplate electrode
    const backplate = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.5, 0.52, 26), mats.brassGear);
    // 7 acoustic bleed perforations
    const hGeo = new THREE.CylinderGeometry(0.46, 0.46, 0.58, 10);
    const hCoords: Array<[number, number]> = [[0, 0]];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      hCoords.push([Math.cos(a) * 2.2, Math.sin(a) * 2.2]);
    }
    const hInst = new THREE.InstancedMesh(hGeo, mats.matteBlackAnodized, hCoords.length);
    const dm = new THREE.Object3D();
    hCoords.forEach(([hx, hz], idx) => {
      dm.position.set(hx, 0, hz);
      dm.updateMatrix();
      hInst.setMatrixAt(idx, dm.matrix);
    });
    hInst.instanceMatrix.needsUpdate = true;
    hInst.userData.noEdges = true;
    g.add(ptfeSpacer, backplate, hInst);

    parts.push(
      finalizeMicPart(
        'mc-ecm-ptfe-spacer-backplate',
        23,
        '#d97706',
        g,
        new THREE.Vector3(RX, 2.2, FZ),
        new THREE.Vector3(17.2, 2.0, 10.0),
        cp
      )
    );
  }

  // MC24. Insulating Plastic Chamber Cup & Copper Electrode Contact Ring
  {
    const g = new THREE.Group();
    // High-insulation white POM cup separating backplate from outer grounded aluminum can
    const insCup = new THREE.Mesh(
      new THREE.CylinderGeometry(4.8, 4.8, 1.5, 24, 1, true, Math.PI * 0.28, Math.PI * 1.44),
      mats.zifIvoryPlastic
    );
    // Copper compression contact ring carrying high-Z signal cleanly down to JFET gate
    const cuRing = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.42, 10, 24), mats.copperCoil);
    cuRing.rotation.x = Math.PI / 2;
    cuRing.position.y = -0.3;
    g.add(insCup, cuRing);

    parts.push(
      finalizeMicPart(
        'mc-ecm-insulator-cu-ring',
        24,
        '#ea580c',
        g,
        new THREE.Vector3(RX, 0.85, FZ),
        new THREE.Vector3(16.2, -1.8, 8.8),
        cp
      )
    );
  }

  // MC25. Internal Low-Noise JFET Impedance-Converter PCB (GΩ -> 2 kΩ!)
  {
    const g = new THREE.Group();
    const roundPcb = new THREE.Mesh(new THREE.CylinderGeometry(4.95, 4.95, 0.72, 26), mats.hdiMainboardPcb);
    // SOT-23 ultra-low-noise JFET transistor (2SK596 class)
    const jfet = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.95, 1.5), mats.icEpoxy);
    jfet.position.set(0, 0.82, 0);
    // 10 pF & 33 pF internal RF bypass MLCC capacitors
    for (const cx of [-2.2, 2.2]) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.65, 0.75), mats.smdCeramic);
      cap.position.set(cx, 0.65, 0.6);
      g.add(cap);
    }
    // Bottom concentric gold solder pads (+Signal / GND)
    const padOuter = new THREE.Mesh(new THREE.TorusGeometry(3.7, 0.55, 8, 24), mats.goldPlating);
    padOuter.rotation.x = Math.PI / 2;
    padOuter.position.y = -0.38;
    const padCenter = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.18, 16), mats.goldPlating);
    padCenter.position.y = -0.4;
    g.add(roundPcb, jfet, padOuter, padCenter);

    parts.push(
      finalizeMicPart(
        'mc-ecm-jfet-pcb',
        25,
        '#15803d',
        g,
        new THREE.Vector3(RX, -0.55, FZ),
        new THREE.Vector3(12.5, -5.8, 4.5),
        cp
      )
    );
  }

  // =========================================================================
  // MC26. 3rd Capsule: ZV-E1 3-Capsule Directional / α1 II Rear Voice-Memo Mic
  // =========================================================================
  {
    const g = new THREE.Group();
    const rubberRing = new THREE.Mesh(new THREE.CylinderGeometry(5.6, 5.6, 4.2, 24), mats.antiVibRubber);
    const capsuleCan = new THREE.Mesh(new THREE.CylinderGeometry(4.4, 4.4, 4.5, 24), mats.emiShieldCan);
    capsuleCan.position.y = 0.25;
    const topGoldMesh = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 0.28, 22), mats.goldPlating);
    topGoldMesh.position.y = 2.58;
    // Directional phase-port rear acoustic slot ring (cardioid polar pattern!)
    const rearSlot = new THREE.Mesh(new THREE.TorusGeometry(4.55, 0.32, 8, 22), mats.vcWorkingFluidCyan);
    rearSlot.rotation.x = Math.PI / 2;
    rearSlot.position.y = 1.0;
    g.add(rubberRing, capsuleCan, topGoldMesh, rearSlot);

    parts.push(
      finalizeMicPart(
        'mc-rear-3rd-voicememo-capsule',
        26,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 1.6, -12.5),
        new THREE.Vector3(0, 4.0, -21.0),
        cp
      )
    );
  }

  // =========================================================================
  // BOTTOM SIGNAL & 2025–2026 AI AUDIO PROCESSING STACK (MC27–MC32)
  // =========================================================================

  // MC27. Sony OEM SH-1035 Shielded Differential Top-Deck Flex (Ref.307 / A5033450A)
  {
    const g = new THREE.Group();
    // Main Y-shaped amber polyimide flex collecting L MEMS, R ECM, and Rear 3rd capsule
    const crossbar = makeHorizPlate(createRoundedRectShape(37.0, 5.4, 1.4), 0.36, mats.polyimideFpc, 0.03);
    crossbar.position.set(0, 0, FZ);
    const stemRear = makeHorizPlate(createRoundedRectShape(6.2, 18.0, 1.0), 0.36, mats.polyimideFpc, 0.03);
    stemRear.position.set(0, 0, -4.5);
    // Silver conductive EMI shielding film laminated along center trunk
    const emiLayer = makeHorizPlate(createRoundedRectShape(24.0, 4.2, 0.8), 0.14, mats.emiShieldFilm, 0.02);
    emiLayer.position.set(0, 0.24, FZ);
    // Differential shielded trace pairs (L+/L-, R+/R-)
    for (const tz of [FZ - 0.8, FZ + 0.8]) {
      const tr = new THREE.Mesh(new THREE.BoxGeometry(31.0, 0.08, 0.35), mats.goldPlating);
      tr.position.set(0, 0.32, tz);
      tr.userData.noEdges = true;
      g.add(tr);
    }
    // Downward ribbon drop into mainboard audio input
    const dropLeg = new THREE.Mesh(new THREE.BoxGeometry(8.6, 5.2, 0.38), mats.polyimideFpc);
    dropLeg.position.set(0, -2.6, 6.2);
    g.add(crossbar, stemRear, emiLayer, dropLeg);

    parts.push(
      finalizeMicPart(
        'mc-sh1035-diff-flex',
        27,
        '#d97706',
        g,
        new THREE.Vector3(0, -6.2, 0),
        new THREE.Vector3(0, -12.0, 0),
        cp
      )
    );
  }

  // MC28. RF Ferrite Bead EMI Chokes & Audio-Grade C0G/ESD Filter Network
  {
    const g = new THREE.Group();
    const subPcb = makeHorizPlate(createRoundedRectShape(17.5, 11.0, 1.0), 0.78, mats.hdiMainboardPcb, 0.04);
    // 4 GHz-band ferrite EMI beads blocking Wi-Fi 6E / 5G TDMA buzz
    for (let i = 0; i < 4; i++) {
      const bead = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.25, 1.7), mats.ferriteInductor);
      bead.position.set(-5.2 + i * 3.45, 0.96, 2.2);
      g.add(bead);
    }
    // Zero-microphonic C0G/NP0 ceramic audio filter caps + ESD TVS diodes
    for (let i = 0; i < 4; i++) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.82, 1.4), mats.tantalumCapYellow);
      cap.position.set(-5.2 + i * 3.45, 0.78, -2.0);
      g.add(cap);
    }
    g.add(subPcb);

    parts.push(
      finalizeMicPart(
        'mc-rf-ferrite-esd-filter',
        28,
        '#475569',
        g,
        new THREE.Vector3(-12.2, -9.2, 4.2),
        new THREE.Vector3(-14.5, -17.0, 6.5),
        cp
      )
    );
  }

  // MC29. 24-bit / 48 kHz LPCM Stereo Audio Codec, Low-Noise PGA & ΔΣ ADC
  {
    const g = new THREE.Group();
    const subPcb = makeHorizPlate(createRoundedRectShape(17.5, 11.0, 1.0), 0.78, mats.hdiMainboardPcb, 0.04);
    // Flagship QFN 24-bit Audio Codec IC
    const codecIc = new THREE.Mesh(new THREE.BoxGeometry(6.8, 1.35, 6.8), mats.ispSiliconDie);
    codecIc.position.set(-1.5, 1.05, 0);
    // Clean MICBIAS LDO + precision audio crystal oscillator (24.576 MHz)
    const xtal = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.95, 2.6), mats.goldPlating);
    xtal.position.set(5.0, 0.85, 2.0);
    const ldo = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.9, 2.4), mats.icEpoxy);
    ldo.position.set(5.0, 0.82, -2.2);
    g.add(subPcb, codecIc, xtal, ldo);

    parts.push(
      finalizeMicPart(
        'mc-audio-codec-adc-pga',
        29,
        '#0284c7',
        g,
        new THREE.Vector3(12.2, -9.2, 4.2),
        new THREE.Vector3(14.5, -17.0, 6.5),
        cp
      )
    );
  }

  // MC30. Real-Time Wind-Cut Digital High-Pass Filter (HPF / Coherence Detector)
  {
    const g = new THREE.Group();
    const subPcb = makeHorizPlate(createRoundedRectShape(16.5, 10.5, 1.0), 0.78, mats.hdiMainboardPcb, 0.04);
    const hpfDie = new THREE.Mesh(new THREE.BoxGeometry(6.2, 1.25, 5.4), mats.cfaBlue);
    hpfDie.position.set(0, 1.0, 0);
    // Stepped filter frequency-slope visual indicator bars on die top
    for (let i = 0; i < 4; i++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.3 + i * 0.28, 3.6), mats.vcWorkingFluidCyan);
      bar.position.set(-2.1 + i * 1.4, 1.7 + i * 0.14, 0);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    g.add(subPcb, hpfDie);

    parts.push(
      finalizeMicPart(
        'mc-windcut-hpf-circuit',
        30,
        '#2563eb',
        g,
        new THREE.Vector3(-12.2, -9.2, -9.5),
        new THREE.Vector3(-14.5, -20.5, -10.5),
        cp
      )
    );
  }

  // MC31. Multi-Capsule Phase-Delay Beamforming & Face-Tracking Directivity DSP
  {
    const g = new THREE.Group();
    const subPcb = makeHorizPlate(createRoundedRectShape(16.5, 10.5, 1.0), 0.78, mats.hdiMainboardPcb, 0.04);
    const dspDie = new THREE.Mesh(new THREE.BoxGeometry(6.6, 1.3, 5.8), mats.vcWorkingFluidCyan);
    dspDie.position.set(0, 1.02, 0);
    // 3 directional phase-array lobes sculpted on top representing Front / Rear / Omni beamforming
    const frontLobe = new THREE.Mesh(new THREE.ConeGeometry(1.5, 2.8, 12), mats.goldPlating);
    frontLobe.rotation.x = Math.PI / 2;
    frontLobe.position.set(0, 2.0, 1.2);
    const rearLobe = new THREE.Mesh(new THREE.ConeGeometry(1.1, 2.1, 12), mats.cfaGreen);
    rearLobe.rotation.x = -Math.PI / 2;
    rearLobe.position.set(0, 2.0, -1.2);
    g.add(subPcb, dspDie, frontLobe, rearLobe);

    parts.push(
      finalizeMicPart(
        'mc-beamforming-phase-dsp',
        31,
        '#06b6d4',
        g,
        new THREE.Vector3(12.2, -9.2, -9.5),
        new THREE.Vector3(14.5, -20.5, -10.5),
        cp
      )
    );
  }

  // MC32. 2025–2026 BIONZ XR2 In-Camera AI Audio Noise Cut & Smart AGC Engine
  {
    const g = new THREE.Group();
    const carrier = makeHorizPlate(createRoundedRectShape(26.0, 14.0, 1.6), 1.05, mats.abfSubstrate, 0.06);
    // BIONZ XR2 integrated neural audio DSP core
    const aiCore = new THREE.Mesh(new THREE.BoxGeometry(11.6, 1.6, 8.2), mats.npuSiliconDie);
    aiCore.position.set(0, 1.3, 0);
    // 3×3 glowing systolic neural audio separation tiles on top
    const tileGeo = new THREE.BoxGeometry(2.6, 0.25, 1.9);
    const tileInst = new THREE.InstancedMesh(tileGeo, mats.goldPlating, 9);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let ix = -1; ix <= 1; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        dm.position.set(ix * 3.3, 2.2, iz * 2.35);
        dm.updateMatrix();
        tileInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    tileInst.instanceMatrix.needsUpdate = true;
    tileInst.userData.noEdges = true;
    // Gold perimeter BGA contact rim
    const goldRim = makeHorizPlate(createFrameShape(24.0, 12.2, 1.2, 21.8, 10.0, 0.8), 0.24, mats.goldPlating, 0.02);
    goldRim.position.y = -0.62;
    g.add(carrier, aiCore, tileInst, goldRim);

    parts.push(
      finalizeMicPart(
        'mc-ai-noise-cut-agc',
        32,
        '#7c3aed',
        g,
        new THREE.Vector3(0, -12.2, -2.5),
        new THREE.Vector3(0, -26.5, -3.0),
        cp
      )
    );
  }

  return parts;
}
