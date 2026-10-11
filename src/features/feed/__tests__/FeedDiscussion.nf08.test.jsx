import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { NEXT_FEED_FLAT_KEYS } from '../../../i18n/nextFeedDictionary.js'
import { NEXT_FEED_THREAD_ICONS } from '../feedThreadIcons.js'
import { FeedDiscussionBlock } from '../FeedDiscussionBlock.jsx'
import { makeFeedThreadT } from '../feedThreadT.js'

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
      'threadsFeed.post.action.discussion': 'Discussion',
      'threadsFeed.post.discussionLoading': 'Loading discussion…',
      'threadsFeed.post.empty.title': 'No comments yet',
      'threadsFeed.post.empty.helper': 'Start a constructive discussion about this Issue.',
      'threadsFeed.post.existingDiscussion': 'Existing discussion',
      'threadsFeed.post.discussionUnavailable': 'Discussion unavailable',
      'threadsFeed.post.discussionUnavailableHelper': 'The Issue is still available. Try again later.',
      'threadsFeed.post.tryAgain': 'Try again',
      'nextFeed.thread.viewDiscussion': 'View discussion',
      'nextFeed.thread.collapseDiscussion': 'Collapse discussion',
      'threadsFeed.composer.placeholder': 'Write a comment',
      'threadsFeed.composer.attach': 'Attach',
      'threadsFeed.post.action.inviteOrganization': 'Invite organization',
    })[key] || key
}

const comments = [
  {
    id: 'c1',
    depth: 0,
    body: 'I can help coordinate a shared pet-care group for neighbours.',
  },
  {
    id: 'c2',
    depth: 0,
    body: 'A simple sign-up list would make it easier to start.',
  },
]

describe('NF-08 FeedDiscussionBlock M152/M153 (AD-VP-01/02)', () => {
  it('exposes view/collapse discussion keys', () => {
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.thread.viewDiscussion')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.thread.collapseDiscussion')
  })

  it('maps openTree to viewDiscussion via makeFeedThreadT', () => {
    const t = (k) =>
      ({
        'nextFeed.thread.viewDiscussion': 'View discussion',
        'threadsFeed.post.openTree': 'Open discussion',
      })[k] || k
    expect(makeFeedThreadT(t)('threadsFeed.post.openTree')).toBe('View discussion')
  })

  it('populated defaults to collapsed THR-P-C without classic 3-button row or full tree', () => {
    const html = renderUi(
      <FeedDiscussionBlock
        status="populated"
        t={makeT()}
        iconPack={NEXT_FEED_THREAD_ICONS}
        comments={comments}
        showInviteStub={true}
      />,
    )
    expect(html).toContain('data-testid="feed-discussion-block"')
    expect(html).toContain('data-presentation="m152-collapsed"')
    expect(html).toContain('data-expanded="false"')
    expect(html).toContain('data-testid="feed-discussion-collapsed"')
    expect(html).toContain('data-testid="feed-discussion-view"')
    expect(html).toContain('View discussion')
    expect(html).toContain('I can help coordinate a shared pet-care group for neighbours.')
    expect(html).toContain('A simple sign-up list would make it easier to start.')
    expect(html).not.toContain('data-testid="issue-thread-actions"')
    expect(html).not.toContain('data-testid="thread-action-react"')
    expect(html).not.toContain('data-testid="thread-action-discussion"')
    expect(html).not.toContain('data-testid="comment-tree"')
    expect(html).toContain('data-testid="issue-thread-composer"')
    expect(html).toContain('data-composer-chrome="oval-entry"')
    expect(html).toContain('data-oval-composer="true"')
    expect(html).toContain('data-presentation="m153-composer-entry"')
    expect(html).toContain('data-testid="invite-organization-stub"')
  })

  it('expanded populated exposes M153 oval composer chrome (circular-send presentation)', () => {
    const html = renderUi(
      <FeedDiscussionBlock
        status="populated"
        t={makeT()}
        iconPack={NEXT_FEED_THREAD_ICONS}
        comments={comments}
        initialExpanded={true}
      />,
    )
    expect(html).toContain('data-presentation="m153-tree"')
    expect(html).toContain('data-composer-chrome="oval"')
    expect(html).toContain('data-oval-composer="true"')
    expect(html).toContain('data-presentation="m153-composer"')
    expect(html).toContain('data-testid="comment-composer-post"')
  })

  it('collapsed previews take first two bodies in order (thr02 root+reply, not roots-only)', () => {
    const thr02Shaped = [
      {
        id: 'c-root',
        depth: 0,
        body: 'I can help coordinate a shared pet-care group for neighbours.',
      },
      {
        id: 'c-reply',
        depth: 1,
        parentId: 'c-root',
        body: 'A simple sign-up list would make it easier to start.',
      },
      {
        id: 'c-nested',
        depth: 2,
        parentId: 'c-reply',
        body: 'We could list short visits and longer stays separately.',
      },
    ]
    const html = renderUi(
      <FeedDiscussionBlock
        status="populated"
        t={makeT()}
        iconPack={NEXT_FEED_THREAD_ICONS}
        comments={thr02Shaped}
      />,
    )
    expect(html).toContain('I can help coordinate a shared pet-care group for neighbours.')
    expect(html).toContain('A simple sign-up list would make it easier to start.')
    expect(html).not.toContain('We could list short visits and longer stays separately.')
  })

  it('loading / empty / unavailable keep fail-soft chrome without classic actions', () => {
    for (const status of ['loading', 'empty', 'unavailable']) {
      const html = renderUi(
        <FeedDiscussionBlock
          status={status}
          t={makeT()}
          iconPack={NEXT_FEED_THREAD_ICONS}
          onRetry={() => {}}
          showInviteStub={false}
        />,
      )
      expect(html).toContain(`data-thread-status="${status}"`)
      expect(html).not.toContain('data-testid="issue-thread-actions"')
    }
  })
})
