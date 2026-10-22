/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedCivicPost } from '../FeedCivicPost.jsx'
import { FeedThreadMount } from '../FeedThreadMount.jsx'
import { FeedReactionsMount } from '../FeedReactionsMount.jsx'
import { createLiveAdapter as createThreadLiveAdapter } from '../../thread-mount/adapters/LiveAdapter.js'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function makeT() {
  const map = {
    'nextFeed.post.openIssue': 'Open issue',
    'nextFeed.post.more': 'More actions',
    'nextFeed.post.actions': 'Post actions',
    'nextFeed.post.comment': 'Comment',
    'nextFeed.post.share': 'Share',
    'nextFeed.post.noMedia': 'No media',
    'threadsFeed.post.action.react': 'React',
    'threadsFeed.post.reactionSummarySlot': 'Reactions',
    'threadsFeed.reactions.react': 'React',
    'threadsFeed.reactions.done': 'Done',
    'threadsFeed.reactions.cancel': 'Cancel',
    'threadsFeed.reactions.add': 'Add',
    'status.PUBLISHED': 'Published',
  }
  return (k) => map[k] ?? k
}

const issue = {
  id: 'CR25-1',
  type: 'INCIDENT',
  status: 'PUBLISHED',
  title: { en: 'Hydrate selected' },
  summary: { en: 'CR-25' },
  labels: [],
  created_at: '2026-10-22T12:00:00Z',
  geo: { label: 'Tallinn' },
}

const resolve = (field) => (typeof field === 'string' ? field : field?.en ?? '')

function treeWithSelected(overrides = {}) {
  return {
    status: 'ok',
    data: {
      comments: [
        {
          comment_id: 'c-cr25',
          parent_id: null,
          depth: 0,
          body: 'Comment hydrate body',
          selected: ['agree'],
          summary_marks: [{ reaction_id: 'agree', count: 2 }],
          aggregate_count: 2,
        },
      ],
      thread_root_reactions: {
        selected: ['acknowledge'],
        summary_marks: [{ reaction_id: 'acknowledge', count: 4 }],
        aggregate_count: 4,
      },
      ...overrides,
    },
  }
}

describe('CR-25 reaction selected hydrate persist', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('FeedReactionsMount hydrates initialSelected · cr25 markers · own icons', () => {
    render(
      <FeedReactionsMount
        issueId="CR25-1"
        t={makeT()}
        client={{ react: vi.fn(), getKnobs: vi.fn().mockResolvedValue({ status: 'ok', data: {} }) }}
        ownInZone
        initialSelected={['acknowledge']}
        initialSummaryMarks={[{ reaction_id: 'acknowledge', count: 4 }]}
        initialAggregateCount={4}
      />,
    )
    const host = screen.getByTestId('feed-reactions-mount')
    expect(host.getAttribute('data-feed-cr25')).toBe('true')
    expect(host.getAttribute('data-feed-cr25-hydrate')).toBe('props')
    expect(host.getAttribute('data-feed-cr25-selected-count')).toBe('1')
    expect(screen.getByTestId('reaction-summary-own-acknowledge')).toBeTruthy()
    expect(screen.getByTestId('reaction-summary-react').getAttribute('data-rm-own-count')).toBe('1')
  })

  it('anonymous omit · empty selected honesty · no own mark', () => {
    render(
      <FeedReactionsMount
        issueId="CR25-anon"
        t={makeT()}
        client={{ react: vi.fn(), getKnobs: vi.fn().mockResolvedValue({ status: 'ok', data: {} }) }}
        ownInZone
        initialSelected={[]}
        initialSummaryMarks={[]}
        initialAggregateCount={0}
      />,
    )
    const host = screen.getByTestId('feed-reactions-mount')
    expect(host.getAttribute('data-feed-cr25-selected-count')).toBe('0')
    expect(screen.queryByTestId('reaction-summary-own-acknowledge')).toBeNull()
    expect(screen.getByTestId('reaction-summary-react').className).toMatch(/react--zero/)
  })

  it('FeedCivicPost passes tree hydrate props into Live strip', () => {
    render(
      <I18nProvider>
        <MemoryRouter>
          <FeedCivicPost
            issue={issue}
            locale="en"
            resolveLocalizedText={resolve}
            t={makeT()}
            initialSelected={['acknowledge']}
            initialSummaryMarks={[{ reaction_id: 'acknowledge', count: 3 }]}
            initialAggregateCount={3}
          />
        </MemoryRouter>
      </I18nProvider>,
    )
    const host = screen.getByTestId('feed-reactions-mount')
    expect(host.getAttribute('data-feed-cr25')).toBe('true')
    expect(host.getAttribute('data-feed-cr25-selected-count')).toBe('1')
    expect(screen.getByTestId('reaction-summary-own-acknowledge')).toBeTruthy()
  })

  it('FeedThreadMount comment plug hydrates node.selected from tree', async () => {
    const client = {
      getKnobs: vi.fn().mockResolvedValue({
        status: 'ok',
        data: { max_depth: 2, media_allowed_types: [] },
      }),
      getThreadTree: vi.fn().mockResolvedValue(treeWithSelected()),
      createComment: vi.fn(),
      replyComment: vi.fn(),
      react: vi.fn(),
    }
    render(
      <FeedThreadMount
        issueId="CR25-T"
        t={makeT()}
        profile={{ identity_verified: true }}
        client={client}
      />,
    )
    await waitFor(() => {
      expect(screen.getByTestId('feed-thread-mount').getAttribute('data-feed-cr25')).toBe('true')
    })
    await waitFor(() => {
      const plugs = screen.getAllByTestId('feed-reactions-mount')
      const comment = plugs.find((el) => el.getAttribute('data-feed-reaction-target') === 'comment')
      expect(comment?.getAttribute('data-feed-cr25-selected-count')).toBe('1')
      expect(comment?.querySelector('[data-testid="reaction-summary-own-agree"]')).toBeTruthy()
    })
  })

  it('LiveAdapter snapshot exposes threadRootReactions from mapper', async () => {
    const client = {
      getKnobs: vi.fn().mockResolvedValue({
        status: 'ok',
        data: { max_depth: 2, media_allowed_types: [] },
      }),
      getThreadTree: vi.fn().mockResolvedValue(treeWithSelected()),
    }
    const adapter = createThreadLiveAdapter({
      issueId: 'CR25-L',
      client,
      profile: { identity_verified: true },
    })
    const snap = await adapter.load()
    expect(snap.threadRootReactions.selected).toEqual(['acknowledge'])
    expect(snap.threadRootReactions.aggregateCount).toBe(4)
    expect(snap.comments[0].selected).toEqual(['agree'])
  })

  it('PUT ok → getThreadTree rehydrate keeps selected (no silent drop)', async () => {
    const react = vi.fn().mockResolvedValue({
      status: 'ok',
      data: {
        selected: ['acknowledge', 'agree'],
        summary_marks: [
          { reaction_id: 'acknowledge', count: 5 },
          { reaction_id: 'agree', count: 1 },
        ],
        aggregate_count: 6,
      },
    })
    const getThreadTree = vi.fn().mockResolvedValue({
      status: 'ok',
      data: {
        comments: [],
        thread_root_reactions: {
          selected: ['acknowledge', 'agree'],
          summary_marks: [
            { reaction_id: 'acknowledge', count: 5 },
            { reaction_id: 'agree', count: 1 },
          ],
          aggregate_count: 6,
        },
      },
    })
    const client = {
      getKnobs: vi.fn().mockResolvedValue({
        status: 'ok',
        data: { max_reactions_per_actor: 3 },
      }),
      getThreadTree,
      react,
    }
    render(
      <FeedReactionsMount
        issueId="CR25-W"
        t={makeT()}
        client={client}
        ownInZone
        defaultOpen
        initialSelected={['acknowledge']}
        initialSummaryMarks={[{ reaction_id: 'acknowledge', count: 4 }]}
        initialAggregateCount={4}
      />,
    )
    expect(screen.getByTestId('reaction-summary-own-acknowledge')).toBeTruthy()
    await waitFor(() => {
      expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()
    })
    fireEvent.click(screen.getByTestId('rm-picker-option-agree'))
    const done =
      screen.queryByTestId('rm-picker-done') || screen.queryByTestId('rm-picker-add')
    if (done) fireEvent.click(done)
    await waitFor(() => {
      expect(react).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(getThreadTree).toHaveBeenCalled()
      expect(screen.getByTestId('feed-reactions-mount').getAttribute('data-feed-cr25-selected-count')).toBe(
        '2',
      )
      expect(screen.getByTestId('reaction-summary-own-agree')).toBeTruthy()
    })
  })

  it('source honesty · rehydrateFromTree + host wire Present', () => {
    const mountSrc = readFileSync(path.resolve(__dirname, '../FeedReactionsMount.jsx'), 'utf8')
    const threadSrc = readFileSync(path.resolve(__dirname, '../FeedThreadMount.jsx'), 'utf8')
    const civicSrc = readFileSync(path.resolve(__dirname, '../FeedCivicPost.jsx'), 'utf8')
    const detailSrc = readFileSync(path.resolve(__dirname, '../FeedIssueDetail.jsx'), 'utf8')
    expect(mountSrc).toMatch(/initialSelected/)
    expect(mountSrc).toMatch(/rehydrateFromTree/)
    expect(mountSrc).toMatch(/mapThreadTreeToBlock/)
    expect(threadSrc).toMatch(/onThreadRootReactions/)
    expect(threadSrc).toMatch(/node\?\.selected/)
    expect(civicSrc).toMatch(/initialSelected=\{initialSelected\}/)
    expect(detailSrc).toMatch(/onThreadRootReactions=\{setRootRx\}/)
  })
})
