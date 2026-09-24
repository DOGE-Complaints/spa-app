/**
 * Threads social client (THR-06 seam + THR-07 knobs/tree Close).
 *
 * Closed ops (OpenAPI / HTTP-06): knobs + tree_read only.
 * Remaining ops stay Open → Unavailable — **no invent** URLs / no `/threads/by-issue`.
 */

import { getThreadsBaseUrl, normalizePublicBaseUrl } from '../config/publicEnv.js'

/** @typedef {{ status: 'unavailable', reason: string, op: string }} SocialUnavailable */
/** @typedef {{ status: 'ok', data: Record<string, unknown>, op: string }} SocialOk */

export const SOCIAL_HTTP_CONTRACT = Object.freeze({
  tree_read: 'closed',
  comment_create: 'open',
  comment_reply: 'open',
  react: 'open',
  attach_ref: 'open',
  knobs: 'closed',
})

/** Closed path templates — SSOT OpenAPI (no by-issue). */
export const CLOSED_SOCIAL_PATHS = Object.freeze({
  knobs: '/threads/knobs',
  /** @param {string} issueId */
  tree_read: (issueId) => `/threads/issues/${encodeURIComponent(String(issueId))}`,
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
 * @param {string} [reason='social_http_open']
 * @returns {SocialUnavailable}
 */
export function unavailableSocialResult(op, reason = 'social_http_open') {
  return Object.freeze({
    status: 'unavailable',
    reason: String(reason),
    op: String(op),
  })
}

/**
 * @param {unknown} envelope
 * @returns {Record<string, unknown>|null}
 */
function readSuccessData(envelope) {
  if (!envelope || typeof envelope !== 'object') return null
  if (!('data' in envelope)) return null
  const data = /** @type {{ data?: unknown }} */ (envelope).data
  if (data === null || typeof data !== 'object' || Array.isArray(data)) return null
  return /** @type {Record<string, unknown>} */ (data)
}

/**
 * @param {object} [options]
 * @param {string} [options.baseUrl]
 * @param {typeof fetch} [options.fetchImpl]
 */
export function createThreadsSocialClient(options = {}) {
  const baseUrl = normalizePublicBaseUrl(
    options.baseUrl !== undefined ? options.baseUrl : getThreadsBaseUrl(),
  )
  const fetchImpl = options.fetchImpl || globalThis.fetch.bind(globalThis)

  async function runOpen(op) {
    return unavailableSocialResult(op, 'social_http_open')
  }

  /**
   * @param {string} op
   * @param {string} path
   * @returns {Promise<SocialOk|SocialUnavailable>}
   */
  async function runClosedGet(op, path) {
    if (!baseUrl) {
      return unavailableSocialResult(op, 'missing_base_url')
    }
    if (path.includes('/threads/by-issue')) {
      return unavailableSocialResult(op, 'forbidden_path')
    }
    const url = `${baseUrl}${path}`
    try {
      const response = await fetchImpl(url)
      if (!response.ok) {
        return unavailableSocialResult(op, `http_${response.status}`)
      }
      let envelope
      try {
        envelope = await response.json()
      } catch {
        return unavailableSocialResult(op, 'malformed')
      }
      const data = readSuccessData(envelope)
      if (!data) {
        return unavailableSocialResult(op, 'malformed')
      }
      return Object.freeze({ status: 'ok', data, op })
    } catch {
      return unavailableSocialResult(op, 'network')
    }
  }

  return {
    contract: SOCIAL_HTTP_CONTRACT,
    baseUrl,
    async getThreadTree(issueId) {
      if (!isSocialOpClosed('tree_read')) {
        return runOpen('tree_read')
      }
      if (issueId === undefined || issueId === null || String(issueId).trim() === '') {
        return unavailableSocialResult('tree_read', 'missing_issue_id')
      }
      return runClosedGet('tree_read', CLOSED_SOCIAL_PATHS.tree_read(issueId))
    },
    async createComment() {
      return runOpen('comment_create')
    },
    async replyComment() {
      return runOpen('comment_reply')
    },
    async react() {
      return runOpen('react')
    },
    async attachRef() {
      return runOpen('attach_ref')
    },
    async getKnobs() {
      if (!isSocialOpClosed('knobs')) {
        return runOpen('knobs')
      }
      return runClosedGet('knobs', CLOSED_SOCIAL_PATHS.knobs)
    },
  }
}

export const defaultThreadsSocialClient = createThreadsSocialClient()
