import { describe, expect, it } from 'vitest'
import { normalizeBoardSearch, parseBoardQuery, serializeBoardQuery, serializeServerBoardQuery } from '../boardQuery.js'

describe('boardQuery helpers', () => {
  it('parses supported keys and ignores unknown params', () => {
    const parsed = parseBoardQuery(
      '?status=NEW,PUBLISHED,INVALID&type=INCIDENT&labels=waste,infrastructure&search=bridge&institution=Haigekassa&created_after=2025-01-01&created_before=2025-02-01&foo=bar',
    )

    expect(parsed).toEqual({
      status: ['NEW', 'PUBLISHED'],
      type: 'INCIDENT',
      labels: ['waste', 'infrastructure'],
      search: 'bridge',
      institution: 'Haigekassa',
      created_after: '2025-01-01',
      created_before: '2025-02-01',
      geo_district: [],
      geo_settlement: [],
      geo_region: [],
      geo_country: [],
      geo_postal_code: [],
    })
  })

  it('serializes parsed contract to stable query', () => {
    const query = serializeBoardQuery({
      status: ['NEW', 'IN_REVIEW'],
      type: 'IMPROVEMENT',
      labels: ['waste', 'infrastructure'],
      search: 'road',
      institution: 'Haigekassa',
      created_after: '2025-01-15',
      created_before: '2025-02-01',
    })

    expect(query).toBe(
      '?status=NEW%2CIN_REVIEW&type=IMPROVEMENT&labels=waste%2Cinfrastructure&search=road&institution=Haigekassa&created_after=2025-01-15&created_before=2025-02-01',
    )
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
    const withInstitution = serializeServerBoardQuery('?status=NEW&institution=Haigekassa')
    const withDate = serializeServerBoardQuery('?status=NEW&created_after=2025-01-01')

    expect(statusNew).not.toBe(statusPublished)
    expect(statusNew).not.toBe(withInstitution)
    expect(statusNew).not.toBe(withDate)
  })

  it('round-trips institution and date bounds', () => {
    const input = '?institution=Sotsiaalkindlustusamet&created_after=2025-01-15&created_before=2025-02-08'
    expect(serializeBoardQuery(parseBoardQuery(input))).toBe(input)
  })

  it('round-trips geo admin CSV params', () => {
    const input = '?geo_district=Kesklinn,Põhja-Tallinn&geo_settlement=Tallinn&geo_country=Eesti'
    const parsed = parseBoardQuery(input)
    expect(parsed.geo_district).toEqual(['Kesklinn', 'Põhja-Tallinn'])
    expect(parsed.geo_settlement).toEqual(['Tallinn'])
    expect(parsed.geo_country).toEqual(['Eesti'])
    expect(parseBoardQuery(serializeBoardQuery(parsed))).toEqual(parsed)
  })

  it('serializeServerBoardQuery changes when geo filters change', () => {
    const base = serializeServerBoardQuery('?status=NEW')
    const withGeo = serializeServerBoardQuery('?status=NEW&geo_district=Kesklinn')
    expect(base).not.toBe(withGeo)
  })
})
