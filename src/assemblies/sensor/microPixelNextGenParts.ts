//@FLOW_MAP|file=src/assemblies/sensor/microPixelNextGenParts.ts|unit=sensor|lines=1154|exports=buildMicroPixelNextGenParts
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

function finalizeMicroNextGenPart(
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
    subsystem: 'micro',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset: explodeOffset.clone(),
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
    standaloneOnly: true,
  };
}

/**
 * Phase 23 — 25 Standalone-Only Next-Gen Photodiode & Pixel Nanoscale Anatomy Layers (M51–M75 -> 75 total).
 * Strictly visible ONLY in standalone 'micro' mode; omitted completely in whole-camera views.
 * Scale: 2x2 pixel cross-section arrayW = 22.0 CAD units (1 pixel = 11.0), optical axis +Z -> -Z.
 */
export function buildMicroPixelNextGenParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const P = 11.0;
  const halfP = P / 2;
  const arrayW = P * 2; // 22.0
  const quadrants: Array<[number, number]> = [
    [-halfP, halfP],
    [halfP, halfP],
    [-halfP, -halfP],
    [halfP, -halfP],
  ];

  // =========================================================================
  // M51. Metaphotonic Color Router / Sub-Wavelength SiN Nano-Prism Array (MPCR)
  // =========================================================================
  {
    const g = new THREE.Group();
    const baseSub = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW - 0.4, arrayW - 0.4, 0.22),
      mats.opticalCementClear
    );
    g.add(baseSub);

    // Sub-wavelength varied-width SiN meta-atom nanopillars routing R / G / B without absorption
    const pillarMats = [mats.cfaRed, mats.cfaGreen, mats.cfaGreen, mats.cfaBlue];
    quadrants.forEach(([qx, qy], qi) => {
      const pMat = pillarMats[qi];
      for (let ix = -1; ix <= 1; ix++) {
        for (let iy = -1; iy <= 1; iy++) {
          const w = 0.72 + ((Math.abs(ix) + Math.abs(iy)) % 3) * 0.28;
          const h = 1.05 + ((ix + iy + qi + 4) % 3) * 0.24;
          const pillar = new THREE.Mesh(new THREE.BoxGeometry(w, w, h), pMat);
          pillar.position.set(qx + ix * 2.8, qy + iy * 2.8, 0.11 + h * 0.5);
          pillar.userData.noEdges = true;
          g.add(pillar);
        }
      }
      // Central prism deflector ridge for dual-PD phase focus
      const ridge = new THREE.Mesh(
        new THREE.BoxGeometry(8.2, 0.48, 0.65),
        mats.nanoArIridescent
      );
      ridge.position.set(qx, qy, 0.44);
      g.add(ridge);
    });

    parts.push(
      finalizeMicroNextGenPart(
        'micro-mpcr-color-router',
        51,
        '#a855f7',
        g,
        new THREE.Vector3(0, 0, 14.2),
        new THREE.Vector3(-34, 28, 36.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M52. On-Chip 4-Directional Air-Gap Nanowire-Grid Polarizer (Polarsens 0/45/90/135 deg)
  // =========================================================================
  {
    const g = new THREE.Group();
    const frame = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW, arrayW, 0.35, arrayW - 1.2, arrayW - 1.2, 0.25), 0.42, 0.04, 0.04, 8),
      mats.tungstenGrid
    );
    const crossH = new THREE.Mesh(new THREE.BoxGeometry(arrayW - 0.8, 0.42, 0.42), mats.tungstenGrid);
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.42, arrayW - 0.8, 0.42), mats.tungstenGrid);
    g.add(frame, crossH, crossV);

    // 4 pixel quadrants with 0°, 45°, 90°, 135° parallel metallic nanowire grids
    const angles = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4];
    quadrants.forEach(([qx, qy], qi) => {
      const qGrp = new THREE.Group();
      qGrp.position.set(qx, qy, 0);
      qGrp.rotation.z = angles[qi];
      for (let i = -3; i <= 3; i++) {
        const len = qi % 2 === 1 ? Math.max(2.6, 8.6 - Math.abs(i) * 1.45) : 8.6;
        const wire = new THREE.Mesh(
          new THREE.BoxGeometry(len, 0.24, 0.32),
          mats.silverElectrode
        );
        wire.position.set(0, i * 1.12, 0);
        wire.userData.noEdges = true;
        qGrp.add(wire);
      }
      g.add(qGrp);
    });

    parts.push(
      finalizeMicroNextGenPart(
        'micro-polarsens-wiregrid',
        52,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, 11.8),
        new THREE.Vector3(35, 28, 30.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M53. Low-n Air-Gap Composite Optical Isolation Grid (IISW 2025 Airgrid)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Outer translucent SiO2 twin-shell walls enclosing hollow n=1.0 air-gap TIR cavities
    const outerShell = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW + 0.4, arrayW + 0.4, 0.3, arrayW - 1.0, arrayW - 1.0, 0.22), 1.35, 0.04, 0.04, 8),
      mats.ftiOxide
    );
    g.add(outerShell);

    // Twin-wall hollow crossbars (air channel runs cleanly between the two SiO2 side shells)
    for (const off of [-0.36, 0.36]) {
      const wallH = new THREE.Mesh(new THREE.BoxGeometry(arrayW - 0.8, 0.16, 1.32), mats.ftiOxide);
      wallH.position.set(0, off, 0);
      const wallV = new THREE.Mesh(new THREE.BoxGeometry(0.16, arrayW - 0.8, 1.32), mats.ftiOxide);
      wallV.position.set(off, 0, 0);
      g.add(wallH, wallV);
    }
    // Glowing cyan air-cavity indicator ribbons inside the twin walls + bottom tungsten cap
    const airH = new THREE.Mesh(new THREE.BoxGeometry(arrayW - 1.0, 0.38, 0.95), mats.fluorineCoatCyan);
    const airV = new THREE.Mesh(new THREE.BoxGeometry(0.38, arrayW - 1.0, 0.95), mats.fluorineCoatCyan);
    const capH = new THREE.Mesh(new THREE.BoxGeometry(arrayW - 0.8, 0.65, 0.18), mats.tungstenGrid);
    capH.position.z = -0.66;
    const capV = new THREE.Mesh(new THREE.BoxGeometry(0.65, arrayW - 0.8, 0.18), mats.tungstenGrid);
    capV.position.z = -0.66;
    g.add(airH, airV, capH, capV);

    parts.push(
      finalizeMicroNextGenPart(
        'micro-airgap-optical-grid',
        53,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 9.5),
        new THREE.Vector3(-38, 8, 22.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M54. In-Pixel Inner Focusing Lens & High-Index SiN Optical Waveguide Funnel
  // =========================================================================
  {
    const g = new THREE.Group();
    const cladPlate = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW - 0.2, arrayW - 0.2, 0.3, arrayW - 1.8, arrayW - 1.8, 0.22), 0.35, 0.04, 0.04, 8),
      mats.interlayerDielectric
    );
    g.add(cladPlate);

    for (const [qx, qy] of quadrants) {
      // Tapered SiN high-index light-pipe funnel guiding steep F1.2 rays into PD center
      const funnel = new THREE.Mesh(
        new THREE.CylinderGeometry(4.1, 2.75, 1.35, 20, 1, false).rotateX(Math.PI / 2),
        mats.lensXaGlass
      );
      funnel.position.set(qx, qy, 0);
      // Secondary miniature convex inner focusing lens capping the funnel entrance
      const innerDome = new THREE.Mesh(
        new THREE.SphereGeometry(3.85, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.36).rotateX(Math.PI / 2),
        mats.microlensGlass
      );
      innerDome.scale.set(1, 1, 0.45);
      innerDome.position.set(qx, qy, 0.52);
      innerDome.userData.noEdges = true;
      // Reflective rim collar
      const rim = new THREE.Mesh(
        new THREE.TorusGeometry(4.15, 0.16, 6, 20),
        mats.nanoArIridescent
      );
      rim.position.set(qx, qy, 0.65);
      rim.userData.noEdges = true;
      g.add(funnel, innerDome, rim);
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-inner-sublens-waveguide',
        54,
        '#60a5fa',
        g,
        new THREE.Vector3(0, 0, 7.8),
        new THREE.Vector3(38, 8, 17.5),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M55. Transparent ITO Top Electrode & Organic Photoconductive Film (OPF)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Upper transparent ITO bias electrode sheet
    const itoSheet = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW - 0.3, arrayW - 0.3, 0.18),
      mats.fluorineCoatCyan
    );
    itoSheet.position.z = 0.42;
    // Active Organic Photoconductive Film (OPF) absorbing visible RGB while transmitting NIR
    const opfLayer = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW - 0.5, arrayW - 0.5, 0.48),
      mats.makeupSealViolet
    );
    opfLayer.position.z = 0.05;
    g.add(itoSheet, opfLayer);

    // 4 pixel charge-collection metal electrodes & vertical micro-vias beneath the organic film
    for (const [qx, qy] of quadrants) {
      const colPad = new THREE.Mesh(
        new THREE.BoxGeometry(7.8, 7.8, 0.16),
        mats.goldPlating
      );
      colPad.position.set(qx, qy, -0.32);
      const via = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.55, 0.55, 12).rotateX(Math.PI / 2),
        mats.copperHybridBond
      );
      via.position.set(qx + 2.6, qy - 2.6, -0.58);
      via.userData.noEdges = true;
      g.add(colPad, via);
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-opf-organic-film',
        55,
        '#c026d3',
        g,
        new THREE.Vector3(0, 0, 10.2),
        new THREE.Vector3(36, -24, 25.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M56. Backside Silicon Inverted Pyramid Array (IPA) Light-Trapping Texture
  // =========================================================================
  {
    const g = new THREE.Group();
    const siBase = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW - 0.4, arrayW - 0.4, 0.32),
      mats.siliconPhotodiode
    );
    siBase.position.z = -0.22;
    g.add(siBase);

    // 4x4 grid of sharp 54.7-deg crystalline silicon inverted pyramids per array (4 per pixel)
    for (let ix = -1.5; ix <= 1.5; ix += 1.0) {
      for (let iy = -1.5; iy <= 1.5; iy += 1.0) {
        // 4-sided pyramid (ConeGeometry with 4 radial segments) pointing -Z into silicon
        const pyr = new THREE.Mesh(
          new THREE.ConeGeometry(2.35, 1.15, 4).rotateX(-Math.PI / 2).rotateZ(Math.PI / 4),
          mats.nanoArIridescent
        );
        pyr.position.set(ix * 5.2, iy * 5.2, 0.32);
        g.add(pyr);
      }
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-inverted-pyramid-array',
        56,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, 5.45),
        new THREE.Vector3(-36, -24, 15.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M57. MBE Atomic-Monolayer Boron Delta-Doped Passivation Film (NASA JPL)
  // =========================================================================
  {
    const g = new THREE.Group();
    const mbeCap = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW - 0.2, arrayW - 0.2, 0.16),
      mats.vcWorkingFluidCyan
    );
    g.add(mbeCap);

    // 6x6 atomic boron sheet monolayer lattice beads embedded 1.5nm below backside Si surface
    for (let ix = -2.5; ix <= 2.5; ix += 1.0) {
      for (let iy = -2.5; iy <= 2.5; iy += 1.0) {
        const atom = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.42, 0),
          mats.aluminaHighKFilm
        );
        atom.position.set(ix * 3.4, iy * 3.4, 0.1);
        atom.userData.noEdges = true;
        g.add(atom);
      }
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-delta-doped-monolayer',
        57,
        '#2dd4bf',
        g,
        new THREE.Vector3(0, 0, 6.25),
        new THREE.Vector3(0, -34, 16.5),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M58. High-Resistivity Thick P-Epitaxial Absorption Layer & Full Depletion Zone
  // =========================================================================
  {
    const g = new THREE.Group();
    // Outer translucent thick crystalline P-epi silicon slab
    const epiFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW + 0.2, arrayW + 0.2, 0.35, arrayW - 1.4, arrayW - 1.4, 0.25), 2.8, 0.05, 0.05, 8),
      mats.siliconBulk
    );
    g.add(epiFrame);

    // 4 luminous translucent vertical space-charge depletion columns extending full epi thickness
    for (const [qx, qy] of quadrants) {
      const depCol = new THREE.Mesh(
        new THREE.BoxGeometry(8.6, 8.6, 2.45),
        mats.siliconDepletion
      );
      depCol.position.set(qx, qy, 0);
      // Electric-field vertical guide pillars inside depletion volume
      const coreBeam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.75, 0.75, 2.65, 12).rotateX(Math.PI / 2),
        mats.fluorineCoatCyan
      );
      coreBeam.position.set(qx, qy, 0);
      coreBeam.userData.noEdges = true;
      g.add(depCol, coreBeam);
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-thick-pepi-depletion',
        58,
        '#3b82f6',
        g,
        new THREE.Vector3(0, 0, 3.1),
        new THREE.Vector3(38, -10, 6.5),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M59. Multi-Energy Graded N1/N2/N3 Photodiode Potential Ramp (Zero-Lag Slope)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [qx, qy] of quadrants) {
      // N1: Shallow wide light-collection implant zone
      const n1 = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(8.8, 8.8, 1.2), 0.52, 0.04, 0.04, 8),
        mats.mountShimBlue
      );
      n1.position.set(qx, qy, 0.55);
      // N2: Mid-depth narrower higher-dose funnel stepping toward transfer gate corner
      const n2 = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(6.2, 6.2, 0.9), 0.56, 0.04, 0.04, 8),
        mats.varistorRingBlue
      );
      n2.position.set(qx + (qx > 0 ? -0.9 : 0.9), qy + (qy > 0 ? -0.9 : 0.9), 0.0);
      // N3: Deepest highest-potential collector throat right next to the transfer gate
      const n3 = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(3.5, 3.5, 0.6), 0.62, 0.04, 0.04, 8),
        mats.siliconPhotodiode
      );
      n3.position.set(qx + (qx > 0 ? -2.0 : 2.0), qy + (qy > 0 ? -2.0 : 2.0), -0.58);
      g.add(n1, n2, n3);
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-graded-pd-doping',
        59,
        '#2563eb',
        g,
        new THREE.Vector3(0, 0, 1.9),
        new THREE.Vector3(-38, -8, 3.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M60. Dual-Depth & Partially Removed Front-DTI (PR-FDTI Hybrid Trench Wall)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-depth outer perimeter FDTI barrier blocking adjacent-color crosstalk
    const outerDeep = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW + 0.5, arrayW + 0.5, 0.25, arrayW - 0.6, arrayW - 0.6, 0.18), 3.1, 0.04, 0.04, 8),
      mats.ftiOxide
    );
    g.add(outerDeep);

    // Shallow upper-half partially removed center cross-trench leaving an open charge-sharing bridge below
    const shallowH = new THREE.Mesh(new THREE.BoxGeometry(arrayW - 0.8, 0.45, 1.35), mats.aluminaHighKFilm);
    shallowH.position.set(0, 0, 0.85);
    const shallowV = new THREE.Mesh(new THREE.BoxGeometry(0.45, arrayW - 0.8, 1.35), mats.aluminaHighKFilm);
    shallowV.position.set(0, 0, 0.85);
    // Open bridge highlight bars along the lower removed trench floor
    const bridgeCore = new THREE.Mesh(new THREE.BoxGeometry(6.4, 6.4, 0.36), mats.siliconDepletion);
    bridgeCore.position.set(0, 0, -0.75);
    g.add(shallowH, shallowV, bridgeCore);

    parts.push(
      finalizeMicroNextGenPart(
        'micro-dual-depth-pr-fdti',
        60,
        '#0284c7',
        g,
        new THREE.Vector3(0, 0, 2.15),
        new THREE.Vector3(-38, 22, 7.0),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // M61. Plasma Doping (PLAD B2H6) Conformal Boron DTI Sidewall Liner
  // =========================================================================
  {
    const g = new THREE.Group();
    // Conformal teal-emerald P+ boron liner sleeves coating every DTI vertical sidewall
    const perimLiner = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW - 0.55, arrayW - 0.55, 0.22, arrayW - 1.15, arrayW - 1.15, 0.15), 2.75, 0.03, 0.03, 8),
      mats.vcWorkingFluidCyan
    );
    g.add(perimLiner);

    for (const [qx, qy] of quadrants) {
      const cellLiner = new THREE.Mesh(
        extrudeCentered(createFrameShape(9.4, 9.4, 0.25, 8.85, 8.85, 0.16), 2.65, 0.03, 0.03, 8),
        mats.vcWorkingFluidCyan
      );
      cellLiner.position.set(qx, qy, 0);
      g.add(cellLiner);
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-plad-boron-liner',
        61,
        '#14b8a6',
        g,
        new THREE.Vector3(0, 0, 2.6),
        new THREE.Vector3(0, 36, 11.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M62. Asymmetric Dual-Size Split Photodiode (Large-PD + Small-PD HDR / LFM)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [qx, qy] of quadrants) {
      // Giant high-sensitivity Main Photodiode (SP1) occupying ~80% of pixel area
      const mainPd = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(7.2, 8.6, 0.65), 1.45, 0.05, 0.05, 8),
        mats.siliconPhotodiode
      );
      mainPd.position.set(qx - 1.15, qy, 0);
      // Compact high-tolerance Sub Photodiode (SP2) tucked in right corner for 130dB HDR & LFM
      const subPd = new THREE.Mesh(
        new THREE.CylinderGeometry(1.45, 1.45, 1.42, 8).rotateX(Math.PI / 2),
        mats.tantalumCapYellow
      );
      subPd.position.set(qx + 3.45, qy + 2.35, 0);
      // Isolation divider trench between SP1 & SP2
      const sep = new THREE.Mesh(new THREE.BoxGeometry(0.32, 3.8, 1.52), mats.ftiOxide);
      sep.position.set(qx + 2.25, qy + 2.35, 0);
      // Sub-PD overflow capacitor pad beneath SP2
      const subCap = new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.8, 0.72), mats.loficDielectric);
      subCap.position.set(qx + 3.45, qy - 2.1, -0.3);
      g.add(mainPd, subPd, sep, subCap);
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-split-pd-lfm-hdr',
        62,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, 1.25),
        new THREE.Vector3(38, 20, 2.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M63. 3D Twisted Charge-Transfer Photodiode for All-Directional AF (Canon IISW 2025)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [qx, qy] of quadrants) {
      // 4 stacked rotated charge-channel slices twisting smoothly 90° from top (+Z) to bottom (-Z)
      const steps = 4;
      for (let s = 0; s < steps; s++) {
        const t = s / (steps - 1);
        const z = 0.9 - t * 1.8;
        const rot = t * (Math.PI / 2);
        const sliceGrp = new THREE.Group();
        sliceGrp.position.set(qx, qy, z);
        sliceGrp.rotation.z = rot;

        const halfA = new THREE.Mesh(
          new THREE.BoxGeometry(7.6, 3.3, 0.42),
          mats.siliconPhotodiode
        );
        halfA.position.y = 1.95;
        const halfB = new THREE.Mesh(
          new THREE.BoxGeometry(7.6, 3.3, 0.42),
          mats.varistorRingBlue
        );
        halfB.position.y = -1.95;
        const twistWall = new THREE.Mesh(
          new THREE.BoxGeometry(7.8, 0.28, 0.46),
          mats.goldPlating
        );
        sliceGrp.add(halfA, halfB, twistWall);
        g.add(sliceGrp);
      }
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-twisted-af-pd',
        63,
        '#8b5cf6',
        g,
        new THREE.Vector3(0, 0, 0.65),
        new THREE.Vector3(-38, -28, -0.5),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // M64. Backside P++ Contact Grid & Reverse Substrate Bias (V_sub) Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW + 1.2, arrayW + 1.2, 0.35, arrayW - 0.4, arrayW - 0.4, 0.25), 0.34, 0.04, 0.04, 8),
      mats.goldPlating
    );
    const busH = new THREE.Mesh(new THREE.BoxGeometry(arrayW + 0.6, 0.32, 0.28), mats.goldPlating);
    const busV = new THREE.Mesh(new THREE.BoxGeometry(0.32, arrayW + 0.6, 0.28), mats.goldPlating);
    g.add(ring, busH, busV);

    // 8 backside ohmic contact tabs around the perimeter frame
    for (const [tx, ty] of [
      [-10.8, 6],
      [-10.8, -6],
      [10.8, 6],
      [10.8, -6],
      [-6, 10.8],
      [6, 10.8],
      [-6, -10.8],
      [6, -10.8],
    ]) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 0.46), mats.copperHybridBond);
      pad.position.set(tx, ty, 0.05);
      pad.userData.noEdges = true;
      g.add(pad);
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-backside-vsub-ring',
        64,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, 4.2),
        new THREE.Vector3(38, -30, 12.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M65. Ultra-Thin 7nm Thermal Gate Oxide & Buried-Channel Transfer Gate
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [qx, qy] of quadrants) {
      // 7nm high-purity SiO2/SiON gate dielectric slab
      const gateOx = new THREE.Mesh(
        new THREE.BoxGeometry(5.6, 3.2, 0.16),
        mats.fluorineCoatCyan
      );
      gateOx.position.set(qx, qy, 0.18);
      // Polysilicon transfer gate electrode riding directly over gate oxide
      const polyGate = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(5.2, 2.7, 0.3), 0.44, 0.04, 0.04, 8),
        mats.gatePolysilicon
      );
      polyGate.position.set(qx, qy, -0.14);
      // Buried N-channel subterranean electron bridge beneath the oxide
      const buriedCh = new THREE.Mesh(
        new THREE.BoxGeometry(4.8, 1.6, 0.28),
        mats.siliconDepletion
      );
      buriedCh.position.set(qx, qy, 0.44);
      g.add(gateOx, polyGate, buriedCh);
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-tg-gate-oxide',
        65,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, -0.85),
        new THREE.Vector3(0, 36, -3.5),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // M66. Fossum Pump-Gate Distal FD Single-Photon Counting Sense Node (QIS / Jot)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Shared distal tiny Floating Diffusion center pillar (near-zero overlap capacitance -> 423 uV/e-)
    const distalFd = new THREE.Mesh(
      new THREE.CylinderGeometry(1.15, 0.95, 1.35, 16).rotateX(Math.PI / 2),
      mats.gMasterRedBadge
    );
    const fdContact = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.45, 0.9, 12).rotateX(Math.PI / 2),
      mats.goldPlating
    );
    fdContact.position.z = -0.85;
    g.add(distalFd, fdContact);

    // 4 tapered pump-gate arms & stepped virtual barriers feeding single photoelectrons into distal FD
    for (const [qx, qy] of quadrants) {
      const sx = qx > 0 ? 1 : -1;
      const sy = qy > 0 ? 1 : -1;
      const pumpArm = new THREE.Mesh(
        new THREE.BoxGeometry(3.8, 1.4, 0.42),
        mats.gatePolysilicon
      );
      pumpArm.position.set(sx * 3.8, sy * 3.8, 0.1);
      pumpArm.rotation.z = sx * sy > 0 ? Math.PI / 4 : -Math.PI / 4;
      // Virtual barrier bridge physically separating TG from Distal FD
      const vb = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 1.1, 0.32),
        mats.aluminaHighKFilm
      );
      vb.position.set(sx * 2.0, sy * 2.0, 0.25);
      vb.rotation.z = pumpArm.rotation.z;
      g.add(pumpArm, vb);
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-pump-gate-qis',
        66,
        '#f43f5e',
        g,
        new THREE.Vector3(0, 0, -1.55),
        new THREE.Vector3(-36, 30, -5.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M67. Charge-Domain Global Shutter Shielded Storage Diode (SD) & SG / TX2
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [qx, qy] of quadrants) {
      // Deep shielded auxiliary N-well Storage Diode pocket
      const sdPocket = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(4.4, 7.6, 0.5), 1.05, 0.04, 0.04, 8),
        mats.siliconPhotodiode
      );
      sdPocket.position.set(qx + 2.4, qy, 0);
      // Heavy tungsten optical shield roof over the storage diode (PLS < -85 dB)
      const wShield = new THREE.Mesh(
        new THREE.BoxGeometry(5.0, 8.2, 0.26),
        mats.tungstenLightShield
      );
      wShield.position.set(qx + 2.4, qy, 0.68);
      // Negative-biased Storage Gate (SG) pinning strip + TX2 readout transfer gate
      const sgBar = new THREE.Mesh(new THREE.BoxGeometry(3.6, 4.2, 0.28), mats.gatePolysilicon);
      sgBar.position.set(qx + 2.4, qy + 1.1, -0.66);
      const tx2Bar = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.5, 0.32), mats.goldPlating);
      tx2Bar.position.set(qx + 2.4, qy - 2.6, -0.66);
      g.add(sdPocket, wShield, sgBar, tx2Bar);
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-gs-storage-diode',
        67,
        '#475569',
        g,
        new THREE.Vector3(0, 0, -2.35),
        new THREE.Vector3(38, 30, -7.5),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // M68. Triple Conversion Gain (TCG) & Multi-Stage FC + MOM EC Capacitor Bank
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [qx, qy] of quadrants) {
      // Stage 1: Tiny HCG switch node
      const hcgNode = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 0.36), mats.goldPlating);
      hcgNode.position.set(qx - 2.9, qy + 2.4, 0.15);
      // Stage 2: Mid MOS Floating Capacitor (FC)
      const fcCap = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(3.6, 3.2, 0.3), 0.44, 0.04, 0.04, 8),
        mats.loficDielectric
      );
      fcCap.position.set(qx + 1.4, qy + 2.2, 0.12);
      // Stage 3: Interdigitated multi-finger Copper MOM Extra Capacitor (EC)
      const ecBase = new THREE.Mesh(new THREE.BoxGeometry(7.8, 3.4, 0.22), mats.interlayerDielectric);
      ecBase.position.set(qx, qy - 2.2, -0.05);
      g.add(hcgNode, fcCap, ecBase);

      for (let f = -3; f <= 3; f++) {
        const finger = new THREE.Mesh(
          new THREE.BoxGeometry(0.45, 2.8, 0.42),
          f % 2 === 0 ? mats.copperHybridBond : mats.brassGear
        );
        finger.position.set(qx + f * 0.95, qy - 2.2, -0.2);
        finger.userData.noEdges = true;
        g.add(finger);
      }
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-tcg-multistage-cap',
        68,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, -3.55),
        new THREE.Vector3(-38, -28, -11.0),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // M69. Buried-Channel & Drain-Engineered Low-1/f-Noise Source-Follower MOSFET
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [qx, qy] of quadrants) {
      // Quarter-ring curved wide-W/L Source Follower gate maximizing area to squash 1/f & RTS noise
      const sfGate = new THREE.Mesh(
        new THREE.TorusGeometry(3.2, 0.65, 8, 18, Math.PI * 0.68),
        mats.gatePolysilicon
      );
      sfGate.position.set(qx - 1.2, qy - 1.2, 0);
      // Buried N-channel body bed underneath the SF gate
      const sfCh = new THREE.Mesh(
        new THREE.TorusGeometry(3.2, 0.52, 8, 18, Math.PI * 0.68),
        mats.siliconTransistorLayer
      );
      sfCh.position.set(qx - 1.2, qy - 1.2, 0.34);
      // Engineered graded Drain & Source local tungsten contacts
      const drainPad = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.7, 0.48), mats.copperHybridBond);
      drainPad.position.set(qx + 2.5, qy + 1.4, -0.15);
      const srcPad = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.7, 0.48), mats.silverElectrode);
      srcPad.position.set(qx - 1.4, qy + 2.6, -0.15);
      g.add(sfGate, sfCh, drainPad, srcPad);
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-sf-drain-buried',
        69,
        '#6366f1',
        g,
        new THREE.Vector3(0, 0, -4.9),
        new THREE.Vector3(38, -28, -15.0),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // M70. Single-Photon Avalanche Diode (SPAD) Multiplication Junction & Guard Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [qx, qy] of quadrants) {
      // High-field circular P-N avalanche multiplication core (Geiger-mode 10^5-10^6 gain)
      const avalCore = new THREE.Mesh(
        new THREE.CylinderGeometry(2.55, 2.55, 0.56, 20).rotateX(Math.PI / 2),
        mats.bodyRecRed
      );
      avalCore.position.set(qx, qy, 0);
      // Rounded low-field perimeter Guard Ring preventing premature edge breakdown
      const guardRing = new THREE.Mesh(
        new THREE.TorusGeometry(3.35, 0.48, 8, 22),
        mats.fluorineCoatCyan
      );
      guardRing.position.set(qx, qy, 0);
      // Active quenching & recharge MOSFET cell tucked on edge
      const quenchBlock = new THREE.Mesh(
        new THREE.BoxGeometry(1.9, 1.2, 0.52),
        mats.goldPlating
      );
      quenchBlock.position.set(qx + 3.4, qy - 3.4, -0.2);
      g.add(avalCore, guardRing, quenchBlock);
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-spad-avalanche-guard',
        70,
        '#dc2626',
        g,
        new THREE.Vector3(0, 0, -5.55),
        new THREE.Vector3(-38, 12, -18.0),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // M71. Pixel-Parallel Digital Pixel Sensor (DPS) Comparator & 10-bit 3T-GC-eDRAM
  // =========================================================================
  {
    const g = new THREE.Group();
    const logicCarrier = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(arrayW - 0.3, arrayW - 0.3, 0.4), 0.32, 0.04, 0.04, 8),
      mats.siliconLogicLayer
    );
    logicCarrier.position.z = 0.25;
    g.add(logicCarrier);

    for (const [qx, qy] of quadrants) {
      // Dedicated per-pixel analog comparator block aligned under Cu-Cu bond
      const comp = new THREE.Mesh(
        new THREE.BoxGeometry(3.8, 3.4, 0.58),
        mats.dramCellArray
      );
      comp.position.set(qx - 2.1, qy + 1.8, -0.18);
      // 10-bit 3T-GC-eDRAM digital counter strip (5 dual-bit banks per pixel)
      for (let b = 0; b < 5; b++) {
        const bitCell = new THREE.Mesh(
          new THREE.BoxGeometry(1.3, 3.0, 0.52),
          b % 2 === 0 ? mats.copperHybridBond : mats.goldPlating
        );
        bitCell.position.set(qx - 3.2 + b * 1.6, qy - 2.2, -0.18);
        bitCell.userData.noEdges = true;
        g.add(bitCell);
      }
      // Time-to-Saturation latch block
      const latch = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.4, 0.52), mats.varistorRingBlue);
      latch.position.set(qx + 2.3, qy + 1.8, -0.18);
      g.add(comp, latch);
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-pixel-dps-edram',
        71,
        '#4f46e5',
        g,
        new THREE.Vector3(0, 0, -11.0),
        new THREE.Vector3(38, 16, -29.0),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // M72. Correlated Multiple Sampling (CMS) Averaging Integrator & Accumulator
  // =========================================================================
  {
    const g = new THREE.Group();
    const baseBoard = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(arrayW - 0.8, 6.2, 0.4), 0.38, 0.04, 0.04, 8),
      mats.siliconLogicLayer
    );
    baseBoard.position.set(0, -13.2, 0);
    g.add(baseBoard);

    // 4-channel switched-capacitor CMS integrator banks (M=4/8/16 samples)
    for (let c = -1.5; c <= 1.5; c += 1.0) {
      const capBank = new THREE.Mesh(
        new THREE.BoxGeometry(3.8, 2.2, 0.62),
        mats.loficDielectric
      );
      capBank.position.set(c * 4.8, -12.0, -0.35);
      const accum = new THREE.Mesh(
        new THREE.BoxGeometry(3.8, 1.8, 0.68),
        mats.vcWorkingFluidCyan
      );
      accum.position.set(c * 4.8, -14.6, -0.38);
      g.add(capBank, accum);
    }
    // 4-phase high-speed CMS clock rails
    const clkRail = new THREE.Mesh(new THREE.BoxGeometry(arrayW - 1.4, 0.42, 0.28), mats.goldPlating);
    clkRail.position.set(0, -13.3, -0.58);
    g.add(clkRail);

    parts.push(
      finalizeMicroNextGenPart(
        'micro-cms-multi-sampler',
        72,
        '#10b981',
        g,
        new THREE.Vector3(0, 0, -11.7),
        new THREE.Vector3(-38, -10, -32.0),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // M73. Event-Based Vision (EVS/DVS) Log-Photoreceptor & Asynchronous Spike Detector
  // =========================================================================
  {
    const g = new THREE.Group();
    const evsBase = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(arrayW - 0.6, arrayW - 0.6, 0.4), 0.28, 0.04, 0.04, 8),
      mats.icEpoxy
    );
    evsBase.position.z = 0.22;
    g.add(evsBase);

    for (const [qx, qy] of quadrants) {
      // Logarithmic photoreceptor loop
      const logLoop = new THREE.Mesh(
        new THREE.TorusGeometry(2.1, 0.34, 8, 18),
        mats.nanoArIridescent
      );
      logLoop.position.set(qx - 1.6, qy + 1.4, -0.15);
      // ON (+) bright-change comparator (emerald) & OFF (-) dark-change comparator (amber)
      const onComp = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.0, 0.56), mats.cfaGreen);
      onComp.position.set(qx + 2.3, qy + 2.0, -0.2);
      const offComp = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.0, 0.56), mats.cinnabarAnodized);
      offComp.position.set(qx + 2.3, qy - 1.4, -0.2);
      // Asynchronous Address-Event (AER) arbiter bar
      const aerBus = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.62, 0.34), mats.goldPlating);
      aerBus.position.set(qx, qy - 3.6, -0.15);
      g.add(logLoop, onComp, offComp, aerBus);
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-evs-log-change',
        73,
        '#22c55e',
        g,
        new THREE.Vector3(0, 0, -13.0),
        new THREE.Vector3(38, -14, -36.5),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // M74. Active-Array Perimeter Dummy Transition Pixels & Amp-Glow Guard Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Outer double N+/P+ guard ring trapping peripheral logic minority carriers (stops Amp Glow)
    const outerGuard = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW + 4.4, arrayW + 4.4, 0.45, arrayW + 2.8, arrayW + 2.8, 0.32), 0.72, 0.05, 0.05, 8),
      mats.copperHybridBond
    );
    // Inner CMP & optical dummy transition pixel frame shielding active array edges
    const dummyFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW + 2.5, arrayW + 2.5, 0.35, arrayW + 0.5, arrayW + 0.5, 0.25), 0.95, 0.05, 0.05, 8),
      mats.siliconBulk
    );
    g.add(outerGuard, dummyFrame);

    // Dummy pixel tiles embossed along all 4 perimeter edges
    for (let i = -3; i <= 3; i++) {
      for (const side of [-1, 1]) {
        const dH = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.72, 0.25), mats.tungstenGrid);
        dH.position.set(i * 3.1, side * (halfP * 2 + 0.75), 0.55);
        dH.userData.noEdges = true;
        const dV = new THREE.Mesh(new THREE.BoxGeometry(0.72, 2.4, 0.25), mats.tungstenGrid);
        dV.position.set(side * (halfP * 2 + 0.75), i * 3.1, 0.55);
        dV.userData.noEdges = true;
        g.add(dH, dV);
      }
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-dummy-guard-ring',
        74,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 4.55),
        new THREE.Vector3(0, -38, 5.5),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M75. Hot-Carrier RTS Thermal Recovery Micro-Heater & Pixel BIST Bus (TSMC IISW 2025)
  // =========================================================================
  {
    const g = new THREE.Group();
    const bistPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(arrayW - 0.6, arrayW - 0.6, 0.4), 0.3, 0.04, 0.04, 8),
      mats.siliconDramLayer
    );
    bistPlate.position.z = 0.2;
    g.add(bistPlate);

    // Serpentine polysilicon micro-heater trace enabling thermal RTS trap annealing
    for (let row = -3; row <= 3; row++) {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(arrayW - 4.2, 0.72, 0.34),
        mats.cinnabarAnodized
      );
      bar.position.set(0, row * 2.55, -0.14);
      g.add(bar);
      if (row < 3) {
        const turnX = row % 2 === 0 ? (arrayW - 4.2) * 0.5 - 0.36 : -(arrayW - 4.2) * 0.5 + 0.36;
        const link = new THREE.Mesh(new THREE.BoxGeometry(0.72, 2.55, 0.34), mats.cinnabarAnodized);
        link.position.set(turnX, row * 2.55 + 1.275, -0.14);
        link.userData.noEdges = true;
        g.add(link);
      }
    }
    // BIST diagnostic test-pulse injection MUX bars along left & right edges
    for (const sx of [-9.4, 9.4]) {
      const mux = new THREE.Mesh(new THREE.BoxGeometry(1.4, arrayW - 2.4, 0.52), mats.goldPlating);
      mux.position.set(sx, 0, -0.2);
      g.add(mux);
    }

    parts.push(
      finalizeMicroNextGenPart(
        'micro-rts-anneal-bist',
        75,
        '#f97316',
        g,
        new THREE.Vector3(0, 0, -14.8),
        new THREE.Vector3(0, 38, -42.5),
        cp,
        0.25
      )
    );
  }

  return parts;
}
