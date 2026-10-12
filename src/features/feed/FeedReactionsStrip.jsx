import { useEffect, useState } from 'react'
import { ReactionChrome } from './reactions/index.js'
import { useFeedNarrow } from './useFeedNarrow.js'
import { useFeedReactionOpen } from './FeedReactionOpenContext.jsx'
import './FeedReactionsStrip.css'

/**
 * Next-feed reactions presentation (M154 / DS §8) — AD-VL-01/02/03.
 * DS ReactionChrome plane; classic ReactionControls ≠ Done on this path.
 *
 * @param {object} props — Closed reaction contract + optional issueId for civic bridge
 */
export function FeedReactionsStrip({
  issueId = null,
  target = 'comment',
  stripStatus = 'ready',
  onRetry = null,
  ...controlsProps
}) {
  const narrow = useFeedNarrow()
  const bridge = useFeedReactionOpen()
  const [openSignal, setOpenSignal] = useState(0)

  useEffect(() => {
    if (target !== 'thread-root' || !issueId || !bridge?.registerThreadRootOpener) return undefined
    return bridge.registerThreadRootOpener(issueId, () => {
      setOpenSignal((n) => n + 1)
    })
  }, [bridge, issueId, target])

  if (stripStatus === 'loading') {
    return (
      <div
        className="feed-reactions-strip feed-reactions-strip--loading"
        data-testid="feed-reactions-strip"
        data-presentation="m154-strip"
        data-strip-status="loading"
        role="status"
      >
        <span className="feed-reactions-strip-skeleton" aria-hidden="true" />
        <span className="feed-reactions-strip-skeleton" aria-hidden="true" />
      </div>
    )
  }

  if (stripStatus === 'error') {
    return (
      <div
        className="feed-reactions-strip feed-reactions-strip--error"
        data-testid="feed-reactions-strip"
        data-presentation="m154-strip"
        data-strip-status="error"
        role="alert"
      >
        <p>{controlsProps.t?.('threadsFeed.reactions.unavailable') || 'Reactions unavailable'}</p>
        {typeof onRetry === 'function' ? (
          <button
            type="button"
            className="feed-reactions-strip-retry"
            data-testid="feed-reactions-retry"
            onClick={onRetry}
          >
            {controlsProps.t?.('threadsFeed.post.tryAgain') || 'Try again'}
          </button>
        ) : null}
      </div>
    )
  }

  const pickerVariant = narrow || resolveMobileHarness() ? 'sheet' : 'default'

  return (
    <div
      className="feed-reactions-strip"
      data-testid="feed-reactions-strip"
      data-presentation="m154-strip"
      data-strip-status="ready"
      data-picker-layout={pickerVariant === 'sheet' ? 'sheet' : 'popover'}
      data-vl-done-surface="ReactionChrome"
    >
      <ReactionChrome
        {...controlsProps}
        target={target}
        className="feed-reactions-controls"
        hideZeroCount
        pickerVariant={pickerVariant}
        openSignal={openSignal}
      />
    </div>
  )
}

function resolveMobileHarness() {
  if (typeof window === 'undefined') return false
  return window.__THR03_FORCE_SCENE__ === 'mobile'
}
