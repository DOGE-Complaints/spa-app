import { useState } from 'react'
import {
  DiscussionHeader,
  DiscussionLayout,
  DiscussionSummaryChrome,
} from '../feed/comments/index.js'
import { ComposerEntry } from '../feed/composer/index.js'
import { labT } from './labI18n.js'
import './FeedLabDiscussionDeprecated.css'

/**
 * Lab discussion plane — M152 summary + M153 composer entry (local only).
 * Not classic product discussion host · header ≠ «DISCUSSION».
 */
export function FeedLabDiscussionDeprecated({ fixture, initiallyExpanded = false }) {
  const [expanded, setExpanded] = useState(Boolean(initiallyExpanded))
  const comments = Array.isArray(fixture?.comments) ? fixture.comments : []
  const previewBodies = comments.slice(0, 2).map((c) => c.body)
  const summaryTitle = `Thread · ${comments.length} comment${comments.length === 1 ? '' : 's'}`

  if (!expanded) {
    return (
      <div
        className="feed-lab-discussion"
        data-testid="feed-lab-discussion"
        data-lab-discussion="collapsed"
        data-fixture="true"
        data-lab-plane="deprecated"
      >
        <DiscussionSummaryChrome
          summaryTitle={summaryTitle}
          previewBodies={previewBodies}
          viewLabel="View thread"
          onView={() => setExpanded(true)}
        />
      </div>
    )
  }

  return (
    <div
      className="feed-lab-discussion feed-lab-discussion--expanded"
      data-testid="feed-lab-discussion"
      data-lab-discussion="expanded"
      data-fixture="true"
      data-lab-plane="deprecated"
    >
      <DiscussionLayout
        header={<DiscussionHeader title="Thread" />}
        body={
          <div className="feed-lab-discussion__comments" data-testid="feed-lab-discussion-comments">
            {comments.map((c) => (
              <div key={c.id} className="feed-lab-discussion__comment" data-comment-id={c.id}>
                <p className="feed-lab-discussion__comment-body">{c.body}</p>
              </div>
            ))}
          </div>
        }
        composer={
          <ComposerEntry
            t={labT}
            entryLabel="Write a comment…"
            initiallyOpen={false}
            identityVerified={true}
            profile={{ identity_verified: true }}
            returnTo="#/lab/feed"
            onSubmitComment={async () => ({ status: 'ok', data: { fixtureOnly: true } })}
          />
        }
        stub={
          <p className="feed-lab-discussion__stub" data-testid="feed-lab-discussion-stub">
            Lab fixture thread — local only · no threads HTTP
          </p>
        }
      />
      <button
        type="button"
        className="feed-lab-discussion__collapse"
        data-testid="feed-lab-discussion-collapse"
        onClick={() => setExpanded(false)}
      >
        Collapse thread
      </button>
    </div>
  )
}
