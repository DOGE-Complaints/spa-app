/**
 * Opaque /me verify policy seam for next-feed (AD-VL-01/02 · FR-VL-11).
 * Reuses Closed threads helper — no invent identity / verify API fields.
 */
export {
  isIdentityVerifiedForWrite,
  buildVerifyHandoffHref,
  resolveHarnessThr05Scene,
} from '../../../components/threads/verifyWriteGate.js'

/**
 * Path A harness for M157 return / unknown-deny chrome on `#/next/feed*`.
 * Does not mutate classic `#/board` gate presentation.
 *
 * @returns {'unverified'|'handoff'|'verified'|'civic'|'cancelled'|'failed'|'stale'|'write_denied'|null}
 */
export function resolveHarnessVl11Scene() {
  if (typeof window === 'undefined') return null
  const raw = window.__NF_VL11_FORCE_SCENE__
  if (
    raw === 'unverified' ||
    raw === 'handoff' ||
    raw === 'verified' ||
    raw === 'civic' ||
    raw === 'cancelled' ||
    raw === 'failed' ||
    raw === 'stale' ||
    raw === 'write_denied'
  ) {
    return raw
  }
  return null
}
