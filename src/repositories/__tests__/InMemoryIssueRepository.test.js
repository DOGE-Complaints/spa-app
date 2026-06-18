import { describe, expect, it } from 'vitest'
import { createInMemoryIssueRepository } from '../InMemoryIssueRepository.js'

const seed = [
  {
    id: 'A',
    status: 'NEW',
    type: 'INCIDENT',
    labels: ['waste'],
    institution: { et: 'Haigekassa', ru: 'Haigekassa', en: 'Health Insurance Fund' },
    created_at: '2025-01-15T10:00:00Z',
    title: { et: 'A' },
    description: { et: 'A' },
  },
  {
    id: 'B',
    status: 'NEW',
    type: 'INCIDENT',
    labels: ['waste'],
    institution: { et: 'Riigikantselei', ru: 'Riigikantselei', en: 'Government Office' },
    created_at: '2025-02-08T15:20:00Z',
    title: { et: 'B' },
    description: { et: 'B' },
  },
]

describe('InMemoryIssueRepository applyReadFilters', () => {
  it('filters by institution and created_at bounds', async () => {
    const repo = createInMemoryIssueRepository(seed)

    const byInstitution = await repo.getIssues({ institution: 'Health Insurance Fund' })
    expect(byInstitution.map((item) => item.id)).toEqual(['A'])

    const byDate = await repo.getIssues({
      created_after: '2025-02-01',
      created_before: '2025-02-09',
    })
    expect(byDate.map((item) => item.id)).toEqual(['B'])
  })
})
