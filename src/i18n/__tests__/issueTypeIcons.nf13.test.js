import { describe, expect, it } from 'vitest'
import {
  ISSUE_TYPE_ICON_BY_TYPE,
  issueTypeIconForType,
} from '../issueTypeIcons.js'

describe('NF-13 issueTypeIconForType (M161 exact map)', () => {
  it('maps each of 5 exact keys to catalog URL', () => {
    expect(issueTypeIconForType('INCIDENT')).toBe(
      '/icons/next-feed/types/ic-issue-type-INCIDENT.svg',
    )
    expect(issueTypeIconForType('complaint')).toBe(
      '/icons/next-feed/types/ic-issue-type-complaint.svg',
    )
    expect(issueTypeIconForType('system_bug')).toBe(
      '/icons/next-feed/types/ic-issue-type-system_bug.svg',
    )
    expect(issueTypeIconForType('observation')).toBe(
      '/icons/next-feed/types/ic-issue-type-observation.svg',
    )
    expect(issueTypeIconForType('absurdity')).toBe(
      '/icons/next-feed/types/ic-issue-type-absurdity.svg',
    )
    expect(Object.keys(ISSUE_TYPE_ICON_BY_TYPE)).toHaveLength(5)
  })

  it('does not alias lowercase incident → INCIDENT', () => {
    expect(issueTypeIconForType('incident')).toBeNull()
    expect(issueTypeIconForType('COMPLAINT')).toBeNull()
  })

  it('unknown / missing → null (omit)', () => {
    expect(issueTypeIconForType('IMPROVEMENT')).toBeNull()
    expect(issueTypeIconForType('')).toBeNull()
    expect(issueTypeIconForType(null)).toBeNull()
    expect(issueTypeIconForType(undefined)).toBeNull()
  })
})
