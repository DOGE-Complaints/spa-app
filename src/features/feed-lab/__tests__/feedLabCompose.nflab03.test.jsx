/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'

const dir = path.dirname(fileURLToPath(import.meta.url))
const feedLabRoot = path.resolve(dir, '..')
const pageSrc = readFileSync(path.resolve(dir, '../../../pages/FeedLabPage.jsx'), 'utf8')
const pageCss = readFileSync(path.resolve(dir, '../../../pages/FeedLabPage.css'), 'utf8')

/** Line-scoped: avoid [^;]* spanning comments after unrelated imports. */
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

describe('FeedLab compose NF-LAB-03', () => {
  afterEach(() => cleanup())

  it('renders five atom-composed cards with fixture public ids', () => {
    renderLab()
    expect(screen.getByTestId('feed-lab-card-list')).toBeTruthy()
    expect(screen.getByTestId('feed-lab-issue-card-DOGEstonia-UusVeerenni-001')).toBeTruthy()
    expect(screen.getByTestId('feed-lab-issue-card-DOGEstonia-UusVeerenni-005')).toBeTruthy()
    expect(screen.getAllByTestId(/^feed-lab-issue-card-/)).toHaveLength(5)
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-foundation')).toBe('compose')
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-visual-done')).toBe('false')
  })

  it('lab Done path holds ban-list (no product hosts / classic Controls.css)', () => {
    expect(hasBannedImport(pageSrc)).toBe(false)
    expect(pageCss.includes('ReactionControls')).toBe(false)
    expect(pageSrc.includes('fetch(')).toBe(false)

    for (const file of collectJsFiles(feedLabRoot)) {
      const src = readFileSync(file, 'utf8')
      expect(hasBannedImport(src)).toBe(false)
      expect(src.split(/\n/).some((l) => /^\s*import\s+.*ReactionControls\.css/.test(l))).toBe(
        false,
      )
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        expect(src.includes('fetch(')).toBe(false)
        expect(
          src
            .split(/\n/)
            .some((l) => /^\s*import\s+/.test(l) && /(gateway|\/threads\/)/i.test(l)),
        ).toBe(false)
      }
    }
  })

  it('discussion header is not classic DISCUSSION Done copy', () => {
    renderLab()
    const headers = screen.getAllByTestId('discussion-header')
    expect(headers.length).toBeGreaterThan(0)
    for (const h of headers) {
      expect(h.textContent?.trim().toUpperCase()).not.toBe('DISCUSSION')
    }
  })

  it('mounts lab-local reaction chrome (in-memory seam)', () => {
    renderLab()
    const chromes = screen.getAllByTestId('lab-reaction-chrome')
    expect(chromes).toHaveLength(5)
    expect(chromes[0].getAttribute('data-lab-local-memory')).toBe('true')
    expect(screen.getByTestId('reaction-picker')).toBeTruthy()
  })
})
