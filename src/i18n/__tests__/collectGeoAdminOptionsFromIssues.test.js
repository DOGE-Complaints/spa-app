import { describe, expect, it } from 'vitest'
import { collectGeoAdminOptionsFromIssues } from '../collectGeoAdminOptionsFromIssues.js'

describe('collectGeoAdminOptionsFromIssues', () => {
  it('collects unique admin values per dimension from issue.geo', () => {
    const issues = [
      { geo: { district: 'Kesklinn', settlement: 'Tallinn', country: 'Eesti' } },
      { geo: { district: 'Põhja-Tallinn', settlement: 'Tallinn', country: 'Eesti' } },
      { id: 'no-geo' },
    ]

    const options = collectGeoAdminOptionsFromIssues(issues)

    expect(options.geo_district).toEqual(['Kesklinn', 'Põhja-Tallinn'])
    expect(options.geo_settlement).toEqual(['Tallinn'])
    expect(options.geo_country).toEqual(['Eesti'])
    expect(options.geo_region).toEqual([])
    expect(options.geo_postal_code).toEqual([])
  })
})
