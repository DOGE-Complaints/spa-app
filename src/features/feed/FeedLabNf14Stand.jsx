import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { FeedCivicPost } from './FeedCivicPost.jsx'

/**
 * NF-14 Path A stand — civic card hit-target (retire Open issue).
 * List card with `to` · detail without `to` · strip outside hit.
 * Local I18nProvider · no nested Router · no invent OP PASS.
 */

const NF14_ISSUE = Object.freeze({
  id: 'NF14-PATH-A',
  type: 'INCIDENT',
  status: 'PUBLISHED',
  title: { en: 'NF-14 hit-target card', et: 'NF-14 hit-target', ru: 'NF-14 hit-target' },
  summary: {
    en: 'Header + media navigate; Open issue row retired.',
    et: 'Header + media navigate.',
    ru: 'Header + media navigate.',
  },
  labels: ['lighting'],
  created_at: '2026-10-21T11:40:00Z',
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
    'status.PUBLISHED': 'Published',
  }
  return (k) => map[k] ?? k
}

export function FeedLabNf14Stand() {
  const t = makeT()
  return (
    <section
      className="feed-lab-nf14-stand"
      data-testid="feed-lab-nf14-stand"
      data-lab-nf14="true"
      data-lab-plane="greenfield"
      aria-label="NF-14 civic card hit-target stand"
    >
      <h2 className="feed-lab-nf14-stand__title" data-testid="feed-lab-nf14-heading">
        NF-14 civic card hit-target (Path A)
      </h2>
      <I18nProvider>
        <div
          className="feed-lab-nf14-stand__list"
          data-testid="feed-lab-nf14-list"
          data-nf14-surface="list"
        >
          <FeedCivicPost
            issue={NF14_ISSUE}
            locale="en"
            resolveLocalizedText={resolveEn}
            t={t}
            to="/next/feed/issue/NF14-PATH-A?from=%2Flab%2Ffeed"
          />
        </div>
        <div
          className="feed-lab-nf14-stand__detail"
          data-testid="feed-lab-nf14-detail"
          data-nf14-surface="detail"
        >
          <FeedCivicPost
            issue={NF14_ISSUE}
            locale="en"
            resolveLocalizedText={resolveEn}
            t={t}
          />
        </div>
      </I18nProvider>
    </section>
  )
}
