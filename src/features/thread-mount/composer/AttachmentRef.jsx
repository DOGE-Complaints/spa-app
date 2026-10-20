import {
  ATTACH_DENIED_SAFETY_DETAIL,
  ATTACH_DENIED_TITLE,
  ATTACH_DENIED_TYPE_HELPER,
  ATTACH_LOCAL_INTENT_COPY,
  ATTACH_READY_STATUS_COPY,
} from '../config/threadMountConfig.js'
import './AttachmentRef.css'

/**
 * CT-05 AttachmentRef · CT-19 M153b §7 paint + M153a D/E copy.
 * Never claims published media · no invent upload HTTP · no green Ready.
 *
 * @param {object} props
 * @param {{
 *   id: string,
 *   label?: string,
 *   status: 'ready'|'denied',
 *   kind?: string,
 *   denyReason?: 'type'|'safety',
 * }} props.intent
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
        : intent.kind === 'pdf'
          ? 'PDF document'
          : intent.kind === 'office'
            ? 'Word document'
            : intent.kind === 'markdown'
              ? 'Markdown file'
              : 'Attached file'

  const denyReason = intent.denyReason === 'safety' ? 'safety' : denied ? 'type' : null
  const deniedDetail =
    denyReason === 'safety' ? ATTACH_DENIED_SAFETY_DETAIL : ATTACH_DENIED_TYPE_HELPER

  return (
    <div
      className={`tm-attachment-ref${denied ? ' tm-attachment-ref--denied' : ''}${
        ready ? ' tm-attachment-ref--ready' : ''
      }`}
      data-testid={`tm-attachment-ref-${intent.id}`}
      data-tm-attach-status={intent.status}
      data-tm-attach-published="false"
      data-tm-attach-deny-reason={denied ? denyReason || 'type' : ''}
      data-lab-ct05="true"
      data-lab-ct19="true"
      role="group"
      aria-label={denied ? 'Denied attachment intent' : 'Pending attachment intent'}
    >
      <div className="tm-attachment-ref__main">
        <span className="tm-attachment-ref__icon" aria-hidden="true">
          {intent.kind === 'image'
            ? '▣'
            : intent.kind === 'pdf'
              ? '▦'
              : intent.kind === 'markdown'
                ? 'MD'
                : '▤'}
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
              <p
                className="tm-attachment-ref__denied-detail"
                data-testid="tm-attachment-denied-detail"
              >
                {deniedDetail}
              </p>
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
