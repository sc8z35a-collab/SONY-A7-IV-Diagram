import * as THREE from 'three';
import { MaterialLibrary } from '../../engine/Materials';
import { createFrameShape } from '../../engine/CadHelpers';
import {
  buildSpotWeldNuggets,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
} from '../../engine/UltraDetailBuilders';
import {
  addCopperTraceRuns,
  addEnigViaArray,
  addFlushPhillipsCapHead,
  addOpticalFiducial,
  addSilkscreenCourtyard,
  addSmdPassiveWithFillets,
  createDin6799EClipGeo,
  createKnurledCollarGeo,
  createThreadedRingLatheGeo,
  createTrueWaveSpringGeo,
} from './evfDetailHelpers';

function ringGeo(innerR: number, outerR: number, depth: number, bevel = 0.025, segs = 32): THREE.BufferGeometry {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const h = new THREE.Path();
  h.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  s.holes.push(h);
  return extrudeHiRes(s, depth, bevel, bevel, 1, segs);
}

/** E01: Silicone bellows pleats, grip serrations, rear bayonet trim & FDA-EP19 emboss */
export function enrichE01Eyecup(g: THREE.Group, mats: MaterialLibrary): void {
  // 3 sculpted external fluorosilicone accordion bellows pleat rings around flexible neck/shroud
  for (const [bz, w, h, cr] of [
    [-0.1, 33.1, 26.5, 6.8],
    [-1.4, 34.0, 27.3, 7.3],
    [-3.1, 35.4, 28.5, 8.2],
  ] as Array<[number, number, number, number]>) {
    const pleat = new THREE.Mesh(
      extrudeHiRes(createFrameShape(w, h, cr, w - 1.1, h - 1.1, cr - 0.5), 0.34, 0.08, 0.08, 2, 28),
      mats.epdmGasket
    );
    pleat.position.z = bz;
    pleat.userData.noEdges = true;
    g.add(pleat);
  }

  // Soft-touch inner face contour lip bevel & upper brow accent stitch groove
  const lipBevel = new THREE.Mesh(
    extrudeHiRes(createFrameShape(36.2, 29.0, 9.0, 34.4, 27.2, 8.2), 0.16, 0.04, 0.04, 1, 28),
    mats.matteBlackAnodized
  );
  lipBevel.position.z = -6.12;
  lipBevel.userData.noEdges = true;
  g.add(lipBevel);

  // Side ergonomic tactile anti-slip silicone grip serrations (5 per side)
  const serGeo = createChamferedBoxGeo(0.28, 0.42, 2.2, 0.08, 0.02, 'z');
  for (const sx of [-1, 1]) {
    for (let i = -2; i <= 2; i++) {
      const rib = new THREE.Mesh(serGeo, mats.matteBlackAnodized);
      rib.position.set(sx * 17.45, i * 1.65, -2.5);
      rib.userData.noEdges = true;
      g.add(rib);
    }
    // Brass bayonet retention wear inserts on inner slide rails
    const wearPad = new THREE.Mesh(createChamferedBoxGeo(0.32, 4.4, 0.24, 0.06, 0.02, 'z'), mats.brassGear);
    wearPad.position.set(sx * 14.35, 3.6, 1.84);
    wearPad.userData.noEdges = true;
    g.add(wearPad);
  }

  // Subtle molded lower release catch chevron bars & upper Sony FDA-EP19 mold seam bar
  const chevGeo = new THREE.BoxGeometry(1.4, 0.22, 0.12);
  for (let i = -2; i <= 2; i++) {
    const ch = new THREE.Mesh(chevGeo, mats.titaniumRivet);
    ch.position.set(i * 2.1, -11.45, 0.56);
    ch.userData.noEdges = true;
    g.add(ch);
  }
}

/** E02: Stainless rail channels, brass pivot bushings, CuBe2 anti-rattle dimples & screw collars */
export function enrichE02Latch(g: THREE.Group, mats: MaterialLibrary): void {
  // Contrasting dark titanium inner aperture chamfer frame
  const innerCham = new THREE.Mesh(
    extrudeHiRes(createFrameShape(25.2, 19.4, 3.6, 24.45, 18.65, 3.4), 0.14, 0.02, 0.02, 1, 24),
    mats.titaniumRivet
  );
  innerCham.position.z = -0.34;
  innerCham.userData.noEdges = true;
  g.add(innerCham);

  const collarGeo = ringGeo(0.68, 1.04, 0.18, 0.02, 18);
  const dimpleGeo = hiResSphere(0.28, 10, 8);
  const bushGeo = ringGeo(0.38, 0.68, 0.24, 0.02, 16);
  const trackGrooveGeo = new THREE.BoxGeometry(0.36, 14.8, 0.12);

  for (const sx of [-1, 1]) {
    // Dark undercut slide track groove + 3 gold CuBe2 anti-rattle rail dimples per side
    const tr = new THREE.Mesh(trackGrooveGeo, mats.matteBlackAnodized);
    tr.position.set(sx * 13.4, 0.4, -0.58);
    tr.userData.noEdges = true;
    g.add(tr);

    for (const dy of [-3.2, 1.4, 6.0]) {
      const dm = new THREE.Mesh(dimpleGeo, mats.goldPlating);
      dm.scale.set(0.9, 1.2, 0.45);
      dm.position.set(sx * 12.6, dy, -0.62);
      dm.userData.noEdges = true;
      g.add(dm);
    }

    // Flanged bronze pivot bushing + DIN 6799 E-clip on claw pivot pin
    const bush = new THREE.Mesh(bushGeo, mats.brassGear);
    bush.position.set(sx * 14.2, -2.8, -0.56);
    const eClip = new THREE.Mesh(createDin6799EClipGeo(0.34, 0.62, 0.08), mats.mountSpringSteel);
    eClip.position.set(sx * 14.2, -2.8, -0.62);
    eClip.userData.noEdges = true;
    g.add(bush, eClip);

    // Brass countersunk screw seat collars around the 4 M1.2 Phillips screws
    for (const sy of [-8.8, 8.8]) {
      const col = new THREE.Mesh(collarGeo, mats.brassGear);
      col.position.set(sx * 11.4, sy, -0.34);
      g.add(col);
    }
  }
}

/** E03: Titanium outer chamfer ring, 4 corner shock pads, optical centering ticks & ITO perimeter bus */
export function enrichE03AntifogWindow(g: THREE.Group, mats: MaterialLibrary): void {
  // Contrasting machined titanium front bezel accent ring
  const frontAccent = new THREE.Mesh(
    extrudeHiRes(createFrameShape(24.2, 18.2, 3.2, 23.2, 17.2, 2.95), 0.08, 0.015, 0.015, 1, 28),
    mats.titaniumRivet
  );
  frontAccent.position.z = -0.92;
  frontAccent.userData.noEdges = true;
  g.add(frontAccent);

  // Subtle gold perimeter anti-fog thermal-ring micro-bus visible just inside optical bezel
  const busRing = new THREE.Mesh(
    extrudeHiRes(createFrameShape(21.45, 16.45, 2.72, 21.05, 16.05, 2.58), 0.06, 0.01, 0.01, 1, 24),
    mats.goldPlating
  );
  busRing.position.z = -0.91;
  busRing.userData.noEdges = true;
  g.add(busRing);

  // 4 corner silicone shock-isolation pads + 4 optical centering fiducial ticks on bezel face
  const padGeo = createChamferedBoxGeo(1.6, 1.6, 0.14, 0.25, 0.02, 'z');
  for (const [cx, cy] of [
    [-10.8, 7.8],
    [10.8, 7.8],
    [-10.8, -7.8],
    [10.8, -7.8],
  ] as Array<[number, number]>) {
    const pad = new THREE.Mesh(padGeo, mats.butylDamperRubber);
    pad.position.set(cx, cy, -0.9);
    pad.userData.noEdges = true;
    g.add(pad);
  }
  const tickGeo = new THREE.BoxGeometry(0.18, 0.65, 0.05);
  for (const [tx, ty, rz] of [
    [0, 8.65, 0],
    [0, -8.65, 0],
    [-11.55, 0, Math.PI / 2],
    [11.55, 0, Math.PI / 2],
  ] as Array<[number, number, number]>) {
    const tk = new THREE.Mesh(tickGeo, mats.invarScaleBar);
    tk.position.set(tx, ty, -0.94);
    tk.rotation.z = rz;
    tk.userData.noEdges = true;
    g.add(tk);
  }
}

/** E04: Recessed optical baffle hoods, micro-collimator rings, PCB traces/vias & 8 gold ZIF fingers */
export function enrichE04EyeSensor(g: THREE.Group, mats: MaterialLibrary): void {
  // Front chamfered titanium optical frame trim around housing face (-Z)
  const frontBezel = new THREE.Mesh(
    extrudeHiRes(createFrameShape(14.3, 3.45, 0.9, 13.5, 2.65, 0.65), 0.08, 0.015, 0.015, 1, 20),
    mats.titaniumRivet
  );
  frontBezel.position.z = -0.94;
  frontBezel.userData.noEdges = true;
  g.add(frontBezel);

  // Concentric internal optical collimator step rings inside VCSEL (-3.4) & SPAD (+0.6) barrels
  const stepRingGeo = hiResTorus(0.92, 0.06, 8, 22);
  for (const sx of [-3.4, 0.6]) {
    const sr = new THREE.Mesh(stepRingGeo, mats.brassGear);
    sr.position.set(sx, 0, -1.16);
    sr.userData.noEdges = true;
    g.add(sr);
  }
  // Micro optical alignment crosshair over ALS window (+4.8)
  addOpticalFiducial(g, 4.8, 0, -1.36, 0.42, 0.02, mats.goldPlating);

  // Rear PCB routed copper I2C/ToF traces + ENIG vias + silkscreen courtyard (local z = +1.53)
  addCopperTraceRuns(
    g,
    [
      [-6.0, 0.9, -1.2, 0.9],
      [-6.0, -0.9, -1.2, -0.9],
      [0.2, 0.65, 4.4, 0.65],
      [0.2, -0.65, 4.8, -0.65],
    ],
    0.1,
    0.025,
    1.54,
    mats.copperHeatSpreader
  );
  addEnigViaArray(
    g,
    [
      [-5.5, 1.3],
      [-3.0, 1.3],
      [1.2, 1.3],
      [5.5, 1.3],
      [-5.5, -1.3],
      [1.2, -1.3],
      [5.5, -1.3],
    ],
    1.54,
    0.04,
    0.16,
    0.07,
    mats.goldPlating,
    mats.velvetFlockTrap
  );
  addSilkscreenCourtyard(g, -1.2, 0, 2.95, 2.35, 1.54, 0.045, mats.invarScaleBar, 'tl');

  // 8 fine gold ZIF contact fingers + stainless stiffener on -X flex tail
  const zifPinGeo = new THREE.BoxGeometry(0.95, 0.14, 0.06);
  for (let i = 0; i < 8; i++) {
    const zp = new THREE.Mesh(zifPinGeo, mats.goldPlating);
    zp.position.set(-10.8, -0.52 + i * 0.21, 1.54);
    zp.userData.noEdges = true;
    g.add(zp);
  }
}

/** E05: 32-via ENIG ring fence, copper LED feed bridges, solder fillets, cathode marks & 10 ZIF fingers */
export function enrichE05IrLeds(g: THREE.Group, mats: MaterialLibrary): void {
  // 28x ENIG ground-stitching via fence circling the emerald HDI LED ring!
  const vias: Array<[number, number]> = [];
  for (let i = -5; i <= 5; i++) {
    vias.push([i * 1.85, 9.25], [i * 1.85, -9.25]);
  }
  for (let j = -2; j <= 2; j++) {
    vias.push([-11.75, j * 2.2], [11.75, j * 2.2]);
  }
  addEnigViaArray(g, vias, -0.37, 0.05, 0.16, 0.07, mats.goldPlating, mats.velvetFlockTrap);

  // Silkscreen cathode polarity bars & gold solder fillets paired next to all 8 IR LEDs
  const ledSpecs: Array<[number, number]> = [
    [-9.6, 5.8],
    [-3.8, 8.4],
    [3.8, 8.4],
    [9.6, 5.8],
    [9.6, -5.8],
    [3.8, -8.4],
    [-3.8, -8.4],
    [-9.6, -5.8],
  ];
  const polBarGeo = new THREE.BoxGeometry(0.18, 1.2, 0.04);
  const traceGeo = new THREE.BoxGeometry(0.22, 0.85, 0.04);
  for (const [lx, ly] of ledSpecs) {
    const a = Math.atan2(ly, lx);
    const pb = new THREE.Mesh(polBarGeo, mats.invarScaleBar);
    pb.position.set(lx - 1.15, ly, -0.39);
    pb.userData.noEdges = true;
    const tr = new THREE.Mesh(traceGeo, mats.copperHeatSpreader);
    tr.position.set(lx + Math.cos(a) * 0.95, ly + Math.sin(a) * 0.72, -0.38);
    tr.rotation.z = a + Math.PI / 2;
    tr.userData.noEdges = true;
    g.add(pb, tr);
  }

  // 10 crisp gold ZIF fingers + copper fan-out traces on lower-right flex tail
  const fGeo = new THREE.BoxGeometry(0.16, 1.05, 0.06);
  for (let i = 0; i < 10; i++) {
    const f = new THREE.Mesh(fGeo, mats.goldPlating);
    f.position.set(10.1 + i * 0.22, -9.2, 0.36);
    f.userData.noEdges = true;
    g.add(f);
  }
}

/** E06: Titanium clamp pads, 45° laser ticks, DIN 6799 E-clips & bronze thrust washers on trunnions */
export function enrichE06DichroicMirror(g: THREE.Group, mats: MaterialLibrary): void {
  // Add precision bronze thrust washers & true DIN 6799 E-clips on both ±X trunnion shafts!
  const washGeo = ringGeo(0.96, 1.38, 0.16, 0.02, 22).rotateY(Math.PI / 2);
  const clipGeo = createDin6799EClipGeo(0.88, 1.32, 0.12).rotateY(Math.PI / 2);
  const grooveGeo = hiResTorus(0.94, 0.05, 8, 20).rotateY(Math.PI / 2);

  for (const sx of [-1, 1]) {
    const wash = new THREE.Mesh(washGeo, mats.copperHeatSpreader);
    wash.position.set(sx * 9.88, 0, 0);
    const groove = new THREE.Mesh(grooveGeo, mats.velvetFlockTrap);
    groove.position.set(sx * 11.1, 0, 0);
    groove.userData.noEdges = true;
    const clip = new THREE.Mesh(clipGeo, mats.mountSpringSteel);
    clip.position.set(sx * 11.1, 0, 0);
    clip.userData.noEdges = true;
    g.add(wash, groove, clip);
  }

  // Tilted 45° optical alignment bezel ticks & silicone corner cushion pads inside the -45° mirror plane
  const tiltOverlay = new THREE.Group();
  tiltOverlay.rotation.x = -Math.PI / 4;

  const padGeo = createChamferedBoxGeo(1.1, 0.72, 0.54, 0.08, 0.02, 'z');
  for (const [px, py] of [
    [-7.8, 3.3],
    [7.8, 3.3],
    [-7.8, -3.3],
    [7.8, -3.3],
  ] as Array<[number, number]>) {
    const pad = new THREE.Mesh(padGeo, mats.butylDamperRubber);
    pad.position.set(px, py, 0);
    pad.userData.noEdges = true;
    tiltOverlay.add(pad);
  }
  const tickGeo = new THREE.BoxGeometry(0.18, 0.56, 0.05);
  for (let i = -3; i <= 3; i++) {
    const tk = new THREE.Mesh(tickGeo, i === 0 ? mats.goldPlating : mats.invarScaleBar);
    tk.position.set(i * 2.2, 4.0, -0.43);
    tk.userData.noEdges = true;
    tiltOverlay.add(tk);
  }
  g.add(tiltOverlay);
}

/** E07: Copper trace bus, ENIG via fence, brass datum collars, silkscreen courtyard & 16 ZIF fingers */
export function enrichE07GazeCamera(g: THREE.Group, mats: MaterialLibrary): void {
  // Brass alignment datum collars framing the 3 E28 alignment holes on the emerald PCB
  const bushGeo = ringGeo(0.72, 1.06, 0.9, 0.025, 18).rotateX(Math.PI / 2);
  for (const [hx, hz] of [
    [-4.6, -3.1],
    [4.6, -3.1],
    [0.0, 3.25],
  ] as Array<[number, number]>) {
    const b = new THREE.Mesh(bushGeo, mats.brassGear);
    b.position.set(hx, -2.0, hz);
    g.add(b);
  }

  // Routed copper traces & ENIG via fence on top (+Y) face of emerald gaze-camera PCB (local y = -1.55)
  const pcbTop = new THREE.Group();
  pcbTop.rotation.x = -Math.PI / 2;
  pcbTop.position.y = -1.54;
  addCopperTraceRuns(
    pcbTop,
    [
      [-5.8, -1.5, -4.1, -1.5],
      [-5.8, 0.5, -4.1, 0.5],
      [4.1, -0.4, 5.8, -0.4],
      [4.1, 0.4, 5.8, 0.4],
      [-3.5, 2.35, -3.5, 3.65],
      [3.5, 2.35, 3.5, 3.65],
    ],
    0.12,
    0.028,
    0,
    mats.copperHeatSpreader
  );
  addEnigViaArray(
    pcbTop,
    [
      [-6.8, -1.6],
      [-6.8, 0.0],
      [-6.8, 1.6],
      [6.8, -1.6],
      [6.8, 0.0],
      [6.8, 1.6],
      [-2.4, -3.6],
      [2.4, -3.6],
    ],
    0,
    0.04,
    0.16,
    0.07,
    mats.goldPlating,
    mats.velvetFlockTrap
  );
  addSilkscreenCourtyard(pcbTop, 5.8, -0.4, 2.2, 1.85, 0.01, 0.05, mats.invarScaleBar, 'tl');
  g.add(pcbTop);

  // Optical sapphire cover-glass perimeter bevel & crosshair over NIR CMOS die
  const coverRim = new THREE.Mesh(
    extrudeHiRes(createFrameShape(5.55, 3.55, 0.22, 5.15, 3.15, 0.16), 0.08, 0.015, 0.015, 1, 14).rotateX(
      Math.PI / 2
    ),
    mats.evfGlassEdgeRim
  );
  coverRim.position.y = -0.35;
  coverRim.userData.noEdges = true;
  g.add(coverRim);

  // 16 individual fine-pitch gold ZIF fingers on distal FPC tail
  const fGeo = new THREE.BoxGeometry(0.16, 0.06, 0.96);
  for (let i = 0; i < 16; i++) {
    const gf = new THREE.Mesh(fGeo, mats.goldPlating);
    gf.position.set(-2.02 + i * 0.27, -2.74, 5.6);
    gf.userData.noEdges = true;
    g.add(gf);
  }
}

/** E08: Machined barrel micro-grooves, brass optical trim ring, 3 UV-potting ports & Zeiss datum ticks */
export function enrichE08RearLens(g: THREE.Group, mats: MaterialLibrary): void {
  // Contrasting machined brass rear optical clamping shoulder ring tucked cleanly inside cell (z = -1.12, clears E67!)
  const brassTrim = new THREE.Mesh(ringGeo(10.22, 10.95, 0.12, 0.02, 48), mats.brassGear);
  brassTrim.position.z = -1.13;
  g.add(brassTrim);

  // 4 machined spanner witness notches + 12 engraved white optical-power ticks on rear anodized cell face
  const notchGeo = createChamferedBoxGeo(0.42, 0.65, 0.14, 0.04, 0.015, 'z');
  const tickGeo = new THREE.BoxGeometry(0.1, 0.42, 0.03);
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    if (i % 3 === 0) {
      const n = new THREE.Mesh(notchGeo, mats.velvetFlockTrap);
      n.position.set(Math.cos(a) * 10.6, Math.sin(a) * 10.6, -1.16);
      n.rotation.z = a + Math.PI / 2;
      n.userData.noEdges = true;
      g.add(n);
    } else {
      const tk = new THREE.Mesh(tickGeo, mats.invarScaleBar);
      tk.position.set(Math.cos(a) * 11.28, Math.sin(a) * 11.28, -1.19);
      tk.rotation.z = a + Math.PI / 2;
      tk.userData.noEdges = true;
      g.add(tk);
    }
  }

  // 3x 120° radial UV-potting inspection ports with brass sleeves around outer cell wall (R=11.72)
  const portGeo = hiResCyl(0.32, 0.32, 0.24, 14).rotateZ(Math.PI / 2);
  const glueGeo = hiResSphere(0.22, 10, 8);
  for (let k = 0; k < 3; k++) {
    const a = (k * Math.PI * 2) / 3 + 0.4;
    const pGrp = new THREE.Group();
    pGrp.rotation.z = a;
    const port = new THREE.Mesh(portGeo, mats.brassGear);
    port.position.set(11.66, 0, -0.35);
    const glue = new THREE.Mesh(glueGeo, mats.opticalCementClear);
    glue.position.set(11.74, 0, -0.35);
    glue.userData.noEdges = true;
    pGrp.add(port, glue);
    g.add(pGrp);
  }

  // Machined external grip micro-grooves along anodized cell barrel
  const grooveGeo = hiResTorus(11.72, 0.036, 6, 48);
  for (const gz of [-0.72, -0.36, 0.0]) {
    const gr = new THREE.Mesh(grooveGeo, mats.titaniumRivet);
    gr.position.z = gz;
    gr.userData.noEdges = true;
    g.add(gr);
  }
}

/** E09: Crimson lacquer lock beads, bronze guide-sleeve collars, PTFE U-fork glide pads & balance ticks */
export function enrichE09EdDoublet(g: THREE.Group, mats: MaterialLibrary): void {
  // 4 crimson factory thread-locking lacquer beads + engraved radial torque ticks on rear brass spanner ring
  const lacGeo = hiResSphere(0.24, 10, 8);
  const tickGeo = new THREE.BoxGeometry(0.1, 0.42, 0.04);
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    if (i % 2 === 0) {
      const bead = new THREE.Mesh(lacGeo, mats.mountRedIndexDot);
      bead.scale.set(1.2, 0.7, 0.55);
      bead.position.set(Math.cos(a) * 9.82, Math.sin(a) * 9.82, -2.14);
      bead.rotation.z = a;
      bead.userData.noEdges = true;
      g.add(bead);
    } else {
      const tk = new THREE.Mesh(tickGeo, mats.invarScaleBar);
      tk.position.set(Math.cos(a) * 9.42, Math.sin(a) * 9.42, -2.18);
      tk.rotation.z = a + Math.PI / 2;
      tk.userData.noEdges = true;
      g.add(tk);
    }
  }

  // Chamfered bronze oil-retention end collars on upper-right (-X) main linear guide sleeve (-11.4, +6.8)
  const collarGeo = ringGeo(0.84, 1.32, 0.24, 0.025, 22);
  for (const cz of [-1.42, 1.72]) {
    const col = new THREE.Mesh(collarGeo, mats.brassGear);
    col.position.set(-11.4, 6.8, cz);
    g.add(col);
  }

  // White PTFE low-friction glide-shoe pads lining the lower-left (+X) U-fork anti-rotation jaws (+11.4, -6.8)
  const padGeo = createChamferedBoxGeo(1.15, 0.14, 2.8, 0.04, 0.015, 'z');
  const forkOverlay = new THREE.Group();
  forkOverlay.position.set(11.4, -6.8, 0.15);
  forkOverlay.rotation.z = -0.52;
  for (const sy of [-0.82, 0.82]) {
    const pad = new THREE.Mesh(padGeo, mats.lcdDiffuserMatte);
    pad.position.set(1.1, sy, 0);
    pad.userData.noEdges = true;
    forkOverlay.add(pad);
  }
  g.add(forkOverlay);

  // Bright titanium outer chamfer trim rings on brass lead-screw nut yoke (-14.8, 0)
  const yokeTrimGeo = hiResTorus(2.26, 0.06, 8, 28);
  for (const yz of [-0.94, 1.24]) {
    const yt = new THREE.Mesh(yokeTrimGeo, mats.titaniumRivet);
    yt.position.set(-14.8, 0, yz);
    yt.userData.noEdges = true;
    g.add(yt);
  }
}

/** E10: True DIN 6799 E-clips, bronze pillow-block collars & dark grease-retaining wiper rings */
export function enrichE10DiopterRails(g: THREE.Group, mats: MaterialLibrary): void {
  const rodCoords: Array<[number, number]> = [
    [-11.4, 6.8],
    [11.4, -6.8],
  ];
  const eClipGeo = createDin6799EClipGeo(0.58, 1.04, 0.16);
  const wiperGeo = hiResTorus(0.68, 0.09, 8, 20);
  const brassEndGeo = ringGeo(0.66, 1.24, 0.22, 0.02, 22);

  for (const [rx, ry] of rodCoords) {
    for (const sz of [-4.25, 4.45]) {
      const collar = new THREE.Mesh(brassEndGeo, mats.brassGear);
      collar.position.set(rx, ry, sz + (sz > 0 ? 0.34 : -0.34));
      const clip = new THREE.Mesh(eClipGeo, mats.titaniumRivet);
      clip.position.set(rx, ry, sz + (sz > 0 ? -0.58 : 0.58));
      clip.userData.noEdges = true;
      g.add(collar, clip);
    }
    // Dual dark FKM micro-wiper oil-seal rings framing the preload spring (clears E09 PTFE liner!)
    for (const wz of [1.82, 3.68]) {
      const w = new THREE.Mesh(wiperGeo, mats.epdmGasket);
      w.position.set(rx, ry, wz);
      w.userData.noEdges = true;
      g.add(w);
    }
  }
}

/** E11: CNC arc lightening slots, laser diopter travel degree ticks & gold grease micro-grooves */
export function enrichE11Helicoid(helicoidSleeveGroup: THREE.Group, mats: MaterialLibrary): void {
  // Bright machined stainless chamfer rings on front & rear thrust-bearing races
  const raceTrimGeo = hiResTorus(10.95, 0.055, 8, 48);
  for (const sz of [-3.06, 3.06]) {
    const rt = new THREE.Mesh(raceTrimGeo, mats.titaniumRivet);
    rt.position.z = sz;
    rt.userData.noEdges = true;
    helicoidSleeveGroup.add(rt);
  }

  // 12 laser-etched focal-travel index ticks on rear stainless bearing race (-3.08)
  const tickGeo = new THREE.BoxGeometry(0.1, 0.42, 0.04);
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    const tk = new THREE.Mesh(tickGeo, i === 0 ? mats.mountRedIndexDot : mats.velvetFlockTrap);
    tk.position.set(Math.cos(a) * 10.95, Math.sin(a) * 10.95, -3.08);
    tk.rotation.z = a + Math.PI / 2;
    tk.userData.noEdges = true;
    helicoidSleeveGroup.add(tk);
  }

  // Machined radial lightening pockets along mirrored outer helicoid arcs
  const pocketGeo = createChamferedBoxGeo(0.12, 1.35, 2.2, 0.14, 0.02, 'z');
  for (const ang of [2.09, 0.79, 0.19, 4.57, 3.97]) {
    const pk = new THREE.Mesh(pocketGeo, mats.titaniumRivet);
    pk.position.set(Math.cos(ang) * 11.22, Math.sin(ang) * 11.22, 0);
    pk.rotation.z = ang;
    pk.userData.noEdges = true;
    helicoidSleeveGroup.add(pk);
  }
}

/** E12: Stationary pillow-block hardware, lead-screw thrust collars & dial tactile grip + scale ticks */
export function enrichE12Diopter(
  diopterGroup: THREE.Group,
  leadScrewGroup: THREE.Group,
  diopterDialGroup: THREE.Group,
  mats: MaterialLibrary
): void {
  // 1. Stationary tie-bar stiffening ribs & countersunk clamp screw heads (mirrored to +4.2 local X)
  const barRib = new THREE.Mesh(createChamferedBoxGeo(0.32, 0.14, 9.2, 0.08, 0.02, 'z'), mats.titaniumRivet);
  barRib.position.set(4.2, -3.26, 6.9);
  diopterGroup.add(barRib);
  for (const sz of [3.2, 10.6]) {
    addFlushPhillipsCapHead(
      diopterGroup,
      [4.2, -3.22, sz],
      '-y',
      0.34,
      0.14,
      mats.stainlessMachined,
      mats.velvetFlockTrap
    );
  }

  // 2. Rotating Lead-Screw: bronze thrust collars + true DIN 6799 E-clip + gear lightening holes
  const thrustGeo = ringGeo(0.78, 1.18, 0.18, 0.02, 22);
  for (const tz of [-5.2, 5.1]) {
    const th = new THREE.Mesh(thrustGeo, mats.copperHeatSpreader);
    th.position.z = tz;
    leadScrewGroup.add(th);
  }
  const leadEClip = new THREE.Mesh(createDin6799EClipGeo(0.7, 1.18, 0.14), mats.mountSpringSteel);
  leadEClip.position.z = 6.72;
  leadEClip.userData.noEdges = true;
  leadScrewGroup.add(leadEClip);

  const hubHoleGeo = hiResCyl(0.24, 0.24, 1.16, 12).rotateX(Math.PI / 2);
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    const h = new THREE.Mesh(hubHoleGeo, mats.velvetFlockTrap);
    h.position.set(Math.cos(a) * 1.18, Math.sin(a) * 1.18, -6.2);
    h.userData.noEdges = true;
    leadScrewGroup.add(h);
  }

  // 3. Rotating Diopter Dial: recessed elastomer grip ring & silver chamfer bevels (facing -X)
  const gripRing = new THREE.Mesh(
    hiResTorus(4.2, 0.16, 10, 40).rotateY(Math.PI / 2),
    mats.epdmGasket
  );
  gripRing.position.x = -2.98;
  gripRing.userData.noEdges = true;
  const bevelRingGeo = hiResTorus(4.02, 0.06, 8, 40).rotateY(Math.PI / 2);
  for (const dx of [-2.12, -3.84]) {
    const br = new THREE.Mesh(bevelRingGeo, mats.stainlessMachined);
    br.position.x = dx;
    br.userData.noEdges = true;
    diopterDialGroup.add(br);
  }
  const brassHub = new THREE.Mesh(ringGeo(0.94, 1.38, 0.28, 0.02, 22).rotateY(Math.PI / 2), mats.brassGear);
  brassHub.position.x = 2.45;
  diopterDialGroup.add(gripRing, brassHub);
}

/** E13: 4 brass corner bushings, crimson lacquer beads on spanner ring, stray-light baffle & titanium rim */
export function enrichE13FieldLens(g: THREE.Group, mats: MaterialLibrary): void {
  // 4 gleaming brass press-fit alignment datum bushings inside the 4 corner holes of the field-stop flange
  const bushGeo = ringGeo(0.64, 1.05, 0.3, 0.02, 18);
  for (const [hx, hy] of [
    [-9.0, 7.2],
    [9.0, 7.2],
    [-9.0, -7.2],
    [9.0, -7.2],
  ] as Array<[number, number]>) {
    const b = new THREE.Mesh(bushGeo, mats.brassGear);
    b.position.set(hx, hy, 1.76);
    g.add(b);
  }

  // Outer machined titanium witness border on rear anodized field-stop mask
  const maskRim = new THREE.Mesh(
    extrudeHiRes(createFrameShape(20.9, 17.9, 2.5, 20.3, 17.3, 2.3), 0.06, 0.01, 0.01, 1, 22),
    mats.titaniumRivet
  );
  maskRim.position.z = 1.62;
  maskRim.userData.noEdges = true;
  g.add(maskRim);

  // 4 crimson thread-locking lacquer beads + 8 silver alignment ticks on front brass spanner ring (z=-1.31)
  const lacGeo = hiResSphere(0.22, 10, 8);
  const tickGeo = new THREE.BoxGeometry(0.1, 0.38, 0.04);
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    if (i % 2 === 0) {
      const lb = new THREE.Mesh(lacGeo, mats.mountRedIndexDot);
      lb.scale.set(1.2, 0.7, 0.5);
      lb.position.set(Math.cos(a) * 9.54, Math.sin(a) * 9.54, -1.3);
      lb.rotation.z = a;
      lb.userData.noEdges = true;
      g.add(lb);
    } else {
      const tk = new THREE.Mesh(tickGeo, mats.invarScaleBar);
      tk.position.set(Math.cos(a) * 9.15, Math.sin(a) * 9.15, -1.33);
      tk.rotation.z = a + Math.PI / 2;
      tk.userData.noEdges = true;
      g.add(tk);
    }
  }
}

/** E14: AuSn hermetic weld bead, dark display frame bezel, 24 gold feedthrough pins & brass ear bushings */
export function enrichE14OledPanel(g: THREE.Group, mats: MaterialLibrary): void {
  // Bright AuSn eutectic laser hermetic weld seam running around front rim of Kovar package wall
  const weldBead = new THREE.Mesh(
    extrudeHiRes(createFrameShape(23.5, 18.5, 1.4, 22.8, 17.8, 1.25), 0.08, 0.015, 0.015, 1, 22),
    mats.goldPlating
  );
  weldBead.position.z = -1.2;
  weldBead.userData.noEdges = true;
  g.add(weldBead);

  // Inner matte-black optical anti-glare bezel framing the active OLED display plane (flush with screen)
  const screenBezel = new THREE.Mesh(
    extrudeHiRes(createFrameShape(14.5, 11.1, 0.25, 13.55, 10.15, 0.14), 0.06, 0.01, 0.01, 1, 14),
    mats.velvetFlockTrap
  );
  screenBezel.position.z = -2.63;
  screenBezel.userData.noEdges = true;
  g.add(screenBezel);

  // Brass press-fit optical registration bushings inside both ±X Kovar mounting ears
  const earBushGeo = ringGeo(0.48, 0.78, 0.5, 0.02, 18);
  for (const sx of [-1, 1]) {
    const eb = new THREE.Mesh(earBushGeo, mats.brassGear);
    eb.position.set(sx * 12.5, 0, 0.02);
    g.add(eb);
  }

  // 24 individual gold hermetic Kovar package feedthrough pins along bottom FPC exit bar
  const pinGeo = new THREE.BoxGeometry(0.24, 0.72, 0.42);
  for (let i = 0; i < 24; i++) {
    const p = new THREE.Mesh(pinGeo, i % 2 === 0 ? mats.goldPlating : mats.copperHeatSpreader);
    p.position.set(-5.4 + i * 0.47, -9.62, 0.08);
    p.userData.noEdges = true;
    g.add(p);
  }

  // 4 corner optical registration crosshairs on Kovar perimeter wall
  for (const [fx, fy] of [
    [-11.35, 8.85],
    [11.35, 8.85],
    [-11.35, -8.85],
    [11.35, -8.85],
  ] as Array<[number, number]>) {
    addOpticalFiducial(g, fx, fy, -1.23, 0.22, 0.022, mats.goldPlating);
  }
}

/** E15: Flexure stress-relief slots, 3D Smalley wave-spring washers & laser micron calibration ticks */
export function enrichE15OledAlign(g: THREE.Group, mats: MaterialLibrary): void {
  // Contrasting machined titanium chamfer trim around inner aperture & outer perimeter
  const innerTrim = new THREE.Mesh(
    extrudeHiRes(createFrameShape(18.2, 14.2, 1.2, 17.65, 13.65, 1.1), 0.1, 0.015, 0.015, 1, 20),
    mats.titaniumRivet
  );
  innerTrim.position.z = -0.3;
  innerTrim.userData.noEdges = true;
  g.add(innerTrim);

  // 3D Smalley wave-spring washers + CNC flexure relief cutout slots + calibration ticks at all 3 stations
  const waveGeo = createTrueWaveSpringGeo(1.52, 0.28, 0.07, 0.06, 4, 36);
  const flexSlotGeo = createChamferedBoxGeo(0.28, 2.2, 0.62, 0.08, 0.015, 'z');
  const tickGeo = new THREE.BoxGeometry(0.1, 0.36, 0.03);

  const triPts: Array<[number, number]> = [
    [0, 8.2],
    [-10.0, -7.4],
    [10.0, -7.4],
  ];
  for (const [tx, ty] of triPts) {
    const wave = new THREE.Mesh(waveGeo, mats.beCuSpring);
    wave.position.set(tx, ty, 0.38);
    wave.userData.noEdges = true;
    g.add(wave);

    // Pair of dark CNC flexure hinge relief slots flanking each kinematic ball seat
    for (const dx of [-2.2, 2.2]) {
      if (Math.abs(tx + dx) < 11.4) {
        const sl = new THREE.Mesh(flexSlotGeo, mats.velvetFlockTrap);
        sl.position.set(tx + dx, ty, 0);
        sl.userData.noEdges = true;
        g.add(sl);
      }
    }

    // 6 radial micron-pitch adjustment witness ticks around each collar
    for (let k = 0; k < 6; k++) {
      const a = (k * Math.PI) / 3;
      const tk = new THREE.Mesh(tickGeo, mats.invarScaleBar);
      tk.position.set(tx + Math.cos(a) * 1.72, ty + Math.sin(a) * 1.72, -0.32);
      tk.rotation.z = a + Math.PI / 2;
      tk.userData.noEdges = true;
      g.add(tk);
    }
  }
}

/** E16: 48-via ENIG fence, routed MIPI/PMIC copper buses, courtyards, test pads & 24 gold ZIF fingers */
export function enrichE16TconPcb(g: THREE.Group, mats: MaterialLibrary): void {
  // 44x ENIG gold perimeter ground-stitching via fence + 4 corner plated mounting ground rings!
  const vias: Array<[number, number]> = [];
  for (let i = -5; i <= 5; i++) {
    vias.push([i * 2.0, 8.75], [i * 2.0, -8.75]);
  }
  for (let j = -3; j <= 3; j++) {
    vias.push([-11.45, j * 2.2], [11.45, j * 2.2]);
  }
  addEnigViaArray(g, vias, 0.54, 0.04, 0.18, 0.08, mats.goldPlating, mats.velvetFlockTrap);

  const cornerPadGeo = ringGeo(0.45, 0.92, 1.08, 0.02, 18);
  for (const [cx, cy] of [
    [-10.8, 8.1],
    [10.8, 8.1],
    [-10.8, -8.1],
    [10.8, -8.1],
  ] as Array<[number, number]>) {
    const cp = new THREE.Mesh(cornerPadGeo, mats.goldPlating);
    cp.position.set(cx, cy, 0);
    g.add(cp);
  }

  // Routed copper differential MIPI-DSI & PMIC power trace bundles on Side-A (+Z = +0.55)
  addCopperTraceRuns(
    g,
    [
      [-7.2, 4.4, -5.8, 4.4],
      [-7.2, 1.5, -5.8, 1.5],
      [-7.2, -1.5, -5.8, -1.5],
      [-7.2, -4.4, -5.8, -4.4],
      [1.6, 3.0, 3.8, 3.0],
      [1.6, 2.3, 3.8, 2.3],
      [6.0, 0.8, 4.8, -1.8],
      [6.8, 0.8, 8.0, -1.8],
      [-2.2, -2.5, -2.2, -6.2],
      [-1.4, -2.5, -1.4, -6.2],
      [-0.6, -2.5, -0.6, -6.2],
      [0.2, -2.5, 0.2, -6.2],
      [1.0, -2.5, 1.0, -6.2],
      [-2.4, -3.9, -2.4, -2.5],
    ],
    0.16,
    0.03,
    0.55,
    mats.copperHeatSpreader
  );

  // Crisp silkscreen courtyards around TCON ASIC, PMIC, Crystal & ZIF connector
  addSilkscreenCourtyard(g, -2.2, 1.2, 8.05, 8.05, 0.555, 0.07, mats.invarScaleBar, 'tl');
  addSilkscreenCourtyard(g, 6.0, 3.0, 5.05, 5.05, 0.555, 0.06, mats.invarScaleBar, 'tr');
  addSilkscreenCourtyard(g, -2.4, -5.2, 3.25, 2.45, 0.555, 0.055, mats.invarScaleBar, 'bl');

  // 6x gold factory JTAG/MIPI test-point pads on upper-right corner
  const tpGeo = hiResCyl(0.32, 0.32, 0.045, 12).rotateX(Math.PI / 2);
  for (let i = 0; i < 6; i++) {
    const tp = new THREE.Mesh(tpGeo, mats.goldPlating);
    tp.position.set(-5.8 + i * 1.1, 7.6, 0.55);
    tp.userData.noEdges = true;
    g.add(tp);
  }

  // 24 individual fine-pitch gold ZIF fingers over distal flex contact bar
  const fingerGeo = new THREE.BoxGeometry(0.22, 1.68, 0.08);
  for (let i = 0; i < 24; i++) {
    const gf = new THREE.Mesh(fingerGeo, mats.goldPlating);
    gf.position.set(-4.35 + i * 0.378, -20.1, 0.36);
    gf.userData.noEdges = true;
    g.add(gf);
  }
}

/** E17: Diamond-cut silver fin crowns, thermal channel baffles, brass ear grommets & stencil plate */
export function enrichE17Heatsink(g: THREE.Group, mats: MaterialLibrary): void {
  // Bright CNC diamond-cut silver thermal-radiation crowns along all 18 extruded cooling fin tips!
  const finCrownGeo = new THREE.BoxGeometry(0.86, 7.2, 0.08);
  for (let i = -4; i <= 4; i++) {
    for (const fy of [-4.4, 4.4]) {
      const cr = new THREE.Mesh(finCrownGeo, mats.titaniumRivet);
      cr.position.set(i * 2.52, fy, 2.38);
      cr.userData.noEdges = true;
      g.add(cr);
    }
  }

  // Central horizontal airflow channel die-cast ejector pin witness rings & thermal stencil bar
  const ejGeo = hiResTorus(0.42, 0.05, 6, 16);
  for (const ex of [-8.8, -3.2, 3.2, 8.8]) {
    const ej = new THREE.Mesh(ejGeo, mats.titaniumRivet);
    ej.position.set(ex, 0, 0.92);
    ej.userData.noEdges = true;
    g.add(ej);
  }
  const stencilGeo = new THREE.BoxGeometry(0.32, 0.16, 0.04);
  for (let i = 0; i < 7; i++) {
    const st = new THREE.Mesh(stencilGeo, mats.invarScaleBar);
    st.position.set(-1.5 + i * 0.5, 0, 0.93);
    st.userData.noEdges = true;
    g.add(st);
  }

  // Brass reinforcement grommets & star-lock washer teeth on ±X copper mounting ears
  const gromGeo = ringGeo(0.92, 1.54, 0.98, 0.03, 22);
  for (const sx of [-1, 1]) {
    const gr = new THREE.Mesh(gromGeo, mats.brassGear);
    gr.position.set(sx * 14.3, 0, -0.18);
    g.add(gr);
  }

  // Subtle embossed copper vapor-chamber contact frame on rear -Z TIM face
  const vcRim = new THREE.Mesh(
    extrudeHiRes(createFrameShape(18.8, 14.4, 0.9, 17.8, 13.4, 0.72), 0.08, 0.015, 0.015, 1, 20),
    mats.copperHeatSpreader
  );
  vcRim.position.z = -0.68;
  vcRim.userData.noEdges = true;
  g.add(vcRim);
}

/** E18: Brass threaded inserts in all 8 bosses, machined datum rings, diopter gland bezel & casting ribs */
export function enrichE18Housing(g: THREE.Group, mats: MaterialLibrary): void {
  // 4 gleaming brass threaded heat-set inserts inside top-deck MI hot-shoe mounting bosses (flush at local y=13.28)
  const topInsGeo = ringGeo(0.62, 0.96, 0.3, 0.02, 18).rotateX(Math.PI / 2);
  for (const [bx, bz] of [
    [-6.8, -2.0],
    [6.8, -2.0],
    [-6.8, 9.4],
    [6.8, 9.4],
  ] as Array<[number, number]>) {
    const ins = new THREE.Mesh(topInsGeo, mats.brassGear);
    ins.position.set(bx, 13.28, bz);
    g.add(ins);
  }

  // 2 gleaming brass heat-set inserts inside extended front heatsink mounting bosses (z=+22.51)
  const hsInsGeo = ringGeo(0.64, 1.05, 1.64, 0.02, 18);
  for (const sx of [-1, 1]) {
    const hsIns = new THREE.Mesh(hsInsGeo, mats.brassGear);
    hsIns.position.set(sx * 14.3, 0, 22.51);
    g.add(hsIns);
  }

  // 4 gleaming brass threaded inserts inside lower chassis mounting bosses (innerR=0.88 clears E25 bolts!)
  const botInsGeo = ringGeo(0.88, 1.38, 2.16, 0.025, 20).rotateX(Math.PI / 2);
  for (const [mx, mz] of [
    [-14.6, -15.0],
    [14.6, -15.0],
    [-14.6, 15.0],
    [14.6, 15.0],
  ] as Array<[number, number]>) {
    const ins = new THREE.Mesh(botInsGeo, mats.brassGear);
    ins.position.set(mx, -11.9, mz);
    g.add(ins);
  }

  // Bright CNC-milled datum witness rims on rear (-20.42) & front (+22.70) collars
  const rearDatum = new THREE.Mesh(
    extrudeHiRes(createFrameShape(29.4, 21.2, 4.0, 28.4, 20.2, 3.7), 0.08, 0.015, 0.015, 1, 24),
    mats.stainlessMachined
  );
  rearDatum.position.set(0, 0.85, -20.34);
  rearDatum.userData.noEdges = true;

  const frontDatum = new THREE.Mesh(
    extrudeHiRes(createFrameShape(27.8, 21.0, 3.2, 26.8, 20.0, 2.8), 0.08, 0.015, 0.015, 1, 22),
    mats.stainlessMachined
  );
  frontDatum.position.set(0, 0.05, 22.63);
  frontDatum.userData.noEdges = true;
  g.add(rearDatum, frontDatum);

  // Machined bright stainless gland-port bore collar around R=2.98 -X diopter port plate
  const portRim = new THREE.Mesh(ringGeo(2.98, 3.55, 0.92, 0.03, 28).rotateY(Math.PI / 2), mats.stainlessMachined);
  portRim.position.set(-17.7, 0, -3.1);
  g.add(portRim);

  // External cast AZ91D roof chamfer accent strips + Sony die-cast cavity ID boss on upper crown
  const crownTrimGeo = createChamferedBoxGeo(0.45, 0.14, 38.0, 0.12, 0.02, 'y');
  for (const cx of [-3.9, 3.9]) {
    const ct = new THREE.Mesh(crownTrimGeo, mats.titaniumRivet);
    ct.position.set(cx, 14.3, 1.14);
    ct.userData.noEdges = true;
    g.add(ct);
  }

  // Internal bottom FPC pass-through slot stainless anti-chafe collar rim
  const fpcCollar = new THREE.Mesh(
    extrudeHiRes(createFrameShape(16.6, 6.7, 0.5, 15.65, 5.75, 0.2), 0.16, 0.02, 0.02, 1, 14).rotateX(
      Math.PI / 2
    ),
    mats.stainlessMachined
  );
  fpcCollar.position.set(0, -12.02, 19.45);
  fpcCollar.userData.noEdges = true;
  g.add(fpcCollar);
}

/** E19: Micro-riveted blade guide rails, carbon-blade light-seal ribs & OPEN/CLOSED index ticks */
export function enrichE19BlindShutter(g: THREE.Group, mats: MaterialLibrary): void {
  // Contrasting machined titanium inner aperture bevel + 6 micro brass guide-rail rivets
  const rim = new THREE.Mesh(
    extrudeHiRes(createFrameShape(21.4, 16.4, 2.4, 20.65, 15.65, 2.2), 0.1, 0.015, 0.015, 1, 22),
    mats.titaniumRivet
  );
  rim.position.z = -0.34;
  rim.userData.noEdges = true;
  g.add(rim);

  const rivetGeo = hiResCyl(0.22, 0.22, 0.24, 12).rotateX(Math.PI / 2);
  for (const sy of [-8.4, 8.4]) {
    for (const rx of [-7.5, 0, 7.5]) {
      const rv = new THREE.Mesh(rivetGeo, mats.brassGear);
      rv.position.set(rx, sy, -0.35);
      rv.userData.noEdges = true;
      g.add(rv);
    }
  }

  // Matte carbon-blade reinforcement micro-ribs & silver dust-wiper edges on both blades
  const bladeRibGeo = new THREE.BoxGeometry(0.18, 14.6, 0.05);
  for (const sx of [-1, 1]) {
    for (const dx of [-1.2, 0.4]) {
      const br = new THREE.Mesh(bladeRibGeo, mats.titaniumRivet);
      br.position.set(sx * (8.4 + dx), 0, sx * 0.12 - 0.12);
      br.userData.noEdges = true;
      g.add(br);
    }
  }

  // Brass slide-collar bushing & white OPEN indicator dot on +X left-flank manual shutter lever
  const leverBush = new THREE.Mesh(ringGeo(0.48, 0.78, 0.56, 0.02, 18).rotateY(Math.PI / 2), mats.brassGear);
  leverBush.position.set(13.45, 3.0, 0);
  const openDot = new THREE.Mesh(hiResSphere(0.26, 10, 8), mats.invarScaleBar);
  openDot.position.set(14.6, 1.55, -0.15);
  openDot.userData.noEdges = true;
  g.add(leverBush, openDot);
}

/** E20: CNC M6×0.5 external focusing threads, knurled focus lock nut & crimson UV-lock dots */
export function enrichE20GazeIrOptics(g: THREE.Group, mats: MaterialLibrary): void {
  // True CNC lathe-turned 6-turn fine external focusing threads around upper barrel neck (outerR<=3.76!)
  const threadCollar = new THREE.Mesh(
    createThreadedRingLatheGeo(3.56, 3.63, 3.74, 1.15, 6, 36).rotateX(Math.PI / 2),
    mats.titaniumRivet
  );
  threadCollar.position.y = 0.88;
  g.add(threadCollar);

  // Straight-knurled brass optical focus lock ring around mid-barrel shoulder (outerR<=3.82!)
  const knurlNut = new THREE.Mesh(
    createKnurledCollarGeo(3.62, 3.74, 3.82, 0.42, 30).rotateX(Math.PI / 2),
    mats.brassGear
  );
  knurlNut.position.y = -0.32;
  knurlNut.userData.noEdges = true;
  g.add(knurlNut);

  // 4 crimson factory UV-lock lacquer beads on top 4-slot stainless spanner bezel
  const lacGeo = hiResSphere(0.18, 10, 8);
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2;
    const dot = new THREE.Mesh(lacGeo, mats.mountRedIndexDot);
    dot.scale.set(1.1, 0.55, 1.1);
    dot.position.set(Math.cos(a) * 3.32, 1.84, Math.sin(a) * 3.32);
    dot.userData.noEdges = true;
    g.add(dot);
  }
}

/** E21: DIN 6799 E-clip, engraved lock/unlock index ticks & hex-socket preload plug recesses (mirrored -X) */
export function enrichE21DiopterLock(
  diopterLockGroup: THREE.Group,
  diopterLockClutchGroup: THREE.Group,
  mats: MaterialLibrary
): void {
  // True DIN 6799 3-prong E-clip & bronze thrust shoulder on rotating spline hub (outward -X side)
  const eClip = new THREE.Mesh(createDin6799EClipGeo(1.02, 1.56, 0.14).rotateY(Math.PI / 2), mats.mountSpringSteel);
  eClip.position.x = -0.58;
  eClip.userData.noEdges = true;
  const hubTrim = new THREE.Mesh(ringGeo(1.08, 1.62, 0.14, 0.02, 24).rotateY(Math.PI / 2), mats.brassGear);
  hubTrim.position.x = -0.44;
  diopterLockClutchGroup.add(eClip, hubTrim);

  // Stationary detent collar: 12 radial index ticks + machined inner hex-socket recesses on ±Y grub plugs
  const tickGeo = new THREE.BoxGeometry(0.04, 0.42, 0.09);
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    const tk = new THREE.Mesh(tickGeo, i === 0 ? mats.mountRedIndexDot : mats.velvetFlockTrap);
    tk.position.set(-0.62, Math.cos(a) * 2.65, Math.sin(a) * 2.65);
    tk.rotation.x = a;
    tk.userData.noEdges = true;
    diopterLockGroup.add(tk);
  }

  const hexHoleGeo = hiResCyl(0.22, 0.22, 0.12, 6);
  for (const sy of [-1, 1]) {
    const hh = new THREE.Mesh(hexHoleGeo, mats.velvetFlockTrap);
    hh.position.set(-0.28, sy * 4.02, 0);
    hh.userData.noEdges = true;
    diopterLockGroup.add(hh);
  }
}

/** E22: 4 stainless retention leaf clips, 0°/45°/90° fast-axis calibration ticks & brass datum pin */
export function enrichE22PolarizerQwp(g: THREE.Group, mats: MaterialLibrary): void {
  // Bright machined titanium outer chamfer rim + 4 miniature stainless film-retention leaf clips
  const rim = new THREE.Mesh(hiResTorus(10.22, 0.05, 8, 48), mats.titaniumRivet);
  rim.position.z = -0.38;
  rim.userData.noEdges = true;
  g.add(rim);

  const clipGeo = createChamferedBoxGeo(0.95, 0.36, 0.12, 0.04, 0.015, 'z');
  const tickGeo = new THREE.BoxGeometry(0.1, 0.46, 0.035);
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    if (i % 3 === 0) {
      const cl = new THREE.Mesh(clipGeo, mats.stainlessMachined);
      cl.position.set(Math.cos(a) * 9.3, Math.sin(a) * 9.3, -0.4);
      cl.rotation.z = a;
      g.add(cl);
    } else {
      const tk = new THREE.Mesh(tickGeo, i === 1 ? mats.goldPlating : mats.invarScaleBar);
      tk.position.set(Math.cos(a) * 9.52, Math.sin(a) * 9.52, -0.4);
      tk.rotation.z = a + Math.PI / 2;
      tk.userData.noEdges = true;
      g.add(tk);
    }
  }

  // Precision brass alignment pin seated inside opposite (-45°) locating key
  const pin = new THREE.Mesh(hiResCyl(0.26, 0.26, 0.78, 14).rotateX(Math.PI / 2), mats.brassGear);
  pin.position.set(-7.35, -7.35, 0);
  pin.userData.noEdges = true;
  g.add(pin);
}

/** E23: Dense 14×10 embossed refractive micro-lenslet dome array, dark aperture mask & Vernier ticks */
export function enrichE23MlaStack(g: THREE.Group, mats: MaterialLibrary): void {
  // Dark carbon-black photolithography outer mask ring framing the hexagonal MLA extraction aperture
  const blackMask = new THREE.Mesh(
    extrudeHiRes(createFrameShape(16.4, 12.6, 0.52, 14.5, 10.9, 0.24), 0.05, 0.008, 0.008, 1, 16),
    mats.matteBlackAnodized
  );
  blackMask.position.z = -0.15;
  blackMask.userData.noEdges = true;
  g.add(blackMask);

  // Dense 14×10 hexagonal-staggered on-chip micro-lenslet dome array (hoisted shared geo -> 0 extra draw calls!)
  const lensletGeo = hiResSphere(0.36, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.5).rotateX(-Math.PI / 2);
  for (let iy = 0; iy < 10; iy++) {
    const rowShift = iy % 2 === 0 ? 0 : 0.48;
    for (let ix = 0; ix < 13; ix++) {
      const mx = -6.05 + ix * 0.96 + rowShift;
      if (Math.abs(mx) > 6.55) continue;
      const my = -4.45 + iy * 0.98;
      const dome = new THREE.Mesh(lensletGeo, mats.fluorineCoatCyan);
      dome.scale.set(1.0, 1.0, 0.16);
      dome.position.set(mx, my, -0.165);
      dome.userData.noEdges = true;
      g.add(dome);
    }
  }

  // 4 photolithography corner alignment crosshairs + Vernier calibration ticks along top/bottom rim
  for (const [fx, fy] of [
    [-7.6, 5.6],
    [7.6, 5.6],
    [-7.6, -5.6],
    [7.6, -5.6],
  ] as Array<[number, number]>) {
    addOpticalFiducial(g, fx, fy, -0.175, 0.24, 0.02, mats.goldPlating);
  }
  const tickGeo = new THREE.BoxGeometry(0.08, 0.34, 0.022);
  for (let i = -6; i <= 6; i++) {
    for (const sy of [-5.88, 5.88]) {
      const tk = new THREE.Mesh(tickGeo, i % 3 === 0 ? mats.goldPlating : mats.sinteredSilver);
      tk.position.set(i * 0.95, sy, -0.175);
      tk.userData.noEdges = true;
      g.add(tk);
    }
  }
}

/** E24: Stamped swage ribs, thermal reflow micro-vent rows, laser RF-shield code & gold finger dimples */
export function enrichE24TconEmiShield(g: THREE.Group, mats: MaterialLibrary): void {
  // Contrasting dark titanium stamped stiffening swage border & TIM-window chamfer highlight
  const outerSwage = new THREE.Mesh(
    extrudeHiRes(createFrameShape(22.8, 17.2, 1.4, 21.8, 16.2, 1.2), 0.08, 0.015, 0.015, 1, 18),
    mats.titaniumRivet
  );
  outerSwage.position.z = 0.84;
  outerSwage.userData.noEdges = true;
  const winBevel = new THREE.Mesh(
    extrudeHiRes(createFrameShape(11.3, 9.5, 0.96, 10.75, 8.95, 0.86), 0.08, 0.015, 0.015, 1, 16),
    mats.titaniumRivet
  );
  winBevel.position.z = 0.93;
  winBevel.userData.noEdges = true;
  g.add(outerSwage, winBevel);

  // 24x precision stamped RF-safe thermal/reflow ventilation micro-holes on left & right wings
  const ventGeo = hiResCyl(0.32, 0.32, 0.42, 10).rotateX(Math.PI / 2);
  for (const sx of [-8.8, -7.2, 7.2, 8.8]) {
    for (const sy of [-3.2, -1.6, 0, 1.6, 3.2]) {
      const vh = new THREE.Mesh(ventGeo, mats.velvetFlockTrap);
      vh.position.set(sx, sy, 0.68);
      vh.userData.noEdges = true;
      g.add(vh);
    }
  }

  // Laser-etched Sony RF shield stencil bars above & below TIM window
  const barGeo = new THREE.BoxGeometry(0.42, 0.16, 0.03);
  for (let i = 0; i < 8; i++) {
    const b = new THREE.Mesh(barGeo, mats.matteBlackAnodized);
    b.position.set(-2.45 + i * 0.7, 6.6, 0.86);
    b.userData.noEdges = true;
    g.add(b);
  }

  // Embossed gold contact dimples on all 8 CuBe2 perimeter grounding clips
  const dimpGeo = hiResSphere(0.24, 10, 8);
  for (const [cx, cy] of [
    [-6.5, 9.52],
    [6.5, 9.52],
    [-7.8, -9.52],
    [7.8, -9.52],
    [-12.32, 4.5],
    [-12.32, -4.5],
    [12.32, 4.5],
    [12.32, -4.5],
  ] as Array<[number, number]>) {
    const dm = new THREE.Mesh(dimpGeo, mats.goldPlating);
    dm.position.set(cx, cy, 0.0);
    dm.userData.noEdges = true;
    g.add(dm);
  }
}

/** E25: Optical datum ticks on baffles, molded gasket crown ribs & brass star washers on anchor bolts */
export function enrichE25BaffleSealKit(g: THREE.Group, mats: MaterialLibrary): void {
  // Precision silver optical alignment ticks on all 3 inter-lens velvet baffle rings
  const tickGeo = new THREE.BoxGeometry(0.12, 0.42, 0.06);
  for (const [bz, rMid] of [
    [-7.12, 10.45],
    [-0.18, 10.12],
    [6.5, 9.75],
  ] as Array<[number, number]>) {
    for (let k = 0; k < 4; k++) {
      const a = (k * Math.PI) / 2;
      const tk = new THREE.Mesh(tickGeo, k === 0 ? mats.brassGear : mats.titaniumRivet);
      tk.position.set(Math.cos(a) * rMid, Math.sin(a) * rMid, bz - 0.12);
      tk.rotation.z = a + Math.PI / 2;
      tk.userData.noEdges = true;
      g.add(tk);
    }
  }

  // Raised molded EPDM sealing crown ribs on rear (-20.58) & front (+22.86) optical chamber gaskets
  const rearCrown = new THREE.Mesh(
    extrudeHiRes(createFrameShape(29.3, 20.9, 4.0, 28.9, 20.5, 3.85), 0.08, 0.015, 0.015, 1, 24),
    mats.lensFoamSeal
  );
  rearCrown.position.set(0, 0.9, -20.66);
  rearCrown.userData.noEdges = true;
  const frontCrown = new THREE.Mesh(
    extrudeHiRes(createFrameShape(24.9, 21.7, 3.05, 24.5, 21.3, 2.9), 0.08, 0.015, 0.015, 1, 22),
    mats.lensFoamSeal
  );
  frontCrown.position.z = 22.96;
  frontCrown.userData.noEdges = true;
  g.add(rearCrown, frontCrown);

  // Brass serrated lock-washers tucked cleanly above pan head of the 4 EVF chassis anchor bolts
  const lockGeo = createKnurledCollarGeo(0.56, 1.05, 1.24, 0.1, 14).rotateX(Math.PI / 2);
  for (const [mx, mz] of [
    [-14.6, -15.0],
    [14.6, -15.0],
    [-14.6, 15.0],
    [14.6, 15.0],
  ] as Array<[number, number]>) {
    const lw = new THREE.Mesh(lockGeo, mats.brassGear);
    lw.position.set(mx, -15.4, mz);
    lw.userData.noEdges = true;
    g.add(lw);
  }
}

/** E26: PORON compression rib grooves, brass screw collars & spot-weld nuggets on BeCu ground fingers */
export function enrichE26CavityClamp(g: THREE.Group, mats: MaterialLibrary): void {
  // 9 molded lateral compression-relief grooves across the top PORON foam pad
  const grooveGeo = new THREE.BoxGeometry(0.28, 0.12, 1.38);
  for (let i = -4; i <= 4; i++) {
    const gr = new THREE.Mesh(grooveGeo, mats.epdmGasket);
    gr.position.set(i * 1.8, 0.88, 0);
    gr.userData.noEdges = true;
    g.add(gr);
  }

  // Brass mounting-hole reinforcement collars + laser spot-weld nuggets anchoring dual BeCu fingers
  const colGeo = ringGeo(0.64, 1.02, 0.56, 0.02, 18).rotateX(Math.PI / 2);
  for (const sx of [-9.6, 9.6]) {
    const col = new THREE.Mesh(colGeo, mats.brassGear);
    col.position.set(sx, 0, 0);
    g.add(col);
  }
  const welds = buildSpotWeldNuggets(
    [
      [-10.95, 0.28, -0.36],
      [-10.95, 0.28, 0.36],
      [10.95, 0.28, -0.36],
      [10.95, 0.28, 0.36],
    ],
    0.18,
    'y',
    mats.beCuSpring,
    mats.goldPlating
  );
  g.add(welds);
}

/** E27: Titanium inner chamfer trim, brass countersunk screw pockets, rail liners & red release line */
export function enrichE27EyecupSubframe(g: THREE.Group, mats: MaterialLibrary): void {
  // High-contrast titanium chamfer bezel & dark anti-wear slide-rail guide liners
  const innerRim = new THREE.Mesh(
    extrudeHiRes(createFrameShape(26.5, 20.5, 3.6, 25.65, 19.65, 3.4), 0.14, 0.02, 0.02, 1, 24),
    mats.titaniumRivet
  );
  innerRim.position.z = -0.44;
  innerRim.userData.noEdges = true;
  g.add(innerRim);

  const linerGeo = createChamferedBoxGeo(0.32, 18.0, 0.14, 0.06, 0.015, 'z');
  const dowelGeo = ringGeo(0.34, 0.62, 0.88, 0.02, 16);
  for (const sx of [-1, 1]) {
    const ln = new THREE.Mesh(linerGeo, mats.matteBlackAnodized);
    ln.position.set(sx * 15.2, 0, -0.78);
    ln.userData.noEdges = true;
    const dw = new THREE.Mesh(dowelGeo, mats.brassGear);
    dw.position.set(sx * 14.3, -6.2, 0);
    g.add(ln, dw);
  }

  // 4 gleaming brass countersunk screw seats framing the 4 perimeter M1.4 Phillips screws
  const seatGeo = ringGeo(0.84, 1.24, 0.22, 0.02, 20);
  for (const [sx, sy] of [
    [-13.4, 10.6],
    [13.4, 10.6],
    [-13.4, -10.6],
    [13.4, -10.6],
  ] as Array<[number, number]>) {
    const st = new THREE.Mesh(seatGeo, mats.brassGear);
    st.position.set(sx, sy, -0.44);
    g.add(st);
  }

  // Crimson release-bar directional index line & brass guide pin on lower positive-lock catch tab
  const redBar = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.24, 0.12), mats.mountRedIndexDot);
  redBar.position.set(0, -13.55, -0.68);
  redBar.userData.noEdges = true;
  g.add(redBar);
}

/** E28: Etched thickness-code notches on shim tabs, washer collars, hex stud flats & laser markings */
export function enrichE28EyeAfShims(g: THREE.Group, mats: MaterialLibrary): void {
  // Etched thickness calibration punch dots (1, 2, 3 dots for 10/20/50 μm!) on +X tabs
  const punchGeo = hiResCyl(0.18, 0.18, 0.18, 12);
  const tabConfigs: Array<[number, number, number]> = [
    [0.0, -2.2, 1],
    [-0.22, 0.0, 2],
    [-0.4, 2.2, 3],
  ];
  for (const [ty, tz, count] of tabConfigs) {
    for (let k = 0; k < count; k++) {
      const p = new THREE.Mesh(punchGeo, mats.velvetFlockTrap);
      p.position.set(7.9, ty, tz + (k - (count - 1) * 0.5) * 0.45);
      p.userData.noEdges = true;
      g.add(p);
    }
  }

  // Precision chamfered hex calibration heads & copper washers on all 3 titanium alignment studs
  const hexCapGeo = hiResCyl(0.68, 0.72, 0.14, 6);
  const cuWashGeo = ringGeo(0.7, 1.12, 0.08, 0.015, 20).rotateX(Math.PI / 2);
  for (const [sx, sz] of [
    [-4.6, -3.1],
    [4.6, -3.1],
    [0.0, 3.25],
  ] as Array<[number, number]>) {
    const hc = new THREE.Mesh(hexCapGeo, mats.brassGear);
    hc.position.set(sx, 0.16, sz);
    const cw = new THREE.Mesh(cuWashGeo, mats.copperHeatSpreader);
    cw.position.set(sx, 0.1, sz);
    g.add(hc, cw);
  }

  // Engraved optical-center tick bars along top photo-etched brass shim face
  const tickGeo = new THREE.BoxGeometry(0.14, 0.04, 0.72);
  for (let i = -3; i <= 3; i++) {
    const tk = new THREE.Mesh(tickGeo, mats.matteBlackAnodized);
    tk.position.set(i * 1.4, 0.13, -3.55);
    tk.userData.noEdges = true;
    g.add(tk);
  }
}

/** E29: Countersunk M1.2 mounting screws, spot-welded protective grille bars & brass vent collar (compact -X) */
export function enrichE29DesiccantBreather(g: THREE.Group, mats: MaterialLibrary): void {
  // 2 countersunk M1.2 Phillips mounting screws seated on top & bottom stainless tabs (facing -Z)
  for (const sy of [-2.72, 2.72]) {
    addFlushPhillipsCapHead(
      g,
      [0, sy, 0.68],
      '-z',
      0.32,
      0.15,
      mats.titaniumRivet,
      mats.velvetFlockTrap,
      mats.brassGear
    );
  }

  // 3D stainless protective cross-bars & 6 laser spot-weld nuggets securing the mesh retention frame
  const barGeo = new THREE.BoxGeometry(1.75, 0.1, 0.08);
  for (const by of [-1.1, 0, 1.1]) {
    const bar = new THREE.Mesh(barGeo, mats.titaniumRivet);
    bar.position.set(0, by, -1.14);
    bar.userData.noEdges = true;
    g.add(bar);
  }
  const welds = buildSpotWeldNuggets(
    [
      [-1.02, 1.65, -1.18],
      [1.02, 1.65, -1.18],
      [-1.02, 0.0, -1.18],
      [1.02, 0.0, -1.18],
      [-1.02, -1.65, -1.18],
      [1.02, -1.65, -1.18],
    ],
    0.14,
    'z',
    mats.stainlessMachined,
    mats.goldPlating
  );
  g.add(welds);

  // Brass threaded locking collar & protective stainless ePTFE breather cap ring on outward -X hex vent
  const ventCollar = new THREE.Mesh(ringGeo(0.86, 1.12, 0.14, 0.02, 24).rotateY(Math.PI / 2), mats.brassGear);
  ventCollar.position.set(-2.06, 0.7, 0);
  const microVentRim = new THREE.Mesh(hiResTorus(0.56, 0.055, 8, 22).rotateY(Math.PI / 2), mats.stainlessMachined);
  microVentRim.position.set(-2.12, 0.7, 0);
  microVentRim.userData.noEdges = true;
  g.add(ventCollar, microVentRim);
}

/** E30: Routed I2C copper traces, ENIG vias, extra bypass cap w/ fillets, silkscreen & 6 ZIF fingers */
export function enrichE30AmbientPd(g: THREE.Group, mats: MaterialLibrary): void {
  // Routed copper I2C bus (SDA/SCL/VDD/GND) & ENIG vias on top face of horizontal 3.6x4.0 sub-PCB (z = -0.30)
  addCopperTraceRuns(
    g,
    [
      [-1.2, 1.32, -1.0, 0.5],
      [1.2, 1.32, 1.0, 0.5],
      [-0.95, 0.5, -0.55, 1.85],
      [-0.35, 0.5, -0.15, 1.85],
      [0.35, 0.5, 0.25, 1.85],
      [0.95, 0.5, 0.65, 1.85],
    ],
    0.09,
    0.022,
    -0.3,
    mats.copperHeatSpreader
  );
  addEnigViaArray(
    g,
    [
      [-1.42, 1.62],
      [1.42, 1.62],
      [-1.42, -1.62],
      [1.42, -1.62],
      [0, -1.62],
    ],
    -0.3,
    0.032,
    0.14,
    0.06,
    mats.goldPlating,
    mats.velvetFlockTrap
  );
  addSilkscreenCourtyard(g, 0, 0, 2.55, 2.15, -0.3, 0.045, mats.invarScaleBar, 'tl');

  // Extra 0201 bypass MLCC with bright solder fillets beside ALS package
  addSmdPassiveWithFillets(
    g,
    0.66,
    0.36,
    0.22,
    0.0,
    -1.36,
    -0.4,
    mats.smdCeramic,
    mats.silverElectrode,
    mats.solderBallSilver
  );

  // Brass optical bezel ring framing low-profile hemispherical condenser dome over 4-quadrant RGB photodiode
  const domeRim = new THREE.Mesh(hiResTorus(0.58, 0.055, 8, 24), mats.brassGear);
  domeRim.position.set(0, 0, -0.67);
  domeRim.userData.noEdges = true;
  g.add(domeRim);

  // 6 crisp gold ZIF fingers on forward (+y -> +Z) flex tongue
  const fGeo = new THREE.BoxGeometry(0.18, 0.58, 0.05);
  for (let i = 0; i < 6; i++) {
    const gf = new THREE.Mesh(fGeo, mats.goldPlating);
    gf.position.set(-0.75 + i * 0.3, 2.62, 0.23);
    gf.userData.noEdges = true;
    g.add(gf);
  }
}

/** E31: Wheel lightening holes, DIN 6799 E-clip, hardened steel micro-roller & anchor Phillips screws (-X) */
export function enrichE31DiopterDetent(g: THREE.Group, mats: MaterialLibrary): void {
  // 6 machined lightening recesses on brass 36-tooth ratchet wheel web + bronze thrust ring
  const holeGeo = hiResCyl(0.32, 0.32, 0.74, 12).rotateZ(Math.PI / 2);
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    const h = new THREE.Mesh(holeGeo, mats.matteBlackAnodized);
    h.position.set(0.02, Math.cos(a) * 2.15, Math.sin(a) * 2.15);
    h.userData.noEdges = true;
    g.add(h);
  }

  // True DIN 6799 3-prong E-clip + bronze thrust collar retaining hollow hub (mirrored -X, clears E37!)
  const eClip = new THREE.Mesh(createDin6799EClipGeo(1.04, 1.56, 0.1).rotateY(Math.PI / 2), mats.mountSpringSteel);
  eClip.position.x = -0.37;
  eClip.userData.noEdges = true;
  const thrustCollar = new THREE.Mesh(ringGeo(1.08, 1.72, 0.1, 0.02, 24).rotateY(Math.PI / 2), mats.copperHeatSpreader);
  thrustCollar.position.x = 0.37;
  g.add(eClip, thrustCollar);

  // Hardened stainless micro-roller bearing pin seated at V-nose detent tip engaging brass ratchet teeth!
  const roller = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.78, 16).rotateZ(Math.PI / 2), mats.stainlessMachined);
  roller.position.set(0, 0, 3.06);
  const rollerAxle = new THREE.Mesh(hiResCyl(0.11, 0.11, 0.92, 12).rotateZ(Math.PI / 2), mats.brassGear);
  rollerAxle.position.set(0, 0, 3.06);
  rollerAxle.userData.noEdges = true;
  g.add(roller, rollerAxle);

  // Dual countersunk M1.2 Phillips mounting screws on lower anodized leaf-spring anchor clamp block (facing OUTWARD -X!)
  for (const dy of [-0.4, 0.4]) {
    addFlushPhillipsCapHead(
      g,
      [-0.42, -4.1 + dy, 4.12],
      '-x',
      0.24,
      0.12,
      mats.stainlessMachined,
      mats.velvetFlockTrap
    );
  }
}
