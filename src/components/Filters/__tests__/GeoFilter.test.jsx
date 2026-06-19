/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { GeoFilter } from '../GeoFilter.jsx'

const t = (key) => key

describe('GeoFilter', () => {
  const emptyGeo = {
    geo_district: [],
    geo_settlement: [],
    geo_region: [],
    geo_country: [],
    geo_postal_code: [],
  }

  it('shows empty state when no options available', () => {
    const html = renderToStaticMarkup(
      <GeoFilter
        geo={emptyGeo}
        availableOptions={emptyGeo}
        onChange={() => {}}
        t={t}
        variant="panel"
      />,
    )
    expect(html).toContain('filterGeoEmpty')
  })

  it('renders dimension trigger when options exist', () => {
    const html = renderToStaticMarkup(
      <GeoFilter
        geo={emptyGeo}
        availableOptions={{
          ...emptyGeo,
          geo_district: ['Kesklinn'],
        }}
        onChange={() => {}}
        t={t}
        variant="panel"
      />,
    )
    expect(html).toContain('filterGeoDistrict')
    expect(html).toContain('data-geo-dimension="geo_district"')
  })

  it('hides dimensions with no available options', () => {
    const html = renderToStaticMarkup(
      <GeoFilter
        geo={emptyGeo}
        availableOptions={{
          ...emptyGeo,
          geo_district: ['Kesklinn'],
          geo_country: ['Eesti'],
        }}
        onChange={() => {}}
        t={t}
        variant="panel"
      />,
    )
    expect(html).toContain('data-geo-dimension="geo_district"')
    expect(html).toContain('data-geo-dimension="geo_country"')
    expect(html).not.toContain('data-geo-dimension="geo_settlement"')
    expect(html).not.toContain('data-geo-dimension="geo_region"')
    expect(html).not.toContain('data-geo-dimension="geo_postal_code"')
    expect(html).not.toContain('disabled')
  })
})
