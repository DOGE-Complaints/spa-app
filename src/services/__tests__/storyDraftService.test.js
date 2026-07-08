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
  VerificationRequiredError,
} from '../storyDraftService.js'

describe('storyDraftService (mock mode)', () => {
  const service = createStoryDraftService('', true)

  beforeEach(() => {
    service._resetMockStore?.()
  })

  it('seeds and reads draft via getStoryDraft', async () => {
    const draftId = service._createMockDraftId?.()
    service._seedMockDraft?.(draftId)
    const payload = await service.getStoryDraft(draftId)
    expect(payload.narrative_title).toBeTruthy()
  })

  it('submits draft and returns submission_id', async () => {
    const draftId = service._createMockDraftId?.()
    service._seedMockDraft?.(draftId)
    const result = await service.submitStoryDraft(draftId)
    expect(result.submission_id).toBe(`mock-submission-${draftId}`)
    expect(result.status).toBe('under_review')
  })

  it('throws VerificationRequiredError when mock gate forced', async () => {
    const draftId = service._createMockDraftId?.()
    service._seedMockDraft?.(draftId)
    service._setMockForceVerificationRequired?.(true)
    await expect(service.submitStoryDraft(draftId)).rejects.toBeInstanceOf(VerificationRequiredError)
  })
})
