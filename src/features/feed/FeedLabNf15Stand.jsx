import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { FeedCivicPost } from './FeedCivicPost.jsx'

/**
 * NF-15 Path A stand — M162 action strip density + React unframe.
 * Civic post with four-zone strip · CR-23 Live host held.
 * Local I18nProvider · no nested Router · no invent OP PASS.
 */

const NF15_ISSUE = Object.freeze({
  id: 'NF15-PATH-A',
  type: 'INCIDENT',
  status: 'PUBLISHED',
  title: { en: 'NF-15 strip density', et: 'NF-15 strip', ru: 'NF-15 strip' },
  summary: {
    en: 'M162 React unframe · icons 24 · density tip lock.',
    et: 'M162 density.',
    ru: 'M162 density.',
  },
  labels: ['lighting'],
  created_at: '2026-10-21T12:00:00Z',
  geo: { label: 'Kesklinn, Tallinn', settlement: 'Tallinn', district: 'Kesklinn' },
})

function resolveEn(field) {
  if (typeof field === 'string') return field
  return field?.en ?? ''
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
    'threadsFeed.reactions.react': 'React',
    'status.PUBLISHED': 'Published',
  }
  return (k) => map[k] ?? k
}

export function FeedLabNf15Stand() {
  const t = makeT()
  return (
    <section
      className="feed-lab-nf15-stand"
      data-testid="feed-lab-nf15-stand"
      data-lab-nf15="true"
      data-lab-plane="greenfield"
      aria-label="NF-15 M162 action strip density stand"
    >
      <h2 className="feed-lab-nf15-stand__title" data-testid="feed-lab-nf15-heading">
        NF-15 M162 action strip density (Path A)
      </h2>
      <I18nProvider>
        <div
          className="feed-lab-nf15-stand__card"
          data-testid="feed-lab-nf15-card"
          data-nf15-surface="strip"
        >
          <FeedCivicPost
            issue={NF15_ISSUE}
            locale="en"
            resolveLocalizedText={resolveEn}
            t={t}
            to="/next/feed/issue/NF15-PATH-A?from=%2Flab%2Ffeed"
          />
        </div>
      </I18nProvider>
    </section>
  )
}
