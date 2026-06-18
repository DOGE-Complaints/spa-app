import { describe, expect, it } from 'vitest'
import { ROUTING_DEMO_ISSUES } from '../mockIssues.js'
import { collectIssueSearchableText, issueMatchesSearchQuery } from '../issueSearchMatch.js'

describe('issueSearchMatch', () => {
  const de002 = ROUTING_DEMO_ISSUES.find((issue) => issue.id === 'DE-002')

  it('collects text from all locale fields on title and description', () => {
    const text = collectIssueSearchableText(de002)
    expect(text).toContain('Üleminek eestikeelsele õppele')
    expect(text).toContain('Переход на обучение на эстонском')
    expect(text).toContain('Transition to Estonian-language education')
  })

  it('matches ru substring when only ru locale has the term (cross-locale D-S1)', () => {
    expect(issueMatchesSearchQuery(de002, 'обучение')).toBe(true)
  })

  it('does not match unrelated query', () => {
    expect(issueMatchesSearchQuery(de002, 'pension')).toBe(false)
  })

  it('returns true for empty or whitespace query', () => {
    expect(issueMatchesSearchQuery(de002, '')).toBe(true)
    expect(issueMatchesSearchQuery(de002, '   ')).toBe(true)
  })

  it('supports transitional string fields', () => {
    expect(issueMatchesSearchQuery({ title: 'Hello World', description: '' }, 'world')).toBe(true)
  })

  it('is case-insensitive', () => {
    expect(issueMatchesSearchQuery(de002, 'ОБУЧЕНИЕ')).toBe(true)
  })
})
