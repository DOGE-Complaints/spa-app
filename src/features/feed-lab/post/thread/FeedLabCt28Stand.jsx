import { useMemo } from 'react'
import { FeedThreadMount } from '../../../feed/FeedThreadMount.jsx'

/**
 * CT-28 Path A stand — next/feed ThreadMount Live bind (mock Closed client).
 * Lab FixtureAdapter path stays on FeedLabThreadMount · this stand proves Live host only.
 * No invent HTTP paths · OP eye Absent → visual BLOCK.
 */
export function FeedLabCt28Stand() {
  const client = useMemo(
    () => ({
      getKnobs: async () => ({
        status: 'ok',
        data: { max_depth: 2, media_allowed_types: [] },
      }),
      getThreadTree: async () => ({
        status: 'ok',
        data: {
          comments: [
            {
              comment_id: 'ct28-c1',
              parent_id: null,
              depth: 0,
              body: 'CT-28 Live ThreadMount comment (Path A stand).',
            },
          ],
          thread_root_reactions: null,
        },
      }),
      createComment: async () => ({ status: 'ok', data: {} }),
      replyComment: async () => ({ status: 'ok', data: {} }),
    }),
    [],
  )

  return (
    <section
      className="feed-lab-ct28-stand"
      data-testid="feed-lab-ct28-stand"
      data-lab-ct28="true"
      data-lab-plane="greenfield"
      aria-label="CT-28 next/feed ThreadMount Live stand"
    >
      <h2 className="feed-lab-ct28-stand__title" data-testid="feed-lab-ct28-heading">
        CT-28 next/feed ThreadMount Live (Path A)
      </h2>
      <div className="feed-lab-ct28-stand__card" data-testid="feed-lab-ct28-card">
        <FeedThreadMount
          issueId="CT28-PATH-A"
          t={(k) => k}
          profile={{ identity_verified: true }}
          client={client}
        />
      </div>
    </section>
  )
}
