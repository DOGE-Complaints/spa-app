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

describe('BoardPage filter panel', () => {
  it('renders filter panel toggle and search in toolbar', () => {
    const html = renderBoardAt('/board')

    expect(html).toContain('board-filters-row')
    expect(html).toContain('board-search-input')
    expect(html).toContain('board-filter-panel-toggle')
    expect(html).toContain('Filters')
  })

  it('renders active filter chips from applied URL state', () => {
    const html = renderBoardAt('/board?status=NEW&type=INCIDENT&labels=infrastructure')

    expect(html).toContain('board-active-filter-chips')
    expect(html).toContain('board-filter-chip')
    expect(html).toContain('Status: NEW')
    expect(html).toContain('Type: Incident')
  })

  it('does not render inline StatusFilter triggers in toolbar row', () => {
    const html = renderBoardAt('/board?status=NEW')

    const filterTriggers = html.match(/class="board-filter-trigger"/g) ?? []
    expect(filterTriggers.length).toBe(0)
  })
})
