import { useId, useState } from 'react'
import './CommentComposer.css'

/**
 * Root / reply composer with attach chip + soft-fail (presentation only — no invent HTTP).
 */
export function CommentComposer({
  t,
  mode = 'root',
  parentLabel = '',
  initialDraft = '',
  initialAttachment = null,
  attachOutcome = 'idle',
  postOutcome = 'idle',
  onCancel,
  testId = 'issue-thread-composer',
}) {
  const inputId = useId()
  const [draft, setDraft] = useState(initialDraft)
  const [attachment, setAttachment] = useState(initialAttachment)
  const [attachError, setAttachError] = useState(attachOutcome === 'denied')
  const [postError, setPostError] = useState(postOutcome === 'fail')

  const placeholder =
    mode === 'reply' ? t('threadsFeed.composer.replyPlaceholder') : t('threadsFeed.composer.placeholder')

  function handleAttach() {
    if (attachOutcome === 'denied') {
      setAttachError(true)
      // Do not set attachment; do not clear draft
      return
    }
    setAttachError(false)
    setAttachment({ label: t('threadsFeed.composer.attachedFile') })
  }

  function handleRemoveAttachment() {
    setAttachment(null)
  }

  function handlePost() {
    if (postOutcome === 'fail') {
      setPostError(true)
      return
    }
    setPostError(false)
  }

  function handleRetry() {
    setPostError(false)
  }

  return (
    <div
      className={`comment-composer comment-composer--${mode}${postError ? ' comment-composer--post-fail' : ''}`}
      data-testid={testId}
      data-composer-mode={mode}
    >
      {mode === 'reply' ? (
        <div className="comment-composer-context" data-testid="comment-composer-replying-to">
          <span>
            {t('threadsFeed.composer.replyingTo')} {parentLabel}
          </span>
          {typeof onCancel === 'function' ? (
            <button type="button" className="comment-composer-cancel-x" onClick={onCancel} aria-label={t('threadsFeed.composer.cancel')}>
              ×
            </button>
          ) : null}
        </div>
      ) : null}

      <label className="visually-hidden" htmlFor={inputId}>
        {placeholder}
      </label>
      <textarea
        id={inputId}
        className="comment-composer-input"
        data-testid="comment-composer-input"
        rows={mode === 'reply' || postError || attachment ? 3 : 1}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder={placeholder}
      />

      {attachment ? (
        <div className="comment-attach-chip" data-testid="comment-attach-chip">
          <img src="/icons/story-handoff/ic-doc-new.png" alt="" aria-hidden="true" />
          <span>{attachment.label}</span>
          <button
            type="button"
            className="comment-attach-remove"
            data-testid="comment-attach-remove"
            onClick={handleRemoveAttachment}
            aria-label={t('threadsFeed.composer.removeAttachment')}
          >
            <img src="/icons/threads-feed/ic-remove-attachment.png" alt="" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      {attachError ? (
        <p className="comment-composer-warning" data-testid="comment-attach-denied" role="alert">
          <img src="/icons/story-handoff/ic-warning-triangle.png" alt="" aria-hidden="true" />
          <span>{t('threadsFeed.composer.attachDenied')}</span>
        </p>
      ) : null}

      {postError ? (
        <div className="comment-composer-post-fail" data-testid="comment-post-fail" role="alert">
          <p className="comment-composer-post-fail-title">
            <img src="/icons/story-handoff/ic-warning-triangle.png" alt="" aria-hidden="true" />
            <span>{t('threadsFeed.composer.postFailed')}</span>
          </p>
          <p className="comment-composer-post-fail-helper">{t('threadsFeed.composer.postFailedHelper')}</p>
        </div>
      ) : null}

      <div className="comment-composer-toolbar" role="group">
        <button
          type="button"
          className="comment-composer-tool"
          data-testid="comment-attach-button"
          onClick={handleAttach}
        >
          <img src="/icons/threads-feed/ic-attach.png" alt="" aria-hidden="true" />
          <span>{t('threadsFeed.composer.attach')}</span>
        </button>
        {mode === 'reply' || postError ? (
          <button
            type="button"
            className="comment-composer-tool comment-composer-tool--neutral"
            data-testid="comment-composer-cancel"
            onClick={onCancel}
          >
            {postError ? t('threadsFeed.composer.keepEditing') : t('threadsFeed.composer.cancel')}
          </button>
        ) : null}
        {postError ? (
          <button
            type="button"
            className="comment-composer-primary"
            data-testid="comment-composer-try-again"
            onClick={handleRetry}
          >
            <img src="/icons/story-handoff/ic-auto-resubmit.png" alt="" aria-hidden="true" />
            <span>{t('threadsFeed.composer.tryAgain')}</span>
          </button>
        ) : (
          <button
            type="button"
            className="comment-composer-primary"
            data-testid="comment-composer-post"
            onClick={handlePost}
          >
            {mode === 'reply' ? t('threadsFeed.composer.postReply') : t('threadsFeed.composer.postReply')}
          </button>
        )}
      </div>
    </div>
  )
}
