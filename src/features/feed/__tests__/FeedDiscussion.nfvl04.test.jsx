import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { NEXT_FEED_THREAD_ICONS } from '../feedThreadIcons.js'
import { FeedDiscussionBlock } from '../FeedDiscussionBlock.jsx'
import {
  DiscussionHeader,
  DiscussionSummaryChrome,
  ThreadSummary,
  CommentPreview,
  ViewDiscussionAction,
} from '../comments/index.js'
import { selectPreviewBodies } from '../semantics/discussionPreview.js'

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
      'threadsFeed.post.existingDiscussion': 'Existing discussion',
      'nextFeed.thread.viewDiscussion': 'View discussion',
      'threadsFeed.composer.placeholder': 'Write a comment',
      'threadsFeed.composer.attach': 'Attach',
      'threadsFeed.post.action.inviteOrganization': 'Invite organization',
    })[key] || key
}

const comments = [
  { id: 'c1', depth: 0, body: 'I can help coordinate a shared pet-care group for neighbours.' },
  { id: 'c2', depth: 0, body: 'A simple sign-up list would make it easier to start.' },
]

describe('NF-VL-04 discussion summary atoms (AD-VL-01/02 · DS §6)', () => {
  it('exports DS-named summary atoms', () => {
    expect(DiscussionHeader).toBeTypeOf('function')
    expect(ThreadSummary).toBeTypeOf('function')
    expect(CommentPreview).toBeTypeOf('function')
    expect(ViewDiscussionAction).toBeTypeOf('function')
    expect(DiscussionSummaryChrome).toBeTypeOf('function')
  })

  it('selectPreviewBodies keeps literal Closed bodies only (cap 2)', () => {
    expect(selectPreviewBodies(comments)).toEqual([
      'I can help coordinate a shared pet-care group for neighbours.',
      'A simple sign-up list would make it easier to start.',
    ])
    expect(selectPreviewBodies([{ body: '  ' }, { body: 'only' }, { body: 'third' }])).toEqual([
      'only',
      'third',
    ])
  })

  it('DiscussionSummaryChrome mounts without classic IssueThreadBlock action row', () => {
    const html = renderUi(
      <DiscussionSummaryChrome
        summaryTitle="Existing discussion"
        previewBodies={['Alpha body', 'Beta body']}
        viewLabel="View discussion"
        onView={() => {}}
      />,
    )
    expect(html).toContain('data-vl-done-surface="DiscussionSummaryChrome"')
    expect(html).toContain('data-ds-surface="ThreadSummary"')
    expect(html).toContain('data-ds-surface="CommentPreview"')
    expect(html).toContain('data-ds-surface="ViewDiscussionAction"')
    expect(html).toContain('Alpha body')
    expect(html).toContain('Beta body')
    expect(html).not.toContain('data-testid="issue-thread-actions"')
  })

  it('FeedDiscussionBlock Done path uses DiscussionSummaryChrome + DiscussionHeader', () => {
    const html = renderUi(
      <FeedDiscussionBlock
        status="populated"
        t={makeT()}
        iconPack={NEXT_FEED_THREAD_ICONS}
        comments={comments}
        showInviteStub={false}
      />,
    )
    expect(html).toContain('data-testid="discussion-header"')
    expect(html).toContain('data-ds-surface="DiscussionHeader"')
    expect(html).toContain('data-vl-done-surface="DiscussionSummaryChrome"')
    expect(html).toContain('data-testid="feed-discussion-collapsed"')
    expect(html).toContain('data-testid="thread-summary"')
    expect(html).toContain('I can help coordinate a shared pet-care group for neighbours.')
  })
})
