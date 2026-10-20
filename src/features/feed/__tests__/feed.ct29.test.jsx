import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedCivicPost } from '../FeedCivicPost.jsx'
import { FeedIssueDetail } from '../FeedIssueDetail.jsx'
import { CIVIC_MEDIA_STUB_PATH } from '../civicMediaStub.js'
import { LAB_MEDIA_STUB_PATH } from '../../feed-lab/fixtures/labMediaStub.js'

function renderUi(ui) {
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
    issuePlaceholder: 'Loading…',
    notFoundTitle: 'Not found',
    loadErrorTitle: 'Load error',
    backToBoard: 'Back',
    'nextFeed.list.retry': 'Retry',
  }
  return (k) => map[k] ?? k
}

const issue = {
  id: 'CT29-1',
  type: 'IMPROVEMENT',
  status: 'PUBLISHED',
  title: { en: 'Stub media card' },
  summary: { en: 'Dogefeed interim' },
  labels: [],
  created_at: '2026-10-20T21:00:00Z',
  geo: { label: 'Tallinn' },
}

const resolve = (field) => (typeof field === 'string' ? field : field?.en ?? '')

describe('CT-29 FeedCivicPost civic media stub', () => {
  it('exports same stub path as lab LAB_MEDIA_STUB_PATH', () => {
    expect(CIVIC_MEDIA_STUB_PATH).toBe('/assets/dogefeed.png')
    expect(CIVIC_MEDIA_STUB_PATH).toBe(LAB_MEDIA_STUB_PATH)
  })

  it('list surface: media Present · src stub · not no-media Done', () => {
    const html = renderUi(
      <FeedCivicPost
        issue={issue}
        locale="en"
        resolveLocalizedText={resolve}
        t={makeT()}
        to="/next/feed/issue/CT29-1"
      />,
    )
    expect(html).toContain('data-civic-variant="media-stub"')
    expect(html).not.toContain('data-civic-variant="no-media"')
    expect(html).toContain('data-testid="feed-civic-post-media"')
    expect(html).toContain(`src="${CIVIC_MEDIA_STUB_PATH}"`)
    expect(html).toContain('data-civic-media-stub="true"')
  })

  it('detail surface: same stub src as list (FeedIssueDetail → FeedCivicPost)', () => {
    const list = renderUi(
      <FeedCivicPost issue={issue} locale="en" resolveLocalizedText={resolve} t={makeT()} />,
    )
    const detail = renderUi(
      <FeedIssueDetail
        issueId={issue.id}
        issue={issue}
        loading={false}
        error={null}
        notFound={false}
        onRetry={() => {}}
        onBack={() => {}}
        locale="en"
        resolveLocalizedText={resolve}
        t={makeT()}
        meProfile={{ identity_verified: true }}
      />,
    )
    expect(list).toContain(`src="${CIVIC_MEDIA_STUB_PATH}"`)
    expect(detail).toContain(`src="${CIVIC_MEDIA_STUB_PATH}"`)
    expect(detail).toContain('data-testid="feed-issue-detail"')
    expect(detail).toContain('data-civic-variant="media-stub"')
    const listSrc = list.match(/data-media-src="([^"]+)"/)?.[1]
    const detailSrc = detail.match(/data-media-src="([^"]+)"/)?.[1]
    expect(listSrc).toBe(CIVIC_MEDIA_STUB_PATH)
    expect(detailSrc).toBe(listSrc)
  })
})
