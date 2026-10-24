/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CommentTree } from '../tree/CommentTree.jsx'
import { THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'

const dir = path.dirname(fileURLToPath(import.meta.url))
const nodeCss = readFileSync(path.resolve(dir, '../tree/CommentNode.css'), 'utf8')

describe('CT-35 comment React empty/filled harmony (M174)', () => {
  afterEach(() => cleanup())

  it('T02 · action pills carry M174 harmony markers', () => {
    render(
      <CommentTree
        comments={THREAD_NEST_COMMENTS}
        renderCommentReactions={({ commentId }) => (
          <button type="button" data-testid={`stub-react-${commentId}`}>
            React
          </button>
        )}
      />,
    )
    const pills = screen
      .getByTestId('tm-comment-node-fx-a')
      .querySelector(':scope > .tm-comment-node__row [data-testid="tm-comment-action-pills"]')
    expect(pills?.getAttribute('data-lab-ct35')).toBe('true')
    expect(pills?.getAttribute('data-tm-ct35-harmony')).toBe('m174')
    expect(within(pills).getByTestId('tm-comment-react-pill').getAttribute('data-lab-ct35')).toBe(
      'true',
    )
    expect(within(pills).getByTestId('tm-comment-reply')).toBeTruthy()
    expect(within(pills).getByTestId('tm-comment-action-sep')).toBeTruthy()
  })

  it('T02 · CSS: chips under React · horizontal entry · no M173 reserved own lane', () => {
    expect(nodeCss).toMatch(
      /\.tm-comment-node__reactions--density\s+\.rm-summary-strip\s*\{[^}]*flex-direction:\s*column/s,
    )
    expect(nodeCss).toMatch(
      /\.tm-comment-node__reactions--density\s+\.rm-summary-strip__react\s*\{[^}]*order:\s*-1/s,
    )
    expect(nodeCss).toMatch(
      /\.tm-comment-node__reactions--density\s+\.rm-summary-strip__react-entry\s*\{[^}]*flex-direction:\s*row/s,
    )
    expect(nodeCss).toMatch(
      /\.tm-comment-node__reactions--density\s+\.rm-summary-strip__react-own\s*\{[^}]*display:\s*none/s,
    )
    expect(nodeCss).toMatch(
      /\.tm-comment-node__reactions--density\s+\.rm-summary-strip__empty\s*\{[^}]*display:\s*none/s,
    )
    expect(nodeCss).toMatch(/data-tm-ct35-harmony/)
  })

  it('T02 · empty stub React · Reply present · no reserved pocket class from M173', () => {
    render(
      <CommentTree
        comments={[{ id: 'e1', parentId: null, depth: 0, body: 'empty harmony' }]}
        renderCommentReactions={() => (
          <div data-testid="stub-empty-react" data-rm-own-in-zone="false">
            <button type="button" data-testid="reaction-summary-react">
              <span data-testid="reaction-summary-react-entry">React</span>
            </button>
          </div>
        )}
      />,
    )
    const pills = screen.getByTestId('tm-comment-action-pills')
    expect(pills.getAttribute('data-tm-ct35-harmony')).toBe('m174')
    expect(within(pills).queryByTestId('reaction-summary-react-own')).toBeNull()
    expect(within(pills).getByTestId('tm-comment-reply-label').textContent).toMatch(/Reply/i)
  })
})
