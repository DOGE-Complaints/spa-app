import { NEXT_FEED_THREAD_ICONS } from '../feedThreadIcons.js'
import './VerifyChrome.css'

/**
 * DS §10 VerifyReturnFeedback — verified / cancelled / failed / stale return chrome (M157 C/D/E).
 * Success never auto-sends; draft ownership stays with ThreadComposer (FR-VL-11.2).
 *
 * @param {'verified'|'cancelled'|'failed'|'stale'} [props.variant]
 */
export function VerifyReturnFeedback({
  t,
  variant = 'verified',
  onRetryVerify = null,
  iconPack = null,
}) {
  const icons = iconPack || NEXT_FEED_THREAD_ICONS
  const verifiedSrc = icons.verified || '/icons/story-handoff/ic-success-check.png'
  const warnSrc = icons.unavailable || '/icons/story-handoff/ic-verify-shield.png'
  const errorSrc = icons.error || '/icons/story-handoff/ic-error.png'

  if (variant === 'verified') {
    return (
      <div
        className="nf-verify-return nf-verify-return--verified"
        data-ds-surface="VerifyReturnFeedback"
        data-vl-done-surface="VerifyReturnFeedback"
        data-testid="verify-return-feedback"
        data-return-variant="verified"
        data-plane="light"
        role="status"
      >
        <p className="nf-verify-return-result" data-testid="verify-result-opaque">
          <img src={verifiedSrc} alt="" aria-hidden="true" />
          <span>{t('threadsFeed.verify.resultOpaque')}</span>
        </p>
        <p className="nf-verify-return-helper">{t('threadsFeed.verify.continueHelper')}</p>
      </div>
    )
  }

  if (variant === 'stale') {
    return (
      <div
        className="nf-verify-return nf-verify-return--stale"
        data-ds-surface="VerifyReturnFeedback"
        data-vl-done-surface="VerifyReturnFeedback"
        data-testid="verify-return-feedback"
        data-return-variant="stale"
        data-plane="light"
        role="status"
      >
        <p className="nf-verify-return-title" data-testid="verify-return-title">
          <img src={warnSrc} alt="" aria-hidden="true" />
          <span>{t('threadsFeed.verify.staleTitle')}</span>
        </p>
        <p className="nf-verify-return-helper">{t('threadsFeed.verify.staleHelper')}</p>
      </div>
    )
  }

  const isFailed = variant === 'failed'
  return (
    <div
      className={`nf-verify-return nf-verify-return--${isFailed ? 'failed' : 'cancelled'}`}
      data-ds-surface="VerifyReturnFeedback"
      data-vl-done-surface="VerifyReturnFeedback"
      data-testid="verify-return-feedback"
      data-return-variant={isFailed ? 'failed' : 'cancelled'}
      data-plane="light"
      role="status"
    >
      <p className="nf-verify-return-title" data-testid="verify-return-title">
        <img src={isFailed ? errorSrc : warnSrc} alt="" aria-hidden="true" />
        <span>
          {isFailed ? t('threadsFeed.verify.failedTitle') : t('threadsFeed.verify.cancelledTitle')}
        </span>
      </p>
      <p className="nf-verify-return-helper">
        {isFailed ? t('threadsFeed.verify.failedHelper') : t('threadsFeed.verify.cancelledHelper')}
      </p>
      {typeof onRetryVerify === 'function' ? (
        <div className="nf-verify-write-gate-actions">
          <button
            type="button"
            className="nf-verify-write-gate-primary"
            data-testid="verify-retry-cta"
            onClick={onRetryVerify}
          >
            {t('threadsFeed.verify.verifyToContinue')}
          </button>
        </div>
      ) : null}
    </div>
  )
}
