import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedCivicPost } from '../FeedCivicPost.jsx'
import { NEXT_FEED_FLAT_KEYS } from '../../../i18n/nextFeedDictionary.js'

function renderPost(ui) {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

function makeT(locale = 'en') {
  const map = {
    en: {
      'nextFeed.post.openIssue': 'Open issue',
      'nextFeed.post.more': 'More actions',
      'nextFeed.post.actions': 'Post actions',
      'nextFeed.post.comment': 'Comment',
      'nextFeed.post.share': 'Share',
      'threadsFeed.post.action.react': 'React',
      'threadsFeed.post.reactionSummarySlot': 'Reactions',
      'status.PUBLISHED': 'Published',
    },
    et: {
      'nextFeed.post.openIssue': 'Ava teade',
      'nextFeed.post.more': 'Rohkem',
      'nextFeed.post.actions': 'Postituse toimingud',
      'nextFeed.post.comment': 'Kommentaar',
      'nextFeed.post.share': 'Jaga',
      'threadsFeed.post.action.react': 'Reageeri',
      'threadsFeed.post.reactionSummarySlot': 'Reaktsioonid',
      'status.PUBLISHED': 'Avaldatud',
    },
    ru: {
      'nextFeed.post.openIssue': 'Открыть обращение',
      'nextFeed.post.more': 'Ещё',
      'nextFeed.post.actions': 'Действия с записью',
      'nextFeed.post.comment': 'Комментарий',
      'nextFeed.post.share': 'Поделиться',
      'threadsFeed.post.action.react': 'Реакция',
      'threadsFeed.post.reactionSummarySlot': 'Реакции',
      'status.PUBLISHED': 'Опубликовано',
    },
  }
  return (key) => map[locale][key] ?? key
}

const baseIssue = {
  id: 'DEMO-NF07-1',
  type: 'IMPROVEMENT',
  status: 'PUBLISHED',
  title: { en: 'Courtyard lighting', et: 'Õue valgustus', ru: 'Освещение двора' },
  summary: { en: 'Need safer lights', et: 'Turvalisem valgus', ru: 'Нужен свет' },
  labels: ['lighting'],
  created_at: '2026-10-01T12:00:00Z',
  geo: { label: 'Kesklinn, Tallinn', settlement: 'Tallinn', district: 'Kesklinn' },
}

describe('NF-07 FeedCivicPost visual parity (M150 / AD-VP-01)', () => {
  it('exposes nextFeed.post.comment + actions flat keys', () => {
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.post.comment')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.post.actions')
  })

  it('renders four equal action zones React|Comment|Share|Reactions', () => {
    const html = renderPost(
      <FeedCivicPost
        issue={baseIssue}
        locale="en"
        resolveLocalizedText={(field) =>
          typeof field === 'string' ? field : field?.en ?? ''
        }
        t={makeT('en')}
        to="/next/feed/issue/DEMO-NF07-1"
      />,
    )
    expect(html).toContain('data-action-zones="4"')
    expect(html).toContain('data-testid="feed-civic-action-react"')
    expect(html).toContain('data-testid="feed-civic-action-comment"')
    expect(html).toContain('data-testid="feed-civic-action-share"')
    expect(html).toContain('data-testid="feed-civic-action-reactions"')
    expect(html).toContain('data-zone="reactions"')
    expect(html).toContain('React')
    expect(html).toContain('Comment')
    expect(html).toContain('Share')
    expect(html).toContain('Reactions')
    expect(html).toContain('/icons/next-feed/reactions/acknowledge.svg')
    expect(html).toContain('/icons/next-feed/reactions/support.svg')
    expect(html).toContain('/icons/next-feed/reactions/agree.svg')
    expect(html).not.toContain('schema-card-overlay')
    expect(html).not.toContain('feed-civic-post-media')
  })

  it('keeps API status honesty — PUBLISHED wire, no invent OPEN/UV', () => {
    const html = renderPost(
      <FeedCivicPost
        issue={baseIssue}
        locale="en"
        resolveLocalizedText={(field) =>
          typeof field === 'string' ? field : field?.en ?? ''
        }
        t={makeT('en')}
      />,
    )
    expect(html).toContain('data-status-wire="PUBLISHED"')
    expect(html).toContain('data-status="PUBLISHED"')
    expect(html).not.toContain('>OPEN<')
    expect(html).not.toContain('ISSUE UV-')
    expect(html).toContain('data-civic-identity-icon="omit-catalog-gap"')
  })

  it('collapses missing geo/date honestly; Reactions zone stays without fake counts', () => {
    const html = renderPost(
      <FeedCivicPost
        issue={{
          id: 'DEMO-NF07-2',
          type: 'INCIDENT',
          status: 'PUBLISHED',
          title: 'Short title only',
          labels: [],
        }}
        locale="en"
        resolveLocalizedText={(field) =>
          typeof field === 'string' ? field : field?.en ?? ''
        }
        t={makeT('en')}
      />,
    )
    expect(html).not.toContain('data-testid="feed-civic-post-geo"')
    expect(html).not.toContain('data-testid="issue-metadata-date"')
    expect(html).toContain('data-testid="issue-identity-header"')
    expect(html).toContain('data-testid="feed-civic-action-reactions"')
    expect(html).not.toContain('data-reaction-count=')
  })

  it('localizes Comment + Reactions in et/ru', () => {
    for (const locale of ['et', 'ru']) {
      const html = renderPost(
        <FeedCivicPost
          issue={baseIssue}
          locale={locale}
          resolveLocalizedText={(field) =>
            typeof field === 'string' ? field : field?.[locale] ?? field?.en ?? ''
          }
          t={makeT(locale)}
          to="/next/feed/issue/DEMO-NF07-1"
        />,
      )
      expect(html).toContain(makeT(locale)('nextFeed.post.comment'))
      expect(html).toContain(makeT(locale)('threadsFeed.post.reactionSummarySlot'))
    }
  })
})
