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

describe('AppShellLayout NS-04 grid + mobile chrome', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('hosts empty right slot on #/next/feed (Q16 · no NodeContextRail)', () => {
    renderAt('/next/feed')
    const slot = screen.getByTestId('next-shell-right-slot')
    expect(slot).toBeTruthy()
    expect(slot.getAttribute('aria-hidden')).toBe('true')
    expect(slot.textContent?.trim() || '').toBe('')
    expect(document.querySelector('[data-right-slot="yes"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="node-context-rail"]')).toBeNull()
    expect(screen.getByTestId('profile-rail')).toBeTruthy()
    expect(screen.getByTestId('mobile-app-bar')).toBeTruthy()
    expect(screen.getByTestId('mobile-bottom-nav')).toBeTruthy()
  })

  it('keeps classic #/board without next-shell grid / mobile chrome', () => {
    renderAt('/board')
    expect(screen.queryByTestId('next-shell-right-slot')).toBeNull()
    expect(screen.queryByTestId('mobile-app-bar')).toBeNull()
    expect(screen.queryByTestId('mobile-bottom-nav')).toBeNull()
    expect(document.querySelector('[data-right-slot="no"], [data-show-sidebar="no"]')).toBeTruthy()
  })
})
