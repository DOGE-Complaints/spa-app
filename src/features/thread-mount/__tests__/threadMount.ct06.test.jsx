/** @vitest-environment jsdom */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import {
  BRANCH_ERROR_TITLE,
  BRANCH_LOADING_COPY,
  viewRepliesLabel,
} from '../config/threadMountConfig.js'
import { CommentTree } from '../tree/CommentTree.jsx'
import { ThreadMount } from '../ThreadMount.jsx'
import { M153_NEST_BODIES, THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'

describe('CT-06 local branch disclosure · no invent HTTP', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('viewRepliesLabel · count local only', () => {
    expect(viewRepliesLabel(0)).toBe('View replies')
    expect(viewRepliesLabel(1)).toBe('View replies')
    expect(viewRepliesLabel(2)).toBe('View 2 replies')
  })

  it('default branchDisclosure off · children still visible (CT-03)', () => {
    render(<CommentTree comments={THREAD_NEST_COMMENTS} previewNodeBudget={99} />)
    expect(screen.getByTestId('tm-comment-tree').getAttribute('data-tm-branch-disclosure')).toBe(
      'false',
    )
    expect(screen.getByTestId('tm-comment-tree').getAttribute('data-tm-branch-fetch')).toBe('false')
    expect(screen.getByText(M153_NEST_BODIES.A1a)).toBeTruthy()
    expect(screen.queryByTestId('tm-comment-view-replies-fx-a')).toBeNull()
  })

  it('collapsed · View replies · sync expand shows local children', () => {
    render(
      <CommentTree
        comments={THREAD_NEST_COMMENTS}
        branchDisclosure
        branchExpandMode="sync"
        previewNodeBudget={99}
      />,
    )
    const tree = screen.getByTestId('tm-comment-tree')
    expect(tree.getAttribute('data-tm-branch-disclosure')).toBe('true')
    expect(tree.getAttribute('data-tm-branch-fetch')).toBe('false')
    expect(tree.getAttribute('data-lab-ct06')).toBe('true')
    expect(screen.queryByText(M153_NEST_BODIES.A1)).toBeNull()
    const view = screen.getByTestId('tm-comment-view-replies-fx-a')
    expect(view.textContent).toBe(viewRepliesLabel(1))
    fireEvent.click(view)
    expect(screen.getByText(M153_NEST_BODIES.A1)).toBeTruthy()
    expect(screen.getByTestId('tm-comment-node-fx-a').getAttribute('data-tm-branch')).toBe(
      'expanded',
    )
    expect(screen.queryByText(M153_NEST_BODIES.A1a)).toBeNull()
    fireEvent.click(screen.getByTestId('tm-comment-view-replies-fx-a1'))
    expect(screen.getByText(M153_NEST_BODIES.A1a)).toBeTruthy()
  })

  it('delayed expanding chrome · then expanded · no network', async () => {
    render(
      <CommentTree
        comments={THREAD_NEST_COMMENTS}
        branchDisclosure
        branchExpandMode="delayed"
        branchExpandDelayMs={200}
        previewNodeBudget={99}
      />,
    )
    fireEvent.click(screen.getByTestId('tm-comment-view-replies-fx-a'))
    expect(screen.getByTestId('tm-comment-branch-loading-fx-a').textContent).toBe(
      BRANCH_LOADING_COPY,
    )
    expect(screen.queryByText(M153_NEST_BODIES.A1)).toBeNull()
    await act(async () => {
      await vi.advanceTimersByTimeAsync(200)
    })
    expect(screen.getByText(M153_NEST_BODIES.A1)).toBeTruthy()
    expect(screen.queryByTestId('tm-comment-branch-loading-fx-a')).toBeNull()
  })

  it('error stand · Try again scoped · rest of tree intact', async () => {
    render(
      <CommentTree
        comments={THREAD_NEST_COMMENTS}
        branchDisclosure
        branchExpandMode="error"
        branchExpandDelayMs={50}
        initialBranchStates={{ 'fx-a': 'error' }}
        previewNodeBudget={99}
      />,
    )
    const err = screen.getByTestId('tm-comment-branch-error-fx-a')
    expect(within(err).getByText(BRANCH_ERROR_TITLE)).toBeTruthy()
    expect(screen.queryByText(M153_NEST_BODIES.A1)).toBeNull()
    // sibling roots still present
    expect(screen.getByTestId('tm-comment-node-fx-b')).toBeTruthy()
    fireEvent.click(screen.getByTestId('tm-comment-branch-retry-fx-a'))
    expect(screen.getByTestId('tm-comment-branch-loading-fx-a')).toBeTruthy()
    await act(async () => {
      await vi.advanceTimersByTimeAsync(50)
    })
    expect(screen.getByTestId('tm-comment-branch-error-fx-a')).toBeTruthy()
    expect(screen.getByTestId('tm-comment-node-fx-b')).toBeTruthy()
  })

  it('ThreadMount wires branchDisclosure · data-tm-branch-fetch false', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        branchDisclosure
        branchExpandMode="sync"
        previewNodeBudget={99}
      />,
    )
    const mount = screen.getByTestId('tm-thread-mount')
    expect(mount.getAttribute('data-lab-ct06')).toBe('true')
    expect(mount.getAttribute('data-tm-branch-disclosure')).toBe('true')
    expect(screen.getByTestId('tm-comment-tree').getAttribute('data-tm-branch-fetch')).toBe('false')
    expect(screen.getByTestId('tm-comment-view-replies-fx-a')).toBeTruthy()
  })
})
