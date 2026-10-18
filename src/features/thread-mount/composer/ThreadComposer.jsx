import { useEffect, useRef } from 'react'
import {
  ATTACH_UNAVAILABLE_COPY,
  DEFAULT_MAX_ATTACHMENTS,
  VERIFY_SUCCESS_BADGE,
  VERIFY_SUCCESS_HINT,
  canAddAttachment,
  resolveMaxAttachments,
} from '../config/threadMountConfig.js'
import { AttachmentRef } from './AttachmentRef.jsx'
import '../verify/VerifyWriteGate.css'
import './ThreadComposer.css'

export const M153_ILLUSTRATIVE_DRAFT = 'I can help draft the sign-up list this week.'

/**
 * CT-04/05 ThreadComposer — root/reply · draft · fail F · attachments local-intent.
 * Fixture write only · no invent HTTP.
 *
 * @param {object} props
 * @param {'root'|'reply'} [props.mode]
 * @param {string} [props.draft]
 * @param {(v: string) => void} [props.onDraftChange]
 * @param {string|null} [props.parentExcerpt]
 * @param {() => void} [props.onCancelReply]
 * @param {() => void|Promise<void>} [props.onPost]
 * @param {boolean} [props.posting]
 * @param {{ title?: string, detail?: string }|null} [props.failState]
 * @param {() => void} [props.onTryAgain]
 * @param {() => void} [props.onKeepEditing]
 * @param {number} [props.focusSignal]
 * @param {boolean} [props.stickyKeyboard]
 * @param {import('react').Ref} [props.textareaRef]
 * @param {Array<{ id: string, label?: string, status: 'ready'|'denied', kind?: string }>} [props.attachments]
 * @param {number} [props.maxAttachments]
 * @param {boolean} [props.attachmentsAvailable]
 * @param {() => void} [props.onAttach]
 * @param {(id: string) => void} [props.onRemoveAttachment]
 */
export function ThreadComposer({
  mode = 'root',
  draft = '',
  onDraftChange = null,
  parentExcerpt = null,
  onCancelReply = null,
  onPost = null,
  posting = false,
  failState = null,
  onTryAgain = null,
  onKeepEditing = null,
  focusSignal = 0,
  stickyKeyboard = false,
  textareaRef = null,
  attachments = [],
  maxAttachments = DEFAULT_MAX_ATTACHMENTS,
  attachmentsAvailable = true,
  onAttach = null,
  onRemoveAttachment = null,
  /** CT-07 V-C — opaque Verified chrome · never implies auto-post */
  verifiedReturn = false,
}) {
  const localRef = useRef(null)
  const ref = textareaRef || localRef
  const canPost = Boolean(draft?.trim()) && !posting
  const resolvedMax = resolveMaxAttachments(maxAttachments)
  const list = Array.isArray(attachments) ? attachments : []
  const atMax = !canAddAttachment(list.length, resolvedMax)
  const showAttach = Boolean(attachmentsAvailable)
  const attachDisabled = posting || atMax || typeof onAttach !== 'function'

  useEffect(() => {
    if (!focusSignal) return undefined
    const id = requestAnimationFrame(() => {
      ref.current?.focus?.()
    })
    return () => cancelAnimationFrame(id)
  }, [focusSignal, ref])

  const isReply = mode === 'reply'
  const postLabel = isReply ? 'Post reply' : 'Post comment'
  const placeholder = isReply ? 'Write a reply…' : 'Write a comment…'

  return (
    <div
      className={`tm-thread-composer${stickyKeyboard ? ' tm-thread-composer--sticky-keyboard' : ''}${
        failState ? ' tm-thread-composer--fail' : ''
      }`}
      data-testid="tm-thread-composer"
      data-tm-composer-mode={mode}
      data-tm-composer-fail={failState ? 'true' : 'false'}
      data-tm-composer-posting={posting ? 'true' : 'false'}
      data-tm-max-attachments={String(resolvedMax)}
      data-tm-attach-count={String(list.length)}
      data-tm-attach-at-max={atMax ? 'true' : 'false'}
      data-tm-attachments-available={showAttach ? 'true' : 'false'}
      data-tm-verified-return={verifiedReturn ? 'true' : 'false'}
      data-tm-autopost="false"
      data-lab-ct04="true"
      data-lab-ct05="true"
      data-lab-ct07={verifiedReturn ? 'true' : undefined}
      data-lab-sticky-keyboard={stickyKeyboard ? 'true' : 'false'}
    >
      {verifiedReturn ? (
        <div className="tm-verify-return" data-testid="tm-verify-return" role="status">
          <p className="tm-verify-return__badge" data-testid="tm-verify-result-opaque">
            {VERIFY_SUCCESS_BADGE}
          </p>
          <p className="tm-verify-return__hint" data-testid="tm-verify-continue-helper">
            {VERIFY_SUCCESS_HINT}
          </p>
        </div>
      ) : null}
      {isReply ? (
        <div className="tm-thread-composer__reply-ctx" data-testid="tm-composer-reply-context">
          <p className="tm-thread-composer__reply-label">Replying to this comment</p>
          {parentExcerpt ? (
            <p className="tm-thread-composer__excerpt" data-testid="tm-composer-parent-excerpt">
              {parentExcerpt}
            </p>
          ) : null}
          <button
            type="button"
            className="tm-thread-composer__cancel"
            data-testid="tm-composer-cancel-reply"
            onClick={() => onCancelReply?.()}
          >
            Cancel reply
          </button>
        </div>
      ) : (
        <p className="tm-thread-composer__root-label" data-testid="tm-composer-root-label">
          Write a comment
        </p>
      )}

      <label className="tm-thread-composer__field">
        <span className="visually-hidden">{placeholder}</span>
        <textarea
          ref={ref}
          className="tm-thread-composer__textarea"
          data-testid="tm-composer-textarea"
          value={draft}
          placeholder={placeholder}
          rows={3}
          disabled={posting}
          onChange={(e) => onDraftChange?.(e.target.value)}
        />
      </label>

      {list.length > 0 ? (
        <div className="tm-thread-composer__attachments" data-testid="tm-composer-attachments">
          {list.map((intent) => (
            <AttachmentRef
              key={intent.id}
              intent={intent}
              onRemove={() => onRemoveAttachment?.(intent.id)}
            />
          ))}
        </div>
      ) : null}

      {!showAttach ? (
        <p className="tm-thread-composer__attach-unavailable" data-testid="tm-composer-attach-unavailable">
          {ATTACH_UNAVAILABLE_COPY}
        </p>
      ) : null}

      {failState ? (
        <div className="tm-thread-composer__fail" data-testid="tm-composer-fail" role="alert">
          <p className="tm-thread-composer__fail-title" data-testid="tm-composer-fail-title">
            {failState.title || 'Comment wasn’t posted.'}
          </p>
          <p className="tm-thread-composer__fail-detail">
            {failState.detail || 'Your text is still here. Try again.'}
          </p>
          <div className="tm-thread-composer__fail-actions">
            <button
              type="button"
              className="tm-thread-composer__try-again"
              data-testid="tm-composer-try-again"
              onClick={() => onTryAgain?.()}
            >
              Try again
            </button>
            <button
              type="button"
              className="tm-thread-composer__keep-editing"
              data-testid="tm-composer-keep-editing"
              onClick={() => onKeepEditing?.()}
            >
              Keep editing
            </button>
          </div>
        </div>
      ) : null}

      <div className="tm-thread-composer__actions">
        {showAttach ? (
          <button
            type="button"
            className="tm-thread-composer__attach"
            data-testid="tm-composer-attach"
            disabled={attachDisabled}
            aria-disabled={attachDisabled}
            onClick={() => {
              if (attachDisabled) return
              onAttach?.()
            }}
          >
            Attach
          </button>
        ) : null}
        <button
          type="button"
          className="tm-thread-composer__post"
          data-testid="tm-composer-post"
          disabled={!canPost}
          aria-disabled={!canPost}
          onClick={() => {
            if (!canPost) return
            onPost?.()
          }}
        >
          {posting ? 'Posting…' : postLabel}
        </button>
      </div>
    </div>
  )
}
