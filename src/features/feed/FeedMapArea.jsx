import { useMemo, useState } from 'react'
import { BoardIssuesMap } from '../../components/map/BoardIssuesMap.jsx'
import { listPinCapableIssues } from '../../map/issueGeo.js'
import { Button } from '../../components/Button'
import './FeedMapArea.css'

/** Catalog SVG remains at map-pin.svg; MapLibre needs a raster (PNG) for visible markers. */
const NEXT_FEED_PIN_CATALOG = '/icons/next-feed/map/map-pin.svg'
const NEXT_FEED_PIN = '/icons/next-feed/map/map-pin.png'

/**
 * Next-feed map region (M151 · FR-NF-03.2–.4).
 * Reuses BoardIssuesMap + issueGeo; pin asset = next-feed catalog SVG.
 * No invent map/search HTTP (DUI-Q14 process honesty).
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
      <div className="feed-map-area feed-map-area--error" data-testid="feed-map-error" role="alert">
        <img
          className="feed-icon feed-icon--lg"
          src="/icons/next-feed/status/error.svg"
          alt=""
          aria-hidden="true"
        />
        <h3>{t('nextFeed.map.error')}</h3>
        <p>{t('nextFeed.map.unavailable')}</p>
        <Button type="button" hierarchy="secondary" onClick={onReturnToList}>
          <img
            className="feed-icon feed-icon--inline"
            src="/icons/next-feed/actions/list-view.svg"
            alt=""
            aria-hidden="true"
          />
          {t('nextFeed.map.listView')}
        </Button>
      </div>
    )
  }

  return (
    <section
      className="feed-map-area"
      data-testid="feed-map-area"
      aria-label={t('nextFeed.map.mapView')}
    >
      {partial ? (
        <p className="feed-map-partial" data-testid="feed-map-partial" role="status">
          {t('nextFeed.map.partial')}
        </p>
      ) : null}
      <div
        className="feed-map-surface"
        data-pin-asset={NEXT_FEED_PIN_CATALOG}
        data-pin-raster={NEXT_FEED_PIN}
        onErrorCapture={() => setMapFailed(true)}
      >
        <BoardIssuesMap
          issues={issues}
          resolveLocalizedText={resolveLocalizedText}
          t={mapT}
          boardUrlForBack={feedUrlForBack}
          pinImageUrl={NEXT_FEED_PIN}
          issuePathPrefix="/next/feed/issue"
        />
      </div>
    </section>
  )
}
