import { describe, expect, it } from 'vitest'
import {
  isDiscussionPopulatedStatus,
  sortIssuesByDiscussionPriority,
} from '../sortIssuesByDiscussionPriority.js'

describe('sortIssuesByDiscussionPriority PH-12', () => {
  const a = { id: 'A' }
  const b = { id: 'B' }
  const c = { id: 'C' }

  it('boosts populated discussion first (mix)', () => {
    const flags = new Map([
      ['A', false],
      ['B', true],
      ['C', false],
    ])
    expect(sortIssuesByDiscussionPriority([a, b, c], flags).map((i) => i.id)).toEqual([
      'B',
      'A',
      'C',
    ])
  })

  it('preserves original order when all empty / no boost', () => {
    const flags = new Map([
      ['A', false],
      ['B', false],
      ['C', false],
    ])
    expect(sortIssuesByDiscussionPriority([a, b, c], flags).map((i) => i.id)).toEqual([
      'A',
      'B',
      'C',
    ])
  })

  it('preserves original order when all populated', () => {
    const flags = new Map([
      ['A', true],
      ['B', true],
      ['C', true],
    ])
    expect(sortIssuesByDiscussionPriority([a, b, c], flags).map((i) => i.id)).toEqual([
      'A',
      'B',
      'C',
    ])
  })

  it('keeps stable ties among equals (secondary = original index)', () => {
    const flags = { A: true, B: false, C: true, D: false }
    const d = { id: 'D' }
    expect(sortIssuesByDiscussionPriority([a, b, c, d], flags).map((i) => i.id)).toEqual([
      'A',
      'C',
      'B',
      'D',
    ])
  })

  it('missing / unavailable flags → no boost', () => {
    expect(sortIssuesByDiscussionPriority([a, b], null).map((i) => i.id)).toEqual(['A', 'B'])
    expect(sortIssuesByDiscussionPriority([a, b], new Map([['B', true]])).map((i) => i.id)).toEqual([
      'B',
      'A',
    ])
  })

  it('isDiscussionPopulatedStatus matches mapThreadTreeToBlock populated', () => {
    expect(isDiscussionPopulatedStatus('populated')).toBe(true)
    expect(isDiscussionPopulatedStatus('empty')).toBe(false)
    expect(isDiscussionPopulatedStatus('unavailable')).toBe(false)
    expect(isDiscussionPopulatedStatus('loading')).toBe(false)
  })

  it('returns [] for non-array input', () => {
    expect(sortIssuesByDiscussionPriority(null, new Map())).toEqual([])
  })
})
