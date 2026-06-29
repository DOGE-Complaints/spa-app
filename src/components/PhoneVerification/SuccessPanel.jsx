import { useI18n } from '../../i18n/I18nProvider.jsx'

export function SuccessPanel({ onContinue }) {
  const { t } = useI18n()

  return (
    <section
      className="phone-verification-panel phone-verification-panel--success"
      data-testid="phone-verification-success"
    >
      <h2 className="phone-verification-panel__title">{t('phone.success.title')}</h2>
      <p className="phone-verification-panel__description">{t('phone.success.desc')}</p>
      <div className="phone-verification-panel__actions">
        <button
          type="button"
          className="phone-verification-panel__button phone-verification-panel__button--primary"
          data-testid="phone-verification-success-continue"
          onClick={onContinue}
        >
          {t('phone.success.continue')}
        </button>
      </div>
    </section>
  )
}
