import { describe, expect, it, vi } from 'vitest'
import {
  createNetworkPulseService,
  resolveNetworkPulseRepositoryForMode,
} from '../networkPulseService.js'

describe('networkPulseService', () => {
  it('returns omit when repository is missing (FAKE-OLD / no URL)', async () => {
    expect(resolveNetworkPulseRepositoryForMode('FAKE-OLD', 'http://localhost:8000')).toBeNull()
    expect(resolveNetworkPulseRepositoryForMode('GFL-DRIVEN', '')).toBeNull()
    const service = createNetworkPulseService(null)
    await expect(service.getNetworkPulse()).resolves.toEqual({ status: 'omit', slots: [] })
  })

  it('returns omit on fetch failure — no fabricated counts', async () => {
    const repo = {
      getNetworkPulse: vi.fn().mockRejectedValue(new Error('Gateway error: 500')),
    }
    const service = createNetworkPulseService(repo)
    await expect(service.getNetworkPulse()).resolves.toEqual({ status: 'omit', slots: [] })
  })

  it('returns bound slots from approved payload', async () => {
    const repo = {
      getNetworkPulse: vi.fn().mockResolvedValue({
        stories_collected: 4,
        contributors: 99,
      }),
    }
    const service = createNetworkPulseService(repo)
    const result = await service.getNetworkPulse()
    expect(result.status).toBe('bound')
    expect(result.slots.map((s) => s.id)).toEqual(['stories'])
    expect(result.slots[0].value).toBe(4)
  })
})
