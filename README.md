# Next-Gen Mirrorless Camera — 3D CAD Technical Anatomy

Interactive PBR 3D CAD disassembly and optical/physics anatomy viewer built with Three.js, TypeScript, and Vite.
Pure solid white (`#FFFFFF`) background with a strictly zero-text SVG icon HUD; technical explanations and bespoke schematics appear exclusively inside the part inspection drawer.

## Implemented Subsystems (33 Dissectible CAD Sub-Assemblies)

### Phase 2 — Dual-Driven Carbon-Fiber Focal-Plane Shutter Assembly (12 Sub-Assemblies)
1. Front Protective Cover Plate & Matte Stray-Light Aperture Baffle
2. Dedicated Anti-Dust Protective Sensor Shield Curtain (Power-Off Auto-Close)
3. 1st (Front) Curtain — 4-Blade Ultra-Thin CFRP Carbon-Fiber Blades (~0.05 mm)
4. 1st Curtain Parallelogram 4-Bar Linkage Arms & Micro Rivets
5. Intermediate Partition Plate (0.15 mm Ultra-Thin Curtain Chamber Separator)
6. 2nd (Rear) Curtain — 4-Blade Slit-Forming Exposure Termination Blades (1/8000 s Slit Exposure)
7. 2nd Curtain Parallelogram 4-Bar Linkage Arms & High-Strength Drive Pin
8. Dual-Driven Actuator — High-Tension Torsion Springs × 2 + Electromagnetic Boost Motor (1/400 s Flash Sync)
9. Microsecond-Precision Twin Holding Electromagnets (Permalloy Core Front & Rear Solenoids)
10. 500k-Cycle Coreless DC Charge Motor, Multi-Stage Brass/POM Gear Train & Eccentric Cocking Cam
11. Self-Diagnostic 940 nm IR Photo-Interrupter Curtain Speed Monitors & Control FPC
12. High-Rigidity Base Chassis, Elastomer Rebound Brake Dampers & 4-Point Floating Anti-Vibration Mounts

### Phase 1 — Full-Frame Image Sensor & 5-Axis IBIS Assembly (14 Sub-Assemblies)
1. Optical Aperture Baffle & EPDM Dust-Seal Bezel
2. Supersonic Wave Filter (SSWF) & PZT Piezoelectric Dust Reduction Actuator
3. 16-Point Gaussian-Distribution Birefringent Quartz OLPF
4. Hybrid Cu²⁺ Phosphate IR-Absorption + Dichroic Multilayer IR/UV Cut Filter
5. Low-Alpha AR Borosilicate Cover Glass & Kovar Hermetic Seal Ring
6. Full-Frame 3D-Stacked Global Shutter + 2-Layer Transistor Pixel BSI-CMOS Die (36.0 × 24.0 mm)
7. 99.99% Au Ultra-Low-Loop Thermosonic Wire Bonding Array
8. HTCC 12-Layer Alumina Ceramic LGA Package & CuW Thermal Slug
9. Multi-Layer Sensor Main PCB & Isolated Low-Noise Power Stage
10. SLVS-EC v3 (10 Gbps/lane) U-Loop Shielded Flex PCB Harness
11. 5-Axis IBIS Movable Magnesium Carrier, Air-Core Flat Voice Coils & Hall Sensors
12. Kinematic 3-Point Si₃N₄ Ceramic Ball Suspension & Magnetic Preload Guides
13. Stationary IBIS Base Chassis, N52 Neodymium Closed-Circuit Magnet Yokes & 3-Point Flange-Back Calibrators
14. Sigma-Shaped Pyro-Graphite Thermal Bridge & Copper Heat Spreader

### Micro Pixel Architecture (7 Nano-Scale Layers, 2×2 Bayer Array)
- Gapless Aspheric On-Chip Microlens Array (OCL)
- RGGB Bayer Color Filter Array & Tungsten Metal Light-Guide Grid
- BSI Back-Side Anti-Reflection Moth-Eye Pyramid Nanostructure
- Cross-Type Dual Pixel Split Pinned Photodiodes & Full Trench Isolation (FTI)
- 2-Layer Transistor Pixel, SVG Vertical Transfer Gate, Shielded Global Shutter Memory Node & LOFIC
- Fine-Pitch Cu-Cu Direct Hybrid Bonding Interconnect Interface
- Column-Parallel CDS / Multi-Bit ADC Logic & Stacked High-Speed DRAM Frame Buffer

## Viewing Modes
- **Integrated Camera Core**: Shutter + Sensor aligned on the true optical axis (26 parts)
- **Focal-Plane Shutter**: Standalone 12-part shutter mechanism with live slow-motion slit-exposure & motorized recocking simulation
- **Full-Frame Sensor**: Standalone 14-part sensor + 5-axis IBIS module
- **Micro Pixel Cross-Section**: 2×2 nano-scale semiconductor pixel architecture

## Development

```bash
npm install
npm run dev
npm run build
```