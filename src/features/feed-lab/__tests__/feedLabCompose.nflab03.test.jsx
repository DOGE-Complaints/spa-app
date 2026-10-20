/** @vitest-environment jsdom */
/**
 * LAB-03 shallow compose — superseded on `#/lab/feed` Done path by LAB-10 greenfield cutover.
 * Keeps ban-list + asserts greenfield list (not Deprecated residual mount).
 */
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

describe('FeedLab compose NF-LAB-03 (superseded mount → LAB-10 greenfield)', () => {
  afterEach(() => cleanup())

  it('renders five greenfield cards with fixture public ids (cutover)', () => {
    renderLab()
    expect(screen.getByTestId('feed-lab-greenfield-list')).toBeTruthy()
    expect(screen.getByTestId('feed-post-card-DOGEstonia-UusVeerenni-001')).toBeTruthy()
    expect(screen.getByTestId('feed-post-card-DOGEstonia-UusVeerenni-005')).toBeTruthy()
    expect(screen.getAllByTestId(/^feed-post-card-/)).toHaveLength(5)
    expect(screen.queryByTestId('feed-lab-card-list')).toBeNull()
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

  it('discussion omits Discussion heading chrome (CT-21)', () => {
    renderLab()
    expect(screen.queryByTestId('feed-post-discussion-summary-title')).toBeNull()
    expect(screen.queryByTestId('tm-thread-heading')).toBeNull()
    expect(screen.getAllByTestId('tm-thread-mount').length).toBeGreaterThan(0)
  })

  it('mounts ReactionsMount cutover (not Deprecated chrome / FeedReactionPlane)', () => {
    renderLab()
    expect(screen.queryAllByTestId('lab-reaction-chrome')).toHaveLength(0)
    expect(screen.queryAllByTestId('feed-reaction-plane')).toHaveLength(0)
    // 5 card strip roots + CT-09 comment plugs on expanded CT-08 stands
    expect(
      screen.getAllByTestId('feed-lab-reactions-mount').filter(
        (el) => el.getAttribute('data-lab-reaction-target') === 'thread-root',
      ),
    ).toHaveLength(5)
    expect(screen.getAllByTestId('reactions-mount').length).toBeGreaterThanOrEqual(5)
  })
})
