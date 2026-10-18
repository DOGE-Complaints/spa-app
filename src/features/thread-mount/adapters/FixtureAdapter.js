/**
 * CT-01 / CT-03 FixtureAdapter — M152 A–D + M153 nest · no HTTP.
 * Illustrative bodies from M152/M153 · no author/avatar/time invent.
 */

/** @typedef {'loading'|'empty'|'populated'|'unavailable'} ThreadFixtureStatus */

/** M152 / M153 illustrative comment bodies (artboard · not invent Identity) */
export const M152_ILLUSTRATIVE_BODIES = Object.freeze([
  'I can help coordinate a shared pet-care group for neighbours.',
  'A simple sign-up list would make it easier to start.',
])

export const M153_NEST_BODIES = Object.freeze({
  A: 'I can help coordinate a shared pet-care group for neighbours.',
  A1: 'A simple sign-up list would make it easier to start.',
  A1a: 'We could list short visits and longer stays separately.',
  B: 'I would also like a way to check availability nearby.',
  B1: 'Keeping the first version small sounds sensible.',
  C: 'What should happen when a neighbour is away for several days?',
  deep3: 'Fourth logical level stays at visual indent cap.',
  orphan: 'Orphan body stays readable without inventing a parent.',
})

/** A→A1→A1a (+ siblings B/B1 · C) — M153 §3 */
export const THREAD_NEST_COMMENTS = Object.freeze([
  { id: 'fx-a', parentId: null, depth: 0, body: M153_NEST_BODIES.A },
  { id: 'fx-a1', parentId: 'fx-a', depth: 1, body: M153_NEST_BODIES.A1 },
  { id: 'fx-a1a', parentId: 'fx-a1', depth: 2, body: M153_NEST_BODIES.A1a },
  { id: 'fx-b', parentId: null, depth: 0, body: M153_NEST_BODIES.B },
  { id: 'fx-b1', parentId: 'fx-b', depth: 1, body: M153_NEST_BODIES.B1 },
  { id: 'fx-c', parentId: null, depth: 0, body: M153_NEST_BODIES.C },
])

/** Depth 0…4 with maxDepth=5 — visual indent caps at 3 while Reply still eligible */
export const THREAD_DEPTH_VS_CAP_COMMENTS = Object.freeze([
  { id: 'fx-d0', parentId: null, depth: 0, body: M153_NEST_BODIES.A },
  { id: 'fx-d1', parentId: 'fx-d0', depth: 1, body: M153_NEST_BODIES.A1 },
  { id: 'fx-d2', parentId: 'fx-d1', depth: 2, body: M153_NEST_BODIES.A1a },
  { id: 'fx-d3', parentId: 'fx-d2', depth: 3, body: M153_NEST_BODIES.deep3 },
  {
    id: 'fx-d4',
    parentId: 'fx-d3',
    depth: 4,
    body: 'Fifth logical level · still Reply if maxDepth allows · same indent column.',
  },
])

/** Orphan parentId → flat fallback */
export const THREAD_ORPHAN_COMMENTS = Object.freeze([
  { id: 'fx-root', parentId: null, depth: 0, body: M153_NEST_BODIES.B },
  { id: 'fx-orphan', parentId: 'missing-parent', depth: 1, body: M153_NEST_BODIES.orphan },
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
    comments: THREAD_NEST_COMMENTS.map((c) => ({ ...c })),
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
  /** @type {'default'|'depthVsCap'|'orphan'} */
  let commentSet = 'default'

  return {
    kind: 'fixture',
    /** @returns {{ status: ThreadFixtureStatus, comments: Array<{id:string,parentId:string|null,depth:number,body:string}>, writeCapability: string }} */
    snapshot() {
      const stand = THREAD_STATE_FIXTURES[status]
      let comments = stand.comments.map((c) => ({ ...c }))
      if (status === 'populated' && commentSet === 'depthVsCap') {
        comments = THREAD_DEPTH_VS_CAP_COMMENTS.map((c) => ({ ...c }))
      } else if (status === 'populated' && commentSet === 'orphan') {
        comments = THREAD_ORPHAN_COMMENTS.map((c) => ({ ...c }))
      }
      return {
        status: stand.status,
        comments,
        writeCapability: stand.writeCapability,
      }
    },
    /** @param {ThreadFixtureStatus} next */
    setStatus(next) {
      if (THREAD_STATE_FIXTURES[next]) status = next
    },
    /** @param {'default'|'depthVsCap'|'orphan'} next */
    setCommentSet(next) {
      if (next === 'default' || next === 'depthVsCap' || next === 'orphan') commentSet = next
    },
    async postComment() {
      return { ok: false, reason: 'ct-03-oos-composer-write' }
    },
    async retry() {
      if (status === 'unavailable') status = 'loading'
      return this.snapshot()
    },
  }
}
