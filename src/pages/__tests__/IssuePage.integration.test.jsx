import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { IssuePage } from '../IssuePage.jsx'
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


const pageSource = readFileSync(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../IssuePage.jsx'),
  'utf8',
)

function renderIssueInShell(initialPath = '/issue/DE-001') {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<AppShellLayout />}>
            <Route path="/issue/:id" element={<IssuePage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('IssuePage integration', () => {
  it('renders loading or success state with issueService', () => {
    const html = renderIssueInShell()
    expect(html).toContain('board-shell')
    expect(html).toMatch(/issue-details-state-loading|issue-details-state-default/)
  })

  it('shell includes header strip, no WORKSPACE sidebar, back affordance, footer (PH-09)', () => {
    const html = renderIssueInShell()
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
    const html = renderIssueInShell('/issue/UNKNOWN-ID')
    expect(html).toContain('board-shell')
    expect(html).toMatch(/issue-details-state-loading|issue-details-state-not-found/)
  })

  it('IssuePage source does not import AppShell chrome (REQ21-01)', () => {
    expect(pageSource).not.toMatch(/from ['"].*AppShell/)
    expect(pageSource).not.toContain('PUBLIC_SHELL_SHOW_SIDEBAR')
  })
})
