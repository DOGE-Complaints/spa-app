/**
 * Escalation / collaboration invitation stub harness (M156 / VL-12).
 * Presentation only — no invent invite / escalate HTTP.
 *
 * Prefers `__NF_VL12_FORCE_SCENE__`; falls back to classic `__THR04_FORCE_SCENE__`.
 *
 * @returns {'idle'|'activated'|'soon'}
 */
export function resolveHarnessVl12Scene(fallback = 'idle') {
  if (typeof window === 'undefined') return fallback
  const vl12 = window.__NF_VL12_FORCE_SCENE__
  if (vl12 === 'idle' || vl12 === 'activated' || vl12 === 'soon') return vl12
  const thr04 = window.__THR04_FORCE_SCENE__
  if (thr04 === 'idle' || thr04 === 'activated' || thr04 === 'soon') return thr04
  return fallback
}

/** Re-export classic thr04 resolver for Closed board path callers. */
export { resolveHarnessThr04Scene } from '../../../components/threads/inviteOrganizationHarness.js'
