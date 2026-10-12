import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedCivicPost } from '../FeedCivicPost.jsx'
import {
  IssueIdentityHeader,
  IssueTypeIcon,
  IssueStatusBadge,
  IssueMetadataRow,
} from '../identity/index.js'
import { formatIssueDate, formatGeoLabel } from '../semantics/index.js'

function renderUi(ui) {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

function makeT() {
  return (key) =>
    ({
      'nextFeed.post.openIssue': 'Open issue',
      'nextFeed.post.more': 'More actions',
      'nextFeed.post.actions': 'Post actions',
      'nextFeed.post.comment': 'Comment',
      'nextFeed.post.share': 'Share',
      'threadsFeed.post.action.react': 'React',
      'threadsFeed.post.reactionSummarySlot': 'Reactions',
      'status.PUBLISHED': 'Published',
    })[key] ?? key
}

const issue = {
  id: 'DEMO-NF-VL-01-1',
  type: 'IMPROVEMENT',
  status: 'PUBLISHED',
  title: 'Courtyard lighting for safer evenings',
  summary: 'Residents need brighter shared courtyard lights.',
  labels: ['lighting'],
  created_at: '2026-10-01T12:00:00Z',
  geo: { label: 'Kesklinn, Tallinn' },
}

describe('NF-VL-01 issue identity plane (AD-VL-01/02)', () => {
  it('exports DS-named identity surfaces without classic IssueCard', () => {
    expect(typeof IssueIdentityHeader).toBe('function')
    expect(typeof IssueTypeIcon).toBe('function')
    expect(typeof IssueStatusBadge).toBe('function')
    expect(typeof IssueMetadataRow).toBe('function')
  })

  it('semantics helpers stay pure (t03)', () => {
    expect(formatIssueDate('2026-10-01T12:00:00Z')).toMatch(/2026/)
    expect(formatGeoLabel({ label: 'Kesklinn, Tallinn' })).toBe('Kesklinn, Tallinn')
    expect(formatGeoLabel(undefined)).toBe('')
  })

  it('IssueTypeIcon honest omit — no invent SVG (t06)', () => {
    const html = renderUi(<IssueTypeIcon type="IMPROVEMENT" />)
    expect(html).toContain('data-civic-identity-icon="omit-catalog-gap"')
    expect(html).toContain('data-icon-state="omit"')
    expect(html).not.toContain('<img')
  })

  it('FeedCivicPost mounts IssueIdentityHeader plane (t02/t04)', () => {
    const html = renderUi(
      <FeedCivicPost
        issue={issue}
        locale="en"
        resolveLocalizedText={(field) =>
          typeof field === 'string' ? field : field?.en ?? ''
        }
        t={makeT()}
        to="/next/feed/issue/DEMO-NF-VL-01-1"
      />,
    )
    expect(html).toContain('data-testid="issue-identity-header"')
    expect(html).toContain('data-identity-plane="ds"')
    expect(html).toContain('data-identity-surface="IssueIdentityHeader"')
    expect(html).toContain('data-testid="issue-type-icon"')
    expect(html).toContain('data-testid="issue-status-badge"')
    expect(html).toContain('data-testid="issue-metadata-row"')
    expect(html).toContain('data-civic-identity-icon="omit-catalog-gap"')
    expect(html).toContain('DEMO-NF-VL-01-1')
    expect(html).not.toContain('ISSUE UV-')
    expect(html).not.toContain('IssueCard')
    expect(html).not.toContain('components/threads')
  })

  it('does not invent public label when Closed field absent (FR-VL-01.3)', () => {
    const html = renderUi(
      <IssueIdentityHeader
        issueId="abc-uuid"
        status="PUBLISHED"
        typeDisplay="INCIDENT"
        moreLabel="More"
      />,
    )
    expect(html).toContain('data-label-kind="wire-id"')
    expect(html).toContain('abc-uuid')
    expect(html).not.toContain('ISSUE UV-')
  })
})
