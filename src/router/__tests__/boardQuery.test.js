import { describe, expect, it } from 'vitest'
import { normalizeBoardSearch, parseBoardQuery, serializeBoardQuery, serializeServerBoardQuery } from '../boardQuery.js'

describe('boardQuery helpers', () => {
  it('parses supported keys and ignores unknown params', () => {
    const parsed = parseBoardQuery('?status=NEW,PUBLISHED,INVALID&type=INCIDENT&labels=waste,infrastructure&search=bridge&foo=bar')

    expect(parsed).toEqual({
      status: ['NEW', 'PUBLISHED'],
      type: 'INCIDENT',
      labels: ['waste', 'infrastructure'],
      search: 'bridge',
    })
  })

  it('serializes parsed contract to stable query', () => {
    const query = serializeBoardQuery({
      status: ['NEW', 'IN_REVIEW'],
      type: 'IMPROVEMENT',
      labels: ['waste', 'infrastructure'],
      search: 'road',
    })

    expect(query).toBe('?status=NEW%2CIN_REVIEW&type=IMPROVEMENT&labels=waste%2Cinfrastructure&search=road')
  })

  it('normalizes unknown query keys away', () => {
    expect(normalizeBoardSearch('?status=NEW&foo=bar&search=test')).toBe('?status=NEW&search=test')
  })

  it('serializeServerBoardQuery ignores search-only URL changes', () => {
    const withFoo = serializeServerBoardQuery('?status=NEW&search=foo')
    const withBar = serializeServerBoardQuery('?status=NEW&search=bar')
    const withoutSearch = serializeServerBoardQuery('?status=NEW')

    expect(withFoo).toBe(withBar)
    expect(withFoo).toBe(withoutSearch)
  })

  it('serializeServerBoardQuery changes when server filters change', () => {
    const statusNew = serializeServerBoardQuery('?status=NEW&search=bridge')
    const statusPublished = serializeServerBoardQuery('?status=PUBLISHED&search=bridge')

    expect(statusNew).not.toBe(statusPublished)
  })
})
