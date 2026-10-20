import { useMemo } from 'react'
import { FeedReactionsMount } from './FeedReactionsMount.jsx'
import { FeedThreadMount } from './FeedThreadMount.jsx'

/**
 * CR-23 Path A stand — next/feed ReactionsMount Live (civic strip + comment plug).
 * Avoids FeedCivicPost/StatusBadge so lab stress tests without I18nProvider still pass.
 * Lab FixtureAdapter path stays on FeedLabReactionsMount · this stand proves Live host only.
 * No invent HTTP · OP eye Absent → visual BLOCK.
 */
export function FeedLabCt23Stand() {
  const client = useMemo(
    () => ({
      getKnobs: async () => ({
        status: 'ok',
        data: { max_depth: 2, media_allowed_types: [], max_reactions_per_actor: 3 },
      }),
      getThreadTree: async () => ({
        status: 'ok',
        data: {
          comments: [
            {
              comment_id: 'cr23-c1',
              parent_id: null,
              depth: 0,
              body: 'CR-23 Live comment reaction plug (Path A stand).',
            },
          ],
          thread_root_reactions: null,
        },
      }),
      createComment: async () => ({ status: 'ok', data: {} }),
      replyComment: async () => ({ status: 'ok', data: {} }),
      react: async () => ({
        status: 'ok',
        data: { selected: ['acknowledge'], summary_marks: [], aggregate_count: 1 },
      }),
    }),
    [],
  )

  const t = (k) => k

  return (
    <section
      className="feed-lab-ct23-stand"
      data-testid="feed-lab-ct23-stand"
      data-lab-ct23="true"
      data-lab-plane="greenfield"
      aria-label="CR-23 next/feed ReactionsMount Live stand"
    >
      <h2 className="feed-lab-ct23-stand__title" data-testid="feed-lab-ct23-heading">
        CR-23 next/feed ReactionsMount Live (Path A)
      </h2>
      <div className="feed-lab-ct23-stand__card" data-testid="feed-lab-ct23-card">
        <div
          className="feed-civic-post-actions"
          data-testid="feed-civic-post-actions"
          data-action-zones="4"
          data-feed-cr23-strip="true"
          role="group"
          aria-label="CR-23 civic strip stand"
        >
          <div
            className="feed-civic-post-action feed-civic-post-actions__react-slot"
            data-testid="feed-civic-action-react"
            data-zone="react"
          >
            <FeedReactionsMount
              issueId="CR23-PATH-A"
              target="thread-root"
              t={t}
              client={client}
              aggregatePlacement="inline"
            />
          </div>
        </div>
        <div data-testid="feed-lab-ct23-thread">
          <FeedThreadMount
            issueId="CR23-PATH-A"
            t={t}
            profile={{ identity_verified: true }}
            client={client}
          />
        </div>
      </div>
    </section>
  )
}
