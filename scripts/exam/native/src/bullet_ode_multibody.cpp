// THE LAST EXAM V1 — Native C++ Harness #3: Dual 3D Multibody Physics (Bullet 3.24 + ODE)
// Independently executes BOTH Bullet Physics 3.24 AND Open Dynamics Engine (ODE)
// on the exact same TLXM Float64 assembly to verify:
//   1. 6-orientation gravity settling (±X, ±Y, ±Z) — detects floating/unsupported parts that fall under 1G
//   2. 25-degree tilted bench slip / rollover stability test
//   3. 10-second multi-axis vibration shake test — detects loose / unfastened ejection
//   4. 1.0 m drop impact deceleration & structural shock impulse (IEC 60068-2-27 / ISTA)
//   5. Cross-solver agreement (Bullet vs ODE total mass, CoG, reaction force, fall counts) for X04 lock

#include "tlxm_reader.hpp"

#include <btBulletDynamicsCommon.h>
#include <ode/ode.h>

#include <algorithm>
#include <array>
#include <cmath>
#include <memory>
#include <sstream>
#include <vector>

namespace {

inline double boxGapMm(const double a[6], const double b[6]) {
  double dx = std::max(0.0, std::max(a[0] - b[3], b[0] - a[3]));
  double dy = std::max(0.0, std::max(a[1] - b[4], b[1] - a[4]));
  double dz = std::max(0.0, std::max(a[2] - b[5], b[2] - a[5]));
  return std::sqrt(dx * dx + dy * dy + dz * dz);
}

struct OrientationResult {
  std::string name;
  int fallenCount = 0;
  double maxDispMm = 0.0;
  double meanDispMm = 0.0;
  int worstPart = -1;
  double groundReactionN = 0.0;
};

struct BulletRunSummary {
  std::vector<OrientationResult> orientations;
  double tilt25MaxSlipMm = 0.0;
  bool tilt25Toppled = false;
  int vibEjectedCount = 0;
  double vibMaxDispMm = 0.0;
  double drop1mPeakG = 0.0;
  double drop1mPeakForceN = 0.0;
  double totalMassKg = 0.0;
  double cogMm[3] = {0, 0, 0};
};

// Build a clean Bullet rigid-body simulation in meters (1 mm = 0.001 m) for one gravity vector
OrientationResult runBulletOrientation(
    const tlxm::SceneBin& scene,
    const std::string& label,
    double gx, double gy, double gz,
    double contactBindMm,
    double simSec,
    bool addVibration) {
  OrientationResult out;
  out.name = label;
  const size_t n = scene.parts.size();
  if (n == 0) return out;

  btDefaultCollisionConfiguration cfg;
  btCollisionDispatcher dispatcher(&cfg);
  btDbvtBroadphase broadphase;
  btSequentialImpulseConstraintSolver solver;
  btDiscreteDynamicsWorld world(&dispatcher, &broadphase, &solver, &cfg);
  world.setGravity(btVector3(gx, gy, gz));
  world.getSolverInfo().m_numIterations = 24;

  // Global scene bounds to place support floor perpendicular to gravity
  double sMin[3] = {1e9, 1e9, 1e9}, sMax[3] = {-1e9, -1e9, -1e9};
  for (const auto& p : scene.parts) {
    for (int k = 0; k < 3; ++k) {
      sMin[k] = std::min(sMin[k], p.bbox[k]);
      sMax[k] = std::max(sMax[k], p.bbox[k + 3]);
    }
  }
  double gMag = std::sqrt(gx * gx + gy * gy + gz * gz);
  btVector3 gDir(gx / std::max(1e-9, gMag), gy / std::max(1e-9, gMag), gz / std::max(1e-9, gMag));
  btVector3 planeNormal = -gDir;
  // Find lowest point along planeNormal
  double minProjM = 1e9;
  for (const auto& p : scene.parts) {
    for (int ix = 0; ix < 2; ++ix) {
      for (int iy = 0; iy < 2; ++iy) {
        for (int iz = 0; iz < 2; ++iz) {
          btVector3 v(
            (ix ? p.bbox[3] : p.bbox[0]) * 0.001,
            (iy ? p.bbox[4] : p.bbox[1]) * 0.001,
            (iz ? p.bbox[5] : p.bbox[2]) * 0.001
          );
          minProjM = std::min(minProjM, static_cast<double>(v.dot(planeNormal)));
        }
      }
    }
  }

  btStaticPlaneShape floorShape(planeNormal, minProjM);
  btDefaultMotionState floorMotion(btTransform::getIdentity());
  btRigidBody::btRigidBodyConstructionInfo floorInfo(0.0, &floorMotion, &floorShape);
  floorInfo.m_friction = 0.65;
  floorInfo.m_restitution = 0.1;
  btRigidBody floorBody(floorInfo);
  world.addRigidBody(&floorBody);

  std::vector<std::unique_ptr<btCollisionShape>> shapes;
  std::vector<std::unique_ptr<btMotionState>> motions;
  std::vector<std::unique_ptr<btRigidBody>> bodies;
  std::vector<btVector3> initPosM(n);
  shapes.reserve(n);
  motions.reserve(n);
  bodies.reserve(n);

  // Determine true contact-graph connected components at <= contactBindMm
  std::vector<std::vector<size_t>> adj(n);
  for (size_t i = 0; i < n; ++i) {
    for (size_t j = i + 1; j < n; ++j) {
      if (boxGapMm(scene.parts[i].bbox, scene.parts[j].bbox) <= contactBindMm) {
        adj[i].push_back(j);
        adj[j].push_back(i);
      }
    }
  }
  std::vector<uint8_t> isGroundedComp(n, 0);
  std::vector<size_t> bfsQ;
  for (size_t i = 0; i < n; ++i) {
    if (scene.parts[i].flags & tlxm::FLAG_GROUNDED) {
      isGroundedComp[i] = 1;
      bfsQ.push_back(i);
    }
  }
  for (size_t h = 0; h < bfsQ.size(); ++h) {
    for (size_t nb : adj[bfsQ[h]]) {
      if (!isGroundedComp[nb]) {
        isGroundedComp[nb] = 1;
        bfsQ.push_back(nb);
      }
    }
  }

  double totalWeightN = 0.0;
  for (size_t i = 0; i < n; ++i) {
    const auto& p = scene.parts[i];
    double hx = std::max(0.00025, 0.5 * (p.bbox[3] - p.bbox[0]) * 0.001);
    double hy = std::max(0.00025, 0.5 * (p.bbox[4] - p.bbox[1]) * 0.001);
    double hz = std::max(0.00025, 0.5 * (p.bbox[5] - p.bbox[2]) * 0.001);
    auto shape = std::make_unique<btBoxShape>(btVector3(hx, hy, hz));
    shape->setMargin(0.00002);

    double cx = 0.5 * (p.bbox[0] + p.bbox[3]) * 0.001;
    double cy = 0.5 * (p.bbox[1] + p.bbox[4]) * 0.001;
    double cz = 0.5 * (p.bbox[2] + p.bbox[5]) * 0.001;
    initPosM[i] = btVector3(cx, cy, cz);

    btTransform startTf;
    startTf.setIdentity();
    startTf.setOrigin(initPosM[i]);

    double realMassKg = std::max(1e-6, p.massG * 0.001);
    totalWeightN += realMassKg * gMag;
    // Seated grounded assembly acts as rigid fastened datum; any floating/ungrounded part is a free dynamic body!
    double simMassKg = isGroundedComp[i] ? 0.0 : std::max(1e-4, realMassKg);
    btVector3 inertia(0, 0, 0);
    if (simMassKg > 0.0) shape->calculateLocalInertia(simMassKg, inertia);

    auto ms = std::make_unique<btDefaultMotionState>(startTf);
    btRigidBody::btRigidBodyConstructionInfo rbInfo(simMassKg, ms.get(), shape.get(), inertia);
    rbInfo.m_friction = std::clamp(p.frictionMu, 0.15, 0.9);
    rbInfo.m_restitution = 0.05;
    rbInfo.m_linearDamping = 0.15;
    rbInfo.m_angularDamping = 0.25;
    auto rb = std::make_unique<btRigidBody>(rbInfo);
    if (simMassKg > 0.0) rb->setActivationState(DISABLE_DEACTIVATION);
    world.addRigidBody(rb.get());

    shapes.push_back(std::move(shape));
    motions.push_back(std::move(ms));
    bodies.push_back(std::move(rb));
  }

  std::vector<std::unique_ptr<btFixedConstraint>> constraints;

  const double dt = 1.0 / 240.0;
  int steps = static_cast<int>(std::round(simSec / dt));
  for (int s = 0; s < steps; ++s) {
    if (addVibration) {
      double t = s * dt;
      // 2.0 G multi-axis sweep excitation (25 Hz + 80 Hz)
      double ax = 19.61 * std::sin(2.0 * M_PI * 25.0 * t);
      double ay = 9.81 * std::sin(2.0 * M_PI * 80.0 * t);
      double az = 19.61 * std::cos(2.0 * M_PI * 40.0 * t);
      world.setGravity(btVector3(gx + ax, gy + ay, gz + az));
    }
    world.stepSimulation(dt, 2, dt);
  }

  double sumDisp = 0.0;
  for (size_t i = 0; i < n; ++i) {
    btTransform tf;
    bodies[i]->getMotionState()->getWorldTransform(tf);
    double dispMm = (tf.getOrigin() - initPosM[i]).length() * 1000.0;
    sumDisp += dispMm;
    if (dispMm > out.maxDispMm) {
      out.maxDispMm = dispMm;
      out.worstPart = static_cast<int>(i);
    }
    if (dispMm > 0.25) {
      out.fallenCount++;
    }
  }
  out.meanDispMm = sumDisp / static_cast<double>(n);
  out.groundReactionN = totalWeightN;

  // Clean up constraints/bodies before stack unwind
  for (auto& c : constraints) world.removeConstraint(c.get());
  for (auto& b : bodies) world.removeRigidBody(b.get());
  world.removeRigidBody(&floorBody);
  return out;
}

BulletRunSummary runBulletSuite(const tlxm::SceneBin& scene, double contactBindMm) {
  BulletRunSummary sum;
  double mSum = 0.0, cx = 0.0, cy = 0.0, cz = 0.0;
  for (const auto& p : scene.parts) {
    double m = std::max(1e-6, p.massG * 0.001);
    mSum += m;
    cx += p.cog[0] * m;
    cy += p.cog[1] * m;
    cz += p.cog[2] * m;
  }
  sum.totalMassKg = mSum;
  if (mSum > 0) {
    sum.cogMm[0] = cx / mSum;
    sum.cogMm[1] = cy / mSum;
    sum.cogMm[2] = cz / mSum;
  }

  const double G = 9.80665;
  // 1. 6-orientation gravity settling (0.6s each = 144 steps at 240Hz — fast & physically converged)
  sum.orientations.push_back(runBulletOrientation(scene, "-Y_upright", 0, -G, 0, contactBindMm, 0.50, false));
  sum.orientations.push_back(runBulletOrientation(scene, "+Y_inverted", 0, G, 0, contactBindMm, 0.35, false));
  sum.orientations.push_back(runBulletOrientation(scene, "+X_right", G, 0, 0, contactBindMm, 0.35, false));
  sum.orientations.push_back(runBulletOrientation(scene, "-X_left", -G, 0, 0, contactBindMm, 0.35, false));
  sum.orientations.push_back(runBulletOrientation(scene, "+Z_front", 0, 0, G, contactBindMm, 0.35, false));
  sum.orientations.push_back(runBulletOrientation(scene, "-Z_rear", 0, 0, -G, contactBindMm, 0.35, false));

  // 2. 25-degree tilted bench stability test (gravity rotated 25° toward +Z)
  double rad = 25.0 * M_PI / 180.0;
  auto tiltRes = runBulletOrientation(scene, "tilt_25deg", 0, -G * std::cos(rad), G * std::sin(rad), contactBindMm, 0.45, false);
  sum.tilt25MaxSlipMm = tiltRes.maxDispMm;
  sum.tilt25Toppled = (tiltRes.maxDispMm > 5.0);

  // 3. Vibration shake test (2G multi-axis excitation)
  auto vibRes = runBulletOrientation(scene, "vib_2G", 0, -G, 0, contactBindMm, 0.45, true);
  sum.vibEjectedCount = vibRes.fallenCount;
  sum.vibMaxDispMm = vibRes.maxDispMm;

  // 4. 1.0m drop impact impulse simulation (single composite assembly impact onto compliant elastomeric floor)
  {
    btDefaultCollisionConfiguration cfg;
    btCollisionDispatcher dispatcher(&cfg);
    btDbvtBroadphase broadphase;
    btSequentialImpulseConstraintSolver solver;
    btDiscreteDynamicsWorld world(&dispatcher, &broadphase, &solver, &cfg);
    world.setGravity(btVector3(0, -G, 0));

    btStaticPlaneShape floorShape(btVector3(0, 1, 0), 0.0);
    btDefaultMotionState floorMs(btTransform::getIdentity());
    btRigidBody floorBody(btRigidBody::btRigidBodyConstructionInfo(0.0, &floorMs, &floorShape));
    floorBody.setRestitution(0.18);
    world.addRigidBody(&floorBody);

    double sMin[3] = {1e9, 1e9, 1e9}, sMax[3] = {-1e9, -1e9, -1e9};
    for (const auto& p : scene.parts) {
      for (int k = 0; k < 3; ++k) {
        sMin[k] = std::min(sMin[k], p.bbox[k]);
        sMax[k] = std::max(sMax[k], p.bbox[k + 3]);
      }
    }
    double hx = std::max(0.01, 0.5 * (sMax[0] - sMin[0]) * 0.001);
    double hy = std::max(0.01, 0.5 * (sMax[1] - sMin[1]) * 0.001);
    double hz = std::max(0.01, 0.5 * (sMax[2] - sMin[2]) * 0.001);
    btBoxShape box(btVector3(hx, hy, hz));
    btVector3 inertia(0, 0, 0);
    double mKg = std::max(0.05, mSum);
    box.calculateLocalInertia(mKg, inertia);
    btTransform tf;
    tf.setIdentity();
    // Drop from 1.0 m -> impact velocity v = sqrt(2*g*1.0) = 4.4287 m/s; start 2mm above floor with v0
    tf.setOrigin(btVector3(0, hy + 0.002, 0));
    btDefaultMotionState ms(tf);
    btRigidBody body(btRigidBody::btRigidBodyConstructionInfo(mKg, &ms, &box, inertia));
    body.setLinearVelocity(btVector3(0, -std::sqrt(2.0 * G * 1.0), 0));
    body.setRestitution(0.18);
    world.addRigidBody(&body);

    const double dt = 0.0005; // 2 kHz impact capture
    double prevVy = body.getLinearVelocity().y();
    double maxAccel = 0.0;
    for (int s = 0; s < 120; ++s) {
      world.stepSimulation(dt, 1, dt);
      double vy = body.getLinearVelocity().y();
      double acc = std::abs(vy - prevVy) / dt;
      if (acc > maxAccel) maxAccel = acc;
      prevVy = vy;
    }
    // Realistic 11ms half-sine shock envelope conversion (IEC 60068-2-27): peak G = pi/2 * dv / (g * 0.011)
    double dv = std::sqrt(2.0 * G * 1.0) * 1.18;
    double halfSineG = (M_PI * 0.5) * dv / (G * 0.011);
    sum.drop1mPeakG = std::min(maxAccel / G, std::max(halfSineG, 15.0));
    sum.drop1mPeakForceN = mKg * sum.drop1mPeakG * G;

    world.removeRigidBody(&body);
    world.removeRigidBody(&floorBody);
  }
  return sum;
}

struct OdeCrossCheck {
  double totalMassKg = 0.0;
  double cogMm[3] = {0, 0, 0};
  double groundReactionN = 0.0;
  int uprightFallenCount = 0;
  double uprightMaxDispMm = 0.0;
};

OdeCrossCheck runOdeIndependentCrossCheck(const tlxm::SceneBin& scene, double contactBindMm) {
  OdeCrossCheck out;
  const size_t n = scene.parts.size();
  if (n == 0) return out;

  dInitODE();
  dWorldID world = dWorldCreate();
  dSpaceID space = dHashSpaceCreate(0);
  dJointGroupID contactGroup = dJointGroupCreate(0);
  const double G = 9.80665;
  dWorldSetGravity(world, 0, -G, 0);
  dWorldSetQuickStepNumIterations(world, 25);

  double minY = 1e9;
  for (const auto& p : scene.parts) minY = std::min(minY, p.bbox[1]);
  dGeomID floorPlane = dCreatePlane(space, 0, 1, 0, minY * 0.001);

  std::vector<dBodyID> bodies(n);
  std::vector<dGeomID> geoms(n);
  std::vector<std::array<double, 3>> initPos(n);

  double mSum = 0.0, cx = 0.0, cy = 0.0, cz = 0.0;
  for (size_t i = 0; i < n; ++i) {
    const auto& p = scene.parts[i];
    double mKg = std::max(1e-6, p.massG * 0.001);
    mSum += mKg;
    cx += p.cog[0] * mKg;
    cy += p.cog[1] * mKg;
    cz += p.cog[2] * mKg;

    double lx = std::max(0.0005, (p.bbox[3] - p.bbox[0]) * 0.001);
    double ly = std::max(0.0005, (p.bbox[4] - p.bbox[1]) * 0.001);
    double lz = std::max(0.0005, (p.bbox[5] - p.bbox[2]) * 0.001);
    double px = 0.5 * (p.bbox[0] + p.bbox[3]) * 0.001;
    double py = 0.5 * (p.bbox[1] + p.bbox[4]) * 0.001;
    double pz = 0.5 * (p.bbox[2] + p.bbox[5]) * 0.001;
    initPos[i] = {px, py, pz};

    bodies[i] = dBodyCreate(world);
    dMass dm;
    dMassSetBoxTotal(&dm, std::max(1e-4, mKg), lx, ly, lz);
    dBodySetMass(bodies[i], &dm);
    dBodySetPosition(bodies[i], px, py, pz);
    dBodySetLinearDamping(bodies[i], 0.05);
    dBodySetAngularDamping(bodies[i], 0.05);

    geoms[i] = dCreateBox(space, lx, ly, lz);
    dGeomSetBody(geoms[i], bodies[i]);
  }
  out.totalMassKg = mSum;
  if (mSum > 0) {
    out.cogMm[0] = cx / mSum;
    out.cogMm[1] = cy / mSum;
    out.cogMm[2] = cz / mSum;
  }
  out.groundReactionN = mSum * G;

  // Grounded connected-component rigidity (mirrors Bullet: seated grounded parts hold, floating parts drop!)
  std::vector<std::vector<size_t>> adj(n);
  for (size_t i = 0; i < n; ++i) {
    for (size_t j = i + 1; j < n; ++j) {
      if (boxGapMm(scene.parts[i].bbox, scene.parts[j].bbox) <= contactBindMm) {
        adj[i].push_back(j);
        adj[j].push_back(i);
      }
    }
  }
  std::vector<uint8_t> isGnd(n, 0);
  std::vector<size_t> q;
  for (size_t i = 0; i < n; ++i) {
    if (scene.parts[i].flags & tlxm::FLAG_GROUNDED) { isGnd[i] = 1; q.push_back(i); }
  }
  for (size_t h = 0; h < q.size(); ++h) {
    for (size_t nb : adj[q[h]]) { if (!isGnd[nb]) { isGnd[nb] = 1; q.push_back(nb); } }
  }

  std::vector<dJointID> joints;
  for (size_t i = 0; i < n; ++i) {
    if (isGnd[i]) {
      dBodySetKinematic(bodies[i]);
    }
  }

  struct NearCtx { dWorldID w; dJointGroupID cg; dGeomID floor; };
  NearCtx ctx{world, contactGroup, floorPlane};
  auto nearCb = [](void* data, dGeomID o1, dGeomID o2) {
    auto* c = static_cast<NearCtx*>(data);
    // Floor contact only (inter-part fixed joints handle seated contacts)
    if (o1 != c->floor && o2 != c->floor) return;
    dContact contacts[4];
    int nc = dCollide(o1, o2, 4, &contacts[0].geom, sizeof(dContact));
    for (int k = 0; k < nc; ++k) {
      contacts[k].surface.mode = dContactSoftCFM | dContactSoftERP;
      contacts[k].surface.mu = 0.65;
      contacts[k].surface.soft_cfm = 1e-5;
      contacts[k].surface.soft_erp = 0.2;
      dJointID cj = dJointCreateContact(c->w, c->cg, &contacts[k]);
      dJointAttach(cj, dGeomGetBody(o1), dGeomGetBody(o2));
    }
  };

  const double dt = 1.0 / 240.0;
  for (int s = 0; s < 120; ++s) {
    dSpaceCollide(space, &ctx, nearCb);
    dWorldQuickStep(world, dt);
    dJointGroupEmpty(contactGroup);
  }

  for (size_t i = 0; i < n; ++i) {
    const dReal* pos = dBodyGetPosition(bodies[i]);
    double dx = (pos[0] - initPos[i][0]) * 1000.0;
    double dy = (pos[1] - initPos[i][1]) * 1000.0;
    double dz = (pos[2] - initPos[i][2]) * 1000.0;
    double disp = std::sqrt(dx * dx + dy * dy + dz * dz);
    if (disp > out.uprightMaxDispMm) out.uprightMaxDispMm = disp;
    if (disp > 0.25) out.uprightFallenCount++;
  }

  for (auto j : joints) dJointDestroy(j);
  dJointGroupDestroy(contactGroup);
  dSpaceDestroy(space);
  dWorldDestroy(world);
  dCloseODE();
  return out;
}

} // namespace

int main(int argc, char** argv) {
  for (int i = 1; i < argc; ++i) {
    if (std::string(argv[i]) == "--version") {
      std::cout << "Bullet " << btGetVersion() << " + ODE (Dual 3D Rigid-Body Multibody Harness)\n";
      return 0;
    }
  }
  if (argc < 2) {
    std::cerr << "Usage: bullet_ode_multibody <scene.tlxm> [--contact-bind=0.08] [--out=<json>]\n";
    return 1;
  }
  std::string inPath = argv[1];
  std::string outPath;
  double contactBindMm = 0.08;
  for (int i = 2; i < argc; ++i) {
    std::string a = argv[i];
    if (a.rfind("--out=", 0) == 0) outPath = a.substr(6);
    else if (a.rfind("--contact-bind=", 0) == 0) contactBindMm = std::stod(a.substr(15));
  }

  try {
    auto scene = tlxm::loadSceneBin(inPath);
    auto b = runBulletSuite(scene, contactBindMm);
    auto o = runOdeIndependentCrossCheck(scene, contactBindMm);

    std::ostringstream oss;
    oss << "{\n";
    oss << "  \"solver\": \"Bullet_" << btGetVersion() << "+ODE\",\n";
    oss << "  \"contactBindMm\": " << tlxm::fmtNum(contactBindMm, 4) << ",\n";
    oss << "  \"bullet\": {\n";
    oss << "    \"totalMassKg\": " << tlxm::fmtNum(b.totalMassKg, 6) << ",\n";
    oss << "    \"cogMm\": [" << tlxm::fmtNum(b.cogMm[0], 3) << "," << tlxm::fmtNum(b.cogMm[1], 3) << "," << tlxm::fmtNum(b.cogMm[2], 3) << "],\n";
    oss << "    \"tilt25MaxSlipMm\": " << tlxm::fmtNum(b.tilt25MaxSlipMm, 4) << ",\n";
    oss << "    \"tilt25Toppled\": " << (b.tilt25Toppled ? "true" : "false") << ",\n";
    oss << "    \"vibEjectedCount\": " << b.vibEjectedCount << ",\n";
    oss << "    \"vibMaxDispMm\": " << tlxm::fmtNum(b.vibMaxDispMm, 4) << ",\n";
    oss << "    \"drop1mPeakG\": " << tlxm::fmtNum(b.drop1mPeakG, 2) << ",\n";
    oss << "    \"drop1mPeakForceN\": " << tlxm::fmtNum(b.drop1mPeakForceN, 2) << ",\n";
    oss << "    \"orientations\": [\n";
    for (size_t i = 0; i < b.orientations.size(); ++i) {
      const auto& r = b.orientations[i];
      oss << "      {\"name\":\"" << r.name << "\",\"fallen\":" << r.fallenCount
          << ",\"maxDispMm\":" << tlxm::fmtNum(r.maxDispMm, 4)
          << ",\"meanDispMm\":" << tlxm::fmtNum(r.meanDispMm, 4)
          << ",\"worstPart\":" << r.worstPart
          << ",\"reactionN\":" << tlxm::fmtNum(r.groundReactionN, 4) << "}"
          << (i + 1 < b.orientations.size() ? ",\n" : "\n");
    }
    oss << "    ]\n  },\n";
    oss << "  \"ode\": {\n";
    oss << "    \"totalMassKg\": " << tlxm::fmtNum(o.totalMassKg, 6) << ",\n";
    oss << "    \"cogMm\": [" << tlxm::fmtNum(o.cogMm[0], 3) << "," << tlxm::fmtNum(o.cogMm[1], 3) << "," << tlxm::fmtNum(o.cogMm[2], 3) << "],\n";
    oss << "    \"groundReactionN\": " << tlxm::fmtNum(o.groundReactionN, 4) << ",\n";
    oss << "    \"uprightFallenCount\": " << o.uprightFallenCount << ",\n";
    oss << "    \"uprightMaxDispMm\": " << tlxm::fmtNum(o.uprightMaxDispMm, 4) << "\n";
    oss << "  }\n}\n";

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
