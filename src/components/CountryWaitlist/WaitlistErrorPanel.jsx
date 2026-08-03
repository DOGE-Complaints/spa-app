import { useI18n } from '../../i18n/I18nProvider.jsx'
import { Button } from '../Button'

/**
 * M123 state D — Submission Error.
 * @param {{
 *   errorKind: string,
 *   onRetry: () => void,
 *   onBack: () => void,
 * }} props
 */
export function WaitlistErrorPanel({ errorKind, onRetry, onBack }) {
  const { t } = useI18n()
  const messageKey = `waitlist.error.${errorKind}`

  return (
    <section
      className="waitlist-panel waitlist-panel--error"
      data-testid="waitlist-error-panel"
      data-waitlist-error-kind={errorKind}
    >
      <h2>{t('waitlist.error.title')}</h2>
      <p className="waitlist-panel__message" data-testid={`waitlist-error-message-${errorKind}`}>
        {t(messageKey)}
      </p>
      <div className="waitlist-panel__actions">
        <Button
          type="button"
          hierarchy="primary"
          fullWidth
          data-testid="waitlist-error-retry"
          onClick={onRetry}
        >
          {t('waitlist.error.tryAgain')}
        </Button>
        <Button type="button" hierarchy="secondary" fullWidth data-testid="waitlist-error-back" onClick={onBack}>
          {t('waitlist.error.back')}
        </Button>
      </div>
    </section>
  )
}
