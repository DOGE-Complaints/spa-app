import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  clearDiscussionFlagSessionCache,
  prefetchDiscussionFlags,
} from '../prefetchDiscussionFlags.js'
import { resetThreadsKnobsCache } from '../../repositories/threadsKnobsCache.js'

afterEach(() => {
  clearDiscussionFlagSessionCache()
  resetThreadsKnobsCache()
})

describe('prefetchDiscussionFlags PH-12', () => {
  it('maps populated trees to true; empty/unavailable to false (fail-soft)', async () => {
    const client = {
      getKnobs: vi.fn().mockResolvedValue({
        status: 'ok',
        data: { max_depth: 2 },
      }),
      getThreadTree: vi.fn(async (id) => {
        if (id === 'WITH') {
          return {
            status: 'ok',
            data: {
              comments: [{ comment_id: 'c1', body: 'hi', parent_id: null, depth: 0 }],
            },
          }
        }
        if (id === 'EMPTY') {
          return { status: 'ok', data: { comments: [] } }
        }
        return { status: 'unavailable', reason: 'boom' }
      }),
    }

    const flags = await prefetchDiscussionFlags(
      [{ id: 'WITH' }, { id: 'EMPTY' }, { id: 'BAD' }],
      { client, useSessionCache: false },
    )

    expect(flags.get('WITH')).toBe(true)
    expect(flags.get('EMPTY')).toBe(false)
    expect(flags.get('BAD')).toBe(false)
    expect(client.getThreadTree).toHaveBeenCalledTimes(3)
  })

  it('knobs unavailable → all false, no tree calls', async () => {
    const client = {
      getKnobs: vi.fn().mockResolvedValue({ status: 'unavailable' }),
      getThreadTree: vi.fn(),
    }
    const flags = await prefetchDiscussionFlags([{ id: 'A' }], {
      client,
      useSessionCache: false,
    })
    expect(flags.get('A')).toBe(false)
    expect(client.getThreadTree).not.toHaveBeenCalled()
  })

  it('tree throw → no boost', async () => {
    const client = {
      getKnobs: vi.fn().mockResolvedValue({ status: 'ok', data: { max_depth: 2 } }),
      getThreadTree: vi.fn().mockRejectedValue(new Error('net')),
    }
    const flags = await prefetchDiscussionFlags([{ id: 'X' }], {
      client,
      useSessionCache: false,
    })
    expect(flags.get('X')).toBe(false)
  })
})
