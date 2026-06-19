import { describe, expect, it } from 'vitest'
import { ISSUE_STATUS, ISSUE_TYPE } from '../../domain/types.js'
import { createInMemoryIssueRepository } from '../InMemoryIssueRepository.js'

describe('InMemoryIssueRepository geo filters', () => {
  const seed = [
    {
      id: 'with-geo',
      status: ISSUE_STATUS.NEW,
      type: ISSUE_TYPE.INCIDENT,
      labels: ['district'],
      title: 'A',
      geo: { district: 'Kesklinn', settlement: 'Tallinn', country: 'Eesti' },
    },
    {
      id: 'without-geo',
      status: ISSUE_STATUS.NEW,
      type: ISSUE_TYPE.INCIDENT,
      labels: ['district'],
      title: 'B',
    },
    {
      id: 'other-district',
      status: ISSUE_STATUS.NEW,
      type: ISSUE_TYPE.INCIDENT,
      labels: ['district'],
      title: 'C',
      geo: { district: 'Lasnamäe', settlement: 'Tallinn', country: 'Eesti' },
    },
  ]

  it('filters by geo_district and drops issues without geo', async () => {
    const repo = createInMemoryIssueRepository(seed)
    const items = await repo.getIssues({ geo_district: ['Kesklinn'] })
    expect(items.map((item) => item.id)).toEqual(['with-geo'])
  })

  it('returns all issues when no geo filters active', async () => {
    const repo = createInMemoryIssueRepository(seed)
    const items = await repo.getIssues({})
    expect(items).toHaveLength(3)
  })
})
