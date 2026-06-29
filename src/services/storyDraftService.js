import { supabase } from '../auth/supabaseClient.js'

const GATEWAY_BASE_URL = String(import.meta.env.VITE_GATEWAY_BASE_URL ?? '').trim().replace(/\/+$/, '')
const STORY_DRAFT_MOCK_MODE =
  import.meta.env.VITE_STORY_DRAFT_MOCK_MODE === 'true' || GATEWAY_BASE_URL.length === 0

/** @type {Map<string, { title: string, summary: string, content: string }>} */
const mockDraftStore = new Map()
let mockDraftCounter = 0
let mockForceVerificationRequired = false

export class VerificationRequiredError extends Error {
  /**
   * @param {Record<string, unknown>} [body]
   */
  constructor(body = {}) {
    super('verification_required')
    this.name = 'VerificationRequiredError'
    this.code = 'verification_required'
    this.body = body
  }
}

export class StoryDraftApiError extends Error {
  /**
   * @param {string} code
   * @param {number} status
   * @param {Record<string, unknown>} [body]
   */
  constructor(code, status, body = {}) {
    super(code)
    this.name = 'StoryDraftApiError'
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

async function gatewayFetch(path, { token, ...options } = {}) {
  const accessToken = await getAccessToken(token)
  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...options.headers,
  }

  let response
  try {
    response = await fetch(`${GATEWAY_BASE_URL}${path}`, {
      ...options,
      headers,
    })
  } catch {
    throw new StoryDraftApiError('network_error', 0, {})
  }

  const body = await response.json().catch(() => ({}))

  if (!response.ok) {
    const errorCode = body?.error?.code ?? body?.error ?? body?.code
    if (errorCode === 'verification_required' || body?.error === 'verification_required') {
      throw new VerificationRequiredError(body)
    }
    throw new StoryDraftApiError(String(errorCode ?? 'unknown_error'), response.status, body)
  }

  return body?.data ?? body
}

/**
 * @param {string} [baseUrl]
 * @param {boolean} [mockMode]
 */
export function createStoryDraftService(
  baseUrl = GATEWAY_BASE_URL,
  mockMode = STORY_DRAFT_MOCK_MODE,
) {
  return {
    /**
     * @param {{ title: string, summary: string, content: string }} payload
     * @param {string | null | undefined} [token]
     * @returns {Promise<{ draft_id: string }>}
     */
    async createStoryDraft(payload, token) {
      if (mockMode) {
        mockDraftCounter += 1
        const draftId = `mock-draft-${mockDraftCounter}`
        mockDraftStore.set(draftId, { ...payload })
        return { draft_id: draftId }
      }
      return gatewayFetch('/story-drafts', {
        method: 'POST',
        token,
        body: JSON.stringify(payload),
      })
    },

    /**
     * @param {string} draftId
     * @param {string | null | undefined} [token]
     * @returns {Promise<{ submission_id: string, status: string }>}
     */
    async submitStoryDraft(draftId, token) {
      if (mockMode) {
        if (mockForceVerificationRequired) {
          throw new VerificationRequiredError({
            error: 'verification_required',
            verification_url: '/verify',
          })
        }
        if (!mockDraftStore.has(draftId)) {
          throw new StoryDraftApiError('draft_not_found', 403, {})
        }
        return {
          submission_id: `mock-submission-${draftId}`,
          status: 'under_review',
        }
      }
      return gatewayFetch(`/story-drafts/${encodeURIComponent(draftId)}/submit`, {
        method: 'POST',
        token,
        body: JSON.stringify({}),
      })
    },

    /** @internal test helper */
    _resetMockStore: mockMode
      ? () => {
          mockDraftStore.clear()
          mockDraftCounter = 0
          mockForceVerificationRequired = false
        }
      : undefined,

    /** @internal test helper */
    _setMockForceVerificationRequired: mockMode
      ? (value) => {
          mockForceVerificationRequired = Boolean(value)
        }
      : undefined,
  }
}

export const storyDraftService = createStoryDraftService()
