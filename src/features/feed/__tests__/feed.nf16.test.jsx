import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedCivicPost } from '../FeedCivicPost.jsx'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const spaRoot = path.resolve(__dirname, '../../../..')

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
  id: 'NF16-1',
  type: 'INCIDENT',
  status: 'PUBLISHED',
  title: { en: 'More deferred' },
  summary: { en: 'NF-16 gate' },
  labels: [],
  created_at: '2026-10-21T12:00:00Z',
  geo: { label: 'Tallinn' },
}

const resolve = (field) => (typeof field === 'string' ? field : field?.en ?? '')

describe('NF-16 FeedCivicPost more menu deferred', () => {
  it('list + detail: feed-civic-post-more Absent · more.svg asset kept', () => {
    const listHtml = renderPost(
      <FeedCivicPost
        issue={issue}
        locale="en"
        resolveLocalizedText={resolve}
        t={makeT()}
        to="/next/feed/issue/NF16-1"
      />,
    )
    const detailHtml = renderPost(
      <FeedCivicPost issue={issue} locale="en" resolveLocalizedText={resolve} t={makeT()} />,
    )
    expect(listHtml).not.toContain('data-testid="feed-civic-post-more"')
    expect(detailHtml).not.toContain('data-testid="feed-civic-post-more"')
    expect(listHtml).not.toContain('/icons/next-feed/actions/more.svg')
    expect(
      existsSync(path.join(spaRoot, 'public/icons/next-feed/actions/more.svg')),
    ).toBe(true)
  })

  it('source tip lock: TODO(NF-16) memo · false && gate Present', () => {
    const src = readFileSync(path.resolve(__dirname, '../FeedCivicPost.jsx'), 'utf8')
    expect(src).toMatch(/TODO\(NF-16 \/ INTERVIEW-NF-13-plus M4\)/)
    expect(src).toMatch(/false\s*&&\s*\(/)
    expect(src).toMatch(/Do not delete more\.svg/)
  })
})
