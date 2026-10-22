/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProfileRail } from '../ProfileRail.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'
import { useStoryActivityRail } from '../../../hooks/useStoryActivityRail.js'

function renderRail(activity = null, initialPath = '/next/feed') {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="*" element={<ProfileRail activity={activity} />} />
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('ProfileRail NS-03', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('renders nav Feed / My stories / Profile with next-shell icons', () => {
    renderRail()
    expect(screen.getByTestId('profile-rail')).toBeTruthy()
    const board = screen.getByTestId('profile-rail-nav-board')
    expect(board.getAttribute('href')).toBe('/next/feed')
    expect(board.querySelector('[data-ns07-icon-src]')?.getAttribute('data-ns07-icon-src')).toBe(
      '/icons/next-shell/navigation/board.svg',
    )
    expect(screen.getByTestId('profile-rail-nav-feed-label').textContent).toMatch(/Feed/i)
    expect(screen.getByTestId('profile-rail-nav-my-stories').getAttribute('href')).toBe('/profile')
    expect(
      screen.getByTestId('profile-rail-nav-my-stories').querySelector('[data-ns07-icon-src]')?.getAttribute('data-ns07-icon-src'),
    ).toBe('/icons/next-shell/navigation/my-stories.svg')
    expect(screen.getByTestId('profile-rail-nav-profile').getAttribute('href')).toBe('/profile')
    expect(
      screen.getByTestId('profile-rail-nav-profile').querySelector('[data-ns07-icon-src]')?.getAttribute('data-ns07-icon-src'),
    ).toBe('/icons/next-shell/navigation/profile.svg')
  })

  it('omits empty copy when activity metrics absent (NS-09)', () => {
    renderRail(null)
    expect(screen.queryByTestId('profile-rail-empty')).toBeNull()
    expect(screen.queryByTestId('profile-rail-metrics')).toBeNull()
    expect(screen.queryByText(/No stories yet/i)).toBeNull()
  })

  it('renders metrics when CAB-shaped activity provided (no invent)', () => {
    renderRail({ metrics: { submitted: 1, published: 0, underReview: 2 } })
    expect(screen.getByTestId('profile-rail-metrics')).toBeTruthy()
    expect(screen.getByTestId('profile-rail-metric-submitted').textContent).toContain('1')
    expect(screen.queryByTestId('profile-rail-empty')).toBeNull()
  })
})

describe('useStoryActivityRail NS-03 T02', () => {
  it('returns honest empty (SPA HTTP not wired)', () => {
    const result = useStoryActivityRail()
    expect(result.status).toBe('empty')
    expect(result.metrics).toBeNull()
    expect(result.stories).toEqual([])
  })
})
