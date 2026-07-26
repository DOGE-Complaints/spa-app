/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { CABINET_DICTIONARY_EN } from '../../../i18n/cabinetDictionary.js'
import { WalletStatusCard } from '../WalletStatusCard.jsx'
import { WALLET_STATUS_STATES } from '../walletStatusState.js'

afterEach(cleanup)

function renderCard(props = {}) {
  return render(
    <MemoryRouter>
      <I18nProvider>
        <WalletStatusCard {...props} />
      </I18nProvider>
    </MemoryRouter>,
  )
}

describe('WalletStatusCard', () => {
  it('renders three runtime states A–C', () => {
    const states = [
      WALLET_STATUS_STATES.UNLINKED,
      WALLET_STATUS_STATES.LINKED,
      WALLET_STATUS_STATES.CONNECT,
    ]
    for (const state of states) {
      cleanup()
      renderCard({ state })
      expect(screen.getByTestId('wallet-status-card').getAttribute('data-wallet-status-state')).toBe(
        state,
      )
    }
  })

  it('MVP default is unlinked stub with disabled Coming Later', () => {
    renderCard()
    expect(screen.getByTestId('wallet-status-card').getAttribute('data-wallet-status-state')).toBe(
      WALLET_STATUS_STATES.UNLINKED,
    )
    expect(screen.getByTestId('wallet-status-title').textContent).toBe(
      CABINET_DICTIONARY_EN.cabinet.wallet.stateA.title,
    )
    const cta = screen.getByTestId('wallet-status-coming-later')
    expect(cta.textContent).toBe(CABINET_DICTIONARY_EN.cabinet.common.comingLater)
    expect(cta.disabled).toBe(true)
  })

  it('Manage Wallet and Connect Wallet show comingSoon (no wallet-API)', () => {
    renderCard({ state: WALLET_STATUS_STATES.LINKED })
    fireEvent.click(screen.getByTestId('wallet-status-manage'))
    expect(screen.getByTestId('wallet-status-coming-soon').textContent).toBe(
      CABINET_DICTIONARY_EN.cabinet.common.comingSoon,
    )
    cleanup()
    renderCard({ state: WALLET_STATUS_STATES.CONNECT })
    fireEvent.click(screen.getByTestId('wallet-status-connect'))
    expect(screen.getByTestId('wallet-status-coming-soon').textContent).toBe(
      CABINET_DICTIONARY_EN.cabinet.common.comingSoon,
    )
  })

  it('linked state shows truncated address only (privacy)', () => {
    renderCard({
      state: WALLET_STATUS_STATES.LINKED,
      truncatedAddress: 'D8fz...91kQ',
    })
    const text = screen.getByTestId('wallet-status-card').textContent
    expect(text).toContain('D8fz...91kQ')
    expect(text).not.toMatch(/private key|seed phrase|mnemonic/i)
    expect(text).not.toMatch(/balance|DOGE|\$|trading|DeFi/i)
    expect(text).not.toMatch(/D8fz[a-zA-Z0-9]{20}/)
  })

  it('authorship language — no trading/speculation copy', () => {
    renderCard({ state: WALLET_STATUS_STATES.CONNECT })
    const text = screen.getByTestId('wallet-status-card').textContent
    expect(text).toMatch(/authorship/i)
    expect(text).not.toMatch(/trad(e|ing)|invest|speculat|yield|APY/i)
  })

  it('source has no wallet-API fetch', async () => {
    const { readFile } = await import('node:fs/promises')
    const { fileURLToPath } = await import('node:url')
    const path = await import('node:path')
    const root = path.dirname(fileURLToPath(import.meta.url))
    const src = await readFile(path.join(root, '../WalletStatusCard.jsx'), 'utf8')
    expect(src).not.toMatch(/\bfetch\s*\(/)
    expect(src).not.toMatch(/wallet_status|wallet_address|wallet_linked/)
  })

  it('wires catalog icon paths (no unicode glyphs)', () => {
    renderCard({ state: WALLET_STATUS_STATES.UNLINKED })
    expect(screen.getByTestId('wallet-status-header-icon').getAttribute('src')).toBe(
      '/icons/user-cabinet/ic-wallet-unlinked.png',
    )
    cleanup()
    renderCard({ state: WALLET_STATUS_STATES.LINKED })
    expect(screen.getByTestId('wallet-status-header-icon').getAttribute('src')).toBe(
      '/icons/user-cabinet/ic-wallet-linked.png',
    )
    cleanup()
    renderCard({ state: WALLET_STATUS_STATES.CONNECT })
    expect(screen.getByTestId('wallet-status-header-icon').getAttribute('src')).toBe(
      '/icons/user-cabinet/ic-wallet-connect.png',
    )
  })
})
