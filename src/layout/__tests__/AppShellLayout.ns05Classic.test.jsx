/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppShellLayout } from '../AppShellLayout.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../i18n/core.js'

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

function renderAt(path) {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route element={<AppShellLayout />}>
            <Route path="/next/feed" element={<div data-testid="feed-host">feed</div>} />
            <Route path="/board" element={<div data-testid="board-host">board shelter list</div>} />
            <Route path="/issue/:id" element={<div data-testid="issue-host">issue shelter</div>} />
            <Route path="/how-it-works" element={<div data-testid="hiw-host">hiw</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('AppShellLayout NS-05 classic shell apply (D2.3)', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('applies next-shell chrome on #/board with legacy main intact', () => {
    renderAt('/board')
    expect(screen.getByTestId('profile-rail')).toBeTruthy()
    expect(screen.getByTestId('next-shell-right-slot')).toBeTruthy()
    expect(screen.getByTestId('mobile-app-bar')).toBeTruthy()
    expect(screen.getByTestId('mobile-bottom-nav')).toBeTruthy()
    expect(screen.getByTestId('board-host').textContent).toContain('board shelter list')
    expect(document.querySelector('.next-shell-route.next-shell-classic-shelter')).toBeTruthy()
  })

  it('applies next-shell chrome on #/issue/:id with legacy main intact', () => {
    renderAt('/issue/demo-issue')
    expect(screen.getByTestId('profile-rail')).toBeTruthy()
    expect(screen.getByTestId('issue-host')).toBeTruthy()
    expect(document.querySelector('.next-shell-classic-shelter')).toBeTruthy()
  })

  it('keeps brand home pointing at /next/feed on classic', () => {
    renderAt('/board')
    const brand = screen.getByTestId('public-header-brand')
    expect(brand.getAttribute('href')).toBe('/next/feed')
  })

  it('does not force next-shell classic chrome on /how-it-works', () => {
    renderAt('/how-it-works')
    expect(document.querySelector('.next-shell-classic-shelter')).toBeNull()
    expect(screen.getByTestId('hiw-host')).toBeTruthy()
  })
})
