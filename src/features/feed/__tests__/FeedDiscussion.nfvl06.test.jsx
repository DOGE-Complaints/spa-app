import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { NEXT_FEED_THREAD_ICONS } from '../feedThreadIcons.js'
import { FeedDiscussionBlock } from '../FeedDiscussionBlock.jsx'
import {
  ComposerActionRow,
  ComposerEntry,
  ComposerFeedback,
  CommentTextInput,
  DraftDiscardDialog,
  ReplyContext,
  SubmitCommentAction,
  ThreadComposer,
} from '../composer/index.js'
import { isDraftDirty } from '../semantics/composerDraft.js'

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
      'threadsFeed.composer.replyingTo': 'Replying to this comment',
      'threadsFeed.composer.cancel': 'Cancel',
      'threadsFeed.composer.postReply': 'Post reply',
      'threadsFeed.post.action.inviteOrganization': 'Invite organization',
    })[key] || key
}

describe('NF-VL-06 composer atoms (AD-VL-01/02 · DS §7)', () => {
  it('exports DS-named composer atoms', () => {
    expect(ComposerEntry).toBeTypeOf('function')
    expect(ThreadComposer).toBeTypeOf('function')
    expect(ReplyContext).toBeTypeOf('function')
    expect(CommentTextInput).toBeTypeOf('function')
    expect(ComposerActionRow).toBeTypeOf('function')
    expect(SubmitCommentAction).toBeTypeOf('function')
    expect(ComposerFeedback).toBeTypeOf('function')
    expect(DraftDiscardDialog).toBeTypeOf('function')
  })

  it('isDraftDirty Closed helper — no invent fields', () => {
    expect(isDraftDirty('  hello  ')).toBe(true)
    expect(isDraftDirty('   ', null)).toBe(false)
    expect(isDraftDirty('', { label: 'file' })).toBe(true)
  })

  it('ThreadComposer mounts DS surfaces without classic comment-composer Done class as sole chrome', () => {
    const html = renderUi(
      <ThreadComposer t={makeT()} mode="root" iconPack={NEXT_FEED_THREAD_ICONS} />,
    )
    expect(html).toContain('data-vl-done-surface="ThreadComposer"')
    expect(html).toContain('data-ds-surface="CommentTextInput"')
    expect(html).toContain('data-ds-surface="ComposerActionRow"')
    expect(html).toContain('data-ds-surface="SubmitCommentAction"')
    expect(html).toContain('data-plane="light"')
    expect(html).toContain('data-testid="issue-thread-composer"')
    expect(html).toContain('data-testid="comment-composer-post"')
  })

  it('ReplyContext surfaces on reply mode', () => {
    const html = renderUi(
      <ThreadComposer
        t={makeT()}
        mode="reply"
        parentLabel="Parent body"
        parentId="c1"
        iconPack={NEXT_FEED_THREAD_ICONS}
        onCancel={() => {}}
      />,
    )
    expect(html).toContain('data-ds-surface="ReplyContext"')
    expect(html).toContain('Parent body')
  })

  it('FeedDiscussionBlock Done path uses ComposerEntry/ThreadComposer not classic CommentComposer import', () => {
    const collapsed = renderUi(
      <FeedDiscussionBlock
        status="populated"
        t={makeT()}
        iconPack={NEXT_FEED_THREAD_ICONS}
        comments={[{ id: 'c1', depth: 0, body: 'Hello neighbours.' }]}
        showInviteStub={false}
      />,
    )
    expect(collapsed).toContain('data-vl-done-surface="ComposerEntry"')
    expect(collapsed).toContain('data-vl-done-surface="ThreadComposer"')
    expect(collapsed).toContain('data-composer-ds="true"')
    expect(collapsed).not.toContain('data-composer-shelter="true"')

    const expanded = renderUi(
      <FeedDiscussionBlock
        status="populated"
        t={makeT()}
        iconPack={NEXT_FEED_THREAD_ICONS}
        comments={[{ id: 'c1', depth: 0, body: 'Hello neighbours.' }]}
        initialExpanded={true}
        showInviteStub={false}
      />,
    )
    expect(expanded).toContain('data-vl-done-surface="ThreadComposer"')
    expect(expanded).toContain('data-presentation="m153-composer"')
  })
})
