# Next-Gen Mirrorless Camera — 3D CAD Technical Anatomy

Interactive PBR 3D CAD disassembly and optical/physics/semiconductor anatomy viewer built with Three.js, TypeScript, and Vite.
Pure solid white (`#FFFFFF`) background with a strictly zero-text SVG icon HUD; beginner-friendly technical explanations and bespoke schematics appear exclusively inside the part inspection drawer.

## Implemented Subsystems (49 Dissectible CAD Sub-Assemblies)

### Phase 3 — Image Processing Engine (4nm ISP + AI NPU) & 12-Layer HDI Mainboard (16 Sub-Assemblies)
1. Two-Phase Copper Vapor Chamber, Sintered Heat Pipe, Pyrolytic Graphite Sheet & Thermal Interface Pads (TIM)
2. Multi-Compartment Nickel-Silver EMI/RF Shielding Frame & Grounding Clips
3. ISP Main Engine Nickel-Plated Copper Integrated Heat Spreader (IHS) & Thermal Gel
4. 4nm Flagship Main Image Processing Engine (ISP) Bare Silicon Die (Dual-Stream 16-bit RAW / 8K60p Codec)
5. Flip-Chip BGA ABF Organic Interposer Substrate, Cu Pillar Micro-Bumps & SnAgCu Solder Ball Grid
6. Dedicated AI / Deep-Learning Accelerator NPU (2D Systolic Array MAC Engine for Pose Estimation, Neural NR & 4× Upscaling)
7. Quad-Channel Stacked LPDDR5X-8533 High-Speed Frame Buffer DRAM × 2 (68+ GB/s Pre-Capture Ring Buffer)
8. Multi-Phase Synchronous Buck PMIC, 6 Molded Ferrite Power Inductors & Polymer Tantalum PDN Bank
9. Dual CFexpress 4.0 Type B (PCIe Gen4 ×2 / 4,000 MB/s / NVMe 1.4c) & SDXC UHS-II Card Cage
10. 6-Axis Quartz MEMS Gyroscope/Accelerometer IMU & Real-Time 2,000 Hz IBIS/Lens Servo MCU
11. C2PA Hardware Security Element (Content Credentials ECDSA Signing) & ±0.5 ppm TCXO Master Clock
12. Professional External I/O Port Cluster (Full-Size HDMI 2.1 48Gbps, USB-C 10Gbps PD, 2.5GBASE-T LAN, 24-bit Audio, ESD TVS)
13. Shielded Tri-Band Wi-Fi 6E / Wi-Fi 7 (2×2 MIMO) & Bluetooth 5.3 RF SiP Module with 50 Ω Coax Feed
14. 12-Layer Any-Layer HDI Main Motherboard PCB (UV Laser Microvias, 100 Ω / 85 Ω Differential Impedances, 12-Layer Edge Laminate)
15. High-Density Board-to-Board 80-Pin Shielded SLVS-EC Mezzanine & ZIF FPC Connector Harness (12 Ports)
16. Front Thermal-Isolation Magnesium Structural Mid-Frame & EMI Grounding Bracket

### Phase 2 — Dual-Driven Carbon-Fiber Focal-Plane Shutter Assembly (12 Sub-Assemblies)
- Front Cover & Drive-Bay Cutout, Anti-Dust Sensor Shield, 4-Blade CFRP 1st & 2nd Curtains, Dual Parallelogram 4-Bar Linkages, 0.15 mm Mid-Plate, Dual-Driven Torsion Springs + Electromagnetic Boost Actuator (1/400 s Sync), Twin Permalloy Holding Solenoids, Coreless DC Charge Motor & Gear Train, 940 nm IR Speed Monitors, Rebound Brake Dampers & Floating Anti-Vib Mounts.

### Phase 1 — Full-Frame Image Sensor & 5-Axis IBIS Assembly (14 Sub-Assemblies + 7 Micro Pixel Layers)
- Aperture Mask, SSWF Ultrasonic Dust Filter, 16-Point Quartz OLPF, Hybrid IR/UV Cut Filter, Hermetic Cover Glass, 3D-Stacked Global Shutter BSI-CMOS Die, 4N Au Wire Bonds, HTCC Alumina LGA Package, Sensor PCB, SLVS-EC U-Loop FPC, 5-Axis IBIS VCM Carrier, Si₃N₄ Ceramic Ball Suspension, N52 Magnet Yoke, Sigma Graphite Thermal Bridge + 7-Layer 2×2 Bayer Micro Pixel Semiconductor Cross-Section.

## Viewing Modes (5 Zero-Text Switcher Modes)
- **Integrated Camera Core (42 Layers)**: Shutter + Sensor & IBIS + Mainboard & ISP Engine aligned on the true optical axis
- **Focal-Plane Shutter (12 Layers)**
- **Full-Frame Sensor & 5-Axis IBIS (14 Layers)**
- **ISP Engine & Mainboard (16 Layers — Default)**
- **Micro Pixel Cross-Section (7 Layers)**

## Development

```bash
npm install
npm run dev
npm run build
```