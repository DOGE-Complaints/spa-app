import { useMemo, useState } from 'react'
import { listPinCapableIssues } from '../../map/issueGeo.js'
import { Button } from '../../components/Button'
import { BoardMap, MapSubsetNotice, MapStatePanel } from './map/index.js'
import './FeedMapArea.css'

/** Catalog SVG remains at map-pin.svg; MapLibre needs a raster (PNG) for visible markers. */
const NEXT_FEED_PIN_CATALOG = '/icons/next-feed/map/map-pin.svg'
const NEXT_FEED_PIN = '/icons/next-feed/map/map-pin.png'

/**
 * Next-feed map region (M151 · FR-VL-10 / NF-03).
 * DS §9 chrome: MapSubsetNotice · BoardMap · MapIssuePreview · MapAttribution · MapStatePanel.
 * Reuses BoardIssuesMap + issueGeo; no invent map/search HTTP.
 */
export function FeedMapArea({
  issues,
  resolveLocalizedText,
  t,
  feedUrlForBack,
  onReturnToList,
}) {
  const [mapFailed, setMapFailed] = useState(() => {
    try {
      return typeof window !== 'undefined' && window.sessionStorage?.getItem('nf03-demo-map-error') === '1'
    } catch {
      return false
    }
  })
  const pinIssues = useMemo(() => listPinCapableIssues(issues), [issues])
  const partial = pinIssues.length > 0 && pinIssues.length < issues.length

  const mapT = (key) => {
    if (key === 'schemaRuntime.map.partialHint') return t('nextFeed.map.partial')
    if (key === 'schemaRuntime.map.emptyPins') return t('nextFeed.map.unavailable')
    if (key === 'schemaRuntime.map.toggle.map') return t('nextFeed.map.mapView')
    if (key === 'schemaRuntime.map.pinOpen') return t('nextFeed.post.openIssue')
    if (key === 'schemaRuntime.map.pinLabel' || key === 'nextFeed.map.pinLabel') {
      return t('nextFeed.map.pinLabel')
    }
    return t(key)
  }

  if (mapFailed) {
    return (
      <MapStatePanel
        variant="error"
        title={t('nextFeed.map.error')}
        body={
          <>
            <img
              className="feed-icon feed-icon--lg"
              src="/icons/next-feed/status/error.svg"
              alt=""
              aria-hidden="true"
            />
            <p>{t('nextFeed.map.unavailable')}</p>
          </>
        }
        actions={
          <Button type="button" hierarchy="secondary" onClick={onReturnToList}>
            <img
              className="feed-icon feed-icon--inline"
              src="/icons/next-feed/actions/list-view.svg"
              alt=""
              aria-hidden="true"
            />
            {t('nextFeed.map.listView')}
          </Button>
        }
      />
    )
  }

  return (
    <section
      className="feed-map-area"
      data-testid="feed-map-area"
      aria-label={t('nextFeed.map.mapView')}
      data-pin-asset={NEXT_FEED_PIN_CATALOG}
      data-pin-raster={NEXT_FEED_PIN}
    >
      {partial ? <MapSubsetNotice>{t('nextFeed.map.partial')}</MapSubsetNotice> : null}
      <div onErrorCapture={() => setMapFailed(true)}>
        <BoardMap
          issues={issues}
          resolveLocalizedText={resolveLocalizedText}
          t={mapT}
          feedUrlForBack={feedUrlForBack}
          pinImageUrl={NEXT_FEED_PIN}
          issuePathPrefix="/next/feed/issue"
        />
      </div>
    </section>
  )
}
