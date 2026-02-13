import { describe, expect, it } from 'vitest'
import { assertIssueRepository } from '../../domain/IssueRepository.js'
import { ISSUE_STATUS, ISSUE_TYPE } from '../../domain/types.js'
import { createInMemoryIssueRepository } from '../InMemoryIssueRepository.js'

function makeIssue(overrides = {}) {
  return {
    id: 'DE-001',
    type: ISSUE_TYPE.COMPLAINT,
    title: 'Street light failure',
    status: ISSUE_STATUS.NEW,
    labels: ['infrastructure'],
    ...overrides,
  }
}

describe('InMemoryIssueRepository (read-side)', () => {
  it('returns empty list when initialized without issues', async () => {
    const repo = createInMemoryIssueRepository()

    const items = await repo.getIssues()

    expect(items).toEqual([])
  })

  it('returns issue by id or null when absent', async () => {
    const existing = makeIssue({ id: 'DE-002' })
    const repo = createInMemoryIssueRepository([existing])

    await expect(repo.getIssue('DE-002')).resolves.toEqual(existing)
    await expect(repo.getIssue('DE-404')).resolves.toBeNull()
  })

  it('conforms to read-side IssueRepository contract', () => {
    const repo = createInMemoryIssueRepository()
    expect(assertIssueRepository(repo)).toBe(repo)
  })

  it('does not expose createIssue in MVP', () => {
    const repo = createInMemoryIssueRepository()
    expect('createIssue' in repo).toBe(false)
  })
})
