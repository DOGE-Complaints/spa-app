/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Header } from '../Header.jsx'

const headerSrc = readFileSync(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../Header.jsx'),
  'utf8',
)
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

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

describe('Public Header NS-02 next chrome', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('brand links to feed home with nextShell home aria', () => {
    renderHeader()
    const brand = screen.getByTestId('public-header-brand')
    expect(brand.getAttribute('href')).toBe('/next/feed')
    expect(brand.getAttribute('aria-label')).toBe('Go to feed home')
    expect(brand.querySelector('img.header-brand-logo')?.getAttribute('src')).toMatch(
      /dogestonia-brand-(light|dark)\.png$/,
    )
  })

  it('wires next-shell menu chrome; search/notifications kept in source (NS-13 gated)', () => {
    renderHeader()
    expect(
      screen.getByTestId('public-header-menu-toggle').querySelector('[data-ns07-icon-src]')?.getAttribute('data-ns07-icon-src'),
    ).toBe('/icons/next-shell/navigation/menu.svg')
    expect(screen.queryByTestId('public-header-search-affordance')).toBeNull()
    expect(screen.queryByTestId('public-header-notifications-chrome')).toBeNull()
    expect(headerSrc).toContain("'/icons/next-shell/navigation/search.svg'")
    expect(headerSrc).toContain("'/icons/next-shell/navigation/notifications.svg'")
    expect(headerSrc).toContain('public-header-search-affordance')
    expect(headerSrc).toContain('public-header-notifications-chrome')
  })

  it('ThemeToggle uses next-shell theme glyph', () => {
    renderHeader()
    const theme = screen.getByTestId('public-header-theme-toggle')
    const src = theme.querySelector('[data-ns07-icon-src]')?.getAttribute('data-ns07-icon-src')
    expect(src === '/icons/next-shell/navigation/theme-dark.svg' || src === '/icons/next-shell/navigation/theme-light.svg').toBe(
      true,
    )
  })
})
