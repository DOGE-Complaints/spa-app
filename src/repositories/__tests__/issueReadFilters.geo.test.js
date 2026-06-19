import { describe, expect, it } from 'vitest'
import {
  anyGeoAdminFilterActive,
  geoAdminPayloadMatches,
} from '../issueReadFilters.js'

describe('issueReadFilters geo helpers', () => {
  it('drops issues without geo when any geo filter is active', () => {
    const options = { geo_district: ['Kesklinn'] }
    expect(anyGeoAdminFilterActive(options)).toBe(true)
    expect(geoAdminPayloadMatches(undefined, options)).toBe(false)
    expect(geoAdminPayloadMatches(null, options)).toBe(false)
  })

  it('keeps issues without geo when no geo filters active', () => {
    expect(geoAdminPayloadMatches(undefined, {})).toBe(true)
  })

  it('matches district with normalize_geo_token semantics and diacritics', () => {
    const issueGeo = { district: 'Põhja-Tallinn', settlement: 'Tallinn' }
    expect(geoAdminPayloadMatches(issueGeo, { geo_district: ['põhja tallinn'] })).toBe(true)
    expect(geoAdminPayloadMatches(issueGeo, { geo_district: ['pohja-tallinn'] })).toBe(false)
  })

  it('requires all active dimensions to match (AND between dimensions)', () => {
    const issueGeo = { district: 'Kesklinn', country: 'Eesti' }
    expect(geoAdminPayloadMatches(issueGeo, { geo_district: ['Kesklinn'], geo_country: ['Eesti'] })).toBe(true)
    expect(geoAdminPayloadMatches(issueGeo, { geo_district: ['Kesklinn'], geo_country: ['Latvia'] })).toBe(false)
  })
})
