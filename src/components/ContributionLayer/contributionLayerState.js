export const RECEIPTS_STATES = Object.freeze({
  EMPTY: 'empty',
  POPULATED: 'populated',
  UNAVAILABLE: 'unavailable',
})

export const RECORDS_STATES = Object.freeze({
  EMPTY: 'empty',
  POPULATED: 'populated',
  UNAVAILABLE: 'unavailable',
})

export const REPUTATION_STATES = Object.freeze({
  LATER: 'later',
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
})

/** Fixture for A2 layout (no contribution HTTP in MVP). */
export const CONTRIB_DEMO_RECEIPTS = Object.freeze({
  count: 12,
  items: Object.freeze([
    Object.freeze({ id: 'SR-2041', statusKey: 'published' }),
    Object.freeze({ id: 'SR-2038', statusKey: 'published' }),
    Object.freeze({ id: 'SR-2035', statusKey: 'underReview' }),
  ]),
})

/** Fixture for B2 layout. */
export const CONTRIB_DEMO_RECORDS = Object.freeze({
  count: 18,
  eventKeys: Object.freeze([
    'storySubmitted',
    'storyUpdated',
    'issueParticipated',
  ]),
})

/**
 * DEV-only: sessionStorage['doge.contrib-preview']
 * Single-module overrides; unspecified modules keep MVP defaults (A1/B1/C1).
 * @param {string | null | undefined} previewFlag
 */
export function resolveContributionPreview(previewFlag = null) {
  const resolved = {
    receipts: RECEIPTS_STATES.EMPTY,
    records: RECORDS_STATES.EMPTY,
    reputation: REPUTATION_STATES.LATER,
  }
  if (!previewFlag) return resolved

  const map = {
    'receipts-empty': () => {
      resolved.receipts = RECEIPTS_STATES.EMPTY
    },
    'receipts-populated': () => {
      resolved.receipts = RECEIPTS_STATES.POPULATED
    },
    'receipts-unavailable': () => {
      resolved.receipts = RECEIPTS_STATES.UNAVAILABLE
    },
    'records-empty': () => {
      resolved.records = RECORDS_STATES.EMPTY
    },
    'records-populated': () => {
      resolved.records = RECORDS_STATES.POPULATED
    },
    'records-unavailable': () => {
      resolved.records = RECORDS_STATES.UNAVAILABLE
    },
    'reputation-later': () => {
      resolved.reputation = REPUTATION_STATES.LATER
    },
    'reputation-available': () => {
      resolved.reputation = REPUTATION_STATES.AVAILABLE
    },
    'reputation-unavailable': () => {
      resolved.reputation = REPUTATION_STATES.UNAVAILABLE
    },
  }
  const apply = map[previewFlag]
  if (apply) apply()
  return resolved
}
