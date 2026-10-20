/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import {
  MAX_DEPTH_REACHED_COPY,
  VISUAL_INDENT_CAP,
  canReplyAtDepth,
  visualIndentLevel,
  resolveMaxDepth,
  resolveVisualIndentCap,
} from '../config/threadMountConfig.js'
import { buildCommentForest } from '../tree/buildCommentForest.js'
import { CommentTree } from '../tree/CommentTree.jsx'
import { ThreadMount } from '../ThreadMount.jsx'
import {
  M153_NEST_BODIES,
  THREAD_DEPTH_VS_CAP_COMMENTS,
  THREAD_NEST_COMMENTS,
  THREAD_ORPHAN_COMMENTS,
} from '../adapters/FixtureAdapter.js'

describe('CT-03 CommentTree nesting · maxDepth · Reply', () => {
  afterEach(() => cleanup())

  it('config: VISUAL_INDENT_CAP ≠ resolveMaxDepth knobs stay distinct', () => {
    expect(VISUAL_INDENT_CAP).toBe(3)
    expect(resolveMaxDepth(5)).toBe(5)
    expect(resolveVisualIndentCap(3)).toBe(3)
    expect(canReplyAtDepth(2, 3)).toBe(true)
    expect(canReplyAtDepth(3, 3)).toBe(false)
    expect(visualIndentLevel(4, 3)).toBe(3)
    expect(visualIndentLevel(4, 3)).not.toBe(resolveMaxDepth(5))
  })

  it('builds A→A1→A1a nest · literal bodies', () => {
    const forest = buildCommentForest(THREAD_NEST_COMMENTS)
    expect(forest.mode).toBe('tree')
    expect(forest.roots).toHaveLength(3)
    const a = forest.roots.find((n) => n.id === 'fx-a')
    expect(a?.children[0]?.id).toBe('fx-a1')
    expect(a?.children[0]?.children[0]?.body).toBe(M153_NEST_BODIES.A1a)
  })

  it('orphans → flat fallback · no invent parent', () => {
    const forest = buildCommentForest(THREAD_ORPHAN_COMMENTS)
    expect(forest.mode).toBe('flat')
    expect(forest.reason).toBe('orphan')
    render(<CommentTree comments={THREAD_ORPHAN_COMMENTS} />)
    expect(screen.getByTestId('tm-comment-tree').getAttribute('data-tm-forest')).toBe('flat')
    expect(screen.getByTestId('tm-comment-flat-fallback')).toBeTruthy()
    expect(screen.getByText(M153_NEST_BODIES.orphan)).toBeTruthy()
  })

  it('Reply gate · max-depth copy at depth >= maxDepth', () => {
    render(<CommentTree comments={THREAD_NEST_COMMENTS} maxDepth={2} />)
    const a1a = screen.getByTestId('tm-comment-node-fx-a1a')
    expect(a1a.getAttribute('data-tm-reply')).toBe('blocked')
    expect(within(a1a).getByTestId('tm-comment-max-depth').textContent).toBe(MAX_DEPTH_REACHED_COPY)
    expect(within(a1a).queryByTestId('tm-comment-reply')).toBeNull()
    const a1 = screen.getByTestId('tm-comment-node-fx-a1')
    expect(a1.getAttribute('data-tm-reply')).toBe('eligible')
    expect(within(a1).getByTestId('tm-comment-reply')).toBeTruthy()
  })

  it('visual indent caps while Reply may remain when maxDepth higher', () => {
    render(<CommentTree comments={THREAD_DEPTH_VS_CAP_COMMENTS} maxDepth={5} visualIndentCap={3} />)
    const deep = screen.getByTestId('tm-comment-node-fx-d4')
    expect(deep.getAttribute('data-tm-indent')).toBe('3')
    expect(deep.getAttribute('data-tm-visual-capped')).toBe('true')
    expect(deep.getAttribute('data-tm-reply')).toBe('eligible')
    expect(within(deep).getByTestId('tm-comment-reply')).toBeTruthy()
  })

  it('ThreadMount expanded mounts CommentTree · ct03 markers', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
       previewNodeBudget={99} />,
    )
    const mount = screen.getByTestId('tm-thread-mount')
    expect(mount.getAttribute('data-lab-ct03')).toBe('true')
    expect(mount.getAttribute('data-tm-visual-indent-cap')).toBe('3')
    expect(screen.getByTestId('tm-comment-tree')).toBeTruthy()
    expect(screen.getByText(M153_NEST_BODIES.A1a)).toBeTruthy()
    const rootA = screen.getByTestId('tm-comment-node-fx-a')
    const rootReply = rootA.querySelector(
      ':scope > .tm-comment-node__row [data-testid="tm-comment-reply"]',
    )
    expect(rootReply).toBeTruthy()
    fireEvent.click(rootReply)
  })
})
