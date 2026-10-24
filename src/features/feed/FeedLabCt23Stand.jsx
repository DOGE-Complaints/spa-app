import { useCallback, useMemo, useRef, useState } from 'react'
import { FeedReactionsMount } from './FeedReactionsMount.jsx'
import { FeedThreadMount } from './FeedThreadMount.jsx'

/**
 * CR-23 Path A stand — next/feed ReactionsMount Live (civic strip + comment plug).
 * CR-24: wide underlay · ownInZone · Reactions text-only (M163/M164).
 * CR-25: tree hydrate selected / summaries (post + comment) · Path A reload honesty.
 * CR-26: M173 empty/filled icon-above-label harmony · Path A empty clear control.
 * Avoids FeedCivicPost/StatusBadge so lab stress tests without I18nProvider still pass.
 * Lab FixtureAdapter path stays on FeedLabReactionsMount · this stand proves Live host only.
 * No invent HTTP · OP eye Absent → visual BLOCK.
 */
export function FeedLabCt23Stand() {
  const reactionsApiRef = useRef(null)
  const [rootRx, setRootRx] = useState(null)
  const [anonMode, setAnonMode] = useState(false)
  const [standKey, setStandKey] = useState(0)
  /** Mutable tree row so PUT → getThreadTree rehydrate stays consistent (CR-25 T03). */
  const treeStateRef = useRef({
    rootSelected: ['acknowledge'],
    rootMarks: [{ reaction_id: 'acknowledge', count: 4 }],
    rootAgg: 4,
    commentSelected: ['agree'],
    commentMarks: [{ reaction_id: 'agree', count: 2 }],
    commentAgg: 2,
  })

  const clearOwnRoot = useCallback(() => {
    const s = treeStateRef.current
    s.rootSelected = []
    s.rootMarks = []
    s.rootAgg = 0
    setRootRx(null)
    setStandKey((k) => k + 1)
  }, [])

  const fillOwnRoot = useCallback(() => {
    const s = treeStateRef.current
    s.rootSelected = ['support', 'agree', 'useful_fact']
    s.rootMarks = s.rootSelected.map((id) => ({ reaction_id: id, count: 1 }))
    s.rootAgg = 3
    setRootRx(null)
    setStandKey((k) => k + 1)
  }, [])

  const buildTree = useCallback(() => {
    const s = treeStateRef.current
    if (anonMode) {
      return {
        status: 'ok',
        data: {
          comments: [
            {
              comment_id: 'cr23-c1',
              parent_id: null,
              depth: 0,
              body: 'CR-23/25 Live comment reaction plug (Path A stand).',
              selected: [],
              summary_marks: [],
              aggregate_count: 0,
            },
          ],
          thread_root_reactions: {
            selected: [],
            summary_marks: [],
            aggregate_count: 0,
          },
        },
      }
    }
    return {
      status: 'ok',
      data: {
        comments: [
          {
            comment_id: 'cr23-c1',
            parent_id: null,
            depth: 0,
            body: 'CR-23/25 Live comment reaction plug (Path A stand).',
            selected: [...s.commentSelected],
            summary_marks: s.commentMarks.map((m) => ({ ...m })),
            aggregate_count: s.commentAgg,
          },
        ],
        thread_root_reactions: {
          selected: [...s.rootSelected],
          summary_marks: s.rootMarks.map((m) => ({ ...m })),
          aggregate_count: s.rootAgg,
        },
      },
    }
  }, [anonMode])

  const client = useMemo(
    () => ({
      getKnobs: async () => ({
        status: 'ok',
        data: { max_depth: 2, media_allowed_types: [], max_reactions_per_actor: 3 },
      }),
      getThreadTree: async () => buildTree(),
      createComment: async () => ({ status: 'ok', data: {} }),
      replyComment: async () => ({ status: 'ok', data: {} }),
      react: async (args = {}) => {
        const targetKind = args.targetKind === 'comment' ? 'comment' : 'thread_root'
        const rid = args.reactionId == null ? '' : String(args.reactionId).trim()
        const op = args.op === 'remove' ? 'remove' : 'add'
        const s = treeStateRef.current
        let list =
          targetKind === 'comment' ? [...s.commentSelected] : [...s.rootSelected]
        if (rid) {
          if (op === 'remove') list = list.filter((id) => id !== rid)
          else if (!list.includes(rid)) list = [...list, rid]
        }
        const marks = list.map((id) => ({ reaction_id: id, count: 1 }))
        const agg = list.length
        if (targetKind === 'comment') {
          s.commentSelected = list
          s.commentMarks = marks
          s.commentAgg = agg
        } else {
          s.rootSelected = list
          s.rootMarks = marks
          s.rootAgg = agg
        }
        return {
          status: 'ok',
          data: {
            selected: list,
            summary_marks: marks,
            aggregate_count: agg,
          },
        }
      },
    }),
    [buildTree],
  )

  const onThreadRootReactions = useCallback((root) => {
    setRootRx((prev) => {
      const next = root || { summaryMarks: null, aggregateCount: null, selected: [] }
      const prevSel = (prev?.selected || []).join('\0')
      const nextSel = (next.selected || []).join('\0')
      if (
        prev &&
        prevSel === nextSel &&
        prev.aggregateCount === next.aggregateCount &&
        JSON.stringify(prev.summaryMarks) === JSON.stringify(next.summaryMarks)
      ) {
        return prev
      }
      return next
    })
  }, [])

  const verifiedProfile = useMemo(() => ({ identity_verified: true }), [])

  const t = (k) => {
    const map = {
      'threadsFeed.reactions.react': 'React',
      'threadsFeed.post.reactionSummarySlot': 'Reactions',
      'nextFeed.post.comment': 'Comment',
      'nextFeed.post.share': 'Share',
    }
    return map[k] ?? k
  }

  return (
    <section
      className="feed-lab-ct23-stand"
      data-testid="feed-lab-ct23-stand"
      data-lab-ct23="true"
      data-lab-cr25="true"
      data-lab-cr26="true"
      data-lab-cr25-anon={anonMode ? 'true' : 'false'}
      data-lab-plane="greenfield"
      aria-label="CR-23/25/26 next/feed ReactionsMount Live stand"
    >
      <h2 className="feed-lab-ct23-stand__title" data-testid="feed-lab-ct23-heading">
        CR-23/25/26 next/feed ReactionsMount Live hydrate + M173 (Path A)
      </h2>
      <div className="feed-lab-ct23-stand__controls" data-testid="feed-lab-cr25-controls">
        <button
          type="button"
          data-testid="feed-lab-cr25-toggle-anon"
          onClick={() => {
            setRootRx(null)
            setAnonMode((v) => !v)
          }}
        >
          {anonMode ? 'Bearer hydrate' : 'Anonymous omit'}
        </button>
        <button type="button" data-testid="feed-lab-cr26-clear-own" onClick={clearOwnRoot}>
          CR-26 empty own
        </button>
        <button type="button" data-testid="feed-lab-cr26-fill-own" onClick={fillOwnRoot}>
          CR-26 fill 3 own
        </button>
      </div>
      <div className="feed-lab-ct23-stand__card" data-testid="feed-lab-ct23-card">
        <div
          className="feed-civic-post-actions"
          data-testid="feed-civic-post-actions"
          data-action-zones="4"
          data-feed-cr23-strip="true"
          data-feed-cr25-strip="true"
          data-cr24-underlay="m163"
          data-cr26-harmony="m173"
          role="group"
          aria-label="CR-23/25/26 civic strip stand"
        >
          <div
            className="feed-civic-post-action feed-civic-post-actions__react-slot"
            data-testid="feed-civic-action-react"
            data-zone="react"
            data-rm-react-underlay="wide"
          >
            <FeedReactionsMount
              key={`${anonMode ? 'anon' : 'bearer'}-${standKey}`}
              issueId="CR23-PATH-A"
              target="thread-root"
              t={t}
              client={client}
              apiRef={reactionsApiRef}
              ownInZone
              initialSelected={rootRx?.selected}
              initialSummaryMarks={rootRx?.summaryMarks}
              initialAggregateCount={rootRx?.aggregateCount}
            />
          </div>
          <button
            type="button"
            className="feed-civic-post-action"
            data-testid="feed-civic-action-comment"
            data-zone="comment"
          >
            <img
              className="feed-civic-post-icon"
              src="/icons/next-feed/actions/comment.svg"
              width={24}
              height={24}
              alt=""
              aria-hidden="true"
              data-testid="feed-civic-icon-comment"
            />
            <span>Comment</span>
          </button>
          <button
            type="button"
            className="feed-civic-post-action"
            data-testid="feed-civic-action-share"
            data-zone="share"
          >
            <span>Share</span>
          </button>
          <button
            type="button"
            className="feed-civic-post-action feed-civic-post-action-reactions"
            data-testid="feed-civic-action-reactions"
            data-zone="reactions"
            data-rm-reactions-text-only="true"
            onClick={(event) => {
              const anchorEl = event?.currentTarget ?? null
              reactionsApiRef.current?.activateAggregate?.(
                anchorEl ? { anchorEl } : undefined,
              )
            }}
          >
            <span>Reactions</span>
          </button>
        </div>
        <div data-testid="feed-lab-ct23-thread">
          <FeedThreadMount
            key={`${anonMode ? 'thread-anon' : 'thread-bearer'}-${standKey}`}
            issueId="CR23-PATH-A"
            t={t}
            profile={anonMode ? null : verifiedProfile}
            client={client}
            onThreadRootReactions={onThreadRootReactions}
          />
        </div>
      </div>
    </section>
  )
}
