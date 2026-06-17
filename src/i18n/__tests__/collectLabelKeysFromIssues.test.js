import { describe, expect, it } from 'vitest'
import { AVAILABLE_LABELS } from '../labelKeys.js'
import { collectLabelKeysFromIssues } from '../collectLabelKeysFromIssues.js'

describe('collectLabelKeysFromIssues', () => {
  it('returns sorted unique labels from issues and includes curated core by default', () => {
    const result = collectLabelKeysFromIssues([
      { labels: ['waste', 'road_safety'] },
      { labels: ['safety', 'road_safety', '  '] },
      { labels: ['zebra'] },
    ])

    expect(result).toEqual([...new Set([...AVAILABLE_LABELS, 'road_safety', 'zebra'])].sort())
  })

  it('can build list from issues only when includeCore=false', () => {
    const result = collectLabelKeysFromIssues(
      [{ labels: ['road_safety'] }, { labels: ['waste'] }],
      { includeCore: false },
    )
    expect(result).toEqual(['road_safety', 'waste'])
  })

  it('handles malformed issue payload without crashing', () => {
    const result = collectLabelKeysFromIssues([null, {}, { labels: null }, { labels: ['waste'] }], { includeCore: false })
    expect(result).toEqual(['waste'])
  })
})
