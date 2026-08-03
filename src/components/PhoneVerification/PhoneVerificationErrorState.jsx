import './PhoneVerificationErrorState.css'
import { formatCooldownTimer } from '../../auth/verificationErrorMapping.js'
import { formatI18nMessage } from '../../i18n/formatI18nMessage.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { Button } from '../Button'

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
  const { t } = useI18n()
  const {
    errorKind,
    titleKey,
    messageKey,
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
      <h2 className="phone-verification-error__title">{t(titleKey)}</h2>
      <p className="phone-verification-error__message">{t(messageKey)}</p>

      {cooldownSecondsRemaining != null && cooldownSecondsRemaining > 0 ? (
        <p className="phone-verification-error__meta" data-testid="phone-verification-error-cooldown">
          {formatI18nMessage(t('phoneError.meta.cooldown'), {
            timer: formatCooldownTimer(cooldownSecondsRemaining),
          })}
        </p>
      ) : null}

      {attemptsRemaining != null ? (
        <p className="phone-verification-error__meta" data-testid="phone-verification-error-attempts">
          {formatI18nMessage(t('phoneError.meta.attempts'), { n: attemptsRemaining })}
        </p>
      ) : null}

      <div className="phone-verification-error__actions">
        <Button
          type="button"
          hierarchy="primary"
          fullWidth
          data-testid="phone-verification-error-primary"
          disabled={Boolean(primaryAction.disabled)}
          onClick={() => onPrimaryAction(primaryAction.id)}
        >
          {t(primaryAction.labelKey)}
        </Button>
        {secondaryAction ? (
          <Button
            type="button"
            hierarchy="secondary"
            fullWidth
            data-testid="phone-verification-error-secondary"
            disabled={Boolean(secondaryAction.disabled)}
            onClick={() => onSecondaryAction?.(secondaryAction.id)}
          >
            {t(secondaryAction.labelKey)}
          </Button>
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
