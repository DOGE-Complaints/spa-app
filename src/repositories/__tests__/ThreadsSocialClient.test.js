import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest'
import {
  CLOSED_SOCIAL_PATHS,
  classifyAttachRefResponse,
  classifyCommentWriteResponse,
  classifyReactionResponse,
  createThreadsSocialClient,
  isSocialOpClosed,
  unavailableSocialResult,
  writeFailSocialResult,
} from '../ThreadsSocialClient.js'
import { createGatewayIssueRepository } from '../GatewayIssueRepository.js'
import {
  canWriteThreadsWithMe,
  resolveMeIdentityVerified,
} from '../../auth/meIdentityVerified.js'
import {
  ensureThreadsKnobsCached,
  getCachedMaxDepth,
  resetThreadsKnobsCache,
  resetThreadsKnobsFocusBinding,
} from '../threadsKnobsCache.js'
import { mapThreadTreeToBlock, truncateCommentLabel } from '../mapThreadTreeToBlock.js'

describe('ThreadsSocialClient THR-07/08/09 Close', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('closes knobs + tree_read + comment + react + attach_ref', () => {
    expect(isSocialOpClosed('knobs')).toBe(true)
    expect(isSocialOpClosed('tree_read')).toBe(true)
    expect(isSocialOpClosed('comment_create')).toBe(true)
    expect(isSocialOpClosed('comment_reply')).toBe(true)
    expect(isSocialOpClosed('react')).toBe(true)
    expect(isSocialOpClosed('attach_ref')).toBe(true)
    expect(CLOSED_SOCIAL_PATHS.knobs).toBe('/threads/knobs')
    expect(CLOSED_SOCIAL_PATHS.tree_read('ISS-1')).toBe('/threads/issues/ISS-1')
    expect(CLOSED_SOCIAL_PATHS.comment_write('ISS-1')).toBe('/threads/issues/ISS-1/comments')
    expect(CLOSED_SOCIAL_PATHS.reactions('ISS-1')).toBe('/threads/issues/ISS-1/reactions')
    expect(CLOSED_SOCIAL_PATHS.attachment_refs('ISS-1')).toBe('/threads/issues/ISS-1/attachment-refs')
    expect(CLOSED_SOCIAL_PATHS.comment_write('ISS-1')).not.toMatch(/by-issue/)
    expect(CLOSED_SOCIAL_PATHS.reactions('ISS-1')).not.toMatch(/by-issue/)
  })

  it('unknown reaction id rejected without fetch', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'))
    const client = createThreadsSocialClient({
      baseUrl: 'http://127.0.0.1:8001',
      getAccessToken: async () => 'tok',
    })
    const result = await client.react({
      issueId: 'ISS-1',
      targetKind: 'comment',
      commentId: 'c1',
      reactionId: 'not-a-real-id',
      op: 'add',
    })
    expect(result.status).toBe('fail')
    expect(result.reason).toBe('unknown_reaction_id')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('getKnobs fetches Closed path only', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          data: { max_depth: 8, max_reactions_per_actor: 3, reactions_enable: {}, media_allowed_types: [] },
          trace_id: 't1',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    const client = createThreadsSocialClient({ baseUrl: 'http://127.0.0.1:8001' })
    const result = await client.getKnobs()
    expect(result.status).toBe('ok')
    expect(result.data.max_depth).toBe(8)
    expect(fetchSpy).toHaveBeenCalledWith('http://127.0.0.1:8001/threads/knobs')
    const url = String(fetchSpy.mock.calls[0][0])
    expect(url).not.toMatch(/by-issue/)
  })

  it('getThreadTree fetches Closed path; empty → ok data', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ data: { issue_id: 'ISS-1', comments: [] }, trace_id: 't1' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    const client = createThreadsSocialClient({ baseUrl: 'http://threads.test' })
    const result = await client.getThreadTree('ISS-1')
    expect(result.status).toBe('ok')
    expect(result.data.comments).toEqual([])
    expect(fetchSpy).toHaveBeenCalledWith('http://threads.test/threads/issues/ISS-1')
    expect(String(fetchSpy.mock.calls[0][0])).not.toMatch(/by-issue/)
  })

  it('network fail → unavailable', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'))
    const client = createThreadsSocialClient({ baseUrl: 'http://threads.test' })
    const result = await client.getThreadTree('ISS-1')
    expect(result).toEqual({ status: 'unavailable', reason: 'network', op: 'tree_read' })
  })

  it('missing base URL → unavailable without invent localhost fetch', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'))
    const client = createThreadsSocialClient({ baseUrl: '' })
    const result = await client.getKnobs()
    expect(result.status).toBe('unavailable')
    expect(result.reason).toBe('missing_base_url')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('unavailableSocialResult is frozen shape', () => {
    const r = unavailableSocialResult('tree_read')
    expect(r).toEqual({ status: 'unavailable', reason: 'social_http_open', op: 'tree_read' })
  })
})

describe('ThreadsSocialClient THR-08 comment write', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('verified happy path POSTs Closed URL with Bearer + parent_id null', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          data: { comment_id: 'c-new', parent_id: null, depth: 0, body: 'Hello' },
          trace_id: 't1',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    const client = createThreadsSocialClient({
      baseUrl: 'http://threads.test',
      getAccessToken: async () => 'access-tok',
    })
    const result = await client.createComment({ issueId: 'ISS-1', body: 'Hello' })
    expect(result.status).toBe('ok')
    expect(result.data.comment_id).toBe('c-new')
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    const [url, init] = fetchSpy.mock.calls[0]
    expect(String(url)).toBe('http://threads.test/threads/issues/ISS-1/comments')
    expect(String(url)).not.toMatch(/by-issue/)
    expect(init.method).toBe('POST')
    expect(init.headers.Authorization).toBe('Bearer access-tok')
    expect(JSON.parse(init.body)).toEqual({ body: 'Hello', parent_id: null })
  })

  it('reply POSTs same Closed path with parent_id', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          data: { comment_id: 'c-r', parent_id: 'c-root', depth: 1, body: 'Reply' },
          trace_id: 't1',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    const client = createThreadsSocialClient({
      baseUrl: 'http://threads.test',
      getAccessToken: async () => 'tok',
    })
    const result = await client.replyComment({ issueId: 'ISS-1', body: 'Reply', parentId: 'c-root' })
    expect(result.status).toBe('ok')
    expect(JSON.parse(fetchSpy.mock.calls[0][1].body)).toEqual({ body: 'Reply', parent_id: 'c-root' })
  })

  it('missing bearer → verify fail without fetch', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'))
    const client = createThreadsSocialClient({
      baseUrl: 'http://threads.test',
      getAccessToken: async () => null,
    })
    const result = await client.createComment({ issueId: 'ISS-1', body: 'x' })
    expect(result).toEqual(
      expect.objectContaining({ status: 'fail', failKind: 'verify', op: 'comment_create' }),
    )
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('401/403 → verify soft-fail', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: { code: 'FORBIDDEN', type: 'auth', message: 'no' } }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    const client = createThreadsSocialClient({
      baseUrl: 'http://threads.test',
      getAccessToken: async () => 'tok',
    })
    const result = await client.createComment({ issueId: 'ISS-1', body: 'x' })
    expect(result.failKind).toBe('verify')
    expect(result.httpStatus).toBe(403)
  })

  it('200 DOMAIN_ERROR depth → max_depth', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          error: {
            code: 'DOMAIN_ERROR',
            type: 'DOMAIN_ERROR',
            message: 'max depth exceeded',
            details: { reason: 'depth' },
          },
          trace_id: 't1',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    const client = createThreadsSocialClient({
      baseUrl: 'http://threads.test',
      getAccessToken: async () => 'tok',
    })
    const result = await client.replyComment({ issueId: 'ISS-1', body: 'x', parentId: 'c1' })
    expect(result.failKind).toBe('max_depth')
  })

  it('422 → post_fail', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ detail: [{ loc: ['body'], msg: 'bad' }] }), {
        status: 422,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    const client = createThreadsSocialClient({
      baseUrl: 'http://threads.test',
      getAccessToken: async () => 'tok',
    })
    const result = await client.createComment({ issueId: 'ISS-1', body: '' })
    expect(result.failKind).toBe('post_fail')
    expect(result.httpStatus).toBe(422)
  })

  it('classifyCommentWriteResponse maps §8 matrix', () => {
    expect(classifyCommentWriteResponse(401, { error: { code: 'UNAUTHORIZED' } }, 'comment_create').failKind).toBe(
      'verify',
    )
    expect(
      classifyCommentWriteResponse(
        200,
        { error: { code: 'DOMAIN_ERROR', details: { reason: 'max_depth' } } },
        'comment_reply',
      ).failKind,
    ).toBe('max_depth')
    expect(classifyCommentWriteResponse(422, {}, 'comment_create').failKind).toBe('post_fail')
    expect(
      classifyCommentWriteResponse(
        200,
        { data: { comment_id: 'c1', parent_id: null, depth: 0, body: 'ok' } },
        'comment_create',
      ).status,
    ).toBe('ok')
    expect(writeFailSocialResult('comment_create', 'post_fail').status).toBe('fail')
  })
})

describe('ThreadsSocialClient THR-09 react + attach_ref', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('react add PUTs Closed path with Bearer + ReactionData', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          data: {
            issue_id: 'ISS-1',
            target_kind: 'comment',
            comment_id: 'c1',
            reaction_id: 'agree',
            op: 'add',
            selected: ['agree'],
            summary_marks: [{ reaction_id: 'agree', count: 1 }],
            aggregate_count: 1,
          },
          trace_id: 't1',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    const client = createThreadsSocialClient({
      baseUrl: 'http://threads.test',
      getAccessToken: async () => 'tok',
    })
    const result = await client.react({
      issueId: 'ISS-1',
      targetKind: 'comment',
      commentId: 'c1',
      reactionId: 'agree',
      op: 'add',
    })
    expect(result.status).toBe('ok')
    expect(result.data.selected).toEqual(['agree'])
    const [url, init] = fetchSpy.mock.calls[0]
    expect(String(url)).toBe('http://threads.test/threads/issues/ISS-1/reactions')
    expect(String(url)).not.toMatch(/by-issue/)
    expect(init.method).toBe('PUT')
    expect(init.headers.Authorization).toBe('Bearer tok')
    expect(JSON.parse(init.body)).toEqual({
      target_kind: 'comment',
      comment_id: 'c1',
      reaction_id: 'agree',
      op: 'add',
    })
  })

  it('react remove on thread_root sends comment_id null', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          data: {
            issue_id: 'ISS-1',
            target_kind: 'thread_root',
            comment_id: null,
            reaction_id: 'support',
            op: 'remove',
            selected: [],
            summary_marks: [],
            aggregate_count: 0,
          },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    const client = createThreadsSocialClient({
      baseUrl: 'http://threads.test',
      getAccessToken: async () => 'tok',
    })
    await client.react({
      issueId: 'ISS-1',
      targetKind: 'thread_root',
      reactionId: 'support',
      op: 'remove',
    })
    expect(JSON.parse(fetchSpy.mock.calls[0][1].body)).toEqual({
      target_kind: 'thread_root',
      comment_id: null,
      reaction_id: 'support',
      op: 'remove',
    })
  })

  it('attachRef POSTs refs only; attach-denied DOMAIN on 200', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          error: {
            code: 'DOMAIN_ERROR',
            type: 'DOMAIN_ERROR',
            message: 'floor',
            details: { reason: 'attach-denied' },
          },
          trace_id: 't1',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    const client = createThreadsSocialClient({
      baseUrl: 'http://threads.test',
      getAccessToken: async () => 'tok',
    })
    const result = await client.attachRef({
      issueId: 'ISS-1',
      refId: 'ref-1',
      mediaType: 'image/png',
      commentId: 'c1',
    })
    expect(result.failKind).toBe('attach_denied')
    expect(result.reason).toBe('attach-denied')
    const [url, init] = fetchSpy.mock.calls[0]
    expect(String(url)).toBe('http://threads.test/threads/issues/ISS-1/attachment-refs')
    expect(String(url)).not.toMatch(/by-issue/)
    expect(init.method).toBe('POST')
    expect(JSON.parse(init.body)).toEqual({
      ref_id: 'ref-1',
      media_type: 'image/png',
      comment_id: 'c1',
      floor_class: 'ok',
    })
    expect(JSON.stringify(init.body)).not.toMatch(/multipart|FormData|blob/i)
  })

  it('attachRef happy path ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          data: { ref_id: 'ref-1', media_type: 'image/png', comment_id: 'c1', floor_class: 'ok' },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    const client = createThreadsSocialClient({
      baseUrl: 'http://threads.test',
      getAccessToken: async () => 'tok',
    })
    const result = await client.attachRef({
      issueId: 'ISS-1',
      refId: 'ref-1',
      mediaType: 'image/png',
      commentId: 'c1',
    })
    expect(result.status).toBe('ok')
    expect(result.data.ref_id).toBe('ref-1')
  })

  it('classifyReactionResponse + classifyAttachRefResponse §8', () => {
    expect(
      classifyReactionResponse(
        200,
        {
          data: {
            selected: ['agree'],
            summary_marks: [],
            aggregate_count: 1,
          },
        },
        'react',
      ).status,
    ).toBe('ok')
    expect(classifyReactionResponse(403, { error: { code: 'FORBIDDEN' } }, 'react').failKind).toBe('verify')
    expect(
      classifyAttachRefResponse(
        200,
        { error: { code: 'DOMAIN_ERROR', details: { reason: 'attach-denied' } } },
        'attach_ref',
      ).failKind,
    ).toBe('attach_denied')
    expect(
      classifyAttachRefResponse(
        200,
        { data: { ref_id: 'r', media_type: 'image/png', comment_id: 'c', floor_class: 'ok' } },
        'attach_ref',
      ).status,
    ).toBe('ok')
  })
})

describe('threadsKnobsCache', () => {
  beforeEach(() => {
    resetThreadsKnobsCache()
    resetThreadsKnobsFocusBinding()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    resetThreadsKnobsCache()
  })

  it('caches max_depth from getKnobs', async () => {
    const client = {
      getKnobs: vi.fn().mockResolvedValue({
        status: 'ok',
        data: { max_depth: 5 },
        op: 'knobs',
      }),
    }
    const a = await ensureThreadsKnobsCached({ client })
    const b = await ensureThreadsKnobsCached({ client })
    expect(a.max_depth).toBe(5)
    expect(b.max_depth).toBe(5)
    expect(getCachedMaxDepth()).toBe(5)
    expect(client.getKnobs).toHaveBeenCalledTimes(1)
  })
})

describe('mapThreadTreeToBlock', () => {
  it('maps empty / populated / unavailable', () => {
    expect(mapThreadTreeToBlock({ status: 'ok', data: { issue_id: 'i', comments: [] } })).toEqual({
      status: 'empty',
      comments: [],
    })
    const populated = mapThreadTreeToBlock({
      status: 'ok',
      data: {
        issue_id: 'i',
        comments: [{ comment_id: 'c1', parent_id: null, depth: 0, body: 'Hello world' }],
      },
    })
    expect(populated.status).toBe('populated')
    expect(populated.comments[0]).toEqual({
      id: 'c1',
      parentId: null,
      depth: 0,
      label: 'Hello world',
    })
    expect(mapThreadTreeToBlock({ status: 'unavailable', reason: 'network', op: 'tree_read' }).status).toBe(
      'unavailable',
    )
  })

  it('truncates long body labels', () => {
    const long = 'x'.repeat(200)
    expect(truncateCommentLabel(long).length).toBeLessThanOrEqual(160)
    expect(truncateCommentLabel(long).endsWith('…')).toBe(true)
  })

  it('malformed comments → unavailable', () => {
    expect(
      mapThreadTreeToBlock({ status: 'ok', data: { issue_id: 'i', comments: [{ body: 'no id' }] } }).status,
    ).toBe('unavailable')
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

  it('getIssues still works when social comment write soft-fails without invent paths', async () => {
    const social = createThreadsSocialClient({
      baseUrl: 'http://threads.test',
      getAccessToken: async () => null,
    })
    const socialResult = await social.createComment({ issueId: 'ISS-1', body: 'x' })
    expect(socialResult.status).toBe('fail')
    expect(socialResult.failKind).toBe('verify')

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ data: { issues: [{ id: 'ISS-1' }] } }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    const issuesRepo = createGatewayIssueRepository('https://gateway.example.test')
    const issues = await issuesRepo.getIssues()
    expect(issues).toEqual([{ id: 'ISS-1' }])
    expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringMatching(/\/node\/issues$/))
    const calledUrl = String(globalThis.fetch.mock.calls[0][0])
    expect(calledUrl).not.toMatch(/\/thread|\/threads\//i)
  })
})
