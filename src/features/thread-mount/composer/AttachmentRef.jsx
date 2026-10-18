import {
  ATTACH_DENIED_DETAIL,
  ATTACH_DENIED_TITLE,
  ATTACH_LOCAL_INTENT_COPY,
  ATTACH_READY_STATUS_COPY,
} from '../config/threadMountConfig.js'
import './AttachmentRef.css'

/**
 * CT-05 AttachmentRef — local pending intent chip (M153 D/E).
 * Never claims published media · no invent upload HTTP.
 *
 * @param {object} props
 * @param {{ id: string, label?: string, status: 'ready'|'denied', kind?: string }} props.intent
 * @param {() => void} [props.onRemove]
 */
export function AttachmentRef({ intent, onRemove = null }) {
  if (!intent?.id) return null
  const denied = intent.status === 'denied'
  const ready = intent.status === 'ready'
  const label =
    typeof intent.label === 'string' && intent.label.trim()
      ? intent.label.trim()
      : intent.kind === 'image'
        ? 'Selected image'
        : 'Attached file'

  return (
    <div
      className={`tm-attachment-ref${denied ? ' tm-attachment-ref--denied' : ''}${
        ready ? ' tm-attachment-ref--ready' : ''
      }`}
      data-testid={`tm-attachment-ref-${intent.id}`}
      data-tm-attach-status={intent.status}
      data-tm-attach-published="false"
      data-lab-ct05="true"
      role="group"
      aria-label={denied ? 'Denied attachment intent' : 'Pending attachment intent'}
    >
      <div className="tm-attachment-ref__main">
        <span className="tm-attachment-ref__icon" aria-hidden="true">
          {intent.kind === 'image' ? '▣' : '▤'}
        </span>
        <div className="tm-attachment-ref__text">
          <p className="tm-attachment-ref__label" data-testid="tm-attachment-label">
            {label}
          </p>
          {ready ? (
            <>
              <p className="tm-attachment-ref__ready" data-testid="tm-attachment-ready">
                {ATTACH_READY_STATUS_COPY}
              </p>
              <p className="tm-attachment-ref__local" data-testid="tm-attachment-local-intent">
                {ATTACH_LOCAL_INTENT_COPY}
              </p>
            </>
          ) : null}
          {denied ? (
            <div className="tm-attachment-ref__denied" data-testid="tm-attachment-denied" role="alert">
              <p className="tm-attachment-ref__denied-title" data-testid="tm-attachment-denied-title">
                {ATTACH_DENIED_TITLE}
              </p>
              <p className="tm-attachment-ref__denied-detail">{ATTACH_DENIED_DETAIL}</p>
            </div>
          ) : null}
        </div>
      </div>
      <button
        type="button"
        className="tm-attachment-ref__remove"
        data-testid={`tm-attachment-remove-${intent.id}`}
        onClick={() => onRemove?.()}
      >
        Remove
      </button>
    </div>
  )
}
