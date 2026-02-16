import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { IssuePage } from '../IssuePage.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'

describe('IssuePage integration', () => {
  it('renders loading or success state with issueService', () => {
    const html = renderToStaticMarkup(
      <I18nProvider>
        <MemoryRouter initialEntries={['/issue/DE-042']}>
          <IssuePage />
        </MemoryRouter>
      </I18nProvider>,
    )
    expect(html).toContain('issue-page-shell')
    expect(html).toMatch(/issue-details-state-loading|issue-details-state-default/)
  })

  it('shell includes back affordance', () => {
    const html = renderToStaticMarkup(
      <I18nProvider>
        <MemoryRouter initialEntries={['/issue/DE-042']}>
          <IssuePage />
        </MemoryRouter>
      </I18nProvider>,
    )
    expect(html).toContain('issue-back-button')
  })

  it('renders not-found state for unknown id', () => {
    const html = renderToStaticMarkup(
      <I18nProvider>
        <MemoryRouter initialEntries={['/issue/UNKNOWN-ID']}>
          <IssuePage />
        </MemoryRouter>
      </I18nProvider>,
    )
    expect(html).toContain('issue-page-shell')
    expect(html).toMatch(/issue-details-state-loading|issue-details-state-not-found/)
  })
})
