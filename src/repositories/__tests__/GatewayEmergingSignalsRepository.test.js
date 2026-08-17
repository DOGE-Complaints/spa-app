import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  clampEmergingTopN,
  createGatewayEmergingSignalsRepository,
} from '../GatewayEmergingSignalsRepository.js'

describe('GatewayEmergingSignalsRepository', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('throws if baseUrl is empty', () => {
    expect(() => createGatewayEmergingSignalsRepository('')).toThrow('VITE_GATEWAY_BASE_URL is required')
  })

  it('clamps top_n to [1,50] with default 10', () => {
    expect(clampEmergingTopN(undefined)).toBe(10)
    expect(clampEmergingTopN(0)).toBe(1)
    expect(clampEmergingTopN(99)).toBe(50)
    expect(clampEmergingTopN(7)).toBe(7)
  })

  it('calls GET /tallinn/emerging-signals?top_n=10 — not /tallinn/issues', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: { signals: [{ label: 'roads', axis: 'theme', story_count: 4 }], top_n: 10 },
        trace_id: 't',
      }),
    })
    vi.stubGlobal('fetch', fetchMock)
    const repo = createGatewayEmergingSignalsRepository('http://localhost:8000/')

    const data = await repo.getEmergingSignals()

    expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8000/tallinn/emerging-signals?top_n=10')
    expect(fetchMock.mock.calls[0][0]).not.toContain('/tallinn/issues')
    expect(data.signals).toHaveLength(1)
  })

  it('throws on HTTP failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }),
    )
    const repo = createGatewayEmergingSignalsRepository('http://localhost:8000')
    await expect(repo.getEmergingSignals()).rejects.toThrow('Gateway error: 500')
  })
})
