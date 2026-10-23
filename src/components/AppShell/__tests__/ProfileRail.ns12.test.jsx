/**
 * @vitest-environment jsdom
 * NS-12 — freeze My stories in ProfileRail · Feed + Profile held · soft mobile.
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProfileRail, NS12_SHOW_MY_STORIES } from '../ProfileRail.jsx'
import { MobileBottomNav } from '../MobileBottomNav.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

function wrap(ui) {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={['/next/feed']}>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

describe('ProfileRail NS-12 freeze My stories', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('gates My stories while keeping feed + profile', () => {
    expect(NS12_SHOW_MY_STORIES).toBe(false)
    wrap(
      <Routes>
        <Route path="*" element={<ProfileRail />} />
      </Routes>,
    )
    expect(screen.getByTestId('profile-rail').getAttribute('data-ns12')).toBe('my-stories-gated')
    expect(screen.queryByTestId('profile-rail-nav-my-stories')).toBeNull()
    expect(screen.getByTestId('profile-rail-nav-board').getAttribute('href')).toBe('/next/feed')
    expect(screen.getByTestId('profile-rail-nav-feed-label').textContent).toMatch(/Feed/i)
    expect(screen.getByTestId('profile-rail-nav-profile').getAttribute('href')).toBe('/profile')
  })

  it('soft mobile has no My stories affordance', () => {
    wrap(<MobileBottomNav />)
    expect(screen.getByTestId('mobile-bottom-nav').getAttribute('data-ns12')).toBe('no-my-stories')
    expect(screen.queryByTestId('mobile-bottom-nav-my-stories')).toBeNull()
    expect(screen.getByTestId('mobile-bottom-nav-board')).toBeTruthy()
    expect(screen.getByTestId('mobile-bottom-nav-profile')).toBeTruthy()
  })
})
