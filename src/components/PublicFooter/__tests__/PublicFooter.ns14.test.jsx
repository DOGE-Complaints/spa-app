/**
 * @vitest-environment jsdom
 * NS-14 — footer no tagline · M169 brand PNG masters soft BLOCK (Absent) · no invent art.
 */
import { accessSync, constants } from 'node:fs'
import path from 'node:path'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { PublicFooter } from '../PublicFooter.jsx'
import { Header } from '../../AppShell/Header.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

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

describe('NS-14 brand PNG dual · soft asset BLOCK · footer no tagline', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('keeps M169 brand masters Absent (no invent art/PNG)', () => {
    expect(masterPresent('dogestonia-brand-light.png')).toBe(false)
    expect(masterPresent('dogestonia-brand-dark.png')).toBe(false)
  })

  it('omits footer tagline beside brand (M169 · FR-NS-14.3/14.4)', () => {
    render(
      <I18nProvider>
        <MemoryRouter>
          <PublicFooter />
        </MemoryRouter>
      </I18nProvider>,
    )
    expect(screen.getByTestId('public-footer').getAttribute('data-ns14')).toBe('no-tagline')
    expect(screen.queryByTestId('public-footer-tagline')).toBeNull()
    expect(screen.getByTestId('public-footer-brand').textContent).toContain('DOGEstonia')
    expect(screen.getByTestId('public-footer-brand').textContent).not.toMatch(/Civic issues/i)
  })

  it('holds Header on SVG brand until clean PNG masters Present (no invent wire)', () => {
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
    expect(logo?.getAttribute('src')).toMatch(/DOGEstonia-logo-horizontal-(light|dark)\.svg$/)
    expect(logo?.getAttribute('src')).not.toMatch(/dogestonia-brand-(light|dark)\.png$/)
  })
})
