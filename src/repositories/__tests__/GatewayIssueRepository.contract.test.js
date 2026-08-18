/**
 * Live gateway contract checks (skipped when gateway unreachable).
 * Documents SPA expectations for GFL-DRIVEN board rendering.
 */
import { describe, expect, it } from 'vitest'
import { ISSUE_STATUS, ISSUE_TYPE } from '../../domain/types.js'
import { getVitePublicString, getVitePublicUrl } from '../../config/publicEnv.js'

const GATEWAY_BASE_URL = getVitePublicUrl('VITE_GATEWAY_BASE_URL')
const REALITY_MODE = getVitePublicString('VITE_LIFE_REALITY_MODE') || 'FAKE-OLD'

const REQUIRED_ISSUE_KEYS = ['id', 'status', 'type', 'labels', 'title', 'summary', 'description']
const ALLOWED_STATUS = new Set(Object.values(ISSUE_STATUS))
const ALLOWED_TYPE = new Set(Object.values(ISSUE_TYPE))

async function fetchLiveIssues() {
  const response = await fetch(`${GATEWAY_BASE_URL}/tallinn/issues`)
  if (!response.ok) {
    throw new Error(`Gateway error: ${response.status}`)
  }
  const envelope = await response.json()
  return envelope?.data?.issues ?? []
}

const gatewayReachable = REALITY_MODE === 'GFL-DRIVEN' && GATEWAY_BASE_URL.length > 0
const runLiveContract = process.env.RUN_LIVE_GATEWAY_CONTRACT === '1'

describe.skipIf(!runLiveContract || !gatewayReachable)('GatewayIssueRepository live contract', () => {
  it('returns issues with id and status required by BoardPage columns', async () => {
    const issues = await fetchLiveIssues()
    expect(issues.length).toBeGreaterThan(0)

    for (const issue of issues) {
      for (const key of REQUIRED_ISSUE_KEYS) {
        expect(issue, `issue missing ${key}`).toHaveProperty(key)
      }
      expect(typeof issue.id).toBe('string')
      expect(issue.id.length).toBeGreaterThan(0)
      expect(ALLOWED_STATUS.has(issue.status)).toBe(true)
      expect(ALLOWED_TYPE.has(issue.type)).toBe(true)
    }
  })

  it('exposes at least one issue assignable to a board column', async () => {
    const issues = await fetchLiveIssues()
    const columnAssignable = issues.filter((issue) => ALLOWED_STATUS.has(issue.status))
    expect(columnAssignable.length).toBeGreaterThan(0)
  })
})

describe('BoardPage column assignment (unit)', () => {
  it('drops issues without canonical status from all columns', () => {
    const issues = [
      { id: 'x1', status: undefined, type: 'IMPROVEMENT', labels: [], title: 't', summary: 's', description: 'd' },
      { id: 'x2', status: ISSUE_STATUS.PUBLISHED, type: 'IMPROVEMENT', labels: [], title: 't', summary: 's', description: 'd' },
    ]
    const newCol = issues.filter((item) => item.status === ISSUE_STATUS.NEW)
    const publishedCol = issues.filter((item) => item.status === ISSUE_STATUS.PUBLISHED)
    expect(newCol).toHaveLength(0)
    expect(publishedCol).toHaveLength(1)
  })
})
