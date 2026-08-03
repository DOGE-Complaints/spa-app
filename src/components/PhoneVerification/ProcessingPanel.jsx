import { useI18n } from '../../i18n/I18nProvider.jsx'
import { Button } from '../Button'

export function ProcessingPanel() {
  const { t } = useI18n()

  return (
    <section
      className="phone-verification-panel phone-verification-panel--processing"
      data-testid="phone-verification-processing"
      aria-busy="true"
    >
      <h2 className="phone-verification-panel__title">{t('phone.processing.title')}</h2>
      <p className="phone-verification-panel__description">{t('phone.processing.desc')}</p>
      <div className="phone-verification-panel__progress" aria-hidden="true">
        <span className="phone-verification-panel__progress-bar" />
      </div>
      <div className="phone-verification-panel__actions">
        <Button
          type="button"
          hierarchy="primary"
          fullWidth
          loading
          data-testid="phone-verification-processing-cta"
        >
          {t('phone.otp.verify')}
        </Button>
      </div>
    </section>
  )
}
