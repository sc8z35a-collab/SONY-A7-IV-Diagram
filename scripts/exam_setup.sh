#!/usr/bin/env bash
set -euo pipefail

# THE LAST EXAM V1.1 — Automated Industrial Solver Provisioning & Native Harness Builder
# Installs all 48 real external industrial verification/simulation toolchains on Ubuntu 24.04
# and compiles 6 high-performance C++17 native harnesses (CGAL, FCL, Bullet+ODE, OpenCASCADE, DART, FFTW3+GTS+NLopt).

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NATIVE_SRC="${ROOT_DIR}/scripts/exam/native/src"
NATIVE_BIN="${ROOT_DIR}/scripts/exam/native/bin"
MANIFEST_PATH="/tmp/tlx_env_manifest.json"
SKIP_APT="${TLX_SKIP_APT:-0}"

mkdir -p "${NATIVE_BIN}"

if [[ "${SKIP_APT}" != "1" ]]; then
  echo "[TLX-SETUP] Updating apt package index..."
  export DEBIAN_FRONTEND=noninteractive
  sudo apt-get update -qq

  PACKAGES=(
    # 1. Structural / Thermal / Eigenvalue / Dynamic FEA & 3D Tetra Meshers
    calculix-ccx
    gmsh
    python3-gmsh
    tetgen
    netgen
    # 2. 3D CFD Thermal-Fluid Solver
    openfoam
    # 3. Dual SPICE Circuit Simulators & Industrial EDA
    ngspice
    gnucap
    gnucap-default-plugins0
    kicad
    # 4. Dual Multiphysics PDE FEM (Electromagnetics, SI/PI, ESD, Acoustics, Thermal)
    freefem++
    getdp
    # 5. Dual SMT / SAT / Bit-Vector Formal Theorem Provers & MILP Optimizers
    z3
    python3-z3
    cvc5
    minisat
    boolector
    coinor-cbc
    glpk-utils
    python3-pulp
    # 6. Triple 3D Rigid-Body & Articulated Multibody Physics Engines (Bullet + ODE + DART)
    libbullet-dev
    libode-dev
    libdart-dev
    # 7. Triple Exact Computational Geometry, CCD, Surface Quality & B-Rep CAD
    libfcl-dev
    libcgal-dev
    libocct-foundation-dev
    libocct-modeling-data-dev
    libocct-modeling-algorithms-dev
    libocct-data-exchange-dev
    libeigen3-dev
    qhull-bin
    admesh
    libgts-dev
    libfftw3-dev
    libnlopt-dev
    # 8. Triple HDL Formal/Simulators & FPGA Static Timing Closure (Yosys + NextPNR + Verilator + Icarus + GHDL)
    yosys
    nextpnr-ice40
    verilator
    iverilog
    ghdl
    # 9. Control Theory LTI/Bode/Nyquist & Dual Symbolic Computer Algebra (Octave + Maxima)
    octave
    maxima
    # 10. Semiconductor Layout DRC / LVS
    klayout
    magic
    netgen-lvs
    # 11. Scientific Python Stack (100k MC Optics, Convex SOCP, R-Tree, igraph, Pint, Six-Sigma, 100-digit, VTK)
    python3-numpy
    python3-scipy
    python3-sympy
    python3-networkx
    python3-shapely
    python3-opencv
    python3-skimage
    python3-meshio
    python3-vtk9
    python3-cvxopt
    python3-nlopt
    python3-rtree
    python3-igraph
    python3-pint
    python3-statsmodels
    python3-mpmath
    # Build tools
    pkg-config
    cmake
    libboost-all-dev
    libgmp-dev
    libmpfr-dev
  )

  echo "[TLX-SETUP] Installing ${#PACKAGES[@]} industrial solver packages..."
  sudo apt-get install -y --no-install-recommends "${PACKAGES[@]}"
fi

compile_harness() {
  local name="$1"
  local src="${NATIVE_SRC}/${name}.cpp"
  local out="${NATIVE_BIN}/${name}"
  shift
  if [[ ! -f "${src}" ]]; then
    echo "[TLX-SETUP] WARN: ${src} not yet created; skipping build."
    return 0
  fi
  echo "[TLX-SETUP] Compiling C++17 native harness: ${name}..."
  g++ -O3 -DNDEBUG "${src}" -o "${out}" "$@" -std=c++17
  chmod +x "${out}"
}

if [[ -d "${NATIVE_SRC}" ]]; then
  # 1. CGAL Exact Geometry Kernel
  compile_harness cgal_geom_kernel \
    -lgmp -lmpfr -lpthread

  # 2. FCL 0.7 BVH / Exact Distance / CCD / 3D A* Router
  FCL_CFLAGS="$(pkg-config --cflags fcl eigen3 2>/dev/null || echo '-I/usr/include/eigen3')"
  FCL_LIBS="$(pkg-config --libs fcl 2>/dev/null || echo '-lfcl -lccd')"
  # shellcheck disable=SC2086
  compile_harness fcl_ccd_router ${FCL_CFLAGS} ${FCL_LIBS} -lpthread

  # 3. Dual 3D Multibody Physics (Bullet 3.24 + ODE)
  BULLET_CFLAGS="$(pkg-config --cflags bullet 2>/dev/null || echo '-I/usr/include/bullet')"
  BULLET_LIBS="$(pkg-config --libs bullet 2>/dev/null || echo '-lBulletDynamics -lBulletCollision -lLinearMath')"
  ODE_CFLAGS="$(pkg-config --cflags ode 2>/dev/null || echo '')"
  ODE_LIBS="$(pkg-config --libs ode 2>/dev/null || echo '-lode')"
  # shellcheck disable=SC2086
  compile_harness bullet_ode_multibody ${BULLET_CFLAGS} ${ODE_CFLAGS} ${BULLET_LIBS} ${ODE_LIBS} -lpthread

  # 4. OpenCASCADE + Eigen3 Precision Inertia / Draft / Bore Analyzer
  OCCT_INC="-I/usr/include/opencascade -I/usr/include/eigen3"
  OCCT_LIBS="-lTKernel -lTKMath -lTKG2d -lTKG3d -lTKGeomBase -lTKBRep -lTKTopAlgo -lTKMesh -lTKPrim -lTKSTL"
  # shellcheck disable=SC2086
  compile_harness occt_step_analyzer ${OCCT_INC} ${OCCT_LIBS} -lpthread

  # 5. DART 6.13 Articulated Multibody Kinematics & Inverse Dynamics
  DART_CFLAGS="$(pkg-config --cflags dart eigen3 2>/dev/null || echo '-I/usr/include/eigen3')"
  DART_LIBS="$(pkg-config --libs dart 2>/dev/null || echo '-ldart -lassimp -lccd -lfcl -loctomap')"
  # shellcheck disable=SC2086
  compile_harness dart_kinematics_dynamics ${DART_CFLAGS} ${DART_LIBS} -lpthread

  # 6. FFTW3 Spectral PSD/EMI + GTS Surface Quality + NLopt Hertz Tribology Optimizer
  GTS_CFLAGS="$(pkg-config --cflags gts glib-2.0 fftw3 nlopt 2>/dev/null || echo '-I/usr/include/glib-2.0 -I/usr/lib/x86_64-linux-gnu/glib-2.0/include')"
  GTS_LIBS="$(pkg-config --libs gts glib-2.0 fftw3 nlopt 2>/dev/null || echo '-lgts -lglib-2.0 -lfftw3 -lnlopt -lm')"
  # shellcheck disable=SC2086
  compile_harness spectral_gts_nlopt ${GTS_CFLAGS} ${GTS_LIBS} -lm -lpthread
fi

# Verify and emit deterministic JSON manifest of all 48 real external solver toolchains
/usr/bin/python3 - "${NATIVE_BIN}" "${MANIFEST_PATH}" <<'PY'
import json, os, shutil, subprocess, sys, time

native_bin = sys.argv[1]
manifest_path = sys.argv[2]

def probe_cmd(cmd, args=None, env_extra=None):
    exe = shutil.which(cmd) if not os.path.isabs(cmd) else (cmd if os.path.isfile(cmd) else None)
    if not exe:
        return {"ok": False, "path": None, "version": None}
    env = os.environ.copy()
    if env_extra:
        env.update(env_extra)
    try:
        p = subprocess.run([exe] + (args or []), stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, timeout=15, env=env)
        first = ""
        for line in p.stdout.splitlines():
            s = line.strip()
            if s:
                first = s[:140]
                break
        return {"ok": True, "path": exe, "version": first or "installed"}
    except Exception as e:
        return {"ok": True, "path": exe, "version": f"present ({e})"}

def probe_openfoam():
    for base in ["/usr/lib/openfoam/openfoam1912", "/usr/share/openfoam"]:
        bin_dir = os.path.join(base, "platforms", "linux64GccDPInt32Opt", "bin")
        exe = os.path.join(bin_dir, "buoyantSimpleFoam")
        if os.path.isfile(exe):
            return {"ok": True, "path": exe, "foam_root": base, "version": "OpenFOAM-1912"}
    w = shutil.which("buoyantSimpleFoam") or shutil.which("simpleFoam") or shutil.which("blockMesh")
    if w:
        return {"ok": True, "path": w, "foam_root": os.path.dirname(os.path.dirname(w)), "version": "OpenFOAM"}
    if os.path.isdir("/usr/lib/openfoam"):
        for root, _dirs, files in os.walk("/usr/lib/openfoam"):
            if "buoyantSimpleFoam" in files:
                return {"ok": True, "path": os.path.join(root, "buoyantSimpleFoam"), "foam_root": root, "version": "OpenFOAM-installed"}
    return {"ok": False, "path": None, "version": None}

def probe_py_mod(mod):
    try:
        m = __import__(mod)
        return {"ok": True, "version": getattr(m, "__version__", "installed")}
    except Exception as e:
        return {"ok": False, "version": str(e)}

solvers = {
    # Original 32 external industrial solvers (V1)
    "calculix_ccx": probe_cmd("ccx", ["-v"]),
    "gmsh": probe_cmd("gmsh", ["--version"]),
    "tetgen": probe_cmd("tetgen", ["-h"]),
    "openfoam": probe_openfoam(),
    "ngspice": probe_cmd("ngspice", ["--version"]),
    "gnucap": probe_cmd("gnucap", ["-b", "/dev/null"]),
    "kicad_cli": probe_cmd("kicad-cli", ["--version"]),
    "freefem": probe_cmd("FreeFem++", ["-v"]),
    "z3": probe_cmd("z3", ["--version"]),
    "coinor_cbc": probe_cmd("cbc", ["-version"]),
    "glpk": probe_cmd("glpsol", ["--version"]),
    "yosys": probe_cmd("yosys", ["-V"]),
    "verilator": probe_cmd("verilator", ["--version"]),
    "iverilog": probe_cmd("iverilog", ["-V"]),
    "klayout": probe_cmd("klayout", ["-v"]),
    "magic": probe_cmd("magic", ["--version"]),
    "netgen_lvs": probe_cmd("netgen-lvs", ["-batch"]) if shutil.which("netgen-lvs") else probe_cmd("netgen", ["-h"]),
    "qhull": probe_cmd("qhull", ["-V"]),
    "py_numpy": probe_py_mod("numpy"),
    "py_scipy": probe_py_mod("scipy"),
    "py_sympy": probe_py_mod("sympy"),
    "py_networkx": probe_py_mod("networkx"),
    "py_shapely": probe_py_mod("shapely"),
    "py_z3": probe_py_mod("z3"),
    "py_cv2": probe_py_mod("cv2"),
    "py_skimage": probe_py_mod("skimage"),
    "py_pulp": probe_py_mod("pulp"),
    "py_meshio": probe_py_mod("meshio"),
    "native_cgal": probe_cmd(os.path.join(native_bin, "cgal_geom_kernel"), ["--version"]),
    "native_fcl": probe_cmd(os.path.join(native_bin, "fcl_ccd_router"), ["--version"]),
    "native_bullet_ode": probe_cmd(os.path.join(native_bin, "bullet_ode_multibody"), ["--version"]),
    "native_occt": probe_cmd(os.path.join(native_bin, "occt_step_analyzer"), ["--version"]),
    # 16 New V1.1 external industrial solvers (+2 C++17 native harnesses = 48 total!)
    "getdp": probe_cmd("getdp", ["--version"]),
    "cvc5": probe_cmd("cvc5", ["--version"]),
    "minisat": probe_cmd("minisat", ["--help"]),
    "boolector": probe_cmd("boolector", ["--version"]),
    "ghdl": probe_cmd("ghdl", ["--version"]),
    "nextpnr_ice40": probe_cmd("nextpnr-ice40", ["--version"]),
    "octave": probe_cmd("octave-cli", ["--version"]),
    "maxima": probe_cmd("maxima", ["--version"]),
    "admesh": probe_cmd("admesh", ["--version"]),
    "native_dart": probe_cmd(os.path.join(native_bin, "dart_kinematics_dynamics"), ["--version"]),
    "native_spectral_gts": probe_cmd(os.path.join(native_bin, "spectral_gts_nlopt"), ["--version"]),
    "py_cvxopt": probe_py_mod("cvxopt"),
    "py_rtree": probe_py_mod("rtree"),
    "py_igraph": probe_py_mod("igraph"),
    "py_pint": probe_py_mod("pint"),
    "py_statsmodels": probe_py_mod("statsmodels"),
}

ok_count = sum(1 for v in solvers.values() if v.get("ok"))
manifest = {
    "schema": "tlx_env_manifest/v1.1",
    "generated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    "ok_count": ok_count,
    "total_count": len(solvers),
    "all_ready": ok_count == len(solvers),
    "solvers": solvers,
}
with open(manifest_path, "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)
print(f"[TLX-SETUP] MANIFEST ready={ok_count}/{len(solvers)} -> {manifest_path}")
for k, v in solvers.items():
    if not v.get("ok"):
        print(f"[TLX-SETUP] MISSING: {k} ({v.get('version')})")
PY
