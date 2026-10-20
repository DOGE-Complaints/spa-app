/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { FeedThreadMount } from '../FeedThreadMount.jsx'
import { createLiveAdapter } from '../../thread-mount/adapters/LiveAdapter.js'

describe('CT-28 next/feed ThreadMount Live cutover', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('createLiveAdapter · issueId Present · load not live-adapter-unwired', async () => {
    const client = {
      getKnobs: vi.fn().mockResolvedValue({
        status: 'ok',
        data: { max_depth: 2, media_allowed_types: [] },
      }),
      getThreadTree: vi.fn().mockResolvedValue({
        status: 'ok',
        data: { comments: [], thread_root_reactions: null },
      }),
      createComment: vi.fn(),
      replyComment: vi.fn(),
    }
    const adapter = createLiveAdapter({ issueId: 'ISSUE-CT28', client, profile: null })
    expect(adapter.kind).toBe('live')
    expect(adapter.snapshot().reason).not.toBe('live-adapter-unwired')
    const snap = await adapter.load()
    expect(snap.reason).not.toBe('live-adapter-unwired')
    expect(snap.live).toBe(true)
    expect(snap.status).toBe('empty')
    expect(client.getThreadTree).toHaveBeenCalledWith('ISSUE-CT28')
  })

  it('createLiveAdapter · missing issueId · unavailable · not unwired invent', async () => {
    const adapter = createLiveAdapter({ issueId: '', client: {} })
    const snap = await adapter.load()
    expect(snap.status).toBe('unavailable')
    expect(snap.reason).toBe('missing_issue_id')
    expect(snap.reason).not.toBe('live-adapter-unwired')
  })

  it('FeedThreadMount renders ThreadMount · not FeedDiscussionBlock', async () => {
    const client = {
      getKnobs: vi.fn().mockResolvedValue({
        status: 'ok',
        data: { max_depth: 3, media_allowed_types: [] },
      }),
      getThreadTree: vi.fn().mockResolvedValue({
        status: 'ok',
        data: {
          comments: [
            {
              comment_id: 'c1',
              parent_id: null,
              depth: 0,
              body: 'Live tree comment for CT-28.',
            },
          ],
          thread_root_reactions: null,
        },
      }),
      createComment: vi.fn(),
      replyComment: vi.fn(),
    }
    render(
      <FeedThreadMount
        issueId="ISSUE-CT28-B"
        t={(k) => k}
        profile={{ identity_verified: true }}
        client={client}
      />,
    )
    expect(screen.getByTestId('feed-thread-mount').getAttribute('data-feed-ct28')).toBe('true')
    expect(screen.getByTestId('feed-thread-mount').getAttribute('data-feed-thread-host')).toBe(
      'live',
    )
    expect(screen.queryByTestId('feed-discussion-block')).toBeNull()
    await waitFor(() => {
      expect(screen.getByTestId('tm-thread-mount')).toBeTruthy()
      expect(screen.getByTestId('feed-thread-mount').getAttribute('data-feed-live-bound')).toBe(
        'true',
      )
      expect(screen.getByTestId('feed-thread-mount').getAttribute('data-feed-thread-status')).toBe(
        'populated',
      )
    })
    expect(screen.getByText('Live tree comment for CT-28.')).toBeTruthy()
  })
})
