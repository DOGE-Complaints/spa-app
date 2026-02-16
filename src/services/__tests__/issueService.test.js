import { describe, expect, it, vi } from 'vitest'
import { ISSUE_STATUS, ISSUE_TYPE } from '../../domain/types.js'
import { createIssueService, issueService } from '../issueService.js'

function makeIssue(overrides = {}) {
  return {
    id: 'DE-100',
    type: ISSUE_TYPE.COMPLAINT,
    title: 'Bridge maintenance delay',
    status: ISSUE_STATUS.NEW,
    labels: ['infrastructure'],
    ...overrides,
  }
}

describe('issueService facade (read-side)', () => {
  it('delegates getIssues(options) to repository and returns the same result', async () => {
    const repoResult = [makeIssue()]
    const repo = {
      getIssues: vi.fn().mockResolvedValue(repoResult),
      getIssue: vi.fn(),
    }
    const service = createIssueService(repo)
    const options = { status: ISSUE_STATUS.NEW }

    const result = await service.getIssues(options)

    expect(repo.getIssues).toHaveBeenCalledTimes(1)
    expect(repo.getIssues).toHaveBeenCalledWith(options)
    expect(result).toBe(repoResult)
  })

  it('delegates getIssue(id) to repository and returns the same result', async () => {
    const repoResult = makeIssue({ id: 'DE-101' })
    const repo = {
      getIssues: vi.fn(),
      getIssue: vi.fn().mockResolvedValue(repoResult),
    }
    const service = createIssueService(repo)

    const result = await service.getIssue('DE-101')

    expect(repo.getIssue).toHaveBeenCalledTimes(1)
    expect(repo.getIssue).toHaveBeenCalledWith('DE-101')
    expect(result).toBe(repoResult)
  })

  it('throws when repository does not satisfy IssueRepository contract', () => {
    expect(() => createIssueService({ getIssues: async () => [] })).toThrow('Invalid IssueRepository')
  })

  it('does not expose createIssue in MVP read-side facade', () => {
    const repo = {
      getIssues: vi.fn().mockResolvedValue([]),
      getIssue: vi.fn().mockResolvedValue(null),
    }
    const service = createIssueService(repo)

    expect('createIssue' in service).toBe(false)
  })

  it('exports default issueService with in-memory repository for dev (seeded with demo issues)', async () => {
    const list = await issueService.getIssues()
    expect(Array.isArray(list)).toBe(true)
    expect(list.length).toBeGreaterThanOrEqual(1)
    expect(list[0]).toHaveProperty('id', 'DE-042')
  })
})
