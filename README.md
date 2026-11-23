# Next-Gen Flagship Full-Frame Mirrorless Camera — Complete 3D CAD Technical Anatomy

Interactive photorealistic PBR 3D CAD disassembly and optical/electromechanical/semiconductor anatomy viewer built with Three.js, TypeScript, and Vite.
Pure solid white (`#FFFFFF`) background with a strictly zero-text SVG icon HUD; beginner-friendly technical explanations ("やさしい解説"), physics equations, and 320 bespoke technical SVG schematics appear exclusively inside the part inspection drawer.

Live GitHub Pages: https://sc8z35a-collab.github.io/SONY-A7-IV-Diagram/

## Complete Camera Assembly (320 Dissectible CAD Sub-Assemblies: 305 Macro + 15 Micro)

### Phase 12 — Ultra-HD 320-Part Watchmaker Anatomy (+63 Research-Backed 2024–2026 Parts across ALL 9 Subsystems!)
Informed by Kolari Vision teardowns (Sony A1 II, Sony A7R VI, Canon EOS R5 Mark II, Nikon Z8/Z9), Sony Semiconductor ISSCC 2025 / 2026 announcements (25.2MP Global Shutter with 50.4M Cu-Cu bonds & 4×2 pixel-parallel ADC, LYTIA L910 / STARVIS 3 LOFIC, Dual-VTG), Lensrentals teardown studies, and focal-plane shutter patents (US20160109782A1, US20110103787A1, US20020172519A1):
- **Radial CAD Dashed Explode Guides on 9/9 Subsystems** + 4 new specialized PBR materials (`vaporWickCopper`, `rfGoldCoax`, `loficDielectric`, `tungstenLightShield`).
- **Image Processing Engine & 12-Layer HDI Mainboard (`16 → 30`, +14)**: Internal Sintered Copper Capillary Wick Core (`M17`), Rear RF Shield Retaining Bracket & Threaded Heat-Transfer Tape (`M18`), Decoupled Modular HDMI 2.1 48Gbps Daughterboard (`M19`), Decoupled Shielded 3.5mm Audio & 24-Bit Codec Sub-Board (`M20`), Orthogonal 2×2 MIMO Ceramic Patch Antennas & Gold-Braided Coax (`M21`), 13.56 MHz NFC Planar Copper Coil & Ferrite Sheet (`M22`), USB-PD 3.1 45W Controller & Back-to-Back MOSFETs (`M23`), 512Mb Octal-SPI NOR Flash & Factory Calibration EEPROM (`M24`), Decoupled Rechargeable ML414 RTC Coin Cell (`M25`), 6ch Full-Bridge Ultrasonic PWM Motor Driver SoC & 20mΩ Shunts (`M26`), Dedicated CFexpress 4.0 Copper Thermal Spreader (`M27`), Front-Side 6-Phase Molded-Alloy Power Inductors (`M28`), 12-Branch Perimeter & Under-Board Wrap-Around Shielded FPC Harness (`M29`), and EVF Cavity FPC Clamp & 2-Screw Structural Tie Bracket (`M30`).
- **Battery, Magnesium Monocoque Body & Internal Electromechanical Machinery (`26 → 38`, +12)**: Decoupled Top-Shoulder Status Sub-OLED Module (`B27`), Vertical Battery Grip 12-Pin Gold Pogo-Pin Interface (`B28`), Full-Coverage Rear Panel Metal-Dome Switch FPC & Silicone Keymat (`B29`), Decoupled Front Custom C5 Switch & Dual-Color Tally/AF-Assist Light-Pipe (`B30`), Sealed Neodymium Playback Micro-Speaker Chamber (`B31`), Threaded PC Flash Sync Terminal & 400V Opto-Isolated Trigger Board (`B32`), Passive Pyrolytic-Graphite Thermal Chimney Duct (`B33`), Left-Flank Stainless I/O Port Strain-Relief Reinforcement Frame (`B34`), Decoupled Internal 1/4-20 UNC Stainless Tripod Load-Spreading Subframe (`B35`), Quick-Detach Double-Jointed Battery Door Hinge (`B36`), 24-Piece Color-Coded Chassis JIS Screws with Blue Thread-Lock (`B37`), and EVF Pentaprism Forged Internal Roll-Cage Arch (`B38`).
- **Micro Pixel Semiconductor Cross-Section (`11 → 15`, +4)**: Decoupled Dual Vertical Transfer Gate D-VTG Pillar Array (`M12`), Decoupled 3D High-k MIM LOFIC Lateral Overflow Capacitor Bank (`M13`), Decoupled Tungsten 3D Parasitic-Light-Shield Global Shutter Storage Memory Node MEM (`M14`), and ISSCC 2025 Pixel-Parallel 4×2 ADC Tile RDL & 50.4M Cu-Cu Pitch Adapter (`M15`).
- **Full-Frame 3-Wafer Stacked Sensor & 8.5-Stop 5-Axis IBIS (`34 → 40`, +6)**: Wrap-Around Fold-Over SLVS-EC FPC Stress-Relief Guide Bracket (`S35`), Factory Laser-Interferometer 3-Point Torx Calibration Collars & Tamper Seal (`S36`), Moving-Stage 25µm Ultra-Flexible Perimeter Graphite Wings (`S37`), On-Sensor-PCB Ultra-Low-Noise Analog LDO Regulators & Star-Ground Bar (`S38`), Front Chamber ITO Conductive Antistatic Dust-Repelling Ring (`S39`), and Secondary Optical IBIS Home-Index Photo-Interrupter & Slit Target (`S40`).
- **Dual-Driven Carbon-Fiber Focal-Plane Shutter (`33 → 39`, +6)**: Normally-Open / Normally-Closed Electromagnet Switching Lock Lever (`SH34`), Power-Off Sensor Protection Dust-Shield Interlock Latch (`SH35`), 60° Phase-Offset Differential Cocking Cam (`SH36`), Curtain-Bounce Friction Clutch Rebound Governor (`SH37`), 18° Inclined Matte-Black Aperture Stray-Light Baffle Wall (`SH38`), and Sub-Millisecond Curtain-Velocity Diagnostic Hall Sensor (`SH39`).
- **Electronic Viewfinder & Eye-Control AF (`25 → 31`, +6)**: EVF Cavity Under-Barrel FPC Retention Clamp (`E26`), Deep-Eyecup 4-Screw Stainless Slide-Rail Subframe (`E27`), Eye-Control IR Gaze-Sensor ±5µm Calibration Shims (`E28`), 3A Molecular-Sieve Desiccant Cartridge & Barometric Breather (`E29`), Auto-Brightness & Color-Temp RGB Ambient Photodiode (`E30`), and 42-Step Diopter Tactile Click Detent Leaf Spring & Zero-Stop Cam (`E31`).
- **4-Axis Multi-Angle Rear LCD Monitor (`21 → 27`, +6)**: Articulated Rear Carbon-Steel Anti-Warp Stiffener Plate (`D22`), 4-Axis Hinge Belleville Disc-Spring Friction Torque Washer Stack (`D23`), Articulated Rear-Bezel RGB Ambient Light & Color-Temp Sensor (`D24`), Articulated Selfie 180° Flip & Closed-Dock Hall/Reed Magnet Pair (`D25`), Hollow-Axle Spiral FPC Anti-Chafe PTFE Sleeve & Strain-Relief Grommet (`D26`), and 4-Corner Micro-Cellular Urethane Dock Cushion Pads (`D27`).
- **55mm Large-Diameter Mirrorless Lens Mount (`21 → 26`, +5)**: Upper Mount-Box Stainless Stiffening Ridge & Pentaprism Tie Bracket (`M22`), Internal Magnetic Drop-In Clip-Filter Ferromagnetic Keeper Ring (`M23`), Monolithic Circular Stainless Rear Bayonet Nut-Ring Backplate (`M24`), Bayonet Lug Low-Friction PTFE/PEEK Anti-Galling Wear Pads (`M25`), and 12-Pin Bus Common-Mode NiZn Ferrite Choke & EMI Hood (`M26`).
- **50mm F1.2 Prime Lens & Quad XD Linear AF Motors (`70 → 74`, +4)**: Interlocking Center-Barrel Split-Tubing Stainless Joining Ring & Dowels (`L71`), Quad XD Linear-Motor Mechanical Stainless C-Clamp Coil Retainers (`L72`), Focus-Ring 18-Ball Stainless Bearing Cage & Brass Spanner Preload Nut (`L73`), and Rear Fixed 36×24mm Rectangular Stray-Light Trap Cone & Flocked Baffle (`L74`).

### Interactive 60fps 50mm F1.2 Optical Mechanism Motion Studio
- Real-time 14-element / 28-surface **vector Snell's-law ray-tracing & floating-focus simulation engine** (`EFL = 50.07 mm`, synchronized in lockstep with the live 3D cutaway lens, 11-blade iris, Quad XD movers, and 4× SmFeN Invar magnetic scales).
- **5 Interactive Scenarios**: `01 結像 & F1.2ボケ`, `02 フローティングAF`, `03 ED色収差補正`, `04 3×XA非球面`, `05 Nano AR II & 遮光`.

## Viewing Modes (11 Zero-Text Switcher Modes + Optical Motion Studio + Fullscreen)
### Primary Assembly Views
1. **Complete Flagship Camera (305 Macro Layers — Default)**: Complete 231-part body + 74-part 50mm F1.2 lens with full 6-way radial + axial dissection and dynamic CAD trajectory guides.
2. **Complete Camera Body Only (231 Macro Layers)**: All 7 body subsystems together *without* lens (bare 55mm mount, exposed 3-wafer sensor & complete internal watchmaker mechanics).
3. **50mm F1.2 Prime Lens Standalone (74 Layers — Ultra-Dissection)**: All 14 glass elements, spanner rings, air-gap spacers, 6-layer iris, Quad XD motors + mechanical C-clamps + Permalloy shields + 200 μm SmFeN Invar scales, 18-ball bearing focus ring, interlocking center join ring, rear rectangular light-trap cone, steel reinforcing plates, and decoupled bayonet/gasket.

### Drill-Down Subsystems
4. **55mm Large-Diameter Lens Mount (26 Layers)**
5. **Focal-Plane Shutter (39 Layers)**
6. **Full-Frame Sensor & 8.5-Stop 5-Axis IBIS (40 Layers)**
7. **ISP Engine & Mainboard (30 Layers)**
8. **EVF & Eye-Control AF (31 Layers)**
9. **4-Axis Multi-Angle Rear LCD (27 Layers)**
10. **Battery, Magnesium Body & Internal Mechanics (38 Layers)**
11. **Micro Pixel Semiconductor Cross-Section (15 Layers)**

## Development

```bash
npm install
npm run dev
npm run build
```