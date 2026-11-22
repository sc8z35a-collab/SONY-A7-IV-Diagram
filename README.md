# Next-Gen Mirrorless Camera — 3D CAD Technical Anatomy

Interactive PBR 3D CAD disassembly and optical/physics/semiconductor anatomy viewer built with Three.js, TypeScript, and Vite.
Pure solid white (`#FFFFFF`) background with a strictly zero-text SVG icon HUD; beginner-friendly technical explanations and bespoke schematics appear exclusively inside the part inspection drawer.

## Implemented Subsystems (63 Dissectible CAD Sub-Assemblies)

### Phase 4 — Electronic Viewfinder (EVF) & Eye-Control AF Optical Anatomy (14 Sub-Assemblies)
1. Ergonomic Deep Anti-Glare Silicone Eyecup & Quick-Release Bayonet Frame (25 mm High Eyepoint, 41° Diagonal FoV)
2. Airtight Anti-Fog Double-Pane Fluorine-Coated Eyepiece Protective Window (Sealed Dry-Air Thermal Chamber + EPDM O-Ring)
3. 940 nm VCSEL / SPAD Time-of-Flight (ToF) Proximity Eye Sensor & Ambient EVF Brightness Sensor (<40 ms EVF/LCD Switch)
4. Eye-Control AF 850 nm Near-Infrared Illumination Ring LED Array × 8 (Purkinje Corneal Reflection / PCCR Illuminator)
5. 45° Dichroic Hot-Mirror Optical Beam Splitter (>98.5% Visible Transmission, >95% 850 nm IR 90° Downward Reflection)
6. Eye-Control AF 307K-Pixel NIR Line-of-Sight CMOS Sensor, Aspheric IR Relay Lens & 850 nm Bandpass Filter (Housed inside Mainboard EVF Notch)
7. Rear Large-Aperture Double-Sided Aspheric Eyepiece Lens — G4 (0.90× Magnification, Low Astigmatism, T*-Class Multi-Layer AR)
8. Movable Diopter Focus Group — ED Low-Dispersion Crown + High-Index Lanthanum Flint Cemented Doublet — G2/G3 (−4.0 to +3.0 m⁻¹)
9. Precision Push-Lock Helical Diopter Adjustment Dial, Brass Lead Screw, Dual Stainless Guide Rods & Anti-Backlash Spring
10. Front Aspheric Field-Flattener Condenser Lens — G1 (Petzval Field Curvature Correction & MLA Telecentric Matching)
11. 0.64-inch 9.44M-Dot Quad-XGA 2-Stack Tandem Micro-OLED (OLEDoS) Microdisplay (4,000 cd/m², DCI-P3, Optical Micro-Cavity + On-Chip MLA, 240 fps)
12. 240 Hz MIPI-DSI Timing Controller (TCON) Driver PCB, ELVDD/ELVSS Boost PMIC & Shielded Dual-Stream FPC (<5 ms Blackout-Free Pipeline)
13. Micro-OLED Rear Oxygen-Free Copper / Aluminum Micro-Fin Thermal Sink & High-k Silicone TIM Pad
14. Weather-Sealed Magnesium-Aluminum EVF Pentaprism-Style Cutaway Optical Barrel, 7 Knife-Edge Anti-Reflection Baffles & Hot-Shoe Deck

### Phase 3 — Image Processing Engine (4nm ISP + AI NPU) & 12-Layer HDI Mainboard (16 Sub-Assemblies)
- Two-Phase Copper Vapor Chamber, Multi-Compartment EMI Shield, Nickel-Plated Copper IHS, 4nm Main ISP Bare Silicon Die, ABF Organic Interposer, 2D Systolic Array AI NPU, Quad-Channel LPDDR5X-8533 × 2, Multi-Phase Buck PMIC & Inductors, Dual CFexpress 4.0 Type B / SDXC UHS-II Cage, 6-Axis Quartz IMU + Servo MCU, C2PA Security + TCXO Clock, HDMI 2.1 / USB-C / 2.5G LAN I/O Cluster, Wi-Fi 6E/7 RF SiP, 12-Layer Any-Layer HDI PCB, 80-Pin SLVS-EC B2B & ZIF Harness, Magnesium Thermal-Isolation Mid-Frame.

### Phase 2 — Dual-Driven Carbon-Fiber Focal-Plane Shutter Assembly (12 Sub-Assemblies)
- Front Cover & Drive-Bay Cutout, Anti-Dust Sensor Shield, 4-Blade CFRP 1st & 2nd Curtains, Dual Parallelogram 4-Bar Linkages, 0.15 mm Mid-Plate, Dual-Driven Torsion Springs + Electromagnetic Boost Actuator (1/400 s Sync), Twin Permalloy Holding Solenoids, Coreless DC Charge Motor & Gear Train, 940 nm IR Speed Monitors, Rebound Brake Dampers & Floating Anti-Vib Mounts.

### Phase 1 — Full-Frame Image Sensor & 5-Axis IBIS Assembly (14 Sub-Assemblies + 7 Micro Pixel Layers)
- Aperture Mask, SSWF Ultrasonic Dust Filter, 16-Point Quartz OLPF, Hybrid IR/UV Cut Filter, Hermetic Cover Glass, 3D-Stacked Global Shutter BSI-CMOS Die, 4N Au Wire Bonds, HTCC Alumina LGA Package, Sensor PCB, SLVS-EC U-Loop FPC, 5-Axis IBIS VCM Carrier, Si₃N₄ Ceramic Ball Suspension, N52 Magnet Yoke, Sigma Graphite Thermal Bridge + 7-Layer 2×2 Bayer Micro Pixel Semiconductor Cross-Section.

## Viewing Modes (6 Zero-Text Switcher Modes)
- **Integrated Camera Core (56 Layers)**: Shutter (12) + Sensor & IBIS (14) + Mainboard & ISP Engine (16) + EVF & Eye-Control AF (14) mounted in true 3D flagship mirrorless geometry
- **Focal-Plane Shutter (12 Layers)**
- **Full-Frame Sensor & 5-Axis IBIS (14 Layers)**
- **ISP Engine & Mainboard (16 Layers)**
- **EVF & Eye-Control AF (14 Layers — Default)**
- **Micro Pixel Cross-Section (7 Layers)**

## Development

```bash
npm install
npm run dev
npm run build
```