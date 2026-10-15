/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { FeedPostCard, FeedPostActionStrip } from '../post/index.js'
import { LAB_FEED_FIXTURES } from '../fixtures/index.js'

const dir = path.dirname(fileURLToPath(import.meta.url))
const postRoot = path.resolve(dir, '../post')
const pageSrc = readFileSync(path.resolve(dir, '../../../pages/FeedLabPage.jsx'), 'utf8')

const BAN_IMPORT_LINE_RE =
  /^\s*import\s+.*\b(BoardIssuePost|FeedCivicPost|FeedDiscussionBlock|NextFeedHostPage|FeedToolbar)\b|^\s*import\s+.*ReactionControls\.css|^\s*import\s+.*Deprecated/

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

describe('FeedLab greenfield NF-LAB-07', () => {
  afterEach(() => cleanup())

  it('scaffolds greenfield modules under feed-lab/post/', () => {
    expect(existsSync(path.join(postRoot, 'FeedPostCard.jsx'))).toBe(true)
    expect(existsSync(path.join(postRoot, 'FeedPostActionStrip.jsx'))).toBe(true)
    expect(existsSync(path.join(postRoot, 'FeedPostMedia.jsx'))).toBe(true)
    expect(existsSync(path.join(postRoot, 'index.js'))).toBe(true)
    expect(typeof FeedPostCard).toBe('function')
    expect(typeof FeedPostActionStrip).toBe('function')
  })

  it('greenfield Done path bans Deprecated / Controls / product hosts', () => {
    for (const file of collectJsFiles(postRoot)) {
      // CR-07: archive *Deprecated modules kept on disk; skip them in Done-path ban scan
      if (/Deprecated\.(jsx?|css)$/.test(file)) continue
      const src = readFileSync(file, 'utf8')
      expect(hasBannedImport(src), file).toBe(false)
      expect(
        src.split(/\n/).some((l) => /^\s*import\s+.*ReactionControls\.css/.test(l)),
        file,
      ).toBe(false)
    }
    // Page may import Deprecated for residual section; greenfield import line must be from post/
    expect(pageSrc).toMatch(/from ['"].*feed-lab\/post/)
    expect(pageSrc).toContain('FeedPostCard')
  })

  it('renders five greenfield cards with fixture ids, summary, 3-zone strip, 16:9 media', () => {
    renderLab()
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-visual-done')).toBe('false')
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-preview')).toBe('greenfield')
    expect(screen.getByTestId('feed-lab-greenfield-section').getAttribute('data-lab-plane')).toBe(
      'greenfield',
    )
    expect(screen.getAllByTestId(/^feed-post-card-/)).toHaveLength(5)
    expect(screen.getByTestId('feed-post-card-DOGEstonia-UusVeerenni-001')).toBeTruthy()
    expect(screen.getByTestId('feed-post-card-DOGEstonia-UusVeerenni-001').getAttribute('data-lab-plane')).toBe(
      'greenfield',
    )
    const summaries = screen.getAllByTestId('feed-post-summary')
    expect(summaries.length).toBeGreaterThanOrEqual(5)
    expect(summaries[0].textContent).not.toBe('Tallinn')
    expect(LAB_FEED_FIXTURES[0].summary).toBeTruthy()
    const strips = screen.getAllByTestId('feed-post-action-strip')
    expect(strips[0].getAttribute('data-lab-strip-zones')).toBe('3')
    expect(strips[0].querySelectorAll('[data-zone]')).toHaveLength(3)
    expect(strips[0].querySelectorAll('[data-zone="react"]')).toHaveLength(1)
    expect(strips[0].querySelectorAll('[data-zone="reactions"]')).toHaveLength(0)
    expect(screen.queryByTestId('feed-post-action-reactions')).toBeNull()
    expect(screen.getAllByTestId('feed-post-media')[0].getAttribute('data-lab-media-ratio')).toBe(
      '16:9',
    )
  })

  it('LAB-10 cutover: no Deprecated residual section · visual Done still false', () => {
    renderLab()
    expect(screen.queryByTestId('feed-lab-deprecated-section')).toBeNull()
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-plane')).toBe('greenfield')
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-visual-done')).toBe('false')
  })
})
