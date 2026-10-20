/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { FeedLabThreadMount } from '../post/thread/FeedLabThreadMount.jsx'

const NEST = [
  { id: 'lab-c-a', body: 'Parent nest', parentId: null, depth: 0 },
  { id: 'lab-c-a1', body: 'Child nest', parentId: 'lab-c-a', depth: 1 },
]

describe('CT-16 FeedLab host write-owner · BUG-1', () => {
  afterEach(() => cleanup())

  it('marks host write-owner on lab mount', () => {
    render(
      <FeedLabThreadMount
        comments={NEST}
        writeCapability="allowed"
        initiallyExpanded
        branchDisclosure
      />,
    )
    expect(screen.getByTestId('feed-lab-thread-mount').getAttribute('data-lab-ct16')).toBe('true')
    expect(
      screen.getByTestId('feed-lab-thread-mount').getAttribute('data-lab-comment-write-owner'),
    ).toBe('host')
    expect(screen.getByTestId('tm-thread-mount').getAttribute('data-tm-comment-write-owner')).toBe(
      'host',
    )
  })

  it('reply post → unique lab-posted ids · forest not flat', async () => {
    render(
      <FeedLabThreadMount comments={NEST} writeCapability="allowed" initiallyExpanded />,
    )
    const replyBtn = screen
      .getByTestId('tm-comment-node-lab-c-a')
      .querySelector(':scope > .tm-comment-node__row [data-testid="tm-comment-reply"]')
    fireEvent.click(replyBtn)
    fireEvent.change(screen.getByTestId('tm-composer-textarea'), {
      target: { value: 'Lab reply unique' },
    })
    fireEvent.click(screen.getByTestId('tm-composer-post'))
    await waitFor(() => {
      expect(screen.getByTestId('tm-composer-textarea').value).toBe('')
      expect(
        document.querySelectorAll('[data-testid^="tm-comment-node-lab-posted-"]').length,
      ).toBe(1)
    })
    const posted = [...document.querySelectorAll('[data-testid^="tm-comment-node-lab-posted-"]')]
    const ids = posted.map((n) => n.getAttribute('data-testid'))
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.length).toBe(1)
    const tree = screen.getByTestId('tm-comment-tree')
    expect(tree.getAttribute('data-tm-forest')).not.toBe('flat')
    expect(tree.getAttribute('data-tm-fallback-reason')).not.toBe('duplicate-id')
  })

  it('root post → unique ids', async () => {
    render(
      <FeedLabThreadMount comments={NEST} writeCapability="allowed" initiallyExpanded />,
    )
    fireEvent.change(screen.getByTestId('tm-composer-textarea'), {
      target: { value: 'Lab root unique' },
    })
    fireEvent.click(screen.getByTestId('tm-composer-post'))
    await waitFor(() => {
      expect(screen.getByTestId('tm-composer-textarea').value).toBe('')
      expect(
        document.querySelectorAll('[data-testid^="tm-comment-node-lab-posted-"]').length,
      ).toBe(1)
    })
    const posted = [...document.querySelectorAll('[data-testid^="tm-comment-node-lab-posted-"]')]
    expect(posted).toHaveLength(1)
  })
})

