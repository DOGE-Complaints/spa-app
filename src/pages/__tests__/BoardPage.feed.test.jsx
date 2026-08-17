import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { BoardPage } from '../BoardPage.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { PUBLIC_HOME_FLAT_KEYS } from '../../i18n/publicHomeDictionary.js'

const boardPageSource = readFileSync(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../BoardPage.jsx'),
  'utf8',
)

function renderBoard(pathName = '/board') {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter initialEntries={[pathName]}>
        <BoardPage />
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('BoardPage PH-04 single feed', () => {
  it('does not render kanban columns or board-columns scaffold', () => {
    const html = renderBoard()
    expect(html).not.toContain('board-columns')
    expect(html).not.toContain('Status NEW column')
    expect(html.match(/class="board-column"/g) ?? []).toHaveLength(0)
  })

  it('renders feed skeleton region while loading', () => {
    const html = renderBoard()
    expect(html).toContain('data-testid="board-feed"')
    expect(html).toContain('board-skeleton-card')
    expect(html).toContain('Loading board')
    expect(html).toContain('board-filters-row')
  })

  it('keeps SEARCH toolbar markup on the page', () => {
    const html = renderBoard('/board?search=road')
    expect(html).toContain('board-search-input')
    expect(html).toContain('board-filter-panel-toggle')
  })

  it('wires issue cards to /issue/:id in source', () => {
    expect(boardPageSource).toMatch(/\/issue\/\$\{item\.id\}/)
    expect(boardPageSource).toContain('showOpenAffordance')
    expect(boardPageSource).not.toContain('board-columns')
  })

  it('uses publicHome.board chrome keys for error/filtered (not Oops)', () => {
    expect(boardPageSource).toContain("t('publicHome.board.error.retry')")
    expect(boardPageSource).toContain("t('publicHome.board.filteredEmpty.title')")
    expect(boardPageSource).not.toContain("t('publicHome.board.empty.title')")
    expect(boardPageSource).not.toMatch(/Oops/i)
    expect(PUBLIC_HOME_FLAT_KEYS.filter((k) => k.startsWith('publicHome.board.'))).toHaveLength(10)
  })

  it('uses catalog icon path for load error; unfiltered empty is discovery', () => {
    expect(boardPageSource).toContain('/icons/story-handoff/ic-cloud-error.png')
    expect(boardPageSource).toContain('EarlySignalDiscovery')
    expect(boardPageSource).not.toContain('/icons/public-home/ic-empty-board.png')
    expect(boardPageSource).not.toContain('data-testid="board-empty"')
  })
})
