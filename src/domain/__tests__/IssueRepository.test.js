import { describe, expect, it } from 'vitest'
import { assertIssueRepository, isIssueRepository } from '../IssueRepository.js'

describe('IssueRepository contract (read-side, MVP)', () => {
  it('accepts object with getIssues and getIssue methods', () => {
    const repo = {
      getIssues: async () => [],
      getIssue: async () => null,
    }

    expect(isIssueRepository(repo)).toBe(true)
    expect(assertIssueRepository(repo)).toBe(repo)
  })

  it('rejects object without getIssue', () => {
    const repo = {
      getIssues: async () => [],
    }

    expect(isIssueRepository(repo)).toBe(false)
    expect(() => assertIssueRepository(repo)).toThrow('Invalid IssueRepository')
  })

  it('rejects object without getIssues', () => {
    const repo = {
      getIssue: async () => null,
    }

    expect(isIssueRepository(repo)).toBe(false)
    expect(() => assertIssueRepository(repo)).toThrow('Invalid IssueRepository')
  })
})
