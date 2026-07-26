import { useState } from 'react'
import { formatI18nMessage } from '../../i18n/formatI18nMessage.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import {
  STORY_ACTIVITY_DEMO_METRICS,
  STORY_ACTIVITY_DEMO_ROWS,
  STORY_ACTIVITY_STATES,
  resolveStoryActivityState,
} from './storyActivityState.js'
import './StoryActivity.css'

const ICONS = Object.freeze({
  title: '/icons/user-cabinet/ic-story-activity.png',
  empty: '/icons/user-cabinet/ic-story-empty.png',
  draft: '/icons/user-cabinet/ic-story-draft.png',
  storyId: '/icons/user-cabinet/ic-story-id.png',
  published: '/icons/user-cabinet/ic-status-published.png',
  underReview: '/icons/user-cabinet/ic-status-under-review.png',
  verify: '/icons/story-handoff/ic-verify-shield.png',
  unavailable: '/icons/story-handoff/ic-cloud-error.png',
  retry: '/icons/story-handoff/ic-auto-resubmit.png',
})

function StatusIcon({ status }) {
  const src = status === 'published' ? ICONS.published : ICONS.underReview
  return <img className="story-activity-card__status-icon" src={src} alt="" width={16} height={16} />
}

/**
 * @param {{
 *   state?: string | null,
 *   previewFlag?: string | null,
 *   metrics?: { submitted: number, published: number, underReview: number },
 *   rows?: Array<{ id: string, status: string, createdLabel: string }>,
 *   draftLastEdited?: string,
 *   errorCode?: string,
 *   onVerify?: () => void,
 *   onGoToBoard?: () => void,
 * }} props
 */
export function StoryActivityCard({
  state = null,
  previewFlag = null,
  metrics = STORY_ACTIVITY_DEMO_METRICS,
  rows = STORY_ACTIVITY_DEMO_ROWS,
  draftLastEdited = 'May 14, 2026',
  errorCode = 'ACTIVITY_LOAD_FAILED',
  onVerify,
  onGoToBoard,
}) {
  const { t } = useI18n()
  const [notice, setNotice] = useState(null)
  const resolved = resolveStoryActivityState({ state, previewFlag })

  const showComingSoon = () => {
    setNotice(t('cabinet.common.comingSoon'))
  }

  const headerIcon =
    resolved === STORY_ACTIVITY_STATES.EMPTY
      ? ICONS.empty
      : resolved === STORY_ACTIVITY_STATES.DRAFT
        ? ICONS.draft
        : resolved === STORY_ACTIVITY_STATES.VERIFY_REQUIRED
          ? ICONS.verify
          : resolved === STORY_ACTIVITY_STATES.UNAVAILABLE
            ? ICONS.unavailable
            : ICONS.title

  return (
    <article
      className={`story-activity-card story-activity-card--${resolved.replace(/_/g, '-')}`}
      data-testid="story-activity-card"
      data-story-activity-card
      data-story-activity-state={resolved}
      aria-label={t('cabinet.story.title')}
    >
      <header className="story-activity-card__header">
        <img
          className="story-activity-card__header-icon"
          src={headerIcon}
          alt=""
          width={24}
          height={24}
          data-testid="story-activity-header-icon"
        />
        <h2 className="story-activity-card__title" data-testid="story-activity-title">
          {resolved === STORY_ACTIVITY_STATES.DRAFT
            ? t('cabinet.story.draft.title')
            : resolved === STORY_ACTIVITY_STATES.VERIFY_REQUIRED
              ? t('cabinet.story.verifyRequired.title')
              : resolved === STORY_ACTIVITY_STATES.UNAVAILABLE
                ? t('cabinet.story.unavailable.title')
                : t('cabinet.story.title')}
        </h2>
      </header>

      {notice ? (
        <p className="story-activity-card__notice" data-testid="story-activity-coming-soon" role="status">
          {notice}
        </p>
      ) : null}

      {resolved === STORY_ACTIVITY_STATES.ACTIVE ? (
        <>
          <ul className="story-activity-card__metrics" data-testid="story-activity-metrics">
            <li>
              {formatI18nMessage(t('cabinet.story.metrics.submitted'), {
                count: String(metrics.submitted),
              })}
            </li>
            <li>
              {formatI18nMessage(t('cabinet.story.metrics.published'), {
                count: String(metrics.published),
              })}
            </li>
            <li>
              {formatI18nMessage(t('cabinet.story.metrics.underReview'), {
                count: String(metrics.underReview),
              })}
            </li>
          </ul>
          <div className="story-activity-card__table-wrap">
            <table className="story-activity-card__table" data-testid="story-activity-table">
              <thead>
                <tr>
                  <th>
                    <img src={ICONS.storyId} alt="" width={14} height={14} />{' '}
                    {t('cabinet.story.table.storyId')}
                  </th>
                  <th>{t('cabinet.story.table.status')}</th>
                  <th>{t('cabinet.story.table.created')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} data-testid={`story-activity-row-${row.id}`}>
                    <td>{row.id}</td>
                    <td>
                      <span className="story-activity-card__status-cell">
                        <StatusIcon status={row.status} />
                        {row.status === 'published'
                          ? t('cabinet.story.status.published')
                          : t('cabinet.story.status.underReview')}
                      </span>
                    </td>
                    <td>{row.createdLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      {resolved === STORY_ACTIVITY_STATES.EMPTY ? (
        <>
          <p className="story-activity-card__message" data-testid="story-activity-empty-message">
            {t('cabinet.story.empty.message')}
          </p>
          <p className="story-activity-card__description">{t('cabinet.story.empty.description')}</p>
          <button
            type="button"
            className="story-activity-card__button story-activity-card__button--primary"
            data-testid="story-activity-go-to-board"
            onClick={() => onGoToBoard?.()}
          >
            {t('storyHandoff.cta.goToBoard')}
          </button>
        </>
      ) : null}

      {resolved === STORY_ACTIVITY_STATES.DRAFT ? (
        <>
          <p className="story-activity-card__description">{t('cabinet.story.draft.description')}</p>
          <p className="story-activity-card__metadata" data-testid="story-activity-draft-edited">
            {t('cabinet.story.draft.lastEdited')} {draftLastEdited}
          </p>
          <div className="story-activity-card__actions">
            <button
              type="button"
              className="story-activity-card__button story-activity-card__button--primary"
              data-testid="story-activity-resume-draft"
              onClick={showComingSoon}
            >
              {t('cabinet.story.draft.resume')}
            </button>
            <button
              type="button"
              className="story-activity-card__button story-activity-card__button--secondary"
              data-testid="story-activity-discard-draft"
              onClick={showComingSoon}
            >
              {t('cabinet.common.discardDraft')}
            </button>
          </div>
        </>
      ) : null}

      {resolved === STORY_ACTIVITY_STATES.VERIFY_REQUIRED ? (
        <>
          <p className="story-activity-card__description">
            {t('cabinet.story.verifyRequired.description')}
          </p>
          <button
            type="button"
            className="story-activity-card__button story-activity-card__button--primary"
            data-testid="story-activity-verify"
            onClick={() => onVerify?.()}
          >
            {t('civic.unverified.cta')}
          </button>
        </>
      ) : null}

      {resolved === STORY_ACTIVITY_STATES.UNAVAILABLE ? (
        <>
          <p className="story-activity-card__description">
            {t('cabinet.story.unavailable.description')}
          </p>
          <p className="story-activity-card__error-code" data-testid="story-activity-error-code">
            {formatI18nMessage(t('cabinet.common.codeLabel'), { code: errorCode })}
          </p>
          <button
            type="button"
            className="story-activity-card__button story-activity-card__button--primary"
            data-testid="story-activity-retry"
            onClick={showComingSoon}
          >
            <img src={ICONS.retry} alt="" width={16} height={16} />
            {t('cabinet.common.retry')}
          </button>
        </>
      ) : null}
    </article>
  )
}
