import { WAITLIST_ERROR_KINDS } from '../auth/waitlistFlowState.js'
import { getVitePublicString, getVitePublicUrl } from '../config/publicEnv.js'

const WAITLIST_API_URL = getVitePublicUrl('VITE_WAITLIST_API_URL')
const WAITLIST_API_ENABLED = getVitePublicString('VITE_WAITLIST_API_ENABLED') === 'true'
const WAITLIST_MOCK_MODE = !WAITLIST_API_ENABLED || WAITLIST_API_URL.length === 0

/** @type {Set<string>} */
const mockJoinedEmails = new Set()

export class WaitlistApiError extends Error {
  /**
   * @param {string} kind
   * @param {number} [status]
   * @param {Record<string, unknown>} [body]
   */
  constructor(kind, status = 0, body = {}) {
    super(kind)
    this.name = 'WaitlistApiError'
    this.kind = kind
    this.status = status
    this.body = body
  }
}

/**
 * @param {unknown} body
 * @returns {string}
 */
function mapApiErrorKind(body) {
  const code = body?.error?.code ?? body?.error ?? body?.code
  if (code === 'duplicate_request' || code === 'already_joined') {
    return WAITLIST_ERROR_KINDS.DUPLICATE_REQUEST
  }
  if (code === 'validation_error' || code === 'invalid_email') {
    return WAITLIST_ERROR_KINDS.VALIDATION_ERROR
  }
  if (code === 'service_unavailable') {
    return WAITLIST_ERROR_KINDS.SERVICE_UNAVAILABLE
  }
  return WAITLIST_ERROR_KINDS.NETWORK_ERROR
}

/**
 * @param {string} [baseUrl]
 * @param {boolean} [mockMode]
 */
export function createWaitlistService(baseUrl = WAITLIST_API_URL, mockMode = WAITLIST_MOCK_MODE) {
  return {
    /**
     * Join waitlist — mock-first until POST /waitlist contract is confirmed.
     * Does not create account, phone, or profile records (FR-07.5).
     * @param {{ email: string, country: string, organization?: string }} payload
     * @returns {Promise<{ status: 'joined', country: string }>}
     */
    async joinWaitlist({ email, country, organization }) {
      const normalizedEmail = String(email ?? '').trim().toLowerCase()
      const normalizedCountry = String(country ?? '').trim()

      if (!normalizedEmail || !normalizedEmail.includes('@')) {
        throw new WaitlistApiError(WAITLIST_ERROR_KINDS.VALIDATION_ERROR, 400)
      }

      if (mockMode) {
        if (normalizedEmail === 'network@test.com') {
          throw new WaitlistApiError(WAITLIST_ERROR_KINDS.NETWORK_ERROR, 0)
        }
        if (normalizedEmail === 'unavailable@test.com') {
          throw new WaitlistApiError(WAITLIST_ERROR_KINDS.SERVICE_UNAVAILABLE, 503)
        }
        if (normalizedEmail === 'duplicate@test.com' || mockJoinedEmails.has(normalizedEmail)) {
          throw new WaitlistApiError(WAITLIST_ERROR_KINDS.DUPLICATE_REQUEST, 409)
        }
        mockJoinedEmails.add(normalizedEmail)
        return { status: 'joined', country: normalizedCountry, organization: organization ?? null }
      }

      let response
      try {
        response = await fetch(`${baseUrl}/waitlist`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: normalizedEmail,
            country: normalizedCountry,
            organization: organization?.trim() || undefined,
          }),
        })
      } catch {
        throw new WaitlistApiError(WAITLIST_ERROR_KINDS.NETWORK_ERROR, 0)
      }

      const body = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new WaitlistApiError(mapApiErrorKind(body), response.status, body)
      }

      return {
        status: 'joined',
        country: normalizedCountry,
      }
    },

    /** @internal test helper */
    _resetMockStore: mockMode
      ? () => {
          mockJoinedEmails.clear()
        }
      : undefined,
  }
}

export const waitlistService = createWaitlistService()
