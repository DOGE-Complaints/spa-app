/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { PublicFooter } from '../PublicFooter.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'
import {
  PUBLIC_HOME_DICTIONARY_BY_LOCALE,
  PUBLIC_HOME_FLAT_KEYS,
} from '../../../i18n/publicHomeDictionary.js'

function renderFooter() {
  return render(
    <I18nProvider>
      <MemoryRouter>
        <PublicFooter />
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('PublicFooter (PH-03 · PH-11)', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
  })

  it('renders brand, preview tagline, and About/Privacy/Contact links', () => {
    renderFooter()
    expect(screen.getByTestId('public-footer')).toBeTruthy()
    expect(screen.getByTestId('public-footer-brand').textContent).toContain('DOGEstonia')
    expect(screen.getByTestId('public-footer-tagline').textContent).toBe('Civic issues, structured.')
    expect(screen.getByTestId('public-footer-about').textContent).toBe('About')
    expect(screen.getByTestId('public-footer-privacy').textContent).toBe('Privacy')
    expect(screen.getByTestId('public-footer-contact').textContent).toBe('Contact')
  })

  it('uses real routes for utility links (PH-11)', () => {
    renderFooter()
    expect(screen.getByTestId('public-footer-about').getAttribute('href')).toBe('/about')
    expect(screen.getByTestId('public-footer-privacy').getAttribute('href')).toBe('/privacy')
    expect(screen.getByTestId('public-footer-contact').getAttribute('href')).toBe('/contact')
  })

  it('brand link targets /next/feed and logo is ≥40px attrs', () => {
    renderFooter()
    expect(screen.getByTestId('public-footer-brand-link').getAttribute('href')).toBe('/next/feed')
    const logo = screen.getByTestId('public-footer-logo')
    expect(Number(logo.getAttribute('width'))).toBeGreaterThanOrEqual(40)
    expect(Number(logo.getAttribute('height'))).toBeGreaterThanOrEqual(40)
  })

  it('does not render social icon clusters', () => {
    const { container } = renderFooter()
    expect(container.querySelectorAll('img[src*="social"], a[aria-label*="Twitter"], a[aria-label*="Instagram"]').length).toBe(0)
    expect(container.querySelectorAll('[data-testid^="public-footer-social"]').length).toBe(0)
  })

  it('keeps localized preview tagline in et and ru (no TAGLINE_TBD)', () => {
    const expected = {
      et: 'Kodanikuteemad, struktureeritult.',
      ru: 'Гражданские темы — структурировано.',
    }
    for (const locale of ['et', 'ru']) {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
      cleanup()
      renderFooter()
      expect(screen.getByTestId('public-footer-tagline').textContent).toBe(expected[locale])
      expect(screen.getByTestId('public-footer-tagline').textContent).not.toContain('TAGLINE_TBD')
    }
  })
})

describe('publicHome.footer key parity', () => {
  const footerKeys = PUBLIC_HOME_FLAT_KEYS.filter((key) => key.startsWith('publicHome.footer.'))

  it('lists footer FLAT_KEYS including PH-11 a11y/nav', () => {
    expect(footerKeys).toEqual([
      'publicHome.footer.brand',
      'publicHome.footer.brandHomeAccessible',
      'publicHome.footer.tagline',
      'publicHome.footer.navLabel',
      'publicHome.footer.about',
      'publicHome.footer.privacy',
      'publicHome.footer.contact',
    ])
  })

  it('has matching preview tagline across locales (no TBD)', () => {
    expect(PUBLIC_HOME_DICTIONARY_BY_LOCALE.en.publicHome.footer.tagline).toBe(
      'Civic issues, structured.',
    )
    for (const locale of ['en', 'et', 'ru']) {
      expect(PUBLIC_HOME_DICTIONARY_BY_LOCALE[locale].publicHome.footer.brand).toBe('DOGEstonia')
      expect(PUBLIC_HOME_DICTIONARY_BY_LOCALE[locale].publicHome.footer.tagline).not.toContain(
        'TAGLINE_TBD',
      )
    }
  })
})
