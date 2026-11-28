#pragma once
// Shared zero-dependency Float64 binary mesh reader (TLXM v1) + minimal JSON helpers
// Used by all 4 C++ native industrial solver harnesses (CGAL, FCL, Bullet+ODE, OCCT).

#include <cstdint>
#include <cstdio>
#include <cstring>
#include <cmath>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>

namespace tlxm {

enum PartFlags : uint32_t {
  FLAG_GROUNDED    = 1u << 0,
  FLAG_CHASSIS     = 1u << 1,
  FLAG_FASTENER    = 1u << 2,
  FLAG_PCB         = 1u << 3,
  FLAG_HEAT_SOURCE = 1u << 4,
  FLAG_ELASTOMER   = 1u << 5,
  FLAG_OPTICAL     = 1u << 6,
  FLAG_CONDUCTOR   = 1u << 7,
  FLAG_MOVABLE     = 1u << 8,
  FLAG_SMT         = 1u << 9,
};

struct PartMeta {
  uint32_t partIdx = 0;
  double massG = 1.0;
  double volumeMm3 = 1.0;
  double cog[3] = {0, 0, 0};
  double bbox[6] = {0, 0, 0, 0, 0, 0};
  double explodeVec[3] = {0, 0, 0};
  uint32_t flags = 0;
  double youngMpa = 70000.0;
  double yieldMpa = 200.0;
  double thermalK = 100.0;
  double ctePpm = 20.0;
  double frictionMu = 0.35;
};

struct MeshData {
  uint32_t partIdx = 0;
  uint32_t meshIdx = 0;
  uint32_t numTris = 0;
  std::vector<double> coords; // length = numTris * 9
};

struct SceneBin {
  std::vector<PartMeta> parts;
  std::vector<MeshData> meshes;
};

inline SceneBin loadSceneBin(const std::string& path) {
  std::ifstream in(path, std::ios::binary);
  if (!in) throw std::runtime_error("Cannot open TLXM binary: " + path);

  char magic[4];
  in.read(magic, 4);
  if (std::memcmp(magic, "TLXM", 4) != 0) {
    throw std::runtime_error("Invalid TLXM magic in: " + path);
  }
  uint32_t version = 0, numParts = 0, numMeshes = 0;
  in.read(reinterpret_cast<char*>(&version), 4);
  in.read(reinterpret_cast<char*>(&numParts), 4);
  in.read(reinterpret_cast<char*>(&numMeshes), 4);
  if (version != 1) throw std::runtime_error("Unsupported TLXM version");

  SceneBin s;
  s.parts.resize(numParts);
  for (uint32_t i = 0; i < numParts; ++i) {
    auto& p = s.parts[i];
    in.read(reinterpret_cast<char*>(&p.partIdx), 4);
    in.read(reinterpret_cast<char*>(&p.massG), 8);
    in.read(reinterpret_cast<char*>(&p.volumeMm3), 8);
    in.read(reinterpret_cast<char*>(p.cog), 24);
    in.read(reinterpret_cast<char*>(p.bbox), 48);
    in.read(reinterpret_cast<char*>(p.explodeVec), 24);
    in.read(reinterpret_cast<char*>(&p.flags), 4);
    in.read(reinterpret_cast<char*>(&p.youngMpa), 8);
    in.read(reinterpret_cast<char*>(&p.yieldMpa), 8);
    in.read(reinterpret_cast<char*>(&p.thermalK), 8);
    in.read(reinterpret_cast<char*>(&p.ctePpm), 8);
    in.read(reinterpret_cast<char*>(&p.frictionMu), 8);
  }

  s.meshes.resize(numMeshes);
  for (uint32_t i = 0; i < numMeshes; ++i) {
    auto& m = s.meshes[i];
    in.read(reinterpret_cast<char*>(&m.partIdx), 4);
    in.read(reinterpret_cast<char*>(&m.meshIdx), 4);
    in.read(reinterpret_cast<char*>(&m.numTris), 4);
    m.coords.resize(static_cast<size_t>(m.numTris) * 9);
    if (m.numTris > 0) {
      in.read(reinterpret_cast<char*>(m.coords.data()),
              static_cast<std::streamsize>(m.coords.size() * sizeof(double)));
    }
  }
  if (!in) throw std::runtime_error("Truncated TLXM binary: " + path);
  return s;
}

inline double finiteOr(double v, double fb = 0.0) {
  return std::isfinite(v) ? v : fb;
}

inline std::string fmtNum(double v, int prec = 6) {
  std::ostringstream oss;
  oss << std::fixed << std::setprecision(prec) << finiteOr(v);
  return oss.str();
}

} // namespace tlxm
