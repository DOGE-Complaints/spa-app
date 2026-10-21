import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedCivicPost } from '../FeedCivicPost.jsx'

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
    'status.PUBLISHED': 'Published',
  }
  return (k) => map[k] ?? k
}

const issue = {
  id: 'NF15-1',
  type: 'INCIDENT',
  status: 'PUBLISHED',
  title: { en: 'Strip density' },
  summary: { en: 'M162 unframe' },
  labels: [],
  created_at: '2026-10-21T12:00:00Z',
  geo: { label: 'Tallinn' },
}

const resolve = (field) => (typeof field === 'string' ? field : field?.en ?? '')

describe('NF-15 FeedCivicPost action strip density (M162)', () => {
  it('keeps four-zone markers · CR-23 strip · nf15 density attr · no invent counts', () => {
    const html = renderPost(
      <FeedCivicPost
        issue={issue}
        locale="en"
        resolveLocalizedText={resolve}
        t={makeT()}
        to="/next/feed/issue/NF15-1"
      />,
    )
    expect(html).toContain('data-action-zones="4"')
    expect(html).toContain('data-feed-cr23-strip="true"')
    expect(html).toContain('data-nf15-density="m162"')
    expect(html).toContain('data-testid="feed-civic-action-react"')
    expect(html).toContain('data-testid="feed-civic-action-comment"')
    expect(html).toContain('data-testid="feed-civic-action-share"')
    expect(html).toContain('data-testid="feed-civic-action-reactions"')
    expect(html).toContain('data-testid="feed-reactions-mount"')
    expect(html).toContain('data-feed-cr23="true"')
    expect(html).not.toContain('data-invent-count')
  })

  it('CSS tip lock: post-strip React unframe · pad/gap · narrow mh 56 (glyph tip → NF-18)', () => {
    const civic = readFileSync(
      path.resolve(__dirname, '../FeedCivicPost.css'),
      'utf8',
    )
    const mount = readFileSync(
      path.resolve(__dirname, '../FeedReactionsMount.css'),
      'utf8',
    )
    expect(mount).toMatch(
      /\.feed-civic-post-actions \.rm-summary-strip__react[\s\S]*border:\s*none/,
    )
    expect(civic).toMatch(/\.feed-civic-post-action[\s\S]*padding:\s*4px 8px/)
    expect(civic).toMatch(/\.feed-civic-post-action[\s\S]*gap:\s*6px/)
    expect(civic).toMatch(/@media \(max-width: 420px\)[\s\S]*min-height:\s*56px/)
    expect(civic).toMatch(/@media \(max-width: 420px\)[\s\S]*gap:\s*4px/)
  })
})
