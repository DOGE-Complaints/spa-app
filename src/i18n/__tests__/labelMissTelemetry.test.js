import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  reportLabelMiss,
  resetLabelMissTelemetrySession,
  resolveLabelMissSinkUrl,
} from '../labelMissTelemetry.js'
import { formatLabelKeyWithMeta } from '../labelDisplay.js'

function makeT(locale) {
  const dict = {
    en: { labels: { waste: 'Waste' } },
    et: { labels: { waste: 'Jäätmed' } },
    ru: { labels: { waste: 'Отходы' } },
  }[locale] ?? { labels: {} }
  return (key) => {
    const parts = String(key).split('.')
    let current = dict
    for (const part of parts) {
      current = current?.[part]
    }
    return typeof current === 'string' ? current : key
  }
}

describe('labelMissTelemetry', () => {
  const fetchMock = vi.fn(() => Promise.resolve({ ok: true }))

  beforeEach(() => {
    resetLabelMissTelemetrySession()
    vi.stubGlobal('fetch', fetchMock)
    fetchMock.mockClear()
    vi.stubEnv('VITE_TELEMETRY_ENABLED', 'true')
    vi.stubEnv('VITE_GATEWAY_BASE_URL', 'http://localhost:8000')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  it('resolves sink URL from gateway base', () => {
    expect(resolveLabelMissSinkUrl()).toBe('http://localhost:8000/telemetry/label-misses')
  })

  it('posts label_key and locale on humanize miss when enabled', () => {
    reportLabelMiss({ label_key: 'road_safety', locale: 'en' })
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8000/telemetry/label-misses',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label_key: 'road_safety', locale: 'en' }),
      }),
    )
  })

  it('does not emit when telemetry toggle is off', () => {
    vi.stubEnv('VITE_TELEMETRY_ENABLED', 'false')
    reportLabelMiss({ label_key: 'road_safety', locale: 'en' })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('does not emit on dictionary hit via formatLabelKeyWithMeta', () => {
    formatLabelKeyWithMeta(makeT('en'), 'waste', 'en')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('deduplicates same key+locale within session', () => {
    reportLabelMiss({ label_key: 'road_safety', locale: 'en' })
    reportLabelMiss({ label_key: 'road_safety', locale: 'en' })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('allows same key in different locales', () => {
    reportLabelMiss({ label_key: 'road_safety', locale: 'en' })
    reportLabelMiss({ label_key: 'road_safety', locale: 'et' })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('quiet no-op when gateway URL missing', () => {
    vi.stubEnv('VITE_GATEWAY_BASE_URL', '')
    reportLabelMiss({ label_key: 'road_safety', locale: 'en' })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('quiet no-op when fetch rejects', async () => {
    fetchMock.mockRejectedValueOnce(new Error('network'))
    expect(() => reportLabelMiss({ label_key: 'road_safety', locale: 'en' })).not.toThrow()
    await Promise.resolve()
  })
})
