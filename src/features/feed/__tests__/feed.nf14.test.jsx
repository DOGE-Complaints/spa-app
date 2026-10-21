import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedCivicPost } from '../FeedCivicPost.jsx'

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
    'nextFeed.post.noMedia': 'No media attached',
    'threadsFeed.post.action.react': 'React',
    'threadsFeed.post.reactionSummarySlot': 'Reactions',
    'status.PUBLISHED': 'Published',
  }
  return (k) => map[k] ?? k
}

const issue = {
  id: 'NF14-1',
  type: 'INCIDENT',
  status: 'PUBLISHED',
  title: { en: 'Hit-target card' },
  summary: { en: 'Header and media navigate' },
  labels: ['lighting'],
  created_at: '2026-10-21T11:00:00Z',
  geo: { label: 'Tallinn' },
}

const resolve = (field) => (typeof field === 'string' ? field : field?.en ?? '')

describe('NF-14 FeedCivicPost civic card hit-target', () => {
  it('list: open row Absent · hit Present · strip outside hit', () => {
    const html = renderPost(
      <FeedCivicPost
        issue={issue}
        locale="en"
        resolveLocalizedText={resolve}
        t={makeT()}
        to="/next/feed/issue/NF14-1?from=%2Fnext%2Ffeed"
      />,
    )
    expect(html).not.toContain('data-testid="feed-civic-post-open"')
    expect(html).not.toContain('class="feed-civic-post-open"')
    expect(html).toContain('data-testid="feed-civic-post-hit"')
    expect(html).toContain('href="/next/feed/issue/NF14-1?from=%2Fnext%2Ffeed"')
    expect(html).toContain('aria-label="Hit-target card"')
    expect(html).toContain('data-civic-hit="list"')
    expect(html).toContain('data-testid="feed-civic-post-media"')
    expect(html).toContain('data-action-zones="4"')
    expect(html).toContain('data-testid="feed-civic-post-actions"')
    const hitIdx = html.indexOf('data-testid="feed-civic-post-hit"')
    const hitClose = html.indexOf('</a>', hitIdx)
    const actionsIdx = html.indexOf('data-testid="feed-civic-post-actions"')
    expect(hitClose).toBeGreaterThan(hitIdx)
    expect(actionsIdx).toBeGreaterThan(hitClose)
    expect(html.slice(hitIdx, hitClose)).toContain('data-testid="feed-civic-post-media"')
    expect(html.slice(hitIdx, hitClose)).not.toContain('data-action-zones')
  })

  it('detail (no to): no hit Link · no dead Open link', () => {
    const html = renderPost(
      <FeedCivicPost issue={issue} locale="en" resolveLocalizedText={resolve} t={makeT()} />,
    )
    expect(html).not.toContain('data-testid="feed-civic-post-hit"')
    expect(html).not.toContain('data-testid="feed-civic-post-open"')
    expect(html).toContain('data-civic-hit="none"')
    expect(html).toContain('data-testid="feed-civic-post-more"')
    expect(html).toContain('data-action-zones="4"')
  })
})
