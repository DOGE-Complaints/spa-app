import './FeedPostActionStrip.css'

/** Runtime URLs — Gap v2 closed (CR-20): react.svg thumbs-up · reactions.svg dual-circle Present */
export const FEED_POST_ACTION_ICON_URLS = Object.freeze({
  react: '/icons/next-feed/actions/react.svg',
  comment: '/icons/next-feed/actions/comment.svg',
  share: '/icons/next-feed/actions/share.svg',
  reactions: '/icons/next-feed/actions/reactions.svg',
})

const ZONES = Object.freeze([
  { id: 'react', label: 'React' },
  { id: 'comment', label: 'Comment' },
  { id: 'share', label: 'Share' },
  { id: 'reactions', label: 'Reactions' },
])

/**
 * CR-11 four-zone strip — React | Comment | Share | Reactions · icon+label · ~56px.
 * CR-16/21: hover/selected/focus paints inner chip only (not full grid cell) for all zones.
 */
export function FeedPostActionStrip({
  onZone = null,
  reactSlot = null,
  reactState = 'rest',
  /** CT-24: highlight Share while surface open (strip stays dumb otherwise) */
  activeZone = null,
}) {
  const hasSlot = reactSlot != null
  const reactStateAttr = reactState || 'rest'

  return (
    <div
      className="feed-post-action-strip"
      data-testid="feed-post-action-strip"
      data-lab-strip-zones="4"
      data-lab-strip-slot={hasSlot ? 'react' : 'none'}
      data-lab-react-chip="true"
      data-lab-reactions-chip="true"
      data-lab-cr16-polish="true"
      data-lab-cr21-affordance="true"
      role="group"
      aria-label="Post actions"
    >
      {ZONES.map((z) => {
        if (z.id === 'react' && hasSlot) {
          return (
            <div
              key={z.id}
              className="feed-post-action-strip__zone feed-post-action-strip__zone--slot"
              data-testid={`feed-post-action-${z.id}`}
              data-zone={z.id}
              data-lab-react-slot="true"
              data-lab-icon-src={FEED_POST_ACTION_ICON_URLS.react}
              data-rm-react-state={reactStateAttr}
            >
              {reactSlot}
            </div>
          )
        }

        const iconSrc = FEED_POST_ACTION_ICON_URLS[z.id]
        const isReact = z.id === 'react'
        const chipTestId =
          z.id === 'react'
            ? 'feed-post-action-react-chip'
            : z.id === 'reactions'
              ? 'feed-post-action-reactions-chip'
              : `feed-post-action-${z.id}-chip`

        const zoneOpen = activeZone === z.id
        return (
          <button
            key={z.id}
            type="button"
            className={[
              'feed-post-action-strip__zone',
              zoneOpen ? `feed-post-action-strip__zone--${z.id}-open` : '',
            ]
              .filter(Boolean)
              .join(' ')}
            data-testid={`feed-post-action-${z.id}`}
            data-zone={z.id}
            data-lab-icon-src={iconSrc}
            data-lab-zone-open={zoneOpen ? 'true' : undefined}
            data-rm-react-state={isReact ? reactStateAttr : undefined}
            aria-expanded={z.id === 'share' ? zoneOpen : undefined}
            disabled={isReact && reactStateAttr === 'disabled'}
            onClick={(e) => {
              e.stopPropagation()
              if (typeof onZone === 'function') onZone(z.id, e)
            }}
          >
            <span
              className="feed-post-action-strip__chip"
              data-testid={chipTestId}
              data-lab-react-chip={isReact ? 'true' : undefined}
              data-lab-zone-chip="true"
            >
              <img
                className="feed-post-action-strip__icon"
                src={iconSrc}
                alt=""
                width={18}
                height={18}
                aria-hidden="true"
                data-testid={`feed-post-action-icon-${z.id}`}
              />
              <span className="feed-post-action-strip__label">{z.label}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
