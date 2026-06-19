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

describe('BoardPage geo filters', () => {
  it('renders geo district chip from applied URL state', () => {
    const html = renderBoardAt('/board?geo_district=Kesklinn')

    expect(html).toContain('board-active-filter-chip')
    expect(html).toContain('Kesklinn')
  })
})
