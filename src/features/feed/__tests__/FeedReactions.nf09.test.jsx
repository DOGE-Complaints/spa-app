import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { NEXT_FEED_THREAD_ICONS } from '../feedThreadIcons.js'
import { FeedReactionsStrip } from '../FeedReactionsStrip.jsx'
import { FeedCivicPost } from '../FeedCivicPost.jsx'
import { FeedDiscussionBlock } from '../FeedDiscussionBlock.jsx'
import {
  FeedReactionOpenProvider,
} from '../FeedReactionOpenContext.jsx'

function renderUi(ui) {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

function makeT() {
  return (key) =>
    ({
      'threadsFeed.reactions.react': 'React',
      'threadsFeed.reactions.viewReactions': 'View reactions',
      'threadsFeed.reactions.close': 'Close',
      'threadsFeed.reactions.chooseUpTo': 'Choose up to 3 reactions',
      'threadsFeed.reactions.unavailable': 'Reactions unavailable',
      'threadsFeed.reactions.layer.emotional': 'Emotional',
      'threadsFeed.reactions.layer.epistemic': 'Epistemic',
      'threadsFeed.reactions.layer.moderation': 'Moderation',
      'threadsFeed.reactions.id.acknowledge': 'Acknowledge',
      'threadsFeed.reactions.id.support': 'Support',
      'threadsFeed.reactions.id.agree': 'Agree',
      'threadsFeed.post.action.react': 'React',
      'threadsFeed.post.reactionSummarySlot': 'Reactions',
      'threadsFeed.post.action.discussion': 'Discussion',
      'threadsFeed.post.empty.title': 'No comments yet',
      'threadsFeed.post.empty.helper': 'Start a constructive discussion about this Issue.',
      'threadsFeed.post.existingDiscussion': 'Existing discussion',
      'nextFeed.thread.viewDiscussion': 'View discussion',
      'nextFeed.post.comment': 'Comment',
      'nextFeed.post.share': 'Share',
      'nextFeed.post.actions': 'Actions',
      'nextFeed.post.more': 'More',
      'nextFeed.post.openIssue': 'Open issue',
      'threadsFeed.composer.placeholder': 'Write a comment',
      'threadsFeed.composer.attach': 'Attach',
      'threadsFeed.post.action.inviteOrganization': 'Invite organization',
    })[key] || key
}

describe('NF-09 FeedReactionsStrip M154 (AD-VP-01/02)', () => {
  it('renders compact strip presentation without theatrical zero', () => {
    const html = renderUi(
      <FeedReactionsStrip
        t={makeT()}
        target="thread-root"
        iconPack={NEXT_FEED_THREAD_ICONS}
        aggregateCount={0}
        summaryMarks={[]}
      />,
    )
    expect(html).toContain('data-presentation="m154-strip"')
    expect(html).toContain('data-testid="feed-reactions-strip"')
    expect(html).toContain('data-testid="reaction-open-button"')
    expect(html).not.toContain('data-testid="reaction-summary-count"')
    expect(html).not.toContain('people-list')
    expect(html).not.toContain('data-testid="reaction-people"')
  })

  it('shows aggregate honesty when marks present', () => {
    const html = renderUi(
      <FeedReactionsStrip
        t={makeT()}
        target="thread-root"
        iconPack={NEXT_FEED_THREAD_ICONS}
        summaryMarks={[{ reaction_id: 'acknowledge', count: 2 }]}
        aggregateCount={2}
      />,
    )
    expect(html).toContain('data-testid="reaction-summary-count"')
    expect(html).toContain('>2<')
    expect(html).toContain('/icons/next-feed/reactions/acknowledge.svg')
  })

  it('thread-root catalog omits Moderation (THREAD-ROOT-SCOPE)', async () => {
    const { listReactionsV1 } = await import(
      '../../../components/threads/reactionsV1Catalog.js'
    )
    const layers = new Set(listReactionsV1({ target: 'thread-root' }).map((e) => e.layer))
    expect(layers.has('emotional')).toBe(true)
    expect(layers.has('epistemic')).toBe(true)
    expect(layers.has('moderation')).toBe(false)
    const commentLayers = new Set(
      listReactionsV1({ target: 'comment' }).map((e) => e.layer),
    )
    expect(commentLayers.has('moderation')).toBe(true)
  })

  it('mounts M154 strip inside FeedDiscussionBlock slots', () => {
    const html = renderUi(
      <FeedDiscussionBlock
        status="empty"
        t={makeT()}
        iconPack={NEXT_FEED_THREAD_ICONS}
        issueId="DEMO-NF09-1"
        showInviteStub={false}
      />,
    )
    expect(html).toContain('data-presentation="m154-strip"')
    expect(html).toContain('data-testid="feed-reactions-strip"')
  })

  it('civic Reactions zone exposes open handler wiring surface', () => {
    const html = renderUi(
      <FeedReactionOpenProvider>
        <FeedCivicPost
          issue={{
            id: 'DEMO-NF09-1',
            type: 'IMPROVEMENT',
            status: 'PUBLISHED',
            title: 'Pet care',
            summary: 'Neighbours',
            created_at: '2026-10-10T12:00:00Z',
          }}
          locale="en"
          resolveLocalizedText={(f) => (typeof f === 'string' ? f : f?.en || '')}
          t={makeT()}
          onOpenReactions={() => {}}
        />
      </FeedReactionOpenProvider>,
    )
    expect(html).toContain('data-testid="feed-civic-action-reactions"')
    expect(html).toContain('data-testid="feed-civic-action-react"')
    expect(html).toContain('data-zone="reactions"')
  })

  it('loading / error strip states stay scoped', () => {
    const loading = renderUi(
      <FeedReactionsStrip t={makeT()} stripStatus="loading" />,
    )
    expect(loading).toContain('data-strip-status="loading"')
    const error = renderUi(
      <FeedReactionsStrip t={makeT()} stripStatus="error" onRetry={() => {}} />,
    )
    expect(error).toContain('data-strip-status="error"')
    expect(error).toContain('Reactions unavailable')
    expect(error).toContain('data-testid="feed-reactions-retry"')
  })
})
