/** @vitest-environment jsdom */
/**
 * LAB-04 shallow overlay — superseded on Done path by LAB-10 FeedIssueDetailOverlay.
 * Retargeted to greenfield hit targets + panel ids.
 */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'

const dir = path.dirname(fileURLToPath(import.meta.url))
const feedLabRoot = path.resolve(dir, '..')

const BAN_IMPORT_LINE_RE =
  /^\s*import\s+.*\b(BoardIssuePost|FeedCivicPost|FeedDiscussionBlock|NextFeedHostPage|FeedToolbar)\b|^\s*import\s+.*ReactionControls\.css/

function collectJsFiles(root) {
  const out = []
  for (const name of readdirSync(root, { withFileTypes: true })) {
    const p = path.join(root, name.name)
    if (name.isDirectory()) {
      if (name.name === '__tests__' || name.name === 'node_modules') continue
      out.push(...collectJsFiles(p))
    } else if (/\.(jsx?|css)$/.test(name.name)) {
      out.push(p)
    }
  }
  return out
}

function hasBannedImport(src) {
  return src.split(/\n/).some((line) => BAN_IMPORT_LINE_RE.test(line))
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

describe('FeedLab overlay NF-LAB-04 (superseded → LAB-10 greenfield)', () => {
  afterEach(() => cleanup())

  it('opens greenfield overlay from title hit and closes via close button', () => {
    renderLab()
    expect(screen.queryByTestId('overlay-host')).toBeNull()
    const titles = screen.getAllByTestId('feed-post-title')
    fireEvent.click(titles[0])
    expect(screen.getByTestId('overlay-host')).toBeTruthy()
    expect(screen.getByTestId('issue-presentation-layout')).toBeTruthy()
    expect(screen.getByTestId('feed-issue-detail-panel')).toBeTruthy()
    expect(screen.getByTestId('feed-issue-detail-body').textContent).toContain(
      'DOGEstonia-UusVeerenni-001',
    )
    fireEvent.click(screen.getByTestId('feed-issue-detail-close'))
    expect(screen.queryByTestId('overlay-host')).toBeNull()
  })

  it('does not open overlay from action strip', () => {
    renderLab()
    const card = screen.getByTestId('feed-post-card-DOGEstonia-UusVeerenni-001')
    fireEvent.click(within(card).getByTestId('feed-post-action-strip'))
    expect(screen.queryByTestId('overlay-host')).toBeNull()
    fireEvent.click(within(card).getByTestId('feed-post-action-react'))
    expect(screen.queryByTestId('overlay-host')).toBeNull()
  })

  it('lab Done path holds ban-list including overlay module', () => {
    for (const file of collectJsFiles(feedLabRoot)) {
      const src = readFileSync(file, 'utf8')
      expect(hasBannedImport(src)).toBe(false)
    }
  })

  it('discussion in overlay is not classic DISCUSSION', () => {
    renderLab()
    fireEvent.click(screen.getAllByTestId('feed-post-media')[2])
    expect(screen.getByTestId('feed-issue-detail-panel')).toBeTruthy()
    const body = screen.getByTestId('feed-issue-detail-body')
    expect(within(body).queryByTestId('feed-post-discussion-summary-title')).toBeNull()
    const headers = within(body).getAllByTestId('tm-thread-heading')
    expect(headers.length).toBeGreaterThan(0)
    for (const h of headers) {
      expect(h.textContent?.trim()).toBe('Discussion')
      expect(h.textContent?.trim()).not.toBe('DISCUSSION')
    }
  })
})
