/**
 * CT-01 / CT-03 / CT-05 / ARCH §4.2 — named knobs; never magic literals in JSX.
 * VISUAL_INDENT_CAP ≠ maxDepth (M153): indent columns vs reply eligibility.
 * maxAttachments — pending local-intent ceiling (not published media).
 */

export const DEFAULT_MAX_DEPTH = 3
export const DEFAULT_MAX_ATTACHMENTS = 1
/** Visual indent columns only — not the reply permission limit. */
export const VISUAL_INDENT_CAP = 3
/** CT-21 M152c — forest nodes visible on first paint (DFS). */
export const DEFAULT_PREVIEW_NODE_BUDGET = 3
/** CT-21 M152c B/E — one-shot reveal control copy */
export const SHOW_MORE_COMMENTS_COPY = 'Show more comments'

export const MAX_DEPTH_REACHED_COPY = 'Maximum reply depth reached'

/** CT-06 M153 local branch disclosure — no invent branch-fetch HTTP */
export const BRANCH_LOADING_COPY = 'Loading replies…'
export const BRANCH_ERROR_TITLE = 'Couldn’t load replies'
export const BRANCH_ERROR_RETRY = 'Try again'
export const BRANCH_EXPAND_DELAY_MS = 400

/** CT-07 M157 VerifyWriteGate lab — literal copy · no invent Identity methods */
export const VERIFY_GATE_TITLE = 'Verify to participate'
export const VERIFY_GATE_BODY =
  'Verification is required before you can write in this discussion.'
export const VERIFY_GO_CTA = 'Go to verification'
export const VERIFY_NOT_NOW = 'Not now'
export const VERIFY_CIVIC_LINE = 'Civic node · DOGEstonia Identity'
export const VERIFY_CONTINUE_CTA = 'Verify to continue'
export const VERIFY_TRY_AGAIN = 'Try verification again'
export const VERIFY_CANCELLED_TITLE = 'Verification not completed'
export const VERIFY_FAILED_TITLE = 'Verification could not be completed'
export const VERIFY_DENIED_UNKNOWN =
  'Writing is unavailable right now. Try again later.'
export const VERIFY_STALE_COPY =
  'This discussion changed while you were away. Your draft is still here.'
export const VERIFY_STALE_STATUS = 'Issue closed'
export const VERIFY_SUCCESS_BADGE = 'Verified'
export const VERIFY_SUCCESS_HINT = 'You can continue your reply.'
export const VERIFY_HANDOFF_ROUTE = '/verify'
export const VERIFY_HANDOFF_HEADING = 'Verify your identity'
export const VERIFY_HANDOFF_RETURN =
  'After verification, you’ll return to Issue UV-024 and continue your reply.'
/** Session keys for lab stub handoff — not URL/analytics */
export const VERIFY_DRAFT_SESSION_KEY = 'tm-lab-verify-draft'
export const VERIFY_TARGET_SESSION_KEY = 'tm-lab-verify-target'

/**
 * View N replies — only when count derivable from complete local tree.
 * @param {number} count
 */
export function viewRepliesLabel(count) {
  const n = Math.floor(Number(count))
  if (!Number.isFinite(n) || n <= 0) return 'View replies'
  if (n === 1) return 'View replies'
  return `View ${n} replies`
}

/** M153b §7 / M153a D–E — denied item copy (local intent · no invent MIME) */
export const ATTACH_DENIED_TITLE = 'This attachment can’t be added.'
/** @deprecated alias — prefer ATTACH_DENIED_SAFETY_DETAIL for E only */
export const ATTACH_DENIED_DETAIL = 'It does not meet the required media safety rules.'
/** M153a E — only when safety decision known */
export const ATTACH_DENIED_SAFETY_DETAIL = 'It does not meet the required media safety rules.'
/** M153a D — type outside allow-list helper */
export const ATTACH_DENIED_TYPE_HELPER =
  'Allowed: images · PDF · Microsoft Office · Markdown (.md)'
/** When node capability unavailable — omit/disable Attach */
export const ATTACH_UNAVAILABLE_COPY = 'Attachments are unavailable here.'
export const ATTACH_READY_STATUS_COPY = 'Ready to post'
export const ATTACH_LOCAL_INTENT_COPY = 'Local intent · not published'

/** Default allow-list for fixture Attach control (not invent HTTP) */
export const DEFAULT_MEDIA_ALLOWED_TYPES = Object.freeze(['image', 'file'])

/**
 * CT-17/CT-22 M153a — operator family allow-list hook (images · PDF · Office · Markdown).
 * Exact MIME tables remain TBD — do not invent concrete MIME tables here.
 * CT-22: `.md` via family + extension (not invent full MIME).
 */
export const ATTACHMENT_FAMILY_ALLOWLIST = Object.freeze([
  'images',
  'pdf',
  'office',
  'markdown',
])
/** Placeholder for OP-approved MIME/extension table · null = fail-closed for non-image/non-.md */
export const ATTACHMENT_MIME_TABLE_TBD = null

/** CT-22 node preview honesty when no published URL */
export const ATTACH_NODE_LOCAL_PREVIEW_COPY = 'Local preview · not published'
/** CT-31 policy A — auth fetch in flight */
export const ATTACH_NODE_LOADING_COPY = 'Loading attachment…'
/** CT-31 policy A — auth fetch deny / null bytes */
export const ATTACH_NODE_UNAVAILABLE_COPY = 'Attachment unavailable'

/**
 * Coarse family probe only · no invented MIME allow-list.
 * `image/*` → images; `.md` / text/markdown → markdown;
 * without ATTACHMENT_MIME_TABLE_TBD, pdf/office stay unknown (fail-closed).
 * @param {File|{ type?: string, name?: string }|null|undefined} file
 * @returns {'images'|'pdf'|'office'|'markdown'|'unknown'}
 */
export function inferAttachmentFamily(file) {
  if (!file) return 'unknown'
  const type = typeof file.type === 'string' ? file.type.toLowerCase().trim() : ''
  const name = typeof file.name === 'string' ? file.name.toLowerCase().trim() : ''
  if (type.startsWith('image/')) return 'images'
  if (name.endsWith('.md') || type === 'text/markdown' || type === 'text/x-markdown') {
    return 'markdown'
  }
  /** Extension probe parallel to `.md` · not a full MIME invent table (ATTACHMENT_MIME_TABLE_TBD remains) */
  if (name.endsWith('.pdf') || type === 'application/pdf') return 'pdf'
  if (
    name.endsWith('.doc') ||
    name.endsWith('.docx') ||
    type === 'application/msword' ||
    type ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return 'office'
  }
  const table = ATTACHMENT_MIME_TABLE_TBD
  if (table && typeof table === 'object') {
    const hit = table[type]
    if (hit === 'pdf' || hit === 'office' || hit === 'images' || hit === 'markdown') return hit
  }
  return 'unknown'
}

/**
 * Map a native picker File → local AttachmentRef intent (origin=picker · never published).
 * Retains `file` for CT-22 local node preview (object URL) · no invent CDN.
 * @param {File|{ type?: string, name?: string }} file
 * @param {{ id: string, forceStatus?: 'ready'|'denied'|null, denyReason?: 'type'|'safety' }} opts
 */
export function buildAttachmentIntentFromPick(file, opts) {
  const id = opts?.id
  const family = inferAttachmentFamily(file)
  const allowed = ATTACHMENT_FAMILY_ALLOWLIST.includes(family)
  const status =
    opts?.forceStatus === 'ready' || opts?.forceStatus === 'denied'
      ? opts.forceStatus
      : allowed
        ? 'ready'
        : 'denied'
  const kind =
    family === 'images'
      ? 'image'
      : family === 'pdf'
        ? 'pdf'
        : family === 'office'
          ? 'office'
          : family === 'markdown'
            ? 'markdown'
            : 'file'
  const label =
    family === 'images'
      ? 'Selected image'
      : family === 'pdf'
        ? 'PDF document'
        : family === 'office'
          ? 'Office document'
          : family === 'markdown'
            ? 'Markdown file'
            : 'Selected file'
  /** D type mismatch vs E safety — never invent safety without known decision */
  const denyReason = status === 'denied' ? opts?.denyReason || 'type' : undefined
  const fileName =
    typeof file?.name === 'string' && file.name.trim() ? file.name.trim() : undefined
  const hasFile = typeof File !== 'undefined' && file instanceof File
  return {
    id,
    kind,
    label,
    status,
    family,
    origin: 'picker',
    ...(fileName ? { fileName } : {}),
    ...(hasFile ? { file } : {}),
    ...(denyReason ? { denyReason } : {}),
  }
}

/**
 * CT-22 — ready intents only for comment-node media (Denied stays composer-side).
 * @param {unknown} list
 */
export function readyAttachmentIntents(list) {
  if (!Array.isArray(list)) return []
  return list
    .filter((a) => a && typeof a === 'object' && a.status === 'ready' && a.id)
    .map((a) => ({ ...a }))
}

/** @typedef {'loading'|'empty'|'populated'|'unavailable'} ThreadMountStatus */

/**
 * @param {unknown} value
 * @param {number} [fallback]
 */
export function resolveMaxDepth(value, fallback = DEFAULT_MAX_DEPTH) {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback
}

/**
 * CT-21 — named previewNodeBudget resolve (like maxDepth · no JSX magic).
 * @param {unknown} value
 * @param {number} [fallback]
 */
export function resolvePreviewNodeBudget(value, fallback = DEFAULT_PREVIEW_NODE_BUDGET) {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback
}

/**
 * DFS collect node ids until budget exhausted (parent → children → next root).
 * @param {Array<{ id: string, children?: unknown[] }>} roots
 * @param {number} budget
 * @returns {Set<string>}
 */
export function collectDfsPreviewIds(roots, budget) {
  const visible = new Set()
  let remaining = resolvePreviewNodeBudget(budget)
  function walk(nodes) {
    for (const n of nodes || []) {
      if (remaining <= 0) return
      if (!n?.id) continue
      visible.add(String(n.id))
      remaining -= 1
      walk(n.children)
    }
  }
  walk(roots)
  return visible
}

/**
 * Prune tree to visible DFS id set (keeps hierarchy among kept nodes).
 * @param {Array<{ id: string, children?: unknown[] }>} nodes
 * @param {Set<string>} visibleIds
 */
export function pruneForestToIds(nodes, visibleIds) {
  return (nodes || [])
    .filter((n) => visibleIds.has(String(n.id)))
    .map((n) => ({
      ...n,
      children: pruneForestToIds(n.children || [], visibleIds),
    }))
}

/**
 * Count forest nodes (DFS walk).
 * @param {Array<{ children?: unknown[] }>} roots
 */
export function countForestNodes(roots) {
  let n = 0
  function walk(nodes) {
    for (const node of nodes || []) {
      n += 1
      walk(node.children)
    }
  }
  walk(roots)
  return n
}

/**
 * @param {unknown} value
 * @param {number} [fallback]
 */
export function resolveVisualIndentCap(value, fallback = VISUAL_INDENT_CAP) {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback
}

/**
 * @param {unknown} value
 * @param {number} [fallback]
 */
export function resolveMaxAttachments(value, fallback = DEFAULT_MAX_ATTACHMENTS) {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback
}

/**
 * Pending intents cannot exceed maxAttachments (named config — never JSX magic).
 * @param {unknown[]} intents
 * @param {unknown} maxAttachments
 */
export function clampAttachmentIntents(intents, maxAttachments) {
  const max = resolveMaxAttachments(maxAttachments)
  const list = Array.isArray(intents) ? intents : []
  if (max <= 0) return []
  return list.slice(0, max)
}

/**
 * @param {unknown} currentCount
 * @param {unknown} maxAttachments
 */
export function canAddAttachment(currentCount, maxAttachments) {
  const max = resolveMaxAttachments(maxAttachments)
  const n = Number(currentCount)
  if (!Number.isFinite(n) || n < 0) return max > 0
  return n < max
}

/**
 * Reply shown iff depth < maxDepth (config/props — never hardcode in JSX).
 * @param {unknown} depth
 * @param {unknown} maxDepth
 */
export function canReplyAtDepth(depth, maxDepth) {
  const d = Number(depth)
  const max = resolveMaxDepth(maxDepth)
  if (!Number.isFinite(d) || d < 0) return false
  return d < max
}

/**
 * Visual indent level capped separately from reply maxDepth.
 * @param {unknown} depth
 * @param {unknown} visualIndentCap
 */
export function visualIndentLevel(depth, visualIndentCap = VISUAL_INDENT_CAP) {
  const d = Number(depth)
  const cap = resolveVisualIndentCap(visualIndentCap)
  if (!Number.isFinite(d) || d < 0) return 0
  return Math.min(Math.floor(d), cap)
}
