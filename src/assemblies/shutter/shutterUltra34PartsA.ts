import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createRoundedRectShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

/** Build a precision helical coil spring geometry along the Y axis */
function buildHelicalSpringGeo(
  coilR: number,
  wireR: number,
  turns: number,
  height: number,
  radialSegs = 8,
  tubularSegs = 64
): THREE.TubeGeometry {
  const pts: THREE.Vector3[] = [];
  const steps = Math.max(24, Math.round(turns * 16));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ang = t * turns * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(ang) * coilR, (t - 0.5) * height, Math.sin(ang) * coilR));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  return markHiRes(new THREE.TubeGeometry(curve, tubularSegs, wireR, radialSegs, false));
}

/** Build a helical torsion spring around the Z axis with two protruding anchor legs */
function buildTorsionSpringGeo(
  coilR: number,
  wireR: number,
  turns: number,
  pitch: number,
  legLen: number
): THREE.TubeGeometry {
  const pts: THREE.Vector3[] = [];
  const zHalf = (turns * pitch) * 0.5;
  pts.push(new THREE.Vector3(coilR + legLen, 0, -zHalf));
  const steps = Math.max(28, Math.round(turns * 18));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ang = t * turns * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(ang) * coilR, Math.sin(ang) * coilR, -zHalf + t * turns * pitch));
  }
  const endAng = turns * Math.PI * 2;
  pts.push(
    new THREE.Vector3(
      Math.cos(endAng) * coilR - Math.sin(endAng) * legLen,
      Math.sin(endAng) * coilR + Math.cos(endAng) * legLen,
      zHalf
    )
  );
  const curve = new THREE.CatmullRomCurve3(pts);
  return markHiRes(new THREE.TubeGeometry(curve, 72, wireR, 8, false));
}

/** Build a precision spur gear shape with involute-like teeth */
function createPrecisionGearShape(
  outerR: number,
  rootR: number,
  teeth: number,
  boreR: number
): THREE.Shape {
  const s = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const a1 = a0 + step * 0.18;
    const a2 = a0 + step * 0.34;
    const a3 = a0 + step * 0.52;
    const a4 = a0 + step * 0.68;
    const p0x = Math.cos(a0) * rootR;
    const p0y = Math.sin(a0) * rootR;
    if (i === 0) s.moveTo(p0x, p0y);
    else s.lineTo(p0x, p0y);
    s.lineTo(Math.cos(a1) * rootR, Math.sin(a1) * rootR);
    s.lineTo(Math.cos(a2) * outerR, Math.sin(a2) * outerR);
    s.lineTo(Math.cos(a3) * outerR, Math.sin(a3) * outerR);
    s.lineTo(Math.cos(a4) * rootR, Math.sin(a4) * rootR);
  }
  s.closePath();
  if (boreR > 0.05) {
    const hole = new THREE.Path();
    hole.absarc(0, 0, boreR, 0, Math.PI * 2, true);
    s.holes.push(hole);
  }
  return s;
}

function finalizePhase34ShutterPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  targetExplodedPos: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.28
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 28, edgeOpacity);
  const explodeOffset = targetExplodedPos.clone().sub(assembledPos);

  return {
    id,
    subsystem: 'shutter',
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
 * Phase 34 Shutter Standalone Exhaustive Ultra-Dissection — Part A (SH78–SH104, 27 parts).
 * Strictly `standaloneOnly: true`: omitted in whole-camera modes, lazy-hydrated in standalone shutter mode.
 *
 * - Group A (SH78–SH88): Blade Micro-Anatomy, Surface Tribology, Aerodynamics & Arc-Slot Sealing
 * - Group B (SH89–SH99): Mirrorless Normally-Open Split-Drive & Charge Kinematics
 * - Group C-1 (SH100–SH104): Multi-Stage Coaxial Braking, Gap Buffer & 3-EM Soft-Stop Cradle
 */
export function buildShutterUltra34PartsA(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // SH78. Embossed Rivet-Head Recess Pockets on Shutter Blades (US4394082A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4-blade right-edge strip with stepped press-drawn countersunk embossed pockets so rivet heads sit flush below blade plane
    for (let i = 0; i < 4; i++) {
      const by = -7.5 + i * 5.0;
      const stripShape = createRoundedRectShape(10.5, 4.1, 0.55);
      for (const hx of [-2.4, 2.4]) {
        const h = new THREE.Path();
        h.absarc(hx, 0, 0.55, 0, Math.PI * 2, true);
        stripShape.holes.push(h);
      }
      const bladeEnd = new THREE.Mesh(
        applyBoxUVs(extrudeHiRes(stripShape, 0.14, 0.02, 0.02, 1, 14), 10),
        i % 2 === 0 ? mats.carbonFiberBlade : mats.carbonFiberBladeRear
      );
      bladeEnd.position.set(0, by, (i - 1.5) * 0.22);
      g.add(bladeEnd);

      // Drawn conical recess cup & flush rivet seat on each hole
      for (const hx of [-2.4, 2.4]) {
        const cupProfile = [
          new THREE.Vector2(0.55, -0.22),
          new THREE.Vector2(1.15, -0.22),
          new THREE.Vector2(1.55, 0.06),
          new THREE.Vector2(1.85, 0.06),
          new THREE.Vector2(1.55, 0.16),
          new THREE.Vector2(1.12, -0.10),
          new THREE.Vector2(0.55, -0.10),
        ];
        const cupGeo = markHiRes(new THREE.LatheGeometry(cupProfile, 24)).rotateX(Math.PI / 2);
        const cup = new THREE.Mesh(cupGeo, mats.midPlateSteel);
        cup.position.set(hx, by, (i - 1.5) * 0.22);
        g.add(cup);

        // Flush-seated caulked micro-rivet head recessed cleanly inside the embossed pocket
        const flushHead = new THREE.Mesh(
          hiResCyl(0.88, 0.62, 0.14, 18).rotateX(Math.PI / 2),
          mats.titaniumRivet
        );
        flushHead.position.set(hx, by, (i - 1.5) * 0.22 - 0.08);
        g.add(flushHead);
      }
    }

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-blade-rivet-recesses',
        78,
        '#475569',
        g,
        new THREE.Vector3(22.0, 0.0, 15.1),
        new THREE.Vector3(-78.0, 46.0, 46.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH79. >99% Crystallized Precipitation-Hardened Blade Coupling Pins (US10649311B2, Hv 600–750)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sculptural 4-pin precision carrier bar showcasing stepped shoulder, hardened Ni-P/Cr crystallized skin & swaged tail
    const jigBar = new THREE.Mesh(
      createChamferedBoxGeo(11.0, 3.0, 0.5, 0.6, 0.08, 'z'),
      mats.linkArmSteel
    );
    jigBar.position.set(0, 0, -0.45);
    g.add(jigBar);

    for (let i = 0; i < 4; i++) {
      const px = -3.9 + i * 2.6;
      const pinProf = [
        new THREE.Vector2(0.01, -1.1),
        new THREE.Vector2(0.55, -1.1),
        new THREE.Vector2(0.55, -0.45),
        new THREE.Vector2(0.95, -0.45),
        new THREE.Vector2(0.95, 0.28),
        new THREE.Vector2(0.72, 0.35),
        new THREE.Vector2(0.72, 1.05),
        new THREE.Vector2(0.92, 1.25),
        new THREE.Vector2(0.58, 1.48),
        new THREE.Vector2(0.01, 1.48),
      ];
      const pinGeo = markHiRes(new THREE.LatheGeometry(pinProf, 26)).rotateX(Math.PI / 2);
      const pin = new THREE.Mesh(pinGeo, mats.titaniumRivet);
      pin.position.set(px, 0, 0.25);
      g.add(pin);

      // Crystallized Hv 600–750 hardened bearing journal collar ring
      const journal = new THREE.Mesh(
        hiResCyl(0.77, 0.77, 0.64, 24).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      journal.position.set(px, 0, 0.96);
      g.add(journal);

      // Gold-tinted heat-treat crystalline phase band indicator
      const band = new THREE.Mesh(hiResTorus(0.78, 0.06, 8, 22), mats.goldPlating);
      band.position.set(px, 0, 0.72);
      band.userData.noEdges = true;
      g.add(band);
    }

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-crystallized-coupling-pins',
        79,
        '#cbd5e1',
        g,
        new THREE.Vector3(22.2, 6.0, 14.7),
        new THREE.Vector3(-88.0, 30.0, 32.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH80. 5-Layer Symmetric Hybrid Composite Blade Stack (JP2008-299106A, Nikon)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Terraced 5-ply symmetric cutaway revealing all 5 layers: Light-block resin / Cross-glass / Aramid core / Cross-glass / Light-block resin
    const plies: Array<{ w: number; h: number; z: number; mat: THREE.Material }> = [
      { w: 18.0, h: 6.2, z: 0.72, mat: mats.velvetFlockTrap },        // Layer 1: Front light-blocking matte resin
      { w: 16.0, h: 5.8, z: 0.36, mat: mats.fluorineCoatCyan },       // Layer 2: Cross-ply glass-fiber reinforced resin
      { w: 14.0, h: 5.4, z: 0.0, mat: mats.aramidKevlarWeave },       // Layer 3: Central aramid (Kevlar) high-toughness core
      { w: 16.0, h: 5.8, z: -0.36, mat: mats.fluorineCoatCyan },      // Layer 4: Symmetric rear cross-ply glass-fiber
      { w: 18.0, h: 6.2, z: -0.72, mat: mats.carbonFiberBladeRear },  // Layer 5: Rear light-blocking resin skin
    ];
    for (const p of plies) {
      const m = new THREE.Mesh(createChamferedBoxGeo(p.w, p.h, 0.22, 0.35, 0.04, 'z'), p.mat);
      m.position.set((p.w - 18.0) * 0.5, 0, p.z);
      g.add(m);
    }
    // Micro-scale edge clamping bracket holding the 5-ply specimen cleanly
    const clamp = new THREE.Mesh(
      createChamferedBoxGeo(1.8, 6.8, 2.0, 0.3, 0.08, 'z'),
      mats.titaniumRivet
    );
    clamp.position.set(-8.6, 0, 0);
    g.add(clamp);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-5layer-hybrid-laminate',
        80,
        '#06b6d4',
        g,
        new THREE.Vector3(0.0, 17.5, 15.4),
        new THREE.Vector3(-78.0, 56.0, 20.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH81. Staggered Light-Seal Overlap Steps on Cover Blades #2–#4
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 overlapping blades shown in staggered Z-stepped shingle formation with 1.2mm labyrinth light-seal overlap ribs
    for (let i = 0; i < 4; i++) {
      const by = 6.0 - i * 4.0;
      const bz = (i - 1.5) * 0.42;
      const blade = new THREE.Mesh(
        createChamferedBoxGeo(18.0, 4.9, 0.16, 0.25, 0.03, 'z'),
        i === 0 ? mats.carbonFiberBlade : mats.carbonFiberBladeRear
      );
      blade.position.set(0, by, bz);
      g.add(blade);

      // Raised micro light-trap seal bead along the 1.2mm overlap zone
      if (i < 3) {
        const sealLip = new THREE.Mesh(
          createChamferedBoxGeo(17.2, 0.55, 0.24, 0.12, 0.04, 'z'),
          mats.velvetFlockTrap
        );
        sealLip.position.set(0, by - 2.0, bz + 0.18);
        g.add(sealLip);

        // Micro brass alignment guide stud on right margin
        const stud = new THREE.Mesh(
          hiResCyl(0.32, 0.32, 0.44, 14).rotateX(Math.PI / 2),
          mats.brassGear
        );
        stud.position.set(7.6, by - 1.8, bz + 0.15);
        g.add(stud);
      }
    }

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-cover-blade-overlap-steps',
        81,
        '#334155',
        g,
        new THREE.Vector3(0.0, -16.5, 15.1),
        new THREE.Vector3(-90.0, 14.0, 52.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH82. Baseplate & Mid-Plate Hemispherical Anti-Stiction Sliding Micro-Dimples
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision stainless guide rib carrying a regular array of mirror-polished hemispherical anti-stiction micro-dimple bosses
    const rail = new THREE.Mesh(
      createChamferedBoxGeo(6.2, 24.0, 0.55, 0.7, 0.08, 'z'),
      mats.midPlateSteel
    );
    g.add(rail);

    const dimpleGeo = hiResSphere(0.58, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.52);
    for (let r = 0; r < 8; r++) {
      const dy = -9.8 + r * 2.8;
      for (const dx of [-1.45, 1.45]) {
        const dome = new THREE.Mesh(dimpleGeo, mats.stainlessMachined);
        dome.rotation.x = Math.PI / 2;
        dome.position.set(dx, dy, 0.26);
        g.add(dome);

        // Rear symmetric dimple facing 2nd curtain chamber
        const domeRear = new THREE.Mesh(dimpleGeo, mats.stainlessMachined);
        domeRear.rotation.x = -Math.PI / 2;
        domeRear.position.set(dx, dy, -0.26);
        g.add(domeRear);
      }
    }

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-baseplate-slide-dimples',
        82,
        '#94a3b8',
        g,
        new THREE.Vector3(-20.5, 0.0, 14.05),
        new THREE.Vector3(-82.0, 8.0, 12.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH83. Blade-Chamber Ultra-Thin Low-Friction Slip-Sheet & Tapered Bevel (JP4317237B2)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-frame ultra-thin low-friction fluoropolymer/PET slip-sheet frame clearing the 36x24mm aperture cleanly
    const outerFrame = createFrameShape(46.0, 33.5, 1.8, 38.6, 26.2, 0.8, 0, 0);
    const sheet = new THREE.Mesh(
      extrudeHiRes(outerFrame, 0.16, 0.03, 0.03, 1, 18),
      mats.mylarInsulatorFilm
    );
    g.add(sheet);

    // Tapered variable-thickness aperture bevel rails along top & bottom margins (JP2008-242049A, strictly outside ±12mm!)
    for (const sy of [13.5, -13.5]) {
      const bevelProfile = new THREE.Shape();
      bevelProfile.moveTo(-19.2, 0);
      bevelProfile.lineTo(19.2, 0);
      bevelProfile.lineTo(19.2, sy > 0 ? 1.6 : -1.6);
      bevelProfile.lineTo(-19.2, sy > 0 ? 1.6 : -1.6);
      bevelProfile.closePath();
      const bevel = new THREE.Mesh(
        extrudeHiRes(bevelProfile, 0.28, 0.06, 0.10, 2, 8),
        mats.fluorineCoatCyan
      );
      bevel.position.set(0, sy, 0.12);
      g.add(bevel);
    }

    // 4 corner registration tabs with micro mounting eyelets
    for (const [tx, ty] of [
      [-20.8, 14.8],
      [20.8, 14.8],
      [-20.8, -14.8],
      [20.8, -14.8],
    ] as Array<[number, number]>) {
      const ring = new THREE.Mesh(hiResTorus(0.82, 0.2, 8, 18), mats.goldPlating);
      ring.position.set(tx, ty, 0.12);
      ring.userData.noEdges = true;
      g.add(ring);
    }

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-thin-slip-sheet',
        83,
        '#38bdf8',
        g,
        new THREE.Vector3(0.0, 0.0, 14.35),
        new THREE.Vector3(-94.0, -14.0, 34.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH84. Non-Migrating PFPE Fluorinated / MoS2 Dry-Film Lubricant Micro-Rings
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 coaxial pivot tribology stacks showing sintered MoS2 dry-film ring + cyan PFPE capillary barrier ring + steel race
    for (let i = 0; i < 3; i++) {
      const oy = (i - 1) * 5.2;
      const race = new THREE.Mesh(
        hiResCyl(2.2, 2.2, 0.42, 28).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      race.position.set(0, oy, -0.32);
      g.add(race);

      // Dark metallic MoS2 solid-lubricant micro-pellet ring
      const mos2Ring = new THREE.Mesh(hiResTorus(1.48, 0.34, 12, 28), mats.pyroGraphite);
      mos2Ring.position.set(0, oy, 0.08);
      mos2Ring.userData.noEdges = true;
      g.add(mos2Ring);

      // Outer non-migrating PFPE fluoropolymer oil-repellent barrier collar
      const pfpeCollar = new THREE.Mesh(hiResTorus(2.05, 0.24, 10, 28), mats.fluorineCoatCyan);
      pfpeCollar.position.set(0, oy, 0.36);
      pfpeCollar.userData.noEdges = true;
      g.add(pfpeCollar);

      // Central hardened journal pin
      const pin = new THREE.Mesh(
        hiResCyl(0.68, 0.68, 1.35, 20).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      pin.position.set(0, oy, 0.05);
      g.add(pin);
    }

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-pfpe-dry-lube-rings',
        84,
        '#22d3ee',
        g,
        new THREE.Vector3(24.0, -6.5, 13.8),
        new THREE.Vector3(-80.0, -10.0, -12.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH85. Slit-Edge Micro-Bevel & Anti-Diffraction Knife Edge
  // =========================================================================
  {
    const g = new THREE.Group();
    // Cross-sectional enlarged knife-edge slit master blade showing 30-deg anti-reflection chamfer & matte carbon black velvet backing
    const knifeShape = new THREE.Shape();
    knifeShape.moveTo(-9.5, -2.4);
    knifeShape.lineTo(9.5, -2.4);
    knifeShape.lineTo(9.5, 1.8);
    knifeShape.lineTo(-9.5, 1.8);
    knifeShape.closePath();
    const bladeBody = new THREE.Mesh(
      extrudeHiRes(knifeShape, 0.32, 0.04, 0.04, 2, 8),
      mats.carbonFiberBlade
    );
    g.add(bladeBody);

    // Razor-sharp 30-degree angled light-trapping knife bevel along the slit-forming bottom edge
    const edgeProf = new THREE.Shape();
    edgeProf.moveTo(0, 0);
    edgeProf.lineTo(1.6, 0.36);
    edgeProf.lineTo(1.6, -0.14);
    edgeProf.closePath();
    const bevelGeo = extrudeHiRes(edgeProf, 19.0, 0.01, 0.01, 1, 6);
    bevelGeo.rotateY(Math.PI / 2);
    const bevelStrip = new THREE.Mesh(bevelGeo, mats.velvetFlockTrap);
    bevelStrip.position.set(0, -2.55, 0.0);
    g.add(bevelStrip);

    // 14 micro-serration diffraction-breaking acoustic flutes along rear knife shoulder
    for (let i = 0; i < 14; i++) {
      const fx = -8.45 + i * 1.3;
      const flute = new THREE.Mesh(
        createChamferedBoxGeo(0.75, 0.85, 0.22, 0.12, 0.04, 'z'),
        mats.matteBlackAnodized
      );
      flute.position.set(fx, -1.9, 0.24);
      g.add(flute);
    }

    // Gold optical alignment reference datum on end tab
    const endTab = new THREE.Mesh(
      createChamferedBoxGeo(2.2, 4.2, 0.42, 0.3, 0.06, 'z'),
      mats.titaniumRivet
    );
    endTab.position.set(10.0, -0.3, 0);
    g.add(endTab);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-slit-diffraction-bevel',
        85,
        '#1e293b',
        g,
        new THREE.Vector3(0.0, 12.6, 15.25),
        new THREE.Vector3(-82.0, 34.0, 62.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH86. Arc-Slot Sliding Dust & Oil-Mist Curtain Shield (遮蔽部材90, JP6216630B2)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Baseplate section featuring the twin curved arc-slots + the fan-shaped sliding shutter shield (遮蔽部材 90) riding on the drive pin!
    const arcPlateShape = createRoundedRectShape(12.0, 18.0, 1.4);
    const slotHole = new THREE.Path();
    slotHole.absarc(-2.5, 0, 6.2, -0.78, 0.78, false);
    slotHole.absarc(-2.5, 0, 4.5, 0.78, -0.78, true);
    slotHole.closePath();
    arcPlateShape.holes.push(slotHole);
    const plate = new THREE.Mesh(
      extrudeHiRes(arcPlateShape, 0.65, 0.06, 0.06, 2, 24),
      mats.shutterChassis
    );
    plate.position.set(0, 0, -0.55);
    g.add(plate);

    // Fan-shaped sliding dust/oil curtain shield (遮蔽部材 90) overlapping the entire arc-slot sweep
    const shieldShape = new THREE.Shape();
    shieldShape.absarc(-2.5, 0, 7.3, -0.92, 0.92, false);
    shieldShape.absarc(-2.5, 0, 3.2, 0.92, -0.92, true);
    shieldShape.closePath();
    const shieldPinHole = new THREE.Path();
    shieldPinHole.absarc(2.85, 0, 0.88, 0, Math.PI * 2, true);
    shieldShape.holes.push(shieldPinHole);
    const shieldMesh = new THREE.Mesh(
      extrudeHiRes(shieldShape, 0.24, 0.03, 0.03, 1, 24),
      mats.polyimideFpc
    );
    shieldMesh.position.set(0, 0, 0.22);
    g.add(shieldMesh);

    // Drive pin piercing through the shield collar + PTFE wiping lip
    const drivePin = new THREE.Mesh(
      hiResCyl(0.82, 0.82, 2.4, 20).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    drivePin.position.set(2.85, 0, 0.15);
    const wipeRing = new THREE.Mesh(hiResTorus(1.08, 0.22, 8, 20), mats.zifIvoryPlastic);
    wipeRing.position.set(2.85, 0, 0.42);
    wipeRing.userData.noEdges = true;
    g.add(drivePin, wipeRing);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-arc-slot-curtain-shield',
        86,
        '#d97706',
        g,
        new THREE.Vector3(24.5, 0.0, 13.5),
        new THREE.Vector3(-94.0, -32.0, 8.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH87. Punched Optical Velocity-Detection Flag Tabs (Nikon F5 Monitor / Closed-Loop PI)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision stamped curtain-arm extension with 3 laser-cut optical velocity-interrupter comb flags & U-shaped IR sensor gates
    const armStrip = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 17.5, 0.28, 0.4, 0.04, 'z'),
      mats.linkArmSteel
    );
    armStrip.position.set(-1.8, 0, 0);
    g.add(armStrip);

    // 3 precision punched rectangular flag tabs protruding into 940 nm IR optical gates (Start / Mid / End timing)
    for (let i = 0; i < 3; i++) {
      const fy = -5.6 + i * 5.6;
      const flag = new THREE.Mesh(
        createChamferedBoxGeo(4.8, 2.2, 0.22, 0.15, 0.03, 'z'),
        mats.matteBlackAnodized
      );
      flag.position.set(1.8, fy, 0);
      g.add(flag);

      // Slotted U-gate optical emitter/detector bridge straddling each flag
      const gateBase = new THREE.Mesh(
        createChamferedBoxGeo(3.0, 3.0, 1.8, 0.3, 0.06, 'z'),
        mats.icEpoxy
      );
      gateBase.position.set(4.5, fy, 0);
      const irDot = new THREE.Mesh(hiResSphere(0.42, 12, 10), mats.irLedLens);
      irDot.position.set(3.2, fy, 0.48);
      irDot.userData.noEdges = true;
      g.add(gateBase, irDot);
    }

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-velocity-flag-tabs',
        87,
        '#e11d48',
        g,
        new THREE.Vector3(-19.5, 11.0, 12.8),
        new THREE.Vector3(-78.0, -28.0, -24.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH88. Split Main-Blade vs. Auxiliary-Blade Dual-Spring Transmitter (US4220409A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Coaxial dual-spring transmitter: Primary slit-blade lever (blue-steel) + Secondary cover-blade lever (brass) + twin torsion springs
    const hubShaft = new THREE.Mesh(
      hiResCyl(1.35, 1.35, 5.2, 24).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    g.add(hubShaft);

    // Master slit-blade drive arm
    const mainArmShape = createRoundedRectShape(11.5, 2.6, 0.9);
    const mainArm = new THREE.Mesh(
      extrudeHiRes(mainArmShape, 0.72, 0.08, 0.08, 2, 14),
      mats.mountShimBlue
    );
    mainArm.position.set(4.2, 1.4, 1.35);
    mainArm.rotation.z = 0.24;
    g.add(mainArm);

    // Independent auxiliary cover-blade drive arm
    const auxArmShape = createRoundedRectShape(10.0, 2.4, 0.85);
    const auxArm = new THREE.Mesh(
      extrudeHiRes(auxArmShape, 0.72, 0.08, 0.08, 2, 14),
      mats.brassGear
    );
    auxArm.position.set(3.6, -1.6, -1.35);
    auxArm.rotation.z = -0.28;
    g.add(auxArm);

    // Twin coaxial decoupled torsion springs
    const sp1 = new THREE.Mesh(buildTorsionSpringGeo(2.35, 0.24, 3.2, 0.42, 4.2), mats.beCuSpring);
    sp1.position.set(0, 0, 0.65);
    sp1.userData.noEdges = true;
    const sp2 = new THREE.Mesh(buildTorsionSpringGeo(2.05, 0.22, 3.2, 0.42, 3.8), mats.titaniumRivet);
    sp2.position.set(0, 0, -0.85);
    sp2.rotation.z = Math.PI;
    sp2.userData.noEdges = true;
    g.add(sp1, sp2);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-split-blade-transmitter',
        88,
        '#2563eb',
        g,
        new THREE.Vector3(26.0, 3.0, 13.2),
        new THREE.Vector3(-88.0, -48.0, 34.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH89. Coaxial Two-Piece Split Front-Curtain Driving Members (US20070253707A1 / JP2019-120878A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Shared precision shank holding Member-1 (第一回動部材, coupled to blade arm) & Member-2 (第二回動部材, coupled to armature/spring)
    const shank = new THREE.Mesh(
      hiResCyl(1.45, 1.45, 5.6, 26).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    g.add(shank);

    // Member-1: Front blade driving member with curved sector arm & drive pin
    const m1Shape = new THREE.Shape();
    m1Shape.absarc(0, 0, 3.4, 0, Math.PI * 2, false);
    const m1Body = new THREE.Mesh(extrudeHiRes(m1Shape, 1.1, 0.1, 0.1, 2, 24), mats.cinnabarAnodized);
    m1Body.position.set(0, 0, 1.35);
    const m1Arm = new THREE.Mesh(
      createChamferedBoxGeo(9.6, 2.4, 0.9, 0.7, 0.08, 'z'),
      mats.cinnabarAnodized
    );
    m1Arm.position.set(4.5, 2.2, 1.35);
    m1Arm.rotation.z = 0.42;
    const m1Pin = new THREE.Mesh(
      hiResCyl(0.65, 0.65, 2.2, 16).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    m1Pin.position.set(8.4, 4.0, 2.2);
    g.add(m1Body, m1Arm, m1Pin);

    // Member-2: Coaxial spring-cocking & armature engagement member with stepped engagement lug
    const m2Body = new THREE.Mesh(extrudeHiRes(m1Shape, 1.1, 0.1, 0.1, 2, 24), mats.mountShimBlue);
    m2Body.position.set(0, 0, -1.25);
    const m2Arm = new THREE.Mesh(
      createChamferedBoxGeo(9.2, 2.6, 0.9, 0.7, 0.08, 'z'),
      mats.mountShimBlue
    );
    m2Arm.position.set(-4.2, -1.8, -1.25);
    m2Arm.rotation.z = 0.36;
    // Engagement catch lug uniting Member-1 and Member-2 during exposure stroke
    const lug = new THREE.Mesh(
      createChamferedBoxGeo(2.0, 2.2, 2.4, 0.35, 0.08, 'z'),
      mats.goldPlating
    );
    lug.position.set(2.8, -2.0, 0.0);
    g.add(m2Body, m2Arm, lug);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-coaxial-split-drivers',
        89,
        '#ef4444',
        g,
        new THREE.Vector3(27.5, 8.5, 13.1),
        new THREE.Vector3(104.0, 42.0, 26.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH90. Normally-Open Live-View Front-Curtain Locking Lever & Mode-Switch EM (US20160109782A1)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Single-direction switching electromagnet coil + pivoting curved restraining hook lever (係止部材)
    const emYoke = new THREE.Mesh(
      createChamferedBoxGeo(5.4, 7.6, 3.6, 0.5, 0.1, 'z'),
      mats.softIronYoke
    );
    emYoke.position.set(3.4, 1.8, 0);
    const emCoil = new THREE.Mesh(
      hiResCyl(2.25, 2.25, 5.2, 26),
      mats.copperCoil
    );
    emCoil.position.set(3.4, 1.8, 0);
    g.add(emYoke, emCoil);

    // L-shaped locking/restraining pawl lever with hardened titanium hook tip
    const leverShape = new THREE.Shape();
    leverShape.moveTo(-6.2, -1.2);
    leverShape.lineTo(1.2, -1.2);
    leverShape.lineTo(1.2, 4.4);
    leverShape.lineTo(-1.0, 4.4);
    leverShape.lineTo(-1.0, 1.0);
    leverShape.lineTo(-4.4, 1.0);
    leverShape.lineTo(-5.8, 2.6);
    leverShape.lineTo(-7.2, 1.6);
    leverShape.closePath();
    const lever = new THREE.Mesh(
      extrudeHiRes(leverShape, 1.15, 0.1, 0.1, 2, 14),
      mats.stainlessMachined
    );
    lever.position.set(-1.2, -1.4, 0.4);
    const pivot = new THREE.Mesh(
      hiResCyl(0.85, 0.85, 2.6, 18).rotateX(Math.PI / 2),
      mats.brassGear
    );
    pivot.position.set(-1.2, -1.4, 0.4);
    // Permanent-magnet operating armature tab at upper end of lever
    const magTab = new THREE.Mesh(
      createChamferedBoxGeo(2.2, 2.2, 1.4, 0.3, 0.08, 'z'),
      mats.neodymiumMagnet
    );
    magTab.position.set(0.0, 2.4, 0.4);
    g.add(lever, pivot, magTab);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-no-curtain-lock-lever',
        90,
        '#f97316',
        g,
        new THREE.Vector3(32.0, 14.0, 12.9),
        new THREE.Vector3(114.0, 24.0, 38.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH91. Front-Curtain Closing-Bias Set Spring & Eccentric Anchor Pin (US20070253707A1)
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-fatigue BeCu/music-wire helical set spring + eccentric cam-head tension-tuning anchor pin
    const spring = new THREE.Mesh(
      buildTorsionSpringGeo(2.8, 0.30, 5.2, 0.46, 5.4),
      mats.beCuSpring
    );
    spring.userData.noEdges = true;
    g.add(spring);

    // Central spring mandrel guide sleeve
    const mandrel = new THREE.Mesh(
      hiResCyl(1.75, 1.75, 3.6, 24).rotateX(Math.PI / 2),
      mats.pomGear
    );
    g.add(mandrel);

    // Eccentric tension-tuning anchor pin with slotted micro-calibrator head
    const anchorBase = new THREE.Mesh(
      hiResCyl(1.85, 1.85, 1.4, 24).rotateX(Math.PI / 2),
      mats.brassGear
    );
    anchorBase.position.set(6.8, -0.4, -0.8);
    const eccStud = new THREE.Mesh(
      hiResCyl(0.72, 0.72, 2.4, 18).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    eccStud.position.set(7.45, 0.25, -0.2);
    const lockCollar = new THREE.Mesh(hiResTorus(1.88, 0.22, 8, 22), mats.mountThreadLockBlue);
    lockCollar.position.set(6.8, -0.4, -0.1);
    lockCollar.userData.noEdges = true;
    g.add(anchorBase, eccStud, lockCollar);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-closing-set-spring',
        91,
        '#eab308',
        g,
        new THREE.Vector3(28.0, 11.5, 13.3),
        new THREE.Vector3(100.0, 48.0, 2.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH92. Auxiliary Cylindrical Zero-Power Detent Yoke (補助ヨーク 43, JP2006-101649A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // U-shaped main electromagnetic yoke + coaxial cylindrical auxiliary detent yoke with twin pole projections holding PM rotor at 0 mW!
    const uYokeShape = new THREE.Shape();
    uYokeShape.moveTo(-5.8, -4.6);
    uYokeShape.lineTo(5.8, -4.6);
    uYokeShape.lineTo(5.8, 4.6);
    uYokeShape.lineTo(3.4, 4.6);
    uYokeShape.lineTo(3.4, -2.2);
    uYokeShape.lineTo(-3.4, -2.2);
    uYokeShape.lineTo(-3.4, 4.6);
    uYokeShape.lineTo(-5.8, 4.6);
    uYokeShape.closePath();
    const uYoke = new THREE.Mesh(
      extrudeHiRes(uYokeShape, 2.2, 0.12, 0.12, 2, 12),
      mats.softIronYoke
    );
    uYoke.position.set(0, -1.2, -0.4);
    g.add(uYoke);

    // Cylindrical auxiliary detent yoke (補助ヨーク 43) with opposing detent flux projections (43b, 43c)
    const auxRingShape = new THREE.Shape();
    auxRingShape.absarc(0, 0, 4.1, 0, Math.PI * 2, false);
    const auxInner = new THREE.Path();
    auxInner.absarc(0, 0, 2.9, 0, Math.PI * 2, true);
    auxRingShape.holes.push(auxInner);
    const auxRing = new THREE.Mesh(
      extrudeHiRes(auxRingShape, 2.6, 0.1, 0.1, 2, 28),
      mats.pureIronArmature
    );
    auxRing.position.set(0, 2.4, 0.4);
    g.add(auxRing);

    // Twin inward detent pole teeth (43b, 43c) creating magnetic detent energy wells
    for (const ang of [0.45, Math.PI + 0.45]) {
      const tooth = new THREE.Mesh(
        createChamferedBoxGeo(1.1, 1.35, 2.4, 0.15, 0.06, 'z'),
        mats.pureIronArmature
      );
      tooth.position.set(Math.cos(ang) * 2.6, 2.4 + Math.sin(ang) * 2.6, 0.4);
      tooth.rotation.z = ang;
      g.add(tooth);
    }

    // 2-pole permanent-magnet rotor seated inside the detent yoke
    const rotorN = new THREE.Mesh(
      hiResCyl(2.05, 2.05, 2.2, 24, false, 0, Math.PI).rotateX(Math.PI / 2),
      mats.neodymiumMagnet
    );
    const rotorS = new THREE.Mesh(
      hiResCyl(2.05, 2.05, 2.2, 24, false, Math.PI, Math.PI).rotateX(Math.PI / 2),
      mats.cinnabarAnodized
    );
    rotorN.position.set(0, 2.4, 0.4);
    rotorS.position.set(0, 2.4, 0.4);
    g.add(rotorN, rotorS);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-aux-detent-yoke',
        92,
        '#6366f1',
        g,
        new THREE.Vector3(35.5, 18.0, 12.6),
        new THREE.Vector3(118.0, 36.0, -16.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH93. Actuator-Holder Escape-Hole Sector Drive Lever (US20130322866A1, Seiko Precision)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Slim actuator holder frame with crescent escape cutout allowing the sector drive lever to sweep flush without Z-stack bloat!
    const holderShape = createRoundedRectShape(13.5, 11.5, 1.6);
    const escapeHole = new THREE.Path();
    escapeHole.absarc(-1.8, -0.5, 4.4, -0.7, 1.15, false);
    escapeHole.absarc(-1.8, -0.5, 1.8, 1.15, -0.7, true);
    escapeHole.closePath();
    holderShape.holes.push(escapeHole);
    const holder = new THREE.Mesh(
      extrudeHiRes(holderShape, 1.35, 0.1, 0.1, 2, 20),
      mats.shutterChassis
    );
    g.add(holder);

    // Sculpted sector drive lever passing directly through the holder's escape hole
    const sectorShape = new THREE.Shape();
    sectorShape.absarc(0, 0, 2.2, 0.6, Math.PI * 1.9, false);
    sectorShape.lineTo(7.4, -1.1);
    sectorShape.lineTo(7.4, 1.1);
    sectorShape.closePath();
    const sector = new THREE.Mesh(
      extrudeHiRes(sectorShape, 0.85, 0.08, 0.08, 2, 18),
      mats.titaniumRivet
    );
    sector.position.set(-1.8, -0.5, 0.35);
    sector.rotation.z = 0.25;

    const tipPin = new THREE.Mesh(
      hiResCyl(0.62, 0.62, 2.5, 18).rotateX(Math.PI / 2),
      mats.goldPlating
    );
    tipPin.position.set(5.1, 1.25, 0.85);
    g.add(sector, tipPin);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-escape-hole-sector-lever',
        93,
        '#0ea5e9',
        g,
        new THREE.Vector3(26.5, -2.5, 12.8),
        new THREE.Vector3(106.0, 10.0, 18.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH94. Asymmetric-Inclination Charge Cam (US20110103787A1, Canon)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual-deck coaxial cam with visibly asymmetric drop-off inclination zones: narrow leading-blade ramp (<) vs wider trailing-blade ramp!
    const buildCamLayer = (dropSpan: number, maxR: number, baseR: number) => {
      const sh = new THREE.Shape();
      const segs = 64;
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        let r = baseR;
        if (a < Math.PI * 1.05) {
          r = baseR + (maxR - baseR) * (a / (Math.PI * 1.05));
        } else if (a < Math.PI * 1.05 + dropSpan) {
          const u = (a - Math.PI * 1.05) / dropSpan;
          r = maxR - (maxR - baseR) * u;
        }
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) sh.moveTo(x, y);
        else sh.lineTo(x, y);
      }
      sh.closePath();
      const bore = new THREE.Path();
      bore.absarc(0, 0, 1.5, 0, Math.PI * 2, true);
      sh.holes.push(bore);
      return sh;
    };

    // Upper deck: Leading-blade cam with steep narrow inclination zone (0.36 rad)
    const leadCam = new THREE.Mesh(
      extrudeHiRes(buildCamLayer(0.36, 5.4, 3.1), 1.05, 0.1, 0.1, 2, 24),
      mats.cinnabarAnodized
    );
    leadCam.position.set(0, 0, 0.85);

    // Lower deck: Trailing-blade cam with broader gentle inclination zone (0.95 rad)
    const trailCam = new THREE.Mesh(
      extrudeHiRes(buildCamLayer(0.95, 5.6, 3.2), 1.05, 0.1, 0.1, 2, 24),
      mats.mountShimBlue
    );
    trailCam.position.set(0, 0, -0.85);
    trailCam.rotation.z = 0.28;

    // Coaxial spur drive base gear
    const baseGear = new THREE.Mesh(
      extrudeHiRes(createPrecisionGearShape(6.2, 5.5, 28, 1.5), 0.72, 0.05, 0.05, 1, 8),
      mats.brassGear
    );
    baseGear.position.set(0, 0, -1.9);

    const shaft = new THREE.Mesh(
      hiResCyl(1.45, 1.45, 5.2, 22).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    g.add(leadCam, trailCam, baseGear, shaft);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-asymmetric-incline-cam',
        94,
        '#f43f5e',
        g,
        new THREE.Vector3(29.5, -13.5, 12.3),
        new THREE.Vector3(114.0, -8.0, 6.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH95. Charge-Gearbox Overload Protection Friction Slip-Clutch & Wave Washer
  // =========================================================================
  {
    const g = new THREE.Group();
    // Exploded micro-stack of torque-limiting slip clutch: POM input gear + carbon friction disc + steel pressure plate + wave spring + lock clip
    const inputGear = new THREE.Mesh(
      extrudeHiRes(createPrecisionGearShape(5.4, 4.7, 24, 1.6), 1.15, 0.08, 0.08, 1, 8),
      mats.pomGear
    );
    inputGear.position.set(0, 0, -1.4);

    // Woven sintered friction liner ring
    const frictionDisc = new THREE.Mesh(
      hiResCyl(4.0, 4.0, 0.35, 32).rotateX(Math.PI / 2),
      mats.oilTrapPorousPad
    );
    frictionDisc.position.set(0, 0, -0.45);

    // Flanged steel clutch pressure hub
    const clutchHub = new THREE.Mesh(
      hiResCyl(3.8, 3.8, 0.65, 28).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    clutchHub.position.set(0, 0, 0.25);

    // Wavy sinusoidal BeCu preload spring washer (real 3D wave curve!)
    const wavePts: THREE.Vector3[] = [];
    for (let i = 0; i <= 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      wavePts.push(new THREE.Vector3(Math.cos(a) * 2.85, Math.sin(a) * 2.85, 0.98 + Math.sin(a * 3) * 0.28));
    }
    const waveGeo = markHiRes(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wavePts, true), 64, 0.2, 8, true)
    );
    const waveWasher = new THREE.Mesh(waveGeo, mats.beCuSpring);
    waveWasher.userData.noEdges = true;

    // Knurled output torque collar & shaft
    const outPinion = new THREE.Mesh(
      extrudeHiRes(createPrecisionGearShape(2.6, 2.1, 14, 1.1), 1.25, 0.06, 0.06, 1, 8),
      mats.brassGear
    );
    outPinion.position.set(0, 0, 1.95);
    const axle = new THREE.Mesh(
      hiResCyl(1.05, 1.05, 5.8, 20).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );

    g.add(inputGear, frictionDisc, clutchHub, waveWasher, outPinion, axle);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-charge-slip-clutch',
        95,
        '#f59e0b',
        g,
        new THREE.Vector3(33.0, -16.5, 12.2),
        new THREE.Vector3(108.0, -28.0, 22.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH96. Porous Sintered Oil-Impregnated Bronze Gear Bushings & Thrust Washers
  // =========================================================================
  {
    const g = new THREE.Group();
    // Cluster of 4 flanged oil-impregnated sintered bronze (Oilite) bearings + mating polished PTFE thrust washers
    const coords: Array<[number, number]> = [
      [-3.4, 3.0],
      [3.4, 3.0],
      [-3.4, -3.0],
      [3.4, -3.0],
    ];
    const bushProf = [
      new THREE.Vector2(1.05, -1.2),
      new THREE.Vector2(1.85, -1.2),
      new THREE.Vector2(1.85, 0.72),
      new THREE.Vector2(2.65, 0.72),
      new THREE.Vector2(2.65, 1.25),
      new THREE.Vector2(1.05, 1.25),
    ];
    const bushGeo = markHiRes(new THREE.LatheGeometry(bushProf, 28)).rotateX(Math.PI / 2);

    for (const [bx, by] of coords) {
      const bush = new THREE.Mesh(bushGeo, mats.sinteredBronzeBushing);
      bush.position.set(bx, by, 0);
      g.add(bush);

      // Precision low-friction PTFE thrust washer seated against flange face
      const thrustWasher = new THREE.Mesh(
        hiResTorus(1.88, 0.34, 8, 24),
        mats.zifIvoryPlastic
      );
      thrustWasher.scale.set(1, 1, 0.38);
      thrustWasher.position.set(bx, by, 1.58);
      thrustWasher.userData.noEdges = true;
      g.add(thrustWasher);
    }

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-bronze-gear-bearings',
        96,
        '#b45309',
        g,
        new THREE.Vector3(31.0, -11.0, 12.1),
        new THREE.Vector3(116.0, -24.0, -18.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH97. Charge-Cam Low-Friction Bronze Cam-Follower Roller & Over-Travel Stopper
  // =========================================================================
  {
    const g = new THREE.Group();
    // Forged steel rocker arm carrying a precision needle/bronze rolling follower wheel + elastomer over-travel bumper
    const armShape = new THREE.Shape();
    armShape.absarc(-4.2, 0, 2.2, Math.PI * 0.5, Math.PI * 1.5, false);
    armShape.lineTo(4.6, -1.35);
    armShape.absarc(4.6, 0, 1.35, -Math.PI * 0.5, Math.PI * 0.5, false);
    armShape.closePath();
    const arm = new THREE.Mesh(
      extrudeHiRes(armShape, 0.95, 0.08, 0.08, 2, 18),
      mats.linkArmSteel
    );
    g.add(arm);

    // Rolling bronze outer follower tire + inner hardened needle race
    const rollerOuter = new THREE.Mesh(
      hiResCyl(2.25, 2.25, 1.55, 28).rotateX(Math.PI / 2),
      mats.sinteredBronzeBushing
    );
    rollerOuter.position.set(4.6, 0, 1.35);
    const rollerPin = new THREE.Mesh(
      hiResCyl(0.82, 0.82, 2.6, 20).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    rollerPin.position.set(4.6, 0, 1.1);

    // 8 micro needle rollers visible along the exposed bearing ring
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const needle = new THREE.Mesh(
        hiResCyl(0.24, 0.24, 1.65, 10).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      needle.position.set(4.6 + Math.cos(a) * 1.22, Math.sin(a) * 1.22, 1.35);
      needle.userData.noEdges = true;
      g.add(needle);
    }

    // Pivot hub + rear elastomer over-travel arrest stopper
    const hub = new THREE.Mesh(
      hiResCyl(1.1, 1.1, 2.4, 20).rotateX(Math.PI / 2),
      mats.brassGear
    );
    hub.position.set(-4.2, 0, 0);
    const overStop = new THREE.Mesh(
      hiResCyl(1.35, 1.5, 1.6, 20).rotateX(Math.PI / 2),
      mats.butylDamperRubber
    );
    overStop.position.set(-2.2, -3.4, 0.3);
    g.add(rollerOuter, rollerPin, hub, overStop);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-cam-follower-roller',
        97,
        '#d97706',
        g,
        new THREE.Vector3(26.0, -16.0, 12.4),
        new THREE.Vector3(102.0, -46.0, -6.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH98. Precision H7-Tolerance Shutter-to-Body Alignment Dowel Pins & Datum Bushings
  // =========================================================================
  {
    const g = new THREE.Group();
    // Pair of ground hardened SUS440C H7 datum dowels (1 round + 1 diamond-relief locator) seated in stepped brass datum sleeves
    const dowelProf = [
      new THREE.Vector2(0.01, -3.4),
      new THREE.Vector2(1.05, -3.4),
      new THREE.Vector2(1.28, -2.85),
      new THREE.Vector2(1.28, 2.85),
      new THREE.Vector2(0.95, 3.45),
      new THREE.Vector2(0.01, 3.45),
    ];
    const dowelGeo = markHiRes(new THREE.LatheGeometry(dowelProf, 28)).rotateX(Math.PI / 2);

    for (let i = 0; i < 2; i++) {
      const dx = i === 0 ? -3.8 : 3.8;
      const pin = new THREE.Mesh(dowelGeo, mats.stainlessMachined);
      pin.position.set(dx, 0, 0);
      if (i === 1) pin.scale.set(1.0, 0.72, 1.0); // Diamond-cut directional relief pin prevents over-constraint!

      const bushing = new THREE.Mesh(
        hiResCyl(2.2, 2.2, 2.2, 26).rotateX(Math.PI / 2),
        mats.brassGear
      );
      bushing.position.set(dx, 0, -0.8);

      const bossRing = new THREE.Mesh(hiResTorus(2.25, 0.25, 8, 24), mats.invarScaleBar);
      bossRing.position.set(dx, 0, 0.5);
      bossRing.userData.noEdges = true;
      g.add(pin, bushing, bossRing);
    }

    // Thin datum gauge bridge connecting the twin reference bores visually
    const gaugeBar = new THREE.Mesh(
      createChamferedBoxGeo(11.6, 2.4, 0.5, 0.6, 0.08, 'z'),
      mats.magnesiumCast
    );
    gaugeBar.position.set(0, 0, -1.6);
    g.add(gaugeBar);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-datum-dowel-pins',
        98,
        '#64748b',
        g,
        new THREE.Vector3(7.5, 0.0, 11.6),
        new THREE.Vector3(114.0, 4.0, -36.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH99. Exposure-Completion Safety Interlock & Over-Travel Leaf Switch (US20070253707A1)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Molded PPS micro-switch block + twin gold-plated phosphor-bronze cantilevered leaf contacts + insulated plunger actuator
    const block = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 5.2, 2.2, 0.5, 0.1, 'z'),
      mats.mountPpsInsulator
    );
    block.position.set(-1.6, 0, 0);
    g.add(block);

    // Twin parallel bifurcated gold leaf blades (Normally-Closed safety monitor + Over-travel detection)
    for (const [ly, mat] of [
      [1.05, mats.goldPlating],
      [-0.85, mats.beCuSpring],
    ] as Array<[number, THREE.Material]>) {
      const leaf = new THREE.Mesh(
        createChamferedBoxGeo(8.2, 0.34, 1.25, 0.08, 0.03, 'z'),
        mat
      );
      leaf.position.set(3.8, ly, 0.15);
      leaf.rotation.z = ly > 0 ? -0.06 : 0.06;
      const domeContact = new THREE.Mesh(hiResSphere(0.45, 12, 10), mats.goldPlating);
      domeContact.position.set(7.2, ly + (ly > 0 ? -0.35 : 0.35), 0.15);
      domeContact.userData.noEdges = true;
      g.add(leaf, domeContact);
    }

    // White POM insulated cam-trip actuator nib + 3 solder tail pins
    const tripNib = new THREE.Mesh(
      hiResCyl(0.65, 0.52, 2.2, 16),
      mats.zifIvoryPlastic
    );
    tripNib.position.set(4.6, 2.6, 0.15);
    g.add(tripNib);

    for (let i = 0; i < 3; i++) {
      const lead = new THREE.Mesh(
        createChamferedBoxGeo(1.8, 0.42, 0.42, 0.08, 0.03, 'z'),
        mats.solderBallSilver
      );
      lead.position.set(-6.1, -1.4 + i * 1.4, 0);
      g.add(lead);
    }

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-exposure-interlock-sw',
        99,
        '#facc15',
        g,
        new THREE.Vector3(36.0, -6.0, 12.0),
        new THREE.Vector3(118.0, -42.0, -38.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH100. Coaxial Torque-Tunable Multi-Layer Friction Disc Brake Stack (JP2010-008647A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Authentic 8-component coaxial stack from Nidec Copal JP2010-008647A:
    // Shaft 1f + Brake Lever 4 + Friction Ring 5 + Sleeve 6 + Washer 7 + Leaf Spring 8 + Inner Comp Spring 9 + Outer Torsion Spring 10 + Cal Nut 11!
    const shaft = new THREE.Mesh(
      hiResCyl(1.0, 1.0, 9.2, 24).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    g.add(shaft);

    // Brake lever (4) catching the decelerating curtain arm
    const leverShape = new THREE.Shape();
    leverShape.absarc(0, 0, 2.9, 0.4, Math.PI * 1.6, false);
    leverShape.lineTo(8.2, -1.1);
    leverShape.lineTo(8.2, 1.3);
    leverShape.closePath();
    const brakeLever = new THREE.Mesh(
      extrudeHiRes(leverShape, 0.9, 0.08, 0.08, 2, 20),
      mats.shutterChassis
    );
    brakeLever.position.set(0, 0, -2.9);

    // Sintered friction ring (5)
    const frictionRing = new THREE.Mesh(
      hiResCyl(3.3, 3.3, 0.48, 28).rotateX(Math.PI / 2),
      mats.oilTrapPorousPad
    );
    frictionRing.position.set(0, 0, -2.0);

    // Stepped bronze sleeve collar (6) separating inner & outer springs
    const sleeve = new THREE.Mesh(
      hiResCyl(1.95, 1.95, 3.6, 26).rotateX(Math.PI / 2),
      mats.sinteredBronzeBushing
    );
    sleeve.position.set(0, 0, 0.1);

    // Flat thrust washer (7) + arched leaf pressure spring (8)
    const washer = new THREE.Mesh(
      hiResCyl(3.4, 3.4, 0.28, 28).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    washer.position.set(0, 0, -1.45);

    const leafSpring = new THREE.Mesh(
      createChamferedBoxGeo(6.8, 2.2, 0.24, 0.4, 0.04, 'z'),
      mats.beCuSpring
    );
    leafSpring.position.set(0, 0, 2.2);

    // Inner compression spring (9) inside sleeve + Outer return torsion spring (10) outside sleeve
    const innerSpring = new THREE.Mesh(
      buildHelicalSpringGeo(1.38, 0.16, 4.5, 3.2, 7, 48).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    innerSpring.position.set(0, 0, 0.2);
    innerSpring.userData.noEdges = true;

    const outerTorsion = new THREE.Mesh(
      buildTorsionSpringGeo(2.85, 0.24, 4.0, 0.62, 4.8),
      mats.beCuSpring
    );
    outerTorsion.position.set(0, 0, 0.15);
    outerTorsion.userData.noEdges = true;

    // Hex threaded torque-calibration nut (11) at front tip
    const nutShape = new THREE.Shape();
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const x = Math.cos(a) * 2.25;
      const y = Math.sin(a) * 2.25;
      if (i === 0) nutShape.moveTo(x, y);
      else nutShape.lineTo(x, y);
    }
    nutShape.closePath();
    const calNut = new THREE.Mesh(
      extrudeHiRes(nutShape, 1.15, 0.12, 0.12, 2, 6),
      mats.brassGear
    );
    calNut.position.set(0, 0, 3.45);

    g.add(brakeLever, frictionRing, sleeve, washer, leafSpring, innerSpring, outerTorsion, calNut);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-coaxial-friction-brake',
        100,
        '#d97706',
        g,
        new THREE.Vector3(-22.0, -16.0, 12.4),
        new THREE.Vector3(-58.0, -68.0, 22.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH101. Orthogonal Out-of-Plane Flexing Gap-Mounted Elastomer Buffer (JP2016-218101A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Baseplate support pillar with intentional radial air-gap + cantilevered curved elastomer buffer (緩衝部材73) flexing orthogonally along Z!
    const baseBoss = new THREE.Mesh(
      hiResCyl(1.75, 2.05, 2.8, 24).rotateX(Math.PI / 2),
      mats.shutterChassis
    );
    baseBoss.position.set(-4.2, 0, -0.4);

    // Gap-mounted elastomer buffer with enlarged mounting eye (visible intentional radial gap around pillar!)
    const bufShape = new THREE.Shape();
    bufShape.absarc(-4.2, 0, 3.0, Math.PI * 0.45, Math.PI * 1.55, false);
    bufShape.lineTo(4.8, -1.9);
    bufShape.quadraticCurveTo(7.2, 0, 4.8, 1.9);
    bufShape.closePath();
    const gapHole = new THREE.Path();
    gapHole.absarc(-4.2, 0, 2.25, 0, Math.PI * 2, true); // > 1.75mm boss radius = intentional orthogonal-flex gap!
    bufShape.holes.push(gapHole);

    const bufferMesh = new THREE.Mesh(
      extrudeHiRes(bufShape, 2.4, 0.18, 0.18, 2, 20),
      mats.butylDamperRubber
    );
    bufferMesh.position.set(0, 0, 0.25);

    // Cyan stress-relief flex grooves carved into impact nose
    for (const gy of [-0.7, 0.7]) {
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 0.42, 2.65, 0.12, 0.05, 'z'),
        mats.damperElastomer
      );
      rib.position.set(2.4, gy, 0.25);
      g.add(rib);
    }

    // Impact anvil striker pad
    const striker = new THREE.Mesh(
      createChamferedBoxGeo(1.4, 4.2, 2.2, 0.35, 0.08, 'z'),
      mats.titaniumRivet
    );
    striker.position.set(7.4, 0, 0.25);

    g.add(baseBoss, bufferMesh, striker);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-ortho-gap-buffer',
        101,
        '#14b8a6',
        g,
        new THREE.Vector3(-18.0, -18.5, 13.0),
        new THREE.Vector3(-34.0, -74.0, 44.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH102. Dual-Durometer Layered Silicone/Urethane End-Stop Cushion (Shore 35A + 75A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Steel retainer channel + firm Shore 75A dark urethane core + soft Shore 35A micro-ribbed silicone kiss skin
    const channel = new THREE.Mesh(
      createChamferedBoxGeo(16.0, 2.2, 3.0, 0.4, 0.08, 'z'),
      mats.shutterChassis
    );
    channel.position.set(0, -1.6, 0);

    // Firm core (Shore 75A)
    const firmCore = new THREE.Mesh(
      createChamferedBoxGeo(14.8, 1.9, 2.4, 0.35, 0.08, 'z'),
      mats.antiVibRubber
    );
    firmCore.position.set(0, 0.25, 0);

    // Soft kiss-layer outer skin (Shore 35A, pink-tinted silicone elastomer for clear visual layer contrast)
    const softSkin = new THREE.Mesh(
      createChamferedBoxGeo(14.4, 1.15, 2.2, 0.4, 0.12, 'z'),
      mats.thermalPadPink
    );
    softSkin.position.set(0, 1.55, 0);

    // 9 micro acoustic kiss-ribs along top contact surface
    for (let i = 0; i < 9; i++) {
      const rx = -6.0 + i * 1.5;
      const rib = new THREE.Mesh(
        hiResCyl(0.32, 0.42, 2.0, 14).rotateX(Math.PI / 2),
        mats.thermalPadPink
      );
      rib.position.set(rx, 2.25, 0);
      rib.userData.noEdges = true;
      g.add(rib);
    }

    g.add(channel, firmCore, softSkin);

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-dual-durometer-stop',
        102,
        '#ec4899',
        g,
        new THREE.Vector3(0.0, -21.0, 12.6),
        new THREE.Vector3(-10.0, -68.0, 24.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH103. 3-Electromagnet Active Deceleration Soft-Stop Braking Coils (JP2022-039332A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Common laminated permalloy back-rail carrying 3 miniaturized active-braking solenoid coils (Front-Stop / Rear-Stop / Pre-Arrest)
    const backRail = new THREE.Mesh(
      createChamferedBoxGeo(16.5, 4.0, 1.2, 0.5, 0.1, 'z'),
      mats.lensPermalloyShield
    );
    backRail.position.set(0, 0, -1.65);
    g.add(backRail);

    for (let i = 0; i < 3; i++) {
      const cx = (i - 1) * 5.2;
      const core = new THREE.Mesh(
        hiResCyl(1.15, 1.15, 3.8, 22).rotateX(Math.PI / 2),
        mats.pureIronArmature
      );
      core.position.set(cx, 0, 0.1);

      const coil = new THREE.Mesh(
        hiResCyl(2.15, 2.15, 2.6, 26).rotateX(Math.PI / 2),
        mats.copperCoil
      );
      coil.position.set(cx, 0, 0.05);

      // Front & rear polyimide coil bobbins
      for (const fz of [-1.25, 1.35]) {
        const flg = new THREE.Mesh(
          hiResCyl(2.35, 2.35, 0.24, 26).rotateX(Math.PI / 2),
          mats.polyimideFpc
        );
        flg.position.set(cx, 0, fz);
        g.add(flg);
      }

      // Gold solder pin pair at top edge
      for (const px of [-0.65, 0.65]) {
        const term = new THREE.Mesh(hiResCyl(0.22, 0.22, 1.5, 10), mats.goldPlating);
        term.position.set(cx + px, 2.75, -0.5);
        g.add(term);
      }
      g.add(core, coil);
    }

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-3em-softstop-coils',
        103,
        '#c2410c',
        g,
        new THREE.Vector3(34.0, 5.0, 12.5),
        new THREE.Vector3(22.0, -74.0, 34.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH104. Spring-Urged Floating Shutter Cradle & Contact Dampers (JP2022-039332A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-envelope floating outer cradle frame (保持部材 120) clearing the 36x24mm optical window completely!
    const cradleShape = createFrameShape(80.0, 59.0, 3.6, 46.0, 33.0, 1.8, -7.5, 0);
    const cradle = new THREE.Mesh(
      extrudeHiRes(cradleShape, 1.45, 0.14, 0.14, 2, 18),
      mats.magnesiumCast
    );
    g.add(cradle);

    // 3 helical isolation urging springs (402a-c) at triangular perimeter kinematic suspension points
    for (const [sx, sy] of [
      [-35.0, 24.5],
      [35.0, 24.5],
      [0.0, -25.0],
    ] as Array<[number, number]>) {
      const sp = new THREE.Mesh(
        buildHelicalSpringGeo(1.45, 0.22, 4.0, 3.4, 8, 44).rotateX(Math.PI / 2),
        mats.beCuSpring
      );
      sp.position.set(sx, sy, -2.0);
      sp.userData.noEdges = true;
      const cap = new THREE.Mesh(
        hiResCyl(1.8, 1.8, 0.5, 18).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      cap.position.set(sx, sy, -3.7);
      g.add(sp, cap);
    }

    // 2 lateral contact shear-damping elastomer pads (404a-b)
    for (const dx of [-40.6, 40.6]) {
      const pad = new THREE.Mesh(
        createChamferedBoxGeo(1.8, 9.6, 2.4, 0.45, 0.12, 'z'),
        mats.butylDamperRubber
      );
      pad.position.set(dx, 0.0, 0.15);
      g.add(pad);
    }

    parts.push(
      finalizePhase34ShutterPart(
        'shutter-floating-spring-cradle',
        104,
        '#64748b',
        g,
        new THREE.Vector3(7.5, 0.0, 13.4),
        new THREE.Vector3(48.0, -72.0, 10.0),
        cp
      )
    );
  }

  return parts;
}
