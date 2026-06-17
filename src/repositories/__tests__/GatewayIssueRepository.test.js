import { describe, expect, it, vi, afterEach } from 'vitest'
import { createGatewayIssueRepository } from '../GatewayIssueRepository.js'

describe('GatewayIssueRepository', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('throws if baseUrl is empty', () => {
    expect(() => createGatewayIssueRepository('')).toThrow('VITE_GATEWAY_BASE_URL is required')
  })

  it('trims trailing whitespace from baseUrl', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { issues: [] } }),
    })
    vi.stubGlobal('fetch', fetchMock)
    const repo = createGatewayIssueRepository('http://localhost:8000 ')

    await repo.getIssues()

    expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8000/tallinn/issues')
  })

  it('maps filters to query parameters in getIssues', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { issues: [{ id: '1' }] } }),
    })
    vi.stubGlobal('fetch', fetchMock)
    const repo = createGatewayIssueRepository('http://localhost:8000/')

    const items = await repo.getIssues({
      status: ['NEW', 'VERIFIED'],
      type: 'complaint',
      labels: ['bureaucracy', 'social'],
    })

    expect(items).toEqual([{ id: '1' }])
    const requestUrl = fetchMock.mock.calls[0][0]
    expect(requestUrl).toContain('http://localhost:8000/tallinn/issues?')
    expect(requestUrl).toContain('status=NEW')
    expect(requestUrl).toContain('status=VERIFIED')
    expect(requestUrl).toContain('type=complaint')
    expect(requestUrl).toContain('labels=bureaucracy')
    expect(requestUrl).toContain('labels=social')
  })

  it('returns null for 404 on getIssue', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ status: 404, ok: false })
    vi.stubGlobal('fetch', fetchMock)
    const repo = createGatewayIssueRepository('http://localhost:8000')

    const result = await repo.getIssue('missing')
    expect(result).toBeNull()
    expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8000/tallinn/issues/missing')
  })

  it('throws on non-404 error for getIssue', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ status: 500, ok: false })
    vi.stubGlobal('fetch', fetchMock)
    const repo = createGatewayIssueRepository('http://localhost:8000')

    await expect(repo.getIssue('X')).rejects.toThrow('Gateway error: 500')
  })
})
