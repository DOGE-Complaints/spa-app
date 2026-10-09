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
            <Route path="/next/feed/issue/:id" element={<div data-testid="feed-issue">issue</div>} />
            <Route path="/board" element={<div data-testid="board-host">board</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('AppShellLayout NS-03 ProfileRail slot', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('shows ProfileRail on #/next/feed', () => {
    renderAt('/next/feed')
    expect(screen.getByTestId('profile-rail')).toBeTruthy()
    expect(screen.getByTestId('feed-host')).toBeTruthy()
    expect(document.querySelector('[data-show-sidebar="yes"]')).toBeTruthy()
    expect(document.querySelector('.next-shell-route')).toBeTruthy()
  })

  it('shows ProfileRail on #/next/feed/issue/:id', () => {
    renderAt('/next/feed/issue/demo-1')
    expect(screen.getByTestId('profile-rail')).toBeTruthy()
    expect(screen.getByTestId('feed-issue')).toBeTruthy()
  })

  it('shows ProfileRail on classic #/board after NS-05 D2.3 (shelter content intact)', () => {
    renderAt('/board')
    expect(screen.getByTestId('profile-rail')).toBeTruthy()
    expect(screen.getByTestId('board-host')).toBeTruthy()
    expect(document.querySelector('[data-show-sidebar="yes"]')).toBeTruthy()
    expect(document.querySelector('.next-shell-classic-shelter')).toBeTruthy()
  })
})
