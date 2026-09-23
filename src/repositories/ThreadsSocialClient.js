/**
 * Threads social client seam (THR-06).
 *
 * ADMIN-THR-04: tree/comment/react/attach/knobs remain **Unknown / Open**.
 * Until siblings name Closed production paths, every social op returns
 * explicit Unavailable — **no invent production URLs**.
 */

/** @typedef {{ status: 'unavailable', reason: 'social_http_open', op: string }} SocialUnavailable */
/** @typedef {{ status: 'closed', path: string }} SocialClosed — reserved when siblings Close */

export const SOCIAL_HTTP_CONTRACT = Object.freeze({
  tree_read: 'open',
  comment_create: 'open',
  comment_reply: 'open',
  react: 'open',
  attach_ref: 'open',
  knobs: 'open',
})

/**
 * @param {keyof typeof SOCIAL_HTTP_CONTRACT} op
 * @returns {boolean}
 */
export function isSocialOpClosed(op) {
  return SOCIAL_HTTP_CONTRACT[op] === 'closed'
}

/**
 * @param {string} op
 * @returns {SocialUnavailable}
 */
export function unavailableSocialResult(op) {
  return Object.freeze({
    status: 'unavailable',
    reason: 'social_http_open',
    op: String(op),
  })
}

/**
 * Typed threads social client — fail-soft while paths Open.
 * Does not call fetch for Open ops; does not invent URLs.
 */
export function createThreadsSocialClient() {
  async function run(op) {
    if (!isSocialOpClosed(op)) {
      return unavailableSocialResult(op)
    }
    // Closed branch reserved for future named sibling paths — never invent here.
    throw new Error(`ThreadsSocialClient: Closed op "${op}" has no named path yet`)
  }

  return {
    contract: SOCIAL_HTTP_CONTRACT,
    async getThreadTree() {
      return run('tree_read')
    },
    async createComment() {
      return run('comment_create')
    },
    async replyComment() {
      return run('comment_reply')
    },
    async react() {
      return run('react')
    },
    async attachRef() {
      return run('attach_ref')
    },
    async getKnobs() {
      return run('knobs')
    },
  }
}

export const defaultThreadsSocialClient = createThreadsSocialClient()
