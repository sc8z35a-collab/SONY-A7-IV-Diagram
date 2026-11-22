# Next-Gen Mirrorless Camera — 3D CAD Technical Anatomy

Interactive PBR 3D CAD disassembly and optical/physics anatomy viewer built with Three.js, TypeScript, and Vite.

## Current Module: Phase 1 — Full-Frame Image Sensor Assembly

### Macro Sensor Module (14 Sub-Assemblies)
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

## Development

```bash
npm install
npm run dev
npm run build
```