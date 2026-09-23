import { describe, expect, it, vi, afterEach } from 'vitest'
import {
  SOCIAL_HTTP_CONTRACT,
  createThreadsSocialClient,
  isSocialOpClosed,
  unavailableSocialResult,
} from '../ThreadsSocialClient.js'
import { createGatewayIssueRepository } from '../GatewayIssueRepository.js'
import {
  canWriteThreadsWithMe,
  resolveMeIdentityVerified,
} from '../../auth/meIdentityVerified.js'

describe('ThreadsSocialClient', () => {
  it('marks all ADMIN-04 social ops as open — not closed', () => {
    for (const op of Object.keys(SOCIAL_HTTP_CONTRACT)) {
      expect(isSocialOpClosed(op)).toBe(false)
    }
  })

  it('returns Unavailable without inventing production URLs or calling fetch', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'))
    const client = createThreadsSocialClient()
    const results = await Promise.all([
      client.getThreadTree(),
      client.createComment(),
      client.replyComment(),
      client.react(),
      client.attachRef(),
      client.getKnobs(),
    ])
    for (const r of results) {
      expect(r.status).toBe('unavailable')
      expect(r.reason).toBe('social_http_open')
      expect(JSON.stringify(r)).not.toMatch(/\/thread|\/threads\/|\/social\//i)
    }
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('unavailableSocialResult is frozen shape', () => {
    const r = unavailableSocialResult('tree_read')
    expect(r).toEqual({ status: 'unavailable', reason: 'social_http_open', op: 'tree_read' })
  })
})

describe('meIdentityVerified cutover', () => {
  it('gates on identity_verified — phone alone insufficient', () => {
    expect(canWriteThreadsWithMe({ phone_verified: true, identity_verified: false })).toBe(false)
    expect(canWriteThreadsWithMe({ phone_verified: true })).toBe(false)
    expect(canWriteThreadsWithMe({ identity_verified: true })).toBe(true)
    const resolved = resolveMeIdentityVerified({ identity_verified: true, phone_verified: false })
    expect(resolved.source).toBe('identity_verified')
    expect(resolved.identityVerified).toBe(true)
  })
})

describe('fail-soft Issues regress', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('getIssues still works when social client is Unavailable', async () => {
    const social = createThreadsSocialClient()
    const socialResult = await social.getThreadTree()
    expect(socialResult.status).toBe('unavailable')

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ data: { issues: [{ id: 'ISS-1' }] } }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    const issuesRepo = createGatewayIssueRepository('https://gateway.example.test')
    const issues = await issuesRepo.getIssues()
    expect(issues).toEqual([{ id: 'ISS-1' }])
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/node\/issues$/),
    )
    // Must not invent social production paths in the Issues call
    const calledUrl = String(globalThis.fetch.mock.calls[0][0])
    expect(calledUrl).not.toMatch(/\/thread|\/threads\//i)
  })
})
