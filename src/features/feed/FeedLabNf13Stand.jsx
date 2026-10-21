import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { FeedCivicPost } from './FeedCivicPost.jsx'
import { ISSUE_TYPE_ICON_BY_TYPE } from '../../i18n/issueTypeIcons.js'

/**
 * NF-13 Path A stand — M161 issue-type identity icons.
 * Mounts FeedCivicPost for each catalog key + one unknown omit.
 * Local I18nProvider (StatusBadge) · no nested Router.
 * No invent type aliases / OP PASS.
 */

const KEYS = Object.keys(ISSUE_TYPE_ICON_BY_TYPE)

function makeIssue(type) {
  return {
    id: `NF13-${type}`,
    type,
    status: 'PUBLISHED',
    title: { en: `NF-13 ${type}`, et: `NF-13 ${type}`, ru: `NF-13 ${type}` },
    summary: { en: 'M161 identity icon Path A', et: 'M161', ru: 'M161' },
    labels: [],
    created_at: '2026-10-21T11:00:00Z',
    geo: { label: 'Kesklinn, Tallinn', settlement: 'Tallinn', district: 'Kesklinn' },
  }
}

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

export function FeedLabNf13Stand() {
  const t = makeT()
  return (
    <section
      className="feed-lab-nf13-stand"
      data-testid="feed-lab-nf13-stand"
      data-lab-nf13="true"
      data-lab-plane="greenfield"
      aria-label="NF-13 M161 issue-type identity icon stand"
    >
      <h2 className="feed-lab-nf13-stand__title" data-testid="feed-lab-nf13-heading">
        NF-13 M161 issue-type identity icons (Path A)
      </h2>
      <I18nProvider>
        <div data-testid="feed-lab-nf13-keys" data-nf13-surface="keys">
          {KEYS.map((key) => (
            <div
              key={key}
              data-testid={`feed-lab-nf13-card-${key}`}
              data-nf13-type={key}
            >
              <FeedCivicPost
                issue={makeIssue(key)}
                locale="en"
                resolveLocalizedText={resolveEn}
                t={t}
              />
            </div>
          ))}
        </div>
        <div
          data-testid="feed-lab-nf13-omit"
          data-nf13-surface="omit"
          data-nf13-type="IMPROVEMENT"
        >
          <FeedCivicPost
            issue={makeIssue('IMPROVEMENT')}
            locale="en"
            resolveLocalizedText={resolveEn}
            t={t}
          />
        </div>
      </I18nProvider>
    </section>
  )
}
