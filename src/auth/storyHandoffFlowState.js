export const STORY_HANDOFF_PHASES = Object.freeze({
  RESOLVING: 'resolving',
  LOGIN_REQUIRED: 'login_required',
  PREVIEW: 'preview',
  VERIFY: 'verify',
  SUBMITTING: 'submitting',
  SUBMITTED: 'submitted',
  EXPIRED: 'expired',
  SERVICE_DOWN: 'service_down',
  EMPTY: 'empty',
})

export const DRAFT_ID_STORAGE_KEY = 'dogestonia.story_handoff.draft_id'
export const STORY_SUBMIT_PATH = '/story/submit'

/**
 * @param {string | null | undefined} draftId
 */
export function persistDraftId(draftId) {
  if (!draftId?.trim()) {
    return
  }
  try {
    sessionStorage.setItem(DRAFT_ID_STORAGE_KEY, draftId.trim())
  } catch {
    // sessionStorage unavailable
  }
}

/**
 * @returns {string | null}
 */
export function readDraftId() {
  try {
    return sessionStorage.getItem(DRAFT_ID_STORAGE_KEY)
  } catch {
    return null
  }
}

export function clearDraftId() {
  try {
    sessionStorage.removeItem(DRAFT_ID_STORAGE_KEY)
  } catch {
    // ignore
  }
}

/**
 * @param {string | null | undefined} draftId
 * @returns {string}
 */
export function buildStorySubmitPath(draftId) {
  if (!draftId?.trim()) {
    return STORY_SUBMIT_PATH
  }
  return `${STORY_SUBMIT_PATH}?draft_id=${encodeURIComponent(draftId.trim())}`
}

/**
 * @param {string | null | undefined} draftId
 * @returns {string}
 */
export function buildHandoffLoginPath(draftId) {
  const returnPath = buildStorySubmitPath(draftId)
  return `/login?next=${encodeURIComponent(returnPath)}`
}

/**
 * Resolve post-login return from `next` or `redirect` query (HashRouter-safe).
 * @param {string | null | undefined} next
 * @param {string | null | undefined} redirect
 * @returns {string}
 */
export function resolveHandoffReturnPath(next, redirect) {
  const candidate = next ?? redirect
  if (!candidate || typeof candidate !== 'string') {
    return '/board'
  }
  if (!candidate.startsWith('/') || candidate.startsWith('//')) {
    return '/board'
  }
  return candidate
}

/**
 * @param {string | null | undefined} phase
 * @returns {boolean}
 */
export function isDevHandoffPhase(phase) {
  return Boolean(phase && Object.values(STORY_HANDOFF_PHASES).includes(phase))
}
