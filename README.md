# Next-Gen Flagship Full-Frame Mirrorless Camera — Complete 3D CAD Technical Anatomy

Interactive photorealistic PBR 3D CAD disassembly and optical/electromechanical/semiconductor anatomy viewer built with Three.js, TypeScript, and Vite.
Pure solid white (`#FFFFFF`) background with a strictly zero-text SVG icon HUD; beginner-friendly technical explanations ("やさしい解説"), physics equations, and bespoke schematics appear exclusively inside the part inspection drawer.

Live GitHub Pages: https://sc8z35a-collab.github.io/SONY-A7-IV-Diagram/

## Complete Camera Assembly (145 Dissectible CAD Sub-Assemblies)

### Phase 8 — Ultra-40-Part 50mm F1.2 Lens Dissection, Body/Lens Split & Fullscreen Mode

#### 50mm F1.2 Prime Lens & Quad XD Linear AF Motors (40 Sub-Assemblies: L01–L40, All 14 Glass Elements Individually Dissectible!)
- **Front Protection & Factory Alignment (L01–L03)**: Bayonet Lock Cylindrical Lens Hood (`L01`), φ72 mm Fine-Pitch Filter Thread & 4-Notch Spanner Retaining Bezel (`L02`), Front-Group 3-Point Eccentric Tilt & Centering Calibration Collar (`L03`).
- **Front Optical Group — Elements E01–E05 (L04–L08)**: E01 0.01 μm 1st XA Front Element + Nano AR II/Fluorine (`L04`), E02 High-Index Lanthanum Positive Meniscus & Brass Spacer (`L05`), E03 Super-ED Positive Front Element (`L06`), E04 High-Dispersion Flint Cemented Mate & UV Optical Seam (`L07`), E05 Pre-Iris Biconcave Petzval Field Flattener (`L08`).
- **4-Layer 11-Blade Circular Iris Module (L09–L12)**: 11-Slot Non-Linear Cam Actuating Ring & Brass Sector Gear (`L09`), 11-Blade Circular Carbon-Fiber Diaphragm (`L10`, live animated), Stationary Pivot-Pin Base Plate & Stray-Light Shield (`L11`), Silent 1/64 Micro-Stepping Iris Motor & POM Gear Train (`L12`).
- **Floating Focus Group A & Quad XD Linear AF Engine (L13–L21)**: E06 Front Biconvex (`L13`), E07 2nd XA Main Carrier & Bushings (`L14`), E08 Rear Negative Self-Achromatizing Corrector (`L15`), Quad XD Stators 8× N52 Magnets & Soft-Iron Yokes (`L16`), Quad XD Movers 4× OFC Flat-Wire Coils (`L17`), Preload Springs/POM Sliders & Silicone End-Dampers (`L18`), 4× Centerless-Ground Titanium Guide Shafts & Cage (`L19`), 4× 0.1 μm MR Magnetic Position Encoders (`L20`), Internal Fixed TSC/Magnesium Structural Skeleton Barrel (`L21`).
- **Floating Focus Group B & Rear Telecentric Optical Stack — Elements E09–E14 (L22–L28)**: E09 Focus Group B Front ED Mate (`L22`), E10 Focus Group B Rear Negative Aspheric Carrier (`L23`), E11 Group 7 Field-Curvature Flattener (`L24`), E12 Group 8 Lanthanum Sagittal Coma Corrector (`L25`), E13 φ45 mm Rear Telecentric Meniscus (`L26`), E14 φ44 mm 3rd XA Rear Hero Element (`L27`), Rear 3:2 Rectangular Stray-Light Flare Mask & Flocked Baffle (`L28`).
- **Thermal/Magnetic/Optical Sensing, Electronics, 6-Stage Seals & Micron Mount (L29–L40)**: Internal NTC Thermistor Thermal-Focus Sensor (`L29`), Circular Ring HDI 32-Bit AF MCU & 4ch H-Bridge PCB (`L30`), Multi-Branch High-Flex Polyimide Internal FPC Harness (`L31`), Non-Contact 2,048 PPR Optical Slotted MF Encoder (`L32`), Aperture Ring Non-Contact Magnetic Hall Sensor & Multi-Pole Rotor (`L33`), Switchable Steel-Ball Spring Click/De-Click Detent Cam (`L34`), Weather-Sealed Side Switch Pod PCB (`L35`), 6-Stage Weather-Sealing EPDM O-Rings & Wiper Lips (`L36`), Knurled Rubber Focus Ring & Machined Aluminum Aperture Ring (`L37`), Weather-Sealed Magnesium Outer Cutaway Barrel (`L38`), Infinity-Focus Micron Brass/Stainless Mount Calibration Shims (`L39`), Hardened Stainless 4-Lug Rear Bayonet & 12-Pin Gold Contacts (`L40`).

#### Full-Frame 3-Wafer Stacked Global Shutter Sensor & 8.5-Stop 5-Axis IBIS (26 Macro + 7 Micro Pixel Layers)
- S01–S26: SSWF Dust Filter + PZT Ultrasonic Bar, Dual-Quartz OLPF + Zero-Order λ/4 Plate, Hybrid IR/UV Filter, 3-Wafer BSI-CMOS + 3 μm Cu-Cu Hybrid Bond + 4nm ADC/120fps DRAM, 4N Gold Wire Bonds, HTCC Alumina LGA + CuW Slug, 10-Layer PCB, SLVS-EC v3 U-Loop Harness, 5-Axis IBIS Stage + 3× Air-Core VCM Coils + 3-Axis Hall PCB + Si₃N₄ Ceramic Balls + Magnetic Preload + Park-Lock Solenoid + N52 Magnet Arrays + 3-Point Micron Tilt Springs + Compliant TIM + Σ-Folded PGS Thermal Bridge + 17-Fin Pure-Copper Heatsink.
- M1–M7: 7-Layer 2×2 Bayer Micro Pixel Cross-Section (Gapless OCL, RGGB CFA + W-Grid, Moth-Eye BSI AR, Cross-Type Dual Pixel PD + FTI, 2-Layer Transistor + GS Memory + LOFIC, Cu-Cu Hybrid Bond, Column ADC + DRAM).

#### Other Complete Body Subsystems (72 Sub-Assemblies)
- **4-Axis Multi-Angle Rear LCD Monitor (6 Sub-Assemblies)**: OCA Cover Glass + ITO Touch, 3.2" 2.1M-Dot IPS Cell, Dual-BEF Backlight Prism, CNC Shell + Hall Magnet, 176°/270° Dual-Axis Friction Hinge, 4-Axis Optical-Axis Tilt Cradle.
- **Battery, Magnesium Monocoque Body, 21-Pin Hot Shoe & Dials (12 Sub-Assemblies)**: 7.2 V / 6.0 A Dual-Cell Li-Ion Battery + BMS, Sealed Chamber, Deep Ergonomic Grip, 2-Stage Shutter + Command Dials, Center-Lock Top Dials + Sub-OLED, 21-Pin Digital Audio Hot Shoe, AZ91D Front Monocoque, Top Deck, Rear Chassis + AF Joystick, Slide-Lock Card Door, 3-Way I/O Doors, Optical-Axis Tripod Baseplate.
- **55mm Large-Diameter Mirrorless Lens Mount (12 Sub-Assemblies)**: Stainless Bayonet Flange, 6-Point Bolts, EPDM Gasket, 4-Leaf Clamping Spring, Sub-Micron Shims, Lock Pin Linkage, 12-Pin Gold Pogo Contacts, ESD Rigid-Flex PCB, 5-Rib Velvet Baffle, 36×24 mm Flare Mask, AZ91D Throat Box, Tripod Load-Bypass Interface.
- **Electronic Viewfinder & Eye-Control AF (14 Sub-Assemblies)**: Silicone Eyecup, Anti-Fog Double-Pane Glass, 940 nm ToF Sensor, 850 nm 8-LED Ring, 45° Dichroic Hot Mirror, 307K-px Gaze CMOS, G4 Double-Aspheric Eyepiece, G2/G3 ED Doublet, Helical Diopter Dial, G1 Field Flattener, 9.44M-Dot 240 Hz Tandem Micro-OLED, TCON PCB, Copper/Al Heatsink, Magnesium Cutaway Barrel.
- **Image Processing Engine & 12-Layer HDI Mainboard (16 Sub-Assemblies)**: Two-Phase Vapor Chamber, EMI Shield, Copper IHS, 4nm Main ISP Die, ABF Interposer, 2D Systolic AI NPU, Dual LPDDR5X-8533, Multi-Phase Buck PMIC, Dual CFexpress 4.0 / SD Cage, 6-Axis Quartz IMU, C2PA Security + TCXO, HDMI 2.1 / USB-C / 2.5G LAN, Wi-Fi 6E/7 RF SiP, 12-Layer HDI PCB, 80-Pin SLVS-EC B2B Harness, Magnesium Mid-Frame.
- **Dual-Driven Carbon-Fiber Focal-Plane Shutter (12 Sub-Assemblies)**: Front Cover, Anti-Dust Shield, 4-Blade CFRP 1st & 2nd Curtains, Dual Parallelogram Linkages, 0.15 mm Mid-Plate, Torsion Springs + Electromagnetic Boost Actuator (1/400 s Sync), Holding Solenoids, Coreless DC Charge Motor & Gear Train, 940 nm IR Speed Monitors, Rebound Dampers & Floating Mounts.

## Viewing Modes (11 Zero-Text Switcher Modes + Fullscreen Mode)
### Primary Assembly Views
1. **Complete Flagship Camera (138 Macro Layers — Default)**: Complete body + 40-part 50mm F1.2 lens with full 6-way radial + axial dissection.
2. **Complete Camera Body Only (98 Macro Layers)**: All 7 body subsystems together *without* lens (bare 55mm mount & exposed 3-wafer sensor!).
3. **50mm F1.2 Prime Lens Standalone (40 Layers — Ultra-Dissection)**: All 14 individual glass elements, 4-layer iris, Quad XD motors, sensors, 6-stage seals, and micron mount shims.

### Drill-Down Subsystems
4. **55mm Large-Diameter Lens Mount (12 Layers)**
5. **Focal-Plane Shutter (12 Layers)**
6. **Full-Frame Sensor & 8.5-Stop 5-Axis IBIS (26 Layers — Super-Dissection)**
7. **ISP Engine & Mainboard (16 Layers)**
8. **EVF & Eye-Control AF (14 Layers)**
9. **4-Axis Multi-Angle Rear LCD (6 Layers)**
10. **Battery, Magnesium Body & Dials (12 Layers)**
11. **Micro Pixel Semiconductor Cross-Section (7 Layers)**

### Fullscreen Mode
- Click the zero-text **4-corner expand/compress SVG button** on the right edge of the bottom dock (or press `F`) to enter native browser fullscreen (with automatic immersive Zen-fullscreen fallback inside embedded frames).


## Development

```bash
npm install
npm run dev
npm run build
```