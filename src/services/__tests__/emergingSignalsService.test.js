import { describe, expect, it, vi } from 'vitest'
import {
  createEmergingSignalsService,
  resolveEmergingSignalsRepositoryForMode,
} from '../emergingSignalsService.js'

describe('emergingSignalsService', () => {
  it('returns empty when repository is missing (FAKE-OLD / no URL)', async () => {
    expect(resolveEmergingSignalsRepositoryForMode('FAKE-OLD', 'http://localhost:8000')).toBeNull()
    expect(resolveEmergingSignalsRepositoryForMode('GFL-DRIVEN', '')).toBeNull()
    const service = createEmergingSignalsService(null)
    await expect(service.getEmergingSignals()).resolves.toEqual({ status: 'empty', cards: [] })
  })

  it('returns empty on fetch failure — no fabricated rows', async () => {
    const repo = {
      getEmergingSignals: vi.fn().mockRejectedValue(new Error('Gateway error: 500')),
    }
    const service = createEmergingSignalsService(repo)
    await expect(service.getEmergingSignals()).resolves.toEqual({ status: 'empty', cards: [] })
  })

  it('returns cards from signals payload without Issue identity', async () => {
    const repo = {
      getEmergingSignals: vi.fn().mockResolvedValue({
        signals: [{ label: 'roads', axis: 'theme', story_count: 4, issue_id: 'ISS-9' }],
      }),
    }
    const service = createEmergingSignalsService(repo)
    const result = await service.getEmergingSignals()
    expect(result.status).toBe('cards')
    expect(result.cards).toEqual([{ label: 'roads', axis: 'theme', storyCount: 4 }])
  })
})
