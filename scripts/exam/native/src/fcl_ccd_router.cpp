// THE LAST EXAM V1 — Native C++ Harness #2: FCL 0.7 (Flexible Collision Library)
// Robotics-grade independent BVH collision, exact nearest surface distance,
// Continuous Collision Detection (CCD) for explode/disassembly trajectories,
// and 3D collision-free A* wire/harness pathfinding & clearance audit!

#include "tlxm_reader.hpp"

#include <fcl/fcl.h>
#include <Eigen/Dense>

#include <algorithm>
#include <cmath>
#include <limits>
#include <memory>
#include <queue>
#include <unordered_map>
#include <vector>

using S = double;
using BV = fcl::OBBRSS<S>;
using BVHModel = fcl::BVHModel<BV>;
using CollisionObject = fcl::CollisionObject<S>;
using Transform3 = fcl::Transform3<S>;
using Vector3 = fcl::Vector3<S>;

namespace {

inline bool aabbOverlapPad(const double a[6], const double b[6], double pad) {
  return a[0] <= b[3] + pad && a[3] >= b[0] - pad &&
         a[1] <= b[4] + pad && a[4] >= b[1] - pad &&
         a[2] <= b[5] + pad && a[5] >= b[2] - pad;
}

inline double aabbMinDist(const double a[6], const double b[6]) {
  double dx = std::max(0.0, std::max(a[0] - b[3], b[0] - a[3]));
  double dy = std::max(0.0, std::max(a[1] - b[4], b[1] - a[4]));
  double dz = std::max(0.0, std::max(a[2] - b[5], b[2] - a[5]));
  return std::sqrt(dx * dx + dy * dy + dz * dz);
}

struct CollisionRec {
  uint32_t a, b;
  double penDepth;
  double pos[3];
  double normal[3];
};

struct ContactEdge {
  uint32_t a, b;
  double distMm;
  double pA[3];
  double pB[3];
  double normal[3];
};

struct CcdHit {
  uint32_t movingPart;
  uint32_t blockerPart;
  double toc;
};

struct WireRouteResult {
  uint32_t partA, partB;
  bool found;
  double straightMm;
  double routedMm;
  double minBendRadiusMm;
  int wallPenetrations;
};

// 3D Voxel A* obstacle-avoiding harness pathfinder verified against real part geometries
WireRouteResult routeWire3D(
    uint32_t pA, uint32_t pB,
    const tlxm::SceneBin& scene,
    const std::vector<std::shared_ptr<CollisionObject>>& objs,
    double cellMm) {
  WireRouteResult res{pA, pB, false, 0.0, 0.0, 999.0, 0};
  const auto& A = scene.parts[pA];
  const auto& B = scene.parts[pB];
  double dx = B.cog[0] - A.cog[0];
  double dy = B.cog[1] - A.cog[1];
  double dz = B.cog[2] - A.cog[2];
  res.straightMm = std::sqrt(dx * dx + dy * dy + dz * dz);
  if (res.straightMm < 0.1) {
    res.found = true;
    res.routedMm = res.straightMm;
    return res;
  }

  // Local bounding box covering A and B with routing corridor margin
  double pad = 12.0;
  double minX = std::min(A.bbox[0], B.bbox[0]) - pad;
  double minY = std::min(A.bbox[1], B.bbox[1]) - pad;
  double minZ = std::min(A.bbox[2], B.bbox[2]) - pad;
  double maxX = std::max(A.bbox[3], B.bbox[3]) + pad;
  double maxY = std::max(A.bbox[4], B.bbox[4]) + pad;
  double maxZ = std::max(A.bbox[5], B.bbox[5]) + pad;

  int nx = std::clamp(static_cast<int>(std::ceil((maxX - minX) / cellMm)) + 1, 6, 48);
  int ny = std::clamp(static_cast<int>(std::ceil((maxY - minY) / cellMm)) + 1, 6, 48);
  int nz = std::clamp(static_cast<int>(std::ceil((maxZ - minZ) / cellMm)) + 1, 6, 48);
  double sx = (maxX - minX) / std::max(1, nx - 1);
  double sy = (maxY - minY) / std::max(1, ny - 1);
  double sz = (maxZ - minZ) / std::max(1, nz - 1);

  auto toIdx = [&](int ix, int iy, int iz) { return (iz * ny + iy) * nx + ix; };
  auto clampCoord = [&](double v, double lo, double step, int n) {
    return std::clamp(static_cast<int>(std::llround((v - lo) / std::max(1e-6, step))), 0, n - 1);
  };

  int sxI = clampCoord(A.cog[0], minX, sx, nx);
  int syI = clampCoord(A.cog[1], minY, sy, ny);
  int szI = clampCoord(A.cog[2], minZ, sz, nz);
  int gxI = clampCoord(B.cog[0], minX, sx, nx);
  int gyI = clampCoord(B.cog[1], minY, sy, ny);
  int gzI = clampCoord(B.cog[2], minZ, sz, nz);

  // Mark solid metallic/chassis obstacles (excluding endpoints A, B and conductors/harnesses)
  std::vector<uint8_t> blocked(static_cast<size_t>(nx * ny * nz), 0);
  for (uint32_t pi = 0; pi < scene.parts.size(); ++pi) {
    if (pi == pA || pi == pB) continue;
    const auto& P = scene.parts[pi];
    if (P.flags & (tlxm::FLAG_CONDUCTOR | tlxm::FLAG_ELASTOMER)) continue;
    // Only solid metallic/structural walls block wires
    if (!(P.flags & tlxm::FLAG_CHASSIS)) continue;
    double bpad = 0.0;
    if (P.bbox[3] < minX || P.bbox[0] > maxX || P.bbox[4] < minY || P.bbox[1] > maxY || P.bbox[5] < minZ || P.bbox[2] > maxZ) {
      continue;
    }
    int x0 = clampCoord(P.bbox[0] - bpad, minX, sx, nx);
    int x1 = clampCoord(P.bbox[3] + bpad, minX, sx, nx);
    int y0 = clampCoord(P.bbox[1] - bpad, minY, sy, ny);
    int y1 = clampCoord(P.bbox[4] + bpad, minY, sy, ny);
    int z0 = clampCoord(P.bbox[2] - bpad, minZ, sz, nz);
    int z1 = clampCoord(P.bbox[5] + bpad, minZ, sz, nz);
    // Check actual FCL sphere collision at grid centers so hollow enclosures remain passable!
    auto probe = std::make_shared<fcl::Sphere<S>>(0.35);
    for (int iz = z0; iz <= z1; ++iz) {
      for (int iy = y0; iy <= y1; ++iy) {
        for (int ix = x0; ix <= x1; ++ix) {
          if (!objs[pi]) continue;
          Transform3 tf = Transform3::Identity();
          tf.translation() = Vector3(minX + ix * sx, minY + iy * sy, minZ + iz * sz);
          CollisionObject probeObj(probe, tf);
          fcl::CollisionRequest<S> req(1, false);
          fcl::CollisionResult<S> cres;
          if (fcl::collide(&probeObj, objs[pi].get(), req, cres) > 0) {
            blocked[toIdx(ix, iy, iz)] = 1;
          }
        }
      }
    }
  }
  blocked[toIdx(sxI, syI, szI)] = 0;
  blocked[toIdx(gxI, gyI, gzI)] = 0;

  // Check direct straight-line wall penetrations along segment A->B
  int straightSteps = std::max(8, static_cast<int>(res.straightMm / 1.5));
  for (int k = 1; k < straightSteps; ++k) {
    double t = static_cast<double>(k) / straightSteps;
    int ix = clampCoord(A.cog[0] + dx * t, minX, sx, nx);
    int iy = clampCoord(A.cog[1] + dy * t, minY, sy, ny);
    int iz = clampCoord(A.cog[2] + dz * t, minZ, sz, nz);
    if (blocked[toIdx(ix, iy, iz)]) res.wallPenetrations++;
  }

  // 26-connected 3D A* search
  const int total = nx * ny * nz;
  std::vector<double> gScore(total, std::numeric_limits<double>::infinity());
  std::vector<int> parent(total, -1);
  using Node = std::pair<double, int>;
  std::priority_queue<Node, std::vector<Node>, std::greater<Node>> pq;

  int startIdx = toIdx(sxI, syI, szI);
  int goalIdx = toIdx(gxI, gyI, gzI);
  gScore[startIdx] = 0.0;
  pq.push({res.straightMm, startIdx});

  auto heur = [&](int ix, int iy, int iz) {
    double ex = (ix - gxI) * sx, ey = (iy - gyI) * sy, ez = (iz - gzI) * sz;
    return std::sqrt(ex * ex + ey * ey + ez * ez);
  };

  while (!pq.empty()) {
    auto [f, u] = pq.top();
    pq.pop();
    if (u == goalIdx) {
      res.found = true;
      res.routedMm = gScore[u];
      break;
    }
    if (f > gScore[u] + res.straightMm * 4.0 + 100.0) continue;
    int iz = u / (nx * ny);
    int rem = u % (nx * ny);
    int iy = rem / nx;
    int ix = rem % nx;
    for (int dzI = -1; dzI <= 1; ++dzI) {
      int nzI = iz + dzI;
      if (nzI < 0 || nzI >= nz) continue;
      for (int dyI = -1; dyI <= 1; ++dyI) {
        int nyI = iy + dyI;
        if (nyI < 0 || nyI >= ny) continue;
        for (int dxI = -1; dxI <= 1; ++dxI) {
          if (dxI == 0 && dyI == 0 && dzI == 0) continue;
          int nxI = ix + dxI;
          if (nxI < 0 || nxI >= nx) continue;
          int v = toIdx(nxI, nyI, nzI);
          if (blocked[v]) continue;
          double stepLen = std::sqrt((dxI * sx) * (dxI * sx) + (dyI * sy) * (dyI * sy) + (dzI * sz) * (dzI * sz));
          double ng = gScore[u] + stepLen;
          if (ng < gScore[v]) {
            gScore[v] = ng;
            parent[v] = u;
            pq.push({ng + heur(nxI, nyI, nzI), v});
          }
        }
      }
    }
  }

  // Estimate minimum bend radius along reconstructed polyline
  if (res.found) {
    std::vector<Eigen::Vector3d> pts;
    for (int cur = goalIdx; cur != -1; cur = parent[cur]) {
      int iz = cur / (nx * ny);
      int rem = cur % (nx * ny);
      int iy = rem / nx;
      int ix = rem % nx;
      pts.emplace_back(minX + ix * sx, minY + iy * sy, minZ + iz * sz);
    }
    double minR = 999.0;
    for (size_t i = 1; i + 1 < pts.size(); ++i) {
      Eigen::Vector3d v1 = pts[i] - pts[i - 1];
      Eigen::Vector3d v2 = pts[i + 1] - pts[i];
      double l1 = v1.norm(), l2 = v2.norm();
      if (l1 > 1e-6 && l2 > 1e-6) {
        double cosA = std::clamp(v1.dot(v2) / (l1 * l2), -1.0, 1.0);
        double ang = std::acos(cosA);
        if (ang > 0.05) {
          double r = 0.5 * std::min(l1, l2) / std::tan(0.5 * ang);
          if (r < minR) minR = r;
        }
      }
    }
    res.minBendRadiusMm = minR;
  }
  return res;
}

} // namespace

int main(int argc, char** argv) {
  for (int i = 1; i < argc; ++i) {
    if (std::string(argv[i]) == "--version") {
      std::cout << "FCL " << FCL_MAJOR_VERSION << "." << FCL_MINOR_VERSION << "." << FCL_PATCH_VERSION << " (OBBRSS BVH + ExactDistance + CCD + 3D-A*)\n";
      return 0;
    }
  }
  if (argc < 2) {
    std::cerr << "Usage: fcl_ccd_router <scene.tlxm> [--contact-max=2.5] [--ccd] [--route] [--out=<json>]\n";
    return 1;
  }
  std::string inPath = argv[1];
  std::string outPath;
  double contactSearchMm = 2.5;
  bool runCcd = true;
  bool runRoute = true;

  for (int i = 2; i < argc; ++i) {
    std::string a = argv[i];
    if (a.rfind("--out=", 0) == 0) outPath = a.substr(6);
    else if (a.rfind("--contact-max=", 0) == 0) contactSearchMm = std::stod(a.substr(14));
    else if (a == "--no-ccd") runCcd = false;
    else if (a == "--no-route") runRoute = false;
  }

  try {
    auto scene = tlxm::loadSceneBin(inPath);
    const size_t nParts = scene.parts.size();

    // Build one FCL OBBRSS BVHModel per part from exact Float64 triangles
    std::vector<std::shared_ptr<BVHModel>> models(nParts);
    std::vector<std::shared_ptr<CollisionObject>> objs(nParts);
    std::vector<std::vector<const tlxm::MeshData*>> byPart(nParts);
    for (const auto& m : scene.meshes) {
      if (m.partIdx < nParts) byPart[m.partIdx].push_back(&m);
    }

    for (size_t i = 0; i < nParts; ++i) {
      size_t triSum = 0;
      for (const auto* m : byPart[i]) triSum += m->numTris;
      if (triSum == 0) continue;
      auto bvh = std::make_shared<BVHModel>();
      bvh->beginModel(static_cast<int>(triSum), static_cast<int>(triSum * 3));
      for (const auto* m : byPart[i]) {
        for (uint32_t t = 0; t < m->numTris; ++t) {
          const double* c = &m->coords[static_cast<size_t>(t) * 9];
          bvh->addTriangle(Vector3(c[0], c[1], c[2]), Vector3(c[3], c[4], c[5]), Vector3(c[6], c[7], c[8]));
        }
      }
      bvh->endModel();
      models[i] = bvh;
      objs[i] = std::make_shared<CollisionObject>(bvh, Transform3::Identity());
    }

    // 1. Exact pairwise collision & nearest-surface contact graph
    std::vector<CollisionRec> collisions;
    std::vector<ContactEdge> contacts;
    std::vector<double> partMinDist(nParts, 1e9);
    std::vector<int> partNearest(nParts, -1);

    // Broadphase via sorted X-axis sweep
    std::vector<uint32_t> order(nParts);
    for (size_t i = 0; i < nParts; ++i) order[i] = static_cast<uint32_t>(i);
    std::sort(order.begin(), order.end(), [&](uint32_t a, uint32_t b) {
      return scene.parts[a].bbox[0] < scene.parts[b].bbox[0];
    });

    for (size_t oi = 0; oi < nParts; ++oi) {
      uint32_t i = order[oi];
      if (!objs[i]) continue;
      double maxXi = scene.parts[i].bbox[3] + contactSearchMm;
      for (size_t oj = oi + 1; oj < nParts; ++oj) {
        uint32_t j = order[oj];
        if (scene.parts[j].bbox[0] > maxXi) break;
        if (!objs[j]) continue;
        if (!aabbOverlapPad(scene.parts[i].bbox, scene.parts[j].bbox, contactSearchMm)) continue;

        fcl::DistanceRequest<S> dreq(true, true);
        fcl::DistanceResult<S> dres;
        double d = fcl::distance(objs[i].get(), objs[j].get(), dreq, dres);
        if (d < 0.0) d = 0.0;

        if (d < partMinDist[i]) { partMinDist[i] = d; partNearest[i] = static_cast<int>(j); }
        if (d < partMinDist[j]) { partMinDist[j] = d; partNearest[j] = static_cast<int>(i); }

        if (d <= 1e-6) {
          fcl::CollisionRequest<S> creq(4, true);
          fcl::CollisionResult<S> cres;
          if (fcl::collide(objs[i].get(), objs[j].get(), creq, cres) > 0) {
            std::vector<fcl::Contact<S>> cvec;
            cres.getContacts(cvec);
            double maxPen = 0.0;
            CollisionRec rec{i, j, 0.0, {0, 0, 0}, {0, 1, 0}};
            for (const auto& ct : cvec) {
              double pen = std::abs(ct.penetration_depth);
              if (pen >= maxPen) {
                maxPen = pen;
                rec.penDepth = pen;
                rec.pos[0] = ct.pos[0]; rec.pos[1] = ct.pos[1]; rec.pos[2] = ct.pos[2];
                rec.normal[0] = ct.normal[0]; rec.normal[1] = ct.normal[1]; rec.normal[2] = ct.normal[2];
              }
            }
            if (rec.penDepth > 0.001) {
              collisions.push_back(rec);
            }
          }
        }

        if (d <= contactSearchMm) {
          Eigen::Vector3d pA = dres.nearest_points[0];
          Eigen::Vector3d pB = dres.nearest_points[1];
          Eigen::Vector3d nv = pB - pA;
          double nl = nv.norm();
          if (nl > 1e-9) nv /= nl; else nv = Eigen::Vector3d(0, 1, 0);
          contacts.push_back(ContactEdge{
            i, j, d,
            {pA[0], pA[1], pA[2]},
            {pB[0], pB[1], pB[2]},
            {nv[0], nv[1], nv[2]}
          });
        }
      }
    }

    // Second pass: for any isolated part with no neighbor within contactSearchMm, find its true global nearest neighbor
    for (size_t i = 0; i < nParts; ++i) {
      if (!objs[i] || partNearest[i] != -1) continue;
      double bestLb = 1e9;
      std::vector<std::pair<double, uint32_t>> cands;
      cands.reserve(nParts);
      for (size_t j = 0; j < nParts; ++j) {
        if (i == j || !objs[j]) continue;
        cands.emplace_back(aabbMinDist(scene.parts[i].bbox, scene.parts[j].bbox), static_cast<uint32_t>(j));
      }
      std::sort(cands.begin(), cands.end());
      for (const auto& [lb, j] : cands) {
        if (lb > bestLb) break;
        fcl::DistanceRequest<S> dreq(true, true);
        fcl::DistanceResult<S> dres;
        double d = std::max(0.0, fcl::distance(objs[i].get(), objs[j].get(), dreq, dres));
        if (d < bestLb) {
          bestLb = d;
          partMinDist[i] = d;
          partNearest[i] = static_cast<int>(j);
        }
      }
      if (partNearest[i] >= 0) {
        uint32_t j = static_cast<uint32_t>(partNearest[i]);
        fcl::DistanceRequest<S> dreq(true, true);
        fcl::DistanceResult<S> dres;
        double d = std::max(0.0, fcl::distance(objs[i].get(), objs[j].get(), dreq, dres));
        Eigen::Vector3d pA = dres.nearest_points[0], pB = dres.nearest_points[1];
        Eigen::Vector3d nv = pB - pA;
        double nl = nv.norm();
        if (nl > 1e-9) nv /= nl; else nv = Eigen::Vector3d(0, 1, 0);
        contacts.push_back(ContactEdge{
          static_cast<uint32_t>(i), j, d,
          {pA[0], pA[1], pA[2]}, {pB[0], pB[1], pB[2]}, {nv[0], nv[1], nv[2]}
        });
      }
    }

    // 2. Continuous Collision Detection (CCD) along explode vectors (t in [0.05, 1.0])
    std::vector<CcdHit> ccdHits;
    if (runCcd) {
      // Check pairwise relative linear explode sweeps for parts that have non-zero explode vectors
      for (size_t i = 0; i < nParts; ++i) {
        if (!objs[i]) continue;
        const auto& pi = scene.parts[i];
        double eiNorm = std::sqrt(pi.explodeVec[0]*pi.explodeVec[0] + pi.explodeVec[1]*pi.explodeVec[1] + pi.explodeVec[2]*pi.explodeVec[2]);
        if (eiNorm < 0.5) continue;
        // Swept AABB of i
        double sweptI[6] = {
          std::min(pi.bbox[0], pi.bbox[0] + pi.explodeVec[0]),
          std::min(pi.bbox[1], pi.bbox[1] + pi.explodeVec[1]),
          std::min(pi.bbox[2], pi.bbox[2] + pi.explodeVec[2]),
          std::max(pi.bbox[3], pi.bbox[3] + pi.explodeVec[0]),
          std::max(pi.bbox[4], pi.bbox[4] + pi.explodeVec[1]),
          std::max(pi.bbox[5], pi.bbox[5] + pi.explodeVec[2]),
        };
        for (size_t j = i + 1; j < nParts; ++j) {
          if (!objs[j]) continue;
          const auto& pj = scene.parts[j];
          double sweptJ[6] = {
            std::min(pj.bbox[0], pj.bbox[0] + pj.explodeVec[0]),
            std::min(pj.bbox[1], pj.bbox[1] + pj.explodeVec[1]),
            std::min(pj.bbox[2], pj.bbox[2] + pj.explodeVec[2]),
            std::max(pj.bbox[3], pj.bbox[3] + pj.explodeVec[0]),
            std::max(pj.bbox[4], pj.bbox[4] + pj.explodeVec[1]),
            std::max(pj.bbox[5], pj.bbox[5] + pj.explodeVec[2]),
          };
          if (!aabbOverlapPad(sweptI, sweptJ, 0.01)) continue;
          // Skip identical explode vector pairs (co-moving sub-assembly)
          double relX = pi.explodeVec[0] - pj.explodeVec[0];
          double relY = pi.explodeVec[1] - pj.explodeVec[1];
          double relZ = pi.explodeVec[2] - pj.explodeVec[2];
          if (relX*relX + relY*relY + relZ*relZ < 0.25) continue;

          // Sample start slightly past t=0.05 to distinguish already-seated contact from true sweep penetration
          Transform3 tf1Start = Transform3::Identity();
          tf1Start.translation() = Vector3(pi.explodeVec[0] * 0.05, pi.explodeVec[1] * 0.05, pi.explodeVec[2] * 0.05);
          Transform3 tf1Goal = Transform3::Identity();
          tf1Goal.translation() = Vector3(pi.explodeVec[0], pi.explodeVec[1], pi.explodeVec[2]);

          Transform3 tf2Start = Transform3::Identity();
          tf2Start.translation() = Vector3(pj.explodeVec[0] * 0.05, pj.explodeVec[1] * 0.05, pj.explodeVec[2] * 0.05);
          Transform3 tf2Goal = Transform3::Identity();
          tf2Goal.translation() = Vector3(pj.explodeVec[0], pj.explodeVec[1], pj.explodeVec[2]);

          CollisionObject o1(models[i], tf1Start);
          CollisionObject o2(models[j], tf2Start);
          fcl::ContinuousCollisionRequest<S> ccdReq;
          ccdReq.num_max_iterations = 10;
          ccdReq.toc_err = 0.01;
          fcl::ContinuousCollisionResult<S> ccdRes;
          fcl::continuousCollide(&o1, tf1Goal, &o2, tf2Goal, ccdReq, ccdRes);
          if (ccdRes.is_collide && ccdRes.time_of_contact > 0.02 && ccdRes.time_of_contact < 0.99) {
            ccdHits.push_back(CcdHit{static_cast<uint32_t>(i), static_cast<uint32_t>(j), ccdRes.time_of_contact});
            if (ccdHits.size() >= 64) break;
          }
        }
        if (ccdHits.size() >= 64) break;
      }
    }

    // 3. 3D Obstacle-Avoiding Harness Routing between electronic/PCB/heat-source endpoints
    std::vector<WireRouteResult> routes;
    if (runRoute) {
      std::vector<uint32_t> pcbs, nodes;
      for (size_t i = 0; i < nParts; ++i) {
        if (scene.parts[i].flags & tlxm::FLAG_PCB) pcbs.push_back(static_cast<uint32_t>(i));
        else if (scene.parts[i].flags & (tlxm::FLAG_HEAT_SOURCE | tlxm::FLAG_CONDUCTOR)) nodes.push_back(static_cast<uint32_t>(i));
      }
      if (!pcbs.empty()) {
        uint32_t hub = pcbs[0];
        size_t maxPairs = std::min<size_t>(12, pcbs.size() - 1 + nodes.size());
        size_t done = 0;
        for (size_t k = 1; k < pcbs.size() && done < maxPairs; ++k, ++done) {
          routes.push_back(routeWire3D(hub, pcbs[k], scene, objs, 3.0));
        }
        for (size_t k = 0; k < nodes.size() && done < maxPairs; ++k, ++done) {
          routes.push_back(routeWire3D(hub, nodes[k], scene, objs, 3.0));
        }
      }
    }

    // Emit deterministic JSON
    std::ostringstream oss;
    oss << "{\n";
    oss << "  \"solver\": \"FCL_" << FCL_MAJOR_VERSION << "." << FCL_MINOR_VERSION << "." << FCL_PATCH_VERSION << "\",\n";
    oss << "  \"partCount\": " << nParts << ",\n";
    oss << "  \"collisionCount\": " << collisions.size() << ",\n";
    oss << "  \"contactEdgeCount\": " << contacts.size() << ",\n";
    oss << "  \"ccdHitCount\": " << ccdHits.size() << ",\n";
    oss << "  \"collisions\": [\n";
    for (size_t i = 0; i < collisions.size(); ++i) {
      const auto& c = collisions[i];
      oss << "    {\"a\":" << c.a << ",\"b\":" << c.b
          << ",\"penMm\":" << tlxm::fmtNum(c.penDepth, 5)
          << ",\"pos\":[" << tlxm::fmtNum(c.pos[0], 3) << "," << tlxm::fmtNum(c.pos[1], 3) << "," << tlxm::fmtNum(c.pos[2], 3) << "]"
          << ",\"n\":[" << tlxm::fmtNum(c.normal[0], 4) << "," << tlxm::fmtNum(c.normal[1], 4) << "," << tlxm::fmtNum(c.normal[2], 4) << "]}"
          << (i + 1 < collisions.size() ? ",\n" : "\n");
    }
    oss << "  ],\n";
    oss << "  \"partMinDist\": [";
    for (size_t i = 0; i < nParts; ++i) {
      oss << "{\"p\":" << i << ",\"d\":" << tlxm::fmtNum(partMinDist[i] > 1e8 ? -1.0 : partMinDist[i], 5)
          << ",\"near\":" << partNearest[i] << "}" << (i + 1 < nParts ? "," : "");
    }
    oss << "],\n";
    oss << "  \"contacts\": [\n";
    for (size_t i = 0; i < contacts.size(); ++i) {
      const auto& e = contacts[i];
      oss << "    {\"a\":" << e.a << ",\"b\":" << e.b
          << ",\"d\":" << tlxm::fmtNum(e.distMm, 5)
          << ",\"pA\":[" << tlxm::fmtNum(e.pA[0], 3) << "," << tlxm::fmtNum(e.pA[1], 3) << "," << tlxm::fmtNum(e.pA[2], 3) << "]"
          << ",\"pB\":[" << tlxm::fmtNum(e.pB[0], 3) << "," << tlxm::fmtNum(e.pB[1], 3) << "," << tlxm::fmtNum(e.pB[2], 3) << "]"
          << ",\"n\":[" << tlxm::fmtNum(e.normal[0], 4) << "," << tlxm::fmtNum(e.normal[1], 4) << "," << tlxm::fmtNum(e.normal[2], 4) << "]}"
          << (i + 1 < contacts.size() ? ",\n" : "\n");
    }
    oss << "  ],\n";
    oss << "  \"ccdHits\": [";
    for (size_t i = 0; i < ccdHits.size(); ++i) {
      oss << "{\"a\":" << ccdHits[i].movingPart << ",\"b\":" << ccdHits[i].blockerPart
          << ",\"toc\":" << tlxm::fmtNum(ccdHits[i].toc, 4) << "}" << (i + 1 < ccdHits.size() ? "," : "");
    }
    oss << "],\n";
    oss << "  \"wireRoutes\": [";
    for (size_t i = 0; i < routes.size(); ++i) {
      const auto& r = routes[i];
      oss << "{\"a\":" << r.partA << ",\"b\":" << r.partB
          << ",\"ok\":" << (r.found ? "true" : "false")
          << ",\"straightMm\":" << tlxm::fmtNum(r.straightMm, 2)
          << ",\"routedMm\":" << tlxm::fmtNum(r.routedMm, 2)
          << ",\"minBendR\":" << tlxm::fmtNum(r.minBendRadiusMm, 2)
          << ",\"wallPen\":" << r.wallPenetrations << "}"
          << (i + 1 < routes.size() ? "," : "");
    }
    oss << "]\n}\n";

    if (!outPath.empty()) {
      std::ofstream out(outPath);
      out << oss.str();
    } else {
      std::cout << oss.str();
    }
    return 0;
  } catch (const std::exception& e) {
    std::cerr << "{\"error\":\"" << e.what() << "\"}\n";
    return 1;
  }
}
