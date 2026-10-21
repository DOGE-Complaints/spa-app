import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedCivicPost } from '../FeedCivicPost.jsx'
import { IssueTypeIcon } from '../identity/IssueTypeIcon.jsx'
import { issueTypeIconForType } from '../../../i18n/issueTypeIcons.js'

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
      'nextFeed.post.noMedia': 'No media attached',
      'threadsFeed.post.action.react': 'React',
      'threadsFeed.post.reactionSummarySlot': 'Reactions',
      'status.PUBLISHED': 'Published',
    })[key] ?? key
}

function baseIssue(type) {
  return {
    id: `NF13-${type}`,
    type,
    status: 'PUBLISHED',
    title: { en: `Type ${type}` },
    summary: { en: 'NF-13 identity icon' },
    labels: [],
    created_at: '2026-10-21T11:00:00Z',
    geo: { label: 'Tallinn' },
  }
}

const resolve = (field) => (typeof field === 'string' ? field : field?.en ?? '')

describe('NF-13 FeedCivicPost issue-type identity icon', () => {
  it('binds catalog icon for INCIDENT · glyph 24 · present marker', () => {
    const html = renderUi(
      <FeedCivicPost
        issue={baseIssue('INCIDENT')}
        locale="en"
        resolveLocalizedText={resolve}
        t={makeT()}
      />,
    )
    expect(html).toContain('data-civic-identity-icon="present"')
    expect(html).toContain('src="/icons/next-feed/types/ic-issue-type-INCIDENT.svg"')
    expect(html).toContain('width="24"')
    expect(html).toContain('height="24"')
  })

  it('binds each of five exact keys', () => {
    for (const key of [
      'INCIDENT',
      'complaint',
      'system_bug',
      'observation',
      'absurdity',
    ]) {
      const html = renderUi(
        <FeedCivicPost
          issue={baseIssue(key)}
          locale="en"
          resolveLocalizedText={resolve}
          t={makeT()}
        />,
      )
      const src = issueTypeIconForType(key)
      expect(src).toBeTruthy()
      expect(html).toContain(`src="${src}"`)
      expect(html).toContain('data-civic-identity-icon="present"')
    }
  })

  it('unknown type keeps omit · no invent glyph', () => {
    const html = renderUi(
      <FeedCivicPost
        issue={baseIssue('IMPROVEMENT')}
        locale="en"
        resolveLocalizedText={resolve}
        t={makeT()}
      />,
    )
    expect(html).toContain('data-civic-identity-icon="omit-catalog-gap"')
    expect(html).not.toContain('/icons/next-feed/types/')
  })

  it('IssueTypeIcon present uses 24×24 glyph box', () => {
    const html = renderUi(
      <IssueTypeIcon
        src="/icons/next-feed/types/ic-issue-type-complaint.svg"
        type="complaint"
      />,
    )
    expect(html).toContain('data-civic-identity-icon="present"')
    expect(html).toContain('width="24"')
    expect(html).toContain('height="24"')
  })
})
