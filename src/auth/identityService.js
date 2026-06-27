import { supabase } from './supabaseClient.js'

const IDENTITY_SERVICE_URL =
  import.meta.env.VITE_IDENTITY_SERVICE_URL ?? 'http://localhost:8100'
const IDENTITY_MOCK_MODE = import.meta.env.VITE_IDENTITY_MOCK_MODE === 'true'

const MOCK_ME = Object.freeze({
  supabase_user_id: 'mock-user-unverified',
  role: 'citizen',
  display_name: 'Demo User',
  avatar_url: null,
  eid_verified: false,
  phone_verified: false,
  phone_dial_prefix: null,
  phone_verified_at: null,
})

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
        return { ...MOCK_ME }
      }
      return identityFetch('/me', { token })
    },
  }
}

export const identityService = createIdentityService()
