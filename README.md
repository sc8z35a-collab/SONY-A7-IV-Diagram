# Next-Gen Flagship Full-Frame Mirrorless Camera — Complete 3D CAD Technical Anatomy

Interactive photorealistic PBR 3D CAD disassembly and optical/electromechanical/semiconductor anatomy viewer built with Three.js, TypeScript, and Vite.
Pure solid white (`#FFFFFF`) background with a strictly zero-text SVG icon HUD; beginner-friendly technical explanations ("やさしい解説"), physics equations, and bespoke schematics appear exclusively inside the part inspection drawer.

Live GitHub Pages: https://sc8z35a-collab.github.io/SONY-A7-IV-Diagram/

## Complete Camera Assembly (207 Dissectible CAD Sub-Assemblies)

### Phase 10 — Ultra-Dissection of Camera Body Internal Electromechanical Machinery (+40 Watchmaker Parts → 138 Body Parts!)
- **Dual-Driven Carbon-Fiber Focal-Plane Shutter (26 Sub-Assemblies — Watchmaker Ultra-Dissection)**: Front Cover, Anti-Dust Shield & Slip-Clutch Actuator, 1st & 2nd Curtain CFRP Blades & Dedicated PTFE Guide Rails, Dual Parallelogram Linkages + DLC Pivot Jewels/Bushings, 0.15 mm Mid-Plate, Torsion Springs + Calibration Tension Drums + Electromagnetic Boost Actuator (1/400 s Sync), Tungsten Counter-Phase Recoil Balancer, Holding Solenoids + Permalloy Armature Release Levers (10 μs), Coreless DC Charge Motor + 4-Stage POM/Brass Gear Train + Cycloidal Cocking Cam + Cam Phase Switch, 940 nm IR Speed Monitors, Multi-Stage Urethane Blade Brakes, Hydraulic/Viscous End-Stop Shock Piston, High-Current H-Bridge FPC, 4-Point Floating Anti-Vibration Grommets & Main Chassis.
- **Battery, Magnesium Monocoque Body, Controls & Internal Electromechanical Machinery (26 Sub-Assemblies — Watchmaker Ultra-Dissection)**: 7.2 V / 6.0 A Dual-Cell Li-Ion Pack + BMS, Sealed Chamber, Spring-Loaded Blue Retention Claw & Ejector Latch, 6A 4-Pin Gold Twin-Contact Leaf Terminals & 2oz Power FPC, Deep Ergonomic Grip, 2-Stage Shutter Button + Coaxial 2-Layer Stainless Snap-Dome Switch & Power Wiper, Front/Rear Command Dials + Non-Contact Optical Slotted Encoders & Steel-Ball Detents, Center-Lock Mode/Dual-Deck Drive Dials + Planetary Lock-Pin Ratchet & Concentric Hollow Shaft, U-Shaped EVF-Bypass Rigid-Flex Top Switch PCB & Gray-Code Wipers, 21-Pin Digital Audio Hot Shoe + Dual Cantilever Leaf Springs & Rain-Seal Skirt, AZ91D Front Monocoque, Top Deck, Rear Chassis + AF Joystick + 4-Axis Gimbal Rocker 5-Dome Switch PCB + Hollow-Center 36-Pulse Rear Wheel Optical Encoder, Slide-Lock Card Door + Dual Push-Push Heart-Cam Card Ejector Rails + Sub-25 ms Door-Open Safety Interlock Switch, 3-Way I/O Doors, Forged Stainless Tri-Bolt Strap Lug Anchors, Waterproof ePTFE Stereo MEMS Mic Chambers / Piezo Buzzer / Barometric Breather Vent, Full-Body 3D Molded Silicone Perimeter Weather-Sealing Gaskets & Optical-Axis Tripod Baseplate.
- **4-Axis Multi-Angle Rear LCD Monitor & Articulation Mechanics (14 Sub-Assemblies — Watchmaker Ultra-Dissection)**: OCA Cover Glass + ITO Touch, 3.2" 2.1M-Dot IPS Cell, Dual-BEF Backlight Prism, CNC Shell + 3D Hall Magnetic Orientation Sensor, 176°/270° Dual-Axis Hinge + Stacked Belleville Disc-Spring Friction Torque Clutch + Hardened 0°/180°/270° Detent Stops + Helical Coaxial Rolled-Copper FPC, 4-Bar Pantograph Parallel Tilt Linkage + Gravity-Compensating Asymmetric Torque Cams + Twin Stainless Slide Rails + Rear Cradle Parking Locks & Docking Frame.
- **Electronic Viewfinder & Eye-Control AF (18 Sub-Assemblies — Watchmaker Ultra-Dissection)**: Silicone Eyecup + Quick-Release Dual Stainless Slide-Lock Latch, Anti-Fog Double-Pane Glass, 940 nm ToF Sensor, 850 nm 8-LED Ring, 45° Dichroic Hot Mirror, 307K-px Gaze CMOS, G4 Double-Aspheric Eyepiece, G2/G3 ED Doublet, Twin Centerless-Ground Stainless Diopter Guide Rods & Preload Springs, 3-Track Spiral-Cam Helicoid Barrel Sleeve, Helical Diopter Dial & Brass Lead Screw, G1 Field Flattener, 9.44M-Dot 240 Hz Tandem Micro-OLED + 3-Point Micron Kovar Tilt Calibration Frame, TCON PCB, Copper/Al Heatsink, Magnesium Cutaway Barrel.

### Phase 9 — 62-Part Watchmaker-Grade 50mm F1.2 Lens Ultra-Dissection & 60fps Interactive Optical Mechanism Motion Studio

#### Interactive 60fps 50mm F1.2 Optical Mechanism Motion Studio
- Real-time 14-element / 28-surface **vector Snell's-law ray-tracing & floating-focus simulation engine** (`EFL = 50.07 mm`, synchronized in lockstep with the live 3D cutaway lens above).
- **5 Interactive Scenarios** with smooth choreography, manual sliders (`F1.2 ↔ F16`, `∞ ↔ 0.40 m`, `±18°`), draggable subject handle on the 2D optical bench, bidirectional 3D hover/click sync, 10× magnified scientific aberration/wave-interference loupe, and live 11-blade iris + realistic Bokeh PSF simulator:
  1. `01 結像 & F1.2ボケ`: Large-aperture converging beam, 11-blade circular iris, bokeh diameter & cat's-eye vignetting.
  2. `02 フローティングAF`: Quad XD Linear Motor differential floating Focus Group A & B (`1.86:1` stroke ratio) eliminating close-up breathing & aberration drift.
  3. `03 ED色収差補正`: Live Super-ED ON vs OFF RGB spectral dispersion comparison (`0.00 mm` apochromat vs `3.46 mm` axial chromatic split).
  4. `04 3×XA非球面`: Live 3× 0.01 μm XA aspheric ON vs OFF spherical caustic & onion-ring bokeh comparison.
  5. `05 Nano AR II & 遮光`: Sub-wavelength λ/4 destructive wave-interference coating & knife-edge internal flare baffles ON vs OFF.

#### 50mm F1.2 Prime Lens & Quad XD Linear AF Motors (62 Sub-Assemblies: L01–L62 — Real Teardown Grade!)
- **Front Protection, Seal, Shims & Group 1 Optics E01–E05 (L01–L13)**: Bayonet Lock Cylindrical Hood (`L01`), Hood Elastomer Shock Bumper & Spring Release Latch (`L02`), φ72 mm 1/8-Turn Bayonet Filter Ring (`L03`), Under-Filter Closed-Cell Weather Foam Gasket (`L04`), Front-Group 3-Point Stepped Tilt Calibration Shims & Red Factory Mark (`L05`), Front 3-Point Eccentric Centering Collar (`L06`), CNC Aluminum Front Cell & 6× Elastomeric Stress-Relief Potting Pockets (`L07`), E01 0.01 μm 1st XA Front Element + Nano AR II/Fluorine (`L08`), E02 High-Index Lanthanum Meniscus & Brass Spacer (`L09`), E03 Super-ED Positive Front Element (`L10`), E04 Dense Flint Cemented Mate & UV Seam (`L11`), E05 Pre-Iris Biconcave Field Flattener (`L12`), Inter-Group Knife-Edge Stray-Light Shield (`L13`).
- **6-Layer 11-Blade Circular Iris Module (L14–L19)**: Iris Front PTFE Anti-Lift Dust Cover (`L14`), 11-Slot Non-Linear Cam Ring & Brass Sector Gear (`L15`), 11-Blade Circular Carbon-Fiber Diaphragm (`L16`, live animated), Stationary Pivot-Pin Base Plate & Baffle (`L17`), Silent 1/64 Micro-Stepping Iris Motor & POM Gear Train (`L18`), 940 nm F1.2 Open-Home Photo-Interrupter (`L19`).
- **Floating Focus Group A, Quad XD Linear Engine & Split Internal Chassis (L20–L33)**: E06 Front Biconvex (`L20`), E07 2nd XA Main Focus Element (`L21`), E08 Rear Negative Self-Achromatizer (`L22`), Focus Group A CoG-Aligned Carrier, Eccentric Collars & Balance Weights (`L23`), Quad XD Stators 8× N52 Magnets & Yokes (`L24`), Permalloy Magnetic Flux Containment Shields & Copper Heat Bridges (`L25`), Quad XD Movers 4× OFC Flat-Wire Coils (`L26`), Preload Springs, POM Sliders & Silicone End-Dampers (`L27`), 4× Centerless-Ground Titanium Main Guide Shafts (`L28`), 4× Anti-Rotation Sub-Guide Rails & Forked POM Sliders (`L29`), 4× 0.1 μm MR Magnetic Position Encoders (`L30`), Dual Focus A/B Startup Homing Photo-Interrupters (`L31`), Split Internal TSC/Magnesium Chassis — Front Structural Half (`L32`), Split Internal TSC/Magnesium Chassis — Rear Structural Half (`L33`).
- **Floating Focus Group B & Rear Telecentric Stack E09–E14 (L34–L42)**: E09 Focus Group B Front ED Mate (`L34`), E10 Focus Group B Rear Negative Aspheric (`L35`), Focus Group B 3-Point Eccentric Tilt Collars & Nylon Support Posts (`L36`), E11 Group 7 Field Flattener (`L37`), E12 Group 8 Lanthanum Coma Corrector (`L38`), E13 φ45 mm Rear Telecentric Meniscus (`L39`), E14 φ44 mm 3rd XA Rear Hero Element (`L40`), Rear Optical Cell & Per-Unit Bokeh/Spherical-Aberration Brass Spacing Ring (`L41`), Rear 3:2 Rectangular Stray-Light Flare Mask & Flocked Baffle (`L42`).
- **Dual Independent Control Rings, Sensors, Shielded Electronics, Split Outer Barrel & Micron Mount (L43–L62)**: Standalone Knurled Linear-Response MF Focus Ring (`L43`), 3× White POM MF Spring Friction Tensioners & Moisture Seal Tape (`L44`), Non-Contact 2,048 PPR Optical Slotted MF Encoder (`L45`), Standalone CNC Machined Aluminum Aperture Ring (`L46`), 24-Ball Stainless Aperture Ring Bearing Race (`L47`), Aperture Ring Non-Contact Magnetic Hall Sensor & Multi-Pole Rotor (`L48`), Switchable Click/De-Click Detent Cam (`L49`), Weather-Sealed Side Switch Pod PCB (`L50`), 12-o'Clock Vertical-Grip Top Focus Hold Button & Silicone Waterproof Boot (`L51`), Internal NTC Thermistor Thermal-Focus Sensor (`L52`), Circular Ring HDI 32-Bit AF MCU & 4ch H-Bridge PCB (`L53`), Conductive EMI Metal Shield Plate, Driver Cans & Copper-Foil ESD Ground Tape (`L54`), Multi-Branch High-Flex Polyimide FPC Harness (`L55`), 6-Stage Weather-Sealing EPDM O-Rings & Wiper Lips (`L56`), Split Front Outer Barrel & Metallic Accent Ring (`L57`), Weather-Sealed Magnesium Mid/Rear Cutaway Barrel (`L58`), Under-Mount 3-Location Tilt Shim Insertion Plate & Rear Dust Foam (`L59`), Infinity-Focus Micron Brass/Stainless Mount Calibration Shims (`L60`), Standalone 12-Pin Gold Contact Block, PPS Insulator & TVS ESD Sub-Flex (`L61`), Hardened Stainless 4-Lug Rear Bayonet Mount (`L62`).

#### Full-Frame 3-Wafer Stacked Global Shutter Sensor & 8.5-Stop 5-Axis IBIS (26 Macro + 7 Micro Pixel Layers)
- S01–S26: SSWF Dust Filter + PZT Ultrasonic Bar, Dual-Quartz OLPF + Zero-Order λ/4 Plate, Hybrid IR/UV Filter, 3-Wafer BSI-CMOS + 3 μm Cu-Cu Hybrid Bond + 4nm ADC/120fps DRAM, 4N Gold Wire Bonds, HTCC Alumina LGA + CuW Slug, 10-Layer PCB, SLVS-EC v3 U-Loop Harness, 5-Axis IBIS Stage + 3× Air-Core VCM Coils + 3-Axis Hall PCB + Si₃N₄ Ceramic Balls + Magnetic Preload + Park-Lock Solenoid + N52 Magnet Arrays + 3-Point Micron Tilt Springs + Compliant TIM + Σ-Folded PGS Thermal Bridge + 17-Fin Pure-Copper Heatsink.
- M1–M7: 7-Layer 2×2 Bayer Micro Pixel Cross-Section (Gapless OCL, RGGB CFA + W-Grid, Moth-Eye BSI AR, Cross-Type Dual Pixel PD + FTI, 2-Layer Transistor + GS Memory + LOFIC, Cu-Cu Hybrid Bond, Column ADC + DRAM).

#### Mount & Mainboard Core Subsystems (28 Sub-Assemblies)
- **55mm Large-Diameter Mirrorless Lens Mount (12 Sub-Assemblies)**: Stainless Bayonet Flange, 6-Point Bolts, EPDM Gasket, 4-Leaf Clamping Spring, Sub-Micron Shims, Lock Pin Linkage, 12-Pin Gold Pogo Contacts, ESD Rigid-Flex PCB, 5-Rib Velvet Baffle, 36×24 mm Flare Mask, AZ91D Throat Box, Tripod Load-Bypass Interface.
- **Image Processing Engine & 12-Layer HDI Mainboard (16 Sub-Assemblies)**: Two-Phase Vapor Chamber, EMI Shield, Copper IHS, 4nm Main ISP Die, ABF Interposer, 2D Systolic AI NPU, Dual LPDDR5X-8533, Multi-Phase Buck PMIC, Dual CFexpress 4.0 / SD Cage, 6-Axis Quartz IMU, C2PA Security + TCXO, HDMI 2.1 / USB-C / 2.5G LAN, Wi-Fi 6E/7 RF SiP, 12-Layer HDI PCB, 80-Pin SLVS-EC B2B Harness, Magnesium Mid-Frame.

## Viewing Modes (11 Zero-Text Switcher Modes + Optical Motion Studio + Fullscreen)
### Primary Assembly Views
1. **Complete Flagship Camera (200 Macro Layers — Default)**: Complete 138-part body + 62-part 50mm F1.2 lens with full 6-way radial + axial dissection.
2. **Complete Camera Body Only (138 Macro Layers)**: All 7 body subsystems together *without* lens (bare 55mm mount, exposed 3-wafer sensor & complete internal watchmaker mechanics!).
3. **50mm F1.2 Prime Lens Standalone (62 Layers — Ultra-Dissection)**: All 14 individual glass elements, 6-layer iris, Quad XD motors + Permalloy shields + anti-rotation rails, split chassis & barrels, standalone MF/aperture rings + 24-ball race + POM tensioners, EMI shielding, and micron tilt shims.

### Drill-Down Subsystems
4. **55mm Large-Diameter Lens Mount (12 Layers)**
5. **Focal-Plane Shutter (26 Layers — Watchmaker Ultra-Dissection)**
6. **Full-Frame Sensor & 8.5-Stop 5-Axis IBIS (26 Layers — Super-Dissection)**
7. **ISP Engine & Mainboard (16 Layers)**
8. **EVF & Eye-Control AF (18 Layers — Watchmaker Ultra-Dissection)**
9. **4-Axis Multi-Angle Rear LCD (14 Layers — Watchmaker Ultra-Dissection)**
10. **Battery, Magnesium Body & Internal Mechanics (26 Layers — Watchmaker Ultra-Dissection)**
11. **Micro Pixel Semiconductor Cross-Section (7 Layers)**

### Interactive Optical Motion Studio & Fullscreen Mode
- Click the zero-text **convex-lens converging-ray SVG button** in the dock (or the CTA button inside any lens part's explanation drawer) to open the synchronized **60fps 50mm F1.2 Optical Mechanism Motion Studio**.
- Click the zero-text **4-corner expand/compress SVG button** on the right edge of the dock (or press `F`) to enter native browser fullscreen (with automatic immersive Zen-fullscreen fallback inside embedded frames).


## Development

```bash
npm install
npm run dev
npm run build
```