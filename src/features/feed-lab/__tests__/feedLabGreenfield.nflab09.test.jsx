/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { FeedDiscussionPlane } from '../post/discussion/index.js'
import { LAB_FEED_FIXTURES } from '../fixtures/index.js'

const dir = path.dirname(fileURLToPath(import.meta.url))
const discussionRoot = path.resolve(dir, '../post/discussion')

const BAN_RE =
  /^\s*import\s+.*\b(FeedLabDiscussionDeprecated|FeedDiscussionBlock|DiscussionLayout|DiscussionSummaryChrome)\b/

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

describe('FeedLab greenfield NF-LAB-09 discussion', () => {
  afterEach(() => cleanup())

  it('scaffolds discussion modules under feed-lab/post/discussion/', () => {
    expect(existsSync(path.join(discussionRoot, 'FeedDiscussionPlane.jsx'))).toBe(true)
    expect(existsSync(path.join(discussionRoot, 'FeedDiscussionSummary.jsx'))).toBe(true)
    expect(existsSync(path.join(discussionRoot, 'FeedDiscussionHeader.jsx'))).toBe(true)
    expect(existsSync(path.join(discussionRoot, 'FeedCommentTree.jsx'))).toBe(true)
    expect(existsSync(path.join(discussionRoot, 'FeedComposerEntry.jsx'))).toBe(true)
    expect(existsSync(path.join(discussionRoot, 'index.js'))).toBe(true)
    expect(typeof FeedDiscussionPlane).toBe('function')
  })

  it('bans Deprecated discussion / FeedDiscussionBlock / classic DISCUSSION chrome', () => {
    for (const file of collectJsFiles(discussionRoot)) {
      const src = readFileSync(file, 'utf8')
      expect(src.split(/\n/).some((l) => BAN_RE.test(l)), file).toBe(false)
      expect(
        src.split(/\n/).some((l) => /^\s*import\s+.*FeedDiscussionBlock/.test(l)),
        file,
      ).toBe(false)
      // no classic uppercase label as user-facing chrome / class
      expect(/\bDISCUSSION\b/.test(src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')), file).toBe(
        false,
      )
      expect(src.includes('feed-discussion-label'), file).toBe(false)
      expect(src.includes('feed-discussion-view'), file).toBe(false)
    }
  })

  it('Comment strip expands discussion · literal bodies · reaction adjacency', () => {
    renderLab()
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-visual-done')).toBe('false')
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    expect(card.getAttribute('data-lab-discussion')).toBe('m152')
    const plane = within(card).getByTestId('feed-post-discussion-plane')
    expect(plane.getAttribute('data-lab-discussion')).toBe('collapsed')
    expect(within(card).getByTestId('feed-post-discussion-reaction-slot').getAttribute('data-lab-reaction-adjacency')).toBe(
      'm152-c',
    )
    expect(within(card).getByTestId('feed-lab-reactions-mount')).toBeTruthy()
    expect(within(card).getByTestId('reactions-mount')).toBeTruthy()
    expect(within(card).queryByTestId('feed-reaction-plane')).toBeNull()
    expect(within(card).getByTestId('feed-post-discussion-summary-title').textContent).toMatch(/Thread/)
    expect(within(card).getByText('Noise after 23:00 again.')).toBeTruthy()

    fireEvent.click(within(card).getByTestId('feed-post-action-comment'))
    expect(within(card).getByTestId('feed-post-discussion-plane').getAttribute('data-lab-discussion')).toBe(
      'expanded',
    )
    expect(within(card).getByTestId('feed-post-discussion-header').textContent).toContain('Thread')
    expect(within(card).getByTestId('feed-post-discussion-header').textContent).not.toMatch(/DISCUSSION/)
    expect(within(card).getByTestId('feed-post-comment-tree')).toBeTruthy()
    expect(within(card).getByTestId('feed-post-comment-node-lab-c-001-a').textContent).toContain(
      'Noise after 23:00 again.',
    )
    expect(within(card).getByTestId('feed-post-composer-entry')).toBeTruthy()
  })

  it('keeps visual Done false until OP eye', () => {
    renderLab()
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-visual-done')).toBe('false')
    expect(screen.getAllByTestId('feed-post-discussion-plane')).toHaveLength(5)
  })
})
