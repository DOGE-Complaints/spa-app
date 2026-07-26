export const WALLET_STATUS_STATES = Object.freeze({
  UNLINKED: 'unlinked',
  LINKED: 'linked',
  CONNECT: 'connect',
})

/** Fixture for State B UI layout (no wallet-API in MVP). Truncated only. */
export const WALLET_STATUS_DEMO_LINKED = Object.freeze({
  truncatedAddress: 'D8fz...91kQ',
  linkedOnLabel: 'Jun 14, 2026',
})

/**
 * @param {string | null | undefined} previewFlag sessionStorage doge.wallet-preview
 * @returns {string | null}
 */
export function mapWalletPreviewFlag(previewFlag) {
  if (!previewFlag) return null
  const map = {
    unlinked: WALLET_STATUS_STATES.UNLINKED,
    linked: WALLET_STATUS_STATES.LINKED,
    connect: WALLET_STATUS_STATES.CONNECT,
  }
  return map[previewFlag] ?? null
}

/**
 * MVP default = unlinked (State A stub). Explicit prop / DEV preview overrides.
 * @param {{ state?: string | null, previewFlag?: string | null }} input
 */
export function resolveWalletStatusState({ state = null, previewFlag = null } = {}) {
  if (state && Object.values(WALLET_STATUS_STATES).includes(state)) {
    return state
  }
  const fromPreview = mapWalletPreviewFlag(previewFlag)
  if (fromPreview) return fromPreview
  return WALLET_STATUS_STATES.UNLINKED
}
