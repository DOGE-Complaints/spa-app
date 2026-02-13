import { describe, expect, it } from 'vitest'
import { ISSUE_STATUS, ISSUE_TYPE } from '../../../domain/types.js'
import {
  assertArweaveGraphPageResult,
  assertArweaveGraphQueryParams,
  isArweaveGraphPageResult,
  isArweaveGraphQueryParams,
} from '../ArweaveGraphAdapter.contract.js'

function makeIssue(overrides = {}) {
  return {
    id: 'DE-100',
    type: ISSUE_TYPE.COMPLAINT,
    title: 'Road damage',
    status: ISSUE_STATUS.NEW,
    labels: ['roads'],
    ...overrides,
  }
}

describe('ArweaveGraphAdapter contract', () => {
  it('accepts valid query params', () => {
    const params = {
      tags: [
        { name: 'App-Name', values: ['dogeestonia'] },
        { name: 'Schema', values: ['issue_v1'] },
      ],
      first: 20,
      after: null,
    }

    expect(isArweaveGraphQueryParams(params)).toBe(true)
    expect(assertArweaveGraphQueryParams(params)).toEqual(params)
  })

  it('rejects invalid query params', () => {
    const params = {
      tags: [{ name: 'App-Name', values: 'dogeestonia' }],
      first: 0,
    }

    expect(isArweaveGraphQueryParams(params)).toBe(false)
    expect(() => assertArweaveGraphQueryParams(params)).toThrow('Invalid ArweaveGraphQueryParams')
  })

  it('accepts valid paginated result', () => {
    const result = {
      items: [makeIssue()],
      nextCursor: 'cursor-1',
      hasNextPage: true,
    }

    expect(isArweaveGraphPageResult(result)).toBe(true)
    expect(assertArweaveGraphPageResult(result)).toEqual(result)
  })

  it('rejects invalid paginated result', () => {
    const result = {
      items: [{ id: 'broken' }],
      nextCursor: 42,
      hasNextPage: 'yes',
    }

    expect(isArweaveGraphPageResult(result)).toBe(false)
    expect(() => assertArweaveGraphPageResult(result)).toThrow('Invalid ArweaveGraphPageResult')
  })
})
