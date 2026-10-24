import { mapSummaryMarksToEntries } from './semantics/reactionsV1.js'
import { CR_REACTION_ICON_PACK } from '../reactions-mount/icons/crReactionIcons.js'
import { CrReactionIcon } from '../reactions-mount/icons/CrReactionIcon.jsx'
import { ShellChromeIcon } from '../../components/AppShell/ShellChromeIcon.jsx'

/** Existing catalog chrome — people/group peer affordance (Gap v2 / next-feed actions). */
export const PEER_EMPTY_ICON_SRC = '/icons/next-feed/actions/reactions.svg'

/**
 * @param {unknown} summaryMarks
 * @param {unknown} aggregateCount
 * @returns {{ known: boolean, empty: boolean, marks: Array<{id: string, count: number}>, count: number }}
 */
export function resolvePeerSummaryState(summaryMarks, aggregateCount, { known = false } = {}) {
  if (!known) {
    return { known: false, empty: false, marks: [], count: 0 }
  }
  const marks = mapSummaryMarksToEntries(summaryMarks) || []
  const count =
    aggregateCount === null || aggregateCount === undefined
      ? marks.reduce((n, m) => n + (Number(m.count) || 0), 0)
      : Number(aggregateCount)
  const empty = marks.length === 0 && (!count || count === 0)
  return { known: true, empty, marks, count: Number.isFinite(count) ? count : 0 }
}

/**
 * CR-28 M176 — peer Reactions zone: empty people icon above label · filled chips below.
 * Missing data ≠ known empty (no invent empty / people HTTP).
 */
export function FeedPeerReactionsEntry({
  t,
  summaryMarks = undefined,
  aggregateCount = undefined,
  /** true once tree/hydrate or mount reported a known summary */
  known = false,
  onActivate,
}) {
  const state = resolvePeerSummaryState(summaryMarks, aggregateCount, { known })
  const peerAttr = !state.known ? 'pending' : state.empty ? 'empty' : 'filled'

  return (
    <button
      type="button"
      className="feed-civic-post-action feed-civic-post-action-reactions"
      data-testid="feed-civic-action-reactions"
      data-zone="reactions"
      data-feed-cr28="true"
      data-feed-cr28-peer={peerAttr}
      data-rm-reactions-text-only={state.known && state.empty ? 'false' : state.known ? 'false' : 'true'}
      aria-label={t('threadsFeed.post.reactionSummarySlot')}
      onClick={(event) => {
        if (typeof onActivate === 'function') onActivate(event)
      }}
    >
      {state.known && state.empty ? (
        <ShellChromeIcon
          className="feed-civic-post-icon feed-civic-post-peer-empty-icon"
          src={PEER_EMPTY_ICON_SRC}
          size={24}
          testId="feed-civic-peer-empty-icon"
        />
      ) : null}
      <span className="feed-civic-post-peer-label" data-testid="feed-civic-peer-label">
        {t('threadsFeed.post.reactionSummarySlot')}
      </span>
      <span
        className={[
          'feed-civic-post-peer-chips',
          state.known && !state.empty ? 'feed-civic-post-peer-chips--filled' : '',
          state.known && state.empty ? 'feed-civic-post-peer-chips--reserved' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        data-testid="feed-civic-peer-chips"
        data-peer-chip-count={String(state.known && !state.empty ? state.marks.length : 0)}
        aria-hidden={state.known && !state.empty ? undefined : 'true'}
      >
        {state.known && !state.empty
          ? state.marks.slice(0, 3).map((entry) => (
              <span
                key={entry.id}
                className="feed-civic-post-peer-chip"
                data-reaction-id={entry.id}
                data-testid={`feed-civic-peer-chip-${entry.id}`}
              >
                <CrReactionIcon src={CR_REACTION_ICON_PACK[entry.id]} size={16} />
              </span>
            ))
          : null}
      </span>
    </button>
  )
}
