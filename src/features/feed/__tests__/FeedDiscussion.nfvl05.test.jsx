import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { NEXT_FEED_THREAD_ICONS } from '../feedThreadIcons.js'
import { FeedDiscussionBlock } from '../FeedDiscussionBlock.jsx'
import {
  CommentNode,
  CommentTree,
  DiscussionLayout,
  ReplyDepthNotice,
  ThreadConnector,
} from '../comments/index.js'
import {
  isAtMaxDepth,
  shouldShowDepthNotice,
  visualIndentDepth,
  VISUAL_INDENT_CAP,
} from '../semantics/commentTreeDepth.js'

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
      'nextFeed.thread.collapseDiscussion': 'Collapse discussion',
      'threadsFeed.composer.placeholder': 'Write a comment',
      'threadsFeed.composer.attach': 'Attach',
      'threadsFeed.composer.reply': 'Reply',
      'threadsFeed.composer.maxDepthReached': 'Maximum reply depth reached',
      'threadsFeed.post.action.inviteOrganization': 'Invite organization',
    })[key] || key
}

const nested = [
  { id: 'c1', depth: 0, body: 'Root coordination note for neighbours.' },
  { id: 'c2', depth: 1, parentId: 'c1', body: 'Reply with a sign-up list idea.' },
  { id: 'c3', depth: 2, parentId: 'c2', body: 'Nested follow-up at configured depth.' },
]

describe('NF-VL-05 DiscussionLayout + light CommentTree (AD-VL-01/02 · DS §2/§6)', () => {
  it('exports DS-named layout + tree atoms', () => {
    expect(DiscussionLayout).toBeTypeOf('function')
    expect(CommentTree).toBeTypeOf('function')
    expect(CommentNode).toBeTypeOf('function')
    expect(ThreadConnector).toBeTypeOf('function')
    expect(ReplyDepthNotice).toBeTypeOf('function')
  })

  it('depth helpers stay Closed — no invent fields', () => {
    expect(VISUAL_INDENT_CAP).toBe(3)
    expect(isAtMaxDepth({ depth: 2 }, 2)).toBe(true)
    expect(isAtMaxDepth({ depth: 1 }, 2)).toBe(false)
    expect(shouldShowDepthNotice({ depth: 2 }, 2, 'max-depth')).toBe(true)
    expect(shouldShowDepthNotice({ depth: 2 }, 2, 'nested')).toBe(false)
    expect(visualIndentDepth(5)).toBe(3)
    expect(visualIndentDepth(1)).toBe(1)
  })

  it('light CommentTree mounts DS surfaces without classic dark card classes', () => {
    const html = renderUi(
      <CommentTree t={makeT()} comments={nested} maxDepth={2} scene="nested" iconPack={NEXT_FEED_THREAD_ICONS} />,
    )
    expect(html).toContain('data-vl-done-surface="CommentTree"')
    expect(html).toContain('data-ds-surface="CommentNode"')
    expect(html).toContain('data-ds-surface="ThreadConnector"')
    expect(html).toContain('data-plane="light"')
    expect(html).toContain('Root coordination note for neighbours.')
    expect(html).toContain('Reply with a sign-up list idea.')
    expect(html).not.toContain('comment-tree-card')
    expect(html).not.toContain('comment-tree-identity')
  })

  it('max-depth scene surfaces ReplyDepthNotice', () => {
    const html = renderUi(
      <CommentTree
        t={makeT()}
        comments={nested}
        maxDepth={2}
        scene="max-depth"
        iconPack={NEXT_FEED_THREAD_ICONS}
      />,
    )
    expect(html).toContain('data-ds-surface="ReplyDepthNotice"')
    expect(html).toContain('Maximum reply depth reached')
  })

  it('expanded FeedDiscussionBlock Done path uses DiscussionLayout + light CommentTree', () => {
    const html = renderUi(
      <FeedDiscussionBlock
        status="populated"
        t={makeT()}
        iconPack={NEXT_FEED_THREAD_ICONS}
        comments={nested}
        initialExpanded={true}
        showInviteStub={false}
      />,
    )
    expect(html).toContain('data-vl-done-surface="DiscussionLayout"')
    expect(html).toContain('data-vl-done-surface="CommentTree"')
    expect(html).toContain('data-testid="feed-discussion-expanded"')
    expect(html).toContain('data-vl-plane="light-comment-tree"')
    expect(html).toContain('data-presentation="m153-tree"')
    expect(html).toContain('data-composer-ds="true"')
    expect(html).not.toContain('comment-tree-identity')
  })
})
