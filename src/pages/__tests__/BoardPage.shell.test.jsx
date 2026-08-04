import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { BoardPage } from '../BoardPage.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'

describe('BoardPage shell visual parity scaffold', () => {
  it('renders header strip, shell regions and footer hooks', () => {
    const html = renderToStaticMarkup(
      <I18nProvider>
        <MemoryRouter>
          <BoardPage />
        </MemoryRouter>
      </I18nProvider>,
    )

    expect(html).toContain('class="board-shell"')
    expect(html).toContain('header-strip')
    expect(html).toContain('board-main')
    expect(html).toContain('board-sidebar')
    expect(html).toContain('board-workspace')
    expect(html).toContain('board-footer')
    expect(html).toContain('data-testid="public-footer"')
    expect(html).toContain('data-testid="app-shell"')
    expect(html).toContain('header-locale')
    expect(html).toContain('public-header')
    expect(html).not.toContain('header-status')
  })

  it('renders a single board feed without status columns', () => {
    const html = renderToStaticMarkup(
      <I18nProvider>
        <MemoryRouter>
          <BoardPage />
        </MemoryRouter>
      </I18nProvider>,
    )
    const columnMatches = html.match(/class="board-column"/g) ?? []

    expect(columnMatches).toHaveLength(0)
    expect(html).not.toContain('Status NEW column')
    expect(html).not.toContain('board-columns')
    expect(html).toContain('board-feed')
    expect(html).toContain('data-testid="board-feed"')
  })

  it('renders filter panel toggle and search in toolbar', () => {
    const html = renderToStaticMarkup(
      <I18nProvider>
        <MemoryRouter>
          <BoardPage />
        </MemoryRouter>
      </I18nProvider>,
    )

    expect(html).toContain('board-filters-row')
    expect(html).toContain('board-search-input')
    expect(html).toContain('board-filter-panel-toggle')
    expect(html).toContain('Filters')
  })
})
