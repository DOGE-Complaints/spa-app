/**
 * LiveAdapter — fail-closed until CT bind (no invent HTTP).
 */

export function createLiveAdapter() {
  return {
    kind: 'live',
    snapshot() {
      return {
        status: 'unavailable',
        comments: [],
        writeCapability: 'denied-unknown',
        live: false,
        reason: 'live-adapter-unwired',
      }
    },
    async postComment() {
      return { ok: false, reason: 'live-adapter-unwired' }
    },
    async retry() {
      return this.snapshot()
    },
  }
}
