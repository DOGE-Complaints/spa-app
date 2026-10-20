/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { ThreadMount } from '../ThreadMount.jsx'
import { M153_ILLUSTRATIVE_DRAFT } from '../composer/ThreadComposer.jsx'
import { THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'

describe('CT-12 inline reply under parent · G-H4', () => {
  afterEach(() => cleanup())

  it('reply on nested → composer under parent node · not after IssueThreadBlock', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
       previewNodeBudget={99} />,
    )
    const nested = screen.getByTestId('tm-comment-node-fx-a1')
    const replyBtn = nested.querySelector(
      ':scope > .tm-comment-node__row [data-testid="tm-comment-reply"]',
    )
    fireEvent.click(replyBtn)

    const mount = screen.getByTestId('tm-thread-mount')
    expect(mount.getAttribute('data-tm-reply-inline')).toBe('true')
    expect(mount.getAttribute('data-tm-reply-parent')).toBe('fx-a1')

    const parentNode = screen.getByTestId('tm-comment-node-fx-a1')
    const composer = within(parentNode).getByTestId('tm-thread-composer')
    expect(composer.getAttribute('data-tm-composer-mode')).toBe('reply')
    expect(within(parentNode).getByTestId('tm-inline-reply-composer')).toBeTruthy()

    const block = screen.getByTestId('tm-issue-thread-block')
    expect(block.contains(composer)).toBe(true)
    /* not a post-block sibling of IssueThreadBlock */
    const afterBlock = [...mount.children].find((el) => el === composer)
    expect(afterBlock).toBeUndefined()
  })

  it('root compose stays bottom after IssueThreadBlock when no replyTarget', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
       previewNodeBudget={99} />,
    )
    const mount = screen.getByTestId('tm-thread-mount')
    const block = screen.getByTestId('tm-issue-thread-block')
    const composer = screen.getByTestId('tm-thread-composer')
    expect(mount.getAttribute('data-tm-reply-inline')).toBe('false')
    expect(block.contains(composer)).toBe(false)
    expect(mount.contains(composer)).toBe(true)
    const kids = [...mount.children]
    expect(kids.indexOf(composer)).toBeGreaterThan(kids.indexOf(block))
  })

  it('cancel reply clears target · unmounts inline · root returns', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
        initialReplyParentId="fx-a"
       previewNodeBudget={99} />,
    )
    const parent = screen.getByTestId('tm-comment-node-fx-a')
    expect(within(parent).getByTestId('tm-thread-composer')).toBeTruthy()
    fireEvent.click(screen.getByTestId('tm-composer-cancel-reply'))
    expect(screen.getByTestId('tm-thread-mount').getAttribute('data-tm-reply-parent')).toBe('')
    expect(screen.getByTestId('tm-thread-mount').getAttribute('data-tm-reply-inline')).toBe(
      'false',
    )
    expect(within(parent).queryByTestId('tm-thread-composer')).toBeNull()
    const block = screen.getByTestId('tm-issue-thread-block')
    const composer = screen.getByTestId('tm-thread-composer')
    expect(composer.getAttribute('data-tm-composer-mode')).toBe('root')
    expect(block.contains(composer)).toBe(false)
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
  })

  it('draft + fail F stay single-owner with inline reply', async () => {
    const { createFixtureAdapter } = await import('../adapters/FixtureAdapter.js')
    const adapter = createFixtureAdapter('populated')
    adapter.setFailNextPost(true)
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
        initialReplyParentId="fx-a1"
        onPostComment={(p) => adapter.postComment(p)}
       previewNodeBudget={99} />,
    )
    const parent = screen.getByTestId('tm-comment-node-fx-a1')
    expect(within(parent).getByTestId('tm-thread-composer')).toBeTruthy()
    fireEvent.click(screen.getByTestId('tm-composer-post'))
    await screen.findByTestId('tm-composer-fail')
    expect(within(parent).getByTestId('tm-composer-fail')).toBeTruthy()
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
    expect(screen.getByTestId('tm-thread-mount').getAttribute('data-tm-reply-parent')).toBe(
      'fx-a1',
    )
    expect(screen.getAllByTestId('tm-thread-composer')).toHaveLength(1)
  })
})
