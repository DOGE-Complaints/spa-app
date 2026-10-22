/**
 * @vitest-environment jsdom
 * NS-09 — summary gone · Feed label · empty omit · one Profile nav entry.
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProfileRail } from '../ProfileRail.jsx'
import { MobileBottomNav } from '../MobileBottomNav.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

function wrap(ui, initialPath = '/next/feed') {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[initialPath]}>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

describe('ProfileRail NS-09', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('drops summary block and keeps lower Profile nav only as Profile entry', () => {
    wrap(
      <Routes>
        <Route path="*" element={<ProfileRail />} />
      </Routes>,
    )
    expect(screen.queryByTestId('profile-rail-summary')).toBeNull()
    expect(screen.getByTestId('profile-rail').getAttribute('data-ns09')).toBe('rail')
    expect(screen.getByTestId('profile-rail-nav-profile')).toBeTruthy()
    expect(screen.getAllByText(/^Profile$/i)).toHaveLength(1)
  })

  it('labels Feed with /next/feed held', () => {
    wrap(
      <Routes>
        <Route path="*" element={<ProfileRail />} />
      </Routes>,
    )
    const feed = screen.getByTestId('profile-rail-nav-board')
    expect(feed.getAttribute('href')).toBe('/next/feed')
    expect(screen.getByTestId('profile-rail-nav-feed-label').textContent).toBe('Feed')
  })

  it('soft MobileBottomNav Feed label', () => {
    wrap(<MobileBottomNav />)
    const board = screen.getByTestId('mobile-bottom-nav-board')
    expect(board.getAttribute('href')).toBe('/next/feed')
    expect(board.textContent).toMatch(/Feed/i)
  })
})
