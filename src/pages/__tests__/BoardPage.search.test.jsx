import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { BoardPage } from '../BoardPage.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { ROUTING_DEMO_ISSUES } from '../../router/mockIssues.js'
import { issueMatchesSearchQuery } from '../../router/issueSearchMatch.js'

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

  it('renders clear button when search value is non-empty', () => {
    const html = renderBoardAt('/board?search=road')

    expect(html).toContain('class="board-search-clear"')
  })

  it('enables Reset Filters when only search is active', () => {
    const html = renderBoardAt('/board?search=road')
    const resetButtons = html.match(/data-hierarchy="link"/g) ?? []

    expect(resetButtons.length).toBeGreaterThan(0)
    expect(html).toContain('Reset Filters')
    expect(html).not.toMatch(/aria-disabled="true"[^>]*Reset Filters|Reset Filters[^>]*aria-disabled="true"/)
  })

  it('renders empty search input when query has no search param', () => {
    const html = renderBoardAt('/board?status=NEW')

    expect(html).toContain('class="board-search-input"')
    expect(html).toContain('value=""')
    expect(html).not.toContain('class="board-search-clear"')
  })
})

describe('BoardPage cross-locale search (D-S1)', () => {
  it('matches ru query against DE-002 regardless of UI locale (matcher SSOT)', () => {
    const de002 = ROUTING_DEMO_ISSUES.find((issue) => issue.id === 'DE-002')
    expect(issueMatchesSearchQuery(de002, 'обучение')).toBe(true)

    const html = renderBoardAt('/board?search=обучение')
    expect(html).toContain('value="обучение"')
    expect(html).toContain('class="board-search-clear"')
  })
})
