import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { FeedCivicPost } from './FeedCivicPost.jsx'
import { CIVIC_MEDIA_STUB_PATH } from './civicMediaStub.js'

/**
 * CT-29 Path A stand — next/feed civic media stub (dogefeed).
 * Mounts FeedCivicPost for list + detail parity (same component / same src).
 * Local I18nProvider (StatusBadge) · no nested Router (parent MemoryRouter / app Router).
 * No invent image-gen HTTP · OP eye Absent → visual BLOCK.
 */

const CT29_ISSUE = Object.freeze({
  id: 'CT29-PATH-A',
  type: 'IMPROVEMENT',
  status: 'PUBLISHED',
  title: { en: 'CT-29 civic media stub', et: 'CT-29 civic media stub', ru: 'CT-29 civic media stub' },
  summary: {
    en: 'Interim dogefeed stub on next/feed list + detail.',
    et: 'Interim dogefeed stub on next/feed list + detail.',
    ru: 'Interim dogefeed stub on next/feed list + detail.',
  },
  labels: ['lighting'],
  created_at: '2026-10-20T21:00:00Z',
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

export function FeedLabCt29Stand() {
  const t = makeT()
  return (
    <section
      className="feed-lab-ct29-stand"
      data-testid="feed-lab-ct29-stand"
      data-lab-ct29="true"
      data-lab-plane="greenfield"
      data-civic-media-stub={CIVIC_MEDIA_STUB_PATH}
      aria-label="CT-29 next/feed civic media stub stand"
    >
      <h2 className="feed-lab-ct29-stand__title" data-testid="feed-lab-ct29-heading">
        CT-29 next/feed civic media stub (Path A)
      </h2>
      <I18nProvider>
        <div
          className="feed-lab-ct29-stand__list"
          data-testid="feed-lab-ct29-list"
          data-ct29-surface="list"
        >
          <FeedCivicPost
            issue={CT29_ISSUE}
            locale="en"
            resolveLocalizedText={resolveEn}
            t={t}
            to="/next/feed/issue/CT29-PATH-A"
          />
        </div>
        <div
          className="feed-lab-ct29-stand__detail"
          data-testid="feed-lab-ct29-detail"
          data-ct29-surface="detail"
        >
          <FeedCivicPost
            issue={CT29_ISSUE}
            locale="en"
            resolveLocalizedText={resolveEn}
            t={t}
          />
        </div>
      </I18nProvider>
    </section>
  )
}
