import { supabase } from '../auth/supabaseClient.js'
import { getVitePublicUrl } from '../config/publicEnv.js'

const GATEWAY_BASE_URL = getVitePublicUrl('VITE_GATEWAY_BASE_URL')

export class StoryActivityApiError extends Error {
  /**
   * @param {string} code
   * @param {number} status
   * @param {Record<string, unknown>} [body]
   */
  constructor(code, status, body = {}) {
    super(code)
    this.name = 'StoryActivityApiError'
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
 * @param {string} iso
 * @returns {string}
 */
export function formatStoryActivityCreatedLabel(iso) {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(iso))
  } catch {
    return String(iso)
  }
}

/**
 * Map gateway `GET /story-activity` data → StoryActivityCard props (no invent rows).
 * @param {{ metrics?: Record<string, unknown>, stories?: unknown[] } | null | undefined} data
 */
export function mapStoryActivityPayload(data) {
  const metricsIn = data?.metrics && typeof data.metrics === 'object' ? data.metrics : {}
  const stories = Array.isArray(data?.stories) ? data.stories : []
  const metrics = {
    submitted: Number(metricsIn.submitted) || 0,
    published: Number(metricsIn.published) || 0,
    underReview: Number(metricsIn.under_review ?? metricsIn.underReview) || 0,
  }
  const rows = stories.map((row, index) => {
    const raw = row && typeof row === 'object' ? row : {}
    const id = String(raw.story_id ?? raw.id ?? '').trim() || `row-${index}`
    const status = raw.status === 'published' ? 'published' : 'under_review'
    return {
      id,
      status,
      createdLabel: formatStoryActivityCreatedLabel(raw.created_at),
    }
  })
  return { metrics, rows }
}

/**
 * Authenticated `GET /story-activity` (GW-CAB-01).
 * @param {{ token?: string | null, baseUrl?: string }} [options]
 * @returns {Promise<{ metrics: { submitted: number, published: number, underReview: number }, rows: Array<{ id: string, status: string, createdLabel: string }> }>}
 */
export async function fetchStoryActivity(options = {}) {
  const baseUrl = (options.baseUrl ?? GATEWAY_BASE_URL).replace(/\/$/, '')
  if (!baseUrl) {
    throw new StoryActivityApiError('gateway_base_url_missing', 0, {})
  }
  const accessToken = await getAccessToken(options.token)
  if (!accessToken) {
    throw new StoryActivityApiError('unauthorized', 401, {})
  }

  let response
  try {
    response = await fetch(`${baseUrl}/story-activity`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
  } catch {
    throw new StoryActivityApiError('network_error', 0, {})
  }

  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    const errorCode =
      body?.error?.code ?? body?.error ?? body?.code ?? `http_${response.status}`
    throw new StoryActivityApiError(String(errorCode), response.status, body)
  }

  const payload = body?.data ?? body
  return mapStoryActivityPayload(payload)
}
