/**
 * Threads social client (THR-06 seam + THR-07 knobs/tree + THR-08 comment write Close).
 *
 * Closed ops (OpenAPI / HTTP-06): knobs + tree_read + comment_create/reply.
 * Remaining ops stay Open → Unavailable — **no invent** URLs / no `/threads/by-issue`.
 */

import { getThreadsBaseUrl, normalizePublicBaseUrl } from '../config/publicEnv.js'
import { getThreadsAccessToken } from '../auth/threadsAccessToken.js'

/** @typedef {{ status: 'unavailable', reason: string, op: string }} SocialUnavailable */
/** @typedef {{ status: 'ok', data: Record<string, unknown>, op: string }} SocialOk */
/** @typedef {{ status: 'fail', failKind: 'verify'|'max_depth'|'post_fail', op: string, reason?: string, httpStatus?: number, code?: string }} SocialWriteFail */

export const SOCIAL_HTTP_CONTRACT = Object.freeze({
  tree_read: 'closed',
  comment_create: 'closed',
  comment_reply: 'closed',
  react: 'open',
  attach_ref: 'open',
  knobs: 'closed',
})

/** Closed path templates — SSOT OpenAPI (no by-issue). */
export const CLOSED_SOCIAL_PATHS = Object.freeze({
  knobs: '/threads/knobs',
  /** @param {string} issueId */
  tree_read: (issueId) => `/threads/issues/${encodeURIComponent(String(issueId))}`,
  /** @param {string} issueId */
  comment_write: (issueId) =>
    `/threads/issues/${encodeURIComponent(String(issueId))}/comments`,
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
 * Soft-fail write result (api-req §8) — not Unavailable open-seam.
 * @param {string} op
 * @param {'verify'|'max_depth'|'post_fail'} failKind
 * @param {{ reason?: string, httpStatus?: number, code?: string }} [extra]
 * @returns {SocialWriteFail}
 */
export function writeFailSocialResult(op, failKind, extra = {}) {
  return Object.freeze({
    status: 'fail',
    failKind,
    op: String(op),
    ...(extra.reason ? { reason: String(extra.reason) } : {}),
    ...(extra.httpStatus !== undefined ? { httpStatus: Number(extra.httpStatus) } : {}),
    ...(extra.code ? { code: String(extra.code) } : {}),
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
 * @param {unknown} envelope
 * @returns {{ code?: string, type?: string, message?: string, details?: Record<string, unknown> }|null}
 */
function readErrorBlock(envelope) {
  if (!envelope || typeof envelope !== 'object') return null
  const err = /** @type {{ error?: unknown }} */ (envelope).error
  if (!err || typeof err !== 'object') return null
  return /** @type {{ code?: string, type?: string, message?: string, details?: Record<string, unknown> }} */ (err)
}

/**
 * Classify comment-write HTTP + envelope per api-req §8.
 * @param {number} httpStatus
 * @param {unknown} envelope
 * @param {string} op
 * @returns {SocialOk|SocialWriteFail}
 */
export function classifyCommentWriteResponse(httpStatus, envelope, op) {
  const err = readErrorBlock(envelope)

  if (httpStatus === 401 || httpStatus === 403) {
    return writeFailSocialResult(op, 'verify', {
      httpStatus,
      code: err?.code || (httpStatus === 401 ? 'UNAUTHORIZED' : 'FORBIDDEN'),
    })
  }

  // Domain soft-fail on 200 (must check error key — not assume non-2xx)
  if (httpStatus === 200 && err) {
    const code = String(err.code || err.type || '')
    const details = err.details && typeof err.details === 'object' ? err.details : {}
    const detailBlob = `${JSON.stringify(details)} ${err.message || ''} ${code}`.toLowerCase()
    const isDomain = code === 'DOMAIN_ERROR' || String(err.type || '') === 'DOMAIN_ERROR'
    if (isDomain && (detailBlob.includes('depth') || detailBlob.includes('max_depth'))) {
      return writeFailSocialResult(op, 'max_depth', {
        httpStatus: 200,
        code: 'DOMAIN_ERROR',
        reason: 'depth',
      })
    }
    if (isDomain) {
      return writeFailSocialResult(op, 'post_fail', {
        httpStatus: 200,
        code: 'DOMAIN_ERROR',
      })
    }
    return writeFailSocialResult(op, 'post_fail', { httpStatus: 200, code: code || 'error' })
  }

  if (httpStatus === 422) {
    return writeFailSocialResult(op, 'post_fail', { httpStatus: 422, code: 'VALIDATION' })
  }

  if (httpStatus < 200 || httpStatus >= 300) {
    return writeFailSocialResult(op, 'post_fail', {
      httpStatus,
      code: err?.code || `http_${httpStatus}`,
    })
  }

  const data = readSuccessData(envelope)
  if (!data || data.comment_id === undefined || data.comment_id === null || String(data.comment_id).trim() === '') {
    return writeFailSocialResult(op, 'post_fail', { reason: 'malformed', httpStatus })
  }
  return Object.freeze({ status: 'ok', data, op })
}

/**
 * @param {object} [options]
 * @param {string} [options.baseUrl]
 * @param {typeof fetch} [options.fetchImpl]
 * @param {(explicit?: string|null) => Promise<string|null>} [options.getAccessToken]
 */
export function createThreadsSocialClient(options = {}) {
  const baseUrl = normalizePublicBaseUrl(
    options.baseUrl !== undefined ? options.baseUrl : getThreadsBaseUrl(),
  )
  const fetchImpl = options.fetchImpl || globalThis.fetch.bind(globalThis)
  const resolveToken = options.getAccessToken || getThreadsAccessToken

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

  /**
   * @param {'comment_create'|'comment_reply'} op
   * @param {string} issueId
   * @param {{ body: string, parent_id: string|null }} payload
   * @param {string|null|undefined} [explicitToken]
   * @returns {Promise<SocialOk|SocialUnavailable|SocialWriteFail>}
   */
  async function runClosedCommentWrite(op, issueId, payload, explicitToken) {
    if (!isSocialOpClosed(op)) {
      return runOpen(op)
    }
    if (!baseUrl) {
      return unavailableSocialResult(op, 'missing_base_url')
    }
    if (issueId === undefined || issueId === null || String(issueId).trim() === '') {
      return unavailableSocialResult(op, 'missing_issue_id')
    }
    const path = CLOSED_SOCIAL_PATHS.comment_write(issueId)
    if (path.includes('/threads/by-issue')) {
      return unavailableSocialResult(op, 'forbidden_path')
    }

    let accessToken
    try {
      accessToken = await resolveToken(explicitToken)
    } catch {
      return writeFailSocialResult(op, 'verify', { reason: 'token_resolve_failed' })
    }
    if (!accessToken) {
      return writeFailSocialResult(op, 'verify', { reason: 'missing_bearer' })
    }

    const url = `${baseUrl}${path}`
    try {
      const response = await fetchImpl(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          body: String(payload.body ?? ''),
          parent_id: payload.parent_id === undefined ? null : payload.parent_id,
        }),
      })
      let envelope
      try {
        envelope = await response.json()
      } catch {
        return writeFailSocialResult(op, 'post_fail', {
          reason: 'malformed',
          httpStatus: response.status,
        })
      }
      return classifyCommentWriteResponse(response.status, envelope, op)
    } catch {
      return writeFailSocialResult(op, 'post_fail', { reason: 'network' })
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
    /**
     * Root comment — parent_id null.
     * @param {{ issueId: string, body: string, accessToken?: string|null }} args
     */
    async createComment({ issueId, body, accessToken } = {}) {
      return runClosedCommentWrite(
        'comment_create',
        issueId,
        { body: body ?? '', parent_id: null },
        accessToken,
      )
    },
    /**
     * Reply — parent_id required.
     * @param {{ issueId: string, body: string, parentId: string, accessToken?: string|null }} args
     */
    async replyComment({ issueId, body, parentId, accessToken } = {}) {
      if (parentId === undefined || parentId === null || String(parentId).trim() === '') {
        return writeFailSocialResult('comment_reply', 'post_fail', { reason: 'missing_parent_id' })
      }
      return runClosedCommentWrite(
        'comment_reply',
        issueId,
        { body: body ?? '', parent_id: String(parentId) },
        accessToken,
      )
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
