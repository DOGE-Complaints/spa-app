/**
 * LiveAdapter — thin wrap of ThreadsSocialClient only (CT-28 · Arch §15.1).
 * Replaces live-adapter-unwired · no second HTTP client · no invent paths.
 * Lab default remains FixtureAdapter; Live is next/feed host bind.
 */

import { canWriteThreadsWithMe } from '../../../auth/meIdentityVerified.js'
import { defaultThreadsSocialClient } from '../../../repositories/ThreadsSocialClient.js'
import { mapThreadTreeToBlock } from '../../../repositories/mapThreadTreeToBlock.js'
import {
  bindThreadsKnobsFocusRefresh,
  ensureThreadsKnobsCached,
} from '../../../repositories/threadsKnobsCache.js'

/**
 * @param {{
 *   client?: { getThreadTree: Function, createComment: Function, replyComment: Function, getKnobs: Function },
 *   issueId?: string|null,
 *   profile?: Record<string, unknown>|null,
 * }} [opts]
 */
export function createLiveAdapter(opts = {}) {
  const client = opts.client || defaultThreadsSocialClient
  const issueId =
    opts.issueId === undefined || opts.issueId === null ? '' : String(opts.issueId).trim()
  let profile = opts.profile ?? null
  /** @type {number} */
  let maxDepth = 2
  /** @type {string[]|null} */
  let mediaAllowedTypes = null

  /** @type {{
   *   status: 'loading'|'empty'|'populated'|'unavailable',
   *   comments: Array,
   *   writeCapability: string,
   *   live: boolean,
   *   reason: string|null,
   *   maxDepth: number,
   * }} */
  let cached = {
    status: issueId ? 'loading' : 'unavailable',
    comments: [],
    writeCapability: 'denied-unknown',
    live: false,
    reason: issueId ? null : 'missing_issue_id',
    maxDepth,
  }

  function writeCapabilityFromProfile() {
    if (canWriteThreadsWithMe(profile)) return 'allowed'
    return 'unverified'
  }

  function snapshot() {
    return {
      status: cached.status,
      comments: Array.isArray(cached.comments) ? cached.comments.map((c) => ({ ...c })) : [],
      writeCapability: cached.writeCapability,
      live: cached.live,
      reason: cached.reason,
      maxDepth: cached.maxDepth,
    }
  }

  /**
   * Load knobs + tree via Closed ThreadsSocialClient only.
   * @returns {Promise<ReturnType<typeof snapshot>>}
   */
  async function load() {
    if (!issueId) {
      cached = {
        status: 'unavailable',
        comments: [],
        writeCapability: 'denied-unknown',
        live: false,
        reason: 'missing_issue_id',
        maxDepth,
      }
      return snapshot()
    }

    cached = {
      ...cached,
      status: 'loading',
      comments: [],
      live: true,
      reason: null,
      writeCapability: writeCapabilityFromProfile(),
    }

    try {
      const knobs = await ensureThreadsKnobsCached({ client })
      if (!knobs) {
        cached = {
          status: 'unavailable',
          comments: [],
          writeCapability: writeCapabilityFromProfile(),
          live: true,
          reason: 'knobs_unavailable',
          maxDepth,
        }
        return snapshot()
      }
      maxDepth = knobs.max_depth
      mediaAllowedTypes = Array.isArray(knobs.media_allowed_types)
        ? knobs.media_allowed_types.map(String)
        : []

      const treeResult = await client.getThreadTree(issueId)
      const mapped = mapThreadTreeToBlock(treeResult)
      cached = {
        status: mapped.status,
        comments: mapped.comments,
        writeCapability: writeCapabilityFromProfile(),
        live: true,
        reason: null,
        maxDepth,
      }
      return snapshot()
    } catch {
      cached = {
        status: 'unavailable',
        comments: [],
        writeCapability: writeCapabilityFromProfile(),
        live: true,
        reason: 'tree_unavailable',
        maxDepth,
      }
      return snapshot()
    }
  }

  /**
   * @param {{ body?: string, parentId?: string|null }} [payload]
   */
  async function postComment(payload = {}) {
    if (!issueId) {
      return { ok: false, reason: 'missing_issue_id' }
    }
    if (!canWriteThreadsWithMe(profile)) {
      return { ok: false, reason: 'verify' }
    }
    const body = typeof payload.body === 'string' ? payload.body.trim() : ''
    if (!body) return { ok: false, reason: 'empty-body' }

    const parentId =
      payload.parentId == null || payload.parentId === '' ? null : String(payload.parentId)

    if (parentId) {
      const parent = cached.comments.find((c) => c.id === parentId)
      if (parent && Number(parent.depth) >= maxDepth) {
        return { ok: false, reason: 'max_depth' }
      }
      const result = await client.replyComment({ issueId, body, parentId })
      if (result?.status === 'ok') {
        await load()
        return { ok: true }
      }
      return {
        ok: false,
        reason: result?.failKind || 'post_fail',
        title: 'Comment wasn’t posted.',
        detail: 'Your text is still here. Try again.',
      }
    }

    const result = await client.createComment({ issueId, body })
    if (result?.status === 'ok') {
      await load()
      return { ok: true }
    }
    return {
      ok: false,
      reason: result?.failKind || 'post_fail',
      title: 'Comment wasn’t posted.',
      detail: 'Your text is still here. Try again.',
    }
  }

  async function retry() {
    return load()
  }

  function setProfile(next) {
    profile = next ?? null
    cached = { ...cached, writeCapability: writeCapabilityFromProfile() }
  }

  function bindFocusRefresh() {
    return bindThreadsKnobsFocusRefresh({ client })
  }

  return {
    kind: 'live',
    issueId,
    get maxDepth() {
      return maxDepth
    },
    get mediaAllowedTypes() {
      return mediaAllowedTypes
    },
    snapshot,
    load,
    postComment,
    retry,
    setProfile,
    bindFocusRefresh,
  }
}
