import './PhoneVerificationErrorState.css'
import { formatCooldownTimer } from '../../auth/verificationErrorMapping.js'

/**
 * @typedef {import('../../auth/verificationErrorMapping.js').ResolvedVerificationError} ResolvedVerificationError
 */

/**
 * Reusable M37 error panel for phone verification.
 * @param {{
 *   resolved: ResolvedVerificationError,
 *   onPrimaryAction: (actionId: string) => void,
 *   onSecondaryAction?: (actionId: string) => void,
 * }} props
 */
export function PhoneVerificationErrorState({ resolved, onPrimaryAction, onSecondaryAction }) {
  const {
    errorKind,
    title,
    message,
    primaryAction,
    secondaryAction,
    cooldownSecondsRemaining,
    attemptsRemaining,
    technicalCode,
    traceId,
  } = resolved

  return (
    <section
      className="phone-verification-error"
      data-testid={`phone-verification-error-${errorKind}`}
      data-phone-verification-error-kind={errorKind}
    >
      <h2 className="phone-verification-error__title">{title}</h2>
      <p className="phone-verification-error__message">{message}</p>

      {cooldownSecondsRemaining != null && cooldownSecondsRemaining > 0 ? (
        <p className="phone-verification-error__meta" data-testid="phone-verification-error-cooldown">
          Cooldown timer: {formatCooldownTimer(cooldownSecondsRemaining)}
        </p>
      ) : null}

      {attemptsRemaining != null ? (
        <p className="phone-verification-error__meta" data-testid="phone-verification-error-attempts">
          Attempts remaining: {attemptsRemaining}
        </p>
      ) : null}

      <div className="phone-verification-error__actions">
        <button
          type="button"
          className="phone-verification-error__button phone-verification-error__button--primary"
          data-testid="phone-verification-error-primary"
          disabled={Boolean(primaryAction.disabled)}
          onClick={() => onPrimaryAction(primaryAction.id)}
        >
          {primaryAction.label}
        </button>
        {secondaryAction ? (
          <button
            type="button"
            className="phone-verification-error__button phone-verification-error__button--secondary"
            data-testid="phone-verification-error-secondary"
            disabled={Boolean(secondaryAction.disabled)}
            onClick={() => onSecondaryAction?.(secondaryAction.id)}
          >
            {secondaryAction.label}
          </button>
        ) : null}
      </div>

      {technicalCode || traceId ? (
        <p className="phone-verification-error__technical" data-testid="phone-verification-error-technical">
          {technicalCode ? <span>{technicalCode}</span> : null}
          {traceId ? <span data-testid="phone-verification-error-trace-id">{traceId}</span> : null}
        </p>
      ) : null}
    </section>
  )
}
