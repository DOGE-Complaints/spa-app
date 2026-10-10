import './FeedListMapToggle.css'

/**
 * Next-feed List | Map toggle (M151 · FR-NF-03.1).
 * Map disabled when no lat/lon-eligible pins (SSR-M-ineligible).
 *
 * @param {object} props
 * @param {'list'|'map'} props.view
 * @param {(next: 'list'|'map') => void} props.onChange
 * @param {boolean} props.mapEligible
 * @param {(k: string) => string} props.t
 */
export function FeedListMapToggle({ view, onChange, mapEligible, t }) {
  return (
    <div
      className="feed-list-map-toggle"
      data-testid="feed-list-map-toggle"
      role="group"
      aria-label={t('nextFeed.map.mapView')}
    >
      <button
        type="button"
        className={`feed-list-map-toggle-btn${view === 'list' ? ' is-active' : ''}`}
        data-testid="feed-view-list"
        aria-pressed={view === 'list'}
        onClick={() => onChange('list')}
      >
        <img
          className="feed-icon"
          src="/icons/next-feed/actions/list-view.svg"
          alt=""
          aria-hidden="true"
        />
        <span>{t('nextFeed.map.listView')}</span>
      </button>
      <button
        type="button"
        className={`feed-list-map-toggle-btn${view === 'map' ? ' is-active' : ''}`}
        data-testid="feed-view-map"
        aria-pressed={view === 'map'}
        disabled={!mapEligible}
        title={!mapEligible ? t('nextFeed.map.unavailable') : undefined}
        onClick={() => {
          if (mapEligible) onChange('map')
        }}
      >
        <img
          className="feed-icon"
          src="/icons/next-feed/actions/map-view.svg"
          alt=""
          aria-hidden="true"
        />
        <span>{t('nextFeed.map.mapView')}</span>
      </button>
      {!mapEligible ? (
        <p className="feed-list-map-toggle-ineligible" data-testid="feed-map-ineligible" role="status">
          <img
            className="feed-icon"
            src="/icons/next-feed/status/info.svg"
            alt=""
            aria-hidden="true"
          />
          <span>{t('nextFeed.map.unavailable')}</span>
        </p>
      ) : null}
    </div>
  )
}
