import { describe, expect, it } from 'vitest'
import {
  hasStoryDraftContent,
  isStoryGateOverlayPhase,
  STORY_GATE_PHASES,
} from '../../auth/storyGateFlowState.js'

describe('storyGateFlowState', () => {
  it('detects overlay phases', () => {
    expect(isStoryGateOverlayPhase(STORY_GATE_PHASES.VERIFICATION_REQUIRED)).toBe(true)
    expect(isStoryGateOverlayPhase(STORY_GATE_PHASES.COMPOSE)).toBe(false)
  })

  it('detects draft content', () => {
    expect(hasStoryDraftContent({ title: '', summary: '', content: '' })).toBe(false)
    expect(hasStoryDraftContent({ title: 'Hi', summary: '', content: '' })).toBe(true)
  })
})
