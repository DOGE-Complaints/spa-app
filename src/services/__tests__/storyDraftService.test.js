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

  it('creates a draft and returns draft_id', async () => {
    const result = await service.createStoryDraft({
      title: 'Test',
      summary: 'Summary',
      content: 'Body',
    })
    expect(result.draft_id).toMatch(/^mock-draft-/)
  })

  it('submits draft and returns submission_id', async () => {
    const { draft_id: draftId } = await service.createStoryDraft({
      title: 'Test',
      summary: 'Summary',
      content: 'Body',
    })
    const result = await service.submitStoryDraft(draftId)
    expect(result.submission_id).toBe(`mock-submission-${draftId}`)
    expect(result.status).toBe('under_review')
  })

  it('throws VerificationRequiredError when mock gate forced', async () => {
    const { draft_id: draftId } = await service.createStoryDraft({
      title: 'Test',
      summary: 'Summary',
      content: 'Body',
    })
    service._setMockForceVerificationRequired?.(true)
    await expect(service.submitStoryDraft(draftId)).rejects.toBeInstanceOf(VerificationRequiredError)
  })
})
