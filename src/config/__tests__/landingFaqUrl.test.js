/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

async function loadHelper() {
  vi.resetModules()
  return import('../landingFaqUrl.js')
}

describe('landingFaqUrl helper (PH-16)', () => {
  beforeEach(() => {
    vi.unstubAllEnvs()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('getLandingFaqUrl reads trimmed VITE_LANDING_FAQ_URL', async () => {
    vi.stubEnv('VITE_LANDING_FAQ_URL', '  https://example.test/landing/#faq  ')
    const { getLandingFaqUrl, getLandingFaqHref, hasLandingFaqUrl } = await loadHelper()
    expect(getLandingFaqUrl()).toBe('https://example.test/landing/#faq')
    expect(getLandingFaqHref()).toBe('https://example.test/landing/#faq')
    expect(hasLandingFaqUrl()).toBe(true)
  })

  it('empty env: calm empty string / # href; no invent landing host', async () => {
    vi.stubEnv('VITE_LANDING_FAQ_URL', '')
    const { getLandingFaqUrl, getLandingFaqHref, hasLandingFaqUrl } = await loadHelper()
    expect(getLandingFaqUrl()).toBe('')
    expect(getLandingFaqHref()).toBe('#')
    expect(hasLandingFaqUrl()).toBe(false)
    expect(getLandingFaqUrl()).not.toMatch(/dogestonia\.me/i)
  })
})
