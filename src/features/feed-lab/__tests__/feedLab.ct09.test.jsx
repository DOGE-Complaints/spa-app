/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { LAB_FEED_FIXTURES } from '../fixtures/index.js'

const dir = path.dirname(fileURLToPath(import.meta.url))

function renderLab() {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={['/lab/feed']}>
        <Routes>
          <Route path="/lab/feed" element={<FeedLabPage />} />
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('CT-09 lab wire · comment target reactions plug', () => {
  afterEach(() => cleanup())

  it('TREE stand nests show ReactionsMount target=comment · no Share on node', () => {
    renderLab()
    const tree = screen.getByTestId('feed-lab-ct08-stand-TREE')
    const host = within(tree).getByTestId('feed-lab-thread-mount')
    expect(host.getAttribute('data-lab-ct09')).toBe('true')
    expect(host.getAttribute('data-lab-reactions-plug')).toBe('comment')
    const slot = within(tree).getByTestId('tm-comment-reaction-slot-ct08-t-a')
    const rm = within(slot).getByTestId('reactions-mount')
    expect(rm.getAttribute('data-rm-target')).toBe('comment')
    const node = within(tree).getByTestId('tm-comment-node-ct08-t-a')
    expect(within(node).getByTestId('tm-comment-reply')).toBeTruthy()
    expect(within(node).queryByText(/^Share$/i)).toBeNull()
  })

  it('React on comment opens picker · composer focus signal unchanged', () => {
    renderLab()
    const tree = screen.getByTestId('feed-lab-ct08-stand-TREE')
    const mount = within(tree).getByTestId('tm-thread-mount')
    const before = Number(mount.getAttribute('data-tm-focus-signal') || '0')
    const slot = within(tree).getByTestId('tm-comment-reaction-slot-ct08-t-a')
    const rm = within(slot).getByTestId('reactions-mount')
    expect(rm.getAttribute('data-rm-picker-open')).toBe('false')
    fireEvent.click(within(slot).getByTestId('reaction-summary-react'))
    const after = Number(
      within(tree).getByTestId('tm-thread-mount').getAttribute('data-tm-focus-signal') || '0',
    )
    expect(after).toBe(before)
    expect(within(slot).getByTestId('reactions-mount').getAttribute('data-rm-picker-open')).toBe(
      'true',
    )
  })

  it('card cutover host keeps root strip reactSlot · comment plugs Present when expanded', () => {
    renderLab()
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    expect(within(card).getByTestId('feed-lab-reactions-mount')).toBeTruthy()
    fireEvent.click(within(card).getByTestId('feed-post-action-comment'))
    const firstCommentId = LAB_FEED_FIXTURES[0].comments[0].id
    const slot = within(card).getByTestId(`tm-comment-reaction-slot-${firstCommentId}`)
    expect(within(slot).getByTestId('reactions-mount').getAttribute('data-rm-target')).toBe(
      'comment',
    )
  })

  it('source: FeedLabThreadMount wires FeedLabReactionsMount · CommentNode has no CR import', () => {
    const hostSrc = readFileSync(
      path.resolve(dir, '../post/thread/FeedLabThreadMount.jsx'),
      'utf8',
    )
    expect(hostSrc).toMatch(/FeedLabReactionsMount/)
    expect(hostSrc).toMatch(/target=["']comment["']/)
    expect(hostSrc).toMatch(/renderCommentReactions/)
    const nodeSrc = readFileSync(
      path.resolve(dir, '../../thread-mount/tree/CommentNode.jsx'),
      'utf8',
    )
    expect(nodeSrc).not.toMatch(/FeedLabReactionsMount/)
    expect(nodeSrc).not.toMatch(/ReactorsPopover/)
  })
})
