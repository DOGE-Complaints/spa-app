/**
 * CT-01 / CT-03 / CT-04 / CT-05 FixtureAdapter — nest + composer + attach intents · no HTTP.
 * Illustrative bodies from M152/M153 · no author/avatar/time invent.
 * AttachmentRef = local intent only · never published media claim.
 */

/** @param {'ready'|'denied'} [status] */
export function createFixtureAttachmentIntent(status = 'ready', kind = 'image') {
  const id = `fx-attach-${status}-${kind}`
  return {
    id,
    kind,
    label: kind === 'image' ? 'Selected image' : 'Attached file',
    status,
  }
}

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
  /** @type {Array<{ id: string, parentId: string|null, depth: number, body: string }>|null} */
  let liveComments = null
  let failNextPost = false
  let postSeq = 0

  function baseComments() {
    const stand = THREAD_STATE_FIXTURES[status]
    if (status === 'populated' && commentSet === 'depthVsCap') {
      return THREAD_DEPTH_VS_CAP_COMMENTS.map((c) => ({ ...c }))
    }
    if (status === 'populated' && commentSet === 'orphan') {
      return THREAD_ORPHAN_COMMENTS.map((c) => ({ ...c }))
    }
    return stand.comments.map((c) => ({ ...c }))
  }

  return {
    kind: 'fixture',
    /** @returns {{ status: ThreadFixtureStatus, comments: Array<{id:string,parentId:string|null,depth:number,body:string}>, writeCapability: string }} */
    snapshot() {
      const stand = THREAD_STATE_FIXTURES[status]
      const comments = liveComments ? liveComments.map((c) => ({ ...c })) : baseComments()
      return {
        status: stand.status === 'empty' && comments.length > 0 ? 'populated' : stand.status,
        comments,
        writeCapability: stand.writeCapability,
      }
    },
    /** @param {ThreadFixtureStatus} next */
    setStatus(next) {
      if (THREAD_STATE_FIXTURES[next]) {
        status = next
        liveComments = null
      }
    },
    /** @param {'default'|'depthVsCap'|'orphan'} next */
    setCommentSet(next) {
      if (next === 'default' || next === 'depthVsCap' || next === 'orphan') {
        commentSet = next
        liveComments = null
      }
    },
    /** @param {boolean} next */
    setFailNextPost(next) {
      failNextPost = Boolean(next)
    },
    /**
     * Fixture write only — no HTTP. Soft-fail when failNextPost.
     * @param {{ body?: string, parentId?: string|null }} [payload]
     */
    async postComment(payload = {}) {
      const body = typeof payload.body === 'string' ? payload.body.trim() : ''
      if (!body) return { ok: false, reason: 'empty-body' }
      if (failNextPost) {
        return {
          ok: false,
          reason: 'fixture-soft-fail',
          title: 'Comment wasn’t posted.',
          detail: 'Your text is still here. Try again.',
        }
      }
      const parentId =
        payload.parentId == null || payload.parentId === '' ? null : String(payload.parentId)
      const current = liveComments || baseComments()
      let depth = 0
      if (parentId) {
        const parent = current.find((c) => c.id === parentId)
        depth = parent ? Number(parent.depth) + 1 : 0
      }
      postSeq += 1
      const comment = {
        id: `fx-posted-${postSeq}`,
        parentId,
        depth,
        body,
      }
      liveComments = [...current, comment]
      if (status === 'empty') status = 'populated'
      return { ok: true, comment }
    },
    async retry() {
      if (status === 'unavailable') status = 'loading'
      return this.snapshot()
    },
  }
}
