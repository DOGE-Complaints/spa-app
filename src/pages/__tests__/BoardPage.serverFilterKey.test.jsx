import { describe, expect, it } from 'vitest'
import { serializeServerBoardQuery } from '../../router/boardQuery.js'

describe('BoardPage serverFilterKey regression', () => {
  it('server query key ignores search-only URL delta (fetch cadence guard)', () => {
    const withSearchA = serializeServerBoardQuery('?status=NEW&labels=waste&search=alpha')
    const withSearchB = serializeServerBoardQuery('?status=NEW&labels=waste&search=beta')
    const withoutSearch = serializeServerBoardQuery({
      status: ['NEW'],
      labels: ['waste'],
      type: '',
      search: 'ignored',
    })

    expect(withSearchA).toBe('?status=NEW&labels=waste')
    expect(withSearchB).toBe(withSearchA)
    expect(withoutSearch).toBe(withSearchA)
  })

  it('server query key changes when institution or date bounds change', () => {
    const base = serializeServerBoardQuery('?status=NEW')
    const withInstitution = serializeServerBoardQuery('?status=NEW&institution=Haigekassa')
    const withDate = serializeServerBoardQuery('?status=NEW&created_after=2025-01-01')

    expect(withInstitution).not.toBe(base)
    expect(withDate).not.toBe(base)
    expect(withInstitution).toBe('?status=NEW&institution=Haigekassa')
    expect(withDate).toBe('?status=NEW&created_after=2025-01-01')
  })
})
