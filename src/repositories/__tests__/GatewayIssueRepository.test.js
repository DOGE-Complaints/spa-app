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
      status: ['NEW', 'PUBLISHED'],
      type: 'INCIDENT',
      labels: ['waste', 'safety'],
      institution: 'Haigekassa',
      created_after: '2025-01-01',
      created_before: '2025-02-01',
    })

    expect(items).toEqual([{ id: '1' }])
    const requestUrl = fetchMock.mock.calls[0][0]
    expect(requestUrl).toContain('http://localhost:8000/tallinn/issues?')
    expect(requestUrl).toContain('status=NEW')
    expect(requestUrl).toContain('status=PUBLISHED')
    expect(requestUrl).toContain('type=INCIDENT')
    expect(requestUrl).toContain('labels=waste')
    expect(requestUrl).toContain('labels=safety')
    expect(requestUrl).toContain('institution=Haigekassa')
    expect(requestUrl).toContain('created_after=2025-01-01T00%3A00%3A00Z')
    expect(requestUrl).toContain('created_before=2025-02-01T23%3A59%3A59Z')
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
