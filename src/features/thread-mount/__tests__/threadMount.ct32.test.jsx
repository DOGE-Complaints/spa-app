/** @vitest-environment jsdom */
/**
 * CT-32 — thread dark chrome · theme tokens · mask glyphs · no invent OP PASS
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { IssueTypeIcon } from '../../feed/identity/IssueTypeIcon.jsx'
import { FeedIssueMount } from '../../feed/FeedIssueMount.jsx'

const dir = path.dirname(fileURLToPath(import.meta.url))
const tokens = readFileSync(path.resolve(dir, '../../../styles/tokens.css'), 'utf8')
const nodeCss = readFileSync(path.resolve(dir, '../tree/CommentNode.css'), 'utf8')
const treeCss = readFileSync(path.resolve(dir, '../tree/CommentTree.css'), 'utf8')
const composerCss = readFileSync(path.resolve(dir, '../composer/ThreadComposer.css'), 'utf8')

vi.mock('../../../services/issueService.js', () => ({
  issueService: {
    getIssue: vi.fn(async () => null),
    getIssues: vi.fn(async () => []),
  },
}))

describe('CT-32 thread dark chrome · tokens + mask', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    )
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('T01 · dark+light --tm-bubble-fill + --color-text-link in tokens.css', () => {
    expect(tokens).toMatch(/\[data-theme=['"]dark['"]\][\s\S]*--tm-bubble-fill:/i)
    expect(tokens).toMatch(/\[data-theme=['"]light['"]\][\s\S]*--tm-bubble-fill:\s*#f7f6f2/i)
    expect(tokens).toMatch(/\[data-theme=['"]dark['"]\][\s\S]*--color-text-link:/i)
    expect(tokens).toMatch(/\[data-theme=['"]light['"]\][\s\S]*--color-text-link:/i)
  })

  it('T02 · CommentNode/Tree/Composer use theme tokens (no local cream Done)', () => {
    expect(nodeCss).toMatch(/background:\s*var\(--tm-bubble-fill/i)
    expect(nodeCss).not.toMatch(/--tm-bubble-fill:\s*#f7f6f2/i)
    expect(treeCss).toMatch(/color:\s*var\(--color-text-link/i)
    expect(composerCss).toMatch(/background:\s*var\(--tm-bubble-fill/i)
  })

  it('T03 · IssueTypeIcon uses ShellChromeIcon mask marker', () => {
    render(
      <IssueTypeIcon
        src="/icons/next-feed/types/ic-issue-type-complaint.svg"
        type="complaint"
      />,
    )
    const host = screen.getByTestId('issue-type-icon')
    expect(host.getAttribute('data-ct32-type')).toBe('mask')
    const glyph = screen.getByTestId('issue-type-icon-glyph')
    expect(glyph.getAttribute('data-ns07')).toBe('mask')
    expect(glyph.getAttribute('data-ns07-icon-src')).toMatch(/ic-issue-type-complaint\.svg/)
    expect(glyph.tagName).toBe('SPAN')
  })

  it('T03 · FeedIssueMount Close uses ShellChromeIcon + data-ct32-close', () => {
    const t = (k) =>
      ({
        'nextFeed.mount.close': 'Close',
        'nextFeed.mount.openAsPage': 'Open as page',
        issuePlaceholder: 'Loading…',
      })[k] || k
    const html = renderToStaticMarkup(
      <I18nProvider>
        <MemoryRouter initialEntries={['/next/feed/issue/CT32-1']}>
          <Routes>
            <Route
              path="/next/feed/issue/:id"
              element={
                <FeedIssueMount
                  issueId="CT32-1"
                  t={t}
                  locale="en"
                  resolveLocalizedText={() => ''}
                  presentation="modal"
                  feedUrlForBack="/next/feed"
                />
              }
            />
            <Route path="/next/feed" element={<div />} />
          </Routes>
        </MemoryRouter>
      </I18nProvider>,
    )
    expect(html).toContain('data-ct32-close="mask"')
    expect(html).toContain('data-testid="feed-issue-mount-close-icon"')
    expect(html).toContain('data-ns07="mask"')
    expect(html).toContain('/icons/next-shell/actions/close.svg')
    expect(html).not.toMatch(
      /data-testid="feed-issue-mount-close"[^>]*>[\s\S]*<img[^>]*close\.svg/i,
    )
  })

  it('T04 soft · FeedCivicPost comment/share ShellChromeIcon present in source', () => {
    const civic = readFileSync(
      path.resolve(dir, '../../feed/FeedCivicPost.jsx'),
      'utf8',
    )
    expect(civic).toMatch(/ShellChromeIcon[\s\S]*comment\.svg/)
    expect(civic).toMatch(/ShellChromeIcon[\s\S]*share\.svg/)
  })
})
