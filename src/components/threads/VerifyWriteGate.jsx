import { THREADS_FEED_THREAD_ICONS } from './threadIcons.js'
import './VerifyWriteGate.css'

/**
 * Compact verify-before-write gate chrome (M147 / M157).
 * Presentation only — navigates existing `/verify`; no invent pack JSON keys; opaque Verified result.
 */
export function VerifyWriteGate({
  t,
  variant = 'blocked',
  showCivicLine = false,
  onGoVerify,
  onDismiss,
  iconPack = null,
}) {
  const icons = iconPack || THREADS_FEED_THREAD_ICONS
  const verifiedSrc = icons.verified || '/icons/story-handoff/ic-success-check.png'
  const blockedSrc = icons.unavailable || '/icons/story-handoff/ic-verify-shield.png'

  if (variant === 'verified') {
    return (
      <div className="verify-write-gate verify-write-gate--verified" data-testid="verify-write-gate" data-gate-variant="verified">
        <p className="verify-write-gate-result" data-testid="verify-result-opaque">
          <img src={verifiedSrc} alt="" aria-hidden="true" />
          <span>{t('threadsFeed.verify.resultOpaque')}</span>
        </p>
        <p className="verify-write-gate-helper">{t('threadsFeed.verify.continueHelper')}</p>
      </div>
    )
  }

  return (
    <div
      className="verify-write-gate verify-write-gate--blocked"
      data-testid="verify-write-gate"
      data-gate-variant="blocked"
      role="dialog"
      aria-labelledby="verify-write-gate-title"
    >
      <p id="verify-write-gate-title" className="verify-write-gate-title" data-testid="verify-gate-title">
        <img src={blockedSrc} alt="" aria-hidden="true" />
        <span>{t('threadsFeed.verify.cta')}</span>
      </p>
      <p className="verify-write-gate-body" data-testid="verify-gate-body">
        {t('threadsFeed.verify.body')}
      </p>
      {showCivicLine ? (
        <p className="verify-write-gate-civic" data-testid="verify-civic-line">
          {t('threadsFeed.verify.civicNodeLine')}
        </p>
      ) : null}
      <div className="verify-write-gate-actions">
        <button
          type="button"
          className="verify-write-gate-primary"
          data-testid="verify-go-cta"
          onClick={onGoVerify}
        >
          {t('threadsFeed.verify.goToVerification')}
        </button>
        <button
          type="button"
          className="verify-write-gate-secondary"
          data-testid="verify-not-now"
          onClick={onDismiss}
        >
          {t('threadsFeed.verify.notNow')}
        </button>
      </div>
    </div>
  )
}
