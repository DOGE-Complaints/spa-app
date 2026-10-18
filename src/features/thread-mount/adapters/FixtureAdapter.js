/**
 * CT-01 FixtureAdapter — M152 A–D (+ E stress via CSS) · no HTTP.
 * Illustrative bodies from M152 §9 · no author/avatar/time invent.
 */

/** @typedef {'loading'|'empty'|'populated'|'unavailable'} ThreadFixtureStatus */

/** M152 illustrative comment bodies (artboard · not invent Identity) */
export const M152_ILLUSTRATIVE_BODIES = Object.freeze([
  'I can help coordinate a shared pet-care group for neighbours.',
  'A simple sign-up list would make it easier to start.',
])

/**
 * @type {Readonly<Record<ThreadFixtureStatus, {
 *   status: ThreadFixtureStatus,
 *   comments: Array<{ id: string, parentId: string|null, depth: number, body: string }>,
 *   writeCapability: 'allowed'|'unverified'|'denied-unknown',
 * }>>}
 */
export const THREAD_STATE_FIXTURES = Object.freeze({
  loading: {
    status: 'loading',
    comments: [],
    writeCapability: 'denied-unknown',
  },
  empty: {
    status: 'empty',
    comments: [],
    writeCapability: 'allowed',
  },
  populated: {
    status: 'populated',
    comments: [
      {
        id: 'fx-c1',
        parentId: null,
        depth: 0,
        body: M152_ILLUSTRATIVE_BODIES[0],
      },
      {
        id: 'fx-c2',
        parentId: null,
        depth: 0,
        body: M152_ILLUSTRATIVE_BODIES[1],
      },
    ],
    writeCapability: 'allowed',
  },
  unavailable: {
    status: 'unavailable',
    comments: [],
    writeCapability: 'denied-unknown',
  },
})

/**
 * @param {ThreadFixtureStatus} [initialStatus]
 */
export function createFixtureAdapter(initialStatus = 'populated') {
  let status = THREAD_STATE_FIXTURES[initialStatus] ? initialStatus : 'populated'

  return {
    kind: 'fixture',
    /** @returns {{ status: ThreadFixtureStatus, comments: typeof THREAD_STATE_FIXTURES.populated.comments, writeCapability: string }} */
    snapshot() {
      const stand = THREAD_STATE_FIXTURES[status]
      return {
        status: stand.status,
        comments: stand.comments.map((c) => ({ ...c })),
        writeCapability: stand.writeCapability,
      }
    },
    /** @param {ThreadFixtureStatus} next */
    setStatus(next) {
      if (THREAD_STATE_FIXTURES[next]) status = next
    },
    async postComment() {
      return { ok: false, reason: 'ct-01-oos-composer-write' }
    },
    async retry() {
      if (status === 'unavailable') status = 'loading'
      return this.snapshot()
    },
  }
}
