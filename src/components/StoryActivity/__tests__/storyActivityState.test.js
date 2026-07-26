/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import {
  resolveStoryActivityState,
  STORY_ACTIVITY_STATES,
  mapStoryActivityPreviewFlag,
} from '../storyActivityState.js'

describe('storyActivityState', () => {
  it('defaults to empty', () => {
    expect(resolveStoryActivityState({})).toBe(STORY_ACTIVITY_STATES.EMPTY)
  })

  it('maps DEV preview flags', () => {
    expect(mapStoryActivityPreviewFlag('active')).toBe(STORY_ACTIVITY_STATES.ACTIVE)
    expect(mapStoryActivityPreviewFlag('verify')).toBe(STORY_ACTIVITY_STATES.VERIFY_REQUIRED)
    expect(resolveStoryActivityState({ previewFlag: 'draft' })).toBe(STORY_ACTIVITY_STATES.DRAFT)
  })

  it('explicit state wins over preview', () => {
    expect(
      resolveStoryActivityState({
        state: STORY_ACTIVITY_STATES.ACTIVE,
        previewFlag: 'empty',
      }),
    ).toBe(STORY_ACTIVITY_STATES.ACTIVE)
  })
})
