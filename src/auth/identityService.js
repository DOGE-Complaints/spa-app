import { supabase } from './supabaseClient.js'

const IDENTITY_SERVICE_URL =
  import.meta.env.VITE_IDENTITY_SERVICE_URL ?? 'http://localhost:8100'
const IDENTITY_MOCK_MODE = import.meta.env.VITE_IDENTITY_MOCK_MODE === 'true'

const MOCK_ME_BASE = Object.freeze({
  supabase_user_id: 'mock-user-unverified',
  role: 'citizen',
  display_name: 'Demo User',
  avatar_url: null,
  eid_verified: false,
  phone_verified: false,
  phone_dial_prefix: null,
  phone_verified_at: null,
})

/** @type {Record<string, unknown>} */
let mockProfileState = { ...MOCK_ME_BASE }

function resetMockProfile() {
  mockProfileState = { ...MOCK_ME_BASE }
}

function getMockProfile() {
  let merged = { ...mockProfileState }
  if (typeof sessionStorage !== 'undefined') {
    const overrideRaw = sessionStorage.getItem('doge.mock-profile')
    if (overrideRaw) {
      try {
        merged = { ...merged, ...JSON.parse(overrideRaw) }
      } catch {
        // ignore invalid override
      }
    }
  }
  return merged
}

export class AuthenticationRequiredError extends Error {
  constructor(message = 'AUTHENTICATION_REQUIRED') {
    super(message)
    this.name = 'AuthenticationRequiredError'
    this.code = 'AUTHENTICATION_REQUIRED'
  }
}

export class IdentityApiError extends Error {
  constructor(code, status, body = {}) {
    super(code)
    this.name = 'IdentityApiError'
    this.code = code
    this.status = status
    this.body = body
  }
}

/** @type {Record<string, { code: string, status: number, traceId?: string }>} */
const MOCK_REQUEST_PHONE_ERRORS = Object.freeze({
  '+37288888888': { code: 'COUNTRY_NOT_ALLOWED', status: 400, traceId: 'mock-country-not-allowed' },
  '+37277777777': { code: 'RATE_LIMITED', status: 400, traceId: 'mock-rate-limited' },
  '+37266666666': { code: 'SEND_FAILED', status: 503, traceId: 'mock-send-failed' },
  '+37255555556': { code: 'profile_conflict', status: 409, traceId: 'mock-profile-conflict' },
  '+37244444444': { code: 'PROVIDER_UNAVAILABLE', status: 503, traceId: 'mock-provider-unavailable' },
  '+37233333333': { code: 'network_error', status: 0, traceId: 'mock-network-error' },
})

/** @type {Record<string, { code: string, status: number, traceId?: string }>} */
const MOCK_CONFIRM_OTP_ERRORS = Object.freeze({
  '999999': { code: 'CODE_MISMATCH', status: 400, traceId: 'puppeteer-smoke-trace' },
  '888888': { code: 'CODE_EXPIRED', status: 400, traceId: 'mock-code-expired' },
  '777777': { code: 'TOO_MANY_ATTEMPTS', status: 400, traceId: 'mock-too-many-attempts' },
  '666666': { code: 'AUTHENTICATION_REQUIRED', status: 401, traceId: 'mock-auth-required' },
  '555555': { code: 'session_expired', status: 401, traceId: 'mock-session-expired' },
})

/**
 * @param {{ code: string, status: number, traceId?: string }} spec
 */
function throwMockIdentityApiError(spec) {
  const body = spec.traceId ? { error: { trace_id: spec.traceId } } : {}
  throw new IdentityApiError(spec.code, spec.status, body)
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

async function identityFetch(path, { token, ...options } = {}) {
  const accessToken = await getAccessToken(token)
  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...options.headers,
  }

  let response
  try {
    response = await fetch(`${IDENTITY_SERVICE_URL}${path}`, {
      ...options,
      headers,
    })
  } catch {
    throw new IdentityApiError('network_error', 0, {})
  }

  const body = await response.json().catch(() => ({}))

  if (!response.ok) {
    const code = body?.error?.code ?? 'unknown_error'
    if (response.status === 401 || code === 'AUTHENTICATION_REQUIRED') {
      throw new AuthenticationRequiredError(code)
    }
    throw new IdentityApiError(code, response.status, body)
  }

  return body?.data ?? body
}

export function createIdentityService(baseUrl = IDENTITY_SERVICE_URL, mockMode = IDENTITY_MOCK_MODE) {
  return {
    /**
     * GET /me — profile after login.
     * @param {string | null | undefined} [token]
     */
    async fetchMe(token) {
      if (mockMode) {
        return getMockProfile()
      }
      return identityFetch('/me', { token })
    },

    /**
     * POST /auth/phone/request — send OTP after disclosure.
     * @param {string} phone E.164 (+372…)
     * @param {string | null | undefined} [token]
     * @returns {Promise<{ sent: boolean, expires_at: string }>}
     */
    async requestPhoneVerification(phone, token) {
      if (mockMode) {
        const requestError = MOCK_REQUEST_PHONE_ERRORS[phone]
        if (requestError) {
          throwMockIdentityApiError(requestError)
        }
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString()
        return { sent: true, expires_at: expiresAt }
      }
      return identityFetch('/auth/phone/request', {
        method: 'POST',
        token,
        body: JSON.stringify({ phone }),
      })
    },

    /**
     * POST /auth/phone/confirm — verify OTP.
     * @param {string} phone
     * @param {string} code
     * @param {string | null | undefined} [token]
     * @returns {Promise<{ status: 'verified' }>}
     */
    async confirmPhoneVerification(phone, code, token) {
      if (mockMode) {
        if (!/^\d{6}$/.test(code)) {
          throw new IdentityApiError('invalid_code', 400, {})
        }
        const confirmError = MOCK_CONFIRM_OTP_ERRORS[code]
        if (confirmError) {
          throwMockIdentityApiError(confirmError)
        }
        mockProfileState = {
          ...mockProfileState,
          phone_verified: true,
          phone_dial_prefix: '+372',
          phone_verified_at: new Date().toISOString(),
        }
        return { status: 'verified' }
      }
      return identityFetch('/auth/phone/confirm', {
        method: 'POST',
        token,
        body: JSON.stringify({ phone, code }),
      })
    },

    /** @internal test helper */
    _resetMockProfile: mockMode ? resetMockProfile : undefined,
  }
}

export const identityService = createIdentityService()
