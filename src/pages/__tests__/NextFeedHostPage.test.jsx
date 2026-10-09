import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { AppShellLayout } from '../../layout/AppShellLayout.jsx'
import { NextFeedHostPage } from '../NextFeedHostPage.jsx'
import { NEXT_SHELL_FLAT_KEYS } from '../../i18n/nextShellDictionary.js'
import { isPublicPath } from '../../router/sessionRoutePolicy.js'

vi.mock('../../auth/SessionShellContext.jsx', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useSessionShell: () => ({
      shellState: 'logged_out',
      retry: () => {},
      profile: null,
    }),
    useOptionalSessionShell: () => null,
  }
})

function renderNextFeed(initialPath) {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<AppShellLayout />}>
            <Route path="/next/feed" element={<NextFeedHostPage />} />
            <Route path="/next/feed/issue/:id" element={<NextFeedHostPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('NS-01 NextFeedHostPage route smoke', () => {
  it('treats next feed host paths as public', () => {
    expect(isPublicPath('/next/feed')).toBe(true)
    expect(isPublicPath('/next/feed/issue/demo-1')).toBe(true)
  })

  it('renders #/next/feed WIP inside AppShellLayout', () => {
    const html = renderNextFeed('/next/feed')
    expect(html).toContain('data-testid="app-shell"')
    expect(html).toContain('data-testid="public-header"')
    expect(html).toContain('data-testid="public-footer"')
    expect(html).toContain('data-testid="next-feed-host-wip"')
    expect(html).toContain('Feed coming soon')
    expect(html).toContain('Shell is ready. Feed content ships in a later package.')
    expect(html).not.toContain('data-testid="board-feed"')
    expect(html).not.toContain('board-columns')
  })

  it('renders #/next/feed/issue/:id host with same WIP (no feed body)', () => {
    const html = renderNextFeed('/next/feed/issue/demo-1')
    expect(html).toContain('data-testid="next-feed-host"')
    expect(html).toContain('data-testid="next-feed-host-wip"')
    expect(html).not.toContain('data-testid="board-feed"')
  })

  it('registers routes in App.jsx above catch-all', () => {
    const appSrc = readFileSync(
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../App.jsx'),
      'utf8',
    )
    const feedIdx = appSrc.indexOf('path="/next/feed"')
    const issueIdx = appSrc.indexOf('path="/next/feed/issue/:id"')
    const catchIdx = appSrc.indexOf('path="*"')
    expect(feedIdx).toBeGreaterThan(-1)
    expect(issueIdx).toBeGreaterThan(-1)
    expect(catchIdx).toBeGreaterThan(issueIdx)
    expect(appSrc).toContain('NextFeedHostPage')
  })

  it('exposes nextShell.wip + header flat keys', () => {
    expect(NEXT_SHELL_FLAT_KEYS).toContain('nextShell.wip.title')
    expect(NEXT_SHELL_FLAT_KEYS).toContain('nextShell.wip.body')
    expect(NEXT_SHELL_FLAT_KEYS).toContain('nextShell.header.homeAria')
  })
})
