/**
 * PLYA V2 — Dedicated Vite Module WebWorker for non-blocking 16-Solver / 128-Assertion
 * Real 3D Triangle BVH Multi-Physics Evaluation!
 */

import {
  ExamStrictnessMode,
  PgDeepPhysicsReport,
  runExamInheritedPlaygroundGrader,
  SerializedPgPart,
} from './BrowserPhysicsSolvers';

export interface ExamWorkerRequest {
  readonly epoch: number;
  readonly strictness: ExamStrictnessMode;
  readonly parts: readonly SerializedPgPart[];
  readonly webCtx?: { isOnline?: boolean; webgl2?: boolean; totalTriangles?: number };
}

export interface ExamWorkerResponse {
  readonly epoch: number;
  readonly report: PgDeepPhysicsReport;
}

self.onmessage = (ev: MessageEvent<ExamWorkerRequest>) => {
  const { epoch, strictness, parts, webCtx } = ev.data;
  const report = runExamInheritedPlaygroundGrader(parts, strictness, webCtx);
  const resp: ExamWorkerResponse = { epoch, report };
  self.postMessage(resp);
};
