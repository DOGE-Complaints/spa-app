/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CommentTree } from '../tree/CommentTree.jsx'
import { THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'

const dir = path.dirname(fileURLToPath(import.meta.url))
const cssPath = path.resolve(dir, '../tree/CommentNode.css')
const css = readFileSync(cssPath, 'utf8')

describe('CT-18 M153b depth-2 token chrome · A–D', () => {
  afterEach(() => cleanup())

  it('CSS register · px tokens · no #2E90FA · M153b A–C literals', () => {
    expect(css).toMatch(/--tm-bubble-fill:\s*#f7f6f2/i)
    expect(css).toMatch(/--tm-bubble-border:\s*#e7e4dc/i)
    expect(css).toMatch(/--tm-spine-color:\s*#667085/i)
    expect(css).toMatch(/--tm-action-group-fill:\s*#fffdf8/i)
    expect(css).toMatch(/--tm-action-text:\s*#b54708/i)
    expect(css).toMatch(/--tm-reply-parent-marker:\s*#b54708/i)
    expect(css).toMatch(/--tm-indent-step:\s*44px/)
    expect(css).toMatch(/--tm-indent-step:\s*24px/)
    expect(css).toMatch(/min-height:\s*44px/)
    expect(css).toMatch(/border-radius:\s*12px/)
    expect(css).toMatch(/padding:\s*12px\s+16px/)
    expect(css).toMatch(/border-bottom-left-radius:\s*6px/)
    expect(css).not.toMatch(/#2[Ee]90[Ff][Aa]/)
    expect(css).not.toMatch(/--tm-action-pill-fg/)
    // §8 · indent expressed in px, not rem-as-16
    expect(css).not.toMatch(/--tm-indent-step:\s*[\d.]+rem/)
  })

  it('selected reply parent · §6 marker class + data attrs', () => {
    render(
      <CommentTree
        comments={THREAD_NEST_COMMENTS}
        selectedReplyParentId="fx-a"
        renderCommentReactions={({ commentId }) => (
          <button type="button" data-testid={`stub-react-${commentId}`}>
            React
          </button>
        )}
      />,
    )
    const root = screen.getByTestId('tm-comment-node-fx-a')
    expect(root.getAttribute('data-lab-ct18')).toBe('true')
    expect(root.getAttribute('data-tm-reply-parent-selected')).toBe('true')
    const bubble = root.querySelector(
      ':scope > .tm-comment-node__row [data-testid="tm-comment-body"]',
    )
    expect(bubble).toBeTruthy()
    expect(bubble.className).toMatch(/tm-comment-node__bubble--reply-parent/)
    expect(bubble.getAttribute('data-tm-reply-parent-marker')).toBe('true')

    const child = screen.getByTestId('tm-comment-node-fx-a1')
    expect(child.getAttribute('data-tm-reply-parent-selected')).toBe('false')
  })

  it('pill pair Present · shared group chrome for ≥44 path', () => {
    render(
      <CommentTree
        comments={THREAD_NEST_COMMENTS}
        renderCommentReactions={() => (
          <button type="button" data-testid="stub-react">
            React
          </button>
        )}
      />,
    )
    const root = screen.getByTestId('tm-comment-node-fx-a')
    const pills = root.querySelector(
      ':scope > .tm-comment-node__row [data-testid="tm-comment-action-pills"]',
    )
    expect(pills).toBeTruthy()
    expect(within(pills).getByTestId('tm-comment-reply')).toBeTruthy()
    expect(within(pills).getByTestId('tm-comment-action-sep')).toBeTruthy()
  })
})
