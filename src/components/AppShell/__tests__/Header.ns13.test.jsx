/**
 * @vitest-environment jsdom
 * NS-13 — hide header search + notifications · keep code gated · peers held.
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Header, NS13_SHOW_SEARCH_NOTIFICATIONS } from '../Header.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

const headerSrc = readFileSync(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../Header.jsx'),
  'utf8',
)

function renderHeader(initialPath = '/next/feed') {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="*" element={<Header accountSlot={null} />} />
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('Public Header NS-13 hide search + notifications', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('gates search + notifications while keeping markup in source', () => {
    expect(NS13_SHOW_SEARCH_NOTIFICATIONS).toBe(false)
    expect(headerSrc).toContain('public-header-search-affordance')
    expect(headerSrc).toContain('public-header-notifications-chrome')
    expect(headerSrc).toContain('NEXT_SHELL_SEARCH_ICON')
    expect(headerSrc).toContain('NEXT_SHELL_NOTIFICATIONS_ICON')
    renderHeader()
    expect(screen.getByTestId('public-header').getAttribute('data-ns13')).toBe(
      'search-notifications-gated',
    )
    expect(screen.queryByTestId('public-header-search-affordance')).toBeNull()
    expect(screen.queryByTestId('public-header-notifications-chrome')).toBeNull()
  })

  it('holds locale · theme · account peers', () => {
    renderHeader()
    expect(screen.getByTestId('locale-selector')).toBeTruthy()
    expect(screen.getByTestId('public-header-theme-toggle')).toBeTruthy()
    expect(screen.getByTestId('header-account-slot')).toBeTruthy()
    expect(screen.getByTestId('public-header-menu-toggle')).toBeTruthy()
  })
})
