import './FeedPostActionStrip.css'

/** Runtime URLs — Gap v2: react.svg Present (wrong glyph) · reactions.svg Absent · no invent SVG */
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
 * CR-16: React hover/selected/focus paints inner chip only (not full grid cell).
 */
export function FeedPostActionStrip({
  onZone = null,
  reactSlot = null,
  reactState = 'rest',
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
      data-lab-cr16-polish="true"
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

        return (
          <button
            key={z.id}
            type="button"
            className="feed-post-action-strip__zone"
            data-testid={`feed-post-action-${z.id}`}
            data-zone={z.id}
            data-lab-icon-src={iconSrc}
            data-rm-react-state={isReact ? reactStateAttr : undefined}
            disabled={isReact && reactStateAttr === 'disabled'}
            onClick={(e) => {
              e.stopPropagation()
              if (typeof onZone === 'function') onZone(z.id, e)
            }}
          >
            {isReact ? (
              <span
                className="feed-post-action-strip__chip"
                data-testid="feed-post-action-react-chip"
                data-lab-react-chip="true"
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
            ) : (
              <>
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
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}
