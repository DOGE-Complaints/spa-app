import {
  CIVIC_FLOW_PHASES,
  CIVIC_VERIFICATION_CONTEXT,
  deriveCivicStatusState,
} from '../../auth/civicStatusState.js'
import { formatI18nMessage } from '../../i18n/formatI18nMessage.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { Button } from '../Button'
import {
  CIVIC_STATUS_LABEL_NOT_VERIFIED_KEY,
  CIVIC_STATUS_LABEL_VERIFIED_KEY,
  CIVIC_STATUS_LABEL_WALLET_NOT_LINKED_KEY,
} from './civicStatusLabels.js'
import './CivicStatus.css'

const CIVIC_ICON_SRC = Object.freeze({
  unverified: '/icons/user-cabinet/ic-civic-unverified.png',
  verification_available: '/icons/user-cabinet/ic-civic-verify-required.png',
  verification_in_progress: '/icons/user-cabinet/ic-civic-in-progress.png',
  verified: '/icons/user-cabinet/ic-civic-verified.png',
  verification_failed: '/icons/user-cabinet/ic-civic-failed.png',
})

function CivicStatusIcon({ state }) {
  const src = CIVIC_ICON_SRC[state]
  if (!src) return null
  return (
    <img
      className="civic-status-card__icon-img"
      src={src}
      alt=""
      width={24}
      height={24}
      data-testid="civic-status-icon"
      data-civic-icon-state={state}
    />
  )
}

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
        <CivicStatusIcon state={state} />
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
  const { t } = useI18n()
  const state = deriveCivicStatusState(phoneVerified, flowPhase, {
    verificationContext,
    errorCode,
  })

  const verifiedAtLabel = formatVerifiedAt(phoneVerifiedAt)
  const dialPrefixLabel = phoneDialPrefix
    ? formatI18nMessage(t('civic.verified.dialPrefix'), { prefix: phoneDialPrefix })
    : null

  if (state === 'verified') {
    const metadataParts = [
      t('civic.verified.phoneConfirmed'),
      verifiedAtLabel,
      dialPrefixLabel,
    ].filter(Boolean)
    return (
      <CivicStatusPanel
        state={state}
        statusLabel={t(CIVIC_STATUS_LABEL_VERIFIED_KEY)}
        title={t('civic.verified.title')}
        description={t('civic.verified.desc')}
        metadata={metadataParts.join(' · ')}
        walletInfo={
          <div className="civic-status-card__wallet-info" data-testid="civic-status-wallet-info">
            <p className="civic-status-card__wallet-info-label">{t('civic.wallet.future')}</p>
            <p className="civic-status-card__wallet-info-value">
              {t(CIVIC_STATUS_LABEL_WALLET_NOT_LINKED_KEY)}
            </p>
          </div>
        }
      />
    )
  }

  if (state === 'verification_available') {
    return (
      <CivicStatusPanel
        state={state}
        statusLabel={t(CIVIC_STATUS_LABEL_NOT_VERIFIED_KEY)}
        title={t('civic.available.title')}
        description={t('civic.available.desc')}
        contextBlock={protectedActionLabel ?? t('civic.available.protectedAction')}
        primaryAction={
          <Button type="button" hierarchy="primary" fullWidth onClick={onVerify}>
            {t('civic.available.verifyContinue')}
          </Button>
        }
        secondaryAction={
          <Button type="button" hierarchy="secondary" fullWidth onClick={onCancel}>
            {t('civic.cta.cancel')}
          </Button>
        }
      />
    )
  }

  if (state === 'verification_in_progress') {
    return (
      <CivicStatusPanel
        state={state}
        statusLabel={t(CIVIC_STATUS_LABEL_NOT_VERIFIED_KEY)}
        title={t('civic.inProgress.title')}
        description={t('civic.inProgress.desc')}
        metadata={t('civic.inProgress.waiting')}
        primaryAction={
          <Button type="button" hierarchy="primary" fullWidth disabled>
            {t('civic.cta.continue')}
          </Button>
        }
      />
    )
  }

  if (state === 'verification_failed') {
    return (
      <CivicStatusPanel
        state={state}
        statusLabel={t(CIVIC_STATUS_LABEL_NOT_VERIFIED_KEY)}
        title={t('civic.failed.title')}
        description={t('civic.failed.desc')}
        errorCode={errorCode ?? 'VERIFICATION_FAILED'}
        primaryAction={
          <Button type="button" hierarchy="primary" fullWidth onClick={onRetry ?? onVerify}>
            {t('civic.failed.retry')}
          </Button>
        }
        secondaryAction={
          <Button type="button" hierarchy="secondary" fullWidth onClick={onContactSupport}>
            {t('civic.failed.contactSupport')}
          </Button>
        }
      />
    )
  }

  return (
    <CivicStatusPanel
      state={state}
      statusLabel={t(CIVIC_STATUS_LABEL_NOT_VERIFIED_KEY)}
      title={t('civic.unverified.title')}
      description={t('civic.unverified.desc')}
      metadata={t('civic.unverified.takesMinute')}
      primaryAction={
        <Button type="button" hierarchy="primary" fullWidth onClick={onVerify}>
          {t('civic.unverified.cta')}
        </Button>
      }
    />
  )
}
