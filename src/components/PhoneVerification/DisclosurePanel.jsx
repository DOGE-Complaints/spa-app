import { useI18n } from '../../i18n/I18nProvider.jsx'
import { Button } from '../Button'

export function DisclosurePanel({ onSendCode, onNotNow }) {
  const { t } = useI18n()

  return (
    <section
      className="phone-verification-panel phone-verification-panel--disclosure"
      data-testid="phone-verification-disclosure"
    >
      <h2 className="phone-verification-panel__title">{t('phone.disclosure.title')}</h2>
      <p className="phone-verification-panel__description">{t('phone.disclosure.body')}</p>
      <div className="phone-verification-panel__actions">
        <Button
          type="button"
          hierarchy="primary"
          fullWidth
          data-testid="phone-verification-disclosure-send"
          onClick={onSendCode}
        >
          {t('phone.disclosure.sendCode')}
        </Button>
        <Button
          type="button"
          hierarchy="secondary"
          fullWidth
          data-testid="phone-verification-disclosure-not-now"
          onClick={onNotNow}
        >
          {t('phone.disclosure.notNow')}
        </Button>
      </div>
    </section>
  )
}
