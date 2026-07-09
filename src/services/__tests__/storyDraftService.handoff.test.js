import { describe, expect, it, beforeEach, vi } from 'vitest'

vi.mock('../../auth/supabaseClient.js', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
    },
  },
}))

import {
  createStoryDraftService,
  createMockDraftPayload,
  normalizeSubmitResult,
  VerificationRequiredError,
  StoryDraftApiError,
} from '../storyDraftService.js'

describe('storyDraftService handoff (mock mode)', () => {
  const service = createStoryDraftService('', true)

  beforeEach(() => {
    service._resetMockStore?.()
  })

  it('getStoryDraft returns seeded payload', async () => {
    const draftId = service._createMockDraftId?.()
    service._seedMockDraft?.(draftId, createMockDraftPayload())
    const payload = await service.getStoryDraft(draftId, 'token')
    expect(payload.narrative_title?.en).toBe('Test Story Title')
  })

  it('getStoryDraft throws 404 when draft missing', async () => {
    await expect(service.getStoryDraft('gone', 'token')).rejects.toBeInstanceOf(StoryDraftApiError)
    await expect(service.getStoryDraft('gone', 'token')).rejects.toMatchObject({ status: 404 })
  })

  it('getStoryDraft throws 401 when unauthorized forced', async () => {
    service._setMockForceUnauthorized?.(true)
    await expect(service.getStoryDraft('any', 'token')).rejects.toMatchObject({ status: 401 })
  })

  it('submitStoryDraft returns submission_id', async () => {
    const draftId = service._createMockDraftId?.()
    service._seedMockDraft?.(draftId)
    const result = await service.submitStoryDraft(draftId, 'token')
    expect(result.submission_id).toBe(`mock-submission-${draftId}`)
    expect(result.status).toBe('under_review')
  })

  it('normalizeSubmitResult maps gateway story_id to submission_id', () => {
    const result = normalizeSubmitResult({
      schema_version: 'm2.story_intake_response.v1',
      story_id: 'a2e35351-4fc6-4ed7-a601-dae7a18e0d12',
      status: 'ready_for_profile',
    })
    expect(result.submission_id).toBe('a2e35351-4fc6-4ed7-a601-dae7a18e0d12')
    expect(result.story_id).toBe('a2e35351-4fc6-4ed7-a601-dae7a18e0d12')
    expect(result.status).toBe('ready_for_profile')
  })

  it('submitStoryDraft throws VerificationRequiredError when mock gate forced', async () => {
    const draftId = service._createMockDraftId?.()
    service._seedMockDraft?.(draftId)
    service._setMockForceVerificationRequired?.(true)
    await expect(service.submitStoryDraft(draftId)).rejects.toBeInstanceOf(VerificationRequiredError)
  })

  it('submitStoryDraft throws 503 when service down forced', async () => {
    const draftId = service._createMockDraftId?.()
    service._seedMockDraft?.(draftId)
    service._setMockForceServiceDown?.(true)
    await expect(service.submitStoryDraft(draftId)).rejects.toMatchObject({ status: 503 })
  })
})
