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
  id: 'CR26-1',
  type: 'INCIDENT',
  status: 'PUBLISHED',
  title: { en: 'Own React empty harmony' },
  summary: { en: 'M173' },
  labels: [],
  created_at: '2026-10-24T12:00:00Z',
  geo: { label: 'Tallinn' },
}

const resolve = (field) => (typeof field === 'string' ? field : field?.en ?? '')

describe('CR-26 FeedCivicPost M173 strip harmony', () => {
  it('strip markers · React→Comment→Share→Reactions order', () => {
    const html = renderPost(
      <FeedCivicPost
        issue={issue}
        locale="en"
        resolveLocalizedText={resolve}
        t={makeT()}
        to="/next/feed/issue/CR26-1"
      />,
    )
    expect(html).toContain('data-cr26-harmony="m173"')
    expect(html).toContain('data-cr24-underlay="m163"')
    expect(html).toContain('data-action-zones="4"')
    const reactIdx = html.indexOf('data-zone="react"')
    const commentIdx = html.indexOf('data-zone="comment"')
    const shareIdx = html.indexOf('data-zone="share"')
    const reactionsIdx = html.indexOf('data-zone="reactions"')
    expect(reactIdx).toBeGreaterThan(-1)
    expect(commentIdx).toBeGreaterThan(reactIdx)
    expect(shareIdx).toBeGreaterThan(commentIdx)
    expect(reactionsIdx).toBeGreaterThan(shareIdx)
  })

  it('CSS: Comment column · equal hit height · entry 24', () => {
    const civic = readFileSync(path.resolve(__dirname, '../FeedCivicPost.css'), 'utf8')
    const mount = readFileSync(
      path.resolve(__dirname, '../FeedReactionsMount.css'),
      'utf8',
    )
    expect(civic).toMatch(
      /\.feed-civic-post-action\s*\{[\s\S]*?flex-direction:\s*column[\s\S]*?min-height:\s*72px/,
    )
    expect(civic).toMatch(
      /\.feed-civic-post-action > \.feed-civic-post-icon\s*\{[\s\S]*?width:\s*24px/,
    )
    expect(mount).toMatch(
      /\.feed-civic-post-actions \.rm-summary-strip__react-entry \.rm-icon[\s\S]*?width:\s*24px/,
    )
    expect(mount).toMatch(
      /\.feed-civic-post-actions \.rm-summary-strip__react-own-mark \.rm-icon[\s\S]*?width:\s*18px/,
    )
  })
})
