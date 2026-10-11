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
    },
    et: {
      'nextFeed.post.openIssue': 'Ava teade',
      'nextFeed.post.more': 'Rohkem',
      'nextFeed.post.actions': 'Postituse toimingud',
      'nextFeed.post.comment': 'Kommentaar',
      'nextFeed.post.share': 'Jaga',
      'threadsFeed.post.action.react': 'Reageeri',
      'threadsFeed.post.reactionSummarySlot': 'Reaktsioonid',
    },
    ru: {
      'nextFeed.post.openIssue': 'Открыть обращение',
      'nextFeed.post.more': 'Ещё',
      'nextFeed.post.actions': 'Действия с записью',
      'nextFeed.post.comment': 'Комментарий',
      'nextFeed.post.share': 'Поделиться',
      'threadsFeed.post.action.react': 'Реакция',
      'threadsFeed.post.reactionSummarySlot': 'Реакции',
    },
  }
  return (key) => map[locale][key] ?? key
}

const baseIssue = {
  id: 'DEMO-NF02-1',
  type: 'IMPROVEMENT',
  status: 'PUBLISHED',
  title: { en: 'Courtyard lighting', et: 'Õue valgustus', ru: 'Освещение двора' },
  summary: { en: 'Need safer lights', et: 'Turvalisem valgus', ru: 'Нужен свет' },
  labels: ['lighting'],
  created_at: '2026-10-01T12:00:00Z',
  geo: { label: 'Kesklinn, Tallinn', settlement: 'Tallinn', district: 'Kesklinn' },
}

describe('NF-02 FeedCivicPost', () => {
  it('exposes nextFeed.post.* flat keys', () => {
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.post.openIssue')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.post.more')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.post.share')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.post.noMedia')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.post.schemaUnavailable')
  })

  it('renders no-media civic chrome without schema overlay', () => {
    const html = renderPost(
      <FeedCivicPost
        issue={baseIssue}
        locale="en"
        resolveLocalizedText={(field) =>
          typeof field === 'string' ? field : field?.en ?? ''
        }
        t={makeT('en')}
        to="/next/feed/issue/DEMO-NF02-1"
      />,
    )
    expect(html).toContain('data-testid="feed-civic-post"')
    expect(html).toContain('data-civic-variant="no-media"')
    expect(html).toContain('Courtyard lighting')
    expect(html).toContain('Need safer lights')
    expect(html).toContain('DEMO-NF02-1')
    expect(html).toContain('Kesklinn, Tallinn')
    expect(html).toContain('/icons/next-shell/actions/location.svg')
    expect(html).toContain('/icons/next-feed/actions/open-issue.svg')
    expect(html).toContain('/icons/next-feed/actions/more.svg')
    expect(html).toContain('/icons/next-feed/actions/react.svg')
    expect(html).toContain('/icons/next-feed/actions/comment.svg')
    expect(html).toContain('/icons/next-feed/actions/share.svg')
    expect(html).toContain('Open issue')
    expect(html).toContain('React')
    expect(html).toContain('Comment')
    expect(html).toContain('Share')
    expect(html).toContain('Reactions')
    expect(html).toContain('data-action-zones="4"')
    expect(html).not.toContain('schema-card-overlay')
    expect(html).not.toContain('SchemaCardOverlay')
    expect(html).not.toContain('Additional details')
    expect(html).not.toContain('feed-civic-post-media')
  })

  it('collapses missing geo and summary honestly', () => {
    const html = renderPost(
      <FeedCivicPost
        issue={{
          id: 'DEMO-NF02-2',
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
    expect(html).toContain('Short title only')
    expect(html).not.toContain('data-testid="feed-civic-post-geo"')
    expect(html).not.toContain('feed-civic-post-summary')
    expect(html).not.toContain('data-testid="feed-civic-post-open"')
  })

  it('uses nextFeed.post labels in et/ru', () => {
    for (const locale of ['et', 'ru']) {
      const html = renderPost(
        <FeedCivicPost
          issue={baseIssue}
          locale={locale}
          resolveLocalizedText={(field) =>
            typeof field === 'string' ? field : field?.[locale] ?? field?.en ?? ''
          }
          t={makeT(locale)}
          to="/next/feed/issue/DEMO-NF02-1"
        />,
      )
      expect(html).toContain(makeT(locale)('nextFeed.post.openIssue'))
      expect(html).toContain(makeT(locale)('nextFeed.post.share'))
    }
  })
})
