import { describe, expect, it, vi, beforeEach } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { BoardPage } from '../BoardPage.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { AppShellLayout } from '../../layout/AppShellLayout.jsx'

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


function renderBoardInShell() {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter initialEntries={['/board']}>
        <Routes>
          <Route element={<AppShellLayout />}>
            <Route path="/board" element={<BoardPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('BoardPage shell visual parity scaffold', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders header strip, shell regions and footer hooks', () => {
    const html = renderBoardInShell()

    expect(html).toContain('class="board-shell"')
    expect(html).toContain('header-strip')
    expect(html).toContain('board-main')
    expect(html).toContain('board-main--no-sidebar')
    expect(html).not.toContain('board-sidebar')
    expect(html).toContain('board-workspace')
    expect(html).toContain('board-footer')
    expect(html).toContain('data-testid="public-footer"')
    expect(html).toContain('data-testid="app-shell"')
    expect(html).toContain('header-locale')
    expect(html).toContain('public-header')
    expect(html).not.toContain('header-status')
  })

  it('keeps public header nav without WORKSPACE column (PH-09)', () => {
    const html = renderBoardInShell()
    expect(html).toContain('data-testid="public-header-nav"')
    expect(html).toContain('data-show-sidebar="no"')
  })

  it('renders a single board feed without status columns', () => {
    const html = renderBoardInShell()
    const columnMatches = html.match(/class="board-column"/g) ?? []

    expect(columnMatches).toHaveLength(0)
    expect(html).not.toContain('Status NEW column')
    expect(html).not.toContain('board-columns')
    expect(html).toContain('board-feed')
    expect(html).toContain('data-testid="board-feed"')
  })

  it('renders filter panel toggle and search in toolbar', () => {
    const html = renderBoardInShell()

    expect(html).toContain('board-filters-row')
    expect(html).toContain('board-search-input')
    expect(html).toContain('board-filter-panel-toggle')
    expect(html).toContain('Filters')
  })

  it('BoardPage source does not mount AppShell chrome (REQ21-01)', () => {
    const src = readFileSync(
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../BoardPage.jsx'),
      'utf8',
    )
    expect(src).not.toMatch(/from ['"].*AppShell/)
    expect(src).not.toContain('PUBLIC_SHELL_SHOW_SIDEBAR')
  })
})
