/**
 * @vitest-environment jsdom
 */
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Header } from '../Header.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

function renderHeader(initialPath = '/board') {
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

describe('Public Header (PH-01)', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('renders brand home link with DOGEstonia wordmark', () => {
    renderHeader()
    const brand = screen.getByTestId('public-header-brand')
    expect(brand.getAttribute('href')).toBe('/board')
    expect(brand.textContent).toContain('DOGEstonia')
    expect(screen.getByTestId('header-account-slot')).toBeTruthy()
  })

  it('renders nav order Dashboard · How it works · Submit a story', () => {
    renderHeader()
    const nav = screen.getByTestId('public-header-nav')
    const labels = [...nav.querySelectorAll('.header-nav-item')].map((el) => el.textContent.trim())
    expect(labels).toEqual(['Dashboard', 'How it works', 'Submit a story'])
  })

  it('marks Dashboard active on /board', () => {
    renderHeader('/board')
    const dashboard = screen.getByTestId('public-nav-dashboard')
    expect(dashboard.className).toContain('header-nav-item-active')
    expect(screen.getByTestId('public-nav-how-it-works').className).not.toContain('header-nav-item-active')
    expect(screen.getByTestId('public-nav-submit').className).not.toContain('header-nav-item-active')
  })

  it('marks How it works active on /how-it-works', () => {
    renderHeader('/how-it-works')
    expect(screen.getByTestId('public-nav-how-it-works').className).toContain('header-nav-item-active')
  })

  it('Submit a story uses env helper with external a11y label', async () => {
    vi.stubEnv('VITE_STORY_GPT_URL', 'https://example.test/gpt-nav')
    vi.resetModules()
    const { Header: HeaderFresh } = await import('../Header.jsx')
    const { I18nProvider: I18nFresh } = await import('../../../i18n/I18nProvider.jsx')
    render(
      <I18nFresh>
        <MemoryRouter initialEntries={['/board']}>
          <Routes>
            <Route path="*" element={<HeaderFresh accountSlot={null} />} />
          </Routes>
        </MemoryRouter>
      </I18nFresh>,
    )
    const submit = screen.getByTestId('public-nav-submit')
    expect(submit.getAttribute('href')).toBe('https://example.test/gpt-nav')
    expect(submit.getAttribute('target')).toBe('_blank')
    expect(submit.getAttribute('rel')).toContain('noopener')
    expect(submit.getAttribute('aria-label')).toMatch(/DOGEstonia GPT/i)
    expect(submit.querySelector('.header-nav-external-icon')).toBeTruthy()
  })
})
