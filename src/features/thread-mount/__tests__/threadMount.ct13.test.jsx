/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CommentTree } from '../tree/CommentTree.jsx'
import { CommentNode, TM_REPLY_ICON_SRC } from '../tree/CommentNode.jsx'
import { THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'

const dir = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.resolve(dir, '..')

function collectJsFiles(root) {
  const out = []
  for (const name of readdirSync(root, { withFileTypes: true })) {
    const p = path.join(root, name.name)
    if (name.isDirectory()) {
      if (name.name === 'node_modules' || name.name === '__tests__') continue
      out.push(...collectJsFiles(p))
    } else if (/\.(jsx?|css)$/.test(name.name)) {
      out.push(p)
    }
  }
  return out
}

describe('CT-13 comment React/Reply action chrome · G-H5', () => {
  afterEach(() => cleanup())

  it('pill pair React | Reply + separator · reply.svg · not underline-only', () => {
    render(
      <CommentTree
        comments={THREAD_NEST_COMMENTS}
        renderCommentReactions={({ commentId }) => (
          <button type="button" data-testid={`stub-react-${commentId}`} data-rm-target="comment">
            React
          </button>
        )}
      />,
    )
    const root = screen.getByTestId('tm-comment-node-fx-a')
    expect(root.getAttribute('data-lab-ct13')).toBe('true')
    const pills = root.querySelector(
      ':scope > .tm-comment-node__row [data-testid="tm-comment-action-pills"]',
    )
    expect(pills).toBeTruthy()
    expect(within(pills).getByTestId('tm-comment-react-pill')).toBeTruthy()
    expect(within(pills).getByTestId('tm-comment-action-sep')).toBeTruthy()
    const reply = within(pills).getByTestId('tm-comment-reply')
    expect(reply.getAttribute('data-tm-reply-chrome')).toBe('pill')
    expect(within(reply).getByTestId('tm-comment-reply-label').textContent).toMatch(/Reply/i)
    const icon = within(reply).getByTestId('tm-comment-reply-icon')
    expect(icon.getAttribute('src')).toBe(TM_REPLY_ICON_SRC)
    expect(icon.getAttribute('src')).toContain('reply.svg')
    const style = getComputedStyle(reply)
    expect(style.textDecoration.includes('underline')).toBe(false)
    const slot = root.querySelector(
      ':scope > .tm-comment-node__row [data-testid="tm-comment-reaction-slot-fx-a"]',
    )
    expect(slot).toBeTruthy()
    expect(slot.getAttribute('data-tm-react-density')).toBe('compact')
  })

  it('density wrap Present · no Share on comment actions', () => {
    render(
      <CommentTree
        comments={THREAD_NEST_COMMENTS}
        renderCommentReactions={() => (
          <button type="button" data-testid="stub-react" data-rm-target="comment">
            React
          </button>
        )}
      />,
    )
    const root = screen.getByTestId('tm-comment-node-fx-a')
    const actions = root.querySelector(
      ':scope > .tm-comment-node__row [data-testid="tm-comment-actions"]',
    )
    expect(within(actions).queryByText(/Share/i)).toBeNull()
    expect(within(actions).getByTestId('tm-comment-react-pill').className).toMatch(
      /tm-comment-node__pill/,
    )
  })

  it('R-bound: thread-mount still bans people / CR ownership imports', () => {
    for (const file of collectJsFiles(packageRoot)) {
      const src = readFileSync(file, 'utf8')
      const lines = src.split(/\n/)
      const badPopover = lines.some(
        (l) => /^\s*import\s+/.test(l) && /\bReactorsPopover\b/.test(l),
      )
      expect(badPopover, file).toBe(false)
    }
    const nodeSrc = readFileSync(path.join(packageRoot, 'tree/CommentNode.jsx'), 'utf8')
    expect(nodeSrc).toMatch(/TM_REPLY_ICON_SRC/)
    expect(nodeSrc).toMatch(/renderCommentReactions/)
    expect(nodeSrc).not.toMatch(/FeedLabReactionsMount/)
    expect(nodeSrc).not.toMatch(/from ['"].*reactions-mount/)
  })

  it('CommentNode export exposes reply icon path', () => {
    expect(TM_REPLY_ICON_SRC).toBe('/icons/next-feed/actions/reply.svg')
    expect(typeof CommentNode).toBe('function')
  })
})
