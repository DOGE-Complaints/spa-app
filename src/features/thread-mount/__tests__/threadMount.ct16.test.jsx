/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useState } from 'react'
import { ThreadMount } from '../ThreadMount.jsx'
import { THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'

function HostOwnedMount({ initial = THREAD_NEST_COMMENTS }) {
  const [comments, setComments] = useState(() => initial.map((c) => ({ ...c })))
  return (
    <ThreadMount
      status="populated"
      comments={comments}
      writeCapability="allowed"
      expanded
      commentWriteOwner="host"
      onPostComment={async ({ body, parentId }) => {
        const comment = {
          id: `lab-posted-test`,
          parentId: parentId || null,
          depth: parentId ? 1 : 0,
          body,
        }
        setComments((prev) => [...prev, comment])
        return { ok: true, comment }
      }}
    />
  )
}

describe('CT-16 dual-append post ownership · Arch §12.1', () => {
  afterEach(() => cleanup())

  it('pins data-tm-comment-write-owner=host', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        commentWriteOwner="host"
      />,
    )
    expect(screen.getByTestId('tm-thread-mount').getAttribute('data-tm-comment-write-owner')).toBe(
      'host',
    )
    expect(screen.getByTestId('tm-thread-mount').getAttribute('data-lab-ct16')).toBe('true')
  })

  it('host owner · reply post → unique comment ids · forest not flat from duplicate-id', async () => {
    render(<HostOwnedMount />)
    const replyBtn = screen
      .getByTestId('tm-comment-node-fx-a')
      .querySelector(':scope > .tm-comment-node__row [data-testid="tm-comment-reply"]')
    fireEvent.click(replyBtn)
    fireEvent.change(screen.getByTestId('tm-composer-textarea'), {
      target: { value: 'Unique reply body' },
    })
    fireEvent.click(screen.getByTestId('tm-composer-post'))
    await waitFor(() => {
      expect(screen.getByText('Unique reply body')).toBeTruthy()
    })
    const nodes = screen.getAllByTestId(/^tm-comment-node-/)
    const ids = nodes.map((n) => n.getAttribute('data-testid'))
    expect(ids.filter((id) => id === 'tm-comment-node-lab-posted-test')).toHaveLength(1)
    const tree = screen.getByTestId('tm-comment-tree')
    expect(tree.getAttribute('data-tm-forest')).not.toBe('flat')
    expect(tree.getAttribute('data-tm-fallback-reason')).not.toBe('duplicate-id')
  })

  it('host owner · root post → unique ids · no dual local append', async () => {
    render(<HostOwnedMount />)
    fireEvent.change(screen.getByTestId('tm-composer-textarea'), {
      target: { value: 'Root unique body' },
    })
    fireEvent.click(screen.getByTestId('tm-composer-post'))
    await waitFor(() => {
      expect(screen.getByText('Root unique body')).toBeTruthy()
    })
    expect(screen.getAllByTestId('tm-comment-node-lab-posted-test')).toHaveLength(1)
  })

  it('mount owner · onPostComment still local-appends when props static', async () => {
    const onPost = vi.fn(async ({ body }) => ({
      ok: true,
      comment: { id: 'fx-posted-1', parentId: null, depth: 0, body },
    }))
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        commentWriteOwner="mount"
        onPostComment={onPost}
      />,
    )
    fireEvent.change(screen.getByTestId('tm-composer-textarea'), {
      target: { value: 'Mount owned body' },
    })
    fireEvent.click(screen.getByTestId('tm-composer-post'))
    await waitFor(() => {
      expect(screen.getByText('Mount owned body')).toBeTruthy()
    })
    expect(onPost).toHaveBeenCalled()
    expect(screen.getAllByTestId('tm-comment-node-fx-posted-1')).toHaveLength(1)
  })
})
