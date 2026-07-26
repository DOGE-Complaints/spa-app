export const STORY_ACTIVITY_STATES = Object.freeze({
  ACTIVE: 'active',
  EMPTY: 'empty',
  DRAFT: 'draft',
  VERIFY_REQUIRED: 'verify_required',
  UNAVAILABLE: 'unavailable',
})

/** Fixture rows for State A UI layout (no gateway HTTP in MVP). */
export const STORY_ACTIVITY_DEMO_ROWS = Object.freeze([
  { id: 'DE-ST-2041', status: 'published', createdLabel: 'May 12, 2026' },
  { id: 'DE-ST-2038', status: 'under_review', createdLabel: 'May 8, 2026' },
  { id: 'DE-ST-2035', status: 'published', createdLabel: 'May 2, 2026' },
])

export const STORY_ACTIVITY_DEMO_METRICS = Object.freeze({
  submitted: 12,
  published: 8,
  underReview: 4,
})

/**
 * @param {string | null | undefined} previewFlag sessionStorage doge.story-activity-preview
 * @returns {keyof typeof STORY_ACTIVITY_STATES | null}
 */
export function mapStoryActivityPreviewFlag(previewFlag) {
  if (!previewFlag) return null
  const map = {
    active: STORY_ACTIVITY_STATES.ACTIVE,
    empty: STORY_ACTIVITY_STATES.EMPTY,
    draft: STORY_ACTIVITY_STATES.DRAFT,
    verify: STORY_ACTIVITY_STATES.VERIFY_REQUIRED,
    unavailable: STORY_ACTIVITY_STATES.UNAVAILABLE,
  }
  return map[previewFlag] ?? null
}

/**
 * MVP default = empty (layout + Go to Board). Explicit prop / DEV preview overrides.
 * @param {{ state?: string | null, previewFlag?: string | null }} input
 */
export function resolveStoryActivityState({ state = null, previewFlag = null } = {}) {
  if (
    state &&
    Object.values(STORY_ACTIVITY_STATES).includes(state)
  ) {
    return state
  }
  const fromPreview = mapStoryActivityPreviewFlag(previewFlag)
  if (fromPreview) return fromPreview
  return STORY_ACTIVITY_STATES.EMPTY
}
