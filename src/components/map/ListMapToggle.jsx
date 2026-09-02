import './ListMapToggle.css'

/**
 * List | Map chrome (Architecture §3 · FR-SSR-03.1/03.2/03.9).
 * Map disabled when ineligible — no empty enabled map.
 *
 * @param {object} props
 * @param {'list'|'map'} props.view
 * @param {(next: 'list'|'map') => void} props.onChange
 * @param {boolean} props.mapEligible
 * @param {(k: string) => string} props.t
 */
export function ListMapToggle({ view, onChange, mapEligible, t }) {
  return (
    <div className="list-map-toggle" data-testid="list-map-toggle" role="group" aria-label="Board view">
      <button
        type="button"
        className={`list-map-toggle-btn${view === 'list' ? ' is-active' : ''}`}
        data-testid="board-view-list"
        aria-pressed={view === 'list'}
        onClick={() => onChange('list')}
      >
        <img src="/icons/semantic-schema-runtime/ic-view-list.png" alt="" aria-hidden="true" />
        <span>{t('schemaRuntime.map.toggle.list')}</span>
      </button>
      <button
        type="button"
        className={`list-map-toggle-btn${view === 'map' ? ' is-active' : ''}`}
        data-testid="board-view-map"
        aria-pressed={view === 'map'}
        disabled={!mapEligible}
        title={!mapEligible ? t('schemaRuntime.map.ineligible') : undefined}
        onClick={() => {
          if (mapEligible) onChange('map')
        }}
      >
        <img src="/icons/semantic-schema-runtime/ic-view-map.png" alt="" aria-hidden="true" />
        <span>{t('schemaRuntime.map.toggle.map')}</span>
      </button>
      {!mapEligible ? (
        <p className="list-map-toggle-ineligible" data-testid="board-map-ineligible" role="status">
          <img src="/icons/story-handoff/ic-info.png" alt="" aria-hidden="true" />
          <span>{t('schemaRuntime.map.ineligible')}</span>
        </p>
      ) : null}
    </div>
  )
}
