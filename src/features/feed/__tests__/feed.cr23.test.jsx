/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedCivicPost } from '../FeedCivicPost.jsx'
import { FeedThreadMount } from '../FeedThreadMount.jsx'
import { FeedReactionsMount } from '../FeedReactionsMount.jsx'
import { createLiveAdapter } from '../../reactions-mount/adapters/LiveAdapter.js'

function issueStub(id = 'ISSUE-CR23') {
  return {
    id,
    title: { en: 'CR-23 civic' },
    summary: { en: 'ReactionsMount Live cutover' },
    status: 'open',
    type: 'issue',
    created_at: '2026-10-20T00:00:00Z',
    geo: null,
    labels: [],
  }
}

describe('CR-23 next/feed ReactionsMount Live cutover', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('createLiveAdapter · kind live · people fail-closed · no invent HTTP', () => {
    const adapter = createLiveAdapter({ issueId: 'ISSUE-CR23', client: { react: vi.fn() } })
    expect(adapter.kind).toBe('live')
    const people = adapter.listReactors()
    expect(people.status).toBe('fail')
    expect(people.failKind).toBe('unavailable')
    expect(people.data.inventHttp).toBe(false)
  })

  it('FeedReactionsMount hosts reactions-mount · data-rm-adapter=live', () => {
    render(
      <FeedReactionsMount
        issueId="ISSUE-CR23"
        t={(k) => k}
        client={{ react: vi.fn(), getKnobs: vi.fn().mockResolvedValue({ status: 'ok', data: {} }) }}
      />,
    )
    const host = screen.getByTestId('feed-reactions-mount')
    expect(host.getAttribute('data-feed-cr23')).toBe('true')
    expect(host.getAttribute('data-rm-adapter')).toBe('live')
    expect(host.getAttribute('data-rm-adapter-kind')).toBe('live')
    expect(screen.getByTestId('reactions-mount')).toBeTruthy()
  })

  it('FeedCivicPost strip mounts ReactionsMount Live (not FeedReactionsStrip Done)', () => {
    render(
      <I18nProvider>
        <MemoryRouter>
          <FeedCivicPost
            issue={issueStub()}
            locale="en"
            resolveLocalizedText={(f) => (typeof f === 'string' ? f : f?.en || '')}
            t={(k) => k}
          />
        </MemoryRouter>
      </I18nProvider>,
    )
    const actions = screen.getByTestId('feed-civic-post-actions')
    expect(actions.getAttribute('data-feed-cr23-strip')).toBe('true')
    expect(screen.getByTestId('feed-reactions-mount')).toBeTruthy()
    expect(screen.getByTestId('reactions-mount')).toBeTruthy()
    expect(screen.queryByTestId('feed-reactions-strip')).toBeNull()
  })

  it('FeedThreadMount comment plug · ReactionsMount target=comment', async () => {
    const client = {
      getKnobs: vi.fn().mockResolvedValue({
        status: 'ok',
        data: { max_depth: 2, media_allowed_types: [] },
      }),
      getThreadTree: vi.fn().mockResolvedValue({
        status: 'ok',
        data: {
          comments: [
            {
              comment_id: 'c-cr23',
              parent_id: null,
              depth: 0,
              body: 'CR-23 comment for reaction plug.',
            },
          ],
          thread_root_reactions: null,
        },
      }),
      createComment: vi.fn(),
      replyComment: vi.fn(),
      react: vi.fn(),
    }
    render(
      <FeedThreadMount
        issueId="ISSUE-CR23-T"
        t={(k) => k}
        profile={{ identity_verified: true }}
        client={client}
      />,
    )
    expect(screen.getByTestId('feed-thread-mount').getAttribute('data-feed-cr23')).toBe('true')
    expect(screen.getByTestId('feed-thread-mount').getAttribute('data-feed-reactions-plug')).toBe(
      'live',
    )
    await waitFor(() => {
      expect(screen.getByTestId('tm-thread-mount')).toBeTruthy()
    })
    await waitFor(() => {
      const mounts = screen.getAllByTestId('feed-reactions-mount')
      expect(mounts.some((m) => m.getAttribute('data-feed-reaction-target') === 'comment')).toBe(
        true,
      )
    })
  })
})
