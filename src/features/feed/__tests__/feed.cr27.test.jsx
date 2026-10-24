/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

vi.mock('../FeedThreadMount.jsx', () => ({
  FeedThreadMount: ({ onThreadRootReactions, issueId }) => {
    useEffect(() => {
      if (typeof onThreadRootReactions !== 'function') return
      onThreadRootReactions({
        selected: ['acknowledge'],
        summaryMarks: [{ reaction_id: 'acknowledge', count: 4 }],
        aggregateCount: 4,
      })
    }, [onThreadRootReactions, issueId])
    return <div data-testid="feed-thread-mount" data-mock-cr27="true" />
  },
}))

import { FeedListArea } from '../FeedListArea.jsx'

function makeT() {
  const map = {
    'nextFeed.post.openIssue': 'Open issue',
    'nextFeed.post.more': 'More actions',
    'nextFeed.post.actions': 'Post actions',
    'nextFeed.post.comment': 'Comment',
    'nextFeed.post.share': 'Share',
    'nextFeed.post.noMedia': 'No media',
    'nextFeed.list.accessible': 'Feed list',
    'nextFeed.list.loading': 'Loading',
    'nextFeed.list.stale': 'Stale',
    'nextFeed.list.retry': 'Retry',
    'nextFeed.list.error': 'Error',
    'threadsFeed.post.action.react': 'React',
    'threadsFeed.post.reactionSummarySlot': 'Reactions',
    'threadsFeed.reactions.react': 'React',
    'status.PUBLISHED': 'Published',
  }
  return (k) => map[k] ?? k
}

const issue = {
  id: 'CR27-1',
  type: 'INCIDENT',
  status: 'PUBLISHED',
  title: { en: 'List hydrate' },
  summary: { en: 'CR-27' },
  labels: [],
  created_at: '2026-10-24T12:00:00Z',
  geo: { label: 'Tallinn' },
}

const resolve = (field) => (typeof field === 'string' ? field : field?.en ?? '')

describe('CR-27 list own reactions hydrate', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('list card lifts rootRx → FeedCivicPost initialSelected (CR-25 mapping)', async () => {
    render(
      <I18nProvider>
        <MemoryRouter>
          <FeedListArea
            t={makeT()}
            locale="en"
            error={null}
            loading={false}
            stale={false}
            fetchIssues={() => {}}
            showEmpty={false}
            showFilteredEmpty={false}
            reset={() => {}}
            showResults
            issues={[issue]}
            resolveLocalizedText={resolve}
            feedUrlForBack="/next/feed"
            meProfile={{ identity_verified: true }}
          />
        </MemoryRouter>
      </I18nProvider>,
    )

    const card = await screen.findByTestId('feed-list-card-shelter')
    expect(card.getAttribute('data-feed-cr27')).toBe('true')
    await waitFor(() => {
      expect(card.getAttribute('data-feed-cr27-selected-count')).toBe('1')
    })
    const list = screen.getByTestId('feed-list')
    expect(list.getAttribute('data-feed-cr27-list')).toBe('true')
    const strip = screen.getByTestId('feed-reactions-mount')
    expect(strip.getAttribute('data-feed-cr25')).toBe('true')
    expect(strip.getAttribute('data-feed-cr25-selected-count')).toBe('1')
    expect(screen.getByTestId('reaction-summary-own-acknowledge')).toBeTruthy()
  })

  it('source honesty · list reuses CR-25 tree lift · no invent gateway schema', () => {
    const listSrc = readFileSync(path.resolve(__dirname, '../FeedListArea.jsx'), 'utf8')
    const detailSrc = readFileSync(path.resolve(__dirname, '../FeedIssueDetail.jsx'), 'utf8')
    expect(listSrc).toMatch(/onThreadRootReactions=\{setRootRx\}/)
    expect(listSrc).toMatch(/initialSelected=\{rootRx\?\.selected\}/)
    expect(listSrc).toMatch(/initialSummaryMarks=\{rootRx\?\.summaryMarks\}/)
    expect(listSrc).toMatch(/initialAggregateCount=\{rootRx\?\.aggregateCount\}/)
    expect(listSrc).toMatch(/data-feed-cr27/)
    expect(listSrc).not.toMatch(/thread_root_reactions\s*:/)
    expect(detailSrc).toMatch(/onThreadRootReactions=\{setRootRx\}/)
  })
})
