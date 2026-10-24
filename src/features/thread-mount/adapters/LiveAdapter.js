/**
 * LiveAdapter — thin wrap of ThreadsSocialClient only (CT-28 · CT-30 · Arch §15.1 / §16).
 * Replaces live-adapter-unwired · no second HTTP client · no invent paths.
 * CT-30: after create/reply ok → uploadAttachment per Ready File · soft-fail attach.
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
 *   client?: {
 *     getThreadTree: Function,
 *     createComment: Function,
 *     replyComment: Function,
 *     getKnobs: Function,
 *     uploadAttachment?: Function,
 *   },
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

  const emptyRootReactions = () => ({
    summaryMarks: null,
    aggregateCount: null,
    selected: [],
  })

  /** @type {{
   *   status: 'loading'|'empty'|'populated'|'unavailable',
   *   comments: Array,
   *   writeCapability: string,
   *   live: boolean,
   *   reason: string|null,
   *   maxDepth: number,
   *   threadRootReactions: { summaryMarks: Array|null, aggregateCount: number|null, selected: string[] },
   * }} */
  let cached = {
    status: issueId ? 'loading' : 'unavailable',
    comments: [],
    writeCapability: 'denied-unknown',
    live: false,
    reason: issueId ? null : 'missing_issue_id',
    maxDepth,
    threadRootReactions: emptyRootReactions(),
  }

  function writeCapabilityFromProfile() {
    if (canWriteThreadsWithMe(profile)) return 'allowed'
    return 'unverified'
  }

  function snapshot() {
    const root = cached.threadRootReactions || emptyRootReactions()
    return {
      status: cached.status,
      comments: Array.isArray(cached.comments) ? cached.comments.map((c) => ({ ...c })) : [],
      writeCapability: cached.writeCapability,
      live: cached.live,
      reason: cached.reason,
      maxDepth: cached.maxDepth,
      threadRootReactions: {
        summaryMarks: root.summaryMarks,
        aggregateCount: root.aggregateCount,
        selected: Array.isArray(root.selected) ? root.selected.map(String) : [],
      },
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
        threadRootReactions: emptyRootReactions(),
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
      threadRootReactions: emptyRootReactions(),
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
          threadRootReactions: emptyRootReactions(),
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
        threadRootReactions: mapped.threadRootReactions || emptyRootReactions(),
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
        threadRootReactions: emptyRootReactions(),
      }
      return snapshot()
    }
  }

  /**
   * Soft-fail upload Ready Files after body success (FR-CT-30.1 · 30.5 · 30.9).
   * CT-34: return outcomes so post can merge File / published_url onto tree map
   * (avoids text-only «Selected image» plate when tree omits bytes or URL).
   * @param {string} commentId
   * @param {Array} attachments
   * @returns {Promise<Array<{
   *   file: File,
   *   publishedUrl: string|null,
   *   refId: string|null,
   *   fileName?: string,
   *   kind?: string,
   * }>>}
   */
  async function uploadReadyAttachments(commentId, attachments) {
    /** @type {Array<{ file: File, publishedUrl: string|null, refId: string|null, fileName?: string, kind?: string }>} */
    const outcomes = []
    if (typeof client.uploadAttachment !== 'function') return outcomes
    const readyFiles = Array.isArray(attachments)
      ? attachments.filter(
          (a) =>
            a &&
            a.status === 'ready' &&
            typeof File !== 'undefined' &&
            a.file instanceof File,
        )
      : []
    for (const intent of readyFiles) {
      const fileName =
        typeof intent.fileName === 'string' && intent.fileName.trim()
          ? intent.fileName.trim()
          : typeof intent.file.name === 'string' && intent.file.name.trim()
            ? intent.file.name.trim()
            : undefined
      /** @type {{ file: File, publishedUrl: string|null, refId: string|null, fileName?: string, kind?: string }} */
      const row = {
        file: intent.file,
        publishedUrl: null,
        refId: null,
        kind: intent.kind || 'image',
        ...(fileName ? { fileName } : {}),
      }
      try {
        const mediaType =
          typeof intent.file.type === 'string' && intent.file.type.trim()
            ? intent.file.type.trim()
            : intent.mediaType || undefined
        const result = await client.uploadAttachment({
          issueId,
          commentId: String(commentId),
          file: intent.file,
          mediaType,
        })
        if (result?.status === 'ok' && result.data) {
          const pubRaw = result.data.published_url
          if (pubRaw !== undefined && pubRaw !== null && String(pubRaw).trim()) {
            row.publishedUrl = String(pubRaw).trim()
          }
          const refRaw = result.data.ref_id
          if (refRaw !== undefined && refRaw !== null && String(refRaw).trim()) {
            row.refId = String(refRaw).trim()
          }
        }
      } catch {
        /* soft-fail attach — body success held · File kept for local preview */
      }
      outcomes.push(row)
    }
    return outcomes
  }

  /**
   * CT-34 — after tree reload, keep local File and/or upload published_url on the
   * posted comment so CommentAttachmentPreview can paint an image (policy A held).
   * @param {string} commentId
   * @param {Array<{ file: File, publishedUrl: string|null, refId: string|null, fileName?: string, kind?: string }>} outcomes
   */
  function mergeAttachPreviewOutcomes(commentId, outcomes) {
    if (!Array.isArray(outcomes) || outcomes.length === 0) return
    const cid = String(commentId)
    cached = {
      ...cached,
      comments: (Array.isArray(cached.comments) ? cached.comments : []).map((c) => {
        if (!c || String(c.id) !== cid) return c
        const atts = Array.isArray(c.attachments)
          ? c.attachments.map((a) => (a && typeof a === 'object' ? { ...a } : a))
          : []
        let oi = 0
        for (let i = 0; i < atts.length && oi < outcomes.length; i += 1) {
          const a = atts[i]
          if (!a || typeof a !== 'object') continue
          const out = outcomes[oi]
          const kind = a.kind || out.kind || 'image'
          if (kind !== 'image' && !(typeof File !== 'undefined' && out.file instanceof File)) {
            continue
          }
          oi += 1
          const hasPub =
            typeof a.publishedUrl === 'string' && a.publishedUrl.trim() !== ''
          if (!hasPub && out.publishedUrl) {
            a.publishedUrl = out.publishedUrl
          }
          const hasFile =
            typeof File !== 'undefined' && a.file instanceof File
          if (!hasFile && typeof File !== 'undefined' && out.file instanceof File) {
            a.file = out.file
          }
          if (out.fileName && !(typeof a.fileName === 'string' && a.fileName.trim())) {
            a.fileName = out.fileName
          }
          if (out.refId && a.id == null) a.id = out.refId
          if (!a.status) a.status = 'ready'
          if (!a.kind) a.kind = kind
        }
        if (atts.length === 0) {
          for (const out of outcomes) {
            atts.push({
              id: out.refId || `local-preview-${cid}-${atts.length}`,
              status: 'ready',
              kind: out.kind || 'image',
              label: 'Selected image',
              origin: 'picker',
              publishedUrl: out.publishedUrl,
              ...(out.fileName ? { fileName: out.fileName } : {}),
              ...(typeof File !== 'undefined' && out.file instanceof File
                ? { file: out.file }
                : {}),
            })
          }
        }
        return { ...c, attachments: atts }
      }),
    }
  }

  /**
   * @param {{ body?: string, parentId?: string|null, attachments?: Array }} [payload]
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
    const attachments = Array.isArray(payload.attachments) ? payload.attachments : []

    if (parentId) {
      const parent = cached.comments.find((c) => c.id === parentId)
      if (parent && Number(parent.depth) >= maxDepth) {
        return { ok: false, reason: 'max_depth' }
      }
      const result = await client.replyComment({ issueId, body, parentId })
      if (result?.status === 'ok') {
        const commentId = result.data?.comment_id
        let outcomes = []
        if (commentId) outcomes = await uploadReadyAttachments(String(commentId), attachments)
        await load()
        if (commentId) mergeAttachPreviewOutcomes(String(commentId), outcomes)
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
      const commentId = result.data?.comment_id
      let outcomes = []
      if (commentId) outcomes = await uploadReadyAttachments(String(commentId), attachments)
      await load()
      if (commentId) mergeAttachPreviewOutcomes(String(commentId), outcomes)
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
