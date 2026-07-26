import { describe, expect, it } from 'vitest'
import {
  WALLET_STATUS_STATES,
  mapWalletPreviewFlag,
  resolveWalletStatusState,
} from '../walletStatusState.js'

describe('walletStatusState', () => {
  it('maps DEV preview flags to states', () => {
    expect(mapWalletPreviewFlag('unlinked')).toBe(WALLET_STATUS_STATES.UNLINKED)
    expect(mapWalletPreviewFlag('linked')).toBe(WALLET_STATUS_STATES.LINKED)
    expect(mapWalletPreviewFlag('connect')).toBe(WALLET_STATUS_STATES.CONNECT)
    expect(mapWalletPreviewFlag('nope')).toBeNull()
  })

  it('defaults to unlinked MVP stub', () => {
    expect(resolveWalletStatusState({})).toBe(WALLET_STATUS_STATES.UNLINKED)
  })

  it('prefers explicit state over preview', () => {
    expect(
      resolveWalletStatusState({
        state: WALLET_STATUS_STATES.CONNECT,
        previewFlag: 'linked',
      }),
    ).toBe(WALLET_STATUS_STATES.CONNECT)
  })
})
