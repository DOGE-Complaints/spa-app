/**
 * @vitest-environment jsdom
 * NS-07 — theme-safe shell chrome mask icons · no invent OP PASS
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Header } from '../Header.jsx'
import { ProfileRail } from '../ProfileRail.jsx'
import { MobileBottomNav } from '../MobileBottomNav.jsx'
import { ShellChromeIcon } from '../ShellChromeIcon.jsx'
import { ThemeToggle } from '../../ThemeToggle/ThemeToggle.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'
import { THEME_STORAGE_KEY } from '../../../theme/bootTheme.js'

function wrap(ui) {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={['/next/feed']}>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('NS-07 ShellChromeIcon mask + currentColor', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
    document.documentElement.setAttribute('data-theme', 'dark')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
    window.localStorage.removeItem(THEME_STORAGE_KEY)
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders mask marker with icon src (not bare img)', () => {
    render(<ShellChromeIcon src="/icons/next-shell/navigation/search.svg" size={20} />)
    const el = screen.getByTestId('shell-chrome-icon')
    expect(el.getAttribute('data-ns07')).toBe('mask')
    expect(el.getAttribute('data-ns07-icon-src')).toBe('/icons/next-shell/navigation/search.svg')
    expect(el.tagName).toBe('SPAN')
    expect(el.style.maskImage || el.style.webkitMaskImage).toMatch(/search\.svg/)
  })

  it('Header chrome icons use ShellChromeIcon on dark', () => {
    wrap(<Header accountSlot={null} />)
    const search = screen.getByTestId('public-header-search-affordance').querySelector('[data-ns07="mask"]')
    const notif = screen.getByTestId('public-header-notifications-chrome').querySelector('[data-ns07="mask"]')
    const menu = screen.getByTestId('public-header-menu-toggle').querySelector('[data-ns07="mask"]')
    expect(search?.getAttribute('data-ns07-icon-src')).toBe('/icons/next-shell/navigation/search.svg')
    expect(notif?.getAttribute('data-ns07-icon-src')).toBe('/icons/next-shell/navigation/notifications.svg')
    expect(menu?.getAttribute('data-ns07-icon-src')).toBe('/icons/next-shell/navigation/menu.svg')
  })

  it('ThemeToggle glyph stays mask under light theme (no invert-only)', () => {
    document.documentElement.setAttribute('data-theme', 'light')
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light')
    wrap(<ThemeToggle />)
    const glyph = screen.getByTestId('public-header-theme-toggle').querySelector('[data-ns07="mask"]')
    expect(glyph).toBeTruthy()
    expect(glyph.getAttribute('data-ns07-icon-src')).toMatch(/theme-(light|dark)\.svg$/)
  })

  it('ProfileRail + MobileBottomNav use mask icons', () => {
    wrap(
      <>
        <ProfileRail />
        <MobileBottomNav />
      </>,
    )
    expect(screen.getByTestId('profile-rail').getAttribute('data-ns07-rail')).toBe('mask')
    expect(
      screen.getByTestId('profile-rail-nav-board').querySelector('[data-ns07="mask"]')?.getAttribute('data-ns07-icon-src'),
    ).toBe('/icons/next-shell/navigation/board.svg')
    expect(
      screen.getByTestId('mobile-bottom-nav-board').querySelector('[data-ns07="mask"]')?.getAttribute('data-ns07-icon-src'),
    ).toBe('/icons/next-shell/navigation/board.svg')
  })
})
