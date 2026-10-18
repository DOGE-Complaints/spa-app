/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ThreadMount } from '../ThreadMount.jsx'
import { ThreadComposer, M153_ILLUSTRATIVE_DRAFT } from '../composer/ThreadComposer.jsx'
import { THREAD_NEST_COMMENTS, createFixtureAdapter } from '../adapters/FixtureAdapter.js'

describe('CT-04 ThreadComposer · draft · fail · focus', () => {
  afterEach(() => cleanup())

  it('root mode labels Write a comment / Post comment', () => {
    render(
      <ThreadMount status="empty" writeCapability="allowed" comments={[]} expanded />,
    )
    const composer = screen.getByTestId('tm-thread-composer')
    expect(composer.getAttribute('data-tm-composer-mode')).toBe('root')
    expect(screen.getByTestId('tm-composer-root-label').textContent).toMatch(/Write a comment/i)
    expect(screen.getByTestId('tm-composer-post').textContent).toMatch(/Post comment/i)
  })

  it('Reply sets reply context · parent excerpt · Cancel keeps draft', async () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
      />,
    )
    const rootReply = screen
      .getByTestId('tm-comment-node-fx-a')
      .querySelector(':scope > .tm-comment-node__row [data-testid="tm-comment-reply"]')
    fireEvent.click(rootReply)
    expect(screen.getByTestId('tm-thread-composer').getAttribute('data-tm-composer-mode')).toBe(
      'reply',
    )
    expect(screen.getByTestId('tm-composer-parent-excerpt').textContent).toContain(
      'pet-care group',
    )
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
    fireEvent.click(screen.getByTestId('tm-composer-cancel-reply'))
    expect(screen.getByTestId('tm-thread-composer').getAttribute('data-tm-composer-mode')).toBe(
      'root',
    )
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
  })

  it('post fail F keeps draft+target · Try again / Keep editing', async () => {
    const adapter = createFixtureAdapter('populated')
    adapter.setFailNextPost(true)
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
        initialReplyParentId="fx-a"
        onPostComment={(p) => adapter.postComment(p)}
      />,
    )
    fireEvent.click(screen.getByTestId('tm-composer-post'))
    await waitFor(() => expect(screen.getByTestId('tm-composer-fail')).toBeTruthy())
    expect(screen.getByTestId('tm-composer-fail-title').textContent).toMatch(/wasn’t posted/i)
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
    expect(screen.getByTestId('tm-thread-mount').getAttribute('data-tm-reply-parent')).toBe('fx-a')
    fireEvent.click(screen.getByTestId('tm-composer-keep-editing'))
    expect(screen.queryByTestId('tm-composer-fail')).toBeNull()
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
  })

  it('success clears draft · no optimistic without ok', async () => {
    const adapter = createFixtureAdapter('populated')
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft="Fresh fixture body"
        onPostComment={(p) => adapter.postComment(p)}
      />,
    )
    const before = screen.queryByText('Fresh fixture body')
    expect(before).toBeTruthy() // in textarea only
    fireEvent.click(screen.getByTestId('tm-composer-post'))
    await waitFor(() =>
      expect(screen.getByTestId('tm-composer-textarea').value).toBe(''),
    )
    expect(screen.getByTestId('tm-comment-tree').textContent).toContain('Fresh fixture body')
  })

  it('narrow sets sticky keyboard marker', () => {
    render(
      <ThreadComposer mode="root" draft="x" stickyKeyboard />,
    )
    expect(screen.getByTestId('tm-thread-composer').getAttribute('data-lab-sticky-keyboard')).toBe(
      'true',
    )
  })

  it('focusComposer api focuses textarea', async () => {
    const apiRef = { current: null }
    render(
      <ThreadMount
        status="empty"
        writeCapability="allowed"
        comments={[]}
        expanded
        apiRef={apiRef}
      />,
    )
    apiRef.current.focusComposer()
    await waitFor(() =>
      expect(document.activeElement).toBe(screen.getByTestId('tm-composer-textarea')),
    )
  })
})

