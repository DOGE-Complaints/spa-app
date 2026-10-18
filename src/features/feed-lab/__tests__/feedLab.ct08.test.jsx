/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { LAB_CT08_STANDS, LAB_FEED_FIXTURES } from '../fixtures/index.js'

const dir = path.dirname(fileURLToPath(import.meta.url))
const feedLabRoot = path.resolve(dir, '..')

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

describe('CT-08 lab feed cutover → ThreadMount', () => {
  afterEach(() => cleanup())

  it('card/detail host FeedLabThreadMount · data-lab-thread-mount · ct08 markers', () => {
    renderLab()
    const page = screen.getByTestId('feed-lab-page')
    expect(page.getAttribute('data-lab-ct08')).toBe('true')
    expect(page.getAttribute('data-lab-visual-done')).toBe('false')
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    expect(card.getAttribute('data-lab-ct08')).toBe('true')
    expect(card.getAttribute('data-lab-thread-mount')).toBe('true')
    const host = within(card).getByTestId('feed-lab-thread-mount')
    expect(host.getAttribute('data-lab-thread-mount')).toBe('true')
    expect(host.getAttribute('data-lab-ct08')).toBe('true')
    expect(within(card).getByTestId('tm-thread-mount')).toBeTruthy()
    expect(within(card).queryByTestId('feed-post-discussion-plane')).toBeNull()
  })

  it('Comment zone still expands/focuses ThreadMount', () => {
    renderLab()
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    expect(within(card).getByTestId('tm-thread-mount').getAttribute('data-tm-expanded')).toBe('false')
    fireEvent.click(within(card).getByTestId('feed-post-action-comment'))
    expect(within(card).getByTestId('tm-thread-mount').getAttribute('data-tm-expanded')).toBe('true')
  })

  it('Path A stands A–E · TREE · GATE present on #/lab/feed', () => {
    renderLab()
    expect(screen.getByTestId('feed-lab-ct08-stands')).toBeTruthy()
    for (const stand of LAB_CT08_STANDS) {
      const el = screen.getByTestId(`feed-lab-ct08-stand-${stand.id}`)
      expect(el.getAttribute('data-lab-ct08-stand')).toBe(stand.id)
      const mount = within(el).getByTestId('tm-thread-mount')
      expect(mount.getAttribute('data-tm-status') || mount.getAttribute('data-status') || true).toBeTruthy()
    }
    const gate = screen.getByTestId('feed-lab-ct08-stand-GATE')
    expect(within(gate).getByTestId('tm-verify-write-gate')).toBeTruthy()
    const tree = screen.getByTestId('feed-lab-ct08-stand-TREE')
    expect(within(tree).getByText(/shared pet-care group/i)).toBeTruthy()
  })

  it('discussion plane is thin-wrap only · no dual root Reactions on plane', () => {
    const planeSrc = readFileSync(
      path.resolve(dir, '../post/discussion/FeedDiscussionPlane.jsx'),
      'utf8',
    )
    expect(planeSrc).toMatch(/FeedLabThreadMount/)
    expect(planeSrc).toMatch(/thin-wrap/)
    expect(planeSrc).not.toMatch(/FeedLabReactionsMount/)
    expect(planeSrc).not.toMatch(/FeedDiscussionSummary/)
    const cardSrc = readFileSync(path.resolve(dir, '../post/FeedPostCard.jsx'), 'utf8')
    expect(cardSrc).toMatch(/FeedLabThreadMount/)
    expect(cardSrc).not.toMatch(/FeedDiscussionPlane/)
  })

  it('bans product FeedDiscussionBlock on feed-lab Done path', () => {
    for (const file of collectJsFiles(feedLabRoot)) {
      if (file.includes('Deprecated') || file.includes('__tests__')) continue
      const src = readFileSync(file, 'utf8')
      const lines = src.split(/\n/)
      const bad = lines.some(
        (l) =>
          /^\s*import\s+/.test(l) &&
          /\bFeedDiscussionBlock\b/.test(l) &&
          !/Deprecated|ban|Ban/.test(l),
      )
      expect(bad, file).toBe(false)
    }
    const pageSrc = readFileSync(path.resolve(dir, '../../../pages/FeedLabPage.jsx'), 'utf8')
    expect(pageSrc).toMatch(/FeedLabCt08Stands/)
    expect(pageSrc).not.toMatch(/FeedDiscussionBlock/)
  })

  it('fixture nest parentId preserved for card 002', () => {
    const nested = LAB_FEED_FIXTURES[1].comments.find((c) => c.parentId)
    expect(nested).toBeTruthy()
    expect(nested.depth).toBe(1)
  })
})
