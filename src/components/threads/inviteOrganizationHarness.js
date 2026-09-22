/**
 * Escalation / collaboration invitation stub harness (M146).
 * Presentation only — no invent escalate HTTP.
 *
 * @returns {'idle'|'activated'|'soon'}
 */
export function resolveHarnessThr04Scene(fallback = 'idle') {
  if (typeof window === 'undefined') return fallback
  const raw = window.__THR04_FORCE_SCENE__
  if (raw === 'idle' || raw === 'activated' || raw === 'soon') return raw
  return fallback
}
