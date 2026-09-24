import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { IssueThreadBlock } from '../IssueThreadBlock.jsx'
import { CommentComposer } from '../CommentComposer.jsx'
import { CommentTree } from '../CommentTree.jsx'
import { THR02_DEMO_COMMENTS } from '../thr02DemoFixture.js'
import { UI_DICTIONARY } from '../../../i18n/dictionaries.js'

function makeT(locale = 'en') {
  const dict = UI_DICTIONARY[locale] ?? UI_DICTIONARY.en
  return (key) => {
    const parts = String(key).split('.')
    let current = dict
    for (const part of parts) current = current?.[part]
    return typeof current === 'string' ? current : key
  }
}

describe('IssueThreadBlock', () => {
  it('projects issue-thread-block testid', () => {
    const html = renderToStaticMarkup(<IssueThreadBlock status="empty" t={makeT()} />)
    expect(html).toContain('data-testid="issue-thread-block"')
  })

  it('loading shows restrained chrome without fake comments', () => {
    const html = renderToStaticMarkup(<IssueThreadBlock status="loading" t={makeT()} />)
    expect(html).toContain('data-testid="issue-thread-loading"')
    expect(html).toContain('Loading discussion')
    expect(html).not.toContain('data-testid="issue-thread-composer"')
  })

  it('empty shows honest empty + composer', () => {
    const html = renderToStaticMarkup(<IssueThreadBlock status="empty" t={makeT()} />)
    expect(html).toContain('data-testid="issue-thread-empty"')
    expect(html).toContain('No comments yet')
    expect(html).toContain('data-testid="issue-thread-composer"')
    expect(html).toContain('data-testid="issue-thread-actions"')
  })

  it('unavailable fail-soft keeps message without inventing HTTP', () => {
    const html = renderToStaticMarkup(<IssueThreadBlock status="unavailable" t={makeT()} />)
    expect(html).toContain('data-testid="issue-thread-unavailable"')
    expect(html).toContain('Discussion unavailable')
    expect(html).not.toContain('data-testid="issue-thread-actions"')
  })

  it('populated projects tree + reaction + summary slots', () => {
    const html = renderToStaticMarkup(
      <IssueThreadBlock status="populated" t={makeT()} comments={THR02_DEMO_COMMENTS} maxDepth={2} />,
    )
    expect(html).toContain('data-testid="issue-thread-populated"')
    expect(html).toContain('data-testid="issue-thread-summary"')
    expect(html).toContain('data-testid="issue-thread-tree"')
    expect(html).toContain('data-testid="issue-thread-reaction-slot"')
    expect(html).toContain('data-testid="issue-thread-composer"')
    expect(html).toContain('data-testid="issue-thread-actions"')
  })

  it('does not default prod comments to demo fixture', () => {
    const html = renderToStaticMarkup(<IssueThreadBlock status="populated" t={makeT()} />)
    expect(html).not.toContain('Comment preview')
    expect(html).not.toContain('data-comment-id="c-root"')
  })
})

describe('CommentTree max-depth', () => {
  it('omits deeper reply at configured max depth and shows boundary copy', () => {
    const html = renderToStaticMarkup(
      <CommentTree t={makeT()} comments={THR02_DEMO_COMMENTS} maxDepth={2} scene="max-depth" />,
    )
    expect(html).toContain('data-testid="issue-thread-tree"')
    expect(html).toContain('data-testid="comment-max-depth"')
    expect(html).toContain('Maximum reply depth reached')
    // deepest node (depth 2) should not offer reply
    const deepestChunk = html.split('data-comment-id="c-nested"')[1] || ''
    expect(deepestChunk).not.toContain('data-testid="comment-action-reply"')
  })

  it('nested scene omits max-depth banner while still blocking deeper reply', () => {
    const html = renderToStaticMarkup(
      <CommentTree t={makeT()} comments={THR02_DEMO_COMMENTS} maxDepth={2} scene="nested" />,
    )
    expect(html).not.toContain('data-testid="comment-max-depth"')
    expect(html).not.toContain('Maximum reply depth reached')
    const deepestChunk = html.split('data-comment-id="c-nested"')[1] || ''
    expect(deepestChunk).not.toContain('data-testid="comment-action-reply"')
  })
})

describe('CommentComposer draft preserve', () => {
  it('keeps draft text when attach is denied (SSR markup carries initial draft)', () => {
    const html = renderToStaticMarkup(
      <CommentComposer
        t={makeT()}
        mode="reply"
        parentLabel="Comment preview"
        initialDraft="Draft text that must survive"
        attachOutcome="denied"
      />,
    )
    expect(html).toContain('Draft text that must survive')
    expect(html).toContain('data-testid="comment-attach-denied"')
    expect(html).toContain('This attachment can’t be added.')
    expect(html).not.toContain('data-testid="comment-attach-chip"')
  })

  it('keeps draft text on post soft-fail', () => {
    const html = renderToStaticMarkup(
      <CommentComposer
        t={makeT()}
        mode="reply"
        parentLabel="Comment preview"
        initialDraft="Draft text that must survive"
        initialAttachment={{ label: 'Attached file' }}
        postOutcome="fail"
      />,
    )
    expect(html).toContain('Draft text that must survive')
    expect(html).toContain('data-testid="comment-post-fail"')
    expect(html).toContain('data-testid="comment-attach-chip"')
    expect(html).toContain('Try again')
  })
})
