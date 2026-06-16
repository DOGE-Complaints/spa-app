import { describe, expect, it } from 'vitest'
import { AVAILABLE_LABELS } from '../labelKeys.js'
import { collectLabelKeysFromIssues } from '../collectLabelKeysFromIssues.js'

describe('collectLabelKeysFromIssues', () => {
  it('returns sorted unique labels from issues and includes curated core by default', () => {
    const result = collectLabelKeysFromIssues([
      { labels: ['bureaucracy', 'cluster_transport'] },
      { labels: ['healthcare', 'cluster_transport', '  '] },
      { labels: ['zebra'] },
    ])

    expect(result).toEqual([...new Set([...AVAILABLE_LABELS, 'cluster_transport', 'healthcare', 'zebra'])].sort())
  })

  it('can build list from issues only when includeCore=false', () => {
    const result = collectLabelKeysFromIssues(
      [{ labels: ['cluster_transport'] }, { labels: ['bureaucracy'] }],
      { includeCore: false },
    )
    expect(result).toEqual(['bureaucracy', 'cluster_transport'])
  })

  it('handles malformed issue payload without crashing', () => {
    const result = collectLabelKeysFromIssues([null, {}, { labels: null }, { labels: ['tax'] }], { includeCore: false })
    expect(result).toEqual(['tax'])
  })
})
