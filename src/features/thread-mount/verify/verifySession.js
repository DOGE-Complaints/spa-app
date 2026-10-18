import {
  VERIFY_DRAFT_SESSION_KEY,
  VERIFY_TARGET_SESSION_KEY,
} from '../config/threadMountConfig.js'

/**
 * Lab stub session draft/target — no URL invent · no analytics.
 * @param {{ draft?: string, targetId?: string|null }} payload
 */
export function persistVerifyIntent(payload) {
  if (typeof sessionStorage === 'undefined') return
  const draft = typeof payload?.draft === 'string' ? payload.draft : ''
  const target = payload?.targetId == null ? '' : String(payload.targetId)
  try {
    sessionStorage.setItem(VERIFY_DRAFT_SESSION_KEY, draft)
    sessionStorage.setItem(VERIFY_TARGET_SESSION_KEY, target)
  } catch {
    /* ignore quota */
  }
}

/** @returns {{ draft: string, targetId: string|null }} */
export function readVerifyIntent() {
  if (typeof sessionStorage === 'undefined') return { draft: '', targetId: null }
  try {
    const draft = sessionStorage.getItem(VERIFY_DRAFT_SESSION_KEY) || ''
    const raw = sessionStorage.getItem(VERIFY_TARGET_SESSION_KEY) || ''
    return { draft, targetId: raw || null }
  } catch {
    return { draft: '', targetId: null }
  }
}

export function clearVerifyIntent() {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.removeItem(VERIFY_DRAFT_SESSION_KEY)
    sessionStorage.removeItem(VERIFY_TARGET_SESSION_KEY)
  } catch {
    /* ignore */
  }
}
