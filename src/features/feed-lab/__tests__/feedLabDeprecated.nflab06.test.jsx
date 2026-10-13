/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import {
  FeedLabIssueCardDeprecated,
  FeedLabDiscussionDeprecated,
  FeedLabDetailOverlayDeprecated,
  LabReactionChromeDeprecated,
} from '../index.js'

const dir = path.dirname(fileURLToPath(import.meta.url))
const feedLabRoot = path.resolve(dir, '..')
const feedRoot = path.resolve(dir, '../../feed')
const pageSrc = readFileSync(path.resolve(dir, '../../../pages/FeedLabPage.jsx'), 'utf8')
const barrelSrc = readFileSync(path.resolve(feedLabRoot, 'index.js'), 'utf8')

const DEPRECATED_FILES = [
  'FeedLabIssueCardDeprecated.jsx',
  'FeedLabIssueCardDeprecated.css',
  'LabReactionChromeDeprecated.jsx',
  'LabReactionChromeDeprecated.css',
  'FeedLabDiscussionDeprecated.jsx',
  'FeedLabDiscussionDeprecated.css',
  'FeedLabDetailOverlayDeprecated.jsx',
  'FeedLabDetailOverlayDeprecated.css',
]

const LEGACY_FILES = [
  'FeedLabIssueCard.jsx',
  'FeedLabIssueCard.css',
  'LabReactionChrome.jsx',
  'LabReactionChrome.css',
  'FeedLabDiscussion.jsx',
  'FeedLabDiscussion.css',
  'FeedLabDetailOverlay.jsx',
  'FeedLabDetailOverlay.css',
]

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

function listFilesRecursive(root) {
  const out = []
  for (const name of readdirSync(root, { withFileTypes: true })) {
    const p = path.join(root, name.name)
    if (name.isDirectory()) {
      if (name.name === 'node_modules' || name.name === '__tests__') continue
      out.push(...listFilesRecursive(p))
    } else {
      out.push(p)
    }
  }
  return out
}

describe('FeedLab Deprecated plane NF-LAB-06', () => {
  afterEach(() => cleanup())

  it('lab-owned modules exist only under Deprecated filenames', () => {
    for (const name of DEPRECATED_FILES) {
      expect(existsSync(path.join(feedLabRoot, name)), name).toBe(true)
    }
    for (const name of LEGACY_FILES) {
      expect(existsSync(path.join(feedLabRoot, name)), name).toBe(false)
    }
  })

  it('barrel exports Deprecated names explicitly (no silent Done alias)', () => {
    expect(barrelSrc).toContain('FeedLabIssueCardDeprecated')
    expect(barrelSrc).toContain('LabReactionChromeDeprecated')
    expect(barrelSrc).toContain('FeedLabDiscussionDeprecated')
    expect(barrelSrc).toContain('FeedLabDetailOverlayDeprecated')
    expect(barrelSrc).not.toMatch(/export \{ FeedLabIssueCard \}/)
    expect(barrelSrc).not.toMatch(/export \{ LabReactionChrome \}/)
    expect(typeof FeedLabIssueCardDeprecated).toBe('function')
    expect(typeof LabReactionChromeDeprecated).toBe('function')
    expect(typeof FeedLabDiscussionDeprecated).toBe('function')
    expect(typeof FeedLabDetailOverlayDeprecated).toBe('function')
  })

  it('FeedLabPage mounts Deprecated residual with data-lab-plane=deprecated', () => {
    expect(pageSrc).toContain('FeedLabIssueCardDeprecated')
    expect(pageSrc).toContain('FeedLabDetailOverlayDeprecated')
    expect(pageSrc).not.toMatch(/\bFeedLabIssueCard\b(?!Deprecated)/)
    expect(pageSrc).not.toMatch(/\bFeedLabDetailOverlay\b(?!Deprecated)/)

    renderLab()
    const page = screen.getByTestId('feed-lab-page')
    expect(page.getAttribute('data-lab-visual-done')).toBe('false')
    expect(screen.getByTestId('feed-lab-deprecated-section').getAttribute('data-lab-plane')).toBe(
      'deprecated',
    )
    expect(screen.getAllByTestId(/^feed-lab-issue-card-/)).toHaveLength(5)
    expect(
      screen.getByTestId('feed-lab-issue-card-DOGEstonia-UusVeerenni-001').getAttribute(
        'data-lab-plane',
      ),
    ).toBe('deprecated')
    expect(screen.getAllByTestId('lab-reaction-chrome')[0].getAttribute('data-lab-plane')).toBe(
      'deprecated',
    )
  })

  it('detail overlay root carries data-lab-plane=deprecated', () => {
    renderLab()
    fireEvent.click(screen.getAllByTestId('feed-lab-card-title')[0])
    expect(screen.getByTestId('feed-lab-detail-panel').getAttribute('data-lab-plane')).toBe(
      'deprecated',
    )
  })

  it('does not rename shared features/feed/** VL atoms in this tip', () => {
    // Shared VL paths must still exist at pre-LAB-06 locations (Borrow, not rename).
    const mustExist = [
      'identity/IssueIdentityHeader.jsx',
      'reactions/ReactionPicker.jsx',
      'reactions/ReactionAggregateStrip.jsx',
      'comments/index.js',
      'composer/index.js',
      'presentation/OverlayHost.jsx',
      'presentation/IssuePresentationLayout.jsx',
    ]
    for (const rel of mustExist) {
      expect(existsSync(path.join(feedRoot, rel)), rel).toBe(true)
    }
    // No *Deprecated rename under shared feed for this tip.
    const sharedFiles = listFilesRecursive(feedRoot)
    const deprecatedShared = sharedFiles.filter((p) => /Deprecated\.(jsx?|css)$/.test(p))
    expect(deprecatedShared).toEqual([])
  })
})
