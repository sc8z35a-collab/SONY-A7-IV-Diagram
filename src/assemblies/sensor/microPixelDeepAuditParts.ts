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
import { MICRO_DEEP_AUDIT_EXPLANATIONS } from './microPixelDeepAuditExplanations';

function finalizeMicroDeepAuditPart(
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
    explanation: MICRO_DEEP_AUDIT_EXPLANATIONS[id],
    standaloneOnly: true,
  };
}

/**
 * Phase 20A — 15 Standalone-Only Micro Pixel Semiconductor Deep-Audit Nanoscale Layers (M36–M50 -> 50 total).
 * Strictly visible ONLY in standalone 'micro' mode; omitted completely in whole-camera views.
 * Scale: 2x2 pixel cross-section arrayW = 22.0 CAD units (1 pixel = 11.0), optical axis +Z -> -Z.
 */
export function buildMicroPixelDeepAuditParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const P = 11.0;
  const halfP = P / 2;
  const arrayW = P * 2; // 22.0

  // =========================================================================
  // M36. DSA Self-Assembled Pseudo High Refractive Index Nano-Pore Film (pHRF)
  // =========================================================================
  {
    const g = new THREE.Group();
    const baseFilm = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW - 0.3, arrayW - 0.3, 0.26),
      mats.nanoArIridescent
    );
    g.add(baseFilm);
    // 6x6 sub-wavelength DSA nanopore rings embossed onto the film
    for (let ix = -2.5; ix <= 2.5; ix += 1.0) {
      for (let iy = -2.5; iy <= 2.5; iy += 1.0) {
        const pore = new THREE.Mesh(
          new THREE.TorusGeometry(0.52, 0.12, 6, 12),
          mats.fluorineCoatCyan
        );
        pore.position.set(ix * 3.3, iy * 3.3, 0.14);
        pore.userData.noEdges = true;
        g.add(pore);
      }
    }

    parts.push(
      finalizeMicroDeepAuditPart(
        'micro-dsa-phrf-film',
        36,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, 3.65),
        new THREE.Vector3(31, 14, 24.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M37. Optical Black (OB) Tungsten Light-Shield Band & Auto Black-Level Clamp
  // =========================================================================
  {
    const g = new THREE.Group();
    // Opaque overhanging tungsten light-shield hood covering peripheral OB reference strip on +Y edge
    const obHood = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(arrayW + 1.2, 3.8, 0.35), 0.72, 0.05, 0.05, 8),
      mats.tungstenLightShield
    );
    obHood.position.set(0, 12.6, 0.6);
    // Side vertical optical light-trap skirt blocking oblique stray rays into OB pixel
    const obSkirt = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 1.0, 0.45, 2.2),
      mats.tungstenLightShield
    );
    obSkirt.position.set(0, 10.9, -0.35);
    // Reference OB photodiode blocks safely shadowed under the tungsten roof
    for (const ox of [-5.5, 5.5]) {
      const obPd = new THREE.Mesh(new THREE.BoxGeometry(8.2, 2.6, 1.4), mats.siliconPhotodiode);
      obPd.position.set(ox, 12.6, -1.25);
      g.add(obPd);
    }
    g.add(obHood, obSkirt);

    parts.push(
      finalizeMicroDeepAuditPart(
        'micro-ob-dark-clamp',
        37,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 5.8),
        new THREE.Vector3(0, 32, 27.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M38. 2-Layer Pixel Intermediate Poly-Si Heat-Resistant Wiring (Sony IEDM 2024)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Cross-grid heat-resistant doped polysilicon routing traces tucked between PD layer & 2nd Si layer
    for (const py of [-halfP, 0, halfP]) {
      const polyRow = new THREE.Mesh(
        new THREE.BoxGeometry(arrayW - 1.2, 0.85, 0.32),
        mats.gatePolysilicon
      );
      polyRow.position.set(0, py, 0);
      g.add(polyRow);
    }
    for (const px of [-halfP, halfP]) {
      const polyCol = new THREE.Mesh(
        new THREE.BoxGeometry(0.85, arrayW - 1.2, 0.32),
        mats.gatePolysilicon
      );
      polyCol.position.set(px, 0, 0.2);
      g.add(polyCol);
    }
    // High-temp SiO2 inter-layer dielectric pads supporting the poly-Si bridge
    const ildPad = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW - 0.4, arrayW - 0.4, 0.35, arrayW - 2.4, arrayW - 2.4, 0.2), 0.22, 0.02, 0.02, 10),
      mats.ftiOxide
    );
    ildPad.position.z = -0.18;
    g.add(ildPad);

    parts.push(
      finalizeMicroDeepAuditPart(
        'micro-inter-polysi-wiring',
        38,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, -4.15),
        new THREE.Vector3(-33, 14, -12.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M39. 2nd-Layer SOI Buried Oxide (BOX) Floor & 3D Pixel FinFET Insulating Base
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultrathin translucent SiO2 Buried Oxide (BOX) dielectric sheet under 2nd-layer FinFET islands
    const boxFloor = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(arrayW - 0.5, arrayW - 0.5, 0.4), 0.34, 0.03, 0.03, 10),
      mats.aluminaHighKFilm
    );
    g.add(boxFloor);
    // 4 raised fully-depleted SOI silicon fin islands sitting on top of the BOX floor
    for (const [fx, fy] of [
      [-halfP, halfP],
      [halfP, halfP],
      [-halfP, -halfP],
      [halfP, -halfP],
    ] as Array<[number, number]>) {
      for (const df of [-1.2, 0, 1.2]) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.42, 0.85), mats.siliconTransistorLayer);
        fin.position.set(fx, fy + df, -0.55);
        g.add(fin);
      }
      // 3-sided high-k wrap-around gate saddle straddling the SOI fins
      const gateStraddle = new THREE.Mesh(new THREE.BoxGeometry(1.15, 4.2, 1.05), mats.goldPlating);
      gateStraddle.position.set(fx, fy, -0.62);
      g.add(gateStraddle);
    }

    parts.push(
      finalizeMicroDeepAuditPart(
        'micro-soi-box-finfet',
        39,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, -5.2),
        new THREE.Vector3(33, -12, -16.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M40. Forming Gas Anneal (FGA) Atomic-Hydrogen Si-H Dangling-Bond Passivation Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    // Conformal translucent Si-H passivated interface skin hugging BSI Si surface
    const skin = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW - 0.4, arrayW - 0.4, 0.2),
      mats.opticalCementClear
    );
    g.add(skin);
    // Lattice of glowing emerald/cyan Si-H passivated atomic termination nodes
    for (let ix = -2; ix <= 2; ix++) {
      for (let iy = -2; iy <= 2; iy++) {
        const hNode = new THREE.Mesh(new THREE.SphereGeometry(0.36, 8, 8), mats.fluorineCoatCyan);
        hNode.position.set(ix * 4.2, iy * 4.2, 0.14);
        hNode.userData.noEdges = true;
        g.add(hNode);
      }
    }

    parts.push(
      finalizeMicroDeepAuditPart(
        'micro-h2-fga-passivation',
        40,
        '#14b8a6',
        g,
        new THREE.Vector3(0, 0, 2.75),
        new THREE.Vector3(-32, 20, 14.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // M41. Photodiode Salicide-Block (SAB) Mask & Selective NiSi Ohmic Silicide Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 protective SAB dielectric mask shields covering the sensitive photodiode footprints
    for (const [px, py] of [
      [-halfP, halfP],
      [halfP, halfP],
      [-halfP, -halfP],
      [halfP, -halfP],
    ] as Array<[number, number]>) {
      const sabShield = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(7.4, 7.4, 0.6), 0.22, 0.02, 0.02, 8),
        mats.mylarInsulatorFilm
      );
      sabShield.position.set(px, py, 0.12);
      g.add(sabShield);

      // Selective bright silvery NiSi silicide strips ONLY on transistor terminal pads outside SAB
      const nisiPad = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.3, 0.28), mats.sinteredSilver);
      nisiPad.position.set(px + (px > 0 ? 3.8 : -3.8), py, -0.18);
      g.add(nisiPad);
    }

    parts.push(
      finalizeMicroDeepAuditPart(
        'micro-sab-salicide-block',
        41,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, -3.15),
        new THREE.Vector3(32, 22, -6.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M42. Shallow Trench Isolation (STI), Gate Sidewall Spacers & LDD Regions
  // =========================================================================
  {
    const g = new THREE.Group();
    // Shallow oxide isolation trenches separating pixel transistor active zones
    const stiBarX = new THREE.Mesh(new THREE.BoxGeometry(arrayW - 0.6, 0.9, 0.95), mats.ftiOxide);
    const stiBarY = new THREE.Mesh(new THREE.BoxGeometry(0.9, arrayW - 0.6, 0.95), mats.ftiOxide);
    g.add(stiBarX, stiBarY);

    // 4 curved Si3N4 gate sidewall spacer pairs + LDD gradient diffusion zones
    for (const [gx, gy] of [
      [-halfP, halfP],
      [halfP, halfP],
      [-halfP, -halfP],
      [halfP, -halfP],
    ] as Array<[number, number]>) {
      for (const sx of [-1.25, 1.25]) {
        const spacer = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.8, 0.85), mats.aluminaHighKFilm);
        spacer.position.set(gx + sx, gy, -0.1);
        const ldd = new THREE.Mesh(new THREE.BoxGeometry(0.95, 3.6, 0.36), mats.siliconDepletion);
        ldd.position.set(gx + sx * 1.45, gy, 0.3);
        g.add(spacer, ldd);
      }
    }

    parts.push(
      finalizeMicroDeepAuditPart(
        'micro-sti-ldd-spacer',
        42,
        '#6366f1',
        g,
        new THREE.Vector3(0, 0, -4.65),
        new THREE.Vector3(-34, -14, -14.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M43. Ta/TaN Copper-Diffusion Barrier Liner & Ti/TiN Tungsten Contact Plugs
  // =========================================================================
  {
    const g = new THREE.Group();
    // 16 vertical CVD Tungsten local contact plugs sheathed in dark metallic TaN diffusion sleeves
    for (let ix = -1.5; ix <= 1.5; ix += 1.0) {
      for (let iy = -1.5; iy <= 1.5; iy += 1.0) {
        const px = ix * 5.2;
        const py = iy * 5.2;
        const wPlug = new THREE.Mesh(
          new THREE.CylinderGeometry(0.42, 0.36, 1.9, 10).rotateX(Math.PI / 2),
          mats.tungstenLightShield
        );
        wPlug.position.set(px, py, 0);
        const tanCollar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.56, 0.56, 1.7, 10, 1, true).rotateX(Math.PI / 2),
          mats.taNBarrierLiner
        );
        tanCollar.position.set(px, py, 0);
        g.add(wPlug, tanCollar);
      }
    }
    // Horizontal TaN-lined Cu damascene barrier channels
    for (const by of [-halfP, halfP]) {
      const linerChannel = new THREE.Mesh(new THREE.BoxGeometry(arrayW - 1.4, 1.25, 0.42), mats.taNBarrierLiner);
      linerChannel.position.set(0, by, -0.95);
      const cuFill = new THREE.Mesh(new THREE.BoxGeometry(arrayW - 1.8, 0.85, 0.46), mats.copperHybridBond);
      cuFill.position.set(0, by, -0.95);
      g.add(linerChannel, cuFill);
    }

    parts.push(
      finalizeMicroDeepAuditPart(
        'micro-cu-tan-barrier',
        43,
        '#c2410c',
        g,
        new THREE.Vector3(0, 0, -6.55),
        new THREE.Vector3(-33, 24, -20.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M44. Row Vertical Scanner Driver (V-Driver) & Negative-Bias TG (-1.2 V) Bus
  // =========================================================================
  {
    const g = new THREE.Group();
    // Vertical row-scanner driver spine on -X edge + dual horizontal negative-bias TG drive rails
    const driverSpine = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(3.2, arrayW - 0.6, 0.35), 0.72, 0.04, 0.04, 8),
      mats.siliconLogicLayer
    );
    driverSpine.position.set(-12.4, 0, 0);
    g.add(driverSpine);
    for (const ry of [-halfP, halfP]) {
      const tgRail = new THREE.Mesh(new THREE.BoxGeometry(arrayW + 1.4, 0.78, 0.28), mats.mountShimBlue);
      tgRail.position.set(-0.8, ry, 0.25);
      const levelShiftBlock = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 0.55), mats.rfGoldCoax);
      levelShiftBlock.position.set(-12.4, ry, 0.25);
      g.add(tgRail, levelShiftBlock);
    }

    parts.push(
      finalizeMicroDeepAuditPart(
        'micro-row-vdriver-levelshift',
        44,
        '#0284c7',
        g,
        new THREE.Vector3(0, 0, -9.4),
        new THREE.Vector3(-36, 4, -26.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M45. Column Constant-Current Bias Sink & Anti-Black-Sun Cascode Clamp
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 column current-sink & sun-clamp cascode transistor tiles along -Y readout edge
    for (let i = 0; i < 4; i++) {
      const cx = -7.8 + i * 5.2;
      const sinkBlock = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(3.8, 3.2, 0.35), 0.58, 0.04, 0.04, 8),
        mats.npuSiliconDie
      );
      sinkBlock.position.set(cx, -12.0, 0);
      const clampRail = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.65, 0.32), mats.gMasterRedBadge);
      clampRail.position.set(cx, -10.8, 0.35);
      g.add(sinkBlock, clampRail);
    }
    const commonBiasBus = new THREE.Mesh(new THREE.BoxGeometry(arrayW, 0.68, 0.26), mats.goldPlating);
    commonBiasBus.position.set(0, -13.2, 0.28);
    g.add(commonBiasBus);

    parts.push(
      finalizeMicroDeepAuditPart(
        'micro-col-bias-cascode',
        45,
        '#e11d48',
        g,
        new THREE.Vector3(0, 0, -10.2),
        new THREE.Vector3(6, -34, -28.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M46. Voltage-Domain Global Shutter Dual In-Pixel MIM/DRAM Storage Cell (α9 III Class)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 2x2 pixel-aligned pairs of 3D vertical cylindrical MIM/DRAM storage capacitors (C_S1 + C_S2 per pixel!)
    for (const [px, py] of [
      [-halfP, halfP],
      [halfP, halfP],
      [-halfP, -halfP],
      [halfP, -halfP],
    ] as Array<[number, number]>) {
      for (const [dx, matTop] of [
        [-2.0, mats.loficDielectric],
        [2.0, mats.goldPlating],
      ] as Array<[number, THREE.Material]>) {
        const cyl = new THREE.Mesh(
          new THREE.CylinderGeometry(1.45, 1.45, 2.2, 16).rotateX(Math.PI / 2),
          mats.dramCellArray
        );
        cyl.position.set(px + dx, py, 0);
        const capRing = new THREE.Mesh(
          new THREE.TorusGeometry(1.48, 0.22, 8, 18),
          matTop
        );
        capRing.position.set(px + dx, py, 1.05);
        capRing.userData.noEdges = true;
        g.add(cyl, capRing);
      }
    }

    parts.push(
      finalizeMicroDeepAuditPart(
        'micro-inpixel-dram-gs',
        46,
        '#7c3aed',
        g,
        new THREE.Vector3(0, 0, -11.4),
        new THREE.Vector3(34, 4, -33.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M47. Dual-Native ISO Column PGA & HCG/LCG Gain Control Bus
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const cx of [-halfP, halfP]) {
      // Differential switched-capacitor PGA op-amp tile + stepped gain-ratio capacitor ladder
      const ampBody = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(8.2, 4.2, 0.4), 0.56, 0.04, 0.04, 8),
        mats.ispSiliconDie
      );
      ampBody.position.set(cx, 0, 0);
      g.add(ampBody);
      for (let step = 0; step < 4; step++) {
        const gCap = new THREE.Mesh(
          new THREE.BoxGeometry(1.1 + step * 0.35, 1.6, 0.34),
          step < 2 ? mats.copperHybridBond : mats.goldPlating
        );
        gCap.position.set(cx - 2.6 + step * 1.75, 0, 0.4);
        g.add(gCap);
      }
    }
    const dcgBus = new THREE.Mesh(new THREE.BoxGeometry(arrayW - 1.0, 0.65, 0.24), mats.fluorineCoatCyan);
    dcgBus.position.set(0, 3.2, 0.3);
    g.add(dcgBus);

    parts.push(
      finalizeMicroDeepAuditPart(
        'micro-pga-dual-gain-bus',
        47,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, -12.0),
        new THREE.Vector3(34, -22, -35.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M48. On-Die PN-Junction Thermal Sensing Diode Array & ΔΣ Temp Monitor
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 distributed on-die thermal diode cells + precision Kelvin sense traces
    for (const [tx, ty] of [
      [-6.8, 6.8],
      [0, 0],
      [6.8, -6.8],
    ] as Array<[number, number]>) {
      const pRing = new THREE.Mesh(
        extrudeCentered(createFrameShape(3.2, 3.2, 0.4, 1.8, 1.8, 0.25), 0.42, 0.03, 0.03, 10),
        mats.gMasterRedBadge
      );
      pRing.position.set(tx, ty, 0);
      const nCore = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 0.48), mats.goldPlating);
      nCore.position.set(tx, ty, 0.05);
      g.add(pRing, nCore);
    }
    const senseBus = new THREE.Mesh(new THREE.BoxGeometry(18.5, 0.38, 0.2), mats.copperHybridBond);
    senseBus.rotation.z = -Math.PI / 4;
    senseBus.position.z = -0.25;
    g.add(senseBus);

    parts.push(
      finalizeMicroDeepAuditPart(
        'micro-onchip-temp-diode',
        48,
        '#ef4444',
        g,
        new THREE.Vector3(0, 0, -13.4),
        new THREE.Vector3(-34, -24, -40.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M49. On-Die OTP eFuse & Embedded Non-Volatile STT-eMRAM Calibration Block (IEDM 2025)
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-density MTJ magnetic tunnel junction eMRAM macro bank + laser/eFuse link strip
    const mramBase = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(13.0, 6.8, 0.5), 0.62, 0.04, 0.04, 8),
      mats.siliconDramLayer
    );
    g.add(mramBase);
    for (let ix = -2; ix <= 2; ix++) {
      for (const iy of [-1.4, 1.4]) {
        const mtj = new THREE.Mesh(
          new THREE.CylinderGeometry(0.68, 0.68, 0.46, 12).rotateX(Math.PI / 2),
          mats.neodymiumMagnet
        );
        mtj.position.set(ix * 2.2, iy, 0.45);
        g.add(mtj);
      }
    }
    // Row of golden OTP eFuse trim links
    for (let k = 0; k < 6; k++) {
      const fuse = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.42, 0.22), mats.goldPlating);
      fuse.position.set(-5.0 + k * 2.0, -4.4, 0.25);
      g.add(fuse);
    }

    parts.push(
      finalizeMicroDeepAuditPart(
        'micro-emram-otp-fuse',
        49,
        '#9333ea',
        g,
        new THREE.Vector3(0, 0, -16.2),
        new THREE.Vector3(-32, 26, -46.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M50. Die-Perimeter Hermetic Crack-Stop Metal Seal Ring & Al/Cu Bond Pad Frame
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual concentric copper/tungsten moisture & crack-stop walls wrapping entire die edge
    const outerWall = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW + 3.4, arrayW + 3.4, 0.55, arrayW + 2.2, arrayW + 2.2, 0.35), 2.4, 0.05, 0.05, 12),
      mats.copperHybridBond
    );
    const innerWall = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW + 1.5, arrayW + 1.5, 0.45, arrayW + 0.65, arrayW + 0.65, 0.3), 2.2, 0.04, 0.04, 12),
      mats.tungstenLightShield
    );
    g.add(outerWall, innerWall);

    // 12 perimeter Al/Cu wire-bond pads arranged along left/right edges
    for (let i = 0; i < 6; i++) {
      const py = -8.5 + i * 3.4;
      for (const sx of [-1, 1]) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(1.25, 1.8, 0.35), mats.sinteredSilver);
        pad.position.set(sx * (arrayW * 0.5 + 1.35), py, 1.28);
        g.add(pad);
      }
    }

    parts.push(
      finalizeMicroDeepAuditPart(
        'micro-rear-bump-sealring',
        50,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, -18.2),
        new THREE.Vector3(0, -16, -53.5),
        cp,
        0.26
      )
    );
  }

  return parts;
}
