/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { FeedLabPage } from '../FeedLabPage.jsx'

const dir = path.dirname(fileURLToPath(import.meta.url))
const feedLabSource = readFileSync(path.resolve(dir, '../FeedLabPage.jsx'), 'utf8')
const feedLabCss = readFileSync(path.resolve(dir, '../FeedLabPage.css'), 'utf8')
const appSrc = readFileSync(path.resolve(dir, '../../App.jsx'), 'utf8')

const BAN_IMPORT_RE =
  /^\s*import\s+[^;]*\b(BoardIssuePost|FeedCivicPost|FeedDiscussionBlock|NextFeedHostPage|FeedToolbar)\b|^\s*import\s+[^;]*ReactionControls\.css/m

describe('FeedLabPage NF-LAB-01', () => {
  afterEach(() => cleanup())

  it('renders lab canvas surface (foundation / data smoke)', () => {
    render(
      <I18nProvider>
        <MemoryRouter initialEntries={['/lab/feed']}>
          <Routes>
            <Route path="/lab/feed" element={<FeedLabPage />} />
          </Routes>
        </MemoryRouter>
      </I18nProvider>,
    )
    expect(screen.getByTestId('feed-lab-page')).toBeTruthy()
    expect(screen.getByTestId('feed-lab-canvas')).toBeTruthy()
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-visual-done')).toBe('false')
    expect(['blank', 'data', 'compose']).toContain(
      screen.getByTestId('feed-lab-page').getAttribute('data-lab-foundation'),
    )
  })

  it('shows five fixture public ids on lab cards (LAB-02/03)', () => {
    render(
      <I18nProvider>
        <MemoryRouter initialEntries={['/lab/feed']}>
          <Routes>
            <Route path="/lab/feed" element={<FeedLabPage />} />
          </Routes>
        </MemoryRouter>
      </I18nProvider>,
    )
    expect(screen.getByTestId('feed-lab-fixture-count').textContent).toMatch(/5/)
    expect(screen.getByTestId('feed-post-card-DOGEstonia-UusVeerenni-001')).toBeTruthy()
    expect(screen.getByTestId('feed-post-card-DOGEstonia-UusVeerenni-005')).toBeTruthy()
  })

  it('lab entry module holds ban-list (no product hosts / classic Controls imports)', () => {
    expect(BAN_IMPORT_RE.test(feedLabSource)).toBe(false)
    expect(feedLabCss.includes('ReactionControls')).toBe(false)
    expect(feedLabSource.includes('fetch(')).toBe(false)
    expect(/from ['"][^'"]*(gateway|threads)/i.test(feedLabSource)).toBe(false)
  })

  it('App registers /lab/feed under shell Routes', () => {
    expect(appSrc.includes('path="/lab/feed"')).toBe(true)
    expect(appSrc.includes('FeedLabPage')).toBe(true)
    const shellBlock = appSrc.slice(appSrc.indexOf('<Route element={<AppShellLayout />}'))
    expect(shellBlock.includes('path="/lab/feed"')).toBe(true)
  })
})
