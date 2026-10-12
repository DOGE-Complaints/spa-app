import { BoardIssuesMap } from '../../../components/map/BoardIssuesMap.jsx'
import { MapAttribution } from './MapAttribution.jsx'
import { MapIssuePreview } from './MapIssuePreview.jsx'

/**
 * DS §9 BoardMap — pin-capable subset of the same List result set (adapter over BoardIssuesMap).
 * Does not invent map HTTP / tiles; engine attribution remains engine-owned.
 *
 * @param {object} props
 * @param {import('../../../domain/types.js').Issue[]} props.issues
 * @param {(field: unknown) => string} props.resolveLocalizedText
 * @param {(k: string) => string} props.t
 * @param {string} [props.feedUrlForBack]
 * @param {string} [props.pinImageUrl]
 * @param {string} [props.issuePathPrefix]
 * @param {string} [props.className]
 */
export function BoardMap({
  issues,
  resolveLocalizedText,
  t,
  feedUrlForBack = '/next/feed',
  pinImageUrl = '/icons/next-feed/map/map-pin.png',
  issuePathPrefix = '/next/feed/issue',
  className = '',
}) {
  return (
    <div
      className={`board-map${className ? ` ${className}` : ''}`}
      data-ds-surface="BoardMap"
      data-vl-done-surface="BoardMap"
      data-testid="board-map"
    >
      <div className="board-map__surface" data-pin-raster={pinImageUrl}>
        <BoardIssuesMap
          issues={issues}
          resolveLocalizedText={resolveLocalizedText}
          t={t}
          boardUrlForBack={feedUrlForBack}
          pinImageUrl={pinImageUrl}
          issuePathPrefix={issuePathPrefix}
          showPartialHint={false}
          renderPinPreview={({ popup, onClose, openHref, openLabel }) => (
            <MapIssuePreview
              title={popup.title}
              publicContext={popup.label || ''}
              openHref={openHref}
              openLabel={openLabel}
              onClose={onClose}
              closeLabel={t('nextFeed.map.closePreview') || 'Close'}
            />
          )}
        />
        <MapAttribution />
      </div>
    </div>
  )
}
