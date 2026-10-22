import { useEffect, useRef } from 'react'
import {
  ATTACH_UNAVAILABLE_COPY,
  DEFAULT_MAX_ATTACHMENTS,
  VERIFY_SUCCESS_BADGE,
  VERIFY_SUCCESS_HINT,
  canAddAttachment,
  resolveMaxAttachments,
} from '../config/threadMountConfig.js'
import { ShellChromeIcon } from '../../../components/AppShell/ShellChromeIcon.jsx'
import { AttachmentRef } from './AttachmentRef.jsx'
import '../verify/VerifyWriteGate.css'
import './ThreadComposer.css'

export const M153_ILLUSTRATIVE_DRAFT = 'I can help draft the sign-up list this week.'

/** Present runtime icons · CT-11 · no invent SVG bodies */
export const TM_ATTACH_ICON_SRC = '/icons/next-feed/actions/attach.svg'
export const TM_SEND_ICON_SRC = '/icons/next-feed/actions/send.svg'

/**
 * CT-04/05/11 ThreadComposer — root/reply · draft · fail F · attachments · icon chrome.
 * Fixture write only · no invent HTTP · reuse Present attach/send.svg.
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
 * @param {() => void} [props.onAttach] optional notify when Attach opens native picker
 * @param {(files: File[]) => void} [props.onFilesSelected] CT-17 · after native picker selection
 * @param {(id: string) => void} [props.onRemoveAttachment]
 * @param {'circle'|'labelled'} [props.sendChrome] CT-11 G-H2 circle · G-H6 labelled+plane
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
  onFilesSelected = null,
  onRemoveAttachment = null,
  /** CT-07 V-C — opaque Verified chrome · never implies auto-post */
  verifiedReturn = false,
  /** CT-11 — empty/first-send circle vs labelled Post+plane */
  sendChrome = 'labelled',
}) {
  const localRef = useRef(null)
  const fileInputRef = useRef(null)
  const ref = textareaRef || localRef
  const canPost = Boolean(draft?.trim()) && !posting
  const resolvedMax = resolveMaxAttachments(maxAttachments)
  const list = Array.isArray(attachments) ? attachments : []
  const atMax = !canAddAttachment(list.length, resolvedMax)
  const showAttach = Boolean(attachmentsAvailable)
  const canOpenPicker = typeof onFilesSelected === 'function'
  const attachDisabled = posting || atMax || !canOpenPicker
  const circleSend = sendChrome === 'circle'

  function openNativePicker() {
    if (attachDisabled) return
    onAttach?.()
    fileInputRef.current?.click?.()
  }

  function handleNativePick(e) {
    const picked = e?.target?.files
    const files = picked && picked.length ? Array.from(picked) : []
    if (files.length && typeof onFilesSelected === 'function') onFilesSelected(files)
    if (e?.target) e.target.value = ''
  }

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
      data-tm-send-chrome={circleSend ? 'circle' : 'labelled'}
      data-tm-autopost="false"
      data-lab-ct04="true"
      data-lab-ct05="true"
      data-lab-ct07={verifiedReturn ? 'true' : undefined}
      data-lab-ct11="true"
      data-lab-ct17={showAttach ? 'true' : undefined}
      data-lab-sticky-keyboard={stickyKeyboard ? 'true' : 'false'}
    >
      {showAttach ? (
        <input
          ref={fileInputRef}
          type="file"
          className="visually-hidden"
          data-testid="tm-composer-file-input"
          data-tm-native-picker="true"
          tabIndex={-1}
          aria-hidden="true"
          disabled={attachDisabled}
          onChange={handleNativePick}
        />
      ) : null}
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
            aria-label="Attach"
            onClick={openNativePicker}
          >
            <ShellChromeIcon
              className="tm-thread-composer__icon tm-thread-composer__icon--attach"
              testId="tm-composer-attach-icon"
              src={TM_ATTACH_ICON_SRC}
              size={20}
            />
            <span className="tm-thread-composer__attach-label">Attach</span>
          </button>
        ) : null}
        <button
          type="button"
          className={`tm-thread-composer__post${
            circleSend ? ' tm-thread-composer__post--circle' : ' tm-thread-composer__post--labelled'
          }`}
          data-testid="tm-composer-post"
          disabled={!canPost}
          aria-disabled={!canPost}
          aria-label={postLabel}
          onClick={() => {
            if (!canPost) return
            onPost?.()
          }}
        >
          <img
            className="tm-thread-composer__icon tm-thread-composer__icon--send"
            data-testid="tm-composer-send-icon"
            src={TM_SEND_ICON_SRC}
            alt=""
            width={circleSend ? 22 : 18}
            height={circleSend ? 22 : 18}
            aria-hidden="true"
          />
          {circleSend ? (
            <span className="visually-hidden">{posting ? 'Posting…' : postLabel}</span>
          ) : (
            <span className="tm-thread-composer__post-label" data-testid="tm-composer-post-label">
              {posting ? 'Posting…' : postLabel}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
