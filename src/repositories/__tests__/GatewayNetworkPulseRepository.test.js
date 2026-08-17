import { afterEach, describe, expect, it, vi } from 'vitest'
import { createGatewayNetworkPulseRepository } from '../GatewayNetworkPulseRepository.js'

describe('GatewayNetworkPulseRepository', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('throws if baseUrl is empty', () => {
    expect(() => createGatewayNetworkPulseRepository('')).toThrow('VITE_GATEWAY_BASE_URL is required')
  })

  it('calls GET /tallinn/network-pulse with trimmed base URL', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { stories_collected: 3 }, trace_id: 't' }),
    })
    vi.stubGlobal('fetch', fetchMock)
    const repo = createGatewayNetworkPulseRepository('http://localhost:8000/')

    const data = await repo.getNetworkPulse()

    expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8000/tallinn/network-pulse')
    expect(data).toEqual({ stories_collected: 3 })
  })

  it('throws on HTTP failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }),
    )
    const repo = createGatewayNetworkPulseRepository('http://localhost:8000')
    await expect(repo.getNetworkPulse()).rejects.toThrow('Gateway error: 500')
  })
})
