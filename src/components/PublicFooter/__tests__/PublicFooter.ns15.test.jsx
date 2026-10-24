/**
 * @vitest-environment jsdom
 * NS-15 — OP tip PNG dual · footer no adjacent text · masters Present (copy only).
 */
import { accessSync, constants } from 'node:fs'
import path from 'node:path'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { PublicFooter } from '../PublicFooter.jsx'
import { Header } from '../../AppShell/Header.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

const LIGHT = '/assets/dogestonia-brand-light.png'
const DARK = '/assets/dogestonia-brand-dark.png'

function assetsRoot() {
  return path.resolve(process.cwd(), 'public/assets')
}

function masterPresent(name) {
  try {
    accessSync(path.join(assetsRoot(), name), constants.F_OK)
    return true
  } catch {
    return false
  }
}

describe('NS-15 brand OP light PNG · footer dual', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
    document.documentElement.setAttribute('data-theme', 'light')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
    document.documentElement.removeAttribute('data-theme')
  })

  it('has promoted tip masters Present in public/assets (copy only)', () => {
    expect(masterPresent('dogestonia-brand-light.png')).toBe(true)
    expect(masterPresent('dogestonia-brand-dark.png')).toBe(true)
  })

  it('wires Header light+dark to tip PNG masters', async () => {
    render(
      <I18nProvider>
        <MemoryRouter initialEntries={['/next/feed']}>
          <Routes>
            <Route path="*" element={<Header accountSlot={null} />} />
          </Routes>
        </MemoryRouter>
      </I18nProvider>,
    )
    const logo = screen.getByTestId('public-header-brand').querySelector('img.header-brand-logo')
    expect(logo?.getAttribute('src')).toBe(LIGHT)
    expect(logo?.getAttribute('src')).not.toMatch(/DOGEstonia-logo-horizontal/)
    document.documentElement.setAttribute('data-theme', 'dark')
    await waitFor(() => {
      const darkLogo = screen.getByTestId('public-header-brand').querySelector('img.header-brand-logo')
      expect(darkLogo?.getAttribute('src')).toBe(DARK)
    })
  })

  it('wires Footer light+dark tip PNG · no adjacent brand text · not logo-big', async () => {
    render(
      <I18nProvider>
        <MemoryRouter>
          <PublicFooter />
        </MemoryRouter>
      </I18nProvider>,
    )
    const footer = screen.getByTestId('public-footer')
    expect(footer.getAttribute('data-ns15')).toBe('brand-png-dual')
    expect(footer.getAttribute('data-ns14')).toBe('no-tagline')
    expect(screen.queryByTestId('public-footer-tagline')).toBeNull()
    expect(screen.queryByText('DOGEstonia', { selector: '.public-footer__brand-name' })).toBeNull()
    expect(screen.getByTestId('public-footer-brand').textContent).not.toMatch(/Civic issues/i)
    const logo = screen.getByTestId('public-footer-logo')
    expect(logo.getAttribute('src')).toBe(LIGHT)
    expect(logo.getAttribute('src')).not.toMatch(/DOGEstonia-logo-big/)
    expect(Number(logo.getAttribute('height'))).toBeGreaterThanOrEqual(40)
    document.documentElement.setAttribute('data-theme', 'dark')
    await waitFor(() => {
      expect(screen.getByTestId('public-footer-logo').getAttribute('src')).toBe(DARK)
    })
  })
})
