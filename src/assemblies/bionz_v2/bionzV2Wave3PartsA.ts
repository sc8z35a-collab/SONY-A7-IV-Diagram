//@FLOW_MAP|file=src/assemblies/bionz_v2/bionzV2Wave3PartsA.ts|unit=bionz_v2|lines=1395|exports=finalizeWave3Part,makeBondStrut,addVectorArrow,createHexShape,createTrapezoidShape,addMetrologyPedestal
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
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  makeHiResHorizPlate,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

export function finalizeWave3Part(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.24
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 28, edgeOpacity);

  return {
    id,
    subsystem: 'bionz_v2',
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

/** Connect two 3D points with a fine nanoscale cylinder strut or atomic covalent bond */
export function makeBondStrut(
  a: THREE.Vector3,
  b: THREE.Vector3,
  radius: number,
  mat: THREE.Material,
  segs = 6
): THREE.Mesh {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = Math.max(0.01, dir.length());
  const mesh = new THREE.Mesh(hiResCyl(radius, radius, len, segs), mat);
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  mesh.userData.noEdges = true;
  return mesh;
}

/** Build a crisp 3D directional physics vector arrow (shaft + conical arrowhead) */
export function addVectorArrow(
  g: THREE.Group,
  a: THREE.Vector3,
  b: THREE.Vector3,
  shaftR: number,
  headR: number,
  headLen: number,
  mat: THREE.Material
): void {
  const dir = new THREE.Vector3().subVectors(b, a);
  const totalLen = dir.length();
  if (totalLen < 0.02) return;
  const unit = dir.clone().normalize();
  const sLen = Math.max(0.02, totalLen - headLen);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), unit);

  const shaft = new THREE.Mesh(hiResCyl(shaftR, shaftR, sLen, 6), mat);
  shaft.position.copy(a).addScaledVector(unit, sLen * 0.5);
  shaft.quaternion.copy(q);
  shaft.userData.noEdges = true;

  const head = new THREE.Mesh(hiResCyl(0.004, headR, headLen, 8), mat);
  head.position.copy(a).addScaledVector(unit, sLen + headLen * 0.5);
  head.quaternion.copy(q);
  head.userData.noEdges = true;

  g.add(shaft, head);
}

/** Regular hexagonal prism cross-section shape */
export function createHexShape(radius: number): THREE.Shape {
  const s = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const ang = (Math.PI / 3) * i + Math.PI / 6;
    const x = Math.cos(ang) * radius;
    const y = Math.sin(ang) * radius;
    if (i === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  s.closePath();
  return s;
}

/** Trapezoidal etched-ridge waveguide cross-section (e.g., 60° slanted TFLN ridge) */
export function createTrapezoidShape(topW: number, botW: number, h: number): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-botW * 0.5, -h * 0.5);
  s.lineTo(botW * 0.5, -h * 0.5);
  s.lineTo(topW * 0.5, h * 0.5);
  s.lineTo(-topW * 0.5, h * 0.5);
  s.closePath();
  return s;
}

/**
 * Precision stepped wafer-metrology cutaway pedestal with beveled metallic kerf bezel,
 * 4 corner gold laser alignment fiducial crosshairs (+), and micro-probe test pad strips.
 */
export function addMetrologyPedestal(
  g: THREE.Group,
  w: number,
  d: number,
  yCenter: number,
  bodyMat: THREE.Material,
  mats: MaterialLibrary
): void {
  // Lower beveled carrier slab
  const lower = makeHiResHorizPlate(
    createRoundedRectShape(w, d, 0.24),
    0.16,
    mats.matteBlackAnodized,
    0.025,
    1,
    8
  );
  lower.position.y = yCenter - 0.06;
  g.add(lower);

  // Upper precision silicon/substrate die block stepped slightly inward
  const upper = makeHiResHorizPlate(
    createRoundedRectShape(w - 0.14, d - 0.14, 0.2),
    0.14,
    bodyMat,
    0.02,
    1,
    8
  );
  upper.position.y = yCenter + 0.08;
  g.add(upper);

  // Recessed precision kerf frame around die perimeter
  const rimGeo = extrudeHiRes(
    createFrameShape(w - 0.18, d - 0.18, 0.14, w - 0.34, d - 0.34, 0.1),
    0.04,
    0.008,
    0.008,
    1,
    6
  );
  rimGeo.rotateX(Math.PI / 2);
  const rim = new THREE.Mesh(rimGeo, mats.stainlessMachined);
  rim.position.y = yCenter + 0.18;
  rim.userData.noEdges = true;
  g.add(rim);

  // 4 Gold Corner Laser Alignment Crosshairs (+)
  const armXGeo = createChamferedBoxGeo(0.18, 0.024, 0.036, 0.005, 0.004, 'y');
  const armZGeo = createChamferedBoxGeo(0.036, 0.024, 0.18, 0.005, 0.004, 'y');
  const fx = w * 0.5 - 0.24;
  const fz = d * 0.5 - 0.24;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const ax = new THREE.Mesh(armXGeo, mats.goldPlating);
      ax.position.set(sx * fx, yCenter + 0.18, sz * fz);
      ax.userData.noEdges = true;
      const az = new THREE.Mesh(armZGeo, mats.goldPlating);
      az.position.set(sx * fx, yCenter + 0.18, sz * fz);
      az.userData.noEdges = true;
      g.add(ax, az);
    }
  }

  // Front & back micro-metrology probe pads along long edge
  const padGeo = createChamferedBoxGeo(0.12, 0.026, 0.08, 0.006, 0.004, 'y');
  const span = Math.max(1.2, w - 1.2);
  const count = 8;
  for (let i = 0; i < count; i++) {
    const px = -span * 0.5 + (span / (count - 1)) * i;
    for (const sz of [-1, 1]) {
      const pd = new THREE.Mesh(padGeo, mats.copperHybridBond);
      pd.position.set(px, yCenter + 0.175, sz * (d * 0.5 - 0.16));
      pd.userData.noEdges = true;
      g.add(pd);
    }
  }
}

/**
 * Wave-3 Ultra-High-Detail 3D CAD Micro-Architectures — Group A (X2-86 – X2-95).
 * Every part is engineered as a multi-layered TEM/SEM cutaway micro-sculpture using
 * exclusively shared MaterialLibrary materials & reusable geometries for automatic
 * Tier-1 InstancedMesh compilation.
 */
export function buildBionzV2Wave3PartsA(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // X2-86. 2D TMD Semimetal van der Waals Contact (Sb(01-12) 0.285nm Gap / 42 Ω·μm & Sb-Pt / SnS2 pFET)
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.siliconBulk, mats);

    // Dual buried back-gate dielectric & SiO2/HfO2 hybrid substrate (1nm Sb2O3 + 2nm HfO2 EOT=0.67nm)
    const boxLayer = new THREE.Mesh(
      createChamferedBoxGeo(3.96, 0.12, 3.04, 0.03, 0.015, 'y'),
      mats.loficDielectric
    );
    boxLayer.position.y = -0.64;
    const hfo2Sub = new THREE.Mesh(
      createChamferedBoxGeo(3.88, 0.08, 2.94, 0.02, 0.01, 'y'),
      mats.aluminaHighKFilm
    );
    hfo2Sub.position.y = -0.54;
    g.add(boxLayer, hfo2Sub);

    // True 3D Trigonal-Prismatic S-Mo-S (left) & Se-W-Se (right) 2D Monolayer Ball-and-Stick Crystal Lattice
    const metalAtomGeo = hiResSphere(0.062, 7, 6);
    const chalcAtomGeo = hiResSphere(0.044, 6, 5);
    const cols = 10;
    const rows = 5;
    const pitchX = 0.36;
    const pitchZ = 0.44;
    const metalPts: THREE.Vector3[][] = [];

    for (let r = 0; r < rows; r++) {
      const rowArr: THREE.Vector3[] = [];
      for (let c = 0; c < cols; c++) {
        const ax = -1.62 + c * pitchX + (r % 2) * (pitchX * 0.5);
        const az = -0.88 + r * pitchZ;
        const isRight = ax > 0;
        const mPos = new THREE.Vector3(ax, -0.34, az);
        rowArr.push(mPos);

        const mAtom = new THREE.Mesh(
          metalAtomGeo,
          isRight ? mats.mofEmerald : mats.vcWorkingFluidCyan
        );
        mAtom.position.copy(mPos);
        mAtom.userData.noEdges = true;
        g.add(mAtom);

        // Top & bottom chalcogen atoms (trigonal prismatic sandwich)
        for (const dy of [-0.095, 0.095]) {
          const cPos = new THREE.Vector3(ax + 0.09, -0.34 + dy, az + 0.08);
          const ch = new THREE.Mesh(chalcAtomGeo, isRight ? mats.cinnabarAnodized : mats.goldPlating);
          ch.position.copy(cPos);
          ch.userData.noEdges = true;
          g.add(ch);
          // Covalent bond struts connecting Mo/W to top & bottom S/Se
          if ((r + c) % 2 === 0) {
            g.add(makeBondStrut(mPos, cPos, 0.014, mats.sinteredSilver, 5));
          }
        }
      }
      metalPts.push(rowArr);
    }
    // In-plane hexagonal lattice struts connecting neighboring transition metal sites
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols - 1; c++) {
        g.add(makeBondStrut(metalPts[r][c], metalPts[r][c + 1], 0.012, mats.titaniumRivet, 4));
      }
    }

    // Translucent 0.285 nm Compressed van der Waals Gap Plane (MIGS-free quantum tunnel interface)
    const vdwPlane = new THREE.Mesh(
      createChamferedBoxGeo(3.86, 0.04, 2.74, 0.01, 0.005, 'y'),
      mats.lensXaGlass
    );
    vdwPlane.position.y = -0.17;
    vdwPlane.userData.noEdges = true;
    g.add(vdwPlane);

    // Rhombohedral Sb(01-12) Layered Bilayer Contact Stacks (Left nFET S/D) & Sb/Pt Alloy Stacks (Right pFET S/D)
    const bilayerGeo = createChamferedBoxGeo(0.64, 0.095, 2.38, 0.02, 0.01, 'y');
    const sbAtomGeo = hiResSphere(0.036, 6, 5);
    const contactXs = [-1.52, -0.44, 0.44, 1.52];
    for (let idx = 0; idx < contactXs.length; idx++) {
      const cx = contactXs[idx];
      const isP = idx >= 2;
      // 4 stepped rhombohedral atomic bilayers showing (01-12) orientation
      for (let ly = 0; ly < 4; ly++) {
        const layer = new THREE.Mesh(
          bilayerGeo,
          isP
            ? ly % 2 === 0
              ? mats.titaniumRivet
              : mats.stainlessMachined
            : ly % 2 === 0
              ? mats.sinteredSilver
              : mats.solderBallSilver
        );
        layer.position.set(cx, -0.06 + ly * 0.125, 0);
        layer.scale.x = 1 - ly * 0.05;
        g.add(layer);
      }
      // Exposed front cutaway Sb / Pt atomic rows
      for (let k = 0; k < 4; k++) {
        const at = new THREE.Mesh(sbAtomGeo, isP ? mats.goldPlating : mats.fluorineCoatCyan);
        at.position.set(cx - 0.18 + k * 0.12, 0.06 + (k % 2) * 0.11, 1.22);
        at.userData.noEdges = true;
        g.add(at);
      }
      // Vertical tapered M0 Ru contact vias (3 per contact) + Top beveled Cu M1 rail
      const v0Geo = hiResCyl(0.075, 0.058, 0.34, 8);
      for (const vz of [-0.76, 0, 0.76]) {
        const v0 = new THREE.Mesh(v0Geo, u.cfeMolyWordlineMetal);
        v0.position.set(cx, 0.56, vz);
        v0.userData.noEdges = true;
        g.add(v0);
      }
      const m1Rail = new THREE.Mesh(
        createChamferedBoxGeo(0.46, 0.16, 2.66, 0.03, 0.015, 'y'),
        mats.copperHybridBond
      );
      m1Rail.position.set(cx, 0.81, 0);
      g.add(m1Rail);
    }

    // Center Twin Top-Gate HKMG Stacks with SiN Sidewall Spacers (Left nFET gate, Right pFET gate)
    for (const gx of [-0.98, 0.98]) {
      const hkU = new THREE.Mesh(
        createChamferedBoxGeo(0.28, 0.62, 2.52, 0.025, 0.01, 'y'),
        mats.aluminaHighKFilm
      );
      hkU.position.set(gx, 0.16, 0);
      const metalGate = new THREE.Mesh(
        createChamferedBoxGeo(0.18, 0.72, 2.44, 0.02, 0.01, 'y'),
        mats.goldPlating
      );
      metalGate.position.set(gx, 0.24, 0);
      g.add(hkU, metalGate);
      for (const sx of [-0.17, 0.17]) {
        const sp = new THREE.Mesh(
          createChamferedBoxGeo(0.06, 0.54, 2.54, 0.01, 0.005, 'y'),
          mats.quartzOlpf
        );
        sp.position.set(gx + sx, 0.12, 0);
        sp.userData.noEdges = true;
        g.add(sp);
      }
    }

    // Inter-device STI dielectric divider wall between nFET & pFET
    const divider = new THREE.Mesh(
      createChamferedBoxGeo(0.14, 0.64, 2.74, 0.02, 0.01, 'y'),
      mats.pyroGraphite
    );
    divider.position.set(0, 0.04, 0);
    g.add(divider);

    parts.push(
      finalizeWave3Part(
        'xv2-2d-tmd-sb-bi-vdw-contact',
        86,
        '#06b6d4',
        g,
        new THREE.Vector3(-14.2, 0.8, -20),
        new THREE.Vector3(-43, 2.5, -56),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-87. MW-ALD Amorphous Ternary High-k Hf0.44Al0.56O Corrugated Trench MIM/Gate Stack
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.siliconBulk, mats);

    // Silicon fin-trench base block with 4 deep high-aspect-ratio MIM/Gate trenches
    const finWallGeo = createChamferedBoxGeo(0.32, 0.96, 2.78, 0.03, 0.015, 'y');
    const tinLinerGeo = createChamferedBoxGeo(0.055, 0.98, 2.8, 0.01, 0.005, 'y');
    const hfLinerGeo = createChamferedBoxGeo(0.055, 0.94, 2.72, 0.01, 0.005, 'y');
    const alLinerGeo = createChamferedBoxGeo(0.045, 0.92, 2.66, 0.01, 0.005, 'y');
    const plugGeo = createChamferedBoxGeo(0.24, 0.88, 2.58, 0.025, 0.01, 'y');

    // 5 vertical silicon trench walls creating 4 corrugated trenches
    for (let i = 0; i < 5; i++) {
      const wx = -1.68 + i * 0.84;
      const wall = new THREE.Mesh(finWallGeo, mats.siliconLogicLayer);
      wall.position.set(wx, -0.22, 0);
      g.add(wall);
    }

    // Inside each of the 4 deep trenches: conformal TiN -> alternating HfO2/Al2O3 MW-ALD super-cycle -> W fill!
    for (let t = 0; t < 4; t++) {
      const tx = -1.26 + t * 0.84;
      // Bottom conformal floor stack
      const botTin = new THREE.Mesh(
        createChamferedBoxGeo(0.54, 0.07, 2.74, 0.01, 0.005, 'y'),
        mats.stainlessMachined
      );
      botTin.position.set(tx, -0.66, 0);
      const botHf = new THREE.Mesh(
        createChamferedBoxGeo(0.46, 0.07, 2.68, 0.01, 0.005, 'y'),
        mats.aluminaHighKFilm
      );
      botHf.position.set(tx, -0.59, 0);
      g.add(botTin, botHf);

      // Sidewall conformal atomic laminate layers (stepped forward on cutaway Z face!)
      for (const s of [-1, 1]) {
        const tinS = new THREE.Mesh(tinLinerGeo, mats.stainlessMachined);
        tinS.position.set(tx + s * 0.24, -0.2, 0);
        tinS.userData.noEdges = true;
        const hfS = new THREE.Mesh(hfLinerGeo, mats.aluminaHighKFilm);
        hfS.position.set(tx + s * 0.19, -0.18, 0.04);
        hfS.userData.noEdges = true;
        const alS = new THREE.Mesh(alLinerGeo, mats.fluorineCoatCyan);
        alS.position.set(tx + s * 0.145, -0.16, 0.08);
        alS.userData.noEdges = true;
        g.add(tinS, hfS, alS);
      }

      // Inner Tungsten/Molybdenum top electrode plug
      const plug = new THREE.Mesh(plugGeo, u.cfeMolyWordlineMetal);
      plug.position.set(tx, -0.1, -0.06);
      g.add(plug);
    }

    // Stepped 5-layer top super-cycle Hf0.44Al0.56O nanolaminate bridge cutaway across right half
    const topLamGeo = createChamferedBoxGeo(3.68, 0.055, 1.38, 0.02, 0.008, 'y');
    for (let k = 0; k < 5; k++) {
      const lam = new THREE.Mesh(
        topLamGeo,
        k % 2 === 0 ? mats.aluminaHighKFilm : mats.fluorineCoatCyan
      );
      lam.position.set(0, 0.28 + k * 0.068, -0.64 + k * 0.05);
      lam.userData.noEdges = true;
      g.add(lam);
    }

    // Exposed amorphous Hf/Al/O tetrahedral cluster beads along cutaway front cross-section
    const clusterGeo = hiResSphere(0.052, 6, 5);
    for (let i = 0; i < 12; i++) {
      const cx = -1.65 + i * 0.3;
      const cy = 0.05 + Math.sin(i * 1.7) * 0.24;
      const sp = new THREE.Mesh(
        clusterGeo,
        i % 3 === 0 ? mats.goldPlating : i % 3 === 1 ? mats.mofEmerald : mats.vcWorkingFluidCyan
      );
      sp.position.set(cx, cy, 1.44);
      sp.userData.noEdges = true;
      g.add(sp);
    }

    // Overhead 2.45 GHz ECR Microwave Slot-Waveguide & Twin Helmholtz Plasma Applicator Rings + Ion Shower
    const wgBar = new THREE.Mesh(
      createChamferedBoxGeo(3.64, 0.14, 0.36, 0.03, 0.015, 'y'),
      mats.copperHybridBond
    );
    wgBar.position.set(0, 0.88, 0.56);
    g.add(wgBar);
    const coilGeo = hiResTorus(0.56, 0.055, 8, 22);
    coilGeo.rotateX(Math.PI / 2);
    const coneGeo = hiResCyl(0.06, 0.26, 0.34, 10);
    for (const mx of [-1.08, 0, 1.08]) {
      const coil = new THREE.Mesh(coilGeo, mats.cinnabarAnodized);
      coil.position.set(mx, 0.86, 0.56);
      g.add(coil);
      const shower = new THREE.Mesh(coneGeo, mats.lensXaGlass);
      shower.position.set(mx, 0.58, 0.56);
      shower.userData.noEdges = true;
      g.add(shower);
    }

    parts.push(
      finalizeWave3Part(
        'xv2-mwald-hfalo-gate-dielectric',
        87,
        '#8b5cf6',
        g,
        new THREE.Vector3(0, 0.8, -20),
        new THREE.Vector3(0, 2.5, -58),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-88. IEEE CICC 2025 Synthesizable Beat-Frequency Odometer Aging & RARE Sensor Floorplan
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.siliconLogicLayer, mats);

    // 3 Isolated Power-Domain Floorplan Wells (Top Level-Shifter Domain, Ref Domain, Stress Domain)
    const domainGeo = createChamferedBoxGeo(3.96, 0.09, 0.92, 0.025, 0.01, 'y');
    for (const [dz, mat] of [
      [-0.98, mats.ispSiliconDie],
      [0, mats.npuSiliconDie],
      [0.98, mats.siliconPhotodiode],
    ] as const) {
      const dom = new THREE.Mesh(domainGeo, mat);
      dom.position.set(0, -0.64, dz);
      g.add(dom);
    }

    // 3 Paired Multi-Stage Ring-Oscillator Racetracks (INV / NAND / NOR: Unstressed Ref vs High-V Stressed)
    const invGateGeo = createChamferedBoxGeo(0.095, 0.22, 0.14, 0.012, 0.006, 'y');
    const trackGeo = hiResTorus(0.42, 0.042, 8, 22);
    trackGeo.rotateX(Math.PI / 2);
    const colXs = [-1.36, 0, 1.36];

    for (let i = 0; i < 3; i++) {
      const cx = colXs[i];
      // Back row: Golden Unstressed Reference RO (10 discrete inverter stages arrayed around ring!)
      const refRing = new THREE.Mesh(trackGeo, mats.vcWorkingFluidCyan);
      refRing.position.set(cx, -0.46, -0.96);
      g.add(refRing);

      // Front row: High-V/100°C Stressed RO (10 discrete stressed stages glowing crimson-copper!)
      const strRing = new THREE.Mesh(trackGeo, mats.cinnabarAnodized);
      strRing.position.set(cx, -0.46, 0.96);
      g.add(strRing);

      for (let st = 0; st < 8; st++) {
        const ang = (Math.PI * 2 * st) / 8;
        const rx = Math.cos(ang) * 0.42;
        const rz = Math.sin(ang) * 0.42;
        const gRef = new THREE.Mesh(invGateGeo, mats.mofEmerald);
        gRef.position.set(cx + rx, -0.34, -0.96 + rz);
        gRef.rotation.y = -ang;
        gRef.userData.noEdges = true;
        const gStr = new THREE.Mesh(invGateGeo, mats.copperHybridBond);
        gStr.position.set(cx + rx, -0.34, 0.96 + rz);
        gStr.rotation.y = -ang;
        gStr.userData.noEdges = true;
        g.add(gRef, gStr);
      }

      // Differential Phase-Frequency Detector (PFD) Cross-Coupled Latch Bridge in Center Domain
      const pfdBase = new THREE.Mesh(
        createChamferedBoxGeo(0.84, 0.28, 0.66, 0.03, 0.015, 'y'),
        mats.goldPlating
      );
      pfdBase.position.set(cx, -0.42, 0);
      g.add(pfdBase);

      // Dual waveguide feeds from Ref-RO & Stressed-RO into PFD
      g.add(
        makeBondStrut(
          new THREE.Vector3(cx - 0.14, -0.38, -0.56),
          new THREE.Vector3(cx - 0.14, -0.28, -0.26),
          0.032,
          mats.vcWorkingFluidCyan
        ),
        makeBondStrut(
          new THREE.Vector3(cx + 0.14, -0.38, 0.56),
          new THREE.Vector3(cx + 0.14, -0.28, 0.26),
          0.032,
          mats.cinnabarAnodized
        )
      );

      // 8-Bit Digital Beat Counter Register Tower (N_beat stepped bit-indicator bars!)
      const bitGeo = createChamferedBoxGeo(0.08, 0.34, 0.14, 0.01, 0.005, 'y');
      for (let b = 0; b < 6; b++) {
        const hScale = 0.45 + (((i * 5 + b * 3) % 6) / 6) * 1.15;
        const bit = new THREE.Mesh(
          bitGeo,
          (b + i) % 2 === 0 ? mats.fluorineCoatCyan : mats.goldPlating
        );
        bit.scale.y = hScale;
        bit.position.set(cx - 0.32 + b * 0.128, -0.14 + hScale * 0.15, 0);
        bit.userData.noEdges = true;
        g.add(bit);
      }
    }

    // Overhead 8-bit 300MHz–1.6GHz DCO Tuning Bridge + Memory-Mapped Telemetry Scan Bus
    const scanBus = new THREE.Mesh(
      createChamferedBoxGeo(3.84, 0.12, 0.26, 0.025, 0.01, 'y'),
      mats.copperHybridBond
    );
    scanBus.position.set(0, 0.62, 0);
    g.add(scanBus);
    for (const cx of colXs) {
      const via = new THREE.Mesh(hiResCyl(0.055, 0.055, 0.36, 8), mats.sinteredSilver);
      via.position.set(cx, 0.42, 0);
      via.userData.noEdges = true;
      g.add(via);
    }
    // DCO Tuning Coil Ring centered on top bus
    const dcoRing = new THREE.Mesh(hiResTorus(0.32, 0.05, 8, 20), mats.goldPlating);
    dcoRing.rotation.x = Math.PI / 2;
    dcoRing.position.set(0, 0.78, 0);
    g.add(dcoRing);

    parts.push(
      finalizeWave3Part(
        'xv2-odometer-fmax-aging-rtn-sensor',
        88,
        '#f43f5e',
        g,
        new THREE.Vector3(14.2, 0.8, -20),
        new THREE.Vector3(43, 2.5, -56),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-89. Stanford Science 2025 Ultrathin 1.5nm NbP Weyl Topological Semimetal Interconnect
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.siliconBulk, mats);

    // Translucent ULK dielectric matrix with etched low-k air-gap trenches between 6 NbP lines
    const ildBase = new THREE.Mesh(
      createChamferedBoxGeo(3.96, 0.26, 3.04, 0.03, 0.015, 'y'),
      mats.loficDielectric
    );
    ildBase.position.y = -0.56;
    g.add(ildBase);

    // 5 Ultrathin 1.5nm NbP Nanoribbon Stacks (Left/Center) + 1 Conventional Cu Scattering Comparison Line (Front)
    const nbSeedGeo = createChamferedBoxGeo(3.68, 0.065, 0.28, 0.012, 0.006, 'y');
    const nbpCoreGeo = createChamferedBoxGeo(3.68, 0.14, 0.24, 0.015, 0.008, 'y');
    const surfRailGeo = createChamferedBoxGeo(3.72, 0.042, 0.3, 0.01, 0.005, 'y');
    const sinCapGeo = createChamferedBoxGeo(3.68, 0.045, 0.26, 0.01, 0.005, 'y');
    const elecBeadGeo = hiResSphere(0.038, 6, 5);
    const viaGeo = hiResCyl(0.075, 0.055, 0.56, 8);

    for (let i = 0; i < 5; i++) {
      const rz = -1.16 + i * 0.48;
      // 1-4nm Nb(001) Seed Layer
      const seed = new THREE.Mesh(nbSeedGeo, mats.stainlessMachined);
      seed.position.set(0, -0.38, rz);
      seed.userData.noEdges = true;
      // Bottom topological Fermi-Arc surface state sheath
      const botSurf = new THREE.Mesh(surfRailGeo, mats.vcWorkingFluidCyan);
      botSurf.position.set(0, -0.31, rz);
      botSurf.userData.noEdges = true;
      // 1.5nm Noncrystalline / Nanocrystalline NbP core
      const core = new THREE.Mesh(nbpCoreGeo, u.cfeMolyWordlineMetal);
      core.position.set(0, -0.2, rz);
      // Top topological Fermi-Arc surface state highway
      const topSurf = new THREE.Mesh(surfRailGeo, mats.vcWorkingFluidCyan);
      topSurf.position.set(0, -0.09, rz);
      topSurf.userData.noEdges = true;
      // SiN Oxidation-Barrier Capping Layer
      const cap = new THREE.Mesh(sinCapGeo, mats.aluminaHighKFilm);
      cap.position.set(0, -0.03, rz);
      cap.userData.noEdges = true;
      g.add(seed, botSurf, core, topSurf, cap);

      // Ballistic surface-conduction electron wavepackets streaming cleanly along top edge
      for (let e = 0; e < 5; e++) {
        const b = new THREE.Mesh(elecBeadGeo, mats.goldPlating);
        b.position.set(-1.35 + e * 0.68 + (i % 2) * 0.2, 0.03, rz);
        b.userData.noEdges = true;
        g.add(b);
      }

      // Self-aligned V0 tapered vias rising to upper perpendicular M1 cross-bars
      for (const vx of [-1.24, 1.24]) {
        const via = new THREE.Mesh(viaGeo, mats.goldPlating);
        via.position.set(vx, 0.28, rz);
        via.userData.noEdges = true;
        g.add(via);
      }
    }

    // Front Comparison Trench: Conventional <5nm Cu line with thick TaN barrier & scattered red electron blocks!
    const cuZ = 1.24;
    const tanU = new THREE.Mesh(
      createChamferedBoxGeo(3.68, 0.26, 0.34, 0.02, 0.01, 'y'),
      mats.pyroGraphite
    );
    tanU.position.set(0, -0.22, cuZ);
    const cuCore = new THREE.Mesh(
      createChamferedBoxGeo(3.64, 0.18, 0.2, 0.015, 0.008, 'y'),
      mats.copperHybridBond
    );
    cuCore.position.set(0, -0.18, cuZ);
    g.add(tanU, cuCore);
    // Grain-boundary scattering collision nodes along Cu line
    for (let s = 0; s < 6; s++) {
      const scat = new THREE.Mesh(elecBeadGeo, mats.bodyRecRed);
      scat.position.set(-1.4 + s * 0.56, -0.04 + (s % 2) * 0.06, cuZ + ((s % 3) - 1) * 0.06);
      scat.userData.noEdges = true;
      g.add(scat);
    }

    // Upper Perpendicular M1 Cross-Bars connecting the NbP Via Columns + Directional Flow Arrows
    const m1BarGeo = createChamferedBoxGeo(0.46, 0.18, 2.58, 0.03, 0.015, 'y');
    for (const mx of [-1.24, 0, 1.24]) {
      const m1 = new THREE.Mesh(m1BarGeo, mx === 0 ? mats.sinteredSilver : mats.copperHybridBond);
      m1.position.set(mx, 0.62, -0.18);
      g.add(m1);
    }
    addVectorArrow(
      g,
      new THREE.Vector3(-0.78, 0.84, -0.18),
      new THREE.Vector3(0.78, 0.84, -0.18),
      0.032,
      0.085,
      0.22,
      mats.vcWorkingFluidCyan
    );

    parts.push(
      finalizeWave3Part(
        'xv2-nbp-topological-semimetal-line',
        89,
        '#38bdf8',
        g,
        new THREE.Vector3(-13.8, 8.2, 20),
        new THREE.Vector3(-42, 28, 56),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-90. imec IEDM 2025 Ordered B2 RuAl / Graphene-Capped Cu & 3-Level M0->M2 Supervia
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.siliconBulk, mats);

    // Translucent stepped ILD glass slab framing the 3-level BEOL cutaway
    const ildMid = new THREE.Mesh(
      createChamferedBoxGeo(3.86, 0.56, 1.48, 0.03, 0.015, 'y'),
      mats.lensXaGlass
    );
    ildMid.position.set(0, -0.18, -0.68);
    ildMid.userData.noEdges = true;
    g.add(ildMid);

    // LEVEL M0 (Bottom, X-running): 5 fine 16nm-pitch Ordered B2 RuAl intermetallic tracks
    const m0Geo = createChamferedBoxGeo(3.78, 0.16, 0.24, 0.02, 0.01, 'y');
    const m0Zs = [-1.14, -0.57, 0, 0.57, 1.14];
    for (const mz of m0Zs) {
      const m0 = new THREE.Mesh(m0Geo, mats.titaniumRivet);
      m0.position.set(0, -0.58, mz);
      g.add(m0);
    }

    // LEVEL M1 (Middle, Z-running): 4 Monolayer-Graphene-Capped Cu tracks with atomic honeycomb cap strips
    const m1Geo = createChamferedBoxGeo(0.24, 0.18, 2.94, 0.02, 0.01, 'y');
    const grCapGeo = createChamferedBoxGeo(0.28, 0.038, 2.98, 0.008, 0.004, 'y');
    for (const mx of [-1.52, -0.76, 0.76, 1.52]) {
      const m1 = new THREE.Mesh(m1Geo, mats.copperHybridBond);
      m1.position.set(mx, 0.04, 0);
      const gr = new THREE.Mesh(grCapGeo, mats.pyroGraphite);
      gr.position.set(mx, 0.155, 0);
      gr.userData.noEdges = true;
      g.add(m1, gr);
    }

    // HERO: 10 Tall Monolithic Tapered Barrierless RuAl Supervias threading cleanly BETWEEN M1 tracks (M0 -> M2!)
    const superViaGeo = hiResCyl(0.115, 0.088, 1.24, 10);
    for (const sx of [-0.36, 0.36]) {
      for (const sz of m0Zs) {
        const sv = new THREE.Mesh(superViaGeo, mats.sinteredSilver);
        sv.position.set(sx, 0.06, sz);
        g.add(sv);
      }
    }

    // Side Comparison Column (Leftmost edge): Conventional Dual-Stacked V0 -> M1 Pad -> V1 with thick RED TaN barriers!
    const shortViaGeo = hiResCyl(0.095, 0.082, 0.44, 8);
    const barrierRingGeo = hiResCyl(0.125, 0.125, 0.065, 8);
    for (const sz of [-0.57, 0.57]) {
      const v0 = new THREE.Mesh(shortViaGeo, mats.copperHybridBond);
      v0.position.set(-1.52, -0.26, sz);
      const v1 = new THREE.Mesh(shortViaGeo, mats.copperHybridBond);
      v1.position.set(-1.52, 0.36, sz);
      g.add(v0, v1);
      for (const by of [-0.46, -0.06, 0.18, 0.56]) {
        const br = new THREE.Mesh(barrierRingGeo, mats.bodyRecRed);
        br.position.set(-1.52, by, sz);
        br.userData.noEdges = true;
        g.add(br);
      }
    }

    // LEVEL M2 (Top, X-running): 5 wide low-R RuAl / Gold distribution tracks landed directly on Supervia tops!
    const m2Geo = createChamferedBoxGeo(3.84, 0.2, 0.3, 0.03, 0.015, 'y');
    for (const mz of m0Zs) {
      const m2 = new THREE.Mesh(m2Geo, mats.goldPlating);
      m2.position.set(0, 0.72, mz);
      g.add(m2);
    }

    parts.push(
      finalizeWave3Part(
        'xv2-rual-intermetallic-supervia',
        90,
        '#f59e0b',
        g,
        new THREE.Vector3(-6.9, 8.2, 20),
        new THREE.Vector3(-21, 28, 56),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-91. ISSCC 2026 Paper 8.5 Command-Aware Hybrid LDO (CA-HLDO: 48-Cell DLDO + ALDO + 20pF Comb)
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.siliconLogicLayer, mats);

    // LEFT: 6x6 (36-element) Segmented Thermometer/Binary-Weighted PMOS DLDO Power-Switch Array
    const swGeo = createChamferedBoxGeo(0.2, 0.32, 0.24, 0.02, 0.01, 'y');
    const drvRailGeo = createChamferedBoxGeo(0.055, 0.14, 2.38, 0.01, 0.005, 'y');
    for (let c = 0; c < 5; c++) {
      const sx = -1.78 + c * 0.27;
      // Vertical gate-control bus strip per column
      const rail = new THREE.Mesh(drvRailGeo, mats.goldPlating);
      rail.position.set(sx, -0.58, 0);
      rail.userData.noEdges = true;
      g.add(rail);
      for (let r = 0; r < 6; r++) {
        const sz = -1.04 + r * 0.415;
        const active = c < 3 || r < 4;
        const pmos = new THREE.Mesh(swGeo, active ? mats.vcWorkingFluidCyan : mats.stainlessMachined);
        pmos.position.set(sx, -0.34, sz);
        pmos.userData.noEdges = true;
        g.add(pmos);
      }
    }

    // CENTER: ACTCMD / WDQS Command-Snooping Feedforward Lookahead Core + Barrel Shifter & Level Shifter
    const cmdCore = new THREE.Mesh(
      createChamferedBoxGeo(0.76, 0.56, 2.42, 0.04, 0.02, 'y'),
      mats.goldPlating
    );
    cmdCore.position.set(-0.08, -0.34, 0);
    g.add(cmdCore);
    // 6 Feedforward high-speed command-lookahead signal traces jumping from Decoder to DLDO switches
    for (let k = 0; k < 5; k++) {
      const fz = -0.84 + k * 0.42;
      addVectorArrow(
        g,
        new THREE.Vector3(-0.46, 0.04, fz),
        new THREE.Vector3(-0.74, 0.04, fz),
        0.022,
        0.055,
        0.12,
        mats.cinnabarAnodized
      );
    }
    // Top command snooper logic sub-block
    const snoopCap = new THREE.Mesh(
      createChamferedBoxGeo(0.58, 0.26, 1.56, 0.03, 0.015, 'y'),
      mats.npuSiliconDie
    );
    snoopCap.position.set(-0.08, 0.08, 0);
    g.add(snoopCap);

    // RIGHT-BACK: Matched Differential Analog LDO (ALDO) Error Op-Amp + Continuous Pass FET
    const aldoBase = new THREE.Mesh(
      createChamferedBoxGeo(1.16, 0.48, 1.12, 0.04, 0.02, 'y'),
      mats.mofEmerald
    );
    aldoBase.position.set(1.22, -0.38, -0.68);
    g.add(aldoBase);
    // 4 Common-centroid matched differential input pair pillars on ALDO
    const pairGeo = createChamferedBoxGeo(0.22, 0.24, 0.22, 0.02, 0.01, 'y');
    for (const dx of [-0.24, 0.24]) {
      for (const dz of [-0.24, 0.24]) {
        const tr = new THREE.Mesh(pairGeo, mats.goldPlating);
        tr.position.set(1.22 + dx, -0.02, -0.68 + dz);
        tr.userData.noEdges = true;
        g.add(tr);
      }
    }

    // RIGHT-FRONT: Interdigitated Multi-Finger 20 pF On-Chip MOM/MIM Decoupling Capacitor Comb
    const fingerGeo = createChamferedBoxGeo(1.06, 0.34, 0.065, 0.01, 0.005, 'y');
    for (let f = 0; f < 8; f++) {
      const fz = 0.22 + f * 0.145;
      const fin = new THREE.Mesh(
        fingerGeo,
        f % 2 === 0 ? mats.copperHybridBond : mats.aluminaHighKFilm
      );
      fin.position.set(1.22 + (f % 2 === 0 ? -0.04 : 0.04), -0.42, fz);
      fin.userData.noEdges = true;
      g.add(fin);
    }

    // TOP: Low-Z M10 Regulated VDD_IO Power-Distribution H-Crown + Kelvin Sense Feedback Bus
    const crownFrameGeo = extrudeHiRes(
      createFrameShape(3.86, 2.54, 0.1, 3.36, 2.04, 0.06),
      0.16,
      0.02,
      0.02,
      1,
      6
    );
    crownFrameGeo.rotateX(Math.PI / 2);
    const crown = new THREE.Mesh(crownFrameGeo, mats.copperHybridBond);
    crown.position.y = 0.56;
    g.add(crown);
    // Vertical power delivery risers connecting DLDO, ALDO, and 20pF cap to the regulated VDD crown
    const riserGeo = hiResCyl(0.065, 0.065, 0.56, 8);
    for (const [rx, rz] of [
      [-1.5, -0.9],
      [-1.5, 0.9],
      [1.22, -0.68],
      [1.22, 0.72],
    ] as const) {
      const rs = new THREE.Mesh(riserGeo, mats.sinteredSilver);
      rs.position.set(rx, 0.18, rz);
      rs.userData.noEdges = true;
      g.add(rs);
    }
    // Cross-tie center bus bar
    const tieBar = new THREE.Mesh(
      createChamferedBoxGeo(3.68, 0.14, 0.28, 0.025, 0.01, 'y'),
      mats.goldPlating
    );
    tieBar.position.set(0, 0.64, 0);
    g.add(tieBar);

    parts.push(
      finalizeWave3Part(
        'xv2-isscc26-ca-hybrid-dldo',
        91,
        '#10b981',
        g,
        new THREE.Vector3(0, 8.2, 20),
        new THREE.Vector3(0, 28, 58),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-92. All-Digital On-Die Supply-Noise Oscilloscope (VCO + 16-Stage Vernier TDC + Synthetic Load)
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.siliconLogicLayer, mats);

    // BACK: Dual-Chain 16-Stage Vernier Delay-Line TDC (Slow chain τ1 vs Fast chain τ2 + 16 Arbiter FFs!)
    const cellGeo = createChamferedBoxGeo(0.16, 0.26, 0.18, 0.015, 0.008, 'y');
    const arbGeo = createChamferedBoxGeo(0.14, 0.36, 0.22, 0.015, 0.008, 'y');
    for (let i = 0; i < 14; i++) {
      const tx = -1.69 + i * 0.26;
      const slow = new THREE.Mesh(cellGeo, mats.vcWorkingFluidCyan);
      slow.position.set(tx, -0.48, -1.24);
      slow.userData.noEdges = true;
      const fast = new THREE.Mesh(cellGeo, mats.fluorineCoatCyan);
      fast.position.set(tx, -0.48, -0.78);
      fast.userData.noEdges = true;
      const arb = new THREE.Mesh(arbGeo, i < 9 ? mats.goldPlating : mats.stainlessMachined);
      arb.position.set(tx, -0.42, -1.01);
      arb.userData.noEdges = true;
      g.add(slow, fast, arb);
    }

    // CENTER: Calibrated 3D Oscilloscope Graticule Frame holding Multi-Harmonic 1st+2nd Droop Ringing Waveform!
    const gratFrameGeo = extrudeHiRes(
      createFrameShape(3.56, 1.12, 0.04, 3.38, 0.94, 0.02),
      0.06,
      0.01,
      0.01,
      1,
      6
    );
    const gratFrame = new THREE.Mesh(gratFrameGeo, mats.stainlessMachined);
    gratFrame.position.set(0, 0.34, 0.08);
    g.add(gratFrame);

    // Fine vertical & horizontal oscilloscope reticle grid bars
    const vGridGeo = createChamferedBoxGeo(0.018, 0.92, 0.018, 0.004, 0.003, 'y');
    for (let gx = -1.2; gx <= 1.21; gx += 0.6) {
      const vg = new THREE.Mesh(vGridGeo, mats.pyroGraphite);
      vg.position.set(gx, 0.34, 0.08);
      vg.userData.noEdges = true;
      g.add(vg);
    }
    const hGrid = new THREE.Mesh(
      createChamferedBoxGeo(3.36, 0.018, 0.018, 0.004, 0.003, 'y'),
      mats.pyroGraphite
    );
    hGrid.position.set(0, 0.38, 0.08);
    hGrid.userData.noEdges = true;
    g.add(hGrid);

    // Sculpted 22-segment Damped Supply-Droop Transient Waveform (L·di/dt 1st droop + package ringing)
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 22; i++) {
      const t = i / 22;
      const x = -1.56 + t * 3.12;
      const y =
        t < 0.14
          ? 0.56
          : 0.56 - 0.54 * Math.exp(-(t - 0.14) * 3.2) * Math.sin((t - 0.14) * Math.PI * 6.5);
      pts.push(new THREE.Vector3(x, y, 0.14));
    }
    for (let i = 0; i < pts.length - 1; i++) {
      g.add(makeBondStrut(pts[i], pts[i + 1], 0.048, mats.cinnabarAnodized, 6));
    }

    // FRONT: 8-Finger Synthetic di/dt Crowbar Current-Load Bank + On-Chip SRAM Trace Capture Buffer
    const crowGeo = createChamferedBoxGeo(0.28, 0.42, 0.54, 0.025, 0.01, 'y');
    for (let i = 0; i < 6; i++) {
      const cw = new THREE.Mesh(crowGeo, i % 2 === 0 ? mats.ispSiliconDie : mats.copperHybridBond);
      cw.position.set(-1.5 + i * 0.42, -0.44, 1.06);
      g.add(cw);
    }
    // Right-front: SRAM Waveform Capture Macro + VCO Ring
    const sramBuf = new THREE.Mesh(
      createChamferedBoxGeo(1.06, 0.46, 0.68, 0.03, 0.015, 'y'),
      u.v2BionzSramArray
    );
    sramBuf.position.set(1.24, -0.42, 1.04);
    g.add(sramBuf);
    const vcoRing = new THREE.Mesh(hiResTorus(0.28, 0.048, 8, 20), mats.goldPlating);
    vcoRing.rotation.x = Math.PI / 2;
    vcoRing.position.set(1.24, -0.06, 1.04);
    g.add(vcoRing);

    parts.push(
      finalizeWave3Part(
        'xv2-tdc-supply-noise-oscilloscope',
        92,
        '#ec4899',
        g,
        new THREE.Vector3(6.9, 8.2, 20),
        new THREE.Vector3(21, 28, 56),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-93. Monolithic CMOS Thin-Film CoZrTa (CZTB) / AlN Laminated Magnetic-Core FIVR Inductor
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, u.bionzAbfSubstrate, mats);

    // 2 Coupled Racetrack Solenoid Thin-Film Magnetic Power Inductors (Phase-A Back, Phase-B Front with Cutaway!)
    const lamCoreGeo = createChamferedBoxGeo(3.64, 0.042, 0.96, 0.015, 0.008, 'y');
    const alnBarGeo = createChamferedBoxGeo(3.6, 0.022, 0.92, 0.01, 0.005, 'y');
    const botTurnGeo = createChamferedBoxGeo(0.19, 0.14, 1.18, 0.02, 0.01, 'y');
    const sidePostGeo = createChamferedBoxGeo(0.19, 0.62, 0.16, 0.02, 0.01, 'y');
    const topTurnGeo = createChamferedBoxGeo(0.19, 0.14, 1.18, 0.02, 0.01, 'y');
    const fingerViaGeo = createChamferedBoxGeo(0.085, 0.56, 0.14, 0.012, 0.006, 'y');

    for (let ph = 0; ph < 2; ph++) {
      const iz = ph === 0 ? -0.78 : 0.78;
      // 10 Helical Electroplated Thick-Cu Solenoid Winding Turns (Bottom rail + 2 vertical posts + Top slanted rail)
      for (let t = 0; t < 10; t++) {
        const tx = -1.53 + t * 0.34;
        const bt = new THREE.Mesh(botTurnGeo, mats.copperHybridBond);
        bt.position.set(tx, -0.58, iz);
        bt.userData.noEdges = true;
        const lp = new THREE.Mesh(sidePostGeo, mats.copperHybridBond);
        lp.position.set(tx, -0.22, iz - 0.52);
        lp.userData.noEdges = true;
        const rp = new THREE.Mesh(sidePostGeo, mats.copperHybridBond);
        rp.position.set(tx, -0.22, iz + 0.52);
        rp.userData.noEdges = true;
        const tt = new THREE.Mesh(topTurnGeo, mats.copperHeatSpreader);
        tt.position.set(tx + 0.04, 0.14, iz);
        tt.rotation.y = -0.14; // Authentic helical pitch offset!
        tt.userData.noEdges = true;
        g.add(bt, lp, rp, tt);
      }

      // 6-Layer Alternating CoZrTa (CZTB) / 4nm AlN Laminated Anisotropic Magnetic Core inside the Cu Helix!
      for (let ly = 0; ly < 5; ly++) {
        const core = new THREE.Mesh(lamCoreGeo, ly % 2 === 0 ? mats.pyroGraphite : mats.titaniumRivet);
        core.position.set(0, -0.44 + ly * 0.105, iz);
        // Step front cutaway so individual CoZrTa/AlN laminations are clearly legible!
        if (ph === 1) core.scale.x = 1 - ly * 0.05;
        core.userData.noEdges = true;
        g.add(core);

        const iso = new THREE.Mesh(alnBarGeo, mats.aluminaHighKFilm);
        iso.position.set(0, -0.39 + ly * 0.105, iz);
        if (ph === 1) iso.scale.x = 1 - ly * 0.05;
        iso.userData.noEdges = true;
        g.add(iso);
      }

      // Finger-Patterned Magnetic Flux Closure Vias at both ends (+30% GHz Q!)
      for (const fx of [-1.86, 1.86]) {
        for (let f = 0; f < 4; f++) {
          const fv = new THREE.Mesh(fingerViaGeo, mats.stainlessMachined);
          fv.position.set(fx, -0.18, iz - 0.33 + f * 0.22);
          fv.userData.noEdges = true;
          g.add(fv);
        }
      }

      // Top Laminated CoZrTa Flux-Closure Cap (Full on Phase-A, Half-Cutaway on Phase-B to expose Cu windings!)
      const topCap = new THREE.Mesh(
        createChamferedBoxGeo(ph === 0 ? 3.74 : 1.72, 0.14, 1.06, 0.03, 0.015, 'y'),
        mats.titaniumRivet
      );
      topCap.position.set(ph === 0 ? 0 : -1.0, 0.38, iz);
      g.add(topCap);
    }

    // Center Spliced Isotropic/Anisotropic Magnetic Coupling Bridge (k = 0.5–0.89) + M10 Micro-Bumps
    const bridge = new THREE.Mesh(
      createChamferedBoxGeo(2.86, 0.16, 0.42, 0.03, 0.015, 'y'),
      mats.goldPlating
    );
    bridge.position.set(0, 0.62, 0);
    g.add(bridge);
    const bumpGeo = hiResSphere(0.085, 8, 6);
    for (const bx of [-1.2, -0.4, 0.4, 1.2]) {
      const bm = new THREE.Mesh(bumpGeo, mats.solderBallSilver);
      bm.position.set(bx, 0.78, 0);
      bm.userData.noEdges = true;
      g.add(bm);
    }

    parts.push(
      finalizeWave3Part(
        'xv2-cozrta-magnetic-fivr-inductor',
        93,
        '#d97706',
        g,
        new THREE.Vector3(13.8, 8.2, 20),
        new THREE.Vector3(42, 28, 56),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-94. TSMC 2026 Single-Crystal 4H-SiC Interposer (490 W/m·K, 410 GPa, TSCV + HBM4 + Optical)
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.mofEmerald, mats);

    // Translucent Single-Crystal 4H-SiC Interposer Slab
    const sicSlab = new THREE.Mesh(
      createChamferedBoxGeo(4.06, 0.44, 3.16, 0.04, 0.02, 'y'),
      mats.lensXaGlass
    );
    sicSlab.position.y = -0.42;
    g.add(sicSlab);

    // Internal 4H-SiC Hexagonal ABCB Stacking Crystal Columns + 12 Laser-Drilled TSCVs with Annular SiO2 Liners!
    const hexGeo = extrudeHiRes(createHexShape(0.22), 0.38, 0.015, 0.015, 1, 6);
    hexGeo.rotateX(Math.PI / 2);
    const linerGeo = hiResCyl(0.115, 0.115, 0.54, 10);
    const tscvCoreGeo = hiResCyl(0.072, 0.072, 0.62, 10);
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        const vx = -1.44 + c * 0.96;
        const vz = -0.96 + r * 0.96;
        const hx = new THREE.Mesh(hexGeo, mats.vcWorkingFluidCyan);
        hx.position.set(vx, -0.22, vz);
        hx.userData.noEdges = true;
        const ln = new THREE.Mesh(linerGeo, mats.aluminaHighKFilm);
        ln.position.set(vx, -0.4, vz);
        ln.userData.noEdges = true;
        const cu = new THREE.Mesh(tscvCoreGeo, mats.copperHybridBond);
        cu.position.set(vx, -0.38, vz);
        cu.userData.noEdges = true;
        g.add(hx, ln, cu);
      }
    }

    // Fine 2/2μm Multi-Layer Top Cu RDL Routing Bus Tracks across SiC Interposer Top Surface
    const rdlGeo = createChamferedBoxGeo(3.74, 0.055, 0.12, 0.01, 0.005, 'y');
    for (let k = 0; k < 7; k++) {
      const rdl = new THREE.Mesh(rdlGeo, k % 2 === 0 ? mats.copperHybridBond : mats.goldPlating);
      rdl.position.set(0, -0.14, -1.08 + k * 0.36);
      rdl.userData.noEdges = true;
      g.add(rdl);
    }

    // TOP CO-INTEGRATED HETEROGENEOUS STACKS ON ULTRA-STIFF 4H-SiC:
    // 1. Left: 2nm BIONZ XR2 Logic/ISP SoC Die with copper micro-bump skirt
    const socDie = new THREE.Mesh(
      createChamferedBoxGeo(1.42, 0.32, 2.18, 0.04, 0.02, 'y'),
      mats.ispSiliconDie
    );
    socDie.position.set(-1.08, 0.22, 0);
    const socLid = new THREE.Mesh(
      createChamferedBoxGeo(1.26, 0.08, 2.02, 0.02, 0.01, 'y'),
      mats.copperHeatSpreader
    );
    socLid.position.set(-1.08, 0.42, 0);
    g.add(socDie, socLid);

    // 2. Center: True 8-Hi Stacked HBM4 Memory Tower (8 discrete thinned DRAM slices + logic base!)
    const dramSliceGeo = createChamferedBoxGeo(0.92, 0.068, 1.38, 0.015, 0.008, 'y');
    for (let s = 0; s < 8; s++) {
      const sl = new THREE.Mesh(
        dramSliceGeo,
        s === 0 ? mats.npuSiliconDie : s % 2 === 0 ? mats.siliconBulk : mats.stainlessMachined
      );
      sl.position.set(0.24, 0.0 + s * 0.088, -0.34);
      sl.userData.noEdges = true;
      g.add(sl);
    }
    // High-voltage IVR power stage sitting cleanly in front of HBM4 on 2.8 MV/cm SiC
    const ivrBlk = new THREE.Mesh(
      createChamferedBoxGeo(0.92, 0.26, 0.66, 0.03, 0.015, 'y'),
      mats.goldPlating
    );
    ivrBlk.position.set(0.24, 0.14, 0.82);
    g.add(ivrBlk);

    // 3. Right: Co-Integrated SiPh / TFLN Optical Waveguide Engine with 4 glowing fiber edge-couplers!
    const optDie = new THREE.Mesh(
      createChamferedBoxGeo(0.96, 0.26, 2.18, 0.035, 0.015, 'y'),
      mats.evfDichroicMirror
    );
    optDie.position.set(1.36, 0.18, 0);
    g.add(optDie);
    const fibGeo = hiResCyl(0.038, 0.038, 0.46, 8);
    fibGeo.rotateZ(Math.PI / 2);
    for (let f = 0; f < 4; f++) {
      const fb = new THREE.Mesh(fibGeo, mats.vcWorkingFluidCyan);
      fb.position.set(1.94, 0.22, -0.72 + f * 0.48);
      fb.userData.noEdges = true;
      g.add(fb);
    }

    parts.push(
      finalizeWave3Part(
        'xv2-sic-single-crystal-interposer',
        94,
        '#14b8a6',
        g,
        new THREE.Vector3(-13.8, 14.8, 20),
        new THREE.Vector3(-42, 56, 56),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-95. TSMC CoPoS 310×310 mm Square Panel-Level Packaging (4 SoC + 12 HBM4 + Glass-Core Sandwich)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Square 310x310mm Chamfered EFEM Carrier Panel Base (Glass Core 400-800um + Si3N4 Stress-Comp Sandwich)
    const glassCore = makeHiResHorizPlate(
      createRoundedRectShape(4.46, 3.68, 0.14),
      0.26,
      mats.lensXaGlass,
      0.03,
      1,
      8
    );
    glassCore.position.y = -0.82;
    g.add(glassCore);

    // Through-Glass Via (TGV) Micro-Array visible along cutaway glass-core perimeter
    const tgvGeo = hiResCyl(0.042, 0.042, 0.32, 6);
    for (let i = 0; i < 10; i++) {
      const tx = -1.8 + i * 0.4;
      for (const tz of [-1.62, 1.62]) {
        const tv = new THREE.Mesh(tgvGeo, mats.copperHybridBond);
        tv.position.set(tx, -0.8, tz);
        tv.userData.noEdges = true;
        g.add(tv);
      }
    }

    // Si3N4 Stress-Compensation Film (Bow <= 75um, TTV <= 2um) + Multi-Layer 2/2um Panel RDL Cutaway
    const sinFilm = new THREE.Mesh(
      createChamferedBoxGeo(4.24, 0.08, 3.44, 0.02, 0.01, 'y'),
      u.bionzAbfSubstrate
    );
    sinFilm.position.y = -0.62;
    const rdlBus = new THREE.Mesh(
      createChamferedBoxGeo(4.12, 0.12, 3.32, 0.025, 0.01, 'y'),
      mats.copperHybridBond
    );
    rdlBus.position.y = -0.5;
    g.add(sinFilm, rdlBus);

    // Ghosted Ø300mm Round Wafer Comparison Ring inlaid on RDL surface showing eliminated corner dead-zone!
    const roundRef = new THREE.Mesh(hiResTorus(1.58, 0.032, 6, 32), mats.cinnabarAnodized);
    roundRef.rotation.x = Math.PI / 2;
    roundRef.position.y = -0.41;
    roundRef.userData.noEdges = true;
    g.add(roundRef);

    // 2x2 Tightly Tiled Square-Panel Reticle Packages (Each with 1 Large Rubin/XR2 SoC + 4 HBM4 Stacks + 2 LSI Bridges!)
    const pkgBaseGeo = createChamferedBoxGeo(1.78, 0.16, 1.38, 0.03, 0.015, 'y');
    const socDieGeo = createChamferedBoxGeo(0.78, 0.34, 0.88, 0.03, 0.015, 'y');
    const hbmStackGeo = createChamferedBoxGeo(0.28, 0.42, 0.38, 0.02, 0.01, 'y');
    const lsiBridgeGeo = createChamferedBoxGeo(0.18, 0.1, 0.86, 0.015, 0.008, 'y');

    for (const px of [-0.98, 0.98]) {
      for (const pz of [-0.76, 0.76]) {
        const sub = new THREE.Mesh(pkgBaseGeo, mats.siliconBulk);
        sub.position.set(px, -0.32, pz);
        g.add(sub);

        const soc = new THREE.Mesh(socDieGeo, mats.npuSiliconDie);
        soc.position.set(px, -0.04, pz);
        g.add(soc);

        // Twin embedded LSI silicon bridges flanking each SoC
        for (const bx of [-0.46, 0.46]) {
          const lsi = new THREE.Mesh(lsiBridgeGeo, mats.vcWorkingFluidCyan);
          lsi.position.set(px + bx, -0.19, pz);
          lsi.userData.noEdges = true;
          g.add(lsi);
        }

        // 4 HBM4 stacks per package (2 left + 2 right -> 16 HBM stacks on panel!)
        for (const hx of [-0.66, 0.66]) {
          for (const hz of [-0.26, 0.26]) {
            const hbm = new THREE.Mesh(hbmStackGeo, mats.goldPlating);
            hbm.position.set(px + hx, -0.02, pz + hz);
            hbm.userData.noEdges = true;
            g.add(hbm);
          }
        }
      }
    }

    // Precision Chamfered 4-Edge EFEM Stainless Alignment Frame + 4 Corner Vacuum-Chuck Fiducial Pins
    const bezelGeo = extrudeHiRes(
      createFrameShape(4.42, 3.64, 0.08, 3.96, 3.18, 0.05),
      0.16,
      0.02,
      0.02,
      1,
      6
    );
    bezelGeo.rotateX(Math.PI / 2);
    const bezel = new THREE.Mesh(bezelGeo, mats.stainlessMachined);
    bezel.position.y = 0.44;
    g.add(bezel);
    const pinGeo = hiResCyl(0.09, 0.09, 0.28, 10);
    for (const sx of [-2.02, 2.02]) {
      for (const sz of [-1.62, 1.62]) {
        const pn = new THREE.Mesh(pinGeo, mats.goldPlating);
        pn.position.set(sx, 0.52, sz);
        pn.userData.noEdges = true;
        g.add(pn);
      }
    }

    parts.push(
      finalizeWave3Part(
        'xv2-tsmc-copos-panel-packaging',
        95,
        '#6366f1',
        g,
        new THREE.Vector3(-6.9, 14.8, 20),
        new THREE.Vector3(-21, 56, 56),
        cp,
        0.22
      )
    );
  }

  return parts;
}
