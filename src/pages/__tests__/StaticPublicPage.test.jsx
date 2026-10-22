/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AboutPage, ContactPage, PrivacyPage } from '../StaticPublicPage.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../i18n/core.js'

function renderAt(path) {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('StaticPublicPage shells (PH-11)', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
  })

  it.each([
    ['/about', 'about', 'About'],
    ['/privacy', 'privacy', 'Privacy'],
    ['/contact', 'contact', 'Contact'],
  ])('%s renders H1 + OP-pending honesty', (path, key, title) => {
    renderAt(path)
    expect(screen.getByTestId(`public-static-${key}`)).toBeTruthy()
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(title)
    const pending = screen.getByTestId(`public-static-${key}-pending`)
    expect(pending.textContent).toMatch(/OP to supply|placeholder/i)
  })
})
