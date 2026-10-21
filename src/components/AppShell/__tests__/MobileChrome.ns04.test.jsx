/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { MobileAppBar } from '../MobileAppBar.jsx'
import { MobileBottomNav } from '../MobileBottomNav.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

function wrap(ui) {
  return render(
    <I18nProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

describe('NS-04 MobileAppBar + MobileBottomNav', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('renders MobileAppBar with menu icon from next-shell catalog', () => {
    wrap(<MobileAppBar />)
    expect(screen.getByTestId('mobile-app-bar')).toBeTruthy()
    const icon = screen.getByTestId('mobile-app-bar-leading').querySelector('[data-ns07-icon-src]')
    expect(icon?.getAttribute('data-ns07-icon-src')).toBe('/icons/next-shell/navigation/menu.svg')
  })

  it('wires back/close icons', () => {
    const { rerender } = wrap(<MobileAppBar leadingAction="back" />)
    expect(
      screen.getByTestId('mobile-app-bar-leading').querySelector('[data-ns07-icon-src]')?.getAttribute('data-ns07-icon-src'),
    ).toBe('/icons/next-shell/navigation/back.svg')
    rerender(
      <I18nProvider>
        <MemoryRouter>
          <MobileAppBar leadingAction="close" />
        </MemoryRouter>
      </I18nProvider>,
    )
    expect(
      screen.getByTestId('mobile-app-bar-leading').querySelector('[data-ns07-icon-src]')?.getAttribute('data-ns07-icon-src'),
    ).toBe('/icons/next-shell/actions/close.svg')
  })

  it('renders bottom nav Board + Profile with catalog icons', () => {
    wrap(<MobileBottomNav />)
    expect(screen.getByTestId('mobile-bottom-nav')).toBeTruthy()
    const board = screen.getByTestId('mobile-bottom-nav-board')
    const profile = screen.getByTestId('mobile-bottom-nav-profile')
    expect(board.querySelector('[data-ns07-icon-src]')?.getAttribute('data-ns07-icon-src')).toBe(
      '/icons/next-shell/navigation/board.svg',
    )
    expect(profile.querySelector('[data-ns07-icon-src]')?.getAttribute('data-ns07-icon-src')).toBe(
      '/icons/next-shell/navigation/profile.svg',
    )
    expect(board.getAttribute('href')).toBe('/next/feed')
    expect(profile.getAttribute('href')).toBe('/profile')
  })
})
