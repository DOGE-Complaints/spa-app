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
    'threadsFeed.reactions.react': 'React',
    'status.PUBLISHED': 'Published',
  }
  return (k) => map[k] ?? k
}

const issue = {
  id: 'CR24-1',
  type: 'INCIDENT',
  status: 'PUBLISHED',
  title: { en: 'React underlay residual' },
  summary: { en: 'M163/M164' },
  labels: [],
  created_at: '2026-10-22T12:00:00Z',
  geo: { label: 'Tallinn' },
}

const resolve = (field) => (typeof field === 'string' ? field : field?.en ?? '')

describe('CR-24 FeedCivicPost React underlay · own vs people', () => {
  it('four-zone · cr24 markers · Reactions text-only · no glyph stack', () => {
    const html = renderPost(
      <FeedCivicPost
        issue={issue}
        locale="en"
        resolveLocalizedText={resolve}
        t={makeT()}
        to="/next/feed/issue/CR24-1"
      />,
    )
    expect(html).toContain('data-action-zones="4"')
    expect(html).toContain('data-cr24-underlay="m163"')
    expect(html).toContain('data-rm-react-underlay="wide"')
    expect(html).toContain('data-rm-own-in-zone="true"')
    expect(html).toContain('data-rm-cr24="true"')
    expect(html).toContain('data-rm-reactions-text-only="true"')
    expect(html).toContain('data-testid="feed-civic-action-reactions"')
    expect(html).not.toContain('feed-civic-post-reaction-marks')
    expect(html).not.toContain('feed-civic-post-reaction-mark')
    expect(html).toContain('data-zone="comment"')
    expect(html).toContain('data-zone="share"')
  })

  it('CSS tip: wide underlay · Comment/Share flat · focus held', () => {
    const mount = readFileSync(
      path.resolve(__dirname, '../FeedReactionsMount.css'),
      'utf8',
    )
    const civic = readFileSync(path.resolve(__dirname, '../FeedCivicPost.css'), 'utf8')
    expect(mount).toMatch(
      /\.feed-civic-post-actions \.rm-summary-strip__react[\s\S]*?background:\s*var\(--color-bg-primary/,
    )
    expect(mount).toMatch(
      /\.feed-civic-post-actions \.rm-summary-strip__react[\s\S]*?min-height:\s*72px/,
    )
    expect(mount).toMatch(
      /\.feed-civic-post-actions \.rm-summary-strip__react:focus-visible[\s\S]*?\{[\s\S]*?outline:\s*2px solid/,
    )
    expect(civic).toMatch(
      /\.feed-civic-post-action\s*\{[\s\S]*?background:\s*transparent/,
    )
    expect(civic).toMatch(
      /\.feed-civic-post-actions__react-slot\.feed-civic-post-action\s*\{[\s\S]*?padding:\s*0/,
    )
  })
})
