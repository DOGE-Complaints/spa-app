import { describe, expect, it } from 'vitest'
import { resolveLocalizedTextWithMeta } from '../../i18n/core.js'
import { AVAILABLE_LABELS } from '../../i18n/labelKeys.js'
import { ROUTING_DEMO_ISSUES } from '../mockIssues.js'

describe('ROUTING_DEMO_ISSUES seed', () => {
  it('includes at least one label outside curated AVAILABLE_LABELS core', () => {
    const core = new Set(AVAILABLE_LABELS)
    const outsideCore = ROUTING_DEMO_ISSUES.flatMap((issue) => issue.labels).filter((label) => !core.has(label))
    expect(outsideCore.length).toBe(0)
    expect(ROUTING_DEMO_ISSUES.every((issue) => issue.labels.every((label) => core.has(label)))).toBe(true)
  })

  it('includes DE-013 with empty-locale title for fallback-marker demo', () => {
    const demo = ROUTING_DEMO_ISSUES.find((issue) => issue.id === 'DE-013')
    expect(demo).toBeDefined()
    expect(demo.title.en).toBeUndefined()
    const meta = resolveLocalizedTextWithMeta(demo.title, 'en')
    expect(meta.usedFallback).toBe(true)
    expect(meta.resolvedLocale).toBe('et')
  })

  it('DE-013 institution triggers fallback when UI locale is missing on field', () => {
    const demo = ROUTING_DEMO_ISSUES.find((issue) => issue.id === 'DE-013')
    const meta = resolveLocalizedTextWithMeta(demo.institution, 'en')
    expect(meta.usedFallback).toBe(true)
    expect(meta.resolvedLocale).toBe('et')
  })
})
