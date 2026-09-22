import './IssueThreadBlock.css'

/**
 * Shared discussion shell (M143 / M148). Placement only for THR-01.
 * @param {'loading'|'empty'|'populated'|'unavailable'} status
 * @param {(k: string) => string} t
 * @param {() => void} [onRetry]
 */
export function IssueThreadBlock({ status = 'empty', t, onRetry }) {
  return (
    <section
      className={`issue-thread-block issue-thread-block--${status}`}
      data-testid="issue-thread-block"
      data-thread-status={status}
      aria-label={t('threadsFeed.post.action.discussion')}
    >
      <header className="issue-thread-block-label">
        <span>{t('threadsFeed.post.action.discussion')}</span>
      </header>

      {status !== 'unavailable' && status !== 'loading' ? (
        <div className="issue-thread-actions" data-testid="issue-thread-actions" role="group">
          <button type="button" className="issue-thread-action" data-testid="thread-action-react">
            <img src="/icons/threads-feed/ic-react.png" alt="" aria-hidden="true" />
            <span>{t('threadsFeed.post.action.react')}</span>
          </button>
          <button type="button" className="issue-thread-action" data-testid="thread-action-discussion">
            <img src="/icons/threads-feed/ic-discussion.png" alt="" aria-hidden="true" />
            <span>{t('threadsFeed.post.action.discussion')}</span>
          </button>
          <button
            type="button"
            className="issue-thread-action issue-thread-action--secondary"
            data-testid="thread-action-invite"
          >
            <img src="/icons/threads-feed/ic-invite-organization.png" alt="" aria-hidden="true" />
            <span>{t('threadsFeed.post.action.inviteOrganization')}</span>
          </button>
        </div>
      ) : null}

      {status === 'loading' ? (
        <div className="issue-thread-state" data-testid="issue-thread-loading" role="status">
          <img
            className="issue-thread-spinner"
            src="/icons/story-handoff/ic-spinner.png"
            alt=""
            aria-hidden="true"
          />
          <p>{t('threadsFeed.post.discussionLoading')}</p>
          <div className="issue-thread-skeleton" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      ) : null}

      {status === 'empty' ? (
        <div className="issue-thread-state" data-testid="issue-thread-empty" role="status">
          <p className="issue-thread-empty-title">{t('threadsFeed.post.empty.title')}</p>
          <p className="issue-thread-empty-helper">{t('threadsFeed.post.empty.helper')}</p>
        </div>
      ) : null}

      {status === 'populated' ? (
        <div className="issue-thread-state issue-thread-populated" data-testid="issue-thread-populated">
          <div className="issue-thread-summary" data-testid="issue-thread-summary">
            <p className="issue-thread-summary-title">{t('threadsFeed.post.existingDiscussion')}</p>
            <div className="issue-thread-preview-rows" aria-hidden="true">
              <span className="issue-thread-preview-row" />
              <span className="issue-thread-preview-row" />
            </div>
          </div>
          <button type="button" className="issue-thread-open-tree" data-testid="issue-thread-open-tree">
            <span>{t('threadsFeed.post.openTree')}</span>
            <span className="issue-thread-open-chevron" aria-hidden="true">
              ›
            </span>
          </button>
          <div className="issue-thread-reaction-slot" data-testid="issue-thread-reaction-slot">
            <span>{t('threadsFeed.post.reactionSummarySlot')}</span>
          </div>
        </div>
      ) : null}

      {status === 'unavailable' ? (
        <div className="issue-thread-state issue-thread-unavailable" data-testid="issue-thread-unavailable" role="alert">
          <p className="issue-thread-unavailable-title">
            <img src="/icons/story-handoff/ic-cloud-error.png" alt="" aria-hidden="true" />
            <span>{t('threadsFeed.post.discussionUnavailable')}</span>
          </p>
          <p className="issue-thread-unavailable-helper">
            {t('threadsFeed.post.discussionUnavailableHelper')}
          </p>
          {typeof onRetry === 'function' ? (
            <button type="button" className="issue-thread-retry" data-testid="issue-thread-retry" onClick={onRetry}>
              {t('threadsFeed.post.tryAgain')}
            </button>
          ) : null}
        </div>
      ) : null}

      {status === 'empty' || status === 'populated' ? (
        <div className="issue-thread-composer" data-testid="issue-thread-composer">
          <label className="visually-hidden" htmlFor="issue-thread-composer-input">
            {t('threadsFeed.post.composerPlaceholder')}
          </label>
          <input
            id="issue-thread-composer-input"
            className="issue-thread-composer-input"
            type="text"
            readOnly
            placeholder={t('threadsFeed.post.composerPlaceholder')}
            aria-readonly="true"
          />
        </div>
      ) : null}
    </section>
  )
}
