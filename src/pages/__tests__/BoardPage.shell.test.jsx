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
    expect(html).toContain('class="header-strip"')
    expect(html).toContain('class="board-main"')
    expect(html).toContain('class="board-sidebar"')
    expect(html).toContain('class="board-workspace"')
    expect(html).toContain('class="board-footer"')
  })

  it('renders four status columns in board scaffold', () => {
    const html = renderToStaticMarkup(
      <I18nProvider>
        <MemoryRouter>
          <BoardPage />
        </MemoryRouter>
      </I18nProvider>,
    )
    const columnMatches = html.match(/class="board-column"/g) ?? []

    expect(columnMatches).toHaveLength(4)
    expect(html).toContain('Status NEW column')
    expect(html).toContain('Status VERIFIED column')
    expect(html).toContain('Status IN REVIEW column')
    expect(html).toContain('Status ARCHIVED column')
  })
})
