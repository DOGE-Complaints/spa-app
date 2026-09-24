/**
 * Threads social client (THR-06…09).
 *
 * Closed ops (OpenAPI / HTTP-06): knobs + tree_read + comment + react + attach_ref.
 * **No invent** URLs / no `/threads/by-issue` / no multipart blob.
 */

import { getThreadsBaseUrl, normalizePublicBaseUrl } from '../config/publicEnv.js'
import { getThreadsAccessToken } from '../auth/threadsAccessToken.js'
import { isReactionsV1Id } from '../components/threads/reactionsV1Catalog.js'

/** @typedef {{ status: 'unavailable', reason: string, op: string }} SocialUnavailable */
/** @typedef {{ status: 'ok', data: Record<string, unknown>, op: string }} SocialOk */
/** @typedef {{ status: 'fail', failKind: 'verify'|'max_depth'|'post_fail'|'attach_denied', op: string, reason?: string, httpStatus?: number, code?: string }} SocialWriteFail */

export const SOCIAL_HTTP_CONTRACT = Object.freeze({
  tree_read: 'closed',
  comment_create: 'closed',
  comment_reply: 'closed',
  react: 'closed',
  attach_ref: 'closed',
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
  /** @param {string} issueId */
  reactions: (issueId) =>
    `/threads/issues/${encodeURIComponent(String(issueId))}/reactions`,
  /** @param {string} issueId */
  attachment_refs: (issueId) =>
    `/threads/issues/${encodeURIComponent(String(issueId))}/attachment-refs`,
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
 * @param {'verify'|'max_depth'|'post_fail'|'attach_denied'} failKind
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
 * Classify reaction PUT per api-req §5/§8.
 * @param {number} httpStatus
 * @param {unknown} envelope
 * @param {string} [op='react']
 * @returns {SocialOk|SocialWriteFail}
 */
export function classifyReactionResponse(httpStatus, envelope, op = 'react') {
  const err = readErrorBlock(envelope)

  if (httpStatus === 401 || httpStatus === 403) {
    return writeFailSocialResult(op, 'verify', {
      httpStatus,
      code: err?.code || (httpStatus === 401 ? 'UNAUTHORIZED' : 'FORBIDDEN'),
    })
  }

  if (httpStatus === 200 && err) {
    const code = String(err.code || err.type || '')
    const isDomain = code === 'DOMAIN_ERROR' || String(err.type || '') === 'DOMAIN_ERROR'
    return writeFailSocialResult(op, 'post_fail', {
      httpStatus: 200,
      code: isDomain ? 'DOMAIN_ERROR' : code || 'error',
    })
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
  if (!data || !Array.isArray(data.selected)) {
    return writeFailSocialResult(op, 'post_fail', { reason: 'malformed', httpStatus })
  }
  return Object.freeze({ status: 'ok', data, op })
}

/**
 * Classify attachment-ref POST per api-req §6/§8.
 * @param {number} httpStatus
 * @param {unknown} envelope
 * @param {string} [op='attach_ref']
 * @returns {SocialOk|SocialWriteFail}
 */
export function classifyAttachRefResponse(httpStatus, envelope, op = 'attach_ref') {
  const err = readErrorBlock(envelope)

  if (httpStatus === 401 || httpStatus === 403) {
    return writeFailSocialResult(op, 'verify', {
      httpStatus,
      code: err?.code || (httpStatus === 401 ? 'UNAUTHORIZED' : 'FORBIDDEN'),
    })
  }

  if (httpStatus === 200 && err) {
    const code = String(err.code || err.type || '')
    const details = err.details && typeof err.details === 'object' ? err.details : {}
    const reason = String(/** @type {{ reason?: unknown }} */ (details).reason || '')
    const isDomain = code === 'DOMAIN_ERROR' || String(err.type || '') === 'DOMAIN_ERROR'
    if (isDomain && reason === 'attach-denied') {
      return writeFailSocialResult(op, 'attach_denied', {
        httpStatus: 200,
        code: 'DOMAIN_ERROR',
        reason: 'attach-denied',
      })
    }
    return writeFailSocialResult(op, 'post_fail', {
      httpStatus: 200,
      code: isDomain ? 'DOMAIN_ERROR' : code || 'error',
    })
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
  if (!data || data.ref_id === undefined || data.ref_id === null || String(data.ref_id).trim() === '') {
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
   * @param {string} op
   * @param {string} issueId
   * @param {string} path
   * @param {'POST'|'PUT'} method
   * @param {Record<string, unknown>} body
   * @param {string|null|undefined} explicitToken
   * @param {(status: number, envelope: unknown, op: string) => SocialOk|SocialWriteFail} classify
   * @returns {Promise<SocialOk|SocialUnavailable|SocialWriteFail>}
   */
  async function runClosedBearerWrite(op, issueId, path, method, body, explicitToken, classify) {
    if (!isSocialOpClosed(op)) {
      return runOpen(op)
    }
    if (!baseUrl) {
      return unavailableSocialResult(op, 'missing_base_url')
    }
    if (issueId === undefined || issueId === null || String(issueId).trim() === '') {
      return unavailableSocialResult(op, 'missing_issue_id')
    }
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
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
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
      return classify(response.status, envelope, op)
    } catch {
      return writeFailSocialResult(op, 'post_fail', { reason: 'network' })
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
    return runClosedBearerWrite(
      op,
      issueId,
      CLOSED_SOCIAL_PATHS.comment_write(issueId),
      'POST',
      {
        body: String(payload.body ?? ''),
        parent_id: payload.parent_id === undefined ? null : payload.parent_id,
      },
      explicitToken,
      classifyCommentWriteResponse,
    )
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
    /**
     * PUT reactions — catalog ids only.
     * @param {{
     *   issueId: string,
     *   targetKind: 'thread_root'|'comment',
     *   commentId?: string|null,
     *   reactionId: string,
     *   op: 'add'|'remove',
     *   accessToken?: string|null,
     * }} args
     */
    async react({ issueId, targetKind, commentId = null, reactionId, op, accessToken } = {}) {
      if (!isReactionsV1Id(reactionId)) {
        return writeFailSocialResult('react', 'post_fail', { reason: 'unknown_reaction_id' })
      }
      if (op !== 'add' && op !== 'remove') {
        return writeFailSocialResult('react', 'post_fail', { reason: 'bad_op' })
      }
      const kind = targetKind === 'thread_root' ? 'thread_root' : 'comment'
      const body = {
        target_kind: kind,
        comment_id: kind === 'thread_root' ? null : commentId == null ? null : String(commentId),
        reaction_id: String(reactionId),
        op,
      }
      if (kind === 'comment' && (body.comment_id === null || String(body.comment_id).trim() === '')) {
        return writeFailSocialResult('react', 'post_fail', { reason: 'missing_comment_id' })
      }
      return runClosedBearerWrite(
        'react',
        issueId,
        CLOSED_SOCIAL_PATHS.reactions(issueId),
        'PUT',
        body,
        accessToken,
        classifyReactionResponse,
      )
    },
    /**
     * POST attachment-refs — refs only, no multipart.
     * @param {{
     *   issueId: string,
     *   refId: string,
     *   mediaType: string,
     *   commentId: string,
     *   floorClass?: string,
     *   accessToken?: string|null,
     * }} args
     */
    async attachRef({
      issueId,
      refId,
      mediaType,
      commentId,
      floorClass = 'ok',
      accessToken,
    } = {}) {
      if (refId === undefined || refId === null || String(refId).trim() === '') {
        return writeFailSocialResult('attach_ref', 'post_fail', { reason: 'missing_ref_id' })
      }
      if (mediaType === undefined || mediaType === null || String(mediaType).trim() === '') {
        return writeFailSocialResult('attach_ref', 'post_fail', { reason: 'missing_media_type' })
      }
      if (commentId === undefined || commentId === null || String(commentId).trim() === '') {
        return writeFailSocialResult('attach_ref', 'post_fail', { reason: 'missing_comment_id' })
      }
      return runClosedBearerWrite(
        'attach_ref',
        issueId,
        CLOSED_SOCIAL_PATHS.attachment_refs(issueId),
        'POST',
        {
          ref_id: String(refId),
          media_type: String(mediaType),
          comment_id: String(commentId),
          floor_class: floorClass == null ? 'ok' : String(floorClass),
        },
        accessToken,
        classifyAttachRefResponse,
      )
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
