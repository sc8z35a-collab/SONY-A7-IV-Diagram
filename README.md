# Next-Gen Mirrorless Camera — 3D CAD Technical Anatomy

Interactive PBR 3D CAD disassembly and optical/physics/semiconductor anatomy viewer built with Three.js, TypeScript, and Vite.
Pure solid white (`#FFFFFF`) background with a strictly zero-text SVG icon HUD; beginner-friendly technical explanations and bespoke schematics appear exclusively inside the part inspection drawer.

## Implemented Subsystems (75 Dissectible CAD Sub-Assemblies)

### Phase 5 — 55mm Large-Diameter Mirrorless Lens Mount (12 Sub-Assemblies)
1. CNC Hardened Stainless Steel 55 mm Bayonet Flange Ring (±2 μm Flatness, 4 Asymmetrical Lugs, Red Index Dot)
2. 6-Point High-Tensile Stainless Mounting Bolts & Anaerobic Blue Thread-Locker Collars (600 mm F4 Cantilever Rigidity)
3. Dual-Lip High-Elasticity EPDM Dust & Weather-Seal Mount Gasket Ring (Labyrinth Moisture Barrier)
4. 4-Leaf Pre-Tensioned Spring-Steel Bayonet Clamping Ring (~32 N Uniform Axial Preload, Zero Backlash)
5. Sub-Micron Flange Focal Distance Calibration Shim Set (0.010 / 0.025 / 0.050 mm Factory Color-Coded Foils, <0.005° Tilt)
6. Hardened Steel Lens Lock Pin (HRC55+), Return Compression Spring & Ergonomic Waterproof Release Button Linkage
7. 12-Pin Gold-Plated Spring-Loaded Pogo Contact Block (High-Speed OIS×IBIS/AF Bus & 3 A Motor Power, <20 mΩ)
8. Lens Interface Rigid-Flex PCB, ±15 kV ESD TVS Surge Protection Array, Power MOSFET & EMI-Shielded FPC
9. Stepped 5-Rib Multi-Knife-Edge Internal Anti-Reflection Light-Trap Ring (ρ < 0.8% Velvet Matte Black)
10. Full-Frame 36 × 24 mm Rectangular Flare-Cut Baffle Mask (Trims 41% Surplus Circular Image-Circle Light)
11. High-Rigidity Thixomolded AZ91D Magnesium-Aluminum Structural Mount Box, 8 Radial Ribs & 6 Helicoil Bosses
12. Front Structural Chassis Interface Flange, Twin Tripod Load-Path Bypass Gussets, 4 Dowel Pins & Dust Seal

### Phase 4 — Electronic Viewfinder (EVF) & Eye-Control AF Optical Anatomy (14 Sub-Assemblies)
- Silicone Eyecup (25 mm Eyepoint), Airtight Anti-Fog Double-Pane Window, 940 nm ToF Eye Sensor, 850 nm 8-LED Ring, 45° Dichroic Hot Mirror, 307K-px NIR Gaze CMOS & Relay Lens, G4 Double-Aspheric Eyepiece (0.90× / 41°), Movable G2/G3 ED Cemented Doublet, Helical Diopter Dial & Guide Rods, G1 Field Flattener, 0.64" 9.44M-Dot 4,000 cd/m² DCI-P3 240 Hz Tandem Micro-OLED (OLEDoS), TCON PCB & FPC, Copper/Aluminum Heatsink, Magnesium Pentaprism Cutaway Barrel.

### Phase 3 — Image Processing Engine (4nm ISP + AI NPU) & 12-Layer HDI Mainboard (16 Sub-Assemblies)
- Two-Phase Copper Vapor Chamber, Multi-Compartment EMI Shield, Nickel-Plated Copper IHS, 4nm Main ISP Bare Silicon Die, ABF Organic Interposer, 2D Systolic Array AI NPU, Quad-Channel LPDDR5X-8533 × 2, Multi-Phase Buck PMIC & Inductors, Dual CFexpress 4.0 Type B / SDXC UHS-II Cage, 6-Axis Quartz IMU + Servo MCU, C2PA Security + TCXO Clock, HDMI 2.1 / USB-C / 2.5G LAN I/O Cluster, Wi-Fi 6E/7 RF SiP, 12-Layer Any-Layer HDI PCB, 80-Pin SLVS-EC B2B & ZIF Harness, Magnesium Thermal-Isolation Mid-Frame.

### Phase 2 — Dual-Driven Carbon-Fiber Focal-Plane Shutter Assembly (12 Sub-Assemblies)
- Front Cover & Drive-Bay Cutout, Anti-Dust Sensor Shield, 4-Blade CFRP 1st & 2nd Curtains, Dual Parallelogram 4-Bar Linkages, 0.15 mm Mid-Plate, Dual-Driven Torsion Springs + Electromagnetic Boost Actuator (1/400 s Sync), Twin Permalloy Holding Solenoids, Coreless DC Charge Motor & Gear Train, 940 nm IR Speed Monitors, Rebound Brake Dampers & Floating Anti-Vib Mounts.

### Phase 1 — Full-Frame Image Sensor & 5-Axis IBIS Assembly (14 Sub-Assemblies + 7 Micro Pixel Layers)
- Aperture Mask, SSWF Ultrasonic Dust Filter, 16-Point Quartz OLPF, Hybrid IR/UV Cut Filter, Hermetic Cover Glass, 3D-Stacked Global Shutter BSI-CMOS Die, 4N Au Wire Bonds, HTCC Alumina LGA Package, Sensor PCB, SLVS-EC U-Loop FPC, 5-Axis IBIS VCM Carrier, Si₃N₄ Ceramic Ball Suspension, N52 Magnet Yoke, Sigma Graphite Thermal Bridge + 7-Layer 2×2 Bayer Micro Pixel Semiconductor Cross-Section.

## Viewing Modes (7 Zero-Text Switcher Modes)
- **Integrated Camera Core (68 Layers)**: Lens Mount (12) + Shutter (12) + Sensor & IBIS (14) + Mainboard & ISP Engine (16) + EVF & Eye-Control AF (14) aligned in true 3D flagship mirrorless geometry
- **Large-Diameter Lens Mount (12 Layers — Default)**
- **Focal-Plane Shutter (12 Layers)**
- **Full-Frame Sensor & 5-Axis IBIS (14 Layers)**
- **ISP Engine & Mainboard (16 Layers)**
- **EVF & Eye-Control AF (14 Layers)**
- **Micro Pixel Cross-Section (7 Layers)**

## Development

```bash
npm install
npm run dev
npm run build
```