import { supabase } from '../auth/supabaseClient.js'

const GATEWAY_BASE_URL = String(import.meta.env.VITE_GATEWAY_BASE_URL ?? '').trim().replace(/\/+$/, '')
const STORY_DRAFT_MOCK_MODE =
  import.meta.env.VITE_STORY_DRAFT_MOCK_MODE === 'true' || GATEWAY_BASE_URL.length === 0

/** @type {Map<string, Record<string, unknown>>} */
const mockDraftStore = new Map()
let mockDraftCounter = 0
let mockForceVerificationRequired = false
let mockForceUnauthorized = false
let mockForceNotFound = false
let mockForceServiceDown = false

export class VerificationRequiredError extends Error {
  /**
   * @param {Record<string, unknown>} [body]
   */
  constructor(body = {}) {
    super('verification_required')
    this.name = 'VerificationRequiredError'
    this.code = 'verification_required'
    this.body = body
    this.verify_url =
      body.verify_url ?? body.verification_url ?? '/verify?context=custom_gpt'
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

/**
 * @param {string} baseUrl
 * @param {string} path
 * @param {{ token?: string | null, method?: string, body?: string }} options
 */
async function gatewayFetch(baseUrl, path, { token, method = 'GET', body, ...options } = {}) {
  const accessToken = await getAccessToken(token)
  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...options.headers,
  }

  let response
  try {
    response = await fetch(`${baseUrl}${path}`, {
      method,
      ...options,
      headers,
      ...(body !== undefined ? { body } : {}),
    })
  } catch {
    throw new StoryDraftApiError('network_error', 0, {})
  }

  const responseBody = await response.json().catch(() => ({}))

  if (!response.ok) {
    const errorCode = responseBody?.error?.code ?? responseBody?.error ?? responseBody?.code
    if (errorCode === 'verification_required' || responseBody?.error === 'verification_required') {
      throw new VerificationRequiredError(responseBody)
    }
    throw new StoryDraftApiError(String(errorCode ?? 'unknown_error'), response.status, responseBody)
  }

  return responseBody?.data ?? responseBody
}

/** Default mock payload for handoff preview tests. */
export function createMockDraftPayload(overrides = {}) {
  return {
    narrative_title: { en: 'Test Story Title', et: 'Test Pealkiri', ru: 'Тестовый заголовок' },
    narrative_summary: { en: 'Short summary', et: 'Lühikokkuvõte', ru: 'Краткое описание' },
    narrative_description: {
      en: 'Full description body',
      et: 'Täielik kirjeldus',
      ru: 'Полное описание',
    },
    narrative_institution: { en: 'City Hall', et: 'Raekoda', ru: 'Ратуша' },
    narrative_canonical_type: 'civic_issue',
    narrative_canonical_labels: ['transparency', 'participation'],
    narrative_location_query: 'Tallinn, Estonia',
    narrative_session_language: 'en',
    ...overrides,
  }
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
     * @param {string} draftId
     * @param {string | null | undefined} [token]
     * @returns {Promise<Record<string, unknown>>}
     */
    async getStoryDraft(draftId, token) {
      if (mockMode) {
        if (mockForceUnauthorized) {
          throw new StoryDraftApiError('unauthorized', 401, {})
        }
        if (mockForceNotFound || !mockDraftStore.has(draftId)) {
          throw new StoryDraftApiError('draft_not_found', 404, {})
        }
        return { ...mockDraftStore.get(draftId) }
      }
      return gatewayFetch(baseUrl, `/story-drafts/${encodeURIComponent(draftId)}`, {
        method: 'GET',
        token,
      })
    },

    /**
     * @param {string} draftId
     * @param {string | null | undefined} [token]
     * @returns {Promise<{ submission_id: string, status: string }>}
     */
    async submitStoryDraft(draftId, token) {
      if (mockMode) {
        if (mockForceUnauthorized) {
          throw new StoryDraftApiError('unauthorized', 401, {})
        }
        if (mockForceServiceDown) {
          throw new StoryDraftApiError('service_unavailable', 503, {})
        }
        if (mockForceVerificationRequired) {
          throw new VerificationRequiredError({
            error: 'verification_required',
            verify_url: '/verify?context=custom_gpt',
          })
        }
        if (!mockDraftStore.has(draftId)) {
          throw new StoryDraftApiError('draft_not_found', 404, {})
        }
        mockDraftStore.delete(draftId)
        return {
          submission_id: `mock-submission-${draftId}`,
          status: 'under_review',
        }
      }
      return gatewayFetch(
        baseUrl,
        `/story-drafts/${encodeURIComponent(draftId)}/submit`,
        {
          method: 'POST',
          token,
          body: JSON.stringify({}),
        },
      )
    },

    /** @internal test helper — seed mock draft store */
    _seedMockDraft: mockMode
      ? (draftId, payload = createMockDraftPayload()) => {
          mockDraftStore.set(draftId, { ...payload })
          return draftId
        }
      : undefined,

    /** @internal test helper */
    _resetMockStore: mockMode
      ? () => {
          mockDraftStore.clear()
          mockDraftCounter = 0
          mockForceVerificationRequired = false
          mockForceUnauthorized = false
          mockForceNotFound = false
          mockForceServiceDown = false
        }
      : undefined,

    /** @internal test helper */
    _setMockForceVerificationRequired: mockMode
      ? (value) => {
          mockForceVerificationRequired = Boolean(value)
        }
      : undefined,

    /** @internal test helper */
    _setMockForceUnauthorized: mockMode
      ? (value) => {
          mockForceUnauthorized = Boolean(value)
        }
      : undefined,

    /** @internal test helper */
    _setMockForceNotFound: mockMode
      ? (value) => {
          mockForceNotFound = Boolean(value)
        }
      : undefined,

    /** @internal test helper */
    _setMockForceServiceDown: mockMode
      ? (value) => {
          mockForceServiceDown = Boolean(value)
        }
      : undefined,

    /** @internal test helper */
    _createMockDraftId: mockMode
      ? () => {
          mockDraftCounter += 1
          return `mock-draft-${mockDraftCounter}`
        }
      : undefined,
  }
}

export const storyDraftService = createStoryDraftService()
