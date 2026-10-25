/**
 * @vitest-environment jsdom
 * NS-18 — Profile mobile Account rows (M178).
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { AccountSummary } from '../AccountSummary.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'
import { CAB08_SHOW_WALLET_CONTRIB } from '../../../pages/UserCabinetPage.jsx'

function wrap(profile) {
  return render(
    <I18nProvider>
      <AccountSummary profile={profile} />
    </I18nProvider>,
  )
}

describe('NS-18 AccountSummary mobile rows (M178)', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('marks ns18 / m178 lab harmony', () => {
    wrap({
      email: 'resident@example.org',
      created_at: '2026-10-14T12:00:00Z',
      role: 'citizen',
      status: 'active',
    })
    const root = screen.getByTestId('account-summary')
    expect(root.getAttribute('data-lab-ns18')).toBe('true')
    expect(root.getAttribute('data-ns18-harmony')).toBe('m178')
    expect(screen.getByTestId('account-summary-field-email')).toBeTruthy()
    expect(screen.getByTestId('account-summary-field-created')).toBeTruthy()
  })

  it('declares stacked mobile rows and no vertical writing-mode in CSS', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/components/AccountSummary/AccountSummary.css'), 'utf8')
    expect(css).toMatch(/NS-18/)
    expect(css).toMatch(/max-width:\s*767px/)
    expect(css).toMatch(/grid-area:\s*label/)
    expect(css).toMatch(/writing-mode:\s*horizontal-tb/)
    expect(css).not.toMatch(/writing-mode:\s*vertical/)
  })

  it('profile shell CSS releases empty rail on phone', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/components/AppShell/ProfileRail.css'), 'utf8')
    expect(css).toMatch(/next-shell-profile/)
    expect(css).toMatch(/NS-18/)
  })

  it('keeps CAB-08 wallet/contrib gated', () => {
    expect(CAB08_SHOW_WALLET_CONTRIB).toBe(false)
    const src = readFileSync(resolve(process.cwd(), 'src/layout/AppShellLayout.jsx'), 'utf8')
    expect(src).toMatch(/showRightSlot=\{false\}/)
    expect(src).toMatch(/NS-18/)
  })
})
