import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedListArea } from '../FeedListArea.jsx'
import { FeedFeedSkeleton } from '../FeedFeedSkeleton.jsx'
import { FeedCivicPost } from '../FeedCivicPost.jsx'

function makeT(map = {}) {
  return (key) => map[key] ?? key
}

function renderUi(ui) {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

const ISSUE = {
  id: 'DEMO-NF10-1',
  type: 'IMPROVEMENT',
  status: 'PUBLISHED',
  title: { en: 'A trusted neighbour network for pet care' },
  summary: { en: 'Residents need a simple way to find trusted neighbours for pet care.' },
  labels: ['Pets'],
  geo: { lat: 59.437, lon: 24.753, label: 'Uus Veerenni' },
  created_at: '2026-10-10T12:00:00Z',
}

describe('NF-10 feed light theme + list composure (M149/M160)', () => {
  it('initial loading keeps honest status + card skeletons (no invent batch API)', () => {
    const html = renderToStaticMarkup(
      <FeedListArea
        t={makeT({ 'nextFeed.list.loading': 'Loading feed…' })}
        locale="en"
        error={null}
        loading
        stale={false}
        fetchIssues={() => {}}
        showEmpty={false}
        showFilteredEmpty={false}
        reset={() => {}}
        showResults={false}
        issues={[]}
        resolveLocalizedText={(v) => v}
        feedUrlForBack="/#/next/feed"
        meProfile={null}
      />,
    )
    expect(html).toContain('data-presentation="m149-list"')
    expect(html).toContain('data-list-state="loading"')
    expect(html).toContain('Loading feed…')
    expect(html).toContain('feed-skeleton-card')
    expect(html).not.toContain('batch')
  })

  it('refresh keeps populated cards + scoped refresh status (FE composure)', () => {
    const html = renderUi(
      <FeedListArea
        t={makeT({
          'nextFeed.list.loading': 'Loading feed…',
          'nextFeed.list.accessible': 'Published issues feed',
          'nextFeed.post.openIssue': 'Open issue',
          'nextFeed.post.more': 'More',
          'nextFeed.post.actions': 'Post actions',
          'nextFeed.post.comment': 'Comment',
          'nextFeed.post.share': 'Share',
          'threadsFeed.post.action.react': 'React',
          'threadsFeed.post.reactionSummarySlot': 'Reactions',
          'status.PUBLISHED': 'Published',
        })}
        locale="en"
        error={null}
        loading
        stale={false}
        fetchIssues={() => {}}
        showEmpty={false}
        showFilteredEmpty={false}
        reset={() => {}}
        showResults
        issues={[ISSUE]}
        resolveLocalizedText={(v) => (typeof v === 'string' ? v : v?.en || '')}
        feedUrlForBack="/#/next/feed"
        meProfile={null}
      />,
    )
    expect(html).toContain('data-list-state="refreshing"')
    expect(html).toContain('feed-list--refreshing')
    expect(html).toContain('data-testid="feed-refresh-status"')
    expect(html).toContain('data-testid="feed-civic-post"')
    expect(html).toContain('DEMO-NF10-1')
  })

  it('skeleton count stays bounded (M149 panel B)', () => {
    const html = renderToStaticMarkup(<FeedFeedSkeleton />)
    expect(html.match(/feed-skeleton-card/g)?.length).toBe(3)
  })

  it('civic post keeps theme-token surface classes (AD-VP-01)', () => {
    const html = renderUi(
      <FeedCivicPost
        issue={ISSUE}
        locale="en"
        resolveLocalizedText={(v) => (typeof v === 'string' ? v : v?.en || '')}
        t={makeT({
          'nextFeed.post.openIssue': 'Open issue',
          'nextFeed.post.react': 'React',
          'nextFeed.post.comment': 'Comment',
          'nextFeed.post.share': 'Share',
          'nextFeed.post.reactions': 'Reactions',
          'nextFeed.post.more': 'More',
          'nextFeed.post.actions': 'Post actions',
          'threadsFeed.post.action.react': 'React',
          'threadsFeed.post.reactionSummarySlot': 'Reactions',
          'status.PUBLISHED': 'Published',
        })}
        to="/next/feed/issue/DEMO-NF10-1"
      />,
    )
    expect(html).toContain('feed-civic-post')
    expect(html).toContain('feed-civic-post-actions')
  })
})
