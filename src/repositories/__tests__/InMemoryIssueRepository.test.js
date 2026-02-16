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

  it('filters by options.status array (multi-select OR)', async () => {
    const issues = [
      makeIssue({ id: 'A', status: ISSUE_STATUS.NEW }),
      makeIssue({ id: 'B', status: ISSUE_STATUS.VERIFIED }),
      makeIssue({ id: 'C', status: ISSUE_STATUS.IN_REVIEW }),
    ]
    const repo = createInMemoryIssueRepository(issues)

    const result = await repo.getIssues({ status: [ISSUE_STATUS.NEW, ISSUE_STATUS.VERIFIED] })

    expect(result).toHaveLength(2)
    expect(result.map((r) => r.id)).toEqual(['A', 'B'])
  })

  it('filters by options.labels (OR: issue has at least one label)', async () => {
    const issues = [
      makeIssue({ id: 'A', labels: ['infrastructure'] }),
      makeIssue({ id: 'B', labels: ['bureaucracy'] }),
      makeIssue({ id: 'C', labels: ['health'] }),
    ]
    const repo = createInMemoryIssueRepository(issues)

    const result = await repo.getIssues({ labels: ['bureaucracy', 'health'] })

    expect(result).toHaveLength(2)
    expect(result.map((r) => r.id)).toEqual(['B', 'C'])
  })
})
