/**
 * @vitest-environment jsdom
 * NS-14 — footer no tagline held · soft supersede by NS-15 masters Present + PNG wire.
 */
import { accessSync, constants } from 'node:fs'
import path from 'node:path'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { PublicFooter } from '../PublicFooter.jsx'
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

describe('NS-14 brand PNG dual · footer no tagline (held · NS-15 supersede)', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
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
    expect(screen.getByTestId('public-footer-brand').textContent).not.toMatch(/Civic issues/i)
  })

  it('soft: tip masters Present after NS-15 promote (no invent)', () => {
    expect(masterPresent('dogestonia-brand-light.png')).toBe(true)
    expect(masterPresent('dogestonia-brand-dark.png')).toBe(true)
  })
})
