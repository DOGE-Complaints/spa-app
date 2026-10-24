/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FeedThreadMount } from '../FeedThreadMount.jsx'
import { FeedReactionsMount } from '../FeedReactionsMount.jsx'

const dir = path.dirname(fileURLToPath(import.meta.url))

describe('CT-35 Feed comment plug · M174 · no M173 own lane', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('FeedThreadMount comment reactions · ownInZone false', async () => {
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
              comment_id: 'c-ct35',
              parent_id: null,
              depth: 0,
              body: 'ct35 empty harmony',
            },
          ],
          thread_root_reactions: null,
        },
      }),
      createComment: vi.fn(),
      replyComment: vi.fn(),
      uploadAttachment: vi.fn(),
      react: vi.fn(),
    }
    render(
      <FeedThreadMount
        issueId="ISSUE-CT35"
        client={client}
        profile={{ identity_verified: true }}
      />,
    )
    await waitFor(() => {
      expect(screen.getByTestId('tm-comment-action-pills')?.getAttribute('data-lab-ct35')).toBe(
        'true',
      )
    })
    const host = screen.getByTestId('feed-reactions-mount')
    expect(host.getAttribute('data-feed-reaction-target')).toBe('comment')
    expect(host.getAttribute('data-rm-own-in-zone')).toBe('false')
    expect(host.getAttribute('data-rm-cr24')).toBeFalsy()
    expect(screen.queryByTestId('reaction-summary-react-own')).toBeNull()
  })

  it('FeedReactionsMount target=comment defaults ownInZone false · thread-root true', () => {
    const { unmount } = render(
      <FeedReactionsMount
        issueId="ISSUE-CT35-B"
        target="comment"
        commentId="c1"
        client={{
          getKnobs: vi.fn().mockResolvedValue({ status: 'ok', data: { max_reactions: 3 } }),
          getThreadTree: vi.fn().mockResolvedValue({
            status: 'ok',
            data: { comments: [], thread_root_reactions: null },
          }),
          react: vi.fn(),
        }}
      />,
    )
    expect(screen.getByTestId('feed-reactions-mount').getAttribute('data-rm-own-in-zone')).toBe(
      'false',
    )
    unmount()
    render(
      <FeedReactionsMount
        issueId="ISSUE-CT35-C"
        target="thread-root"
        client={{
          getKnobs: vi.fn().mockResolvedValue({ status: 'ok', data: { max_reactions: 3 } }),
          getThreadTree: vi.fn().mockResolvedValue({
            status: 'ok',
            data: { comments: [], thread_root_reactions: null },
          }),
          react: vi.fn(),
        }}
      />,
    )
    expect(screen.getByTestId('feed-reactions-mount').getAttribute('data-rm-own-in-zone')).toBe(
      'true',
    )
  })

  it('source honesty · FeedThreadMount sets ownInZone={false} for comment', () => {
    const src = readFileSync(path.resolve(dir, '../FeedThreadMount.jsx'), 'utf8')
    expect(src).toMatch(/target=["']comment["'][\s\S]*ownInZone=\{false\}/)
  })
})
