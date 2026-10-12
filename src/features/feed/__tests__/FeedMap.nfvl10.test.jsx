import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { NEXT_FEED_FLAT_KEYS } from '../../../i18n/nextFeedDictionary.js'
import { FeedMapArea } from '../FeedMapArea.jsx'
import {
  BoardMap,
  IssueMapPin,
  MapSubsetNotice,
  MapIssuePreview,
  MapAttribution,
  MapStatePanel,
} from '../map/index.js'

function renderUi(ui) {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

const t = (key) => key

const withGeo = {
  id: 'DEMO-VL10-1',
  type: 'IMPROVEMENT',
  status: 'PUBLISHED',
  title: 'With coords',
  labels: [],
  geo: { lat: 59.43, lon: 24.75, label: 'Tallinn' },
}

const withoutGeo = {
  id: 'DEMO-VL10-2',
  type: 'INCIDENT',
  status: 'PUBLISHED',
  title: 'No coords',
  labels: [],
}

describe('NF-VL-10 map chrome atoms', () => {
  it('exposes named DS map surfaces', () => {
    expect(renderUi(<MapSubsetNotice>partial</MapSubsetNotice>)).toContain(
      'data-vl-done-surface="MapSubsetNotice"',
    )
    expect(
      renderUi(
        <MapIssuePreview
          title="T"
          openHref="/next/feed/issue/1"
          openLabel="Open"
          onClose={() => {}}
        />,
      ),
    ).toContain('data-vl-done-surface="MapIssuePreview"')
    expect(renderUi(<MapAttribution />)).toContain('data-vl-done-surface="MapAttribution"')
    expect(renderUi(<MapStatePanel variant="error" title="err" />)).toContain(
      'data-vl-done-surface="MapStatePanel"',
    )
    expect(renderUi(<IssueMapPin state="rest" />)).toContain('data-vl-done-surface="IssueMapPin"')
  })

  it('FeedMapArea wires MapSubsetNotice + BoardMap + attribution (no invent HTTP)', () => {
    const html = renderUi(
      <FeedMapArea
        issues={[withGeo, withoutGeo]}
        resolveLocalizedText={(v) => (typeof v === 'string' ? v : '')}
        t={t}
        feedUrlForBack="/next/feed"
        onReturnToList={() => {}}
      />,
    )
    expect(html).toContain('data-vl-done-surface="MapSubsetNotice"')
    expect(html).toContain('data-testid="feed-map-partial"')
    expect(html).toContain('data-vl-done-surface="BoardMap"')
    expect(html).toContain('data-vl-done-surface="MapAttribution"')
    expect(html).toContain('data-testid="board-issues-map"')
    expect(html).toContain('data-pin-asset="/icons/next-feed/map/map-pin.svg"')
    expect(html).not.toContain('invent')
  })

  it('MapStatePanel covers error Return-to-List path', () => {
    const html = renderUi(
      <MapStatePanel
        variant="error"
        title="Map could not load"
        body={<p>unavailable</p>}
        actions={<button type="button">List</button>}
      />,
    )
    expect(html).toContain('data-testid="feed-map-error"')
    expect(html).toContain('data-map-state="error"')
  })

  it('BoardMap is a named adapter (showPartialHint off — parent owns notice)', () => {
    const html = renderUi(
      <BoardMap
        issues={[withGeo]}
        resolveLocalizedText={(v) => (typeof v === 'string' ? v : '')}
        t={t}
      />,
    )
    expect(html).toContain('data-vl-done-surface="BoardMap"')
    expect(html).not.toContain('data-testid="board-map-partial-hint"')
  })

  it('keeps closePreview dictionary key', () => {
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.map.closePreview')
  })
})
