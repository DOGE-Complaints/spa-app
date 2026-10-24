/** @vitest-environment jsdom */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedCivicPost } from '../FeedCivicPost.jsx'
import {
  FeedPeerReactionsEntry,
  PEER_EMPTY_ICON_SRC,
  resolvePeerSummaryState,
} from '../FeedPeerReactionsEntry.jsx'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function renderPost(ui) {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

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
    'status.PUBLISHED': 'Published',
  }
  return (k) => map[k] ?? k
}

const issue = {
  id: 'CR28-1',
  type: 'INCIDENT',
  status: 'PUBLISHED',
  title: { en: 'Peer empty affordance' },
  summary: { en: 'M176' },
  labels: [],
  created_at: '2026-10-24T12:00:00Z',
  geo: { label: 'Tallinn' },
}

const resolve = (field) => (typeof field === 'string' ? field : field?.en ?? '')

describe('CR-28 peer Reactions empty affordance (M176)', () => {
  it('resolvePeerSummaryState · missing ≠ empty · known empty/filled', () => {
    expect(resolvePeerSummaryState(undefined, undefined, { known: false }).known).toBe(false)
    expect(resolvePeerSummaryState([], 0, { known: true })).toMatchObject({
      known: true,
      empty: true,
    })
    expect(
      resolvePeerSummaryState([{ reaction_id: 'acknowledge', count: 2 }], 2, { known: true }),
    ).toMatchObject({ known: true, empty: false })
  })

  it('FeedPeerReactionsEntry empty · people icon above label · catalog src', () => {
    const html = renderToStaticMarkup(
      <FeedPeerReactionsEntry
        t={makeT()}
        known
        summaryMarks={[]}
        aggregateCount={0}
        onActivate={() => {}}
      />,
    )
    expect(html).toContain('data-feed-cr28="true"')
    expect(html).toContain('data-feed-cr28-peer="empty"')
    expect(html).toContain('data-testid="feed-civic-peer-empty-icon"')
    expect(html).toContain(PEER_EMPTY_ICON_SRC)
    expect(html).toContain('data-testid="feed-civic-peer-label"')
    expect(html).toContain('feed-civic-post-peer-chips--reserved')
  })

  it('FeedPeerReactionsEntry filled · chips · no empty icon', () => {
    const html = renderToStaticMarkup(
      <FeedPeerReactionsEntry
        t={makeT()}
        known
        summaryMarks={[
          { reaction_id: 'acknowledge', count: 2 },
          { reaction_id: 'agree', count: 1 },
        ]}
        aggregateCount={3}
        onActivate={() => {}}
      />,
    )
    expect(html).toContain('data-feed-cr28-peer="filled"')
    expect(html).not.toContain('data-testid="feed-civic-peer-empty-icon"')
    expect(html).toContain('data-testid="feed-civic-peer-chip-acknowledge"')
    expect(html).toContain('data-testid="feed-civic-peer-chip-agree"')
  })

  it('FeedCivicPost hydrate empty peer · strip marker', () => {
    const html = renderPost(
      <FeedCivicPost
        issue={issue}
        locale="en"
        resolveLocalizedText={resolve}
        t={makeT()}
        to="/next/feed/issue/CR28-1"
        initialSummaryMarks={[]}
        initialAggregateCount={0}
      />,
    )
    expect(html).toContain('data-feed-cr28-strip="true"')
    expect(html).toContain('data-feed-cr28-peer="empty"')
    expect(html).toContain('data-testid="feed-civic-peer-empty-icon"')
  })

  it('source honesty · catalog people chrome · no invent people HTTP', () => {
    const peerSrc = readFileSync(path.resolve(__dirname, '../FeedPeerReactionsEntry.jsx'), 'utf8')
    const civicSrc = readFileSync(path.resolve(__dirname, '../FeedCivicPost.jsx'), 'utf8')
    const icons = readFileSync(
      path.resolve(__dirname, '../../reactions-mount/icons/crReactionIcons.js'),
      'utf8',
    )
    expect(peerSrc).toMatch(/PEER_EMPTY_ICON_SRC/)
    expect(peerSrc).toMatch(/\/icons\/next-feed\/actions\/reactions\.svg/)
    expect(civicSrc).toMatch(/FeedPeerReactionsEntry/)
    expect(civicSrc).toMatch(/onSummaryChange/)
    expect(icons).toMatch(/people:\s*'\/icons\/next-feed\/actions\/reactions\.svg'/)
    expect(peerSrc).not.toMatch(/fetch\(|\/people\/|listReactors/)
  })
})
