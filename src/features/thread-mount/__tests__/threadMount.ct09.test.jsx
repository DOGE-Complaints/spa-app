/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CommentTree } from '../tree/CommentTree.jsx'
import { ThreadMount } from '../ThreadMount.jsx'
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

describe('CT-09 CommentNode reactions plug slot', () => {
  afterEach(() => cleanup())

  it('renderCommentReactions mounts per nested node · React + Reply only', () => {
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
    expect(screen.getByTestId('tm-comment-tree').getAttribute('data-lab-ct09')).toBe('true')
    const root = screen.getByTestId('tm-comment-node-fx-a')
    expect(within(root).getByTestId('tm-comment-reaction-slot-fx-a')).toBeTruthy()
    expect(within(root).getByTestId('stub-react-fx-a').getAttribute('data-rm-target')).toBe(
      'comment',
    )
    const actions = within(root).getAllByTestId('tm-comment-actions')[0]
    expect(within(actions).getByTestId('tm-comment-reply')).toBeTruthy()
    expect(within(actions).queryByText(/Share/i)).toBeNull()
    expect(within(actions).queryByTestId('feed-post-action-share')).toBeNull()
    expect(screen.getByTestId('stub-react-fx-a1')).toBeTruthy()
    expect(screen.getByTestId('stub-react-fx-a1a')).toBeTruthy()
  })

  it('ThreadMount host prop wires slot · picker click does not steal composer focus signal', () => {
    let focusBefore = 0
    const { container } = render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        renderCommentReactions={({ commentId }) => (
          <button
            type="button"
            data-testid={`tm-stub-react-${commentId}`}
            data-rm-target="comment"
            onClick={() => {
              /* host reactions peer owns picker — stub only */
            }}
          >
            React
          </button>
        )}
      />,
    )
    const mount = screen.getByTestId('tm-thread-mount')
    expect(mount.getAttribute('data-lab-ct09')).toBe('true')
    expect(mount.getAttribute('data-tm-reactions-plug')).toBe('host')
    focusBefore = Number(mount.getAttribute('data-tm-focus-signal') || '0')
    fireEvent.click(screen.getByTestId('tm-stub-react-fx-a'))
    const after = Number(
      container.querySelector('[data-testid="tm-thread-mount"]')?.getAttribute('data-tm-focus-signal') ||
        '0',
    )
    expect(after).toBe(focusBefore)
  })

  it('boundary: thread-mount sources ban ReactorsPopover / people open ownership imports', () => {
    for (const file of collectJsFiles(packageRoot)) {
      const src = readFileSync(file, 'utf8')
      const lines = src.split(/\n/)
      const badPopover = lines.some(
        (l) => /^\s*import\s+/.test(l) && /\bReactorsPopover\b/.test(l),
      )
      expect(badPopover, file).toBe(false)
      // package must not own people surface modules
      const badPeople = lines.some(
        (l) =>
          /^\s*import\s+/.test(l) &&
          /ReactorsPeople|openPeople|PeopleSheet/.test(l) &&
          !/ban|Ban|never|R-bound|no people/i.test(l),
      )
      expect(badPeople, file).toBe(false)
    }
    const nodeSrc = readFileSync(path.join(packageRoot, 'tree/CommentNode.jsx'), 'utf8')
    expect(nodeSrc).toMatch(/renderCommentReactions/)
    expect(nodeSrc).not.toMatch(/FeedLabReactionsMount/)
    expect(nodeSrc).not.toMatch(/from ['"].*reactions-mount/)
  })
})
