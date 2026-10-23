/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  StoryActivityApiError,
  fetchStoryActivity,
  formatStoryActivityCreatedLabel,
  mapStoryActivityPayload,
} from '../storyActivityService.js'

vi.mock('../../auth/supabaseClient.js', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(async () => ({
        data: { session: { access_token: 'tok-test' } },
      })),
    },
  },
}))

describe('storyActivityService', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        status: 200,
        json: async () => ({
          data: {
            metrics: { submitted: 2, published: 1, under_review: 1 },
            stories: [
              {
                story_id: 'ST-1',
                status: 'published',
                created_at: '2026-05-12T10:00:00Z',
              },
              {
                story_id: 'ST-2',
                status: 'under_review',
                created_at: '2026-05-08T10:00:00Z',
              },
            ],
          },
          trace_id: 't1',
        }),
      })),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('maps gateway payload without inventing rows', () => {
    const mapped = mapStoryActivityPayload({
      metrics: { submitted: 1, published: 0, under_review: 1 },
      stories: [{ story_id: 'A', status: 'under_review', created_at: '2026-01-01T00:00:00Z' }],
    })
    expect(mapped.metrics).toEqual({ submitted: 1, published: 0, underReview: 1 })
    expect(mapped.rows).toHaveLength(1)
    expect(mapped.rows[0].id).toBe('A')
    expect(mapped.rows[0].status).toBe('under_review')
    expect(mapped.rows[0].createdLabel).toBeTruthy()
  })

  it('maps empty stories to empty rows', () => {
    const mapped = mapStoryActivityPayload({
      metrics: { submitted: 0, published: 0, under_review: 0 },
      stories: [],
    })
    expect(mapped.rows).toEqual([])
    expect(mapped.metrics.submitted).toBe(0)
  })

  it('fetchStoryActivity calls GET /story-activity with Bearer', async () => {
    const result = await fetchStoryActivity({ baseUrl: 'http://gw.test' })
    expect(fetch).toHaveBeenCalledWith(
      'http://gw.test/story-activity',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({ Authorization: 'Bearer tok-test' }),
      }),
    )
    expect(result.rows.map((r) => r.id)).toEqual(['ST-1', 'ST-2'])
    expect(result.metrics.underReview).toBe(1)
  })

  it('throws StoryActivityApiError on HTTP failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: false,
        status: 503,
        json: async () => ({ error: { code: 'SERVICE_UNAVAILABLE' } }),
      })),
    )
    await expect(fetchStoryActivity({ baseUrl: 'http://gw.test' })).rejects.toBeInstanceOf(
      StoryActivityApiError,
    )
  })

  it('formatStoryActivityCreatedLabel returns string', () => {
    expect(formatStoryActivityCreatedLabel('2026-05-12T10:00:00Z')).toBeTruthy()
    expect(formatStoryActivityCreatedLabel('')).toBe('')
  })
})
