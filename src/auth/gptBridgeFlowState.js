export const GPT_BRIDGE_PHASES = Object.freeze({
  RESOLVING: 'resolving',
  LOGIN_REQUIRED: 'login_required',
  SIGNUP_REQUIRED: 'signup_required',
  VERIFY_REQUIRED: 'verify_required',
  SUCCESS: 'success',
  ALREADY_VERIFIED: 'already_verified',
})

export const GPT_BRIDGE_CONTEXT = 'custom_gpt'
export const OAUTH_REQUEST_ID_STORAGE_KEY = 'dogestonia.oauth_request_id'

/**
 * @param {string | null | undefined} oauthRequestId
 */
export function persistOAuthRequestId(oauthRequestId) {
  if (!oauthRequestId?.trim()) {
    return
  }
  try {
    sessionStorage.setItem(OAUTH_REQUEST_ID_STORAGE_KEY, oauthRequestId.trim())
  } catch {
    // sessionStorage unavailable
  }
}

/**
 * @returns {string | null}
 */
export function readOAuthRequestId() {
  try {
    return sessionStorage.getItem(OAUTH_REQUEST_ID_STORAGE_KEY)
  } catch {
    return null
  }
}

export function clearOAuthRequestId() {
  try {
    sessionStorage.removeItem(OAUTH_REQUEST_ID_STORAGE_KEY)
  } catch {
    // ignore
  }
}

/**
 * @param {string | null | undefined} context
 * @returns {boolean}
 */
export function isGptBridgeContext(context) {
  return String(context ?? '').trim() === GPT_BRIDGE_CONTEXT
}

/**
 * @param {string | null | undefined} oauthRequestId
 * @returns {boolean}
 */
export function hasOAuthRequestId(oauthRequestId) {
  return Boolean(String(oauthRequestId ?? readOAuthRequestId() ?? '').trim())
}

/**
 * Parse identity verify_url (absolute or hash path) into router path + search.
 * @param {string} verifyUrl
 * @returns {{ pathname: string, search: string }}
 */
export function parseVerifyUrl(verifyUrl) {
  const raw = String(verifyUrl ?? '').trim()
  if (!raw) {
    return { pathname: '/verify', search: `?context=${GPT_BRIDGE_CONTEXT}` }
  }
  try {
    const url = new URL(raw, window.location.origin)
    const hash = url.hash.startsWith('#') ? url.hash.slice(1) : url.hash
    if (hash) {
      const hashUrl = new URL(hash, window.location.origin)
      return {
        pathname: hashUrl.pathname || '/verify',
        search: hashUrl.search || `?context=${GPT_BRIDGE_CONTEXT}`,
      }
    }
    return {
      pathname: url.pathname || '/verify',
      search: url.search || `?context=${GPT_BRIDGE_CONTEXT}`,
    }
  } catch {
    if (raw.startsWith('/')) {
      const [pathname, query = ''] = raw.split('?')
      return {
        pathname: pathname || '/verify',
        search: query ? `?${query}` : `?context=${GPT_BRIDGE_CONTEXT}`,
      }
    }
    return { pathname: '/verify', search: `?context=${GPT_BRIDGE_CONTEXT}` }
  }
}
