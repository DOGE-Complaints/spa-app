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
  id: 'NF17-1',
  type: 'INCIDENT',
  status: 'PUBLISHED',
  title: { en: 'Chrome residual' },
  summary: { en: 'OP residual locks C1–C3 · C5' },
  labels: [],
  created_at: '2026-10-21T17:00:00Z',
  geo: { label: 'Tallinn' },
}

const resolve = (field) => (typeof field === 'string' ? field : field?.en ?? '')

describe('NF-17 FeedCivicPost civic chrome residual', () => {
  it('keeps four-zone · CR-23 · nf15 density · nf17 chrome marker · no invent counts', () => {
    const html = renderPost(
      <FeedCivicPost
        issue={issue}
        locale="en"
        resolveLocalizedText={resolve}
        t={makeT()}
        to="/next/feed/issue/NF17-1"
      />,
    )
    expect(html).toContain('data-action-zones="4"')
    expect(html).toContain('data-feed-cr23-strip="true"')
    expect(html).toContain('data-nf15-density="m162"')
    expect(html).toContain('data-nf17-chrome="residual"')
    expect(html).toContain('feed-civic-post-summary')
    expect(html).toContain('feed-civic-post-reaction-mark')
    expect(html).not.toContain('data-invent-count')
  })

  it('CSS tip lock: no actions border-top · marks 20 · pad/margin · summary 1rem · focus held', () => {
    const civic = readFileSync(
      path.resolve(__dirname, '../FeedCivicPost.css'),
      'utf8',
    )
    expect(civic).toMatch(
      /\.feed-civic-post-actions\s*\{[\s\S]*?border-top:\s*none/,
    )
    expect(civic).toMatch(
      /\.feed-civic-post-actions\s*\{[\s\S]*?margin-top:\s*0/,
    )
    expect(civic).toMatch(
      /\.feed-civic-post-actions\s*\{[\s\S]*?padding-top:\s*4px/,
    )
    expect(civic).toMatch(
      /\.feed-civic-post-actions\s*\{[\s\S]*?min-height:\s*44px/,
    )
    expect(civic).toMatch(
      /\.feed-civic-post-reaction-mark\s*\{[\s\S]*?width:\s*20px/,
    )
    expect(civic).toMatch(
      /\.feed-civic-post-reaction-mark\s*\{[\s\S]*?height:\s*20px/,
    )
    expect(civic).toMatch(
      /\.feed-civic-post-summary\s*\{[\s\S]*?font-size:\s*1rem/,
    )
    expect(civic).toMatch(
      /\.feed-civic-post-action:focus-visible\s*\{[\s\S]*outline:\s*2px solid/,
    )
  })
})
