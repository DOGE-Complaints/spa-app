import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { NEXT_FEED_FLAT_KEYS } from '../../../i18n/nextFeedDictionary.js'
import { FeedListMapToggle } from '../FeedListMapToggle.jsx'
import { FeedMapArea } from '../FeedMapArea.jsx'
import { isMapEligible, listPinCapableIssues } from '../../../map/issueGeo.js'

function renderUi(ui) {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

const t = (key) => key

const withGeo = {
  id: 'DEMO-NF03-1',
  type: 'IMPROVEMENT',
  status: 'PUBLISHED',
  title: 'With coords',
  labels: [],
  geo: { lat: 59.43, lon: 24.75, label: 'Tallinn' },
}

const withoutGeo = {
  id: 'DEMO-NF03-2',
  type: 'INCIDENT',
  status: 'PUBLISHED',
  title: 'No coords',
  labels: [],
}

describe('NF-03 feed list|map', () => {
  it('exposes nextFeed.map.* flat keys', () => {
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.map.listView')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.map.mapView')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.map.partial')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.map.error')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.map.unavailable')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.map.pinLabel')
  })

  it('toggle wires catalog list/map icons and disables map when ineligible', () => {
    const html = renderUi(
      <FeedListMapToggle view="list" onChange={() => {}} mapEligible={false} t={t} />,
    )
    expect(html).toContain('data-testid="feed-list-map-toggle"')
    expect(html).toContain('/icons/next-feed/actions/list-view.svg')
    expect(html).toContain('/icons/next-feed/actions/map-view.svg')
    expect(html).toContain('data-testid="feed-map-ineligible"')
    expect(html).toContain('disabled')
  })

  it('pins only numeric lat/lon; partial when subset', () => {
    const issues = [withGeo, withoutGeo]
    expect(listPinCapableIssues(issues)).toHaveLength(1)
    expect(isMapEligible(issues)).toBe(true)
    expect(isMapEligible([withoutGeo])).toBe(false)

    const html = renderUi(
      <FeedMapArea
        issues={issues}
        resolveLocalizedText={(v) => (typeof v === 'string' ? v : '')}
        t={t}
        feedUrlForBack="/next/feed"
        onReturnToList={() => {}}
      />,
    )
    expect(html).toContain('data-testid="feed-map-area"')
    expect(html).toContain('data-testid="feed-map-partial"')
    expect(html).toContain('data-pin-asset="/icons/next-feed/map/map-pin.svg"')
    expect(html).toContain('data-pin-raster="/icons/next-feed/map/map-pin.png"')
    expect(html).toContain('data-testid="board-issues-map"')
  })
})
