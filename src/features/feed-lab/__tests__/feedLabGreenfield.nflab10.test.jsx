/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { FeedIssueDetailOverlay, FeedIssueDetailBody } from '../post/index.js'
import { LAB_FEED_FIXTURES } from '../fixtures/index.js'

const dir = path.dirname(fileURLToPath(import.meta.url))
const postRoot = path.resolve(dir, '../post')
const pageSrc = readFileSync(path.resolve(dir, '../../../pages/FeedLabPage.jsx'), 'utf8')

const DEPRECATED_IMPORT_RE =
  /^\s*import\s+.*\b\w*Deprecated\b/

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

describe('FeedLab greenfield NF-LAB-10 overlay + cutover', () => {
  afterEach(() => cleanup())

  it('scaffolds FeedIssueDetailOverlay / Body under feed-lab/post/', () => {
    expect(existsSync(path.join(postRoot, 'FeedIssueDetailOverlay.jsx'))).toBe(true)
    expect(existsSync(path.join(postRoot, 'FeedIssueDetailBody.jsx'))).toBe(true)
    expect(typeof FeedIssueDetailOverlay).toBe('function')
    expect(typeof FeedIssueDetailBody).toBe('function')
  })

  it('bans *Deprecated imports on lab Done path (page + post/)', () => {
    expect(pageSrc.split(/\n/).some((l) => DEPRECATED_IMPORT_RE.test(l))).toBe(false)
    expect(pageSrc).not.toMatch(/from ['"][^'"]*Deprecated/)
    for (const file of collectJsFiles(postRoot)) {
      // CR-07: archive *Deprecated modules kept on disk; skip them in Done-path ban scan
      if (/Deprecated\.(jsx?|css)$/.test(file)) continue
      const src = readFileSync(file, 'utf8')
      expect(src.split(/\n/).some((l) => DEPRECATED_IMPORT_RE.test(l)), file).toBe(false)
    }
  })

  it('title/summary/media/Open issue open overlay · strip does not', () => {
    renderLab()
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-plane')).toBe('greenfield')
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-visual-done')).toBe('false')
    expect(screen.queryByTestId('feed-lab-deprecated-section')).toBeNull()

    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    fireEvent.click(within(card).getByTestId('reaction-summary-react'))
    expect(screen.queryByTestId('feed-issue-detail-panel')).toBeNull()
    expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()

    fireEvent.click(within(card).getByTestId('feed-post-title'))
    const panel = screen.getByTestId('feed-issue-detail-panel')
    expect(panel.getAttribute('data-lab-plane')).toBe('greenfield')
    expect(panel.getAttribute('data-lab-overlay')).toBe('m158')
    expect(screen.getByTestId('feed-issue-detail-body')).toBeTruthy()

    fireEvent.click(screen.getByTestId('feed-issue-detail-close'))
    expect(screen.queryByTestId('feed-issue-detail-panel')).toBeNull()

    fireEvent.click(within(card).getByTestId('feed-post-open-issue'))
    expect(screen.getByTestId('feed-issue-detail-panel')).toBeTruthy()
    fireEvent.click(screen.getByTestId('feed-issue-detail-close'))

    fireEvent.click(within(card).getByTestId('feed-post-summary'))
    expect(screen.getByTestId('feed-issue-detail-panel')).toBeTruthy()
    fireEvent.click(screen.getByTestId('feed-issue-detail-close'))

    fireEvent.click(within(card).getByTestId('feed-post-media'))
    expect(screen.getByTestId('feed-issue-detail-panel')).toBeTruthy()
  })

  it('keeps visual Done false until OP eye', () => {
    renderLab()
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-visual-done')).toBe('false')
    expect(screen.getAllByTestId(/^feed-post-card-/)).toHaveLength(5)
  })
})
