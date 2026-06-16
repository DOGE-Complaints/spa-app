import { describe, expect, it } from 'vitest'
import { AVAILABLE_LABELS } from '../../i18n/labelKeys.js'
import { ROUTING_DEMO_ISSUES } from '../mockIssues.js'

describe('ROUTING_DEMO_ISSUES seed', () => {
  it('includes at least one label outside curated AVAILABLE_LABELS core', () => {
    const core = new Set(AVAILABLE_LABELS)
    const outsideCore = ROUTING_DEMO_ISSUES.flatMap((issue) => issue.labels).filter((label) => !core.has(label))
    expect(outsideCore).toContain('cluster_transport')
  })
})
