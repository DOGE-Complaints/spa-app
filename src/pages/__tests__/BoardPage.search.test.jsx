import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { BoardPage } from '../BoardPage.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'

function renderBoardAt(path) {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter initialEntries={[path]}>
        <BoardPage />
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('BoardPage search URL sync', () => {
  it('renders SearchInput with value from ?search= query', () => {
    const html = renderBoardAt('/board?search=Pension')

    expect(html).toContain('class="board-search-input"')
    expect(html).toContain('value="Pension"')
    expect(html).toContain('placeholder="Search issues…"')
  })

  it('enables Reset Filters when only search is active', () => {
    const html = renderBoardAt('/board?search=road')
    const resetButtons = html.match(/class="board-filter-reset"/g) ?? []

    expect(resetButtons.length).toBeGreaterThan(0)
    expect(html).not.toMatch(/class="board-filter-reset"[^>]*disabled/)
  })

  it('renders empty search input when query has no search param', () => {
    const html = renderBoardAt('/board?status=NEW')

    expect(html).toContain('class="board-search-input"')
    expect(html).toContain('value=""')
  })
})
