import { describe, expect, it } from 'vitest'
import { normalizeBoardSearch, parseBoardQuery, serializeBoardQuery } from '../boardQuery.js'

describe('boardQuery helpers', () => {
  it('parses supported keys and ignores unknown params', () => {
    const parsed = parseBoardQuery('?status=NEW,VERIFIED,INVALID&type=complaint&labels=bureaucracy,infrastructure&search=bridge&foo=bar')

    expect(parsed).toEqual({
      status: ['NEW', 'VERIFIED'],
      type: 'complaint',
      labels: ['bureaucracy', 'infrastructure'],
      search: 'bridge',
    })
  })

  it('serializes parsed contract to stable query', () => {
    const query = serializeBoardQuery({
      status: ['NEW', 'IN_REVIEW'],
      type: 'observation',
      labels: ['bureaucracy', 'infrastructure'],
      search: 'road',
    })

    expect(query).toBe('?status=NEW%2CIN_REVIEW&type=observation&labels=bureaucracy%2Cinfrastructure&search=road')
  })

  it('normalizes unknown query keys away', () => {
    expect(normalizeBoardSearch('?status=NEW&foo=bar&search=test')).toBe('?status=NEW&search=test')
  })
})
