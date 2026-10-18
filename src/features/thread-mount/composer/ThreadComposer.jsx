import { useEffect, useRef } from 'react'
import './ThreadComposer.css'

export const M153_ILLUSTRATIVE_DRAFT = 'I can help draft the sign-up list this week.'

/**
 * CT-04 ThreadComposer — root/reply · draft · fail F · mobile sticky.
 * Fixture write only · no invent HTTP · no Attach (CT-05).
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
}) {
  const localRef = useRef(null)
  const ref = textareaRef || localRef
  const canPost = Boolean(draft?.trim()) && !posting

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
      data-lab-ct04="true"
      data-lab-sticky-keyboard={stickyKeyboard ? 'true' : 'false'}
    >
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
