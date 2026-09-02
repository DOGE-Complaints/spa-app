import { describe, expect, it } from 'vitest'
import {
  isIssuePinCapable,
  isMapEligible,
  issuesToPinGeoJson,
  listPinCapableIssues,
} from '../issueGeo.js'

describe('issueGeo SSR-03', () => {
  it('pin capability requires numeric lat+lon; detail_level insufficient', () => {
    expect(isIssuePinCapable({ id: 'a', geo: { lat: 59.4, lon: 24.7 } })).toBe(true)
    expect(isIssuePinCapable({ id: 'b', geo: { detail_level: 'point' } })).toBe(false)
    expect(isIssuePinCapable({ id: 'c', geo: { lat: '59.4', lon: 24.7 } })).toBe(false)
    expect(isIssuePinCapable({ id: 'd' })).toBe(false)
  })

  it('map eligible iff ≥1 pin-capable in resultset', () => {
    const issues = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B', geo: { lat: 59.4, lon: 24.7, label: 'Corner' } },
    ]
    expect(listPinCapableIssues(issues)).toHaveLength(1)
    expect(isMapEligible(issues)).toBe(true)
    expect(isMapEligible([{ id: 'x' }])).toBe(false)
  })

  it('GeoJSON features use lon,lat and civic title + optional label only', () => {
    const fc = issuesToPinGeoJson(
      [
        {
          id: 'ISS-1',
          title: { en: 'Lamp' },
          geo: { lat: 59.43, lon: 24.75, label: 'Corner', district: 'Kesklinn' },
          schema_card: { 'signals.urgency': 'high' },
        },
      ],
      (field) => (typeof field === 'object' && field ? field.en : String(field ?? '')),
    )
    expect(fc.features).toHaveLength(1)
    expect(fc.features[0].geometry.coordinates).toEqual([24.75, 59.43])
    expect(fc.features[0].properties).toEqual({
      id: 'ISS-1',
      title: 'Lamp',
      label: 'Corner',
    })
    expect(JSON.stringify(fc)).not.toContain('structured_payload')
    expect(JSON.stringify(fc)).not.toContain('schema_card')
  })
})
