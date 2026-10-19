/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import {
  VISUAL_INDENT_CAP,
  resolveMaxDepth,
  visualIndentLevel,
} from '../config/threadMountConfig.js'
import { CommentTree } from '../tree/CommentTree.jsx'
import {
  THREAD_DEPTH_VS_CAP_COMMENTS,
  THREAD_NEST_COMMENTS,
} from '../adapters/FixtureAdapter.js'

describe('CT-14 spine · bubbles · indent cap hold', () => {
  afterEach(() => cleanup())

  it('VISUAL_INDENT_CAP ≠ maxDepth knobs stay distinct (CT-03 hold)', () => {
    expect(VISUAL_INDENT_CAP).toBe(3)
    expect(visualIndentLevel(4, 3)).toBe(3)
    expect(visualIndentLevel(4, 3)).not.toBe(resolveMaxDepth(5))
  })

  it('nested tree · continuous spine rail + L-elbows Present', () => {
    render(<CommentTree comments={THREAD_NEST_COMMENTS} />)
    const root = screen.getByTestId('tm-comment-node-fx-a')
    expect(root.getAttribute('data-lab-ct14')).toBe('true')
    const kids = within(root).getByTestId('tm-comment-children-fx-a')
    expect(kids.getAttribute('data-tm-spine')).toBe('true')
    expect(kids.getAttribute('data-tm-spine-step')).toBe('step')
    expect(kids.className).toMatch(/tm-comment-node__children--spine/)
    expect(kids.className).toMatch(/tm-comment-node__children--step/)

    const a1 = screen.getByTestId('tm-comment-node-fx-a1')
    expect(a1.getAttribute('data-tm-indent')).toBe('1')
    expect(a1.getAttribute('data-tm-parent-indent')).toBe('0')
    const elbow = a1.querySelector(
      ':scope > .tm-comment-node__row [data-testid="tm-comment-connector"]',
    )
    expect(elbow).toBeTruthy()
    expect(elbow.getAttribute('data-tm-spine-elbow')).toBe('true')

    const a1a = screen.getByTestId('tm-comment-node-fx-a1a')
    expect(a1a.getAttribute('data-tm-indent')).toBe('2')
    expect(
      a1a.querySelector(':scope > .tm-comment-node__row [data-testid="tm-comment-connector"]'),
    ).toBeTruthy()
  })

  it('bubble wash token Present · not white elevated invent', () => {
    render(<CommentTree comments={THREAD_NEST_COMMENTS} />)
    const bubble = screen
      .getByTestId('tm-comment-node-fx-a')
      .querySelector(':scope > .tm-comment-node__row [data-testid="tm-comment-body"]')
    expect(bubble).toBeTruthy()
    expect(bubble.className).toMatch(/tm-comment-node__bubble/)
  })

  it('indent cap held · deep node capped · no invent fourth column step', () => {
    render(<CommentTree comments={THREAD_DEPTH_VS_CAP_COMMENTS} maxDepth={5} visualIndentCap={3} />)
    const deep = screen.getByTestId('tm-comment-node-fx-d4')
    expect(deep.getAttribute('data-tm-indent')).toBe('3')
    expect(deep.getAttribute('data-tm-visual-capped')).toBe('true')
    const parent = screen.getByTestId('tm-comment-node-fx-d3')
    const kids = within(parent).getByTestId('tm-comment-children-fx-d3')
    expect(kids.getAttribute('data-tm-spine-step')).toBe('cap')
    expect(kids.className).toMatch(/tm-comment-node__children--cap/)
  })
})
