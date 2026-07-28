import { describe, expect, it } from 'vitest'
import {
  RECEIPTS_STATES,
  RECORDS_STATES,
  REPUTATION_STATES,
  resolveContributionPreview,
} from '../contributionLayerState.js'

describe('resolveContributionPreview', () => {
  it('defaults to A1 empty / B1 empty / C1 later', () => {
    expect(resolveContributionPreview(null)).toEqual({
      receipts: RECEIPTS_STATES.EMPTY,
      records: RECORDS_STATES.EMPTY,
      reputation: REPUTATION_STATES.LATER,
    })
  })

  it('maps each module preview flag without changing others', () => {
    expect(resolveContributionPreview('receipts-populated').receipts).toBe(
      RECEIPTS_STATES.POPULATED,
    )
    expect(resolveContributionPreview('receipts-unavailable').receipts).toBe(
      RECEIPTS_STATES.UNAVAILABLE,
    )
    expect(resolveContributionPreview('records-populated').records).toBe(
      RECORDS_STATES.POPULATED,
    )
    expect(resolveContributionPreview('records-unavailable').records).toBe(
      RECORDS_STATES.UNAVAILABLE,
    )
    expect(resolveContributionPreview('reputation-available').reputation).toBe(
      REPUTATION_STATES.AVAILABLE,
    )
    expect(resolveContributionPreview('reputation-unavailable').reputation).toBe(
      REPUTATION_STATES.UNAVAILABLE,
    )
  })
})
