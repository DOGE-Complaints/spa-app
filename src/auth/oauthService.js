import { supabase } from './supabaseClient.js'
import { GPT_BRIDGE_CONTEXT } from './gptBridgeFlowState.js'
import { identityService } from './identityService.js'

const IDENTITY_SERVICE_URL =
  import.meta.env.VITE_IDENTITY_SERVICE_URL ?? 'http://localhost:8100'
const IDENTITY_MOCK_MODE = import.meta.env.VITE_IDENTITY_MOCK_MODE === 'true'

const MOCK_CHATGPT_REDIRECT =
  'https://chatgpt.com/mock-oauth-callback?code=mock-authorization-code&state=mock-state'

export class OAuthVerificationRequiredError extends Error {
  /**
   * @param {{ reason?: string, verify_url: string }} payload
   */
  constructor(payload) {
    super(payload.reason ?? 'verification_required')
    this.name = 'OAuthVerificationRequiredError'
    this.code = 'verification_required'
    this.reason = payload.reason ?? ''
    this.verify_url = payload.verify_url
  }
}

export class OAuthApiError extends Error {
  /**
   * @param {string} code
   * @param {number} status
   * @param {Record<string, unknown>} [body]
   */
  constructor(code, status, body = {}) {
    super(code)
    this.name = 'OAuthApiError'
    this.code = code
    this.status = status
    this.body = body
  }
}

async function getAccessToken(explicitToken) {
  if (explicitToken) {
    return explicitToken
  }
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.access_token ?? null
}

/**
 * @param {Response} response
 * @returns {Promise<Record<string, unknown>>}
 */
async function readResponseBody(response) {
  const text = await response.text()
  if (!text) {
    return {}
  }
  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}

/**
 * @param {string} oauthRequestId
 * @param {string | null | undefined} [token]
 * @returns {Promise<{ kind: 'redirect', location: string }>}
 */
async function completeOAuthAuthorizeLive(oauthRequestId, token) {
  const accessToken = await getAccessToken(token)
  if (!accessToken) {
    throw new OAuthApiError('AUTHENTICATION_REQUIRED', 401)
  }

  let response
  try {
    response = await fetch(`${IDENTITY_SERVICE_URL}/oauth/authorize/complete`, {
      method: 'POST',
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ oauth_request_id: oauthRequestId }),
    })
  } catch {
    throw new OAuthApiError('network_error', 0)
  }

  if (response.status === 302 || response.status === 303) {
    const location = response.headers.get('Location')
    if (!location) {
      throw new OAuthApiError('invalid_response', response.status)
    }
    return { kind: 'redirect', location }
  }

  const body = await readResponseBody(response)

  if (response.status === 403 && body?.error === 'verification_required') {
    throw new OAuthVerificationRequiredError({
      reason: typeof body.reason === 'string' ? body.reason : undefined,
      verify_url:
        typeof body.verify_url === 'string'
          ? body.verify_url
          : `${window.location.origin}${window.location.pathname}#/verify?context=${GPT_BRIDGE_CONTEXT}`,
    })
  }

  const errorCode =
    typeof body?.error === 'string'
      ? body.error
      : typeof body?.error_description === 'string'
        ? body.error_description
        : 'oauth_complete_failed'

  throw new OAuthApiError(errorCode, response.status, body)
}

/**
 * @param {string} oauthRequestId
 * @returns {Promise<{ kind: 'redirect', location: string }>}
 */
async function completeOAuthAuthorizeMock(oauthRequestId) {
  const id = oauthRequestId.trim()
  if (id === 'mock-oauth-verify') {
    throw new OAuthVerificationRequiredError({
      reason: 'Phone verification is required before this action can proceed.',
      verify_url: `${window.location.origin}${window.location.pathname}#/verify?context=${GPT_BRIDGE_CONTEXT}`,
    })
  }

  const profile = await identityService.fetchMe()
  if (!profile?.phone_verified && id !== 'mock-oauth-happy') {
    throw new OAuthVerificationRequiredError({
      reason: 'Phone verification is required before this action can proceed.',
      verify_url: `${window.location.origin}${window.location.pathname}#/verify?context=${GPT_BRIDGE_CONTEXT}`,
    })
  }

  return { kind: 'redirect', location: MOCK_CHATGPT_REDIRECT }
}

export function createOAuthService(baseUrl = IDENTITY_SERVICE_URL, mockMode = IDENTITY_MOCK_MODE) {
  void baseUrl
  return {
    /**
     * POST /oauth/authorize/complete — 302 redirect or flat 403 verification_required.
     * @param {string} oauthRequestId
     * @param {string | null | undefined} [token]
     * @returns {Promise<{ kind: 'redirect', location: string }>}
     */
    async completeOAuthAuthorize(oauthRequestId, token) {
      const requestId = String(oauthRequestId ?? '').trim()
      if (!requestId) {
        throw new OAuthApiError('invalid_request', 400)
      }
      if (mockMode) {
        return completeOAuthAuthorizeMock(requestId)
      }
      return completeOAuthAuthorizeLive(requestId, token)
    },
  }
}

export const oauthService = createOAuthService()
