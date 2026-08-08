import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { IssuePage } from '../IssuePage.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'

describe('IssuePage integration', () => {
  it('renders loading or success state with issueService', () => {
    const html = renderToStaticMarkup(
      <I18nProvider>
        <MemoryRouter initialEntries={['/issue/DE-001']}>
          <IssuePage />
        </MemoryRouter>
      </I18nProvider>,
    )
    expect(html).toContain('board-shell')
    expect(html).toMatch(/issue-details-state-loading|issue-details-state-default/)
  })

  it('shell includes header strip, no WORKSPACE sidebar, back affordance, footer (PH-09)', () => {
    const html = renderToStaticMarkup(
      <I18nProvider>
        <MemoryRouter initialEntries={['/issue/DE-001']}>
          <IssuePage />
        </MemoryRouter>
      </I18nProvider>,
    )
    expect(html).toContain('issue-page-header')
    expect(html).toContain('ds-btn')
    expect(html).toContain('header-strip')
    expect(html).not.toContain('board-sidebar')
    expect(html).toContain('board-main--no-sidebar')
    expect(html).toContain('board-footer')
    expect(html).toContain('data-testid="app-shell"')
    expect(html).toContain('header-locale')
  })

  it('renders not-found state for unknown id', () => {
    const html = renderToStaticMarkup(
      <I18nProvider>
        <MemoryRouter initialEntries={['/issue/UNKNOWN-ID']}>
          <IssuePage />
        </MemoryRouter>
      </I18nProvider>,
    )
    expect(html).toContain('board-shell')
    expect(html).toMatch(/issue-details-state-loading|issue-details-state-not-found/)
  })
})
