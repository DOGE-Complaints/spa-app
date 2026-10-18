import {
  VERIFY_CANCELLED_TITLE,
  VERIFY_CIVIC_LINE,
  VERIFY_CONTINUE_CTA,
  VERIFY_DENIED_UNKNOWN,
  VERIFY_FAILED_TITLE,
  VERIFY_GATE_BODY,
  VERIFY_GATE_TITLE,
  VERIFY_GO_CTA,
  VERIFY_NOT_NOW,
  VERIFY_STALE_COPY,
  VERIFY_STALE_STATUS,
  VERIFY_TRY_AGAIN,
} from '../config/threadMountConfig.js'
import './VerifyWriteGate.css'

/**
 * CT-07 greenfield VerifyWriteGate — lab presentation only.
 * No invent Identity methods / eID / phone · no product FeedDiscussionBlock import.
 *
 * @param {object} props
 * @param {'blocked'|'cancelled'|'failed'|'denied-unknown'|'stale'} [props.variant]
 * @param {string|null} [props.parentExcerpt]
 * @param {string} [props.draft]
 * @param {boolean} [props.showCivicLine]
 * @param {() => void} [props.onGoVerify]
 * @param {() => void} [props.onDismiss]
 */
export function VerifyWriteGate({
  variant = 'blocked',
  parentExcerpt = null,
  draft = '',
  showCivicLine = false,
  onGoVerify = null,
  onDismiss = null,
}) {
  const isDenied = variant === 'denied-unknown'
  const isStale = variant === 'stale'
  const isCancelled = variant === 'cancelled'
  const isFailed = variant === 'failed'

  let title = VERIFY_GATE_TITLE
  let body = VERIFY_GATE_BODY
  let primary = VERIFY_GO_CTA
  let showPrimary = true
  let showSecondary = true

  if (isCancelled) {
    title = VERIFY_CANCELLED_TITLE
    body = VERIFY_GATE_BODY
    primary = VERIFY_CONTINUE_CTA
  } else if (isFailed) {
    title = VERIFY_FAILED_TITLE
    body = VERIFY_GATE_BODY
    primary = VERIFY_TRY_AGAIN
  } else if (isDenied) {
    title = VERIFY_DENIED_UNKNOWN
    body = ''
    showPrimary = false
    showSecondary = false
  } else if (isStale) {
    title = VERIFY_STALE_STATUS
    body = VERIFY_STALE_COPY
    showPrimary = false
    showSecondary = false
  }

  return (
    <div
      className={`tm-verify-write-gate tm-verify-write-gate--${variant}`}
      data-testid="tm-verify-write-gate"
      data-tm-gate-variant={variant}
      data-lab-ct07="true"
      data-tm-identity-methods="false"
      role="dialog"
      aria-labelledby="tm-verify-write-gate-title"
    >
      <p id="tm-verify-write-gate-title" className="tm-verify-write-gate__title" data-testid="tm-verify-gate-title">
        {title}
      </p>
      {body ? (
        <p className="tm-verify-write-gate__body" data-testid="tm-verify-gate-body">
          {body}
        </p>
      ) : null}
      {parentExcerpt ? (
        <p className="tm-verify-write-gate__target" data-testid="tm-verify-gate-target">
          <span className="tm-verify-write-gate__target-label">Replying to</span>
          {parentExcerpt}
        </p>
      ) : null}
      {typeof draft === 'string' && draft.trim() ? (
        <p className="tm-verify-write-gate__draft" data-testid="tm-verify-gate-draft">
          {draft}
        </p>
      ) : null}
      {showCivicLine && !isDenied && !isStale ? (
        <p className="tm-verify-write-gate__civic" data-testid="tm-verify-civic-line">
          {VERIFY_CIVIC_LINE}
        </p>
      ) : null}
      {showPrimary || showSecondary ? (
        <div className="tm-verify-write-gate__actions">
          {showPrimary ? (
            <button
              type="button"
              className="tm-verify-write-gate__primary"
              data-testid="tm-verify-go-cta"
              onClick={() => onGoVerify?.()}
            >
              {primary}
            </button>
          ) : null}
          {showSecondary ? (
            <button
              type="button"
              className="tm-verify-write-gate__secondary"
              data-testid="tm-verify-not-now"
              onClick={() => onDismiss?.()}
            >
              {VERIFY_NOT_NOW}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
