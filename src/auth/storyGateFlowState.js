export const STORY_GATE_PHASES = Object.freeze({
  COMPOSE: 'compose',
  VERIFICATION_REQUIRED: 'verification_required',
  DRAFT_SAVED: 'draft_saved',
  VERIFYING: 'verifying',
  VERIFICATION_COMPLETE: 'verification_complete',
  SUBMISSION_SUCCESS: 'submission_success',
})

/**
 * @typedef {{ title: string, summary: string, content: string }} StoryDraftFields
 */

/**
 * @param {string} phase
 * @returns {boolean}
 */
export function isStoryGateOverlayPhase(phase) {
  return (
    phase === STORY_GATE_PHASES.VERIFICATION_REQUIRED
    || phase === STORY_GATE_PHASES.DRAFT_SAVED
    || phase === STORY_GATE_PHASES.VERIFYING
    || phase === STORY_GATE_PHASES.VERIFICATION_COMPLETE
    || phase === STORY_GATE_PHASES.SUBMISSION_SUCCESS
  )
}

/**
 * @param {StoryDraftFields} fields
 * @returns {boolean}
 */
export function hasStoryDraftContent(fields) {
  return Boolean(
    String(fields?.title ?? '').trim()
    || String(fields?.summary ?? '').trim()
    || String(fields?.content ?? '').trim(),
  )
}
