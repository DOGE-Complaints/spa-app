import {
  CIVIC_FLOW_PHASES,
  CIVIC_VERIFICATION_CONTEXT,
  deriveCivicStatusState,
} from '../../auth/civicStatusState.js'
import {
  CIVIC_STATUS_LABEL_NOT_VERIFIED,
  CIVIC_STATUS_LABEL_VERIFIED,
  CIVIC_STATUS_LABEL_WALLET_NOT_LINKED,
} from './civicStatusLabels.js'
import './CivicStatus.css'

function formatVerifiedAt(iso) {
  if (!iso) return null
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso))
  } catch {
    return null
  }
}

function CivicStatusPanel({
  state,
  icon,
  statusLabel,
  title,
  description,
  metadata,
  contextBlock,
  walletInfo,
  errorCode,
  primaryAction,
  secondaryAction,
}) {
  return (
    <article
      className={`civic-status-card civic-status-card--${state.replace(/_/g, '-')}`}
      data-civic-status-card
      data-civic-status-state={state}
      role="status"
      aria-live="polite"
    >
      <div className="civic-status-card__icon" aria-hidden="true">
        {icon}
      </div>
      {statusLabel ? <p className="civic-status-card__status-label">{statusLabel}</p> : null}
      <h2 className="civic-status-card__title">{title}</h2>
      <p className="civic-status-card__description">{description}</p>
      {contextBlock ? <div className="civic-status-card__context-block">{contextBlock}</div> : null}
      {walletInfo}
      {errorCode ? (
        <p className="civic-status-card__error-code" data-testid="civic-status-error-code">
          Code: {errorCode}
        </p>
      ) : null}
      {primaryAction || secondaryAction ? (
        <div className="civic-status-card__actions">
          {primaryAction}
          {secondaryAction}
        </div>
      ) : null}
      {metadata ? <p className="civic-status-card__metadata">{metadata}</p> : null}
    </article>
  )
}

/**
 * Reusable civic trust indicator — one of five runtime states (M28).
 */
export function CivicStatusCard({
  phoneVerified = false,
  phoneDialPrefix = null,
  phoneVerifiedAt = null,
  flowPhase = CIVIC_FLOW_PHASES.IDLE,
  verificationContext = CIVIC_VERIFICATION_CONTEXT.DEFAULT,
  errorCode = null,
  protectedActionLabel = null,
  onVerify,
  onCancel,
  onRetry,
  onContactSupport,
}) {
  const state = deriveCivicStatusState(phoneVerified, flowPhase, {
    verificationContext,
    errorCode,
  })

  const verifiedAtLabel = formatVerifiedAt(phoneVerifiedAt)
  const dialPrefixLabel = phoneDialPrefix ? `Dial Prefix: ${phoneDialPrefix}` : null

  if (state === 'verified') {
    const metadataParts = ['Phone Confirmed', verifiedAtLabel, dialPrefixLabel].filter(Boolean)
    return (
      <CivicStatusPanel
        state={state}
        icon="✓"
        statusLabel={CIVIC_STATUS_LABEL_VERIFIED}
        title="Verified Civic Account"
        description="Your account is verified and eligible for civic participation."
        metadata={metadataParts.join(' · ')}
        walletInfo={
          <div className="civic-status-card__wallet-info" data-testid="civic-status-wallet-info">
            <p className="civic-status-card__wallet-info-label">Wallet (future)</p>
            <p className="civic-status-card__wallet-info-value">{CIVIC_STATUS_LABEL_WALLET_NOT_LINKED}</p>
          </div>
        }
      />
    )
  }

  if (state === 'verification_available') {
    return (
      <CivicStatusPanel
        state={state}
        icon="!"
        statusLabel={CIVIC_STATUS_LABEL_NOT_VERIFIED}
        title="Verification Required"
        description="This action requires a verified civic account."
        contextBlock={protectedActionLabel ?? 'Protected Action'}
        primaryAction={
          <button
            type="button"
            className="civic-status-card__button civic-status-card__button--primary"
            onClick={onVerify}
          >
            Verify &amp; Continue
          </button>
        }
        secondaryAction={
          <button
            type="button"
            className="civic-status-card__button civic-status-card__button--secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        }
      />
    )
  }

  if (state === 'verification_in_progress') {
    return (
      <CivicStatusPanel
        state={state}
        icon="…"
        statusLabel={CIVIC_STATUS_LABEL_NOT_VERIFIED}
        title="Verification In Progress"
        description="Complete the verification process to activate your civic account."
        metadata="Waiting for confirmation"
        primaryAction={
          <button
            type="button"
            className="civic-status-card__button civic-status-card__button--primary"
            disabled
          >
            Continue
          </button>
        }
      />
    )
  }

  if (state === 'verification_failed') {
    return (
      <CivicStatusPanel
        state={state}
        icon="!"
        statusLabel={CIVIC_STATUS_LABEL_NOT_VERIFIED}
        title="Verification Failed"
        description="We could not complete account verification. Please try again."
        errorCode={errorCode ?? 'VERIFICATION_FAILED'}
        primaryAction={
          <button
            type="button"
            className="civic-status-card__button civic-status-card__button--primary"
            onClick={onRetry ?? onVerify}
          >
            Retry Verification
          </button>
        }
        secondaryAction={
          <button
            type="button"
            className="civic-status-card__button civic-status-card__button--secondary"
            onClick={onContactSupport}
          >
            Contact Support
          </button>
        }
      />
    )
  }

  return (
    <CivicStatusPanel
      state={state}
      icon="○"
      statusLabel={CIVIC_STATUS_LABEL_NOT_VERIFIED}
      title="Account Verification Required"
      description="Verify your phone number to participate in civic actions and submit stories."
      metadata="Verification takes less than one minute."
      primaryAction={
        <button
          type="button"
          className="civic-status-card__button civic-status-card__button--primary"
          onClick={onVerify}
        >
          Verify Account
        </button>
      }
    />
  )
}
