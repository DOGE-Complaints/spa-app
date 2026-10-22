/** @vitest-environment jsdom */
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
  id: 'NF18-1',
  type: 'INCIDENT',
  status: 'PUBLISHED',
  title: { en: 'React density residual' },
  summary: { en: 'OP residual R1 · R2' },
  labels: [],
  created_at: '2026-10-21T19:00:00Z',
  geo: { label: 'Tallinn' },
}

const resolve = (field) => (typeof field === 'string' ? field : field?.en ?? '')

describe('NF-18 FeedCivicPost strip React density residual', () => {
  it('keeps four-zone · CR-23 · nf15/nf17 · nf18 marker · no invent counts', () => {
    const html = renderPost(
      <FeedCivicPost
        issue={issue}
        locale="en"
        resolveLocalizedText={resolve}
        t={makeT()}
        to="/next/feed/issue/NF18-1"
      />,
    )
    expect(html).toContain('data-action-zones="4"')
    expect(html).toContain('data-feed-cr23-strip="true"')
    expect(html).toContain('data-nf15-density="m162"')
    expect(html).toContain('data-nf17-chrome="residual"')
    expect(html).toContain('data-nf18-density="residual"')
    expect(html).toContain('data-testid="feed-civic-action-react"')
    expect(html).toContain('feed-civic-post-actions__react-slot')
    expect(html).toContain('data-testid="feed-reactions-mount"')
    expect(html).toContain('data-feed-cr23="true"')
    expect(html).not.toContain('data-invent-count')
  })

  it('CSS tip lock: slot flatten · glyphs 28 · single react pad · mh ≥44 · focus held', () => {
    const civic = readFileSync(
      path.resolve(__dirname, '../FeedCivicPost.css'),
      'utf8',
    )
    const mount = readFileSync(
      path.resolve(__dirname, '../FeedReactionsMount.css'),
      'utf8',
    )
    expect(civic).toMatch(
      /\.feed-civic-post-actions__react-slot\.feed-civic-post-action\s*\{[\s\S]*?padding:\s*0/,
    )
    expect(civic).toMatch(
      /\.feed-civic-post-actions__react-slot\.feed-civic-post-action:hover\s*\{[\s\S]*?background:\s*transparent/,
    )
    expect(civic).toMatch(
      /\.feed-civic-post-action\s*>\s*\.feed-civic-post-icon[\s\S]*width:\s*28px/,
    )
    expect(civic).toMatch(
      /\.feed-civic-post-action\s*>\s*\.feed-civic-post-icon[\s\S]*height:\s*28px/,
    )
    /* CR-24 M163 supersedes NF-18 transparent React → wide underlay · entry glyph 28 held */
    expect(mount).toMatch(
      /\.feed-civic-post-actions \.rm-summary-strip__react-entry \.rm-icon[\s\S]*width:\s*28px|\.feed-civic-post-actions \.rm-summary-strip__react \.rm-icon[\s\S]*width:\s*28px/,
    )
    expect(mount).toMatch(
      /\.feed-civic-post-actions \.rm-summary-strip__react[\s\S]*padding:\s*6px 8px/,
    )
    expect(mount).toMatch(
      /\.feed-civic-post-actions \.rm-summary-strip__react[\s\S]*min-height:\s*72px/,
    )
    expect(mount).toMatch(
      /\.feed-civic-post-actions \.rm-summary-strip__react[\s\S]*background:\s*var\(--color-bg-primary/,
    )
    expect(mount).toMatch(
      /\.feed-civic-post-actions \.rm-summary-strip__react:focus-visible[\s\S]*?\{[\s\S]*?outline:\s*2px solid/,
    )
    expect(civic).toMatch(
      /\.feed-civic-post-actions\s*\{[\s\S]*?min-height:\s*44px/,
    )
  })
})
