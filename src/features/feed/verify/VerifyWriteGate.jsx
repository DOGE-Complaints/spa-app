import { NEXT_FEED_THREAD_ICONS } from '../feedThreadIcons.js'
import './VerifyChrome.css'

/**
 * DS §10 VerifyWriteGate — next-feed light chrome for known-unverified write block (M157 A/F).
 * Presentation only — navigates existing `/verify`; opaque identity outcome; no invent fields.
 * Classic `components/threads/VerifyWriteGate.jsx` remains `#/board` Done path.
 */
export function VerifyWriteGate({
  t,
  showCivicLine = false,
  onGoVerify,
  onDismiss,
  iconPack = null,
}) {
  const icons = iconPack || NEXT_FEED_THREAD_ICONS
  const blockedSrc = icons.unavailable || '/icons/story-handoff/ic-verify-shield.png'

  return (
    <div
      className="nf-verify-write-gate"
      data-ds-surface="VerifyWriteGate"
      data-vl-done-surface="VerifyWriteGate"
      data-testid="verify-write-gate"
      data-gate-variant="blocked"
      data-plane="light"
      role="dialog"
      aria-labelledby="nf-verify-write-gate-title"
    >
      <p id="nf-verify-write-gate-title" className="nf-verify-write-gate-title" data-testid="verify-gate-title">
        <img src={blockedSrc} alt="" aria-hidden="true" />
        <span>{t('threadsFeed.verify.cta')}</span>
      </p>
      <p className="nf-verify-write-gate-body" data-testid="verify-gate-body">
        {t('threadsFeed.verify.body')}
      </p>
      {showCivicLine ? (
        <p className="nf-verify-write-gate-civic" data-testid="verify-civic-line">
          {t('threadsFeed.verify.civicNodeLine')}
        </p>
      ) : null}
      <div className="nf-verify-write-gate-actions">
        <button
          type="button"
          className="nf-verify-write-gate-primary"
          data-testid="verify-go-cta"
          onClick={onGoVerify}
        >
          {t('threadsFeed.verify.goToVerification')}
        </button>
        <button
          type="button"
          className="nf-verify-write-gate-secondary"
          data-testid="verify-not-now"
          onClick={onDismiss}
        >
          {t('threadsFeed.verify.notNow')}
        </button>
      </div>
    </div>
  )
}
